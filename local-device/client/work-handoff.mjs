export function isWorkbenchRequest(text){return typeof text==='string'&&/(?:任务工作台|任务工作区|工作台|许愿井任务)/.test(text);}
export async function resolveDesktopTurn(text,{dailyTurn,fetchImpl=fetch,hasImages=false}={}){
 const result=await handoffWorkbench(text,{fetchImpl});
 if(result && hasImages)result.reply+='\n本次图片未传入工作区，请在工作区另行提供。';
 return result || await dailyTurn();
}
export async function handoffWorkbench(text,{fetchImpl=fetch}={}){
 if(!isWorkbenchRequest(text))return null;
 try{
  const response=await fetchImpl('http://127.0.0.1:4175/handoff',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:text}),signal:AbortSignal.timeout(4000)});
  const data=await response.json();
  if(!response.ok)return {reply:'工作台连接未就绪或当前快照已过期，请打开工作台保持连接后重试；这不表示项目不存在。'};
  if(data.memoryDomain!=='work'||data.applied!==false||typeof data.url!=='string'||!/^http:\/\/127\.0\.0\.1:4175\/work\?handoff=[a-f0-9-]{36}$/i.test(data.url))throw Error('Invalid handoff');
  return {reply:'已转交独立工作区，请打开下方链接继续检查和逐项审阅，尚未自动修改项目。\n'+data.url};
 }catch{return {reply:'本机独立工作服务暂时无法连接。请启动工作服务后重试；这不表示项目不存在。'};}
}

