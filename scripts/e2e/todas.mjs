/**
 * Abre as telas em Chromium. É a única verificação que EXECUTA a aplicação.
 *
 * ⚠️ Esta suíte faltava, e o `ci.yml` já a chamava: o job `navegador` roda
 * `npm run e2e`, que aponta para este arquivo. Ele não existia — o CI reprovaria
 * na primeira execução. Como o `ci.yml` só dispara em `main` e em pull request,
 * e nenhum PR foi aberto, ninguém tinha visto.
 *
 * ## Por que ela existe, nas palavras do próprio `ci.yml`
 *
 * > "os dois piores defeitos do terminal global passaram por lint, build e
 * > asserção sem um arranhão — um `TypeError` no render que derrubava o app
 * > inteiro, e um botão chamando método que nunca existiu. Abrir a tela vê."
 *
 * O que lint, build e as asserções de Node **não** alcançam, e esta alcança:
 *
 *  - exceção lançada durante o render (o app monta vazio, e o build fica verde);
 *  - `undefined is not a function` num manipulador que nunca foi clicado;
 *  - tela que monta mas nasce vazia porque o dado não chegou;
 *  - o item de menu que não acende — navegação viva que mente sobre onde se está.
 *
 * ⛔ O que ela NÃO prova: aparência. Nenhuma asserção aqui olha cor, espaço ou
 * alinhamento. Contraste é `scripts/verificacao/contraste.mjs`, sobre o token;
 * o resto ainda é olho humano, e dizer o contrário seria pior que não ter.
 */
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

import { servir } from './servidor.mjs'
import { acharPorHref, todasAsRotas } from '../../src/logic/navigation.js'

const aqui = dirname(fileURLToPath(import.meta.url))
const OUT = join(aqui, '../../out')

if (!existsSync(OUT)) {
  console.error('e2e: `out/` não existe — rode `npm run build` antes de `npm run e2e`.')
  process.exit(1)
}

const falhas = []
const reprovar = (rota, msg) => falhas.push(`${rota}: ${msg}`)

const { url: base, fechar } = await servir(OUT)
const navegador = await chromium.launch()

/**
 * Um contexto só para todas as telas.
 *
 * Contexto por tela isolaria melhor, e custaria alguns minutos a mais numa
 * suíte que já cresce com cada rota nova. O que precisa ser isolado — console,
 * erros de página — é religado a cada `goto`, abaixo.
 */
const pagina = await navegador.newPage()

let erros = []
pagina.on('pageerror', (e) => erros.push(`exceção: ${e.message}`))
pagina.on('console', (m) => {
  // ⚠️ Só `error`. Aviso de console é ruído legítimo em desenvolvimento (React
  // avisa sobre chave de lista, o Next sobre pré-carregamento) e transformá-lo
  // em reprovação treina a equipe a ignorar a suíte inteira.
  if (m.type() === 'error') erros.push(`console.error: ${m.text()}`)
})

const rotas = ['/', ...todasAsRotas()]

for (const rota of rotas) {
  erros = []
  const alvo = rota === '/' ? '/' : `${rota}/`
  const resposta = await pagina.goto(base + alvo, { waitUntil: 'networkidle' })

  if (!resposta || resposta.status() !== 200) {
    reprovar(rota, `status ${resposta ? resposta.status() : 'sem resposta'}`)
    continue
  }

  // 1. O shell montou. Sem a barra lateral, o que está na tela não é o app —
  //    é o `<body>` com um erro que o React engoliu.
  if (!(await pagina.locator('.app-aside').count())) {
    reprovar(rota, 'a barra lateral não montou')
  }

  // 2. A tela tem conteúdo. Uma árvore que monta e nasce vazia passa em
  //    qualquer verificação que só pergunte "montou?".
  const texto = (await pagina.locator('main').innerText().catch(() => '')) || ''
  if (texto.trim().length < 40) {
    reprovar(rota, `conteúdo vazio ou quase (${texto.trim().length} caracteres)`)
  }

  // 3. O cabeçalho diz o nome do catálogo. É o que liga a URL ao vocabulário —
  //    e o defeito que ele pega é a rota que abre a tela errada.
  const achado = rota === '/' ? null : acharPorHref(rota)
  const esperado = achado ? achado.item.label : 'Backoffice Corporativo'
  if (!texto.includes(esperado)) {
    reprovar(rota, `o cabeçalho não diz "${esperado}"`)
  }

  // 4. O item certo acende no menu. Navegação que não marca onde se está é
  //    navegação que mente — e é invisível para qualquer teste de montagem.
  //    ⚠️ Casa por `title`, não por texto. `:has-text` é SUBSTRING: procurando
  //    "Conciliação" ele achava primeiro o grupo "Conciliação e Contabilidade",
  //    que não está aceso, e reprovava uma tela sã. Texto exato também não
  //    serve — o item com selo de pendência tem o número junto no texto
  //    ("Aprovações3"). O `title` é o rótulo puro, e é único.
  if (achado) {
    const item = pagina.locator(`.app-aside a[title="${achado.item.label}"]`)
    const aceso = await item
      .first()
      .evaluate((el) => el.style.background !== 'transparent' && el.style.background !== '')
      .catch(() => false)
    if (!aceso) reprovar(rota, 'o item do menu não acendeu')
  }

  for (const e of erros) reprovar(rota, e)
}

await navegador.close()
await fechar()

if (falhas.length) {
  console.error(`e2e: ${falhas.length} falha(s) em ${rotas.length} telas`)
  for (const f of falhas) console.error(`  - ${f}`)
  process.exit(1)
}

console.log(`e2e: ${rotas.length} telas abertas em Chromium — tudo certo`)
