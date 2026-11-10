param([string]$InstallRoot='C:\Users\linbowen\Documents\AKS-Windows-本地端')
$ErrorActionPreference='Stop'
$repoRoot=Split-Path $PSScriptRoot -Parent
$clientDir=Join-Path $InstallRoot 'client'
$sourceDir=Join-Path $repoRoot 'research\aks-autonomy\prototype'
if(-not (Test-Path -LiteralPath (Join-Path $clientDir 'device-server.mjs'))){throw 'Installed device bridge not found'}
$backupDir=Join-Path $clientDir ('backups\cloud-release-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
$serverFile=Join-Path $clientDir 'device-server.mjs'
$deviceFile=Join-Path $clientDir 'device.html'
$serverText=[IO.File]::ReadAllText($serverFile)
if(-not $serverText.Contains("from './cloud-release-client.mjs'")){
  $marker='const preparedTurns=new Map();'
  if(-not $serverText.Contains($marker)){throw 'Unexpected installed bridge: prepared turns marker missing'}
  $serverText="import {createCloudReleaseReader} from './cloud-release-client.mjs';`n"+$serverText
  $serverText=$serverText.Replace($marker,$marker+"`nconst readCloudRelease=createCloudReleaseReader((action,payload)=>client.request(action,payload));")
  $marker=" if(req.url==='/avatar')"
  if(-not $serverText.Contains($marker)){throw 'Unexpected installed bridge: avatar marker missing'}
  $serverText=$serverText.Replace($marker," if(req.url==='/release'&&req.method==='GET'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(await readCloudRelease()));return;}`n"+$marker)
}
$utf8=[Text.UTF8Encoding]::new($false)
$sourceServer=[IO.File]::ReadAllText((Join-Path $sourceDir 'device-server.mjs'))
if(-not $serverText.Contains('let lastModelStatus=')){
  $marker='const preparedTurns=new Map();'
  if(-not $serverText.Contains($marker)){throw 'Prepared turns marker missing'}
  $stateLine=($sourceServer -split "`n" | Where-Object {$_.Contains('let lastModelStatus=')})
  $wrapperLine=($sourceServer -split "`n" | Where-Object {$_.StartsWith('const modelRequest=')})
  $serverText=$serverText.Replace($marker,($stateLine.TrimEnd()+"`n"+$wrapperLine.TrimEnd()))
}
foreach($endpoint in @('/argon-test','/argon-test/turn')){
  $matchText="req.url==='"+$endpoint+"'"
  if(-not $serverText.Contains($matchText)){
    $routeLine=($sourceServer -split "`n" | Where-Object {$_.Contains($matchText)})
    if(-not $routeLine){throw 'Argon route missing from source'}
    $marker=if($endpoint -eq '/argon-test'){" if(req.url==='/'&&req.method==='GET')"}else{" if(req.url==='/companion'&&req.method==='GET')"}
    if(-not $serverText.Contains($marker)){throw 'Argon route marker missing from installed bridge'}
    $serverText=$serverText.Replace($marker,($routeLine.TrimEnd()+"`n"+$marker))
  }
}
if(-not $serverText.Contains("req.url==='/model-status'")){
  $routeLine=($sourceServer -split "`n" | Where-Object {$_.Contains("req.url==='/model-status'")})
  $marker=" if(req.url==='/companion'&&req.method==='GET')"
  if(-not $serverText.Contains($marker)){throw 'Model status route marker missing'}
  $serverText=$serverText.Replace($marker,($routeLine.TrimEnd()+"`n"+$marker))
}
if(-not $serverText.Contains('nativeStatus=')){
  $serverText=$serverText.Replace('let lastModelStatus={model:null};',"let lastModelStatus={model:null},nativeStatus={phase:'not-reported'};")
}
if(-not $serverText.Contains("req.url==='/native-status'")){
  $routeLine=($sourceServer -split "`n" | Where-Object {$_.Contains("req.url==='/native-status'")})
  $marker=" if(req.url==='/model-status'"
  if(-not $serverText.Contains($marker)){throw 'Native status route marker missing'}
  $serverText=$serverText.Replace($marker,($routeLine.TrimEnd()+"`n"+$marker))
}
Copy-Item -LiteralPath $serverFile -Destination $backupDir
Copy-Item -LiteralPath $deviceFile -Destination $backupDir
Copy-Item -LiteralPath (Join-Path $sourceDir 'cloud-release-client.mjs') -Destination $clientDir
[IO.File]::WriteAllText($serverFile,$serverText,$utf8)
Copy-Item -LiteralPath (Join-Path $sourceDir 'device.html') -Destination $deviceFile
Copy-Item -LiteralPath (Join-Path $sourceDir 'argon-test.html') -Destination $clientDir
$nodePath=Join-Path $InstallRoot 'runtime\node.exe'
& $nodePath --check $serverFile
if($LASTEXITCODE -ne 0){Copy-Item -LiteralPath (Join-Path $backupDir 'device-server.mjs') -Destination $serverFile;throw 'Device syntax validation failed'}
# Restart only the bridge belonging to this installation; leave AIRI and project apps running.
$bridgeProcesses=Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -and $_.CommandLine.Contains($serverFile) }
foreach($bridgeProcess in $bridgeProcesses){Stop-Process -Id $bridgeProcess.ProcessId -ErrorAction Stop}
$env:AKS_CLOUD_ROOT=Join-Path $clientDir 'cloud'
Start-Process -FilePath $nodePath -ArgumentList ('"'+$serverFile+'"') -WorkingDirectory $clientDir -WindowStyle Hidden -RedirectStandardOutput (Join-Path $clientDir 'startup.log') -RedirectStandardError (Join-Path $clientDir 'startup-error.log')
Write-Output ('Updated device bridge; backup: '+$backupDir)
