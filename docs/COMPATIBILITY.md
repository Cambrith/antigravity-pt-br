# Compatibilidade

O **Antigravity pt-BR** funciona no **Linux**, **ChromeOS**, **Windows** e **macOS**.

O projeto é desenvolvido e usado no dia a dia no Linux. Os testes automáticos rodam em Linux e Windows (GitHub Actions).

---

## 🐧 Linux

O patcher usa Node.js e manipula o arquivo ASAR do Electron diretamente, então não depende da distribuição.

- **Onde fica o ASAR**: `resources/app.asar`, em `/opt/antigravity`, `~/.local/opt/antigravity` ou no Flatpak em `~/.var/app/com.google.Antigravity/`.
- **Onde fica a tradução**: `~/.config/Antigravity/i18n/`.
- **Instalação**:

```bash
./install.sh
```

---

## 🌐 ChromeOS (Crostini)

Funciona pelo ambiente Linux oficial do ChromeOS.

1. Ative o ambiente Linux nas Configurações do ChromeOS (*Avançado > Desenvolvedores > Ambiente de desenvolvimento Linux*).
2. Instale o Antigravity pelo **Terminal** do ChromeOS.
3. Execute `./install.sh` no repositório clonado.

---

## 🪟 Windows

- **Versões**: Windows 10 e 11.
- **Onde fica o ASAR**: `%LOCALAPPDATA%\Programs\antigravity\resources\app.asar` ou `C:\Program Files\antigravity\resources\app.asar`.
- **Onde fica a tradução**: `%APPDATA%\Antigravity\i18n\i18n-pt-br.js`.
- **Instalação via PowerShell**:

```powershell
.\install.ps1
```

---

## 🍏 macOS

- **Onde fica o ASAR**: `/Applications/Antigravity.app/Contents/Resources/app.asar`.
- **Onde fica a tradução**: `~/Library/Application Support/Antigravity/i18n/i18n-pt-br.js`.
- **Instalação via Terminal**:

```bash
./install-macos.sh
```
