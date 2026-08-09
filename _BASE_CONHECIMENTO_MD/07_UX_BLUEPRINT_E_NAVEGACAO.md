---
titulo: "UX Blueprint e Navegação — Índice do Pacote Front/UX, Blueprint de Experiência, Wireframes/Fluxos e Padrão de Especificação de Telas (Mutual Onboarding)"
fontes:
  - "ONB-UX-000_INDICE_PACOTE_COMPLETO_FRONT_UX_v1.0.docx"
  - "ONB-UX-001_BLUEPRINT_COMPLETO_FRONTEND_E_EXPERIENCIA_v1.0.docx (File ID: 1GelvhrF90Q2isloX3C3preu8K9Oj9Hrr2X8XAgVtIP8)"
  - "ONB-UX-003_WIREFRAMES_FLUXOS_E_NAVEGACAO_v1.0.docx (File ID: 1x4afHItPzpSM2LOFXaLU2LPYxBoiNyry6wkmPAWCxFc)"
  - "ONB-UX-006_PADRAO_DE_ESPECIFICACAO_DAS_TELAS_v1.0.docx (File ID: 1ZbFbHM2po1WoKDdgCVPJI4rcwYWlysZ-zZ0Xhfq7JkE)"
status_fonte: "CANONICAL — contrato de estado desejado; implementação técnica separada por evidência"
gerado_em: 2026-08-09
---

# PARTE 1 — ÍNDICE DO PACOTE COMPLETO FRONT / UX (ONB-UX-000 v1.0)

Versão 1.0 | Status do pacote: CANONICAL — contrato de estado desejado; implementação técnica separada por evidência.

## 1.1 Artefatos do pacote

| # | Documento | File ID | Pasta | Função |
|---|---|---|---|---|
| 1 | ONB-UX-001_BLUEPRINT_COMPLETO_FRONTEND_E_EXPERIENCIA_v1.0 | 1GelvhrF90Q2isloX3C3preu8K9Oj9Hrr2X8XAgVtIP8 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | Princípios de experiência, quatro superfícies, navegação, arquetipos, jornadas, dashboards, KPIs, filtros, estados, responsividade, acessibilidade, internacionalização, design system, segurança e homologação. |
| 2 | ONB-UX-002_REGISTRO_COMPLETO_80_TELAS_DASHBOARDS_KPIS_FILTROS_v1.0 | 1MGL65sMNbwWELUBA-fOvmMA2nKc7EP1nr6rmH_7vs70 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | Registry vivo com 80 telas, 82 KPIs, 20 filtros, 50 RF, 40 RNF, estados, permissões, navegação, 12 user flows, 12 technical flows, design system, 12 relatórios e 400 AC mínimos. |
| 3 | ONB-UX-003_WIREFRAMES_FLUXOS_E_NAVEGACAO_v1.0 | 1x4afHItPzpSM2LOFXaLU2LPYxBoiNyry6wkmPAWCxFc | 03_PRODUTO_UX_E_SCREEN_REGISTRY | Low-fi wireframes dos arquetipos de Jornada, Analista, Admin/Developer e Mutual; regras de navegação e fluxos canônicos. |
| 4 | ONB-REQ-002_REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS_FRONT_UX_v1.0 | 1QZEmBavpRRi7YbhWrYvEn0m0eJkh3wq_3rrBuETTno0 | 02_REQUISITOS_E_CAPABILITIES | Catálogo narrativo RF-UX-001..050 e RNF-UX-001..040, critérios READY e regras para PR/task. |
| 5 | ONB-ARQ-003_FLUXOS_TECNICOS_FRONT_BACKEND_PROVIDERS_v1.0 | 1XlV64Z_71dWxOSbYid1DiziaK1TL3sisVbdJUBuiBPk | 04_ARQUITETURA_REPOSITORIO_E_BASELINE | Responsabilidades por camada, fluxos técnicos de case, capability, documento, biometria, decisão, webhook, tenant resolution, HFS, retention, observabilidade e release. |
| 6 | ONB-QA-003_CRITERIOS_HOMOLOGACAO_UX_FRONT_v1.0 | 1Gimd8EY3J0YN3UmHodZRqpofyAckQOTX1ezFb8YpVvA | 07_QA_SEGURANCA_E_HOMOLOGACAO | Gate de homologação das 80 telas, critérios cross-cutting, evidência e resultado PASS/PASS_WITH_RESTRICTION/FAIL/NOT_TESTED. |
| 7 | ONB-UX-004_ESPECIFICACAO_TELA_A_TELA_A1_D14_v1.0 | 18r2R11p5GRRbMmiC0DOEY5Fic9_-8jPj4UzwZ8-KfR4 | 03_PRODUTO_UX_E_SCREEN_REGISTRY | Especificação individual das 80 funções A1–D14 com objetivo, componentes, dados, regras, ações, permissões, estados, integrações/eventos, métricas e aceite. |
| 8 | ONB-UX-005_DASHBOARDS_KPIS_FILTROS_RELATORIOS_v1.0 | 1LbNesHtRJcJXwgzyzGcU_ySEl1Cd6yTxincD9Y4e3Rw | 03_PRODUTO_UX_E_SCREEN_REGISTRY | Arquitetura de gestão visual; catálogo ampliado de KPIs; filtros; busca; relatórios; freshness; drill-down; qualidade e homologação analítica. |
| 9 | ONB-UX-006_PADRAO_DE_ESPECIFICACAO_DAS_TELAS_v1.0 | 1ZbFbHM2po1WoKDdgCVPJI4rcwYWlysZ-zZ0Xhfq7JkE | 03_PRODUTO_UX_E_SCREEN_REGISTRY | Padrão transversal de campos, qualidade, segurança, evidência, acceptance criteria, testes e mapping Design×Código por Screen ID. |

## 1.2 Regra de uso

