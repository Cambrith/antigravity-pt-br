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
      querySelector: () => null,
      addEventListener: () => {},
      getElementById: () => null,
      createElement: () => ({ setAttribute: () => {}, style: {}, addEventListener: () => {} })
    },
    window: {
      addEventListener: () => {},
      Notification: function MockNotification(title, options) {
        this.title = title;
        this.options = options;
      }
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
  assert.equal(tr('Local Checkout'), 'Checkout local');
  assert.equal(tr('Local checkout'), 'Checkout local');
  assert.equal(tr('Local Checkout (Ctrl+.)'), 'Checkout local (Ctrl+.)');
  assert.equal(tr('Select Checkout'), 'Selecionar checkout');
  assert.equal(tr('Select Checkout (Ctrl+.)'), 'Selecionar checkout (Ctrl+.)');
  assert.equal(tr('Current Checkout'), 'Checkout atual');
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
  assert.equal(tr('Exploring 2 searches, running 1 command'), 'Explorando 2 pesquisas, executando 1 comando');
  assert.equal(tr('Exploring 1 search, running 1 command'), 'Explorando 1 pesquisa, executando 1 comando');
  assert.equal(tr('Explored 2 searches, ran 1 command'), 'Explorou 2 pesquisas, executou 1 comando');
  assert.equal(tr('Exploring 2 searches'), 'Explorando 2 pesquisas');
  assert.equal(tr('Explored 2 searches'), 'Explorou 2 pesquisas');
  assert.equal(tr('Searching 2 files, running 1 command'), 'Pesquisando 2 arquivos, executando 1 comando');
  assert.equal(tr('1 search'), '1 pesquisa');
  assert.equal(tr('2 searches'), '2 pesquisas');
  assert.equal(tr('searches'), 'pesquisas');

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

  // Descrições de plugins oficiais e catálogo exibido na UI
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

  // Dart and Flutter (exibido na interface)
  assert.equal(tr('Dart and Flutter'), 'Dart e Flutter');
  assert.equal(
    tr('Skills providing tailored instructions for happy path Dart and Flutter development workflows.'),
    'Habilidades que fornecem instruções personalizadas para fluxos de desenvolvimento ideais em Dart e Flutter.'
  );
  assert.equal(
    tr('Skills providing tailored instructions for happy path Dart and Flutter development workflows...'),
    'Habilidades que fornecem instruções personalizadas para fluxos de desenvolvimento ideais em Dart e Flutter...'
  );
  assert.equal(
    tr('Skills providing tailored instructions for happy path Dart and Flutter development workflows…'),
    'Habilidades que fornecem instruções personalizadas para fluxos de desenvolvimento ideais em Dart e Flutter…'
  );

  // Google Maps Platform (exibido na interface)
  assert.equal(tr('Google Maps Platform'), 'Google Maps Platform');
  assert.equal(
    tr('Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal...'),
    'Crie e desenvolva protótipos de aplicativos com reconhecimento de localização com o Google Maps Platform. Integre mapas interativos, pesquise e inspecione detalhes do Places, calcule rotas ideais...'
  );
  assert.equal(
    tr('Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal…'),
    'Crie e desenvolva protótipos de aplicativos com reconhecimento de localização com o Google Maps Platform. Integre mapas interativos, pesquise e inspecione detalhes do Places, calcule rotas ideais…'
  );
  assert.equal(
    tr('Integration skill and tools for Google Maps Platform APIs'),
    'Habilidade de integração e ferramentas para APIs do Google Maps Platform.'
  );

  // Data Agent Kit (exibido na interface)
  assert.equal(tr('Data Agent Kit'), 'Data Agent Kit');
  assert.equal(
    tr('Specialized suite of skills for data engineers and database practitioners on Google Cloud'),
    'Conjunto especializado de habilidades para engenheiros de dados e profissionais de banco de dados no Google Cloud.'
  );
  assert.equal(
    tr('Specialized suite of skills for data engineers and database practitioners on Google Cloud...'),
    'Conjunto especializado de habilidades para engenheiros de dados e profissionais de banco de dados no Google Cloud...'
  );
  assert.equal(
    tr('Specialized suite of skills for data engineers and database practitioners on Google Cloud…'),
    'Conjunto especializado de habilidades para engenheiros de dados e profissionais de banco de dados no Google Cloud…'
  );

  // Ações de download e instalação e gerenciamento de plugins
  assert.equal(tr('Download'), 'Baixar');
  assert.equal(tr('Downloading...'), 'Baixando...');
  assert.equal(tr('Downloaded'), 'Baixado');
  assert.equal(tr('Install Plugin'), 'Instalar plugin');
  assert.equal(tr('Installed Plugins'), 'Plugins instalados');
  assert.equal(tr('Available Plugins'), 'Plugins disponíveis');
  assert.equal(tr('Manage Plugins'), 'Gerenciar plugins');
  assert.equal(tr('Search plugins...'), 'Pesquisar plugins...');
  assert.equal(tr('Search plugins…'), 'Pesquisar plugins…');
  assert.equal(tr('Plugin details'), 'Detalhes do plugin');
});

