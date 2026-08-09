---
titulo: "Handoffs, Integrações Externas e Participantes Econômicos (ADJ-01..08)"
fontes:
  - "ONB-HND-001_CONTRATOS_DE_HANDOFF_E_INTEGRACOES_v1.0"
  - "ONB-HND-002_PARTICIPANTES_ECONOMICOS_AFFILIADOS_REFERRALS_SPLIT_COMISSOES_E_SETTLEMENT_v1.0"
status_fonte: "HND-001: CANONICAL HANDOFF CONTRACT STANDARD (integrações individuais mantêm maturidade/evidência próprias) | HND-002: CANONICAL ADJACENT-DOMAIN CONTRACT (autoridade: decisão explícita do Program Owner)"
gerado_em: 2026-08-09
---

# 16 — Handoffs e Integrações Externas

Este documento consolida o padrão canônico de contratos de handoff e integrações (ONB-HND-001) e o contrato canônico de domínios adjacentes para participantes econômicos — afiliados, referrals, split, comissões e settlement (ONB-HND-002, ADJ-01..08).

---

## Parte A — ONB-HND-001: Contratos de Handoff e Integrações

- **Status:** CANONICAL HANDOFF CONTRACT STANDARD — integrações individuais mantêm maturidade/evidência próprias
- **Versão:** 1.0

### A.1 Princípio

O Onboarding é **source of truth do case lifecycle, evidências e decisão de onboarding**. Sistemas externos consomem contratos/read models e não reescrevem silenciosamente o histórico do case.

### A.2 Campos comuns de handoff

- contract/schema version;
- tenant_id;
- case_id;
- subject/entity/relationship IDs;
- customer correlation quando aplicável;
- jurisdiction;
- segment/pack;
- decision/status;
- restrictions;
- evidence references;
- policy/requirement versions;
- occurred_at;
- correlation_id;
- idempotency key;
- producer;
- integrity/signature quando aplicável.

### A.3 Onboarding → Backoffice Financeiro

Enviar identidade/entidade aprovada ou restrita, decisão, restrictions, IDs canônicos e referências de evidência necessárias. A recepção **não significa criação automática de conta, limite ou operação financeira**; o Backoffice aplica gates financeiros próprios.

### A.4 CRM ↔ Onboarding

CRM envia correlação/originação e recebe status operacional permitido. Não replicar PII, documentos, biometria ou evidências completas sem necessidade e autorização. **CRM não controla state machine de onboarding.**

### A.5 Onboarding → KYT / Travel Rule / Transaction Monitoring

Enviar sujeito/entidade verificados, risk context e identifiers necessários para monitoramento. O evento transacional permanece no domínio financeiro/KYT e não deve voltar como mutação direta do case; pode gerar alert/review/revalidation por contrato.

### A.6 Onboarding ↔ HFS / CAP-22

- **Entrada:** dados canônicos autorizados e evidence references.
- **Saída:** signal_id, versão, classe, rationale permitido, severity/confidence quando aplicável, provenance e correlation.
- HFS não expõe metodologia proprietária ao contrato externo.

### A.7 Onboarding → Terminal / Corporate View

Fornecer read model autorizado de status, risco, pendências e evidências permitidas. Terminal não vira source of truth e deve respeitar tenant/role/field-level access.

### A.8 Providers → Onboarding

Webhook/API de provider passa por adapter e EvidenceEnvelope. Assinatura, dedup, idempotência, timeout, inconclusive e replay protection são obrigatórios conforme capability.

### A.9 Internacional

Handoff deve carregar jurisdiction/region e usar IDs canônicos; **consumidor não pode inferir Brasil por ausência de país**. Privacy/residency e minimização devem ser avaliadas também na transferência entre produtos/regions.

### A.10 Compatibilidade

Breaking change exige: ADR, version bump, migration/dual-read ou compatibility plan, contract tests, rollback e evidência. Não mudar significado de campo existente sem versão.

### A.11 Registro vivo

