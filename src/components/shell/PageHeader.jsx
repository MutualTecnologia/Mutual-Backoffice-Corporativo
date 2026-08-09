'use client'

export default function PageHeader({ vals }) {
  return (
      <header className="r-pad r-wrap" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 28px", background: vals.headerBg, backdropFilter: "blur(8px)", borderBottom: `1px solid ${vals.surfaceBorder}`, color: "var(--ink)" }}>
        <div style={{ minWidth: "0" }}>
          <div style={{ fontSize: "13px", color: "var(--muted-2)", fontWeight: "400" }}>{vals.screenSub}</div>
          <div style={{ fontSize: "clamp(21px,5.4vw,28px)", fontWeight: "500", letterSpacing: "-.01em", lineHeight: "1.2", marginTop: "2px" }}>{vals.screenTitle}</div>
        </div>
        {/* Ia para o Negociar Cripto e dizia só "Nova operação". Uma operação
            nova na Mesa começa pela cotação — é ela que trava o preço —, então
            o rótulo diz OTC e o destino é a Cotação OTC. */}
        <button className="hv-3" onClick={vals.goCotacao} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", background: "var(--brand)", color: "#fff", border: "none", borderRadius: "11px", padding: "11px 16px", fontSize: "13.5px", fontWeight: "400", fontFamily: "inherit", cursor: "pointer", boxShadow: "0 6px 16px rgba(18,35,63,.22)", flex: "none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          {"Nova operação OTC"}
        </button>
      </header>
  )
}
