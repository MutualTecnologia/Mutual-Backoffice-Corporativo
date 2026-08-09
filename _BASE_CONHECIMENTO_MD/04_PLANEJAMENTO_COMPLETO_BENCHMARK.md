---
titulo: "Mutual Onboarding Corporativo — Planejamento Completo de Produto, Mercado, Benchmark, Arquitetura, Integrações, Telas e Homologação (Revisão Estratégica)"
fontes:
  - id: SRC-001
    documento: "MUTUAL_ONBOARDING_CORPORATIVO_PLANEJAMENTO_COMPLETO_BENCHMARK v1.1"
    versao: "1.1"
    data_base: "2026-08-08"
    descricao: "Documento mestre de planejamento (benchmark) do programa Mutual Onboarding — fonte canônica de planejamento"
status_fonte: "CANÔNICA — Gate de dados APTO_PARCIAL (apto para desenho, arquitetura, priorização e integração estratégica; ranking econômico final de providers bloqueado)"
gerado_em: 2026-08-09
---

# Mutual Onboarding Corporativo — Planejamento Completo (Benchmark v1.1)

**MUTUAL CAPITAL — ONBOARDING CORPORATIVO**
Planejamento Completo de Produto, Mercado, Benchmark, Arquitetura, Integrações, Telas e Homologação — Revisão Estratégica.
Projeto independente do Backoffice Corporativo.

> **VEREDITO DE PLANEJAMENTO:** `APTO_PARCIAL` para desenho, arquitetura, priorização e integração estratégica. A revisão torna **CANONICAL** o Hyperbolic Financial / Mutual Intelligence como ativo proprietário da Mutual. Ranking econômico final de providers continua **bloqueado** até preço, SLA, DPA, segurança, cobertura e condições comerciais serem comprovados.

**Versão 1.1** | **Data-base:** 08 de agosto de 2026 | **Revisão:** Serasa Experian, idwall, Unico, DataRudder e Hyperbolic Financial / Mutual Intelligence

---

## Controle do documento

| Campo | Valor |
|---|---|
| Produto | Mutual Onboarding Corporativo |
| Classificação | Documento Interno |
| Repositório canônico | Mutual-Processadora-de-Pagamentos/onboarding-corporativo |
| Escopo | Onboarding, KYC/KYB, AML, fraude, due diligence, case management, monitoramento e developer platform |
| Fora de escopo | Backoffice corporativo; ledger/saldo/transações; Pix/MED; KYT transacional; Travel Rule; execução financeira |
| Maturidade atual | Implementação parcial real + documentação em revisão + gaps de integrações e homologação |
| Gate de dados | APTO_PARCIAL |
| Criticidade executiva | ALTA |
| Próxima decisão | Aprovar revisão v1.1; formalizar HFS como capability proprietária; abrir Wave 0 de canonicalização/RFP/registry |
| Revisão estratégica | Serasa Experian + idwall, Unico, DataRudder e Hyperbolic Financial / Mutual Intelligence |
| Ativo proprietário | Hyperbolic Financial System / Mutual Intelligence — CANONICAL por decisão do dono do produto em 08/08/2026 |

---

## Sumário executivo

A recomendação é **evoluir o repositório `onboarding-corporativo` existente**, sem recomeçar e sem acoplá-lo ao `backoffice-corporativo`. O produto deve se tornar uma **plataforma de verificação de identidade e compliance multi-tenant/white-label**, vendável por API, SDK, hosted flow e painéis, com a Mutual como cliente nº 1. A arquitetura já aprovada — **capacidade como interface e provider como plugin** — continua correta, agora reforçada por uma exceção estratégica positiva: o **Hyperbolic Financial / Mutual Intelligence é ativo proprietário da Mutual** e deve entrar como capability interna versionada, não como fornecedor externo. [INT-02][INT-09]

No mercado, a categoria de identity verification cresce rapidamente: a MarketsandMarkets projeta o mercado global de **USD 14,34 bilhões em 2025 para USD 29,32 bilhões em 2030 (CAGR de 15,4%)**. Para o Brasil, a mesma fonte projeta **USD 483 milhões em 2025 e USD 901,7 milhões em 2030 (CAGR de 13,3%)**. Esses números são referenciais de mercado, não projeção financeira da Mutual. [MKT-01][MKT-02]

O diferencial recomendado não é tentar reproduzir internamente todos os motores biométricos, bureaus ou bases externas. É combinar:

1. Profundidade Brasil em fontes oficiais, risco judicial, fiscal, cadastral, crédito e regulatório;
2. Identidade/antifraude com múltiplas rotas comerciais;
3. Inteligência relacional proprietária Hyperbolic Financial / Mutual Intelligence;
4. Evidence-first e audit trail;
5. Policy/flow/product builder;
6. Case management, revalidação e monitoramento contínuo;
7. Experiência multi-tenant/white-label e developer-first.

> **P0 IMEDIATO — CNPJ ALFANUMÉRICO**
> O novo formato já está em produção. O domínio atual armazena identificadores como string, o que é uma boa base; ainda assim, toda UI, busca, validação, persistência, exportação e cada adapter de provider deve ser testado contra CNPJ alfanumérico antes da homologação. [OFF-02][INT-01]

### Decisões executivas propostas

1. Preservar o repositório atual e sua separação do Backoffice Corporativo.
2. Tratar paridade competitiva como paridade de capacidades — não como cópia de telas ou dependência de um único fornecedor.
3. Integrar providers atrás de interfaces de capability; nenhum fluxo, regra ou API pública deve mencionar provider específico.
4. Definir um registry canônico de 80 telas funcionais antes da homologação; tela espelhada/protótipo não equivale a capability pronta.
5. Usar TypeScript strict end-to-end como linguagem principal, PostgreSQL/SQL para invariantes e RLS, mantendo workers em Node/TS até existir necessidade comprovada de outra linguagem.
6. Ativar Brasil primeiro como operação, preservando arquitetura agnóstica de jurisdição; demais mercados entram por waves de ativação.
7. Separar dados públicos oficiais de canais condicionados: BCB dados abertos pode alimentar KYB; SCR/CCS/Open Finance somente nos contextos em que elegibilidade e consentimento/autorização permitirem.
8. Não absorver KYT transacional, Travel Rule ou execução financeira para dentro do Onboarding; expor contratos de integração com produtos adjacentes.
9. Classificar Hyperbolic Financial / Mutual Intelligence como ativo proprietário e capability interna; nenhuma documentação nova deve tratá-lo como provider externo ou risco de fornecedor boutique.
10. Tratar Serasa Experian e idwall como ecossistema econômico correlacionado: a aquisição da idwall pela Serasa em julho de 2026 elimina a hipótese de usá-las como fallback independente entre si.
11. Incluir Serasa Experian, idwall, Unico e DataRudder na matriz obrigatória de benchmark/RFP e adapter candidates, preservando a fronteira entre onboarding e antifraude/PLD transacional.

---

# BLOCO 1 — Diagnóstico do produto e do mercado

## 1.1 Estado atual comprovado

| Elemento | Classificação | Evidência / leitura |
|---|---|---|
| Repositório separado | REAL | `onboarding-corporativo` é repositório dedicado e fonte canônica. |
| Domínio jurisdicionalmente agnóstico | REAL | Identificador usa strings por tipo/autoridade/país e valor; não fixa CPF/CNPJ no core. |
| Multi-tenant / RLS / evidência / motor | REAL / PARTIAL | Há código e migrations; homologação E2E e revisão independente ainda faltam. |
| Autenticação própria recente | REAL / REVIEW_REQUIRED | Commit recente declara papéis, scrypt, sessão e SoD no banco; documentação anterior ainda cita Clerk como bloqueio. |
| Protótipo navegável | PROTOTYPE | Commit recente fala em espelho de 45 telas; não prova cobertura do registry completo nem integrações reais. |
| Jornada delegada | PARTIAL | Fluxo e telas declarados em código; envio real e fallback assistido ainda faltam. |
| Providers externos | PARTIAL / NOT_EVIDENCED | Mapa existe; contratos, sandboxes e E2E reais não estão comprovados para todos. |
| B9 risco judicial | ABSENT/PARTIAL | Documentação declara ausência de modelo/provider ligado; vira prioridade de Wave 6. |
| Developer platform | PARTIAL | API/SDK/webhooks/sandbox precisam ser tratados como produto, não apenas interfaces internas. |
| Homologação | NOT_EVIDENCED | Não existe dossiê de release com todos os gates do produto-alvo. |

## 1.2 Findings de canonicalização

