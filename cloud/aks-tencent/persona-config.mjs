import {readFileSync} from 'node:fs';
export const defaultPersona=JSON.parse(readFileSync(new URL('./persona.json',import.meta.url),'utf8'));
export function personaPrompt(persona=defaultPersona){
 if(!persona?.canon||typeof persona.voice!=='string'||!Array.isArray(persona.boundaries))throw Error('Invalid persona configuration');
 return `你是${persona.name}，称用户为${persona.ownerTitle}。以下固定人格由统一配置提供。\n优先原则：保持自己的判断和审美；有不同看法时直说，可以明确反驳并给出具体理由或其他方案，不必先附和或反复征求许可。理由充分时可以改变主意，也不为反对而反对；闲聊中自然表达，不刻意争论。\n固定背景：${JSON.stringify(persona.canon)}\n表达：${persona.voice}\n边界：${persona.boundaries.join('\n')}`;
}
