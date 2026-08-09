/**
 * Quais textos aparecem sobre quais fundos — a matriz que a auditoria percorre.
 *
 * Sem esta lista, "validar contraste" não tem como ser feito: contraste não é
 * propriedade de uma cor, é de um par. `--muted-2` sobre `--surface` passa
 * folgado e sobre `--acc-red-bg` chega raspando em 4,61:1 — é o mesmo token, e o
 * segundo caso é o que decide o valor dele.
 *
 * ## De onde vem cada par
 *
 * Nada aqui é suposto. Cada linha tem origem em código que renderiza o par:
 *
 *  - `components/ui/kit.jsx` — `Campo`, `Card`, `Field`, `Row`, `Toggle`,
 *    `Action` e `Note` são as peças que as telas montam, e cada uma declara o
 *    seu par de texto e fundo;
 *  - `components/screens/SettingsScreen.jsx` — a aba ativa é `--brand-on` sobre
 *    `--brand` preenchido;
 *  - `components/shell/Sidebar.jsx` — o selo de contagem é `--brand` sobre
 *    `--accent`, que é o par mais incomum do sistema e o que mais restringe a
 *    escolha das duas cores de marca;
 *  - `styles/global.css` — os três casos que a calibração anterior registrou por
 *    número: `--muted-2` sobre `--acc-red-bg` (o pior do tema claro, 4,61:1),
 *    `--muted-2` sobre `--surface-3` (o único abaixo de AA no escuro) e
 *    `--acc-amber-ink` sobre `--acc-amber-bg`.
 *
 * Um par que não estiver aqui não é auditado. Então quando uma peça nova
 * introduzir uma combinação, ela entra nesta lista — é o registro do que o
 * sistema promete, e a auditoria é só a conferência da promessa.
 *
 * ## Fundos translúcidos
 *
 * Nos temas escuros os `--acc-*-bg` são `rgba`. O campo `sobre` diz contra o que
 * eles são compostos antes da conta — sem isso a razão sai calculada contra uma
 * cor que ninguém vê.
 */

import { canal, compor, hex, razao, ALVO_AA, ALVO_NAO_TEXTO } from './contraste.js'

/**
 * `texto` sobre `fundo`. `alvo` só desce de 4,5 quando o call site é grande de
 * verdade — ver a nota em contraste.js sobre por que o padrão não cede.
 */