- Produto/UX consulta ONB-UX-001 e ONB-UX-003.
- Execução e rastreabilidade usam ONB-UX-002 como registry vivo.
- Claude Code/dev usa ONB-REQ-002 + ONB-ARQ-003 + ONB-UX-002 antes de criar/alterar telas.
- QA usa ONB-QA-003 e AC_HOMOLOGATION do registry.
- Nenhum artefato deste pacote autoriza código por si só; cada task continua sujeita ao READY gate do programa.
- O pacote é global por arquitetura e Brasil-first operacionalmente.

## 1.3 Atualização da regra de uso

- Especificação de uma tela: ONB-UX-004 + linha correspondente de SCREENS_80.
- Dashboard/KPI/filtro/relatório: ONB-UX-005 + abas DASHBOARD_KPI, FILTERS_SEARCH e REPORTS do ONB-UX-002.
- Diagrama técnico: ONB-ARQ-003 seção 25, além dos TECH_FLOWS do registry.

## 1.4 Regra de maturidade documental

Este pacote é CANONICAL como contrato de produto/UX do Mutual Onboarding. CANONICAL não significa REAL, READY, QA PASS, RELEASED ou PRODUCTION_VERIFIED. Implementação, integrações, segurança, testes e produção permanecem classificados separadamente por evidência no ONB-REG-001. Aplicabilidade regulatória concreta é resolvida pelos packs e pela governança competente.

## 1.5 Regra de autoridade UX — ADR-030

- ONB-UX-001 = blueprint de experiência e superfícies.
- ONB-UX-002 = registry vivo de telas/KPIs/filtros/flows/AC.
- ONB-UX-003 = wireframes, fluxos e navegação.
- ONB-UX-004 = especificação funcional individual A1–D14.
- ONB-UX-005 = dashboards, KPIs, filtros e relatórios.
- ONB-UX-006 = padrão de especificação e qualidade das telas.

Nenhum código documental UX ativo é duplicado. O antigo código ONB-UX-001 do padrão foi alterado para ONB-UX-006 preservando o File ID; o blueprint permanece ONB-UX-001.

---

# PARTE 2 — BLUEPRINT COMPLETO DE FRONTEND E EXPERIÊNCIA (ONB-UX-001 v1.0)

Versão 1.0 | Status: CANONICAL — blueprint de estado desejado; implementação técnica separada por evidência.


## 1. OBJETIVO

Definir a experiência completa do Mutual Onboarding Corporativo para clientes, analistas, administradores, desenvolvedores e operação Mutual. O blueprint transforma as 80 funções canônicas de tela em uma linguagem única de produto, UX, dados, segurança, operação e homologação. Interface pronta não significa operação pronta: cada superfície deve possuir backend, dados, autorização, tenant context, estados, testes e evidência.


## 2. PRINCÍPIOS IMUTÁVEIS DE EXPERIÊNCIA

- Onboarding é lifecycle, não formulário.
- O usuário sempre sabe onde está, o que falta, por que algo é exigido e qual é a próxima ação.
- A complexidade regulatória fica no motor/policy; a jornada apresenta somente o necessário para aquele sujeito, produto, segmento e jurisdição.
- Segurança é server-side; esconder botão não é autorização.
- Provider nunca aparece como fonte soberana da verdade; a UI apresenta capability, evidência, resultado normalizado, divergência e lineage.
- Estados UNKNOWN, INCONCLUSIVE, UNAVAILABLE e MANUAL_REVIEW_REQUIRED são explícitos; indisponibilidade nunca vira aprovação.
- A experiência é Brasil-first operacionalmente e internacional por arquitetura desde a fundação.
- A jornada externa é mobile-first; consoles internos são desktop-first responsivos.
- White-label altera marca e conteúdo, nunca semântica de risco, segurança ou auditoria.
- Acessibilidade, localização, privacidade, masking, auditabilidade e observabilidade fazem parte da definição de pronto.

## 3. QUATRO SUPERFÍCIES DO PRODUTO

- A — JORNADA DO CLIENTE: PF, representante de PJ, sócio, UBO, administrador, procurador, pessoa-chave ou convidado delegado. Deve reduzir fricção, orientar captura, permitir salvar/retomar e exibir status real.
- B — PAINEL DO ANALISTA: onboarding, compliance, risco, fraude, EDD, supervisor e aprovador. Deve concentrar fila, evidências, timeline, relações, divergências, investigação, pendências e decisão.
- C — ADMIN + DEVELOPER PLATFORM: produto, administradores do tenant e times de integração. Deve governar requirements, flows, policies, providers, branding, usuários, API, webhooks, sandbox e publicação.
- D — CONSOLE MUTUAL: operação global, suporte, segurança, governança, modelos, fornecedores, plataforma e homologação. Deve operar multi-tenant com ações privilegiadas justificadas e auditadas.

## 4. ARQUITETURA DE NAVEGAÇÃO

- Jornada: A1 -> A2/A3 -> A4 -> etapas condicionais A5-A11 -> A12 -> A13 -> A14, com A15-A20 ativadas por delegação, pendência, contestação ou consentimento.
- Analista: B1 -> B2 como contexto do caso -> B3-B11/B13-B22 por tabs/drawers -> B12 como superfície de decisão condicionada por alçada.
- Admin: C1 como cockpit do tenant -> módulos C2-C24 na sidebar, mantendo versão/status no contexto.
- Mutual: D1 como visão de tenants -> D2-D14 por operação, risco, governança e release.

## 5. ARQUÉTIPOS DE TELA

