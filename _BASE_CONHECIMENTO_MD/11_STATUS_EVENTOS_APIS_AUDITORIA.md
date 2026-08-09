---
titulo: "Status, Eventos, Observabilidade, API/Webhooks, Trilha de Auditoria Regulatória e CCS/ACCS"
fontes:
  - "ONB-ARQ-004 — Registro Mestre de Status, Eventos, Observabilidade, API e Webhooks v1.0 (SRC-045)"
  - "ONB-ARQ-004A — Apêndice STATUS_EVENT_REGISTRY_V1 Detalhado v1.0 (SRC-044)"
  - "ONB-ARQ-005 — Trilha de Auditoria Regulatória e Evidências v1.0 (SRC-040)"
  - "ONB-ARQ-006 — Especificação CCS / Arquivos ACCS e Reconciliação v1.0 (SRC-041)"
status_fonte:
  - "ONB-ARQ-004: CANONICAL MASTER SPEC — contrato desejado; implementação separada por evidência"
  - "ONB-ARQ-004A: PROPOSED — apêndice normativo detalhado incorporado por referência pelo SRC-045; nasce NOT_EVIDENCED; só vira CANONICAL após reconciliação e registro no ONB-REG-001"
  - "ONB-ARQ-005: CANONICAL AUDIT/EVIDENCE CONTRACT — implementação separada por evidência"
  - "ONB-ARQ-006: CANONICAL CONDITIONAL CONTRACT — ativação somente com applicability=APPLICABLE e fonte/layout oficial vigente"
gerado_em: 2026-08-09
---

# 11 — Status, Eventos, APIs, Webhooks, Auditoria e CCS/ACCS

Este documento consolida o registro mestre de status/eventos/observabilidade/API/webhooks (ONB-ARQ-004 / SRC-045), o apêndice detalhado STATUS_EVENT_REGISTRY_V1 (ONB-ARQ-004A / SRC-044), o contrato de trilha de auditoria regulatória e evidências (ONB-ARQ-005 / SRC-040) e a especificação CCS/ACCS e reconciliação (ONB-ARQ-006 / SRC-041).

**Precedência em conflito de semântica de status/evento/exposição:** (1) decisão explícita/ADR CANONICAL; (2) requirement CANONICAL; (3) SRC-045 (ONB-ARQ-004); (4) SRC-044 (apêndice) no detalhe não conflitante.

---

# PARTE I — REGISTRO MESTRE DE STATUS, EVENTOS, OBSERVABILIDADE, API E WEBHOOKS (ONB-ARQ-004 v1.0 / SRC-045)

**Status:** CANONICAL MASTER SPEC — contrato desejado; implementação separada por evidência.

## 1. Objetivo, escopo e precedência

Registro mestre consolidado do Mutual Onboarding Corporativo para status, eventos de domínio, auditoria, timeline, observabilidade, APIs, webhooks, handoffs, KPIs de governança e controles relacionados.

**Finalidade:** transformar status e eventos em contratos versionados e rastreáveis do produto, preservando separação entre estado de domínio, estado de interface, evento técnico, evento de domínio e status de governança.

**Escopo:** Onboarding PF e PJ corporativo, multi-tenant, white-label, multicanal, multi-provider, multi-jurisdição, Brasil-first operacionalmente e global por arquitetura.

**Regra de autoridade:** este documento consolida o que já foi decidido no Mutual Onboarding e incorpora apenas os padrões reaproveitáveis encontrados em Confluence, SharePoint e no documento PLANEJAMENTO — OS TRÊS BLOCOS. Fontes de outros produtos não substituem o canônico do Onboarding. Quando algo é novo, fica marcado como PROPOSTO ou A FORMALIZAR.

**Regra de realidade:** este documento especifica o contrato desejado. Ele não afirma que cada status/evento está implementado. Implementação só muda de NOT_EVIDENCED com evidência no repositório canônico e nos gates correspondentes.

### 1.1 Fontes e autoridade

Fontes de precedência do produto:

1. Decisão explícita do Program Owner e ADRs CANONICAL do ONB-REG-001.
2. Fontes canônicas vigentes no Drive Mutual Onboarding.
3. Evidência técnica no repositório `Mutual-Processadora-de-Pagamentos/onboarding-corporativo`.
4. Confluence e SharePoint como conhecimento institucional complementar e padrões reutilizáveis.
5. Documento PLANEJAMENTO — OS TRÊS BLOCOS como referência de arquitetura e sequenciamento do Backoffice; nunca como fonte de IDs, PRs ou estado técnico do Onboarding.

Decisões já canônicas relevantes: **REQ-ONB-060, REQ-ONB-061, REQ-ONB-062 e ADR-016**. Elas estabelecem catálogo canônico de status, taxonomia/registry de eventos e exposição por API versionada e webhook assinado, salvo INTERNAL_ONLY justificado.

## 2. O que do documento PLANEJAMENTO DOS TRÊS BLOCOS se aplica ao Onboarding

**Conclusão:** aplica-se fortemente como padrão de dependência e governança, mas não como plano técnico literal.

**APLICÁVEL:**

1. Auditoria depende de ator identificável. Timeline, decisão e trilha sem `actor_id` real geram evidência fraca.
2. Evento é diferente de status. Status responde "como está agora"; evento responde "o que aconteceu, quando, por quem e por quê".
3. Catálogo de eventos é uma capacidade central que alimenta simultaneamente auditoria, timeline, KPI, relatório e suporte.
4. Inventário vem antes do desenho final do contrato. Primeiro identificar eventos/status existentes e fontes; depois reconciliar com o contrato desejado.
5. Não fabricar timeline, KPI ou dado ausente no frontend. Ausência deve permanecer explícita.
6. Escritas, aprovações e governança não devem nascer sobre mocks quando dependem de identidade, SoD, audit e state machine reais.
7. Cada bloco de fundação precisa de métrica própria para evitar "fundação eterna" sem evidência de progresso.
8. Eventos precisam de origem, ordem, idempotência, correlação e mecanismo de entrega confiável.

**NÃO TRANSFERIR LITERALMENTE:**

1. PR-06a/06b/06c/07, commits, apps/servidor e qualquer caminho de arquivo do Backoffice.
2. Contagens de 106/118/120 telas e a métrica "2 de ~120". O Onboarding possui baseline próprio de 80 funções A1-D14.
3. GAP-W0-049, api-payment, regras de URL pública/restrita e detalhes de Clerk do outro programa.
4. Ondas e ordem de telas do Backoffice Financeiro.
5. Estados financeiros, ledger, PIX/OTC e semântica transacional que pertencem a outros domínios.

**ADAPTAÇÃO PARA O ONBOARDING:** a mesma lógica de dependência pode ser lida como Fundação de identidade/tenant/SoD → Contrato de status/eventos/observabilidade → Experiências A1-D14 e capabilities. Isso é compatibilidade arquitetural, não uma mudança automática do roadmap vigente.

## 3. Achados do Confluence aplicáveis

1. Documentação modular: cada módulo deve conter requisitos, regras, fluxos, telas, contratos de API/eventos, modelo de dados, backlog, RACI, indicadores, critérios de aceite, testes, riscos, dependências e evidências.
2. Event Bus / Outbox / Idempotency como padrão de infraestrutura para eventos confiáveis.
3. Toda decisão relevante deve possuir `correlation_id` e trilha de auditoria.
4. Timeline de auditoria deve ser somente leitura; alteração sensível registra antes, depois, usuário/ator, contexto, motivo e timestamp.
5. Observabilidade deve ser ponta a ponta, orientada a domínio, com logs estruturados, métricas, traces, eventos, dashboards, alertas, status page e histórico.
6. Handoff Onboarding → Tecnologia + CS deve ocorrer apenas com status regulatório claro, produto/escopo definido, owners identificados e dependências registradas; "onboarding aprovado" não significa "cliente em produção".
7. Política KYC reforça que evidências, logs, relatórios de terceiros, histórico de interações e monitoramento recorrente precisam ser preservados e auditáveis.

**Limites de reuso:** Confluence contém documentos de MFCP/Pix e políticas históricas com semântica de outros produtos. Reutilizar padrões de contrato, auditabilidade, observabilidade, idempotência, RACI e evidências; não importar eventos financeiros, status Pix, ledger ou marcas de providers para o core do Onboarding.

## 4. Achados do SharePoint aplicáveis

1. **Status mestre de jornada:** áreas diferentes não podem interpretar o mesmo cliente de formas divergentes. Status precisa ter significado, sistema responsável, owner e transições legais.
2. **Processo operacional:** cada etapa deve possuir ator responsável, sistema/ferramenta, input → output e SLA. Isso deve refletir nos eventos e nos KPIs.
3. **Governança documental:** artefato vigente sem owner, aprovador e data de revisão não deve ser usado operacionalmente. O mesmo princípio se aplica ao registry de status/eventos e seus schemas.
4. **Webhook outbound institucional:** a Mutual já documenta entrega com outbox, assinatura HMAC, retry com backoff, dead-letter e idempotência por `event_id`. Esse padrão é diretamente aplicável a CAP-18.

O manual de jornada do cliente também reforça dossiê único, rastreabilidade de decisões, segregação de funções e transições controladas entre pré-onboarding, onboarding, compliance, integração, ativo assistido, monitoramento reforçado, bloqueio, suspensão e encerramento.

**Limites de reuso:** os status de CRM/comercial e de operação global do cliente não devem ser copiados como status internos do Case Onboarding. Devem ser mapeados em handoffs/projeções entre sistemas. O Onboarding continua source of truth do seu próprio lifecycle.

## 5. Princípios normativos de status

1. Status é dado canônico, não string livre.
2. Toda mudança de status é server-authoritative e validada por state machine.
3. Frontend nunca decide transição; envia command/intenção e renderiza o resultado autorizado.
4. Status deve possuir ID estável, key, descrição, owner, versão, transições legais, terminalidade, evento associado e classificação de exposição.
5. Status de domínio, status de interface, status de governança e health técnico são namespaces diferentes.
6. UNKNOWN, INCONCLUSIVE e UNAVAILABLE nunca podem ser convertidos em PASS por conveniência.
7. Timeout de provider não significa rejeição nem aprovação.
8. Estado publicado de configuração é imutável; rollback troca ponteiro/versão, nunca reescreve histórico.
9. Status crítico deve ter `reason_code` quando aplicável e actor/authority auditável.
10. Transição ilegal é evento de segurança/controle, não falha silenciosa.
11. Toda consulta de status externo deve retornar `as_of`/freshness quando houver risco de defasagem.
12. Multi-tenant é fail-closed: nenhum status de tenant B pode ser lido/alterado por tenant A.
13. JurisdictionPack e TenantPolicy podem restringir transições, documentos, SLAs e exposição sem fork do core.
14. Status HFS/Mutual Intelligence deve expor apenas estado operacional e sinais permitidos; nunca metodologia proprietária.

## 6. Catálogo de status existente — base Onboarding

As famílias abaixo já existem no STATUS_EVENT_REGISTRY_V1 como especificação normativa. Estado de implementação permanece NOT_EVIDENCED nesta consolidação, pois este trabalho não é auditoria de código.

> As matrizes detalhadas por status (transições, emissão de evento, exposição API/INTERNAL_ONLY) estão na Parte II deste arquivo (apêndice SRC-044).

### 6.1 ST-CASE — lifecycle de case

