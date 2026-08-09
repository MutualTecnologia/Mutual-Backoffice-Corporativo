---
titulo: "Glossário e Modelo Semântico Canônico — Mutual Onboarding"
fontes:
  - "ONB-GOV-003_GLOSSARIO_E_MODELO_SEMANTICO_CANONICO_v1.0 (CANONICAL SEMANTIC AUTHORITY)"
status_fonte: CANONICAL
gerado_em: 2026-08-09
---

# Glossário e Modelo Semântico Canônico

Documento-fonte: **ONB-GOV-003 v1.0** — Status: CANONICAL SEMANTIC AUTHORITY — Data-base: 2026-08-09 — Owner por papel: Produto / Arquitetura / Dados / Compliance / Segurança — Registry vivo: **ONB-REG-001 / aba SEMANTIC_REGISTRY**.

## 1. Objetivo

Estabelecer a **linguagem canônica** do Mutual Onboarding para eliminar ambiguidade entre produto, arquitetura, dados, integrações, auditoria, compliance, UX e domínios adjacentes. O documento não substitui requisitos, status/event registry, schemas ou código; define **como os conceitos devem ser interpretados e conectados**.

**Regra principal:** um conceito possui **um significado, uma autoridade e um eixo próprios**. Termos semelhantes não podem ser colapsados para simplificar UI, código, relatório ou integração.

## 2. Autoridade e precedência

O registry detalhado de termos é a aba **SEMANTIC_REGISTRY** do ONB-REG-001. O ONB-GOV-003 é a explicação normativa do registry. Em caso de conflito de nomenclatura:

1. Instrução explícita do **Program Owner** prevalece;
2. Este modelo semântico define o significado canônico;
3. Documentos especializados continuam autoridade sobre seu domínio, mas devem usar os termos deste modelo;
4. **Aliases históricos** permanecem preservados como mapping, **não** como segunda autoridade;
5. O código real continua sendo evidência técnica e **não redefine silenciosamente** a semântica canônica.

## 3. Invariantes transversais

### 3.1 Multi-tenant
**Tenant** é fronteira lógica de isolamento, autorização, configuração e ownership. Tenant **não é sinônimo** de LegalEntity, Company, Channel ou Brand.

### 3.2 Multicanal
**Channel** é dimensão first-class de operação/distribuição/acesso. Tenant e Channel são dimensões distintas e podem ser independentes ou relacionadas hierarquicamente **somente por ChannelBinding versionado**. Nunca inferir tenant de channel nem channel de tenant.

### 3.3 White-label
**WhiteLabelProfile** é configuração de marca, tema, domínio, conteúdo permitido, templates e localização. White-label **nunca cria fork semântico** nem altera security, compliance, status, evidence, decision ou applicability por si só.

### 3.4 Conditional-by-Design
Todo item condicional deve possuir applicability explícita e auditável. **ApplicabilityState** canônico: `CORE_MANDATORY`, `CONDITIONAL`, `APPLICABLE`, `NOT_APPLICABLE`, `PROHIBITED`, `REVIEW_REQUIRED`. `NOT_APPLICABLE` exige reason; o texto histórico `NOT_APPLICABLE_WITH_REASON` é alias descritivo, **não** novo estado.

### 3.5 Server-authoritative
Frontend, channel ou white-label podem apresentar e coletar, mas **não são autoridade** de tenant, applicability, permission, status, decision, evidence, provider result ou regulatory obligation.

## 4. Tenant, Channel e origem técnica

A separação é obrigatória:

| Campo | Identifica |
|---|---|
| `tenant_id` | Tenant |
| `channel_id` | Channel |
| `channel_binding_id` | Associação configurada Tenant↔Channel |
| `white_label_profile_id` | Configuração de apresentação |
| `interaction_source` | Origem técnica da interação/fato |

**InteractionSource** pode assumir valores equivalentes a: `hosted_flow`, `public_api`, `partner_api`, `analyst_console`, `delegated_journey`, `system_job`, `webhook_inbound`, `batch` e outros controlados.

