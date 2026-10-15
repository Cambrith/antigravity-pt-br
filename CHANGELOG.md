# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.4.0] - 2026-10-15

### Adicionado
- **Tradução Automática de Blocos de Pensamento (Thinking Auto-Translator)**:
  - Implementação de módulo de tradução em tempo real para os fluxos e blocos de pensamento interno da IA (`Thinking / Thought for Xs`).
  - Permite que o modelo de IA continue raciocinando nativamente em inglês (mantendo máxima profundidade lógica e velocidade) enquanto o texto exibido ao usuário dentro do colapsável "Pensou por Xs" é automaticamente traduzido e renderizado em Português do Brasil (pt-BR).
  - Algoritmo de detecção inteligente de idioma baseado em indicadores lexicais comparativos para distinguir pensamento em inglês de raciocínio já em português, ignorando trechos de código (`pre`, `code`), tags HTML e seletores CSS.
  - Sistema de cache assíncrono em memória (`Map`) para traduções instantâneas sem bloqueio de renderização do Electron ou impacto no desempenho da interface.
  - Acionamento reativo multicanal: por clique em botões colapsáveis (`[data-testid="thinking-collapsible-trigger"]` / `Pensou por...`), por mutação de nós adicionados em tempo real via `MutationObserver` (suporte a streaming contínuo) e no boot da aplicação.
  - Suíte de testes unitários expandida para 24 testes automatizados com validação de detecção de idioma e rejeição de CSS/código.

---

## [1.3.0] - 2026-10-14

### Adicionado
- **Tradução Completa de Servidores MCP Novos e Interface de Controle**:
  - Localização integral das ações e controles de servidores MCP (`Manage MCP Servers` $\rightarrow$ `Gerenciar servidores MCP`, `Available MCP Servers` $\rightarrow$ `Servidores MCP disponíveis`, `Configured MCP Servers` $\rightarrow$ `Servidores MCP configurados`, `Restart Server` $\rightarrow$ `Reiniciar servidor`, `Disable all tools` $\rightarrow$ `Desativar todas as ferramentas`, `Enable all tools` $\rightarrow$ `Ativar todas as ferramentas`, `Disable tool` $\rightarrow$ `Desativar ferramenta`, `Enable tool` $\rightarrow$ `Ativar ferramenta`).
  - Status operacionais dos servidores (`Server running` $\rightarrow$ `Servidor em execução`, `Server stopped` $\rightarrow$ `Servidor parado`, `Server failed` $\rightarrow$ `Servidor falhou`, `Server error` $\rightarrow$ `Erro no servidor`).
  - Tradução dinâmica com concordância numérica e suporte a prefixos comparativos para contadores de ferramentas MCP ativadas e desativadas (`> 30 tools enabled` $\rightarrow$ `> 30 ferramentas ativadas`, `1 tool enabled` $\rightarrow$ `1 ferramenta ativada`, `tools disabled` $\rightarrow$ `ferramentas desativadas`).
  - Tratamento e tradução idiomática de erros de inicialização de Proxy MCP e credenciais ADC (`[MCP Proxy Error] No ADC credentials found. Please run gcloud auth application-default login, or retry your request...` $\rightarrow$ `[Erro no Proxy MCP] Nenhuma credencial ADC encontrada. Execute "gcloud auth application-default login" ou tente novamente.`), com preservação estrita do comando shell original.
- **Catálogo Completo de 128 Skills do Ecossistema Traduzidas**:
  - Mapeamento e tradução oficial de todas as 128 habilidades instaladas em `src/maps/skills.json` cobrindo todos os domínios do ecossistema:
    - **Dart e Flutter**: Criação de CLIs, testes unitários, testes de widgets, mocks, arquitetura limpa, layout responsivo, deep linking, internacionalização e FFI.
    - **Google Cloud & Data Agent Kit**: Pipelines de BigQuery SQL, BigFrames, property graphs GQL, Cloud Composer / Managed Airflow (DAGs e migrações), Apache Spark no Dataproc e Dataform.
    - **Firebase**: Autenticação, regras de segurança do Firestore, Data Connect com PostgreSQL, App Hosting, Cloud Functions v2, Crashlytics e Remote Config.
    - **Inteligência Artificial & Gemini API**: Gemini 3.8 Live API, Gemini Omni 1.1 Flash (edição de vídeo), chamadas de função assíncronas, geração de áudio e visão computacional.
    - **Pesquisa Científica & Bioinformática**: AlphaFold, AlphaGenome, ChEMBL, UniProt, PDB, dbSNP, ClinVar, NCBI, PubMed, ArXiv e bioRxiv.
    - **Ferramentas de Desenvolvimento**: Chrome DevTools via MCP, depuração de acessibilidade (a11y), otimização de LCP e diagnóstico de vazamento de memória.
    - **Google Maps Platform**: Visualização de mapas, rotas ecológicas, geocodificação, dados ambientais e Places API.
