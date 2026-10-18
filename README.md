# Antigravity pt-BR — Tradução Completa da Interface para Português do Brasil

[![CI Multiplataforma](https://github.com/Cambrith/antigravity-pt-br/actions/workflows/ci.yml/badge.svg)](https://github.com/Cambrith/antigravity-pt-br/actions)
[![Segurança](https://github.com/Cambrith/antigravity-pt-br/actions/workflows/security.yml/badge.svg)](https://github.com/Cambrith/antigravity-pt-br/actions)
[![Licença MIT](https://img.shields.io/badge/licença-MIT-blue.svg)](LICENSE)
[![Plataformas](https://img.shields.io/badge/suporte-Linux%20%7C%20ChromeOS%20%7C%20Windows%20%7C%20macOS-brightgreen.svg)](docs/COMPATIBILITY.md)
[![Traduções](https://img.shields.io/badge/entradas-2.270%2B-blueviolet.svg)](#-o-que-está-traduzido)
[![Testes Automatizados](https://img.shields.io/badge/testes-100%25%20passando-success.svg)](tests/)

Sistema profissional, robusto e persistente de localização em Português do Brasil (pt-BR) para o **Google Antigravity**, projetado para funcionar de forma transparente no **Linux** (múltiplas distribuições), **ChromeOS**, **Windows** e **macOS**.

---

## 🎯 Propósito do Projeto

O **Google Antigravity** é um dos ambientes de pair programming e automação mais avançados do mercado, porém toda a sua interface, modais de configuração, catálogo de servidores MCP e avisos de sistema são originalmente fornecidos apenas em inglês.

Este projeto resolve essa barreira entregando:
1. **Tradução Integral e Fiel**: Mais de 2.270 termos literais e dezenas de regras dinâmicas que traduzem desde menus e configurações até avisos complexos de cotas e todos os 99 servidores MCP.
2. **Persistência Contra Atualizações**: Uma arquitetura em camadas que impede que as traduções se percam quando o Antigravity for atualizado automaticamente.
3. **Multiplataforma Real**: Instaladores e patchers dedicados para Linux, ChromeOS, macOS e Windows com zero dependências externas compiladas.
4. **Respeito à Linguagem Natural**: Proteção do texto de prompts e respostas do chat, garantindo que palavras do português (como a preposição *"no"*) nunca sofram alterações indevidas.

---

O acesso a **Configurações** usa o botão original no rodapé da barra lateral, em janela normal e em tela cheia. O rodapé mantém seu espaço em janelas menores, com botão de maior contraste e sem uma engrenagem flutuante sobre os controles da janela. Em telas compactas, o app inicia maximizado pela área útil do gerenciador de janelas; ao restaurar, reserva margem vertical para evitar que o rodapé fique fora da tela. Também é possível usar **Ctrl+,** (ou **⌘+,** no macOS).

## 🖥️ Matriz de Sistemas e Distribuições Homologadas

O projeto foi validado nas seguintes plataformas (veja a [Matriz Detalhada](docs/COMPATIBILITY.md)):

- **Linux (Principais Distribuições do Mercado por Família)**:
  - **Família Debian**: Debian, MX Linux, Kali Linux, Raspberry Pi OS.
  - **Família Ubuntu**: Ubuntu (Desktop/Server), Linux Mint, Pop!_OS, Zorin OS, elementary OS.
  - **Família Red Hat, Fedora, SUSE e RPM**: Fedora, Red Hat Enterprise Linux (RHEL), openSUSE (Leap/Tumbleweed), Rocky Linux, AlmaLinux.
  - **Família Arch Linux**: Arch Linux, Manjaro, SteamOS (Steam Deck), EndeavourOS.
  - **Família Slackware e Derivados Leves**: Slackware, Puppy Linux.
  - **Família Gentoo, Void e Baseadas em Código-Fonte**: Gentoo Linux, Void Linux.
  - **Distribuições Independentes**: Alpine Linux, NixOS, Solus.
  - **Ambientes e Empacotamentos Universais**: Flatpak (`com.google.Antigravity`), Wayland e X11.
- **ChromeOS**:
  - Suporte completo e nativo no **ChromeOS**, **ChromeOS Flex** e **FydeOS** através do contêiner oficial Crostini.
- **Windows**:
  - **Windows 11** e **Windows 10** (instalações por usuário em `%LOCALAPPDATA%` ou por máquina em `C:\Program Files`).
- **macOS**:
  - **macOS Sequoia (15)**, **Sonoma (14)**, **Ventura (13)** e **Monterey (12)**.
  - Compatível com **Apple Silicon** (M1, M2, M3, M4) e processadores **Intel (x86_64)**.

👉 *Para consultar o catálogo massivo completo com todas as 395 distribuições Linux e 6 sistemas ChromeOS homologados por família técnica, consulte [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md).*

---

## 📦 Instalação em Poucos Passos

> [!IMPORTANT]
> **Pré-requisitos**:
> - **Node.js** (v18 ou superior) instalado no sistema ([nodejs.org](https://nodejs.org/)).
> - O **Git** é opcional: todas as plataformas abaixo contam com opções de instalação com Git e sem Git (download direto via terminal).

### 🐧 No Linux

#### Opção 1: Via Git (Recomendado se já tiver o Git)
```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install.sh
./install.sh
```

#### Opção 2: Sem Git (Download Direto via Terminal)
```bash
curl -sSL https://github.com/Cambrith/antigravity-pt-br/archive/refs/heads/main.tar.gz | tar -xz && cd antigravity-pt-br-main && chmod +x install.sh && ./install.sh
```

*O instalador detecta automaticamente a instalação do Antigravity, salva o arquivo permanente e configura um inicializador com auto-recuperação pós-atualizações.*

---

### 🌐 No ChromeOS (Crostini)

1. Ative o ambiente Linux nas Configurações do ChromeOS (*Avançado > Desenvolvedores > Ambiente de desenvolvimento Linux*).
2. Abra o aplicativo **Terminal** e escolha uma das opções:

#### Opção 1: Via Git
```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install.sh
./install.sh
```

#### Opção 2: Sem Git (Download Direto)
```bash
curl -sSL https://github.com/Cambrith/antigravity-pt-br/archive/refs/heads/main.tar.gz | tar -xz && cd antigravity-pt-br-main && chmod +x install.sh && ./install.sh
```

---

### 🪟 No Windows

#### Opção 1: Via Git (Recomendado se já tiver o Git)
Abra o **PowerShell** e execute:

```powershell
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install.ps1
```

#### Opção 2: Sem Git (Download Direto via PowerShell)
Se você não tem o Git instalado, abra o **PowerShell** e cole o comando único abaixo:

```powershell
Invoke-WebRequest -Uri "https://github.com/Cambrith/antigravity-pt-br/archive/refs/heads/main.zip" -OutFile "$HOME\antigravity.zip"; Expand-Archive -Path "$HOME\antigravity.zip" -DestinationPath "$HOME" -Force; cd "$HOME\antigravity-pt-br-main"; Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\install.ps1
```

*(Ou baixe manualmente clicando no botão verde **Code** > **Download ZIP** no topo da página do GitHub, extraia a pasta e execute o script `install.ps1` no PowerShell).*

---

### 🍏 No macOS

#### Opção 1: Via Git (Recomendado se já tiver o Git)
Abra o Terminal e execute:

```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install-macos.sh
./install-macos.sh
```

#### Opção 2: Sem Git (Download Direto via Terminal)
Abra o Terminal e execute:

```bash
curl -sSL https://github.com/Cambrith/antigravity-pt-br/archive/refs/heads/main.tar.gz | tar -xz && cd antigravity-pt-br-main && chmod +x install-macos.sh && ./install-macos.sh
```

---

## 🌟 O que está Traduzido?

| Módulo / Recurso | Detalhes da Localização |
|---|---|
| **Interface e Configurações** | Menus de contexto nativo, barra lateral, configurações de agente, temas, atalhos, painéis e diálogos, além de tooltips de documentação e ajuda informativa (`Clique para abrir a documentação`, `Clique para saber mais`, `Clique para copiar`, `Clique para expandir`). |
| **Ambiente, Worktree e Início de Conversa** | Seletores de ambiente (`Local`, `Worktree`, `Clone CitC`), tooltips (`Selecionar ambiente (Ctrl+.)`), descrições explicativas, buscas e histórico de worktrees anteriores, avisos de compatibilidade Git e criação de conversas bifurcadas. |
| **Processos, Tarefas e Comandos em Tempo Real** | Notificações de execução de comandos (`Executando <comando>`, `Executou <comando>`), contadores com concordância no plural e suporte a múltiplas entidades em cabeçalhos de ação (`Explorou 3 arquivos 1 pasta, 3 ações, executou 1 comando`, `Explorando 2 arquivos, executando 1 comando`), monitoramento de tarefas (`1 tarefa em execução`, `2 tarefas em execução`, `Nenhuma tarefa em execução`), status de conclusão/cancelamento em colapsáveis (`<Ação> concluído`, `<Ação> foi cancelado`) e logs internos traduzidos. |
| **Painel Lateral: Git, Skills e Paginação** | Filtros de histórico e alterações com descrições explicativas (`Alterações preparadas no índice e na árvore de trabalho`, `Todas as alterações desde origin/main`), contadores de habilidades ativas (`Habilidades usadas 1`, `Nenhuma habilidade usada`) e paginação dinâmica (`Ver tudo (16)`, `Ver mais`). |
| **Menus de Imagem e Mídias** | Menus de contexto de clique com o botão direito em imagens (`Copiar imagem`, `Salvar imagem`, `Salvar imagem como...`, `Copiar endereço da imagem`, `Abrir imagem em nova guia`). |
| **Pensamentos e Ações do Agente** | Tradução instantânea (< 60ms) de blocos de pensamento interno da IA para Português do Brasil com prefetch proativo via React Fiber em background, preservação estrita de variáveis/comandos via tokens de código (`__CODE_X__`), cabeçalhos e durações do processo de raciocínio (`Processo de raciocínio`, `Pensou por 10s`, `Pensando...`), tradução de sentenças analíticas compostas, resumos de ferramentas em pt-BR e diretrizes globais oficiais ([AGENTS.md](AGENTS.md) / [GEMINI.md](GEMINI.md)) com preservação estrita de códigos originais. |
| **Agentes Especializados e Personalizados** | Localização completa de subagentes e agentes personalizados nas Configurações (`firestore-rules-author`, `flutter_a11y_agent`, `self`, `research`), descrições de papéis, ações de gerenciamento (`Agentes personalizados`, `Novo agente`, `Criar agente personalizado`, `Copiar caminho`, `Excluir agente`, `Duplicar agente`) e alternância de switches acessíveis (`Alternar <agente>`). |
| **Erros e Notificações de Branch** | Alertas toast ao selecionar branch do projeto (`Falha ao salvar branch do projeto: Nenhuma pasta git neste projeto corresponde à pasta`), validações de formato e tratamento dinâmico de erros. |
| **Modelos e Níveis de Raciocínio** | Seletor de modelos com níveis de esforço dinâmicos traduzidos (`Gemini 3.8 Flash Médio`, `Claude Sonnet 4.6 (Raciocínio)`, `Alto`, `Máximo`). |
| **Detalhamento de Tokens e Orçamento** | Contadores de detalhamento (`Mostrar 2 detalhamentos`, `Ocultar detalhamento`), limites de tokens para regras e avisos de exclusão de ferramentas MCP. |
| **Catálogo e Gerenciamento de Servidores MCP** | Todos os 99 servidores MCP e novos servidores mapeados com campos de configuração (Tokens, API Keys, URLs e descrições), controles e status operacionais (`Gerenciar servidores MCP`, `Reiniciar servidor`, `Desativar todas as ferramentas`, `Servidor em execução`), contadores dinâmicos com concordância numérica (`> 30 ferramentas ativadas`, `1 ferramenta ativada`, `ferramentas desativadas`) e tratamento idiomático de erros de Proxy MCP / credenciais ADC (`gcloud auth application-default login` preservado intacto). |
| **Catálogo Oficial de Skills (128 Habilidades)** | Mapeamento completo e tradução oficial de 128 habilidades do ecossistema: Dart & Flutter, GCP / Data Agent Kit (BigQuery, BigFrames, Composer Airflow, Spark), Firebase (Firestore, Data Connect, Auth), Gemini API (Live 3.8, Omni 1.1 Flash), Pesquisa Científica (AlphaFold, AlphaGenome, ChEMBL, UniProt, PubMed), Chrome DevTools e Google Maps. |
| **Página de Plugins e Catálogo Oficial** | Cabeçalho e introdução da loja de plugins com tratamento resiliente contra divisão de nós, descrições completas dos plugins oficiais (Android CLI, Modern Web Guidance, Google Antigravity SDK, Science, Firebase, Chrome DevTools, Gemini API, Developer Knowledge, Data Agent Kit, Dart & Flutter, Maps), botões de ação e status (Baixar, Baixando, Instalado, Atualizar). |
| **Cotas e Créditos de IA** | Alertas de cotas semanais e de 5 horas, limites esgotados, opções de upgrade e renovações com data/hora formatada. |
| **Avisos de Conexão e Rede** | Indicadores de modo offline ("Sem internet", "Conexão perdida", "Reconectando..."). |
| **Formulário de Feedback** | 100% dos campos, categorias de relato de problemas, placeholders e botões de envio. |
| **Datas e Tempos** | Conversão para padrão 24 horas (`17:26:38`), dias da semana e meses em português brasileiro. |

---

## 🔄 Personalizações que sobrevivem às atualizações (Linux)

O inicializador reaplica o patcher antes de abrir o aplicativo e sincroniza os arquivos mestres guardados em `~/.config/Antigravity/i18n`. Na instalação padrão do usuário, o instalador também habilita uma unidade `systemd --user` que observa alterações na pasta `resources` e reaplica as personalizações depois que o `app.asar` estabiliza. Assim, a tradução, o acesso às configurações, o dimensionamento inicial da janela e os controles personalizados permanecem disponíveis após atualizações. O monitor pode ser desativado com `systemctl --user disable --now antigravity-patch-after-update.path`; o inicializador continua fazendo a verificação antes de abrir o app.

Os controles da janela ficam em `cambrith-window-controls.js`, fora do pacote do Antigravity. O patcher mantém esse arquivo e o reaplica junto com a tradução, sem depender de mudanças feitas manualmente dentro do `app.asar`.

## 🛡️ Arquitetura e Engenharia de Persistência

Para entender em detalhes como o patcher manipula o arquivo `app.asar` mantendo integridade SHA-256 e como o `MutationObserver` atua no ciclo de vida do Electron, consulte o documento:
👉 **[Documentação de Arquitetura (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md)**

---

## 🧪 Qualidade e Testes Automatizados

O repositório inclui uma suíte completa de testes unitários que garantem a qualidade e a ausência de regressões:

```bash
npm test
```

Os testes são executados automaticamente a cada Pull Request em **Linux, Windows e macOS** via **GitHub Actions CI**.

---

## 🔄 Desinstalação (Restauração do Original)

O instalador cria automaticamente uma cópia de segurança (`app.asar.bak-original`) antes de aplicar qualquer alteração. Caso queira reverter:

- **Linux / macOS**:
  ```bash
  chmod +x scripts/uninstall.sh
  ./scripts/uninstall.sh
  ```
- **Windows**:
  ```powershell
  .\scripts\uninstall.ps1
  ```

Para mais soluções de problemas comuns, consulte o **[Guia de Resolução de Problemas (docs/TROUBLESHOOTING.md)](docs/TROUBLESHOOTING.md)**.

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Se você encontrou um termo ainda não traduzido ou deseja melhorar uma frase existente:

1. Leia o **[Guia de Contribuição (CONTRIBUTING.md)](CONTRIBUTING.md)**.
2. Siga as orientações do **[Código de Conduta (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md)**.
3. Se desejar reportar um termo não traduzido, use o [Template de Tradução](.github/ISSUE_TEMPLATE/translation_fix.yml).

---

## 🔒 Segurança

Levamos a segurança e a privacidade a sério. Não coletamos telemetria e o patcher não utiliza pacotes npm externos. Para reportar vulnerabilidades de forma responsável, consulte nossa **[Política de Segurança (SECURITY.md)](SECURITY.md)**.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
