---
titulo: "Arquitetura Técnica — Fluxos Front/Backend/Providers, Baseline D2, Multi-Jurisdição e Capability/Evidence/Routing/Handoffs"
fontes:
  - "ONB-ARQ-003 — Fluxos Técnicos Front/Backend/Providers v1.0 (SRC-029)"
  - "ONB-BAS-001 — Baseline Técnico Reconciliado D2 v0.4 (SRC-008)"
  - "ONB-INT-001 — Arquitetura Multi-Jurisdição e Global v1.0"
  - "ONB-ARQ-001 — Capability, Evidence, Routing e Handoffs v1.0 (SRC-012)"
status_fonte:
  - "ONB-ARQ-003: CANONICAL ARCHITECTURE TARGET — implementação técnica separada por evidência"
  - "ONB-BAS-001: D0.5_COMPLETE / REVIEW_REQUIRED — baseline técnico reconciliado read-only; não é release baseline"
  - "ONB-INT-001: CANONICAL GLOBAL ARCHITECTURE — market readiness separado por jurisdição/evidência"
  - "ONB-ARQ-001: CANONICAL ARCHITECTURE CONTRACT — estado técnico separado por evidência"
gerado_em: 2026-08-09
---

# 10 — Arquitetura Técnica do Mutual Onboarding

Este documento consolida quatro fontes canônicas da arquitetura técnica do programa **Mutual Onboarding Corporativo**: os fluxos técnicos ponta a ponta (ONB-ARQ-003), o baseline técnico reconciliado D2 (ONB-BAS-001 v0.4), a arquitetura multi-jurisdição/global (ONB-INT-001) e o contrato de primitivas Capability/Evidence/Routing/Handoffs (ONB-ARQ-001).

**Divisão de autoridade documental** (conforme ONB-ARQ-001, seção 16):

| Fonte | Autoridade |
|---|---|
| SRC-012 / ONB-ARQ-001 | Primitivas de capability, adapter, evidence, reconciliation e routing |
| SRC-029 / ONB-ARQ-003 | Fluxos técnicos ponta a ponta e boundaries entre camadas |
| SRC-045 / ONB-ARQ-004 | Registro mestre de status, eventos, observabilidade, API e webhooks |
| SRC-044 / STATUS_EVENT_REGISTRY_V1.md | Apêndice detalhado das matrizes de status/exposição, incorporado por referência pelo SRC-045 |
| SRC-040 / ONB-ARQ-005 | Especialização de trilha de auditoria regulatória, evidências e exports |

Em conflito de semântica de status/evento/exposição, prevalecem: decisão/ADR e requirement CANONICAL, depois SRC-045; SRC-044 complementa o detalhe onde não houver conflito. Estado técnico permanece REAL/PARTIAL/UI_ONLY/PROTOTYPE/ABSENT/NOT_EVIDENCED conforme evidência.

---

# PARTE I — FLUXOS TÉCNICOS FRONT / BACKEND / PROVIDERS (ONB-ARQ-003 v1.0)

**Status:** CANONICAL ARCHITECTURE TARGET — implementação técnica separada por evidência.

## 1. Objetivo

Definir a arquitetura técnica que sustenta as experiências A/B/C/D sem permitir que frontend, provider ou integração periférica se tornem fonte da verdade. O documento deve ser usado junto do ONB-UX-001, ONB-UX-002 e ONB-UX-003.

## 2. Responsabilidades por camada

| Camada | Responsabilidade |
|---|---|
| **Frontend** | Renderizar estado autorizado, coletar input, fornecer feedback, manter estado local efêmero e enviar comandos/intents. Não decide risco, não escolhe provider por regra de negócio, não calcula autorização e não inventa status. |
| **BFF/Application API** | Autenticação/contexto, validação de request, idempotency, autorização por capability, composição de read models e chamada de use cases. |
| **Domain/Application** | Lifecycle do case, rules/state machine, requirements, policies, decisions, authorities, handoffs e invariantes. |
| **Orchestrator** | Resolver capabilities requeridas, routing, timeout/retry/fallback, normalização, reconciliação e evidence creation. |
| **Adapters** | Tradução entre contract interno e provider/official source/internal capability. Não vazam payload externo para domínio. |
| **PostgreSQL** | Fonte canônica de entidades, case, configuração, evidências normalizadas, audit e estados. RLS/FORCE RLS permanece hard invariant. |
| **Object Storage** | Binários/documentos; banco mantém metadata, integridade, versionamento e object key. |
| **Workers/Queues** | Webhooks, revalidação, expiração, retenção, exports, jobs de provider e tarefas assíncronas. |
| **Observability** | Correlation IDs, logs seguros, metrics, traces, health, SLO/alerting. |

## 3. Fluxo de criação de case

```
Canal/Cliente
  -> API/Hosted Flow
  -> Authentication + Tenant Resolution
  -> Idempotency Check
  -> Create Case Use Case
  -> PostgreSQL com RLS
  -> Audit Event
  -> Response com case_id
```

**Controles:** request sem tenant válido falha; duplicate key retorna mesma operação quando contrato permitir; `case_id` é interno e único.

## 4. Fluxo de jornada

```
Web Jornada
  -> GET read model do case/step atual
  -> servidor calcula flow/policy aplicável
  -> frontend renderiza somente etapa atual
  -> usuário envia command da etapa
  -> use case valida input + auth + state
  -> persiste dado/evidência
  -> state transition
  -> próximo read model
```

O stepper é projeção de flow/policy, nunca fonte da sequência.

## 5. Fluxo de capability externa

```
Policy Engine
  -> Capability Request
  -> Routing Engine
      -> Provider Adapter A
      -> Provider Adapter B
      -> Official Source Adapter
      -> Internal Capability
  -> Normalizer
  -> EvidenceEnvelope
  -> Reconciliation
  -> Policy/Case Decision Context
```

**Controles:** timeout explícito; retry idempotente; circuit breaker; `economic_group`; status UNKNOWN/INCONCLUSIVE; provider response nunca sobrescreve case diretamente.

## 6. Contrato Evidence Envelope (visão ONB-ARQ-003)

Campos mínimos propostos: `evidence_id`, `tenant_id`, `case_id`, subject/entity_id, `capability_id`, `source_type`, provider/source id, `request_id`, `correlation_id`, `performed_at`, `received_at`, `provider_version`, `jurisdiction`, `normalized_status`, confidence quando aplicável, `reason_codes`, `normalized_result`, `raw_reference` controlada, `integrity_hash`, lineage, expiry, `retention_class` e `created_by`/system actor.

Raw payload sensível deve ficar segregado/criptografado ou referenciado, nunca despejado em UI/log.

## 7. Fluxo de documento

```
Cliente
  -> solicita autorização de upload
  -> backend valida case/tenant/tipo/limite
  -> upload direto ou mediado para Object Storage
  -> integrity hash + MIME/size
  -> malware scanning hook
  -> metadata persistida no banco
  -> documento/evidência entra no case
  -> policy pode acionar OCR/autenticidade/liveness correlato
```

**Controles:** URLs temporárias, object key não previsível, versionamento, retention, legal hold, delete/crypto-shred, tenant-aware access.

## 8. Fluxo de biometria

```
Jornada/SDK
  -> session/attempt server-side
  -> provider adapter
  -> normalized result
  -> EvidenceEnvelope
  -> policy/contexto do case
```

