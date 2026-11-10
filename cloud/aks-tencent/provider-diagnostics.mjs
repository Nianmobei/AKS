import {AsyncLocalStorage} from 'node:async_hooks';
const trace=new AsyncLocalStorage();
export async function traceModels(fn){const attempts=[];const value=await trace.run(attempts,fn);return {value,model:attempts.length?{...attempts.at(-1),attempts}:null};}
export function recordModel(event){trace.getStore()?.push(event);}
export function failureDetails(error){
 const known=['timeout','network','http','invalid_json','empty_reply','context_budget','budget','missing_key'];
 const reason=known.includes(error?.diagnostic?.reason)?error.diagnostic.reason:/Context budget/.test(error?.message||'')?'context_budget':/budget/i.test(error?.message||'')?'budget':/key_missing/.test(error?.message||'')?'missing_key':'unknown';
 return {reason,...(error?.diagnostic||{})};
}
async function readEvents(response,clock,started){
 let pending='',bytes=0,complete=false,finished=false,firstByteMs=null,firstContentMs=null;const decoder=new TextDecoder(),calls=new Map();
 const result={choices:[{message:{role:'assistant',content:''},finish_reason:null}]};const message=result.choices[0].message;
 function line(text){if(!text.startsWith('data:'))return;const data=text.slice(5).trim();if(!data)return;if(data==='[DONE]'){complete=true;return;}const x=JSON.parse(data);if(x.error)throw Error('Provider stream error');if(x.usage)result.usage=x.usage;if(x.model)result.model=x.model;
  for(const choice of x.choices||[]){if(choice.index&&choice.index!==0)continue;const d=choice.delta||{};if(d.content){firstContentMs??=clock()-started;message.content+=d.content;}
   for(const fragment of d.tool_calls||[]){firstContentMs??=clock()-started;const index=fragment.index??0;let call=calls.get(index);if(!call){call={id:'',type:'function',function:{name:'',arguments:''}};calls.set(index,call);}if(fragment.id)call.id=fragment.id;if(fragment.function?.name)call.function.name+=fragment.function.name;if(fragment.function?.arguments)call.function.arguments+=fragment.function.arguments;}
   if(choice.finish_reason){finished=true;result.choices[0].finish_reason=choice.finish_reason;}
  }
 }
 for await(const chunk of response.body){bytes+=chunk.length;if(bytes>2*1024*1024)throw Error('Provider stream too large');firstByteMs??=clock()-started;pending+=decoder.decode(chunk,{stream:true});const lines=pending.split('\n');pending=lines.pop();for(const item of lines)line(item.replace(/\r$/,''));}
 pending+=decoder.decode();if(pending.trim())line(pending.trim());if(!complete&&!finished)throw Error('Incomplete provider stream');
 if(calls.size){message.tool_calls=[...calls.entries()].sort((a,b)=>a[0]-b[0]).map(x=>x[1]);if(message.tool_calls.some(c=>!c.id||!c.function.name))throw Error('Incomplete tool call');}
 return {value:result,firstByteMs,firstContentMs};
}
export async function measuredJson(url,options,{timeoutMs,fetchImpl=fetch,clock=Date.now}={}){
 const started=clock(),signal=AbortSignal.timeout(timeoutMs);let phase='waiting_headers',headersMs=null,status=null;
 try{
  const response=await fetchImpl(url,{...options,signal});headersMs=clock()-started;status=response.status;
  if(!response.ok)throw Object.assign(Error('Provider HTTP failure'),{diagnostic:{reason:'http'}});
  phase='reading_body';let value,eventTimes={};try{if(response.headers?.get('content-type')?.includes('text/event-stream')){const events=await readEvents(response,clock,started);value=events.value;eventTimes={firstByteMs:events.firstByteMs,firstContentMs:events.firstContentMs,stream:true};}else value=await response.json();}catch(e){if(signal.aborted||e?.cause?.code||e instanceof TypeError)throw e;throw Object.assign(Error('Invalid provider response'),{diagnostic:{reason:'invalid_json'}});}
  const transport={elapsedMs:clock()-started,headersMs,bodyMs:clock()-started-headersMs,status,phase:'complete',...eventTimes};
  Object.defineProperty(value,'_aksTransport',{value:transport});return value;
 }catch(error){
  const code=error?.cause?.code;
  const networkCode=['ENOTFOUND','EAI_AGAIN','ECONNRESET','ECONNREFUSED','ETIMEDOUT','UND_ERR_CONNECT_TIMEOUT','UND_ERR_SOCKET'].includes(code)?code:undefined;
  throw Object.assign(Error('Argon request failed'),{diagnostic:{reason:signal.aborted?'timeout':error?.diagnostic?.reason||'network',phase,elapsedMs:clock()-started,headersMs,status,...(networkCode?{networkCode}:{})}});
 }
}
