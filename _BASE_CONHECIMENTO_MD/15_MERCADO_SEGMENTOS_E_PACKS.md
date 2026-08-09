---
titulo: "Mercado, Segmentos, Packs e Jurisdições — Taxonomia Canônica e Mapa Completo de Mercado/ICPs"
fontes:
  - "ONB-MKT-001_SEGMENTOS_PACKS_E_JURISDICOES_v1.0"
  - "MUTUAL_ONBOARDING_MAPA_COMPLETO_MERCADO_E_ICPS_v1.0 (SRC-003)"
status_fonte: "ONB-MKT-001: CANONICAL SEGMENT/PACK TAXONOMY FRAMEWORK (GTM/market readiness separados) | MAPA COMPLETO: referência PROPOSED de descoberta de mercado (SRC-003), Confidencial — uso interno Mutual Capital"
gerado_em: 2026-08-09
---

# 15 — Mercado, Segmentos, Packs e Jurisdições

Este documento consolida a taxonomia canônica de segmentos/packs/jurisdições (ONB-MKT-001) e o mapa completo de mercado e ICPs (SRC-003 — MUTUAL_ONBOARDING_MAPA_COMPLETO_MERCADO_E_ICPS_v1.0).

**Hierarquia de autoridade:** a fonte SRC-003 permanece referência **PROPOSED** de descoberta de mercado; o ONB-MKT-001 e as abas SEGMENTS/PACKS do ONB-REG-001 governam a taxonomia vigente.

---

## Parte A — ONB-MKT-001: Segmentos, Packs e Jurisdições (CANONICAL)

- **Status:** CANONICAL SEGMENT/PACK TAXONOMY FRAMEWORK — GTM/market readiness separados
- **Versão:** 1.0

### A.1 Princípio

O produto deve atender múltiplos nichos financeiros **sem criar forks por setor**. A composição canônica é:

```
Core Global + Jurisdiction Pack + Regulatory Pack + Segment Pack + Tenant/Product Policy
```

### A.2 Segmentos prioritários mapeados

Bancos; cooperativas; crédito/financeiras/SCD/SEP; pagamentos/IPs/PSPs/wallets/adquirência; mercado de capitais; gestoras/administradores/wealth/family office; fundos e veículos; securitização/recebíveis; câmbio/cross-border; SPSAV/VASP/exchange/OTC/custody/on-off ramp; seguros; previdência; capitalização/proteção; infraestruturas de mercado; custodians/escrituradores/agentes fiduciários; gatekeepers CVM; crowdfunding; betting/loterias; setores obrigados PLD; imobiliário financeiro; agro financeiro; corporate treasury; marketplaces; SaaS/embedded finance; BPO financeiro; setor público financeiro.

### A.3 Segment Registry

A aba SEGMENTS do ONB-REG-001 é a lista viva de ICPs. Cada segmento deve possuir: Segment ID, descrição, fit, pack principal, requisitos específicos, jurisdições alvo, owners e status comercial/produto.

### A.4 Packs

Packs iniciais: **Banking, Payments, Credit, Capital Markets, Funds, Securitization, FX/Cross-border, VASP/Crypto, Insurance, Pension, Market Infrastructure, Betting, PLD-Adjacency e Enterprise**.

Packs não duplicam core; apenas compõem requirements, flows, policies, evidências, periodicidade, integrações e UAT próprios.

### A.5 Jurisdiction Packs

Brasil possui primeiro baseline operacional. Mercados internacionais serão ativados por Jurisdiction Profile/Pack específico. Nenhum Segment Pack deve assumir que a regulação do Brasil vale fora do país.

### A.6 Composição (exemplos sem fork)

- Banco brasileiro = Core + JUR-BR + PACK-BANKING + Tenant Policy.
- VASP internacional = Core + Jurisdiction Pack do país + PACK-VASP + Tenant Policy.
- Gestora/Fundo = Core + Jurisdiction Pack + PACK-FUNDS/CAPITAL + regras do tenant.

### A.7 Conflitos

