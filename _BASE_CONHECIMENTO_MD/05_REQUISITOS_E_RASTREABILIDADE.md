---
titulo: "Requisitos e Rastreabilidade — Modelo de Requisitos e Requisitos Funcionais/Não Funcionais de Front/UX"
fontes:
  - "ONB-REQ-001_MODELO_DE_REQUISITOS_E_RASTREABILIDADE_v1.0 (CANONICAL)"
  - "ONB-REQ-002_REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS_FRONT_UX_v1.0 (CANONICAL)"
status_fonte: CANONICAL
gerado_em: 2026-08-09
---

# Requisitos e Rastreabilidade — Mutual Onboarding

> Consolida o **ONB-REQ-001** (modelo de requisitos e rastreabilidade — padrão canônico da golden thread) e o **ONB-REQ-002** (requisitos funcionais e não funcionais de Front/UX — RF-UX-001..050 e RNF-UX-001..040). Ambos são CANONICAL como **requisitos de estado desejado**; canonicalidade documental **não implica implementação, teste ou homologação**.

---

## PARTE 1 — MODELO DE REQUISITOS E RASTREABILIDADE (ONB-REQ-001 v1.0)

### 1. Regra fundamental

Todo comportamento material do produto deve possuir **Requirement ID** antes de entrar em READY. Requisito **não é sinônimo** de tela, ticket, regra de policy ou capability.

### 2. Campos obrigatórios do requisito

Requirement ID; tipo; título; descrição normativa/funcional; fonte; prioridade; classificação; owner role; jurisdição; segmento/pack quando aplicável; capabilities; screens; data/entities; regras/policies; security/privacy; acceptance criteria; test IDs; evidence IDs; dependencies; gate; status.

### 3. Tipos de requisito

Produto; Lifecycle; Dados; Documento; KYC/KYB; AML; Risco; Fraude; Providers; Developer/API; Segurança; Privacidade; Operação; Observabilidade; Analytics; Mercado; Internacional/Jurisdição; Regulatório/Compliance; Status/Eventos; Auditoria/Evidência; Handoff; QA; Release; HFS.

### 4. Rastreabilidade mínima (golden thread)

```
Norma/Source/Decision → Requirement → Capability → Policy/Rule → Screen/API/Event/Data
  → Provider/Internal Capability → Task → Test → Evidence → Gate → Release → Production Verification
```

Nenhum elo deve ser inferido silenciosamente; quando ausente, **registrar gap**.

### 5. Prioridade

| Prioridade | Critério |
|---|---|
| **P0** | Hard invariant, segurança, privacidade, arquitetura fundacional ou blocker de gate |
| **P1** | Necessário para produto completo/homologação do pack alvo |
| **P2** | Evolução/otimização não bloqueante |

### 6. Internacionalização

Requisitos globais devem indicar se são **Core**, **Jurisdiction-specific** ou **Segment-specific**. **REQ-ONB-051** é o requisito CANONICAL de arquitetura global desde a fundação. Cada nova jurisdição terá requisitos/overlays próprios **sem duplicar o core**.

### 7. Acceptance criteria

Devem ser verificáveis e indicar: resultado esperado, condições, autorização, dados, falhas/degraded mode, privacidade/auditoria e evidência quando aplicável. "Funciona" ou "tela pronta" **não são critérios suficientes**.

### 8. Mudança e versionamento

Alteração de requisito que mude contrato, state machine, dado, permissão, provider behavior, evidência ou jurisdição exige **análise de impacto** e pode exigir **ADR**. Preservar histórico; não sobrescrever significado sem versionamento.

### 9. Fonte operacional

A aba **REQUIREMENTS do ONB-REG-001** é o registry vivo. O ONB-REQ-001 define a regra de preenchimento e qualidade.

### 10. Evidence Expected × Evidence Observed

Requirement CANONICAL **não significa implementação**. Todo requirement executável deve distinguir:

