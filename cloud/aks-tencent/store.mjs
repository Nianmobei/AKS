import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
export class Store {
  constructor(filename) {
    this.db=new DatabaseSync(filename);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS memory(id TEXT PRIMARY KEY,kind TEXT NOT NULL,body TEXT NOT NULL,origin TEXT NOT NULL,updated TEXT NOT NULL,expires TEXT);
      CREATE TABLE IF NOT EXISTS chat(id INTEGER PRIMARY KEY,binding TEXT,role TEXT,body TEXT,at TEXT);
      CREATE TABLE IF NOT EXISTS sources(id TEXT PRIMARY KEY,url TEXT UNIQUE,title TEXT,excerpt TEXT,retrieved TEXT);
      CREATE TABLE IF NOT EXISTS drafts(id TEXT PRIMARY KEY,kind TEXT,body TEXT,sources TEXT,status TEXT NOT NULL DEFAULT 'pending',created TEXT);
      CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY,status TEXT,at TEXT,error TEXT);
      CREATE TABLE IF NOT EXISTS ledger(id TEXT PRIMARY KEY,status TEXT,at TEXT,error TEXT);
      CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT);
      CREATE TABLE IF NOT EXISTS usage(id INTEGER PRIMARY KEY,at TEXT,kind TEXT,input INTEGER,output INTEGER);`);
    this.db.prepare("UPDATE jobs SET status='interrupted' WHERE status='running'").run();
  }
  listMemory(){return this.db.prepare('SELECT * FROM memory WHERE expires IS NULL OR expires>? ORDER BY updated DESC LIMIT 150').all(new Date().toISOString());}
  remember(body,kind='owner_memory',id=null){if(!['owner_memory','short_memory'].includes(kind))throw Error('Cannot change canon or fiction with memory tool');if(typeof body!=='string'||!body.trim()||body.length>2000)throw Error('Invalid memory');if(/(?:sk-[a-z0-9]{12,}|密码\s*[:：]|api.?key\s*[:=])/i.test(body))throw Error('Secrets must not be stored');if(id&&!this.db.prepare('SELECT id FROM memory WHERE id=?').get(id))throw Error('Unknown memory');id??=randomUUID();const now=new Date();const expires=kind==='short_memory'?new Date(+now+7*86400000).toISOString():null;this.db.prepare('INSERT INTO memory VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET kind=excluded.kind,body=excluded.body,updated=excluded.updated,expires=excluded.expires').run(id,kind,body,'owner-chat',now.toISOString(),expires);return {id,kind};}
  forget(id){return {deleted:this.db.prepare('DELETE FROM memory WHERE id=?').run(id).changes};}
  addChat(binding,role,body){this.db.prepare('INSERT INTO chat(binding,role,body,at) VALUES(?,?,?,?)').run(binding,role,body,new Date().toISOString());}
  history(binding){return this.db.prepare('SELECT role,body AS content FROM chat WHERE binding=? ORDER BY id DESC LIMIT 16').all(binding).reverse();}
  source(s){const id=randomUUID();this.db.prepare('INSERT INTO sources VALUES(?,?,?,?,?) ON CONFLICT(url) DO UPDATE SET title=excluded.title,excerpt=excluded.excerpt,retrieved=excluded.retrieved').run(id,s.url,s.title||'',String(s.content||s.summary||'').slice(0,18000),new Date().toISOString());return s;}
  draft(kind,body,urls=[]){const id=randomUUID();this.db.prepare('INSERT INTO drafts VALUES(?,?,?,?,?,?)').run(id,kind,body,JSON.stringify(urls),'pending',new Date().toISOString());return id;}
  drafts(status='pending'){return this.db.prepare('SELECT * FROM drafts WHERE status=? ORDER BY created DESC LIMIT 50').all(status);}
  approve(id){return this.db.prepare("UPDATE drafts SET status='approved' WHERE id=? AND status='pending' AND kind='inspiration'").run(id).changes===1;}
  adopt(id){const row=this.db.prepare("SELECT * FROM drafts WHERE id=? AND status='pending' AND kind IN ('fiction_draft','artist_preference')").get(id);if(!row)return false;const kind=row.kind==='fiction_draft'?'approved_episode':'approved_preference';this.db.exec('BEGIN IMMEDIATE');try{this.db.prepare('INSERT INTO memory VALUES(?,?,?,?,?,NULL)').run('adopted:'+id,kind,(kind==='approved_episode'?'【老板采纳的雨伦敦虚构经历】':'【老板采纳的新增艺术偏好】')+row.body,'owner-approved-draft',new Date().toISOString());this.db.prepare("UPDATE drafts SET status='adopted' WHERE id=?").run(id);this.db.exec('COMMIT');return true;}catch(e){this.db.exec('ROLLBACK');throw e;}}
  exportApproved(){return this.drafts('approved').filter(d=>d.kind==='inspiration').map(d=>({id:d.id,title:'AKS 灵感 '+d.created.slice(0,10),original_text:d.body,source_urls:JSON.parse(d.sources),provenance:'AKS AI-generated; owner-approved; keep separate from owner original',status:'approved-for-export'}));}
  prune(){const now=new Date().toISOString();this.db.prepare('DELETE FROM memory WHERE expires IS NOT NULL AND expires<?').run(now);this.db.prepare('DELETE FROM chat WHERE at<?').run(new Date(Date.now()-30*86400000).toISOString());}
  close(){this.db.close();}
}
