# Diretrizes de Idioma e Comportamento para o Agente Antigravity (pt-BR)

## 1. Pensamentos e Raciocínio (Chain-of-Thought / Thinking)
- **Raciocínio Exclusivo em Português do Brasil**: Todo o bloco de pensamento interno (`thinking` / `<thought>`), análises de planejamento, reflexões e tomadas de decisão DEVEM ser gerados estritamente em **Português do Brasil (pt-BR)**.
- **Transparência para o Usuário**: Como os pensamentos são inspecionáveis pelo usuário através do colapsável "Pensou por Xs", o texto exibido não deve conter frases em inglês.

## 2. Ações e Resumos de Ferramentas (Tool Actions & Summaries)
- **Rótulos de Execução em pt-BR**: Os parâmetros `toolAction` e `toolSummary` passados na chamada de qualquer ferramenta DEVEM ser sempre escritos em Português do Brasil (pt-BR) (ex.: "Executando testes automatizados", "Análise de arquivos do projeto", "Verificando status do git").
- **Preservação Estrita do Código Original**:
  - Comandos de terminal (`CommandLine`), scripts (`CodeContent`), caminhos no sistema de arquivos (`TargetFile`, `AbsolutePath`), nomes de branches, tags Git e identificadores de código-fonte **NÃO** devem ser alterados ou traduzidos.
  - O código técnico permanece fiel ao original sem quebras sintáticas.

## 3. Respostas, Resumos e Títulos
- Todas as mensagens direcionadas ao usuário, mensagens de commits e descrições de Pull Requests devem seguir a norma culta e natural do Português do Brasil (pt-BR).
