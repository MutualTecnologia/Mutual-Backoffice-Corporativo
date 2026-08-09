---
titulo: "Compliance Regulatório e LGPD — Framework, Catálogo de Declarações, Matriz de Aplicabilidade e Framework de Risco/Privacidade"
fontes:
  - "ONB-CPL-000_INDICE_PACOTE_REGULATORIO_BCB_AUDITORIA_CCS_v1.0 (CANONICAL PACKAGE INDEX)"
  - "ONB-CPL-001_FRAMEWORK_REGULATORIO_COMPLIANCE_BY_DESIGN_v1.0 (CANONICAL REGULATORY FRAMEWORK)"
  - "ONB-CPL-002_CATALOGO_DECLARACOES_CAMPOS_E_EVIDENCIAS_REGULATORIAS_v1.0 (CANONICAL DECLARATION MODEL / ENTRY APPLICABILITY REVIEW REQUIRED)"
  - "ONB-CPL-003_MATRIZ_APLICABILIDADE_REGULATORIA_v1.0 (CANONICAL LIVING REGISTRY, xlsx)"
  - "ONB-RSK-001_FRAMEWORK_RISCO_COMPLIANCE_PRIVACIDADE_v1.0 (CANONICAL RISK/COMPLIANCE/PRIVACY FRAMEWORK)"
status_fonte: "CANONICAL (aplicabilidade concreta controlada pelo registry/pack; implementação separada por evidência)"
gerado_em: 2026-08-09
---

# 12 — Compliance Regulatório e LGPD

> **Princípio de uso (comum a todos os documentos do pacote):** estes documentos especificam controles do produto. Não substituem parecer jurídico/regulatório nem dispensam validação de aplicabilidade pela área competente.

---

## Parte I — ONB-CPL-000: Índice do Pacote Regulatório (v1.0)

**Subtítulo:** Compliance-by-design, trilha de auditoria, declarações, CCS e gates
**Classificação/status:** CANONICAL PACKAGE INDEX
**Owner por papel:** Compliance / Jurídico / Produto / Arquitetura
**Uso:** Interno — produto, compliance, arquitetura, engenharia, QA e auditoria

### 1. Objetivo

Organizar os artefatos necessários para que o Mutual Onboarding consiga **aplicar, demonstrar e auditar** obrigações regulatórias aprovadas para cada tenant, entidade, produto, segmento e jurisdição, **sem hardcode regulatório no frontend**.

### 2. Artefatos do pacote

| ID | Artefato | Papel | Pasta |
|---|---|---|---|
| ONB-CPL-001 | Framework Regulatório Compliance-by-Design | Regras de composição RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD |
| ONB-CPL-002 | Catálogo de Declarações, Campos e Evidências | Perguntas e declarações versionadas, trigger-based e rastreáveis | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD |
| ONB-ARQ-005 | Trilha de Auditoria Regulatória e Evidências | Modelo append-only, actor/authority, diff/ref, evidência, export e privacidade | 05_DADOS_APIS_EVENTOS_E_PROVIDERS |
| ONB-ARQ-006 | CCS / arquivos ACCS e Reconciliação | Aplicabilidade condicional, geração/validação/transmissão/reconciliação | 05_DADOS_APIS_EVENTOS_E_PROVIDERS |
| ONB-CPL-003 | Matriz Viva de Aplicabilidade Regulatória | Registry tabular de normas, aplicabilidade, declarações, reportes e evidências | 06_RISCO_COMPLIANCE_JURIDICO_E_LGPD |
| ONB-QA-004 | Gates de Homologação Regulatória | No-go por obrigação aplicável não implementada/evidenciada | 07_QA_SEGURANCA_E_HOMOLOGACAO |

### 3. Regras do pacote

- Nenhuma pergunta regulatória relevante nasce hardcoded na interface; a UI materializa requirement/declaration versionado.
- Nenhuma obrigação é considerada aplicável apenas por semelhança de produto; aplicabilidade é uma decisão versionada de Compliance/Jurídico por tenant/entidade/produto/jurisdição.
- Nenhum arquivo regulatório é gerado por planilha manual como fonte da verdade; ele é projeção de dados e eventos canônicos.
- CCS é condicional: somente para participante/entidade e relacionamento sujeitos à obrigação.
- Alteração normativa gera nova versão de pack/schema/regra, testes de regressão e evidência; não reescreve silenciosamente o passado.
- A trilha regulatória deve permitir demonstrar qual regra estava vigente, qual dado/evidência foi usado, quem decidiu e qual artefato foi produzido.
- Implementação e homologação continuam NOT_EVIDENCED até prova em código, teste, CI e ambiente correspondente.

### 4. Relação com artefatos existentes

- ONB-ARQ-004 é o contrato mestre de status/eventos/observabilidade/API/webhooks e sustenta a trilha regulatória.
- ONB-UX-004/005 sustentam as superfícies e analytics; requisitos regulatórios entram por IDs e packs, não por cópia de telas de referência.
- ONB-INT-001 e JUR-BR-001/JUR-INT-001 sustentam a composição multi-jurisdição.
- ONB-QA-001/003 continuam válidos; ONB-QA-004 adiciona gates regulatórios específicos.

