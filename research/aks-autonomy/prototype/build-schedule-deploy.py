import subprocess,difflib,json,zlib,base64,pathlib,hashlib
root=pathlib.Path('cloud/aks-tencent')
names=['self-study.mjs','life-simulation.mjs','life.mjs','conversation-hub.mjs','server.mjs']
patch={}
for name in names:
 old=subprocess.check_output(['git','show','HEAD:cloud/aks-tencent/'+name]).decode().replace('\r\n','\n')
 if name=='conversation-hub.mjs':
  for a,b in [(".map(r=>({...r,assets:JSON.parse(r.assets)",".map(r=>({...r,text:r.role==='assistant'?visibleReply(r.text):r.text,assets:JSON.parse(r.assets)"),("return {reply:prior.reply,model:","return {reply:visibleReply(prior.reply),model:"),("role:r.role,content:r.text+(JSON.parse(r.assets)","role:r.role,content:(r.role==='assistant'?visibleReply(r.text):r.text)+(JSON.parse(r.assets)")]:
   assert old.count(a)==1,(name,a);old=old.replace(a,b,1)
 new=(root/name).read_text(encoding='utf-8').replace('\r\n','\n')
 matcher=difflib.SequenceMatcher(None,old,new,autojunk=False)
 changes=[]
 for group in matcher.get_grouped_opcodes(100):
  a0=group[0][1];a1=group[-1][2];b0=group[0][3];b1=group[-1][4]
  a,b=old[a0:a1],new[b0:b1]
  assert a and old.count(a)==1,(name,a[:100],old.count(a))
  changes.append([a,b])
 check=old
 for a,b in reversed(changes):
  assert check.count(a)==1
  check=check.replace(a,b,1)
 assert check==new,(name,'mismatch')
 patch[name]=changes
payload=base64.b64encode(zlib.compress(json.dumps(patch,ensure_ascii=False,separators=(',',':')).encode(),9)).decode()
script=f'''python3 - <<'PY'
import pathlib,base64,json,zlib,datetime,subprocess
root=pathlib.Path('/opt/aks')
patch=json.loads(zlib.decompress(base64.b64decode('{payload}')))
original={{}};updated={{}}
for n,changes in patch.items():
 s=(root/n).read_text(encoding='utf-8');original[n]=s
 for a,b in reversed(changes):
  if s.count(a)!=1: raise SystemExit('Source changed, no changes made: '+n)
  s=s.replace(a,b,1)
 updated[n]=s
backup=root/'deploy-backups'/('schedule-autonomy-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ'))
backup.mkdir(parents=True,exist_ok=False)
for n,s in original.items():(backup/n).write_text(s,encoding='utf-8')
try:
 for n,s in updated.items():(root/n).write_text(s,encoding='utf-8')
 for n in updated:subprocess.run(['docker','exec','aks-aks-1','node','--check','/app/'+n],check=True,timeout=30)
 subprocess.run(['docker','restart','aks-aks-1'],check=True,timeout=40)
except BaseException:
 for n,s in original.items():(root/n).write_text(s,encoding='utf-8')
 subprocess.run(['docker','restart','aks-aks-1'],timeout=40)
 raise
print('DEPLOYED',backup)
PY
'''
out=pathlib.Path('C:/Users/linbowen/.codex/visualizations/2026/11/09/01a1be0d-86c3-7a92-ab12-82780f7c244f/deploy-schedule-autonomy.sh');out.write_text(script,encoding='utf-8');print(json.dumps({'payloadLength':len(payload),'scriptLength':len(script),'patchGroups':{k:len(v) for k,v in patch.items()}},ensure_ascii=False))
