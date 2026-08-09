'use client'

/**
 * O modal de autorização — senha financeira, dispositivo e local, segundo fator.
 *
 * Par visual da fábrica `autorizacao` (logic/autorizacao.js): ela gera as vals
 * com as chaves derivadas do prefixo, e este componente as lê do mesmo jeito. A
 * TED e o saque Pix tinham cada um a sua cópia deste bloco, iguais linha a
 * linha até no `autoComplete="one-time-code"` — só o rótulo do botão de
 * autorizar mudava, e é por isso que ele é a única prop de texto.
 *
 * São três etapas, e a barra no topo diz em qual delas se está. Sem isso a
 * segunda etapa parece um erro: quem digitou a senha e viu outra tela aparecer
 * acha que travou, e fecha.
 */
import { Fragment } from 'react'
import { BTN, BTN_SEC, INPUT_LG, LABEL } from '../ui/tokens.js'

export default function AutorizacaoModal({ vals, prefixo, ctaAutorizar }) {
  const C = prefixo.charAt(0).toUpperCase() + prefixo.slice(1)
  const isPin = vals['is' + C + 'Pin']
  const isLocal = vals['is' + C + 'Local']
  const is2fa = vals['is' + C + '2fa']
  if (!isPin && !isLocal && !is2fa) return null

  const v = (sufixo) => vals[prefixo + sufixo]
  const fechar = v('AuthFechar')
  const ok = isPin ? v('PinOk') : isLocal ? v('LocalOk') : v('2faOk')
  const erro = v('Erro') || v('AuthErro')
  const passo = v('AuthPasso')
  const total = v('AuthTotal') || 3

  const icone = isPin ? v('PinIconEl') : isLocal ? v('LocalIconEl') : v('2faIconEl')
  const titulo = isPin ? v('PinTitulo') : isLocal ? v('LocalTitulo') : v('2faTitulo')
  const sub = isPin ? v('PinSub') : isLocal ? v('LocalSub') : v('2faSub')
  const nota = isPin ? v('PinNota') : isLocal ? v('LocalNota') : v('2faNota')

  // Verde quando confere, âmbar quando pede declaração: a cor carrega o estado
  // e o texto explica, em vez de a cor sozinha ter de contar a história.
  const estado = v('LocalEstado')
  const tomBg = estado === 'ok' ? 'var(--acc-green-bg)' : 'var(--acc-amber-bg)'
  const tomInk = estado === 'ok' ? 'var(--acc-green-ink)' : 'var(--acc-amber-ink)'

  return (
    <div style={{ position: 'fixed', inset: '0', zIndex: '80', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(11,18,33,.55)' }}>
      <div onClick={fechar} style={{ position: 'absolute', inset: '0' }} />
      <div role="dialog" aria-modal="true" style={{ position: 'relative', width: '100%', maxWidth: '390px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', boxShadow: 'var(--shadow-md)', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ lineHeight: 0 }}>{icone}</span>
          <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--ink)' }}>{titulo}</span>
          <button type="button" onClick={fechar} aria-label="Fechar" style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: '16px', color: 'var(--muted-2)', cursor: 'pointer', lineHeight: 1 }}>{'×'}</button>
        </div>

        {/* Onde estamos nas três provas. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
          {[1, 2, 3].map((n) => (
            <span key={n} style={{ flex: 1, height: '3px', borderRadius: '2px', background: n <= passo ? 'var(--brand)' : 'var(--surface-3)' }} />
          ))}
          <span style={{ flex: 'none', fontSize: '10.5px', color: 'var(--muted-2)', marginLeft: '4px' }}>{passo + '/' + total}</span>
        </div>

        <p style={{ margin: '10px 0 0', fontSize: '12px', color: 'var(--muted-2)', lineHeight: '1.55', textWrap: 'pretty' }}>{sub}</p>

        {isLocal ? (
          <>
            <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: '11px', overflow: 'hidden' }}>
              {(v('LocalLinhas') || []).map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '9px 12px', fontSize: '11.5px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ color: 'var(--muted)' }}>{l.k}</span>
                  <span className="num" style={{ color: 'var(--ink)', textAlign: 'right' }}>{l.v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', background: tomBg, borderRadius: '10px', padding: '10px 12px', fontSize: '11.5px', color: tomInk, lineHeight: '1.55', textWrap: 'pretty' }}>{v('LocalAviso')}</div>
            <button type="button" onClick={v('LocalRefazer')} style={{ marginTop: '9px', background: 'none', border: 'none', padding: '0', fontSize: '11.5px', color: 'var(--acc-blue-ink)', fontFamily: 'inherit', cursor: 'pointer' }}>{v('LocalRefazerLabel')}</button>
            {v('LocalPedeJustificativa') ? (
              <label style={{ display: 'block', marginTop: '12px' }}>
                <span style={LABEL}>{v('LocalJustLabel')}</span>
                <textarea
                  value={v('Justificativa')}
                  onChange={vals['on' + C + 'Justificativa']}
                  rows={2}
                  placeholder="Ex.: estou viajando e usando a rede do hotel"
                  style={{ ...INPUT_LG, fontSize: '13px', letterSpacing: 'normal', textAlign: 'left', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </label>
            ) : null}
          </>
        ) : (
          <>
          {/* ── A confluência ──────────────────────────────────────────────
              Endereço, localização e aparelho registrado. Os três aparecem
              **antes** do campo, e não como um erro depois do clique: botão
              desabilitado sem dizer o porquê é a pior forma de recusar. Cada um
              que falta traz o botão que o resolve. Ver logic/sessao.js. */}
          {isPin && (v('Sinais') || []).length ? (
            <div style={{ marginTop: '16px', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 13px', background: v('SinaisOk') ? 'var(--acc-green-bg)' : 'var(--acc-amber-bg)' }}>
                <span style={{ fontSize: '12px', color: v('SinaisOk') ? 'var(--acc-green-ink)' : 'var(--acc-amber-ink)' }}>{v('SinaisTitulo')}</span>
              </div>
              {(v('Sinais') || []).map((sg, i) => (
                <Fragment key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 13px', borderTop: '1px solid var(--line-2)' }}>
                    <span style={{ display: 'flex', flex: 'none' }}>{sg.iconEl}</span>
                    <span style={{ flex: '1', minWidth: '0' }}>
                      <span style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink)' }}>{sg.rotulo}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted-2)', marginTop: '1px' }}>{sg.ok ? sg.valor : sg.falta}</span>
                    </span>
                    {!sg.ok && sg.acao ? (
                      <button type="button" onClick={sg.acao} style={{ flex: 'none', background: 'none', border: '1px solid var(--line-2)', borderRadius: '9px', padding: '6px 10px', fontSize: '11.5px', color: 'var(--acc-blue-ink)', fontFamily: 'inherit', cursor: 'pointer' }}>{sg.acaoLabel}</button>
                    ) : null}
                  </div>
                </Fragment>
              ))}
              <div style={{ padding: '9px 13px', borderTop: '1px solid var(--line-2)', fontSize: '10.5px', color: 'var(--muted-2)', lineHeight: '1.45' }}>{v('SinaisNota')}</div>
            </div>
          ) : null}
          <label style={{ display: 'block', marginTop: '16px' }}>
            <span style={LABEL}>{isPin ? v('PinLabel') : v('2faLabel')}</span>
            <input
              className="num"
              type="password"
              inputMode="numeric"
              autoComplete={isPin ? 'off' : 'one-time-code'}
              value={isPin ? v('Pin') : v('Codigo')}
              onChange={isPin ? vals['on' + C + 'Pin'] : vals['on' + C + 'Codigo']}
              placeholder={isPin ? '••••' : '000000'}
              style={{ ...INPUT_LG, textAlign: 'center', letterSpacing: '.5em', fontSize: '19px' }}
            />
          </label>
          </>
        )}

        {is2fa ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
            {/* O relógio da validade. Expirado, vira o aviso e libera o reenvio. */}
            <span className="num" style={{ fontSize: '11.5px', color: v('2faExpirado') ? 'var(--status-error)' : 'var(--muted-2)' }}>{v('2faPrazoLabel')}</span>
            <button
              type="button"
              onClick={v('2faReenviar')}
              disabled={!v('2faReenviarOk')}
              style={{ background: 'none', border: 'none', padding: '0', fontSize: '11.5px', color: v('2faReenviarOk') ? 'var(--acc-blue-ink)' : 'var(--muted-2)', fontFamily: 'inherit', cursor: v('2faReenviarOk') ? 'pointer' : 'not-allowed' }}
            >{v('2faReenviarLabel')}</button>
          </div>
        ) : null}

        {is2fa ? (
          <button type="button" onClick={v('2faTrocar')} style={{ marginTop: '8px', background: 'none', border: 'none', padding: '0', fontSize: '11.5px', color: 'var(--acc-blue-ink)', fontFamily: 'inherit', cursor: 'pointer' }}>{v('2faTrocarLabel')}</button>
        ) : null}

        {erro ? (
          <div style={{ marginTop: '10px', fontSize: '11.5px', color: 'var(--status-error)' }}>{erro}</div>
        ) : null}

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="button" onClick={fechar} className="hv-5" style={{ ...BTN_SEC, flex: '1' }}>{'Voltar'}</button>
          <button
            type="button"
            onClick={isPin ? v('PinConfirmar') : isLocal ? v('LocalConfirmar') : v('2faConfirmar')}
            disabled={!ok}
            className={ok ? 'hv-3' : undefined}
            style={{ ...BTN, flex: '1', background: ok ? 'var(--brand)' : 'var(--surface-3)', color: ok ? '#fff' : 'var(--muted-2)', cursor: ok ? 'pointer' : 'not-allowed' }}
          >
            {is2fa ? ctaAutorizar : 'Continuar'}
          </button>
        </div>

        <p style={{ margin: '14px 0 0', padding: '10px 12px', background: 'var(--surface-2)', border: '1px dashed var(--line-2)', borderRadius: '9px', fontSize: '10.5px', color: 'var(--muted-2)', lineHeight: '1.55', textWrap: 'pretty' }}>{nota}</p>
      </div>
    </div>
  )
}