O campo histórico **`source_channel`** usado em SRC-040/SRC-045 deve ser interpretado como **alias legado de `interaction_source`**. Ele **NÃO** representa `channel_id`. Novos contratos devem carregar `channel_id` e `interaction_source` separadamente quando aplicáveis.

## 5. Entidades e identidade

| Termo | Definição canônica |
|---|---|
| **Subject** | Sujeito canônico de verificação/evidência |
| **Person** / **Company** | Especializações/representações de Subject conforme domínio e jurisdição |
| **LegalEntity** | Entidade com identidade legal/regulatória |
| **Tenant** | Boundary operacional; não deve ser usado como substituto das entidades acima |
| **Identifier** | Tipado por autoridade, país/jurisdição e valor. CPF/CNPJ são identifiers do contexto Brasil; **não são chaves universais do core** |
| **Actor** | Quem executa/causa ação |
| **Role** | Descreve função |
| **Authority** | Descreve alçada/permissão efetiva |
| **EconomicRole** | Papel econômico de Relationship; **não é role de IAM** |

Actor é quem executa; Subject é quem está sendo verificado ou relacionado.

## 6. Case, Journey, Flow, Step e Screen

| Termo | Definição canônica |
|---|---|
| **Case** | Unidade canônica do lifecycle de onboarding |
| **Journey** | Experiência/orquestração aplicada ao Case/Subject |
| **Flow** | Grafo/sequência versionada de requirements/steps/conditions |
| **Step** | Posição/atividade do flow |
| **Screen** | Função de UX disponível; **não equivale** a Step, Status ou Case |

As **80 Screen IDs** são funções canônicas; **não constituem uma jornada linear obrigatória**. Conditional-by-Design determina quais funções/steps se materializam para cada contexto.

## 7. Requirement, Declaration, Consent, Policy e Applicability

| Termo | Definição canônica |
|---|---|
| **Requirement** | Obrigação de produto/configuração |
| **RegulatoryRequirement** | Requirement associado a regulador/regime, norma, vigência e applicability formal |
| **DeclarationDefinition** | Especificação versionada de pergunta/declaração/campo |
| **ConsentAcceptance** | Fato versionado de apresentação e resposta a termo/consentimento/declaração/assinatura |
| **Policy** | Regra versionada que produz decisão/restrição/routing/comportamento |
| **ApplicabilityEvaluation** | Avalia regra/version contra contexto e produz ApplicabilityState |

**Nunca inferir aceite** pela existência de Document, navegação, clique genérico ou submissão de tela. **REQ-ONB-077** exige prova versionada do conteúdo apresentado e da resposta.

## 8. Packs e contexto regulatório

| Termo | Definição canônica |
|---|---|
| **JurisdictionPack** | Contexto territorial: identifiers, documents, official sources, privacy/residency e localização |
| **RegulatoryPack** | Obrigações de regulador/regime formalmente aplicáveis |
| **SegmentPack** | Overlays de segmento/produto econômico |
| **TenantPolicy** | Decisões/configurações permitidas do tenant |
| **CaseContext** | Reúne fatos utilizados para avaliação |
| **RegulatoryProfile** | Reúne enquadramentos relevantes de entidade/atividade/produto |

A expressão histórica **"Tenant/Product Pack"** é alias descritivo de **TenantPolicy** e **não cria uma quinta categoria de Pack**.

## 9. Capability, Provider, Source e execução

| Termo | Definição canônica |
|---|---|
| **Capability** | Vendor-agnostic (definição de capacidade funcional) |
| **Provider** | Fornecedor externo que implementa capabilities |
| **OfficialSource** | Fonte oficial com provenance/autoridade preservadas |
| **InternalCapability** | Capability operada pela Mutual, como CAP-22/HFS |
| **Adapter** | Traduz contratos proprietários para o modelo canônico |
| **VerificationExecution** | Execução concreta por Provider/OfficialSource/InternalCapability |

