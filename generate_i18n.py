import os, json

EXACT_MAP = {
    # Appearance & Contrast
    "Strong": "Alto",
    "strong": "alto",
    "Strong Contrast": "Alto contraste",
    "High Contrast": "Alto contraste",
    "Default Light": "Claro padrão",
    "Default Dark": "Escuro padrão",
    "Light Theme": "Tema claro",
    "Dark Theme": "Tema escuro",
    "Reset to preset": "Redefinir para predefinição",
    "Preset": "Predefinição",
    "Background": "Plano de fundo",
    "Foreground": "Primeiro plano",
    "Accent": "Destaque",
    "Inherit Editor": "Herdar do editor",
    "// Greet a user by name": "// Saudar um usuário pelo nome",

    # Danger Zone and Project Deletion
    "including": "incluindo",
    "including ": "incluindo ",
    " including ": " incluindo ",
    "active conversation": "conversa ativa",
    "active conversations": "conversas ativas",
    "archived conversation": "conversa arquivada",
    "archived conversations": "conversas arquivadas",
    "Delete Project": "Excluir projeto",
    "Delete project": "Excluir projeto",
    "Delete Workspace": "Excluir espaço de trabalho",
    "Delete workspace": "Excluir espaço de trabalho",
    "Project deleted": "Projeto excluído",
    "Project deleted.": "Projeto excluído.",
    "project deleted": "projeto excluído",
    "Workspace deleted": "Espaço de trabalho excluído",
    "Workspace deleted.": "Espaço de trabalho excluído.",
    "workspace deleted": "espaço de trabalho excluído",
    "Conversation deleted": "Conversa excluída",
    "Conversation deleted.": "Conversa excluída.",
    "conversation deleted": "conversa excluída",
    "Project created": "Projeto criado",
    "Project created.": "Projeto criado.",
    "Workspace created": "Espaço de trabalho criado",
    "Workspace created.": "Espaço de trabalho criado.",
    "Project updated": "Projeto atualizado",
    "Project updated.": "Projeto atualizado.",
    "Workspace updated": "Espaço de trabalho atualizado",
    "Workspace updated.": "Espaço de trabalho atualizado.",
    "Project archived": "Projeto arquivado",
    "Project archived.": "Projeto arquivado.",
    "Workspace archived": "Espaço de trabalho arquivado",
    "Workspace archived.": "Espaço de trabalho arquivado.",
    "Project unarchived": "Projeto desarquivado",
    "Project unarchived.": "Projeto desarquivado.",
    "Workspace unarchived": "Espaço de trabalho desarquivado",
    "Workspace unarchived.": "Espaço de trabalho desarquivado.",
    "Project saved": "Projeto salvo",
    "Project saved.": "Projeto salvo.",
    "Workspace saved": "Espaço de trabalho salvo",
    "Workspace saved.": "Espaço de trabalho salvo.",
    "Project renamed": "Projeto renomeado",
    "Project renamed.": "Projeto renomeado.",
    "Workspace renamed": "Espaço de trabalho renomeado",
    "Workspace renamed.": "Espaço de trabalho renomeado.",
    "Failed to delete project": "Falha ao excluir o projeto",
    "Failed to delete project.": "Falha ao excluir o projeto.",
    "Failed to delete workspace": "Falha ao excluir o espaço de trabalho",
    "Failed to delete workspace.": "Falha ao excluir o espaço de trabalho.",

    # Breakdown & Tokens
    "Show breakdown": "Mostrar detalhamento",
    "Show breakdowns": "Mostrar detalhamentos",
    "Hide breakdown": "Ocultar detalhamento",
    "Hide breakdowns": "Ocultar detalhamentos",
    "show breakdown": "mostrar detalhamento",
    "show breakdowns": "mostrar detalhamentos",
    "hide breakdown": "ocultar detalhamento",
    "hide breakdowns": "ocultar detalhamentos",
    "Hide tools": "Ocultar ferramentas",
    "Show tools": "Mostrar ferramentas",
    "hide tools": "ocultar ferramentas",
    "show tools": "mostrar ferramentas",
    "1 tool": "1 ferramenta",
    "Demoted": "Rebaixada",
    "demoted": "rebaixada",
    "Excluded": "Excluída",
    "excluded": "excluída",
    "Best of N Models": "Melhores de N modelos",
    "No models available": "Nenhum modelo disponível",
    "Unavailable": "Indisponível",
    "unavailable": "indisponível",
    "Sonnet 5.5 is now available on paid Pro and Ultra plans. Third-party model access will no longer be available on your current plan starting on November 2, 2026.": "O Sonnet 5.5 já está disponível nos planos pagos Pro e Ultra. O acesso a modelos de terceiros não estará mais disponível em seu plano atual a partir de 2 de novembro de 2026.",
    "Opus 5.5 is now available on paid Pro and Ultra plans. Third-party model access will no longer be available on your current plan starting on November 2, 2026.": "O Opus 5.5 já está disponível nos planos pagos Pro e Ultra. O acesso a modelos de terceiros não estará mais disponível em seu plano atual a partir de 2 de novembro de 2026.",
    "GPT-OSS will be removed from Antigravity on November 2, 2026.": "O GPT-OSS será removido do Antigravity em 2 de novembro de 2026.",
    "Gemini 4 Argon is currently available to Ultra plan subscribers.": "O Gemini 4 Argon está disponível atualmente para assinantes do plano Ultra.",
    "Permanently delete": "Excluir permanentemente",
    "Permanently delete ": "Excluir permanentemente ",
    "Are you sure you want to delete the ": "Tem certeza de que deseja excluir o ",
    "Are you sure you want to delete the": "Tem certeza de que deseja excluir o",
    "This will permanently delete ": "Isso excluirá permanentemente ",
    "This will permanently delete": "Isso excluirá permanentemente",
    " within it.": " dentro dele.",
    "within it.": "dentro dele.",
    "within it": "dentro dele",
    "This ": "Este ",
    " is managed by the": " é gerenciado pela",
    " automation and can only be deleted by deleting that automation.": " automação e só pode ser excluído excluindo essa automação.",
    "A ": "Um ",
    " with this name already exists.": " com este nome já existe.",
    "Failed to resolve folder": "Falha ao resolver pasta",
    "No project selected or project management not available.": "Nenhum projeto selecionado ou gerenciamento de projetos indisponível.",
    "Manage project folders, agent settings, and permissions.": "Gerencie pastas, configurações de agente e permissões do projeto.",
    "Manage workspace folders, agent settings, and permissions.": "Gerencie pastas, configurações de agente e permissões do espaço de trabalho.",
    "Agent settings and permissions for conversations outside of projects.": "Configurações de agente e permissões para conversas fora de projetos.",
    "Agent settings and permissions for conversations outside of workspaces.": "Configurações de agente e permissões para conversas fora de espaços de trabalho.",
    "Edit project name": "Editar nome do projeto",
    "Edit workspace name": "Editar nome do espaço de trabalho",
    "Command Setup Script": "Script de configuração de comando",
    "A shell setup script run before every command the agent executes in this project. Overrides the global script.": "Um script de configuração de shell executado antes de cada comando que o agente executa neste projeto. Substitui o script global.",
    "No folders added yet.": "Nenhuma pasta adicionada ainda.",
    "Google3 Configuration": "Configuração do Google3",
    "All Workspaces": "Todos os espaços de trabalho",

    # Queued Messages & Tooltips
    "Keyboard shortcuts": "Atalhos de teclado",
    "Sends after agent finishes working. Actions available: Send Now, Edit, Delete.": "Envia após o agente terminar o trabalho. Ações disponíveis: Enviar agora, Editar, Excluir.",
    "Message queued.": "Mensagem na fila.",
    "attachment(s)": "anexo(s)",
    "review comments": "comentários de revisão",
    "empty message": "mensagem vazia",
    "Send Now": "Enviar agora",

    # Settings Info Tooltips & Cards
    "Controls the actions the agent can take.": "Controla as ações que o agente pode realizar.",
    "Learn more about": "Saiba mais sobre",
    "Learn more about ": "Saiba mais sobre ",
    "Inherits your Global Permissions when working in this project.": "Herda suas Permissões Globais ao trabalhar neste projeto.",
    "Manually customize individual settings.": "Personalize manualmente configurações individuais.",
    "Useful for typical development with an emphasis on security. It prioritizes safety over speed by requiring manual approval for all terminal commands and files outside the project directory.": "Útil para o desenvolvimento típico com ênfase na segurança. Prioriza a segurança em relação à velocidade, exigindo aprovação manual para todos os comandos de terminal e arquivos fora do diretório do projeto.",
    "Useful for tasks that require file access across your full machine. The agent has full read and write access to all local files, but all proposed terminal commands require manual review and approval before running.": "Útil para tarefas que exigem acesso a arquivos em toda a sua máquina. O agente tem acesso total de leitura e gravação a todos os arquivos locais, mas todos os comandos de terminal propostos exigem revisão e aprovação manual antes da execução.",
    "A high-risk mode that disables all safety barriers. The agent operates with full system access, auto-executes all terminal commands, and reads or writes to all local files without review prompts.": "Um modo de alto risco que desativa todas as barreiras de segurança. O agente opera com acesso total ao sistema, executa automaticamente todos os comandos de terminal e lê ou grava em todos os arquivos locais sem solicitações de revisão.",
    "Disables all safety barriers for maximal iteration velocity.": "Desativa todas as barreiras de segurança para máxima velocidade de iteração.",
    "All terminal commands require review. The agent can read or write to any file in the machine.": "Todos os comandos de terminal exigem revisão. O agente pode ler ou gravar em qualquer arquivo da máquina.",
    "Requires manual review for all terminal commands and file accesses outside of the working folders.": "Exige revisão manual para todos os comandos de terminal e acessos a arquivos fora das pastas de trabalho.",
    "Inherit Global": "Herdar global",
    "Full machine": "Máquina completa",
    "Turbo mode": "Modo turbo",

    "In autonomous mode, the agent works with autonomy-enhancing features and does not ask questions or request new permissions. To turn it off, open the modes dropdown in the toolbar below the input box and switch off \"Autonomous mode\".": "No modo autônomo, o agente trabalha com recursos que aprimoram a autonomia e não faz perguntas nem solicita novas permissões. Para desativá-lo, abra o menu suspenso de modos na barra de ferramentas abaixo da caixa de entrada e desative o \"Modo autônomo\".",
    "Artifacts like Google Docs, PDFs, Office documents (Word, Excel, PowerPoint), etc. Everything else the agent creates is under Artifacts.": "Artefatos como Google Docs, PDFs, documentos do Office (Word, Excel, PowerPoint), etc. Tudo o mais que o agente cria fica em Artefatos.",
    "Some sites block embedding (via X-Frame-Options or CSP) and will show a fallback message. Blocked-page detection is best-effort (based on a load timeout), so it may occasionally be wrong. Use \"Open in new tab\" if a page doesn't load.": "Alguns sites bloqueiam a incorporação (via X-Frame-Options ou CSP) e exibirão uma mensagem de fallback. A detecção de página bloqueada é feita por melhor esforço (com base no tempo limite de carregamento), portanto, pode ocasionalmente falhar. Use \"Abrir em nova aba\" se a página não carregar.",
    "This sidecar failed to start.": "Este sidecar falhou ao iniciar.",
    "Saves to your global ~/.gemini/antigravity/agents/ directory. This script will be available across all your workspaces.": "Salva no diretório global ~/.gemini/antigravity/agents/. Este script estará disponível em todos os seus espaços de trabalho.",
    "Saves to the .agent/agents/ directory in your current workspace. This script can be version controlled and shared with your team.": "Salva no diretório .agent/agents/ no seu espaço de trabalho atual. Este script pode ter controle de versão e ser compartilhado com sua equipe.",
    "Select a workspace to save agent scripts to your workspace.": "Selecione um espaço de trabalho para salvar scripts de agente no seu espaço de trabalho.",
    "Agent can scroll on browser pages to access more content.": "O agente pode rolar as páginas do navegador para acessar mais conteúdo.",
    "Agent can retrieve console logs from the browser and return it for further processing.": "O agente pode recuperar logs do console do navegador e retorná-los para processamento posterior.",
    "This plugin is disabled, so nothing shown below is active. Enable it above to use it.": "Este plugin está desativado, então nada mostrado abaixo está ativo. Ative-o acima para usá-lo.",
    "Using this option will attempt to revert all changes in this turn and redo the turn using N parallel trajectories. This will discard any changes made in this turn in order to redo it.": "O uso desta opção tentará reverter todas as alterações neste turno e refazê-lo usando trajetórias paralelas. Isso descartará quaisquer alterações feitas neste turno para refazê-lo.",
    "This conversation grew too large, so the history before this point may be missing or incomplete.": "Esta conversa ficou muito grande, portanto o histórico anterior a este ponto pode estar ausente ou incompleto.",
    "Work in Google3. Create conversations in new and existing workspaces.": "Trabalhe no Google3. Crie conversas em espaços de trabalho novos e existentes.",
    "Workflows are being deprecated in favor of skills. You can use the agent to migrate your workflows.": "Os workflows estão sendo descontinuados em favor das habilidades. Você pode usar o agente para migrar seus workflows.",
    "Click to learn more about sources": "Clique para saber mais sobre as fontes",
    "About embedding": "Sobre incorporação",
    "Embedding Limitations": "Limitações de incorporação",
    "Many sites (e.g. Google, GitHub) block embedding in iframes via X-Frame-Options or CSP. If a page fails to load, open it in an external browser.": "Muitos sites (ex: Google, GitHub) bloqueiam a incorporação em iframes via X-Frame-Options ou CSP. Se uma página falhar ao carregar, abra-a em um navegador externo.",

    # Warnings and confirmations
    "\u26a0\ufe0f Warning: \"Always Proceed\" is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "\u26a0\ufe0f Aviso: \"Sempre prosseguir\" está ativado sem proteção de sandbox. Isso é muito perigoso e não recomendamos fazer isso.",
    "Confirm Undo": "Confirmar desfazer",
    "Only the conversation will be rewound; your files will be left as-is.": "Apenas a conversa será retrocedida; seus arquivos serão mantidos como estão.",
    "Undo restores your entire workspace to its state at this point.": "Desfazer restaura todo o seu espaço de trabalho para o estado neste ponto.",
    "The files below were changed by the agent and will be reverted, but other files may also be affected if your workspace changed for other reasons (e.g. a sync) in the meantime.": "Os arquivos abaixo foram alterados pelo agente e serão revertidos, mas outros arquivos também podem ser afetados se o seu espaço de trabalho mudou por outros motivos (ex: sincronização) nesse meio tempo.",
    "The agent made no code changes, but other files may still be affected if your workspace changed for other reasons (e.g. a sync) in the meantime.": "O agente não fez alterações de código, mas outros arquivos ainda podem ser afetados se o seu espaço de trabalho mudou por outros motivos (ex: sincronização) nesse meio tempo.",
    "Confirming this undo action will make the following changes:": "Confirmar esta ação de desfazer fará as seguintes alterações:",
    "This undo action will not make any code changes.": "Esta ação de desfazer não fará nenhuma alteração de código.",

    # Allowlist & Settings Details
    "Only works when Auto-execution policy is set to \"Request Review\" on a go/limited-internet host.": "Funciona apenas quando a política de execução automática está definida como \"Solicitar revisão\" em um host go/limited-internet.",
    " For Unix shells, an allow list entry matches a command if its space-separated tokens form a prefix of the command\'s tokens. For PowerShell, the entry tokens may match any contiguous subsequence of the command tokens.": " Para shells Unix, uma entrada na lista de permissões corresponde a um comando se seus tokens separados por espaços formarem um prefixo dos tokens do comando. Para o PowerShell, os tokens de entrada podem corresponder a qualquer subsequência contígua dos tokens do comando.",
    " The deny list follows the same matching rules as the allow list and takes precedence over the allow list.": " A lista de bloqueio segue as mesmas regras de correspondência da lista de permissões e tem precedência sobre ela.",
    "The agent auto-executes commands matched by an allow list entry. For Unix shells, an allow list entry matches a command if its space-separated tokens form a prefix of the command\'s tokens. For PowerShell, the entry tokens may match any contiguous subsequence of the command tokens.": "O agente executa automaticamente comandos correspondentes a uma entrada na lista de permissões. Para shells Unix, uma entrada corresponde a um comando se seus tokens separados por espaços formarem um prefixo dos tokens do comando. Para o PowerShell, os tokens de entrada podem corresponder a qualquer subsequência contígua dos tokens do comando.",
    "Google-wide Allowlist: If you are eligible, commands in the this list run without your approval, in addition to the below options. This policy applies to any host, regardless of internet connectivity. Check on eligibility on go/can-i-autorun-agents.\n\nNote: please reload for these changes to take effect.": "Lista de permissões global do Google: Se você for elegível, os comandos nesta lista serão executados sem sua aprovação, além das opções abaixo. Esta política se aplica a qualquer host, independentemente da conectividade com a internet. Verifique a elegibilidade em go/can-i-autorun-agents.\n\nNota: recarregue para que essas alterações entrem em vigor.",
    "Google-wide Allowlist: If you are eligible, commands in the this list run without your approval, in addition to the below options. This policy applies to any host, regardless of internet connectivity. Check on eligibility on go/can-i-autorun-agents.": "Lista de permissões global do Google: Se você for elegível, os comandos nesta lista serão executados sem sua aprovação, além das opções abaixo. Esta política se aplica a qualquer host, independentemente da conectividade com a internet. Verifique a elegibilidade em go/can-i-autorun-agents.",
    "Are you sure you want to delete this conversation? This action cannot be undone.": "Tem certeza de que deseja excluir esta conversa? Esta ação não pode ser desfeita.",
    "This conversation is not on disk. Delete it to remove it from your sidebar.": "Esta conversa não está no disco. Exclua-a para removê-la da sua barra lateral.",
    "Failed to delete conversation": "Falha ao excluir conversa",
    "Delete Permanently": "Excluir permanentemente",
    "Delete Hook": "Excluir gancho",
    "Delete Handler": "Excluir manipulador",
    "Delete MCP Server": "Excluir servidor MCP",
    "Delete Skill": "Excluir habilidade",
    "Failed to delete plugin. Please try again.": "Falha ao excluir plugin. Tente novamente.",
    "Failed to delete skill.": "Falha ao excluir habilidade.",
    "Failed to delete skill. Please try again.": "Falha ao excluir habilidade. Tente novamente.",
    "Delete Terminal": "Excluir terminal",
    "Delete side question": "Excluir pergunta paralela",
    "Folders these agents can access.": "Pastas que estes agentes podem acessar.",
    "Commands and files these agents can use.": "Comandos e arquivos que estes agentes podem usar.",
    "Copy Config File Path": "Copiar caminho do arquivo de configuração",
    "Built In": "Integrado",

    "Monday": "Segunda-feira",
    "Tuesday": "Terça-feira",
    "Wednesday": "Quarta-feira",
    "Thursday": "Quinta-feira",
    "Friday": "Sexta-feira",
    "Saturday": "Sábado",
    "Sunday": "Domingo",
    "Mon": "Seg",
    "Tue": "Ter",
    "Wed": "Qua",
    "Thu": "Qui",
    "Fri": "Sex",
    "Sat": "Sáb",
    "Sun": "Dom",
    "Today": "Hoje",
    "Yesterday": "Ontem",
    "Tomorrow": "Amanhã",

    "Search for files in the project...": "Pesquisar arquivos no projeto...",
    "Search for files in the project": "Pesquisar arquivos no projeto",
    "Search files...": "Pesquisar arquivos...",
    "Search files": "Pesquisar arquivos",
    "Greeting and Hello": "Saudações e Boas-Vindas",
    "AI Capabilities Overview": "Visão Geral dos Recursos de IA",
    "Cambrith OS Hyprland Migration": "Migração para o Cambrith OS Hyprland",

    "Open Project Picker": "Abrir seletor de projetos",
    "Open project picker": "Abrir seletor de projetos",
    "Project Picker": "Seletor de projetos",
    "Project picker": "Seletor de projetos",
    "Command:": "Comando:",
    "command:": "comando:",

    "Last Prompt": "Último prompt",
    "Last prompt": "Último prompt",
    "None": "Nenhum",
    "Select Folder(s)": "Selecionar pasta(s)",
    "Select folder(s)": "Selecionar pasta(s)",
    "Select Folder": "Selecionar pasta",
    "Select folder": "Selecionar pasta",
    "Select Folders": "Selecionar pastas",
    "Select folders": "Selecionar pastas",
    "Select Folder...": "Selecionar pasta...",
    "Select folder...": "Selecionar pasta...",
    "Choose Folder": "Escolher pasta",
    "Choose folder": "Escolher pasta",
    "Choose Folder(s)": "Escolher pasta(s)",

    "New Project": "Novo projeto",
    "Select a folder.": "Selecione uma pasta.",
    "Quick Start": "Início rápido",
    "Instantly create a new project and folder to start building.": "Crie instantaneamente um novo projeto e pasta para começar a desenvolver.",
    "Create Project": "Criar projeto",
    "Create a new project using normal folders and/or citc workspaces.": "Crie um novo projeto usando pastas normais e/ou espaços de trabalho CitC.",
    "New Workspace": "Novo espaço de trabalho",
    "CitC Workspace": "Espaço de trabalho CitC",
    "Work in a CitC workspace.": "Trabalhe em um espaço de trabalho CitC.",
    "Cog Workspace": "Espaço de trabalho Cog",
    "Work in a Cog workspace.": "Trabalhe em um espaço de trabalho Cog.",
    "ABFS Workspace (Alpha)": "Espaço de trabalho ABFS (Alfa)",
    "Work in an ABFS workspace.": "Trabalhe em um espaço de trabalho ABFS.",
    "ABFS workspace name": "Nome do espaço de trabalho ABFS",
    "ABFS branch name": "Nome da branch ABFS",
    "ABFS mount directory": "Diretório de montagem ABFS",
    "Citc workspace name": "Nome do espaço de trabalho CitC",
    "CitC Workspace Type": "Tipo de espaço de trabalho CitC",
    "CitC Clone": "Clone CitC",
    "Delete ABFS Workspace": "Excluir espaço de trabalho ABFS",
    "Enter workspace name (e.g., my-cog-feature)": "Digite o nome do espaço de trabalho (ex: meu-recurso-cog)",
    "Enter workspace name (e.g., my-feature)": "Digite o nome do espaço de trabalho (ex: meu-recurso)",
    "Search Recent Workspaces": "Pesquisar espaços de trabalho recentes",
    "Search Projects": "Pesquisar projetos",
    "Could not create project": "Não foi possível criar o projeto",
    "Failed to create workspace.": "Falha ao criar espaço de trabalho.",
    "Failed to create CitC clone workspace": "Falha ao criar espaço de trabalho clone CitC",
    "Workspace CL Status": "Status do CL do espaço de trabalho",
    "Workspace Name": "Nome do espaço de trabalho",
    "Workspace URI query parameter": "Parâmetro de consulta de URI do espaço de trabalho",
    "Workspace archived successfully": "Espaço de trabalho arquivado com sucesso",
    "Workspace mismatch actions": "Ações de divergência de espaço de trabalho",
    "Workspace setup warning": "Aviso de configuração do espaço de trabalho",
    "Updates to your sidebar": "Atualizações na sua barra lateral",
    "Updated sidebar grouping": "Agrupamento atualizado da barra lateral",
    "Create a new Piper (g4) workspace from your initial prompt. Customize in General Settings, under Advanced.": "Crie um novo espaço de trabalho Piper (g4) a partir do seu prompt inicial. Personalize nas Configurações Gerais, em Avançado.",
    "Create a new JJ workspace from your initial prompt. Customize in General Settings, under Advanced.": "Crie um novo espaço de trabalho JJ a partir do seu prompt inicial. Personalize nas Configurações Gerais, em Avançado.",
    "Create a new Cog (GoB) workspace from your initial prompt. Customize in General Settings, under Advanced.": "Crie um novo espaço de trabalho Cog (GoB) a partir do seu prompt inicial. Personalize nas Configurações Gerais, em Avançado.",
    "Create a new Fig workspace from your initial prompt. Customize in General Settings, under Advanced.": "Crie um novo espaço de trabalho Fig a partir do seu prompt inicial. Personalize nas Configurações Gerais, em Avançado.",
    "Google3 projects are deprecated. Learn more": "Projetos Google3 foram descontinuados. Saiba mais",
    "Project options": "Opções do projeto",
    "Copy Project Name": "Copiar nome do projeto",
    "Copy Workspace Name": "Copiar nome do espaço de trabalho",
    "Show in File Manager": "Mostrar no Gerenciador de Arquivos",
    "Show in File Explorer": "Mostrar no Explorador de Arquivos",
    "Reveal in Finder": "Revelar no Finder",
    "Open in Cider": "Abrir no Cider",
    "Archive Project": "Arquivar projeto",
    "Archive project": "Arquivar projeto",
    "Archive Workspace": "Arquivar espaço de trabalho",
    "Archive This Conversation": "Arquivar esta conversa",
    "Archive / Restore": "Arquivar / Restaurar",
    "Failed to archive workspace": "Falha ao arquivar espaço de trabalho",
    "Failed to unarchive project: project management feature not available": "Falha ao desarquivar projeto: recurso de gerenciamento de projetos indisponível",
    "Failed to save project": "Falha ao salvar projeto",
    "Failed to save project branch": "Falha ao salvar branch do projeto",
    "Failed to save project branch:": "Falha ao salvar branch do projeto:",
    "No git folder in this project matches the folder": "Nenhuma pasta git neste projeto corresponde à pasta",
    "Failed to save project branch: No git folder in this project matches the folder": "Falha ao salvar branch do projeto: Nenhuma pasta git neste projeto corresponde à pasta",
    "Branch name cannot start with a dash": "O nome da branch não pode começar com um traço",
    "Invalid branch or ref format": "Formato de branch ou ref inválido",
    "Branch actions": "Ações de branch",
    "Grant create, update, or delete access to specific branches.": "Conceder acesso de criação, atualização ou exclusão a branches específicas.",
    "Created a new branch on GitHub.": "Nova branch criada no GitHub.",
    "Created a new branch on Origin.": "Nova branch criada na Origin.",
    "The branch was pushed to GitLab.": "A branch foi enviada para o GitLab.",
    "Add context": "Adicionar contexto",
    "Actions": "Ações",
    "Media": "Mídia",
    "Mentions": "Menções",
    "Open Tabs": "Abas abertas",
    "Media actions": "Ações de mídia",
    "At mention code block": "Mencionar bloco de código",
    "Copy code": "Copiar código",
    "Add to Chat": "Adicionar ao chat",
    "Add to Chat/Quote": "Adicionar ao chat / Citar",
    "Add Hook Card": "Adicionar cartão de gancho",
    "Address bar": "Barra de endereço",
    "Back to home": "Voltar ao início",
    "Previous Page": "Página anterior",
    "Next Page": "Próxima página",
    "Current Page": "Página atual",
    "Mention Page": "Mencionar página",
    "Capture console logs": "Capturar logs do console",
    "Confirm Browser Interaction": "Confirmar interação no navegador",
    "Deny setting up browser": "Negar configuração do navegador",
    "Screen Recording": "Gravação de tela",
    "Screenshot": "Captura de tela",
    "Invalid Media": "Mídia inválida",
    "Remove audio": "Remover áudio",
    "Search tabs, files, plugins, subagents, artifacts, tasks...": "Pesquisar abas, arquivos, plugins, subagentes, artefatos, tarefas...",
    "Search for commands...": "Pesquisar comandos...",
    "Search file contents...": "Pesquisar conteúdo dos arquivos...",
    "Search across files...": "Pesquisar em todos os arquivos...",
    "Search all skills on Agent Market…": "Pesquisar todas as habilidades no Agent Market…",
    "Search skills…": "Pesquisar habilidades…",
    "Search steps...": "Pesquisar etapas...",
    "Search results": "Resultados da pesquisa",
    "See more results": "Ver mais resultados",
    "Select Agent": "Selecionar agente",
    "Select Default Branch": "Selecionar branch padrão",
    "Select Environment": "Selecionar ambiente",
    "Select Environment (": "Selecionar ambiente (",
    "Select Worktree (": "Selecionar worktree (",
    "Environment": "Ambiente",
    "Unknown Environment": "Ambiente desconhecido",
    "Unknown worktree": "Worktree desconhecida",
    "Environment Actions": "Ações do ambiente",
    "Environment Status": "Status do ambiente",
    "Archive Environment": "Arquivar ambiente",
    "Fork Environment Notice": "Aviso de ambiente bifurcado",
    "Invalid environment name": "Nome de ambiente inválido",
    "Creating environment...": "Criando ambiente...",
    "Loading worktrees...": "Carregando worktrees...",
    "No environments found": "Nenhum ambiente encontrado",
    "New Fig Workspace": "Novo espaço de trabalho Fig",
    "New Fig Share?": "Novo compartilhamento Fig?",
    "New Fig Share": "Novo compartilhamento Fig",
    "Start in a new Fig share (go/fig-shares)": "Iniciar em um novo compartilhamento Fig (go/fig-shares)",
    "Run in your current workspace": "Executar em seu espaço de trabalho atual",
    "Run in a new worktree": "Executar em uma nova worktree",
    "Run in a new git worktree": "Executar em uma nova worktree do git",
    "Run in a new jj workspace or Fig share": "Executar em um novo espaço de trabalho jj ou compartilhamento Fig",
    "Clone current workspace into a new independent workspace": "Clonar espaço de trabalho atual em um novo espaço de trabalho independente",
    "This is a CitC workspace (Fig share)": "Este é um espaço de trabalho CitC (compartilhamento Fig)",
    "Workspaces are not available for this project": "Espaços de trabalho não estão disponíveis para este projeto",
    "Worktrees are available for Git repositories": "Worktrees estão disponíveis para repositórios Git",
    "Worktrees are not available for this project": "Worktrees não estão disponíveis para este projeto",
    "Worktrees are a git feature. This folder is shared as is.": "Worktrees são um recurso do Git. Esta pasta é compartilhada como está.",
    "Search past worktrees...": "Pesquisar worktrees anteriores...",
    "Search past workspaces...": "Pesquisar espaços de trabalho anteriores...",
    "Failed to create worktree:": "Falha ao criar worktree:",
    "Create a JJ worktree": "Criar uma worktree JJ",
    "JJ worktree": "Worktree JJ",
    "No main workspace URI found for JJ worktree selector": "Nenhum URI de espaço de trabalho principal encontrado para o seletor de worktree JJ",
    "Your environment has expired. Please renew it to continue.": "Seu ambiente expirou. Renove-o para continuar.",
    "Your environment is active, but you can renew it if needed.": "Seu ambiente está ativo, mas você pode renová-lo se necessário.",
    "Your environment will expire soon. Please renew it to continue.": "Seu ambiente expirará em breve. Renove-o para continuar.",
    "Inline PDF preview is not available in this environment.": "A visualização de PDF integrada não está disponível neste ambiente.",
    "Cog workspace creation is not available in this environment.": "A criação de espaço de trabalho Cog não está disponível neste ambiente.",
    "ABFS workspace creation is not available in this environment.": "A criação de espaço de trabalho ABFS não está disponível neste ambiente.",
    "Creating worktree for the forked conversation...": "Criando worktree para a conversa bifurcada...",
    "Creating CitC workspace for the forked conversation...": "Criando espaço de trabalho CitC para a conversa bifurcada...",
    "Creating the forked conversation...": "Criando a conversa bifurcada...",
    "Forked conversation": "Conversa bifurcada",
    "New chats will be grouped by workspace.": "Novos chats serão agrupados por espaço de trabalho.",
    "Select Worktree": "Selecionar worktree",
    "Select branch": "Selecionar branch",
    "Select category to search...": "Selecionar categoria para pesquisar...",
    "Ask a quick question without interrupting the main conversation.": "Faça uma pergunta rápida sem interromper a conversa principal.",
    "Run until the specified goal is completely finished.": "Execute até que o objetivo especificado seja completamente concluído.",
    "Run an instruction on a recurring schedule or as a one-time timer.": "Execute uma instrução em um agendamento recorrente ou como um temporizador único.",
    "Invoke a browser agent for web tasks.": "Invoque um agente de navegador para tarefas na web.",
    "Plan carefully before executing a task.": "Planeje cuidadosamente antes de executar uma tarefa.",
    "Interview me to align on a plan.": "Entreviste-me para alinhar um plano.",
    "Invoke a team of agents to autonomously tackle large projects.": "Invoque uma equipe de agentes para realizar grandes projetos de forma autônoma.",
    "Reflect on recent successes or corrections to capture reusable skills or rules.": "Reflita sobre sucessos recentes ou correções para capturar habilidades ou regras reutilizáveis.",
    "Invoke the Boost multi-agent orchestrator for complex tasks.": "Invoque o orquestrador multiagente Boost para tarefas complexas.",
    "Fork Conversation": "Bifurcar conversa",
    "Create fork in current workspace": "Criar bifurcação no espaço de trabalho atual",
    "Create fork in new workspace": "Criar bifurcação em novo espaço de trabalho",
    "Create fork in shared workspace": "Criar bifurcação em espaço de trabalho compartilhado",
    "Close split view and go to forked conversation": "Fechar divisão e ir para a conversa bifurcada",
    "Fork": "Bifurcar",
    "Fork warning": "Aviso de bifurcação",
    "Open in new tab": "Abrir em nova aba",
    "Open in new window": "Abrir em nova janela",
    "Open side-by-side view": "Abrir visualização lado a lado",
    "Open full view": "Abrir visualização completa",
    "Open Search": "Abrir pesquisa",
    "Open Preferences": "Abrir preferências",
    "Open IDE": "Abrir IDE",
    "Open Browser Setup": "Abrir configuração do navegador",
    "Open Commit Graph": "Abrir gráfico de commits",
    "Open Launchpad": "Abrir Launchpad",
    "Open Trajectory Debug View": "Abrir visualização de depuração da trajetória",
    "Open in Trajectory Dashboard": "Abrir no painel de trajetórias",
    "Open in Notebook View": "Abrir na visualização de caderno",
    "Review pending conversations": "Revisar conversas pendentes",
    "Copy Trajectory ID": "Copiar ID da trajetória",
    "Copy trajectory ID": "Copiar ID da trajetória",
    "Copy debug info": "Copiar informações de depuração",
    "Copy description": "Copiar descrição",
    "Copy full URL to clipboard": "Copiar URL completa para a área de transferência",
    "Click to copy full command": "Clique para copiar o comando completo",
    "Click to copy URL": "Clique para copiar a URL",
    "Click to open docs": "Clique para abrir a documentação",
    "Click to go there, drag to select a range, drag an edge to resize": "Clique para ir até lá, arraste para selecionar um intervalo, arraste uma borda para redimensionar",
    "Double-click to reset panel sizes": "Clique duas vezes para redefinir os tamanhos dos painéis",
    "Drag to resize, double-click to reset": "Arraste para redimensionar, clique duas vezes para redefinir",
    "Drag to resize the gutter; double-click to fit it automatically": "Arraste para redimensionar a calha; clique duas vezes para ajustar automaticamente",
    "Zoom Level": "Nível de zoom",
    "More toolbar actions": "Mais ações da barra de ferramentas",
    "Close panel": "Fechar painel",
    "Close skills panel": "Fechar painel de habilidades",
    "Close Logs Modal": "Fechar modal de logs",
    "Dismiss notification": "Dispensar notificação",
    "Dismiss toast": "Fechar notificação",
    "Dismiss error": "Dispensar erro",
    "Dismiss Tip": "Dispensar dica",
    "Next toast": "Próxima notificação",
    "Previous toast": "Notificação anterior",
    "Collapse toast": "Recolher notificação",
    "More info": "Mais informações",
    "See Plans": "Ver planos",
    "Pay as you go": "Pague pelo que usar",
    "Billing model": "Modelo de faturamento",
    "Available licenses": "Licenças disponíveis",
    "Enterprise": "Empresarial",
    "Gemini Enterprise": "Gemini Enterprise",
    "United States": "Estados Unidos",
    "Europe": "Europa",
    "All": "Tudo",
    "Preset": "Predefinição",
    "First": "Primeiro",
    "Last": "Último",
    "Last 7 days": "Últimos 7 dias",
    "Uptime": "Tempo de atividade",
    "Unknown": "Desconhecido",
    "UNKNOWN": "DESCONHECIDO",
    "USER": "USUÁRIO",
    "MODEL": "MODELO",
    "SYSTEM": "SISTEMA",
    "TOOL": "FERRAMENTA",
    "CHECKPOINT": "PONTO DE VERIFICAÇÃO",
    "Step": "Etapa",
    "Steps": "Etapas",
    "Step Details": "Detalhes da etapa",
    "Step Type": "Tipo de etapa",
    "By phase": "Por fase",
    "By step type": "Por tipo de etapa",
    "All tools (*)": "Todas as ferramentas (*)",
    "Always Allow": "Sempre permitir",
    "Always Ask": "Sempre perguntar",
    "Always Proceed": "Sempre prosseguir",
    "Always run": "Sempre executar",
    "Ask every time": "Perguntar sempre",
    "Allow": "Permitir",
    "Allow Once": "Permitir uma vez",
    "Allow once": "Permitir uma vez",
    "Administrator access (UAC)": "Acesso de administrador (UAC)",
    "Allow List Terminal Commands": "Lista de comandos permitidos no terminal",
    "Access grants": "Concessões de acesso",
    "Edit permission target": "Editar destino da permissão",
    "Remove policy": "Remover política",
    "Delete organization policy": "Excluir política da organização",
    "Delete repository policy": "Excluir política do repositório",
    "Delete command": "Excluir comando",
    "Delete Permanently": "Excluir permanentemente",
    "Replace With New": "Substituir por novo",
    "Agent Edits": "Edições do agente",
    "Agent options": "Opções do agente",
    "Agent Auto-Fix Lints": "Correção automática de lints pelo agente",
    "Agent Host Address": "Endereço do host do agente",
    "Agent Non-Workspace File Access": "Acesso do agente a arquivos fora do espaço de trabalho",
    "Custom Agent Error:": "Erro do agente personalizado:",
    "Custom agents are not available in Best of N mode.": "Agentes personalizados não estão disponíveis no modo Best of N.",
    "Failed to start Best of N mode": "Falha ao iniciar o modo Best of N",
    "Best-of-N Started": "Best-of-N iniciado",
    "Best-of-N Ended": "Best-of-N concluído",
    "Not suitable for Best-of-N": "Não adequado para Best-of-N",
    "Number of responses": "Número de respostas",
    "Why are you opting out of auto-triggered Best-of-N?": "Por que você está desativando o Best-of-N automático?",
    "Why are you opting out?": "Por que você está desativando?",
    "Reason for opting out": "Motivo da desativação",
    "Prompt too simple": "Prompt muito simples",
    "This prompt is straightforward and does not need alternative comparisons.": "Este prompt é direto e não necessita de comparações alternativas.",
    "This request is not well-suited for parallel Best-of-N generation.": "Esta solicitação não é adequada para geração paralela Best-of-N.",
    "The current trigger rate is too high.": "A taxa atual de acionamento é muito alta.",
    "Too many surveys": "Pesquisas em excesso",
    "In a rush": "Com pressa",
    "I prefer an immediate single response to prioritize productivity right now.": "Prefiro uma resposta única e imediata para priorizar a produtividade agora.",
    "Cancel questionnaire": "Cancelar questionário",
    "Cancel step": "Cancelar etapa",
    "Accept Step": "Aceitar etapa",
    "Complete Onboarding Step": "Concluir etapa de introdução",
    "Complete verification": "Concluir verificação",
    "Verification required": "Verificação necessária",
    "Setup required": "Configuração necessária",
    "Settings Unavailable": "Configurações indisponíveis",
    "Plugin Operation Error:": "Erro na operação do plugin:",
    "Plugin details": "Detalhes do plugin",
    "Plugin metadata": "Metadados do plugin",
    "MCP Authentication Error:": "Erro de autenticação MCP:",
    "MCP Configuration Error:": "Erro de configuração MCP:",
    "MCP tool": "Ferramenta MCP",
    "Error fetching MCP prompt": "Erro ao buscar prompt MCP",
    "Error Loading Models": "Erro ao carregar modelos",
    "Install IDE": "Instalar IDE",
    "Extensions": "Extensões",
    "Extension": "Extensão",
    "External": "Externo",
    "Extension (VS Code)": "Extensão (VS Code)",
    "Extension (Visual Studio)": "Extensão (Visual Studio)",
    "Extension (Cider)": "Extensão (Cider)",
    "Extension (Eclipse)": "Extensão (Eclipse)",
    "Configure Branches": "Configurar branches",
    "Configure Worktree Branches": "Configurar branches de worktree",
    "Include unstaged changes": "Incluir alterações não preparadas",
    "No branches": "Nenhuma branch",
    "Branch": "Branch",
    "Branch / Ref": "Branch / Ref",
    "Dev mode: Localhost server automatically detected": "Modo desenvolvedor: servidor localhost detectado automaticamente",
    "Don't show this for 2 days": "Não mostrar isso por 2 dias",
    "What counts as a document": "O que conta como um documento",
    "Documents": "Documentos",
    "Target text in PDF...": "Texto de destino no PDF...",
    "File path breadcrumbs": "Caminho do arquivo",
    "Commands": "Comandos",
    "Command": "Comando",
    "Command Center": "Central de comandos",
    "Run JS": "Executar JS",
    "Run command": "Executar comando",
    "Switch Roles": "Alternar papéis",
    "System Instruction": "Instrução do sistema",
    "System Prompt": "Prompt do sistema",
    "Table options": "Opções de tabela",
    "Toggle Thumbnails": "Alternar miniaturas",
    "Tip": "Dica",
    "Activity": "Atividade",
    "Generations": "Gerações",
    "Goals": "Objetivos",
    "Inline Widget": "Widget integrado",
    "Antigravity Interactive HTML": "HTML Interativo do Antigravity",
    "Generate personalized rules": "Gerar regras personalizadas",
    "Skills and Rules Settings": "Configurações de habilidades e regras",
    "Customizations views": "Visualizações de personalização",
    "Customize sections": "Personalizar seções",
    "Debug view layout": "Layout da visualização de depuração",
    "Display": "Exibição",
    "Background": "Segundo plano",
    "Foreground": "Primeiro plano",
    "After": "Depois",
    "Before": "Antes",
    "Accent": "Destaque",
    "Output": "Saída",
    "Termination": "Encerramento",
    "Invocation": "Invocação",
    "Execution ID": "ID de execução",
    "Execution Metadata": "Metadados de execução",
    "Generator Metadata": "Metadados do gerador",
    "Full Error": "Erro completo",
    "Sidecar error": "Erro no sidecar",
    "Scroll position": "Posição de rolagem",
    "Discard": "Descartar",
    "Edit task title": "Editar título da tarefa",
    "View comments": "Ver comentários",
    "View Debug": "Ver depuração",
    "View Page": "Ver página",
    "view full search results": "ver todos os resultados da pesquisa",
    "Opens in the in-app preview pane. Some sites don't support iframe embedding and may not load.": "Abre no painel de pré-visualização do aplicativo. Alguns sites não suportam incorporação em iframe e podem não carregar.",
    "This command ran in the sandbox.": "Este comando foi executado na sandbox.",
    "Delete side question": "Excluir pergunta lateral",
    "Minimize side question": "Minimizar pergunta lateral",
    "Next side question": "Próxima pergunta lateral",
    "Previous side question": "Pergunta lateral anterior",
    "Resize side question panel": "Redimensionar painel de perguntas laterais",
    "Resize terminal panes": "Redimensionar painéis do terminal",
    "Enter authorization code...": "Digite o código de autorização...",
    "Conversation Name": "Nome da conversa",
    "Conversation name": "Nome da conversa",
    "Conversation unavailable": "Conversa indisponível",
    "Failed to delete conversation": "Falha ao excluir conversa",
    "Failed to fork conversation": "Falha ao bifurcar conversa",
    "Failed to proceed": "Falha ao prosseguir",
    "Failed to rename conversation": "Falha ao renomear conversa",
    "Failed to start conversation": "Falha ao iniciar conversa",
    "Failed to stop agent": "Falha ao parar o agente",
    "Failed to stop conversation": "Falha ao parar conversa",
    "Failed to continue": "Falha ao continuar",
    "Failed to Amend": "Falha ao emendar (Amend)",
    "Failed to Commit": "Falha ao realizar commit",
    "Failed to Push": "Falha ao enviar (Push)",
    "Failed to Generate Commit Message": "Falha ao gerar mensagem de commit",
    "Failed to create terminal": "Falha ao criar terminal",
    "Failed to create worktree": "Falha ao criar worktree",
    "Manage Permissions": "Gerenciar permissões",
    "Run Now": "Executar agora",
    "View Logs": "Ver logs",
    "Restart": "Reiniciar",
    "Open Settings": "Abrir configurações",
    "to be installed.": "instalado.",

    "File": "Arquivo",
    "Go Back": "Voltar",
    "Go Forward": "Avançar",
    "Go Back in Pane": "Voltar no painel",
    "Go Forward in Pane": "Avançar no painel",
    "Typeahead menu": "Menu de sugestões",
    "Show Antigravity": "Mostrar Antigravity",
    "Quit Antigravity": "Sair do Antigravity",
    "No agents running": "Nenhum agente em execução",
    "Confirm Quit": "Confirmar saída",
    "Are you sure you want to quit?": "Tem certeza de que deseja sair?",
    "There may be agents or background tasks running.": "Pode haver agentes ou tarefas em segundo plano em execução.",
    "No updates available": "Nenhuma atualização disponível",
    "Connect to WSL": "Conectar ao WSL",
    "Reopen Locally": "Reabrir localmente",
    "Hacky/lazy code": "Código improvisado/incompleto",
    "Lacked initiative": "Faltou iniciativa",
    "Incomplete / Gave up": "Incompleto / Desistiu",
    "Other": "Outro",
    "What was off? Select any that apply (optional).": "O que não ficou bom? Selecione as opções aplicáveis (opcional).",
    "(Optional) Tell us more or type your reason...": "(Opcional) Conte-nos mais ou digite o motivo...",
    "(Optional) Tell us more...": "(Opcional) Conte-nos mais...",
    "Tell us anything else here (optional)": "Conte-nos qualquer outro detalhe aqui (opcional)",
    "Edit": "Editar",
    "View": "Exibir",
    "Window": "Janela",
    "Help": "Ajuda",
    "Run": "Executar",
    "New Window": "Nova janela",
    "New Editor Window": "Nova janela do editor",
    "New Tab": "Nova aba",
    "New tab": "Nova aba",
    "Close": "Fechar",
    "Close (Esc)": "Fechar (Esc)",
    "Close (Escape)": "Fechar (Escape)",
    "Close Tab": "Fechar aba",
    "Close Window": "Fechar janela",
    "Minimize": "Minimizar",
    "Maximize": "Maximizar",
    "Restore": "Restaurar",
    "Reload": "Recarregar",
    "Reload Window": "Recarregar janela",
    "Reload app": "Recarregar aplicativo",
    "Reload this window.": "Recarregar esta janela.",
    "Force Reload": "Forçar recarregamento",
    "Toggle Developer Tools": "Alternar ferramentas do desenvolvedor",
    "Zoom": "Zoom",
    "Zoom In": "Aumentar zoom",
    "Zoom in": "Aumentar zoom",
    "Zoom in (+)": "Aumentar zoom (+)",
    "Zoom Out": "Diminuir zoom",
    "Zoom out": "Diminuir zoom",
    "Zoom out (-)": "Diminuir zoom (-)",
    "Reset Zoom": "Redefinir zoom",
    "Reset zoom": "Redefinir zoom",
    "Reset zoom (0)": "Redefinir zoom (0)",
    "Actual Size": "Tamanho real",
    "Toggle Fullscreen": "Alternar tela cheia",
    "Enter Fullscreen": "Entrar em tela cheia",
    "Exit Fullscreen": "Sair da tela cheia",
    "Undo": "Desfazer",
    "Redo": "Refazer",
    "Cut": "Recortar",
    "Copy": "Copiar",
    "Paste": "Colar",
    "Delete": "Excluir",
    "Select All": "Selecionar tudo",
    "Docs": "Documentação",
    "About": "Sobre",
    "Quit": "Sair",
    "Cancel": "Cancelar",
    "Confirm": "Confirmar",
    "OK": "OK",
    "Yes": "Sim",
    "Apply": "Aplicar",
    "Save": "Salvar",
    "Save & Continue": "Salvar e continuar",
    "Saved": "Salvo",
    "Saved!": "Salvo!",
    "Saving...": "Salvando...",
    "Done": "Concluído",
    "Back": "Voltar",
    "Next": "Avançar",
    "Previous": "Anterior",
    "Continue": "Continuar",
    "Skip": "Pular",
    "Skipped": "Pulado",
    "Submit": "Enviar",
    "Submitting...": "Enviando...",
    "Retry": "Tentar novamente",
    "Try Again": "Tentar novamente",
    "Try again": "Tentar novamente",
    "Dismiss": "Dispensar",
    "Got it": "Entendi",
    "Learn more": "Saiba mais",
    "Learn more.": "Saiba mais.",
    "learn more": "saiba mais",
    "Refresh": "Atualizar",
    "Refreshing...": "Atualizando...",
    "Loading": "Carregando",
    "Loading...": "Carregando...",
    "Search": "Buscar",
    "Search...": "Buscar...",
    "Filter": "Filtrar",
    "Clear": "Limpar",
    "Clear all": "Limpar tudo",
    "Clear filter": "Limpar filtro",
    "Clear Search": "Limpar busca",
    "Clear search": "Limpar pesquisa",
    "Clear search (Esc)": "Limpar busca (Esc)",
    "Reset": "Redefinir",
    "Reset State": "Redefinir estado",
    "Enable": "Ativar",
    "Enabled": "Ativado",
    "Disable": "Desativar",
    "Disabled": "Desativado",
    "Add": "Adicionar",
    "Remove": "Remover",
    "Removing...": "Removendo...",
    "Rename": "Renomear",
    "Renamed": "Renomeado",
    "Duplicate": "Duplicar",
    "Archive": "Arquivar",
    "Archived": "Arquivado",
    "Unarchive": "Desarquivar",
    "Pin": "Fixar",
    "Unpin": "Desafixar",
    "Share": "Compartilhar",
    "Export": "Exportar",
    "Import": "Importar",
    "Download": "Baixar",
    "Downloading...": "Baixando...",
    "Install": "Instalar",
    "Installed": "Instalados",
    "Installing...": "Instalando...",
    "Uninstall": "Desinstalar",
    "Uninstalling...": "Desinstalando...",
    "Update": "Atualizar",
    "Upgrade": "Atualizar plano",
    "Open": "Abrir",
    "Create": "Criar",
    "Create New": "Criar novo",
    "Creating...": "Criando...",
    "Deleting...": "Excluindo...",
    "Deleted": "Excluído",
    "Sidebar": "Barra lateral",
    "Toggle Sidebar": "Alternar barra lateral",
    "Toggle Sidebar, conversations need attention": "Alternar barra lateral, conversas precisam de atenção",
    "Close Sidebar": "Fechar barra lateral",
    "New Conversation": "Nova conversa",
    "New conversation": "Nova conversa",
    "New Conversation in Project": "Nova conversa no projeto",
    "New Conversation in Workspace": "Nova conversa no espaço de trabalho",
    "Projects": "Projetos",
    "Project": "Projeto",
    "No Project": "Sem projeto",
    "Not in Project": "Fora do projeto",
    "Outside of Project": "Fora de projeto",
    "Other Projects": "Outros projetos",
    "Create Project": "Criar projeto",
    "Create New Project": "Criar novo projeto",
    "Create a Project": "Criar um projeto",
    "Create project from scratch": "Criar projeto do zero",
    "Import AI Studio Project": "Importar projeto do AI Studio",
    "Untitle project": "Projeto sem título",
    "Untitled project": "Projeto sem título",
    "No projects created": "Nenhum projeto criado",
    "You don't have any projects created. Please create a project first.": "Você ainda não tem projetos criados. Crie um projeto primeiro.",
    "Workspaces": "Espaços de trabalho",
    "Workspace": "Espaço de trabalho",
    "Current Workspace": "Espaço de trabalho atual",
    "Current workspace": "Espaço de trabalho atual",
    "All Workspaces": "Todos os espaços de trabalho",
    "New Workspace": "Novo espaço de trabalho",
    "Add Workspace": "Adicionar espaço de trabalho",
    "Open Workspace": "Abrir espaço de trabalho",
    "Open Workspace Selector": "Abrir seletor de espaço de trabalho",
    "Archive Workspace": "Arquivar espaço de trabalho",
    "Unmount workspace": "Desmontar espaço de trabalho",
    "Delete workspace": "Excluir espaço de trabalho",
    "No workspaces found": "Nenhum espaço de trabalho encontrado",
    "No workspaces open.": "Nenhum espaço de trabalho aberto.",
    "Available workspaces": "Espaços de trabalho disponíveis",
    "Recent Remote Workspaces": "Espaços de trabalho remotos recentes",
    "Search Recent Workspaces": "Buscar espaços de trabalho recentes",
    "Connect to Remote Workspace": "Conectar a espaço de trabalho remoto",
    "Add recent remote workspace": "Adicionar espaço de trabalho remoto recente",
    "Worktree": "Árvore de trabalho (Worktree)",
    "Worktrees": "Árvores de trabalho (Worktrees)",
    "New Worktree": "Nova worktree",
    "New worktree": "Nova worktree",
    "Previous Worktrees": "Worktrees anteriores",
    "No previous worktrees": "Nenhuma worktree anterior",
    "Project + Worktree": "Projeto + Worktree",
    "Workspace + Worktree": "Espaço de trabalho + Worktree",
    "Conversations": "Conversas",
    "Conversation": "Conversa",
    "Conversations (Status)": "Conversas (Status)",
    "All conversations": "Todas as conversas",
    "Pinned Conversations": "Conversas fixadas",
    "Pinned Chats Only": "Apenas conversas fixadas",
    "Other Conversations": "Outras conversas",
    "Standalone": "Avulso",
    "Standalone Conversation": "Conversa avulsa",
    "Standalone Conversations": "Conversas avulsas",
    "Untitled": "Sem título",
    "Untitled Conversation": "Conversa sem título",
    "No conversations yet": "Nenhuma conversa ainda",
    "No conversations found": "Nenhuma conversa encontrada",
    "No conversations available": "Nenhuma conversa disponível",
    "Conversation History": "Histórico de conversas",
    "Open Conversation History": "Abrir histórico de conversas",
    "Open Conversation": "Abrir conversa",
    "Open Conversation Picker": "Abrir seletor de conversas",
    "Search conversations...": "Buscar conversas...",
    "Search for conversations...": "Buscar conversas...",
    "Search conversations (by name or Cascade ID)": "Buscar conversas (por nome ou ID Cascade)",
    "Search by name or Cascade ID...": "Buscar por nome ou ID Cascade...",
    "Search projects...": "Buscar projetos...",
    "Search workspaces...": "Buscar espaços de trabalho...",
    "Display Options": "Opções de exibição",
    "Group By": "Agrupar por",
    "Group By Project": "Agrupar por projeto",
    "Group By Workspace": "Agrupar por espaço de trabalho",
    "Sidebar grouped by project": "Barra lateral agrupada por projeto",
    "Sidebar grouped by workspace": "Barra lateral agrupada por espaço de trabalho",
    "Sort Conversations": "Ordenar conversas",
    "Alphabetical (A-Z)": "Ordem alfabética (A-Z)",
    "Date Added": "Data de adição",
    "Last Updated": "Última atualização",
    "Only Unread": "Apenas não lidas",
    "Archived Only": "Apenas arquivadas",
    "Unread": "Não lida",
    "Mark as Read": "Marcar como lida",
    "Mark as read": "Marcar como lida",
    "Mark Read": "Marcar como lida",
    "Mark as Unread": "Marcar como não lida",
    "Mark Unread": "Marcar como não lida",
    "Mark all as read": "Marcar todas como lidas",
    "Mark 1 conversation as read": "Marcar 1 conversa como lida",
    "Pin conversation": "Fixar conversa",
    "Pin This Conversation": "Fixar esta conversa",
    "Unpin conversation": "Desafixar conversa",
    "Unpin This Conversation": "Desafixar esta conversa",
    "Archive conversation": "Arquivar conversa",
    "Archive Conversation": "Arquivar conversa",
    "Archive This Conversation": "Arquivar esta conversa",
    "Conversation Archived": "Conversa arquivada",
    "This chat is archived.": "Esta conversa está arquivada.",
    "Delete Conversation": "Excluir conversa",
    "Rename Conversation": "Renomear conversa",
    "Rename This Conversation": "Renomear esta conversa",
    "Edit Conversation Title": "Editar título da conversa",
    "Edit title": "Editar título",
    "Copy Conversation ID": "Copiar ID da conversa",
    "Copy Conversation Markdown": "Copiar conversa em Markdown",
    "Conversation copied as Markdown to clipboard": "Conversa copiada em Markdown para a área de transferência",
    "Share Conversation (Preview)": "Compartilhar conversa (Prévia)",
    "Create Group": "Criar grupo",
    "New Group": "Novo grupo",
    "Rename Group": "Renomear grupo",
    "Delete Group": "Excluir grupo",
    "Move to Group": "Mover para grupo",
    "Move to New Group": "Mover para novo grupo",
    "Remove from Group": "Remover do grupo",
    "Group name": "Nome do grupo",
    "No groups yet": "Nenhum grupo ainda",
    "Scheduled Tasks": "Tarefas agendadas",
    "Scheduled Task": "Tarefa agendada",
    "Schedule": "Agendar",
    "Scheduled": "Agendado",
    "Automations": "Automações",
    "Automation": "Automação",
    "Automation saved": "Automação salva",
    "Hourly": "De hora em hora",
    "Daily": "Diariamente",
    "Weekly": "Semanalmente",
    "Monday": "Segunda-feira",
    "Tuesday": "Terça-feira",
    "Wednesday": "Quarta-feira",
    "Thursday": "Quinta-feira",
    "Friday": "Sexta-feira",
    "Saturday": "Sábado",
    "Sunday": "Domingo",
    "Select Hour": "Selecionar hora",
    "Prompt to execute on schedule...": "Comando/instrução para executar no agendamento...",
    "Enter a prompt for the agent to run...": "Digite uma instrução para o agente executar...",
    "Cron expression e.g. 0 */6 * * *": "Expressão cron, ex.: 0 */6 * * *",
    "Customizations": "Personalizações",
    "Customizations & Skills": "Personalizações e Habilidades",
    "Skills & Customizations": "Habilidades e Personalizações",
    "Skills & Rules": "Habilidades e Regras",
    "Skills": "Habilidades (Skills)",
    "Active Skills": "Habilidades ativas",
    "Installed Skills": "Habilidades instaladas",
    "Recommended Skills": "Habilidades recomendadas",
    "Enable Recommended Skills": "Ativar habilidades recomendadas",
    "Manage Skills": "Gerenciar habilidades",
    "Refresh Skills": "Atualizar habilidades",
    "Refresh skills": "Atualizar habilidades",
    "Refresh skills paths": "Atualizar caminhos de habilidades",
    "Customize Global Skills": "Personalizar habilidades globais",
    "Skill Custom Paths": "Caminhos personalizados de habilidades",
    "Delete Skill": "Excluir habilidade",
    "Rules": "Regras",
    "Plugins": "Plugins",
    "UI Plugins": "Plugins de interface",
    "UI Extensions": "Extensões de interface",
    "UI extensions": "Extensões de interface",
    "Marketplace": "Marketplace",
    "Browse the Marketplace": "Explorar o Marketplace",
    "Explore the plugin marketplace": "Explorar a loja de plugins",
    "Build With Google Plugins": "Plugins criados com o Google",
    "Build with Google Plugins": "Plugins criados com o Google",
    "Plugins Build With Google": "Plugins criados com o Google",
    "Build with Google": "Criado com o Google",
    "Build With Google": "Criado com o Google",
    "Browse and enable plugins from the Build With Google catalog.": "Navegue e ative plugins do catálogo de plugins criados com o Google.",
    "Browse and enable plugins from the Build with Google catalog.": "Navegue e ative plugins do catálogo de plugins criados com o Google.",
    "Plugins are packaged collections of skills and MCPs to help the Agent in Google work with Google developer products. You can always change your choices in Settings.": "Os plugins são coleções empacotadas de habilidades e servidores MCP para ajudar o agente no Google a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas opções nas Configurações.",
    "Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in Settings.": "Os plugins são coleções empacotadas de habilidades e servidores MCP para ajudar o agente no Antigravity a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas opções nas Configurações.",
    "There are currently no Build with Google plugins available.": "No momento, não há plugins criados com o Google disponíveis.",
    "There are currently no Build with Antigravity plugins available.": "No momento, não há plugins criados com o Antigravity disponíveis.",
    "Plugin Operation Error:": "Erro na operação do plugin:",
    "Plugin operations are not supported in this environment.": "Operações de plugin não são suportadas neste ambiente.",
    "Loading plugins...": "Carregando plugins...",
    "Discover helpful skills & plugins": "Descubra habilidades e plugins úteis",
    "Create a Plugin with the Agent": "Criar um plugin com o agente",
    "Create plugin": "Criar plugin",
    "Delete plugin": "Excluir plugin",
    "No Plugins Available": "Nenhum plugin disponível",
    "No plugins available": "Nenhum plugin disponível",
    "No plugins available.": "Nenhum plugin disponível.",
    "Hooks": "Ganchos (Hooks)",
    "Manage Hooks": "Gerenciar ganchos (Hooks)",
    "Add Hook Card": "Adicionar cartão de gancho",
    "Delete Hook": "Excluir gancho",
    "New hook name": "Nome do novo gancho",
    "Pre Invocation": "Pré-invocação",
    "Post Invocation": "Pós-invocação",
    "Pre Tool Use": "Antes de usar ferramenta",
    "Post Tool Use": "Após usar ferramenta",
    "Add Handler": "Adicionar manipulador",
    "Delete Handler": "Excluir manipulador",
    "MCP Servers": "Servidores MCP",
    "MCP servers": "Servidores MCP",
    "Installed MCP Servers": "Servidores MCP instalados",
    "Add MCP": "Adicionar MCP",
    "Add MCP Server": "Adicionar servidor MCP",
    "Add MCP Servers": "Adicionar servidores MCP",
    "Delete MCP Server": "Excluir servidor MCP",
    "Open MCP Config": "Abrir configuração MCP",
    "Refresh MCP servers": "Atualizar servidores MCP",
    "Search MCP servers by name": "Pesquisar servidores MCP por nome",
    "No MCP servers installed": "Nenhum servidor MCP instalado",
    "Use Add MCP to browse the store, or add a custom server via the MCP config.": "Use 'Adicionar MCP' para explorar a loja ou adicione um servidor personalizado via configuração MCP.",
    "Use Add MCP to browse the store.": "Use 'Adicionar MCP' para explorar a loja.",
    "Custom Agents": "Agentes personalizados",
    "Agents": "Agentes",
    "Main Agent": "Agente principal",
    "New Agent Script": "Novo script de agente",
    "Agent Script": "Script do agente",
    "Refresh custom agents": "Atualizar agentes personalizados",
    "Refresh customizations": "Atualizar personalizações",
    "Search customizations...": "Buscar personalizações...",
    "No Custom Agents or Plugins": "Nenhum agente personalizado ou plugin",
    "There are no customizations enabled.": "Não há personalizações ativadas.",
    "No customizations match your search.": "Nenhuma personalização corresponde à sua busca.",
    "Ask anything, @ to mention, / for actions": "Pergunte qualquer coisa, @ para mencionar, / para ações",
    "Ask anything, @ to mention": "Pergunte qualquer coisa, @ para mencionar",
    "Ask anything...": "Pergunte qualquer coisa...",
    "Ask anything": "Pergunte qualquer coisa",
    "Type a message...": "Digite uma mensagem...",
    "Send a message...": "Envie uma mensagem...",
    "What would you like to build?": "O que você gostaria de construir?",
    "What would you like to do?": "O que você gostaria de fazer?",
    "Ask a question or describe a task...": "Faça uma pergunta ou descreva uma tarefa...",
    "Add a message...": "Adicione uma mensagem...",
    "Write a comment...": "Escreva um comentário...",
    "Pick a suggestion below to get started, or ask me anything.": "Escolha uma sugestão abaixo para começar ou pergunte qualquer coisa.",
    "Add context": "Adicionar contexto",
    "Add Context": "Adicionar contexto",
    "Mention": "Mencionar",
    "Mentions": "Menções",
    "Files": "Arquivos",
    "Folders": "Pastas",
    "Directories": "Diretórios",
    "Recent Files": "Arquivos recentes",
    "Open Tabs": "Abas abertas",
    "Media": "Mídia",
    "Uploads": "Envios",
    "No uploads": "Nenhum envio",
    "Record voice memo": "Gravar mensagem de voz",
    "Record Audio": "Gravar áudio",
    "Start Voice Recording": "Iniciar gravação de voz",
    "Stop Voice Recording": "Parar gravação de voz",
    "Toggle Voice Recording": "Alternar gravação de voz",
    "Stop recording": "Parar gravação",
    "Stop Recording": "Parar gravação",
    "Stop Recording and Send": "Parar gravação e enviar",
    "Cancel recording": "Cancelar gravação",
    "Recording": "Gravando",
    "Sending transcribed message...": "Enviando mensagem transcrita...",
    "Finalizing transcription...": "Finalizando transcrição...",
    "Finalizing...": "Finalizando...",
    "Message input": "Entrada de mensagem",
    "Send message": "Enviar mensagem",
    "Send Now": "Enviar agora",
    "Send immediately": "Enviar imediatamente",
    "Queue message": "Enfileirar mensagem",
    "Queued Messages": "Mensagens na fila",
    "Queued messages": "Mensagens na fila",
    "Message queued.": "Mensagem adicionada à fila.",
    "Sends after agent finishes working": "Envia após o agente concluir o trabalho",
    "Expand queued messages": "Expandir mensagens na fila",
    "Stop execution": "Parar execução",
    "Stop Execution": "Parar execução",
    "Stop": "Parar",
    "Cancel (Ctrl+D)": "Cancelar (Ctrl+D)",
    "Continue Response": "Continuar resposta",
    "Scroll to Bottom": "Rolar para o final",
    "Load older messages": "Carregar mensagens anteriores",
    "No more older messages": "Não há mensagens mais antigas",
    "AI Capabilities Overview": "Visão geral de recursos da IA",
    "Select Model": "Selecionar modelo",
    "Select model": "Selecionar modelo",
    "Select Model to Send Message": "Selecione um modelo para enviar mensagem",
    "Select another model": "Selecionar outro modelo",
    "No Model Selected": "Nenhum modelo selecionado",
    "No Models Available": "Nenhum modelo disponível",
    "No models available": "Nenhum modelo disponível",
    "Model selector loading": "Carregando seletor de modelos",
    "Recommended": "Recomendado",
    "Low": "Baixo",
    "Medium": "Médio",
    "High": "Alto",
    "Max": "Máximo",
    "Fast": "Rápido",
    "Planning": "Planejamento",
    "Autonomous Mode": "Modo autônomo",
    "Autonomous mode": "Modo autônomo",
    "Autonomous mode active: the agent works independently and does not ask questions or request new permissions.": "Modo autônomo ativo: o agente trabalha de forma independente sem fazer perguntas ou solicitar novas permissões.",
    "Best of N": "Melhor de N",
    "Enable Best-of-2": "Ativar Melhor de 2",
    "Trigger multiple response variants from the same prompt.": "Gera múltiplas variantes de resposta a partir da mesma instrução.",
    "Team of subagents to do long running work": "Equipe de subagentes para realizar trabalhos longos",
    "Thinking": "Raciocínio",
    "Thinking...": "Pensando...",
    "Thinking for": "Pensando por",
    "Thought Process": "Processo de raciocínio",
    "Working": "Trabalhando",
    "Working...": "Trabalhando...",
    "Worked for": "Trabalhou por",
    "Stopped": "Parado",
    "Stopped after": "Parou após",
    "Agent Stopped": "Agente parado",
    "Agent terminated due to error": "Agente encerrado devido a um erro",
    "Starting": "Iniciando",
    "Ready": "Pronto",
    "Idle": "Ocioso",
    "Running": "Em execução",
    "In Progress": "Em andamento",
    "Pending": "Pendente",
    "Completed": "Concluído",
    "Errored": "Com erro",
    "Error": "Erro",
    "Errors": "Erros",
    "Canceled": "Cancelado",
    "Canceling": "Cancelando",
    "Killed": "Encerrado",
    "Blocked": "Bloqueado",
    "Blocked, needs input": "Bloqueado, aguarda ação",
    "Needs Attention": "Requer atenção",
    "Needs attention": "Requer atenção",
    "Action Required": "Ação necessária",
    "Action required": "Ação necessária",
    "Input required": "Entrada necessária",
    "Approval": "Aprovação",
    "Approved": "Aprovado",
    "Rejected": "Rejeitado",
    "Analyze": "Analisar",
    "Analyzed": "Analisou",
    "Analyzing": "Analisando",
    "Analyzed content": "Conteúdo analisado",
    "Analyzing content": "Analisando conteúdo",
    "Analyzed Task Log": "Log da tarefa analisado",
    "Analyzing Task Log": "Analisando log da tarefa",
    "Explore": "Explorar",
    "Explored": "Explorou",
    "Exploring": "Explorando",
    "Edited": "Editou",
    "Editing": "Editando",
    "Read": "Leu",
    "Reading": "Lendo",
    "Viewed": "Visualizou",
    "Viewing": "Visualizando",
    "Searched": "Buscou",
    "Searching": "Buscando",
    "Ran": "Executou",
    "Execute": "Executar",
    "Executed": "Executou",
    "Executing": "Executando",
    "Created": "Criou",
    "Creating": "Criando",
    "Updated": "Atualizou",
    "Updating": "Atualizando",
    "Asked": "Perguntou",
    "Asking": "Perguntando",
    "Tested": "Testou",
    "Took Screenshot": "Capturou a tela",
    "Taking Screenshot": "Capturando a tela",
    "Capture screenshot": "Capturar tela",
    "Capture browser screenshot": "Capturar tela do navegador",
    "Opened URL in Browser": "Abriu URL no navegador",
    "Opening URL in Browser": "Abrindo URL no navegador",
    "Read Browser Page in Browser": "Leu página no navegador",
    "Reading Browser Page in Browser": "Lendo página no navegador",
    "Refreshed Browser page": "Atualizou página do navegador",
    "Refreshing Browser page": "Atualizando página do navegador",
    "Typed into Browser": "Digitou no navegador",
    "Typing into Browser": "Digitando no navegador",
    "Dragged in Browser": "Arrastou no navegador",
    "Dragging in Browser": "Arrastando no navegador",
    "Moved Mouse in Browser": "Moveu o mouse no navegador",
    "Moving Mouse in Browser": "Movendo o mouse no navegador",
    "Resized Browser window": "Redimensionou janela do navegador",
    "Resizing Browser window": "Redimensionando janela do navegador",
    "Retrieved Browser Pages": "Obteve páginas do navegador",
    "Retrieving Browser Pages": "Obtendo páginas do navegador",
    "Retrieved Console Logs from Browser": "Obteve logs do console do navegador",
    "Retrieving Console Logs from Browser": "Obtendo logs do console do navegador",
    "Extracted DOM elements": "Extraiu elementos do DOM",
    "Extracting DOM elements": "Extraindo elementos do DOM",
    "Fetched network request": "Obteve requisição de rede",
    "Fetching network request": "Obtendo requisição de rede",
    "Fetched network requests": "Obteve requisições de rede",
    "Fetching network requests": "Obtendo requisições de rede",
    "The agent has a question for you:": "O agente tem uma pergunta para você:",
    "The agent has questions for you:": "O agente tem perguntas para você:",
    "Other (write your answer)": "Outro (escreva sua resposta)",
    "Previous question": "Pergunta anterior",
    "Next question": "Próxima pergunta",
    "Confirmation required to execute this step": "Confirmação necessária para executar esta etapa",
    "Confirm the command is safe to run outside of the sandbox with full network and disk access.": "Confirme se o comando é seguro para execução fora do sandbox com acesso total à rede e ao disco.",
    "Allow": "Permitir",
    "Allow Once": "Permitir uma vez",
    "Allow once": "Permitir uma vez",
    "Always Allow": "Permitir sempre",
    "Allow in Conversation": "Permitir nesta conversa",
    "Allow options": "Opções de permissão",
    "Deny": "Negar",
    "Block": "Bloquear",
    "Approve": "Aprovar",
    "Approve this action": "Aprovar esta ação",
    "Accept Step": "Aceitar etapa",
    "Reject Step": "Rejeitar etapa",
    "Accept all": "Aceitar tudo",
    "Proceed": "Prosseguir",
    "Proceed Anyway": "Prosseguir mesmo assim",
    "Proceed in Sandbox": "Prosseguir na sandbox",
    "Proceed with Plan": "Prosseguir com o plano",
    "Proceed with implementation plan": "Prosseguir com o plano de implementação",
    "Review": "Revisar",
    "Review Changes": "Revisar alterações",
    "Request Review": "Solicitar revisão",
    "Require Review": "Exigir revisão",
    "Good response": "Boa resposta",
    "Good Response": "Boa resposta",
    "Bad response": "Resposta ruim",
    "Bad Response": "Resposta ruim",
    "Copied": "Copiado",
    "Copied!": "Copiado!",
    "Copied to clipboard": "Copiado para a área de transferência",
    "Copy response": "Copiar resposta",
    "Copy prompt": "Copiar prompt",
    "Copy command": "Copiar comando",
    "Copy output": "Copiar saída",
    "Copy path": "Copiar caminho",
    "Copy File Path": "Copiar caminho do arquivo",
    "Copy File Name": "Copiar nome do arquivo",
    "Copy Content": "Copiar conteúdo",
    "Copy Image": "Copiar imagem",
    "Copy Link": "Copiar link",
    "Copy link": "Copiar link",
    "Copy thinking": "Copiar raciocínio",
    "Copy error": "Copiar erro",
    "Copy error to clipboard": "Copiar erro para a área de transferência",
    "Undo to this point": "Desfazer até este ponto",
    "Undo To Here": "Desfazer até aqui",
    "Confirm Undo": "Confirmar desfazer",
    "Cannot revert this message": "Não é possível reverter esta mensagem",
    "Only the conversation will be rewound; your files will be left as-is.": "Apenas a conversa será retrocedida; seus arquivos permanecerão intactos.",
    "Rewinds the conversation only. Files in this workspace stay as they are now.": "Retrocede apenas a conversa. Os arquivos neste espaço de trabalho permanecem como estão.",
    "Confirming this undo action will make the following changes:": "Confirmar esta ação de desfazer realizará as seguintes alterações:",
    "This undo action will not make any code changes.": "Esta ação de desfazer não fará alterações no código.",
    "User message": "Mensagem do usuário",
    "Agent response": "Resposta do agente",
    "More actions": "Mais ações",
    "More Actions": "Mais ações",
    "More options": "Mais opções",
    "More": "Mais",
    "Add to Chat": "Adicionar ao chat",
    "Add to Chat/Quote": "Adicionar ao chat/Citar",
    "Quote": "Citar",
    "Quote Selection": "Citar seleção",
    "Explain and Fix in Current Conversation": "Explicar e corrigir na conversa atual",
    "Auxiliary Pane": "Painel auxiliar",
    "Toggle Auxiliary Pane": "Alternar painel auxiliar",
    "Toggle Overview Panel": "Alternar painel de visão geral",
    "Next Aux Pane Tab": "Próxima aba do painel auxiliar",
    "Previous Aux Pane Tab": "Aba anterior do painel auxiliar",
    "Overview": "Visão geral",
    "Subagents": "Subagentes",
    "Subagent": "Subagente",
    "Subagent Conversation": "Conversa do subagente",
    "Subagent ended": "Subagente finalizado",
    "Stop Subagent": "Parar subagente",
    "Stop subagent": "Parar subagente",
    "Stop All Subagents": "Parar todos os subagentes",
    "Expand subagents": "Expandir subagentes",
    "View child subagents": "Ver subagentes filhos",
    "No subagents": "Nenhum subagente",
    "Loading subagent...": "Carregando subagente...",
    "This subagent was killed and can no longer be messaged.": "Este subagente foi encerrado e não pode mais receber mensagens.",
    "Background Tasks": "Tarefas em segundo plano",
    "Background Task": "Tarefa em segundo plano",
    "Background task": "Tarefa em segundo plano",
    "Background Task Output": "Saída da tarefa em segundo plano",
    "No background tasks": "Nenhuma tarefa em segundo plano",
    "Cancel Task": "Cancelar tarefa",
    "Cancel All Tasks": "Cancelar todas as tarefas",
    "Stop Task": "Parar tarefa",
    "Delete Task": "Excluir tarefa",
    "Task Logs": "Logs da tarefa",
    "Task not found": "Tarefa não encontrada",
    "Artifacts": "Artefatos",
    "Artifact": "Artefato",
    "Artifact Viewer": "Visualizador de artefatos",
    "Artifact Comments": "Comentários do artefato",
    "Artifact Name": "Nome do artefato",
    "No artifacts generated": "Nenhum artefato gerado",
    "Export Artifact": "Exportar artefato",
    "Export artifact": "Exportar artefato",
    "Export as PDF": "Exportar como PDF",
    "Download PDF": "Baixar PDF",
    "Download SVG": "Baixar SVG",
    "Artifacts are created when the agent performs more complex, longer running tasks while in Planning mode.": "Artefatos são criados quando o agente executa tarefas mais complexas e longas no modo Planejamento.",
    "Artifacts are files the agent creates during a conversation to help perform longer running tasks and allow the user to provide high-level feedback. Click to open in editor.": "Artefatos são arquivos criados pelo agente durante a conversa para auxiliar em tarefas longas e permitir seu feedback. Clique para abrir no editor.",
    "Files Changed": "Arquivos alterados",
    "Files modified by the agent in this conversation": "Arquivos modificados pelo agente nesta conversa",
    "No file changes": "Nenhuma alteração de arquivo",
    "No changes to review": "Nenhuma alteração para revisar",
    "Changes": "Alterações",
    "Branch Changes": "Alterações da branch",
    "Staged Changes": "Alterações preparadas (Staged)",
    "Staged": "Preparado (Staged)",
    "Added (Staged)": "Adicionado (Staged)",
    "Modified": "Modificado",
    "Modified Files": "Arquivos modificados",
    "Modified files:": "Arquivos modificados:",
    "Untracked (Unstaged)": "Não rastreado (Unstaged)",
    "Uncommitted": "Não comitado",
    "All Files": "Todos os arquivos",
    "All changes since the branch point": "Todas as alterações desde o ponto de ramificação",
    "True changes vs the parent workspace": "Alterações reais em relação ao espaço de trabalho pai",
    "Stage change": "Preparar alteração (Stage)",
    "Unstage change": "Retirar da preparação (Unstage)",
    "Revert file changes": "Reverter alterações do arquivo",
    "Discard unstaged changes": "Descartar alterações não preparadas",
    "Commit": "Commit",
    "Commit staged changes": "Fazer commit das alterações preparadas",
    "Commit succeeded": "Commit realizado com sucesso",
    "Amend": "Emendar (Amend)",
    "Amend staged changes into the current commit": "Emendar alterações preparadas no commit atual",
    "Amend succeeded": "Emenda (Amend) realizada com sucesso",
    "Push": "Enviar (Push)",
    "Push succeeded": "Push realizado com sucesso",
    "Expand Diffs": "Expandir diferenças (Diffs)",
    "Toggle file diff": "Alternar diff do arquivo",
    "Show Whitespace Changes": "Mostrar alterações de espaços em branco",
    "Hide Whitespace Changes": "Ocultar alterações de espaços em branco",
    "Side-by-side layout": "Layout lado a lado",
    "Stacked layout": "Layout empilhado",
    "Terminals": "Terminais",
    "Terminal": "Terminal",
    "Standalone Terminals": "Terminais avulsos",
    "New Terminal": "Novo terminal",
    "New Terminal Tab": "Nova aba do terminal",
    "Add Terminal": "Adicionar terminal",
    "Close Terminal Tab": "Fechar aba do terminal",
    "Delete Terminal": "Excluir terminal",
    "Split Terminal": "Dividir terminal",
    "Toggle Terminal": "Alternar terminal",
    "Open Terminal": "Abrir terminal",
    "Insert in Terminal": "Inserir no terminal",
    "Insert in terminal": "Inserir no terminal",
    "Terminal: Add to Chat": "Terminal: Adicionar ao chat",
    "No active terminals": "Nenhum terminal ativo",
    "No active terminals. Click + to create one.": "Nenhum terminal ativo. Clique em + para criar um.",
    "Connecting to terminal...": "Conectando ao terminal...",
    "Creating terminal...": "Criando terminal...",
    "Browser": "Navegador",
    "Browser Subagent Viewer": "Visualizador do subagente de navegador",
    "Active Browser page": "Página ativa do navegador",
    "No browser pages open": "Nenhuma página aberta no navegador",
    "Pages currently open in Antigravity's Browser instance are shown below.": "As páginas atualmente abertas na instância do navegador do Antigravity são exibidas abaixo.",
    "Open in Browser": "Abrir no navegador",
    "Open in Built-in Browser": "Abrir no navegador integrado",
    "Open in external browser": "Abrir no navegador externo",
    "Open with External Browser": "Abrir com navegador externo",
    "Open in Preview Pane": "Abrir no painel de prévia",
    "Open in Preview Tab": "Abrir em aba de prévia",
    "Open Preview": "Abrir prévia",
    "Preview": "Prévia",
    "Embedded web preview": "Prévia web integrada",
    "Comments": "Comentários",
    "File Comments": "Comentários de arquivo",
    "File Diff Comments": "Comentários de diff",
    "Add inline comment": "Adicionar comentário na linha",
    "Comment on Selection": "Comentar na seleção",
    "Leave a comment": "Deixar um comentário",
    "Save Comment": "Salvar comentário",
    "Submit comment": "Enviar comentário",
    "Edit comment": "Editar comentário",
    "Delete comment": "Excluir comentário",
    "Conversation Log": "Registro da conversa",
    "Logs": "Logs",
    "Console logs": "Logs do console",
    "Empty log": "Log vazio",
    "File Explorer": "Explorador de arquivos",
    "File explorer": "Explorador de arquivos",
    "File Viewer": "Visualizador de arquivos",
    "Toggle File Viewer": "Alternar visualizador de arquivos",
    "Toggle Editor": "Alternar editor",
    "Expand All": "Expandir tudo",
    "Expand All Folders": "Expandir todas as pastas",
    "Collapse All Folders": "Recolher todas as pastas",
    "Empty directory": "Diretório vazio",
    "No files or folders found": "Nenhum arquivo ou pasta encontrado",
    "Settings": "Configurações",
    "Settings -": "Configurações -",
    "Open Settings": "Abrir configurações",
    "Open settings menu": "Abrir menu de configurações",
    "Close Settings": "Fechar configurações",
    "Project Settings": "Configurações do projeto",
    "Open project settings": "Abrir configurações do projeto",
    "Use Global Settings": "Usar configurações globais",
    "Go to global settings": "Ir para configurações globais",
    "General": "Geral",
    "Project General": "Geral do projeto",
    "Manage your plan, credentials, and general preferences.": "Gerencie seu plano, credenciais e preferências gerais.",
    "Appearance": "Aparência",
    "Configure the agent's visual theme and display preferences.": "Configure o tema visual do agente e as preferências de exibição.",
    "Theme": "Tema",
    "Select Theme": "Selecionar tema",
    "Dark": "Escuro",
    "Dark Mode": "Modo escuro",
    "Dark Theme": "Tema escuro",
    "Default Dark": "Escuro padrão",
    "Light": "Claro",
    "Light Mode": "Modo claro",
    "Light Theme": "Tema claro",
    "Default Light": "Claro padrão",
    "System": "Sistema",
    "Auto (detected)": "Automático (detectado)",
    "Toggle Between Light/Dark Themes": "Alternar entre temas claro/escuro",
    "Accent": "Cor de destaque",
    "Contrast": "Contraste",
    "Skin": "Tema do produto",
    "Product Skin": "Tema do produto",
    "Choose the product skin that fits how you work.": "Escolha a interface do produto que melhor se adapta à sua forma de trabalhar.",
    "Choose how technical the interface should be.": "Escolha o nível técnico da interface.",
    "The full developer experience.": "A experiência completa para desenvolvedores.",
    "Conversation Width": "Largura da conversa",
    "Configure the maximum width of the conversation panel.": "Configura a largura máxima do painel de conversa.",
    "Markdown Artifact Width": "Largura dos artefatos Markdown",
    "Configure the default width of markdown artifacts.": "Configura a largura padrão dos artefatos Markdown.",
    "Regular": "Normal",
    "Wide": "Largo",
    "Full": "Total",
    "Maximize Width": "Maximizar largura",
    "Minimize Width": "Minimizar largura",
    "Notifications": "Notificações",
    "Notification Settings": "Configurações de notificação",
    "Notification Preferences": "Preferências de notificação",
    "Manage your notification preferences.": "Gerencie suas preferências de notificação.",
    "Enable Notifications": "Ativar notificações",
    "Enable Notifications for Agent": "Ativar notificações do agente",
    "Get notified when the agent needs your attention or completes a task.": "Receba notificações quando o agente precisar da sua atenção ou concluir uma tarefa.",
    "Show browser notifications when your action is needed or execution finishes.": "Exibe notificações no navegador quando sua ação for necessária ou quando a execução terminar.",
    "Enable Sounds for Agent": "Ativar sons do agente",
    "Play a sound when the agent finishes generating a response.": "Reproduz um som quando o agente termina de gerar uma resposta.",
    "When enabled, Antigravity will play a sound when Agent finishes generating a response.": "Quando ativado, o Antigravity reproduzirá um som ao concluir a geração de uma resposta.",
    "Open System Preferences": "Abrir preferências do sistema",
    "To modify notification settings, open your operating system's system preferences.": "Para modificar as configurações de notificação, abra as preferências do seu sistema operacional.",
    "Models": "Modelos",
    "Models & Usage": "Modelos e uso",
    "Models Tab": "Aba de modelos",
    "Manage your model quota and credits.": "Gerencie sua cota de modelos e créditos.",
    "Model Quota": "Cota de modelos",
    "Model Credits": "Créditos de modelo",
    "Quota": "Cota",
    "Usage": "Uso",
    "Token Usage": "Uso de tokens",
    "Tokens": "Tokens",
    "Refresh quota and credits data": "Atualizar dados de cota e créditos",
    "No quota information available.": "Nenhuma informação de cota disponível.",
    "Baseline model quota reached": "Cota básica do modelo atingida",
    "Model quota reached": "Cota do modelo atingida",
    "Enable AI Credit Overages": "Ativar excedentes de créditos de IA",
    "Enable Overages": "Ativar excedentes",
    "Purchase Credits": "Comprar créditos",
    "Insufficient AI Credits": "Créditos de IA insuficientes",
    "Add Custom Model": "Adicionar modelo personalizado",
    "Add Model": "Adicionar modelo",
    "Edit Custom Model": "Editar modelo personalizado",
    "Edit Model": "Editar modelo",
    "Model Label": "Nome do modelo",
    "Model URL": "URL do modelo",
    "Custom models are only supported on Linux machines.": "Modelos personalizados só são suportados em sistemas Linux.",
    "Agent Behavior": "Comportamento do agente",
    "Agent Settings": "Configurações do agente",
    "Configure agent execution, queued message delivery, and permissions.": "Configure a execução do agente, o envio de mensagens na fila e as permissões.",
    "Configure when follow-up messages are sent.": "Configure quando mensagens de acompanhamento serão enviadas.",
    "Plan Review Policy": "Política de revisão de planos",
    "Artifact Review Policy": "Política de revisão de artefatos",
    "Review Policy": "Política de revisão",
    "Whether the agent asks you to review its documents.": "Define se o agente solicita que você revise seus documentos.",
    "Specifies the agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.": "Especifica o comportamento do agente ao solicitar revisão de artefatos (documentos criados para proporcionar uma experiência de conversa mais rica).",
    "Always Ask": "Sempre perguntar",
    "Ask every time": "Perguntar sempre",
    "Ask first": "Perguntar primeiro",
    "Ask before sensitive operations.": "Perguntar antes de operações sensíveis.",
    "Agent always asks for review.": "O agente sempre solicita revisão.",
    "Always Proceed": "Sempre prosseguir",
    "Always run": "Sempre executar",
    "Agent Decides": "O agente decide",
    "Automatically decide if commands run.": "Decidir automaticamente se os comandos serão executados.",
    "Security agent decides if commands run.": "O agente de segurança decide se os comandos serão executados.",
    "Auto-Open Edited Files": "Abrir arquivos editados automaticamente",
    "Open files in the background if Agent creates or edits them": "Abrir arquivos em segundo plano se o agente criá-los ou editá-los",
    "Open files in the background if the agent creates or edits them": "Abre arquivos em segundo plano se o agente os criar ou editar.",
    "Auto-Expand Changes Overview": "Expandir visão geral de alterações automaticamente",
    "Automatically expand the Changes Overview toolbar when the agent finishes generating a response.": "Expande automaticamente a barra de ferramentas de Visão Geral de Alterações quando o agente termina de gerar uma resposta.",
    "When enabled, the Changes Overview toolbar will automatically expand when Agent finishes generating a response.": "Quando ativado, a barra de resumo de alterações será expandida automaticamente ao final da resposta.",
    "Agent Auto-Fix Lints": "Correção automática de lints pelo agente",
    "Give the agent awareness of lint errors created by its edits so it can fix them without explicit prompting.": "Permite que o agente identifique erros de lint causados por suas edições para corrigi-los automaticamente sem instruções explícitas.",
    "When enabled, Agent is given awareness of lint errors created by its edits and may fix them without explicit user prompting.": "Quando ativado, o agente identifica erros de lint criados por suas edições e pode corrigi-los sem solicitação explícita.",
    "Enable Shell Integration": "Ativar integração com shell",
    "When enabled, Agent will use IDE's shell integration to detect and report terminal command execution.": "Quando ativado, o agente usará a integração de shell para detectar e relatar a execução de comandos no terminal.",
    "Include Jetski Default Customizations": "Incluir personalizações padrão do Jetski",
    "Default Customizations": "Personalizações padrão",
    "Include default customizations, such as default skills.": "Inclui personalizações padrão, como as habilidades padrão.",
    "When enabled, the agent will include default customizations, including default skills.": "Quando ativado, o agente incluirá as personalizações padrão, incluindo as habilidades padrão.",
    "Let the agent access past conversations to inform its responses.": "Permite que o agente consulte conversas anteriores para fundamentar suas respostas.",
    "When enabled, the agent will be able to access past conversations to inform its responses.": "Quando ativado, o agente poderá consultar conversas passadas para aprimorar suas respostas.",
    "Verbose Agent Chat": "Chat detalhado do agente",
    "Display and preserve intermediate thinking steps.": "Exibe e preserva etapas intermediárias de raciocínio (pensamento).",
    "Permissions": "Permissões",
    "Permission Settings": "Configurações de permissão",
    "Global Permissions": "Permissões globais",
    "Local Permissions": "Permissões locais",
    "Tool Permissions": "Permissões de ferramentas",
    "Terminal & Tooling Permissions": "Permissões de terminal e ferramentas",
    "Modify permissions for file, terminal, and MCP tools.": "Modifique permissões para arquivos, terminal e ferramentas MCP.",
    "Configure global allowed and denied resource permissions.": "Configure permissões globais de recursos permitidos e negados.",
    "Configure workspace-specific permissions, resources, and customizations.": "Configure permissões, recursos e personalizações específicas do espaço de trabalho.",
    "Inherits your Global Permissions when working in this project.": "Herda suas Permissões Globais ao trabalhar neste projeto.",
    "Permission Preset": "Predefinição de permissão",
    "Security Preset": "Predefinição de segurança",
    "Agent security mode": "Modo de segurança do agente",
    "Agent Security Settings": "Configurações de segurança do agente",
    "Controls the actions the agent can take.": "Controla as ações que o agente pode realizar.",
    "Manually customize individual settings.": "Personalize manualmente as configurações individuais.",
    "Strict Mode": "Modo estrito (Strict Mode)",
    "Strict": "Estrito",
    "Disabled in strict mode": "Desativado no modo estrito",
    "Agent will always ask to review in strict mode.": "O agente sempre solicitará revisão no modo estrito.",
    "Agent cannot modify files outside of the workspace in strict mode.": "O agente não pode modificar arquivos fora do espaço de trabalho no modo estrito.",
    "Terminal commands always require review and the agent cannot access files outside of its given workspaces.": "Comandos de terminal sempre exigem revisão e o agente não pode acessar arquivos fora dos espaços de trabalho atribuídos.",
    "Terminal Command Auto Execution": "Execução automática de comandos do terminal",
    "Controls whether terminal commands require your approval before running.": "Controla se os comandos do terminal requerem sua aprovação antes de serem executados.",
    "Every command requires approval.": "Todo comando exige aprovação.",
    "Run all commands without restrictions.": "Executar todos os comandos sem restrições.",
    "Run terminal commands with sandbox restrictions.": "Executa comandos de terminal com restrições de sandbox.",
    "Enable Terminal Sandbox": "Ativar sandbox no terminal",
    "Enable Sandbox Mode": "Ativar modo sandbox",
    "Enable Sandbox Mode (Preview)": "Ativar modo sandbox (Prévia)",
    "Sandboxed": "Em sandbox",
    "Restricts agent tools to a secure, isolated local sandbox.": "Restringe as ferramentas do agente a uma sandbox local segura e isolada.",
    "Agents run in a secure sandbox that restricts access to external resources outside of your trusted folders.": "Os agentes rodam em um sandbox seguro que restringe o acesso a recursos externos fora das suas pastas confiáveis.",
    "Agents have full access to your machine and external resources.": "Os agentes têm acesso total à sua máquina e aos recursos externos.",
    "Sandbox Allow Network": "Permitir rede na sandbox",
    "Allow sandboxed commands to make network requests.": "Permite que comandos executados na sandbox façam requisições de rede.",
    "When enabled, sandboxed commands are allowed to make network requests.": "Quando ativado, comandos em sandbox podem fazer requisições de rede.",
    "Commands Outside Sandbox": "Comandos fora da sandbox",
    "Configure allowed commands outside the sandbox.": "Configure os comandos permitidos fora da sandbox.",
    "Allow/deny agent command execution outside the sandbox.": "Permitir/negar execução de comandos do agente fora da sandbox.",
    "Commands the agent can run outside the sandbox.": "Comandos que o agente pode executar fora do sandbox.",
    "Commands the agent can run outside the sandbox in this workspace.": "Comandos que o agente pode executar fora da sandbox neste espaço de trabalho.",
    "Terminal Commands": "Comandos de terminal",
    "Allow List Terminal Commands": "Lista de permissão de comandos de terminal",
    "Deny List Terminal Commands": "Lista de negação de comandos de terminal",
    "Configure allowed terminal commands.": "Configure os comandos de terminal permitidos.",
    "Allow/deny specific terminal commands.": "Permitir/negar comandos de terminal específicos.",
    "Terminal commands the agent can execute.": "Comandos de terminal que o agente pode executar.",
    "Terminal commands the agent can execute in this workspace.": "Comandos de terminal que o agente pode executar neste espaço de trabalho.",
    "The agent auto-executes commands matched by an allow list entry.": "O agente executa automaticamente comandos presentes na lista de permissões.",
    "The agent asks for permission before executing commands matched by a deny list entry.": "O agente solicita permissão antes de executar comandos presentes na lista de bloqueio.",
    "Command Setup Script": "Script de configuração de comandos",
    "A shell setup script run before every command the agent executes.": "Um script de shell executado antes de cada comando rodado pelo agente.",
    "A shell setup script run before every command the agent executes in this project. Overrides the global script.": "Um script de configuração de shell executado antes de cada comando que o agente executa neste projeto. Substitui o script global.",
    "File Permissions": "Permissões de arquivos",
    "File Access": "Acesso a arquivos",
    "File access": "Acesso a arquivos",
    "File Access Rules": "Regras de acesso a arquivos",
    "Workspace File Access": "Acesso a arquivos do espaço de trabalho",
    "Agent Non-Workspace File Access": "Acesso a arquivos fora do espaço de trabalho",
    "Outside of folders file access policy": "Política de acesso a arquivos fora das pastas",
    "Allows the agent to access files outside of your current workspace.": "Permite que o agente acesse arquivos fora do seu espaço de trabalho atual.",
    "Configures how the agent tries to access files outside of its working folders.": "Configura como o agente tenta acessar arquivos fora de suas pastas de trabalho.",
    "Configure allowed and denied paths for file reads and writes.": "Configure caminhos permitidos e negados para leitura e gravação de arquivos.",
    "File Reads": "Leituras de arquivos",
    "Read Files": "Ler arquivos",
    "Allow/deny agent read access to specific files or directories.": "Permitir/negar acesso de leitura do agente a arquivos ou diretórios específicos.",
    "Paths the agent can read.": "Caminhos que o agente pode ler.",
    "Paths the agent can read inside this workspace.": "Caminhos que o agente pode ler dentro deste espaço de trabalho.",
    "File Writes": "Gravações de arquivos",
    "Write Files": "Gravar arquivos",
    "Allow/deny agent write access to specific files or directories.": "Permitir/negar acesso de gravação do agente a arquivos ou diretórios específicos.",
    "Paths the agent can modify.": "Caminhos que o agente pode modificar.",
    "Paths the agent can modify inside this workspace.": "Caminhos que o agente pode modificar dentro deste espaço de trabalho.",
    "Network Permissions": "Permissões de rede",
    "Network Access Rules": "Regras de acesso à rede",
    "Workspace Web Access": "Acesso web do espaço de trabalho",
    "Read URLs": "Ler URLs",
    "Read URL": "Ler URL",
    "Execute URLs": "Executar em URLs",
    "Configure allowed and denied URLs for reading.": "Configure URLs permitidas e negadas para leitura.",
    "Allow/deny agent read access to specific URLs or domains.": "Permitir/negar acesso de leitura do agente a URLs ou domínios específicos.",
    "URLs the agent can read or open in the browser.": "URLs que o agente pode ler ou abrir no navegador.",
    "URLs the agent can read or open in this workspace.": "URLs que o agente pode ler ou abrir neste espaço de trabalho.",
    "Browser Actuation Permissions": "Permissões de interação no navegador",
    "Browser Actuation Rules": "Regras de atuação no navegador",
    "Configure allowed and denied URLs for browser actuation.": "Configure URLs permitidas e negadas para atuação no navegador.",
    "Allow/deny agent browser actuation access to specific URLs.": "Permitir/negar acesso de interação do navegador do agente a URLs específicas.",
    "URLs the agent can actuate on using the browser.": "URLs nas quais o agente pode interagir usando o navegador.",
    "URLs the agent can actuate on in this workspace.": "URLs em que o agente pode interagir neste espaço de trabalho.",
    "Enable Browser Tools": "Ativar ferramentas de navegador",
    "Browser Javascript Execution Policy": "Política de execução de Javascript no navegador",
    "Controls whether the agent can run custom JavaScript to automate complex browser actions.": "Controla se o agente pode executar JavaScript personalizado para automatizar ações complexas no navegador.",
    "Chrome Binary Path": "Caminho do binário do Chrome",
    "Absolute path to the Chrome/Chromium executable": "Caminho absoluto para o executável do Chrome/Chromium",
    "Path to the Chrome/Chromium executable. Leave empty for auto-detection.": "Caminho para o executável do Chrome/Chromium. Deixe em branco para detecção automática.",
    "Browser User Profile Path": "Caminho do perfil de usuário do navegador",
    "Custom path for the browser user profile directory. Leave empty for default (~/.gemini/antigravity-browser-profile).": "Caminho personalizado para o diretório de perfil do navegador. Deixe em branco para o padrão (~/.gemini/antigravity-browser-profile).",
    "Browser CDP Port": "Porta CDP do navegador",
    "Port number for Chrome DevTools Protocol remote debugging. Leave empty for default (9222).": "Número da porta para depuração remota via Chrome DevTools Protocol. Deixe em branco para o padrão (9222).",
    "GitHub Permissions": "Permissões do GitHub",
    "GitHub Policies": "Políticas do GitHub",
    "Configure GitHub access policies.": "Configure políticas de acesso ao GitHub.",
    "Manage fine-grained permissions for GitHub.": "Gerencie permissões detalhadas para o GitHub.",
    "Enable fine-grained GitHub permissions and define the org, repository, and resource-level access the agent is allowed to use.": "Ative permissões detalhadas do GitHub e defina o acesso em nível de organização, repositório e recurso.",
    "GitHub Personal Access Token": "Token de acesso pessoal do GitHub",
    "Organizations": "Organizações",
    "Repositories": "Repositórios",
    "Pull requests": "Pull requests",
    "Pull request creation": "Criação de pull requests",
    "Issues": "Issues",
    "Issue creation": "Criação de issues",
    "Workflow runs": "Execuções de workflow",
    "Workflow files": "Arquivos de workflow",
    "Workflow refs": "Referências de workflow",
    "Application": "Aplicativo",
    "App": "Aplicativo",
    "App version": "Versão do aplicativo",
    "Prevent Sleep": "Impedir suspensão do sistema",
    "Prevent the computer from sleeping while the app is running.": "Impede o computador de entrar em suspensão enquanto o aplicativo estiver em execução.",
    "Keep In Menu Bar": "Manter na bandeja do sistema",
    "Keep the app accessible from the menu bar and running in the background when all windows are closed.": "Mantém o aplicativo acessível a partir da bandeja do sistema e em execução em segundo plano quando todas as janelas forem fechadas.",
    "Automatic Check for Updates": "Verificação automática de atualizações",
    "Automatically prompt you to restart the app when a new update is available. When disabled, you can check for updates manually from the app menu.": "Avisa automaticamente para reiniciar o aplicativo quando houver uma nova atualização disponível. Quando desativado, você pode verificar atualizações manualmente pelo menu do aplicativo.",
    "Check for Updates": "Verificar atualizações",
    "Update Available": "Atualização disponível",
    "A new version is available.": "Uma nova versão está disponível.",
    "Downloading Update": "Baixando atualização",
    "Install Update": "Instalar atualização",
    "Installing Update": "Instalando atualização",
    "Restart to Update": "Reiniciar para atualizar",
    "Editor": "Editor",
    "Editor Settings": "Configurações do editor",
    "Open Editor Settings": "Abrir configurações do editor",
    "Configure editor-specific behaviors and shortcuts.": "Configure comportamentos e atalhos específicos do editor.",
    "To modify editor settings, open Settings within the editor window.": "Para modificar as configurações do editor, abra Configurações dentro da janela do editor.",
    "Tab": "Tab",
    "Configure tab completion, suggestions, and navigation behavior.": "Configure o preenchimento com Tab, sugestões e comportamento de navegação.",
    "Tab Speed": "Velocidade do Tab",
    "Set the speed of tab suggestions": "Define a velocidade das sugestões por Tab.",
    "Tab to Jump": "Tab para saltar",
    "Predict the location of your next edit and navigate you there with a tab keypress.": "Prevê o local da sua próxima edição e navega até lá com um toque na tecla Tab.",
    "Tab to Import": "Tab para importar",
    "Quickly add and update imports with a tab keypress.": "Adiciona e atualiza importações rapidamente com um toque na tecla Tab.",
    "Highlight After Accept": "Destacar após aceitar",
    "Highlight newly inserted text after accepting a Tab completion.": "Destaca o texto recém-inserido após aceitar um preenchimento por Tab.",
    "Tab Gitignore Access": "Acesso do Tab ao .gitignore",
    "Suggestions": "Sugestões",
    "Suggestions in Editor": "Sugestões no editor",
    "Show suggestions when typing in the editor": "Exibe sugestões ao digitar no editor.",
    "Shortcuts": "Atalhos",
    "Keyboard shortcuts": "Atalhos de teclado",
    "Open Keyboard Shortcuts": "Abrir atalhos do teclado",
    "Keyboard shortcuts for quick navigation and control.": "Atalhos de teclado para navegação e controle rápidos.",
    "Remote Control": "Controle Remoto",
    "Enable Remote Control": "Ativar Controle Remoto",
    "Work with local agents from another device.": "Trabalhe com agentes locais a partir de outro dispositivo.",
    "Continue your work from another device with Remote Control. Scan the QR code or open the link below.": "Continue seu trabalho de outro dispositivo com o Controle Remoto. Escaneie o QR code ou abra o link abaixo.",
    "Device Name": "Nome do dispositivo",
    "Nickname": "Identificador (Nickname)",
    "A label for this computer when you connect from another device. Changing it reconnects.": "Um nome para identificar este computador ao conectar de outro dispositivo.",
    "A nickname for identifying this application in the companion website. Changing this will restart the connection.": "Um identificador para esta instância no site complementar. Alterar esta opção reiniciará a conexão.",
    "Advanced": "Avançado",
    "Advanced Settings": "Configurações avançadas",
    "Developer": "Desenvolvedor",
    "Developer-only tools. These settings are stored locally in this browser and do not affect other users.": "Ferramentas exclusivas para desenvolvedores. Estas configurações são salvas localmente neste navegador e não afetam outros usuários.",
    "Telemetry": "Telemetria",
    "Enable Telemetry": "Ativar telemetria",
    "Conversation Telemetry": "Telemetria da conversa",
    "Telemetry is disabled in Settings": "A telemetria está desativada nas Configurações",
    "Account": "Conta",
    "Sign In": "Entrar",
    "Sign in": "Entrar",
    "Sign Out": "Sair",
    "Sign out": "Sair da conta",
    "Signing in...": "Entrando...",
    "Signing Out...": "Saindo...",
    "Not Signed In": "Não conectado",
    "Log in to use the agent": "Faça login para usar o agente",
    "To use the agent, please login": "Para usar o agente, faça login",
    "Provide Feedback": "Enviar feedback",
    "Feedback": "Feedback",
    "Bug Report": "Relatório de bug",
    "Feature Request": "Solicitação de recurso",
    "Thank you! Your feedback has been submitted successfully.": "Obrigado! Seu feedback foi enviado com sucesso.",
    "Thanks for your feedback!": "Obrigado pelo seu feedback!",
    "Enter directory path...": "Digite o caminho do diretório...",
    "Enter file or directory path...": "Digite o caminho do arquivo ou diretório...",
    "Enter command (e.g., git, blaze)...": "Digite o comando (ex.: git, blaze)...",
    "Enter command...": "Digite o comando...",
    "Enter URL pattern...": "Digite o padrão da URL...",
    "Enter a URL (e.g. http://localhost:8080)": "Digite uma URL (ex.: http://localhost:8080)",
    "Enter project name...": "Digite o nome do projeto...",
    "Enter device name...": "Digite o nome do dispositivo...",
    "Enter tool name or server...": "Digite o nome da ferramenta ou servidor...",
    "Type absolute path or navigate folders...": "Digite o caminho absoluto ou navegue pelas pastas...",
    "Open Folder": "Abrir pasta",
    "Open Folder (Interactive)": "Abrir pasta (interativo)",
    "Open File": "Abrir arquivo",
    "Open File Search": "Abrir busca de arquivos",
    "Open Command Palette": "Abrir paleta de comandos",
    "Command Palette": "Paleta de comandos",
    "Find in Conversation": "Buscar na conversa",
    "Find in Pane": "Localizar no painel",
    "Find": "Buscar",
    "Next match": "Próxima ocorrência",
    "Next match (Enter)": "Próxima ocorrência (Enter)",
    "Next Match (Enter)": "Próxima ocorrência (Enter)",
    "Previous match": "Ocorrência anterior",
    "Previous match (Shift+Enter)": "Ocorrência anterior (Shift+Enter)",
    "Previous Match (Shift+Enter)": "Ocorrência anterior (Shift+Enter)",
    "Match case": "Diferenciar maiúsculas/minúsculas",
    "Match Case (Aa)": "Diferenciar maiúsculas/minúsculas (Aa)",
    "Match whole word": "Palavra inteira",
    "Match Whole Word (ab)": "Palavra inteira (ab)",
    "Use regular expression": "Usar expressão regular",
    "Use Regular Expression (.*)": "Usar expressão regular (.*)",
    "Split": "Dividir",
    "Split Right": "Dividir à direita",
    "Split Down": "Dividir abaixo",
    "Split Conversation Horizontally": "Dividir conversa horizontalmente",
    "Split Conversation Vertically": "Dividir conversa verticalmente",
    "Equalize Split Panes": "Igualar painéis divididos",
    "Remove From Split": "Remover da divisão",
    "Remove from Split": "Remover da divisão",
    "Restart Main Language Server": "Reiniciar servidor de linguagem principal",
    "Workspace Settings": "Configurações do espaço de trabalho",
    "Execution": "Execução",
    "Chat Settings": "Configurações de chat",
    "Context Menus": "Menus de contexto",
    "Navigation": "Navegação",
    "Context": "Contexto",
    "Updater": "Atualizador",
    "Selection Actions": "Ações de seleção",
    "UI Actions": "Ações de interface",
    "Workspace Command Access": "Acesso a comandos do espaço de trabalho",
    "Layout Controls": "Controles de layout",
    "Controls whether terminal commands require your approval before running.\n\nNote: A change to this setting will only apply to new messages sent to the agent. In-progress responses will use the previous setting value.": "Controla se comandos de terminal exigem sua aprovação antes de serem executados.\n\nNota: alterações nesta configuração só se aplicarão a novas mensagens enviadas ao agente. Respostas em andamento usarão o valor anterior.",
    "Auto": "Automático",
    "The agent never asks for confirmation before executing terminal commands (except those in the Deny list). This provides the agent with the maximum ability to operate over long periods without intervention, but also has the highest risk of the agent executing an unsafe terminal command.": "O agente nunca solicita confirmação antes de executar comandos no terminal (exceto os que constam na lista de negações). Isso garante a máxima capacidade de operação autônoma sem intervenção, mas apresenta o maior risco de execução de comandos não seguros.",
    "Terminal commands automatically proceed inside the sandbox. A command that needs to leave the sandbox proceeds only if an agent judges it reversible, and otherwise requests review.": "Comandos de terminal prosseguem automaticamente dentro da sandbox. Um comando que precise sair da sandbox só prossegue se o agente julgá-lo reversível; caso contrário, solicita revisão.",
    "The agent always asks for confirmation before executing terminal commands (except those in the Allow list).": "O agente sempre solicita confirmação antes de executar comandos no terminal (exceto aqueles que constam na lista de permissões).",
    "Terminal command automatically proceeds if the command runs inside the sandbox. Otherwise, it requests review.": "O comando de terminal prossegue automaticamente se executado dentro da sandbox. Caso contrário, solicita revisão.",
    "The agent never asks for review. This maximizes the autonomy of the agent, but also has the highest risk of the agent operating over unsafe or injected artifact content.": "O agente nunca solicita revisão. Isso maximiza a autonomia do agente, mas traz maior risco de operar sobre conteúdos não seguros ou injetados no artefato.",
    "The agent always asks for review.": "O agente sempre solicita revisão.",
    "Agent never asks for review. This maximizes the autonomy of the Agent, but also has the highest risk of the Agent operating over unsafe or injected Artifact content.": "O agente nunca solicita revisão. Isso maximiza a autonomia do agente, mas traz maior risco de operar sobre conteúdos não seguros ou injetados no artefato.",
    "The agent auto-executes commands matched by an allow list entry. For Unix shells, an allow list entry matches a command if its space-separated tokens form a prefix of the command's tokens. For PowerShell, the entry tokens may match any contiguous subsequence of the command tokens.": "O agente executa automaticamente comandos que correspondem a uma entrada da lista de permissões. Para shells Unix, uma entrada corresponde se seus tokens separados por espaços formarem um prefixo dos tokens do comando. Para PowerShell, os tokens podem corresponder a qualquer subsequência contígua dos tokens do comando.",
    "The agent asks for permission before executing commands matched by a deny list entry. The deny list follows the same matching rules as the allow list and takes precedence over the allow list.": "O agente solicita permissão antes de executar comandos correspondentes a uma entrada da lista de negações. A lista de negações segue as mesmas regras da lista de permissões e tem precedência sobre ela.",
    "Send Immediately": "Enviar imediatamente",
    "Queue": "Colocar na fila",
    "Interrupt the agent and send immediately.": "Interrompe o agente e envia imediatamente.",
    "Queue until after the current turn.": "Coloca na fila até a conclusão do turno atual.",
    "Confirm Window Reload": "Confirmar recarga de janela",
    "Toggle if a confirmation is shown when using the \"Reload Window\" button.": "Define se uma confirmação deve ser exibida ao usar o botão \"Recarregar janela\".",
    "Enable Demo Mode (Beta)": "Ativar modo de demonstração (Beta)",
    "Slightly modify your UI to ensure more consistent demos. This is only recommended for demo purposes. In most cases, you can run \"Antigravity: Start Demo Mode\" and \"Antigravity: Stop Demo Mode\" to control this switch and update your ~/.gemini/antigravity data directory.": "Modifica ligeiramente a interface para garantir demonstrações mais consistentes. Recomendado exclusivamente para demonstrações. Na maioria dos casos, execute \"Antigravity: Start Demo Mode\" e \"Antigravity: Stop Demo Mode\" para alternar essa opção e atualizar ~/.gemini/antigravity.",
    "Continue \"Explain and Fix\" actions in the current conversation instead of starting a new one.": "Continua ações de \"Explicar e corrigir\" na conversa atual em vez de iniciar uma nova conversa.",
    "Enforce settings that prevent the agent from autonomously running targeted exploits and require human review for all agent actions. Visit antigravity.google/docs/strict-mode for details.": "Aplica configurações que impedem o agente de executar ações de risco autonomamente e exige revisão humana para todas as ações do agente. Acesse antigravity.google/docs/strict-mode para mais detalhes.",
    "Allow the agent to automatically view and edit files outside the current workspace. Use with caution: this gives the agent access to additional potentially-relevant information, but also allows the agent to access credential files, secrets, and other files outside of the workspace that could be targeted in prompt injection attacks or other exploits by malicious actors.": "Permite que o agente visualize e edite automaticamente arquivos fora do espaço de trabalho atual. Use com cautela: isso fornece ao agente acesso a informações adicionais relevantes, mas também permite acessar arquivos de credenciais, segredos e outros arquivos fora do espaço de trabalho que poderiam ser visados em ataques maliciosos ou injeções de prompt.",
    "example:\nsource ~/.jetski_shell_setup": "exemplo:\nsource ~/.jetski_shell_setup",
    "Use the IDE's shell integration to detect and report terminal command execution. When disabled, the agent uses its own shell. Restart the application for this to take effect.": "Usa a integração de shell da IDE para detectar e relatar a execução de comandos. Quando desativado, o agente usa seu próprio shell. Reinicie o aplicativo para que isso tenha efeito.",
    "Agent Host Address": "Endereço do host do agente",
    "When running commands, the agent will try to use this address, and fall back to the \"connector.host.featureDefault\" host if not defined.\n\nNote: hosts set here with auto-run enabled will have internet access restricted soon.": "Ao executar comandos, o agente tentará usar este endereço, recorrendo ao host \"connector.host.featureDefault\" se não estiver definido.\n\nNota: hosts definidos aqui com execução automática ativada terão acesso à internet restrito em breve.",
    "[Dev] GCP Project ID": "[Dev] ID do projeto GCP",
    "GCP Project ID for enterprise features.": "ID do projeto GCP para recursos corporativos.",
    "Open Agent on Reload": "Abrir agente ao recarregar",
    "Open the agent panel on window reload": "Abre o painel do agente ao recarregar a janela.",
    "Custom Context Menus": "Menus de contexto personalizados",
    "Replace the default browser right-click menu with quick actions.": "Substitui o menu padrão de clique com o botão direito por ações rápidas.",
    "Narrow": "Estreito",
    "Fill": "Preencher",
    "Default": "Padrão",
    "Slow": "Lento",
    "Allow Tab to view and edit the files in .gitignore. Use with caution if your .gitignore lists files containing credentials, secrets, or other sensitive information.": "Permite que o recurso Tab visualize e edite arquivos listados no .gitignore. Use com cautela caso contenha arquivos com credenciais, segredos ou outras informações confidenciais.",
    "Let the agent use browser tools to open URLs, read web pages, and interact with browser content. This gives the agent access to important (and often critical) knowledge and methods of validation, but any browser integration does increase exposure to external malicious parties for security exploits.": "Permite que o agente use ferramentas de navegador para abrir URLs, ler páginas da web e interagir com seu conteúdo. Isso concede acesso a métodos vitais de conhecimento e validação, mas qualquer integração com o navegador aumenta a exposição a possíveis explorações externas por invasores.",
    "Block all browser JavaScript execution.": "Bloqueia qualquer execução de JavaScript no navegador.",
    "Prompt for approval before running browser scripts.": "Solicita aprovação antes de executar scripts no navegador.",
    "Allow full browser script execution without prompting.": "Permite a execução completa de scripts no navegador sem solicitar confirmação.",
    "Show Selection Actions": "Mostrar ações de seleção",
    "Show \"Edit\" and \"Chat\" buttons when selecting text in the editor.": "Exibe os botões \"Editar\" e \"Chat\" ao selecionar texto no editor.",
    "Marketplace Item URL": "URL do item do Marketplace",
    "Marketplace Gallery URL": "URL da galeria do Marketplace",
    "Skills Configuration Error:": "Erro de configuração de habilidades:",
    "Manage your conversations from the companion website.": "Gerencie suas conversas a partir do site complementar.",
    "You cannot sign out from Remote Control. Please sign out on your local application.": "Não é possível sair pelo Controle Remoto. Saia pelo seu aplicativo local.",
    "Inline Actions": "Ações integradas (Inline Actions)",
    "Show a floating notification card when background conversations need your input. Answer questions, approve commands, and grant permissions without leaving your current conversation. Share feedback at go/inline-actions-feedback.": "Exibe um cartão de notificação flutuante quando conversas em segundo plano precisarem da sua intervenção. Responda perguntas, aprove comandos e conceda permissões sem sair da conversa atual. Envie feedback em go/inline-actions-feedback.",
    "Default Workspace VCS": "VCS padrão do espaço de trabalho",
    "VCS used when creating a new workspace, including workspaces generated based off your initial prompt.": "Sistema de controle de versão (VCS) usado ao criar um novo espaço de trabalho, inclusive os gerados a partir do seu comando inicial.",
    "Default Cog Repository": "Repositório Cog padrão",
    "Git-on-Borg repository used when creating a new Cog workspace from your initial prompt (e.g., chromium/src or android/platform/superproject).": "Repositório Git-on-Borg usado ao criar um novo espaço de trabalho Cog a partir do seu comando inicial (ex.: chromium/src ou android/platform/superproject).",
    "Default Cog Branch / Ref": "Branch / Ref Cog padrão",
    "Optional branch or ref used when creating a new Cog workspace (defaults to main if unset).": "Branch ou ref opcional usado ao criar um novo espaço de trabalho Cog (o padrão é main se não for especificado).",
    "Use full VCS clones for Best of N": "Usar clones completos de VCS para Best of N",
    "Give each Best of N fork a full clone of your workspace, including its local commit history. Choosing a winner then gives your workspace that fork's state, so the commits it made are kept. Forks take longer to create than the default CitC clone. See go/jetski-best-of-n.": "Fornece a cada ramificação do Best of N um clone completo do seu espaço de trabalho, incluindo o histórico de commits locais. Escolher uma solução vencedora atribui ao seu espaço de trabalho o estado daquela ramificação, preservando os commits efetuados. A criação das ramificações leva mais tempo do que o clone padrão do CitC. Consulte go/jetski-best-of-n.",
    "Use full Git clones for Best of N": "Usar clones completos do Git para Best of N",
    "Marketing Emails": "E-mails de marketing",
    "Your Plan: ": "Seu plano: ",
    "Authenticated via Enterprise Gateway": "Autenticado via Enterprise Gateway",
    "Project ID: ": "ID do projeto: ",
    "Project Required": "Projeto necessário",
    "License Required": "Licença necessária",
    "A Google Cloud project is required to use Antigravity.": "Um projeto do Google Cloud é obrigatório para usar o Antigravity.",
    "A license or project selection is required to use Antigravity.": "Uma licença ou seleção de projeto é necessária para usar o Antigravity.",
    "Select Project": "Selecionar projeto",
    "Manage License": "Gerenciar licença",
    "Managed by Enterprise Gateway": "Gerenciado por Enterprise Gateway",
    "By using this app, you agree to its": "Ao usar este aplicativo, você concorda com os seus",
    "Terms of Service": "Termos de Serviço",
    "Auth and Billing": "Autenticação e faturamento",
    "Remote Control Issue": "Problema no Controle Remoto",
    "General Feedback": "Feedback geral",
    "Feedback Type": "Tipo de feedback",
    "Description": "Descrição",
    "Steps to Reproduce": "Passos para reproduzir",
    "Please list the steps to reproduce the issue": "Liste os passos para reproduzir o problema",
    "Describe the bug you encountered...": "Descreva o bug encontrado...",
    "Describe the feature you would like to see...": "Descreva o recurso que você gostaria de ver...",
    "Describe your auth or billing issue...": "Descreva seu problema de autenticação ou faturamento...",
    "Describe your Remote Control issue...": "Descreva seu problema no Controle Remoto...",
    "Enter your feedback here...": "Digite seu feedback aqui...",
    "Steps to reproduce the issue": "Passos para reproduzir o problema",
    "Expected behavior": "Comportamento esperado",
    "Actual behavior": "Comportamento real",
    "Any error messages": "Mensagens de erro recebidas",
    "Any relevant information": "Qualquer informação relevante",
    "What is missing in your workflow": "O que está faltando em seu fluxo de trabalho",
    "What you would like to see to address this gap in your workflow": "O que você gostaria de ver para solucionar essa lacuna em seu fluxo de trabalho",
    "How this feature would help you and other users": "Como esse recurso ajudaria você e outros usuários",
    "What quota or feature is being incorrectly limited": "Qual cota ou recurso está sendo limitado incorretamente",
    "What functionality you expect your account tier to have available that is missing": "Qual funcionalidade você espera que o nível da sua conta tenha disponível e que está ausente",
    "Any error messages seen when trying to log in": "Quaisquer mensagens de erro exibidas ao tentar fazer login",
    "Whether it never connects or is intermittent/flaky": "Se nunca se conecta ou se a conexão é intermitente/instável",
    "Did restarting the desktop app help?": "Reiniciar o aplicativo para desktop ajudou?",
    "For any feedback that does not fit into the above categories.": "Para qualquer feedback que não se enquadre nas categorias acima.",
    "Screenshot must be under 10 MB": "A captura de tela deve ter menos de 10 MB",
    "Attach a screenshot (optional)": "Anexar captura de tela (opcional)",
    "Attach Antigravity server logs": "Anexar logs do servidor Antigravity",
    "Attaching logs requires an email address": "Anexar logs requer um endereço de e-mail",
    "An error occurred while submitting your feedback. Please try again.": "Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.",
    "e.g., curl": "ex.: curl",
    "MCP Tools": "Ferramentas MCP",
    "External tools the agent can call via Model Context Protocol.": "Ferramentas externas que o agente pode chamar via Model Context Protocol.",
    "Loading token usage...": "Carregando uso de tokens...",
    "No token data available.": "Nenhum dado de token disponível.",
    "Loading workspace customizations...": "Carregando personalizações do espaço de trabalho...",
    "Other Customizations": "Outras personalizações",
    "Context usage": "Uso de contexto",
    "allow": "Permitir",
    "ask": "Perguntar",
    "deny": "Negar",
    "Enter target...": "Digite o destino...",
    "Available AI Credits: ": "Créditos de IA disponíveis: ",
    "See Activity": "Ver atividade",
    "Get More AI Credits": "Obter mais créditos de IA",
    "For Antigravity Business consumption options, see": "Para opções de consumo do Antigravity Business, consulte",
    "documentation": "documentação",
    "Loading models...": "Carregando modelos...",
    "Best of N Models": "Modelos Best of N",
    "Your quota for this model is running low.": "Sua cota para este modelo está acabando.",
    "Simplified": "Simplificado",
    "Simplified interface without developer tooling.": "Interface simplificada sem ferramentas de desenvolvedor.",
    "Previous Pane Tab": "Aba anterior do painel",
    "Next Pane Tab": "Próxima aba do painel",
    "Configure a chat bot so you can use Jetski directly from Google Chat.": "Configure um bot de chat para que você possa usar o Jetski diretamente do Google Chat.",
    "Jetski Chat configuration is not available in the current environment.": "A configuração do Jetski Chat não está disponível no ambiente atual.",
    "Google3 chats will be regrouped into their workspaces in the sidebar.": "Os chats do Google3 serão reagrupados nos seus respectivos espaços de trabalho na barra lateral.",
    "This migration may mess up your settings, chats, and sidebar.": "Esta migração pode desorganizar suas configurações, conversas e a barra lateral.",
    "Follow the guide at": "Siga o guia em",
    "to back up your data and run the migration.": "para fazer backup de seus dados e executar a migração.",
    "For help, visit": "Para obter ajuda, acesse",
    "or join the": "ou participe do",
    "chat space": "espaço de chat",
    "Turn on a flag you don't have": "Ative uma flag que você não possui",
    "Custom flag to turn on": "Flag personalizada para ativar",
    "Custom Flags": "Flags personalizadas",
    "forced on": "forçado ligado",
    "forced off": "forçado desligado",
    "Search flags": "Pesquisar flags",
    "No matching flags": "Nenhuma flag correspondente",
    "This client was started with no custom flags.": "Este cliente foi iniciado sem flags personalizadas.",
    "Model": "Modelo",
    "Leaving Soon": "Saindo em breve",
    "Notice": "Aviso",
    "View Usage": "Ver uso",
    "Custom Models": "Modelos personalizados",
    "Custom Model": "Modelo personalizado",
    "(Thinking)": "(Raciocínio)",
    "(low thinking)": "(raciocínio baixo)",
    "(medium thinking)": "(raciocínio médio)",
    "(high thinking)": "(raciocínio alto)",
    "(max thinking)": "(raciocínio máximo)",
    "Custom": "Personalizado",
    "Toggle Model Selector": "Alternar seletor de modelos",
    "Toggle Project Selector": "Alternar seletor de projetos",
    "Toggle Environment Selector": "Alternar seletor de ambiente",
    "File Picker": "Seletor de arquivos",
    "Focus Input": "Focar entrada de texto",
    "Code Search": "Pesquisa de código",
    "Select Next Conversation": "Selecionar próxima conversa",
    "Select Previous Conversation": "Selecionar conversa anterior",
    "Refresh gcert Credentials": "Atualizar credenciais gcert",
    "Download Diagnostics": "Baixar diagnósticos",
    "Open in Code Search": "Abrir na pesquisa de código",
    "Regroup Google3 Chats": "Reagrupar chats do Google3",
    "Setup Jetski Chat": "Configurar Jetski Chat",
    "Paste code here": "Cole o código aqui",
    "Complete Setup": "Concluir configuração",
    "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "Descreva o problema em detalhes. Quanto mais acionável for seu feedback, mais rápido nossa equipe poderá atender à sua solicitação. Algumas informações úteis incluem:",
    "Please describe the feature you'd like to see. The more detailed the requirements, the easier it will be for our team to incorporate your ideas. Some helpful information includes:": "Descreva o recurso que você gostaria de ver. Quanto mais detalhados forem os requisitos, mais fácil será para nossa equipe incorporar suas ideias. Algumas informações úteis incluem:",
    "Please describe your auth or billing issue. More details will help our support team resolve your issue quicker. Some helpful information includes:": "Descreva seu problema de autenticação ou faturamento. Mais detalhes ajudarão nossa equipe de suporte a resolver seu problema mais rapidamente. Algumas informações úteis incluem:",
    "Use this form if you cannot connect to Remote Control. If your instance is already connected and you are experiencing issues in the browser, report directly from the Remote Control web page so that relevant logs are included. Some helpful information includes:": "Use este formulário se você não conseguir se conectar ao Controle Remoto. Se a sua instância já estiver conectada e você estiver enfrentando problemas no navegador, informe diretamente da página web do Controle Remoto para incluir os logs relevantes. Algumas informações úteis incluem:",
    "Send feedback as": "Enviar feedback como",
    "Send feedback as ": "Enviar feedback como ",
    "We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback.": "Recomendamos anexar os logs. Eles ajudarão a equipe do Antigravity a analisar e priorizar seu feedback.",
    "to ask for content changes for legal reasons.": "para solicitar alterações de conteúdo por motivos legais.",
    "Legal Help": "Ajuda jurídica",
    "Your Plan:": "Seu plano:",
    "Google AI Pro": "Google AI Pro",
    "Google AI Ultra": "Google AI Ultra",
    "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "Você pode fazer upgrade para um plano Google AI Ultra para obter limites de uso maiores.",
    "Project ID:": "ID do projeto:",
    "Email": "E-mail",
    "Sign in to use Antigravity!": "Faça login para usar o Antigravity!",
    "Sign in to use": "Faça login para usar",
    "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "Quando ativado, o Antigravity usará seus créditos de IA para atender às solicitações de modelos assim que a cota do modelo se esgotar. O Antigravity sempre usará sua cota de modelo primeiro antes de usar créditos de IA.",
    "When toggled on, Antigravity will use your AI credits to fulfill model requests once you've reached your free daily limit.": "Quando ativado, o Antigravity usará seus créditos de IA para atender às solicitações de modelos assim que atingir seu limite diário gratuito.",
    "Weekly Limit Remaining": "Limite semanal restante",
    "Five Hour Limit Remaining": "Limite de 5 horas restante",
    "Claude and GPT models": "Modelos Claude e GPT",
    "Gemini Models": "Modelos Gemini",
    "Shared with:": "Compartilhado com:",
    "Plan": "Plano",
    "Agent settings and permissions for conversations outside of projects.": "Configurações e permissões do agente para conversas fora de projetos.",
    "Connecting to language server...": "Conectando ao servidor de linguagem...",
    "e.g., https://example.com": "ex.: https://exemplo.com",
    "Organization Allowed Domains (Read-Only)": "Domínios permitidos pela organização (somente leitura)",
    "These allowed domain rules are set by your organization's administrator and cannot be removed.": "Estas regras de domínios permitidos são definidas pelo administrador da sua organização e não podem ser removidas.",
    "Allowed Domains": "Domínios permitidos",
    "Also includes": "Também inclui",
    "when working in this project.": "ao trabalhar neste projeto.",
    "Learn more about": "Saiba mais sobre",
    "This project was created for": "Este projeto foi criado para",
    "automation.": "automação.",
    "e.g., /path/to/file": "ex.: /caminho/para/arquivo",
    "e.g., npm test": "ex.: npm test",
    "GitHub": "GitHub",
    "Inherit Global": "Herdar global",
    "Your agent’s ability to execute commands is also controlled by enterprise security policies.": "A capacidade do seu agente de executar comandos também é controlada pelas políticas de segurança corporativas.",
    "Type": "Digite",
    "and select": "e selecione",
    "to have the agent generate a plan.": "para fazer o agente gerar um plano.",
    "Modified in": "Modificado em",
    "managed by your organization": "gerenciado pela sua organização",
    "Disabled by organization policy": "Desativado pela política da organização",
    "The breakdown below shows token usage from customizations like rules, skills, and MCP. If a budget is exceeded, large rules are demoted to path pointers and large customizations are excluded automatically.": "O detalhamento abaixo mostra o uso de tokens por personalizações como regras, habilidades e MCP. Se o limite for excedido, regras grandes são rebaixadas para ponteiros de caminho e personalizações grandes são excluídas automaticamente.",
    "Customization token budget exceeded. Large customizations are excluded from context.": "Limite de tokens para personalizações excedido. Personalizações grandes são excluídas do contexto.",
    "Rules and customization token budgets exceeded. Large rules are demoted to path pointers and large customizations are excluded from context.": "Limites de tokens de regras e personalizações excedidos. Regras grandes são rebaixadas para ponteiros de caminho e personalizações grandes são excluídas do contexto.",
    "Rules token budget exceeded. Large rules are demoted to path pointers.": "Limite de tokens de regras excedido. Regras grandes são rebaixadas para ponteiros de caminho.",
    "MCP Install Error:": "Erro de instalação do MCP:",
    "Search for MCP servers to add to your configuration": "Pesquise servidores MCP para adicionar à sua configuração",
    "Configure hooks that run on agent lifecycle events.": "Configure ganchos executados em eventos do ciclo de vida do agente.",
    "Customize": "Personalizar",
    "Copy Path": "Copiar caminho",
    "Path copied!": "Caminho copiado!",
    "Unnamed rule": "Regra sem nome",
    "Could not determine agent config file path": "Não foi possível determinar o caminho do arquivo de configuração do agente",
    "No workspace window available": "Nenhuma janela do espaço de trabalho disponível",
    "Failed to open agent config file": "Falha ao abrir o arquivo de configuração do agente",
    "Agent data is not available": "Dados do agente não disponíveis",
    "Failed to update agent:": "Falha ao atualizar o agente:",
    "Failed to remove agent:": "Falha ao remover o agente:",
    "Failed to remove plugin:": "Falha ao remover o plugin:",
    "Failed to determine plugin ID": "Falha ao determinar o ID do plugin",
    "jetboxWriteState is not available": "jetboxWriteState não está disponível",
    "Failed to toggle plugin:": "Falha ao alternar o plugin:",
    "Could not determine plugin config file path": "Não foi possível determinar o caminho do arquivo de configuração do plugin",
    "Failed to open plugin config file": "Falha ao abrir o arquivo de configuração do plugin",
    "Failed to load plugins": "Falha ao carregar plugins",
    "Delete agent": "Excluir agente",
    "Delete server": "Excluir servidor",
    "Edit config": "Editar configuração",
    "Edit Config": "Editar configuração",
    "Global": "Global",
    "Configure the browser subagent. It requires": "Configure o subagente de navegador. Ele requer o",
    "The browser subagent can be invoked by typing /browser in the conversation input box.": "O subagente de navegador pode ser acionado digitando /browser na caixa de entrada da conversa.",
    "The browser subagent has been disabled by your administrator. Contact your administrator to enable browser use.": "O subagente de navegador foi desativado pelo seu administrador. Entre em contato com seu administrador para ativar o uso do navegador.",
    "Jetski Chat": "Jetski Chat",
    "Configure um bot de chat para que você possa usar o Jetski diretamente do Google Chat.": "Configure um bot de chat para que você possa usar o Jetski diretamente do Google Chat.",
    "Bot Name": "Nome do bot",
    "Avatar URL": "URL do avatar",
    "Enter bot name (optional)": "Digite o nome do bot (opcional)",
    "Enter avatar URL (optional)": "Digite a URL do avatar (opcional)",
    "Bot name must be between 3 and 24 characters": "O nome do bot deve ter entre 3 e 24 caracteres",
    "Creating Chat Bot": "Criando bot de chat",
    "Creating Cloud Project": "Criando projeto do Cloud",
    "Creating Sidecar": "Criando sidecar",
    "Installing Chat Bot": "Instalando bot de chat",
    "Setup may take over 5 minutes. Please keep this screen open during setup.": "A configuração pode levar mais de 5 minutos. Mantenha esta tela aberta durante o processo.",
    "We opened a popup for you to authorize adding the bot to your chat. Please copy the code from it and paste it below:": "Abrimos uma janela pop-up para você autorizar a adição do bot ao seu chat. Copie o código exibido e cole-o abaixo:",
    "Configurar Jetski Chat": "Configurar Jetski Chat",
    "Manage Antigravity app settings.": "Gerencie as configurações do aplicativo Antigravity.",
    "Version": "Versão",
    "These settings can only be changed on the computer running the app, not from a remote session.": "Essas configurações só podem ser alteradas no computador que está executando o aplicativo, e não a partir de uma sessão remota.",
    "Scan the code to open this device in Remote Control, or": "Escaneie o código para abrir este dispositivo no Controle Remoto, ou",
    "copy link": "copiar link",
    "Show Remote Control QR code": "Mostrar código QR do Controle Remoto",
    "Windows Subsystem for Linux": "Subsistema do Windows para Linux",
    "Run the app against a Linux environment. Connecting relaunches the app into the selected WSL distro.": "Execute o aplicativo em um ambiente Linux. A conexão reinicia o aplicativo na distribuição WSL selecionada.",
    "Connected": "Conectado",
    "Connect": "Conectar",
    "Local Windows environment": "Ambiente Windows local",
    "The app is currently connected to a WSL distro. Reopening locally relaunches it directly on Windows.": "O aplicativo está conectado atualmente a uma distribuição WSL. Reabri-lo localmente o reiniciará diretamente no Windows.",
    "Changes the base URL on each extension page. You must restart Antigravity to use the new marketplace after changing this value.": "Altera o URL base na página de cada extensão. Você deve reiniciar o Antigravity para usar o novo marketplace após alterar este valor.",
    "Changes the base URL for marketplace search results. You must restart Antigravity to use the new marketplace after changing this value.": "Altera o URL base para os resultados de pesquisa do marketplace. Você deve reiniciar o Antigravity para usar o novo marketplace após alterar este valor.",
    "⚠️ Warning: \"Always Proceed\" is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "⚠️ Aviso: \"Sempre prosseguir\" está ativado sem proteção de sandbox. Isso é muito perigoso e não recomendamos fazer isso.",
    "⚠️ Warning: 'Always Proceed' is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "⚠️ Aviso: \"Sempre prosseguir\" está ativado sem proteção de sandbox. Isso é muito perigoso e não recomendamos fazer isso.",
    "Warning: \"Always Proceed\" is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "Aviso: \"Sempre prosseguir\" está ativado sem proteção de sandbox. Isso é muito perigoso e não recomendamos fazer isso.",
    "Warning: 'Always Proceed' is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "Aviso: \"Sempre prosseguir\" está ativado sem proteção de sandbox. Isso é muito perigoso e não recomendamos fazer isso.",
    "Queues after the turn": "Coloca na fila após o turno",
    "Sends immediately": "Envia imediatamente",
    "On empty prompt, sends next in queue": "Em prompt vazio, envia o próximo da fila",
    "Give each Best of N fork its own clone of your Git repository instead of a copy-on-write overlay. Each fork is then a real repository, so commits it makes are kept when you choose it as the winner. Forks take longer to create, and the wait grows with the size of your repository. See go/jetski-best-of-n.": "Concede a cada bifurcação do Best of N seu próprio clone do seu repositório Git em vez de uma sobreposição copy-on-write. Cada bifurcação torna-se então um repositório real, de modo que os commits feitos por ela são mantidos quando você a escolhe como vencedora. As bifurcações demoram mais para serem criadas, e a espera aumenta com o tamanho do repositório. Consulte go/jetski-best-of-n.",
    "Give each Best of N fork a full clone of your workspace, including its local commit history. Choosing a winner then gives your workspace that fork": "Concede a cada bifurcação do Best of N um clone completo do seu espaço de trabalho, incluindo o histórico de commits local. Escolher uma vencedora transfere essa bifurcação para o seu espaço de trabalho.",
    "Active environment: os=": "Ambiente ativo: os=",
    "Feature Environment Override": "Substituição do ambiente de recursos",
    "Override feature environment": "Substituir ambiente de recursos",
    "When enabled, the values below replace the auto-detected OS, host, and user type used for feature gating.": "Quando ativado, os valores abaixo substituem o SO, host e tipo de usuário detectados automaticamente usados para liberação de recursos.",
    "Host Environment": "Ambiente do host",
    "Simulate a different host (Electron, desktop or mobile Web, Extension, remote control, or installed PWA).": "Simule um host diferente (Electron, Web desktop ou mobile, Extensão, controle remoto ou PWA instalado).",
    "User Type": "Tipo de usuário",
    "Simulate a different user cohort (Google, External, Enterprise).": "Simule uma coorte de usuários diferente (Google, Externo, Corporativo).",
    "Operating System": "Sistema operacional",
    "Simulate running on a different OS.": "Simule a execução em um sistema operacional diferente.",
    "Reset overrides": "Redefinir substituições",
    "No custom flag matches your search.": "Nenhuma flag personalizada corresponde à sua pesquisa.",
    "Workspace URI Switcher": "Alternador de URI do espaço de trabalho",
    "Select or enter a workspace URI": "Selecione ou digite uma URI de espaço de trabalho",
    "Workspace URI to switch to": "URI do espaço de trabalho para alternar",
    "Workspace folder suggestions": "Sugestões de pastas de espaço de trabalho",
    "All tools (*)": "Todas as ferramentas (*)",
    "Browser tools (browser_.*)": "Ferramentas de navegador (browser_.*)",
    "Hook will only trigger if the tool name matches run_command or view_file.": "O gancho só será acionado se o nome da ferramenta corresponder a run_command ou view_file.",
    "Hook will only trigger if the tool name matches run_command.": "O gancho só será acionado se o nome da ferramenta corresponder a run_command.",
    "Hook will only trigger if the tool name starts with browser_.": "O gancho só será acionado se o nome da ferramenta começar com browser_.",
    "Hook will trigger if any tool is executed.": "O gancho será acionado se qualquer ferramenta for executada.",
    "Open Agent panel on window reload": "Abrir painel do agente ao recarregar a janela",
    "Open in Remote Control": "Abrir no Controle Remoto",
    "Options": "Opções",
    "Paste auth code": "Colar código de autenticação",
    "Select your license": "Selecione sua licença",
    "Select your project": "Selecione seu projeto",
    "Setup": "Configuração",
    "Labs": "Laboratórios (Labs)",
    "Workspace Creation": "Criação de espaço de trabalho",
    "Try out early-stage features before they ship. These may be changed or removed at any time. These features are experimental, and we make no guarantees about performance or functionality.": "Experimente recursos em estágio inicial antes do lançamento oficial. Eles podem ser alterados ou removidos a qualquer momento. Esses recursos são experimentais e não garantimos estabilidade ou desempenho.",
    "Comprehensive guide and reference for the Antigravity Customization System. Use to explain how customizations work, their loading priority, discovery mechanisms, and to guide the creation of skills, rules, plugins, hooks, and MCP servers.": "Guia abrangente e referência para o Sistema de Personalização do Antigravity. Use para explicar o funcionamento das personalizações, sua prioridade de carregamento, mecanismos de descoberta e orientar a criação de habilidades (skills), regras, plugins, ganchos e servidores MCP.",
    "Provides a comprehensive guide, quick reference, and sitemap for Google Antigravity (AGY), including the Antigravity CLI (agy), Antigravity 2.0, Antigravity IDE, Python SDK, slash commands, keybindings, and customizations (skills, rules, MCP, sidecars). Activate this skill when the user asks questions about how to use, configure, or customize Antigravity, AGY, the agy CLI, the Antigravity IDE, or Antigravity 2.0.": "Fornece um guia abrangente, referência rápida e mapa geral para o Google Antigravity (AGY), incluindo a CLI do Antigravity (agy), Antigravity 2.0, Antigravity IDE, Python SDK, comandos de barra, atalhos de teclado e personalizações (habilidades, regras, MCP, sidecars). Ative esta habilidade quando o usuário fizer perguntas sobre como usar, configurar ou personalizar o Antigravity, AGY, a CLI agy, a IDE Antigravity ou o Antigravity 2.0.",
    "Interactive guide to design and create a scheduled background automation. Use this skill when the user wants to create an automated or recurring scheduled task (e.g. \"summarize my emails every morning\", \"every Monday send me a to-do list\"). Also triggered by the /automation slash command.": "Guia interativo para projetar e criar uma automação agendada em segundo plano. Use esta habilidade quando o usuário quiser criar uma tarefa agendada ou recorrente (ex.: \"resuma meus e-mails todas as manhãs\", \"toda segunda-feira me envie uma lista de tarefas\"). Também acionada pelo comando /automation.",
    "How to render rich interactive HTML widgets inline in the chat or as standalone artifacts. Use this skill when you want to show the user diagrams, data visualizations, interactive controls, educational walkthroughs, or any rich visual content beyond plain text and markdown.": "Como renderizar widgets HTML interativos avançados integrados no chat ou como artefatos independentes. Use esta habilidade quando quiser mostrar ao usuário diagramas, visualizações de dados, controles interativos, tutoriais passo a passo ou qualquer conteúdo visual avançado além de texto simples e markdown.",
    "Automatically migrate legacy workflows to modern skills across global and workspace configurations. Scans for existing workflows, creates target SKILL.md files, and safely archives old workflow files.": "Migra automaticamente fluxos de trabalho legados para habilidades modernas em configurações globais e de espaço de trabalho. Examina fluxos existentes, cria arquivos SKILL.md de destino e arquiva com segurança os arquivos de fluxo antigos.",
    "Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment.": "Diretrizes para interagir com o GitHub e solicitar permissões do usuário quando comandos falharem devido a restrições no ambiente do agente.",
    "How to manage and create plugins — namespaced bundles of skills, agents, rules, MCP servers and hooks that install, enable and disable as a single unit. Use this skill when the user wants to enable, disable, install or uninstall a plugin, when they want to create a new plugin, or when a new customization should be packaged into a plugin rather than left loose. Also triggered by the /plugin slash command. Don't use for the underlying customization system itself — discovery roots, loading priority, or authoring a standalone skill, agent, rule, hook or MCP server outside a plugin; see the customizations guide skill for those.": "Como gerenciar e criar plugins — pacotes com namespace contendo habilidades, agentes, regras, servidores MCP e ganchos instalados, ativados e desativados como uma unidade única. Use esta habilidade quando o usuário quiser ativar, desativar, instalar ou desinstalar um plugin, criar um novo plugin ou empacotar uma nova personalização em vez de deixá-la avulsa. Também acionada pelo comando /plugin. Não use para o sistema de personalização subjacente em si — raízes de descoberta, prioridade de carregamento ou criação de habilidades, agentes, regras, ganchos ou servidores MCP independentes fora de um plugin; consulte o guia de personalizações para esses casos.",
    "Build, package, run, and debug UI extensions for Antigravity: interactive web panels that render in the side pane, served by a Node.js sidecar using the built-in Sidecar SDK.": "Crie, empacote, execute e depure extensões de interface (UI) para o Antigravity: painéis web interativos renderizados no painel lateral, servidos por um sidecar Node.js usando o Sidecar SDK integrado.",
    "Discover UI plugin panels relevant to the current task and surface a one-click pill in chat to open (toggle) them in the side pane. Use when a running UI plugin's panel would help with what the user is doing, or right after the user enables a new UI plugin pane and a shortcut to open it is handy.": "Descubra painéis de plugins de interface relevantes para a tarefa atual e exiba um botão no chat para abri-los/alterná-los no painel lateral com um clique. Use quando o painel de um plugin em execução for útil para o que o usuário está fazendo ou logo após ativar um novo painel de plugin de interface.",
    "In addition to the custom skills folder, Antigravity will search the following paths in order to find skills for the agent.": "Além da pasta de habilidades personalizadas, o Antigravity pesquisará os seguintes caminhos para encontrar habilidades para o agente.",
    "In addition to the custom skills folder, Antigravity will search the following paths in order to find skills for the agent.\n\nFor google3 workspaces, paths are relative to //depot and begins with google3/": "Além da pasta de habilidades personalizadas, o Antigravity pesquisará os seguintes caminhos para encontrar habilidades para o agente.\n\nPara espaços de trabalho do google3, os caminhos são relativos a //depot e começam com google3/",
    "Configure default behaviors, skills, and MCP servers.": "Configure comportamentos padrão, habilidades (skills) e servidores MCP.",
    "Configure external tools via Model Context Protocol.": "Configure ferramentas externas via Model Context Protocol (MCP).",
    "Manage project folders, agent settings, and permissions.": "Gerencie pastas do projeto, configurações do agente e permissões.",
    "Add Folder": "Adicionar pasta",
    "Delete Project": "Excluir projeto",
    "Permanently delete": "Excluir permanentemente",
    "Edit project name": "Editar nome do projeto",
    "Delete project": "Excluir projeto",
    "No folders added yet.": "Nenhuma pasta adicionada ainda.",
    "Google3 Configuration": "Configuração do Google3",
    "Danger Zone": "Zona de perigo",
    "A project with this name already exists.": "Já existe um projeto com este nome.",
    "Duplicate project name": "Nome de projeto duplicado",
    "Failed to delete project:": "Falha ao excluir o projeto:",
    "Failed to save project:": "Falha ao salvar o projeto:",

    # Avisos de Rede, Conexão e Modo Offline
    "No internet. Agent features may not work.": "Sem internet. Os recursos do agente podem não funcionar.",
    "No internet": "Sem internet",
    "No internet.": "Sem internet.",
    "No internet connection": "Sem conexão com a internet",
    "No internet connection.": "Sem conexão com a internet.",
    "Lost connection to the language server. Agent features may not work.": "Conexão perdida com o servidor de linguagem. Os recursos do agente podem não funcionar.",
    "Lost connection to the remote instance. Please wait a minute or refresh the page.": "Conexão perdida com a instância remota. Aguarde um minuto ou recarregue a página.",
    "Connection lost. Reconnecting...": "Conexão perdida. Reconectando...",
    "Connection lost": "Conexão perdida",
    "Connection lost.": "Conexão perdida.",
    "Failed to establish connection.": "Falha ao estabelecer conexão.",
    "Could not reach GitHub to validate the token. Check your connection.": "Não foi possível conectar ao GitHub para validar o token. Verifique sua conexão.",
    "Check your connection": "Verifique sua conexão",
    "Check your connection.": "Verifique sua conexão.",
    "Check your internet connection": "Verifique sua conexão com a internet",
    "Check your internet connection.": "Verifique sua conexão com a internet.",
    "WebSocket connection closed unexpectedly": "Conexão WebSocket encerrada inesperadamente",
    "Unable to close connection because connection does not exist": "Não foi possível encerrar a conexão porque ela não existe",
    "Unable to send message because connection does not exist": "Não foi possível enviar a mensagem porque a conexão não existe",
    "Cannot send, passive connection": "Não é possível enviar: conexão passiva",
    "You are offline": "Você está offline",
    "You are offline.": "Você está offline.",
    "You appear to be offline": "Você parece estar offline",
    "You appear to be offline.": "Você parece estar offline.",
    "Back online": "Novamente online",
    "Back online.": "Novamente online.",
    "Connection restored": "Conexão restaurada",
    "Connection restored.": "Conexão restaurada.",
    "Connecting to language server...": "Conectando ao servidor de linguagem...",
    "Connecting...": "Conectando...",
    "Reconnecting...": "Reconectando...",
    "Disconnected": "Desconectado",
    "Disconnected.": "Desconectado.",
    "Network error": "Erro de rede",
    "Network error.": "Erro de rede.",
    "Connection error": "Erro de conexão",
    "Connection error.": "Erro de conexão.",
    "Status bar item background color when the workbench is offline.": "Cor de fundo do item da barra de status quando a bancada estiver offline.",
    "Status bar item background hover color when the workbench is offline.": "Cor de foco em segundo plano do item da barra de status quando a bancada estiver offline.",
    "Status bar item foreground color when the workbench is offline.": "Cor do primeiro plano do item da barra de status quando a bancada estiver offline.",
    "Status bar item foreground hover color when the workbench is offline.": "Cor do primeiro plano ao passar o cursor no item da barra de status quando a bancada estiver offline.",

    # Servidores MCP - Catálogo e Interface Traduzidos
    "by Google": "pelo Google",
    "by google": "pelo Google",
    "Enter the required configuration values to install this MCP server.": "Insira os valores de configuração necessários para instalar este servidor MCP.",
    "Please fill in all required fields:": "Preencha todos os campos obrigatórios:",
    "Failed to save configuration:": "Falha ao salvar a configuração:",
    "Search for MCP servers to add to your configuration": "Pesquise servidores MCP para adicionar à sua configuração",
    "Loading MCP servers...": "Carregando servidores MCP...",
    "MCP Install Error:": "Erro na instalação do MCP:",
    "Are you sure you want to delete": "Tem certeza de que deseja excluir",
    "? This will remove it from your MCP configuration.": "? Isso o removerá da sua configuração MCP.",
    "No MCP servers found for": "Nenhum servidor MCP encontrado para",
    "Installed MCP Servers": "Servidores MCP instalados",
    "No MCP servers installed": "Nenhum servidor MCP instalado",
    "No MCP servers yet. Use Add to browse the store.": "Nenhum servidor MCP ainda. Use Adicionar para explorar a loja.",
    "Use Add MCP to browse the store, or add a custom server via the MCP config.": "Use Adicionar MCP para navegar pela loja ou adicione um servidor personalizado pelas configurações MCP.",
    "Add MCP Server": "Adicionar servidor MCP",
    "Add MCP Servers": "Adicionar servidores MCP",
    "Delete MCP Server": "Excluir servidor MCP",
    "Configure MCP Server": "Configurar servidor MCP",
    "Search MCP servers by name": "Pesquisar servidores MCP por nome",
    "Refresh MCP servers": "Atualizar servidores MCP",
    "These servers need you to sign in before the agent can use their tools.": "Esses servidores exigem que você faça login antes que o agente possa usar suas ferramentas.",
    "This server needs you to sign in before the agent can use its tools.": "Este servidor exige que você faça login antes que o agente possa usar suas ferramentas.",
    "Unnamed MCP Server": "Servidor MCP sem nome",
    "Unknown Server": "Servidor desconhecido",
    "Your administrator has disabled MCP servers for this workspace.": "O administrador desativou os servidores MCP para este espaço de trabalho.",
    "Installing": "Instalando",
    "Installed": "Instalado",
    "The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the us-central1 region.": "O servidor MCP remoto do Cloud Audit Manager permite registrar projetos, gerar relatórios de auditoria e escopo e verificar o status de registro de recursos na região us-central1.",
    "The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the europe-west1 region.": "O servidor MCP remoto do Cloud Audit Manager permite registrar projetos, gerar relatórios de auditoria e escopo e verificar o status de registro de recursos na região europe-west1.",
    "Investigate and fix software issues using AI-powered root cause analysis. This MCP server connects to your Antimetal account to search issues, read investigative reports with causal graphs, retrieve observability artifacts (logs, traces, metrics), and apply remediations—directly from your AI tools.": "Investigue e corrija problemas de software usando análise de causa raiz com tecnologia de IA. Este servidor MCP se conecta à sua conta do Antimetal para pesquisar problemas, ler relatórios investigativos com gráficos causais, recuperar artefatos de observabilidade (logs, rastreamentos, métricas) e aplicar correções diretamente de suas ferramentas de IA.",
    "Query and act on your marketing, analytics, CRM, e-commerce, and warehouse data across 325+ connectors (Meta Ads, Google Ads, TikTok Ads, GA4, HubSpot, Salesforce, Shopify, Stripe, BigQuery, Snowflake, and more) using natural language. Read live data and write changes back (pause or enable campaigns, set budgets, upload conversions) with no SQL and no custom integrations.": "Consulte e atue sobre seus dados de marketing, análise, CRM, e-commerce e data warehouse em mais de 325 conectores (Meta Ads, Google Ads, TikTok Ads, GA4, HubSpot, Salesforce, Shopify, Stripe, BigQuery, Snowflake e mais) usando linguagem natural. Leia dados em tempo real e grave alterações de volta (pause ou ative campanhas, defina orçamentos, envie conversões) sem SQL e sem integrações personalizadas.",
    "Query your GitLab SDLC as a knowledge graph. Orbit indexes groups, projects, source code, merge requests, pipelines, work items, and security findings into a single graph so agents can answer blast radius, onboarding, and dependency mapping questions by traversing real relationships instead of grepping across separate systems.": "Consulte seu ciclo de vida de desenvolvimento de software (SDLC) do GitLab como um gráfico de conhecimento. O Orbit indexa grupos, projetos, código-fonte, merge requests, pipelines, itens de trabalho e descobertas de segurança em um único grafo para que os agentes possam responder a perguntas sobre raio de impacto, integração e mapeamento de dependências navegando por relacionamentos reais em vez de buscar em sistemas separados.",
    "Enable Antigravity to deploy apps to Google Cloud Run.": "Permite que o Antigravity implante aplicativos no Google Cloud Run.",
    "Ask questions. Get answers.\nThe MCP is a server your coding agent talks to. Ask a question in English. It runs the query against your PostHog data. The answer lands in your editor. No SQL. No dashboards. No tabs full of charts you forgot you opened.\n\nTry things like:\n - \"How many unique users signed up in the last 7 days, broken down by day?\"\n - \"Create an A/B test for our pricing page that measures conversion to checkout.\"\n - \"What are the top 5 errors in my project this week?\"": "Faça perguntas. Obtenha respostas.\nO MCP é um servidor com o qual seu agente de código se comunica. Faça uma pergunta em linguagem natural. Ele executa a consulta em seus dados do PostHog e a resposta chega ao seu editor. Sem SQL, sem dashboards e sem dezenas de abas abertas de gráficos.\n\nExperimente coisas como:\n - \"Quantos usuários únicos se cadastraram nos últimos 7 dias, divididos por dia?\"\n - \"Crie um teste A/B para a nossa página de preços que meça a conversão até o checkout.\"\n - \"Quais são os 5 principais erros do meu projeto nesta semana?\"",
    "Search and reference over 600,000 real-world app screens, user flows, and UI patterns from Mobbin directly within your AI tools.": "Pesquise e consulte mais de 600.000 telas de aplicativos reais, fluxos de usuários e padrões de interface (UI) do Mobbin diretamente dentro de suas ferramentas de IA.",
    "Build, edit, deploy, and manage full-stack web apps with Lovable, the AI-powered app builder, using natural language. This MCP server connects your AI client to Lovable so you can create projects and workspaces, send build instructions to the Lovable agent, inspect generated code via diffs and file trees, read and write project knowledge, manage Postgres databases and connectors, and deploy apps directly from your AI tools.": "Crie, edite, implante e gerencie aplicativos web full-stack com o Lovable, o construtor de aplicativos com IA, usando linguagem natural. Este servidor MCP conecta seu cliente de IA ao Lovable para que você possa criar projetos e espaços de trabalho, enviar instruções de compilação ao agente do Lovable, inspecionar o código gerado por meio de diffs e árvores de arquivos, ler e gravar conhecimento do projeto, gerenciar bancos de dados Postgres e conectores e implantar aplicativos diretamente de suas ferramentas de IA.",
    "Let your agents talk to your Splunk data. Ask what broke, why, and what changed -- in plain English -- and agents search your events, surface the saved searches and lookups that matter, and write the SPL for you.": "Permita que seus agentes conversem com os dados do Splunk. Pergunte o que quebrou, por que e o que mudou — em linguagem simples — e os agentes pesquisarão seus eventos, destacarão as buscas salvas e consultas importantes e escreverão o SPL para você.",
    "The Wiz MCP Server connects multiple security data sources through a central host and server setup. This creates a single, contextual view of your security posture—simplifying investigations and speeding up incident response and remediation.  Wiz MCP also gives users instant access to cloud inventory, configurations, and security issues, all through a single host with just a simple prompt.  By using Wiz MCP, customers can enrich security investigations with precise business context. This allows security teams to prioritize responses based on relevance, drastically improving the accuracy and effectiveness of threat mitigation.": "O servidor Wiz MCP conecta várias fontes de dados de segurança por meio de uma configuração centralizada. Isso cria uma visão contextual unificada da sua postura de segurança — simplificando investigações e acelerando a resposta e correção de incidentes. O Wiz MCP também oferece aos usuários acesso instantâneo ao inventário de nuvem, configurações e problemas de segurança, tudo por meio de um único host com apenas um prompt simples. Ao usar o Wiz MCP, os clientes podem enriquecer investigações com contexto de negócios preciso, permitindo priorizar respostas com base em relevância e melhorando drasticamente a eficácia da mitigação de ameaças.",
    "The GKE remote MCP server provides read write access to your GKE Kubernetes resources. It allows an AI agent to inspect and observe your environment.": "O servidor MCP remoto do GKE fornece acesso de leitura e gravação aos seus recursos do Kubernetes no GKE. Ele permite que um agente de IA inspecione e observe seu ambiente.",
    "The Dart and Flutter MCP server exposes Dart (and Flutter) development tool actions to compatible AI-assistant clients.": "O servidor MCP do Dart e Flutter expõe ações de ferramentas de desenvolvimento Dart (e Flutter) a clientes assistentes de IA compatíveis.",
    "The Firebase Model Context Protocol (MCP) Server gives AI-powered development tools the ability to work with your Firebase projects and your app's codebase.": "O servidor Model Context Protocol (MCP) do Firebase permite que ferramentas de desenvolvimento com IA trabalhem com seus projetos do Firebase e o código-fonte do seu aplicativo.",
    "The Genkit Model Context Protocol (MCP) Server gives AI-powered development tools the ability to build, debug and inspect your Genkit app.": "O servidor Model Context Protocol (MCP) do Genkit permite que ferramentas de desenvolvimento com IA criem, depurem e inspecionem seu aplicativo Genkit.",
    "The gopls Model Context Protocol (MCP) server provides tools for semantic code analysis, live diagnostics, and transformation of your Go codebase.": "O servidor Model Context Protocol (MCP) do gopls fornece ferramentas para análise semântica de código, diagnósticos em tempo real e transformação de seu código em Go.",
    "Interact with your BigQuery data using natural language. This MCP server allows you to securely connect to your datasets to search the datasets, inspect table metadata, execute SQL queries, generate time-series forecasts, and perform contribution analysis directly from your AI tools.": "Interaja com seus dados do BigQuery usando linguagem natural. Este servidor MCP permite conectar com segurança aos seus conjuntos de dados para pesquisá-los, inspecionar metadados de tabelas, executar consultas SQL, gerar previsões de séries temporais e realizar análises de contribuição diretamente de suas ferramentas de IA.",
    "The AlloyDB for PostgreSQL remote MCP server lets you access and run AlloyDB tools to manage AlloyDB clusters and instances, manage users, create and restore backups, administer users, import and export data, and run SQL queries from your AI-enabled development environments and AI agent platforms.": "O servidor MCP remoto do AlloyDB for PostgreSQL permite acessar e executar ferramentas do AlloyDB para gerenciar clusters e instâncias do AlloyDB, gerenciar usuários, criar e restaurar backups, importar e exportar dados e executar consultas SQL a partir de seus ambientes de desenvolvimento e plataformas de agentes de IA.",
    "The Bigtable Admin remote MCP server lets you manage Bigtable resources.": "O servidor MCP remoto do Bigtable Admin permite gerenciar recursos do Bigtable.",
    "Manage Google Cloud resources with gcloud and bq CLI tools in a remote sandbox environment": "Gerencie recursos do Google Cloud com as ferramentas de linha de comando gcloud e bq em um ambiente de sandbox remoto.",
    "The Cloud SQL remote MCP server lets you access and run Cloud SQL tools to manage Cloud SQL instances, manage users, create and restore backups, administer users, import and export data, and run SQL queries from your AI-enabled development environments and AI agent platforms.": "O servidor MCP remoto do Cloud SQL permite acessar e executar ferramentas do Cloud SQL para gerenciar instâncias, usuários, criar e restaurar backups, importar e exportar dados e executar consultas SQL a partir de seus ambientes de desenvolvimento e plataformas de agentes de IA.",
    "The Spanner remote MCP server lets you access and run Spanner tools to create, manage, and query Spanner resources from your AI-enabled development environments and AI agent platforms.": "O servidor MCP remoto do Spanner permite acessar e executar ferramentas do Spanner para criar, gerenciar e consultar recursos do Spanner a partir de seus ambientes de desenvolvimento com IA e plataformas de agentes.",
    "The Apigee API hub remote MCP server lets you manage the APIs, versions, specs, operations, deployments, attributes, external APIs, and dependencies registered in your API hub instance - including creating, reading, updating, and deleting them - and search across resources, using natural language.": "O servidor MCP remoto do Apigee API hub permite gerenciar as APIs, versões, especificações, operações, implantações, atributos, APIs externas e dependências registradas em sua instância do API hub — incluindo criação, leitura, atualização e exclusão — além de pesquisar recursos usando linguagem natural.",
    "Connect your AI assistants to Looker business intelligence. This MCP server enables data exploration and content management by allowing you to execute natural language queries, run saved Looks, create and manage dashboards, and perform instance health checks within your Looker environment.": "Conecte seus assistentes de IA à inteligência de negócios do Looker. Este servidor MCP permite a exploração de dados e o gerenciamento de conteúdo, permitindo executar consultas em linguagem natural, rodar Looks salvos, criar e gerenciar painéis e realizar verificações de integridade da instância no seu ambiente Looker.",
    "Connect your AI assistants to the Knowledge Catalog (formerly known as Dataplex). This MCP server enables data discovery and governance by allowing you to search for data assets, retrieve detailed metadata such as schemas and ownership, and explore aspect types across your distributed data.": "Conecte seus assistentes de IA ao Knowledge Catalog (anteriormente conhecido como Dataplex). Este servidor MCP permite descoberta e governança de dados, possibilitando a busca por ativos de dados, recuperação de metadados detalhados (como esquemas e propriedade) e exploração de aspectos em seus dados distribuídos.",
    "The MCP Toolbox for Databases is an open-source MCP server designed to simplify and secure the development of tools for interacting with databases.": "O MCP Toolbox for Databases é um servidor MCP de código aberto desenvolvido para simplificar e proteger o desenvolvimento de ferramentas de interação com bancos de dados.",
    "Interact with your Oracle Database data using natural language. This MCP server allows you to securely connect to your databases for executing SQL queries, inspecting table schemas, and troubleshooting database performance issues directly from your AI tools.": "Interaja com seus dados do Oracle Database usando linguagem natural. Este servidor MCP permite conectar com segurança aos seus bancos de dados para executar consultas SQL, inspecionar esquemas de tabelas e diagnosticar problemas de desempenho diretamente de suas ferramentas de IA.",
    "The Dev Mode MCP Server brings Figma directly into your workflow by providing important design information and context to AI agents generating code from Figma design files.": "O servidor MCP do Dev Mode integra o Figma diretamente ao seu fluxo de trabalho, fornecendo informações essenciais de design e contexto para agentes de IA que geram código a partir de arquivos de design do Figma.",
    "The GitHub MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with GitHub APIs, enabling advanced automation and interaction capabilities for developers and tools.": "O servidor GitHub MCP é um servidor Model Context Protocol (MCP) que oferece integração perfeita com as APIs do GitHub, permitindo automação avançada e recursos de interação para desenvolvedores e ferramentas.",
    "The Google Home Developer MCP server allows you to search through Google Home documentation, OpenThread and Matter specifications documentation.": "O servidor MCP do Google Home Developer permite pesquisar a documentação do Google Home e as especificações do OpenThread e Matter.",
    "Manage your Neon backend with the Neon MCP Server: Lakebase Postgres, branching, Object Storage, Functions, and the AI Gateway": "Gerencie seu backend no Neon com o Neon MCP Server: Lakebase Postgres, ramificações (branching), armazenamento de objetos, funções e AI Gateway.",
    "The Stripe Model Context Protocol server allows you to integrate with Stripe APIs through function calling. This protocol supports various tools to interact with different Stripe services.": "O servidor Model Context Protocol da Stripe permite a integração com as APIs da Stripe por meio de chamadas de função. Este protocolo suporta várias ferramentas para interagir com diferentes serviços da Stripe.",
    "Interact with Redis key-value stores": "Interaja com armazenamentos de chave-valor do Redis.",
    "A Model Context Protocol server for interacting with MongoDB Atlas.": "Um servidor Model Context Protocol para interagir com o MongoDB Atlas.",
    "Official Notion MCP Server that allows interaction with Notion workspaces, pages, databases, and comments via the Notion API.": "Servidor MCP oficial do Notion que permite interagir com espaços de trabalho, páginas, bancos de dados e comentários do Notion por meio da API do Notion.",
    "Official Linear.app MCP Server for interacting with Linear projects, issues, and workflows.": "Servidor MCP oficial do Linear.app para interagir com projetos, tarefas (issues) e fluxos de trabalho do Linear.",
    "An MCP server implementation that integrates the Perplexity Sonar API to provide real-time, web-wide research capabilities.": "Uma implementação de servidor MCP que integra a API Perplexity Sonar para fornecer recursos de pesquisa em tempo real em toda a web.",
    "Official PayPal MCP Server that allows integration with PayPal APIs for payment processing, transaction management, and account operations.": "Servidor MCP oficial do PayPal que permite integração com as APIs do PayPal para processamento de pagamentos, gerenciamento de transações e operações de conta.",
    "The Heroku Platform MCP Server enables seamless interaction with Heroku Platform resources, allowing LLMs to read, manage, and operate applications, add-ons, databases, and more.": "O servidor MCP da plataforma Heroku permite interação perfeita com os recursos do Heroku, possibilitando que LLMs leiam, gerenciem e operem aplicativos, add-ons, bancos de dados e muito mais.",
    "The Pinecone MCP Server enables AI tools to search Pinecone documentation, configure indexes, generate code informed by your index configuration, and upsert/search data in your Pinecone indexes.": "O servidor MCP do Pinecone permite que ferramentas de IA pesquisem a documentação do Pinecone, configurem índices, gerem código com base na configuração do seu índice e insiram/busquem dados em seus índices do Pinecone.",
    "Connect your Supabase projects to AI assistants. This MCP server allows managing tables, fetching config, executing SQL queries, managing edge functions, and working with database schema in your Supabase projects.": "Conecte seus projetos do Supabase a assistentes de IA. Este servidor MCP permite gerenciar tabelas, buscar configurações, executar consultas SQL, gerenciar edge functions e trabalhar com o esquema de banco de dados em seus projetos do Supabase.",
    "The Prisma MCP Server enables AI tools to interact with Prisma for creating and managing Postgres databases easily.": "O servidor Prisma MCP permite que ferramentas de IA interajam com o Prisma para criar e gerenciar bancos de dados Postgres com facilidade.",
    "The Locofy MCP Server enables Locofy.ai code to be integrated and extended with your IDE.": "O servidor Locofy MCP permite que o código do Locofy.ai seja integrado e estendido diretamente na sua IDE.",
    "Airweave lets agents search any app.": "O Airweave permite que os agentes pesquisem em qualquer aplicativo.",
    "Atlassian MCP Server for interacting with Atlassian products.": "Servidor MCP da Atlassian para interagir com os produtos da Atlassian (Jira, Confluence, etc.).",
    "Interact with your Harness account using natural language. This MCP server lets AI agents inspect and manage CI/CD pipelines, executions, services, environments, connectors, feature flags, cloud costs, security findings, chaos experiments, and other Harness platform resources.": "Interaja com sua conta do Harness usando linguagem natural. Este servidor MCP permite que agentes de IA inspecionem e gerenciem pipelines de CI/CD, execuções, serviços, ambientes, conectores, sinalizadores de recursos (feature flags), custos de nuvem, descobertas de segurança, testes de caos e outros recursos da plataforma Harness.",
    "SonarQube MCP Server enables AI assistants to interact with SonarQube instances for code quality analysis, project management, and quality gate operations.": "O servidor MCP do SonarQube permite que assistentes de IA interajam com instâncias do SonarQube para análise de qualidade de código, gerenciamento de projetos e operações de controle de qualidade (quality gates).",
    "Netlify MCP Server enables AI assistants to interact with Netlify's platform for managing sites, deployments, domains, and other web development workflows.": "O servidor MCP da Netlify permite que assistentes de IA interajam com a plataforma da Netlify para gerenciar sites, implantações, domínios e outros fluxos de desenvolvimento web.",
    "Sequential Thinking": "Pensamento Sequencial",
    "A Model Context Protocol server that provides structured thinking and reasoning capabilities for LLM conversations.": "Um servidor Model Context Protocol que fornece recursos estruturados de pensamento e raciocínio para conversas de LLM.",
    "Sonatype MCP server for interacting with our dependency management and security intelligence platform.": "Servidor MCP da Sonatype para interagir com nossa plataforma de gerenciamento de dependências e inteligência de segurança.",
    "The Google Maps Platform Code Assist MCP server provides your favorite AI coding assistant with up-to-date, official Google Maps Platform documentation, code samples, and best practices. By grounding your AI assistant in our official resources, it can generate more accurate, reliable, and useful code.": "O servidor MCP do Google Maps Platform Code Assist fornece ao seu assistente de IA documentação oficial e atualizada da Google Maps Platform, amostras de código e práticas recomendadas. Ao embasar seu assistente em nossos recursos oficiais, ele gera código mais preciso, confiável e útil.",
    "This MCP server provides your LLM with docs and examples to instrument your AI apps with Arize AX. It also provides access to Arize support. Connect it to your IDE or LLM and get curated tracing examples, best practices and Arize support!": "Este servidor MCP fornece ao seu LLM documentação e exemplos para instrumentar seus aplicativos de IA com o Arize AX, além de acesso ao suporte do Arize. Conecte-o à sua IDE ou LLM para obter exemplos selecionados de rastreamento, práticas recomendadas e suporte!",
    "The Postman MCP Server connects Postman to AI tools, giving AI agents and assistants the ability to access workspaces, manage collections and environments, evaluate APIs, and automate workflows through natural language interactions.": "O servidor Postman MCP conecta o Postman a ferramentas de IA, oferecendo a agentes e assistentes a capacidade de acessar espaços de trabalho, gerenciar coleções e ambientes, avaliar APIs e automatizar fluxos de trabalho por meio de linguagem natural.",
    "The Stitch MCP server enables AI assistants to interact with Stitch for vibe design: generating UI designs from text and images, and accessing project and screen details. See https://stitch.withgoogle.com/docs for more details.": "O servidor Stitch MCP permite que assistentes de IA interajam com o Stitch para design de interface (UI) gerado a partir de textos e imagens, além de acessar detalhes de projetos e telas. Consulte https://stitch.withgoogle.com/docs para mais detalhes.",
    "The Google Developer Knowledge MCP server gives AI-powered development tools the ability to search Google's official developer documentation and retrieve information for Google's products such as Firebase, Google Cloud, Android, Maps, and more. By connecting your AI application straight to our official library of documentation, it ensures the code and guidance you receive are up-to-date and based on authoritative context.": "O servidor Google Developer Knowledge MCP permite que ferramentas de desenvolvimento com IA pesquisem a documentação oficial para desenvolvedores do Google e obtenham informações sobre produtos como Firebase, Google Cloud, Android, Maps e muito mais. Ao conectar seu aplicativo de IA diretamente à biblioteca oficial, garante-se que o código e as orientações sejam sempre atualizados.",
    "The ClickHouse MCP server enables agents to securely interact with ClickHouse databases. It provides a universal interface to execute SQL, explore data, and view backup & billing details, allowing agentic tooling to leverage ClickHouse's high-performance analytical capabilities.": "O servidor ClickHouse MCP permite que agentes interajam com segurança com bancos de dados ClickHouse. Ele fornece uma interface universal para executar SQL, explorar dados e visualizar detalhes de backup e faturamento, aproveitando os recursos analíticos de alto desempenho do ClickHouse.",
    "Perform a range of infrastructure management tasks, including: manage virtual machine (VM) instances, manage instance group managers and instance templates, manage disks and snapshots, retrieve information about reservations and commitments.": "Execute uma variedade de tarefas de gerenciamento de infraestrutura, incluindo: gerenciar instâncias de máquinas virtuais (VMs), gerenciar grupos de instâncias e modelos, gerenciar discos e snapshots e obter informações sobre reservas e compromissos.",
    "Access enterprise mobility data using natural language queries about device fleets, automated auditing of policy compliance, and the integration of device management data into broader automated workflows.": "Acesse dados corporativos de mobilidade usando consultas em linguagem natural sobre frotas de dispositivos, auditoria automatizada de conformidade de políticas e integração de dados de gerenciamento de dispositivos a fluxos de trabalho automatizados.",
    "Search your Google Cloud projects using natural language.": "Pesquise seus projetos do Google Cloud usando linguagem natural.",
    "Discover, manage, and audit organization policies and custom constraints across your Google Cloud resources using natural language.": "Descubra, gerencie e audite políticas da organização e restrições personalizadas em todos os seus recursos do Google Cloud usando linguagem natural.",
    "Create, inspect, restrict, and manage the lifecycle of API keys in your Google Cloud projects using natural language.": "Crie, inspecione, restrinja e gerencie o ciclo de vida de chaves de API em seus projetos do Google Cloud usando linguagem natural.",
    "The App Optimize (AppOptimize) remote MCP server allows you to create, manage, and analyze cloud cost, usage, and optimization reports for your Google Cloud resources.": "O servidor MCP remoto do App Optimize (AppOptimize) permite criar, gerenciar e analisar relatórios de custos, uso e otimização de seus recursos do Google Cloud.",
    "Perform searches on ingested data in Google-owned data stores.": "Realize buscas em dados ingeridos em armazenamentos de dados do Google.",
    "Interact with documents stored in a Firestore database using natural language.": "Interaja com documentos armazenados em um banco de dados do Firestore usando linguagem natural.",
    "Access resources in the Cloud Logging platform using natural language.": "Acesse recursos na plataforma do Cloud Logging usando linguagem natural.",
    "Manage clusters for Managed Service for Apache Kafka and Kafka Connect using natural language.": "Gerencie clusters do Serviço Gerenciado para Apache Kafka e Kafka Connect usando linguagem natural.",
    "Access resources in the Cloud Monitoring platform using natural language.": "Acesse recursos na plataforma do Cloud Monitoring usando linguagem natural.",
    "Manage Pub/Sub resources and publish messages. Create, list, get, update, and delete Pub/Sub topics, subscriptions, and snapshots, as well as publish messages to topics.": "Gerencie recursos do Pub/Sub e publique mensagens. Crie, liste, obtenha, atualize e exclua tópicos, assinaturas e snapshots do Pub/Sub, bem como publique mensagens em tópicos.",
    "The Cloud Quotas MCP server allows you to view quota allocations, request quota increases, and manage Quota Adjuster configurations.": "O servidor MCP do Cloud Quotas permite visualizar alocações de cotas, solicitar aumento de cotas e gerenciar configurações do Ajustador de Cotas.",
    "Access Personalized Service Health events impacting Google Cloud products and services relevant to your projects using natural language.": "Acesse eventos do Personalized Service Health que impactam produtos e serviços do Google Cloud relevantes para seus projetos usando linguagem natural.",
    "The Unified Maintenance MCP server allows you to discover and query planned disruptive maintenance events across Google Cloud resources.": "O servidor MCP de Manutenção Unificada permite descobrir e consultar eventos de manutenção planejados que causam interrupções em recursos do Google Cloud.",
    "Interact with your Neo4j graph database using natural language. This MCP server connects directly to your Neo4j instance to explore your graph schema, run read and write Cypher queries, and inspect nodes, relationships, and paths directly from your AI tools.": "Interaja com seu banco de dados de grafos Neo4j usando linguagem natural. Este servidor MCP se conecta diretamente à sua instância do Neo4j para explorar seu esquema de grafos, executar consultas Cypher de leitura e gravação e inspecionar nós, relacionamentos e caminhos diretamente de suas ferramentas de IA.",
    "Author, run, and maintain mabl end-to-end tests from your AI tools. Connect to your mabl workspaces to generate and edit tests, trigger cloud or local runs, diagnose failures with AI analysis, and query results across environments — with every run and its evidence retained in mabl for auditability and compliance.": "Crie, execute e mantenha testes de ponta a ponta (E2E) do mabl a partir de suas ferramentas de IA. Conecte-se aos seus espaços de trabalho do mabl para gerar e editar testes, disparar execuções locais ou na nuvem, diagnosticar falhas com análise de IA e consultar resultados em diversos ambientes — com todas as evidências retidas no mabl para auditoria e conformidade.",
    "Connect your Miro boards to AI assistants. This MCP server allows summarizing and searching boards, creating and updating board items (sticky notes, shapes, frames, connectors), generating Mermaid diagrams, and acting on board comments - all while respecting existing Miro permissions and access controls.": "Conecte seus quadros do Miro a assistentes de IA. Este servidor MCP permite resumir e pesquisar quadros, criar e atualizar itens (notas adesivas, formas, quadros, conectores), gerar diagramas Mermaid e responder a comentários — tudo respeitando as permissões e controles de acesso existentes do Miro.",
    "Search the live web and extract content from URLs directly in Antigravity. Parallel provides relevant search results and readable page content for your agent. Free to get started, with no API key required.": "Pesquise na web em tempo real e extraia conteúdo de URLs diretamente no Antigravity. O Parallel fornece resultados de pesquisa relevantes e conteúdo de páginas legível para o seu agente. Gratuito para começar, sem necessidade de chave de API.",
    "The Grafana Cloud MCP server is a remotely hosted Model Context Protocol (MCP) server that lets external AI agents connect directly to your Grafana Cloud data. MCP-compatible clients can query metrics, logs, and other observability data from your Grafana environment without any local installation.": "O servidor Grafana Cloud MCP é um servidor Model Context Protocol (MCP) hospedado remotamente que permite que agentes de IA se conectem diretamente aos seus dados do Grafana Cloud. Clientes compatíveis podem consultar métricas, logs e outros dados de observabilidade sem necessidade de instalação local.",
    "Give your agent real-time web search and content retrieval. This MCP server connects to Exa's search API so you can run web searches, read full page content as clean markdown, and run multi-step research agents for list-building and enrichment directly from your AI tools.": "Dê ao seu agente pesquisa na web em tempo real e recuperação de conteúdo. Este servidor MCP se conecta à API de busca do Exa para que você possa fazer buscas na web, ler o conteúdo completo de páginas em markdown limpo e executar agentes de pesquisa em várias etapas diretamente de suas ferramentas de IA.",
    "Use natural language to find hosts, review detections, search events, and perform other security operations across your Falcon environment. CrowdStrike MCP securely connects AI applications to Falcon platform capabilities through the Model Context Protocol (MCP).": "Use linguagem natural para encontrar hosts, revisar detecções, pesquisar eventos e realizar outras operações de segurança em seu ambiente Falcon. O CrowdStrike MCP conecta com segurança aplicativos de IA aos recursos da plataforma Falcon por meio do Model Context Protocol (MCP).",
    "Interact with your Vercel projects using natural language. Vercel MCP allows AI tools to search Vercel documentation, inspect projects and deployments, analyze deployment and build logs, and manage supported Vercel resources securely.": "Interaja com seus projetos da Vercel usando linguagem natural. O Vercel MCP permite que ferramentas de IA pesquisem a documentação da Vercel, inspecionem projetos e implantações, analisem logs de compilação e gerenciem recursos da Vercel com segurança.",
    "Connect to FactSet AI-Ready Data to search and read institutional-grade financial data using natural language. This MCP server provides unified access to company fundamentals, consensus estimates, global prices, ownership, M&A transactions, debt capital structure, supply chain relationships, funds/ETFs, and unstructured content directly from your AI tools.": "Conecte-se ao FactSet AI-Ready Data para pesquisar e ler dados financeiros de nível institucional usando linguagem natural. Este servidor MCP oferece acesso unificado a fundamentos de empresas, estimativas de consenso, preços globais, participações acionárias, transações de M&A, estrutura de capital, relacionamentos de cadeia de suprimentos, fundos/ETFs e conteúdos não estruturados.",
    "Stand up matters, shape workspace schema, govern access, and analyze usage in RelativityOne. This MCP server allows you to securely connect to your RelativityOne instance to search and locate content, create and edit matters, workspaces, and clients, manage user and group permissions, and generate usage reports using natural language.": "Configure processos, estruture espaços de trabalho, governe o acesso e analise o uso no RelativityOne. Este servidor MCP permite conectar com segurança à sua instância do RelativityOne para pesquisar conteúdos, criar e editar processos, espaços de trabalho e clientes, gerenciar permissões de usuários e grupos e gerar relatórios de uso usando linguagem natural.",
    "Connect to Daloopa to discover companies, series, get company fundamentals, search financial documents, and get stock prices. Access verified financial data and KPIs from SEC filings, investor presentations, and earnings reports with source traceability.": "Conecte-se ao Daloopa para descobrir empresas, séries históricas, fundamentos corporativos, pesquisar documentos financeiros e cotações de ações. Acesse dados financeiros verificados e KPIs de registros da SEC, apresentações para investidores e relatórios de resultados com rastreabilidade da fonte.",
    "Search and retrieve real-time financial and stock market data from Finnhub using natural language. This MCP server connects to your Finnhub account to access stock quotes, historical OHLCV candles, company profiles, standardized financial statements (balance sheets, income statements, cash flow), earnings call transcripts, analyst estimates and price targets, SEC filings, ETF and mutual fund holdings, forex, crypto, and economic indicators directly from your AI tools.": "Pesquise e recupere dados financeiros e do mercado de ações em tempo real do Finnhub usando linguagem natural. Este servidor MCP se conecta à sua conta do Finnhub para acessar cotações de ações, candles históricos OHLCV, perfis de empresas, demonstrativos financeiros padronizados (balanços, DRE, fluxo de caixa), transcrições de teleconferências de resultados, estimativas de analistas, preços-alvo, registros na SEC, posições de ETFs/fundos mútuos, forex, criptomoedas e indicadores econômicos.",
    "Search and retrieve comprehensive financial and corporate data from S&P Global using natural language. This MCP server connects to S&P Global Market Intelligence (via Kensho) to query company profiles, identifiers (CUSIP, ISIN), financial statements (balance sheets, income statements, cash flows), historical stock prices, market capitalization, earnings call transcripts, M&A transactions, funding rounds, consensus analyst estimates, and executive profiles directly from your AI tools.": "Pesquise e recupere dados financeiros e corporativos abrangentes da S&P Global usando linguagem natural. Este servidor MCP conecta-se ao S&P Global Market Intelligence (via Kensho) para consultar perfis de empresas, identificadores (CUSIP, ISIN), demonstrativos financeiros, preços históricos de ações, capitalização de mercado, transcrições de teleconferências de resultados, transações de M&A, rodadas de captação, estimativas de analistas e perfis de executivos.",
    "Explore deep global markets data and financial analytics from LSEG (London Stock Exchange Group). This MCP server connects your AI tools to LSEG Financial Analytics (LFA) to price bonds and bond futures, analyze yield and credit curves, evaluate FX spot and forward carry trades, value options with full Greeks, and access IBES consensus estimates, company fundamentals, historical pricing, and macroeconomic indicators.": "Explore dados aprofundados de mercados globais e análises financeiras do LSEG (London Stock Exchange Group). Este servidor MCP conecta suas ferramentas de IA ao LSEG Financial Analytics (LFA) para precificar títulos e futuros, analisar curvas de rendimento e crédito, avaliar operações de câmbio (FX carry trades), precificar opções com gregas completas e acessar estimativas de consenso IBES, fundamentos de empresas, cotações históricas e indicadores macroeconômicos.",
    "Bring Harvey's legal intelligence into your AI tools for general legal inquiries, Vault project analysis, and specialized knowledge source research. The Harvey MCP server lets you ask general legal questions, analyze documents in your Vault projects, and query specialized legal research knowledge sources.": "Traga a inteligência jurídica do Harvey para suas ferramentas de IA para consultas jurídicas gerais, análise de projetos no Vault e pesquisa em fontes de conhecimento especializadas. O servidor Harvey MCP permite fazer perguntas jurídicas gerais, analisar documentos em seus projetos do Vault e consultar bases especializadas de pesquisa jurídica.",
    "Search Guidepoint's expert network for interview transcripts, browse curated event catalogs, and retrieve your personal event schedule. This MCP server also allows you to manage your event participation by registering for, requesting approval for, or canceling upcoming Guidepoint events directly from your AI tools.": "Pesquise na rede de especialistas do Guidepoint por transcrições de entrevistas, navegue por catálogos de eventos e visualize sua agenda personalizada. Este servidor MCP também permite gerenciar sua participação inscrevendo-se, solicitando aprovação ou cancelando eventos futuros do Guidepoint diretamente de suas ferramentas de IA.",
    "Access institutional-grade financial data in your AI tools, delivering fundamentals, ratios, KPIs, segments, adjusted metrics, SEC filings, earnings calls, and market quotes within minutes of earnings.": "Acesse dados financeiros de nível institucional em suas ferramentas de IA, fornecendo fundamentos, índices, KPIs, segmentos, métricas ajustadas, registros da SEC, teleconferências de resultados e cotações de mercado minutos após a divulgação de balanços.",
    "Connect with your Docusign account using natural language. This MCP server allows you to search and locate Docusign envelopes, templates, and documents, read item details and metadata, create and update envelopes, and trigger or cancel workflow instances directly from your AI tools.": "Conecte-se à sua conta do Docusign usando linguagem natural. Este servidor MCP permite pesquisar e localizar envelopes, modelos e documentos do Docusign, ler detalhes e metadados, criar e atualizar envelopes e iniciar ou cancelar fluxos de trabalho diretamente de suas ferramentas de IA.",
    "LegalZoom's MCP connector gives users instant access to legal product information, business formation guidance, and on-demand attorney consultations, all without leaving the conversation.": "O conector MCP do LegalZoom oferece aos usuários acesso instantâneo a informações de produtos jurídicos, orientações para abertura de empresas e consultas sob demanda com advogados, tudo sem sair da conversa.",
    "Search and retrieve documents from your NetDocuments repository using natural language. This MCP server allows AI tools to securely search documents and emails, filter by metadata, and read document contents and details while respecting your existing NetDocuments permissions and governance controls.": "Pesquise e recupere documentos do seu repositório NetDocuments usando linguagem natural. Este servidor MCP permite que ferramentas de IA busquem com segurança documentos e e-mails, filtrem por metadados e leiam o conteúdo de documentos, respeitando suas permissões e controles de governança existentes do NetDocuments.",
    "Interact with your iManage Work platform using natural language. This MCP server connects to your iManage account to search workspaces, folders, and documents, inspect document profiles and version histories, read document contents, and manage legal and knowledge work workflows directly from your AI tools.": "Interaja com sua plataforma iManage Work usando linguagem natural. Este servidor MCP conecta-se à sua conta do iManage para pesquisar espaços de trabalho, pastas e documentos, inspecionar perfis e históricos de versões, ler o conteúdo de arquivos e gerenciar fluxos de trabalho jurídicos diretamente de suas ferramentas de IA.",
    "Search and manage Salesforce records from your Salesforce remote MCP server. Connect to your Salesforce instance to search across objects (SOSL), execute SOQL queries, inspect object schemas, traverse related records, and create, update, or delete records.": "Pesquise e gerencie registros do Salesforce a partir do seu servidor remoto Salesforce MCP. Conecte-se à sua instância do Salesforce para pesquisar em objetos (SOSL), executar consultas SOQL, inspecionar esquemas de objetos, navegar por registros relacionados e criar, atualizar ou excluir registros.",
    "Civil legal guidance for people navigating court without a lawyer. This MCP server provides educational guidance for self-represented litigants in U.S. civil legal matters across all 50 states, including case intake assessments, procedural deadline calculations, and prioritized next-step guidance directly from your AI tools.": "Orientação jurídica civil para pessoas que navegam pelo sistema judiciário sem advogado. Este servidor MCP fornece orientação educacional para partes que se autorrepresentam em questões cíveis nos EUA em todos os 50 estados, incluindo avaliações iniciais do caso, cálculos de prazos processuais e próximas etapas prioritárias.",
    "Intelligent DevSecOps automation for your development workflow, powered by natural language. Connects your AI coding agent (Antigravity) to 150+ integrated DevOps tools via MCP — security scanning, pipeline generation, compliance auditing, and documentation, all via plain-English commands without leaving the IDE. Source code analysis runs locally; only structured results are returned to the portal.": "Automação inteligente de DevSecOps para seu fluxo de desenvolvimento com linguagem natural. Conecta seu agente de desenvolvimento (Antigravity) a mais de 150 ferramentas DevOps integradas via MCP — verificação de segurança, geração de pipelines, auditoria de conformidade e documentação, tudo sem sair da IDE. A análise de código é executada localmente; apenas resultados estruturados são retornados ao portal.",
    "Forge is an AI-powered platform that automates the earliest, most time-consuming phase of software development — the \"Day 0\" planning that typically takes weeks of meetings, documents, and back-and-forth. Exposes project/repo linking, PRD/BRD/architecture artifact retrieval, work-order management, commit/PR automation, and CI/CD pipeline tools directly to your AI coding agent.": "O Forge é uma plataforma impulsionada por IA que automatiza a fase inicial e mais demorada do desenvolvimento de software — o planejamento \"Dia 0\", que normalmente leva semanas de reuniões e documentos. Disponibiliza vinculação de projetos/repositórios, recuperação de artefatos de arquitetura/PRD/BRD, gerenciamento de ordens de serviço, automação de commits/PRs e ferramentas de pipeline CI/CD diretamente para seu agente de IA.",
    "Bring Endor Labs security into your AI tools. With this MCP server, you can check dependency safety before adding a new package, scan your open source dependencies for vulnerabilities and malware, find leaked secrets accidentally committed in your Git history, run static analysis (SAST) on your code, and perform AI security reviews on your code changes.": "Traga a segurança do Endor Labs para suas ferramentas de IA. Com este servidor MCP, você pode verificar a segurança de dependências antes de adicionar um novo pacote, verificar vulnerabilidades e malware em dependências de código aberto, encontrar segredos vazados no histórico do Git, executar análise estática (SAST) e realizar revisões de segurança com IA em suas alterações de código.",
    "The Canva MCP server enables AI assistants to seamlessly interact with Canva's design capabilities. By exposing Canva's capabilities (including design creation and editing, asset and brand management, library search, export, and commenting) as MCP-compatible tools, you can give your users access to Canva's design capabilities through natural language, directly from the AI tools they already use.": "O servidor Canva MCP permite que assistentes de IA interajam perfeitamente com os recursos de design do Canva. Ao expor os recursos do Canva (incluindo criação e edição de designs, gerenciamento de marca e recursos, pesquisa em bibliotecas, exportação e comentários) como ferramentas compatíveis com MCP, você pode acessar os recursos de design do Canva por linguagem natural diretamente nas ferramentas que já usa.",
    "Enable Antigravity to control and inspect a live Chrome browser, with access to the full power of Chrome DevTools for reliable automation, in-depth debugging, and performance analysis.": "Permite que o Antigravity controle e inspecione um navegador Chrome ativo, com acesso a todo o poder do Chrome DevTools para automação confiável, depuração aprofundada e análise de desempenho.",

    # Variáveis de Configuração de Servidores MCP e Feedback Traduzidos
    "Visit": "Visite",
    "Legal Help": "Ajuda jurídica",
    "to ask for content changes for legal reasons.": "para solicitar alterações de conteúdo por motivos legais.",
    "We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback.": "Recomendamos anexar os logs. Anexar logs ajudará a equipe do Antigravity a tomar medidas e priorizar seu feedback.",
    "Provide Feedback": "Enviar feedback",
    "Feedback Type": "Tipo de feedback",
    "Bug Report": "Relatório de bug",
    "Feature Request": "Solicitação de recurso",
    "Auth and Billing": "Autenticação e faturamento",
    "Remote Control Issue": "Problema no Controle Remoto",
    "General Feedback": "Feedback geral",
    "Steps to Reproduce": "Etapas para reproduzir",
    "Please list the steps to reproduce the issue": "Liste as etapas para reproduzir o problema",
    "Attach a screenshot (optional)": "Anexar captura de tela (opcional)",
    "Attach Antigravity server logs": "Anexar logs do servidor do Antigravity",
    "Attaching logs requires an email address": "Anexar logs requer um endereço de e-mail",
    "Screenshot must be under 10 MB": "A captura de tela deve ter menos de 10 MB",
    "Submitting...": "Enviando...",
    "Submit": "Enviar",
    "Thank you! Your feedback has been submitted successfully.": "Obrigado! Seu feedback foi enviado com sucesso.",
    "An error occurred while submitting your feedback. Please try again.": "Ocorreu um erro ao enviar seu feedback. Tente novamente.",
    "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "Descreva o problema em detalhes. Quanto mais claro o feedback, mais rápido nossa equipe poderá atender à sua solicitação. Algumas informações úteis incluem:",
    "Steps to reproduce the issue": "Etapas para reproduzir o problema",
    "Expected behavior": "Comportamento esperado",
    "Actual behavior": "Comportamento real",
    "Any error messages": "Mensagens de erro",
    "Any relevant information": "Qualquer informação relevante",
    "Please describe the feature you'd like to see. The more detailed the requirements, the easier it will be for our team to incorporate your ideas. Some helpful information includes:": "Descreva o recurso que você gostaria de ver. Quanto mais detalhados os requisitos, mais fácil será para nossa equipe incorporar suas ideias. Algumas informações úteis incluem:",
    "What is missing in your workflow": "O que está faltando em seu fluxo de trabalho",
    "What you would like to see to address this gap in your workflow": "O que você gostaria de ver para solucionar essa lacuna no seu fluxo",
    "How this feature would help you and other users": "Como esse recurso ajudaria você e outros usuários",
    "Please describe your auth or billing issue. More details will help our support team resolve your issue quicker. Some helpful information includes:": "Descreva seu problema de autenticação ou cobrança. Mais detalhes ajudarão nossa equipe de suporte a resolver seu problema mais rapidamente. Algumas informações úteis incluem:",
    "What quota or feature is being incorrectly limited": "Qual cota ou recurso está sendo limitado incorretamente",
    "What functionality you expect your account tier to have available that is missing": "Qual funcionalidade você espera que seu plano tenha que está ausente",
    "Any error messages seen when trying to log in": "Quaisquer mensagens de erro exibidas ao tentar fazer login",
    "Use this form if you cannot connect to Remote Control. If your instance is already connected and you are experiencing issues in the browser, report directly from the Remote Control web page so that relevant logs are included. Some helpful information includes:": "Use este formulário se você não conseguir se conectar ao Controle Remoto. Se a sua instância já estiver conectada e você estiver enfrentando problemas no navegador, informe diretamente da página web do Controle Remoto para incluir os logs relevantes. Algumas informações úteis incluem:",
    "Whether it never connects or is intermittent/flaky": "Se nunca se conecta ou se a conexão é intermitente/instável",
    "Did restarting the desktop app help?": "Reiniciar o aplicativo para desktop ajudou?",
    "For any feedback that does not fit into the above categories.": "Para qualquer feedback que não se enquadre nas categorias acima.",
    "Describe the bug you encountered...": "Descreva o bug que você encontrou...",
    "Describe the feature you would like to see...": "Descreva o recurso que você gostaria de ver...",
    "Describe your auth or billing issue...": "Descreva seu problema de autenticação ou cobrança...",
    "Describe your Remote Control issue...": "Descreva seu problema no Controle Remoto...",
    "Enter your feedback here...": "Digite seu feedback aqui...",
    "Endor Labs Namespace": "Namespace do Endor Labs",
    "(Optional) Your Endor Labs tenant namespace. Required for Enterprise Edition only; the free Developer Edition runs with no configuration.": "(Opcional) O namespace do seu locatário (tenant) do Endor Labs. Necessário apenas para a Enterprise Edition; a Developer Edition gratuita funciona sem configuração.",
    "Authentication Mode": "Modo de autenticação",
    "(Optional) Enterprise Edition authentication method: \"github\", \"gitlab\", \"google\", or \"sso\". A browser window opens automatically on first use to complete authentication.": "(Opcional) Método de autenticação da Enterprise Edition: \"github\", \"gitlab\", \"google\" ou \"sso\". Uma janela do navegador abre automaticamente no primeiro uso para concluir a autenticação.",
    "SSO Tenant": "Locatário (Tenant) SSO",
    "(Optional) SSO tenant name. Only needed when the authentication mode is \"sso\".": "(Opcional) Nome do locatário SSO. Necessário apenas quando o modo de autenticação for \"sso\".",
    "Looker Base URL": "URL base do Looker",
    "The URL of your Looker instance.": "A URL da sua instância do Looker.",
    "Looker Client ID": "ID do cliente Looker",
    "The client ID for the Looker API.": "O ID do cliente para a API do Looker.",
    "Looker Client Secret": "Segredo do cliente Looker",
    "The client secret for the Looker API.": "O segredo do cliente para a API do Looker.",
    "Looker Verify SSL": "Verificar SSL no Looker",
    "Whether to verify SSL certificates.": "Se os certificados SSL devem ser verificados.",
    "Looker Use Client OAuth": "Usar OAuth de cliente no Looker",
    "Whether to use OAuth for authentication.": "Se o OAuth deve ser usado para autenticação.",
    "Looker Show Hidden Models": "Mostrar modelos ocultos no Looker",
    "Whether to show hidden models.": "Se os modelos ocultos devem ser exibidos.",
    "Looker Show Hidden Explores": "Mostrar explorações ocultas no Looker",
    "Whether to show hidden explores.": "Se as explorações ocultas devem ser exibidas.",
    "Looker Show Hidden Fields": "Mostrar campos ocultos no Looker",
    "Whether to show hidden fields.": "Se os campos ocultos devem ser exibidos.",
    "Tools Config Path": "Caminho de configuração de ferramentas",
    "The absolute path to the tools configuration file (e.g. /path/to/tools.yaml).": "O caminho absoluto para o arquivo de configuração de ferramentas (ex.: /caminho/para/tools.yaml).",
    "Oracle Database Host": "Host do Oracle Database",
    "The host of your Oracle Database.": "O host do seu banco de dados Oracle Database.",
    "Oracle Database Port": "Porta do Oracle Database",
    "The port of your Oracle Database.": "A porta do seu banco de dados Oracle Database.",
    "Oracle Database Service Name": "Nome do serviço do Oracle Database",
    "The service name of your Oracle Database.": "O nome do serviço do seu banco de dados Oracle Database.",
    "Oracle Database User": "Usuário do Oracle Database",
    "The database username.": "O nome de usuário do banco de dados.",
    "Oracle Database Password": "Senha do Oracle Database",
    "The password for the database user.": "A senha para o usuário do banco de dados.",
    "GitHub Token": "Token do GitHub",
    "GitHub Personal Access Token": "Token de acesso pessoal do GitHub (Personal Access Token)",
    "Stripe secret key": "Chave secreta da Stripe",
    "Your Stripe secret key is used to authenticate your Stripe API requests. You can generate a secret key in your Stripe dashboard.": "Sua chave secreta da Stripe é usada para autenticar suas requisições à API da Stripe. Você pode gerar uma chave secreta no painel da Stripe.",
    "Redis URL": "URL do Redis",
    "The URL of the Redis database. Format: redis://user:password@host:port": "A URL do banco de dados Redis. Formato: redis://usuario:senha@host:porta",
    "Connection string": "String de conexão",
    "MongoDB connection string for direct database connections (optional users may choose to inform it on every tool call).": "String de conexão do MongoDB para conexões diretas ao banco de dados (opcional, usuários podem optar por informá-la a cada chamada de ferramenta).",
    "Notion API Token": "Token da API do Notion",
    "Integration token from Notion. Go to https://www.notion.so/profile/integrations to create a new internal integration or select an existing one.": "Token de integração do Notion. Acesse https://www.notion.so/profile/integrations para criar uma nova integração interna ou selecionar uma existente.",
    "Perplexity API Key": "Chave de API do Perplexity",
    "Your Perplexity Sonar API key for web search capabilities.": "Sua chave de API do Perplexity Sonar para recursos de pesquisa na web.",
    "PayPal Access Token": "Token de acesso do PayPal",
    "Your PayPal API access token generated using your client ID and client secret.": "Seu token de acesso à API do PayPal gerado usando seu ID e segredo de cliente.",
    "PayPal Environment": "Ambiente do PayPal",
    "Execution environment for PayPal integration. Use `SANDBOX` for testing or `PRODUCTION` for live transactions.": "Ambiente de execução para a integração do PayPal. Use `SANDBOX` para testes ou `PRODUCTION` para transações reais.",
    "Heroku API Key": "Chave de API do Heroku",
    "Your Heroku authentication token. Generate one using 'heroku authorizations:create' or through the Heroku Dashboard.": "Seu token de autenticação do Heroku. Gere um usando 'heroku authorizations:create' ou pelo painel do Heroku.",
    "Pinecone API Key": "Chave de API do Pinecone",
    "Your Pinecone API key. Generate one using the Pinecone console.": "Sua chave de API do Pinecone. Gere uma usando o console do Pinecone.",
    "Locofy Personal Access Token": "Token de acesso pessoal do Locofy",
    "Your Locofy Personal Access Token. Generate it from your Locofy account settings.": "Seu token de acesso pessoal do Locofy. Gere-o nas configurações da sua conta do Locofy.",
    "Locofy Project ID": "ID do projeto Locofy",
    "The ID of the Locofy project for the MCP server to interact with.": "O ID do projeto Locofy com o qual o servidor MCP deve interagir.",
    "Airweave API Key": "Chave de API do Airweave",
    "Your Airweave API Key": "Sua chave de API do Airweave",
    "Airweave Collection ID": "ID da coleção Airweave",
    "Your Airweave Collection ID": "O ID da sua coleção do Airweave",
    "Airweave Base URL": "URL base do Airweave",
    "The base URL for the Airweave API": "A URL base para a API do Airweave",
    "Harness API Key": "Chave de API do Harness",
    "Harness personal access token or service account token. Create one from Harness → My Profile → API Keys.": "Token de acesso pessoal do Harness ou token de conta de serviço. Crie um em Harness → Meu Perfil → Chaves de API.",
    "SonarQube Token": "Token do SonarQube",
    "Your SonarQube Cloud or Server token": "Seu token do SonarQube Cloud ou Server",
    "SonarQube Organization Key": "Chave da organização SonarQube",
    "Your SonarQube Cloud organization key (only for SonarCloud)": "A chave da sua organização no SonarQube Cloud (apenas para SonarCloud)",
    "SonarQube Server URL": "URL do servidor SonarQube",
    "URL of your self-hosted SonarQube Server (only for SonarQube Server)": "URL do seu servidor SonarQube auto-hospedado (apenas para SonarQube Server)",
    "Netlify Personal Access Token (optional)": "Token de acesso pessoal do Netlify (opcional)",
    "Optional Netlify personal access token used for authentication when automatic browser login is not possible.": "Token de acesso pessoal opcional do Netlify usado para autenticação quando o login automático pelo navegador não for possível.",
    "Sonatype Guide Bearer Token": "Token Bearer do Sonatype Guide",
    "Your Sonatype Guide User Token is used to authenticate your requests to the Sonatype Guide MCP server. You can generate a token in your Sonatype Guide Settings > Tokens.": "Seu token de usuário do Sonatype Guide é usado para autenticar suas requisições ao servidor MCP do Sonatype Guide. Você pode gerar um token em Configurações do Sonatype Guide > Tokens.",
    " Your Sonatype Guide User Token is used to authenticate your requests to the Sonatype Guide MCP server. You can generate a token in your Sonatype Guide Settings > Tokens.": "Seu token de usuário do Sonatype Guide é usado para autenticar suas requisições ao servidor MCP do Sonatype Guide. Você pode gerar um token em Configurações do Sonatype Guide > Tokens.",
    "Postman API Key": "Chave de API do Postman",
    "Your Postman API Key (begins with PMAK-)": "Sua chave de API do Postman (começa com PMAK-)",
    "Stitch API Key": "Chave de API do Stitch",
    "Your Stitch API Key. Create one in the Stitch UI (https://stitch.withgoogle.com/settings)": "Sua chave de API do Stitch. Crie uma na interface do Stitch (https://stitch.withgoogle.com/settings)",
    "Neo4j Connection URI": "URI de conexão do Neo4j",
    "The Bolt connection URI for your Neo4j instance (e.g. \"bolt://localhost:7687\" for a local/Desktop database, or \"neo4j+s://<dbid>.databases.neo4j.io\" for an Aura instance).": "A URI de conexão Bolt para sua instância do Neo4j (ex.: \"bolt://localhost:7687\" para banco local/desktop ou \"neo4j+s://<dbid>.databases.neo4j.io\" para instância Aura).",
    "Neo4j Username": "Usuário do Neo4j",
    "The username for authentication to the Neo4j database.": "O nome de usuário para autenticação no banco de dados Neo4j.",
    "Neo4j Password": "Senha do Neo4j",
    "The password for authentication to the Neo4j database.": "A senha para autenticação no banco de dados Neo4j.",
    "Neo4j Database Name": "Nome do banco de dados Neo4j",
    "The name of the database to connect to (e.g. \"neo4j\").": "O nome do banco de dados ao qual se conectar (ex.: \"neo4j\").",
    "Neo4j Read Only": "Somente leitura no Neo4j",
    "Set to \"true\" to restrict queries to read-only operations, or \"false\" to allow write queries.": "Defina como \"true\" para restringir consultas a operações somente leitura, ou \"false\" para permitir consultas de gravação.",
    "Exa API Key": "Chave de API do Exa",
    "Your Exa API key, created at https://dashboard.exa.ai/api-keys.": "Sua chave de API do Exa, criada em https://dashboard.exa.ai/api-keys.",
    "Falcon Client ID": "Client ID do Falcon",
    "CrowdStrike Falcon API Client ID.": "Client ID da API do CrowdStrike Falcon.",
    "Falcon Client Secret": "Client Secret do Falcon",
    "CrowdStrike Falcon API Client Secret.": "Client Secret da API do CrowdStrike Falcon.",
    "Falcon Base URL": "URL base do Falcon",
    "The API base URL for your Falcon cloud region (e.g., https://api.crowdstrike.com for US-1, https://api.us-2.crowdstrike.com for US-2, https://api.eu-1.crowdstrike.com for EU-1).": "A URL base da API para a região de nuvem do seu Falcon (ex.: https://api.crowdstrike.com para US-1, https://api.us-2.crowdstrike.com para US-2, https://api.eu-1.crowdstrike.com para EU-1).",
    "RelativityOne Base URL": "URL base do RelativityOne",
    "The base URL of your RelativityOne instance. Must start with https:// and have no trailing slash (e.g., https://<tenant>.r1.kcura.com or https://<your-domain>.relativity.one).": "A URL base da sua instância do RelativityOne. Deve começar com https:// e não conter barra no final (ex.: https://<tenant>.r1.kcura.com ou https://<seu-dominio>.relativity.one).",
    "Client ID for your Relativity Integration": "Client ID da integração com Relativity",
    "The OAuth 2.0 Client ID for your RelativityOne integration (configured with PKCE and UserInfoAccess, offline_access scopes).": "O Client ID OAuth 2.0 para sua integração do RelativityOne (configurado com PKCE e escopos UserInfoAccess, offline_access).",
    "Daloopa API Key": "Chave de API do Daloopa",
    "Your Daloopa API Key. Generate one from your Daloopa account settings.": "Sua chave de API do Daloopa. Gere uma nas configurações da sua conta do Daloopa.",
    "Harvey API Token": "Token de API do Harvey",
    "Your Harvey API Token used to authenticate requests to the Harvey MCP server. You can generate or retrieve your token from your Harvey settings.": "Seu token de API do Harvey usado para autenticar requisições ao servidor MCP do Harvey. Você pode gerar ou recuperar seu token nas configurações do Harvey.",
    "Forge API Token": "Token de API do Forge",
    "Your Forge API token used to authenticate with the MCP server.": "Seu token de API do Forge usado para autenticar com o servidor MCP.",

    # Mensagens de Cota, Limite e Créditos de IA Adicionais
    "Too many requests, please try again in a bit!": "Muitas requisições, por favor tente novamente em breve!",
    "See plans": "Ver planos",
    "AI Credits are used when you've exceeded your model quota. Keep track of your current AI Credits in the": "Os créditos de IA são usados quando você excede a cota do modelo. Acompanhe seus créditos de IA atuais na",
    "AI Credits Used to Generate Response": "Créditos de IA usados para gerar a resposta",
    "Your AI credits balance is too low to continue.": "Seu saldo de créditos de IA está muito baixo para continuar.",
    "To continue using this model now, enable AI Credit overages.": "Para continuar usando este modelo agora, ative os excedentes de créditos de IA.",
    "this model": "este modelo",
    "Personal Access Token": "Token de acesso pessoal",
    "Personal access token": "Token de acesso pessoal",
    "API Key": "Chave de API",
    "API key": "Chave de API",
}

