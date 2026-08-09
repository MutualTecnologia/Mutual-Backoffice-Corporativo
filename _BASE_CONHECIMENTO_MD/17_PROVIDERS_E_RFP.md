---
titulo: "Providers e RFP/RFI Master — Critérios, Capabilities Exigidas e Homologação"
fontes:
  - "ONB-RFP-001_RFP_RFI_MASTER_DE_PROVIDERS_v1.0"
status_fonte: "CANONICAL PROCUREMENT/RFP STANDARD — NÃO ENVIAR EXTERNAMENTE SEM AUTORIZAÇÃO; não é lista de providers contratados nem de capacidades comprovadas"
gerado_em: 2026-08-09
---

# 17 — Providers e RFP/RFI Master

Este documento consolida o ONB-RFP-001 — RFP/RFI Master de Providers, padrão canônico de procurement, due diligence e homologação de fornecedores/fontes do Mutual Onboarding.

- **Status:** CANONICAL PROCUREMENT/RFP STANDARD / **NÃO ENVIAR EXTERNAMENTE SEM AUTORIZAÇÃO**
- **Versão:** 1.0

## 1. Objetivo

Comparar providers e fontes de Onboarding em uma matriz única e equivalente, evitando seleção por marketing, relacionamento comercial ou preço isolado. A avaliação deve ocorrer **por capability e por grupo econômico**.

## 2. Providers/referências iniciais

ComplyCube; Sumsub; Serasa Experian; idwall; Unico; DataRudder; Assertiva; Exato Digital; Revizia; Judit; Gryfo; Legitimuz; T-Shield; SERPRO; Receita Federal/canais elegíveis; Banco Central/dados públicos e canais condicionados quando legalmente aplicáveis.

**HFS/Mutual Intelligence não participa como fornecedor externo: é CAP-22 interna.**

## 3. Identificação e grupo econômico

Campos a levantar por provider: razão social; marca; país; controladores; grupo econômico; entidades contratantes; subprocessadores relevantes; data centers/regiões; revendedores/parceiros.

**A independência de fallback somente é reconhecida quando houver independência técnica, operacional e contratual suficiente.**

## 4. Capability coverage

Para cada capability **CAP-01 a CAP-21** aplicável, avaliar: disponível; produto/API; país/jurisdição; PF/PJ; documentos suportados; sinal/resultado; SLA; latência; qualidade; limites; retention; necessidade de contrato próprio do tenant; sandbox; custo.

## 5. API / SDK / Webhook

OpenAPI/especificação; versionamento; autenticação; idempotency; webhook signing; replay protection; retry policy; rate limit; batch; async; callback; SDKs; hosted flow; mobile/web SDK; sandbox; test fixtures; deprecation/sunset; changelog; support channel.

## 6. Identidade, documento e biometria

Document coverage; OCR; authenticity; MRZ/QR; tamper/fraud detection; facematch; liveness; passive/active; spoof/deepfake resistance; low-light/device coverage; accessibility; fallback; revalidation; consent; storage/retention de imagem/biometria; edge/on-device quando aplicável.

## 7. KYB / Empresas

Company registry; status; CNPJ/identificadores internacionais; QSA/shareholders; UBO; representatives; corporate graph; licenses; address; documents; registry provenance; update frequency; **CNPJ alfanumérico**; international coverage.

## 8. AML / Due diligence

PEP; sanctions; watchlists; adverse media; custom lists; judicial/criminal; fiscal; regulatory licenses; source of funds/wealth; risk signals; continuous monitoring; false-positive/disambiguation; hit identifiers; discard memory; evidence/export.

## 9. Fraude / Device

Device intelligence; session risk; email/phone/address risk; proxy/VPN/emulator; synthetic identity; deepfake; behavioral signals; velocity; network/link signals; explainability; privacy constraints.

## 10. Qualidade e performance

Disponibilidade histórica; SLA/SLO; p50/p95/p99; timeouts; error rates; coverage; false accept/reject quando relevante; precision/recall quando fornecido; incident history; status page; maintenance windows; RTO/RPO; disaster recovery; BCP.

## 11. Segurança

Certificações válidas; pentest; vulnerability management; encryption; key management; tenant isolation; access control; privileged access; logging; incident response; secure SDLC; SAST/SCA/secret scanning quando aplicável; penetration reports/attestations; breach notification.

## 12. Privacidade / LGPD / GDPR

Controlador/operador; DPA; purpose limitation; legal bases; biometric treatment; subprocessadores; cross-border transfers; data residency; retention/deletion; data subject requests; export; crypto-shredding quando aplicável; training/model use restrictions; no resale/reuse of client data without authorization.

## 13. Comercial

Preço unitário por capability; volume tiers; mínimo mensal; setup; sandbox; suporte; overage; currency; taxes; annual commitment; price revision; credits; cancellation; exit charges; white-label; multi-tenant/BYOC; reseller/revenue-share se aplicável.

## 14. Contract / Exit

Term; renewal; termination; portability; export format; deletion certificate; migration assistance; data return; transition period; escrow/continuity where relevant; IP; liability; indemnities; regulatory cooperation; audit rights; subcontractor change notification.

## 15. Suporte e governança

Support hours/time zones; severity model; response/resolution targets; TAM/CSM; escalation; incident communications; RCA; roadmap visibility; change notice; regulatory change management; audit/evidence support.

## 16. Teste de homologação

**Nenhum provider é homologado apenas pela resposta do RFP.** Deve passar contract tests e ambiente de teste controlado cobrindo: success; inconclusive; timeout; 4xx/5xx; malformed response; rate limit; retry; idempotency; webhook replay; invalid signature; degradation; privacy/log hygiene; reconciliation.

## 17. Critérios de decisão

Coverage de capability; qualidade; segurança; privacidade; arquitetura/API; resiliência; jurisdição; custo total; suporte; contrato/exit; concentração econômica; estratégia de fallback.

**Pesos finais serão definidos antes da scoring para evitar ajuste retroativo ao fornecedor preferido.**

## 18. Regras especiais

- Economic group, controladores e independência de fallback devem ser verificados em fonte/contrato vigente antes da decisão. Referências históricas de possível correlação entre marcas, inclusive Serasa Experian/idwall, são hipótese de due diligence e não fato canônico sem verificação atual.
- SERPRO/RFB/BCB não devem ser tratados como providers comerciais genéricos; eligibility e natureza da fonte devem ser registradas.
- SCR/CCS/Open Finance não entram como "bases públicas".
- HFS é capability interna e segue governança de modelo, não procurement externo.

## 19. Saída esperada

Provider Registry completo; Capability × Provider Matrix; pricing/TCO; security/privacy matrix; contract/exit matrix; geographic coverage; fallback map; recommendation por capability; gaps; risks; shortlist; homologation status.

**Nenhuma contratação ou contato externo é autorizado por este documento isoladamente.**

## 20. Regra de confiabilidade do Provider Registry

Este documento é CANONICAL como padrão de RFP/RFI, due diligence e homologação, **não como lista de providers contratados ou capacidades comprovadas**. Os nomes da seção 2 e do registry vivo são candidatos/fontes para avaliação; ownership, economic_group, produto, coverage, preço, SLA, certificação, data residency e disponibilidade devem ser verificados na fonte/contrato vigente antes de qualquer recomendação ou roteamento.

Status **RFP_REQUIRED**, **ELIGIBILITY_REQUIRED** ou **PUBLIC_SOURCE** não equivale a **HOMOLOGATED**. Nenhuma contratação, contato externo, seleção final ou ativação de provider é autorizada por este documento isoladamente.