- **Contagem de telas divergente:** D-030 registra 56 telas; o documento de telas enumera famílias cuja soma já diverge, a camada de proteção de dados adiciona novas telas e o commit mais recente fala em 45 telas espelhadas. O número precisa ser substituído por **registry versionado**, não por contagem manual.
- **Documentação x código (autenticação):** documentação ainda registra Clerk/A-014 como bloqueio em trechos, enquanto o commit de 08/08/2026 declara autenticação própria com papéis e segregação no banco. Isso é documentação x código e deve bloquear o gate G0, não o desenvolvimento inteiro.
- **9ª natureza regulada:** parte do texto de posicionamento ainda fala em oito naturezas reguladas, mas **D-019** já aprovou correspondente bancário como 9ª natureza. O catálogo normativo e UAT devem refletir a decisão vigente.
- **CNPJ alfanumérico:** o core de identificadores é string e agnóstico de CPF/CNPJ, compatível conceitualmente com CNPJ alfanumérico; a superfície completa e os adapters ainda precisam de auditoria de compatibilidade.

> **FINDING CANONICAL — HFS:** por decisão explícita do dono do produto em 08/08/2026, Hyperbolic Financial / Mutual Intelligence é **ativo da Mutual**. Materiais anteriores que o descrevem como fornecedor externo permanecem úteis como avaliação técnica histórica, mas ficam **SUPERSEDED** quanto à titularidade e ao third-party risk.

> **FINDING DE CONCENTRAÇÃO — Serasa/idwall:** a Serasa Experian anunciou a aquisição da idwall em **01/07/2026**. Para arquitetura e procurement, as duas marcas devem ser mapeadas como **grupo econômico correlacionado**; indisponibilidade, renegociação ou mudança estratégica podem afetar ambas as rotas.

## 1.3 Mercado e tese de posicionamento

Os benchmarks mostram convergência para uma suíte integrada: **workflow/orchestration + identity/document/biometrics + device/fraud signals + AML + case management + ongoing monitoring + API/SDK/hosted journey**. ComplyCube e Sumsub seguem fortes como referências globais; Unico elevou a referência de identidade determinística, revalidação e defesa contra deepfake; idwall demonstra orquestração/marketplace de múltiplas soluções; Serasa Experian combina grande profundidade de dados, KYC/KYB, crédito e fraude; e DataRudder conecta onboarding a antifraude e PLD contínuo. [EXT-01][EXT-02][EXT-10][EXT-11][EXT-12][EXT-13]

No Brasil, a vantagem não está mais apenas em combinar pequenos especialistas. A Serasa Experian consolidou um ecossistema muito amplo e incorporou a idwall em 2026, enquanto Unico domina a referência de identidade biométrica/revalidação e DataRudder cobre fraude e PLD com continuidade pós-onboarding. A Mutual precisa responder com uma **arquitetura aberta e mais profunda**: fontes oficiais + especialistas + rotas comerciais + intelligence proprietária HFS, sem permitir que nenhum grupo econômico se torne fonte única da verdade. [EXT-10][EXT-11][EXT-12][EXT-13][INT-09]

> **TESE DE DIFERENCIAÇÃO**
> "Cobertura global comprável + profundidade Brasil + inteligência relacional proprietária HFS + decisão explicável + evidência auditável + multi-provider + white-label." Essa combinação é mais defensável do que tentar ser o melhor motor biométrico e o melhor agregador de dados ao mesmo tempo.

## 1.4 Benchmark de concorrentes, providers e ativos

| Referência / ativo | Papel no ecossistema | O que devemos absorver como capability | Condição para produção |
|---|---|---|---|
| ComplyCube | Plataforma global / provider | KYC/KYB, documento, biometria, AML, workflows, smart forms, policies, portal, API/SDK/hosted, ongoing monitoring. | Usar como benchmark de workflow e potencial rota global; validar contrato, residência, custos, limites, DPA e estratégia de saída. |
| Sumsub | Plataforma global / provider | KYC/KYB, Workflow Builder, Case Management, AML contínuo, device intelligence, reusable KYC, API/SDK. | Benchmark forte de case management e device. Transaction Monitoring/Travel Rule permanecem adjacentes ao Onboarding. |
| Assertiva | Especialista Brasil | Dados cadastrais, Autentica/biometria, documentos, crédito, dossiê e assinatura. | Adapter por capacidade; validar campos, origem, retenção, qualidade, contrato e custo por consulta. |
| Exato Digital | Especialista Brasil | Background PF/PJ, face compare, validação fiscal CNPJ, crédito e document monitoring. | Bom para corroborar cadastro/background/fiscal; não deixar modelo de dados vazar do provider. |
| Revizia | Especialista fiscal Brasil | Certidões, regularidade fiscal, monitoramento, e-CAC/DTE e painéis fiscais. | Entrar como capability fiscal/certidões; qualquer dado BACEN depende de canal lícito e elegibilidade própria. |
| Judit | Especialista judicial Brasil | Consultas CPF/CNPJ/nome/CNJ, processos, BNMP, anexos, tracking e webhooks. | Capability judicial/criminal com modelo próprio de processo, relevância, atualização e monitoramento. |
| Gryfo | Especialista biometria | Liveness, face matching e SDK offline/edge. | Rota preferencial quando cumprir acurácia, certificação, DPA, suporte e requisitos de device; reforça minimização. |
| Legitimuz | Especialista antifraude/ID Brasil | LegitCheck, LegitFace, LegitID, LegitDevice, LegitDoc; risco adaptativo e prevenção de fraude. | Benchmark obrigatório de device intelligence e fricção adaptativa; adapter somente após due diligence técnica/contratual. |
| T-Shield | Plataforma local antifraude | Safe Boarding, e-KYC PLD, ID/background/credit/risk checks, liveness, OCR, geolocalização, email/endereço/CPF/CNPJ. | Benchmark local amplo; validar profundidade de API, evidência, SLA, certificações e condições de subcontratação. |
| SERPRO / RFB | Fonte oficial / provider estatal | Datavalid V5, Consulta CPF v3, Consulta CNPJ e serviços oficiais contratáveis. | Prioridade para fatos oficiais quando elegível; desenhar adapter de versão, custo, consentimento/finalidade e testes de mudança de schema. |
| Banco Central | Fonte oficial / canais regulados | Cadastro de entidades autorizadas/dados abertos; SCR, CCS e Open Finance em contextos específicos. | Separar dados públicos de canais restritos. Nunca tratar SCR/CCS/Open Finance como base genérica de KYC. |
| Serasa Experian | Ecossistema Brasil / provider / benchmark | KYC/KYB, cadastro CPF/CNPJ, PEP e relações, antifraude cadastral/societária, crédito, biometria, device/liveness via catálogo de APIs e soluções do grupo. A escala de dados e o portfólio exigem benchmark obrigatório. | Integrar por capabilities, com minimização por finalidade. Mapear grupo econômico e evitar concentração: idwall e ClearSale não contam como redundância independente da Serasa. |
| idwall (grupo Serasa Experian) | Plataforma de identidade / orchestration / benchmark | Validação de identidade e documentos, biometria, device, KYC/PLD-CFT, background check, empresa/KYB, workflow manager, perfis, pendências, marketplace e integrações customizadas de terceiros. | Benchmark direto do nosso Provider Orchestrator e Admin Builder. Tratar dependência econômica como correlacionada à Serasa; validar roadmap pós-aquisição e portabilidade. |
| Unico | Identity specialist / provider / benchmark | Identidade determinística, liveness, proteção contra deepfake/injection, sinais de dispositivo/localização/IP, radar de fraude, captura/reuso de documento e revalidação ao longo da jornada. | Rota prioritária a avaliar para CAP-03/CAP-04/CAP-17. Não terceirizar ao provider a decisão de compliance; preservar EvidenceEnvelope, replay, explicabilidade e exit plan. |
| DataRudder | Antifraude/PLD Brasil / benchmark + provider candidate | No onboarding: validação documental, face match, mailing score, dados cadastrais, risk scoring, regras parametrizáveis, simulação, block/VIP list e dashboard. No pós-onboarding: antifraude transacional/Pix, PLD e Data Exchange/RC6. | Usar onboarding como referência/rota candidate. Componentes transacionais e PLD contínuo ficam adjacentes ao core e integram por eventos/cases; não contaminar o domínio Onboarding com regras transacionais. |
| Hyperbolic Financial / Mutual Intelligence | ATIVO PROPRIETÁRIO MUTUAL / capability interna | Inteligência relacional e investigativa para risco financeiro/PLD, link analysis, redes, grupos, outliers e geração de red flags/cases. Deve enriquecer o risco e o monitoramento com visão relacional própria. | Não é provider externo e não entra na RFP de contratação. Integrar via contrato interno versionado, IDs canônicos e EvidenceEnvelope; governar modelos, acesso, explicabilidade e confidencialidade da metodologia. |

### Leitura estratégica da revisão v1.1

A referência competitiva passa a ter **quatro camadas**:

1. Plataformas globais/full-suite;
2. Ecossistemas brasileiros de dados, identidade e fraude;
3. Especialistas por capability;
4. Inteligência proprietária Mutual.

O HFS é o principal elemento da quarta camada e deve ser tratado como **moat tecnológico**, não como substituto de KYC/KYB nem como vendor.

A consequência arquitetural é objetiva: toda informação externa continua entrando como **evidência normalizada**; o HFS recebe dados canônicos autorizados e devolve sinais/alertas proprietários também normalizados. Regras de onboarding podem consumir esses sinais quando aplicável, mas **o núcleo nunca conhece metodologia, fórmula, feature ou limiar proprietários**.

