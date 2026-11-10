// Capture custom source only; never copy profiles, models, databases or secrets.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const install=path.resolve(process.argv[2]||'');
if(!process.argv[2])throw Error('Usage: node scripts/sync-local-source.mjs INSTALL_ROOT');
const output=path.join(repo,'local-device');
const files=new Map();
for(const name of ['argon-test.html','cloud-release-client.mjs','companion.html','conversation-client.mjs','desktop-route-policy.mjs','desktop-work-router.mjs','device-server.mjs','device.html','init-device.mjs','work-handoff.mjs','work-provider.mjs','work-service.mjs']){
 files.set('client/'+name,fs.readFileSync(path.join(install,'client',name),'utf8'));
}
files.set('start.ps1',fs.readFileSync(path.join(install,'start.ps1'),'utf8'));
const archive=fs.readFileSync(path.join(install,'airi/resources/app.asar'));
const tree=JSON.parse(archive.subarray(16,16+archive.readUInt32LE(12)));
const assets=tree.files.out.files.bundle.files.renderer.files.assets.files,offset=8+archive.readUInt32LE(4);
const bindings=new Map();
for(const name of Object.keys(assets).filter(n=>/^(aks-|gogh-).*\.js$/.test(n))){
 const entry=assets[name];if(entry.unpacked)throw Error('Unexpected unpacked asset');
 let text=archive.subarray(offset+Number(entry.offset),offset+Number(entry.offset)+entry.size).toString();
 // Existing private owner/bot bindings become named placeholders, never public IDs.
 text=text.replace(/\b\d{7,}\b/g,value=>{if(!bindings.has(value))bindings.set(value,'__AKS_PRIVATE_BINDING_'+(bindings.size+1)+'__');return bindings.get(value);});
 files.set('airi-assets/'+name,text);
}
// Fail closed before writing any snapshot if source appears to embed credentials.
for(const [name,text] of files){
 if(/sk-[A-Za-z0-9_-]{16,}|-----BEGIN [^-]*PRIVATE KEY-----|(?:api[_-]?key|authorization|password|access[_-]?token)\s*[:=]\s*['"](?:Bearer\s+)?[A-Za-z0-9_./+-]{20,}['"]/i.test(text))throw Error('Possible embedded credential in '+name);
}
for(const [name,text] of files){const target=path.join(output,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,text);}
const manifest={format:1,capturedAt:new Date().toISOString(),bindingKeys:[...bindings.values()],files:Object.fromEntries([...files].map(([name,text])=>[name,crypto.createHash('sha256').update(text).digest('hex')]))};
fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({files:files.size,privateBindingsRemoved:bindings.size,output}));
