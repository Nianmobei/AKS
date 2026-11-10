import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
for(const dir of [here,...process.argv.slice(2)]){
 const target=path.join(dir,'device-server.mjs');let s=await fs.readFile(target,'utf8');
 if(s.includes("from './work-handoff.mjs'"))continue;
 const start=s.indexOf('const text=prepared.text;const ids=[];');
 const end=s.indexOf('\n  if(p.stream)',start);
 if(start<0||end<0)throw Error('Native turn block missing');
 const old=s.slice(start,end).trimEnd();
 const match=old.match(/for\(const part[\s\S]*?\n  const requestId=[^;]+;const result=await client.request\('turn',([\s\S]*?)\);$/);
 if(!match)throw Error('Native turn block changed');
 const upload=old.slice(old.indexOf('for(const part'),old.indexOf('\n  const requestId'));
 const replacement="const text=prepared.text;const requestId=req.headers['x-airi-round-id']||randomUUID();\n  const result=await (prepared.resultPromise ||= resolveDesktopTurn(text,{dailyTurn:async()=>{const ids=[];"+upload+"\n  return await client.request('turn',"+match[1]+");}}));";
 s="import {resolveDesktopTurn} from './work-handoff.mjs';\n"+s.slice(0,start)+replacement+s.slice(end);
 const direct="else if(req.url==='/turn'&&req.method==='POST')res.end(JSON.stringify(await client.request('turn',await body(req))));";
 if(!s.includes(direct))throw Error('Direct turn block changed');
 s=s.replace(direct,"else if(req.url==='/turn'&&req.method==='POST'){const p=await body(req);res.end(JSON.stringify(await resolveDesktopTurn(p.text,{dailyTurn:()=>client.request('turn',p)})));}");
 if(dir!==here){await fs.copyFile(target,target+'.before-work-handoff-'+Date.now());await fs.copyFile(path.join(here,'work-handoff.mjs'),path.join(dir,'work-handoff.mjs'));}
 await fs.writeFile(target,s);console.log(JSON.stringify({patched:target}));
}

