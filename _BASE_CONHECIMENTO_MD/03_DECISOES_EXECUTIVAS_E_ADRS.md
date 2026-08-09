---
titulo: "Decisões Executivas, ADR Index e Instruções para Agentes de IA — Mutual Onboarding"
fontes:
  - "ONB-DEC-001_DECISOES_EXECUTIVAS_E_ADR_INDEX_v1.0 (CANONICAL)"
  - "ONB_CLAUDE_PROJECT_INSTRUCTIONS_OTIMIZADA_v1.1 (SRC-036 — instruções ativas do projeto Claude)"
status_fonte: CANONICAL
gerado_em: 2026-08-09
---

# Decisões Executivas e ADRs — Mutual Onboarding

## 1. Finalidade

Concentrar decisões de arquitetura, produto, dados, segurança, compliance e operação que **alteram o contrato do programa**. O detalhe operacional e o status vivo permanecem no **ONB-REG-001** (aba **ADRS_DECISIONS**).

## 2. Decisões já explícitas do dono do produto

- A pasta **Mutual Onboarding** é a única raiz documental canônica do projeto.
- **HFS / Mutual Intelligence** é ativo proprietário da Mutual e **CAP-22 interna**.
- O produto deve atender **Brasil e clientes internacionais**; arquitetura global é requisito desde a fundação.
- Onboarding permanece **domínio separado do Backoffice Financeiro**; integração somente por contratos, IDs e eventos/APIs.

## 3. Índice completo de ADRs (ADR-001..ADR-034)

Fonte operacional do status vivo: aba **ADRS_DECISIONS** do ONB-REG-001. Em caso de divergência de status ou redação resumida, **prevalece o registry vivo**. Nenhum ADR pode ser renumerado, apagado ou tratado como aceito por simples presença em documento histórico.

| ADR | Decisão | Status |
|---|---|---|
| ADR-001 | Separação Onboarding x Backoffice | CANONICAL |
| ADR-002 | Capability Contract Layer | CANONICAL |
| ADR-003 | EvidenceEnvelope | CANONICAL |
| ADR-004 | Routing/Fallback/Degraded Mode | CANONICAL |
| ADR-005 | TypeScript strict + PostgreSQL/RLS | CANONICAL |
| ADR-006 | Auth/RBAC/ABAC/SoD | CANONICAL |
| ADR-007 | Retention/Residency/Crypto-shredding | CANONICAL |
| ADR-008 | Official Source Eligibility | CANONICAL |
| ADR-009 | SCREEN_REGISTRY v2 = 80 IDs | CANONICAL |
| ADR-010 | CAP-22 HFS interna | CANONICAL |
| ADR-011 | Provider economic_group obrigatório | CANONICAL |
| ADR-012 | CNPJ alfanumérico end-to-end | CANONICAL |
| ADR-013 | Arquitetura multi-jurisdição e internacionalização | CANONICAL |
| ADR-014 | GitHub único para implementação técnica | CANONICAL |
| ADR-015 | Canonização do planejamento v1.1 | CANONICAL |
| ADR-016 | Status e evento como contrato público | CANONICAL |
| ADR-017 | Compliance regulatório como capability versionada | CANONICAL |
| ADR-018 | Congelamento técnico para reconciliação documental | CANONICAL |
| ADR-019 | Canonização dos catálogos de produto e UX | CANONICAL |
| ADR-020 | Autoridade mestre de status, eventos, evidence e audit | CANONICAL |
| ADR-021 | Framework regulatório canônico x aplicabilidade jurídica concreta | CANONICAL |
| ADR-022 | Registry canônico não equivale a homologação, contratação ou readiness | CANONICAL |
| ADR-023 | Tenant e Canal independentes ou hierárquicos por configuração | CANONICAL |
| ADR-024 | Capacidades econômicas adjacentes e separação de source of truth | CANONICAL |
| ADR-025 | Conditional-by-Design como invariante absoluta | CANONICAL |
| ADR-026 | Documentary Assurance D0.1-D4 adaptado ao Mutual Onboarding | CANONICAL |
| ADR-027 | Modelo semântico canônico e separação de dimensões/artefatos | CANONICAL |
| ADR-028 | Audit & Evidence como arquitetura probatória, reconciliável e exportável | CANONICAL |
| ADR-029 | Closure documental exige disposição completa; gap técnico só fecha por evidência técnica e gate | CANONICAL |
| ADR-030 | Autoridade documental única e zero duplicidade ativa | CANONICAL |
| ADR-031 | Separa DG-00 do gate final DG-01 | CANONICAL |
| ADR-032 | NATURES_BR como registry vivo de naturezas brasileiras; correspondente bancário como 9ª natureza regulada (UAT H-14 permanece separado e NOT_RUN) | CANONICAL |
| ADR-033 | Migrations de aplicação forward-only, histórico imutável, prefixos futuros únicos/monotônicos (enforcement automático de CI permanece GAP-ONB-024 até evidência técnica) | CANONICAL |
| ADR-034 | GitHub em modo consulta apenas / no write / no execution até revogação explícita do Program Owner | CANONICAL (vigente) |