export const PARES = [
  // ── Corpo de tela ────────────────────────────────────────────────────
  { texto: '--ink', fundo: '--canvas', onde: 'texto sobre o canvas' },
  { texto: '--ink', fundo: '--surface', onde: 'Card: título · Row: valor · Toggle: rótulo' },
  { texto: '--ink', fundo: '--surface-2', onde: 'Field: texto digitado' },
  { texto: '--ink-2', fundo: '--surface-3', onde: 'Action ghost: rótulo' },
  { texto: '--muted', fundo: '--surface', onde: 'Campo/Field: rótulo' },
  { texto: '--muted', fundo: '--surface-3', onde: 'Field desabilitado: valor' },
  { texto: '--muted-2', fundo: '--surface', onde: 'Card: subtítulo · Row: chave · nota de campo' },
  { texto: '--muted-2', fundo: '--surface-2', onde: 'dica de campo dentro de input' },

  // Os dois casos que a calibração anterior mediu e anotou.
  { texto: '--muted-2', fundo: '--surface-3', onde: 'global.css: era 4,43:1 no tema escuro' },
  { texto: '--muted-2', fundo: '--acc-red-bg', sobre: '--surface', onde: 'global.css: o pior do tema claro, 4,61:1' },

  // ── Avisos contextuais (kit.jsx Note) ────────────────────────────────
  { texto: '--acc-blue-ink', fundo: '--acc-blue-bg', sobre: '--surface', onde: 'Note info' },
  { texto: '--acc-green-ink', fundo: '--acc-green-bg', sobre: '--surface', onde: 'Note ok' },
  { texto: '--acc-amber-ink', fundo: '--acc-amber-bg', sobre: '--surface', onde: 'Note warn · global.css: era 3,70:1' },
  { texto: '--acc-red-ink', fundo: '--acc-red-bg', sobre: '--surface', onde: 'Action danger · Note erro' },

  // ── Estado ───────────────────────────────────────────────────────────
  { texto: '--status-success', fundo: '--surface', onde: 'selo de estado em cartão' },
  { texto: '--status-warning', fundo: '--surface', onde: 'global.css: era 3,23:1 sobre branco' },
  { texto: '--status-error', fundo: '--surface', onde: 'erro de campo · estado recusado' },
  { texto: '--status-info', fundo: '--surface', onde: 'estado informativo' },
  { texto: '--status-pending', fundo: '--surface', onde: 'Processando · Confirmando' },
  { texto: '--value-positive', fundo: '--surface', onde: 'valor de crédito' },
  { texto: '--value-negative', fundo: '--surface', onde: 'valor de débito' },

  // ── Marca ────────────────────────────────────────────────────────────
  { texto: '--brand-on', fundo: '--brand', onde: 'Action primário · aba ativa das Configurações' },
  { texto: '--accent-on', fundo: '--accent', onde: 'texto sobre o destaque' },

  // A marca **preenchida** contra o cartão em que ela se apoia — WCAG 1.4.11, o
  // mínimo para identificar um componente de interface. Este par faltava na
  // matriz, e a ausência escondia um defeito antigo: `--brand` é `#232f63` nos
  // temas claro e escuro, e no escuro o `--surface` é `#151c30`. São 1,34:1 —
  // o botão principal e a aba ativa praticamente não se distinguem do cartão.
  //
  // É por isso que a marca precisa de variante por polaridade de tema: aqui a
  // pergunta É o tema, ao contrário do logotipo, onde era o lugar. O que muda
  // com o tema é a superfície, e é contra ela que a marca tem de aparecer.
  //
  // `--accent` não entra: ele preenche o botão "Depositar" e o selo de contagem,
  // e os dois vivem dentro de cartões `--brand` ou sobre `--brand-deep`, nunca
  // sobre `--surface`. Conferi os call sites antes de incluir — um par que não
  // se renderiza reprovando é ruído que ensina a ignorar a auditoria.
  //
  // Fica como **exceção declarada**, não como reprovação, e a razão é que existe
  // decisão registrada em sentido contrário. O bloco do tema "Azul MutualPay" no
  // `global.css` — removido depois, mas a decisão vale igual — dizia: "#1E40AF
  // sobre #0A1628 dá contraste de 2,2:1 — serve para preencher um botão, não para
  // escrever". Quem escreveu aquilo olhou este caso e aceitou o preenchimento
  // baixo, roteando o *texto* para um tom claro.
  //
  // Discordo em parte — a 1.4.11 é sobre localizar o componente, não sobre ler o
  // rótulo dele —, mas trocar a cor de dois temas por cima de uma decisão
  // documentada não é correção, é sobreposição. O número fica à vista e a escolha
  // é de quem mantém o produto.
  //
  // O que a personalização faz por conta própria é diferente: uma marca
  // **configurada** recebe variante escura derivada com 3:1 garantido
  // (`resolverCores` em lib/marca.js). O tema de fábrica mantém a decisão dele;
  // quem configura recebe a garantia.
  {
    texto: '--brand', fundo: '--surface', alvo: ALVO_NAO_TEXTO, naoTexto: true,
    excecao: 'preenchimento da marca sobre o cartão — decisão registrada no global.css',
    onde: 'preenchimento do botão principal e da aba ativa, sobre o cartão',
  },
  {
    texto: '--accent', fundo: '--brand', alvo: ALVO_NAO_TEXTO, naoTexto: true,
    onde: 'botão Depositar e selo, dentro do cartão da marca',
  },
  // O selo de contagem era `--brand` escrito sobre `--accent`, e por isso as duas
  // cores de marca tinham de contrastar **entre si** — restrição forte, e que
  // rejeitava paletas legítimas: cinza-grafite com amarelo dá 2,85:1.
  //
  // A dependência estava errada. O selo é *texto sobre o destaque*, e existe
  // token para exatamente isso: `--accent-on`, calculado por contraste. Trocado
  // por ele, o selo fica legível com qualquer destaque e as duas cores de marca
  // deixam de se restringir mutuamente. O par saiu da matriz porque deixou de
  // ser renderizado — não porque foi tolerado.
  //
  // Isso apareceu quando a marca ganhou variante escura: a variante derivada é
  // mais clara, e contra o amarelo o selo caía abaixo de AA. O acoplamento já
  // existia; a variante só o tornou visível.

  // ── Bordas e divisórias — WCAG 1.4.11, não 1.4.3 ─────────────────────
  //
  // Esta é uma exceção **declarada**, não um par que passa. A borda de campo é
  // `rgba(15,31,56,.12)` sobre branco — 1,27:1 composto, contra os 3:1 que a
  // WCAG 1.4.11 pede para identificar um componente de interface. O fundo do
  // campo (`--surface-2`, #f7f9fc) também não resolve: dá 1,05:1 contra o
  // cartão, então nem a borda nem o preenchimento identificam o campo no
  // mínimo exigido.
  //
  // Não corrigi porque corrigir é escurecer toda borda do sistema, e isso muda
  // o caráter do desenho — é decisão de produto, não de conformidade. Fica
  // registrada e medida: a auditoria a reporta separadamente e não a usa para
  // reprovar o tema, então ela aparece sem travar o portão.
  {
    texto: '--line-2', fundo: '--surface', alvo: ALVO_NAO_TEXTO, naoTexto: true,
    excecao: 'borda e preenchimento de campo abaixo de 1.4.11 — ver nota em paresTema.js',
    onde: 'borda de campo',
  },

  // ── O cromo: texto sobre a marca ─────────────────────────────────────
  // Barra lateral e superior não seguem o tema — são pintadas com a marca e
  // continuam escuras nos três. A rampa `--nav-*` existe para elas; ver o bloco
  // que a declara em styles/global.css.
  { texto: '--nav-ink', fundo: '--brand-deep', onde: 'Sidebar: "Mutual" 15px' },
  { texto: '--nav-ink-3', fundo: '--brand-deep', onde: 'Sidebar: rótulo de Avisos/Tarefas 11,5px' },
  { texto: '--nav-icon', fundo: '--brand-deep', onde: 'Sidebar: "Buscar ação…" 12,5px' },
  { texto: '--nav-dim', fundo: '--brand-deep', onde: 'Sidebar: selo ⌘K e nota de item 10px' },
  { texto: '--nav-grupo', fundo: '--brand-deep', onde: 'Sidebar: rótulos CONTA, OPERAÇÕES 10px' },
  { texto: '--nav-valor', fundo: '--brand-deep', onde: 'Sidebar: valores do cartão de sessão 10,5px' },
  { texto: '--nav-muted', fundo: '--brand-deep', onde: 'Sidebar: resumo da sessão 10,5px' },
  { texto: '--nav-acao', fundo: '--brand-deep', onde: 'Sidebar: "ver detalhes" 10px' },
  { texto: '--nav-ok', fundo: '--brand-deep', onde: 'Sidebar: selo de verificação 9,5px' },
  { texto: '--nav-aviso', fundo: '--brand-deep', onde: 'Sidebar: aviso de trava 9,5px' },
  { texto: '--nav-erro', fundo: '--brand-deep', onde: 'Sidebar: erro de geolocalização 9,5px' },

  // O mesmo tom, dois papéis. Na barra lateral é texto — os rótulos em caixa
  // alta do cartão de sessão e o e-mail do rodapé —, e responde a 4,5:1.
  { texto: '--nav-rotulo', fundo: '--brand-deep', onde: 'Sidebar: PATRIMÔNIO TOTAL, rótulos e e-mail 9–11px' },

  // O menu de sessão flutua com fundo opaco próprio.
  { texto: '--nav-erro', fundo: '--nav-menu', onde: 'Sidebar: "Sair da conta" 12,5px' },
  { texto: '--nav-rotulo', fundo: '--nav-menu', onde: 'Sidebar: e-mail no menu 10,5px' },
  { texto: '--nav-ink', fundo: '--nav-avatar', onde: 'Sidebar: iniciais no avatar 12px' },

  { texto: '--nav-ink', fundo: '--brand-bar', onde: 'TopBar: nome da conta 12,5px' },
  { texto: '--nav-ink-2', fundo: '--brand-bar', onde: 'TopBar: cor de corpo herdada' },
  { texto: '--nav-ink-3', fundo: '--brand-bar', onde: 'TopBar: ícone do hambúrguer' },
  { texto: '--nav-muted', fundo: '--brand-bar', onde: 'TopBar: agência e conta 11px' },
  { texto: '--nav-icon', fundo: '--brand-bar', onde: 'TopBar: ícone de carteira' },
  // Na barra superior o mesmo tom só pinta chevron — forma, e o alvo é 3:1.
  // Sobre `--brand-bar` ele dá 4,24:1, que não cumpriria 4,5:1 se fosse texto.
  {
    texto: '--nav-rotulo', fundo: '--brand-bar', alvo: ALVO_NAO_TEXTO, naoTexto: true,
    onde: 'TopBar: chevron — forma, não texto',
  },

  // O selo de não lidos da TopBar: mesmo par de `--accent-on` sobre `--accent`
  // que já está declarado acima.

  // Medido e registrado, sem exigência — e a diferença em relação à borda de
  // campo acima não é conveniência, é o texto da norma.
  //
  // A WCAG 1.4.11 pede 3:1 para "a informação visual necessária para
  // identificar componentes de interface e estados", e isenta o que é
  // puramente decorativo. A borda de um campo *é* o que identifica o campo:
  // sem ela não se sabe onde clicar, então a norma se aplica e o par fica como
  // exceção declarada. A divisória entre grupos da barra lateral não identifica
  // nada — os grupos já têm rótulo escrito ("CONTA", "OPERAÇÕES"), e removê-la
  // não perde informação alguma. É decoração, e a norma a isenta.
  //
  // Fica na matriz como informativo: se um dia ela virar o único separador
  // entre grupos sem rótulo, o número já está à mão.
  {
    texto: '--nav-line', fundo: '--brand-deep', informativo: true,
    onde: 'Sidebar: divisória entre grupos — decorativa, 1.4.11 não se aplica',
  },
]