Requirements e policies podem vir de várias camadas. O motor deve detectar conflito, precedência e incompatibilidade **antes de publicação**. Nenhuma regra de tenant pode enfraquecer hard invariant de segurança/compliance/privacidade.

### A.8 UAT por pack

Cada pack deve possuir cenário mínimo de onboarding, documentos, UBO/representantes, AML, risco, decisão, revalidação e falhas. UAT deve combinar segmento + jurisdição, não apenas um fluxo genérico.

### A.9 Saída de Wave 0

Validar lista de segmentos e packs; mapear CAPs/telas/requisitos por pack; identificar primeiros clientes/países e priorizar Jurisdiction Profiles reais antes de construção de features específicas.

### A.10 Regra de canonicalidade da taxonomia

Segment IDs e Pack IDs formam a taxonomia canônica de mercado/configuração do produto, **sem representar habilitação comercial, obrigação regulatória ou produto já homologado**. Prioridade GTM, primeiro cliente, país alvo, readiness e activation são estados independentes e devem permanecer explícitos nos registries.

- Um **Segment Pack** organiza requirements/flows/policies/evidências/UAT do segmento.
- Um **Regulatory Pack** representa obrigação de regulador/regime aplicável.
- Um **Jurisdiction Pack** representa contexto territorial/documental/privacy.

Não combinar esses papéis em um único enum ou fork de código.

A fonte SRC-003 permanece referência PROPOSED de descoberta de mercado; este documento e as abas SEGMENTS/PACKS do ONB-REG-001 governam a taxonomia vigente.

---

## Parte B — Mapa Completo de Mercado e ICPs (SRC-003)

- **Documento:** MUTUAL CAPITAL — MAPA COMPLETO DE MERCADO E ICPs — Onboarding Corporativo + Ecossistema Financeiro Mutual
- **Subtítulo:** Taxonomia de segmentos, nichos, compradores, packs regulatórios e prioridades comerciais
- **Versão:** 1.0 | Data-base: 08 de agosto de 2026
- **Classificação:** Confidencial — uso interno Mutual Capital

### B.1 Conclusão executiva

A solução pode atender praticamente todo o ecossistema financeiro, de capitais, pagamentos, crédito, câmbio, ativos virtuais, seguros e previdência, além de setores adjacentes sujeitos a PLD/FTP. O desenho correto não é um fluxo único para todos: é um **core horizontal** de identidade, KYC/KYB, AML, risco, case management, evidência, revalidação, providers e auditoria, combinado com **packs regulatórios e operacionais** por natureza do cliente.

O mercado-alvo deve ser tratado em três camadas:

- **(A)** instituições reguladas e supervisionadas — ICP prioritário;
- **(B)** prestadores e infraestruturas financeiras — ICP de alto valor;
- **(C)** setores adjacentes obrigados a diligência/PLD — expansão comercial.

O Backoffice Financeiro é habilitado apenas quando o modelo de negócio do cliente exige ledger, contas, liquidação, reconciliação, tesouraria ou operação financeira.

#### B.1.1 Proposta de arquitetura comercial

- **Core Onboarding:** identidade, documentos, UBO, representantes, KYC/KYB, AML, PEP/sanções, risco, EDD, decisão, auditoria, revalidação e monitoramento.
- **Core Financeiro opcional:** entity/account, ledger, balance, reservas, liquidez, reconciliação, tesouraria e rails.
- **Packs regulatórios:** regras, requisitos, documentos, evidências e políticas por segmento e jurisdição.
- **Provider orchestration:** cada capacidade pode ter múltiplas rotas, sem dependência de marca no domínio.
- **HFS/Mutual Intelligence:** capability proprietária transversal para inteligência relacional, sinais e investigação, sem expor metodologia proprietária.

### B.2 Mapa macro — universo de clientes