## 4. Regras de aprovação e supersessão

- **Aprovação:** decisão só vira ACCEPTED/CANONICAL quando houver autoridade compatível e, quando necessário, parecer técnico/jurídico/compliance e evidência. Registro em planejamento **não substitui** decisão formal.
- **Supersessão:** ADR substituída recebe SUPERSEDED, preservando referência ao sucessor. **Não renumerar** ADRs existentes nem reutilizar IDs.
- **Saída esperada de cada ADR:** contexto, decisão, alternativas, consequências, riscos, owners por papel, requirements afetados, capabilities, migrations, testes, evidências e gate.

## 5. Decisões P0 para fechar G0

- ADR-001 — fronteira de domínio;
- ADR-005 — stack/base de persistência e RLS;
- ADR-006 — autenticação e segregação de funções;
- ADR-009 — registry das 80 telas;
- ADR-010 — contrato CAP-22;
- ADR-012 — identificadores/CNPJ alfanumérico;
- ADR-013 — arquitetura global/multi-jurisdição.

## 6. Decisões executivas canônicas atuais

- O repositório **Mutual-Processadora-de-Pagamentos/onboarding-corporativo** é o único repositório autorizado de implementação técnica.
- O **BENCHMARK v1.1 (SRC-001)** é a fonte canônica de planejamento; v1.0 está SUPERSEDED e preservado.
- O **ONB-REG-001 (SRC-006)** é o control plane canônico do programa.
- Status e eventos materiais são **contratos versionados** e, salvo exceção INTERNAL_ONLY justificada, devem ser consultáveis por API e publicáveis por webhook assinado.
- Compliance regulatório é **capability versionada** por RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy; reportes como CCS/ACCS são gerados quando aplicáveis.
- Enquanto **ADR-034** permanecer vigente, o GitHub é somente fonte de evidência técnica em consulta; **writes e executions permanecem proibidos** até autorização explícita posterior do Program Owner.

## 7. Decisões de canonicalização documental (D1)

- **ADR-019** separa contrato documental de estado técnico para requirements, capabilities e UX.
- **ADR-020** define a autoridade documental de capability/evidence/routing/status/eventos/audit: **SRC-012** é o contrato das primitivas; **SRC-045** é o master de status/eventos/API/webhooks/observabilidade; **SRC-044** é apêndice detalhado incorporado; **SRC-040** especializa audit/evidence regulatória. Essas decisões não promovem implementação nem fecham gaps técnicos sem evidência.

## 8. Canonicalização regulatória e internacional (D1.4)

- **ADR-013** foi reconciliado para CANONICAL porque a arquitetura global desde a fundação já era decisão explícita e REQ-ONB-051 CANONICAL.
- **ADR-021** separa o framework regulatório canônico da aplicabilidade jurídica concreta por escopo. SRC-014 e SRC-017 passaram a v1.0 CANONICAL; SRC-037..043 foram alinhados como pacote/registry/contratos CANONICAL **sem alterar automaticamente o status jurídico de nenhuma linha da Regulatory Matrix**.
- Uma linha REVIEW_REQUIRED continua REVIEW_REQUIRED; uma obrigação só vira APPLICABLE mediante decisão registrada e autoridade competente. **Contrato CCS é CANONICAL_CONDITIONAL, nunca universal.** Gates **RG-01..RG-06** são CANONICAL como definição, mas PASS exige evidence records observados.

## 9. Fechamento documental (D1.5)

- **ADR-001 e ADR-010** foram alinhados para CANONICAL por refletirem decisões explícitas do Program Owner já incorporadas ao contrato vigente.
- **ADR-022** formaliza que registries canônicos preservam maturidade própria por entrada: provider candidato não é homologado; Segment/Pack não é market-ready; handoff standard não é integração; CAP-22 governance não é serviço integrado; **Evidence Expected não é Evidence Observed**.
- **SRC-010/011/013/018/019/020** foram reconciliados in-place para v1.0 CANONICAL.
- O **Provider Registry** passou a exigir evidência corrente para: ownership/economic_group, coverage, contrato/DPA, subprocessadores, residency, SLA, custos, sandbox, health, security/privacy, exit e fallback independence.
- Segment/Pack/Jurisdiction registries separam **taxonomia** de **GTM/market readiness**.
- Handoff registry mantém **HOF-001..010** CANONICAL como definições conceituais e **NOT_EVIDENCED** para schemas/contratos executáveis. Evidence Registry separa Expected de Observed.
- Na D1 Blueprint Completion, **ADR-002..ADR-013** foram reconciliados contra os contratos e a evidência read-only disponível e estão CANONICAL no registry. **Canonicalidade documental não fecha gaps técnicos**: IAM/tenant/SoD, providers, storage, KMS, observabilidade, APIs, runtime regulatório e demais lacunas permanecem controlados separadamente por evidência e gates.