---

## Parte II — ONB-CPL-001: Framework Regulatório Compliance-by-Design (v1.0)

**Subtítulo:** Regulatory Packs, aplicabilidade, rastreabilidade e change management
**Classificação/status:** CANONICAL REGULATORY FRAMEWORK — aplicabilidade concreta controlada pelo registry/pack
**Owner por papel:** Compliance / Jurídico / Produto / Arquitetura
**Uso:** Interno — produto, compliance, arquitetura, engenharia, QA e auditoria

### 1. Decisão de produto

O Mutual Onboarding deve permitir **cumprir, demonstrar e auditar** as obrigações regulatórias que forem formalmente consideradas aplicáveis a cada tenant, entidade, produto e jurisdição. A plataforma não promete, por si só, conformidade jurídica universal: ela fornece controles, versionamento, evidência e bloqueios para que a obrigação aprovada seja executada e demonstrável.

### 2. Modelo de composição regulatória

A jornada efetiva é calculada por **composição, nunca por fork de país ou cliente**:

| Camada | Responsabilidade | Exemplos de conteúdo |
|---|---|---|
| JurisdictionPack | Regras territoriais e de dados | identificadores, documentos, privacy, residência, idioma, fontes oficiais, AML local |
| RegulatoryPack | Obrigações de regulador/regime | KYC/KYB, declarações, reportes, trilha, requisitos de segurança, CCS quando aplicável |
| SegmentPack | Regras do setor/produto | pagamentos, crédito, investimentos, VASP, seguros, betting, etc. |
| TenantPolicy | Contrato e decisões do cliente | features, canais, alçadas, providers, SLAs, retenção adicional, marca/idioma |
| Case Context | Fatos do caso | PF/PJ, país, produto, risco, representante, UBO, canal, consentimentos |

### 3. Regulatory Requirement Object

Toda obrigação configurável deve possuir, no mínimo:

- `requirement_id` estável; regulator/regime; `norm_id`; referência de artigo/tópico; `source_url` oficial; `source_type`; `jurisdiction_code`;
- entidade/participante a quem se aplica; produtos/segmentos; trigger; `effective_from`/`effective_to`; versão e status;
- obrigação em linguagem de produto; dados exigidos; declaração/documento/consulta/controle/reporting output relacionado;
- capabilities e telas afetadas; evidence requirements; retention class; data classification; privacy/legal basis quando aplicável;
- `owner_role`, `approver_role`, gate, testes, implementação e evidências de release.

### 4. Aplicabilidade

Aplicabilidade **não é um booleano global**. O motor deve avaliar entidade regulada/participante, natureza do relacionamento, produto, jurisdição/país, tipo de pessoa, atividade, tenant, `channel_id` quando for critério explícito e demais critérios da regra aprovada.

**Estados canônicos:** `CORE_MANDATORY`, `CONDITIONAL`, `APPLICABLE`, `NOT_APPLICABLE`, `PROHIBITED` e `REVIEW_REQUIRED`. `NOT_APPLICABLE` exige reason/reason_codes e versão da regra.

- NOT_APPLICABLE exige razão e versão da regra; não significa apagar a obrigação do catálogo.
- CONDITIONAL exige condição pendente e owner responsável por resolvê-la.
- REVIEW_REQUIRED bloqueia automação que dependa daquela decisão quando a incerteza for material.
- O histórico preserva qual regra e versão decidiram a aplicabilidade de cada case.

### 5. UI regulatória dinâmica

A interface não contém perguntas regulatórias como strings definitivas. Ela recebe uma especificação de declaração/requirement com `label_key`, `help_key`, `datatype`, opções, mandatory rule, visibility rule, evidence rule, sensitivity, locale e version. O backend continua autoridade sobre aplicabilidade e validação.

### 6. Brasil / BCB — baseline inicial

O baseline Brasil deve acomodar, quando aplicável ao tenant/entidade, conhecimento do cliente/beneficiário final, PLD/FT, evidências, controles de segurança/rastreabilidade e reportes/cadastros específicos como CCS. A **Resolução BCB nº 179/2022** é a referência central do CCS; a **Circular nº 3.978/2020** é referência central do BCB para política, procedimentos e controles de PLD/FT e conhecimento do cliente. A lista de normas é um registry vivo e deve ser atualizada pela área competente.

### 7. Change management regulatório

1. Detectar alteração em fonte oficial e abrir change item com `source_url`, norma, impacto potencial e owner.
2. Classificar impacto por tenant, entidade, produto, pack, capability, tela, API, evento, relatório e retenção.
3. Atualizar requirement/pack em nova versão; nunca editar semanticamente versão histórica publicada.
4. Executar simulation/diff de jornada, campos, decisões, reportes e efeitos de dados.
5. Aprovar por maker-checker Compliance/Jurídico conforme criticidade.
6. Executar testes de contrato/regressão/segurança/privacy e gerar evidence bundle.
7. Publicar com `effective_from` e janela de migração/deprecation quando aplicável.
8. Bloquear homologação/release do escopo afetado se obrigação aplicável estiver sem implementação/evidência.