A UI mostra instrução, captura e status; score bruto só aparece quando permitido. Retry/fallback depende de policy e reason code, não de heurística do browser.

## 9. Fluxo de decisão

```
Analista abre B12
  -> backend carrega evidence summary + authority
  -> usuário escolhe ação + reason
  -> Decision Service valida state + role/capability + alçada
  -> verifica maker-checker
  -> cria decision record/evidence/audit
  -> executa state transition atômica
  -> publica domain event
  -> handoff/notificação quando aplicável
```

**Controles:** self-approval bloqueado; transição ilegal falha; decisão não pode existir só no frontend.

## 10. Fluxo de pendência/complemento

Analista → Request Complement Use Case → registra escopo, prazo e motivo → Notification Worker → usuário retoma etapa autorizada → nova versão de dado/documento → case volta para fila. Versões antigas permanecem rastreáveis conforme retention.

## 11. Fluxo de webhook outbound

```
Domain Event -> Outbox persistente -> Dispatcher -> assinatura com timestamp -> endpoint tenant -> resposta -> Delivery Log.
Falha -> retry policy -> DLQ/estado final -> redelivery manual autorizado.
```

**Controles:** assinatura, replay window, `delivery_id`, `event_id`, idempotency, masking e observabilidade.

## 12. Fluxo de API pública

```
Client Credential/API Key -> Authentication -> tenant/scope binding -> rate limit -> idempotency -> endpoint versionado -> application use case -> response.
```

Developer Platform deve expor OpenAPI, scopes, examples, sandbox, request/correlation IDs e logs. Secret de credencial é tratado como secret e não como dado de UI comum.

## 13. Resolução de tenant

```
Session/API Credential
  -> membership/scopes
  -> tenant context server-side
  -> DB transaction
  -> SET LOCAL/context equivalente
  -> RLS/FORCE RLS
```

Qualquer caminho sem tenant deve falhar fechado. `TENANT_DEV` somente em ambiente de demo explicitamente segregado e impossível em produção.

## 14. Configuração e publicação

```
Draft Requirement/Flow/Policy/Product
  -> validate
  -> simulate
  -> diff
  -> submit approval
  -> maker-checker
  -> create immutable published version
  -> update active pointer
  -> audit + event
```

Rollback ocorre por ativação de versão segura/nova versão, não editando histórico publicado.

## 15. Provider Registry

Campos mínimos: `provider_id`, `legal_entity`, `economic_group`, capability coverage, countries, document coverage, regions, residency, environment, contract/DPA, subprocessors, SLA, timeout, retry, rate limits, cost model, quality, health, version, exit plan, restrictions e fallback independence.

Serasa/idwall devem ser tratados como rotas correlacionadas para continuidade e concentração.

## 16. HFS / CAP-22

```
Case/Canonical IDs -> InternalCapabilityContract -> HFS/Mutual Intelligence -> signals/alerts/evidence -> B22 -> human/policy decision.
```

Contrato deve incluir `model_version`, lineage, health, degraded mode, kill switch, correlation e purpose. Não incluir pesos, fórmulas, features proprietárias ou thresholds secretos em APIs públicas ou logs de frontend.

## 17. Retention e privacy

```
Jurisdiction/Tenant Policy -> scheduler -> candidate records -> legal hold check -> delete/anonymize/crypto-shred action -> evidence/audit.
```

UI C18/D12 governa políticas e status; execução é server-side. Retenção deve diferenciar categoria de dado, jurisdição, base legal, tenant e obrigação de preservação.

## 18. Observabilidade ponta a ponta

Cada request importante propaga `correlation_id`; operações assíncronas adicionam `job_id`/`delivery_id` preservando correlação. Telemetria mínima: request rate, errors, duration, DB, provider latency/error, queues, retries, webhook success, document processing, case SLA, policy latency e internal capability health.

Logs não contêm senha, session secret, token, documento bruto, biometria bruta ou PII sem necessidade operacional.

## 19. Fluxo de release

```
Commit/PR -> CI -> tests/migrations/build/security gates -> QA evidence -> Screen/Capability Registry -> Homologation Gate -> release artifact -> deploy autorizado -> production verification -> evidence.
```

CODE_COMPLETE não muda status para DONE. D14 consolida o estado, mas não substitui CI/QA/evidência real.

## 20. Boundaries com outros domínios

Backoffice Financeiro, CRM, Terminal, KYT e outros sistemas recebem contratos versionados. O Onboarding continua source of truth do seu lifecycle; não compartilha tabelas como contrato. Aprovação de onboarding não cria automaticamente autorização financeira. Handoff preserva `case_id`, customer/entity IDs e decision/evidence references pertinentes.

## 21. Frontend security model

Toda route/view possui permission mapping. Server Components/handlers/server actions validam sessão, tenant, membership e capabilities. APIs validam scopes. Mutação crítica registra `actor_id`. Frontend pode ocultar ações para UX, mas backend deve rejeitar chamada direta não autorizada.

## 22. Error model

Backend retorna erro estruturado seguro: `error_code`, `correlation_id`, user-safe message key, retriable flag e detalhes não sensíveis. UI localiza a mensagem e apresenta próxima ação. Erros de provider são normalizados; stack trace e payload secreto nunca chegam ao usuário.

## 23. Internacionalização técnica

Core usa identifier type/value/authority/country/jurisdiction como dados; strings são UTF-8; datas persistidas com timezone/instantes consistentes; locale é apresentação. JurisdictionPack e SegmentPack alimentam rules e UI schema. Não espalhar `if country == BR` em componentes.

## 24. Definition of Done técnica de uma tela

Route + read/write contracts; auth/tenant/capabilities; estados de domínio; loading/empty/error/degraded; dados e lineage; tests positivos/negativos; observability; accessibility/responsive; security checks; evidence ligada ao Screen ID. Sem esses itens a tela pode ser visualmente pronta, mas permanece PARTIAL/UI_ONLY.

## 25. Diagramas técnicos normativos

### 25.1 Context map do produto

```
Cliente/Canal/SDK/Hosted
        |
        v
[Public Integration / BFF]
        |
        v
[Application Use Cases] ---> [Audit / Evidence]
        |
        v
[Domain: Case + Requirements + Policy + Decision]
        |
        +--------> [Capability Orchestrator] ----> [External Provider Adapters]
        |                    |                    [Official Sources]
        |                    +------------------> [HFS Internal CAP-22]
        |
        +--------> [PostgreSQL + RLS/FORCE RLS]
        +--------> [Object Storage]
        +--------> [Outbox / Workers / Queues]
                                      |
                                      v
                           [Webhooks / Notifications]
```

**Invariante:** frontend, provider e webhook não são source of truth do case.

### 25.2 Sequência da jornada

```
User -> Web Jornada: abrir convite
Web Jornada -> BFF: validar sessão/convite
BFF -> Domain: resolve tenant + case + flow version
Domain -> Policy: resolve requirements/step
Policy -> Web Jornada: read model da etapa
User -> Web Jornada: submit step
Web Jornada -> BFF: command + idempotency
BFF -> Domain: auth + validation + transition
Domain -> Data: persist version/evidence/audit
Domain -> Orchestrator: capabilities requeridas
Orchestrator -> Adapters: execução/fallback
Adapters -> Orchestrator: normalized result
Orchestrator -> Evidence: EvidenceEnvelope
Domain -> Web Jornada: next step/status
```

