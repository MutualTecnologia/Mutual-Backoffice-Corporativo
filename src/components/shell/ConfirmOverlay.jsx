'use client'

import { Fragment } from 'react'
import Interp from '../../lib/Interp.jsx'

export default function ConfirmOverlay({ vals }) {
  return (
      <div className={vals.themeClass} role="dialog" aria-modal="true" aria-label={vals.cfTitle} style={{ ...vals.themeVars, position: "fixed", inset: "0", zIndex: "60", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "rgba(10,18,34,.55)", backdropFilter: "blur(3px)", color: "var(--ink)" }}>
        <div style={{ width: "100%", maxWidth: "440px", background: "var(--surface)", borderRadius: "14px", boxShadow: "0 24px 60px rgba(10,18,34,.35)", overflow: "hidden", maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ fontSize: "14.5px", fontWeight: "400" }}>{vals.cfTitle}</div>
            {/* O × não tinha nome: um leitor de tela anunciava "botão" e nada mais,
                no único controle que fecha uma operação em andamento. */}
            <button className="hv-4" type="button" onClick={vals.closeConfirm} aria-label="Fechar" title="Fechar" style={{ marginLeft: "auto", width: "30px", height: "30px", borderRadius: "8px", border: "none", background: "var(--surface-3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5a6a86" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div style={{ padding: "8px 20px 4px", display: "flex", alignItems: "center", gap: "6px" }}>
            {(vals.cfSteps || []).map((s, i0) => (
              <Fragment key={i0}>
                <div style={{ flex: "1", height: "4px", borderRadius: "14px", background: s.bg }} />
              </Fragment>
            ))}
          </div>
          <div style={{ padding: "18px 20px 22px", overflowY: "auto" }}>
            {vals.cfReview ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "var(--acc-blue-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2556c4" strokeWidth="1.9">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="num" style={{ fontSize: "26px", fontWeight: "500", marginTop: "12px" }}>{vals.cfAmount}</div>
                  <div style={{ fontSize: "12.5px", color: "var(--muted-2)" }}>{vals.cfSubtitle}</div>
                </div>
                <div style={{ background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "12px", padding: "4px 14px" }}>
                  {(vals.cfRows || []).map((r, i0) => (
                    <Fragment key={i0}>
                      <div style={{ display: "flex", gap: "12px", padding: "11px 0", borderBottom: "1px solid var(--line)" }}>
                        <span style={{ fontSize: "12px", color: "var(--muted-2)", flex: "none", maxWidth: "46%" }}>{r.k}</span>
                        <span className="num" style={{ fontSize: "12.5px", fontWeight: "400", color: "var(--ink)", marginLeft: "auto", textAlign: "right", wordBreak: "break-all" }}>{r.v}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", background: "#f0f6ff", border: "1px solid #cfe0fb", borderRadius: "11px", padding: "11px 13px", marginTop: "14px", fontSize: "11px", color: "var(--ink-2)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2556c4" strokeWidth="1.9" style={{ flex: "none", marginTop: "1px" }}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" /></svg>
                  {"Operação registrada e reportada conforme a Lei 14.478/2022 (VASP) e normas do Banco Central. Confira os dados antes de autorizar."}
                </div>
                <button className="hv-3" onClick={vals.cfNextAuth} style={{ width: "100%", background: "var(--brand)", color: "#fff", border: "none", borderRadius: "12px", padding: "14px", fontSize: "14px", fontWeight: "400", fontFamily: "inherit", cursor: "pointer", marginTop: "16px" }}>{"Autorizar operação"}</button>
              </>
            ) : null}
            {vals.cfAuth ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "var(--acc-amber-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c98a12" strokeWidth="1.9">
                      <rect x="4" y="10" width="16" height="11" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "500", marginTop: "12px" }}>{vals.isCaPin ? vals.caPinTitulo : vals.isCaLocal ? vals.caLocalTitulo : vals.ca2faTitulo}</div>
                  <div style={{ fontSize: "12.5px", color: "var(--muted-2)", marginTop: "3px", textWrap: "pretty" }}>{vals.isCaPin ? vals.caPinSub : vals.isCaLocal ? vals.caLocalSub : vals.ca2faSub}</div>
                  {/* As três provas, na ordem. Mover dinheiro pede senha
                      financeira, conferência de onde a ordem sai e o código com
                      validade contada — antes esta etapa pedia só o código. */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%", marginTop: "14px" }}>
                    {[1, 2, 3].map((n) => (
                      <span key={n} style={{ flex: 1, height: "3px", borderRadius: "2px", background: n <= vals.caAuthPasso ? "var(--brand)" : "var(--surface-3)" }} />
                    ))}
                    <span style={{ flex: "none", fontSize: "10.5px", color: "var(--muted-2)" }}>{vals.caAuthPasso + "/3"}</span>
                  </div>

                  {vals.isCaPin ? (
                    <label style={{ display: "block", width: "100%", marginTop: "16px", textAlign: "left" }}>
                      <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{vals.caPinLabel}</span>
                      <input
                        className="num" type="password" inputMode="numeric" autoComplete="off"
                        value={vals.caPin} onChange={vals.onCaPin} placeholder="••••"
                        style={{ width: "100%", marginTop: "6px", background: "var(--surface-2)", border: "1px solid var(--line-2)", borderRadius: "11px", padding: "13px", textAlign: "center", letterSpacing: ".5em", fontSize: "19px", color: "var(--ink)", fontFamily: "inherit", outline: "none" }}
                      />
                    </label>
                  ) : null}

                  {vals.isCaLocal ? (
                    <div style={{ width: "100%", marginTop: "14px", textAlign: "left" }}>
                      <div style={{ border: "1px solid var(--line)", borderRadius: "11px", overflow: "hidden" }}>
                        {(vals.caLocalLinhas || []).map((l, i0) => (
                          <div key={i0} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "9px 12px", fontSize: "11.5px", borderTop: i0 ? "1px solid var(--line)" : "none" }}>
                            <span style={{ color: "var(--muted)" }}>{l.k}</span>
                            <span className="num" style={{ color: "var(--ink)", textAlign: "right" }}>{l.v}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "10px", background: vals.caLocalEstado === "ok" ? "var(--acc-green-bg)" : "var(--acc-amber-bg)", borderRadius: "10px", padding: "10px 12px", fontSize: "11.5px", color: vals.caLocalEstado === "ok" ? "var(--acc-green-ink)" : "var(--acc-amber-ink)", lineHeight: "1.55", textWrap: "pretty" }}>{vals.caLocalAviso}</div>
                      <button onClick={vals.caLocalRefazer} style={{ marginTop: "9px", background: "none", border: "none", padding: 0, fontSize: "11.5px", color: "var(--acc-blue-ink)", fontFamily: "inherit", cursor: "pointer" }}>{vals.caLocalRefazerLabel}</button>
                      {vals.caLocalPedeJustificativa ? (
                        <label style={{ display: "block", marginTop: "12px" }}>
                          <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>{vals.caLocalJustLabel}</span>
                          <textarea
                            value={vals.caJustificativa} onChange={vals.onCaJustificativa} rows={2}
                            placeholder="Ex.: estou viajando e usando a rede do hotel"
                            style={{ width: "100%", marginTop: "6px", background: "var(--surface-2)", border: "1px solid var(--line-2)", borderRadius: "11px", padding: "11px", fontSize: "13px", color: "var(--ink)", fontFamily: "inherit", outline: "none", resize: "vertical" }}
                          />
                        </label>
                      ) : null}
                    </div>
                  ) : null}

                  {vals.isCa2fa ? (
                    <>
                      <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
                        {(vals.cfOtp || []).map((d, i0) => (
                          <input
                            key={i0} ref={d.ref} value={d.v} onChange={d.onChange} onKeyDown={d.onKeyDown} onPaste={d.onPaste}
                            inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                            aria-label={"Dígito " + (i0 + 1) + " de 6"} aria-invalid={vals.cfOtpErro ? "true" : undefined}
                            style={{ width: "44px", height: "52px", border: `1px solid ${d.bd}`, borderRadius: "11px", textAlign: "center", fontSize: "22px", fontWeight: "500", color: "var(--ink)", background: "var(--surface-2)", fontFamily: "inherit", outline: "none" }}
                          />
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "10px", marginTop: "12px" }}>
                        <span className="num" style={{ fontSize: "11.5px", color: vals.ca2faExpirado ? "var(--status-error)" : "var(--muted-2)" }}>{vals.ca2faPrazoLabel}</span>
                        <button onClick={vals.ca2faReenviar} disabled={!vals.ca2faReenviarOk} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: "11.5px", color: vals.ca2faReenviarOk ? "var(--acc-blue-ink)" : "var(--muted-2)", cursor: vals.ca2faReenviarOk ? "pointer" : "not-allowed" }}>{vals.ca2faReenviarLabel}</button>
                      </div>
                      <div style={{ fontSize: "10.5px", color: "var(--muted-2)", marginTop: "8px", textWrap: "pretty" }}>{vals.cfOtpDica}</div>
                    </>
                  ) : null}

                  {vals.caAuthErro ? (
                    <div role="alert" style={{ fontSize: "11.5px", color: "var(--status-error)", marginTop: "10px", textWrap: "pretty", width: "100%" }}>{vals.caAuthErro}</div>
                  ) : null}

                  <button
                    className="hv-3"
                    onClick={vals.isCaPin ? vals.caPinConfirmar : vals.isCaLocal ? vals.caLocalConfirmar : vals.ca2faConfirmar}
                    disabled={!(vals.isCaPin ? vals.caPinOk : vals.isCaLocal ? vals.caLocalOk : vals.ca2faOk)}
                    style={{ width: "100%", background: (vals.isCaPin ? vals.caPinOk : vals.isCaLocal ? vals.caLocalOk : vals.ca2faOk) ? "var(--brand)" : "var(--surface-3)", color: (vals.isCaPin ? vals.caPinOk : vals.isCaLocal ? vals.caLocalOk : vals.ca2faOk) ? "#fff" : "var(--muted-2)", border: "none", borderRadius: "12px", padding: "14px", fontSize: "14px", fontWeight: "400", fontFamily: "inherit", cursor: "pointer", marginTop: "20px" }}
                  >{vals.isCa2fa ? "Confirmar e assinar" : "Continuar"}</button>
                </div>
              </>
            ) : null}
            {vals.cfProcessing ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 0" }}>
                  {" "}
                  <Interp value={vals.cfSpinner} />
                  {" "}
                  <div style={{ fontSize: "16px", fontWeight: "500", marginTop: "18px" }}>{"Processando operação…"}</div>
                  <div style={{ fontSize: "12.5px", color: "var(--muted-2)", marginTop: "4px" }}>{"Registrando e liquidando. Não feche esta janela."}</div>
                </div>
              </>
            ) : null}
            {vals.cfDone ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--acc-green-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--acc-green-ink)" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "500", marginTop: "12px" }}>{"Operação concluída"}</div>
                  <div className="num" style={{ fontSize: "24px", fontWeight: "500", marginTop: "6px" }}>{vals.cfAmount}</div>
                  <div style={{ fontSize: "12.5px", color: "var(--muted-2)" }}>{vals.cfSubtitle}</div>
                </div>
                <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", background: "var(--surface-2)", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "400", color: "var(--ink)", fontSize: "11px" }}>{"M"}</div>
                    <span style={{ fontSize: "12px", fontWeight: "400" }}>{"Comprovante · " + vals.nomeCompleto}</span>
                  </div>
                  <div style={{ padding: "4px 14px" }}>
                    {(vals.cfReceipt || []).map((r, i0) => (
                      <Fragment key={i0}>
                        <div style={{ display: "flex", gap: "12px", padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
                          <span style={{ fontSize: "11px", color: "var(--muted-2)", flex: "none", maxWidth: "44%" }}>{r.k}</span>
                          <span className="num" style={{ fontSize: "11.5px", fontWeight: "400", color: "var(--ink)", marginLeft: "auto", textAlign: "right", wordBreak: "break-all" }}>{r.v}</span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div style={{ padding: "10px 14px", fontSize: "9.5px", color: "#a0abbe", lineHeight: "1.5", background: "var(--surface)" }}>
                    {"Mutual Capital · VASP registrada — CNPJ 12.345.678/0001-95. Documento gerado eletronicamente e válido conforme a Lei 14.478/2022 e a Resolução BCB. Dados de originador/beneficiário coletados em cumprimento à Regra de Viagem (Travel Rule)."}
                  </div>
                </div>
                <div className="r-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "8px", marginTop: "16px" }}>
                  <button className="hv-1" onClick={vals.cfBaixarPdf} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "10px", padding: "11px 8px", fontSize: "11.5px", fontWeight: "400", color: "var(--ink)", fontFamily: "inherit", cursor: "pointer", minWidth: "0", whiteSpace: "nowrap" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: "none" }}>
                      <path d="M12 3v12" />
                      <path d="m7 11 5 4 5-4" />
                      <path d="M5 21h14" />
                    </svg>
                    {"Baixar PDF"}
                  </button>
                  {' '}
                  <button className="hv-1" onClick={vals.cfBaixarPng} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "10px", padding: "11px 8px", fontSize: "11.5px", fontWeight: "400", color: "var(--ink)", fontFamily: "inherit", cursor: "pointer", minWidth: "0", whiteSpace: "nowrap" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" style={{ flex: "none" }}>
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="8.5" cy="9.5" r="1.5" />
                      <path d="m4 18 5-5 4 4 3-3 4 4" />
                    </svg>
                    {"Baixar PNG"}
                  </button>
                  {' '}
                  <button className="hv-1" onClick={vals.cfWhatsApp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "10px", padding: "11px 8px", fontSize: "11.5px", fontWeight: "400", color: "var(--ink)", fontFamily: "inherit", cursor: "pointer", minWidth: "0", whiteSpace: "nowrap" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.9" style={{ flex: "none" }}>
                      <path d="M3 21l1.6-4.6A8.4 8.4 0 1 1 7.9 19.6Z" />
                      <path d="M8.6 9.2c.3 2.6 3.6 5.9 6.2 6.2l1.1-1.3 2 .9v1.6c-3.6.7-8.9-4.6-8.2-8.2h1.6l.9 2Z" fill="#25D366" stroke="none" />
                    </svg>
                    {"WhatsApp"}
                  </button>
                  {' '}
                  <button className="hv-1" onClick={vals.cfTelegram} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "10px", padding: "11px 8px", fontSize: "11.5px", fontWeight: "400", color: "var(--ink)", fontFamily: "inherit", cursor: "pointer", minWidth: "0", whiteSpace: "nowrap" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#229ED9" strokeWidth="1.9" style={{ flex: "none" }}>
                      <path d="M21 4 2.8 11.3l5.6 1.7L21 4Z" />
                      <path d="M21 4 9.9 19.4l-1.5-6.4L21 4Z" />
                    </svg>
                    {"Telegram"}
                  </button>
                </div>
                {vals.cfExpErro ? (
                  <div role="alert" style={{ fontSize: "11.5px", color: "var(--status-error)", marginTop: "10px", textWrap: "pretty" }}>{vals.cfExpErro}</div>
                ) : null}
                <button className="hv-3" onClick={vals.closeConfirm} style={{ width: "100%", background: "var(--brand)", color: "#fff", border: "none", borderRadius: "12px", padding: "13px", fontSize: "13.5px", fontWeight: "400", fontFamily: "inherit", cursor: "pointer", marginTop: "10px" }}>{"Concluir"}</button>
              </>
            ) : null}
          </div>
        </div>
      </div>
  )
}