- **Tradução Completa de Menus de Imagem e Mídias (Nativo e Web)**:
  - Localização nativa no preload do Electron (`patch-asar.js` v4) e na interface para menus de contexto acionados pelo botão direito em imagens (`Copy Image` $\rightarrow$ `Copiar imagem`, `Save Image` $\rightarrow$ `Salvar imagem`, `Save Image As...` $\rightarrow$ `Salvar imagem como...`, `Copy Image Address` $\rightarrow$ `Copiar endereço da imagem`, `Open Image in New Tab` $\rightarrow$ `Abrir imagem em nova guia`, `Download Image` $\rightarrow$ `Baixar imagem`).
  - Implementação de fallback inteligente em `showContextMenu` no `preload.js`, conectando diretamente ao motor dinâmico de tradução em tempo real (`window.__CAMBRITH_TRANSLATE_STR__`).
- **Cabeçalhos de Ação e Exploração com Múltiplas Entidades**:
  - Suporte completo a contadores de arquivos, pastas, ações e comandos nos cabeçalhos colapsáveis em tempo real (`Explorou 3 arquivos 1 pasta, 3 ações, executou 1 comando`, `Explorando 2 arquivos, 2 pastas, 4 ações, executando 2 comandos`).
- **Painel Lateral: Filtros Git, Skills Usadas e Paginação**:
  - Tradução das descrições dos seletores de alterações de branch e índice (`Staged index changes and working tree changes` $\rightarrow$ `Alterações preparadas no índice e na árvore de trabalho`, `All changes since <branch>` $\rightarrow$ `Todas as alterações desde <branch>`).
  - Localização de contadores de habilidades ativas (`Skills Used 1` $\rightarrow$ `Habilidades usadas 1`, `No skills used` $\rightarrow$ `Nenhuma habilidade usada`).
  - Tradução dinâmica de paginação em listas e envios de mídia (`See all (16)` $\rightarrow$ `Ver tudo (16)`, `See more (5)` $\rightarrow$ `Ver mais (5)`).
- **Correção e Robustez no Cabeçalho da Página de Plugins**:
  - Tratamento aprimorado para o parágrafo descritivo de plugins (`Plugins are packaged collections of skills and MCPs...`), cobrindo fragmentação de nós e links do React para configurações.
- **Tradução de Tooltips de Documentação e Atalhos Interativos (Click to Open Docs)**:
  - Localização completa de tooltips exibidos ao passar o mouse sobre ícones de ajuda e documentação (`Click to Open Docs` $\rightarrow$ `Clique para abrir a documentação`, `Click to open documentation`, `Open Docs` $\rightarrow$ `Abrir documentação`, `View Documentation` $\rightarrow$ `Ver documentação`).
  - Suporte estático e dinâmico a ações de clique e atalhos em Title Case e sentence case (`Click to Learn More` $\rightarrow$ `Clique para saber mais`, `Click to Copy` $\rightarrow$ `Clique para copiar`, `Click to Expand` $\rightarrow$ `Clique para expandir`, `Click to Collapse` $\rightarrow$ `Clique para recolher`, `Click to Refresh` $\rightarrow$ `Clique para atualizar`, `Click to Retry` $\rightarrow$ `Clique para tentar novamente`).
- **Suíte de Testes Expandida**:
  - Suíte de testes unitários automatizados ampliada para 23 testes abrangentes com 100% de aprovação.

### Modificado
- Total de entradas no dicionário estático expandido para mais de 2.620 termos e descrições técnicas.
- Integração modular do mapa de skills (`src/maps/skills.json`) no pipeline de geração (`generate_i18n.py`).

---

## [1.2.0] - 2026-10-14

### Adicionado
- **Tradução Completa de Seletores de Ambiente e Worktree**:
  - Localização dos seletores de ambiente ao iniciar conversa (`Environment: Local` $\rightarrow$ `Ambiente: Local`, `Select Environment` $\rightarrow$ `Selecionar ambiente`, `Select Worktree` $\rightarrow$ `Selecionar worktree`).
  - Tooltips com atalho de teclado (`Select Environment (Ctrl+.)` e variações).
  - Itens e descrições explicativas dos ambientes (`Run in your current workspace`, `Run in a new worktree`, `Run in a new git worktree`, `Run in a new jj workspace or Fig share`, etc.).
  - Avisos contextuais de suporte a repositórios e projetos (`Workspaces are not available for this project`, `Worktrees are available for Git repositories`, `Worktrees are a git feature. This folder is shared as is.`).
  - Buscas e listas de worktrees anteriores (`Search past worktrees...`, `Search past workspaces...`, `Previous Worktrees`, `No environments found`, `No previous worktrees`).
  - Notificações de criação e bifurcação de conversas (`Creating worktree for the forked conversation...`, `Creating CitC workspace for the forked conversation...`, `Forked conversation`).
