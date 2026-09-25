// ============================================================================
// data/guarani-br-data.js — Guarani Futebol Clube (Campinas, São Paulo, Brasil).
// EM RECUPERAÇÃO JUDICIAL (aprovada em assembleia de credores el 27/2/2023, homologada
// por el juzgado el 3/6/2024) — associação civil sem fins lucrativos, NO es SAF. 2 ejercicios
// cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12, confirmado
// en la carátula de los 2 documentos: "exercício findo em 31 de dezembro de 2024/2025";
// clubs.js fiscalYearStart:'01-01').
//
// FUENTES (2 canales, ver fuentes/Brasil/Guarani.md):
// - 2024: `demonstracoes-financeiras-2023-2024.pdf`, vía repositorio de la Federação Paulista
//   (formato "publicación legal", recorte de gazetasp.com.br, con capa de texto real).
//   Auditado por ASSESSORA ASSESSORES E AUDITORES EIRELI EPP (Orozimbo Benedito Brunharo,
//   CRC/SP 18P081749/0-7), contador Luciano Limoli Junior (CRC 1SP 119.607/0-5). Opinião COM
//   RESSALVAS (adiantamentos mal clasificados, bloqueios judiciais sin documentación,
//   obligaciones impositivas/INSS/FGTS sin reconciliar, provisión de contingencias sin
//   actualizar por intereses/multas).
// - 2025: `demonstracoes-financeiras-2024-2025.pdf`, vía sitio oficial del club
//   (guaranifc.com.br/governanca/). Auditado por Audcorp Auditoria e Assessoria S/S (José
//   Augusto Barbosa, CRC 1SP 120808/0-6). También opinião COM RESSALVAS (obrigações
//   trabalhistas/tributárias sin documentación completa, contingencia tributaria de 2006 sin
//   reconocer $6.200 mil, ajuste retroactivo de adiantamentos fuera de norma CPC 23).
// Los 2 son PDF con capa de texto real, transcripción completa en
// Clubes/Brasil/Guarani/demonstracoes-financeiras-<años>.md. Hay además
// Clubes/Brasil/Guarani/parecer-conselho-fiscal-2025.md (dictamen del Conselho Fiscal sobre
// las DFs 2025, documento de cruce/contexto, sin líneas de detalle propias — no se usó para
// extraer datos).
//
// ESCALA: documentos "Em milhares de reais" (miles de reales) — acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Operário Ferroviário/Botafogo/Grêmio).
//
// ¡OJO CON EL EJERCICIO CORRIENTE! (club-data-mapping SKILL.md sección 6.5): se usó SIEMPRE
// la columna "año corriente" del PDF DE ESE AÑO (2024 -> PDF 2023-2024, 2025 -> PDF 2024-2025),
// nunca la comparativa del PDF siguiente. Esto no fue solo una precaución teórica acá: la
// comparativa "2024" del PDF 2024-2025 tiene un error de OCR real en "Gerais e administrativas"
// (muestra -2.300, debería ser -9.300 — confirmado porque con -2.300 el subtotal impreso de esa
// misma comparativa, -53.983, no cierra, y con -9.300 sí cierra exacto), otra razón más para
// nunca confiar en una columna comparativa cuando existe el documento propio de ese año.
//
// CONTEXTO RECUPERAÇÃO JUDICIAL: no hay una línea de "provisão para contingências" ni de
// "reestruturação de dívida" dentro del Estado de Resultado (DRE) de NINGUNO de los 2 años — el
// pasivo de Recuperação Judicial ($29.112 mil en 2024, reclasificado desde Contingências al
// homologarse el plan) y la gran Provisão para Contingências ($152.726 mil en 2024, $0.345 mil
// en 2025, mayormente causas tributarias) son movimientos de BALANCE (pasivo), no gasto del
// ejercicio — no impactan revenueLines/expenseLines, solo grossDebt (ver abajo). La única línea
// de "Contingências" que aparece en el DRE es una reversión mínima (+$1 mil en 2024, $0 en 2025),
// cargada como `exceptional_items` por ser una desafectación de previsión (client-data-mapping
// sección 1, tabla). La ganancia financiera grande de 2024 (Receita Financeira $7.523 mil, ~16%
// del total de recursos) es plausiblemente un efecto contable de la recuperación judicial
// (descuento/quita reconocida como ingreso financiero al homologarse el plan en 2024) — se cargó
// íntegra a `netInterest`, nunca como revenueLine, siguiendo club-data-mapping sección 2 al pie
// de la letra ("ni siquiera si el documento fuente los muestra como una línea más de Recursos").
//
// CATEGORIZACIÓN:
// - 'Premiação' -> competition_bonus; 'Cotas de transmissão' -> broadcasting; 'Patrocínio' ->
//   sponsorship_commercial; 'Cessão de atletas' -> player_sales (ingreso bruto por
//   transferencia/préstamo de jugadores, incl. mecanismo de solidaridad FIFA sobre ventas de
//   ex-jugadores formados en el club, Nota explicativa 1.i); 'Receitas Sociais' -> member_dues;
//   'Outras' -> other_income.
// - 'Salários e encargos' / 'Direito de Imagem' -> wages_squad (mismo criterio que Operário
//   Ferroviário: Direito de Imagem es remuneración del plantel, no un rubro aparte); 'Jogos' /
//   'Gastos gerais com atividade desportiva' -> match_organisation_expense (costos operativos
//   del fútbol profesional sin desglose más fino disponible en el documento); 'Direitos
//   econômicos' -> player_amortisation (costo de adquisición/pago de derechos económicos de
//   jugadores — el club no capitaliza/amortiza un intangible de formación propia significativo,
//   Nota 10, así que es la aproximación más fiel al "costo de compra de jugadores" que muestra
//   el documento, mismo criterio que Racing/Operário Ferroviário); 'Gerais e administrativas' /
//   'Despesas Tributárias' -> admin_general_expense (impuestos siempre acá, club-data-mapping
//   sección 17); 'Contingências' (reversión de previsión) -> exceptional_items.
// - Receita Financeira / Despesas financiamentos -> netInterest (nunca revenueLine/expenseLine,
//   club-data-mapping sección 2). tax:0 los 2 años: associação sem fins lucrativos, isenta de
//   tributos federales sobre el resultado (Nota explicativa 3.h / 3.j, art. 178-192 Decreto
//   9.580/2019).
//
// VERIFICACIÓN (Node, antes de cargar):
// - 2024: revenueLines suman EXACTO 46,817 M = "Receitas Operacionais" impreso. expenseLines
//   suman 53,981 M vs. 53,983 M impreso (diff 0,002 M = R$2.000, redondeo del propio documento a
//   nivel de línea, mismo patrón que Operário Ferroviário — se usó 53,983 M como
//   officialTotalExpenses porque es el que reconcilia EXACTO: 46,817 − 53,983 + netInterest
//   (6,754) = −0,412 M = Déficit do Exercício impreso, EXACTO).
// - 2025: revenueLines suman 63,568 M vs. 63,569 M impreso (diff 0,001 M, redondeo). expenseLines
//   suman EXACTO 53,413 M = subtotal impreso. 63,569 − 53,413 + netInterest (−2,079) = 8,077 M =
//   Superávit do Exercício impreso, EXACTO.
//
// grossDebt: NO hay una línea única "Deudas" en el Passivo (a diferencia de Boca/Vélez) — se
// sumaron las partidas de naturaleza financiera (préstamos, anticipos bancarios/factoring de TV,
// y el pasivo de Recuperação Judicial), EXCLUYENDO Fornecedores/Obrigações
// Trabalhistas/Impostos a recolher (pasivo operativo ordinario) y Provisão para Contingências
// (previsión legal, no deuda). "Antecipações" se incluyó como deuda porque la Nota 12/10 del
// propio documento las describe explícitamente como financiamiento bancario ("contratos de
// Cessão Crédito sem Coobrigação" con los bancos Daycoval/BMG/BMP, factoring de las cuotas
// futuras de TV) — es economicamente un préstamo contra ingresos futuros, no un pasivo operativo.
// 2024: Empréstimos (0,484) + Recuperação Judicial circ. (29,112) + Antecipações circ. (11,223) +
// Antecipações não circ. (104,125) = 144,944 M. 2025: Empréstimos (1,018) + Recuperação Judicial
// circ. (5,640) + Recuperação Judicial não circ. (23,179) + Antecipações circ. (5,032) +
// Antecipações não circ. (107,625) = 142,494 M. cash = Caixa e equivalentes de caixa (Nota 4 de
// cada año): 0,298 M (2024), 6,535 M (2025).
//
// FX: ninguno de los 2 documentos declara tipo de cambio propio (sin Anexo de moneda extranjera
// — el riesgo cambial mencionado en la Nota de gestión de riesgos es genérico, sin cifra). PTAX
// de cierre BCB, ya cargado en FX_CLOSE: BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// Gestión: el PDF de 2024 firma "Rômulo Aleksander Moreno Amaro — Presidente do Conselho de
// Administração" (25/4/2025); el PDF de 2025 firma el MISMO nombre y cargo (28/4/2026). Aun con
// firma consistente en los 2 años, "Presidente do Conselho de Administração" no confirma con
// certeza que sea la máxima autoridad ejecutiva del club (presidencia) en el sentido que exige
// club-data-mapping SKILL.md sección 7 — gestionId queda 'sinconfirmar' los 2 años, mismo
// criterio que Operário Ferroviário.
// ============================================================================

const guaraniBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:0.119, disclosureLevel:'detailed' },
    { rawLabel:'Cotas de transmissão', normalizedCategory:'broadcasting', amountNative:21.476, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:6.656, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de atletas', normalizedCategory:'player_sales', amountNative:10.152, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Sociais', normalizedCategory:'member_dues', amountNative:2.330, disclosureLevel:'detailed' },
    { rawLabel:'Outras', normalizedCategory:'other_income', amountNative:6.084, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:0.240, disclosureLevel:'detailed' },
    { rawLabel:'Cotas de transmissão', normalizedCategory:'broadcasting', amountNative:14.298, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:1.827, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de atletas', normalizedCategory:'player_sales', amountNative:42.132, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Sociais', normalizedCategory:'member_dues', amountNative:2.121, disclosureLevel:'detailed' },
    { rawLabel:'Outras', normalizedCategory:'other_income', amountNative:2.950, disclosureLevel:'detailed' },
  ],
};

const guaraniBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários e encargos', normalizedCategory:'wages_squad', amountNative:-21.689, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-3.659, disclosureLevel:'detailed' },
    { rawLabel:'Jogos', normalizedCategory:'match_organisation_expense', amountNative:-8.155, disclosureLevel:'detailed' },
    { rawLabel:'Direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-2.698, disclosureLevel:'detailed' },
    { rawLabel:'Gastos gerais com atividade desportiva', normalizedCategory:'match_organisation_expense', amountNative:-8.234, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-9.300, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.247, disclosureLevel:'detailed' },
    { rawLabel:'Contingências (desafetação de previsão)', normalizedCategory:'exceptional_items', amountNative:0.001, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Salários e encargos', normalizedCategory:'wages_squad', amountNative:-19.155, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-4.582, disclosureLevel:'detailed' },
    { rawLabel:'Jogos', normalizedCategory:'match_organisation_expense', amountNative:-6.127, disclosureLevel:'detailed' },
    { rawLabel:'Direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-2.983, disclosureLevel:'detailed' },
    { rawLabel:'Gastos gerais com atividade desportiva', normalizedCategory:'match_organisation_expense', amountNative:-8.000, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-12.399, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.167, disclosureLevel:'detailed' },
  ],
};

const guaraniBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'guarani-br-demonstracoes-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = Empréstimos (0,484, circulante) + Recuperação Judicial (29,112, circulante) +
    // Antecipações (11,223 circulante + 104,125 não circulante) — ver comentario de cabecera para
    // el criterio completo. cash = Caixa e equivalentes de caixa (Nota 4).
    grossDebt:144.944, cash:0.298,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receita Financeira (7,523) − Despesas financiamentos (0,769), efecto grande
    // plausiblemente ligado a la homologación de la recuperación judicial en 2024 (ver cabecera).
    netInterest:6.754, tax:0,
    // officialTotalRevenue = 46,817 M, EXACTO igual a "Receitas Operacionais" impreso.
    // officialTotalExpenses = 53,983 M = subtotal "Custos e Despesas Operacionais" impreso (mis
    // líneas suman 53,981 M, diff redondeo de R$2.000 — se usó el impreso porque reconcilia EXACTO
    // contra el Déficit do Exercício final: 46,817 − 53,983 + 6,754 = −0,412).
    // officialPAT = "Déficit do Exercício" impreso (−0,412).
    officialTotalRevenue:46.817, officialTotalExpenses:53.983, officialPAT:-0.412,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'guarani-br-demonstracoes-2024-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = Empréstimos (1,018 circulante) + Recuperação Judicial (5,640 circulante + 23,179
    // não circulante) + Antecipações (5,032 circulante + 107,625 não circulante).
    grossDebt:142.494, cash:6.535,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receita financeira (1,305) − Despesas financiamentos (3,384).
    netInterest:-2.079, tax:0,
    // officialTotalRevenue = 63,569 M (mis líneas suman 63,568, diff redondeo de R$1.000).
    // officialTotalExpenses = 53,413 M, EXACTO igual a mis líneas y al subtotal impreso.
    // officialPAT = "Superávit do Exercício" impreso (8,077), revierte el déficit de 2024.
    // Verificado: 63,569 − 53,413 − 2,079 = 8,077, EXACTO.
    officialTotalRevenue:63.569, officialTotalExpenses:53.413, officialPAT:8.077,
  },
};