- **JRN-FORM:** stepper, título, contexto curto, formulário em blocos, helper text, validação progressiva, salvar/continuar e privacidade.
- **JRN-CAPTURE:** instrução, câmera/upload, qualidade em tempo real, preview, retry, fallback assistido, consentimento e status.
- **JRN-RELATIONSHIP:** árvore/grafo/lista de sócios e terceiros, formulário lateral, percentuais/roles, validações e progresso.
- **JRN-REVIEW:** resumo por seção, alertas, termos, assinatura/aceite, confirmação e submissão.
- **JRN-STATUS:** progresso, timeline, pendências, mensagens, SLA/status e retomada.
- **OPS-QUEUE:** KPIs, busca, filtros, tabela, SLA/aging, risk badges, owner e ações controladas.
- **OPS-CASE-OVERVIEW:** header do case, subject/entity, status, risk, checklist, timeline, evidências e painel de ação.
- **OPS-EVIDENCE:** filtros/tabs, lista de evidências, origem, timestamp, versão, confidence/reason codes, lineage e detalhe.
- **OPS-INVESTIGATION:** canvas/grafo, entidades, sinais, notas, evidências, filtros, timeline e ligação para decisão.
- **OPS-DECISION:** evidências-chave, autoridade, reason codes, restrições, maker-checker, confirmação e trilha.
- **OPS-EXPORT:** seleção de escopo, masking, classificação, justificativa e geração auditada.
- **ADM-DASHBOARD:** KPIs, funil, tendências, breakdown por país/segmento/provider, alertas e atalhos.
- **ADM-BUILDER:** versão/status, canvas/editor, propriedades, validações, preview, simulação, diff e publicação.
- **ADM-LIST-CONFIG:** lista/tabela, filtros, detalhe, versão, editar, validar, duplicar e publicar.
- **ADM-IAM:** usuários, roles/capabilities, convites, revogação, SoD, sessões e auditoria.
- **DEV-PLATFORM:** ambientes, API keys/scopes, endpoints, webhooks, logs, exemplos, sandbox, SDK e hosted flow.
- **MUT-OPS-DASHBOARD:** visão multi-tenant, health, custos, incidentes, SLO, trends e drill-down.
- **MUT-CONTROL:** ação crítica, escopo, impacto, justificativa, checker, executar/reverter e auditoria.
- **MUT-GOVERNANCE:** registry, versões, baseline, diff, aprovação, evidências e histórico.
- **MUT-REGISTRY:** tabela global, filtros, detalhe, relações, health/status e ações administrativas.

## 6. JORNADA DO CLIENTE — PADRÃO DE EXPERIÊNCIA

- A1 deve explicar quem solicita a verificação, finalidade, duração esperada, privacidade e suporte, com idioma e retomada segura.
- A2/A3 determinam natureza e jurisdição sem expor regras internas; a seleção alimenta o flow/policy server-side.
- A4 exibe stepper dinâmico derivado da política ativa, nunca um roteiro hardcoded no frontend.
- A5/A6 priorizam captura assistida, feedback imediato, retry compreensível e fallback. Falha técnica não pode soar como reprovação.
- A7 usa estrutura de endereço compatível com JurisdictionPack, sem exigir formato brasileiro universal.
- A8-A10 usam relacionamento como entidade de primeira classe: sócio, UBO, representante, terceiro, participação, função e validade.
- A11 mantém documentos societários por tipo, versão e sujeito/empresa.
- A12 mostra termos e consentimentos em linguagem localizada, com versão e evidência de aceite.
- A13 apresenta checklist final e permite corrigir seções antes do envio.
- A14 mostra status server-authoritative, timeline, pendências e ações permitidas.
- A15-A17 coordenam múltiplas pessoas sem permitir que um convidado veja dados além do escopo delegado.
- A18-A20 cobrem contestação, assistência e consentimentos externos com trilha própria.

## 7. PAINEL DO ANALISTA — PADRÃO DE EXPERIÊNCIA

- B1 deve abrir com backlog, aging, SLA, casos críticos e filtros persistentes. A tabela prioriza Case ID, sujeito/empresa, tenant, produto, jurisdição, risco, status, owner, SLA e última mudança.
- B2 fixa o contexto do caso: Case ID, entity/subject, produto, jurisdição, status, risk band, checklist e timeline.
- B3-B10 separam evidência por domínio sem fragmentar a decisão. Cada evidência mostra fonte, provider/source type, horário, versão, resultado normalizado, confidence/reason code, raw reference controlada, expiração e divergências.
- B11 mostra acessos e ações relevantes sem expor secrets.
- B12 concentra a decisão e deve impedir self-approval quando SoD for exigida. O usuário precisa saber sua autoridade antes de tentar confirmar.
- B13 comunica pendência com prazo, escopo e campos/documentos requeridos.
- B14/B15 organizam revalidação e alertas contínuos.
- B16 exporta dossiê com masking e classificação.
- B17 mantém contestação em fila própria.
- B18 explicita divergência entre fontes; nenhuma divergência pode desaparecer por conveniência visual.
- B19-B21 apresentam fraude/device, capacidade econômica e licenças.
- B22 é o workspace investigativo, incluindo sinais HFS sem revelar metodologia proprietária.

## 8. ADMIN + DEVELOPER PLATFORM

- C1 mede conversão, drop-off, STP, SLA, custo/caso, latência, erro, failover, revalidação e uso de API/webhooks.
- C2-C9 implementam requirements, flows e policies como objetos versionados: draft -> validate -> simulate -> pending approval -> published -> deprecated/revoked. Publicação sensível exige maker-checker.
- C10 não configura marcas dentro de regras de negócio; configura routing por capability, jurisdição, economic_group, SLA, cost, quality, health e restrições.
- C11 apresenta custo/uso/margem com fonte e moeda explícitas.
- C12/C13 cobrem white-label, domínio, e-mail, idioma e canais mantendo acessibilidade.
- C14/C15 governam usuários, capabilities, alçadas e segregação.
- C16/C22/C23 formam Developer Platform: ambientes, credenciais, scopes, OpenAPI, webhooks assinados, replay protection, sandbox, SDK, hosted flow e logs.
- C17/C18 cobrem auditoria de configuração e proteção de dados.
- C19-C21 tratam produtos de verificação como composição de capabilities, rules e packs.
- C24 centraliza templates e localização de notificações.

## 9. CONSOLE MUTUAL

