import fs from 'node:fs/promises';
const f=process.argv[2];let s=await fs.readFile(f,'utf8');
if(!s.includes("from './desktop-work-router.mjs'"))s="import {createDesktopRouter} from './desktop-work-router.mjs';\n"+s;
s=s.replace("const workService=await createWorkService({directory:path.join(here,'work-private'),base,generate:workConfig?createStatelessWorkProvider(workConfig):null});","const workService=await createWorkService({directory:path.join(here,'work-private'),base,generate:workConfig?createStatelessWorkProvider(workConfig):null});\nconst routeDesktopWork=createDesktopRouter({workService});");
s=s.replace('resolveDesktopTurn(text,{hasImages:', 'routeDesktopWork(text,{requestId:String(requestId),hasImages:');
s=s.replace('resolveDesktopTurn(p.text,{dailyTurn:', 'routeDesktopWork(p.text,{requestId:String(p.id||randomUUID()),dailyTurn:');
await fs.writeFile(f,s);
