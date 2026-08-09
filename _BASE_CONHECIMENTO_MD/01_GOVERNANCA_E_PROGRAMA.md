---
titulo: "Governança e Programa — Mutual Onboarding Corporativo"
fontes:
  - "ONB-GOV-001_START_HERE_E_GOVERNANCA_v1.0 (CANONICAL)"
  - "ONB-GOV-002_INVENTARIO_CANONICO_E_PLANO_RECONCILIACAO_DOCUMENTAL_v1.0 (CANONICAL_EXECUTION_EVIDENCE)"
  - "ONB-GOV-004_BASELINE_DOCUMENTAL_CONGELADA_v1.1 (CANONICAL / DOCUMENTATION_FREEZE)"
  - "ONB-PRD-001_ANALISE_TRANSVERSAL_30_HABILIDADES_E_PRONTIDAO_PRODUTO_v1.0 (CANONICAL_EXECUTION_SUPPORT)"
status_fonte: CANONICAL
gerado_em: 2026-08-09
---

# Governança e Programa — Mutual Onboarding Corporativo

## 1. Objetivo do programa

Executar o Mutual Onboarding como **produto independente, multi-tenant, multicanal e white-label**, com lifecycle completo de identidade, documentos, KYC/KYB, UBO/representantes, risco, AML, decisão, evidência, revalidação e handoff. O produto deve ser rastreável, auditável, seguro, explicável, multiprovider, versionado e homologável.

O Mutual Onboarding é um produto de infraestrutura corporativa de identidade, entidade, relacionamento, evidência, verificação, risco, requisitos, policy, case, decisão, monitoramento e handoff (cadeia: Identity → Entity → Relationship → Evidence → Verification → Risk → Requirement → Policy → Case → Decision → Monitoring → Handoff).

## 2. Raiz canônica e repositório de implementação

- A pasta **"Mutual Onboarding"** é a única raiz documental autorizada para artefatos canônicos deste projeto. A subpasta **00_EXECUCAO_CANONICA** concentra os artefatos vivos de execução. Documentos encontrados fora dessa árvore podem ser usados como fonte, mas **não se tornam CANONICAL automaticamente**.
- O repositório GitHub **Mutual-Processadora-de-Pagamentos/onboarding-corporativo** é o **único repositório autorizado** para implementação técnica do produto. Todo código-fonte, schema, migration, contrato técnico, teste automatizado, pipeline CI/CD, configuração de build/deploy, ADR técnico executável e evidência técnica versionável deve residir nele. É **vedado** manter implementação concorrente, fork operacional ou fonte alternativa de código em outro repositório.
- A pasta Drive Mutual Onboarding permanece a única raiz de governança e documentação executiva do programa; ela referencia commits, PRs, releases e evidências do GitHub, mas não substitui o histórico Git/CI nem hospeda código concorrente.

Identificadores das raízes (fonte: ONB-GOV-002):

| Recurso | Identificador |
|---|---|
| Raiz Drive "Mutual Onboarding" | `1wuhyGKbvytazP1bLefyWuNwjbNaGc4hg` |
| Árvore de execução "00_EXECUCAO_CANONICA" | `1mzQx3ZTGfD5F1eQSRQBAWacrqQ-0Oo6J` |
| Repositório GitHub exclusivo | `Mutual-Processadora-de-Pagamentos/onboarding-corporativo` (privado, branch padrão `main`) |

## 3. Fronteira de domínio

Onboarding é **separado do Backoffice Financeiro Corporativo**. Integrações com Backoffice, CRM, Terminal, Support, KYT/Travel Rule e demais produtos ocorrem por **contratos, IDs e eventos/APIs versionados**. **Aprovação de onboarding não significa autorização automática para execução financeira.**

## 4. Fontes de verdade e hierarquia

- Documentação define requisito/decisão. Código, banco, CI, ambiente e testes fornecem **evidência de implementação**.
- **Provider externo nunca é fonte única da verdade do case.**
- **Frontend nunca é autoridade final do estado.**

### 4.1 Hierarquia de fontes (ONB-GOV-002 §3)

| Fonte | Papel |
|---|---|
| Google Drive | Fonte canônica de conhecimento, produto, governança, decisões, requirements, capabilities, UX, arquitetura alvo, compliance, QA, registries e evidências executivas |
| GitHub | Única fonte de verdade da implementação técnica: código, schemas, migrations, APIs, eventos implementados, adapters, testes, fixtures, scripts, CI/CD e histórico Git |

**Regra de reconciliação:** documentação define o contrato desejado/canônico; GitHub prova o estado implementado. Divergência não será escondida: será registrada como FINDING/GAP e classificada REAL, PARTIAL, UI_ONLY, PROTOTYPE, ABSENT ou NOT_EVIDENCED conforme o caso.

### 4.2 Mapa de autoridade documental (ONB-GOV-001 §14)

A autoridade documental segue esta ordem, sem fonte concorrente:

1. Decisão explícita do **Program Owner**;
2. **ONB-REG-001** para status vivo, IDs, registries, classificação e evidências;
3. Documento canônico especializado do domínio;
4. **ADR CANONICAL** aplicável;
5. GitHub/CI/ambiente **somente como evidência** de implementação técnica;
6. Documentos PROPOSED/REVIEW_REQUIRED como insumo, **nunca** como autoridade final.

O benchmark v1.1 (**SRC-001**) é a fonte canônica de planejamento. O **ONB-REG-001 (SRC-006)** é o control plane canônico. Documentos especializados não podem contradizer esses dois sem registrar ADR, gap ou supersessão.

## 5. Classificações obrigatórias

### 5.1 Classificação documental (DocumentaryClassification)

`CANONICAL`, `PROPOSED`, `TO_FORMALIZE`, `REVIEW_REQUIRED`, `MOCK`, `PROTOTYPE`, `PARTIAL`, `LEGACY`, `SUPERSEDED`, `NOT_EVIDENCED`.

Nenhuma recomendação deve ser promovida para CANONICAL sem decisão ou evidência compatível.

### 5.2 Estado técnico (TechnicalState)

O estado técnico deve ser classificado **separadamente** do documental como: `REAL`, `PARTIAL`, `UI_ONLY`, `PROTOTYPE`, `MOCK`, `ABSENT` ou `NOT_EVIDENCED`.

Uma especificação CANONICAL **não prova implementação**. Build verde, tela navegável ou commit **não equivalem** a homologação ou produção.

## 6. Ciclo de execução (ExecutionState)

```
DISCOVERED → SPECIFIED → READY → IN_PROGRESS → CODE_COMPLETE → INTEGRATED → QA → UAT → READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED
```

Estados auxiliares: `BLOCKED`, `CANCELLED`, `READY_WITH_RESTRICTION`.

**CODE_COMPLETE != DONE.**

Regras permanentes (legenda operacional): documentação pronta não equivale a implementação pronta; implementação pronta não equivale a QA pronta; QA pronta não equivale a UAT; UAT não equivale a release; release não equivale a produção verificada.

## 7. Definition of Ready

Elementos obrigatórios antes de execução: Capability ID; Task ID; fonte/requirement; prioridade; owner role; dependências; contrato/modelo de dados; regras/state; permissões; acceptance criteria; plano de testes; controles de segurança; evidência esperada; gate e autorização.

## 8. Registro mestre (ONB-REG-001)

O arquivo **ONB-REG-001_REGISTRO_MESTRE_DE_EXECUCAO_v0.1** é a fonte operacional dos registries de: requirements, capabilities, adjacent capabilities, screens, gaps, risks, findings/blockers, providers, ADRs, waves/tasks, gates, evidence, segments, packs, handoffs, applicability, inventário de código, traceability D2 e modelo semântico vivo (**SEMANTIC_REGISTRY**).

## 9. Regra de telas

O baseline possui **80 funções de tela** distribuídas em **quatro superfícies**: Jornada, Analista, Admin/Developer e Console Mutual. Função de tela **não** significa obrigatoriamente URL única. Cada ID precisa de route/view, estados, permissões, dados, acceptance criteria, testes e evidência antes da homologação.

## 10. Regra de providers

- Fluxos e políticas chamam **capabilities, nunca marcas**.
- Respostas externas devem ser normalizadas em **EvidenceEnvelope**.
- Roteamento considera tenant, jurisdição, região, qualidade, custo, disponibilidade, contrato e **economic_group**.
- **Fallback nunca pode significar aprovação sem evidência.**

## 11. CAP-22 — HFS / Mutual Intelligence

