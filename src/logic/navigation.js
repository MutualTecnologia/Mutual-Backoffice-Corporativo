/**
 * A árvore de navegação do backoffice.
 *
 * Duas fontes, e elas discordavam:
 *
 *   O `src/config/navigation.ts` do prototipo-vite-backoffice (401 linhas)
 *   organiza em dois grupos — VISÃO USUÁRIO e MENU ADMINISTRATIVO. É a IA que
 *   já existe e foi validada em ~89 rotas, e o inventário de itens dela é o
 *   melhor que há.
 *
 *   O `CONVERSA_E_DECISOES_DISPONIVEIS.md` propõe seis pacotes — Operação OTC,
 *   Liquidação Fiat, Ativos Digitais, Onboarding e Compliance, Risco e Fraude,
 *   Governança e Segurança.
 *
 * Nenhuma das duas foi adotada como primeiro nível. O §2 da memória
 * institucional (`MTC-GOV-MEM-2026-001`) define o modelo mental oficial da
 * Mutual Pay em **quatro esteiras** — ONBOARD, PAAS, OTC e SALA DE CONTROLE /
 * TESOURARIA — e o §2.3 é explícito: *"Não criar esteiras independentes… sem
 * decisão formal"* e *"Não renomear esteira existente sem decisão formal"*.
 *
 * Pela ordem de prevalência do §0.1, a memória vence: ela tem código, versão,
 * owner e aprovador; os seis pacotes vêm de uma exportação que não tem nenhum
 * dos quatro. Então o primeiro nível são as esteiras, e o inventário de itens
 * do protótipo é redistribuído entre elas.
 *
 * As duas **verticais de aplicação** do §2.1 — iGaming e Cross-border — não
 * entram aqui. Elas *consomem* as esteiras, não são esteiras; viram contexto de
 * filtro na TopBar. Tratá-las como menu duplicaria cada tela por vertical.
 *
 * `SISTEMA` no fim não é esteira: é a área transversal do §2.2.
 *
 * ---
 *
 * ## A cobertura do catálogo — o que a primeira redistribuição perdeu
 *
 * ⛔ A versão anterior desta árvore declarava 47 rotas, e a conferência contra o
 * **MTC-UX-2026-010** (o catálogo canônico, 16 seções) mostrou que a
 * redistribuição em quatro esteiras havia deixado **três famílias inteiras sem
 * nenhum item de menu**: Compliance e PLD/FTP (§3, 15 telas, 7 P0), Gestão de
 * Riscos (§4, 8 telas nomeadas, 3 P0) e Segurança e Acessos (§11, 8 telas, 7
 * P0) — mais Incidentes e Continuidade (§15), que só tinha *Status do Sistema*
 * a tocar o assunto.
 *
 * Não foi esquecimento: foi consequência da própria decisão. Compliance, Risco
 * e Segurança **não são esteiras** — e, na redistribuição, ficaram sem
 * endereço. O protótipo Vite as tinha construído (a `main` daquele repositório
 * tem `compliance.mjs`, `risco-cliente.mjs`, `painel-seguranca.mjs`,
 * `segregacao-funcoes.mjs` entre as suítes), e aqui elas não existiam.
 *
 * ## Onde cada família foi parar, e por quê
 *
 * ⚠️ O §2.3 proíbe criar esteira. Nenhuma foi criada: continuam quatro, com os
 * mesmos nomes. O que mudou é o segundo nível, que a memória não congela.
 *
 * | seção do catálogo | foi para | por quê |
 * | --- | --- | --- |
 * | §1 Visão Executiva | CONTROLE ▸ Visão Executiva | a sala de controle é de onde se olha |
 * | §2 Onboarding | ONBOARD ▸ Cadastros / KYC e KYB | direto |
 * | §3 Compliance e PLD | ONBOARD ▸ Compliance e PLD | a nota da esteira é "cadastro e **validação** de clientes", e compliance é a validação que continua depois do cadastro. O KYC/KYB já mora ali |
 * | §4 Gestão de Riscos | CONTROLE ▸ Gestão de Riscos | risco é observação de posição — *Risco de Liquidez* é literalmente tesouraria |
 * | §5 Operação OTC | OTC ▸ Mesa | direto |
 * | §6 Liquidação Fiat | PAAS ▸ Liquidação Fiat | processamento financeiro é a espinha dorsal do PAAS |
 * | §7 Ativos Digitais | OTC ▸ Ativos Digitais | direto |
 * | §8 Saldos e Tesouraria | CONTROLE ▸ Tesouraria | direto |
 * | §9 Conciliação | CONTROLE ▸ Conciliação e Contabilidade | direto |
 * | §10 Controladoria | CONTROLE ▸ Controladoria e Fiscal | segue a conciliação |
 * | §11 Segurança e Acessos | SISTEMA ▸ Segurança e Acessos | atravessa as quatro esteiras — é o transversal do §2.2 |
 * | §12 Atendimento | SISTEMA ▸ Atendimento | idem |
 * | §13 Produtos e Pricing | PAAS ▸ Comercial | direto |
 * | §14 Providers | PAAS ▸ Integrações | direto |
 * | §15 Incidentes | CONTROLE ▸ Incidentes e Continuidade | *Status do Sistema* já estava ali |
 * | §16 Governança | SISTEMA ▸ Governança | atravessa tudo |
 *
 * ⚠️ **A colocação de Compliance é a que mais merece revisão do dono.** Ela é
 * defensável — e é a única que não força uma quinta esteira —, mas o catálogo
 * trata Compliance como domínio de primeiro nível, com 15 telas e 7 P0. Se o
 * dono decidir que ela merece esteira própria, é decisão formal do §2.3, e a
 * `navegacao.mjs` reprova até que a decisão exista. Está declarado aqui em vez
 * de resolvido em silêncio.
 *
 * ## O que `cat` e `p` significam
 *
 * `cat` é a coordenada no catálogo (`'3.7'` = seção 3, tela 7) e `p` é a
 * prioridade declarada lá (P0…P2). Item sem `cat` é da IA do protótipo e não
 * tem entrada própria no catálogo — o que é informação, não defeito.
 *
 * ⛔ Nome de tela vem do **catálogo**, não da invenção de quem constrói. Onde um
 * item da IA antiga e uma tela do catálogo são a mesma coisa, o item ficou com
 * a rota que já existia (para não quebrar link) e recebeu o `cat` do catálogo.
 * Duas exceções de nome, ambas deliberadas e ambas com motivo:
 *
 *   - §11.2 chama-se *Usuários* no catálogo, e ONBOARD já tem *Usuários*. São
 *     coisas diferentes — operador do backoffice contra usuário do cliente —, e
 *     o ADR de tenancy existe justamente para não confundir `tenant` com
 *     `company`. Ficou **Usuários do Backoffice**.
 *   - §16.8 *Entidades Jurídicas* ❌ NÃO é *Empresas*. O catálogo avisa: no
 *     vocabulário do ADR 0001, *Empresas* é `company` (cliente do tenant) e
 *     *Entidades Jurídicas* é o eixo contábil (`entity`). As duas existem, e
 *     separadas.
 */