### 8. Evidência e defensabilidade

- Cada decisão regulatória relevante referencia `requirement_version` e `policy_version`.
- Cada aceite referencia term/document version e hash.
- Cada consulta externa referencia source/provider, request/result e EvidenceEnvelope.
- Cada override registra actor, authority, motivo, evidências e checker independente quando requerido.
- Cada export/report regulatório registra schema/layout version, `generated_at`, `generated_by`/service, tenant, scope, hash e ciclo de entrega.

### 9. Requisitos de segurança e privacidade

- Minimização de PII em evento/log; payload sensível por reference, criptografado e access-controlled.
- RLS/FORCE RLS e autorização server-side para dados tenant-bound.
- Logs, audit e reports possuem classificação e política de retenção adequada à regra aplicável.
- Exportações exigem autorização, justificativa quando sensíveis e audit event.
- Regulatory Pack não pode enfraquecer controle de segurança para "cumprir prazo".

### 10. Critério de pronto regulatório

Uma obrigação só pode ser considerada IMPLEMENTED quando existir: regra/versionamento, modelo de dados, UI/API/eventos quando aplicáveis, controles de acesso, testes positivos/negativos, evidência de auditoria, observabilidade, documentação do output e prova no ambiente alvo. **Documento sozinho não fecha gap.**

### 11. Autoridade e relação com os registries

Este documento é a regra CANONICAL de composição e governança regulatória. O **SRC-042 / ONB-CPL-003** é o registry vivo de normas, regras de aplicabilidade, outputs e evidence requirements; o status de cada linha do registry prevalece para dizer se um item está REVIEW_REQUIRED, REFERENCE, APPLICABLE ou formalmente não aplicável.

SRC-039 define o modelo/catálogo de declarações; SRC-040 especializa audit/evidence; SRC-041 define o contrato CCS condicional; SRC-043 define gates regulatórios. Nenhum desses artefatos, isoladamente, transforma uma obrigação em aplicável para todo tenant ou jurisdição.

### 12. Addendum semântico D0.6

- **Autoridade semântica:** SRC-048 / ONB-GOV-003 e ONB-REG-001/SEMANTIC_REGISTRY.
- O texto histórico `NOT_APPLICABLE_WITH_REASON` fica normalizado para `NOT_APPLICABLE` com reason/reason_codes obrigatórios; não constitui um sétimo ApplicabilityState. A enum canônica é: `CORE_MANDATORY`, `CONDITIONAL`, `APPLICABLE`, `NOT_APPLICABLE`, `PROHIBITED`, `REVIEW_REQUIRED`.
- Tenant e Channel são dimensões distintas. `channel_id` pode participar de applicability somente quando a regra aprovada o usar explicitamente; nunca inferir tenant por channel nem channel por tenant. WhiteLabelProfile não cria aplicabilidade jurídica.
- RegulatoryPack, JurisdictionPack, SegmentPack e TenantPolicy permanecem conceitos separados. ApplicabilityEvaluation deve registrar `rule_id`/version, `effective_at`, `input_context`, result, reason_codes, decision authority, `tenant_id`, `channel_id` quando aplicável, `correlation_id` e `evidence_refs`.

---

## Parte III — ONB-CPL-002: Catálogo de Declarações, Campos e Evidências Regulatórias (v1.0)

**Subtítulo:** Modelo dinâmico para PF, PJ, representantes, UBOs e pessoas-chave
**Classificação/status:** CANONICAL DECLARATION MODEL / ENTRY APPLICABILITY REVIEW REQUIRED
**Owner por papel:** Compliance / Jurídico / Produto / Arquitetura
**Uso:** Interno — produto, compliance, arquitetura, engenharia, QA e auditoria

### 1. Objetivo

Definir como perguntas, declarações, consentimentos, dados e evidências regulatórias são modelados e renderizados **sem hardcode**. A tela de referência fornecida pelo Program Owner e o workbook de trilha servem como referência funcional de experiência/auditoria, não como fonte jurídica ou schema técnico a copiar.

### 2. Contrato mínimo de DeclarationDefinition

- `declaration_id`; `version`; `title_key`; `question_key`; `help_key`; `data_type`; `allowed_values`/options source;
- `target_subject`: PF, PJ, representative, UBO, administrator, key_person; jurisdiction/regulatory/segment/tenant scopes;
- `trigger_rule` e `visibility_rule`; `mandatory_rule`; `validation_rule`; dependencies;
- `normative_refs[]` e source URLs; effective window; owner/approver; sensitivity; `legal_basis`/`consent_basis` quando aplicável;
- `evidence_requirement`; `evidence_retention_class`; `revalidation_rule`; `expiry_rule`;
- events on presented/answered/changed/accepted/withdrawn; audit policy; API/webhook exposure classification.

### 3. Catálogo inicial de padrões