A aba HANDOFFS do ONB-REG-001 mantém cada contrato: producer/consumer, evento/API, schema version, auth, idempotency, dados permitidos, evidência e status.

### A.12 Regra de canonicalidade e maturidade

Este documento é CANONICAL como padrão de fronteira, payload mínimo, versionamento, compatibilidade, privacidade e autoridade de handoffs. **Isso não significa que HOF-001..HOF-006 estejam implementados, integrados, testados ou liberados.**

A aba HANDOFFS do ONB-REG-001 é o registry vivo e cada Handoff ID mantém status próprio. **TO_FORMALIZE** significa que o padrão existe, mas o contrato executável/schema/API/event, auth, idempotência, testes, evidence e aceite do producer/consumer ainda não foram fechados.

Todo handoff material deve referenciar: schema/version, producer/consumer, source of truth, auth/scopes, tenant/jurisdiction context, idempotency, correlation, data classification, evidence requirements, retention e compatibility policy. Integrações externas nunca podem reescrever silenciosamente o case ou substituir a autoridade do Onboarding.

### A.13 Participantes econômicos e domínios financeiros adjacentes

SRC-047 especializa este padrão para **ADJ-01..08**: Split Payment, Afiliados, Referral, Comissões, Remunerações, Revenue/Fee Share, Campanhas/Incentivos e Settlement de Parceiros.

A fronteira é obrigatória:

- **Onboarding** é autoridade de identidade, entidade, relationship, eligibility/restrictions, evidence, revalidation e canonical IDs;
- **Partner/Commercial** é autoridade de programas comerciais/attribution;
- **Payments/Ledger/Settlement/Finance** são autoridades de cálculo, lançamento, reversão, saldo, payable e liquidação.

Aprovação de onboarding nunca autoriza operação financeira automaticamente.

**HOF-007..010** registram os contratos vivos. Split do pagamento, fee split, revenue share e comissão/remuneração são conceitos semanticamente distintos e não podem compartilhar source of truth ou lifecycle por conveniência de UI. REQ-ONB-069/ADR-023 aplicam-se integralmente: tenant e canal são dimensões separadas e white-label é configuração, nunca alteração de semântica financeira/compliance.

> ⚠️ [LACUNA NA FONTE] — O ONB-HND-001 referencia os Handoff IDs HOF-001..HOF-006 (integrações core) e HOF-007..HOF-010 (domínios econômicos) e as fronteiras por sistema (Backoffice, CRM, KYT, HFS, Terminal, Providers), mas não traz, no texto extraído, uma tabela nominal HOF-001..010 associando cada ID individual ao seu par producer/consumer específico. Essa associação vive na aba HANDOFFS do ONB-REG-001 (registry vivo).

---

## Parte B — ONB-HND-002: Participantes Econômicos, Afiliados, Referrals, Split, Comissões e Settlement

- **Status:** CANONICAL ADJACENT-DOMAIN CONTRACT
- **Versão:** 1.0 | Data-base: 2026-08-09
- **Autoridade:** decisão explícita do Program Owner

### B.1 Objetivo

Incorporar ao cânone do Mutual Onboarding os contextos econômicos e relacionais necessários para operar com afiliados, indicantes, parceiros, vendedores, agentes, correspondentes, merchants, sellers e demais beneficiários, **sem transformar o Onboarding em ledger, motor de pagamento ou settlement engine**.

### B.2 Fronteira de domínio

O Mutual Onboarding é source of truth de: identidade, entidade, relacionamento, papel econômico declarado, elegibilidade de onboarding/compliance, restrições, evidências, revalidação e handoff. Ele **não é** source of truth de saldo, lançamento contábil, split financeiro, tarifa, receita, comissão apurada, obrigação de pagamento ou settlement.

Domínios downstream mantêm autoridade própria:

- **Partner/Commercial:** programa de afiliados, referral, contratos/plano comercial, campanhas, metas, attribution e regras econômicas comerciais.
- **Payments/Ledger/Settlement:** split de pagamento, fee split, revenue share financeiro, payable, reversões, chargeback/MED quando aplicável, liquidação e reconciliação financeira.
- **Onboarding/Compliance:** identidade, KYB/KYC, UBO/representantes, vínculos, elegibilidade/restrições, evidence, monitoring e canonical IDs.