test('Tradução Dinâmica de Novos Plugins Futuros (Dynamic Future Plugin Support)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  const isPluginDesc = sandbox.window.__CAMBRITH_IS_PLUGIN_DESC__;

  // Novos plugins que surjam no futuro com diferentes tecnologias e padrões
  assert.equal(
    tr('Skills providing tailored instructions for React and Next.js development workflows.'),
    'Habilidades que fornecem instruções personalizadas para fluxos de desenvolvimento de React and Next.js.'
  );
  assert.equal(
    tr('Skills providing tailored instructions for Vue.js and Nuxt development workflows...'),
    'Habilidades que fornecem instruções personalizadas para fluxos de desenvolvimento de Vue.js and Nuxt...'
  );
  assert.equal(
    tr('Specialized suite of skills for DevOps engineers on AWS.'),
    'Conjunto especializado de habilidades para DevOps engineers no AWS.'
  );
  assert.equal(
    tr('Specialized suite of skills for Machine Learning practitioners...'),
    'Conjunto especializado de habilidades para Machine Learning practitioners...'
  );
  assert.equal(
    tr('Integration skill and tools for Stripe Payment APIs.'),
    'Habilidade de integração e ferramentas para APIs do Stripe Payment.'
  );
  assert.equal(
    tr('Core tools and knowledge required to develop for Rust.'),
    'Ferramentas essenciais e conhecimentos necessários para desenvolver para Rust.'
  );
  assert.equal(
    tr('Curated collection of agent skills for bioinformatics tasks.'),
    'Coleção selecionada de habilidades de agente para bioinformatics tasks.'
  );
  assert.equal(
    tr('Keep your coding agent up to date with modern GraphQL standards.'),
    'Mantenha seu agente de codificação atualizado com modern GraphQL standards.'
  );
  assert.equal(
    tr('Tools and skills for Kubernetes cluster orchestration.'),
    'Ferramentas e habilidades para Kubernetes cluster orchestration.'
  );
  assert.equal(
    tr('Plugin for Supabase database integration.'),
    'Plugin para Supabase database integration.'
  );
  assert.equal(
    tr('Connects Antigravity with Jira project management.'),
    'Conecta o Antigravity com Jira project management.'
  );

  // Validador de detecção de linguagem para tradução assíncrona sob demanda
  assert.equal(isPluginDesc('Skills providing tailored workflows for custom agents'), true);
  assert.equal(isPluginDesc('Build and deploy microservices with ease'), true);
  assert.equal(isPluginDesc('const x = 123;'), false);
  assert.equal(isPluginDesc('{ "name": "test" }'), false);
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

  // Interface de gerenciamento MCP e Personalizações (Context Usage)
  assert.equal(tr('MCP Tools'), 'Ferramentas MCP');
  assert.equal(tr('Mcp Tools'), 'Ferramentas MCP');
  assert.equal(tr('Mcp tools'), 'Ferramentas MCP');
  assert.equal(tr('MCP tools'), 'Ferramentas MCP');
  assert.equal(tr('mcp tools'), 'ferramentas MCP');
  assert.equal(tr('MCP Tool'), 'Ferramenta MCP');
  assert.equal(tr('Mcp Tool'), 'Ferramenta MCP');
  assert.equal(tr('Mcp tool'), 'ferramenta MCP');
  assert.equal(tr('mcp tool'), 'ferramenta MCP');
  assert.equal(tr('Mcp Tools (4)'), 'Ferramentas MCP (4)');
  assert.equal(tr('Mcp Tool (1)'), 'Ferramenta MCP (1)');
  assert.equal(tr('Mcp Tools: External'), 'Ferramentas MCP: External');
  assert.equal(tr('Manage MCP Servers'), 'Gerenciar servidores MCP');
  assert.equal(tr('Available MCP Servers'), 'Servidores MCP disponíveis');
  assert.equal(tr('MCP Servers'), 'Servidores MCP');
  assert.equal(tr('Mcp Servers'), 'Servidores MCP');
  assert.equal(tr('Mcp servers'), 'Servidores MCP');
  assert.equal(tr('Mcp Server'), 'Servidor MCP');
  assert.equal(tr('Mcp Servers (2)'), 'Servidores MCP (2)');
  assert.equal(tr('Restart Server'), 'Reiniciar servidor');
  assert.equal(tr('Disable all tools'), 'Desativar todas as ferramentas');
  assert.equal(tr('Enable all tools'), 'Ativar todas as ferramentas');
  assert.equal(tr('Disable tool'), 'Desativar ferramenta');
  assert.equal(tr('Enable tool'), 'Ativar ferramenta');
  assert.equal(tr('Server Status'), 'Status do servidor');
  assert.equal(tr('Server running'), 'Servidor em execução');
  assert.equal(tr('Server stopped'), 'Servidor parado');
  assert.equal(tr('No MCP servers configured'), 'Nenhum servidor MCP configurado');

  // Preservação de identificadores técnicos e nomes de servidores (deve retornar null para manter texto original intacto)
  assert.equal(tr('chrome-devtools-mcp'), null);
  assert.equal(tr('firebase-mcp-server'), null);
  assert.equal(tr('github-mcp-server'), null);
  assert.equal(tr('mcp_run_tool'), null);

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
  const prefetchThoughts = sandbox.window.__CAMBRITH_PREFETCH_THOUGHTS__;

  assert.equal(typeof isEnThought, 'function');
  assert.equal(typeof translateThought, 'function');
  assert.equal(typeof processThoughts, 'function');
  assert.equal(typeof prefetchThoughts, 'function');

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

test('Tradução de Prompts de Comandos MCP e Menu Slash (Firebase, Lovable e Slash Commands)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Prompts do Firebase exibidos no menu "/"
  assert.equal(
    tr('Use this command to deploy resources to Firebase.'),
    'Use este comando para implantar recursos no Firebase.'
  );
  assert.equal(
    tr('Use this command to set up Firebase services, like backend and AI features.'),
    'Use este comando para configurar serviços do Firebase, como back-end e recursos de IA.'
  );
  assert.equal(
    tr("Use this command to access a Firebase application's Crashlytics data."),
    "Use este comando para acessar os dados do Crashlytics de um aplicativo Firebase."
  );
  assert.equal(
    tr('Generate secure Firebase Firestore Security Rules and corresponding unit tests for your project.'),
    'Gere regras de segurança seguras do Firebase Firestore e os testes unitários correspondentes para seu projeto.'
  );
  assert.equal(
    tr('Generate secure Firebase Storage Security Rules and corresponding unit tests for your project.'),
    'Gere regras de segurança seguras do Firebase Storage e os testes unitários correspondentes para seu projeto.'
  );

  // Prompts do Lovable exibidos no menu "/" (versões completas e truncadas na UI)
  assert.equal(
    tr('Guide for calling the Lovable public API directly over HTTPS — authentication, pagination, errors, and a fetch-based quick start for managing and publishing projects'),
    'Guia para chamar a API pública do Lovable diretamente via HTTPS — autenticação, paginação, erros e início rápido com fetch para gerenciar e publicar projetos'
  );
  assert.equal(
    tr('Guide for calling the Lovable public API directly over HTTPS — authentication, pagination, errors, a...'),
    'Guia para chamar a API pública do Lovable diretamente via HTTPS — autenticação, paginação, erros, a...'
  );
  assert.equal(
    tr('Former name of api_guide; returns the same public API guide.'),
    'Nome anterior de api_guide; retorna o mesmo guia da API pública.'
  );
  assert.equal(
    tr('How to build apps with Lovable — covers project creation, effective prompting, integrations, deployment, and iteration workflows'),
    'Como criar aplicativos com o Lovable — abrange criação de projetos, criação de prompts eficazes, integrações, implantação e fluxos de iteração'
  );
  assert.equal(
    tr('How to build apps with Lovable — covers project creation, effective prompting, integrations, d...'),
    'Como criar aplicativos com o Lovable — abrange criação de projetos, criação de prompts eficazes, integrações, d...'
  );

  // Comandos slash nativos
  assert.equal(
    tr('Ask a quick question without interrupting the main conversation.'),
    'Faça uma pergunta rápida sem interromper a conversa principal.'
  );
  assert.equal(
    tr('Run until the specified goal is completely finished.'),
    'Execute até que o objetivo especificado seja completamente concluído.'
  );
  assert.equal(
    tr('Run an instruction on a recurring schedule or as a one-time timer.'),
    'Execute uma instrução em um agendamento recorrente ou como um temporizador único.'
  );

  // Preservação estrita dos identificadores técnicos dos comandos
  assert.equal(tr('mcp:firebase-mcp-server:firebase:deploy'), null);
  assert.equal(tr('mcp:firebase-mcp-server:firebase:init'), null);
  assert.equal(tr('mcp:lovable:api_guide'), null);
  assert.equal(tr('mcp:lovable:sdk_guide'), null);
  assert.equal(tr('mcp:lovable:getting_started'), null);
  assert.equal(tr('btw'), null);
  assert.equal(tr('goal'), null);
  assert.equal(tr('schedule'), null);
});

test('Tradução de Regras e Personalizações de Regras (Rules & Rule Previews)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Interface e termos de regras
  assert.equal(tr('Rules'), 'Regras');
  assert.equal(tr('Workspace Rules'), 'Regras do espaço de trabalho');
  assert.equal(tr('User Rules'), 'Regras do usuário');
  assert.equal(tr('Global Rules'), 'Regras globais');
  assert.equal(tr('Project Rules'), 'Regras do projeto');
  assert.equal(tr('Manage Rules'), 'Gerenciar regras');
  assert.equal(tr('Active Rules'), 'Regras ativas');
  assert.equal(tr('No rules configured'), 'Nenhuma regra configurada');
  assert.equal(tr('No rules found'), 'Nenhuma regra encontrada');
  assert.equal(tr('Add Rule'), 'Adicionar regra');
  assert.equal(tr('New Rule'), 'Nova regra');
  assert.equal(tr('Edit Rule'), 'Editar regra');
  assert.equal(tr('Delete Rule'), 'Excluir regra');
  assert.equal(tr('Rule Name'), 'Nome da regra');
  assert.equal(tr('Rule Description'), 'Descrição da regra');
  assert.equal(tr('Rule Content'), 'Conteúdo da regra');

  // Preview e conteúdo de flutter-hot-reload.md exibido no painel de regras (imagem do usuário)
  assert.equal(
    tr('# Proactive Flutter Hot Reload Rule Whenever you edit or modify any `.dart` file under `lib/` in this projec...'),
    '# Regra Proativa de Hot Reload no Flutter Sempre que você editar ou modificar qualquer arquivo `.dart` em `lib/` neste projet...'
  );
  assert.equal(
    tr('# Proactive Flutter Hot Reload Rule Whenever you edit or modify any `.dart` file under `lib/` in this projec…'),
    '# Regra Proativa de Hot Reload no Flutter Sempre que você editar ou modificar qualquer arquivo `.dart` em `lib/` neste projet…'
  );
  assert.equal(
    tr('# Proactive Flutter Hot Reload Rule Whenever you edit or modify any `.dart` file under `lib/` in this project:'),
    '# Regra Proativa de Hot Reload no Flutter Sempre que você editar ou modificar qualquer arquivo `.dart` em `lib/` neste projeto:'
  );
  assert.equal(
    tr('Proactive Flutter Hot Reload Rule'),
    'Regra Proativa de Hot Reload no Flutter'
  );
  assert.equal(
    tr('# Proactive Flutter Hot Reload Rule'),
    '# Regra Proativa de Hot Reload no Flutter'
  );
  assert.equal(
    tr('Proactively connect to running Dart/Flutter apps and trigger hot reload or hot restart upon editing .dart files under lib/.'),
    'Conectar proativamente aos aplicativos Dart/Flutter em execução e acionar hot reload ou hot restart ao editar arquivos .dart em lib/.'
  );

  // Ações dinâmicas de regras
  assert.equal(tr('Toggle rule flutter-hot-reload.md'), 'Alternar regra flutter-hot-reload.md');
  assert.equal(tr('Delete rule flutter-hot-reload.md'), 'Excluir regra flutter-hot-reload.md');

  // Preservação estrita dos identificadores e caminhos de arquivos de regras
  assert.equal(tr('user_global'), null);
  assert.equal(tr('AGENTS.md'), null);
  assert.equal(tr('flutter-hot-reload.md'), null);
});