| ID | Status | Transições legais a partir dele |
|---|---|---|
| ST-CASE-001 | draft | submitted, cancelled, expired |
| ST-CASE-002 | submitted | in_review, pending_complement, cancelled |
| ST-CASE-003 | in_review | pending_complement, escalated, decided, blocked |
| ST-CASE-004 | pending_complement | in_review, expired, cancelled |
| ST-CASE-005 | waiting_customer | in_review, expired |
| ST-CASE-006 | escalated | decided, in_review |
| ST-CASE-007 | pending_approval | approved, rejected, restricted, in_review |
| ST-CASE-008 | approved | monitoring, reopened, revoked |
| ST-CASE-009 | restricted | monitoring, reopened, revoked, approved |
| ST-CASE-010 | rejected | appealed, closed |
| ST-CASE-011 | appealed | in_review, decided |
| ST-CASE-012 | monitoring | reopened, revoked, closed |
| ST-CASE-013 | reopened | in_review |
| ST-CASE-014 | revoked | closed |
| ST-CASE-015 | expired | reopened, closed |
| ST-CASE-016 | cancelled | terminal |
| ST-CASE-017 | closed | terminal |
| ST-CASE-018 | blocked | in_review |

**Regra:** a lista definitiva deve ser reconciliada com o domínio vigente. Divergência documentação x código vira FINDING/GAP; não é motivo para apagar o registry.

### 6.2 ST-EVID — evidência normalizada

| ID | Status |
|---|---|
| ST-EVID-001 | requested |
| ST-EVID-002 | in_progress |
| ST-EVID-003 | pass |
| ST-EVID-004 | fail |
| ST-EVID-005 | unknown |
| ST-EVID-006 | inconclusive |
| ST-EVID-007 | unavailable |
| ST-EVID-008 | manual_review_required |
| ST-EVID-009 | expired |
| ST-EVID-010 | superseded |
| ST-EVID-011 | discrepant |

**Invariantes:** unknown/inconclusive/unavailable não colapsam em pass; toda evidência preserva origem, capability, provider/source, timestamp, version, jurisdiction, integrity e lineage.

### 6.3 ST-DOC — documento

| ID | Status |
|---|---|
| ST-DOC-001 | upload_authorized |
| ST-DOC-002 | uploaded |
| ST-DOC-003 | integrity_verified |
| ST-DOC-004 | malware_scan_pending |
| ST-DOC-005 | malware_scan_failed |
| ST-DOC-006 | processing |
| ST-DOC-007 | processed |
| ST-DOC-008 | rejected_quality |
| ST-DOC-009 | valid |
| ST-DOC-010 | expired |
| ST-DOC-011 | legal_hold |
| ST-DOC-012 | deleted |
| ST-DOC-013 | crypto_shredded |

**Exposição:** estados de segurança operacional podem ser INTERNAL_ONLY; estado funcional relevante ao tenant deve ser consultável por API quando autorizado.

### 6.4 ST-DEC — decisão

| ID | Status |
|---|---|
| ST-DEC-001 | drafted |
| ST-DEC-002 | pending_checker |
| ST-DEC-003 | approved |
| ST-DEC-004 | rejected |
| ST-DEC-005 | restricted |
| ST-DEC-006 | overridden |
| ST-DEC-007 | self_approval_blocked |
| ST-DEC-008 | reversed_on_appeal |

Toda decisão registra `actor_id`, authority/alçada, `reason_codes`, evidências e state transition. Tentativa de self-approval é evento de segurança.

### 6.5 ST-CFG — configuração versionada

| ID | Status |
|---|---|
| ST-CFG-001 | draft |
| ST-CFG-002 | validated |
| ST-CFG-003 | simulated |
| ST-CFG-004 | pending_approval |
| ST-CFG-005 | published |
| ST-CFG-006 | deprecated |
| ST-CFG-007 | revoked |
| ST-CFG-008 | rolled_back |

Versão published é imutável. Mudança cria nova versão ou ativa versão anterior de forma controlada e auditada.

### 6.6 ST-PRV — provider e capability health

| ID | Status |
|---|---|
| ST-PRV-001 | healthy |
| ST-PRV-002 | degraded |
| ST-PRV-003 | down |
| ST-PRV-004 | rate_limited |
| ST-PRV-005 | circuit_open |
| ST-PRV-006 | failover_active |
| ST-PRV-007 | maintenance |
| ST-PRV-008 | contract_expired |
| ST-PRV-009 | kill_switch_active |

Health deve ser por capability, provider, jurisdição e, quando relevante, `economic_group`. Fallback entre marcas do mesmo grupo econômico não conta como redundância independente.

### 6.7 ST-TEN — tenant, acesso e credenciais

| ID | Status |
|---|---|
| ST-TEN-001 | provisioning |
| ST-TEN-002 | active |
| ST-TEN-003 | suspended |
| ST-TEN-004 | offboarding |
| ST-TEN-005 | session_expired |
| ST-TEN-006 | access_denied |
| ST-TEN-007 | cross_tenant_attempt |
| ST-TEN-008 | credential_rotated |

Cross-tenant attempt é evento de segurança de alta severidade e sempre auditado. Caminho sem tenant válido falha fechado.

### 6.8 ST-API — entrega de API/webhook

| ID | Status |
|---|---|
| ST-API-001 | delivered |
| ST-API-002 | retrying |
| ST-API-003 | final_failure |
| ST-API-004 | dlq |
| ST-API-005 | redelivered |
| ST-API-006 | signature_invalid |
| ST-API-007 | replay_rejected |
| ST-API-008 | idempotent_replay |

Esses estados descrevem entrega, não o estado de negócio do case. Falha de webhook não reabre nem rejeita um case por si só.

### 6.9 ST-JOB — jobs, filas e workers

| ID | Status |
|---|---|
| ST-JOB-001 | queued |
| ST-JOB-002 | running |
| ST-JOB-003 | succeeded |
| ST-JOB-004 | failed |
| ST-JOB-005 | retrying |
| ST-JOB-006 | dead_letter |
| ST-JOB-007 | stalled |

Aplicável a revalidação, retention, exports, provider jobs, notificações, webhooks e processamento documental assíncrono.

### 6.10 ST-GOV — governança de capability/task/release

| ID | Status |
|---|---|
| ST-GOV-001 | DISCOVERED |
| ST-GOV-002 | SPECIFIED |
| ST-GOV-003 | READY |
| ST-GOV-004 | READY_WITH_RESTRICTION |
| ST-GOV-005 | IN_PROGRESS |
| ST-GOV-006 | CODE_COMPLETE |
| ST-GOV-007 | INTEGRATED |
| ST-GOV-008 | QA |
| ST-GOV-009 | UAT |
| ST-GOV-010 | READY_FOR_RELEASE |
| ST-GOV-011 | RELEASED |
| ST-GOV-012 | PRODUCTION_VERIFIED |
| ST-GOV-013 | BLOCKED |
| ST-GOV-014 | CANCELLED |

**Invariante: CODE_COMPLETE != DONE.**

### 6.11 ST-UX — estados de interface

| ID | Status |
|---|---|
| ST-UX-001 | loading |
| ST-UX-002 | empty |
| ST-UX-003 | error |
| ST-UX-004 | access_denied |
| ST-UX-005 | unavailable |
| ST-UX-006 | saved |
| ST-UX-007 | expired_session |
| ST-UX-008 | waiting_customer |
| ST-UX-009 | pending_approval |
| ST-UX-010 | degraded |

Estado de interface não é status de domínio. A UI apenas representa dados/operação e pode ter loading/error enquanto o domínio continua no mesmo estado.

## 7. Famílias complementares de status — PROPOSTAS A FORMALIZAR

A revisão de Confluence, SharePoint e das 80 funções mostra domínios adicionais que merecem namespace próprio. Estes IDs são PROPOSTOS neste documento e não se tornam CANONICAL sem registro no ONB-REG-001.

| Família | Status propostos | Razão |
|---|---|---|
| **ST-SCR** — screening e desambiguação | requested, potential_hit, under_review, false_positive, confirmed_hit, escalated, cleared, closed | PEP/sanções/watchlists/adverse media possuem lifecycle próprio; reduzir tudo a pass/fail de EvidenceEnvelope perde trilha de desambiguação, analyst disposition e EDD. |
| **ST-MON** — revalidação e monitoramento | scheduled, due, in_progress, no_change, change_detected, overdue, escalated, completed | CAP-17 precisa distinguir periodicidade, atraso, mudança material e escalonamento sem confundir com Case lifecycle. |
| **ST-CONS** — consentimento, termos e assinatura | requested, presented, accepted, declined, withdrawn, superseded, expired | Consentimento e aceite legal precisam versão, base legal, locale, timestamp, documento/termo vinculado e prova de aceite/retirada. |
| **ST-INV** — convite e jornada delegada | created, sent, opened, accepted, in_progress, completed, expired, revoked | A15-A17 exigem rastreabilidade de convites de pessoas-chave sem misturar o status do convidado com o status do case principal. |
| **ST-HND** — handoff Onboarding → downstream | preparing, ready, sent, accepted, returned, implementation_started, closed | O playbook Confluence exige aceite/devolução objetiva e reforça que onboarding aprovado não significa operação/produção. Handoff deve preservar status regulatório, produtos aprovados, limites, dependências e owners sem transferir segredo de investigação. |
| **ST-INC** — incidente e status operacional | detected, investigating, identified, mitigating, monitoring, resolved, postmortem_due, closed | A observabilidade institucional exige status page, resposta a incidente, impacto por tenant/provider/capability e histórico de degradação. |
| **ST-NOT** — notificações multicanal | queued, sent, delivered, bounced, failed, suppressed, acknowledged | Produto multicanal precisa separar notificação de domínio. E-mail/SMS/WhatsApp/push não mudam o case só porque a entrega falhou. |
| **ST-HFS** — CAP-22/Mutual Intelligence | available, degraded, unavailable, kill_switch_active, model_pending_approval, model_active, model_deprecated, model_rolled_back | HFS é capability interna com model governance. Eventos externos jamais carregam feature, peso, fórmula ou threshold proprietário. |
| **ST-PRIV** — privacidade, retention e titular | request_received, identity_verified, under_review, legal_hold, fulfilled, rejected, cancelled | CAP-20 e RF-UX-049 exigem lifecycle auditável para solicitações de titular e retention, respeitando jurisdição, legal basis e legal hold. |

## 8. Princípios normativos de eventos

1. Evento de domínio representa fato imutável ocorrido; não é command nem log de debug.
2. Nomenclatura: `onboarding.<dominio>.<entidade>.<acao>.v<N>`.
3. `event_id` é único e idempotente.
4. `event_version`/`schema_version` nunca é reutilizado para contrato incompatível.
5. `occurred_at` representa o fato; `published_at` representa publicação. Ambos são preservados.
6. `tenant_id` é obrigatório para eventos tenant-bound e ausência falha fechado.
7. `correlation_id` e `causation_id` conectam a cadeia ponta a ponta.
8. `actor` identifica usuário, sistema, provider ou job que causou o fato, sem expor segredo.
9. `subject_ref`/`entity_ref`/`case_id` são IDs canônicos; PII não deve ser repetida no payload.
10. `previous_status`/`new_status` são obrigatórios em transição de status.
11. `reason_codes` são obrigatórios em decisão, rejeição, restrição, override, degradação e bloqueios relevantes.
12. `payload_ref` aponta para evidência/dado controlado quando o conteúdo é sensível.
13. `integrity_hash` protege integridade quando aplicável.
14. `classification` define PUBLIC, TENANT ou INTERNAL_ONLY. Sensitivity é atributo separado.
15. Todo evento relevante para o cliente/tenant deve ser consultável por API e elegível a webhook, salvo INTERNAL_ONLY formalmente justificado.
16. Todo evento crítico deve alimentar audit trail e observabilidade.
17. Evento não deve ser apagado para "corrigir histórico"; correção gera novo evento ou evento compensatório.
18. Entrega externa é at-least-once; consumidores precisam ser idempotentes.
19. Outbox deve compartilhar atomicidade com a mutação de domínio para impedir "estado mudou, evento sumiu".
20. DLQ e redelivery são operações auditadas, com owner e visibilidade.

