---
titulo: "Especificação Tela a Tela A1–D14 + Dashboards, KPIs, Filtros e Relatórios (Mutual Onboarding)"
fontes:
  - "ONB-UX-004_ESPECIFICACAO_TELA_A_TELA_A1_D14_v1.0.docx (File ID: 18r2R11p5GRRbMmiC0DOEY5Fic9_-8jPj4UzwZ8-KfR4)"
  - "ONB-UX-005_DASHBOARDS_KPIS_FILTROS_RELATORIOS_v1.0.docx (File ID: 1LbNesHtRJcJXwgzyzGcU_ySEl1Cd6yTxincD9Y4e3Rw)"
status_fonte: "ONB-UX-004: CANONICAL PRODUCT CONTRACT; ONB-UX-005: CANONICAL ANALYTICS SPEC — métricas individuais podem permanecer REVIEW_REQUIRED quando fórmula/fonte/owner não estiverem fechados"
gerado_em: 2026-08-09
---

# PARTE 1 — ESPECIFICAÇÃO TELA A TELA A1–D14 (ONB-UX-004 v1.0)

Versão 1.0 | Status: CANONICAL PRODUCT CONTRACT | Uso: produto, UX, engenharia, QA e homologação; implementação técnica separada por evidência.


## 1. OBJETIVO E REGRA DE USO

Este documento detalha as 80 funções canônicas do Mutual Onboarding. Cada Screen ID representa uma função de produto; não necessariamente uma URL exclusiva. A implementação só pode ser considerada completa quando o comportamento descrito estiver sustentado por backend, tenant context, autorização, dados, estados, testes, observabilidade e evidência. Interface navegável sem esses elementos permanece PARTIAL/UI_ONLY.

Campos de especificação usados por tela: objetivo; layout/componentes; dados; regras/validações; ações; permissões/segurança; estados; integrações/eventos; métricas; critérios mínimos de aceite.


## 2. SUPERFÍCIE A — JORNADA DO CLIENTE (A1–A20)

- **Princípio:** mobile-first, white-label, linguagem clara, progressiva e localizada. O cliente vê somente o necessário para o seu case, produto, segmento e jurisdição. Regras de risco, roteamento e elegibilidade permanecem server-side.

### A1 — ENTRADA / CONVITE

- **Objetivo:** identificar a jornada correta, estabelecer confiança, validar o convite e permitir início ou retomada segura.
- **Layout/componentes:** logo/nome do tenant; nome do produto; explicação da finalidade; idioma; status do convite; resumo de etapas; privacidade; suporte; CTA Iniciar/Continuar.
- **Dados:** invitation_id/token, tenant, product, case_id quando já criado, subject/delegation context, locale, expiry, channel, terms_version aplicável.
- **Regras/validações:** convite válido, não revogado e dentro da validade; token de uso restrito; vínculo server-side ao tenant/case; link não pode revelar PII em URL.
- **Ações:** iniciar; retomar; trocar idioma; pedir suporte; sair.
- **Permissões/segurança:** acesso somente ao case do convite; rate limiting; proteção contra enumeração; sessão criada no servidor.
- **Estados:** valid, expired, revoked, already_completed, resumed, unavailable, access_denied.
- **Integrações/eventos:** InvitationOpened, JourneyStarted, JourneyResumed.
- **Métricas:** conversão convite→início; tempo até início; convite expirado; canal de origem.
- **Aceite:** nenhuma PII exposta antes da validação; retomar leva ao estado server-authoritative; convite inválido não cria case.

### A2 — IDENTIFICAÇÃO DA NATUREZA

- **Objetivo:** determinar a natureza do sujeito/organização e as habilitações necessárias sem expor lógica regulatória interna.
- **Layout/componentes:** cards/selector de natureza; ajuda contextual; exemplos; stepper; CTA continuar.
- **Dados:** entity_type, legal_form, regulated_nature(s), declared_activity, country/jurisdiction context.
- **Regras/validações:** opções vêm de catálogo versionado; combinações inválidas bloqueadas; múltiplas habilitações permitidas quando aplicável.
- **Ações:** selecionar; alterar antes de submissão; continuar.
- **Permissões/segurança:** sujeito/representante do case; mudanças após etapa crítica exigem reavaliação server-side.
- **Estados:** selection_required, selected, incompatible_combination, policy_recalculated.
- **Integrações/eventos:** NatureSelected; RequirementsRecomputed.
- **Métricas:** distribuição por natureza; abandono na seleção; mudanças de natureza.
- **Aceite:** nenhuma opção hardcoded como única verdade; alteração recalcula requirements e preserva histórico.

### A3 — JURISDIÇÃO

- **Objetivo:** estabelecer jurisdições relevantes para identidade, registro, residência, emissão documental e tratamento de dados.
- **Layout/componentes:** país principal; residência; constituição; emissão documental; residência fiscal quando aplicável; idioma/locale.
- **Dados:** country, jurisdiction, tax_residency, incorporation_country, document_issuing_country, residency_region, locale, timezone.
- **Regras/validações:** valores derivados de JurisdictionPack; sem obrigatoriedade universal de CPF/CNPJ/CEP/UF; suportar múltiplas residências fiscais quando necessário.
- **Ações:** selecionar/editar jurisdição; confirmar.
- **Permissões/segurança:** mudança pode reabrir requisitos e exigir novo consentimento.
- **Estados:** jurisdiction_selected, unsupported, review_required, pack_unavailable.
- **Integrações/eventos:** JurisdictionSelected; JurisdictionPackResolved.
- **Métricas:** volume por jurisdição; unsupported jurisdiction; tempo de escolha.
- **Aceite:** core não contém if country == BR como regra de UI; pack ativo fica registrado no case.

### A4 — ETAPAS DINÂMICAS

- **Objetivo:** apresentar ao cliente o caminho atual da jornada derivado de requirements/flow/policy.
- **Layout/componentes:** stepper dinâmico; seção atual; concluídas; pendentes; opcionais condicionais; indicador de salvamento.
- **Dados:** flow_version, requirement_ids, current_step, completed_steps, blocked_steps, conditional_steps, policy_version.
- **Regras/validações:** sequência é calculada no servidor; frontend não libera etapa futura por conta própria; step pode ser reaberto por complemento/review.
- **Ações:** navegar somente para etapas permitidas; salvar; continuar.
- **Permissões/segurança:** autorização por case e delegation scope.
- **Estados:** current, completed, locked, skipped_by_policy, reopened, pending_external.
- **Integrações/eventos:** StepEntered, StepCompleted, FlowRecomputed.
- **Métricas:** drop-off por etapa; tempo por etapa; reaberturas.
- **Aceite:** stepper reflete exatamente o estado server-side e tolera mudança de flow version sem quebrar histórico.

### A5 — LIVENESS

- **Objetivo:** realizar prova de vida/biometria com instrução clara, feedback seguro e fallback governado.
- **Layout/componentes:** consentimento quando exigido; instruções; câmera; guia de enquadramento; tentativa atual; status; retry/fallback; ajuda.
- **Dados:** biometric_session_id, attempt_id, provider_route, capture metadata mínima, normalized_status, reason_code, evidence_id.
- **Regras/validações:** sessão criada server-side; quantidade de tentativas/política de fallback definida por policy; score bruto não determina UI sozinho; minimização de biometria.
- **Ações:** iniciar captura; concluir; repetir quando autorizado; encaminhar assistência.
- **Permissões/segurança:** câmera somente com consentimento; nenhum frame bruto em log; provider secret nunca chega ao browser quando não necessário.
- **Estados:** ready, capturing, processing, pass, fail, inconclusive, unavailable, retry_allowed, manual_review_required.
- **Integrações/eventos:** BiometricAttemptCreated/Completed; EvidenceCreated.
- **Métricas:** success rate; retry rate; fail por device/provider/jurisdição; latency.
- **Aceite:** indisponibilidade não vira aprovação; cada tentativa gera lineage; fallback respeita policy.

### A6 — CAPTURA DE DOCUMENTO

- **Objetivo:** capturar documento legível, íntegro e vinculado ao sujeito correto.
- **Layout/componentes:** tipo de documento; câmera/upload; frente/verso/páginas; quality hints; preview; recaptura; status de processamento.
- **Dados:** document_type, issuing_country, authority, number/value, validity, file metadata, object_key, hash, MIME, size, version, evidence_ids.
- **Regras/validações:** tipos vêm do JurisdictionPack/requirements; limites de MIME/tamanho; versão e integridade obrigatórias; OCR/autenticidade podem ser assíncronos.
- **Ações:** capturar/upload; recapturar; remover antes de submissão conforme policy; continuar.
- **Permissões/segurança:** URL temporária; storage tenant-aware; malware scan hook; download não é exposto ao cliente além do necessário.
- **Estados:** awaiting_upload, uploading, processing, accepted_capture, quality_error, unsupported_type, malware_blocked, validation_pending.
- **Integrações/eventos:** DocumentUploaded, DocumentVersionCreated, DocumentProcessingRequested, EvidenceCreated.
- **Métricas:** retries; quality failure; upload latency; tipos de documento.
- **Aceite:** arquivo e metadata versionados; recaptura não apaga evidência anterior; object key não previsível.

### A7 — ENDEREÇO

- **Objetivo:** coletar endereço e eventual prova de endereço conforme a jurisdição.
- **Layout/componentes:** formulário adaptativo; autocomplete quando disponível; opção endereço manual; tipo de endereço; upload de comprovante quando exigido.
- **Dados:** address_type, lines, locality, region, postal_code, country, geocode opcional, proof_document_id, valid_from.
- **Regras/validações:** formato e obrigatoriedade definidos por JurisdictionPack; não impor CEP/UF globalmente; address normalization mantém valor original e normalizado.
- **Ações:** preencher; validar; confirmar; anexar comprovante.
- **Permissões/segurança:** minimização e masking em consoles posteriores.
- **Estados:** draft, normalized, proof_required, proof_pending, validated, mismatch_review.
- **Integrações/eventos:** AddressDeclared, AddressNormalized, AddressEvidenceLinked.
- **Métricas:** erro de validação; uso autocomplete; proof required rate.
- **Aceite:** endereço internacional aceito; original preservado; divergência vira evidência/review.

### A8 — GRAFO SOCIETÁRIO

- **Objetivo:** declarar/confirmar estrutura societária, controle e caminho até beneficiários finais.
- **Layout/componentes:** lista + árvore/grafo responsivo; entidades; percentual; tipo de relação; adicionar entidade; validações; visão alternativa tabular.
- **Dados:** entity_id, related_entity/person_id, relationship_type, ownership_pct, voting_pct, control_type, effective_from/to, source.
- **Regras/validações:** suportar cadeias multinível e entidades estrangeiras; detecção de ciclos/duplicidade; soma de percentuais não pode ser simplificada quando classes/direitos diferirem.
- **Ações:** adicionar/editar/remover declaração antes do envio; expandir; convidar pessoa-chave.
- **Permissões/segurança:** usuário vê somente relações necessárias ao case; UBO derivado pelo motor não é editável como fato sem evidência.
- **Estados:** incomplete, complete, cycle_detected, ubo_pending, external_entity_pending.
- **Integrações/eventos:** RelationshipDeclared, OwnershipGraphUpdated, UBOAssessmentRequested.
- **Métricas:** profundidade média do grafo; tempo de preenchimento; taxa de UBO manual.
- **Aceite:** grafo e tabela equivalentes; relações têm IDs e validade; alterações geram versão.

### A9 — PESSOAS-CHAVE

- **Objetivo:** identificar administradores, diretores, controladores, representantes, procuradores e outros papéis exigidos.
- **Layout/componentes:** cards por papel; nome/identificador mínimo; função; escopo; status da jornada individual; convite.
- **Dados:** person_id, role_type, authority_scope, relationship_id, start/end dates, invitation_status, verification_status.
- **Regras/validações:** papéis vêm de requirements; mesma pessoa pode acumular papéis; autoridade/representação requer documento quando aplicável.
- **Ações:** adicionar; editar; convidar; reenviar convite; revogar convite.
- **Permissões/segurança:** convidado só vê sua própria jornada delegada.
- **Estados:** missing_required_role, invited, opened, in_progress, completed, expired, revoked.
- **Integrações/eventos:** KeyPersonAdded, DelegateInvited, DelegateCompleted.
- **Métricas:** pessoas-chave/case; tempo de conclusão; convites expirados.
- **Aceite:** vínculos preservam role e escopo; remoção relevante recalcula requirements.

### A10 — REDE DE TERCEIROS

