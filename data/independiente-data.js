// ============================================================================
// data/independiente-data.js — Club Atlético Independiente: 7mo club del motor genérico. Un
// ejercicio cargado: 2023/2024 (1°/7/2023 al 30/6/2024), balance auditado real, texto nativo. PDF +
// transcripción en Clubes/Argentina/Independiente/memoria-y-balance-2023-2024.{pdf,md}.
//
// Estructura del documento: el Estado de Recursos y Gastos principal usa 3 líneas agregadas
// (Actividades Deportivas/Cuotas de Socios/Otros Recursos, y sus 3 espejos de Gastos), que remiten
// al Anexo V ("Apertura de Recursos y Gastos, clasificados por actividad") para el desglose por
// DEPARTAMENTO (Fútbol Profesional/Fútbol Juvenil/Educación Física/Complejo de Tenis/Filial Capital
// Federal/Centro Educativo/Complejo Wilde/Parque Santo Domingo/Estadio/Sede Central), y el Anexo D
// ("Fútbol Profesional") desglosa ADEMÁS ese departamento por NATURALEZA del rubro (entradas, TV,
// publicidad, plateas, jugadores, técnicos, organización de partidos, etc.) — se usó este nivel más
// fino para Fútbol Profesional, y el nivel de departamento (Anexo V) para el resto.
//
// "Diferencia de Cambio" (activos: 1.113,800909 M; pasivos e intereses: 10.699,446685 M) y RECPAM
// (18.961,207621 M) NO se cargaron como líneas de revenue/expense — el propio Estado de Recursos y
// Gastos los excluye de "Otros Recursos"/"Gastos Administrativos" ("Anexo V sin resultados
// financieros") y los muestra netos en una sección aparte ("RESULTADOS FINANCIEROS Y POR TENENCIA",
// $9.375,561845 M) — van al campo `netInterest`, mismo criterio que el resto de los clubes
// (club-data-mapping/SKILL.md sección 2). "Resultado Inversiones" (987,666079 M) SÍ queda como
// revenue ordinario (`other_income`), porque el documento lo incluye explícitamente dentro de "Otros
// Recursos (Anexo V sin resultados financieros)", no en la sección de resultados financieros.
//
// "Gastos directos derivados de la venta" (de pases, 738,442785 M) se cargó en `other_expenses`, no
// en `player_amortisation` — mismo precedente que Racing/Instituto/Rosario Central (comisiones de
// compraventa de pases separadas de la amortización/costo de adquisición real).
//
// grossDebt = Total del Pasivo (25.968,939849 M) — este balance no tiene una previsión/contingencia
// separable de la deuda real (a diferencia de Instituto/Rosario Central), todo el pasivo son deudas
// bancarias/operativas/sociales-fiscales reales.
//
// fx: el propio balance declara $890,50 para USD al 30/6/2024 (Nota de "Activos y pasivos en moneda
// extranjera", único valor, sin ambigüedad).
//
// Gestión: Néstor Grindetti, presidente desde abril/julio de 2023 (confirmado por búsqueda), cubre
// la totalidad de este ejercicio.
// ============================================================================

