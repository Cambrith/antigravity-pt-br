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

test('Tradução de Processos e Comandos em Execução (Running/Ran/Exploring/Editing)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Comando individual ao iniciar e finalizar
  assert.equal(
    tr('Running python3 -c " with open(\'/tmp/antigravity_main.js\') as f: js = f.read()"'),
    'Executando python3 -c " with open(\'/tmp/antigravity_main.js\') as f: js = f.read()"'
  );
  assert.equal(
    tr('Ran python3 -c " with open(\'/tmp/antigravity_main.js\') as f: js = f.read()"'),
    'Executou python3 -c " with open(\'/tmp/antigravity_main.js\') as f: js = f.read()"'
  );

  // Contadores de comandos
  assert.equal(tr('Running 1 command'), 'Executando 1 comando');
  assert.equal(tr('Running 2 commands'), 'Executando 2 comandos');
  assert.equal(tr('Ran 1 command'), 'Executou 1 comando');
  assert.equal(tr('Ran 3 commands'), 'Executou 3 comandos');

  // Exploração e edição de arquivos
  assert.equal(tr('Exploring files'), 'Explorando arquivos');
  assert.equal(tr('Exploring 2 files'), 'Explorando 2 arquivos');
  assert.equal(tr('Explored 2 files'), 'Explorou 2 arquivos');
  assert.equal(tr('Editing files'), 'Editando arquivos');
  assert.equal(tr('Editing src/index.ts'), 'Editando src/index.ts');
  assert.equal(tr('Edited files'), 'Editou arquivos');
  assert.equal(tr('Edited src/index.ts'), 'Editou src/index.ts');

  // Ações compostas (exploração + comando)
  assert.equal(tr('Exploring 2 files, running 1 command'), 'Explorando 2 arquivos, executando 1 comando');
  assert.equal(tr('Explored 2 files, ran 1 command'), 'Explorou 2 arquivos, executou 1 comando');

  // Estados pontuais
  assert.equal(tr('Running...'), 'Executando...');
  assert.equal(tr('Running'), 'Em execução');
  assert.equal(tr('Done'), 'Concluído');
});

test('Tradução de Processos de Pensamento e Ações de Ferramentas (Thinking/Tool Actions)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Rótulos de Processo de Pensamento
  assert.equal(tr('Thought Process'), 'Processo de raciocínio');
  assert.equal(tr('Thinking Process'), 'Processo de pensamento');
  assert.equal(tr('Thinking...'), 'Pensando...');

  // Duração dinâmica de pensamento
  assert.equal(tr('Thought for 10s'), 'Pensou por 10s');
  assert.equal(tr('Thought for 1m 20s'), 'Pensou por 1m 20s');
  assert.equal(tr('Thought for 2h 15m 30s'), 'Pensou por 2h 15m 30s');
  assert.equal(tr('Thought for <1s'), 'Pensou por <1s');
  assert.equal(tr('Thought for 15 seconds'), 'Pensou por 15 segundos');

  // Ações de ferramentas comuns
  assert.equal(tr('Analyzing directory'), 'Analisando diretório');
  assert.equal(tr('Checking git status'), 'Verificando status do git');
  assert.equal(tr('Running tests'), 'Executando testes');
  assert.equal(tr('Searching code'), 'Pesquisando código');
  assert.equal(tr('Executing command'), 'Executando comando');
  assert.equal(tr('Executing script'), 'Executando script');
  assert.equal(tr('Viewing file'), 'Visualizando arquivo');
  assert.equal(tr('Writing to file'), 'Escrevendo no arquivo');
});

