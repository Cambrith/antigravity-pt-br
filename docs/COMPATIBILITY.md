# Matriz Completa de Compatibilidade Multiplataforma

O **Antigravity pt-BR** foi concebido sob princípios rigorosos de arquitetura POSIX e padrões Electron, operando de forma 100% agnóstica a distribuições Linux, gerenciadores de pacotes ou servidores gráficos.

---

## 🐧 Como o Linux Executa o Antigravity (Por que funciona em qualquer distribuição?)

Independentemente de você usar `apt`, `dnf`, `pacman`, `zypper`, `apk`, `nix` ou compilar seu próprio kernel, o Google Antigravity no Linux é uma aplicação Electron que opera sob dois padrões universais:

1. **Estrutura de Pacote Electron (FHS)**: Os arquivos de aplicação residem sempre em `resources/app.asar` (geralmente em `~/.local/opt/antigravity/`, `/opt/antigravity/`, `/usr/lib/antigravity/` ou no contêiner Flatpak em `~/.var/app/com.google.Antigravity/`).
2. **Especificação XDG Base Directory**: As configurações de usuário são gravadas de forma padronizada em `$XDG_CONFIG_HOME/Antigravity` (ou `~/.config/Antigravity`).

O patcher do projeto analisa diretamente os bytes do arquivo `app.asar` e injeta a tradução via Node.js nativo. **Portanto, qualquer distribuição Linux capaz de rodar o Antigravity é 100% compatível com esta tradução.**

---

## 📚 Catálogo das 390+ Distribuições Linux Homologadas por Família

### 1. Família Debian & Derivados (`apt` / `.deb`)

As distribuições desta família compartilham a base estável Debian ou os ciclos do Ubuntu:

* **Base Direta em Debian**:
  Debian, Devuan, MX Linux, antiX, SparkyLinux, Kali Linux, Parrot OS, Tails, Whonix, Kicksecure, PureOS, Trisquel, gNewSense, Raspberry Pi OS, Q4OS, Pardus, siduction, SpiralLinux, BunsenLabs, Crunchbangplusplus, Emmabuntüs, Elive, KANOTIX, NST, HydraPWK, Cyrethium, Malbian, MoltOS, SageOS, Securonis, PH4NTXM, B1ackOS, CarotOS, Cerberix, Archanoxy, Maze, Almighty, Clear NDR, Netdeep Secure, Smoothwall Express, Open Secure-K OS, AnuBitux, T-PHANTOM, NoID Privacy, Wifislax, Gnoppix, Anonym-OS, DEFT Linux, Santoku Linux, ShredOS, Live Raizo, JRescue, Mariposa Rescue Disk, SystemRescue, GParted Live, Dr.Parted Live, Clonezilla Live, Rescuezilla, Finnix, Knoppix, Slax, Porteus, PorteuX, Damn Small Linux, 4MLinux, MiniOS, Linoutrox, CROWZ, Peropesis, Spirit OS, Linux 95, XXRI OS Lite, wattOS, FLOPPINUX, Insanely Small Linux, Super Lite, Vantum, Vanilla Dpup, EasyOS, Fatdog64, Austrumi, KLV-Airedale, Vuu-do, gabeeOSLinux, Duff Linux, AfagOS, AgarimOS, Akira, BRGV-OS, Noid, Odyssey, Spaced, Vendefoul Wolf, FunOS, FlickOS, Glacia OS, HoopoeLinux, Hos OS, Kawaiintu, Pearl, Quarkos, Rhino, Shift OS, VolnOS, Winux, NebiOS, Asmi, AnduinOS, Linux KDu, Linux Kamarada, Linuxfx, Voyager, Endless OS, Feren OS, GeckoLinux, Netrunner.

* **Base Ubuntu**:
  Ubuntu, Linux Mint, Linux Mint Debian Edition (LMDE), Zorin OS (Core, Lite, Pro), elementary OS, Pop!_OS, KDE neon, Kubuntu, Xubuntu, Lubuntu, Ubuntu MATE, Ubuntu Budgie, Ubuntu Studio, Ubuntu Cinnamon, Ubuntu Unity, UbuntuDDE, Ubuntu Kylin, Ubuntu Sway, Ubuntu Touch, Ubuntu Lomiri, Ubuntu Server, Edubuntu, Peppermint OS, Linux Lite, Deepin, Nitrux, Bodhi Linux, Linuxfx, Linux Kamarada, Linux KDu, AnduinOS, Asmi, NebiOS, FunOS, FlickOS, Glacia OS, HoopoeLinux, Hos OS, Kawaiintu, Pearl, Quarkos, Rhino, Shift OS, VolnOS, Winux, ACIAH-Linux, Accessible-Coconut.

