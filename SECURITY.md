# Política de Segurança

A segurança e a privacidade dos usuários são objetivos do projeto **Antigravity pt-BR**. A auditoria automatizada atual apenas detecta padrões conhecidos de segredos; não equivale a análise completa de segurança, auditoria independente ou garantia de ausência de vulnerabilidades.

---

## 🔒 Princípios de Segurança do Projeto

1. **Zero Dependências de Terceiros no Patcher**: O patcher ASAR ([`patch-asar.js`](patch-asar.js)) utiliza exclusivamente os módulos nativos do runtime do Node.js (`fs`, `path`, `crypto`, `vm`, `os`). Isso reduz a superfície de dependências npm, mas não elimina todos os riscos de cadeia de suprimentos.
2. **Sem Coleta de Telemetria**: O script de tradução opera 100% offline e localmente na sua máquina. Nenhum dado, prompt, token ou texto manipulado é transmitido para servidores externos.
3. **Controle de integridade**: O patcher calcula hashes SHA-256 do pacote original e do pacote traduzido e associa esses valores em um manifesto local. A restauração rejeita backups incompatíveis; isso não garante a integridade de assinaturas de código do sistema operacional. A instalação em aplicativos macOS assinados fica bloqueada.

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