| # | Macrovertical | Exemplos de compradores | Fit |
|---|---|---|---|
| 1 | Bancos e instituições financeiras | Banco múltiplo, comercial, investimento, desenvolvimento, câmbio, cooperativo | Máxima |
| 2 | Crédito e financiamento | Financeiras, SCD, SEP, SCMEPP, crédito imobiliário, hipotecárias, leasing, agências de fomento | Máxima |
| 3 | Pagamentos e embedded finance | IPs, wallets, emissores, credenciadores, iniciadores, PSPs, subadquirentes, BaaS/Banking-as-a-Service | Máxima |
| 4 | Mercado de capitais | CTVM, DTVM, bancos de investimento, gestoras, administradores fiduciários, consultores, assessores | Máxima |
| 5 | Fundos e veículos | FIF, FIDC, FII, FIP, ETF, FIAGRO, fundos previdenciários, clubes e veículos estruturados | Máxima |
| 6 | Securitização e recebíveis | Securitizadoras, FIDC ecosystem, factoring, registradoras, recebíveis, duplicatas, crédito estruturado | Máxima |
| 7 | Câmbio e cross-border | Bancos de câmbio, corretoras de câmbio, remessas, PSP cross-border, mesas FX, correspondentes | Máxima |
| 8 | Ativos virtuais | SPSAV/VASP, exchanges, brokers, OTC, custodians, wallets institucionais, tokenização | Máxima |
| 9 | Seguros e previdência | Seguradoras, resseguradoras, EAPC, EFPC, capitalização, cooperativas, insurtechs, Open Insurance | Alta |
| 10 | Infraestrutura de mercado | Bolsas/mercados organizados, clearing, CCP, depositários, registradoras, sistemas de liquidação | Alta |
| 11 | Serviços fiduciários e gatekeepers | Custodiantes, escrituradores, rating, auditores, administradores, representantes de INR | Alta |
| 12 | Apostas, loterias e gaming regulado | Operadores de quota fixa, loterias, plataformas e fornecedores regulados | Alta |
| 13 | Setores obrigados PLD adjacentes | Factoring não CVM, joias/metais, bens de luxo, direitos de atletas/artistas e outros regulados | Média/Alta |
| 14 | Corporate finance / treasury | Grandes empresas, importadores/exportadores, marketplaces, grupos econômicos e tesourarias | Média |
| 15 | GovFin / instituições públicas | Bancos públicos, agências de fomento, fundos públicos, RPPS e estruturas autorizadas | Seletiva |

### B.3 Bancos, crédito e instituições supervisionadas pelo BCB

| Segmento | Necessidade principal |
|---|---|
| Bancos múltiplos | Onboarding PF/PJ, corporate/KYB, AML, UBO, correspondentes, contas e backoffice |
| Bancos comerciais | KYC, contas, pagamentos, Pix, crédito, monitoramento e recadastramento |
| Bancos de investimento | Onboarding institucional, suitability/qualificação, investidores, emissores e operações estruturadas |
| Bancos de desenvolvimento | PJ, projetos, crédito, beneficiários finais, garantias, contrapartes e recursos públicos |
| Bancos de câmbio | KYC/KYB, beneficiários, origem/destino, sanções, cross-border, backoffice FX |
| Bancos cooperativos | Cooperativas filiadas, associados, contas, crédito, AML e governança de rede |
| Cooperativas de crédito | Associados PF/PJ, dirigentes, crédito, Pix, rede, recadastramento e auditoria |
| Financeiras / SCFI | Crédito PF/PJ, renda/capacidade, fraude, cobrança, garantias e reconciliação |
| SCD | Onboarding digital, análise de risco, crédito via plataforma, antifraude e funding |
| SEP | Tomadores e credores/investidores, matching, KYC bilateral e trilha de consentimento |
| SCMEPP | Microcrédito e pequena empresa, KYC simplificado proporcional ao risco |
| Sociedade de crédito imobiliário | Tomadores, imóveis, garantias, renda, beneficiários e documentação |
| Companhia hipotecária | Crédito/garantias imobiliárias, contrapartes e due diligence |
| Agência de fomento | Empresas/projetos, controladores, recursos públicos e requisitos documentais |
| Arrendamento mercantil / leasing | Arrendatários PF/PJ, ativo objeto, crédito, fraude e cobrança |
| Administradora de consórcio | Consorciados, contemplação, fraude, PLD, representantes e recadastramento |
| Correspondente bancário | Onboarding da rede de correspondentes, representantes, terceiros, monitoramento e SoD |