- D1 mostra tenants, regiões, segmentos, status, volume, health e provisioning.
- D2 acompanha provider health por capability/região e economic_group.
- D3 acompanha custos e margem sem transformar estimativa em contabilidade oficial.
- D4 é kill switch crítico com dupla aprovação, escopo, impacto e rollback.
- D5 governa HFS/modelos, versões, validação, health, degraded mode e rollback.
- D6 é catálogo das CAP-01..22 e readiness.
- D7 permite suporte assistido com acesso privilegiado justificado.
- D8 registra acesso Mutual e ações privilegiadas.
- D9 controla provisioning, features, regiões, jurisdições e ambientes.
- D10 governa third-party risk e concentração.
- D11 mantém baseline de jurisdições e overlays normativos.
- D12 centraliza segurança, privacidade e incidentes.
- D13 mostra jobs, queues, webhooks, workers e internal capabilities.
- D14 consolida screens, capabilities, gaps, CI, QA, evidências, waivers, gates e decisão de release.

## 10. DASHBOARDS E KPIs

- Camada Jornada: taxa início->submissão, drop-off por etapa, tempo por etapa, retries de documento/biometria, sessões expiradas e pendências.
- Camada Analista: backlog, aging, SLA, throughput, manual review rate, approval/rejection, escalation e tempo por tipo de caso.
- Camada Tenant: conversão, STP, custo/caso, custo/capability, latência P95, erro provider, failover, webhook delivery, API success e revalidação.
- Camada Mutual: tenants ativos, volume, disponibilidade, P95/P99, incidentes, provider health, custo/margem estimada, capabilities bloqueadas, cobertura de 80 telas e HFS health.
Todo KPI deve possuir definição, unidade, fórmula, fonte, granularidade, filtros, timezone e owner por papel antes de ser CANONICAL.


## 11. FILTROS E BUSCA

Padrão analítico: tenant, produto, segmento, jurisdição/país, subject type, status, risk band, período, owner, prioridade, SLA, capability, provider, economic_group, origem/canal, ambiente, versão, health, severity e release/gate.

Filtros devem ser tenant-safe, persistentes por usuário quando autorizado e visíveis em exports. Busca global deve respeitar masking e autorização, podendo localizar por case_id, subject/entity e identificadores permitidos.


## 12. ESTADOS OBRIGATÓRIOS

Toda tela prevê loading, empty, ready, partial, validation_error, system_error, timeout, unavailable, access_denied, blocked e retrying. Jornadas adicionam draft, saved, expired_session, resumed, submitted e pending_complement. Consoles adicionam assigned/in_review/waiting_customer/decided ou draft/pending_approval/published/deprecated, conforme domínio. Estados degradados nunca são escondidos.


## 13. RESPONSIVIDADE

- Jornada: mobile-first, câmera/upload, teclado/touch, largura de leitura controlada, CTA alcançável, safe areas e retomada. Desktop compatível.
Consoles: desktop-first, mínimo operacional definido no release; tabelas priorizam colunas, detalhes migram para drawer, filtros podem colapsar e nenhuma ação crítica pode desaparecer em viewport menor. Tablet é aceito para consulta quando homologado.


## 14. ACESSIBILIDADE

Exigir nível AA conforme padrão vigente: navegação por teclado, ordem de foco, foco visível, labels persistentes, contraste, mensagens de erro associadas ao campo, leitor de tela, alt text quando aplicável e status não dependente somente de cor. Grafo deve ter representação alternativa em lista/tabela.


## 15. INTERNACIONALIZAÇÃO

Não hardcode CPF/CNPJ, CEP, UF, telefone, nome civil, endereço ou idioma como universais. JurisdictionPack define identificadores, documentos, formatos, registry oficial, AML/privacy/retention e provider routes. UI usa UTF-8, locale, timezone, expansão de texto e componentes preparados para novos alfabetos; RTL é habilitado quando mercado exigir. Brasil é primeiro pack operacional, não o único modelo.


## 16. DESIGN SYSTEM

Usar @mutual-processadora-de-pagamentos/lib-ui como base obrigatória quando disponível no repositório. Tokens centralizam cor, tipografia, spacing, radius, elevation, status e density. Componentes mínimos: AppShell, PageHeader, Breadcrumbs, KPI Card, FilterBar, DataTable, StatusBadge, RiskBadge, Timeline, Stepper, FormField, Upload/Capture, EvidenceCard, Drawer, Modal, Tabs, EmptyState, ErrorState, Skeleton, Toast, AuditTrail, GraphViewer, DiffViewer e CriticalActionDialog.

Status sempre usa ícone + label + cor. White-label pode customizar tokens permitidos, mantendo contraste e semântica.


## 17. UX DE SEGURANÇA E PRIVACIDADE

A interface deve exibir somente o mínimo necessário. PII sensível é mascarada por padrão em consoles; reveal exige capability e pode exigir justificativa. Ações críticas mostram impacto, escopo e irreversibilidade. Export/download sensível gera evidência. Sessão expirada não perde dados válidos já persistidos. Erros não revelam secrets, stack trace ou existência de recurso fora do tenant.


## 18. UX DE ERRO E RESILIÊNCIA

Mensagens devem distinguir erro do usuário, validação, indisponibilidade de provider, timeout, bloqueio regulatório e falha interna. Sempre que seguro, mostrar ação seguinte: corrigir, tentar novamente, aguardar, solicitar ajuda ou enviar para revisão. correlation_id pode ser mostrado para suporte. Retry deve ser idempotente e não duplicar case/evidence/charge.


## 19. HOMOLOGAÇÃO DE UMA TELA

Uma função de tela só pode passar quando: objetivo e owner por papel estão definidos; route/view está mapeada; dados e fonte são conhecidos; auth/tenant/capability são enforced; estados obrigatórios existem; responsive e acessibilidade foram testados; ações críticas têm confirmação/auditoria; testes positivos e negativos passam; evidência está ligada ao Screen ID; nenhum mock é apresentado como integração real.


## 20. ARTEFATO DE CONTROLE

O Google Sheets ONB-UX-002 é o registry vivo deste blueprint. Ele contém as 80 funções, KPIs, filtros, 50 requisitos funcionais, 40 não funcionais, estados, permissões, navegação, 12 fluxos de usuário, 12 fluxos técnicos, design system e 400 critérios de homologação. Este documento explica a intenção; o registry controla a execução.

REGRA DE MATURIDADE DOCUMENTAL