- **Objetivo:** declarar terceiros relevantes conforme segmento, risco e policy.
- **Layout/componentes:** lista categorizada; tipo de terceiro; relação; país; relevância; documentos/evidências quando exigidos.
- **Dados:** third_party_entity_id, category, relationship, country, materiality/risk context, contract/reference opcional.
- **Regras/validações:** categorias dependem de SegmentPack; não exigir terceiros sem requirement ativo; relações materiais podem gerar KYP/KYB adicional.
- **Ações:** adicionar; editar; remover antes de submissão; anexar evidência.
- **Permissões/segurança:** dados de terceiros minimizados e purpose-bound.
- **Estados:** not_required, required_incomplete, complete, verification_required, review_required.
- **Integrações/eventos:** ThirdPartyDeclared, ThirdPartyVerificationRequested.
- **Métricas:** terceiros por segmento; review rate; pendências.
- **Aceite:** tela não importa domínio transacional para Onboarding; somente relações relevantes ao cadastro/risco.

### A11 — DOCUMENTOS SOCIETÁRIOS

- **Objetivo:** coletar documentos corporativos exigidos por natureza, segmento e jurisdição.
- **Layout/componentes:** checklist por documento; versão/data; emissor; upload; status; substituição; motivo da exigência em linguagem simples.
- **Dados:** corporate_document_type, entity_id, file metadata, issue/effective date, validity, version, issuer, hash, evidence_id.
- **Regras/validações:** contrato/estatuto/ata/procuração/licença e equivalentes vêm de catálogo; documento vencido ou versão antiga pode ser mantido como histórico.
- **Ações:** upload; substituir; visualizar preview seguro; corrigir metadata.
- **Permissões/segurança:** acesso por delegation; storage seguro; PII mascarada em previews quando aplicável.
- **Estados:** missing, uploaded, processing, accepted, expired, superseded, rejected_capture, manual_review.
- **Integrações/eventos:** CorporateDocumentUploaded, DocumentSuperseded, EvidenceCreated.
- **Métricas:** pendência por tipo; tempo de processamento; substituições.
- **Aceite:** nunca apagar versão anterior ao substituir; requirement que originou o documento fica rastreável.

### A12 — TERMOS / ASSINATURA

- **Objetivo:** obter consentimentos, declarações e assinaturas exigidas na versão correta.
- **Layout/componentes:** lista de termos; versão; resumo; link/visualização; checkbox/aceite; assinatura quando aplicável; confirmação.
- **Dados:** term_id, term_version, locale, legal_basis/purpose, accepted_at, signer_id, signature_reference, evidence_id.
- **Regras/validações:** termos dependem de jurisdição/tenant/product; aceite não retroage entre versões; consentimentos revogáveis são diferenciados de obrigações contratuais.
- **Ações:** visualizar; aceitar; assinar; recusar quando permitido; continuar.
- **Permissões/segurança:** signer/representative authority validada; evidência do aceite imutável.
- **Estados:** pending, viewed, accepted, declined, signature_pending, signed, version_changed.
- **Integrações/eventos:** TermViewed, ConsentGiven/Withdrawn, SignatureCompleted.
- **Métricas:** tempo até aceite; taxa de versão atualizada; falha de assinatura.
- **Aceite:** term_version e signer ficam gravados; texto apresentado é recuperável/auditável.

### A13 — REVISÃO / ENVIO

- **Objetivo:** permitir revisão final, correção controlada e submissão explícita do case.
- **Layout/componentes:** resumo por seção; status de completude; warnings; links para editar; declarações finais; CTA Enviar.
- **Dados:** section summaries, outstanding_requirements, flow_version, policy_version, terms status, completeness result.
- **Regras/validações:** servidor valida todos requisitos no submit; alterações em campos críticos podem invalidar evidências dependentes; submit é idempotente.
- **Ações:** editar seção; enviar; confirmar envio.
- **Permissões/segurança:** somente ator autorizado; dupla confirmação para mudança irreversível quando necessário.
- **Estados:** ready_to_submit, incomplete, validation_failed, submitting, submitted, duplicate_submit_safe.
- **Integrações/eventos:** CaseSubmitted, ReviewQueueRequested.
- **Métricas:** taxa de retorno para edição; falhas no submit; tempo até submissão.
- **Aceite:** nenhum case vira submitted apenas por estado local; resposta traz case status oficial.

### A14 — ACOMPANHAMENTO

- **Objetivo:** mostrar o status real após submissão e permitir somente ações autorizadas.
- **Layout/componentes:** status; timeline; pendências; mensagens; passos concluídos; prazo/SLA quando publicável; CTA de complemento.
- **Dados:** case_status, public_timeline_events, pending_requests, decision_public_reason, next_action, due_dates.
- **Regras/validações:** reason codes internos são traduzidos para mensagem segura; não expor sinais confidenciais ou metodologia.
- **Ações:** enviar complemento; acompanhar; suporte; iniciar contestação quando permitido.
- **Permissões/segurança:** acesso ao próprio case; masking.
- **Estados:** submitted, in_review, waiting_customer, approved, approved_with_restriction, rejected, expired, contested, closed.
- **Integrações/eventos:** CaseStatusViewed, ComplementOpened, AppealStarted.
- **Métricas:** visitas pós-submit; tempo em pendência; SLA percebido.
- **Aceite:** timeline vem de eventos autorizados; status nunca é calculado no browser.

### A15 — CONVITE DE PESSOA-CHAVE

- **Objetivo:** delegar etapa específica a pessoa-chave sem transferir acesso ao restante do case.
- **Layout/componentes:** papel; nome/e-mail/telefone permitidos; escopo do convite; validade; canais; status.
- **Dados:** delegate_id, relationship_id, role, scope, contact, expiry, invite_token metadata, status.
- **Regras/validações:** escopo mínimo; não permitir convidar sem relação/papel válido; reenvio não cria duplicidade de delegate.
- **Ações:** convidar; reenviar; revogar; alterar contato mediante trilha.
- **Permissões/segurança:** token de alta entropia; isolamento por delegate scope.
- **Estados:** draft, sent, delivered, opened, in_progress, completed, expired, revoked.
- **Integrações/eventos:** DelegateInviteSent/Revoked.
- **Métricas:** delivery/open/conclusion; reenvios; expirados.
- **Aceite:** delegado não consegue enumerar case/empresa além do escopo.

### A16 — JORNADA INDIVIDUAL DELEGADA

- **Objetivo:** permitir que pessoa convidada conclua apenas os requisitos atribuídos a ela.
- **Layout/componentes:** contexto mínimo da empresa solicitante; etapas próprias; documentos/biometria/termos da pessoa; progresso.
- **Dados:** delegate_scope, person requirements, personal evidence, consent/terms, completion status.
- **Regras/validações:** requirements individualizados; conclusão da pessoa não aprova case; alterações da empresa não ficam visíveis salvo necessidade.
- **Ações:** preencher; capturar; assinar; concluir.
- **Permissões/segurança:** sessão própria; tenant/case/delegate bound; mínimo disclosure.
- **Estados:** invited, verified_session, in_progress, pending, submitted, completed, expired.
- **Integrações/eventos:** DelegateJourneyStarted/Submitted/Completed.
- **Métricas:** completion time; abandon; retry.
- **Aceite:** acesso do delegado não permite ações do representante principal.

### A17 — PROGRESSO DO GRUPO

- **Objetivo:** permitir ao representante acompanhar dependências de pessoas-chave sem ver dados pessoais desnecessários.
- **Layout/componentes:** lista de convidados; papel; status; data de convite; pendência genérica; ações de reenvio/revogação.
- **Dados:** delegate_id, role, high-level status, due date, invite state, completion timestamp.
- **Regras/validações:** não expor biometria, documentos ou respostas individuais; status é agregado.
- **Ações:** reenviar; revogar; adicionar pessoa substituta quando permitido.
- **Permissões/segurança:** representative scope; masking.
- **Estados:** waiting_invite, invited, in_progress, completed, expired, blocked.
- **Integrações/eventos:** GroupProgressViewed, DelegateReminderRequested.
- **Métricas:** dependências abertas; completion rate grupo; aging.
- **Aceite:** somente status necessário aparece; PII do delegado é minimizada.

### A18 — CONTESTAÇÃO / REVISÃO HUMANA

- **Objetivo:** permitir contestação formal de resultado ou solicitação de revisão quando política/regulação permitir.
- **Layout/componentes:** motivo; resultado contestado; instruções; campo narrativo; anexos; declaração; protocolo.
- **Dados:** appeal_id, case_id, reason_category, narrative, attachments, created_at, status, resolution_public_message.
- **Regras/validações:** janela/eligibilidade definidas por policy; contestação cria fila separada; decisão original não é sobrescrita.
- **Ações:** abrir contestação; anexar; enviar; acompanhar.
- **Permissões/segurança:** acesso ao próprio caso; anexos versionados.
- **Estados:** eligible, not_eligible, draft, submitted, under_review, resolved, closed.
- **Integrações/eventos:** AppealSubmitted, AppealQueueEntered, AppealResolved.
- **Métricas:** appeal rate; outcome; resolution time.
- **Aceite:** preserva decisão anterior e nova decisão/revisão como registros distintos.

### A19 — RECUPERAÇÃO / VERIFICAÇÃO ASSISTIDA

- **Objetivo:** oferecer caminho seguro para usuário com falha técnica, acessibilidade ou impossibilidade de concluir automação.
- **Layout/componentes:** diagnóstico seguro; opções permitidas; contato/suporte; agendamento/canal quando aplicável; instruções.
- **Dados:** assistance_request_id, reason, failed_step, allowed_fallbacks, support_case_ref, status.
- **Regras/validações:** fallback vem de policy; assistência nunca reduz requisito sem autoridade; suporte não deve pedir secret/documento por canal inseguro.
- **Ações:** solicitar assistência; escolher fallback permitido; retomar.
- **Permissões/segurança:** challenge adicional quando risco exigir; trilha de operador.
- **Estados:** fallback_available, support_required, scheduled, in_assistance, resumed, resolved.
- **Integrações/eventos:** AssistanceRequested, AssistedVerificationStarted/Completed.
- **Métricas:** requests por motivo; resolution time; fallback success.
- **Aceite:** falha automatizada não força rejeição; override só com evidência/alçada.

### A20 — CONSENTIMENTOS / AUTORIZAÇÕES EXTERNAS

- **Objetivo:** obter autorizações para consultas específicas como Open Finance/SCR ou equivalentes somente quando elegíveis.
- **Layout/componentes:** finalidade; dados consultados; entidade destinatária; prazo; revogabilidade; redirect/deep link seguro quando aplicável; status.
- **Dados:** authorization_type, purpose, scope, provider/source, consent_id/reference, granted_at, expires_at, revoked_at.
- **Regras/validações:** mostrar apenas autorização aplicável; consentimento específico; retorno externo validado por state/correlation; CCS/SCR/Open Finance não tratados como consultas genéricas.
- **Ações:** autorizar; cancelar; retomar após redirect; revogar quando permitido.
- **Permissões/segurança:** OAuth/state/PKCE quando aplicável; callback server-side; não armazenar token sensível no browser.
- **Estados:** not_required, pending, redirecting, granted, denied, expired, revoked, error.
- **Integrações/eventos:** ExternalAuthorizationRequested/Granted/Denied/Revoked.
- **Métricas:** grant rate; abandon no redirect; expiry/revocation.
- **Aceite:** autorização possui escopo/purpose/validade/evidência; falha externa não é tratada como consentimento concedido.

## 3. SUPERFÍCIE B — PAINEL DO ANALISTA (B1–B22)

- **Princípio:** desktop-first, alta densidade informacional controlada, contexto do case sempre visível, evidência e lineage acessíveis sem expor dado desnecessário. Toda decisão relevante é server-side, auditável e limitada por alçada.

### B1 — FILA DE CASOS

- **Objetivo:** priorizar trabalho, distribuir carga e tornar backlog/SLA explícitos.
- **Layout/componentes:** KPI strip; busca; filtros persistentes; tabela configurável; badges de risco/status; SLA/aging; owner; paginação; ações em lote permitidas.
- **Dados:** case_id, entity/subject summary, tenant, product, segment, jurisdiction, risk_band, status, priority, owner, opened_at, SLA deadline, pending flags.
- **Regras/validações:** ordenação padrão por criticidade/SLA configurável; ações em lote limitadas por capability; nenhuma linha de outro tenant.
- **Ações:** abrir; atribuir/reatribuir; priorizar; escalar; pausar; solicitar complemento; exportar lista controlada.
- **Permissões/segurança:** tenant_analyst/compliance/approver por capability; masking; BOLA/IDOR testado.
- **Estados:** unassigned, assigned, in_review, waiting_customer, escalated, decided, closed; degraded quando métricas parciais.
- **Integrações/eventos:** CaseAssigned, PriorityChanged, QueueEntered/Exited.
- **Métricas:** backlog, aging, SLA, throughput, manual review rate, escalation rate.
- **Aceite:** filtros não atravessam tenant; bulk action é auditada; fila reflete estado server-authoritative.

### B2 — VISÃO GERAL DO CASO