## 1.5 Paridade competitiva obrigatória (CAP-01..CAP-22)

| ID | Capability alvo | Prioridade | Rotas/candidatos |
|---|---|---|---|
| CAP-01 | Identidade cadastral/biográfica | Obrigatória | SERPRO/RFB + Serasa/idwall + Assertiva/Exato + Unico/global quando aplicável |
| CAP-02 | Documento: captura, OCR, MRZ/QR, autenticidade e validade | Obrigatória | Serasa/idwall + Unico + DataRudder + ComplyCube/Sumsub/Legitimuz/T-Shield; Datavalid quando aplicável |
| CAP-03 | Biometria, face match, liveness e resistência a spoof/deepfake | Obrigatória | Unico + Serasa/idwall + Gryfo/Legitimuz/T-Shield/ComplyCube/Sumsub/Datavalid |
| CAP-04 | Device/session intelligence e sinais antifraude | Obrigatória | Serasa AllowMe/idwall + Unico + DataRudder + Legitimuz/Sumsub/ComplyCube/T-Shield + sinais internos |
| CAP-05 | Telefone, e-mail, endereço, geolocalização e proof of address | Obrigatória | Serasa/idwall + DataRudder + providers configuráveis + fonte oficial/terceiro conforme jurisdição |
| CAP-06 | KYB empresa: registro, situação, QSA e dados oficiais | Obrigatória | RFB/SERPRO + Serasa/idwall + Exato/Assertiva + global |
| CAP-07 | Grafo societário, UBOs, representantes e rede de terceiros | Obrigatória | Domínio Mutual + consultas oficiais/providers |
| CAP-08 | Sanções, PEP e watchlists | Obrigatória | Provider global dedicado + idwall/LSEG + ComplyCube/Sumsub + bases oficiais/tenant quando aplicável |
| CAP-09 | Mídia adversa e listas customizadas | Obrigatória | Provider global dedicado + idwall/LSEG quando contratado + listas internas por cliente |
| CAP-10 | Judicial, criminal e mandados | Obrigatória Brasil | Judit + políticas de relevância e revisão humana |
| CAP-11 | Regularidade fiscal e certidões | Obrigatória Brasil | Revizia + SERPRO/RFB/órgãos oficiais quando contratáveis |
| CAP-12 | Crédito/capacidade econômica/origem de recursos e patrimônio | Condicional por produto | Serasa Experian + Assertiva/Exato + Open Finance/SCR somente quando elegível e autorizado |
| CAP-13 | Licenças e autorizações de entidade regulada | Obrigatória para reguladas | BCB dados abertos + CVM e demais catálogos oficiais |
| CAP-14 | Termos, declarações, assinatura e prova de aceite | Obrigatória | Módulo Mutual + assinatura externa configurável, inclusive Assertiva se contratada |
| CAP-15 | Requirements/Flow/Policy builder versionado e simulável | Obrigatória | Core Mutual; benchmark ComplyCube/Sumsub/idwall/DataRudder |
| CAP-16 | Case management, investigação, EDD, atribuição e checklist | Obrigatória | Core Mutual; benchmark Sumsub/ComplyCube/idwall; HFS enriquece investigação quando aplicável |
| CAP-17 | Revalidação, documento vencido, rescreening e monitoramento contínuo | Obrigatória | Core Mutual + Unico revalidation + idwall monitoring + webhooks/tracking; HFS/DataRudder por handoff pós-onboarding |
| CAP-18 | API pública, webhooks, SDK, hosted flow, sandbox e logs | Obrigatória | Developer Platform Mutual |
| CAP-19 | Multi-tenant, white-label, idioma, domínio e região | Obrigatória | Core Mutual / lib-ui / configuração |
| CAP-20 | Evidência, audit trail, lineage, retenção, privacidade e revisão humana | Obrigatória | Core Mutual / segurança / LGPD |
| CAP-21 | Analytics: conversão, drop-off, latência, custo, saúde de provider e qualidade | Obrigatória | Cockpit Mutual + métricas de providers + eficácia HFS/modelos internos |
| CAP-22 | Inteligência relacional proprietária Mutual (Hyperbolic Financial / Mutual Intelligence) | Obrigatória no ecossistema; acionamento condicional no Onboarding | Serviço interno Mutual: risk intelligence relacional, alertas/cases e sinais explicáveis via contrato interno; integração downstream com KYT/KYW/AML contínuo sem expor metodologia proprietária |

> **Regra de propriedade:** CAP-22 não entra em procurement nem em fallback para provider externo. É capability interna; o fallback é modo degradado governado ou sinal externo equivalente, nunca transferência da metodologia proprietária.

> **Fronteira de escopo:** Transaction Monitoring/KYT, Travel Rule, pagamentos, Pix/MED e execução financeira podem ser benchmarks adjacentes de Sumsub/outros, mas **não entram no core do Onboarding**. O produto deve apenas expor handoffs e eventos versionados para essas verticais.

## 1.6 Fontes oficiais e canais condicionados

| Fonte | Uso recomendado | Regra de arquitetura |
|---|---|---|
| SERPRO Datavalid V5 | Biografia + face/liveness + digitais + QR CNH conforme contratação. | Adapter versionado; evidência oficial; controlar finalidade, custo e consentimentos aplicáveis. |
| SERPRO/RFB Consulta CPF v3 | Situação/cadastro CPF quando contratável. | Construir já na versão atual; versões anteriores têm descontinuação anunciada. |
| RFB/Consulta CNPJ e QSA | Cadastro oficial, situação, QSA e prefill/confirm. | CNPJ alfanumérico end-to-end; não aceitar prefill sem confirmação/evidência. |
| BCB dados abertos — entidades autorizadas | Situação/licença de entidade supervisionada. | Fonte oficial pública; versionar snapshot/evidência e data de consulta. |
| SCR | Capacidade de crédito em cenário elegível. | Consulta depende de autorização específica; capability condicional, não default. |
| CCS | Relacionamentos no SFN para agentes habilitados. | Não é base genérica e não contém saldo/movimentação; acesso restrito. |
| Open Finance | Dados cadastrais/financeiros quando cliente/instituição participam. | Consentimento explícito + elegibilidade; API padronizada; não compartilhar credenciais. |

---

# BLOCO 2 — Checklist completo das 30 Habilidades Macro

A tabela abaixo cobre obrigatoriamente as 30 habilidades. **"Não se aplica" não significa ignorar**: significa preservar a fronteira e o handoff correto, evitando contaminar o Onboarding com ledger, Pix, liquidação ou produtos financeiros que pertencem a outros domínios.

