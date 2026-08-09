'use client'

/**
 * Confirmação de troca de contexto — RF-03 da especificação de multicontas.
 *
 * Separado do `ConfirmOverlay`: aquele é um fluxo de quatro passos com
 * autenticação e comprovante, para operações que movem dinheiro. Trocar de
 * entidade ou de conta não move nada; o que se pede aqui é que a pessoa leia
 * de onde vai passar a operar antes de seguir.
 */
export default function ContextConfirm({ vals }) {
  if (!vals.ctxConfirmOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={vals.ctxTitle}
      style={{ position: "fixed", inset: "0", zIndex: "120", background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={vals.ctxCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: "420px", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 24px 60px rgba(15,31,56,.32)", padding: "24px" }}
      >
        <div style={{ fontSize: "16px", fontWeight: "500", color: vals.textColor }}>{vals.ctxTitle}</div>
        <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "5px", textWrap: "pretty" }}>{vals.ctxMessage}</div>

        <div style={{ display: "grid", gap: "9px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "12px", padding: "13px 14px", marginTop: "16px" }}>
          {(vals.ctxRows || []).map((r) => (
            <div key={r.k} style={{ display: "flex", justifyContent: "space-between", gap: "14px" }}>
              <span style={{ fontSize: "11.5px", color: "var(--muted-2)", flex: "none" }}>{r.k}</span>
              <span className="num" style={{ fontSize: "12px", color: vals.textColor, textAlign: "right", wordBreak: "break-word" }}>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
          <button
            onClick={vals.ctxCancel}
            className="hv-4"
            style={{ flex: "1", background: "var(--surface-3)", color: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: "12px", padding: "13px", fontSize: "13.5px", fontFamily: "inherit", cursor: "pointer" }}
          >
            {"Cancelar"}
          </button>
          <button
            onClick={vals.ctxApply}
            className="hv-3"
            style={{ flex: "1", background: "var(--brand)", color: "#fff", border: "none", borderRadius: "12px", padding: "13px", fontSize: "13.5px", fontWeight: "500", fontFamily: "inherit", cursor: "pointer" }}
          >
            {vals.ctxCta}
          </button>
        </div>
      </div>
    </div>
  )
}
