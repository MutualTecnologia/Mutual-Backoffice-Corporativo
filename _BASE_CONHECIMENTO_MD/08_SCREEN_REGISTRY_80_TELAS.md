---
titulo: "Screen Registry — 80 Telas, Dashboards, KPIs e Filtros (Mutual Onboarding)"
fontes:
  - "ONB-UX-002_REGISTRO_COMPLETO_80_TELAS_DASHBOARDS_KPIS_FILTROS_v1.0.xlsx (registry vivo — Google Sheets; File ID: 1MGL65sMNbwWELUBA-fOvmMA2nKc7EP1nr6rmH_7vs70)"
status_fonte: "CANONICAL PRODUCT/UX CONTRACT — implementação técnica, QA e produção são estados separados e dependem de evidência"
gerado_em: 2026-08-09
---

# Screen Registry — 80 Telas, Dashboards, KPIs e Filtros

> Fonte: planilha ONB-UX-002 (registry vivo), abas: SCREENS_80, DASHBOARD_KPI, FILTERS_SEARCH, RF, RNF, UX_STATES, PERMISSIONS, NAVIGATION, USER_FLOWS, TECH_FLOWS, DESIGN_SYSTEM, AC_HOMOLOGATION, REPORTS, README. Todas as linhas e IDs foram preservados.

## 1. README (aba README)

| Campo | Valor |
|---|---|
| Status | CANONICAL PRODUCT/UX CONTRACT — implementação técnica, QA e produção são estados separados e dependem de evidência |
| Escopo | 80 funções de tela, dashboards/KPIs, filtros, RF/RNF, estados, permissões, navegação, fluxos, design system e critérios de homologação. |
| Princípio | Interface pronta != operação pronta. Toda tela crítica exige backend, auth, tenant, dados, AC, testes e evidência. |
| Mercado | Brasil-first operacionalmente e internacional por arquitetura desde a fundação. |
| Repositório | Mutual-Processadora-de-Pagamentos/onboarding-corporativo |
| Data de emissão | 2026-08-09 |
| Regra de maturidade | CANONICAL significa contrato de estado desejado. Não significa REAL/READY/QA PASS/produção. Aplicabilidade regulatória concreta continua governada por RegulatoryPack/JurisdictionPack/SegmentPack/TenantPolicy e aprovação competente. |
| Abas | SCREENS_80, DASHBOARD_KPI, FILTERS_SEARCH, RF, RNF, UX_STATES, PERMISSIONS, NAVIGATION, USER_FLOWS, TECH_FLOWS, DESIGN_SYSTEM, AC_HOMOLOGATION |

## 2. SCREENS_80 — Registro das 80 telas

A aba SCREENS_80 possui 21 colunas por tela: Screen ID; Superfície; Função; Registry status; Prioridade; Usuário primário; Arquetipo/Wireframe; Objetivo UX; Blocos obrigatórios; Ações primárias; KPIs relacionados; Filtros/Seletores; Capabilities; Permissões/escopo; Estados obrigatórios; Responsividade; Acessibilidade; Acceptance Criteria; Implementação real; Próxima evidência; Especificação detalhada.

> ⚠️ [LACUNA NA FONTE] A aba SCREENS_80 **não contém coluna de rota/view nem coluna de dados exibidos por tela**. A própria planilha remete: "detalhes de route/view, gaps e evidência no ONB-REG-001/SCREENS" e a especificação de dados por tela ao ONB-UX-004 (ver documento 09).

> Nota de fidelidade: na planilha fonte, a coluna "Acessibilidade" contém valores de estado de implementação (PARTIAL / NOT_EVIDENCED / ABSENT) e a coluna "Acceptance Criteria" contém a referência de evidência D2. Os valores foram reproduzidos exatamente como constam na fonte.

### 2.1 Colunas com valor constante (idêntico em todas as 80 linhas)

| Coluna | Valor (verbatim) |
|---|---|
| Registry status | CANONICAL |
| Acceptance Criteria (superfícies A/B/C) | D2 snapshot main ed3f53fe9fcd8402aa1af72fbea6e4e2eaf7fa51; detalhes de route/view, gaps e evidência no ONB-REG-001/SCREENS. |
| Acceptance Criteria (superfície D) | D2: nenhuma quarta aplicação/superfície Mutual interna foi observada no main; contrato funcional permanece CANONICAL e technical state=ABSENT. |
| Implementação real | NOT_EVIDENCED (todas as 80 telas) |
| Próxima evidência | Mapear route/backend reais no GitHub antes de READY |
| Especificação detalhada | ONB-UX-004_ESPECIFICACAO_TELA_A_TELA_A1_D14_v1.0 |

### 2.2 Colunas constantes por superfície (valor idêntico dentro de cada superfície)

#### Superfície A — Jornada
| Coluna | Valor (verbatim) |
|---|---|
| Superfície | A — Jornada |
| Usuário primário | Cliente/verificado/representante |
| Objetivo UX (padrão) | "Permitir ao usuário concluir *função* com orientação, validação progressiva, retomada e mínima fricção." |
| Ações primárias | Salvar progresso; continuar; voltar; corrigir; repetir captura quando aplicável; solicitar ajuda; sair com retomada segura |
| KPIs relacionados | Progresso; tempo na etapa; erros/retentativas; pendências; taxa de conclusão da etapa (telemetria, não necessariamente exibida) |
| Filtros/Seletores | Não aplicável como filtro analítico; seletor de idioma/jurisdição e busca contextual quando necessário |
| Permissões/escopo | Sujeito/representante autenticado ou link seguro; acesso apenas ao próprio case e delegações explícitas |
| Estados obrigatórios | loading; empty; ready; partial; validation_error; system_error; timeout; unavailable; access_denied; blocked; retrying; draft; saved; expired_session; resumed; submitted; pending_complement; completed |
| Responsividade | Mobile-first; 320px+; câmera e upload nativos; teclado/touch; offline/retry controlado; desktop compatível |

#### Superfície B — Analista
| Coluna | Valor (verbatim) |
|---|---|
| Superfície | B — Analista |
| Usuário primário | Analista de onboarding/compliance/risco |
| Objetivo UX (padrão) | "Permitir análise operacional de *função* com evidências, contexto, autoridade e trilha auditável." |
| Ações primárias (B1, B17 — filas) | Abrir caso; atribuir/reatribuir; priorizar; escalar; pausar; solicitar complemento; exportar lista conforme permissão |
| Ações primárias (B12 — decisão) | Aprovar; aprovar com restrição; reprovar; solicitar complemento; escalar; enviar EDD; confirmar decisão |
| Ações primárias (demais B) | Investigar; filtrar; abrir evidência; comparar fontes; adicionar nota; solicitar complemento; escalar; navegar para decisão |
| KPIs relacionados | Casos abertos; aging; SLA; throughput; manual review rate; pendências; aprovação/reprovação; escalonamentos |
| Filtros/Seletores | Tenant; produto; segmento; jurisdição/país; tipo PF/PJ; status; risco; período; analista; prioridade; SLA; capability; provider; origem/canal; pendência |
| Permissões/escopo | tenant_analyst / tenant_compliance / tenant_approver conforme capability; tenant-bound; decisão depende de alçada/SoD |
| Estados obrigatórios | loading; empty; ready; partial; validation_error; system_error; timeout; unavailable; access_denied; blocked; retrying; unassigned; assigned; in_review; waiting_customer; escalated; decided; closed |
| Responsividade | Desktop-first responsivo; mínimo operacional 1280px; tablet consulta; tabelas com colunas priorizadas e drawers; sem perda de função crítica |

#### Superfície C — Admin/Developer
| Coluna | Valor (verbatim) |
|---|---|
| Superfície | C — Admin/Developer |
| Usuário primário | Administrador do tenant / produto / desenvolvedor |
| Objetivo UX (padrão) | "Configurar e governar *função* por tenant com versionamento, segregação, simulação e publicação controlada." |
| Ações primárias | Criar/editar; salvar rascunho; validar; simular; comparar versões; submeter aprovação; publicar/revogar conforme capability |
| KPIs relacionados | Conversão; drop-off; STP; SLA; custo/caso; latência; erro provider; failover; uso API/webhook; versões/publicações |
| Filtros/Seletores | Tenant; produto; segmento; jurisdição/país; tipo PF/PJ; status; risco; período; versão; ambiente; provider; capability; owner; publicação; health |
| Permissões/escopo | tenant_admin / tenant_product / tenant_developer; capabilities granulares; mutações server-side; maker-checker para publicação sensível |
| Estados obrigatórios | loading; empty; ready; partial; validation_error; system_error; timeout; unavailable; access_denied; blocked; retrying; draft; valid; invalid; pending_approval; approved; published; deprecated; revoked |
| Responsividade | Desktop-first responsivo; mínimo operacional 1280px; tablet consulta; tabelas com colunas priorizadas e drawers; sem perda de função crítica |

#### Superfície D — Mutual interno
| Coluna | Valor (verbatim) |
|---|---|
| Superfície | D — Mutual interno |
| Usuário primário | Operação/governança/segurança Mutual |
| Objetivo UX (padrão) | "Operar e governar *função* em nível de plataforma Mutual, com visão multi-tenant, controles e evidência." |
| Ações primárias | Inspecionar; filtrar; abrir detalhe; executar ação privilegiada com justificativa e maker-checker; registrar evidência |
| KPIs relacionados | Tenants ativos; volume; disponibilidade; P95/P99; incidentes; provider health; custo/margem; gates; releases; risco aberto |
| Filtros/Seletores | Tenant; produto; segmento; jurisdição/país; tipo PF/PJ; status; risco; período; região; provider/economic_group; severity; ambiente; release; health; custo/margem |
| Permissões/escopo | mutual_support / mutual_ops / mutual_security / mutual_model_gov / mutual_platform_admin; acesso privilegiado auditado e just-in-time quando aplicável |
| Estados obrigatórios | loading; empty; ready; partial; validation_error; system_error; timeout; unavailable; access_denied; blocked; retrying; healthy; degraded; incident; maintenance; pending_gate; approved; blocked; rolled_back |
| Responsividade | Desktop-first responsivo; mínimo operacional 1280px; tablet consulta; tabelas com colunas priorizadas e drawers; sem perda de função crítica |

