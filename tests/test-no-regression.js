const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

test('Regressão: A palavra \"No\" não deve ser traduzida como \"Não\" em contextos de texto comum', () => {
  const i18nPath = path.join(__dirname, '..', 'i18n-pt-br.js');
  const code = fs.readFileSync(i18nPath, 'utf8');

  let translatedNodeValue = null;

  const sandbox = {
    document: {
      title: "",
      body: { innerHTML: "", appendChild: () => {} },
      head: { appendChild: () => {} },
      createTreeWalker: () => ({ nextNode: () => null }),
      querySelectorAll: () => [],
      addEventListener: () => {},
      getElementById: () => null,
      createElement: () => ({ setAttribute: () => {}, style: {}, addEventListener: () => {} })
    },
    window: {
      addEventListener: () => {}
    },
    screen: { height: 1080 },
    MutationObserver: function() { return { observe: () => {}, disconnect: () => {} }; },
    NodeFilter: { SHOW_TEXT: 4 },
    setInterval: () => {},
    setTimeout: () => {},
    clearTimeout: () => {}
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  // 1. Verificar translateString direto
  const resDirect = sandbox.window.__CAMBRITH_TRANSLATE_STR__('No');
  assert.equal(resDirect, null, 'translateString(\"No\") deve retornar null para não substituir a preposição \"no\" em português');

  // 2. Frases comuns em português contendo \"No\"
  const phrases = [
    'No branch main...',
    'No início da conversa...',
    'No arquivo de configuração...',
    'No terminal execute o comando...',
    'No Windows, execute o PowerShell...'
  ];

  for (const phrase of phrases) {
    const res = sandbox.window.__CAMBRITH_TRANSLATE_STR__(phrase);
    assert.equal(res, null, `A frase \"${phrase}\" não deve ser traduzida`);
  }
});