test('Tradução de Avisos e Notificações do Gemini 4 Argon e Modelos Avançados', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Frase original do aviso no canto inferior direito e no seletor de modelos
  assert.equal(
    tr('Gemini 4 Argon is currently available to Ultra and paid Pro plan subscribers.'),
    'O Gemini 4 Argon está disponível atualmente para assinantes dos planos Ultra e Pro pago.'
  );
  assert.equal(
    tr('Gemini 4 Argon is currently available to Ultra and paid Pro plan subscribers'),
    'O Gemini 4 Argon está disponível atualmente para assinantes dos planos Ultra e Pro pago'
  );
  assert.equal(
    tr('Gemini 4 Argon is currently available to Ultra and paid Pro subscribers.'),
    'O Gemini 4 Argon está disponível atualmente para assinantes do Ultra e Pro pago.'
  );
  assert.equal(
    tr('Gemini 4 Argon is currently available to Ultra plan subscribers.'),
    'O Gemini 4 Argon está disponível atualmente para assinantes do plano Ultra.'
  );
  assert.equal(
    tr('Gemini 4 Argon is currently available to Ultra plan subscribers'),
    'O Gemini 4 Argon está disponível atualmente para assinantes do plano Ultra'
  );
  assert.equal(
    tr('Gemini 4 Argon is currently available to Ultra subscribers.'),
    'O Gemini 4 Argon está disponível atualmente para assinantes do plano Ultra.'
  );

  // Variações de "now available" e "paid plans"
  assert.equal(
    tr('Gemini 4 Argon is now available to Ultra plan subscribers.'),
    'O Gemini 4 Argon já está disponível para assinantes do plano Ultra.'
  );
  assert.equal(
    tr('Gemini 4 Argon is now available to Ultra plan subscribers'),
    'O Gemini 4 Argon já está disponível para assinantes do plano Ultra'
  );
  assert.equal(
    tr('Gemini 4 Argon is now available on paid Pro and Ultra plans.'),
    'O Gemini 4 Argon já está disponível nos planos pagos Pro e Ultra.'
  );
  assert.equal(
    tr('Gemini 4 Argon is currently available on Ultra plans.'),
    'O Gemini 4 Argon está disponível atualmente nos planos Ultra.'
  );
  assert.equal(
    tr('Gemini 4 Argon is available on the Ultra plan.'),
    'O Gemini 4 Argon está disponível no plano Ultra.'
  );

  // Avisos de upgrade e acesso
  assert.equal(
    tr('Upgrade to Ultra to access Gemini 4 Argon.'),
    'Faça upgrade para o Ultra para acessar o Gemini 4 Argon.'
  );
  assert.equal(
    tr('Gemini 4 Argon requires an Ultra subscription.'),
    'O Gemini 4 Argon requer uma assinatura do plano Ultra.'
  );
  assert.equal(
    tr('Access Gemini 4 Argon with an Ultra plan.'),
    'Acesse o Gemini 4 Argon com um plano Ultra.'
  );

  // Ações e botões
  assert.equal(tr('Gemini 4 Argon is now available.'), 'O Gemini 4 Argon já está disponível.');
  assert.equal(tr('Gemini 4 Argon is available.'), 'O Gemini 4 Argon está disponível.');
  assert.equal(tr('Try Gemini 4 Argon'), 'Experimente o Gemini 4 Argon');
  assert.equal(tr('Switch to Gemini 4 Argon'), 'Mudar para o Gemini 4 Argon');

  // Sonnet 5.5, Opus 5.5 e GPT-OSS
  assert.equal(
    tr('Sonnet 5.5 is now available on paid Pro and Ultra plans. Third-party model access will no longer be available on your current plan starting on November 2, 2026.'),
    'O Sonnet 5.5 já está disponível nos planos pagos Pro e Ultra. O acesso a modelos de terceiros não estará mais disponível em seu plano atual a partir de 2 de novembro de 2026.'
  );
  assert.equal(
    tr('Opus 5.5 is now available on paid Pro and Ultra plans. Third-party model access will no longer be available on your current plan starting on November 2, 2026.'),
    'O Opus 5.5 já está disponível nos planos pagos Pro e Ultra. O acesso a modelos de terceiros não estará mais disponível em seu plano atual a partir de 2 de novembro de 2026.'
  );
  assert.equal(
    tr('GPT-OSS will be removed from Antigravity on November 2, 2026.'),
    'O GPT-OSS será removido do Antigravity em 2 de novembro de 2026.'
  );

  // Validação da interceptação da API Notification do navegador/Electron
  const notif = new sandbox.window.Notification(
    'Gemini 4 Argon is currently available to Ultra plan subscribers.',
    { body: 'Upgrade to Ultra to access Gemini 4 Argon.' }
  );
  assert.equal(notif.title, 'O Gemini 4 Argon está disponível atualmente para assinantes do plano Ultra.');
  assert.equal(notif.options.body, 'Faça upgrade para o Ultra para acessar o Gemini 4 Argon.');
});

test('Tradução de Ações de Tarefas (Checked/Killed task), Concordância e Pensamento Instantâneo', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  const thoughtSync = sandbox.window.__CAMBRITH_TRANSLATE_THOUGHT_SYNC__;

  // Ações de tarefas evidenciadas na interface do usuário
  assert.equal(
    tr('Checked task Busca por Antigravity e tradução'),
    'Verificou tarefa Busca por Antigravity e tradução'
  );
  assert.equal(
    tr('Killed task Busca por Antigravity e tradução'),
    'Encerrou tarefa Busca por Antigravity e tradução'
  );
  assert.equal(
    tr('Checking task Busca de repositórios Git'),
    'Verificando tarefa Busca de repositórios Git'
  );
  assert.equal(
    tr('Killing task Tarefa em execução'),
    'Encerrando tarefa Tarefa em execução'
  );
  assert.equal(
    tr('Started task Compilação do projeto'),
    'Iniciou tarefa Compilação do projeto'
  );
  assert.equal(
    tr('Cancelled task Processo de build'),
    'Cancelou tarefa Processo de build'
  );
  assert.equal(tr('Listed tasks'), 'Listou tarefas');
  assert.equal(tr('Listing tasks'), 'Listando tarefas');

  // Concordância estrita de singular em ações compostas ("1 comando", nunca "1 comandos")
  assert.equal(
    tr('Exploring 2 files, 2 actions, running 1 commands'),
    'Explorando 2 arquivos, 2 ações, executando 1 comando'
  );
  assert.equal(
    tr('Explored 2 files, 2 actions, ran 1 command'),
    'Explorou 2 arquivos, 2 ações, executou 1 comando'
  );
  assert.equal(
    tr('Running 1 commands'),
    'Executando 1 comando'
  );
  assert.equal(
    tr('Ran 1 commands'),
    'Executou 1 comando'
  );

  // Termos de cabeçalho de raciocínio
  assert.equal(tr('Thinking...'), 'Pensando...');
  assert.equal(tr('Thinking'), 'Pensando');
  assert.equal(tr('Thought process'), 'Processo de raciocínio');
  assert.equal(tr('Reasoning process'), 'Processo de raciocínio');
  assert.equal(tr('Reasoning'), 'Raciocínio');

  // Tradução síncrona instantânea de raciocínio (Zero Latency)
  assert.equal(
    thoughtSync('The user wants me to implement this translation feature.'),
    'O usuário quer que eu implement this translation feature.'
  );
  assert.equal(
    thoughtSync('First, let\'s check the files in the directory.'),
    'Primeiro, vamos verificar the files in the directory.'
  );
  assert.equal(
    thoughtSync('In the uploaded image, we can see the task list.'),
    'Na imagem enviada, we can see the task list.'
  );
});