Este blueprint é CANONICAL como intenção e contrato de experiência das superfícies A/B/C/D. Ele não comprova route, backend, autorização, provider, integração, teste, QA ou produção. Esses estados permanecem no registry/evidence e serão reconciliados contra o GitHub na D2.


---

# PARTE 3 — WIREFRAMES, FLUXOS E NAVEGAÇÃO (ONB-UX-003 v1.0)

Versão 1.0 | Status: CANONICAL — referência de wireframe/fluxo; implementação técnica separada por evidência.


## 1. OBJETIVO

Definir low-fidelity wireframes reutilizáveis para as 80 funções canônicas de tela. O Screen Registry ONB-UX-002 mapeia cada Screen ID para um dos padrões abaixo. O objetivo é orientar Figma/Claude Code/frontend sem gerar 80 layouts inconsistentes.


## 2. WIREFRAME JRN-FORM — A2, A3, A4, A7 e jornadas equivalentes

```text
+--------------------------------------------------+
| Logo tenant        Etapa 2 de 7        Idioma   |
|--------------------------------------------------|
| Título da etapa                                  |
| Contexto curto / por que pedimos isso            |
|                                                  |
| [ Campo / seletor __________________________ ]    |
| helper text / validação                          |
| [ Campo ____________________________________ ]    |
|                                                  |
| Ajuda / privacidade                              |
|--------------------------------------------------|
| < Voltar                    Salvar e continuar > |
+--------------------------------------------------+
```


**Regras:** uma pergunta conceitual por bloco; labels persistentes; validação progressiva; máscara só visual; autosave quando aplicável; erros próximos ao campo; JurisdictionPack define formatos.


## 3. WIREFRAME JRN-CAPTURE — A5/A6

```text
+--------------------------------------------------+
| Logo | Stepper | Ajuda                            |
|--------------------------------------------------|
| Instrução objetiva                               |
| +----------------------------------------------+ |
| |        CAMERA / UPLOAD / SDK                 | |
| |  guia de enquadramento / qualidade           | |
| +----------------------------------------------+ |
| [qualidade] [documento detectado] [privacidade] |
| Preview -> Usar captura / Refazer                |
| Fallback assistido                               |
+--------------------------------------------------+
```


**Regras:** estado de permissão da câmera, conexão, baixa qualidade, timeout, retry, provider unavailable e fallback são distintos; falha técnica não pode ser apresentada como reprovação.


## 4. WIREFRAME JRN-RELATIONSHIP — A8/A9/A10

```text
+--------------------------------------------------+
| Stepper | Estrutura societária                   |
|--------------------------------------------------|
| Resumo: 3 sócios | UBO pendente | 85% mapeado    |
|--------------------------------------------------|
| Árvore/Lista                         | Detalhe   |
| Empresa A                            | Nome      |
|  |- Pessoa 1 60%                     | Papel     |
|  |- Empresa B 40%                    | %         |
|      |- Pessoa 2 ...                 | Docs      |
|--------------------------------------------------|
| + Adicionar relação                  Continuar > |
+--------------------------------------------------+
```


**Regras:** grafo possui alternativa em lista; entidade e relação possuem IDs; percentuais e papéis são validados; convidado vê somente seu escopo.


## 5. WIREFRAME JRN-REVIEW — A12/A13/A20

```text
+--------------------------------------------------+
| Stepper | Revisão final                          |
|--------------------------------------------------|
| [✓] Dados cadastrais        Editar               |
| [!] Documento expirando     Corrigir             |
| [✓] Pessoas-chave                                |
|--------------------------------------------------|
| Termos / consentimentos / versão                 |
| [ ] Declaro...                                   |
|--------------------------------------------------|
| < Voltar                         Enviar/Assinar > |
+--------------------------------------------------+
```


**Regras:** mostrar exatamente o que será submetido; consentimento não pré-marcado; termos versionados; submissão idempotente; confirmar impacto.


## 6. WIREFRAME JRN-STATUS — A1/A14/A17/A19

```text
+--------------------------------------------------+
| Marca / Suporte / Idioma                         |
|--------------------------------------------------|
| Status: Em análise                               |
| Progresso: ███████░░ 75%                         |
|--------------------------------------------------|
| Timeline                                         |
| ✓ Dados recebidos                                |
| ✓ Documento validado                             |
| ! Precisamos de complemento                      |
|--------------------------------------------------|
| [Enviar complemento] [Falar com suporte]         |
+--------------------------------------------------+
```


**Regras:** status vem do servidor; não prometer SLA sem fonte; pendência leva à etapa correta; retomada segura.


## 7. WIREFRAME OPS-QUEUE — B1/B17

```text
+--------------------------------------------------------------------------------+
| Onboarding | Busca global | Tenant | Usuário                                      |
|--------------------------------------------------------------------------------|
| Backlog 320 | SLA 91% | Aging 4h | Críticos 12 | Manual review 28%               |
|--------------------------------------------------------------------------------|
| Filtros: [tenant] [produto] [país] [status] [risco] [owner] [SLA] [mais]        |
|--------------------------------------------------------------------------------|
| Case | Entidade | País | Risco | Status | Owner | SLA | Última alteração | >       |
| ...                                                                            |
|--------------------------------------------------------------------------------|
| Paginação / visão salva / export autorizado                                     |
+--------------------------------------------------------------------------------+
```


**Regras:** filtros ficam visíveis; risk badge não substitui reason; overdue claramente marcado; bulk action limitada; linha abre B2.


## 8. WIREFRAME OPS-CASE-OVERVIEW — B2

```text
+--------------------------------------------------------------------------------+
| Case ID | Empresa/Pessoa | Tenant | Jurisdição | Status | Risk | Owner             |
|--------------------------------------------------------------------------------|
| [Resumo] [Evidências] [Relações] [AML] [Docs] [Timeline] [Investigação]         |
|--------------------------------------------------------------------------------|
| Checklist         | Evidências-chave                 | Timeline                  |
| 8/10 concluído    | Doc PASS / AML REVIEW            | evento...                 |
| Pendências 2      | Fraude UNKNOWN                   | evento...                 |
|--------------------------------------------------------------------------------|
| Próxima ação / authority / abrir decisão B12                                  |
+--------------------------------------------------------------------------------+
```


