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

const PATCH_SIGNATURE = 'Cambrith pt-BR Localization Injection v3';

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
const BACKUP_PATH = `${ASAR_PATH}.bak-original`;
const MANIFEST_PATH = `${ASAR_PATH}.cambrith-backup.json`;

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function restoreOriginal() {
  if (!fs.existsSync(MANIFEST_PATH) || !fs.existsSync(BACKUP_PATH)) {
    throw new Error('Restauração bloqueada: backup legado sem manifesto verificável. Reinstale a mesma versão oficial para restaurar com segurança.');
  }
  const meta = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  if (meta.schemaVersion !== 1 ||
      !/^[a-f0-9]{64}$/.test(meta.originalSha256 || '') ||
      !/^[a-f0-9]{64}$/.test(meta.patchedSha256 || '')) {
    throw new Error('Restauração bloqueada: manifesto inválido.');
  }
  const current = fs.readFileSync(ASAR_PATH);
  const original = fs.readFileSync(BACKUP_PATH);
  if (sha256(current) !== meta.patchedSha256) {
    throw new Error('Restauração bloqueada: aplicativo alterado/atualizado após o patch. O backup pode ser de outra versão.');
  }
  if (sha256(original) !== meta.originalSha256) {
    throw new Error('Restauração bloqueada: backup corrompido ou não correspondente.');
  }
  const tmp = `${ASAR_PATH}.restore-${process.pid}`;
  try {
    fs.writeFileSync(tmp, original, { flag: 'wx' });
    fs.renameSync(tmp, ASAR_PATH);
    fs.rmSync(MANIFEST_PATH);
    if (fs.existsSync(TARGET_I18N)) fs.rmSync(TARGET_I18N);
    log('Aplicativo original restaurado com hashes verificados.');
  } finally {
    if (fs.existsSync(tmp)) fs.rmSync(tmp);
  }
}

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
            'Pin': 'Fixar',
            'Unpin': 'Desafixar',
            'Open': 'Abrir'
        };
        const trItems = (arr) => Array.isArray(arr) ? arr.map(it => ({
            ...it,
            label: (it && it.label && trMap[it.label]) ? trMap[it.label] : (it && it.label && /^Version\\s+(.+)$/i.test(it.label) ? it.label.replace(/^Version\\s+(.+)$/i, 'Versão $1') : (it ? it.label : undefined)),
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
            } catch (_) {}
        });`;

  if (out.includes("win.webContents.on('dom-ready'")) {
    out = out.replace(/win\.webContents\.on\('dom-ready',\s*\(\)\s*=>\s*\{[\s\S]*?\n        \}\);(?=\n        win\.webContents\.on\('did-finish-load')/, domReadyHook);
  } else if (out.includes("win.webContents.on('did-finish-load', () => {")) {
    out = out.replace("win.webContents.on('did-finish-load', () => {", domReadyHook + "\n        win.webContents.on('did-finish-load', () => {");
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

function run() {
  if (!fs.existsSync(ASAR_PATH)) {
    log(`Arquivo ASAR não encontrado: ${ASAR_PATH}`);
    log('Dica: Use --asar=<caminho/app.asar> para especificar o caminho manualmente.');
    process.exit(1);
  }

  if (process.argv.includes('--restore')) {
    restoreOriginal();
    return;
  }

  // Nunca interpretar um app já modificado como versão oficial limpa.
  const initialBuf = fs.readFileSync(ASAR_PATH);
  if (initialBuf.includes(Buffer.from('Cambrith pt-BR Localization Injection'))) {
    if (process.argv.includes('--force')) {
      throw new Error('Patch forçado bloqueado em instalação já modificada. Restaure uma versão original verificada antes de reaplicar.');
    }
    log('Tradução já presente. Nenhuma modificação necessária.');
    return;
  }

  const buf = fs.readFileSync(ASAR_PATH);
  log(`Aplicando tradução em ${ASAR_PATH}...`);
  const startMs = Date.now();

  const headerSize = buf.readUInt32LE(4);
  const jsonSize = buf.readUInt32LE(12);
  const dataOffset = 8 + headerSize;
  const header = JSON.parse(buf.toString('utf8', 16, 16 + jsonSize));

  const patchers = {
    'dist/preload.js': patchPreload,
    'dist/utils.js': patchUtils,
    'dist/main.js': patchMain,
    'dist/menu.js': patchMenu,
    'dist/tray.js': patchTray,
    'dist/updater.js': patchUpdater,
  };

  const chunks = [];
  const patchedPaths = new Set();
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
        if (relPath === 'dist/preload.js' && !origStr.includes('electron_1.ipcRenderer')) {
          throw new Error('Preload incompatível: API Electron esperada não encontrada.');
        }
        if (relPath === 'dist/utils.js' &&
            !origStr.includes("win.webContents.on('did-finish-load', () => {") &&
            !origStr.includes("win.webContents.on('dom-ready'")) {
          throw new Error('Estrutura do gerenciador de janelas desconhecida; patch cancelado.');
        }
        const patchedStr = patchers[relPath](origStr);
        new vm.Script(patchedStr, { filename: relPath });
        if (patchedStr !== origStr) {
          patchedPaths.add(relPath);
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
  for (const required of ['dist/preload.js', 'dist/utils.js']) {
    if (!patchedPaths.has(required)) {
      throw new Error(`Versão incompatível: ponto de injeção ${required} não validado. Nenhum arquivo original foi substituído.`);
    }
  }

  // 1. Sincronizar cópia golden e cópia em resources
  {
    const srcFile = fs.existsSync(SOURCE_I18N) ? SOURCE_I18N : (fs.existsSync(GOLDEN_I18N) ? GOLDEN_I18N : null);
    if (srcFile) {
      if (!fs.existsSync(GOLDEN_DIR)) {
        fs.mkdirSync(GOLDEN_DIR, { recursive: true });
      }
      if (path.resolve(srcFile) !== path.resolve(GOLDEN_I18N)) {
        fs.copyFileSync(srcFile, GOLDEN_I18N);
      }
      if (fs.existsSync(RESOURCES_DIR)) {
        fs.copyFileSync(srcFile, TARGET_I18N);
      }
      log(`i18n-pt-br.js sincronizado com sucesso.`);
    }
  }

  // 2. Ler ASAR e verificar assinatura

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
  const tmpBackup = `${BACKUP_PATH}.tmp-${process.pid}`;
  const tmpMeta = `${MANIFEST_PATH}.tmp-${process.pid}`;
  const metadata = {
    schemaVersion: 1,
    originalSha256: sha256(buf),
    patchedSha256: sha256(outBuf),
    createdAt: new Date().toISOString()
  };

  // Preparar todos os arquivos antes de modificar a instalação.
  try {
    fs.writeFileSync(tmpAsar, outBuf, { flag: 'wx' });
    fs.writeFileSync(tmpBackup, buf, { flag: 'wx' });
    fs.writeFileSync(tmpMeta, JSON.stringify(metadata, null, 2) + '\n', { flag: 'wx' });

    // Renovar o backup para a versão OFICIAL em uso, nunca reutilizar backup antigo.
    fs.renameSync(tmpBackup, BACKUP_PATH);
    fs.renameSync(tmpMeta, MANIFEST_PATH);
    fs.renameSync(tmpAsar, ASAR_PATH);
  } finally {
    for (const tmp of [tmpAsar, tmpBackup, tmpMeta]) {
      if (fs.existsSync(tmp)) fs.rmSync(tmp);
    }
  }

  log(`Sucesso! app.asar traduzido e atualizado em ${Date.now() - startMs}ms.`);
}

try {
  run();
} catch (err) {
  log(`Erro ao aplicar tradução: ${err.stack || err.message}`);
  process.exit(1);
}