- **Objetivo:** fornecer visão 360° do case sem exigir navegação entre sistemas.
- **Layout/componentes:** header fixo com Case ID; entidade; status; risk band; product/jurisdiction; checklist; timeline; pendências; cards de capability; painel de ações.
- **Dados:** case core, subject/entity, flow/policy versions, requirements, risk summary, decision context, open tasks, latest evidence status.
- **Regras/validações:** resumo nunca substitui evidência detalhada; divergências e evidence unavailable ficam visíveis.
- **Ações:** abrir tabs; adicionar nota; atribuir; solicitar complemento; escalar; ir para decisão.
- **Permissões/segurança:** masking e reveal controlado; actor/tenant/capability server-side.
- **Estados:** complete_context, partial_evidence, pending_provider, waiting_customer, review_required.
- **Integrações/eventos:** CaseViewed, AnalystNoteAdded.
- **Métricas:** tempo por case; navegação para evidências; cases com pendência.
- **Aceite:** header preserva contexto em todas as subtelas; nenhum score sem source/version.

### B3 — EVIDÊNCIAS

- **Objetivo:** centralizar evidências normalizadas, origem, validade, confiança e lineage.
- **Layout/componentes:** tabs por capability; filtro source/status/date; lista/cards; preview seguro; metadata; reason codes; divergência; raw reference controlada.
- **Dados:** EvidenceEnvelope completo, incluindo evidence_id, capability_id, source, provider_version, timestamps, normalized_status/result, confidence, reason_codes, hash, expiry, retention.
- **Regras/validações:** raw payload segregado; expired evidence destacada; duplicate/retry correlacionados.
- **Ações:** abrir detalhe; comparar; marcar relevante; adicionar nota; solicitar nova execução quando policy permitir.
- **Permissões/segurança:** view_raw_evidence separada de view_normalized; download auditado.
- **Estados:** pass, fail, unknown, inconclusive, unavailable, expired, superseded, disputed.
- **Integrações/eventos:** EvidenceViewed, EvidenceRecheckRequested.
- **Métricas:** evidence availability, inconclusive rate, age/expiry.
- **Aceite:** lineage sempre disponível; provider não aparece como “verdade final”.

### B4 — GRAFO SOCIETÁRIO

- **Objetivo:** investigar controle, participação e beneficiários finais de forma relacional.
- **Layout/componentes:** grafo interativo + tabela alternativa; filtros por relação/nível/jurisdição; painel lateral de entidade; path-to-UBO; evidências vinculadas.
- **Dados:** nodes, relationships, ownership/voting/control, source, validity, UBO assessment, discrepancies.
- **Regras/validações:** visualização não altera grafo canônico; ciclos e relações contestadas destacados; classes de participação preservadas.
- **Ações:** expandir; filtrar; abrir entidade/evidência; comparar declaração x fonte; adicionar finding.
- **Permissões/segurança:** dados sensíveis mascarados; acesso tenant-bound.
- **Estados:** complete, partial, unresolved_ubo, conflicting_sources, external_entity_unverified.
- **Integrações/eventos:** GraphViewed, RelationshipFindingAdded.
- **Métricas:** UBO unresolved rate; depth; conflicts.
- **Aceite:** lista acessível equivalente ao grafo; qualquer derivação mostra fonte/model/version.

### B5 — PESSOAS-CHAVE

- **Objetivo:** revisar administradores, UBOs, representantes e responsáveis com seus papéis e verificações.
- **Layout/componentes:** tabela/cards por pessoa; role chips; authority; verification summary; AML/fraud flags; timeline; convite/jornada status.
- **Dados:** person_id, roles, relationship, authority_scope, verification/evidence summary, screening status, delegated journey state.
- **Regras/validações:** mesma pessoa pode ter múltiplos papéis; remover papel não apaga histórico; pessoa sem requirement não vira obrigatória por UI.
- **Ações:** abrir pessoa; revisar evidências; solicitar complemento; revalidar; adicionar note/finding.
- **Permissões/segurança:** PII mascarada por padrão; reveal permission.
- **Estados:** verified, pending, failed_check, manual_review, expired_verification.
- **Integrações/eventos:** KeyPersonReviewed, ReverificationRequested.
- **Métricas:** pessoas pendentes; revalidation rate; failures por role.
- **Aceite:** papel, autoridade e evidence ficam distinguíveis.

### B6 — REDE DE TERCEIROS

- **Objetivo:** analisar terceiros materiais e vínculos relevantes sem misturar monitoramento transacional ao core de Onboarding.
- **Layout/componentes:** lista/grafo; categoria; relação; país; risk flags; verification status; evidências.
- **Dados:** third_party_entity, relationship/category, materiality context, jurisdiction, KYB/KYC status, evidence.
- **Regras/validações:** itens dependem de SegmentPack; sem importação de KYT/Travel Rule como requisito de tela.
- **Ações:** abrir terceiro; pedir verificação; registrar finding; solicitar complemento.
- **Permissões/segurança:** need-to-know; masking.
- **Estados:** declared, verified, pending, review_required, unsupported_jurisdiction.
- **Integrações/eventos:** ThirdPartyReviewed, VerificationRequested.
- **Métricas:** terceiros/case; pendências; risk findings.
- **Aceite:** relação é rastreável ao requirement que a exigiu.

### B7 — DOCUMENTOS

- **Objetivo:** revisar documentos pessoais e societários, suas versões, integridade e resultados de processamento.
- **Layout/componentes:** filtros; thumbnails/preview seguro; metadata; versões; OCR/authenticity summary; expiry; links de evidence.
- **Dados:** document_id/version, type, subject/entity, issuer, jurisdiction, dates, hash, MIME/size, object reference, processing results.
- **Regras/validações:** documento superseded permanece acessível conforme retention; download condicionado.
- **Ações:** visualizar; comparar versões; solicitar recaptura; marcar quality issue; abrir evidence.
- **Permissões/segurança:** signed/short-lived access; no object key exposto; download logged.
- **Estados:** processing, accepted, expired, superseded, quality_error, malware_blocked, authenticity_review.
- **Integrações/eventos:** DocumentViewed, RecaptureRequested.
- **Métricas:** document failure/expiry/retry.
- **Aceite:** preview não vira fonte da verdade; metadata e integrity hash visíveis ao analista autorizado.

### B8 — AML / DESAMBIGUAÇÃO

- **Objetivo:** investigar matches de PEP, sanções, watchlists e adverse media com desambiguação defensável.
- **Layout/componentes:** hit list; source/list; match attributes; confidence; aliases; datas; país; adverse media snippets controlados; decisão de match/no-match; evidências.
- **Dados:** screening_run, list/source/version, candidate matches, matched attributes, confidence, reason codes, disposition, analyst rationale.
- **Regras/validações:** score não encerra análise sozinho; disposition requer motivo; atualização de lista pode gerar rescreen.
- **Ações:** confirmar hit; descartar falso positivo; escalonar EDD; solicitar nova fonte; adicionar nota.
- **Permissões/segurança:** compliance capability; maker-checker para dispositions críticas quando policy exigir.
- **Estados:** no_hit, potential_hit, confirmed_hit, false_positive, inconclusive, source_unavailable, escalated.
- **Integrações/eventos:** ScreeningHitReviewed, DispositionRecorded, EDDRequested.
- **Métricas:** hit rate; false positive rate; review time; source availability.
- **Aceite:** toda disposição registra actor, timestamp, fonte/version e rationale.

### B9 — JUDICIAL / CRIMINAL

- **Objetivo:** consolidar consultas judiciais/criminais permitidas com contexto, jurisdição e evidência.
- **Layout/componentes:** categorias; processos/mandados quando legalmente disponíveis; tribunal/source; status; partes; datas; flags de homônimo; evidência.
- **Dados:** source, jurisdiction, case/proceeding reference, subject match, status, dates, reason codes, legal constraints.
- **Regras/validações:** não inferir culpabilidade de existência de processo; filtros jurídicos e finalidade definidos por policy/legal review.
- **Ações:** abrir detalhe; marcar match/no-match; solicitar EDD; adicionar nota.
- **Permissões/segurança:** acesso restrito; minimização; retenção conforme base legal.
- **Estados:** clear, match_pending, confirmed_relevant, not_relevant, restricted_source, unavailable.
- **Integrações/eventos:** JudicialFindingReviewed.
- **Métricas:** findings/case; inconclusive; source latency.
- **Aceite:** linguagem da UI evita conclusão jurídica indevida; fonte e data visíveis.

### B10 — FISCAL / CERTIFICADOS

- **Objetivo:** revisar regularidade fiscal, certidões e equivalentes por jurisdição.
- **Layout/componentes:** certidões; órgão; validade; situação; pendências; documento/consulta fonte; timeline.
- **Dados:** certificate_type, issuing_authority, jurisdiction, issue/expiry, status, reference, evidence.
- **Regras/validações:** significado de “regular” depende do país/órgão; expirado não é automaticamente irregular.
- **Ações:** abrir certidão; solicitar atualização; registrar exceção; adicionar nota.
- **Permissões/segurança:** compliance/analyst conforme requirement.
- **Estados:** valid, expired, pending, unavailable, irregularity_found, manual_review.
- **Integrações/eventos:** FiscalEvidenceReviewed, CertificateRefreshRequested.
- **Métricas:** expiry rate; refresh time; irregularity findings.
- **Aceite:** authority/jurisdiction e validade sempre exibidas.

### B11 — TRILHA / ACESSOS

- **Objetivo:** mostrar histórico de ações relevantes do case e acessos privilegiados.
- **Layout/componentes:** timeline/tabela; actor; ação; objeto; before/after reference; reason; IP/device quando permitido; correlation_id.
- **Dados:** audit_event_id, actor_type/id, tenant, action, target, timestamp, correlation, reason, privilege level.
- **Regras/validações:** append-only; dados sensíveis não aparecem em claro; filtros não alteram histórico.
- **Ações:** filtrar; abrir evento; exportar trilha conforme permissão.
- **Permissões/segurança:** audit_view; export_audit separada; Mutual privileged access distinguido.
- **Estados:** available, partial_due_retention, restricted, export_pending.
- **Integrações/eventos:** AuditTrailViewed/Exported.
- **Métricas:** privileged accesses; overrides; unusual access alerts.
- **Aceite:** mutações críticas têm evento correspondente; audit não é editável pela UI.

### B12 — DECISÃO / ALÇADA

- **Objetivo:** formalizar decisão com base em evidências, autoridade e segregação de funções.
- **Layout/componentes:** summary; key evidence; blockers; risk; authority indicator; opções de decisão; reason codes; rationale; restrictions; checker; confirmação.
- **Dados:** decision_id, proposed_action, authority_required, actor authority, evidence_refs, reason_codes, restrictions, maker/checker, state transition.
- **Regras/validações:** self-approval bloqueado onde SoD exigida; transição ilegal falha; decisão sem rationale/evidence quando obrigatórios não é aceita.
- **Ações:** aprovar; aprovar com restrição; rejeitar; complementar; escalar; EDD; cancelar proposta antes da confirmação.
- **Permissões/segurança:** decision capability e alçada server-side; actor_id obrigatório.
- **Estados:** decision_available, insufficient_authority, maker_pending, checker_pending, approved, rejected, restricted, escalated.
- **Integrações/eventos:** DecisionProposed, DecisionApproved/Rejected, CaseStateChanged.
- **Métricas:** decision time; approval/rejection; checker turnaround; overrides.
- **Aceite:** chamada direta não autorizada falha; decisão produz record + audit + event atômicos.

### B13 — PENDÊNCIAS / COMPLEMENTOS

- **Objetivo:** criar e acompanhar solicitações estruturadas de complemento ao cliente/delegado.
- **Layout/componentes:** lista de requests; escopo; motivo seguro; campos/docs exigidos; prazo; destinatário; status; histórico.
- **Dados:** complement_request_id, target subject/delegate, requirement_ids, requested_items, due_date, public_message, internal_reason, status.
- **Regras/validações:** reabre somente etapa autorizada; complemento não apaga versão anterior; prazo/notification policy.
- **Ações:** criar; editar antes de envio; enviar; cancelar; prorrogar com justificativa; revisar resposta.
- **Permissões/segurança:** analyst/compliance; public/internal reasons separados.
- **Estados:** draft, sent, delivered, opened, responded, overdue, cancelled, resolved.
- **Integrações/eventos:** ComplementRequested/Responded/Resolved.
- **Métricas:** pending count; response time; overdue rate.
- **Aceite:** cliente recebe somente conteúdo seguro; resposta cria novas versões/evidências.

### B14 — REAVALIAÇÃO / REFRESH

