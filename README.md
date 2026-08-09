# Backoffice Corporativo — protótipo

Protótipo navegável de telas, processos e fluxos do backoffice que serve o
**Mutual Terminal Global**.

> ## ⛔ Não é produto em produção
>
> Sem backend, sem ledger real, sem liquidação, sem dado de cliente.
> **Todo número de tela é simulado.** Nenhuma ação envia nada para lugar nenhum,
> e nenhuma tela daqui aprova gate T1–T19 — esses exigem evidência em ambiente
> vivo.

## Como rodar

```bash
cd app
npm install
npm run dev          # http://localhost:3002
```

⚠️ Sem token e sem registry privado: as dependências são todas públicas. É o que
permite clonar e subir em um comando — diferente do repositório irmão, que trava
no `401` do pacote `lib-ui` antes de qualquer coisa.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| [`app/`](./app/) | a aplicação Next.js — é o sistema |
| [`docs/`](./docs/) | visão geral, decisões com owner, e as pendências com dono |
| [`.github/`](./.github/workflows/) | verificação em quatro níveis e publicação no Pages |

> ### ⚠️ Por que não há a estrutura numerada do pacote documental
>
> O `00_MUTUAL_TERMINAL_BACKOFFICE` numera diretórios de `00` a `99`, e este
> repositório tentou segui-la. Não funcionou: das oito pastas declaradas,
> **cinco nunca tiveram conteúdo** — e a tentativa de honrá-las produziu cinco
> diretórios com um `README` cada, dizendo que estavam vazios. Continente caro
> demais para a informação que carregava.
>
> A numeração serve para ordenar **capítulos de um acervo que se lê na ordem**.
> Um repositório de código não se lê na ordem: quem abre procura *a aplicação*,
> e a acha em `app/`. O que era conteúdo real das pastas numeradas está em
> [`docs/`](./docs/), inclusive as pendências que os cinco `README` registravam
> — reunidas em [`docs/pendencias.md`](./docs/pendencias.md), cada uma com dono.
>
> ### ⚠️ Por que a aplicação é `app/` e não `04_APP`
>
> O prefixo numérico é convenção de **pacote documental** — serve para ordenar
> capítulos de um acervo que se lê na ordem. Código não se lê na ordem: quem
> abre o repositório procura *a aplicação*, e nenhuma ferramenta do ecossistema
> (npm, Next, o CI, o editor) tira proveito de um `04_` na frente. Os
> diretórios de documento mantêm a numeração porque ali ela significa alguma
> coisa; o da aplicação a perdeu porque ali ela não significava.
>
> O renome foi feito com `git mv`, então o histórico de cada arquivo continua
> inteiro — `git log --follow` atravessa a mudança.

## Qualidade — quatro níveis, e cada um pega o que os outros não pegam

```bash
cd app
npm run lint          # identificador não declarado — JSX não resolve nome em compilação
npm run build:pages   # sintaxe, importação e o basePath da publicação
npm run verificar     # navegação e contraste, em Node puro, sem navegador
npm run build && npm run e2e   # abre TODAS as telas em Chromium
```

⛔ **Os números não estão escritos aqui de propósito** — quantas rotas, quantas
telas, quantos pares de contraste. Cada comando imprime o seu ao rodar. Número
que só vive no documento fossiliza: o repositório irmão publicou *"3 rotas
placeholder"* quando eram 2 e *"74 páginas com mock"* quando eram 106, e a
defesa não é reler com atenção — é o número sair de uma medição.

## Regras que atravessam qualquer alteração

- **Precisão:** FIAT 4 casas, cripto mínimo 6. A quarta casa é onde mora o
  spread.
- **Nome de tela vem do catálogo** (`MTC-UX-2026-010`), nunca da invenção de
  quem constrói. Se o catálogo estiver errado, corrija o catálogo — não crie um
  segundo vocabulário.
- **Quatro esteiras, e só.** ONBOARD · PAAS · OTC · SALA DE CONTROLE /
  TESOURARIA. Criar ou renomear esteira exige decisão formal (§2.3 da memória
  institucional), e a asserção reprova sem ela.
- **Regra 0:** a Mutual observa, concilia e comprova — ⛔ **não custodia**. Toda
  tela que exibe posição repete a qualificação.
- **Tela não decide.** A escolha vive em `app/src/logic/`; o componente
  recebe pronto. É o que permite a saída estática não ter servidor no meio.
