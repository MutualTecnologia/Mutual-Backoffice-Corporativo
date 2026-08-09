# Backoffice Corporativo — Mutual

Protótipo navegável (Next.js, saída estática) de telas, processos e fluxos que servem o Mutual Terminal Global. Não é produto em produção.

- **Repositório:** `MutualTecnologia/Mutual-Backoffice-Corporativo`
- **Publicação:** GitHub Pages em https://mutualtecnologia.github.io/Mutual-Backoffice-Corporativo/ (workflow `Publicar no Pages`, dispara em push na `main`)
- **Dev local:** `npm run dev` (porta 3002) · build de Pages: `npm run build:pages` · verificações: `npm run verificar` · e2e: `npm run e2e`

## Base de conhecimento canônica

A pasta [`_BASE_CONHECIMENTO_MD/`](_BASE_CONHECIMENTO_MD/) contém a Base de Conhecimento Canônica do **Mutual Onboarding** (18 arquivos, projeção do corpus `00_EXECUCAO_CANONICA`).

**Antes de especificar, planejar ou implementar qualquer coisa ligada ao Onboarding, leia [`_BASE_CONHECIMENTO_MD/CLAUDE.md`](_BASE_CONHECIMENTO_MD/CLAUDE.md)** — ele é o ponto de entrada obrigatório e define a ordem de leitura, as regras invioláveis (IDs são contratos, golden thread, Tenant ≠ Channel, frontend nunca é autoridade de estado, etc.) e a hierarquia de autoridade em caso de conflito.

Ordem mínima: `00_INDEX.md` → `01_GOVERNANCA_E_PROGRAMA.md` → `02_GLOSSARIO_E_MODELO_SEMANTICO.md` → `03_DECISOES_EXECUTIVAS_E_ADRS.md`; os demais conforme a tarefa (tabela no índice).

## Regras de git

- **Sempre commitar e fazer push direto na `main`.** Não criar branches, worktrees nem PRs — o fluxo deste repositório é linear na `main`.
- O deploy do Pages sai automaticamente de cada push na `main`.

## Documentação do protótipo

- [`docs/visao-geral.md`](docs/visao-geral.md) — visão geral do protótipo
- [`docs/decisoes.md`](docs/decisoes.md) — decisões registradas (ex.: D-03, JS/JSX sem TypeScript)
- [`docs/pendencias.md`](docs/pendencias.md) — pendências conhecidas