O Banco Central lista atualmente, entre os tipos regulados/supervisionados, bancos de diversas espécies, financeiras, sociedades de crédito imobiliário, companhias hipotecárias, agências de fomento, leasing, corretoras, cooperativas, SCD, SEP, SCMEPP, consórcios e instituições de pagamento. **A plataforma deve modelar cada natureza como habilitação configurável, não como enum fechado no código.**

### B.4 Pagamentos, cartões e embedded finance

| Nicho | Aplicação |
|---|---|
| Emissor de moeda eletrônica | Wallets, contas pré-pagas, fintech accounts, cartões pré-pagos |
| Emissor pós-pago | Cartões de crédito e contas pós-pagas |
| Credenciador / adquirente | Merchant onboarding, KYB, UBO, MCC, risco, chargeback/fraude |
| Subcredenciador / subadquirente | Merchant network, split, recebíveis, conciliação e risco da cadeia |
| Iniciador de transação | Consentimento, identidade, Open Finance e segurança de sessão |
| PSP / gateway | KYB de merchant, providers, antifraude e roteamento |
| Wallet / carteira digital | KYC PF/PJ, device, biometria, recadastramento e AML |
| BaaS / embedded finance | Onboarding white-label de clientes finais e empresas parceiras |
| Plataforma de cartões / issuing | Cardholders, empresas, usuários adicionais e KYB corporate |
| Marketplace financeiro | Sellers, buyers, merchants, split beneficiaries e KYC/KYB |
| Payroll / benefícios | Empresas clientes, colaboradores, contas e prevenção a fraude |
| Open Finance / agregadores | Consentimento, identidade, trilha, propósito e revogação |

### B.5 Mercado de capitais, investimentos e fundos

| Segmento | Aplicação do produto |
|---|---|
| Gestor de recursos | Onboarding de investidores/contrapartes, fornecedores, fundos e EDD |
| Administrador fiduciário | Fundos, cotistas, prestadores, assembleias, controles e evidência |
| CTVM | Investidores, suitability, ordens, AML, mercados e representantes |
| DTVM | Distribuição, custódia/serviços, investidores e produtos |
| Banco de investimento / intermediário | Emissores, investidores, ofertas, operações estruturadas |
| Assessor de investimento PF/PJ | Onboarding da rede, vínculo com intermediários, clientes e supervisão |
| Consultor de valores mobiliários | Clientes, perfil, conflitos, contratos e documentação |
| Analista de valores mobiliários | Cadastro, credenciamento, conflito e governance |
| Agência de rating | Emissores, contrapartes, analistas, conflitos e documentação |
| Auditor independente | Clientes auditados, independência, beneficiários e riscos |
| Plataforma de crowdfunding | Emissores, sócios, investidores, oferta, KYC e suitability |
| Companhia aberta / emissor | Administradores, acionistas relevantes, UBO, ofertas e prestadores |
| Patrocinador / emissor de BDR | Entidade estrangeira, representantes e cadeia societária |
| Representante de investidor não residente | INR, beneficiários, documentos estrangeiros e recadastramento |
| Family office / multi-family office | Clientes de alta renda, estruturas patrimoniais, trusts/SPVs e EDD |
| Wealth manager | Investidor, origem de recursos/patrimônio, PEP/sanções e suitability |

#### B.5.1 Veículos/fundos que devem existir no Product Catalog