É **ativo proprietário da Mutual** e capability interna. **Não entra em procurement** como fornecedor externo. Deve possuir contrato interno de entrada/saída, governança de modelo, versionamento, lineage, validação, observabilidade, kill switch e degraded mode. Metodologia, features, pesos e limiares proprietários **não devem vazar** para APIs públicas.

## 12. Execução atual (data-base 2026-08-09)

- O ciclo **Documentary Assurance** está concluído e congelado na baseline ativa **SRC-050 / ONB-GOV-004_BASELINE_DOCUMENTAL_CONGELADA_v1.1**, com **EVD-ONB-022 PASS** e **DG-01 = DOCUMENTATION_READY_FOR_IMPLEMENTATION**.
- Isso **não autoriza implementação**: **EVD-ONB-021** mantém **nenhuma CAP-01..22 READY**; **CAP-19** é a primeira candidata, mas segue **NOT READY/BLOCKED** por IAM/SoD/tenant/hardening.
- **ADR-034** continua vigente: GitHub **consultation-only / no-write / no-execution** até autorização explícita posterior do Program Owner.

## 13. Regra de evidência

Evidência **nasce durante a execução**. Não criar Evidence ID para artefato inexistente. Release exige evidências reais de testes, segurança, integração, UAT e decisão de gate.

Nenhum documento poderá usar "implementado", "resolvido", "homologado", "PASS", "DONE" ou "produção" sem evidência correspondente. Exemplos de evidência técnica aceitável:

- repository + path + commit_sha;
- migration ID;
- API/schema version;
- test ID + resultado;
- CI workflow/run ID;
- artifact/release ID;
- screenshot/response de ambiente quando aplicável;
- audit event/event_id/correlation_id quando existir operacionalmente;
- evidence bundle exportável.

Para item ainda não implementado, registrar **EVIDENCE_EXPECTED**; **nunca fabricar evidência**. EVIDENCE_EXPECTED nunca equivale a EVIDENCE_OBSERVED.

## 14. Golden Thread obrigatória

Toda matéria relevante deve poder ser rastreada, conforme aplicabilidade, por:

```
Norma/Decisão/Source → Requirement → Capability → Policy/Rule → Screen/API/Event/Data → Provider/Internal Capability → Task → Test → Evidence → Gate → Release → Production Verification
```

**Nenhum elo ausente será inferido silenciosamente.** Ausência gera GAP, FINDING, BLOCKER ou EVIDENCE_EXPECTED conforme a natureza.

Para cada elemento da golden thread deverão existir, quando aplicável (ONB-GOV-002 §8): ID estável; versão; classificação documental; estado técnico (REAL/PARTIAL/UI_ONLY/PROTOTYPE/ABSENT/NOT_EVIDENCED); owner role; source IDs; dependências; critérios de aceite; teste esperado/existente; security/privacy controls; evidence expected/evidence observed; gap/finding/blocker associado; gate afetado.

## 15. Status, eventos e auditoria

- Status e eventos materiais são **contratos versionados**. Todo status de domínio deve possuir ID estável, owner, transições legais, evento associado e classificação de exposição.
- Todo evento deve possuir taxonomia, schema/envelope, versionamento, actor/tenant/correlation/causation/trace quando aplicável e controles de idempotência, outbox, delivery log, retry/DLQ/replay.
- A trilha de auditoria deve ser **append-only/tamper-evident**, correlacionável e reproduzível.
- Exportações são **projeções controladas** da mesma fonte de eventos/evidências, nunca uma trilha paralela montada manualmente.

## 16. Compliance-by-Design e Regulatory Packs

O produto deve permitir **cumprir, demonstrar e auditar** obrigações regulatórias aplicáveis por tenant, entidade, produto, segmento e jurisdição. **Regras regulatórias não ficam hardcoded nas telas.** A composição alvo é:

```
RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy
```

Quando aplicável, o produto deve gerar reportes/arquivos regulatórios em layout oficial vigente, incluindo **CCS/ACCS**, mantendo versionamento, reconciliação, ocorrências, correção/reenvio e evidence bundle.

## 17. Exportação de evidências

A plataforma e a governança devem suportar, conforme autorização e caso de uso, exportação em: **CSV, XLSX, JSON/JSONL, PDF/dossiê, evidence bundle estruturado com manifest/hashes e formatos regulatórios específicos** (incluindo CCS/ACCS quando aplicável). PII deve respeitar minimização, masking, classificação, access control, retention e data residency. A exportação não substitui a trilha canônica: é projeção reproduzível da mesma fonte de eventos/evidências.

## 18. Regra de retomada do desenvolvimento

O código só poderá ser retomado após:

1. **D2 Cross-review PASS**;
2. **D3 Documentation Freeze**;
3. **DG-01 PASS**;
4. Atualização dos gaps/ADRs;
5. **Novo readiness** que determine capability READY ou READY_WITH_RESTRICTION autorizada.

Além desses gates, qualquer write ou execução no GitHub exige **revogação/autorização explícita do ADR-034 pelo Program Owner**. GitHub continua sendo a única fonte de verdade do código; Drive continua sendo a base canônica de conhecimento e governança.

## 19. Invariante absoluto — Tenant, Canal e White-label

- **Tenant e Canal são dimensões distintas de primeira classe.** Não existe relação 1:1 obrigatória entre elas.
- O produto deve suportar associação independente ou hierárquica/configurada e versionada entre tenant, canal, marca/domínio e jornada.
- **Nenhuma camada pode inferir tenant somente pelo canal nem canal somente pelo tenant.**
- Toda capability, tela, API, webhook, sessão, evento, evidência, trilha, observabilidade, permissão e integração deve avaliar, quando aplicável, `tenant_id`/contexto de tenant e `channel_id`/contexto de canal **separadamente**, preservando correlation e **fail-closed**.
- **White-label** é configuração de marca, tema, domínio, conteúdo permitido e experiência; **nunca altera semântica** de risco, compliance, autorização, evidência, auditoria ou regra de domínio e **não justifica fork estrutural** por cliente/canal.
- Na D2, ausência de prova em qualquer um dos três eixos deve permanecer PARTIAL, NOT_EVIDENCED ou GAP.

Referências canônicas: **REQ-ONB-069, ADR-023 e CAP-19**.

## 20. Capacidades econômicas adjacentes e fronteira financeira (ADJ-01..ADJ-08)

O cânone reconhece **ADJ-01..ADJ-08** como capacidades adjacentes relevantes ao ecossistema. Elas **não são CAP-23..30 do Onboarding**:

| ID | Capacidade adjacente |
|---|---|
| ADJ-01 | Split Payment |
| ADJ-02 | Afiliados |
| ADJ-03 | Indicações/Referral |
| ADJ-04 | Comissões |
| ADJ-05 | Remunerações |
| ADJ-06 | Revenue/Fee Share |
| ADJ-07 | Campanhas/Incentivos |
| ADJ-08 | Settlement de Parceiros |

> Nota: a fonte (ONB-GOV-001 §23) lista as oito capacidades nessa ordem sem numeração individual explícita; a correspondência ADJ-01..08 acima segue a ordem de citação.

**Contrato do Onboarding no domínio adjacente:** conhecer e verificar o participante/beneficiário, modelar relacionamento/papel econômico, preservar referral/correlation e contract references quando aplicável, decidir eligibility/restrictions, manter evidence/audit, revalidar e realizar handoff versionado.

**O Onboarding NÃO:** calcula split, fee share, revenue share, comissão/remuneração; não mantém payable/saldo; não liquida valores.

**Authorities downstream:**
- **Partner/Commercial** — authority dos programas comerciais, attribution, campanhas e regras comerciais.
- **Payments/Ledger/Settlement/Finance** — authorities de cálculo, lançamento, reversão, chargeback/MED quando aplicável, payable, saldos, reconciliação e settlement.

**Separação semântica absoluta:** split do pagamento ≠ fee split ≠ revenue share ≠ comissão/remuneração. Aprovação de onboarding **nunca** significa autorização financeira.

Referências: **SRC-047, ADR-024, REQ-ONB-070..075, HOF-007..010** e aba `ADJACENT_CAPABILITIES` do ONB-REG-001.

## 21. Invariante absoluta — Conditional-by-Design

