---
titulo: "QA, Segurança e Homologação — DoR/DoD, Auditoria Wave 0, Gates UX e Regulatórios, Threat Model Login/Session, Incidente GAP-ONB-054 e Readiness W10/G1"
fontes:
  - "ONB-QA-001_DEFINITION_OF_READY_DONE_E_HOMOLOGACAO_v1.0 (CANONICAL)"
  - "ONB-QA-002_AUDITORIA_TECNICA_WAVE0_v0.1 (AUDITORIA CONCLUÍDA / IMPLEMENTAÇÃO NÃO HOMOLOGADA)"
  - "ONB-QA-003_CRITERIOS_HOMOLOGACAO_UX_FRONT_v1.0 (CANONICAL QA GATE DEFINITION)"
  - "ONB-QA-004_GATES_HOMOLOGACAO_REGULATORIA_CCS_E_AUDITORIA_v1.0 (CANONICAL REGULATORY QA GATE)"
  - "ONB-QA-005_PLANO_READINESS_W10_UAT_MUTUAL_CLIENTE_1_v1.0 (CANONICAL_EXECUTION_SUPPORT)"
  - "ONB-QA-006_PACOTE_INTEGRADO_READINESS_GATE_CAP19_W1_007_G1_v1.0"
  - "ONB-SEC-001_THREAT_MODEL_E_TEST_SPEC_CAP19_W1_006_LOGIN_SESSION_v1.0"
  - "ONB-SEC-002_EVIDENCIA_CONTENCAO_GAP_ONB_054_v1.1 (CANONICAL_EXECUTION_SUPPORT; supersede v1.0)"
  - "ONB-SEC-002_REGISTRO_INCIDENTE_EXPOSICAO_CHAVE_MESTRA_DEV_v0.1 (CANONICAL, incidente OPEN/CRÍTICO)"
status_fonte: "CANONICAL / CANONICAL_EXECUTION_SUPPORT (status CANONICAL não implica gate PASS nem implementação homologada)"
gerado_em: 2026-08-09
---

# 13 — QA, Segurança e Homologação

---

## Parte I — ONB-QA-001: Definition of Ready, Done e Homologação (v1.0)

**Status:** CANONICAL | **Versão:** 1.0

### 1. Definition of Ready — Capability

Uma capability somente pode receber status READY quando possuir, conforme aplicabilidade: Capability ID; Task ID; source/requirement; prioridade/criticalidade; owner role; dependências satisfeitas; contrato/modelo de dados suficiente; regra/state machine suficiente; permission/auth model; acceptance criteria; plano de testes; controles cyber/security; evidência esperada; gate e autorização.

### 2. Estados de entrega

```
DISCOVERED → SPECIFIED → READY → IN_PROGRESS → CODE_COMPLETE → INTEGRATED → QA → UAT → READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED
```

Estados auxiliares: `BLOCKED`, `CANCELLED` e `READY_WITH_RESTRICTION`.

**CODE_COMPLETE != DONE.**

### 3. Definition of Done

Conforme aplicabilidade: código implementado; integração real; autorização validada; observabilidade; QA; negative tests; security checks; UAT; SOP/runbook; evidência; release; verificação pós-produção.

### 4. Testes mínimos por capability crítica

Happy path; negative path; authorization; validation; idempotency; concurrency; timeout/failure; audit/logging; recovery/compensation; proteção de dados; cross-tenant/IDOR/BOLA quando aplicável; replay e webhook authenticity quando aplicável.

### 5. Evidência

Todo registro de evidência deve conter: Evidence ID, Capability ID, Task ID, requirement/source, environment, GeneratedAt, referência do artefato, hash/integridade quando disponível, owner role e resultado. **Nunca criar Evidence ID para artefato inexistente.**

### 6. Resultado de gate

Cada gate possui condição, autoridade/owner, evidência requerida e resultado: `NOT_STARTED`, `IN_PROGRESS`, `PASS`, `PASS_WITH_RESTRICTION` ou `FAIL`. Owner isolado não substitui revisão independente quando segregação de função for exigida.

### 7. Homologação — H-01 a H-17

| Gate | Critério |
|---|---|
| H-01 | 80 Screen IDs implementados e testados ou waiver/feature flag formal. |
| H-02 | Cada capability P0/P1 com rota real; críticas com fallback/degraded mode. |
| H-03 | Contract tests de providers. |
| H-04 | Testes cross-tenant DB/service/IDOR/BOLA. |
| H-05 | PII/biometria com minimização, masking, encryption, retention, deletion e log hygiene. |
| H-06 | Requirements/flows/policies/products versionados, simulados, maker-checker e replayable. |
| H-07 | AML/judicial com falso-positivo, disambiguation, discard memory, human review e UAT. |
| H-08 | Monitoramento contínuo com reopen idempotente e alertas correlacionados. |
| H-09 | CNPJ alfanumérico end-to-end. |
| H-10 | SCR/CCS/Open Finance com eligibility/consent gates. |
| H-11 | CI real do release commit. |
| H-12 | Pentest/security review sem Critical/High não aceito ou waiver formal excepcional. |
| H-13 | Runbooks executáveis para incidente, provider outage, data request, replay, rollback, kill switch e suporte. |
| H-14 | Mutual UAT PF/PJ/MEI e packs/naturezas prioritárias. |
| H-15 | Release dossier com ADRs, schemas, versões, testes, exceções, owners e decisão de gate. |
| H-16 | CAP-22 HFS com governança de modelo, contrato interno, segurança e resiliência. |
| H-17 | Concentração econômica de providers refletida no routing e procurement. |

### 8. Regra de release

Interface pronta não significa operação pronta. Build verde não significa release apto. Commit não significa evidência. Release só ocorre com gate correspondente PASS/PASS_WITH_RESTRICTION formal e evidência persistida no Evidence Registry.

### 9. Regra de waiver

Waiver deve identificar requisito afetado, risco, justificativa, autoridade aprovadora, validade, compensating controls, evidência e condição de encerramento. Waiver não pode apagar gap/risco nem transformar ausência de evidência em PASS.

### 10. QA multicamada

- **QA documental** valida especificação, consistência e governança.
- **QA técnico** valida implementação, integrações, fluxos e produção.
- **Security review** valida código, arquitetura e controles.
- **UAT** valida uso real pelo negócio.

Essas camadas são independentes e cumulativas.

### 11. Gates regulatórios complementares

Os gates H-01..H-17 permanecem válidos. Para obrigações regulatórias e reportes aplicáveis, usar também **RG-01..RG-06** definidos em ONB-QA-004 (SRC-043): aplicabilidade, declarações/dados, auditoria/evidência, CCS, mudança normativa e segurança/privacidade. Nenhum gate regulatório pode receber PASS por mera existência documental; exige evidência observada compatível com o ambiente e o pack aplicável.

### 12. QA documental e baseline canônica

Antes da retomada de desenvolvimento após ADR-018, a baseline documental deve passar por QA próprio. O QA documental verifica: fonte de autoridade, versão, classificação, IDs, ausência de contradições não registradas, golden thread, owner role, evidence expected, technical state conhecido ou explicitamente NOT_EVIDENCED, gaps e gates associados.

**Documentação 100% significa 100% classificada e rastreável, não 100% implementada.**

### 13. Auditoria e exportação como critério de aceite

Capabilities que produzam decisões, mudanças de estado, consultas externas, aceites, reportes ou atos privilegiados devem provar trilha auditável com actor/authority, tenant, timestamps, correlation/causation/trace quando aplicável, before/after ou reason, evidence references, policy/config version e integridade.

Quando o produto exigir exportação, o aceite deve cobrir geração reproduzível e autorizada de CSV, XLSX, JSON/JSONL, PDF/dossiê, evidence bundle e/ou formato regulatório oficial, com masking/classificação/retention adequados.

### 14. Regra de evidência técnica

Usar separadamente **EVIDENCE_EXPECTED** e **EVIDENCE_OBSERVED**. Evidence observado deve ser verificável por referência concreta: path + commit SHA, migration/schema, test ID, CI run, artifact/environment, event/audit reference, hash/integridade e resultado. Ausência permanece NOT_EVIDENCED e não pode ser convertida em PASS.

---

## Parte II — ONB-QA-002: Auditoria Técnica Wave 0 (v0.1)

**Status:** AUDITORIA CONCLUÍDA / IMPLEMENTAÇÃO NÃO HOMOLOGADA
**Veredicto de gate:** NÃO APTO PARA HOMOLOGAÇÃO OU PRODUÇÃO; APTO PARA CONTINUIDADE CONTROLADA DE DESENVOLVIMENTO.

### 1. Escopo e fontes

A auditoria confrontou o planejamento canônico do Mutual Onboarding com o estado real do repositório privado `Mutual-Processadora-de-Pagamentos/onboarding-corporativo`, incluindo main, PR #4, apps, packages, migrations, testes, CI, autenticação, isolamento multi-tenant, evidências, providers, internacionalização e documentação técnica.

Regras canônicas aplicadas: o GitHub onboarding-corporativo é o único repositório de implementação; o Drive Mutual Onboarding é a raiz única de governança/documentação; o produto é Brasil-first operacionalmente e global por arquitetura; existem 22 capabilities canônicas e 80 funções de tela; CAP-22/HFS é capability interna proprietária da Mutual; providers são plugins por capability, nunca fonte única da verdade.

