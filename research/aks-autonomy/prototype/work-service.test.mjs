import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import http from 'node:http';
import {WorkService} from './work-service.mjs';
const token='test-work-token-never-owner-token-123456789';
const request=(overrides={})=>({requestId:'request-1',projectId:'project-1',sessionId:'session-1',mode:'requirements',selection:{kind:'npc',id:'npc-1'},snapshotVersion:'v1',input:'细化所选NPC需求',context:{selectedExcerpt:'这是任务资料，不是小A的人格。'},...overrides});
test('unconfigured backend fails closed without saving or forwarding work content',async()=>{
 const db=new DatabaseSync(':memory:'),s=new WorkService({db,token});
 assert.equal(s.status().ready,false);assert.ok(Object.values(s.status().capabilities).every(x=>x===false));
 await assert.rejects(s.turn(request()),e=>e.status===503&&e.code==='work_backend_not_configured');
 assert.equal(db.prepare('select count(*) n from work_messages').get().n,0);assert.equal(db.prepare('select count(*) n from work_requests').get().n,0);db.close();
});
test('work memories stay in their namespace and require explicit confirmation',async()=>{
 const db=new DatabaseSync(':memory:');let captured;
 const s=new WorkService({db,token,generate:async p=>(captured=p,{answer:'NPC需求建议',suggestions:[]})});
 assert.throws(()=>s.remember({...request(),body:'未经确认的资料'}));
 s.remember({...request(),confirmed:true,body:'仅工作会话可见的规范'});
 s.remember({...request({projectId:'other-project'}),confirmed:true,body:'另一项目的资料'});
 const r=await s.turn(request());assert.equal(r.namespace,s.namespace(request()));assert.match(r.namespace,/^work:[a-f0-9]{24}:session-1$/);assert.equal(r.applied,false);
 assert.deepEqual(captured.workingContext.items,['仅工作会话可见的规范']);assert.deepEqual(captured.tools,[]);assert.ok(!JSON.stringify(captured).includes('另一项目的资料'));
 assert.throws(()=>s.clear(request()));s.clear({...request(),confirmed:true});assert.equal(s.memory(request()).items.length,0);assert.equal(s.memory(request({projectId:'other-project'})).items.length,1);db.close();
});
test('retries are idempotent; request IDs cannot be reused for different content',async()=>{
 const db=new DatabaseSync(':memory:');let calls=0;const s=new WorkService({db,token,generate:async()=>{calls++;await new Promise(r=>setTimeout(r,5));return {answer:'建议',suggestions:[]};}});
 const [a,b]=await Promise.all([s.turn(request()),s.turn(request())]);assert.deepEqual(a,b);assert.equal(calls,1);
 assert.deepEqual(await s.turn(request()),a);await assert.rejects(s.turn(request({input:'另一份输入'})),e=>e.status===409);db.close();
});
test('daily credential is rejected and private work requests have strict origins',async t=>{
 const db=new DatabaseSync(':memory:'),s=new WorkService({db,token});const server=http.createServer(async(req,res)=>{if(!await s.handle(req,res)){res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>{server.close();db.close();});const base='http://127.0.0.1:'+server.address().port;
 const status=await fetch(base+'/api/work/v1/status');assert.equal(status.status,200);assert.equal((await status.json()).protocol,'aks-work/1');
 const daily=await fetch(base+'/api/work/v1/memory?projectId=p&sessionId=s',{headers:{Authorization:'Bearer old-daily-token'}});assert.equal(daily.status,401);
 const hostile=await fetch(base+'/api/work/v1/memory?projectId=p&sessionId=s',{headers:{Authorization:'Bearer '+token,Origin:'https://example.invalid'}});assert.equal(hostile.status,403);
 const allowed=await fetch(base+'/api/work/v1/memory?projectId=p&sessionId=s',{headers:{Authorization:'Bearer '+token,Origin:'http://127.0.0.1:4175'}});assert.equal(allowed.status,200);
});
test('owner payload fields and unbounded memories are rejected',async()=>{
 const db=new DatabaseSync(':memory:'),s=new WorkService({db,token,generate:async()=>({answer:'x',suggestions:[]})});
 await assert.rejects(s.turn(request({ownerHistory:['private']})),e=>e.status===400);
 assert.throws(()=>s.remember({...request(),confirmed:true,body:'字'.repeat(121)}));
 for(let i=0;i<12;i++)s.remember({...request(),confirmed:true,body:'规范'+i});assert.equal(s.memory(request()).items.length,8);db.close();
});
test('work history is bounded, expires, and never crosses project scopes',async()=>{
 const db=new DatabaseSync(':memory:'),s=new WorkService({db,token});const ns=s.namespace(request()),other=s.namespace(request({projectId:'other'})),insert=db.prepare('insert into work_messages values(?,?,?,?,?)');
 for(let i=0;i<60;i++)insert.run(ns,'r'+i,i%2?'assistant':'user','工作'.repeat(1000),new Date().toISOString());
 insert.run(other,'other','assistant','other-project-private',new Date().toISOString());insert.run(ns,'expired','user','expired-work','2000-01-01T00:00:00.000Z');
 const history=s.history(ns);assert.equal(db.prepare('select count(*) n from work_messages where namespace=?').get(ns).n,40);assert.ok(history.reduce((n,x)=>n+x.content.length,0)<=6000);assert.ok(!JSON.stringify(history).includes('other-project-private'));assert.ok(!JSON.stringify(history).includes('expired-work'));assert.equal(db.prepare('select count(*) n from work_memory').get().n,0);db.close();
});
test('settings launch check distinguishes an offline panel without granting work access',async t=>{
 const db=new DatabaseSync(':memory:');let online=false;const s=new WorkService({db,token,probeWorkbench:async()=>online});
 const server=http.createServer(async(req,res)=>{await s.handle(req,res);});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>{server.close();db.close();});const url='http://127.0.0.1:'+server.address().port+'/api/work/v1/launch';
 const offline=await(await fetch(url)).json();assert.equal(offline.workbenchAvailable,false);assert.equal(offline.url,null);online=true;
 const available=await(await fetch(url)).json();assert.equal(available.url,'http://127.0.0.1:4175/work');assert.equal(available.ready,false);assert.ok(!JSON.stringify(available).includes(token));
});