### 25.3 Roteamento multiprovider

```
Capability Request
   |
   v
Routing Policy --(jurisdiction/tenant/health/cost/quality/economic_group)--> Candidate Routes
   |                     |                       |
   v                     v                       v
Provider A          Provider B              Official Source
   \_____________________|_______________________/
                         |
                         v
                    Normalizer
                         |
                         v
                  EvidenceEnvelope
                         |
                         v
                   Reconciliation
                         |
                         v
                    Policy/Case
```

**Regras:** timeout explícito; retry idempotente; correlated fallback não conta como independência; UNKNOWN/UNAVAILABLE preservados.

### 25.4 Maker-checker de decisão

```
Analyst(Maker) -> Decision Service: proposta + reason + evidence_refs
Decision Service -> Authorization: role/capability/alçada
Authorization -> SoD: maker != checker?
SoD --não--> REJECT
SoD --sim--> Pending Checker
Checker -> Decision Service: approve/reject proposal
Decision Service -> DB: decision + state transition + audit (atômico)
Decision Service -> Outbox: domain event
Outbox -> Downstream: notification/handoff
```

### 25.5 Tenant isolation / RLS

```
Session/API Credential
        |
        v
Identity + Membership/Scopes
        |
        v
Server-side Tenant Resolver
        |
        v
DB Transaction Context
        |
        v
RLS + FORCE RLS
        |
        +--> allowed row set
        +--> no tenant context = FAIL CLOSED
```

**Negative paths obrigatórios:** tenant A lê B; tenant A altera B; forged route/body; direct repository call; worker cross-tenant; cache contamination.

### 25.6 Pipeline documental

```
User/Delegate
   |
   v
Upload Authorization -> Object Storage -> Malware Scan
   |                              |
   v                              v
Metadata + Hash + Version <--- Processing Status
   |
   +--> OCR/Auth/Document Capability
   |
   +--> EvidenceEnvelope
   |
   +--> Case Requirement State
```

Retenção, legal hold, delete/anonymize/crypto-shred são operações server-side e auditáveis.

### 25.7 API + webhook

```
External Client -> API Gateway/BFF -> Auth/Scope/Tenant -> Rate Limit -> Idempotency -> Use Case
Use Case -> Domain -> DB/Outbox
Outbox -> Webhook Dispatcher -> Sign(timestamp+payload) -> Tenant Endpoint
Tenant Endpoint -> Delivery Log
Failure -> Retry Policy -> Final Failure/DLQ -> Authorized Redelivery
```

### 25.8 HFS / CAP-22

```
Case + Canonical IDs + Authorized Context
                 |
                 v
       InternalCapabilityContract
                 |
                 v
        HFS / Mutual Intelligence
                 |
          Signals / Alerts
                 |
                 v
 EvidenceEnvelope + model_version + lineage + health
                 |
                 v
        B22 Investigation Workspace
                 |
                 v
          Human/Policy Decision
```

Nunca expor pesos, fórmulas, features proprietárias ou thresholds em UI/API pública.

### 25.9 Release / homologação

```
Requirement -> Capability/Screen -> Task -> Branch/PR -> CI
    -> Tests/Security -> QA Evidence -> UAT -> D14 Gate
    -> Release Approval -> Deploy -> Production Verification
    -> Evidence + Registry Update
```

CODE_COMPLETE != DONE. Um release somente termina em PRODUCTION_VERIFIED ou estado formal de rollback/falha.

## Regra de maturidade documental (ONB-ARQ-003)

Os fluxos e boundaries deste documento são a arquitetura alvo CANONICAL. O status não comprova que cada componente, adapter, outbox, API, worker, storage, observabilidade ou controle esteja implementado. A D2 deverá mapear cada contrato para arquivos, schemas, migrations, testes e evidências reais do repositório.

---

# PARTE II — BASELINE TÉCNICO RECONCILIADO D2 (ONB-BAS-001 v0.4)

**Status:** D0.5_COMPLETE / REVIEW_REQUIRED — baseline técnico reconciliado read-only; não é release baseline.

## A. Estado atual comprovado

1. Existe planejamento v1.1 com posicionamento de produto, benchmark, arquitetura, 22 capabilities, 80 funções de tela, estratégia multiprovider, waves e gates.
2. O repositório técnico canônico apontado pelo programa é `Mutual-Processadora-de-Pagamentos/onboarding-corporativo`; a evidência técnica precisa ser refrescada e reconciliada nesta Wave 0 antes de qualquer nova implementação.
3. A pasta Mutual Onboarding é a raiz documental definida pelo dono do projeto. A pasta 00_EXECUCAO_CANONICA foi criada para os artefatos vivos de execução.
4. HFS / Mutual Intelligence é ativo proprietário da Mutual e deve ser tratado como CAP-22 interna.

## B. Classificação inicial

- Planejamento de produto e contrato documental: CANONICAL conforme SRC-001, ADR-019 e D1. Estado técnico permanece separado por evidência.
- 80 Screen IDs A1..D14: CANONICAL como baseline funcional. Implementação individual permanece em reconciliação D2; contagens 45/46 representam cobertura de protótipo/branch, não baseline funcional.
- 22 capabilities: CANONICAL como catálogo funcional; technical state/readiness individual continuam em reconciliação D2/D3.
- Providers: candidatos/RFP; nenhuma seleção final deve ser inferida sem dados comerciais, contratuais e técnicos.
- HFS/CAP-22: ownership e governança documental CANONICAL; integração técnica, model registry, health/degraded e evidência E2E permanecem NOT_EVIDENCED/PARTIAL.

## C. Fontes e contratos

- Fonte principal: planejamento v1.1.
- Fonte operacional: ONB-REG-001 Registro Mestre de Execução.
- Fonte de implementação: repositório e ambientes reais.
- Método: Mutual Program Execution e pack de domínio Onboarding/KYC/KYB.

## D. Implementação versus contrato — findings a reconciliar

1. **Autenticação:** documentação histórica referencia Clerk/A-014, enquanto evidência recente declarou autenticação própria. ADR-006 deve resolver a autoridade final.
2. **Telas:** documentos e commits apresentam contagens divergentes. SCREEN_REGISTRY v2 com 80 IDs deve substituir contagem manual e mapear cada ID para route/view/estado/evidência real.
3. **Naturezas regulatórias:** parte do material ainda fala em oito naturezas, enquanto decisão anterior incluiu correspondente bancário como nona natureza. Catálogo/UAT precisam convergir.
4. **CNPJ alfanumérico:** core genérico em string reduz risco, mas compatibilidade end-to-end não está evidenciada.
5. **CI:** declaração de testes em commit não substitui run evidence do HEAD/release commit.

## E. Gaps iniciais

| Gap | Descrição |
|---|---|
| GAP-ONB-001 | Auth docs x code |
| GAP-ONB-002 | Contagem/mapping de telas |
| GAP-ONB-003 | Naturezas regulatórias divergentes |
| GAP-ONB-004 | CNPJ alfanumérico end-to-end |
| GAP-ONB-005 | CI do baseline/release não consolidada: workflow real existe; PR #4 possui run PASS, mas o main SHA D2 não retornou workflow run/status na inspeção |
| GAP-ONB-006 | Dados comerciais/contratuais de providers |
| GAP-ONB-007 | CAP-22 possui governança canônica, mas contrato executável/model registry/validation evidence permanecem não evidenciados |
| GAP-ONB-008 | Padrão de handoff é canônico; HOF-001..006 ainda carecem de schemas/API/events executáveis, auth, idempotência, testes e evidence |

