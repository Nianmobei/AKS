// Route by explicit channel intent, not whether a topic resembles a job.
export function classify(text,active=false){
 const t=String(text||'').trim();
 if(/^(?:日常聊天|切换日常|聊点别的|退出工作)[。！! ]*$/.test(t))return 'daily-reset';
 const explicit=/^(?:\/work(?:\s|$)|@工作(?:\s|[：:]|$)|工作模式[：:]|(?:切换|切|进入)(?:到|至)?工作(?:模式|通道)|(?:请)?用(?:独立)?工作通道)/.test(t);
 if(explicit)return /任务工作台|工作区|许愿井任务/.test(t)?'project-work':'general-work';
 if(/(?:工作模式|工作通道|工作区)/.test(t)&&/(?:怎么|为什么|突然|莫名|不要|别|不想|不是|不算|退出|切回(?:日常|聊天))/.test(t))return 'daily';
 if(/(?:我自己的项目|我的项目不算工作|只是聊|只是讨论|随便聊)/.test(t))return 'daily';

 if(/^(?:请|帮我)?(?:打开|检查|连接|进入|使用|切换到).{0,8}(?:任务工作台|工作区|许愿井任务)/.test(t))return 'project-work';
 if(/^(?:帮我|请|麻烦|替我).{0,8}(?:整理|撰写|处理|总结).{0,12}(?:会议纪要|工作报告|办公文档)/.test(t))return 'general-work';
 if(/你觉得|你怎么看|你的看法|聊聊|阅读|读过|读完|小说|故事|创作|作品/.test(t))return 'daily';
 if(active&&/^(?:继续|接着|再补|再改|补充|改成|修改|修复|上面那|上一条)/.test(t))return 'followup';
 return 'daily';
}