### 2.3 Blocos obrigatórios por arquétipo (coluna "Blocos obrigatórios" — 1:1 com Arquetipo/Wireframe)

| Arquétipo | Blocos obrigatórios (verbatim) |
|---|---|
| JRN-STATUS | Cabeçalho white-label; status/progresso; resumo da jornada; timeline; pendências; CTA primário; ajuda/suporte |
| JRN-FORM | Cabeçalho white-label; stepper; formulário em blocos; ajuda contextual; validações; salvar/continuar; privacidade |
| JRN-CAPTURE | Cabeçalho + stepper; instrução contextual; área câmera/upload; qualidade/validação; preview; retry/fallback; privacidade |
| JRN-RELATIONSHIP | Cabeçalho + stepper; resumo; lista/árvore/grafo; formulário lateral; progresso; validações; CTA continuar |
| JRN-REVIEW | Cabeçalho + stepper; resumo por seção; alertas; termos/evidências; confirmação; CTA enviar/assinar |
| OPS-QUEUE | Header operacional; KPIs; barra de filtros; busca; tabela; badges; SLA/aging; ações em lote controladas; paginação |
| OPS-CASE-OVERVIEW | Header do caso; score/status; tabs; cards de evidência; timeline; checklist; pendências; painel de ação |
| OPS-EVIDENCE | Header do caso; filtros/tabs; lista/cards; detalhe; origem/lineage; divergências; ação analítica; trilha |
| OPS-INVESTIGATION | Header do caso; grafo/canvas; painel de entidades; sinais; notas; evidências; filtros; timeline; decisão/escala |
| OPS-DECISION | Resumo do caso; evidências-chave; autoridade; motivo; restrições; maker-checker; confirmação; trilha |
| OPS-EXPORT | Header do caso; seleção de escopo; preview; classificação; masking; justificativa; geração/download auditado |
| ADM-DASHBOARD | Header tenant; período; KPIs; funil; séries; breakdown por país/segmento/provider; alertas; atalhos |
| ADM-LIST-CONFIG | Header; filtros; lista/tabela; detalhe; versão/status; editar; duplicar; validar; publicar com gate |
| ADM-BUILDER | Header + versão/status; canvas/editor; propriedades; validações; preview/simulação; diff; salvar; enviar para aprovação/publicar |
| ADM-IAM | Header; filtros; tabela usuários/roles; detalhe; capabilities; SoD; convites; revogação; auditoria |
| DEV-PLATFORM | Header; ambientes; credenciais/scopes; endpoints; webhooks/logs; exemplos; testes; health; documentação |
| MUT-REGISTRY | Header global; filtros; tabela; detalhe; health/status; relacionamentos; ações administrativas auditadas |
| MUT-OPS-DASHBOARD | Header global; KPIs; filtros tenant/região; health; incidentes; custo/margem; trends; drill-down; ações controladas |
| MUT-CONTROL | Header crítico; estado atual; escopo; impactos; justificativa; dupla aprovação; executar/reverter; auditoria |
| MUT-GOVERNANCE | Header; catálogo/registry; filtros; versões; baseline; diff; aprovações; evidências; histórico |

### 2.4 Superfície A — Jornada do Cliente (A1–A20)

| Screen ID | Função | Registry status | Prioridade | Arquétipo/Wireframe | Capabilities | Acessibilidade (col. fonte) | Implementação real |
|---|---|---|---|---|---|---|---|
| A1 | Entrada/convite | CANONICAL | P0 | JRN-STATUS | — | PARTIAL | NOT_EVIDENCED |
| A2 | Identificação da natureza | CANONICAL | P0 | JRN-FORM | — | NOT_EVIDENCED | NOT_EVIDENCED |
| A3 | Jurisdição | CANONICAL | P0 | JRN-FORM | — | NOT_EVIDENCED | NOT_EVIDENCED |
| A4 | Etapas dinâmicas | CANONICAL | P0 | JRN-FORM | — | PARTIAL | NOT_EVIDENCED |
| A5 | Liveness | CANONICAL | P0 | JRN-CAPTURE | CAP-03 | NOT_EVIDENCED | NOT_EVIDENCED |
| A6 | Captura de documento | CANONICAL | P0 | JRN-CAPTURE | CAP-02 | NOT_EVIDENCED | NOT_EVIDENCED |
| A7 | Endereço | CANONICAL | P1 | JRN-FORM | — | NOT_EVIDENCED | NOT_EVIDENCED |
| A8 | Grafo societário | CANONICAL | P0 | JRN-RELATIONSHIP | CAP-07 | PARTIAL | NOT_EVIDENCED |
| A9 | Pessoas-chave | CANONICAL | P0 | JRN-RELATIONSHIP | CAP-07 | PARTIAL | NOT_EVIDENCED |
| A10 | Rede de terceiros | CANONICAL | P1 | JRN-RELATIONSHIP | CAP-07 | NOT_EVIDENCED | NOT_EVIDENCED |
| A11 | Documentos societários | CANONICAL | P0 | JRN-FORM | CAP-02,CAP-06,CAP-07 | NOT_EVIDENCED | NOT_EVIDENCED |
| A12 | Termos/assinatura | CANONICAL | P0 | JRN-REVIEW | CAP-14 | NOT_EVIDENCED | NOT_EVIDENCED |
| A13 | Revisão/envio | CANONICAL | P0 | JRN-REVIEW | — | PARTIAL | NOT_EVIDENCED |
| A14 | Acompanhamento | CANONICAL | P0 | JRN-STATUS | — | PARTIAL | NOT_EVIDENCED |
| A15 | Convite de pessoa-chave | CANONICAL | P1 | JRN-FORM | — | PARTIAL | NOT_EVIDENCED |
| A16 | Jornada individual delegada | CANONICAL | P1 | JRN-FORM | — | PARTIAL | NOT_EVIDENCED |
| A17 | Progresso do grupo | CANONICAL | P1 | JRN-STATUS | — | PARTIAL | NOT_EVIDENCED |
| A18 | Contestação/revisão humana | CANONICAL | P1 | JRN-FORM | CAP-16,CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| A19 | Recuperação/verificação assistida | CANONICAL | P1 | JRN-FORM | — | NOT_EVIDENCED | NOT_EVIDENCED |
| A20 | Consentimentos/autorizações externas | CANONICAL | P1 | JRN-REVIEW | CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |

### 2.5 Superfície B — Painel do Analista (B1–B22)

| Screen ID | Função | Registry status | Prioridade | Arquétipo/Wireframe | Capabilities | Acessibilidade (col. fonte) | Implementação real |
|---|---|---|---|---|---|---|---|
| B1 | Fila de casos | CANONICAL | P0 | OPS-QUEUE | — | PARTIAL | NOT_EVIDENCED |
| B2 | Visão geral | CANONICAL | P0 | OPS-CASE-OVERVIEW | — | PARTIAL | NOT_EVIDENCED |
| B3 | Evidências | CANONICAL | P0 | OPS-EVIDENCE | CAP-20 | PARTIAL | NOT_EVIDENCED |
| B4 | Grafo societário | CANONICAL | P1 | OPS-INVESTIGATION | CAP-07 | PARTIAL | NOT_EVIDENCED |
| B5 | Pessoas-chave | CANONICAL | P1 | OPS-EVIDENCE | CAP-07 | PARTIAL | NOT_EVIDENCED |
| B6 | Rede de terceiros | CANONICAL | P1 | OPS-EVIDENCE | CAP-07 | NOT_EVIDENCED | NOT_EVIDENCED |
| B7 | Documentos | CANONICAL | P1 | OPS-EVIDENCE | CAP-02,CAP-20 | PARTIAL | NOT_EVIDENCED |
| B8 | AML/disambiguation | CANONICAL | P0 | OPS-EVIDENCE | CAP-08,CAP-09 | PARTIAL | NOT_EVIDENCED |
| B9 | Judicial/criminal | CANONICAL | P1 | OPS-EVIDENCE | CAP-10 | NOT_EVIDENCED | NOT_EVIDENCED |
| B10 | Fiscal/certificados | CANONICAL | P1 | OPS-EVIDENCE | CAP-11 | PARTIAL | NOT_EVIDENCED |
| B11 | Trilha/acessos | CANONICAL | P1 | OPS-EVIDENCE | — | PARTIAL | NOT_EVIDENCED |
| B12 | Decisão/alçada | CANONICAL | P0 | OPS-DECISION | CAP-16,CAP-20 | PARTIAL | NOT_EVIDENCED |
| B13 | Pendências/complementos | CANONICAL | P1 | OPS-EVIDENCE | — | PARTIAL | NOT_EVIDENCED |
| B14 | Reavaliação/refresh | CANONICAL | P1 | OPS-EVIDENCE | CAP-17 | PARTIAL | NOT_EVIDENCED |
| B15 | Alertas de monitoramento | CANONICAL | P1 | OPS-EVIDENCE | CAP-17 | PARTIAL | NOT_EVIDENCED |
| B16 | Dossiê/export | CANONICAL | P1 | OPS-EXPORT | — | PARTIAL | NOT_EVIDENCED |
| B17 | Fila de contestação | CANONICAL | P1 | OPS-QUEUE | — | NOT_EVIDENCED | NOT_EVIDENCED |
| B18 | Reconciliação entre fontes | CANONICAL | P1 | OPS-EVIDENCE | CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| B19 | Fraude/device/session | CANONICAL | P1 | OPS-EVIDENCE | CAP-04 | NOT_EVIDENCED | NOT_EVIDENCED |
| B20 | Capacidade econômica/origem de recursos | CANONICAL | P1 | OPS-EVIDENCE | CAP-12 | NOT_EVIDENCED | NOT_EVIDENCED |
| B21 | Licenças/autorizações regulatórias | CANONICAL | P1 | OPS-EVIDENCE | CAP-13 | NOT_EVIDENCED | NOT_EVIDENCED |
| B22 | Workspace investigativo | CANONICAL | P0 | OPS-INVESTIGATION | CAP-16,CAP-22 | NOT_EVIDENCED | NOT_EVIDENCED |

