/**
 * O adaptador entre o estado do shell e os componentes de apresentação.
 *
 * `Sidebar.jsx`, `TopBar.jsx`, `PageHeader.jsx` e `CommandPalette.jsx` foram
 * portados do mutual-terminal-global como componentes **cegos**: cada um recebe
 * um único `vals` e não sabe de onde ele vem — não há `useState` dentro deles,
 * nem leitura de rota, nem cálculo. Era a metade que faltava. O `renderVals.js`
 * do terminal não veio junto na Fase 0/1, e sem ele os quatro componentes
 * existiam no repositório sem nunca renderizar: a Fase 1 entregou as peças e a
 * Fase 2 é este arquivo mais o `AppShell`.
 *
 * ⛔ A fronteira que este arquivo defende: **tela não decide**. Toda escolha
 * (qual item está ativo, que rótulo o botão mostra, se o selo aparece) é feita
 * aqui, em `logic/`, e chega pronta ao componente. É o mesmo motivo pelo qual a
 * saída é estática — não há servidor para decidir no meio do caminho.
 *
 * ⚠️ Os dados são SIMULADOS, como todo este protótipo. Nenhum valor daqui vem
 * de sistema real, e a precisão segue `lib/valor.js` (FIAT 4 casas, cripto 6).
 */
import { createElement } from 'react'

import { ESTEIRAS, TRANSVERSAL, acharPorHref } from './navigation.js'
import { brl } from '../lib/valor.js'

/* ── Ícones ────────────────────────────────────────────────────────────────
 *
 * Um ícone por grupo, não por tela: 51 ícones distintos viram ruído, e o que
 * o olho usa para achar o caminho é a repetição do grupo. As telas herdam o
 * ícone do grupo a que pertencem.
 */
export const ICONE_DE_GRUPO = {
  Cadastros: 'usuarios',
  'KYC e KYB': 'escudo',
  'Compliance e PLD': 'lupa',
  'Operações Pix': 'raio',
  'Liquidação Fiat': 'banco',
  Checkout: 'carrinho',
  Integrações: 'plugue',
  Comercial: 'etiqueta',
  Mesa: 'candelabro',
  'Ativos Digitais': 'moeda',
  'Relatórios OTC': 'documento',
  'Visão Executiva': 'painel',
  'Visão Operacional': 'monitor',
  'Gestão de Riscos': 'alerta',
  Tesouraria: 'cofre',
  'Conciliação e Contabilidade': 'balanca',
  'Controladoria e Fiscal': 'livro',
  'Incidentes e Continuidade': 'sirene',
  Relatórios: 'documento',
  'Segurança e Acessos': 'cadeado',
  'Governança e Administração': 'martelo',
  Atendimento: 'suporte',
}

/** Caminhos SVG (viewBox 24) — mesmo idioma do resto do projeto: traço, não preenchimento. */
const TRACOS = {
  usuarios: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  escudo: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  raio: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
  carrinho: 'M6 6h15l-1.5 9h-12zM6 6 5 2H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
  plugue: 'M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4',
  etiqueta: 'M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7.5 7.5h.01',
  candelabro: 'M6 3v18M18 3v18M4 8h4V16H4zM16 6h4V14h-4z',
  moeda: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 6v12M15 9.5A2.5 2.5 0 0 0 12.5 8h-1a2 2 0 0 0 0 4h1a2 2 0 0 1 0 4h-1A2.5 2.5 0 0 1 9 14.5',
  documento: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
  painel: 'M3 3h8v8H3zM13 3h8v5h-8zM13 12h8v9h-8zM3 15h8v6H3z',
  cofre: 'M3 4h18v16H3zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11v2M7 20v2M17 20v2',
  balanca: 'M12 3v18M7 21h10M12 6 4 9l3 5a3.5 3.5 0 0 0 6 0zM12 6l8 3-3 5a3.5 3.5 0 0 1-6 0z',
  suporte: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5M12 17h.01',
  ticket: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4zM12 6v12',
  engrenagem:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
  relogio: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7v5l3 2',
  cadeado: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  alerta: 'M12 3 2 20h20L12 3ZM12 9v5M12 17h.01',
  sair: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  predio: 'M3 21h18M5 21V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v17M14 9h4a1 1 0 0 1 1 1v11M8 7h3M8 11h3M8 15h3',
  lupa: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M20 20l-3.5-3.5',
  check: 'M20 6 9 17l-5-5',
  sol: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  lua: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  monitor: 'M3 4h18v12H3zM8 20h8M12 16v4',
  banco: 'M3 21h18M4 10h16M5 10 12 4l7 6M6 10v8M10 10v8M14 10v8M18 10v8',
  livro: 'M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3zM18 7h2v13H7',
  sirene: 'M6 20h12M8 20v-6a4 4 0 0 1 8 0v6M12 4v3M5 8 3.5 6.5M19 8l1.5-1.5',
  martelo: 'M12 3v18M7 21h10M4 9h8l-4-5zM12 9h8l-4-5zM4 9a4 4 0 0 0 8 0M12 9a4 4 0 0 0 8 0',
}

