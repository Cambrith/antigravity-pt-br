# Guia de Contribuição para o Antigravity pt-BR

Primeiramente, obrigado pelo interesse em contribuir com a localização do Google Antigravity para Português do Brasil! 🎉

Este projeto segue padrões rigorosos de engenharia de software para garantir que as contribuições sejam seguras, testáveis e confiáveis para toda a comunidade.

---

## 📋 Como Começar

### Pré-requisitos
- **Node.js** v18 ou superior.
- **Python** 3.8 ou superior (para executar o compilador `generate_i18n.py`).
- **Git** configurado com seu nome e e-mail.

### Configuração do Ambiente Local

1. Faça um fork do repositório no GitHub.
2. Clone o seu fork:
   ```bash
   git clone https://github.com/SEU_USUARIO/antigravity-pt-br.git
   cd antigravity-pt-br
   ```
3. Crie uma branch para a sua alteração com um nome descritivo:
   ```bash
   git checkout -b feat/novos-termos-mcp
   ```

---

## 🛠️ Como Adicionar ou Corrigir Traduções

1. Abra o arquivo fonte [`generate_i18n.py`](generate_i18n.py).
2. Para **termos literais**, adicione a chave no dicionário `EXACT_MAP`:
   ```python
   "Original English Text": "Texto Traduzido em Português",
   ```
3. Para **textos variáveis/dinâmicos**, adicione ou ajuste a expressão regular na função `translateDynamic`:
   ```javascript
   if ((m = /^My custom pattern (.+)$/i.exec(s))) {
     return `Meu padrão personalizado ${m[1]}`;
   }
   ```
4. Recompile os arquivos finais:
   ```bash
   npm run build
   ```
5. Valide a sintaxe e rode os testes automatizados:
   ```bash
   npm run lint
   npm test
   ```

---

## 🧪 Adicionando Testes Automatizados

Toda nova regra dinâmica ou correção crítica **deve** acompanhar um teste unitário na pasta `tests/`.
- Veja os exemplos existentes em [`tests/test-quotas.js`](tests/test-quotas.js) e [`tests/test-translations.js`](tests/test-translations.js).
- Para executar apenas os testes:
  ```bash
  npm test
  ```

---

## 📝 Convenção de Mensagens de Commit

Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/) com a **regra de ouro de legibilidade do Git & GitHub**:

### 📏 Regra dos 50 Caracteres no Título
- **Primeira linha (Assunto)**: Deve conter no **máximo 50 caracteres**. Isso evita que o GitHub corte o texto com reticências (`...`) na tabela de arquivos da página principal.
- **Segunda linha**: Sempre em branco.
- **Terceira linha em diante (Corpo opcional)**: Onde você pode detalhar livremente o contexto, motivos da mudança e notas técnicas.

### Tipos de Commit
- `feat:` Nova funcionalidade ou lote de termos traduzidos (máx. 50 caracteres).
- `fix:` Correção de bug no instalador, patcher ou correção de termo.
- `docs:` Alterações puramente em documentação (README, guias).
- `test:` Inclusão ou ajuste de testes automatizados.
- `refactor:` Refatoração interna que não altera o comportamento.

### Como Escrever Mensagens Curtas e Detalhadas
Use a flag `-m` duas vezes para separar o título curto do corpo detalhado:

```bash
git commit -m "feat(i18n): traduz modais e servidores MCP" -m "Tradução de 15 novos servidores MCP e seus parâmetros de configuração, mantendo compatibilidade com versões anteriores."
```

Dessa forma, o GitHub exibe o título limpo e sem cortes na lista de arquivos, enquanto a descrição completa fica acessível nos detalhes do commit.

---

## 🚀 Enviando seu Pull Request

1. Garanta que todos os testes passem: `npm test`.
2. Envie suas alterações para o seu fork:
   ```bash
   git push origin sua-branch
   ```
3. Abra um **Pull Request** para a branch `main` do repositório principal.
4. Preencha o checklist do template de Pull Request.
5. Os testes do GitHub Actions (CI) serão executados automaticamente para validar sua alteração em Linux, macOS e Windows.
