"""Merge into the cloud baseline, validate in isolation, back up, deploy and verify."""
import pathlib,json,gzip,hashlib,difflib,subprocess,shutil,sys,datetime,sqlite3,time,re
ROOT=pathlib.Path('/opt/aks')
CONTAINER='aks-aks-1'
MODE=sys.argv[1] if len(sys.argv)>1 else 'check'
assert MODE in ('check','apply')
bundle=json.loads(gzip.decompress(pathlib.Path('/root/aks-cloud-0.2.4.json.gz').read_bytes()))
def merge(current,before,after,name):
    if current==after:return current
    if current==before:return after
    if before is None:raise ValueError('Existing unversioned file conflicts: '+name)
    old=before.splitlines(keepends=True);new=after.splitlines(keepends=True)
    for group in difflib.SequenceMatcher(None,old,new,autojunk=False).get_grouped_opcodes(0):
        first,last=group[0],group[-1]
        find=''.join(old[first[1]:last[2]]);replace=''.join(new[first[3]:last[4]])
        if not find:
            index=first[1]
            if index>0 and current.count(old[index-1])==1:find=old[index-1];replace=find+replace
            elif index<len(old) and current.count(old[index])==1:find=old[index];replace=replace+find
            else:raise ValueError('Ambiguous insertion in '+name)
        if not find or current.count(find)!=1:raise ValueError('Cloud changes overlap '+name+' at source line '+str(first[1]+1))
        current=current.replace(find,replace,1)
    return current
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
stage=ROOT/'releases'/('0.2.4-'+stamp);stage.mkdir(parents=True,exist_ok=False)
for f in ROOT.iterdir():
    if f.is_file() and f.suffix in ('.mjs','.json'):shutil.copy2(f,stage/f.name)
changed=[];conflicts=[];before_hashes={}
for name,item in bundle['files'].items():
    assert pathlib.PurePath(name).name==name and name.endswith(('.mjs','.json'))
    target=ROOT/name;current=target.read_text() if target.exists() else None
    before_hashes[name]=hashlib.sha256(target.read_bytes()).hexdigest() if target.exists() else None
    try:
        merged=item['after'] if current is None else merge(current,item['before'],item['after'],name)
        (stage/name).write_text(merged)
        if current!=merged:changed.append(name)
    except ValueError as e:conflicts.append(str(e))
if conflicts:print(json.dumps({'status':'conflict','conflicts':conflicts,'stage':str(stage)}));sys.exit(2)
image=subprocess.check_output(['docker','inspect','--format','{{.Config.Image}}',CONTAINER],text=True).strip()
mounts=json.loads(subprocess.check_output(['docker','inspect','--format','{{json .Mounts}}',CONTAINER],text=True))
assert any(m['Source']=='/opt/aks/server.mjs' and m['Destination']=='/app/server.mjs' for m in mounts),'Unexpected live source mount'
compose=ROOT/'compose.yaml';compose_before=compose.read_text()
anchor=re.search(r'(?m)^([ \t]*)-.*server\.mjs.*$',compose_before)
assert anchor,'Source mount marker missing from compose'
destinations={m['Destination'] for m in mounts}
additional=[name for name in bundle['files'] if not name.endswith('.test.mjs') and name!='package.json' and '/app/'+name not in destinations]
compose_after=compose_before[:anchor.end()]+''.join('\n'+anchor.group(1)+'- /opt/aks/'+name+':/app/'+name+':ro' for name in additional)+compose_before[anchor.end():]
run=['docker','run','--rm','--pull=never','--network','none','--mount',f'type=bind,src={stage},dst=/app,readonly','--workdir','/app',image]
for name in changed:
    if name.endswith('.mjs'):subprocess.run(run+['node','--check',name],check=True,capture_output=True)