## F. ADRs/decisões prioritárias

| ADR | Tema |
|---|---|
| ADR-001 | Separação Onboarding x Backoffice |
| ADR-002 | Capability Contract Layer |
| ADR-003 | EvidenceEnvelope |
| ADR-004 | Routing/Fallback/Degraded Mode |
| ADR-005 | TypeScript strict + PostgreSQL/RLS |
| ADR-006 | Auth/RBAC/ABAC/SoD |
| ADR-007 | Retention/Residency/Crypto-shredding |
| ADR-008 | Official Source Eligibility |
| ADR-009 | Screen Registry v2 |
| ADR-010 | CAP-22 HFS |
| ADR-011 | Provider economic_group |
| ADR-012 | CNPJ alfanumérico |

## G. Riscos e blockers

| Risco | Descrição |
|---|---|
| R-16 | Concentração Serasa/idwall |
| R-17 | Acoplamento/caixa-preta HFS |
| R-18 | Scope creep KYT/PLD transacional |
| R-19 | Privacidade biométrica/PII |
| R-20 | Isolamento multi-tenant |
| R-21 | Provider timeout/degradação |

**BLOCKER G0:** documentação x código ainda não reconciliados o suficiente para declarar primeira capability READY.

## H. Matriz inicial de capabilities

CAP-01 a CAP-22 estão registradas no Registro Mestre. Nenhuma capability nova será marcada READY por estética, existência de tela ou texto de commit. A Definition of Ready deve ser preenchida capability por capability.

## I. Primeiro item READY

Ainda não determinado. TASK-W0-010 permanece BLOCKED até concluir pelo menos o mapping de fontes, ADRs P0 e estado real do repositório necessário à capability candidata.

## J. Itens BLOCKED

- Código novo fora de correção emergencial autorizada.
- Escolha final de provider sem RFP/RFI e due diligence.
- Release/homologação sem evidências G0–G10 e H-01–H-17 aplicáveis.

**Próximo passo:** atualizar este baseline após a inspeção atual do repositório, mapping das 80 telas, classificação de cada capability e fechamento das decisões P0 da Wave 0.

## K. Snapshot técnico D2 — 2026-08-09

Modo: read-only por ADR-018. Nenhuma alteração foi feita no GitHub.

### K.1 Repositório e corte de evidência

- Repositório exclusivo: `Mutual-Processadora-de-Pagamentos/onboarding-corporativo`.
- Branch padrão: `main`.
- Main SHA observado: `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`.
- Apps observadas: `svc-trabalhadores`, `web-console`, `web-jornada`, `web-painel`.
- Packages observados: `catalogo`, `dados`, `dominio`, `motor`, `orquestrador`.
- Workflows versionados: `qualidade.yml` e `publicar-prototipo.yml`.
- PR #4 permanece OPEN e não faz parte do main. Head observado: `13975fea59f55e3b25a3e5d2a27e5d73bd345c4d`. O workflow "Portão de qualidade" run 31259025328 está completed/success para esse head. Essa evidência é válida para o PR, não para o main/release.
- PR #5 permanece OPEN. Head observado: `8c6c882836cd78a0ba130faeceea44d053a38edc`. O diff versionado observado contém apenas `docs/execucao/README.md` com uma linha em branco; registries anexados ao corpo do PR não são baseline versionado.

### K.2 Stack e fundação — observado

- TypeScript strict é REAL no tsconfig base, incluindo `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` e `noImplicitOverride`. PNPM/Turbo/Vitest/Biome e scripts de build/check/test estão versionados.
- PostgreSQL/RLS é REAL na fundação de dados: `0001-isolamento.sql` habilita e força RLS nas tabelas centrais e usa `app.tenant_id`; `0002-papel-da-aplicacao.sql` cria papel `aplicacao` NOBYPASSRLS; `isolamento.test.ts` executa contra PostgreSQL real, assume o papel `aplicacao`, valida isolamento de leitura/gravação, ausência de tenant fail-closed, e imutabilidade de evidência/trilha.
- **Conclusão:** isolamento no banco = REAL. Isolamento multi-tenant E2E = PARTIAL porque o caminho `apps/web-painel/src/lib/painel.ts` ainda fixa `TENANT_DEV`.

### K.3 Evidence/audit foundation — observado

A migration 0001 impede UPDATE/DELETE de evidências e trilha; `isolamento.test.ts` verifica esse comportamento. A migration `0005-trilha-do-caso.sql` adiciona `caso_id` e índice de leitura por tenant/case/time. Isso comprova fundação append-only no banco, mas não comprova o contrato completo SRC-045/SRC-040 com actor/authority/correlation/causation/schema version/export/outbox/API/webhooks em todos os fluxos. GAP-ONB-031..037 permanecem abertos conforme escopo.

### K.4 Autenticação, autorização e SoD — observado

`packages/dados/src/acesso.ts` implementa autenticação própria com scrypt, salt/parâmetros no hash, comparação timing-safe, segredo de sessão aleatório e persistência apenas do digest. `0014-acesso.sql` cria usuários/sessões com RLS, associa `user_id` a atos e adiciona constraints `author != approver` para requisitos/produtos/fluxos.

Isso torna auth foundation = REAL e DB SoD invariant = REAL/PARTIAL. O README do main continua afirmando que não há login e que Clerk/A-014 é o plano, portanto contém drift documental. O layout do web-console observado não possui guard global; autorização deny-by-default E2E e propagação `user_id` em todas as mutações não estão comprovadas. ADR-006 permanece IN_REVIEW; GAP-ONB-001/009/010/023 permanecem abertos.

### K.5 Criptografia — observado

`packages/dados/src/cifra.ts` implementa AES-256-GCM, chave de dado por titular, envelope versionado e interface `EmbrulhadorDeChaves`. A implementação `EmbrulhadorLocal` é explicitamente desenvolvimento/teste; wrapper KMS/HSM gerenciado de produção, rotação e failure modes não foram observados. Portanto crypto foundation = REAL e production key management = NOT_EVIDENCED/PARTIAL (GAP-ONB-014/020).

### K.6 CI — observado

`qualidade.yml` é REAL e contém PostgreSQL 16, install frozen, guarda de fronteiras, integridade vendor, build lib-ui, typecheck, Biome, migrations, testes e build das três webs. No entanto, para o main SHA observado, as consultas de status/workflow runs não retornaram execução. Portanto workflow definition = REAL; CI do baseline/main/release = NOT_EVIDENCED neste snapshot. PR #4 possui CI PASS próprio.

Security scans dedicados (SAST/SCA/secret scanning) continuam NOT_EVIDENCED nesta inspeção e permanecem GAP-ONB-016.

### K.7 Matrizes D2

O ONB-REG-001 possui agora CODE_INVENTORY e TRACEABILITY_D2. CODE_INVENTORY registra artefatos técnicos observados sem transformar existência em prontidão. TRACEABILITY_D2 liga Source/Decision → Requirement → Capability → Screen/Contract → Code Artifact → Technical State → Evidence Observed/Expected → Gap → Gate.

### K.8 Estado da D2 neste checkpoint