- **Aplicabilidade não é implícita nem universal.** Todo requisito, capability, função de tela, declaração, provider/fonte, evento, reporte, integração, handoff, pack ou controle relevante deve declarar se é **CORE_MANDATORY** ou possuir **condição versionada de aplicação**.
- Resultados permitidos (ApplicabilityState): `CONDITIONAL`, `APPLICABLE`, `NOT_APPLICABLE`, `PROHIBITED`, `REVIEW_REQUIRED` (além de `CORE_MANDATORY` como modo declarado), conforme contexto e autoridade da decisão.
- A decisão de aplicabilidade deve ser **server-authoritative, reproduzível e auditável**. Deve considerar, conforme o caso: `tenant_id`, `channel_id` (de forma independente), entidade/subject/relationship role, jurisdição, `regulatory_profile`, produto, segmento, lifecycle/status, risco, packs, contratos/configurações, capability habilitada, provider eligibility/health, data region/privacy regime e vigência da regra.
- Frontend pode renderizar a decisão, mas **nunca ser sua autoridade**.
- Quando a decisão for dinâmica, preservar: `rule_id`, `rule_version`, `effective_at`, `input_context` suficiente, resultado, `reason_codes`, decision authority, `correlation_id` e `evidence_refs`.
- A aba **APPLICABILITY** do ONB-REG-001 é o registry vivo dessa governança (inicialmente com **APP-001..011**). Cada regra deve declarar: entidade-alvo, modo de aplicabilidade, condição de ativação, condição de não aplicação/desativação, autoridade decisória, inputs de contexto, referência de regra/pack, versão, vigência, evidência esperada, requisito de audit/event, gate e status.

Referências: **REQ-ONB-076 e ADR-025**.

## 22. Documentary Assurance — Roteiro D0.1 a D4

A revisão documental do Mutual Onboarding usa o roteiro D0.1–D4, **sem reiniciar trabalho já concluído** — o trabalho existente é mapeado e evidenciado dentro da estrutura nova (rebase decidido pelo Program Owner em 2026-08-09; o histórico D0–D6 anterior permanece preservado como patrimônio e evidência de execução).

| Fase | Nome | Definição | Estado de mapeamento (ONB-GOV-002 §23) |
|---|---|---|---|
| D0.1 | Freeze e Inventário | Congelar desenvolvimento e inventariar fontes, Drive, GitHub, SHA, PRs, CI e registries | Atendido principalmente por EVD-ONB-001 |
| D0.2 | Classificação | Classificar autoridade documental, relação entre versões/fontes e estado técnico separadamente | Atendido em larga parte por D1/EVD-ONB-002..006; pendências registradas |
| D0.3 | Canonicalização | Eliminar autoridade concorrente, preservar File IDs e histórico, formalizar sucessão/supersession | Atendido em larga parte por ADR-019..022 e EVD-ONB-002..006 |
| D0.4 | Reconciliação interna | Documento x documento: conflitos, overlaps e vocabulário divergente | Executada durante D1, com cross-check explícito antes do gate documental |
| D0.5 | Reconciliação com realidade técnica | Especificação canônica x GitHub/CI/ambiente em modo read-only, sem alterar código | Em andamento por TASK-W0-020, EVD-ONB-007..008 e TRACEABILITY_D2 |
| D0.6 | Normalização semântica | Termos, entidades, relacionamentos, applicability, status, eventos, reason codes, ownership e boundaries (inclui Conditional-by-Design, tenant/canal independentes, white-label) | — |
| D0.7 | Rastreabilidade | Completar a golden thread ponta a ponta | — |
| D0.8 | Audit & Evidence Architecture | Evidence expected/observed, lineage, integrity, retention, reconciliation e exports | — |
| D0.9 | Gap/Decision Closure | Nenhum gap, conflito ou blocker relevante sem disposition, owner role, evidence expected e gate | — |
| D0.10 | Checkpoint Documental | DG-00 avalia prontidão para entrar em D1; DG-01 permanece o gate final após D1+D2+D3 | — |
| D1 | Blueprint Completion | Produzir somente o que D0.10 provar que falta | Concluído (EVD-ONB-018) |
| D2 | Cross-review Final | Reler o corpus como revisão independente e detectar drift introduzido durante a própria reconciliação | Concluído (EVD-ONB-019) |
| D3 | Documentation Freeze | Emitir baseline documental versionada, manifestável e reproduzível | Concluído (baseline v1.1 / SRC-050) |
| D4 | Código | Somente após DOCUMENTATION_READY_FOR_IMPLEMENTATION e novo readiness; executar capability/task autorizada, nunca por simples existência documental | Bloqueado por ADR-034 e ausência de capability READY |

**Gate DG-01 — DOCUMENTATION_READY_FOR_IMPLEMENTATION:** significa documentação suficientemente completa, convergente, classificada, rastreável e auditável para engenharia retomar. **Não significa** produto homologado, release-ready ou produção. DG-01 somente pode ser aprovado quando a aplicabilidade estiver suficientemente mapeada e 100% dos itens relevantes possuírem classificação e destino rastreáveis.

**D2 Cross-review:** relê Drive, registries e, quando necessário, evidência já existente do GitHub em consulta-only para detectar drift, autoridade concorrente, colisão de IDs, inconsistência semântica, gaps sem disposição, rastreabilidade quebrada ou claims sem Evidence Observed. Divergência gera finding/gap/ADR; **nunca se muta GitHub para fazer o corpus coincidir**. D2 pode corrigir drift documental no Drive, mas não pode alterar, executar ou disparar nada no GitHub. D2 PASS não equivale a DG-01.

## 23. Fechamento do D1 Blueprint Completion

O D1 Blueprint Completion foi concluído em **2026-08-09** por **EVD-ONB-018**. O corpus possui autoridade explícita para: governança, **REQ-ONB-001..077**, **CAP-01..22**, **80 Screen IDs**, UX, arquitetura, status/eventos, evidence/audit, compliance/regulatório, internacionalização, providers, CAP-22, segmentos/packs, **HOF-001..010**, release/evidence, **NATURES_BR** e migrations.

- **ADR-030** garante zero duplicidade ativa de autoridade;
- **ADR-032** fecha a taxonomia BR (correspondente bancário como 9ª natureza regulada; residual: somente H-14 UAT em **GAP-ONB-003**);
- **ADR-033** fecha a decisão de migrations (forward-only, histórico imutável, prefixos futuros únicos/monotônicos), preservando gaps técnicos separados (**GAP-ONB-024** = enforcement automático em CI).

Itens que continuam PROPOSED, REVIEW_REQUIRED, TO_FORMALIZE ou NOT_EVIDENCED permanecem assim **deliberadamente** por natureza da entrada, não por ausência de revisão. Exemplos: SRC-003 é descoberta de mercado; SRC-008 v0.4 permanece REVIEW_REQUIRED até o fechamento documental; fatos de provider exigem due diligence corrente; HOF-001..010 são definições conceituais CANONICAL mas seus contratos executáveis continuam NOT_EVIDENCED/TO_FORMALIZE; normas na Regulatory Matrix mantêm status jurídico por linha.

## 24. Autoridade única e zero duplicidade ativa (ADR-030)

Cada conceito/domínio possui **uma única autoridade canônica ativa**. Índices, apêndices, registries vivos e especificações detalhadas só coexistem quando a relação master → suplemento/especialização é explícita e não existe concorrência semântica. Códigos documentais ativos não podem colidir.

- Colisão ONB-UX-001 removida preservando File IDs: **SRC-025** permanece ONB-UX-001_BLUEPRINT_COMPLETO_FRONTEND_E_EXPERIENCIA_v1.0 e **SRC-011** passa a ONB-UX-006_PADRAO_DE_ESPECIFICACAO_DAS_TELAS_v1.0.
- Colisão ONB-QA-004 saneada: **SRC-043** permanece ONB-QA-004_GATES_HOMOLOGACAO_REGULATORIA_CCS_E_AUDITORIA_v1.0; **SRC-057** passa a ONB-QA-006_PACOTE_INTEGRADO_READINESS_GATE_CAP19_W1_007_G1_v1.0 (mesmo File ID e histórico).
- **SRC-044** renomeado para ONB-ARQ-004A_APENDICE_STATUS_EVENT_REGISTRY_DETALHADO_v1.0.md — apêndice explicitamente subordinado ao master **SRC-045**.
- Artefatos substituídos são classificados **SUPERSEDED** e movidos para `99_HISTORICO_E_SUPERSEDED`, preservando File ID e histórico. **Nunca deletar patrimônio apenas para limpeza.**
- Distribuições ativas: **SRC-034** = skill exportável; **SRC-035** = pacote repository-ready Claude Code; **SRC-036** = instruções do projeto Claude (coexistem por função distinta). **SRC-022, SRC-023 e SRC-033** são históricos SUPERSEDED.
- **SRC-045** é o master de status/eventos; **SRC-044** é seu apêndice detalhado explicitamente subordinado.

## 25. Organização física vigente e legenda operacional

