# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
