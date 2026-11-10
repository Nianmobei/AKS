import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {gzipSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const release=JSON.parse(await fs.readFile(path.join(root,'cloud/aks-tencent/release.json'),'utf8'));
const pkg=JSON.parse(await fs.readFile(path.join(root,'cloud/aks-tencent/package.json'),'utf8'));
if(pkg.version!==release.version)throw Error('Package/release version mismatch');
const bases=JSON.parse(await fs.readFile(path.join(root,'scripts/release-bases.json'),'utf8'));
const baseline=bases[release.version];if(!baseline)throw Error('Missing pinned upgrade baseline');
const names=['persona.json','server.mjs','conversation.mjs','conversation-hub.mjs','library.mjs','life.mjs','package.json','context-budget.mjs','persona-config.mjs','runtime-policy.mjs','release.json','video-reading.mjs','context-persona-video.test.mjs','release.test.mjs','budget-policy.mjs','model-router.mjs','model-router.test.mjs'];
const files={};
for(const name of names){const rel='cloud/aks-tencent/'+name;let before=null;try{before=execFileSync('git',['show',baseline+':'+rel],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).replace(/\r\n/g,'\n');}catch{}files[name]={before,after:(await fs.readFile(path.join(root,rel),'utf8')).replace(/\r\n/g,'\n')};}
const out=path.join(root,'dist');await fs.mkdir(out,{recursive:true});
await fs.writeFile(path.join(out,`aks-cloud-${release.version}.json.gz`),gzipSync(JSON.stringify({version:release.version,files})));
await fs.copyFile(path.join(root,'scripts/install-cloud-release.py'),path.join(out,'install-cloud-release.py'));
console.log(JSON.stringify({bundle:path.join(out,`aks-cloud-${release.version}.json.gz`),files:names.length}));