| Veículo | Particularidade de onboarding/diligência |
|---|---|
| FIF | Renda fixa, ações, cambial e multimercado conforme classes/categorias aplicáveis |
| FIDC | Direitos creditórios; cedentes, sacados, originadores, servicers e prestadores |
| FII | Ativos imobiliários; administradores, gestores, imóveis, locatários e prestadores |
| FIP | Participações; empresas investidas, controladores, UBO e governança |
| ETF / Fundo de Índice | Gestor, administrador, formadores/participantes e infraestrutura |
| FIAGRO | Cadeia agro; produtores, originadores, CPR/recebíveis e contrapartes |
| Fundos previdenciários | Participantes, patrocinadores/instituidores e prestadores |
| Clubes de investimento | Participantes e administrador |
| Fundos estruturados/especiais | Configuração por Anexo da Resolução CVM 175 e política do tenant |

### B.6 Securitização, crédito estruturado e recebíveis

| Nicho | Escopo |
|---|---|
| Companhias securitizadoras | Originadores, cedentes, devedores, patrimônio separado, prestadores e investidores |
| FIDC ecosystem | Cedentes, sacados, custodiante, administrador, gestor, consultorias e agentes de cobrança |
| Factoring / fomento mercantil | Cedentes, sacados, UBO, PLD, lastro e risco de duplicidade |
| Antecipação de recebíveis | Merchant, agenda, registradora, financiador e reconciliação |
| Duplicatas escriturais | Sacador, sacado, escriturador, registradora, financiador e eventos |
| Crédito consignado / payroll lending | Empregador/convenente, tomador, margem e fraude |
| BNPL | Merchant + comprador + financiador, device/fraud e capacidade |
| Crédito imobiliário | Tomador, vendedor, imóvel, garantias, cartórios e intervenientes |
| Crédito agro | Produtor, fazenda, CPR, garantias, cadeia de fornecedores e beneficiários |
| Crédito para PMEs | PJ, sócios/UBOs, recebíveis, contas e capacidade econômico-financeira |
| Debt marketplace | Originadores, investidores, tomadores e servicing |
| Distressed / NPL / cobrança | Carteiras, cedentes, devedores, cessões e trilha jurídica |

### B.7 Câmbio, remessas e cross-border

| Segmento | Aplicação |
|---|---|
| Banco de câmbio | Onboarding completo + backoffice FX e liquidação |
| Corretora de câmbio | Clientes, beneficiários, finalidade, origem/destino e compliance |
| Mesa OTC fiat | Contraparte, quote, KYC/KYB, limites, liquidez, settlement e reconciliação |
| Remittance fintech | Remetente, beneficiário, sanctions, purpose of payment e corridors |
| Cross-border PSP | Merchant, pagador, beneficiário, FX provider e reconciliação |
| Importador/exportador | Contraparte estrangeira, fornecedores, invoices e beneficiários |
| Correspondente cambial | Rede, representantes, limites e supervisão |
| Treasury internacional | Bancos, brokers, contas, signatários, limites e due diligence |

### B.8 Ativos virtuais, cripto, tokenização e OTC

| Nicho | Aplicação |
|---|---|
| SPSAV / VASP | Intermediação/custódia conforme autorização; KYC/KYB, AML e monitoramento |
| Exchange centralizada | Clientes, corporate accounts, wallets, device, AML e Travel Rule via handoff |
| Broker cripto | Clientes, contrapartes, exchanges/providers e suitability/risk |
| Mesa OTC cripto | Contrapartes PF/PJ, wallets, origem de recursos, KYT handoff e settlement |
| Custodiante de ativos virtuais | Titulares, beneficiários, wallets, chaves/governança e autorizados |
| Wallet institucional | Empresas, signatários, políticas, whitelists e UBO |
| On-ramp / off-ramp | KYC, conta bancária vinculada, beneficiário, wallet e fraude |
| Tokenização / RWA | Emissor, ativo subjacente, investidores, prestadores e compliance de oferta |
| Stablecoin/payment crypto | Clientes, reservas/providers, wallets, transfers e cross-border |
| Cripto-as-a-Service | Tenant + cliente final + providers, white-label e evidence trail |
| Fundos/gestoras cripto | Investidores, exchanges, custodians, wallets e contrapartes |

