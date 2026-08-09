'use client'

/**
 * O shell da Fase 2 — a peça que faltava entre os componentes e a tela.
 *
 * A Fase 1 entregou `Sidebar`, `TopBar`, `PageHeader` e `CommandPalette` como
 * componentes cegos, cada um esperando um `vals` pronto. Nenhum deles chegou a
 * renderizar, porque o `renderVals.js` do terminal não veio junto e ninguém os
 * importava: a `page.jsx` era um placeholder de 45 linhas. Este arquivo é o
 * outro lado — todo o estado do shell mora aqui, e desce como `vals`.
 *
 * ⛔ Por que o estado é UM só, e não um por componente: a barra e o topo
 * compartilham quatro coisas (a gaveta, a paleta, o tema e os saldos ocultos).
 * Dois `useState` para a mesma verdade produzem o estado que diverge — a gaveta
 * fechada para a TopBar e aberta para a Sidebar, com o scrim de uma cobrindo o
 * botão da outra.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import PageHeader from './PageHeader.jsx'
import CommandPalette from './CommandPalette.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import {
  CONTAS,
  ENTIDADES,
  icone,
  montarNavGroups,
  tituloDaRota,
  totalDasContas,
} from '../../logic/renderVals.js'
import { ESTEIRAS, TRANSVERSAL, todasAsRotas, acharPorHref } from '../../logic/navigation.js'
import { brl } from '../../lib/valor.js'

/**
 * O mesmo 900px de `global.css` e de `logic/viewport.js`.
 *
 * ⚠️ Divergir dos outros dois produz gaveta aberta sem gaveta na tela: o JS
 * acha que é estreito, o CSS acha que não, e a barra fica fixa por cima do
 * conteúdo sem o scrim que a fecharia.
 */
const CORTE_ESTREITO = 900

/** Fusos oferecidos — os que a Mesa efetivamente acompanha. */
const FUSOS = [
  { grupo: 'Brasil', zona: 'America/Sao_Paulo', pais: 'Brasil', cidade: 'São Paulo · GMT-3' },
  { grupo: 'Brasil', zona: 'America/Manaus', pais: 'Brasil', cidade: 'Manaus · GMT-4' },
  { grupo: 'Américas', zona: 'America/New_York', pais: 'Estados Unidos', cidade: 'Nova York · GMT-5' },
  { grupo: 'Européia', zona: 'Europe/London', pais: 'Reino Unido', cidade: 'Londres · GMT+0' },
  { grupo: 'Européia', zona: 'Europe/Lisbon', pais: 'Portugal', cidade: 'Lisboa · GMT+0' },
  { grupo: 'Ásia', zona: 'Asia/Tokyo', pais: 'Japão', cidade: 'Tóquio · GMT+9' },
]

const TEMAS = [
  { id: 'light', nome: 'Claro', sub: 'Padrão do backoffice', ic: 'sol' },
  { id: 'dark', nome: 'Escuro', sub: 'Mesa em plantão noturno', ic: 'lua' },
  { id: 'system', nome: 'Sistema', sub: 'Acompanha o aparelho', ic: 'monitor' },
]

const IDIOMAS = [
  { id: 'pt-BR', code: 'PT', pais: 'BR', name: 'Português', sub: 'Brasil' },
  { id: 'en-US', code: 'EN', pais: 'US', name: 'English', sub: 'United States' },
  { id: 'es-ES', code: 'ES', pais: 'ES', name: 'Español', sub: 'España' },
]

const RITMOS = [
  { id: 'lento', label: 'Lento · 15s' },
  { id: 'normal', label: 'Normal · 8s' },
  { id: 'rapido', label: 'Rápido · 3s' },
]

/** Estilo comum dos itens de menu suspenso (conta, entidade, tema, idioma). */
const ITEM_MENU = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '11px 14px',
  border: 'none',
  background: 'transparent',
  fontFamily: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
}