**Regras:** Case ID sempre visível; tabs preservam contexto; dados sensíveis masked; lineage acessível; ação depende de role/capability.


## 9. WIREFRAME OPS-EVIDENCE — B3/B7/B8/B9/B10/B18/B19/B20/B21

```text
+--------------------------------------------------------------------------------+
| Caso | Domínio de evidência | filtros provider/status/data                       |
|--------------------------------------------------------------------------------|
| Lista de evidências             | Detalhe                                      |
| CAP-08 / PEP / REVIEW           | Source / provider                           |
| CAP-08 / Sanctions / PASS       | Timestamp / versão                          |
| CAP-09 / Media / UNKNOWN        | Status / confidence / reason                |
|                                 | Normalized result                            |
|                                 | Lineage / raw reference controlada          |
|--------------------------------------------------------------------------------|
| Comparar fontes | adicionar nota | solicitar complemento | investigar            |
+--------------------------------------------------------------------------------+
```


**Regras:** divergências lado a lado; UNKNOWN não vira PASS; raw payload não é despejado sem masking/autorização.


## 10. WIREFRAME OPS-INVESTIGATION — B4/B22

```text
+--------------------------------------------------------------------------------+
| Case / Busca / Filtros de relação e sinais                                      |
|--------------------------------------------------------------------------------|
| Entidades/Alertas      |        GRAFO / CANVAS                | Evidência/Notas      |
| Pessoa A               |    [A]---[B]---[C]                   | HFS signal           |
| Empresa B              |       \ [D]                         | AML hit              |
| HFS alert              |                                     | note                 |
|--------------------------------------------------------------------------------|
| Timeline | hipóteses | checklist | escalar | ir para decisão                     |
+--------------------------------------------------------------------------------+
```


**Regras:** lista alternativa acessível; HFS mostra categoria/sinal/model_version/lineage, nunca pesos/fórmulas/thresholds proprietários.


## 11. WIREFRAME OPS-DECISION — B12

```text
+--------------------------------------------------------------------------------+
| Caso | Estado | Authority do usuário | Maker                                      |
|--------------------------------------------------------------------------------|
| Evidências-chave / divergências / pendências                                    |
|--------------------------------------------------------------------------------|
| Decisão: ( ) Aprovar ( ) Aprovar com restrição ( ) Reprovar ( ) Escalar        |
| Motivo/reason code [____________________________]                               |
| Justificativa [____________________________________]                            |
| Restrições [_______________________________________]                            |
|--------------------------------------------------------------------------------|
| Checker requerido: SIM | usuário elegível | self-approval: BLOQUEADO             |
| [Cancelar]                                          [Confirmar decisão]         |
+--------------------------------------------------------------------------------+
```


**Regras:** autorização server-side; confirmação forte; reason/evidence obrigatórios; transição state-machine; audit append-only.


## 12. WIREFRAME OPS-EXPORT — B16

```text
+--------------------------------------------------------------+
| Dossiê / Export                                              |
|--------------------------------------------------------------|
| Escopo [completo/parcial]  Formato [PDF/CSV...]              |
| Masking [padrão]  Classificação [confidencial]               |
| Justificativa [_______________________________]              |
| Preview de seções                                            |
|--------------------------------------------------------------|
| [Gerar] -> job -> status -> download expirável               |
+--------------------------------------------------------------+
```


**Regras:** export não bypassa permission; grandes exports assíncronos; download registrado; timezone/locale e versão incluídos.


## 13. WIREFRAME ADM-DASHBOARD — C1/C11

```text
+--------------------------------------------------------------------------------+
| Tenant | Período | Produto | País | Segmento | Export                            |
|--------------------------------------------------------------------------------|
| Conversão | STP | SLA | Custo/case | Erro provider | Failover | Revalidação       |
|--------------------------------------------------------------------------------|
| Funil onboarding          | Tendência volume/custo          | Alertas             |
|--------------------------------------------------------------------------------|
| Breakdown por país/segmento/provider/capability                                  |
+--------------------------------------------------------------------------------+
```


**Regras:** KPI com fórmula/fonte; moeda e timezone explícitos; filtros persistem; card abre drill-down e não esconde denominador.


## 14. WIREFRAME ADM-BUILDER — C3/C5/C7/C8/C20/C21

```text
+--------------------------------------------------------------------------------+
| Objeto | versão vX | DRAFT | owner | ações                                        |
|--------------------------------------------------------------------------------|
| Canvas/Editor                       | Propriedades / Condições                     |
| [Node] -> [Rule] -> [Capability]    | Jurisdição                                  |
|                                    | Segmento                                    |
|                                    | Threshold/reason (quando não secreto)        |
|--------------------------------------------------------------------------------|
| Validações | Preview | Simulação | Diff                                            |
| [Salvar draft] [Enviar aprovação] [Publicar se autorizado]                       |
+--------------------------------------------------------------------------------+
```


**Regras:** published é imutável; edição gera nova versão; simulator mostra regras/capabilities; HFS não expõe metodologia.


## 15. WIREFRAME ADM-LIST-CONFIG — C2/C4/C6/C9/C10/C12/C13/C17/C18/C19/C24

```text
+--------------------------------------------------------------------------------+
| Módulo | busca | filtros | + criar                                                |
|--------------------------------------------------------------------------------|
| Nome | versão | status | escopo | owner | updated | ações                         |
|--------------------------------------------------------------------------------|
| Drawer de detalhe: configuração + histórico + diff + auditoria                   |
+--------------------------------------------------------------------------------+
```


**Regras:** lista separa draft/published/deprecated; ações dependem de capability; provider mostra economic_group; config crítica exige checker.


## 16. WIREFRAME ADM-IAM — C14/C15