- **Correção Idiomática de Escopo de Configurações (Modificado fora do projeto)**:
  - Correção da tradução literal truncada `Modificado em Fora de projeto` para a formulação natural e gramaticalmente correta em pt-BR: `Modificado fora do projeto`.
  - Atualização do nome do escopo `Outside of Project` de `Fora de projeto` para `Fora do projeto` (com artigo definido).
  - Tradução fluida e sem redundâncias de pontuação em descrições compostas de permissões e políticas de revisão (`Controla as ações que o agente pode realizar. Modificado fora do projeto`, `Define se o agente solicita que você revise seus documentos. Modificado fora do projeto`).
- **Tradução da Página de Plugins e Catálogo Oficial (Build with Google / Antigravity)**:
  - Localização do texto descritivo do cabeçalho da loja de plugins com normalização de quebras de linha (`Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products...` $\rightarrow$ `Os plugins são coleções empacotadas de habilidades e MCPs para ajudar o agente no Antigravity a trabalhar com produtos de desenvolvimento do Google...`).
  - Tradução de cabeçalhos e títulos de catálogo (`Plugins criados com o Google`, `Plugins criados com o Antigravity`).
  - Descrições completas dos plugins oficiais do ecossistema: Android CLI, Modern Web Guidance, Google Antigravity SDK, Science, Firebase, Chrome DevTools, Gemini API, Google Developer Knowledge, Data Agent Kit, Dart e Flutter e Google Maps Platform.
  - Tradução de botões e status de ciclo de vida dos plugins (`Download` $\rightarrow$ `Baixar`, `Downloading...` $\rightarrow$ `Baixando...`, `Downloaded` $\rightarrow$ `Baixado`, `Install Plugin` $\rightarrow$ `Instalar plugin`, `Uninstall Plugin` $\rightarrow$ `Desinstalar plugin`).
- **Tradução de Erros e Notificações de Branch do Projeto**:
  - Alertas toast de falha ao salvar branch (`Failed to save project branch: No git folder in this project matches the folder` $\rightarrow$ `Falha ao salvar branch do projeto: Nenhuma pasta git neste projeto corresponde à pasta`).
  - Tratamento dinâmico com prefixo e tradução do motivo de erro para seleção de branch (`Failed to save project branch: <detalhes>`).
  - Validação e avisos de formato de branch (`Branch name cannot start with a dash`, `Invalid branch or ref format`, etc.).
