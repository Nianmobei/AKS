import {classify} from './desktop-route-policy.mjs';
export {classify} from './desktop-route-policy.mjs';
export function createDesktopRouter({workService,fetchImpl=fetch}){
 const db=workService.db;db.exec('CREATE TABLE IF NOT EXISTS desktop_work_state (id INTEGER PRIMARY KEY CHECK(id=1), mode TEXT, updated INTEGER); CREATE TABLE IF NOT EXISTS desktop_route_pending (id INTEGER PRIMARY KEY CHECK(id=1), text TEXT, updated INTEGER)');
 db.exec('CREATE TABLE IF NOT EXISTS desktop_route_policy (id INTEGER PRIMARY KEY CHECK(id=1), version INTEGER)');
 if(db.prepare('SELECT version FROM desktop_route_policy WHERE id=1').get()?.version!==2){db.prepare("UPDATE desktop_work_state SET mode='',updated=0 WHERE id=1").run();db.prepare('DELETE FROM desktop_route_pending WHERE id=1').run();db.prepare('INSERT OR REPLACE INTO desktop_route_policy VALUES(1,2)').run();}
 const read=()=>db.prepare('SELECT mode,updated FROM desktop_work_state WHERE id=1').get();
 const save=mode=>db.prepare('INSERT INTO desktop_work_state(id,mode,updated) VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET mode=excluded.mode,updated=excluded.updated').run(mode,Date.now());
 return async function resolve(text,{dailyTurn,hasImages=false,requestId}={}){
  const prev=read(),active=!!prev&&Date.now()-prev.updated<1800000&&!!prev.mode;
  let kind=classify(text,active);
  if(kind==='daily-reset'){save('');return {reply:'好，切回日常聊天。'};}
  if(kind==='daily'){save('');db.prepare('DELETE FROM desktop_route_pending WHERE id=1').run();return await dailyTurn(text);}
  if(kind==='daily'){save('');db.prepare('DELETE FROM desktop_route_pending WHERE id=1').run();return await dailyTurn(text);}
  if(kind==='uncertain'||kind==='followup'&&!active){db.prepare('INSERT INTO desktop_route_pending(id,text,updated) VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET text=excluded.text,updated=excluded.updated').run(text,Date.now());return {reply:'嗯，你是想让我帮你处理这件事，还是想和我聊聊它？'};}
  if(kind==='followup')kind=prev.mode;
  const mode=kind;save(mode);
  if(hasImages)return {reply:'这条工作请求包含图片，目前工作通道无法读取图片；请先用文字描述，或在工作区提供图片。'};
  if(text.length>4000)return {reply:'工作请求请控制在 4000 字以内，分几条发送即可。'};
  try{
   if(mode==='project-work'){
    const d=await fetchImpl('http://127.0.0.1:4175/discovery',{signal:AbortSignal.timeout(4000)}).then(r=>r.json());
    if(!d.connected||!d.project)return {reply:'工作台当前没有可用的项目连接。请打开对应项目后重试，已有工作记录仍保留。'};
    const response=await fetchImpl('http://127.0.0.1:4175/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:text,projectId:d.project.id}),signal:AbortSignal.timeout(110000)});
    const result=await response.json();if(!response.ok||typeof result.answer!=='string')throw Error('project unavailable');
    let reply=result.answer;
    if(result.proposals?.length)reply+='\n\n待审建议（未自动修改）：\n'+result.proposals.map((p,i)=>`${i+1}. ${p.reason||'建议更新'}：${p.value}（${p.sheet} / ${Object.values(p.ref||{}).join(' / ')} / ${p.field}）`).join('\n');
    if(result.focus?.length)reply+='\n定位：'+result.focus.map(f=>JSON.stringify(f.ref)).join('；');
    return {reply};
   }
   const result=await workService.turn({requestId:String(requestId||crypto.randomUUID()),projectId:'general-work',sessionId:'desktop',mode:'qa',selection:{kind:'project',id:'general-work'},snapshotVersion:'general-1',input:text,context:{selectedExcerpt:'用户在独立工作区提出的一般工作请求。不要假设存在已连接的项目。'}});
   return {reply:result.answer+(result.suggestions.length?'\n建议已保存在工作记录中，尚未自动修改文件。':'')};
  }catch(e){return {reply:'独立工作通道暂时无法完成这项请求，请稍后重试。工作内容没有转入日常记忆。'};}
 };
}
