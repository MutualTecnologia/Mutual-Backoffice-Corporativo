---
titulo: "Execução e Readiness — Waves W1–W9, W11, Evidence/Release/Runbook Framework"
fontes:
  - "ONB-EXE-001_CAP19_READINESS_E_PLANO_DE_REMEDIACAO_W1_v1.0"
  - "ONB-EXE-002_MAPA_TECNICO_READ_ONLY_CAP19_W1_001_002_v1.0"
  - "ONB-EXE-003_MAPA_TECNICO_READ_ONLY_CAP19_W1_003_SOD_v1.0"
  - "ONB-EXE-004_MAPA_TECNICO_READ_ONLY_CAP19_W1_004_CHANNEL_CONTEXT_v1.0"
  - "ONB-EXE-005_MAPA_TECNICO_READ_ONLY_CAP19_W1_005_WHITE_LABEL_PROVISIONING_v1.0"
  - "ONB-EXE-006_PLANO_READINESS_W2_CASE_LIFECYCLE_JORNADA_v1.0 (truncado na fonte)"
  - "ONB-EXE-007_PLANO_READINESS_W3_IDENTIDADE_DOCUMENTOS_FRAUDE_v1.0"
  - "ONB-EXE-008_PLANO_READINESS_W4_KYB_FONTES_OFICIAIS_BRASIL_v1.0"
  - "ONB-EXE-009_PLANO_READINESS_W5_AML_EDD_HFS_v1.0"
  - "ONB-EXE-010_PLANO_READINESS_W6_DUE_DILIGENCE_PRIVACY_v1.0"
  - "ONB-EXE-011_PLANO_READINESS_W7_ADMIN_PRODUCTS_DEVELOPER_PLATFORM_v1.0"
  - "ONB-EXE-012_PLANO_READINESS_W8_MONITORAMENTO_HANDOFFS_v1.0"
  - "ONB-EXE-013_PLANO_READINESS_W9_RESILIENCIA_SEGURANCA_PERFORMANCE_v1.0"
  - "ONB-REL-001_PLANO_READINESS_W11_PILOTO_RELEASE_PRODUCTION_VERIFICATION_v1.0"
  - "ONB-EVD-001_EVIDENCE_RELEASE_E_RUNBOOK_FRAMEWORK_v1.0"
status_fonte: "CANONICAL_EXECUTION_PLAN / CANONICAL_EXECUTION_SUPPORT / READ_ONLY_EVIDENCE / CANONICAL EVIDENCE-RELEASE-RUNBOOK FRAMEWORK"
gerado_em: 2026-08-09
---

# 14 — Execução e Readiness: Waves W1–W9, W11 e Framework de Evidência/Release

Este documento consolida os planos de readiness e mapas técnicos read-only do programa Mutual Onboarding: readiness CAP-19 e plano de remediação da Wave 1 (ONB-EXE-001), os mapas técnicos read-only das tasks W1 (ONB-EXE-002..005), os planos de readiness das Waves 2 a 9 (ONB-EXE-006..013), o plano da Wave 11 de piloto/release/production verification (ONB-REL-001) e o framework de evidence/release/runbook (ONB-EVD-001).

Regra transversal a todos os documentos-fonte: **ADR-034 — GitHub consultation-only / no-write / no-execution**. Nenhum documento desta família autoriza implementação, merge, CI, deploy ou promoção de readiness; a promoção depende de autorização explícita do Program Owner e de nova evidência observada.

---

## 1. ONB-EXE-001 — CAP-19: Readiness e Plano de Remediação W1

- **Documento:** ONB-EXE-001_CAP19_READINESS_E_PLANO_DE_REMEDIACAO_W1_v1.0
- **Status:** CANONICAL_EXECUTION_PLAN / BLOCKED_FOR_TECHNICAL_EXECUTION
- **Data-base:** 09 de agosto de 2026
- **Capability:** CAP-19 — Multi-tenant / multicanal / white-label / idioma / domínio / região
- **Wave:** W1 — Compatibilidade e fundações P0
- **Gate alvo:** G1 — Fundações P0
- **Autoridade:** subordinado ao ONB-REG-001, ADRs e baseline documental ativa SRC-050
- **Regra operacional:** GitHub consultation-only / no-write / no-execution por ADR-034

### 1.1 Objetivo

Transformar o readiness da CAP-19 em unidade executável, sem criar nova autoridade de produto. O documento decompõe requisitos, gaps, acceptance criteria, testes, security controls, evidências esperadas, dependências e sequência de remediação para que a capability possa futuramente ser promovida de BLOCKED para READY/READY_WITH_RESTRICTION somente após autorização explícita para execução técnica e nova evidência observada.

### 1.2 Estado atual

CAP-19 permanece **PARTIAL** no baseline técnico e **DISCOVERED** no delivery status. A fundação positiva observada inclui RLS/FORCE RLS e modelo de tenant com região/domínio/tema/logotipo, porém o contexto E2E ainda não está fechado. **Nenhuma das CAP-01..22 está READY no corte vigente.**

Bloqueadores principais:

| Gap | Descrição | Severidade / Gates |
|---|---|---|
| GAP-ONB-009 | web-console sem autenticação/autorização completa | CRÍTICO / G1-G7 |
| GAP-ONB-010 | maker-checker sem prova E2E | CRÍTICO / G1-G7 |
| GAP-ONB-011 | TENANT_DEV hardcoded | CRÍTICO / G1 |
| GAP-ONB-041 | Channel não evidenciado como contexto de primeira classe E2E | CRÍTICO / G1-G7-G9 |
| GAP-ONB-042 | white-label sem governança E2E/versionamento/binding completo | ALTO / G1-G7-G9 |
| GAP-ONB-023 | hardening de login não evidenciado | MÉDIO / G9 |

Dependências transversais que não devem ser confundidas com fechamento da CAP-19:

- GAP-ONB-004 — CNPJ alfanumérico E2E, G1.
- GAP-ONB-014 — KMS/HSM produção, G1/G9.
- GAP-ONB-024 — enforcement de convenção de migrations, G1/G9.

### 1.3 Requirements canônicos diretos

- REQ-ONB-012 — isolamento estrutural por tenant e fail-closed sem tenant.
- REQ-ONB-013 — white-label configurável sem fork de código.
- REQ-ONB-048 — packs configuráveis por segmento sem forks.
- REQ-ONB-049 — jurisdição agnóstica.
- REQ-ONB-050 — tenant isolation também em DB/invariantes.
- REQ-ONB-053 — i18n/locale/timezone configuráveis.
- REQ-ONB-056 — Jurisdiction Policy Packs versionados.
- REQ-ONB-058 — região/residency/provider routes/features por tenant.
- REQ-ONB-064 — RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy versionados.
- REQ-ONB-067 — declarações regulatórias dinâmicas versionadas.
- REQ-ONB-069 — Tenant e Channel como dimensões distintas de primeira classe.
- REQ-ONB-070 — papéis econômicos/relationships sem enum rígido.
- REQ-ONB-073 — handoff preservando tenant/channel/correlation context.
- REQ-ONB-077 — termos/consentimentos preservando tenant/channel/locale/jurisdição.

Requisitos UX/segurança diretamente relevantes:

- RF-UX-012, RF-UX-029, RF-UX-030, RF-UX-031, RF-UX-045, RF-UX-050.
- RNF-UX-001, 002, 012, 014, 016, 017, 024, 025, 026, 033, 038.

### 1.4 Superfícies funcionais impactadas

| Superfície | Descrição | Estado |
|---|---|---|
| C12 | Marca/tema/idioma | NOT_EVIDENCED |
| C13 | Domínio/e-mail/canais | NOT_EVIDENCED |
| C14 | Usuários/papéis | NOT_EVIDENCED |
| C15 | Alçadas/segregação | NOT_EVIDENCED |
| D1 | Clientes/tenants | ABSENT |
| D9 | Provisioning/região/features | ABSENT |

Outras superfícies dependentes devem consumir contexto já resolvido; não podem inferir tenant ou channel no frontend.

### 1.5 Invariantes de arquitetura para CAP-19

1. **5.1** Tenant e Channel são dimensões distintas. Não existe relação 1:1 obrigatória.
2. **5.2** Session/API credential deve resolver membership/scopes e tenant context server-side.
3. **5.3** Ausência, ambiguidade ou conflito de tenant deve falhar fechado.
4. **5.4** Channel context, quando aplicável, deve ser resolvido/propagado por sessão, API, eventos, evidence, audit e observabilidade.
5. **5.5** Nenhum TENANT_DEV pode existir em caminho de produção.
6. **5.6** RLS/FORCE RLS continua hard invariant; aplicação não substitui isolamento de DB.
7. **5.7** Branding/white-label nunca altera autorização, risco, compliance, audit ou domínio.
8. **5.8** WhiteLabelProfile/ChannelBrandBinding precisam ser versionados, ativáveis e rollback-safe.
9. **5.9** Locale/timezone/jurisdiction são contexto configurável; não hardcodar Brasil no core.
10. **5.10** Ações materiais devem registrar actor_id real e respeitar SoD/maker-checker.

### 1.6 Plano de remediação — ordem executável (família W1-CAP19-01..07)

#### W1-CAP19-01 — Resolver IAM deny-by-default do web-console

- **Objetivo:** toda rota/action/handler administrativa exige sessão válida, tenant válido, membership e capability/authority server-side.
- **Gaps:** GAP-009, GAP-023.
- **AC mínimos:** acesso sem sessão => reject; sessão revogada/expirada => reject; usuário sem capability => reject; tenant ausente/ambíguo => reject; UI oculta ação, mas chamada direta também é rejeitada; nenhuma autorização derivada apenas de rota/estado cliente.
- **Evidence Expected:** testes negativos de auth/authz, guards server-side, audit de denial, evidência CI do SHA quando execução for autorizada.

#### W1-CAP19-02 — Remover TENANT_DEV e implementar tenant resolution real

- **Objetivo:** resolver tenant por sessão/API credential/membership/provisioning.
- **Gap:** GAP-011.
- **AC mínimos:** tenant A não lê/escreve B; ausência de tenant fail-closed; forged tenant_id no body/route não substitui contexto autorizado; DB SET LOCAL/context alimenta RLS de forma controlada; worker/job não cruza tenant.
- **Evidence Expected:** integration tests PostgreSQL/RLS + app layer; BOLA/IDOR negative tests.

#### W1-CAP19-03 — Propagar actor e fechar maker-checker E2E

- **Objetivo:** toda mutação/publicação crítica associa actor real; approver não pode ser maker quando SoD exigir.
- **Gap:** GAP-010.
- **AC mínimos:** actor_id obrigatório em ação material; self-approval reject server-side; tentativa via chamada direta também rejeitada; audit correlaciona maker, checker, case/config/version e motivo.
- **Evidence Expected:** testes E2E positivos/negativos, registros de audit/evidence, constraints DB + camada application.