### 2.6 Superfície C — Admin + Developer Platform (C1–C24)

| Screen ID | Função | Registry status | Prioridade | Arquétipo/Wireframe | Capabilities | Acessibilidade (col. fonte) | Implementação real |
|---|---|---|---|---|---|---|---|
| C1 | Dashboard | CANONICAL | P1 | ADM-DASHBOARD | — | PARTIAL | NOT_EVIDENCED |
| C2 | Requirements | CANONICAL | P0 | ADM-LIST-CONFIG | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C3 | Editor de requirement | CANONICAL | P0 | ADM-BUILDER | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C4 | Flows | CANONICAL | P0 | ADM-LIST-CONFIG | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C5 | Editor de flow | CANONICAL | P0 | ADM-BUILDER | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C6 | Policies | CANONICAL | P0 | ADM-LIST-CONFIG | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C7 | Editor de policy | CANONICAL | P0 | ADM-BUILDER | CAP-15 | NOT_EVIDENCED | NOT_EVIDENCED |
| C8 | Simulação | CANONICAL | P0 | ADM-BUILDER | CAP-15 | NOT_EVIDENCED | NOT_EVIDENCED |
| C9 | Publicação/versionamento | CANONICAL | P0 | ADM-LIST-CONFIG | CAP-15,CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| C10 | Providers/routing | CANONICAL | P0 | ADM-LIST-CONFIG | CAP-01..CAP-13,CAP-21 | NOT_EVIDENCED | NOT_EVIDENCED |
| C11 | Custo/uso/margem | CANONICAL | P1 | ADM-DASHBOARD | CAP-21 | NOT_EVIDENCED | NOT_EVIDENCED |
| C12 | Marca/tema/idioma | CANONICAL | P1 | ADM-LIST-CONFIG | CAP-19 | NOT_EVIDENCED | NOT_EVIDENCED |
| C13 | Domínio/e-mail/canais | CANONICAL | P1 | ADM-LIST-CONFIG | CAP-18,CAP-19 | NOT_EVIDENCED | NOT_EVIDENCED |
| C14 | Usuários/papéis | CANONICAL | P0 | ADM-IAM | CAP-19,CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| C15 | Alçadas/segregação | CANONICAL | P0 | ADM-IAM | CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| C16 | API keys/webhooks | CANONICAL | P0 | DEV-PLATFORM | CAP-18 | NOT_EVIDENCED | NOT_EVIDENCED |
| C17 | Auditoria de configuração | CANONICAL | P1 | ADM-LIST-CONFIG | CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| C18 | Proteção de dados | CANONICAL | P0 | ADM-LIST-CONFIG | CAP-20 | NOT_EVIDENCED | NOT_EVIDENCED |
| C19 | Produtos de verificação | CANONICAL | P1 | ADM-LIST-CONFIG | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C20 | Editor de produto | CANONICAL | P1 | ADM-BUILDER | CAP-15 | PARTIAL | NOT_EVIDENCED |
| C21 | Simulação/conflitos de produto | CANONICAL | P1 | ADM-BUILDER | CAP-15,CAP-21 | NOT_EVIDENCED | NOT_EVIDENCED |
| C22 | Developer/Sandbox/SDK/Hosted | CANONICAL | P0 | DEV-PLATFORM | CAP-18 | NOT_EVIDENCED | NOT_EVIDENCED |
| C23 | Logs API/webhook | CANONICAL | P1 | DEV-PLATFORM | CAP-18,CAP-21 | NOT_EVIDENCED | NOT_EVIDENCED |
| C24 | Notificações/localização | CANONICAL | P1 | ADM-LIST-CONFIG | CAP-19 | NOT_EVIDENCED | NOT_EVIDENCED |

### 2.7 Superfície D — Console Mutual (D1–D14)

| Screen ID | Função | Registry status | Prioridade | Arquétipo/Wireframe | Capabilities | Acessibilidade (col. fonte) | Implementação real |
|---|---|---|---|---|---|---|---|
| D1 | Clientes/tenants | CANONICAL | P0 | MUT-REGISTRY | CAP-19 | ABSENT | NOT_EVIDENCED |
| D2 | Provider health | CANONICAL | P0 | MUT-OPS-DASHBOARD | CAP-21 | ABSENT | NOT_EVIDENCED |
| D3 | Margem/custos | CANONICAL | P1 | MUT-OPS-DASHBOARD | CAP-21 | ABSENT | NOT_EVIDENCED |
| D4 | Kill switch | CANONICAL | P0 | MUT-CONTROL | CAP-20,CAP-21 | ABSENT | NOT_EVIDENCED |
| D5 | Governança de modelos | CANONICAL | P0 | MUT-GOVERNANCE | CAP-22 | ABSENT | NOT_EVIDENCED |
| D6 | Capability catalog | CANONICAL | P0 | MUT-GOVERNANCE | CAP-01..CAP-22 | ABSENT | NOT_EVIDENCED |
| D7 | Suporte a casos | CANONICAL | P1 | MUT-REGISTRY | CAP-16,CAP-20 | ABSENT | NOT_EVIDENCED |
| D8 | Trilha de acesso Mutual | CANONICAL | P1 | MUT-REGISTRY | CAP-20 | ABSENT | NOT_EVIDENCED |
| D9 | Provisioning/região/features | CANONICAL | P1 | MUT-REGISTRY | CAP-19 | ABSENT | NOT_EVIDENCED |
| D10 | Fornecedores/third-party risk | CANONICAL | P1 | MUT-REGISTRY | CAP-18,CAP-20,CAP-21 | ABSENT | NOT_EVIDENCED |
| D11 | Jurisdições/baseline normativo | CANONICAL | P1 | MUT-GOVERNANCE | CAP-19,CAP-20 | ABSENT | NOT_EVIDENCED |
| D12 | Segurança/privacidade/incidentes | CANONICAL | P0 | MUT-CONTROL | CAP-20,CAP-21 | ABSENT | NOT_EVIDENCED |
| D13 | Platform health/jobs/queues/webhooks | CANONICAL | P0 | MUT-OPS-DASHBOARD | CAP-21 | ABSENT | NOT_EVIDENCED |
| D14 | Cockpit de homologação/release | CANONICAL | P0 | MUT-OPS-DASHBOARD | CAP-20,CAP-21 | ABSENT | NOT_EVIDENCED |

## 3. DASHBOARD_KPI — Catálogo de 82 KPIs