- A raiz `00_EXECUCAO_CANONICA` deve conter somente as pastas temáticas canônicas do programa, **sem arquivos soltos**. O documento mestre SRC-001 permanece fisicamente em `00_START_HERE_E_GOVERNANCA`. A referência de mercado SRC-003 permanece fisicamente em `11_MERCADO_SEGMENTOS_E_PACKS`.
- Artefatos de execução/readiness W1–W9 ficam segregados em `04_ARQUITETURA_REPOSITORIO_E_BASELINE/90_EXECUCAO_E_READINESS_W1_W9`. Essa localização **não promove** capability, wave, task ou gate para READY/PASS.
- Artefatos operacionais de QA, threat model, preparação de gate e UAT ficam segregados em `07_QA_SEGURANCA_E_HOMOLOGACAO/90_EXECUCAO_E_READINESS_QA`. Essa localização **não significa** QA executado, UAT executado ou gate aprovado.
- A aba **MOVEMENT_LOG** do ONB-REG-001 é o registro auditável de movimentações físicas, renomes e resultados de canonicalização. Toda movimentação deve preservar File ID quando suportado e manter coerência com SOURCE_MANIFEST.

Legenda operacional oficial do programa:

| Símbolo | Significado |
|---|---|
| ✅ | Confirmação — validado, concluído, evidenciado ou aprovado |
| ⚠️ | Atenção — risco, ressalva, pendência ou acompanhamento necessário |
| ⛔ | Erro — inconsistência, falha, bloqueio ou condição inválida |
| ❌ | Não fazer — ação proibida pela governança, decisão vigente ou escopo |
| ❓ | Depende da sua decisão — exige decisão explícita do Program Owner antes de avançar |

---

# Inventário canônico e plano de reconciliação documental (ONB-GOV-002)

## 26. Decisão de execução da fase documental

Estado do desenvolvimento: **CODE_FROZEN_FOR_DOCUMENTATION_RECONCILIATION**. Durante esta fase:

- não implementar novas capabilities;
- não alterar código para "fazer a documentação bater";
- não mergear PRs automaticamente;
- não publicar release nem fazer deploy;
- consultar GitHub apenas para inventário e evidência;
- atualizar Drive, registries, gaps, findings, ADRs e contratos documentais;
- preservar todos os IDs, versões e históricos;
- material superseded é preservado em `99_HISTORICO_E_SUPERSEDED`, nunca apagado para limpeza;
- a retomada de código depende de baseline documental reconciliada e de novo readiness/gate.

## 27. Inventário canônico de fontes (SOURCE_MANIFEST — snapshot 2026-08-09)

Foram verificados 14 diretórios funcionais sob `00_EXECUCAO_CANONICA`, além da subpasta `SKILLS_E_CLAUDE_CODE`. Após a criação do ONB-GOV-002, a árvore continha 44 arquivos físicos de projeto; o SOURCE_MANIFEST passou a conter **46 fontes** (44 arquivos do Drive + 1 repositório GitHub + 1 fonte metodológica interna). *Nota: na baseline v1.1 a contagem chegou a 49 Source IDs antes do registro de SRC-050 (ver §34).*

