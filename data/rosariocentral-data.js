// ============================================================================
// data/rosariocentral-data.js — Club Atlético Rosario Central: 6to club del motor genérico. Un
// ejercicio cargado: 2022/2023 (1°/7/2022 al 30/6/2023), balance auditado real (Grant Thornton /
// Adler, Hasenclever y Asociados S.R.L.), texto nativo. PDF + transcripción en
// Clubes/Argentina/Rosario Central/estados-contables-2022-2023.{pdf,md}.
//
// Estructura del documento (Anexo V "Recursos" / Anexo VI "Gastos"): cada rubro tiene una fila
// propia con un desglose por DEPARTAMENTO (Fútbol Profesional/Estadio/Ciudad Deportiva/Cruce
// Alberdi/Otras Disciplinas/Subsedes/Tiendas/Administración/Comisión Directiva/Socios/Judiciales/
// Guardería Náutica/Arroyo Seco) — mucho más granular que el Anexo III de Vélez/Instituto (19 filas
// x 8 columnas en Recursos, 38 filas x 13 columnas en Gastos). Para las 3 filas de personal (Sueldos,
// Cargas sociales, Primas) se aplicó el mismo criterio de columna-por-sector (Fútbol Profesional ->
// wages_squad, resto de columnas -> youth_other_sports_expense) que Vélez/Instituto. El resto de las
// ~35 filas (sin desglose salarial) se cargó con su propia columna Total, categorizada por la
// naturaleza del rubro (ver comentario en cada línea abajo), sin partir por departamento.
//
// VERIFICACIÓN QUE ENCONTRÓ Y CORRIGIÓ UN ERROR DE LECTURA: la suma de los 38 rubros de Gastos
// (Anexo VI) contra el "Total gastos ordinarios" impreso ($11.600.201.350) dio una diferencia de
// $201.178.171 en el primer intento — la fila "Préstamos" se había leído con Total=$418.582.883,
// mientras que su columna Fútbol Profesional (única columna con valor) daba $619.761.055. Usando
// $619.761.055 como Total de esa fila, la suma cierra exacta (diferencia de $1, redondeo). El
// `pdftotext -layout` desalinea columnas en tablas muy anchas con salto de línea — la fila entera es
// Fútbol Profesional, ninguna otra columna tiene valor. Ver club-data-mapping/SKILL.md sección 6
// para el criterio general ("si no cierra, buscar qué explica la diferencia antes de asumir nada").
//
// grossDebt: excluye "Previsiones" (Anexo III, contingencia por juicios, no deuda financiera real) —
// mismo criterio que Boca/Vélez/Instituto: Total del Pasivo (5.166,386522) - Previsiones
// (1.037,827336) = 4.128,559186 M.
//
// DUDA ABIERTA (ver Admin/dudas-por-club.md): el Anexo IV (moneda extranjera) declara DOS cotizaciones de
// USD distintas en el MISMO balance — $255,00 del lado del Activo (Caja y bancos) y $268,00 del lado
// del Pasivo (Acreedores varios fútbol). Se usó $255,00 (la que corresponde a "Caja y bancos", el
// campo que alimenta `cash`) como fx único del sitio, pero es una aproximación — el club claramente
// usa "comprador"/"vendedor" distinto según el rubro, y el sitio solo modela un fx por ejercicio.
//
// Gestión: Gonzalo Belloso asumió el 18/12/2022, a mitad de este ejercicio (1°/7/2022-30/6/2023) —
// se cargó bajo su gestión completa, mismo criterio que Berlanga/Rapisarda en Vélez (el ejercicio
// donde asume a mitad de año cae bajo la gestión nueva).
// ============================================================================

