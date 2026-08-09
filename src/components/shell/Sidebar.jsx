'use client'

import { Fragment } from 'react'
import { asset } from '../../lib/asset.js'
import { sx } from '../../lib/style.js'

/**
 * O selo de contagem dos botões de Avisos e Tarefas.
 *
 * `SELO_LINHA` é o comportamento antigo — o selo ocupa espaço na linha, ao lado
 * do rótulo. `SELO_CANTO` o tira do fluxo e o encosta no canto do botão, que é
 * o que permite o botão compacto ter só 44px de largura útil sem que o selo
 * empurre o ícone para fora da barra.
 */
const SELO_TOPO = {
  minWidth: "16px", height: "16px", borderRadius: "14px",
  background: "var(--accent)", color: "var(--accent-on)",
  fontSize: "9.5px", fontWeight: "400",
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "0 4px", flex: "none",
}
const SELO_LINHA = { position: "static" }
const SELO_CANTO = { position: "absolute", top: "-5px", right: "-4px", border: "1.5px solid var(--brand-deep)" }

/**
 * O logotipo do cabeçalho — imagem ou letra.
 *
 * A imagem é o logotipo da Mutual e vale enquanto o nome for o de origem. Numa
 * instalação renomeada entra a letra sobre a cor da marca, com a tinta escolhida
 * por contraste (`--brand-on`). Ver `resolverLogo` em lib/marca.js.
 */
function Marca({ logo, nome }) {
  const caixa = { width: "34px", height: "34px", borderRadius: "9px", flex: "none" }
  // `upload` já é data URL; `padrao` é caminho de asset e precisa do prefixo do
  // subdiretório. Passar um data URL por `asset()` o transformaria em lixo.
  if (logo.tipo === 'upload' || logo.tipo === 'padrao') {
    const src = logo.tipo === 'upload' ? logo.valor : asset(logo.valor)
    return <img src={src} alt={nome} style={{ ...caixa, objectFit: "contain" }} />
  }
  // Duas ou mais letras não caberiam em 34px no corpo de 17px do caso de uma só.
  const n = [...logo.valor].length
  return (
    <span
      aria-hidden="true"
      style={{
        ...caixa, background: "var(--brand)", color: "var(--brand-on)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: "500", fontSize: n > 2 ? "11px" : n === 2 ? "14px" : "17px",
        lineHeight: "1", letterSpacing: n > 1 ? "0" : "-.02em",
      }}
    >
      {logo.valor}
    </span>
  )
}

