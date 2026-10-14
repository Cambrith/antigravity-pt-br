# ========================================================
# Instalador da Tradução Antigravity pt-BR (Windows PowerShell)
# ========================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Instalador da Tradução do Antigravity (pt-BR) - Windows" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar se Node.js está instalado
try {
    $nodeVer = & node -v
    Write-Host " Node.js detectado: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host " Erro: Node.js não foi encontrado no PATH do Windows." -ForegroundColor Red
    Write-Host "Instale o Node.js em https://nodejs.org antes de continuar." -ForegroundColor Yellow
    exit 1
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigI18nDir = Join-Path $env:APPDATA "Antigravity\i18n"

# 2. Localizar app.asar no Windows
$Candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\antigravity\resources\app.asar"),
    (Join-Path $env:LOCALAPPDATA "Programs\Antigravity\resources\app.asar"),
    (Join-Path $env:ProgramFiles "Antigravity\resources\app.asar"),
    $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} "Antigravity\resources\app.asar" })
)

$AsarPath = ""
foreach ($p in ($Candidates | Where-Object { $_ })) {
    if (Test-Path $p) {
        $AsarPath = $p
        break
    }
}

if (-not $AsarPath) {
    Write-Host " Antigravity não encontrado automaticamente nas pastas padrão." -ForegroundColor Yellow
    $AsarPath = Read-Host "Digite o caminho completo para o arquivo app.asar"
    if (-not (Test-Path $AsarPath)) {
        Write-Host " Arquivo não encontrado: $AsarPath" -ForegroundColor Red
        exit 1
    }
}

Write-Host " Antigravity localizado em: $AsarPath" -ForegroundColor Green

if (Get-Process -Name "Antigravity" -ErrorAction SilentlyContinue) {
    Write-Error "Feche o Antigravity antes de aplicar a tradução."
    exit 1
}

# 3. Criar pasta e sincronizar
Write-Host " Configurando arquivos permanentes em $ConfigI18nDir..." -ForegroundColor Cyan
if (-not (Test-Path $ConfigI18nDir)) {
    New-Item -ItemType Directory -Path $ConfigI18nDir -Force | Out-Null
}

Copy-Item (Join-Path $ScriptDir "i18n-pt-br.js") (Join-Path $ConfigI18nDir "i18n-pt-br.js") -Force
Copy-Item (Join-Path $ScriptDir "patch-asar.js") (Join-Path $ConfigI18nDir "patch-asar.js") -Force

# 4. Executar patch
Write-Host " Aplicando tradução no app.asar..." -ForegroundColor Cyan
& node (Join-Path $ConfigI18nDir "patch-asar.js") "--asar=$AsarPath"
if ($LASTEXITCODE -ne 0) {
    Write-Error "O patcher falhou (código $LASTEXITCODE). Nenhum sucesso será anunciado."
    exit 1
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host " Tradução aplicada com sucesso no Windows!" -ForegroundColor Green
Write-Host "Abra ou reinicie o Antigravity para aproveitar a interface em Português." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