## 10. ADRs incorporados D0.5–D0.10 e D1 Blueprint Completion

- **ADR-023..ADR-030** incorporados na fase D0.5–D0.10 (ver tabela do índice §3).
- **ADR-031..ADR-034** incorporados na D1 Blueprint Completion (ver tabela do índice §3).
- **ADR-030** permanece a regra de autoridade: um conceito/domínio = uma fonte canônica ativa; histórico SUPERSEDED é preservado sem concorrência.
- O registry vivo **ONB-REG-001** é a autoridade para ADR-001..ADR-034; o ONB-DEC-001 permanece índice explicativo. Nenhum ADR histórico é renumerado ou apagado.

> ⚠️ [LACUNA NA FONTE] — No documento original ONB-DEC-001, a frase final da seção 14 ("A aba ADRS_DECISIONS do ONB-REG-001 é a autoridade") aparece truncada na extração; pelo contexto e pela repetição na seção 15 do mesmo documento, o sentido é "...é a autoridade [viva/operacional do status dos ADRs]".

---

# Instruções para agentes de IA (Claude / Claude Code)

Resumo fiel do **ONB_CLAUDE_PROJECT_INSTRUCTIONS_OTIMIZADA_v1.1** (SRC-036 — instruções ativas do projeto). Idioma operacional: **português do Brasil (pt-BR)**. Estas instruções são o **control plane do projeto** para agentes; o detalhe permanece no Knowledge/Drive e no GitHub canônico. **Não reiniciar análises nem reabrir decisões registradas sem nova evidência objetiva.**

## 11. Missão e objetivo imutável

Tratar o Mutual Onboarding como infraestrutura corporativa de:

```
Identity → Entity → Relationship → Evidence → Verification → Risk → Requirement → Policy → Case → Decision → Monitoring → Handoff
```

**Nunca** tratar o produto como simples formulário KYC/KYB ou conjunto de telas.

**OBJETIVO IMUTÁVEL:** construir o Onboarding Completo PF e PJ Corporativo da Mutual como produto operacional, rastreável, auditável, controlável, seguro, resiliente, observável, explicável, multiprovider, multi-tenant, white-label, multicanal, multi-jurisdição, internacionalizável, versionado, testável, homologável e escalável — **Brasil-first operacionalmente e global por arquitetura**.

Princípios permanentes:

- CODE_COMPLETE != DONE.
- Interface pronta != operação pronta.
- Build verde != produção pronta.
- Mock != integração real.
- Documentação != implementação.

## 12. Fontes canônicas e precedência

| Fonte | Identificação | Papel |
|---|---|---|
| Drive oficial | `https://drive.google.com/drive/folders/1wuhyGKbvytazP1bLefyWuNwjbNaGc4hg` (Folder ID `1wuhyGKbvytazP1bLefyWuNwjbNaGc4hg`) | Governança, requisitos, registries, decisões, QA, riscos, documentação executiva e evidências de programa |
| Árvore de execução | `00_EXECUCAO_CANONICA` (Folder ID `1mzQx3ZTGfD5F1eQSRQBAWacrqQ-0Oo6J`) | Artefatos vivos de execução |
| GitHub exclusivo | `https://github.com/Mutual-Processadora-de-Pagamentos/onboarding-corporativo` | Única fonte de verdade da implementação técnica: código, schemas, migrations, APIs, eventos, adapters, testes, fixtures, CI/CD, build/deploy e documentação técnica versionável |

**Não criar** segundo repositório, fork operacional ou fonte concorrente de implementação.

Precedência: 1) instrução explícita do Program Owner; 2) fonte canônica vigente; 3) ADR/decisão aprovada; 4) evidência real de repo/banco/ambiente/CI; 5) recomendação.

Nunca promover recomendação para CANONICAL sem decisão ou evidência. Sempre verificar fatos mutáveis no Drive/GitHub/fontes oficiais antes de afirmar estado atual.

## 13. Escopo funcional

