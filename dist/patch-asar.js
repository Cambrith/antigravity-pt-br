#!/usr/bin/env node
/**
 * Antigravity Pure-Node ASAR Localization Patcher (Cross-Platform)
 * Suporte: Linux, macOS, Windows
 * - Dependências externas: Zero (usa apenas módulos nativos do Node.js: fs, path, crypto, vm, os)
 * - Preserva 100% dos arquivos descompactados em app.asar.unpacked
 * - Recalcula integridade SHA256 nativamente
 * - Substituição atômica de arquivos (.tmp -> rename)
 * - Auto-detecção de diretórios em Linux, macOS e Windows
 */

// Lê/grava o app.asar como arquivo bruto mesmo dentro do Electron (ELECTRON_RUN_AS_NODE).
process.noAsar = true;

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');
const os = require('os');

const PATCH_SIGNATURE = 'Cambrith pt-BR Localization Injection v19';

// 1. Resolução Multiplataforma de Caminhos
function getExecutableConfigFile() {
  const home = os.homedir();
  return path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'executable.conf');
}

function resolveAsarFromTarget(target) {
  if (!target || typeof target !== 'string') return null;
  const clean = target.trim();
  if (!clean) return null;

  try {
    if (fs.existsSync(clean)) {
      const stat = fs.statSync(clean);
      if (stat.isFile()) {
        if (clean.endsWith('.asar')) return clean;
        const candidate1 = path.join(path.dirname(clean), 'resources', 'app.asar');
        if (fs.existsSync(candidate1)) return candidate1;
        const candidate2 = path.join(path.dirname(clean), 'app.asar');
        if (fs.existsSync(candidate2)) return candidate2;
      } else if (stat.isDirectory()) {
        const candidate1 = path.join(clean, 'resources', 'app.asar');
        if (fs.existsSync(candidate1)) return candidate1;
        const candidate2 = path.join(clean, 'app.asar');
        if (fs.existsSync(candidate2)) return candidate2;
      }
    }
  } catch (_) {}

  if (clean.endsWith('.asar')) return clean;
  return null;
}

function detectAsarPath() {
  // 1. Se passado por argumento (--asar=, --target=, ou caminho posicional)
  let saveToConfig = false;
  let targetArg = null;

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === '--save' || arg === '-s') {
      saveToConfig = true;
      continue;
    }
    if (arg.startsWith('--save=')) {
      saveToConfig = true;
      targetArg = arg.split('=')[1];
      continue;
    }
    if (arg.startsWith('--set-executable=')) {
      saveToConfig = true;
      targetArg = arg.split('=')[1];
      continue;
    }
    if (arg.startsWith('--asar=')) {
      targetArg = arg.split('=')[1];
      continue;
    }
    if (arg.startsWith('--target=') || arg.startsWith('--app=')) {
      targetArg = arg.split('=')[1];
      continue;
    }
    if (!arg.startsWith('-')) {
      targetArg = arg;
    }
  }

  if (targetArg) {
    const resolved = resolveAsarFromTarget(targetArg);
    if (resolved) {
      if (saveToConfig) {
        try {
          const conf = getExecutableConfigFile();
          fs.mkdirSync(path.dirname(conf), { recursive: true });
          fs.writeFileSync(conf, targetArg.trim() + '\n', 'utf8');
        } catch (_) {}
      }
      return resolved;
    }
    if (targetArg.endsWith('.asar')) return targetArg;
  }

  // 2. Variáveis de ambiente
  if (process.env.ANTIGRAVITY_ASAR) {
    const envResolved = resolveAsarFromTarget(process.env.ANTIGRAVITY_ASAR);
    if (envResolved) return envResolved;
  }
  if (process.env.ANTIGRAVITY_APP_DIR) {
    const envResolved = resolveAsarFromTarget(process.env.ANTIGRAVITY_APP_DIR);
    if (envResolved) return envResolved;
  }
  if (process.env.ANTIGRAVITY_BIN) {
    const envResolved = resolveAsarFromTarget(process.env.ANTIGRAVITY_BIN);
    if (envResolved) return envResolved;
  }

  // 3. Arquivo de configuração persistente (~/.config/Antigravity/executable.conf)
  try {
    const conf = getExecutableConfigFile();
    if (fs.existsSync(conf)) {
      const lines = fs.readFileSync(conf, 'utf8').split('\n');
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (line && !line.startsWith('#')) {
          const confResolved = resolveAsarFromTarget(line);
          if (confResolved && fs.existsSync(confResolved)) {
            return confResolved;
          }
        }
      }
    }
  } catch (_) {}

  // 4. Fallback para diretórios conhecidos por plataforma
  const home = os.homedir();
  const platform = process.platform;

  let candidates = [];
  if (platform === 'linux') {
    candidates = [
      path.join(home, '.local', 'opt', 'Antigravity-x64', 'resources', 'app.asar'),
      path.join(home, '.local', 'opt', 'Antigravity', 'resources', 'app.asar'),
      path.join(home, '.local', 'opt', 'antigravity', 'resources', 'app.asar'),
      '/opt/antigravity/resources/app.asar',
      '/usr/lib/antigravity/resources/app.asar',
      '/usr/share/antigravity/resources/app.asar',
      path.join(home, '.var', 'app', 'com.google.Antigravity', 'data', 'antigravity', 'resources', 'app.asar')
    ];
  } else if (platform === 'darwin') {
    candidates = [
      '/Applications/Antigravity.app/Contents/Resources/app.asar',
      path.join(home, 'Applications', 'Antigravity.app', 'Contents', 'Resources', 'app.asar')
    ];
  } else if (platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local');
    const programFiles = process.env.ProgramFiles || 'C:\\Program Files';
    const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
    candidates = [
      path.join(localAppData, 'Programs', 'antigravity', 'resources', 'app.asar'),
      path.join(localAppData, 'Programs', 'Antigravity', 'resources', 'app.asar'),
      path.join(programFiles, 'Antigravity', 'resources', 'app.asar'),
      path.join(programFilesX86, 'Antigravity', 'resources', 'app.asar')
    ];
  }

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      try {
        const conf = getExecutableConfigFile();
        if (!fs.existsSync(conf)) {
          fs.mkdirSync(path.dirname(conf), { recursive: true });
          fs.writeFileSync(conf, c + '\n', 'utf8');
        }
      } catch (_) {}
      return c;
    }
  }
  return candidates[0] || path.join(home, '.local', 'opt', 'antigravity', 'resources', 'app.asar');
}

function getGoldenConfigDir() {
  const home = os.homedir();
  const platform = process.platform;

  if (platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n');
  } else if (platform === 'darwin') {
    return path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n');
  } else {
    return path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n');
  }
}

const ASAR_PATH = detectAsarPath();
const RESOURCES_DIR = path.dirname(ASAR_PATH);
const SCRIPT_DIR = __dirname;
const GOLDEN_DIR = getGoldenConfigDir();
const GOLDEN_I18N = path.join(GOLDEN_DIR, 'i18n-pt-br.js');
const GOLDEN_CONTROLS = path.join(GOLDEN_DIR, 'cambrith-window-controls.js');
const SOURCE_I18N = path.join(SCRIPT_DIR, 'i18n-pt-br.js');
const TARGET_I18N = path.join(RESOURCES_DIR, 'i18n-pt-br.js');
const SOURCE_CONTROLS = path.join(SCRIPT_DIR, 'cambrith-window-controls.js');
const TARGET_CONTROLS = path.join(RESOURCES_DIR, 'cambrith-window-controls.js');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  process.stdout.write(line);
}

function calcIntegrity(fileBuf) {
  const blockSize = 4 * 1024 * 1024;
  const hash = crypto.createHash('sha256').update(fileBuf).digest('hex');
  const blocks = [];
  if (fileBuf.length === 0) {
    blocks.push(crypto.createHash('sha256').update(Buffer.alloc(0)).digest('hex'));
  } else {
    for (let i = 0; i < fileBuf.length; i += blockSize) {
      const slice = fileBuf.subarray(i, Math.min(i + blockSize, fileBuf.length));
      blocks.push(crypto.createHash('sha256').update(slice).digest('hex'));
    }
  }
  return {
    algorithm: 'SHA256',
    hash,
    blockSize,
    blocks
  };
}

