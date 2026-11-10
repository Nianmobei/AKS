// A settings shortcut only. It never reads credentials, chats or character stores.
export function installWorkSettingsShortcut(){
 let scheduled=false;
 const mount=()=>{
  scheduled=false;const existing=document.getElementById('aks-work-settings-shortcut');
  if(!location.hash.startsWith('#/settings')){existing?.remove();return;}
  if(existing)return;
  const heading=document.querySelector('h1,h2');if(!heading)return;
  const region=document.createElement('section');region.id='aks-work-settings-shortcut';region.setAttribute('aria-label','独立工作区');
  region.style.cssText='box-sizing:border-box;margin:16px 16px 20px;padding:16px;border:1px solid #8eb4da;border-radius:14px;background:light-dark(#eff7ff,#1c2c3d);color:light-dark(#1d3550,#e8f3ff)';
  const link=document.createElement('a');link.textContent='打开工作区';link.setAttribute('role','button');link.target='_blank';link.rel='noopener noreferrer';
  link.style.cssText='box-sizing:border-box;display:flex;align-items:center;justify-content:center;min-height:46px;padding:10px 18px;border-radius:10px;background:#2479bd;color:#fff;font-size:17px;font-weight:650;text-decoration:none;cursor:pointer';
  const description=document.createElement('p');description.textContent='任务问答、需求细化与逐项审阅';description.style.cssText='margin:10px 0 4px;font-size:13px';
  const status=document.createElement('p');status.setAttribute('role','status');status.style.cssText='margin:4px 0;font-size:12px;line-height:1.5';
  const retry=document.createElement('button');retry.type='button';retry.textContent='重新检查';retry.style.cssText='padding:3px 0;margin-top:5px;border:0;background:transparent;color:inherit;text-decoration:underline;cursor:pointer;font-size:12px';
  let available=false,busy=false;
  async function check(){
   if(busy)return;busy=true;available=false;link.removeAttribute('href');link.setAttribute('aria-disabled','true');status.textContent='正在检查工作连接…';
   try{const r=await fetch('http://127.0.0.1:6220/api/work/v1/launch',{signal:AbortSignal.timeout(4000)});if(!r.ok)throw Error('unavailable');const s=await r.json();
    available=s.protocol==='aks-work/1'&&s.workbenchAvailable===true;
    if(available){link.href='http://127.0.0.1:4175/work';link.setAttribute('aria-disabled','false');status.textContent=s.ready?'工作区已连接，工作记录独立保存。':'工作区可以打开，模型连接尚未就绪。';}
    else status.textContent='独立工作服务未启动。请先启动工作服务，再点“重新检查”。';
   }catch{status.textContent='小 A 的本机连接不可用。请先启动 AKS，再点“重新检查”。';}finally{busy=false;}
  }
  link.addEventListener('click',event=>{if(!available){event.preventDefault();void check();}});retry.onclick=check;
  region.append(link,description,status,retry);
  // Keep the original settings component and its controls intact.
  heading.parentElement.insertAdjacentElement('afterend',region);void check();
 };
 const schedule=()=>{if(!scheduled){scheduled=true;queueMicrotask(mount);}};
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});window.addEventListener('hashchange',schedule);schedule();
}
if(typeof document!=='undefined'){
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installWorkSettingsShortcut,{once:true});else installWorkSettingsShortcut();
}