#### W1-CAP19-04 — Modelar Channel e ChannelBinding como primeira classe

- **Objetivo:** suportar tenant↔channel independente ou hierárquico por configuração versionada.
- **Gap:** GAP-041.
- **AC mínimos:** channel_id não infere tenant_id e vice-versa; bindings versionados possuem vigência/estado; sessão/API/event/evidence/audit transporta ambos quando aplicável; cross-channel autorizado só por policy explícita; cross-channel/cross-tenant negative tests.
- **Evidence Expected:** schema/contract, tests, event/evidence samples e trace/audit correlation.

#### W1-CAP19-05 — Completar white-label e regional provisioning

- **Objetivo:** WhiteLabelProfile + ChannelBrandBinding + região/jurisdição/features sem fork semântico.
- **Gap:** GAP-042.
- **AC mínimos:** domínio/tema/logo/conteúdo/idioma versionados; preview antes de ativação; ativação auditada; rollback por versão, nunca edição do histórico publicado; alteração de marca não altera rules, IAM, risk ou audit; região/jurisdição/features compatíveis com tenant policy.
- **Evidence Expected:** config versions, activation/rollback tests, accessibility/theme tests, negative policy invariance tests.

#### W1-CAP19-06 — Fechar hardening mínimo de sessão/login aplicável à fundação

- **Objetivo:** controls proporcionais ao risco para rate limit/brute force, MFA privilegiado, recovery/reset e proteção de sessão.
- **Gap:** GAP-023.
- **AC mínimos:** política explícita; rate limit; revogação; inactivity; fixation/replay protection; MFA para perfis privilegiados conforme policy.
- **Evidence Expected:** threat model, security tests e logs seguros sem secrets.

#### W1-CAP19-07 — Gate integrado CAP-19/G1

- **Objetivo:** reunir Evidence Observed, executar matriz negativa multi-tenant/multicanal/SoD e decidir READY/READY_WITH_RESTRICTION/BLOCKED.
- **Pré-condições:** itens 01..06 aplicáveis concluídos; CNPJ alfanumérico e demais requisitos G1 avaliados separadamente; CI do próprio SHA disponível.
- **Saída:** readiness record formal; nunca promover pela existência de UI ou código parcial.

### 1.7 Matriz obrigatória de testes

**Tenant isolation:**
- tenant A lê B => reject;
- tenant A altera B => reject;
- forged tenant no body/route => reject;
- acesso sem tenant context => fail closed;
- cache/search/index não vaza cross-tenant;
- worker/job não cruza tenant.

**Channel isolation/context:**
- channel A não assume tenant por convenção;
- channel binding inválido/expirado => reject;
- forged channel => reject;
- contexto correto em event/evidence/audit/trace.

**IAM/Authz:**
- anônimo => reject;
- sessão expirada/revogada => reject;
- role sem capability => reject;
- admin de tenant A não administra B;
- endpoint/action direta respeita deny-by-default.

**SoD:**
- maker tenta checker => reject;
- approver distinto com authority => accept;
- actor real persiste em audit/evidence.

**White-label:**
- mudança de tema não altera policy/risk/auth;
- configuração publicada é imutável;
- rollback usa versão anterior/novo ponteiro seguro;
- domínio incorreto não resolve tenant arbitrariamente.

### 1.8 Security controls

Deny-by-default; tenant-bound sessions; RLS/FORCE RLS; NOBYPASSRLS; actor propagation; SoD; session expiry/revocation; rate limiting; MFA conforme risco; audit append-only; correlation_id; PII minimization; secret hygiene; tenant-safe cache/telemetry; migration guard; no frontend authority.

### 1.9 Evidence Expected para promoção

- commit/revision técnica autorizada e identificada;
- diff de implementação;
- typecheck/lint/build PASS;
- DB/RLS integration tests;
- negative authz/BOLA/IDOR/cross-tenant/cross-channel tests;
- SoD E2E tests;
- session security tests;
- config versioning/rollback tests;
- audit/evidence samples correlacionadas;
- CI run do próprio SHA/release candidate;
- registry readback e gate G1 decision.

Enquanto ADR-034 estiver vigente, itens que dependem de write/execution permanecem EVIDENCE_EXPECTED, nunca OBSERVED.

### 1.10 Readiness atual

- **Capability ID:** CAP-19
- **Task family:** W1-CAP19-01..07
- **Status:** BLOCKED
- **Objetivo:** tornar a fundação multi-tenant/multicanal/white-label tecnicamente verificável e elegível a READY.
- **Source/Requirements:** REQ-ONB-012/013/048/049/050/053/056/058/064/067/069/070/073/077 + ADR-006/023/025/027/030/034 + TF-007.
- **Dependências:** IAM/session; RLS context; actor/SoD; channel model; config versioning; CI evidence; autorização Program Owner para execução.
- **Arquivos previstos:** somente a serem determinados em nova leitura do GitHub quando write for autorizado; o documento não autoriza nem presume arquivos a editar.
- **Gate:** G1.

### 1.11 Critério de desbloqueio

A família W1-CAP19 poderá sair de BLOCKED somente quando coexistirem:

1. autorização explícita do Program Owner revogando/relaxando ADR-034 para o escopo técnico definido;
2. leitura atual do repositório no momento da execução;
3. task específica formalmente READY/READY_WITH_RESTRICTION;
4. arquivos/contratos previstos identificados;
5. testes/security/evidence/gate definidos;
6. nenhuma dependência estrutural não resolvida.

### 1.12 Regra de parada

Mesmo após autorização futura, executar uma task por vez, gerar evidência e reavaliar o gate antes de avançar. Não iniciar CAP-20, CAP-16 ou outra capability apenas porque CAP-19 mudou de estado, salvo nova autorização sequencial do Program Owner.

---

## 2. ONB-EXE-002 — Mapa Técnico Read-Only: CAP-19 / TASK-W1-001 + TASK-W1-002

- **Documento:** ONB-EXE-002_MAPA_TECNICO_READ_ONLY_CAP19_W1_001_002_v1.0
- **Status:** CANONICAL_EXECUTION_SUPPORT / READ_ONLY_EVIDENCE
- **Data-base:** 09 de agosto de 2026
- **Capability:** CAP-19 | **Tasks:** TASK-W1-001, TASK-W1-002
- **Repo:** Mutual-Processadora-de-Pagamentos/onboarding-corporativo
- **Ref observada:** main @ `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`
- **Regra:** ADR-034 — GitHub consultation-only / no-write / no-execution

### 2.1 Objetivo

Fechar, por leitura técnica, os arquivos, contratos, dependências e testes necessários para IAM deny-by-default e tenant resolution real. O documento não autoriza implementação, não altera código e não promove readiness.

### 2.2 Conclusão executiva

O main possui fundação reutilizável de autenticação, autorização e isolamento de banco, porém ela **não está conectada ao web-console**. O web-console mantém TENANT_DEV em Server Actions e módulos server-only e não apresenta gate de sessão/capability no layout observado. Portanto **GAP-ONB-009 e GAP-ONB-011 são gaps de implementação atuais**, não apenas falta de documentação.

O PR #4 contém uma implementação posterior para web-painel com sessão, função `exigir(capacidade)`, assinatura por usuário real e guarda de autorização em CI. Essa implementação é referência técnica útil, mas não está em main e ainda utiliza TENANT_DEV; não resolve TASK-W1-001/002 do web-console nem o tenant resolution global.

### 2.3 Evidência observada — main

**3.1 Auth/domain foundation**

`packages/dominio/src/acesso.ts`:
- PAPEIS = analista, gestor, aprovador, administrador.
- capacidades derivadas por papel.
- `pode()` é deny-by-default quando usuário é nulo/inativo ou não possui capacidade.
- `podeAprovarOQue()` rejeita sem sessão, sem papel ou mesmo autor.
- sessão possui limite absoluto de 12h e inatividade de 30 min.

`packages/dados/src/acesso.ts`:
- senha por scrypt com sal e parâmetros persistidos no hash.
- comparação timing-safe.
- sessão guarda somente SHA-256 do segredo.
- `validarSessao` verifica tenant, expiração, inatividade e revogação.
- usuário e sessão são tenant-bound.
- contas demo são explicitamente marcadas e só podem ser semeadas quando `ACESSO_DEMO=1`.

**3.2 Tenant isolation foundation**

`packages/dados/src/conexao.ts`:
- `comoTenant(tenantId)` abre transação.
- `SET LOCAL ROLE aplicacao`.
- `set_config('app.tenant_id', tenantId, true)`.
- contexto some ao fim da transação.
- desenho assume papel sem BYPASSRLS e isolamento por RLS.

`packages/dados/src/esquema.ts`:
- `tenants` é raiz de dados e possui regiao, dominio, tema, logotipoId e ativo.
- tabelas relevantes carregam tenantId.
- usuarios e sessoes carregam tenantId.

**3.3 Web-console — blockers concretos**

- `apps/web-console/src/app/acoes.ts`: define `TENANT_DEV = 00000000-0000-0000-0000-000000000001`; Server Actions de abrir/salvar/publicar/semear não validam sessão, membership ou capability antes do efeito; semear requisitos chama `semearRequisitosDoTenant(TENANT_DEV)`.
- `apps/web-console/src/lib/console.ts`: define TENANT_DEV; leituras de painel, requisitos e políticas executam `comoTenant(TENANT_DEV)`; queries filtram explicitamente TENANT_DEV.
- `apps/web-console/src/lib/editor.ts`: define TENANT_DEV; AUTOR_CLIENTE e AUTOR_MUTUAL são strings de desenvolvimento; abrir/salvar/publicar requisito usa tenant e autores fixos.
- `apps/web-console/src/lib/produtos.ts`: define TENANT_DEV; leitura, criação, publicação e seed usam tenant fixo; autores são importados das constantes de desenvolvimento do editor.
- `apps/web-console/src/lib/fluxos.ts`: define TENANT_DEV; leitura, criação, publicação e seed usam tenant fixo.
- `apps/web-console/src/app/layout.tsx`: layout observado apenas envolve children em Casca; não existe gate de sessão/tenant/capability nesse arquivo.
- `apps/web-console/package.json`: web-console já depende de packages/dados e packages/dominio, portanto não exige novo fornecedor de auth para consumir a fundação existente.

### 2.4 Evidência observada — web-painel main

- `apps/web-painel/src/lib/autor.ts`: `AUTOR = "analista (acesso de desenvolvimento)"` e comentário reconhece ausência de autenticação.
- `apps/web-painel/src/app/acoes.ts`: ações materiais usam AUTOR fixo; decisão, pedido e julgamento não exigem sessão/capability no main.

Isso reforça que a fundação de auth existe nos packages, mas o enforcement da aplicação não está integrado no main observado.

