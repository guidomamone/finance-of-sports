// ============================================================================
// data/boca-data.js — datos financieros y deportivos de Boca: bocaRevenueLinesByYear/
// bocaExpenseLinesByYear/bocaFiscalYearMeta (motor genérico, mismo shape que
// data/river-data.js), gestionesByClub/sources/memberCountByClub (en data/clubs.js,
// Boca sigue eager-loaded ahí), bocaPasesData, bocaResultadosData, bocaTitulosData.
//
// MIGRACIÓN (a pedido explícito de Guido, "poné a Boca en el mismo motor que el resto"):
// hasta acá Boca vivía en yearsRaw{} (9 campos fijos) + computeYear() propio, con una
// SEGUNDA estructura paralela (nativeFinancialsBoca) para la tabla nativa del Ejercicio
// 2025, que reconciliaba a un total distinto ("Revenue" excluía transferencias de
// jugadores) del que usaban KPIs/verifyTieOuts. Esto se resolvió así:
//
// 1) "Revenue" de Boca ahora SÍ incluye ingresos por transferencias/rescisión de pases,
//    igual que hace el balance en su propia pág. 76 (Total de Recursos) y que ya hacían
//    8 clubes migrados antes (Estudiantes, Argentinos, Instituto, Rosario Central, Unión,
//    Independiente, Vélez, San Lorenzo: todos suman su propia línea de venta de jugadores
//    directo a Revenue, normalizedCategory 'player_sales'). El comentario viejo que decía
//    "misma convención que usa el resto del sitio" para EXCLUIR transferencias era
//    incorrecto: el resto del sitio no hace eso. Revenue 2025 pasó de $152.899,938548 M
//    (excluyendo transferencias) a $237.614,566642 M (Total de Recursos real, pág. 76).
//
// 2) El Ejercicio 2025 (balance auditado) desglosaba Gastos por DEPARTAMENTO (Fútbol
//    profesional, Estadio, Educación física, etc.), mezclando sueldos + amortización +
//    gastos operativos en una sola línea por departamento — no alcanzaba para separar
//    wages_squad/player_amortisation/depreciation (categorías que el motor genérico
//    necesita para nonCash/PAT). Se volvió a los anexos originales del balance
//    (Clubes/Argentina/Boca/memoria-y-balance-2024-25.md, Anexos IX y XI-XVII) y se
//    verificó que CADA departamento reporta su propia línea "Remuneraciones y cargas
//    sociales" (o equivalente) por separado — sumando esas 9 líneas da EXACTO
//    $67.869,732365 M, el mismo total de sueldos que ya usaba el sitio. Cada departamento
//    ahora son 2 líneas (Remuneraciones / Otros gastos operativos) en vez de 1, con el
//    mismo nombre de departamento, para no perder ni un peso ni el desglose por área.
//    Verificado: revenue+expenses+nonCash reconcilian EXACTO contra "Resultado antes del
//    efecto financiero" ($34.869,724928 M) y PAT contra "Superávit del ejercicio"
//    ($35.581,462204 M), impresos en la pág. 76.
//
// Quién lo usa: js/finanzas-calc.js (computeYearGeneric, nativeReportFor,
// simplifiedReportForGeneric) y js/finanzas-render.js leen estas constantes vía
// window.CLUB_GENERIC_DATA.boca, igual que cualquier otro club.
// ============================================================================