test('Tradução de Auditoria Profunda da Interface e Motor Avançado de Pensamento', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  const thoughtSync = sandbox.window.__CAMBRITH_TRANSLATE_THOUGHT_SYNC__;

  // Itens encontrados na auditoria profunda da interface ao vivo
  assert.equal(tr('Terminal tab'), 'Aba do terminal');
  assert.equal(
    tr('Load older messages, showing 135 of 502'),
    'Carregar mensagens anteriores, exibindo 135 de 502'
  );
  assert.equal(tr('Load older messages'), 'Carregar mensagens anteriores');
  assert.equal(tr('Clear conversation'), 'Limpar conversa');
  assert.equal(tr('Delete conversation'), 'Excluir conversa');
  assert.equal(tr('Rename conversation'), 'Renomear conversa');
  assert.equal(tr('Pin conversation'), 'Fixar conversa');
  assert.equal(tr('Unpin conversation'), 'Desafixar conversa');
  assert.equal(tr('Share conversation'), 'Compartilhar conversa');
  assert.equal(tr('Fork conversation'), 'Bifurcar conversa');
  assert.equal(tr('Export conversation'), 'Exportar conversa');
  assert.equal(tr('Archive conversation'), 'Arquivar conversa');
  assert.equal(tr('Search past conversations...'), 'Pesquisar conversas anteriores...');
  assert.equal(tr('No past conversations found'), 'Nenhuma conversa anterior encontrada');

  // Regras de pensamento síncrono expandidas
  assert.equal(
    thoughtSync('The user changed setting Model Selection from Gemini 3.8 Flash (Medium) to Gemini 3.8 Flash (High).'),
    'O usuário alterou a configuração Model Selection from Gemini 3.8 Flash (Medium) to Gemini 3.8 Flash (High).'
  );
  assert.equal(
    thoughtSync('Observed durations for a specific task varied significantly across several runs: 2 minutes, 30 seconds, and 3 minutes.'),
    'As durações observadas para uma tarefa específica varied significantly across several runs: 2 minutes, 30 seconds, and 3 minutes.'
  );
  assert.equal(
    thoughtSync('Concurrently, tool usage metrics reveal exploration of differing numbers of files and commands across these runs.'),
    'Simultaneamente, as métricas de uso de ferramentas revelam exploration of differing numbers of files and commands across these runs.'
  );
  assert.equal(
    thoughtSync('The critical observation is the absence of content within the DOM when a button is collapsed.'),
    'A observação crítica é the absence of content within the DOM when a button is collapsed.'
  );
  assert.equal(
    thoughtSync('In order to ensure that all thinking blocks are localized, we must inspect the React Fiber tree.'),
    'Para garantir que all thinking blocks are localized, we must inspect the React Fiber tree.'
  );
});

test('Tradução de Termos de Execução, Agrupamentos de Ferramentas, Tasks e Timers (v1.5.1)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  const thoughtSync = sandbox.window.__CAMBRITH_TRANSLATE_THOUGHT_SYNC__;

  // Agrupamentos de ferramentas e tarefas
  assert.equal(tr('Explored 1 task'), 'Explorou 1 tarefa');
  assert.equal(tr('Explorou 1 task >'), 'Explorou 1 tarefa >');
  assert.equal(tr('Explored 1 task >'), 'Explorou 1 tarefa >');
  assert.equal(
    tr('Explored 1 arquivo, 2 tasks, executou 2 comandos'),
    'Explorou 1 arquivo, 2 tarefas, executou 2 comandos'
  );
  assert.equal(
    tr('Explorou 1 arquivo, 2 tasks, executou 2 comandos >'),
    'Explorou 1 arquivo, 2 tarefas, executou 2 comandos >'
  );
  assert.equal(
    tr('Explored 2 tasks, ran 1 command'),
    'Explorou 2 tarefas, executou 1 comando'
  );
  assert.equal(
    tr('Explorou 2 tasks, executou 1 comando >'),
    'Explorou 2 tarefas, executou 1 comando >'
  );
  assert.equal(
    tr('Explorando 6 arquivos, executando 1 comando v'),
    'Explorando 6 arquivos, executando 1 comando v'
  );
  assert.equal(
    tr('Exploring 1 task, running 1 command'),
    'Explorando 1 tarefa, executando 1 comando'
  );

  // Temporizadores e schedule
  assert.equal(tr('Timed 2 seconds'), 'Temporizou 2 segundos');
  assert.equal(tr('Timed 2 seconds >'), 'Temporizou 2 segundos >');
  assert.equal(tr('Timed 1 second'), 'Temporizou 1 segundo');
  assert.equal(tr('Timed 1 second >'), 'Temporizou 1 segundo >');
  assert.equal(tr('Timed 500 ms'), 'Temporizou 500 ms');
  assert.equal(tr('Timing 2 seconds'), 'Temporizando 2 segundos');
  assert.equal(tr('Timing 2 seconds >'), 'Temporizando 2 segundos >');
  assert.equal(tr('Finished waiting 2 seconds.'), 'Concluiu espera de 2 segundos.');
  assert.equal(
    tr('Waiting for command completion (up to 5 seconds)'),
    'Aguardando conclusão do comando (até 5 segundos)'
  );
  assert.equal(tr('Checking command status'), 'Verificando status do comando');
  assert.equal(tr('Checked command status'), 'Verificou status do comando');
  assert.equal(tr('Executing task: build'), 'Executando tarefa: build');
  assert.equal(tr('task cancelled (reason: aborted)'), 'tarefa cancelada (motivo: aborted)');
  assert.equal(tr('Search tasks...'), 'Pesquisar tarefas...');
  assert.equal(tr('Cancel task'), 'Cancelar tarefa');
  assert.equal(tr('Edit task title'), 'Editar título da tarefa');
  assert.equal(tr('Timer has expired'), 'O temporizador expirou');
  assert.equal(tr('Timer expired'), 'Temporizador expirado');
  assert.equal(tr('Sent input to command'), 'Enviou entrada para o comando');
  assert.equal(
    tr('Sent termination request to command'),
    'Enviou solicitação de encerramento para o comando'
  );

  // Raciocínio síncrono sobre tarefas e temporizadores
  assert.equal(
    thoughtSync('Waiting for the task notification to proceed with the next steps.'),
    'Aguardando a notificação da tarefa'
  );
  assert.equal(
    thoughtSync('Checking the task status to ensure the build succeeded.'),
    'Verificando o status da tarefa'
  );
  assert.equal(
    thoughtSync('The task is still running in the background.'),
    'A tarefa ainda está em execução'
  );
  assert.equal(
    thoughtSync('The task has completed successfully without any errors.'),
    'A tarefa foi concluída'
  );
});

