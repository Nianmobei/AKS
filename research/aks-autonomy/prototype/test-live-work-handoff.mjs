import fs from 'node:fs/promises';import {randomUUID} from 'node:crypto';import assert from 'node:assert/strict';
const token=(await fs.readFile('C:/Users/linbowen/Documents/AKS-Windows-本地端/client/cloud/secrets/LOCAL_CONVERSATION_TOKEN','utf8')).trim();
const headers={Authorization:'Bearer '+token,'Content-Type':'application/json'};
async function post(route,p,extra={}){const r=await fetch('http://127.0.0.1:6220'+route,{method:'POST',headers:{...headers,...extra},body:JSON.stringify(p),signal:AbortSignal.timeout(30000)});const d=await r.json();assert.equal(r.status,200,JSON.stringify(d));return d;}
const before=await post('/history',{limit:1});
const discovery=await fetch('http://127.0.0.1:4175/discovery').then(r=>r.json());
const id=randomUUID();await post('/prepare-turn',{id,text:'请检查任务工作台当前许愿井任务的矛盾与缺项，先列出建议供我审阅。'});
const payload={model:'aks-cloud',messages:[{role:'user',content:[{type:'text',text:'native context'},{type:'image_url',image_url:{url:'invalid-image-must-never-upload'}}]}],stream:false};
const result=await post('/v1/chat/completions',payload,{'x-airi-round-id':id});
const retry=await post('/v1/chat/completions',payload,{'x-airi-round-id':id});
assert.deepEqual(result,retry);const reply=result.choices[0].message.content;assert.match(reply,/已转交|连接未就绪|无法连接/);
const after=await post('/history',{limit:1});assert.deepEqual(after,before,'Daily history changed during isolated handoff');
console.log(JSON.stringify({nativeHandoff:reply.includes('已转交'),connected:discovery.connected,dailyHistoryUnchanged:true,retryStable:true,imageUploadBypassed:true,reply}));