### 2. Baseline real do repositório

- Monorepo TypeScript/PNPM com quatro aplicações: `svc-trabalhadores`, `web-console`, `web-jornada` e `web-painel`. Possui packages `catalogo`, `dados`, `dominio`, `motor` e `orquestrador`, além de scripts, migrations e workflows GitHub Actions.
- Main auditada: commit `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`.
- PR #4 auditado: head `13975fea59f55e3b25a3e5d2a27e5d73bd345c4d`.
- CI do PR #4: workflow "Portão de qualidade", run 31259025328, concluído com sucesso. O pipeline executa Postgres real, guardas de fronteira, integridade do vendor lib-ui, typecheck, Biome, migrations, testes e builds das três aplicações web.
- A quantidade de telas está divergente entre fontes: documentação legada trabalha com baseline antigo de 56 funções; main declara protótipo com 45 telas; PR #4 declara protótipo com 46 telas; o baseline canônico atual do programa é **80 funções de tela**. Isso exige SCREEN_REGISTRY_V2 antes de homologação.

### 3. Pontos fortes comprovados

- Arquitetura de domínio separa catálogo, domínio, dados, motor e orquestrador.
- Modelo de sujeito usa identificadores genéricos em string, autoridade, país e jurisdição como dados; boa fundação para CNPJ alfanumérico e mercados internacionais.
- Banco usa PostgreSQL com RLS e FORCE RLS em entidades centrais; testes reais validam isolamento de tenant.
- Evidências e trilha possuem proteção append-only no banco, impedindo UPDATE/DELETE nos registros auditados.
- Criptografia de campo usa AES-256-GCM com chave por sujeito e abstração de envelope key, adequada como base para KMS de produção.
- Orquestrador chama capabilities, não marcas de providers, e possui reconciliação determinística com divergências explícitas.
- Autenticação própria possui scrypt, salt, comparação constante, segredo de sessão aleatório com apenas digest persistido, expiração absoluta e por inatividade, revogação e roles/capabilities não hierárquicos.
- PR #4 possui CI verde observado, superando a dependência de declarações manuais de "testes verdes".
- CLAUDE.md já contém invariantes fortes sobre jurisdição como dado, provider como plugin, decisão na instituição e evidência imutável.

### 4. Não-conformidades críticas

#### CRIT-01 — Web-console sem IAM completo

- **Evidência:** `scripts/guarda-autorizacao.mjs` no PR #4 registra explicitamente que web-console ainda não possui sessão/guard de autorização equivalente ao web-painel.
- **Impacto:** superfícies administrativas de requisitos, fluxos, políticas e produtos podem ficar sem enforcement server-side de identidade/capability se promovidas a produção.
- **Correção obrigatória:** implementar sessão e autorização por capability em toda mutação do web-console; negar por padrão; adicionar testes negativos por role e tenant.
- **Gate:** bloqueia G1/G7/produção.

#### CRIT-02 — Segregação de funções existe no schema, mas não está completa no fluxo

- **Evidência:** migration `0014-acesso.sql` possui checks maker-checker, mas a própria matriz técnica do repo identifica que colunas de autor/aprovador não estão populadas consistentemente pelas mutações do console.
- **Impacto:** constraint com valores nulos pode não comprovar "quem cria não aprova/publica".
- **Correção obrigatória:** propagar `user_id` autenticado para criação/alteração/publicação de requisitos, fluxos, políticas e produtos; impedir self-approval; testar no banco e na aplicação.
- **Gate:** bloqueia G1/G7.

#### CRIT-03 — Contexto de tenant de desenvolvimento fixo no painel

- **Evidência:** `apps/web-painel/src/lib/sessao.ts` no PR #4 contém `TENANT_DEV` fixo.
- **Impacto:** não é aceitável para SaaS multi-tenant/white-label e pode causar binding incorreto de tenant caso promovido sem troca.
- **Correção obrigatória:** tenant deve ser resolvido por contexto autenticado/provisionado, jamais constante de ambiente de demo; manter demo explicitamente segregado e impossível em produção.
- **Gate:** bloqueia G1 e qualquer piloto multi-tenant.

### 5. Não-conformidades altas

| ID | Descrição |
|---|---|
| HIGH-01 | Providers reais ausentes. Interfaces por capability existem, mas adapters reais/contratados e fontes oficiais não estão evidenciados. Sem isso KYC/KYB/AML não é operacional. |
| HIGH-02 | Storage documental ausente. Há metadados/chave de objeto, mas não foi evidenciado serviço real de upload/storage/versionamento/antivírus/integridade/lifecycle para documentos. |
| HIGH-03 | KMS/HSM de produção não evidenciado. Existe abstração EmbrulhadorDeChaves e implementação local, mas nenhuma implementação AWS KMS/HSM/serviço equivalente foi encontrada. |
| HIGH-04 | State machine do caso incompleta. O domínio tipa estados, porém persistência e transições legais não estão comprovadamente enforced por serviço/banco com negative tests. |
| HIGH-05 | Security CI incompleto. O pipeline atual é bom em qualidade funcional, mas não foi evidenciado secret scanning, SCA/dependency vulnerability scan e SAST como gates. |
| HIGH-06 | Observabilidade não evidenciada. Não foram encontrados tracing/metrics estruturados, alertas, SLOs, provider health, correlation IDs end-to-end ou plataforma de observabilidade operacional. |
| HIGH-07 | Baseline de 80 telas não reconciliado. 45/46 telas navegáveis não equivalem a 80 funções canônicas e navegação não prova backend, auth, dados, AC, testes ou evidência. |
| HIGH-08 | Packs internacionais ausentes. O core é compatível com jurisdição genérica, mas o catálogo implementado é essencialmente BR; não há packs por país para documentos, company registry, AML local, privacy/residency e provider routing. |
| HIGH-09 | API pública / webhooks / SDK / sandbox / hosted flow não evidenciados. Isso impede o produto de atuar como infraestrutura B2B externa completa. |
| HIGH-10 | Handoff operacional não evidenciado. Contratos com Backoffice, account/customer, Terminal, KYT e demais domínios ainda precisam ser formalizados e implementados preservando IDs e estado. |
| HIGH-11 | CAP-22/HFS sem integração técnica e governança completa. Existe capability genérica de risco, mas não foi encontrado contrato interno versionado da Mutual Intelligence, lineage/model registry/health/degraded mode/kill switch integrados. |
| HIGH-12 | Retention/delete/crypto-shredding operacional incompleto. Há boa base criptográfica e workers parciais de expiração, mas ciclo completo de retenção por categoria/jurisdição/tenant não está comprovado. |
| HIGH-13 | Provider Registry incompleto para o novo padrão. Deve incluir economic_group, legal entity, DPA/contrato, subprocessors, região/residency, SLA, capabilities, países/documentos, custo, qualidade, health, exit e fallback. Serasa e idwall são rotas correlacionadas e não podem ser fallback independente. |

### 6. Não-conformidades médias

| ID | Descrição |
|---|---|
| MED-01 | Rate limiting/brute-force protection de login não foi evidenciado. |
| MED-02 | MFA e recuperação/reset de credenciais não foram evidenciados; devem ser decididos por perfil/risco e não simplesmente omitidos. |
| MED-03 | IP de auditoria depende de x-forwarded-for; exige política de trusted proxy para impedir spoofing. |
| MED-04 | Migrações combinam nomes manuais e gerados com prefixos numéricos repetidos. A ordem lexical é determinística no CI, mas precisa de ADR/convenção para evitar colisões futuras. Não renumerar migrations já aplicadas. |
| MED-05 | Documentação possui drift: README/main ainda carrega referências antigas de Clerk; registro de decisões contém A-016 questionando onboarding-ui versus onboarding-corporativo, já resolvido pelo Program Owner; contagem de telas e outras decisões históricas precisam ser marcadas SUPERSEDED, não apagadas. |

### 7. Correções documentais canônicas imediatas

- Fechar A-016: onboarding-corporativo é CANONICAL; onboarding-ui, se encontrado, é LEGACY/REFERENCE e nunca alvo de implementação.
- Reconciliar D-030/contagem antiga de telas com SCREEN_REGISTRY_V2 de 80 funções, preservando histórico como SUPERSEDED.
- Atualizar README/decisões para refletir autenticação própria atual, sem apagar histórico do Clerk; registrar o que foi substituído.
- Mapear IDs técnicos antigos do repo, como CAP-IAM-xx/CAP-SEC-xx, como tasks/subcapabilities das CAP-01..CAP-22; nunca renumerar silenciosamente.
- Registrar arquitetura Brasil-first/global, Jurisdiction Packs, Segment Packs e CNPJ alfanumérico P0.
- Registrar HFS como CAP-22 interna da Mutual; nunca como fornecedor externo.

### 8. Readiness das capabilities