test('Tradução de Atualização de Horário e Timestamps (Updated / Created / Last updated)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Horários simples (24h e 12h AM/PM)
  assert.equal(tr('Updated 17:41'), 'Atualizado às 17:41');
  assert.equal(tr('Updated 09:05'), 'Atualizado às 09:05');
  assert.equal(tr('Updated 5:41 PM'), 'Atualizado às 17:41');
  assert.equal(tr('Updated 12:00 AM'), 'Atualizado às 00:00');

  // Datas e horários compostos
  assert.equal(tr('Updated Oct 18, 17:41'), 'Atualizado em 18 de out., às 17:41');
  assert.equal(tr('Updated 18 de out., 17:41'), 'Atualizado em 18 de out., às 17:41');
  assert.equal(tr('Updated May 5, 09:30'), 'Atualizado em 5 de mai., às 09:30');

  // Timestamps relativos
  assert.equal(tr('Updated just now'), 'Atualizado agora mesmo');
  assert.equal(tr('Updated today'), 'Atualizado hoje');
  assert.equal(tr('Updated yesterday'), 'Atualizado ontem');
  assert.equal(tr('Updated 1 minute ago'), 'Atualizado há 1 minuto');
  assert.equal(tr('Updated 5 minutes ago'), 'Atualizado há 5 minutos');
  assert.equal(tr('Updated 2 hours ago'), 'Atualizado há 2 horas');
  assert.equal(tr('Updated 3 days ago'), 'Atualizado há 3 dias');

  // Timestamps relativos avulsos e compactos de mensagens de chat
  assert.equal(tr('1m ago'), 'há 1 min');
  assert.equal(tr('2m ago'), 'há 2 min');
  assert.equal(tr('15m ago'), 'há 15 min');
  assert.equal(tr('1h ago'), 'há 1h');
  assert.equal(tr('2h ago'), 'há 2h');
  assert.equal(tr('1d ago'), 'há 1d');
  assert.equal(tr('3d ago'), 'há 3d');
  assert.equal(tr('30s ago'), 'há 30s');
  assert.equal(tr('1w ago'), 'há 1 sem');
  assert.equal(tr('1mo ago'), 'há 1 mês');
  assert.equal(tr('2mo ago'), 'há 2 meses');
  assert.equal(tr('1y ago'), 'há 1 ano');
  assert.equal(tr('Sent 1m ago'), 'Enviado há 1 min');
  assert.equal(tr('Edited 2h ago'), 'Editado há 2h');

  // Created e Last updated
  assert.equal(tr('Created 17:41'), 'Criado às 17:41');
  assert.equal(tr('Created Oct 18, 17:41'), 'Criado em 18 de out., às 17:41');
  assert.equal(tr('Last updated 17:41'), 'Última atualização às 17:41');
  assert.equal(tr('Last updated: 17:41'), 'Última atualização: 17:41');
  assert.equal(tr('Edited 17:41'), 'Editado às 17:41');

  // Ações de etapas de arquivos
  assert.equal(tr('Created index.js'), 'Criou index.js');
  assert.equal(tr('Edited package.json'), 'Editou package.json');
  assert.equal(tr('Deleted old_file.ts'), 'Excluiu old_file.ts');
});

test('Tradução de Menus de Contexto, Submenus de Conversas e Ações de Divisão (v1.6.2)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Submenu Copiar
  assert.equal(tr('Conversation Name'), 'Nome da conversa');
  assert.equal(tr('Conversation ID'), 'ID da conversa');
  assert.equal(tr('Project Name'), 'Nome do projeto');
  assert.equal(tr('Copy Conversation ID'), 'Copiar ID da conversa');
  assert.equal(tr('Copy Project Name'), 'Copiar nome do projeto');
  assert.equal(tr('Copy Conversation Name'), 'Copiar nome da conversa');
  assert.equal(tr('Copy >'), 'Copiar >');

  // Menus de contexto de conversas
  assert.equal(tr('Mark Unread'), 'Marcar como não lida');
  assert.equal(tr('Mark Read'), 'Marcar como lida');
  assert.equal(tr('Mark as Unread'), 'Marcar como não lida');
  assert.equal(tr('Mark as Read'), 'Marcar como lida');
  assert.equal(tr('Split'), 'Dividir');
  assert.equal(tr('Split >'), 'Dividir >');
  assert.equal(tr('Split Right'), 'Dividir à direita');
  assert.equal(tr('Split Down'), 'Dividir abaixo');
  assert.equal(tr('Split Left'), 'Dividir à esquerda');
  assert.equal(tr('Split Up'), 'Dividir acima');
  assert.equal(tr('Archive'), 'Arquivar');
  assert.equal(tr('Unarchive'), 'Desarquivar');
  assert.equal(tr('Duplicate'), 'Duplicar');
});

test('Tradução de Histórico de Conversas e Dashboard de Automações (v1.7.1)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Banner e avisos do Histórico de Conversas
  assert.equal(tr('This page is going away soon'), 'Esta página será descontinuada em breve');
  assert.equal(tr('Search Across Conversations'), 'Pesquisar em todas as conversas');
  assert.equal(tr('Search Across Conversations...'), 'Pesquisar em todas as conversas...');
  assert.equal(tr('Search conversations with'), 'Pesquise conversas com');
  assert.equal(tr('in the top left.'), 'no canto superior esquerdo.');
  assert.equal(tr('View archived in the sidebar'), 'Veja as arquivadas na barra lateral');
  assert.equal(tr('View archived in the sidebar ('), 'Veja as arquivadas na barra lateral (');
  assert.equal(tr('View archived in the sidebar (menu).'), 'Veja as arquivadas na barra lateral (menu).');
  assert.equal(tr('View archived in the sidebar (menu)'), 'Veja as arquivadas na barra lateral (menu)');
  assert.equal(tr('now'), 'agora');
  assert.equal(tr('Display Options'), 'Opções de exibição');
  assert.equal(tr('No conversations found'), 'Nenhuma conversa encontrada');

  // Dashboard de Automações e Sidecars
  assert.equal(tr('Create with Prompt'), 'Criar com prompt');
  assert.equal(tr('+ New'), '+ Novo');
  assert.equal(tr('New'), 'Novo');
  assert.equal(tr('Search automations...'), 'Pesquisar automações...');
  assert.equal(tr('No automations configured.'), 'Nenhuma automação configurada.');
  assert.equal(tr('No scheduled tasks configured.'), 'Nenhuma tarefa agendada configurada.');
  assert.equal(tr('Scheduled Tasks'), 'Tarefas agendadas');
  assert.equal(tr('Refresh all credentials'), 'Atualizar todas as credenciais');
  assert.equal(tr('Delete Task'), 'Excluir tarefa');
  assert.equal(tr('Runs on'), 'Executa em');
  assert.equal(tr('Enter a prompt for the agent to run...'), 'Digite uma instrução para o agente executar...');

  // Notificações do sistema e término de tarefas do agente
  assert.equal(tr('Agent finished'), 'O agente concluiu a tarefa');
  assert.equal(tr('Action requires your attention'), 'Uma ação requer sua atenção');
  assert.equal(tr('The agent is waiting for your input.'), 'O agente está aguardando sua resposta.');
  assert.equal(tr('The agent has a question for you:'), 'O agente tem uma pergunta para você:');
  assert.equal(tr('The agent has questions for you:'), 'O agente tem perguntas para você:');
  assert.equal(tr('Click to respond to the question.'), 'Clique para responder à pergunta.');
  assert.equal(tr('Click to respond to the questions.'), 'Clique para responder às perguntas.');
  assert.equal(tr('Requesting your permission in Terminal:'), 'Solicitando sua permissão no Terminal:');
  assert.equal(tr('Requesting your permission to execute JavaScript:'), 'Solicitando sua permissão para executar JavaScript:');
  assert.equal(tr('Requesting your permission to open URL:'), 'Solicitando sua permissão para abrir URL:');
  assert.equal(tr('Requesting your permission:'), 'Solicitando sua permissão:');
});

