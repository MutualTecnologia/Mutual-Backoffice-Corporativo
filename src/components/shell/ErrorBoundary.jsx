'use client'

/**
 * Rede de segurança do render.
 *
 * O App é uma classe única cujo `renderVals()` calcula os valores de todas as
 * telas a cada render. Sem um boundary, uma exceção em qualquer `*Vals()` vira
 * tela branca — sem mensagem, sem saída, e sem F5 que resolva quando a causa é
 * estado corrompido no armazenamento local, porque o reload o lê de novo.
 *
 * Por isso a recuperação tem dois degraus:
 *
 *   - **Tentar de novo** rearma o boundary e renderiza outra vez. Resolve o
 *     erro transitório — uma condição de corrida, um dado que já mudou.
 *   - **Recomeçar do zero** apaga as chaves `mutual.*` antes de recarregar.
 *     É o caminho quando o erro volta a cada tentativa: se o crash nasce de
 *     uma preferência persistida, recarregar sem limpar só o reproduz.
 *
 * Boundary não vê erro assíncrono — rejeição de promise tem de ser tratada na
 * origem (ver o ouvinte de `unhandledrejection` em main.jsx).
 */
import React from 'react'

/** Toda persistência do terminal usa este prefixo (mutual.favs, mutual.auth…). */
const PREFIXO = 'mutual.'

function limparEstadoLocal() {
  try {
    const chaves = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(PREFIXO)) chaves.push(k)
    }
    chaves.forEach((k) => localStorage.removeItem(k))
  } catch {
    /* modo privado ou storage bloqueado: o reload sozinho já é o que resta */
  }
}

const BOTAO = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
  border: 'none', borderRadius: '10px', padding: '11px 18px',
  fontFamily: 'inherit', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer',
}

export default class ErrorBoundary extends React.Component {
  state = { erro: null }

  static getDerivedStateFromError(erro) {
    return { erro }
  }

  componentDidCatch(erro, info) {
    // Ponto único para telemetria futura; hoje, ao menos, deixa rastro completo.
    console.error('render quebrou:', erro, info.componentStack)
  }

  render() {
    if (!this.state.erro) return this.props.children

    const detalhe = String((this.state.erro && this.state.erro.message) || this.state.erro)
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--bg, #f4f6fa)', fontFamily: 'Montserrat, system-ui, sans-serif' }}>
        <div role="alert" style={{ maxWidth: '460px', width: '100%', background: 'var(--surface, #fff)', border: '1px solid var(--line, #e3e8f0)', borderRadius: '16px', padding: '28px' }}>
          <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--ink, #0f1f38)' }}>
            {'O terminal encontrou um problema'}
          </div>
          <p style={{ margin: '10px 0 0', fontSize: '12.5px', lineHeight: 1.55, color: 'var(--muted, #5a6a86)', textWrap: 'pretty' }}>
            {'Um erro inesperado interrompeu a exibição desta tela. Tente de novo; se o problema '}
            {'continuar, recomece do zero — isso apaga as preferências salvas neste navegador e '}
            {'recarrega o terminal.'}
          </p>
          <details style={{ marginTop: '12px' }}>
            <summary style={{ fontSize: '11px', color: 'var(--muted-2, var(--muted-2))', cursor: 'pointer' }}>{'Detalhe técnico'}</summary>
            <pre style={{ margin: '8px 0 0', padding: '10px', background: 'var(--surface-2, #f4f6fa)', borderRadius: '9px', fontSize: '10.5px', color: 'var(--muted, #5a6a86)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{detalhe}</pre>
          </details>
          <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
            <button
              onClick={() => this.setState({ erro: null })}
              style={{ ...BOTAO, background: 'var(--brand, #0f1f38)', color: '#fff' }}
            >
              {'Tentar de novo'}
            </button>
            <button
              onClick={() => { limparEstadoLocal(); window.location.reload() }}
              style={{ ...BOTAO, background: 'transparent', color: 'var(--ink, #0f1f38)', border: '1px solid var(--line-2, #d5dce8)' }}
            >
              {'Recomeçar do zero'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