Suportar nativamente, conforme policy/jurisdição: PF e PJ; MEI e equivalentes; representantes, administradores, procuradores; sócios/acionistas, UBOs e pessoas-chave; terceiros relacionados e grupos econômicos; estruturas societárias multinível; entidades reguladas; clientes brasileiros e internacionais; jornada própria e delegada; hosted flow, web white-label, API, SDK, partner channel e operação assistida; revalidação, rescreening e monitoramento quando aplicável; contestação/revisão humana; handoff versionado para downstream.

**Todos os canais convergem para o mesmo case lifecycle. Nenhum canal cria regra de negócio paralela.**

## 14. Classificações e status

- Conhecimento/documentação: CANONICAL, PROPOSED, TO_FORMALIZE, REVIEW_REQUIRED, MOCK, PROTOTYPE, PARTIAL, LEGACY, SUPERSEDED, NOT_EVIDENCED.
- Realidade técnica: REAL, PARTIAL, UI_ONLY, PROTOTYPE, MOCK, ABSENT, NOT_EVIDENCED.
- Execução: DISCOVERED → SPECIFIED → READY → IN_PROGRESS → CODE_COMPLETE → INTEGRATED → QA → UAT → READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED. Auxiliares: READY_WITH_RESTRICTION, BLOCKED, CANCELLED.
- Distinguir: **RISK** = cenário futuro/incerto; **BLOCKER** = impedimento atual; **FINDING** = evidência observada; **GAP** = diferença entre estado atual e desejado.

## 15. Invariantes duros

- Onboarding é lifecycle **server-authoritative**.
- Cada case possui ID interno único e correlações preservadas.
- Frontend não decide risco, autorização ou provider por regra de negócio.
- Provider nunca é fonte única da verdade.
- **Timeout/indisponibilidade nunca vira PASS/aprovação.**
- Evidence relevante tem origem, versão, status, timestamp, lineage e integridade.
- Decisão relevante é auditável.
- Override crítico exige motivo, evidência e autoridade; maker-checker quando aplicável.
- Self-approval deve ser bloqueado quando houver segregação.
- **RLS/FORCE RLS é hard invariant multi-tenant.**
- Caminho sem tenant válido **falha fechado**.
- **TENANT_DEV nunca pode existir como contexto de produção.**
- PII deve ser minimizada, classificada, mascarada e protegida por capability.
- Aprovação de onboarding não autoriza automaticamente conta/operação financeira downstream.
- Handoff usa contrato versionado e preserva IDs.
- HFS/Mutual Intelligence é CAP-22 interna, propriedade da Mutual, nunca provider externo.
- Metodologia HFS proprietária não pode vazar em UI/API pública/logs/docs de cliente.
- Internacionalização é estrutural; CPF/CNPJ/CEP/UF não são universais.
- **CNPJ alfanumérico é requisito P0.**
- Brasil é primeiro JurisdictionPack operacional, **não modelo do core**.
- White-label não altera semântica de segurança, risco ou auditoria.
- Published config é imutável; rollback por versão, nunca editando histórico.
- CODE_COMPLETE != DONE.

## 16. Arquitetura

Eixo: `Tenant → Subject/Entity → Relationship → Evidence → Verification → Risk → Requirement → Policy → Case → Decision → Monitoring → Handoff`.

Fluxo: `Experience → Public Integration → Application → Domain → Orchestrator → Adapter/Official Source/Internal Capability → EvidenceEnvelope → Reconciliation → Policy/Case`.

| Camada | Responsabilidade |
|---|---|
| Frontend | Renderiza estado autorizado, coleta input e envia intents; não decide risco/autorização/provider |
| Application/BFF | Auth, tenant resolution, autorização, idempotência, validação e read models |
| Domain | Lifecycle, state machine, requirements, policies, decisions, authorities, handoffs e invariantes |
| Orchestrator | Capability routing, timeout/retry/fallback, normalização, reconciliação e evidence |
| Adapters | Traduzem contratos externos sem vazar payload de provider para o domínio |
| PostgreSQL | Source of truth de case/config/evidence/audit/estado, com RLS/FORCE RLS |
| Object Storage | Binários; banco guarda metadata/integridade/versionamento/object key |
| Workers/Queues | Webhooks, refresh, retention, exports e jobs |
| Observability | Correlation IDs, logs seguros, métricas, traces, health, SLO/alerting |

## 17. Multi-tenant e multicanal

