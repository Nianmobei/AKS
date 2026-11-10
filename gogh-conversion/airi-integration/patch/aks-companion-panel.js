import './aks-work-launcher.js';
export function mountCompanion(parent){
 if(parent.querySelector('#aks-inside-panel'))return;
 const box=document.createElement('details');box.id='aks-inside-panel';box.style.cssText='border-top:1px solid #777;padding:8px 0;color:#eee';
 box.innerHTML=`<summary style="cursor:pointer;font-size:13px">小 A · 日记、语气与工作</summary><div style="display:grid;gap:8px;margin-top:8px"><select id="aks-tab"><option value="diary">日记与阅读</option><option value="voice">语气矫正</option><option value="work">独立工作区</option><option value="qq">QQ 登录</option></select><p id="aks-info" style="white-space:pre-wrap;margin:0"></p><div id="aks-content"></div></div>`;
 parent.prepend(box);const $=s=>box.querySelector(s),content=$('#aks-content');
 async function api(route,payload){const h=await import('./hearing-CWm8WPGq.js');const key=h.Z().getProviderConfig('aks-cloud')?.apiKey;if(!key)throw Error('请先设置云端设备');const r=await fetch('http://127.0.0.1:6220/'+route,{method:payload?'POST':'GET',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},...(payload?{body:JSON.stringify(payload)}:{})});const x=await r.json();if(!r.ok||x.error)throw Error(x.error||'连接失败');return x;}
 const element=(tag,text)=>{const e=document.createElement(tag);if(text)e.textContent=text;e.style.cssText='box-sizing:border-box;max-width:100%;width:100%;margin:4px 0;padding:6px;border-radius:5px;color:#202632;background:#f3f5f8;white-space:pre-wrap;overflow-wrap:anywhere';return e};
 const button=(text,fn)=>{const b=element('button',text);b.onclick=()=>Promise.resolve().then(fn).catch(show);return b};const show=e=>$('#aks-info').textContent=e.message||String(e);
 async function render(){content.replaceChildren();$('#aks-info').textContent='';const tab=$('#aks-tab').value;
 if(tab==='work'){content.append(element('p','任务讨论与工作记忆单独保存，不进入小 A 的人格、日常聊天和语气库。'));const out=element('p','正在检查工作连接…');content.append(out);try{const r=await fetch('http://127.0.0.1:6220/api/work/v1/status'),s=await r.json();out.textContent=s.protocol==='aks-work/1'&&s.ready?'独立工作服务已就绪。':'工作接口已预留，专用模型后端尚未配置。';}catch{out.textContent='独立工作服务尚未连接。';}const link=element('a','打开任务工作区');link.href='http://127.0.0.1:4175/work';link.target='_blank';link.rel='noopener noreferrer';content.append(link);}
 if(tab==='diary'){const out=element('div','正在读取云端记录…');content.append(out,button('刷新',render));const d=await api('life');const sim=d.simulation||{},notes=d.reading||[];const chunks=['这些是保存的模拟活动、阅读笔记和小说，不代表真实外出。'];for(const a of sim.recentCompleted||[])chunks.push('【活动 '+(a.ended||'')+'】\n'+JSON.stringify(a.result,null,2));for(const n of notes.slice(0,12))chunks.push('【阅读 '+(n.created||'')+'】'+(n.title||'')+'\n'+(n.fact||'')+'\n想法：'+(n.opinion||'')+(n.url?'\n来源：'+n.url:''));if(sim.novel)chunks.push('【小说第 '+sim.novel.revision+' 版】\n'+(sim.novel.body||''));out.textContent=chunks.join('\n\n');}
 if(tab==='voice'){
 const rule=element('textarea');rule.rows=2;rule.maxLength=120;rule.placeholder='一句话：下次希望小 A 怎样说（最多120字）';
 const scene=element('input');scene.placeholder='适用场景（选填）：纠错、闲聊、安慰；留空为通用';
 content.append(element('small','先整理为短规则，采纳后生效。每轮最多2条、合计240字；原对照只留档。'),rule,scene,button('整理并保存',async()=>{await api('companion-api',{action:'feedback',payload:{guidance:rule.value,original:'短规则录入',preferred:rule.value,reason:rule.value,tags:scene.value.split(/[，,、]/).map(x=>x.trim()).filter(Boolean).length?scene.value.split(/[，,、]/).map(x=>x.trim()).filter(Boolean):['通用']}});await render()}));
 const r=await api('companion-api',{action:'list'});
 for(const x of r.feedback.filter(v=>!JSON.parse(v.tags).includes('隔离测试'))){
  const row=element('div');row.style.cssText='padding:8px 0;border-top:1px solid #555';
  const text=element('div',x.guidance||String(x.reason||x.preferred).slice(0,120));text.style.cssText='font-size:13px;line-height:1.5;overflow-wrap:anywhere';
  const status=element('small',({pending:'待采纳',approved:'已采纳',disabled:'已停用'}[x.state]||x.state));status.style.cssText='font-size:11px;opacity:.7';
  const edit=element('textarea');edit.rows=2;edit.maxLength=120;edit.value=x.guidance||String(x.reason||x.preferred).slice(0,120);
  const detail=document.createElement('details'),summary=document.createElement('summary');summary.textContent='修改 / 原对照';summary.style.cssText='font-size:12px;cursor:pointer';detail.append(summary,edit,button('采纳这条短规则',async()=>{await api('companion-api',{action:'approve',payload:{id:x.id,guidance:edit.value}});await render()}));
  if(x.original||x.preferred||x.reason)detail.append(element('small','原回复：'+x.original+'\n希望：'+x.preferred+'\n备注：'+x.reason));
  const action=button(x.state==='approved'?'停用':'采纳',async()=>{await api('companion-api',{action:x.state==='approved'?'deactivate':'approve',payload:{id:x.id,...(x.state==='approved'?{}:{guidance:edit.value})}});await render()});action.style.cssText='font-size:12px;margin:4px;padding:3px 8px;width:auto;max-width:100%';
  row.append(text,status,action,detail);content.append(row);
 }
}
 if(tab==='qq'){const out=element('div','正在检查…'),img=document.createElement('img');img.style.cssText='max-width:240px;width:100%';content.append(out,button('检查登录',render),button('显示 / 刷新二维码',async()=>{const r=await api('qq-qr',{refresh:true});if(r.data){img.src='data:'+r.mimeType+';base64,'+r.data;out.textContent='请用小号扫码确认'}else out.textContent=r.message||'QQ 已在线';}),img);const q=await api('qq-status');out.textContent=q.message||'QQ 状态暂不可用';}
 }
 box.ontoggle=()=>{if(box.open)render().catch(show)};$('#aks-tab').onchange=()=>render().catch(show);
}
