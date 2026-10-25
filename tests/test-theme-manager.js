const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

test('Temas Personalizados: Bridge nativa suporta carregar e salvar custom-themes.json', () => {
  const patchCode = fs.readFileSync(path.join(__dirname, '..', 'patch-asar.js'), 'utf8');
  assert.ok(patchCode.includes('loadCustomThemes:'), 'patch-asar deve expor loadCustomThemes');
  assert.ok(patchCode.includes('saveCustomThemes:'), 'patch-asar deve expor saveCustomThemes');
  assert.ok(patchCode.includes('custom-themes.json'), 'patch-asar deve persistir em custom-themes.json');
});

test('Temas Personalizados: i18n-pt-br exporta gerenciador de temas e lista de padrões com modo escuro e claro', () => {
  const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'i18n-pt-br.js'), 'utf8');
  
  assert.ok(i18nCode.includes('__CAMBRITH_ENSURE_THEME_MANAGER__'), 'i18n deve expor ensureThemeManager');
  assert.ok(i18nCode.includes('__CAMBRITH_APPLY_CUSTOM_THEME__'), 'i18n deve expor applyCustomTheme');
  assert.ok(i18nCode.includes('cambrith-custom-themes-card'), 'i18n deve renderizar cartão de temas personalizados');
  assert.ok(i18nCode.includes('Dracula Purple'), 'Deve conter tema Dracula');
  assert.ok(i18nCode.includes('Clean Minimalist'), 'Deve conter tema claro');
  assert.ok(i18nCode.includes('Gentoo Cyber Lilás'), 'Deve conter tema Gentoo Lilás');
});

test('Temas Personalizados: Normalização e aplicação de cores funcionam corretamente', () => {
  const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'i18n-pt-br.js'), 'utf8');
  const sandbox = {
    document: {
      title: "",
      body: { innerHTML: "", appendChild: () => {} },
      head: { appendChild: () => {} },
      createTreeWalker: () => ({ nextNode: () => null }),
      querySelectorAll: () => [],
      querySelector: () => null,
      addEventListener: () => {},
      getElementById: () => null,
      createElement: () => ({ setAttribute: () => {}, style: {}, addEventListener: () => {} })
    },
    window: {
      addEventListener: () => {},
      Notification: function MockNotification() {}
    },
    screen: { height: 1080 },
    MutationObserver: function() { return { observe: () => {}, disconnect: () => {} }; },
    NodeFilter: { SHOW_TEXT: 4 },
    setInterval: () => {},
    setTimeout: () => {},
    clearTimeout: () => {},
    localStorage: {
      _data: {},
      getItem(k) { return this._data[k] || null; },
      setItem(k, v) { this._data[k] = String(v); }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(i18nCode, sandbox);

  assert.equal(typeof sandbox.window.__CAMBRITH_ENSURE_THEME_MANAGER__, 'function');
  assert.equal(typeof sandbox.window.__CAMBRITH_APPLY_CUSTOM_THEME__, 'function');
});