export default function AppShell({ children }) {
  /**
   * ⚠️ A barra final SAI aqui, e a razão é um defeito que o e2e pegou na
   * primeira execução: `next.config.mjs` liga `trailingSlash: true` porque o
   * Pages serve diretório, então `usePathname()` devolve `/otc/mesa/`. A
   * navegação declara `/otc/mesa`. As duas formas nunca eram iguais, e o
   * resultado era **nenhum item do menu acendendo em nenhuma das 47 telas** —
   * a tela abria certa, o cabeçalho dizia o nome certo, e só a marca de "você
   * está aqui" faltava. Lint, build e as asserções de Node passaram por isso
   * sem um arranhão.
   */
  const caminho = usePathname() || '/'
  const rota = caminho === '/' ? '/' : caminho.replace(/\/+$/, '')
  const router = useRouter()

  /* ── Estado da navegação ───────────────────────────────────────────────── */
  const [navWide, setNavWide] = useState(true)
  const [drawer, setDrawer] = useState(false)
  const [estreita, setEstreita] = useState(false)
  const [abertos, setAbertos] = useState({})

  /* ── Estado do topo ────────────────────────────────────────────────────── */
  const [conta, setConta] = useState(CONTAS[0].key)
  const [entidade, setEntidade] = useState(ENTIDADES[0].key)
  const [buscaEntidade, setBuscaEntidade] = useState('')
  const [tema, setTema] = useState('light')
  const [idioma, setIdioma] = useState('pt-BR')
  const [fuso, setFuso] = useState(FUSOS[0].zona)
  const [buscaFuso, setBuscaFuso] = useState('')
  const [saldosOcultos, setSaldosOcultos] = useState(false)
  const [demoLigado, setDemoLigado] = useState(true)
  const [ritmo, setRitmo] = useState('normal')
  const [menu, setMenu] = useState(null)
  const [cmdAberta, setCmdAberta] = useState(false)
  const [cmdBusca, setCmdBusca] = useState('')
  const [cmdIndice, setCmdIndice] = useState(0)
  const [detalhesSessao, setDetalhesSessao] = useState(false)
  const [contagem, setContagem] = useState(8)

  const abrirMenu = useCallback((qual) => setMenu((m) => (m === qual ? null : qual)), [])

  /**
   * Largura da janela.
   *
   * ⚠️ Só depois de montar. Ler `window` durante o render quebraria a
   * pré-renderização estática — que é o modo deste app inteiro (`output:
   * 'export'`), não um detalhe de build.
   */
  useEffect(() => {
    const medir = () => setEstreita(window.innerWidth < CORTE_ESTREITO)
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  /** ⌘K / Ctrl+K abre; Esc fecha o que estiver aberto. */
  useEffect(() => {
    const tecla = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdAberta((v) => !v)
        setCmdBusca('')
        setCmdIndice(0)
      }
      if (e.key === 'Escape') {
        setCmdAberta(false)
        setMenu(null)
        setDrawer(false)
      }
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [])

  /**
   * O relógio da próxima cotação.
   *
   * ⛔ Não é enfeite: a TopBar anuncia o número por `aria-label` como estado
   * ao vivo. Parado em 8 ele afirmaria, a cada leitura, uma atualização que
   * nunca chega. Quando a demo está desligada ele congela — e aí o congelado
   * é a verdade.
   */
  useEffect(() => {
    if (!demoLigado) return undefined
    const passo = ritmo === 'rapido' ? 400 : ritmo === 'lento' ? 1800 : 1000
    const id = setInterval(() => setContagem((s) => (s <= 1 ? 8 : s - 1)), passo)
    return () => clearInterval(id)
  }, [demoLigado, ritmo])

  /** Trocar de tela fecha a gaveta — senão ela cobre a tela que acabou de abrir. */
  const navegar = useCallback(
    (href) => {
      router.push(href)
      setDrawer(false)
      setCmdAberta(false)
    },
    [router],
  )

  const alternar = useCallback(
    (chave) => setAbertos((a) => ({ ...a, [chave]: a[chave] === false })),
    [],
  )

  /* ── Resultados da paleta ──────────────────────────────────────────────── */
  const cmdResultados = useMemo(() => {
    const termo = cmdBusca.trim().toLowerCase()
    const todas = todasAsRotas()
      .map((href) => {
        const achado = acharPorHref(href)
        return {
          href,
          nome: achado.item.label,
          grupo: achado.esteira.label,
        }
      })
      .filter((r) => !termo || `${r.nome} ${r.grupo}`.toLowerCase().includes(termo))
      .slice(0, 40)
    return todas
  }, [cmdBusca])

  const contaAtiva = CONTAS.find((c) => c.key === conta) || CONTAS[0]
  const entidadeAtiva = ENTIDADES.find((e) => e.key === entidade) || ENTIDADES[0]
  const temaAtivo = TEMAS.find((t) => t.id === tema) || TEMAS[0]
  const idiomaAtivo = IDIOMAS.find((l) => l.id === idioma) || IDIOMAS[0]
  const fusoAtivo = FUSOS.find((f) => f.zona === fuso) || FUSOS[0]
  const { titulo, sub } = tituloDaRota(rota)

  const classeTema = tema === 'dark' ? 'theme-dark' : 'theme-light'
  const superficie = tema === 'dark' ? '#16203c' : '#ffffff'
  const bordaSuperficie = tema === 'dark' ? 'rgba(255,255,255,.1)' : 'rgba(15,31,56,.09)'
  const tinta = tema === 'dark' ? '#e6ecf8' : '#232f63'

  const marcaCheck = (ativo) => ({ flex: 'none', display: ativo ? 'flex' : 'none' })

  /* ── vals da Sidebar ───────────────────────────────────────────────────── */
  const valsAside = {
    navDrawerAberto: drawer,
    navEstreita: estreita,
    // Na gaveta o compacto não faz sentido: ela já é uma sobreposição de 280px
    // que o usuário abriu de propósito, e mostrá-la com 68px de ícones seria
    // esconder o menu dentro do menu.
    navWide: estreita ? true : navWide,
    asideStyle: {
      '--nav-w': navWide ? '236px' : '68px',
      background: 'var(--brand-deep)',
      borderRight: '1px solid var(--nav-line)',
    },
    navLogo: { tipo: 'letra', valor: 'M' },
    navNome: 'Mutual',
    navTagline: 'BACKOFFICE CORPORATIVO',
    toggleCompact: () => setNavWide((v) => !v),
    openCmd: () => setCmdAberta(true),
    goNotificacoes: () => navegar('/sistema/tickets'),
    goSolicitacoes: () => navegar('/controle/aprovacoes'),
    ntHasUnread: true,
    ntUnread: 6,
    navGroups: montarNavGroups({
      rota,
      abertos,
      alternar,
      navegar,
      navWide: navWide || estreita,
    }),
    // O transversal entra em `navGroups`, junto das esteiras — ver o comentário
    // em `montarNavGroups`. Este caminho fica vazio de propósito.
    sysItems: [],
    limVerif: { libera: 'Nível 3 — libera operação de câmbio e saque acima de R$ 1 mi' },
    limVerifSelo: 'Nível 3',
    ovTotal: totalDasContas(),
    balanceBlur: saldosOcultos ? 'blur(7px)' : 'none',
    goDepositar: () => navegar('/controle/contas'),
    sesTitulo: 'SESSÃO',
    sesUnicaSelo: 'única',
    sesEmail: 'operador@mutualpay.co',
    sesRelogioIconEl: icone('relogio', { tamanho: 12, cor: 'var(--nav-muted)' }),
    sesResumo: 'há 42 min · Chrome · São Paulo',
    sesDetalhes: detalhesSessao,
    sesDetalhesAlternar: () => setDetalhesSessao((v) => !v),
    sesDetalhesRotulo: detalhesSessao ? 'Ocultar detalhes' : 'Ver detalhes da sessão',
    sesLinhas: [
      { k: 'Perfil', v: 'Operador de Mesa', nota: 'Segregação de funções: não aprova o que origina' },
      { k: 'Aparelho', v: 'Chrome 141 · Windows 11' },
      { k: 'Início', v: 'hoje, 09:14 (GMT-3)' },
    ],
    sesGeoRotulo: 'LOCALIZAÇÃO',
    sesGeoValor: '',
    sesGeoPrecisao: '',
    sesGeoErro: '',
    sesGeoBotao: 'Informar localização',
    sesGeoBuscando: false,
    sesGeoPedir: () => {},
    sesGeoNota: 'Usada para checar a origem do acesso. Simulada neste protótipo.',
    sesTravaIconEl: icone('cadeado', { tamanho: 10, cor: 'var(--nav-rotulo)' }),
    sesTravaTitulo: 'TRAVAS DA SESSÃO',
    sesTravaLocal: 'Bloqueio automático após 15 min sem uso.',
    sesAvisoIconEl: icone('alerta', { tamanho: 10, cor: 'var(--nav-aviso)' }),
    sesTravaServidor: 'Sem back-end: nada aqui é verificado no servidor.',
    sesTrava2fa: '2FA entra junto com a autenticação real.',
    authMenuOpen: menu === 'auth',
    authMenuFechar: () => setMenu(null),
    authMenuToggle: () => abrirMenu('auth'),
    authUsuarioNome: 'Operador Mutual',
    authUsuarioEmail: 'operador@mutualpay.co',
    authUsuarioIniciais: 'OM',
    authSair: () => setMenu(null),
    authSairIconEl: icone('sair', { tamanho: 15, cor: 'var(--nav-erro)' }),
  }

  /* ── vals da TopBar ────────────────────────────────────────────────────── */
  const valsTopo = {
    abrirNav: () => setDrawer(true),
    navDrawerAberto: drawer,
    surfaceBg: superficie,
    surfaceBorder: bordaSuperficie,
    textColor: tinta,

    toggleWallet: () => abrirMenu('conta'),
    walletOpen: menu === 'conta',
    walletName: contaAtiva.name,
    accountLine: saldosOcultos ? '•••• ••••' : brl(contaAtiva.saldo),
    walletOptions: CONTAS.map((c) => ({
      key: c.key,
      name: c.name,
      type: c.type,
      sub: c.sub,
      hint: c.hint,
      balance: saldosOcultos ? '•••••' : brl(c.saldo),
      active: c.key === conta,
      onClick: () => {
        setConta(c.key)
        setMenu(null)
      },
      style: { ...ITEM_MENU, alignItems: 'flex-start', justifyContent: 'space-between' },
      checkEl: c.key === conta ? icone('check', { tamanho: 14, cor: 'var(--status-success)' }) : null,
    })),

    otcNext: contagem,
    toggleBalances: () => setSaldosOcultos((v) => !v),

    fusoAbrir: () => abrirMenu('fuso'),
    fusoFechar: () => setMenu(null),
    fusoMenuAberto: menu === 'fuso',
    fusoLabel: fusoAtivo.cidade.split(' · ')[1] || 'GMT-3',
    fusoTitulo: `Fuso de exibição: ${fusoAtivo.cidade}`,
    fusoBusca: buscaFuso,
    onFusoBusca: (e) => setBuscaFuso(e.target.value),
    fusoGrupos: agruparFusos(buscaFuso, fuso, (z) => {
      setFuso(z)
      setMenu(null)
    }),
    fusoVazio: filtrarFusos(buscaFuso).length === 0,
    fusoRodape: 'Muda a hora que o terminal escreve, não o horário da Mesa.',

    demoToggleMenu: () => abrirMenu('demo'),
    demoMenuAberto: menu === 'demo',
    demoLigado,
    demoTitulo: demoLigado ? 'Demonstração ativa' : 'Demonstração pausada',
    demoAlternar: () => setDemoLigado((v) => !v),
    demoOpcoes: RITMOS.map((r) => ({
      id: r.id,
      label: r.label,
      ativo: r.id === ritmo,
      onClick: () => setRitmo(r.id),
    })),

    toggleThemeMenu: () => abrirMenu('tema'),
    themeOpen: menu === 'tema',
    themeTitle: `Tema: ${temaAtivo.nome}`,
    themeIcon: icone(temaAtivo.ic, { tamanho: 18, cor: 'var(--nav-ink-3)' }),
    themeOpts: TEMAS.map((t) => ({
      id: t.id,
      nome: t.nome,
      sub: t.sub,
      iconEl: icone(t.ic, { tamanho: 16, cor: 'var(--muted-2)' }),
      onClick: () => {
        setTema(t.id)
        setMenu(null)
      },
      style: ITEM_MENU,
      check: marcaCheck(t.id === tema),
    })),

    toggleLang: () => abrirMenu('idioma'),
    langOpen: menu === 'idioma',
    langCode: idiomaAtivo.code,
    langPais: idiomaAtivo.pais,
    langOpts: IDIOMAS.map((l) => ({
      pais: l.pais,
      name: l.name,
      sub: l.sub,
      onClick: () => {
        setIdioma(l.id)
        setMenu(null)
      },
      style: ITEM_MENU,
      check: marcaCheck(l.id === idioma),
    })),

    openCmd: () => setCmdAberta(true),
    goSuporte: () => navegar('/sistema/suporte'),
    goNotificacoes: () => navegar('/sistema/tickets'),
    ntHasUnread: true,
    ntUnread: 6,

    toggleEntity: () => abrirMenu('entidade'),
    entityOpen: menu === 'entidade',
    entityIconEl: icone('predio', { tamanho: 15, cor: 'var(--nav-ink-3)' }),
    entityName: entidadeAtiva.name,
    entityDoc: entidadeAtiva.doc,
    entityCount: ENTIDADES.length - 1,
    entityQuery: buscaEntidade,
    onEntityQuery: (e) => setBuscaEntidade(e.target.value),
    entitySearchIconEl: icone('lupa', { tamanho: 14, cor: 'var(--muted-2)' }),
    entityShown: ENTIDADES.filter((e) => casaEntidade(e, buscaEntidade)).length,
    entityOptions: ENTIDADES.filter((e) => casaEntidade(e, buscaEntidade)).map((e) => ({
      key: e.key,
      name: e.name,
      sub: e.doc,
      active: e.key === entidade,
      onClick: () => {
        setEntidade(e.key)
        setMenu(null)
      },
      style: { ...ITEM_MENU, justifyContent: 'space-between' },
      avatarStyle: {
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        background: 'var(--surface-3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        fontSize: '11px',
        color: 'var(--muted-2)',
      },
      avatarEl: iniciais(e.name),
      checkEl: e.key === entidade ? icone('check', { tamanho: 14, cor: 'var(--status-success)' }) : null,
    })),
  }

  const valsHeader = {
    screenTitle: titulo,
    screenSub: sub,
    headerBg: 'var(--header-bg)',
    surfaceBorder: bordaSuperficie,
    goCotacao: () => navegar('/otc/cotacoes'),
  }

  const valsCmd = {
    themeClass: classeTema,
    themeVars: undefined,
    closeCmd: () => setCmdAberta(false),
    cmdQuery: cmdBusca,
    onCmdQuery: (e) => {
      setCmdBusca(e.target.value)
      setCmdIndice(0)
    },
    onCmdTecla: (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCmdIndice((i) => Math.min(i + 1, cmdResultados.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCmdIndice((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && cmdResultados[cmdIndice]) {
        navegar(cmdResultados[cmdIndice].href)
      }
    },
    cmdResults: cmdResultados.map((r, i) => ({
      name: r.nome,
      group: r.grupo,
      ativo: i === cmdIndice,
      onClick: () => navegar(r.href),
      iconEl: icone('lupa', { tamanho: 14, cor: 'var(--muted-2)' }),
    })),
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--brand-deep)' }}>
      <Sidebar vals={valsAside} />
      {/* O scrim só existe com a gaveta aberta; ele é o que fecha ao toque
          fora, e sem ele a única saída no celular seria o botão de voltar. */}
      {drawer && estreita ? (
        <button className="app-scrim" aria-label="Fechar menu" onClick={() => setDrawer(false)} />
      ) : null}
      <main
        className={classeTema}
        style={{
          flex: '1 1 0',
          minWidth: '0',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--app-bg)',
          color: 'var(--ink)',
        }}
      >
        <TopBar vals={valsTopo} />
        <PageHeader vals={valsHeader} />
        {/* ⛔ O boundary envolve a TELA, não o shell.
            Envolvendo tudo, uma exceção na tela apagaria também a barra e o
            topo — e o usuário perderia a navegação que o tiraria da tela
            quebrada, que é justamente a saída de que ele precisa. Aqui o erro
            fica contido no conteúdo, com o menu inteiro ainda ao lado.
            `key={rota}` rearma o boundary a cada troca de tela: sem isso, uma
            tela que quebrou deixa o boundary preso no estado de erro e a
            PRÓXIMA tela — sã — nasce mostrando a mensagem da anterior. */}
        <div style={{ flex: '1 1 0', minHeight: '0' }}>
          <ErrorBoundary key={rota}>{children}</ErrorBoundary>
        </div>
      </main>
      {cmdAberta ? <CommandPalette vals={valsCmd} /> : null}
    </div>
  )
}

/* ── Auxiliares ────────────────────────────────────────────────────────────
 *
 * Ficam no fim, e fora do componente: recriá-los a cada render não muda nada
 * do que fazem e só custa alocação.
 */

function iniciais(nome) {
  return nome
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

function casaEntidade(e, termo) {
  const t = termo.trim().toLowerCase()
  if (!t) return true
  return `${e.name} ${e.doc}`.toLowerCase().includes(t)
}

function filtrarFusos(termo) {
  const t = termo.trim().toLowerCase()
  if (!t) return FUSOS
  return FUSOS.filter((f) => `${f.pais} ${f.cidade} ${f.zona}`.toLowerCase().includes(t))
}

function agruparFusos(termo, ativo, escolher) {
  const achados = filtrarFusos(termo)
  const nomes = [...new Set(achados.map((f) => f.grupo))]
  return nomes.map((nome) => ({
    label: nome,
    itens: achados
      .filter((f) => f.grupo === nome)
      .map((f) => ({
        zona: f.zona,
        pais: f.pais,
        cidade: f.cidade,
        ativo: f.zona === ativo,
        onClick: () => escolher(f.zona),
      })),
  }))
}

/* Reexportadas para quem monta índice de telas a partir do shell. */
export { ESTEIRAS, TRANSVERSAL }