function patchPreload(code) {
  let out = code;

  // 1. Upgrade or inject showContextMenu translation
  const trMapBlock = `showContextMenu: (items) => {
        const trMap = {
            'New Window': 'Nova janela',
            'New Conversation': 'Nova conversa',
            'Cut': 'Recortar',
            'Copy': 'Copiar',
            'Paste': 'Colar',
            'Select All': 'Selecionar tudo',
            'Undo': 'Desfazer',
            'Redo': 'Refazer',
            'Reload': 'Recarregar',
            'Zoom In': 'Aumentar zoom',
            'Zoom Out': 'Diminuir zoom',
            'Reset Zoom': 'Redefinir zoom',
            'Toggle Fullscreen': 'Alternar tela cheia',
            'Docs': 'Documentação',
            'Quit': 'Sair',
            'Close': 'Fechar',
            'Minimize': 'Minimizar',
            'Maximize': 'Maximizar',
            'Delete': 'Excluir',
            'Rename': 'Renomear',
            'Archive': 'Arquivar',
            'Unarchive': 'Desarquivar',
            'Pin': 'Fixar',
            'Unpin': 'Desafixar',
            'Open': 'Abrir',
            'Duplicate': 'Duplicar',
            'Mark Unread': 'Marcar como não lida',
            'Mark unread': 'Marcar como não lida',
            'Mark as Unread': 'Marcar como não lida',
            'Mark as unread': 'Marcar como não lida',
            'Mark Read': 'Marcar como lida',
            'Mark read': 'Marcar como lida',
            'Mark as Read': 'Marcar como lida',
            'Mark as read': 'Marcar como lida',
            'Split': 'Dividir',
            'Split Right': 'Dividir à direita',
            'Split Down': 'Dividir abaixo',
            'Split Left': 'Dividir à esquerda',
            'Split Up': 'Dividir acima',
            'Right': 'À direita',
            'Down': 'Abaixo',
            'Left': 'À esquerda',
            'Up': 'Acima',
            'Conversation ID': 'ID da conversa',
            'Project Name': 'Nome do projeto',
            'Conversation Name': 'Nome da conversa',
            'Copy Conversation ID': 'Copiar ID da conversa',
            'Copy Project Name': 'Copiar nome do projeto',
            'Copy Conversation Name': 'Copiar nome da conversa',
            'Copy Image': 'Copiar imagem',
            'Save Image': 'Salvar imagem',
            'Save Image As...': 'Salvar imagem como...',
            'Save Image As': 'Salvar imagem como',
            'Copy Image Address': 'Copiar endereço da imagem',
            'Copy Image Link': 'Copiar link da imagem',
            'Open Image': 'Abrir imagem',
            'Open Image in New Tab': 'Abrir imagem em nova guia',
            'Open Image in new tab': 'Abrir imagem em nova guia',
            'Download Image': 'Baixar imagem',
            'Inspect': 'Inspecionar',
            'Inspect Element': 'Inspecionar elemento',
            'Learn More': 'Saber mais',
            'Documentation': 'Documentação',
            'Settings': 'Configurações',
            'Preferences': 'Preferências',
            'Search': 'Buscar',
            'Find': 'Localizar',
            'Select': 'Selecionar',
            'Clear': 'Limpar',
            'Reset': 'Redefinir',
            'Edit': 'Editar',
            'Remove': 'Remover',
            'Cancel': 'Cancelar',
            'Save': 'Salvar',
            'Save As...': 'Salvar como...',
            'Export': 'Exportar',
            'Import': 'Importar',
            'Share': 'Compartilhar'
        };
        function resolveLabel(lbl) {
            if (!lbl || typeof lbl !== 'string') return lbl;
            const trimmed = lbl.trim();
            if (trMap[trimmed]) return trMap[trimmed];
            const lower = trimmed.toLowerCase();
            for (const [k, v] of Object.entries(trMap)) {
                if (k.toLowerCase() === lower) return v;
            }
            if (/^Copy\\s+(.+)$/i.test(trimmed)) {
                const sub = trimmed.replace(/^Copy\\s+/i, '');
                const subTr = resolveLabel(sub);
                if (subTr !== sub) return \`Copiar \${subTr.toLowerCase().startsWith('id') ? subTr : subTr.charAt(0).toLowerCase() + subTr.slice(1)}\`;
            }
            if (/^Split\\s+(.+)$/i.test(trimmed)) {
                const sub = trimmed.replace(/^Split\\s+/i, '');
                const subTr = resolveLabel(sub);
                if (subTr !== sub) return \`Dividir \${subTr.charAt(0).toLowerCase() + subTr.slice(1)}\`;
            }
            try {
                if (typeof window !== 'undefined' && window.__CAMBRITH_TRANSLATE_STR__) {
                    const dyn = window.__CAMBRITH_TRANSLATE_STR__(trimmed);
                    if (dyn) return dyn;
                }
            } catch (_) {}
            if (/^Version\\s+(.+)$/i.test(trimmed)) return trimmed.replace(/^Version\\s+(.+)$/i, 'Versão $1');
            return lbl;
        }
        const trItems = (arr) => Array.isArray(arr) ? arr.map(it => ({
            ...it,
            label: it && it.label ? resolveLabel(it.label) : undefined,
            submenu: it && it.submenu ? trItems(it.submenu) : undefined
        })) : arr;
        return electron_1.ipcRenderer.invoke('window:show-context-menu', trItems(items));
    },`;

  if (out.includes("showContextMenu: (items) => electron_1.ipcRenderer.invoke('window:show-context-menu', items),")) {
    out = out.replace("showContextMenu: (items) => electron_1.ipcRenderer.invoke('window:show-context-menu', items),", trMapBlock);
  } else if (out.includes("showContextMenu: (items) => {")) {
    out = out.replace(/showContextMenu:\s*\(items\)\s*=>\s*\{[\s\S]*?return electron_1\.ipcRenderer\.invoke\('window:show-context-menu',\s*trItems\(items\)\);\s*\},/, trMapBlock);
  }

  // 2. Remove old injection block if present
  const oldMarkerIdx = out.indexOf('// --- Cambrith pt-BR Localization Injection');
  if (oldMarkerIdx !== -1) {
    out = out.slice(0, oldMarkerIdx).trimEnd() + '\n';
  }

  const injection = `

// --- ${PATCH_SIGNATURE} ---
try {
    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    function getI18nPath() {
        const home = os.homedir();
        const resPath = path.join(process.resourcesPath || path.join(__dirname, '..', '..'), 'i18n-pt-br.js');
        let golden = '';
        if (process.platform === 'win32') {
            golden = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n', 'i18n-pt-br.js');
        } else if (process.platform === 'darwin') {
            golden = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n', 'i18n-pt-br.js');
        } else {
            golden = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n', 'i18n-pt-br.js');
        }
        if (fs.existsSync(golden)) return golden;
        if (fs.existsSync(resPath)) return resPath;
        return null;
    }
    const i18nPath = getI18nPath();
    if (i18nPath && fs.existsSync(i18nPath)) {
        const i18nCode = fs.readFileSync(i18nPath, 'utf-8');
        const runI18n = () => {
            try {
                const nativeBridge = {
                    getDocsFolder: () => {
                        try {
                            const home = os.homedir();
                            if (fs.existsSync(path.join(home, 'Documentos'))) return 'Documentos';
                            if (fs.existsSync(path.join(home, 'Documents'))) return 'Documents';
                        } catch (_) {}
                        return 'Documentos';
                    },
                    createReadme: (folderName, projectName) => {
                        try {
                            const home = os.homedir();
                            const candidateDirs = [
                                path.join(home, 'Documentos', 'antigravity', folderName),
                                path.join(home, 'Documents', 'antigravity', folderName),
                                path.join(home, 'antigravity', folderName),
                                path.join(home, 'Documentos', folderName),
                                path.join(home, 'Documents', folderName)
                            ];
                            for (const targetDir of candidateDirs) {
                                if (fs.existsSync(targetDir)) {
                                    const readmePath = path.join(targetDir, 'README.md');
                                    if (!fs.existsSync(readmePath)) {
                                        const titleStr = projectName || folderName;
                                        const content = '# ' + titleStr + '\\n\\nProjeto criado no Google Antigravity.\\n\\n## Visao Geral\\n\\nAmbiente inicializado via Cambrith OS.\\n';
                                        fs.writeFileSync(readmePath, content, 'utf8');
                                    }
                                    break;
                                }
                            }
                        } catch (e) {
                            console.warn('[Cambrith] Erro ao criar README:', e);
                        }
                    },
                    loadCustomThemes: () => {
                        try {
                            const home = os.homedir();
                            let cfgDir = '';
                            if (process.platform === 'win32') {
                                cfgDir = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n');
                            } else if (process.platform === 'darwin') {
                                cfgDir = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n');
                            } else {
                                cfgDir = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n');
                            }
                            const filePath = path.join(cfgDir, 'custom-themes.json');
                            if (fs.existsSync(filePath)) {
                                return JSON.parse(fs.readFileSync(filePath, 'utf8'));
                            }
                        } catch (_) {}
                        return null;
                    },
                    saveCustomThemes: (themes) => {
                        try {
                            const home = os.homedir();
                            let cfgDir = '';
                            if (process.platform === 'win32') {
                                cfgDir = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n');
                            } else if (process.platform === 'darwin') {
                                cfgDir = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n');
                            } else {
                                cfgDir = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n');
                            }
                            fs.mkdirSync(cfgDir, { recursive: true });
                            const filePath = path.join(cfgDir, 'custom-themes.json');
                            fs.writeFileSync(filePath, JSON.stringify(themes, null, 2), 'utf8');
                            return true;
                        } catch (e) {
                            console.warn('[Cambrith] Erro ao salvar custom-themes.json:', e);
                            return false;
                        }
                    },
                    loadActiveTheme: () => {
                        try {
                            const home = os.homedir();
                            let cfgDir = '';
                            if (process.platform === 'win32') {
                                cfgDir = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n');
                            } else if (process.platform === 'darwin') {
                                cfgDir = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n');
                            } else {
                                cfgDir = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n');
                            }
                            const filePath = path.join(cfgDir, 'active-theme.json');
                            if (fs.existsSync(filePath)) {
                                return JSON.parse(fs.readFileSync(filePath, 'utf8'));
                            }
                        } catch (_) {}
                        return null;
                    },
                    saveActiveTheme: (theme) => {
                        try {
                            const home = os.homedir();
                            let cfgDir = '';
                            if (process.platform === 'win32') {
                                cfgDir = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n');
                            } else if (process.platform === 'darwin') {
                                cfgDir = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n');
                            } else {
                                cfgDir = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n');
                            }
                            fs.mkdirSync(cfgDir, { recursive: true });
                            const filePath = path.join(cfgDir, 'active-theme.json');
                            fs.writeFileSync(filePath, JSON.stringify(theme, null, 2), 'utf8');
                            return true;
                        } catch (e) {
                            console.warn('[Cambrith] Erro ao salvar active-theme.json:', e);
                            return false;
                        }
                    }
                };
                if (typeof electron_1 !== 'undefined' && electron_1.contextBridge && electron_1.contextBridge.exposeInMainWorld) {
                    try { electron_1.contextBridge.exposeInMainWorld('__CAMBRITH_NATIVE_BRIDGE__', nativeBridge); } catch (_) { window.__CAMBRITH_NATIVE_BRIDGE__ = nativeBridge; }
                } else if (typeof window !== 'undefined') {
                    window.__CAMBRITH_NATIVE_BRIDGE__ = nativeBridge;
                }
                electron_1.webFrame.executeJavaScript(i18nCode);
            } catch (e) {}
        };
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', runI18n, { once: true });
        } else {
            runI18n();
        }
    }
} catch (err) {
    console.error('[i18n-pt-br] preload error:', err);
}
`;
  out += injection;
  return out;
}