| SRC | Documento | Localização | Classificação no snapshot |
|---|---|---|---|
| SRC-001 | MUTUAL_ONBOARDING_CORPORATIVO_PLANEJAMENTO_COMPLETO_BENCHMARK_v1.1 | Raiz 00_EXECUCAO_CANONICA (fisicamente em 00_START_HERE_E_GOVERNANCA) | CANONICAL — fonte canônica de planejamento |
| SRC-002 | SUPERSEDED_MUTUAL_ONBOARDING_CORPORATIVO_PLANEJAMENTO_COMPLETO_BENCHMARK_v1.0.docx | 99_HISTORICO_E_SUPERSEDED | SUPERSEDED (patrimônio) |
| SRC-003 | MUTUAL_ONBOARDING_MAPA_COMPLETO_MERCADO_E_ICPS_v1.0 | 11_MERCADO_SEGMENTOS_E_PACKS | PROPOSED (descoberta de mercado) |
| SRC-004 | Repositório GitHub onboarding-corporativo | GitHub | CANONICAL_IMPLEMENTATION_REPOSITORY |
| SRC-005 | Pack metodológico institucional Mutual | Fonte não-física | CANONICAL_METHOD |
| SRC-006 | ONB-REG-001_REGISTRO_MESTRE_DE_EXECUCAO_v0.1 | 00_START_HERE_E_GOVERNANCA | Control plane vivo (CANONICAL / LIVING EXECUTION REGISTRY) |
| SRC-007 | ONB-GOV-001_START_HERE_E_GOVERNANCA_v1.0 | 00_START_HERE_E_GOVERNANCA | CANONICAL |
| SRC-008 | ONB-BAS-001_BASELINE_TECNICO_INICIAL_v0.1 (depois Baseline Técnico Reconciliado D2 v0.4) | 04_ARQUITETURA_REPOSITORIO_E_BASELINE | REVIEW_REQUIRED |
| SRC-009 | ONB-QA-001_DEFINITION_OF_READY_DONE_E_HOMOLOGACAO_v1.0 | 07_QA_SEGURANCA_E_HOMOLOGACAO | CANONICAL |
| SRC-010 | ONB-HFS-001_GOVERNANCA_CAP22_MUTUAL_INTELLIGENCE (v0.1 → v1.0) | 10_HFS_MUTUAL_INTELLIGENCE | CANONICAL (após D1.5) |
| SRC-011 | ONB-UX-001_PADRAO_DE_ESPECIFICACAO_DAS_TELAS_v0.1 → renomeado ONB-UX-006_PADRAO_DE_ESPECIFICACAO_DAS_TELAS_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (após ADR-030) |
| SRC-012 | ONB-ARQ-001_CAPABILITY_EVIDENCE_ROUTING_E_HANDOFFS (v0.1 → v1.0) | 05_DADOS_APIS_EVENTOS_E_PROVIDERS | CANONICAL (após D1.3) |
| SRC-013 | ONB-RFP-001_RFP_RFI_MASTER_DE_PROVIDERS (v0.1 → v1.0) | 08_RFP_RFI_CONTRATOS_E_FORNECEDORES | CANONICAL (após D1.5) |
| SRC-014 | ONB-INT-001_ARQUITETURA_MULTI_JURISDICAO_E_GLOBAL (v0.1 → v1.0) | 04_ARQUITETURA_REPOSITORIO_E_BASELINE | CANONICAL (após D1.4) |
| SRC-015 | ONB-DEC-001_DECISOES_EXECUTIVAS_E_ADR_INDEX_v1.0 | 01_DECISOES_ADRS_E_PROMPTS | CANONICAL |
| SRC-016 | ONB-REQ-001_MODELO_DE_REQUISITOS_E_RASTREABILIDADE_v1.0 | 02_REQUISITOS_E_CAPABILITIES | CANONICAL |
| SRC-017 | ONB-RSK-001_FRAMEWORK_RISCO_COMPLIANCE_PRIVACIDADE (v0.1 → v1.0) | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD | CANONICAL (após D1.4) |
| SRC-018 | ONB-EVD-001_EVIDENCE_RELEASE_E_RUNBOOK_FRAMEWORK (v0.1 → v1.0) | 09_RELEASES_E_EVIDENCIAS | CANONICAL (após D1.5) |
| SRC-019 | ONB-MKT-001_SEGMENTOS_PACKS_E_JURISDICOES (v0.1 → v1.0) | 11_MERCADO_SEGMENTOS_E_PACKS | CANONICAL (após D1.5) |
| SRC-020 | ONB-HND-001_CONTRATOS_DE_HANDOFF_E_INTEGRACOES (v0.1 → v1.0) | 12_HANDOFFS_E_INTEGRACOES_EXTERNAS | CANONICAL (após D1.5) |
| SRC-021 | ONB-QA-002_AUDITORIA_TECNICA_WAVE0_v0.1 | 07_QA_SEGURANCA_E_HOMOLOGACAO | — |
| SRC-022 | ONB-CC-001_PACOTE_DE_CONTINUIDADE_CLAUDE_CODE_v0.1 | 99_HISTORICO_E_SUPERSEDED/SKILLS_E_CLAUDE_CODE_SUPERSEDED | SUPERSEDED |
| SRC-023 | ONB-CC-002_INSTRUCOES_MESTRAS_CLAUDE_CODE_v1.0.pdf | 99_HISTORICO_E_SUPERSEDED/SKILLS_E_CLAUDE_CODE_SUPERSEDED | SUPERSEDED |
| SRC-024 | ONB-UX-000_INDICE_PACOTE_COMPLETO_FRONT_UX_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (índice) |
| SRC-025 | ONB-UX-001_BLUEPRINT_COMPLETO_FRONTEND_E_EXPERIENCIA_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (blueprint) |
| SRC-026 | ONB-UX-002_REGISTRO_COMPLETO_80_TELAS_DASHBOARDS_KPIS_FILTROS_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (registry) |
| SRC-027 | ONB-UX-003_WIREFRAMES_FLUXOS_E_NAVEGACAO_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (wireframes) |
| SRC-028 | ONB-REQ-002_REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS_FRONT_UX_v1.0 | 02_REQUISITOS_E_CAPABILITIES | CANONICAL (requirements UX) |
| SRC-029 | ONB-ARQ-003_FLUXOS_TECNICOS_FRONT_BACKEND_PROVIDERS_v1.0 | 04_ARQUITETURA_REPOSITORIO_E_BASELINE | CANONICAL (arquitetura alvo) |
| SRC-030 | ONB-QA-003_CRITERIOS_HOMOLOGACAO_UX_FRONT_v1.0 | 07_QA_SEGURANCA_E_HOMOLOGACAO | CANONICAL (gate de QA) |
| SRC-031 | ONB-UX-004_ESPECIFICACAO_TELA_A_TELA_A1_D14_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (especificação tela a tela) |
| SRC-032 | ONB-UX-005_DASHBOARDS_KPIS_FILTROS_RELATORIOS_v1.0 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | CANONICAL (analytics spec) |
| SRC-033 | skill.zip — mutual-onboarding-corporativo | 99_HISTORICO_E_SUPERSEDED/SKILLS_E_CLAUDE_CODE_SUPERSEDED | SUPERSEDED |
| SRC-034 | MUTUAL_ONBOARDING_SKILL_EXPORTAVEL_v1.0.zip | 01_DECISOES_ADRS_E_PROMPTS | ATIVO — skill exportável |
| SRC-035 | MUTUAL_ONBOARDING_CLAUDE_CODE_PACK_v1.0.zip | 01_DECISOES_ADRS_E_PROMPTS | ATIVO — pacote repository-ready Claude Code |
| SRC-036 | ONB_CLAUDE_PROJECT_INSTRUCTIONS_OTIMIZADA_v1.1.txt | 01_DECISOES_ADRS_E_PROMPTS | ATIVO — instruções do projeto Claude |
| SRC-037 | ONB-CPL-000_INDICE_PACOTE_REGULATORIO_BCB_AUDITORIA_CCS_v1.0 | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD | CANONICAL (índice) |
| SRC-038 | ONB-CPL-001_FRAMEWORK_REGULATORIO_COMPLIANCE_BY_DESIGN_v1.0 | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD | CANONICAL (framework RegulatoryPack) |
| SRC-039 | ONB-CPL-002_CATALOGO_DECLARACOES_CAMPOS_E_EVIDENCIAS_REGULATORIAS_v1.0 | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD | CANONICAL (modelo de declarações) |
| SRC-040 | ONB-ARQ-005_TRILHA_AUDITORIA_REGULATORIA_E_EVIDENCIAS_v1.0 | 05_DADOS_APIS_EVENTOS_E_PROVIDERS | CANONICAL (especialização audit trail regulatória) |
| SRC-041 | ONB-ARQ-006_ESPECIFICACAO_CCS_ARQUIVOS_ACCS_E_RECONCILIACAO_v1.0 | 05_DADOS_APIS_EVENTOS_E_PROVIDERS | CANONICAL CONDITIONAL |
| SRC-042 | ONB-CPL-003_MATRIZ_APLICABILIDADE_REGULATORIA_v1.0 | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD | CANONICAL (matriz viva; status jurídico por linha) |
| SRC-043 | ONB-QA-004_GATES_HOMOLOGACAO_REGULATORIA_CCS_E_AUDITORIA_v1.0 | 07_QA_SEGURANCA_E_HOMOLOGACAO | CANONICAL (gates RG-01..RG-06) |
| SRC-044 | STATUS_EVENT_REGISTRY_V1.md → renomeado ONB-ARQ-004A_APENDICE_STATUS_EVENT_REGISTRY_DETALHADO_v1.0.md | 05_DADOS_APIS_EVENTOS_E_PROVIDERS | CANONICAL — apêndice subordinado ao SRC-045 |
| SRC-045 | ONB-ARQ-004_REGISTRO_MESTRE_STATUS_EVENTOS_OBSERVABILIDADE_API_WEBHOOKS_v1.0 | 05_DADOS_APIS_EVENTOS_E_PROVIDERS | MASTER CANONICAL de status/eventos |
| SRC-046 | ONB-GOV-002_INVENTARIO_CANONICO_E_PLANO_RECONCILIACAO_DOCUMENTAL_v1.0 | 00_START_HERE_E_GOVERNANCA | CANONICAL_EXECUTION_EVIDENCE |
| SRC-047 | (Referência das capacidades econômicas adjacentes ADJ-01..08 — citado em ONB-GOV-001 §23) | — | > ⚠️ [LACUNA NA FONTE] — nome/título do SRC-047 não consta nos documentos fornecidos |
| SRC-048 | ONB-GOV-003_GLOSSARIO_E_MODELO_SEMANTICO_CANONICO_v1.0 | 00_START_HERE_E_GOVERNANCA | CANONICAL SEMANTIC AUTHORITY |
| SRC-049 | BASELINE_DOCUMENTAL_CONGELADA v1.0 | 99_HISTORICO (histórico) | SUPERSEDED |
| SRC-050 | ONB-GOV-004_BASELINE_DOCUMENTAL_CONGELADA_v1.1 | 00_START_HERE_E_GOVERNANCA | CANONICAL — baseline documental ativa |
| SRC-057 | ONB-QA-006_PACOTE_INTEGRADO_READINESS_GATE_CAP19_W1_007_G1_v1.0 (ex-ONB-QA-004 colidente) | 07_QA_SEGURANCA_E_HOMOLOGACAO/90_EXECUCAO_E_READINESS_QA | CANONICAL (renomeado por ADR-030, File ID preservado) |
| SRC-058..067 | Planos formalizados das waves W2–W11 | 90_EXECUCAO_E_READINESS | Especificados (citados em ONB-PRD-001) |

> ⚠️ [LACUNA NA FONTE] — Os quatro documentos-fonte não enumeram individualmente SRC-051..SRC-056 nem detalham título/arquivo de cada SRC-058..067; a baseline v1.1 registra apenas a contagem agregada "49 Source IDs / 49 únicos" antes do registro da própria v1.1, e o ONB-PRD-001 referencia "SRC-050..067" como base. A autoridade completa do manifesto é a aba SOURCE_MANIFEST do ONB-REG-001.

## 28. Snapshot do repositório técnico (somente leitura)

| Item | Valor observado |
|---|---|
| Repositório | Mutual-Processadora-de-Pagamentos/onboarding-corporativo |
| Visibilidade | Privada |
| Branch padrão | main |
| SHA observado de main | `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51` |
| Apps | apps/svc-trabalhadores; apps/web-console; apps/web-jornada; apps/web-painel |
| Packages | packages/catalogo; packages/dados; packages/dominio; packages/motor; packages/orquestrador |
| Workflows | .github/workflows/qualidade.yml; .github/workflows/publicar-prototipo.yml |
| PR #4 (aberto, não mergeado) | Código de autenticação/guard/protótipo; head `13975fea59f55e3b25a3e5d2a27e5d73bd345c4d` |
| PR #5 (aberto, não mergeado) | Documentação docs/execucao; head `8c6c882836cd78a0ba130faeceea44d053a38edc` |
| Evidência histórica do PR #4 | "Portão de qualidade" run `31259025328` com conclusão success para o head observado |

Esses dados são **baseline histórico** — não provam estado atual; sempre verificar o GitHub.

## 29. Findings da Fase 1 (inventário)