```text
+--------------------------------------------------------------------------------+
| Usuários & Acessos | busca | status | role | tenant                                |
|--------------------------------------------------------------------------------|
| Usuário | roles | capabilities | sessão | MFA/policy | status | ações              |
|--------------------------------------------------------------------------------|
| Drawer: memberships, scopes, convites, revogação, SoD, audit                      |
+--------------------------------------------------------------------------------+
```


**Regras:** sem roles hierárquicas implícitas; capability granular; maker-checker; sessões revogáveis; acesso privilegiado explícito.


## 17. WIREFRAME DEV-PLATFORM — C16/C22/C23

```text
+--------------------------------------------------------------------------------+
| Developer | Ambiente: Sandbox v | Docs | Status                                    |
|--------------------------------------------------------------------------------|
| API Keys/Scopes     | Webhooks/Endpoints       | Logs                               |
| key ****ABCD        | URL / eventos            | request/correlation                |
| rotate/revoke       | secret / signature       | status/latency/retry               |
|--------------------------------------------------------------------------------|
| OpenAPI | exemplos | SDK | Hosted Flow | Test Data                                  |
+--------------------------------------------------------------------------------+
```


**Regras:** secret mostrado uma vez quando aplicável; scopes explícitos; webhook replay protection; redelivery; logs sem PII sensível.


## 18. WIREFRAME MUT-OPS-DASHBOARD — D2/D3/D13/D14

```text
+--------------------------------------------------------------------------------+
| Mutual Global | período | tenant | região | provider | capability | ambiente        |
|--------------------------------------------------------------------------------|
| Uptime | P95 | Erro | Incidentes | Custo | Margem est. | Gates | Screens homolog.  |
|--------------------------------------------------------------------------------|
| Provider health | Jobs/queues | Releases/Gates | Trends                              |
|--------------------------------------------------------------------------------|
| Alertas críticos / drill-down / runbook                                          |
+--------------------------------------------------------------------------------+
```


**Regras:** multi-tenant apenas para roles Mutual; margem estimada não é contabilidade; gate mostra evidência e waiver.


## 19. WIREFRAME MUT-CONTROL — D4/D12

```text
+--------------------------------------------------------------+
| CONTROLE CRÍTICO                                             |
| Escopo: tenant/provider/capability/região                    |
| Estado atual: HEALTHY / DEGRADED / INCIDENT                  |
| Impacto estimado: ...                                        |
| Motivo obrigatório: [________________________]               |
| Checker independente: [________]                             |
|--------------------------------------------------------------|
| [Cancelar] [Executar ação crítica]                           |
| Plano de rollback / evidência / audit                        |
+--------------------------------------------------------------+
```


**Regras:** sem one-click perigoso; impacto e blast radius; step-up auth quando policy exigir; idempotency; rollback.


## 20. WIREFRAME MUT-GOVERNANCE — D5/D6/D11

```text
+--------------------------------------------------------------------------------+
| Registry | filtros | baseline | versão                                             |
|--------------------------------------------------------------------------------|
| Item | categoria | status | versão | jurisdiction | owner | gate                    |
|--------------------------------------------------------------------------------|
| Detalhe: contrato/baseline | validação | diff | evidências | histórico              |
+--------------------------------------------------------------------------------+
```


**Regras:** CAP-22 é internal; jurisdição não é simples flag; versões e decisões preservam histórico.


## 21. WIREFRAME MUT-REGISTRY — D1/D7/D8/D9/D10

```text
+--------------------------------------------------------------------------------+
| Registry Global | busca | filtros                                                  |
|--------------------------------------------------------------------------------|
| Tenant/Fornecedor/Acesso | status | região | risco | health | ações                 |
|--------------------------------------------------------------------------------|
| Drawer: relacionamento, contratos/metadados, provisioning, audit                   |
+--------------------------------------------------------------------------------+
```


**Regras:** acesso privilegiado e third-party risk são auditáveis; provisioning por feature/region/jurisdiction; sem acesso irrestrito implícito.


## 22. FLUXOS DE USUÁRIO CANÔNICOS

- **UF-001** PF: A1 -> A3 -> A4 -> A6 -> A5 -> A7 -> A12 -> A13 -> A14.
- **UF-002** PJ/KYB: A1 -> A2 -> A3 -> A4 -> A8 -> A9 -> A11 -> A12 -> A13, com A15/A16/A17 para pessoas-chave.
- **UF-003** Complemento: B13 -> C24 -> A14/A19 -> etapa alvo -> B1.
- **UF-004** AML manual: B1 -> B2 -> B8 -> B3 -> B22 -> B12.
- **UF-005** Contestação: A18 -> B17 -> B22 -> B12 -> A14.
- **UF-006** Publicação: C6 -> C7 -> C8 -> C9 com maker-checker.
- **UF-007** Provider: C10 -> D10 -> C21 -> C9.
- **UF-008** API: C22/C16 -> hosted/SDK -> A1..A14 -> C23.
- **UF-009** Revalidação: B14/B15 -> jornada parcial -> B12.
- **UF-010** HFS: case elegível -> CAP-22 -> B22 -> B12.
- **UF-011** Kill switch: D12 -> D4 -> D13 -> D14.
- **UF-012** Release: registries/CI/QA -> D14 -> release -> production verification.

## 23. REGRAS DE NAVEGAÇÃO E CONTEXTO

- Case ID e tenant context permanecem visíveis nas telas analíticas.
- Deep link só pode abrir recurso autorizado; a URL não concede permissão.
- Breadcrumbs refletem entidade e contexto, não segredos.
- Voltar não deve repetir operação mutável.
- Tabs preservam filtros e estado local seguro quando apropriado.
- Modal é reservado a ação curta; investigação/configuração longa usa página/drawer.
- Ação destrutiva nunca fica ao lado de ação primária sem diferenciação e confirmação.
- Filtros ativos aparecem em exports e links compartilháveis somente quando seguros.

## 24. COMO USAR COM FIGMA E CLAUDE CODE

Para cada Screen ID, consultar ONB-UX-002, aplicar o arquetipo correspondente e então detalhar componentes reais do lib-ui, route, backend, dados, auth, states e AC. Não criar uma tela visualmente diferente sem motivo de domínio. Antes de codificar, provar READY conforme o programa de execução.

