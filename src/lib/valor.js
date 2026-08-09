/**
 * Como um valor é escrito.
 *
 * Duas regras, e elas valem em toda a aplicação:
 *
 *   **Fiat: sempre 4 casas.** R$ 131.681,1600, não R$ 131.681,16. Num terminal
 *   de câmbio e OTC a quarta casa é onde mora o spread — cortar em duas é
 *   esconder justamente a parte que a Mesa negocia.
 *
 *   **Cripto: no mínimo 6 casas.** 0,050000 BTC, não 0,05. O mínimo é seis; um
 *   ativo que precise de mais recebe mais (8 é o limite prático, que é o
 *   satoshi). Truncar em duas casas transforma 0,00012345 BTC em 0,00.
 *
 * Antes disto cada arquivo escolhia sozinho — havia dezenas de chamadas a
 * `toLocaleString` com 2, 4, 6 ou 8 casas conforme o dia, e o mesmo saldo
 * aparecia com precisões diferentes em duas telas. A regra agora tem um lugar
 * só, e é este.
 *
 * O que **não** passa por aqui: porcentagem, contagem, data e o eixo de preço
 * dos gráficos. Porcentagem tem convenção própria, e o eixo do gráfico segue o
 * tick do instrumento, não a regra de exibição de saldo.
 *
 * Duas exceções a mais, e ambas pelo mesmo motivo — são escala, não valor:
 *
 *   O **volume abreviado** (1,24M, 788,4K) da Mesa e do mercado. Quem lê "M"
 *   está lendo a ordem de grandeza; seis casas depois da vírgula num número
 *   que já foi dividido por um milhão não informam nada.
 *
 *   As colunas de **quantidade e acumulado do livro de ofertas**. São dezessete
 *   linhas por lado, já abreviadas em milhares, num painel estreito — e o
 *   terminal acabou de sair de uma correção de estouro no celular. A coluna de
 *   preço do livro, essa sim, é dinheiro e segue a regra.
 */

/** Casas decimais de qualquer valor em moeda fiduciária. */
export const CASAS_FIAT = 4

/** Piso de casas decimais de qualquer quantidade de cripto. */
export const CASAS_CRIPTO_MIN = 6

/** Teto prático: abaixo do satoshi não há o que mostrar. */
export const CASAS_CRIPTO_MAX = 8

// `isFinite` porque `Number('abc')` é NaN, e "R$ NaN" numa tela de cobrança é
// pior do que o zero: os módulos de boleto e link chegavam a se blindar cada
// um por conta própria antes de a guarda morar aqui.
const pt = (v, min, max) => {
  const n = Number(v || 0)
  return (isFinite(n) ? n : 0).toLocaleString('pt-BR', { minimumFractionDigits: min, maximumFractionDigits: max })
}

/**
 * "1.234,5" — número em pt-BR com casas fixas.
 *
 * É o tijolo de todo o resto — exportado porque porcentagem, contagem e eixo
 * de gráfico também escrevem em pt-BR, e antes cada módulo redigitava o
 * `toLocaleString` inteiro para isso (overview, transfers, renderVals e os
 * relatórios tinham cada um a sua cópia).
 */
export function numero(valor, casas, casasMax = casas) {
  return pt(valor, casas, casasMax)
}

/** "12,3%" — porcentagem, com uma casa por padrão. */
export function pct(valor, casas = 1) {
  return numero(valor, casas) + '%'
}

/** "131.681,1600" — valor em fiat, sem símbolo. */
export function fiat(valor) {
  return pt(valor, CASAS_FIAT, CASAS_FIAT)
}

/**
 * "R$ 131.681,1600"
 *
 * `casas` existe para os documentos de cobrança — boleto, link de pagamento,
 * MED —, que seguem a convenção de duas casas do papel impresso, não a regra
 * de quatro do terminal. É a única exceção admitida; saldo e extrato não a
 * usam.
 */
export function brl(valor, casas = CASAS_FIAT) {
  return 'R$ ' + numero(valor, casas)
}

/** "− R$ 12,50" / "R$ 12,50" — com o sinal tipográfico que o hub do Pix usa. */
export function brlAssinado(valor, casas = CASAS_FIAT) {
  return (valor < 0 ? '− ' : '') + brl(Math.abs(valor), casas)
}

/** Fiat com o símbolo que vier: `moeda(1234.5, 'US$')` → "US$ 1.234,5000". */
export function moeda(valor, simbolo) {
  return (simbolo ? simbolo + ' ' : '') + fiat(valor)
}

/**
 * "0,050000" — quantidade de cripto, com seis casas no mínimo.
 *
 * `casas` eleva o piso quando o ativo pede mais precisão; nunca o abaixa,
 * porque o mínimo é o ponto da regra.
 */
export function cripto(valor, casas = CASAS_CRIPTO_MIN) {
  const min = Math.max(CASAS_CRIPTO_MIN, Math.min(CASAS_CRIPTO_MAX, casas))
  return pt(valor, min, Math.max(min, CASAS_CRIPTO_MAX))
}

/** "0,050000 BTC" */
export function criptoCom(valor, sigla, casas) {
  return cripto(valor, casas) + (sigla ? ' ' + sigla : '')
}

/**
 * Escolhe a regra pelo tipo do ativo.
 *
 * `kind` é o mesmo campo que a carteira já usa: 'fiat' ou 'cripto'.
 */
export function porTipo(valor, kind, casas) {
  return kind === 'cripto' ? cripto(valor, casas) : fiat(valor)
}