### 2.5 PR #4 — referência não-main

PR #4, head `13975fea59f55e3b25a3e5d2a27e5d73bd345c4d`, permanece aberto e não foi tratado como implementação vigente. Arquivos relevantes no head do PR:

- `apps/web-painel/src/lib/sessao.ts`: `acessoAtual` valida cookie via `validarSessao`; `exigir(capacidade)` rejeita sem sessão ou sem capability; assinatura usa usuário real; cookie httpOnly/sameSite=lax/secure em produção; porém o próprio módulo ainda fixa TENANT_DEV, logo não serve como tenant resolution final.
- `apps/web-painel/src/app/acoes.ts`: ações chamam `exigir(...)` antes do efeito; `acaoDecidir` grava assinatura e decididaPorUsuarioId.
- `scripts/guarda-autorizacao.mjs` e `qualidade.yml`: PR adiciona guarda automatizada para impedir nova ação sem authorization check.

**Decisão de uso:** reutilizar o padrão arquitetural, não copiar cegamente a implementação. O objetivo de TASK-W1-001/002 é centralizar contexto autenticado e remover tenant fixo, inclusive no console.

### 2.6 Change surface prevista — TASK-W1-001

Arquivos existentes diretamente impactados, sujeitos a revalidação no momento de eventual autorização:

- `apps/web-console/src/app/layout.tsx`
- `apps/web-console/src/app/acoes.ts`
- `apps/web-console/src/lib/console.ts`
- `apps/web-console/src/lib/editor.ts`
- `apps/web-console/src/lib/produtos.ts`
- `apps/web-console/src/lib/fluxos.ts`
- `apps/web-console/package.json`, apenas se testes/scripts precisarem de wiring adicional.

Arquivos/componentes prováveis a criar, somente após autorização:

- `apps/web-console/src/lib/sessao.ts` ou módulo equivalente de contexto autenticado.
- testes de integração/authz do web-console.
- guard de autorização generalizado ou extensão do padrão de `scripts/guarda-autorizacao.mjs`.

Contratos reutilizados: `packages/dominio/src/acesso.ts`, `packages/dados/src/acesso.ts`, `packages/dados/src/conexao.ts`.

AC técnico mínimo:

- nenhuma Server Action material executa sem sessão válida;
- capacidade requerida é verificada server-side;
- acesso via chamada direta é rejeitado;
- actor real da sessão é propagado para mutações auditáveis;
- layout não é considerado controle suficiente sozinho.

### 2.7 Change surface prevista — TASK-W1-002

Pontos atuais a eliminar:

- TENANT_DEV em `apps/web-console/src/app/acoes.ts`;
- TENANT_DEV em `apps/web-console/src/lib/console.ts`;
- TENANT_DEV em `apps/web-console/src/lib/editor.ts`;
- TENANT_DEV em `apps/web-console/src/lib/produtos.ts`;
- TENANT_DEV em `apps/web-console/src/lib/fluxos.ts`;
- TENANT_DEV no padrão de sessão do web-painel do PR #4 não deve ser reproduzido como solução definitiva.

**Contrato alvo:**

```
Session/API credential -> membership/scopes -> tenant context -> comoTenant(tenantId) -> SET LOCAL app.tenant_id -> RLS
```

Requisito de fail-closed:

- nenhum tenant => reject;
- tenant ambíguo => reject;
- tenant do body/query/route não substitui tenant autorizado;
- usuário não membro do tenant => reject;
- tenant inativo => reject quando aplicável;
- cross-tenant read/write => reject.

### 2.8 Dependência de modelo identificada

O schema atual associa usuario diretamente a um tenantId. Para TASK-W1-002, a menor fatia segura pode resolver tenant a partir da sessão do usuário atual se o produto mantiver um usuário por tenant. Entretanto o requisito canônico prevê membership/scopes e tenant/channel independentes; portanto uma eventual generalização para usuário multi-tenant não deve ser inventada nesta task sem contrato explícito. Se membership multi-tenant for necessário para o escopo autorizado, deve ser tratado como decisão/modelo antes da implementação.

### 2.9 Plano de testes preparado

**TASK-W1-001:**
- sem cookie/sessão => todas as actions materiais reject;
- sessão expirada => reject;
- sessão revogada => reject;
- usuário inativo => reject;
- usuário autenticado sem capability => reject;
- POST/action direta sem navegar pela UI => reject;
- actor gravado = usuário da sessão.

**TASK-W1-002:**
- tenant A lê A => allow quando autorizado;
- tenant A lê B => reject/zero rows conforme boundary testado;
- tenant A escreve B => reject;
- forged tenantId em form/body/query => não altera contexto autorizado;
- ausência de contexto => fail closed;
- conexão devolvida ao pool não carrega tenant anterior;
- worker/service path sem tenant explícito => fail closed quando aplicável;
- BOLA/IDOR por IDs de outro tenant => reject.

### 2.10 Security controls

- deny-by-default;
- server-side authz em cada ato;
- RLS/FORCE RLS permanece defesa obrigatória;
- tenant context local à transação;
- cookie httpOnly, secure em produção, sameSite apropriado;
- sessão revogável e limitada por tempo;
- nenhuma confiança em tenant informado apenas pelo cliente;
- nenhum autor textual fixo para ato material;
- logs/audit sem segredo de sessão.

### 2.11 Evidence Expected após eventual autorização

SHA e diff exatos; arquivos alterados; unit/integration tests; negative authz tests; DB/RLS cross-tenant tests; build/typecheck/lint; guard de autorização; CI do próprio SHA; samples de audit com actor/tenant/correlation minimizados; readback do registry; decisão G1.

### 2.12 Readiness resultante

- TASK-W1-001: **BLOCKED** — especificação técnica suficiente, execução impedida por ADR-034.
- TASK-W1-002: **BLOCKED** — especificação técnica suficiente para a fatia single-tenant/session-bound; implementação e eventual necessidade de membership multi-tenant dependem de autorização/escopo explícito.
- CAP-19: permanece BLOCKED/PARTIAL. W1: permanece BLOCKED. G1: permanece NOT_STARTED.

### 2.13 Regra de parada

Nenhum arquivo, branch, PR, comentário, workflow, CI ou deploy foi alterado/executado. O próximo passo permitido enquanto ADR-034 vigorar é continuar decompondo tecnicamente as tasks W1 seguintes ou aprofundar testes/contratos em read-only; não executar implementação.

---

## 3. ONB-EXE-003 — Mapa Técnico Read-Only: CAP-19 / TASK-W1-003 — Actor Propagation + Maker-Checker (SoD)

- **Documento:** ONB-EXE-003_MAPA_TECNICO_READ_ONLY_CAP19_W1_003_SOD_v1.0
- **Status:** CANONICAL_EXECUTION_SUPPORT / READ_ONLY_EVIDENCE
- **Data-base:** 09 de agosto de 2026
- **Repo:** Mutual-Processadora-de-Pagamentos/onboarding-corporativo
- **Main observado:** `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`
- **Regra:** ADR-034 — GitHub consultation-only / no-write / no-execution

### 3.1 Objetivo

Fechar o mapa técnico de TASK-W1-003 sem implementar: identificar onde a identidade real do maker/checker precisa entrar, por que a segregação existente não é E2E no main, quais contratos devem mudar e quais testes/evidências serão obrigatórios.

### 3.2 Conclusão executiva

O main contém três camadas parcialmente desconectadas:

- **(a) domínio:** `podeAprovarOQue()` já modela autoridade e rejeita mesmo autor por user id;
- **(b) SQL:** migration `0014-acesso.sql` criou colunas `*_por_usuario` e CHECKs de segregação em requisitos, produtos e fluxos;
- **(c) aplicação/ORM vigente:** o schema Drizzle e os fluxos de persistência observados ainda usam os campos textuais escritoPor/aprovadoPor, e o web-console injeta AUTOR_CLIENTE/AUTOR_MUTUAL fixos.

Resultado: a intenção de SoD existe e há constraints físicas no banco, mas a identidade real não é propagada pelo caminho E2E observado. Com colunas de usuário nulas, CHECKs que permitem NULL não provam maker-checker. **GAP-ONB-010 permanece confirmado.**

### 3.3 Evidência — domínio

`packages/dominio/src/acesso.ts`:
- papéis são conjuntos, não hierarquia;
- gestor monta; aprovador publica; administrador gerencia usuários; analista decide casos;
- `pode(aprovador, capacidade)` é deny-by-default;
- `podeAprovarOQue(aprovador, escritoPorUsuarioId)` exige sessão, capacidade publicar_regua e rejeita quando `aprovador.id == escritoPorUsuarioId`.

A regra canônica útil já existe e deve ser reutilizada; não criar uma segunda regra de SoD em frontend.

### 3.4 Evidência — banco

`packages/dados/sql/migracoes/0014-acesso.sql`:
- adiciona `decidida_por_usuario` em decisoes;
- adiciona `autor_usuario` em pedidos_de_complemento;
- adiciona `escrito_por_usuario` e `aprovado_por_usuario` em requisitos, produtos e fluxos;
- adiciona CHECKs `requisito_segregacao_de_funcoes`, `produto_segregacao_de_funcoes` e `fluxo_segregacao_de_funcoes`;
- CHECK permite NULL: escrito NULL OR aprovado NULL OR escrito <> aprovado.

**Implicação:** constraint impede igualdade somente quando ambos ids são preenchidos. Ela é defesa em profundidade, não substitui propagação obrigatória do actor.

### 3.5 Evidência — ORM/persistência no main

`packages/dados/src/esquema.ts` observado:
- requisitos expõe escritoPor e aprovadoPor textuais, sem as propriedades Drizzle escritoPorUsuario/aprovadoPorUsuario no trecho vigente observado;
- produtos e fluxos seguem o mesmo modelo textual no schema observado.

`packages/dados/src/requisitos.ts`:
- `abrirRascunho` recebe `escritoPor: string` e grava somente escritoPor;
- `publicarRequisito` recebe `aprovadoPor: string`;
- segregação de aplicação compara `linha.escritoPor === aprovadoPor`;
- update de publicação grava aprovadoPor, publicadoEm e simulacao, sem aprovadoPorUsuario.

web-console:
- `lib/editor.ts` define AUTOR_CLIENTE e AUTOR_MUTUAL como strings fixas de desenvolvimento;
- `lib/produtos.ts` e `lib/fluxos.ts` reutilizam as mesmas identidades fixas;
- `app/acoes.ts` não resolve usuário autenticado no main.

Portanto, no main observado, maker/checker ainda depende de identidade textual fixa e não de actor real da sessão.

### 3.6 PR #4 — referência, não verdade do main

O PR #4 registra explicitamente a correção de uma alegação anterior: os CHECKs existiam, porém as colunas de usuário não estavam efetivamente preenchidas pelo ORM/caminho da aplicação. O PR avançou `decidida_por_usuario` para decisões do web-painel e introduziu assinatura/usuário real para atos do painel, mas a própria documentação do PR deixa CAP-IAM-02/SoD de publicação como trabalho separado.