const independienteRevenueLinesByYear = {
  2024: [
    // Fútbol Profesional, desglosado por naturaleza (Anexo D).
    { rawLabel:'Ingresos por venta de entradas generales', normalizedCategory:'matchday_competition', amountNative:967.489472, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos partidos amistosos', normalizedCategory:'matchday_competition', amountNative:463.418323, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:2836.075715, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y concesiones', normalizedCategory:'sponsorship_commercial', amountNative:3894.029816, disclosureLevel:'detailed' },
    { rawLabel:'Plateas', normalizedCategory:'season_tickets', amountNative:5879.551558, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_income', amountNative:844.389059, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de futbolistas profesionales', normalizedCategory:'player_sales', amountNative:4145.523929, disclosureLevel:'detailed' },
    { rawLabel:'Resultados por derechos de formación y mecanismos de solidaridad', normalizedCategory:'player_sales', amountNative:591.419614, disclosureLevel:'detailed' },
    // Resto de departamentos (Anexo V, nivel departamento).
    { rawLabel:'Fútbol Juvenil', normalizedCategory:'youth_football', amountNative:62.807704, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Educación Física', normalizedCategory:'other_income', amountNative:133.193580, disclosureLevel:'detailed' },
    { rawLabel:'Complejo de Tenis', normalizedCategory:'other_income', amountNative:131.201365, disclosureLevel:'detailed' },
    { rawLabel:'Filial Capital Federal (actividades)', normalizedCategory:'other_income', amountNative:515.491235, disclosureLevel:'detailed' },
    { rawLabel:'Centro Educativo', normalizedCategory:'other_income', amountNative:1936.897300, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Polideportivo Wilde', normalizedCategory:'other_income', amountNative:261.266336, disclosureLevel:'detailed' },
    { rawLabel:'Estadio (concesiones, no recaudación de partidos)', normalizedCategory:'other_income', amountNative:72.525021, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de Socios (Filial Capital Federal)', normalizedCategory:'member_dues', amountNative:269.965350, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de Socios (Sede Central)', normalizedCategory:'member_dues', amountNative:13248.916744, disclosureLevel:'detailed' },
    { rawLabel:'Carnets de Asociados', normalizedCategory:'member_dues', amountNative:42.301581, disclosureLevel:'detailed' },
    { rawLabel:'Recursos Varios', normalizedCategory:'other_income', amountNative:883.151053, disclosureLevel:'detailed' },
    { rawLabel:'Resultado Inversiones', normalizedCategory:'other_income', amountNative:987.666079, disclosureLevel:'detailed' },
  ],
};

const independienteExpenseLinesByYear = {
  2024: [
    // Fútbol Profesional, desglosado por naturaleza (Anexo D) — personal (jugadores/técnicos/
    // auxiliares/asistencia médica) va a wages_squad, organización de partidos/concentraciones a
    // match_organisation_expense.
    { rawLabel:'Jugadores', normalizedCategory:'wages_squad', amountNative:-11494.498654, disclosureLevel:'detailed' },
    { rawLabel:'Técnicos y preparadores físicos', normalizedCategory:'wages_squad', amountNative:-498.335033, disclosureLevel:'detailed' },
    { rawLabel:'Personal auxiliar fútbol', normalizedCategory:'wages_squad', amountNative:-1196.963202, disclosureLevel:'detailed' },
    { rawLabel:'Asistencia médica', normalizedCategory:'wages_squad', amountNative:-549.511496, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-1214.788836, disclosureLevel:'detailed' },
    { rawLabel:'Concentraciones, traslados, estadías, cesiones y otros', normalizedCategory:'match_organisation_expense', amountNative:-2130.132189, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos amistosos', normalizedCategory:'match_organisation_expense', amountNative:-60.245184, disclosureLevel:'detailed' },
    { rawLabel:'Gastos directos derivados de la venta de jugadores', normalizedCategory:'other_expenses', amountNative:-738.442785, disclosureLevel:'detailed' },
    // Resto de departamentos (Anexo V, nivel departamento) — "todo lo que no es plantel
    // profesional", ver EXPENSE_CATEGORY_LABELS.youth_other_sports_expense.
    { rawLabel:'Fútbol Juvenil (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1917.566423, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Educación Física (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-711.290588, disclosureLevel:'detailed' },
    { rawLabel:'Complejo de Tenis (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-310.260968, disclosureLevel:'detailed' },
    { rawLabel:'Filial Capital Federal (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-221.044991, disclosureLevel:'detailed' },
    { rawLabel:'Centro Educativo (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-2324.309805, disclosureLevel:'detailed' },
    { rawLabel:'Complejo Polideportivo Wilde (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-931.945511, disclosureLevel:'detailed' },
    { rawLabel:'Parque Santo Domingo (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1723.064013, disclosureLevel:'detailed' },
    { rawLabel:'Estadio (gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1889.285004, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-6576.118028, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-1318.497962, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes intangibles (plantel profesional)', normalizedCategory:'player_amortisation', amountNative:-4343.753047, disclosureLevel:'detailed' },
  ],
};

const independienteFiscalYearMeta = {
  2024: {
    currency:'ARS', fx:890.50,
    sourceId:'independiente-memoria-y-balance-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'grindetti',
    // grossDebt = Total del Pasivo (sin previsión/contingencia separable en este balance).
    // cash = Caja y Bancos.
    grossDebt:25968.939849, cash:1704.387140,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados Financieros y por Tenencia" (incluye RECPAM + diferencias de cambio
    // de activos y pasivos), ver comentario de cabecera para la reconciliación completa.
    netInterest:9375.561845, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"+"Transferencias y Préstamos
    // del Plantel Profesional" (extraordinario) / "GASTOS ORDINARIOS" impresos (pág. 6).
    // SUPERÁVIT FINAL real: $7.392.788.960 ARS.
    officialTotalRevenue:38167.280834, officialTotalExpenses:40150.053719, officialPAT:7392.788960,
  },
};

const independientePasesData = [];
const independienteResultadosData = {};
const independienteTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.independiente = {
  revenueLinesByYear: independienteRevenueLinesByYear, expenseLinesByYear: independienteExpenseLinesByYear,
  fiscalYearMeta: independienteFiscalYearMeta, pasesData: independientePasesData,
  resultadosData: independienteResultadosData, titulosData: independienteTitulosData,
};


Object.assign(sources, {
  'independiente-memoria-y-balance-2023-24': {
      id:'independiente-memoria-y-balance-2023-24', clubId:'independiente',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (51 páginas, texto nativo), auditado por Dr. Walter Hugo Rivero, informe de fecha 30/09/2024. SUPERÁVIT FINAL real: $7.392.788.960 ARS. Convertido a USD con $890,50 (Nota "Activos y pasivos en moneda extranjera", único valor declarado). El Anexo D (Fútbol Profesional) desglosa el rubro más grande del club por naturaleza (entradas, TV, publicidad, plateas, jugadores, técnicos, organización de partidos); el Anexo V clasifica el resto por departamento (Fútbol Juvenil, Educación Física, Centro Educativo, etc.). "Diferencia de cambio"+RECPAM se llevan netos a netInterest, igual que el resto de los clubes.',
    },
});

gestionesByClub.independiente = {
    // Confirmado por búsqueda (Versión 95): Néstor Grindetti asumió como interino en abril de 2023
    // y fue confirmado en julio de 2023, mandato hasta diciembre de 2026 — cubre la totalidad del
    // Ejercicio 2023/2024 (1°/7/2023-30/6/2024), el único cargado.
    grindetti: { nombre:'Grindetti (2023-actual)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.independiente = 150000; // ~150.000-160.000 socios (cobertura de prensa, nov-2024 a 2025-26)

