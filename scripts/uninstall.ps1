# ========================================================
# Desinstalador da Tradução Antigravity pt-BR (Windows PowerShell)
# ========================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Desinstalador da Tradução do Antigravity - Windows" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Signature = "Cambrith pt-BR Localization Injection"

# O patcher valida o backup: só restaura o original da MESMA versão instalada.
$Patcher = $null
foreach ($p in @(
    (Join-Path $env:APPDATA "Antigravity\i18n\patch-asar.js"),
    (Join-Path (Split-Path -Parent $ScriptDir) "patch-asar.js"),
    (Join-Path $ScriptDir "patch-asar.js")
)) {
    if (Test-Path $p) { $Patcher = $p; break }
}

$Candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\antigravity\resources"),
    (Join-Path $env:LOCALAPPDATA "Programs\Antigravity\resources")
)
if ($env:ProgramFiles) { $Candidates += (Join-Path $env:ProgramFiles "Antigravity\resources") }
if (${env:ProgramFiles(x86)}) { $Candidates += (Join-Path ${env:ProgramFiles(x86)} "Antigravity\resources") }

$Found = $false
$Failed = $false
foreach ($res in $Candidates) {
    $asar = Join-Path $res "app.asar"
    if (-not (Test-Path $asar)) { continue }
    if (-not (Select-String -Path $asar -Pattern $Signature -SimpleMatch -Quiet)) { continue }
    $Found = $true
    if (-not $Patcher -or -not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host " $asar está traduzido, mas o Node.js ou o patch-asar.js não foram encontrados para validar o backup." -ForegroundColor Red
        $Failed = $true
        continue
    }
    Write-Host "Restaurando o original em $asar..." -ForegroundColor Cyan
    & node $Patcher "--restore-original" "--asar=$asar"
    if ($LASTEXITCODE -eq 0 -and -not (Select-String -Path $asar -Pattern $Signature -SimpleMatch -Quiet)) {
        foreach ($f in @("i18n-pt-br.js", "cambrith-window-controls.js")) {
            $fp = Join-Path $res $f
            if (Test-Path $fp) { Remove-Item $fp -Force }
        }
        Write-Host " Original restaurado." -ForegroundColor Green
    } else {
        Write-Host " Não foi possível restaurar $asar com segurança. Reinstale o Antigravity para voltar ao original." -ForegroundColor Red
        $Failed = $true
    }
}

if (-not $Found) {
    Write-Host " Nenhuma instalação traduzida foi encontrada nos caminhos padrão." -ForegroundColor Yellow
}

if ($Failed) {
    Write-Host "Desinstalação concluída com avisos (veja acima)." -ForegroundColor Yellow
    exit 1
}
Write-Host "Desinstalação concluída. Reinicie o Antigravity." -ForegroundColor Green