**Uso permitido:** referência de padrão para actor propagation. Não usar PR aberto como evidência de fechamento.

### 3.7 Change surface prevista — TASK-W1-003

Revalidação obrigatória quando houver autorização futura. Superfície provável:

- `packages/dados/src/esquema.ts` — mapear colunas `*_por_usuario` já existentes fisicamente, sem reescrever migration histórica.
- `packages/dados/src/requisitos.ts` — receber maker/checker por user id e persistir ids.
- `packages/dados/src/produtos.ts` — idem.
- `packages/dados/src/fluxos.ts` — idem.
- `apps/web-console/src/lib/editor.ts` — substituir AUTOR_CLIENTE/AUTOR_MUTUAL por contexto autenticado/actor real.
- `apps/web-console/src/lib/produtos.ts` — propagar actor ids reais.
- `apps/web-console/src/lib/fluxos.ts` — propagar actor ids reais.
- `apps/web-console/src/app/acoes.ts` — exigir capability e passar actor da sessão.
- trilha/audit aplicável — correlacionar actor id, tenant, ação, objeto, versão e correlation id.
- testes de domínio/dados/integração/E2E.

**Não editar `0014-acesso.sql`:** ADR-033 determina migrations históricas imutáveis. Correção futura, se necessária, deve ser migration compensatória com próximo prefixo válido.

### 3.8 Contrato alvo

**Maker:**
- usuário autenticado real;
- capability montar_regua;
- actor_id obrigatório ao abrir/criar rascunho material;
- escrito_por textual pode permanecer como snapshot legível, mas não substitui id.

**Checker:**
- usuário autenticado real;
- capability publicar_regua;
- aprovado_por_usuario obrigatório para publicação humana;
- backend chama/replica semanticamente `podeAprovarOQue()` e rejeita same actor antes do write;
- DB CHECK permanece defesa final.

**Audit:**
- registra maker_user_id, checker_user_id, tenant_id, entidade/grupo/versão, timestamps e correlation_id quando contrato de audit aplicar.

### 3.9 Acceptance criteria

- **AC1** — rascunho criado por usuário U1 persiste escrito_por_usuario=U1.
- **AC2** — tentativa de U1 publicar o próprio rascunho é rejeitada server-side.
- **AC3** — tentativa direta contornando UI também é rejeitada.
- **AC4** — aprovador U2 com publicar_regua publica rascunho de U1 e persiste aprovado_por_usuario=U2.
- **AC5** — usuário sem publicar_regua não publica mesmo sendo distinto do maker.
- **AC6** — actor pertence ao tenant/contexto autorizado; id forjado no payload é ignorado/rejeitado.
- **AC7** — CHECK de banco rejeita igualdade maker/checker se aplicação for contornada.
- **AC8** — audit/evidence correlaciona os dois actors e a versão publicada.
- **AC9** — requisitos, produtos e fluxos obedecem ao mesmo invariant; não fechar SoD provando apenas um tipo.
- **AC10** — strings históricas continuam legíveis sem se tornarem autoridade de autorização.

### 3.10 Matriz de testes

- domínio: `podeAprovarOQue(null)` => reject;
- domínio: sem capacidade => reject;
- domínio: mesmo user id => reject;
- domínio: user distinto + capability => allow;
- dados: abrir rascunho persiste maker id;
- dados: publicar persiste checker id;
- DB: insert/update com maker==checker => constraint violation;
- DB: actor de outro tenant => FK/RLS/context reject conforme boundary;
- API/Server Action: maker tenta publicar via chamada direta => reject;
- API/Server Action: checker sem sessão => reject;
- API/Server Action: payload com actor id forjado não prevalece sobre sessão;
- integração: requisito, produto e fluxo cobertos;
- audit assertions: user ids + tenant + versão + ação;
- regression: catálogo/base seed tem tratamento explícito para system actor e não cria bypass humano silencioso.

### 3.11 Ponto de decisão — system actor

O seed/base catalog hoje usa autor textual `catalogo-mutual` e versões já aprovadas. Antes de tornar `*_por_usuario` obrigatório para todo caminho, definir o contrato de system actor: identidade técnica/auditável separada de usuário humano, ou exceção explícita e restrita para bootstrap. Não transformar NULL em bypass geral para operações humanas. Isso é decisão de implementação dentro do contrato de audit/authority, não motivo para relaxar SoD humano.

### 3.12 Evidence Expected após autorização

Diff e SHA; schema Drizzle alinhado às colunas físicas; migration compensatória somente se necessária, conforme ADR-033; testes domínio + dados + DB constraint + E2E; negative tests de self-approval e actor spoofing; audit samples; CI do próprio SHA; registry/GAP-010 readback; gate G1/G7 conforme escopo.

### 3.13 Readiness

- TASK-W1-003: **BLOCKED**, porém tecnicamente especificada por read-only mapping.
- GAP-ONB-010: OPEN / CRITICA / BLOCKER.
- CAP-19: BLOCKED/PARTIAL. W1: BLOCKED. G1: NOT_STARTED. ADR-034: vigente.

### 3.14 Regra de parada

Nenhuma mutação, execução, workflow ou CI no GitHub. O próximo passo permitido é mapear TASK-W1-004 Channel/ChannelBinding em read-only ou aprofundar o contrato de system actor/audit no Drive; execução continua proibida.

---

## 4. ONB-EXE-004 — Mapa Técnico Read-Only: CAP-19 / W1-004 — Channel Context

- **Documento:** ONB-EXE-004 — Versão 1.0 — 2026-08-09

### 4.1 Escopo e autoridade

Artefato subordinado a RDY-CAP19-001, SRC-051 e ADR-034. Base técnica observada: branch main SHA `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`. GitHub usado exclusivamente em consulta read-only. Este documento não autoriza implementação, execução, CI, merge ou deploy.

### 4.2 Finding principal

Não foi evidenciada no main uma entidade canônica Channel/ChannelBinding nem um channel_id de primeira classe propagado E2E. O termo canal existente na jornada delegada representa meio de convite (email/telefone), não o conceito arquitetural de canal de distribuição/origem exigido por REQ-ONB-069/ADR-023. Portanto **GAP-ONB-041 permanece técnico, CRÍTICO e aberto**.

### 4.3 Contrato alvo mínimo

- **Channel:** channel_id, tenant_id quando ownership for direto, kind, key, status, display_name, locale/timezone defaults opcionais, jurisdiction constraints opcionais, created_at, version.
- **ChannelBinding:** binding_id, tenant_id, channel_id, relation_type, valid_from/to, status, configuration_version. O modelo deve admitir associação 1:N/N:N conforme decisão canônica, sem assumir tenant↔channel 1:1.
- **ChannelContext:** tenant_id + channel_id + source/authentication provenance + correlation_id. Ausência, conflito ou channel não autorizado deve falhar fechado.

### 4.4 Change surface previsto após autorização

- `packages/dominio`: tipos/invariantes de Channel, ChannelBinding, ChannelContext e regras de autorização.
- `packages/dados/src/esquema.ts`: tabelas/versionamento/bindings e RLS tenant-aware.
- `packages/dados/src/conexao.ts`: contexto transacional preservando tenant e, quando aplicável, channel.
- `apps/web-console` e demais BFFs: resolução server-side de channel; nenhuma confiança em route/body sem vínculo autorizado.
- APIs/eventos/EvidenceEnvelope/audit/telemetry: channel_id e correlation_id propagados quando aplicáveis.
- workers/cache: chaveamento explícito por tenant/channel para impedir contaminação cruzada.

### 4.5 Critérios de aceite

- **AC-CH-01** tenant_id e channel_id são distintos e explicitamente resolvidos.
- **AC-CH-02** channel ausente, inválido ou incompatível resulta deny/fail-closed.
- **AC-CH-03** request forjado não troca channel efetivo.
- **AC-CH-04** dados/evidências/eventos/audit preservam channel context quando material.
- **AC-CH-05** cache/worker não atravessam channel ou tenant.
- **AC-CH-06** alteração de ChannelBinding é versionada e auditável.
- **AC-CH-07** white-label não altera semântica de risk/compliance/auth/audit.

### 4.6 Especificação de testes

- **CH-NEG-001** sessão válida + channel não permitido => reject.
- **CH-NEG-002** channel_id forjado em route/body/header => reject.
- **CH-NEG-003** tenant A + channel exclusivo de B => reject.
- **CH-NEG-004** leitura direta sem ChannelContext quando obrigatório => fail closed.
- **CH-NEG-005** cache key sem channel em recurso channel-sensitive => teste deve detectar colisão.
- **CH-NEG-006** worker/event com binding revogado => não processar como autorizado.
- **CH-POS-001** binding válido => acesso permitido no escopo correto.
- **CH-POS-002** evento/evidence/audit mantém tenant_id, channel_id e correlation_id.
- **CH-VERS-001** rollback por versão segura, nunca edição retroativa de published config.

### 4.7 Evidência esperada para fechamento

Commit autorizado; schema/migration nova conforme ADR-033; testes positivos/negativos; prova RLS/app authorization; amostras minimizadas de event/evidence/audit; CI do próprio SHA; decisão G1/H-04/H-06. Documentação isolada não fecha GAP-041.

### 4.8 Estado

TASK-W1-004 = **BLOCKED**. GAP-041 = OPEN/CRÍTICA/BLOCKER. CAP-19 = PARTIAL/BLOCKED_NOT_READY. ADR-034 permanece impeditivo operacional.

---

## 5. ONB-EXE-005 — Mapa Técnico Read-Only: CAP-19 / W1-005 — White-Label e Provisioning

- **Documento:** ONB-EXE-005 — Versão 1.0 — 2026-08-09

### 5.1 Escopo e autoridade

Artefato subordinado a RDY-CAP19-001, SRC-051, ADR-023/030/034 e GAP-ONB-042. Base técnica observada: main SHA `ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51`. GitHub somente consulta read-only.

### 5.2 Estado observado

A fundação white-label existe parcialmente em `packages/dados/src/esquema.ts`: tenants possui regiao, dominio, tema e logotipoId. Isso comprova capacidade estrutural inicial, mas não governança E2E. Não foi evidenciado no main um WhiteLabelProfile versionado, ChannelBrandBinding, activation/rollback, lifecycle de domínio, política explícita de conteúdo/localização por canal ou testes de invariância semântica.

### 5.3 Princípio de desenho

White-label altera apresentação, conteúdo permitido, domínio, locale/timezone e configuração operacional autorizada. **Não pode alterar** risk policy, compliance semantics, authorization, audit, evidence integrity, SoD ou lifecycle server-authoritative.

### 5.4 Contrato alvo mínimo

