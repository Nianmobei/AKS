import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
import {localParts} from './calendar.mjs';
const digest=s=>createHash('sha256').update(s).digest('hex');
const tokens=text=>{
 const terms=new Set(String(text).toLowerCase().match(/[a-z0-9]{2,}/g)||[]);
 for(const part of String(text).match(/[\u3400-\u9fff]+/g)||[])for(let i=0;i<part.length-1;i++)terms.add(part.slice(i,i+2));
 return terms;
};
export function memoryClarity(ageDays,pinned=false){return pinned?'clear':ageDays<7?'clear':ageDays<30?'fading':ageDays<90?'trace':'archive';}
export class EpisodicMemory {
 constructor(filename,{clock=()=>new Date()}={}){this.clock=clock;this.db=new DatabaseSync(filename);this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
  CREATE TABLE IF NOT EXISTS episodic_archive(id TEXT PRIMARY KEY,source TEXT,source_id TEXT,kind TEXT,body TEXT,importance INTEGER,pinned INTEGER,created TEXT);
  CREATE TABLE IF NOT EXISTS episodic_recall(id TEXT PRIMARY KEY,last_at TEXT,count INTEGER);`);}
 add({source,sourceId,kind,body,importance=40,pinned=false,created=this.clock().toISOString()}){
  if(!['owner_explicit','reading','sim_episode','creative_work'].includes(kind)||typeof body!=='string'||!body.trim()||body.length>5000||!Number.isFinite(Date.parse(created)))throw Error('Invalid memory record');
  if(/sk-[\w-]{12,}|ghp_[\w]+|密码\s*[:：]|api.?key\s*[:=]/i.test(body))return {ignored:'sensitive'};
  const id=digest(source+'\n'+sourceId+'\n'+body);const result=this.db.prepare('INSERT OR IGNORE INTO episodic_archive VALUES(?,?,?,?,?,?,?,?)').run(id,source,String(sourceId),kind,body,Math.max(1,Math.min(100,importance)),pinned?1:0,created);
  return {id,added:!!result.changes};
 }
 captureOwner(text){if(!/^(?:请)?(?:记住|以后记得)(?=.{2})/s.test(text)||/^(?:请)?记住(?:了吗|了没|没)/.test(text))return {ignored:'not-explicit'};return this.add({source:'owner',sourceId:digest(text),kind:'owner_explicit',body:text.slice(0,1800),importance:95,pinned:true});}
 sync(study,simulation){
  for(const n of study.notes(100))this.add({source:'study',sourceId:n.id,kind:'reading',body:JSON.stringify({fact:n.fact,opinion:n.opinion,sourceId:n.sourceId,sourcePublished:n.sourcePublished||null,fiction:n.fiction,fictionIsDraft:true}),created:n.created,importance:40});
  for(const a of simulation.db.prepare("SELECT * FROM sim_actions WHERE state='completed' ORDER BY ended DESC LIMIT 100").all())this.add({source:'simulation',sourceId:a.id,kind:'sim_episode',body:JSON.stringify({kind:a.kind,...JSON.parse(a.result),fictional:true}),created:a.ended,importance:65});
  const novel=simulation.latestNovel();if(novel)this.add({source:'manuscript',sourceId:'aks-novel:'+novel.revision,kind:'creative_work',body:JSON.stringify({work:novel.work,revision:novel.revision,hash:novel.hash,reason:novel.reason,excerpt:novel.body.slice(0,900)}),created:novel.created,importance:75});
 }
 recall(query,{maxChars=1200,limit=5,touch=true}={}){
  const now=this.clock(),q=tokens(query);let targetDay=null;
  if(/今天|昨天|前天/.test(query)){const offset=/前天/.test(query)?2:/昨天/.test(query)?1:0;const today=localParts(now,'Asia/Shanghai').date;const day=new Date(today+'T00:00:00Z');day.setUTCDate(day.getUTCDate()-offset);targetDay=day.toISOString().slice(0,10);}
  const records=this.db.prepare('SELECT a.*,r.last_at,r.count FROM episodic_archive a LEFT JOIN episodic_recall r ON r.id=a.id').all();
  const ranked=records.map(r=>{const age=Math.max(0,(+now-Date.parse(r.last_at||r.created))/86400000),words=tokens(r.body),hits=[...q].filter(t=>words.has(t)).length,day=localParts(new Date(r.created),'Asia/Shanghai').date;
   const dated=targetDay&&day===targetDay;const score=(r.pinned?80:0)+hits*18+(dated?120:0)+r.importance/(1+age/10);
   return {...r,clarity:memoryClarity(age,!!r.pinned),score,hits,dated};
  }).filter(r=>r.pinned||(!targetDay&&r.hits>0)||(targetDay&&r.dated)).sort((a,b)=>b.score-a.score||b.created.localeCompare(a.created));
  const selected=[];let chars=0,pins=0;for(const r of ranked){if(selected.length>=limit)break;if(r.pinned&&pins>=2)continue;const length=Math.min(r.body.length,r.pinned?240:600);if(chars+length>maxChars)continue;selected.push({id:r.id,kind:r.kind,body:r.body.slice(0,length),created:r.created,clarity:r.clarity,source:r.source,sourceId:r.source_id,fictional:r.kind==='sim_episode'});chars+=length;if(r.pinned)pins++;}
  if(touch)for(const r of selected)this.db.prepare('INSERT INTO episodic_recall VALUES(?,?,1) ON CONFLICT(id) DO UPDATE SET last_at=excluded.last_at,count=count+1').run(r.id,now.toISOString());
  return {records:selected,chars,archiveCount:records.length,warning:'来源类型必须保留：reading是资料，sim_episode是已记录的角色虚构经历，creative_work是稿件状态。旧记忆变淡不代表档案已删除。'};
 }
 status(){return {archive:this.db.prepare('SELECT count(*) n FROM episodic_archive').get().n,byKind:this.db.prepare('SELECT kind,count(*) count FROM episodic_archive GROUP BY kind').all(),retention:'archive-preserved; prompt retrieval fades'};}
 close(){this.db.close();}
}
