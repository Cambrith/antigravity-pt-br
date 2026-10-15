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

test('Tradução da Página de Plugins e Catálogo do Google/Antigravity', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Texto descritivo do topo
  assert.equal(
    tr('Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in Settings.'),
    'Os plugins são coleções empacotadas de habilidades e MCPs para ajudar o agente no Antigravity a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas escolhas nas Configurações.'
  );

  // Normalização de quebras de linha e múltiplos espaços
  assert.equal(
    tr('Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products.\nYou can always change your choices in Settings.'),
    'Os plugins são coleções empacotadas de habilidades e MCPs para ajudar o agente no Antigravity a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas escolhas nas Configurações.'
  );

  // Títulos e cabeçalhos
  assert.equal(tr('Plugins created with Google'), 'Plugins criados com o Google');
  assert.equal(tr('Plugins created with Antigravity'), 'Plugins criados com o Antigravity');
  assert.equal(tr('Plugins Built With Google'), 'Plugins criados com o Google');
  assert.equal(tr('Plugins Built With Antigravity'), 'Plugins criados com o Antigravity');

  // Descrições de plugins oficiais
  assert.equal(
    tr('Core tools and knowledge required to develop for Android'),
    'Ferramentas essenciais e conhecimentos necessários para desenvolver para Android.'
  );
  assert.equal(
    tr('Keep your coding agent up to date with the latest web best practices.'),
    'Mantenha seu agente de código atualizado com as melhores práticas modernas da web.'
  );
  assert.equal(
    tr('Using the Antigravity Python SDK to build AI agents'),
    'Usando o SDK Python do Antigravity para criar agentes de IA.'
  );
  assert.equal(
    tr('Curated collection of agent skills for science.'),
    'Coleção selecionada de habilidades de agentes para ciências.'
  );
  assert.equal(
    tr("Prototype, build & run modern apps users love with Firebase's backend, AI, and operational infrastructure."),
    "Crie protótipos, desenvolva e execute aplicativos modernos com o backend, IA e infraestrutura operacional do Firebase."
  );
  assert.equal(
    tr('Reliable automation, in-depth debugging, and performance analysis in Chrome using Chrome DevTools and Puppeteer'),
    'Automação confiável, depuração aprofundada e análise de desempenho no Chrome usando Chrome DevTools e Puppeteer.'
  );

  // Ações de download e instalação
  assert.equal(tr('Download'), 'Baixar');
  assert.equal(tr('Downloading...'), 'Baixando...');
  assert.equal(tr('Downloaded'), 'Baixado');
  assert.equal(tr('Install Plugin'), 'Instalar plugin');
});

test('Tradução de Escopo de Configuração (Modified in Outside of project)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Termos isolados de escopo
  assert.equal(tr('Outside of Project'), 'Fora do projeto');
  assert.equal(tr('Outside of project'), 'Fora do projeto');
  assert.equal(tr('Not in Project'), 'Fora do projeto');

  // Frases compostas de escopo de configuração
  assert.equal(tr('Modified in Outside of project'), 'Modificado fora do projeto');
  assert.equal(tr('Modified in Outside of Project'), 'Modificado fora do projeto');
  assert.equal(tr('Modificado em Fora de projeto'), 'Modificado fora do projeto');
  assert.equal(tr('Modificado em Fora do projeto'), 'Modificado fora do projeto');

  // Frase em projeto específico
  assert.equal(tr('Modified in Ricing PLM'), 'Modificado em Ricing PLM');
  assert.equal(tr('Modified in 2 projects'), 'Modificado em 2 projetos');

  // Parágrafo completo com descrição de configuração
  assert.equal(
    tr('Controla as ações que o agente pode realizar. Modificado em Fora de projeto'),
    'Controla as ações que o agente pode realizar. Modificado fora do projeto'
  );
  assert.equal(
    tr('Controls what actions the agent can take. Modified in Outside of project'),
    'Controla as ações que o agente pode realizar. Modificado fora do projeto'
  );
});

