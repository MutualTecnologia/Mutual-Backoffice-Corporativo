/**
 * Resolve o caminho de um arquivo servido a partir de `public/`.
 *
 * O Vite reescreve caminhos absolutos que aparecem no `index.html`, mas não os
 * que estão dentro de strings JavaScript. Como o site é publicado em um
 * subdiretório no GitHub Pages (`/mutual-terminal-global/`), um `/logos/…` literal apontaria
 * para a raiz do domínio e daria 404. `BASE_URL` já traz a base configurada no
 * build — `/` em desenvolvimento — e resolve os dois casos.
 *
 * @param {string} path caminho relativo a `public/`, sem barra inicial
 */
export function asset(path) {
  return import.meta.env.BASE_URL + String(path).replace(/^\/+/, '')
}
