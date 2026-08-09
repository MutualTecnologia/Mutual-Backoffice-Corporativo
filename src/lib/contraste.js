/**
 * Contraste: a razão da WCAG, a tinta que passa e a auditoria dos pares.
 *
 * Este arquivo existe porque a personalização de cor vai mexer em tokens que
 * hoje têm valor calibrado à mão. O `styles/global.css` registra a calibração e
 * o custo dela — `--muted-2` era `#8592ab`, dava 3,14:1 sobre branco e reprovava
 * em 89 amostras; `--acc-amber-ink` era `#9a7c3d` e dava 3,70:1 sobre o próprio
 * âmbar. Alguém mediu, corrigiu e anotou o número.
 *
 * Deixar a cor virar campo de formulário sem uma guarda joga esse trabalho fora
 * na primeira vez que alguém escolher um tom claro. Então a ordem é inversa: a
 * pessoa escolhe a marca, e é o sistema que decide a tinta que vai por cima.
 *
 * ## O que fica de fora, de propósito
 *
 * **Não sabemos o que é "grande" sem olhar o call site.** A WCAG pede 4,5:1 para
 * texto normal e 3:1 a partir de 18,66px normal ou 14px negrito. A escala deste
 * terminal vive entre 10,5 e 13,5px — quase tudo é texto normal. Por isso o
 * padrão aqui é 4,5:1, e o alívio de 3:1 tem de ser pedido explicitamente, com o
 * tamanho na mão.
 *
 * **A composição de `rgba` precisa do fundo.** Metade dos `--acc-*-bg` dos temas
 * escuros é translúcida (`rgba(229,87,106,.16)`), e a cor que o olho vê depende
 * do que está atrás. `compor` resolve isso; ignorar resolveria errado, e para o
 * lado otimista — que é o pior lado para uma guarda de acessibilidade.
 */

/** Canaliza `#abc`, `#aabbcc`, `rgb()` e `rgba()` em `{r,g,b,a}` de 0–255/0–1. */
export function canal(cor) {
  const s = String(cor).trim()

  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const h = hex[1]
    const largo = h.length === 6
    const parte = (i) => {
      const t = largo ? h.slice(i * 2, i * 2 + 2) : h[i] + h[i]
      return parseInt(t, 16)
    }
    return { r: parte(0), g: parte(1), b: parte(2), a: 1 }
  }

  const rgb = s.match(/^rgba?\(([^)]+)\)$/i)
  if (rgb) {
    const p = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number)
    if (p.length < 3 || p.slice(0, 3).some((n) => !Number.isFinite(n))) return null
    const a = p.length > 3 && Number.isFinite(p[3]) ? p[3] : 1
    return { r: p[0], g: p[1], b: p[2], a }
  }

  return null
}

/** De volta para `#rrggbb`. Descarta alfa — quem chama já compôs. */
export function hex({ r, g, b }) {
  const oitava = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return '#' + oitava(r) + oitava(g) + oitava(b)
}

/**
 * Achata uma cor translúcida contra o que está atrás dela.
 *
 * `fundo` tem de ser opaco. Um `rgba` sobre outro `rgba` acontece no sistema
 * (um selo dentro de um cartão dentro do canvas), e nesse caso quem chama compõe
 * de dentro para fora — a função é associativa nessa ordem.
 */
export function compor(frente, fundo) {
  const f = canal(frente)
  const t = canal(fundo)
  if (!f || !t) return null
  if (f.a >= 1) return { r: f.r, g: f.g, b: f.b, a: 1 }
  const a = f.a
  return {
    r: f.r * a + t.r * (1 - a),
    g: f.g * a + t.g * (1 - a),
    b: f.b * a + t.b * (1 - a),
    a: 1,
  }
}

