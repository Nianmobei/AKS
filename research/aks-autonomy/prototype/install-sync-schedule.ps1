$ErrorActionPreference='Stop'
$aksInstall='C:\Users\linbowen\Documents\AKS-Windows-本地端'
$aksExe=Join-Path $aksInstall 'airi\airi.exe'
$aksClient=Join-Path $aksInstall 'client'
$aksArchive=Join-Path $aksInstall 'airi\resources\app.asar'
$aksPrepared=Join-Path $aksInstall 'airi\resources\app.sync-schedule.tmp.asar'
$aksStamp=Get-Date -Format 'yyyyMMdd-HHmmss'
$aksBackup=Join-Path $aksInstall "airi\resources\app.before-sync-schedule-$aksStamp.asar"
if(!(Test-Path -LiteralPath $aksPrepared) -or (Test-Path -LiteralPath $aksBackup)){throw '修复包或备份路径异常'}
node research/aks-autonomy/prototype/check-work-idle.mjs (Join-Path $aksClient 'work-private\work.sqlite')
if($LASTEXITCODE -ne 0){throw '工作请求仍在执行'}
$aksListener=Get-NetTCPConnection -LocalPort 6220 -State Listen -ErrorAction Stop
$aksBridge=Get-CimInstance Win32_Process -Filter "ProcessId=$($aksListener.OwningProcess)"
if($aksBridge.ExecutablePath -ne (Join-Path $aksInstall 'runtime\node.exe') -or $aksBridge.CommandLine -notlike '*device-server.mjs*'){throw '桥接进程不匹配'}
$aksProcs=@(Get-CimInstance Win32_Process -Filter "Name='airi.exe'" | Where-Object {$_.ExecutablePath -eq $aksExe})
if(@($aksProcs | Where-Object {$_.CommandLine -notmatch '--type='}).Count -ne 1){throw '无法确认 AIRI 主进程'}
$aksDevice=Join-Path $aksClient 'device-server.mjs'
$aksDeviceBackup=Join-Path $aksClient "device-server.before-sync-diagnostic-$aksStamp.mjs"
Copy-Item -LiteralPath $aksDevice -Destination $aksDeviceBackup
if(-not (Select-String -Path $aksDevice -SimpleMatch "req.url==='/sync-diagnostic'" -Quiet)){node research/aks-autonomy/prototype/install-sync-diagnostic.mjs $aksDevice;if($LASTEXITCODE -ne 0){throw '诊断模块未安装'}}
node --check $aksDevice
if($LASTEXITCODE -ne 0){Copy-Item -LiteralPath $aksDeviceBackup -Destination $aksDevice -Force;throw '桥接语法检查失败'}
Stop-Process -Id $aksBridge.ProcessId -ErrorAction Stop
foreach($aksProc in $aksProcs){Stop-Process -Id $aksProc.ProcessId -Force -ErrorAction SilentlyContinue}
foreach($aksProc in $aksProcs){Wait-Process -Id $aksProc.ProcessId -Timeout 10 -ErrorAction SilentlyContinue}
if(@(Get-CimInstance Win32_Process -Filter "Name='airi.exe'" | Where-Object {$_.ExecutablePath -eq $aksExe}).Count -ne 0){throw 'AIRI 尚未完全退出，未替换应用包'}
Move-Item -LiteralPath $aksArchive -Destination $aksBackup -ErrorAction Stop
try{Move-Item -LiteralPath $aksPrepared -Destination $aksArchive -ErrorAction Stop}catch{Move-Item -LiteralPath $aksBackup -Destination $aksArchive -ErrorAction Stop;throw}
$env:AKS_CLOUD_ROOT=Join-Path $aksClient 'cloud'
Start-Process -FilePath (Join-Path $aksInstall 'runtime\node.exe') -ArgumentList ('"'+$aksDevice+'"') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $aksClient 'startup.log') -RedirectStandardError (Join-Path $aksClient 'startup-error.log')
Start-Process -FilePath $aksExe -WindowStyle Hidden
Write-Output "已启动，应用备份：$aksBackup"
