import {localParts} from './calendar.mjs';
export function continuityContext(simulation,input,now=new Date()){
 const today=localParts(now,'Asia/Shanghai').date;
 const offset=/前天/.test(input)?2:/昨天/.test(input)?1:/今天/.test(input)?0:null;
 const targetDay=offset===null?null:localParts(new Date(+now-offset*86400000),'Asia/Shanghai').date;
 const inDay=value=>!!value&&localParts(new Date(value),'Asia/Shanghai').date===targetDay;
 const active=targetDay&&simulation.active&&!inDay(simulation.active.started)?null:simulation.active;
 const completed=targetDay?simulation.recentCompleted.filter(a=>inDay(a.ended)):simulation.recentCompleted;
 return {now:now.toISOString(),timeZone:'Asia/Shanghai',today,targetDay,active,recentCompleted:completed,novel:simulation.novel,
  reflections:simulation.reflections||[],dateRule:'询问AKS自己的昨天/今天，以伦敦日期为准；不得把北京时间换日后的昨天错套到伦敦当前进行的动作。',
  evidenceRule:'正在进行只证明开始与计划，不证明已有正文或中间成果。没有已保存稿件，不说停在第几章、写到哪句。指定日期无记录就说无记录，不把今天动作挪到昨天。',
  ...(targetDay?{onlyUseRequestedDay:true,hasRecordedAction:!!active||completed.length>0}:{}),provenance:simulation.provenance};
}
export function continuityViolations(reply,{simulation,input='',now=new Date()}={}){
 if(!simulation)return [];
 const context=continuityContext(simulation,input,now),reasons=[];
 if(context.active?.state==='in_progress'&&['write','revise'].includes(context.active.kind)&&/(?:^|[。！？\n，,；;])\s*(?:我)?(?:正文)?(?:还|尚)(?:没|未)(?:有)?(?:开始(?:写|动笔)?|动笔)/.test(reply))reasons.push('recorded-writing-already-started');
 if(!simulation.novel&&/(?:^|[。！？\n，,；;])\s*(?:我)?(?:现在|已经|之前|今天|昨天)?(?:停在|写到|写了).{0,8}(?:开头|第.{0,3}章|第.{0,3}页)/.test(reply)&&!/(?:现在写|现写|帮我写|续写)/.test(input))reasons.push('no-saved-manuscript-progress');
 if(context.targetDay&&!context.hasRecordedAction&&/昨天.{0,10}(?:在写|在读|去了|散步|读了|看了|写了|遇见)/.test(reply))reasons.push('no-action-on-requested-London-date');
 return reasons;
}