Aprovação de onboarding nunca autoriza automaticamente operação financeira, split, pagamento, comissão, settlement ou transferência.

### B.3 Capacidades adjacentes canônicas (ADJ-01..08)

#### ADJ-01 — Split Payment

Divisão de um recebimento entre participantes por regras percentuais/fixas, prioridade, arredondamento, retenções, reserva, cancelamento, devolução, chargeback/MED quando aplicável, reversão proporcional, reconciliação e liquidação individual. **Source of truth: Payments/Ledger/Settlement.** O Onboarding fornece participantes elegíveis, canonical IDs, restrições e evidence refs.

#### ADJ-02 — Afiliados

Cadastro e lifecycle comercial do afiliado, contrato/plano, vínculo com clientes/transações, tracking de origem, elegibilidade, aprovação, suspensão e encerramento. O Onboarding é autoridade da verificação e elegibilidade de compliance do afiliado; o domínio Partner/Commercial é autoridade do programa comercial.

#### ADJ-03 — Indicações/Referral

Quem indicou quem, referral/correlation ID, origem, janela de atribuição, conversão, duplicidade, fraude/autorreferência, elegibilidade e eventos de conversão. O Onboarding preserva identidade, vínculos e compliance; attribution/conversão é domínio Partner/Commercial.

#### ADJ-04 — Comissões

Regra de cálculo, base de incidência, percentual/valor, teto/piso, competência, status de apuração, retenção, aprovação, pagamento, estorno, clawback e reconciliação. **Source of truth: domínio financeiro/comercial.** O Onboarding apenas habilita/restringe o beneficiário e preserva vínculo/evidência.

#### ADJ-05 — Remunerações

Pagamentos recorrentes ou eventuais a parceiros, correspondentes, vendedores, agentes e outros beneficiários, conceitualmente separados de comissão quando a natureza econômica for diferente. **Source of truth: domínio financeiro/comercial.**

#### ADJ-06 — Revenue/Fee Share

Fee split é a divisão de tarifa; Revenue share é a distribuição de receita econômica da Mutual. Ambos são distintos do split de recursos pertencentes a terceiros. **Source of truth: domínio financeiro/contábil/comercial.**

#### ADJ-07 — Campanhas e Incentivos

Bônus, rebates, premiações, campanhas por volume/faixa, metas, regras de elegibilidade, vigência e aprovação. **Source of truth: Partner/Commercial**; Onboarding fornece elegibilidade e restrições de compliance quando aplicável.

#### ADJ-08 — Settlement de Parceiros

Contas a pagar e saldos por beneficiário: pendente, disponível, bloqueado, reservado, pago, devolvido e conciliado. **Source of truth: Ledger/Settlement.** Onboarding não mantém saldo financeiro.

### B.4 Separação semântica obrigatória

Os seguintes conceitos nunca podem compartilhar o mesmo significado, mesmo quando uma UX os apresenta em conjunto:

- **Split do pagamento:** divisão do fluxo financeiro da operação pertencente aos participantes.
- **Fee split:** divisão de uma tarifa cobrada.
- **Revenue share:** distribuição de receita econômica própria.
- **Comissão/remuneração:** obrigação da Mutual ou do programa perante um participante/beneficiário.

Cada um deve possuir tipo, regra, base de cálculo, lifecycle, eventos, reconciliação e accounting treatment próprios no domínio responsável.

### B.5 Modelo de participante no Onboarding

O Onboarding deve permitir que Subject/LegalEntity e Relationship carreguem, por configuração versionada, papéis econômicos e propósitos de relacionamento, **sem criar enum rígido de tipo de empresa**. Exemplos de papéis: merchant, seller, marketplace_participant, affiliate, referrer, commission_beneficiary, remuneration_beneficiary, fee_share_participant, revenue_share_participant, campaign_beneficiary, settlement_beneficiary, correspondent, agent e outros definidos por SegmentPack/TenantPolicy.

