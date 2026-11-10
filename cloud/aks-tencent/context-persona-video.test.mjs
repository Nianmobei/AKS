import test from 'node:test';
import assert from 'node:assert/strict';
import {budgetRequest} from './context-budget.mjs';
import {personaPrompt,defaultPersona} from './persona-config.mjs';
import {buildSystem,voiceRules} from './conversation.mjs';
import {readVideo,bilibiliVideoId} from './video-reading.mjs';
import {Life} from './life.mjs';
import {ConversationHub} from './conversation-hub.mjs';

test('budget evicts whole old turns and retains complete current tool exchange',()=>{
 const current=[{role:'user',content:'current'},{role:'assistant',tool_calls:[{id:'t',function:{name:'read',arguments:'{}'}}]},{role:'tool',tool_call_id:'t',content:'result'}];
 const b=budgetRequest({messages:[{role:'system',content:'identity'},{role:'user',content:'old'.repeat(4000)},{role:'assistant',content:'old reply'},...current],max_tokens:200},{inputTokens:1800,outputTokens:200,reserveTokens:100});
 assert.deepEqual(b.messages.slice(1),current);assert.equal(b.messages[0].content,'identity');
 assert.throws(()=>budgetRequest({messages:[{role:'user',content:'长'.repeat(10000)}]},{inputTokens:1000,outputTokens:200,reserveTokens:100}),/exceeded/);
});
test('one persona config supplies voice and all fixed fields',()=>{
 assert.equal(voiceRules,defaultPersona.voice);
 const p={...defaultPersona,name:'TEST',voice:'UNIQUE_VOICE',canon:{identity:'UNIQUE_CANON'}};
 const system=buildSystem(p);assert.ok(system.includes(personaPrompt(p)));assert.equal(system.split('UNIQUE_VOICE').length,2);
});
test('canonical identity works before AIRI import, preserves imported model settings, and touches owner activity',async()=>{
 let touched=0;const h=new ConversationHub(':memory:','unused',{identityProvider:stored=>({...stored,system:'canonical',settings:stored?.settings||{}}),onInteraction:()=>touched++,generate:async({identity})=>identity.system});
 try{assert.equal((await h.submit({id:'owner-turn-001',text:'hello'})).reply,'canonical');assert.equal(touched,1);await h.importNative({system:'outdated identity '.repeat(10),settings:{model:'test-model'},messages:[]});assert.equal(h.identity().system,'canonical');assert.equal(h.identity().settings.model,'test-model');}finally{h.db.close();}
});
test('local speak chance is paced across scheduler ticks without model calls',async()=>{
 const now=new Date('2026-11-10T13:20:00Z');let calls=0;const l=new Life(':memory:',{clock:()=>now,generate:async()=>{calls++;return '[不分享]';},send:async()=>{},probability:0,random:()=>.5});
 try{l.eligible=()=>true;assert.equal((await l.tick()).reason,'local-chance');assert.equal((await l.tick()).reason,'paced');assert.equal(calls,0);}finally{l.close();}
});
test('video evidence distinguishes metadata from timed subtitle excerpts and rejects foreign URLs',async()=>{
 assert.equal(bilibiliVideoId('https://evil.test/video/BV161nZ6JE6b/'),null);
 const url='https://www.bilibili.com/video/BV161nZ6JE6b/';
 const mock=subtitle=>async target=>({ok:true,json:async()=>target.includes('/view?')?{code:0,data:{cid:1,title:'title',desc:'description'}}:target.includes('/player/')?{data:{subtitle:{subtitles:subtitle?[{lan:'zh-CN',subtitle_url:'https://aisubtitle.hdslb.com/test.json'}]:[]}}}:{body:[{from:0,to:1,content:'first'},{from:1,to:2,content:'second'}]}});
 assert.equal((await readVideo(url,{fetchImpl:mock(false)})).coverage,'metadata-only');
 const r=await readVideo(url,{fetchImpl:mock(true),maxChars:6});assert.equal(r.coverage,'subtitle-excerpt');assert.deepEqual(r.transcript,[{from:0,to:1,text:'first'}]);
 await assert.rejects(readVideo('https://evil.test/'),/canonical/);
});