/** Luminância relativa, na definição da WCAG 2.x. */
export function luminancia(cor) {
  const c = canal(cor)
  if (!c) return null
  const linear = (v) => {
    const n = v / 255
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linear(c.r) + 0.7152 * linear(c.g) + 0.0722 * linear(c.b)
}

/**
 * Razão de contraste entre duas cores opacas, de 1 a 21.
 *
 * Devolve `null` quando não consegue ler uma das duas — e `null` não é 1 nem 21:
 * quem audita tem de tratar "não sei" como caso a investigar, não como aprovado
 * nem como reprovado.
 */
export function razao(a, b) {
  const la = luminancia(a)
  const lb = luminancia(b)
  if (la === null || lb === null) return null
  const claro = Math.max(la, lb)
  const escuro = Math.min(la, lb)
  return (claro + 0.05) / (escuro + 0.05)
}

/** Arredonda para duas casas, no formato que a WCAG usa para relatar. */
export const razaoTxt = (v) => (v === null ? '—' : v.toFixed(2).replace('.', ',') + ':1')

/** O mínimo que a WCAG AA pede. `grande` é ≥18,66px normal ou ≥14px negrito. */
export const ALVO_AA = 4.5
export const ALVO_AA_GRANDE = 3
/** Componente de interface e borda — WCAG 1.4.11. */
export const ALVO_NAO_TEXTO = 3

export function passa(fg, bg, alvo = ALVO_AA) {
  const r = razao(fg, bg)
  return r === null ? false : r >= alvo
}

/**
 * Preto ou branco sobre `fundo` — o que tiver mais contraste.
 *
 * É o que resolve `--brand-on` e `--accent-on` sem perguntar. O dourado
 * `#fcb71b` da marca dá 1,72:1 com branco e 12,2:1 com o azul-marinho da
 * própria marca; deixar essa escolha para quem está mexendo no color picker é
 * pedir para alguém publicar texto branco sobre amarelo.
 *
 * `escuro` e `claro` podem ser trocados por tons do próprio tema — o preto e o
 * branco puros são o padrão porque maximizam a razão, mas um `--ink` já é
 * escuro o suficiente na maioria dos fundos claros e destoa menos.
 */
export function tintaSobre(fundo, escuro = '#000000', claro = '#ffffff') {
  const comEscuro = razao(escuro, fundo)
  const comClaro = razao(claro, fundo)
  if (comEscuro === null) return claro
  if (comClaro === null) return escuro
  return comEscuro >= comClaro ? escuro : claro
}

/**
 * Escurece ou clareia `cor` até ela passar sobre `fundo`.
 *
 * Anda em passos de 2% na direção que aumenta a razão e para no primeiro valor
 * que serve, para não estourar a cor além do necessário — a intenção é manter o
 * matiz reconhecível, e é o mesmo critério que o `global.css` descreve ao trocar
 * `#9a7c3d` por `#846829`: "chega a 4,86:1 sem sair do âmbar".
 *
 * Devolve `null` quando nem o preto nem o branco puros passariam. Isso não é
 * falha da função: é fundo que não aceita texto e precisa mudar ele mesmo.
 */
export function ajustar(cor, fundo, alvo = ALVO_AA) {
  const c = canal(cor)
  if (!c || luminancia(fundo) === null) return null
  if (passa(cor, fundo, alvo)) return hex(c)

  // Para qual lado ir: se o fundo é claro, a cor tem de escurecer.
  const fundoClaro = luminancia(fundo) > 0.5
  const rumo = fundoClaro ? -1 : 1

  // ── Fase 1: escalonar os canais ────────────────────────────────────────
  // Multiplicar preserva a saturação, e é o que mantém o matiz reconhecível —
  // "chega a 4,86:1 sem sair do âmbar", como o global.css descreve.
  for (let passo = 1; passo <= 50; passo++) {
    const f = 1 + rumo * 0.02 * passo
    const atual = {
      r: Math.max(0, Math.min(255, c.r * f)),
      g: Math.max(0, Math.min(255, c.g * f)),
      b: Math.max(0, Math.min(255, c.b * f)),
    }
    if (passa(hex(atual), fundo, alvo)) return hex(atual)
  }

  // ── Fase 2: misturar com o extremo ─────────────────────────────────────
  // Escalonar tem teto: dobrar `#232f63` dá `#465ec6`, que sobre o cartão do
  // tema escuro chega a 2,97:1 — encosta em 3:1 e não passa. A versão anterior
  // desistia aqui e devolvia o extremo puro, e o resultado era um botão
  // **branco** no lugar do azul-marinho da marca: contraste resolvido, marca
  // perdida. Misturar em passos devolve o primeiro tom que serve, e um azul
  // claro continua sendo a marca; branco não é.
  const extremo = fundoClaro ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }
  const base = {
    r: Math.max(0, Math.min(255, c.r * (1 + rumo))),
    g: Math.max(0, Math.min(255, c.g * (1 + rumo))),
    b: Math.max(0, Math.min(255, c.b * (1 + rumo))),
  }
  for (let passo = 1; passo <= 50; passo++) {
    const t = passo / 50
    const atual = {
      r: base.r + (extremo.r - base.r) * t,
      g: base.g + (extremo.g - base.g) * t,
      b: base.b + (extremo.b - base.b) * t,
    }
    if (passa(hex(atual), fundo, alvo)) return hex(atual)
  }

  // Nem o extremo puro passa: é fundo que não aceita nada por cima e precisa
  // mudar ele mesmo.
  return passa(hex(extremo), fundo, alvo) ? hex(extremo) : null
}