## 9. Envelope obrigatório de evento

| Campo | Obrigatoriedade | Observação |
|---|---|---|
| `event_id` | Obrigatório | ID único |
| `event_type` | Obrigatório | Nome versionado |
| `event_version` | Obrigatório | Versão lógica do evento |
| `schema_ref`/`schema_version` | Obrigatório | Contrato serializado e validável |
| `occurred_at` | Obrigatório | Instante do fato |
| `published_at` | Obrigatório | Instante de publicação |
| `tenant_id` | Obrigatório em contexto tenant | Fail-closed |
| `correlation_id` | Obrigatório | Correlação ponta a ponta |
| `causation_id` | Obrigatório quando houver evento/command causal | |
| `trace_id` | Recomendado/obrigatório em fluxo distribuído | |
| `actor` | Obrigatório | actor_type, actor_id/ref, role/capability e auth_context quando aplicável |
| `subject_ref`/`entity_ref` | Obrigatório conforme domínio | ID, não PII |
| `case_id` | Condicional | Quando o fato pertence a case |
| `capability_id` | Condicional | Quando CAP-01..CAP-22 participa |
| `jurisdiction_code` | Condicional/obrigatório | Quando regras dependem de jurisdição |
| `channel_id` | Condicional | Quando a interação pertence a um Channel first-class; nunca inferir de tenant_id |
| `interaction_source` | — | Origem técnica da interação/fato, por exemplo hosted_flow, public_api, partner_api, analyst_console, delegated_journey, system_job, webhook_inbound ou batch |
| `producer` | — | Serviço/bounded context responsável |
| `previous_status`/`new_status` | Condicional | Em transição |
| `reason_codes` | Condicional | Em decisão/exceção/degradação |
| `payload_ref` | Condicional | Para dados sensíveis ou volumosos |
| `integrity_hash` | Obrigatório | Para evidências/artefatos que exigem prova de integridade |
| `classification` | — | PUBLIC, TENANT ou INTERNAL_ONLY |
| `sensitivity` | — | NORMAL, RESTRICTED, SECURITY ou REGULATED, a formalizar |
| `idempotency_key` | — | Quando o fato deriva de request repetível |
| `retention_class` | — | Quando exigido por dado/regime |
| `data_region` | — | Quando residência de dados importa |

**Proibido no payload de evento:** senha, token, secret, documento bruto, biometria bruta, PII desnecessária, metodologia HFS, features/weights/thresholds proprietários.

## 10. Taxonomia de eventos do Onboarding

**Famílias existentes/esperadas:**

| Família | Cobertura |
|---|---|
| `case.*` | Criação, submissão, transição, assignment, SLA, complemento, reabertura, fechamento |
| `evidence.*` | Solicitação, início, resultado, divergência, expiração, supersession |
| `document.*` | Autorização de upload, upload, integridade, processamento, rejeição, validade, legal hold, deletion/crypto-shred |
| `decision.*` | Draft, checker, approved, rejected, restricted, override, self-approval-blocked, appeal reversal |
| `config.*` | Draft, validation, simulation, approval, publish, deprecation, rollback |
| `provider.*` | Health change, rate limit, circuit, failover, maintenance, contract issue, kill switch |
| `tenant.*` | Provisioning, activation, suspension, offboarding, credential rotation |
| `api/webhook.*` | Delivery, retry, final failure, DLQ, redelivery, invalid signature, replay rejection, idempotent replay |
| `job.*` | Queued, started, succeeded, failed, retrying, dead-letter, stalled |
| `governance.*` | Task/capability/gate/release state changes, waiver, blocker/finding/gap lifecycle |
| `security.*` | Access denied, cross-tenant attempt, authorization failure, self-approval attempt, credential misuse |
| `hfs.*` | Request/result/signal/health/model-version events sem metodologia proprietária |

**Famílias complementares propostas:**

| Família | Cobertura |
|---|---|
| `screening.*` | Potential hit, disposition, false positive, confirmed hit, EDD/escalation |
| `monitoring.*` | Due, started, changed, overdue, escalated, completed |
| `consent.*` | Presented, accepted, declined, withdrawn, superseded, expired |
| `invitation.*` | Created, sent, opened, accepted, completed, expired, revoked |
| `handoff.*` | Ready, sent, accepted, returned, implementation_started |
| `incident.*` | Detected, investigating, identified, mitigated, resolved, postmortem |
| `notification.*` | Queued, sent, delivered, bounced, failed, suppressed |
| `privacy.*` | Request, verification, legal hold, fulfilment/rejection |

**Regra de nomes:** a família pode virar mais granular conforme bounded contexts, mas nunca deve codificar marca de provider no event_type de negócio. Marca/provider fica em metadata/source_id.

## 11. Eventos representativos por domínio

Exemplos de contratos que o registry deve conter e versionar:

```
onboarding.case.case.created.v1
onboarding.case.case.submitted.v1
onboarding.case.case.status_changed.v1
onboarding.case.case.assigned.v1
onboarding.case.case.complement_requested.v1
onboarding.case.case.sla_breached.v1
onboarding.case.case.reopened.v1
onboarding.case.case.closed.v1
onboarding.evidence.execution.requested.v1
onboarding.evidence.execution.started.v1
onboarding.evidence.execution.completed.v1
onboarding.evidence.discrepancy.detected.v1
onboarding.evidence.discrepancy.resolved.v1
onboarding.evidence.evidence.expired.v1
onboarding.document.document.upload_authorized.v1
onboarding.document.document.uploaded.v1
onboarding.document.document.integrity_verified.v1
onboarding.document.document.processing_completed.v1
onboarding.document.document.rejected_quality.v1
onboarding.document.document.legal_hold_applied.v1
onboarding.document.document.crypto_shredded.v1
onboarding.decision.decision.pending_checker.v1
onboarding.decision.decision.approved.v1
onboarding.decision.decision.rejected.v1
onboarding.decision.decision.restricted.v1
onboarding.decision.decision.overridden.v1
onboarding.security.decision.self_approval_blocked.v1
onboarding.config.policy.published.v1
onboarding.config.flow.published.v1
onboarding.config.product.published.v1
onboarding.config.version.rolled_back.v1
onboarding.provider.capability.degraded.v1
onboarding.provider.provider.down.v1
onboarding.provider.provider.rate_limited.v1
onboarding.provider.routing.failover_activated.v1
onboarding.provider.kill_switch.activated.v1
onboarding.tenant.tenant.activated.v1
onboarding.tenant.tenant.suspended.v1
onboarding.tenant.credential.rotated.v1
onboarding.security.tenant.cross_tenant_attempt.v1
onboarding.api.webhook.delivered.v1
onboarding.api.webhook.retry_scheduled.v1
onboarding.api.webhook.final_failure.v1
onboarding.api.webhook.sent_to_dlq.v1
onboarding.api.webhook.redelivered.v1
onboarding.security.webhook.signature_invalid.v1
onboarding.security.webhook.replay_rejected.v1
onboarding.monitoring.revalidation.due.v1
onboarding.monitoring.revalidation.changed.v1
onboarding.monitoring.revalidation.overdue.v1
onboarding.handoff.implementation.ready.v1
onboarding.handoff.implementation.accepted.v1
onboarding.handoff.implementation.returned.v1
onboarding.incident.service.detected.v1
onboarding.incident.service.degraded.v1
onboarding.incident.service.resolved.v1
onboarding.hfs.capability.degraded.v1
onboarding.hfs.signal.created.v1
onboarding.hfs.model.activated.v1
```

Cada event_type precisa de owner, producer, schema_ref, trigger, consumers, exposição, retention, severidade e testes de contrato.

## 12. Eventos de provider: inbound, normalização e domínio

Provider webhook ou resposta de API não entra diretamente como verdade do domínio.

**Fluxo normativo:**

```
Provider/Official Source -> Adapter -> raw_reference controlada -> normalização -> EvidenceEnvelope -> reconciliação -> state machine/policy -> Domain Event -> Outbox -> API/Webhook/Timeline/KPI.
```

**Regras:**

1. Payload externo preservado por referência segura quando necessário; não despejar bruto em event bus público.
2. `provider_reference`, `provider_version`, `source_type`, `jurisdiction` e `received_at` são preservados.
3. Resposta divergente entre fontes gera `evidence.discrepancy.detected`; não "última resposta vence".
4. Timeout gera unavailable/unknown conforme contrato; nunca approve.
5. Fallback considera `economic_group` e independência real.
6. Mudança de provider não muda event_type de negócio; evita acoplamento a marca.

## 13. Outbox, event store, idempotência, DLQ e replay

**Outbox transacional:** a mutação de domínio e a gravação da intenção de publicar o evento devem ocorrer na mesma transação lógica. O dispatcher publica de forma assíncrona e marca delivery/attempt sem editar o evento original.

**Event Store/Audit:** eventos de domínio e trilhas críticas são append-only. Se houver necessidade de correção, registrar evento compensatório/corretivo. Auditoria registra quem, o quê, quando, por quê, contexto e referência de evidência.

**Idempotência:** API commands usam `idempotency_key`. `event_id` é estável. Consumidores mantêm dedupe/processed-event registry quando necessário. Reprocessar não pode duplicar decisão, documento, case ou notificação.

**DLQ:** mensagem após limite de retries vai para dead-letter observável. A entrada na DLQ gera evento/alerta. Redelivery manual exige permissão, motivo, actor e registro da tentativa.

**Replay:** replay técnico de eventos deve ser separado de replay de webhook externo. Reprocessamento histórico precisa de janela, escopo, dry-run quando aplicável e garantia de que efeitos irreversíveis não sejam repetidos.

## 14. API pública de status e eventos — CAP-18

Contratos mínimos esperados, a formalizar em OpenAPI:

| Endpoint | Finalidade |
|---|---|
| `GET /v1/status-catalog` | Lista status autorizados, versão, descrição pública, deprecation e domínio |
| `GET /v1/event-types` | Lista tipos de evento autorizados para o tenant/integração |
| `GET /v1/cases/{case_id}` | Retorna status canônico, reason summary permitido, as_of e links autorizados |
| `GET /v1/cases/{case_id}/events` | Timeline de eventos autorizados, cursor-based, ordenação determinística |
| `GET /v1/events/{event_id}` | Detalhe autorizado do evento |
| `GET /v1/evidence/{evidence_id}/status` | Status funcional da evidência sem vazar raw sensível |
| `GET /v1/webhook-deliveries` | Para Developer Platform, entregas/retries/falhas do próprio tenant |
| `POST /v1/webhook-deliveries/{delivery_id}/redeliver` | Ação autorizada e auditada |

