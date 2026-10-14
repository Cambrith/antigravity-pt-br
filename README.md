# Antigravity pt-BR — Tradução Completa da Interface para Português do Brasil

[![CI Multiplataforma](https://github.com/Cambrith/antigravity-pt-br/actions/workflows/ci.yml/badge.svg)](https://github.com/Cambrith/antigravity-pt-br/actions)
[![Segurança](https://github.com/Cambrith/antigravity-pt-br/actions/workflows/security.yml/badge.svg)](https://github.com/Cambrith/antigravity-pt-br/actions)
[![Licença MIT](https://img.shields.io/badge/licença-MIT-blue.svg)](LICENSE)
[![Plataformas](https://img.shields.io/badge/suporte-Linux%20%7C%20ChromeOS%20%7C%20Windows%20%7C%20macOS-brightgreen.svg)](docs/COMPATIBILITY.md)
[![Traduções](https://img.shields.io/badge/entradas-2.185%2B-blueviolet.svg)](#-o-que-está-traduzido)
[![Testes Automatizados](https://img.shields.io/badge/testes-100%25%20passando-success.svg)](tests/)

Projeto comunitário experimental de localização em Português do Brasil (pt-BR) para o **Google Antigravity**, projetado para funcionar de forma transparente no **Linux** (múltiplas distribuições), **ChromeOS**, **Windows** e **macOS**.

---

> **Estado de validação (outubro de 2026):** a aplicação da tradução foi observada no Linux/CachyOS do mantenedor. A CI verifica lógica e sintaxe em runners de Linux, Windows e macOS, mas **não executa a interface real do Antigravity nesses três sistemas**. Os instaladores de Windows e macOS continuam experimentais. A instalação em aplicativos macOS assinados é bloqueada preventivamente até existir uma estratégia de assinatura validada. Não execute em uma instalação que não possa ser restaurada/reinstalada.
>
> **Backups anteriores a esta correção:** cópias `app.asar.bak-original` sem manifesto SHA-256 são intencionalmente recusadas pelo novo desinstalador. Não restaure esses backups manualmente após atualizar o Antigravity: podem pertencer a outra versão.

## 🎯 Propósito do Projeto

O **Google Antigravity** é um dos ambientes de pair programming e automação mais avançados do mercado, porém toda a sua interface, modais de configuração, catálogo de servidores MCP e avisos de sistema são originalmente fornecidos apenas em inglês.

Este projeto resolve essa barreira entregando:
1. **Tradução ampla, em validação**: Mais de 2.185 termos literais e dezenas de regras dinâmicas que traduzem desde menus e configurações até avisos complexos de cotas e todos os 99 servidores MCP.
2. **Reaplicação controlada**: o inicializador tenta reaplicar a tradução, mas versões que não contêm os pontos de injeção esperados são recusadas, preservando o pacote oficial.
3. **Multiplataforma Real**: Instaladores e patchers dedicados para Linux, ChromeOS, macOS e Windows com zero dependências externas compiladas.
4. **Respeito à Linguagem Natural**: Proteção do texto de prompts e respostas do chat, garantindo que palavras do português (como a preposição *"no"*) nunca sofram alterações indevidas.

---

## 🖥️ Sistemas catalogados e estado da compatibilidade

Há caminhos e fluxos previstos para as plataformas a seguir; isso NÃO implica homologação em todas elas (veja a [Matriz Detalhada](docs/COMPATIBILITY.md)):

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

👉 *Para consultar o catálogo massivo completo com todas as 395 entradas de distribuições Linux e 6 variantes ChromeOS catalogadas (sem homologação individual), consulte [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md).*

---

## 📦 Instalação em Poucos Passos

> **Pré-requisito único**: Ter o **Node.js** (v18 ou superior) instalado em seu computador.

### 🐧 No Linux

Abra o terminal e execute:

```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install.sh
./install.sh
```

*O instalador detecta automaticamente a instalação do Antigravity, salva o arquivo permanente e configura um inicializador com auto-recuperação pós-atualizações.*

---

### 🌐 No ChromeOS (Crostini)

1. Ative o ambiente Linux nas Configurações do ChromeOS (*Avançado > Desenvolvedores > Ambiente de desenvolvimento Linux*).
2. Abra o aplicativo **Terminal** e execute:

```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install.sh
./install.sh
```

---

### 🪟 No Windows

Abra o **PowerShell** e execute:

```powershell
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install.ps1
```

---

### 🍏 No macOS

Abra o Terminal e execute:

```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install-macos.sh
./install-macos.sh
```

---

## 🌟 O que está Traduzido?

| Módulo / Recurso | Detalhes da Localização |
|---|---|
| **Interface e Configurações** | Menus de contexto nativo, barra lateral, configurações de agente, temas, atalhos, painéis e diálogos. |
| **Catálogo de Servidores MCP** | Todos os 99 servidores MCP mapeados, incluindo campos de configuração (Tokens, API Keys, URLs e descrições). |
| **Cotas e Créditos de IA** | Alertas de cotas semanais e de 5 horas, limites esgotados, opções de upgrade e renovações com data/hora formatada. |
| **Avisos de Conexão e Rede** | Indicadores de modo offline ("Sem internet", "Conexão perdida", "Reconectando..."). |
| **Formulário de Feedback** | 100% dos campos, categorias de relato de problemas, placeholders e botões de envio. |
| **Datas e Tempos** | Conversão para padrão 24 horas (`17:26:38`), dias da semana e meses em português brasileiro. |

---

## 🛡️ Arquitetura e Engenharia de Persistência

Para entender em detalhes como o patcher manipula o arquivo `app.asar` mantendo integridade SHA-256 e como o `MutationObserver` atua no ciclo de vida do Electron, consulte o documento:
👉 **[Documentação de Arquitetura (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md)**

---

## 🧪 Qualidade e Testes Automatizados

O repositório inclui uma suíte completa de testes unitários que garantem a qualidade e a ausência de regressões:

```bash
npm test
```

Os testes unitários são executados automaticamente a cada Pull Request em runners de **Linux, Windows e macOS** via **GitHub Actions CI**. Isso não substitui testes end-to-end no aplicativo real nem testes de assinatura no macOS.

---

## 🔄 Desinstalação (Restauração do Original)

O instalador cria uma cópia de segurança (`app.asar.bak-original`) e um manifesto (`app.asar.cambrith-backup.json`) que vincula, por SHA-256, a cópia ao pacote efetivamente modificado. A restauração só ocorre quando os hashes correspondem. Caso queira reverter:

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
