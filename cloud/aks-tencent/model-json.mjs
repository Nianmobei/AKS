// Syntax repair only: never infer missing keys, missing endings, or changed content.
export function modelJson(raw,finishReason){
 const fail=message=>{const e=new Error(message);e.code='AKS_MODEL_JSON';e.raw=String(raw||'').slice(0,64000);return e;};
 if(finishReason&&finishReason!=='stop')throw fail('Model JSON output incomplete: '+finishReason);
 let text=String(raw||'').trim().replace(/^```(?:json)?\s*\n?/i,'').replace(/\n?```$/,'');
 try{return JSON.parse(text);}catch{}
 let quoted=false,escaped=false,clean='';
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){clean+=c;if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue;}
  if(c==='"')quoted=true;
  if(c===','){let next=i+1;while(/\s/.test(text[next]||'')&&next<text.length)next++;if(text[next]===']'||text[next]==='}')continue;}
  clean+=c;
 }
 try{return JSON.parse(clean);}catch{throw fail('Model JSON malformed; no partial result promoted');}
}