**Regras de API:**

1. Versionamento explícito e compatibilidade retroativa controlada.
2. OAuth/API key/scopes/tenant binding conforme arquitetura definida.
3. Cursor pagination; não depender de offsets instáveis para timeline extensa.
4. Filtros: `event_type`, domain, status, `capability_id`, since/until, `channel_id`, `interaction_source` e `correlation_id` conforme permissão.
5. Resposta inclui `as_of`/freshness quando o dado pode estar atrasado.
6. Dado ausente retorna unavailable/partial/stale conforme contrato; nunca zero inventado.
7. Erro usa `error_code`, `correlation_id`, `user_safe_message_key` e retriable.
8. PII e campos INTERNAL_ONLY são omitidos, não mascarados de forma que induza interpretação errada.
9. Toda API crítica possui rate limit, audit e telemetria.

## 15. Webhook outbound — contrato de entrega

**Padrão institucional aplicável:** Outbox → Dispatcher → HMAC/signed webhook → retry com backoff → DLQ → delivery log → redelivery auditada.

**Cabeçalhos/metadata esperados:**

```
X-Mutual-Event-Id
X-Mutual-Event-Type
X-Mutual-Event-Version
X-Mutual-Delivery-Id
X-Mutual-Timestamp
X-Mutual-Signature-Version
X-Mutual-Signature
X-Mutual-Attempt
```

Payload externo inclui o envelope permitido para TENANT/PUBLIC e referência ao recurso canônico. Segredos, raw provider payload, HFS proprietary data e PII desnecessária ficam fora.

**Regras de entrega:**

1. Assinatura HMAC ou mecanismo aprovado, com secret versionado e rotacionável.
2. Janela de replay e verificação de timestamp.
3. Retry exponencial com jitter e limite por policy.
4. 2xx confirma entrega; códigos retriable/non-retriable devem ser definidos.
5. DLQ observável e consultável pelo tenant conforme permissão.
6. Redelivery não cria novo `event_id`; cria novo `delivery_id`/attempt.
7. Cliente deve ser idempotente por `event_id`.
8. Endpoint pode ser suspenso por segurança/erro persistente, com status e evento próprio.

## 16. Auditoria, timeline e evidência

Auditoria e timeline são projeções de fatos, não fontes paralelas de verdade.

**Audit record mínimo:** `audit_id`, `tenant_id`, `channel_id` quando aplicável, `interaction_source`, `actor`, `action`, `target_ref`, `occurred_at`, `correlation_id`, `reason`, `authority`, `before_ref`, `after_ref`, `evidence_refs`, network/security context interno, `classification`.

**Regras:**

1. Timeline do case é somente leitura para o usuário; correção ocorre por novo fato/evento.
2. Toda mutação sensível registra before/after ou referências equivalentes.
3. Ações privilegiadas registram justificativa e authority.
4. Export/download de dossiê, acesso Mutual privilegiado e redelivery manual geram eventos de auditoria.
5. UI não fabrica timeline a partir de timestamps dispersos; consome read model construído de eventos/audit records.
6. Evidências externas ficam em EvidenceEnvelope; o evento aponta para a evidência, não replica o raw.

## 17. Observabilidade ponta a ponta

Quatro sinais devem coexistir: logs estruturados, métricas, traces e eventos de domínio.

**Identificadores de correlação:** `correlation_id`, `trace_id`, `tenant_id`, `case_id`, subject/entity_id, `capability_id`, `provider_id`/`source_id`, `event_id` e `delivery_id` conforme fluxo.

**Telemetria mínima:** request rate/error/duration; DB latency/health; provider latency/error/timeout; queues age/retries/DLQ; webhook delivery/retry/final failure; document processing; case SLA; policy latency; HFS health/degraded; deployment/release verification.

**Status page interna:** serviços, APIs, webhooks, providers/capabilities, queues, storage, DB, HFS, incidentes, manutenção e fallback.

**Status page externa/tenant:** apenas disponibilidade funcional autorizada, incidentes relevantes e histórico apropriado; nunca detalhes de segurança, provider confidencial ou metodologia HFS.

**Segurança de telemetria:** não logar senha, token, session secret, documento bruto, biometria bruta, PII desnecessária ou payload provider sensível.

## 18. KPIs, SLIs e controles para status/eventos

A família de governança deve medir o próprio contrato, além dos 82 KPIs de produto já existentes.

**Indicadores mínimos:**

1. Cobertura de status com ID/owner/transições/schema.
2. Cobertura de status exposto por API quando elegível.
3. Cobertura de event types com schema versionado.
4. Cobertura de event types expostos por webhook quando elegível.
5. Event publish success rate.
6. Event publish latency P95/P99 entre occurred_at e published_at.
7. Webhook delivery success rate.
8. Webhook retry rate.
9. Final failure/DLQ count e aging.
10. Redelivery success rate.
11. Illegal transition attempts.
12. Missing correlation_id rate.
13. Missing actor rate em mutações/decisões.
14. Schema validation failure/drift count.
15. Audit coverage de ações críticas.
16. Timeline completeness por case.
17. Status freshness/staleness rate.
18. Provider event normalization failure rate.
19. Cross-tenant authorization/security events.
20. Handoff accepted first-pass / returned rate.

Cada KPI possui owner, fórmula, fonte, granularidade, timezone, dimensões, freshness e regra de null/unknown. Ausência nunca vira zero.

## 19. Multi-tenant, multicanal e internacional

**Multi-tenant:** `tenant_id` é first-class em status, eventos, API, audit, logs e deliveries. RLS/FORCE RLS e autorização server-side protegem leitura/mutação. Webhook secret, endpoint, delivery log e credentials são tenant-bound.

**Multicanal:** Channel e InteractionSource são dimensões distintas. `channel_id` identifica o canal de negócio/acesso quando aplicável; `interaction_source` registra a origem técnica do fato, como hosted flow, API, partner API, analyst console, delegated journey, job, webhook ou batch. Tenant e Channel permanecem independentes ou relacionados apenas por ChannelBinding versionado.

**Internacional:** eventos e status não hardcodam CPF/CNPJ/CEP/UF. Usar identifiers genericamente e metadados `jurisdiction_code`, `country_code`, `locale`, `timezone`, `data_region`, `legal_basis` e `privacy_regime` quando aplicável.

**Tempo:** persistir timestamps técnicos em UTC e apresentar no timezone autorizado do tenant/usuário. `occurred_at` e `published_at` nunca devem perder o instante original.

**JurisdictionPack:** pode definir requisitos, consentimentos, retention, documentos, status condicionais, exposição e SLA sem fork do core.

## 20. HFS / Mutual Intelligence — regras de eventos

CAP-22 é capability interna da Mutual.

**Pode expor:** health/degraded/unavailable; `model_version` opaca; `signal_id`; categoria de reason não proprietária; necessidade de human review; investigation linkage; timestamps e lineage permitidos.

**Não pode expor:** features, pesos, fórmula, thresholds, regras proprietárias, métodos de detecção internos, raw sensível desnecessário.

Eventos HFS públicos/tenant devem ser raros e abstratos. A maior parte do detalhe é INTERNAL_ONLY. A decisão humana final referencia evidências e reason categories permitidas, não metodologia.

## 21. Handoffs e fronteiras entre sistemas

O Onboarding é source of truth do seu lifecycle; CRM, Tecnologia/CS, Backoffice Financeiro, Terminal, KYT e outros sistemas integram por contratos versionados.

**Handoff mínimo:** `case_id`/`subject_id`/`entity_id`; `tenant_id`; onboarding final status; KYC/KYB/compliance status autorizado; produtos/escopo aprovados; restrições/limites; dependencies; owner de destino; `correlation_id`; `handoff_id`; version; `created_at`; evidence references permitidas.

**Eventos de handoff:** ready, sent, accepted, returned, updated, implementation_started, closed.

**Regra crítica:** approved onboarding não equivale a conta ativa, credencial pronta, produto operando ou autorização financeira. O sistema downstream emite seus próprios estados.

## 22. Governança do registry e change management

Cada status/evento/schema deve possuir: `owner_role`; `approver_role`; domain/bounded context; classification; version; created/effective/deprecated metadata; source/requirement; capabilities; screens; producer; consumers; API/webhook exposure; retention; tests; `implementation_state`; evidence links.

**Fluxo de alteração:**

```
PROPOSED -> REVIEW_REQUIRED -> CANONICAL/SPECIFIED -> READY -> implementation -> contract tests -> QA -> release -> production verification.
```

**Mudança breaking:**

1. Nunca reutilizar versão existente.
2. Criar vN+1.
3. Definir coexistência/deprecation window.
4. Atualizar OpenAPI/schema registry/webhook docs/SDK.
5. Testar consumer compatibility.
6. Registrar ADR quando alterar semântica transversal.

Documento/registry sem owner/aprovador/revisão não deve ser tratado como operacionalmente vigente.

## 23. Critérios de aceite e testes

**Contrato de status:** transição válida aceita; transição ilegal rejeitada; repetição idempotente; concorrência controlada; actor sem authority rejeitado; tenant incorreto rejeitado; self-approval bloqueado quando SoD; reason_code exigido nos estados aplicáveis.

**Contrato de evento:** schema validation; event_id único; tenant/correlation/causation presentes; no PII/secrets proibidos; outbox atomicidade; publish retry; duplicate delivery sem duplicate side effect; DLQ após política; redelivery auditada; consumer idempotency.

**API/webhook:** scope/tenant binding; pagination determinística; freshness/as_of; signed webhook; invalid signature reject; replay reject; secret rotation; endpoint disabled/degraded; delivery log consultável; INTERNAL_ONLY nunca exposto.

**Observabilidade:** correlation end-to-end; logs/metrics/traces sem PII proibida; alertas acionáveis; dashboards refletem estado real; status page não diverge do health interno sem explicação.

## 24. Gaps e dependências associadas

Gaps já registrados e diretamente ligados a este documento:

| Gap | Descrição |
|---|---|
| GAP-ONB-031 | Sem catálogo canônico de status |
| GAP-ONB-032 | Sem taxonomia/registry de eventos de domínio |
| GAP-ONB-033 | Status/eventos não expostos por API/webhook |
| GAP-ONB-034 | Sem família de KPIs de governança |
| GAP-ONB-035 | Outbox, idempotência, DLQ, replay protection e delivery log não evidenciados |

**Dependências anteriores/relacionadas:** IAM, tenant e SoD; case state machine; observabilidade; Developer Platform/CAP-18; EvidenceEnvelope; provider routing; document storage; security CI; HFS governance; handoff contracts.

Este documento não fecha nenhum gap sozinho. Ele define o contrato de fechamento e as evidências esperadas.

## 25. Matriz de aplicabilidade das fontes consultadas

