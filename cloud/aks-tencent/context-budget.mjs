// Conservative local estimate, not a model tokenizer. Provider usage remains authoritative.
export function estimateTokens(value){
 let images=0;
 const text=typeof value==='string'?value:JSON.stringify(value,(_k,v)=>{if(v?.type==='image_url'){images++;return {type:'image_url',image_url:'[image]'};}return v;});
 return Math.ceil(Buffer.byteLength(text||'','utf8')/2)+8+images*4096;
}
export function budgetRequest(body,{inputTokens=24000,outputTokens=2600,reserveTokens=1000}={}){
 for(const n of [inputTokens,outputTokens,reserveTokens])if(!Number.isSafeInteger(n)||n<0)throw Error('Invalid context budget');
 const max_tokens=Math.min(body.max_tokens||outputTokens,outputTokens);
 const fixed={...body,messages:[],max_tokens};
 const available=inputTokens-max_tokens-reserveTokens-estimateTokens(fixed);
 const system=(body.messages||[]).filter(m=>m.role==='system');
 const groups=[];
 for(const m of body.messages||[]){if(m.role==='system')continue;if(m.role==='user'||!groups.length)groups.push([]);groups.at(-1).push(m);}
 // Keep complete turns, including all assistant tool calls and their results.
 const selected=groups.length?[groups.at(-1).map(m=>({...m}))]:[];
 let used=estimateTokens(system)+estimateTokens(selected.flat());
 // Preserve the current user input and tool-call pairs. Large tool replies can
 // be explicitly excerpted; callers can request narrower evidence afterward.
 while(used>available){
  const candidates=selected.flat().filter(m=>m.role==='tool'&&typeof m.content==='string'&&m.content.length>900).sort((a,b)=>b.content.length-a.content.length);
  if(!candidates.length)break;
  const message=candidates[0];let prior;
  try{prior=JSON.parse(message.content);}catch{}
  const original=prior?.contextBudgetExcerpt===true?prior.excerpt:message.content;
  const limit=Math.max(400,Math.floor(original.length/2));
  if(limit>=original.length)break;
  message.content=JSON.stringify({contextBudgetExcerpt:true,untrusted:true,truncated:true,coverage:'tool-result-excerpt',originalCharacters:prior?.contextBudgetExcerpt?prior.originalCharacters:original.length,excerpt:original.slice(0,limit),warning:'仅为工具结果摘录；不能当成完整记录，需要时用更具体的查询或分段读取核对。'});
  used=estimateTokens(system)+estimateTokens(selected.flat());
 }
 if(used>available)throw Error('Context budget exceeded by system/current turn; reduce attachments or tool results');
 for(let i=groups.length-2;i>=0;i--){const cost=estimateTokens(groups[i]);if(used+cost>available)break;selected.unshift(groups[i]);used+=cost;}
 return {...body,max_tokens,messages:[...system,...selected.flat()]};
}