| ID | Padrão | Sujeito | Trigger/escopo | Evidência esperada | Capabilities |
|---|---|---|---|---|---|
| DECL-AML-001 | PEP — própria | PF/pessoa-chave | PEP screening/declaração conforme pack | Resposta + evidence screening + versão de lista | CAP-08, CAP-14 |
| DECL-AML-002 | PEP — relacionado próximo | PF/pessoa-chave | Pack AML aplicável | Relação, categoria, período + evidence ref | CAP-08, CAP-14 |
| DECL-PUB-001 | Cargo/função pública relevante | PF/pessoa-chave | Pack AML/regulatório | Resposta, função/período/país, evidence ref | CAP-08, CAP-14 |
| DECL-TAX-001 | US person / cidadania / green card | PF | Tax pack aplicável | Resposta + tax residency refs; não assumir FATCA sem regra aprovada | CAP-14, CAP-19 |
| DECL-TAX-002 | Residências fiscais | PF/PJ | Jurisdiction/tax pack | país + identifier type/value ref + evidence | CAP-01, CAP-14, CAP-19 |
| DECL-AFF-001 | Vínculo com instituição/parte relacionada | PF/PJ | Regra setorial/tenant | tipo vínculo, entidade, período | CAP-14, CAP-15 |
| DECL-UBO-001 | Beneficiário final | PJ | KYB/AML pack | ownership/control graph + UBO evidence | CAP-07, CAP-14 |
| DECL-REP-001 | Poderes do representante | PJ/representante | KYB/Legal pack | authority scope + document/version | CAP-07, CAP-14 |
| DECL-SOF-001 | Origem de recursos | PF/PJ | Risk/AML trigger | categoria, declaração e evidence ref | CAP-12, CAP-14 |
| DECL-SOW-001 | Origem de patrimônio | PF/PJ | EDD/high-risk trigger | categoria, rationale e evidence ref | CAP-12, CAP-14 |
| DECL-ECON-001 | Renda/capacidade econômica | PF/PJ | Product/risk pack | faixa/valor, fonte, currency, period, evidence | CAP-12, CAP-14 |
| DECL-SUIT-001 | Objetivo/perfil/suitability | PF/PJ | Somente produto/regime aplicável | answers + score/version do modelo; não global | CAP-14, CAP-15 |
| DECL-PURP-001 | Propósito do relacionamento | PF/PJ | KYC/KYB pack | purpose codes + expected use | CAP-01, CAP-06 |
| DECL-ACT-001 | Atividade econômica/ocupação | PF/PJ | KYC/KYB pack | activity code/source/version | CAP-01, CAP-06 |
| DECL-SAN-001 | Autodeclaração de sanções/restrições | PF/PJ | Quando pack exigir | answer + screening evidence | CAP-08, CAP-14 |
| DECL-LIC-001 | Licenças/registros regulatórios | PJ | Segment/regulatory pack | regulator, license id/ref, status, validity | CAP-13, CAP-14 |
| DECL-THIRD-001 | Terceiros relevantes/intermediários | PF/PJ | Risk/segment trigger | relationship graph + role + evidence | CAP-07, CAP-14 |
| DECL-CONS-001 | Ciência/consentimento/termo | PF/PJ | Por finalidade/jurisdição | term_version + hash + locale + acceptance event | CAP-14, CAP-20 |
| DECL-PRIV-001 | Aviso de privacidade | PF/PJ | Jurisdiction privacy pack | notice_version + locale + presentation/ack evidence | CAP-14, CAP-20 |
| DECL-DATA-001 | Autorização de fonte restrita | PF/PJ | Somente quando base exigir | scope, purpose, source, expiry/withdrawal | CAP-14, CAP-20 |
| DECL-POA-001 | Procuração/representação convencional | PF/PJ | Quando representante existe | instrument/version/powers/validity | CAP-07, CAP-14 |
| DECL-CONTACT-001 | Canais e contatos oficiais | PF/PJ | Journey/tenant policy | verified channel refs + consent/preference quando aplicável | CAP-05, CAP-14 |

### 4. Regras de renderização

- Pergunta só aparece quando a applicability/trigger rule server-side resultar aplicável.
- Obrigatoriedade e validação são retornadas pelo contrato; frontend não promove campo opcional a obrigatório nem o contrário.
- Texto de pergunta/help é localizado por locale e versão, mantendo o mesmo `declaration_id` lógico.
- Opções de resposta podem vir de catálogo versionado; valores persistidos usam codes estáveis, não labels traduzidas.
- Alteração posterior gera event de changed/superseded, preservando resposta anterior e rule version usada.
- Quando resposta muda risco/EDD/flow, o efeito ocorre por policy/state machine, não por lógica local do componente.

### 5. Aceites e termos

Todo aceite relevante deve preservar: `acceptance_id`, subject, tenant, declaration/term id+version, `document_hash`, locale, `presented_at`, `accepted_at`/`declined_at`/`withdrawn_at`, actor/context, channel, IP/device reference quando legal e necessário, `correlation_id`, `evidence_ref` e `policy_version`.