| Fonte | Classificação | Aplicação |
|---|---|---|
| PLANEJAMENTO — OS TRÊS BLOCOS | REFERENCE | Aplicar dependência ator → auditoria, evento → timeline/KPI/relatório, inventário antes do contrato, idempotência e fundação antes de escrita. Não importar PRs/contagens/Backoffice. |
| STATUS_EVENT_REGISTRY_V1.md | APÊNDICE NORMATIVO DETALHADO DO ONBOARDING | Preserva as matrizes detalhadas das famílias ST-CASE, ST-EVID, ST-DOC, ST-DEC, ST-CFG, ST-PRV, ST-TEN, ST-API, ST-JOB, ST-GOV e ST-UX, inclusive exposição API/INTERNAL_ONLY. É incorporado por referência neste Master e não constitui autoridade concorrente. |
| ONB-REG-001 | CANONICAL | Para REQ-ONB-060..062 e ADR-016. |
| Confluence — MFCP página-mãe/filhas | REFERENCE INSTITUCIONAL | Aplicar template de contratos/API/eventos/dados/RACI/indicadores/testes/evidências e padrão Event Bus/Outbox/Idempotency. |
| Confluence — Requisitos MFCP | REFERENCE | Aplicar timeline read-only, histórico before/after e auditabilidade; não importar status financeiros. |
| Confluence — Arquitetura de Observabilidade | REFERENCE FORTE | Aplicar logs/metrics/traces/events, correlation, dashboards, status page, alertas e segregação de telemetria. |
| Confluence — Handoff Onboarding → Tecnologia + CS | REFERENCE DIRETA | Aplicar handoff versionado, aceite/devolução, owners, dependências e separação entre onboarding aprovado e produção. |
| Confluence — Política KYC das Subcontas | REFERENCE DE COMPLIANCE | Aplicar preservação de evidências, logs, relatórios de terceiros e monitoramento; adaptar providers e Brasil specifics ao registry vigente/JurisdictionPack. |
| SharePoint — Manual Completo da Jornada do Cliente | REFERENCE DIRETA | Aplicar status mestre, transições controladas, dossiê único, SoD e defensabilidade; mapear status CRM para handoff/projeção, não para ST-CASE. |
| SharePoint — Mapeamento de Processos | REFERENCE | Aplicar ator, sistema, input/output e SLA a cada etapa/evento. |
| SharePoint — Matriz de Governança Documental | REFERENCE | Aplicar owner/aprovador/revisão/criticidade ao registry e schemas. |
| SharePoint — Fluxos Webhooks | REFERENCE TÉCNICA FORTE | Aplicar outbox, HMAC, retry/backoff, dead-letter e idempotência por event_id. |

## 26. Diagramas lógicos

**Fluxo de mudança de status:**

```
Command/API/UX -> Authorization + Tenant Context -> Domain State Machine -> Persist State + Outbox -> Domain Event -> Dispatcher -> Event Store/Audit -> Read Models -> Timeline/KPI/Reports -> Signed Webhook/API.
```

**Fluxo de provider:**

```
Provider/Official Source -> Adapter -> Validation/Normalization -> EvidenceEnvelope -> Reconciliation -> Policy/Case -> Status Transition -> Domain Event -> Audit/Observability/Delivery.
```

**Fluxo de handoff:**

```
Case final status -> Handoff validator -> Handoff ready -> Sent -> Destination accept/return -> downstream lifecycle.
```

Approved onboarding nunca vira downstream active por implicação.

**Fluxo de observabilidade:**

```
Request/Job/Event -> correlation_id/trace_id -> logs + metrics + traces + domain events -> alerting/SLO/status page -> incident -> remediation/postmortem.
```

## 27. Resultado desta consolidação

O produto passa a ter uma especificação única para diferenciar e conectar: status de domínio; status de interface; status de governança; health técnico; eventos de domínio; eventos de segurança; eventos de entrega; audit trail; timeline; EvidenceEnvelope; API de status/eventos; webhooks assinados; outbox/DLQ/idempotência; observabilidade e status page; handoff entre sistemas; KPIs/SLIs de governança; multi-tenant, multicanal e multi-jurisdição; privacidade, retention e HFS.

A reconciliação com o código real foi executada na D0.5 e permanece registrada no SRC-008/TRACEABILITY_D2. O próximo estágio documental é D0.6/D0.7: normalização semântica e traceability E2E; schemas executáveis e implementação continuam futuros e dependentes de readiness.

## 28. Autoridade documental e apêndice detalhado

Este documento, SRC-045, é a especificação mestre CANONICAL para status, eventos, observabilidade, API/webhooks, outbox/DLQ/replay, audit/timeline e governança associada.

O SRC-044 — STATUS_EVENT_REGISTRY_V1.md — permanece preservado como APÊNDICE CANÔNICO DETALHADO porque contém matrizes por status com transições, emissão de evento e exposição API/INTERNAL_ONLY que não são repetidas integralmente neste documento. Ele é incorporado por referência; não é uma segunda autoridade. Em caso de conflito, prevalecem: (1) decisão explícita/ADR CANONICAL; (2) requirement CANONICAL; (3) este SRC-045; (4) SRC-044 no detalhe não conflitante.

As famílias complementares ST-SCR, ST-MON, ST-CONS, ST-INV, ST-HND, ST-INC, ST-NOT, ST-HFS e ST-PRIV continuam PROPOSED/TO_FORMALIZE até decisão e registro expresso no ONB-REG-001. Esta canonicalização não as promove automaticamente.

A existência deste contrato fecha a lacuna DOCUMENTAL de catálogo/taxonomia, mas não fecha os gaps técnicos GAP-ONB-031..035: implementação, schemas executáveis, state machine, API/webhook, instrumentação, outbox, idempotência, DLQ, replay e delivery log continuam dependentes de evidência real na D2 e fases técnicas futuras.

## 29. Addendum semântico D0.6 — channel, interaction source e authority

Autoridade semântica: SRC-048 / ONB-GOV-003 e ONB-REG-001/SEMANTIC_REGISTRY.

A partir desta revisão, `channel_id` e `interaction_source` são campos e conceitos independentes. `channel_id` identifica Channel first-class; `interaction_source` identifica a origem técnica da ação/fato. Referências históricas a `source_channel` neste documento ou em artefatos anteriores devem ser interpretadas como alias legado de `interaction_source`, nunca como substituto de `channel_id`.

Tenant e Channel são dimensões absolutas e independentes. Podem ser relacionadas por ChannelBinding explícito e versionado, inclusive hierarquicamente, sem cardinalidade 1:1 presumida. WhiteLabelProfile é configuração de apresentação e não altera status, eventos, segurança, regulatory applicability ou evidence semantics.

Para novos schemas de evento/audit/API/handoff, quando aplicável, preservar separadamente: `tenant_id`, `channel_id`, `interaction_source`, `white_label_profile_id`/ref, `correlation_id`, `causation_id`, `trace_id`, actor/authority e `applicability_evaluation_id`/ref.

Este addendum resolve a ambiguidade documental de nomenclatura; não prova implementação. GAPs técnicos e contract tests permanecem abertos conforme TRACEABILITY_D2.

---

# PARTE II — APÊNDICE DETALHADO: STATUS_EVENT_REGISTRY_V1 (ONB-ARQ-004A v1.0 / SRC-044)

> Gerado na Fase 3 — esqueleto normativo. Nenhum status ou evento aqui está implementado. Todos nascem NOT_EVIDENCED. Este arquivo define O QUE DEVE EXISTIR, não o que existe.

Catálogo canônico de **status**, **eventos de domínio**, **exposição por API/webhook** e **KPIs de governança** do Mutual Onboarding Corporativo.

Origem: decisão do Program Owner em 2026-08-09 — *"todo status e evento deve também ser por API"*. Precedência 1.

## Por que este arquivo existe

Até aqui o programa tinha catálogo de KPI (82), filtro (20) e relatório (12), mas **não tinha**:

- catálogo de status com ID, dono e transição — os estados viviam como prosa solta em `ux-patterns.md`;
- taxonomia de eventos de domínio — citados nos fluxos TF-001..TF-012, nunca enumerados;
- exigência de que status e evento sejam expostos por API versionada e webhook assinado;
- indicador do próprio programa: gaps, blockers, waivers, ADRs, cobertura de evidência e drift.

## Regras que não se quebram

1. **Status é dado canônico, não string livre.** Toda transição é server-authoritative. Frontend nunca decide status.
2. **Todo status relevante emite evento.** Mudança de estado sem evento é mudança invisível.
3. **Todo evento é exposto por API e por webhook assinado**, salvo classificação `INTERNAL_ONLY` justificada e registrada.
4. **Evento é versionado e imutável.** Alteração de contrato cria versão nova; nunca reescreve a anterior.
5. **Evento não carrega PII desnecessária.** Carrega IDs canônicos e referência.
6. **`UNKNOWN`, `INCONCLUSIVE` e `UNAVAILABLE` nunca colapsam em `PASS`.**
7. **Ausência de dado nunca vira zero.** Usar `current`, `delayed`, `partial`, `stale`, `unavailable`.
8. **Metodologia HFS nunca vaza** em evento, API pública, log ou KPI.

## 1. Catálogo de status (matrizes detalhadas)

Coluna `Estado real` nasce `NOT_EVIDENCED` para todos. Só muda com leitura de código.

### 1.1 Case — ST-CASE

| ID | Status | Transições legais a partir dele | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|---|
| ST-CASE-001 | draft | submitted, cancelled, expired | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-002 | submitted | in_review, pending_complement, cancelled | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-003 | in_review | pending_complement, escalated, decided, blocked | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-004 | pending_complement | in_review, expired, cancelled | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-005 | waiting_customer | in_review, expired | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-006 | escalated | decided, in_review | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-007 | pending_approval | approved, rejected, restricted, in_review | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-008 | approved | monitoring, reopened, revoked | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-009 | restricted | monitoring, reopened, revoked, approved | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-010 | rejected | appealed, closed | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-011 | appealed | in_review, decided | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-012 | monitoring | reopened, revoked, closed | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-013 | reopened | in_review | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-014 | revoked | closed | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-015 | expired | reopened, closed | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-016 | cancelled | — (terminal) | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-017 | closed | — (terminal) | SIM | SIM | NOT_EVIDENCED |
| ST-CASE-018 | blocked | in_review | SIM | SIM | NOT_EVIDENCED |

A lista definitiva deve ser extraída do domínio vigente e reconciliada com esta. Divergência entre esta tabela e o código é ACHADO, não erro do registry.

### 1.2 Evidence — ST-EVID

| ID | Status | Significado | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|---|
| ST-EVID-001 | requested | execução solicitada | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-002 | in_progress | em execução no provider/fonte | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-003 | pass | resultado positivo normalizado | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-004 | fail | resultado negativo normalizado | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-005 | unknown | fonte respondeu sem conclusão | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-006 | inconclusive | dado insuficiente para decidir | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-007 | unavailable | fonte indisponível/timeout | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-008 | manual_review_required | exige human review | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-009 | expired | fora da validade | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-010 | superseded | substituída por versão nova | SIM | SIM | NOT_EVIDENCED |
| ST-EVID-011 | discrepant | divergência cross-source aberta | SIM | SIM | NOT_EVIDENCED |

`ST-EVID-005`, `006` e `007` **nunca** podem ser convertidos em `003`.

### 1.3 Documento — ST-DOC

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-DOC-001 | upload_authorized | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-002 | uploaded | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-003 | integrity_verified | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-004 | malware_scan_pending | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-DOC-005 | malware_scan_failed | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-006 | processing | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-007 | processed | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-008 | rejected_quality | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-009 | valid | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-010 | expired | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-011 | legal_hold | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-012 | deleted | SIM | SIM | NOT_EVIDENCED |
| ST-DOC-013 | crypto_shredded | SIM | SIM | NOT_EVIDENCED |

