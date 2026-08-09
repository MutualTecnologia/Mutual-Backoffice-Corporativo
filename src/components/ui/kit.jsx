'use client'

/**
 * Peças repetidas das telas.
 *
 * O padrão vem do PaaS: cartão com título e subtítulo, campos rotulados em
 * grade, linhas de chave e valor, e alternadores. Enquanto este repositório
 * não consome a `lib-ui`, estas são as equivalentes locais de `SectionCard`,
 * `DetailField` e `Switch` — mesma anatomia, estilos inline.
 *
 * Nasceu em `settings/` servindo Configurações, Notificações e Suporte, mas
 * as telas de cobrança e transferência redesenhavam as mesmas peças cada uma
 * para si — seis `Campo` diferentes para a mesma anatomia. Subiu para `ui/` e
 * o caminho antigo reexporta daqui.
 */
import { Check } from 'lucide-react'

/**
 * Campo de formulário: rótulo em cima, o controle no meio, erro e nota
 * embaixo. `req` põe o asterisco; `mb` existe porque o formulário de
 * transferência respira um pouco mais entre os campos.
 */
export function Campo({ label, children, erro, nota, req, mb = '12px' }) {
  return (
    <div style={{ marginBottom: mb, minWidth: 0 }}>
      <label style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
        {label}
        {req ? <span style={{ color: 'var(--status-error)', marginLeft: '3px' }}>{'*'}</span> : null}
      </label>
      {children}
      {erro ? <div style={{ fontSize: '11px', color: 'var(--status-error)', marginTop: '4px' }}>{erro}</div> : null}
      {nota ? <div style={{ fontSize: '10.5px', color: 'var(--muted-2)', marginTop: '4px', textWrap: 'pretty' }}>{nota}</div> : null}
    </div>
  )
}

/** `SectionCard` — o contêiner padrão de qualquer bloco de configuração. */
export function Card({ title, sub, action, children, pad = '20px 22px' }) {
  return (
    <section className="section-card" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: pad }}>
      {/* Título e ação lado a lado até caber; em tela estreita o botão desce.
          O bloco do título não leva `min-width: 0`: com ele o título perdia a
          disputa por largura e uma palavra longa — "Notificações" — saía da
          caixa, porque palavra não quebra ao meio. O subtítulo quebra sozinho,
          então o mínimo do bloco é a maior palavra, não a frase inteira. */}
      {(title || action) && (
        <div className="r-wrap" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginBottom: sub ? '16px' : '14px' }}>
          <div>
            {title && <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'var(--ink)' }}>{title}</h2>}
            {sub && <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-2)', textWrap: 'pretty' }}>{sub}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

/** Grade de campos: duas colunas no desktop, uma no celular. */
export function Grid({ cols = 2, children, gap = '14px' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,220px),1fr))`, gap, ...(cols === 1 ? { gridTemplateColumns: '1fr' } : null) }}>
      {children}
    </div>
  )
}

/** `DetailField` — rótulo em cima, valor embaixo. Editável ou só leitura. */
export function Field({ label, value, onChange, placeholder, mono, disabled, type = 'text', hint }) {
  const shared = {
    width: '100%', background: disabled ? 'var(--surface-3)' : 'var(--surface-2)',
    border: '1px solid var(--line-2)', borderRadius: '10px', padding: '10px 12px',
    fontSize: '12.5px', color: disabled ? 'var(--muted)' : 'var(--ink)', outline: 'none',
    fontFamily: mono ? 'ui-monospace,monospace' : 'inherit',
  }
  return (
    <label style={{ display: 'block', minWidth: 0 }}>
      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '5px' }}>{label}</span>
      {onChange ? (
        <input type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} disabled={disabled} aria-label={label} style={shared} />
      ) : (
        <span className={mono ? 'num' : undefined} style={{ ...shared, display: 'block', wordBreak: 'break-word' }}>{value || '—'}</span>
      )}
      {hint && <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--muted-2)', marginTop: '4px', textWrap: 'pretty' }}>{hint}</span>}
    </label>
  )
}

/** Linha de chave e valor, para blocos de leitura. */
export function Row({ k, v, color, mono = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '14px', padding: '7px 0', borderBottom: '1px solid var(--line)' }}>
      <span style={{ fontSize: '11.5px', color: 'var(--muted-2)', flex: 'none' }}>{k}</span>
      <span className={mono ? 'num' : undefined} style={{ fontSize: '12px', color: color || 'var(--ink)', textAlign: 'right', wordBreak: 'break-word' }}>{v}</span>
    </div>
  )
}

/** Caixa de marcação — o `CustomCheckbox` do PaaS. */
export function Toggle({ checked, onChange, label, sub }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={!!checked}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
    >
      <span style={{ width: '18px', height: '18px', flex: 'none', marginTop: '1px', borderRadius: '5px', border: checked ? 'none' : '2px solid #cbd5e1', background: checked ? 'var(--brand)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked ? <Check size={12} color="#fff" strokeWidth={3} /> : null}
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink)' }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted-2)', marginTop: '2px', textWrap: 'pretty' }}>{sub}</span>}
      </span>
    </button>
  )
}

/** Botão principal — o `.page-header-action-btn` da referência. */
export function Action({ children, onClick, icon, tone = 'primary', full, disabled }) {
  const tones = {
    primary: { background: 'var(--brand)', color: '#fff', border: 'none' },
    ghost: { background: 'var(--surface-3)', color: 'var(--ink-2)', border: '1px solid var(--line)' },
    danger: { background: 'var(--acc-red-bg)', color: 'var(--acc-red-ink)', border: '1px solid rgba(195,61,71,.25)' },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="hv-3"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
        borderRadius: '11px', padding: '10px 14px', fontSize: '12.5px', fontWeight: '500',
        fontFamily: 'inherit', cursor: disabled ? 'not-allowed' : 'pointer',
        width: full ? '100%' : 'auto', opacity: disabled ? 0.55 : 1, ...tones[tone], flex: 'none',
      }}
    >
      {icon}
      {children}
    </button>
  )
}

/** Selo sem fundo — regra do design system. */
export function Badge({ label, color = 'var(--muted)', icon }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color, whiteSpace: 'nowrap' }}>
      {icon}
      {label}
    </span>
  )
}

/** Aviso contextual. */
export function Note({ children, tone = 'info' }) {
  const tones = {
    info: { bg: 'var(--acc-blue-bg)', bd: 'rgba(37,86,196,.2)', fg: 'var(--acc-blue-ink)' },
    warn: { bg: 'var(--acc-amber-bg)', bd: '#f4d38a', fg: 'var(--acc-amber-ink)' },
    ok: { bg: 'var(--acc-green-bg)', bd: '#bfe3cc', fg: 'var(--acc-green-ink)' },
  }
  const t = tones[tone]
  return (
    <div style={{ background: t.bg, border: `1px solid ${t.bd}`, borderRadius: '11px', padding: '11px 13px', fontSize: '11.5px', color: t.fg, textWrap: 'pretty' }}>
      {children}
    </div>
  )
}
