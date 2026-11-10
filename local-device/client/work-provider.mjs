import fs from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
export function normalizeWorkOutput(result){
 if(!result||typeof result.answer!=='string'||!result.answer.trim()||result.answer.length>12000)throw Error('Invalid work answer');
 let invalid=0;const suggestions=[],seen=new Set();
 const input=Array.isArray(result.suggestions)?result.suggestions:[];
 if(result.suggestions!=null&&!Array.isArray(result.suggestions))invalid++;
 for(const item of input){
  if(suggestions.length>=8){invalid++;continue;}
  if(!item||typeof item.targetPath!=='string'||!item.targetPath.trim()||item.targetPath.length>300||typeof item.reason!=='string'||item.reason.length>600||typeof item.after!=='string'||item.after.length>4000||JSON.stringify(item.before??null).length>4000){invalid++;continue;}
  let id=typeof item.id==='string'&&/^[\p{L}\p{N}_.-]{1,120}$/u.test(item.id)?item.id:randomUUID();if(seen.has(id))id=randomUUID();seen.add(id);
  suggestions.push({id,targetPath:item.targetPath,before:item.before??null,after:item.after,reason:item.reason});
 }
 const bounded=(value,limit,budget)=>{if(value==null)return [];if(!Array.isArray(value)){invalid++;return [];}const out=[];let used=0;for(const x of value){const size=JSON.stringify(x)?.length||0;if(out.length>=limit||!x||typeof x!=='object'||Array.isArray(x)||size>4000||used+size>budget){invalid++;continue;}used+=size;out.push(x);}return out;};
 const focus=bounded(result.focus,12,7900),proposals=bounded(result.proposals,8,31900);
 return {answer:result.answer,suggestions,focus,proposals,invalid};
}
export function createStatelessWorkProvider({base,tokenFile,fetchImpl=fetch}){
 if(!/^http:\/\/127\.0\.0\.1:4175$/.test(base)||!tokenFile)throw Error('Only the dedicated local work-inference exit is supported');
 async function headers(){const token=(await fs.readFile(tokenFile,'utf8')).trim();if(token.length<32)throw Error('Work inference not paired');return {'Content-Type':'application/json',Authorization:'Bearer '+token};}
 const generate=async p=>{
  const messages=[{role:'system',content:p.system+' 仅返回JSON {answer,suggestions:[{id,targetPath,before,after,reason}],focus:[],proposals:[]}，无建议时使用空数组，不得输出已执行或已采纳。'},...(p.history||[]), {role:'user',content:JSON.stringify({mode:p.mode,selection:p.selection,question:p.input,selectedExcerpt:p.selectedExcerpt,workingContext:p.workingContext})}];
  const response=await fetchImpl(base+'/inference',{method:'POST',headers:await headers(),body:JSON.stringify({messages,max_tokens:1800}),signal:AbortSignal.timeout(95000)});
  if(!response.ok)throw Error('Dedicated work inference failed');const data=await response.json(),text=data.choices?.[0]?.message?.content;
  if(typeof text!=='string')throw Error('Invalid work inference response');const json=text.trim().replace(/^```(?:json)?\s*\n?/i,'').replace(/\n?```\s*$/,'');return normalizeWorkOutput(JSON.parse(json));
 };
 generate.isReady=async()=>{try{const r=await fetchImpl(base+'/inference/capabilities',{headers:await headers(),signal:AbortSignal.timeout(2500)});if(!r.ok)return false;const c=await r.json();return c.protocol==='aks-work/1'&&c.ready===true&&c.stateless===true&&c.memoryWrite===false;}catch{return false;}};
 generate.classify=async(text,active)=>{
  const messages=[{role:'system',content:'判断用户这句话的用途，仅返回 JSON：{"route":"daily|work|project|uncertain"}。daily 包含生活闲聊、作品讨论、阅读感受和查看已上传的云端阅读任务或进度；例如“你觉得我写的那篇怎么样”是 daily，不因提到作品或阅读任务就当成审稿。work 是明确要求修改、审稿或完成实际工作的请求，project 是明确涉及任务工作台或其项目，uncertain 是无法可靠判断。工作中的连续追问归 work，但新出现的作品讨论或阅读查询优先归 daily；涉及工作台项目的连续追问归 project。不要回答用户，不要记录或提炼记忆。'},{role:'user',content:JSON.stringify({text,previousWorkMode:active||null})}];
  const r=await fetchImpl(base+'/inference',{method:'POST',headers:await headers(),body:JSON.stringify({messages,max_tokens:60}),signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('classification unavailable');const data=await r.json();const raw=data.choices?.[0]?.message?.content?.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');const value=JSON.parse(raw).route;return ['daily','work','project','uncertain'].includes(value)?value:'uncertain';
 };
 return generate;
}