test('Tradução de Servidores MCP, Contadores de Ferramentas e Catálogo de Skills', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Interface de gerenciamento MCP
  assert.equal(tr('Manage MCP Servers'), 'Gerenciar servidores MCP');
  assert.equal(tr('Available MCP Servers'), 'Servidores MCP disponíveis');
  assert.equal(tr('Restart Server'), 'Reiniciar servidor');
  assert.equal(tr('Disable all tools'), 'Desativar todas as ferramentas');
  assert.equal(tr('Enable all tools'), 'Ativar todas as ferramentas');
  assert.equal(tr('Disable tool'), 'Desativar ferramenta');
  assert.equal(tr('Enable tool'), 'Ativar ferramenta');
  assert.equal(tr('Server Status'), 'Status do servidor');
  assert.equal(tr('Server running'), 'Servidor em execução');
  assert.equal(tr('Server stopped'), 'Servidor parado');
  assert.equal(tr('No MCP servers configured'), 'Nenhum servidor MCP configurado');

  // Contadores dinâmicos de ferramentas ativadas e desativadas
  assert.equal(tr('> 30 tools enabled'), '> 30 ferramentas ativadas');
  assert.equal(tr('30 tools enabled'), '30 ferramentas ativadas');
  assert.equal(tr('1 tool enabled'), '1 ferramenta ativada');
  assert.equal(tr('> 1 tool enabled'), '> 1 ferramenta ativada');
  assert.equal(tr('5 tools disabled'), '5 ferramentas desativadas');
  assert.equal(tr('1 tool disabled'), '1 ferramenta desativada');

  // Erros de Proxy MCP e credenciais ADC com preservação de comando gcloud
  assert.equal(
    tr('Error: [MCP Proxy Error] No ADC credentials found. Please run gcloud auth application-default login, or retry your request... : calling "initialize": connect ECONNREFUSED 127.0.0.1'),
    'Erro: [Erro no Proxy MCP] Nenhuma credencial ADC encontrada. Execute "gcloud auth application-default login" ou tente novamente. : ao chamar "initialize": connect ECONNREFUSED 127.0.0.1'
  );
  assert.equal(
    tr('[MCP Proxy Error] No ADC credentials found. Please run gcloud auth application-default login, or retry your request'),
    '[Erro no Proxy MCP] Nenhuma credencial ADC encontrada. Execute "gcloud auth application-default login" ou tente novamente.'
  );

  // Amostras de descrições de Skills traduzidas do catálogo
  assert.equal(
    tr('Uses Chrome DevTools MCP for accessibility (a11y) debugging and auditing based on web.dev guidelines. Use when testing semantic HTML, ARIA labels, focus states, keyboard navigation, tap targets, and color contrast.'),
    'Usa o MCP do Chrome DevTools para depuração e auditoria de acessibilidade (a11y) com base nas diretrizes do web.dev. Use para testar HTML semântico, rótulos ARIA, estados de foco, navegação por teclado, áreas de toque e contraste de cores.'
  );
  assert.equal(
    tr('Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web pages, automating browser interactions, analyzing performance, or inspecting network requests. This skill does not apply to `--slim` mode (MCP configuration).'),
    'Usa o Chrome DevTools via MCP para depuração eficiente, solução de problemas e automação do navegador. Use ao depurar páginas web, automatizar interações do navegador, analisar desempenho ou inspecionar requisições de rede.'
  );
});

test('Tradução de Menus de Imagem, Cabeçalhos de Ação com Pastas e Painel Lateral (Git/Skills/Plugins)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Menus de contexto em imagem
  assert.equal(tr('Copy Image'), 'Copiar imagem');
  assert.equal(tr('Save Image'), 'Salvar imagem');
  assert.equal(tr('Save Image As...'), 'Salvar imagem como...');
  assert.equal(tr('Copy Image Address'), 'Copiar endereço da imagem');
  assert.equal(tr('Open Image in New Tab'), 'Abrir imagem em nova guia');

  // Cabeçalhos de ação e exploração com múltiplos tipos de entidade (arquivos, pastas, ações e comandos)
  assert.equal(
    tr('Explored 3 files 1 folder, 3 actions, ran 1 command'),
    'Explorou 3 arquivos 1 pasta, 3 ações, executou 1 comando'
  );
  assert.equal(
    tr('Explored 3 files, 1 folder, 3 actions, ran 1 command'),
    'Explorou 3 arquivos, 1 pasta, 3 ações, executou 1 comando'
  );
  assert.equal(
    tr('Exploring 2 files, 2 folders, 4 actions, running 2 commands'),
    'Explorando 2 arquivos, 2 pastas, 4 ações, executando 2 comandos'
  );

  // Painel lateral: Git, Skills e Paginação
  assert.equal(
    tr('Staged index changes and working tree changes'),
    'Alterações preparadas no índice e na árvore de trabalho'
  );
  assert.equal(
    tr('All changes since origin/main'),
    'Todas as alterações desde origin/main'
  );
  assert.equal(
    tr('All changes since feat/nova-tela'),
    'Todas as alterações desde feat/nova-tela'
  );
  assert.equal(tr('Skills Used 1'), 'Habilidades usadas 1');
  assert.equal(tr('Skills Used'), 'Habilidades usadas');
  assert.equal(tr('See all (16)'), 'Ver tudo (16)');
  assert.equal(tr('See all'), 'Ver tudo');
  assert.equal(tr('See more (5)'), 'Ver mais (5)');

  // Texto descritivo da página de Plugins (integral e dividido)
  assert.equal(
    tr('Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in Settings.'),
    'Os plugins são coleções empacotadas de habilidades e MCPs para ajudar o agente no Antigravity a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas escolhas nas Configurações.'
  );
  assert.equal(
    tr('Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in '),
    'Os plugins são coleções empacotadas de habilidades e MCPs para ajudar o agente no Antigravity a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas escolhas em '
  );
});