tests=[f.name for f in stage.glob('*.test.mjs')]
test=subprocess.run(run+['node','--test','--test-reporter=tap']+tests,text=True,capture_output=True)
print(test.stdout[-6000:])
failures=set(re.findall(r'^not ok \d+ - (.+)$',test.stdout,re.M))
if test.returncode:
    baseline=stage/'baseline';baseline.mkdir()
    for f in ROOT.iterdir():
        if f.is_file() and f.suffix in ('.mjs','.json'):shutil.copy2(f,baseline/f.name)
    oldrun=['docker','run','--rm','--pull=never','--network','none','--mount',f'type=bind,src={baseline},dst=/app,readonly','--workdir','/app',image]
    oldtest=subprocess.run(oldrun+['node','--test','--test-reporter=tap']+[f.name for f in baseline.glob('*.test.mjs')],text=True,capture_output=True)
    oldfailures=set(re.findall(r'^not ok \d+ - (.+)$',oldtest.stdout,re.M))
    if not failures or failures-oldfailures:print(test.stderr[-2000:]);raise RuntimeError('New test failures; live unchanged')
    print(json.dumps({'preexistingTestFailures':sorted(failures),'newFailures':0}))
print(json.dumps({'status':'validated','version':bundle['version'],'changed':changed,'stage':str(stage)}))
if MODE=='check':sys.exit(0)
for name,expected in before_hashes.items():
    f=ROOT/name;actual=hashlib.sha256(f.read_bytes()).hexdigest() if f.exists() else None
    assert actual==expected,'Cloud source changed during validation: '+name
assert compose.read_text()==compose_before,'Compose changed during validation'
backup=ROOT/'deploy-backups'/('release-0.2.4-'+stamp);backup.mkdir(parents=True)
shutil.copy2(compose,backup/'compose.yaml')
if (ROOT/'release-manifest.json').exists():shutil.copy2(ROOT/'release-manifest.json',backup/'release-manifest.json')
for name in changed:
    if (ROOT/name).exists():shutil.copy2(ROOT/name,backup/name)
subprocess.run(['docker','stop','-t','30',CONTAINER],check=True,capture_output=True)
def recreate():subprocess.run(['docker','compose','-p','aks','-f',str(compose),'up','-d','--no-deps','--pull','never','aks'],cwd=ROOT,check=True,capture_output=True)
try:
    for f in (ROOT/'data').glob('*.sqlite'):
        with sqlite3.connect(f) as source,sqlite3.connect(backup/(f.name+'.backup')) as target:source.backup(target)
    for name in changed:shutil.copy2(stage/name,ROOT/name)
    hashes={f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in ROOT.iterdir() if f.is_file() and (f.suffix=='.mjs' or f.name in ('persona.json','package.json','release.json'))}
    (ROOT/'release-manifest.json').write_text(json.dumps({'version':bundle['version'],'authority':'cloud','createdAt':stamp,'files':hashes},indent=2))
    compose.write_text(compose_after)
    subprocess.run(['docker','compose','-p','aks','-f',str(compose),'config','--quiet'],check=True,capture_output=True)
    recreate();health=None
    for _ in range(20):
        try:
            result=subprocess.check_output(['docker','exec',CONTAINER,'node','-e',"fetch('http://127.0.0.1:8787/health').then(r=>r.json()).then(x=>console.log(JSON.stringify(x)))"],text=True,stderr=subprocess.DEVNULL,timeout=8)
            health=json.loads(result)
            if health.get('version')==bundle['version']:break
        except Exception:pass
        time.sleep(1)
    assert health and health.get('version')==bundle['version'],'Release health check failed'
except Exception:
    subprocess.run(['docker','stop','-t','30',CONTAINER],capture_output=True)
    shutil.copy2(backup/'compose.yaml',compose)
    for name in changed:
        if (backup/name).exists():shutil.copy2(backup/name,ROOT/name)
        elif (ROOT/name).exists():(ROOT/name).unlink()
    if (backup/'release-manifest.json').exists():shutil.copy2(backup/'release-manifest.json',ROOT/'release-manifest.json')
    elif (ROOT/'release-manifest.json').exists():(ROOT/'release-manifest.json').unlink()
    recreate();raise
print(json.dumps({'status':'deployed','backup':str(backup),'health':health},ensure_ascii=False))