test('Tradução de Sentenças Dinâmicas de Raciocínio e Pensamento Analítico', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  assert.equal(
    tr('Analysis focuses on the "What is Translated?" section of the README.md file.'),
    'A análise se concentra na seção "What is Translated?" do arquivo README.md.'
  );
  assert.equal(
    tr('This section details the localized modules, specifically the interface elements and MCP server catalog.'),
    'Esta seção detalha localized modules, especificamente interface elements and MCP server catalog.'
  );
  assert.equal(
    tr('The catalog includes configuration fields for the 18 servers.'),
    'O catálogo inclui campos de configuração para os 18 servidores.'
  );
  assert.equal(
    tr('Analyzing new features implemented since the last table update.'),
    'Analisando os novos recursos implementados desde a última atualização da tabela.'
  );
  assert.equal(
    tr('Focus is on environment selection enhancements, including worktree options and associated Git compatibility notices.'),
    'O foco está nas melhorias de seleção de ambiente, incluindo opções de worktree e avisos de compatibilidade Git associados.'
  );
  assert.equal(
    tr('Executing a Python script that reads a JavaScript file and uses regular expressions.'),
    'Executando um script Python que lê um arquivo JavaScript e usa expressões regulares.'
  );
  assert.equal(
    tr('The script likely aims to process or extract information from the JavaScript content.'),
    'O script provavelmente visa processar ou extrair informações do conteúdo JavaScript.'
  );
  assert.equal(
    tr("Upon completion, the script's execution status is available for inspection."),
    "Após a conclusão, o status de execução do script estará disponível para inspeção."
  );
  assert.equal(
    tr('Investigating project configuration files'),
    'Investigando project configuration files'
  );
  assert.equal(
    tr('Reviewing test execution logs'),
    'Revisando test execution logs'
  );

  // Parágrafo analítico composto (imagem 1)
  const paragraphEn = 'Analysis centers on the "What is Translated?" section of the documentation, examining localized modules, specifically the interface elements and the MCP server catalog configuration. The catalog\'s configuration fields are key, especially considering the 99 servers it manages. Also looking at the new features implemented since the last table update, focusing on improvements to environment selection.';
  const paragraphPt = tr(paragraphEn);
  assert.match(paragraphPt, /A análise se concentra na seção "What is Translated\?" da documentação/);
  assert.match(paragraphPt, /considerando os 99 servidores que ele gerencia/);
  assert.match(paragraphPt, /com foco em melhorias na seleção de ambiente/);
});

test('Tradução de Tarefas em Execução, Status e Logs (Tasks Running/Finished/Canceled)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Contadores de tarefas na barra de status e menus
  assert.equal(tr('1 task running'), '1 tarefa em execução');
  assert.equal(tr('2 tasks running'), '2 tarefas em execução');
  assert.equal(tr('5 tasks running'), '5 tarefas em execução');
  assert.equal(tr('No tasks running'), 'Nenhuma tarefa em execução');
  assert.equal(tr('Task running'), 'Tarefa em execução');
  assert.equal(tr('Task running...'), 'Tarefa em execução...');
  assert.equal(tr('Tasks running'), 'Tarefas em execução');
  assert.equal(tr('Tasks running...'), 'Tarefas em execução...');
  assert.equal(tr('Tasks (4)'), 'Tarefas (4)');
  assert.equal(tr('Task (1)'), 'Tarefa (1)');
  assert.equal(tr('1 task active'), '1 tarefa ativa');
  assert.equal(tr('3 tasks active'), '3 tarefas ativas');
  assert.equal(tr('1 task completed'), '1 tarefa concluída');
  assert.equal(tr('2 tasks completed'), '2 tarefas concluídas');

  // Cabeçalhos de colapsáveis de tarefas e comandos
  assert.equal(tr('Buscar regra global em .config finished'), 'Buscar regra global em .config concluído');
  assert.equal(tr('Buscar regras globais was canceled'), 'Buscar regras globais foi cancelado');
  assert.equal(tr('Localizando arquivo de regras globais failed'), 'Localizando arquivo de regras globais falhou');

  // Mensagens internas de resultados de tarefas
  assert.equal(
    tr('Task id "30b76d49-c038-43b4-894c-20320b69aebd/task-966" finished with result:'),
    'Tarefa id "30b76d49-c038-43b4-894c-20320b69aebd/task-966" concluída com o resultado:'
  );
  assert.equal(
    tr('Task id "test-task-123" was canceled with result:'),
    'Tarefa id "test-task-123" foi cancelada com o resultado:'
  );
  assert.equal(
    tr('The command exited with code 1.'),
    'O comando encerrou com o código 1.'
  );
  assert.equal(
    tr('Tool execution was canceled'),
    'A execução da ferramenta foi cancelada'
  );
  assert.equal(tr('Stdout:'), 'Saída padrão:');
  assert.equal(tr('Stderr:'), 'Erro padrão:');
});






