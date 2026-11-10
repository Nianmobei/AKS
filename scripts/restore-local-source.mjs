// Apply the versioned local source to an existing compatible AIRI installation.
// Close AIRI and the device bridge before running. No processes are killed here.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=process.argv[2],bindingFile=process.argv[3],apply=process.argv.includes('--apply');
if(!root)throw Error('Usage: node scripts/restore-local-source.mjs INSTALL_ROOT PRIVATE_BINDINGS_JSON [--apply]');
const source=path.join(repo,'local-device'),manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json'),'utf8'));
const bindings=bindingFile&&!bindingFile.startsWith('--')?JSON.parse(fs.readFileSync(bindingFile,'utf8')):{};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const updates=[];
for(const [name,digest] of Object.entries(manifest.files)){
 let bytes=fs.readFileSync(path.join(source,name));if(hash(bytes)!==digest)throw Error('Snapshot changed: '+name+'; regenerate manifest with sync-local-source');
 let text=bytes.toString();for(const key of manifest.bindingKeys){if(text.includes(key)){if(!/^\d{7,}$/.test(String(bindings[key]||'')))throw Error('Missing private binding '+key);text=text.split(key).join(String(bindings[key]));}}
 updates.push([name,Buffer.from(text)]);
}
const archive=path.join(root,'airi/resources/app.asar'),original=fs.readFileSync(archive);
if(original.readUInt32LE(0)!==4)throw Error('Unsupported ASAR');
const tree=JSON.parse(original.subarray(16,16+original.readUInt32LE(12))),body=original.subarray(8+original.readUInt32LE(4));
const assets=tree.files.out.files.bundle.files.renderer.files.assets.files;
if(!assets['gogh-ui.js']||!assets['aks-cloud-device.js'])throw Error('Existing AKS/Gogh-enabled AIRI required');
let offset=body.length;const appended=[];
for(const [name,bytes] of updates.filter(([n])=>n.startsWith('airi-assets/'))){
 const blockSize=4194304,blocks=[];for(let i=0;i<bytes.length;i+=blockSize)blocks.push(hash(bytes.subarray(i,i+blockSize)));
 assets[path.basename(name)]={size:bytes.length,offset:String(offset),integrity:{algorithm:'SHA256',hash:hash(bytes),blockSize,blocks}};offset+=bytes.length;appended.push(bytes);
}
const json=Buffer.from(JSON.stringify(tree)),header=Buffer.alloc(8+Math.ceil(json.length/4)*4);header.writeUInt32LE(header.length-4,0);header.writeUInt32LE(json.length,4);json.copy(header,8);
const prefix=Buffer.alloc(8);prefix.writeUInt32LE(4,0);prefix.writeUInt32LE(header.length,4);
if(!apply){console.log('Validation passed. Close AIRI and bridge, then rerun with --apply.');process.exit(0);}
const backup=path.join(root,'client/backups','source-restore-'+Date.now());fs.mkdirSync(backup,{recursive:true});fs.copyFileSync(archive,path.join(backup,'app.asar'));
for(const [name,bytes] of updates.filter(([n])=>!n.startsWith('airi-assets/'))){const target=path.join(root,name),old=path.join(backup,name);if(fs.existsSync(target)){fs.mkdirSync(path.dirname(old),{recursive:true});fs.copyFileSync(target,old);}fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);}
fs.writeFileSync(archive+'.next',Buffer.concat([prefix,header,body,...appended]));
try{fs.copyFileSync(archive+'.next',archive);}catch(error){fs.copyFileSync(path.join(backup,'app.asar'),archive);throw error;}
fs.unlinkSync(archive+'.next');
console.log(JSON.stringify({restored:updates.length,backup,restartRequired:true}));
