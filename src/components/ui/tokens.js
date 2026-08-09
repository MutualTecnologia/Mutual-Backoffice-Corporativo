/**
 * Tokens de estilo das telas.
 *
 * Nove telas declaravam o mesmo `CARD` — e cinco o mesmo `INPUT`, quatro o
 * mesmo `BTN` — cada uma no topo do próprio arquivo. Já estavam divergindo do
 * jeito clássico: um padding de `11px 13px` aqui, `12px 13px` ali, fonte 13
 * numa tela e 13.5 na vizinha, sem que nenhuma dessas diferenças fosse
 * decisão de alguém. É o mesmo sintoma que a paginação teve antes de virar
 * peça única (ver logic/paginacao.js).
 *
 * O que é variação real continua na tela: o `INPUT` do Login tem espaço para
 * o ícone dentro do campo, o `CARD` do Checkout tem raio menor de propósito.
 * Aqui ficam só os valores que as telas queriam idênticos.
 */

/** O cartão padrão de qualquer bloco de tela. */
export const CARD = {
  background: 'var(--surface)',
  border: '1px solid var(--line)',
  borderRadius: '14px',
  boxShadow: 'var(--card-shadow)',
}

/** O mesmo cartão com o padding que as telas de formulário usam. */
export const CARD_PAD = { ...CARD, padding: '18px 20px' }

/** Legenda miúda em caixa alta. */
export const CAP = { fontSize: '10px', letterSpacing: '.08em', color: 'var(--muted-2)' }

/** Campo de texto compacto — o das telas de cobrança. */
export const INPUT = {
  width: '100%', background: 'var(--surface-2)', border: '1px solid var(--line-2)',
  borderRadius: '10px', padding: '11px 13px', fontSize: '13px', color: 'var(--ink)',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
}

/** Campo de texto dos fluxos de envio (TED, saque), um ponto maior. */
export const INPUT_LG = { ...INPUT, padding: '12px 13px', fontSize: '13.5px' }

/** Rótulo de campo. */
export const LABEL = { display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '7px' }

/** Botão principal. */
export const BTN = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '13px 20px',
  border: 'none',
  borderRadius: '11px',
  background: 'var(--brand)',
  color: '#fff',
  fontSize: '13.5px',
  fontFamily: 'inherit',
  cursor: 'pointer',
}

/** Botão secundário: mesmo corpo, sem fundo. */
export const BTN_SEC = { ...BTN, background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-2)' }

/** Seletor, derivado do campo. */
export const SELECT = { ...INPUT_LG, padding: '10px 12px', fontSize: '12.5px', cursor: 'pointer' }
