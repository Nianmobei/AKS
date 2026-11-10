import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
test('restore validates before writing and preserves unrelated ASAR assets',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'aks-restore-'));
 try{
  const archive=path.join(root,'airi/resources/app.asar');fs.mkdirSync(path.dirname(archive),{recursive:true});
  const body=Buffer.from('original-payload');const entry={offset:'0',size:body.length};
  const tree={files:{out:{files:{bundle:{files:{renderer:{files:{assets:{files:{'gogh-ui.js':entry,'aks-cloud-device.js':entry,'untouched.js':entry}}}}}}}}}};
  const json=Buffer.from(JSON.stringify(tree)),header=Buffer.alloc(8+Math.ceil(json.length/4)*4),prefix=Buffer.alloc(8);
  header.writeUInt32LE(header.length-4);header.writeUInt32LE(json.length,4);json.copy(header,8);prefix.writeUInt32LE(4);prefix.writeUInt32LE(header.length,4);
  const original=Buffer.concat([prefix,header,body]);fs.writeFileSync(archive,original);
  const binding=path.join(root,'bindings.json');fs.writeFileSync(binding,JSON.stringify({'__AKS_PRIVATE_BINDING_1__':'11111111','__AKS_PRIVATE_BINDING_2__':'22222222','__AKS_PRIVATE_BINDING_3__':'33333333'}));
  const script=path.resolve('scripts/restore-local-source.mjs');
  const missing=spawnSync(process.execPath,[script,root,'--apply']);assert.notEqual(missing.status,0);assert.deepEqual(fs.readFileSync(archive),original);
  execFileSync(process.execPath,[script,root,binding]);assert.deepEqual(fs.readFileSync(archive),original);
  execFileSync(process.execPath,[script,root,binding,'--apply']);
  const next=fs.readFileSync(archive),nextTree=JSON.parse(next.subarray(16,16+next.readUInt32LE(12))),nextBody=next.subarray(8+next.readUInt32LE(4));
  assert.equal(nextBody.subarray(0,body.length).toString(),'original-payload');
  assert.ok(nextTree.files.out.files.bundle.files.renderer.files.assets.files['aks-cloud-route.js']);
  assert.ok(!nextBody.toString().includes('__AKS_PRIVATE_BINDING_'));
  assert.ok(fs.existsSync(path.join(root,'client/device-server.mjs')));
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
