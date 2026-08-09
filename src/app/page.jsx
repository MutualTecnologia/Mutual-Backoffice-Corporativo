'use client'

/**
 * A visão geral — o índice das quatro esteiras.
 *
 * Até a Fase 1 esta página era o placeholder que provava a identidade visual:
 * um título e duas linhas mostrando a regra de precisão. A prova continua aqui,
 * no cartão do rodapé, porque ela não deixou de valer — mudou de lugar, de
 * página inteira para o que ela sempre foi, um detalhe verificável.
 *
 * ⛔ Os números dos cartões saem de `logic/navigation.js`. Escrevê-los à mão
 * ("13 telas em ONBOARD") criaria a segunda verdade que apodrece no primeiro
 * item novo — e é exatamente o defeito que o `STATUS-DO-PROGRAMA` do outro
 * repositório documenta ter cometido três vezes.
 */
import { useRouter } from 'next/navigation'

import { Card, Note } from '../components/ui/kit.jsx'
import { ESTEIRAS, TRANSVERSAL, coberturaDoCatalogo, todasAsRotas } from '../logic/navigation.js'
import { PENDENCIAS, icone } from '../logic/renderVals.js'
import { CASAS_CRIPTO_MIN, CASAS_FIAT, numero } from '../lib/valor.js'

const ICONE_DA_ESTEIRA = {
  onboard: 'usuarios',
  paas: 'raio',
  otc: 'candelabro',
  controle: 'painel',
}

export default function Home() {
  const router = useRouter()
  const totalRotas = todasAsRotas().length
  const cobertura = coberturaDoCatalogo()

  return (
    <div style={{ padding: '22px 28px 40px', display: 'grid', gap: '16px' }} className="r-pad">
      <Note>
        O modelo mental oficial da Mutual Pay são <strong style={{ fontWeight: 500 }}>quatro
        esteiras</strong> (§2 da memória institucional). iGaming e Cross-border são verticais que
        as <em>consomem</em> — viram filtro, nunca menu.
      </Note>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
        }}
      >
        {ESTEIRAS.map((esteira) => {
          const telas = esteira.grupos.reduce((n, g) => n + g.itens.length, 0)
          const fila = esteira.grupos.reduce(
            (n, g) => n + g.itens.reduce((m, i) => m + (PENDENCIAS[i.href] || 0), 0),
            0,
          )
          return (
            <Card key={esteira.id} title={esteira.label} sub={esteira.nota}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'var(--surface-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >
                  {icone(ICONE_DA_ESTEIRA[esteira.id], { tamanho: 17, cor: 'var(--brand)' })}
                </span>
                <div>
                  <div className="num" style={{ fontSize: '18px', fontWeight: '500', color: 'var(--ink)' }}>
                    {telas}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-2)' }}>
                    telas em {esteira.grupos.length} grupos
                  </div>
                </div>
                {fila ? (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '11.5px',
                      color: 'var(--status-warning)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fila} na fila
                  </span>
                ) : null}
              </div>

              <div style={{ display: 'grid', gap: '2px' }}>
                {esteira.grupos.map((grupo) => (
                  <button
                    key={grupo.label}
                    className="hv-5"
                    onClick={() => router.push(grupo.itens[0].href)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '7px 8px',
                      fontFamily: 'inherit',
                      fontSize: '12.5px',
                      color: 'var(--ink-2)',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ flex: '1', minWidth: '0' }}>{grupo.label}</span>
                    <span className="num" style={{ fontSize: '11px', color: 'var(--muted-2)', flex: 'none' }}>
                      {grupo.itens.length}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          )
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
        }}
      >
        <Card title="Área transversal" sub="§2.2 — SISTEMA não é esteira e não disputa o primeiro nível">
          <div style={{ display: 'grid', gap: '2px' }}>
            {TRANSVERSAL.grupos.map((grupo) => (
              <button
                key={grupo.label}
                className="hv-5"
                onClick={() => router.push(grupo.itens[0].href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 8px',
                  fontFamily: 'inherit',
                  fontSize: '12.5px',
                  color: 'var(--ink-2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ flex: '1', minWidth: '0' }}>{grupo.label}</span>
                <span className="num" style={{ fontSize: '11px', color: 'var(--muted-2)', flex: 'none' }}>
                  {grupo.itens.length}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* A prova da Fase 0, no lugar que ela merece: um detalhe verificável,
            não a página inteira. */}
        <Card title="Regra de precisão" sub="Portada de lib/valor.js — verificada por asserção">
          <div className="num" style={{ display: 'grid', gap: '6px', fontSize: '13px', color: 'var(--ink)' }}>
            <div>
              FIAT ({CASAS_FIAT} casas): R$ {numero(131681.16, CASAS_FIAT)}
            </div>
            <div>
              CRIPTO ({CASAS_CRIPTO_MIN} casas): {numero(0.05, CASAS_CRIPTO_MIN)} BTC
            </div>
          </div>
          {/* ⛔ Os números saem de `coberturaDoCatalogo()`, contados na hora.
              Escrevê-los aqui criaria a segunda verdade que fossiliza — a
              lição que o STATUS-DO-PROGRAMA do outro repositório aprendeu três
              vezes, publicando "3 rotas placeholder" quando eram 2. */}
          <p style={{ margin: '12px 0 0', fontSize: '11.5px', color: 'var(--muted-2)', textWrap: 'pretty' }}>
            {totalRotas} rotas navegáveis, {cobertura.comCatalogo} com entrada no catálogo
            MTC-UX-2026-010, cobrindo as {cobertura.secoes} seções — {cobertura.p0} delas P0. Dado
            simulado; nenhuma ação sai daqui.
          </p>
        </Card>
      </div>
    </div>
  )
}
