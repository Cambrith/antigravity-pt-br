const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const PATCHER = path.join(root, 'patch-asar.js');

// Monta um .asar mínimo (cabeçalho pickle + dados) com os arquivos dados.
function buildAsar(files) {
  const header = { files: {} };
  const chunks = [];
  let offset = 0;
  for (const [rel, content] of Object.entries(files)) {
    const buf = Buffer.from(content, 'utf8');
    const parts = rel.split('/');
    let node = header;
    for (const dir of parts.slice(0, -1)) {
      node.files[dir] = node.files[dir] || { files: {} };
      node = node.files[dir];
    }
    node.files[parts.at(-1)] = { size: buf.length, offset: String(offset) };
    chunks.push(buf);
    offset += buf.length;
  }
  const json = Buffer.from(JSON.stringify(header), 'utf8');
  const aligned = Math.ceil(json.length / 4) * 4;
  const head = Buffer.alloc(16 + aligned, 0);
  head.writeUInt32LE(4, 0);
  head.writeUInt32LE(aligned + 8, 4);
  head.writeUInt32LE(aligned + 4, 8);
  head.writeUInt32LE(json.length, 12);
  json.copy(head, 16);
  return Buffer.concat([head, ...chunks]);
}

function setup(backupVersion) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-restore-'));
  const asar = path.join(dir, 'app.asar');
  const patched = buildAsar({
    'package.json': JSON.stringify({ version: '2.34.0', main: 'dist/cambrith-boot.js' }),
    'dist/preload.js': '// --- Cambrith pt-BR Localization Injection v23 ---',
  });
  const original = buildAsar({
    'package.json': JSON.stringify({ version: backupVersion, main: 'dist/main.js' }),
    'dist/preload.js': '// original',
  });
  fs.writeFileSync(asar, patched);
  fs.writeFileSync(asar + '.bak-original', original);
  return { dir, asar, patched, original };
}

function run(asar, dir, flag) {
  return spawnSync(process.execPath, [PATCHER, flag, `--asar=${asar}`], {
    env: { ...process.env, XDG_STATE_HOME: path.join(dir, 'state'), XDG_CONFIG_HOME: path.join(dir, 'cfg'), APPDATA: path.join(dir, 'cfg'), LOCALAPPDATA: path.join(dir, 'state') },
    encoding: 'utf8',
  });
}

test('--restore-original volta o app.asar original quando o backup é da mesma versão', () => {
  const t = setup('2.34.0');
  const r = run(t.asar, t.dir, '--restore-original');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.ok(fs.readFileSync(t.asar).equals(t.original));
  assert.ok(!fs.existsSync(path.join(t.dir, 'state', 'antigravity-cambrith', 'patch-quarantine')), 'restaurar não põe em quarentena');
  assert.ok(!fs.existsSync(path.join(path.dirname(t.asar), 'i18n-pt-br.js')), 'restaurar não copia o i18n para o app');
});

test('--restore-original recusa backup de outra versão e não toca no app.asar', () => {
  const t = setup('2.33.9');
  const r = run(t.asar, t.dir, '--restore-original');
  assert.equal(r.status, 2);
  assert.ok(fs.readFileSync(t.asar).equals(t.patched));
});

test('--rollback restaura e põe o patcher em quarentena para a versão', () => {
  const t = setup('2.34.0');
  const r = run(t.asar, t.dir, '--rollback');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.ok(fs.readFileSync(t.asar).equals(t.original));
  const q = fs.readFileSync(path.join(t.dir, 'state', 'antigravity-cambrith', 'patch-quarantine'), 'utf8');
  assert.match(q, /^2\.34\.0\|/);
});

test('Instaladores e desinstaladores seguem as regras de segurança', () => {
  const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
  for (const f of ['install.sh', 'scripts/install-linux.sh']) {
    const s = read(f);
    assert.ok(s.includes('LAUNCHER_SRC="$SCRIPT_DIR/launcher/antigravity"'), `${f}: instala o launcher com guarda`);
    assert.ok(s.includes('antigravity.antes-pt-br'), `${f}: guarda launcher alheio`);
  }
  const un = read('scripts/uninstall.sh');
  assert.ok(un.includes('--restore-original'), 'uninstall.sh valida o backup pelo patcher');
  assert.ok(!/cp -f "\$res\/app\.asar\.bak-original"/.test(un), 'uninstall.sh não copia o backup às cegas');
  assert.ok(un.includes('disable --now antigravity-patch-after-update.path'), 'uninstall.sh desliga o monitor');
  assert.ok(un.includes('LAUNCHER_MARKER'), 'uninstall.sh só remove o próprio launcher');
  const unps = read('scripts/uninstall.ps1');
  assert.ok(unps.includes('--restore-original') && !unps.includes('Copy-Item $bak $asar'));
  for (const f of ['install.ps1', 'scripts/install-windows.ps1']) {
    const s = read(f);
    assert.ok(s.includes('if ($LASTEXITCODE -ne 0)'), `${f}: propaga erro do patcher`);
    assert.ok(s.includes('if (${env:ProgramFiles(x86)})'), `${f}: tolera ausência de ProgramFiles(x86)`);
  }
  for (const f of ['install-macos.sh', 'scripts/install-macos.sh']) {
    assert.ok(read(f).includes('codesign --verify --deep --strict'), `${f}: bloqueia app assinado`);
  }
});
