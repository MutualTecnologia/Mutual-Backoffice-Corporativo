'use client'

/**
 * Modal — véu, cartão centrado e cabeçalho com o ×.
 *
 * O trio "backdrop fixo + `translate(-50%,-50%)` + título com botão de
 * fechar" estava copiado em cada tela que abre um modal — só os Boletos
 * tinham quatro. Copiar o esqueleto era copiar também o que faltava nele:
 * nenhuma das cópias fechava com Escape nem se declarava `role="dialog"`.
 * Aqui os dois vêm de graça para todas.
 *
 * O corpo é livre: formulário, confirmação, documento. O que variar de
 * verdade — largura, rolagem, véu mais escuro — entra por `largura`, `style`
 * e `veu`; o que não deve variar não tem por onde variar.
 */
import { useEffect } from 'react'
import { CARD } from '../ui/tokens.js'

export default function Modal({
  onFechar,
  titulo,
  /** Cabeçalho grudado no topo, para corpo com rolagem própria. */
  fixo,
  largura = 'min(92vw,440px)',
  /** Ajustes do cartão: maxHeight, overflow, padding, textAlign… */
  style,
  /** Véu e camada. O documento do boleto usa véu mais escuro, uma camada acima. */
  veu = 'rgba(15,31,56,.35)',
  z = 80,
  children,
}) {
  useEffect(() => {
    if (!onFechar) return undefined
    const aoTeclar = (e) => { if (e.key === 'Escape') onFechar() }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [onFechar])

  return (
    <>
      <div onClick={onFechar} style={{ position: 'fixed', inset: '0', background: veu, zIndex: String(z) }} />
      <div
        role="dialog"
        aria-modal="true"
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: String(z + 1), width: largura, ...CARD, ...style }}
      >
        {titulo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', borderBottom: '1px solid var(--line)', ...(fixo ? { position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 1 } : null) }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)' }}>{titulo}</span>
            <button type="button" onClick={onFechar} aria-label="Fechar" style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: '18px', color: 'var(--muted-2)', cursor: 'pointer', lineHeight: '1' }}>{'×'}</button>
          </div>
        ) : null}
        {children}
      </div>
    </>
  )
}