### 1.4 Decisão — ST-DEC

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-DEC-001 | drafted | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-DEC-002 | pending_checker | SIM | SIM | NOT_EVIDENCED |
| ST-DEC-003 | approved | SIM | SIM | NOT_EVIDENCED |
| ST-DEC-004 | rejected | SIM | SIM | NOT_EVIDENCED |
| ST-DEC-005 | restricted | SIM | SIM | NOT_EVIDENCED |
| ST-DEC-006 | overridden | SIM | SIM | NOT_EVIDENCED |
| ST-DEC-007 | self_approval_blocked | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-DEC-008 | reversed_on_appeal | SIM | SIM | NOT_EVIDENCED |

`ST-DEC-007` é evento de segurança: toda tentativa de auto-aprovação é registrada.

### 1.5 Configuração — ST-CFG

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-CFG-001 | draft | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-002 | validated | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-003 | simulated | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-004 | pending_approval | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-005 | published | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-006 | deprecated | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-007 | revoked | SIM | SIM | NOT_EVIDENCED |
| ST-CFG-008 | rolled_back | SIM | SIM | NOT_EVIDENCED |

Versão publicada é **imutável**. Rollback ativa versão anterior ou nova; nunca edita.

### 1.6 Provider e capability — ST-PRV

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-PRV-001 | healthy | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-002 | degraded | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-003 | down | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-004 | rate_limited | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-005 | circuit_open | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-006 | failover_active | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-007 | maintenance | SIM | SIM | NOT_EVIDENCED |
| ST-PRV-008 | contract_expired | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-PRV-009 | kill_switch_active | SIM | SIM | NOT_EVIDENCED |

### 1.7 Tenant e acesso — ST-TEN

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-TEN-001 | provisioning | SIM | SIM | NOT_EVIDENCED |
| ST-TEN-002 | active | SIM | SIM | NOT_EVIDENCED |
| ST-TEN-003 | suspended | SIM | SIM | NOT_EVIDENCED |
| ST-TEN-004 | offboarding | SIM | SIM | NOT_EVIDENCED |
| ST-TEN-005 | session_expired | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-TEN-006 | access_denied | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-TEN-007 | cross_tenant_attempt | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-TEN-008 | credential_rotated | SIM | SIM | NOT_EVIDENCED |

`ST-TEN-007` é evento de segurança de severidade alta. Sempre auditado.

### 1.8 API e webhook — ST-API

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-API-001 | delivered | SIM | SIM | NOT_EVIDENCED |
| ST-API-002 | retrying | SIM | SIM | NOT_EVIDENCED |
| ST-API-003 | final_failure | SIM | SIM | NOT_EVIDENCED |
| ST-API-004 | dlq | SIM | SIM | NOT_EVIDENCED |
| ST-API-005 | redelivered | SIM | SIM | NOT_EVIDENCED |
| ST-API-006 | signature_invalid | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-API-007 | replay_rejected | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-API-008 | idempotent_replay | SIM | SIM | NOT_EVIDENCED |

### 1.9 Job, fila e plataforma — ST-JOB

| ID | Status | Emite evento | Exposto por API | Estado real |
|---|---|---|---|---|
| ST-JOB-001 | queued | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-JOB-002 | running | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-JOB-003 | succeeded | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-JOB-004 | failed | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-JOB-005 | retrying | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-JOB-006 | dead_letter | SIM | INTERNAL_ONLY | NOT_EVIDENCED |
| ST-JOB-007 | stalled | SIM | INTERNAL_ONLY | NOT_EVIDENCED |

### 1.10 Governança e entrega — ST-GOV

| ID | Status | Aplica a | Estado real |
|---|---|---|---|
| ST-GOV-001 | DISCOVERED | capability, task | NOT_EVIDENCED |
| ST-GOV-002 | SPECIFIED | capability, task | NOT_EVIDENCED |
| ST-GOV-003 | READY | capability, task | NOT_EVIDENCED |
| ST-GOV-004 | READY_WITH_RESTRICTION | capability, task | NOT_EVIDENCED |
| ST-GOV-005 | IN_PROGRESS | capability, task | NOT_EVIDENCED |
| ST-GOV-006 | CODE_COMPLETE | capability, task | NOT_EVIDENCED |
| ST-GOV-007 | INTEGRATED | capability, task | NOT_EVIDENCED |
| ST-GOV-008 | QA | capability, task | NOT_EVIDENCED |
| ST-GOV-009 | UAT | capability, task | NOT_EVIDENCED |
| ST-GOV-010 | READY_FOR_RELEASE | release | NOT_EVIDENCED |
| ST-GOV-011 | RELEASED | release | NOT_EVIDENCED |
| ST-GOV-012 | PRODUCTION_VERIFIED | release | NOT_EVIDENCED |
| ST-GOV-013 | BLOCKED | capability, task | NOT_EVIDENCED |
| ST-GOV-014 | CANCELLED | capability, task | NOT_EVIDENCED |

`CODE_COMPLETE != DONE`.

### 1.11 Estados de interface — ST-UX

Preservados de `ux-patterns.md`, agora com ID estável: `ST-UX-001` loading · `002` empty · `003` error · `004` access_denied · `005` unavailable · `006` saved · `007` expired_session · `008` waiting_customer · `009` pending_approval · `010` degraded.

Estado de interface **não** é status de domínio. Nunca derivar um do outro.

## 2. Taxonomia de eventos (apêndice)

### 2.1 Nomenclatura

```
onboarding.<dominio>.<entidade>.<acao>.v<N>
```

Exemplo: `onboarding.case.decision.approved.v1`

`<dominio>`: case · evidence · document · decision · config · provider · tenant · api · job · governance · security · hfs

### 2.2 Envelope obrigatório de evento (apêndice)

| Campo | Obrigatório | Observação |
|---|---|---|
| `event_id` | SIM | único, idempotente |
| `event_type` | SIM | conforme 2.1 |
| `event_version` | SIM | inteiro, nunca reutilizado |
| `occurred_at` | SIM | instante do fato |
| `published_at` | SIM | instante da publicação |
| `tenant_id` | SIM | falha fechado sem ele |
| `correlation_id` | SIM | ponta a ponta |
| `causation_id` | SIM | evento que originou este |
| `actor` | SIM | usuário, sistema ou provider |
| `subject_ref` | SIM | ID canônico, não PII |
| `previous_status` | condicional | em evento de transição |
| `new_status` | condicional | em evento de transição |
| `reason_codes` | condicional | em decisão, rejeição, degradação |
| `payload_ref` | condicional | referência, não conteúdo sensível |
| `integrity_hash` | SIM | |
| `jurisdiction` | condicional | quando aplicável |
| `classification` | SIM | PUBLIC · TENANT · INTERNAL_ONLY |

❌ PII em `payload`. ❌ documento bruto. ❌ biometria. ❌ segredo. ❌ peso, fórmula, feature ou threshold do HFS.

### 2.3 Famílias de evento — a mapear contra o código

| Família | Cobertura esperada | Exposto por | Estado real |
|---|---|---|---|
| `case.*` | criação, transição, atribuição, SLA, reabertura | API + webhook | NOT_EVIDENCED |
| `evidence.*` | solicitação, resultado, divergência, expiração | API + webhook | NOT_EVIDENCED |
| `document.*` | upload, integridade, malware, processamento, retenção | API + webhook | NOT_EVIDENCED |
| `decision.*` | rascunho, checker, decisão, override, apelação | API + webhook | NOT_EVIDENCED |
| `config.*` | draft, simulação, publicação, rollback | API + webhook | NOT_EVIDENCED |
| `provider.*` | health, failover, circuito, kill switch | API + webhook | NOT_EVIDENCED |
| `tenant.*` | provisioning, sessão, acesso negado, cross-tenant | API parcial | NOT_EVIDENCED |
| `api.*` | entrega, retry, DLQ, assinatura, replay | API + webhook | NOT_EVIDENCED |
| `job.*` | fila, execução, falha, DLQ | interno | NOT_EVIDENCED |
| `governance.*` | gate, gap, waiver, ADR, release | API interna | NOT_EVIDENCED |
| `security.*` | secret, vulnerabilidade, incidente, exposição | API interna | NOT_EVIDENCED |
| `hfs.*` | sinal, alerta, model_version, degraded, kill switch | API sem metodologia | NOT_EVIDENCED |

### 2.4 Garantias exigidas

Outbox transacional · entrega ao menos uma vez · consumidor idempotente · ordenação por `subject_ref` · assinatura no webhook · janela de replay · retry com backoff · DLQ observável · redelivery manual auditada · log de entrega consultável por API · retenção definida por classificação.

## 3. Exposição por API — requisito novo

Decisão do Program Owner, 2026-08-09: **todo status e todo evento canônico deve ser consultável por API versionada e publicado por webhook assinado**, salvo classificação `INTERNAL_ONLY` justificada e registrada neste arquivo.

Endpoints mínimos exigidos (CAP-18):

| Endpoint | Finalidade | Estado real |
|---|---|---|
| `GET /v1/status-catalog` | catálogo vivo de status, por domínio e versão | NOT_EVIDENCED |
| `GET /v1/event-catalog` | catálogo vivo de tipos de evento e versões | NOT_EVIDENCED |
| `GET /v1/cases/{id}/status` | status atual server-authoritative | NOT_EVIDENCED |
| `GET /v1/cases/{id}/timeline` | histórico de transições com actor e motivo | NOT_EVIDENCED |
| `GET /v1/cases/{id}/evidence` | evidências com status normalizado e lineage | NOT_EVIDENCED |
| `GET /v1/events` | consulta paginada e filtrável de eventos | NOT_EVIDENCED |
| `GET /v1/events/{id}` | evento individual | NOT_EVIDENCED |
| `GET /v1/webhooks/deliveries` | log de entrega, retry, DLQ | NOT_EVIDENCED |
| `POST /v1/webhooks/deliveries/{id}/redeliver` | redelivery auditada | NOT_EVIDENCED |
| `GET /v1/providers/health` | health por capability e economic_group | NOT_EVIDENCED |
| `GET /v1/kpis/{id}` | KPI com valor, as_of e freshness | NOT_EVIDENCED |
| `GET /v1/reports/{id}` | relatório parametrizável e auditado | NOT_EVIDENCED |

Toda resposta carrega `as_of` e `freshness`. Dado ausente devolve `unavailable`, `stale` ou `partial` — **nunca zero**.

## 4. KPIs de governança — família nova

Os 82 KPIs existentes medem produto e operação. Nenhum mede o programa. Família `KPI-GOV`, proposta:

| ID | Nome | Unidade | Fórmula |
|---|---|---|---|
| KPI-GOV-001 | Gaps abertos por severidade | count | count(gap OPEN) por severidade |
| KPI-GOV-002 | Blockers críticos vigentes | count | count(blocker OPEN, severidade CRITICA) |
| KPI-GOV-003 | Idade média do gap crítico | dias | media(now - detected_at) |
| KPI-GOV-004 | Waivers vigentes e validade | count | count(waiver ativo), com vencimento |
| KPI-GOV-005 | ADRs pendentes de decisão | count | count(ADR em PROPOSED ou IN_REVIEW) |
| KPI-GOV-006 | Cobertura de evidência por capability | % | capabilities com evidence / total |
| KPI-GOV-007 | Screens homologados | % | screens PASS / 80 |
| KPI-GOV-008 | Capabilities READY | % | READY / 22 |
| KPI-GOV-009 | Gates PASS | % | gates PASS / gates aplicáveis |
| KPI-GOV-010 | Drift documentação x código | count | divergências abertas no registry |
| KPI-GOV-011 | Requisitos CANONICAL | % | CANONICAL / total de requisitos |
| KPI-GOV-012 | Cobertura de status por API | % | status expostos / status canônicos |
| KPI-GOV-013 | Cobertura de evento por webhook | % | tipos publicados / tipos canônicos |
| KPI-GOV-014 | Achados de segurança abertos | count | por severidade, com aging |
| KPI-GOV-015 | Tempo em BLOCKED por dependência | dias | média por tipo de dependência |

