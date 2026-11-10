import test from 'node:test';
import assert from 'node:assert/strict';
import {cloudPolicy,releaseStatus,release} from './runtime-policy.mjs';
test('cloud owns model and context policy, with validated configuration',()=>{
 const p=cloudPolicy({AKS_MODEL:'cloud-model',AKS_CONTEXT_TOKENS:'32000',AKS_OUTPUT_TOKENS:'1800',AKS_TEMPERATURE:'0.4'});
 assert.equal(p.model,'cloud-model');assert.equal(p.contextTokens,32000);
 assert.throws(()=>cloudPolicy({AKS_CONTEXT_TOKENS:'bad'}),/Invalid/);
 assert.equal(releaseStatus(p).authority,'cloud');assert.equal(releaseStatus(p).version,release.version);
 assert.match(releaseStatus(p).personaHash,/^[0-9a-f]{64}$/);
});