test('Tradução Completa do Modal e Página de Automações e Sidecars (v1.7.9)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Modal de Criação de Automação e Sidecars
  assert.equal(tr('New Automation'), 'Nova automação');
  assert.equal(tr('Add Automation'), 'Adicionar automação');
  assert.equal(tr('Enter automation name...'), 'Digite o nome da automação...');
  assert.equal(tr('New Scheduled Task'), 'Nova tarefa agendada');
  assert.equal(tr('Add Scheduled Task'), 'Adicionar tarefa agendada');
  assert.equal(tr('Enter scheduled task name...'), 'Digite o nome da tarefa agendada...');
  assert.equal(tr('New Sidecar'), 'Novo sidecar');
  assert.equal(tr('Add Sidecar'), 'Adicionar sidecar');
  assert.equal(tr('Enter sidecar name...'), 'Digite o nome do sidecar...');
  assert.equal(tr('Name'), 'Nome');
  assert.equal(tr('Title'), 'Título');
  assert.equal(tr('Trigger'), 'Gatilho');
  assert.equal(tr('Time Zone'), 'Fuso horário');
  assert.equal(tr('around'), 'por volta das');
  assert.equal(tr('on'), 'em');
  assert.equal(tr('This computer'), 'Este computador');
  assert.equal(tr('Runs in the cloud'), 'Executa na nuvem');
  assert.equal(tr('Runs on this computer'), 'Executa neste computador');
  assert.equal(tr('Select Day'), 'Selecionar dia');
  assert.equal(tr('Select workspace'), 'Selecionar espaço de trabalho');
  assert.equal(tr('Time Trigger'), 'Gatilho de horário');
  assert.equal(tr('Event Trigger'), 'Gatilho de evento');
  assert.equal(tr('Trigger Type'), 'Tipo de gatilho');
  assert.equal(tr('Frequency'), 'Frequência');
  assert.equal(tr('Execution Identity'), 'Identidade de execução');
  assert.equal(tr('Environment'), 'Ambiente');
  assert.equal(tr('Manage Permissions'), 'Gerenciar permissões');
  assert.equal(tr('Run Now'), 'Executar agora');
  assert.equal(tr('Delete Automation'), 'Excluir automação');
  assert.equal(tr('Deleting...'), 'Excluindo...');
  assert.equal(tr('Creating…'), 'Criando…');

  // Interceptação de Prompts Automáticos do Slash Command (/automation)
  const autoCmd = "[/automation](slashCommand;automation) Guide me through creating an automated task";
  const sub38 = vm.runInContext(`JSON.stringify(("${autoCmd}").substring(38))`, sandbox);
  const sub39 = vm.runInContext(`JSON.stringify(("${autoCmd}").substring(39))`, sandbox);
  assert.equal(JSON.parse(sub38), " Me guie na criação de uma tarefa automatizada.");
  assert.equal(JSON.parse(sub39), "Me guie na criação de uma tarefa automatizada.");

  const slice38 = vm.runInContext(`JSON.stringify(("${autoCmd}").slice(38))`, sandbox);
  const slice39 = vm.runInContext(`JSON.stringify(("${autoCmd}").slice(39))`, sandbox);
  assert.equal(JSON.parse(slice38), " Me guie na criação de uma tarefa automatizada.");
  assert.equal(JSON.parse(slice39), "Me guie na criação de uma tarefa automatizada.");

  const jsonParsed = vm.runInContext(`JSON.parse(JSON.stringify({ prompt: "${autoCmd}" }))`, sandbox);
  assert.equal(jsonParsed.prompt, "[/automation](slashCommand;automation) Me guie na criação de uma tarefa automatizada.");
});

test('Tradução de Permissões e Políticas em Conversas Fora de Projetos (v1.8.0)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Frases compostas de escopo de conversa e predefinições de permissões
  assert.equal(tr('when working in these conversations.'), 'ao trabalhar nestas conversas.');
  assert.equal(tr('when working in these conversations'), 'ao trabalhar nestas conversas');
  assert.equal(tr('when working in this project.'), 'ao trabalhar neste projeto.');
  assert.equal(tr('Inherits your Global Permissions when working in these conversations.'), 'Herda suas Permissões Globais ao trabalhar nestas conversas.');
  assert.equal(tr('Inherits your Global Permissions when working in these conversations'), 'Herda suas Permissões Globais ao trabalhar nestas conversas');
  assert.equal(tr('Inherits your Global Plan Review Policy when working in these conversations.'), 'Herda sua Política Global de Revisão de Planos ao trabalhar nestas conversas.');
  assert.equal(tr('Inherits your Global Artifact Review Policy when working in these conversations.'), 'Herda sua Política Global de Revisão de Artefatos ao trabalhar nestas conversas.');
  assert.equal(tr('Terminal commands always require review and the agent cannot access files outside of its given working folders.'), 'Comandos de terminal sempre exigem revisão e o agente não pode acessar arquivos fora das pastas de trabalho definidas.');
  assert.equal(tr('By default, agents work in folders you choose and ask before sensitive changes. Adjust this anytime in Settings.'), 'Por padrão, os agentes trabalham nas pastas que você escolher e pedem permissão antes de alterações sensíveis. Ajuste isso a qualquer momento nas Configurações.');
  assert.equal(tr('Proceed in Sandbox'), 'Prosseguir no sandbox');
});

test('Tradução do Seletor de Projetos, Espaços de Trabalho e Máquinas (v1.8.4)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Itens do seletor de projeto e submenus
  assert.equal(tr('Recent'), 'Recentes');
  assert.equal(tr('This Computer'), 'Este computador');
  assert.equal(tr('Search Projects...'), 'Pesquisar projetos...');
  assert.equal(tr('Search Projects…'), 'Pesquisar projetos…');
  assert.equal(tr('Search projects...'), 'Pesquisar projetos...');
  assert.equal(tr('Search Workspaces...'), 'Pesquisar espaços de trabalho...');
  assert.equal(tr('Search Workspaces…'), 'Pesquisar espaços de trabalho…');
  assert.equal(tr('Connect GitHub'), 'Conectar ao GitHub');
  assert.equal(tr('GitHub Repositories'), 'Repositórios GitHub');
  assert.equal(tr('Loading Repositories...'), 'Carregando repositórios...');
  assert.equal(tr('Loading Repositories…'), 'Carregando repositórios…');
  assert.equal(tr('No matching repositories'), 'Nenhum repositório correspondente');
  assert.equal(tr('No repositories found'), 'Nenhum repositório encontrado');
  assert.equal(tr('Remote Projects'), 'Projetos remotos');
  assert.equal(tr('New Remote Project'), 'Novo projeto remoto');
  assert.equal(tr('Open Link in External Browser'), 'Abrir link no navegador externo');
  assert.equal(tr('Reopen Closed Tab'), 'Reabrir aba fechada');
  assert.equal(tr('Close Tabs to the Left'), 'Fechar abas à esquerda');
  assert.equal(tr('Toggle Side Panel'), 'Alternar painel lateral');
  assert.equal(tr('Move Conversation Up'), 'Mover conversa para cima');
  assert.equal(tr('Move Conversation Down'), 'Mover conversa para baixo');
});

