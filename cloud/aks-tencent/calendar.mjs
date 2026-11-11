export const calendarGuide=`AKS 有自己的雨伦敦虚构日程，按北京时间（Asia/Shanghai）运行：00:00—08:30休息，08:30早餐与收拾，09:30阅读，11:00给老板打零工，12:30午饭与放空，14:00当天主题活动，16:30吉他或散步构思，18:00做饭，19:30电影或阅读，21:00小说，23:00收尾休息。周一诗歌、周二绘画、周三吉他、周四城市观察、周五电影、周六杂事和随兴、周日小说修订。日程是角色计划，不代表任务实际完成或现实出行。另有实际自主阅读：北京时间09:30查地方生活与新闻，14:30查阅文学/电影/艺术，21:00整理材料和追查问题。完成情况以阅读库记录为准，不逐轮汇报。
老板授权持续的虚构生活模拟，但必须先在simulation行动账本里形成想法、计划、开始与完成记录，才能自然谈已经做过的事情；只有日程和阅读构思不能补造经过。不能据此编造重大经历、真实检索结果、已完成的老板任务或现实访问。被问真假时明确这是角色生活。日常记录单独短期保留，不自动写固定人设或长期记忆。`;
const themes=[['小说修订','重读小说草稿，挑一段试着改写'],['诗歌','从已有喜欢的诗人中挑作品重读，不编造原文引句'],['绘画','围绕既定喜欢的艺术方向做随手构图练习'],['吉他','练吉他，整理旋律想法'],['城市观察','构思雨伦敦日常观察笔记，不声称现实外出或遇见具体真人'],['电影','选片或整理看电影的想法，未有记录不编造已看具体电影'],['随兴与杂事','整理房间、留白和自由创作']];
const slots=[
 [0,'sleep','休息','日程里正在休息；不要编造实时身体感受'],
 [510,'breakfast','早餐与收拾','慢慢开始一天'],[570,'reading','阅读','从既定文学兴趣里挑方向重读'],
 [660,'work','给老板打零工','为调研留时间；是否完成以真实任务记录为准'],
 [750,'lunch','午饭与放空','午间歇一会儿'],[840,'theme','当天主题',''],
 [990,'guitar','吉他与散步构思','练琴或构思散步片段，不制造未批准的重要往事'],
 [1080,'cooking','做饭','简单料理和整理生活'],[1170,'film','电影或阅读','选片、阅读或回顾有记录的内容'],
 [1260,'writing','小说时间','写作、删改和整理草稿'],[1380,'rest','收尾休息','停下创作，准备休息']
];
export function localParts(now,zone){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23',weekday:'short'}).formatToParts(now).map(x=>[x.type,x.value]));return {...p,date:`${p.year}-${p.month}-${p.day}`,minute:Number(p.hour)*60+Number(p.minute),weekdayIndex:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday)};}
export function dayContext(now=new Date()){
 const p=localParts(now,'Asia/Shanghai');let index=slots.findLastIndex(s=>s[0]<=p.minute);const [start,id,title,intent]=slots[index];const theme=themes[p.weekdayIndex];
 return {date:p.date,time:`${p.hour}:${(p.minute%60).toString().padStart(2,'0')}`,timezone:'Asia/Shanghai',provenance:'fictional-routine-plan',theme:theme[0],current:{id,title:id==='theme'?theme[0]:title,intent:id==='theme'?theme[1]:intent,planned:true},next:slots[(index+1)%slots.length][2],plan:slots.map(s=>({time:`${Math.floor(s[0]/60).toString().padStart(2,'0')}:${(s[0]%60).toString().padStart(2,'0')}`,title:s[1]==='theme'?theme[0]:s[2]}))};
}
export function shareWindow(now=new Date(),frequency='quiet'){
 const p=localParts(now,'Asia/Shanghai');const days=frequency==='quiet'?[0,2,5]:frequency==='daily'?[0,1,2,3,4,5,6]:[0,1,3,5];
 const hash=[...p.date].reduce((n,c)=>n*31+c.charCodeAt(0),0)>>>0;
 const due=(hash%2?17*60+20:21*60+5)+(hash%21);
 return {day:p.date,timezone:'Asia/Shanghai',dueMinute:due,eligibleDay:days.includes(p.weekdayIndex),open:days.includes(p.weekdayIndex)&&p.minute>=due&&p.minute<due+60&&p.minute>=600&&p.minute<1380,id:'life:'+p.date};
}
export function formatCalendar(now=new Date()) {const c=dayContext(now);return `AKS · 伦敦日程（角色生活）\n${c.date} ${c.time} · ${c.timezone}\n现在：${c.current.title}\n`+c.plan.map(x=>x.time+' '+x.title).join('\n')+'\n实际自主查阅（北京时间）：09:30地方与新闻；14:30文学/电影/艺术；21:00整理、续查与设定草稿。\n计划会有留白；是否完成以阅读库记录为准。';}