| # | Habilidade | Diagnóstico | Lacuna / risco | Recomendação | Interdep. |
|---|---|---|---|---|---|
| 1 | Core Financeiro, Ledger e Partidas Dobradas | Não se aplica ao núcleo | Ledger financeiro fica fora. Onboarding exige case/evidence IDs e usage/cost ledger auditável. | Separar custo do serviço do ledger financeiro; handoff só após aprovação. | 15, 17, 26 |
| 2 | Multimoedas, Multiativos, Câmbio e Precisão Financeira | Não se aplica ao núcleo | Somente custos de provider em múltiplas moedas podem existir. | Normalizar moeda do custo sem misturar somas; ativos e câmbio ficam downstream. | 12, 15, 29 |
| 3 | Multicontas, Subcontas e Tipos de Conta | Não se aplica ao núcleo | Onboarding não mantém conta financeira. | Preservar customer/account handoff por IDs, sem replicar estrutura financeira. | 26, 27 |
| 4 | Product Catalog, Produtos Financeiros, White Label e SaaS | Presente / parcial | Product builder e white-label já são decisões; catálogo precisa fechar embalagem comercial. | Formalizar produtos de verificação, features, região, plano e limites por cliente. | 5, 18, 19, 30 |
| 5 | Configuration Engine, Regras e Parametrização | Presente / forte | Requirements/Flow/Policy separados e versionados; precisa homologação completa. | Fechar schemas, maker-checker, simulação, limites e replay determinístico. | 4, 8, 16, 24 |
| 6 | Multiprovider e Provider Adapter Layer | Presente / reforçado | Serasa+idwall são grupo correlacionado; HFS é interno, não provider. Redundância econômica não pode ser simulada por duas marcas do mesmo grupo. | Mapear owner/economic_group em provider registry; separar ExternalProviderAdapter de InternalCapabilityAdapter; RFP inclui Unico/DataRudder/Serasa/idwall. | 8, 13, 23, 25, 26 |
| 7 | Multiliquidez, Reservas e Rebalanceamento | Não se aplica | Não há liquidez financeira no Onboarding. | Não importar lógica de tesouraria para este repositório. | 26 |
| 8 | Product Routing Engine, Rotas, Fallback e Decisão Auditável | Presente / parcial | Routing precisa distinguir fontes oficiais, providers externos e capability HFS interna; fallback correlacionado Serasa/idwall é inválido. | Roteamento por capability, grupo econômico, região, custo, qualidade e contrato; HFS entra por rota interna versionada e auditável. | 6, 13, 15, 20, 23 |
| 9 | Pix, DICT, SPI, MED, Refund, Webhooks e Banking Product Suite | Não se aplica ao núcleo | Pix/MED são pós-onboarding. | Apenas handoff de identidade/cliente e, se necessário, evidência de participação regulatória. | 16, 26, 27 |
| 10 | OTC, Câmbio Cripto, Liquidação On-chain e Exchange Futura | Não se aplica ao núcleo | Travel Rule/KYT podem ser adjacentes, mas não entram no Onboarding v1. | Modelar extensibilidade sem acoplar transação/cripto ao case lifecycle. | 16, 29, 30 |
| 11 | Split, Taxas, Comissões, Revenue Share, Marketplace e Remuneração | Não se aplica ao núcleo | Não há split transacional. | Revenue share de parceiros, se houver, fica em billing/comercial fora do core de verificação. | 12, 19, 28 |
| 12 | Billing, Pricing, Monetização, Margem e Rentabilidade | Parcial | Custo por provider já é requisito; HFS tem economics próprios e não deve ser precificado como repasse de consulta externa. | Separar COGS de provider, custo computacional HFS, margem SaaS e preço por pacote/capability; medir custo por case e por monitorado. | 11, 17, 18, 19 |
| 13 | Processamento, Idempotência, Reprocessamento e Resiliência Transacional | Presente / parcial | Jobs/webhooks/reexecução são centrais; falta prova E2E multiprovider. | Idempotency keys, retries, replay seguro, DLQ, webhook signatures e chaos tests. | 6, 8, 15, 25 |
| 14 | Raspagem, RPA, Coleta Externa e Evidência Operacional | Parcial / governado | Judit substitui scrapers tribunal a tribunal; fontes oficiais devem ser preferidas. | Proibir scraping frágil para fonte regulada quando API/contrato existe; preservar captura, data e lineage. | 15, 16, 23, 24 |
| 15 | Reconciliação, Exceções, Gaps, Auditoria Operacional e Evidências | Presente / parcial | Novas rotas ampliam divergências; sinais HFS são evidência analítica e não substituem fatos oficiais/cadastrais. | B18 reconcilia fontes; EvidenceEnvelope preserva origem; HFS gera evidence class própria com versão do modelo e rationale disponível. | 6, 8, 16, 24, 25 |
| 16 | Regulatório, Jurídico, Compliance, PLD/FTP, KYC, KYB, AML e LGPD | Presente / central | Serasa/idwall/Unico ampliam identidade; DataRudder e HFS ampliam fraude/PLD, mas parte transacional fica fora do core Onboarding. | Aplicar purpose limitation, human review, EDD e boundaries. Sinais transacionais entram como eventos de reavaliação/case, não como campos do cadastro. | 5, 15, 22, 24, 25 |
| 17 | Financeiro, Contábil, Fiscal, Tributário, NFS-e e FP&A | Parcial / suporte | Fiscal entra como due diligence de contraparte e a própria Mutual precisa contabilizar custos/receita SaaS. | Integrar certidões/regularidade; separar análise fiscal de obrigação contábil do produto. | 11, 12, 16, 18 |
| 18 | Governança Empresarial, Indicadores, Cockpit Executivo e BI | Parcial | KPIs e dashboards existem no desenho, falta definição e lineage de métricas. | North-star por aprovação legítima + conversão + risco; métricas operacionais, custo, qualidade e incidentes. | 12, 21, 22, 24 |
| 19 | Comercial, Revenue Operations, Cultura de Entrega, Parceiros, Afiliados e Incentivos | Parcial | Produto é SaaS/API/SDK para compliance, dev e uso interno; packaging falta fechar. | Definir ICP, planos, POC, RFP kit, partner strategy e handoff comercial→provisionamento. | 4, 12, 20, 21, 23 |
| 20 | Marketing, Branding, Posicionamento, Reputação, Growth e Canais | Parcial | Posicionamento interno está claro: profundidade Brasil + cobertura global orquestrada. | Prova de diferenciação, segurança, benchmark, conteúdo técnico e white-label consistente. | 19, 21, 22 |
| 21 | Experiência do Cliente, Suporte, Atendimento, UX/UI, CS, Marketplace e Developer Experience | Parcial / crítico | Quatro superfícies desenhadas; API/SDK/sandbox e acessibilidade ainda precisam completar. | 80-screen registry, mobile-first, developer portal, hosted flows, accessibility, support/runbook. | 4, 13, 18, 25 |
| 22 | Riscos Corporativos, Controles Internos, Auditoria Interna e Continuidade | Presente / crítico | Concentração Serasa+idwall, model risk HFS, dependência de redes biométricas e escopo misto DataRudder elevam risco de continuidade/conduta. | BIA por capability; outage correlacionado por grupo; kill switch; shadow mode para modelos; plano de degradação HFS e providers críticos. | 6, 8, 23, 24, 25 |
| 23 | Fornecedores, Procurement, Third-Party Risk, Providers Globais e Gestão Patrimonial | Parcial / bloqueador de contratação | Serasa/idwall pertencem ao mesmo grupo; Unico/DataRudder entram na RFP; HFS sai do third-party risk por ser ativo proprietário. | Provider registry com economic_group, DPA, suboperadores, SLA, region, exit e concentração. HFS passa para governança interna/model risk. | 6, 12, 22, 25 |
| 24 | Dados, BI, Governança de Dados, IA, Automação e Agentes | Presente / crítico | HFS adiciona modelo proprietário e sinais relacionais; vendors também retornam scores proprietários. Sem lineage/model governance há caixa-preta composta. | Inventário de modelos internos/externos; HFS com owner, versão, validador, métricas, drift, override e confidencialidade; outputs externos sempre rotulados por origem. | 15, 16, 22, 25 |
| 25 | Segurança, Observabilidade, Testes, Documentação, Conhecimento, Ética e Cultura Institucional | Presente / parcial | Mais vendors ampliam superfície e HFS torna-se ativo crítico. Integração não pode vazar PII nem metodologia proprietária. | Threat model por adapter; secrets/KMS; DLP; contract tests; pentest; observabilidade por capability; acesso HFS need-to-know e metodologia fora de logs/APIs públicas. | 6, 13, 22, 23, 24 |
| 26 | Refinamento — Arquitetura de Ecossistema de Produtos Mutual | Presente / forte | Onboarding precisa consumir HFS sem absorver KYT/ledger; DataRudder possui módulos transacionais que podem induzir scope creep. | Definir eventos: `onboarding.approved/reopened`, `risk.signal.received`, `hfs.alert.created`, `compliance.case.updated`; manter domínios soberanos e IDs canônicos. | 4, 6, 16, 27, 29, 30 |
| 27 | Refinamento — Banking Product Suite, TED, Boleto, Link de Pagamento e CCB | Não se aplica ao núcleo | Produtos financeiros são consumidores downstream do resultado de onboarding. | Handoff mínimo: case_id, subject/customer correlation, status, evidência autorizada e versionamento. | 3, 9, 26 |
| 28 | Refinamento — Marketplace, Afiliados e Produtos Digitais | Não se aplica agora | Pode surgir como canal/tenant futuro, não como requisito de core. | Manter modelo modular e canal como configuração; não construir marketplace no Onboarding. | 4, 19, 30 |
| 29 | Refinamento — Cross-border, LATAM, Global Payments e Crypto Banking | Parcial por arquitetura | Jurisdição já é dado; ativação internacional não é simultânea. | Adapters globais, residência, tradução, documentos/eIDs, AML e parecer local por mercado. | 2, 6, 16, 23, 30 |
| 30 | Refinamento — Escalabilidade de Portfólio, Novos Produtos e Composição Modular | Presente / forte | Capability catalog cresce com HFS e novos providers; risco de produtos duplicados por marca. | Produto de verificação seleciona capabilities, não vendors. HFS é peça proprietária opcional/condicional por product policy, nunca hardcoded na UI. | 4, 5, 6, 19, 26 |

---

# BLOCO 3 — Estado desejado e plano de implementação

## 3.1 Arquitetura-alvo

Onboarding permanece **produto e repositório independentes** do `backoffice-corporativo`. Integrações com Terminal Global, Backoffice e produtos financeiros devem acontecer por contratos versionados, IDs correlacionáveis e eventos/APIs; nenhum sistema externo se torna fonte de verdade do case lifecycle.

