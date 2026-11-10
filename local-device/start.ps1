$ErrorActionPreference='Stop'
$base=$PSScriptRoot
$env:AKS_CLOUD_ROOT=Join-Path $base 'client\cloud'
$node=Join-Path $base 'runtime\node.exe'
$client=Join-Path $base 'client'
if(-not (Test-Path -LiteralPath (Join-Path $env:AKS_CLOUD_ROOT 'secrets\aks-desktop-conversation'))){
 & $node (Join-Path $client 'init-device.mjs')
 Write-Host '首次使用：设备公钥请求已生成。请把 client\设备授权请求.txt 交给部署助手，授权完成后再次启动。'
 Read-Host '按回车退出'
 exit 0
}
$probe=[Net.Sockets.TcpClient]::new();$running=$false
try{$running=$probe.ConnectAsync('127.0.0.1',6220).Wait(800) -and $probe.Connected}catch{}finally{$probe.Dispose()}
if(-not $running){Start-Process -FilePath $node -ArgumentList ('"'+(Join-Path $client 'device-server.mjs')+'"') -WorkingDirectory $client -WindowStyle Hidden}
Start-Process 'http://127.0.0.1:6220/'
Start-Process -FilePath (Join-Path $base 'airi\airi.exe') -WindowStyle Hidden
