# Desinstalação com verificação de hashes e da versão efetivamente instalada
$ErrorActionPreference = "Stop"
$Patcher = Join-Path (Split-Path -Parent $PSScriptRoot) "patch-asar.js"
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js é necessário para validar o backup."
    exit 1
}
if (Get-Process -Name "Antigravity" -ErrorAction SilentlyContinue) {
    Write-Error "Feche o Antigravity antes de restaurar."
    exit 1
}
$Candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\antigravity\resources"),
    (Join-Path $env:LOCALAPPDATA "Programs\Antigravity\resources"),
    (Join-Path $env:ProgramFiles "Antigravity\resources")
)
if ($env:ProgramFiles -and ${env:ProgramFiles(x86)}) {
    $Candidates += (Join-Path ${env:ProgramFiles(x86)} "Antigravity\resources")
}
$Restored = $false
foreach ($res in ($Candidates | Select-Object -Unique)) {
    $bak = Join-Path $res "app.asar.bak-original"
    if (Test-Path $bak) {
        $asar = Join-Path $res "app.asar"
        & node $Patcher "--asar=$asar" --restore
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Restauração bloqueada: backup inválido ou de outra versão."
            exit 1
        }
        $Restored = $true
    }
}
if (-not $Restored) {
    Write-Error "Nenhum backup validável encontrado; nada foi alterado."
    exit 1
}
Write-Host "Restauração segura concluída." -ForegroundColor Green