| Finding | Descrição | Disposição |
|---|---|---|
| FIND-A | Manifesto físico incompleto: dois arquivos existentes no Drive não estavam no SOURCE_MANIFEST | Corrigido com SRC-044 e SRC-045 |
| FIND-B | Baseline técnico documental desatualizado: SRC-008 REVIEW_REQUIRED; precisa ser refeito após inspeção reconciliada do main e dos PRs | Aberto (passa à D2) |
| FIND-C | Drift documentação x código em autenticação: main possui fundação real de autenticação em `packages/dados/src/acesso.ts`, mas o README do main afirma que não há login | Reconciliar documentalmente sem alterar código |
| FIND-D | Tenant context não é prova de multi-tenancy operacional: referências `TENANT_DEV` no main; RLS/FORCE RLS é fundação real, mas não há multi-tenant E2E sem contexto de tenant autenticado/provisionado | Aberto |
| FIND-E | PR #5 não materializa sua documentação: documentos como anexos no corpo do PR; diff contém apenas `docs/execucao/README.md` praticamente vazio; PR não é fonte canônica de documentação | Registrado |
| FIND-F | Drift temporal de tasks W0: TASK-W0-001 e TASK-W0-002 IN_PROGRESS apesar de estrutura canônica existente | Encerradas por evidência; W0 permaneceu IN_PROGRESS |
| FIND-G | Sequência de Gap IDs possui lacuna 025–030 | Lacuna preservada e investigada; não renumerar nem inventar |