### 6. Segurança e privacidade

- Não duplicar documento, biometria, CPF/CNPJ completo ou payload de bureau em event payload.
- Usar `evidence_ref` e field-level diff controlado; mascaramento de tela não substitui autorização de backend.
- Dados de IP/device têm finalidade, classificação, acesso e retenção definidos; não são "telemetria grátis".
- Exportações de respostas sensíveis são auditadas e sujeitas a autorização/justificativa.

### 7. Relação com as telas A1–D14

- A4/Dynamic steps consome catálogo de requirements/declarations.
- A12 Termos/assinatura materializa DECL-CONS/PRIV e evidência de aceite.
- A20 Consentimentos/autorizações externas materializa fontes restritas/consentimentos específicos.
- B8 AML/Desambiguação e B12 Decisão usam as respostas como evidência, nunca como decisão única.
- C2/C3 Requisitos e C6/C7 Policies administram definições/versionamento; C8 simula; C9 publica.
- C17 Config audit e D11 Jurisdições/baseline normativo exibem versões e mudanças.

### 8. Regra de canonicalidade do catálogo

DeclarationDefinition, IDs estáveis, versionamento, triggers server-side, evidence requirements, eventos de aceite/mudança e classificação são **contrato CANONICAL do produto**. As entradas DECL-* são padrões canônicos de definição, mas a exibição/obrigatoriedade jurídica de cada declaração em um caso depende do RegulatoryPack/JurisdictionPack/SegmentPack/TenantPolicy e do resultado de aplicabilidade registrado no SRC-042.

Nenhuma entrada DECL-* deve ser interpretada como obrigatória globalmente apenas por existir neste catálogo. Implementação técnica e coverage de UI/API/eventos permanecem separadas por evidência.

---

## Parte IV — ONB-CPL-003: Matriz Viva de Aplicabilidade Regulatória (v1.0)

**Origem:** planilha XLSX com 7 abas (README, REGULATORY_CATALOG, APPLICABILITY_RULES, DECLARATIONS, REPORTING_OUTPUTS, EVIDENCE_REQUIREMENTS, CHANGE_LOG). Todas as linhas preenchidas foram preservadas; as demais linhas da planilha estavam vazias.

### Aba README

| Campo | Conteúdo |
|---|---|
| Título | ONB-CPL-003 — MATRIZ VIVA DE APLICABILIDADE REGULATÓRIA v1.0 |
| Objetivo | Registry vivo de normas/fontes, regras de aplicabilidade, declarações, reporting outputs e evidências do Mutual Onboarding. |
| Autoridade | Somente itens aprovados por Compliance/Jurídico e registrados como CANONICAL/APPLICABLE podem bloquear ou habilitar produção. |
| Regra crítica | Norma vigente muda: criar nova versão/linha/change item; não sobrescrever histórico publicado. |
| Aplicabilidade | APPLICABLE \| NOT_APPLICABLE_WITH_REASON \| CONDITIONAL \| REVIEW_REQUIRED. |
| CCS | Condicional a participante/entidade e relacionamento aplicável. Layout técnico sempre lido do XSD oficial vigente. |
| Privacidade | Não armazenar PII de clientes nesta matriz. Ela contém apenas metadados de regra/controle. |
| Status de implementação | Documentação desta matriz não prova implementação. Usar NOT_EVIDENCED até evidência de código/teste/ambiente. |
| Status do artefato | CANONICAL LIVING REGISTRY — o status de cada linha controla aplicabilidade; CANONICAL do arquivo não promove linhas REVIEW_REQUIRED |
| Precedência | ADR/Requirement CANONICAL → ONB-CPL-001 framework → esta matriz viva → catálogo/contratos especializados. Em conflito, decisão jurídica/aplicabilidade registrada prevalece para o escopo. |
| Estado técnico | Separado da aplicabilidade: regra APPLICABLE pode continuar NOT_EVIDENCED tecnicamente até código/testes/ambiente/evidence bundle. |

> Nota: a enum de aplicabilidade desta aba usa o texto histórico `NOT_APPLICABLE_WITH_REASON`; conforme o Addendum D0.6 do ONB-CPL-001, esse texto está normalizado para `NOT_APPLICABLE` com reason/reason_codes obrigatórios.

### Aba REGULATORY_CATALOG