test('Tradução de Tooltips de Documentação e Atalhos de Clique (Click to Open Docs)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Tooltips de documentação em botões e ícones informativos
  assert.equal(tr('Click to Open Docs'), 'Clique para abrir a documentação');
  assert.equal(tr('Click to open docs'), 'Clique para abrir a documentação');
  assert.equal(tr('Click to Open Documentation'), 'Clique para abrir a documentação');
  assert.equal(tr('Open Docs'), 'Abrir documentação');
  assert.equal(tr('Open Documentation'), 'Abrir documentação');
  assert.equal(tr('View Docs'), 'Ver documentação');
  assert.equal(tr('View Documentation'), 'Ver documentação');

  // Ações de clique associadas
  assert.equal(tr('Click to Learn More'), 'Clique para saber mais');
  assert.equal(tr('Click to Copy'), 'Clique para copiar');
  assert.equal(tr('Click to Expand'), 'Clique para expandir');
  assert.equal(tr('Click to Collapse'), 'Clique para recolher');
  assert.equal(tr('Click to Refresh'), 'Clique para atualizar');
  assert.equal(tr('Click to Retry'), 'Clique para tentar novamente');
});

test('Tradução Automática de Pensamentos (Thinking Auto-Translator)', () => {
  const sandbox = setupSandbox();
  const isEnThought = sandbox.window.__CAMBRITH_IS_EN_THOUGHT__;
  const translateThought = sandbox.window.__CAMBRITH_TRANSLATE_THOUGHT__;
  const processThoughts = sandbox.window.__CAMBRITH_PROCESS_THOUGHTS__;

  assert.equal(typeof isEnThought, 'function');
  assert.equal(typeof translateThought, 'function');
  assert.equal(typeof processThoughts, 'function');

  // Detecção de pensamento em inglês
  assert.equal(
    isEnThought("The user wants to keep thinking in English but display text in Portuguese."),
    true
  );
  assert.equal(
    isEnThought("We need to check the repository files and ensure everything is working."),
    true
  );

  // Não deve detectar como inglês textos em português
  assert.equal(
    isEnThought("O usuário deseja manter o raciocínio em inglês mas exibir o texto em português."),
    false
  );
  assert.equal(
    isEnThought("Vamos verificar os arquivos do repositório e garantir que os testes passem."),
    false
  );

  // Não deve detectar regras de CSS ou seletores
  assert.equal(
    isEnThought(".markdown-alert { border-left: .25em solid var(--borderColor-default); }"),
    false
  );

  // Não deve detectar textos muito curtos
  assert.equal(isEnThought("The file is here"), false);
});

test('Tradução de Agentes Especializados e Personalizados (Custom Agents)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Seção de agentes personalizados
  assert.equal(tr('Custom Agents'), 'Agentes personalizados');
  assert.equal(tr('Custom agents'), 'Agentes personalizados');
  assert.equal(tr('Specialized Agents'), 'Agentes especializados');
  assert.equal(tr('Specialized agents'), 'Agentes especializados');
  assert.equal(tr('Subagents'), 'Subagentes');
  assert.equal(tr('New Agent'), 'Novo agente');
  assert.equal(tr('Create Custom Agent'), 'Criar agente personalizado');
  assert.equal(tr('No custom agents configured'), 'Nenhum agente personalizado configurado');
  assert.equal(tr('Copy path'), 'Copiar caminho');
  assert.equal(tr('Delete agent'), 'Excluir agente');

  // Descrição do subagente firestore-rules-author
  assert.equal(
    tr('MANDATORY specialist subagent for Cloud Firestore Security Rules (firestore.rules). Whenever your task requires creating, authoring, or modifying Firestore Security Rules (firestore.rules), you MUST delegate rules authoring to this subagent rather than writing firestore.rules directly in the main agent.'),
    'Subagente especialista OBRIGATÓRIO para regras de segurança do Cloud Firestore (firestore.rules). Sempre que sua tarefa exigir criação, autoria ou modificação de regras de segurança do Firestore (firestore.rules), você DEVE delegar a autoria de regras a este subagente em vez de escrever firestore.rules diretamente no agente principal.'
  );

  // Descrição do subagente flutter_a11y_agent
  assert.equal(
    tr('Expert at reviewing Flutter code for accessibility (a11y) issues. Invoke this agent to perform an a11y review of a codebase, pending changes, or PR.'),
    'Especialista em revisar código Flutter quanto a problemas de acessibilidade (a11y). Invoque este agente para realizar uma revisão de acessibilidade em uma base de código, alterações pendentes ou PR.'
  );

  // Ações dinâmicas de botões e switches
  assert.equal(tr('Toggle firestore-rules-author'), 'Alternar firestore-rules-author');
  assert.equal(tr('Toggle flutter_a11y_agent'), 'Alternar flutter_a11y_agent');
  assert.equal(tr('Delete agent firestore-rules-author'), 'Excluir agente firestore-rules-author');
  assert.equal(tr('Duplicate agent flutter_a11y_agent'), 'Duplicar agente flutter_a11y_agent');
});

