# ========================================================
# Desinstalador da Tradução Antigravity pt-BR (Windows PowerShell)
# ========================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Desinstalador da Tradução do Antigravity - Windows" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$Candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\antigravity\resources"),
    (Join-Path $env:ProgramFiles "Antigravity\resources"),
    (Join-Path ${env:ProgramFiles(x86)} "Antigravity\resources")
)

$Restored = $false
foreach ($res in $Candidates) {
    $bak = Join-Path $res "app.asar.bak-original"
    $asar = Join-Path $res "app.asar"
    $i18n = Join-Path $res "i18n-pt-br.js"
    if (Test-Path $bak) {
        Write-Host "Restaurando backup original em $asar..." -ForegroundColor Cyan
        Copy-Item $bak $asar -Force
        if (Test-Path $i18n) { Remove-Item $i18n -Force }
        $Restored = $true
        Write-Host " Backup original restaurado com sucesso!" -ForegroundColor Green
    }
}

if (-not $Restored) {
    Write-Host " Nenhum backup app.asar.bak-original encontrado automaticamente." -ForegroundColor Yellow
}

Write-Host "Desinstalação concluída. Reinicie o Antigravity." -ForegroundColor Green
