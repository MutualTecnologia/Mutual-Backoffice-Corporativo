# Pendências

O que falta, onde falta e **quem resolve**. Uma pendência sem dono é um item que
sobrevive a todas as reuniões.

> ⚠️ Este arquivo substitui cinco diretórios vazios. A estrutura numerada do
> pacote documental (`02_DOCUMENTOS_MESTRES`, `05_MODELOS_DADOS_E_CONTRATOS`,
> `06_QA_E_RASTREABILIDADE`, `07_RELEASES_E_PACOTES`, `99_HISTORICO`) prometia
> conteúdo que não existia — cinco pastas com um `README` cada, dizendo que
> estavam vazias. A informação era boa; o continente é que era caro demais.

---

## 1. ⛔ A publicação está bloqueada fora do código

**Dono: quem administra o repositório no GitHub.**

O artefato existe (`app/out`, por `npm run build:pages`), o workflow existe
(`.github/workflows/deploy-pages.yml`, disparando em `mainv2`), e mesmo assim o
site no ar é de **08/08/2026** — publicado por um workflow que já foi removido
do repositório irmão. Nenhum commit resolve isto:

| Causa provável | Onde se resolve |
| --- | --- |
| O ambiente `github-pages` restringe deploy à branch padrão | *Settings → Environments → github-pages → Deployment branches* → liberar `mainv2` |
| *ou* a origem do Pages aponta para GitHub Actions, ignorando a `gh-pages` que já carrega o artefato | *Settings → Pages → Source* → "Deploy from a branch" → `gh-pages` |

⚠️ Criar o site do Pages exige **direito de administração**; o `GITHUB_TOKEN` do
workflow ❌ não o tem — verificado em 07/08/2026, com *"Create Pages site failed:
Resource not accessible by integration"*. `permissions: pages: write` ❌ não
supre. É ato humano, uma vez só.

---

## 2. ⚠️ O seed econômico não está aqui — e é o que separa protótipo de maquete

**Dono: Diretoria (conflito C-03 em [`decisoes.md`](./decisoes.md)).**

O `modelo_economico_seed_v1.json` vem do acervo e não foi trazido. Sem ele, uma
promessa do próprio `decisoes.md` não pode ser cumprida:

> *"o protótipo **exibe** o status de cada parâmetro econômico na tela. Um
> número `PENDENTE_DECISAO` aparece marcado como tal. É o que separa este
> protótipo de uma maquete — ele mostra o que ainda não foi decidido."*

**15 dos 20 parâmetros** estão em `EM_REVISAO`, `PENDENTE_DECISAO` ou
`PENDENTE_APROVACAO`. A tela que os exibiria — *Taxas e Spread*
(`/paas/taxas`) — é a primeira da onda seguinte. Dois caminhos: trazer o seed, ou
começar com seed simulado e a dívida declarada em código. ⛔ Parâmetro inventado
exibido sem marca é pior que nenhum.

---

## 3. ⚠️ O rastro tem um buraco no meio: faltam os casos TC-001…TC-020

**Dono: QA / quem detém o acervo.**

```
regra do catálogo  →  [ TC-001…TC-020 ]  →  suíte que executa  →  tela
      existe            ❌ FALTA              existe              existe
```

Hoje dá para provar que **toda tela declarada abre**. ⛔ Não dá para provar que
uma tela **cumpre a regra** que a justifica — porque a regra não está escrita em
lugar nenhum como caso de teste. A matriz tela ↔ regra também não existe.

Quando os casos chegarem, duas convenções valem desde o primeiro:

- **Toda proibição é testada pelos dois lados** — o caso que REPROVA e o
  conforme que PASSA. Suíte que só exercita o caminho feliz passa com um guard
  que devolve sempre "conforme"; já aconteceu no repositório irmão.
- **Cada suíte declara no cabeçalho o defeito que a fez nascer.** Asserção sem
  história vira asserção que alguém desliga para "passar".

---

## 4. ⚠️ Compliance pode merecer esteira própria

**Dono: dono do produto.**

Hoje *Compliance e PLD* é grupo dentro de **ONBOARD** — defensável, porque a nota
da esteira é *"cadastro e **validação** de clientes"* e o KYC/KYB já mora ali. Mas
o catálogo trata Compliance como domínio de primeiro nível, com 15 telas e 7 P0.

⛔ Criar uma quinta esteira exige **decisão formal** (§2.3 da memória
institucional), e `app/scripts/verificacao/navegacao.mjs` reprova enquanto a
decisão não existir. Está declarado em `app/src/logic/navigation.js` em vez de
resolvido em silêncio.

---

## 5. As telas abrem, mas ainda não têm conteúdo próprio

**Dono: engenharia — é o trabalho corrente.**

As rotas declaradas navegam, acendem o item certo no menu e respeitam a precisão,
mas todas mostram a tela genérica. A ordem já está definida: **`/paas/taxas`
primeiro**, porque é lá que nascem versão, vigência e maker-checker que as outras
reusam (§6.1 do Plano). `AutorizacaoModal`, `ContextConfirm` e `PeriodoPicker`
estão prontos e desligados esperando exatamente essa tela.

---

## As fontes normativas — onde elas moram

⛔ Não há cópia neste repositório, de propósito: cópia de documento normativo em
repositório de código vira a segunda verdade que ninguém atualiza. As fontes
vivem no Drive canônico.

| Código | O que decide | Invocada em |
| --- | --- | --- |
| **MTC-GOV-MEM-2026-001** | Regra 0 (§0 — a Mutual observa, concilia e comprova; ❌ **não custodia**), as quatro esteiras (§2), a área transversal (§2.2), as verticais (§2.1) e a proibição de criar ou renomear esteira (§2.3) | `app/src/logic/navigation.js`, `decisoes.md` |
| **MTC-UX-2026-010** | Catálogo de telas, 16 seções, prioridade por tela. É a fonte dos **nomes** | `navigation.js` (campo `cat`), `Tela.jsx`, a home |
| **MTC-ARQ-2026-009 v1.1** | Redesenho da arquitetura, em 7 fases | `decisoes.md` |
| **modelo_economico_seed_v1.json** | Parâmetros econômicos | ⚠️ pendência 2, acima |

**Prevalência (§0.1):** vence a fonte que tem código, versão, owner e aprovador.
Foi por isso que as quatro esteiras venceram os seis pacotes propostos — a
memória tem os quatro atributos, uma exportação de conversa não tem nenhum.
