import fs from 'node:fs/promises';import path from 'node:path';import {spawn} from 'node:child_process';
const powershell=String.raw`$ErrorActionPreference='Stop'
[Console]::InputEncoding=[System.Text.Encoding]::UTF8
$payload=[Console]::In.ReadToEnd() | ConvertFrom-Json
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Windows.Forms -TypeDefinition @'
using System; using System.Runtime.InteropServices; using System.Windows.Forms;
public class AksPassivePopup : Form {
 protected override bool ShowWithoutActivation { get { return true; } }
 protected override CreateParams CreateParams { get { var p=base.CreateParams; p.ExStyle |= 0x08000000 | 0x00000080 | 0x00000020; return p; } }
}
public static class AksWindowPosition {
 [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left,Top,Right,Bottom; }
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
 [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);
}
'@
$form=New-Object AksPassivePopup
$form.FormBorderStyle=[System.Windows.Forms.FormBorderStyle]::None
$form.ShowInTaskbar=$false
$form.StartPosition=[System.Windows.Forms.FormStartPosition]::Manual
$form.TopMost=$true
$form.BackColor=[System.Drawing.Color]::FromArgb(232,248,250)
$form.Opacity=0
$form.Size=New-Object System.Drawing.Size(340,145)
$rounded=New-Object System.Drawing.Drawing2D.GraphicsPath
$rounded.AddArc(0,0,24,24,180,90);$rounded.AddArc(315,0,24,24,270,90);$rounded.AddArc(315,120,24,24,0,90);$rounded.AddArc(0,120,24,24,90,90);$rounded.CloseFigure()
$form.Region=New-Object System.Drawing.Region($rounded)
$title=New-Object System.Windows.Forms.Label
$title.Text=$payload.title
$title.Font=New-Object System.Drawing.Font('Microsoft YaHei UI',10,[System.Drawing.FontStyle]::Bold)
$title.ForeColor=[System.Drawing.Color]::FromArgb(35,75,91)
$title.SetBounds(16,11,308,24)
$body=New-Object System.Windows.Forms.Label
$body.Text=$payload.body
$body.UseMnemonic=$false
$body.AutoEllipsis=$true
$body.Font=New-Object System.Drawing.Font('Microsoft YaHei UI',10)
$body.ForeColor=[System.Drawing.Color]::FromArgb(40,58,67)
$body.SetBounds(16,39,308,94)
$form.Controls.Add($title);$form.Controls.Add($body)
$stage=Get-Process -Name airi -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -eq 'AIRI' -and $_.MainWindowHandle -ne 0} | Select-Object -First 1
if(!$stage){$form.Dispose();throw 'AIRI stage window is unavailable'}
$handle=$stage.MainWindowHandle
$position={
 $r=New-Object AksWindowPosition+RECT
 if([AksWindowPosition]::IsIconic($handle) -or ![AksWindowPosition]::GetWindowRect($handle,[ref]$r)){$form.Opacity=0;return}
 $rect=New-Object System.Drawing.Rectangle($r.Left,$r.Top,($r.Right-$r.Left),($r.Bottom-$r.Top))
 $area=[System.Windows.Forms.Screen]::FromRectangle($rect).WorkingArea
 $pad=8;$gap=10;$width=$form.Width;$height=$form.Height
 if($area.Width -lt $width+2*$pad -or $area.Height -lt $height+2*$pad){$form.Opacity=0;return}
 $clampedY=[Math]::Max($area.Top+$pad,[Math]::Min($r.Top+24,$area.Bottom-$height-$pad))
 $clampedX=[Math]::Max($area.Left+$pad,[Math]::Min($r.Left,$area.Right-$width-$pad))
 if($r.Right+$gap+$width -le $area.Right-$pad -and $r.Right+$gap -ge $area.Left+$pad){$x=$r.Right+$gap;$y=$clampedY}
 elseif($r.Left-$gap-$width -ge $area.Left+$pad -and $r.Left-$gap -le $area.Right-$pad){$x=$r.Left-$gap-$width;$y=$clampedY}
 elseif($r.Top-$gap-$height -ge $area.Top+$pad -and $r.Top-$gap -le $area.Bottom-$pad){$x=$clampedX;$y=$r.Top-$gap-$height}
 elseif($r.Bottom+$gap+$height -le $area.Bottom-$pad -and $r.Bottom+$gap -ge $area.Top+$pad){$x=$clampedX;$y=$r.Bottom+$gap}
 else {$form.Opacity=0;return}
 $form.Opacity=0.98
 $form.Location=New-Object System.Drawing.Point($x,$y)
}
& $position
$timer=New-Object System.Windows.Forms.Timer
$timer.Interval=500
$started=[DateTime]::UtcNow
$timer.Add_Tick({if(([DateTime]::UtcNow-$started).TotalSeconds -ge 15){$timer.Stop();$form.Close()}else{& $position}})
try {
 $timer.Start()
 [System.Windows.Forms.Application]::Run($form)
} finally { $timer.Dispose();$form.Dispose();$rounded.Dispose() }`;
export function showLifeNotification(text,{spawnImpl=spawn}={}){
 const original=String(text||'').replace(/\s+/g,' ').trim();const clean=original.length>110?original.slice(0,109)+'…':original;if(!clean)throw Error('Empty notification');
 const exe=path.join(process.env.SystemRoot||'C:/Windows','System32/WindowsPowerShell/v1.0/powershell.exe');
 const encoded=Buffer.from(powershell,'utf16le').toString('base64');
 const child=spawnImpl(exe,['-NoProfile','-NonInteractive','-STA','-WindowStyle','Hidden','-EncodedCommand',encoded],{windowsHide:true,stdio:['pipe','ignore','ignore']});
 child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify({title:'小 A',body:clean}));return new Promise((resolve,reject)=>{child.once('spawn',()=>resolve(child));child.once('error',reject);});
}
export async function createLifeNotifier({directory,notify=showLifeNotification,clock=Date.now}={}){
 await fs.mkdir(directory,{recursive:true});const file=path.join(directory,'life-popup-state.json');
 let state;try{state=JSON.parse(await fs.readFile(file,'utf8'));if(!Number.isFinite(state.since)||!Array.isArray(state.seen))throw Error('Invalid popup state');}catch(e){if(e.code!=='ENOENT')throw e;state={since:clock(),seen:[]};await fs.writeFile(file,JSON.stringify(state),{flag:'wx'});}
 let queue=Promise.resolve();
 return {process(result){queue=queue.catch(()=>{}).then(async()=>{
  const candidates=(result?.messages||[]).filter(r=>r?.role==='assistant'&&r.source==='life'&&Number.isSafeInteger(r.seq)&&Date.parse(r.created)>=state.since&&!state.seen.includes(r.seq)&&typeof r.text==='string'&&r.text.trim());
  if(!candidates.length)return {notified:0};
  const unique=[...new Map(candidates.map(r=>[r.seq,r])).values()].sort((a,b)=>a.seq-b.seq);const chosen=unique.at(-1);
  await Promise.resolve(notify(chosen.text));
  const next={...state,seen:[...state.seen,...unique.map(r=>r.seq)].slice(-500)};await fs.writeFile(file,JSON.stringify(next));state=next;return {notified:1,seq:chosen.seq};
 });return queue;}};
}