| KPI ID | Camada | Nome | Unidade | Definição/Fórmula | Dimensões/Filtros | Telas alvo |
|---|---|---|---|---|---|---|
| KPI-JRN-001 | Jornada | Taxa de início->submissão | % | submetidos/iniciados | tenant,produto,segmento,jurisdição,canal | C1,D1 |
| KPI-JRN-002 | Jornada | Drop-off por etapa | % | abandono na etapa/entradas na etapa | etapa,device,idioma,jurisdição | C1 |
| KPI-JRN-003 | Jornada | Tempo médio até submissão | min | média(submitted_at-started_at) | tenant,produto,jurisdição | C1 |
| KPI-JRN-004 | Jornada | Retentativa de documento | % | casos com retry/casos com captura | tipo_doc,device,provider | C1 |
| KPI-JRN-005 | Jornada | Retentativa biometria | % | casos com retry/casos biometria | device,provider,jurisdição | C1 |
| KPI-OPS-001 | Analista | Backlog aberto | casos | count(status aberto) | tenant,status,prioridade | B1 |
| KPI-OPS-002 | Analista | Aging médio | h | média(now-opened_at) | tenant,analista,prioridade | B1 |
| KPI-OPS-003 | Analista | SLA dentro do prazo | % | casos dentro SLA/casos fechados | produto,segmento,jurisdição | B1 |
| KPI-OPS-004 | Analista | Throughput por analista | casos/dia | decisões/analista/dia | analista,equipe | B1 |
| KPI-OPS-005 | Analista | Manual review rate | % | casos manuais/casos totais | produto,jurisdição,risco | B1,C1 |
| KPI-OPS-006 | Analista | Approval rate | % | aprovados/decididos | produto,segmento,jurisdição | B1,C1 |
| KPI-OPS-007 | Analista | Rejection rate | % | reprovados/decididos | produto,segmento,jurisdição | B1,C1 |
| KPI-OPS-008 | Analista | Escalation rate | % | escalados/analisados | motivo,equipe | B1 |
| KPI-PLT-001 | Tenant/Admin | STP rate | % | auto_decididos/total | produto,jurisdição,policy_version | C1 |
| KPI-PLT-002 | Tenant/Admin | Custo médio por caso | moeda/caso | custo externo total/casos | provider,capability,produto | C11 |
| KPI-PLT-003 | Tenant/Admin | Latência provider P95 | ms | p95(provider_duration) | provider,capability,jurisdição | C10,D2 |
| KPI-PLT-004 | Tenant/Admin | Erro provider | % | erros/chamadas | provider,capability | C10,D2 |
| KPI-PLT-005 | Tenant/Admin | Failover rate | % | fallbacks/chamadas | provider,economic_group,capability | C10,D2 |
| KPI-PLT-006 | Tenant/Admin | Webhook delivery success | % | delivered/attempts | endpoint,event_type | C23 |
| KPI-PLT-007 | Tenant/Admin | API success rate | % | 2xx/requests | endpoint,client,scope | C23 |
| KPI-MUT-001 | Mutual | Tenants ativos | tenants | count(active) | região,segmento | D1 |
| KPI-MUT-002 | Mutual | Volume global de cases | casos | count(cases) | tenant,jurisdição,segmento | D1 |
| KPI-MUT-003 | Mutual | Disponibilidade plataforma | % | uptime/period | serviço,região | D13 |
| KPI-MUT-004 | Mutual | Incidentes abertos | incidentes | count(open incidents) | severity,serviço,tenant | D12 |
| KPI-MUT-005 | Mutual | Margem estimada | moeda | receita-custo direto | tenant,produto,provider | D3 |
| KPI-MUT-006 | Mutual | Capabilities bloqueadas | count | count(blocked) | wave,gate | D14 |
| KPI-MUT-007 | Mutual | Cobertura de telas homologadas | % | screens_passed/80 | superfície,wave | D14 |
| KPI-MUT-008 | Mutual | Provider health score | 0-100 | composição uptime/latência/erro | provider,capability,região | D2 |
| KPI-MUT-009 | Mutual | HFS health/degraded | status | estado do internal capability | model_version,região | D5,D13 |
| KPI-JRN-006 | Jornada | Save/resume rate | % | jornadas retomadas/jornadas iniciadas | tenant,produto,jurisdição,device | C1 |
| KPI-JRN-007 | Jornada | Sessão expirada | % | sessões expiradas/sessões abertas | tenant,produto,device,locale | C1 |
| KPI-JRN-008 | Jornada | Complement completion | % | complementos respondidos/complementos enviados | tenant,produto,tipo_pendência | B13,C1 |
| KPI-JRN-009 | Jornada | Convite delegado concluído | % | delegados concluídos/convites válidos enviados | role,tenant,produto,jurisdição | A17,C1 |
| KPI-OPS-009 | Analista | Touch time | min | soma do tempo de trabalho humano ativo por case | analista,equipe,produto,status | B1 |
| KPI-OPS-010 | Analista | Waiting customer time | h | tempo acumulado em waiting_customer | tenant,produto,pendência | B1,B13 |
| KPI-OPS-011 | Analista | Appeal rate | % | contestações/decisões elegíveis | tenant,produto,reason_category | B17 |
| KPI-OPS-012 | Analista | Appeal overturn rate | % | decisões alteradas/appeals resolvidos | tenant,produto,jurisdição | B17 |
| KPI-CMP-001 | Compliance | Potential hit rate | % | screenings com potential_hit/screenings executados | source,provider,jurisdição | B8,C1 |
| KPI-CMP-002 | Compliance | Confirmed hit rate | % | confirmed hits/potential hits analisados | source,list_version,jurisdição | B8 |
| KPI-CMP-003 | Compliance | False positive rate | % | false positives/potential hits analisados | source,provider,analista | B8 |
| KPI-CMP-004 | Compliance | Inconclusive evidence rate | % | evidências inconclusive ou unknown/evidências geradas | capability,provider,jurisdição | B3,C1 |
| KPI-CMP-005 | Compliance | Evidence unavailable rate | % | execuções unavailable/execuções solicitadas | capability,provider,region | B3,D2 |
| KPI-CMP-006 | Compliance | Discrepancy rate | % | cases com divergência aberta/cases analisados | campo,source,jurisdição | B18,C1 |
| KPI-CMP-007 | Compliance | Discrepancy resolution time | h | média(resolved_at-detected_at) | campo,analista,source | B18 |
| KPI-CMP-008 | Compliance | EDD rate | % | cases enviados a EDD/cases analisados | produto,segmento,jurisdição | B8,B20 |
| KPI-CMP-009 | Compliance | Regulatory license exception rate | % | cases com exceção CAP-13/cases com CAP-13 requerida | jurisdição,segmento,authority | B21 |
| KPI-CMP-010 | Compliance | Refresh overdue rate | % | refresh vencidos não concluídos/refresh due | tenant,produto,jurisdição | B14 |
| KPI-ID-001 | Identidade/Documentos | Document processing success | % | documentos processados sem erro técnico/documentos processados | tipo_doc,provider,jurisdição | B7,C1 |
| KPI-ID-002 | Identidade/Documentos | Document quality retry | % | documentos com recaptura/documentos enviados | tipo_doc,device,provider | A6,C1 |
| KPI-ID-003 | Identidade/Documentos | Document expiry exposure | % | documentos vencidos ou na janela de expiração/documentos ativos | tipo_doc,jurisdição,tenant | B7,B14 |
| KPI-ID-004 | Identidade/Documentos | Biometric success | % | attempts PASS/attempts concluídos | provider,device,jurisdição | A5,C1 |
| KPI-ID-005 | Identidade/Documentos | Biometric inconclusive | % | attempts inconclusive/attempts concluídos | provider,reason_code,jurisdição | B19,C1 |
| KPI-ID-006 | Identidade/Documentos | Biometric retry | % | cases com mais de uma tentativa/cases com biometria | device,provider,jurisdição | A5,C1 |
| KPI-ID-007 | Identidade/Documentos | Assisted verification rate | % | requests de assistência/jornadas iniciadas | motivo,produto,jurisdição | A19,C1 |
| KPI-PRV-001 | Provider | Availability | % | chamadas tecnicamente disponíveis/chamadas | provider,capability,region | C10,D2 |
| KPI-PRV-002 | Provider | Timeout rate | % | timeouts/chamadas | provider,capability,region | C10,D2 |
| KPI-PRV-003 | Provider | Inconclusive by provider | % | outcomes inconclusive/chamadas concluídas | provider,capability,jurisdição | C10,D2 |
| KPI-PRV-004 | Provider | Cost per call | moeda/chamada | custo atribuído/chamadas faturáveis | provider,capability,produto | C11,D3 |
| KPI-PRV-005 | Provider | Independent fallback coverage | % | capabilities com fallback independente/capabilities que exigem HA | capability,economic_group,jurisdição | C10,D2 |
| KPI-DEV-001 | Developer | API latency P95 | ms | p95(request_duration) | endpoint,version,tenant,region | C23,D13 |
| KPI-DEV-002 | Developer | API 4xx rate | % | 4xx/requests | endpoint,client,error_code | C23 |
| KPI-DEV-003 | Developer | API 5xx rate | % | 5xx/requests | endpoint,version,region | C23,D13 |
| KPI-DEV-004 | Developer | Webhook retry rate | % | deliveries com retry/deliveries | endpoint,event_type,tenant | C23 |
| KPI-DEV-005 | Developer | Webhook final failure | count | deliveries em estado final failure/DLQ | endpoint,event_type,tenant | C23,D13 |
| KPI-DEV-006 | Developer | Sandbox to production activation | % | tenants com integração produção/tenants com uso sandbox elegível | produto,SDK/API version | C22 |
| KPI-DEV-007 | Developer | Active/unused credentials | count | credenciais ativas e credenciais sem uso além da janela de policy | tenant,environment,scope | C16 |
| KPI-MUT-010 | Mutual | Service latency P95/P99 | ms | percentis de latência por serviço/região | service,region,version | D13 |
| KPI-MUT-011 | Mutual | Queue age P95/max | s | idade P95 e máxima das mensagens pendentes | queue,region,worker | D13 |
| KPI-MUT-012 | Mutual | Failed/retried jobs | count | jobs falhos e reexecutados por período | job_type,region,service | D13 |
| KPI-MUT-013 | Mutual | Tenant health score | 0-100 | composição TO_FORMALIZE antes de CANONICAL | tenant,region,product | D1 |
| KPI-HFS-001 | HFS | Requests | count | count(requests CAP-22) | model_version,region,purpose | D5,D13 |
| KPI-HFS-002 | HFS | Signal/alert rate | % | requests com signal/alert/requests concluídos | reason_category,model_version | B22,D5 |
| KPI-HFS-003 | HFS | Latency P95 | ms | p95(HFS processing duration) | model_version,region | D5,D13 |
| KPI-HFS-004 | HFS | Degraded mode duration | min | tempo acumulado em degraded mode | model_version,region | D5,D13 |
| KPI-HFS-005 | HFS | Model version coverage | % | cases processados por model_version/cases HFS | model_version,tenant,jurisdição | D5 |
| KPI-HFS-006 | HFS | Investigation outcome by signal | count/% | outcomes por reason_category não proprietária | reason_category,outcome,model_version | B22,D5 |
| KPI-REL-001 | Release | Test pass rate | % | testes PASS/testes executados | suite,gate,release | D14 |
| KPI-REL-002 | Release | Critical blockers open | count | count(blockers críticos abertos) | wave,capability,screen | D14 |
| KPI-REL-003 | Release | Security findings | count | findings abertos por severity | severity,release,component | D14 |
| KPI-REL-004 | Release | UAT pass rate | % | cenários UAT PASS/cenários UAT executados | screen,capability,tenant | D14 |
| KPI-REL-005 | Release | Change failure rate | % | releases com rollback/incidente atribuível/releases | service,wave,period | D14 |
| KPI-REL-006 | Release | Production verification coverage | % | releases com produção verificada/releases implantadas | release,service,region | D14 |

## 4. FILTERS_SEARCH — 20 filtros padrão

