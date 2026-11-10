import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {CompanionTools} from './companion-tools.mjs';
import {compactVoiceRules,compileVoiceRule,VOICE_PROMPT_LIMIT} from './voice-rules.mjs';
test('long archived comparisons never enter prompts; pending and disabled rules have no effect',()=>{
 const db=new DatabaseSync(':memory:'),tools=new CompanionTools(db);
 const item=tools.feedback({guidance:'纠错时认下具体误判，简短道歉，不用工作承诺转移话题。',original:'原文秘密'.repeat(500),preferred:'示例秘密'.repeat(500),reason:'原因秘密'.repeat(500),tags:['纠错']});
 assert.doesNotMatch(tools.voice('你刚才不是说可以吗'),/认下具体误判/);
 tools.approve(item.id);
 const prompt=tools.voice('你刚才不是说可以吗');
 assert.match(prompt,/纠错时认下具体误判/);assert.doesNotMatch(prompt,/原文秘密|示例秘密|原因秘密/);
 tools.deactivate(item.id);assert.doesNotMatch(tools.voice('你刚才不是说可以吗'),/认下具体误判/);db.close();
});
test('legacy data is processed once without changing approval state or archived source',()=>{
 const db=new DatabaseSync(':memory:');
 db.exec("create table voice_feedback(id TEXT PRIMARY KEY,original TEXT,preferred TEXT,reason TEXT,tags TEXT,state TEXT,created TEXT)");
 db.prepare('insert into voice_feedback values(?,?,?,?,?,?,?)').run('old','原回复','理想回复','承认误判。'+'不要长篇解释。'.repeat(100),'["纠错"]','approved','2026-11-01');
 new CompanionTools(db);let row=db.prepare('select * from voice_feedback').get();
 assert.equal(row.state,'approved');assert.equal(row.original,'原回复');assert.ok(row.guidance.length<=120);assert.equal(row.compiled_version,1);
 const first=row.guidance;new CompanionTools(db);row=db.prepare('select * from voice_feedback').get();assert.equal(row.guidance,first);db.close();
});
test('retrieval removes duplicate rules and enforces one bounded budget',()=>{
 const rows=[{guidance:'少列清单。'},{guidance:'少列清单'},{guidance:'保留自己的判断。'},...Array.from({length:20},(_,i)=>({guidance:String(i)+'字'.repeat(119)}))];
 const rules=compactVoiceRules(rows);assert.equal(rules.length,2);assert.equal(rules[1],'保留自己的判断。');assert.ok(rules.reduce((n,r)=>n+r.length+2,0)<=VOICE_PROMPT_LIMIT);
});
test('short rules can be reviewed and corrected at approval, and overlong explicit rules are rejected',()=>{
 const db=new DatabaseSync(':memory:'),tools=new CompanionTools(db);const item=tools.feedback({guidance:'不要每句都叫老板。'});
 tools.approve(item.id,'需要时再称呼老板。');assert.equal(db.prepare('select guidance from voice_feedback').get().guidance,'需要时再称呼老板。');
 assert.throws(()=>compileVoiceRule({guidance:'长'.repeat(121)}),/120/);db.close();
});
