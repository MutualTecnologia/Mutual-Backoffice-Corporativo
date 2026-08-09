/**
 * Máscara de dígitos.
 *
 * O motor genérico que o Checkout usava só para si: aplica um molde de `0`s a
 * um valor, ignorando o que não for dígito, e para sem deixar separador
 * pendurado — digitar "12" num molde `00/00/0000` dá "12", não "12/".
 * O cadastro montava as mesmas máscaras à mão, fatia por fatia.
 */

const soDigitos = (v) => String(v || '').replace(/\D/g, '')

/** Aplica uma máscara de `0`s a um valor: `mascarar('12345678', '00/00/0000')` → "12/34/5678". */
export function mascarar(valor, mask) {
  const d = soDigitos(valor)
  let out = ''
  let i = 0
  for (const c of mask) {
    if (i >= d.length) break
    if (c === '0') { out += d[i]; i++ } else { out += c }
  }
  return out
}

/** CPF com 11 dígitos, CNPJ com 14; qualquer outra coisa sai como digitada. */
export function mascararDocumento(valor) {
  const d = soDigitos(valor).slice(0, 14)
  if (d.length > 11) return mascarar(d, '00.000.000/0000-00')
  return mascarar(d, '000.000.000-00')
}