/**
 * Um ícone como elemento React, montado com `createElement`.
 *
 * ⛔ Sem JSX de propósito: este arquivo é `.js` e vive em `logic/`, onde a
 * convenção do projeto é não escrever marcação. `createElement` é a borda
 * mínima — a decisão de QUAL ícone continua sendo dado.
 *
 * ⚠️ Devolve elemento, não descritor. Os componentes portados fazem
 * `{it.iconEl}` direto no JSX, e um objeto simples ali derruba o render inteiro
 * com "Objects are not valid as a React child".
 */
export function icone(nome, { tamanho = 16, cor = 'currentColor', traco = 1.8 } = {}) {
  return createElement(
    'svg',
    {
      width: tamanho,
      height: tamanho,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: traco,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: { flex: 'none', color: cor },
      'aria-hidden': 'true',
    },
    createElement('path', { d: TRACOS[nome] || TRACOS.documento }),
  )
}

/* ── Estilos de item de menu ──────────────────────────────────────────────── */

const ITEM_BASE = {
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  position: 'relative',
  padding: '8px 10px',
  borderRadius: '9px',
  fontSize: '12.5px',
  fontWeight: '400',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  fontFamily: 'inherit',
  textAlign: 'left',
  width: '100%',
}

/**
 * O item ativo ganha barra, fundo e tinta — os três juntos.
 *
 * ⛔ Só a cor não basta: no compacto o rótulo some e sobra o ícone, e ícone
 * com 60% de opacidade contra 100% não é diferença que se lê de relance. A
 * barra é a única marca que sobrevive aos 68px.
 */
function estiloItem({ ativo, filho, compacto }) {
  return {
    ...ITEM_BASE,
    paddingLeft: filho && !compacto ? '30px' : '10px',
    justifyContent: compacto ? 'center' : 'flex-start',
    color: ativo ? 'var(--nav-ink)' : 'var(--nav-ink-3)',
    background: ativo ? 'var(--nav-surface)' : 'transparent',
  }
}

const BARRA_ATIVA = {
  position: 'absolute',
  left: '0',
  top: '6px',
  bottom: '6px',
  width: '3px',
  borderRadius: '0 3px 3px 0',
  background: 'var(--accent)',
}

/** O fio vertical que liga o grupo aos filhos dele. */
const FIO_V = {
  position: 'absolute',
  left: '17px',
  top: '0',
  bottom: '0',
  width: '1px',
  background: 'var(--nav-line-forte)',
}

/** O fio horizontal que entra no filho. */
const FIO_H = {
  position: 'absolute',
  left: '17px',
  top: '50%',
  width: '8px',
  height: '1px',
  background: 'var(--nav-line-forte)',
}

const CARET = (aberto) => ({
  marginLeft: 'auto',
  display: 'flex',
  transition: 'transform .18s',
  transform: aberto ? 'rotate(180deg)' : 'none',
})

/* ── Selos simulados ───────────────────────────────────────────────────────
 *
 * Cada número tem endereço: o que aparece no menu é o que a tela daquele
 * endereço mostraria. Selo sem tela por trás é enfeite que envelhece.
 */
export const PENDENCIAS = {
  '/onboard/kyc/fila': 12,
  '/paas/med': 4,
  '/controle/divergencias': 7,
  '/controle/aprovacoes': 3,
  '/sistema/tickets': 5,
}

/**
 * Monta os grupos da Sidebar a partir das esteiras.
 *
 * A árvore tem três níveis e cada um tem um papel: a **esteira** é o cabeçalho
 * de grupo (recolhível), o **grupo** é o item-pai com caret, e a **tela** é o
 * filho ligado pelo fio. No compacto os pais somem e sobram os ícones dos
 * grupos — o nível do meio é o que cabe em 68px.
 */
