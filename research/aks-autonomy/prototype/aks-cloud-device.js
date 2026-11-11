export async function selectExistingCloudSession(store,card,storage,remoteRows=[]){
 if(!card?.activeCardId)return null;
 const cardId=card.activeCardId,key='aks-cloud-owner-session:'+cardId,metas=store.sessionMetas||{};
 let id=storage.getItem(key)||'';
 if(id&&metas[id]?.characterId===cardId&&await store.loadSession(id))return id;
 const preferred=store.index?.characters?.[cardId]?.activeSessionId||store.activeSessionId||'';
 const candidates=Object.values(metas).filter(m=>m?.characterId===cardId&&!m.parentSessionId&&!m.hidden).sort((a,b)=>(a.sessionId===preferred?-1:b.sessionId===preferred?1:(b.updatedAt||0)-(a.updatedAt||0))).slice(0,80);
 const remote=new Set(remoteRows.filter(m=>['user','assistant'].includes(m.role)&&typeof m.text==='string'&&m.text.trim().length>=12).map(m=>m.role+'\0'+m.text.trim()));
 for(const meta of candidates){const candidate=meta.sessionId;if(!candidate||!await store.loadSession(candidate))continue;const messages=store.getSessionMessagesIfLoaded(candidate);if(!Array.isArray(messages))continue;const cloud=messages.some(m=>typeof m.id==='string'&&/^cloud:\d+$/.test(m.id));const overlap=new Set(messages.filter(m=>typeof m.content==='string'&&remote.has(m.role+'\0'+m.content.trim())).map(m=>m.role+'\0'+m.content.trim()));if(!cloud&&overlap.size<2)continue;storage.setItem(key,candidate);return candidate;}
 return null;
}
export function mergeCloudHistory(remote,local){
 const keys=new Map();for(const m of remote){const k=m.role+'\0'+String(m.content||'').trim();keys.set(k,(keys.get(k)||0)+1);}
 const extra=[];for(const m of local||[]){if(typeof m.id==='string'&&/^cloud:\d+$/.test(m.id))continue;const k=m.role+'\0'+String(m.content||'').trim(),n=keys.get(k)||0;if(n){keys.set(k,n-1);continue;}extra.push(m);}
 return [...remote,...extra].sort((a,b)=>(Number(a.createdAt)||0)-(Number(b.createdAt)||0));
}

let busy=false,cursor=-1,lastId='',assetCache=new Map(),lastProbe=0,lastReport='';
async function reportSync(phase,details={}){const key=JSON.stringify({phase,...details});if(key===lastReport)return;lastReport=key;try{await api('sync-diagnostic',{phase,...details});}catch{lastReport='';}}
async function api(route,payload){const h=await import('./hearing-CWm8WPGq.js');const c=h.Z().getProviderConfig('aks-cloud');if(!c?.apiKey)throw Error('Cloud device is not configured');const r=await fetch('http://127.0.0.1:6220/'+route,{method:payload?'POST':'GET',headers:{Authorization:'Bearer '+c.apiKey,'Content-Type':'application/json'},...(payload?{body:JSON.stringify(payload)}:{})});const result=await r.json();if(!r.ok)throw Error(result.error||'Cloud unavailable');return result;}
async function tick(){if(busy)return;busy=true;try{const h=await import('./hearing-CWm8WPGq.js');if(h.K().activeProvider!=='aks-cloud')return;const card=h.b();if(!card.activeCardId)return;
 globalThis.__aksCloudAvatar=await api('avatar');const chat=(await import('./chat-DqklHny2.js')).n();if(chat.sending||chat.activeTurns?.length||chat.pendingQueuedSendCount)return;
 const store=h.rt();let id=await selectExistingCloudSession(store,card,localStorage);if(!id&&Date.now()-lastProbe>=30000){lastProbe=Date.now();const probe=await api('history',{after:0,limit:100});id=await selectExistingCloudSession(store,card,localStorage,probe.messages||[]);}if(!id){globalThis.__aksCloudSync={ok:false,error:'waiting-for-existing-cloud-session',at:Date.now()};void reportSync('waiting',{ready:!!store.isReady,metaCount:Object.keys(store.sessionMetas||{}).length,active:!!store.activeSessionId});return;}if(cursor<0||id!==lastId)void reportSync('bound',{ready:!!store.isReady});if(cursor>=0&&id===lastId){const delta=await api('history',{after:cursor,limit:1});if(!delta.messages.length)return;}let after=0,rows=[],page;do{page=await api('history',{after,limit:100});rows.push(...page.messages);after=page.cursor;}while(page.messages.length===100);
 if(after===cursor&&id===lastId)return;const messages=[];for(const row of rows){let attachments=[];for(const asset of row.assets){if(!assetCache.has(asset.id)){const image=await api('asset-read',{id:asset.id});const stored=await h.pt([{type:'image',mimeType:image.mimeType,data:image.data}],id);assetCache.set(asset.id,stored[0]);}attachments.push(assetCache.get(asset.id));}messages.push({id:'cloud:'+row.seq,role:row.role,content:row.text,createdAt:Date.parse(row.created),...(attachments.length?{attachments}:{}),...(row.role==='assistant'?{status:'done'}:{})});}
 // A local send may have started during the network reads. Never overwrite that turn.
 if(chat.sending||chat.activeTurns?.length||chat.pendingQueuedSendCount)return;for(const m of messages)if(m.role==='assistant'){m.slices=[{type:'text',text:m.content}];m.tool_results=[];m.completedAt=m.createdAt;}const current=store.getSessionMessagesIfLoaded(id)||[];await store.replaceSessionHistory(id,mergeCloudHistory(messages,current));cursor=after;lastId=id;globalThis.__aksCloudSync={ok:true,cursor,messages:messages.length,at:Date.now()};void reportSync('synced',{messageCount:messages.length});
 }catch(e){globalThis.__aksCloudSync={ok:false,error:String(e.message),at:Date.now()};}finally{busy=false;}}
if(typeof window!=='undefined'&&!globalThis.__aksCloudSyncTimer){globalThis.__aksCloudSyncTimer=setInterval(()=>void tick(),2500);void tick();}


