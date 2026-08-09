/**
 * O protótipo é publicado no GitHub Pages em
 * https://mutualtecnologia.github.io/Mutual-Backoffice-Corporativo/,
 * ou seja, em um subdiretório — daí `basePath`/`assetPrefix` no build de Pages.
 * Em desenvolvimento a base é `/`, para o dev server seguir em
 * http://localhost:3002/.
 *
 * Mesmo arranjo do `vite.config.js` do mutual-terminal-global, que publica em
 * `/mutual-terminal-global/` e mantém `/` no dev.
 *
 * `output: 'export'` é o que Pages exige: saída estática. A consequência é
 * arquitetural e está registrada em docs/decisoes.md — não há
 * route handler, middleware, server action nem RSC com dados em runtime. A
 * fronteira "tela não decide" é mantida pela camada `src/logic/` (o padrão do
 * terminal global), não pelo servidor.
 *
 * `eslint.ignoreDuringBuilds` fica em `false` de propósito. O
 * prototipo-nextjs-backoffice-onboarding usa `true` para eslint e para
 * typescript, e ali um build verde não prova que a tela abre. O CI deste repo
 * depende do lint para pegar identificador não declarado — a classe de defeito
 * que já derrubou uma tela do terminal global em branco.
 */
const PAGES_BASE = '/Mutual-Backoffice-Corporativo'
const isPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath: isPages ? PAGES_BASE : '',
  assetPrefix: isPages ? PAGES_BASE : '',
  // Pages serve diretório: `/rota/` resolve para `/rota/index.html`.
  trailingSlash: true,
  // `next/image` não tem otimizador em saída estática.
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: false },
}

export default config