- **EVIDENCE_EXPECTED**: evidência necessária para provar implementação/aceite futuro;
- **EVIDENCE_OBSERVED**: evidência efetivamente localizada e validada;
- **TECHNICAL_STATE**: `REAL`, `PARTIAL`, `UI_ONLY`, `PROTOTYPE`, `MOCK`, `ABSENT` ou `NOT_EVIDENCED`.

Evidence observado deve referenciar, conforme aplicabilidade: repositório/path, commit SHA, migration, schema/API/event version, test ID, CI run, environment/artifact, audit event, hash/integridade, release e resultado.

### 11. Requisitos regulatórios

Obrigação regulatória deve ser modelada de forma **versionada e aplicável**, nunca hardcoded na UI. O requirement deve indicar, quando aplicável: regulador/autoridade, norm_id e versão/vigência, jurisdição, entidade/atividade/produto afetado, RegulatoryPack/JurisdictionPack/SegmentPack/TenantPolicy, declaração/campo, evidência, retenção, report/output e gate jurídico/compliance.

Quando houver reporte oficial (ex.: **CCS/ACCS**), o requirement deve apontar para layout/schema oficial vigente e para o ciclo de **geração, validação, transmissão, resposta, ocorrência, correção, reenvio e reconciliação**.

### 12. Status e eventos

Requirements que alterem estado de domínio devem indicar **Status IDs**, transições legais e eventos associados. Requirements de integração/eventos devem indicar **Event IDs/schema version**, producer/consumer, exposição pública ou `INTERNAL_ONLY` justificada, idempotência, outbox, retry/DLQ/replay e auditability.

### 13. Exportação e auditoria

Quando o requisito produzir trilha, dossiê ou reporte, os formatos esperados devem ser registrados: **CSV, XLSX, JSON/JSONL, PDF, evidence bundle ou formato regulatório específico**. Exportação é **projeção reproduzível da fonte canônica** e deve respeitar autorização, PII/masking, classificação, integridade, retention e data residency.

---

## PARTE 2 — REQUISITOS FUNCIONAIS E NÃO FUNCIONAIS DE FRONT/UX (ONB-REQ-002 v1.0)

### Finalidade

Estabelecer o contrato funcional e de qualidade para as **quatro superfícies** do Mutual Onboarding (A — Jornada; B — Analista; C — Admin/Developer; D — Mutual interno). Os IDs detalhados **RF-UX-001..050** e **RNF-UX-001..040** estão no registry **ONB-UX-002** e devem ser usados como referência rastreável em tasks, testes, PRs e gates.

### Requisitos Funcionais P0 (RF-UX-001..020)

| ID | Requisito |
|---|---|
| RF-UX-001 | Lifecycle server-authoritative do onboarding |
| RF-UX-002 | PF, PJ, MEI, entidades reguladas, representantes, UBOs e terceiros |
| RF-UX-003 | JurisdictionPack + SegmentPack sem hardcode estrutural BR |
| RF-UX-004 | Salvar, retomar e expirar jornadas de forma segura |
| RF-UX-005 | Documentos com metadata, versão, integridade, MIME, tamanho, validade e storage key |
| RF-UX-006 | Biometria/liveness quando policy exigir, com retry/fallback e evidência |
| RF-UX-007 | KYB, QSA, UBO, representantes e cadeia societária |
| RF-UX-008 | PEP, sanções, watchlists, adverse media e desambiguação |
| RF-UX-009 | Case management, investigação, EDD, assignment e checklist |
| RF-UX-010 | Decisão com motivo, evidências, autoridade, restrições e maker-checker |
| RF-UX-011 | EvidenceEnvelope normalizado e lineage |
| RF-UX-012 | Multi-tenant com enforcement server-side/RLS |
| RF-UX-013 | Requirements, flows, policies, simulação, versão e publicação |
| RF-UX-014 | Provider Registry/routing por capability, jurisdição, health, custo, contrato e economic_group |
| RF-UX-015 | API, keys/scopes, idempotency, webhooks assinados, sandbox, SDK e hosted flow |
| RF-UX-016 | Revalidação, expiração, rescreening e alertas |
| RF-UX-017 | Trilha append-only para acessos, mutações, decisões e overrides |
| RF-UX-018 | Masking, consentimento, base legal, retention, delete/crypto-shredding e legal hold quando aplicável |
| RF-UX-019 | CAP-22/HFS como internal capability sem exposição metodológica |
| RF-UX-020 | Handoff versionado preservando canonical IDs e estado |