/** O selo de pendências — o mesmo desenho do de Avisos. */
function Selo({ n }) {
  return (
    <span style={{ marginLeft: "auto", minWidth: "16px", height: "16px", borderRadius: "14px", background: "var(--accent)", color: "var(--accent-on)", fontSize: "9.5px", fontWeight: "400", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", flex: "none" }}>{n}</span>
  )
}

/**
 * Uma linha do menu: o fio do submenu, o ícone, o nome e — quando há — a nota,
 * o selo de pendências e o chevron.
 *
 * A mesma peça serve o item de grupo, o item de sistema, o pai de um submenu e
 * o filho dele. O item que leva para fora (o WhatsApp) é este mesmo `<a>` com
 * `href`: abre noutra aba e não passa pelo roteador de telas.
 */
function NavLink({ it }) {
  const fora = !!it.href
  return (
    <a
      className="hv-e"
      href={it.href || undefined}
      target={fora ? "_blank" : undefined}
      rel={fora ? "noreferrer" : undefined}
      onClick={it.onClick}
      title={it.title}
      style={sx(it.style)}
    >
      {it.barStyle ? <span style={sx(it.barStyle)} /> : null}
      {it.linhaV ? <span style={sx(it.linhaV)} /> : null}
      {it.linhaH ? <span style={sx(it.linhaH)} /> : null}
      {it.iconEl}
      {/* O nome só entra quando existe. No menu compacto ele vem vazio, e um
          `<span>` vazio continua sendo item de flex: o `gap` de 11px contava
          entre ele e o ícone, empurrando o ícone 5,5px — meio gap — para a
          esquerda do centro da barra. Era o desalinhamento da coluna toda. */}
      {it.name ? <span style={{ whiteSpace: "nowrap" }}>{it.name}</span> : null}
      {it.nota ? <span style={{ fontSize: "11px", color: "var(--nav-dim)", whiteSpace: "nowrap" }}>{it.nota}</span> : null}
      {it.badge ? <Selo n={it.badge} /> : null}
      {it.caret ? (
        <span style={sx(it.caret)}>
          {/* `stroke="currentColor"` com a cor no `style` é o idioma do projeto
              — 113 ocorrências, contra 63 que põem `var()` direto no atributo.
              O atributo com `currentColor` é sempre valor válido; a cor entra
              por propriedade CSS, onde `var()` resolve sem depender de o
              navegador tratar atributo de apresentação como declaração CSS. */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: 'var(--nav-rotulo)' }}><path d="m6 9 6 6 6-6" /></svg>
        </span>
      ) : null}
    </a>
  )
}

export default function Sidebar({ vals }) {
  return (
      <aside className="app-aside" data-aberta={vals.navDrawerAberto ? '1' : '0'} aria-hidden={vals.navEstreita && !vals.navDrawerAberto} style={sx(vals.asideStyle)}>
        {/* O cabeçalho empilha no modo compacto.
            Lado a lado ele soma 98px — logo 34 + gap 10 + botão 26 + 28 de
            padding — e a barra compacta tem 68px. O botão de alternar era
            empurrado 16px para fora, ficava por baixo do `<main>` e deixava de
            receber clique: dava para minimizar e não dava para voltar. */}
        <div style={{ display: "flex", flexDirection: vals.navWide ? "row" : "column", alignItems: "center", gap: "10px", padding: vals.navWide ? "18px 14px 14px" : "16px 12px 12px" }}>
          <Marca logo={vals.navLogo} nome={vals.navNome} />
          {vals.navWide ? (
            <>
              <div style={{ minWidth: "0", lineHeight: "1.15" }}>
                <div style={{ fontWeight: "500", fontSize: "15px", color: "var(--nav-ink)", letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{vals.navNome}</div>
                {vals.navTagline ? (
                  <div style={{ fontWeight: "400", fontSize: "10.5px", color: "var(--accent)", letterSpacing: ".02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{vals.navTagline}</div>
                ) : null}
              </div>
            </>
          ) : null}
          <button className="hv-c" onClick={vals.toggleCompact} title={vals.navWide ? "Recolher menu" : "Expandir menu"} aria-label={vals.navWide ? "Recolher menu" : "Expandir menu"} aria-expanded={vals.navWide} style={{ marginLeft: vals.navWide ? "auto" : "0", background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "8px", width: vals.navWide ? "26px" : "34px", height: vals.navWide ? "26px" : "30px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
            {/* No compacto a seta aponta para onde o clique leva — abrir —, em
                vez de repetir o hambúrguer que não diz direção. */}
            {vals.navWide ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--nav-ink-3)' }}><path d="M4 6h16M4 12h10M4 18h16" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--nav-ink-3)' }}><path d="m9 18 6-6-6-6" /></svg>
            )}
          </button>
        </div>
        <div style={{ padding: "0 12px 10px" }}>
          {/* `justifyContent` explícito: sem ele o botão caía no `flex-start` e,
              no compacto, a lupa ficava encostada no padding esquerdo — 3,5px
              fora do centro, desalinhada dos ícones do menu logo abaixo. */}
          <button className="hv-d" onClick={vals.openCmd} title={vals.navWide ? undefined : "Buscar ação (⌘K)"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: vals.navWide ? "flex-start" : "center", gap: "8px", background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "10px", padding: "9px 10px", fontFamily: "inherit", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: "none", color: 'var(--nav-icon)' }}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            {' '}
            {vals.navWide ? (
              <>
                <span style={{ fontSize: "12.5px", color: "var(--nav-icon)", whiteSpace: "nowrap" }}>{"Buscar ação…"}</span>
                <span style={{ marginLeft: "auto", fontSize: "10px", color: "var(--nav-dim)", border: "1px solid var(--nav-line-forte)", borderRadius: "5px", padding: "1px 5px" }}>{"⌘K"}</span>
              </>
            ) : null}
          </button>
        </div>
        {/* Avisos e Tarefas: lado a lado quando há largura, empilhados quando
            não há. Com `flex: 1` cada e 44px úteis, o segundo botão começava em
            x=74 numa barra que acaba em 68 — nascia inteiro fora da tela, e o
            de Tarefas simplesmente não existia no modo compacto.

            No compacto o selo sai do fluxo e vai para o canto do botão: em
            linha ele empurraria o ícone para fora de novo. */}
        <div style={{ display: "flex", flexDirection: vals.navWide ? "row" : "column", gap: "6px", padding: "0 12px 10px" }}>
          <button className="hv-d" onClick={vals.goNotificacoes} title={vals.navWide ? "Notificações" : "Avisos" + (vals.ntHasUnread ? " · " + vals.ntUnread + " não lidos" : "")} style={{ position: "relative", flex: vals.navWide ? "1" : "none", width: vals.navWide ? "auto" : "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "9px", padding: "8px", fontSize: "11.5px", fontWeight: "400", color: "var(--nav-ink-3)", fontFamily: "inherit", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" style={{ flex: "none" }}>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10 21h4" />
            </svg>
            {vals.navWide ? (
              <>
                <span>{"Avisos"}</span>
              </>
            ) : null}
            {vals.ntHasUnread ? (
              <span style={{ ...SELO_TOPO, ...(vals.navWide ? SELO_LINHA : SELO_CANTO) }}>{vals.ntUnread}</span>
            ) : null}
          </button>
          {' '}
          <button className="hv-d" onClick={vals.goSolicitacoes} title={vals.navWide ? "Solicitações" : "Tarefas · 3 pendentes"} style={{ position: "relative", flex: vals.navWide ? "1" : "none", width: vals.navWide ? "auto" : "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "9px", padding: "8px", fontSize: "11.5px", fontWeight: "400", color: "var(--nav-ink-3)", fontFamily: "inherit", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" style={{ flex: "none" }}>
              <path d="M9 11l3 3 8-8" />
              <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
            </svg>
            {vals.navWide ? (
              <>
                <span>{"Tarefas"}</span>
              </>
            ) : null}
            <span style={{ ...SELO_TOPO, ...(vals.navWide ? SELO_LINHA : SELO_CANTO) }}>{"3"}</span>
          </button>
        </div>
        <nav style={{ flex: "1 1 0", minHeight: "0", overflowY: "auto", overflowX: "hidden", padding: "4px 12px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {(vals.navGroups || []).map((g, i0) => (
            <Fragment key={i0}>
              {g.hideLabel ? (
                <>
                  <div style={{ height: "1px", background: "var(--nav-line)", margin: "10px 6px" }} />
                </>
              ) : null}
              <button onClick={g.toggle} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", width: "100%", fontSize: "10px", fontWeight: "400", letterSpacing: ".09em", color: "var(--nav-grupo)", padding: "13px 10px 6px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                {g.label}
                <span style={sx(g.caret)}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: 'var(--nav-grupo)' }}><path d="m6 9 6 6 6-6" /></svg>
                </span>
              </button>
              {' '}
              {g.open ? (
                <>
                  {/* Nos grupos o selo é da Gestão MED (prazos de defesa
                      abertos); nos itens de sistema, dos Tickets. */}
                  {(g.items || []).map((it, i1) => (
                    <NavLink key={i1} it={it} />
                  ))}
                </>
              ) : null}
            </Fragment>
          ))}
          <div style={{ height: "1px", background: "var(--nav-line)", margin: "14px 6px 4px" }} />
          {/* Um item de sistema pode ter filhos — hoje só o Suporte, como no
              Mutual Pay. O pai abre e fecha; os filhos vêm ligados a ele pelo
              fio que `mkFilho` desenha (ver ../../logic/renderVals.js). */}
          {(vals.sysItems || []).map((it, i0) => (
            <Fragment key={i0}>
              <NavLink it={it} />
              {(it.filhos || []).map((f, i1) => (
                <NavLink key={i1} it={f} />
              ))}
            </Fragment>
          ))}
          {vals.navWide ? (
            <>
              <div style={{ background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "11px", padding: "12px", marginTop: "14px", flex: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "9.5px", fontWeight: "400", letterSpacing: ".08em", color: "var(--nav-rotulo)" }}>{"PATRIMÔNIO TOTAL"}</span>
                  {/* Era "KYC OK" fixo, para qualquer entidade e em qualquer
                      estado de cadastro. Agora diz o nível de verificação da
                      entidade ativa, que é o mesmo que governa o teto diário de
                      saque — ver logic/limites.js. */}
                  <span title={vals.limVerif ? vals.limVerif.libera : ''} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "9.5px", fontWeight: "400", color: "var(--nav-ok)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--nav-ok)" }} />
                    {vals.limVerifSelo}
                  </span>
                </div>
                <div className="num" style={{ fontSize: "17px", fontWeight: "500", color: "var(--nav-ink)", marginTop: "6px", filter: vals.balanceBlur }}>{vals.ovTotal}</div>
                <button className="hv-f" onClick={vals.goDepositar} style={{ width: "100%", background: "var(--accent)", color: "var(--accent-on)", border: "none", borderRadius: "9px", padding: "9px", fontSize: "12px", fontWeight: "400", fontFamily: "inherit", cursor: "pointer", marginTop: "10px" }}>{"Depositar"}</button>
              </div>

              {/* Identificação da sessão. Sempre visível: quem entrou, há
                  quanto tempo, de onde e em quê. Ver logic/sessao.js. */}
              <div style={{ background: "var(--nav-surface)", border: "1px solid var(--nav-line)", borderRadius: "11px", padding: "12px", marginTop: "10px", flex: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "9.5px", fontWeight: "400", letterSpacing: ".08em", color: "var(--nav-rotulo)" }}>{vals.sesTitulo}</span>
                  <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "9.5px", fontWeight: "400", color: "var(--nav-ok)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--nav-ok)" }} />
                    {vals.sesUnicaSelo}
                  </span>
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--nav-ink)", marginTop: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vals.sesEmail}</div>
                <div className="num" style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10.5px", color: "var(--nav-muted)", marginTop: "3px" }}>
                  {vals.sesRelogioIconEl}
                  <span>{vals.sesResumo}</span>
                </div>

                {vals.sesDetalhes ? (
                  <div style={{ marginTop: "9px", paddingTop: "9px", borderTop: "1px solid var(--nav-line)", display: "grid", gap: "7px" }}>
                    {(vals.sesLinhas || []).map((l) => (
                      <div key={l.k}>
                        <div style={{ fontSize: "9px", letterSpacing: ".06em", color: "var(--nav-rotulo)", textTransform: "uppercase" }}>{l.k}</div>
                        <div style={{ fontSize: "10.5px", color: "var(--nav-valor)", wordBreak: "break-word" }}>{l.v}</div>
                        {l.nota ? <div style={{ fontSize: "9.5px", color: "var(--nav-rotulo)", wordBreak: "break-word" }}>{l.nota}</div> : null}
                      </div>
                    ))}

                    <div>
                      <div style={{ fontSize: "9px", letterSpacing: ".06em", color: "var(--nav-rotulo)", textTransform: "uppercase" }}>{vals.sesGeoRotulo}</div>
                      {vals.sesGeoValor ? (
                        <div className="num" style={{ fontSize: "10.5px", color: "var(--nav-valor)" }}>
                          {vals.sesGeoValor}
                          {vals.sesGeoPrecisao ? <span style={{ color: "var(--nav-rotulo)" }}>{" · " + vals.sesGeoPrecisao}</span> : null}
                        </div>
                      ) : null}
                      {vals.sesGeoErro ? <div style={{ fontSize: "9.5px", color: "var(--nav-erro)", marginTop: "2px" }}>{vals.sesGeoErro}</div> : null}
                      <button type="button" onClick={vals.sesGeoPedir} disabled={vals.sesGeoBuscando} className="hv-e" style={{ width: "100%", marginTop: "5px", background: "transparent", border: "1px solid var(--nav-line-forte)", borderRadius: "8px", padding: "7px", fontSize: "10px", color: "var(--nav-valor)", fontFamily: "inherit", cursor: vals.sesGeoBuscando ? "progress" : "pointer" }}>{vals.sesGeoBotao}</button>
                      <div style={{ fontSize: "9px", color: "var(--nav-rotulo)", marginTop: "4px", lineHeight: "1.45" }}>{vals.sesGeoNota}</div>
                    </div>

                    <div style={{ paddingTop: "7px", borderTop: "1px solid var(--nav-line)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9px", letterSpacing: ".06em", color: "var(--nav-rotulo)", textTransform: "uppercase" }}>
                        {vals.sesTravaIconEl}
                        <span>{vals.sesTravaTitulo}</span>
                      </div>
                      <div style={{ fontSize: "9.5px", color: "var(--nav-valor)", marginTop: "3px", lineHeight: "1.45" }}>{vals.sesTravaLocal}</div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "5px", fontSize: "9.5px", color: "var(--nav-aviso)", marginTop: "5px", lineHeight: "1.45" }}>
                        {vals.sesAvisoIconEl}
                        <span>{vals.sesTravaServidor}</span>
                      </div>
                      <div style={{ fontSize: "9.5px", color: "var(--nav-rotulo)", marginTop: "5px", lineHeight: "1.45" }}>{vals.sesTrava2fa}</div>
                    </div>
                  </div>
                ) : null}

                <button type="button" onClick={vals.sesDetalhesAlternar} aria-expanded={vals.sesDetalhes} className="hv-e" style={{ width: "100%", marginTop: "8px", background: "transparent", border: "none", padding: "6px 0 0", fontSize: "10px", color: "var(--nav-acao)", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>{vals.sesDetalhesRotulo}</button>
              </div>
            </>
          ) : null}
        </nav>
        {/* O chevron do rodapé não abria nada; agora ele é a saída da sessão,
            e o nome e o email são os de quem entrou, não texto fixo. */}
        <div style={{ flex: "none", padding: "4px 12px 12px", borderTop: "1px solid var(--nav-line)", position: "relative" }}>
          {vals.authMenuOpen ? (
            <>
              <div onClick={vals.authMenuFechar} style={{ position: "fixed", inset: "0", zIndex: "60" }} />
              <div style={{ position: "absolute", bottom: "calc(100% - 2px)", left: "12px", right: "12px", zIndex: "61", background: "var(--nav-menu)", border: "1px solid var(--nav-line-forte)", borderRadius: "11px", boxShadow: "0 10px 30px rgba(0,0,0,.4)", padding: "5px" }}>
                <div style={{ padding: "8px 10px 6px", fontSize: "10.5px", color: "var(--nav-rotulo)", overflow: "hidden", textOverflow: "ellipsis" }}>{vals.authUsuarioEmail}</div>
                <button type="button" onClick={vals.authSair} className="hv-e" style={{ width: "100%", display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", background: "transparent", border: "none", borderRadius: "8px", color: "var(--nav-erro)", fontSize: "12.5px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                  {vals.authSairIconEl}
                  {"Sair da conta"}
                </button>
              </div>
            </>
          ) : null}
          <button type="button" onClick={vals.authMenuToggle} className="hv-e" style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 4px 2px", background: "transparent", border: "none", borderRadius: "9px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "var(--nav-avatar)", color: "var(--nav-ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "400", flex: "none" }}>{vals.authUsuarioIniciais}</div>
            {vals.navWide ? (
              <>
                <div style={{ lineHeight: "1.2", overflow: "hidden", minWidth: "0" }}>
                  <div style={{ fontSize: "12.5px", fontWeight: "400", color: "var(--nav-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{vals.authUsuarioNome}</div>
                  <div style={{ fontSize: "11px", color: "var(--nav-rotulo)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{vals.authUsuarioEmail}</div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: "auto", flex: "none", color: 'var(--nav-rotulo)' }}><path d="m6 9 6 6 6-6" /></svg>
              </>
            ) : null}
          </button>
        </div>
      </aside>
  )
}