- Nenhuma capability está homologada para produção.
- CAP-15, CAP-16, CAP-19 e CAP-20 possuem implementação/fundações relevantes, mas permanecem SPECIFIED/PARTIAL e bloqueadas por IAM, tenant, state, segurança e evidência.
- CAP-01, CAP-02, CAP-03, CAP-06, CAP-07, CAP-08, CAP-09, CAP-11, CAP-14 e CAP-17 possuem modelos/interfaces/UI ou estruturas parciais, mas dependem de storage, adapters, regras e evidência real.
- CAP-18 está funcionalmente ausente/insuficiente como plataforma externa.
- CAP-22 está CANONICAL quanto à propriedade, mas BLOCKED para execução operacional até contrato interno/model governance.
- Demais capabilities permanecem DISCOVERED/SPECIFIED conforme mapping do SCREEN_REGISTRY_V2 e CAPABILITY_MATRIX_V2.

### 9. Ordem obrigatória de execução

1. Sincronizar PR #4 versus main e documentação; não mergear automaticamente sem decisão explícita do Program Owner.
2. Criar no repo SCREEN_REGISTRY_V2, CAPABILITY_MATRIX_V2, GAP_BLOCKER_REGISTRY_V2 e BASELINE_TECNICO_V2.
3. Fechar IAM web-console, tenant context e SoD real com testes negativos.
4. Fechar state machine server-authoritative e invariantes de evidência/versionamento.
5. Adicionar security CI, KMS production adapter contract e observabilidade mínima.
6. Implementar storage documental seguro e lifecycle.
7. Evoluir Provider Registry/EvidenceEnvelope/routing com economic_group e multi-jurisdição.
8. Integrar primeiro provider/fonte oficial REAL somente com documentação/credenciais/contrato disponíveis; nunca mockar como integração real.
9. Criar Jurisdiction Packs e Segment Packs internacionais, mantendo core sem hardcodes BR.
10. Implementar Developer Platform: API, keys, signed webhooks, SDK, hosted flow, sandbox e logs.
11. Integrar CAP-22/HFS por contrato interno, com governança de modelo e segredo metodológico.
12. Completar as 80 funções de tela por dependência, não por estética, cada uma com backend, auth, dados, AC, teste e evidência.
13. Só então avançar para UAT, homologação e release controlado.

### 10. Definition of Ready para cada alteração

Antes de editar código, exigir: Capability ID; Task ID; requisito/fonte; prioridade; owner role; dependências; data/contract; regras/state; permission/auth; acceptance criteria; plano de testes; security controls; evidência esperada; gate. Se faltar elemento estrutural, status BLOCKED. CODE_COMPLETE nunca significa DONE.

### 11. Evidência mínima por task

- commit SHA e branch/PR;
- arquivos alterados;
- testes novos e regressão;
- typecheck/lint/build;
- guardas de arquitetura/autorização;
- security scan aplicável;
- migrations e rollback/compatibilidade quando houver;
- evidência de integração real quando houver provider;
- screenshots apenas como evidência complementar, nunca substituindo comportamento de servidor;
- atualização dos registries e do gate.

### 12. Veredito final

**NÃO APTO** para homologação, piloto regulado ou produção no estado atual. **APTO** para continuidade técnica controlada, pois os fundamentos de domínio, RLS, criptografia, auditoria, reconciliação e CI são sólidos o suficiente para uma execução por capabilities. O primeiro foco não deve ser adicionar features visuais; deve ser fechar os hard invariants de IAM, tenant, SoD, lifecycle, segurança/evidência e convergir o baseline canônico.

---

## Parte III — ONB-QA-003: Critérios de Homologação UX / Front (v1.0)

**Status:** CANONICAL QA GATE DEFINITION — PASS somente com evidência

### 1. Objetivo

Definir o gate de homologação das **80 funções de tela** do Mutual Onboarding. A homologação é multidimensional: UX, backend, dados, segurança, tenant isolation, acessibilidade, responsividade, observabilidade e evidência. **Tela navegável não equivale a tela homologada.**

### 2. Baseline

O ONB-UX-002 contém **400 critérios mínimos, cinco por Screen ID**: UX, Security, Data, Accessibility e Responsive. Critérios adicionais de domínio, integração, provider e compliance devem ser adicionados conforme a capability.

### 3. Gate de tela

Para cada A1-A20, B1-B22, C1-C24 e D1-D14 exigir:

- Screen ID e objetivo funcional.
- route/view real no repositório.
- arquetipo/wireframe aprovado.
- read/write contracts e fonte de dados.
- tenant/auth/role/capability server-side.
- states loading, empty, error, timeout/unavailable, access_denied e estados de domínio.
- masking/privacy conforme dados exibidos.
- responsive no viewport aplicável.
- acessibilidade e teclado.
- testes positivos, negativos e de permissão.
- observability/correlation aplicável.
- evidência de QA ligada ao Screen ID.

### 4. Critérios UX

Objetivo e próxima ação são claros; hierarquia de informação é coerente; status não depende só de cor; validação aparece junto ao input; loading não causa ação duplicada; empty state orienta; erro diferencia correção, retry, pendência e bloqueio; filtros são compreensíveis; confirmação existe em ações críticas; navegação preserva contexto do case.

### 5. Critérios de segurança

Nenhuma permissão depende apenas da UI. Testar direct request, forged route/body, usuário sem capability, outro tenant, sessão expirada/revogada, self-approval quando proibido e acesso a PII masked. Ações críticas registram actor, motivo, scope e evidence. Não expor secrets, stack traces ou raw payloads indevidos.

### 6. Critérios de dados

Cada dado relevante possui source of truth definida; identificadores e timestamps são consistentes; timezone/locale são tratados; evidência mostra origem/versão/lineage; divergências são explícitas; UNKNOWN/INCONCLUSIVE não aparecem como PASS; listagens/paginação não perdem escopo; exports respeitam filtros, masking e versão.

### 7. Acessibilidade

Teclado, foco, labels, contraste, reader semantics, mensagens de erro associadas, ícone+texto para status, zoom/text expansion e alternativa a grafos/visuais. White-label não pode quebrar contraste. Captura deve oferecer instruções compreensíveis e fallback quando possível.

### 8. Responsividade

Jornada homologada prioritariamente em mobile e desktop. Consoles homologados em desktop e nos breakpoints aprovados. Tabelas devem preservar colunas críticas e mover detalhe para drawer, não ocultar ações essenciais. Modais não devem exceder viewport; CTA deve permanecer alcançável.

### 9. Performance e resiliência

Definir budgets P95/P99 antes de produção. Evitar waterfall desnecessário. Retry precisa ser idempotente. Provider indisponível gera estado degradado/unknown e não decisão positiva. Fluxos assíncronos mostram progresso e permitem retomada sem duplicar operação.

### 10. Internacionalização

Validar texto expandido, idiomas configurados, nomes e endereços não-BR, identificadores alfanuméricos, timezone, datas, telefones e jurisdição. Nenhum componente pode assumir CPF/CNPJ/CEP/UF como formato universal. JurisdictionPack controla regras e campos.

### 11. Dashboards/KPIs

Validar fórmula, unidade, fonte, denominador, timezone, filtro e owner. Drill-down deve reconciliar com o número do card. Custo/margem estimada deve ser rotulado; analytics não substitui contabilidade. KPIs de provider mostram economic_group quando relevante.

### 12. Filtros e busca

Filtros tenant-safe; estado persistente quando autorizado; combinação de filtros reproduzível; export reflete filtros; busca não vaza recurso de outro tenant; campos sensíveis permanecem masked; saved views são privadas ou compartilhadas conforme permission model.

### 13. Jornada externa

Testar link/convite válido, expirado, usado, revogado; save/resume; conexão instável; câmera negada; upload inválido; documento retry; biometria retry; multi-person delegation; sessão expirada; pendência; contestação; consentimento; submissão dupla; localização e acessibilidade.

### 14. Analista

Testar fila vazia/grande, assignment concorrente, SLA vencido, filtros, evidência ausente, provider unknown, divergência, notas, complemento, escalation, maker-checker, decisão ilegal e contestação. Case ID e timeline devem permanecer consistentes.

### 15. Admin/Developer

Testar draft/versioning, validação, simulação, diff, aprovação/publicação, self-approval bloqueado, rollback por versão, provider routing, economic_group, users/roles, API key lifecycle, scopes, signed webhook, replay protection, sandbox e logs.

### 16. Console Mutual

Testar multi-tenant authorized views, provider health, kill switch, incident, model governance, provisioning, third-party risk, audit access, jobs/queues, gates, release e production verification. Toda ação privilegiada deve ser evidenciada.

### 17. Evidência de homologação

Por Screen ID guardar: commit SHA/PR, ambiente, build/release, test IDs, screenshots complementares, logs/correlation quando aplicável, resultado de accessibility/responsive, gaps/waivers, executor e reviewer por papel. Screenshot nunca substitui teste server-side.

### 18. Resultado do gate

- **PASS:** todos os critérios aplicáveis comprovados.
- **PASS_WITH_RESTRICTION:** restrição aceita formalmente, sem violar hard invariant, com prazo/owner/gap.
- **FAIL:** critério crítico/alto não atendido.
- **NOT_TESTED:** não há evidência; não pode ser interpretado como PASS.

### 19. Regra de release