| Filter ID | Nome | Tipo | Campo/Conceito | Superfícies | Regras |
|---|---|---|---|---|---|
| FLT-001 | Tenant | multi | tenant_id | B,C,D | Sempre tenant-bound; Mutual pode multi-tenant conforme role |
| FLT-002 | Produto | multi | product_id | B,C,D | Version-aware |
| FLT-003 | Segmento | multi | segment_pack | B,C,D | Banking, payments, funds, VASP etc. |
| FLT-004 | Jurisdição/País | multi | jurisdiction,country | A,B,C,D | Separar país de operação/residência/emissão quando necessário |
| FLT-005 | Tipo de sujeito | multi | subject_type | B,C,D | PF/PJ/MEI/entidade |
| FLT-006 | Status do case | multi | case_status | B,C,D | Catálogo server-authoritative |
| FLT-007 | Banda de risco | multi | risk_band | B,C,D | Nunca substituir decisão por cor |
| FLT-008 | Período | range | created_at/updated_at | B,C,D | Timezone do tenant/usuário |
| FLT-009 | Analista/owner | multi | assigned_user | B | Respeitar equipes/escopo |
| FLT-010 | Prioridade | multi | priority | B | Crítica/alta/normal/baixa |
| FLT-011 | SLA/Aging | range | sla_due/aging | B,D | Permitir overdue |
| FLT-012 | Capability | multi | capability_id | B,C,D | CAP-01..22 |
| FLT-013 | Provider | multi | provider_id | B,C,D | Exibir economic_group quando relevante |
| FLT-014 | Economic group | multi | economic_group | C,D | Concentração/fallback |
| FLT-015 | Origem/canal | multi | source_channel | B,C | Hosted/API/partner/manual |
| FLT-016 | Ambiente | multi | environment | C,D | sandbox/homolog/prod |
| FLT-017 | Versão | multi | version | C,D | policy/flow/model/release |
| FLT-018 | Health | multi | health_state | C,D | healthy/degraded/down |
| FLT-019 | Severity | multi | severity | D | incident/risk/finding |
| FLT-020 | Release/Gate | multi | release_id/gate_id | D | Homologação/release |

## 5. RF — 50 Requisitos Funcionais (RF-UX-001..050)

| Requirement ID | Prioridade | Domínio | Requisito funcional | Status | Gate |
|---|---|---|---|---|---|
| RF-UX-001 | P0 | Lifecycle | O sistema deve tratar onboarding como case lifecycle server-authoritative, não como formulário isolado. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-002 | P0 | Identidade | Suportar PF, PJ, MEI, entidades reguladas, representantes, UBOs e terceiros relacionados. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-003 | P0 | Internacional | Suportar JurisdictionPack e SegmentPack sem hardcodes estruturais do Brasil. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-004 | P0 | Jornada | Permitir salvar, retomar e expirar jornadas com segurança e correlação de case. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-005 | P0 | Documentos | Capturar/uploadar documentos com metadata, versão, integridade, MIME, tamanho, validade e storage key. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-006 | P0 | Biometria | Executar liveness/facematch quando política exigir, com retry/fallback e evidência. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-007 | P0 | KYB | Modelar empresa, registro, status, QSA, UBO, representantes e cadeia societária. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-008 | P0 | AML | Exibir e tratar PEP, sanções, watchlists, adverse media e desambiguação. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-009 | P0 | Investigação | Permitir case management, notas, checklist, EDD, assignment, escalonamento e decisão. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-010 | P0 | Decisão | Registrar decisão, motivo, evidências, autoridade, restrições e maker-checker quando aplicável. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-011 | P0 | Evidência | Normalizar resultados internos/externos em EvidenceEnvelope com lineage e status explícito. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-012 | P0 | Multi-tenant | Isolar dados, configurações, usuários e branding por tenant com enforcement server-side e RLS. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-013 | P0 | Admin | Permitir requirements, flows, policies, produtos de verificação, simulação, versionamento e publicação. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-014 | P0 | Provider | Permitir Provider Registry e routing por capability, jurisdição, health, custo, contrato e economic_group. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-015 | P0 | Developer | Fornecer API versionada, API keys/scopes, idempotency, webhooks assinados, sandbox, SDK e hosted flow. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-016 | P0 | Monitoring | Permitir revalidação, expiração documental, rescreening e alertas de monitoramento. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-017 | P0 | Auditoria | Registrar trilha append-only de acessos, mutações, decisões, publicações e overrides. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-018 | P0 | Privacy | Permitir masking, consentimentos, base legal, retenção, delete/crypto-shredding e legal hold quando aplicável. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-019 | P0 | HFS | Integrar CAP-22/HFS como capability interna versionada sem expor metodologia proprietária. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-020 | P0 | Handoff | Emitir handoff versionado para domínios downstream preservando canonical IDs e estado. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-021 | P1 | Busca | Busca global por case_id, subject_id, identificador, empresa e referências permitidas, com masking e autorização. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-022 | P1 | Fila | Filas devem suportar atribuição, prioridade, SLA, aging, bulk action limitada e filtros salvos. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-023 | P1 | Dossiê | Gerar dossiê/export com classificação, masking, versão, justificativa e trilha de download. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-024 | P1 | Notificação | Notificar pendências, convites, expiração e decisões por canais configurados e localizados. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-025 | P1 | Delegação | Permitir jornada delegada e convite de pessoas-chave com escopo e validade explícitos. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-026 | P1 | Contestação | Permitir contestação/revisão humana com fila própria, evidência e decisão independente. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-027 | P1 | Reconciliation | Exibir divergências entre fontes e impedir que desapareçam silenciosamente. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-028 | P1 | Analytics | Medir conversão, drop-off, latência, custo, erro, provider health e qualidade por dimensões. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-029 | P1 | White-label | Configurar logo, tema, domínio, e-mail, idioma e conteúdo por tenant sem fork de código. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-030 | P1 | Localization | Suportar formatos locais de nome, endereço, telefone, data, timezone, idioma e identificadores. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-031 | P1 | Acessos | Administrar usuários, roles/capabilities, convites, revogação, sessão e segregação. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-032 | P1 | Release | Cockpit deve consolidar gates, gaps, testes, evidências e decisão de release. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-033 | P1 | KillSwitch | Permitir kill switch por tenant/capability/provider/região com motivo, dupla aprovação e rollback. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-034 | P1 | ModelGovernance | Governar modelos/scores com versão, aprovação, validação, health, degraded mode e rollback. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-035 | P1 | ThirdPartyRisk | Registrar fornecedores, contrato/DPA, subprocessors, residência, SLA, saída e concentração. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-036 | P1 | Support | Suporte Mutual deve acessar casos de forma privilegiada, justificada, auditada e limitada. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-037 | P1 | ConfigAudit | Mostrar diff de configuração e histórico de versões/publicações. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-038 | P1 | APIObservability | Exibir logs de API/webhook com correlação, status, latência, retry e redelivery. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-039 | P1 | CaseTimeline | Toda mudança de estado relevante deve aparecer em timeline auditável do caso. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-040 | P1 | Help | Jornada deve oferecer ajuda contextual e fallback assistido sem expor dados sensíveis. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-041 | P2 | SavedViews | Usuários internos podem salvar filtros/visões conforme permissão. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-042 | P2 | Bulk | Ações em lote devem exigir capability, limitar escopo, mostrar impacto e gerar evidência. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-043 | P2 | Notes | Notas internas devem suportar classificação, autor, timestamp e controle de visibilidade. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-044 | P2 | Exports | Exportações devem respeitar locale, masking, timezone, tenant e política de retenção. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-045 | P2 | Brand | Tenant pode pré-visualizar branding antes de publicar. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-046 | P2 | Simulation | Simuladores devem explicar quais regras/capabilities foram acionadas sem divulgar segredo HFS. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-047 | P2 | ProviderCompare | Admin Mutual pode comparar provider por capability/país/custo/qualidade/health. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-048 | P2 | Incident | Console Mutual deve relacionar incidente a tenant/provider/capability/release afetados. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-049 | P2 | DataSubject | Suportar solicitações de titular quando aplicável, com autorização e evidência. | CANONICAL | G0/G1/G7 conforme aplicável |
| RF-UX-050 | P2 | FeatureFlags | Provisioning deve controlar features/regions/jurisdictions por tenant e ambiente. | CANONICAL | G0/G1/G7 conforme aplicável |

## 6. RNF — 40 Requisitos Não Funcionais (RNF-UX-001..040)

