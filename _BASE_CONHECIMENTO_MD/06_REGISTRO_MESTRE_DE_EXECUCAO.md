---
titulo: "Registro Mestre de Execução (ONB-REG-001) — Control Plane Canônico do Programa Mutual Onboarding"
fontes:
  - "ONB-REG-001_REGISTRO_MESTRE_DE_EXECUCAO_v0.1.xlsx (CANONICAL / LIVING EXECUTION REGISTRY)"
status_fonte: CANONICAL / LIVING EXECUTION REGISTRY
gerado_em: 2026-08-09
---

# Registro Mestre de Execução (ONB-REG-001 v0.1)

> Representação estruturada em Markdown da planilha **ONB-REG-001** — registry vivo e **control plane canônico** do programa Mutual Onboarding. Uma seção por aba. Textos longos foram condensados; trechos marcados com "(…)" indicam texto truncado na condensação. IDs, status e todas as linhas foram preservados.

**Abas encontradas (28):** README, ADRS_DECISIONS, WAVES_TASKS, GATES, EVIDENCE, SEGMENTS, PACKS, HANDOFFS, _LISTS, JURISDICTIONS, CODE_INVENTORY, SOURCE_MANIFEST, TRACEABILITY_D2, ADJACENT_CAPABILITIES, APPLICABILITY, SEMANTIC_REGISTRY, TRACEABILITY_MASTER, TRACEABILITY_SUMMARY, NATURES_BR, READINESS, MOVEMENT_LOG, REQUIREMENTS, CAPABILITIES, SCREENS, GAPS, RISKS, FINDINGS_BLOCKERS, PROVIDERS.

---

## README

| Campo | Valor |
|---|---|
| Status do artefato | CANONICAL / LIVING EXECUTION REGISTRY |
| Versão | 0.1 — File ID estável; versão elevada apenas no fechamento da baseline documental reconciliada |
| Data-base | 2026-08-09 |
| Raiz canônica Drive | Mutual Onboarding / 00_EXECUCAO_CANONICA |
| Fonte principal | SRC-001 — MUTUAL_ONBOARDING_CORPORATIVO_PLANEJAMENTO_COMPLETO_BENCHMARK_v1.1 — CANONICAL |
| Regra de domínio | Onboarding é produto/repositório separado; Backoffice e demais sistemas aparecem apenas por contratos/handoffs versionados |
| Princípio | Drive = base canônica de conhecimento/governança; GitHub = única verdade de implementação; documentação/protótipo != evidência; CODE_COMPLETE != DONE |
| Objetivo | Controlar Source→Requirement→Capability→Policy/Rule→Screen/API/Event/Data→Provider→Task→Test→Evidence→Gate→Release→Production Verification |
| Fase atual | PÓS-DG-01 — documentação pronta para implementação sobre SRC-050 v1.1 / EVD-ONB-022. Nenhuma CAP-01..22 está READY; CAP-19 é a primeira candidata, mas está NOT READY/BLOCKED por IAM/SoD/tenant/hardening. Nenhuma execução técnica no GitHub |
| Freeze técnico | ADR-034 vigente — GitHub consultation-only/no-write/no-execution. DG-01 PASS não revoga essa proibição; implementação exige autorização explícita posterior do Program Owner |
| Regra de autoridade | ADR-030: um conceito/domínio = uma autoridade canônica ativa; histórico SUPERSEDED é preservado sem concorrer |

O README também lista a função de cada aba (refletida nas seções abaixo).

---

## ADRS_DECISIONS

35 ADRs registradas, todas com status **CANONICAL** (ADR-001..035; a numeração vai até ADR-035 e o índice de baseline refere "34 ADRs" — a linha ADR-035 coexiste com ADR-034 no registry).

| ADR ID | Decisão | Status | Domínio | Resumo (condensado) | Gate |
|---|---|---|---|---|---|
| ADR-001 | Separação Onboarding x Backoffice | CANONICAL | Arquitetura | Onboarding é soberano sobre case/evidência/decisão; demais sistemas integram somente por contratos/handoffs versionados, sem autorização financeira automática | G0/G8 |
| ADR-002 | Capability Contract Layer | CANONICAL | Arquitetura | Domínio, motor, flows e policies dependem de capabilities versionadas, nunca de brands/providers; canonicalidade não implica adapters reais (GAP-ONB-012/022 abertos) | G3/DG-01 |
| ADR-003 | EvidenceEnvelope | CANONICAL | Dados/Arquitetura | Envelope canônico de normalização/proveniência para evidência interna e externa, versionado e correlacionável; materialização E2E sujeita a gaps/gates | G3/G5/DG-01 |
| ADR-004 | Routing/Fallback/Degraded Mode | CANONICAL | Arquitetura/Resiliência | Contrato canônico auditável por capability, tenant, jurisdição, qualidade, custo, disponibilidade, contrato e economic_group; fallback nunca autoriza aprovação sem evidência | G3/G9/DG-01 |
| ADR-005 | Stack TypeScript strict + PostgreSQL/RLS | CANONICAL | Tecnologia/Arquitetura/Dados | Node/TypeScript strict, PNPM/Turbo e PostgreSQL; isolamento multi-tenant é hard invariant no DB via RLS/FORCE RLS e papel NOBYPASSRLS | G1 |
| ADR-006 | Auth, RBAC/ABAC e SoD | CANONICAL | Segurança/IAM | Autoridade canônica de autenticação é a camada própria do produto; papéis são conjunto, não escada; deny-by-default e tenant-bound; maker-checker exige identidade real; Clerk deixa de ser caminho crítico (…) | G0/G1/G7/DG-01 |
| ADR-007 | Retention/Residency/Crypto-shredding | CANONICAL | Privacidade/Dados | Contrato condicionado por classe de dado, jurisdição, tenant, finalidade e legal hold; expiração/revalidação não equivale a eliminação; implementação aberta em GAP-ONB-014/020 | G6/G9/DG-01 |
| ADR-008 | Official Source Eligibility | CANONICAL | Compliance/Dados | Fonte pública, canal restrito, consentido/autorizado e fonte contratada são classes distintas; elegibilidade avaliada server-side, versionada e evidenciada | G4/G6/DG-01 |
| ADR-009 | SCREEN_REGISTRY v2 = 80 IDs | CANONICAL | Produto/QA | Screen Registry canônico com 80 IDs funcionais A1..D14; contagens históricas 45/46/56 são cobertura técnica observada, não contrato | G0/H-01/DG-01 |
| ADR-010 | CAP-22 HFS interna | CANONICAL | Model Governance | HFS/Mutual Intelligence é CAP-22 interna, propriedade da Mutual, com boundary de IP e governança própria; nunca provider externo | G5 |
| ADR-011 | Provider economic_group obrigatório | CANONICAL | Procurement/Arquitetura | economic_group é atributo obrigatório do Provider Registry para risco de concentração e independência de fallback; hipótese histórica permanece TO_VERIFY_CURRENT | G3/H-17/DG-01 |
| ADR-012 | CNPJ alfanumérico end-to-end | CANONICAL | Dados/Compatibilidade | CNPJ alfanumérico E2E sem pressuposto numérico em domínio, APIs, UI, adapters, validações, storage, busca, exports e testes; GAP-ONB-004 permanece CRÍTICO/OPEN | G1/H-09/DG-01 |
| ADR-013 | Arquitetura multi-jurisdição e internacionalização | CANONICAL | Produto/Arquitetura/Dados | Brasil-first operacionalmente, global por arquitetura; Core + JurisdictionPack + RegulatoryPack + SegmentPack + TenantPolicy; nenhum país READY_FOR_MARKET sem activation gate/evidência | G0/G1/G6/G7 |
| ADR-014 | GitHub único para implementação técnica | CANONICAL | Governança/Arquitetura/Engenharia | Mutual-Processadora-de-Pagamentos/onboarding-corporativo é o único repositório de implementação; Drive é governança/documentação | G0 |
| ADR-015 | Canonização do planejamento v1.1 | CANONICAL | Produto/Governança | BENCHMARK v1.1 é fonte de planejamento canônica; v1.0 preservado SUPERSEDED em 99_HISTORICO_E_SUPERSEDED | G0 |
| ADR-016 | Status e evento como contrato público | CANONICAL | Arquitetura | Status e evento são contrato versionado exposto por API e webhook, não detalhe interno | G7 |
| ADR-017 | Compliance regulatório como capability versionada | CANONICAL | Produto/Compliance/Arquitetura | Regras regulatórias não ficam hardcoded em tela; compõe RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy, com trilha/evidência e reportes (inclusive CCS quando aplicável) | G0/G7 |
| ADR-018 | Congelamento técnico para reconciliação documental | CANONICAL | Governança/Execução | Desenvolvimento pausado até baseline documental reconciliada; GitHub consultado em modo leitura/evidência; retomada exige baseline e novo readiness/gate | G0 |
| ADR-019 | Canonização dos catálogos de produto e UX | CANONICAL | Produto/Arquitetura/UX/QA | REQ-ONB-001..068, CAP-01..22, A1..D14, RF-UX-001..050, RNF-UX-001..040 e SRC-024..032 são contrato canônico de estado desejado; CANONICAL não implica implementação/READY/QA/produção | G0 |
| ADR-020 | Autoridade mestre de status, eventos, evidence e audit | CANONICAL | Arquitetura/Dados/Observabilidade/Auditoria | SRC-045 master de status/eventos/API/webhooks/observabilidade; SRC-044 apêndice; SRC-012 governa Capability/Evidence/Routing; SRC-040 especializa audit regulatória; famílias ST-SCR..ST-PRIV PROPOSED | G2/G7/G9 |
| ADR-021 | Framework regulatório canônico x aplicabilidade jurídica concreta | CANONICAL | Compliance/Legal/Produto/Arquitetura | Mecanismo de packs, catálogo de declarações, matriz de aplicabilidade e gates são canônicos; cada norma só se torna APPLICABLE por decisão registrada de autoridade competente (…) | G0/G6/G7/G9 |
| ADR-022 | Registry canônico não equivale a homologação, contratação ou readiness | CANONICAL | Governança/Procurement/Produto/Integrações/Release | Candidato não é provider homologado; taxonomia não é GTM readiness; handoff standard não é integração; EVIDENCE_EXPECTED não é EVIDENCE_OBSERVED | G0/G3/G5/G8/G9 |
| ADR-023 | Tenant e canal independentes ou hierárquicos por configuração | CANONICAL | Arquitetura/Produto/Segurança | Tenant e Canal são dimensões distintas de primeira classe, sem relação 1:1 obrigatória; associação por configuração versionada; nenhuma camada infere um pelo outro | G1/G7/G9 |
| ADR-024 | Capacidades econômicas adjacentes e separação de source of truth | CANONICAL | Arquitetura/Produto/Financeiro/Integrações | ADJ-01..08 são capacidades adjacentes canônicas; Onboarding é autoridade de identidade/vínculo/elegibilidade/evidência; Partner/Commercial e Payments/Ledger/Settlement são autoridades dos programas e cálculos (…) | G0/G7/G9 |
| ADR-025 | Conditional-by-Design como invariante absoluta | CANONICAL | Arquitetura/Produto/Compliance/Governança | Aplicabilidade não é implícita nem universal; todo item declara CORE_MANDATORY ou possui regra versionada de ativação/não aplicação/proibição/revisão avaliada server-side | G0/G2/G7/G9 |
| ADR-026 | Documentary Assurance D0.1-D4 adaptado ao Mutual Onboarding | CANONICAL | Governança/Execução | Método D0.1 Freeze → … → D0.10 Gate documental → D1 Blueprint Completion → D2 Cross-review → D3 Freeze → D4 retomada de código (…) | DG-01/G0 |
| ADR-027 | Modelo semântico canônico e separação de dimensões/artefatos | CANONICAL | Arquitetura/Governança/Dados/Produto | SRC-048/SEMANTIC_REGISTRY é autoridade semântica viva; separa Tenant/Channel/InteractionSource/WhiteLabelProfile; eixos distintos de status; DomainEvent ≠ Command ≠ AuditRecord ≠ WorkerJob ≠ WebhookDelivery (…) | G0/G2/G7/DG-01 |
| ADR-028 | Audit & Evidence como arquitetura probatória, reconciliável e exportável | CANONICAL | Arquitetura/Compliance/Segurança/Dados | Fatos materiais formam cadeia probatória append-only, versionada, correlacionável, reproduzível, consultável e exportável (CSV/XLSX/JSON/JSONL/PDF/EvidenceBundle/formatos regulatórios) (…) | G2/G5/G6/G7/G9/DG-01 |
| ADR-029 | Closure documental exige disposição completa; gap técnico só fecha por evidência técnica e gate | CANONICAL | Governança/QA/Arquitetura | Pendência documentalmente fechada = owner + disposição + Evidence Expected + critério + gate; gaps técnicos permanecem OPEN até implementação, testes, Evidence Observed e Gate PASS (…) | G0/DG-01 |
| ADR-030 | Autoridade documental única e zero duplicidade ativa | CANONICAL | Governança/Arquitetura/Produto/QA | Cada conceito/domínio possui uma única fonte canônica ativa; artefato substituído é SUPERSEDED e movido para 99_HISTORICO (…) | G0/DG-01 |
| ADR-031 | Separar checkpoint D0.10 do gate final DG-01 | CANONICAL | Governança/Execução/QA | DG-00 criado como checkpoint D0.10→D1; DG-01 permanece gate final e só PASS após D1+D2+D3 (…) | DG-00/DG-01 |
| ADR-032 | Naturezas BR governadas por registry vivo; correspondente bancário é a 9ª natureza regulada | CANONICAL | Produto/Compliance/Arquitetura/QA | Autoridade viva na aba NATURES_BR; natureza é seleção de contexto e pode ser conjunto; catálogo BR: PF/PJ/MEI não reguladas + 9 reguladas (…) | G0/H-14/DG-01 |
| ADR-033 | Migrations de aplicação são forward-only, imutáveis e com prefixo futuro único e monotônico | CANONICAL | Dados/Engenharia/QA/Arquitetura | Migrations aplicadas são imutáveis; legado 0001/0002/0003 duplicado é grandfathered; novas migrations com prefixo numérico 4 dígitos único (ordem lexical LC_ALL=C) (…) | G1/G9/DG-01 |
| ADR-035 | Provider Registry usa tiers de evidência e separa vendor, handoff e fonte oficial | CANONICAL | Procurement/Architecture/Compliance/Legal | Fato público oficial pode preencher capability scope/coverage/ownership com Last Verified; não prova SLA, preço, DPA, residency, exit; campos permanecem RFP_REQUIRED/CONTRACT_REQUIRED/NOT_EVIDENCED (…) | G3/G4/G5 |
| ADR-034 | GitHub opera em modo consultation-only durante o freeze técnico | CANONICAL | Program/Governance/Engineering/Security | Repositório somente leitura: proibidos edição, commit, push, PR, merge, execução de teste/build/migration/CI, release, deploy e alteração de infra/secrets; DG-01 PASS não revoga (…) | G0/G1 |

---

## WAVES_TASKS

### Waves W0–W11

| Wave | Nome | Estado | Objetivo (condensado) | Exit Gate |
|---|---|---|---|---|
| W0 | Canonicalização e decisão de produto | IN_PROGRESS | Convergir fontes, registries, ADRs, baseline e gates | G0 |
| W1 | Compatibilidade e fundações P0 | BLOCKED | Tenant isolation, IAM/SoD, channel context e white-label com plano W1/CAP-19 formalizado; execução bloqueada por ADR-034 e gaps críticos | G1 |
| W2 | Case lifecycle + jornada | NOT_STARTED | Plano de readiness formalizado em SRC-058/EVD-031; dependente de G1/CAP-19/CAP-20 | G2 |
| W3 | Identidade/documento/fraude | NOT_STARTED | Plano em SRC-059/EVD-032; integrações reais/procurement/security pendentes | G3 |
| W4 | KYB + fontes oficiais Brasil | NOT_STARTED | Plano em SRC-060/EVD-033; GAP-004 CNPJ alfanumérico E2E e adapters/fontes/licenças pendentes | G4 |
| W5 | AML/EDD global + HFS | NOT_STARTED | Plano em SRC-061/EVD-034; fontes reais, explicabilidade E2E e CAP-22/model governance pendentes | G5 |
| W6 | Due diligence Brasil + privacy | NOT_STARTED | Plano em SRC-062/EVD-035; KMS, retention execution, legal hold e fontes reais pendentes | G6 |
| W7 | Admin, products e developer platform | NOT_STARTED | Plano em SRC-063/EVD-036; CAP-18, API/webhooks/SDK/sandbox, packs runtime pendentes | G7 |
| W8 | Monitoramento contínuo e handoffs | NOT_STARTED | Plano em SRC-064/EVD-037; CAP-17 E2E, provider health, HOF executáveis pendentes | G8 |
| W9 | Resiliência, segurança e performance | NOT_STARTED | Plano em SRC-065/EVD-038; own-SHA CI, scanners, KMS, observability, runbooks e pentest pendentes | G9 |
| W10 | UAT Mutual cliente nº1 | NOT_STARTED | Plano em SRC-066/EVD-039; execução UAT, H-14 e sign-offs NOT_STARTED | G10 |
| W11 | Piloto controlado e release | NOT_STARTED | Plano em SRC-067/EVD-040; release/deploy/production verification proibidos sob ADR-034 | RELEASE |

### Tasks W0 (TASK-W0-001..033)

| Task ID | Task | Estado | Evidência esperada/observada (condensada) |
|---|---|---|---|
| TASK-W0-001 | Criar estrutura canônica de execução no Drive | DONE | Árvore 00_EXECUCAO_CANONICA verificada; inventário reconciliado em SRC-046 |
| TASK-W0-002 | Formalizar Source Manifest | DONE | SOURCE_MANIFEST reconciliado; ausências corrigidas como SRC-044/SRC-045; inventário SRC-046 |
| TASK-W0-003 | Formalizar SCREEN_REGISTRY v2 e mapear para código | DONE | 80 Screen IDs CANONICAL; mapping Design×Código: 31 PARTIAL, 35 NOT_EVIDENCED, 14 ABSENT no main; EVD-ONB-008 |
| TASK-W0-004 | Formalizar CAPABILITY_MATRIX | DONE | CAP-01..22 CANONICAL com technical state D2: 16 PARTIAL e 6 NOT_EVIDENCED; EVD-ONB-008 |
| TASK-W0-005 | Reconciliar auth docs x code | DONE | ADR-006 CANONICAL; drift do README classificado, GAP-ONB-001 OPEN sob ADR-034 |
| TASK-W0-006 | Reconciliar 9ª natureza | DONE | NATURES_BR canoniza 9/9 reguladas; ADR-032 fixa correspondente_bancario; GAP-ONB-003 OPEN só para UAT H-14 |
| TASK-W0-007 | Provar CI HEAD atual | BLOCKED | CI histórica existe para PR #4; baseline/main/release sem run próprio; ADR-034 proíbe disparar workflow |
| TASK-W0-008 | Fechar ADRs P0 | DONE | ADR-001..034 CANONICAL no registry vivo; gaps técnicos separados por ADR-029 |
| TASK-W0-009 | Construir RFP/RFI/provider matrix | IN_PROGRESS | RFP/RFI standard + Provider Registry schema canônicos; tranche pública 1 em execução; pricing/SLA/DPA RFP/CONTRACT_REQUIRED |
| TASK-W0-010 | Determinar primeira capability READY | DONE | Readiness pós-DG-01 (EVD-ONB-021): nenhuma CAP READY; CAP-19 primeira candidata, NOT READY/BLOCKED |
| TASK-W0-011 | Formalizar pacote completo Front/UX das 80 telas | DONE | SRC-024..032 canonizados; 80 telas, 82 KPIs, 20 filtros, 50 RF, 40 RNF, 12 user flows, 12 tech flows, 12 relatórios, 400 AC; EVD-ONB-003 |
| TASK-W0-012 | Empacotar distribuições exportável e Claude Code | DONE | SRC-034..036 no Drive com hashes registrados |
| TASK-W0-013 | Formalizar pacote regulatório, trilha de auditoria e CCS | DONE | SRC-037..043 canonicalizados; ADR-021; EVD-ONB-005; implementação técnica GAP-036..040 OPEN |
| TASK-W0-014 | Executar revisão documental canônica completa e reconciliação Drive x GitHub | DONE | D0.1-D3 concluídos; DG-01 PASS documental; ADR-034 vigente |
| TASK-W0-015 | Canonicalizar núcleo de governança documental | DONE | SRC-007/009/015/016 atualizados para v1.0 CANONICAL; EVD-ONB-002 |
| TASK-W0-016 | Canonicalizar requisitos, CAP-01..22 e Screen Registry/UX | DONE | ADR-019; REQUIREMENTS/CAPABILITIES/SCREENS canonizados; EVD-ONB-003 |
| TASK-W0-017 | Canonicalizar arquitetura de capability/evidence/status/eventos/audit | DONE | ADR-020; SRC-012/045/044/040 CANONICAL; GAP-031..035 refinados; EVD-ONB-004 |
| TASK-W0-018 | Canonicalizar compliance, regulatório e arquitetura internacional | DONE | ADR-013 + ADR-021; SRC-014/017, SRC-037..043 CANONICAL; GAP-036..040 refinados; EVD-ONB-005 |
| TASK-W0-019 | Canonicalizar providers/HFS/segmentos/packs/handoffs/evidence-release | DONE | ADR-022; SRC-010/011/013/018/019/020 v1.0 CANONICAL; registries endurecidos; EVD-ONB-006 |
| TASK-W0-020 | Executar D2 baseline técnico e matriz especificação × código | DONE | SRC-008 v0.4 + CODE_INVENTORY TECH-001..041 + TRACEABILITY_D2 TRC-D2-001..032 + EVD-ONB-007/008/011/012 |
| TASK-W0-021 | Canonizar participantes econômicos e handoffs (afiliados/referral/split/comissões/settlement) | DONE | SRC-047 + ADR-024 + REQ-ONB-070..075 + ADJ-01..08 + HOF-007..010; GAP-043..045 abertos |
| TASK-W0-022 | Formalizar Conditional-by-Design e Applicability Registry | DONE | REQ-ONB-076 + ADR-025 + APPLICABILITY APP-001..011; EVD-ONB-010 |
| TASK-W0-023 | Mapear revisão existente para Documentary Assurance D0.1-D4 | DONE | Documentary Assurance concluído até D3 e DG-01 PASS; D4 permanece proibida por ADR-034 |
| TASK-W0-024 | Executar D0.6 — normalização semântica canônica | DONE | SRC-048 + SEMANTIC_REGISTRY SEM-001..091 + ADR-027/032 + EVD-ONB-013 |
| TASK-W0-025 | Executar D0.7 — rastreabilidade E2E e golden thread | DONE | TRACEABILITY_MASTER cobre REQ-ONB-001..077 exatamente uma vez; TRACEABILITY_SUMMARY = PASS; EVD-ONB-014 |
| TASK-W0-026 | Executar D0.8 — Audit & Evidence Architecture canônica | DONE | SRC-040 seções 12-24 hardened + REQ-ONB-065 strengthened + ADR-028 + EVD-ONB-015 (…) |
| TASK-W0-027 | Executar D0.9 — Gap/Decision Closure canônico | DONE | ADR-029 + EVD-ONB-016; GAP-007/031/032/034 (document-only) fechados; GAP-048..053 abertos (…) |
| TASK-W0-028 | Executar D0.10 — Checkpoint Documental DG-00 | DONE | DG-00 criado; resultado D0.10: READY_FOR_BLUEPRINT_COMPLETION (…) |
| TASK-W0-029 | Executar D1 — Blueprint Completion documental | DONE | D1 concluído; EVD-ONB-018; resíduos técnicos permanecem gaps separados |
| TASK-W0-030 | Executar D2 — Cross-review final do corpus documental | DONE | PASS/EVD-ONB-019; 77/77 requirements únicos; drifts residuais corrigidos |
| TASK-W0-031 | Executar D3 — Documentation Freeze e baseline versionada | DONE | SRC-049 baseline v1.0; readback PASS em EVD-ONB-020 |
| TASK-W0-032 | Executar re-freeze documental v1.1 pós-hardening | DONE | SRC-050 baseline ativa; SRC-049 SUPERSEDED; EVD-ONB-022; DG-01 revalidado |
| TASK-W0-033 | Formalizar readiness/unblocking package da CAP-19 | DONE | READINESS/RDY-CAP19-001 formalizado e validado por EVD-ONB-023; CAP-19 BLOCKED_NOT_READY/PARTIAL |

