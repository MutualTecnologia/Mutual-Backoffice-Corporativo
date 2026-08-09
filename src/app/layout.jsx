/**
 * Raiz do protótipo.
 *
 * A ordem das importações é a mesma do `src/main.jsx` do mutual-terminal-global:
 * a Montserrat primeiro (300/400/500 — a escala-alvo é 300/400, o 500 fica
 * carregado e é evitado), depois `global.css`, depois `hover.css`. Inverter
 * deixa o `hover.css` perder para as regras de estado do global.
 *
 * A classe de tema saiu do `<body>` na Fase 2 e passou ao `<main>`, dentro do
 * `AppShell` — é o que `global.css` sempre documentou ("`.theme-light` /
 * `.theme-dark` aplicadas ao <main> e aos overlays"). No `<body>` ela pintava
 * também a barra lateral, que lê `--nav-*` de `:root` e é escura nos dois
 * temas: o seletor de tema clareava a barra junto e a tinta branca do menu
 * sumia no próprio fundo.
 *
 * O `<body>` fica com o azul profundo da marca porque é o que aparece atrás da
 * barra quando a página rola além do conteúdo.
 */
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'

import '../styles/global.css'
import '../styles/hover.css'

import AppShell from '../components/shell/AppShell.jsx'

export const metadata = {
  title: 'Backoffice Corporativo — Mutual',
  description:
    'Protótipo navegável de telas, processos e fluxos do backoffice que serve o Mutual Terminal Global.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ background: 'var(--brand-deep)' }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
