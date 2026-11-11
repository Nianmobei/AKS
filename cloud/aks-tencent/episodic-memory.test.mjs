import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {EpisodicMemory,memoryClarity} from './episodic-memory.mjs';
const record=(sourceId,body,extra={})=>({source:'test',sourceId,kind:'reading',body,...extra});
test('archive dedup is durable, revisions append, source types remain distinct',async t=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'aks-recall-'));t.after(()=>fs.rm(dir,{recursive:true,force:true}));const filename=path.join(dir,'memory.sqlite');let m=new EpisodicMemory(filename);
 m.add(record('a','码头旧地图的阅读笔记。'));assert.equal(m.add(record('a','码头旧地图的阅读笔记。')).added,false);m.add(record('a','修订后的码头旧地图笔记。'));m.close();m=new EpisodicMemory(filename);try{assert.equal(m.status().archive,2);assert.equal(m.recall('地图').records[0].kind,'reading');}finally{m.close();}
});
test('explicit owner facts are pinned; ordinary chatter and secrets are not harvested',()=>{
 const m=new EpisodicMemory(':memory:');try{assert(m.captureOwner('记住我喜欢旧地图。').added);assert.equal(m.captureOwner('我好像喜欢旧地图。').ignored,'not-explicit');assert.equal(m.captureOwner('记住了吗？').ignored,'not-explicit');assert.equal(m.captureOwner('记住，密码：dummy').ignored,'sensitive');assert.equal(m.status().archive,1);}finally{m.close();}
});
test('old memories fade in retrieval but remain in the archive',()=>{
 assert.equal(memoryClarity(120),'archive');assert.equal(memoryClarity(120,true),'clear');const m=new EpisodicMemory(':memory:',{clock:()=>new Date('2026-11-08T12:00:00Z')});try{m.add(record('old','旧地图里一条已经改名的街道。',{created:'2026-01-01T12:00:00Z'}));assert.equal(m.recall('地图',{touch:false}).records[0].clarity,'archive');assert.equal(m.status().archive,1);}finally{m.close();}
});
test('date recall does not invent yesterday and pinned preferences do not crowd out episodes',()=>{
 const m=new EpisodicMemory(':memory:',{clock:()=>new Date('2026-11-08T12:00:00Z')});try{
  for(let i=0;i<5;i++)m.add(record('pin'+i,'这是重要偏好。'.repeat(60),{kind:'owner_explicit',pinned:true,importance:95}));
  m.add(record('yesterday','在角色模拟中整理了街名笔记，留下一个开头。',{kind:'sim_episode',created:'2026-11-07T12:00:00Z',importance:65}));
  const r=m.recall('昨天做了什么',{maxChars:1000});assert(r.records.some(r=>r.sourceId==='yesterday'));assert(r.chars<=1000);assert(r.records.filter(r=>r.kind==='owner_explicit').length<=2);
 }finally{m.close();}
});
test('source sync is idempotent and a planned action is not an archived episode',()=>{
 const m=new EpisodicMemory(':memory:');try{const study={notes:()=>[{id:'n',created:'2026-11-08T12:00:00Z',fact:'事实',opinion:'观点',fiction:'构思',sourceId:'s'}]},simulation={db:{prepare:()=>({all:()=>[]})},latestNovel:()=>null};m.sync(study,simulation);m.sync(study,simulation);assert.equal(m.status().archive,1);assert.equal(m.status().byKind[0].kind,'reading');}finally{m.close();}
});

test('relative dates use Beijing calendar days across UTC midnight',()=>{
 const cases=[['2026-11-10T17:00:00Z','2026-11-11','2026-11-10','2026-11-09'],['2026-10-26T00:30:00Z','2026-10-26','2026-10-25','2026-10-24'],['2026-02-12T12:00:00Z','2026-02-12','2026-02-11','2026-02-10']];
 for(const [clock,...days] of cases){const m=new EpisodicMemory(':memory:',{clock:()=>new Date(clock)});try{for(const day of days)m.add(record(day,day,{kind:'sim_episode',created:day+'T12:00:00Z'}));for(const [i,query] of ['今天做了什么','昨天做了什么','前天做了什么'].entries())assert.equal(m.recall(query,{touch:false}).records[0]?.sourceId,days[i],clock+' '+query);}finally{m.close();}}
});
