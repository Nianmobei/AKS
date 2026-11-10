import {spawn} from 'node:child_process';import {fileURLToPath} from 'node:url';import path from 'node:path';
export class ConversationClient {
 constructor({root=fileURLToPath(new URL('../../../cloud/aks-tencent/',import.meta.url)),host='124.222.24.51',transport=null,keyName='aks-desktop-conversation'}={}){Object.assign(this,{root,host,transport,keyName});}
 request(action,payload={}){if(!(this.keyName==='aks-codex-worker'?['review-next','claim','complete','status','submit','list','feedback','approve','deactivate']:['avatar','history','turn','asset_upload','asset_read','import','health','qq_status','qq_qr']).includes(action))return Promise.reject(Error('Unknown conversation action'));if(this.transport)return this.transport(action,payload);
  return new Promise((resolve,reject)=>{const child=spawn('C:/Windows/System32/OpenSSH/ssh.exe',['-T','-o','BatchMode=yes','-o','ConnectTimeout=8','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile='+path.join(this.root,'secrets/known_hosts'),'-i',path.join(this.root,'secrets',this.keyName),'root@'+this.host,'aks-conversation'],{windowsHide:true,stdio:['pipe','pipe','pipe'],env:{...process.env,ProgramData:process.env.ProgramData||process.env.PROGRAMDATA||'C:\\ProgramData'}});let out='',settled=false;
   const done=(e,r)=>{if(settled)return;settled=true;clearTimeout(timer);e?reject(e):resolve(r);};const timer=setTimeout(()=>{child.kill();done(Error('Cloud request timed out; inspect history before retry'));},350000);
   child.stdout.on('data',b=>{out+=b;if(out.length>17000000){child.kill();done(Error('Cloud response too large'));}});child.stderr.resume();child.on('error',()=>done(Error('Conversation SSH unavailable')));child.stdin.on('error',()=>{});child.on('close',code=>{try{const r=JSON.parse(out);if(code||r.error)throw Error(r.error||'Cloud connection failed');done(null,r);}catch(e){done(e);}});child.stdin.end(JSON.stringify({action,payload}));
  });
 }
}