export const ESTEIRAS = [
  {
    id: 'onboard',
    label: 'ONBOARD',
    nota: 'Cadastro e validação de clientes, contas, chaves e carteiras',
    grupos: [
      {
        label: 'Cadastros',
        itens: [
          { label: 'Análise de Cadastros', href: '/onboard/cadastros', cat: '2.1', p: 'P0' },
          { label: 'Empresas', href: '/onboard/empresas' },
          { label: 'Merchants', href: '/onboard/merchants' },
          { label: 'Usuários', href: '/onboard/usuarios' },
          { label: 'Cadastro PF', href: '/onboard/cadastro-pf', cat: '2.3', p: 'P0' },
          { label: 'Cadastro PJ', href: '/onboard/cadastro-pj', cat: '2.4', p: 'P0' },
          { label: 'Estrutura Societária', href: '/onboard/estrutura-societaria', cat: '2.5', p: 'P0' },
          { label: 'Gestão de Documentos', href: '/onboard/documentos', cat: '2.7', p: 'P0' },
          { label: 'Validações Automáticas', href: '/onboard/validacoes', cat: '2.8', p: 'P0' },
          { label: 'Pendências do Cliente', href: '/onboard/pendencias', cat: '2.9', p: 'P1' },
          { label: 'Aprovação e Ativação', href: '/onboard/aprovacao', cat: '2.10', p: 'P0' },
          { label: 'Revisão Cadastral', href: '/onboard/revisao', cat: '2.11', p: 'P1' },
          { label: 'Offboarding', href: '/onboard/offboarding', cat: '2.12', p: 'P1' },
        ],
      },
      {
        label: 'KYC e KYB',
        itens: [
          { label: 'Fila de Análise', href: '/onboard/kyc/fila', cat: '2.2', p: 'P0' },
          { label: 'UBO e Beneficiários', href: '/onboard/kyc/ubo', cat: '2.6', p: 'P0' },
          { label: 'Auditoria Cadastral', href: '/onboard/auditoria', cat: '16.7', p: 'P1' },
        ],
      },
      {
        // ⛔ Família inteira ausente até 09/08/2026 — 15 telas, 7 delas P0.
        label: 'Compliance e PLD',
        itens: [
          { label: 'Painel Executivo de Compliance', href: '/onboard/compliance/painel', cat: '3.1', p: 'P0' },
          { label: 'Fila de Alertas', href: '/onboard/compliance/alertas', cat: '3.2', p: 'P0' },
          { label: 'Caso de Compliance', href: '/onboard/compliance/casos', cat: '3.3', p: 'P0' },
          { label: 'Monitoramento Transacional', href: '/onboard/compliance/monitoramento', cat: '3.4', p: 'P0' },
          { label: 'Regras de Monitoramento', href: '/onboard/compliance/regras', cat: '3.5', p: 'P1' },
          { label: 'Perfil Comportamental', href: '/onboard/compliance/perfil', cat: '3.6', p: 'P1' },
          { label: 'Screening', href: '/onboard/compliance/screening', cat: '3.7', p: 'P0' },
          { label: 'Mídia Adversa', href: '/onboard/compliance/midia-adversa', cat: '3.8', p: 'P1' },
          { label: 'Gestão de PEP', href: '/onboard/compliance/pep', cat: '3.9', p: 'P1' },
          { label: 'EDD', href: '/onboard/compliance/edd', cat: '3.10', p: 'P1' },
          { label: 'Análise de Wallet', href: '/onboard/compliance/wallet', cat: '3.11', p: 'P0' },
          { label: 'Travel Rule', href: '/onboard/compliance/travel-rule', cat: '3.12', p: 'P1' },
          { label: 'Comunicações Regulatórias', href: '/onboard/compliance/comunicacoes', cat: '3.13', p: 'P1' },
          { label: 'Bloqueios e Restrições', href: '/onboard/compliance/bloqueios', cat: '3.14', p: 'P0' },
          { label: 'Comitê de PLD/FTP', href: '/onboard/compliance/comite', cat: '3.15', p: 'P2' },
        ],
      },
    ],
  },
  {
    id: 'paas',
    label: 'PAAS',
    nota: 'Espinha dorsal de processamento financeiro; inclui BaaS e CaaS',
    grupos: [
      {
        label: 'Operações Pix',
        itens: [
          { label: 'Transferências', href: '/paas/transferencias', cat: '6.5', p: 'P0' },
          { label: 'Gestão MED', href: '/paas/med', cat: '6.4', p: 'P0' },
          { label: 'Blacklist e Whitelist', href: '/paas/listas' },
          { label: 'Lotes Pix', href: '/paas/lotes' },
        ],
      },
      {
        label: 'Liquidação Fiat',
        itens: [
          { label: 'Painel de Liquidação Fiat', href: '/paas/liquidacao/painel', cat: '6.1', p: 'P0' },
          { label: 'Entrada Pix', href: '/paas/liquidacao/entrada', cat: '6.2', p: 'P0' },
          { label: 'Saída Pix', href: '/paas/liquidacao/saida', cat: '6.3', p: 'P0' },
          { label: 'Agenda de Liquidação', href: '/paas/liquidacao/agenda', cat: '6.6', p: 'P0' },
          { label: 'Contas Bancárias e PSPs', href: '/paas/liquidacao/contas-psp', cat: '6.7', p: 'P0' },
          { label: 'Rejeições e Retentativas', href: '/paas/liquidacao/rejeicoes', cat: '6.8', p: 'P1' },
        ],
      },
      {
        label: 'Checkout',
        itens: [
          { label: 'Links de Pagamento', href: '/paas/checkout/links' },
          { label: 'Domínios', href: '/paas/checkout/dominios' },
        ],
      },
      {
        label: 'Integrações',
        itens: [
          { label: 'Webhooks', href: '/paas/integracoes/webhooks', cat: '14.4', p: 'P0' },
          { label: 'Eventos', href: '/paas/integracoes/eventos', cat: '14.5', p: 'P0' },
          { label: 'Outbox', href: '/paas/integracoes/outbox' },
          { label: 'Adquirentes', href: '/paas/integracoes/adquirentes' },
          { label: 'Provedores', href: '/paas/integracoes/provedores', cat: '14.1', p: 'P0' },
          { label: 'Saúde das Integrações', href: '/paas/integracoes/saude', cat: '14.2', p: 'P0' },
          { label: 'Credenciais e Ambientes', href: '/paas/integracoes/credenciais', cat: '14.3', p: 'P0' },
          { label: 'Roteamento e Contingência', href: '/paas/integracoes/roteamento', cat: '14.6', p: 'P0' },
          { label: 'Limites por Provider', href: '/paas/integracoes/limites', cat: '14.7', p: 'P0' },
          { label: 'Custos de Provider', href: '/paas/integracoes/custos', cat: '14.8', p: 'P1' },
        ],
      },
      {
        // Primeira onda de telas: é aqui que nascem os componentes de versão,
        // vigência e maker-checker que todas as outras reusam (§6.1 do Plano).
        label: 'Comercial',
        itens: [
          { label: 'Taxas e Spread', href: '/paas/taxas', cat: '13.3', p: 'P0' },
          { label: 'Faturamento', href: '/paas/faturamento' },
          { label: 'Split', href: '/paas/split', cat: '13.4', p: 'P1' },
          { label: 'Parcerias', href: '/paas/parcerias' },
        ],
      },
    ],
  },
  {
    id: 'otc',
    label: 'OTC',
    nota: 'Câmbio a balcão multimoedas, multi-provider, multi-fronteiras e 24h',
    grupos: [
      {
        label: 'Mesa',
        itens: [
          { label: 'Mesa OTC', href: '/otc/mesa', cat: '5.1', p: 'P0' },
          { label: 'Cotações', href: '/otc/cotacoes', cat: '5.2', p: 'P0' },
          { label: 'Ordens', href: '/otc/ordens', cat: '5.5', p: 'P0' },
          { label: 'Composição da Cotação', href: '/otc/composicao-cotacao', cat: '5.3', p: 'P0' },
          { label: 'Comparador de Providers', href: '/otc/comparador', cat: '5.4', p: 'P0' },
          { label: 'Detalhe da Ordem OTC', href: '/otc/ordem-detalhe', cat: '5.6', p: 'P0' },
          { label: 'Execução e Roteamento', href: '/otc/execucao', cat: '5.7', p: 'P1' },
          { label: 'Hedge e Cobertura', href: '/otc/hedge', cat: '5.8', p: 'P1' },
          { label: 'P&L da Mesa', href: '/otc/pl-mesa', cat: '5.9', p: 'P1' },
          { label: 'Limites da Mesa', href: '/otc/limites-mesa', cat: '5.10', p: 'P0' },
        ],
      },
      {
        label: 'Ativos Digitais',
        itens: [
          { label: 'Blockchain', href: '/otc/blockchain', cat: '7.10', p: 'P1' },
          { label: 'Wallets Autorizadas', href: '/otc/wallets', cat: '7.2', p: 'P0' },
          { label: 'Recebíveis de Cartão', href: '/otc/recebiveis' },
          { label: 'Painel de Ativos Digitais', href: '/otc/ativos/painel', cat: '7.1', p: 'P0' },
          { label: 'Depósito Cripto', href: '/otc/ativos/deposito', cat: '7.3', p: 'P0' },
          { label: 'Saque Cripto', href: '/otc/ativos/saque', cat: '7.4', p: 'P0' },
          { label: 'Transferência Interna Cripto', href: '/otc/ativos/transferencia', cat: '7.5', p: 'P0' },
          { label: 'Consolidação e Sweep', href: '/otc/ativos/sweep', cat: '7.6', p: 'P1' },
          { label: 'Gestão de Gas e Fees', href: '/otc/ativos/gas', cat: '7.7', p: 'P1' },
          { label: 'Assinaturas e Aprovações', href: '/otc/ativos/assinaturas', cat: '7.8', p: 'P0' },
          { label: 'Allowlist de Endereços', href: '/otc/ativos/allowlist', cat: '7.9', p: 'P0' },
          { label: 'Custódia e Prova de Reservas', href: '/otc/ativos/custodia', cat: '7.11', p: 'P1' },
          { label: 'Políticas de Custódia', href: '/otc/ativos/politicas', cat: '7.12', p: 'P1' },
        ],
      },
      {
        label: 'Relatórios OTC',
        itens: [
          { label: 'Extratos', href: '/otc/extratos' },
          { label: 'Relatório D+0', href: '/otc/d0' },
        ],
      },
    ],
  },
  {
    id: 'controle',
    label: 'SALA DE CONTROLE / TESOURARIA',
    // A qualificação abaixo é obrigatória pela Regra 0 (§0 da memória): a
    // Mutual observa, concilia e comprova; não custodia. Toda tela desta
    // esteira repete a qualificação onde exibe posição.
    nota: 'Posição, liquidez, conciliação e fechamento sobre contas e carteiras mantidas em instituições licenciadas parceiras',
    grupos: [
      {
        label: 'Visão Executiva',
        itens: [
          { label: 'Painel Executivo', href: '/controle/painel-executivo', cat: '1.1', p: 'P0' },
          { label: 'Cockpit de Liquidez', href: '/controle/cockpit-liquidez', cat: '1.2', p: 'P0' },
          { label: 'Torre de Operação', href: '/controle/torre', cat: '1.3', p: 'P0' },
          { label: 'Painel de Risco Executivo', href: '/controle/painel-risco', cat: '1.5', p: 'P1' },
          { label: 'Painel de Compliance Executivo', href: '/controle/painel-compliance', cat: '1.6', p: 'P1' },
        ],
      },
      {
        label: 'Visão Operacional',
        itens: [
          { label: 'Dashboard Operacional', href: '/controle/dashboard' },
          { label: 'Sala de Controle', href: '/controle/sala' },
          { label: 'Status do Sistema', href: '/controle/status', cat: '1.4', p: 'P1' },
        ],
      },
      {
        // ⛔ Família inteira ausente até 09/08/2026 — os três P0 do domínio.
        label: 'Gestão de Riscos',
        itens: [
          { label: 'Painel Integrado de Riscos', href: '/controle/riscos/painel', cat: '4.1', p: 'P1' },
          { label: 'Matriz de Riscos', href: '/controle/riscos/matriz', cat: '4.2', p: 'P1' },
          { label: 'Apetite e Tolerância', href: '/controle/riscos/apetite', cat: '4.3', p: 'P1' },
          { label: 'Risco de Cliente', href: '/controle/riscos/cliente', cat: '4.4', p: 'P0' },
          { label: 'Risco de Contraparte', href: '/controle/riscos/contraparte', cat: '4.5', p: 'P0' },
          { label: 'Risco de Liquidez', href: '/controle/riscos/liquidez', cat: '4.8', p: 'P0' },
          { label: 'KRIs', href: '/controle/riscos/kris', cat: '4.12', p: 'P1' },
          { label: 'Planos de Ação', href: '/controle/riscos/planos', cat: '4.14', p: 'P1' },
        ],
      },
      {
        label: 'Tesouraria',
        itens: [
          { label: 'Liquidez e LRD', href: '/controle/liquidez', cat: '8.2', p: 'P0' },
          { label: 'Bridge', href: '/controle/bridge' },
          { label: 'Contas', href: '/controle/contas' },
          { label: 'Carteiras', href: '/controle/carteiras' },
          { label: 'Saldos Consolidados', href: '/controle/tesouraria/saldos', cat: '8.1', p: 'P0' },
          { label: 'Prefunding', href: '/controle/tesouraria/prefunding', cat: '8.3', p: 'P0' },
          { label: 'Projeção de Caixa', href: '/controle/tesouraria/projecao', cat: '8.4', p: 'P1' },
          { label: 'Reservas', href: '/controle/tesouraria/reservas', cat: '8.5', p: 'P0' },
          { label: 'Limites e Exposições', href: '/controle/tesouraria/limites', cat: '8.6', p: 'P0' },
          { label: 'Posição de Tesouraria', href: '/controle/tesouraria/posicao', cat: '8.7', p: 'P0' },
          { label: 'Ordens de Tesouraria', href: '/controle/tesouraria/ordens', cat: '8.8', p: 'P0' },
          { label: 'Rebalanceamentos', href: '/controle/tesouraria/rebalanceamentos', cat: '8.9', p: 'P1' },
          { label: 'Sweeps', href: '/controle/tesouraria/sweeps', cat: '8.10', p: 'P1' },
          { label: 'Funding', href: '/controle/tesouraria/funding', cat: '8.11', p: 'P0' },
          { label: 'Agenda Financeira', href: '/controle/tesouraria/agenda', cat: '8.12', p: 'P1' },
        ],
      },
      {
        label: 'Conciliação e Contabilidade',
        itens: [
          { label: 'Conciliação', href: '/controle/conciliacao', cat: '9.1', p: 'P0' },
          { label: 'Divergências', href: '/controle/divergencias', cat: '9.2', p: 'P0' },
          { label: 'Livro Razão', href: '/controle/livro-razao' },
          { label: 'Aprovações', href: '/controle/aprovacoes', cat: '16.4', p: 'P0' },
          { label: 'Matching Manual', href: '/controle/conciliacao/matching', cat: '9.3', p: 'P1' },
          { label: 'Regras de Matching', href: '/controle/conciliacao/regras', cat: '9.4', p: 'P1' },
          // ⚠️ *Contas de Suspense* é o nome do catálogo. O protótipo Vite a
          // chamou de *Saldos Não Identificados* e o catálogo registra isso
          // como exemplo de vocabulário reinventado. Aqui vale o catálogo.
          { label: 'Contas de Suspense', href: '/controle/conciliacao/suspense', cat: '9.5', p: 'P0' },
          { label: 'Fechamento D+0', href: '/controle/conciliacao/fechamento', cat: '9.6', p: 'P0' },
          { label: 'Extrato Canônico', href: '/controle/conciliacao/extrato', cat: '9.7', p: 'P0' },
          { label: 'Integridade Financeira', href: '/controle/conciliacao/integridade', cat: '9.8', p: 'P0' },
          { label: 'Incidentes Financeiros', href: '/controle/conciliacao/incidentes', cat: '9.9', p: 'P0' },
          { label: 'Evidências', href: '/controle/conciliacao/evidencias', cat: '9.10', p: 'P1' },
        ],
      },
      {
        label: 'Controladoria e Fiscal',
        itens: [
          { label: 'Painel de Controladoria', href: '/controle/controladoria/painel', cat: '10.1', p: 'P1' },
          { label: 'Plano de Contas', href: '/controle/controladoria/plano-contas', cat: '10.2', p: 'P0' },
          { label: 'Lançamentos Contábeis', href: '/controle/controladoria/lancamentos', cat: '10.3', p: 'P0' },
          { label: 'Templates Contábeis', href: '/controle/controladoria/templates', cat: '10.4', p: 'P0' },
          { label: 'Lotes Contábeis', href: '/controle/controladoria/lotes', cat: '10.5', p: 'P0' },
          { label: 'Fechamento Contábil', href: '/controle/controladoria/fechamento', cat: '10.6', p: 'P1' },
          { label: 'Painel Fiscal e Tributário', href: '/controle/controladoria/fiscal', cat: '10.7', p: 'P1' },
          { label: 'Documentos Fiscais', href: '/controle/controladoria/documentos', cat: '10.8', p: 'P1' },
          { label: 'Obrigações Acessórias', href: '/controle/controladoria/obrigacoes', cat: '10.9', p: 'P1' },
          { label: 'DeCripto', href: '/controle/controladoria/decripto', cat: '10.10', p: 'P1' },
          { label: 'Intercompany', href: '/controle/controladoria/intercompany', cat: '10.11', p: 'P1' },
          { label: 'Relatórios Financeiros', href: '/controle/controladoria/relatorios', cat: '10.12', p: 'P1' },
        ],
      },
      {
        // §15 do catálogo não traz tabela: nomeia em prosa os três P0, e diz
        // que só *Sala de Controle* tocava o assunto. São estes três.
        label: 'Incidentes e Continuidade',
        itens: [
          { label: 'Central de Incidentes', href: '/controle/incidentes/central', cat: '15.1', p: 'P0' },
          { label: 'Gestão de Mudanças', href: '/controle/incidentes/mudancas', cat: '15.2', p: 'P0' },
          { label: 'Gates de Produção', href: '/controle/incidentes/gates', cat: '15.3', p: 'P0' },
        ],
      },
      {
        label: 'Relatórios',
        itens: [
          { label: 'Financeiros', href: '/controle/relatorios/financeiros' },
          { label: 'Operacionais', href: '/controle/relatorios/operacionais' },
          { label: 'Receita Mutual', href: '/controle/relatorios/receita' },
        ],
      },
    ],
  },
]

