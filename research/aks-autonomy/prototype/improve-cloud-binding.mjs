import fs from 'node:fs/promises';const f='research/aks-autonomy/prototype/aks-cloud-device.js';let s=await fs.readFile(f,'utf8');let start=s.indexOf('export async function selectExistingCloudSession'),end=s.indexOf('\nlet busy=',start);if(start!==0||end<0)throw Error('guard missing');const guard=`export async function selectExistingCloudSession(store,card,storage,remoteRows=[]){
 if(!card?.activeCardId)return null;
 const cardId=card.activeCardId,key='aks-cloud-owner-session:'+cardId,metas=store.sessionMetas||{};
 let id=storage.getItem(key)||'';
 if(id&&metas[id]?.characterId===cardId&&await store.loadSession(id))return id;
 const preferred=store.index?.characters?.[cardId]?.activeSessionId||store.activeSessionId||'';
 const candidates=Object.values(metas).filter(m=>m?.characterId===cardId&&!m.parentSessionId&&!m.hidden).sort((a,b)=>(a.sessionId===preferred?-1:b.sessionId===preferred?1:(b.updatedAt||0)-(a.updatedAt||0))).slice(0,80);
 const remote=new Set(remoteRows.filter(m=>['user','assistant'].includes(m.role)&&typeof m.text==='string'&&m.text.trim().length>=12).map(m=>m.role+'\\0'+m.text.trim()));
 for(const meta of candidates){const candidate=meta.sessionId;if(!candidate||!await store.loadSession(candidate))continue;const messages=store.getSessionMessagesIfLoaded(candidate);if(!Array.isArray(messages))continue;const cloud=messages.some(m=>typeof m.id==='string'&&/^cloud:\\d+$/.test(m.id));const overlap=new Set(messages.filter(m=>typeof m.content==='string'&&remote.has(m.role+'\\0'+m.content.trim())).map(m=>m.role+'\\0'+m.content.trim()));if(!cloud&&overlap.size<2)continue;storage.setItem(key,candidate);return candidate;}
 return null;
}
export function mergeCloudHistory(remote,local){
 const keys=new Map();for(const m of remote){const k=m.role+'\\0'+String(m.content||'').trim();keys.set(k,(keys.get(k)||0)+1);}
 const extra=[];for(const m of local||[]){if(typeof m.id==='string'&&/^cloud:\\d+$/.test(m.id))continue;const k=m.role+'\\0'+String(m.content||'').trim(),n=keys.get(k)||0;if(n){keys.set(k,n-1);continue;}extra.push(m);}
 return [...remote,...extra].sort((a,b)=>(Number(a.createdAt)||0)-(Number(b.createdAt)||0));
}\n`;
s=guard+s.slice(end);const old="const store=h.rt();const id=await selectExistingCloudSession(store,card,localStorage);if(!id){globalThis.__aksCloudSync={ok:false,error:'waiting-for-existing-cloud-session',at:Date.now()};return;}if(cursor>=0";const replacement="const store=h.rt();let id=await selectExistingCloudSession(store,card,localStorage);if(!id){const probe=await api('history',{after:0,limit:100});id=await selectExistingCloudSession(store,card,localStorage,probe.messages||[]);}if(!id){globalThis.__aksCloudSync={ok:false,error:'waiting-for-existing-cloud-session',at:Date.now()};return;}if(cursor>=0";if(s.split(old).length!==2)throw Error('sync anchor changed');s=s.replace(old,replacement);s=s.replace("if(chat.sending||chat.pendingQueuedSendCount)return;for(const m of messages)","if(chat.sending||chat.activeTurns?.length||chat.pendingQueuedSendCount)return;for(const m of messages)");s=s.replace('await store.replaceSessionHistory(id,messages);cursor=after;', 'const current=store.getSessionMessagesIfLoaded(id)||[];await store.replaceSessionHistory(id,mergeCloudHistory(messages,current));cursor=after;');await fs.writeFile(f,s);