| Camada | Responsabilidade | Regra |
|---|---|---|
| Experiências | Jornada, Painel, Admin e Console interno | Quatro projeções do mesmo case/evidence; sem dados próprios por UI. |
| Public Integration | API pública, SDKs, hosted flow, webhooks | Versionada, idempotente, autenticada, observável e agnóstica de provider. |
| Application/Use Cases | Case lifecycle, assignment, decision, dispute, revalidation | Server-authoritative; regras críticas não residem no front. |
| Domain | Subject, identifiers, relations, evidence, requirements, policies, risk | Jurisdição como dado; provider nunca aparece no domínio. |
| Orchestrator | Capability routing, fallback, budget, region, provider adapters | Regra pede capacidade; orquestrador escolhe rota. |
| Mutual Intelligence / HFS | Capability proprietária de inteligência relacional, sinais de risco e investigação | Recebe IDs/dados canônicos autorizados e devolve alertas/evidências versionados; metodologia permanece segregada e não aparece no domínio, UI pública ou contratos de provider. |
| Data | PostgreSQL, RLS/FORCE, audit, object/evidence references | Isolamento imposto no banco; PII cifrada; crypto-shredding quando aplicável. |
| Workers/Integration | Jobs, webhooks, rescreening, monitoring, exports | Retries, DLQ, idempotency, signatures e reconciliation. |
| Observability/Security | Traces, metrics, logs, secrets, incidents, access reviews | Sem PII em logs; provider/case/correlation IDs presentes em telemetria. |

## 3.2 Linguagem e stack recomendadas

| Decisão | Recomendação | Justificativa |
|---|---|---|
| Linguagem principal | TypeScript strict end-to-end | É a linguagem do domínio, motor, apps, workers e testes atuais; reescrever criaria risco sem benefício comprovado. |
| Runtime | Node.js (linha atual do repositório) | Mantém toolchain e contratos compartilhados; workers podem permanecer Node/TS. |
| Front-end | React/Next.js + lib-ui | Aderente ao design system já decidido; mobile-first na jornada. |
| Persistência | PostgreSQL + SQL/Drizzle conforme baseline | RLS/FORCE e constraints de SoD pertencem à camada de dados. |
| API pública | REST/JSON + OpenAPI + webhooks assinados | Contrato externo estável e gerador de SDK; RPC tipado pode permanecer interno. |
| SDKs | TypeScript/Web primeiro; wrappers nativos quando houver demanda | Benchmark global exige low-code/SDK/hosted; não inventar matriz nativa sem caso de uso. |
| Python/Go | Somente por necessidade comprovada | Não introduzir segunda linguagem para adapters simples; usar se ML/data/worker exigir e o ganho for demonstrado. |

## 3.3 Catálogo canônico proposto de telas — 80 IDs funcionais

Este registry **preserva os IDs existentes** e adiciona somente lacunas. "Tela funcional" não é sinônimo de URL: A4, por exemplo, é um shell dinâmico que pode renderizar vários passos configurados. Para homologação, cada ID precisa de estados, permissões, dados, acceptance criteria e testes — mesmo quando duas funções compartilham a mesma rota.

### Superfície A — Jornada de verificação (20)

| ID | Tela | Escopo de homologação | Classe |
|---|---|---|---|
| A1 | Entrada / convite | Marca do cliente, retomada segura, sessão e início. | Obrigatória |
| A2 | Identificação da natureza | Espécie e habilitações que determinam requisitos. | Obrigatória |
| A3 | Jurisdição | País/região que parametriza regras e coleta. | Obrigatória |
| A4 | Etapas dinâmicas | Coleta derivada de requisito/fluxo; smart forms e perguntas condicionais. | Obrigatória |
| A5 | Prova de vida | Liveness/face, fallback e evidência sem retenção excessiva. | Obrigatória |
| A6 | Captura de documento | Frente/verso/passaporte, OCR, autenticidade, validade e reenvio. | Obrigatória |
| A7 | Endereço | Autopreenchimento, confirmação e prova quando exigida. | Obrigatória |
| A8 | Quadro societário | Grafo recursivo, participação direta/indireta e ponto de parada. | Obrigatória |
| A9 | Pessoas-chave | Representantes, diretores, UBOs e verificações individuais. | Obrigatória |
| A10 | Rede de terceiros | Correspondentes, assessores, subcredenciados e vínculos. | Obrigatória |
| A11 | Documentos societários | Contrato social, atos, procurações e outros requisitos. | Obrigatória |
| A12 | Termos e assinatura | Aceites versionados, bases/finalidades e prova de aceite. | Obrigatória |
| A13 | Revisão e envio | Resumo, pendências e dependências de terceiros. | Obrigatória |
| A14 | Acompanhamento | Status, pendências, reabertura e próxima ação. | Obrigatória |
| A15 | Convite a pessoa-chave | Envio individual seguro e rastreável. | Obrigatória |
| A16 | Jornada individual delegada | Fluxo curto do convidado sem exposição do cadastro da empresa. | Obrigatória |
| A17 | Progresso do grupo | Quem concluiu, quem falta, reenvio/revogação. | Obrigatória |
| A18 | Contestação / revisão humana | Pedido de revisão de decisão automatizada ou resultado contestável. | Obrigatória |
| A19 | Recuperação e verificação assistida | Câmera/device incompatível, recusa de convidado, acessibilidade e rota assistida. | Obrigatória |
| A20 | Consentimentos e autorizações externas | Consentimentos específicos para fontes restritas/compartilhamentos quando o produto e a elegibilidade exigirem. | Condicional |

### Superfície B — Painel de análise (22)

| ID | Tela | Escopo de homologação | Classe |
|---|---|---|---|
| B1 | Fila de casos | Filtro, prioridade, prazo, atribuição, carga e reabertos. | Obrigatória |
| B2 | Caso — visão geral | Risco por eixo, recomendação explicada, pendências e ações. | Obrigatória |
| B3 | Caso — evidências | Proveniência, classe, validade, custo, provider e histórico. | Obrigatória |
| B4 | Caso — grafo societário | Cadeia e UBOs com percentuais e ponto de parada. | Obrigatória |
| B5 | Caso — pessoas-chave | Verificações, listas, documentos e risco por sujeito. | Obrigatória |
| B6 | Caso — rede de terceiros | Recorte operacional da rede e risco agregado por vínculo. | Obrigatória |
| B7 | Caso — documentos | Visualizador, metadata, versão, validade, integridade e origem. | Obrigatória |
| B8 | Caso — AML e desambiguação | Hits, comparação, confirmação/descarte, motivo e memória. | Obrigatória |
| B9 | Caso — judicial/criminal | Processos, BNMP, partes, classe, relevância e acompanhamento. | Obrigatória |
| B10 | Caso — fiscal/certidões | CNDs, situação fiscal, vencimento e divergências. | Obrigatória |
| B11 | Caso — trilha e acessos | Eventos, autores, leituras privilegiadas e origem. | Obrigatória |
| B12 | Caso — decisão e alçada | Aprovar/recusar/complementar/escalar, motivo e SoD. | Obrigatória |
| B13 | Pendências e complementos | Pedido, justificativa, prazo e comunicação ao titular. | Obrigatória |
| B14 | Reavaliação / recadastramento | Reabertura por validade, mudança ou requisito. | Obrigatória |
| B15 | Alertas de monitoramento | Fato novo, impacto, prioridade e ação de revisão. | Obrigatória |
| B16 | Dossiê / exportação | Pacote auditável com política, evidências e proveniência. | Obrigatória |
| B17 | Fila de contestações | Revisão humana, prioridade, histórico e resultado. | Obrigatória |
| B18 | Reconciliação entre fontes | Divergências RFB/Serpro/providers, regra de precedência e exceção. | Obrigatória |
| B19 | Fraude / device / sessão | Comparar sinais Serasa/idwall/Unico/DataRudder/Legitimuz e comportamento de sessão; separar score de provider de decisão Mutual. | Obrigatória |
| B20 | Capacidade econômica e origem de recursos | Dados e evidências somente quando exigidos e legalmente disponíveis. | Obrigatória |
| B21 | Autorizações e licenças regulatórias | BCB/CVM/outros: situação, ato, vigência e evidência oficial. | Obrigatória |
| B22 | Workspace de investigação + inteligência relacional | Timeline, evidências, relações e grafo HFS quando aplicável; criação/ligação de case sem expor metodologia proprietária. | Obrigatória |

### Superfície C — Administração e Developer Platform (24)

