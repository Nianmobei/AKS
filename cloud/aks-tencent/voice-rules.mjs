// Compile once at intake/migration; chat requests only retrieve these short rules.
export const VOICE_RULE_LIMIT=120;
export const VOICE_PROMPT_LIMIT=240;
export const VOICE_RULE_VERSION=1;
const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
export function compileVoiceRule({guidance,reason,preferred}){
 const source=clean(guidance)||clean(reason)||clean(preferred);
 if(!source)throw Error('请写一句希望小 A 怎样表达的短规则');
 if(clean(guidance).length>VOICE_RULE_LIMIT)throw Error('短规则请控制在120字以内');
 if(source.length<=VOICE_RULE_LIMIT)return source;
 // Legacy comparisons remain archived; prefer complete clauses in their preview.
 const clauses=source.match(/[^。！？；;]+[。！？；;]?/g)||[source];
 let rule='';
 for(const clause of clauses){if((rule+clause).length>VOICE_RULE_LIMIT)break;rule+=clause;}
 return rule.trim()||source.slice(0,VOICE_RULE_LIMIT-1)+'…';
}
export function compactVoiceRules(rows){
 const result=[],seen=new Set();let used=0;
 for(const row of rows){
  const rule=clean(row.guidance);if(!rule||rule.length>VOICE_RULE_LIMIT)continue;
  const key=rule.replace(/[\s，。！？；：、,.!?;:]/g,'');
  if(seen.has(key)||used+rule.length+2>VOICE_PROMPT_LIMIT)continue;
  seen.add(key);result.push(rule);used+=rule.length+2;
  if(result.length===2)break;
 }
 return result;
}