| Área | Estado |
|---|---|
| Repositório/topologia | Reconciliado |
| RLS/FORCE RLS/append-only DB | Reconciliado como REAL na fundação |
| Auth foundation | REAL; IAM/authz E2E: PARTIAL |
| Tenant context E2E | PARTIAL por TENANT_DEV |
| CI definition | REAL; run do main/release: NOT_EVIDENCED |
| 80 Screen IDs | Mapping individual concluído no ONB-REG-001/SCREENS: 31 PARTIAL, 35 NOT_EVIDENCED e 14 ABSENT no main (toda a superfície D). Essa contagem mede cobertura técnica por função, não percentual de produto pronto. |
| CAP-01..22 | Technical state individual registrado no ONB-REG-001/CAPABILITIES: 16 PARTIAL e 6 NOT_EVIDENCED; nenhuma capability foi promovida a REAL ou READY apenas por possuir contrato, domínio, rota ou componente parcial. |
| Providers/regulatory/HFS/handoffs runtime | Reconciliados no checkpoint P desta v0.4; os gaps correspondentes permanecem abertos conforme a evidência observada. |

## L. Regra de uso desta versão

Este arquivo v0.4 substitui a leitura do baseline v0.1 dentro do mesmo File ID e histórico de revisões. A reconciliação técnica D0.5 foi concluída como inventário/classificação, mas o arquivo permanece REVIEW_REQUIRED até D0.6–D0.10, Blueprint Completion, cross-review e Documentation Freeze. Não utilizar esta versão para declarar homologação, release ou produção. O estado vivo detalhado está no ONB-REG-001/CODE_INVENTORY/TRACEABILITY_D2.

## M. Invariante D2 — multi-tenant, multicanal e white-label

REQ-ONB-069 e ADR-023 tornam absoluto que **Tenant e Canal são dimensões distintas de primeira classe**. A relação pode ser independente ou hierárquica por configuração versionada; não existe vínculo 1:1 obrigatório nem inferência automática de tenant a partir de canal ou vice-versa.

Estado observado no main: a fundação multi-tenant no banco é REAL (`tenant_id`, RLS/FORCE RLS) e o modelo de tenant já contém região, domínio, tema e logotipo, evidenciando uma fundação white-label. Porém a resolução de tenant E2E continua PARTIAL por TENANT_DEV em caminhos da aplicação. Canal, como contexto de primeira classe propagado em sessão/API/evento/evidência/audit/observabilidade e com topologia tenant↔canal independente/hierárquica, permanece NOT_EVIDENCED/PARTIAL nesta inspeção.

**Consequência de gate:** nenhuma capability poderá ser READY para produção se não demonstrar isolamento por tenant, contexto de canal quando aplicável e white-label por configuração sem fork semântico. A matriz CAPABILITIES passou a registrar os três eixos transversalmente.

## N. Snapshot capabilities D2

| Estado | Capabilities |
|---|---|
| PARTIAL | CAP-01, CAP-02, CAP-05, CAP-06, CAP-07, CAP-08, CAP-09, CAP-10, CAP-11, CAP-13, CAP-15, CAP-16, CAP-17, CAP-19, CAP-20, CAP-21 |
| NOT_EVIDENCED | CAP-03, CAP-04, CAP-12, CAP-14, CAP-18, CAP-22 |

Essas classificações representam o contrato completo de cada capability contra o main observado; componentes internos existentes não promovem a capability inteira a REAL.

## O. Delta canônico — participantes econômicos e domínios adjacentes

ADR-024/SRC-047/REQ-ONB-070..075 adicionam ADJ-01..08 ao cânone sem expandir o runtime do onboarding-corporativo para ledger/settlement. As capacidades adjacentes são: Split Payment, Afiliados, Referral, Comissões, Remunerações, Revenue/Fee Share, Campanhas/Incentivos e Settlement de Parceiros.

Na D2, ausência de engine de split/comissão/settlement dentro do repositório Onboarding NÃO é gap de implementação do Onboarding. Os gaps corretos são: capacidade de modelar papéis/vínculos econômicos quando necessária, handoff executável HOF-007..010, tenant/channel context, correlation/audit e feedback para review/revalidation.

**Separação de authority:**
- Onboarding = identidade/relationship/eligibility/restrictions/evidence/revalidation;
- Partner/Commercial = affiliation/referral/campaign/commercial rules;
- Payments/Ledger/Settlement/Finance = split, fee/revenue share, commission/remuneration accounting, reversals e settlement.

Aprovação de onboarding nunca autoriza execução financeira.

## P. Checkpoint D2 — runtime, eventos, applicability e integrações

Data do checkpoint: 2026-08-09. Modo: GitHub read-only por ADR-018; nenhuma alteração funcional, commit, merge, release ou deploy foi realizada.

### P.1 Status e lifecycle

O main não está zerado em state management. `packages/dominio/src/caso.ts` possui seis situações de case — `em_preenchimento`, `em_analise`, `aprovado`, `recusado`, `aguardando_complemento` e `reaberto` — e `packages/dominio/src/decisao.ts` mapeia decisões humanas para situação. Portanto a fundação de ST-CASE é PARTIAL, não ABSENT. Permanecem abertos o mapping ST-* para runtime, owner/exposure, matriz completa de transições legais e ilegais, guards, concorrência, actor/SoD, eventos canônicos e contract tests. Referência viva: TRC-D2-017 / GAP-ONB-031.

### P.2 Eventos, fila e entrega confiável

O main possui ações auditáveis em `trilha.acao` e jobs nomeados, inclusive `caso_reaberto`. `packages/dados/src/fila.ts`, `svc-trabalhadores/migrar-lib.ts`, `index.ts` e `verificar-vencimentos.ts` comprovam fila transacional em PostgreSQL/Graphile Worker, `job_key` para idempotência por fato, consumer idempotente, retry/backoff e falha permanente. Essa fundação é PARTIAL contra SRC-045: não substitui um registry versionado de eventos, event_id/schema_version, envelope canônico, correlation/causation/trace, outbox de eventos de domínio, signed webhook dispatcher, delivery log, replay protection ou redelivery auditada. Referências: TECH-029, TRC-D2-018/019, GAP-ONB-032/035.

### P.3 Capability/provider abstraction e reconciliação

`packages/orquestrador/src/capacidade.ts` comprova a primitiva capability→provider e `RegistroDeProvedores` por capacidade/região; `packages/orquestrador/src/reconciliacao.ts` comprova reconciliação determinística que preserva divergência; `scripts/guarda-fronteiras.mjs` impede nomes de providers nas camadas protegidas. Essas primitivas são REAL. Entretanto adapters concretos e registry operacional com contract eligibility, health, quality, residency, economic_group e routing completo permanecem NOT_EVIDENCED/PARTIAL. Buscas por implementações concretas de ComplyCube/SERPRO e por `responder()`/`RegistroDeProvedores` localizaram interfaces, docs, guard e demo, não adapters runtime. Referências: TECH-025/026/032, TRC-D2-021, GAP-ONB-012/022.

### P.4 Conditional-by-Design e runtime regulatório

