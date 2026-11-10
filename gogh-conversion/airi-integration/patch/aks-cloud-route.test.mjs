import test from 'node:test';import assert from 'node:assert/strict';import {bindAksCloudRoute} from './aks-cloud-route.js';
test('restored AKS card explicitly uses the local device bridge instead of global provider',async()=>{
 const consciousness={activeProvider:'other-provider',activeModel:'other-model'},reports=[],changes=[];
 const cards={activeCard:{name:'小A'},selectedAvatarModel:{displayModelId:'preset-gogh-aks-slot0'},updateActiveCardConsciousness:async value=>{changes.push(value);consciousness.activeProvider=value.provider;consciousness.activeModel=value.model;}};
 const config={apiKey:'device-test-key',baseUrl:'https://wrong.invalid/v1/'};let saved;
 const providers={getProviderConfig:()=>config,updateProviderConfig:(id,value,status)=>saved={id,value,status}};
 await bindAksCloudRoute({cards,providers,consciousness,report:async x=>reports.push(x)});
 assert.equal(consciousness.activeProvider,'aks-cloud');assert.equal(saved.value.baseUrl,'http://127.0.0.1:6220/v1/');assert.equal(saved.value.apiKey,config.apiKey);assert.equal(reports[0].cardScoped,true);assert.doesNotMatch(JSON.stringify(reports),/device-test-key/);
 cards.activeCard.name='Other character';await bindAksCloudRoute({cards,providers,consciousness});assert.equal(changes.length,1);
});
test('missing device credentials fail closed on AKS and do not revert to another provider',async()=>{
 const consciousness={activeProvider:'other'},reports=[];
 const cards={activeCard:{name:'AKS'},selectedAvatarModel:{displayModelId:'preset-gogh-aks-slot0'},updateActiveCardConsciousness:async x=>{consciousness.activeProvider=x.provider;}};
 await assert.rejects(bindAksCloudRoute({cards,consciousness,providers:{getProviderConfig:()=>null},report:async x=>reports.push(x)}),/key is not configured/);
 assert.equal(consciousness.activeProvider,'aks-cloud');assert.equal(reports[0].phase,'missing_device_key');
});