### Requisitos Funcionais P1/P2 (RF-UX-021..050)

| ID | Requisito |
|---|---|
| RF-UX-021 | Busca global autorizada e mascarada |
| RF-UX-022 | Fila com assignment, prioridade, SLA, aging e filtros salvos |
| RF-UX-023 | Dossiê/export auditado e classificado |
| RF-UX-024 | Notificações por canal e idioma |
| RF-UX-025 | Delegação de jornadas e pessoas-chave |
| RF-UX-026 | Contestação/revisão humana independente |
| RF-UX-027 | Reconciliação entre fontes com divergência explícita |
| RF-UX-028 | Analytics de conversão, drop-off, custo, latência, erro e health |
| RF-UX-029 | White-label sem fork |
| RF-UX-030 | Localização de nome, endereço, telefone, data, timezone e identificadores |
| RF-UX-031 | Usuários, roles/capabilities, convites, revogação, sessão e SoD |
| RF-UX-032 | Cockpit de release/gates/evidências |
| RF-UX-033 | Kill switch por escopo com dupla aprovação e rollback |
| RF-UX-034 | Model governance/versionamento/validação/degraded mode |
| RF-UX-035 | Third-party risk com contrato/DPA/subprocessors/residency/SLA/exit |
| RF-UX-036 | Suporte Mutual privilegiado, justificado e auditado |
| RF-UX-037 | Diff e histórico de configuração |
| RF-UX-038 | Logs API/webhook com correlação, retry e redelivery |
| RF-UX-039 | Timeline completa do case |
| RF-UX-040 | Ajuda contextual/fallback assistido |
| RF-UX-041 | Saved views autorizadas |
| RF-UX-042 | Bulk actions controladas e evidenciadas |
| RF-UX-043 | Notas internas classificadas e auditadas |
| RF-UX-044 | Exports sensíveis a locale/masking/timezone/tenant |
| RF-UX-045 | Preview de branding |
| RF-UX-046 | Simulação explicável sem segredo HFS |
| RF-UX-047 | Comparação de providers |
| RF-UX-048 | Incidente correlacionado a tenant/provider/capability/release |
| RF-UX-049 | Atendimento a solicitações de titular quando aplicável |
| RF-UX-050 | Feature flags/provisioning por ambiente/região/jurisdição |

### Requisitos Não Funcionais P0 (RNF-UX-001..020)

| ID | Requisito |
|---|---|
| RNF-UX-001 | Autorização server-side deny-by-default |
| RNF-UX-002 | RLS/FORCE RLS e testes negativos BOLA/IDOR |
| RNF-UX-003 | Criptografia em trânsito/repouso e envelope encryption onde aplicável |
| RNF-UX-004 | Secrets fora de código/logs e com rotação |
| RNF-UX-005 | Audit trail append-only/correlacionável |
| RNF-UX-006 | SLOs e degraded mode explícitos |
| RNF-UX-007 | Budgets de performance P95/P99 por rota antes de produção |
| RNF-UX-008 | Timeout/retry idempotente/circuit/fallback com UNKNOWN/INCONCLUSIVE |
| RNF-UX-009 | Logs, métricas, traces e correlation_id sem PII desnecessária |
| RNF-UX-010 | Privacy, minimização, masking, retention, residency e transfer controls |
| RNF-UX-011 | Acessibilidade AA conforme padrão vigente |
| RNF-UX-012 | UTF-8, locale, timezone, idioma e identificadores globais |
| RNF-UX-013 | Jornada mobile-first e consoles desktop-first responsivos |
| RNF-UX-014 | Sessão com expiração, inactivity timeout e revogação |
| RNF-UX-015 | Hash/integridade e lineage de documento/evidência |
| RNF-UX-016 | Unit/integration/DB-RLS/contract/E2E/negative tests conforme risco |
| RNF-UX-017 | CI com typecheck, lint, tests, migrations, builds, guards e security scanning |
| RNF-UX-018 | Componentização por lib-ui/tokens e domínio desacoplado de marcas |
| RNF-UX-019 | Versionamento de API, policy, flow, requirement e contracts |
| RNF-UX-020 | Explainability por reason code/evidência sem expor propriedade intelectual |