test('Tradução do Modo Voz, Ditado e Controles de Áudio (v1.8.5)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Botões e tooltips do modo de voz e dock
  assert.equal(tr('Start Voice mode'), 'Iniciar modo de voz');
  assert.equal(tr('Start Live Chat'), 'Iniciar chat ao vivo');
  assert.equal(tr('End Voice mode'), 'Encerrar modo de voz');
  assert.equal(tr('End Live chat'), 'Encerrar chat ao vivo');
  assert.equal(tr('Voice mode in progress'), 'Modo de voz em andamento');
  assert.equal(tr('Live chat in progress'), 'Chat ao vivo em andamento');
  assert.equal(tr('Live transcript'), 'Transcrição ao vivo');
  assert.equal(tr('Voice transcript'), 'Transcrição de voz');

  // Controles de áudio e microfone
  assert.equal(tr('Unmute mic'), 'Ativar microfone');
  assert.equal(tr('Mute mic'), 'Silenciar microfone');
  assert.equal(tr('Unmute Antigravity'), 'Ativar áudio do Antigravity');
  assert.equal(tr('Mute Antigravity'), 'Silenciar Antigravity');
  assert.equal(tr('Unmute Jetski'), 'Ativar áudio do Jetski');
  assert.equal(tr('Mute Jetski'), 'Silenciar Jetski');
  assert.equal(tr('Mute mic (Alt+M)'), 'Silenciar microfone (Alt+M)');
  assert.equal(tr('Unmute mic (Alt+M)'), 'Ativar microfone (Alt+M)');
  assert.equal(tr('Mute Antigravity (Alt+Shift+M)'), 'Silenciar Antigravity (Alt+Shift+M)');
  assert.equal(tr('Unmute Antigravity (Alt+Shift+M)'), 'Ativar áudio do Antigravity (Alt+Shift+M)');
  assert.equal(tr('Dismiss microphone warning'), 'Dispensar aviso do microfone');
  assert.equal(tr('No mic audio detected'), 'Nenhum áudio do microfone detectado');
  assert.equal(tr('No mic audio detected. Switch mic'), 'Nenhum áudio do microfone detectado. Trocar microfone');
  assert.equal(tr('Switch mic'), 'Trocar microfone');
  assert.equal(tr('Default mic'), 'Microfone padrão');

  // Gravação de áudio e ditado
  assert.equal(tr('Record Audio'), 'Gravar áudio');
  assert.equal(tr('Record voice memo'), 'Gravar memorando de voz');
  assert.equal(tr('Stop recording'), 'Parar gravação');
  assert.equal(tr('Stop Recording'), 'Parar gravação');
  assert.equal(tr('Stop Recording and Send'), 'Parar gravação e enviar');
  assert.equal(tr('Recording'), 'Gravando');
  assert.equal(tr('Finalizing...'), 'Finalizando...');
  assert.equal(tr('Finalizing…'), 'Finalizando…');
  assert.equal(tr('Finalizing transcription...'), 'Finalizando transcrição...');
  assert.equal(tr('Sending transcribed message...'), 'Enviando mensagem transcrita...');
  assert.equal(tr('Cancel (Ctrl+D)'), 'Cancelar (Ctrl+D)');
  assert.equal(tr('Cancel (⌃C)'), 'Cancelar (⌃C)');

  // Velocidade e volume
  assert.equal(tr('Voice speed'), 'Velocidade da voz');
  assert.equal(tr('Voice Speed'), 'Velocidade da voz');
  assert.equal(tr('Voice Speed, 1.2x'), 'Velocidade da voz, 1.2x');
  assert.equal(tr('Voice speed, 0.8x'), 'Velocidade da voz, 0.8x');
  assert.equal(tr('Voice volume'), 'Volume da voz');
  assert.equal(tr('How loud Antigravity\'s voice is.'), 'A altura do volume da voz do Antigravity.');

  // Seletor de voz e tons
  assert.equal(tr('Choose Antigravity\'s Voice'), 'Escolha a voz do Antigravity');
  assert.equal(tr('Choose Jetski\'s Voice'), 'Escolha a voz do Jetski');
  assert.equal(tr('Previous voice'), 'Voz anterior');
  assert.equal(tr('Next voice'), 'Próxima voz');
  assert.equal(tr('Use Fola'), 'Usar Fola');
  assert.equal(tr('Use Arlo'), 'Usar Arlo');
  assert.equal(tr('Fola, voice 1 of 9'), 'Fola, voz 1 de 9');
  assert.equal(tr('Clear and friendly'), 'Clara e amigável');
  assert.equal(tr('Confident and clear'), 'Confiante e clara');
  assert.equal(tr('Warm and engaging'), 'Calorosa e envolvente');
  assert.equal(tr('Warm and approachable'), 'Calorosa e acessível');
  assert.equal(tr('Deep and velvety'), 'Profunda e aveludada');
  assert.equal(tr('Light and precise'), 'Leve e precisa');

  // Gravações salvas e histórico
  assert.equal(tr('3 calls · 4.2 MB'), '3 chamadas · 4.2 MB');
  assert.equal(tr('1 call · 1.1 MB'), '1 chamada · 1.1 MB');
  assert.equal(tr('Deleted 2 recordings (3.5 MB)'), 'Excluída(s) 2 gravação(ões) (3.5 MB)');
  assert.equal(tr('This deletes 3 call recordings (4.2 MB) from your machine. You can\'t undo this.'), 'Isso exclui 3 gravações de chamada (4.2 MB) de sua máquina. Você não pode desfazer isso.');
  assert.equal(tr('Back to chat'), 'Voltar ao chat');
  assert.equal(tr('Back to Projeto Alpha'), 'Voltar para Projeto Alpha');
  assert.equal(tr('Started voice chat · 14:30'), 'Chat de voz iniciado · 14:30');
  assert.equal(tr('Open Voice transcript, 14:30 · 2m 10s'), 'Abrir transcrição de voz, 14:30 · 2m 10s');
});

test('Tradução Completa Antigravity v2.31.2: Saudações, Recursos Remotos, Voz e Configurações (v1.8.6)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Saudações personalizadas da tela inicial
  assert.equal(tr('Welcome back, Enzo. Where should we pick up?'), 'Bem-vindo de volta, Enzo. Onde devemos continuar?');
  assert.equal(tr('Good to see you, Enzo. What\'s next?'), 'Que bom ver você, Enzo. Qual é o próximo passo?');
  assert.equal(tr('Hey Enzo, what should we build today?'), 'Olá, Enzo, o que devemos construir hoje?');
  assert.equal(tr('Welcome back. Where should we pick up?'), 'Bem-vindo de volta. Onde devemos continuar?');

  // Criar projeto remoto e recursos em nuvem
  assert.equal(tr('Select Resource(s)'), 'Selecionar recurso(s)');
  assert.equal(tr('Add Resource'), 'Adicionar recurso');
  assert.equal(tr('Project location'), 'Local do projeto');
  assert.equal(tr('Uploaded files and connected resources are mounted in your cloud environment.'), 'Os arquivos enviados e os recursos conectados são montados em seu ambiente na nuvem.');
  assert.equal(tr('Stored and mounted in your cloud environment'), 'Armazenado e montado no seu ambiente na nuvem');
  assert.equal(tr('Connected Google Drive and GitHub resources'), 'Recursos conectados do Google Drive e do GitHub');
  assert.equal(tr('Work in a New Worktree'), 'Trabalhar em um novo worktree');

  // Modo voz v2.31.2: permissões de microfone, erros de login e transcrição
  assert.equal(tr('Allow microphone access to start Voice'), 'Permita o acesso ao microfone para iniciar a Voz');
  assert.equal(tr('Your sign-in needs an update. Sign in again to use Voice.'), 'Seu login precisa ser atualizado. Entre novamente para usar a Voz.');
  assert.equal(tr('Your sign-in needs an update. '), 'Seu login precisa ser atualizado. ');
  assert.equal(tr('Sign in again'), 'Entrar novamente');
  assert.equal(tr(' to use Voice.'), ' para usar a Voz.');
  assert.equal(tr('Microphone blocked. Allow in System Settings.'), 'Microfone bloqueado. Permita nas Configurações do sistema.');
  assert.equal(tr('Microphone blocked. Allow in Privacy Settings.'), 'Microfone bloqueado. Permita nas Configurações de privacidade.');
  assert.equal(tr('Microphone blocked in browser site settings.'), 'Microfone bloqueado nas configurações de site do navegador.');
  assert.equal(tr('Nothing said yet'), 'Nada dito ainda');
  assert.equal(tr('You said'), 'Você disse');

  // Perguntas laterais, coordenadores, navegador e configurações novas
  assert.equal(tr('Side Questions'), 'Perguntas laterais');
  assert.equal(tr('New Coordinator'), 'Novo coordenador');
  assert.equal(tr('Announcements and tips'), 'Anúncios e dicas');
  assert.equal(tr('Browser downloads'), 'Downloads do navegador');
  assert.equal(tr('Remote Control Instances'), 'Instâncias do Controle Remoto');
  assert.equal(tr('Accounts tab'), 'Aba de Contas');
});

