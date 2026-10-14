# Matriz Completa de Compatibilidade Multiplataforma

O **Antigravity pt-BR** opera de forma **100% agnóstica a distribuições Linux, gerenciadores de pacotes ou ambientes gráficos**.

---

## 🧭 Índice Rápido de Categorias

- [1. ChromeOS e Sistemas Derivados (Crostini)](#1-chromeos-e-sistemas-derivados-crostini) (6 sistemas)
- [2. Família Debian e Derivados](#2-família-debian-e-derivados) (72 sistemas)
- [3. Família Ubuntu e Sabores Oficiais](#3-família-ubuntu-e-sabores-oficiais) (30 sistemas)
- [4. Família Red Hat, Fedora, SUSE e RPM](#4-família-red-hat-fedora-suse-e-rpm) (41 sistemas)
- [5. Família Arch Linux e Derivados](#5-família-arch-linux-e-derivados) (24 sistemas)
- [6. Família Slackware e Derivados Leves](#6-família-slackware-e-derivados-leves) (13 sistemas)
- [7. Família Gentoo, Void e Source-Based](#7-família-gentoo-void-e-source-based) (29 sistemas)
- [8. Independentes Modernas](#8-independentes-modernas) (5 sistemas)
- [9. Segurança Ofensiva, Forense e Privacidade](#9-segurança-ofensiva-forense-e-privacidade) (48 sistemas)
- [10. Jogos, Emulação e Multimídia](#10-jogos-emulação-e-multimídia) (37 sistemas)
- [11. Servidores, Virtualização, Nuvem e Roteadores](#11-servidores-virtualização-nuvem-e-roteadores) (28 sistemas)
- [12. Sistemas para Dispositivos Móveis e ARM](#12-sistemas-para-dispositivos-móveis-e-arm) (20 sistemas)
- [13. Distribuições Históricas e Descontinuadas](#13-distribuições-históricas-e-descontinuadas) (33 sistemas)
- [Outros Sistemas: Windows e macOS](#-outros-sistemas-operacionais-windows-e-macos)

> 💡 **Sem repetições**: Cada uma das **386 distribuições** abaixo aparece em **apenas uma única categoria canônica**, permitindo busca rápida e navegação limpa.

---

## 🐧 Como o Antigravity funciona em qualquer Linux?

O Google Antigravity no Linux segue a especificação padrão do ecossistema Electron:
1. **Estrutura de Arquivos Padrão**: Os arquivos principais ficam em `resources/app.asar` (em `/opt/antigravity`, `~/.local/opt/antigravity` ou no contêiner Flatpak em `~/.var/app/com.google.Antigravity/`).
2. **Persistência XDG**: O arquivo mestre é armazenado com segurança em `~/.config/Antigravity/i18n/`.

Por utilizar Node.js nativo e manipular o arquivo ASAR diretamente, o patcher é universal.

---

### 1. ChromeOS e Sistemas Derivados (Crostini)

> ⚡ **Como rodar no ChromeOS / ChromeOS Flex (via Crostini)**:
> 1. Ative o Linux nas Configurações do ChromeOS (*Avançado > Desenvolvedores > Ambiente Linux Crostini*).
> 2. Abra o terminal do Linux e instale o Antigravity.
> 3. Execute `./install.sh` no repositório clonado.

`ChromeOS` • `ChromeOS Flex` • `ChromiumOS` • `CloudReady` • `FydeOS` • `Neverware CloudReady`

---

### 2. Família Debian e Derivados

`4MLinux` • `AfagOS` • `AgarimOS` • `Akira` • `AnduinOS` • `antiX` • `Asmi` • `Austrumi` • `BRGV-OS` • `BunsenLabs` • `CROWZ` • `Crunchbangplusplus` • `Damn Small Linux` • `Debian` • `Devuan` • `Duff Linux` • `EasyOS` • `Elive` • `Emmabuntüs` • `Endless OS` • `Fatdog64` • `Feren OS` • `Finnix` • `FlickOS` • `FLOPPINUX` • `FunOS` • `gabeeOSLinux` • `GeckoLinux` • `Glacia OS` • `gNewSense` • `HoopoeLinux` • `Hos OS` • `Insanely Small Linux` • `KANOTIX` • `Kawaiintu` • `KLV-Airedale` • `Knoppix` • `Linoutrox` • `Linux 95` • `Linux Kamarada` • `Linux KDu` • `Linuxfx` • `MiniOS` • `MX Linux` • `NebiOS` • `Netrunner` • `Noid` • `Odyssey` • `Pardus` • `Pearl` • `Peropesis` • `PureOS` • `Q4OS` • `Quarkos` • `Rhino` • `Shift OS` • `siduction` • `Spaced` • `SparkyLinux` • `SpiralLinux` • `Spirit OS` • `Super Lite` • `Trisquel` • `Vanilla Dpup` • `Vantum` • `Vendefoul Wolf` • `VolnOS` • `Voyager` • `Vuu-do` • `wattOS` • `Winux` • `XXRI OS Lite`

---

### 3. Família Ubuntu e Sabores Oficiais

`Accessible-Coconut` • `ACIAH-Linux` • `Bodhi Linux` • `Deepin` • `Edubuntu` • `elementary OS` • `KDE neon` • `Kubuntu` • `Linux Lite` • `Linux Mint` • `Linux Mint Debian Edition (LMDE)` • `Lubuntu` • `Nitrux` • `Peppermint OS` • `Pop!_OS` • `Ubuntu` • `Ubuntu Budgie` • `Ubuntu Cinnamon` • `Ubuntu Kylin` • `Ubuntu MATE` • `Ubuntu Server` • `Ubuntu Studio` • `Ubuntu Sway` • `Ubuntu Unity` • `UbuntuDDE` • `Xubuntu` • `Zorin OS` • `Zorin OS Core` • `Zorin OS Lite` • `Zorin OS Pro`

---

### 4. Família Red Hat, Fedora, SUSE e RPM

`Aeon Desktop` • `AlmaLinux` • `AlmaLinux Kitten` • `ALT Linux` • `Amazon Linux` • `Anolis OS` • `Astra Linux` • `CentOS Stream` • `ClearOS` • `EuroLinux` • `Fedora` • `Fedora CoreOS` • `Fedora Design Suite` • `Fedora IoT` • `Fedora KDE` • `Fedora Kinoite` • `Fedora Server` • `Fedora Silverblue` • `Fedora Sway` • `Fedora Workstation` • `Kalpa Desktop` • `Mageia` • `MIRACLE Linux` • `openEuler` • `openKylin` • `OpenMandriva Lx` • `openRuyi` • `openSUSE Leap` • `openSUSE MicroOS` • `openSUSE Tumbleweed` • `Oracle Linux` • `Oracle Linux Server` • `Oreon` • `PCLinuxOS` • `Red Hat Enterprise Linux (RHEL)` • `Rocky Linux` • `Rocky Linux Sigma` • `ROSA` • `SUSE Linux Enterprise Desktop (SLED)` • `SUSE Linux Enterprise Server (SLES)` • `Ultramarine Linux`

---

### 5. Família Arch Linux e Derivados

`AbeirOS` • `Arch Linux` • `ArchBang` • `Archcraft` • `ArchEX` • `Archium` • `Archman` • `ArcoLinux` • `Artix Linux` • `BigLinux` • `CachyOS` • `EndeavourOS` • `Garuda Linux` • `Hyperbola GNU/Linux-libre` • `LangitKetujuh OS` • `LazyLinux` • `LyargoOS` • `Mabox Linux` • `Manjaro` • `Neko-Void` • `Obarun` • `Parabola GNU/Linux-libre` • `RebornOS` • `TROMjaro`

---

### 6. Família Slackware e Derivados Leves

`Absolute Linux` • `Porteus` • `PorteuX` • `Puppy Linux` • `Salix` • `Slackel` • `Slackware` • `Slax` • `SliTaz` • `Tiny Core Linux` • `Tiny Desktop Linux` • `VectorLinux` • `Zenwalk`

---

### 7. Família Gentoo, Void e Source-Based

`Adélie Linux` • `AerynOS` • `Calculate Linux` • `Chimera Linux` • `CRUX` • `Dragora` • `Exherbo` • `Funtoo` • `Gentoo Linux` • `GNU Guix System` • `GoboLinux` • `Kwort` • `Linux From Scratch (LFS)` • `Lunar Linux` • `Macaroni OS` • `matrixOS` • `MocaccinoOS` • `NixOS` • `NuTyX` • `paldo` • `PantherX OS` • `Pisi Linux` • `PLD Linux` • `Redcore Linux` • `Source Mage` • `T2 SDE` • `Tucana` • `Venom Linux` • `Void Linux`

---

### 8. Independentes Modernas

`Alpine Linux` • `Clear Linux` • `KaOS` • `openmamba` • `Solus`

---

### 9. Segurança Ofensiva, Forense e Privacidade

`Almighty` • `Anonym-OS` • `AnuBitux` • `Archanoxy` • `Athena OS` • `B1ackOS` • `BackBox` • `BlackArch Linux` • `CAINE` • `CarotOS` • `Cerberix` • `Clear NDR` • `Clonezilla Live` • `Cyrethium` • `DEFT Linux` • `Dr.Parted Live` • `Gnoppix` • `GParted Live` • `HydraPWK` • `JRescue` • `Kali Linux` • `Kicksecure` • `Kodachi` • `Live Raizo` • `Malbian` • `Mariposa Rescue Disk` • `Maze` • `MoltOS` • `Netdeep Secure` • `NoID Privacy` • `NST` • `Open Secure-K OS` • `Parrot OS` • `Pentoo` • `PH4NTXM` • `Qubes OS` • `Rescuezilla` • `SageOS` • `Santoku Linux` • `Securonis` • `ShredOS` • `Smoothwall Express` • `SystemRescue` • `T-PHANTOM` • `Tails` • `Tsurugi` • `Whonix` • `Wifislax`

---

### 10. Jogos, Emulação e Multimídia

`ArtistX` • `AV Linux` • `Batocera.linux` • `Bazzite` • `Caelaris` • `ChimeraOS` • `CobaltX` • `Commodore OS` • `CoreELEC` • `Daphile` • `DragonOS` • `Drauger OS` • `Dynebolic` • `GLF OS` • `GlouOS` • `JELOS` • `KXStudio` • `Lakka` • `LibraZiK` • `LibreELEC` • `LinuxTV` • `ludora` • `MODICIA` • `NawaOS` • `Nobara` • `OSMC` • `PikaOS` • `Quirinux` • `Recalbox` • `ReignOS` • `ROCKNIX` • `ShivaOS` • `SteamFork` • `SteamOS` • `Volumio` • `XBian` • `XIVA Studio`

---

### 11. Servidores, Virtualização, Nuvem e Roteadores

`BlueOnyx` • `Cix` • `EasyNAS` • `eLxr` • `FreedomBox` • `Gooroom Platform` • `Hadron` • `IPFire` • `Kairos` • `MinisCloud OS` • `NethSecurity` • `NethServer` • `openmediavault` • `OpenWrt` • `OPNsense` • `OviOS` • `PBXware` • `pfSense` • `Proxmox Backup Server` • `Proxmox VE` • `Qlustar` • `SME Server` • `StartOS` • `VyOS` • `XCP-ng` • `YunoHost` • `Zentyal Server` • `ZimaOS`

---

### 12. Sistemas para Dispositivos Móveis e ARM

`/e/OS` • `Android-x86` • `Apertis` • `Armbian` • `Asahi Linux` • `Bliss OS` • `BredOS` • `DietPi` • `Droidian` • `Fedora Asahi Remix` • `iodéOS` • `LineageOS` • `Mobian` • `Murena` • `OpenHarmony` • `postmarketOS` • `Radxa OS` • `Raspberry Pi OS` • `Ubuntu Lomiri` • `Ubuntu Touch`

---

### 13. Distribuições Históricas e Descontinuadas

`AbulÉdu` • `Antergos` • `Ark Linux` • `Caldera OpenLinux` • `CentOS` • `Chakra Linux` • `Corel Linux` • `CrunchBang Linux` • `Dreamlinux` • `Elive (versões antigas)` • `Elx` • `Freespire` • `gOS` • `Libranet` • `Linspire` • `Lycoris Desktop/LX` • `Mandrake Linux` • `Mandriva Linux` • `MEPIS` • `Musix` • `Oracle Unbreakable Linux` • `Pardus 2008` • `Pardus 2011` • `Sabayon Linux` • `Scientific Linux` • `SimplyMEPIS` • `SolusOS` • `Storm Linux` • `TurboLinux` • `Ututo` • `Xandros` • `Yellow Dog Linux` • `Yoper`

---

## 🪟 Outros Sistemas Operacionais: Windows e macOS

### Windows
* **Windows 11** e **Windows 10** (64-bit e ARM64).
* Caminho padrão: `%LOCALAPPDATA%\Programs\antigravity\resources\app.asar`.
* Instalação simples via PowerShell: `.\install.ps1`.

### macOS
* **macOS 15 (Sequoia)**, **14 (Sonoma)**, **13 (Ventura)** e **12 (Monterey)**.
* Compatível nativamente com **Apple Silicon** (M1, M2, M3, M4) e **Intel (x86_64)**.
* Caminho padrão: `/Applications/Antigravity.app/Contents/Resources/app.asar`.
* Instalação via Terminal: `./install-macos.sh`.
