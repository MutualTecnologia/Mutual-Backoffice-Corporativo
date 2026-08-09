'use client'

import { Fragment } from 'react'

export default function CommandPalette({ vals }) {
  return (
      <div className={vals.themeClass} onClick={vals.closeCmd} style={{ ...vals.themeVars, position: "fixed", inset: "0", zIndex: "200", background: "rgba(15,31,56,.42)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "14vh", color: "var(--ink)" }}>
        {/* O clique para o painel aqui.
            Sem isto ele subia até o `onClick` do fundo, que fecha a paleta — e o
            clique que fechava era o de qualquer coisa dentro dela, inclusive o
            do próprio campo de busca. Dava para abrir com ⌘K e não dava para
            digitar: tocar no campo derrubava a paleta.
            Só o clique para aqui — o teclado segue subindo, senão o ⌘K que
            fecha a paleta deixaria de chegar ao atalho global da janela. */}
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar ação"
          style={{ width: "min(520px,92vw)", background: "#fff", borderRadius: "14px", boxShadow: "0 24px 70px rgba(15,31,56,.3)", overflow: "hidden" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderBottom: "1px solid rgba(15,31,56,.07)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted-2)" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            {' '}
            {/* `autoFocus` porque a paleta abre por atalho de teclado: quem
                aperta ⌘K já está digitando, e o foco ficava no <body>. */}
            <input
              autoFocus
              value={vals.cmdQuery ?? ''}
              onChange={vals.onCmdQuery}
              onKeyDown={vals.onCmdTecla}
              placeholder="Buscar tela, ativo ou ação…"
              aria-label="Buscar tela, ativo ou ação"
              style={{ flex: "1", minWidth: "0", border: "none", outline: "none", fontSize: "14px", color: "var(--brand)", fontFamily: "inherit", background: "transparent" }}
            />
            {' '}
            <span style={{ fontSize: "10px", color: "var(--muted-2)", border: "1px solid rgba(15,31,56,.14)", borderRadius: "5px", padding: "2px 6px" }}>{"esc"}</span>
          </div>
          <div role="listbox" aria-label="Resultados" style={{ maxHeight: "320px", overflowY: "auto", padding: "8px" }}>
            {(vals.cmdResults || []).map((r, i0) => (
              <Fragment key={i0}>
                {/* O realce é o mesmo do item ativo do menu. Ele não é decoração:
                    é o que diz onde o Enter vai cair. */}
                <button className="hv-i" onClick={r.onClick} role="option" aria-selected={r.ativo} style={{ width: "100%", display: "flex", alignItems: "center", gap: "11px", background: r.ativo ? "var(--surface-3)" : "none", border: "none", borderRadius: "10px", padding: "10px 12px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#f2f5fa", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{r.iconEl}</span>
                  {' '}
                  <span style={{ flex: "1", minWidth: "0", fontSize: "13px", fontWeight: r.ativo ? "500" : "400", color: "var(--brand)" }}>{r.name}</span>
                  {' '}
                  <span style={{ fontSize: "10px", fontWeight: "400", letterSpacing: ".06em", color: "#a0abbe" }}>{r.group}</span>
                </button>
              </Fragment>
            ))}
            {/* Uma busca sem resultado precisa dizer isso, senão a lista vazia
                parece a paleta quebrada. */}
            {(vals.cmdResults || []).length === 0 ? (
              <div style={{ padding: "18px 12px", fontSize: "12.5px", color: "var(--muted-2)" }}>{'Nada encontrado para “' + (vals.cmdQuery || '') + '”.'}</div>
            ) : null}
          </div>
        </div>
      </div>
  )
}
