/**
 * Roda todas as asserções e devolve o pior resultado.
 *
 * Cada verificação é um processo à parte: uma que estoure não pode impedir as
 * outras de rodar, e o relatório precisa listar todas as falhas de uma vez —
 * corrigir uma por execução de CI é caro.
 */
import { spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const scripts = readdirSync(aqui)
  .filter((f) => f.endsWith('.mjs') && f !== 'todas.mjs')
  .sort()

let falhou = false
for (const script of scripts) {
  const r = spawnSync(process.execPath, [join(aqui, script)], { stdio: 'inherit' })
  if (r.status !== 0) falhou = true
}

process.exit(falhou ? 1 : 0)