Em 2026, o Banco Central já disciplina a constituição e o funcionamento das sociedades prestadoras de serviços de ativos virtuais (SPSAV) e a prestação desses serviços por outras instituições autorizadas. Por isso, **VASPs deixam de ser apenas "adjacentes" e passam a compor o ICP regulado prioritário**.

### B.9 Seguros, previdência e proteção patrimonial

| Segmento | Aplicação |
|---|---|
| Sociedade seguradora | Segurados PJ/PF, beneficiários, corretores, prestadores, sinistros e AML |
| Microsseguradora | Fluxos simplificados e massificados, KYC proporcional e antifraude |
| Resseguradora local/admitida | Cedentes, brokers, beneficiários, contratos e contrapartes internacionais |
| EAPC | Participantes, beneficiários, aportes, resgates, PEP/sanções e recadastramento |
| EFPC / fundo de pensão | Participantes, assistidos, patrocinadores, instituidores, dirigentes e prestadores |
| Sociedade de capitalização | Titulares, beneficiários, distribuidores e pagamentos |
| Cooperativa de seguros | Cooperados, segurados e rede |
| Sociedade Seguradora de Propósito Específico | Operação específica, parceiros e segurados |
| Administradora de proteção patrimonial mutualista | Associados, beneficiários, prestadores e governança |
| Corretora de seguros / insurtech | Clientes, seguradoras parceiras, propostas e consentimentos |
| SPOC / Open Insurance | Consentimento, identidade, compartilhamento e trilha de dados |

### B.10 Infraestruturas e prestadores críticos de mercado

| Infraestrutura / prestador | Uso potencial |
|---|---|
| Administrador de mercado organizado / bolsa | Participantes, membros, emissores, usuários e governança |
| Câmara de compensação | Participantes, garantias, posições, limites e risco |
| Contraparte central (CCP) | Clearing members, colaterais, defaults e governança |
| Sistema de liquidação de fundos | Participantes, contas, autorizações e settlement |
| Sistema de liquidação de títulos | Participantes, ativos, contas e entrega contra pagamento |
| Depositário central | Emissores, participantes, contas, titularidade e movimentações |
| Entidade registradora | Participantes, ativos, transações, garantias e recebíveis |
| Custodiante de valores mobiliários | Clientes, fundos, investidores e ativos |
| Escriturador | Emissores, titulares, eventos corporativos e instruções |
| Transfer agent / agente fiduciário | Investidores, emissores, eventos e obrigações |

O Banco Central descreve cinco famílias clássicas de infraestrutura de mercado — sistemas de pagamento, sistemas de liquidação de títulos, contrapartes centrais, depositários centrais e entidades registradoras — todas com forte necessidade de cadastro institucional, IAM, due diligence de participante e trilha auditável.

### B.11 Apostas, loterias, gaming e setores de alto risco

| Nicho | Aplicação |
|---|---|
| Operador de aposta de quota fixa | KYC obrigatório, biometria/liveness, conta bancária vinculada, AML, impedidos e monitoramento |
| Grupo/white-label de betting | KYB de operador/marca, UBO, administradores, providers e segregação por tenant |
| Loterias e operadores autorizados | Identidade, pagamentos, prevenção a fraude e PLD |
| Fornecedores de plataforma gaming | KYB de operadores, contratos, integridade e third-party risk |
| Afiliados/agências de aquisição | KYB, beneficiários, reputação, fraude e compliance de canal |

A SPA exige autorização para operadores de apostas de quota fixa e estabelece medidas de PLD, incluindo identificação documental, reconhecimento facial com prova de vida e vinculação a conta bancária/de pagamento do próprio apostador. Isso torna o setor um ICP natural para a plataforma.

### B.12 Setores obrigados e adjacentes de PLD/FTP