- **Objetivo:** executar refresh periódico ou provocado por mudança/expiração.
- **Layout/componentes:** schedule; trigger; itens vencidos; diff desde última aprovação; rechecks; outcome; próxima data.
- **Dados:** refresh_case_id, original case/entity, triggers, last_check versions, expired evidence, new evidence, outcome.
- **Regras/validações:** refresh não sobrescreve aprovação histórica; policy/version registrada; risco pode escalar para review.
- **Ações:** iniciar refresh; reexecutar capability; solicitar cliente; concluir revisão.
- **Permissões/segurança:** compliance/analyst; audit.
- **Estados:** scheduled, due, in_progress, waiting_customer, changed, unchanged, escalated, completed.
- **Integrações/eventos:** RefreshDue/Started/Completed.
- **Métricas:** overdue refresh; changed-data rate; time to refresh.
- **Aceite:** lineage conecta ciclo novo ao anterior.

### B15 — ALERTAS DE MONITORAMENTO

- **Objetivo:** organizar sinais pós-onboarding que exigem reavaliação cadastral/compliance sem absorver KYT transacional.
- **Layout/componentes:** alert queue; type/source; severity; entity; created_at; related evidence; status; action.
- **Dados:** alert_id, source/capability, category, severity, entity/case ref, reason, model/source version, evidence refs.
- **Regras/validações:** alert não equivale a decisão; dedup/correlation; HFS/third-party alerts normalizados.
- **Ações:** acknowledge; assign; investigate; dismiss com rationale; open refresh/EDD.
- **Permissões/segurança:** compliance; model details protegidos.
- **Estados:** new, acknowledged, assigned, investigating, dismissed, escalated, resolved.
- **Integrações/eventos:** MonitoringAlertCreated/Resolved.
- **Métricas:** alert volume; false positive/disposition; SLA.
- **Aceite:** cada fechamento tem rationale/evidence; transaction monitoring permanece boundary externo.

### B16 — DOSSIÊ / EXPORT

- **Objetivo:** gerar dossiê auditável conforme escopo e classificação de dados.
- **Layout/componentes:** escopo; seções; masking; classificação; propósito; preview; formato; geração; histórico.
- **Dados:** export_id, case/entity, requested_sections, classification, masking policy, requester, purpose, artifact hash, generated_at.
- **Regras/validações:** default least-data; export sensível requer capability/justificativa; artifact versionado.
- **Ações:** configurar; gerar; baixar; compartilhar somente por mecanismo autorizado.
- **Permissões/segurança:** export_sensitive; download auditado; expiração de link.
- **Estados:** configured, generating, ready, failed, expired, revoked.
- **Integrações/eventos:** DossierRequested/Generated/Downloaded.
- **Métricas:** exports; sensitive exports; generation latency.
- **Aceite:** download produz audit; conteúdo respeita masking/retention.

### B17 — FILA DE CONTESTAÇÃO

- **Objetivo:** administrar appeals/reviews independentes do fluxo de decisão original.
- **Layout/componentes:** KPIs; queue; case/appeal IDs; motivo; aging; owner; original decision; status.
- **Dados:** appeal summary, original decision ref, submitted evidence, SLA, assignee, stage.
- **Regras/validações:** separação de equipe quando policy exigir; decisão original imutável.
- **Ações:** atribuir; abrir; solicitar complemento; escalar; resolver.
- **Permissões/segurança:** appeal reviewer; SoD quando aplicável.
- **Estados:** new, assigned, reviewing, waiting_customer, resolved, closed.
- **Integrações/eventos:** AppealAssigned/Resolved.
- **Métricas:** backlog; resolution time; overturn rate.
- **Aceite:** resultado novo referencia decisão anterior e não a substitui silenciosamente.

### B18 — RECONCILIAÇÃO ENTRE FONTES

- **Objetivo:** tornar divergências entre declaração, fonte oficial e providers um objeto explícito de análise.
- **Layout/componentes:** comparação lado a lado; campo; valor por fonte; timestamps; confidence; source priority; disposition; evidence links.
- **Dados:** reconciliation_item_id, field/concept, source values, normalized values, versions, discrepancy type, disposition.
- **Regras/validações:** source priority configurável e não absoluta; divergência nunca some por último-write-wins.
- **Ações:** aceitar valor canônico com rationale; solicitar complemento; reconsultar fonte; escalar.
- **Permissões/segurança:** analyst/compliance; change canonical value exige authority conforme campo.
- **Estados:** no_conflict, conflict_open, source_unavailable, resolved, escalated.
- **Integrações/eventos:** DiscrepancyDetected/Resolved.
- **Métricas:** conflicts/case; source disagreement rate; resolution time.
- **Aceite:** decisão de reconciliação registra fontes, actor e motivo.

### B19 — FRAUDE / DEVICE / SESSION

- **Objetivo:** revisar sinais de device, sessão, identidade e antifraude relevantes ao onboarding.
- **Layout/componentes:** risk summary; device/session timeline; IP/geolocation safe view; velocity; injection/spoof flags; provider/source evidence.
- **Dados:** device/session IDs pseudonimizados, risk signals, timestamps, network metadata necessária, normalized reason codes.
- **Regras/validações:** não armazenar fingerprint/PII além do necessário; sinal não é decisão isolada; cross-tenant correlation somente por capability Mutual autorizada.
- **Ações:** revisar; marcar falso positivo; escalar fraude; solicitar nova verificação.
- **Permissões/segurança:** fraud/compliance; masking.
- **Estados:** low_signal, elevated, high_risk, inconclusive, unavailable, escalated.
- **Integrações/eventos:** FraudSignalReviewed, ReverificationRequested.
- **Métricas:** fraud signal rate; confirmed fraud; false positive; provider latency.
- **Aceite:** sinal mostra source/version e não expõe secret device internals.

### B20 — CAPACIDADE ECONÔMICA / ORIGEM DE RECURSOS

- **Objetivo:** analisar informações econômicas e origem de recursos quando requirement/segmento exigir.
- **Layout/componentes:** declared income/revenue/wealth/source; documents; external data; discrepancies; risk flags; notes.
- **Dados:** declared financial attributes, source_of_funds/source_of_wealth categories, evidence, source data, currency, period, normalized values.
- **Regras/validações:** moedas/períodos explícitos; não inferir criminalidade de divergência; dados só coletados quando base/purpose existir.
- **Ações:** comparar; solicitar evidência; registrar rationale; escalar EDD.
- **Permissões/segurança:** compliance/EDD; dados altamente sensíveis mascarados.
- **Estados:** not_required, pending, consistent, discrepancy, insufficient_evidence, EDD_required.
- **Integrações/eventos:** EconomicAssessmentReviewed, EDDRequested.
- **Métricas:** EDD rate; discrepancy; completion time.
- **Aceite:** cada número mostra moeda/período/fonte; consentimentos aplicáveis comprovados.

### B21 — LICENÇAS / AUTORIZAÇÕES REGULATÓRIAS

- **Objetivo:** verificar licenças, registros e autorizações exigidas pela atividade declarada.
- **Layout/componentes:** authority; license type; number/ref; jurisdiction; status; activities; dates; source; document; discrepancy.
- **Dados:** license_id/reference, regulator/source, jurisdiction, authorized activities, issue/expiry/status, evidence.
- **Regras/validações:** autoridade e nomenclatura dependem da jurisdição; status desconhecido não vira ativo.
- **Ações:** validar; abrir fonte; pedir documento; registrar exceção; escalar.
- **Permissões/segurança:** analyst/compliance.
- **Estados:** valid, expired, suspended, revoked, not_found, source_unavailable, manual_review.
- **Integrações/eventos:** RegulatoryLicenseReviewed.
- **Métricas:** not-found; expired; manual review.
- **Aceite:** atividade autorizada é comparável à atividade declarada e o mismatch vira finding.

### B22 — WORKSPACE INVESTIGATIVO + HFS

- **Objetivo:** fornecer ambiente de investigação relacional aprofundada integrando CAP-22 sem expor metodologia proprietária.
- **Layout/componentes:** canvas/grafo; entidade selecionada; relacionamentos; alertas/sinais; filters; evidence drawer; timeline; notes; hypotheses/findings; link para decisão.
- **Dados:** canonical IDs, graph edges/nodes permitidos, HFS signals/alerts, model_version, reason category, confidence quando publicável, evidence refs, health/degraded state.
- **Regras/validações:** HFS é capability interna Mutual; UI não expõe fórmulas, pesos, features ou thresholds; degraded mode visível; sinal precisa lineage.
- **Ações:** explorar; fixar entidades; filtrar; anexar evidence; registrar finding; escalar; enviar contexto para B12.
- **Permissões/segurança:** compliance/investigation capability; dados intertenant somente sob governança Mutual e finalidade autorizada.
- **Estados:** ready, partial_graph, model_degraded, signal_pending, no_signal, alert, investigation_open, investigation_closed.
- **Integrações/eventos:** HfsEnrichmentRequested/Received, InvestigationFindingRecorded.
- **Métricas:** HFS availability; alerts; investigation time; outcome by signal category.
- **Aceite:** operação continua de forma segura em degraded mode; methodology nunca aparece em payload de front/log.

## 4. SUPERFÍCIE C — ADMIN + DEVELOPER PLATFORM (C1–C24)

- **Princípio:** configuração como produto versionado. Requirements, flows, policies, produtos, routing e integrações nunca são “settings soltos”; possuem draft, validação, simulação, aprovação, publicação, rollback por versão e audit trail.

### C1 — DASHBOARD DO TENANT

- **Objetivo:** permitir gestão executiva e operacional do onboarding do tenant.
- **Layout/componentes:** período; KPI cards; funil; séries; breakdown por produto/segmento/jurisdição/canal; alerts; top drop-offs; provider health resumido; atalhos.
- **Dados:** aggregated cases, funnel events, decisions, SLA, costs, provider metrics, API/webhook stats, refresh counts.
- **Regras/validações:** métricas definidas por KPI Registry; timezone/denominador explícitos; dados financeiros marcados como estimados quando não contábeis.
- **Ações:** filtrar; drill-down; salvar visão; exportar relatório autorizado.
- **Permissões/segurança:** tenant_admin/product/analyst conforme widget; isolamento por tenant.
- **Estados:** normal, partial_data, stale_data, provider_degraded, no_data.
- **Integrações/eventos:** analytics read models; no write de domínio.
- **Métricas:** conversão, drop-off, STP, SLA, custo/case, provider latency/error/failover, API/webhooks.
- **Aceite:** definição/fonte/freshness disponíveis; filtro não altera denominador silenciosamente.

### C2 — REQUIREMENTS

- **Objetivo:** listar e governar requisitos que determinam o que deve ser coletado/verificado.
- **Layout/componentes:** tabela; filtros; status/version; scope chips; dependency count; usage; owner role; ações.
- **Dados:** requirement_id, name, description, type, applies_to, jurisdiction, segment, capability, condition, mandatory flag, version/status.
- **Regras/validações:** requirement published é imutável; edição cria draft version; dependências inválidas bloqueiam publicação.
- **Ações:** criar; duplicar; editar draft; visualizar uso; deprecar; abrir diff.
- **Permissões/segurança:** product/admin; publish separada.
- **Estados:** draft, valid, invalid, pending_approval, published, deprecated.
- **Integrações/eventos:** RequirementCreated/Published/Deprecated.
- **Métricas:** requirements ativos; drafts; conflicts; usage.
- **Aceite:** published version não editável em place; cada case registra versão aplicada.

### C3 — EDITOR DE REQUIREMENT

- **Objetivo:** editar condição, escopo e comportamento de um requirement de forma validável e simulável.
- **Layout/componentes:** metadata; applicability builder; capability/document selector; condition tree; validation errors; preview; impact analysis; diff.
- **Dados:** requirement schema, conditions, dependencies, evidence expectations, jurisdiction/segment/product scopes.
- **Regras/validações:** expressões tipadas; referência somente a campos/capabilities registrados; loops/dependências circulares bloqueados.
- **Ações:** salvar draft; validar; simular; comparar; submeter aprovação.
- **Permissões/segurança:** edit_requirement; publish separado.
- **Estados:** dirty, saved, validation_error, valid, pending_approval.
- **Integrações/eventos:** RequirementDraftUpdated, ValidationCompleted.
- **Métricas:** validation failures; change frequency.
- **Aceite:** simulador reproduz input/output; mudança sensível mostra impacto estimado.

### C4 — FLOWS

- **Objetivo:** listar jornadas/flows versionados por produto/segmento/jurisdição.
- **Layout/componentes:** tabela; status; version; steps; products; scopes; last published; active cases count.
- **Dados:** flow_id/version/status, node count, requirements, applicability, active pointer.
- **Regras/validações:** case existente mantém versão original salvo processo formal de migration/re-evaluation.
- **Ações:** criar; duplicar; editar; simular; publicar/deprecar.
- **Permissões/segurança:** tenant_product; publish authority separada.
- **Estados:** draft, pending, published, deprecated, incompatible.
- **Integrações/eventos:** FlowCreated/Published.
- **Métricas:** flows ativos; cases por version; publish frequency.
- **Aceite:** active pointer auditado; rollback ativa versão segura sem editar histórico.