### Tasks W1 (TASK-W1-001..007) — todas BLOCKED por ADR-034

| Task ID | Task | Estado | Gate | Observação (condensada) |
|---|---|---|---|---|
| TASK-W1-001 | CAP-19.1 — IAM deny-by-default no web-console | BLOCKED | G1 | SRC-052/EVD-ONB-025 fecham mapa read-only no main ed3f53fe; change surface: web-console layout.tsx, acoes.ts, lib/*; PR #4 é referência, não solução |
| TASK-W1-002 | CAP-19.2 — Remover TENANT_DEV e resolver tenant real | BLOCKED | G1 | TENANT_DEV confirmado no web-console; target: Session/API credential → tenant context → SET LOCAL app.tenant_id → RLS, fail-closed |
| TASK-W1-003 | CAP-19.3 — Actor propagation e maker-checker E2E | BLOCKED | G1 | SRC-053/EVD-ONB-026: SoD existe em domínio e DB, mas ORM/web-console não propagam maker/checker ids E2E; 0014-acesso.sql imutável (…) |
| TASK-W1-004 | CAP-19.4 — Channel/ChannelBinding de primeira classe | BLOCKED | G1 | SRC-054/EVD-ONB-027: Channel/ChannelBinding não evidenciados no main; GAP-041 |
| TASK-W1-005 | CAP-19.5 — White-label e regional provisioning versionados | BLOCKED | G1 | SRC-055/EVD-ONB-028: white-label PARTIAL (tenants.regiao/dominio/tema/logotipoId); GAP-042 |
| TASK-W1-006 | CAP-19.6 — Hardening mínimo de sessão/login | BLOCKED | G1/G9 | SRC-056/EVD-ONB-029: threat model e AUTH-* test spec formalizados; rate control, MFA/step-up e recovery não evidenciados; GAP-023 OPEN |
| TASK-W1-007 | CAP-19.7 — Gate integrado de readiness CAP-19/G1 | BLOCKED | G1 | SRC-057/EVD-ONB-030 consolidam W1-001..006; G1 NOT_STARTED e depende também de GAP-004 CNPJ alfanumérico E2E |

---

## GATES

| Gate ID | Tipo | Nome | Resultado | Condição/Evidência requerida (condensada) |
|---|---|---|---|---|
| G0 | Wave gate | Canonicalização/Decisões | PASS | Canonicalização concluída e congelada na baseline SRC-050 v1.1; DG-01 PASS (EVD-ONB-022). G0 PASS não fecha gaps técnicos nem autoriza execução |
| G1 | Wave gate | Fundações P0 | NOT_STARTED | Tenant isolation, IDs, CNPJ alfanumérico, auth/SoD. GAP-009/010/011/041/042, ADR-034 e GAP-004 mantêm G1 NOT_STARTED |
| G2 | Wave gate | Case/Jornada | NOT_STARTED | Lifecycle, delegated journey, documents, decisions |
| G3 | Wave gate | Identity/Providers | NOT_STARTED | Capability contracts, evidence envelope, adapter tests, routing |
| G4 | Wave gate | KYB Brasil | NOT_STARTED | Official-source eligibility + KYB evidence |
| G5 | Wave gate | AML/HFS | NOT_STARTED | Screening, disambiguation, human review, model governance |
| G6 | Wave gate | Due diligence/Privacy | NOT_STARTED | Judicial/fiscal/privacy/retention controls |
| G7 | Wave gate | Admin/Developer | NOT_STARTED | Builders, APIs, white-label, sandbox |
| G8 | Wave gate | Monitoring/Handoffs | NOT_STARTED | Reopen/idempotency + versioned handoffs |
| G9 | Wave gate | Security/Resilience | NOT_STARTED | CI, security, performance, runbooks |
| G10 | Wave gate | UAT | NOT_STARTED | Mutual UAT evidence |
| H-01 | Homologation | Critério de homologação | NOT_STARTED | 80 screen IDs implementados/testados ou waiver/feature flag |
| H-02 | Homologation | Critério de homologação | NOT_STARTED | Cada capability P0/P1 com rota real; críticas com fallback/degraded mode |
| H-03 | Homologation | Critério de homologação | NOT_STARTED | Contract tests de providers |
| H-04 | Homologation | Critério de homologação | NOT_STARTED | Cross-tenant DB/service/IDOR/BOLA tests |
| H-05 | Homologation | Critério de homologação | NOT_STARTED | PII/biometria: minimização/masking/encryption/retention/log hygiene |
| H-06 | Homologation | Critério de homologação | NOT_STARTED | Requirements/flows/policies/products versionados, simulados, maker-checker, replayable |
| H-07 | Homologation | Critério de homologação | NOT_STARTED | AML/judicial: false positive, disambiguation, discard memory, human review, UAT |
| H-08 | Homologation | Critério de homologação | NOT_STARTED | Monitoramento contínuo idempotente + alertas correlacionados |
| H-09 | Homologation | Critério de homologação | NOT_STARTED | CNPJ alfanumérico end-to-end |
| H-10 | Homologation | Critério de homologação | NOT_STARTED | SCR/CCS/Open Finance com eligibility/consent gates |
| H-11 | Homologation | Critério de homologação | NOT_STARTED | CI real do release commit |
| H-12 | Homologation | Critério de homologação | NOT_STARTED | Pentest/security review sem Critical/High não aceito |
| H-13 | Homologation | Critério de homologação | NOT_STARTED | Runbooks executáveis |
| H-14 | Homologation | Critério de homologação | NOT_STARTED | Mutual UAT PF/PJ/MEI + packs/naturezas prioritárias |
| H-15 | Homologation | Critério de homologação | NOT_STARTED | Release dossier completo |
| H-16 | Homologation | Critério de homologação | NOT_STARTED | CAP-22 HFS com governança de modelo/contrato/resiliência |
| H-17 | Homologation | Critério de homologação | NOT_STARTED | Concentração econômica de providers tratada no routing/procurement |
| DG-01 | Documentation gate | DOCUMENTATION_READY_FOR_IMPLEMENTATION | PASS | D0.1-D0.10/DG-00 reconciliados; D1/D2/D3 PASS; re-freeze v1.1 (SRC-050/EVD-ONB-022); 77/77 requirements rastreáveis/únicos; 34 ADRs CANONICAL; SEM-001..091; 47 gaps com disposition; anti-overclaim 77/77 NOT_RELEASED/NOT_PRODUCTION_VERIFIED (…) |
| DG-00 | Documentation checkpoint | D0.10_READY_FOR_BLUEPRINT_COMPLETION | PASS | D0.1-D0.9 com evidência PASS; autoriza apenas D1 Blueprint Completion; não libera código, homologação, release ou produção |

---

## EVIDENCE

Evidence Registry — 41 evidências (EVD-ONB-001..041), todas com Evidence state **OBSERVED** e Sensitivity **INTERNAL**. Nenhuma prova implementação/release; são evidências documentais, de reconciliação read-only e de formalização de planos.

| Evidence ID | Capability/Escopo | Task ID | Result | Evidence type | Nota (condensada) |
|---|---|---|---|---|---|
| EVD-ONB-001 | PROGRAM | TASK-W0-014 | PASS | DOCUMENT_RECONCILIATION | Evidência de Drive observada; não prova implementação técnica |
| EVD-ONB-002 | PROGRAM | TASK-W0-015 | PASS | DOCUMENT_RECONCILIATION | Canonicalização documental do núcleo de governança |
| EVD-ONB-003 | CAP-01..22 / A1..D14 | TASK-W0-016 | PASS | DOCUMENT_RECONCILIATION | Canonicalização do contrato produto/UX; não prova implementação |
| EVD-ONB-004 | CAP-18,20,21 / Architecture | TASK-W0-017 | PASS | DOCUMENT_RECONCILIATION | Canonicalização status/event/evidence/audit; gaps técnicos abertos |
| EVD-ONB-005 | CAP-14,15,18,19,20 / Regulatory | TASK-W0-018/013 | PASS | DOCUMENT_RECONCILIATION | Canonicalização regulatória/internacional; applicability por linha preservada |
| EVD-ONB-006 | CAP-18..22 / Program | TASK-W0-019 | PASS | DOCUMENT_RECONCILIATION | Fechamento D1.5; readiness técnica/provider/integração separada |
| EVD-ONB-007 | PROGRAM / CAP-19/20 | TASK-W0-020 | PASS | TECHNICAL_SNAPSHOT | Snapshot read-only; sem writes no GitHub |
| EVD-ONB-008 | CAP-01..22 / A1..D14 / CAP-19 | TASK-W0-020 | PASS | TECHNICAL_RECONCILIATION | Screen mapping 31 PARTIAL / 35 NOT_EVIDENCED / 14 ABSENT; capabilities 16 PARTIAL / 6 NOT_EVIDENCED |
| EVD-ONB-009 | CAP-07,16,17,18,19,20,21 / ADJ-01..08 | TASK-W0-021 | PASS | DOCUMENTARY_CANONICAL_DELTA | Delta canônico sem mudança de código; ADJ são adjacentes, não CAP-23..30 |
| EVD-ONB-010 | PROGRAM / APPLICABILITY | TASK-W0-022/023 | PASS | DOCUMENTARY_CANONICAL_DELTA | Conditional-by-Design e método Documentary Assurance formalizados |
| EVD-ONB-011 | CAP-14..22 / RUNTIME_CONTRACTS | TASK-W0-020 | PASS | TECHNICAL_RECONCILIATION_CHECKPOINT | — |
| EVD-ONB-012 | PROGRAM / D0.5 | TASK-W0-020 | PASS | D0_5_RECONCILIATION_COMPLETE | — |
| EVD-ONB-013 | PROGRAM / D0.6 | TASK-W0-024 | PASS | D0_6_SEMANTIC_NORMALIZATION_COMPLETE | — |
| EVD-ONB-014 | PROGRAM / D0.7 | TASK-W0-025 | PASS | D0_7_TRACEABILITY_COMPLETE | — |
| EVD-ONB-015 | PROGRAM / D0.8 | TASK-W0-026 | PASS | D0_8_AUDIT_EVIDENCE_ARCHITECTURE_COMPLETE | — |
| EVD-ONB-016 | PROGRAM / D0.9 | TASK-W0-027 | PASS | D0_9_GAP_DECISION_CLOSURE_COMPLETE | — |
| EVD-ONB-017 | PROGRAM / D0.10 | TASK-W0-028 | PASS | D0_10_DOCUMENTATION_CHECKPOINT | PASS = READY_FOR_BLUEPRINT_COMPLETION apenas; código congelado |
| EVD-ONB-018 | PROGRAM / D1 | TASK-W0-029 | PASS | D1_BLUEPRINT_COMPLETION | PASS documental; GitHub sem write/execution |
| EVD-ONB-019 | PROGRAM / D2 | TASK-W0-030 | PASS | D2_CROSS_REVIEW_COMPLETE | Consistência documental do corpus; ADR-034 vigente |
| EVD-ONB-020 | PROGRAM / D3 | TASK-W0-031 | PASS | D3_DOCUMENTATION_FREEZE_COMPLETE | Congela autoridade documental; mudança material exige change record/nova baseline |
| EVD-ONB-021 | CAP-19 / PROGRAM READINESS | TASK-W0-010 | PASS | READINESS_ASSESSMENT | Resultado: nenhuma capability READY; CAP-19 first candidate BLOCKED/NOT READY |
| EVD-ONB-022 | PROGRAM / D3.1 RE-FREEZE | TASK-W0-032 | PASS | D3_1_DOCUMENTATION_REFREEZE_COMPLETE | Revalida corte documental v1.1 e DG-01 |
| EVD-ONB-023 | CAP-19 / READINESS UNBLOCKING PACKAGE | TASK-W0-033 | PASS | (não preenchido na fonte) | — |
| EVD-ONB-024 | PROVIDERS / PUBLIC DUE-DILIGENCE TRANCHE 1 | TASK-W0-009 | PARTIAL_PASS | EXECUTION_PLAN_FORMALIZED | Decomposição executável formalizada; nenhuma execução técnica |
| EVD-ONB-025 | CAP-19 / READ-ONLY TECHNICAL MAPPING W1-001/002 | TASK-W1-001; TASK-W1-002 | PASS | READ_ONLY_TECHNICAL_MAPPING_COMPLETE | Mapa read-only fechado; TASK-W1-001/002 permanecem BLOCKED |
| EVD-ONB-026 | CAP-19 / SOD MAPPING | TASK-W1-003 | PASS | SOD_READ_ONLY_MAPPING_COMPLETE | PASS do mapeamento, não do SoD; GAP-010 OPEN/CRITICA/BLOCKER |
| EVD-ONB-027 | CAP-19 / CHANNEL MAPPING | TASK-W1-004 | PASS | CHANNEL_READ_ONLY_MAPPING_COMPLETE | Não fecha GAP-041 |
| EVD-ONB-028 | CAP-19 / WHITE-LABEL MAPPING | TASK-W1-005 | PASS | WHITE_LABEL_READ_ONLY_MAPPING_COMPLETE | Não prova versionamento/activation/rollback |
| EVD-ONB-029 | CAP-19 / LOGIN SESSION THREAT MODEL | TASK-W1-006 | PASS | THREAT_MODEL_TEST_SPEC_COMPLETE | TASK-W1-006 continua BLOCKED; G1/G9 não executados |
| EVD-ONB-030 | CAP-19 / INTEGRATED READINESS GATE PACKAGE | TASK-W1-007 | PASS | INTEGRATED_GATE_PACKAGE_FORMALIZED | Não executa G1, não fecha gaps, não promove CAP-19 |
| EVD-ONB-031 | W2 READINESS PLAN | W2 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | W2/G2 continuam NOT_STARTED |
| EVD-ONB-032 | W3 READINESS PLAN | W3 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | Nenhum provider/biometria/storage promovido a REAL |
| EVD-ONB-033 | W4 READINESS PLAN | W4 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | Brasil-first não implica hardcode global; CCS condicional |
| EVD-ONB-034 | W5 READINESS PLAN | W5 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | HFS IP boundary preservada |
| EVD-ONB-035 | W6 READINESS PLAN | W6 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | Expiração/revalidation não é deleção/crypto-shred |
| EVD-ONB-036 | W7 READINESS PLAN | W7 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | Handoffs econômicos não transferem ledger/saldo ao Onboarding |
| EVD-ONB-037 | W8 READINESS PLAN | W8 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | Downstream feedback é signal/review; nunca mutação direta do case |
| EVD-ONB-038 | W9 READINESS PLAN | W9 DOC PREPARATION | PASS | READINESS_PLAN_FORMALIZED | CI histórico/PR não substitui own-SHA release evidence |
| EVD-ONB-039 | W10 UAT READINESS PLAN | W10 DOC PREPARATION | PASS | UAT_READINESS_PLAN_FORMALIZED | UAT real continua pendente |
| EVD-ONB-040 | W11 RELEASE READINESS PLAN | W11 DOC PREPARATION | PASS | RELEASE_READINESS_PLAN_FORMALIZED | CODE_COMPLETE != DONE; PRODUCTION_VERIFIED exige observação pós-deploy |
| EVD-ONB-041 | TRANSVERSAL 30-SKILLS ASSESSMENT | PROGRAM DOC CLOSURE SUPPORT | PASS | TRANSVERSAL_PRODUCT_ASSESSMENT_COMPLETE | Ledger/Pix/OTC/liquidez/split operacional fora do core; somente por handoff quando aplicável |

---

## SEGMENTS

26 segmentos de mercado (SEG-01..26). As linhas SEG-01..06 possuem colunas de contrato de integração preenchidas (Schema/version TO_FORMALIZE, Idempotency REQUIRED, Evidence state NOT_EVIDENCED); SEG-07..26 registram somente taxonomia + prioridade GTM.

| Segment ID | Macrovertical | Exemplos (condensado) | Prioridade GTM |
|---|---|---|---|
| SEG-01 | Bancos | Bancos múltiplos, comerciais, investimento, desenvolvimento, câmbio, cooperativos, digitais | TIER 1 |
| SEG-02 | Cooperativas financeiras | Singulares, centrais, confederações, bancos cooperativos | TIER 1 |
| SEG-03 | Crédito | SCFI, SCD, SEP, SCMEPP, imobiliário, hipotecárias, leasing, fomento | TIER 1 |
| SEG-04 | Pagamentos | IPs, wallets, emissores, adquirentes, subadquirentes, ITP, PSP, gateway, embedded finance | TIER 1 |
| SEG-05 | Mercado de capitais | CTVM, DTVM, intermediários, plataformas de investimento | TIER 1 |
| SEG-06 | Asset/Wealth | Gestoras, administradores fiduciários, wealth, family office, carteiras administradas | TIER 1 |
| SEG-07 | Fundos/veículos | FIF, FIDC, FII, FIP, ETF, FIAGRO, previdenciários e estruturados | TIER 1 |
| SEG-08 | Securitização/recebíveis | Securitizadoras, factoring, recebíveis, duplicatas, NPL/distressed | TIER 1 |
| SEG-09 | Câmbio/cross-border | Bancos/corretoras de câmbio, remittance, PSP cross-border, OTC fiat | TIER 1 |
| SEG-10 | Cripto/ativos virtuais | SPSAV/VASP, exchange, broker, OTC, custodian, wallets, on/off-ramp, tokenização/RWA | TIER 1 |
| SEG-11 | Seguros | Seguradoras, resseguro, corretoras, insurtechs | TIER 2 |
| SEG-12 | Previdência | EAPC, EFPC, fundos de pensão, instituidores | TIER 2 |
| SEG-13 | Capitalização/proteção | Capitalização e estruturas de proteção patrimonial aplicáveis | TIER 2 |
| SEG-14 | Infraestrutura de mercado | Bolsa, clearing, CCP, depositário, registradora, liquidação | TIER 2 |
| SEG-15 | Prestadores fiduciários | Custodiantes, escrituradores, agentes fiduciários, transfer agents | TIER 2 |
| SEG-16 | Gatekeepers CVM | Consultores, analistas, assessores, rating, auditores | TIER 2 |
| SEG-17 | Crowdfunding/captação | Plataformas de investimento participativo e emissores | TIER 2 |
| SEG-18 | Apostas/loterias | Operadores de quota fixa, loterias, white-label, gaming | TIER 2 |
| SEG-19 | Setores obrigados PLD | Factoring, joias/metais, luxo, direitos de atletas/artistas e outros | TIER 3 |
| SEG-20 | Imobiliário financeiro | Incorporadoras, imobiliárias, FII, crédito/securitização imobiliária | TIER 3 |
| SEG-21 | Agro financeiro | FIAGRO, crédito agro, CPR, securitização agro, cooperativas | TIER 2 |
| SEG-22 | Corporate Treasury | Holdings, importadores/exportadores, tesourarias centralizadas | TIER 3 |
| SEG-23 | Marketplaces | Marketplaces B2B/B2C, sellers, merchants, split beneficiaries | TIER 3 |
| SEG-24 | SaaS financeiro | ERP, BaaS/FaaS, fintech infrastructure | TIER 2 |
| SEG-25 | BPO financeiro | Tesouraria, pagamentos, contas, conciliação | TIER 3 |
| SEG-26 | Setor público financeiro | Bancos públicos, fomento, fundos públicos, previdência pública | SELECTIVE |

Contrato de integração dos SEG-01..06 (colunas adicionais da fonte): SEG-01 Owner Architecture/Backoffice; SEG-02 Architecture/CRM (CRM detém lead/customer correlation); SEG-03 Architecture/Support (sem replicação de dossiê completo no support); SEG-04 Architecture/KYT (domínio transacional/KYT fora do core); SEG-05 Model Governance/Architecture (HFS detém sinal interno sob CAP-22); SEG-06 Architecture/Terminal (Terminal é consumer/read model, nunca source of truth).

---

## PACKS

14 packs nomeados. Todos com Taxonomy status **CANONICAL**, GTM priority status **PROPOSED**, Owner **Product/GTM**, Source **SRC-003 + SRC-019**. Observação padrão: "Taxonomia canônica; prioridade GTM não implica market readiness." A fonte contém 12 linhas adicionais sem Pack ID (linhas-template com status repetido, sem conteúdo próprio).

| Pack ID | Nome | Segmentos-alvo | Escopo inicial |
|---|---|---|---|
| PACK-BANKING | Banking | Bancos/cooperativas | KYC/KYB + licenças + UBO + AML + revalidação |
| PACK-PAYMENTS | Payments | IPs/PSPs/wallets | Identity + KYB + fraud + account ownership + AML |
| PACK-CREDIT | Credit | SCD/SEP/financeiras | KYC/KYB + capacidade + origem de recursos + AML |
| PACK-CAPITAL | Capital Markets | CTVM/DTVM/intermediários | KYB + habilitações + investidores + suitability handoff |
| PACK-FUNDS | Funds/Asset | Gestoras/admin/fundos | Entidades + UBO + investidores + prestadores + revalidação |
| PACK-SECURITIZATION | Securitization | Securitizadoras/FIDC/recebíveis | Cedentes/devedores/prestadores + KYB + risco |
| PACK-FX | FX/Cross-border | Câmbio/remittance/OTC fiat | KYC/KYB + source of funds + sanctions + jurisdição |
| PACK-VASP | Crypto/VASP | SPSAV/exchange/OTC/custody | Identity + KYB + wallet subject + AML + handoff KYT/Travel Rule |
| PACK-INSURANCE | Insurance | Seguros/resseguro/insurtech | KYC/KYB + beneficiários + fraude + AML |
| PACK-PENSION | Pension | EAPC/EFPC | Participantes/patrocinadores/prestadores + KYC/KYB |
| PACK-INFRA | Market Infrastructure | Clearing/CCP/registradora/custody | Participant onboarding + institution DD + access governance |
| PACK-BETTING | Betting | Apostas/loterias | Identity + biometric + AML + impedimentos + account ownership |
| PACK-PLD-ADJ | PLD Adjacent | Setores obrigados | KYC/KYB + risk-based DD + AML |
| PACK-ENTERPRISE | Enterprise | Corporate treasury/BPO/SaaS/marketplaces | KYB + UBO + signers + configurable workflows |

---

## HANDOFFS

10 handoffs (HOF-001..010). Todos com Definition status **CANONICAL** e Market readiness **NOT_EVIDENCED**. Fonte: SRC-019 (+ SRC-047 para HOF-007..010).

| Handoff ID | Sistema/Domínio | Direção | Payload/Evento (condensado) | Owner role |
|---|---|---|---|---|
| HOF-001 | Backoffice Financeiro | OUTBOUND | Approved/Restricted/Rejected onboarding + entity/customer IDs + evidence refs | Product/Compliance |
| HOF-002 | CRM | INBOUND/OUTBOUND | Lead/customer correlation, onboarding status summary, sem replicação de PII | Product/Compliance |
| HOF-003 | Support | OUTBOUND | Case reference, status, permitted support context | Product/Compliance |
| HOF-004 | KYT/Travel Rule | OUTBOUND | Verified subject/entity IDs e risk context | Product/Compliance |
| HOF-005 | HFS CAP-22 | BIDIRECTIONAL | Canonical subject/entity/relationship evidence → signals/alerts | Product/Compliance |
| HOF-006 | Terminal/Corporate View | OUTBOUND | Authorized read model/status/evidence summary | Product/Compliance |
| HOF-007 | Partner/Affiliate/Referral | BIDIRECTIONAL | Participant/relationship eligibility, affiliate/referral IDs, restrictions, evidence refs ↔ attribution/commercial status signals | Product/Partnerships/Compliance |
| HOF-008 | Payments/Split/Settlement | OUTBOUND + RISK_FEEDBACK | Eligible participant/canonical IDs/restrictions/evidence refs → split/settlement; sinais downstream materiais → review/revalidation | Architecture/Payments/Compliance |
| HOF-009 | Finance/Commission/Remuneration/RevenueShare | OUTBOUND + STATUS_FEEDBACK | Eligible beneficiary/relationship IDs/restrictions → commission/remuneration/fee/revenue share; payment/reversal status correlacionado quando autorizado | Finance/Product/Compliance |
| HOF-010 | Campaigns/Incentives | BIDIRECTIONAL | Eligibility/restrictions/canonical participant IDs ↔ campaign qualification/rejection e material risk signals | Partnerships/Product/Compliance |

---

## _LISTS

Aba auxiliar de valores de enumeração (19 valores): PROPOSED, TO_FORMALIZE, CANONICAL, REVIEW_REQUIRED, NOT_EVIDENCED, OPEN, CLOSED, BLOCKED, DISCOVERED, SPECIFIED, READY, IN_PROGRESS, CODE_COMPLETE, INTEGRATED, QA, UAT, READY_FOR_RELEASE, RELEASED, PRODUCTION_VERIFIED.

---

## JURISDICTIONS

| Jurisdiction ID | País/Região | Código | Status | Pontos-chave (condensado) | Gate |
|---|---|---|---|---|---|
| JUR-BR-001 | Brasil | BR | CANONICAL_BASELINE_MODEL | pt-BR; CPF/CNPJ e documentos locais (CNPJ alfanumérico obrigatório); SERPRO/RFB/BCB público por capability; AML global + listas brasileiras; LGPD + políticas Mutual; routing por capability/contrato/qualidade/custo/economic_group; JurisdictionPack BR + RegulatoryPack(s) + SegmentPack(s) + TenantPolicy. Brasil é o primeiro baseline operacional; não limita arquitetura global | G4/G6/G7 |
| JUR-INT-001 | Internacional — jurisdição do cliente | MULTI | FRAMEWORK_ONLY | Locale configurável por tenant/jornada; identificadores/documentos/endereço/telefone configuráveis por jurisdição sem hardcode BR; fontes oficiais locais quando legalmente utilizáveis; sanções/PEP/watchlists globais + locais; base legal/consent/retention/residency por jurisdição; provider routes por país. Não declara cobertura de país específico; cada mercado exige perfil e gate antes de produção | G0/G3/G6/G7 |

---

## CODE_INVENTORY

Inventário técnico read-only do repositório (main ed3f53fe) — 41 artefatos (TECH-001..041).

| Tech ID | Tipo | Path/Ref | Technical state | Related CAP | Related REQ | Gap/Finding |
|---|---|---|---|---|---|---|
| TECH-001 | REPOSITORY | Mutual-Processadora-de-Pagamentos/onboarding-corporativo | REAL | CAP-01..22 | REQ-ONB-059 | — |
| TECH-002 | APP | apps/web-jornada | REAL | CAP-01..20 | REQ-ONB-003..033,040,051..058,063..068 | GAP-ONB-002 |
| TECH-003 | APP | apps/web-painel | PARTIAL | CAP-07..22 | REQ-ONB-004,006,007,012,016,022..031,040,050,060..065 | GAP-ONB-001,011,015 |
| TECH-004 | APP | apps/web-console | PARTIAL | CAP-15,18..21 | REQ-ONB-007,012..018,026,027,040,050,058,060..068 | GAP-ONB-009,010,018 |
| TECH-005 | APP | apps/svc-trabalhadores | REAL | CAP-17,20,21 | REQ-ONB-031,042,046 | GAP-ONB-017,020 |
| TECH-006 | PACKAGE | packages/dominio | REAL | CAP-01..22 | REQ-ONB-003..068 | GAP-ONB-015,031,032 |
| TECH-007 | PACKAGE | packages/motor | REAL | CAP-15,16 | REQ-ONB-025..027,064,068 | — |
| TECH-008 | PACKAGE | packages/dados | REAL | CAP-16,19,20 | REQ-ONB-005,012,045,050,065 | GAP-ONB-014,020,024 |
| TECH-009 | PACKAGE | packages/orquestrador | PARTIAL | CAP-01..18,20 | REQ-ONB-015..018,055 | GAP-ONB-012,022 |
| TECH-010 | PACKAGE | packages/catalogo | PARTIAL | CAP-15,19 | REQ-ONB-048..058,063,064 | GAP-ONB-019,036 |
| TECH-011 | WORKFLOW | .github/workflows/qualidade.yml | REAL | PROGRAM | REQ-ONB-039,041 | GAP-ONB-005,016 |
| TECH-012 | WORKFLOW | .github/workflows/publicar-prototipo.yml | PROTOTYPE | CAP-19,21 | REQ-ONB-040 | GAP-ONB-002 |
| TECH-013 | DOCUMENTATION | README.md | PARTIAL | CAP-19,20 | REQ-ONB-012,050 | GAP-ONB-001 |
| TECH-014 | SOURCE | packages/dados/src/acesso.ts | REAL | CAP-19,20 | REQ-ONB-012,050 | GAP-ONB-001,009,023 |
| TECH-015 | MIGRATION | packages/dados/sql/migracoes/0014-acesso.sql | PARTIAL | CAP-15,16,19,20 | REQ-ONB-007,012,050 | GAP-ONB-010 |
| TECH-016 | SOURCE | apps/web-console/src/app/layout.tsx | PARTIAL | CAP-19,20 | REQ-ONB-012,050 | GAP-ONB-009 |
| TECH-017 | SOURCE | apps/web-painel/src/lib/painel.ts | PARTIAL | CAP-16,19,20 | REQ-ONB-012,050,058 | GAP-ONB-001,011 |
| TECH-018 | MIGRATION | packages/dados/sql/migracoes/0001-isolamento.sql | REAL | CAP-19,20 | REQ-ONB-005,012,050,065 | — |
| TECH-019 | MIGRATION | packages/dados/sql/migracoes/0002-papel-da-aplicacao.sql | REAL | CAP-19,20 | REQ-ONB-012,050 | — |
| TECH-020 | TEST | packages/dados/test/isolamento.test.ts | REAL | CAP-19,20 | REQ-ONB-012,050,065 | GAP-ONB-005 |
| TECH-021 | SOURCE | packages/dados/src/cifra.ts | PARTIAL | CAP-20 | REQ-ONB-045,054 | GAP-ONB-014,020 |
| TECH-022 | PR | PR #4 head 13975fea59f55e3b25a3e5d2a27e5d73bd345c4d | PARTIAL | CAP-19,20 | REQ-ONB-012,039,040 | GAP-ONB-005,009,010,011 |
| TECH-023 | PR | PR #5 head 8c6c882836cd78a0ba130faeceea44d053a38edc | PARTIAL | PROGRAM | REQ-ONB-059 | FIND-008 |
| TECH-024 | MIGRATION_SET | packages/dados/sql/migracoes/*.sql | PARTIAL | CAP-01..22 | REQ-ONB-039 | GAP-ONB-024 |
| TECH-025 | SOURCE | packages/orquestrador/src/capacidade.ts | REAL | CAP-01..13,19,20,21 | REQ-ONB-015..018,055,076 | GAP-ONB-012,022 |
| TECH-026 | SOURCE | packages/orquestrador/src/reconciliacao.ts | REAL | CAP-06,08..13,20 | REQ-ONB-018,050,065 | — |
| TECH-027 | SOURCE_SET | packages/dominio/src/caso.ts + decisao.ts | PARTIAL | CAP-16,17,20 | REQ-ONB-060,065 | GAP-ONB-015,031 |
| TECH-028 | DATA_CONTRACT | packages/dados/src/esquema.ts (trilha) + 0001-isolamento.sql + 0005-trilha-do-caso.sql | PARTIAL | CAP-16,20,21 | REQ-ONB-065,069,075,076 | GAP-ONB-037,041 |
| TECH-029 | QUEUE_RUNTIME | packages/dados/src/fila.ts + svc-trabalhadores (migrar-lib.ts, index.ts, verificar-vencimentos.ts) | PARTIAL | CAP-17,18,20,21 | REQ-ONB-061,062,074,076 | GAP-ONB-032,035 |
| TECH-030 | EXPORT_RUNTIME | apps/web-painel/src/app/casos/[id]/dossie/route.ts + lib/dossie.ts | PARTIAL | CAP-16,20,21 | REQ-ONB-065,075,076 | GAP-ONB-037 |
| TECH-031 | DOMAIN_RUNTIME | packages/dominio/src/requisito.ts + packages/dados/src/esquema.ts | PARTIAL | CAP-14,15,16,19,20 | REQ-ONB-063,064,067,076 | GAP-ONB-036,039,046 |
| TECH-032 | INTEGRATION_RUNTIME | Adapters concretos de providers / RegistroDeProvedores | NOT_EVIDENCED | CAP-01..13,21 | REQ-ONB-015..018,055,076 | GAP-ONB-012,022 |
| TECH-033 | PUBLIC_INTERFACE | API/webhooks/event delivery runtime | NOT_EVIDENCED | CAP-18,20,21 | REQ-ONB-061,062,069,076 | GAP-ONB-033,035 |
| TECH-034 | REGULATORY_RUNTIME | RegulatoryPack/JurisdictionPack/SegmentPack + CCS/ACCS runtime | NOT_EVIDENCED | CAP-14,15,18,19,20 | REQ-ONB-063..068,076 | GAP-ONB-036,038,039,040,046 |
| TECH-035 | INTERNAL_CAPABILITY_RUNTIME | CAP-22 / HFS / Mutual Intelligence runtime | NOT_EVIDENCED | CAP-22 | REQ-ONB-020,050,076 | GAP-ONB-021 |
| TECH-036 | HANDOFF_RUNTIME | Contratos executáveis de handoff/API/event | NOT_EVIDENCED | CAP-16..21 | REQ-ONB-073..075,076 | GAP-ONB-008,044,045 |
| TECH-037 | DATA_CONTRACT | packages/dados/src/esquema.ts::documentos | PARTIAL | CAP-02,14,20 | REQ-ONB-005,064,076 | GAP-ONB-013 |
| TECH-038 | OBSERVABILITY_FOUNDATION | esquema.ts::verificacoes + painel/dossie | PARTIAL | CAP-21,20 | REQ-ONB-060..062,076 | GAP-ONB-017,034 |
| TECH-039 | PRIVACY_RUNTIME | cifra.ts + evidencias/documentos valeAte + svc-trabalhadores expiry | PARTIAL | CAP-17,19,20 | REQ-ONB-064,065,076 | GAP-ONB-014,020 |
| TECH-040 | CI_SECURITY | .github/workflows/qualidade.yml | PARTIAL | CAP-19,20 | REQ-ONB-039,050 | GAP-ONB-005,016,023 |
| TECH-041 | CONSENT_TERMS_FOUNDATION | esquema.ts::documentos + evidence/versioned requirements genéricos | PARTIAL | CAP-14,20 | REQ-ONB-064,067,076,077 | GAP-ONB-047 |

---

## SOURCE_MANIFEST

69 fontes registradas (SRC-001..069).

| Source ID | Documento/Fonte | Papel | Classificação |
|---|---|---|---|
| SRC-001 | MUTUAL_ONBOARDING_CORPORATIVO_PLANEJAMENTO_COMPLETO_BENCHMARK_v1.1 | CANONICAL_MASTER_SOURCE | CANONICAL |
| SRC-002 | MUTUAL_ONBOARDING_CORPORATIVO_PLANEJAMENTO_COMPLETO_BENCHMARK_v1.0 | HISTORICAL | SUPERSEDED |
| SRC-003 | MUTUAL_ONBOARDING_MAPA_COMPLETO_MERCADO_E_ICPS_v1.0 | REFERENCE | PROPOSED |
| SRC-004 | Repositório onboarding-corporativo | CANONICAL_IMPLEMENTATION_REPOSITORY | CANONICAL |
| SRC-005 | Pack institucional Mutual — Onboarding/KYC/KYB | METHOD | CANONICAL_METHOD |
| SRC-006 | ONB-REG-001_REGISTRO_MESTRE_DE_EXECUCAO_v0.1 | EXECUTION_REGISTRY | CANONICAL |
| SRC-007 | ONB-GOV-001_START_HERE_E_GOVERNANCA_v1.0 | GOVERNANCE | CANONICAL |
| SRC-008 | ONB-BAS-001_BASELINE_TECNICO_RECONCILIADO_D2_v0.4 | BASELINE_TECHNICAL_RECONCILIATION | REVIEW_REQUIRED |
| SRC-009 | ONB-QA-001_DEFINITION_OF_READY_DONE_E_HOMOLOGACAO_v1.0 | QA_GOVERNANCE | CANONICAL |
| SRC-010 | ONB-HFS-001_GOVERNANCA_CAP22_MUTUAL_INTELLIGENCE_v1.0 | INTERNAL_CAPABILITY_GOVERNANCE | CANONICAL |
| SRC-011 | ONB-UX-006_PADRAO_DE_ESPECIFICACAO_DAS_TELAS_v1.0 | SCREEN_SPEC_STANDARD | CANONICAL |
| SRC-012 | ONB-ARQ-001_CAPABILITY_EVIDENCE_ROUTING_E_HANDOFFS_v1.0 | ARCHITECTURE_FOUNDATION_CONTRACT | CANONICAL |
| SRC-013 | ONB-RFP-001_RFP_RFI_MASTER_DE_PROVIDERS_v1.0 | PROCUREMENT_RFP_STANDARD | CANONICAL |
| SRC-014 | ONB-INT-001_ARQUITETURA_MULTI_JURISDICAO_E_GLOBAL_v1.0 | GLOBAL_ARCHITECTURE | CANONICAL |
| SRC-015 | ONB-DEC-001_DECISOES_EXECUTIVAS_E_ADR_INDEX_v1.0 | DECISION_INDEX | CANONICAL |
| SRC-016 | ONB-REQ-001_MODELO_DE_REQUISITOS_E_RASTREABILIDADE_v1.0 | REQUIREMENT_STANDARD | CANONICAL |
| SRC-017 | ONB-RSK-001_FRAMEWORK_RISCO_COMPLIANCE_PRIVACIDADE_v1.0 | RISK_COMPLIANCE_PRIVACY_FRAMEWORK | CANONICAL |
| SRC-018 | ONB-EVD-001_EVIDENCE_RELEASE_E_RUNBOOK_FRAMEWORK_v1.0 | EVIDENCE_RELEASE_RUNBOOK_FRAMEWORK | CANONICAL |
| SRC-019 | ONB-MKT-001_SEGMENTOS_PACKS_E_JURISDICOES_v1.0 | SEGMENT_PACK_TAXONOMY | CANONICAL |
| SRC-020 | ONB-HND-001_CONTRATOS_DE_HANDOFF_E_INTEGRACOES_v1.0 | HANDOFF_CONTRACT_STANDARD | CANONICAL |
| SRC-021 | ONB-QA-002_AUDITORIA_TECNICA_WAVE0_v0.1 | TECHNICAL_AUDIT | CANONICAL_EVIDENCE |
| SRC-022 | SUPERSEDED_ONB-CC-001_PACOTE_DE_CONTINUIDADE_CLAUDE_CODE_v0.1 | CLAUDE_CODE_HANDOFF_HISTORICAL | SUPERSEDED |
| SRC-023 | SUPERSEDED_ONB-CC-002_INSTRUCOES_MESTRAS_CLAUDE_CODE_v1.0.pdf | CLAUDE_CODE_MASTER_PDF_HISTORICAL | SUPERSEDED |
| SRC-024 | ONB-UX-000_INDICE_PACOTE_COMPLETO_FRONT_UX_v1.0 | UX_PACKAGE_INDEX | CANONICAL |
| SRC-025 | ONB-UX-001_BLUEPRINT_COMPLETO_FRONTEND_E_EXPERIENCIA_v1.0 | UX_FRONT_BLUEPRINT | CANONICAL |
| SRC-026 | ONB-UX-002_REGISTRO_COMPLETO_80_TELAS_DASHBOARDS_KPIS_FILTROS_v1.0 | UX_SCREEN_REGISTRY_V2 | CANONICAL |
| SRC-027 | ONB-UX-003_WIREFRAMES_FLUXOS_E_NAVEGACAO_v1.0 | WIREFRAME_FLOW_SPEC | CANONICAL |
| SRC-028 | ONB-REQ-002_REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS_FRONT_UX_v1.0 | FRONT_UX_REQUIREMENTS | CANONICAL |
| SRC-029 | ONB-ARQ-003_FLUXOS_TECNICOS_FRONT_BACKEND_PROVIDERS_v1.0 | FRONT_BACKEND_TECH_FLOWS | CANONICAL |
| SRC-030 | ONB-QA-003_CRITERIOS_HOMOLOGACAO_UX_FRONT_v1.0 | UX_FRONT_HOMOLOGATION | CANONICAL |
| SRC-031 | ONB-UX-004_ESPECIFICACAO_TELA_A_TELA_A1_D14_v1.0 | SCREEN_SPEC_DETAIL | CANONICAL |
| SRC-032 | ONB-UX-005_DASHBOARDS_KPIS_FILTROS_RELATORIOS_v1.0 | DASHBOARD_KPI_FILTER_REPORT_SPEC | CANONICAL |
| SRC-033 | SUPERSEDED_skill.zip_mutual-onboarding-corporativo_original | CHATGPT_SKILL_PACKAGE_HISTORICAL | SUPERSEDED |
| SRC-034 | MUTUAL_ONBOARDING_SKILL_EXPORTAVEL_v1.0.zip | EXPORTABLE_SKILL_DISTRIBUTION | CANONICAL_EXECUTION_KNOWLEDGE_PACKAGE |
| SRC-035 | MUTUAL_ONBOARDING_CLAUDE_CODE_PACK_v1.0.zip | CLAUDE_CODE_DISTRIBUTION | CANONICAL_EXECUTION_KNOWLEDGE_PACKAGE |
| SRC-036 | ONB_CLAUDE_PROJECT_INSTRUCTIONS_OTIMIZADA_v1.1.txt | CLAUDE_PROJECT_INSTRUCTIONS_TXT | CANONICAL_EXECUTION_KNOWLEDGE_PACKAGE |
| SRC-037 | ONB-CPL-000_INDICE_PACOTE_REGULATORIO_BCB_AUDITORIA_CCS_v1.0 | REGULATORY_PACKAGE_INDEX | CANONICAL |
| SRC-038 | ONB-CPL-001_FRAMEWORK_REGULATORIO_COMPLIANCE_BY_DESIGN_v1.0 | REGULATORY_COMPLIANCE_FRAMEWORK | CANONICAL |
| SRC-039 | ONB-CPL-002_CATALOGO_DECLARACOES_CAMPOS_E_EVIDENCIAS_REGULATORIAS_v1.0 | REGULATORY_DECLARATION_CATALOG | CANONICAL |
| SRC-040 | ONB-ARQ-005_TRILHA_AUDITORIA_REGULATORIA_E_EVIDENCIAS_v1.0 | REGULATORY_AUDIT_EVIDENCE_CONTRACT | CANONICAL |
| SRC-041 | ONB-ARQ-006_ESPECIFICACAO_CCS_ARQUIVOS_ACCS_E_RECONCILIACAO_v1.0 | BCB_CCS_ACCS_SPEC | CANONICAL |
| SRC-042 | ONB-CPL-003_MATRIZ_APLICABILIDADE_REGULATORIA_v1.0 | REGULATORY_APPLICABILITY_REGISTRY | CANONICAL |
| SRC-043 | ONB-QA-004_GATES_HOMOLOGACAO_REGULATORIA_CCS_E_AUDITORIA_v1.0 | REGULATORY_QA_GATE | CANONICAL |
| SRC-044 | ONB-ARQ-004A_APENDICE_STATUS_EVENT_REGISTRY_DETALHADO_v1.0.md | STATUS_EVENT_DETAIL_APPENDIX | CANONICAL |
| SRC-045 | ONB-ARQ-004_REGISTRO_MESTRE_STATUS_EVENTOS_OBSERVABILIDADE_API_WEBHOOKS_v1.0 | STATUS_EVENT_MASTER_SPEC | CANONICAL |
| SRC-046 | ONB-GOV-002_INVENTARIO_CANONICO_E_PLANO_RECONCILIACAO_DOCUMENTAL_v1.0 | DOCUMENTATION_INVENTORY_AND_RECONCILIATION_PLAN | CANONICAL |
| SRC-047 | ONB-HND-002_PARTICIPANTES_ECONOMICOS_AFFILIADOS_REFERRALS_SPLIT_COMISSOES_E_SETTLEMENT_v1.0 | ADJACENT_ECONOMIC_CAPABILITIES_AND_HANDOFF_CONTRACT | CANONICAL |
| SRC-048 | ONB-GOV-003_GLOSSARIO_E_MODELO_SEMANTICO_CANONICO_v1.0 | SEMANTIC_MODEL_AND_GLOSSARY | CANONICAL |
| SRC-049 | SUPERSEDED_ONB-GOV-004_BASELINE_DOCUMENTAL_CONGELADA_v1.0 | DOCUMENTATION_FROZEN_BASELINE_HISTORICAL | SUPERSEDED |
| SRC-050 | ONB-GOV-004_BASELINE_DOCUMENTAL_CONGELADA_v1.1 | DOCUMENTATION_FROZEN_BASELINE | CANONICAL |
| SRC-051 | ONB-EXE-001_CAP19_READINESS_E_PLANO_DE_REMEDIACAO_W1_v1.0 | CAP19_EXECUTION_PLAN | CANONICAL_EXECUTION_PLAN |
| SRC-052 | ONB-EXE-002_MAPA_TECNICO_READ_ONLY_CAP19_W1_001_002_v1.0 | CAP19_READ_ONLY_TECHNICAL_MAP | CANONICAL_EXECUTION_SUPPORT |
| SRC-053 | ONB-EXE-003_MAPA_TECNICO_READ_ONLY_CAP19_W1_003_SOD_v1.0 | CAP19_SOD_READ_ONLY_TECHNICAL_MAP | CANONICAL_EXECUTION_SUPPORT |
| SRC-054 | ONB-EXE-004_MAPA_TECNICO_READ_ONLY_CAP19_W1_004_CHANNEL_CONTEXT_v1.0 | CAP19_CHANNEL_READ_ONLY_TECHNICAL_MAP | CANONICAL_EXECUTION_SUPPORT |
| SRC-055 | ONB-EXE-005_MAPA_TECNICO_READ_ONLY_CAP19_W1_005_WHITE_LABEL_PROVISIONING_v1.0 | CAP19_WHITE_LABEL_READ_ONLY_TECHNICAL_MAP | CANONICAL_EXECUTION_SUPPORT |
| SRC-056 | ONB-SEC-001_THREAT_MODEL_E_TEST_SPEC_CAP19_W1_006_LOGIN_SESSION_v1.0 | CAP19_LOGIN_SESSION_THREAT_MODEL_TEST_SPEC | CANONICAL_EXECUTION_SUPPORT |
| SRC-057 | ONB-QA-006_PACOTE_INTEGRADO_READINESS_GATE_CAP19_W1_007_G1_v1.0 | CAP19_INTEGRATED_READINESS_GATE_PACKAGE | CANONICAL_EXECUTION_SUPPORT |
| SRC-058 | ONB-EXE-006_PLANO_READINESS_W2_CASE_LIFECYCLE_JORNADA_v1.0 | W2_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-059 | ONB-EXE-007_PLANO_READINESS_W3_IDENTIDADE_DOCUMENTOS_FRAUDE_v1.0 | W3_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-060 | ONB-EXE-008_PLANO_READINESS_W4_KYB_FONTES_OFICIAIS_BRASIL_v1.0 | W4_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-061 | ONB-EXE-009_PLANO_READINESS_W5_AML_EDD_HFS_v1.0 | W5_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-062 | ONB-EXE-010_PLANO_READINESS_W6_DUE_DILIGENCE_PRIVACY_v1.0 | W6_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-063 | ONB-EXE-011_PLANO_READINESS_W7_ADMIN_PRODUCTS_DEVELOPER_PLATFORM_v1.0 | W7_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-064 | ONB-EXE-012_PLANO_READINESS_W8_MONITORAMENTO_HANDOFFS_v1.0 | W8_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-065 | ONB-EXE-013_PLANO_READINESS_W9_RESILIENCIA_SEGURANCA_PERFORMANCE_v1.0 | W9_READINESS_EXECUTION_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-066 | ONB-QA-005_PLANO_READINESS_W10_UAT_MUTUAL_CLIENTE_1_v1.0 | W10_UAT_READINESS_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-067 | ONB-REL-001_PLANO_READINESS_W11_PILOTO_RELEASE_PRODUCTION_VERIFICATION_v1.0 | W11_RELEASE_READINESS_PLAN | CANONICAL_EXECUTION_SUPPORT |
| SRC-068 | ONB-PRD-001_ANALISE_TRANSVERSAL_30_HABILIDADES_E_PRONTIDAO_PRODUTO_v1.0 | TRANSVERSAL_PRODUCT_READINESS_ASSESSMENT | CANONICAL_EXECUTION_SUPPORT |
| SRC-069 | ONB-SEC-002_REGISTRO_INCIDENTE_EXPOSICAO_CHAVE_MESTRA_DEV_v0.1 | SECURITY_INCIDENT_RECORD | CANONICAL |

Notas relevantes da fonte: SRC-034 (SHA-256 8e8fda52…), SRC-035 (SHA-256 898edb7b…), SRC-036 (SHA-256 8cd32fca…); SRC-050 é a baseline documental ativa (corte: REG rev157, START_HERE rev14, Inventário rev11, ADR Index rev9, Semântica rev3); SRC-052..057 referenciam o main ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51.

---

## TRACEABILITY_D2

Matriz de reconciliação técnica D2 — 32 traces (TRC-D2-001..032).

| Trace ID | Source/Decision | Requirement | Capability | Screen/Contract | Technical state | Gap/Finding | Gate | Reconciliation status |
|---|---|---|---|---|---|---|---|---|
| TRC-D2-001 | ADR-014 / SRC-004 | REQ-ONB-059 | CAP-01..22 | Repository | REAL | — | G0 | RECONCILED |
| TRC-D2-002 | ADR-005 / architecture target | REQ-ONB-050 | CAP-19,20 | Tenant isolation | REAL | GAP-ONB-005,011 | G1/H-04 | PARTIALLY_RECONCILED |
| TRC-D2-003 | ADR-006 candidate / main code | REQ-ONB-012,050 | CAP-19,20 | IAM foundation | PARTIAL | GAP-ONB-001,009,010,023 | G1/G7/G9 | PARTIALLY_RECONCILED |
| TRC-D2-004 | ADR-019 / UX contract | REQ-ONB-012,040,050 | CAP-19,20 | C1..C24 | PARTIAL | GAP-ONB-009 | G1/G7 | RECONCILED_GAP |
| TRC-D2-005 | REQ multi-tenant | REQ-ONB-012,058 | CAP-16,19,20 | B1/B2+ | PARTIAL | GAP-ONB-011 | G1 | RECONCILED_GAP |
| TRC-D2-006 | REQ QA | REQ-ONB-039,041 | PROGRAM | G9/H-11 | PARTIAL | GAP-ONB-005,016 | G0/G9/H-11 | RECONCILED_GAP |
| TRC-D2-007 | ADR-019 / SRC-026/031 | REQ-ONB-040 | CAP-01..22 | A1..D14 | PARTIAL | GAP-ONB-002 | G0/G7/H-01 | IN_PROGRESS |
| TRC-D2-008 | PR technical evidence | REQ-ONB-039 | CAP-19,20 | PR #4 | PARTIAL | GAP-ONB-005,009,010,011 | G0/G1 | NON_MAIN_EVIDENCE |
| TRC-D2-009 | PR documentation evidence | REQ-ONB-059 | PROGRAM | docs/execucao | ABSENT | FIND-008 | G0 | RECONCILED_FINDING |
| TRC-D2-010 | Data governance | REQ-ONB-039 | CAP-20 | Migrations | PARTIAL | GAP-ONB-024 | G1 | RECONCILED_GAP |
| TRC-D2-011 | ADR-023 | REQ-ONB-069 | CAP-19 | Tenant↔Channel topology | PARTIAL | GAP-ONB-041 | G1/G7/G9 | RECONCILED_GAP |
| TRC-D2-012 | ADR-023 / CAP-19 | REQ-ONB-069 | CAP-19 | White-label foundation | PARTIAL | GAP-ONB-042 | G1/G7/G9 | RECONCILED_GAP |
| TRC-D2-013 | ADR-019/023 | REQ-ONB-001..069 | CAP-01..22 | Capability technical-state matrix | PARTIAL | GAPs específicos por capability | G0..G10 conforme CAP | RECONCILED_BASELINE |
| TRC-D2-014 | ADR-024 / SRC-047 | REQ-ONB-070,071 | CAP-07,16,20 | Economic participant roles/relationships | PARTIAL | GAP-ONB-043 | G2/G7 | RECONCILED_GAP |
| TRC-D2-015 | ADR-024 / SRC-047 | REQ-ONB-072,073 | CAP-18,19,20 | HOF-007..010 adjacent financial/commercial handoffs | NOT_EVIDENCED | GAP-ONB-044 | G7/G9 | RECONCILED_GAP |
| TRC-D2-016 | ADR-024 / SRC-047 | REQ-ONB-074,075 | CAP-17,18,20,21 | Downstream risk feedback and audit correlation | PARTIAL | GAP-ONB-045 | G7/G8/G9 | RECONCILED_GAP |
| TRC-D2-017 | ADR-016/020 + SRC-044/045 | REQ-ONB-060 | CAP-16,17,20 | ST-CASE / status catalog | PARTIAL | GAP-ONB-015,031 | G2/G7/G9 | RECONCILED_GAP |
| TRC-D2-018 | ADR-016/020 + SRC-045 | REQ-ONB-061 | CAP-17,18,20,21 | Domain event taxonomy/registry | PARTIAL | GAP-ONB-032 | G2/G7 | RECONCILED_GAP |
| TRC-D2-019 | SRC-045 / REQ reliable events | REQ-ONB-061,062 | CAP-17,18,20,21 | Outbox/idempotency/DLQ/replay/delivery | PARTIAL | GAP-ONB-035 | G7/G9 | RECONCILED_GAP |
| TRC-D2-020 | ADR-016 + SRC-045 | REQ-ONB-062 | CAP-18,20,21 | Public API + signed webhooks | NOT_EVIDENCED | GAP-ONB-033,035 | G7/G9 | RECONCILED_GAP |
| TRC-D2-021 | ADR-002/004/022 + SRC-012/013 | REQ-ONB-015..018,055,076 | CAP-01..13,21 | Provider abstraction/routing/adapters | PARTIAL | GAP-ONB-012,022 | G3/G5/G9 | PARTIALLY_RECONCILED |
| TRC-D2-022 | ADR-025 + APPLICABILITY | REQ-ONB-076 | CAP-01..22 | Conditional-by-Design runtime | PARTIAL | GAP-ONB-036,039,046 | G0/G2/G7/G9 | RECONCILED_GAP |
| TRC-D2-023 | ADR-020/021 + SRC-040 | REQ-ONB-065,075 | CAP-16,20,21 | Audit trail + export | PARTIAL | GAP-ONB-037,041 | G2/G5/G9 | PARTIALLY_RECONCILED |
| TRC-D2-024 | ADR-017/021/025 + SRC-038/042 | REQ-ONB-063,064,068,076 | CAP-14,15,19,20 | RegulatoryPack + applicability engine | PARTIAL | GAP-ONB-036,040,046 | G0/G6/G7/G9/G10 | RECONCILED_GAP |
| TRC-D2-025 | ADR-017/021 + SRC-039 | REQ-ONB-067,076 | CAP-14,15,19,20 | Dynamic declarations | PARTIAL | GAP-ONB-039,046 | G2/G5/G7 | RECONCILED_GAP |
| TRC-D2-026 | ADR-017/021 + SRC-041 | REQ-ONB-066,076 | CAP-18,20 | CCS/ACCS conditional reporting | NOT_EVIDENCED | GAP-ONB-038 | G4/G7/G9 | RECONCILED_GAP |
| TRC-D2-027 | ADR-010/022/025 + SRC-010/020/047 | REQ-ONB-020,073..076 | CAP-17,18,20,21,22 | HFS + handoff runtime | NOT_EVIDENCED | GAP-ONB-021,044,045 | G5/G7/G8/G9 | RECONCILED_GAP |
| TRC-D2-028 | SRC-012/040 + REQ document evidence | REQ-ONB-005,064,076 | CAP-02,14,20 | Secure document storage | PARTIAL | GAP-ONB-013 | G2/G3/G6/G9 | RECONCILED_GAP |
| TRC-D2-029 | SRC-045 / Analytics contract | REQ-ONB-060..062,076 | CAP-20,21 | Observability and analytics | PARTIAL | GAP-ONB-017,034 | G9 | RECONCILED_GAP |
| TRC-D2-030 | ADR-007 + privacy contracts | REQ-ONB-064,065,076 | CAP-17,19,20 | Retention/privacy lifecycle | PARTIAL | GAP-ONB-014,020 | G6/G9 | RECONCILED_GAP |
| TRC-D2-031 | ADR-005/018 + CI contract | REQ-ONB-039,050 | CAP-19,20 | Security CI/hardening | PARTIAL | GAP-ONB-005,016,023 | G1/G9 | RECONCILED_GAP |
| TRC-D2-032 | SRC-039/040 + REQ-ONB-077 | REQ-ONB-064,067,076,077 | CAP-14,19,20 | Terms/consent/declaration/signature evidence | PARTIAL | GAP-ONB-047 | G2/G5/G6/G7 | RECONCILED_GAP |

---

## ADJACENT_CAPABILITIES

8 capacidades econômicas adjacentes (ADJ-01..08). Todas com Estado documental **CANONICAL**, Multi-tenant **MANDATORY**, Multi-channel **MANDATORY**, White-label **CONFIG_ONLY**. Onboarding fornece identidade/vínculo/elegibilidade/restrições/evidence refs; execução financeira/comercial é downstream.

| ADJ ID | Nome | Domínio source of truth | Estado técnico no onboarding-corporativo | Handoff | Observação (condensada) |
|---|---|---|---|---|---|
| ADJ-01 | Split Payment | Payments/Ledger/Settlement | OUT_OF_SCOPE_RUNTIME / HANDOFF_NOT_EVIDENCED | HOF-008 | Regras percentuais/fixas, prioridade, arredondamento, retenções, reversão, chargeback/MED, reconciliação e liquidação ficam no domínio financeiro |
| ADJ-02 | Afiliados | Partner/Commercial | PARTIAL_DOMAIN_PRIMITIVES / HANDOFF_NOT_EVIDENCED | HOF-007 | Programa comercial, contrato/plano e lifecycle comercial no domínio Partner/Commercial |
| ADJ-03 | Indicações / Referral | Partner/Commercial | PARTIAL_DOMAIN_PRIMITIVES / HANDOFF_NOT_EVIDENCED | HOF-007 | Tracking de origem, janela de atribuição, duplicidade, fraude/autorreferência e conversão exigem contrato downstream |
| ADJ-04 | Comissões | Finance/Commercial | OUT_OF_SCOPE_RUNTIME / HANDOFF_NOT_EVIDENCED | HOF-009 | Cálculo, competência, retenção, aprovação, pagamento, estorno, clawback e reconciliação são downstream |
| ADJ-05 | Remunerações | Finance/Commercial | OUT_OF_SCOPE_RUNTIME / HANDOFF_NOT_EVIDENCED | HOF-009 | Separada conceitualmente de comissão quando a natureza econômica for diferente |
| ADJ-06 | Revenue Share / Fee Share | Finance/Accounting/Commercial | OUT_OF_SCOPE_RUNTIME / HANDOFF_NOT_EVIDENCED | HOF-009 | Fee split = divisão de tarifa; revenue share = distribuição de receita; ambos distintos de split de pagamento |
| ADJ-07 | Campanhas e Incentivos | Partner/Commercial | OUT_OF_SCOPE_RUNTIME / HANDOFF_NOT_EVIDENCED | HOF-010 | Bônus, rebates, premiações, volume/faixa e metas ficam no domínio comercial |
| ADJ-08 | Settlement de Parceiros | Ledger/Settlement | OUT_OF_SCOPE_RUNTIME / HANDOFF_NOT_EVIDENCED | HOF-008/HOF-009 | Saldos pendente/disponível/bloqueado/reservado/pago/devolvido/conciliado pertencem ao ledger/settlement |

---

## APPLICABILITY

Registry Conditional-by-Design — 11 regras (APP-001..011), todas com Status **CANONICAL** e Effective From 2026-08-09.

| Applicability ID | Entity Type | Entity ID | Modo | Autoridade de decisão | Rule/Pack Reference | Gate | Nota (condensada) |
|---|---|---|---|---|---|---|---|
| APP-001 | PROGRAM | ALL | CORE_MANDATORY | Program Owner / Architecture / Product | REQ-ONB-076 / ADR-025 | G0/G2/G7/G9 | Todo item relevante declara aplicabilidade ou justifica CORE_MANDATORY; frontend nunca é autoridade |
| APP-002 | TENANT_CHANNEL | REQ-ONB-069 / CAP-19 | CONDITIONAL | Architecture / Security / Tenant Admin | REQ-ONB-069 / ADR-023 | G1/G7/G9 | Tenant e Canal resolvidos separadamente; associação somente por configuração versionada; nunca inferir um pelo outro |
| APP-003 | REGULATORY_OUTPUT | REQ-ONB-066 / CCS | CONDITIONAL | Compliance / Legal / Regulatory Owner | RegulatoryPack + JurisdictionPack + SRC-041 | G4/G7/G9 | CCS existe no produto, mas nunca é presumido universal; somente quando enquadramento formal vigente |
| APP-004 | DECLARATION | REQ-ONB-067 | CONDITIONAL | Compliance / Legal / Product | SRC-039 / SRC-042 | G2/G5/G7 | Declaração ativada por regra versionada de pack; nenhuma declaração regulatória hardcoded como universal |
| APP-005 | PROVIDER_ROUTING | CAP-01..CAP-13 | CONDITIONAL | Architecture / Procurement / Compliance | SRC-012 / PROVIDERS registry | G3/G5/G9 | Provider elegível conforme capability, jurisdição, documento, contrato, residency, health, custo, economic_group; fallback nunca equivale a aprovação |
| APP-006 | SCREEN_FUNCTION | A1..D14 | CONDITIONAL | Product / UX / Architecture | SRC-026 / SRC-031 | G2/G7/H-01 | 80 telas são funções canônicas disponíveis, não 80 passos obrigatórios; materialização por superfície/papel/flow/estado/packs |
| APP-007 | WHITE_LABEL | CAP-19 | CONDITIONAL | Tenant Admin / Product / Brand Governance | ADR-023 / CAP-19 | G7/G9 | Brand/theme/domain/content/localization por configuração versionada; white-label nunca altera segurança, risco, compliance, audit ou semântica |
| APP-008 | ADJACENT_ECONOMIC | ADJ-01..08 | CONDITIONAL | Product / Commercial / Finance / Compliance | SRC-047 / ADR-024 / REQ-ONB-070..075 | G7/G8/G9 | Ativar modelagem/handoff quando programa/papel econômico exigir; Onboarding não executa motor financeiro |
| APP-009 | JURISDICTION_PACK | CAP-19 | CONDITIONAL | Compliance / Legal / Product / Architecture | SRC-014 / JURISDICTIONS registry | G6/G7/G9 | Pack selecionado pela jurisdição/regulatory profile aplicável; Brasil-first não transforma regras BR em core universal |
| APP-010 | INTERNAL_CAPABILITY | CAP-22 | CONDITIONAL | Compliance / Model Governance / Architecture | SRC-010 / H-16 | G5/H-16 | HFS invocada somente conforme policy/case autorizado; metodologia proprietária não é exposta |
| APP-011 | AUDIT_EXPORT | CAP-20 / REQ-ONB-065 | CONDITIONAL | Compliance / Security / Data Protection | SRC-040 / SRC-018 | G9/H-05/H-15 | Export conforme finalidade autorizada, papel/escopo, obrigação, tenant, data range e sensitivity; CSV/XLSX/JSONL/PDF/evidence bundle/layouts regulatórios |

---

## SEMANTIC_REGISTRY

Modelo semântico vivo — 91 termos canônicos (SEM-001..091). Autoridade: SRC-048 + ADR-027. Coluna "Status" é o status semântico do termo; "Estado técnico" é o observado no código.

| SEM_ID | Termo canônico | Categoria | Definição (condensada) | Estado técnico | Status |
|---|---|---|---|---|---|
| SEM-001 | Tenant | Contexto/Isolamento | Fronteira lógica de isolamento, configuração, autorização e ownership contratual do cliente | PARTIAL | CANONICAL |
| SEM-002 | Channel | Contexto/Canal | Dimensão first-class de operação/distribuição/acesso, com identidade própria e configuração versionada | NOT_EVIDENCED | CANONICAL |
| SEM-003 | ChannelBinding | Contexto/Relacionamento | Relação versionada Tenant↔Channel, com hierarquia, vigência, regras e overrides permitidos | NOT_EVIDENCED | CANONICAL |
| SEM-004 | InteractionSource | Contexto/Origem técnica | Origem técnica da ação/fato: hosted_flow, public_api, partner_api, analyst_console, delegated_journey, system_job, webhook_inbound, batch etc. | PARTIAL | CANONICAL |
| SEM-005 | WhiteLabelProfile | Configuração/Experiência | Perfil versionado de marca, tema, domínio, conteúdo, templates, locale e experiência visual | PARTIAL | CANONICAL |
| SEM-006 | LegalEntity | Domínio/Entidade | Pessoa jurídica/organização com identidade legal/regulatória própria | PARTIAL | CANONICAL |
| SEM-007 | Subject | Domínio/Identidade | Sujeito canônico de verificação, decisão e evidência no Onboarding | REAL/PARTIAL | CANONICAL |
| SEM-008 | Actor | Segurança/Auditoria | Entidade que causa/executa ação: usuário, sistema, provider, worker/job ou serviço, com identidade e authority auditáveis | PARTIAL | CANONICAL |
| SEM-009 | Person | Domínio/Identidade | Pessoa natural com identificadores tipados por autoridade/jurisdição, sem CPF universal | PARTIAL | CANONICAL |
| SEM-010 | Company | Domínio/Identidade | Organização empresarial com identifiers e registries variáveis por jurisdição | PARTIAL | CANONICAL |
| SEM-011 | Relationship | Domínio/Relacionamento | Vínculo versionado entre sujeitos/entidades com role/purpose, vigência, restrições e evidência | PARTIAL | CANONICAL |
| SEM-012 | EconomicRole | Domínio/Relacionamento econômico | Papel/purpose econômico de um Relationship, para elegibilidade/restrições/handoff; não cria saldo | NOT_EVIDENCED | CANONICAL |
| SEM-013 | Case | Domínio/Case Management | Unidade canônica do lifecycle de onboarding: contexto, requisitos, evidências, decisões, status, auditoria, monitoramento | PARTIAL | CANONICAL |
| SEM-014 | Journey | Produto/Orquestração | Experiência/orquestração configurada de requirements e steps aplicáveis | PARTIAL | CANONICAL |
| SEM-015 | Step | Produto/Orquestração | Etapa identificável de Flow/Journey; posição/atividade, não status de domínio | PARTIAL | CANONICAL |
| SEM-016 | Requirement | Produto/Requisito | Obrigação de produto/configuração com ID, versão e aplicabilidade | PARTIAL | CANONICAL |
| SEM-017 | RegulatoryRequirement | Compliance/Requisito | Requirement de regulador/regime com norma, vigência, jurisdição, applicability, evidência e owner/approver | NOT_EVIDENCED | CANONICAL |
| SEM-018 | DeclarationDefinition | Compliance/Declaração | Especificação versionada de pergunta/declaração/campo regulatório, ativada por ApplicabilityEvaluation | PARTIAL | CANONICAL |
| SEM-019 | ConsentAcceptance | Compliance/Consentimento | Registro versionado de apresentação/resposta a termo/consentimento/declaração/assinatura, com prova de aceite/recusa/retirada | PARTIAL | CANONICAL |
| SEM-020 | Policy | Produto/Decisão | Conjunto versionado de regras que produz decisão, requisito, restrição, routing ou comportamento autorizado | PARTIAL | CANONICAL |
| SEM-021 | Flow | Produto/Orquestração | Grafo/sequência versionada que orquestra requirements, steps, conditions e transitions | PARTIAL | CANONICAL |
| SEM-022 | Capability | Arquitetura/Capability | Capacidade vendor-agnostic com contrato versionado de input, output, evidence, timeout e idempotência | PARTIAL por CAP | CANONICAL |
| SEM-023 | Provider | Arquitetura/Fornecedor | Fornecedor/serviço externo que implementa capabilities, sujeito a contrato, cobertura, saúde, custo, privacy e due diligence | Adapters NOT_EVIDENCED | CANONICAL |
| SEM-024 | Adapter | Arquitetura/Integração | Traduz contrato/payload de Provider/OfficialSource para contrato canônico sem vazar semântica proprietária | NOT_EVIDENCED concreto | CANONICAL |
| SEM-025 | OfficialSource | Arquitetura/Fonte | Fonte pública/oficial com provenance/autoridade preservadas | PARTIAL/NOT_EVIDENCED | CANONICAL |
| SEM-026 | InternalCapability | Arquitetura/Capability interna | Capability operada pela Mutual sob contrato interno versionado (ex.: CAP-22/HFS) | NOT_EVIDENCED CAP-22 | CANONICAL |
| SEM-027 | VerificationExecution | Arquitetura/Execução | Execução concreta de uma Capability, com request/run ID, timing, resultado, custo e provenance | PARTIAL | CANONICAL |
| SEM-028 | EvidenceEnvelope | Arquitetura/Evidência | Envelope canônico normalizado: assertion/result, provenance, capability, fonte, validade, correlação, classificação | PARTIAL | CANONICAL |
| SEM-029 | Evidence | Domínio/Evidência | Fato/artefato/assertion defensável com provenance e lifecycle próprios | REAL/PARTIAL | CANONICAL |
| SEM-030 | Document | Domínio/Documento | Artefato documental identificado, versionado, hashado, com tipo, emissor, validade, supersessão e lifecycle de segurança | PARTIAL | CANONICAL |
| SEM-031 | Dossier | Audit/Export | Projeção autorizada e reproduzível de case/decisões/evidências/trilha; não é source of truth | PARTIAL | CANONICAL |
| SEM-032 | StatusDefinition | Domínio/Estado | Definição estável/versionada de status no catálogo (ST-ID, key, owner, transições, evento, exposição) | PARTIAL | CANONICAL |
| SEM-033 | DomainState | Domínio/Estado | Valor atual de estado de um aggregate, autorizado por state machine | PARTIAL | CANONICAL |
| SEM-034 | Situation | Código/Legacy mapping | Alias legado (campo situacao) que deve mapear para DomainState/StatusDefinition | REAL como campo local | CANONICAL_MAPPING |
| SEM-035 | UIState | UX/Estado | Estado transitório de interface (loading, empty, error, access_denied, degraded); não é estado de negócio | PARTIAL | CANONICAL |
| SEM-036 | GovernanceState | Governança/Estado | Estado do lifecycle de task/capability/gate/release (DISCOVERED, READY, QA, RELEASED, PRODUCTION_VERIFIED) | REAL no program registry | CANONICAL |
| SEM-037 | HealthStatus | Operação/Estado técnico | Saúde operacional de serviço/provider/capability/queue/storage, separada de resultado de negócio | NOT_EVIDENCED E2E | CANONICAL |
| SEM-038 | DomainEvent | Eventos/Contrato | Fato imutável nomeado/versionado produzido após mudança autorizada; alimenta audit, timeline, KPIs e integrações | PARTIAL | CANONICAL |
| SEM-039 | Command | Eventos/Intenção | Intenção autenticada de executar mudança; pode ser rejeitada; não prova que o fato ocorreu | PARTIAL | CANONICAL |
| SEM-040 | AuditRecord | Auditoria/Registro | Registro append-only de quem fez o quê, quando, por quê, com authority, contexto, correlação e refs before/after/evidence | PARTIAL | CANONICAL |
| SEM-041 | Timeline | Auditoria/Read model | Projeção cronológica de eventos/audit records; derivada de fatos, nunca fonte paralela de verdade | PARTIAL | CANONICAL |
| SEM-042 | WorkerJob | Async/Operação | Unidade técnica assíncrona com lifecycle, retry/idempotência; não é evento de domínio | PARTIAL/REAL foundation | CANONICAL |
| SEM-043 | WebhookDelivery | Integração/Entrega | Tentativa/estado de entrega externa de DomainEvent, com delivery_id, attempt, assinatura, retry/DLQ e audit | NOT_EVIDENCED | CANONICAL |
| SEM-044 | Notification | Comunicação/Entrega | Mensagem operacional/regulatória (e-mail, SMS, WhatsApp, push) com template, destinatário, purpose e delivery lifecycle | NOT_EVIDENCED | CANONICAL_TERM |
| SEM-045 | ReasonCode | Governança/Explicabilidade | Código estável/versionado que explica motivo de decisão, restrição, transição, não aplicabilidade, override, degradação ou bloqueio | NOT_EVIDENCED registry completo | CANONICAL |
| SEM-046 | Decision | Domínio/Decisão | Resultado versionado e auditável de policy ou decisão humana, com authority, reason codes, evidence refs | PARTIAL | CANONICAL |
| SEM-047 | Restriction | Domínio/Controle | Limitação imposta a sujeito/relacionamento/produto/handoff/operação downstream, com tipo, razão, vigência e owner | PARTIAL | CANONICAL |
| SEM-048 | Eligibility | Domínio/Elegibilidade | Veredicto versionado de habilitação para escopo de produto/papel/handoff, com reason e evidence | NOT_EVIDENCED E2E | CANONICAL |
| SEM-049 | ApplicabilityEvaluation | Arquitetura/Conditional-by-Design | Decisão reproduzível/auditável que avalia regra/version contra input_context e produz ApplicabilityState | PARTIAL | CANONICAL |
| SEM-050 | ApplicabilityState | Arquitetura/Conditional-by-Design | CORE_MANDATORY, CONDITIONAL, APPLICABLE, NOT_APPLICABLE, PROHIBITED ou REVIEW_REQUIRED | CANONICAL DOCUMENTAL | CANONICAL |
| SEM-051 | JurisdictionPack | Arquitetura/Global | Overlay versionado territorial: identifiers, documents, official sources, privacy/residency, locale e regras locais sem fork do core | NOT_EVIDENCED runtime | CANONICAL |
| SEM-052 | RegulatoryPack | Compliance/Regulação | Overlay versionado de obrigações formalmente aplicáveis, com vigência, approvals, requirements, evidence e reporting outputs | NOT_EVIDENCED runtime | CANONICAL |
| SEM-053 | SegmentPack | Produto/Segmento | Overlay versionado de requisitos/policies por segmento (banking, payments, credit, capital, VASP, insurance…) | FRAMEWORK_ONLY | CANONICAL |
| SEM-054 | TenantPolicy | Produto/Configuração | Overlay versionado de decisões/configurações do tenant: risco, alçadas, providers, SLAs, canais, retenção, marca, regras comerciais | PARTIAL | CANONICAL |
| SEM-055 | CaseContext | Arquitetura/Contexto | Snapshot/contexto versionado para avaliar requirements, applicability, policy e routing do case | NOT_EVIDENCED como objeto completo | CANONICAL |
| SEM-056 | Jurisdiction | Global/Contexto | Unidade territorial/regulatória para regras, documentos, fontes, privacy e routing | PARTIAL | CANONICAL |
| SEM-057 | Country | Global/Geografia | País ISO usado em endereço, documento, residência, nacionalidade; não determina sozinho a jurisdição regulatória | PARTIAL | CANONICAL |
| SEM-058 | DataRegion | Global/Dados | Região técnica de processamento/armazenamento; usada para residency, deployment e routing | NOT_EVIDENCED E2E | CANONICAL |
| SEM-059 | DataResidency | Privacy/Dados | Restrição/requisito de localização e tratamento de dados por contrato/jurisdiction/policy | NOT_EVIDENCED E2E | CANONICAL |
| SEM-060 | Locale | Global/UX | Convenção de idioma/formatação; não altera significado de IDs/contratos | PARTIAL | CANONICAL |
| SEM-061 | Timezone | Global/Tempo | Fuso para apresentação, SLA e regras locais; timestamps técnicos preservam UTC | PARTIAL | CANONICAL |
| SEM-062 | LegalBasis | Privacy/Legal | Base jurídica aprovada que sustenta tratamento/uso de dado | NOT_EVIDENCED E2E | CANONICAL |
| SEM-063 | PrivacyRegime | Privacy/Legal | Regime de privacidade/proteção de dados aplicável (rights, retention, transfer, residency, controls) | NOT_EVIDENCED E2E | CANONICAL |
| SEM-064 | CorrelationId | Observabilidade/Correlação | Identificador estável que conecta cadeia lógica E2E entre commands, events, audit, provider runs, webhooks e handoffs | NOT_EVIDENCED E2E | CANONICAL |
| SEM-065 | CausationId | Observabilidade/Causalidade | ID do command/event imediato que causou outro evento | NOT_EVIDENCED E2E | CANONICAL |
| SEM-066 | TraceId | Observabilidade/Tracing | Identificador técnico de trace distribuído; não é correlação de negócio nem idempotency key | NOT_EVIDENCED E2E | CANONICAL |
| SEM-067 | IdempotencyKey | Resiliência/Idempotência | Chave de intenção/requisição repetível para impedir efeitos duplicados; escopo e janela definidos | PARTIAL | CANONICAL |
| SEM-068 | Handoff | Integração/Fronteira | Contrato versionado que transfere fatos/IDs/elegibilidade/restrições a domínio downstream sem transferir ownership do estado | NOT_EVIDENCED executável | CANONICAL |
| SEM-069 | DownstreamFeedback | Integração/Feedback | Evento normalizado de domínio downstream que pode acionar review/revalidation/restriction, sem reescrever o case | NOT_EVIDENCED | CANONICAL |
| SEM-070 | PaymentSplit | Adjacente/Financeiro | Divisão do fluxo financeiro entre participantes, com alocação, reversão, chargeback/MED e liquidação | OUT_OF_RUNTIME_SCOPE | CANONICAL_ADJACENT |
| SEM-071 | FeeSplit | Adjacente/Financeiro | Divisão de uma tarifa cobrada entre participantes | OUT_OF_RUNTIME_SCOPE | CANONICAL_ADJACENT |
| SEM-072 | RevenueShare | Adjacente/Financeiro | Distribuição de receita econômica própria da Mutual/programa entre participantes elegíveis | OUT_OF_RUNTIME_SCOPE | CANONICAL_ADJACENT |
| SEM-073 | Commission | Adjacente/Financeiro | Obrigação remuneratória por regra de comissão, base, competência, aprovação, pagamento, estorno/clawback e reconciliação | OUT_OF_RUNTIME_SCOPE | CANONICAL_ADJACENT |
| SEM-074 | Remuneration | Adjacente/Financeiro | Pagamento recorrente/eventual a parceiro/agente/correspondente cuja natureza não seja necessariamente comissão | OUT_OF_RUNTIME_SCOPE | CANONICAL_ADJACENT |
| SEM-075 | Settlement | Adjacente/Financeiro | Lifecycle financeiro de saldos/payables e liquidação (pendente, disponível, bloqueado, reservado, pago, devolvido, reconciliado) | OUT_OF_RUNTIME_SCOPE | CANONICAL_ADJACENT |
| SEM-076 | AuditTrail | Auditoria/Arquitetura | Conjunto append-only e correlacionado de AuditRecords para reconstruir lifecycle, decisões, acessos e mudanças materiais | PARTIAL | CANONICAL |
| SEM-077 | EventStore | Eventos/Arquitetura | Persistência append-only de DomainEvents (quando adotada); não é sinônimo de audit trail | NOT_EVIDENCED | CANONICAL_TERM |
| SEM-078 | EvidenceBundle | Auditoria/Export | Pacote reproduzível de evidências autorizadas com manifest, hashes, versões, escopo e metadata | NOT_EVIDENCED completo | CANONICAL |
| SEM-079 | ExportArtifact | Auditoria/Export | Arquivo/projeção em CSV, XLSX, JSON/JSONL, PDF ou formato regulatório, com schema/version, filtros, autor, hash e audit event | PARTIAL JSON dossier | CANONICAL |
| SEM-080 | DocumentaryClassification | Governança/Classificação | Estado de autoridade/maturidade documental: CANONICAL, PROPOSED, REVIEW_REQUIRED, LEGACY, SUPERSEDED | REAL | CANONICAL |
| SEM-081 | TechnicalState | Governança/Técnico | Estado observado no código/ambiente: REAL, PARTIAL, UI_ONLY, PROTOTYPE, ABSENT, NOT_EVIDENCED | REAL no registry | CANONICAL |
| SEM-082 | ExecutionState | Governança/Execução | Lifecycle: DISCOVERED→SPECIFIED→READY→IN_PROGRESS→CODE_COMPLETE→INTEGRATED→QA→UAT→READY_FOR_RELEASE→RELEASED→PRODUCTION_VERIFIED | REAL no registry | CANONICAL |
| SEM-083 | MarketReadiness | Governança/Mercado | Maturidade de jurisdição/mercado para uso comercial, separada de arquitetura e implementação | FRAMEWORK_READY Brasil/model | CANONICAL |
| SEM-084 | ExposureClassification | Segurança/Exposição | Quem pode receber status/evento/campo: PUBLIC, TENANT ou INTERNAL_ONLY | NOT_EVIDENCED E2E | CANONICAL |
| SEM-085 | SensitivityClassification | Segurança/Sensibilidade | Sensibilidade do conteúdo/dado, separada de exposição; ex.: NORMAL, RESTRICTED, SECURITY, REGULATED (taxonomy a formalizar) | TO_FORMALIZE taxonomy | CANONICAL_CONCEPT |
| SEM-086 | Role | Segurança/Autorização | Papel funcional de Actor/Relationship; não concede sozinho authority ilimitada | PARTIAL | CANONICAL |
| SEM-087 | Authority | Segurança/Autorização | Alçada/permissão efetiva e contextual derivada de identidade, role, scope, tenant, SoD e policy | PARTIAL | CANONICAL |
| SEM-088 | RegulatoryProfile | Compliance/Contexto | Perfil versionado da entidade/atividade/produto com enquadramentos regulatórios relevantes | NOT_EVIDENCED E2E | CANONICAL |
| SEM-089 | Identifier | Domínio/Identidade | Identificador tipado com tipo, país/jurisdição e valor; não assume formato universal | PARTIAL | CANONICAL |
| SEM-090 | SchemaVersion | Arquitetura/Versionamento | Versão imutável de contrato serializado; breaking change cria nova versão | NOT_EVIDENCED registry completo | CANONICAL |
| SEM-091 | RegulatoryNature | Produto/Regulatório/Contexto | Classificação versionada de naturezas exercidas pela entidade/tenant em uma jurisdição; no Brasil, autoridade viva é NATURES_BR | PARTIAL | CANONICAL |

---

## TRACEABILITY_MASTER

Golden thread viva — 77 traces (GTR-REQ-001..077), cobertura 1:1 de REQ-ONB-001..077. Todos com Traceability_State **TRACEABLE_PARTIAL**, exceto GTR-REQ-001 (**TRACEABLE_DOCUMENTAL**). Na fonte, todas as 77 linhas registram explicitamente NOT_RELEASED e NOT_PRODUCTION_VERIFIED (colunas Release/Production Verification, resumidas aqui).

| TRACE_ID | Requirement | Capabilities | Gap/Blocker | Gate | Estado |
|---|---|---|---|---|---|
| GTR-REQ-001 | REQ-ONB-001 | PROGRAM | NO_DIRECT_GAP_REGISTERED | G0 | TRACEABLE_DOCUMENTAL |
| GTR-REQ-002 | REQ-ONB-002 | PROGRAM / CAP-16,18,20 (boundary) | GAP-ONB-008,044 | G0/G7/G8 | TRACEABLE_PARTIAL |
| GTR-REQ-003 | REQ-ONB-003 | CAP-16 | NO_DIRECT_GAP_REGISTERED | G1 | TRACEABLE_PARTIAL |
| GTR-REQ-004 | REQ-ONB-004 | CAP-16 | GAP-ONB-015,031 | G1/G2 | TRACEABLE_PARTIAL |
| GTR-REQ-005 | REQ-ONB-005 | CAP-02,CAP-20 | GAP-ONB-013,020 | G2/G6 | TRACEABLE_PARTIAL |
| GTR-REQ-006 | REQ-ONB-006 | CAP-16,CAP-20 | GAP-ONB-010,037 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-007 | REQ-ONB-007 | CAP-15,CAP-16 | GAP-ONB-010 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-008 | REQ-ONB-008 | CAP-01..CAP-14 | GAP-ONB-012,022 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-009 | REQ-ONB-009 | CAP-20 | GAP-ONB-014,020,037 | G6 | TRACEABLE_PARTIAL |
| GTR-REQ-010 | REQ-ONB-010 | CAP-16 | GAP-ONB-008,044 | G8 | TRACEABLE_PARTIAL |
| GTR-REQ-011 | REQ-ONB-011 | CAP-20 | GAP-ONB-008,044 | G8 | TRACEABLE_PARTIAL |
| GTR-REQ-012 | REQ-ONB-012 | CAP-19,CAP-20 | GAP-ONB-005,011 | G1 | TRACEABLE_PARTIAL |
| GTR-REQ-013 | REQ-ONB-013 | CAP-19 | GAP-ONB-042 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-014 | REQ-ONB-014 | CAP-18 | GAP-ONB-033,035 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-015 | REQ-ONB-015 | CAP-01..CAP-14 | GAP-ONB-012,022 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-016 | REQ-ONB-016 | CAP-20 | GAP-ONB-012 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-017 | REQ-ONB-017 | CAP-18 | GAP-ONB-012,022 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-018 | REQ-ONB-018 | CAP-18 | GAP-ONB-012,022 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-019 | REQ-ONB-019 | CAP-06 | GAP-ONB-004 | G1 | TRACEABLE_PARTIAL |
| GTR-REQ-020 | REQ-ONB-020 | CAP-01,06,13 | GAP-ONB-012 | G4 | TRACEABLE_PARTIAL |
| GTR-REQ-021 | REQ-ONB-021 | CAP-12,CAP-13 | GAP-ONB-036,038,046 | G4 | TRACEABLE_PARTIAL |
| GTR-REQ-022 | REQ-ONB-022 | CAP-08,CAP-09 | GAP-ONB-012 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-023 | REQ-ONB-023 | CAP-08,CAP-20 | GAP-ONB-048 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-024 | REQ-ONB-024 | CAP-10,CAP-11 | GAP-ONB-012 | G6 | TRACEABLE_PARTIAL |
| GTR-REQ-025 | REQ-ONB-025 | CAP-15,CAP-16 | GAP-ONB-049 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-026 | REQ-ONB-026 | CAP-15 | NO_DIRECT_GAP_REGISTERED | G2 | TRACEABLE_PARTIAL |
| GTR-REQ-027 | REQ-ONB-027 | CAP-15 | GAP-ONB-010 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-028 | REQ-ONB-028 | CAP-07,CAP-16 | GAP-ONB-050 | G2 | TRACEABLE_PARTIAL |
| GTR-REQ-029 | REQ-ONB-029 | CAP-16 | GAP-ONB-051 | G2 | TRACEABLE_PARTIAL |
| GTR-REQ-030 | REQ-ONB-030 | CAP-16,CAP-20 | GAP-ONB-010,015 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-031 | REQ-ONB-031 | CAP-17 | GAP-ONB-052 | G8 | TRACEABLE_PARTIAL |
| GTR-REQ-032 | REQ-ONB-032 | CAP-03,CAP-04 | GAP-ONB-012 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-033 | REQ-ONB-033 | CAP-03,CAP-20 | GAP-ONB-013,020 | G6 | TRACEABLE_PARTIAL |
| GTR-REQ-034 | REQ-ONB-034 | CAP-22 | GAP-ONB-021 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-035 | REQ-ONB-035 | CAP-22 | GAP-ONB-021 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-036 | REQ-ONB-036 | CAP-22 | GAP-ONB-021 | G6 | TRACEABLE_PARTIAL |
| GTR-REQ-037 | REQ-ONB-037 | CAP-18 | GAP-ONB-022 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-038 | REQ-ONB-038 | PROGRAM / CAP-18,20 (handoff) | GAP-ONB-044 (handoff execution) | G0 | TRACEABLE_PARTIAL |
| GTR-REQ-039 | REQ-ONB-039 | PROGRAM / CAP-19,20 support | GAP-ONB-016 | G9 | TRACEABLE_PARTIAL |
| GTR-REQ-040 | REQ-ONB-040 | UX across CAP-01..22 | GAP-ONB-002 CLOSED para mapping; gaps de implementação/QA permanecem por tela/capability | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-041 | REQ-ONB-041 | PROGRAM / CAP-19,20 support | GAP-ONB-016 | G9 | TRACEABLE_PARTIAL |
| GTR-REQ-042 | REQ-ONB-042 | PROGRAM / affected CAPs | GAP-ONB-053 | G9 | TRACEABLE_PARTIAL |
| GTR-REQ-043 | REQ-ONB-043 | PROGRAM / applicable CAPs | NO_DIRECT_GAP_REGISTERED (bloqueado por gaps técnicos upstream) | G10 | TRACEABLE_PARTIAL |
| GTR-REQ-044 | REQ-ONB-044 | PROGRAM | NO_DIRECT_GAP_REGISTERED (release intencionalmente não iniciado) | G10 | TRACEABLE_PARTIAL |
| GTR-REQ-045 | REQ-ONB-045 | CAP-20 | GAP-ONB-014,020 | G6 | TRACEABLE_PARTIAL |
| GTR-REQ-046 | REQ-ONB-046 | CAP-21 | GAP-ONB-017,034 | G8 | TRACEABLE_PARTIAL |
| GTR-REQ-047 | REQ-ONB-047 | CAP-21 | GAP-ONB-034,017 | G8 | TRACEABLE_PARTIAL |
| GTR-REQ-048 | REQ-ONB-048 | CAP-15,CAP-19 | GAP-ONB-036,046 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-049 | REQ-ONB-049 | CAP-19 | NO_DIRECT_GAP_REGISTERED (packs internacionais ABSENT/FRAMEWORK_ONLY) | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-050 | REQ-ONB-050 | CAP-19,CAP-20 | GAP-ONB-011 | G1 | TRACEABLE_PARTIAL |
| GTR-REQ-051 | REQ-ONB-051 | CAP-01..CAP-22 | GAP-ONB-036,046 | G0 | TRACEABLE_PARTIAL |
| GTR-REQ-052 | REQ-ONB-052 | CAP-01,02,05,06,07 | GAP-ONB-004 (BR CNPJ E2E); gap não-BR a dispor em D0.9 | G1 | TRACEABLE_PARTIAL |
| GTR-REQ-053 | REQ-ONB-053 | CAP-19 | GAP-ONB-042 (se vinculado a profile/binding); possível gap i18n adicional | G2 | TRACEABLE_PARTIAL |
| GTR-REQ-054 | REQ-ONB-054 | CAP-20 | GAP-ONB-014,020,046 | G6 | TRACEABLE_PARTIAL |
| GTR-REQ-055 | REQ-ONB-055 | CAP-18,CAP-20 | GAP-ONB-012,022 | G3 | TRACEABLE_PARTIAL |
| GTR-REQ-056 | REQ-ONB-056 | CAP-15,CAP-19 | GAP-ONB-036,039,046 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-057 | REQ-ONB-057 | CAP-08,09,17 | GAP-ONB-012 | G5 | TRACEABLE_PARTIAL |
| GTR-REQ-058 | REQ-ONB-058 | CAP-19,20,21 | GAP-ONB-011,042 | G1 | TRACEABLE_PARTIAL |
| GTR-REQ-059 | REQ-ONB-059 | CAP-01..CAP-22 | FIND-008 (PR#5 doc drift); sem gap de identidade do repo | G0 | TRACEABLE_PARTIAL |
| GTR-REQ-060 | REQ-ONB-060 | CAP-16,20,21 | GAP-ONB-015,031 | G2 | TRACEABLE_PARTIAL |
| GTR-REQ-061 | REQ-ONB-061 | CAP-18,20,21 | GAP-ONB-032,035 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-062 | REQ-ONB-062 | CAP-18 | GAP-ONB-033,035 | G7 | TRACEABLE_PARTIAL |
| GTR-REQ-063 | REQ-ONB-063 | CAP-01..CAP-22 | GAP-ONB-036,040,046 | G0/G5/G6/G7 | TRACEABLE_PARTIAL |
| GTR-REQ-064 | REQ-ONB-064 | CAP-14,15,19,20 | GAP-ONB-036,040,046 | G2/G5/G6/G7 | TRACEABLE_PARTIAL |
| GTR-REQ-065 | REQ-ONB-065 | CAP-16,20,21 | GAP-ONB-037,041 | G2/G5/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-066 | REQ-ONB-066 | CAP-18,CAP-20 | GAP-ONB-038 | G4/G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-067 | REQ-ONB-067 | CAP-14,15,19,20 | GAP-ONB-039,046,047 | G2/G5/G7 | TRACEABLE_PARTIAL |
| GTR-REQ-068 | REQ-ONB-068 | CAP-15,20,21 | GAP-ONB-040,046 | G7/G9/G10 | TRACEABLE_PARTIAL |
| GTR-REQ-069 | REQ-ONB-069 | CAP-18,19,20,21 | GAP-ONB-041,042 | G1/G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-070 | REQ-ONB-070 | CAP-07,14,15,16,19,20 | GAP-ONB-043 | G2/G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-071 | REQ-ONB-071 | CAP-07,16,18,20 | GAP-ONB-043,045 | G2/G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-072 | REQ-ONB-072 | CAP-07,16,18,20 | GAP-ONB-044 | G0/G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-073 | REQ-ONB-073 | CAP-16,18,19,20 | GAP-ONB-044 | G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-074 | REQ-ONB-074 | CAP-17,18,20,21 | GAP-ONB-045 | G7/G8/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-075 | REQ-ONB-075 | CAP-18,20,21 | GAP-ONB-045 | G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-076 | REQ-ONB-076 | CAP-01..CAP-22 | GAP-ONB-046 | G0/G2/G7/G9 | TRACEABLE_PARTIAL |
| GTR-REQ-077 | REQ-ONB-077 | CAP-14,19,20 | GAP-ONB-047 | G2/G5/G6/G7 | TRACEABLE_PARTIAL |

---

## TRACEABILITY_SUMMARY

Gate calculado de cobertura/unicidade/explicitude da golden thread.

### Métricas D0.7 (golden thread)

| Métrica | Valor | Interpretação |
|---|---|---|
| Requirements canônicos esperados | 77 | Baseline REQ-ONB-001..077 |
| Requirements mapeados / únicos | 77 / 77 | Sem duplicidade |
| Requirements faltantes | 0 | — |
| Linhas NOT_RELEASED | 77 | Impede inferência de release |
| Linhas NOT_PRODUCTION_VERIFIED | 77 | Impede inferência de produção |
| Applicability / SEM_ID / Evidence Expected / Evidence Observed / Gate ausentes | 0 em todos | Explicitude completa |
| TRACEABLE_DOCUMENTAL / TRACEABLE_PARTIAL | 1 / 76 | — |
| **Gate D0.7** | **PASS** | PASS = cobertura/unicidade/explicitude; NÃO significa produto implementado |

### Métricas D0.9 (gaps)

| Métrica | Valor |
|---|---|
| Gaps registrados | 48 |
| Gaps sem owner / sem gate / sem resolução / sem disposição | 0 / 0 / 0 / 0 |
| Gaps CLOSED | 1 |
| Gaps OPEN | 46 |
| Gaps com decisão requerida | 0 |
| **Gate de completude D0.9** | **PASS** (disposição completa; NÃO significa gaps resolvidos) |

### Checkpoint DG-00 (D0.10)

DG-00.1 Inventário/Authority — PASS; DG-00.2 Classificação/Canonicalização/Reconciliação interna — PASS; DG-00.3 Reconciliação com realidade técnica — PASS; DG-00.4 Normalização semântica — PASS; DG-00.5 Golden thread 77/77 — PASS; DG-00.6 Conditional-by-Design + Tenant/Channel/White-label — PASS; DG-00.7 Audit/Evidence/Export — PASS; DG-00.8 Compliance/Regulatory/CCS condicional — PASS; DG-00.9 Gap/Decision Closure — PASS; DG-00.10 No false release/production claims — PASS; DG-00.11 Freeze técnico preservado — PASS; DG-00.12 Próxima fase corretamente limitada — PASS. **DG-00 RESULT: PASS_WITH_OPEN_TECHNICAL_GAPS** (corpus coerente para D1; código permanece congelado).

### Métricas D2 (cross-review)

| Métrica | Valor |
|---|---|
| Source IDs registrados / únicos | 69 / 69 |
| ADRs registrados / únicos | 35 / 35 (baseline esperado "ADR-001..034") |
| ADRs não CANONICAL | 0 |
| Requirements registrados / únicos | 77 / 77 |
| Capabilities registradas / únicas | 22 / 22 |
| Screen IDs registrados / únicos | 80 / 80 |
| Handoffs registrados / únicos | 10 / 10 (HOF-001..010) |
| Naturezas BR registradas / únicas | 12 / 12 (3 não reguladas + 9 reguladas) |
| SEM IDs registrados / únicos | 91 / 91 (SEM-001..091) |
| Gap IDs registrados / únicos | 48 / 48 |
| Gaps sem disposition / owner / gate | 0 / 0 / 0 |
| Golden thread D0.7 | PASS |
| Linhas NOT_RELEASED / NOT_PRODUCTION_VERIFIED | 77 / 77 |
| **Gate estrutural D2** | **FAIL** — na célula da fonte: "PASS = unicidade/cobertura/disposição/anti-overclaim estruturais; ainda requer revisão qualitativa antes de fechar D2" |

> ⚠️ [LACUNA NA FONTE] A célula "Gate estrutural D2" registra FAIL nesta aba, enquanto WAVES_TASKS/GATES/EVIDENCE registram D2 Cross-review PASS (EVD-ONB-019). A planilha não explica a divergência; preservada como está.

---

## NATURES_BR

Registry vivo canônico de naturezas brasileiras — 12 linhas (3 não reguladas + 9 reguladas). Todas com DOCUMENT_STATUS **CANONICAL**, TECHNICAL_STATE **PARTIAL**, fonte de implementação packages/catalogo/src/br/naturezas.ts @ main ed3f53fe.

| NATURE_ID | Chave | Rótulo | Classificação | Regulador primário | Risco de terceiro | UAT Gate |
|---|---|---|---|---|---|---|
| NAT-BR-PF | pf | Pessoa Física | NON_REGULATED | — | 0 | N/A |
| NAT-BR-PJ | pj | Pessoa Jurídica | NON_REGULATED | — | 0 | N/A |
| NAT-BR-MEI | mei | Microempreendedor Individual | NON_REGULATED | — | 0 | N/A |
| NAT-BR-REG-01 | gestora_de_recursos | Gestora de recursos | REGULATED | CVM | 0 | H-14 family |
| NAT-BR-REG-02 | administrador_fiduciario | Administrador fiduciário | REGULATED | CVM | 0 | H-14 family |
| NAT-BR-REG-03 | assessoria_de_investimentos | Escritório de assessores de investimento | REGULATED | CVM | 1 | H-14 family |
| NAT-BR-REG-04 | ctvm | CTVM | REGULATED | BCB | 1 | H-14 family |
| NAT-BR-REG-05 | dtvm | DTVM | REGULATED | BCB | 1 | H-14 family |
| NAT-BR-REG-06 | corretora_de_cambio | Corretora de câmbio | REGULATED | BCB | 1 | H-14 family |
| NAT-BR-REG-07 | instituicao_de_pagamento | Instituição de Pagamento | REGULATED | BCB | 1 | H-14 family |
| NAT-BR-REG-08 | scd | SCD | REGULATED | BCB | 1 | H-14 family |
| NAT-BR-REG-09 | correspondente_bancario | Correspondente bancário | REGULATED | BCB | 1 | H-14 |

Nota: correspondente_bancario é a 9ª natureza regulada aprovada por D-019/ADR-032; UAT H-14 permanece NOT_RUN.

---

## READINESS

Registry vivo de assessments de readiness por capability — 1 registro.

**RDY-CAP19-001** (CAP-19 / TASK-W0-033):

| Campo | Valor |
|---|---|
| ASSESSMENT_STATE | BLOCKED_NOT_READY |
| TECHNICAL_STATE | PARTIAL |
| Owner | Architecture/Product/Security/Engineering |
| Baseline | SRC-050/051/052/053; EVD-ONB-021/022/023/025/026; ADR-006/023/030/033/034 |
| Blocking gaps | GAP-ONB-009; GAP-ONB-010; GAP-ONB-011; GAP-ONB-041; ADR-034 (blocker operacional) |
| Restriction gaps | GAP-ONB-019; GAP-ONB-023; GAP-ONB-042 |
| Gate | G1; H-04; H-06; DG-01 já PASS documental |
| CODE_WRITE_ALLOWED | NO — ADR-034 |

Requisitos de segurança/auth (condensado): sessão server-authoritative; deny-by-default; actor/user_id real em mutações; RBAC/ABAC por capability/scope; SoD maker-checker; self-approval negado/auditado; tenant resolution fail-closed. Requisitos tenant/channel: tenant_id e channel_id como dimensões distintas; Channel/ChannelBinding versionados; sem TENANT_DEV; propagação por UI/API/event/evidence/audit/telemetry; cross-tenant/cross-channel negados; white-label não altera risk/compliance/auth/audit.

Acceptance criteria AC1..AC7 (condensado): actor autenticado e tenant fail-closed; nenhum tenant hardcoded; SoD bloqueia self-approval E2E; channel context propagado/autorizado; branding/config versionados sem mudança semântica; negative authz cobre cross-tenant/cross-channel/IDOR/BOLA; mutações materiais geram audit/evidence com actor/authority/correlation.

Próxima ação permitida enquanto ADR-034 vigorar: especificação, revisão read-only, procurement e preparação de testes/evidências. Após autorização explícita: executar a menor fatia IAM+tenant, depois SoD, channel, white-label e hardening, sempre com Evidence Observed e gates. G1 inclui blocker separado GAP-004 (CNPJ alfanumérico E2E).

---

## MOVEMENT_LOG

Log de movimentação documental — **19 registros**, todos de 2026-08-09, todos com resultado **PASS** e File ID preservado. Padrão do conteúdo: colunas Data, File ID, Documento, Origem, Destino, Ação (MOVE; 1 caso RENAME+MOVE), Status conteúdo (UNIQUE/CANONICAL, UNIQUE/PROPOSED ou UNIQUE), Motivo, Resultado.

Movimentos por categoria:
- Documento-mãe BENCHMARK v1.1 → 00_START_HERE_E_GOVERNANCA (posicionar na governança).
- Mapa de Mercado/ICPs → 11_MERCADO_SEGMENTOS_E_PACKS.
- ONB-EXE-001..013 (planos W1..W9) → 04_ARQUITETURA.../90_EXECUCAO_E_READINESS_W1_W9 (separar execução/readiness de arquitetura normativa).
- ONB-SEC-001, ONB-QA-006 (RENAME+MOVE para eliminar colisão com ONB-QA-004) e ONB-QA-005 → 07_QA.../90_EXECUCAO_E_READINESS_QA.

---

## REQUIREMENTS

Registry vivo — 77 requisitos (REQ-ONB-001..077), todos com Status **CANONICAL**.

| Requirement ID | Tipo | Título | Descrição (condensada) | Fonte | Prio | Owner role | Capabilities | Gate |
|---|---|---|---|---|---|---|---|---|
| REQ-ONB-001 | Governança | Raiz documental única | Somente a pasta Mutual Onboarding e subpastas hospedam artefatos canônicos | User decision | P0 | Program Owner | — | G0 |
| REQ-ONB-002 | Arquitetura | Separação de domínio | Onboarding permanece produto/repositório separado do Backoffice; integra por contratos, IDs e eventos | PLAN-v1.1 | P0 | Architecture Owner | — | G0 |
| REQ-ONB-003 | Lifecycle | Case ID único | Todo onboarding possui ID interno único e correlação com entity/customer/CRM quando aplicável | domain-onboarding | P0 | Architecture Owner | CAP-16 | G1 |
| REQ-ONB-004 | Lifecycle | Estado server-authoritative | Estado explícito, persistido e controlado no servidor | domain-onboarding | P0 | Engineering Owner | CAP-16 | G1 |
| REQ-ONB-005 | Documentos | Evidência documental | Documento guarda metadata, versão, origem, integridade e retenção | domain-onboarding | P0 | Data/Security Owner | CAP-02,CAP-20 | G2 |
| REQ-ONB-006 | Compliance | Decisão auditável | Toda decisão material de compliance auditável e replayable quando aplicável | domain-onboarding | P0 | Compliance Owner | CAP-16,CAP-20 | G5 |
| REQ-ONB-007 | Governança | Maker-checker | Override crítico exige motivo, evidência e aprovação independente | domain-onboarding | P0 | Compliance Owner | CAP-15,CAP-16 | G5 |
| REQ-ONB-008 | Providers | Provider não é source of truth | Nenhum provider externo pode ser fonte única da verdade do caso | domain-onboarding | P0 | Architecture Owner | CAP-01..CAP-14 | G3 |
| REQ-ONB-009 | Privacidade | Minimização de PII | PII minimizada, classificada, mascarada e protegida por acesso | domain-onboarding | P0 | Security/Data Owner | CAP-20 | G6 |
| REQ-ONB-010 | Handoff | Aprovação não autoriza finanças | Aprovação do onboarding não libera automaticamente execução financeira | domain-onboarding | P0 | Compliance/Architecture | CAP-16 | G8 |
| REQ-ONB-011 | Handoff | Preservação de IDs | Handoff preserva IDs, estado, decisão e evidência | domain-onboarding | P0 | Architecture Owner | CAP-20 | G8 |
| REQ-ONB-012 | Produto | Multi-tenant | Isolamento estrutural por tenant, com falha segura sem tenant | PLAN-v1.1 | P0 | Security/Engineering | CAP-19,CAP-20 | G1 |
| REQ-ONB-013 | Produto | White-label | Brand, domínio, idioma e comunicação configuráveis por tenant sem fork | PLAN-v1.1 | P1 | Product Owner | CAP-19 | G7 |
| REQ-ONB-014 | Developer | API-first | API pública versionada, webhooks assinados e SDK/hosted flow | PLAN-v1.1 | P0 | Architecture Owner | CAP-18 | G7 |
| REQ-ONB-015 | Providers | Capability contract | Fluxos e regras chamam capability, nunca marca de provider | PLAN-v1.1 | P0 | Architecture Owner | CAP-01..CAP-14 | G3 |
| REQ-ONB-016 | Providers | EvidenceEnvelope | Toda resposta externa normalizada em envelope de evidência versionado | PLAN-v1.1 | P0 | Architecture/Data | CAP-20 | G3 |
| REQ-ONB-017 | Providers | Routing auditável | Roteamento considera tenant, região, jurisdição, qualidade, custo, contrato, disponibilidade e grupo econômico | PLAN-v1.1 | P0 | Architecture Owner | CAP-18 | G3 |
| REQ-ONB-018 | Providers | Fallback seguro | Fallback nunca significa aprovar sem evidência; rota real ou degraded mode governado | PLAN-v1.1 | P0 | Architecture/Compliance | CAP-18 | G3 |
| REQ-ONB-019 | Brasil | CNPJ alfanumérico | Suporte E2E em domínio, persistência, busca, UI, APIs, adapters, export e testes | PLAN-v1.1 | P0 | Engineering Owner | CAP-06 | G1 |
| REQ-ONB-020 | Brasil | Fontes oficiais | SERPRO/RFB/BCB público entram por capability e proveniência oficial | PLAN-v1.1 | P0 | Compliance/Architecture | CAP-01,06,13 | G4 |
| REQ-ONB-021 | Brasil | Canais condicionados | SCR/CCS/Open Finance somente com elegibilidade, base jurídica e consentimento aplicável | PLAN-v1.1 | P0 | Legal/Compliance | CAP-12,CAP-13 | G4 |
| REQ-ONB-022 | AML | Screening | Sanções, PEP, watchlists, adverse media e listas customizadas com disambiguation | PLAN-v1.1 | P0 | Compliance Owner | CAP-08,CAP-09 | G5 |
| REQ-ONB-023 | AML | Discard memory | Descartes de falso positivo preservam razão/evidência para rescreening e auditoria | PLAN-v1.1 | P0 | Compliance Owner | CAP-08,CAP-20 | G5 |
| REQ-ONB-024 | Due diligence | Judicial e fiscal | Pesquisa judicial/criminal, regularidade fiscal e certificados por capability | PLAN-v1.1 | P1 | Compliance Owner | CAP-10,CAP-11 | G6 |
| REQ-ONB-025 | Risco | Vetor explicável | Risco como vetor/dimensões explicáveis; não depender só de score opaco | PLAN-v1.1 | P0 | Risk Owner | CAP-15,CAP-16 | G5 |
| REQ-ONB-026 | Regras | Separar requirement/flow/policy | Objetos separados, versionados e replayable | PLAN-v1.1 | P0 | Product/Architecture | CAP-15 | G2 |
| REQ-ONB-027 | Regras | Simulação pré-publicação | Mudanças de política/fluxo/produto permitem simulação e maker-checker | PLAN-v1.1 | P0 | Product/Compliance | CAP-15 | G7 |
| REQ-ONB-028 | Jornada | Delegação | Convite e jornada delegada para sócios/UBOs/representantes com progresso agregado | PLAN-v1.1 | P1 | Product Owner | CAP-07,CAP-16 | G2 |
| REQ-ONB-029 | Jornada | Recuperação | Recuperação/assistência sem quebrar integridade do case | PLAN-v1.1 | P1 | Product/Support | CAP-16 | G2 |
| REQ-ONB-030 | Contestação | Revisão humana | Contestação de decisão aplicável com fila humana auditável | PLAN-v1.1 | P0 | Compliance/Product | CAP-16,CAP-20 | G5 |
| REQ-ONB-031 | Monitoramento | Revalidação | Revalidação, expiração documental, rescreening e reopen idempotentes | PLAN-v1.1 | P0 | Compliance/Engineering | CAP-17 | G8 |
| REQ-ONB-032 | Fraude | Device/session | Sinais de device, sessão, spoof/deepfake quando aplicável | PLAN-v1.1 | P1 | Fraud/Security | CAP-03,CAP-04 | G3 |
| REQ-ONB-033 | Biometria | Minimização biométrica | Evitar retenção de imagem biométrica desnecessária; privilegiar edge/representação segura | PLAN-v1.1 | P0 | Security/Privacy | CAP-03,CAP-20 | G6 |
| REQ-ONB-034 | HFS | CAP-22 interna | HFS/Mutual Intelligence é ativo proprietário e capability interna versionada | User decision + PLAN-v1.1 | P0 | Model Governance | CAP-22 | G5 |
| REQ-ONB-035 | HFS | Black-box boundary | Core recebe sinais/evidências HFS sem expor metodologia, features, pesos ou limiares | PLAN-v1.1 | P0 | Architecture/Model Gov | CAP-22 | G5 |
| REQ-ONB-036 | HFS | Governança de modelo | Versionamento, validação, drift, observabilidade, kill switch e degraded mode para CAP-22 | PLAN-v1.1 | P0 | Model Governance | CAP-22 | G6 |
| REQ-ONB-037 | Concentração | Economic group | Provider Registry registra grupo econômico; Serasa/idwall não contam como fallback independente | PLAN-v1.1 | P0 | Procurement/Architecture | CAP-18 | G3 |
| REQ-ONB-038 | Escopo | KYT fora do core | KYT, Travel Rule, Pix e execução financeira fora do core; somente handoffs/contratos | PLAN-v1.1 | P0 | Architecture Owner | — | G0 |
| REQ-ONB-039 | QA | CI evidenciada | Nenhum commit/claim textual substitui evidência real de CI para release | PLAN-v1.1 | P0 | QA/Engineering | — | G9 |
| REQ-ONB-040 | QA | Homologação por tela | Cada uma das 80 funções de tela com estados, permissões, dados, ACs e testes | PLAN-v1.1 | P0 | Product/QA | — | G7 |
| REQ-ONB-041 | QA | Segurança | Pentest/security review sem Critical/High não aceito antes de release, salvo waiver formal | PLAN-v1.1 | P0 | Security Owner | — | G9 |
| REQ-ONB-042 | Operação | Runbooks | Incidente, provider outage, data request, replay, rollback, kill switch e suporte com runbook executável | PLAN-v1.1 | P0 | SRE/Support | — | G9 |
| REQ-ONB-043 | UAT | Mutual cliente nº1 | UAT Mutual nos fluxos PF/PJ/MEI e naturezas aprovadas antes do piloto | PLAN-v1.1 | P0 | Business/QA | — | G10 |
| REQ-ONB-044 | Release | Dossiê de release | Release precisa ADRs, schemas, versões, testes, exceções, owners e decisão de gate | PLAN-v1.1 | P0 | Release Owner | — | G10 |
| REQ-ONB-045 | Dados | Criptografia/retention | Dados sensíveis com classificação, criptografia, retenção e deleção/crypto-shredding | PLAN-v1.1 | P0 | Security/Data | CAP-20 | G6 |
| REQ-ONB-046 | Observabilidade | Provider health | Métricas de disponibilidade, latência, erro, custo e qualidade por capability/provider | PLAN-v1.1 | P1 | SRE/Product | CAP-21 | G8 |
| REQ-ONB-047 | Analytics | Conversão e dropoff | Conversão, abandono, tempo por etapa e impacto de regras sem expor PII | PLAN-v1.1 | P1 | Product/Data | CAP-21 | G8 |
| REQ-ONB-048 | Mercado | Packs configuráveis | Múltiplos segmentos via packs de requirements/policies/flows, sem forks por setor | Market Map v1.0 | P1 | Product Owner | CAP-15,CAP-19 | G7 |
| REQ-ONB-049 | Internacional | Jurisdição agnóstica | Brasil primeiro, mantendo arquitetura de jurisdição/identificadores/fontes configurável | PLAN-v1.1 | P1 | Product/Architecture | CAP-19 | G7 |
| REQ-ONB-050 | Segurança | Segregação por banco | Tenant isolation também em DB/invariantes, não apenas na aplicação | PLAN-v1.1 | P0 | Security/DB Owner | CAP-19,CAP-20 | G1 |
| REQ-ONB-051 | Internacional | Arquitetura global desde a fundação | Atender Brasil e clientes internacionais desde a arquitetura-base, sem fork por país | User decision 2026-08-08 | P0 | Program/Product/Architecture | CAP-01..CAP-22 | G0 |
| REQ-ONB-052 | Internacional | Identificadores e documentos internacionais | Identificadores, documentos, endereços, telefones, registros e UBOs extensíveis por país, sem hardcode CPF/CNPJ | Derived from REQ-ONB-051 | P0 | Architecture/Data Owner | CAP-01,02,05,06,07 | G1 |
| REQ-ONB-053 | Internacional | i18n, locale e timezone | Idiomas, locale, timezone, formatos e comunicações configuráveis por tenant e jornada | Derived from REQ-ONB-051 | P0 | Product/Engineering | CAP-19 | G2 |
| REQ-ONB-054 | Internacional | Privacy e data residency por jurisdição | Classificação, base de tratamento, retenção, transferências, residência e deleção configuráveis e evidenciáveis | Derived from REQ-ONB-051 | P0 | Legal/Privacy/Security | CAP-20 | G6 |
| REQ-ONB-055 | Internacional | Provider routing por jurisdição | Registry/Routing considera cobertura por país, documentos, fontes, residência, contrato, qualidade, custo, economic_group e degraded mode | Derived from REQ-ONB-051 | P0 | Architecture/Procurement | CAP-18,CAP-20 | G3 |
| REQ-ONB-056 | Internacional | Jurisdiction Policy Packs | Requisitos, flows, policies, documentos, consentimentos, thresholds e periodicidade por overlays/packs versionados | Derived from REQ-ONB-051 | P0 | Product/Compliance/Legal | CAP-15,CAP-19 | G7 |
| REQ-ONB-057 | Internacional | AML global e listas por jurisdição | Screening global e local com provenance, data, versão e disambiguation | Derived from REQ-ONB-051 | P0 | Compliance Owner | CAP-08,09,17 | G5 |
| REQ-ONB-058 | Internacional | Provisionamento regional e soberania de tenant | Tenant com região/jurisdição operacional, residency, provider routes e features compatíveis com contrato/mercado | Derived from REQ-ONB-051 | P0 | Architecture/Security/SRE | CAP-19,20,21 | G1 |
| REQ-ONB-059 | Governança | Repositório GitHub exclusivo do produto | Todo código/schema/migration/teste/CI/ADR técnico/evidência versionável reside exclusivamente em Mutual-Processadora-de-Pagamentos/onboarding-corporativo | User decision 2026-08-08 + GitHub verified | P0 | Program/Architecture/Engineering | CAP-01..CAP-22 | G0 |
| REQ-ONB-060 | Observabilidade | Catálogo canônico de status | Todo status de domínio possui ID estável, dono, transições legais, evento associado e classificação de exposição | User decision 2026-08-09 | P0 | Architecture/Product | CAP-16,20,21 | G2 |
| REQ-ONB-061 | Developer | Taxonomia e registry de eventos | Todo evento segue nomenclatura versionada, envelope obrigatório, outbox, idempotência, DLQ e delivery log | User decision 2026-08-09 | P0 | Architecture Owner | CAP-18,20,21 | G7 |
| REQ-ONB-062 | Developer | Status e evento por API | Status/evento canônico consultável por API versionada e publicado por webhook assinado, salvo INTERNAL_ONLY justificado | User decision 2026-08-09 | P0 | Architecture Owner | CAP-18 | G7 |
| REQ-ONB-063 | Regulatório | Compliance-by-design aplicável | Cumprir, demonstrar e auditar obrigações formalmente aplicáveis por tenant/entidade/produto/jurisdição, com regras versionadas e evidências | User decision 2026-08-09 + SRC-038 | P0 | Compliance/Legal/Product/Architecture | CAP-01..CAP-22 | G0/G5/G6/G7 |
| REQ-ONB-064 | Regulatório | Regulatory Pack versionado | Obrigações, campos, declarações, documentos, consentimentos, controles, reportes e retenção modelados por packs versionados, não hardcoded no frontend | User decision 2026-08-09 + SRC-038 | P0 | Compliance/Legal/Product | CAP-14,15,19,20 | G2/G5/G6/G7 |
| REQ-ONB-065 | Auditoria | Trilha regulatória append-only | Todo fato material (lifecycle regulatório, operacional, segurança, configuração, decisão, acesso privilegiado, handoff, exportação, reporte) produz trilha append-only, íntegra, versionada, correlacionável e reproduzível, com actor/authority, tenant_id/channel_id, interaction_source, timestamps, reason/evidence refs e versões efetivas; consultável (…) | User decision 2026-08-09 + SRC-040 | P0 | Architecture/Security/Compliance | CAP-16,20,21 | G2/G5/G9 |
| REQ-ONB-066 | Regulatório | CCS quando aplicável | Para tenant/entidade sujeita ao CCS: gerar, validar, transmitir/reconciliar ou prover integração para arquivos/mensagens CCS conforme leiautes oficiais BCB, preservando evidência de cada ciclo | User decision 2026-08-09 + BCB CCS + SRC-041 | P0 | Compliance/Architecture/Engineering | CAP-18,CAP-20 | G4/G7/G9 |
| REQ-ONB-067 | Regulatório | Declarações dinâmicas versionadas | Perguntas/declarações dirigidas por catálogo versionado com trigger, escopo, fonte normativa, vigência, evidência, sensibilidade e revalidação; frontend não é fonte da regra | User decision 2026-08-09 + SRC-039 | P0 | Product/Compliance/Legal | CAP-14,15,19,20 | G2/G5/G7 |
| REQ-ONB-068 | Regulatório | Mudança normativa e bloqueio de release | Alteração normativa atualiza catálogo/pack, testes e evidências; obrigação aplicável não implementada bloqueia homologação/release do escopo afetado | User decision 2026-08-09 + SRC-038 + SRC-043 | P0 | Compliance/Legal/QA/Release | CAP-15,20,21 | G7/G9/G10 |
| REQ-ONB-069 | Arquitetura | Tenant e canal como dimensões de primeira classe | Associações independentes ou hierárquicas/configuradas entre tenant, canal, marca/domínio e jornada; APIs, eventos, sessões, evidências, auditoria e permissões transportam/resolvem ambos os contextos (…) | User decision 2026-08-09 | P0 | Architecture/Product/Security | CAP-18,19,20,21 | G1/G7/G9 |
| REQ-ONB-070 | Relacionamentos | Papéis econômicos de participantes e beneficiários | Subject/LegalEntity/Relationship suportam papéis econômicos versionados (merchant, seller, affiliate, referrer, beneficiários, correspondent, agent) sem enum rígido | User decision 2026-08-09 + SRC-047 | P0 | Product/Architecture/Compliance | CAP-07,14,15,16,19,20 | G2/G7/G9 |
| REQ-ONB-071 | Relacionamentos/Referral | Rastreabilidade de afiliado, referral e atribuição | Preservar relationship_id canônico, referral/correlation IDs, origem/sponsor, vigência, contract reference, eligibility/restrictions e evidence refs; regras comerciais ficam no domínio Partner/Commercial | User decision 2026-08-09 + SRC-047 | P0 | Product/Architecture | CAP-07,16,18,20 | G2/G7/G9 |
| REQ-ONB-072 | Arquitetura/Financeiro | Separação semântica de split, fee share, revenue share e comissão/remuneração | Conceitos distintos com source of truth, regra, lifecycle, eventos e reconciliação próprios; Onboarding não calcula/lança/liquida/mantém saldo | User decision 2026-08-09 + SRC-047 | P0 | Architecture/Product/Finance | CAP-07,16,18,20 | G0/G7/G9 |
| REQ-ONB-073 | Integrações | Handoff de elegibilidade para domínios econômicos | Handoffs transportam schema version, tenant/channel context, IDs canônicos, papel econômico, status, restrictions, jurisdiction, correlation/referral IDs, evidence refs e policy versions, sem autorizar operação financeira | User decision 2026-08-09 + SRC-047 | P0 | Architecture/Product/Compliance | CAP-16,18,19,20 | G7/G9 |
| REQ-ONB-074 | Monitoramento | Feedback econômico downstream sem mutação direta do case | Eventos downstream (fraude, chargeback/MED, suspensão, clawback) geram signal/review/revalidation por contrato; nunca reescrevem o case; correlacionados/auditados | User decision 2026-08-09 + SRC-047 | P0 | Compliance/Architecture/Product | CAP-17,18,20,21 | G7/G8/G9 |
| REQ-ONB-075 | Auditoria | Correlação da trilha até eventos econômicos downstream | Golden thread reconstrói participante/vínculo → elegibilidade/restrição → handoff → evento downstream → revalidação, correlacionando IDs sem replicar PII | User decision 2026-08-09 + SRC-047 | P0 | Architecture/Data/Compliance | CAP-18,20,21 | G7/G9 |
| REQ-ONB-076 | Arquitetura/Governança | Conditional-by-Design transversal | Todo requisito, capability, tela, provider, declaração, evento, reporte, integração ou handoff declara aplicabilidade (CORE_MANDATORY, CONDITIONAL, APPLICABLE, NOT_APPLICABLE, PROHIBITED, REVIEW_REQUIRED); decisão server-authoritative, versionada, reproduzível e auditável | User decision 2026-08-09 | P0 | Architecture/Product/Compliance/Governance | CAP-01..CAP-22 | G0/G2/G7/G9 |
| REQ-ONB-077 | Compliance/Consentimento | Termos, consentimentos, declarações e assinaturas como evidência versionada | Preservar documento/modelo/código/versão/hash, subject e actor/capacidade, tenant/channel independentes, locale/jurisdição, finalidade/base jurídica, presented_at/accepted_at, sessão/IP/device conforme risco, correlation/evidence refs e lifecycle de revogação (…) | SRC-001 + REQ-ONB-064/067/076 + SRC-039/040 + D2 finding 2026-08-09 | P0 | Compliance/Legal/Product/Security | CAP-14,19,20 | G2/G5/G6/G7 |

---

## CAPABILITIES

22 capabilities (CAP-01..22), todas com Decisão **CANONICAL**, eixos Multi-tenant **MANDATORY_ISOLATION**, Multi-channel **MANDATORY_CONTEXT**, White-label **CONFIG_ONLY_NO_SEMANTIC_FORK**. Delivery status: DISCOVERED em todas, exceto CAP-19 (**BLOCKED**). D2 Technical State: 16 PARTIAL, 6 NOT_EVIDENCED.

| Capability ID | Nome | Prio | Delivery | Owner role | Dependências | Gate | D2 Technical State | D2 Evidence (condensada) |
|---|---|---|---|---|---|---|---|---|
| CAP-01 | Identidade biográfica/cadastral | P0 | DISCOVERED | Product/Identity/Engineering | CAP-19,20 | G3 | PARTIAL | sujeito.ts + esquema.ts + jornada declarativa; verificação externa completa não evidenciada |
| CAP-02 | Documento: captura/OCR/autenticidade/MRZ/QR/validade | P0 | DISCOVERED | Identity/Data/Security | CAP-01,19,20 | G3 | PARTIAL | metadados/documentos e B7/dossiê existem; captura, object storage, OCR e provider real não evidenciados |
| CAP-03 | Biometria/facematch/liveness/spoof/deepfake | P0 | DISCOVERED | Identity/Fraud/Security | CAP-01,19,20 | G3 | NOT_EVIDENCED | prova_de_vida existe como contrato; execução biométrica/provider real não evidenciada |
| CAP-04 | Device/session intelligence e sinais de fraude | P1 | DISCOVERED | Fraud/Security | CAP-19,20 | G3 | NOT_EVIDENCED | nenhum módulo dedicado observado no baseline main |
| CAP-05 | Telefone/e-mail/endereço/geolocalização/prova de endereço | P1 | DISCOVERED | Product/Identity | CAP-01,19,20 | G2/G3 | PARTIAL | capacidade endereco e evidência declarativa existem; validações por canal incompletas |
| CAP-06 | KYB: registro/status/QSA | P0 | DISCOVERED | KYB/Compliance/Engineering | CAP-01,19,20 | G4 | PARTIAL | entidade/habilitações/naturezas e contratos registro_empresarial/quadro_societario existem; adapter/fonte oficial real não evidenciado |
| CAP-07 | Grafo societário, UBOs, representantes e terceiros | P0 | DISCOVERED | KYB/Compliance/Data | CAP-01,06,20 | G2/G4 | PARTIAL | grafo.ts implementa relacionamentos e UBO determinístico; rede de terceiros completa ainda não |
| CAP-08 | Sanções/PEP/watchlists | P0 | DISCOVERED | Compliance/AML | CAP-01,07,19,20 | G5 | PARTIAL | triagem.ts modela listas/PEP, hit, julgamento humano e memória de descarte; fontes reais não evidenciadas |
| CAP-09 | Adverse media/listas customizadas | P0 | DISCOVERED | Compliance/AML | CAP-01,07,19,20 | G5 | PARTIAL | triagem.ts contempla mídia adversa e lista interna; coleta externa não evidenciada |
| CAP-10 | Judicial/criminal/mandados | P1 | DISCOVERED | Compliance/Legal | CAP-01,07,19,20 | G6 | PARTIAL | risco_judicial existe em contrato/triagem; consulta por fonte real e tela B9 não evidenciadas |
| CAP-11 | Regularidade fiscal/certificados | P1 | DISCOVERED | Compliance/Legal | CAP-06,07,19,20 | G6 | PARTIAL | regularidade_fiscal no Capability Contract; B10 rota parcial; fonte/certificados reais não evidenciados |
| CAP-12 | Crédito/capacidade econômica/origem de recursos/patrimônio | P1 | DISCOVERED | Compliance/Risk | CAP-01,06,07,19,20 | G5/G6 | NOT_EVIDENCED | risco.ts tem eixo financeiro; capacidade econômica operacional não evidenciada |
| CAP-13 | Licenças e autorizações regulatórias | P1 | DISCOVERED | Compliance/Legal | CAP-06,07,19,20 | G4/G6 | PARTIAL | habilitações regulatórias e catálogo de naturezas existem; consulta a reguladores e B21 não evidenciadas |
| CAP-14 | Termos/declarações/assinatura/evidência de aceite | P0 | DISCOVERED | Product/Compliance/Legal | CAP-15,19,20 | G2/G7 | NOT_EVIDENCED | evidence genérica existe; módulo completo versionado não evidenciado |
| CAP-15 | Requirements/flow/policy builder + simulação | P0 | DISCOVERED | Product/Architecture/Compliance | CAP-19,20 | G2/G7 | PARTIAL | requisito/fluxo/produto versionados, motor de política e rotas de console existem; editors/simulação/publicação parciais |
| CAP-16 | Case management/investigação/EDD/decisão | P0 | DISCOVERED | Product/Compliance/Engineering | CAP-15,19,20 | G2/G5 | PARTIAL | caso/decisão/pedido/EDD e rotas do painel existem; lifecycle completo, investigação e SoD E2E não fechados |
| CAP-17 | Revalidação/expiração/rescreening/monitoramento | P0 | DISCOVERED | Compliance/Engineering | CAP-16,20,21 | G8 | PARTIAL | svc-trabalhadores verifica vencimento, reavalia idempotente e reabre caso; rescreening completo não evidenciado |
| CAP-18 | API/webhooks/SDK/hosted flow/sandbox/logs | P0 | DISCOVERED | Architecture/Product/Engineering | CAP-16,19,20,21 | G7 | NOT_EVIDENCED | nenhuma Developer Platform pública completa evidenciada no main |
| CAP-19 | Multi-tenant/multicanal/white-label/idioma/domínio/região | P0 | **BLOCKED** | Architecture/Product/Security/Engineering | Foundation; CAP-20 cross-cutting | G1 | PARTIAL | RLS/FORCE RLS e tenant model reais; TENANT_DEV permanece em app paths; Canal não modelado como contexto de primeira classe. RDY-CAP19-001: BLOCKED_NOT_READY; bloqueios GAP-009/010/011/041 + ADR-034; restrições GAP-019/023/042 |
| CAP-20 | Evidence/audit/lineage/retention/privacy/human review | P0 | DISCOVERED | Security/Data/Compliance | CAP-19 | G1/G6/G9 | PARTIAL | evidência/audit append-only, cifra AES-GCM, cadeia de custódia, dossiê e decisão humana existem; retention/KMS/exports parciais |
| CAP-21 | Analytics/conversão/latência/custo/provider health/qualidade | P1 | DISCOVERED | Data/SRE/Product | CAP-20 | G8/G9 | PARTIAL | verificações persistem duração/custo; provider health, SLIs/SLOs e analytics completos não evidenciados |
| CAP-22 | Inteligência relacional proprietária Mutual/HFS | P0 | DISCOVERED | Model Governance/Engineering | CAP-16,19,20,21 | G5 | NOT_EVIDENCED | nenhuma implementação HFS localizada no main; ownership/contrato apenas documentais |

---

## SCREENS

Screen Registry — 80 funções de tela (A1..A20, B1..B22, C1..C24, D1..D14), todas com Registry status **CANONICAL**. Implementação (main ed3f53fe): 31 PARTIAL, 35 NOT_EVIDENCED, 14 ABSENT. Colunas Estados/Permissões/Acceptance-Test IDs estão vazias na fonte (mantidas no ONB-UX-002).

### Superfície A — Jornada (A1..A20)

| Screen ID | Função | Implementação | Capabilities | Route/View |
|---|---|---|---|---|
| A1 | Entrada/convite | PARTIAL | — | web-jornada / |
| A2 | Identificação da natureza | NOT_EVIDENCED | — | — |
| A3 | Jurisdição | NOT_EVIDENCED | — | — |
| A4 | Etapas dinâmicas | PARTIAL | — | web-jornada /caso/[id] — passos dinâmicos/pendências |
| A5 | Liveness | NOT_EVIDENCED | CAP-03 | — |
| A6 | Captura de documento | NOT_EVIDENCED | CAP-02 | — |
| A7 | Endereço | NOT_EVIDENCED | — | — |
| A8 | Grafo societário | PARTIAL | CAP-07 | web-jornada /caso/[id] — resumo societário |
| A9 | Pessoas-chave | PARTIAL | CAP-07 | web-jornada /caso/[id] + /caso/[id]/grupo |
| A10 | Rede de terceiros | NOT_EVIDENCED | CAP-07 | — |
| A11 | Documentos societários | NOT_EVIDENCED | — | — |
| A12 | Termos/assinatura | NOT_EVIDENCED | CAP-14 | — |
| A13 | Revisão/envio | PARTIAL | — | web-jornada /caso/[id] — avaliar/concluir parcial |
| A14 | Acompanhamento | PARTIAL | — | web-jornada /caso/[id] — progresso/decisão/pedido |
| A15 | Convite de pessoa-chave | PARTIAL | — | web-jornada /caso/[id]/grupo |
| A16 | Jornada individual delegada | PARTIAL | — | web-jornada /convite/[token] |
| A17 | Progresso do grupo | PARTIAL | — | web-jornada /caso/[id]/grupo |
| A18 | Contestação/revisão humana | NOT_EVIDENCED | CAP-16,CAP-20 | — |
| A19 | Recuperação/verificação assistida | NOT_EVIDENCED | — | — |
| A20 | Consentimentos/autorizações externas | NOT_EVIDENCED | CAP-20 | — |

### Superfície B — Analista (B1..B22)

| Screen ID | Função | Implementação | Capabilities | Route/View |
|---|---|---|---|---|
| B1 | Fila de casos | PARTIAL | — | web-painel /casos |
| B2 | Visão geral | PARTIAL | — | web-painel /casos/[id] |
| B3 | Evidências | PARTIAL | CAP-20 | web-painel /casos/[id]/evidencias |
| B4 | Grafo societário | PARTIAL | CAP-07 | web-painel /casos/[id]/societario |
| B5 | Pessoas-chave | PARTIAL | — | web-painel /casos/[id]/pessoas |
| B6 | Rede de terceiros | NOT_EVIDENCED | — | — |
| B7 | Documentos | PARTIAL | — | web-painel /casos/[id]/documentos |
| B8 | AML/disambiguation | PARTIAL | CAP-08,CAP-09 | web-painel /casos/[id]/triagem |
| B9 | Judicial/criminal | NOT_EVIDENCED | CAP-10 | — |
| B10 | Fiscal/certificados | PARTIAL | CAP-11 | web-painel /casos/[id]/fiscal |
| B11 | Trilha/acessos | PARTIAL | — | web-painel /casos/[id]/trilha |
| B12 | Decisão/alçada | PARTIAL | — | web-painel /casos/[id]/decisao |
| B13 | Pendências/complementos | PARTIAL | — | web-painel /casos/[id]/pendencias |
| B14 | Reavaliação/refresh | PARTIAL | CAP-17 | web-painel /reaberturas |
| B15 | Alertas de monitoramento | PARTIAL | CAP-17 | web-painel /alertas |
| B16 | Dossiê/export | PARTIAL | — | web-painel /casos/[id]/auditoria |
| B17 | Fila de contestação | NOT_EVIDENCED | — | — |
| B18 | Reconciliação entre fontes | NOT_EVIDENCED | CAP-20 | — |
| B19 | Fraude/device/session | NOT_EVIDENCED | CAP-04 | — |
| B20 | Capacidade econômica/origem de recursos | NOT_EVIDENCED | CAP-12 | — |
| B21 | Licenças/autorizações regulatórias | NOT_EVIDENCED | CAP-13 | — |
| B22 | Workspace investigativo | NOT_EVIDENCED | CAP-16,CAP-22 | — |

### Superfície C — Admin/Developer (C1..C24)

| Screen ID | Função | Implementação | Capabilities | Route/View |
|---|---|---|---|---|
| C1 | Dashboard | PARTIAL | — | web-console /painel |
| C2 | Requirements | PARTIAL | CAP-15 | web-console /requisitos |
| C3 | Editor de requirement | PARTIAL | CAP-15 | web-console /requisitos/[grupo] |
| C4 | Flows | PARTIAL | CAP-15 | web-console /fluxos |
| C5 | Editor de flow | PARTIAL | CAP-15 | web-console /fluxos/[grupo] |
| C6 | Policies | PARTIAL | CAP-15 | web-console /politicas |
| C7 | Editor de policy | NOT_EVIDENCED | CAP-15 | — |
| C8 | Simulação | NOT_EVIDENCED | CAP-15 | — |
| C9 | Publicação/versionamento | NOT_EVIDENCED | — | — |
| C10 | Providers/routing | NOT_EVIDENCED | CAP-18 | — |
| C11 | Custo/uso/margem | NOT_EVIDENCED | — | — |
| C12 | Marca/tema/idioma | NOT_EVIDENCED | — | — |
| C13 | Domínio/e-mail/canais | NOT_EVIDENCED | — | — |
| C14 | Usuários/papéis | NOT_EVIDENCED | — | — |
| C15 | Alçadas/segregação | NOT_EVIDENCED | — | — |
| C16 | API keys/webhooks | NOT_EVIDENCED | CAP-18 | — |
| C17 | Auditoria de configuração | NOT_EVIDENCED | — | — |
| C18 | Proteção de dados | NOT_EVIDENCED | CAP-20 | — |
| C19 | Produtos de verificação | PARTIAL | — | web-console /produtos |
| C20 | Editor de produto | PARTIAL | — | web-console /produtos/[grupo] |
| C21 | Simulação/conflitos de produto | NOT_EVIDENCED | — | — |
| C22 | Developer/Sandbox/SDK/Hosted | NOT_EVIDENCED | CAP-18 | — |
| C23 | Logs API/webhook | NOT_EVIDENCED | CAP-18 | — |
| C24 | Notificações/localização | NOT_EVIDENCED | — | — |

### Superfície D — Mutual interno (D1..D14) — todas ABSENT

| Screen ID | Função | Implementação | Capabilities |
|---|---|---|---|
| D1 | Clientes/tenants | ABSENT | — |
| D2 | Provider health | ABSENT | CAP-21 |
| D3 | Margem/custos | ABSENT | — |
| D4 | Kill switch | ABSENT | — |
| D5 | Governança de modelos | ABSENT | CAP-22 |
| D6 | Capability catalog | ABSENT | CAP-01..CAP-22 |
| D7 | Suporte a casos | ABSENT | — |
| D8 | Trilha de acesso Mutual | ABSENT | — |
| D9 | Provisioning/região/features | ABSENT | — |
| D10 | Fornecedores/third-party risk | ABSENT | CAP-18,CAP-20 |
| D11 | Jurisdições/baseline normativo | ABSENT | — |
| D12 | Segurança/privacidade/incidentes | ABSENT | — |
| D13 | Platform health/jobs/queues/webhooks | ABSENT | CAP-21 |
| D14 | Cockpit de homologação/release | ABSENT | CAP-20,CAP-21 |

---

## GAPS

Gap Registry — 48 gaps registrados. IDs: GAP-ONB-001..024 e GAP-ONB-031..054 (**lacuna GAP-ONB-025..030 é histórica e documentada em FIND-009; IDs não são renumerados nem inventados**). Estado: 46 OPEN, 1 CLOSED (GAP-ONB-002), 1 IN_PROGRESS (GAP-ONB-005).

| Gap ID | Tipo | Título (condensado) | Severidade | Blocker | Owner role | Gate | Estado | Disposition |
|---|---|---|---|---|---|---|---|---|
| GAP-ONB-001 | Documental/Técnico | Auth authority reconciliada; README do main permanece stale sob no-write | ALTA | NO | Architecture/Engineering/Governance | G1 | OPEN | KEEP_OPEN_NO_WRITE |
| GAP-ONB-002 | Documental/Técnico | Mapping Design × Código das 80 funções canônicas incompleto | ALTA | NO | Product/QA | G0 | CLOSED | CLOSED_KEEP_HISTORY |
| GAP-ONB-003 | QA/Evidência | 9ª natureza canonizada; UAT H-14 pendente | MEDIA | NO | QA/Product/Compliance | H-14 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-004 | Implementação | CNPJ alfanumérico não auditado end-to-end | CRITICA | YES | Engineering/QA | G1 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-005 | QA/Evidência | CI do baseline/release precisa consolidação | ALTA | YES | QA/Engineering | G0/G9 | IN_PROGRESS | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-006 | Procurement/Evidência | Dados comerciais/contratuais/cobertura de providers não evidenciados | ALTA | NO | Procurement/Legal/Architecture | G3 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-007 | Governança de Modelo/Implementação | CAP-22: governança canônica, mas contrato executável/model registry não evidenciados | ALTA | YES | Model Governance/Engineering | G5 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-008 | Integração/Handoff | Contratos executáveis HOF-001..006 não formalizados/evidenciados | ALTA | YES | Architecture Owner | G8 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-009 | Segurança/IAM | web-console sem autenticação/autorização completa | CRITICA | YES | Engineering/Security | G1/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-010 | Segurança/SoD | Maker-checker sem prova end-to-end | CRITICA | YES | Engineering/Security | G1/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-011 | Multi-tenant/IAM | TENANT_DEV hardcoded no painel | CRITICA | YES | Architecture/Engineering | G1 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-012 | Implementação/Providers | Adapters reais de providers ausentes | ALTA | YES | Architecture/Engineering | G3/G4/G5 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-013 | Dados/Documentos | Storage documental E2E incompleto (identidade/hash/versionamento de metadata já existem) | ALTA | YES | Engineering/Security | G2/G3 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-014 | Segurança/Crypto | KMS/HSM de produção não evidenciado | ALTA | YES | Security/Engineering | G1/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-015 | Domínio/Persistência | State machine do case incompleta | ALTA | YES | Domain/Engineering | G2 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-016 | Security/CI | Security scanning incompleto no pipeline | ALTA | YES | Security/Engineering | G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-017 | Operação/Observabilidade | Observabilidade operacional E2E ausente (medições transacionais já existem) | ALTA | YES | SRE/Engineering | G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-018 | Produto/Developer Platform | API pública/webhooks/SDK/sandbox ausentes | ALTA | YES | Product/Engineering | G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-019 | Internacionalização | Jurisdiction Packs não-BR ausentes | ALTA | YES | Architecture/Product/Compliance | G0/G6/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-020 | Privacy/Retention | Retention operacional incompleta (crypto por titular, validade e revalidação já existem) | ALTA | YES | Privacy/Security/Engineering | G6/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-021 | HFS/Implementação | CAP-22 sem integração técnica E2E evidenciada | ALTA | YES | Model Governance/Engineering | G5 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-022 | Procurement/Evidência | Provider Registry com schema canônico, mas due diligence corrente incompleta | ALTA | YES | Architecture/Procurement | G3 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-023 | Segurança/IAM | Hardening de login não evidenciado | MEDIA | NO | Security/Product | G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-024 | Dados/Migrations/CI | Convenção de migrations definida; enforcement automático não evidenciado | MEDIA | NO | Data/Engineering/QA | G1/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-031 | Implementação/Arquitetura | Catálogo de status parcialmente materializado; mapping ST-* e state machine pendentes | ALTA | YES | Architecture/Product | G2 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-032 | Implementação/Eventos | Taxonomia/registry de eventos não implementados E2E | CRITICA | YES | Architecture Owner | G2/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-033 | Implementação/Developer API | API e webhooks de status/eventos canônicos não evidenciados | CRITICA | YES | Architecture Owner | G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-034 | Implementação/Observabilidade | KPIs definidos, mas instrumentação operacional não evidenciada | ALTA | YES | Product/QA/Observability | G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-035 | Implementação/Resiliência | Event outbox, webhook delivery log e replay E2E incompletos | ALTA | YES | Architecture/Platform/SRE | G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-036 | Implementação/Regulatório | Regulatory Pack/applicability engine não implementados E2E | CRITICA | YES | Compliance/Product/Architecture | G0/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-037 | Implementação/Auditoria | Trilha regulatória E2E incompleta (append-only DB e dossiê JSON existem) | CRITICA | YES | Architecture/Security/Engineering | G2/G5/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-038 | Implementação/CCS | Contrato CCS/ACCS condicional sem implementação/transmissão/reconciliação | ALTA | YES | Compliance/Architecture/Engineering | G4/G7/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-039 | Implementação/Regulatório | Runtime de declarações dinâmicas incompleto | ALTA | YES | Product/Compliance/Legal | G2/G5/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-040 | Implementação/QA Governança | Change management e gates regulatórios sem automação/evidência de execução | ALTA | YES | Compliance/QA/Release | G7/G9/G10 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-041 | Arquitetura/Multicanal | Canal não evidenciado como contexto de primeira classe E2E | CRITICA | YES | Architecture/Product/Security | G1/G7/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-042 | Arquitetura/White-label | White-label na fundação, mas governança E2E e vínculo por canal/tenant incompletos | ALTA | YES | Product/Architecture/Security | G1/G7/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-043 | Dados/Relacionamentos | Papéis econômicos e vínculos afiliado/referral/beneficiário sem contrato runtime completo | ALTA | YES | Product/Architecture/Data | G2/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-044 | Integrações/Handoff | HOF-007..010 sem contratos executáveis e evidência E2E | ALTA | YES | Architecture/Product/Integrations | G7/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-045 | Auditoria/Monitoramento | Correlação Onboarding ↔ eventos econômicos downstream não evidenciada | ALTA | YES | Architecture/Compliance/Data | G7/G8/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-046 | Arquitetura/Conditional-by-Design | Conditional-by-Design transversal não materializado E2E em todos os contratos | CRITICA | YES | Architecture/Product/Compliance | G0/G2/G7/G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-047 | Implementação/Consentimento | Lifecycle de termos/consentimentos/declarações/assinaturas não evidenciado E2E | CRITICA | YES | Product/Compliance/Legal/Engineering | G2/G5/G6/G7 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-048 | Implementação/AML | Memória de falso positivo e disposição AML não evidenciada E2E | ALTA | NO | Compliance/AML/Engineering | G5 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-049 | Implementação/Risco | Vetor de risco, reason codes e explicabilidade E2E não evidenciados | ALTA | YES | Risk/Compliance/Engineering | G5 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-050 | Implementação/Jornada | Jornada delegada completa não evidenciada contra o contrato canônico | ALTA | NO | Product/Engineering/Security | G2 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-051 | Implementação/Recovery | Recovery e verificação assistida não evidenciados E2E | ALTA | NO | Product/Support/Engineering | G2 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-052 | Implementação/Monitoring | Revalidação, rescreening e monitoring não evidenciados E2E | CRITICA | YES | Compliance/Engineering/SRE | G8 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-053 | Operação/Runbooks | Runbooks críticos não exercitados nem evidenciados operacionalmente | ALTA | YES | SRE/Security/Support/Release | G9/G10 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |
| GAP-ONB-054 | Segurança/Secrets | Chave mestra de cifra exposta em texto claro em workflow versionado | CRITICA | YES | Security/Engineering | G9 | OPEN | KEEP_OPEN_UNTIL_EVIDENCED |

Nota de disposição padrão da fonte: "Não fechar por documentação isolada quando o gap for técnico. Exigir implementação/decisão conforme natureza, testes, Evidence Observed e aprovação do gate indicado."

---

## RISKS

Risk Registry — 7 riscos (R-16..R-22), todos OPEN.

| Risk ID | Categoria | Cenário (condensado) | Prob. | Impacto | Owner role | Estado | Mitigação (condensada) |
|---|---|---|---|---|---|---|---|
| R-16 | Concentração de fornecedor | Serasa Experian + idwall pertencem ao mesmo grupo econômico para fins de concentração/fallback | ALTA | ALTO | Procurement/Architecture | OPEN | Registrar economic_group; homologar fallback independente |
| R-17 | Modelo/tecnologia proprietária | HFS pode virar caixa-preta/acoplamento sem contrato e governança explícitos | MEDIA | ALTO | Model Governance | OPEN | Interface CAP-22, lineage, validação, kill switch, degraded mode |
| R-18 | Scope creep | Capacidades KYT/PLD transacional podem contaminar o core | ALTA | ALTO | Architecture/Product | OPEN | Fronteira por handoffs; não mover ledger/Pix/KYT para Onboarding |
| R-19 | Privacidade | Biometria/PII retida/logada acima do necessário | MEDIA | CRITICO | Security/Privacy | OPEN | Minimização, classificação, retenção, masking, crypto-shredding |
| R-20 | Multi-tenant | Falha de isolamento entre tenants/IDOR/BOLA | MEDIA | CRITICO | Security/Engineering | OPEN | RLS/constraints + authz tests + negative tests |
| R-21 | Dependência de provider | Indisponibilidade/timeout pode causar decisão incorreta | ALTA | ALTO | Architecture/SRE | OPEN | State UNKNOWN/INCONCLUSIVE, retry seguro, reconciliation, fallback real |
| R-22 | Segurança/SoD | Seeds de origem catálogo usam mesmo autor/aprovador; sem autoridade de sistema explícita, a semeadura pode falhar ou enfraquecer maker-checker | ALTA | ALTO | Security/Data/Engineering | OPEN | Autoridade de sistema/catálogo distinta de atores humanos, com audit trail, escopo mínimo e testes negativos; vincular a GAP-ONB-010 e FIND-037 |

---

## FINDINGS_BLOCKERS

42 registros: 37 findings (FIND-001..037) e 5 blockers (BLK-001..005). Registrados em 2026-08-08/09.

| ID | Natureza | Título (condensado) | Estado | Owner role |
|---|---|---|---|---|
| FIND-001 | FINDING | Drive raiz do projeto definido como destino obrigatório | CONFIRMED | Program Owner |
| FIND-002 | FINDING | HFS ownership: Hyperbolic Financial / Mutual Intelligence é ativo proprietário da Mutual | CONFIRMED | Program/Model Gov |
| FIND-003 | FINDING | Possível correlação econômica histórica Serasa Experian/idwall — verificar fonte corrente | TO_VERIFY_CURRENT | Procurement/Architecture |
| BLK-001 | BLOCKER | Gate G0 aberto: docs x código precisam convergir antes da primeira capability técnica | OPEN | Program/Architecture |
| BLK-002 | BLOCKER | Provider procurement incompleto: sem dados comerciais/contratuais não há vencedor de provider | OPEN | Procurement/Legal |
| FIND-004 | FINDING | CI PR #4 comprovada (head 13975fea, run 31259025328 com sucesso) | CONFIRMED | QA/Engineering |
| FIND-005 | FINDING | RLS/append-only comprovados (0001 FORCE RLS; 0002 NOBYPASSRLS; isolamento.test.ts contra Postgres real) | CONFIRMED | Security/Engineering |
| BLK-003 | BLOCKER | web-console sem IAM completo | OPEN | Engineering/Security |
| BLK-004 | BLOCKER | SoD não comprovada end-to-end (author/approver user_id não propagado em todas as mutações) | OPEN | Engineering/Security |
| BLK-005 | BLOCKER | Tenant de desenvolvimento fixo (TENANT_DEV) no web-painel do PR #4 | OPEN | Architecture/Engineering |
| FIND-006 | FINDING | SOURCE_MANIFEST tinha duas ausências físicas; corrigido como SRC-044 e SRC-045 | CONFIRMED | Program/Governance |
| FIND-007 | FINDING | Drift de autenticação entre README e código main (fundação real em acesso.ts; README afirma que não há login) | CONFIRMED | Architecture/Engineering/Governance |
| FIND-008 | FINDING | PR #5 não versiona os registries anunciados; não é fonte canônica documental | CONFIRMED | QA/Engineering/Governance |
| FIND-009 | FINDING | Sequência de Gap IDs possui lacuna 025–030; IDs não serão renumerados nem inventados | CONFIRMED | Program/Governance |
| FIND-010 | FINDING | Núcleo de governança estava scaffold/proposed; reconciliado in-place para v1.0 CANONICAL | RESOLVED | Program/Governance/QA |
| FIND-011 | FINDING | Baseline funcional de 80 Screen IDs agora é único; contagens 45/46/56 são cobertura técnica | RESOLVED | Product/QA/Governance |
| FIND-012 | FINDING | Catálogos de produto marcados PROPOSED apesar de baseline canônica; ADR-019 separou contrato de technical state | RESOLVED | Program/Product/Architecture/QA |
| FIND-013 | FINDING | Readback detectou TASK-W0-015 ausente após atualização; linha restaurada | RESOLVED | Program/Governance |
| FIND-014 | FINDING | Sobreposição de autoridade SRC-044 x SRC-045; resolvido por ADR-020 (master + apêndice) | RESOLVED | Architecture/Governance |
| FIND-015 | FINDING | GAP-ONB-031..034 com redação obsoleta; refinados | RESOLVED | Program/Architecture/QA |
| FIND-016 | FINDING | Pacote regulatório com classificações mistas; ADR-021 separou maturidade de aplicabilidade | RESOLVED | Compliance/Legal/Governance |
| FIND-017 | FINDING | Arquitetura global estava IN_REVIEW apesar de decisão explícita; reconciliada CANONICAL | RESOLVED | Program/Product/Architecture/Compliance |
| FIND-018 | FINDING | Provider Registry misturava hipótese com fato; candidatos passaram a TO_VERIFY_CURRENT/NOT_EVIDENCED | RESOLVED | Procurement/Architecture/Governance |
| FIND-019 | FINDING | Taxonomia segmento/pack/jurisdição confundia definition com readiness; separadas | RESOLVED | Product/Compliance/Architecture |
| FIND-020 | FINDING | Standards operacionais restantes PROPOSED/TO_FORMALIZE; reconciliados para v1.0 CANONICAL | RESOLVED | Program/Governance |
| FIND-021 | FINDING | Readback D1.5 detectou deslocamento de estados em TASK-W0-009..013; restaurado | RESOLVED | Program/Governance |
| FIND-022 | FINDING | Fundação RLS/append-only reconfirmada ao vivo no main D2; multi-tenant E2E permanece PARTIAL | CONFIRMED | Security/Architecture/Engineering |
| FIND-023 | FINDING | Workflow de qualidade real, mas run do main SHA não evidenciado no snapshot | CONFIRMED | QA/Engineering |
| FIND-024 | FINDING | Autoridade documental ativa deduplicada (ADR-030); nenhum File ID apagado | RESOLVED | Program/Governance/Architecture |
| FIND-025 | FINDING | 9ª natureza convergente em decisão, registry e código; H-14 NOT_RUN | RESOLVED_DOCUMENTALLY | Product/Compliance/QA |
| FIND-026 | FINDING | Ordem de migrations depende de sort lexical por byte; ADR-033 resolve convenção futura; enforcement pendente (GAP-ONB-024) | CONFIRMED | Data/Engineering/QA |
| FIND-027 | FINDING | Disposição de gaps usava array formula frágil (#REF); substituída por fórmulas por linha | RESOLVED | Program/Governance/QA |
| FIND-028 | FINDING | Cópias de benchmark fora da árvore canônica em Downloads; staging não autoritativo | CONFIRMED_NON_AUTHORITY | Program/Governance |
| FIND-029 | FINDING | Web-console não consome a fundação IAM existente no main; GAP-ONB-009 é implementação | CONFIRMED | Engineering/Security/Architecture |
| FIND-030 | FINDING | TENANT_DEV disseminado no web-console; PR #4 não resolve tenant resolution; GAP-ONB-011 confirmado | CONFIRMED | Architecture/Engineering/Security |
| FIND-031 | FINDING | SoD existe em domínio e SQL, mas actor user_id não é propagado E2E no main (CHECK permite NULL) | CONFIRMED | Security/Engineering/Architecture |
| FIND-032 | FINDING | Channel arquitetural de primeira classe não evidenciado no main; CanalDeConvite não satisfaz REQ-ONB-069 | CONFIRMED | Architecture/Product/Security |
| FIND-033 | FINDING | White-label com fundação parcial; governança versionada E2E não evidenciada | CONFIRMED | Product/Architecture/Security |
| FIND-034 | FINDING | Sessão/auth com primitivas positivas (scrypt/timing-safe/12h/30min/revogação); hardening material não evidenciado | CONFIRMED | Security/Product/Architecture |
| FIND-035 | FINDING | Pacote CAP-19 pode ficar documentalmente preparado sem tornar G1 PASS (GAP-004 é blocker separado) | CONFIRMED | Program/QA/Architecture |
| FIND-036 | FINDING | Chave mestra de cifra de desenvolvimento exposta em workflow versionado (commit 743ca573); vinculado a GAP-ONB-054/ONB-SEC-002 | CONFIRMED | Security/Engineering |
| FIND-037 | FINDING | Fechar GAP-ONB-010 sem tratar autoridade do catálogo pode quebrar semeadura ou induzir bypass inseguro (…) | CONFIRMED | Security/Data/Engineering |

---

## PROVIDERS

Provider/official-source registry — 17 providers (PROV-001..017). Nenhum provider é homologado por constar no registry (ADR-022/ADR-035); Contract/DPA em geral NOT_EVIDENCED; Last verified 2026-08-09.

| Provider ID | Nome | Tipo | Economic group | Capabilities candidatas (condensado) | Região | Status |
|---|---|---|---|---|---|---|
| PROV-001 | ComplyCube | External | TO_VERIFY_CURRENT | Identity/KYC/KYB/AML | GLOBAL | RFP_REQUIRED |
| PROV-002 | Sumsub | External | Sumsub group — Sum and Substance Ltd (UK) | Identity/KYC/KYB/AML/Fraud | GLOBAL | RFP_REQUIRED |
| PROV-003 | Serasa Experian | External | Serasa Experian / idwall — mesmo grupo econômico após aquisição concluída 2026-07-01 | Dados/KYC/KYB/Fraude/Crédito + identidade digital/biometria/validação documental via ecosystem pós-idwall | BR | RFP_REQUIRED |
| PROV-004 | idwall | External | Serasa Experian / idwall — mesmo grupo econômico | Identidade digital/autenticação; biometria; validação documental; onboarding; background-check (cobertura contratada RFP_REQUIRED) | BR | RFP_REQUIRED |
| PROV-005 | Unico | External | TO_VERIFY_CURRENT | Biometria/identidade/liveness/revalidação | BR | RFP_REQUIRED |
| PROV-006 | DataRudder | External | TO_VERIFY_CURRENT | Sinal de risco econômico adjacente via handoff: antifraude transacional/Pix + monitoramento PLD-FT; não é provider core de onboarding | BR | ADJACENT_HANDOFF_ONLY |
| PROV-007 | Assertiva | External | TO_VERIFY_CURRENT | Cadastro PF/PJ, validação documental/dados, biometria facial, prevenção a fraude, crédito, investigações legais, assinaturas | BR | RFP_REQUIRED |
| PROV-008 | Exato Digital | External | TO_VERIFY_CURRENT | Background check PF/PJ; identidade; face compare; CNPJ/fiscal; AML PF; sanções; adverse media; judicial; crédito (due diligence endpoint a endpoint) | BR + sanções globais selecionadas | RFP_REQUIRED |
| PROV-009 | Revizia | External | TO_VERIFY_CURRENT | Compliance fiscal/tributário, captura/armazenamento de documentos fiscais, auditoria e reconciliação; potencial CAP-11/evidência fiscal adjacente | BR | SCOPE_REVIEW |
| PROV-010 | Judit | External | TO_VERIFY_CURRENT | Dados judiciais/legais; processos cíveis/trabalhistas/criminais; mandados/execuções; background check; monitoring via API/webhooks | BR | RFP_REQUIRED |
| PROV-011 | Gryfo | External | Grupo Monitora (declarado publicamente); cadeia de controle TO_VERIFY_CURRENT | Biometria facial; face match/recognition; liveness ativo/passivo; API/SDK incl. on-device/offline | BR | RFP_REQUIRED |
| PROV-012 | Legitimuz | External | TO_VERIFY_CURRENT | Verificação de identidade; liveness/facial; captura/OCR/validação documental; verificação de idade; antifraude; onboarding/re-autenticação; monitoring | BR / claims de expansão a verificar | RFP_REQUIRED |
| PROV-013 | T-Shield | External | TO_VERIFY_CURRENT | Antifraude de onboarding digital; autenticação digital; validação de identidade; liveness; validação documental; análise de risco; assinatura biométrica/documental | BR | RFP_REQUIRED |
| PROV-014 | SERPRO | Official/Eligibility-controlled | OFFICIAL_SOURCE_NOT_VENDOR | Datavalid: validação biográfica/cadastral, biometria facial, liveness, digitais, CNH QR; serviço governamental contratável (Contract/DPA: CONTRACT_REQUIRED) | BR | ELIGIBILITY_CHECK |
| PROV-015 | Receita Federal | Official source | OFFICIAL_SOURCE_NOT_VENDOR | Fontes cadastrais oficiais CNPJ/CPF, datasets públicos e APIs de interoperabilidade restritas; nunca "adapter RFB genérico" (Contract/DPA: SOURCE/CHANNEL_DEPENDENT) | BR | OFFICIAL_SOURCE_ELIGIBILITY |
| PROV-016 | Banco Central — dados públicos | Official/Public source | OFFICIAL_SOURCE_NOT_VENDOR | Datasets públicos BCB (instituições supervisionadas/correspondentes); sistemas restritos (SCR exige setup institucional e autorização expressa; CCS via RegulatoryPack/adapter dedicado); nunca "adapter BCB genérico" (Contract/DPA: SOURCE/REGULATORY_CHANNEL_DEPENDENT) | BR | OFFICIAL_SOURCE_ELIGIBILITY |
| PROV-017 | HFS / Mutual Intelligence | Internal | Mutual Capital | CAP-22 inteligência relacional; não entra em procurement/fallback externo | INTERNAL | INTERNAL_GOVERNANCE |

---

## Lacunas e observações de fonte

- **GAP-ONB-025..030**: inexistentes na fonte — lacuna histórica de numeração documentada em FIND-009 (IDs não renumerados nem inventados).
- **EVD-ONB-023**: colunas Evidence type/state/sensitivity/notas vazias na fonte.
- **TRACEABILITY_SUMMARY**: "Gate estrutural D2" = FAIL na aba, divergindo do D2 Cross-review PASS registrado em GATES/EVIDENCE (EVD-ONB-019); a fonte não explica a divergência.
- **ADRS**: numeração vai até ADR-035, mas as métricas D2 e o DG-01 referem baseline "ADR-001..034"; a fonte registra 35 ADRs (todas CANONICAL) sem reconciliar a contagem.
- **PACKS**: 12 linhas sem Pack ID (template com status repetido) — não representam packs adicionais.
- **SEGMENTS**: SEG-07..26 sem colunas de contrato de integração preenchidas (somente taxonomia/prioridade GTM).
- Células com texto extenso na fonte foram condensadas; trechos marcados com "(…)" indicam corte de texto — consultar o ONB-REG-001 original para o texto integral.
