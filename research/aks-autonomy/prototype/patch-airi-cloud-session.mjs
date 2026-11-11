import fs from 'node:fs/promises';const f='research/aks-autonomy/prototype/aks-cloud-device.js';let s=await fs.readFile(f,'utf8');
const guard=`export async function selectExistingCloudSession(store,card,storage){
 if(!store.ready||!card?.activeCardId)return null;
 const key='aks-cloud-owner-session:'+card.activeCardId;
 const metas=store.sessionMetas||{};
 let id=storage.getItem(key)||'';
 if(id&&metas[id]?.characterId!==card.activeCardId)id='';
 if(!id){
  const candidate=String(store.activeSessionId||'');
  if(!candidate||metas[candidate]?.characterId!==card.activeCardId)return null;
  if(!await store.loadSession(candidate))return null;
  const existing=store.getSessionMessagesIfLoaded(candidate);
  if(!Array.isArray(existing)||!existing.some(m=>typeof m.id==='string'&&/^cloud:\\d+$/.test(m.id)))return null;
  id=candidate;storage.setItem(key,id);
 }
 if(!await store.loadSession(id))return null;
 return id;
}\n`;
s=guard+s;const original="const store=h.rt();const id=await store.ensureBoundSession('qq:1330049468:private:1019312311:1019312311');if(cursor>=0";
const replacement="const store=h.rt();const id=await selectExistingCloudSession(store,card,localStorage);if(!id){globalThis.__aksCloudSync={ok:false,error:'waiting-for-existing-cloud-session',at:Date.now()};return;}if(cursor>=0";
if(s.split(original).length!==2)throw Error('Unexpected sync source');s=s.replace(original,replacement);s=s.replace("if(!globalThis.__aksCloudSyncTimer){", "if(typeof window!=='undefined'&&!globalThis.__aksCloudSyncTimer){");await fs.writeFile(f,s);