Uma tela pode estar CODE_COMPLETE e continuar não homologada. D14 só pode considerar a cobertura de telas como aprovada quando o registry tiver evidência. Nenhum release regulado deve usar número de telas ou build verde como prova única de prontidão.

### Regra de maturidade documental

Este documento é CANONICAL como definição do gate de homologação UX/front. Seu status não significa que qualquer Screen ID esteja homologado. PASS/PASS_WITH_RESTRICTION somente existe mediante evidência registrada; NOT_TESTED/NOT_EVIDENCED nunca pode ser interpretado como aprovação.

---

## Parte IV — ONB-QA-004: Gates de Homologação Regulatória, CCS e Auditoria (v1.0)

**Subtítulo:** Critérios de no-go para obrigações regulatórias aplicáveis
**Classificação/status:** CANONICAL REGULATORY QA GATE — PASS somente com aplicabilidade decidida e evidência
**Owner por papel:** QA / Compliance / Jurídico / Segurança / Release
**Uso:** Interno — produto, compliance, arquitetura, engenharia, QA e auditoria

> Princípio de uso: este documento especifica controles do produto. Não substitui parecer jurídico/regulatório nem dispensa validação de aplicabilidade pela área competente.

### 1. Objetivo

Impedir que uma jornada, tenant, Regulatory Pack ou release seja promovida quando existir obrigação regulatória considerada aplicável sem implementação, teste ou evidência suficiente.

### 2. Gate RG-01 — Aplicabilidade e fonte

- Regulatory requirement possui ID, `source_url` oficial, norm/regime, versão/effective window e owner.
- Aplicabilidade por tenant/entidade/produto/jurisdição foi decidida e auditada.
- REVIEW_REQUIRED material bloqueia automação/release do escopo dependente.
- Nenhuma regra depende exclusivamente de texto copiado em ticket ou memória do time.

### 3. Gate RG-02 — Declarações e dados

- DeclarationDefinition versionada, trigger/mandatory/validation server-side e localisation correta.
- Resposta e mudança posterior auditáveis; sensitive classification e retention definidas.
- Termos/aceites têm version/hash/evidence e suportam supersession/withdrawal quando aplicável.
- Frontend não contém regra normativa paralela divergente do catálogo.

### 4. Gate RG-03 — Auditoria e evidência

- 100% das mutações materiais mapeadas em eventos/audit records esperados.
- Actor/authority/correlation obrigatórios nos caminhos aplicáveis.
- No PII/secrets proibidos em logs/event payloads; evidence refs íntegros e autorizados.
- Replay/idempotency tests provam ausência de efeitos duplicados.
- Cross-tenant negative tests e self-approval negative tests passam.
- Export/dossier/report preservam hash, schema/version, filtros/escopo e evento de geração.

### 5. Gate RG-04 — CCS

- Só executa para applicability=APPLICABLE; unknown/review bloqueia geração automática.
- Adapter usa XSD/layout oficial vigente, version-pinned e com hash/ref.
- ACCS aplicáveis possuem fixtures, schema validation, parser de respostas/ocorrências e reconciliação.
- Geração é determinística para mesmo snapshot lógico e idempotent batch key.
- Hash/count/input snapshot e transmission/response refs formam evidence bundle completo.
- Canal/transmissão e operação foram homologados antes de produção.
- Runbook cobre rejeição, ocorrência, correção, reenvio, indisponibilidade e fallback operacional permitido.

### 6. Gate RG-05 — Change management

- Mudança normativa gera impact analysis e diff de pack.
- Breaking schema/mapping usa nova versão, nunca reinterpreta arquivo histórico silenciosamente.
- Testes de regressão identificam cases/tenants afetados.
- Effective date e plano de rollout/migração foram definidos.
- Compliance/Jurídico aprovou mudança material conforme authority matrix.
- Evidence bundle de release contém source change, diff, tests, approval e production verification.

### 7. Gate RG-06 — Segurança/privacidade

- RLS/authorization e segregation of duties aplicáveis estão ativas.
- Retention/legal hold/delete/crypto-shred respeitam pack/regime aplicável e são demonstráveis.
- Encryption/key management e access logs cobrem dados e artefatos regulatórios.
- Export/download/redelivery/replay privilegiados exigem autorização e auditoria.
- Observabilidade cobre erros, filas, delivery, CCS failures e drift sem expor PII.

### 8. Matriz de decisão

| Resultado | Condição | Efeito |
|---|---|---|
| PASS | Todos controles aplicáveis comprovados | Pode avançar ao próximo gate |
| PASS_WITH_RESTRICTION | Restrição não material, documentada, owner e prazo; waiver formal quando permitido | Avança somente no escopo autorizado |
| BLOCKED | Falta estrutural, applicability incerta material, teste/evidência ausente ou Critical/High relevante | Não avança |
| NOT_APPLICABLE | Obrigação formalmente não aplicável, com razão e versão | Não bloqueia aquele escopo; decisão fica auditada |

### 9. Evidência mínima por gate

Requirement/pack version, owner/approval, source/version, code commit/PR quando implementado, migrations/schemas, automated tests, CI run, security evidence, sample output sanitizado, audit/events proof, operational runbook e production verification quando aplicável.

### 10. Regra de maturidade do gate

RG-01..RG-06 são definições CANONICAL de no-go/aceite regulatório. O status CANONICAL deste documento não significa que qualquer gate esteja PASS. Resultado de gate é calculado por escopo (tenant, entidade, produto, pack, jurisdição e release) e depende de aplicabilidade formal, implementação e evidence records observados.

REVIEW_REQUIRED material, obrigação aplicável sem implementação, ou ausência de evidência requerida resultam em BLOCKED/FAIL para o escopo dependente. NOT_APPLICABLE somente é válido com decisão, razão e versão auditáveis.

> As fontes oficiais BCB referenciadas por este documento (CCS, Resolução BCB 179/2022, Leiautes RSFN, Circular 3.978/2020, Manual da Supervisão, Resolução CMN 4.893, Resolução BCB 85) estão listadas na seção "Fontes oficiais e referências" do arquivo `12_COMPLIANCE_REGULATORIO_E_LGPD.md`.

---

## Parte V — ONB-SEC-001: Threat Model e Test Spec CAP-19 / W1-006 — Login e Sessão (v1.0)

**Versão:** 1.0 — 2026-08-09

### 1. Escopo e autoridade

Artefato de preparação de segurança subordinado a RDY-CAP19-001, SRC-051, ADR-006/023/034 e GAP-ONB-023. Base técnica observada: main SHA `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`. GitHub somente consulta read-only.

### 2. Controles existentes observados

- senha derivada com scrypt, salt aleatório e parâmetros persistidos no próprio hash;
- comparação timing-safe;
- resposta uniforme para e-mail inexistente/senha incorreta;
- sessão com segredo aleatório e somente digest SHA-256 persistido;
- janela absoluta de 12h e inatividade de 30 min;
- revogação de sessão por saída/inatividade/expiração/usuário inativo;
- `tenant_id` associado a usuário e sessão;
- credenciais demo marcadas explicitamente.

Esses controles são positivos, porém **não fecham o hardening**.

### 3. Ameaças não evidenciadas/pendentes

| ID | Ameaça |
|---|---|
| TM-01 | Brute force/credential stuffing sem rate limit comprovado. |
| TM-02 | Ausência de MFA/step-up para papéis privilegiados. |
| TM-03 | Recuperação/reset de senha não evidenciados. |
| TM-04 | Sessão após troca/reset de senha precisa revogação comprovada E2E. |
| TM-05 | Fixation/replay/cookie rotation pós-login não evidenciada. |
| TM-06 | Trusted proxy/IP provenance precisa política explícita. |
| TM-07 | Admin/aprovador sob risco maior exige controles proporcionais. |
| TM-08 | Demo credentials devem ser impossíveis fora de ambiente de avaliação. |
| TM-09 | Lockout excessivo não pode virar DoS de usuário legítimo. |
| TM-10 | Audit de falhas/sucessos privilegiados deve minimizar PII e preservar correlation. |

### 4. Controles mínimos propostos

- rate limiting adaptativo por conta/IP/device signal sem revelar existência da conta;
- step-up/MFA obrigatório para administrador/aprovador e ações sensíveis conforme policy;
- reset/recovery com token one-time, digest persistido, expiração curta e revogação de sessões;
- rotation de session secret após autenticação/elevação sensível;
- cookie HttpOnly/Secure/SameSite e CSRF posture coerente com arquitetura;
- política de proxy confiável e parsing seguro de x-forwarded-for;
- detecção/audit de tentativas anômalas sem armazenar senha/token;
- demo account hard-deny em produção por configuração server-side.

### 5. Especificação de testes