const rosarioCentralRevenueLinesByYear = {
  2023: [
    { rawLabel:'Emisión de cuotas mensuales', normalizedCategory:'member_dues', amountNative:2076.206694, disclosureLevel:'detailed' },
    { rawLabel:'Conscripción Socios', normalizedCategory:'member_dues', amountNative:0.014344, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión', normalizedCategory:'broadcasting', amountNative:814.423507, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:367.548178, disclosureLevel:'detailed' },
    { rawLabel:'Comercialización', normalizedCategory:'sponsorship_commercial', amountNative:249.284142, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:323.838454, disclosureLevel:'detailed' },
    { rawLabel:'Venta y préstamo de jugadores', normalizedCategory:'player_sales', amountNative:4348.286047, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación y mecanismos de solidaridad', normalizedCategory:'player_sales', amountNative:109.935115, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_income', amountNative:18.299684, disclosureLevel:'detailed' },
    { rawLabel:'Balneario y pileta', normalizedCategory:'other_sports', amountNative:56.654725, disclosureLevel:'detailed' },
    { rawLabel:'Abonos guardería náutica', normalizedCategory:'other_sports', amountNative:128.261093, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones', normalizedCategory:'other_income', amountNative:9.307793, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:29.676000, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y adicionales hoteles', normalizedCategory:'other_income', amountNative:0.549583, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por eventos', normalizedCategory:'other_income', amountNative:89.270069, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos regalías', normalizedCategory:'other_income', amountNative:2.809438, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:135.381638, disclosureLevel:'detailed' },
  ],
};

const rosarioCentralExpenseLinesByYear = {
  2023: [
    // Anexo VI, 3 filas de personal separadas por columna de sector (Fútbol Profesional -> wages_squad,
    // resto de columnas -> youth_other_sports_expense), mismo criterio que Vélez/Instituto.
    { rawLabel:'Sueldos (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-321.831837, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos (resto de departamentos)', normalizedCategory:'youth_other_sports_expense', amountNative:-941.589958, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-56.521835, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (resto de departamentos)', normalizedCategory:'youth_other_sports_expense', amountNative:-266.696462, disclosureLevel:'detailed' },
    { rawLabel:'Primas (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-1107.149920, disclosureLevel:'detailed' },
    { rawLabel:'Primas (Otras Disciplinas)', normalizedCategory:'youth_other_sports_expense', amountNative:-3.145226, disclosureLevel:'detailed' },
    // Resto de Anexo VI, sin desglose salarial — su propia columna Total, por naturaleza del rubro.
    { rawLabel:'Costo por transferencias y bajas de derechos', normalizedCategory:'player_amortisation', amountNative:-3640.416289, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de intangibles (Anexo I)', normalizedCategory:'player_amortisation', amountNative:-1004.762266, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de contratación', normalizedCategory:'player_amortisation', amountNative:-559.757335, disclosureLevel:'detailed' },
    // Corregido: Total real de esta fila es la columna Fútbol Profesional ($619.761.055), no el
    // $418.582.883 que el layout de pdftotext desalineó — ver comentario de cabecera.
    { rawLabel:'Préstamos (de jugadores)', normalizedCategory:'player_amortisation', amountNative:-619.761055, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismos de formación pagados', normalizedCategory:'player_amortisation', amountNative:-14.923484, disclosureLevel:'detailed' },
    { rawLabel:'Premios y gratificaciones', normalizedCategory:'match_organisation_expense', amountNative:-102.144374, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales (gasto)', normalizedCategory:'match_organisation_expense', amountNative:-141.717321, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y comidas', normalizedCategory:'match_organisation_expense', amountNative:-184.143545, disclosureLevel:'detailed' },
    { rawLabel:'Equipos y útiles deportivos', normalizedCategory:'match_organisation_expense', amountNative:-22.928896, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-4.391479, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios profesionales', normalizedCategory:'admin_general_expense', amountNative:-142.370189, disclosureLevel:'detailed' },
    { rawLabel:'Franqueo y correspondencia', normalizedCategory:'admin_general_expense', amountNative:-2.363358, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de telefonía e internet', normalizedCategory:'admin_general_expense', amountNative:-2.077660, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por cobradores y comisiones tarjetas', normalizedCategory:'admin_general_expense', amountNative:-114.909671, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos, tasas y contribuciones', normalizedCategory:'admin_general_expense', amountNative:-82.854739, disclosureLevel:'detailed' },
    { rawLabel:'Libros, impresos y útiles', normalizedCategory:'admin_general_expense', amountNative:-11.035082, disclosureLevel:'detailed' },
    { rawLabel:'Prensa', normalizedCategory:'admin_general_expense', amountNative:-0.008827, disclosureLevel:'detailed' },
    { rawLabel:'Sistemas de computación', normalizedCategory:'admin_general_expense', amountNative:-31.835612, disclosureLevel:'detailed' },
    { rawLabel:'Asistencia médica y farmacéutica', normalizedCategory:'admin_general_expense', amountNative:-71.382180, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso (Anexo II)', normalizedCategory:'depreciation', amountNative:-102.664906, disclosureLevel:'detailed' },
    { rawLabel:'Indemnizaciones', normalizedCategory:'other_expenses', amountNative:-38.871344, disclosureLevel:'detailed' },
    { rawLabel:'Movilidad y viáticos', normalizedCategory:'other_expenses', amountNative:-138.332497, disclosureLevel:'detailed' },
    { rawLabel:'Custodia y vigilancia', normalizedCategory:'other_expenses', amountNative:-228.862955, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (gasto)', normalizedCategory:'other_expenses', amountNative:-74.786599, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-77.537636, disclosureLevel:'detailed' },
    { rawLabel:'Agasajos, distinciones y homenajes', normalizedCategory:'other_expenses', amountNative:-16.197753, disclosureLevel:'detailed' },
    { rawLabel:'Balneario y pileta (gasto)', normalizedCategory:'other_expenses', amountNative:-6.843609, disclosureLevel:'detailed' },
    { rawLabel:'Costos de comercialización', normalizedCategory:'other_expenses', amountNative:-94.747012, disclosureLevel:'detailed' },
    { rawLabel:'Descuentos concedidos', normalizedCategory:'other_expenses', amountNative:-0.429998, disclosureLevel:'detailed' },
    { rawLabel:'Eventos (gasto)', normalizedCategory:'other_expenses', amountNative:-56.558474, disclosureLevel:'detailed' },
    { rawLabel:'Litigios judiciales pagados', normalizedCategory:'other_expenses', amountNative:-36.629662, disclosureLevel:'detailed' },
    { rawLabel:'Quebrantos por incobrabilidad', normalizedCategory:'other_expenses', amountNative:-59.066553, disclosureLevel:'detailed' },
    { rawLabel:'Reparación y mantenimiento', normalizedCategory:'other_expenses', amountNative:-182.815069, disclosureLevel:'detailed' },
    { rawLabel:'Seguros pagados', normalizedCategory:'other_expenses', amountNative:-16.567644, disclosureLevel:'detailed' },
    // Aumento de la previsión por juicios (Anexo III), mayormente en Fútbol Profesional — ordinario
    // según el propio Estado de Recursos y Gastos (no está en una sección de extraordinarios aparte).
    { rawLabel:'Juicios (aumento de previsión)', normalizedCategory:'other_expenses', amountNative:-1018.571040, disclosureLevel:'detailed' },
  ],
};

const rosarioCentralFiscalYearMeta = {
  2023: {
    // Ver DUDA ABIERTA en el comentario de cabecera: el balance declara $255 (Activo) y $268
    // (Pasivo) para USD en el mismo Anexo IV. Se usó $255 (coherente con `cash`, que sale de "Caja
    // y bancos").
    currency:'ARS', fx:255, fxSource:'document_close',
    sourceId:'rosariocentral-estados-contables-2022-23',
    reportType:'official_balance_sheet',
    gestionId:'belloso',
    // grossDebt = Total del Pasivo (5.166,386522) - Previsiones/Anexo III (1.037,827336, contingencia
    // por juicios, no deuda financiera real). cash = Caja y bancos.
    grossDebt:4128.559186, cash:42.788840,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia, netos, incluyendo RECPAM".
    netInterest:-266.766751, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
    // ordinarios" impresos (pág. 6). DÉFICIT DEL EJERCICIO real: $(3.107.221.597) ARS.
    officialTotalRevenue:8759.746504, officialTotalExpenses:11600.201350, officialPAT:-3107.221597,
  },
};

const rosarioCentralPasesData = [];
const rosarioCentralResultadosData = {};
const rosarioCentralTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.rosariocentral = {
  revenueLinesByYear: rosarioCentralRevenueLinesByYear, expenseLinesByYear: rosarioCentralExpenseLinesByYear,
  fiscalYearMeta: rosarioCentralFiscalYearMeta, pasesData: rosarioCentralPasesData,
  resultadosData: rosarioCentralResultadosData, titulosData: rosarioCentralTitulosData,
};


Object.assign(sources, {
  'rosariocentral-estados-contables-2022-23': {
      id:'rosariocentral-estados-contables-2022-23', clubId:'rosariocentral',
      title:'Estados Contables (balance auditado), Ejercicio 1°/7/2022 al 30/6/2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://rosariocentral.com/wp-content/uploads/2023/10/EECC-Club-Atletico-Rosario-Central-e-Informe-del-auditor-30.06.2023-Firma-FT-1-1-1.pdf',
      note:'PDF oficial (43 páginas, texto nativo), auditado por Adler, Hasenclever y Asociados S.R.L. (Grant Thornton), informe de fecha 11/10/2023. DÉFICIT real del ejercicio: $(3.107.221.597) ARS. El Anexo IV (moneda extranjera) declara DOS cotizaciones de USD distintas en el mismo balance ($255 lado Activo, $268 lado Pasivo) — se usó $255 (coherente con "Caja y bancos"), ver duda abierta en Admin/dudas-por-club.md. Se corrigió una diferencia de $201.178.171 al verificar la suma de Gastos contra el total impreso: la fila "Préstamos" del Anexo VI se había leído con el valor equivocado por desalineación de columnas de pdftotext en una tabla muy ancha — ver comentario completo en data/rosariocentral-data.js.',
    },
});

gestionesByClub.rosariocentral = {
    // Confirmado por búsqueda (Versión 95): Gonzalo Belloso asumió el 18/12/2022, a mitad del
    // Ejercicio 2022/2023 (1°/7/2022-30/6/2023) — cargado bajo su gestión completa, mismo criterio
    // que Berlanga/Rapisarda en Vélez.
    belloso: { nombre:'Belloso (2022-actual)', firstYear:2023, lastYear:2023 },
  };

memberCountByClub.rosariocentral = 96000; // "más de 96.000 socios" (sitio oficial vía cobertura de prensa, 2025-26)