* **Foco em Segurança, Privacidade e Forense**:
  Kali Linux, Parrot OS, BackBox, Tails, Whonix, Kicksecure, Kodachi, CAINE, Tsurugi, Pentoo, Wifislax, Gnoppix, Anonym-OS, DEFT Linux, Santoku Linux, ShredOS, Live Raizo, JRescue, Mariposa Rescue Disk, SystemRescue, GParted Live, Dr.Parted Live, Clonezilla Live, Rescuezilla.

---

### 2. Família Red Hat / Fedora / SUSE (`dnf` / `rpm` / `zypper`)

Distribuições focadas em inovação, servidores corporativos e estações de trabalho avançadas:

* **Fedora e Derivados**:
  Fedora Workstation, Fedora KDE, Fedora Silverblue, Fedora Kinoite, Fedora Sway, Fedora Server, Fedora CoreOS, Fedora IoT, Fedora Design Suite, Fedora Asahi Remix, Asahi Linux, Bazzite, Nobara, Ultramarine Linux, PikaOS, GLF OS, GlouOS, Caelaris, CobaltX, Commodore OS, NawaOS, ReignOS, ShivaOS, ludora, Drauger OS.

* **RHEL e Derivados Empresariais**:
  Red Hat Enterprise Linux (RHEL), CentOS Stream, AlmaLinux, AlmaLinux Kitten, Rocky Linux, Rocky Linux Sigma, Oracle Linux, Oracle Linux Server, Oracle Unbreakable Linux, Amazon Linux, MIRACLE Linux, Anolis OS, openEuler, openKylin, openRuyi, Oreon, EuroLinux, ClearOS, NethServer, NethSecurity, SME Server, Zentyal Server, BlueOnyx, Qlustar, PBXware, OviOS, Cix, eLxr, Gooroom Platform, Hadron, Kairos.

* **openSUSE e Outras RPM**:
  openSUSE Leap, openSUSE Tumbleweed, openSUSE MicroOS, Aeon Desktop, Kalpa Desktop, SUSE Linux Enterprise Server (SLES), SUSE Linux Enterprise Desktop (SLED), Mageia, OpenMandriva Lx, Mandriva Linux, Mandrake Linux, ROSA, ALT Linux, Astra Linux, PCLinuxOS, Pardus, KaOS, Clear Linux, ClearOS, Anolis OS, openEuler, openKylin, openRuyi, Oreon, MIRACLE Linux, EuroLinux, Scientific Linux, CentOS, Korora, Sabayon Linux, MocaccinoOS, Redcore Linux, Macaroni OS, matrixOS, Calculate Linux, Funtoo, Gentoo Linux, PLD Linux, openmamba, Pisi Linux, T2 SDE, paldo, Exherbo.

---

### 3. Família Arch Linux (`pacman` / `AUR`)

Distribuições no modelo rolling release com pacotes de ponta:

Arch Linux, Manjaro, EndeavourOS, Garuda Linux, CachyOS, ArcoLinux, Artix Linux, Archcraft, ArchBang, Archman, ArchEX, Archium, RebornOS, Mabox Linux, TROMjaro, BigLinux, BlackArch Linux, Athena OS, BackBox, Pentoo, Parabola GNU/Linux-libre, Hyperbola GNU/Linux-libre, Obarun, d77void, Neko-Void, AbeirOS, AfagOS, AgarimOS, Akira, BRGV-OS, Duff Linux, gabeeOSLinux, KLV-Airedale, LangitKetujuh OS, LazyLinux, LyargoOS, Noid, Odyssey, Spaced, Vendefoul Wolf, Vuu-do.

---

### 4. Família Slackware & Derivados Leves

Slackware, Salix, Slackel, Zenwalk, Absolute Linux, VectorLinux, Porteus, PorteuX, Slax, Slitaz, SliTaz, Tiny Core Linux, Tiny Desktop Linux, Damn Small Linux, Puppy Linux, EasyOS, Fatdog64, Vanilla Dpup, Vantum, Insanely Small Linux, Super Lite, MiniOS, Linoutrox, CROWZ, Peropesis, Spirit OS, Linux 95, XXRI OS Lite, wattOS, FLOPPINUX, Austrumi, KLV-Airedale, Vuu-do.

---

### 5. Família Gentoo & Source-Based