| Test ID | Especificação |
|---|---|
| AUTH-NEG-001 | 20+ tentativas inválidas => rate control sem enumeração de conta. |
| AUTH-NEG-002 | Usuário inexistente e senha errada mantêm resposta equivalente. |
| AUTH-MFA-001 | Admin/aprovador sem MFA/step-up => ação privilegiada negada. |
| AUTH-REC-001 | Token de recuperação expirado/usado => reject. |
| AUTH-REC-002 | Reset válido => todas sessões antigas revogadas. |
| AUTH-SES-001 | Segredo antigo após rotação => reject. |
| AUTH-SES-002 | Sessão expirada 12h => reject. |
| AUTH-SES-003 | Inatividade >=30min => reject. |
| AUTH-SES-004 | Usuário inativado => sessão rejeitada/revogada. |
| AUTH-SES-005 | Sessão tenant A apresentada em tenant B => reject. |
| AUTH-COOKIE-001 | Cookie em produção possui Secure/HttpOnly/SameSite conforme política. |
| AUTH-PROXY-001 | Header de IP não confiável não define provenance privilegiada. |
| AUTH-DEMO-001 | Seed/demo credential em ambiente não-demo => hard fail. |
| AUTH-AUD-001 | Evento de login/reset/revogação registra actor/system, correlation e reason sem secret/PII excessiva. |

### 6. Critérios de aceite

- AC-AUTH-01: brute force e credential stuffing têm mitigação testada.
- AC-AUTH-02: privileged roles exigem MFA/step-up definido por policy.
- AC-AUTH-03: reset/recovery não reutiliza token e revoga sessões.
- AC-AUTH-04: fixation/replay são cobertos por rotação/revogação.
- AC-AUTH-05: sessão é tenant-bound e fail-closed.
- AC-AUTH-06: demo credentials não existem em produção.
- AC-AUTH-07: logs/audit não contêm senha, session secret ou token bruto.

### 7. Evidência esperada

Threat model aprovado; implementação autorizada; test IDs/resultados; security review; session/audit samples minimizados; rate-limit/MFA/recovery evidence; CI do próprio SHA; gate G1/G9. Este documento é preparação de testes, não prova de controle implementado.

### 8. Estado

TASK-W1-006 = BLOCKED. GAP-023 = OPEN. CAP-19 = PARTIAL/BLOCKED_NOT_READY. ADR-034 impede implementação e execução técnica.

---

## Parte VI — ONB-SEC-002: Incidente de Exposição de Chave Mestra Dev (GAP-ONB-054)

### VI.A — Registro de Incidente de Segurança (v0.1)

**Documento:** ONB-SEC-002_REGISTRO_INCIDENTE_EXPOSICAO_CHAVE_MESTRA_DEV_v0.1
**Classificação:** CANONICAL | **Estado do incidente:** OPEN | **Severidade:** CRÍTICA
**Objetos relacionados:** GAP-ONB-054 · FIND-036 · G9 · ADR-034

#### 1. Objetivo

Registrar de forma auditável a exposição de uma chave mestra de cifra de desenvolvimento em workflow versionado do repositório canônico, sem reproduzir o segredo, preservando evidência, escopo conhecido, lacunas e critérios de fechamento.

#### 2. Evidência confirmada

- Leitura estritamente read-only do commit `743ca573ae6a8dbf51c0f75967db4235513e8962` confirmou que o workflow `.github/workflows/publicar-prototipo.yml` contém uma chave mestra de desenvolvimento hardcoded em texto claro.
- O valor da chave NÃO é reproduzido neste documento, no Registro Mestre, em mensagens ou em qualquer outra evidência documental.
- O repositório está privado no estado atual verificado. O ciclo 3 reportou que o repositório esteve público anteriormente; o período e a extensão da exposição histórica permanecem a delimitar por evidência própria.

#### 3. Impacto e escopo

A simples presença de uma chave mestra versionada é um finding crítico de segurança. Até prova em contrário, devem permanecer NOT_EVIDENCED:

- uso da chave por runtime;
- reutilização em homologação ou produção;
- existência de dados reais cifrados ou embrulhados por essa chave;
- período efetivo de exposição pública;
- ocorrência de acesso indevido.

Não se deve inferir comprometimento de produção sem evidência, mas também não se deve considerar o risco encerrado apenas porque a chave era rotulada como desenvolvimento.

#### 4. Remediação obrigatória

A remediação exige, fora desta rodada documental e sob autorização compatível com ADR-034:

- rotacionar ou revogar a chave exposta;
- verificar reuso em desenvolvimento, homologação, produção, secrets, artefatos e histórico;
- determinar se existe material cifrado dependente da chave e se recriptografia ou re-envelopamento é necessário;
- remover o valor versionado somente depois da rotação/revogação;
- implementar secret scanning e controles de prevenção aplicáveis;
- preservar evidência de cada ação executada.

#### 5. Critérios de fechamento

GAP-ONB-054 e este incidente permanecem OPEN até existir Evidence Observed suficiente para comprovar:

- rotação ou revogação concluída;
- ausência de reuso em homologação/produção, ou remediação completa do reuso encontrado;
- escopo histórico documentado;
- confirmação do impacto sobre dados, ambientes e artefatos;
- controles preventivos implantados e evidenciados;
- reassessment do gate G9 quando aplicável.

#### 6. Governança

ADR-034 permanece vigente. Esta rodada não altera GitHub, secrets, ambientes, banco, CI ou infraestrutura. O registro documental do incidente NÃO equivale à remediação técnica. Nenhum segredo deve ser copiado para ticket, documento, chat, log ou evidência.

#### 7. Estado atual (v0.1)

- ✅ Exposição em workflow versionado: CONFIRMADA.
- ✅ Valor sensível omitido do registro: CONFIRMADO.
- ✅ Repositório atualmente privado: CONFIRMADO.
- ⚠️ Exposição pública histórica: REPORTADA NO CICLO 3 / ESCOPO A CONFIRMAR.
- ⚠️ Rotação ou revogação: NOT_EVIDENCED.
- ⚠️ Reuso em homologação/produção: NOT_EVIDENCED.
- ⚠️ Uso em runtime: NOT_EVIDENCED.
- ⛔ Fechamento do GAP-ONB-054: BLOQUEADO até evidência de remediação.
- ❌ Não realizar remediação via GitHub enquanto ADR-034 vigorar, salvo exceção explícita e nominal do Program Owner.

### VI.B — Evidência de Contenção GAP-ONB-054 (v1.1, supersede v1.0)

**Classificação:** CANONICAL_EXECUTION_SUPPORT — uso interno Mutual
**Versão:** 1.1 — supersede a v1.0 (File ID 1874wAKxdZ3lEXegCHyx0eeaJ4Ssedhe5rtelog7EN34), que é preservada como histórico
**Data-base:** 2026-08-09 | **Timezone:** America/Sao_Paulo
**Pasta canônica:** 00_EXECUCAO_CANONICA / 07_QA_SEGURANCA_E_HOMOLOGACAO
**Gap coberto:** GAP-ONB-054 — OPEN / CRITICAL
**ADRs invocados:** ADR-034 · ADR-036 · ADR-036-A · ADR-037
**Ressalva permanente:** REMOTE_CURRENT_STATE_NOT_VERIFIED, inclusive quanto à existência das branches no remoto

> **ATENÇÃO** — Este documento NÃO fecha GAP-ONB-054, não altera sua severidade, não torna G9 PASS, não libera W1, não autoriza merge e não restaura o sigilo da chave. PROIBIDO reproduzir neste documento, em qualquer hipótese, o valor da chave ou de qualquer outro segredo.

#### 1. Objeto

Chave mestra de cifra identificada pelo nome `CHAVE_MESTRA_DEV`, exposta em arquivos rastreados do repositório canônico `Mutual-Processadora-de-Pagamentos/onboarding-corporativo`.

| Fato | Evidência | Data |
|---|---|---|
| Valor em arquivo rastreado — página inicial do repositório | README.md:119 | commit 3bd3940, 2026-08-07 |
| Valor em arquivo rastreado — workflow de publicação | .github/workflows/publicar-prototipo.yml:47 | commit 6859189, 2026-08-08 |
| Repositório público | observado | 2026-08-08, aprox. 11h30 |
| Ocorrências do NOME | 13 ocorrências em 12 arquivos | ciclo 3 |
| Ocorrências com VALOR em arquivo rastreado | 2 (README.md:119 e workflow:47) | ciclo 3 |
| Consumo por código de aplicação | web-jornada/lib/fluxo.ts:54 e delegada.ts:38 alimentam o EmbrulhadorLocal, que embrulha chaves de titular | ciclo 3 |

Classificação da chave, fixada pelo Program Owner: **COMPROMISED / NEVER REUSE**, independentemente do resultado de F0.3.

Registro de inventário desatualizado: TECH-012 classifica publicar-prototipo.yml como PROTOTYPE sem mencionar segredo algum, e não cobre README.md. Correção documental pendente.

#### 2. Matriz A6 — Evidence Observed exigida

Estados: `PENDING` · `IN_PROGRESS` · `EVIDENCED` · `NOT_APPLICABLE` (com justificativa escrita).

