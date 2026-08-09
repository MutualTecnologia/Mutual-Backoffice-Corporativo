/**
 * O contraste dos temas, conferido sem navegador.
 *
 * ⚠️ Esta suíte faltava. `lib/paresTema.js` traz 309 linhas de matriz de pares
 * e a função `auditar()`; `lib/contraste.js` traz a conta de razão com
 * composição de translucidez. Nenhuma das duas era chamada por ninguém — e o
 * comentário do `ci.yml` já prometia que as asserções provam "contraste
 * calculado". A ferramenta existia, a promessa existia, e o que ligava as duas
 * não.
 *
 * ## Por que em Node, e não no navegador
 *
 * `auditarDocumento()` mede o que está pintado, e é a medição definitiva — mas
 * ela só existe com uma tela aberta, num tema por vez. Aqui a fonte é o próprio
 * `global.css`: os dois temas são auditados na mesma execução, sem instalar
 * Chromium, e o resultado não depende de qual tela estava aberta.
 *
 * ⛔ O que esta suíte NÃO substitui: cor escrita em estilo inline, que não passa
 * por token nenhum e portanto não aparece aqui. É o job `navegador` que vê
 * aquilo — e é por isso que os dois existem.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { auditar } from '../../src/lib/paresTema.js'

const aqui = dirname(fileURLToPath(import.meta.url))
const css = readFileSync(join(aqui, '../../src/styles/global.css'), 'utf8')

/**
 * As declarações de um seletor, como mapa.
 *
 * ⚠️ Coleta TODAS as ocorrências do seletor, não a primeira: `:root` aparece
 * mais de uma vez em `global.css` (tokens canônicos no topo, `--nav-*` depois),
 * e parar na primeira deixaria metade dos tokens indefinidos — que a auditoria
 * separaria como erro de configuração, escondendo o contraste real atrás de um
 * relatório de token faltando.
 *
 * Bloco de declaração não aninha, então o primeiro `}` fecha. Media query
 * aninha — e por isso o seletor é buscado sempre no início de linha, onde só
 * está quando NÃO está dentro de uma.
 */
function declaracoes(seletor) {
  const mapa = new Map()
  const re = new RegExp(`^${seletor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{`, 'gm')
  let m
  while ((m = re.exec(css))) {
    const fim = css.indexOf('}', m.index)
    if (fim < 0) continue
    for (const linha of css.slice(m.index + m[0].length, fim).split('\n')) {
      const d = linha.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/)
      if (d) mapa.set(d[1], d[2].trim())
    }
  }
  return mapa
}

const raiz = declaracoes(':root')
const temas = {
  claro: declaracoes('.theme-light'),
  escuro: declaracoes('.theme-dark'),
}

/**
 * Resolve um token no tema, com `:root` como reserva — a mesma cascata que o
 * navegador aplica, já que as classes de tema vivem dentro do documento.
 *
 * `var(--outro)` é seguido até uma cor literal. Um token que aponta para outro
 * chegaria a `auditar()` como a string "var(…)", que não é cor: entraria como
 * indefinido e a suíte reprovaria por configuração onde não há defeito. O teto
 * de saltos existe porque `a: var(--b); b: var(--a)` trava o laço, e travar em
 * CI é pior que reprovar.
 */
function resolvedor(tema) {
  return (nome) => {
    let valor = temas[tema].get(nome) ?? raiz.get(nome) ?? null
    for (let salto = 0; salto < 10 && valor && valor.startsWith('var('); salto++) {
      const alvo = valor.match(/var\(\s*(--[\w-]+)/)
      if (!alvo) return null
      valor = temas[tema].get(alvo[1]) ?? raiz.get(alvo[1]) ?? null
    }
    return valor
  }
}

const falhas = []
let piorGeral = null

for (const tema of Object.keys(temas)) {
  const r = auditar(resolvedor(tema))

  for (const p of r.indefinidos) {
    falhas.push(`[${tema}] token não resolve: ${p.faltando} (${p.onde})`)
  }
  for (const p of r.reprovados) {
    falhas.push(
      `[${tema}] ${p.texto} sobre ${p.fundo} = ${p.razao.toFixed(2)}:1, alvo ${p.alvo} — ${p.onde}`,
    )
  }

  const marca = r.pior
  if (marca && (!piorGeral || marca.razao < piorGeral.razao)) {
    piorGeral = { ...marca, tema }
  }

  const partes = [`${r.aprovados.length}/${r.total} aprovados`]
  if (r.excecoes.length) partes.push(`${r.excecoes.length} exceção(ões) registrada(s)`)
  if (r.informativos.length) partes.push(`${r.informativos.length} informativo(s)`)
  console.log(`contraste [${tema}]: ${partes.join(' · ')}`)

  // Exceção medida é exceção que se revê. Sem o número, ela vira permissão
  // permanente que ninguém reexamina — a mesma lição da válvula de auditoria.
  for (const p of r.excecoes) {
    console.log(`  exceção: ${p.texto} sobre ${p.fundo} = ${p.razao.toFixed(2)}:1 — ${p.onde}`)
  }
}

if (falhas.length) {
  console.error(`contraste: ${falhas.length} falha(s)`)
  for (const f of falhas) console.error(`  - ${f}`)
  process.exit(1)
}

// A folga do pior par aprovado é o que diz quanto a marca pode mudar antes de
// alguma coisa reprovar. É o número que a personalização precisa conhecer.
if (piorGeral) {
  console.log(
    `contraste: folga real ${piorGeral.razao.toFixed(2)}:1 no tema ${piorGeral.tema} — ${piorGeral.onde}`,
  )
}