export function montarNavGroups({ rota, abertos, alternar, navegar, navWide }) {
  // ⚠️ O transversal entra na MESMA lista, no fim, com `hideLabel` — que é o que
  // faz a Sidebar desenhar a divisória antes dele. Ele tinha caminho próprio
  // (`sysItems`), e aquele caminho lia `grupos[0]`: quando SISTEMA passou a ter
  // três grupos — Segurança, Governança e Atendimento —, dois deles
  // simplesmente não apareciam, sem erro nenhum no console.
  return [...ESTEIRAS, TRANSVERSAL].map((esteira) => {
    const esteiraAberta = abertos[esteira.id] !== false
    const itens = []

    for (const grupo of esteira.grupos) {
      const chave = `${esteira.id}:${grupo.label}`
      const grupoAberto = abertos[chave] !== false
      const temAtivo = grupo.itens.some((i) => i.href === rota)
      const nomeIcone = ICONE_DE_GRUPO[grupo.label] || 'documento'

      itens.push({
        name: navWide ? grupo.label : '',
        title: grupo.label,
        iconEl: icone(nomeIcone, { cor: temAtivo ? 'var(--accent)' : 'var(--nav-icon)' }),
        onClick: () => alternar(chave),
        caret: navWide ? CARET(grupoAberto) : null,
        style: estiloItem({ ativo: temAtivo && !grupoAberto, compacto: !navWide }),
        badge: grupo.itens.reduce((n, i) => n + (PENDENCIAS[i.href] || 0), 0) || null,
      })

      // No compacto o filho não cabe: 30px de recuo em 68px de barra deixariam
      // o rótulo fora da tela e o fio cortado ao meio. O grupo vira o destino.
      if (grupoAberto && navWide) {
        grupo.itens.forEach((item, i) => {
          const ativo = item.href === rota
          itens.push({
            name: item.label,
            title: item.label,
            onClick: () => navegar(item.href),
            style: estiloItem({ ativo, filho: true }),
            barStyle: ativo ? BARRA_ATIVA : null,
            linhaV: i < grupo.itens.length - 1 ? FIO_V : { ...FIO_V, bottom: '50%' },
            linhaH: FIO_H,
            badge: PENDENCIAS[item.href] || null,
          })
        })
      }
    }

    return {
      label: navWide ? esteira.label : '',
      // A divisória só antes do transversal: ele não é esteira, e a linha é o
      // que diz isso sem precisar de rótulo explicando.
      hideLabel: esteira.id === TRANSVERSAL.id,
      open: esteiraAberta,
      toggle: () => alternar(esteira.id),
      caret: navWide ? CARET(esteiraAberta) : null,
      items: esteiraAberta ? itens : [],
    }
  })
}

/**
 * Título e subtítulo da tela, derivados da rota.
 *
 * ⛔ Derivados, nunca escritos duas vezes: um mapa de rota→título ao lado da
 * navegação seria uma segunda verdade, e o dia em que alguém renomeasse um item
 * o cabeçalho continuaria dizendo o nome antigo.
 */
export function tituloDaRota(rota) {
  if (rota === '/') {
    return { titulo: 'Backoffice Corporativo', sub: 'Visão geral · quatro esteiras' }
  }
  const achado = acharPorHref(rota)
  if (!achado) return { titulo: 'Tela não encontrada', sub: rota }
  const { esteira, grupo, item } = achado
  return {
    titulo: item.label,
    sub: grupo.label ? `${esteira.label} · ${grupo.label}` : esteira.label,
    esteira,
    grupo,
  }
}

/* ── Dados simulados do cabeçalho e da barra ──────────────────────────────── */

export const CONTAS = [
  {
    key: 'principal',
    name: 'Conta Liquidação BRL',
    type: 'Liquidação',
    sub: 'Instituição licenciada parceira',
    saldo: 4831207.5512,
  },
  {
    key: 'garantia',
    name: 'Conta Garantia',
    type: 'Garantia',
    sub: 'Bloqueada para operação corrente',
    saldo: 1250000.0,
    hint: 'somente leitura',
  },
  {
    key: 'otc',
    name: 'Conta OTC USD',
    type: 'Câmbio',
    sub: 'Mesa · liquidação D+0',
    saldo: 962441.3374,
  },
]

export const ENTIDADES = [
  { key: 'mutual', name: 'Mutual Processadora de Pagamentos', doc: '48.221.077/0001-04', ativa: true },
  { key: 'igaming', name: 'Cliente iGaming · Operadora A', doc: '31.904.552/0001-77' },
  { key: 'xborder', name: 'Cliente Cross-border · Remessa B', doc: '22.518.640/0001-19' },
]

/** O patrimônio da barra lateral é a soma das contas — não um número solto. */
export function totalDasContas() {
  return brl(CONTAS.reduce((s, c) => s + c.saldo, 0))
}
