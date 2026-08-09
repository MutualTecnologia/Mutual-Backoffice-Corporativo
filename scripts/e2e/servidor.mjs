/**
 * Serve o `out/` como o GitHub Pages serve — e não como um servidor genérico.
 *
 * ⚠️ Duas regras do Pages precisam ser reproduzidas aqui, senão o teste passa
 * contra um comportamento que a publicação não tem:
 *
 *  1. **Diretório resolve para `index.html`.** `next.config.mjs` liga
 *     `trailingSlash: true` justamente porque o Pages serve diretório; um
 *     servidor que devolvesse 404 em `/otc/mesa/` reprovaria o app inteiro por
 *     defeito do próprio servidor.
 *  2. **404 é 404.** Devolver o `index.html` para qualquer caminho — o atalho
 *     comum de servidor de SPA — faria uma rota inexistente parecer viva. É
 *     exatamente o que a suíte precisa distinguir: `dynamicParams = false`
 *     existe para que caminho não declarado NÃO renderize tela.
 *
 * ⛔ Zero dependência: `node:http` e `node:fs`. Um servidor de teste que exige
 * instalar pacote é mais uma coisa que pode faltar no CI no dia em que o
 * registry estiver fora.
 */
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

/**
 * @param {string} raiz diretório a servir (o `out/`)
 * @returns {Promise<{url: string, fechar: () => Promise<void>}>}
 */
export function servir(raiz) {
  const servidor = createServer((req, res) => {
    const caminho = decodeURIComponent((req.url || '/').split('?')[0])

    // ⛔ `normalize` antes de juntar: sem isto, `/../../etc/passwd` sai da raiz.
    // O servidor é de teste e roda em CI, mas travessia de diretório não tem
    // versão inofensiva — e este é o tipo de guarda que o CodeQL do outro
    // repositório pegou justamente por ninguém ter pensado nela.
    const relativo = normalize(caminho).replace(/^(\.\.[/\\])+/, '')
    let arquivo = join(raiz, relativo)

    if (existsSync(arquivo) && statSync(arquivo).isDirectory()) {
      arquivo = join(arquivo, 'index.html')
    }

    if (!arquivo.startsWith(raiz) || !existsSync(arquivo)) {
      const err = join(raiz, '404.html')
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
      if (existsSync(err)) createReadStream(err).pipe(res)
      else res.end('404')
      return
    }

    res.writeHead(200, { 'content-type': TIPOS[extname(arquivo)] || 'application/octet-stream' })
    createReadStream(arquivo).pipe(res)
  })

  return new Promise((resolve) => {
    // Porta 0: o sistema escolhe uma livre. Porta fixa transforma duas
    // execuções simultâneas — ou um dev server esquecido em 3002 — em falha
    // que não tem nada a ver com o código.
    servidor.listen(0, '127.0.0.1', () => {
      const { port } = servidor.address()
      resolve({
        url: `http://127.0.0.1:${port}`,
        fechar: () => new Promise((r) => servidor.close(r)),
      })
    })
  })
}