| ID | Tela | Escopo de homologação | Classe |
|---|---|---|---|
| C1 | Dashboard operacional | Volume, conversão, aging, aprovação, reabertura e alertas. | Obrigatória |
| C2 | Requisitos | Famílias, versões, jurisdição, natureza e nível. | Obrigatória |
| C3 | Editor de requisito | Evidências exigidas, validade, piso e publicação. | Obrigatória |
| C4 | Fluxos | Catálogo de jornadas e versões. | Obrigatória |
| C5 | Editor de fluxo | Ordem, agrupamento, textos, condições de interface e preview. | Obrigatória |
| C6 | Políticas | Catálogo, status, versões e vigência. | Obrigatória |
| C7 | Editor de política | Regras limitadas, explicáveis, sem chamada direta a provider. | Obrigatória |
| C8 | Simulação | Replay histórico e impacto antes de publicar. | Obrigatória |
| C9 | Publicação e versionamento | Maker-checker, aprovação, ativação e rollback governado. | Obrigatória |
| C10 | Providers e roteamento | Configurar providers externos por capability, grupo econômico, região e fallback; HFS aparece como capability interna, não como fornecedor contratável. | Obrigatória |
| C11 | Custos, uso e margem | Consumo por capability/provider/cliente e rentabilidade. | Obrigatória |
| C12 | Marca, tema e idioma | White-label, tokens, textos, linguagem e acessibilidade. | Obrigatória |
| C13 | Domínio, e-mail e canais | Domínio, remetentes, SMS/e-mail e templates base. | Obrigatória |
| C14 | Usuários e papéis | Papéis como conjunto, convite, desativação e MFA quando adotado. | Obrigatória |
| C15 | Alçadas e segregação | Quem cria, revisa, publica e decide. | Obrigatória |
| C16 | API keys e webhooks | Credenciais, secrets rotacionáveis, endpoints e assinaturas. | Obrigatória |
| C17 | Auditoria de configuração | Mudanças de regra, fluxo, provider, papel e publicação. | Obrigatória |
| C18 | Proteção de dados | Finalidade, retenção, residência, direitos e acesso privilegiado. | Obrigatória |
| C19 | Produtos de verificação | Montagens nomeadas por caso de uso e mercado. | Obrigatória |
| C20 | Editor de produto | Requisitos + fluxo + política + capacidades + automação permitida. | Obrigatória |
| C21 | Simulação / conflitos de produto | Simular cobertura, custo, provider group concentration e acionamento de HFS por política, sem chamadas externas na simulação histórica. | Obrigatória |
| C22 | Developer / Sandbox / SDK / Hosted | Quickstart, credenciais de teste, SDKs, hosted flow e exemplos. | Obrigatória |
| C23 | Logs de API e webhooks | Entrega, assinatura, retries, replay, idempotência e debugging. | Obrigatória |
| C24 | Notificações e localização | Templates, idiomas, variáveis, canais, consentimento e fallback. | Obrigatória |

### Superfície D — Console interno Mutual (14)

| ID | Tela | Escopo de homologação | Classe |
|---|---|---|---|
| D1 | Clientes / tenants | Inventário, status, plano, região e responsáveis. | Obrigatória |
| D2 | Saúde dos providers | Latência, erro, degradação, incidentes e fallback. | Obrigatória |
| D3 | Margem e custos | Custo real por cliente/capability/provider e alertas. | Obrigatória |
| D4 | Interruptor de emergência | Kill switch global/cliente/política/capability sem deploy. | Obrigatória |
| D5 | Governança de modelos | Inventário, versão, explicabilidade, drift e validação independente de modelos HFS e scores externos. | Obrigatória |
| D6 | Catálogo de capacidades | Capabilities internas/externas, status, provider groups, cobertura, versões; CAP-22 HFS destacada como proprietária. | Obrigatória |
| D7 | Suporte a caso | Acesso justificado, JIT, escopo mínimo e registro. | Obrigatória |
| D8 | Trilha de acessos Mutual | Quem acessou dado de cliente, motivo e sessão. | Obrigatória |
| D9 | Provisionamento, região e features | Criação do cliente, data region, feature flags e limites. | Obrigatória |
| D10 | Fornecedores e third-party risk | Contratos, DPA, subprocessadores, certificados, SLA, exit e renovação. | Obrigatória |
| D11 | Jurisdições e baseline normativo | Catálogo de mercados, fontes, requisitos mínimos e status de ativação. | Obrigatória |
| D12 | Segurança, privacidade e incidentes | DSAR, retenção, chaves, incidentes e controles operacionais. | Obrigatória |
| D13 | Saúde da plataforma / jobs / intelligence | Filas, webhooks, jobs, rescreening e saúde HFS/Mutual Intelligence com correlação de incidentes. | Obrigatória |
| D14 | Cockpit de homologação e release | Gates, evidências, testes, exceções, UAT e decisão de release. | Obrigatória |

## 3.4 Estratégia de integração multiprovider

1. **Definir capability contract antes do adapter.** Ex.: `identity.biographic`, `document.verify`, `biometric.liveness`, `aml.screening`, `company.registry`, `judicial.search`, `fiscal.certificates`.
2. **Normalizar qualquer resposta externa para EvidenceEnvelope:** `provider_run_id`, `capability`, `subject/case`, `assertion`, `confidence/class`, `observed_at`, `valid_until`, `source/provenance`, `schema_version`, `cost`, `raw_reference` e `privacy classification`.
3. **Cada adapter implementa o mesmo test kit:** success, inconclusive, timeout, 4xx/5xx, malformed payload, retry, idempotency, webhook replay, signature invalid, rate limit e provider degradation.
4. **Routing Engine escolhe rota** por cliente, região, jurisdição, custo, qualidade, contrato, disponibilidade, capability e grupo econômico. Serasa/idwall são correlacionadas; HFS é rota interna e não provider. Regra de negócio nunca chama marca específica.
5. **Para capacidades críticas, homologar fallback real ou degraded mode seguro.** "Fallback" não pode significar aprovar sem evidência.
6. **Reconciliação B18** compara resultados conflitantes e aplica precedência/exception policy. Fonte oficial pode ter precedência para fatos cadastrais; score de provider e sinal HFS permanecem evidências distintas, versionadas e nunca apagam divergência sem trilha.
7. **Todo custo fica ligado ao provider run e à evidence** para permitir billing, margem e otimização.

## 3.5 Quick wins imediatos

- Canonicalizar docs x código: autenticação, 9ª natureza, contagem de telas e maturidade por capability.
- Criar `SCREEN_REGISTRY` v2 com os 80 IDs, owners por papel, routes/views, estados e acceptance criteria.
- Auditar CNPJ alfanumérico em todo o repositório, adapters e fixtures; o core string já reduz o risco, mas não encerra o tema.
- Gerar RFP/RFI único para todos os providers com mesma matriz de preço/SLA/DPA/subprocessadores/certificações/regiões/API/SDK/webhook/exit.
- Fechar ADRs de provider contract, evidence envelope, routing/fallback, public API, auth/SoD, data retention/residency e official-source eligibility.
- Criar capability contract test kit compartilhado antes de integrar novos fornecedores.
- Registrar `economic_group` no Provider Registry e reclassificar idwall como pertencente ao ecossistema Serasa Experian para fins de concentração, fallback e procurement.
- Formalizar HFS/Mutual Intelligence como Internal Capability CAP-22: contrato de entrada/saída, IDs canônicos, EvidenceEnvelope, governança de modelo, observabilidade e integração com B22/D5/D13.
- Provar CI do HEAD atual em ambiente controlado e guardar evidência; não aceitar texto de commit como PASS.

## 3.6 Waves e gates de execução

| Wave | Objetivo | Entregas principais | Gate |
|---|---|---|---|
| W0 | Canonicalização e decisão de produto | Docs x código reconciliados; registry de telas; capability matrix CAP-01..CAP-22; HFS ownership/internal contract; provider groups; RFP pack; ADRs abertos. | Gate G0: baseline aceito. |
| W1 | Compatibilidade e fundações P0 | CNPJ alfanumérico; auth/SoD; state machine; PII; IDs; RLS; audit; provider contract. | G1: fundação segura. |
| W2 | Case lifecycle e jornada base | Case, subjects, evidence, docs, UBO/grafo, delegated journey, pendências e tracking. | G2: jornada E2E sem provider real. |
| W3 | Identidade, documento e antifraude | Adapters IDV/liveness/document/device; SERPRO + Serasa/idwall + Unico + DataRudder + rotas especializadas; retries, fallback e group concentration. | G3: IDV real homologável. |
| W4 | KYB e fontes oficiais Brasil | RFB/SERPRO, QSA, cadastro, BCB entidades autorizadas, reconciliação. | G4: KYB Brasil completo. |
| W5 | AML, EDD e intelligence proprietária | Screening global, PEP/sanções/mídia; EDD; CAP-22 HFS como sinal relacional interno quando houver base autorizada; human review. | G5: AML/EDD explicável + HFS governado. |
| W6 | Due diligence Brasil | Judit, Revizia, fiscal/judicial, capacidade econômica quando aplicável, licenças. | G6: profundidade Brasil. |
| W7 | Admin, products e developer platform | Requirements/Flow/Policy, products, API/SDK/hosted, webhooks, sandbox, white-label. | G7: plataforma vendável. |
| W8 | Monitoramento contínuo e revalidação | Rescreening, vencimentos, Unico revalidation/rotas equivalentes, webhooks, HFS alerts e handoff com DataRudder/antifraude-PLD transacional sem fundir domínios. | G8: carteira viva monitorada. |
| W9 | Resiliência, segurança e performance | Chaos/provider outage incluindo falha correlacionada Serasa+idwall; segurança de modelo HFS; pentest, load, BCP, RTO/RPO e degraded modes. | G9: resiliência provada. |
| W10 | Homologação Mutual (cliente nº 1) | UAT PF/PJ/9 naturezas, cenários negativos, evidências, runbooks, release dossier. | G10: PASS / PASS com ressalvas. |
| W11 | Piloto controlado e release | Feature flags, limites, suporte, rollback, métricas e post-release verification. | G11: produção verificada. |

