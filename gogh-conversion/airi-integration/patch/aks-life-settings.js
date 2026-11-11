export function formatLifeSchedule(data){
 const s=data?.schedule;if(!s||!Array.isArray(s.plan)||!s.current||typeof s.current.id!=='string')throw Error('日程数据暂不可用');
 const zone=s.timezone==='Asia/Shanghai'?'北京时间':s.timezone==='Europe/London'?'伦敦时间':(s.timezone||'云端时间');
 const lines=[`${s.date||''} ${s.time||''} · ${zone}`,...s.plan.map(x=>`${x.time||''}  ${x.title||''}${x.title===s.current.title?'  ◀ 现在':''}`)];
 const active=data?.simulation?.active;if(active?.state==='in_progress'){const title=active.plan?.title||({read:'阅读',walk:'散步构思',write:'写作',revise:'修改小说',film:'电影资料'}[active.kind]||'一项活动');lines.push(`\n${['sleep','rest'].includes(s.current.id)?'休息前的活动（等待继续）':'正在进行'}：${title}`);}
 else lines.push('\n当前显示的是日程安排，完成情况以实际记录为准。');
 return lines.join('\n');
}
export function installLifeSettings(){
 let scheduled=false;
 function mount(){scheduled=false;const existing=document.getElementById('aks-life-settings');if(!/^#\/settings\/?(?:\?.*)?$/.test(location.hash)){existing?.remove();return;}if(existing)return;
  const heading=document.querySelector('h1,h2');if(!heading)return;
  const region=document.createElement('details');region.id='aks-life-settings';region.setAttribute('aria-label','小 A 的日程');region.style.cssText='box-sizing:border-box;margin:12px 16px 20px;padding:15px 16px;border:1px solid #b4d9df;border-radius:14px;background:light-dark(#eef9fa,#21383d);color:light-dark(#20464d,#e4f6f7)';
  const title=document.createElement('summary');title.textContent='小 A 的日程';title.style.cssText='cursor:pointer;font-size:16px;font-weight:650;list-style-position:inside';
  const description=document.createElement('p');description.textContent='查看今天的安排与当前活动';description.style.cssText='margin:7px 0 0;font-size:12px;opacity:.8';
  const body=document.createElement('div');body.setAttribute('role','status');body.style.cssText='white-space:pre-wrap;font-size:13px;line-height:1.8;margin-top:10px;overflow-wrap:anywhere';
  const refresh=document.createElement('button');refresh.type='button';refresh.textContent='刷新';refresh.style.cssText='margin-top:8px;border:0;background:transparent;color:inherit;text-decoration:underline;cursor:pointer;font-size:12px';
  let busy=false,loadedAt=0;async function load(){if(busy)return;busy=true;body.textContent='正在读取云端日程…';try{const h=await import('./hearing-CWm8WPGq.js');const key=h.Z().getProviderConfig('aks-cloud')?.apiKey;if(!key)throw Error('请先连接小 A 的云端设备');const r=await fetch('http://127.0.0.1:6220/life',{headers:{Authorization:'Bearer '+key},signal:AbortSignal.timeout(30000)});const d=await r.json();if(!r.ok||d.error)throw Error('云端日程暂时不可用');body.textContent=formatLifeSchedule(d);loadedAt=Date.now()}catch(e){body.textContent=e.message||'云端日程暂时不可用';}finally{busy=false}}
  refresh.onclick=()=>void load();region.addEventListener('toggle',()=>{if(region.open&&Date.now()-loadedAt>60000)void load()});region.append(title,description,body,refresh);heading.parentElement.insertAdjacentElement('afterend',region);
 }
 const schedule=()=>{if(!scheduled){scheduled=true;queueMicrotask(mount)}};new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true});window.addEventListener('hashchange',schedule);schedule();
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installLifeSettings,{once:true});else installLifeSettings()}
