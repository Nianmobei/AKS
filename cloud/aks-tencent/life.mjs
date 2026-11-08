import {DatabaseSync} from 'node:sqlite';
import {dayContext,shareWindow} from './calendar.mjs';
export class Life {
 constructor(filename,{generate,send,available=()=>true,lastInteraction=()=>0,clock=()=>new Date(),enabled=true,frequency='quiet',startupGraceMs=20*60000}={}){
  this.db=new DatabaseSync(filename);this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
   CREATE TABLE IF NOT EXISTS life_settings(key TEXT PRIMARY KEY,value TEXT);
   CREATE TABLE IF NOT EXISTS life_shares(id TEXT PRIMARY KEY,day TEXT,activity TEXT,body TEXT,status TEXT,created TEXT,sent TEXT,error TEXT);`);
  this.db.prepare("UPDATE life_shares SET status='interrupted' WHERE status='generating'").run();
  this.generate=generate;this.send=send;this.available=available;this.lastInteraction=lastInteraction;this.clock=clock;this.defaultEnabled=enabled;this.frequency=frequency;this.started=+clock();this.startupGraceMs=startupGraceMs;this.busy=false;
 }
 setting(key){return this.db.prepare('SELECT value FROM life_settings WHERE key=?').get(key)?.value;}
 setEnabled(value){this.db.prepare("INSERT INTO life_settings VALUES('enabled',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(value?'1':'0');return value;}
 touch(){this.db.prepare("INSERT INTO life_settings VALUES('lastInteractionAt',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(String(+this.clock()));}
 enabled(){return (this.setting('enabled')??(this.defaultEnabled?'1':'0'))==='1';}
 recent(){return this.db.prepare("SELECT day,activity,body,status FROM life_shares WHERE status='sent' AND created>? ORDER BY created DESC LIMIT 3").all(new Date(+this.clock()-7*86400000).toISOString());}
 context(){return {...dayContext(this.clock()),recentFictionalRoutine:this.recent(),sharingEnabled:this.enabled(),frequency:this.frequency};}
 summary(){return {enabled:this.enabled(),frequency:this.frequency,quietHours:'23:00—10:00 Asia/Shanghai',maxPerDay:1,current:this.context().current,recent:this.recent()};}
 eligible(){const now=this.clock();const w=shareWindow(now,this.frequency);const lastSent=this.db.prepare("SELECT sent FROM life_shares WHERE status='sent' ORDER BY sent DESC LIMIT 1").get()?.sent;const interaction=Math.max(Number(this.lastInteraction()||0),Number(this.setting('lastInteractionAt')||0));return this.enabled()&&this.available()&&w.open&&+now-this.started>=this.startupGraceMs&&+now-interaction>=45*60000&&(!lastSent||+now-Date.parse(lastSent)>=18*3600000);}
 prompt(){return '为老板写一条偶尔主动分享的短消息。只能使用提供的simulation已完成记录，不根据日程临时编经过；没有记录就回复[不分享]。只写给他看的话，1—2句，通常20—100字。像临时发给熟人的微信：说一个日程里的小动作、小进展或卡住的地方，有具体对象；不要为了显得文艺写诗句、格言、雨的拟人比喻或漂亮总结，也不要反复提雨伦敦这个地名。只学朴素说法，不复读示例：读书时“有一页我来回读了几遍，先折着，晚点再看”；练琴时“这两小节还是不顺，今天先停在这里”。当前日程不合适就别套示例，不重复最近分享。从当前角色日程里挑内容，不报流水账、不要求回复、不制造内疚、不假装身体或现实外出，不说未实际完成的老板任务，不编造作品引文。日程是授权的雨伦敦虚构生活，不将它写长期记忆。没有具体内容值得分享就只回复[不分享]。运行时角色日程数据：'+JSON.stringify(this.context());}
 async tick(){if(this.busy||!this.eligible())return {skipped:true};this.busy=true;
  const now=this.clock(),w=shareWindow(now,this.frequency);let row=this.db.prepare('SELECT * FROM life_shares WHERE id=?').get(w.id);
  try{
   if(row&&row.status!=='ready')return {duplicate:true,status:row.status};
   if(!row){const inserted=this.db.prepare('INSERT OR IGNORE INTO life_shares VALUES(?,?,?,?,?,?,?,?)').run(w.id,w.day,this.context().current.title,null,'generating',now.toISOString(),null,null);if(!inserted.changes)return {duplicate:true};
    const reply=String(await this.generate(this.prompt())).trim();
    if(!reply||reply==='[不分享]'){this.db.prepare("UPDATE life_shares SET status='skipped' WHERE id=?").run(w.id);return {skipped:true};}
    if(reply.length>400)throw Error('Life share too long');
    this.db.prepare("UPDATE life_shares SET body=?,status='ready' WHERE id=?").run(reply,w.id);row=this.db.prepare('SELECT * FROM life_shares WHERE id=?').get(w.id);
   }
   // Owner activity or disconnect while the model was generating defers delivery.
   if(!this.eligible())return {deferred:true};
   this.db.prepare("UPDATE life_shares SET status='send-uncertain' WHERE id=?").run(w.id);
   await this.send(row.body);
   this.db.prepare("UPDATE life_shares SET status='sent',sent=? WHERE id=?").run(this.clock().toISOString(),w.id);return {sent:true,id:w.id};
  }catch(e){this.db.prepare("UPDATE life_shares SET error=?,status=CASE WHEN status='send-uncertain' THEN status ELSE 'failed' END WHERE id=?").run(e.message,w.id);return {failed:true,error:e.message};}
  finally{this.busy=false;this.db.prepare('DELETE FROM life_shares WHERE created<?').run(new Date(+this.clock()-30*86400000).toISOString());}
 }
 close(){this.db.close();}
}