| Rule ID | Regulator/Regime | Norm/Source | Topic | Source URL | Jurisdiction | Entity/Participant Scope | Product/Segment Scope | Obligation Summary | Effective From | Effective To | Status | Owner Role | Approver Role | Capabilities | Screens | Gate | Implementation State | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| REG-BR-BCB-CCS-001 | BCB / CCS | Resolução BCB 179/2022 | Cadastro de relacionamentos CCS | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=179&tipo=Resolu%C3%A7%C3%A3o%20BCB | BR | Instituições/participantes sujeitos ao CCS; validar por tenant/entidade | Relacionamentos abrangidos | Registrar/manter informações de relacionamento conforme aplicabilidade e regras vigentes. | — | — | REVIEW_REQUIRED | Compliance | Compliance/Jurídico | CAP-18, CAP-20 | B11, C22, C23, D11, D14 | G4/G7/G9 | NOT_EVIDENCED | Não presumir aplicação universal. |
| REG-BR-BCB-CCS-002 | BCB / CCS | Leiautes RSFN — Grupo CCS | Arquivos ACCS | https://www.bcb.gov.br/estabilidadefinanceira/leiautearquivosrsfn | BR | Participante CCS | Reporting/integração CCS | Gerar/validar/processar apenas conforme XSD/layout oficial vigente. | — | — | REVIEW_REQUIRED | Architecture/Compliance | Compliance | CAP-18, CAP-20 | C22, C23, D14 | G7/G9 | NOT_EVIDENCED | ACCS001/002/003/004/005/006/009/0010/0011/0012 conforme publicação oficial. |
| REG-BR-BCB-PLD-001 | BCB / PLD-FT | Circular 3.978/2020 | Conhecimento do cliente | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=3978&tipo=Circular | BR | Instituições abrangidas pela norma; validar tenant/entidade | KYC/KYB/AML | Suportar política, procedimentos e controles aplicáveis de identificação/qualificação/classificação, com abordagem baseada em risco. | — | — | REVIEW_REQUIRED | Compliance | Compliance/Jurídico | CAP-01, CAP-06, CAP-07, CAP-08, CAP-16, CAP-20 | A2-A20, B1-B22, D11 | G4/G5/G6 | NOT_EVIDENCED | Aplicabilidade e artigos específicos devem ser mapeados pela área competente. |
| REG-BR-BCB-GUIDE-001 | BCB / Supervisão | Manual da Supervisão | Identificação e qualificação do cliente | https://www3.bcb.gov.br/gmn/visualizacao/exibirConsulta.do?itemManualId=11864&method=visualizarDocumentoInternet | BR | Referência supervisória para instituições BCB | KYC/KYB | Referência de supervisão: coleta/verificação/validação compatíveis com perfil de risco e natureza da relação. | — | — | REFERENCE | Compliance | Compliance | CAP-01, CAP-06, CAP-07 | A2-A11, B1-B8 | G4/G5 | N/A | Não é substituto da norma; usada como guidance. |
| REG-BR-BCB-CYBER-001 | CMN / Segurança Cibernética | Resolução CMN 4.893 | Trilhas de auditoria e controles | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=4893&tipo=Resolu%C3%A7%C3%A3o%20CMN | BR | Somente instituições abrangidas; validar tenant/entidade | Transversal | Quando aplicável, suportar trilhas de processamento fim-a-fim, logs, retenção segura e controles/indicadores. | — | — | REVIEW_REQUIRED | Security/Compliance | Security/Compliance | CAP-20, CAP-21 | B11, C17, D12, D14 | G6/G9 | NOT_EVIDENCED | Aplicabilidade institucional precisa ser validada. |
| REG-BR-BCB-CYBER-002 | BCB / Segurança Cibernética | Resolução BCB 85 | Trilhas de auditoria e controles | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=85&tipo=Resolu%C3%A7%C3%A3o%20BCB | BR | Somente instituições abrangidas; validar tenant/entidade | Transversal | Quando aplicável, suportar trilhas de auditoria, retenção segura, testes e controles relacionados. | — | — | REVIEW_REQUIRED | Security/Compliance | Security/Compliance | CAP-20, CAP-21 | B11, C17, D12, D14 | G6/G9 | NOT_EVIDENCED | Aplicabilidade institucional precisa ser validada. |

> ⚠️ [LACUNA NA FONTE] As colunas "Effective From" e "Effective To" estão vazias em todas as linhas da planilha original (indicadas acima com "—").

### Aba APPLICABILITY_RULES

| Applicability Rule ID | Rule ID | Dimension | Operator | Value/Condition | Outcome | Reason Code | Owner Role | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|
| APP-CCS-001 | REG-BR-BCB-CCS-001 | participant_ccs | EQUALS | true | APPLICABLE | CCS_PARTICIPANT | Compliance | TO_FORMALIZE | Somente após validação formal do tenant/entidade. |
| APP-CCS-002 | REG-BR-BCB-CCS-001 | participant_ccs | EQUALS | false | NOT_APPLICABLE_WITH_REASON | NOT_CCS_PARTICIPANT | Compliance | TO_FORMALIZE | Preservar decisão e versão. |
| APP-CCS-003 | REG-BR-BCB-CCS-001 | participant_ccs | UNKNOWN | unknown/unresolved | REVIEW_REQUIRED | CCS_ELIGIBILITY_UNKNOWN | Compliance | TO_FORMALIZE | Fail-closed para geração/transmissão. |
| APP-PLD-001 | REG-BR-BCB-PLD-001 | regulated_entity_profile | IN | profiles approved by Compliance | CONDITIONAL | BCB_PLD_SCOPE | Compliance | TO_FORMALIZE | Não usar lista hardcoded sem governance. |

### Aba DECLARATIONS