REQ-ONB-076/ADR-025 são CANONICAL. O main já possui fundação condicional real: `dominio/requisito.ts` compõe requisitos por jurisdição, natureza, nível e EDD; avaliações manuais registram `nao_aplicavel`/`parcial` com motivo, ator e data; requisitos/produtos/flows são versionados. Isso torna Conditional-by-Design PARTIAL, não ABSENT. Porém não foi evidenciada uma ApplicabilityEvaluation transversal persistida com `rule_id`, `rule_version`, `effective_at`, `input_context`, `result`, `reason_codes`, decision authority, `correlation_id`, `evidence_refs` e tenant/channel independentes para requirement/capability/screen/provider/declaration/event/report/handoff. Também não foram localizados RegulatoryPack/JurisdictionPack/SegmentPack runtime. Referências: TECH-031/034, TRC-D2-022/024/025, GAP-ONB-036/039/046.

### P.5 Audit trail e export

A fundação de audit é concreta: `verificacao.trilha` é tenant-aware, case-aware e append-only no banco; armazena ação, entidade, autor, autor externo, motivo, IP e timestamp. O painel possui dossiê JSON exportável com case, pendências, proveniência/classificação/validade de evidências, custo, hashes de documentos, decisões/policy version, grafo, trilha e limitações, sem exportar os valores brutos de PII. Isso é PARTIAL contra SRC-040. Ainda faltam actor real/authority em todos os caminhos, channel context, correlation/causation/trace, before/after ou refs, schema/integrity, privileged-read audit e evidence bundle completo; o caminho observado do painel ainda possui AUTOR estático de desenvolvimento, e o dossiê declara que a trilha pode ser truncada. Referências: TECH-028/030, TRC-D2-023, GAP-ONB-037/041.

### P.6 API pública e webhooks

CAP-18 permanece NOT_EVIDENCED como capability completa. A árvore do main expõe uma route de dossiê de caso, mas não foi evidenciada Developer Platform pública com API versionada de status/eventos, webhook assinado/HMAC, delivery log, SDK, hosted flow, sandbox ou event/correlation IDs executáveis. A fila interna de jobs não deve ser confundida com API/event delivery público. Referências: TECH-033, TRC-D2-020, GAP-ONB-033/035.

### P.7 CCS/ACCS

SRC-041 permanece contrato CANONICAL e estritamente CONDITIONAL. Buscas no main por ACCS/CCS e pelas estruturas RegulatoryPack/JurisdictionPack/SegmentPack não localizaram runtime de geração, XSD/layout oficial, transmissão, respostas/ocorrências ou reconciliação. Portanto CCS/ACCS permanece NOT_EVIDENCED tecnicamente e só poderá ser implementado/ativado para um escopo com applicability=APPLICABLE. Referência: TRC-D2-026 / GAP-ONB-038.

### P.8 HFS e handoffs

CAP-22/HFS permanece NOT_EVIDENCED no runtime: buscas localizaram documentação/README/CLAUDE, não InternalCapabilityContract executável, model runtime, lineage, health/degraded/kill switch. Da mesma forma, não foram localizados contratos executáveis HOF-001..010. O worker de revalidação é uma fundação reutilizável, mas não prova feedback downstream versionado/correlacionado. A ausência de engines financeiros de split/comissão/settlement dentro do Onboarding NÃO é gap; os gaps são handoff executável, tenant/channel, idempotência/correlation/audit e feedback para review/revalidation. Referências: TECH-035/036, TRC-D2-027, GAP-ONB-021/044/045.

## Q. Registries e classificação deste checkpoint

O ONB-REG-001 foi atualizado com CODE_INVENTORY TECH-025..TECH-036 e TRACEABILITY_D2 TRC-D2-017..TRC-D2-027. GAP-ONB-031, 032, 035, 036, 037 e 039 foram refinados para separar fundação parcial de contrato E2E ainda aberto. GAP-ONB-046 foi criado para o déficit transversal de Conditional-by-Design runtime.

A classificação continua conservadora: uma primitiva pode ser REAL sem promover a capability inteira. CAP-18 e CAP-22 permanecem NOT_EVIDENCED; CAP-15/16/17/19/20/21 permanecem PARTIAL. Nenhum gap técnico foi encerrado por esta revisão; apenas a evidência observada foi tornada mais precisa.

Este checkpoint não altera o freeze. Os recortes técnicos remanescentes da D0.5 foram concluídos no checkpoint R; a D0.5 pode ser encerrada como RECONCILIATION_COMPLETE, mantendo SRC-008 em REVIEW_REQUIRED e todos os gaps de implementação abertos. O próximo estágio documental é D0.6 — Normalização Semântica.

## R. Checkpoint final D0.5 — storage, observabilidade, privacy, security e consentimento

### R.1 Storage documental

O main possui um contrato de metadata documental mais maduro do que a leitura histórica indicava. `verificacao.documentos` preserva tenant/sujeito/tipo, `codigo_formulario`, `versao_modelo`, `objeto_chave`, hash do conteúdo, validade, uploader, data e supersessão. Isso torna a fundação de documento PARTIAL/REAL em metadata e integridade, mas não prova object storage operacional. Não foram localizados adapter de object storage, fluxo de upload/download autorizado, presigned access, malware scanning ou lifecycle real do objeto. Referências vivas: TECH-037, TRC-D2-028, GAP-ONB-013.

### R.2 Observabilidade e analytics

`verificacao.verificacoes` persiste como fatos transacionais capability, provider, sucesso, duração, custo/moeda e timestamp; painel/dossiê consomem parte desses dados. Isso é uma fundação REAL/PARTIAL de medição operacional/econômica, porém não é uma plataforma de observabilidade. Não foram evidenciados OpenTelemetry, metrics/traces E2E, SLOs, alerting, provider health ou correlação tenant/channel/case/capability/provider. Referências: TECH-038, TRC-D2-029, GAP-ONB-017/GAP-ONB-034.

### R.3 Privacy, retention e crypto-shred

AES-256-GCM, chave de dado por titular, envelope versionado, validade de evidências/documentos e worker de expiração/reabertura são fundações reais. O contrato de cifra explicita o princípio de crypto-shred por destruição da chave do titular, mas não foi evidenciado o lifecycle operacional de retention/delete/crypto-shred por categoria, jurisdição e tenant, legal hold, tratamento de backup/réplica nem KMS/HSM de produção. Expiração/revalidação não equivale a eliminação. Referências: TECH-039, TRC-D2-030, GAP-ONB-014/GAP-ONB-020.

### R.4 Security CI e hardening

O workflow `qualidade.yml` é um gate funcional forte e real: PostgreSQL 16, instalação frozen, boundary/vendor guards, build da lib-ui, typecheck, Biome, migrations, tests e build das três aplicações web. Entretanto o workflow observado não inclui gates dedicados de SAST, SCA/dependency vulnerability ou secret scanning, e a evidência de run do main/release continua separada. Hardening de login, MFA/rate-limit/recovery proporcional ao risco também permanece não evidenciado. Referências: TECH-040, TRC-D2-031, GAP-ONB-005/016/023.

### R.5 Termos, consentimentos, declarações e assinatura

A D0.5 identificou uma lacuna documental que foi formalizada como REQ-ONB-077: quando aplicável, aceite/consentimento/declaração/assinatura deve ser evidência versionada e não pode ser inferido por navegação ou clique genérico. O schema de documentos fornece primitives úteis — código de formulário, versão de modelo, hash e supersessão — mas não foi localizado aggregate/registro dedicado de presented/accepted/revoked com subject/actor/capacity, tenant/channel independentes, locale/jurisdição, timestamps, sessão/IP/device por risco, correlation/evidence e revoke/withdraw. Referências: TECH-041, TRC-D2-032, GAP-ONB-047.

