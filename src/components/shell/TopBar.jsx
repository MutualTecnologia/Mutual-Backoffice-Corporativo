'use client'

import { Fragment } from 'react'
import { sx } from '../../lib/style.js'
import Bandeira from '../../lib/bandeira.jsx'

export default function TopBar({ vals }) {
  return (
      <div className="r-pad" style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--brand-bar)", color: "var(--nav-ink-2)", padding: "9px 20px", borderBottom: "1px solid var(--nav-line)", flexWrap: "wrap" }}>
        <button className="nav-abrir hv-d" onClick={vals.abrirNav} aria-label="Abrir menu" aria-expanded={!!vals.navDrawerAberto} style={{ alignItems: "center", justifyContent: "center", width: "34px", height: "34px", flex: "none", background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "9px", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--nav-ink-3)' }}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div style={{ position: "relative", flex: "none", minWidth: "0" }}>
          <button className="hv-g" onClick={vals.toggleWallet} aria-haspopup="listbox" aria-expanded={vals.walletOpen} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "4px 8px", borderRadius: "9px", background: "none", border: "none", fontFamily: "inherit", textAlign: "left" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" style={{ color: 'var(--nav-icon)' }}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <div style={{ lineHeight: "1.15" }}>
              <div style={{ fontSize: "12.5px", fontWeight: "400", color: "var(--nav-ink)", whiteSpace: "nowrap" }}>{vals.walletName}</div>
              {/* #7d89a6 dava 4,24:1 sobre a barra (--brand-bar, #1b2450) — abaixo
                  do mínimo de 4,5:1 da WCAG AA para os 11px desta linha, que é a
                  agência e a conta. #909ebd sobe para 5,52:1. Os ícones abaixo
                  seguem em #7d89a6: forma, não texto. */}
              <div className="num" style={{ fontSize: "11px", color: "var(--nav-muted)", whiteSpace: "nowrap" }}>{vals.accountLine}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--nav-rotulo)', transition: "transform .18s", transform: vals.walletOpen ? "rotate(180deg)" : "none" }}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {vals.walletOpen ? (
            <>
              <div onClick={vals.toggleWallet} style={{ position: "fixed", inset: "0", zIndex: "55" }} />
              <div role="listbox" aria-label="Trocar de conta" style={{ position: "absolute", top: "calc(100% + 8px)", left: "0", zIndex: "60", minWidth: "320px", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 16px 40px rgba(15,31,56,.28)", overflow: "hidden" }}>
                <div style={{ padding: "12px 14px 8px", borderBottom: `1px solid ${vals.surfaceBorder}` }}>
                  <div style={{ fontSize: "10.5px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--acc-blue-ink)" }}>{"Conta ativa"}</div>
                  <div style={{ fontSize: "13.5px", color: vals.textColor, marginTop: "2px" }}>{vals.walletName}</div>
                </div>
                {(vals.walletOptions || []).map((w) => (
                  <button key={w.key} onClick={w.onClick} disabled={w.disabled} role="option" aria-selected={w.active} style={sx(w.style)}>
                    <span style={{ minWidth: "0" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <span style={{ fontSize: "13px", color: vals.textColor }}>{w.name}</span>
                        <span style={{ fontSize: "9.5px", color: "var(--muted-2)", border: "1px solid var(--line-2)", borderRadius: "20px", padding: "1px 7px" }}>{w.type}</span>
                        {w.hint ? <span style={{ fontSize: "9.5px", color: "var(--status-warning)" }}>{w.hint}</span> : null}
                      </span>
                      <span style={{ display: "block", fontSize: "11px", color: "var(--muted-2)", marginTop: "3px" }}>{w.sub}</span>
                      <span className="num" style={{ display: "block", fontSize: "11.5px", color: "var(--muted)", marginTop: "2px" }}>{w.balance}</span>
                    </span>
                    <span style={{ flex: "none" }}>{w.checkEl}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
          {/* Indicador, não comando: mostra quantos segundos faltam para a
              próxima atualização de cotação. Era um `<button>` sem `onClick` —
              recebia foco de teclado, era anunciado como clicável pelo leitor
              de tela e não fazia nada. É um `<span>`. */}
          <span title="Atualização automática das cotações" role="status" aria-label={'Cotações atualizam em ' + vals.otcNext + ' segundos'} style={{ display: "flex", alignItems: "center", gap: "6px", height: "34px", borderRadius: "9px", padding: "0 9px", color: "var(--nav-ink-3)", flex: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2M9 2h6" />
            </svg>
            <span className="num" style={{ fontSize: "11.5px", fontWeight: "400" }}>
              {vals.otcNext}
              {"s"}
            </span>
          </span>
          {' '}
          <button className="hv-h" onClick={vals.toggleBalances} title="Ocultar saldos" style={{ width: "34px", height: "34px", borderRadius: "9px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--nav-ink-3)' }}>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          {' '}
          {/* Fuso de exibição. O globo abre a lista; a escolha muda a hora que o
              terminal escreve, e não o horário da Mesa — ver logic/fuso.js. */}
          <div style={{ position: "relative", flex: "none" }}>
            <button className="hv-c" onClick={vals.fusoAbrir} title={vals.fusoTitulo} aria-haspopup="listbox" aria-expanded={vals.fusoMenuAberto} style={{ display: "flex", alignItems: "center", gap: "6px", height: "34px", borderRadius: "9px", background: "var(--nav-surface)", border: "1px solid var(--nav-line-forte)", padding: "0 10px", cursor: "pointer", fontFamily: "inherit", flex: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flex: "none", color: 'var(--nav-ink-3)' }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
              </svg>
              <span className="num" style={{ fontSize: "11.5px", fontWeight: "400", color: "var(--nav-valor)", whiteSpace: "nowrap" }}>{vals.fusoLabel}</span>
            </button>
            {vals.fusoMenuAberto ? (
              <>
                <div onClick={vals.fusoFechar} style={{ position: "fixed", inset: "0", zIndex: "55" }} />
                <div role="listbox" aria-label="Selecionar fuso horário" style={{ position: "absolute", top: "calc(100% + 8px)", right: "0", zIndex: "60", width: "min(92vw,340px)", maxHeight: "min(70vh,460px)", display: "flex", flexDirection: "column", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 16px 40px rgba(15,31,56,.28)", overflow: "hidden" }}>
                  <div style={{ padding: "12px 14px 10px", borderBottom: `1px solid ${vals.surfaceBorder}`, flex: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13.5px", fontWeight: "500", color: vals.textColor }}>{"Selecionar Fuso Horário"}</span>
                      <button onClick={vals.fusoFechar} aria-label="Fechar" style={{ marginLeft: "auto", background: "none", border: "none", padding: "2px", cursor: "pointer", display: "flex", color: "var(--muted-2)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <input value={vals.fusoBusca ?? ''} onChange={vals.onFusoBusca} placeholder="Buscar timezone..." aria-label="Buscar fuso horário" style={{ width: "100%", background: "var(--surface-3)", border: "none", borderRadius: "10px", padding: "9px 12px", fontSize: "12.5px", color: vals.textColor, outline: "none", fontFamily: "inherit" }} />
                  </div>
                  <div style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "6px" }}>
                    {(vals.fusoGrupos || []).map((g) => (
                      <Fragment key={g.label}>
                        <div style={{ fontSize: "10px", fontWeight: "400", letterSpacing: ".08em", color: "var(--muted-2)", padding: "8px 10px 4px" }}>{g.label}</div>
                        {g.itens.map((f) => (
                          <button key={f.zona} role="option" aria-selected={f.ativo} onClick={f.onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", border: "none", borderRadius: "9px", background: f.ativo ? "var(--acc-green-bg)" : "transparent", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                            <span style={{ flex: "1", minWidth: "0" }}>
                              <span style={{ display: "block", fontSize: "12.5px", color: vals.textColor }}>{f.pais}</span>
                              <span style={{ display: "block", fontSize: "10.5px", color: "var(--muted-2)" }}>{f.cidade}</span>
                            </span>
                            <span style={{ flex: "none", display: f.ativo ? "flex" : "none" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: 'var(--status-success)' }}><path d="M20 6 9 17l-5-5" /></svg>
                            </span>
                          </button>
                        ))}
                      </Fragment>
                    ))}
                    {vals.fusoVazio ? (
                      <div style={{ padding: "26px 0", textAlign: "center", fontSize: "12.5px", color: "var(--muted-2)" }}>{"Nenhum fuso encontrado"}</div>
                    ) : null}
                  </div>
                  <div style={{ flex: "none", padding: "10px 14px", borderTop: `1px solid ${vals.surfaceBorder}`, fontSize: "11px", color: "var(--muted-2)", textAlign: "center" }}>{vals.fusoRodape}</div>
                </div>
              </>
            ) : null}
          </div>
          {' '}
          {/* Demonstração: liga/desliga o avanço automático e escolhe o ritmo.
              O ponto verde pulsando existe para que ninguém confunda um estado
              que mudou sozinho com um estado que sempre esteve ali. */}
          <div style={{ position: "relative", flex: "none" }}>
            <button className="hv-h" onClick={vals.demoToggleMenu} title={vals.demoTitulo} aria-haspopup="menu" aria-expanded={vals.demoMenuAberto} style={{ display: "flex", alignItems: "center", gap: "6px", height: "34px", borderRadius: "9px", background: "none", border: "none", padding: "0 8px", cursor: "pointer", fontFamily: "inherit", flex: "none" }}>
              <span className={vals.demoLigado ? "demo-pulso" : ""} style={{ width: "8px", height: "8px", borderRadius: "50%", flex: "none", background: vals.demoLigado ? "var(--status-success)" : "var(--nav-rotulo)" }} />
              <span style={{ fontSize: "11.5px", fontWeight: "400", color: "var(--nav-ink-3)" }}>{"Demo"}</span>
            </button>
            {vals.demoMenuAberto ? (
              <>
                <div onClick={vals.demoToggleMenu} style={{ position: "fixed", inset: "0", zIndex: "55" }} />
                <div role="menu" aria-label="Demonstração" style={{ position: "absolute", top: "calc(100% + 8px)", right: "0", zIndex: "60", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 16px 40px rgba(15,31,56,.28)", padding: "6px", minWidth: "228px" }}>
                  <button role="menuitemcheckbox" aria-checked={vals.demoLigado} onClick={vals.demoAlternar} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "none", borderRadius: "9px", background: "transparent", fontFamily: "inherit", fontSize: "12.5px", color: vals.textColor, cursor: "pointer", textAlign: "left" }}>
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span style={{ display: "block" }}>{"Avançar sozinho"}</span>
                      <span style={{ display: "block", fontSize: "10.5px", color: "var(--muted-2)" }}>{"Cobranças, saques e depósitos mudam de fase"}</span>
                    </span>
                    <span style={{ flex: "none", width: "34px", height: "19px", borderRadius: "20px", position: "relative", background: vals.demoLigado ? "var(--status-success)" : "var(--surface-3)" }}>
                      <span style={{ position: "absolute", top: "3px", left: vals.demoLigado ? "18px" : "3px", width: "13px", height: "13px", borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
                    </span>
                  </button>
                  <div style={{ height: "1px", background: vals.surfaceBorder, margin: "4px 8px" }} />
                  {(vals.demoOpcoes || []).map((o) => (
                    <button key={o.id} role="menuitemradio" aria-checked={o.ativo} onClick={o.onClick} disabled={!vals.demoLigado} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "9px 11px", border: "none", borderRadius: "9px", background: "transparent", fontFamily: "inherit", fontSize: "12.5px", color: vals.textColor, opacity: vals.demoLigado ? 1 : 0.45, cursor: vals.demoLigado ? "pointer" : "not-allowed", textAlign: "left" }}>
                      <span style={{ flex: "1", minWidth: "0" }}>{o.label}</span>
                      <span style={{ flex: "none", display: o.ativo ? "flex" : "none" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: 'var(--status-success)' }}><path d="M20 6 9 17l-5-5" /></svg>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          {' '}
          <div style={{ position: "relative", flex: "none" }}>
            <button className="hv-h" onClick={vals.toggleThemeMenu} title={vals.themeTitle} aria-haspopup="listbox" aria-expanded={vals.themeOpen} style={{ width: "34px", height: "34px", borderRadius: "9px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>{vals.themeIcon}</button>
            {vals.themeOpen ? (
              <>
                <div onClick={vals.toggleThemeMenu} style={{ position: "fixed", inset: "0", zIndex: "55" }} />
                <div role="listbox" aria-label="Escolher tema" style={{ position: "absolute", top: "calc(100% + 8px)", right: "0", zIndex: "60", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 16px 40px rgba(15,31,56,.28)", padding: "6px", minWidth: "216px" }}>
                  {(vals.themeOpts || []).map((t) => (
                    <button key={t.id} onClick={t.onClick} role="option" aria-selected={t.check.display !== "none"} style={sx(t.style)}>
                      <span style={{ flex: "none", display: "flex" }}>{t.iconEl}</span>
                      <span style={{ flex: "1", minWidth: "0" }}>
                        <span style={{ display: "block", fontSize: "12.5px", fontWeight: "400", color: vals.textColor }}>{t.nome}</span>
                        <span style={{ display: "block", fontSize: "10.5px", color: "var(--muted-2)" }}>{t.sub}</span>
                      </span>
                      <span style={sx(t.check)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: 'var(--status-success)' }}><path d="M20 6 9 17l-5-5" /></svg>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div style={{ position: "relative", flex: "none" }}>
            <button className="hv-c" onClick={vals.toggleLang} title="Idioma" style={{ display: "flex", alignItems: "center", gap: "6px", height: "34px", borderRadius: "9px", background: "var(--nav-surface)", border: "1px solid var(--nav-line-forte)", padding: "0 10px", cursor: "pointer", fontFamily: "inherit" }}>
              <Bandeira pais={vals.langPais} altura={12} titulo={vals.langCode} />
              <span style={{ fontSize: "11.5px", fontWeight: "400", color: "var(--nav-valor)" }}>{vals.langCode}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--nav-rotulo)' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {vals.langOpen ? (
              <>
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: "0", zIndex: "60", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 16px 40px rgba(15,31,56,.28)", padding: "6px", minWidth: "196px" }}>
                  {(vals.langOpts || []).map((l, i0) => (
                    <Fragment key={i0}>
                      <button onClick={l.onClick} style={sx(l.style)}>
                        <Bandeira pais={l.pais} altura={13} titulo={l.name || l.pais} />
                        <span style={{ flex: "1", minWidth: "0" }}>
                          <span style={{ display: "block", fontSize: "12.5px", fontWeight: "400", color: vals.textColor }}>{l.name}</span>
                          <span style={{ display: "block", fontSize: "10.5px", color: "var(--muted-2)" }}>{l.sub}</span>
                        </span>
                        <span style={sx(l.check)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: 'var(--status-success)' }}><path d="M20 6 9 17l-5-5" /></svg>
                        </span>
                      </button>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <span style={{ width: "1px", height: "22px", background: "rgba(255,255,255,.12)", margin: "0 4px", flex: "none" }} />
          {' '}
          <button className="hv-h" onClick={vals.openCmd} title="Buscar (⌘K)" style={{ width: "34px", height: "34px", borderRadius: "9px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--nav-ink-3)' }}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          {' '}
          <button className="hv-h" onClick={vals.goSuporte} title="Suporte" style={{ width: "34px", height: "34px", borderRadius: "9px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--nav-ink-3)' }}>
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5M12 17h.01" />
            </svg>
          </button>
          {' '}
          <button className="hv-h" onClick={vals.goNotificacoes} title="Notificações" style={{ position: "relative", width: "34px", height: "34px", borderRadius: "9px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--nav-ink-3)' }}>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10 21h4" />
            </svg>
            {vals.ntHasUnread ? (
              <span className="num" style={{ position: "absolute", top: "1px", right: "1px", minWidth: "16px", height: "16px", padding: "0 4px", background: "var(--accent)", color: "var(--accent-on)", borderRadius: "14px", fontSize: "10px", fontWeight: "400", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--brand-bar)" }}>{vals.ntUnread}</span>
            ) : null}
          </button>
          {' '}
          <span style={{ width: "1px", height: "22px", background: "rgba(255,255,255,.12)", margin: "0 4px", flex: "none" }} />
          <div style={{ position: "relative", flex: "none" }}>
            <button className="hv-g" onClick={vals.toggleEntity} aria-haspopup="listbox" aria-expanded={vals.entityOpen} style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer", padding: "4px 8px", borderRadius: "9px", maxWidth: "260px", background: "none", border: "none", fontFamily: "inherit" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "var(--nav-line)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{vals.entityIconEl}</span>
              <span style={{ fontSize: "12px", fontWeight: "400", color: "var(--nav-ink)", letterSpacing: ".02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{vals.entityName}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: "none", color: 'var(--nav-rotulo)' }}><path d="m8 9 4-4 4 4M8 15l4 4 4-4" /></svg>
            </button>
            {vals.entityOpen ? (
              <>
                <div onClick={vals.toggleEntity} style={{ position: "fixed", inset: "0", zIndex: "55" }} />
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: "0", zIndex: "60", width: "340px", background: vals.surfaceBg, border: `1px solid ${vals.surfaceBorder}`, borderRadius: "14px", boxShadow: "0 16px 40px rgba(15,31,56,.28)", overflow: "hidden" }}>
                  <div style={{ padding: "13px 16px", borderBottom: `1px solid ${vals.surfaceBorder}` }}>
                    <div style={{ fontSize: "10.5px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--acc-blue-ink)" }}>{"Entidade atual"}</div>
                    <div style={{ fontSize: "14px", color: vals.textColor, marginTop: "3px" }}>{vals.entityName}</div>
                    <div className="num" style={{ fontSize: "11.5px", color: "var(--muted-2)", marginTop: "2px" }}>{vals.entityDoc}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" }}>
                    <span style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted-2)" }}>{"Minhas empresas"}</span>
                    <span className="num" style={{ fontSize: "11px", color: "var(--muted-2)", background: "var(--surface-3)", borderRadius: "20px", padding: "1px 8px" }}>{vals.entityCount}</span>
                  </div>
                  <div style={{ padding: "0 12px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface-2)", border: "1px solid var(--line-2)", borderRadius: "10px", padding: "8px 11px" }}>
                      {vals.entitySearchIconEl}
                      <input value={vals.entityQuery} onChange={vals.onEntityQuery} placeholder="Buscar por nome ou CNPJ…" aria-label="Buscar entidade" style={{ flex: "1", minWidth: "0", border: "none", background: "none", outline: "none", fontSize: "12.5px", color: vals.textColor, fontFamily: "inherit" }} />
                    </div>
                  </div>
                  <div role="listbox" aria-label="Trocar de entidade" style={{ maxHeight: "280px", overflowY: "auto" }}>
                    {(vals.entityOptions || []).map((e) => (
                      <button key={e.key} onClick={e.onClick} role="option" aria-selected={e.active} style={sx(e.style)}>
                        <span style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0" }}>
                          <span style={sx(e.avatarStyle)}>{e.avatarEl}</span>
                          <span style={{ minWidth: "0" }}>
                            <span style={{ display: "block", fontSize: "13px", color: e.active ? "var(--acc-blue-ink)" : vals.textColor }}>{e.name}</span>
                            <span className="num" style={{ display: "block", fontSize: "11.5px", color: "var(--muted-2)", marginTop: "2px" }}>{e.sub}</span>
                          </span>
                        </span>
                        <span style={{ flex: "none" }}>{e.checkEl}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: "10px 16px", borderTop: `1px solid ${vals.surfaceBorder}`, fontSize: "11px", color: "var(--muted-2)" }}>
                    {"Exibindo "}
                    {vals.entityShown}
                    {" de "}
                    {vals.entityCount + 1}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
  )
}
