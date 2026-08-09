'use client'

import { sx } from '../../lib/style.js'

/**
 * O seletor de período — atalhos à esquerda, calendário e faixa de horas à
 * direita.
 *
 * Nasceu dentro do Extrato e saiu de lá quando os Relatórios passaram a
 * precisar do mesmo controle. Duas cópias do mesmo menu é o começo de duas
 * regras de recorte: bastava alguém corrigir o raio da borda, o rótulo do
 * atalho ou a ordem dos meses num dos dois arquivos.
 *
 * Os vals vêm de `extFiltrosVals` (../../logic/extFiltros.js) e são globais —
 * o estado do menu (`fPeriodo`) e o recorte (`extF.periodo`) são únicos, o que
 * é justamente o ponto: trocar o período aqui é trocar o período do Extrato.
 */

/** O botão que abre o menu. Ativo quando há escolha feita, não quando está aberto. */
const GATILHO = (ativo) => ({
  display: 'flex', alignItems: 'center', gap: 7, flex: 'none',
  padding: '9px 13px', borderRadius: 10, fontFamily: 'inherit', fontSize: 12.5,
  cursor: 'pointer', whiteSpace: 'nowrap',
  color: ativo ? 'var(--brand)' : 'var(--ink)',
  background: 'var(--surface)',
  border: '1px solid ' + (ativo ? 'var(--brand)' : 'var(--line-2)'),
})

/**
 * O véu que fecha o menu ao clicar fora.
 *
 * Transparente e por baixo do menu (`zIndex` menor), cobrindo a tela inteira:
 * é o que permite fechar clicando em qualquer lugar sem escutar o documento
 * inteiro e sem engolir o clique que abre outro menu.
 */
const VEU = { position: 'fixed', inset: 0, zIndex: 40 }

/** A caixa do menu suspenso, ancorada no gatilho. */
const MENU = {
  position: 'absolute', top: 'calc(100% + 6px)', zIndex: 41,
  background: 'var(--surface)', border: '1px solid var(--line-2)',
  borderRadius: 12, boxShadow: '0 18px 44px rgba(15,31,56,.18)',
}

/** As setas de mês do calendário. */
const SETA = {
  width: 26, height: 26, flex: 'none', borderRadius: 7, cursor: 'pointer',
  border: '1px solid var(--line-2)', background: 'var(--surface)', color: 'var(--ink)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

/** Os dois campos de hora da faixa. */
const HORA = {
  flex: 1, minWidth: 0, padding: '7px 9px', borderRadius: 8, fontFamily: 'inherit',
  fontSize: 12, color: 'var(--ink)', background: 'var(--surface)',
  border: '1px solid var(--line-2)',
}

function Caret({ aberto }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: 'none', opacity: .6, transform: aberto ? 'rotate(180deg)' : 'none' }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * `alinhar` decide de que lado o menu cai. No Extrato o gatilho abre a barra
 * de filtros e o menu desce pela esquerda; no topo dos Relatórios ele está
 * encostado na direita, e um menu de 440px descendo pela esquerda sairia da
 * tela.
 */
export default function PeriodoPicker({ vals, alinhar = 'left' }) {
  return (
    <div style={{ position: 'relative', flex: 'none' }}>
      <button className="hv-1" onClick={vals.fPeriodoAbrir} aria-haspopup="dialog" aria-expanded={vals.fPeriodoAberto} style={sx(GATILHO(vals.fPeriodoEscolhido))}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flex: 'none' }}>
          <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        {vals.fPeriodoLabel}
        <Caret aberto={vals.fPeriodoAberto} />
      </button>
      {vals.fPeriodoAberto ? (
        <>
          <div onClick={vals.fFechar} style={sx(VEU)} />
          <div className="menu-flut menu-per" role="dialog" aria-label="Escolher período" style={{ ...MENU, [alinhar]: 0, display: 'flex', padding: '0', overflow: 'hidden' }}>
            <div className="menu-atalhos" style={{ width: '168px', flex: 'none', borderRight: '1px solid var(--line)', padding: '10px 8px', maxHeight: '340px', overflowY: 'auto' }}>
              <div style={{ fontSize: '9.5px', letterSpacing: '.08em', color: 'var(--muted-2)', padding: '2px 11px 8px' }}>{'ATALHOS'}</div>
              {(vals.fAtalhos || []).map((a) => (
                <button key={a.id} onClick={a.onClick} style={sx(a.style)}>{a.label}</button>
              ))}
            </div>
            <div className="menu-cal" style={{ padding: '12px 14px 10px', minWidth: '268px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <button onClick={vals.fCal.anterior} aria-label="Mês anterior" style={sx(SETA)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <span style={{ flex: '1', textAlign: 'center', fontSize: '12.5px', fontWeight: '500', color: 'var(--ink)' }}>{vals.fCal.titulo}</span>
                <button onClick={vals.fCal.proximo} aria-label="Próximo mês" style={sx(SETA)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
                {(vals.fCal.semana || []).map((d) => (
                  <span key={d} style={{ textAlign: 'center', fontSize: '10px', color: 'var(--muted-2)', padding: '4px 0' }}>{d}</span>
                ))}
                {(vals.fCal.celulas || []).map((c, i) => (
                  c.fora
                    ? <span key={i} style={{ textAlign: 'center', fontSize: '11.5px', color: 'var(--line-2)', padding: '6px 0' }}>{c.n}</span>
                    : <button key={i} onClick={c.onClick} aria-current={c.hoje ? 'date' : undefined} style={{ textAlign: 'center', fontSize: '11.5px', padding: '6px 0', border: c.hoje ? '1px solid var(--line-2)' : '1px solid transparent', borderRadius: '7px', cursor: 'pointer', fontFamily: 'inherit', color: c.escolhido ? '#fff' : 'var(--ink)', background: c.escolhido ? 'var(--brand)' : c.naFaixa ? 'var(--acc-blue-bg)' : 'transparent' }}>{c.n}</button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
                <input className="num" value={vals.fHoraDe} onChange={vals.onFHoraDe} inputMode="numeric" maxLength={5} placeholder="00:00" aria-label="Hora inicial (24h)" style={sx(HORA)} />
                <span style={{ fontSize: '11px', color: 'var(--muted-2)' }}>{'→'}</span>
                <input className="num" value={vals.fHoraAte} onChange={vals.onFHoraAte} inputMode="numeric" maxLength={5} placeholder="23:59" aria-label="Hora final (24h)" style={sx(HORA)} />
                <button onClick={vals.fPeriodoAplicar} aria-label="Aplicar período" style={{ marginLeft: 'auto', flex: 'none', width: '30px', height: '30px', borderRadius: '8px', border: 'none', background: 'var(--brand)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
