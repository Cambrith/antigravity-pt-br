const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function setupSandbox() {
  const i18nPath = path.join(__dirname, '..', 'i18n-pt-br.js');
  const code = fs.readFileSync(i18nPath, 'utf8');

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
  return sandbox;
}

test('Tradução UI: Termos básicos de interface e menus', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  assert.equal(tr('Settings'), 'Configurações');
  assert.equal(tr('General'), 'Geral');
  assert.equal(tr('Appearance'), 'Aparência');
  assert.equal(tr('New Window'), 'Nova janela');
  assert.equal(tr('Confirm Quit'), 'Confirmar saída');
});

test('Tradução de Avisos de Rede e Desconexão', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  assert.equal(tr('Connection lost. Reconnecting...'), 'Conexão perdida. Reconectando...');
  assert.equal(tr('No internet. Agent features may not work.'), 'Sem internet. Os recursos do agente podem não funcionar.');
});

test('Tradução de Servidores MCP e Parâmetros', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  assert.equal(tr('(Optional) Personal Access Token'), '(Opcional) Token de acesso pessoal');
  assert.equal(tr('(Required) API Key'), '(Obrigatório) Chave de API');
  assert.equal(tr('Your GitLab Personal Access Token.'), 'Seu token de acesso pessoal do GitLab.');
});

test('Tradução de Modelos e Níveis de Raciocínio', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  assert.equal(tr('Claude Sonnet 4.6 (Thinking)'), 'Claude Sonnet 4.6 (Raciocínio)');
  assert.equal(tr('GPT-OSS 120B (Medium)'), 'GPT-OSS 120B (Médio)');
});
