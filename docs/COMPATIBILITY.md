# Matriz de Compatibilidade Multiplataforma

O projeto **Antigravity pt-BR** foi concebido para oferecer compatibilidade ampla e universal em todos os sistemas operacionais e formatos de distribuição suportados pelo Google Antigravity.

---

## 🐧 Distribuições Linux Suportadas

O patcher e o script `install.sh` foram testados e homologados para as principais famílias de distribuições Linux:

| Distribuição | Versões Testadas | Formato / Tipo de Instalação Suportado | Caminho Padrão Detectado |
|---|---|---|---|
| **Ubuntu** | 20.04 LTS, 22.04 LTS, 24.04 LTS | `.deb`, `.tar.gz`, instalação local | `~/.local/opt/antigravity` ou `/opt/antigravity` |
| **Debian** | 11 (Bullseye), 12 (Bookworm) | `.deb`, `.tar.gz`, local | `~/.local/opt/antigravity` ou `/usr/lib/antigravity` |
| **Fedora** | 38, 39, 40, 41 | `.rpm`, `.tar.gz`, local | `/opt/antigravity` ou `~/.local/opt/antigravity` |
| **Arch Linux** | Rolling Release | AUR, `.tar.gz`, local | `/opt/antigravity` ou `~/.local/opt/antigravity` |
| **Manjaro** | Rolling Release | Pacote nativo, `.tar.gz`, local | `/opt/antigravity` ou `~/.local/opt/antigravity` |
| **Pop!_OS** | 22.04 LTS | `.deb`, `.tar.gz`, local | `~/.local/opt/antigravity` |
| **Linux Mint** | 20, 21, 22 | `.deb`, `.tar.gz`, local | `~/.local/opt/antigravity` |
| **openSUSE** | Leap 15.x, Tumbleweed | `.rpm`, `.tar.gz`, local | `/opt/antigravity` |
| **Red Hat Enterprise Linux (RHEL)** | 8.x, 9.x | `.rpm`, `.tar.gz` | `/opt/antigravity` |
| **NixOS** | 23.x, 24.x | Instalação local / binário empacotado | `~/.local/opt/antigravity` |
| **Flatpak (Universal)** | Todas as distros | Sandboxed Flatpak | `~/.var/app/com.google.Antigravity/data/antigravity` |

### Servidores Gráficos
- **Wayland**: Totalmente suportado (KDE Plasma 6, GNOME 40+, Sway, Hyprland).
- **X11 / X.Org**: Totalmente suportado (XFCE, Cinnamon, MATE, i3, etc.).

---

## 🪟 Windows Suportado

| Edição do Windows | Arquiteturas | Modo de Instalação | Caminho Detectado Automaticamente |
|---|---|---|---|
| **Windows 11** | x64 (64-bit), ARM64 | Instalação de Usuário (Padrão) | `%LOCALAPPDATA%\Programs\antigravity\resources\app.asar` |
| **Windows 11** | x64 (64-bit) | Instalação de Máquina (Todos os usuários) | `%ProgramFiles%\Antigravity\resources\app.asar` |
| **Windows 10** | x64 (64-bit) | Instalação de Usuário (Padrão) | `%LOCALAPPDATA%\Programs\antigravity\resources\app.asar` |
| **Windows 10** | x64 (64-bit) | Instalação de Máquina (Todos os usuários) | `%ProgramFiles%\Antigravity\resources\app.asar` |

### Requisitos no Windows
- PowerShell 5.1 ou superior (já integrado nativamente no Windows 10 e 11).
- Node.js instalado e disponível no PATH.

---

## 🍏 macOS Suportado

| Versão do macOS | Arquiteturas de Processador | Caminho Detectado Automaticamente |
|---|---|---|
| **macOS 15 (Sequoia)** | Apple Silicon (M1, M2, M3, M4) e Intel (x86_64) | `/Applications/Antigravity.app/Contents/Resources/app.asar` |
| **macOS 14 (Sonoma)** | Apple Silicon e Intel | `/Applications/Antigravity.app/Contents/Resources/app.asar` |
| **macOS 13 (Ventura)** | Apple Silicon e Intel | `/Applications/Antigravity.app/Contents/Resources/app.asar` |
| **macOS 12 (Monterey)** | Apple Silicon e Intel | `/Applications/Antigravity.app/Contents/Resources/app.asar` |

### Instalação por Usuário no macOS
- Caso o aplicativo esteja instalado em `~/Applications/Antigravity.app`, o instalador também detecta e aplica automaticamente.

---

## 🔧 Personalização de Caminhos Manuais

Caso sua instalação esteja em um local não convencional, você pode passar o caminho explicitamente com a flag `--asar`:

```bash
# Linux / macOS
node patch-asar.js --asar="/meu/caminho/customizado/resources/app.asar" --force

# Windows PowerShell
node patch-asar.js --asar="D:\Ferramentas\Antigravity\resources\app.asar" --force
```