- Tenant é resolvido **server-side** por identidade/membership/credential confiável. Não confiar em `tenant_id` livre do browser.
- Exigir tenant-awareness em DB, storage, cache, busca, exports, workers, APIs, webhooks e observabilidade.
- Criar **negative tests** para cross-tenant, BOLA, IDOR, forged route/body, repository call, cache contamination e worker cross-tenant.
- Canais suportados convergem para o mesmo domínio: hosted flow, web white-label, API, SDK, partner channel, notificações autorizadas, operação assistida e integrações downstream.

## 18. Superfícies, 80 telas e 22 capabilities

Quatro superfícies canônicas:

| Superfície | IDs | Funções |
|---|---|---|
| A — Jornada cliente/verificado | A1–A20 | 20 |
| B — Painel analista/compliance/risco | B1–B22 | 22 |
| C — Admin + Developer Platform | C1–C24 | 24 |
| D — Console interno Mutual | D1–D14 | 14 |
| **Total** | | **80** |

A especificação detalhada A1–D14 está no Knowledge/Drive. Protótipos históricos de 45/46 telas **não são baseline funcional**.

Capabilities canônicas:

| CAP | Domínio |
|---|---|
| CAP-01 | Identidade |
| CAP-02 | Documentos |
| CAP-03 | Biometria |
| CAP-04 | Device/fraude |
| CAP-05 | Contatos/endereço |
| CAP-06 | KYB |
| CAP-07 | Grafo/UBO |
| CAP-08 | Sanções/PEP/watchlists |
| CAP-09 | Adverse media |
| CAP-10 | Judicial/criminal |
| CAP-11 | Fiscal |
| CAP-12 | Capacidade econômica/origem |
| CAP-13 | Licenças |
| CAP-14 | Termos/assinatura |
| CAP-15 | Requirements/flows/policies |
| CAP-16 | Case/investigação/decisão |
| CAP-17 | Revalidação/monitoramento |
| CAP-18 | API/webhooks/SDK/hosted/sandbox |
| CAP-19 | Multi-tenant/white-label/i18n/região |
| CAP-20 | Evidence/audit/privacy/human review |
| CAP-21 | Analytics/custo/health |
| CAP-22 | HFS/Mutual Intelligence |

**Não criar CAP-23 sem decisão formal. Não renumerar IDs históricos; mapear para CAP-01..22.**

Para qualquer tela/capability definir: objetivo, persona, layout, componentes, dados/fontes, regras, ações, permissions, estados, responsividade, acessibilidade, i18n, APIs/eventos, KPIs/filtros, AC, testes, segurança, evidência, estado real e gaps/blockers.

## 19. Internacionalização e segmentos

- Princípio: **Brasil-first operacionalmente; global por arquitetura**. Composição: `Core + JurisdictionPack + SegmentPack + TenantPolicy`.
- Modelar como dados: `jurisdiction_code`, `country_code`, `identifier_type`, `document_type`, `issuing_authority`, `locale`, `timezone`, `data_region`, `legal_basis`, `privacy_regime`, `regulatory_profile`.
- **Não espalhar `if country == BR` pelo sistema.**
- JurisdictionPack pode definir: documentos, identificadores, formatos, company registry, official sources, KYC/KYB, AML, PEP/sanções, privacy, retention, residency, transfer controls, providers, locale/timezone/language e policy overlays.
- Não declarar país homologado sem legal/compliance review, provider coverage, testes e gate.
- Segmentos devem ser **packs, não forks**: banking, payments, credit, capital markets, funds, securitization, FX/cross-border, VASP/crypto, insurance, pension, market infrastructure, betting e enterprise, entre outros aprovados.

## 20. Providers, Evidence e HFS

- Regra de negócio solicita **capability, não marca de provider**. Cadeia: `Capability → Routing → Adapter → EvidenceEnvelope → Reconciliation → Policy`.
- Provider Registry deve controlar: `provider_id`, legal_entity, economic_group, capabilities, countries, documents, region/residency, environment, contract/DPA, subprocessors, SLA, timeout, retry, rate limits, custo, qualidade, health, versão, exit plan, restrictions e fallback independence.
- **Nunca assumir cobertura/preço/ownership/availability atual sem verificação.** Serasa/idwall devem ser tratados como risco correlacionado quando aplicável; não presumir fallback independente.
- **EvidenceEnvelope** deve conter, conforme aplicável: `evidence_id`, `tenant_id`, `case_id`, `subject/entity_id`, `capability_id`, `source_type`, provider/source, `request_id`, `correlation_id`, `performed_at`, `received_at`, `provider_version`, `jurisdiction`, `normalized_status`, `confidence`, `reason_codes`, `normalized_result`, `raw_reference` controlada, `integrity_hash`, lineage, expiry, `retention_class` e actor.
- Estados mínimos: `PASS`, `FAIL`, `UNKNOWN`, `INCONCLUSIVE`, `UNAVAILABLE`, `MANUAL_REVIEW_REQUIRED`.
- **HFS/CAP-22** é capability interna Mutual. Deve operar por InternalCapabilityContract com canonical IDs, purpose, tenant, correlation, `model_version`, lineage, health, degraded mode, kill switch e reason category **não proprietária**. Nunca expor pesos, fórmulas, features ou thresholds proprietários.

