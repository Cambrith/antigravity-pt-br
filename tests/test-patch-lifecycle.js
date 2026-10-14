'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const PATCHER = path.join(__dirname, '..', 'patch-asar.js');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');

function buildAsar({ marker = 'v1', compatible = true } = {}) {
  const entries = {
    'dist/preload.js': `const electron_1 = { ipcRenderer: { invoke() {} } };
const exported = { showContextMenu: (items) => electron_1.ipcRenderer.invoke('window:show-context-menu', items), };`,
    'dist/main.js': `const build = '${marker}';`,
  };
  if (compatible) {
    entries['dist/utils.js'] = `const win = { webContents: { on() {}, executeJavaScript() {} } };
win.webContents.on('did-finish-load', () => {});`;
  }
  const root = { files: {} };
  const chunks = [];
  let offset = 0;
  for (const [name, value] of Object.entries(entries)) {
    const pieces = name.split('/');
    let node = root;
    for (const piece of pieces.slice(0, -1)) {
      node.files[piece] ||= { files: {} };
      node = node.files[piece];
    }
    const buf = Buffer.from(value, 'utf8');
    node.files[pieces.at(-1)] = { size: buf.length, offset: String(offset) };
    chunks.push(buf);
    offset += buf.length;
  }
  const json = Buffer.from(JSON.stringify(root));
  const aligned = Math.ceil(json.length / 4) * 4;
  const header = Buffer.alloc(16 + aligned);
  header.writeUInt32LE(4, 0);
  header.writeUInt32LE(aligned + 8, 4);
  header.writeUInt32LE(aligned + 4, 8);
  header.writeUInt32LE(json.length, 12);
  json.copy(header, 16);
  return Buffer.concat([header, ...chunks]);
}

function fixture(t) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'antigravity-ptbr-test-'));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const resources = path.join(home, 'app', 'resources');
  fs.mkdirSync(resources, { recursive: true });
  const asar = path.join(resources, 'app.asar');
  const env = { ...process.env, HOME: home, XDG_CONFIG_HOME: path.join(home, '.config') };
  const run = (...flags) => spawnSync(process.execPath, [PATCHER, `--asar=${asar}`, ...flags], {
    env, encoding: 'utf8', timeout: 10000,
  });
  const backup = `${asar}.bak-original`;
  const manifest = `${asar}.cambrith-backup.json`;
  return { asar, backup, manifest, run };
}

test('instalação validada vincula original e patch a hashes; restauração recupera bytes exatos', t => {
  const f = fixture(t);
  const clean = buildAsar();
  fs.writeFileSync(f.asar, clean);
  const applied = f.run();
  assert.equal(applied.status, 0, applied.stdout + applied.stderr);
  const patched = fs.readFileSync(f.asar);
  assert.notEqual(hash(clean), hash(patched));
  assert.equal(hash(fs.readFileSync(f.backup)), hash(clean));
  const meta = JSON.parse(fs.readFileSync(f.manifest, 'utf8'));
  assert.equal(meta.originalSha256, hash(clean));
  assert.equal(meta.patchedSha256, hash(patched));
  assert.equal(f.run('--restore').status, 0);
  assert.deepEqual(fs.readFileSync(f.asar), clean);
  assert.equal(fs.existsSync(f.manifest), false);
});

test('atualização oficial substitui backup anterior por backup da versão atual', t => {
  const f = fixture(t);
  const v1 = buildAsar({ marker: 'v1' });
  const v2 = buildAsar({ marker: 'v2' });
  fs.writeFileSync(f.asar, v1);
  assert.equal(f.run().status, 0);
  fs.writeFileSync(f.asar, v2);
  const next = f.run();
  assert.equal(next.status, 0, next.stdout + next.stderr);
  assert.deepEqual(fs.readFileSync(f.backup), v2);
  assert.equal(f.run('--restore').status, 0);
  assert.deepEqual(fs.readFileSync(f.asar), v2);
});

test('restauração recusa ASAR alterado por atualização após patch', t => {
  const f = fixture(t);
  fs.writeFileSync(f.asar, buildAsar());
  assert.equal(f.run().status, 0);
  const updated = buildAsar({ marker: 'official-new-version' });
  fs.writeFileSync(f.asar, updated);
  const result = f.run('--restore');
  assert.notEqual(result.status, 0);
  assert.deepEqual(fs.readFileSync(f.asar), updated);
});

test('backup legado sem manifesto é recusado sem sobrescrever arquivos', t => {
  const f = fixture(t);
  const original = buildAsar({ marker: 'old' });
  const current = buildAsar({ marker: 'new' });
  fs.writeFileSync(f.asar, current);
  fs.writeFileSync(f.backup, original);
  const result = f.run('--restore');
  assert.notEqual(result.status, 0);
  assert.deepEqual(fs.readFileSync(f.asar), current);
});

test('versão incompatível não altera original e não cria backup', t => {
  const f = fixture(t);
  const unsupported = buildAsar({ compatible: false });
  fs.writeFileSync(f.asar, unsupported);
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.deepEqual(fs.readFileSync(f.asar), unsupported);
  assert.equal(fs.existsSync(f.backup), false);
});

test('reaplicação forçada em ASAR modificado é bloqueada', t => {
  const f = fixture(t);
  fs.writeFileSync(f.asar, buildAsar());
  assert.equal(f.run().status, 0);
  const before = fs.readFileSync(f.asar);
  assert.notEqual(f.run('--force').status, 0);
  assert.deepEqual(fs.readFileSync(f.asar), before);
});