const guaraniBrPresupuestoOverlayByYear = {};

const guaraniBrPasesData = [];
const guaraniBrResultadosData = {};
const guaraniBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['guarani-br'] = {
  revenueLinesByYear: guaraniBrRevenueLinesByYear, expenseLinesByYear: guaraniBrExpenseLinesByYear,
  fiscalYearMeta: guaraniBrFiscalYearMeta, pasesData: guaraniBrPasesData,
  resultadosData: guaraniBrResultadosData, titulosData: guaraniBrTitulosData,
  presupuestoOverlayByYear: guaraniBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'guarani-br-demonstracoes-2023-2024': {
    id:'guarani-br-demonstracoes-2023-2024', clubId:'guarani-br',
    title:'Demonstrações Financeiras do Guarani Futebol Clube — Em Recuperação Judicial, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://futebolpaulista.com.br/Repositorio/Institucional/2024/Guarani.pdf',
    note:'PDF con capa de texto real (formato "publicación legal", recorte de gazetasp.com.br), descargado del repositorio institucional de la Federação Paulista de Futebol. Auditado por ASSESSORA ASSESSORES E AUDITORES EIRELI EPP con opinião COM RESSALVAS (adiantamentos, bloqueios judiciais sin documentación, obligações trabalhistas/tributárias sin reconciliar, provisão de contingências sin actualizar por multas/intereses). El clube está EM RECUPERAÇÃO JUDICIAL (aprobada 27/2/2023, homologada 3/6/2024). Transcripción completa en Clubes/Brasil/Guarani/demonstracoes-financeiras-2023-2024.md. 2024 fue un ejercicio de déficit (R$412 mil). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923).',
  },
  'guarani-br-demonstracoes-2024-2025': {
    id:'guarani-br-demonstracoes-2024-2025', clubId:'guarani-br',
    title:'Demonstrações Financeiras do Guarani Futebol Clube — Em Recuperação Judicial, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://guaranifc.com.br/wp-content/uploads/2026/04/1-RELATORIO-DE-AUDITORIA-COM-AS-DEMONSTRACOES-FINANCEIRAS-GUARANI-2025.pdf',
    note:'PDF oficial (texto nativo), descargado de la sección de gobernanza del sitio propio del club (guaranifc.com.br/governanca/). Auditado por Audcorp Auditoria e Assessoria S/S (José Augusto Barbosa, CRC 1SP 120808/0-6), opinião COM RESSALVAS (obrigações trabalhistas/tributárias sin documentación completa, contingencia tributaria de 2006 no reconocida por R$6.200 mil, ajuste retroactivo de adiantamentos en desacuerdo con CPC 23). 2025 revirtió el déficit de 2024 con un superávit de R$8.077 mil, impulsado principalmente por la negociación de atletas (R$42,1 M, incl. R$6,1 M de categorías de base). Transcripción completa en Clubes/Brasil/Guarani/demonstracoes-financeiras-2024-2025.md. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024).',
  },
});

// gestionesByClub: entrada genérica "sin confirmar" — Rômulo Aleksander Moreno Amaro firma como
// "Presidente do Conselho de Administração" en los 2 documentos (2024 y 2025), pero ese cargo no
// confirma con la certeza que exige club-data-mapping SKILL.md sección 7 que sea la máxima
// autoridad ejecutiva del club durante todo el período.
gestionesByClub['guarani-br'] = {
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (firma 2024 y 2025: Rômulo Aleksander Moreno Amaro, Presidente do Conselho de Administração)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['guarani-br'] = null; // no se encontró una cifra de socios en ninguno de los 2 documentos
