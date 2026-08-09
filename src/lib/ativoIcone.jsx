'use client'

/**
 * O ícone oficial de um ativo, como SVG.
 *
 * Substitui os glifos tipográficos — ₿ ₮ Ξ ◎ ◪ Ð. Eles pareciam ícone e não
 * eram: são caracteres, então o desenho vem da fonte instalada, o peso do traço
 * não conversa com o resto da interface, e no PDF eles caem em três tipografias
 * de reserva diferentes (DejaVu, FreeSerif e um Type3 embutido) porque
 * Helvetica não tem nenhum deles. Alguns simplesmente não são o símbolo do
 * ativo: `◪` e `Ð` são formas geométricas emprestadas.
 *
 * Aqui o ícone é o arquivo oficial da marca.
 *
 * **Ativo sem ícone oficial fica com o marcador neutro** — a sigla num círculo
 * de superfície. Não há substituto plausível: usar o logo do Gemini Dollar num
 * Global Dollar, ou desenhar um "parecido", troca a marca de um emissor pela de
 * outro. É a mesma regra que vale para nome de instituição nesta casa.
 */
import { ATIVOS_SVG } from './ativosSvg.js'
import { elementos } from './svgArvore.js'

/** Tem ícone oficial? A tela às vezes precisa saber antes de compor. */
export function temIconeOficial(sym) {
  return !!ATIVOS_SVG[String(sym || '').toUpperCase()]
}

/**
 * @param {object} o
 * @param {string} o.sym    sigla do ativo — 'BTC', 'USDT'
 * @param {number} o.tam    diâmetro em px
 * @param {string} o.titulo texto para leitor de tela; o padrão é a sigla
 */
export default function AtivoIcone({ sym, tam = 22, titulo = '', cor = '', fundo = '', style }) {
  const s = String(sym || '').toUpperCase()
  const dados = ATIVOS_SVG[s]
  const base = { display: 'inline-block', flex: 'none', verticalAlign: 'middle', borderRadius: '50%', ...style }
  if (!dados) {
    // Sem marca oficial, o marcador usa a **cor do ativo** quando quem chama a
    // conhece. Cinza sobre cinza no meio de uma lista de círculos coloridos não
    // lê como "sem marca oficial", lê como tela que não terminou de carregar.
    return (
      <span role="img" aria-label={titulo || s} title={titulo || s}
        style={{ ...base, width: tam, height: tam, background: fundo || 'var(--surface-3)',
          color: cor || 'var(--muted-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          // A sigla de quatro letras (STETH, TRUMP) não cabe em 22px no mesmo
          // corpo de uma de três: o tamanho segue o comprimento.
          fontSize: Math.max(7, Math.round(tam * (s.length > 4 ? 0.3 : 0.38))),
          fontWeight: 500, letterSpacing: '-.02em',
          boxShadow: fundo ? 'none' : 'inset 0 0 0 1px var(--line-2)' }}>
        {s.slice(0, 5)}
      </span>
    )
  }
  const [viewBox, nos] = dados
  return (
    <svg viewBox={viewBox} width={tam} height={tam} role="img" aria-label={titulo || s}
      style={base}>{elementos(nos)}</svg>
  )
}
