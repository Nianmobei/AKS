// Apply only the existing Gogh preset's ambient fill value. Run with AIRI closed.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const install=process.argv[2];if(!install)throw Error('Install root required');
const archive=path.join(install,'airi/resources/app.asar'),original=fs.readFileSync(archive);
if(original.readUInt32LE(0)!==4)throw Error('Unexpected ASAR header');
const size=original.readUInt32LE(4),length=original.readUInt32LE(12),tree=JSON.parse(original.subarray(16,16+length).toString()),body=original.subarray(8+size);
const asset=tree.files?.out?.files?.bundle?.files?.renderer?.files?.assets?.files?.['gogh-ui.js'];if(!asset||asset.unpacked)throw Error('Gogh renderer asset missing');
const before=body.subarray(Number(asset.offset),Number(asset.offset)+asset.size).toString(),needle='ambientLightIntensity:.22';if(before.split(needle).length!==2)throw Error('Expected original ambient fill exactly once');
const bytes=Buffer.from(before.replace(needle,'ambientLightIntensity:.32')),blockSize=asset.integrity?.blockSize||4194304,blocks=[];for(let i=0;i<bytes.length;i+=blockSize)blocks.push(crypto.createHash('sha256').update(bytes.subarray(i,i+blockSize)).digest('hex'));
Object.assign(asset,{offset:String(body.length),size:bytes.length,integrity:{algorithm:'SHA256',hash:crypto.createHash('sha256').update(bytes).digest('hex'),blockSize,blocks}});
const json=Buffer.from(JSON.stringify(tree)),padded=Math.ceil(json.length/4)*4,header=Buffer.alloc(8+padded);header.writeUInt32LE(4+padded,0);header.writeUInt32LE(json.length,4);json.copy(header,8);const sizeHeader=Buffer.alloc(8);sizeHeader.writeUInt32LE(4,0);sizeHeader.writeUInt32LE(header.length,4);
const updated=Buffer.concat([sizeHeader,header,body,bytes]);if(!updated.subarray(8+header.length,8+header.length+body.length).equals(body))throw Error('Existing payload changed');
const backup=archive+'.before-fill-light-'+Date.now();fs.copyFileSync(archive,backup);fs.writeFileSync(archive+'.fill-next',updated);fs.renameSync(archive+'.fill-next',archive);console.log(JSON.stringify({backup,ambientBefore:.22,ambientAfter:.32,addedLights:0,addedShadows:0}));