- **WhiteLabelProfile:** profile_id, tenant_id, version, status, theme_tokens, logo/object refs, content_bundle_version, locale_default, timezone_default, created_by, approved_by, published_at.
- **DomainBinding:** domain_id, tenant_id, channel_id opcional, hostname, verification_status, valid_from/to, certificate/status reference, active_version.
- **ChannelBrandBinding:** binding_id, tenant_id, channel_id, white_label_profile_id, version/status.
- **ProvisioningProfile:** tenant_id, region/data_residency, enabled_features, jurisdiction packs, provider routing constraints, locale/timezone defaults, version/status.

### 5.5 Change surface previsto após autorização

- schema/migrations: versioned white-label/profile/bindings; sem reescrever migrations históricas.
- admin C12/C13/D1/D9: configuration/read models, access_denied e rollback states.
- tenant provisioning: região, features, jurisdiction/provider constraints.
- domain resolution: hostname -> authorized tenant/channel binding, fail-closed.
- design/content layer: tokens/assets/content bundle sem fork de lógica de negócio.
- audit/evidence: publishing, activation, rollback e domain binding com actor/correlation.

### 5.6 Critérios de aceite

- **AC-WL-01** branding e domain config são versionados e imutáveis após publicação.
- **AC-WL-02** rollback referencia versão anterior segura; não edita histórico.
- **AC-WL-03** domínio desconhecido/ambíguo não resolve tenant implicitamente.
- **AC-WL-04** branding não modifica risk/compliance/auth/audit outputs.
- **AC-WL-05** region/features/jurisdiction são provisioning config explícita e auditável.
- **AC-WL-06** tenant/channel podem compartilhar ou diferenciar profile conforme binding explícito.
- **AC-WL-07** C12/C13/D1/D9 exibem estado real, sem apresentar config não implementada como operacional.

### 5.7 Testes obrigatórios

- **WL-NEG-001** host não verificado => fail closed.
- **WL-NEG-002** host de tenant A tentando contexto B => reject.
- **WL-NEG-003** theme/content malformado => não afeta regra de negócio.
- **WL-NEG-004** tentativa de profile alterar capability/risk policy => rejeitada pelo contrato.
- **WL-VERS-001** publish cria versão imutável.
- **WL-VERS-002** rollback ativa versão existente com audit.
- **WL-REG-001** provisioning em região incompatível com tenant policy => reject.
- **WL-CH-001** channel binding inválido/revogado => não aplicar marca/config.
- **WL-INV-001** mesma entrada de risco sob dois temas produz mesma decisão semântica.

### 5.8 Evidência esperada

Commit autorizado, migrations novas conforme ADR-033, schema/read models, test IDs/resultados, audit samples, domain verification evidence, config version/rollback evidence, CI do próprio SHA e decisão G1/G7/G9.

### 5.9 Estado

TASK-W1-005 = **BLOCKED**. GAP-042 = OPEN/ALTA/BLOCKER. CAP-19 = PARTIAL/BLOCKED_NOT_READY. Este mapa melhora readiness documental, não readiness técnico.

---

## 6. ONB-EXE-006 — Plano de Readiness W2 — Case Lifecycle + Jornada

- **Documento:** ONB-EXE-006 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 6.1 Objetivo

Preparar documentalmente a Wave 2 para lifecycle server-authoritative, jornada, delegação, documentos, decisões e recuperação, sem promover READY enquanto dependências e evidências técnicas estiverem ausentes.

### 6.2 Escopo canônico

- Capabilities: CAP-05, CAP-07, CAP-14, CAP-15, CAP-16, com CAP-19/CAP-20 transversais.
- Requirements principais: REQ-003/004/005/026/028/029/053/060/064/065/067/070/…

> ⚠️ [LACUNA NA FONTE] — O arquivo-fonte de ONB-EXE-006 está truncado: o texto extraído termina abruptamente no meio da lista de requirements ("REQ-003/004/005/026/028/029/053/060/064/065/067/070/"). As seções restantes do plano W2 (estado atual, bloqueadores/gaps, pacote de execução futura, critérios de aceite, testes, evidence expected, readiness/stop rule) não estão disponíveis na extração.

---

## 7. ONB-EXE-007 — Plano de Readiness W3 — Identidade, Documentos e Fraude

- **Documento:** ONB-EXE-007 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 7.1 Objetivo

Preparar a Wave 3 para identidade, documento, biometria, device/session intelligence e providers de verificação, preservando minimização de PII/biometria, multiprovider e EvidenceEnvelope. Não promove nenhuma integração como REAL.

### 7.2 Escopo canônico

- Capabilities: CAP-01, CAP-02, CAP-03, CAP-04, CAP-05, com CAP-19/CAP-20 e CAP-18 de routing como dependências transversais.
- Requirements principais: REQ-005/008/015/016/017/018/032/033/052/055/058/069/076.
- Gate: G3.

### 7.3 Estado atual

CAP-01 PARTIAL; CAP-02 PARTIAL; CAP-03 NOT_EVIDENCED; CAP-04 NOT_EVIDENCED; CAP-05 PARTIAL. Existem entidades e contratos parciais, metadata documental e capability contracts, mas captura/autenticidade/OCR/MRZ/QR, liveness/facematch/spoof, device intelligence e adapters reais não estão comprovados.

### 7.4 Bloqueadores e gaps

GAP-006 procurement/contratos; GAP-012 adapters reais; GAP-013 storage documental; GAP-014 KMS/HSM; GAP-022 provider registry/due diligence; GAP-041 channel context; dependências CAP-19/CAP-20. ADR-034 mantém GitHub no-write/no-execution.

### 7.5 Pacote de execução futura

- **W3.1** IdentityVerificationContract por identificador/jurisdição.
- **W3.2** DocumentCapture/DocumentVerificationContract com integridade, object reference, hash e resultado normalizado.
- **W3.3** BiometricVerificationContract com minimização, finalidade, consentimento/base aplicável, liveness/facematch/spoof e descarte seguro.
- **W3.4** DeviceSignalContract com minimização, finalidade, risco e retenção explícita.
- **W3.5** Provider Adapter Layer por capability, sem marca no domínio.
- **W3.6** Routing e fallback governados por coverage, jurisdição, residency, qualidade, custo, contrato, health e economic_group.
- **W3.7** EvidenceEnvelope + reconciliation + degraded mode; timeout nunca aprova.
- **W3.8** Gate G3 com due diligence e integration evidence.

### 7.6 Critérios de aceite

- **AC-W3-01** Identificadores/documentos extensíveis por jurisdição.
- **AC-W3-02** Documento preserva origem, hash, versão, storage reference e cadeia de custódia.
- **AC-W3-03** Biometria não é retida além do necessário; política de retenção é explícita.
- **AC-W3-04** Provider retorna EvidenceEnvelope normalizado; provider nunca é source of truth.
- **AC-W3-05** Routing não usa fallback do mesmo grupo econômico como independência.
- **AC-W3-06** Falhas/timeout geram degraded/review, nunca aprovação automática.
- **AC-W3-07** Tenant/channel e actor/correlation propagados onde aplicável.
- **AC-W3-08** Dados sensíveis e secrets sob KMS/controle apropriado em produção.

### 7.7 Testes obrigatórios

- DOC-POS/NEG: tipo suportado, documento inválido, hash mismatch, supersession, malware/object failure.
- BIO-POS/NEG: liveness pass/fail, spoof/deepfake signal, mismatch, timeout, provider degraded.
- DEV-NEG: spoofed device/session context, missing consent/base quando aplicável, overcollection guard.
- PROV-NEG: provider outage, correlated fallback, unsupported jurisdiction, residency conflict, contract inactive.
- TENANT/CHANNEL: cross-tenant e cross-channel reject.
- EVIDENCE: provenance, schema/version, timestamps, integrity, correlation e minimização.

### 7.8 Segurança/privacidade

Data minimization, purpose limitation, encryption, signed/authorized upload/download, malware scanning, secret isolation, biometric minimization, retention/delete/crypto-shred conforme pack, provider third-party risk e audit de acesso privilegiado.

### 7.9 Evidence Expected

Commit autorizado futuro; schemas/adapters; provider contracts; due diligence/DPA/security pack; test IDs/results; samples minimizados de EvidenceEnvelope; routing/fallback evidence; KMS/storage evidence; CI do próprio SHA; G3 decision.

### 7.10 Readiness

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Estado técnico: PARTIAL/NOT_EVIDENCED por capability. Wave: NOT_STARTED. Gate G3: NOT_STARTED.

### 7.11 Visão de produto/operação

A experiência deve expor progresso e estados degradados sem vazar provider nem regra de risco. Suporte precisa identificar falha de captura/provider sem acessar PII desnecessária. Compliance deve enxergar provenance e motivo de revisão humana.

### 7.12 Stop rule

Nenhum adapter, provider, biometria, storage ou controle é considerado implementado por este documento. Enquanto ADR-034 vigorar: somente leitura, especificação, procurement e preparação de testes/evidências.

---

## 8. ONB-EXE-008 — Plano de Readiness W4 — KYB + Fontes Oficiais Brasil

- **Documento:** ONB-EXE-008 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 8.1 Objetivo

Preparar a Wave 4 para KYB Brasil, registro/status/QSA, UBO/representantes, licenças/autorização e uso condicionado de fontes oficiais, preservando CNPJ alfanumérico, provenance, applicability e contracts versionados.

### 8.2 Escopo canônico

- Capabilities: CAP-06, CAP-07, CAP-13, com CAP-01/CAP-18/CAP-19/CAP-20 transversais.
- Requirements: REQ-019/020/021/052/055/063/064/066/076.
- Gate: G4.

### 8.3 Estado atual

CAP-06 PARTIAL; CAP-07 PARTIAL; CAP-13 PARTIAL. Existem entidades, habilitações/naturezas, contratos de registro empresarial/quadro societário e grafo/UBO parcial; adapters oficiais reais, cobertura de licenças/reguladores e CCS/ACCS runtime não estão evidenciados.

### 8.4 Bloqueadores/gaps

GAP-004 CNPJ alfanumérico E2E; GAP-012 adapters reais; GAP-022 provider/source due diligence; GAP-036 RegulatoryPack runtime; GAP-038 CCS/ACCS; dependências CAP-19/CAP-20. ADR-034 impede execução.

### 8.5 Pacote de execução futura

- **W4.1** Identificador fiscal/registro empresarial extensível e CNPJ alfanumérico E2E.
- **W4.2** OfficialSourceAdapter para fontes elegíveis, preservando authority/provenance/version/timestamp.
- **W4.3** KYB registry/status/QSA normalized EvidenceEnvelope + reconciliation.
- **W4.4** UBO/representantes/terceiros com relationship graph e evidence refs.
- **W4.5** RegulatoryLicense/AuthorizationContract por autoridade, jurisdição, vigência e applicability.
- **W4.6** ApplicabilityEvaluation para canais regulatórios condicionais; nunca ativar por presença do catálogo.
- **W4.7** CCS/ACCS somente quando APPLICABLE e com layout oficial versionado, homologação e reconciliação.
- **W4.8** Gate G4.

