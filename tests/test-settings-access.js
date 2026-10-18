const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const code = fs.readFileSync(path.join(__dirname, '..', 'i18n-pt-br.js'), 'utf8');
const start = code.indexOf('  // Acesso integrado às configurações');
assert.notEqual(start, -1);
const block = code.slice(start, code.indexOf('  // =========================================================================', start));

function setup({ modalOpen = false, viewportHeight = 768, screenHeight = 768 } = {}) {
  const elements = new Map();
  const handlers = new Map();
  const timers = [];
  const clicks = { settings: 0, modalClose: 0, windowClose: 0 };
  const attrs = new Map();
  const sidebar = {
    getAttribute: name => name === 'role' ? 'navigation' : null,
    hasAttribute: name => attrs.has(`sidebar:${name}`),
    setAttribute: (name, value) => attrs.set(`sidebar:${name}`, value)
  };
  const footer = {
    parentElement: sidebar,
    hasAttribute: name => attrs.has(`footer:${name}`),
    setAttribute: (name, value) => attrs.set(`footer:${name}`, value)
  };
  const settings = {
    innerText: 'Configurações', title: '', parentElement: footer,
    getAttribute: name => attrs.get(name),
    setAttribute: (name, value) => attrs.set(name, value),
    click: () => { clicks.settings++; }
  };
  const modal = {
    innerText: 'Configurações',
    querySelector: () => ({ click: () => { clicks.modalClose++; } })
  };
  elements.set('cambrith-fullscreen-settings-btn', {
    remove: () => elements.delete('cambrith-fullscreen-settings-btn')
  });
  const document = {
    body: {},
    head: { appendChild: element => elements.set(element.id, element) },
    createElement: tag => ({ tagName: tag.toUpperCase() }),
    getElementById: id => elements.get(id),
    // Um seletor global de Fechar encontraria o controle da janela, não o modal.
    querySelector: selector => selector.includes('settings-button') ? settings :
      ({ click: () => { clicks.windowClose++; } }),
    querySelectorAll: selector => selector.includes('dialog') ? (modalOpen ? [modal] : []) : [settings],
    addEventListener: () => {}
  };
  const context = vm.createContext({ document, screen: { height: screenHeight },
    window: { innerHeight: viewportHeight, addEventListener: (name, fn) => handlers.set(name, fn) },
    setTimeout: fn => timers.push(fn)
  });
  vm.runInContext(block, context);
  return { context, elements, handlers, timers, clicks, attrs, settings };
}

test('Configurações: usa o rodapé nativo sem engrenagem em ambos os modos', () => {
  for (const viewportHeight of [500, 768]) {
    const s = setup({ viewportHeight });
    s.context.ensureSettingsAccess();
    s.context.ensureSettingsAccess();
    assert.equal(s.elements.has('cambrith-fullscreen-settings-btn'), false);
    assert.equal(s.elements.size, 1, 'Somente uma folha de estilo, sem botão duplicado');
    assert.ok(s.attrs.has('footer:data-cambrith-settings-footer'));
    assert.ok(s.attrs.has('sidebar:data-cambrith-settings-sidebar'));
    assert.equal(s.attrs.get('aria-keyshortcuts'), 'Control+, Meta+,');
  }
});

test('Configurações: Ctrl+, e Cmd+, acionam o botão original', () => {
  for (const modifier of ['ctrlKey', 'metaKey']) {
    const s = setup();
    let prevented = false;
    s.handlers.get('keydown')({ [modifier]: true, key: ',', code: 'Comma',
      preventDefault: () => { prevented = true; }, stopPropagation: () => {} });
    assert.equal(s.clicks.settings, 1);
    assert.equal(prevented, true);
  }
});

test('Configurações: atalho fecha apenas o modal, preservando a janela', () => {
  const s = setup({ modalOpen: true });
  s.context.toggleSettingsModal();
  assert.equal(s.clicks.modalClose, 1);
  assert.equal(s.clicks.windowClose, 0);
  assert.equal(s.clicks.settings, 0);
});

test('Configurações: agrupa atualizações sem criar um intervalo periódico', () => {
  const s = setup();
  s.context.scheduleSettingsAccess();
  s.context.scheduleSettingsAccess();
  assert.equal(s.timers.length, 1);
  s.timers.shift()();
  assert.equal(s.elements.has('cambrith-fullscreen-settings-btn'), false);
  s.context.scheduleSettingsAccess();
  assert.equal(s.timers.length, 1);
});