### R.6 Fechamento da D0.5

A reconciliação técnica D0.5 está COMPLETA como exercício de conhecimento do estado real do main observado no SHA `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`. O SHA foi revalidado antes do fechamento e permaneceu inalterado. Foram reconciliados: topologia/repo, IAM/tenant/SoD, multi-tenant/multicanal/white-label, 80 screens, CAP-01..22, dados/RLS/evidence, state/status, eventos/async, providers/routing/reconciliation, Conditional-by-Design, audit/export, Developer Platform/API/webhooks, RegulatoryPack/CCS, HFS, handoffs, document storage, observabilidade/analytics, privacy/retention, security CI/hardening e termos/consentimentos.

COMPLETA aqui significa: cada área relevante possui estado técnico observado, evidência observada, evidência esperada e gap/gate quando necessário. Não significa implementação concluída, QA PASS, homologação ou produção. Nenhum gap de implementação foi encerrado apenas pela reconciliação. O código permanece congelado por ADR-018.

## S. Próximo estágio

Iniciar **D0.6 — Normalização Semântica**. O objetivo é remover ambiguidade entre conceitos do produto, dados, status, eventos, audit, applicability, tenant/canal/white-label, compliance e domínios adjacentes, criando vocabulário canônico único sem alterar o código. D0.6 deve alimentar diretamente D0.7 Traceability E2E e D0.8 Audit & Evidence Architecture.

---

# PARTE III — ARQUITETURA MULTI-JURISDIÇÃO E GLOBAL (ONB-INT-001 v1.0)

**Status:** CANONICAL GLOBAL ARCHITECTURE — market readiness separado por jurisdição/evidência.

## 1. Princípio canônico

O Mutual Onboarding deve atender clientes no Brasil e no exterior. Brasil é o primeiro baseline operacional, mas a arquitetura internacional é requisito estrutural desde a fundação, e não uma evolução opcional futura. Não é permitido criar fork de código por país quando a diferença puder ser representada por configuração, jurisdiction profile, requirement, flow, policy, provider route ou product/segment pack.

## 2. Modelo de jurisdição

Cada tenant e, quando necessário, cada produto/jornada deve possuir jurisdiction/region context explícito. O **Jurisdiction Registry** deve controlar país/região, códigos, locale, identificadores, documentos, fontes oficiais, AML/watchlists, privacy/residency, rotas de provider, policy packs, owner e gates.

## 3. Identidade e identificadores

O core não pode assumir CPF/CNPJ como identificadores universais. Person, Company, Entity e Relationship devem suportar identificadores tipados por autoridade, país e valor; documentos e company registries variam por jurisdição. CNPJ alfanumérico permanece requisito específico do Brasil e também funciona como teste contra hardcodes numéricos.

## 4. Documentos e endereços

Document type, issuing authority, country, expiry, MRZ/QR/barcode, address structure, postal code, phone format e proof-of-address devem ser extensíveis por jurisdição. Validation/masking e UX devem ser orientados por schema/configuração, não por componentes exclusivos do Brasil.

## 5. Internacionalização de UX

Idioma, locale, timezone, formato de data, nomes, endereço, telefone, mensagens, templates de comunicação, termos e conteúdo regulatório devem ser configuráveis por tenant/jornada. White-label não se resume a cores: inclui linguagem e experiência local.

## 6. KYB e corporate graph

Company registry, legal status, shareholders, UBO, directors, representatives, licenses e corporate graph devem aceitar fontes e conceitos locais. O domínio mantém modelo canônico; adapters/jurisdiction mappings convertem estruturas específicas sem contaminar o core.

## 7. AML global

Screening deve combinar cobertura global e fontes/listas locais quando aplicável: sanctions, PEP, watchlists, adverse media e custom lists. Todo hit preserva source/provenance, versão, `observed_at`, matching attributes e histórico de disambiguation. Um provider global não elimina a necessidade de avaliar fontes locais relevantes.

## 8. Providers e routing

Provider selection é por capability e jurisdição. Routing deve considerar cobertura de país/documento, disponibilidade, qualidade, preço, contrato, eligibility, residency, economic_group e fallback/degraded mode. Nenhum provider recebe status global apenas porque opera em múltiplos países; cobertura precisa ser evidenciada capability × jurisdiction.

## 9. Privacidade, transferências e residência

Privacy e data governance devem ser parametrizáveis por jurisdição: papéis, legal basis, consent quando aplicável, purpose limitation, retention, deletion, subprocessor, cross-border transfer, data residency e data-subject rights. Nenhum pack jurídico estrangeiro será tratado como automaticamente equivalente à LGPD.

## 10. Policy / flow / requirement overlays

A arquitetura canônica compõe um core global com overlays versionados:

| Overlay | Conteúdo |
|---|---|
| **Core Requirement Pack** | Invariantes Mutual e produto |
| **Jurisdiction Pack** | Requisitos legais/regulatórios e fontes locais |
| **Segment Pack** | Banco, pagamentos, fundos, VASP, câmbio, seguros etc. |
| **TenantPolicy** | Regras comerciais, risco, alçadas, providers, canais, retenção adicional e configuração aprovadas do tenant. A expressão histórica "Tenant/Product Pack" fica somente como alias descritivo legado. |

Conflitos devem ser detectados e simulados antes de publicação.

## 11. Public API e eventos

APIs, SDKs, hosted flow e webhooks devem carregar jurisdiction/locale de maneira controlada e versionada. O contrato público não deve expor payload proprietário de provider. IDs canônicos e EvidenceEnvelope devem permanecer consistentes globalmente.

## 12. Deployment e provisionamento regional

Tenant provisioning deve suportar região operacional, data residency, provider routes, keys/secrets, feature flags, policy versions e observabilidade compatíveis com o contrato e a jurisdição. A arquitetura deve permitir expansão regional sem duplicar domínio ou state machine.

## 13. Billing / comercial

Mesmo sendo Onboarding, a plataforma deve permitir medição de uso e custo por tenant, capability, provider, região e moeda de contratação/billing quando aplicável. Preço e faturamento não devem alterar a fonte de verdade do case.

## 14. QA e homologação internacional

Cada nova jurisdição precisa de um activation gate com, no mínimo: legal/regulatory assessment; privacy/residency; identifiers/documents; official/local sources; provider coverage; AML coverage; language/locale; policy pack; test fixtures; negative/failure tests; security; UAT; release evidence. "Global ready" não equivale a "todos os países habilitados".

## 15. Status de cobertura

Usar estados distintos: `FRAMEWORK_READY`, `RESEARCHED`, `CONTRACTED`, `TECHNICALLY_INTEGRATED`, `QA`, `UAT`, `READY_FOR_MARKET` e `PRODUCTION_VERIFIED`. Nenhum país deve aparecer comercialmente como suportado apenas porque a arquitetura é global.

## 16. Decisões / requisitos relacionados

- **REQ-ONB-051** é CANONICAL: arquitetura global desde a fundação.
- **REQ-ONB-052 a REQ-ONB-058** detalham identificadores, i18n, privacy/residency, provider routing, jurisdiction packs, AML global e provisionamento regional.
- **ADR-013** formaliza a arquitetura multi-jurisdição e internacionalização.

## 17. Próxima etapa