| # | Item A6 | Dono | Estado | Evidência |
|---|---|---|---|---|
| 1 | Evidência de rotação/revogação | Operador | PENDING | (preencher — seção 6.1) |
| 2 | Evidência do estado do Pages | Operador | PENDING | (preencher — seção 6.2) |
| 3 | Resultado de F0.3 — SECRET_IN_ARTIFACT | Agente | EVIDENCED | NOT_EMBEDDED — seção 3.1 |
| 4 | Resultado de F0.4 — PAGES_DEPLOYMENT | Operador | PENDING | NOT_EVIDENCED pelo agente; evidência autoritativa é do operador — seções 3.2 e 6.3 |
| 5 | Diff restrito ao escopo ADR-036/036-A | Agente | EVIDENCED | 3 arquivos em 8c2af19 — seção 5 |
| 6 | Ausência de segredo em diff, log e relatório | Agente | EVIDENCED | linhas adicionadas 0 · árvore final 0 · log e mensagens 0 — seção 5 |
| 7 | Workflow final não republica por push→main | Agente | EVIDENCED | workflow removido integralmente; 0 ocorrências de todos os marcadores em .github/ — seção 5 |
| 8 | Avaliação de reuso da chave | Operador | PENDING | (preencher — seção 6.4) |
| 9 | Avaliação de envelopes/dados dependentes da chave antiga | Operador | PENDING | (preencher — seção 6.5) |

**Situação:** 4 de 4 itens do agente EVIDENCED · 0 de 5 itens do operador EVIDENCED.
**Condição de merge:** os nove itens EVIDENCED. Faltam 1, 2, 4, 8 e 9 — todos do operador.

Observação estrutural: o item 4 não é produzível pelo agente sob ADR-034 — o estado do deployment do Pages é configuração do GitHub, não conteúdo de arquivo. O retorno NOT_EVIDENCED é o comportamento correto do agente, não uma falha.

#### 3. Resultados da Fase 0 — análise read-only

##### 3.1 F0.3 — SECRET_IN_ARTIFACT = NOT_EMBEDDED

Rastreio: workflow:47 → workflow:74 (escrita de .env.local antes do build) → turbo.json:5 → fluxo.ts:54 e delegada.ts:38 → EmbrulhadorLocal (delegada.ts:40).

Três provas independentes, cada uma suficiente:

1. Sem prefixo de exposição ao cliente. Busca por `NEXT_PUBLIC_` ou equivalente em apps, packages e scripts retorna zero. Nenhum next.config.ts declara bloco env.
2. Consumidores são server-only. fluxo.ts:1 e delegada.ts:1.
3. O artefato publicado não contém JavaScript. O espelho remove todos os `<script>` (espelhar-prototipo.mjs:230).

Efeito sobre o risco: descarta a contingência de chave servida em URL pública. **NÃO reduz GAP-ONB-054** — a chave permanece no histórico Git e em todo clone ou fork existente.

Domínio de validade: vale para o ref local ed3f53fe. Não se estende a builds anteriores cuja configuração possa ter divergido.

##### 3.2 F0.4 — PAGES_DEPLOYMENT = NOT_EVIDENCED

Sinais legíveis localmente, todos negativos ou inconclusivos: badge ausente; CNAME inexistente; branch gh-pages ausente; site/ ignorado por .gitignore:11; nenhum basePath. O diretório site aparece como configuração do workflow, não como estado de deployment.

O diretório site/ presente localmente é resíduo de execução em sessão anterior ao regime ADR-034 — não é evidência de deploy.

Ação proibida que seria necessária para elevar o estado: consulta à API do GitHub (pages, deployments, workflow runs) ou requisição HTTP à URL do Pages.

Conclusão: ausência de prova não é prova de ausência (A5). A evidência autoritativa cabe ao operador.

##### 3.3 F0.2 — Superfície publicada

O artefato publicava as três superfícies: jornada (3001), painel do analista (3002) e console de administração (3003) — espelhar-prototipo.mjs:36-40, workflow:87-89. Estático puro: HTML, CSS, index.html e .nojekyll, em `path: site` (workflow:105). Sem basePath/assetPrefix. Sem variável apontando para banco ou API real no artefato.

O site servia as telas de painel e administração com dados de `semear:demo` (workflow:77). Não é segredo, mas é superfície interna exposta: revela estrutura de tela, nomenclatura de campo e fluxo de decisão de compliance. Registrado como **FIND-046**.

##### 3.4 F0.1 — Superfície de gatilho

| Workflow | Gatilhos | Permissões |
|---|---|---|
| qualidade.yml | push [main, develop, "claude/**"] (:4-5); pull_request sem branches, sem paths, sem types (:6) | bloco permissions ausente — herda o default do repositório |
| publicar-prototipo.yml | push [main] (:12-13); workflow_dispatch (:14) | contents: read, pages: write, id-token: write (:22-25) |

Consequência operacional: abrir Pull Request, inclusive Draft, dispara qualidade.yml por :6. A abertura de PR é, portanto, ato de execução e permanece fora do que o agente pode fazer sob ADR-034 — é ação do operador. Registrado como **FIND-047**.

##### 3.5 Achado crítico — enablement: true

publicar-prototipo.yml:102-103 usava `actions/configure-pages@v5` com `enablement: true`.

- **Efeito:** se o operador despublicasse o Pages e qualquer push ocorresse em main, o job religaria o Pages e republicaria, silenciosamente.
- **Consequência sobre a ordem de contenção:** neutralizar o gatilho deixou de ser higiene e passou a ser pré-requisito da despublicação. A ordem originalmente proposta — despublicar e depois editar — foi corrigida.
- **Consequência residual:** enquanto o commit de remediação não for mergeado, `enablement: true` permanece vivo em main. A branch não protege main. Contenção adotada: desabilitação de GitHub Actions no repositório, ato do Program Owner, reversível.

> ⚠️ A contenção é reversível nos dois sentidos: reabilitar Actions com o workflow ainda em main restaura os três mecanismos de uma vez. A contenção compra tempo; o merge é que remove a capacidade.

#### 4. Ativação do ADR-036-A — CASO 3

F0.3 = NOT_EMBEDDED e F0.4 = NOT_EVIDENCED → CASO 3 pela definição da A5.

Decisão do Program Owner: neutralização ATIVADA, pela cláusula própria da A5 — o workflow permanecia capaz de republicar material e configuração comprometidos. Três mecanismos independentes, cada um suficiente:

1. gatilho `on: push branches [main]` (:12-13);
2. env `CHAVE_MESTRA_DEV` (:47), que reusava a credencial comprometida a cada execução, contra a premissa NEVER REUSE;
3. `enablement: true` (:102-103), que revertia a despublicação do operador.

Forma executada: remoção integral do workflow (A2, alternativa 2). Dependência verificada: nenhuma. A única referência ao workflow em todo o repositório era ele próprio; espelhar-prototipo.mjs sobrevive por package.json:18; o gate verificar (package.json:14) não inclui o protótipo. Nenhum gate quebrou. workflow_dispatch não foi preservado — sem necessidade demonstrável.

##### Risco residual declarado

| Risco | Estado |
|---|---|
| Chave servida em URL pública | DESCARTADO — F0.3, três provas |
| Chave em arquivo rastreado | REMEDIADO NA BRANCH — vivo em main até o merge |
| Chave no histórico Git, em clones e forks | ATIVO — irremediável por edição |
| Site no ar servindo painel e console | NOT_EVIDENCED |
| Republicação automática por push→main | ATIVO em main — mitigado por Actions desabilitado |
| Religamento automático do Pages | ATIVO em main — mitigado por Actions desabilitado |

#### 5. Execução da remediação — Fase 1-R

Branch: `onb/adr036-remediacao-secret-v2` · Base: origin/main = ed3f53fe · HEAD: `8c2af19d8a4291aa68823dddc4f7b8f133a8645d` · Push: [new branch] reportado. Nenhum PR aberto.

##### 5.1 Commits, um por alvo

| SHA | Mensagem |
|---|---|
| d3093a6 | [SEC][ADR-036] remover chave exposta do README |
| f66b6f2 | [SEC][ADR-036-A] remover workflow de publicacao do prototipo |
| 8c2af19 | [GOV][ADR-036] alinhar bloco de verificacao do CLAUDE.md ao ADR-034 |

`git diff --stat ed3f53fe..HEAD` → 3 files changed, 20 insertions, 120 deletions.

##### 5.2 Conteúdo por alvo

- **README.md (+8/−5).** Asserção do script confirmou a chave exatamente em :119, como o escopo previa. A chave passa a ser gerada na máquina de quem roda — 32 bytes de /dev/urandom em base64url. O heredoc deixou de ser aspado para expandir a variável; verificado que a linha do DATABASE_URL não contém `$`. O parágrafo que afirmava não se tratar de segredo foi reescrito.
  - ⚠️ Mudança de comportamento de setup a comunicar: quem seguir o README passa a ter chave própria. Ambientes existentes com a chave antiga divergirão — comportamento desejado, não defeito.
- **.github/workflows/publicar-prototipo.yml.** Removido integralmente (−115). Elimina oito capacidades: push→main (:12-13), workflow_dispatch (:14), pages: write e id-token: write (:22-25), env com a chave (:47), materialização em .env.local (:74), configure-pages com enablement: true (:102-103), upload-pages-artifact (:104-105) e deploy-pages (:115).
- **CLAUDE.md (+9/−0).** O bloco :49-61 passa a ser referência, não instrução, enquanto ADR-034 vigorar. Nenhum comando apagado; parágrafo técnico intacto, para voltar a valer na revogação.

##### 5.3 Medição — 15 de 15 aprovam