Provider, OfficialSource e InternalCapability **não são intercambiáveis**. **Provider brand nunca deve vazar** como semântica de requirement, event_type ou state.

## 10. Evidence, Document e Dossiê

| Termo | Definição canônica |
|---|---|
| **Evidence** | Fato/artefato/assertion defensável |
| **EvidenceEnvelope** | Envelope normalizado de provenance, capability, source/provider, resultado, validade e referências |
| **Document** | Artefato documental identificado/versionado/hashado |
| **Dossier** | Read model/export autorizado do case; **não é fonte da verdade** |
| **EvidenceBundle** | Pacote reproduzível acompanhado de manifest/hashes |
| **ExportArtifact** | Arquivo/projeção gerada em formato autorizado |

Document, Evidence, AuditRecord e Dossier **nunca devem ser usados como sinônimos**.

## 11. Status, State e Health

| Termo | Definição canônica |
|---|---|
| **StatusDefinition** | Definição do catálogo ST-* |
| **DomainState** | Valor atual de estado de um aggregate |
| **Situation/`situacao`** | Alias técnico legado/local que deve mapear para DomainState/StatusDefinition; não cria namespace paralelo |
| **UIState** | Descreve loading/empty/error/denied/degraded; **não muda negócio** |
| **GovernanceState** | Descreve lifecycle de execução/programa |
| **HealthStatus** | Saúde operacional de serviço/provider/dependency; **não é resultado de negócio** |

**DocumentaryClassification, TechnicalState, ExecutionState, ApplicabilityState e MarketReadiness são cinco eixos independentes e nunca devem ser colapsados.**

## 12. Event, Command, Audit, Job, Webhook e Notification

| Termo | Definição canônica |
|---|---|
| **Command** | Intenção; pode ser rejeitado |
| **DomainEvent** | Fato imutável ocorrido |
| **AuditRecord** | Registra quem fez o quê, quando, por quê e com qual authority/contexto |
| **Timeline** | Projeção cronológica para leitura |
| **WorkerJob** | Unidade técnica assíncrona |
| **WebhookDelivery** | Tentativa/estado de entrega externa de um DomainEvent |
| **Notification** | Mensagem operacional/regulatória a destinatário |
| **ReasonCode** | Código estável de explicação; texto livre pode complementar, mas **não substitui** reason code |

Nenhum desses conceitos é substituto dos outros. Nome de job ou string de audit não substitui `event_type` canônico. **Falha de webhook/job/notificação não altera automaticamente DomainState.**

## 13. Correlação, causalidade e idempotência

| Campo | Definição canônica |
|---|---|
| `correlation_id` | Conecta uma cadeia lógica de negócio ponta a ponta |
| `causation_id` | Aponta o fato/command imediatamente causador |
| `trace_id` | Identifica trace técnico distribuído |
| `idempotency_key` | Impede efeitos duplicados segundo escopo/janela definidos |

Esses IDs são **independentes**. `correlation_id` não substitui `tenant_id`, `channel_id` ou `idempotency_key`.

## 14. Handoff e domínios adjacentes

- **Handoff** transfere fatos/IDs/elegibilidade/restrições autorizados para downstream **sem transferir ownership** do estado do Onboarding.
- **DownstreamFeedback** é fato normalizado que pode acionar review/revalidation por contrato; **nunca reescreve Case diretamente**.

No domínio econômico adjacente:

| Termo | Definição canônica |
|---|---|
| **PaymentSplit** | Divisão do fluxo financeiro da operação |
| **FeeSplit** | Divisão de tarifa |
| **RevenueShare** | Distribuição de receita econômica |
| **Commission** | Obrigação de comissão calculada |
| **Remuneration** | Obrigação remuneratória de natureza distinta quando aplicável |
| **Settlement** | Lifecycle financeiro de saldo/payable/liquidação |

Esses conceitos permanecem **separados** e são source of truth de domínios downstream. O Onboarding conhece participantes, Relationships, EconomicRoles, eligibility/restrictions, evidence e handoff; cálculo/ledger/settlement permanecem downstream.