> **Sem datas artificiais**
> O plano é dependency-driven. Datas e capacidade por sprint devem ser estimadas após Wave 0, quando backlog, owners, velocidade e contratos de provider estiverem comprovados. O gate não avança por calendário; avança por evidência.

## 3.7 Definition of Homologation

| ID | Critério vinculante |
|---|---|
| H-01 | Todas as 80 telas do registry possuem estado definido: implementada + testada ou waiver aprovado/feature flag documentado. |
| H-02 | Cada capability P0/P1 tem ao menos uma rota real; capacidades críticas têm fallback ou degraded mode explicitamente aprovado. |
| H-03 | Provider contract tests validam request/response, erros, rate limit, timeout, webhooks, signature, retry e idempotência. |
| H-04 | Isolamento cross-tenant é testado no banco e serviço, inclusive acesso indireto/IDOR/BOLA. |
| H-05 | PII/biometria: minimização, mascaramento, criptografia, retenção, crypto-shredding e logs sem dado sensível indevido. |
| H-06 | Políticas/requisitos/fluxos/produtos são versionados, simulados, maker-checker e reexecutáveis. |
| H-07 | AML/judicial: falso positivo, desambiguação, memória de descarte, revisão humana e proveniência passam em UAT. |
| H-08 | Monitoramento contínuo reabre casos de forma idempotente e produz alertas correlacionáveis. |
| H-09 | CNPJ alfanumérico passa em domínio, persistência, busca, UI, exports, adapters e fixtures. |
| H-10 | SCR/CCS/Open Finance, quando habilitados, passam por eligibility/consent gate e não funcionam como consulta genérica. |
| H-11 | CI do commit candidato produz evidência real de typecheck, lint, migrations, tests, builds e checks de segurança. |
| H-12 | Pentest e security review sem bloqueador crítico/alto não aceito; secrets e credenciais de demonstração isolados. |
| H-13 | Runbooks de incident, provider outage, data request, replay, rollback, kill switch e support estão executáveis. |
| H-14 | UAT Mutual cobre PF, PJ comum, MEI e 9ª natureza de correspondente, além das demais naturezas reguladas previstas. |
| H-15 | Dossiê de release guarda ADRs, schemas, versões, evidência de testes, exceções, owners e decisão do gate. |
| H-16 | CAP-22 HFS/Mutual Intelligence tem contrato interno versionado, IDs/correlation, lineage, governança de modelo, controle de acesso, observabilidade, degraded mode e evidência de integração sem exposição da metodologia proprietária. |
| H-17 | Provider Registry identifica grupo econômico e correlação operacional. Serasa/idwall não são aceitas como fallback independente; testes de continuidade cobrem falhas correlacionadas e exit plan. |

## 3.8 Matriz de riscos e mitigadores

| ID | Risco | Prob. | Impacto | Mitigador |
|---|---|---|---|---|
| R-01 | Documentação x código divergentes (auth, telas, maturidade) | Alta | Alto | Canonicalizar fontes; docs-as-code gate; evidência por commit/CI. |
| R-02 | CNPJ alfanumérico já em produção e adapters legados | Alta | Crítico | Auditar regex/DB/adapters/fixtures; identificador como string; suite de compatibilidade. |
| R-03 | Lock-in / concentração de AML, identidade ou antifraude em poucos grupos econômicos | Média | Alto | Provider global dedicado + rotas independentes; economic_group no registry; Serasa/idwall não contam como redundância entre si. |
| R-04 | Vazamento cross-tenant de PII/biometria/judicial | Média | Crítico | RLS/FORCE, authz server-side, negative tests, JIT e trilha de leitura. |
| R-05 | Normalização de provider perde nuance/proveniência | Média | Alto | Evidence envelope versionado, raw reference segregada, schema mapping e lineage. |
| R-06 | Uso indevido de SCR/CCS/Open Finance | Média | Crítico | Eligibility/consent gate; conectores separados; legal review por produto. |
| R-07 | Falso positivo AML/judicial e decisão opaca | Alta | Alto | Desambiguação, memória de descarte, explicabilidade e revisão humana. |
| R-08 | Provider outage/webhook perdido gera decisão incompleta | Média | Alto | Idempotência, retry/DLQ, reconciliation, circuit breaker e degraded mode. |
| R-09 | Biometria excessivamente retida | Média | Crítico | Edge-first, template irreversível quando possível, retention curta e crypto-shredding. |
| R-10 | Custos multiprovider inviabilizam margem | Média | Alto | Usage ledger, routing por custo/qualidade, budgets e procurement comparável. |
| R-11 | Jornada delegada sem entrega real de e-mail/SMS | Alta | Alto | Provider de comunicação, signed link, revogação, anti-enumeration e retry. |
| R-12 | B9 judicial sem modelo/integracao completa | Alta | Alto | Data model processual, Judit adapter, relevance policy e testes. |
| R-13 | 45 telas espelhadas confundidas com produto homologado | Alta | Alto | Screen registry 80 + acceptance/E2E por ID; prototype != evidence. |
| R-14 | Certificações/DPA/subprocessadores não verificados | Alta | Alto | Third-party due diligence, evidence room, renewal alerts e contractual controls. |
| R-15 | CI recente não comprovado por evidência de run | Média | Alto | Rerun CI em commit de release; guardar logs/build/test/security artifacts. |
| R-16 | Concentração correlacionada Serasa Experian + idwall (e demais ativos do grupo) | Alta | Alto | Mapear grupo econômico, contratos e dependências; limitar concentração por capability; fallback de grupo independente; teste de outage correlacionado. |
| R-17 | HFS proprietário virar caixa-preta ou acoplamento crítico sem governança | Média | Crítico | CAP-22 com interface interna estável, lineage, model registry, validação independente, shadow mode, kill switch, versionamento e confidentiality by design. |
| R-18 | Scope creep ao absorver antifraude/PLD transacional da DataRudder ou outros players para dentro do Onboarding | Alta | Alto | Manter KYT/Pix/Travel Rule/transacional como produtos adjacentes; integrar por eventos, risk signals e cases; nenhuma regra transacional no domínio Onboarding. |

## 3.9 Itens que bloqueiam escolha final de provider

- Preço unitário e por faixa de volume por capability, moeda, mínimo mensal e overage.
- SLA/SLO contratual, manutenção, suporte, créditos, RTO/RPO e histórico de incidentes.
- DPA, papéis LGPD/GDPR, países/regiões de processamento, subprocessadores e transfers.
- Certificações e relatórios de segurança/biometria com evidência verificável e validade.
- Documentação completa de API/SDK/webhooks, limites, versionamento, sunset e sandbox real.
- Regras de retenção e deleção, especialmente biometria e imagens de documento.
- Portabilidade/exit: exportação, deleção, prazo, formato, continuidade e dependências proprietárias.
- Qualidade real por população/cenário brasileiro: false reject/accept, fraude, deepfake, baixa luz e device coverage.
- Condições para uso white-label/multi-tenant e contrato do próprio cliente com provider quando BYOC for adotado.
- Mapa de titularidade e grupo econômico de cada marca/provider. A independência técnica só vale se houver independência contratual/operacional suficiente; Serasa/idwall é o primeiro caso explícito.
- **Para HFS, o gate não é procurement:** exige baseline técnico interno, governança de modelo, classificação de dados, owner/validador, contrato de serviço interno e evidência de resiliência/segurança.

## 3.10 Próximas decisões que proponho formalizar

| ID | Decisão proposta |
|---|---|
| P-ONB-001 | Aprovar a visão de produto: plataforma separada, multi-tenant/white-label, API/SDK/painel, Mutual cliente nº 1. |
| P-ONB-002 | Aprovar o registry v2 de 80 telas como baseline de homologação, preservando IDs existentes. |
| P-ONB-003 | Aprovar capability parity obrigatória (CAP-01 a CAP-22) e a fronteira que exclui KYT/Travel Rule/Pix do core. |
| P-ONB-004 | Aprovar TypeScript strict + PostgreSQL/RLS como stack-base, sem rewrite. |
| P-ONB-005 | Abrir RFP/RFI formal dos providers e fontes, sem escolher vencedor antes do gate de procurement. |
| P-ONB-006 | Priorizar CNPJ alfanumérico + docs/code convergence como bloqueios de Wave 0/W1. |
| P-ONB-007 | Exigir provider global dedicado de AML independente, além de rotas globais de plataformas concorrentes. |
| P-ONB-008 | Homologação somente após G0–G10 com dossiê de evidências; 45 telas de protótipo não equivalem a release. |
| P-ONB-009 | Registrar como CANONICAL que Hyperbolic Financial / Mutual Intelligence é ativo proprietário da Mutual e CAP-22 interna; referências anteriores a fornecedor externo ficam SUPERSEDED quanto à titularidade. |
| P-ONB-010 | Registrar `economic_group` obrigatório no Provider Registry e considerar Serasa Experian + idwall concentração correlacionada, vedando fallback fictício entre marcas do mesmo grupo. |
| P-ONB-011 | Incluir Serasa Experian, idwall, Unico e DataRudder na matriz formal de benchmark/RFP/contract tests, com integração por capability e fronteiras de escopo documentadas. |