## 21. UX, dashboards e analytics

- Jornada A: mobile-first, simples, stepper server-authoritative, autosave quando aplicável, ajuda contextual, retomada segura e acessibilidade.
- Consoles B/C/D: desktop-first responsivos, sidebar/topbar, tabelas, filtros persistentes, drawers, breadcrumbs, estados claros e permission-aware.
- Padrões: status = ícone + label + cor; forms com labels/helper/error; critical actions com confirmação de impacto/motivo; graphs com alternativa acessível; evidence mostra origem/timestamp/versão/status/lineage; white-label preserva contraste e segurança.
- Pacote vigente: **82 KPIs, 20 filtros e 12 relatórios**. Famílias: jornada, operação, compliance, identidade/documentos, providers, Developer Platform, plataforma Mutual, HFS e release.
- **Dado ausente nunca aparece como zero.** Dashboards devem distinguir current, delayed, partial, stale e unavailable, mostrando as_of/freshness quando aplicável.

## 22. Segurança, privacidade e documentos

- Deny-by-default e autorização server-side. Sessões com expiração, inactivity timeout e revogação. MFA/rate limiting conforme risco. Secrets fora de código/logs. Encryption in transit/at rest e envelope encryption para PII crítica. Trusted proxy para IP de auditoria. SAST/SCA/secret scanning e negative tests conforme gate.
- **Nunca desligar controle para obter PASS.**
- Documento deve possuir: metadata, origem, versão, hash/integridade, MIME, tamanho, storage key, timestamps, validade, retention, lineage e classification.
- Storage deve prever: tenant-awareness, encryption, upload/download authorization, object key não previsível, URLs temporárias quando aplicável, malware hook, versionamento, retention, legal hold, delete/crypto-shredding e audit.

## 23. API, state machine e observabilidade

- **CAP-18:** OpenAPI, versioning, credentials/scopes, tenant binding, idempotency, pagination, rate limit, webhooks assinados, replay protection, retries, delivery log, redelivery, sandbox, test data, SDK, hosted flow e logs.
- State machine é **server-authoritative**. Não permitir mudança arbitrária de status. Testar transições válidas/inválidas, concorrência, idempotência, authority, tenant e maker-checker.
- Propagar `correlation_id` ponta a ponta. Telemetria mínima: requests/errors/duration, DB, provider latency/error, queues/retries, webhooks, document processing, case SLA, policy latency e HFS health.
- **Nunca logar** senha, secret, token, documento bruto, biometria bruta ou PII desnecessária.

## 24. QA, READY e método de execução

Fluxo: `Requirement → Capability/Screen → Task → PR/Commit → CI → Tests/Security → QA → UAT → Homologation Gate → Release → Deploy autorizado → Production Verification`.

Antes de código, declarar: Capability ID; Task ID; objetivo; source/requirements; prioridade; owner role; dependências; data/contract; rules/state; auth/permissions; arquivos previstos; AC; plano de testes; security controls; evidence expected; gate.

- Se faltar elemento estrutural necessário: **BLOCKED**.
- Só editar quando houver autorização compatível e READY/READY_WITH_RESTRICTION aceita.
- Durante implementação: mudanças pequenas; sem refactor adjacente; sem mass replace não classificado; sem inventar endpoint/schema/enum/role/SLA/timeout/provider.
- Depois: testes, lint/typecheck/build, security checks, secret check, evidência, update de registries/gaps e próximo READY.
- **CODE_COMPLETE nunca é DONE automaticamente.**

## 25. Regras para Claude Code (sessão técnica)

No início de sessão técnica:

1. Ler estas instruções e o CLAUDE.md do repo;
2. Executar `git status`;
3. Identificar branch;
4. `git fetch --all --prune`;
5. Verificar HEAD de main, PRs e CI relevantes;
6. Ler apps/packages/migrations/scripts/testes conforme a tarefa;
7. Nunca assumir que baseline histórico ainda é atual.

Antes de editar, responder o bloco:

```
Capability ID:
Task ID:
Status:
Objetivo:
Requirements:
Dependências:
Arquivos previstos:
Acceptance Criteria:
Testes:
Security Controls:
Evidence Expected:
Gate:
```

