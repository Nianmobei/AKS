import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {measuredJson,recordModel,failureDetails} from './provider-diagnostics.mjs';import {ConversationHub} from './conversation-hub.mjs';
test('stream parser assembles fragmented UTF-8, tools and usage and rejects partial replies',async()=>{
 const events=[{choices:[{index:0,delta:{content:'你好',tool_calls:[{index:0,id:'call-1',function:{name:'library_read',arguments:'{"id":'}}]},finish_reason:null}]},{choices:[{index:0,delta:{tool_calls:[{index:0,function:{arguments:'"doc"}'}}]},finish_reason:'tool_calls'}],usage:{prompt_tokens:20,completion_tokens:8}}];
 const text=events.map(x=>'data: '+JSON.stringify(x)+'\n\n').join('')+'data: [DONE]\n\n',bytes=new TextEncoder().encode(text);
 const fetchImpl=async()=>new Response(new ReadableStream({start(c){for(let i=0;i<bytes.length;i+=7)c.enqueue(bytes.slice(i,i+7));c.close();}}),{headers:{'content-type':'text/event-stream'}});
 const x=await measuredJson('https://provider.invalid',{},{timeoutMs:1000,fetchImpl});assert.equal(x.choices[0].message.content,'你好');assert.equal(x.choices[0].message.tool_calls[0].function.arguments,'{"id":"doc"}');assert.equal(x.usage.prompt_tokens,20);assert.equal(x._aksTransport.stream,true);
 await assert.rejects(measuredJson('https://provider.invalid',{},{timeoutMs:1000,fetchImpl:async()=>new Response('data: {"choices":[{"delta":{"content":"unfinished"}}]}\n\n',{headers:{'content-type':'text/event-stream'}})}),e=>e.diagnostic.reason==='invalid_json');
});
test('transport separates header wait from body time and redacts network errors',async()=>{
 let now=0;const result=await measuredJson('https://provider.invalid',{},{timeoutMs:1000,clock:()=>now,fetchImpl:async()=>{now=50;return {ok:true,status:200,json:async()=>{now=80;return {choices:[]};}};}});
 assert.equal(result._aksTransport.headersMs,50);assert.equal(result._aksTransport.bodyMs,30);
 for(const [fetchImpl,reason,status] of [[async()=>({ok:false,status:429}),'http',429],[async()=>{throw Object.assign(Error('secret prompt and credential'),{cause:{code:'ECONNRESET'}});},'network',null]]){
  await assert.rejects(measuredJson('https://provider.invalid',{},{timeoutMs:1000,fetchImpl}),e=>{assert.equal(e.diagnostic.reason,reason);assert.equal(e.diagnostic.status,status);assert.doesNotMatch(JSON.stringify(failureDetails(e)),/secret|credential/);return true;});
 }
});
test('reply model metadata survives replay and restart without entering model history',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'aks-model-trace-'));const file=path.join(root,'state.sqlite');let seen;
 const generate=async({history})=>{seen=history;recordModel({provider:'apiyi',failed:true,reason:'timeout',phase:'waiting_headers'});recordModel({provider:'deepseek',model:'deepseek-v4-pro',fallbackReason:'timeout'});return '已回复';};
 let hub=new ConversationHub(file,root,{generate});await hub.importNative({system:'identity '.repeat(20),messages:[]});
 const input={id:'trace-replay-test',text:'问题'};assert.equal((await hub.submit(input)).model.provider,'deepseek');assert.equal((await hub.submit(input)).model.attempts[0].phase,'waiting_headers');
 hub.db.close();hub=new ConversationHub(file,root,{generate});assert.equal(hub.history().messages.at(-1).model.fallbackReason,'timeout');assert.doesNotMatch(JSON.stringify(seen),/provider|timeout/);hub.db.close();await fs.rm(root,{recursive:true,force:true});
});