REGRA DE MATURIDADE DOCUMENTAL

Os wireframes, arquétipos, navegação e fluxos deste documento são CANONICAL como referência de design e comportamento. Não constituem prova de implementação. Divergência de código deve ser registrada e reconciliada, não resolvida silenciosamente alterando o contrato.


---

# PARTE 4 — PADRÃO DE ESPECIFICAÇÃO DAS TELAS (ONB-UX-006 v1.0)

Status: CANONICAL SCREEN SPECIFICATION STANDARD — implementação separada por evidência | Versão: 1.0


## 1. FINALIDADE

Padronizar a especificação, implementação, QA e homologação das 80 funções de tela do Mutual Onboarding. Uma função de tela pode compartilhar URL/componente com outra função, mas mantém Screen ID próprio quando possui objetivo, estado, permissão, dado ou critério de aceite distinto.


## 2. CAMPOS OBRIGATÓRIOS POR SCREEN ID

Screen ID; superfície; nome/função; objetivo de negócio; personas/roles; route/view; preconditions; estados; inputs; outputs; dados exibidos; dados editáveis; entidades/campos canônicos; capabilities acionadas; requirements relacionados; regras/policies; provider dependence; permissões; segregação de função; PII classification; audit events; analytics; empty/loading/error/degraded states; accessibility; responsive behavior; acceptance criteria; test IDs; evidence IDs; implementation status; release gate.


## 3. QUATRO SUPERFÍCIES

- A — Jornada de verificação: A1–A20.
- B — Painel de análise: B1–B22.
- C — Administração e Developer Platform: C1–C24.
- D — Console interno Mutual: D1–D14.
Total: 80 funções de tela.


## 4. ESTADOS MÍNIMOS DE UX

Loading, ready, empty, partial, error, timeout, provider degraded, unauthorized, forbidden, validation error, retry pending e completed quando aplicáveis. O frontend nunca deve inventar estado de negócio inexistente no servidor.


## 5. SEGURANÇA/PERMISSÃO

Toda tela deve mapear role/permission e, quando aplicável, tenant, scope, alçada, maker-checker e field-level visibility. Teste de rota, API e objeto deve impedir IDOR/BOLA e acesso cross-tenant.


## 6. PII E DADOS SENSÍVEIS

Cada tela deve identificar PII/biometria/documentos/sinais de risco exibidos ou capturados; justificar necessidade; definir masking; impedir PII em URL/log/analytics; e respeitar retenção/consentimento/purpose limitation aplicável.


## 7. PROVIDER E DEGRADED MODE

Tela nunca deve codificar marca de provider como regra de negócio quando a função puder ser satisfeita por capability. Estados de timeout/inconclusive/degraded devem ser explícitos. Falha do provider não deve virar aprovação/rejeição implícita.


## 8. EVIDÊNCIA E AUDITORIA

Ações materiais devem gerar evento de auditoria: ator, tenant, case/subject/entity, ação, motivo quando aplicável, before/after seguro, timestamp e correlation ID. Exibição de evidência deve preservar provenance e versão.


## 9. ACCEPTANCE CRITERIA — PADRÃO

- **AC funcional:** comportamento esperado por estado.
- **AC autorização:** roles, tenant e alçadas.
- **AC dados:** integridade, origem e validação.
- **AC falha:** timeout, provider degradation e retry.
- **AC privacidade:** masking/log hygiene/retention.
- **AC audit:** evento e evidência persistidos.
- **AC acessibilidade/UX:** navegação e feedback mínimo.

## 10. TESTES — PADRÃO

Happy path; validation; unauthorized/forbidden; cross-tenant; empty; loading; provider timeout; provider inconclusive; retry/idempotency quando aplicável; audit; privacy; accessibility; responsive; analytics event quando aplicável.


## 11. HOMOLOGAÇÃO DE TELA

Uma tela não é homologada porque existe visualmente. Para H-01, cada Screen ID deve estar IMPLEMENTED/INTEGRATED/QA/UAT conforme aplicabilidade, com criteria e test/evidence IDs ou waiver/feature flag formal.


## 12. MAPPING COM O CÓDIGO

Wave 0 deve preencher, para cada A1–D14: route/view, componente(s), API(s), permission(s), estado real e evidência. Múltiplos Screen IDs podem apontar para a mesma route dinâmica, desde que os contratos funcionais continuem separados.


## 13. RELAÇÃO COM O PACOTE UX CANÔNICO

Este documento é o padrão CANONICAL de campos e qualidade para qualquer Screen ID. SRC-026 é o registry vivo de 80 funções; SRC-031 contém a especificação individual A1–D14; SRC-030 define o gate de homologação UX/front. Nenhum Screen ID é considerado implementado ou homologado por este documento isoladamente


## 14. CONTROLE DE IDENTIDADE DOCUMENTAL

Código atual: ONB-UX-006. Este documento utilizava historicamente o código ONB-UX-001, que colidia com o blueprint SRC-025. Por ADR-030, foi renomeado para ONB-UX-006 preservando o mesmo File ID, conteúdo e histórico. A alteração elimina colisão de identidade documental sem criar nova autoridade nem apagar patrimônio..


---

## Nota de consolidação

- Parte 1 reproduz integralmente o índice ONB-UX-000, incluindo File IDs, regras de uso e a regra de autoridade UX (ADR-030).
- Parte 2 reproduz integralmente o blueprint ONB-UX-001 (seções 1–20 + regra de maturidade documental).
- Parte 3 reproduz integralmente o ONB-UX-003: 20 wireframes low-fi por arquétipo (blocos ASCII preservados), 12 fluxos de usuário canônicos (UF-001..UF-012), regras de navegação/contexto e orientação de uso com Figma/Claude Code.
- Parte 4 reproduz integralmente o padrão ONB-UX-006 (campos obrigatórios por Screen ID, estados mínimos, segurança, PII, provider/degraded mode, evidência/auditoria, padrão de AC, padrão de testes, homologação, mapping com código e controle de identidade documental).
