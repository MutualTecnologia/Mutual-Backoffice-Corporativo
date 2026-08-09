/**
 * Normalização de estilos inline.
 *
 * Vários métodos da lógica devolvem estilos já como objeto, mas alguns ainda
 * devolvem a string CSS herdada do protótipo. O runtime `x-dc` aceitava as duas
 * formas (convertia string em objeto antes de repassar ao React); `sx` mantém
 * esse comportamento para que a lógica portada não precise ser reescrita.
 */

const kebabToCamel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

/** Divide declarações em `;` de nível superior, ignorando parênteses e aspas. */
function splitDeclarations(css) {
  const out = []
  let depth = 0
  let quote = ''
  let start = 0
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) quote = ''
    } else if (c === '"' || c === "'") quote = c
    else if (c === '(') depth++
    else if (c === ')') depth = Math.max(0, depth - 1)
    else if (c === ';' && depth === 0) {
      out.push(css.slice(start, i))
      start = i + 1
    }
  }
  out.push(css.slice(start))
  return out
}

export function cssToObject(css) {
  const style = {}
  for (const decl of splitDeclarations(css)) {
    const colon = decl.indexOf(':')
    if (colon < 0) continue
    const prop = decl.slice(0, colon).trim()
    if (!prop) continue
    style[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(colon + 1).trim()
  }
  return style
}

export function sx(value) {
  if (typeof value === 'string') return cssToObject(value)
  return value || undefined
}