Base ed3f53fe · arquivos no diff 3 · docs/execucao no diff 0 · qualidade.yml no diff 0 · commits 3, um por alvo · segredo em linhas adicionadas 0 · segredo na árvore final 0 · segredo em log e mensagens 0 · push→main 0 · workflow_dispatch 0 · pages:write 0 · id-token:write 0 · enablement 0 · configure/deploy/upload-pages 0 · PR, merges, workflows disparados e commits reescritos 0 · 77de0ae alterado: não.

Árvore final: único workflow é qualidade.yml. Gatilhos remanescentes: qualidade.yml:3-6. Nenhum caminho de publicação automática permanece na branch.

##### 5.4 Histórico preservado

A primeira tentativa — branch `onb/adr036-remediacao-secret`, commit 77de0ae — permanece intocada e órfã por decisão do Program Owner. Sem reset, revert, force-push ou exclusão. Duas propostas coexistem; a v2 é a escolhida por ser mínima (3 arquivos, contra 13 da anterior, que carregava 10 arquivos de docs/execucao/).

##### 5.5 Medição reformulada — padrão permanente

A medição original exigia "segredos no diff = 0", impossível por construção: remover um segredo de arquivo rastreado necessariamente o grava como linha removida no commit que o remove. Reformulação adotada como padrão para toda remediação de segredo futura:

```
segredos em linhas ADICIONADAS do diff = 0
segredos na árvore final                = 0
segredos em log e mensagens de commit   = 0
```

Linhas removidas contendo o segredo são esperadas e não reprovam.

**Princípio registrado:** quando uma medição é impossível por construção, corrige-se a regra, nunca a execução.

#### 6. Campos de evidência do operador — PENDENTES

> Os campos abaixo estão intencionalmente em branco na fonte: são formulários a preencher pelo operador.

##### 6.1 Item 1 — Rotação / revogação

- Data e hora (America/Sao_Paulo):
- Mecanismo de geração da nova chave:
- Ambientes onde a chave antiga existia:
- Ambientes atualizados:
- A chave antiga foi invalidada? (sim / não / não aplicável):
- Executado por (papel):

##### 6.2 Item 2 — Estado do Pages

- Data e hora da verificação:
- Settings → Pages exibia:
- URL testada em janela anônima:
- Código de resposta (200 / 404 / outro):
- Environment github-pages existe? Deployments listados?
- Se PUBLISHED — hora do unpublish:
- Hora do 404 confirmado:
- Segunda confirmação, após propagação de CDN:

##### 6.3 Item 4 — Declaração de PAGES_DEPLOYMENT

- TOKEN DECLARADO: PUBLISHED | UNPUBLISHED | NOT_EVIDENCED
- Base da declaração:
- UNPUBLISHED exige as três condições simultâneas — Pages desabilitado, URL em 404 e nenhum deployment ativo. Visibilidade privada do repositório não produz UNPUBLISHED (A1.3).

##### 6.4 Item 8 — Avaliação de reuso

- A chave, ou derivada, existe em homologação?
- Em produção?
- Em outro repositório?
- Em backup, dump ou máquina de terceiro?
- Conclusão:

##### 6.5 Item 9 — Avaliação de envelopes

- Existe dado cifrado com a chave antiga?
- Volume e natureza (real / demonstração):
- Decisão: re-embrulho com chave nova | descarte | NOT_APPLICABLE
- Justificativa:

Itens 8 e 9 são os únicos cuja decisão é de arquitetura, não de operação. Conforme A4, são o remédio efetivo: ROTATE/REVOKE + REUSE ASSESSMENT + DATA/ENVELOPE IMPACT ASSESSMENT. Rotação protege o dado novo; não protege o dado já cifrado.

#### 7. Limite da contenção — A4

```
UNPUBLISH            != SECRET RESTORED
REPOSITORY_PRIVATE   != SECRET RESTORED
REPOSITORY_PRIVATE   != PAGES_CONFIRMED_UNPUBLISHED
REMOVER              != ROTACIONAR
```

O commit que remove o segredo é, ele próprio, um registro do segredo. As linhas removidas permanecem em 3bd3940 e 6859189, nos clones e nos forks. Cópias podem persistir em caches, mecanismos de busca, arquivos web, logs, artefatos e máquinas de terceiros.

**GAP-ONB-054 não muda de severidade. Permanece OPEN / CRITICAL.**

#### 8. Sequência operacional pendente

| Ordem | Ação | Dono | Estado |
|---|---|---|---|
| 1 | Abrir Draft PR de onb/adr036-remediacao-secret-v2 → main, anotando que o CI não executa por Actions estar desabilitado | Operador | PENDENTE |
| 2 | Rotacionar a chave (item 1 da A6) | Operador | PENDENTE |
| 3 | Avaliação de reuso e de envelopes (itens 8 e 9) | Operador / Arquitetura | PENDENTE |
| 4 | Decisão de merge, com os nove itens da A6 EVIDENCED | Program Owner | BLOQUEADO |
| 5 | Reabilitar Actions — somente após o merge | Operador | BLOQUEADO |
| 6 | Verificar e, se PUBLISHED, despublicar o Pages — somente após o merge | Operador | BLOQUEADO |

> ⚠️ Os passos 5 e 6 só após o merge: antes dele, `enablement: true` continua em main e reverte a despublicação.

#### 9. Findings associados

| ID | Descrição |
|---|---|
| FIND-036 | Chave mestra de cifra exposta em workflow versionado |
| FIND-038 | Valor presente em README.md rastreado desde 2026-08-07; consumo por código de aplicação, não apenas por workflow |
| FIND-040 | CONTAS_DEMO com senha exportada em sessao.ts:135-141 do PR #4 — anti-requisito de TASK-W1-001 e de merge do PR #4 |
| FIND-045 | Padrão recorrente de erro de auditoria: premissa formada cedo, aplicada além do domínio de validade. Mitigação: declarar o domínio de validade junto de cada achado |
| FIND-046 | Pages publicava painel do analista e console de administração com dados semeados. Se o PR #4 entrar em main, a tela de login com CONTAS_DEMO passaria a ser espelhada |
| FIND-047 | qualidade.yml:6 usa on: pull_request sem branches, sem paths e sem types — qualquer PR, inclusive rascunho, executa o pipeline inteiro. Governança de CI, a tratar quando ADR-034 for revogado |

#### 10. Estado de governança

```
ADR-034     = CANONICAL / ACTIVE — reassumiu integralmente
ADR-036     = CANONICAL / ACTIVE EXCEPTION — escopo executado
ADR-036-A   = CANONICAL / CONDITIONAL EXTENSION — ATIVADO e executado
ADR-037     = CANONICAL
GAP-ONB-054 = OPEN / CRITICAL — inalterado
G0 = PASS  ·  W0 = IN_PROGRESS  ·  W1 = BLOCKED  ·  G1 = NOT_STARTED
G9 = NÃO PASS
CAP-19 = PARTIAL / BLOCKED_NOT_READY (RDY-CAP19-001)
GitHub Actions = DESABILITADO (contenção reversível, EVIDENCE_OBSERVED do operador)
Pull Request   = ato de operador (FIND-047)
Merge          = NÃO AUTORIZADO — faltam itens 1, 2, 4, 8 e 9 da A6
CODE_COMPLETE != DONE
```

#### 11. Controle de versão

| Versão | Data | Alteração |
|---|---|---|
| 1.0 | 2026-08-09 | Criação. Matriz A6 com 9 itens e donos; resultados da Fase 0 (F0.1–F0.7); achado enablement: true; ativação do ADR-036-A em CASO 3; campos de evidência do operador |
| 1.1 | 2026-08-09 | Fase 1-R executada. Branch onb/adr036-remediacao-secret-v2 @ 8c2af19, base ed3f53fe, commits d3093a6/f66b6f2/8c2af19. Itens 5, 6 e 7 da A6 → EVIDENCED. Medição de segredo reformulada e adotada como padrão permanente. Branch anterior e 77de0ae preservados órfãos. Acrescentados FIND-047 e a seção 8 de sequência operacional. Nota sobre mudança de comportamento de setup no README |

---

## Parte VII — ONB-QA-005: Plano de Readiness W10 — UAT Mutual Cliente nº 1 (v1.0)

**Versão:** 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 1. Objetivo

Preparar a Wave 10 para UAT Mutual como primeiro cliente, cobrindo PF, PJ, MEI, naturezas regulatórias priorizadas, journeys assistidas/delegadas, negative cases e evidência de negócio, sem usar UAT para mascarar gaps de engenharia ou segurança.

### 2. Escopo canônico

- Todo o produto aplicável ao primeiro rollout Mutual, especialmente CAP-01..CAP-22 conforme packs ativos.
- Requirements: REQ-003..077 conforme applicability; destaque REQ-040/043/044/063/068/076/077.
- Gate: G10 e H-01..H-17 conforme aplicabilidade.

### 3. Pré-condições

Waves/gates predecessores aplicáveis devem possuir Evidence Observed suficiente. G1..G9 não precisam representar cobertura universal de todo roadmap, mas todo blocker aplicável ao escopo UAT deve estar resolvido ou formalmente waived quando permitido. ADR-034 impede execução técnica/UAT enquanto não houver autorização compatível.

### 4. Pacote de UAT

