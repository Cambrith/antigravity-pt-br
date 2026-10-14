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

test('Tradução de Ambiente, Worktree e Início de Conversa', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Rótulos e Seletores de Ambiente
  assert.equal(tr('Environment'), 'Ambiente');
  assert.equal(tr('Select Environment'), 'Selecionar ambiente');
  assert.equal(tr('Select Environment (Ctrl+.)'), 'Selecionar ambiente (Ctrl+.)');
  assert.equal(tr('Select Worktree'), 'Selecionar worktree');
  assert.equal(tr('Select Worktree (Ctrl+.)'), 'Selecionar worktree (Ctrl+.)');
  assert.equal(tr('Environment: Local'), 'Ambiente: Local');

  // Opções e descrições do dropdown
  assert.equal(tr('Run in your current workspace'), 'Executar em seu espaço de trabalho atual');
  assert.equal(tr('Run in a new worktree'), 'Executar em uma nova worktree');
  assert.equal(tr('Run in a new git worktree'), 'Executar em uma nova worktree do git');
  assert.equal(tr('Workspaces are not available for this project'), 'Espaços de trabalho não estão disponíveis para este projeto');
  assert.equal(tr('Worktrees are available for Git repositories'), 'Worktrees estão disponíveis para repositórios Git');
  assert.equal(tr('Search past worktrees...'), 'Pesquisar worktrees anteriores...');
  assert.equal(tr('Search past workspaces...'), 'Pesquisar espaços de trabalho anteriores...');

  // Strings dinâmicas
  assert.equal(tr('Work locally on frontend, backend'), 'Trabalhar localmente em frontend, backend');
  assert.equal(tr('Worktree from main'), 'Worktree a partir de main');
  assert.equal(tr('Automatically create a new Fig workspace when the conversation starts'), 'Criar automaticamente um novo espaço de trabalho Fig quando a conversa iniciar');

  // Conversas bifurcadas
  assert.equal(tr('Creating worktree for the forked conversation...'), 'Criando worktree para a conversa bifurcada...');
  assert.equal(tr('Creating the forked conversation...'), 'Criando a conversa bifurcada...');
  assert.equal(tr('Forked conversation'), 'Conversa bifurcada');

  // Erros e avisos de branch de projeto
  assert.equal(
    tr('Failed to save project branch: No git folder in this project matches the folder'),
    'Falha ao salvar branch do projeto: Nenhuma pasta git neste projeto corresponde à pasta'
  );
  assert.equal(
    tr('Failed to save project branch: branch does not exist'),
    'Falha ao salvar branch do projeto: branch does not exist'
  );
  assert.equal(tr('Branch name cannot start with a dash'), 'O nome da branch não pode começar com um traço');
});