`KPI-GOV-012` e `KPI-GOV-013` medem exatamente o requisito da seção 3. Hoje ambos valem **0%**.

## 5. Filtros e relatórios novos

Acrescentar aos 20 filtros canônicos:

| ID | Filtro | Regras |
|---|---|---|
| FLT-021 | Tipo de evento | por família e versão |
| FLT-022 | Status canônico | por domínio, usando os IDs deste arquivo |
| FLT-023 | Classificação do evento | PUBLIC / TENANT / INTERNAL_ONLY |
| FLT-024 | Correlation ID | rastreio ponta a ponta |
| FLT-025 | Actor | usuário, sistema ou provider |

Acrescentar aos 12 relatórios canônicos:

| ID | Relatório | Público | Conteúdo |
|---|---|---|---|
| RPT-013 | Cobertura de status e eventos | Governança/Engenharia | status e eventos canônicos x implementados x expostos |
| RPT-014 | Trilha de eventos por case | Compliance/Auditoria | sequência completa com actor, motivo e correlação |
| RPT-015 | Saúde de entrega de eventos | Developer/Plataforma | entrega, retry, DLQ, redelivery, assinatura |
| RPT-016 | Painel de governança do programa | Program Owner | KPI-GOV-001..015 consolidados |

## 6. Estado atual medido

| Dimensão | Canônico | Implementado | Exposto por API | Cobertura |
|---|---|---|---|---|
| Status | 100+ IDs neste arquivo | NOT_EVIDENCED | 0 | 0% |
| Tipos de evento | 12 famílias | NOT_EVIDENCED | 0 | 0% |
| KPIs de produto | 82 | 0 | 0 | 0% |
| KPIs de governança | 15 | 0 | 0 | 0% |
| Filtros | 25 | NOT_EVIDENCED | 0 | 0% |
| Relatórios | 16 | NOT_EVIDENCED | 0 | 0% |
| Endpoints de status/evento | 12 | 0 | 0 | 0% |

Base: `CAP-18` ABSENT (C16, C22, C23), `CAP-21` apenas C1 em `UI_ONLY`, `GAP-ONB-017` observabilidade ausente, `GAP-ONB-025` sem `required_status_checks`.

## 7. Gaps que este arquivo abre

| Gap | Título | Severidade | Gate |
|---|---|---|---|
| GAP-ONB-031 | Sem catálogo canônico de status: estados viviam como prosa, sem ID, dono, transição ou versão | ALTA | G2 |
| GAP-ONB-032 | Sem taxonomia nem registry de eventos de domínio; nomenclatura, versionamento e envelope inexistentes | CRÍTICA | G2/G7 |
| GAP-ONB-033 | Status e eventos não expostos por API versionada nem por webhook assinado | CRÍTICA | G7 |
| GAP-ONB-034 | Sem família de KPIs de governança: o programa não se mede | ALTA | G9 |
| GAP-ONB-035 | Outbox, idempotência, DLQ, replay protection e delivery log não evidenciados | ALTA | G7 |

## 8. Status deste arquivo (apêndice)

`PROPOSED`. Nasce da decisão do Program Owner de 2026-08-09. Só vira `CANONICAL` após reconciliação com o domínio vigente, decisão formal e registro no `ONB-REG-001`.

Nenhum status, evento, endpoint ou KPI aqui está implementado. Este arquivo define o alvo, não o estado.

> Nota de reconciliação: o SRC-045 (Parte I) posteriormente incorporou este apêndice por referência como "APÊNDICE CANÔNICO DETALHADO". Onde houver divergência de estado documental, vale a precedência declarada no SRC-045.

---

# PARTE III — TRILHA DE AUDITORIA REGULATÓRIA E EVIDÊNCIAS (ONB-ARQ-005 v1.0 / SRC-040)

**Status:** CANONICAL AUDIT/EVIDENCE CONTRACT — implementação separada por evidência.
**Modelo:** append-only, tamper-evident e orientado a eventos.
**Owner por papel:** Arquitetura / Segurança / Compliance / Dados.
**Uso:** interno — produto, compliance, arquitetura, engenharia, QA e auditoria.

**Princípio de uso:** este documento especifica controles do produto. Não substitui parecer jurídico/regulatório nem dispensa validação de aplicabilidade pela área competente.

## 1. Objetivo

Transformar a trilha de cadastro, termos, validações externas e screening em uma projeção confiável de eventos reais do domínio. O workbook fornecido pelo Program Owner evidencia o tipo de informação operacional útil; este contrato preserva essa utilidade sem replicar PII bruta em cada evento.

## 2. Mapeamento do workbook de referência

| Origem | Campo referência | Destino canônico | Regra |
|---|---|---|---|
| Esteira de Cadastro | Processo | `case_id` / `process_ref` | ID canônico, não descrição livre |
| Esteira de Cadastro | Situação / Etapa | `status_id` + `step_id` | Status vem do catálogo; etapa é dimensão separada |
| Esteira de Cadastro | Data Evento | `occurred_at` | UTC no armazenamento; timezone na apresentação |
| Esteira de Cadastro | Procedimento | `event_type` / `action_code` | Evento versionado, não texto sem contrato |
| Esteira de Cadastro | Dados / Resultado | `diff_summary` + `payload_ref` + `evidence_refs` | Não copiar snapshot PII completo para cada evento |
| Esteira de Cadastro | IP | `network_context_ref` | Coleta/retention conforme necessidade e política |
| Esteira de Cadastro | Navegador | `device_context_ref` | Metadado minimizado; não fingerprint indiscriminado |
| Esteira de Cadastro | Usuário | `actor` | actor_type/id/role/authority; sem usuário genérico em mutação material |
| Termos e Aceites | Termo/Versão/Data Aceite | acceptance event + `term_version` + hash | Aceite é fato imutável e versionado |
| Validações Bureau | Dado informado x fonte | EvidenceEnvelope + discrepancy | Preservar provenance e divergência, não last-write-wins |
| Risco e Listas | Score/PEP/listas | screening/risk evidence + disposition | Score não substitui explicabilidade, versão e decisão |

## 3. AuditEvent mínimo

- `audit_id`/`event_id`; `event_type`/version; `occurred_at`; `recorded_at`; `tenant_id`; `jurisdiction_code` quando aplicável;
- `case_id`/`subject_ref`/`entity_ref`; `actor_type` + `actor_ref` + role + authority; `channel_id` quando aplicável; `interaction_source`;
- `correlation_id` + `causation_id` + `trace_id` quando distribuído; request/idempotency refs quando aplicável;
- `previous_status`/`new_status`; `action_code`; `reason_codes`; `requirement_version`; `policy_version`; `config_version`;
- `before_ref`/`after_ref` ou `field_diff` minimizado; `evidence_refs`; provider/source refs; document/term version refs;
- classification/sensitivity/`retention_class`/`data_region`; `integrity_hash`/signature quando aplicável.

## 4. Eventos obrigatórios de auditoria

- Criação/submissão/transição/reabertura/fechamento do case;
- alteração de dado cadastral material e alteração de UBO/representante;
- upload/substituição/expiração/legal hold/deleção/crypto-shred de documento;
- apresentação, aceite, recusa, retirada e supersession de termo/declaração;
- consulta a provider/fonte oficial, resultado, timeout, divergência e disposição humana;
- decisão, maker/checker, override, apelação e tentativa de self-approval;
- acesso privilegiado, export/download de dossiê, alteração de policy/flow/config e publicação;
- geração/transmissão/reconciliação de output regulatório, incluindo CCS quando aplicável;
- webhook delivery/redelivery, DLQ e replay manual;
- incidentes e alterações de status operacional que afetem evidência ou obrigação regulatória.

## 5. Imutabilidade e integridade

- Audit/event store é append-only. Correção de fato gera novo evento compensatório/corretivo.
- Não existe "editar histórico" em UI. Read model pode recalcular apresentação sem modificar fatos.
- Hash/integrity chain pode ser aplicado por lote/evento conforme threat model; a implementação precisa ser verificável.
- Backups, retenção e acesso a trilhas seguem classificação e obrigação aplicável.
- Clock, ordering e duplicate delivery não podem alterar causalidade lógica; `event_id` e idempotência são first-class.

## 6. PII e segurança da trilha

- Evento carrega IDs e referências; dados sensíveis volumosos ficam em storage/evidence domain apropriado.
- Field diff deve ser permitido apenas para campos cuja exposição na trilha seja necessária; demais usam `before_ref`/`after_ref`.
- Não registrar secrets, tokens, sessão, documento bruto, biometria bruta, metodologia HFS ou payload de provider sem minimização.
- Acesso à trilha é server-authoritative, tenant-bound, com RLS quando armazenada em PostgreSQL e auditado quando privilegiado.

## 7. Exportação de auditoria

Exportações CSV/XLSX/PDF são projeções autorizadas da trilha e devem registrar `export_id`, filtros, schema/version, `generated_at`, `generated_by`/service, tenant, scope, sensitivity, row/event count, hash e evidence bundle. A exportação não vira a fonte da verdade.

## 8. Queries e UX

- B11 Trail/Access e B3 Evidence consomem read models paginados e correlacionáveis.
- Filtros: case, actor, event_type, status, capability, provider/source, date range, correlation, requirement/policy version, severity/classification.
- UI oferece timeline humana; API oferece contrato estável; ambos vêm dos mesmos fatos.
- Dado indisponível é explicitado como unavailable/partial/stale, nunca inferido ou fabricado.

## 9. Critérios de aceite

- Mutação material sem actor/correlation deve falhar ou ser classificada como system actor formal, nunca silently anonymous.
- Replay/idempotent retry não duplica evento de negócio nem efeitos.
- Cross-tenant read/write é negado e gera security event.
- Self-approval é bloqueado e auditado.
- Alteração de termo/policy cria nova versão e mantém eventos antigos reprodutíveis.
- Export hash e event counts permitem provar integridade do artefato produzido.

## Fontes oficiais e referências (ONB-ARQ-005)

A aplicabilidade deve ser revalidada contra a versão vigente da fonte oficial antes de cada release regulatório. O catálogo não deve depender de memória ou cópia estática de norma.