### Requisitos Não Funcionais P1/P2 (RNF-UX-021..040)

| ID | Requisito |
|---|---|
| RNF-UX-021 | Matriz de browsers homologados |
| RNF-UX-022 | Suporte mobile/captura em dispositivos homologados |
| RNF-UX-023 | Budget de chamadas e prevenção de waterfall |
| RNF-UX-024 | Cache tenant-safe |
| RNF-UX-025 | Rate limiting proporcional ao risco |
| RNF-UX-026 | MFA para perfis privilegiados conforme policy |
| RNF-UX-027 | Trusted proxy para IP de auditoria |
| RNF-UX-028 | Export assíncrono/expirável quando grande |
| RNF-UX-029 | Busca indexada tenant-safe/masked |
| RNF-UX-030 | Telemetria UX sem conteúdo sensível |
| RNF-UX-031 | Rollback/recovery para ações críticas |
| RNF-UX-032 | BCP/runbooks para providers, storage, DB, HFS e webhooks |
| RNF-UX-033 | Localização versionada e sem strings regulatórias hardcoded |
| RNF-UX-034 | Catálogo consistente de status/severidade/tokens |
| RNF-UX-035 | Modelo de erro com código seguro, correlação e próxima ação |
| RNF-UX-036 | Impressão/dossiê legível fora da UI |
| RNF-UX-037 | Produtividade por teclado em consoles |
| RNF-UX-038 | White-label preservando acessibilidade |
| RNF-UX-039 | KPI com fórmula, fonte, owner e granularidade |
| RNF-UX-040 | Cost awareness para chamadas externas |

### Critérios para READY

Uma tela/capability só pode receber **READY** quando possuir: Screen/Capability ID, Task ID, source/requirement, prioridade, owner role, dependências, contrato/data model, rules/state, auth/permission, acceptance criteria, test plan, security controls, evidence expected e gate. Se faltar requisito estrutural, status **BLOCKED**.

### Critérios de aceite do front

Cada Screen ID possui **cinco critérios mínimos** no ONB-UX-002: **UX, segurança, dados, acessibilidade e responsividade**, totalizando **400 critérios base** (80 telas × 5). Critérios específicos de domínio devem ser adicionados **sem substituir** esses mínimos.

### Regra de implementação

O Claude Code e desenvolvedores devem referenciar IDs RF/RNF nas tasks e PRs. **Nenhuma decisão de UI pode enfraquecer** RLS, SoD, evidence, privacy, lifecycle, idempotency, provider abstraction ou internacionalização. Uma experiência aparentemente melhor que elimine controles críticos deve ser tratada como **regressão**.

### Regra de maturidade documental

RF-UX-001..050 e RNF-UX-001..040 são **CANONICAL como requisitos do produto/experiência**. Isso **não afirma** que estejam implementados, testados ou homologados. Requisitos de natureza regulatória continuam condicionados à aplicabilidade formal por RegulatoryPack/JurisdictionPack/SegmentPack/TenantPolicy e governança competente.

---

## Relação com o registry vivo (ONB-REG-001)

- A aba **REQUIREMENTS** do ONB-REG-001 contém o registry vivo REQ-ONB-001..077 (ver `06_REGISTRO_MESTRE_DE_EXECUCAO.md`).
- A aba **TRACEABILITY_MASTER** materializa a golden thread deste modelo (77/77 requirements rastreados, únicos, todos NOT_RELEASED/NOT_PRODUCTION_VERIFIED na fase atual).
- O ONB-REQ-001 é registrado como **SRC-016** (REQUIREMENT_STANDARD, CANONICAL) e o ONB-REQ-002 como **SRC-028** (FRONT_UX_REQUIREMENTS, CANONICAL) no SOURCE_MANIFEST.