### C5 — EDITOR DE FLOW

- **Objetivo:** montar fluxo visual/estruturado com steps e transições condicionais.
- **Layout/componentes:** canvas; nodes; connectors; properties drawer; conditions; entry/exit; validation; preview; simulator; diff.
- **Dados:** node IDs, step types, requirements, transitions, guards, messages, fallback, jurisdiction/segment overlays.
- **Regras/validações:** grafo sem nós órfãos; entrada/saída válidas; transições server-evaluable; nenhum provider brand como regra de flow.
- **Ações:** adicionar/remover node; conectar; validar; simular; salvar; submeter.
- **Permissões/segurança:** edit_flow; publish separado.
- **Estados:** draft, invalid_graph, valid, simulated, pending_approval.
- **Integrações/eventos:** FlowDraftUpdated.
- **Métricas:** validation errors; unreachable nodes; simulated paths.
- **Aceite:** todo path termina em estado permitido; simulador registra versão/input/result.

### C6 — POLICIES

- **Objetivo:** listar políticas de decisão, revisão, retries, fallback e alçada.
- **Layout/componentes:** tabela; scope; version; status; effective date; products; risk band; dependencies; owner.
- **Dados:** policy_id/version, ruleset ref, scope, priority, effective range, approval metadata.
- **Regras/validações:** prioridade/conflito detectados; published imutável; effective date controlada.
- **Ações:** criar; duplicar; abrir; compare; deprecar.
- **Permissões/segurança:** policy_editor; approval separado.
- **Estados:** draft, conflict, valid, pending_approval, published, revoked.
- **Integrações/eventos:** PolicyPublished/Revoked.
- **Métricas:** policies ativas; conflicts; decisions por version.
- **Aceite:** cada decisão/case referencia policy version aplicada.

### C7 — EDITOR DE POLICY

- **Objetivo:** construir regras explicáveis e testáveis sem codificar provider específico no domínio.
- **Layout/componentes:** rule tree/table; inputs; operators; outcomes; reason codes; authority; simulation cases; validation; diff.
- **Dados:** conditions, capability results, risk inputs, outcomes, manual review flags, restrictions, reason codes.
- **Regras/validações:** tipos/operadores registrados; unreachable rules detectadas; conflito/precedência explícitos; UNKNOWN/UNAVAILABLE tratados.
- **Ações:** editar; validar; executar testes/simulações; submeter.
- **Permissões/segurança:** edit_policy; approval checker.
- **Estados:** draft, invalid, conflict, valid, pending_approval.
- **Integrações/eventos:** PolicySimulationRun, PolicyDraftChanged.
- **Métricas:** rules exercised; conflict count; simulation pass.
- **Aceite:** resultado mostra rules fired/reason category; segredo/model methodology não exposto.

### C8 — SIMULAÇÃO

- **Objetivo:** testar requirements/flow/policy/produto antes da publicação.
- **Layout/componentes:** scenario input; fixture; jurisdiction/segment/product; versions; run; trace; expected vs actual; warnings.
- **Dados:** synthetic/test subject, inputs, selected versions, simulation output, trace/reason codes, provider mocks explicit.
- **Regras/validações:** dados sintéticos/anônimos por padrão; provider mock rotulado MOCK; simulação não cria case real.
- **Ações:** criar cenário; executar; comparar; salvar fixture; exportar resultado.
- **Permissões/segurança:** product/developer; ambiente sandbox.
- **Estados:** ready, running, pass, fail, warning, invalid_fixture.
- **Integrações/eventos:** SimulationExecuted.
- **Métricas:** scenarios; pass rate; coverage.
- **Aceite:** produção não é afetada; input/version/output reproduzíveis.

### C9 — PUBLICAÇÃO / VERSIONAMENTO

- **Objetivo:** controlar promoção de configurações para estado publicado.
- **Layout/componentes:** version list; diff; impact; validation summary; simulation evidence; approvals; effective time; rollback target.
- **Dados:** artifact_type/id, from/to versions, change set, approvers, evidence refs, effective_at, rollback refs.
- **Regras/validações:** maker-checker onde sensível; publicação só de versão valid; active pointer atômico; no edit de published.
- **Ações:** submeter; aprovar/rejeitar; agendar; publicar; revogar/rollback.
- **Permissões/segurança:** publish capability; checker != maker quando exigido.
- **Estados:** draft, pending_approval, approved, scheduled, published, rejected, rolled_back, revoked.
- **Integrações/eventos:** ConfigurationPublished/RolledBack.
- **Métricas:** lead time publish; failed publishes; rollbacks.
- **Aceite:** publicação gera audit + version + event; rollback preserva histórico.

### C10 — PROVIDERS / ROUTING

- **Objetivo:** configurar cobertura e roteamento por capability sem acoplar regras de negócio a marcas.
- **Layout/componentes:** capability matrix; providers; economic_group; countries; environments; health; SLA; cost; quality; primary/fallback; restrictions; simulator.
- **Dados:** Provider Registry, route rules, capabilities, jurisdiction coverage, economic_group, contract flags, timeout/retry/rate limits, health.
- **Regras/validações:** Serasa/idwall correlacionados; HFS não listado como terceiro; fallback independente validado; source oficial distinguida.
- **Ações:** criar route; ordenar; ativar/desativar; simular; definir degraded behavior; publicar.
- **Permissões/segurança:** provider_config; publish checker.
- **Estados:** active, degraded, disabled, contract_blocked, no_coverage, fallback_only.
- **Integrações/eventos:** RoutingConfigPublished, ProviderHealthChanged.
- **Métricas:** calls, latency, error, failover, cost, health score.
- **Aceite:** policy solicita capability; route resolve provider; nenhuma regra de negócio contém provider == marca.

### C11 — CUSTO / USO / MARGEM

- **Objetivo:** dar transparência de uso e economics operacionais do tenant sem confundir estimativa com contabilidade.
- **Layout/componentes:** period; cost cards; usage by capability/provider; volume; estimated revenue/margin; currency selector; trend; export.
- **Dados:** provider usage/cost events, contracted price tables, tenant billing model, currency, FX source when needed.
- **Regras/validações:** currency/source/period explícitos; estimated vs billed vs accounting status diferenciados.
- **Ações:** filtrar; drill-down; exportar; abrir cost anomaly.
- **Permissões/segurança:** tenant_finance/admin; supplier prices podem ser restritos.
- **Estados:** estimated, reconciled_usage, billing_pending, partial_cost, anomaly.
- **Integrações/eventos:** UsageRated, CostAnomalyDetected.
- **Métricas:** cost/case, cost/capability, margin estimate, provider spend.
- **Aceite:** total reconcilia com usage source; ausência de custo não vira zero silencioso.

### C12 — MARCA / TEMA / IDIOMA

- **Objetivo:** administrar white-label mantendo acessibilidade e semântica comum.
- **Layout/componentes:** logo; allowed color tokens; typography; theme preview; locale defaults; supported languages; contrast validator.
- **Dados:** brand assets, token overrides, locale list, fallback language, email/logo references.
- **Regras/validações:** somente tokens permitidos; contraste mínimo; semantic status colors protegidas; assets versionados.
- **Ações:** upload asset; editar tokens; preview; validate; publish.
- **Permissões/segurança:** tenant_brand_admin.
- **Estados:** draft, accessibility_error, valid, published.
- **Integrações/eventos:** BrandConfigPublished.
- **Métricas:** locale usage; brand validation failures.
- **Aceite:** white-label não altera labels críticos de segurança sem tradução aprovada.

### C13 — DOMÍNIO / E-MAIL / CANAIS

- **Objetivo:** configurar domínios, remetentes e canais de comunicação/hosted flow.
- **Layout/componentes:** domains; DNS verification; email sender; templates/channel bindings; status; certificates; callback URLs.
- **Dados:** domain, verification records, sender identity, channel config, allowed origins, callback/redirect URLs.
- **Regras/validações:** domain ownership; TLS; allowlists; redirect/callback exact match; email authenticity controls conforme stack.
- **Ações:** adicionar domínio; verificar; ativar; revogar; configurar canal.
- **Permissões/segurança:** tenant_developer/admin; secrets nunca reexibidos.
- **Estados:** pending_dns, verified, active, certificate_error, suspended.
- **Integrações/eventos:** DomainVerified/Activated.
- **Métricas:** delivery; domain errors; hosted sessions.
- **Aceite:** domínio não verificado não atende produção; callback aberto/wildcard não permitido sem ADR.

### C14 — USUÁRIOS / PAPÉIS

- **Objetivo:** administrar identidade de operadores do tenant e atribuição de roles/capabilities.
- **Layout/componentes:** user table; invitation; status; roles; capabilities; memberships; sessions; last access; revoke.
- **Dados:** user_id, tenant_membership, role_ids, capability grants, status, MFA state quando existir, sessions.
- **Regras/validações:** least privilege; role composition versionada; remover membership revoga acesso; não confiar em UI.
- **Ações:** convidar; ativar/desativar; atribuir/remover role; revogar sessão.
- **Permissões/segurança:** tenant_admin; ações privilegiadas auditadas; self-escalation bloqueada.
- **Estados:** invited, active, suspended, revoked, locked.
- **Integrações/eventos:** UserInvited, MembershipChanged, SessionsRevoked.
- **Métricas:** active users; dormant accounts; privilege changes.
- **Aceite:** negative tests provam denial; tenant A não administra B.

### C15 — ALÇADAS / SEGREGAÇÃO

- **Objetivo:** configurar authorities, thresholds qualitativos e SoD aplicável a decisões/publicações.
- **Layout/componentes:** authority levels; decision/action types; required roles; maker/checker rules; exceptions; simulation.
- **Dados:** authority_policy_id, action_type, scope, role/capability requirements, SoD pairs, exception rules.
- **Regras/validações:** maker != checker quando ativo; nulos não podem contornar regra; self-approval explicitamente negado.
- **Ações:** editar; simular cenário; submeter; aprovar/publicar.
- **Permissões/segurança:** security/compliance admin; maker-checker na própria configuração.
- **Estados:** draft, conflict, valid, pending, published.
- **Integrações/eventos:** AuthorityPolicyPublished.
- **Métricas:** blocked self-approvals; escalations; exceptions.
- **Aceite:** testes de chamada direta e DB comprovam SoD.

### C16 — API KEYS / WEBHOOKS

- **Objetivo:** administrar credenciais, scopes e endpoints de webhooks do tenant.
- **Layout/componentes:** environments; API credentials; scopes; created/last used; rotate/revoke; webhook endpoints; subscribed events; signing status; test delivery.
- **Dados:** credential_id, public metadata, secret last-four/fingerprint, scopes, tenant, environment, webhook endpoint, signing key reference, delivery policy.
- **Regras/validações:** secret mostrado uma única vez quando criado; rotation; least scope; endpoint HTTPS em produção; replay window/signature.
- **Ações:** criar; copiar secret no momento permitido; rotate; revoke; criar webhook; send test.
- **Permissões/segurança:** tenant_developer; reauth/MFA quando policy exigir; nunca armazenar secret no front state persistente.
- **Estados:** active, expired, revoked, rotation_pending, endpoint_unverified, webhook_degraded.
- **Integrações/eventos:** CredentialCreated/Rotated/Revoked, WebhookConfigured.
- **Métricas:** credentials active; webhook delivery success/failure.
- **Aceite:** secret não reaparece; revogação é imediata; delivery logs vinculados.

### C17 — AUDITORIA DE CONFIGURAÇÃO

- **Objetivo:** permitir revisão de mudanças administrativas e publicações.
- **Layout/componentes:** audit table; artifact; version; actor; action; before/after diff; approval; reason; correlation.
- **Dados:** configuration audit events, versions, actors, approvals, diff refs.
- **Regras/validações:** append-only; no raw secret in diff; changes grouped por transaction/correlation.
- **Ações:** filtrar; abrir diff; exportar audit autorizado.
- **Permissões/segurança:** audit_view; export separate.
- **Estados:** available, restricted, archived_by_retention.
- **Integrações/eventos:** ConfigAuditViewed.
- **Métricas:** config changes; emergency changes; rollbacks.
- **Aceite:** toda publicação C9 tem evento correspondente e diff recuperável.

### C18 — PROTEÇÃO DE DADOS

- **Objetivo:** governar privacy, retention, masking, subject rights e data lifecycle por tenant/jurisdição.
- **Layout/componentes:** data classes; purpose/legal basis; retention policies; residency; masking; legal holds; deletion/anonymization jobs; requests.
- **Dados:** data_category, jurisdiction, purpose, legal_basis, retention_period/status, residency, transfer rules, legal_hold refs.
- **Regras/validações:** execução server-side; legal hold bloqueia deletion; policy conflicts visíveis; consent vs obligation separados.
- **Ações:** criar/editar policy; simular impacto; submeter/publicar; abrir request de data subject quando suportado.
- **Permissões/segurança:** privacy/admin; high-risk changes maker-checker.
- **Estados:** draft, conflict, active, hold, deletion_due, execution_failed.
- **Integrações/eventos:** RetentionPolicyPublished, DeletionJobCompleted/Failed.
- **Métricas:** records due; holds; deletion SLA; privacy requests.
- **Aceite:** política registra jurisdição/base/purpose; deletion gera evidence/audit.