| Declaration ID | Version | Category | Target Subject | Trigger/Scope | Data Type | Evidence Requirement | Sensitivity | Revalidation | Capabilities | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| DECL-AML-001 | 1 | PEP | PF/key person | AML pack | BOOLEAN+DETAIL | Screening evidence + answer | REGULATED | By pack | CAP-08, CAP-14 | TO_FORMALIZE | Self PEP |
| DECL-AML-002 | 1 | PEP_RELATION | PF/key person | AML pack | BOOLEAN+DETAIL | Relationship + screening evidence | REGULATED | By pack | CAP-08, CAP-14 | TO_FORMALIZE | Related/close associate |
| DECL-TAX-001 | 1 | US_PERSON | PF | Tax jurisdiction pack | BOOLEAN+DETAIL | Tax residency evidence when required | REGULATED | By pack | CAP-14, CAP-19 | TO_FORMALIZE | Do not assume FATCA applicability without approved pack. |
| DECL-UBO-001 | 1 | UBO | PJ | KYB/AML pack | GRAPH+DECLARATION | Ownership/control graph + docs | REGULATED | Material change/periodic | CAP-07, CAP-14 | TO_FORMALIZE | Beneficial owner |
| DECL-SOF-001 | 1 | SOURCE_OF_FUNDS | PF/PJ | Risk/EDD trigger | ENUM+TEXT+REF | Evidence ref | REGULATED | By risk | CAP-12, CAP-14 | TO_FORMALIZE | Source of funds |
| DECL-CONS-001 | 1 | TERMS | PF/PJ | Per product/jurisdiction | ACCEPTANCE | Term version+hash+acceptance event | REGULATED | On supersession | CAP-14, CAP-20 | TO_FORMALIZE | Terms/consent |

### Aba REPORTING_OUTPUTS

| Output ID | Regime | Output/Layout | Applicability | Source Data | Schema/Layout Source | Generation Frequency/Trigger | Reconciliation | Evidence Bundle | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| OUT-CCS-001 | BCB/CCS | ACCS001 | Conditional: CCS participant + applicable relationship | Canonical relationship model + audit/evidence refs | Official BCB XSD/layout | Per official cadence/configured cutoff | ACCS002/009 and other applicable controls | batch/layout/xsd hash/input/output/transmission/response | TO_FORMALIZE | No invented CSV layout. |
| OUT-AUDIT-001 | Internal/Regulatory | Audit dossier XLSX/CSV/PDF | Authorized audit/review | Audit/event read model | Internal schema version | On-demand | Hash/count/filter verification | export id/hash/filter/actor/schema | SPECIFIED | Projection, not source of truth. |

### Aba EVIDENCE_REQUIREMENTS

| Evidence Rule ID | Applies To | Required Evidence | Integrity | Retention Class | Access Class | Events | Gate | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|
| EVD-REG-001 | Regulatory requirement decision | Source URL/version + applicability rationale + approver | Audit event + immutable version | REGULATORY_DECISION | RESTRICTED | regulatory.applicability_decided | G0/G7 | SPECIFIED | No PII. |
| EVD-REG-002 | Declaration acceptance | definition/version + response ref + evidence + actor/context | acceptance event + term hash when applicable | REGULATORY_CASE | REGULATED | consent/decl.* | G5/G6 | SPECIFIED | Minimize payload. |
| EVD-CCS-001 | CCS batch | layout/XSD ref+hash, generator version, input hash/count, output hash/count, transmission/response | hash + append-only events | REGULATORY_REPORT | REGULATED | regulatory.ccs.* | G7/G9 | SPECIFIED | Conditional CCS. |
| EVD-AUD-001 | Audit export | filters/scope/schema, actor, generated_at, event count, output hash | export event + hash | AUDIT_EXPORT | RESTRICTED | audit.export.* | G9 | SPECIFIED | Export is projection. |

### Aba CHANGE_LOG

| Change ID | Rule/Pack | Change Type | Detected Source | Impact Summary | Affected Tenants/Products | Decision | Owner | Approval | Effective From | Status | Evidence/Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CHG-2026-08-09-D1.4 | 2026-08-09 | D1.4 canonicalization | Framework/registry | Artefato promovido a CANONICAL LIVING REGISTRY; nenhum status jurídico das linhas foi promovido automaticamente. REVIEW_REQUIRED/REFERENCE permanecem preservados. | Program/Compliance/Legal | ADR-021 | Documentation only; no code/applicability change | — | — | TEMPLATE | Use one row per regulatory change item; never overwrite historical published rows. |

> ⚠️ [LACUNA NA FONTE] Na linha CHG-2026-08-09-D1.4 da planilha original, os valores parecem deslocados em relação aos cabeçalhos (por exemplo, "2026-08-09" na coluna Rule/Pack e "ADR-021" na coluna Decision); a linha foi transcrita exatamente como está na fonte, e as colunas Approval e Effective From estão vazias.

---

## Parte V — ONB-RSK-001: Framework de Risco, Compliance e Privacidade (v1.0)

