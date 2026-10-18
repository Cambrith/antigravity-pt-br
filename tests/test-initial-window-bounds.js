const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const code = fs.readFileSync(path.join(__dirname, '..', 'patch-asar.js'), 'utf8');
const start = code.indexOf('function patchUtils(code) {');
const functionSource = code.slice(start, code.indexOf('\nfunction patchMain(code)', start));
const context = vm.createContext({});
vm.runInContext(functionSource, context);
const original = `function createWindow() {
  const win = new electron_1.BrowserWindow({width: 1400, height: 900, minWidth: 500, minHeight: 400});
  win.on('page-title-updated', () => {});
  return win;
}`;
const patched = context.patchUtils(original);
new vm.Script(patched);

function bounds(area) {
  const sandbox = vm.createContext({ electron_1: {
    screen: { getPrimaryDisplay: () => ({ workArea: area }) },
    BrowserWindow: class { constructor(options) { Object.assign(this, options); this.maximized = false; } on() {} maximize() { this.maximized = true; } }
  }});
  vm.runInContext(patched, sandbox);
  return JSON.parse(JSON.stringify(sandbox.createWindow()));
}

test('Janela inicial: respeita a área útil abaixo do painel de 30 px', () => {
  const r = bounds({ x: 0, y: 30, width: 1366, height: 738 });
  assert.equal(r.y, 67);
  assert.equal(r.height, 664);
  assert.equal(r.maximized, true);
  assert.equal(r.width, 1366);
  assert.ok(r.y + r.height <= 768, 'O rodapé precisa caber na tela física');
});

test('Janela inicial: mantém o tamanho padrão quando há espaço', () => {
  const r = bounds({ x: 0, y: 30, width: 2560, height: 1410 });
  assert.equal(r.width, 1400);
  assert.equal(r.height, 900);
  assert.equal(r.maximized, false);
  assert.equal(r.x, 580);
  assert.equal(r.y, 285);
});

test('Janela inicial: respeita a origem de um monitor à esquerda', () => {
  const area = { x: -1920, y: 40, width: 1920, height: 1040 };
  const r = bounds(area);
  assert.ok(r.x >= area.x);
  assert.ok(r.x + r.width <= area.x + area.width);
  assert.ok(r.y >= area.y);
  assert.ok(r.y + r.height <= area.y + area.height);
});

test('Janela inicial: reaplicar o patch preserva o código gerado', () => {
  assert.equal(context.patchUtils(patched), patched);
});

test('Janela inicial: reserva margem ao restaurar quando a área reportada ignora o painel', () => {
  const r = bounds({x: 0, y: 0, width: 1366, height: 768});
  assert.equal(r.maximized, true);
  assert.equal(r.height, 691);
  assert.ok(r.y >= 30);
  assert.ok(r.y + r.height <= 768);
});