### C19 — PRODUTOS DE VERIFICAÇÃO

- **Objetivo:** definir produtos comercializáveis como composição de requirements/capabilities/flows/policies/packs.
- **Layout/componentes:** product list; status/version; target segment/jurisdiction; included capabilities; SLA/experience tier; dependencies.
- **Dados:** verification_product_id, composition refs, applicable packs, feature flags, published version.
- **Regras/validações:** produto não duplica regras internas; composição referencia artefatos versionados; coverage validation.
- **Ações:** criar; duplicar; editar; simular; publish.
- **Permissões/segurança:** product_admin.
- **Estados:** draft, invalid_composition, pending, published, deprecated.
- **Integrações/eventos:** VerificationProductPublished.
- **Métricas:** cases/product; conversion; cost; SLA.
- **Aceite:** case registra product version e todas versões dependentes.

### C20 — EDITOR DE PRODUTO

- **Objetivo:** editar composição, experiência, packs e políticas de um produto.
- **Layout/componentes:** metadata; supported subject types; jurisdictions; segments; flow/requirements/policy selectors; capabilities; pricing metadata opcional; preview.
- **Dados:** product configuration references, feature flags, hosted options, localization set.
- **Regras/validações:** compatibilidade entre pack/capability/provider coverage; conflitos bloqueiam publish.
- **Ações:** editar; validate; simulate; compare; submit.
- **Permissões/segurança:** product_admin.
- **Estados:** dirty, invalid, conflict, valid, pending_approval.
- **Integrações/eventos:** ProductDraftChanged.
- **Métricas:** validation errors; dependency conflicts.
- **Aceite:** nenhuma dependência é copiada por valor sem version ref.

### C21 — SIMULAÇÃO / CONFLITOS DE PRODUTO

- **Objetivo:** testar produto completo em cenários e detectar colisões de requirements/policies/providers.
- **Layout/componentes:** scenario matrix; jurisdictions; segments; subject types; expected steps; provider routes; warnings; cost estimate; trace.
- **Dados:** selected product version, fixtures, resolved requirements/flow/policies/routes, simulation result.
- **Regras/validações:** cenário sem cobertura de provider/source bloqueia ou marca explicitamente degraded conforme policy; correlated fallback alert.
- **Ações:** rodar; comparar; salvar fixture; gerar issue/gap.
- **Permissões/segurança:** product/developer.
- **Estados:** pass, warning, blocker, no_coverage, conflict, degraded_supported.
- **Integrações/eventos:** ProductSimulationExecuted.
- **Métricas:** conflict count; coverage gaps; estimated cost.
- **Aceite:** Serasa/idwall correlation detectável; HFS tratado internal capability.

### C22 — DEVELOPER / SANDBOX / SDK / HOSTED

- **Objetivo:** oferecer experiência de integração B2B internacional completa.
- **Layout/componentes:** getting started; environments; OpenAPI; auth; code examples; SDKs; hosted flow; sandbox data; event catalog; limits; status.
- **Dados:** API versions, endpoints, schemas, scopes, SDK releases, sandbox tenant/config, hosted URLs, changelog.
- **Regras/validações:** sandbox isolado; fixtures rotuladas; version de API; deprecation policy; no production secret in docs.
- **Ações:** testar request; criar sandbox credential; copiar example; launch hosted session; download SDK package/link quando disponível.
- **Permissões/segurança:** tenant_developer; scopes.
- **Estados:** sandbox_ready, service_degraded, version_deprecated, credential_required.
- **Integrações/eventos:** SandboxRequest, HostedSessionCreated.
- **Métricas:** API adoption; sandbox calls; integration success.
- **Aceite:** documentação corresponde ao OpenAPI publicado; exemplos executáveis em sandbox.

### C23 — LOGS API / WEBHOOK

- **Objetivo:** permitir troubleshooting seguro de integrações.
- **Layout/componentes:** request/delivery list; filters; status; latency; event type; endpoint; correlation/request/delivery IDs; masked payload summary; redelivery.
- **Dados:** API access log seguro, webhook delivery log, attempts, response code, latency, error_code, correlation.
- **Regras/validações:** payload secret/PII mascarado; retention; redelivery autorizada e idempotente.
- **Ações:** filtrar; abrir; copiar IDs; redeliver webhook; export metadata.
- **Permissões/segurança:** developer; reveal limitado; no auth token display.
- **Estados:** delivered, retrying, failed, DLQ/final, redelivered, expired_log.
- **Integrações/eventos:** WebhookRedeliveryRequested.
- **Métricas:** API success, P95, webhook delivery, retries.
- **Aceite:** redelivery preserva event/delivery lineage e não recria evento de domínio.

### C24 — NOTIFICAÇÕES / LOCALIZAÇÃO

- **Objetivo:** governar templates, canais, traduções e conteúdo por evento/jurisdição.
- **Layout/componentes:** template list; event trigger; channel; locale; version; preview; variables; fallback locale; delivery test.
- **Dados:** template_id/version, event_type, channel, locale, approved copy, variables schema, jurisdiction restrictions.
- **Regras/validações:** variáveis allowlisted; PII mínima; traduções versionadas; conteúdo regulatório aprovado por workflow quando aplicável.
- **Ações:** editar draft; preview; test; submit; publish/deprecate.
- **Permissões/segurança:** content/product admin; publish checker onde necessário.
- **Estados:** draft, missing_translation, invalid_variable, pending, published, deprecated.
- **Integrações/eventos:** NotificationTemplatePublished.
- **Métricas:** delivery/open quando aplicável; fallback locale usage; template errors.
- **Aceite:** mensagem enviada registra template version/locale; nenhum texto crítico fica hardcoded em componente.

## 5. SUPERFÍCIE D — CONSOLE INTERNO MUTUAL (D1–D14)

- **Princípio:** operação privilegiada multi-tenant com mínimo privilégio, justificativa, segregação, evidência e capacidade de reversão. O console Mutual não pode se tornar bypass dos controles do tenant ou do domínio.

### D1 — CLIENTES / TENANTS

- **Objetivo:** administrar tenants, provisioning e saúde contratual/técnica em nível global.
- **Layout/componentes:** KPI cards; tabela global; segmento; países/regiões; status; products; environment; health; provisioning; contacts/owner role; drill-down.
- **Dados:** tenant_id, legal/display name, regions, jurisdictions, segment packs, products, environment, status, provisioning metadata, risk/health summary.
- **Regras/validações:** tenant_id imutável; mudança de região/jurisdição passa por avaliação; nenhum operador vê PII de cases por padrão.
- **Ações:** abrir tenant; ativar/suspender feature sob autoridade; revisar provisioning; acessar suporte assistido.
- **Permissões/segurança:** mutual_ops/platform_admin; JIT/justification para ações privilegiadas quando aplicável.
- **Estados:** provisioning, active, restricted, suspended, degraded, offboarding.
- **Integrações/eventos:** TenantProvisioned/StatusChanged.
- **Métricas:** tenants ativos; volume; regions; health.
- **Aceite:** ações privilegiadas auditadas; nenhuma operação cross-tenant implícita.

### D2 — PROVIDER HEALTH

- **Objetivo:** monitorar qualidade e disponibilidade de providers/fontes por capability, região e grupo econômico.
- **Layout/componentes:** health score; status matrix; provider/economic_group; capability; region; latency/error; circuit state; incidents; trends.
- **Dados:** telemetry, routing stats, SLA metadata, economic_group, provider version/environment, incident refs.
- **Regras/validações:** health score fórmula versionada; correlated providers agrupados; source oficial distinguida de comercial.
- **Ações:** drill-down; abrir incidente; colocar route em degraded/disable sob autoridade; acompanhar fallback.
- **Permissões/segurança:** mutual_ops/platform_admin; critical action maker-checker.
- **Estados:** healthy, degraded, partial_outage, outage, maintenance, contract_blocked.
- **Integrações/eventos:** ProviderHealthChanged, RouteDegraded.
- **Métricas:** uptime, P95/P99, error, failover, SLA breach.
- **Aceite:** Serasa/idwall não apresentados como redundância independente; mudança de route gera audit.

### D3 — MARGEM / CUSTOS

- **Objetivo:** consolidar economics operacionais por tenant/produto/capability/provider.
- **Layout/componentes:** revenue estimate/billed; direct cost; margin estimate; usage; currency; FX source; anomalies; trend; breakdown.
- **Dados:** usage/rating, contracts/pricing, tenant billing data, cost events, currencies, reconciled status.
- **Regras/validações:** não confundir margem estimada com contabilidade oficial; status de reconciliação explícito.
- **Ações:** filtrar; investigar anomalia; exportar para controladoria; marcar divergência.
- **Permissões/segurança:** Mutual finance/ops roles; supplier contract price restrito.
- **Estados:** estimated, usage_reconciled, billing_reconciled, partial, anomaly_open.
- **Integrações/eventos:** CostAnomalyOpened/Resolved.
- **Métricas:** cost/case, spend/provider, margin estimate, variance.
- **Aceite:** fonte e moeda de cada valor identificáveis; zero não substitui dado ausente.

### D4 — KILL SWITCH

- **Objetivo:** interromper controladamente capability, route, provider, tenant feature ou função crítica durante incidente/risco.
- **Layout/componentes:** estado atual; target/scope; blast radius; dependencies; reason; evidence; approvers; planned duration; rollback; confirmation reforçada.
- **Dados:** kill_switch_id, target_type/id, scope, reason, severity, maker/checker, activated_at, expiry, rollback plan, audit/evidence refs.
- **Regras/validações:** deny-by-default em escopo afetado; maker-checker obrigatório para produção salvo procedimento emergencial formal; TTL opcional; rollback testado.
- **Ações:** propor; aprovar; ativar; estender; desativar/rollback.
- **Permissões/segurança:** mutual_security/platform_admin; reauth/MFA se disponível; nunca ação invisível.
- **Estados:** inactive, proposed, pending_approval, active, expiring, rolled_back, failed_activation.
- **Integrações/eventos:** KillSwitchProposed/Activated/Deactivated.
- **Métricas:** switches ativos; duração; incident relation.
- **Aceite:** toda ativação possui motivo/actor/scope/evidence; UI mostra impacto antes da confirmação.

### D5 — GOVERNANÇA DE MODELOS

- **Objetivo:** governar HFS e outros modelos/scores internos/externos com versões, validação e controles de produção.
- **Layout/componentes:** model registry; owner role; version; status; validation evidence; monitoring; drift/quality; deployment region; degraded mode; rollback.
- **Dados:** model_id/version, purpose, input/output contract, validation status, approved jurisdictions/use cases, performance metrics, health, release refs.
- **Regras/validações:** metodologia proprietária segregada; versão sem validação não promove; independent validation quando aplicável.
- **Ações:** registrar versão; anexar validação; aprovar uso; activate/deactivate; rollback; kill switch.
- **Permissões/segurança:** mutual_model_gov + checker; secrets/features sensíveis não expostos.
- **Estados:** draft, validation, approved, active, degraded, suspended, retired.
- **Integrações/eventos:** ModelVersionApproved/Activated/RolledBack.
- **Métricas:** health, drift, alerts, degraded time, decision impact.
- **Aceite:** case/evidence referencia model_version; rollback preserva lineage.

### D6 — CAPABILITY CATALOG

- **Objetivo:** governar CAP-01..CAP-22, contratos, readiness, coverage e dependências.
- **Layout/componentes:** capability table; description; owner role; status; providers/internal implementations; jurisdictions; dependencies; gates; test/evidence coverage.
- **Dados:** capability_id, contract version, status, dependencies, implementation refs, providers, jurisdictions, risk/gap/gate refs.
- **Regras/validações:** IDs preservados; capability só READY com critérios completos; CAP-22 marcada INTERNAL/MUTUAL OWNED.
- **Ações:** abrir detail; atualizar status governado; linkar evidence/gap; comparar versões.
- **Permissões/segurança:** program governance/platform admin; status promotion controlada.
- **Estados:** discovered, specified, ready, in_progress, code_complete, integrated, QA, UAT, released, blocked.
- **Integrações/eventos:** CapabilityStatusChanged.
- **Métricas:** ready/blocked; coverage; gate contribution.
- **Aceite:** CODE_COMPLETE != DONE; evidência obrigatória para promoção.

### D7 — SUPORTE A CASOS