## 15. Geografia, privacy e internacionalização

| Termo | Definição canônica |
|---|---|
| **Jurisdiction** | **Não é sinônimo de Country** |
| **Country** | País/atributo geográfico |
| **DataRegion** | Região técnica de processamento/armazenamento |
| **DataResidency** | Regra de localização/tratamento de dados |
| **Locale** | Controla apresentação/formatação |
| **Timezone** | Controla apresentação/SLA temporal; `occurred_at` preserva instante técnico |
| **LegalBasis** | Base jurídica aprovada quando aplicável |
| **PrivacyRegime** | Regime de proteção de dados aplicável |

## 16. Classificações e maturidade (cinco+ eixos)

| Eixo | Valores |
|---|---|
| **DocumentaryClassification** | Autoridade/maturidade documental: CANONICAL, PROPOSED, REVIEW_REQUIRED, LEGACY, SUPERSEDED (entre outros) |
| **TechnicalState** | REAL, PARTIAL, UI_ONLY, PROTOTYPE, ABSENT, NOT_EVIDENCED |
| **ExecutionState** | DISCOVERED → SPECIFIED → READY → IN_PROGRESS → CODE_COMPLETE → INTEGRATED → QA → UAT → READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED |
| **ApplicabilityState** | CORE_MANDATORY, CONDITIONAL, APPLICABLE, NOT_APPLICABLE, PROHIBITED, REVIEW_REQUIRED |
| **MarketReadiness** | Maturidade de uma jurisdição/mercado para operação comercial |
| **ExposureClassification** | PUBLIC, TENANT, INTERNAL_ONLY |
| **SensitivityClassification** | Eixo separado de sensibilidade do conteúdo/dado; taxonomia detalhada permanece TO_FORMALIZE em registry específico |

Regras absolutas: **CANONICAL nunca significa REAL. REAL nunca significa READY_FOR_RELEASE. CODE_COMPLETE nunca significa DONE/PRODUCTION_VERIFIED.**

## 17. Versionamento

- **SchemaVersion** identifica a versão imutável de contrato serializado de API/event/handoff/export/declaration/artifact. **Breaking change cria nova versão.**
- Policy, Flow, Requirement, Pack, Declaration e WhiteLabelProfile também preservam versão histórica publicada; **rollback troca referência de versão, não reescreve história**.

## 18. Aliases e normalizações oficiais (D0.6)

| Alias legado / uso proibido | Interpretação canônica |
|---|---|
| `source_channel` | Alias legado de `interaction_source`; `channel_id` é dimensão separada |
| `NOT_APPLICABLE_WITH_REASON` | Alias descritivo; estado canônico é `NOT_APPLICABLE` + reason obrigatório |
| "Tenant/Product Pack" | Alias descritivo de **TenantPolicy** |
| `situacao` | Alias técnico/local de **DomainState**; deve mapear para ST-* quando catálogo aplicável |
| Provider name em lógica de domínio | **Proibido** como semântica; usar capability/source/provider refs |
| dashboard / timeline / dossiê | Read models/projeções, **não** fonte de verdade |

## 19. Critério de completude semântica

Uma especificação **não está documentalmente completa** se:

- usa termo sem SEM_ID ou definição equivalente no registry;
- usa um alias legado como nova autoridade;
- mistura tenant / channel / interaction_source / white-label;
- mistura status / state / health / UI / governance;
- mistura event / audit / job / webhook / notification;
- mistura evidence / document / dossier / export;
- mistura requirement / declaration / consent / policy / applicability;
- mistura provider / official source / internal capability;
- mistura payment split / fee split / revenue share / commission / remuneration / settlement;
- mistura classificação documental / técnica / execução / aplicabilidade / market readiness;
- ou não declara source of truth / ID / versão quando aplicável.

## 20. Uso nas fases seguintes

