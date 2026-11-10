import {readFileSync} from 'node:fs';
export const defaultPersona=JSON.parse(readFileSync(new URL('./persona.json',import.meta.url),'utf8'));
export function personaPrompt(persona=defaultPersona){
 if(!persona?.canon||typeof persona.voice!=='string'||!Array.isArray(persona.boundaries))throw Error('Invalid persona configuration');
 return `你是${persona.name}，称用户为${persona.ownerTitle}。以下固定人格由统一配置提供。\n固定背景：${JSON.stringify(persona.canon)}\n表达：${persona.voice}\n边界：${persona.boundaries.join('\n')}`;
}
