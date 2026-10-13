const banfieldArRevenueLinesByYear = {
  2020: [
    { rawLabel:'Transferencias y Préstamos', normalizedCategory:'player_sales', amountNative:132.687500, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Socios', normalizedCategory:'member_dues', amountNative:63.385042, disclosureLevel:'detailed' },
    { rawLabel:'Formación de Jugadores', normalizedCategory:'player_sales', amountNative:50.305977, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:27.699428, disclosureLevel:'detailed' },
    { rawLabel:'Entradas Grales., Plateas, Palcos y Abonos', normalizedCategory:'matchday_competition', amountNative:22.284826, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol Amateur - Derechos', normalizedCategory:'player_sales', amountNative:4.547082, disclosureLevel:'detailed' },
    { rawLabel:'Pileta Natación (Predio)', normalizedCategory:'other_sports', amountNative:2.987267, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento (Predio)', normalizedCategory:'other_income', amountNative:1.471150, disclosureLevel:'detailed' },
    { rawLabel:'Colonia (Predio)', normalizedCategory:'other_sports', amountNative:0.983501, disclosureLevel:'detailed' },
    { rawLabel:'Acceso a Predio', normalizedCategory:'other_income', amountNative:0.137240, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler (Predio)', normalizedCategory:'other_income', amountNative:0.031559, disclosureLevel:'detailed' },
    { rawLabel:'Escuela de Fútbol (Departamento Deportes)', normalizedCategory:'youth_football', amountNative:6.346066, disclosureLevel:'detailed' },
    { rawLabel:'Hockey', normalizedCategory:'other_sports', amountNative:5.258900, disclosureLevel:'detailed' },
    { rawLabel:'Futsal', normalizedCategory:'other_sports', amountNative:1.281824, disclosureLevel:'detailed' },
    { rawLabel:'Voley', normalizedCategory:'other_sports', amountNative:1.184147, disclosureLevel:'detailed' },
    { rawLabel:'Tenis', normalizedCategory:'other_sports', amountNative:1.144882, disclosureLevel:'detailed' },
    { rawLabel:'Handball', normalizedCategory:'other_sports', amountNative:1.125940, disclosureLevel:'detailed' },
    { rawLabel:'Liga de fútbol', normalizedCategory:'other_sports', amountNative:1.039320, disclosureLevel:'detailed' },
    { rawLabel:'Patín', normalizedCategory:'other_sports', amountNative:0.710011, disclosureLevel:'detailed' },
    { rawLabel:'Gimnasia Deportiva', normalizedCategory:'other_sports', amountNative:0.688741, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol femenino (Departamento Deportes)', normalizedCategory:'womens_football', amountNative:0.184004, disclosureLevel:'detailed' },
    { rawLabel:'Taekwondo', normalizedCategory:'other_sports', amountNative:0.161673, disclosureLevel:'detailed' },
    { rawLabel:'Acondicionamiento Físico', normalizedCategory:'other_sports', amountNative:0.076092, disclosureLevel:'detailed' },
    { rawLabel:'Ajedrez', normalizedCategory:'other_sports', amountNative:0.051627, disclosureLevel:'detailed' },
    { rawLabel:'Arancel Enseñanza (Instituto CAB)', normalizedCategory:'education', amountNative:28.049127, disclosureLevel:'detailed' },
    { rawLabel:'Televisaciones', normalizedCategory:'broadcasting', amountNative:164.620005, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Varios', normalizedCategory:'other_income', amountNative:187.351483, disclosureLevel:'detailed' },
  ],
};

const banfieldArExpenseLinesByYear = {
  2020: [
    { rawLabel:'Concentraciones, Entrenamientos y Alquileres', normalizedCategory:'wages_squad', amountNative:-4.305518, disclosureLevel:'detailed' },
    { rawLabel:'Dpto. Médico, Estudios, Medicamentos y Accesorios (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-6.326139, disclosureLevel:'detailed' },
    { rawLabel:'Indumentaria y Elementos Deportivos (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-0.382300, disclosureLevel:'detailed' },
    { rawLabel:'Primas Anuales', normalizedCategory:'wages_squad', amountNative:-93.350381, disclosureLevel:'detailed' },
    { rawLabel:'Proveduría', normalizedCategory:'wages_squad', amountNative:-5.080915, disclosureLevel:'detailed' },
    { rawLabel:'Seguro y Viáticos Jugadores', normalizedCategory:'wages_squad', amountNative:-0.689111, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-51.461734, disclosureLevel:'detailed' },
    { rawLabel:'Traslados Partidos y Pretemporadas', normalizedCategory:'wages_squad', amountNative:-2.388711, disclosureLevel:'detailed' },
    { rawLabel:'Costo y Custodia Espectáculo', normalizedCategory:'match_organisation_expense', amountNative:-25.804760, disclosureLevel:'detailed' },
    { rawLabel:'Prop. Mant. Administración y Gastos Generales (Fútbol Profesional)', normalizedCategory:'admin_general_expense', amountNative:-15.137768, disclosureLevel:'detailed' },
    { rawLabel:'Sector Fútbol Amateur (formación de jugadores, capitalizado — Nota 4)', normalizedCategory:'youth_other_sports_expense', amountNative:-120.335465,
      disclosureLevel:'detailed', items:[
        ['Alquileres, Alojamientos y Seguros', -2.096880],
        ['Comidas y Cocina Pensionados Dormys', -7.033706],
        ['Convenio Liga', -2.007872],
        ['Dpto. Médico, Estudios, Medicamentos y Accesorios', -12.802727],
        ['Indumentaria y Elementos Deportivos', -0.062964],
        ['Inscripción Contratos', -0.102328],
        ['Mantenimiento, Administración y Reformas', -46.084856],
        ['Partidos Divisiones Inferiores', -0.574850],
        ['Salarios, Honorarios, Innovación y Tecnología', -47.373758],
        ['Traslados y Viáticos Jugadores', -2.195524],
      ] },
    { rawLabel:'Apropiación de Costos Fútbol Amateur (reversión por capitalización, Nota 4)', normalizedCategory:'youth_other_sports_expense', amountNative:120.335465, disclosureLevel:'detailed' },
    { rawLabel:'Sector Estadio (mantenimiento, servicios y personal)', normalizedCategory:'match_organisation_expense', amountNative:-20.695883,
      disclosureLevel:'detailed', items:[
        ['Gtos. Generales, Mantenimiento y Reparaciones', -9.187674],
        ['Servicios (Teléfono, Agua, Gas, Electricidad)', -2.536533],
        ['Sueldos y Cargas Sociales', -8.971676],
      ] },
    { rawLabel:'Sector Administración Sede Social', normalizedCategory:'admin_general_expense', amountNative:-36.532339,
      disclosureLevel:'detailed', items:[
        ['Gastos e Intereses Bancarios', -0.978272],
        ['Gastos Generales', -0.522663],
        ['Honorarios', -0.142397],
        ['Mantenimiento y Reparaciones', -0.347012],
        ['Remuneraciones y Cargas Sociales', -33.433677],
        ['Servicios (Teléfono, Agua, Gas, Electricidad)', -1.108318],
      ] },
    { rawLabel:'Sector Predio', normalizedCategory:'youth_other_sports_expense', amountNative:-69.869857,
      disclosureLevel:'detailed', items:[
        ['Gastos Generales y Administración', -12.554649],
        ['Proyecto formación de Jugadores Extranjeros', -6.364600],
        ['Remuneraciones y Cargas Sociales', -43.892420],
        ['Reparaciones y Mantenimiento', -3.286247],
        ['Servicios (Electricidad, Teléfono, Agua, Gas)', -3.771941],
      ] },
    { rawLabel:'Escuela de Fútbol (Departamento Deportes, gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-4.509135, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol femenino (Departamento Deportes, gasto)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.035389, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Departamento Deportes (Hockey, Futsal, Voley, Tenis, Handball, Liga de fútbol, Patín, Gimnasia, Taekwondo, Acond. Físico, Ajedrez, Colonia, gastos generales)', normalizedCategory:'youth_other_sports_expense', amountNative:-28.006832,
      disclosureLevel:'detailed', items:[
        ['Acondicionamiento físico', -0.120816],
        ['Ajedrez', -0.266613],
        ['Colonia Vacaciones', -0.474394],
        ['Futsal', -2.119345],
        ['Gastos Departamento de Deportes', -2.630266],
        ['Gimnasia Deportiva', -1.499304],
        ['Handball', -1.521199],
        ['Hockey', -7.874299],
        ['Liga de fútbol', -2.222729],
        ['Patín', -1.967646],
        ['Pileta Natación', -1.562513],
        ['Taekwondo', -0.474432],
        ['Tenis', -2.656003],
        ['Voley', -2.617273],
      ] },
    { rawLabel:'Instituto CAB (Gastos Varios + Remuneraciones y Cargas Sociales)', normalizedCategory:'education_expense', amountNative:-39.533546,
      disclosureLevel:'detailed', items:[
        ['Gastos Varios', -4.571453],
        ['Remuneraciones y Cargas Sociales', -34.962093],
      ] },
    { rawLabel:'Depreciaciones (Gastos Generales)', normalizedCategory:'depreciation', amountNative:-113.965732, disclosureLevel:'detailed' },
    { rawLabel:'Objetivos (premios por objetivos deportivos, Gastos Generales)', normalizedCategory:'wages_squad', amountNative:-25.469312, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Gastos Generales (Abonos/Mantenimiento, Honorarios, Insumos, Juicios, Socios/Comunicación)', normalizedCategory:'admin_general_expense', amountNative:-100.937948,
      disclosureLevel:'detailed', items:[
        ['Abonos, Mantenimiento y Otros gastos', -12.383574],
        ['Honorarios', -6.720166],
        ['Insumos Generales', -0.715780],
        ['Juicios', -73.552708],
        ['Socios, Comunicación y otros', -7.565721],
      ] },
  ],
};

const banfieldArFiscalYearMeta = {
  2020: {
    currency:'ARS', fxRef:'ARS@2020-06-30', fxSource:'market_close',
    sourceId:'banfield-ar-memoria-y-balance-2019-2020',
    reportType:'official_balance_sheet', gestionId:'barbuto',
    netInterest:19.862470, profitOnPlayerSales:0, assetSales:0, tax:0,
    grossDebt:246.057622, cash:8.578020,
    officialTotalRevenue:705.794415, officialTotalExpenses:645.483308, officialPAT:80.173576,
  },
};

const banfieldArPresupuestoOverlayByYear = {};
const banfieldArPresupuestoSupuestosByYear = {};
const banfieldArPresupuestoFinancieroByYear = {};
const banfieldArPresupuestoInversionesByYear = {};
const banfieldArPasesData = [];
const banfieldArResultadosData = {};
const banfieldArTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['banfield-ar'] = {
  revenueLinesByYear: banfieldArRevenueLinesByYear, expenseLinesByYear: banfieldArExpenseLinesByYear,
  fiscalYearMeta: banfieldArFiscalYearMeta, pasesData: banfieldArPasesData,
  resultadosData: banfieldArResultadosData, titulosData: banfieldArTitulosData,
  presupuestoOverlayByYear: banfieldArPresupuestoOverlayByYear,
  presupuestoSupuestosByYear: banfieldArPresupuestoSupuestosByYear,
  presupuestoFinancieroByYear: banfieldArPresupuestoFinancieroByYear,
  presupuestoInversionesByYear: banfieldArPresupuestoInversionesByYear,
};

Object.assign(sources, {
  'banfield-ar-memoria-y-balance-2019-2020': {
    id:'banfield-ar-memoria-y-balance-2019-2020', clubId:'banfield-ar',
    title:'Memoria y Balance General, 116° Ejercicio Económico (1°/7/2019 al 30/6/2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (58 páginas, texto nativo, sin OCR), informe del auditor (Juan Pablo Régoli, C.P.C.E.P.B.A.) del 30/9/2020, sin salvedades. URL oficial del club (clubabanfield.org/inicio/balance/CAB-MemoriaBalance2020.pdf) da 404 hoy — recuperado del snapshot de Wayback Machine de esa misma URL (ver fuentes/Argentina/Banfield.md). RESULTADO FINAL real: $80.173.576,08 ARS (superávit). Total del Activo al cierre: $1.253.147.745,78. Reporta por SECTOR/DEPARTAMENTO (Fútbol Profesional, Fútbol Amateur, Estadio, Administración Sede Social, Predio, Departamento Deportes, Instituto CAB) más 2 Anexos transversales (Impositivos y Financieros, Generales), a diferencia del desglose por naturaleza de gasto de otros clubes. No declara tipo de cambio de cierre propio (sin Anexo de moneda extranjera) — convertido con cotización de mercado (ARS@2020-06-30, FX_CLOSE). Ver data/banfield-ar-data.js para el detalle completo de categorización.',
  },
});

gestionesByClub['banfield-ar'] = {
  barbuto: { nombre:'Barbuto (2018-2021)', firstYear:2020, lastYear:2020 },
};

memberCountByClub['banfield-ar'] = null;
