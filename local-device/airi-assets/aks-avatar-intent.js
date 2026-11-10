// Presentation signals only. Never expose reasoning or alter the conversational reply.
export const AVATAR_PROFILES=Object.freeze({
 idle:{clip:'Gogh_Idle_Natural_01',loop:true,upper:false,expression:'neutral',weight:0},
 thinking:{clip:'A_Avatar_Sit_00007',loop:true,upper:true,expression:'neutral',weight:0},
 reading:{clip:'A_Avatar_Sit_00007',loop:true,upper:true,expression:'neutral',weight:0},
 explaining:{clip:'A_Avatar_Stand_00010',loop:true,upper:true,expression:'neutral',weight:0},
 pleased:{clip:'A_Avatar_Stand_00022',loop:false,upper:true,expression:'happy',weight:.22},
 amused:{clip:'A_Avatar_Stand_00012',loop:false,upper:true,expression:'happy',weight:.16},
 concerned:{clip:'A_Avatar_Sit_00007',loop:false,upper:true,expression:'sad',weight:.14},
 skeptical:{clip:'A_Avatar_Stand_00012',loop:false,upper:true,expression:'neutral',weight:0},
 reflecting:{clip:'A_Avatar_Sit_00007',loop:false,upper:true,expression:'neutral',weight:0},
 farewell:{clip:'A_Avatar_Stand_00022',loop:false,upper:true,expression:'relaxed',weight:.18}
});
export function avatarSignal({phase='idle',intent='idle',at=Date.now(),id='',source='cloud'}={}){
 const stage=['thinking','reading','replying','idle','error'].includes(phase)?phase:'idle';
 const action=stage==='thinking'?'thinking':stage==='reading'?'reading':Object.hasOwn(AVATAR_PROFILES,intent)?intent:stage==='replying'?'explaining':'idle';
 return {schema:'aks-avatar/v1',id,phase:stage,intent:action,at,expiresAt:at+(stage==='replying'?12000:stage==='thinking'||stage==='reading'?60000:4000),source};
}
export function resolveAvatar(signal,now=Date.now()){
 if(!signal||signal.schema!=='aks-avatar/v1'||!Number.isFinite(signal.expiresAt)||signal.expiresAt<=now||!Object.hasOwn(AVATAR_PROFILES,signal.intent))return {...AVATAR_PROFILES.idle,intent:'idle',id:''};
 return {...AVATAR_PROFILES[signal.intent],intent:signal.intent,id:String(signal.id||''),phase:signal.phase};
}
export const avatarIntentTool={type:'function',function:{name:'set_avatar_intent',description:'可选的桌宠动作信号：根据你这一轮实际想表达的态度选择一次。只影响动作，不输出内心独白，不必每轮调用；悲伤话题不等于自己悲伤，避免机械配对关键词。',parameters:{type:'object',properties:{intent:{type:'string',enum:['explaining','pleased','amused','concerned','skeptical','reflecting','farewell']},reason:{type:'string',description:'至多20字说明表达用途，不写推理过程'}},required:['intent'],additionalProperties:false}}};
