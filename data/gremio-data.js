// ============================================================================
// data/gremio-data.js — Grêmio Foot-Ball Porto Alegrense (Porto Alegre, RS, Brasil).
// NO es SAF (sigue como associação/clube social tradicional, sin desmembrar el fútbol profissional
// en una Sociedade Anônima do Futebol) — ver fuentes/Brasil/Gremio.md. 1 ejercicio cargado: 2024
// (ejercicio social = ANO CALENDÁRIO completo, 1°/1/2024 a 31/12/2024, a diferencia de los clubes
// argentinos ya cargados en el sitio, que cierran a mitad de año — ver clubs.js,
// fiscalYearStart:'01-01', y el comentario de `isCalendarYearClub()` en js/finanzas-calc.js, que
// generaliza `ejercicioLabel()`/el dropdown "Año"/los gráficos de Inicio para mostrar "2024" en vez
// del rango de temporada "2023/2024" que se usaría para un club argentino).
//
// Fuente: "Demonstrações contábeis dos exercícios findos em 31 de dezembro de 2024 e de 2023",
// auditadas por Baker Tilly Brasil RS Auditores Independentes (opinião sem ressalvas, ver relatório
// pág. 1-5 del PDF), firmado marzo de 2025. PDF con texto nativo (no escaneado), transcripción
// completa en Clubes/Brasil/Gremio/demonstracoes-contabeis-2023-2024.md (vía pdftotext -layout).
// Solo se cargó el ejercicio 2024 (columna "año corriente" del propio documento) — la columna
// comparativa "2023 (Reapresentado)" del mismo PDF NO se cargó como un ejercicio propio (ver
// club-data-mapping SKILL.md sección 6.5: la columna comparativa de un balance posterior puede estar
// reexpresada/reclasificada distinto de como se hubiera presentado en su propio ejercicio — acá
// además "Reapresentado" señala explícitamente una reclasificación real: la negociação de atletas se
// movió en 2024 de "Custo Operacional" a "Outras receitas/despesas operacionais" por un cambio de
// norma contable (NBC ITG 2003 R2), así que 2023 tal como aparece en ESTE documento no es comparable
// 1:1 con un eventual balance 2023 propio).
//
// ESCALA: el documento expresa todos sus valores "em milhares de reais" (miles de reales). Acá se
// guardan en MILLONES de BRL nativos (mismo criterio de escala que usan los clubes argentinos en
// ARS millones) — cada valor impreso (con "." como separador de miles a la brasileña, ej. "403.081"
// = cuatrocientos tres mil ochenta y uno) se dividió por 1.000 para pasar de miles a millones. La
// fuerte coincidencia de que un número grande como "403.081" leído tal cual como decimal YA da el
// valor correcto en millones es eso, una coincidencia de esta magnitud de cifras — los montos chicos
// SIN separador de miles en el documento (ej. "11", "157", "934") NO se cargaron literales, se
// dividieron por 1.000 igual (0.011 / 0.157 / 0.934), mismo criterio aplicado sin excepción a cada
// línea.
//
// Categorización (Nota 22 "Receita Operacional Líquida" + Nota 25 "Outras Receitas/Despesas
// Operacionais", que en conjunto arman TODO el revenue; Notas 23 "Custos das Operações" + 24
// "Despesas Gerais e Administrativas" + los ítems negativos de Nota 25, que arman TODO expense):
// - 'Receitas Patrimoniais' -> member_dues: el documento no desglosa qué compone esta línea (2da
//   más grande de Ingresos), pero "patrimonial" en el vocabulario de clubes brasileños se refiere
//   típicamente a mensalidades de sócio patrimonial (categoría de socio con derecho a butaca/palco
//   fijo) — es la lectura más fiel disponible sin un desglose propio, documentada acá como supuesto,
//   no como un dato confirmado línea por línea.
// - 'Receitas de Luvas Contratuais' -> other_income: "luvas" son un bonus/prima contractual (Nota 18:
//   deferred revenue de un contrato de 2019, amortizado hasta 2024), no necesariamente comercial ni
//   de estadio — se dejó en el catch-all en vez de forzarlo a sponsorship_commercial sin certeza.
// - 'Receitas de Royalties' -> other_income: licenciamento/franquias (ver Nota "m", reconocimiento de
//   ingresos), no hay categoría de licensing propia en category-map.js.
// - 'Vendas Grêmio Mania' (tienda del club) -> sponsorship_commercial (la categoría ya incluye
//   "merchandising" en su comentario de category-map.js), neta de devoluciones e impuestos sobre
//   ventas (mismos 3 números que imprime la Nota 22-d, con `items` para no perder el desglose).
// - 'Venda de Atletas' (Nota 25, ex-Nota 22 hasta el cambio de norma de 2024) -> player_sales.
// - 'Mecanismo de Solidariedade' (Nota 25-b: FIFA training compensation por jugadores formados en el
//   club que se transfieren después) -> youth_football (derechos de formación).
// - 'Valor justo (cessão de crédito Arena Porto-Alegrense)' -> other_income: ganancia NO recurrente
//   de único ejercicio por la adquisición a descuento de un crédito judicial contra la operadora del
//   estadio (Nota 6-e, detalle completo ahí) — no hay categoría "exceptional_items" del lado ingreso
//   en category-map.js, other_income es el catch-all correcto para un ítem no operativo.
// - 'Negociação de atletas' (Nota 25, NEGATIVO — comisiones/costos de intermediación, distinto de la
//   ganancia de 'Venda de Atletas') -> other_expenses, mismo criterio que Racing (ver
//   club-data-mapping SKILL.md sección 13, "Pago de gastos por compraventa de jugadores" se dejó en
//   other_expenses, no en player_amortisation, porque esa categoría en Boca es solo
//   amortización/deterioro contable, no comisiones).
// - 'Ingressos a Sócios' y 'CMV – Grêmio Mania' (dentro de Nota 23, Custo Operacional) ->
//   admin_general_expense: costo de servicio a socios y costo de mercadería vendida de la tienda,
//   ninguno de los dos es plantel/organización de partidos.
// - Resto de Nota 23 (sueldos plantel, amortización de pases, viajes, gastos de federaciones/
//   imágenes/premios/material deportivo) -> wages_squad / player_amortisation /
//   match_organisation_expense según corresponda, mismo criterio que el resto del sitio.
// - Nota 24 completa (Despesas Gerais e Administrativas) -> admin_general_expense, salvo
//   Depreciação -> depreciation y el "Outras despesas" final de esa nota -> other_expenses (catch-all
//   propio de esa nota, no administrativo específico).
//
// Verificación (Nodo, hecha antes de cargar): revenueLines suma EXACTO 615.021 M BRL; expenseLines
// suma EXACTO -510.536 M BRL; revenue+expenses = 104.485 M BRL = "SUPERÁVIT ANTES DO RESULTADO
// FINANCEIRO" impreso (pág. 7 del PDF); + netInterest (-60.893, Resultado Financeiro neto, Nota 26)
// = 43.592 M BRL = "SUPERÁVIT DO EXERCÍCIO" impreso, exacto. grossDebt = "Instituições financeiras"
// circulante (38.801) + não circulante (60.835) = 99.636 M BRL (balanço patrimonial, pág. 6). cash =
// "Caixa e equivalentes de caixa" = 11.145 M BRL (misma página).
//
// FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 (venda) — cotización oficial del Banco Central do
// Brasil investigada externamente (el documento de Grêmio no declara un tipo de cambio propio, el
// club no reporta en USD en ningún anexo). Fuente: dadosabertos.bcb.gov.br / cobertura de prensa del
// cierre de 2024 (dólar cerró el año en R$6,179-6,19 según la fuente, "maior alta desde 2020").
//
// Gestión: el balance está firmado por Alberto Jeronimo Guerra Neto como Presidente (marzo de 2025),
// pero esta sesión no confirmó fecha de inicio/fin de su mandato con la profundidad que exige
// club-data-mapping SKILL.md sección 7 ("solo si estás seguro") — se cargó una gestión mínima que
// cubre ÚNICAMENTE el año efectivamente confirmado por la firma del documento (2024), sin inventar
// un rango de mandato más amplio.
// ============================================================================

const gremioRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:178.616, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Patrimoniais', normalizedCategory:'member_dues', amountNative:99.046, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Publicitárias', normalizedCategory:'sponsorship_commercial', amountNative:65.375, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de Luvas Contratuais', normalizedCategory:'other_income', amountNative:17.706, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de Jogos', normalizedCategory:'matchday_competition', amountNative:11.997, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de Royalties', normalizedCategory:'other_income', amountNative:11.775, disclosureLevel:'detailed' },
    { rawLabel:'Vendas Grêmio Mania (líquido de devoluções e impostos)', normalizedCategory:'sponsorship_commercial', amountNative:18.566, disclosureLevel:'detailed', items:[
      ['Vendas Grêmio Mania', 22.150], ['Devoluções de vendas', -0.417], ['Impostos sobre vendas', -3.167],
    ]},
    { rawLabel:'Venda de Atletas', normalizedCategory:'player_sales', amountNative:105.303, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidariedade', normalizedCategory:'youth_football', amountNative:1.017, disclosureLevel:'detailed' },
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:0.011, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:15.523, disclosureLevel:'detailed' },
    { rawLabel:'Valor justo (cessão de crédito Arena Porto-Alegrense, Nota 6-e)', normalizedCategory:'other_income', amountNative:88.995, disclosureLevel:'detailed' },
    { rawLabel:'Festejos e Aniversários', normalizedCategory:'other_income', amountNative:0.157, disclosureLevel:'detailed' },
    { rawLabel:'Multas e indenizações', normalizedCategory:'other_income', amountNative:0.934, disclosureLevel:'detailed' },
  ],
};

const gremioExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários, benefícios e encargos sociais (plantel)', normalizedCategory:'wages_squad', amountNative:-164.647, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direitos sobre Atletas Profissionais', normalizedCategory:'player_amortisation', amountNative:-47.404, disclosureLevel:'detailed' },
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-18.701, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Federações, Imagens, Prêmios, Material Esportivo e outras', normalizedCategory:'match_organisation_expense', amountNative:-134.467, disclosureLevel:'detailed' },
    { rawLabel:'Ingressos a Sócios', normalizedCategory:'admin_general_expense', amountNative:-22.068, disclosureLevel:'detailed' },
    { rawLabel:'CMV – Grêmio Mania', normalizedCategory:'admin_general_expense', amountNative:-10.977, disclosureLevel:'detailed' },
    { rawLabel:'Salários, benefícios e encargos sociais (demais administrativas)', normalizedCategory:'admin_general_expense', amountNative:-37.690, disclosureLevel:'detailed' },
    { rawLabel:'Tributos e Contribuições Federais', normalizedCategory:'admin_general_expense', amountNative:-7.263, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-15.776, disclosureLevel:'detailed' },
    { rawLabel:'Contingências Judiciais', normalizedCategory:'admin_general_expense', amountNative:-8.786, disclosureLevel:'detailed' },
    { rawLabel:'Aluguéis, Seguros, Materiais de Consumo e de Expediente', normalizedCategory:'admin_general_expense', amountNative:-7.919, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação de Ativos Imobilizados', normalizedCategory:'depreciation', amountNative:-6.327, disclosureLevel:'detailed' },
    { rawLabel:'Água, Luz, Telefonia, Manutenção, Transportes e outras', normalizedCategory:'admin_general_expense', amountNative:-5.662, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (administrativas)', normalizedCategory:'other_expenses', amountNative:-0.579, disclosureLevel:'detailed' },
    { rawLabel:'Negociação de Atletas (comissões e custos)', normalizedCategory:'other_expenses', amountNative:-22.150, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (operacionais)', normalizedCategory:'other_expenses', amountNative:-0.120, disclosureLevel:'detailed' },
  ],
};

const gremioFiscalYearMeta = {
  2024: {
    currency:'BRL', fx:6.1923,
    sourceId:'gremio-demonstracoes-2023-2024',
    reportType:'official_balance_sheet',
    gestionId:'guerraneto',
    // grossDebt = "Instituições financeiras" circulante (38.801) + não circulante (60.835), balanço
    // patrimonial pág. 6. cash = "Caixa e equivalentes de caixa" (misma página).
    grossDebt:99.636, cash:11.145,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Resultado Financeiro neto (Nota 26): Receitas financeiras 10.598 - Despesas
    // financeiras 71.491.
    netInterest:-60.893, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma de revenueLines/expenseLines de arriba
    // (615.021 / 510.536 M BRL) — el documento no imprime un único "Total Revenue"/"Total Expenses"
    // en una sola línea (la DRE está armada en bloques: Receita Operacional Líquida, Custo
    // Operacional, Despesas G&A, Outras receitas/despesas operacionais, Resultado financeiro), así
    // que estos 2 campos son la suma verificada de todas las líneas cargadas, no un número copiado
    // directo de una sola fila. officialPAT = "SUPERÁVIT DO EXERCÍCIO" impreso, pág. 7.
    officialTotalRevenue:615.021, officialTotalExpenses:510.536, officialPAT:43.592,
  },
};

// Sin overlay de presupuesto (Grêmio no publicó un presupuesto para el mismo ejercicio en esta
// sesión) — mismo patrón vacío que riverPresupuestoOverlayByYear.
const gremioPresupuestoOverlayByYear = {};

const gremioPasesData = [];
const gremioResultadosData = {};
const gremioTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.gremio = {
  revenueLinesByYear: gremioRevenueLinesByYear, expenseLinesByYear: gremioExpenseLinesByYear,
  fiscalYearMeta: gremioFiscalYearMeta, pasesData: gremioPasesData,
  resultadosData: gremioResultadosData, titulosData: gremioTitulosData,
};


Object.assign(sources, {
  'gremio-demonstracoes-2023-2024': {
      id:'gremio-demonstracoes-2023-2024', clubId:'gremio',
      title:'Demonstrações Contábeis dos Exercícios Findos em 31 de Dezembro de 2024 e de 2023 (Reapresentado)',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://gremio.net/documentos/',
      note:'PDF oficial (42 páginas, texto nativo), auditado por Baker Tilly Brasil RS Auditores Independentes (opinião sem ressalvas), firmado marzo de 2025, descargado directo de gremio.net/documentos/. Transcripción completa en Clubes/Brasil/Gremio/demonstracoes-contabeis-2023-2024.md. Solo se cargó el ejercicio 2024 (la columna 2023 del mismo documento está "Reapresentada" tras un cambio de norma contable, no comparable 1:1 con un balance 2023 propio). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923), investigado externamente — el documento no declara tipo de cambio propio.',
    },
});

gestionesByClub.gremio = {
    // Firmante del balance (marzo de 2025) como Presidente — no se confirmó con profundidad el
    // rango completo de su mandato en esta sesión, ver comentario de cabecera. Cubre únicamente el
    // año cargado.
    guerraneto: { nombre:'Guerra Neto (presidente al momento del balance 2024)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.gremio = null; // no se encontró una cifra confiable en esta sesión