| Segmento | Potencial de consumo |
|---|---|
| Factoring não regulado pela CVM | KYC/KYB, UBO, transações, comunicações e trilha |
| Joias, pedras e metais preciosos | Cliente, beneficiário, pagamento, origem de recursos e operações suspeitas |
| Bens de luxo/alto valor | Comprador/vendedor, UBO, origem de recursos e pagamentos |
| Direitos de atletas/artistas | Partes, representantes, beneficiários, pagamentos e estruturas internacionais |
| Imobiliárias/incorporadoras/corretores | Comprador/vendedor, UBO, origem de recursos e transações imobiliárias |
| Contabilidade/auditoria/consultoria sujeita a obrigações específicas | Clientes, beneficiários, serviços e risco |
| Cartórios/notários quando aplicável ao fluxo | Partes, representantes e documentos para integrações de evidência |

### B.13 Corporate treasury e embedded finance não regulado

| Nicho | Uso |
|---|---|
| Tesouraria de grandes grupos | Bancos, contas, signatários, contrapartes, limites e reconciliação |
| Importadores/exportadores | Fornecedores/clientes estrangeiros, câmbio, sanções e pagamentos |
| Marketplaces | Seller onboarding, split, beneficiários e merchant risk |
| E-commerce de alto volume | Merchants, fornecedores, pagamentos, chargeback e fraude |
| Plataformas SaaS com pagamentos | Clientes PJ, subcontas, usuários, providers e white-label |
| Plataformas de mobilidade/delivery | Motoristas/entregadores/estabelecimentos, pagamentos e fraude |
| Franquias e redes | Franqueados, sócios, pagamentos, fornecedores e compliance |
| BPO financeiro / tesouraria terceirizada | Múltiplos clientes, contas, signatários, segregação e evidência |
| ERP/fintech infra | Onboarding as a Service e módulos embarcados por API |

### B.14 Priorização comercial recomendada

| Prioridade | Segmentos | Racional |
|---|---|---|
| Tier 1 — Enterprise regulado | Bancos, IPs, SCD/SEP, CTVM/DTVM, gestoras, administradores, securitizadoras, SPSAV/VASPs, câmbio | Maior dor regulatória + maior ticket + aderência total |
| Tier 2 — Capital/asset servicing | Fundos, custodians, escrituradores, registradoras, crowdfunding, wealth/family offices | Alta complexidade de KYB/UBO/evidência |
| Tier 3 — Seguros/previdência | Seguradoras, EAPC, EFPC, resseguro, Open Insurance | Grande base e recorrência de recadastramento |
| Tier 4 — High-risk adjacent | Betting, factoring, marketplaces financeiros, joias/luxo, imobiliário | KYC/AML forte; Backoffice variável |
| Tier 5 — Enterprise horizontal | Tesourarias, BPOs, ERPs, plataformas SaaS e marketplaces | Escala via API/white-label; menor densidade regulatória |

### B.15 Packs de produto que devemos criar

| Pack | Mercado | Conteúdo |
|---|---|---|
| PACK-BANKING | Bancos, cooperativas, financeiras | KYC/KYB + conta + pagamentos + crédito + AML + correspondentes |
| PACK-PAYMENTS | IPs, adquirência, wallets, PSPs | Merchant/user onboarding + device + fraud + Pix/payment handoff |
| PACK-CAPITAL | CTVM/DTVM, gestoras, administradores | Investidor/contraparte + suitability handoff + UBO + AML + fundos |
| PACK-FUNDS | Fundos e prestadores | Cotista/investidor + prestadores + entity graph + evidence |
| PACK-CREDIT | SCD/SEP, financeiras, factoring, FIDC | Borrower/cedent/sacado + capacidade + fraude + garantias |
| PACK-SECURITIZATION | Securitizadoras e crédito estruturado | Originador/cedente/devedor + patrimônio separado + prestadores |
| PACK-FX | Câmbio/remessas/cross-border | Remetente/beneficiário + purpose + sanctions + settlement |
| PACK-VASP | SPSAV, exchange, OTC, custody | KYC + wallets + AML + KYT/Travel Rule handoff + custody roles |
| PACK-INSURANCE | Seguros/previdência | Segurado/beneficiário/patrocinador + AML + Open Insurance consent |
| PACK-INFRA | IMFs/registradoras/custodiantes | Participant onboarding + roles + evidence + access governance |
| PACK-BETTING | Apostas/loterias | Biometria/liveness + conta vinculada + impedidos + AML |
| PACK-PLD-ADJ | Setores obrigados adjacentes | KYC/KYB + UBO + transaction evidence + case management |
| PACK-ENTERPRISE | Tesouraria/BPO/SaaS | KYB de contraparte + signatários + providers + finance ops opcional |