// ---------- INGRESOS ----------
// Placeholder (2018/2019/2021/2022/2023): mismos 9 campos inventados de siempre (ver
// Versión 81 del historial, "quita los años placeholder de Finanzas" — por eso
// `finanzasYears` más abajo los excluye del <select> de Finanzas, pero se dejan acá para
// no romper Mercado de Pases/Resultados/Comparar Gestiones, que sí siguen usando estos 5
// años vía gestionesByClub.boca en data/clubs.js). 2024/2026: en cero a propósito
// (ejercicios reales que Boca todavía no publicó, ver bocaFiscalYearMeta más abajo).
const bocaRevenueLinesByYear = {
  2018: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:9, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:16, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  2019: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:10, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:18, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  2021: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:17, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:23, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  2022: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:18, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:27, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  2023: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:18, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:29, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0.2, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  2024: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  // Ejercicio 2025 = Memoria y Balance oficial auditado al 30/06/2025 (sources['boca-balance-2024-25']
  // en data/clubs.js). Las 11 categorías tal cual la pág. 76 del balance (mismo orden y mismos montos
  // que antes vivían en nativeFinancialsBoca[2025].ingresos): la suma da EXACTO el Total de Recursos
  // ($237.614,566642 M) impreso en esa página. Guardado en ARS MILLONES EXACTOS ("moneda homogénea",
  // Nota 2.2 del balance, reexpresado a poder adquisitivo del 30/06/2025 según RT 6/17).
  2025: [
    { rawLabel:'Ingresos por transferencias de jugadores', normalizedCategory:'player_sales', amountNative:36487.756293, disclosureLevel:'detailed', items:[
      ['Anselmino, Aaron (100%)', 26764.724260], ['Langoni, Luca (100%)', 8625.663125], ['Retegui, Mateo', 702.928645],
      ['Varela, Alan', 188.673286], ['Valdez, Bruno (10%)', 153.190546], ['Bentancour, Rodrigo', 52.576430],
    ]},
    { rawLabel:'Exhibiciones y espectáculos de fútbol', normalizedCategory:'matchday_competition', amountNative:56414.093318, disclosureLevel:'detailed', items:[
      ['Mundial de Clubes', 20133.562819], ['Abonos a palcos, plateas y cocheras', 21072.986797], ['Televisación de partidos', 6891.367698],
      ['Campeonato Liga Profesional de Fútbol', 2621.877067], ['Copa Sudamericana', 2904.994695], ['Copa Libertadores', 1935.793380],
      ['Selección Nacional', 345.060888], ['Giras y amistosos', 271.440828], ['Copa Argentina', 237.009146],
    ]},
    { rawLabel:'Publicidad, concesiones y licencias', normalizedCategory:'sponsorship_commercial', amountNative:33217.710535, disclosureLevel:'detailed', items:[
      ['Adidas', 15452.450956], ['Betsson', 5204.370168], ['DirectTV', 2789.935205], ['Publicidad Estática', 1762.106530],
      ['Museos de Primera', 1221.015858], ['Avalian Cobertura Médica', 1159.364117], ['Ingresos por Licencias', 1109.075476],
      ['BBVA', 841.088331], ['Cetrogar', 761.768724], ['Pax Assistance', 698.573259], ['Regalías Productos Boca', 397.078008],
      ['Cabify', 348.904374], ['Electronic Arts Sponsors', 235.043431], ['Pepsi', 231.332757], ['Fag Sistems (Kanji)', 164.622192],
      ['Quilmes', 153.428820], ['Tropical Arg. SRL', 149.191124], ['Ingresos por Concesiones', 102.163232],
      ['Ingresos varios (comerciales)', 94.849538], ['Programa Goles Xeneize', 94.671205], ['Boca Shop', 75.439144],
      ['Tarjeta Xeneiza BBVA', 74.613604], ['Leiva Joyas', 70.360968], ['Algabo', 15.570026], ['FanXP Publicidad en pantallas', 10.693488],
    ]},
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:57536.093713, disclosureLevel:'detailed', items:[
      ['Socios Activos', 23823.191813], ['Socios Adherentes', 15956.919899], ['Socios Interior/Exterior', 6771.857667],
      ['Socios Adherentes Interior', 6750.756240], ['Socios Menores', 3284.342620], ['Socios Cadetes', 949.025474],
    ]},
    { rawLabel:'Ingresos por rescisión onerosa de contrato', normalizedCategory:'player_sales', amountNative:48226.871801, disclosureLevel:'detailed', items:[
      ['Fernandez Carballo, Ezequiel (100%)', 27722.982880], ['Medina, Cristian (100%)', 20503.888921],
    ]},
    { rawLabel:'Otras contribuciones de asociados', normalizedCategory:'other_income', amountNative:853.226812, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidaridad', normalizedCategory:'player_sales', amountNative:512.679940, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de básquet', normalizedCategory:'other_sports', amountNative:157.094476, disclosureLevel:'detailed' },
    { rawLabel:'Cesión de jugadores a préstamo', normalizedCategory:'player_sales', amountNative:375.211221, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de educación física', normalizedCategory:'other_sports', amountNative:796.665345, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:3037.163188, disclosureLevel:'detailed' },
  ],
  2026: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  // Ejercicio 2027 = Presupuesto oficial 2026/27. Las mismas 9 categorías y montos que antes vivían en
  // yearsRaw[2027]+revenueBreakdown[2027]. Suma exacta a $239.392,104 M, el total oficial del presupuesto.
  2027: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:84600.271, disclosureLevel:'detailed', items:[
      ['Socios Activos', 32387.986], ['Adherente AMBA', 17308.922], ['Socios Interior', 11537.424], ['Adherente Interior', 7869.528],
      ['Socias Activas', 6368.302], ['Socios Menores', 5579.328], ['Socios Cadetes', 1474.486], ['Carnet Socios', 837.700],
      ['Seguro de Vida', 792.438], ['Socio Internacional', 365.029], ['Socios Exterior', 79.128],
    ]},
    { rawLabel:'Comerciales', normalizedCategory:'sponsorship_commercial', amountNative:53477.864, disclosureLevel:'detailed', items:[
      ['Sponsor Indumentaria', 18004.358], ['Sponsor Pecho Fútbol Masculino', 7772.255], ['Espalda Fútbol Masculino', 4212.604],
      ['Bocashop', 2865.507], ['Museo', 2453.545], ['Publicidad Estática Estadio', 2336.400], ['Manga Fútbol Masculino', 2123.153],
      ['Mastercard', 1685.042], ['BBVA - Branding', 1444.315], ['Licencias', 1356.072], ['Pantalón Fútbol Masculino', 1179.529],
      ['Sponsor Digital', 675.000], ['Otros', 2062.613], ['Canje Indumentaria', 2886.784], ['Canje Prepaga', 1714.414],
      ['Canje Baños Químicos/Módulos', 456.956], ['Canje Otros', 249.317],
    ]},
    { rawLabel:'Exhibición de Espectáculos Deportivos', normalizedCategory:'matchday_competition', amountNative:43085.830, disclosureLevel:'detailed', items:[
      ['Torneo Oficial', 16807.870, [
        ['Derechos de Televisión', 9174.920], ['Recaudaciones', 5847.950], ['Premio por Campeonato', 1785.000],
      ]],
      ['Copa Argentina', 340.417, [
        ['Premio Por Avanzar de Ronda / Aceledador', 340.417],
      ]],
      ['Giras y Amistosos', 1575.064, [
        ['Amistosos', 1575.064],
      ]],
      ['Copa Libertadores', 24362.479, [
        ['Recaudaciones', 12260.266], ['Derechos de Televisión', 10062.951], ['Bonos', 2039.262],
      ]],
    ]},
    { rawLabel:'Abonos', normalizedCategory:'season_tickets', amountNative:40639.558, disclosureLevel:'detailed', items:[
      ['Plateas', 30570.629], ['Palcos VIP y corporativos', 8927.048], ['Cocheras', 1141.881],
    ]},
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:12178.898, disclosureLevel:'detailed', items:[
      ['Decreto 510/23', 11855.973], ['Intereses Ganados', 233.176], ['Departamento Médico', 89.749],
    ]},
    { rawLabel:'Otros deportes', normalizedCategory:'other_sports', amountNative:2118.967, disclosureLevel:'detailed', items:[
      ['Deportes Amateurs', 998.748], ['Futsal', 644.019], ['Hockey', 476.200],
    ]},
    { rawLabel:'Basket Profesional', normalizedCategory:'other_sports', amountNative:1656.377, disclosureLevel:'detailed', items:[
      ['Sponsors', 1385.307], ['Recaudaciones', 92.305], ['Champions League', 85.000], ['Televisión', 62.135], ['Aranceles', 31.630],
    ]},
    { rawLabel:'Futbol Juvenil', normalizedCategory:'youth_football', amountNative:1489.046, disclosureLevel:'detailed', items:[
      ['Derechos de Solidaridad', 1489.046],
    ]},
    { rawLabel:'Futbol Femenino', normalizedCategory:'womens_football', amountNative:145.293, disclosureLevel:'detailed', items:[
      ['Participación Libertadores', 82.000], ['Derechos TV', 63.293],
    ]},
  ],
};


