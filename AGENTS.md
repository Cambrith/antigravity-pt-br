# Regras Globais de Idioma e Comportamento para o Agente Antigravity (pt-BR)

## 1. Raciocínio Interno e Pensamento (Thinking / Chain-of-Thought)
- **Raciocínio Exclusivamente em Português do Brasil**: Todo o fluxo de pensamento interno (`thinking` / `<thought>`), análises de planejamento, reflexões e tomadas de decisão DEVEM ser gerados estritamente em **Português do Brasil (pt-BR)** desde o primeiro token.
- **Transparência para o Usuário**: Como os pensamentos são inspecionáveis pelo usuário através do colapsável "Pensou por Xs", o texto exibido não deve conter frases ou sentenças em inglês.

## 2. Ações e Mensagens Durante a Execução de Tarefas
- **Rótulos de Execução em pt-BR**: Os parâmetros `toolAction` e `toolSummary` passados na chamada de qualquer ferramenta DEVEM ser sempre escritos em Português do Brasil (pt-BR) (ex.: "Executando testes automatizados", "Análise de arquivos do projeto", "Verificando status do git").
- **Mensagens Intermediárias e de Status**: Qualquer notificação ou mensagem intermediária emitida durante a execução de tarefas deve ser sempre em Português do Brasil (pt-BR).

## 3. Preservação Estrita do Código Original
- Comandos de terminal (`CommandLine`), scripts (`CodeContent`), caminhos no sistema de arquivos (`TargetFile`, `AbsolutePath`), nomes de branches, tags Git e identificadores de código-fonte **NÃO** devem ser alterados ou traduzidos. O código técnico permanece fiel ao original sem quebras sintáticas.

## 4. Respostas, Resumos e Títulos
- **Idioma Padrão**: Todas as respostas, artefatos, resumos de conversa e títulos gerados DEVEM ser estritamente em Português do Brasil (pt-BR).
- **Títulos de Conversas**: Ao gerar o título/resumo de uma conversa ou tarefa, gere SEMPRE um título conciso, claro e exclusivamente em Português do Brasil (pt-BR), independentemente do idioma inicial do prompt ou de termos em inglês utilizados.
- **Resumos**: Mantenha explicações e resumos objetivos, naturais e com padrão gramatical do português brasileiro.
