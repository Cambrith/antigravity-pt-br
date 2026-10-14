# Antigravity pt-BR — Tradução Completa da Interface para Português do Brasil

[![Licença MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Suporte](https://img.shields.io/badge/plataformas-Linux%20%7C%20macOS%20%7C%20Windows-brightgreen.svg)](#instalação)
[![Traduções](https://img.shields.io/badge/entradas-2.180%2B-blueviolet.svg)](#o-que-está-traduzido)

Sistema completo de localização (i18n) em Português do Brasil para a interface do **Google Antigravity**, desenvolvido para ser multiplataforma, resiliente a atualizações e de fácil instalação.

---

## 🌟 O que está traduzido?

O projeto conta com mais de **2.180 entradas de tradução exata** e um motor inteligente de regras dinâmicas:

- **Interface Principal e Configurações**: Menus de sistema, barra lateral, configurações de agente, temas, atalhos, painéis e diálogos modais.
- **Catálogo Completo de Servidores MCP**: Todos os 99 servidores MCP pré-configurados e seus campos de configuração (tokens, chaves de API, variáveis de ambiente, portas e descrições).
- **Avisos de Conexão e Rede**: Mensagens de aviso de modo offline ("Sem internet", "Conexão perdida", "Reconectando...").
- **Cotas e Créditos de IA**: Alertas dinâmicos de limite de modelo, saldo de créditos de IA, avisos de renovação de plano com data/hora formatada.
- **Formulário de Feedback e Suporte**: Todos os campos, opções de categoria, botões e instruções traduzidos integralmente.
- **Plugins Google**: "Plugins criados com o Google", descrições e gerenciamento.
- **Menus de Contexto e Bandeja**: Menus nativos de clique direito (Copiar, Colar, Recortar, Nova janela, etc.) e ícone na área de notificação do sistema.
- **Datas e Tempos**: Formatação automática em português brasileiro (24 horas, dias da semana e meses).

---

## 🚀 Instalação Rápida

### Pré-requisito
É necessário ter o **Node.js** instalado em seu computador (versão 16 ou superior). Não requer ferramentas adicionais de compilação ou pacotes externos.

---

### 🐧 Linux

Abra o terminal no diretório do repositório clonado e execute:

```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install.sh
./install.sh
```

O script localiza automaticamente a instalação do Antigravity, instala os arquivos persistentes e cria o inicializador com auto-recuperação.

---

### 🍏 macOS

No terminal do macOS, execute:

```bash
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
chmod +x install-macos.sh
./install-macos.sh
```

---

### 🪟 Windows

Abra o **PowerShell** no diretório do projeto e execute:

```powershell
git clone https://github.com/Cambrith/antigravity-pt-br.git
cd antigravity-pt-br
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install.ps1
```

---

## 🛡️ Persistência após Atualizações

O instalador utiliza uma arquitetura de persistência em camadas:

1. **Cópia Golden Master**: O arquivo de tradução principal fica salvo no diretório de configuração do usuário (`~/.config/Antigravity/i18n` no Linux, `~/Library/Application Support/Antigravity/i18n` no macOS, `%APPDATA%\Antigravity\i18n` no Windows), garantindo que atualizações do software não apaguem as traduções.
2. **Patcher ASAR em Node.js Puro**: Modifica o pacote Electron mantendo 100% dos arquivos descompactados e recalculando as somas de integridade SHA256 sem depender de pacotes npm externos.
3. **Inicializador Automático (Linux)**: Um launcher detecta se o Antigravity foi atualizado e reaplica a tradução instantaneamente na próxima inicialização.

---

## 🛠️ Personalização e Adição de Novos Termos

Se desejar adicionar novos termos ou ajustar textos existentes:

1. Abra o arquivo `generate_i18n.py` e adicione os termos no dicionário `EXACT_MAP` ou na função de regras dinâmicas.
2. Execute o gerador:
   ```bash
   python3 generate_i18n.py
   ```
3. Reaplique a tradução:
   ```bash
   node patch-asar.js --force
   ```

---

## 📁 Estrutura do Repositório

```text
antigravity-pt-br/
├── i18n-pt-br.js              # Script final de tradução (motor JS + mapas)
├── generate_i18n.py           # Gerador Python contendo todos os termos fonte
├── patch-asar.js              # Patcher de binário ASAR multiplataforma
├── install.sh                 # Instalador automatizado para Linux
├── install-macos.sh           # Instalador automatizado para macOS
├── install.ps1                # Instalador automatizado para Windows
├── launcher/
│   └── antigravity-launcher.sh # Inicializador persistente com auto-reparo
├── LICENSE                    # Licença MIT
└── README.md                  # Documentação do projeto
```

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
