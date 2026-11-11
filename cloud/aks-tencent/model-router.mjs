import {recordModel,failureDetails} from './provider-diagnostics.mjs';
// Route complete requests, not saved identities or memory ownership.
export function argonRequest(body){
 const {thinking,_aksTask,...request}=body;
 return {...request,model:'gemini-4-argon',reasoning_effort:'low',stream:true};
}
export function argonCost(input,output,now=new Date()){
 // Conservative CNY/USD conversion; provider billing remains authoritative.
 const afterIntro=now>=new Date('2026-12-01T00:00:00Z');
 return (input*(afterIntro?4:2)+output*(afterIntro?20:10))*8/1e6;
}
export function createModelRouter({policy,deepseek,argon,clock=Date.now,onFallback=()=>{}}){
 let retryAfter=0,lastFallback=null,lastDialogue=null;
 const status=()=>({configured:policy.chatProvider,dialogueModel:policy.chatModel,bulkProvider:'deepseek',fallback:'disabled',retryAfter,lastFallback,lastDialogue});
 const finish=(result,provider,model,started,reason=null)=>{lastDialogue={provider,model,at:new Date(clock()).toISOString(),elapsedMs:clock()-started,fallbackReason:reason,...(result?._aksTransport||{})};recordModel(lastDialogue);return result;};
 async function complete(body){
  const {_aksTask,...request}=body;const started=clock();
  if(_aksTask!=='dialogue')return deepseek({...request,model:request.model||policy.model});
  if(policy.chatProvider!=='apiyi')throw Error('日常对话的 Argon 模型未配置，请检查服务设置。');
  if(clock()<retryAfter)throw Error('小A暂时连接不上日常对话模型，请稍后再试。');
  try{
   const result=await argon(argonRequest(request));const m=result?.choices?.[0]?.message;
   if(!m||!m.content?.trim()&&!m.tool_calls?.length)throw Object.assign(Error('argon_empty_reply'),{diagnostic:{reason:'empty_reply'}});
   retryAfter=0;return finish(result,'apiyi','gemini-4-argon',started);
  }catch(error){
   const details=failureDetails(error);recordModel({provider:'apiyi',model:'gemini-4-argon',failed:true,...details,at:new Date(clock()).toISOString()});
   retryAfter=clock()+90000;lastFallback=new Date(clock()).toISOString();
   onFallback({from:'apiyi',to:null,...details,retryAfter});
   throw Error('小A暂时连接不上日常对话模型，请稍后再试。');
  }
 }
 return {complete,status};
}
