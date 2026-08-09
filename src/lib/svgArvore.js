/**
 * Desenha uma árvore de nós SVG como elementos React.
 *
 * ⚠️ Este arquivo faltava. `bandeirasSvg.js` e `ativosSvg.js` são gerados no
 * formato `[tag, props, filhos?]` e o cabeçalho do primeiro já dizia quem os
 * desenharia — "por `React.createElement`, em ./svgArvore.js" —, mas o arquivo
 * não veio na Fase 0/1. `bandeira.jsx` e `ativoIcone.jsx` o importam, então os
 * dois quebravam a compilação no instante em que alguém os montasse; como
 * nenhuma tela os montava, ninguém tinha visto. A TopBar da Fase 2 usa
 * `Bandeira` no seletor de idioma e o defeito apareceu na primeira execução.
 *
 * ⛔ Por que árvore de dados e não string de marcação: desenhar SVG vindo de
 * texto exigiria `dangerouslySetInnerHTML`, e aí qualquer coisa que chegue à
 * lista de bandeiras vira marcação interpretada em tempo de execução. Com
 * `createElement` o dado é sempre dado — uma tag inesperada vira um elemento
 * inexistente que o React ignora, nunca um `<script>`.
 */
import { createElement } from 'react'

/**
 * @param {Array} nos lista de `[tag, props, filhos?]`
 * @returns {Array} elementos React, na mesma ordem
 */
export function elementos(nos) {
  if (!Array.isArray(nos)) return null
  return nos.map((no, i) => {
    if (!Array.isArray(no)) return null
    const [tag, props, filhos] = no
    // A chave é o índice porque a árvore é ESTÁTICA: ela vem de um arquivo
    // gerado, não de dado que reordena. Índice como chave só é armadilha
    // quando a lista muda de ordem, e esta não muda.
    return createElement(tag, { ...props, key: i }, filhos ? elementos(filhos) : undefined)
  })
}