// ---------- GASTOS ----------
const bocaExpenseLinesByYear = {
  2018: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:-14, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-8, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ítems excepcionales', normalizedCategory:'exceptional_items', amountNative:-0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2.5, disclosureLevel:'not_disclosed' },
    { rawLabel:'Deterioro de pases', normalizedCategory:'player_impairment', amountNative:-0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-0.5, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.1, disclosureLevel:'not_disclosed' },
  ],
  2019: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:-15, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-9, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ítems excepcionales', normalizedCategory:'exceptional_items', amountNative:-0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-3.0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Deterioro de pases', normalizedCategory:'player_impairment', amountNative:-0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-0.6, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.1, disclosureLevel:'not_disclosed' },
  ],
  2021: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:-22, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-13, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ítems excepcionales', normalizedCategory:'exceptional_items', amountNative:-0.1, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-4.5, disclosureLevel:'not_disclosed' },
    { rawLabel:'Deterioro de pases', normalizedCategory:'player_impairment', amountNative:-0.2, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-0.8, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.2, disclosureLevel:'not_disclosed' },
  ],
  2022: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:-24, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-13, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ítems excepcionales', normalizedCategory:'exceptional_items', amountNative:-0.2, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-4.8, disclosureLevel:'not_disclosed' },
    { rawLabel:'Deterioro de pases', normalizedCategory:'player_impairment', amountNative:-0.3, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-0.9, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.2, disclosureLevel:'not_disclosed' },
  ],
  2023: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:-25, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-13, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ítems excepcionales', normalizedCategory:'exceptional_items', amountNative:-0.3, disclosureLevel:'not_disclosed' },
    { rawLabel:'Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-5.0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Deterioro de pases', normalizedCategory:'player_impairment', amountNative:-0.4, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-1.0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.2, disclosureLevel:'not_disclosed' },
  ],
  2024: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  // Ejercicio 2025: reconstruido departamento por departamento a partir de Clubes/Argentina/Boca/
  // memoria-y-balance-2024-25.md (Anexos IX, X, XI-XVIII), separando en cada departamento su propia
  // línea "Remuneraciones y cargas sociales" (wages_squad) del resto de sus gastos operativos —
  // verificado que las 9 líneas de sueldo suman EXACTO $67.869,732365 M (el total de sueldos que ya
  // usaba el sitio antes de esta migración). "Amortización jugadores profesionales" (Anexo IX) es la
  // única línea de amortización real, $36.573,123213 M exacto. Las líneas SIN desglose de sueldo
  // propio (Organización de espectáculos, Fútbol femenino, Departamento de cultura, Impuestos y
  // tasas, Gastos generales, Depreciaciones) no tienen un item de "Remuneraciones" identificable en
  // la fuente, se dejan como una sola línea, igual que antes. La suma total (con las líneas de
  // transferencias de pases de abajo) da EXACTO $202.744,841714 M, el Total de Gastos impreso.
  2025: [
    { rawLabel:'Fútbol profesional — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-46452.232219, disclosureLevel:'detailed', items:[
      ['Remuneraciones plantel profesional, primas', -44390.524043], ['Remuneraciones personal administrativo', -2061.708176],
    ]},
    { rawLabel:'Fútbol profesional — Amortización de jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-36573.123213, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol profesional — Otros gastos operativos', normalizedCategory:'other_expenses', amountNative:-5802.025598, disclosureLevel:'detailed', items:[
      ['Comisiones', -1320.144785], ['Gastos de viajes y hospedajes', -1274.065256], ['Artículos de deporte e indumentaria', -830.144990],
      ['Farmacia y asistencia médica', -809.448017], ['Gastos diversos', -582.250067], ['Gastos pretemporada', -334.357845],
      ['Vigilancia', -297.692805], ['Gastos Área internacional', -176.730477], ['Mantenimiento de campo de juego', -131.723707],
      ['Agasajos y comidas', -45.467649],
    ]},
    { rawLabel:'Gastos por transferencia de jugadores', normalizedCategory:'other_expenses', amountNative:-19266.303700, disclosureLevel:'detailed' },
    { rawLabel:'Incorporación de jugadores a préstamo', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de tanteo', normalizedCategory:'other_expenses', amountNative:-29.031191, disclosureLevel:'detailed' },
    { rawLabel:'Organización de espectáculos', normalizedCategory:'match_organisation_expense', amountNative:-22838.693201, disclosureLevel:'detailed', items:[
      ['Campeonato Oficial', -12625.224419], ['Mundial de Clubes', -6355.467331], ['Copa Sudamericana', -1864.921002],
      ['Copa Libertadores', -1489.465135], ['Festejo día del hincha', -241.727871], ['Selección Nacional', -184.421360],
      ['Copa Argentina', -77.466083],
    ]},
    { rawLabel:'Estadio — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-5543.366571, disclosureLevel:'detailed' },
    { rawLabel:'Estadio — Otros gastos operativos', normalizedCategory:'admin_general_expense', amountNative:-2584.319372, disclosureLevel:'detailed', items:[
      ['Servicios públicos', -623.866711], ['Conservación de muebles e inmuebles', -498.969090], ['Alquileres/ABL/impuestos municipales', -424.718410],
      ['Honorarios', -289.376079], ['Materiales y elementos de limpieza', -293.446972], ['Agasajos, buffet y refrigerios', -188.842220],
      ['Gastos diversos', -164.938647], ['Convenios de Canje', -100.161244],
    ]},
    { rawLabel:'Departamento de educación física — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-2709.550553, disclosureLevel:'detailed', items:[
      ['Gastos administrativos: Remuneraciones y cargas sociales', -93.203254], ['Vóley femenino y masculino: Remuneraciones y cargas sociales', -649.331990],
      ['Deportes varios: Remuneraciones y cargas sociales', -832.481489], ['Fútbol 5: Remuneraciones y cargas sociales', -725.426959],
      ['Básquet amateur: Remuneraciones y cargas sociales', -409.106861],
    ]},
    { rawLabel:'Departamento de educación física — Otros gastos operativos', normalizedCategory:'youth_other_sports_expense', amountNative:-1746.359462, disclosureLevel:'detailed', items:[
      ['Gastos administrativos: Becas + gastos diversos', -294.758732, [['Becas', -228.691931], ['Gastos diversos', -66.066801]]],
      ['Vóley femenino y masculino: otros gastos', -367.736189, [['Afiliación e inscripciones', -27.180638], ['Indumentaria deportiva', -73.417220], ['Gastos de concentración y viajes', -159.772605], ['Gastos diversos', -107.365726]]],
      ['Deportes varios: otros gastos', -485.435648, [['Gastos temporada pileta', -181.852477], ['Gastos colonia', -54.666892], ['Afiliación e inscripciones', -30.424260], ['Indumentaria deportiva', -79.541450], ['Viajes', -28.869587], ['Gastos diversos', -110.080982]]],
      ['Fútbol 5: otros gastos', -197.819954, [['Artículos de deporte', -13.822192], ['Viajes', -35.934698], ['Gastos diversos', -148.063064]]],
      ['Básquet amateur: otros gastos', -400.608939, [['Viáticos jugadores', -50.369882], ['Indumentaria deportiva', -146.455433], ['Organización de eventos y espectáculos', -171.502638], ['Gastos diversos', -32.280986]]],
    ]},
    { rawLabel:'Fútbol juvenil — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-3358.856303, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol juvenil — Otros gastos operativos', normalizedCategory:'youth_other_sports_expense', amountNative:-2043.925922, disclosureLevel:'detailed', items:[
      ['Agasajos, buffet y refrigerios', -877.944935], ['Mantenimiento de campo de juego', -95.068751], ['Vigilancia', -397.034004],
      ['Gastos diversos', -186.754866], ['Viajes', -487.123366],
    ]},
    { rawLabel:'Departamento de básquet — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-550.578435, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de básquet — Otros gastos operativos', normalizedCategory:'youth_other_sports_expense', amountNative:-3044.638821, disclosureLevel:'detailed', items:[
      ['Locación de servicios plantel', -1581.323934], ['Gastos de concentración y viajes', -623.998792], ['Gastos de alquiler de equipos', -277.743279],
      ['Gastos diversos', -184.763446], ['Gastos de vivienda', -166.888913], ['Gastos de organización de espectáculos', -134.711447],
      ['Artículos de deporte', -58.872060], ['Afiliación e inscripciones', -16.336950],
    ]},
    { rawLabel:'Casa Amarilla — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-1723.314898, disclosureLevel:'detailed' },
    { rawLabel:'Casa Amarilla — Otros gastos operativos', normalizedCategory:'admin_general_expense', amountNative:-775.588156, disclosureLevel:'detailed', items:[
      ['Servicios públicos', -313.395811], ['Agasajos, buffet y refrigerios', -124.964843], ['Conservación muebles e inmuebles', -119.172247],
      ['Servicios de vigilancia y limpieza', -122.082198], ['Parque Social y Deportivo Casa Amarilla', -61.945654],
      ['Gastos diversos', -29.140162], ['Honorarios', -4.887241],
    ]},
    { rawLabel:'Departamento médico — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-1249.597409, disclosureLevel:'detailed' },
    { rawLabel:'Departamento médico — Otros gastos operativos', normalizedCategory:'admin_general_expense', amountNative:-933.257882, disclosureLevel:'detailed', items:[
      ['Honorarios', -754.340520], ['Mantenimiento y soporte', -58.886208], ['Gastos diversos', -120.031154],
    ]},
    { rawLabel:'Departamento de cultura', normalizedCategory:'admin_general_expense', amountNative:-354.949396, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol femenino', normalizedCategory:'youth_other_sports_expense', amountNative:-1988.118211, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-7080.513561, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de estructura operativa — Remuneraciones y cargas sociales', normalizedCategory:'wages_squad', amountNative:-6282.235977, disclosureLevel:'detailed', items:[
      ['Gastos Comisión Directiva', -436.234604], ['Gastos Gerencia General', -519.311449], ['Gastos Gerencia de Prensa', -217.827635],
      ['Gastos Gerencia de Recursos Humanos', -606.211507], ['Gastos Gerencia de Seguridad', -359.089350],
      ['Gastos Gerencia de Abastecimiento y Operaciones', -495.503091], ['Gastos Gerencia de Administración y Finanzas', -1090.144115],
      ['Gastos Gerencia de Sistemas', -1152.043099], ['Gastos Gerencia de Legales', -412.539878], ['Gastos Gerencia de Marketing', -277.625088],
      ['Gastos Centro de Atención al Socio', -715.706161],
    ]},
    { rawLabel:'Gastos de estructura operativa — Otros gastos', normalizedCategory:'admin_general_expense', amountNative:-10386.355825, disclosureLevel:'detailed', items:[
      ['Gastos Comisión Directiva', -625.889557, [['Honorarios', -148.133835], ['Agasajos, buffet y refrigerios', -58.074365], ['Servicios', -12.054217], ['Departamento de relaciones públicas', -46.339855], ['Movilidad y viáticos', -212.196140], ['Obsequios', -61.105827], ['Publicidad', -21.081079], ['Gastos diversos', -66.904239]]],
      ['Gastos Gerencia General', -58.168086, [['Auditoría interna', -52.440635], ['Viajes, movilidad y viáticos', 0], ['Gastos diversos', -5.727451]]],
      ['Gastos Gerencia de Prensa', -324.890095, [['Honorarios', -278.645891], ['Servicios', -40.587433], ['Gastos diversos', -5.656771]]],
      ['Gastos Gerencia de Recursos Humanos', -640.027145, [['Servicios', -29.426424], ['Beneficios al personal', -545.820501], ['Movilidad y viáticos', -6.375367], ['Mantenimiento y soporte', -58.404853]]],
      ['Gastos Gerencia de Seguridad', -3623.207138, [['Servicios de vigilancia', -3542.449469], ['Mantenimiento y soporte', -59.457644], ['Gastos diversos', -21.300025]]],
      ['Gastos Gerencia de Abastecimiento y Operaciones', -336.024557, [['Gastos departamento de indumentaria', -311.093831], ['Impresos, papelería y útiles de escritorio', -1.908913], ['Gastos diversos', -23.021813]]],
      ['Gastos Gerencia de Administración y Finanzas', -117.992034, [['Honorarios', -111.355431], ['Impresos, papelería y útiles de escritorio', -4.571956], ['Gastos diversos', -2.064647]]],
      ['Gastos Gerencia de Sistemas', -1462.051187, [['Mantenimiento y soporte', -1462.051187]]],
      ['Gastos Gerencia de Legales', -138.794465, [['Honorarios', -131.264282], ['Franqueos y telegramas', -5.914738], ['Impresos, papelería y útiles de escritorio', -0.751648], ['Gastos diversos', -0.863797]]],
      ['Gastos Gerencia de Marketing', -405.627507, [['Honorarios', -334.765330], ['Gastos diversos', -70.862177]]],
      ['Gastos Centro de Atención al Socio', -2653.684054, [['Comisión por cobranzas', -1812.442363], ['Impresos, papelería y útiles de escritorio', -18.740567], ['Gastos oficina interior/exterior', -238.513879], ['Honorarios', -151.335953], ['Gastos diversos', -42.846386], ['Mantenimiento y soporte', -389.804906]]],
    ]},
    { rawLabel:'Gastos generales', normalizedCategory:'admin_general_expense', amountNative:-11975.100051, disclosureLevel:'detailed', items:[
      ['Indemnizaciones, juicios y contingencias', -4938.388945], ['Cargo por créditos irrecuperables', -4614.875990], ['Donaciones', -846.065631],
      ['Comisiones y gastos bancarios', -811.583347], ['Seguros', -615.119216], ['Gratificaciones', -109.316586], ['Gastos diversos', -39.750336],
    ]},
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-7452.805787, disclosureLevel:'detailed' },
  ],
  2026: [
    { rawLabel:'Salarios', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'not_disclosed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'not_disclosed' },
  ],
  // Ejercicio 2027 = Presupuesto oficial 2026/27, misma fuente que antes (expenseBreakdown[2027]/
  // expenseSubBreakdown[2027]). "Fútbol Profesional" (-120.358,357 M en el resumen del presupuesto) se
  // separa acá en sus 2 componentes reales, ya desglosados en el propio presupuesto (pág. 15):
  // Remuneraciones ($72.632,108 M = Gerencia de Fútbol Profesional + Futbol Femenino) y Amortización
  // de plantel ($47.726,249 M), para que el motor genérico calcule nonCash/wages igual que para
  // cualquier otro club. El resto de las categorías no cambia de valor, solo de etiqueta (mismo
  // agrupamiento que ya usaba "Formato simplificado" para este ejercicio).
  2027: [
    { rawLabel:'Fútbol Profesional — Remuneraciones y primas', normalizedCategory:'wages_squad', amountNative:-72632.108, disclosureLevel:'detailed', items:[
      ['Gerencia de Fútbol Profesional', -68458.578, [
        ['Remuneraciones S.A.C. y C.S.', -3539.035], ['Remuneraciones Plantel, S.A.C. y Cs. Sociales', -8819.925],
        ['Remuneraciones Cuerpo Técnico y Utileria S.A.C. y Cs. Sociales', -2970.34], ['Agasajos, Buffet y Refrigerios', -168.972],
        ['Alquiler Vivienda', -129.97], ['Artículos de Deporte', -5.926], ['Gastos Alojamiento', -410.296],
        ['Gastos Pretemporada', -659.769], ['Honorarios', -26.5], ['Mantenimiento Campo de Juego', -86.184],
        ['Mantenimiento Inmueble y Muebles', -9.896], ['Obsequios', -8.179], ['Prima cuerpo tecnico', -2698.975],
        ['Prima Jugadores', -45538.138], ['Seguros', -13.475], ['Servicios y Abonos Varios', -20.32],
        ['Tasas y Sellados', -3.461], ['Telefonía', -1.264], ['Viajes y Viaticos', -776.325], ['Vigilancia', -388.043],
        ['Varios', -11.463],
        ['Depto Medico', -381.06, [['Asistencia Médica, Exámenes Precompetitivos y Honorarios Médicos', -224.025], ['Farmacia y Articulos Ortopedicos', -157.035]]],
        ['Canjes', -1791.062, [['Indumentaria', -1444.687], ['Prepaga', -346.375]]],
      ]],
      ['Futbol Femenino', -4173.53, [
        ['Remuneraciones S.A.C. y C.S.', -2080.043], ['Agasajos, Buffet y Refrigerios', -50.853], ['Alquiler Vivienda', -23.983],
        ['Honorarios', -187.089], ['Mantenimiento campo de juego', -129.12], ['Organización eventos', -36.332],
        ['Premios Jugadoras y Cuerpo Técnico', -374.837], ['Servicios y Abonos Varios', -2.217], ['Viajes y Movilidad', -247.458],
        ['Viáticos Jugadores', -39.575], ['Varios', -7.608],
        ['Departamento médico', -200.98, [['Asistencia Médica, Exámenes Precompetitivos y Honorarios Médicos', -173.73], ['Farmacia y Articulos Ortopedicos', -27.25]]],
        ['Canjes', -793.435, [['Indumentaria', -535.135], ['Prepaga', -258.3]]],
      ]],
    ]},
    { rawLabel:'Fútbol Profesional — Amortización de plantel', normalizedCategory:'player_amortisation', amountNative:-47726.249, disclosureLevel:'detailed', items:[
      ['Amortizacion Plantel Futbol Profesional - Compras', -30565.146], ['Amortizacion Plantel Futbol Profesional - Inferiores', -17161.103],
    ]},
    { rawLabel:'Organización de Espectáculos', normalizedCategory:'match_organisation_expense', amountNative:-33730.855, disclosureLevel:'detailed', items:[
      ['Campeonato Liga Profesional', -18747.077, [
        ['Remuneraciones S.A.C. y C.S.', -332.038], ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -5981.378], ['Agasajos, Buffet y Refrigerios', -649.239],
        ['Alcanzabalones', -16.023], ['Alquiler de Equipos Varios', -585.152], ['Articulos de limpieza', -116.026], ['Enlace SIS y Mantenimiento', -84.651],
        ['Gastos AFA', -277.299], ['Gastos Concentración', -2123.633], ['Gastos Tickets', -33.971], ['Honorarios', -37.215], ['Mantenimiento', -394.782],
        ['Policía Adicional', -2668.276], ['Premios Grupales', -850.0], ['Sanción Disciplinaria', -165.217], ['Seguro espectador', -869.107],
        ['Servicios y Abonos Varios', -821.034], ['Viajes y Movilidad', -481.208], ['Vigilancia', -1942.734], ['Varios', -48.181],
        ['Canjes', -269.913, [['Ambulancia', -11.173], ['Baños Quimicos', -128.819], ['Cable', -110.5], ['Carro', -19.421]]],
      ]],
      ['Copa Argentina', -170.2, [
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -107.181], ['Alojamiento y Concentraciones', -44.015], ['Viajes y Movilidad', -15.462], ['Varios', -3.542],
      ]],
      ['Partidos Amistosos', -980.411, [
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -309.172], ['Organización de eventos', -624.645], ['Premios Grupales', -46.594],
      ]],
      ['Copa Libertadores', -13833.167, [
        ['Remuneraciones BICA, S.A.C. y Cs. Sociales', -1891.842], ['Agasajos, Buffet y Refrigerios', -147.665], ['Alcanzabalones', -3.421],
        ['Alquiler Equipos y otros', -148.33], ['Articulos de limpieza', -42.363], ['Enlace SIS y Mantenimiento', -19.253], ['Gastos AFA', -1101.321],
        ['Gastos Concentración', -526.296], ['Gastos Ticket', -34.144], ['Honorarios', -17.535], ['Mantenimiento', -68.79],
        ['Policía Adicional', -606.879], ['Premios Grupales', -6879.011], ['Sanción Disciplinaria', -254.403], ['Seguro Espectador', -309.65],
        ['Servicios y Abonos Varios', -232.485], ['Viajes y Movilidad', -1038.931], ['Vigilancia', -441.86], ['Varios', -37.957],
        ['Canjes', -31.031, [['Baños Quimicos', -31.031]]],
      ]],
    ]},
    { rawLabel:'Fútbol Juvenil', normalizedCategory:'youth_other_sports_expense', amountNative:-7918.490, disclosureLevel:'detailed', items:[
      ['Departamento de Futbol Juvenil', -22757.489, [
        ['Remuneraciones Cuerpo Técnico y Utileria S.A.C. y Cs. Sociales', -3500.422], ['Remuneraciones S.A.C. y C.S.', -8305.404],
        ['Agasajos, Buffet y Refrigerios', -3292.756], ['Alquiler de Equipos Varios', -238.641], ['Arbitros', -8.389],
        ['Artículos de Deporte', -25.507], ['Artículos de Librería', -2.499], ['Articulos de limpieza', -117.232], ['Combustibles', -59.274],
        ['Honorarios', -357.435], ['Impuestos y Servicios Publicos', -467.853], ['Inscripciones y Afiliaciones', -44.569],
        ['Mantenimiento Campo de Juego', -197.936], ['Mantenimiento Inmueble y Muebles', -562.779], ['Obsequios', -7.009],
        ['Policía Adicional', -31.514], ['Servicios y Abonos Varios', -290.644], ['Viajes y Movilidad', -1551.695],
        ['Viáticos', -19.972], ['Vigilancia', -1387.323], ['Varios', -39.417],
        ['Departamento médico', -690.3, [['Asistencia Médica, Exámenes Precompetitivos y Honorarios Médicos', -585.138], ['Farmacia y Articulos Ortopedicos', -105.162]]],
        ['Canjes', -1558.919, [['Modulos', -222.633], ['Carro', -38.842], ['Indumentaria', -500.305], ['Prepaga', -797.139]]],
      ]],
      ['Activación Futbol Juvenil', 14838.999],
    ]},
    { rawLabel:'Otros Deportes', normalizedCategory:'youth_other_sports_expense', amountNative:-6769.002, disclosureLevel:'detailed', items:[
      ['Vóley Masculino', -905.412, [
        ['Remuneraciones S.A.C y C.S.', -549.031], ['Afiliaciones e Inscripciones', -15.261], ['Alquiler instalaciones', -4.538], ['Alquiler Vivienda', -3.04],
        ['Artículos de Deporte', -5.736], ['Becas deportivas', -132.913], ['Comidas jugadores', -1.553], ['Honorarios profesionales', -18.375],
        ['Organización Eventos', -85.315], ['Servicios y Abonos varios', -1.048], ['Transferencias Jugadores', -4.246], ['Viajes y Movilidad', -79.194],
        ['Vigilancia', -3.92], ['Varios', -1.242],
      ]],
      ['Vóley Femenino', -1218.551, [
        ['Remuneraciones S.A.C y C.S.', -822.723], ['Afiliaciones e Inscripciones', -13.338], ['Alquiler Vivienda', -6.08], ['Artículos de Deporte', -4.702],
        ['Becas deportivas', -213.609], ['Comidas jugadores', -4.542], ['Honorarios profesionales', -13.475], ['Organización eventos', -41.492],
        ['Servicios y Abonos Varios', -2.29], ['Transferencias Jugadores', -4.246], ['Viajes y Movilidad', -89.33], ['Varios', -2.724],
      ]],
      ['Deportes Amateurs', -2458.931, [
        ['Remuneraciones S.A.C. y C.S.', -697.539], ['Remuneraciones Pileta', -380.28], ['Remuneraciones Colonia', -76.58],
        ['Remuneraciones S.A.C. y C.S. Administracion', -718.32], ['Colonia', -25.355], ['Honorarios profesionales', -114.539],
        ['Deportes Varios Administracion', -53.518], ['Organización eventos', -61.204], ['Obsequios', -0.937], ['Pileta', -60.5],
        ['Viajes y Movilidad', -3.154], ['Canjes', -267.005, [['Indumentaria', -103.922], ['Prepaga', -163.083]]],
      ]],
      ['Futsal Masculino', -1263.415, [
        ['Remuneraciones S.A.C y C.S.', -553.238], ['Alquiler Vivienda', -26.237], ['Artículos de Deporte', -13.211], ['Becas deportivas', -320.705],
        ['Comidas jugadores', -3.018], ['Honorarios profesionales', -161.774], ['Inscripción AFA', -22.298], ['Organización eventos', -77.551],
        ['Servicios y Abonos varios', -3.71], ['Transferencia Jugadores', -2.206], ['Viajes y Movilidad', -66.494], ['Vigilancia', -9.236], ['Varios', -3.737],
      ]],
      ['Futsal Femenino', -193.55, [
        ['Artículos de Deporte', -6.967], ['Becas deportivas', -76.368], ['Honorarios profesionales', -73.868], ['Inscripción AFA', -7.841],
        ['Organización Eventos', -18.526], ['Viajes y Movilidad', -8.39], ['Varios', -1.59],
      ]],
      ['Hockey Masculino', -45.789, [
        ['Afiliaciones e Inscripciones', -1.942], ['Agasajos, Buffet y Refrigerios', -4.107], ['Artículos de Deporte', -9.729],
        ['Honorarios profesionales', -20.184], ['Organización Eventos', -3.872], ['Viajes y Movilidad', -5.414], ['Varios', -0.541],
      ]],
      ['Hockey Femenino', -382.386, [
        ['Remuneraciones S.A.C y C.S.', -105.972], ['Afiliaciones e Inscripciones', -1.041], ['Agasajos, Buffet y Refrigerios', -25.676],
        ['Artículos de Deporte', -9.718], ['Honorarios profesionales', -193.244], ['Organización Eventos', -20.019], ['Viajes y Movilidad', -26.08], ['Varios', -0.636],
      ]],
      ['Handball Masculino', -113.941, [
        ['Afiliaciones e Inscripciones', -10.995], ['Alquiler Instalaciones', -4.538], ['Artículos de Deporte', -6.01], ['Honorarios profesionales', -58.744],
        ['Organización eventos', -25.867], ['Viajes y Movilidad', -6.775], ['Varios', -1.012],
      ]],
      ['Handball Femenino', -98.54, [
        ['Afiliaciones e Inscripciones', -4.613], ['Artículos de Deporte', -4.099], ['Honorarios profesionales', -58.141], ['Organización Eventos', -23.792],
        ['Viajes y Movilidad', -5.762], ['Varios', -2.133],
      ]],
      ['Futbol Inclusivo', -27.342, [
        ['Honorarios profesionales', -8.575], ['Artículos de Deporte', -2.313], ['Organización Eventos', -4.686], ['Viajes y Movilidad', -11.11], ['Varios', -0.658],
      ]],
      ['Futbol Playa Masculino', -45.758, [
        ['Afiliaciones e Inscripciones', -1.288], ['Honorarios profesionales', -26.95], ['Organización Eventos', -8.812], ['Viajes y Movilidad', -7.752], ['Varios', -0.956],
      ]],
      ['Futbol Playa Femenino', -15.387, [
        ['Honorarios profesionales', -3.662], ['Organización Eventos', -4.549], ['Viajes y Movilidad', -6.545], ['Varios', -0.631],
      ]],
    ]},
    { rawLabel:'Basket', normalizedCategory:'youth_other_sports_expense', amountNative:-6217.767, disclosureLevel:'detailed', items:[
      ['Basket Profesional', -5254.859, [
        ['Remuneraciones S.A.C. y C.S.', -946.639], ['Afiliaciones e Inscripciones', -31.908], ['Agasajos, Buffet y Refrigerios', -36.614],
        ['Alojamiento y Concentraciones', -233.395], ['Alquiler Vivienda', -210.867], ['Comisiones Varias', -230.487], ['Farmacia', -5.332],
        ['Gastos Transferencias Jugadores', -7.998], ['Honorarios', -56.311], ['Locación Servicios Plantel', -2304.868], ['Mantenimiento', -19.313],
        ['Organización eventos', -203.455], ['Policía Adicional', -9.407], ['Viajes y Movilidad', -487.375], ['Vigilancia', -3.374], ['Varios', -15.264],
        ['Canjes', -452.252, [['Indumentaria', -302.735], ['Prepaga', -149.517]]],
      ]],
      ['Basket Amateur', -962.908, [
        ['Remuneraciones S.A.C. y C.S.', -557.993], ['Agasajos, Buffet y Refrigerios', -16.794], ['Alquiler', -25.464], ['Becas', -81.037],
        ['Gastos de Transferencias de Jugadores', -5.504], ['Gastos Federativos', -33.214], ['Honorarios', -32.853], ['Organización eventos', -39.236],
        ['Servicios y Abonos Varios', -8.792], ['Viajes y Movilidad', -147.522], ['Varios', -14.499],
      ]],
    ]},
    { rawLabel:'Otras Amortizaciones', normalizedCategory:'depreciation', amountNative:-3785.324, disclosureLevel:'detailed', items:[
      ['Amortización Inmuebles', -1274.316], ['Amortización Instalaciones', -1054.825], ['Amortizaciones Varias', -1456.183],
    ]},
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-36332.931, disclosureLevel:'detailed', items:[
      ['Comisión Directiva', -1131.36, [['Remuneraciones S.A.C. y C.S.', -591.97], ['Agasajos, Buffet y Refrigerios', -63.155], ['Donaciones', -45.685], ['Honorarios', -100.989], ['Obsequios', -44.401], ['Organización eventos', -108.72], ['Servicios y Abonos Varios', -63.692], ['Viajes y Viaticos', -92.678], ['Varios', -20.07]]],
      ['Gerencia General', -515.256, [['Remuneraciones S.A.C. y C.S.', -513.493], ['Agasajos, Buffet y Refrigerios', -0.2], ['Artículos de Librería', -0.267], ['Obsequios', -0.467], ['Telefonía', -0.15], ['Viaticos', -0.294], ['Varios', -0.385]]],
      ['Gerencia de Legales', -806.873, [['Remuneraciones S.A.C. y C.S.', -581.08], ['Artículos de Librería e Impresos', -0.506], ['Honorarios', -220.0], ['Servicios Varios', -1.921], ['Tasas y Sellados', -2.546], ['Viajes y Viaticos', -0.313], ['Varios', -0.507]]],
      ['Gerencia de Administración y Finanzas', -1862.939, [['Remuneraciones S.A.C. y C.S.', -1622.405], ['Artículos de Librería e Impresos', -13.796], ['Honorarios', -185.249], ['Servicios y Abonos Varios', -39.51], ['Tasas y Sellados', -0.501], ['Telefonía', -0.642], ['Varios', -0.836]]],
      ['Planta Administrativa', -853.449, [['Agasajos, Buffet y Refrigerios', -784.767], ['Alquiler de Equipos Varios', -44.848], ['Artículos de Librería', -0.469], ['Servicios y Abonos Varios', -1.897], ['Suscripciones', -7.419], ['Telefonía', -14.049]]],
      ['Gerencia de Operaciones - Estadio', -11111.389, [['Remuneraciones S.A.C. y C.S.', -8930.402], ['Alquiler de Equipos Varios', -338.942], ['Articulos de limpieza', -159.291], ['Atenciones al Personal', -3.872], ['Combustibles', -17.953], ['Honorarios', -141.235], ['Impuestos y Servicios publicos', -764.871], ['Mantenimiento Inmueble y Muebles', -363.853], ['Servicios y Abonos Varios', -182.57], ['Telefonía', -6.395], ['Viáticos', -30.908], ['Varios', -27.243], ['Canjes', -143.854, [['Modulos', -74.473], ['Pintura', -69.381]]]]],
      ['Gerencia de Operaciones - Casa Amarilla', -2539.587, [['Remuneraciones S.A.C. y C.S.', -2059.288], ['Alquiler de Equipos Varios', -3.71], ['Articulos de limpieza', -52.313], ['Atenciones al Personal', -2.341], ['Combustibles', -2.267], ['Honorarios', -4.984], ['Impuestos y Servicios publicos', -281.663], ['Mantenimiento Inmueble y Muebles', -91.113], ['Servicios y Abonos Varios', -34.197], ['Varios', -7.711]]],
      ['Gerencia de Operaciones - Manzanas Casa Amarilla', -48.37, [['Impuestos y Servicios publicos', -8.678], ['Mantenimiento Inmueble y Muebles', -18.4], ['Servicios y Abonos Varios', -18.905], ['Varios', -2.387]]],
      ['Gerencia de Recursos Humanos', -2008.579, [['Remuneraciones S.A.C. y C.S.', -888.453], ['Atenciones al Personal', -672.651], ['Capacitación', -58.716], ['Honorarios', -199.442], ['Servicios y Abonos varios', -14.36], ['Telefonía', -0.672], ['Uniformes Personal', -166.408], ['Viajes y Viaticos', -2.066], ['Varios', -5.811]]],
      ['Gerencia de Sistemas', -4428.196, [['Remuneraciones S.A.C. y C.S.', -2101.594], ['Honorarios', -16.226], ['Mantenimiento', -2300.878], ['Telefonía', -0.585], ['Viajes y Viaticos', -1.881], ['Varios', -7.032]]],
      ['Gerencia de Seguridad', -4840.889, [['Remuneraciones S.A.C. y C.S.', -666.795], ['Honorarios', -46.163], ['Mantenimiento', -71.273], ['Viajes y Viaticos', -3.861], ['Vigilancia', -4051.508], ['Varios', -1.289]]],
      ['Gerencia de Abastecimiento', -828.044, [['Remuneraciones S.A.C. y C.S.', -797.031], ['Artículos de Librería e Impresos', -0.336], ['Honorarios', -25.821], ['Mantenimiento', -0.707], ['Servicios y Abonos Varios', -0.615], ['Viajes y Viaticos', -3.134], ['Varios', -0.4]]],
      ['Departamento de Indumentaria', -453.373, [['Remuneraciones S.A.C. y C.S.', -449.519], ['Agasajos, Buffet y Refrigerios', -0.698], ['Artículos de Librería e Impresos', -0.205], ['Fletes y Acarreos', -0.188], ['Mantenimiento', -0.133], ['Telefonía', -0.305], ['Viáticos', -0.137], ['Varios', -2.188]]],
      ['Departamento Médico', -3136.751, [['Remuneraciones S.A.C. y C.S.', -2125.558], ['Farmacia e Insumos Medicos', -98.046], ['Honorarios', -827.269], ['Mantenimiento', -13.287], ['Obsequios', -2.267], ['Servicios y Abonos Varios', -36.784], ['Telefonía', -0.957], ['Varios', -32.583]]],
      ['Departamento de Cultura', -454.174, [['Remuneraciones S.A.C. y C.S.', -316.703], ['Alquiler de Equipos Varios', -0.482], ['Honorarios', -107.913], ['Obsequios', -1.396], ['Organización eventos', -18.5], ['Viajes y Viaticcos', -0.456], ['Varios', -8.724]]],
      ['Departamento de Comunicación', -1257.96, [['Remuneraciones S.A.C. y C.S.', -334.781], ['Alquiler de Equipos Varios', -144.98], ['Canal Boca', -186.636], ['Honorarios', -409.635], ['Impresos y Papeleria', -128.161], ['Servicios y Abonos Varios', -51.27], ['Telefonía', -0.576], ['Varios', -1.921]]],
      ['Departamento de Relaciones Públicas', -55.742, [['Remuneraciones S.A.C. y C.S.', -39.681], ['Agasajos, Buffet y Refrigerios', -0.485], ['Obsequios', -13.066], ['Organización eventos', -0.504], ['Servicios y Abonos Varios', -0.287], ['Viajes y Viaticos', -0.894], ['Varios', -0.825]]],
    ]},
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-14386.410, disclosureLevel:'detailed', items:[
      ['Aportes a Fundacion Boca Social', -1252.398], ['Comisiones Tarjetas', -2051.732], ['Diversos', -2175.79], ['Gastos Bancarios', -2888.267],
      ['IVA', -3025.762], ['Mutual Jugadores 1%', -533.543], ['Previsión Indemnizaciones', -956.863], ['Previsión para Juicios', -735.121],
      ['Seguros Varios', -628.04], ['Sellos', -138.894],
    ]},
    { rawLabel:'Comerciales', normalizedCategory:'admin_general_expense', amountNative:-3250.608, disclosureLevel:'detailed', items:[
      ['Remuneraciones S.A.C. y C.S.', -440.852], ['Agasajos, Buffet y Refrigerios', -3.925], ['Costo Bocashop', -2550.301], ['Honorarios', -199.98],
      ['Obsequios', -18.211], ['Servicios Varios', -31.261], ['Viajes y Movilidad', -3.162], ['Varios', -2.916],
    ]},
    { rawLabel:'Socios', normalizedCategory:'admin_general_expense', amountNative:-2393.117, disclosureLevel:'detailed', items:[
      ['Centro de Atención al Socio', -1903.136, [['Remuneraciones S.A.C. y C.S.', -1137.571], ['Credenciales', -24.268], ['Honorarios', -182.717], ['Obsequios', -14.0], ['Organización eventos', -20.0], ['Servicios y Abonos Varios', -516.745], ['Varios', -7.835]]],
      ['Interior y Exterior', -274.451, [['Remuneraciones S.A.C. y C.S.', -71.217], ['Agasajos, Buffet y Refrigerios', -27.673], ['Honorarios', -50.82], ['Obsequios', -33.451], ['Organización eventos', -37.733], ['Viajes y Viaticos', -51.501], ['Varios', -2.056]]],
      ['Vitalicios', -115.626, [['Remuneraciones S.A.C. y C.S.', -73.984], ['Agasajos, Buffet y Refrigerios', -3.499], ['Obsequios', -23.094], ['Organización de eventos', -14.557], ['Varios', -0.492]]],
      ['Filiales', -25.474, [['Agasajos, Buffet y Refrigerios', -12.469], ['Honorarios', -1.087], ['Obsequios', -7.21], ['Organización eventos', -2.436], ['Varios', -2.272]]],
      ['Inclusión e Igualdad', -74.43, [['Remuneraciones S.A.C. y C.S.', -39.681], ['Agasajos, Buffet y Refrigerios', -1.277], ['Capacitaciones', -13.98], ['Honorarios', -9.603], ['Obsequios', -2.497], ['Viajes y Movilidad', -5.078], ['Varios', -2.314]]],
    ]},
    { rawLabel:'Eventuales', normalizedCategory:'admin_general_expense', amountNative:-847.000, disclosureLevel:'detailed' },
  ],
};