map_str = json.dumps(EXACT_MAP, ensure_ascii=False)

js_body = r'''(function() {
  const EXACT_MAP = ''' + map_str + r''';

  function formatDateTimePtBr(str) {
    if (!str || typeof str !== 'string') return str;
    let res = str;

    // Convert 12h AM/PM to 24h
    res = res.replace(/\b(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)\b/gi, (match, hStr, mStr, sStr, meridiem) => {
      let h = parseInt(hStr, 10);
      const m = mStr;
      const isPM = meridiem.toUpperCase() === 'PM';
      const isAM = meridiem.toUpperCase() === 'AM';
      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;
      const h24 = String(h).padStart(2, '0');
      return sStr ? `${h24}:${m}:${sStr}` : `${h24}:${m}`;
    });

    // Relative dates
    res = res
      .replace(/\bToday\b/gi, 'Hoje')
      .replace(/\bYesterday\b/gi, 'Ontem')
      .replace(/\bTomorrow\b/gi, 'Amanhã');

    // Days of the week (full)
    res = res
      .replace(/\bMonday\b/gi, 'Segunda-feira')
      .replace(/\bTuesday\b/gi, 'Terça-feira')
      .replace(/\bWednesday\b/gi, 'Quarta-feira')
      .replace(/\bThursday\b/gi, 'Quinta-feira')
      .replace(/\bFriday\b/gi, 'Sexta-feira')
      .replace(/\bSaturday\b/gi, 'Sábado')
      .replace(/\bSunday\b/gi, 'Domingo');

    // Days of the week (short)
    res = res
      .replace(/\bMon\b/gi, 'Seg')
      .replace(/\bTue\b/gi, 'Ter')
      .replace(/\bWed\b/gi, 'Qua')
      .replace(/\bThu\b/gi, 'Qui')
      .replace(/\bFri\b/gi, 'Sex')
      .replace(/\bSat\b/gi, 'Sáb')
      .replace(/\bSun\b/gi, 'Dom');

    // Months (full)
    res = res
      .replace(/\bJanuary\b/gi, 'Janeiro')
      .replace(/\bFebruary\b/gi, 'Fevereiro')
      .replace(/\bMarch\b/gi, 'Março')
      .replace(/\bApril\b/gi, 'Abril')
      .replace(/\bMay\b/gi, 'Maio')
      .replace(/\bJune\b/gi, 'Junho')
      .replace(/\bJuly\b/gi, 'Julho')
      .replace(/\bAugust\b/gi, 'Agosto')
      .replace(/\bSeptember\b/gi, 'Setembro')
      .replace(/\bOctober\b/gi, 'Outubro')
      .replace(/\bNovember\b/gi, 'Novembro')
      .replace(/\bDecember\b/gi, 'Dezembro');

    // Months (short)
    res = res
      .replace(/\bFeb\b/gi, 'Fev')
      .replace(/\bApr\b/gi, 'Abr')
      .replace(/\bAug\b/gi, 'Ago')
      .replace(/\bSep(?:t)?\b/gi, 'Set')
      .replace(/\bOct\b/gi, 'Out')
      .replace(/\bNov\b/gi, 'Nov')
      .replace(/\bDec\b/gi, 'Dez');

    return res;
  }

  function translateDuration(str) {
    if (!str) return str;
    return str
      .replace(/\b(\d+)\s*days?\b/gi, (match, n) => n === '1' ? '1 dia' : `${n} dias`)
      .replace(/\b(\d+)\s*hours?\b/gi, (match, n) => n === '1' ? '1 hora' : `${n} horas`)
      .replace(/\b(\d+)\s*minutes?\b/gi, (match, n) => n === '1' ? '1 minuto' : `${n} minutos`)
      .replace(/\b(\d+)\s*seconds?\b/gi, (match, n) => n === '1' ? '1 segundo' : `${n} segundos`);
  }

  function translateDynamic(s) {
    let m;
    if ((m = /^Thought for (\d+)s$/.exec(s))) return `Pensou por ${m[1]}s`;
    if ((m = /^Thought for (\d+)m (\d+)s$/.exec(s))) return `Pensou por ${m[1]}m ${m[2]}s`;
    if ((m = /^Thought for (\d+)m$/.exec(s))) return `Pensou por ${m[1]}m`;
    if ((m = /^Worked for (\d+)s$/.exec(s))) return `Trabalhou por ${m[1]}s`;
    if ((m = /^Worked for (\d+)m (\d+)s$/.exec(s))) return `Trabalhou por ${m[1]}m ${m[2]}s`;
    if ((m = /^Worked for (\d+)m$/.exec(s))) return `Trabalhou por ${m[1]}m`;
    if ((m = /^Worked for (\d+)h (\d+)m$/.exec(s))) return `Trabalhou por ${m[1]}h ${m[2]}m`;
    if ((m = /^Worked for (\d+)h$/.exec(s))) return `Trabalhou por ${m[1]}h`;
    if ((m = /^Exploring (\d+) files, running (\d+) commands$/.exec(s))) return `Explorando ${m[1]} arquivos, executando ${m[2]} comandos`;
    if ((m = /^Exploring (\d+) files$/.exec(s))) return `Explorando ${m[1]} arquivos`;
    if ((m = /^Running (\d+) commands$/.exec(s))) return `Executando ${m[1]} comandos`;
    if ((m = /^Tools \((\d+)\)$/.exec(s))) return `Ferramentas (${m[1]})`;
    if ((m = /^Generation Steps \((\d+)\)$/.exec(s))) return `Etapas de geração (${m[1]})`;
    if ((m = /^Message History \((\d+)\)$/.exec(s))) return `Histórico de mensagens (${m[1]})`;
    if ((m = /^Mark (\d+) conversations? as read$/.exec(s))) return `Marcar ${m[1]} ${m[1] === '1' ? 'conversa como lida' : 'conversas como lidas'}`;
    if ((m = /^(\d+) agents? running$/.exec(s))) return `${m[1]} ${m[1] === '1' ? 'agente em execução' : 'agentes em execução'}`;
    if (s === "No agents running") return "Nenhum agente em execução";
    if ((m = /^(\d+) files? changed$/.exec(s))) return `${m[1]} ${m[1] === '1' ? 'arquivo alterado' : 'arquivos alterados'}`;

    // Quota patterns
    function resolveLimitName(lim) {
      const l = (lim || '').toLowerCase().trim();
      if (l === 'weekly') return 'semanal';
      if (l === '5-hour') return 'de 5 horas';
      if (l === 'daily') return 'diário';
      if (l === 'monthly') return 'mensal';
      return lim;
    }

    if ((m = /^You have used some of your (.+?) limit, it (?:will )?(?:fully )?refresh(?:es)? in (.+?)\.?$/i.exec(s))) {
      const limitType = resolveLimitName(m[1]);
      return `Você usou parte do seu limite ${limitType}; ele será totalmente renovado em ${translateDuration(m[2])}.`;
    }
    if ((m = /^You have reached your (.+?) limit, it (?:will )?(?:fully )?refresh(?:es)? in (.+?)\.?$/i.exec(s))) {
      const limitType = resolveLimitName(m[1]);
      return `Você atingiu o seu limite ${limitType}; ele será totalmente renovado em ${translateDuration(m[2])}.`;
    }
    if ((m = /^You have hit your (.+?) limit, it (?:will )?(?:fully )?refresh(?:es)? in (.+?)\. If on a supported paid plan, you can use AI credits in the interim( or upgrade to a higher tier)?\.?$/i.exec(s))) {
      const limitType = resolveLimitName(m[1]);
      const upgrade = m[3] ? " ou fazer upgrade para um plano superior." : ".";
      return `Você atingiu o seu limite ${limitType}; ele será renovado em ${translateDuration(m[2])}. Se estiver em um plano pago compatível, você poderá usar créditos de IA nesse período${upgrade}`;
    }
    if ((m = /^You have hit your (.+?) limit, (?:so )?the (.+?) limit does not currently apply\. Your (.+?) limit will (?:fully )?refresh(?:es)? in (.+?)\.?$/i.exec(s))) {
      const l1 = resolveLimitName(m[1]);
      const l2 = resolveLimitName(m[2]);
      const l3 = resolveLimitName(m[3]);
      return `Você atingiu o seu limite ${l1}, portanto o limite ${l2} não se aplica no momento. Seu limite ${l3} será totalmente renovado em ${translateDuration(m[4])}.`;
    }
    if ((m = /^You have hit your (.+?) limit, it (?:will )?(?:fully )?refresh(?:es)? in (.+?)\.?$/i.exec(s))) {
      const limitType = resolveLimitName(m[1]);
      return `Você atingiu o seu limite ${limitType}; ele será totalmente renovado em ${translateDuration(m[2])}.`;
    }
    if ((m = /^Resets in (.+)$/.exec(s))) {
      let rest = m[1]
        .replace(/<1m/, '<1min')
        .replace(/(\d+)d/, '$1d')
        .replace(/(\d+)h/, '$1h')
        .replace(/(\d+)m/, '$1min');
      return `Reinicia em ${rest}`;
    }

    // Credits & Account
    if ((m = /^Available AI Credits:\s*(.+)$/.exec(s))) {
      return `Créditos de IA disponíveis: ${m[1]}`;
    }
    if ((m = /^Your Plan:\s*(.+)$/.exec(s))) {
      return `Seu plano: ${m[1]}`;
    }
    if ((m = /^Project ID:\s*(.+)$/.exec(s))) {
      return `ID do projeto: ${m[1]}`;
    }
    if ((m = /^Shared with:\s*(.+)$/.exec(s))) {
      return `Compartilhado com: ${m[1]}`;
    }
    if ((m = /^Send feedback as\s+(.+)$/.exec(s))) {
      return `Enviar feedback como ${m[1]}`;
    }

    // Modified in project
    if ((m = /^Modified in (\d+) projects?$/.exec(s))) {
      return `Modificado em ${m[1]} ${m[1] === '1' ? 'projeto' : 'projetos'}`;
    }
    if ((m = /^(\d+) projects?$/.exec(s))) {
      return `${m[1]} ${m[1] === '1' ? 'projeto' : 'projetos'}`;
    }
    if ((m = /^(\d+) tools?$/.exec(s))) {
      return `${m[1]} ${m[1] === '1' ? 'ferramenta' : 'ferramentas'}`;
    }

    // Feature gating & Developer
    if ((m = /^gates (.+) \+(\d+) more$/.exec(s))) {
      return `controla ${m[1]} e mais ${m[2]}`;
    }
    if ((m = /^gates (.+)$/.exec(s))) {
      return `controla ${m[1]}`;
    }
    if ((m = /^Reset (\d+) override(s)?$/.exec(s))) {
      return `Redefinir ${m[1]} substituição${m[1] === '1' ? '' : 'ões'}`;
    }
    if ((m = /^Active environment:\s*os=(.+)$/.exec(s))) {
      return `Ambiente ativo: os=${m[1]}`;
    }

    
    // Media and date/time formatting (24h format and day-of-week translation)
    if ((m = /^(?:Media|Mídia)\s*\((.+)\)$/i.exec(s))) {
      return `Mídia (${formatDateTimePtBr(m[1])})`;
    }
    if (/^(?:Today|Yesterday|Tomorrow|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/i.test(s)) {
      return formatDateTimePtBr(s);
    }
    if (/^\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)$/i.test(s)) {
      return formatDateTimePtBr(s);
    }

    // Version dynamic labels
    if ((m = /^Version\s+(.+)$/i.exec(s))) {
      return `Versão ${m[1]}`;
    }
    if ((m = /^Version:\s*(.+)$/i.exec(s))) {
      return `Versão: ${m[1]}`;
    }

    // Additional external link and workspace dynamic labels
    if ((m = /^Opens external link:\s*(.+)$/i.exec(s))) {
      return `Abre link externo: ${m[1]}`;
    }
    if ((m = /^Current workspace:\s*(.+)$/i.exec(s))) {
      return `Espaço de trabalho atual: ${m[1]}`;
    }
    if ((m = /^Select model,\s*current(?:ly)?:\s*(.+)$/i.exec(s))) {
      let model = m[1].trim();
      const effortMap = { thinking: "Raciocínio", low: "Baixo", medium: "Médio", high: "Alto", max: "Máximo" };
      model = model.replace(/\b(Thinking|Low|Medium|High|Max)\b/gi, (match) => effortMap[match.toLowerCase()] || match);
      return `Selecionar modelo, atual: ${model}`;
    }
    if ((m = /^Load earlier messages,\s*showing\s+(\d+)\s+of\s+(\d+)$/i.exec(s))) {
      return `Carregar mensagens anteriores, exibindo ${m[1]} de ${m[2]}`;
    }

    // MCP
    if ((m = /^No MCP servers found for ["']?(.+?)["']?$/.exec(s))) {
      return `Nenhum servidor MCP encontrado para "${m[1]}"`;
    }


    // Queued message shortcut tooltips
    if ((m = /^(.+?)\s+Queues after the turn$/i.exec(s))) {
      return `${m[1]} Coloca na fila após o turno`;
    }
    if ((m = /^(.+?)\s+Sends immediately$/i.exec(s))) {
      return `${m[1]} Envia imediatamente`;
    }
    if ((m = /^(.+?)\s+On empty prompt,\s*sends next in queue$/i.exec(s))) {
      return `${m[1]} Com o prompt vazio, envia a próxima da fila`;
    }

    // Active and archived conversation counts
    function resolveConvCount(str) {
      if (!str) return str;
      const t = str.trim();
      let match;
      if ((match = /^(\d+)\s+active\s+conversations?\s+and\s+(\d+)\s+archived\s+conversations?$/i.exec(t))) {
        const act = match[1] === "1" ? "1 conversa ativa" : `${match[1]} conversas ativas`;
        const arc = match[2] === "1" ? "1 conversa arquivada" : `${match[2]} conversas arquivadas`;
        return `${act} e ${arc}`;
      }
      if ((match = /^(\d+)\s+active\s+conversations?$/i.exec(t))) {
        return match[1] === "1" ? "1 conversa ativa" : `${match[1]} conversas ativas`;
      }
      if ((match = /^(\d+)\s+archived\s+conversations?$/i.exec(t))) {
        return match[1] === "1" ? "1 conversa arquivada" : `${match[1]} conversas arquivadas`;
      }
      return str;
    }

    if ((m = /^(\d+)\s+active\s+conversations?\s+and\s+(\d+)\s+archived\s+conversations?$/i.exec(s))) {
      const act = m[1] === "1" ? "1 conversa ativa" : `${m[1]} conversas ativas`;
      const arc = m[2] === "1" ? "1 conversa arquivada" : `${m[2]} conversas arquivadas`;
      return `${act} e ${arc}`;
    }
    if ((m = /^(\d+)\s+active\s+conversations?$/i.exec(s))) {
      return m[1] === "1" ? "1 conversa ativa" : `${m[1]} conversas ativas`;
    }
    if ((m = /^(\d+)\s+archived\s+conversations?$/i.exec(s))) {
      return m[1] === "1" ? "1 conversa arquivada" : `${m[1]} conversas arquivadas`;
    }
    if ((m = /^(?:Excluir permanentemente|Permanently delete)\s+(.+?)\s+(?:including|incluindo)\s+(.+?)\.?$/i.exec(s))) {
      const trCount = resolveConvCount(m[2]);
      return `Excluir permanentemente ${m[1]} incluindo ${trCount}.`;
    }
    if ((m = /^Are you sure you want to delete the (project|workspace)\s+(.+?)\?$/i.exec(s))) {
      const t = m[1].toLowerCase() === "workspace" ? "espaço de trabalho" : "projeto";
      return `Tem certeza de que deseja excluir o ${t} ${m[2]}?`;
    }
    if ((m = /^This will permanently delete\s+(.+?)\s+within it\.?$/i.exec(s))) {
      const trCount = resolveConvCount(m[1]);
      return `Isso excluirá permanentemente ${trCount} dentro dele.`;
    }
    if ((m = /^(Project|Workspace|Conversation)\s+deleted\.?$/i.exec(s))) {
      const t = m[1].toLowerCase() === "workspace" ? "Espaço de trabalho excluído" : (m[1].toLowerCase() === "conversation" ? "Conversa excluída" : "Projeto excluído");
      return s.endsWith('.') ? `${t}.` : t;
    }
    if ((m = /^(Project|Workspace|Conversation)\s+(.+?)\s+deleted\.?$/i.exec(s))) {
      const t = m[1].toLowerCase() === "workspace" ? "Espaço de trabalho" : (m[1].toLowerCase() === "conversation" ? "Conversa" : "Projeto");
      return `${t} ${m[2]} excluído.`;
    }
    if ((m = /^Deleted\s+(project|workspace|conversation)\s+(.+?)\.?$/i.exec(s))) {
      const t = m[1].toLowerCase() === "workspace" ? "Espaço de trabalho" : (m[1].toLowerCase() === "conversation" ? "Conversa" : "Projeto");
      return `${t} ${m[2]} excluído.`;
    }

    // Breakdown & Tools
    if ((m = /^Show\s+(\d+)\s+breakdowns?$/i.exec(s))) {
      return `Mostrar ${m[1]} ${m[1] === '1' ? 'detalhamento' : 'detalhamentos'}`;
    }
    if ((m = /^Hide\s+(\d+)\s+breakdowns?$/i.exec(s))) {
      return `Ocultar ${m[1]} ${m[1] === '1' ? 'detalhamento' : 'detalhamentos'}`;
    }
    if ((m = /^(\d+)\s+tools?$/i.exec(s))) {
      return `${m[1]} ${m[1] === '1' ? 'ferramenta' : 'ferramentas'}`;
    }
    if ((m = /^(\d+)\s+demoted$/i.exec(s))) {
      return `${m[1]} ${m[1] === '1' ? 'rebaixada' : 'rebaixadas'}`;
    }
    if ((m = /^(\d+)\s+excluded$/i.exec(s))) {
      return `${m[1]} ${m[1] === '1' ? 'excluído' : 'excluídos'}`;
    }
    if ((m = /^(\d+)\s+tools?\s+excluded$/i.exec(s))) {
      return `${m[1]} ${m[1] === '1' ? 'ferramenta excluída' : 'ferramentas excluídas'}`;
    }

    // Token budget explanations
    if ((m = /^Exceeded the rules token budget\.\s*Full rule content\s*\((.+?)\)\s*was replaced with a lightweight file-path pointer in context\.?$/i.exec(s))) {
      return `Excedeu o limite de tokens de regras. O conteúdo completo da regra (${m[1]}) foi substituído por um ponteiro leve de caminho de arquivo no contexto.`;
    }
    if ((m = /^All tools in this MCP server\s*\((.+?)\)\s*exceeded the customization budget and were excluded from context\.?$/i.exec(s))) {
      return `Todas as ferramentas neste servidor MCP (${m[1]}) excederam o limite de personalização e foram excluídas do contexto.`;
    }
    if ((m = /^(\d+)\s+tools?\s+in this MCP server\s*\((.+?)\)\s*exceeded the customization budget and were excluded from context\.?$/i.exec(s))) {
      const trTool = m[1] === '1' ? 'ferramenta' : 'ferramentas';
      return `${m[1]} ${trTool} neste servidor MCP (${m[2]}) excederam o limite de personalização e foram excluídas do contexto.`;
    }
    if ((m = /^Exceeded the customization token budget\s*\((.+?)\)\s*and was excluded from context\.?$/i.exec(s))) {
      return `Excedeu o limite de tokens de personalização (${m[1]}) e foi excluído do contexto.`;
    }
    if ((m = /^(\d+)\s+rules?\s+exceeded the rules budget and (?:was|were) demoted from full inline content to a file-path pointer\.?$/i.exec(s))) {
      const trRules = m[1] === '1' ? 'regra excedeu o limite de regras e foi rebaixada' : 'regras excederam o limite de regras e foram rebaixadas';
      return `${m[1]} ${trRules} do conteúdo embutido completo para um ponteiro de caminho de arquivo.`;
    }
    if ((m = /^(\d+)\s+items?\s+in\s+(.+?)\s+exceeded the customization budget and (?:was|were) excluded from context\.?$/i.exec(s))) {
      const trItem = m[1] === '1' ? 'item' : 'itens';
      const trVerb = m[1] === '1' ? 'excedeu o limite de personalização e foi excluído' : 'excederam o limite de personalização e foram excluídos';
      return `${m[1]} ${trItem} em ${m[2]} ${trVerb} do contexto.`;
    }

    // Model notices & third party models
    if ((m = /^(.+?)\s+is now available on paid Pro and Ultra plans\.\s*Third-party model access will no longer be available on your current plan starting on\s+(.+?)\.?$/i.exec(s))) {
      let dt = m[2];
      dt = dt.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/gi, (_, mon, day, yr) => `${day} de ${formatDateTimePtBr(mon).toLowerCase()} de ${yr}`);
      return `O ${m[1]} já está disponível nos planos pagos Pro e Ultra. O acesso a modelos de terceiros não estará mais disponível em seu plano atual a partir de ${dt}.`;
    }
    if ((m = /^Third-party model access will no longer be available on your current plan starting on\s+(.+?)\.?$/i.exec(s))) {
      let dt = m[1];
      dt = dt.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/gi, (_, mon, day, yr) => `${day} de ${formatDateTimePtBr(mon).toLowerCase()} de ${yr}`);
      return `O acesso a modelos de terceiros não estará mais disponível em seu plano atual a partir de ${dt}.`;
    }
    if ((m = /^(.+?)\s+will be removed from Antigravity on\s+(.+?)\.?$/i.exec(s))) {
      let dt = m[2];
      dt = dt.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/gi, (_, mon, day, yr) => `${day} de ${formatDateTimePtBr(mon).toLowerCase()} de ${yr}`);
      return `O ${m[1]} será removido do Antigravity em ${dt}.`;
    }
    if ((m = /^(.+?)\s+is currently available to\s+(.+?)\s+plan subscribers\.?$/i.exec(s))) {
      return `O ${m[1]} está disponível atualmente para assinantes do plano ${m[2]}.`;
    }
    if ((m = /^Message queued\.\s*(\d+)\s+messages in queue\.$/i.exec(s))) {
      return `Mensagem na fila. ${m[1]} mensagens na fila.`;
    }
    if ((m = /^(\d+)\s+attachments?$/i.exec(s))) {
      return `${m[1]} ${m[1] === "1" ? "anexo" : "anexos"}`;
    }
    if ((m = /^Configure\s+(.+)$/i.exec(s))) {
      return `Configurar ${m[1]}`;
    }
    if ((m = /^The\s+(.+?)\s+MCP server requires configuration parameters before it can be started\.$/i.exec(s))) {
      return `O servidor MCP ${m[1]} requer parâmetros de configuração antes de poder ser iniciado.`;
    }
    if ((m = /^Low contrast ratio\s*\((.+?)\)\.\s*Text may be hard to read\.?$/i.exec(s))) {
      return `Baixa proporção de contraste (${m[1]}). O texto pode ficar difícil de ler.`;
    }

    // Model effort labels
    if ((m = /^(.+?)\s*\((Low|Medium|High|Max|Thinking)\)$/i.exec(s))) {
      const effortMap = {
        thinking: "Raciocínio",
        low: "Baixo",
        medium: "Médio",
        high: "Alto",
        max: "Máximo"
      };
      const trEffort = effortMap[m[2].toLowerCase()] || m[2];
      return `${m[1]} (${trEffort})`;
    }
    if ((m = /^(.+?)\s+(Low|Medium|High|Max|Thinking)$/i.exec(s))) {
      const effortMap = {
        thinking: "Raciocínio",
        low: "Baixo",
        medium: "Médio",
        high: "Alto",
        max: "Máximo"
      };
      const trEffort = effortMap[m[2].toLowerCase()] || m[2];
      return `${m[1]} ${trEffort}`;
    }
    if ((m = /^(Low|Medium|High|Max|Thinking)$/i.exec(s))) {
      const effortMap = {
        thinking: "Raciocínio",
        low: "Baixo",
        medium: "Médio",
        high: "Alto",
        max: "Máximo"
      };
      return effortMap[m[1].toLowerCase()] || m[1];
    }

    // Plugins Build with Google / Dinâmico
    if ((m = /^Build with (.+?) Plugins$/i.exec(s))) {
      return `Plugins criados com o ${m[1]}`;
    }
    if ((m = /^Build With (.+?) Plugins$/i.exec(s))) {
      return `Plugins criados com o ${m[1]}`;
    }
    if ((m = /^Plugins Build With (.+)$/i.exec(s))) {
      return `Plugins criados com o ${m[1]}`;
    }
    if ((m = /^There are currently no Build with (.+?) plugins available\.?$/i.exec(s))) {
      return `No momento, não há plugins criados com o ${m[1]} disponíveis.`;
    }
    if ((m = /^Plugins are packaged collections of skills and MCPs to help the Agent in (.+?) work with Google developer products\. You can always change your choices in Settings\.?$/i.exec(s))) {
      return `Os plugins são coleções empacotadas de habilidades e servidores MCP para ajudar o agente no ${m[1]} a trabalhar com produtos de desenvolvimento do Google. Você sempre pode alterar suas opções nas Configurações.`;
    }

    // Configurações de Servidores MCP Dinâmicas (para novos servidores e campos futuros)
    if ((m = /^\(Optional\)\s*(.+)$/i.exec(s))) {
      const trInner = translateString(m[1]) || m[1];
      return `(Opcional) ${trInner}`;
    }
    if ((m = /^\(Required\)\s*(.+)$/i.exec(s))) {
      const trInner = translateString(m[1]) || m[1];
      return `(Obrigatório) ${trInner}`;
    }
    if ((m = /^Your\s+(.+?)\s+(API Key|Token|Personal Access Token)\.?$/i.exec(s))) {
      const lower = m[2].toLowerCase();
      const trType = lower.includes('personal access token') ? 'token de acesso pessoal' : (lower.includes('token') ? 'token' : 'chave de API');
      return `Seu ${trType} do ${m[1]}.`;
    }
    if ((m = /^Your\s+(.+?)\s+API\s+(Key|Token)$/i.exec(s))) {
      return `Sua chave/token de API do ${m[1]}`;
    }
    if ((m = /^Delete\s+(.+?)\s+MCP Server$/i.exec(s))) {
      return `Excluir servidor MCP ${m[1]}`;
    }

    // Notificações de Cota e Créditos de IA (Tooltip / Popover / Erro)
    if (s.includes('AI Credits') || s.includes('AI credits') || s.includes('baseline quota') || s.includes('overages') || s.includes('quota will refresh')) {
      let tr = s;
      tr = tr.replace(/You need (at least \d+|more) AI Credits to send messages\./gi, function(match, p1) {
        const trP1 = p1.toLowerCase().includes('more') ? 'mais' : p1.replace(/at least/i, 'pelo menos');
        return 'Você precisa de ' + trP1 + ' créditos de IA para enviar mensagens.';
      });
      tr = tr.replace(/To continue using (.+?) now, purchase more AI Credits\./gi, function(match, model) {
        const trModel = translateString(model.trim()) || model.trim();
        return 'Para continuar usando ' + trModel + ' agora, compre mais créditos de IA.';
      });
      tr = tr.replace(/To continue using this model now, enable AI Credit overages\./gi, 'Para continuar usando este modelo agora, ative os excedentes de créditos de IA.');
      tr = tr.replace(/Your plan's baseline quota will refresh on (.+?)\./gi, function(match, dt) {
        return 'A cota básica do seu plano será renovada em ' + formatDateTimePtBr(dt.trim()) + '.';
      });
      tr = tr.replace(/When toggled on,\s*(.+?)\s*will use your AI credits to fulfill model requests once you're out of model quota\.\s*(.+?)\s*will always use your model quota first before using AI credits\./gi, function(match, p1, p2) {
        return 'Quando ativado, ' + p1 + ' usará seus créditos de IA para atender às solicitações do modelo quando sua cota de modelo acabar. ' + p2 + ' sempre usará sua cota de modelo primeiro antes de usar os créditos de IA.';
      });
      if (tr !== s) {
        return tr;
      }
    }

    // Ambiente e Worktree Dinâmicos
    if ((m = /^Environment:\s*(.+)$/i.exec(s))) {
      const trEnv = translateString(m[1]) || m[1];
      return `Ambiente: ${trEnv}`;
    }
    if ((m = /^Select Environment\s*\((.+?)\)$/i.exec(s))) {
      return `Selecionar ambiente (${m[1]})`;
    }
    if ((m = /^Select Worktree\s*\((.+?)\)$/i.exec(s))) {
      return `Selecionar worktree (${m[1]})`;
    }
    if ((m = /^Work locally on\s+(.+)$/i.exec(s))) {
      return `Trabalhar localmente em ${m[1]}`;
    }
    if ((m = /^Worktree from\s+(.+)$/i.exec(s))) {
      return `Worktree a partir de ${m[1]}`;
    }
    if ((m = /^Work in\s+(.+)$/i.exec(s))) {
      return `Trabalhar em ${m[1]}`;
    }
    if ((m = /^Automatically create a new (.+?) workspace when the conversation starts$/i.exec(s))) {
      return `Criar automaticamente um novo espaço de trabalho ${m[1]} quando a conversa iniciar`;
    }
    if ((m = /^Automatically create a new (.+?) workspace when the conversation starts,\s*and reuse\s+(.+)$/i.exec(s))) {
      return `Criar automaticamente um novo espaço de trabalho ${m[1]} quando a conversa iniciar e reutilizar ${m[2]}`;
    }
    if ((m = /^Worktree from (.+?),\s*and reuse\s+(.+)$/i.exec(s))) {
      return `Worktree a partir de ${m[1]} e reutilizar ${m[2]}`;
    }
    if ((m = /^Failed to save project branch:\s*(.+)$/i.exec(s))) {
      const trErr = translateString(m[1]) || m[1];
      return `Falha ao salvar branch do projeto: ${trErr}`;
    }
    if ((m = /^Failed to create worktree:\s*(.+)$/i.exec(s))) {
      return `Falha ao criar worktree: ${m[1]}`;
    }
    if ((m = /^No such environment:\s*(.+)$/i.exec(s))) {
      return `Nenhum ambiente encontrado: ${m[1]}`;
    }

    // Avisos de Rede e Desconexão Dinâmicos
    if ((m = /^(?:Connection lost|Lost connection)\.?\s*Reconnecting\.\.\.$/i.exec(s))) {
      return "Conexão perdida. Reconectando...";
    }
    if ((m = /^No internet\.?\s*Agent features may not work\.?$/i.exec(s))) {
      return "Sem internet. Os recursos do agente podem não funcionar.";
    }
    if ((m = /^Lost connection to (.+?)\.?\s*Agent features may not work\.?$/i.exec(s))) {
      return `Conexão perdida com ${m[1]}. Os recursos do agente podem não funcionar.`;
    }

    return null;
  }

  function translateString(raw) {
    if (!raw || typeof raw !== 'string') return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;
    if (EXACT_MAP[trimmed]) {
      return raw.replace(trimmed, EXACT_MAP[trimmed]);
    }
    const dyn = translateDynamic(trimmed);
    if (dyn) {
      return raw.replace(trimmed, dyn);
    }
    return null;
  }

  const SKIP_TAGS = new Set(['PRE', 'CODE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SVG', 'PATH', 'MATH']);

  function shouldSkipElement(el) {
    if (!el || el.nodeType !== 1) return true;
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.isContentEditable) return true;
    if (el.closest && el.closest('pre, code, script, style, textarea, input, [contenteditable="true"], .monaco-editor, .xterm, .katex, [data-testid="user-input-step"]')) return true;
    return false;
  }

  function translateTextNode(node) {
    const parent = node.parentElement;
    if (!parent || shouldSkipElement(parent)) return;
    const val = node.nodeValue;
    if (!val || val.length > 4000) return;
    const trimmed = val.trim();
    if (trimmed === 'No') {
      // Em português 'No' é uma palavra comum (em + o).
      // Só traduz para 'Não' se estiver comprovadamente dentro de um botão de ação.
      if (parent.tagName === 'BUTTON' || parent.getAttribute('role') === 'button' || (parent.closest && parent.closest('button, [role="button"]'))) {
        node.nodeValue = val.replace('No', 'Não');
      }
      return;
    }
    const tr = translateString(val);
    if (tr && tr !== val) {
      node.nodeValue = tr;
    }
  }

  const ATTRS = ['placeholder', 'title', 'aria-label', 'data-tooltip-content'];
  function translateElementAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    for (const attr of ATTRS) {
      if (el.hasAttribute(attr)) {
        const val = el.getAttribute(attr);
        if (val && !val.startsWith('/')) {
          const tr = translateString(val);
          if (tr && tr !== val) {
            el.setAttribute(attr, tr);
          }
        }
      }
    }
  }

  function walkAndTranslate(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) {
      translateElementAttrs(root);
      if (shouldSkipElement(root)) return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      if (n.nodeType === 3) {
        translateTextNode(n);
      } else if (n.nodeType === 1) {
        translateElementAttrs(n);
      }
    }
  }


  // Global settings access & fullscreen support
  function toggleSettingsModal() {
    const closeBtn = document.querySelector('[data-testid="close-settings"], button[aria-label="Fechar"], button[aria-label="Close"]');
    const modal = document.querySelector('[data-testid="settings-modal"], [role="dialog"]');
    if (closeBtn && modal && (modal.innerText.includes("Configurações") || modal.innerText.includes("Settings"))) {
      closeBtn.click();
      return;
    }
    const settingsBtn = document.querySelector('[data-testid="settings-button"]');
    if (settingsBtn) {
      settingsBtn.click();
      return;
    }
    const allButtons = Array.from(document.querySelectorAll("button"));
    const sb = allButtons.find(b => b.innerText.trim() === "Configurações" || b.innerText.trim() === "Settings");
    if (sb) {
      sb.click();
    }
  }

  // Keyboard shortcut Ctrl+, and Cmd+, (accessible from anywhere, including fullscreen)
  if (!window.__CAMBRITH_SETTINGS_SHORTCUT_BOUND__) {
    window.__CAMBRITH_SETTINGS_SHORTCUT_BOUND__ = true;
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "," || e.code === "Comma")) {
        e.preventDefault();
        e.stopPropagation();
        toggleSettingsModal();
      }
    }, true);
    window.addEventListener("resize", ensureFullscreenSettingsButton);
    document.addEventListener("fullscreenchange", ensureFullscreenSettingsButton);
    setInterval(ensureFullscreenSettingsButton, 2000);
  }

  // Floating Fullscreen Settings button (gear icon in fullscreen mode)
  function ensureFullscreenSettingsButton() {
    if (!document.body) return;
    let btn = document.getElementById("cambrith-fullscreen-settings-btn");
    const isFullscreen = !!(document.fullscreenElement || window.fullScreen || (window.innerHeight === screen.height));

    if (!btn) {
      btn = document.createElement("button");
      btn.id = "cambrith-fullscreen-settings-btn";
      btn.setAttribute("aria-label", "Configurações (Ctrl+,)");
      btn.setAttribute("title", "Configurações (Ctrl+,)");
      btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
      Object.assign(btn.style, {
        position: "fixed",
        top: "8px",
        right: "12px",
        zIndex: "9999",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        borderRadius: "6px",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#e4e4e7",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "all 0.15s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      });
      btn.addEventListener("mouseenter", () => {
        btn.style.background = "rgba(255, 255, 255, 0.18)";
        btn.style.transform = "scale(1.05)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.background = "rgba(255, 255, 255, 0.08)";
        btn.style.transform = "scale(1)";
      });
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        toggleSettingsModal();
      });
      document.body.appendChild(btn);
    }
    btn.style.display = isFullscreen ? "flex" : "none";
  }

  const boot = () => {
    walkAndTranslate(document.body || document.documentElement);
    ensureFullscreenSettingsButton();
    if (window.__CAMBRITH_I18N_OBS__) {
      try { window.__CAMBRITH_I18N_OBS__.disconnect(); } catch (_) {}
    }
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'characterData') {
          translateTextNode(m.target);
        } else if (m.type === 'attributes') {
          translateElementAttrs(m.target);
        } else if (m.type === 'childList') {
          for (const node of m.addedNodes) {
            walkAndTranslate(node);
          }
        }
      }
    });
    obs.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });
    window.__CAMBRITH_I18N_OBS__ = obs;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  window.__CAMBRITH_TRANSLATE_STR__ = translateString;
})();
'''

out_paths = [
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "i18n-pt-br.js"),
    "/home/cambrith/.local/opt/antigravity/resources/i18n-pt-br.js",
    "/home/cambrith/.config/Antigravity/i18n/i18n-pt-br.js",
]
for out_path in out_paths:
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(js_body)
    print("Generated:", out_path, "with", len(EXACT_MAP), "exact entries!")
