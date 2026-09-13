// ============================================================================
// data/ituano-data.js — Ituano Futebol Clube (Itu, SP, Brasil).
// NO es SAF: sigue siendo una associação/clube tradicional (el Patrimônio
// Líquido se compone de "Patrimonio Social" + reservas, no de capital social).
// Ejercicio social = ANO CALENDÁRIO (1/1/2024 a 31/12/2024), ver
// `fiscalYearStart:'01-01'` en data/clubs.js. 1 ejercicio cargado: 2024.
//
// FUENTE: `Clubes/Brasil/Ituano/relatorio-auditoria-2024.pdf` (17 páginas,
// texto nativo, vía pdftotext -layout), transcripción completa en
// `relatorio-auditoria-2024.md` en la misma carpeta. Trae Balanço Patrimonial,
// DRE, Mutações do PL, Fluxos de Caixa y Notas Explicativas — a diferencia del
// documento de Mirassol (ver data/mirassol-data.js), acá SÍ están las
// demonstrações completas, con la DRE desglosada línea por línea.
//
// EJERCICIO EN DÉFICIT: R$ (7.063.131,20). Los 4 subtotales de la DRE y el
// resultado final cierran EXACTO contra la suma de sus propias líneas (ver la
// tabla de verificación al final de la transcripción). Ninguna inconsistencia
// encontrada en el documento.
//
// ESCALA: el documento está en reales enteros con centavos ("Valores expressos
// em reais"), NO en miles. Acá se guardan en MILLONES de BRL nativos, mismo
// criterio que el resto del sitio: cada valor se dividió por 1.000.000.
//
// Categorización (DRE, pág. 6 del PDF):
// - 'Sócio Torcedor' (ingreso) -> member_dues. OJO: hay un 'Sócio Torcedor'
//   NEGATIVO dentro de DESPESAS ADMINISTRATIVAS (el costo de atender al programa
//   de socios), cargado aparte como admin_general_expense — mismo criterio que
//   'Ingressos a Sócios' de Grêmio. No se netearon entre sí: el documento los
//   presenta separados, en bloques distintos.
// - 'Direito de Transmissão de TV (FPF/CBF)' -> broadcasting.
// - 'Patrocínio e Publicidades' -> sponsorship_commercial.
// - 'Arrecadação de Jogos' -> matchday_competition.
// - 'Premiações em Campeonatos (FPF)' -> competition_bonus. Está en 0,00 en 2024
//   pero se carga igual, como línea propia: el documento la imprime, y una línea
//   impresa en cero es un dato (el club no cobró premios), no una ausencia.
// - 'Receita com Repasses de Direitos Federativos' -> player_sales, también 0,00
//   en 2024, mismo criterio que arriba.
// - 'Cessão Temp. Direitos Federativos de Atletas (Empréstimo)' -> player_sales:
//   son ingresos por CEDER jugadores a préstamo. No hay categoría propia de
//   "loan fees" en category-map.js, y player_sales es lo más cercano
//   conceptualmente (ingreso por transferir derechos de un jugador, aunque sea
//   temporal). Documentado acá como criterio, no es un dato del documento.
// - 'Receita de Incentivos, Doações e Loterias' y 'Outras Receitas' ->
//   other_income.
// - '(-) Impostos Incidentes s/ Vendas e Serviços' -> other_income NEGATIVO. Es
//   una deducción DENTRO del bloque RECEITA del propio documento (impuestos
//   sobre ventas/servicios), no un gasto operativo: dejarla acá en negativo es lo
//   que hace que la suma de revenueLines dé exacto los 29.239.217,10 que imprime
//   el subtotal RECEITA. Mismo criterio que los 'Impostos sobre vendas' que
//   Grêmio tiene anidados en su línea de tienda.
// - Bloque DESPESAS - FUTEBOL: 'Despesas com Pessoal (Salários e Encargos)' ->
//   wages_squad; 'Serviços de Terceiros (Prêmios, Mídia, Serviços de PJ e PF)',
//   'Gastos c/ Atletas (Viagens, Uniformes, Taxas CBF-FPF)' y 'Outras Despesas
//   (Eventos e Partidas - Estádio e Alojamento)' -> match_organisation_expense
//   (mismo criterio que 'Despesas Federações, Imagens, Prêmios, Material
//   Esportivo' y 'Despesas de Viagens' de Grêmio); 'Gastos c/ Bens de terceiros
//   (Acomodações, Estádio, Energia, Água e Telefone)' -> admin_general_expense
//   (servicios e inmuebles, no organización de partidos).
// - Bloque DESPESAS ADMINISTRATIVAS completo -> admin_general_expense.
// - Bloque RECEITAS E DESPESAS NÃO OPERACIONAIS -> NO va como línea: son
//   Receita Financeiras (17.573,58) y Despesas Financeiras (707.832,27), que van
//   NETEADAS a `netInterest` (-690.258,69), como manda club-data-mapping
//   SKILL.md sección 2.
// - 'RECEITAS E DESPESAS OPERACIONAIS' imprime 0,00 y no tiene ninguna línea
//   debajo: no se cargó nada por ese bloque.
//
// grossDebt = las 2 únicas líneas de deuda FINANCIERA del passivo: 'Emprestimos'
// circulante (1.151.840,48, Nota 18) + 'Emprestimos LP e Antecipação de Direitos'
// não circulante (9.695.588,24, Nota 20) = 10.847.428,72. Quedan fuera a
// propósito las obligaciones laborales, tributarias, con proveedores y el
// Parcelamento de Impostos Federais: son pasivos operativos/fiscales, no deuda
// financiera (mismo criterio que Grêmio, ver SKILL.md sección 14).
// cash = 'Caixa e Bancos' (Nota 4) = 54.008,22. OJO, cayó desde 1.471.333,83 en
// 2023: el club cerró 2024 prácticamente sin caja.
//
// FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 — misma cotización oficial
// del Banco Central do Brasil que ya usan Grêmio y Botafogo para ESE MISMO
// cierre. El documento de Ituano no declara ningún tipo de cambio propio.
//
// Gestión: el documento no está firmado por ningún presidente (solo por el
// contador y la auditoría). No se confirmó ninguna gestión, se cargó una entrada
// genérica, mismo criterio que Once Caldas/Envigado (SKILL.md sección 7).
// ============================================================================

const ituanoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Direito de Transmissão de TV (FPF/CBF)', normalizedCategory:'broadcasting', amountNative:13.888289, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:8.228219, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de Jogos', normalizedCategory:'matchday_competition', amountNative:2.550598, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Incentivos, Doações e Loterias', normalizedCategory:'other_income', amountNative:2.598796, disclosureLevel:'detailed' },
    { rawLabel:'Cessão Temp. Direitos Federativos de Atletas (Empréstimo)', normalizedCategory:'player_sales', amountNative:1.671683, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas', normalizedCategory:'other_income', amountNative:1.048817, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.324055, disclosureLevel:'detailed' },
    { rawLabel:'Premiações em Campeonatos (FPF)', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Receita com Repasses de Direitos Federativos', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos Incidentes s/ Vendas e Serviços', normalizedCategory:'other_income', amountNative:-1.071240, disclosureLevel:'detailed' },
  ],
};

const ituanoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Serviços de Terceiros (Prêmios, Mídia, Serviços de PJ e PF)', normalizedCategory:'match_organisation_expense', amountNative:-13.195087, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Pessoal, futebol profissional e de base (Salários e Encargos)', normalizedCategory:'wages_squad', amountNative:-9.712266, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Pessoal, administrativo (Salários e encargos)', normalizedCategory:'admin_general_expense', amountNative:-4.951629, disclosureLevel:'detailed' },
    { rawLabel:'Gastos c/ Atletas (Viagens, Uniformes, Taxas CBF-FPF)', normalizedCategory:'match_organisation_expense', amountNative:-2.414843, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas (Eventos e Partidas - Estádio e Alojamento)', normalizedCategory:'match_organisation_expense', amountNative:-2.029142, disclosureLevel:'detailed' },
    { rawLabel:'Gastos c/ Bens de terceiros (Acomodações, Estádio, Energia, Água e Telefone)', normalizedCategory:'admin_general_expense', amountNative:-1.284147, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros - Advogado, Contador, Assessores', normalizedCategory:'admin_general_expense', amountNative:-0.706377, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor (custo do programa)', normalizedCategory:'admin_general_expense', amountNative:-0.579749, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.562575, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e Taxas diversas', normalizedCategory:'admin_general_expense', amountNative:-0.119490, disclosureLevel:'detailed' },
    { rawLabel:'Água, Luz, Telefone e Internet (sede do Clube)', normalizedCategory:'admin_general_expense', amountNative:-0.056784, disclosureLevel:'detailed' },
  ],
};