Cada vínculo relevante deve poder registrar:

- relationship_id;
- tenant_id;
- channel_id quando aplicável;
- subject/entity IDs;
- role/purpose;
- sponsor/parent quando houver;
- contract_reference/version;
- effective_from/to;
- eligibility_status;
- restriction_codes;
- jurisdiction;
- product/segment;
- referral/correlation IDs quando aplicável;
- evidence_refs;
- policy/requirement versions;
- audit metadata.

### B.6 Tenant, canal e white-label

REQ-ONB-069 e ADR-023 aplicam-se integralmente. Tenant e Canal são dimensões independentes ou hierárquicas por configuração; um canal não identifica automaticamente um tenant e um tenant pode operar múltiplos canais. Programas de afiliados/referrals/campanhas e jornadas white-label podem variar por tenant/canal/marca, mas não podem mudar silenciosamente regras de risco, compliance, autorização, evidence ou audit.

### B.7 Handoff Onboarding → domínios econômicos

O handoff mínimo deve transportar, conforme necessidade e minimização:

- schema_version;
- tenant_id;
- channel_id quando aplicável;
- case_id;
- subject/entity/relationship IDs;
- economic_role/purpose;
- onboarding_status;
- eligibility_status;
- restrictions;
- jurisdiction;
- product/segment;
- referral/correlation IDs quando aplicável;
- evidence_refs;
- policy/requirement versions;
- occurred_at;
- correlation_id;
- idempotency_key;
- producer;
- integrity/signature quando aplicável.

**Nenhum handoff deve carregar PII completa quando canonical IDs/evidence refs forem suficientes.**

### B.8 Feedback downstream → Onboarding

Eventos financeiros/comerciais não reescrevem o case. Podem gerar signal/review/revalidation por contrato quando materialmente relevantes, por exemplo: fraude de referral, abuso/autorreferência, chargeback/MED material, suspensão comercial com razão de compliance, mudança de beneficiary, clawback relevante ou evento que altere risco/elegibilidade. O evento recebido deve ser normalizado, correlacionado e auditado.

### B.9 Auditoria e reconciliação

A golden thread deve permitir reconstruir:

```
participante → vínculo/papel → decisão de elegibilidade → handoff → evento downstream → eventual revalidação/restrição
```

Para fluxos financeiros, deve existir correlação entre onboarding relationship_id/canonical IDs e IDs do ledger/settlement, sem compartilhar ownership de estado.

### B.10 Status e eventos esperados

Os contratos executáveis futuros devem prever, no mínimo, eventos versionados equivalentes a:

- `participant.eligibility.changed`
- `relationship.activated/suspended/ended`
- `referral.attributed/conversion_recorded/rejected`
- `split.rule.activated`
- `commission.accrued/reversed/paid`
- `remuneration.accrued/paid/reversed`
- `fee_share.accrued/reversed`
- `revenue_share.accrued/reversed`
- `campaign.benefit_qualified/rejected`
- `settlement.balance_changed/paid/reversed/reconciled`

Os nomes definitivos pertencem ao registry técnico do domínio responsável; o Onboarding registra somente os eventos que produz/consome por handoff.

### B.11 Controles

Todos os contratos devem considerar: multi-tenant isolation, channel context, white-label configuration, idempotência, correlation/causation, maker-checker quando aplicável, anti-fraud/autorreferência, data minimization, privacy/residency, versionamento, audit trail, retry/DLQ/replay, compatibility e evidence.

### B.12 Critério de canonicalidade

ADJ-01..08 são capacidades adjacentes canônicas relevantes ao ecossistema do produto e aos seus handoffs. **Elas não são CAP-23..30 do Mutual Onboarding** e não significam que engines financeiros/comerciais estejam implementados no repositório onboarding-corporativo. Dentro do Onboarding, o contrato canônico é: conhecer o participante/vínculo, verificar/evidenciar, decidir elegibilidade/restrição, monitorar e entregar handoff versionado.