- **Objetivo:** permitir suporte avançado a casos sem quebrar isolamento ou decisão de compliance.
- **Layout/componentes:** search por IDs autorizados; case summary; tenant; problem category; timeline técnica; support actions; impersonation/assist status quando existir.
- **Dados:** support_case_id, onboarding case refs, technical errors, correlation IDs, user/session status mínimo, allowed actions.
- **Regras/validações:** suporte não aprova/rejeita sem authority; acesso a PII JIT; toda visualização privilegiada auditada.
- **Ações:** abrir contexto; reenviar notificação; desbloquear fluxo somente sob regra; escalar engineering/compliance.
- **Permissões/segurança:** mutual_support; privileged reveal justificado.
- **Estados:** open, investigating, waiting_tenant, escalated, resolved.
- **Integrações/eventos:** SupportAccessGranted, SupportActionExecuted.
- **Métricas:** ticket SLA; top errors; privileged accesses.
- **Aceite:** nenhum bypass de tenant/SoD; suporte deixa trilha completa.

### D8 — TRILHA DE ACESSO MUTUAL

- **Objetivo:** auditar acessos e ações privilegiadas de operadores Mutual sobre tenants/cases/configurações.
- **Layout/componentes:** actor; role; tenant; object; action; reason; grant/JIT session; timestamp; correlation; export.
- **Dados:** privileged_access_event, actor, scopes, reason/ticket, target, duration, action result.
- **Regras/validações:** append-only; ausência de justificativa bloqueia acesso quando policy exige; retention elevada.
- **Ações:** filtrar; investigar; exportar; abrir incidente.
- **Permissões/segurança:** security/audit; operador não edita seu próprio log.
- **Estados:** authorized, denied, expired_grant, suspicious, under_review.
- **Integrações/eventos:** PrivilegedAccessLogged, AccessAnomalyDetected.
- **Métricas:** accesses/tenant; denied; unusual patterns.
- **Aceite:** toda ação D1–D14 privilegiada correlaciona actor/reason.

### D9 — PROVISIONING / REGIÃO / FEATURES

- **Objetivo:** controlar ativação técnica de tenants, ambientes, regiões, features e packs.
- **Layout/componentes:** tenant selector; environment; regions; jurisdiction packs; segment packs; feature flags; dependencies; config status; rollout.
- **Dados:** provisioning config, feature flag/version, region availability, data residency, dependencies, rollout state.
- **Regras/validações:** feature sem dependência não ativa; região exige residency/security baseline; sandbox ≠ production.
- **Ações:** provision; validate; schedule rollout; enable/disable; rollback.
- **Permissões/segurança:** platform_admin; maker-checker para produção.
- **Estados:** draft, validating, ready, scheduled, active, partial, rollback.
- **Integrações/eventos:** TenantFeatureChanged, RegionActivated.
- **Métricas:** tenants/region; rollout failures; feature adoption.
- **Aceite:** produção não aceita TENANT_DEV; mudanças versionadas.

### D10 — FORNECEDORES / THIRD-PARTY RISK

- **Objetivo:** governar risco operacional, jurídico, privacidade, concentração e continuidade de fornecedores.
- **Layout/componentes:** provider registry; legal entity; economic_group; capabilities; countries; contracts/DPA; subprocessors; SLA; incidents; exit plan; concentration.
- **Dados:** supplier/provider governance metadata, contract refs, risk assessments, certifications, outages, dependencies.
- **Regras/validações:** provider operacional não é aprovado apenas por API funcionar; contract/DPA/residency/exit gaps destacados.
- **Ações:** review; update risk; attach evidence; restrict new routing; open remediation.
- **Permissões/segurança:** procurement/risk/platform governance.
- **Estados:** onboarding, approved, approved_with_restriction, remediation, suspended, exit_planned.
- **Integrações/eventos:** ThirdPartyRiskChanged.
- **Métricas:** concentration; open issues; contract expiry; incidents.
- **Aceite:** economic_group obrigatório; fallback independence verificável.

### D11 — JURISDIÇÕES / BASELINE NORMATIVO

- **Objetivo:** governar quais países/jurisdições estão suportados, em que maturidade e sob quais requisitos.
- **Layout/componentes:** jurisdiction registry; status; identifiers/documents; official sources; privacy/retention; supported segments/products; providers; legal/compliance approvals; gaps.
- **Dados:** jurisdiction_pack version, country/region, regulatory baseline refs, data residency, legal basis, official sources, supported capabilities.
- **Regras/validações:** país não vira homologado sem legal/compliance/provider/test gates; BR é primeiro pack, não modelo universal.
- **Ações:** criar draft pack; compare; review; approve; deprecate.
- **Permissões/segurança:** governance/legal/compliance roles.
- **Estados:** proposed, research, legal_review, technical_ready, UAT, homologated, restricted, suspended.
- **Integrações/eventos:** JurisdictionStatusChanged.
- **Métricas:** supported countries; coverage gaps; provider availability.
- **Aceite:** status “homologated” exige evidências vinculadas.

### D12 — SEGURANÇA / PRIVACIDADE / INCIDENTES

- **Objetivo:** centralizar incidentes, privacy/security posture e ações de contenção relacionadas ao produto.
- **Layout/componentes:** incident queue; severity; tenant/region/service impact; detection; timeline; containment; data classes; regulator/customer notification status; actions.
- **Dados:** incident_id, severity, scope, affected services/tenants/data, timestamps, evidence, containment actions, approvals.
- **Regras/validações:** incident response não altera evidência; acesso restrito; breach/privacy workflow separado quando necessário.
- **Ações:** declare incident; assign; activate containment/kill switch; update status; close with RCA refs.
- **Permissões/segurança:** mutual_security/privacy; highly restricted.
- **Estados:** suspected, declared, investigating, contained, recovering, monitoring, closed.
- **Integrações/eventos:** IncidentDeclared/Contained/Closed.
- **Métricas:** open incidents, MTTA/MTTR, severity, repeat incidents.
- **Aceite:** timeline auditável; containment actions correlacionadas a D4/D2/D13.

### D13 — PLATFORM HEALTH / JOBS / QUEUES / WEBHOOKS

- **Objetivo:** operar saúde técnica da plataforma e dependências assíncronas.
- **Layout/componentes:** service health; request/error/latency; worker/queue backlog; job failures; webhook deliveries; DB/storage; internal capability health; alerts.
- **Dados:** metrics/traces/log summaries, queue depth, job status, retry/DLQ, service version, region, deploy refs.
- **Regras/validações:** telemetria sem PII; health SLO versionado; alert thresholds governados.
- **Ações:** drill-down; retry job autorizado; pause worker/route; open incident; link deploy.
- **Permissões/segurança:** platform_ops/security; retry idempotente.
- **Estados:** healthy, degraded, backlog, partial_outage, outage, maintenance.
- **Integrações/eventos:** PlatformHealthChanged, JobRetried.
- **Métricas:** uptime, P95/P99, error, queue age, DLQ, webhook success, HFS health.
- **Aceite:** correlation_id permite seguir request→job→provider→event; retry não duplica effect.

### D14 — COCKPIT DE HOMOLOGAÇÃO / RELEASE

- **Objetivo:** consolidar readiness real de screens, capabilities, CI, QA, gaps, riscos e evidências antes de release.
- **Layout/componentes:** release candidate; commit/PR; CI status; CAP readiness; screen coverage; open gaps/blockers; security/QA/UAT gates; evidence; waivers; go/no-go.
- **Dados:** release_id, git refs, CI runs, test summaries, screen/capability registries, gate results, evidence refs, waiver/approvals, deployment/verification refs.
- **Regras/validações:** nenhum KPI substitui evidência; blocker crítico impede GO salvo governance excepcional formal; code complete não é release ready.
- **Ações:** create candidate; attach evidence; run gate review; record waiver; approve/reject release; mark production verification.
- **Permissões/segurança:** release governance; checker; no self-approve for critical release where policy demands.
- **Estados:** assembling, QA, UAT, blocked, ready_for_release, approved, rejected, deployed, production_verified, rolled_back.
- **Integrações/eventos:** ReleaseCandidateCreated, ReleaseApproved, ProductionVerified.
- **Métricas:** screen coverage/80; capability readiness; blockers; test pass; change failure; rollback.
- **Aceite:** release possui cadeia requirement→task→PR/commit→CI→test→evidence→gate→deploy→verification.

## 6. CRITÉRIOS TRANSVERSAIS PARA AS 80 TELAS

1) Tenant e actor context resolvidos no servidor. 2) Permissão por capability/action e negative tests. 3) Dados com fonte/lineage quando aplicável. 4) Estados loading/empty/error/degraded/access-denied. 5) Acessibilidade AA e navegação por teclado. 6) Responsividade conforme superfície. 7) i18n/locale sem hardcode Brasil como estrutura universal. 8) PII minimizada e masking por padrão. 9) Ações críticas com confirmação, rationale e audit. 10) Observabilidade com correlation_id. 11) Testes positivos/negativos. 12) Evidência vinculada ao Screen ID.


## 7. CLASSIFICAÇÃO DE MATURIDADE

REAL: comportamento completo comprovado. PARTIAL: parte funcional, gap conhecido. UI_ONLY: interface sem backend/controle suficiente. PROTOTYPE: demonstração navegável. MOCK: dado/integração simulada. NOT_EVIDENCED: ainda não auditado. A promoção para homologação depende de evidência real no repositório canônico.

REGRA DE MATURIDADE DOCUMENTAL

As 80 funções A1–D14 descritas neste documento são o contrato funcional canônico. Uma função pode estar CANONICAL e simultaneamente NOT_EVIDENCED, PARTIAL, UI_ONLY, PROTOTYPE ou ABSENT no código. A D2 fará o mapping Design × Código sem alterar silenciosamente o contrato funcional.


---

# PARTE 2 — DASHBOARDS, KPIs, FILTROS E RELATÓRIOS (ONB-UX-005 v1.0)

Versão 1.0 | Status: CANONICAL ANALYTICS SPEC — métricas individuais podem permanecer REVIEW_REQUIRED quando fórmula/fonte/owner não estiverem fechados.


## 1. OBJETIVO

Definir o sistema de gestão visual do produto. Dashboard não é decoração: cada KPI deve possuir definição, fórmula, fonte, granularidade, timezone, freshness, filtros, owner por papel e comportamento quando dado estiver parcial ou indisponível. Métrica sem denominador/fonte explícitos não pode ser promovida a CANONICAL.


## 2. PRINCÍPIOS

- KPIs operacionais e financeiros têm fonte e período explícitos.
- Dados estimados, reconciliados e oficiais são visualmente distintos.
- Todo dashboard suporta drill-down para o objeto que explica o número quando autorização permitir.
- Filtros são tenant-safe e aparecem em exports.
- Freshness e estado parcial/degradado são visíveis.
- Nenhum score interno ou provider substitui decisão de compliance.
- Brasil e internacional compartilham o core de métricas; jurisdição/locale/timezone são dimensões, não forks.

## 3. DASHBOARD DA JORNADA / FUNIL


**Superfícies:** C1 e D1; A14 mostra somente status individual do case.


**Blocos:** iniciados; em progresso; submetidos; aprovados; rejeitados; pendentes; funil por etapa; drop-off; tempo por etapa; retry de documento; retry de biometria; sessões expiradas; canal/device/locale.


**KPIs principais:** 

- **KPI-JRN-001** Taxa início→submissão = cases submetidos / cases iniciados.
- **KPI-JRN-002** Drop-off por etapa = abandonos na etapa / entradas na etapa.
- **KPI-JRN-003** Tempo médio até submissão = média(submitted_at - started_at).
- **KPI-JRN-004** Retry documental = cases com recaptura / cases com captura documental.
- **KPI-JRN-005** Retry biometria = cases com nova tentativa / cases com biometria.
- **KPI-JRN-006** Save/resume rate = jornadas retomadas / jornadas iniciadas.
- **KPI-JRN-007** Sessão expirada = sessões expiradas / sessões abertas.
- **KPI-JRN-008** Complement completion = complementos respondidos / complementos enviados.
- **KPI-JRN-009** Convite delegado concluído = delegados concluídos / convites válidos enviados.

**Filtros:** tenant, produto, segmento, jurisdição, país, subject type, canal, device class, idioma/locale, período, flow version, policy version.


**Visualizações recomendadas:** cards + funil + linha temporal + barras de drop-off por etapa + breakdown por jurisdição/device. Não usar pizza para séries temporais.


## 4. DASHBOARD OPERACIONAL DO ANALISTA


**Superfícies:** B1 e B17.


**Blocos:** backlog; unassigned; aging; SLA; prioridade; owner; manual review; escalation; approval/rejection; appeals.


**KPIs:** 

