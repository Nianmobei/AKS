import {AsyncLocalStorage} from 'node:async_hooks';
export class BudgetPolicy {
 constructor(db,{clock=()=>new Date(),dayLimit=10,monthLimit=300}={}){
  Object.assign(this,{db,clock,dayLimit,monthLimit});this.context=new AsyncLocalStorage();
  for(const [name,type] of [['cost_cny','REAL'],['provider','TEXT'],['model','TEXT']])if(!db.prepare('PRAGMA table_info(usage)').all().some(c=>c.name===name))db.exec('ALTER TABLE usage ADD COLUMN '+name+' '+type);
  if(!db.prepare('PRAGMA table_info(usage)').all().some(c=>c.name==='scope'))db.exec("ALTER TABLE usage ADD COLUMN scope TEXT NOT NULL DEFAULT 'legacy'");
 }
 run(scope,fn){if(!['owner','autonomy'].includes(scope))throw Error('Invalid budget scope');return this.context.run(scope,fn);}
 scope(){return this.context.getStore()||'autonomy';}
 snapshot(){
  const now=this.clock(),date=now.toLocaleDateString('sv-SE',{timeZone:'Asia/Shanghai'}),start=new Date(date+'T00:00:00+08:00').toISOString(),monthStart=new Date(date.slice(0,7)+'-01T00:00:00+08:00').toISOString();
  const rows=this.db.prepare('SELECT at,kind,input,output,scope,cost_cny FROM usage WHERE at>=?').all(monthStart);
  const cost=r=>Number.isFinite(r.cost_cny)?r.cost_cny:r.input*9/1e6+r.output*27/1e6+(['search','fetch'].includes(r.kind)?.005:0);
  const sum=xs=>xs.reduce((n,r)=>n+cost(r),0),daily=rows.filter(r=>r.at>=start),autonomous=rows.filter(r=>r.scope!=='owner'),autoDay=daily.filter(r=>r.scope!=='owner');
  const used=sum(autoDay),monthUsed=sum(autonomous);
  return {used,remaining:Math.max(0,Math.min(this.dayLimit-used,this.monthLimit-monthUsed)),dayLimit:this.dayLimit,monthLimit:this.monthLimit,monthUsed,ownerChatCny:sum(daily.filter(r=>r.scope==='owner')),ownerMonthCny:sum(rows.filter(r=>r.scope==='owner')),totalDailyCny:sum(daily),totalMonthCny:sum(rows),ownerChatMayExceed:true,legacyUsageChargedToAutonomy:true,conservativeEstimate:true,timeZone:'Asia/Shanghai'};
 }
 settle(id,{input,output,provider,model,costCny}){if(!Number.isFinite(costCny)||costCny<0||!Number.isSafeInteger(input)||input<0||!Number.isSafeInteger(output)||output<0)throw Error('Invalid provider usage');this.db.prepare('UPDATE usage SET kind=?,input=?,output=?,provider=?,model=?,cost_cny=? WHERE id=?').run('chat',input,output,provider,model,costCny,id);}
 reserve(amount){if(!Number.isFinite(amount)||amount<0)throw Error('Invalid reservation');const s=this.scope();if(s!=='owner'&&amount>this.snapshot().remaining)throw Error('Autonomy budget reached');return this.db.prepare('INSERT INTO usage(at,kind,input,output,scope) VALUES(?,?,?,0,?)').run(this.clock().toISOString(),'reservation',Math.ceil(amount*1e6/9),s).lastInsertRowid;}
}
export const restPresentation='今天读得有些累了，剩下的明天再看。老板，你说，我还在。';