---

# ANEXO A — Fontes de evidência e pesquisa

| ID | Fonte | Uso no relatório |
|---|---|---|
| INT-01 | GitHub Mutual — onboarding-corporativo | Repositório canônico, domínio, apps, dados, motor, CI e commits. |
| INT-02 | docs/plano/00-registro-de-decisoes.md | Decisões D-001+ sobre produto, multi-tenant, providers, risco, telas e governança. |
| INT-03 | docs/plano/01-posicionamento-e-escopo.md | Posicionamento, princípios, mercados e diferenciação Brasil. |
| INT-04 | docs/plano/03-fornecedores-e-capacidades.md | Mapa de providers/capacidades da pilha atual. |
| INT-05 | docs/plano/04-motor-de-regras-e-fluxo.md | Requirements/Flow/Policy, determinismo, simulação e governança. |
| INT-06 | docs/plano/05-triagem-aml-e-monitoramento.md | Screening, hit, desambiguação, memória e monitoramento contínuo. |
| INT-07 | docs/plano/07-telas.md | Catálogo de telas atual e estado declarado de implementação. |
| INT-08 | docs/plano/09-protecao-de-dados-e-seguranca.md | LGPD, região, biometria, acessos, chaves e revisão humana. |
| INT-09 | Hyperbolic Financial / Mutual Intelligence — análise interna e business model | Capacidade proprietária de inteligência relacional, integração por IDs/cases e posicionamento no ecossistema Mutual. Titularidade atual definida pelo dono do produto. |
| EXT-01 | ComplyCube official docs | Workflows, KYC/KYB/AML, portal, SDK/API/hosted e ongoing monitoring. |
| EXT-02 | Sumsub official docs | KYC/KYB, Workflow Builder, Case Management, Device Intelligence e ongoing AML. |
| EXT-03 | Assertiva API / site | Localize, Autentica, Análise 360, Dossiê, Assinaturas e API. |
| EXT-04 | Exato Digital API | Background PF/PJ, face compare, fiscal CNPJ, crédito e monitoring. |
| EXT-05 | Judit official docs | Judicial Brasil, BNMP, requests/lawsuits/tracking e webhooks. |
| EXT-06 | Revizia official site | Certidões, regularidade e monitoramento fiscal. |
| EXT-07 | Gryfo official site | Liveness, facematch, API e SDK offline/edge. |
| EXT-08 | Legitimuz official site | LegitCheck/Face/ID/Device/Doc e antifraude adaptativo. |
| EXT-09 | T-Shield official site | Safe Boarding, e-KYC, checks, OCR, liveness e validações. |
| EXT-10 | Serasa Experian — site e Developer Portal | KYC/KYB, antifraude, biometria, catálogo de APIs, crédito e aquisição da idwall em 01/07/2026. |
| EXT-11 | idwall — plataforma oficial | Identity/document/device, KYC/PLD-CFT, background/KYB, workflow, marketplace e integrações customizadas; marca agora integrante da Serasa Experian. |
| EXT-12 | Unico — IDCloud / Developer Portal | Identidade determinística, liveness, deepfake defense, fraud radar, document capture/reuse, sinais contextuais e revalidação. |
| EXT-13 | DataRudder — site / DeLorean / DataBusters | Onboarding antifraude, risk scoring/regras, transacional/Pix, PLD contínuo e compartilhamento de indícios/RC6. |
| OFF-01 | SERPRO / Datavalid V5 | Validação cadastral/biométrica, liveness, digitais e QR CNH em endpoint unificado. |
| OFF-02 | Receita Federal — CNPJ alfanumérico | Produção desde 27/07/2026 e primeiro CNPJ alfanumérico em 31/07/2026. |
| OFF-03 | Banco Central — dados abertos/SCR/CCS/Open Finance | Autorizadas, dados públicos e canais de acesso condicionado. |
| MKT-01 | MarketsandMarkets — Identity Verification Market | USD 14,34 bi (2025) para USD 29,32 bi (2030), CAGR 15,4%. |
| MKT-02 | MarketsandMarkets — Brazil Identity Verification | USD 483 mi (2025) para USD 901,7 mi (2030), CAGR 13,3%. |

## Fontes externas — links de referência

- ComplyCube Workflows: <https://docs.complycube.com/documentation/product-guides/compliance-studio/workflows>
- ComplyCube Product Guides: <https://docs.complycube.com/documentation/product-guides>
- Sumsub Docs: <https://docs.sumsub.com/>
- Assertiva API: <https://assertiva.com.br/plataforma/api/>
- Exato Digital API: <https://api.exato.digital/>
- Judit Docs: <https://docs.judit.io/introduction/introduction>
- Revizia Monitora: <https://revizia.com.br/revizia-monitora/>
- Gryfo API/SDK: <https://solucoes.gryfo.com.br/demonstracao_api>
- Legitimuz: <https://novo.legitimuz.com/>
- T-Shield: <https://www.tshield.com.br/>
- SERPRO Datavalid V5: <https://centraldeajuda.serpro.gov.br/duvidas/pt/avisos/datavalidsenatran/>
- Receita Federal — CNPJ Alfanumérico: <https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico>
- BCB — Entidades autorizadas: <https://dadosabertos.bcb.gov.br/dataset/dados-cadastrais-de-entidades-autorizadas>
- BCB — SCR: <https://www.bcb.gov.br/estabilidadefinanceira/scr/>
- BCB — CCS: <https://www.bcb.gov.br/meubc/cadastroclientes>
- BCB — Open Finance: <https://www.bcb.gov.br/meubc/faqs/s/open-finance>
- MarketsandMarkets — Identity Verification: <https://www.marketsandmarkets.com/Market-Reports/identity-verification-market-178660742.html>
- MarketsandMarkets — Brazil Identity Verification: <https://www.marketsandmarkets.com/Market-Reports/geography/identity-verification-market/brazil>
- Serasa Experian — Developer Portal / Cadastro KYC / aquisição idwall: <https://developer.serasaexperian.com.br/api> | <https://www.serasaexperian.com.br/solucoes/cadastro-kyc/> | <https://www.serasaexperian.com.br/sala-de-imprensa/prevencao-a-fraude/serasa-experian-reforca-lideranca-no-ecossistema-antifraude-com-aquisicao-da-idwall-e-avanca-em-identidade-digital/>
- Unico — IDCloud Platform e Developer Portal: <https://www.unico.io/pt/platform> | <https://developer.unico.io/>
- idwall — Plataforma / Marketplace / Integrações Customizadas: <https://idwall.co/pt-BR/plataforma/> | <https://idwall.co/pt-BR/marketplace> | <https://idwall.co/pt-BR/integracoes-customizadas/>
- DataRudder — plataforma, DeLorean Onboarding e DataBusters: <https://datarudder.com/> | <https://stg-lp.datarudder.com/delorean-antifraude/> | <https://datarudder.com/databusters/>
- Fonte interna proprietária — Hyperbolic Financial / Mutual Intelligence: `Mutual_Analise_Hyperbolic_Financial_System.docx`; `Mutual_+_Hyperbolic_Analise_e_Business_Model.pdf`. Titularidade atual: CANONICAL por decisão do dono do produto em 08/08/2026.

---

# ANEXO B — Gate de análise

- **Gate de dados:** `APTO_PARCIAL`. Escopo permitido: planejamento qualitativo de produto, mercado, concorrência, arquitetura, capacidades CAP-01..CAP-22, telas, riscos, waves e gates. Ownership do HFS é CANONICAL por decisão do dono do produto. Escopo bloqueado: ranking econômico final e contratação definitiva de providers externos sem evidências comerciais/contratuais.
- **Vetor de risco:** criticidade executiva ALTA. Drivers máximos: operacional/serviço; cibernético; dados/modelo; fornecedor/concentração; regulatório/contratual; PLD/fraude; reputacional/conduta.
- **QA estruturado da análise de risco:** APROVADO, sem findings críticos no envelope interno.

---

# ANEXO C — Conclusão executiva

A Mutual já tem uma fundação técnica que justifica **evolução, não reescrita**. A revisão v1.1 fortalece a tese competitiva: além de orquestrar o melhor de Serasa Experian/idwall, Unico, DataRudder e demais providers, a Mutual possui Hyperbolic Financial / Mutual Intelligence como inteligência relacional proprietária. O trabalho agora é transformar esse conjunto em produto homologável: canonicalizar ownership e contratos, integrar capabilities reais, consolidar o registry de 80 telas, provar isolamento/segurança, governar HFS e modelos externos, fechar Developer Platform/monitoring e executar UAT completo com a Mutual como primeiro cliente. Só depois desse dossiê o projeto deve avançar para release controlado.