Identificar os países/regiões dos primeiros clientes internacionais e abrir um Jurisdiction Profile específico para cada mercado. Até essa identificação, o framework global deve ser implementável e testável sem inventar regras regulatórias de países não confirmados.

## 18. Regra de maturidade e aplicabilidade

Este documento é CANONICAL como arquitetura global/multi-jurisdição do produto, conforme REQ-ONB-051 e ADR-013. Isso não significa que qualquer país esteja comercialmente habilitado, homologado ou PRODUCTION_VERIFIED. Cada jurisdição mantém estado próprio no Jurisdiction Registry e exige evidência de legal/regulatory/privacy, providers, documentos, AML, idioma/locale, testes, UAT e release.

RegulatoryPack é camada distinta de JurisdictionPack: o primeiro representa obrigações de regulador/regime formalmente aplicáveis; o segundo representa contexto territorial, identificadores, documentos, privacy/residency, fontes e localização. Ambos se compõem com SegmentPack e TenantPolicy sem fork do core.

## 19. Addendum semântico D0.6

Autoridade semântica: SRC-048 / ONB-GOV-003 e ONB-REG-001/SEMANTIC_REGISTRY.

- Jurisdiction, Country, DataRegion e DataResidency são conceitos distintos. Locale e Timezone também permanecem dimensões próprias.
- RegulatoryPack, JurisdictionPack, SegmentPack e TenantPolicy são os quatro overlays canônicos; `Tenant/Product Pack` não é uma quinta categoria.
- Tenant e Channel são first-class e independentes. Um tenant pode operar múltiplos channels e um channel pode relacionar-se a múltiplos tenants conforme ChannelBinding versionado. WhiteLabelProfile pode ser selecionado por contexto/binding, mas não altera legal entity, jurisdiction, regulatory applicability, status ou evidence semantics.
- CPF/CNPJ permanecem identifiers do contexto Brasil e não chaves universais. LegalEntity, Company, Person, Subject e Relationship devem manter IDs canônicos e mappings por jurisdiction pack.

---

# PARTE IV — CAPABILITY, EVIDENCE, ROUTING E HANDOFFS (ONB-ARQ-001 v1.0)

**Status:** CANONICAL ARCHITECTURE CONTRACT — estado técnico separado por evidência.

## 1. Princípio de arquitetura

O domínio solicita capabilities; adapters implementam providers/fontes. Requirements, flows e policies não devem conhecer marcas de fornecedores. Provider não é source of truth do case.

## 2. Capability Contract

Cada capability deve definir:

- `capability_id`/version;
- inputs canônicos;
- subject/entity/case correlation;
- preconditions;
- privacy classification;
- output assertions;
- `normalized_status` referenciado ao catálogo canônico ST-EVID ou ao namespace de domínio aplicável;
- distinção explícita entre resultado de negócio e falha técnica/UNAVAILABLE;
- timeout/retry policy;
- idempotency;
- evidence requirements;
- observability;
- cost attribution;
- compatibility/version policy.

Timeout, erro técnico ou indisponibilidade **nunca** podem ser convertidos em FAIL/PASS de negócio por conveniência.

## 3. Adapter Contract

Cada adapter deve implementar o contrato da capability sem vazar payload proprietário para o domínio. **Test kit comum mínimo:** success; inconclusive; validation error; timeout; provider 4xx/5xx; malformed payload; rate limit; retry; idempotency; webhook replay; assinatura inválida; provider degradation; mapping de provenance; masking/log hygiene.

## 4. Evidence Envelope (contrato canônico)

Campos mínimos canônicos:

- `evidence_id`;
- `schema_version`;
- `provider_run_id` ou `internal_run_id`;
- `capability_id`/version;
- `tenant_id`;
- `case_id`;
- subject/entity/relationship IDs;
- assertion type;
- assertion/result;
- confidence/class quando aplicável;
- `observed_at`;
- `valid_until`;
- source/provenance;
- `source_reference`;
- `raw_reference` protegido;
- privacy classification;
- cost metadata quando aplicável;
- `correlation_id`;
- integrity/hash quando disponível.

## 5. Reconciliação

Resultados conflitantes permanecem registrados. B18 deve comparar evidências, aplicar precedência/policy e abrir exceção quando não houver resolução determinística segura. Fonte oficial pode ter precedência para fato cadastral oficial, mas não apaga score, alerta ou divergência de outras fontes.

## 6. Routing Engine

Critérios: tenant; produto/pack; jurisdição; região; capability; disponibilidade; SLA; qualidade; custo; contrato; residency; eligibility; consentimento; economic_group; preferência/fallback; degraded mode. A decisão de rota deve ser **auditável**.

## 7. Economic group

Provider Registry possui `economic_group` obrigatório. Marcas do mesmo grupo não contam como fallback econômico independente. **Serasa Experian/idwall é o primeiro caso explícito registrado.**

## 8. Fontes oficiais

SERPRO/RFB/BCB público devem entrar como capability/source com provenance oficial. SCR/CCS/Open Finance e outros canais restritos somente quando eligibility, base jurídica e consentimento/autorização aplicáveis estiverem satisfeitos.

## 9. Webhooks e eventos

Assinatura/autenticidade; dedup/idempotency; ordering quando necessário; replay protection; correlation ID; retry com backoff seguro; dead-letter/reprocessamento quando aplicável; schema/version; audit trail. Timeout de provider não deve ser confundido com rejeição.

## 10. Handoffs

| Handoff | Regra |
|---|---|
| Onboarding → Backoffice | Decisão de onboarding + IDs + restrictions + evidence references; nunca liberação financeira automática. |
| CRM ↔ Onboarding | Correlation/status, sem replicar PII desnecessária. |
| Onboarding → KYT/Travel Rule | Sujeito/entidade verificados e contexto de risco; transacional permanece fora do core. |
| Onboarding ↔ HFS CAP-22 | Dados canônicos autorizados e sinais internos versionados. |
| Onboarding → Terminal/Corporate View | Read model autorizado; Terminal não vira source of truth do case. |

## 11. Source of truth

Case lifecycle, evidência de onboarding e decisão ficam no Onboarding. Sistemas consumidores recebem contratos/read models. Alteração posterior em consumidor não reescreve silenciosamente o histórico do case.

## 12. Versionamento e compatibilidade

Toda API/event/schema/capability relevante deve possuir política de versão, compatibilidade, deprecation/sunset e migration. Mudança breaking exige ADR, plano de migração, testes de contrato e evidência.

## 13. Segurança

Tenant isolation; least privilege; secrets fora de código/log; encryption; PII masking; signed webhooks; rate limit; anti-replay; authorization object-level; audit; data minimization; residency/retention quando aplicável.

## 14. Observabilidade

Por capability/provider: requests; success/inconclusive/error; latency; timeout; rate limit; retries; cost; quality; degraded status; version; queue/reprocessamento e incidents.

## 15. Gates relacionados

G1 fundações; G3 providers/identity; G4 official sources; G5 AML/HFS; G6 privacy; G8 handoffs; G9 resiliência/segurança. Homologação usa H-02, H-03, H-04, H-05, H-10, H-16 e H-17, além dos demais critérios aplicáveis.

## 16. Autoridade e relação com os demais contratos

Este documento é o contrato canônico das primitivas Capability Contract, Adapter Contract, EvidenceEnvelope, reconciliation e routing. **Não comprova implementação.** A divisão de autoridade documental está descrita no início deste arquivo consolidado.
