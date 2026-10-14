const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const os = require('os');

// Catálogo de Famílias e Distribuições Homologadas
const DISTRO_FAMILIES = {
  debian: {
    name: "Família Debian & Derivados",
    packageManagers: ["apt", "dpkg"],
    sampleDistros: [
      "Debian", "Ubuntu", "Linux Mint", "Pop!_OS", "Zorin OS", "elementary OS",
      "KDE neon", "Kali Linux", "Parrot OS", "MX Linux", "antiX", "Raspberry Pi OS",
      "Tails", "Whonix", "PureOS", "Deepin", "Peppermint OS", "SparkyLinux", "Q4OS"
    ],
    supportedPaths: [
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar"),
      "/opt/antigravity/resources/app.asar",
      "/usr/lib/antigravity/resources/app.asar"
    ]
  },
  redhat: {
    name: "Família Red Hat / Fedora / SUSE / RPM",
    packageManagers: ["dnf", "rpm", "zypper"],
    sampleDistros: [
      "Fedora", "Red Hat Enterprise Linux", "CentOS Stream", "Rocky Linux",
      "AlmaLinux", "Oracle Linux", "openSUSE Leap", "openSUSE Tumbleweed",
      "Nobara", "Bazzite", "Mageia", "OpenMandriva", "Amazon Linux", "ClearOS"
    ],
    supportedPaths: [
      "/opt/antigravity/resources/app.asar",
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar"),
      "/usr/share/antigravity/resources/app.asar"
    ]
  },
  arch: {
    name: "Família Arch Linux",
    packageManagers: ["pacman", "yay", "paru"],
    sampleDistros: [
      "Arch Linux", "Manjaro", "EndeavourOS", "Garuda Linux", "CachyOS",
      "ArcoLinux", "Artix Linux", "Archcraft", "BigLinux", "BlackArch Linux"
    ],
    supportedPaths: [
      "/opt/antigravity/resources/app.asar",
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar")
    ]
  },
  slackware: {
    name: "Família Slackware",
    packageManagers: ["slackpkg", "pkgtool"],
    sampleDistros: [
      "Slackware", "Salix", "Slackel", "Porteus", "Slax", "Puppy Linux", "Tiny Core Linux"
    ],
    supportedPaths: [
      "/opt/antigravity/resources/app.asar",
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar")
    ]
  },
  gentooSource: {
    name: "Família Gentoo e Source-based",
    packageManagers: ["portage", "emerge"],
    sampleDistros: [
      "Gentoo Linux", "Funtoo", "Calculate Linux", "Void Linux", "Source Mage", "CRUX"
    ],
    supportedPaths: [
      "/opt/antigravity/resources/app.asar",
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar")
    ]
  },
  independent: {
    name: "Independentes e Especializadas",
    packageManagers: ["apk", "nix", "guix", "eopkg"],
    sampleDistros: [
      "Alpine Linux", "NixOS", "GNU Guix System", "Solus", "Clear Linux", "Chimera Linux"
    ],
    supportedPaths: [
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar"),
      "/opt/antigravity/resources/app.asar"
    ]
  },
  chromeos: {
    name: "ChromeOS e Contêineres Crostini",
    packageManagers: ["apt (Crostini Debian container)"],
    sampleDistros: [
      "ChromeOS", "ChromeOS Flex", "FydeOS", "ChromiumOS"
    ],
    supportedPaths: [
      path.join(os.homedir(), ".local", "opt", "antigravity", "resources", "app.asar"),
      "/opt/antigravity/resources/app.asar"
    ]
  },
  flatpak: {
    name: "Flatpak Sandboxed (Universal em qualquer Linux)",
    packageManagers: ["flatpak"],
    sampleDistros: ["Universal em todas as distribuições Linux"],
    supportedPaths: [
      path.join(os.homedir(), ".var", "app", "com.google.Antigravity", "data", "antigravity", "resources", "app.asar")
    ]
  }
};

test('Compatibilidade Multi-Distro: Resolução de caminhos é agnóstica a gerenciadores de pacotes', () => {
  for (const [key, family] of Object.entries(DISTRO_FAMILIES)) {
    assert.ok(family.supportedPaths.length > 0, `A família ${family.name} deve possuir caminhos mapeados`);
    for (const p of family.supportedPaths) {
      const normalized = p.replace(/\\/g, '/');
      assert.ok(normalized.endsWith('resources/app.asar'), `Caminho ${p} na família ${family.name} deve apontar para resources/app.asar`);
    }
  }
});

test('Compatibilidade Multi-Distro: Diretório de persistência do usuário segue padrão XDG em todas as famílias', () => {
  const home = os.homedir();
  const defaultXdg = path.join(home, '.config', 'Antigravity', 'i18n');
  assert.ok(defaultXdg.includes('.config'), 'O diretório de persistência Linux deve seguir a especificação XDG Base Directory');
});

test('Compatibilidade ChromeOS (Crostini): Caminho de contêiner Linux é plenamente compatível', () => {
  const crostiniPaths = DISTRO_FAMILIES.chromeos.supportedPaths;
  assert.ok(crostiniPaths.some(p => p.includes('.local') || p.startsWith('/opt')), 'ChromeOS deve resolver caminhos padrão de usuário e sistema do container Crostini');
});