- **Regras e Tradução de Pensamentos e Ações do Agente (Thinking / Tool Actions)**:
  - Implementadas diretrizes oficiais [`AGENTS.md`](file:///home/cambrith/.gemini/antigravity/scratch/antigravity-pt-br/AGENTS.md) e [`GEMINI.md`](file:///home/cambrith/.gemini/antigravity/scratch/antigravity-pt-br/GEMINI.md) globais em `~/.gemini/config/`, assegurando que todo o fluxo de pensamento interno (`thinking` / `<thought>`), decisões e mensagens durante a execução de tarefas sejam gerados estritamente em Português do Brasil (pt-BR) desde o primeiro token.
  - Integração automática da configuração de diretrizes do agente nos instaladores de Linux, macOS e Windows.
  - Tradução dinâmica em tempo real no frontend de sentenças analíticas e de fluxo do modelo (análise de arquivos, seções, servidores MCP e scripts).
  - Tradução de parâmetros de ações de ferramentas (`toolAction` e `toolSummary`) para português brasileiro (ex.: `Analisando diretório`, `Verificando status do git`, `Executando testes`), com preservação estrita de comandos e códigos técnicos originais (`CommandLine`, código-fonte, caminhos).
  - Localização de rótulos e durações de pensamento (`Thought Process`, `Thinking Process`, `Thinking...`, `Pensou por 15 segundos`, etc.).
- **Tradução de Processos, Tarefas e Comandos em Tempo Real (Tasks/Running/Ran)**:
  - Tradução de contadores de tarefas em execução no status bar e barra de chat (`1 task running` $\rightarrow$ `1 tarefa em execução`, `2 tasks running` $\rightarrow$ `2 tarefas em execução`, `No tasks running` $\rightarrow$ `Nenhuma tarefa em execução`, `Task running...` $\rightarrow$ `Tarefa em execução...`).
  - Tradução dinâmica de status em cabeçalhos de colapsáveis (`<Ação> finished` $\rightarrow$ `<Ação> concluído`, `<Ação> was canceled` $\rightarrow$ `<Ação> foi cancelado`, `<Ação> failed` $\rightarrow$ `<Ação> falhou`).
  - Tradução completa de logs de tarefas e execução de comandos (`Task id "..." finished with result:` $\rightarrow$ `Tarefa id "..." concluída com o resultado:`, `The command exited with code 1.` $\rightarrow$ `O comando encerrou com o código 1.`, `Stdout:` $\rightarrow$ `Saída padrão:`, `Stderr:` $\rightarrow$ `Erro padrão:`).
  - Tradução do status de comandos ao iniciar (`Running <comando>` $\rightarrow$ `Executando <comando>`).
  - Tradução de status ao concluir comandos (`Ran <comando>` $\rightarrow$ `Executou <comando>`).
  - Contadores com plural correto de comandos e arquivos (`Running 1 command` $\rightarrow$ `Executando 1 comando`, `Running 2 commands` $\rightarrow$ `Executando 2 comandos`, `Exploring 2 files, running 1 command` $\rightarrow$ `Explorando 2 arquivos, executando 1 comando`).
  - Estados dinâmicos de arquivos em lote (`Editing files` $\rightarrow$ `Editando arquivos`, `Edited files` $\rightarrow$ `Editou arquivos`, `Exploring files` $\rightarrow$ `Explorando arquivos`, `Explored files` $\rightarrow$ `Explorou arquivos`).
- **Tradução Dinâmica de Níveis de Esforço de Raciocínio**:
  - Mapeamento dinâmico de modelos com esforço: Baixo, Médio, Alto, Máximo e Raciocínio (ex.: `Gemini 3.8 Flash Médio`, `Claude Sonnet 4.6 (Raciocínio)`).
- **Tradução de Detalhamento de Tokens e Orçamento**:
  - Cobertura completa para `Show breakdown` / `Hide breakdown` com suporte ao plural dinâmico (`Mostrar 2 detalhamentos`, `Ocultar detalhamento`).
  - Avisos de limites de tokens de regras e exclusão de ferramentas MCP.
- **Tradução de Barra de Mensagens e Placeholders**:
  - Placeholders dinâmicos de prompt e ações (`Ask anything, @ to mention, / for actions`, `Type a message...`, `What would you like to build?`, etc.).
  - Preservação estrita do conteúdo digitado pelo usuário (`[contenteditable="true"]`).

### Modificado
- Total de entradas no dicionário estático expandido para mais de 2.235 termos.
- Adicionados testes unitários automatizados para validação de tradução de ambientes e início de conversa.

---

## [1.1.0] - 2026-10-14

### Adicionado
- **Suíte de Testes Automatizados**: Implementados 10 testes unitários cobrindo regressão de falsos positivos, tradução de cotas, modelos e resolução de caminhos por sistema operacional.
- **Integração Contínua (CI)**: Workflow do GitHub Actions testando matriz de Linux, Windows e macOS em Node.js 18, 20 e 22.
- **Tradução Dinâmica de Cotas Avançada**: Cobertura para renovação semanal e de 5 horas com opções de upgrade de plano e créditos de IA provisórios.
- **Tradução de Notificações de Cota e Créditos de IA**: Alertas com cálculo de créditos necessários, modelo em uso e renovação formatada.
- **Documentação de Engenharia Completa**: Adicionados `ARCHITECTURE.md`, `COMPATIBILITY.md`, `TROUBLESHOOTING.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` e `SECURITY.md`.
- **Scripts de Desinstalação**: Utilitários para restaurar backups originais (`uninstall.sh` e `uninstall.ps1`).

### Corrigido
- **Falso Positivo da Palavra "No"**: Removida a substituição indiscriminada da palavra "No" em textos e conversas, tratando-a como termo de interface apenas se estiver em botões de ação explícitos.
- **Tradução de Tokens de Acesso Pessoal (MCP)**: Diferenciação automática entre tokens de API genéricos e `Personal Access Token` para servidores MCP.

---

## [1.0.0] - 2026-10-14

### Adicionado
- Versão inicial do sistema de localização para Google Antigravity.
- Mais de 2.185 entradas de tradução exatas na interface, menus, diálogos e configurações.
- Tradução de todos os 99 servidores MCP e seus parâmetros de configuração.
- Patcher ASAR em Node.js puro sem dependências externas.
- Instaladores automatizados para Linux e ChromeOS (`install.sh`), macOS (`install-macos.sh`) e Windows (`install.ps1`).