| Requirement ID | Prioridade | Categoria | Requisito não funcional | Status | Gate |
|---|---|---|---|---|---|
| RNF-UX-001 | P0 | Security | Autorização server-side deny-by-default; UI nunca é controle de segurança. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-002 | P0 | Tenant Isolation | RLS/FORCE RLS e testes negativos para BOLA/IDOR/cross-tenant. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-003 | P0 | Crypto | Dados sensíveis criptografados em trânsito e repouso; envelope encryption para PII crítica. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-004 | P0 | Secrets | Segredos fora do código/logs; rotação e gestão centralizada. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-005 | P0 | Audit | Eventos críticos append-only e correlacionáveis. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-006 | P0 | Availability | SLOs por superfície/capability definidos antes de produção; degraded mode explícito. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-007 | P0 | Performance | Metas P95/P99 definidas por rota; páginas devem priorizar informação útil antes de widgets pesados. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-008 | P0 | Resilience | Timeout, retry idempotente, circuit breaker/fallback e estados UNKNOWN/INCONCLUSIVE. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-009 | P0 | Observability | Logs estruturados, métricas, traces e correlation_id ponta a ponta sem PII desnecessária. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-010 | P0 | Privacy | Minimização, masking, consentimento, retenção, residency e transfer controls por jurisdição. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-011 | P0 | Accessibility | Acessibilidade nível AA conforme padrão vigente; teclado, leitor de tela, foco e contraste. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-012 | P0 | Internationalization | UTF-8, locale, timezone, idiomas, formatos e identificadores sem hardcode BR. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-013 | P0 | Responsive | Jornada mobile-first; consoles desktop-first responsivos sem perda de função crítica. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-014 | P0 | Session | Sessão com expiração, inactivity timeout, revogação e proteção contra fixation/replay. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-015 | P0 | Integrity | Documentos/evidências possuem hash/integridade e lineage. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-016 | P0 | Testing | Unit, integration, DB/RLS, contract, E2E e negative security tests conforme risco. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-017 | P0 | CI | Typecheck, lint, tests, migrations, build, boundary/auth guards e security scanning como gates. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-018 | P0 | Maintainability | Componentização via lib-ui/design tokens; domínio não depende de provider/marca. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-019 | P0 | Versioning | APIs, policies, flows, requirements, evidence contracts e internal capability contracts versionados. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-020 | P0 | Explainability | Decisões e regras devem ser explicáveis por reason codes/evidências, sem expor segredo proprietário. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-021 | P1 | Browser | Suportar browsers corporativos modernos definidos na matriz de suporte do release. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-022 | P1 | Mobile | Captura deve funcionar em iOS/Android modernos via web/hosted flow ou SDK homologado. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-023 | P1 | LatencyBudget | Cada tela deve ter budget de chamadas e evitar waterfalls desnecessários. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-024 | P1 | Caching | Caches devem ser tenant-safe e nunca servir PII para contexto incorreto. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-025 | P1 | RateLimit | Login, APIs e webhooks devem possuir rate limiting proporcional ao risco. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-026 | P1 | MFA | MFA deve ser aplicável a perfis privilegiados conforme política de risco. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-027 | P1 | TrustedProxy | IPs de auditoria apenas de cadeia de proxy confiável. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-028 | P1 | DataExport | Exports devem ser gerados de modo assíncrono quando grandes, com expiração e autorização. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-029 | P1 | Search | Busca indexada deve respeitar tenant, masking e política de acesso. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-030 | P1 | Telemetry | Eventos UX devem evitar conteúdo sensível e permitir medir funil/drop-off. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-031 | P1 | Recovery | Ações destrutivas/configuracionais críticas devem possuir rollback ou plano de recuperação. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-032 | P1 | BCP | Runbooks e contingência para provider, storage, DB, HFS e webhooks. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-033 | P1 | LocalizationQuality | Textos localizados versionados; sem strings regulatórias hardcoded em componentes. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-034 | P1 | Consistency | Status, severidade, cores e labels devem vir de catálogo/tokens únicos. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-035 | P1 | ErrorModel | Erros devem possuir código interno, mensagem segura, correlação e ação recomendada. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-036 | P2 | Print | Dossiês/exports devem manter legibilidade e classificação fora da UI interativa. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-037 | P2 | Keyboard | Consoles críticos devem permitir produtividade por teclado sem comprometer confirmação de ações. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-038 | P2 | Theme | White-label deve preservar contraste/acessibilidade mesmo com tema customizado. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-039 | P2 | AnalyticsQuality | Definições de KPI devem ter owner, fórmula, fonte e granularidade versionadas. | CANONICAL | G1/G7/G9 conforme aplicável |
| RNF-UX-040 | P2 | CostAwareness | Chamadas externas caras devem ser observáveis e simuláveis antes de publicação de política. | CANONICAL | G1/G7/G9 conforme aplicável |

## 7. UX_STATES — Estados de UX

| State ID | Superfície | Estado | Quando ocorre | Comportamento exigido |
|---|---|---|---|---|
| ST-001 | Global | loading | Dados ainda carregando | Skeleton/progress sem layout shift; cancelar/retry quando aplicável |
| ST-002 | Global | empty | Nenhum dado no escopo | Explicar por quê + CTA permitido; não parecer erro |
| ST-003 | Global | error | Falha tratável | Mensagem segura + correlation id + retry/ação |
| ST-004 | Global | access_denied | Sem permissão | Não expor existência/conteúdo sensível; orientar fluxo autorizado |
| ST-005 | Global | unavailable | Dependência indisponível | Mostrar degraded/unknown; nunca converter em PASS |
| ST-006 | Jornada | saved | Progresso persistido | Mostrar confirmação discreta e possibilidade de retomada |
| ST-007 | Jornada | expired_session | Sessão expirada | Reautenticar/retomar sem perda de dados válidos |
| ST-008 | Analista | waiting_customer | Aguardando complemento | SLA/aging e próxima ação visíveis |
| ST-009 | Admin | pending_approval | Configuração aguardando checker | Diff, maker, motivo e ações permitidas |
| ST-010 | Mutual | degraded | Serviço/provider degradado | Impacto, escopo, runbook e kill switch quando autorizado |

## 8. PERMISSIONS — Papéis e acesso base

| Role ID | Papel | Superfície | Acesso base / restrições |
|---|---|---|---|
| subject | Cliente/verificado | A | A1-A20 próprio case/delegação |
| tenant_analyst | Analista | B | B1-B11,B13-B22 conforme capability; sem aprovação acima da alçada |
| tenant_compliance | Compliance | B | B1-B22; decisão conforme policy/alçada |
| tenant_approver | Aprovador | B | B12 e atos maker-checker; não aprova própria autoria |
| tenant_admin | Admin tenant | C | C1-C21,C24; publicação sensível exige capability/SoD |
| tenant_developer | Developer tenant | C | C16,C22,C23 e documentação; sem acesso a PII desnecessária |
| mutual_support | Suporte Mutual | D/B | D7 e acesso assistido justificado a casos; auditado |
| mutual_ops | Operação Mutual | D | D1-D4,D6-D10,D13-D14 conforme role |
| mutual_security | Segurança | D | D4,D8,D12,D13; ações críticas auditadas |
| mutual_model_gov | Model Governance | D | D5 e HFS; sem exposição pública da metodologia |
| mutual_platform_admin | Platform Admin | D | Provisioning/operacional privilegiado; JIT/maker-checker quando aplicável |
| auditor_readonly | Auditor read-only | B/C/D | Consulta autorizada, sem mutações/export sensível sem permissão específica |

## 9. NAVIGATION — Mapas de navegação

| Nav ID | Superfície | Mapa | Regra |
|---|---|---|---|
| NAV-A | Jornada | A1>A2/A3>A4>(A5/A6/A7/A8/A9/A10/A11 conforme policy)>A12>A13>A14 | Stepper dinâmico governado por flow/policy; etapas não aplicáveis não aparecem. |
| NAV-B | Analista | B1>B2>{B3..B11,B13..B22}>B12 | Caso como contexto persistente; tabs/drawers; decisão acessível apenas com authority. |
| NAV-C | Admin/Developer | C1>{C2..C24} | Sidebar por capability; builders mantêm version/status; developer platform separa ambientes. |

> ⚠️ [LACUNA NA FONTE] A aba NAVIGATION da planilha extraída contém apenas NAV-A, NAV-B e NAV-C. Não há linha NAV-D (Console Mutual) na extração da fonte. A navegação da superfície D está descrita no ONB-UX-001 ("Mutual: D1 como visão de tenants -> D2-D14 por operação, risco, governança e release") — ver documento 07.

## 10. USER_FLOWS — 12 fluxos de usuário canônicos

| Flow ID | Fluxo | Sequência funcional | Telas | Regras críticas |
|---|---|---|---|---|
| UF-001 | Jornada PF padrão | Convite -> Jurisdição -> Dados -> Documento -> Liveness -> Endereço -> Termos -> Revisão -> Envio -> Acompanhamento | A1>A3>A4>A6>A5>A7>A12>A13>A14 | Caso salvo a cada etapa; policies podem inserir/remover etapas. |
| UF-002 | Jornada PJ/KYB | Convite -> Natureza -> Jurisdição -> Empresa -> Grafo/QSA/UBO -> Pessoas-chave -> Docs societários -> Termos -> Revisão -> Envio | A1>A2>A3>A4>A8>A9>A11>A12>A13 | Delegação de pessoas-chave via A15/A16/A17. |
| UF-003 | Complemento de cliente | Analista solicita complemento -> Notificação -> Cliente retoma etapa específica -> Reenvia -> Caso volta à fila | B13>C24>A14/A19>A6/A11>B1 | Preservar versões anteriores e motivo. |
| UF-004 | Revisão manual AML | Hit AML -> B8 -> desambiguação -> notas/evidências -> decisão/alçada | B1>B2>B8>B3>B22>B12 | Nunca auto-aprovar timeout/unknown. |
| UF-005 | Contestação | Decisão contestável -> Cliente contesta -> fila independente -> revisão -> decisão | A18>B17>B22>B12>A14 | Auditoria e independência conforme política. |
| UF-006 | Publicação de policy | Editar -> validar -> simular -> submeter aprovação -> maker-checker -> publicar | C6>C7>C8>C9 | Versão imutável após publicação; rollback por nova versão. |
| UF-007 | Configuração provider | Registrar provider -> capabilities/jurisdições -> contrato/health/custo -> simular routing -> publicar | C10>D10>C21>C9 | Serasa/idwall correlacionados. |
| UF-008 | Onboarding via API | Cliente cria case -> recebe hosted link/SDK -> eventos -> webhook -> consulta API | C22>C16>A1..A14>C23 | API idempotente e webhooks assinados. |
| UF-009 | Revalidação | Regra de expiração -> alerta -> jornada parcial -> rescreening -> decisão | B14>B15>A14>A6/B8>B12 | Preservar histórico e nova evidence version. |
| UF-010 | HFS investigativo | Case elegível -> internal capability -> sinais -> B22 -> revisão -> decisão | B2>D5>B22>B12 | Metodologia proprietária não exposta. |
| UF-011 | Kill switch | Incidente -> avaliar impacto -> dupla aprovação -> desabilitar capability/provider/tenant -> monitorar -> reverter | D12>D4>D13>D14 | Ação crítica auditada. |
| UF-012 | Homologação release | Capabilities/screens -> QA -> evidências -> gates -> aprovação -> release | D14 + registries | CODE_COMPLETE != DONE. |

## 11. TECH_FLOWS — 12 fluxos técnicos