- **D0.7 Traceability E2E** deve referenciar SEM_IDs nos pontos críticos da golden thread.
- **D0.8 Audit & Evidence Architecture** deve usar Actor, Authority, Channel, InteractionSource, DomainEvent, AuditRecord, EvidenceEnvelope e IDs de correlação conforme este modelo.
- **D0.9** deve fechar conflitos/gaps **sem inventar equivalências**.
- **D0.10** usa DG-00 como checkpoint de consolidação; o gate final **DG-01** só pode ser avaliado após D1 Blueprint Completion, D2 Cross-review e D3 Documentation Freeze, e deve **falhar se houver ambiguidade semântica material não resolvida**.

> ⚠️ [LACUNA NA FONTE] — Na extração do documento original, a frase final do item 20 aparece truncada ("...deve falhar se houver ambiguidade semântica material não") com a palavra "resolvida." deslocada para o fim do item 21; a leitura acima reconstitui a frase pela junção evidente dos fragmentos, sem adição de conteúdo.

## 21. RegulatoryNature / Naturezas BR (D1)

- **SEM-091 RegulatoryNature** define natureza regulatória como classificação de contexto **versionada e potencialmente multivalorada**; **não equivale** a LegalEntityType, SegmentPack ou RegulatoryProfile.
- A autoridade viva do catálogo brasileiro é **ONB-REG-001 / NATURES_BR**. O catálogo possui **PF, PJ e MEI como naturezas não reguladas e nove naturezas reguladas**. **Correspondente bancário é a 9ª natureza regulada** por D-019/ADR-032.
- Textos históricos que mencionem oito naturezas **não criam segunda autoridade**. O código `packages/catalogo/src/br/naturezas.ts` é evidência técnica e, no baseline main `ed3f53fe`, já contém `correspondente_bancario`; o **UAT H-14** permanece uma evidência separada.
- **ADR-030** aplica-se também à semântica: registry vivo = autoridade; documentos explicativos e código = especialização/evidência, nunca fonte concorrente.

> ⚠️ [LACUNA NA FONTE] — O documento-fonte não enumera individualmente os termos SEM-001..SEM-090 (91 SEM IDs registrados segundo a baseline v1.1); a lista completa reside na aba SEMANTIC_REGISTRY do ONB-REG-001, que é a autoridade viva. Este arquivo consolida a explicação normativa integral do ONB-GOV-003.

## 22. Declaração patrimonial

O ONB-GOV-003 e o SEMANTIC_REGISTRY são **patrimônio canônico vivo**. Mudança incompatível exige decisão/versionamento, preservando história. Qualquer novo documento, API, evento, schema ou task que introduza termo incompatível com o SEMANTIC_REGISTRY deve abrir decisão/gap ou mapear alias explicitamente, em vez de criar segunda semântica.

## 23. Resumo das distinções semânticas críticas (referência rápida)

- **Tenant ≠ Channel ≠ InteractionSource ≠ WhiteLabelProfile** (`source_channel` = alias legado de `interaction_source`).
- **StatusDefinition ≠ DomainState ≠ UIState ≠ GovernanceState ≠ HealthStatus**.
- **DomainEvent ≠ Command ≠ AuditRecord ≠ WorkerJob ≠ WebhookDelivery ≠ Notification**.
- **EvidenceEnvelope ≠ Evidence ≠ Document ≠ Dossier**.
- **Requirement ≠ RegulatoryRequirement ≠ DeclarationDefinition ≠ ConsentAcceptance ≠ Policy**.
- **Provider ≠ OfficialSource ≠ InternalCapability**.
- **RegulatoryPack ≠ JurisdictionPack ≠ SegmentPack ≠ TenantPolicy**.
- **DocumentaryClassification ≠ TechnicalState ≠ ExecutionState ≠ ApplicabilityState ≠ MarketReadiness**.
- **PaymentSplit ≠ FeeSplit ≠ RevenueShare ≠ Commission/Remuneration ≠ Settlement**.
- **Jurisdiction ≠ Country**; **Actor ≠ Subject**; **Role ≠ Authority**; **EconomicRole ≠ role de IAM**.
