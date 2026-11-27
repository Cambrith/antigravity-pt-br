const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

function loadTranslator() {
  const noop = () => {};
  const el = () => ({ setAttribute: noop, appendChild: noop, addEventListener: noop, style: {}, querySelector: () => null, querySelectorAll: () => [] });
  const document = { readyState: 'loading', addEventListener: noop, createElement: el, querySelector: () => null, querySelectorAll: () => [], documentElement: el(), head: el(), body: el(), createTreeWalker: () => ({ nextNode: () => null }) };
  const window = { document, addEventListener: noop, location: { href: 'https://127.0.0.1/' }, localStorage: { getItem: () => null, setItem: noop }, MutationObserver: class { observe() {} disconnect() {} }, setTimeout: noop, setInterval: noop, clearTimeout: noop };
  window.window = window;
  const ctx = vm.createContext(Object.assign(window, { console }));
  vm.runInContext(read('i18n-pt-br.js'), ctx);
  return ctx.__CAMBRITH_TRANSLATE_STR__;
}

test('v1.10.0 — textos novos da 2.34.0 (Orchestrator, terminal, Git)', () => {
  const tr = loadTranslator();
  assert.equal(tr('Orchestrator Settings'), 'Configurações do Orchestrator');
  assert.equal(tr('Terminal command auto execution'), 'Execução automática de comandos do terminal');
  assert.equal(tr('Enable terminal sandbox'), 'Ativar sandbox do terminal');
  assert.equal(tr('Pushed 3 commits to origin/main.'), '3 commit(s) enviado(s) para origin/main.');
  assert.equal(tr('Gemini 3 Pro (Default)'), 'Gemini 3 Pro (Padrão)');
  assert.equal(tr('Sort and filter conversations (2 active)'), 'Ordenar e filtrar conversas (2 ativos)');
});

test('v1.10.0 — regras dinâmicas não alteram frases comuns de respostas do agente', () => {
  const tr = loadTranslator();
  for (const s of ['I added the tests', 'The feature is installed', 'Error: something broke in my code', 'Set up the database first']) {
    assert.equal(tr(s), null, s);
  }
});

test('Regras dinâmicas de src/maps/dynamic.json são regex válidas', () => {
  const rules = JSON.parse(read('src/maps/dynamic.json'));
  assert.ok(rules.length >= 160);
  for (const r of rules) assert.doesNotThrow(() => new RegExp(r.en), r.en);
});

test('Patcher: inicialização protegida, rollback e quarentena', () => {
  const code = read('patch-asar.js');
  assert.ok(code.includes("const BOOT_ENTRY = 'dist/cambrith-boot.js'"));
  assert.ok(code.includes("process.argv.includes('--rollback')"));
  assert.ok(code.includes('readAsarVersion(bak) !== currentVersion'), 'só usa backup da mesma versão');
  assert.ok(code.includes('isI18nQuarantined'));
  assert.ok(!code.includes("throw new Error('Não foi possível localizar a configuração original dos controles da janela.')"),
    'controles da janela não podem abortar a tradução');
  assert.doesNotThrow(() => new vm.Script(code));
});

test('Inicializador: faz rollback quando o app traduzido não abre', () => {
  const sh = read('launcher/antigravity');
  assert.ok(sh.includes('run_patcher --rollback'));
  assert.ok(sh.includes('$status -ne 70'));
  assert.ok(sh.includes('exec node "$PATCHER" "$@"'), '--patch chama o patcher diretamente');
  assert.ok(!sh.includes('antigravity-patch"'), 'não depende de ~/.local/bin/antigravity-patch');
});

test('generate_i18n.py só grava fora do repositório com --install', () => {
  const py = read('generate_i18n.py');
  assert.ok(py.includes('if "--install" in sys.argv:'));
  assert.ok(!py.includes('~/.local/opt/Antigravity-x64/resources/i18n-pt-br.js'));
});

test('Regressão: troca de modelos no Orchestrator não acumula nomes repetidos', () => {
  const noop = () => {};
  let observerCb = null;
  const makeEl = (tag = 'SPAN') => ({
    nodeType: 1,
    tagName: tag,
    childNodes: [],
    style: {},
    setAttribute: noop,
    getAttribute: () => null,
    hasAttribute: () => false,
    appendChild(c) { c.parentElement = this; this.childNodes.push(c); return c; },
    addEventListener: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    closest: () => null,
    matches: () => false,
    classList: { contains: () => false }
  });
  const makeText = (val) => ({ nodeType: 3, nodeValue: val, isConnected: true, parentElement: null });
  const createTreeWalker = (root) => {
    const nodes = [];
    const visit = (n) => {
      if (!n) return;
      if (n !== root) nodes.push(n);
      if (n.childNodes) n.childNodes.forEach(visit);
    };
    visit(root);
    let idx = 0;
    return { nextNode: () => (idx < nodes.length ? nodes[idx++] : null) };
  };
  const docEl = makeEl('HTML');
  const document = {
    readyState: 'complete',
    addEventListener: noop,
    createElement: makeEl,
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    documentElement: docEl,
    head: makeEl('HEAD'),
    body: makeEl('BODY'),
    createTreeWalker
  };
  const window = {
    document,
    addEventListener: noop,
    removeEventListener: noop,
    location: { href: 'https://127.0.0.1/' },
    localStorage: { getItem: () => null, setItem: noop },
    matchMedia: () => ({ matches: false, addEventListener: noop }),
    MutationObserver: class {
      constructor(cb) { observerCb = cb; }
      observe() {}
      disconnect() {}
    },
    NodeFilter: { SHOW_ELEMENT: 1, SHOW_TEXT: 4 },
    setTimeout: noop,
    setInterval: noop,
    clearTimeout: noop
  };
  window.window = window;
  const ctx = vm.createContext(Object.assign(window, { console }));
  vm.runInContext(read('i18n-pt-br.js'), ctx);
  assert.ok(observerCb, 'MutationObserver deve estar registrado');

  const span = makeEl('SPAN');
  const t1 = makeText('Orchestrator ');
  const t2 = makeText('Gemini 4 Argon Medium');
  span.appendChild(t1);
  span.appendChild(t2);

  observerCb([{ type: 'childList', addedNodes: [span] }]);
  assert.equal(span.childNodes.map((n) => n.nodeValue).join(''), 'Orchestrator Gemini 4 Argon Médio');

  t2.nodeValue = 'Gemini 4 Argon High';
  observerCb([{ type: 'characterData', target: t2 }]);
  assert.equal(span.childNodes.map((n) => n.nodeValue).join(''), 'Orchestrator Gemini 4 Argon Alto');

  t2.nodeValue = 'Gemini 4 Neon High';
  observerCb([{ type: 'characterData', target: t2 }]);
  assert.equal(span.childNodes.map((n) => n.nodeValue).join(''), 'Orchestrator Gemini 4 Neon Alto');

  // Redução para 1 único nó de texto (remoção do prefixo pelo React)
  t2.nodeValue = 'Gemini 4 Hydrogen Low';
  span.childNodes = [t2];
  observerCb([{ type: 'characterData', target: t2 }]);
  assert.equal(span.childNodes.map((n) => n.nodeValue).join(''), 'Gemini 4 Hydrogen Baixo');
});