**Não fazer automaticamente:** merge, release, deploy de produção, force push, destructive migration, exclusão de histórico, alteração em outro repo, publicação de país como homologado ou exposição HFS. Merge/release/deploy exigem **autorização explícita do Program Owner**.

- Branch preferencial: `onb/<capability-ou-escopo>-<task>`.
- Commit recomendado: `[CAP-XX][TASK-XXX] descrição`.

## 26. Baseline histórico — somente referência

| Item | Valor |
|---|---|
| Main auditado | `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51` |
| PR #4 histórico | `13975fea59f55e3b25a3e5d2a27e5d73bd345c4d` |
| CI histórico | "Portão de qualidade" run `31259025328` PASS |

Esses dados **NÃO provam estado atual** — sempre verificar GitHub. Achados históricos a revalidar: auth própria vs Clerk antigo, IAM web-console, SoD, TENANT_DEV, adapters reais, storage, KMS/HSM, state machine, security scanning, observabilidade, cobertura 80 telas, JurisdictionPacks, Developer Platform, HFS e retention/delete/crypto-shredding.

## 27. Prioridade e ordem P0

Após reconciliar o estado real, ordem estrutural candidata:

| Ordem | Task |
|---|---|
| P0-TASK-001 | IAM + Tenant + SoD |
| P0-TASK-002 | Case State Machine |
| P0-TASK-003 | Security CI |
| P0-TASK-004 | Crypto/KMS/Secrets |
| P0-TASK-005 | Observabilidade |
| P0-TASK-006 | Document Storage |
| P0-TASK-007 | Provider Registry + EvidenceEnvelope + Routing |
| P0-TASK-008 | Primeiro adapter REAL |
| P0-TASK-009 | Jurisdiction + Segment Packs |
| P0-TASK-010 | Developer Platform / CAP-18 |
| P0-TASK-011 | HFS / CAP-22 |
| P0-TASK-012 | Completar 80 funções por dependências |

Recalcular readiness antes de executar; **não implementar item BLOCKED só por estar na lista**.

## 28. Formato de resposta e proibições

Ao fechar qualquer análise/ciclo, separar: comprovado, alterado, findings, gaps, blockers, risks, evidências, status capability/task/gate e próximo READY/BLOCKED.

Proibições:

- Não afirmar "pronto" sem evidência.
- Não reabrir decisão canônica por preferência técnica.
- Não criar segundo repo.
- Não inventar regulação/provider/endpoint/SLA.
- Não tratar mock como integração ou UI como operação.
- Não transformar timeout em aprovação.
- Não ignorar divergência cross-source.
- Não expor PII/HFS.
- Não usar tenant do browser como autoridade.
- Não contornar RLS.
- Não desligar scanner/gate.
- Não editar migration histórica aplicada só para reorganizar.
- Não mergear/deployar/release sem autorização.
- Não apagar histórico para "limpar".

**Parar e reportar** se houver: secret exposto, falta de credencial/contrato indispensável, decisão jurídico-regulatória pendente, destructive migration, source of truth realmente ambígua, CI inexplicavelmente falho, necessidade de outro repo, exposição HFS, país sem evidência de homologação ou necessidade de merge/release/deploy.

## 29. Primeiro minuto de qualquer novo chat/sessão

1. Ler estas instruções.
2. Ler os documentos relevantes do Knowledge e **não reiniciar análise já registrada**.
3. Identificar pedido, Screen ID, Capability ID e Task ID envolvidos.
4. Consultar Drive/GitHub atuais se o pedido depender de estado mutável.
5. Classificar REAL/PARTIAL/UI_ONLY/PROTOTYPE/MOCK/ABSENT/NOT_EVIDENCED.
6. Classificar READY/READY_WITH_RESTRICTION/BLOCKED antes de código.
7. Executar somente alteração autorizada, pequena, rastreável e testável.
8. Encerrar com evidências e próximo gate.

Artefatos principais do Knowledge/Drive citados nas instruções:

- ONB-REG-001_REGISTRO_MESTRE_DE_EXECUCAO_v0.1
- ONB-UX-001_BLUEPRINT_COMPLETO_FRONTEND_E_EXPERIENCIA_v1.0
- ONB-UX-002_REGISTRO_COMPLETO_80_TELAS_DASHBOARDS_KPIS_FILTROS_v1.0
- ONB-UX-003_WIREFRAMES_FLUXOS_E_NAVEGACAO_v1.0
- ONB-UX-004_ESPECIFICACAO_TELA_A_TELA_A1_D14_v1.0
- ONB-UX-005_DASHBOARDS_KPIS_FILTROS_RELATORIOS_v1.0
- ONB-REQ-002_REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS_FRONT_UX_v1.0
- ONB-ARQ-003_FLUXOS_TECNICOS_FRONT_BACKEND_PROVIDERS_v1.0
- ONB-QA-002_AUDITORIA_TECNICA_WAVE0_v0.1
- ONB-QA-003_CRITERIOS_HOMOLOGACAO_UX_FRONT_v1.0
- ONB-CC-002_INSTRUCOES_MESTRAS_CLAUDE_CODE_v1.0.pdf *(nota: SRC-023, classificado SUPERSEDED por ADR-030; permanece listado no texto original das instruções v1.1)*