const ituanoFiscalYearMeta = {
  2024: {
    currency:'BRL', fx:6.1923,
    sourceId:'ituano-relatorio-auditoria-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = Emprestimos circulante (1.151840, Nota 18) + Emprestimos LP e
    // Antecipação de Direitos (9.695588, Nota 20). cash = Caixa e Bancos (Nota 4).
    grossDebt:10.847429, cash:0.054008,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = bloque "RECEITAS E DESPESAS NÃO OPERACIONAIS" de la DRE:
    // Receita Financeiras 0.017574 - Despesas Financeiras 0.707832.
    netInterest:-0.690259, tax:0,
    // officialTotalRevenue = subtotal "RECEITA - FUTEBOL PROFISSIONAL E DE BASE"
    // impreso (29.239.217,10). officialTotalExpenses = "DESPESAS - FUTEBOL"
    // (28.635.485,79) + "DESPESAS ADMINISTRATIVAS" (6.976.603,82) = 35.612.089,61.
    // officialPAT = "(DÉFICIT) OU SUPERÁVIT DO EXERCÍCIO" impreso.
    officialTotalRevenue:29.239217, officialTotalExpenses:35.612090, officialPAT:-7.063131,
  },
};

const ituanoPresupuestoOverlayByYear = {};

const ituanoPasesData = [];
const ituanoResultadosData = {};
const ituanoTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.ituano = {
  revenueLinesByYear: ituanoRevenueLinesByYear, expenseLinesByYear: ituanoExpenseLinesByYear,
  fiscalYearMeta: ituanoFiscalYearMeta, pasesData: ituanoPasesData,
  resultadosData: ituanoResultadosData, titulosData: ituanoTitulosData,
};

Object.assign(sources, {
  'ituano-relatorio-auditoria-2024': {
      id:'ituano-relatorio-auditoria-2024', clubId:'ituano',
      title:'Demonstrações Financeiras e Relatório de Auditoria — Exercício findo em 31 de dezembro de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://ituanofc.com.br/',
      note:'PDF oficial (17 páginas, texto nativo) con Balanço Patrimonial al 31/12/2024, DRE, Mutações do Patrimônio Líquido, Fluxos de Caixa y Notas Explicativas. Ituano NO es SAF, sigue siendo associação. Ejercicio 2024 cerrado en DÉFICIT de R$ 7.063.131,20. Los 4 subtotales de la DRE y el resultado final cierran exacto contra la suma de sus propias líneas, sin ninguna inconsistencia. Cifras en reales enteros con centavos (no en miles). grossDebt = las 2 líneas de Emprestimos (Notas 18 y 20), excluidas las obligaciones laborales/tributarias/proveedores. Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Ituano/relatorio-auditoria-2024.md.',
    },
});

gestionesByClub.ituano = {
    // El documento solo lo firman el contador y la auditoría, ningún presidente.
    sinconfirmar: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.ituano = null; // no se encontró una cifra confiable en esta sesión
