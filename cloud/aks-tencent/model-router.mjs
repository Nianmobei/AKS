// Route complete requests, not saved identities or memory ownership.
export function argonRequest(body){
 const {thinking,_aksTask,...request}=body;
 return {...request,model:'gemini-4-argon',reasoning_effort:'low'};
}
export function argonCost(input,output,now=new Date()){
 // Conservative CNY/USD conversion; provider billing remains authoritative.
 const afterIntro=now>=new Date('2026-12-01T00:00:00Z');
 return (input*(afterIntro?4:2)+output*(afterIntro?20:10))*8/1e6;
}
export function createModelRouter({policy,deepseek,argon,clock=Date.now,onFallback=()=>{}}){
 let retryAfter=0,lastFallback=null,lastDialogue=null;
 const status=()=>({configured:policy.chatProvider,dialogueModel:policy.chatModel,bulkProvider:'deepseek',fallback:'deepseek',retryAfter,lastFallback,lastDialogue});
 const finish=(result,provider,model)=>{lastDialogue={provider,model,at:new Date(clock()).toISOString()};return result;};
 async function complete(body){
  const {_aksTask,...request}=body;
  if(_aksTask!=='dialogue')return deepseek({...request,model:request.model||policy.model});
  if(policy.chatProvider!=='apiyi'||clock()<retryAfter)return finish(await deepseek({...request,model:policy.model}),'deepseek',policy.model);
  try{
   const result=await argon(argonRequest(request));const m=result?.choices?.[0]?.message;
   if(!m||!m.content?.trim()&&!m.tool_calls?.length)throw Error('argon_empty_reply');
   retryAfter=0;return finish(result,'apiyi','gemini-4-argon');
  }catch{
   retryAfter=clock()+90000;lastFallback=new Date(clock()).toISOString();
   onFallback({from:'apiyi',to:'deepseek',reason:'argon_request_failed',retryAfter});
   // Continue from the current tool state; never replay already executed tools.
   return finish(await deepseek({...request,model:policy.model}),'deepseek',policy.model);
  }
 }
 return {complete,status};
}
