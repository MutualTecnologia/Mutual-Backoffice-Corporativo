/**
 * A rota que atende todas as telas declaradas.
 *
 * ⛔ Uma rota-coringa em vez de 51 arquivos, e a razão não é economia de
 * digitação: com um arquivo por tela, um item novo na navegação vira link para
 * 404 até alguém lembrar de criar o arquivo — e é sempre o item recém-entrado,
 * o que ninguém testou. Aqui a navegação é a fonte, e `generateStaticParams` a
 * lê: item declarado é página gerada, sem passo manual entre os dois.
 *
 * ⚠️ `dynamicParams = false` é o que fecha o outro lado. Sem ele, um caminho
 * que NÃO está na navegação renderizaria a mesma tela genérica com dados
 * inventados — uma tela que existe sem estar declarada é pior que um 404,
 * porque parece parte do produto.
 */
import { notFound } from 'next/navigation'

import Tela from '../../components/Tela.jsx'
import { acharPorHref, todasAsRotas } from '../../logic/navigation.js'

export const dynamicParams = false

export function generateStaticParams() {
  return todasAsRotas().map((href) => ({ slug: href.replace(/^\//, '').split('/') }))
}

/**
 * `params` é Promise a partir do Next 15 — ler `params.slug` direto compila,
 * roda e imprime um erro por requisição, com o valor chegando `undefined` na
 * primeira leitura. É a classe de defeito que passa no build e falha na tela.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params
  const achado = acharPorHref('/' + (slug || []).join('/'))
  return { title: achado ? `${achado.item.label} — Mutual` : 'Mutual' }
}

export default async function Page({ params }) {
  const { slug } = await params
  const achado = acharPorHref('/' + (slug || []).join('/'))
  if (!achado) notFound()
  return <Tela esteira={achado.esteira} grupo={achado.grupo} item={achado.item} />
}
