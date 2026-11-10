import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {createStatelessWorkProvider,normalizeWorkOutput} from './work-provider.mjs';

test('bad suggestions do not discard a valid answer; valid missing IDs receive unique IDs',()=>{
 const good={targetPath:'/node/qa-1/summary',after:'新摘要',reason:'简化'};
 const result=normalizeWorkOutput({answer:'有效回答',suggestions:[null,{...good,after:42},good,{...good,id:'x'},{...good,id:'x'}]});
 assert.equal(result.answer,'有效回答');assert.equal(result.invalid,2);assert.equal(result.suggestions.length,3);assert.equal(new Set(result.suggestions.map(x=>x.id)).size,3);assert.equal(result.suggestions[0].before,null);
 assert.equal(normalizeWorkOutput({answer:'正文',suggestions:'错误格式'}).invalid,1);
 assert.equal(normalizeWorkOutput({answer:'正文',suggestions:Array(10).fill(good)}).invalid,2);
 assert.throws(()=>normalizeWorkOutput({answer:'',suggestions:[good]}));
});
test('stateless work exit is explicit, uses only its dedicated token, and rejects owner endpoints',async t=>{
 const directory=await fs.mkdtemp(path.join(os.tmpdir(),'aks-work-provider-'));t.after(()=>fs.rm(directory,{recursive:true,force:true}));const tokenFile=path.join(directory,'work-token');await fs.writeFile(tokenFile,'new-dedicated-test-token-1234567890');let captured;
 assert.throws(()=>createStatelessWorkProvider({base:'http://127.0.0.1:6220',tokenFile}));
 const provider=createStatelessWorkProvider({base:'http://127.0.0.1:4175',tokenFile,fetchImpl:async(url,options)=>{assert.equal(options.headers.Authorization,'Bearer new-dedicated-test-token-1234567890');if(url.endsWith('/capabilities'))return Response.json({protocol:'aks-work/1',ready:true,stateless:true,memoryWrite:false});assert.equal(url,'http://127.0.0.1:4175/inference');captured=JSON.parse(options.body);return Response.json({choices:[{message:{content:JSON.stringify({answer:'工作答复',suggestions:[]})}}]});}});
 assert.equal(await provider.isReady(),true);const out=await provider({system:'独立工作隔离',history:[{role:'assistant',content:'工作短期上下文'}],mode:'qa',selection:{kind:'project',id:'p'},input:'工作问题',selectedExcerpt:'工作资料',workingContext:{type:'working_context',items:[]}});assert.equal(out.answer,'工作答复');assert.equal(captured.messages.length,3);assert.equal(captured.max_tokens,1800);
});