### 8.6 Critérios de aceite

- **AC-W4-01** CNPJ alfanumérico funciona em domínio, persistência, busca, UI, API, adapter e export.
- **AC-W4-02** Fontes oficiais entram por capability, nunca por hardcode de marca/fonte no domínio.
- **AC-W4-03** QSA/UBO preserva lineage e relacionamento, sem sobrescrever evidência anterior.
- **AC-W4-04** Licença/autorização preserva autoridade, jurisdição, número/ref, status, vigência e source evidence.
- **AC-W4-05** SCR/CCS/Open Finance ou equivalentes só operam com applicability/base/autorização aplicável.
- **AC-W4-06** Tenant/channel context e privacy minimization preservados.
- **AC-W4-07** Falha de fonte oficial não vira aprovação.

### 8.7 Testes

- CNPJ: caracteres alfanuméricos, casing/normalização definida, busca e export; regressão contra formato histórico.
- KYB: empresa ativa/inativa, QSA vazio/parcial, divergência de fontes, UBO recursivo/ciclo.
- LIC: autorização vigente/expirada/revogada/não aplicável.
- CCS: applicable/not applicable, XSD/layout version mismatch, transmission/reconciliation failure.
- SEC: cross-tenant/channel, forged source, stale evidence, privileged access.

### 8.8 Compliance/produto

Brasil é o primeiro JurisdictionPack operacional, não o core global. A UX deve informar fonte/data e estados de indisponibilidade; compliance deve distinguir dado oficial, provider-derived e declaração do cliente. Nenhuma tela deve afirmar regularidade/licença sem evidência vigente.

### 8.9 Evidence Expected

Commit autorizado; adapters/source contracts; CNPJ E2E tests; official source provenance; license applicability; CCS homologation quando aplicável; negative tests; evidence bundle; CI próprio SHA; G4 decision.

### 8.10 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G4: NOT_STARTED. Gaps permanecem OPEN. Nenhuma fonte/adaptador/CCS é REAL por este documento; GitHub permanece consulta apenas por ADR-034.

---

## 9. ONB-EXE-009 — Plano de Readiness W5 — AML, EDD e HFS

- **Documento:** ONB-EXE-009 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 9.1 Objetivo

Preparar a Wave 5 para screening AML global/local, adverse media, EDD, risco explicável, revisão humana e CAP-22/HFS, preservando provenance, memória de falso positivo, model governance, human review e degraded mode.

### 9.2 Escopo canônico

- Capabilities: CAP-08, CAP-09, CAP-12, CAP-16, CAP-22, com CAP-17/CAP-19/CAP-20/CAP-21 transversais.
- Requirements: REQ-006/007/022/023/025/030/034/035/036/057/063/064/065/067/076.
- Gate: G5; H-16 para HFS.

### 9.3 Estado atual

CAP-08 PARTIAL; CAP-09 PARTIAL; CAP-12 NOT_EVIDENCED; CAP-16 PARTIAL; CAP-22 NOT_EVIDENCED. Existem primitives de triagem, hits, julgamento humano e risco, mas fontes reais, false-positive lifecycle E2E, explainability, EDD completo e integração/model registry HFS não estão comprovados.

### 9.4 Bloqueadores/gaps

GAP-007 CAP-22 contract executável/model registry; GAP-012 adapters; GAP-021 integração HFS; GAP-037 audit; GAP-039 declarations runtime; GAP-048 memória falso positivo; GAP-049 risco explicável; dependências CAP-19/CAP-20/CAP-21 e provider due diligence.

### 9.5 Pacote de execução futura

- **W5.1** ScreeningContract com source/list/version/provenance e disambiguation.
- **W5.2** ScreeningDisposition/FalsePositiveMemory versionada, imutável no match original e revalidável.
- **W5.3** AdverseMediaContract e listas customizadas com provenance e source quality.
- **W5.4** EDDEvaluation/Investigation lifecycle com human review e audit.
- **W5.5** RiskEvaluationContract: dimensões, sinais, reason codes, evidence/policy/model versions e overrides governados.
- **W5.6** CAP-22 InternalCapabilityContract e registry de modelo/regra, sem expor metodologia proprietária.
- **W5.7** Model governance: validação, drift, owner/validator, kill switch, health, degraded mode, rollback/versionamento e observabilidade.
- **W5.8** Gate G5/H-16.

### 9.6 Critérios de aceite

- **AC-W5-01** Screening preserva source/list/version/date e match original.
- **AC-W5-02** Falso positivo exige reason/evidence/actor/authority e não apaga hit original.
- **AC-W5-03** Risco é explicável por dimensões/reason codes; score opaco isolado não decide.
- **AC-W5-04** Override crítico é auditável e maker-checker quando aplicável.
- **AC-W5-05** HFS aparece ao core somente por contrato/sinal/evidência; metodologia, features, pesos e thresholds proprietários não vazam.
- **AC-W5-06** Falha/degradação HFS/provider aciona fluxo governado, nunca aprovação automática.
- **AC-W5-07** Contestações aplicáveis chegam a fila humana auditável.

### 9.7 Testes

- AML: exact/partial/false positive, stale list, list version change, rescreen e reopen.
- EDD: evidence missing/conflicting, escalation, maker-checker, override deny/allow governado.
- RISK: reproducibility/replay, reason codes, missing evidence, policy/model version pinning.
- HFS: contract compatibility, model version, degraded/kill switch, timeout, drift alert, access boundary e no-IP-leak.
- SEC: cross-tenant/channel, unauthorized model access, PII/log leakage.

### 9.8 Visão de produto/operação

Analistas devem ver por que um caso está em revisão, quais evidências sustentam o risco e o que é resultado de fonte externa versus inteligência Mutual. O cliente não recebe detalhes que permitam gaming de controles ou exposição da metodologia HFS. Suporte e auditoria precisam de correlação e histórico, não de acesso irrestrito ao modelo.

### 9.9 Evidence Expected

Adapters/fontes; list provenance; disposition records; risk replay evidence; EDD audit; HFS contract/model registry/validation; degraded-mode tests; security review; CI próprio SHA; G5/H-16 decision.

### 9.10 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G5/H-16: NOT_STARTED. CAP-22 continua NOT_EVIDENCED. Nenhum modelo/provider/fonte é considerado operacional por este plano; ADR-034 mantém GitHub read-only.

---

## 10. ONB-EXE-010 — Plano de Readiness W6 — Due Diligence Brasil + Privacy

- **Documento:** ONB-EXE-010 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 10.1 Objetivo

Preparar a Wave 6 para due diligence judicial/fiscal, certificados, privacy, retention, data residency e controles de tratamento, sem promover obrigações legais como universais e sem confundir expiração/revalidação com eliminação de dados.

### 10.2 Escopo canônico

- Capabilities: CAP-10, CAP-11, CAP-12, CAP-13, CAP-20 e dependências CAP-06/CAP-07/CAP-19.
- Requirements: REQ-009/024/033/036/045/054/063/064/065/067/076/077.
- Gate: G6.

### 10.3 Estado atual

CAP-10 PARTIAL; CAP-11 PARTIAL; CAP-12 NOT_EVIDENCED; CAP-13 PARTIAL; CAP-20 PARTIAL. Existem abstrações de evidência, cifra por titular e validade/revalidação, porém fontes reais judicial/fiscal, retention lifecycle, legal hold, privacy controls transversais e KMS produção não estão comprovados.

### 10.4 Gaps/bloqueadores

GAP-014 KMS/HSM; GAP-019 Jurisdiction Packs não-BR; GAP-020 retention operacional; GAP-036 RegulatoryPack runtime; GAP-037 trilha regulatória; GAP-039 declarações; GAP-047 consent lifecycle; dependências CAP-19 e applicability.

### 10.5 Pacote de execução futura

- **W6.1** Judicial/CriminalSourceContract por capability/jurisdição e eligibility.
- **W6.2** Fiscal/CertificateContract com source, validade, status e evidence.
- **W6.3** PrivacyClassification + ProcessingPurpose/Base/Authority por categoria/jurisdição.
- **W6.4** RetentionPolicy/RetentionExecution versionados por categoria, jurisdição, tenant e finalidade.
- **W6.5** LegalHold/exception workflow, delete/crypto-shred e evidence de execução.
- **W6.6** Data residency/transfer controls e provider routing compatível.
- **W6.7** Privileged-read audit e export/DSAR support quando aplicável.
- **W6.8** Gate G6.

### 10.6 Critérios de aceite

- **AC-W6-01** Consulta judicial/fiscal preserva fonte, data, escopo, jurisdição e provenance.
- **AC-W6-02** Certificado/regularidade expirada não é apresentado como vigente.
- **AC-W6-03** Retention policy distingue retenção, expiração de evidência, revalidação e deleção.
- **AC-W6-04** Delete/crypto-shred é auditável e respeita legal hold/exceções.
- **AC-W6-05** Data residency/transfer rules são configuráveis por jurisdição/tenant.
- **AC-W6-06** Privileged access a PII gera audit trail.
- **AC-W6-07** Consentimento/base jurídica só é exigido/registrado quando aplicável; clique/navegação nunca implica aceite.

### 10.7 Testes

- DD: source unavailable/stale/conflicting/not-applicable.
- RET: expired policy, legal hold, delete retry, crypto-shred failure, immutable evidence refs.
- PRIV: unauthorized read, overcollection, masking, residency conflict, transfer block.
- CONSENT: presented/version/hash mismatch, revoked/withdrawn, missing actor/capacity.
- TENANT/CHANNEL: isolation and context propagation.

### 10.8 Produto/operação

Compliance deve enxergar origem/vigência das evidências; suporte deve atuar por reason codes e escopo mínimo; cliente deve receber transparência aplicável sem exposição desnecessária. Privacy controls são parte do produto, não checklist pós-fato.

### 10.9 Evidence Expected

Adapters/fontes; retention policy versions; execution logs; legal hold evidence; KMS/rotation evidence; privileged-read audit; privacy negative tests; CI do próprio SHA; G6 decision.

### 10.10 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G6: NOT_STARTED. Nenhum controle legal/privacy é considerado operacional por este documento. ADR-034 mantém GitHub read-only/no-execution.

---

## 11. ONB-EXE-011 — Plano de Readiness W7 — Admin, Products e Developer Platform

- **Documento:** ONB-EXE-011 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 11.1 Objetivo

Preparar a Wave 7 para builders/admin, produtos/policies/flows versionados, white-label, packs, API pública, webhooks, SDK/hosted flow, sandbox e logs, preservando server-authority, tenant/channel, SoD, applicability e compatibilidade.