test('Varredura Profunda de Configurações, Layout, Navegador e Controles (v1.8.7)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Capturas de tela do usuário: Configurações > Voz e Layout da interface
  assert.equal(tr('Not set'), 'Não definido');
  assert.equal(tr('Change'), 'Alterar');
  assert.equal(tr('Knowledge Work'), 'Trabalho de conhecimento');
  assert.equal(tr('Simplified interface for research, writing, and everyday tasks.'), 'Interface simplificada para pesquisa, escrita e tarefas do dia a dia.');
  assert.equal(tr('Software Engineering'), 'Engenharia de software');
  assert.equal(tr('Full interface for coding, developer tools, and managing agents.'), 'Interface completa para programação, ferramentas de desenvolvimento e gerenciamento de agentes.');

  // Novos termos profundos de interface e padrões dinâmicos
  assert.equal(tr('Using system default microphone'), 'Usando o microfone padrão do sistema');
  assert.equal(tr('Built-in Browser'), 'Navegador integrado');
  assert.equal(tr('Collapse queued messages'), 'Recolher mensagens na fila');
  assert.equal(tr('Show 5 earlier steps'), 'Mostrar 5 etapas anteriores');
  assert.equal(tr('Show 1 earlier step'), 'Mostrar 1 etapa anterior');
  assert.equal(tr('See all (12)'), 'Ver tudo (12)');
  assert.equal(tr('Show more (4)'), 'Ver mais (4)');
  assert.equal(tr('Start Best-of-3'), 'Iniciar Melhor de 3');
  assert.equal(tr('45% left'), '45% restante');
  assert.equal(tr('Signed in as enzo@example.com'), 'Conectado como enzo@example.com');
  assert.equal(tr('Yes, and always allow in this conversation'), 'Sim, e sempre permitir nesta conversa');
});

test('Pensamento interno do agente permanece original enquanto comandos de ação são traduzidos (v1.8.8)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  // Cabeçalhos e comandos de ação continuam traduzidos normalmente
  assert.equal(tr('Thinking'), 'Pensando');
  assert.equal(tr('Thought for 5s'), 'Pensou por 5s');
  assert.equal(tr('Ran command'), 'Comando executado');
  assert.equal(tr('Running command'), 'Executando comando');
  assert.equal(tr('Worked for 12s'), 'Trabalhou por 12s');

  // scanAndTranslateAllThoughts não deve mais traduzir nós internos de pensamento
  let touchedThought = false;
  sandbox.document.querySelectorAll = (sel) => {
    if (sel && sel.includes('thinking-content')) {
      touchedThought = true;
    }
    return [];
  };
  sandbox.window.__CAMBRITH_PROCESS_THOUGHTS__();
  assert.equal(touchedThought, false);
});

test('Seletor de Modelos: Tooltips, níveis e cabeçalhos preservando nomes originais dos modelos (v1.8.9)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;

  assert.equal(
    tr('Argon that may offload routine steps to Hydrogen. Same Argon-level quality, fewer tokens used.'),
    'Argon que pode delegar etapas rotineiras para o Hydrogen. Mesma qualidade de nível Argon, com menos tokens usados.'
  );
  assert.equal(
    tr('Claude Opus that may offload routine steps to Claude Sonnet. Same Opus-level quality, fewer tokens used.'),
    'Claude Opus que pode delegar etapas rotineiras para o Claude Sonnet. Mesma qualidade de nível Opus, com menos tokens usados.'
  );
  assert.equal(tr('Best of N Models'), 'Modelos Melhor de N');
  assert.equal(tr('No models available'), 'Nenhum modelo disponível');
  assert.equal(tr('Loading models...'), 'Carregando modelos...');
  assert.equal(tr('Add Model'), 'Adicionar modelo');
  assert.equal(tr('Custom models are only supported on Linux machines.'), 'Modelos personalizados são suportados apenas em máquinas Linux.');
  assert.equal(tr('No quota information available.'), 'Nenhuma informação de cota disponível.');
  assert.equal(tr('Select model, current: Orchestrator (Argon)'), 'Selecionar modelo, atual: Orchestrator (Argon)');
  assert.equal(tr('Max'), 'Máx');
});

test('v1.9.0 — Automações, Personalizações, Hooks, MCP, Contas e Configurações', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  assert.equal(tr('+ Add Hook'), '+ Adicionar Hook');
  assert.equal(tr('+ Add Organization policy'), '+ Adicionar política da organização');
  assert.equal(tr('Match Condition (CEL)'), 'Condição de Correspondência (CEL)');
  assert.equal(tr('Automation credentials expired'), 'Credenciais de automação expiradas');
  assert.equal(tr('Create Coordinator'), 'Criar Coordenador');
  assert.equal(tr('Are you sure you want to delete this handler?'), 'Tem certeza de que deseja excluir este manipulador?');
  assert.equal(tr('Are you sure you want to delete this hook card?'), 'Tem certeza de que deseja excluir este cartão de hook?');
  assert.equal(tr('Are you sure you want to delete the hook "my-hook"?'), 'Tem certeza de que deseja excluir o hook "my-hook"?');
  assert.equal(tr('No handlers configured for PreToolUse.'), 'Nenhum manipulador configurado para PreToolUse.');
  assert.equal(tr('Add New Handler to SessionStart'), 'Adicionar Novo Manipulador a SessionStart');
  assert.equal(tr('Handler #2'), 'Manipulador #2');
  assert.equal(tr('Failed to load MCP servers'), 'Falha ao carregar servidores MCP');
  assert.equal(tr('Connect GitHub with the GitHub plugin'), 'Conecte o GitHub com o plugin do GitHub');
  assert.equal(tr('Workspace Settings'), 'Configurações do Espaço de Trabalho');
  assert.equal(tr('Search shortcuts...'), 'Pesquisar atalhos...');
  assert.equal(tr('Failed to delete recordings: permission denied'), 'Falha ao excluir gravações: permission denied');
  assert.equal(tr('Error fetching rules: timeout'), 'Erro ao buscar rules: timeout');
});

test('v1.9.1 — Personalizações instantâneas, prateleiras do Marketplace, monday.com e Ver mais sem + duplicado', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  assert.equal(tr('Cloud Hosting & Deployment'), 'Hospedagem em Nuvem e Implantação');
  assert.equal(tr('Productivity & Project Management'), 'Produtividade e Gestão de Projetos');
  assert.equal(tr('Design, Creative & Media'), 'Design, Criatividade e Mídia');
  assert.equal(tr('Developer Tools'), 'Ferramentas de Desenvolvimento');
  assert.equal(tr('Business'), 'Negócios');
  assert.equal(tr('More Plugins'), 'Mais plugins');
  assert.equal(tr('Build with Google'), 'Desenvolva com o Google');
  assert.equal(tr('monday.com'), 'monday.com');
  assert.equal(tr('See 1 more'), 'Ver mais 1');
  assert.equal(tr('+ See 1 more'), '+ Ver mais 1');
  assert.equal(
    tr('Plan and track work in monday.com from Antigravity: create, update and assign items, write docs, and build forms that turn requests into items.'),
    'Planeje e acompanhe o trabalho no monday.com pelo Antigravity: crie, atualize e atribua itens, escreva documentos e crie formulários que transformam solicitações em itens.'
  );
});

test('v1.9.2 — Aparência (Font, Verbose, Bottom Panel) e Navegador (Change..., URLs do subagente)', () => {
  const sandbox = setupSandbox();
  const tr = sandbox.window.__CAMBRITH_TRANSLATE_STR__;
  assert.equal(tr('Font'), 'Fonte');
  assert.equal(tr('Verbose'), 'Detalhado');
  assert.equal(tr('Change...'), 'Alterar...');
  assert.equal(tr('Bottom Panel'), 'Painel inferior');
  assert.equal(
    tr('Configure allowed and denied URLs for the browser subagent. It runs in the built-in browser, so no separate browser install is needed.'),
    'Configure as URLs permitidas e negadas para o subagente do navegador. Ele roda no navegador integrado, então não é necessário instalar um navegador separado.'
  );
});




