// Run inside the existing cloud container; credentials and response text are never printed.
import https from 'node:https';import fs from 'node:fs/promises';
import {personaPrompt} from '/app/persona-config.mjs';
import {avatarIntentTool} from '/app/avatar-intent.mjs';
const key=(await fs.readFile('/app/secrets/APIYI_API_KEY','utf8')).trim();
async function probe(name,{persona=false,stream=false,tools=false}={}){
 const started=Date.now(),result={name,stream},payload=JSON.stringify({model:'gemini-4-argon',reasoning_effort:'low',stream,max_tokens:180,messages:[{role:'system',content:persona?personaPrompt():'请用自然中文回复。'},{role:'user',content:'今天有点累，随便聊两句，不要建议清单。'}],...(tools?{tools:[avatarIntentTool]}:{})});
 result.requestBytes=Buffer.byteLength(payload);
 return new Promise(resolve=>{
  let done=false,buffer='',bytes=0;const finish=()=>{if(done)return;done=true;clearTimeout(timer);result.elapsedMs=Date.now()-started;resolve(result);};
  const req=https.request('https://api.apiyi.com/v1/chat/completions',{method:'POST',agent:false,headers:{Authorization:'Bearer '+key,'Content-Type':'application/json','Content-Length':Buffer.byteLength(payload)}},res=>{
   result.status=res.statusCode;result.headersMs=Date.now()-started;res.setEncoding('utf8');res.on('data',chunk=>{bytes+=Buffer.byteLength(chunk);result.firstByteMs??=Date.now()-started;buffer+=chunk;if(stream){const lines=buffer.split('\n');buffer=lines.pop();for(const line of lines){if(!line.startsWith('data: '))continue;try{const x=JSON.parse(line.slice(6));if(x.choices?.some(c=>c.delta?.content||c.delta?.tool_calls))result.firstContentMs??=Date.now()-started;}catch{}}}});
   res.on('end',()=>{result.bytes=bytes;if(!stream)try{const x=JSON.parse(buffer);result.reportedModel=x.model;result.promptTokens=x.usage?.prompt_tokens;result.outputTokens=x.usage?.completion_tokens;result.hasText=!!x.choices?.[0]?.message?.content;result.hasToolCall=!!x.choices?.[0]?.message?.tool_calls?.length;result.providerError=!!x.error;}catch{result.invalidJson=true;}finish();});res.on('error',()=>{result.error='response_error';finish();});
  });
  req.on('socket',socket=>{socket.once('lookup',()=>result.dnsMs=Date.now()-started);socket.once('connect',()=>result.tcpMs=Date.now()-started);socket.once('secureConnect',()=>result.tlsMs=Date.now()-started);});
  req.on('error',error=>{result.error=result.error||(['ENOTFOUND','ECONNRESET','ETIMEDOUT'].includes(error.code)?error.code:'network_error');finish();});
  const timer=setTimeout(()=>{result.error='timeout';result.phase=result.headersMs==null?'waiting_headers':'reading_body';req.destroy();finish();},90000);req.end(payload);
 });
}
for(const [name,options] of [['minimal',{}],['persona',{persona:true}],['persona_stream_tool',{persona:true,stream:true,tools:true}]])console.log(JSON.stringify(await probe(name,options)));
