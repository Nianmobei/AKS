import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../research/aks-autonomy/prototype');
for(const directory of [source,...process.argv.slice(2)]){
 const target=path.join(directory,'desktop-work-router.mjs');let text=fs.readFileSync(target,'utf8');
 if(!text.includes("from './desktop-route-policy.mjs'")){
  const end=text.indexOf('export function createDesktopRouter');if(end<0)throw Error('Router factory missing');
  const backup=target+'.before-explicit-routing-'+Date.now();fs.copyFileSync(target,backup);
  text="import {classify} from './desktop-route-policy.mjs';\nexport {classify} from './desktop-route-policy.mjs';\n"+text.slice(end);
  const pendingStart=text.indexOf("  const pending=db.prepare('SELECT text,updated FROM desktop_route_pending");const pendingEnd=text.indexOf("  if(kind==='daily-reset')",pendingStart);if(pendingStart<0||pendingEnd<0)throw Error('Pending route markers changed');text=text.slice(0,pendingStart)+text.slice(pendingEnd);
  text=text.split('\n').filter(line=>!line.includes("if(kind==='uncertain'&&workService.generate?.classify)")).join('\n');
  const marker=" const read=()=>db.prepare('SELECT mode,updated FROM desktop_work_state WHERE id=1').get();";
  if(!text.includes(marker))throw Error('Route state marker changed');
  const reset=" db.exec('CREATE TABLE IF NOT EXISTS desktop_route_policy (id INTEGER PRIMARY KEY CHECK(id=1), version INTEGER)');\n if(db.prepare('SELECT version FROM desktop_route_policy WHERE id=1').get()?.version!==2){db.prepare(\"UPDATE desktop_work_state SET mode='',updated=0 WHERE id=1\").run();db.prepare('DELETE FROM desktop_route_pending WHERE id=1').run();db.prepare('INSERT OR REPLACE INTO desktop_route_policy VALUES(1,2)').run();}\n";
  text=text.replace(marker,reset+marker);fs.writeFileSync(target,text);
 }
 if(path.resolve(directory)!==source)fs.copyFileSync(path.join(source,'desktop-route-policy.mjs'),path.join(directory,'desktop-route-policy.mjs'));
 console.log('Explicit-intent routing ready: '+target);
}