**Status:** CANONICAL RISK/COMPLIANCE/PRIVACY FRAMEWORK — implementação e aplicabilidade separadas por evidência

### 1. Objetivo

Garantir que risco, compliance, fraude, privacidade e decisão regulatória sejam requisitos de produto e arquitetura, não controles adicionados ao final.

### 2. Vetor de risco

O risco do case deve ser **multidimensional e explicável**: identidade, documento, biometria, fraude/device, empresa/UBO, AML/sanções/PEP, adverse media, judicial/fiscal, regulatory status, economic capacity quando aplicável, provider quality e sinais HFS. **Score agregado nunca pode apagar as dimensões de origem.**

### 3. Human-in-the-loop

Automação sensível exige política, alçada, explicabilidade, override governado, auditoria, contestação quando aplicável e kill switch. Falha ou ausência de provider/sinal não é aprovação implícita.

### 4. AML/Screening

Preservar hit, atributos de match, source/provenance, versão, `observed_at`, decisão de disambiguation e discard memory. Re-screening e monitoramento contínuo devem ser idempotentes e auditáveis.

### 5. Third-party risk

Provider Registry deve controlar `economic_group`, contrato, SLA, segurança, DPA, subprocessadores, residência, cobertura geográfica, exit e concentração. Relações societárias/econômicas entre marcas devem ser verificadas em fonte/contrato vigente no procurement; referências históricas de correlação não substituem due diligence atual.

### 6. HFS / CAP-22

HFS é capability interna e requer governança de modelo, owner/validator, lineage, versão, validação, métricas, drift, rollback, degraded mode, observabilidade e proteção de propriedade intelectual.

### 7. Privacidade

Minimização, classificação, purpose limitation, masking, encryption, retention, deletion, access control e log hygiene são obrigatórios. Dados biométricos e documentos exigem tratamento reforçado. Jurisdições internacionais acrescentam regras de transfer, residency e direitos locais.

### 8. Multi-tenant

Testes devem provar isolamento entre tenants em aplicação, API, objeto e banco. Consulta sem tenant deve falhar de forma segura. Nenhum admin operacional recebe acesso irrestrito por conveniência.

### 9. Registros vivos

- **GAPS** registra diferença estado atual × desejado.
- **RISKS** registra cenários futuros/incertos.
- **FINDINGS_BLOCKERS** registra evidências observadas e impedimentos atuais.
- Não combinar naturezas distintas em um único ID.

### 10. Gates

Risco/compliance/privacy participam de **G3–G9** e da homologação **H-03, H-04, H-05, H-07, H-08, H-10, H-12, H-16 e H-17** conforme aplicabilidade.

### 11. Internacional

Cada nova jurisdição exige avaliação específica de legal/regulatory/privacy, AML/local lists, data residency, providers, documentos e policy pack antes de READY_FOR_MARKET.

### 12. Relação com o framework regulatório

Este framework é CANONICAL como conjunto de invariantes transversais de risco, compliance, privacidade, multi-tenant e third-party/model risk. Aplicabilidade jurídica concreta pertence ao **SRC-042 / Regulatory Applicability Registry** e ao RegulatoryPack correspondente; este documento não transforma regra de risco em obrigação legal universal.

Status técnico dos controles permanece separado: documentação CANONICAL não prova provider homologado, retention engine, HFS integrado, privacy flow implementado, security gate aprovado ou produção verificada.

---

## Fontes oficiais e referências (comuns a ONB-CPL-000/001/002 e ONB-QA-004)

> A aplicabilidade deve ser revalidada contra a versão vigente da fonte oficial antes de cada release regulatório. O catálogo não deve depender de memória ou cópia estática de norma.

| Norma / fonte | URL oficial |
|---|---|
| Banco Central do Brasil — Cadastro de Clientes do Sistema Financeiro (CCS) | https://www.bcb.gov.br/meubc/cadastroclientes |
| Banco Central do Brasil — Resolução BCB nº 179/2022 (CCS) | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=179&tipo=Resolu%C3%A7%C3%A3o%20BCB |
| Banco Central do Brasil — Leiautes de arquivos autorizados a trafegar na RSFN | https://www.bcb.gov.br/estabilidadefinanceira/leiautearquivosrsfn |
| Banco Central do Brasil — Circular nº 3.978/2020 (PLD/FT e conhecimento do cliente) | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=3978&tipo=Circular |
| Banco Central do Brasil — Manual da Supervisão, identificação e qualificação do cliente | https://www3.bcb.gov.br/gmn/visualizacao/exibirConsulta.do?itemManualId=11864&method=visualizarDocumentoInternet |
| Banco Central do Brasil — Resolução CMN nº 4.893 (segurança cibernética, trilhas e controles, conforme aplicabilidade) | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=4893&tipo=Resolu%C3%A7%C3%A3o%20CMN |
| Banco Central do Brasil — Resolução BCB nº 85 (segurança cibernética, conforme aplicabilidade) | https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=85&tipo=Resolu%C3%A7%C3%A3o%20BCB |