### 11.2 Escopo canônico

- Capabilities: CAP-14, CAP-15, CAP-18, CAP-19, CAP-20, CAP-21.
- Requirements: REQ-013/014/027/040/048/049/056/061/062/063/064/067/068/069/070/071/072/073/075/076/077.
- Gate: G7.

### 11.3 Estado atual

CAP-14 NOT_EVIDENCED; CAP-15 PARTIAL; CAP-18 NOT_EVIDENCED; CAP-19 PARTIAL/BLOCKED; CAP-20 PARTIAL; CAP-21 PARTIAL. Existem requirements/flows/products e console parcial, mas Developer Platform pública, event registry/outbox/webhooks, sandbox, SDK, white-label versionado e regulatory/applicability runtime não estão comprovados.

### 11.4 Bloqueadores/gaps

GAP-009/010 IAM/SoD; GAP-018 CAP-18; GAP-019 Jurisdiction Packs; GAP-031/032 state/events; GAP-033 API/webhooks; GAP-035 outbox/delivery/replay; GAP-036 RegulatoryPack; GAP-039 declarations; GAP-040 regulatory change gates; GAP-041/042 channel/white-label; GAP-043/044 handoffs econômicos; GAP-046 Conditional-by-Design; GAP-047 consent.

### 11.5 Pacote de execução futura

- **W7.1** Requirements/Flow/Policy/Product builders com versionamento, simulação e maker-checker.
- **W7.2** Pack composition: Core + JurisdictionPack + RegulatoryPack + SegmentPack + TenantPolicy.
- **W7.3** Admin configuration com tenant/channel/brand/domain/localization versionados e rollback seguro.
- **W7.4** Public API versionada com auth/scopes, idempotency, tenant/channel binding e status/event catalogs.
- **W7.5** Signed webhooks + transactional outbox + delivery log + replay protection + redelivery auditada.
- **W7.6** SDK/hosted flow/sandbox com isolamento e dados de teste sem confundi-los com produção.
- **W7.7** Developer logs/observability e DX sem exposição de PII/internals.
- **W7.8** HOF-007..010 schemas para domínios econômicos, sem mover ownership financeiro para Onboarding.
- **W7.9** Gate G7.

### 11.6 Critérios de aceite

- **AC-W7-01** Config publicada é imutável; rollback por versão segura/nova versão.
- **AC-W7-02** Publicação exige identidade real, authority e SoD.
- **AC-W7-03** API/webhook preservam tenant/channel, correlation, schema/version e idempotency.
- **AC-W7-04** INTERNAL_ONLY nunca vaza por API/webhook.
- **AC-W7-05** Sandbox é isolado e claramente não produtivo.
- **AC-W7-06** White-label não altera risk/compliance/auth/audit.
- **AC-W7-07** Handoffs econômicos transportam elegibilidade/restrições/IDs/evidence, nunca saldo ou execução financeira.
- **AC-W7-08** Regulatory change pode bloquear release do escopo afetado.

### 11.7 Testes

- BUILDER: draft/publish/reject/self-approval/version rollback/simulation.
- API: auth absent, wrong scope, cross-tenant/channel, idempotency conflict, schema compatibility.
- WEBHOOK: invalid signature, replay, duplicate, delivery failure, redelivery, secret rotation.
- SANDBOX: isolation, fake data, no production side effects.
- PACK: applicability, conflict, effective dates, rollback, not-applicable/prohibited.
- HOF: producer/consumer compatibility, auth, correlation, data minimization.

### 11.8 Produto/comercial/cliente

A Developer Platform deve permitir integração sem transformar o cliente em operador de regras críticas. Admin UX precisa explicar impacto, versão, vigência e dependências antes de publicar. White-label/SaaS é camada de configuração e branding; não cria forks de produto. Billing/pricing podem existir em domínio comercial separado, sem contaminar lifecycle de compliance.

### 11.9 Evidence Expected

Schemas/OpenAPI; SDK/hosted/sandbox evidence; signed webhook tests; outbox/delivery logs; builder publication evidence; pack/version records; negative authz; UI homologation por Screen ID; CI próprio SHA; G7 decision.

### 11.10 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G7: NOT_STARTED. Nenhuma API/webhook/SDK/sandbox/white-label é considerada operacional por este documento. ADR-034 preserva GitHub consulta apenas.

---

## 12. ONB-EXE-012 — Plano de Readiness W8 — Monitoramento Contínuo e Handoffs

- **Documento:** ONB-EXE-012 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 12.1 Objetivo

Preparar a Wave 8 para revalidação, expiração, rescreening, monitoramento contínuo, alertas, provider health e handoffs/feedback downstream, preservando idempotência, golden thread, contratos versionados e separação de ownership entre Onboarding e domínios externos.

### 12.2 Escopo canônico

- Capabilities: CAP-17, CAP-18, CAP-20, CAP-21, com CAP-16/CAP-19 dependentes.
- Requirements: REQ-010/011/031/046/047/057/061/062/065/073/074/075/076.
- Gate: G8.

### 12.3 Estado atual

CAP-17 PARTIAL; CAP-18 NOT_EVIDENCED; CAP-20 PARTIAL; CAP-21 PARTIAL. Worker de vencimentos/reabertura e métricas transacionais de provider/custo são fundações reais, porém rescreening/monitoring completo, provider health/SLOs, handoffs HOF-001..010 executáveis e feedback downstream correlacionado não estão comprovados.

### 12.4 Bloqueadores/gaps

GAP-008 HOF-001..006; GAP-017 observabilidade; GAP-018 CAP-18; GAP-032/033/035 eventos/webhooks/outbox; GAP-044 HOF-007..010; GAP-045 correlação downstream; GAP-052 monitoring E2E; dependências CAP-19/CAP-20.

### 12.5 Pacote de execução futura

- **W8.1** MonitoringPolicy com triggers, periodicidade, applicability, policy/version e tenant/channel.
- **W8.2** Revalidation/Rescreen lifecycle idempotente com reopen governado e evidence lineage.
- **W8.3** AlertContract e triagem humana para mudança material.
- **W8.4** ProviderHealth/CapabilityHealth com disponibilidade, latência, erro, custo, qualidade e degraded mode.
- **W8.5** HOF-001..006 executáveis com schema/version, producer/consumer, auth, idempotency e data classification.
- **W8.6** HOF-007..010 para partner/economic domains com boundary clara.
- **W8.7** Feedback downstream normalizado como signal/review/revalidation, nunca mutação direta do case.
- **W8.8** Golden thread participante/vínculo → elegibilidade → handoff → evento downstream → eventual revalidação.
- **W8.9** Gate G8.

### 12.6 Critérios de aceite

- **AC-W8-01** Revalidation/rescreen/reopen são idempotentes e reproduzíveis.
- **AC-W8-02** Monitoring preserva trigger, policy/version, source/evidence e reason.
- **AC-W8-03** Provider health afeta routing/degraded mode sem aprovar por indisponibilidade.
- **AC-W8-04** Handoffs preservam canonical IDs, tenant/channel, restrictions, correlation e evidence refs.
- **AC-W8-05** Downstream não altera estado do case diretamente.
- **AC-W8-06** Analytics possuem fórmula/fonte/freshness e minimização de PII.
- **AC-W8-07** Duplicatas/retries não geram efeitos múltiplos.

### 12.7 Testes

- MON: expiry, rescreen trigger, duplicate trigger, retry, stale evidence, policy change.
- HEALTH: provider outage, latency breach, correlated outage, degraded recovery.
- HOF: version compatibility, auth/scopes, idempotency, malformed payload, missing canonical IDs.
- DOWNSTREAM: duplicate/late/out-of-order feedback, unsupported event, correlation missing.
- TENANT/CHANNEL: cross-boundary reject e telemetry context.

### 12.8 Produto/operação

Painel deve priorizar casos e alertas acionáveis, distinguindo monitoramento automático, revisão humana e incidente de provider. Cliente não deve sofrer re-onboarding desnecessário por erro de integração. Suporte precisa de reason/correlation sem acesso amplo a PII ou ledger downstream.

### 12.9 Evidence Expected

Monitoring schedules/triggers; rescreen/reopen records; alert evidence; provider health metrics; HOF schemas/contract tests; downstream feedback samples; golden-thread traces; CI próprio SHA; G8 decision.

### 12.10 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G8: NOT_STARTED. Nenhum handoff/monitoring é considerado E2E por este documento. ADR-034 preserva GitHub consultation-only.

---

## 13. ONB-EXE-013 — Plano de Readiness W9 — Resiliência, Segurança e Performance

- **Documento:** ONB-EXE-013 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 13.1 Objetivo

Preparar a Wave 9 para security CI, observabilidade E2E, KMS/secrets, SLOs, failure modes, runbooks, replay/rollback/kill switch, performance e pentest, sem confundir build/test histórico com evidência de release candidate.

### 13.2 Escopo canônico

- Capabilities: CAP-19, CAP-20, CAP-21 e todas as capabilities materialmente afetadas por segurança/resiliência.
- Requirements: REQ-039/041/042/045/046/058/061/065/068/069/075/076.
- Gate: G9.

### 13.3 Estado atual

Há fundações de CI funcional, RLS, sessão, cifra AES-GCM e métricas transacionais, mas security scanning completo, KMS produção, observabilidade distribuída/SLOs, own-SHA CI do baseline/release, runbooks exercitados e pentest/security review não estão comprovados.

### 13.4 Bloqueadores/gaps

GAP-005 CI baseline/release; GAP-014 KMS/HSM; GAP-016 security scanning; GAP-017 observabilidade; GAP-020 retention/KMS; GAP-023 login hardening; GAP-024 migration guard; GAP-034 KPIs instrumentados; GAP-035 outbox/webhook replay; GAP-037 audit E2E; GAP-040 regulatory release gates; GAP-041/042 channel/white-label; GAP-044/045 handoff/correlation; GAP-053 runbooks.

### 13.5 Pacote de execução futura

- **W9.1** Security CI: secret scan, SCA, SAST, lockfile integrity, migration/auth/boundary guards.
- **W9.2** Own-SHA quality/security evidence para baseline/release candidate.
- **W9.3** Production KMS/key wrapper, rotation, revocation e failure modes.
- **W9.4** TelemetryContract: logs sem PII, metrics/traces, correlation tenant/channel/case/capability/provider.
- **W9.5** SLI/SLO/error budget/alerts e provider/capability health.
- **W9.6** Failure-mode matrix: DB/provider/queue/webhook/KMS/region/network/dependency degradation.
- **W9.7** Runbooks versionados para incident, outage, data request, replay, rollback, kill switch e support.
- **W9.8** Performance/capacity tests e abuse/rate controls.
- **W9.9** Pentest/security review; Critical/High exigem correção ou waiver formal.
- **W9.10** Gate G9.

