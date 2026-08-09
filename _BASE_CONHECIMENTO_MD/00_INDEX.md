---
titulo: "Mutual Onboarding — Base de Conhecimento Canônica (Índice Mestre)"
proposito: "Fonte estruturada em Markdown para IA construir o sistema Mutual Onboarding"
origem: "Corpus documental 00_EXECUCAO_CANONICA (docx/xlsx convertidos e consolidados)"
gerado_em: 2026-08-09
---

# Mutual Onboarding — Base de Conhecimento Canônica

## O que é este produto

O **Mutual Onboarding** é um produto independente de onboarding corporativo: **multi-tenant, multicanal e white-label**, com lifecycle completo de identidade, documentos, KYC/KYB, UBO/representantes, risco, AML, decisão, evidência, revalidação e handoff. Deve ser rastreável, auditável, seguro, explicável, multiprovider, versionado e homologável.

- **Repositório canônico de implementação:** GitHub `Mutual-Processadora-de-Pagamentos/onboarding-corporativo` (único autorizado).
- **Control plane canônico:** ONB-REG-001 (Registro Mestre de Execução).
- **Fonte canônica de planejamento:** Benchmark v1.1 (SRC-001).
- **Estado atual:** baseline documental congelada (DG-01 = DOCUMENTATION_READY_FOR_IMPLEMENTATION); nenhuma CAP-01..22 READY; CAP-19 é a primeira candidata (NOT READY/BLOCKED); GitHub em consultation-only por ADR-034.

## Como usar esta base (instruções para IA)

1. **Comece por este índice** e depois leia `01_GOVERNANCA_E_PROGRAMA.md` — contém as regras invioláveis do programa.
2. **IDs canônicos são contratos**: SRC-xxx (fontes), REQ-ONB-xxx (requisitos), CAP-01..22 (capabilities), ADR-xxx (decisões), GAP-xxx, EVD-xxx (evidências), DG-xx (gates), HOF-001..010 (handoffs), ADJ-01..08 (capacidades adjacentes), 80 Screen IDs. Nunca renomeie ou invente IDs.
3. **Golden thread obrigatória**: Norma/Decisão → Requirement → Capability → Policy/Rule → Screen/API/Event/Data → Provider → Task → Test → Evidence → Gate → Release → Production Verification. Elo ausente = GAP, nunca inferência silenciosa.
4. **Invariantes absolutos**: Tenant ≠ Channel (dimensões independentes de primeira classe); conditional-by-design (aplicabilidade nunca é implícita); frontend nunca é autoridade de estado; provider externo nunca é fonte única da verdade; fallback nunca significa aprovação sem evidência; aprovação de onboarding ≠ autorização financeira.
5. **Semântica**: em caso de dúvida terminológica, `02_GLOSSARIO_E_MODELO_SEMANTICO.md` é a autoridade de linguagem.

## Índice dos arquivos

