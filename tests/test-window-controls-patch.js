const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'patch-asar.js'), 'utf8');
const start = source.indexOf('function patchUtils(code) {');
const end = source.indexOf('\nfunction patchMain(code)', start);
const context = vm.createContext({});
vm.runInContext(source.slice(start, end), context);

const original = `function createWindow() {
  const win = new electron_1.BrowserWindow({
    width: 1400,
    height: 900,
    titleBarOverlay: isMacOS() ? false : {
      color: backgroundColor,
      symbolColor: foregroundColor,
      height: 30,
    },
  });
  win.on('page-title-updated', () => {});
  win.webContents.on('did-finish-load', () => {});
  return win;
}`;

test('Controles personalizados são preservados junto da janela do Antigravity', () => {
  const patched = context.patchUtils(original);
  new vm.Script(patched);
  assert.match(patched, /process\.platform === 'linux' \|\| isMacOS\(\)/);
  assert.match(patched, /cambrith-window-controls\.js/);
  assert.match(patched, /executeJavaScript/);
  assert.equal(context.patchUtils(patched), patched);
});

test('Patcher sincroniza o arquivo externo dos controles após atualizações', () => {
  assert.match(source, /const SOURCE_CONTROLS = path\.join\(SCRIPT_DIR, 'cambrith-window-controls\.js'\)/);
  assert.match(source, /fs\.copyFileSync\((?:srcControls|SOURCE_CONTROLS), TARGET_CONTROLS\)/);
  assert.match(source, /Localization Injection v\d+/);
});

test('Inicializador verifica as personalizações antes de iniciar o app', () => {
  const launcher = fs.readFileSync(path.join(__dirname, '..', 'launcher', 'antigravity-launcher.sh'), 'utf8');
  assert.match(launcher, /node \"\$PATCHER\" \"--asar=\$ASAR\"/);
  assert.match(launcher, /launch_antigravity \"\$APP_DIR\/antigravity\"/);
});

test('Instalador ativa a verificação após alterações da pasta resources', () => {
  const pathUnit = fs.readFileSync(path.join(__dirname, '..', 'linux', 'systemd', 'antigravity-patch-after-update.path'), 'utf8');
  const guard = fs.readFileSync(path.join(__dirname, '..', 'linux', 'patch-after-update.sh'), 'utf8');
  assert.match(pathUnit, /PathChanged=%h\/\.local\/opt\/antigravity\/resources/);
  assert.match(guard, /stable >= 4/);
  assert.match(guard, /node \"\$PATCHER\" \"--asar=\$ASAR\"/);
});
