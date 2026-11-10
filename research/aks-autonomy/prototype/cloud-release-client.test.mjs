import test from 'node:test';import assert from 'node:assert/strict';
import {createCloudReleaseReader} from './cloud-release-client.mjs';
test('cloud version is authoritative and cached without local inference or duplicate SSH requests',async()=>{
 let calls=0,now=0;const read=createCloudReleaseReader(async()=>{calls++;return {ok:true,release:{version:String(calls),authority:'cloud',protocol:'aks-cloud/1',minimumBridgeProtocol:1}};},{clock:()=>now,ttlMs:100});
 const [a,b]=await Promise.all([read(),read()]);assert.equal(calls,1);assert.equal(a.version,b.version);assert.equal(a.compatible,true);
 await read();assert.equal(calls,1);now=101;assert.equal((await read()).version,'2');
});
test('an old or offline cloud never becomes a fabricated local canonical version',async()=>{
 const read=createCloudReleaseReader(async()=>({ok:true}));await assert.rejects(read(),/统一版本/);
});
