import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {defaultPersona} from './persona-config.mjs';
export const release=JSON.parse(readFileSync(new URL('./release.json',import.meta.url),'utf8'));
export function cloudPolicy(env=process.env,routes={}){
 const integer=(key,fallback,min,max)=>{const n=Number(env[key]??fallback);if(!Number.isSafeInteger(n)||n<min||n>max)throw Error('Invalid '+key);return n;};
 const optional=(key,min,max)=>{if(env[key]==null)return undefined;const n=Number(env[key]);if(!Number.isFinite(n)||n<min||n>max)throw Error('Invalid '+key);return n;};
 const chatProvider=routes.chatProvider||env.AKS_CHAT_PROVIDER||'deepseek';if(!['deepseek','apiyi'].includes(chatProvider))throw Error('Invalid chat provider');
 return Object.freeze({chatProvider,chatModel:chatProvider==='apiyi'?'gemini-4-argon':env.AKS_MODEL||'deepseek-v4-pro',chatTimeoutMs:45000,model:env.AKS_MODEL||'deepseek-v4-pro',contextTokens:integer('AKS_CONTEXT_TOKENS',24000,4096,1000000),outputTokens:integer('AKS_OUTPUT_TOKENS',2600,60,32000),temperature:optional('AKS_TEMPERATURE',0,2),topP:optional('AKS_TOP_P',0,1)});
}
export function releaseStatus(policy=cloudPolicy()){
 return {...release,authority:'cloud',personaVersion:defaultPersona.version,personaHash:createHash('sha256').update(JSON.stringify(defaultPersona)).digest('hex'),policy:{...policy},localRole:'avatar-audio-capture-project-bridge',heavyLocalInference:false};
}