- **KPI-OPS-001** Backlog aberto = count(cases em estados operacionais abertos).
- **KPI-OPS-002** Aging médio = média(now - entered_queue_at) para backlog aberto.
- **KPI-OPS-003** SLA dentro do prazo = casos fechados dentro SLA / casos fechados elegíveis.
- **KPI-OPS-004** Throughput = decisões concluídas por analista/dia útil ou período configurado.
- **KPI-OPS-005** Manual review rate = cases que entraram em revisão humana / total de cases.
- **KPI-OPS-006** Approval rate = aprovados / decisões finais.
- **KPI-OPS-007** Rejection rate = rejeitados / decisões finais.
- **KPI-OPS-008** Escalation rate = cases escalados / cases analisados.
- **KPI-OPS-009** Touch time = soma de períodos de trabalho ativo humano por case.
- **KPI-OPS-010** Waiting customer time = tempo acumulado em waiting_customer.
- **KPI-OPS-011** Appeal rate = contestations / decisions eligible for appeal.
- **KPI-OPS-012** Appeal overturn rate = decisões alteradas na revisão / appeals resolvidos.

**Filtros:** tenant, produto, segmento, jurisdição, PF/PJ, status, risk band, priority, owner/equipe, SLA, capability, pendência, data de entrada, data de decisão.


**Visualizações:** KPI cards; aging buckets; backlog por status; throughput por equipe; SLA trend; queue table.


**Regra:** produtividade nunca deve incentivar aprovação/rejeição sem qualidade; KPIs de velocidade precisam ser lidos junto com QA/rework/appeal.


## 5. DASHBOARD DE QUALIDADE E COMPLIANCE


**Superfícies:** B8, B18, B19, B20, B21, C1, D14.


**KPIs:** 

- **KPI-CMP-001** Potential hit rate = screenings com potential hit / screenings executados.
- **KPI-CMP-002** Confirmed hit rate = confirmed hits / potential hits analisados.
- **KPI-CMP-003** False positive rate = false positives / potential hits analisados.
- **KPI-CMP-004** Inconclusive evidence rate = evidências inconclusive/unknown / evidências geradas.
- **KPI-CMP-005** Evidence unavailable rate = execuções unavailable / execuções solicitadas.
- **KPI-CMP-006** Discrepancy rate = cases com divergência aberta / cases analisados.
- **KPI-CMP-007** Discrepancy resolution time = média(resolved_at - detected_at).
- **KPI-CMP-008** EDD rate = cases enviados a EDD / cases analisados.
- **KPI-CMP-009** Regulatory license exception rate = cases com licença ausente/expirada/restrita / cases em que CAP-13 é requerida.
- **KPI-CMP-010** Refresh overdue rate = refresh vencidos não concluídos / refresh due.

**Filtros:** capability, source/provider, economic_group, jurisdiction, segment, product, policy version, evidence status, reason category, period.


**Regra:** “false positive” só é contabilizado após disposition formal; unknown não entra como pass.


## 6. DASHBOARD DE DOCUMENTOS E IDENTIDADE


**Superfícies:** A5/A6 telemetria; B7/B19; C1; D2.


**KPIs:** 

- **KPI-ID-001** Document processing success = docs processados sem erro técnico / docs processados.
- **KPI-ID-002** Document quality retry = docs com recaptura / docs enviados.
- **KPI-ID-003** Document expiry exposure = docs vencidos ou vencendo em janela configurada / docs ativos.
- **KPI-ID-004** Biometric success = attempts PASS / attempts concluídos.
- **KPI-ID-005** Biometric inconclusive = inconclusive / attempts concluídos.
- **KPI-ID-006** Biometric retry = cases com >1 attempt / cases biometria.
- **KPI-ID-007** Assisted verification rate = assistance requests / jornadas.

**Filtros:** document type, issuing country, provider, device, browser, jurisdiction, outcome, reason code, period.


**Regra:** métricas biométricas não exibem imagem/frame bruto e não expõem metodologia antifraude confidencial.


## 7. DASHBOARD DE PROVIDERS E ROUTING


**Superfícies:** C10 e D2.


**KPIs:** 

- **KPI-PLT-003** Provider latency P95.
- **KPI-PLT-004** Provider error rate = erros normalizados / chamadas.
- **KPI-PLT-005** Failover rate = chamadas que acionaram fallback / chamadas elegíveis.
- **KPI-PRV-001** Availability = chamadas tecnicamente disponíveis / chamadas.
- **KPI-PRV-002** Timeout rate = timeouts / calls.
- **KPI-PRV-003** Inconclusive by provider = outcomes inconclusive / completed calls.
- **KPI-PRV-004** Cost/call = custo atribuído / calls faturáveis.
- **KPI-PRV-005** Independent fallback coverage = capabilities com fallback economicamente independente / capabilities que exigem HA.
- **KPI-MUT-008** Provider health score = composição versionada de availability, latency, error, timeout e circuit state. Fórmula final deve ser aprovada antes de CANONICAL.

**Filtros:** provider, economic_group, capability, country, region, environment, version, primary/fallback, time range.


**Regra:** Serasa/idwall são correlacionados; health não deve representar um como redundância independente do outro.


## 8. DASHBOARD DE API / WEBHOOK / DEVELOPER EXPERIENCE


**Superfícies:** C22, C23, D13.


**KPIs:** 

- **KPI-PLT-006** Webhook delivery success = deliveries successful / attempts elegíveis.
- **KPI-PLT-007** API success = requests successful conforme contrato / requests válidos.
- **KPI-DEV-001** API P95 latency.
- **KPI-DEV-002** 4xx rate por endpoint/client, separando autenticação, validação, rate limit e negócio.
- **KPI-DEV-003** 5xx rate por endpoint/version.
- **KPI-DEV-004** Webhook retry rate.
- **KPI-DEV-005** DLQ/final failure count.
- **KPI-DEV-006** Sandbox→production activation funnel.
- **KPI-DEV-007** Active credentials / credentials unused beyond policy window.

**Filtros:** tenant/client, environment, endpoint, API version, scope, event_type, webhook endpoint, response class, period.


**Regra:** dashboard nunca exibe token/API secret. Payloads são mascarados e limitados por retention.


## 9. DASHBOARD MULTI-TENANT MUTUAL


**Superfícies:** D1, D3, D13.


**KPIs:** 

- **KPI-MUT-001** Tenants ativos.
- **KPI-MUT-002** Volume global de cases.
- **KPI-MUT-003** Disponibilidade da plataforma.
- **KPI-MUT-004** Incidentes abertos.
- **KPI-MUT-005** Margem estimada = receita estimada/billed - custos diretos atribuíveis; não equivale a resultado contábil oficial.
- **KPI-MUT-010** P95/P99 por serviço/region.
- **KPI-MUT-011** Queue age máximo/P95.
- **KPI-MUT-012** Failed jobs / retried jobs.
- **KPI-MUT-013** Tenant health score — composição a formalizar; não canonicalizar sem fórmula e owner.

**Filtros:** tenant, region, jurisdiction, segment, product, environment, service, severity, provider/economic_group, period.


**Regra:** operador Mutual só faz drill-down em dados de tenant/case quando possuir privilege/purpose e trilha.


## 10. DASHBOARD HFS / MODEL GOVERNANCE


**Superfícies:** D5, D13, B22.


**KPIs:** 

- **KPI-MUT-009** HFS health/degraded state.
- **KPI-HFS-001** Requests/period.
- **KPI-HFS-002** Signal/alert rate por reason category permitida.
- **KPI-HFS-003** Processing latency P95.
- **KPI-HFS-004** Degraded mode duration.
- **KPI-HFS-005** Model version coverage = cases processados por version.
- **KPI-HFS-006** Investigation outcome by signal category — somente categorias não proprietárias aprovadas.

**Regra:** não exibir pesos, fórmulas, features ou thresholds proprietários. Métrica de “efetividade” exige definição e validação independente antes de promoção.


## 11. DASHBOARD DE HOMOLOGAÇÃO / RELEASE


**Superfície:** D14.


**KPIs:** 

- **KPI-MUT-006** Capabilities bloqueadas.
- **KPI-MUT-007** Cobertura de telas homologadas = Screen IDs PASS / 80.
- **KPI-REL-001** Test pass rate por suite/gate.
- **KPI-REL-002** Critical blockers open.
- **KPI-REL-003** Security findings por severity.
- **KPI-REL-004** UAT pass rate.
- **KPI-REL-005** Change failure rate = releases com rollback/incidente atribuível / releases.
- **KPI-REL-006** Production verification coverage = releases verificadas / releases implantadas.

**Filtros:** release, branch/commit, wave, capability, screen surface, gate, severity, owner role, environment.


**Regra:** score agregado nunca substitui blocker. Um blocker crítico permanece visível mesmo com 99% de cobertura.


## 12. FILTROS PADRÃO

FLT-001 Tenant; FLT-002 Produto; FLT-003 Segmento; FLT-004 Jurisdição/País; FLT-005 Subject Type; FLT-006 Status; FLT-007 Risk Band; FLT-008 Período; FLT-009 Owner/Analista; FLT-010 Prioridade; FLT-011 SLA; FLT-012 Capability; FLT-013 Provider; FLT-014 Economic Group; FLT-015 Origem/Canal; FLT-016 Ambiente; FLT-017 Versão; FLT-018 Health; FLT-019 Severity; FLT-020 Release/Gate.

Filtros devem possuir URL/state apenas quando seguro; identificadores sensíveis não devem ir para URL pública. Views salvas são por usuário/tenant. Clear filters deve restaurar baseline definido. Export deve registrar filtros ativos.


## 13. BUSCA

Busca global operacional permitida por Case ID, Entity/Subject ID, identificador mascarado/permitido, invitation/delegate ID quando aplicável e correlation/request/delivery IDs nos módulos técnicos. Busca exata de identificador sensível deve ter logging e rate limiting. Resultado de outro tenant nunca deve ser inferível por diferença de mensagem/tempo.


## 14. RELATÓRIOS E EXPORTS

RPT-001 Funil de onboarding; RPT-002 SLA e backlog; RPT-003 Decisões e reason categories; RPT-004 Evidence coverage; RPT-005 Provider performance/cost; RPT-006 API/webhook health; RPT-007 Refresh/revalidation; RPT-008 Appeals; RPT-009 Audit/privileged access; RPT-010 Release/homologation; RPT-011 Usage/cost/margin estimate; RPT-012 Jurisdiction/segment coverage.

Cada relatório define: purpose, audience, columns, masking, filters, period/timezone, export format, retention, classification e audit requirement. Export sensível gera export_id, artifact hash, requester, purpose, timestamps e download audit.


## 15. FRESHNESS E QUALIDADE DE DADO

Cada widget deve possuir as_of/freshness quando não for tempo real. Estados mínimos: current, delayed, partial, stale, unavailable. Nenhum componente deve renderizar zero para dado ausente. Reconciliação de custos, decisões e provider calls deve declarar o conjunto de eventos incluídos/excluídos.


## 16. PADRÃO DE DRILL-DOWN

KPI → dimensão → lista de objetos → objeto/case/evidence permitido. O drill-down deve preservar filtros e autorização. Exemplo: Provider error rate → provider/capability → calls agregadas → request IDs permitidos → evidence/case somente para papel autorizado.


## 17. HOMOLOGAÇÃO DE DASHBOARDS

Um dashboard passa quando: fórmulas revisadas; source tables/events identificados; timezone e freshness definidos; filtros testados; denominador testado em edge cases; partial/unavailable testados; tenant isolation comprovada; export/masking testados; acessibilidade; performance para volume alvo; nenhum secret/PII indevida; métricas comparadas a amostra de fonte.


## 18. REGISTRY

O Google Sheets ONB-UX-002 permanece o registry vivo. Este documento é a especificação de interpretação, visualização e governança dos KPIs e filtros; novas métricas devem receber ID antes de implementação.


## REGRA DE MATURIDADE DOCUMENTAL

Este documento é CANONICAL como sistema de definição e governança analítica. Isso não promove automaticamente cada KPI para operacional/REAL. Métricas cuja fórmula, fonte, owner, denominador ou freshness ainda estejam explicitamente a formalizar permanecem REVIEW_REQUIRED até fechamento no registry e evidência de instrumentação.


---

## Nota de consolidação

- A Parte 1 preserva integralmente as 80 especificações funcionais A1–A20, B1–B22, C1–C24 e D1–D14 do ONB-UX-004, com os 10 campos de especificação por tela (objetivo; layout/componentes; dados; regras/validações; ações; permissões/segurança; estados; integrações/eventos; métricas; critérios mínimos de aceite), além dos critérios transversais e da classificação de maturidade.
- A Parte 2 preserva integralmente o ONB-UX-005: dashboards por superfície, catálogo ampliado de KPIs (KPI-JRN, KPI-OPS, KPI-CMP, KPI-ID, KPI-PLT, KPI-PRV, KPI-DEV, KPI-MUT, KPI-HFS, KPI-REL), filtros FLT-001..020, busca, relatórios RPT-001..012, freshness, drill-down e homologação analítica.
- O detalhamento tabular por KPI (unidade, fórmula, dimensões, telas alvo) está no documento 08 (aba DASHBOARD_KPI do ONB-UX-002).