/** Área transversal do §2.2. Não é esteira; fica no rodapé da navegação. */
export const TRANSVERSAL = {
  id: 'sistema',
  label: 'SISTEMA',
  grupos: [
    {
      // ⛔ Família inteira ausente até 09/08/2026 — 8 telas, 7 delas P0.
      label: 'Segurança e Acessos',
      itens: [
        { label: 'Painel de Segurança', href: '/sistema/seguranca/painel', cat: '11.1', p: 'P0' },
        { label: 'Usuários do Backoffice', href: '/sistema/seguranca/usuarios', cat: '11.2', p: 'P0' },
        { label: 'Perfis e Permissões', href: '/sistema/seguranca/perfis', cat: '11.3', p: 'P0' },
        { label: 'Segregação de Funções', href: '/sistema/seguranca/segregacao', cat: '11.4', p: 'P0' },
        { label: 'Sessões e Dispositivos', href: '/sistema/seguranca/sessoes', cat: '11.5', p: 'P0' },
        { label: 'Credenciais de Serviço', href: '/sistema/seguranca/credenciais', cat: '11.6', p: 'P0' },
        { label: 'Auditoria de Acesso', href: '/sistema/seguranca/auditoria', cat: '11.7', p: 'P0' },
        { label: 'Revisão de Acessos', href: '/sistema/seguranca/revisao', cat: '11.8', p: 'P1' },
      ],
    },
    {
      // ⚠️ O grupo leva o nome da SEÇÃO do catálogo (§16 *Governança e
      // Administração*), não o da primeira tela. Os dois eram "Governança", e
      // um item com o mesmo nome do grupo que o contém é ambíguo para quem lê
      // o menu e para qualquer coisa que procure a tela pelo nome — o e2e
      // reprovou justamente aí, achando o grupo no lugar da tela.
      label: 'Governança e Administração',
      itens: [
        { label: 'Governança', href: '/sistema/governanca/painel', cat: '16.1', p: 'P1' },
        { label: 'Políticas', href: '/sistema/governanca/politicas', cat: '16.2', p: 'P1' },
        { label: 'Alçadas', href: '/sistema/governanca/alcadas', cat: '16.3', p: 'P0' },
        { label: 'Comitês', href: '/sistema/governanca/comites', cat: '16.5', p: 'P2' },
        { label: 'Exceções', href: '/sistema/governanca/excecoes', cat: '16.6', p: 'P1' },
        { label: 'Entidades Jurídicas', href: '/sistema/governanca/entidades', cat: '16.8', p: 'P0' },
        { label: 'Parâmetros Globais', href: '/sistema/configuracoes', cat: '16.9', p: 'P0' },
        { label: 'Calendários Operacionais', href: '/sistema/governanca/calendarios', cat: '16.10', p: 'P0' },
        { label: 'Moedas, Ativos e Redes', href: '/sistema/governanca/moedas', cat: '16.11', p: 'P0' },
        { label: 'Templates de Comunicação', href: '/sistema/governanca/templates', cat: '16.12', p: 'P1' },
        { label: 'Configuração de SLA', href: '/sistema/governanca/sla', cat: '16.13', p: 'P1' },
      ],
    },
    {
      label: 'Atendimento',
      itens: [
        { label: 'Tickets', href: '/sistema/tickets', cat: '12.2' },
        { label: 'Centro de Suporte', href: '/sistema/suporte', cat: '12.3' },
        // ⚠️ Não confundir com *Empresas*, que é configuração. A 360 é leitura:
        // os nove blocos do §6 do catálogo (cadastro, contratos, produtos,
        // saldos, ordens, compliance, risco, receita, tickets).
        { label: 'Visão 360 do Cliente', href: '/sistema/visao-360', cat: '12.4', p: 'P0' },
      ],
    },
  ],
}