### B.16 O que é comum a TODOS os segmentos

- Tenant, entidade/sujeito, identificadores e jurisdição.
- UBO, representantes, signatários, administradores e relacionamentos em grafo.
- Documentos com metadata, integridade, versão, origem, validade e retenção.
- KYC/KYB, biometria/documento quando aplicável, AML/PEP/sanções/watchlists e due diligence.
- EvidenceEnvelope e proveniência de qualquer fonte externa.
- Motor de requisitos, fluxo e política separados e versionados.
- Case lifecycle, fila humana, maker-checker, alçadas e decisão auditável.
- Recadastramento/revalidação por vencimento e eventos.
- Multi-provider, routing, fallback/degraded mode e reconciliação de divergências.
- API/SDK/hosted flow/white-label, observabilidade, segurança, LGPD e auditoria.

### B.17 O que NÃO deve ser obrigatório para todos

- **Ledger, balance e tesouraria:** somente para quem possui operação financeira que demande source of truth monetário.
- **Pix e rails:** habilitados por pack/capability, nunca incorporados ao core de identidade.
- **Suitability:** mercado de investimentos, não onboarding universal.
- **KYT/Travel Rule:** produtos adjacentes para transacional/cripto, integrados por handoff.
- **Crédito/scoring:** apenas clientes que concedem, intermedeiam ou analisam crédito.
- **Sinistros:** seguro; não deve contaminar o case lifecycle genérico.
- **Operações de fundo:** administração/custódia; separadas do cadastro universal.

### B.18 Conclusão estratégica

A ambição correta não é "atender todos com a mesma tela", mas ser a camada corporativa de confiança, identidade, compliance, evidência e governança que consegue se especializar por pack. A arquitetura deve permitir que uma DTVM acumule habilitações, que uma gestora tenha fundos e investidores, que uma SPSAV trate wallets e contrapartes, que uma seguradora trate beneficiários e que uma adquirente trate merchants — todos sobre os mesmos objetos fundamentais, sem duplicar domínio.

A prioridade de go-to-market deve começar nos segmentos com maior intensidade regulatória e maior dor operacional: bancos/IPs/fintechs de crédito; gestoras/administradores/CTVM/DTVM; securitizadoras/FIDC; câmbio/cross-border; SPSAV/exchanges/OTC; e betting regulado. Esses segmentos validam o produto no ambiente mais exigente e tornam a expansão para setores menos regulados muito mais simples.

### B.19 Fontes oficiais utilizadas

- Banco Central do Brasil — tipos de instituições reguladas/supervisionadas e Instituições de Pagamento (consulta em 08/08/2026).
- Banco Central do Brasil — Resolução BCB 520/2025 e atualizações 2026 sobre Sociedades Prestadoras de Serviços de Ativos Virtuais.
- Banco Central do Brasil — Infraestruturas do Mercado Financeiro / PFMI / Resolução BCB 304.
- Comissão de Valores Mobiliários — Regulados CVM; Resoluções CVM 21, 60, 88 e 175; participantes e prestadores.
- SUSEP — sociedades supervisionadas, Open Insurance e categorias de supervisionadas.
- PREVIC — Entidades Fechadas de Previdência Complementar e segmentação de supervisão.
- COAF — pessoas obrigadas e setores supervisionados para PLD/FTP.
- Ministério da Fazenda / SPA — apostas de quota fixa, operadores autorizados e medidas de PLD.

> Nota da fonte: este mapa é taxonomia de produto e mercado, **não parecer regulatório**. O pack normativo de cada segmento deverá ser validado contra a norma vigente antes de ser promovido a CANONICAL ou usado para decisão automatizada.
