'use client'

/**
 * A tela genérica das quatro esteiras.
 *
 * ⛔ O que ela NÃO é: uma tela pronta. Cada uma das 51 rotas declaradas em
 * `logic/navigation.js` tem conteúdo próprio a construir, e o inventário disso
 * é o trabalho seguinte. O que esta peça resolve é outra coisa — que **toda
 * rota declarada abra**, com o cabeçalho certo, o item certo aceso no menu e a
 * qualificação obrigatória onde ela é obrigatória.
 *
 * ⚠️ A razão de existir uma tela genérica em vez de 51 placeholders: o dia em
 * que um item entrar na navegação, ele abre. Placeholder por arquivo produz o
 * item de menu que leva ao 404 — e é sempre o item novo, o que ninguém testou.
 *
 * Regra 0 (§0 da memória institucional): a Mutual observa, concilia e comprova;
 * **não custodia**. Toda tela da esteira de Controle repete a qualificação onde
 * exibe posição — e aqui ela sai de `navigation.js`, não de texto colado.
 */
import { Card, Grid, Note, Row, Badge } from './ui/kit.jsx'
import { CASAS_CRIPTO_MIN, CASAS_FIAT, brl, cripto, numero, pct } from '../lib/valor.js'
import { PENDENCIAS } from '../logic/renderVals.js'

/**
 * Números simulados, derivados do endereço da tela.
 *
 * ⚠️ Derivados, e não sorteados: `Math.random()` daria um valor novo a cada
 * render, e a mesma tela mostraria KPI diferente ao voltar nela. Um número que
 * muda sozinho é o defeito que o `demo-pulso` da TopBar existe para tornar
 * visível — não pode acontecer sem aviso.
 */
function semente(texto) {
  let h = 0
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) % 100000
  return h
}

export default function Tela({ esteira, grupo, item }) {
  const s = semente(item.href)
  const volume = 120000 + (s % 900000) + (s % 97) / 100
  const taxa = 0.4 + (s % 260) / 100
  const posicao = 0.05 + (s % 90) / 1000
  const pendentes = PENDENCIAS[item.href] || 0

  return (
    <div style={{ padding: '22px 28px 40px', display: 'grid', gap: '16px' }} className="r-pad">
      {/* A qualificação da Regra 0 vem antes de qualquer número da esteira de
          Controle. Depois do número, ela vira nota de rodapé de uma afirmação
          que o olho já leu como posição própria. */}
      {esteira.id === 'controle' ? (
        <Note tone="warn">
          <strong style={{ fontWeight: 500 }}>A Mutual não custodia.</strong> Posição, liquidez e
          conciliação desta tela descrevem contas e carteiras mantidas em instituições licenciadas
          parceiras. A Mutual observa, concilia e comprova.
        </Note>
      ) : null}

      <Card
        title={item.label}
        sub={esteira.nota}
        action={
          <span style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* ⛔ A prioridade vem do catálogo e é o que ordena a fila de
                construção. Sem ela na tela, toda tela parece igualmente
                urgente — e P0 e P2 deixam de se distinguir onde a decisão de
                o que fazer primeiro é tomada. */}
            {item.p ? (
              <Badge
                label={item.p}
                color={item.p === 'P0' ? 'var(--acc-red-ink)' : 'var(--muted-2)'}
              />
            ) : null}
            {pendentes ? (
              <Badge label={`${pendentes} na fila`} color="var(--status-warning)" />
            ) : (
              <Badge label="Sem pendência" color="var(--status-success)" />
            )}
          </span>
        }
      >
        <Grid>
          <Bloco rotulo="Volume no dia" valor={brl(volume)} nota={`FIAT · ${CASAS_FIAT} casas`} />
          <Bloco rotulo="Taxa média" valor={pct(taxa, 2)} nota="Sobre o valor liquidado" />
          <Bloco
            rotulo="Posição cripto"
            valor={cripto(posicao) + ' BTC'}
            nota={`Cripto · ${CASAS_CRIPTO_MIN} casas`}
          />
          <Bloco
            rotulo="Itens no período"
            valor={numero(340 + (s % 4200), 0)}
            nota="Contagem, sem casa decimal"
          />
        </Grid>
      </Card>

      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))' }}>
        <Card title="Onde esta tela vive" sub="Derivado de logic/navigation.js">
          <Row k="Esteira" v={esteira.label} mono={false} />
          <Row k="Grupo" v={grupo.label || '—'} mono={false} />
          <Row k="Rota" v={item.href} />
          {/* A coordenada no catálogo é o que liga esta tela ao documento que a
              nomeou. Item sem `cat` vem da IA do protótipo e não tem entrada
              própria lá — informação, não defeito. */}
          <Row
            k="Catálogo"
            v={item.cat ? `MTC-UX-2026-010 §${item.cat}` : 'sem entrada própria'}
            mono={false}
            color={item.cat ? undefined : 'var(--muted-2)'}
          />
          <Row k="Fonte do dado" v="Simulado" mono={false} color="var(--status-warning)" />
        </Card>

        <Card title="O que falta aqui" sub="Declarado, não escondido">
          <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: 'var(--muted)', textWrap: 'pretty' }}>
            Esta rota abre, acende o item certo no menu e respeita a precisão do
            <code style={{ fontSize: '11.5px' }}> lib/valor.js</code>. O conteúdo próprio — tabela,
            filtros, ações e maker-checker — é o trabalho da fase seguinte.
          </p>
          <Note>
            Nenhum número desta tela vem de sistema real, e nenhuma ação envia nada para lugar
            nenhum.
          </Note>
        </Card>
      </div>
    </div>
  )
}

function Bloco({ rotulo, valor, nota }) {
  return (
    <div>
      <div style={{ fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
        {rotulo}
      </div>
      <div className="num" style={{ fontSize: '20px', fontWeight: '500', color: 'var(--ink)', marginTop: '4px' }}>
        {valor}
      </div>
      <div style={{ fontSize: '10.5px', color: 'var(--muted-2)', marginTop: '2px' }}>{nota}</div>
    </div>
  )
}
