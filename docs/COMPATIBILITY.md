# Matriz Completa de Compatibilidade Multiplataforma

O **Antigravity pt-BR** foi projetado com engenharia multiplataforma nativa para operar de maneira transparente no **Linux**, **ChromeOS**, **Windows** e **macOS**.

---

## 🧭 Índice Geral de Plataformas

- [🌐 ChromeOS e Sistemas Derivados (Crostini)](#-chromeos-e-sistemas-derivados-crostini) (6 sistemas)
- [🐧 Linux (379 Distribuições Catalogadas por Família Técnica)](#-linux-distribuicoes-por-familia-tecnica):
  - [1. Família Debian e Derivados Diretos](#1-familia-debian-e-derivados-diretos) (123 distribuições)
  - [2. Família Ubuntu e Sabores Oficiais / Derivados](#2-familia-ubuntu-e-sabores-oficiais--derivados) (75 distribuições)
  - [3. Família Red Hat, Fedora, SUSE e RPM](#3-familia-red-hat-fedora-suse-e-rpm) (70 distribuições)
  - [4. Família Arch Linux e Derivados](#4-familia-arch-linux-e-derivados) (29 distribuições)
  - [5. Família Slackware e Derivados Leves](#5-familia-slackware-e-derivados-leves) (25 distribuições)
  - [6. Família Gentoo, Void e Baseadas em Código-Fonte](#6-familia-gentoo-void-e-baseadas-em-codigo-fonte) (25 distribuições)
  - [7. Distribuições Independentes e Outras Famílias](#7-distribuies-independentes-e-outras-familias) (48 distribuições)
- [🪟 Windows (10 e 11)](#-microsoft-windows)
- [🍏 macOS (Apple Silicon e Intel)](#-apple-macos)

> 💡 **Estrutura Estritamente por Famílias Técnicas (Sem Repetições)**:
> Cada uma das **395 distribuições Linux** e dos **6 sistemas ChromeOS** listados abaixo pertence a **apenas uma única categoria canônica**, sem duplicatas e sem divisões artificiais por perfis de uso (jogos, segurança e servidores encontram-se agrupados em sua base de origem real).

---

## 🌐 ChromeOS e Sistemas Derivados (Crostini)

O ChromeOS é suportado como plataforma de primeira classe através do ambiente de desenvolvimento Linux oficial do Google (*Crostini*), executando contêineres otimizados com integração direta à interface e ao gerenciador de janelas do sistema operacional.

> ⚡ **Como rodar no ChromeOS / ChromeOS Flex (via Crostini)**:
> 1. Ative o suporte a Linux nas Configurações do ChromeOS (*Avançado > Desenvolvedores > Ambiente de desenvolvimento Linux*).
> 2. Abra o aplicativo **Terminal** do ChromeOS e instale o Antigravity.
> 3. Execute `./install.sh` no repositório clonado.

`ChromeOS` • `ChromeOS Flex` • `ChromiumOS` • `CloudReady` • `FydeOS` • `Neverware CloudReady`

---

## 🐧 Linux (Distribuições por Família Técnica)

O Google Antigravity no Linux segue a especificação padrão do ecossistema Electron:
1. **Estrutura de Arquivos Padrão**: Os arquivos principais ficam em `resources/app.asar` (em `/opt/antigravity`, `~/.local/opt/antigravity` ou no contêiner Flatpak em `~/.var/app/com.google.Antigravity/`).
2. **Persistência XDG**: O arquivo mestre de tradução é armazenado com segurança em `~/.config/Antigravity/i18n/`.

Por utilizar Node.js nativo e manipular o arquivo ASAR diretamente, o patcher é universal em qualquer distribuição Linux.

### 1. Família Debian e Derivados Diretos

> 📦 **Gerenciadores de Pacotes**: `apt`, `dpkg`  
> Inclui distribuições derivadas diretamente do Debian estável, testing e unstable, contemplando desktops, estações forenses/segurança, servidores e sistemas embarcados da árvore Debian.

`AbeirOS` • `AfagOS` • `AgarimOS` • `Akira` • `Almighty` • `Anonym-OS` • `antiX` • `AnuBitux` • `Apertis` • `apk` • `Armbian` • `Astra Linux` • `AV Linux` • `B1ackOS` • `BRGV-OS` • `BunsenLabs` • `CarotOS` • `Cerberix` • `Cix` • `Clear NDR` • `Clonezilla Live` • `Corel Linux` • `CROWZ` • `CrunchBang Linux` • `Crunchbangplusplus` • `Cyrethium` • `Debian` • `Devuan` • `DietPi` • `dpkg` • `Dr.Parted Live` • `Dreamlinux` • `Droidian` • `Duff Linux` • `Dynebolic` • `Elive` • `Elive (versões antigas)` • `eLxr` • `emerge` • `Emmabuntüs` • `eopkg` • `Finnix` • `FreedomBox` • `gabeeOSLinux` • `gNewSense` • `Gnoppix` • `Gooroom Platform` • `GParted Live` • `guix` • `Hadron` • `HydraPWK` • `JRescue` • `Kali Linux` • `KANOTIX` • `Kicksecure` • `Knoppix` • `Libranet` • `LibraZiK` • `Linux 95` • `Linux Mint Debian Edition (LMDE)` • `Live Raizo` • `Malbian` • `Mariposa Rescue Disk` • `Maze` • `MEPIS` • `MinisCloud OS` • `Mobian` • `MoltOS` • `Musix` • `MX Linux` • `nix` • `Noid` • `NoID Privacy` • `Odyssey` • `Open Secure-K OS` • `openmediavault` • `OSMC` • `Pardus` • `Parrot OS` • `paru` • `PH4NTXM` • `pisi` • `pkgtool` • `portage` • `Proxmox Backup Server` • `Proxmox VE` • `PureOS` • `Q4OS` • `Quirinux` • `Radxa OS` • `Raspberry Pi OS` • `rpm` • `SageOS` • `Securonis` • `siduction` • `SimplyMEPIS` • `slackpkg` • `snap` • `SolusOS` • `Spaced` • `SparkyLinux` • `SpiralLinux` • `Spirit OS` • `StartOS` • `Storm Linux` • `T-PHANTOM` • `Tails` • `Trisquel` • `Vantum` • `Vendefoul Wolf` • `Volumio` • `Vuu-do` • `VyOS` • `wattOS` • `Whonix` • `Xandros` • `XBian` • `xbps` • `XXRI OS Lite` • `yay` • `YunoHost` • `ZimaOS` • `zypper`

---

### 2. Família Ubuntu e Sabores Oficiais / Derivados

> 📦 **Gerenciadores de Pacotes**: `apt`, `snap`  
> Inclui os sabores oficiais do Ubuntu, distribuições baseadas em Ubuntu LTS (como Mint, Pop!_OS e Zorin) e sistemas especializados criados sobre a base Canonical.

`AbulÉdu` • `Accessible-Coconut` • `ACIAH-Linux` • `AnduinOS` • `ArtistX` • `Asmi` • `BackBox` • `Bodhi Linux` • `CAINE` • `Commodore OS` • `Deepin` • `DEFT Linux` • `DragonOS` • `Drauger OS` • `Edubuntu` • `elementary OS` • `Endless OS` • `Feren OS` • `FlickOS` • `Freespire` • `FunOS` • `Glacia OS` • `gOS` • `HoopoeLinux` • `Hos OS` • `Kawaiintu` • `KDE neon` • `Kodachi` • `Kubuntu` • `KXStudio` • `Linspire` • `Linux Kamarada` • `Linux KDu` • `Linux Lite` • `Linux Mint` • `Linuxfx` • `LinuxTV` • `Lubuntu` • `MODICIA` • `NebiOS` • `Netrunner` • `Nitrux` • `Pearl` • `Peppermint OS` • `PikaOS` • `Pop!_OS` • `Qlustar` • `Quarkos` • `Rescuezilla` • `Rhino` • `Santoku Linux` • `Shift OS` • `Tsurugi` • `Ubuntu` • `Ubuntu Budgie` • `Ubuntu Cinnamon` • `Ubuntu Kylin` • `Ubuntu Lomiri` • `Ubuntu MATE` • `Ubuntu Server` • `Ubuntu Studio` • `Ubuntu Sway` • `Ubuntu Touch` • `Ubuntu Unity` • `UbuntuDDE` • `VolnOS` • `Voyager` • `Winux` • `XIVA Studio` • `Xubuntu` • `Zentyal Server` • `Zorin OS` • `Zorin OS Core` • `Zorin OS Lite` • `Zorin OS Pro`

---

### 3. Família Red Hat, Fedora, SUSE e RPM

> 📦 **Gerenciadores de Pacotes**: `dnf`, `rpm`, `zypper`  
> Reúne toda a linhagem empresarial e comunitária baseada em pacotes RPM: Fedora, RHEL, CentOS, AlmaLinux, Rocky Linux, openSUSE, Mageia e derivados.

`Aeon Desktop` • `AlmaLinux` • `AlmaLinux Kitten` • `ALT Linux` • `Amazon Linux` • `Anolis OS` • `Ark Linux` • `Bazzite` • `BlueOnyx` • `Caelaris` • `Caldera OpenLinux` • `CentOS` • `CentOS Stream` • `ClearOS` • `CobaltX` • `EasyNAS` • `Elx` • `EuroLinux` • `Fedora` • `Fedora Asahi Remix` • `Fedora CoreOS` • `Fedora Design Suite` • `Fedora IoT` • `Fedora KDE` • `Fedora Kinoite` • `Fedora Server` • `Fedora Silverblue` • `Fedora Sway` • `Fedora Workstation` • `GeckoLinux` • `GLF OS` • `GlouOS` • `Kalpa Desktop` • `ludora` • `Lycoris Desktop/LX` • `Mageia` • `Mandrake Linux` • `Mandriva Linux` • `MIRACLE Linux` • `NawaOS` • `Netdeep Secure` • `NethServer` • `Nobara` • `NST` • `openEuler` • `openKylin` • `OpenMandriva Lx` • `openSUSE Leap` • `openSUSE MicroOS` • `openSUSE Tumbleweed` • `Oracle Linux` • `Oracle Linux Server` • `Oracle Unbreakable Linux` • `Oreon` • `PCLinuxOS` • `Qubes OS` • `Red Hat Enterprise Linux (RHEL)` • `ReignOS` • `Rocky Linux` • `Rocky Linux Sigma` • `ROSA` • `Scientific Linux` • `ShivaOS` • `SME Server` • `SUSE Linux Enterprise Desktop (SLED)` • `SUSE Linux Enterprise Server (SLES)` • `TurboLinux` • `Ultramarine Linux` • `XCP-ng` • `Yellow Dog Linux`

---

### 4. Família Arch Linux e Derivados

> 📦 **Gerenciadores de Pacotes**: `pacman`, `yay`, `paru`  
> Distribuições *rolling release* baseadas na arquitetura e filosofia do Arch Linux, incluindo sistemas para desktop, jogos (como SteamOS) e segurança avançada.

`Antergos` • `Arch Linux` • `Archanoxy` • `ArchBang` • `Archcraft` • `ArchEX` • `Archium` • `Archman` • `ArcoLinux` • `Artix Linux` • `Asahi Linux` • `Athena OS` • `BigLinux` • `BlackArch Linux` • `BredOS` • `CachyOS` • `Chakra Linux` • `ChimeraOS` • `EndeavourOS` • `Garuda Linux` • `Hyperbola GNU/Linux-libre` • `Mabox Linux` • `Manjaro` • `Parabola GNU/Linux-libre` • `RebornOS` • `SteamFork` • `SteamOS` • `SystemRescue` • `TROMjaro`

---

### 5. Família Slackware e Derivados Leves

> 📦 **Gerenciadores de Pacotes**: `slackpkg`, `pkgtool`, scripts utilitários  
> A linhagem Linux mais tradicional e suas variantes modernas focadas em estabilidade, minimalismo e sistemas *live* ultraleves.

`4MLinux` • `Absolute Linux` • `Austrumi` • `Damn Small Linux` • `EasyOS` • `Fatdog64` • `FLOPPINUX` • `Insanely Small Linux` • `KLV-Airedale` • `Linoutrox` • `MiniOS` • `Peropesis` • `Porteus` • `PorteuX` • `Puppy Linux` • `Salix` • `Slackel` • `Slackware` • `Slax` • `Super Lite` • `Tiny Core Linux` • `Vanilla Dpup` • `VectorLinux` • `Wifislax` • `Zenwalk`

---

### 6. Família Gentoo, Void e Baseadas em Código-Fonte

> 📦 **Gerenciadores de Pacotes**: `portage` (`emerge`), `xbps`, compilação direta  
> Distribuições centradas em compilação sob medida a partir do código-fonte, arquiteturas independentes como Void e sistemas avançados de alta performance.

`Adélie Linux` • `AerynOS` • `Calculate Linux` • `Chimera Linux` • `CRUX` • `Daphile` • `Exherbo` • `Funtoo` • `Gentoo Linux` • `GoboLinux` • `Linux From Scratch (LFS)` • `Lunar Linux` • `Macaroni OS` • `MocaccinoOS` • `Neko-Void` • `Obarun` • `PBXware` • `Pentoo` • `Redcore Linux` • `Sabayon Linux` • `Source Mage` • `T2 SDE` • `Ututo` • `Venom Linux` • `Void Linux`

---

### 7. Distribuições Independentes e Outras Famílias

> 📦 **Gerenciadores de Pacotes**: `apk`, `nix`, `guix`, `eopkg`, `pisi`, etc.  
> Sistemas operacionais construídos de forma autônoma sem herança direta das famílias anteriores (como Alpine, NixOS, GNU Guix, Solus e Clear Linux) e arquiteturas especializadas.

`Alpine Linux` • `Android-x86` • `Batocera.linux` • `Bliss OS` • `Clear Linux` • `CoreELEC` • `Dragora` • `GNU Guix System` • `iodéOS` • `IPFire` • `JELOS` • `Kairos` • `KaOS` • `Kwort` • `Lakka` • `LangitKetujuh OS` • `LazyLinux` • `LibreELEC` • `LineageOS` • `LyargoOS` • `matrixOS` • `Murena` • `NethSecurity` • `NixOS` • `NuTyX` • `OpenHarmony` • `openmamba` • `openRuyi` • `OpenWrt` • `OPNsense` • `OviOS` • `paldo` • `PantherX OS` • `Pardus 2008` • `Pardus 2011` • `pfSense` • `Pisi Linux` • `PLD Linux` • `postmarketOS` • `Recalbox` • `ROCKNIX` • `ShredOS` • `SliTaz` • `Smoothwall Express` • `Solus` • `Tiny Desktop Linux` • `Tucana` • `Yoper`

---

## 🪟 Microsoft Windows

- **Versões Homologadas**: Windows 11 e Windows 10 (Builds 19041+), arquiteturas x64 e ARM64.
- **Caminho Padrão do ASAR**: `%LOCALAPPDATA%\Programs\antigravity\resources\app.asar` ou `C:\Program Files\antigravity\resources\app.asar`.
- **Persistência de Tradução**: `%APPDATA%\Antigravity\i18n\i18n-pt-br.js`.
- **Instalação via PowerShell**:
```powershell
.\install.ps1
```

---

## 🍏 Apple macOS

- **Versões Homologadas**: macOS Sequoia (15), Sonoma (14), Ventura (13) e Monterey (12).
- **Arquiteturas Suportadas**: Apple Silicon (M1, M2, M3, M4) e Intel (x86_64).
- **Caminho Padrão do ASAR**: `/Applications/Antigravity.app/Contents/Resources/app.asar`.
- **Persistência de Tradução**: `~/Library/Application Support/Antigravity/i18n/i18n-pt-br.js`.
- **Instalação via Terminal**:
```bash
./install-macos.sh
```
