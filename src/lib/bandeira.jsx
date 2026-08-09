'use client'

/**
 * A bandeira oficial de um país, como SVG.
 *
 * Substitui o emoji. Emoji de bandeira parece a solução barata e não é: ele é
 * desenhado pela fonte do sistema, então muda de forma entre Windows, macOS,
 * Android e Linux; em vários Windows ele **não existe** e o par de letras
 * regionais aparece cru ("BR"); e a cor não vem de `color`, o que torna a
 * bandeira invisível para qualquer medição de contraste — foi assim que oito
 * amostras entraram na varredura como "preto sobre azul-marinho, 1,68:1", que
 * não descreve nada.
 *
 * Aqui a bandeira é o arquivo oficial (ISO 3166-1 alpha-2, proporção 3:2), o
 * mesmo em todo aparelho.
 */
import { BANDEIRAS_SVG } from './bandeirasSvg.js'
import { elementos } from './svgArvore.js'

/**
 * @param {object} o
 * @param {string} o.pais   código de duas letras — 'BR', 'MX'
 * @param {number} o.altura altura em px; a largura sai da proporção 3:2
 * @param {string} o.titulo nome do país, para leitor de tela
 * @param {boolean} o.redonda recorta em círculo, para as listas de chip redondo
 */
export default function Bandeira({ pais, altura = 14, titulo = '', redonda = false, style }) {
  const dados = BANDEIRAS_SVG[String(pais || '').toUpperCase()]
  const largura = redonda ? altura : Math.round((altura * 3) / 2)
  const base = {
    display: 'inline-block', flex: 'none', verticalAlign: 'middle',
    borderRadius: redonda ? '50%' : '2px',
    // A borda de um fio dá o contorno que a bandeira branca (Japão) perde sobre
    // fundo branco. Sem ela, metade da bandeira do Japão desaparece.
    boxShadow: 'inset 0 0 0 1px rgba(15,31,56,.14)',
    ...style,
  }
  if (!dados) {
    // País sem bandeira na fonte oficial: um retângulo neutro com a sigla, e
    // nunca uma bandeira "parecida". O gerador falha antes de chegar aqui — isto
    // é a rede de segurança para um código de país que venha de dado externo.
    return (
      <span aria-label={titulo || pais} title={titulo || pais}
        style={{ ...base, width: largura, height: altura, background: 'var(--surface-3)',
          fontSize: Math.round(altura * 0.6), lineHeight: altura + 'px', textAlign: 'center',
          color: 'var(--muted-2)', letterSpacing: '.02em' }}>{String(pais || '??').slice(0, 2)}</span>
    )
  }
  const [viewBox, nos] = dados
  return (
    <svg
      viewBox={viewBox} width={largura} height={altura}
      preserveAspectRatio={redonda ? 'xMidYMid slice' : 'xMidYMid meet'}
      role="img" aria-label={titulo || pais} style={base}
    >{elementos(nos)}</svg>
  )
}
