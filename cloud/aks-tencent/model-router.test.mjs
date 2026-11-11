import test from 'node:test';import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createModelRouter,argonRequest,argonCost} from './model-router.mjs';
import {BudgetPolicy} from './budget-policy.mjs';
test('only dialogue uses Argon; bulk processing and DeepSeek settings stay separate',async()=>{
 const calls=[],policy={chatProvider:'apiyi',chatModel:'gemini-4-argon',model:'deepseek-v4-pro'};
 const router=createModelRouter({policy,deepseek:async b=>{calls.push(['deepseek',b]);return {};},argon:async b=>{calls.push(['argon',b]);return {choices:[{message:{content:'回答'}}]};}});
 await router.complete({_aksTask:'dialogue',thinking:{type:'disabled'},messages:[]});await router.complete({model:'deepseek-flash',messages:[]});
 assert.equal(calls[0][0],'argon');assert.equal(calls[0][1].thinking,undefined);assert.equal(calls[0][1].reasoning_effort,'low');assert.equal(calls[1][0],'deepseek');assert.equal(calls[1][1].model,'deepseek-flash');assert.equal(router.status().lastDialogue.provider,'apiyi');
});
test('failed Argon never invokes DeepSeek for dialogue, including cooldown',async()=>{
 let now=1000,attempts=0;const seen=[];
 const r=createModelRouter({policy:{chatProvider:'apiyi',model:'deepseek-v4-pro'},clock:()=>now,argon:async()=>{attempts++;throw Error('private provider detail');},deepseek:async b=>{seen.push(b);return {choices:[{message:{content:'回退回答'}}]};}});
 const messages=[{role:'user',content:'问题'},{role:'assistant',tool_calls:[{id:'x'}]},{role:'tool',tool_call_id:'x',content:'已执行结果'}];
 await assert.rejects(r.complete({_aksTask:'dialogue',messages}),/稍后再试/);await assert.rejects(r.complete({_aksTask:'dialogue',messages}),/稍后再试/);assert.equal(attempts,1);assert.equal(seen.length,0);
 now+=90001;await assert.rejects(r.complete({_aksTask:'dialogue',messages}),/稍后再试/);assert.equal(attempts,2);assert.equal(r.status().bulkProvider,'deepseek');assert.equal(r.status().fallback,'disabled');
 await r.complete({_aksTask:'bulk',messages});assert.equal(seen.length,1);
});
test('a DeepSeek dialogue configuration is rejected, not silently used',async()=>{let calls=0;const r=createModelRouter({policy:{chatProvider:'deepseek',model:'deepseek-v4-pro'},deepseek:async()=>{calls++;},argon:async()=>{}});await assert.rejects(r.complete({_aksTask:'dialogue'}),/未配置/);assert.equal(calls,0);});
test('provider costs are charged independently while legacy usage retains its original rate',()=>{
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE usage(id INTEGER PRIMARY KEY,at TEXT,kind TEXT,input INTEGER,output INTEGER)');
 const budget=new BudgetPolicy(db,{clock:()=>new Date('2026-11-10T03:00:00Z')});const id=budget.reserve(.1);
 budget.settle(id,{input:1000,output:100,provider:'apiyi',model:'gemini-4-argon',costCny:argonCost(1000,100,new Date('2026-11-10'))});
 assert.equal(budget.snapshot().used,.024);assert.equal(db.prepare('SELECT provider FROM usage').get().provider,'apiyi');assert.equal(argonCost(1000,100,new Date('2026-12-02')),.048);db.close();
});