- Banco Central do Brasil — Cadastro de Clientes do Sistema Financeiro (CCS): https://www.bcb.gov.br/meubc/cadastroclientes
- Banco Central do Brasil — Resolução BCB nº 179/2022 (CCS): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=179&tipo=Resolu%C3%A7%C3%A3o%20BCB
- Banco Central do Brasil — Leiautes de arquivos autorizados a trafegar na RSFN: https://www.bcb.gov.br/estabilidadefinanceira/leiautearquivosrsfn
- Banco Central do Brasil — Circular nº 3.978/2020 (PLD/FT e conhecimento do cliente): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=3978&tipo=Circular
- Banco Central do Brasil — Manual da Supervisão, identificação e qualificação do cliente: https://www3.bcb.gov.br/gmn/visualizacao/exibirConsulta.do?itemManualId=11864&method=visualizarDocumentoInternet
- Banco Central do Brasil — Resolução CMN nº 4.893 (segurança cibernética, trilhas e controles, conforme aplicabilidade): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=4893&tipo=Resolu%C3%A7%C3%A3o%20CMN
- Banco Central do Brasil — Resolução BCB nº 85 (segurança cibernética, conforme aplicabilidade): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=85&tipo=Resolu%C3%A7%C3%A3o%20BCB

## 10. Relação com o registro mestre de status e eventos

Este documento especializa audit trail, evidências, aceites, consultas externas, decisões e exports regulatórios. O catálogo e a semântica mestre de status/eventos pertencem ao SRC-045 / ONB-ARQ-004, com o SRC-044 como apêndice detalhado incorporado por referência. O EvidenceEnvelope e routing seguem SRC-012 / ONB-ARQ-001.

Em caso de conflito, este documento não redefine status/event_type fora de sua especialização; deve referenciar IDs e schemas do registro mestre. Sua classificação CANONICAL é contratual e não comprova implementação append-only, integridade, export, actor/correlation ou evidence bundle em código.

## 11. Addendum semântico D0.6

Autoridade: SRC-048 / ONB-GOV-003 e ONB-REG-001/SEMANTIC_REGISTRY.

`channel_id` identifica o Channel first-class e permanece independente de `tenant_id`. `interaction_source` identifica a origem técnica da ação/fato. Toda referência histórica a `source_channel` neste documento deve ser interpretada como alias legado de `interaction_source`, nunca como substituto de `channel_id`.

AuditEvent deve preservar `tenant_id` e, quando aplicável, `channel_id`, `interaction_source`, `white_label_profile_id`/ref, actor, authority, `correlation_id`, `causation_id`, `trace_id` e `applicability_evaluation_id`/ref como dimensões distintas. White-label pode alterar apresentação, mas não reduz requisitos de auditoria, sensibilidade, exposição ou evidence.

Para termos/consentimentos, REQ-ONB-077 e SEM-019 reforçam: Document e ConsentAcceptance são conceitos distintos. A existência do documento, navegação ou clique genérico não prova aceite; o fato deve referenciar conteúdo/versão/hash apresentados e resposta/actor/contexto auditáveis.

---

# PARTE IV — ESPECIFICAÇÃO CCS / ARQUIVOS ACCS E RECONCILIAÇÃO (ONB-ARQ-006 v1.0 / SRC-041)

**Status:** CANONICAL CONDITIONAL CONTRACT — ativação somente com applicability=APPLICABLE e fonte/layout oficial vigente.
**Tema:** Cadastro de Clientes do Sistema Financeiro (CCS) — integração condicional por aplicabilidade.
**Owner por papel:** Compliance / Arquitetura / Engenharia / Operações.
**Uso:** interno — produto, compliance, arquitetura, engenharia, QA e auditoria.

**Princípio de uso:** este documento especifica controles do produto. Não substitui parecer jurídico/regulatório nem dispensa validação de aplicabilidade pela área competente.

## 1. Regra de aplicabilidade

CCS não é uma função habilitada para todos os tenants. A ativação exige que a entidade/participante e o relacionamento estejam sujeitos à obrigação aplicável e que Compliance/Jurídico tenham registrado a decisão de aplicabilidade. Para casos não aplicáveis, o sistema preserva `NOT_APPLICABLE_WITH_REASON` e não produz arquivo CCS.

## 2. Escopo do CCS

O CCS registra relacionamentos de clientes e representantes com instituições participantes. Ele não é um extrato, não registra saldos ou movimentações e não substitui o dossiê KYC/KYB. O domínio Onboarding fornece dados e eventos necessários ao ciclo de relacionamento; o output CCS é uma projeção regulatória específica.

## 3. Leiautes oficiais a suportar

| Código | Finalidade funcional | Papel no ciclo |
|---|---|---|
| ACCS001 | Atualização diária de relacionamentos de clientes | Outbound/atualização |
| ACCS002 | Resposta ao ACCS001 | Inbound/resposta |
| ACCS003 | Validação de relacionamentos | Controle/validação |
| ACCS004 | Posição cadastral | Controle/posição |
| ACCS005 | Detalhamento de relacionamento | Request/response flow |
| ACCS006 | Resposta ao ACCS005 | Inbound/resposta |
| ACCS009 | Ocorrências no ACCS001 | Inbound/erros/ocorrências |
| ACCS0010 | Transferência de relacionamentos — sequência oficial | Condicional |
| ACCS0011 | Transferência de relacionamentos — sequência oficial | Condicional |
| ACCS0012 | Transferência de relacionamentos — sequência oficial | Condicional |

A estrutura de campos, cardinalidades, tipos e validações de cada arquivo deve ser lida do XSD/layout oficial vigente do Banco Central e version-pinned no processo de geração. Este documento deliberadamente não replica nem inventa o XSD.

## 4. Modelo interno mínimo para geração

- `ccs_obligation_id`, `tenant_id`, `regulated_entity_id`, `participant_code`/ref e `applicability_decision_id`;
- customer/subject canonical ref, identifier type/value reference, person type, residence/seat country;
- `relationship_type`/code conforme mapping aprovado, `relationship_start`, `relationship_end` quando aplicável;
- representative canonical refs e authority interval quando o layout/regra exigir;
- source case/evidence refs, effective rule version, data freshness/`as_of`, correction/supersession metadata.

Nunca usar texto de UI como valor regulatório: mappings são catalogados, versionados e testados contra XSD.

## 5. Pipeline de geração e reconciliação

1. Selecionar somente registros elegíveis pela applicability rule e cutoff/janela correspondente.
2. Congelar dataset lógico do lote com `batch_id`, `rule_version`, `layout_version` e `as_of`.
3. Gerar arquivo/mensagem pelo adapter CCS usando mapping versionado.
4. Validar localmente contra XSD e business rules implementáveis antes de transmissão.
5. Calcular hash, registrar row/record count e criar evidence bundle do lote.
6. Transmitir por canal homologado/autorizado; registrar `transmission_id` e timestamps.
7. Ingerir ACCS de resposta/ocorrência e correlacionar por lote/registro.
8. Classificar accepted/rejected/occurrence/needs_correction sem alterar o fato original.
9. Criar correction item, corrigir dado fonte ou mapping com trilha apropriada, gerar novo lote/reenvio.
10. Reconciliar situação final e manter histórico de todos os arquivos, responses e tentativas.

## 6. Estados propostos do ciclo CCS

Estes estados são PROPOSTOS para posterior inclusão no registry de status, sem se tornarem canônicos automaticamente:

`ELIGIBILITY_PENDING`, `NOT_APPLICABLE`, `READY_TO_GENERATE`, `GENERATED`, `SCHEMA_VALIDATED`, `VALIDATION_FAILED`, `READY_TO_SEND`, `SENT`, `ACKNOWLEDGED`, `OCCURRENCE_RECEIVED`, `REJECTED`, `CORRECTION_REQUIRED`, `RESENT`, `RECONCILED`, `CLOSED`.

## 7. Eventos propostos

```
onboarding.regulatory.ccs.applicability_decided.v1
onboarding.regulatory.ccs.batch_generated.v1
onboarding.regulatory.ccs.schema_validated.v1
onboarding.regulatory.ccs.transmitted.v1
onboarding.regulatory.ccs.response_received.v1
onboarding.regulatory.ccs.occurrence_detected.v1
onboarding.regulatory.ccs.correction_required.v1
onboarding.regulatory.ccs.batch_resent.v1
onboarding.regulatory.ccs.reconciled.v1
```

## 8. Evidência do lote

- `batch_id`, layout code/version, XSD hash/ref, generator version/commit, rule/application version, `generated_at`;
- input selection hash/count, output file hash/size/count, validation result, transmission ref, response/occurrence refs;
- actor/service identity, tenant/regulatory entity, `correlation_id`, retries/resends, final reconciliation status;
- acesso e download do arquivo são auditados; arquivo regulatório é classificado e protegido conforme conteúdo.

## 9. Testes obrigatórios

- Golden fixtures por layout version, XSD validation e negative fixtures;
- caracteres/identificadores válidos e inválidos, incluindo evolução de identificadores brasileiros suportada pelo domínio;
- datas de abertura/encerramento, representante, duplicate/idempotent generation e correction flows;
- no-output para NOT_APPLICABLE e fail-closed para applicability desconhecida material;
- cross-tenant isolation; unauthorized export/download; tamper detection/hash;
- response/occurrence parsing e reconciliação; retry sem duplicar lote lógico indevidamente;
- regression test quando BCB publicar novo XSD/layout ou nova regra.

## 10. Gate de produção

Nenhum tenant/entidade que dependa de CCS pode entrar em produção para o escopo correspondente sem: decisão de aplicabilidade, participant/channel readiness, mappings aprovados, XSD oficial versionado, testes e fixtures, homologação do canal, reconciliação demonstrada, runbook de rejeições/ocorrências e evidência de segurança/auditoria.

## Fontes oficiais e referências (ONB-ARQ-006)

A aplicabilidade deve ser revalidada contra a versão vigente da fonte oficial antes de cada release regulatório. O catálogo não deve depender de memória ou cópia estática de norma.

- Banco Central do Brasil — Cadastro de Clientes do Sistema Financeiro (CCS): https://www.bcb.gov.br/meubc/cadastroclientes
- Banco Central do Brasil — Resolução BCB nº 179/2022 (CCS): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=179&tipo=Resolu%C3%A7%C3%A3o%20BCB
- Banco Central do Brasil — Leiautes de arquivos autorizados a trafegar na RSFN: https://www.bcb.gov.br/estabilidadefinanceira/leiautearquivosrsfn
- Banco Central do Brasil — Circular nº 3.978/2020 (PLD/FT e conhecimento do cliente): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=3978&tipo=Circular
- Banco Central do Brasil — Manual da Supervisão, identificação e qualificação do cliente: https://www3.bcb.gov.br/gmn/visualizacao/exibirConsulta.do?itemManualId=11864&method=visualizarDocumentoInternet
- Banco Central do Brasil — Resolução CMN nº 4.893 (segurança cibernética, trilhas e controles, conforme aplicabilidade): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=4893&tipo=Resolu%C3%A7%C3%A3o%20CMN
- Banco Central do Brasil — Resolução BCB nº 85 (segurança cibernética, conforme aplicabilidade): https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=85&tipo=Resolu%C3%A7%C3%A3o%20BCB

## 11. Regra de canonicalidade condicional

Este documento é CANONICAL como contrato de capability/output CCS/ACCS do produto, mas a capability permanece desabilitada para qualquer tenant/entidade/relacionamento sem decisão formal de aplicabilidade. CANONICAL aqui não significa que CCS seja obrigação de todo cliente, nem que adapter, canal, XSD, homologação ou reconciliação estejam implementados.

Os estados e eventos CCS listados nas seções 6 e 7 permanecem PROPOSTOS até inclusão expressa no registry mestre SRC-045/SRC-044. O layout técnico deve sempre ser version-pinned a partir da fonte oficial vigente, nunca congelado neste documento.