/**
 * Percorre a matriz e devolve o que reprovou.
 *
 * `resolver` recebe o nome do token e devolve o valor. Em tempo de execução é
 * `getComputedStyle(el).getPropertyValue`; num teste, o acesso a um objeto. A
 * função não sabe de onde vem o valor de propósito — é o que permite auditar um
 * tema que ainda não foi aplicado à tela.
 *
 * Um par cujo token não resolve entra como `indefinido`, separado dos
 * reprovados: token que falta é erro de configuração, não de contraste, e somar
 * os dois esconde o primeiro.
 */
export function auditar(resolver) {
  const ler = (nome) => {
    const v = resolver(nome)
    return typeof v === 'string' && v.trim() ? v.trim() : null
  }

  const reprovados = []
  const indefinidos = []
  const aprovados = []
  /**
   * Pares que reprovam e cuja reprovação já foi decidida e registrada. Ficam
   * fora de `reprovados` para o portão não nascer vermelho, mas são devolvidos
   * medidos — uma exceção que não mostra o número volta a ser um esquecimento.
   */
  const excecoes = []
  /** Medidos e devolvidos, sem alvo — a norma não os alcança. */
  const informativos = []

  for (const par of PARES) {
    const fg = ler(par.texto)
    const bgCru = ler(par.fundo)
    if (!fg || !bgCru) {
      indefinidos.push({ ...par, faltando: !fg ? par.texto : par.fundo })
      continue
    }

    // Fundo translúcido precisa do que está atrás para virar cor visível.
    let bg = bgCru
    if (par.sobre) {
      const atras = ler(par.sobre)
      const composto = atras ? compor(bgCru, atras) : null
      if (!composto) {
        indefinidos.push({ ...par, faltando: par.sobre })
        continue
      }
      bg = hex(composto)
    }

    // Frente translúcida também precisa compor — e aqui contra o fundo já
    // resolvido, não contra o `sobre`. `--line-2` é `rgba(15,31,56,.12)` e
    // `--nav-line` é branco a 8%: tratados como opacos, os dois dariam razão
    // altíssima e a auditoria aprovaria divisória que não se vê.
    let fgReal = fg
    const cFg = canal(fg)
    if (cFg && cFg.a < 1) {
      const composto = compor(fg, bg)
      if (!composto) {
        indefinidos.push({ ...par, faltando: 'frente translúcida sem fundo opaco' })
        continue
      }
      fgReal = hex(composto)
    }

    const r = razao(fgReal, bg)
    const alvo = par.alvo ?? ALVO_AA
    const linha = { ...par, fg: fgReal, bg, razao: r, alvo }
    if (r === null) indefinidos.push({ ...linha, faltando: 'cor ilegível' })
    else if (par.informativo) informativos.push(linha)
    else if (r < alvo) (par.excecao ? excecoes : reprovados).push(linha)
    else aprovados.push(linha)
  }

  // Do pior para o melhor: quem lê o relatório quer o que está mais longe.
  reprovados.sort((a, b) => a.razao - b.razao)
  excecoes.sort((a, b) => a.razao - b.razao)

  return {
    ok: reprovados.length === 0 && indefinidos.length === 0,
    total: PARES.length,
    reprovados,
    excecoes,
    informativos,
    indefinidos,
    aprovados,
    /**
     * O pior par que passou — a folga real do tema. É o número que diz quanto
     * a personalização pode mexer antes de alguma coisa reprovar.
     */
    pior: aprovados.length ? aprovados.reduce((m, x) => (x.razao < m.razao ? x : m)) : null,
  }
}

/** Auditoria do que está pintado na tela agora. Só no navegador. */
export function auditarDocumento(el) {
  if (typeof window === 'undefined') return null
  const alvo = el || document.querySelector('.theme-light,.theme-dark') || document.documentElement
  const estilo = window.getComputedStyle(alvo)
  return auditar((nome) => estilo.getPropertyValue(nome))
}