Findings posteriores relevantes de governança: **FIND-010** (drift governança v0.1/scaffold — fechado), **FIND-013** (sobrescrita de TASK-W0-015 no registry — RESOLVED), **FIND-014** (sobreposição SRC-044/SRC-045 — RESOLVED), **FIND-015** (redação obsoleta de gaps — RESOLVED), **FIND-016/017** (drift de classificação regulatória e internacional — registrados e resolvidos), **FIND-018..021** (endurecimento do provider registry, separação taxonomy/readiness, canonicalização de standards e dois problemas de escrita detectados por readback — RESOLVED), **FIND-027** (quebra de array formula em GAPS K:N; corrigida para fórmulas independentes por linha; busca por #REF = zero), **FIND-028** (cópias homônimas em Downloads são staging não autoritativo).

## 30. Critério de "100% documental"

"100% documental" **não significa 100% implementado**; significa **100% classificado e rastreável**. Todo item relevante deve estar em uma das condições:

- CANONICAL + REAL;
- CANONICAL + PARTIAL;
- CANONICAL + ABSENT;
- CANONICAL + NOT_EVIDENCED;
- PROPOSED;
- REVIEW_REQUIRED;
- SUPERSEDED;
- BLOCKED.

E deve ser possível responder: qual fonte manda, o que o código prova, o que falta, qual gap representa a falta, qual evidência fecha o gap e qual gate impede avançar.

## 31. Histórico das fases documentais (D0–D2 do plano original)

| Fase | Escopo | Estado | Evidência/ADR |
|---|---|---|---|
| D0 — Inventário e freeze | Inventário físico, SOURCE_MANIFEST reconciliado, congelamento formalizado | DONE em 2026-08-09 | EVD-ONB-001; ADR-018; TASK-W0-014 |
| D1.1 — Núcleo de governança | SRC-007, SRC-015, SRC-016, SRC-009 reconciliados in-place para CANONICAL; README do ONB-REG-001 alinhado | DONE (TASK-W0-015) | EVD-ONB-002; FIND-010 |
| D1.2 — Contrato de produto, capabilities e UX | REQ-ONB-001..068 como contrato canônico; CAP-01..22 canonizadas (Delivery Status separado); 80 Screen IDs canonizados; SCREENS_80, RF-UX-001..050 e RNF-UX-001..040 CANONICAL como estado desejado; SRC-024..032 alinhados | DONE (TASK-W0-016) | ADR-019; EVD-ONB-003; GAP-ONB-002 refinado |
| D1.3 — Arquitetura, evidence, status, eventos e audit | SRC-012 → ONB-ARQ-001 v1.0 CANONICAL (Capability Contract, Adapter Contract, EvidenceEnvelope, reconciliation, routing); SRC-045 MASTER; SRC-044 apêndice; SRC-040 especialização; famílias ST-SCR, ST-MON, ST-CONS, ST-INV, ST-HND, ST-INC, ST-NOT, ST-HFS, ST-PRIV permanecem PROPOSED/TO_FORMALIZE; GAP-ONB-031..035 refinados como lacunas técnicas | DONE (TASK-W0-017) | ADR-020; EVD-ONB-004; FIND-013/014/015 |
| D1.4 — Compliance, regulatório e internacional | ONB-INT-001 e ONB-RSK-001 → v1.0 CANONICAL; ADR-013 CANONICAL; pacote SRC-037..043 canonicalizado por papel; SRC-041/CCS CANONICAL CONDITIONAL; GAP-ONB-036..040 refinados | DONE (TASK-W0-013, TASK-W0-018) | ADR-021; EVD-ONB-005; FIND-016/017 |
| D1.5 — Providers, HFS, segmentos/packs, handoffs, evidence/release | SRC-010/011/013/018/019/020 → v1.0 CANONICAL; Provider Registry endurecido até coluna Z (legal entity, economic_group verification, coverage evidence, contract/DPA, subprocessors, residency, SLA/retry/rate limit, cost, sandbox, quality/health/version, security/privacy, restrictions/eligibility, exit, fallback independence, evidence/source, last verified, owner); SEGMENTS/PACKS separam taxonomia de GTM readiness; JURISDICTIONS: Brasil CANONICAL_BASELINE_MODEL; pseudo PACK-BR removido; HOF-001..006 TO_FORMALIZE/NOT_EVIDENCED individualmente | DONE | ADR-022; EVD-ONB-006; FIND-018..021 |
| D1 (fechamento) | Autoridade documental e maturidade explícitas por categoria | DONE | EVD-ONB-002..006 |
| D2 — Reconciliação especificação × código | Read-only no GitHub por ADR-018; congelar main SHA/PRs/CI; inventariar apps/packages/migrations/workflows; IAM/tenant/SoD; 80 Screen IDs Design × Código; CAP-01..22 technical state; dados/evidence/status/events/API/providers; compliance/international/HFS/handoffs; atualizar SRC-008 | Executada (TASK-W0-020; TRACEABILITY_D2) | EVD-ONB-007..008; EVD-ONB-019 (Cross-review D2 PASS) |

Pendências que passaram de D1 para D2: baseline técnico SRC-008 REVIEW_REQUIRED; mapping das 80 telas; technical state das 22 capabilities; auth/IAM/SoD; tenant context; state machine; status/event implementation; providers/adapters; storage; KMS; observability/security CI; Developer Platform; international runtime packs; regulatory runtime/CCS; HFS integration; handoff executable contracts.

## 32. Naturezas BR e migrations (fechamento D1 Blueprint Completion)

- A taxonomia brasileira possui registry vivo **NATURES_BR** e **SEM-091 RegulatoryNature**. **D-019, ADR-032** e o catálogo técnico observado convergem em **correspondente bancário como 9ª natureza regulada**; o residual é somente **H-14 UAT** em **GAP-ONB-003**.
- **ADR-033** formalizou migrations forward-only, histórico imutável e prefixos futuros únicos/monotônicos. O legado híbrido não foi alterado; **GAP-ONB-024** preserva o enforcement automático como pendência técnica.
- O mecanismo de disposição de gaps foi endurecido: colunas K:N usam fórmulas independentes por linha e a busca por #REF retornou zero; exceções específicas permanecem explícitas (**FIND-027**).

---

# Baseline Documental Congelada v1.1 (ONB-GOV-004)

## 33. Natureza da baseline

- **Status:** CANONICAL / DOCUMENTATION_FREEZE. Ciclo: re-freeze após correções de organização e cross-review. Gate: **DG-01 — DOCUMENTATION_READY_FOR_IMPLEMENTATION**, sujeito ao readback e registro desta baseline.
- A v1.1 congela o estado documental vigente **após o hardening de organização** e após o cross-review que identificou e corrigiu drifts residuais de control plane. **Substitui a v1.0 como baseline ativa, sem apagar ou reescrever o corte anterior.**
- O freeze é **exclusivamente documental**: não declara capability READY, implementação completa, UAT, homologação, release ou produção.
- Relação com v1.0: a v1.0 permanece patrimônio histórico e evidência válida do seu corte. Após aquele freeze ocorreram correções documentais de governança **sem alteração de código** (atualização do estado corrente no START_HERE/README; correção de localização de SRC-003; registro de FIND-027 e FIND-028; bloco calculado de cross-review D2 em TRACEABILITY_SUMMARY; atualização do inventário; explicitação da ausência de duplicidade ativa). Como o estado corrente deixou de coincidir byte-a-byte com o corte v1.0, a política pós-freeze exigiu **nova baseline** em vez de edição retroativa.

## 34. Corte de revisões pré-registro da v1.1

| SRC | Documento | File ID | Drive revision |
|---|---|---|---|
| SRC-006 | ONB-REG-001 | `1fa6Hea9K4Wwtm28z6OagilNeXbGf9l-zdSXT0vjetZU` | 157 |
| SRC-007 | ONB-GOV-001_START_HERE_E_GOVERNANCA_v1.0 | `13gCT9HvRml42cRB3E4JIbFnuevUzoFiqTYYFq19tlio` | 14 |
| SRC-046 | ONB-GOV-002_INVENTARIO_CANONICO_E_PLANO_RECONCILIACAO_DOCUMENTAL_v1.0 | `1O9rL65Og3rZ2ri2B0Zlg85xGkHxmqfGX5galCm_5Gxs` | 11 |
| SRC-015 | ONB-DEC-001_DECISOES_EXECUTIVAS_E_ADR_INDEX_v1.0 | `1ZPLvxwv7-rr0Uml-Ye6bVDKWuCeGgf7Qall9s5Be8yA` | 9 |
| SRC-048 | ONB-GOV-003_GLOSSARIO_E_MODELO_SEMANTICO_CANONICO_v1.0 | `1ijc4BosRFpeDITtMbMOkASGTsm7h_j0602g1Tzflf5o` | 3 |

A baseline é registrada imediatamente após esse corte no SOURCE_MANIFEST; a auto-referência e a evidência de readback ficam fora do corte pré-registro por definição, correlacionadas pelo novo Evidence ID.

## 35. Contagens e invariantes congeladas (v1.1)

| Invariante | Valor congelado |
|---|---|
| Source IDs | 49 registrados / 49 únicos (antes do registro da v1.1) |
| ADRs | ADR-001..ADR-034 = 34 únicos e CANONICAL |
| Requirements | REQ-ONB-001..077 = 77 registrados / 77 únicos |
| Capabilities | CAP-01..CAP-22 = 22 registradas / 22 únicas |
| Screen IDs | 80 registrados / 80 únicos |
| Handoffs | HOF-001..010 = 10 registrados / 10 únicos |
| Naturezas BR | 12 = PF/PJ/MEI não reguladas + 9 reguladas; correspondente_bancario é a 9ª regulada; H-14 permanece NOT_STARTED |
| Modelo semântico | SEM-001..091 = 91 únicos |
| Gaps | 47 registrados / 47 únicos; 0 sem disposition, 0 sem owner, 0 sem gate |
| Golden thread | D0.7 PASS, 77/77 requirements rastreados |
| Anti-overclaim | 77/77 linhas permanecem NOT_RELEASED e NOT_PRODUCTION_VERIFIED |
| Gate estrutural D2 (TRACEABILITY_SUMMARY) | PASS |

## 36. Organização, duplicidade e cross-review (v1.1)

- A raiz Mutual Onboarding contém apenas `00_EXECUCAO_CANONICA`. Dentro do projeto **não há colisão documental ativa conhecida** após ADR-030.
- SRC-011 é ONB-UX-006; SRC-025 permanece ONB-UX-001. SRC-045 é o master de status/eventos; SRC-044 é apêndice 004A subordinado. SRC-034/035/036 ativos por funções distintas; SRC-022/023/033 SUPERSEDED.
- Cópias homônimas dos benchmarks v1.0/v1.1 encontradas fora da raiz (pasta Downloads) são **staging/source externo não autoritativo**; não foram movidas nem apagadas (FIND-028).
- **EVD-ONB-019** permanece a evidência de PASS do D2 original; a rodada v1.1 adicionou checagens reproduzíveis no TRACEABILITY_SUMMARY e corrigiu drift sem alterar contratos de produto. Nenhum claim de implementação, UAT, release ou produção foi promovido pelas correções.

## 37. Efeito sobre DG-01 e readiness

- A v1.0 sustentou **DG-01 PASS** e o readiness **EVD-ONB-021**, que concluiu que **nenhuma CAP-01..22 está READY** e que **CAP-19 é a primeira candidata fundacional**, mas continua **NOT READY/BLOCKED** pelos gaps críticos de IAM/SoD/tenant e pelo ADR-034.
- A v1.1 exige readback e revalidação documental do DG-01 apenas para alinhar o gate ao novo corte; como não houve alteração técnica, essa revalidação **não pode promover capability nem fechar gap técnico**. DG-01 foi revalidado por **EVD-ONB-022** como DOCUMENTATION_READY_FOR_IMPLEMENTATION.
- Mesmo com DG-01 PASS, **qualquer implementação continua bloqueada** enquanto ADR-034 vigorar e enquanto não existir capability READY ou READY_WITH_RESTRICTION formalmente autorizada.

## 38. Política pós-freeze v1.1

- Mudança material de requisito, capability, semântica, contrato, aplicabilidade, gate, decisão ou autoridade deve preservar histórico, atualizar registries/golden thread/gaps/evidências e **gerar nova baseline** quando o corte deixar de representar o estado vigente.
- **Nunca** editar baseline antiga para fazê-la parecer atual. **Nunca** deletar patrimônio apenas para limpeza. **Nunca** confundir documento CANONICAL com implementação REAL.
- Declaração de re-freeze: registrar SRC-050, classificar SRC-049/v1.0 como SUPERSEDED histórico, gerar Evidence Observed de readback e revalidar DG-01 contra este corte. Nenhum código, PR, workflow, CI, deploy ou release é alterado ou executado por essa declaração.

---

# Análise transversal das 30 Habilidades e prontidão de produto (ONB-PRD-001)

Base: ONB-REG-001, SRC-050..067, main `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51` (consulta read-only). Classificação: **CANONICAL_EXECUTION_SUPPORT** — não substitui registries, gates ou Evidence Observed.

## 39. Sumário executivo

- A análise transversal confirma arquitetura de produto ampla e documentação madura, mas **prontidão técnica permanece parcial**: CAP-19 está **BLOCKED_NOT_READY/PARTIAL** e as waves **W2–W11 seguem NOT_STARTED**.
- O maior risco de interpretação é **confundir cobertura documental com capacidade operacional**. Os planos W1–W11 estão especificados, mas integração real, segurança, CI do próprio SHA, providers, KMS, observabilidade, UAT e release continuam dependentes de Evidence Observed e gates.
- Itens financeiros (ledger, Pix, OTC, liquidez, execução de pagamentos) **não pertencem ao core do Onboarding**: são NOT_APPLICABLE_TO_CORE ou ADJACENT_HANDOFF. O Onboarding fornece elegibilidade, restrições, IDs e evidências; não mantém saldo, não liquida, não executa finanças.
- Sequência recomendada dependency-driven: concluir **G1/CAP-19**, avançar **W2–W9** por gates, executar **UAT W10** e somente então **W11**. ADR-034 mantém GitHub em consulta apenas/no-write/no-execution até revogação explícita do Program Owner.

Estado sintetizado:

| Dimensão | Estado |
|---|---|
| Documentação de waves | W1–W11 especificadas; W2–W11 formalizadas em SRC-058..067 |
| Prontidão técnica | Parcial / não evidenciada por capability; nenhuma promoção derivada dos planos |
| Gate atual | G1 NOT_STARTED; CAP-19 BLOCKED_NOT_READY; W1 BLOCKED |
| Release | W10/W11 NOT_STARTED; nenhum UAT, release, deploy ou production verification |
| GitHub | Consulta read-only/no-write/no-execution por ADR-034 |

## 40. Checklist das 30 Habilidades Macro

Leitura: "Não se aplica ao core" não significa irrelevante para a Mutual; significa que a responsabilidade operacional pertence a domínio downstream e deve entrar somente por contrato/handoff quando necessário.

| # | Habilidade | Diagnóstico | Lacuna / recomendação | Âncora |
|---|---|---|---|---|
| 1 | Core Financeiro, Ledger e Partidas Dobradas | Não se aplica ao core | Onboarding não mantém saldo nem ledger. Handoffs devem preservar elegibilidade/IDs/evidence; downstream financeiro é source of truth próprio | REQ-010/072/073 |
| 2 | Multimoedas, Multiativos, Câmbio e Precisão Financeira | Não se aplica ao core | Dados de jurisdição/moeda podem integrar contexto; cálculo/liquidação cambial permanece downstream | REQ-038/051/073 |
| 3 | Multicontas, Subcontas e Tipos de Conta | Não se aplica ao core | Aprovação do onboarding não cria/autoriza conta financeira; handoff versionado é obrigatório | REQ-010/011 |
| 4 | Product Catalog, White Label e SaaS | Parcial | Product/pack e fundação white-label existem; versionamento/activation/rollback E2E e channel binding não evidenciados | CAP-15/19; GAP-042 |
| 5 | Configuration Engine, Regras e Parametrização | Parcial | Requirements/flows/products versionados existem; applicability/packs/publication/SoD E2E pendentes | CAP-15; GAP-036/046 |
| 6 | Multiprovider e Provider Adapter Layer | Parcial | Capability contract é canônico; adapters reais e due diligence/contratos permanecem gaps | GAP-006/012/022 |
| 7 | Multiliquidez, Reservas e Rebalanceamento | Não se aplica ao core | Liquidez não pertence ao Onboarding; somente restrições/elegibilidade podem seguir por handoff | REQ-038/072 |
| 8 | Product Routing Engine, Rotas e Fallback | Parcial | Routing desejado considera jurisdição, contrato, health, custo e economic_group; execução real ainda não evidenciada | REQ-017/018/055 |
| 9 | Pix, DICT, SPI, MED, Refund e Banking Suite | Adjacente por handoff | Fora do core; eventos econômicos relevantes podem gerar signal/review/revalidation por contrato, nunca mutação direta do case | REQ-038/074 |
| 10 | OTC, Cripto e Liquidação On-chain | Não se aplica ao core | Fora do core; eventual eligibility/handoff deve preservar separação de ownership | REQ-038 |
| 11 | Split, Taxas, Comissões e Revenue Share | Adjacente por handoff | Sem cálculo/liquidação no Onboarding; apenas papéis econômicos, elegibilidade, restrições e IDs | REQ-070..075 |
| 12 | Billing, Pricing, Monetização e Margem | Adjacente | Pode existir no domínio comercial/SaaS, mas não deve alterar decisão de compliance ou lifecycle | W7 product boundary |
| 13 | Idempotência, Reprocessamento e Resiliência | Parcial | Há fundação async/idempotente; outbox/webhook/replay E2E e failure-mode evidence permanecem abertos | GAP-035; W8/W9 |
| 14 | Raspagem, RPA, Coleta Externa e Evidência | Condicional | Coleta externa só por capability/source elegível, com provenance, legalidade e EvidenceEnvelope; não é regra universal | REQ-020/063/076 |
| 15 | Reconciliação, Exceções e Auditoria Operacional | Parcial | Evidence/audit/dossiê possuem fundações; trilha E2E, exports e reconciliation multi-source ainda incompletos | CAP-20; GAP-037 |
| 16 | Regulatório, Jurídico, Compliance, PLD/KYC/KYB/AML/LGPD | Core / Parcial | Dimensão central; frameworks/documentação maduros, execução runtime/providers/applicability/consent ainda parcial | CAP-01..20; GAP-036/039/047 |
| 17 | Financeiro, Contábil, Fiscal, Tributário e FP&A | Adjacente | Regularidade fiscal pode ser capability de due diligence; contabilidade/tesouraria/billing financeiro ficam fora do core | CAP-11; W6 |
| 18 | Governança Empresarial, Indicadores e BI | Parcial | Registry/gates/82 KPIs e analytics specs existem; instrumentação/freshness/owners operacionais ainda não comprovados | CAP-21; GAP-034 |
| 19 | Comercial, RevOps, Parceiros e Afiliados | Adjacente por handoff | Relacionamentos/papéis econômicos entram no onboarding; attribution/remuneração/comercial permanecem em domínio próprio | REQ-070..075 |
| 20 | Marketing, Branding, Growth e Canais | Parcial | White-label/canal são estratégicos, mas channel first-class e branding governance E2E ainda gaps | REQ-013/069; GAP-041/042 |
| 21 | Experiência do Cliente, Suporte e Developer Experience | Parcial | 80 funções e UX contracts são canônicos; mapping técnico tem gaps e CAP-18 Developer Platform não evidenciada | SRC-024..032; CAP-18 |
| 22 | Riscos Corporativos, Controles e Continuidade | Parcial | Risk/compliance controls são fortes no desenho; security, runbooks, failure drills e explainability E2E ainda pendentes | GAP-049/053; W9 |
| 23 | Fornecedores, Procurement e Third-Party Risk | Parcial | RFP/RFI e provider registry existem; contratos, SLA, DPA, residency e exit ainda incompletos | GAP-006/022 |
| 24 | Dados, BI, Governança de Dados, IA e Agentes | Parcial | Evidence/data lineage e HFS governance definidos; observability/data governance e CAP-22 runtime ainda incompletos | CAP-20/21/22 |
| 25 | Segurança, Observabilidade, Testes e Documentação | Parcial / Bloqueador | Governança documental é forte; own-SHA CI, SAST/SCA, KMS, telemetry, pentest e runbooks ainda não evidenciados | W9; GAP-005/014/016/017/053 |
| 26 | Arquitetura de Ecossistema de Produtos Mutual | Forte documental | Boundary Onboarding x Backoffice/Partner/Payments explícita; contracts executáveis/handoffs ainda incompletos | REQ-002/010/038/073 |
| 27 | Banking Product Suite, TED, Boleto, Link, CCB | Não se aplica ao core | Somente integração/handoff de eligibility quando necessária; nenhuma execução bancária dentro do Onboarding | REQ-038 |
| 28 | Marketplace, Afiliados e Produtos Digitais | Adjacente por handoff | Papéis econômicos e referral IDs suportados conceitualmente; regras comerciais e liquidação permanecem externas | REQ-070..075 |
| 29 | Cross-border, LATAM, Global Payments e Crypto Banking | Parcial na arquitetura | Core é multi-jurisdição por desenho, mas JurisdictionPacks não-BR e operação internacional real permanecem gaps | REQ-051..058; GAP-019 |
| 30 | Escalabilidade de Portfólio e Composição Modular | Forte documental / Parcial técnico | Core + JurisdictionPack + RegulatoryPack + SegmentPack + TenantPolicy canonizado; runtime/composição/release gates ainda não evidenciados | REQ-048/056/064/076 |

## 41. Estado desejado e plano de implementação

### Fundações não negociáveis

Tenant/channel fail-closed; actor/SoD real; RLS; evidence/audit; privacy/retention; providers por adapter; applicability; versionamento; negative tests; own-SHA CI; observabilidade; runbooks e gates.

### Ordem de execução

```
G1/CAP-19 → W2 lifecycle/jornada → W3 identidade/providers → W4 KYB/fontes oficiais → W5 AML/HFS → W6 privacy/due diligence → W7 admin/developer platform → W8 monitoring/handoffs → W9 security/resilience → W10 UAT → W11 pilot/release
```

### Critério de maturidade

SPECIFIED não é READY; READY não é CODE_COMPLETE; CODE_COMPLETE não é INTEGRATED/QA/UAT; RELEASED não é PRODUCTION_VERIFIED.

### Fronteira financeira

Ledger, saldo, Pix, OTC, liquidação, split e comissões operacionais não pertencem ao core. O Onboarding fornece identidade, vínculo, elegibilidade, restrições, canonical IDs, policy versions e evidence refs por contratos versionados.

## 42. Riscos estruturais prioritários

| ID | Severidade | Risco | Impacto |
|---|---|---|---|
| R1 | Crítico | IAM/tenant/channel/SoD não comprovados E2E | Bloqueia G1 e contamina todos os fluxos subsequentes |
| R2 | Crítico | CNPJ alfanumérico não auditado E2E | Bloqueia fundação Brasil e G1 |
| R3 | Alto | Adapters/providers/contratos incompletos | Impede tratar verificações como operação real |
| R4 | Alto | KMS/observability/security CI/runbooks não evidenciados | Bloqueia segurança, resiliência e release |
| R5 | Alto | Runtime de applicability/packs/consent incompleto | Risco regulatório e de comportamento hardcoded |
| R6 | Alto | HFS/model governance sem implementação E2E | Impede CAP-22 e risco explicável governado |
| R7 | Alto | Handoffs/eventos/webhooks não executáveis E2E | Impede integração segura com ecossistema Mutual |
| R8 | Crítico | UAT/release/production verification não executados | Impede qualquer claim de produção |

## 43. Governança e regra de parada (PRD-001)

- Drive permanece cânone de governança, registries e evidências executivas.
- GitHub permanece consulta apenas/no-write/no-execution por ADR-034 até revogação explícita do Program Owner.
- O ONB-PRD-001 é análise transversal de produto e suporte de execução; **não substitui** ONB-REG-001, READINESS, GATES, ADRs ou Evidence Observed.
- Nenhuma capability, wave, gate, UAT, release ou produção é promovida por existência do documento.
- O primeiro movimento técnico futuro continua condicionado à **autorização explícita** e ao **READY real** da capability correspondente.