function patchUtils(code) {
  let out = code;
  // Cambrith: Garante tema escuro nativo no Electron para menus de contexto e controles
  if (!out.includes('electron_1.nativeTheme.themeSource =')) {
    out = out.replace("const win = new electron_1.BrowserWindow({", "try { electron_1.nativeTheme.themeSource = 'dark'; } catch (_) {}\n    const win = new electron_1.BrowserWindow({");
  }
  // Ajusta a janela inicial à área útil: painéis do desktop não podem cortar o rodapé.
  out = out.replace(/width: 1400,\s*height: 900,/, `...(() => {
            const area = electron_1.screen.getPrimaryDisplay().workArea;
            const width = Math.min(1400, area.width);
            const height = Math.min(900, Math.floor(area.height * 0.9));
            return {
                x: area.x + Math.floor((area.width - width) / 2),
                y: area.y + Math.floor((area.height - height) / 2),
                width,
                height,
            };
        })(),`);
  // Atualiza também arquivos que receberam a primeira versão do ajuste de altura.
  out = out.replace('const height = Math.min(900, area.height);',
                    'const height = Math.min(900, Math.floor(area.height * 0.9));');
  if (!out.includes('// Cambrith: maximiza em telas compactas')) {
    out = out.replace("win.on('page-title-updated',", `// Cambrith: maximiza em telas compactas usando a área útil do gerenciador de janelas.
    const initialWorkArea = electron_1.screen.getPrimaryDisplay().workArea;
    if (initialWorkArea.width < 1400 || initialWorkArea.height < 900) {
        win.maximize();
    }
    win.on('page-title-updated',`);
  }
  // Cambrith: padroniza a identificação da janela no Alt+Tab, barra de tarefas e sistema
  const origTitlePattern = /win\.on\('page-title-updated',\s*\(event,\s*title\)\s*=>\s*\{[\s\S]*?win\.setTitle\(truncated\s*\+\s*wslBadge\);\s*\}\s*\}\);/;
  const brandedTitleHandler = `win.on('page-title-updated', (event, title) => {
        event.preventDefault();
        const appName = 'Google Antigravity';
        let base = (title && typeof title === 'string') ? title.trim() : '';
        if (base.length > 35) {
            base = base.substring(0, 35) + '...';
        }
        const fullTitle = base && !base.includes(appName) ? \`\${base} — \${appName}\` : (base || appName);
        win.setTitle(fullTitle + (wslBadge || ''));
    });`;
  if (origTitlePattern.test(out)) {
    out = out.replace(origTitlePattern, brandedTitleHandler);
  }
  const domReadyHook = `win.webContents.on('dom-ready', () => {
            try {
                const fs = require('fs');
                const path = require('path');
                const os = require('os');
                function getI18nPath() {
                    const home = os.homedir();
                    const resPath = path.join(process.resourcesPath || path.join(__dirname, '..', '..'), 'i18n-pt-br.js');
                    let golden = '';
                    if (process.platform === 'win32') {
                        golden = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'i18n', 'i18n-pt-br.js');
                    } else if (process.platform === 'darwin') {
                        golden = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n', 'i18n-pt-br.js');
                    } else {
                        golden = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'Antigravity', 'i18n', 'i18n-pt-br.js');
                    }
                    if (fs.existsSync(golden) && !fs.existsSync(resPath)) {
                        try { fs.copyFileSync(golden, resPath); } catch (_) {}
                    }
                    if (fs.existsSync(golden)) return golden;
                    if (fs.existsSync(resPath)) return resPath;
                    return null;
                }
                const i18nPath = getI18nPath();
                if (i18nPath && fs.existsSync(i18nPath)) {
                    win.webContents.executeJavaScript(fs.readFileSync(i18nPath, 'utf-8')).catch(() => {});
                }
                const controlsPath = path.join(process.resourcesPath || path.join(__dirname, '..', '..'), 'cambrith-window-controls.js');
                if (fs.existsSync(controlsPath)) {
                    win.webContents.executeJavaScript(fs.readFileSync(controlsPath, 'utf-8')).catch(() => {});
                }
            } catch (_) {}
        });`;

  if (out.includes("win.webContents.on('dom-ready'")) {
    out = out.replace(/win\.webContents\.on\('dom-ready',\s*\(\)\s*=>\s*\{[\s\S]*?\n        \}\);(?=\n        win\.webContents\.on\('did-finish-load')/, domReadyHook);
  } else if (out.includes("win.webContents.on('did-finish-load', () => {")) {
    out = out.replace("win.webContents.on('did-finish-load', () => {", domReadyHook + "\n        win.webContents.on('did-finish-load', () => {");
  }
  const titleBarOverlayPattern = /titleBarOverlay: isMacOS\(\)\s*\? false\s*:\s*\{\s*color: backgroundColor,\s*symbolColor: foregroundColor,\s*height: 30,\s*\},/;
  const customControlsOverlay = `titleBarOverlay: process.platform === 'linux' || isMacOS()
            ? false
            : {
                color: backgroundColor,
                symbolColor: foregroundColor,
                height: 30,
            },`;
  if (!out.includes("titleBarOverlay: process.platform === 'linux' || isMacOS()")) {
    if (!titleBarOverlayPattern.test(out)) {
      throw new Error('Não foi possível localizar a configuração original dos controles da janela.');
    }
    out = out.replace(titleBarOverlayPattern, customControlsOverlay);
  }

  // Cambrith: Ativação infalível da janela no Linux/KDE Wayland/X11 e outras plataformas
  // - Se houver janela aberta (visível), foca/ativa exatamente a janela atual onde ela está.
  // - Se o app estiver fechado (oculto na bandeja ou sem janelas), restaura a janela mais recente que estava aberta antes.
  const origShowOrCreate = /const showOrCreateWindow = \(port\) => \{[\s\S]*?exports\.showOrCreateWindow = showOrCreateWindow;/;
  const robustShowOrCreate = `const showOrCreateWindow = (port) => {
    if (port) global.__cambrithLastPort = port;
    function activateLinuxKWin(winTitle) {
        if (process.platform !== 'linux') return;
        try {
            const fsMod = require('fs');
            const osMod = require('os');
            const pathMod = require('path');
            const { execFile } = require('child_process');
            const scriptPath = pathMod.join(osMod.tmpdir(), 'antigravity-kwin-activate-' + process.pid + '.js');
            const safeTitle = JSON.stringify(winTitle || '');
            const scriptContent = [
                'const targetTitle = ' + safeTitle + ';',
                'const clients = workspace.windowList ? workspace.windowList() : (workspace.clientList ? workspace.clientList() : []);',
                'let target = null;',
                'for (let i = 0; i < clients.length; i++) {',
                '    const w = clients[i];',
                '    const cap = String(w.caption || "");',
                '    const cls = String(w.resourceClass || "").toLowerCase();',
                '    const name = String(w.resourceName || "").toLowerCase();',
                '    const desk = String(w.desktopFileName || "").toLowerCase();',
                '    if (cls.includes("antigravity") || name.includes("antigravity") || desk.includes("antigravity") || cap.toLowerCase().includes("antigravity")) {',
                '        if (targetTitle && cap.includes(targetTitle)) { target = w; break; }',
                '        if (!target) target = w;',
                '    }',
                '}',
                'if (target) {',
                '    if (target.minimized) target.minimized = false;',
                '    if (target.desktops && target.desktops.length > 0 && !target.onAllDesktops && workspace.currentDesktop !== undefined) {',
                '        workspace.currentDesktop = target.desktops[0];',
                '    }',
                '    workspace.activeWindow = target;',
                '}'
            ].join('\\n');
            fsMod.writeFileSync(scriptPath, scriptContent, 'utf8');
            const qdbusBins = ['qdbus6', 'qdbus', 'qdbus-qt6', 'qdbus-qt5'];
            const tryBin = (idx) => {
                if (idx >= qdbusBins.length) {
                    try { execFile('kdotool', ['search', '--class', 'antigravity', 'windowactivate'], () => {}); } catch (_) {}
                    try { execFile('wmctrl', ['-x', '-R', 'antigravity'], () => {}); } catch (_) {}
                    return;
                }
                const bin = qdbusBins[idx];
                execFile(bin, ['org.kde.KWin', '/Scripting', 'org.kde.kwin.Scripting.unloadScript', 'antigravity_activate'], () => {
                    execFile(bin, ['org.kde.KWin', '/Scripting', 'org.kde.kwin.Scripting.loadScript', scriptPath, 'antigravity_activate'], (err, stdout) => {
                        if (err) return tryBin(idx + 1);
                        const id = String(stdout || '').trim();
                        if (id !== '') {
                            execFile(bin, ['org.kde.KWin', '/Scripting/Script' + id, 'org.kde.kwin.Script.run'], () => {
                                execFile(bin, ['org.kde.KWin', '/Scripting', 'org.kde.kwin.Scripting.unloadScript', 'antigravity_activate'], () => {});
                            });
                        }
                    });
                });
            };
            tryBin(0);
        } catch (_) {}
    }
    const allWins = electron_1.BrowserWindow.getAllWindows().filter((w) => w && !w.isDestroyed());
    const visibleWins = allWins.filter((w) => w.isVisible());
    if (visibleWins.length > 0) {
        const focused = electron_1.BrowserWindow.getFocusedWindow();
        let win = (focused && visibleWins.includes(focused)) ? focused : null;
        if (!win && global.__cambrithLastFocusedWindow && visibleWins.includes(global.__cambrithLastFocusedWindow)) {
            win = global.__cambrithLastFocusedWindow;
        }
        if (!win) {
            win = visibleWins.slice().sort((a, b) => (b.__lastActiveTime || 0) - (a.__lastActiveTime || 0))[0];
        }
        try {
            if (win.isMinimized()) {
                win.restore();
            }
            win.show();
            win.setSkipTaskbar(false);
            win.focus();
            try { electron_1.app.focus({ steal: true }); } catch (_) {}
            win.__lastActiveTime = Date.now();
            global.__cambrithLastFocusedWindow = win;
            activateLinuxKWin(typeof win.getTitle === 'function' ? win.getTitle() : '');
        } catch (_) {}
    } else if (allWins.length > 0) {
        let win = (global.__cambrithLastClosedWindow && allWins.includes(global.__cambrithLastClosedWindow))
            ? global.__cambrithLastClosedWindow
            : null;
        if (!win && global.__cambrithLastFocusedWindow && allWins.includes(global.__cambrithLastFocusedWindow)) {
            win = global.__cambrithLastFocusedWindow;
        }
        if (!win) {
            win = allWins.slice().sort((a, b) => Math.max(b.__lastClosedTime || 0, b.__lastActiveTime || 0) - Math.max(a.__lastClosedTime || 0, a.__lastActiveTime || 0))[0];
        }
        try {
            if (win.isMinimized()) {
                win.restore();
            }
            win.show();
            win.setSkipTaskbar(false);
            win.focus();
            try { electron_1.app.focus({ steal: true }); } catch (_) {}
            win.__lastActiveTime = Date.now();
            global.__cambrithLastFocusedWindow = win;
            const title = typeof win.getTitle === 'function' ? win.getTitle() : '';
            activateLinuxKWin(title);
            setTimeout(() => activateLinuxKWin(title), 70);
        } catch (_) {}
    } else {
        const targetPort = port || global.__cambrithLastPort;
        if (targetPort !== undefined && targetPort !== null) {
            const win = createWindow(\`\${constants_1.WINDOW_ORIGIN}:\${targetPort}/\`, global.__cambrithLastStorage);
            setTimeout(() => {
                try {
                    const title = win && !win.isDestroyed() && typeof win.getTitle === 'function' ? win.getTitle() : '';
                    activateLinuxKWin(title);
                } catch (_) {}
            }, 120);
        } else {
            createWindow(\`\${constants_1.WINDOW_ORIGIN}:\${port}/\`);
        }
    }
};
exports.showOrCreateWindow = showOrCreateWindow;`;
  if (origShowOrCreate.test(out)) {
    out = out.replace(origShowOrCreate, robustShowOrCreate);
  }

  if (out.includes("createNewWindow: () => {\n            void createWindow(url, storageManager);\n        },")) {
    out = out.replace(
      "createNewWindow: () => {\n            void createWindow(url, storageManager);\n        },",
      "createNewWindow: () => {\n            global.__cambrithSkipRestoreNextWindow = true;\n            void createWindow(url, storageManager);\n        },"
    );
  }

  // Cambrith: Oculta a janela ao fechar e persiste a janela/rota mais recente para reabrir exatamente onde estava
  const winCloseAndLoadBlock = `if (storageManager) {
        global.__cambrithLastStorage = storageManager;
    }
    try {
        const mPort = String(url || '').match(/:(\\d+)\\//);
        if (mPort) global.__cambrithLastPort = Number(mPort[1]);
    } catch (_) {}
    function getCambrithStateFile() {
        try {
            const os = require('os');
            const p = require('path');
            const cfg = process.env.XDG_CONFIG_HOME || p.join(os.homedir(), '.config');
            return p.join(cfg, 'Antigravity', 'last-window-state.json');
        } catch (_) {
            return '';
        }
    }
    function readCambrithWindowState() {
        try {
            const f = getCambrithStateFile();
            if (f && require('fs').existsSync(f)) {
                return JSON.parse(require('fs').readFileSync(f, 'utf8'));
            }
        } catch (_) {}
        return null;
    }
    function saveCambrithWindowState(targetWin) {
        try {
            const w = targetWin || win;
            if (!w || w.isDestroyed()) return;
            const f = getCambrithStateFile();
            if (!f) return;
            const fsMod = require('fs');
            const pathMod = require('path');
            const prev = readCambrithWindowState() || {};
            let route = prev.route || '/';
            try {
                const curUrl = w.webContents && typeof w.webContents.getURL === 'function' ? w.webContents.getURL() : '';
                if (curUrl && /^https?:\\/\\/127\\.0\\.0\\.1:\\d+\\//.test(curUrl)) {
                    const parsed = new URL(curUrl);
                    const candidate = (parsed.pathname || '/') + (parsed.search || '') + (parsed.hash || '');
                    if (candidate && (candidate !== '/' || w.__allowRootRouteSave)) {
                        route = candidate;
                    }
                }
            } catch (_) {}
            const isMax = typeof w.isMaximized === 'function' ? w.isMaximized() : false;
            const b = (!isMax && typeof w.getBounds === 'function') ? w.getBounds() : (w.__lastNormalBounds || prev.bounds || null);
            const nextState = {
                route,
                isMaximized: isMax,
                bounds: b,
                updatedAt: Date.now()
            };
            fsMod.mkdirSync(pathMod.dirname(f), { recursive: true });
            fsMod.writeFileSync(f, JSON.stringify(nextState), 'utf8');
        } catch (_) {}
    }
    global.__cambrithSaveWindowState = saveCambrithWindowState;
    win.__lastActiveTime = Date.now();
    global.__cambrithLastFocusedWindow = win;
    win.on('focus', () => {
        win.__lastActiveTime = Date.now();
        global.__cambrithLastFocusedWindow = win;
        saveCambrithWindowState(win);
    });
    win.on('show', () => {
        win.__lastActiveTime = Date.now();
        global.__cambrithLastFocusedWindow = win;
        saveCambrithWindowState(win);
    });
    win.on('move', () => {
        try {
            if (!win.isMaximized() && !win.isMinimized()) {
                win.__lastNormalBounds = win.getBounds();
            }
            saveCambrithWindowState(win);
        } catch (_) {}
    });
    win.on('resize', () => {
        try {
            if (!win.isMaximized() && !win.isMinimized()) {
                win.__lastNormalBounds = win.getBounds();
            }
            saveCambrithWindowState(win);
        } catch (_) {}
    });
    if (win.webContents && typeof win.webContents.on === 'function') {
        win.webContents.on('did-navigate', () => saveCambrithWindowState(win));
        win.webContents.on('did-navigate-in-page', (_ev, _navUrl, isMainFrame) => {
            if (isMainFrame !== false) {
                win.__allowRootRouteSave = true;
                win.__lastActiveTime = Date.now();
                saveCambrithWindowState(win);
            }
        });
    }
    win.on('close', (event) => {
        win.__lastClosedTime = Date.now();
        global.__cambrithLastClosedWindow = win;
        saveCambrithWindowState(win);
        if (!electron_1.app.isQuitting) {
            event.preventDefault();
            win.hide();
        }
    });
    try {
        const linuxIconCandidate = '/home/cambrith/.local/share/icons/hicolor/512x512/apps/antigravity-cambrith.png';
        const finalIconPath = (process.platform === 'linux' && require('fs').existsSync(linuxIconCandidate))
            ? linuxIconCandidate
            : path_1.default.join(__dirname, '..', 'icon.png');
        const customWinIcon = electron_1.nativeImage.createFromPath(finalIconPath);
        if (!customWinIcon.isEmpty()) {
            win.setIcon(customWinIcon);
        }
    } catch (_) {}
    let targetLoadUrl = url;
    try {
        if (!global.__cambrithSkipRestoreNextWindow && typeof url === 'string' && /^https?:\\/\\/127\\.0\\.0\\.1:\\d+\\/?$/.test(url)) {
            const st = readCambrithWindowState();
            if (st && typeof st.route === 'string' && st.route.startsWith('/') && st.route !== '/') {
                targetLoadUrl = url.replace(/\\/$/, '') + st.route;
            }
            if (st && st.bounds && typeof st.bounds.width === 'number' && st.bounds.width >= 500 && st.bounds.height >= 400) {
                win.__lastNormalBounds = st.bounds;
                if (!st.isMaximized && typeof win.setBounds === 'function') {
                    win.setBounds(st.bounds);
                }
            }
            if (st && st.isMaximized && typeof win.maximize === 'function') {
                win.maximize();
            }
        }
    } catch (_) {}
    global.__cambrithSkipRestoreNextWindow = false;
    void win.loadURL(targetLoadUrl);`;

  if (!out.includes('saveCambrithWindowState')) {
    const prevInjectedPattern = /win\.on\('close',[\s\S]*?void win\.loadURL\(url\);/;
    if (prevInjectedPattern.test(out)) {
      out = out.replace(prevInjectedPattern, winCloseAndLoadBlock);
    } else if (out.includes('void win.loadURL(url);')) {
      out = out.replace('void win.loadURL(url);', winCloseAndLoadBlock);
    }
  }

  return out;
}

function patchMain(code) {
  let out = code
    .replace("label: 'No agents running'", "label: 'Nenhum agente em execução'")
    .replace("label: 'Quit'", "label: 'Sair'")
    .replace("label: `Open ${electron_1.app.getName()}`", "label: `Abrir ${electron_1.app.getName()}`")
    .replace("buttons: ['Cancel', 'Quit']", "buttons: ['Cancelar', 'Sair']")
    .replace("title: 'Confirm Quit'", "title: 'Confirmar saída'")
    .replace("message: 'Are you sure you want to quit?'", "message: 'Tem certeza de que deseja sair?'")
    .replace("detail: 'There may be agents or background tasks running.'", "detail: 'Pode haver agentes ou tarefas em segundo plano em execução.'");

  // Cambrith: Conecta a janela ao .desktop do KDE Plasma para exibir o mesmo ícone na visão de tarefas (Alt+Tab / Task Switcher)
  if (!out.includes("electron_1.app.setDesktopFileName('google-antigravity')")) {
    out = out.replace(
      'const electron_1 = require("electron");',
      `const electron_1 = require("electron");
if (process.platform === 'linux') {
    try {
        if (typeof electron_1.app.setDesktopFileName === 'function') {
            electron_1.app.setDesktopFileName('google-antigravity');
        }
        if (typeof electron_1.app.setAppUserModelId === 'function') {
            electron_1.app.setAppUserModelId('google-antigravity');
        }
    } catch (_) {}
}`
    );
  }

  if (!out.includes("electron_1.app.isQuitting = true;")) {
    out = out.replace(
      "electron_1.app.on('before-quit', async (event) => {",
      `electron_1.app.on('before-quit', async (event) => {
    electron_1.app.isQuitting = true;
    try {
        if (typeof global.__cambrithSaveWindowState === 'function') {
            const wins = electron_1.BrowserWindow.getAllWindows().filter((w) => w && !w.isDestroyed());
            const targetWin = electron_1.BrowserWindow.getFocusedWindow() || global.__cambrithLastFocusedWindow || global.__cambrithLastClosedWindow || wins[0];
            if (targetWin) global.__cambrithSaveWindowState(targetWin);
        }
    } catch (_) {}`
    );
  }

  // Cambrith: Garante que o app não encerre ao fechar as janelas, mantendo o ícone na bandeja ativo
  const winAllClosedPattern = /electron_1\.app\.on\('window-all-closed',\s*async\s*\(\)\s*=>\s*\{[\s\S]*?\}\);\s*(?=\/\*\*\s*Shuts down the host bridge server)/;
  const keepAliveWinAllClosed = `electron_1.app.on('window-all-closed', async () => {
    if (isQuitting || electron_1.app.isQuitting) {
        return;
    }
    electron_1.app.dock?.hide?.();
});\n`;
  if (winAllClosedPattern.test(out)) {
    out = out.replace(winAllClosedPattern, keepAliveWinAllClosed);
  }

  return out;
}

function patchMenu(code) {
  let out = code
    .replace("label: 'New Window'", "label: 'Nova janela'")
    .replace("label: 'Docs'", "label: 'Documentação'")
    .replace("label: 'Connect to WSL'", "label: 'Conectar ao WSL'")
    .replace("label: 'Reopen Locally'", "label: 'Reabrir localmente'");

  if (!out.includes("id: 'check-for-updates'")) {
    out = out.replace(
      "addItemToSubmenu(menu, 'Help', 0, new electron_1.MenuItem({",
      "addItemToSubmenu(menu, 'Help', 1, new electron_1.MenuItem({\n        id: 'check-for-updates',\n        label: updater_1.MenuUpdateStep.CheckForUpdates,\n        click: (menuItem) => {\n            const action = updater_1.updateActions[menuItem.label];\n            action?.();\n        },\n    }));\n    addItemToSubmenu(menu, 'Help', 0, new electron_1.MenuItem({"
    );
  }
  return out;
}

function patchTray(code) {
  let out = code.replace(
    /\(count > 0 \? `\$\{count\}` : 'No'\) \+\s*' agent' \+\s*\(count === 1 \? '' : 's'\) \+\s*' running'/,
    "count > 0 ? `${count} ${count === 1 ? 'agente em execução' : 'agentes em execução'}` : 'Nenhum agente em execução'"
  );

  const trayBlockPattern = /let contextMenu = null;[\s\S]*?(?=\/\*\*\s*\*\s*Inserts an item into the existing tray context menu)/;
  const newTrayBlock = `let contextMenu = null;
let lastTrayClickMs = 0;

function activateAppWindow() {
    try {
        (0, utils_1.showOrCreateWindow)(global.__cambrithLastPort);
    } catch (_) {}
}

function getTrayIconPath() {
    if ((0, utils_1.isMacOS)()) {
        return path.join(__dirname, '..', 'trayTemplate.png');
    }
    let isDark = true;
    try {
        if (electron_1.nativeTheme && typeof electron_1.nativeTheme.shouldUseDarkColors === 'boolean') {
            isDark = electron_1.nativeTheme.shouldUseDarkColors;
        }
        if (process.platform === 'linux') {
            const fs = require('fs');
            const os = require('os');
            const kdeglobals = path.join(os.homedir(), '.config', 'kdeglobals');
            if (fs.existsSync(kdeglobals)) {
                const content = fs.readFileSync(kdeglobals, 'utf8');
                const m = content.match(/ColorScheme=([^\\r\\n]+)/);
                if (m && /dark|macos|black/i.test(m[1])) isDark = true;
                const bg = content.match(/BackgroundNormal=([^\\r\\n]+)/);
                if (bg) {
                    const parts = bg[1].split(',').map(Number);
                    if (parts.length >= 3) {
                        isDark = (parts[0]*0.299 + parts[1]*0.587 + parts[2]*0.114) < 128;
                    }
                }
            }
        }
    } catch (_) {}
    const fileName = isDark ? 'trayIconLinux-Dark.png' : 'trayIconLinux.png';
    const candidatePaths = [
        path.join(process.resourcesPath || '', fileName),
        path.join(require('os').homedir(), '.config', 'Antigravity', 'i18n', fileName),
        path.join(__dirname, '..', fileName),
        path.join(process.resourcesPath || '', 'trayIconLinux-Dark.png'),
        path.join(require('os').homedir(), '.config', 'Antigravity', 'i18n', 'trayIconLinux-Dark.png'),
        path.join(process.resourcesPath || '', 'trayIcon-Dark.png'),
        path.join(require('os').homedir(), '.config', 'Antigravity', 'i18n', 'trayIcon-Dark.png'),
        path.join(__dirname, '..', 'trayIcon-Dark.png'),
        path.join(process.resourcesPath || '', 'trayTemplate.png'),
        path.join(__dirname, '..', 'trayTemplate.png')
    ];
    for (const c of candidatePaths) {
        try {
            if (require('fs').existsSync(c)) {
                return c;
            }
        } catch (_) {}
    }
    return path.join(__dirname, '..', 'icon.png');
}

/**
 * Creates a system tray icon with a context menu to focus a window or quit the app.
 *
 * For macOS it uses a template image to automatically handle light/dark mode.
 * On Linux and Windows it uses a theme-aware monochrome icon with no background (matching Claude style).
 */
function createTray(actions, onClick) {
    const iconPath = getTrayIconPath();
    const icon = electron_1.nativeImage.createFromPath(iconPath);
    if ((0, utils_1.isMacOS)()) {
        icon.setTemplateImage(true);
    }
    tray = new electron_1.Tray(icon);
    tray.setToolTip(electron_1.app.getName());
    contextMenu = electron_1.Menu.buildFromTemplate(actions);
    tray.setContextMenu(contextMenu);

    const handleTrayClick = (event) => {
        const now = Date.now();
        if (now - lastTrayClickMs < 150) return;
        lastTrayClickMs = now;
        if (typeof onClick === 'function') {
            try {
                onClick(event);
                return;
            } catch (_) {}
        }
        activateAppWindow();
    };

    if (!(0, utils_1.isMacOS)()) {
        tray.on('click', handleTrayClick);
        tray.on('double-click', handleTrayClick);
    }

    if (electron_1.nativeTheme && !(0, utils_1.isMacOS)()) {
        electron_1.nativeTheme.on('updated', () => {
            if (tray && !tray.isDestroyed()) {
                try {
                    const newPath = getTrayIconPath();
                    const newIcon = electron_1.nativeImage.createFromPath(newPath);
                    tray.setImage(newIcon);
                } catch (e) {}
            }
        });
    }
}
`;

  if (trayBlockPattern.test(out)) {
    out = out.replace(trayBlockPattern, newTrayBlock);
  }
  return out;
}

function patchUpdater(code) {
  let out = code
    .replace('MenuUpdateStep["CheckForUpdates"] = "Check for Updates";', 'MenuUpdateStep["CheckForUpdates"] = "Verificar atualizações";')
    .replace('MenuUpdateStep["CheckingForUpdates"] = "Checking for Updates...";', 'MenuUpdateStep["CheckingForUpdates"] = "Verificando atualizações...";')
    .replace('MenuUpdateStep["DownloadingUpdate"] = "Downloading Update...";', 'MenuUpdateStep["DownloadingUpdate"] = "Baixando atualização...";')
    .replace('MenuUpdateStep["RestartToUpdate"] = "Restart to Update";', 'MenuUpdateStep["RestartToUpdate"] = "Reiniciar para atualizar";')
    .replace("title: 'Check for Updates'", "title: 'Verificar atualizações'")
    .replace("message: 'No updates available'", "message: 'Nenhuma atualização disponível'");

  if (!out.includes('// Cambrith: Linux Standalone Auto-Updater')) {
    const linuxUpdaterBlock = `
// Cambrith: Linux Standalone Auto-Updater
let downloadedUpdatePath = null;
let downloadedUpdateVersion = null;
let isUpdateDownloading = false;

function compareVersions(v1, v2) {
    const p1 = (v1 || '').replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
    const p2 = (v2 || '').replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        const num1 = p1[i] || 0;
        const num2 = p2[i] || 0;
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }
    return 0;
}

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const https = require('https');
        const req = https.get(url, { headers }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location, headers).then(resolve, reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error('HTTP ' + res.statusCode + ': ' + res.statusMessage));
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        });
        req.on('error', reject);
        req.setTimeout(25000, () => {
            req.destroy(new Error('Tempo limite esgotado ao contatar o servidor de atualização'));
        });
    });
}

function downloadFile(url, destPath, onProgress, redirects = 0) {
    return new Promise((resolve, reject) => {
        const https = require('https');
        const fs = require('fs');
        // Baixa para um arquivo temporário e só renomeia quando o tamanho confere,
        // para que uma falha ou outra instância nunca deixe um .tar.gz truncado.
        const partPath = destPath + '.part-' + process.pid;
        const cleanup = () => { try { fs.unlinkSync(partPath); } catch (_) {} };
        const req = https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                res.resume();
                if (redirects >= 5) return reject(new Error('Redirecionamentos demais'));
                return downloadFile(new URL(res.headers.location, url).toString(), destPath, onProgress, redirects + 1).then(resolve, reject);
            }
            if (res.statusCode !== 200) {
                res.resume();
                return reject(new Error('HTTP ' + res.statusCode + ': ' + res.statusMessage));
            }
            const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
            let receivedBytes = 0;
            const file = fs.createWriteStream(partPath);
            res.on('data', (chunk) => {
                receivedBytes += chunk.length;
                if (onProgress && totalBytes > 0) {
                    onProgress(receivedBytes, totalBytes);
                }
            });
            res.on('error', (err) => { file.destroy(); cleanup(); reject(err); });
            res.on('close', () => {
                if (!res.complete) {
                    file.destroy();
                    cleanup();
                    reject(new Error('Conexão interrompida durante o download'));
                }
            });
            file.on('error', (err) => { cleanup(); reject(err); });
            res.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    if (!res.complete || (totalBytes > 0 && receivedBytes !== totalBytes)) {
                        cleanup();
                        return reject(new Error('Download incompleto (' + receivedBytes + ' de ' + totalBytes + ' bytes)'));
                    }
                    try {
                        fs.renameSync(partPath, destPath);
                    } catch (e) {
                        cleanup();
                        return reject(e);
                    }
                    resolve(destPath);
                });
            });
        });
        req.on('error', (err) => {
            cleanup();
            reject(err);
        });
        req.setTimeout(900000, () => {
            req.destroy(new Error('Tempo limite esgotado durante o download'));
        });
    });
}

function parseManifest(text) {
    let version = null;
    let url = null;
    const vMatch = text.match(/^\\s*version:\\s*([0-9a-zA-Z.-]+)/m);
    if (vMatch) version = vMatch[1].trim();
    const uMatch = text.match(/^\\s*-\\s*url:\\s*(https?:\\/\\/[^\\s]+)/m);
    if (uMatch) url = uMatch[1].trim();
    return { version, url };
}

function getManifestUrl() {
    try {
        const fs = require('fs');
        const path = require('path');
        const updateYmlPath = path.join(process.resourcesPath, 'app-update.yml');
        if (fs.existsSync(updateYmlPath)) {
            const raw = fs.readFileSync(updateYmlPath, 'utf8');
            const m = raw.match(/^\\s*url:\\s*([^\\s]+)/m);
            if (m) {
                let base = m[1].trim();
                if (!base.endsWith('/')) base += '/';
                return base + 'latest-x64-linux.yml';
            }
        }
    } catch (_) {}
    return 'https://antigravity-hub-auto-updater-974169037036.us-central1.run.app/manifest/latest-x64-linux.yml';
}

async function linuxCheckForUpdates(isManual = false) {
    if (isUpdateDownloading) return;
    isManualCheck = isManual;
    console.log('[AutoUpdater-Linux] Verificando atualizações no canal oficial...');
    broadcastState({ type: types_1.UpdateState.CheckingForUpdates });
    updateMenuState(MenuUpdateStep.CheckingForUpdates);

    try {
        const manifestUrl = getManifestUrl();
        const currentVersion = electron_1.app.getVersion();
        const rawBuf = await fetchUrl(manifestUrl, { 'x-app-version': currentVersion });
        const manifest = parseManifest(rawBuf.toString('utf8'));

        if (!manifest || !manifest.version) {
            throw new Error('Resposta do manifesto de atualização inválida');
        }

        const remoteVersion = manifest.version;
        const hasNewer = compareVersions(remoteVersion, currentVersion) > 0;

        if (hasNewer && manifest.url) {
            console.log(\`[AutoUpdater-Linux] Nova versão detectada: \${remoteVersion} (instalada: \${currentVersion})\`);
            broadcastState({
                type: types_1.UpdateState.AvailableForDownload,
                update: { version: remoteVersion }
            });
            updateMenuState(MenuUpdateStep.DownloadingUpdate);
            isUpdateDownloading = true;

            const sampleUrl = manifest.url;
            const downloadUrl = sampleUrl.replace(/\\/Antigravity\\.(AppImage|deb)$/, '/Antigravity.tar.gz');

            const cacheDir = path.join(electron_1.app.getPath('userData'), 'updater-cache');
            const fs = require('fs');
            if (!fs.existsSync(cacheDir)) {
                fs.mkdirSync(cacheDir, { recursive: true });
            }
            const destTar = path.join(cacheDir, \`Antigravity-\${remoteVersion}.tar.gz\`);

            // destTar só existe se um download anterior terminou completo (rename atômico).
            if (fs.existsSync(destTar)) {
                console.log(\`[AutoUpdater-Linux] Pacote \${remoteVersion} já baixado, reutilizando.\`);
            } else {
                console.log(\`[AutoUpdater-Linux] Baixando pacote oficial \${downloadUrl}...\`);
                await downloadFile(downloadUrl, destTar, (rec, total) => {
                    broadcastState({ type: types_1.UpdateState.Downloading });
                });
            }

            isUpdateDownloading = false;
            downloadedUpdatePath = destTar;
            downloadedUpdateVersion = remoteVersion;

            console.log(\`[AutoUpdater-Linux] Atualização \${remoteVersion} pronta em \${destTar}\`);
            broadcastState({
                type: types_1.UpdateState.Ready,
                update: { version: remoteVersion }
            });
            updateMenuState(MenuUpdateStep.RestartToUpdate);

            if (isManual) {
                const win = electron_1.BrowserWindow.getFocusedWindow();
                const options = {
                    type: 'info',
                    title: 'Atualização Pronta',
                    message: \`O Google Antigravity \${remoteVersion} foi baixado com sucesso!\\n\\nDeseja reiniciar agora para concluir a instalação?\`,
                    buttons: ['Reiniciar agora', 'Mais tarde'],
                    defaultId: 0,
                    cancelId: 1
                };
                const onBtn = (res) => {
                    if (res && res.response === 0) {
                        quitAndInstall();
                    }
                };
                if (win) {
                    electron_1.dialog.showMessageBox(win, options).then(onBtn);
                } else {
                    electron_1.dialog.showMessageBox(options).then(onBtn);
                }
            }
        } else {
            console.log(\`[AutoUpdater-Linux] O aplicativo já está atualizado (\${currentVersion})\`);
            broadcastState({ type: types_1.UpdateState.Idle });
            updateMenuState(MenuUpdateStep.CheckForUpdates);

            if (isManual) {
                const win = electron_1.BrowserWindow.getFocusedWindow();
                const options = {
                    type: 'info',
                    title: 'Verificar atualizações',
                    message: \`O Google Antigravity já está na versão mais recente (\${currentVersion}).\`,
                    buttons: ['OK'],
                };
                if (win) {
                    electron_1.dialog.showMessageBox(win, options);
                } else {
                    electron_1.dialog.showMessageBox(options);
                }
            }
        }
    } catch (err) {
        isUpdateDownloading = false;
        console.error('[AutoUpdater-Linux] Falha:', err.message);
        broadcastState({ type: types_1.UpdateState.Idle });
        updateMenuState(MenuUpdateStep.CheckForUpdates);
        if (isManual) {
            const win = electron_1.BrowserWindow.getFocusedWindow();
            const options = {
                type: 'error',
                title: 'Verificar atualizações',
                message: \`Não foi possível verificar atualizações no momento.\\nMotivo: \${err.message}\`,
                buttons: ['OK'],
            };
            if (win) {
                electron_1.dialog.showMessageBox(win, options);
            } else {
                electron_1.dialog.showMessageBox(options);
            }
        }
    }
}

function linuxQuitAndInstall() {
    const fs = require('fs');
    const os = require('os');
    const path = require('path');
    if (!downloadedUpdatePath || !fs.existsSync(downloadedUpdatePath)) {
        electron_updater_1.autoUpdater.quitAndInstall();
        return;
    }

    console.log('[AutoUpdater-Linux] Aplicando atualização e agendando reinício...');
    const currentPid = process.pid;
    const appDir = path.dirname(process.execPath);
    const tarFile = downloadedUpdatePath;
    const version = downloadedUpdateVersion || '?';
    const patcherScript = path.join(os.homedir(), '.config', 'Antigravity', 'i18n', 'patch-asar.js');
    const launcher = path.join(os.homedir(), '.local', 'bin', 'antigravity');
    const logFile = path.join(os.homedir(), '.local', 'state', 'antigravity-cambrith', 'update-guard.log');

    // Extrai e personaliza em um diretório temporário ao lado do app e só então troca
    // os diretórios: se algo falhar, a versão atual continua intacta. A versão antiga
    // fica em <app>.anterior para rollback.
    const script = \`
        APPDIR="\${appDir}"
        TAR="\${tarFile}"
        PATCHER="\${patcherScript}"
        LAUNCHER="\${launcher}"
        LOG="\${logFile}"
        mkdir -p "$(dirname "$LOG")"
        exec >>"$LOG" 2>&1
        echo "[$(date -Is)] Atualizando para \${version}: aguardando o app fechar"
        while kill -0 \${currentPid} 2>/dev/null; do sleep 0.4; done
        sleep 1
        STAGE="$APPDIR.novo"
        OLD="$APPDIR.anterior"
        rm -rf "$STAGE"
        mkdir -p "$STAGE"
        if tar -xzf "$TAR" -C "$STAGE" --strip-components=1 && [ -x "$STAGE/antigravity" ] && [ -f "$STAGE/resources/app.asar" ]; then
            chmod +x "$STAGE/antigravity" 2>/dev/null || true
            if [ -f "$PATCHER" ]; then
                ELECTRON_RUN_AS_NODE=1 ELECTRON_NO_ASAR=1 "$STAGE/antigravity" "$PATCHER" "--asar=$STAGE/resources/app.asar" \\\\
                    || echo "[$(date -Is)] Aviso: falha ao reaplicar as personalizações; app atualizado sem elas"
            fi
            rm -rf "$OLD"
            if mv "$APPDIR" "$OLD" && mv "$STAGE" "$APPDIR"; then
                echo "[$(date -Is)] Atualização para \${version} concluída"
                rm -f "$TAR"
            else
                echo "[$(date -Is)] Erro ao trocar os diretórios; restaurando versão anterior"
                [ -d "$APPDIR" ] || mv "$OLD" "$APPDIR"
            fi
        else
            echo "[$(date -Is)] Erro ao extrair o pacote; mantendo a versão atual"
            rm -rf "$STAGE"
        fi
        if [ -x "$LAUNCHER" ]; then
            setsid "$LAUNCHER" >/dev/null 2>&1 &
        else
            setsid "$APPDIR/antigravity" >/dev/null 2>&1 &
        fi
    \`;

    try {
        const child = child_process_1.spawn('sh', ['-c', script], {
            detached: true,
            stdio: 'ignore'
        });
        child.unref();
    } catch (e) {
        console.error('[AutoUpdater-Linux] Falha ao agendar reinício:', e);
    }
    electron_1.app.quit();
}
`;
    out = out.replace(
      "function checkForUpdates(isManual = false) {",
      `${linuxUpdaterBlock}\nfunction checkForUpdates(isManual = false) {\n    if (process.platform === 'linux' && !process.env.APPIMAGE) {\n        return linuxCheckForUpdates(isManual);\n    }`
    );
    out = out.replace(
      "function quitAndInstall() {",
      "function quitAndInstall() {\n    if (process.platform === 'linux' && !process.env.APPIMAGE) {\n        return linuxQuitAndInstall();\n    }"
    );
    if (!out.includes('return linuxCheckForUpdates(isManual)') || !out.includes('return linuxQuitAndInstall()')) {
      log('AVISO: não foi possível injetar o atualizador Linux em dist/updater.js (código do app mudou?).');
    }
  }
  return out;
}

function patchIpcHandlers(code) {
  let out = code;
  // Cambrith: Garante tema escuro do GTK/Electron antes de abrir o menu de contexto nativo
  if (!out.includes("electron_1.nativeTheme.themeSource = 'dark'")) {
    out = out.replace(
      "electron_1.ipcMain.handle('window:show-context-menu', async (_event, items) => {",
      "electron_1.ipcMain.handle('window:show-context-menu', async (_event, items) => {\n        try { electron_1.nativeTheme.themeSource = 'dark'; } catch (_) {}"
    );
  }
  // Cambrith: Ao fechar pela interface (botão X), salva como a janela mais recente e oculta preservando o ícone na bandeja
  out = out.replace(
    /electron_1\.ipcMain\.handle\('window:close',\s*async\s*\([^)]*\)\s*=>\s*\{[\s\S]*?win\.(?:close|hide)\(\);\s*\}\s*\}\);/,
    `electron_1.ipcMain.handle('window:close', async (_event) => {
        const win = (_event && _event.sender ? electron_1.BrowserWindow.fromWebContents(_event.sender) : null) || electron_1.BrowserWindow.getFocusedWindow() || global.__cambrithLastFocusedWindow || electron_1.BrowserWindow.getAllWindows()[0];
        if (win && !win.isDestroyed()) {
            win.__lastClosedTime = Date.now();
            global.__cambrithLastClosedWindow = win;
            if (typeof global.__cambrithSaveWindowState === 'function') {
                try { global.__cambrithSaveWindowState(win); } catch (_) {}
            }
            win.hide();
        }
    });`
  );
  // Cambrith: Tradução nativa de notificações no Electron (conclusão de tarefas e pedidos de ação)
  const notifPattern = /electron_1\.ipcMain\.handle\('notification:send',\s*\(_,\s*options\)\s*=>\s*\{[\s\S]*?const notification = new electron_1\.Notification\(\{[\s\S]*?title:\s*options\.title,[\s\S]*?body:\s*options\.body,[\s\S]*?silent:\s*options\.silent\s*\?\?\s*false,[\s\S]*?\}\);/;
  if (notifPattern.test(out)) {
    out = out.replace(notifPattern, `electron_1.ipcMain.handle('notification:send', (_, options) => {
        let title = options?.title;
        let body = options?.body;
        if (typeof body === 'string') {
            if (body.startsWith('Agent finished: ')) {
                body = 'O agente concluiu: ' + body.slice('Agent finished: '.length);
            } else if (body === 'Agent finished') {
                body = 'O agente concluiu a tarefa';
            } else if (body === 'The agent is waiting for your input.') {
                body = 'O agente está aguardando sua resposta.';
            } else if (body === 'Click to respond to the question.') {
                body = 'Clique para responder à pergunta.';
            } else if (body === 'Click to respond to the questions.') {
                body = 'Clique para responder às perguntas.';
            } else if (body.startsWith('Command: ')) {
                body = 'Comando: ' + body.slice('Command: '.length);
            } else if (body.startsWith('Code: ')) {
                body = 'Código: ' + body.slice('Code: '.length);
            } else if (body.startsWith('URL: ')) {
                body = 'URL: ' + body.slice('URL: '.length);
            }
        }
        if (typeof title === 'string') {
            if (title === 'Action requires your attention') {
                title = 'Uma ação requer sua atenção';
            } else if (title === 'The agent has a question for you:') {
                title = 'O agente tem uma pergunta para você:';
            } else if (title === 'The agent has questions for you:') {
                title = 'O agente tem perguntas para você:';
            } else if (title === 'Requesting your permission in Terminal:') {
                title = 'Solicitando sua permissão no Terminal:';
            } else if (title === 'Requesting your permission to execute JavaScript:') {
                title = 'Solicitando sua permissão para executar JavaScript:';
            } else if (title === 'Requesting your permission to open URL:') {
                title = 'Solicitando sua permissão para abrir URL:';
            } else if (title === 'Requesting your permission:') {
                title = 'Solicitando sua permissão:';
            }
        }
        const notification = new electron_1.Notification({
            title: title,
            body: body,
            silent: options?.silent ?? false,
        });`);
  }
  out = out.replace("electron_updater_1.autoUpdater.quitAndInstall();", "(0, updater_1.quitAndInstall)();");
  return out;
}

function patchSettingsService(code) {
  return code.replace(
    "[SettingKey.RUN_IN_BACKGROUND, process.platform === 'darwin'],",
    "[SettingKey.RUN_IN_BACKGROUND, true],"
  );
}

function run() {
  if (!fs.existsSync(ASAR_PATH)) {
    log(`Arquivo ASAR não encontrado: ${ASAR_PATH}`);
    log('Dica: Use --asar=<caminho/app.asar> para especificar o caminho manualmente.');
    process.exit(1);
  }

  // 1. Sincronizar cópia golden e cópia em resources
  try {
    if (!fs.existsSync(GOLDEN_DIR)) {
      fs.mkdirSync(GOLDEN_DIR, { recursive: true });
    }
    const customThemesPath = path.join(GOLDEN_DIR, 'custom-themes.json');
    if (!fs.existsSync(customThemesPath)) {
      const defaultPresets = [
        { name: "Dracula Purple", mode: "dark", background: "#282A36", foregroundOverride: "#F8F8F2", primary: "#BD93F9", isDefault: true },
        { name: "Cyber Neon", mode: "dark", background: "#0D1117", foregroundOverride: "#E6EDF3", primary: "#00FF66", isDefault: true },
        { name: "Gentoo Cyber Lilás", mode: "dark", background: "#16141F", foregroundOverride: "#EDE7F6", primary: "#C084FC", isDefault: true },
        { name: "Tokyo Night", mode: "dark", background: "#1A1B26", foregroundOverride: "#C0CAF5", primary: "#7AA2F7", isDefault: true },
        { name: "Gruvbox Dark", mode: "dark", background: "#282828", foregroundOverride: "#EBDBB2", primary: "#FE8019", isDefault: true },
        { name: "Clean Minimalist", mode: "light", background: "#FFFFFF", foregroundOverride: "#18181B", primary: "#2563EB", isDefault: true },
        { name: "Solarized Light", mode: "light", background: "#FDF6E3", foregroundOverride: "#657B83", primary: "#268BD2", isDefault: true },
        { name: "Rosé Pine Dawn", mode: "light", background: "#FAF4ED", foregroundOverride: "#575279", primary: "#D7827E", isDefault: true }
      ];
      fs.writeFileSync(customThemesPath, JSON.stringify(defaultPresets, null, 2), 'utf8');
      log(`custom-themes.json inicializado com predefinições em ${customThemesPath}.`);
    }
  } catch (err) {
    log(`Aviso ao verificar custom-themes.json: ${err.message}`);
  }

  try {
    const srcFile = fs.existsSync(SOURCE_I18N) ? SOURCE_I18N : (fs.existsSync(GOLDEN_I18N) ? GOLDEN_I18N : null);
    if (srcFile) {
      if (!fs.existsSync(GOLDEN_DIR)) {
        fs.mkdirSync(GOLDEN_DIR, { recursive: true });
      }
      fs.copyFileSync(srcFile, GOLDEN_I18N);
      if (fs.existsSync(RESOURCES_DIR)) {
        fs.copyFileSync(srcFile, TARGET_I18N);
      }
      log(`i18n-pt-br.js sincronizado com sucesso.`);
    }
  } catch (err) {
    log(`Aviso ao sincronizar i18n-pt-br.js: ${err.message}`);
  }
  try {
    const srcControls = fs.existsSync(SOURCE_CONTROLS) ? SOURCE_CONTROLS : (fs.existsSync(GOLDEN_CONTROLS) ? GOLDEN_CONTROLS : null);
    if (srcControls) {
      if (!fs.existsSync(GOLDEN_DIR)) {
        fs.mkdirSync(GOLDEN_DIR, { recursive: true });
      }
      fs.copyFileSync(srcControls, GOLDEN_CONTROLS);
      if (fs.existsSync(RESOURCES_DIR)) {
        fs.copyFileSync(srcControls, TARGET_CONTROLS);
      }
    }
  } catch (err) {
    log(`Aviso ao sincronizar controles da janela: ${err.message}`);
  }
  try {
    const iconNames = [
      'icon.png',
      'trayIconLinux-Dark.png',
      'trayIconLinux.png',
      'trayIconLinux-Dark@2x.png',
      'trayIconLinux@2x.png',
      'trayIcon-Dark.png',
      'trayIcon-Dark@2x.png',
      'trayIcon.png',
      'trayIcon@2x.png'
    ];
    for (const name of iconNames) {
      const sPath = path.join(__dirname, name);
      const gPath = path.join(GOLDEN_DIR, name);
      const rPath = path.join(RESOURCES_DIR, name);
      if (fs.existsSync(sPath) && path.resolve(sPath) !== path.resolve(gPath)) {
        fs.copyFileSync(sPath, gPath);
      }
      if (fs.existsSync(gPath)) {
        fs.copyFileSync(gPath, rPath);
      } else if (fs.existsSync(rPath)) {
        fs.copyFileSync(rPath, gPath);
      }
    }
  } catch (err) {
    log(`Aviso ao sincronizar ícones de bandeja: ${err.message}`);
  }

  // 2. Ler ASAR e verificar assinatura
  const buf = fs.readFileSync(ASAR_PATH);
  const isForce = process.argv.includes('--force');
  if (buf.includes(Buffer.from(PATCH_SIGNATURE)) && !isForce) {
    log(`O arquivo app.asar já está traduzido (${PATCH_SIGNATURE}).`);
    return;
  }

  log(`Aplicando tradução em ${ASAR_PATH}...`);
  const startMs = Date.now();

  // Backup do original
  const backupPath = `${ASAR_PATH}.bak-original`;
  if (!buf.includes(Buffer.from('Cambrith pt-BR Localization Injection'))) {
    try {
      fs.copyFileSync(ASAR_PATH, backupPath);
      log(`Backup do arquivo original salvo em: ${backupPath}`);
    } catch (_) {}
  }

  // Sempre que houver backup original limpo e for force rebuild, usar a base original para evitar deriva de offsets
  const srcBuf = (fs.existsSync(backupPath) && !backupPath.includes('.tmp')) ? fs.readFileSync(backupPath) : buf;
  const headerSize = srcBuf.readUInt32LE(4);
  const jsonSize = srcBuf.readUInt32LE(12);
  const dataOffset = 8 + headerSize;
  const header = JSON.parse(srcBuf.toString('utf8', 16, 16 + jsonSize));

  const patchers = {
    'dist/preload.js': patchPreload,
    'dist/utils.js': patchUtils,
    'dist/ipcHandlers.js': patchIpcHandlers,
    'dist/main.js': patchMain,
    'dist/menu.js': patchMenu,
    'dist/tray.js': patchTray,
    'dist/updater.js': patchUpdater,
    'dist/services/settingsService.js': patchSettingsService,
  };

  const chunks = [];
  let currentOffset = 0;

  function traverse(node, relPath) {
    if (node.files) {
      for (const [name, child] of Object.entries(node.files)) {
        traverse(child, relPath ? `${relPath}/${name}` : name);
      }
      return;
    }
    if (node.unpacked) {
      return;
    }
    if (node.offset !== undefined && node.size !== undefined) {
      const oldOffset = Number(node.offset);
      let fileBuf = srcBuf.subarray(dataOffset + oldOffset, dataOffset + oldOffset + node.size);

      if (relPath === 'icon.png') {
        const customIconPath = path.join(GOLDEN_DIR, 'icon.png');
        if (fs.existsSync(customIconPath)) {
          fileBuf = fs.readFileSync(customIconPath);
          node.size = fileBuf.length;
          node.integrity = calcIntegrity(fileBuf);
          log(`Substituído ícone do app: ${relPath} (${fileBuf.length} bytes)`);
        }
      } else if (relPath === 'trayTemplate.png' || relPath === 'trayTemplate@2x.png') {
        const trayReplacement = relPath.includes('@2x') ? 'trayIconLinux-Dark@2x.png' : 'trayIconLinux-Dark.png';
        const customTrayPath = path.join(GOLDEN_DIR, trayReplacement);
        if (fs.existsSync(customTrayPath)) {
          fileBuf = fs.readFileSync(customTrayPath);
          node.size = fileBuf.length;
          node.integrity = calcIntegrity(fileBuf);
          log(`Substituído ícone de bandeja: ${relPath} (${fileBuf.length} bytes)`);
        }
      } else if (patchers[relPath]) {
        const origStr = fileBuf.toString('utf8');
        const patchedStr = patchers[relPath](origStr);
        new vm.Script(patchedStr, { filename: relPath });
        if (patchedStr !== origStr) {
          fileBuf = Buffer.from(patchedStr, 'utf8');
          node.size = fileBuf.length;
          node.integrity = calcIntegrity(fileBuf);
          log(`Injetado: ${relPath} (${fileBuf.length} bytes)`);
        }
      }

      node.offset = String(currentOffset);
      chunks.push(fileBuf);
      currentOffset += fileBuf.length;
    }
  }

  traverse(header, '');

  const newJsonBuf = Buffer.from(JSON.stringify(header), 'utf8');
  const jsonLen = newJsonBuf.length;
  const alignedJsonLen = Math.ceil(jsonLen / 4) * 4;
  const newHeaderSize = alignedJsonLen + 8;
  const headerBuf = Buffer.alloc(16 + alignedJsonLen, 0);

  headerBuf.writeUInt32LE(4, 0);
  headerBuf.writeUInt32LE(newHeaderSize, 4);
  headerBuf.writeUInt32LE(alignedJsonLen + 4, 8);
  headerBuf.writeUInt32LE(jsonLen, 12);
  newJsonBuf.copy(headerBuf, 16);

  const outBuf = Buffer.concat([headerBuf, ...chunks]);
  const tmpAsar = `${ASAR_PATH}.tmp-${process.pid}`;
  fs.writeFileSync(tmpAsar, outBuf);
  fs.renameSync(tmpAsar, ASAR_PATH);

  log(`Sucesso! app.asar traduzido e atualizado em ${Date.now() - startMs}ms.`);
}

try {
  run();
} catch (err) {
  log(`Erro ao aplicar tradução: ${err.stack || err.message}`);
  process.exit(1);
}
