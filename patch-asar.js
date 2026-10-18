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

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');
const os = require('os');

const PATCH_SIGNATURE = 'Cambrith pt-BR Localization Injection v12';

// 1. Resolução Multiplataforma de Caminhos
function detectAsarPath() {
  // Se passado por argumento
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--asar=')) {
      return arg.split('=')[1];
    }
    if (!arg.startsWith('-') && fs.existsSync(arg) && arg.endsWith('.asar')) {
      return arg;
    }
  }

  const home = os.homedir();
  const platform = process.platform;

  let candidates = [];
  if (platform === 'linux') {
    candidates = [
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
                    createReadme: (folderName, projectName) => {
                        try {
                            const targetDir = path.join(os.homedir(), 'Documents', 'antigravity', folderName);
                            if (fs.existsSync(targetDir)) {
                                const readmePath = path.join(targetDir, 'README.md');
                                if (!fs.existsSync(readmePath)) {
                                    const titleStr = projectName || folderName;
                                    const content = '# ' + titleStr + '\\n\\nProjeto criado no Google Antigravity.\\n\\n## Visao Geral\\n\\nAmbiente inicializado via Cambrith OS.\\n';
                                    fs.writeFileSync(readmePath, content, 'utf8');
                                }
                            }
                        } catch (e) {
                            console.warn('[Cambrith] Erro ao criar README:', e);
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
  return out;
}

function patchMain(code) {
  return code
    .replace("label: 'No agents running'", "label: 'Nenhum agente em execução'")
    .replace("label: 'Quit'", "label: 'Sair'")
    .replace("buttons: ['Cancel', 'Quit']", "buttons: ['Cancelar', 'Sair']")
    .replace("title: 'Confirm Quit'", "title: 'Confirmar saída'")
    .replace("message: 'Are you sure you want to quit?'", "message: 'Tem certeza de que deseja sair?'")
    .replace("detail: 'There may be agents or background tasks running.'", "detail: 'Pode haver agentes ou tarefas em segundo plano em execução.'");
}

function patchMenu(code) {
  return code
    .replace("label: 'New Window'", "label: 'Nova janela'")
    .replace("label: 'Docs'", "label: 'Documentação'")
    .replace("label: 'Connect to WSL'", "label: 'Conectar ao WSL'")
    .replace("label: 'Reopen Locally'", "label: 'Reabrir localmente'");
}

function patchTray(code) {
  return code.replace(
    /\(count > 0 \? `\$\{count\}` : 'No'\) \+\s*' agent' \+\s*\(count === 1 \? '' : 's'\) \+\s*' running'/,
    "count > 0 ? `${count} ${count === 1 ? 'agente em execução' : 'agentes em execução'}` : 'Nenhum agente em execução'"
  );
}

function patchUpdater(code) {
  return code
    .replace('MenuUpdateStep["CheckForUpdates"] = "Check for Updates";', 'MenuUpdateStep["CheckForUpdates"] = "Verificar atualizações";')
    .replace('MenuUpdateStep["CheckingForUpdates"] = "Checking for Updates...";', 'MenuUpdateStep["CheckingForUpdates"] = "Verificando atualizações...";')
    .replace('MenuUpdateStep["DownloadingUpdate"] = "Downloading Update...";', 'MenuUpdateStep["DownloadingUpdate"] = "Baixando atualização...";')
    .replace('MenuUpdateStep["RestartToUpdate"] = "Restart to Update";', 'MenuUpdateStep["RestartToUpdate"] = "Reiniciar para atualizar";')
    .replace("title: 'Check for Updates'", "title: 'Verificar atualizações'")
    .replace("message: 'No updates available'", "message: 'Nenhuma atualização disponível'");
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
  return out;
}

function run() {
  if (!fs.existsSync(ASAR_PATH)) {
    log(`Arquivo ASAR não encontrado: ${ASAR_PATH}`);
    log('Dica: Use --asar=<caminho/app.asar> para especificar o caminho manualmente.');
    process.exit(1);
  }

  // 1. Sincronizar cópia golden e cópia em resources
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
    if (fs.existsSync(SOURCE_CONTROLS) && fs.existsSync(RESOURCES_DIR)) {
      fs.copyFileSync(SOURCE_CONTROLS, TARGET_CONTROLS);
    }
  } catch (err) {
    log(`Aviso ao sincronizar controles da janela: ${err.message}`);
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
  if (!fs.existsSync(backupPath) && !buf.includes(Buffer.from('Cambrith pt-BR Localization Injection'))) {
    try {
      fs.copyFileSync(ASAR_PATH, backupPath);
      log(`Backup do arquivo original salvo em: ${backupPath}`);
    } catch (_) {}
  }

  const headerSize = buf.readUInt32LE(4);
  const jsonSize = buf.readUInt32LE(12);
  const dataOffset = 8 + headerSize;
  const header = JSON.parse(buf.toString('utf8', 16, 16 + jsonSize));

  const patchers = {
    'dist/preload.js': patchPreload,
    'dist/utils.js': patchUtils,
    'dist/ipcHandlers.js': patchIpcHandlers,
    'dist/main.js': patchMain,
    'dist/menu.js': patchMenu,
    'dist/tray.js': patchTray,
    'dist/updater.js': patchUpdater,
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
      let fileBuf = buf.subarray(dataOffset + oldOffset, dataOffset + oldOffset + node.size);

      if (patchers[relPath]) {
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
