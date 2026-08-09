# PONTO DE ENTRADA — Mutual Onboarding (Base de Conhecimento Canônica)

> **Leia este arquivo antes de qualquer outra ação.** Ele define como uma IA deve consumir esta base para especificar, planejar ou implementar o sistema Mutual Onboarding.

## 1. O que você está construindo

Produto independente de **onboarding corporativo**: multi-tenant, multicanal e white-label, com lifecycle completo de identidade, documentos, KYC/KYB, UBO/representantes, risco, AML, decisão, evidência, revalidação e handoff. Obrigatoriamente rastreável, auditável, seguro, explicável, multiprovider, versionado e homologável.

- **Repositório canônico de implementação:** GitHub `Mutual-Processadora-de-Pagamentos/onboarding-corporativo` (único autorizado; ADR-034 mantém consultation-only até revogação explícita do Program Owner).
- **Control plane canônico:** ONB-REG-001 (representado em `06_REGISTRO_MESTRE_DE_EXECUCAO.md`).
- **Estado do programa:** DG-01 = DOCUMENTATION_READY_FOR_IMPLEMENTATION; nenhuma CAP-01..22 está READY; CAP-19 é a primeira candidata (NOT READY/BLOCKED por IAM/SoD/tenant/hardening).

## 2. Ordem de leitura obrigatória

1. `00_INDEX.md` — mapa completo da base e regras permanentes.
2. `01_GOVERNANCA_E_PROGRAMA.md` — regras invioláveis, classificações, ciclo de execução, invariantes.
3. `02_GLOSSARIO_E_MODELO_SEMANTICO.md` — autoridade de linguagem; consulte SEMPRE que houver dúvida terminológica.
4. `03_DECISOES_EXECUTIVAS_E_ADRS.md` — decisões vigentes (ADR-001..035); nunca contrarie um ADR CANONICAL.

Depois, leia conforme a tarefa:

| Se a tarefa é... | Leia |
|---|---|
| Entender escopo/produto/mercado | `04_PLANEJAMENTO_COMPLETO_BENCHMARK.md`, `15_MERCADO_SEGMENTOS_E_PACKS.md` |
| Especificar/implementar requisito | `05_REQUISITOS_E_RASTREABILIDADE.md`, `06_REGISTRO_MESTRE_DE_EXECUCAO.md` |
| Construir frontend/telas | `07_UX_BLUEPRINT_E_NAVEGACAO.md`, `08_SCREEN_REGISTRY_80_TELAS.md`, `09_ESPECIFICACAO_TELA_A_TELA.md` |
| Backend/arquitetura/integrações | `10_ARQUITETURA_TECNICA.md`, `11_STATUS_EVENTOS_APIS_AUDITORIA.md`, `16_HANDOFFS_E_INTEGRACOES.md`, `17_PROVIDERS_E_RFP.md` |
| Compliance/regulatório/LGPD | `12_COMPLIANCE_REGULATORIO_E_LGPD.md` |
| QA/segurança/homologação | `13_QA_SEGURANCA_E_HOMOLOGACAO.md` |
| Planejar execução/waves | `14_EXECUCAO_E_READINESS_WAVES.md` |

## 3. Regras invioláveis (resumo operacional)

1. **IDs são contratos.** SRC-xxx, REQ-ONB-001..077, CAP-01..22, ADR-xxx, GAP-xxx, EVD-xxx, DG-xx, HOF-001..010, ADJ-01..08, telas A1..D14. Nunca renomeie, reordene ou invente IDs. Novo conceito ⇒ registrar gap/decisão, não criar ID por conta própria.
2. **Golden thread.** Toda entrega deve rastrear: Norma/Decisão → Requirement → Capability → Policy/Rule → Screen/API/Event/Data → Provider → Task → Test → Evidence → Gate → Release → Production Verification. Elo ausente = GAP explícito, nunca inferência silenciosa.
3. **Tenant ≠ Channel.** Dimensões independentes de primeira classe; nenhuma camada infere uma pela outra. White-label é configuração de marca — nunca altera semântica de risco, compliance ou autorização.
4. **Conditional-by-design.** Aplicabilidade nunca é implícita: tudo é CORE_MANDATORY ou tem condição versionada (CONDITIONAL / APPLICABLE / NOT_APPLICABLE / PROHIBITED / REVIEW_REQUIRED). Decisão server-authoritative, reproduzível e auditável.
5. **Frontend nunca é autoridade de estado.** Backend decide; frontend renderiza.
6. **Providers por capability, nunca por marca.** Respostas externas normalizadas em EvidenceEnvelope. Fallback nunca significa aprovação sem evidência.
7. **Evidência nasce na execução.** Nunca criar Evidence ID para artefato inexistente. Trilha de auditoria append-only/tamper-evident; exportações são projeções da mesma fonte.
8. **Fronteira financeira.** Onboarding conhece/verifica participantes e decide eligibility; NUNCA calcula split, comissão, revenue share, saldo ou settlement (isso é ADJ-01..08, downstream). Aprovação de onboarding ≠ autorização financeira.
9. **Compliance-by-design.** Regras regulatórias nunca hardcoded em telas; composição RegulatoryPack + JurisdictionPack + SegmentPack + TenantPolicy.
10. **Estados não se promovem sozinhos.** Documentação pronta ≠ implementação ≠ QA ≠ UAT ≠ release ≠ produção verificada. `CODE_COMPLETE != DONE`. Estado técnico (REAL/PARTIAL/UI_ONLY/MOCK/ABSENT/NOT_EVIDENCED) é classificado separadamente do status documental.
11. **CAP-22 (HFS/Mutual Intelligence)** é ativo proprietário interno: nunca entra em procurement; metodologia, features, pesos e limiares não vazam para APIs públicas.

## 4. Como tratar lacunas e conflitos

- Trechos marcados com `⚠️ [LACUNA NA FONTE]` indicam ausência/truncamento no documento original — **não preencha por inferência**; registre como GAP ou pergunte ao Program Owner.
- Lacunas conhecidas do corpus: `ONB-EXE-006` (Plano W2) truncado na origem; SRC-047 citado mas ausente; divergência D2 PASS × TRACEABILITY_SUMMARY FAIL; 35 ADRs no registry × "ADR-001..034" na baseline; GAP-ONB-025..030 é buraco de numeração intencional.
- **Hierarquia de autoridade em conflito:** 1) decisão explícita do Program Owner → 2) ONB-REG-001 (`06_...md`) → 3) documento canônico do domínio → 4) ADR CANONICAL → 5) GitHub/CI só como evidência técnica → 6) documentos PROPOSED/REVIEW_REQUIRED apenas como insumo.
- Termo novo ou incompatível com o glossário ⇒ abrir decisão/gap ou mapear alias explícito; nunca criar segunda semântica.

## 5. Legenda operacional do programa

✅ validado/concluído · ⚠️ risco/pendência · ⛔ inconsistência/bloqueio · ❌ proibido pela governança · ❓ exige decisão do Program Owner.

---
*Base gerada em 2026-08-09 a partir do corpus canônico `00_EXECUCAO_CANONICA` (62 documentos). Os .md desta pasta são uma projeção fiel para consumo por IA; os originais no Drive permanecem a autoridade documental.*
