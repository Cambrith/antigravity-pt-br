# Política de Segurança

A segurança e a privacidade dos usuários são prioridades absolutas no projeto **Antigravity pt-BR**.

---

## 🔒 Princípios de Segurança do Projeto

1. **Zero Dependências de Terceiros no Patcher**: O patcher ASAR ([`patch-asar.js`](patch-asar.js)) utiliza exclusivamente os módulos nativos do runtime do Node.js (`fs`, `path`, `crypto`, `vm`, `os`). Isso elimina riscos de ataques à cadeia de suprimentos (supply chain attacks) via npm packages.
2. **Sem Coleta de Telemetria**: O script de tradução opera 100% offline e localmente na sua máquina. Nenhum dado, prompt, token ou texto manipulado é transmitido para servidores externos.
3. **Integridade de Arquivos Preservada**: O patcher recalcula os hashes de verificação SHA-256 e os blocos de integridade binária do ASAR do Electron para garantir conformidade com as verificações nativas da aplicação.

---

## 🛡️ Versões Suportadas

Apenas a versão mais recente da branch `main` recebe correções de segurança ativas:

| Versão | Suportada |
|---|---|
| `1.1.x` (Atual) | :white_check_mark: Sim |
| `< 1.1.0` | :x: Não |

---

## 🚨 Como Reportar uma Vulnerabilidade

Se você identificou uma falha de segurança, vulnerabilidade ou vazamento potencial:

1. **Não abra uma issue pública** no repositório.
2. Envie um e-mail com os detalhes técnicos e passos para reprodução para:
   📧 **enzocampbell@outlook.com.br**
3. Inclua, se possível:
   - Descrição técnica da vulnerabilidade.
   - Prova de conceito (PoC) ou passos de reprodução.
   - Sistema operacional e versão do Node.js testada.

Comprometemo-nos a responder ao relato em até **48 horas úteis** e publicar uma correção o mais rápido possível com os devidos créditos de agradecimento ao pesquisador.