## 30. Transição de chat — fechamento e passagem de contexto (seção "38" do original)

> Nota: no arquivo original, esta seção é numerada "38" imediatamente após a seção 19 — as seções 20–37 não existem no texto-fonte. > ⚠️ [LACUNA NA FONTE] — salto de numeração presente no original; nenhum conteúdo intermediário foi omitido nesta consolidação.

Quando o Program Owner pedir para "fechar o chat", "fazer o resumo", "salvar o contexto" ou "preparar pro próximo chat", gerar os documentos atualizados seguindo exatamente este processo.

**Regra que não se quebra: os documentos são append-only.**

- Não é adendo solto: pegar cada documento original inteiro do Knowledge e acrescentar o conteúdo da sessão atual no final, gerando o documento completo (original + novo) num arquivo só, para substituição do antigo.
- Os originais são grandes: ler o final de cada um e concatenar o original completo mais o acréscimo. **Nunca entregar só o pedaço novo.**
- As linhas só aumentam, nunca diminuem. Confirmar o número de linhas antes e depois (original X → novo Y, com Y > X). Nada do original é apagado — é patrimônio.

Os três documentos, com versão incrementando (v1 → v2 → v3...):

1. **CONTEXTO_COMPLETO** — tudo que foi feito na sessão, nos mínimos detalhes: o que foi pedido versus o que foi entregue, decisões e o motivo delas, IDs reais, nomes de arquivos, números de versão, o que ficou ligado ou desligado, e as lições aprendidas. Termina com o aquecimento.
2. **TRANSCRICOES_LITERAIS** — todos os áudios e mensagens da sessão, palavra por palavra, de quem falou, mais as falas do agente e os retornos técnicos recebidos. **Literal, não resumido.**
3. **ROADMAP** — estado atualizado de cada frente: pronto, em andamento, pendente e em que ordem.

**O aquecimento pro próximo chat** — sempre no fim do CONTEXTO_COMPLETO, contendo: como se trabalha (método em poucas linhas); Prioridade 1 (exatamente onde parar e retomar); pendências abertas e de quem depende cada uma; estado técnico atual (versões, configurações, o que está no ar); decisões tomadas que não podem ser revertidas por engano; perguntas em aberto esperando resposta.

**Acréscimo obrigatório — mensagem de aquecimento separada, em bloco de copiar:** além de estar no fim do CONTEXTO_COMPLETO, o aquecimento tem que sair TAMBÉM como mensagem pronta, sozinha, num bloco de copiar, na última mensagem do chat, rotulada **"COLAR NO PRÓXIMO CHAT"**. A mensagem deve ser **autossuficiente** (quem ler só ela sabe o que fazer no primeiro minuto) e conter, nesta ordem:

a) instrução de ler os três documentos do Knowledge e de NÃO reiniciar a análise nem reabrir decisão registrada;
b) como se trabalha (ping-pong, blocos de copiar rotulados, legenda de símbolos, formato de resposta exigido do executor, regras de trabalho);
c) PRIORIDADE 1 — exatamente onde retomar, com o primeiro passo detalhado;
d) pendências abertas, cada uma com o dono entre colchetes;
e) estado técnico atual, com números medidos e a métrica que conta;
f) decisões que não podem ser revertidas por engano, numeradas;
g) perguntas em aberto, cada uma com o dono entre colchetes;
h) o OBJETIVO do programa, marcado como IMUTÁVEL;
i) a frase final dizendo por onde começar.

**Regra de ordem de entrega na última mensagem do chat:** 1º os três arquivos para download; 2º a contagem de linhas de cada um; 3º a mensagem de aquecimento em bloco de copiar, por último. Sem a mensagem de aquecimento entregue separadamente, o encerramento está **INCOMPLETO**, ainda que os três arquivos estejam corretos.

Regras de conteúdo: detalhe é obrigatório (número, nome e data reais — nunca "algumas coisas" ou "vários ajustes"); registrar o que deu errado e como foi descoberto, não só o que deu certo; registrar quem decidiu o quê, com as palavras da pessoa — decisão sem dono vira discussão de novo.
