# BACKOFFICE CORPORATIVO — Protótipo

Protótipo navegável de telas, processos e fluxos do backoffice que serve o
produto **Mutual Terminal Global**.

## O que este repositório é

Protótipo. Telas e fluxos publicados no GitHub Pages, sobre dados mock.

## O que este repositório NÃO é

Produto em produção. Sem backend, sem ledger real, sem liquidação, sem dado de
cliente. Nenhuma tela daqui aprova gate T1–T19 — esses exigem `EVID-A em
ambiente vivo`.

## Estrutura

⚠️ **A numeração do pacote `00_MUTUAL_TERMINAL_BACKOFFICE` foi abandonada.** Esta
tabela declarava oito diretórios e cinco nunca tiveram conteúdo — ver o porquê
no [`README.md`](../README.md) da raiz.

| Pasta | Conteúdo |
| --- | --- |
| `app/` | a aplicação Next.js |
| `docs/` | este arquivo, as [decisões](./decisoes.md) e as [pendências](./pendencias.md) |
| `.github/` | verificação e publicação |

## Identidade visual

Portada verbatim do `mutual-terminal-global`: `src/styles/global.css` (1.065
linhas de tokens com razão de contraste auditada), `hover.css`,
`components/ui/tokens.js`, `lib/contraste.js`, `lib/paresTema.js`.

## Precisão financeira obrigatória

De `src/lib/valor.js`, portado verbatim:

- **FIAT: 4 casas.** A quarta casa é onde mora o spread.
- **CRIPTO: mínimo 6 casas**, teto prático 8 (satoshi).

## Status dos artefatos

CONCEBIDO · DESENHADO · ESPECIFICADO · IMPLEMENTADO · TESTADO · HOMOLOGADO ·
PRODUÇÃO. A presença de uma tela não significa que a funcionalidade esteja
implantada.

## Segurança

Nenhuma credencial neste repositório. Nenhum `.env` versionado.