| Flow ID | Fluxo técnico | Sequência | IDs/correlação | Controles |
|---|---|---|---|---|
| TF-001 | Criação de case | Channel -> Public/Application API -> Case Service -> PostgreSQL/RLS -> Audit -> Response | case_id; tenant_id; subject_id | idempotency; auth; tenant; audit |
| TF-002 | Execução de capability | Policy -> Orchestrator -> Routing -> Adapter/Official/Internal -> EvidenceEnvelope -> Reconciliation -> Case | capability_id; evidence_id | timeout; retry; circuit; UNKNOWN; lineage |
| TF-003 | Documento | Client -> Upload Authorization -> Object Storage -> Integrity/Malware Hook -> Metadata DB -> Evidence | document_id; object_key; hash | MIME/size; encryption; retention; tenant |
| TF-004 | Biometria | Client SDK/Hosted -> Adapter -> normalized evidence -> policy | attempt_id; evidence_id | consent; retry; spoof; timeout; fallback |
| TF-005 | Decisão | Analyst -> Decision Service -> authority/SoD -> state transition -> audit/evidence -> event | decision_id; actor_id | server-authoritative; maker-checker |
| TF-006 | Webhook outbound | Domain Event -> Outbox -> Dispatcher -> Signed Webhook -> Retry/DLQ -> Delivery Log | event_id; delivery_id | signature; replay; idempotency; redelivery |
| TF-007 | Tenant resolution | Session/API credential -> membership/scopes -> tenant context -> DB SET LOCAL -> RLS | tenant_id; user_id | fail closed; no TENANT_DEV prod |
| TF-008 | HFS internal | Case/IDs -> InternalCapabilityContract -> HFS -> signals/evidence -> Investigation -> decision | model_version; signal_id | lineage; health; degraded; kill switch |
| TF-009 | Observability | Request -> correlation -> structured logs/metrics/traces -> alerting/SLO | correlation_id | PII minimization; tenant-safe |
| TF-010 | Retention | Policy/Jurisdiction -> scheduler -> eligibility -> legal hold check -> delete/crypto-shred -> audit | retention_job_id | evidence; irreversibility control |
| TF-011 | Config publish | Draft -> validate -> simulate -> approval -> immutable version -> active pointer -> audit/event | version_id | SoD; rollback via version |
| TF-012 | Release gate | CI evidence -> QA -> registry -> gate decision -> release artifact -> production verification | release_id; commit_sha | no manual bypass without waiver |

## 12. DESIGN_SYSTEM — Tokens e padrões (DS-001..DS-010)

| Token/Pattern ID | Componente/Princípio | Especificação |
|---|---|---|
| DS-001 | Layout Jornada | Mobile-first; largura de leitura controlada; stepper; CTA fixo quando seguro; ajuda contextual. |
| DS-002 | Layout Console | Sidebar + topbar; conteúdo 12-col; filtros persistentes; tabelas/drawers; breadcrumbs. |
| DS-003 | Status | Usar icon + label + cor; nunca cor isolada. Catálogo único para success/warn/error/unknown/blocked. |
| DS-004 | Tabelas | Colunas priorizadas; sticky header; density toggle; sort/filter; paginação; row actions explícitas. |
| DS-005 | Forms | Labels persistentes; helper/error text; validação progressiva; máscaras apenas de apresentação; autosave quando aplicável. |
| DS-006 | Critical Actions | Confirmação com impacto; motivo obrigatório; reautenticação/MFA quando política exigir; trilha. |
| DS-007 | Graphs | Legenda, filtros, zoom, lista alternativa acessível, export controlado; não depender só de posição/cor. |
| DS-008 | Evidence | Origem, timestamp, versão, status, confidence/reason codes, lineage e raw-reference controlado. |
| DS-009 | International | Text expansion; locale/timezone; nomes/endereço flexíveis; RTL-ready quando mercado exigir; UTF-8. |
| DS-010 | White-label | Tokens controlados; contraste preservado; logo/theme sem alterar semântica/segurança. |

## 13. AC_HOMOLOGATION — 400 critérios mínimos de homologação

A aba contém 5 critérios de aceite por tela (dimensões UX, Security, Data, Accessibility, Responsive) para cada uma das 80 telas = 400 ACs, todos com status **PROPOSED**. O padrão de ID é `<ScreenID>-<DIMENSÃO>` (ex.: `A1-UX`, `B12-SEC`, `D14-RESP`).

Textos canônicos dos critérios (verbatim; na dimensão UX o texto é prefixado pelo nome da função da tela):

| Dimensão | Sufixo do AC ID | Critério (verbatim) |
|---|---|---|
| UX | -UX | "*Função da tela*: objetivo claro, hierarquia visual, estados completos e ação primária inequívoca." |
| Security | -SEC | Rota e mutações protegidas server-side; tenant/role/capability validados; negative tests. |
| Data | -DATA | Dados exibidos possuem fonte definida, masking e lineage quando aplicável. |
| Accessibility | -A11Y | Teclado, foco, labels, contraste, mensagens de erro e leitor de tela verificados. |
| Responsive | -RESP | Layout homologado nos breakpoints aplicáveis sem perda de ação crítica. |

Tabela completa dos 400 AC IDs (5 por tela; todos PROPOSED). O "prefixo UX" é o texto que inicia o critério da dimensão UX daquela tela:

| Screen ID | Prefixo do critério UX (verbatim) | AC IDs | Status |
|---|---|---|---|
| A1 | Entrada/convite | A1-UX; A1-SEC; A1-DATA; A1-A11Y; A1-RESP | PROPOSED |
| A2 | Identificação da natureza | A2-UX; A2-SEC; A2-DATA; A2-A11Y; A2-RESP | PROPOSED |
| A3 | Jurisdição | A3-UX; A3-SEC; A3-DATA; A3-A11Y; A3-RESP | PROPOSED |
| A4 | Etapas dinâmicas | A4-UX; A4-SEC; A4-DATA; A4-A11Y; A4-RESP | PROPOSED |
| A5 | Liveness | A5-UX; A5-SEC; A5-DATA; A5-A11Y; A5-RESP | PROPOSED |
| A6 | Captura de documento | A6-UX; A6-SEC; A6-DATA; A6-A11Y; A6-RESP | PROPOSED |
| A7 | Endereço | A7-UX; A7-SEC; A7-DATA; A7-A11Y; A7-RESP | PROPOSED |
| A8 | Grafo societário | A8-UX; A8-SEC; A8-DATA; A8-A11Y; A8-RESP | PROPOSED |
| A9 | Pessoas-chave | A9-UX; A9-SEC; A9-DATA; A9-A11Y; A9-RESP | PROPOSED |
| A10 | Rede de terceiros | A10-UX; A10-SEC; A10-DATA; A10-A11Y; A10-RESP | PROPOSED |
| A11 | Documentos societários | A11-UX; A11-SEC; A11-DATA; A11-A11Y; A11-RESP | PROPOSED |
| A12 | Termos/assinatura | A12-UX; A12-SEC; A12-DATA; A12-A11Y; A12-RESP | PROPOSED |
| A13 | Revisão/envio | A13-UX; A13-SEC; A13-DATA; A13-A11Y; A13-RESP | PROPOSED |
| A14 | Acompanhamento | A14-UX; A14-SEC; A14-DATA; A14-A11Y; A14-RESP | PROPOSED |
| A15 | Convite de pessoa-chave | A15-UX; A15-SEC; A15-DATA; A15-A11Y; A15-RESP | PROPOSED |
| A16 | Jornada individual delegada | A16-UX; A16-SEC; A16-DATA; A16-A11Y; A16-RESP | PROPOSED |
| A17 | Progresso do grupo | A17-UX; A17-SEC; A17-DATA; A17-A11Y; A17-RESP | PROPOSED |
| A18 | Contestação/revisão humana | A18-UX; A18-SEC; A18-DATA; A18-A11Y; A18-RESP | PROPOSED |
| A19 | Recuperação/verificação assistida | A19-UX; A19-SEC; A19-DATA; A19-A11Y; A19-RESP | PROPOSED |
| A20 | Consentimentos/autorizações externas | A20-UX; A20-SEC; A20-DATA; A20-A11Y; A20-RESP | PROPOSED |
| B1 | Fila de casos | B1-UX; B1-SEC; B1-DATA; B1-A11Y; B1-RESP | PROPOSED |
| B2 | Visão geral | B2-UX; B2-SEC; B2-DATA; B2-A11Y; B2-RESP | PROPOSED |
| B3 | Evidências | B3-UX; B3-SEC; B3-DATA; B3-A11Y; B3-RESP | PROPOSED |
| B4 | Grafo societário | B4-UX; B4-SEC; B4-DATA; B4-A11Y; B4-RESP | PROPOSED |
| B5 | Pessoas-chave | B5-UX; B5-SEC; B5-DATA; B5-A11Y; B5-RESP | PROPOSED |
| B6 | Rede de terceiros | B6-UX; B6-SEC; B6-DATA; B6-A11Y; B6-RESP | PROPOSED |
| B7 | Documentos | B7-UX; B7-SEC; B7-DATA; B7-A11Y; B7-RESP | PROPOSED |
| B8 | AML/disambiguation | B8-UX; B8-SEC; B8-DATA; B8-A11Y; B8-RESP | PROPOSED |
| B9 | Judicial/criminal | B9-UX; B9-SEC; B9-DATA; B9-A11Y; B9-RESP | PROPOSED |
| B10 | Fiscal/certificados | B10-UX; B10-SEC; B10-DATA; B10-A11Y; B10-RESP | PROPOSED |
| B11 | Trilha/acessos | B11-UX; B11-SEC; B11-DATA; B11-A11Y; B11-RESP | PROPOSED |
| B12 | Decisão/alçada | B12-UX; B12-SEC; B12-DATA; B12-A11Y; B12-RESP | PROPOSED |
| B13 | Pendências/complementos | B13-UX; B13-SEC; B13-DATA; B13-A11Y; B13-RESP | PROPOSED |
| B14 | Reavaliação/refresh | B14-UX; B14-SEC; B14-DATA; B14-A11Y; B14-RESP | PROPOSED |
| B15 | Alertas de monitoramento | B15-UX; B15-SEC; B15-DATA; B15-A11Y; B15-RESP | PROPOSED |
| B16 | Dossiê/export | B16-UX; B16-SEC; B16-DATA; B16-A11Y; B16-RESP | PROPOSED |
| B17 | Fila de contestação | B17-UX; B17-SEC; B17-DATA; B17-A11Y; B17-RESP | PROPOSED |
| B18 | Reconciliação entre fontes | B18-UX; B18-SEC; B18-DATA; B18-A11Y; B18-RESP | PROPOSED |
| B19 | Fraude/device/session | B19-UX; B19-SEC; B19-DATA; B19-A11Y; B19-RESP | PROPOSED |
| B20 | Capacidade econômica/origem de recursos | B20-UX; B20-SEC; B20-DATA; B20-A11Y; B20-RESP | PROPOSED |
| B21 | Licenças/autorizações regulatórias | B21-UX; B21-SEC; B21-DATA; B21-A11Y; B21-RESP | PROPOSED |
| B22 | Workspace investigativo | B22-UX; B22-SEC; B22-DATA; B22-A11Y; B22-RESP | PROPOSED |
| C1 | Dashboard | C1-UX; C1-SEC; C1-DATA; C1-A11Y; C1-RESP | PROPOSED |
| C2 | Requirements | C2-UX; C2-SEC; C2-DATA; C2-A11Y; C2-RESP | PROPOSED |
| C3 | Editor de requirement | C3-UX; C3-SEC; C3-DATA; C3-A11Y; C3-RESP | PROPOSED |
| C4 | Flows | C4-UX; C4-SEC; C4-DATA; C4-A11Y; C4-RESP | PROPOSED |
| C5 | Editor de flow | C5-UX; C5-SEC; C5-DATA; C5-A11Y; C5-RESP | PROPOSED |
| C6 | Policies | C6-UX; C6-SEC; C6-DATA; C6-A11Y; C6-RESP | PROPOSED |
| C7 | Editor de policy | C7-UX; C7-SEC; C7-DATA; C7-A11Y; C7-RESP | PROPOSED |
| C8 | Simulação | C8-UX; C8-SEC; C8-DATA; C8-A11Y; C8-RESP | PROPOSED |
| C9 | Publicação/versionamento | C9-UX; C9-SEC; C9-DATA; C9-A11Y; C9-RESP | PROPOSED |
| C10 | Providers/routing | C10-UX; C10-SEC; C10-DATA; C10-A11Y; C10-RESP | PROPOSED |
| C11 | Custo/uso/margem | C11-UX; C11-SEC; C11-DATA; C11-A11Y; C11-RESP | PROPOSED |
| C12 | Marca/tema/idioma | C12-UX; C12-SEC; C12-DATA; C12-A11Y; C12-RESP | PROPOSED |
| C13 | Domínio/e-mail/canais | C13-UX; C13-SEC; C13-DATA; C13-A11Y; C13-RESP | PROPOSED |
| C14 | Usuários/papéis | C14-UX; C14-SEC; C14-DATA; C14-A11Y; C14-RESP | PROPOSED |
| C15 | Alçadas/segregação | C15-UX; C15-SEC; C15-DATA; C15-A11Y; C15-RESP | PROPOSED |
| C16 | API keys/webhooks | C16-UX; C16-SEC; C16-DATA; C16-A11Y; C16-RESP | PROPOSED |
| C17 | Auditoria de configuração | C17-UX; C17-SEC; C17-DATA; C17-A11Y; C17-RESP | PROPOSED |
| C18 | Proteção de dados | C18-UX; C18-SEC; C18-DATA; C18-A11Y; C18-RESP | PROPOSED |
| C19 | Produtos de verificação | C19-UX; C19-SEC; C19-DATA; C19-A11Y; C19-RESP | PROPOSED |
| C20 | Editor de produto | C20-UX; C20-SEC; C20-DATA; C20-A11Y; C20-RESP | PROPOSED |
| C21 | Simulação/conflitos de produto | C21-UX; C21-SEC; C21-DATA; C21-A11Y; C21-RESP | PROPOSED |
| C22 | Developer/Sandbox/SDK/Hosted | C22-UX; C22-SEC; C22-DATA; C22-A11Y; C22-RESP | PROPOSED |
| C23 | Logs API/webhook | C23-UX; C23-SEC; C23-DATA; C23-A11Y; C23-RESP | PROPOSED |
| C24 | Notificações/localização | C24-UX; C24-SEC; C24-DATA; C24-A11Y; C24-RESP | PROPOSED |
| D1 | Clientes/tenants | D1-UX; D1-SEC; D1-DATA; D1-A11Y; D1-RESP | PROPOSED |
| D2 | Provider health | D2-UX; D2-SEC; D2-DATA; D2-A11Y; D2-RESP | PROPOSED |
| D3 | Margem/custos | D3-UX; D3-SEC; D3-DATA; D3-A11Y; D3-RESP | PROPOSED |
| D4 | Kill switch | D4-UX; D4-SEC; D4-DATA; D4-A11Y; D4-RESP | PROPOSED |
| D5 | Governança de modelos | D5-UX; D5-SEC; D5-DATA; D5-A11Y; D5-RESP | PROPOSED |
| D6 | Capability catalog | D6-UX; D6-SEC; D6-DATA; D6-A11Y; D6-RESP | PROPOSED |
| D7 | Suporte a casos | D7-UX; D7-SEC; D7-DATA; D7-A11Y; D7-RESP | PROPOSED |
| D8 | Trilha de acesso Mutual | D8-UX; D8-SEC; D8-DATA; D8-A11Y; D8-RESP | PROPOSED |
| D9 | Provisioning/região/features | D9-UX; D9-SEC; D9-DATA; D9-A11Y; D9-RESP | PROPOSED |
| D10 | Fornecedores/third-party risk | D10-UX; D10-SEC; D10-DATA; D10-A11Y; D10-RESP | PROPOSED |
| D11 | Jurisdições/baseline normativo | D11-UX; D11-SEC; D11-DATA; D11-A11Y; D11-RESP | PROPOSED |
| D12 | Segurança/privacidade/incidentes | D12-UX; D12-SEC; D12-DATA; D12-A11Y; D12-RESP | PROPOSED |
| D13 | Platform health/jobs/queues/webhooks | D13-UX; D13-SEC; D13-DATA; D13-A11Y; D13-RESP | PROPOSED |
| D14 | Cockpit de homologação/release | D14-UX; D14-SEC; D14-DATA; D14-A11Y; D14-RESP | PROPOSED |

## 14. REPORTS — 12 relatórios (RPT-001..RPT-012)

| Report ID | Nome | Público | Conteúdo | Filtros principais | Classificação | Auditoria | Status |
|---|---|---|---|---|---|---|---|
| RPT-001 | Funil de onboarding | Tenant/Product/Mutual | início, etapas, submissão, decisão, drop-off | tenant,produto,segmento,jurisdição,período | Operational analytics | export auditável | PROPOSED |
| RPT-002 | SLA e backlog | Operações | backlog, aging, SLA, throughput | tenant,equipe,owner,priority,status | Operational | sim | PROPOSED |
| RPT-003 | Decisões e reason categories | Compliance/Risk | aprovação,rejeição,restrição,escala,reason | produto,segmento,jurisdição,policy_version | Restricted | sim | PROPOSED |
| RPT-004 | Evidence coverage | Compliance/QA | coverage,status,expiry,unavailable,inconclusive | capability,source,provider,jurisdição | Restricted | sim | PROPOSED |
| RPT-005 | Provider performance e custo | Admin/Mutual Ops | latência,error,timeout,failover,cost,health | provider,economic_group,capability,region | Commercial/Restricted | sim | PROPOSED |
| RPT-006 | API e webhook health | Developer/Platform | requests,latency,4xx,5xx,delivery,retry,DLQ | tenant,endpoint,version,event_type,period | Technical | sim | PROPOSED |
| RPT-007 | Refresh e revalidation | Compliance/Ops | due,overdue,changed,unchanged,escalated | tenant,produto,jurisdição,period | Restricted | sim | PROPOSED |
| RPT-008 | Appeals e contestação | Compliance | volume,aging,outcome,overturn | tenant,produto,reason_category,owner | Restricted | sim | PROPOSED |
| RPT-009 | Audit e privileged access | Security/Audit | actors,targets,actions,reasons,JIT,denials | tenant,actor,action,period,severity | Highly Restricted | obrigatória | PROPOSED |
| RPT-010 | Release e homologação | Product/QA/Engineering | screens,capabilities,gates,CI,UAT,blockers | release,wave,capability,screen,gate | Internal | sim | PROPOSED |
| RPT-011 | Uso, custo e margem estimada | Finance/Ops | usage,cost,billed/estimated revenue,margin estimate | tenant,produto,provider,currency,period | Commercial/Restricted | sim | PROPOSED |
| RPT-012 | Cobertura de jurisdição e segmento | Product/Governance | packs,capabilities,providers,gaps,homologation | jurisdição,segmento,capability,status | Internal | sim | PROPOSED |

---

## Observações de completude

- Todas as 80 linhas de SCREENS_80 (A1–A20, B1–B22, C1–C24, D1–D14), os 82 KPIs, 20 filtros, 50 RF, 40 RNF, 10 estados, 12 roles, 12 user flows, 12 tech flows, 10 padrões de design system, 400 ACs e 12 relatórios foram preservados com seus IDs canônicos exatos.
- Colunas com valor idêntico em todas as linhas (ou em todas as linhas de uma superfície) foram fatoradas nas seções 2.1–2.3 para eliminar repetição sem perda de conteúdo — o texto de cada valor é verbatim da fonte.
- KPI-MUT-013 (Tenant health score) tem fórmula marcada na fonte como "composição TO_FORMALIZE antes de CANONICAL"; KPI-MUT-008 (Provider health score) tem fórmula composta que, segundo o ONB-UX-005, "deve ser aprovada antes de CANONICAL".