/**
 * Verticais do §2.1 — contexto de filtro, nunca item de menu. Uma operação
 * pertence a uma vertical *e* atravessa as esteiras; duplicar as telas por
 * vertical multiplicaria a superfície sem informação nova.
 */
export const VERTICAIS = [
  { id: 'todas', label: 'Todas as verticais' },
  { id: 'igaming', label: 'iGaming / Apostas' },
  { id: 'crossborder', label: 'Cross-border / Pix Exterior' },
]

/** Percorre esteiras + transversal e devolve a entrada que casa com `href`. */
export function acharPorHref(href) {
  for (const esteira of [...ESTEIRAS, TRANSVERSAL]) {
    for (const grupo of esteira.grupos) {
      for (const item of grupo.itens) {
        if (item.href === href) return { esteira, grupo, item }
      }
    }
  }
  return null
}

/** Toda rota declarada, para a verificação de cobertura e para o índice. */
export function todasAsRotas() {
  return [...ESTEIRAS, TRANSVERSAL].flatMap((e) =>
    e.grupos.flatMap((g) => g.itens.map((i) => i.href)),
  )
}

/**
 * Cobertura do catálogo, contada — nunca escrita à mão.
 *
 * ⛔ O número de telas NÃO é transcrito em comentário nem em README. Este
 * repositório herdou a lição do outro: número que só vive no documento
 * fossiliza, e lá o `STATUS-DO-PROGRAMA` já publicou "3 rotas placeholder"
 * quando eram 2 e "74 páginas com mock" quando eram 106. Quem quiser o número
 * chama esta função.
 */
export function coberturaDoCatalogo() {
  const itens = [...ESTEIRAS, TRANSVERSAL].flatMap((e) => e.grupos.flatMap((g) => g.itens))
  const doCatalogo = itens.filter((i) => i.cat)
  return {
    rotas: itens.length,
    comCatalogo: doCatalogo.length,
    semCatalogo: itens.length - doCatalogo.length,
    p0: doCatalogo.filter((i) => i.p === 'P0').length,
    secoes: new Set(doCatalogo.map((i) => i.cat.split('.')[0])).size,
  }
}
