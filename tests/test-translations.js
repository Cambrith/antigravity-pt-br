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





