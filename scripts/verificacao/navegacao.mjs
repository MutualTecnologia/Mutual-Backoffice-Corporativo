/**
 * A navegação é declarada uma vez, em `src/logic/navigation.js`, e todo o resto
 * — Sidebar, breadcrumb, índice de telas, catálogo — lê de lá. Estas asserções
 * protegem o que essa centralização assume.
 *
 * O que elas pegam, e por que cada uma existe:
 *
 *   **Rota duplicada.** Duas entradas com o mesmo `href` fazem o breadcrumb e o
 *   "item ativo" da Sidebar escolherem a primeira e ignorarem a segunda,
 *   silenciosamente. O item duplicado simplesmente nunca acende.
 *
 *   **As quatro esteiras, com os nomes do §2.** O §2.3 da memória institucional
 *   (`MTC-GOV-MEM-2026-001`) proíbe criar ou renomear esteira sem decisão
 *   formal. Uma asserção é mais barata que uma revisão de PR, e não esquece.
 *
 *   **Vertical fora do menu.** O §2.1 separa esteira de vertical: iGaming e
 *   cross-border *consomem* as esteiras. Se uma delas virar item de navegação,
 *   as telas passam a se duplicar por vertical.
 *
 *   **Prefixo da rota igual ao id da esteira.** É o que permite descobrir a
 *   esteira a partir da URL sem varrer a árvore.
 */
import { ESTEIRAS, TRANSVERSAL, VERTICAIS, todasAsRotas } from '../../src/logic/navigation.js'

const falhas = []
const checar = (condicao, mensagem) => {
  if (!condicao) falhas.push(mensagem)
}

// Uma rota, um destino.
const rotas = todasAsRotas()
const vistas = new Set()
for (const rota of rotas) {
  checar(!vistas.has(rota), `rota duplicada: ${rota}`)
  vistas.add(rota)
}

// As quatro esteiras do §2, nesta ordem e com estes nomes.
const esperadas = ['ONBOARD', 'PAAS', 'OTC', 'SALA DE CONTROLE / TESOURARIA']
checar(
  ESTEIRAS.length === 4,
  `o §2 define quatro esteiras; a navegação declara ${ESTEIRAS.length}`,
)
esperadas.forEach((label, i) => {
  checar(
    ESTEIRAS[i]?.label === label,
    `esteira ${i}: esperado "${label}", encontrado "${ESTEIRAS[i]?.label}"`,
  )
})

// Vertical é contexto, não menu.
const rotulosDeMenu = new Set(
  [...ESTEIRAS, TRANSVERSAL].flatMap((e) =>
    e.grupos.flatMap((g) => g.itens.map((i) => i.label.toLowerCase())),
  ),
)
for (const vertical of VERTICAIS) {
  checar(
    !rotulosDeMenu.has(vertical.label.toLowerCase()),
    `vertical "${vertical.label}" virou item de menu — o §2.1 a define como contexto`,
  )
}

// A URL diz a que esteira pertence.
for (const esteira of ESTEIRAS) {
  for (const grupo of esteira.grupos) {
    for (const item of grupo.itens) {
      checar(
        item.href.startsWith(`/${esteira.id}/`),
        `"${item.label}" está em ${esteira.label} mas aponta para ${item.href}`,
      )
    }
  }
}

// Item sem rótulo ou sem destino não renderiza.
for (const esteira of [...ESTEIRAS, TRANSVERSAL]) {
  for (const grupo of esteira.grupos) {
    for (const item of grupo.itens) {
      checar(Boolean(item.label && item.href), `item incompleto em ${esteira.label}`)
    }
  }
}

if (falhas.length) {
  console.error(`navegação: ${falhas.length} falha(s)`)
  for (const f of falhas) console.error(`  - ${f}`)
  process.exit(1)
}

console.log(`navegação: ${rotas.length} rotas em ${ESTEIRAS.length} esteiras — tudo certo`)