| Item | Conteúdo |
|---|---|
| W10.1 | UAT scope matrix por tenant/channel/jurisdiction/segment/product/natureza. |
| W10.2 | Personas: solicitante PF, representante PJ, UBO/sócio, analista, gestor, aprovador, admin, suporte e developer quando aplicável. |
| W10.3 | Happy paths PF/PJ/MEI e naturezas regulatórias aprovadas. |
| W10.4 | Negative/edge paths: dados inválidos, provider degraded, evidência insuficiente, duplicidade, timeout, recovery, delegated invitation, access denied, cross-tenant/channel, self-approval. |
| W10.5 | Regulatory/applicability scenarios, declarações/consentimentos e evidence bundle. |
| W10.6 | H-14 correspondente_bancario e demais naturezas conforme prioridade. |
| W10.7 | UX/accessibility/responsive e estados loading/empty/error/degraded/unavailable. |
| W10.8 | Support/runbook UAT e incident handling. |
| W10.9 | Defect triage, retest e business sign-off. |
| W10.10 | Gate G10. |

### 5. Critérios de aceite

- **AC-W10-01:** cada cenário tem ID, preconditions, actor, tenant/channel, expected result, evidence e resultado.
- **AC-W10-02:** UAT não aceita mock/provider fake como evidência de operação real quando o cenário exige integração real.
- **AC-W10-03:** nenhum blocker Critical/High aplicável permanece sem resolução/waiver formal permitido.
- **AC-W10-04:** segregação, tenant/channel e audit/evidence são observáveis nos cenários críticos.
- **AC-W10-05:** erros/degraded states são compreensíveis e não induzem aprovação indevida.
- **AC-W10-06:** business sign-off é separado de QA técnico/security sign-off.
- **AC-W10-07:** toda não-conformidade gera defect/gap/evidence, nunca desaparece em ata informal.

### 6. Matriz mínima

- **PF:** cadastro, documento, screening, risco, decisão, consent/terms, recovery.
- **PJ/MEI:** registro, representantes, QSA/UBO quando aplicável, natureza, screening, risk, decision.
- **Delegated:** convite, expiry/revocation, isolamento e progress.
- **Regulatory:** applicability, declarations, corresponding-banking H-14 quando aplicável.
- **Admin/Dev:** config/publish/API/webhook somente se incluídos no escopo real do piloto.
- **Monitoring:** revalidation/rescreen somente se habilitado no scope.

### 7. Evidence expected

UAT plan; scenario IDs; execution records/screenshots/log refs minimizados; defects/retests; business sign-off; QA/security sign-offs; pack/applicability versions; release-scope matrix; H-gate evidence; G10 decision.

### 8. Governança de defeitos

- Critical blocker: NO-GO.
- High: NO-GO salvo waiver formal permitido, owner/mitigation/expiry e sem violar hard invariant.
- Medium/Low: disposition explícita e release decision.
- Nenhum defeito é fechado apenas por texto; exige retest/evidence quando técnico.

### 9. Visão de produto/cliente

UAT valida a experiência operacional completa, não apenas telas. Deve medir clareza, tempo, dropoff, suporte, explicabilidade, erro/degradação e aderência de operação/compliance. **Interface pronta ≠ operação pronta.**

### 10. Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G10: NOT_STARTED. H-14 permanece pendente. Este plano não executa UAT e não produz sign-off; depende de autorização e Evidence Observed das waves precedentes.

---

## Parte VIII — ONB-QA-006: Pacote Integrado de Readiness / Gate CAP-19 — W1-007 / G1 (v1.0)

**Versão:** 1.0 — 2026-08-09

### 1. Escopo e autoridade

Artefato subordinado a RDY-CAP19-001, SRC-051 e aos mapas técnicos W1-001..006. Este pacote prepara a decisão de readiness; não executa G1, não promove CAP-19 e não autoriza implementação. GitHub permanece estritamente consulta read-only por ADR-034.

### 2. Objetivo

Consolidar, numa única matriz de decisão, o que precisa estar observado para que CAP-19 possa sair de BLOCKED_NOT_READY e para que a parcela de CAP-19 aplicável a G1 seja avaliada. O gate G1 é mais amplo que CAP-19 e inclui outras fundações, inclusive CNPJ alfanumérico E2E (**GAP-ONB-004**).

### 3. Matriz de entrada por task

| Task / Gap | Conteúdo |
|---|---|
| W1-001 / GAP-009 + GAP-023 | IAM deny-by-default no web-console: sessão, tenant, membership/scopes/capability server-side, direct-call denial, audit. |
| W1-002 / GAP-011 | Tenant resolution: zero TENANT_DEV em runtime produtivo; credential/session -> authorized tenant context -> DB context -> RLS; cross-tenant/BOLA/IDOR negativos. |
| W1-003 / GAP-010 | Actor propagation e maker-checker: maker/checker user_id persistidos E2E, self-approval rejeitado no domínio/aplicação/DB, audit com correlation. |
| W1-004 / GAP-041 | Channel/ChannelBinding: tenant e channel distintos, bindings versionados, fail-closed, propagação por API/event/evidence/audit/telemetry. |
| W1-005 / GAP-042 | White-label/provisioning: profile/domain/channel bindings versionados, activation/rollback, region/features/jurisdiction explícitos e invariância de risk/compliance/auth/audit. |
| W1-006 / GAP-023 | Login/session hardening: rate control, privileged MFA/step-up, recovery/reset, revocation/rotation/replay/fixation, trusted proxy e audit seguro. |

### 4. Matriz integrada de testes negativos

| ID | Teste |
|---|---|
| INT-NEG-001 | Sem sessão -> mutação material rejeitada. |
| INT-NEG-002 | Sessão válida sem capability -> rejeitada. |
| INT-NEG-003 | Tenant ausente/ambíguo/forjado -> fail closed. |
| INT-NEG-004 | Tenant A acessa/escreve B -> reject em application + RLS. |
| INT-NEG-005 | Channel não autorizado/cross-channel -> reject. |
| INT-NEG-006 | Maker tenta checker do próprio artefato -> reject. |
| INT-NEG-007 | IDOR/BOLA com resource_id válido de outro tenant -> reject. |
| INT-NEG-008 | Cache/worker/event não atravessa tenant/channel. |
| INT-NEG-009 | Host/domain não verificado ou ambíguo -> não resolve tenant/channel. |
| INT-NEG-010 | Branding/content não muda decisão de risco/authorization/audit. |
| INT-NEG-011 | Sessão expirada/inativa/revogada -> reject. |
| INT-NEG-012 | Credential stuffing/brute force -> mitigação sem enumeração de conta. |
| INT-NEG-013 | Recovery token expirado/reutilizado -> reject. |
| INT-NEG-014 | Demo credential/config em ambiente não-demo -> hard fail. |

### 5. Evidência Observed mínima por task

Para cada W1-001..006 exigir: commit SHA autorizado; paths/schemas/migrations; IDs dos testes + resultados; CI do próprio SHA; negative security evidence; amostras minimizadas de audit/evidence/trace; mapping GAP -> fix -> test -> evidence; owner e gate decision.

### 6. Regras de decisão CAP-19

- **READY:** todos os blockers de CAP-19 fechados com Evidence Observed, dependências satisfeitas, matriz negativa PASS e nenhum risco crítico sem tratamento aceito.
- **READY_WITH_RESTRICTION:** somente para restrições não bloqueantes, com owner, prazo/condição, evidência e aceite explícito do gate; nunca para GAP-009/010/011/041 enquanto críticos.
- **BLOCKED:** qualquer blocker técnico aberto, ausência de Evidence Observed, falha de teste/gate ou impedimento operacional como ADR-034.

### 7. Regra de decisão G1

CAP-19 pronta é condição necessária para sua parcela de fundação, mas não suficiente para G1. O gate G1 permanece condicionado a tenant isolation, IDs, CNPJ alfanumérico E2E, auth/SoD e demais condições registradas. GAP-ONB-004 continua crítico e aberto; portanto não se pode declarar G1 PASS apenas pelo fechamento futuro de CAP-19.

### 8. Stop rules

- Não promover por documentação, intenção, PR não-main ou teste histórico;
- Não executar CI para gerar evidência enquanto ADR-034 proibir execução;
- Não editar migration histórica; correções usam migration compensatória futura conforme ADR-033;
- Não aceitar UI/protótipo como prova de operação server-authoritative;
- Não confundir CODE_COMPLETE com DONE;
- Não declarar release/produção sem gates, release artifact e production verification.

### 9. Estado atual consolidado

```
CAP-19 = PARTIAL / BLOCKED_NOT_READY.
TASK-W1-001..007 = BLOCKED.
W1 = BLOCKED.
G1 = NOT_STARTED.
ADR-034 = bloqueador operacional de write/execution no GitHub.
GAP-009/010/011/041 permanecem blockers críticos de CAP-19; GAP-042 é blocker alto;
GAP-023 permanece aberto; GAP-004 permanece blocker crítico separado do G1.
```

### 10. Próxima ação permitida

Enquanto ADR-034 vigorar, somente documentação, especificação, read-only review, procurement e preparação de testes/evidências. Nenhuma promoção de readiness é permitida sem execução técnica futura explicitamente autorizada e Evidence Observed.