### 13.6 Critérios de aceite

- **AC-W9-01** CI do próprio SHA é obrigatória para qualquer claim de release readiness.
- **AC-W9-02** Security gates não podem ser desligados para obter PASS.
- **AC-W9-03** KMS/secrets não aparecem em logs/artefatos e suportam rotation/failure.
- **AC-W9-04** Telemetria correlaciona execução sem vazar PII/metodologia proprietária.
- **AC-W9-05** Runbooks críticos têm exercício/tabletop com corrective actions.
- **AC-W9-06** Replay/redelivery são idempotentes e auditados.
- **AC-W9-07** Performance/failure não resultam em aprovação automática ou perda silenciosa de evidência.
- **AC-W9-08** Pentest/security review sem Critical/High aberto, salvo waiver formal com autoridade.

### 13.7 Testes

- CI: secret/SCA/SAST positive detection, migration/auth guard negative cases.
- KMS: unavailable, rotate, revoked key, invalid ciphertext, recovery path.
- OBS: trace continuity, correlation missing, PII leak guard, alert generation.
- RES: provider correlated outage, queue retry/DLQ, webhook replay, DB failover/degraded, region dependency failure.
- PERF: concurrency, latency, throughput, backpressure e resource exhaustion.
- RUNBOOK: tabletop/drill evidence e owner/escalation.

### 13.8 Produto/operação

Resiliência deve ser visível por estado degraded/unavailable, sem transformar incidente em comportamento ambíguo. Operação precisa de alertas acionáveis e runbooks; liderança precisa de SLO/health e impacto de negócio; cliente deve receber comunicação coerente sem vazamento técnico.

### 13.9 Evidence Expected

CI run do próprio SHA; scanner outputs; KMS/rotation evidence; telemetry traces/metrics; SLO dashboards; failure-test results; drill records; pentest/security review; waivers se houver; G9 decision.

### 13.10 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave/G9: NOT_STARTED. Histórico de PR/build não substitui evidência do release candidate. ADR-034 impede disparo de CI e qualquer execução no GitHub.

---

## 14. ONB-REL-001 — Plano de Readiness W11 — Piloto, Release e Production Verification

- **Documento:** ONB-REL-001 — Versão 1.0 | 2026-08-09 | CANONICAL_EXECUTION_SUPPORT

### 14.1 Objetivo

Preparar a última wave do programa para piloto controlado, release dossier, deploy governado e production verification, preservando a regra **CODE_COMPLETE != DONE** e impedindo qualquer GO sem evidência técnica, operacional, security, compliance, UAT e release gate correspondentes.

### 14.2 Escopo canônico

- Escopo de release aprovado após G10, limitado por tenant/channel/jurisdiction/segment/product/packs explicitamente autorizados.
- Requirements principais: REQ-039/041/042/043/044/045/046/063/065/068/069/073/075/076/077.
- Gate final: RELEASE / READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED.

### 14.3 Pré-condições

Gates predecessores aplicáveis PASS; UAT Mutual aprovado; own-SHA CI/security evidence; migrations validadas; provider contracts e environments aprovados; runbooks exercitados; observability/SLOs ativos; release scope e known limitations explícitos. ADR-034 atualmente impede execução, merge, release, deploy e workflow dispatch.

### 14.4 Pacote de release futuro

- **W11.1** Release candidate imutável identificado por SHA/version/build.
- **W11.2** Release Dossier: ADRs, schemas/migrations, dependencies, packs/config versions, tests, security, UAT, providers, waivers, owners e rollback.
- **W11.3** Scope matrix: tenants/channels/jurisdictions/segments/products/capabilities/features enabled.
- **W11.4** Change freeze e final diff/reconciliation contra baseline autorizado.
- **W11.5** Deployment plan, rollback/kill switch e migration plan.
- **W11.6** Controlled pilot com cohort/volume/guardrails e success/stop criteria.
- **W11.7** Production observability: health, SLO, error, provider, queue/webhook, security, dropoff e support.
- **W11.8** Incident command/support/escalation e communication plan.
- **W11.9** Production verification checklist e evidence bundle.
- **W11.10** Post-release review, residual risks/gaps e decisão de expansão/rollback.

### 14.5 Critérios de aceite

- **AC-W11-01** Release candidate possui SHA/version e CI/security do próprio artefato.
- **AC-W11-02** Nenhum Critical/High aplicável aberto sem waiver formal permitido; hard invariants não são waiveáveis informalmente.
- **AC-W11-03** Release scope é explícito e Conditional-by-Design; capability não incluída permanece desabilitada/not released.
- **AC-W11-04** Migration/config rollback é seguro e histórico publicado não é reescrito.
- **AC-W11-05** Pilot possui stop criteria objetivos e kill switch onde aplicável.
- **AC-W11-06** Production telemetry e support conseguem detectar/triagear falhas sem depender do cliente.
- **AC-W11-07** PRODUCTION_VERIFIED exige observação real pós-deploy; deploy bem-sucedido sozinho não basta.
- **AC-W11-08** Expansão de scope exige nova decisão/evidence quando material.

### 14.6 Release Dossier mínimo

Candidate SHA/version; change list; schema/migrations; dependency/security reports; test matrix/results; UAT sign-offs; regulatory/applicability versions; provider/contracts; data/privacy/KMS controls; observability/SLO; runbooks/drills; incident/support contacts by role; rollback/kill switch; known limitations; waivers; gate decision.

### 14.7 Piloto e métricas

Volume/cohort limitado; success rate, manual review, dropoff, processing time, provider latency/error/cost, incidents, support contacts e data-quality exceptions. Métricas devem ter fonte/fórmula/freshness e não esconder unknown/null.

### 14.8 Stop/rollback criteria

Security incident material; tenant/channel isolation failure; evidence/audit integrity break; unauthorized release scope; provider correlated failure sem degraded handling; incorrect approvals; data-loss/corruption; uncontrolled migration; regulatory blocker; SLO breach severo definido; qualquer hard invariant violado.

### 14.9 Evidence Expected

Release Dossier; approved candidate SHA; own-SHA CI/security; UAT; deployment/rollback evidence; pilot metrics; incident/support records; production traces/health; production verification sign-off; post-release review.

### 14.10 Governança final

Estados devem avançar de forma explícita: READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED. Nenhum estado é inferido pela existência de documentos ou deploy. Toda expansão posterior retorna ao rito de applicability/readiness/gate correspondente.

### 14.11 Visão de produto/negócio

O piloto é validação controlada de operação real, não marketing launch. Comercial/CS só pode prometer features, jurisdições e SLAs incluídos no release scope. White-label, APIs e integrações devem respeitar os mesmos controls do core. Onboarding aprovado não autoriza operação financeira downstream.

### 14.12 Readiness/stop rule

Estado documental: SPECIFIED_FOR_FUTURE_EXECUTION. Wave W11: NOT_STARTED. Gate RELEASE: NOT_STARTED. Nenhum release/deploy foi executado. Enquanto ADR-034 vigorar, qualquer ação técnica de release permanece proibida.

---

## 15. ONB-EVD-001 — Evidence, Release e Runbook Framework

- **Documento:** ONB-EVD-001 — Versão 1.0
- **Status:** CANONICAL EVIDENCE/RELEASE/RUNBOOK FRAMEWORK — release state separado por evidência

### 15.1 Evidência

Evidência é artefato verificável produzido durante execução. Tipos: TEST, AUDIT, API, EVENT, DATA, PROVIDER, SECURITY, DEPLOYMENT, UAT e SCREENSHOT/REPORT quando apropriado.

### 15.2 Evidence Record

Campos mínimos: Evidence ID; Capability ID; Task ID; Requirement/source; environment; generated_at; artifact/reference; hash/integrity quando disponível; owner role; result; release/gate correlation. **Nunca criar Evidence ID para artefato inexistente.**

### 15.3 Dossiê de release

Cada release deve consolidar: versão/commit/deployment; ADRs vigentes; schemas/contracts; migrations; requirements/capabilities incluídas; test results; security checks; provider contract tests; UAT; waivers; gaps/risks aceitos; owners; rollback plan; runbooks; gate decision.

### 15.4 Runbooks mínimos

Incident response; provider outage/degraded mode; webhook replay/reprocessing; data-subject/privacy request; key/secret rotation; rollback; kill switch; queue recovery; provider migration/exit; support/escalation; regional/jurisdiction incident quando aplicável.

### 15.5 Release states

**CODE_COMPLETE não autoriza release.** Sequência: `INTEGRATED → QA → UAT → READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED`.

### 15.6 Waiver

Todo waiver registra requisito, risco, justificativa, autoridade, validade, compensating controls, evidência e condição de encerramento. Waiver não converte ausência de evidência em PASS.

### 15.7 Produção internacional

Release por nova jurisdição exige evidência própria do **Jurisdiction Activation Gate**: legal/privacy, provider coverage, documents/identifiers, AML, locale, residency, tests, UAT e operação. Um release Brasil não prova produção em outro país.

### 15.8 Armazenamento

A aba EVIDENCE do ONB-REG-001 mantém o índice vivo. Artefatos pesados e relatórios de release ficam em 09_RELEASES_E_EVIDENCIAS, sempre referenciados pelo Evidence ID correspondente.

### 15.9 EVIDENCE_EXPECTED x EVIDENCE_OBSERVED

EVIDENCE_EXPECTED descreve o artefato que deve existir para provar um requisito, capability, teste ou gate. EVIDENCE_OBSERVED só existe quando o artefato foi realmente produzido e pode ser referenciado/verificado. **Nenhum Expected vira Observed por declaração textual.**

O Evidence Registry deve distinguir pelo menos: evidence_type, state EXPECTED/OBSERVED, environment, source revision/commit, generated_by/authority, correlation, sensitivity/classification, retention class, integrity/hash, result e gate/release relation.

### 15.10 Exportação e auditoria

Trilhas e dossiês são projeções autorizadas das fontes canônicas, nunca novas fontes de verdade. Formatos suportáveis conforme finalidade incluem CSV, XLSX, JSON/JSONL, PDF/dossiê e evidence bundle estruturado com manifest/hashes. Outputs regulatórios específicos, como CCS/ACCS quando aplicáveis, seguem contrato próprio e layout oficial vigente.

Toda exportação material deve registrar: export_id, schema/version, tenant/scope, filtros, generated_at, generated_by/service, sensitivity, row/event count, hash, evidence refs e audit event. Exportações sensíveis exigem autorização server-side e ficam sujeitas a retention/access logging.

### 15.11 Relação com audit/status

SRC-045 governa status/eventos e a trilha factual; SRC-040 especializa audit/evidence regulatória; este documento governa a evidência de execução, gate, release, runbook e production verification. Documento, build ou screenshot isolado não substitui o conjunto de evidências exigido pelo gate.
