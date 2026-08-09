# Decisões — Backoffice Corporativo

Registro das decisões que governam este repositório, com quem decidiu e o que
elas fecham. Segue o espírito do `MTC-GOV-MEM-2026-001` (memória institucional
do acervo): decisão sem owner e sem motivo não vale.

## O que este repositório é

**Protótipo navegável** de telas, processos e fluxos do backoffice que **serve o
produto Mutual Terminal Global**. Publicado no GitHub Pages.

**O que ele não é:** produto em produção. Sem backend, sem liquidação, sem
ledger real, sem dado de cliente. Os fluxos rodam sobre dados mock em
`src/logic/`.

Isto é coerente com o §14 do Plano Executivo de Transformação do Backoffice
(v1.0, 05/08/2026): *"O backoffice não precisa ser descartado. Ele deve ser
tratado como camada de experiência já avançada e conectado progressivamente a
uma plataforma financeira real."*

E com o §9.2 da memória institucional: **tela não comprova cálculo,
persistência, ledger, conciliação, auditoria, fechamento, permissão nem
segurança.** Os gates T1–T19 exigem `EVID-A em ambiente vivo`; nenhuma tela
deste repositório aprova gate.

## Decisões tomadas

| # | Decisão | Por quem | Fecha |
|---|---|---|---|
| D-01 | Next.js 15.3 + React 19 | Produto | framework |
| D-02 | Publicação em GitHub Pages (`output: 'export'`) | Produto | destino |
| D-03 | JavaScript/JSX, não TypeScript | Produto | linguagem |
| D-04 | Identidade visual e modelo de arquitetura vêm do `mutual-terminal-global` | Produto | referência |
| D-05 | Conciliação na 4ª casa para FIAT, 6ª para cripto | Produto | precisão |
| D-06 | CSS puro, sem Tailwind | Claude (recomendação aceita) | estilo |

### D-02 — consequência arquitetural

`output: 'export'` elimina route handlers, middleware, server actions e RSC com
dados em runtime. **Não há BFF.**

O §3.1 do Plano Executivo determina: *"O frontend pode formatar, filtrar,
ordenar e explicar. O frontend não deve decidir preço, margem, limite, liquidez,
tarifa, comissão, saldo, status financeiro ou aprovação."*

Sem servidor, essa fronteira é mantida **pela camada**, não pelo runtime: toda
lógica vive em `src/logic/` (módulos sem React), e `src/components/screens/`
apenas renderiza. É o padrão do `mutual-terminal-global`, que separa 73 módulos
de `logic/` de 35 telas.

### D-03 — divergência consciente do restante da org

O `prototipo-vite-backoffice` e o `prototipo-nextjs-backoffice-onboarding` usam
TypeScript. Este usa JS/JSX, para ser fiel ao `mutual-terminal-global`, que é a
referência declarada.

O controle compensatório é o que já funciona lá: `eslint` com `no-undef` (pega
identificador referenciado e nunca escrito — a classe de defeito que já publicou
uma tela em branco), as asserções de `scripts/verificacao/` e o job `navegador`
com Playwright abrindo as telas de verdade.

Se este protótipo virar base de produção, a migração para TS é o momento certo.

### D-05 — a regra já existia

`src/lib/valor.js`, portado verbatim do `mutual-terminal-global`:

```js
export const CASAS_FIAT = 4
export const CASAS_CRIPTO_MIN = 6
export const CASAS_CRIPTO_MAX = 8
```

O próprio arquivo explica: *"Num terminal de câmbio e OTC a quarta casa é onde
mora o spread — cortar em duas é esconder justamente a parte que a Mesa
negocia."*

Isto resolve uma divergência aparente no pacote do terminal: o
`docs/visao-geral.md` diz FIAT 4 / cripto 6, enquanto o
`modelo_economico_seed_v1.json` traz `pricing.rounding_scale_brl = 2` com status
`APROVADO_MODELO`. **A regra operante de exibição é `valor.js`.** O `2` do seed
descreve arredondamento monetário de superfície de cliente, não a escala de
conciliação — e o modelo precisa de chaves separadas (`rounding_scale` ×
`display_scale` × `reconciliation_scale`) para deixar isso explícito.

### D-06 — por que não Tailwind

O `mutual-terminal-global` não usa Tailwind: a identidade vive em
`src/styles/global.css` (1.065 linhas de tokens CSS com razão de contraste
auditada e documentada) mais `lib/contraste.js` e `lib/paresTema.js`.

Introduzir Tailwind aqui criaria um segundo sistema de estilo sobre o primeiro —
o "padrão paralelo" que o §8 da memória institucional proíbe. Consequência: cai
a proposta anterior de portar o design system Tailwind v4 do
`prototipo-vite-backoffice`.

## Conflitos abertos — decisão pendente

Levantados durante a leitura do acervo. Nenhum bloqueia o protótipo; todos
bloqueiam produção.

| # | Conflito | Fontes | Precisa de |
|---|---|---|---|
| C-01 | "Liquidação" concentrada no Financial Core contraria a Regra 0 (a Mutual **não** é "responsável por liquidação"; instrui, roteia, registra, concilia, comprova e observa) | `CONVERSA_E_DECISOES_DISPONIVEIS.md` decisão 2 × `MTC-GOV-MEM-2026-001` §0 | Jurídico + ADR |
| C-02 | Quatro nomes para a mesma camada: **MFCP** (canônico, §4.5), "Motor Financeiro Operacional" (2025), "Financial Core", "terminal global" | acervo | Definição de nome canônico |
| C-03 | 15 dos 20 parâmetros do `modelo_economico_seed_v1.json` não estão aprovados (`EM_REVISAO`, `PENDENTE_DECISAO`, `PENDENTE_APROVACAO`) | seed v1.1 | Diretoria — Fase 0 do Plano |
| C-04 | Três escalas decimais confundidas numa chave só | seed × README × `valor.js` | Modelo econômico |
| C-05 | `.env` presente no pacote do acervo (`04_REPOSITORIO_DE_CODIGO/00_LEGACY_CRM_MUTUAL_ADMIN/crm_mutual_admin/.env`). README afirma higienização para `<REDACTED>`; não verificado. Arquivo não foi aberto e valores não foram reproduzidos, conforme §10.1 | manifesto do pacote | Escalar a PMO & Cybersecurity |

Sobre C-03: o protótipo **exibe** o status de cada parâmetro econômico na tela.
Um número `PENDENTE_DECISAO` aparece marcado como tal. É o que separa este
protótipo de uma maquete — ele mostra o que ainda não foi decidido em vez de
esconder.
