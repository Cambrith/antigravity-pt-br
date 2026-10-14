# Guia de Resolução de Problemas (Troubleshooting) & FAQ

---

## ❓ Perguntas Frequentes & Soluções

### 1. O Antigravity foi atualizado e voltou a ficar em inglês. O que fazer?
- **No Linux**: Se você usa o launcher configurado em `~/.local/bin/antigravity`, a tradução é re-aplicada automaticamente ao abrir o app. Caso contrário, basta rodar `./install.sh` ou:
  ```bash
  node ~/.config/Antigravity/i18n/patch-asar.js --force
  ```
- **No Windows**:
  ```powershell
  .\install.ps1
  ```
- **No macOS**:
  ```bash
  ./install-macos.sh
  ```

---

### 2. Erro de permissão ao rodar o script no Linux ou macOS
Se receber `Permission denied`:
```bash
chmod +x install.sh install-macos.sh patch-asar.js launcher/antigravity-launcher.sh
./install.sh
```

---

### 3. Erro no PowerShell do Windows: "A execução de scripts foi desabilitada neste sistema"
Por padrão de segurança, o Windows bloqueia a execução de scripts externos. Execute este comando antes de rodar o instalador:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install.ps1
```

---

### 4. Como restaurar o arquivo original (Desinstalar a tradução)?
O patcher salva automaticamente um backup do arquivo não modificado com o nome `app.asar.bak-original`.
Para restaurar manualmente:

- **Linux**:
  ```bash
  cp ~/.local/opt/antigravity/resources/app.asar.bak-original ~/.local/opt/antigravity/resources/app.asar
  ```
- **macOS**:
  ```bash
  cp "/Applications/Antigravity.app/Contents/Resources/app.asar.bak-original" "/Applications/Antigravity.app/Contents/Resources/app.asar"
  ```
- **Windows**:
  ```powershell
  Copy-Item "$env:LOCALAPPDATA\Programs\antigravity\resources\app.asar.bak-original" "$env:LOCALAPPDATA\Programs\antigravity\resources\app.asar" -Force
  ```
Ou use os scripts utilitários `scripts/uninstall.sh` e `scripts/uninstall.ps1`.

---

### 5. Node.js não encontrado
O projeto requer o runtime do Node.js (versão 18 ou superior):
- **Linux (Debian/Ubuntu)**: `sudo apt update && sudo apt install nodejs`
- **Linux (Fedora)**: `sudo dnf install nodejs`
- **Linux (Arch)**: `sudo pacman -S nodejs`
- **ChromeOS**: No terminal do Crostini: `sudo apt update && sudo apt install nodejs`
- **macOS**: `brew install node` ou baixe em [nodejs.org](https://nodejs.org)
- **Windows**: Baixe o instalador oficial em [nodejs.org](https://nodejs.org)