| # | Arquivo | Conteúdo | Fontes principais |
|---|---------|----------|-------------------|
| 00 | `00_INDEX.md` | Este índice mestre | — |
| 01 | `01_GOVERNANCA_E_PROGRAMA.md` | Governança, fronteiras, classificações, ciclo de execução, invariantes, baseline, inventário canônico, 30 habilidades | ONB-GOV-001/002/004, ONB-PRD-001 |
| 02 | `02_GLOSSARIO_E_MODELO_SEMANTICO.md` | Glossário e modelo semântico canônico, distinções e aliases | ONB-GOV-003 |
| 03 | `03_DECISOES_EXECUTIVAS_E_ADRS.md` | Decisões executivas, índice de ADRs, instruções para agentes de IA | ONB-DEC-001, Claude Project Instructions v1.1 |
| 04 | `04_PLANEJAMENTO_COMPLETO_BENCHMARK.md` | Planejamento mestre e benchmark de mercado (SRC-001) | Benchmark v1.1 |
| 05 | `05_REQUISITOS_E_RASTREABILIDADE.md` | Modelo de requisitos, RF/RNF front/UX | ONB-REQ-001/002 |
| 06 | `06_REGISTRO_MESTRE_DE_EXECUCAO.md` | Registries vivos: requirements, capabilities, screens, gaps, ADRs, providers, waves, gates, evidence, semantic registry | ONB-REG-001 (xlsx) |
| 07 | `07_UX_BLUEPRINT_E_NAVEGACAO.md` | Blueprint frontend, wireframes, fluxos, navegação, padrão de especificação | ONB-UX-000/001/003/006 |
| 08 | `08_SCREEN_REGISTRY_80_TELAS.md` | Registro completo das 80 telas por superfície (Jornada, Analista, Admin/Developer, Console Mutual) | ONB-UX-002 (xlsx) |
| 09 | `09_ESPECIFICACAO_TELA_A_TELA.md` | Especificação tela-a-tela A1..D14, dashboards, KPIs, filtros, relatórios | ONB-UX-004/005 |
| 10 | `10_ARQUITETURA_TECNICA.md` | Fluxos técnicos, baseline técnico D2, multi-jurisdição, capability/evidence routing | ONB-ARQ-001/003, ONB-BAS-001, ONB-INT-001 |
| 11 | `11_STATUS_EVENTOS_APIS_AUDITORIA.md` | Status/eventos/observabilidade/API/webhooks, trilha de auditoria, CCS/ACCS | ONB-ARQ-004/004A/005/006 |
| 12 | `12_COMPLIANCE_REGULATORIO_E_LGPD.md` | Framework regulatório compliance-by-design, declarações/evidências, matriz de aplicabilidade, risco/privacidade | ONB-CPL-000..003, ONB-RSK-001 |
| 13 | `13_QA_SEGURANCA_E_HOMOLOGACAO.md` | DoR/DoD, homologação, gates, threat model, incidente chave mestra (GAP-ONB-054) | ONB-QA-001..006, ONB-SEC-001/002 |
| 14 | `14_EXECUCAO_E_READINESS_WAVES.md` | Readiness CAP-19, mapas técnicos W1, planos W2..W9, W11 piloto/release | ONB-EXE-001..013, ONB-REL-001, ONB-EVD-001 |
| 15 | `15_MERCADO_SEGMENTOS_E_PACKS.md` | Segmentos, packs, jurisdições, mapa de mercado e ICPs | ONB-MKT-001, Mapa Completo (SRC-003) |
| 16 | `16_HANDOFFS_E_INTEGRACOES.md` | Contratos de handoff HOF-001..010, participantes econômicos, fronteira ADJ-01..08 | ONB-HND-001/002 |
| 17 | `17_PROVIDERS_E_RFP.md` | RFP/RFI master de providers | ONB-RFP-001 |

## Regras permanentes (nunca violar)

- Documentação pronta ≠ implementação pronta ≠ QA pronta ≠ UAT ≠ release ≠ produção verificada. `CODE_COMPLETE != DONE`.
- Classificações documentais: CANONICAL, PROPOSED, TO_FORMALIZE, REVIEW_REQUIRED, MOCK, PROTOTYPE, PARTIAL, LEGACY, SUPERSEDED, NOT_EVIDENCED.
- Estado técnico é classificado separadamente: REAL, PARTIAL, UI_ONLY, PROTOTYPE, MOCK, ABSENT, NOT_EVIDENCED.
- Ciclo de execução: DISCOVERED → SPECIFIED → READY → IN_PROGRESS → CODE_COMPLETE → INTEGRATED → QA → UAT → READY_FOR_RELEASE → RELEASED → PRODUCTION_VERIFIED (+ BLOCKED, CANCELLED, READY_WITH_RESTRICTION).
- Fluxos e políticas chamam **capabilities**, nunca marcas de providers; respostas externas normalizadas em EvidenceEnvelope.
- Evidência nasce durante a execução — nunca criar Evidence ID para artefato inexistente.
- Trilha de auditoria append-only/tamper-evident; exportações são projeções da mesma fonte, nunca trilha paralela.
- Composição regulatória: RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy — regras regulatórias nunca hardcoded em telas.
- CAP-22 (HFS/Mutual Intelligence) é ativo proprietário interno — nunca entra em procurement, metodologia não vaza para APIs públicas.