// ---------- METADATOS POR EJERCICIO ----------
const bocaFiscalYearMeta = {
  2018: { currency:'USD', fx:null, sourceId:'boca-placeholder-historico', reportType:'placeholder', gestionId:'angelici',
    grossDebt:5.5, cash:1.8, profitOnPlayerSales:5.5, assetSales:0, netInterest:-0.4, tax:-0.1,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  2019: { currency:'USD', fx:null, sourceId:'boca-placeholder-historico', reportType:'placeholder', gestionId:'angelici',
    grossDebt:6.1, cash:2.0, profitOnPlayerSales:6.0, assetSales:0, netInterest:-0.5, tax:-0.1,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  2021: { currency:'USD', fx:null, sourceId:'boca-placeholder-historico', reportType:'placeholder', gestionId:'ameal',
    grossDebt:11.8, cash:1.0, profitOnPlayerSales:3.0, assetSales:0, netInterest:-0.9, tax:-0.1,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  2022: { currency:'USD', fx:null, sourceId:'boca-placeholder-historico', reportType:'placeholder', gestionId:'ameal',
    grossDebt:11.0, cash:1.2, profitOnPlayerSales:4.2, assetSales:0, netInterest:-0.8, tax:-0.2,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  2023: { currency:'USD', fx:null, sourceId:'boca-placeholder-historico', reportType:'placeholder', gestionId:'ameal',
    grossDebt:10.5, cash:1.5, profitOnPlayerSales:5.0, assetSales:0, netInterest:-0.7, tax:-0.2,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  2024: { currency:'USD', fx:null, sourceId:null, reportType:'pending_official', gestionId:'riquelme',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  // Ejercicio 2025 = Memoria y Balance auditado al 30/06/2025 (sources['boca-balance-2024-25']). fx =
  // dólar mayorista BCRA al 30/06/2025 ($1.203), fecha de cierre puntual (el balance ya está en
  // "moneda homogénea" al 30/06/2025, Nota 2.2, así que corresponde el tipo de cambio de ESE día, no
  // un promedio del ejercicio). officialTotalRevenue = Total de Recursos impreso pág. 76 (incluye
  // transferencias de pases, ver comentario de cabecera del archivo). officialTotalExpenses = Total
  // de Gastos impreso pág. 76. officialPAT = Superávit del ejercicio impreso pág. 76. extraRows
  // preserva la etiqueta real del balance para esta fila (en vez de la genérica "Intereses netos").
  2025: { currency:'ARS', fxRef:'ARS@2025-06-30', sourceId:'boca-balance-2024-25', reportType:'official_balance_sheet', gestionId:'riquelme',
    grossDebt:44566.207208, cash:12520.193181, profitOnPlayerSales:0, assetSales:0, netInterest:711.737276, tax:0,
    extraRows:[{label:'Resultados financieros y por tenencia (incluye RECPAM)', value:711.737276}],
    officialTotalRevenue:237614.566642, officialTotalExpenses:202744.841714, officialPAT:35581.462204 },
  2026: { currency:'USD', fx:null, sourceId:null, reportType:'pending_official', gestionId:'riquelme',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:null, officialTotalExpenses:null, officialPAT:null },
  // Ejercicio 2027 = Presupuesto oficial 2026/27. fx = promedio entre el dólar de inicio ($1.480) y
  // cierre ($1.840) del ejercicio = $1.660 (ver acordeón "Presupuesto 2026/27"). officialPAT acá es un
  // resultado DERIVADO (Ingresos − Gastos del propio presupuesto, $3.402,243 M), no una cifra que el
  // documento imprima con esa etiqueta (un presupuesto no tiene "Superávit del ejercicio" real
  // todavía), se deja como chequeo de consistencia interna igual que Revenue/Expenses.
  2027: { currency:'ARS', fx:1660, fxSource:'document_assumption', sourceId:'boca-presupuesto-2026-27', reportType:'official_budget', gestionId:'riquelme',
    grossDebt:0, cash:0, profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:239392.104, officialTotalExpenses:235989.861, officialPAT:3402.243 },
};


// ---------- MERCADO DE PASES / RESULTADOS DEPORTIVOS / TÍTULOS (sin cambios de contenido) ----------
const bocaPasesData = [
  {gestion:'riquelme', anio:2025, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador A', movimiento:'Venta', monto:18.5},
  {gestion:'riquelme', anio:2025, ventana:'Verano', tipo:'Jugador', nombre:'Jugador B', movimiento:'Compra', monto:-14.0},
  {gestion:'riquelme', anio:2024, ventana:'Verano', tipo:'Jugador', nombre:'Jugador C', movimiento:'Venta', monto:12.0},
  {gestion:'riquelme', anio:2024, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador D', movimiento:'Compra', monto:-9.5},
  {gestion:'riquelme', anio:2023, ventana:'Verano', tipo:'DT', nombre:'DT entrante (Riquelme)', movimiento:'Contratación', monto:0},
  {gestion:'ameal', anio:2023, ventana:'Invierno', tipo:'DT', nombre:'DT saliente (Ameal)', movimiento:'Salida', monto:0},
  {gestion:'ameal', anio:2022, ventana:'Verano', tipo:'Jugador', nombre:'Jugador E', movimiento:'Compra', monto:-16.0},
  {gestion:'ameal', anio:2022, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador F', movimiento:'Compra', monto:-11.5},
  {gestion:'ameal', anio:2021, ventana:'Verano', tipo:'Jugador', nombre:'Jugador G', movimiento:'Venta', monto:9.0},
  {gestion:'ameal', anio:2023, ventana:'Verano', tipo:'Jugador', nombre:'Jugador H', movimiento:'Venta', monto:8.5},
  {gestion:'ameal', anio:2021, ventana:'Invierno', tipo:'DT', nombre:'DT entrante (Ameal)', movimiento:'Contratación', monto:0},
  {gestion:'angelici', anio:2019, ventana:'Verano', tipo:'Jugador', nombre:'Jugador I', movimiento:'Venta', monto:22.0},
  {gestion:'angelici', anio:2018, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador J', movimiento:'Venta', monto:11.5},
  {gestion:'angelici', anio:2018, ventana:'Verano', tipo:'Jugador', nombre:'Jugador K', movimiento:'Compra', monto:-8.0},
  {gestion:'angelici', anio:2019, ventana:'Invierno', tipo:'Jugador', nombre:'Jugador L', movimiento:'Compra', monto:-10.5},
  {gestion:'angelici', anio:2018, ventana:'Verano', tipo:'DT', nombre:'DT entrante (Angelici)', movimiento:'Contratación', monto:0},
];


// Fuente: cobertura de Infobae, La Nación y Wikipedia sobre cada gestión (agosto 2026).
// Verificar contra el sitio oficial del club antes de publicar.
const bocaResultadosData = {
  angelici:{titulosLocales:6, titulosInternacionales:0, mejorResultadoLibertadores:'Finalista (2012 y 2018)'},
  ameal:{titulosLocales:6, titulosInternacionales:0, mejorResultadoLibertadores:'Semifinalista (2020)'},
  riquelme:{titulosLocales:0, titulosInternacionales:0, mejorResultadoLibertadores:'Eliminado en fase preliminar (2025), primera vez en 19 participaciones consecutivas'},
};


const bocaTitulosData = [
  {anio:2012, competencia:'Copa Argentina', resultado:'Campeón', gestion:'angelici'},
  {anio:2015, competencia:'Campeonato de Primera División', resultado:'Campeón', gestion:'angelici'},
  {anio:2015, competencia:'Copa Argentina', resultado:'Campeón', gestion:'angelici'},
  {anio:2017, competencia:'Primera División 2016/17', resultado:'Campeón', gestion:'angelici'},
  {anio:2018, competencia:'Primera División 2017/18', resultado:'Campeón', gestion:'angelici'},
  {anio:2018, competencia:'Supercopa Argentina', resultado:'Campeón', gestion:'angelici'},
  {anio:2020, competencia:'Superliga 2019/20', resultado:'Campeón', gestion:'ameal'},
  {anio:2020, competencia:'Copa de la Liga Profesional', resultado:'Campeón', gestion:'ameal'},
  {anio:2020, competencia:'Copa Argentina 2019/20', resultado:'Campeón', gestion:'ameal'},
  {anio:2022, competencia:'Copa de la Liga Profesional', resultado:'Campeón', gestion:'ameal'},
  {anio:2022, competencia:'Primera División', resultado:'Campeón', gestion:'ameal'},
  {anio:2023, competencia:'Supercopa Argentina', resultado:'Campeón', gestion:'ameal'},
];


// Versión 102 (migración de Boca al motor genérico, ver comentario de cabecera del archivo): mismo
// registro que ya usan River/Racing/etc. — reemplaza yearMeta/computeYear/simplifiedReportForBoca/
// nativeFinancialsBoca (borrados de js/finanzas-calc.js y js/finanzas-render.js en la misma migración).
// finanzasYears/finanzasGestiones (campos nuevos, opcionales, leídos por populateFinanzasSelectors en
// js/finanzas-render.js): qué años/gestiones muestra el <select> de Finanzas — Boca sigue mostrando
// solo los 4 ejercicios reales/pendientes (Versión 81 del historial, "quita los años placeholder de
// Finanzas") y la gestión Riquelme (única con datos de Finanzas), aunque bocaFiscalYearMeta/
// gestionesByClub.boca (data/clubs.js) sigan teniendo los 5 años/2 gestiones viejas para Mercado de
// Pases/Resultados/Comparar Gestiones. Cualquier club sin estos 2 campos (el resto) muestra TODOS sus
// años/gestiones, comportamiento sin cambios.
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.boca = {
  revenueLinesByYear: bocaRevenueLinesByYear, expenseLinesByYear: bocaExpenseLinesByYear,
  fiscalYearMeta: bocaFiscalYearMeta, pasesData: bocaPasesData,
  resultadosData: bocaResultadosData, titulosData: bocaTitulosData,
  finanzasYears: [2027, 2026, 2025, 2024], finanzasGestiones: ['riquelme'],
};