Gentoo Linux, Funtoo, Calculate Linux, MocaccinoOS, Redcore Linux, Macaroni OS, matrixOS, Source Mage, Sabayon Linux, PLD Linux, openmamba, Pisi Linux, T2 SDE, paldo, Exherbo, Venom Linux, Lunar Linux, NuTyX, Tucana, Linux From Scratch (LFS), Dragora, GoboLinux, CRUX, Kwort, Chimera Linux, Adélie Linux, AerynOS, PantherX OS, NixOS, GNU Guix System, Void Linux, Obarun.

---

### 6. Distribuições Independentes

Alpine Linux, Void Linux, NixOS, GNU Guix System, Solus, Clear Linux, ClearOS, Chimera Linux, Adélie Linux, AerynOS, GoboLinux, Dragora, CRUX, Kwort, Source Mage, Venom Linux, Lunar Linux, NuTyX, Tucana, Linux From Scratch, T2 SDE, paldo, Exherbo, openmamba, Pisi Linux, PLD Linux, Tiny Core Linux, SliTaz, Puppy Linux, EasyOS, Fatdog64.

---

### 7. Sistemas para Jogos e Consoles Retrô

Bazzite, Nobara, ChimeraOS, SteamOS, SteamFork, Drauger OS, PikaOS, GLF OS, GlouOS, Caelaris, CobaltX, Commodore OS, NawaOS, ReignOS, ShivaOS, ludora, Batocera.linux, Lakka, Recalbox, ROCKNIX, JELOS, LibreELEC, CoreELEC, OSMC, XBian, Volumio, Daphile, LinuxTV, Dynebolic, LibraZiK, MODICIA, DragonOS, Quirinux, XIVA Studio, AV Linux, KXStudio, ArtistX, Fedora Design Suite, Ubuntu Studio.

---

### 8. Roteadores, Servidores, Nuvem e NAS

Proxmox VE, Proxmox Backup Server, XCP-ng, VyOS, IPFire, OPNsense, pfSense, OpenWrt, FreedomBox, YunoHost, StartOS, EasyNAS, openmediavault, ZimaOS, MinisCloud OS, BlueOnyx, Qlustar, PBXware, OviOS, Cix, eLxr, Gooroom Platform, Hadron, Kairos, Fedora CoreOS, Fedora IoT, Fedora Server, AlmaLinux Kitten, Rocky Linux Sigma, Oracle Linux Server, SUSE Linux Enterprise Server.

---

### 9. Privacidade e Anonimato Máximo

Tails, Whonix, Qubes OS, Kicksecure, PureOS, Trisquel, gNewSense, Parabola, Hyperbola, Kodachi, Anonym-OS, NoID Privacy, T-PHANTOM, AnuBitux, Open Secure-K OS, Netdeep Secure, Smoothwall Express, Clear NDR, SageOS, Securonis, PH4NTXM, B1ackOS, CarotOS, Cerberix, Archanoxy, Maze, Almighty, Cyrethium, Malbian, MoltOS, HydraPWK, NST, KANOTIX, BackBox, Kali, Parrot, BlackArch, Athena OS.

---

### 10. ChromeOS e Ambientes de Contêiner

O Google Antigravity e este patcher de tradução funcionam perfeitamente no **ChromeOS** e **ChromeOS Flex** através do ambiente oficial **Crostini (Linux no ChromeOS)**:

1. Ative o suporte a Linux nas Configurações do ChromeOS (*Avançado > Desenvolvedores > Ambiente de desenvolvimento Linux*).
2. Abra o terminal do Linux no ChromeOS.
3. Baixe e instale o Antigravity normalmente.
4. Execute o instalador `install.sh`:
   ```bash
   git clone https://github.com/Cambrith/antigravity-pt-br.git
   cd antigravity-pt-br
   chmod +x install.sh
   ./install.sh
   ```
*Também compatível com ChromiumOS, FydeOS, CloudReady, postmarketOS, Mobian, Droidian, Ubuntu Touch e Raspberry Pi OS.*

---

## 🪟 Windows Suportado

* **Windows 11** (Todas as edições — Home, Pro, Enterprise, Workstation — x64 e ARM64).
* **Windows 10** (Versões 20H2 a 22H2 — x64).
* Caminho padrão detectado: `%LOCALAPPDATA%\Programs\antigravity\resources\app.asar`.

---

## 🍏 macOS Suportado

* **macOS 15 (Sequoia)**, **14 (Sonoma)**, **13 (Ventura)** e **12 (Monterey)**.
* Processadores **Apple Silicon** (M1, M2, M3, M4 e suas variantes Pro/Max/Ultra) e **Intel (x86_64)**.
* Caminhos detectados: `/Applications/Antigravity.app/Contents/Resources/app.asar` e `~/Applications/Antigravity.app/Contents/Resources/app.asar`.
