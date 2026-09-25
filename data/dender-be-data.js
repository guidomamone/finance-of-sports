// ============================================================================
// data/dender-be-data.js — Football Club Verbroedering Dender EH VZW (conocido como
// "FCV Dender EH"), Bélgica, clubId 'dender-be'. Cierre 30/6/2025 (ejercicio
// 1/7/2024-30/6/2025) → clave 2025, mismo criterio que el resto de los clubes belgas.
//
// FUENTE: `Clubes/Bélgica/Dender EH/jaarrekening-2025-06-30-individual.md`. PDF con
// capa de texto nativa, formato VKT-VZW (esquema estatutario ABREVIADO de una VZW,
// "vereniging zonder winstoogmerk" — asociación sin fines de lucro, no una NV/sociedad
// anónima como el resto de los belgas cargados). Auditor/Commissaris no identificado
// con nombre en las secciones leídas (el filing es de tipo "micro/klein", sin informe
// de auditoría extenso adjunto). Verificado con `pdftotext -layout` y comparado contra
// la imagen renderizada de la Resultatenrekening (pág. 5) antes de cargar, porque
// el código "73" (Lidgeld, schenkingen, legaten en subsidies) aparece IMPRESO EN
// BLANCO en el documento — no es un error de transcripción, el club simplemente no
// completó ese código en el filing.
//
// OJO — ESTA ES LA ENTIDAD VZW SOLA, NO EL GRUPO: la nota de "Waarderingsregels"
// (pág. 15) dice explícito que en el ejercicio 2025-26 "zal een herstructurering
// plaatsvinden waarbij bepaalde activiteiten door NV Dender Foot zullen worden
// verdergezet" (ciertas actividades se transferirán a la sociedad comercial NV Dender
// Foot) — o sea que esta VZW es la entidad HISTÓRICA/patrimonial (dueña del estadio,
// empleadora del plantel), y buena parte del negocio comercial ya convive con una NV
// hermana. No hay cuentas consolidadas disponibles.
//
// INGRESOS (Resultatenrekening, pág. 5, EUR): el esquema VKT-VZW abreviado NO
// desglosa "Omzet" (código 70) en ningún lado del documento (no hay Nota 6.10 tipo
// Charleroi/Anderlecht en este formato) — se carga como lump_football_operations.
//   Omzet (código 70): 7.116.234 → lump_football_operations.
//   Niet-recurrente bedrijfsopbrengsten (código 76A): 119.704 → other_income.
//   Residuo IMPLÍCITO no impreso como línea propia: "Brutomarge" (código 9900,
//     4.843.550) es por definición Bedrijfsopbrengsten(70+71+72+74+76A) menos
//     Handelsgoederen/diensten (código 60/61, 4.318.796) — despejando:
//     Bedrijfsopbrengsten = 4.843.550+4.318.796 = 9.162.346, y como 70+76A =
//     7.235.938, el resto (1.926.408) corresponde a códigos 71/72/74 (variación de
//     stock/producción propia/otros ingresos operativos), que el esquema VKT-VZW
//     abreviado NO imprime como líneas separadas. Se cargó como línea propia
//     ("Overige bedrijfsopbrengsten, impliciet in Brutomarge") → other_income, para no
//     perder ese monto real (no inventado: es la única cifra consistente con
//     Brutomarge + 60/61 impresos), documentado como IMPLÍCITO, no como una línea que
//     el club haya identificado con nombre propio. PREGUNTA ABIERTA (ver
//     Admin/dudas-por-club.md): a qué corresponde exactamente.
//   officialTotalRevenue = 7.116.234+119.704+1.926.408 = 9.162.346 (no es un total
//     impreso literal en el documento, es la reconstrucción exacta de
//     Bedrijfsopbrengsten que exige la fórmula de Brutomarge, ver arriba).
//
// GASTOS (misma tabla):
//   wages_squad = Bezoldigingen, sociale lasten en pensioenen (código 62, -8.269.828,
//     sin separar plantel/resto del personal — no hay Nota tipo Vélez con 2do eje).
//   depreciation = Afschrijvingen en waardeverminderingen (código 630, -574.659,
//     inmateriales + materiales combinado — la Nota 6.1.1/6.1.2 de movimiento de
//     activos SÍ separa 241.982 inmaterial + 332.677 material, pero el documento NO
//     confirma en ningún lado que "Immateriële vaste activa" sean derechos federativos
//     de jugadores, a diferencia de Charleroi/sonderjyske-dk donde sí hay una nota
//     explícita — se dejó combinado en depreciation en vez de forzar
//     player_amortisation sin esa confirmación; PREGUNTA ABIERTA para
//     Admin/dudas-por-club.md).
//   exceptional_items = Niet-recurrente bedrijfskosten (código 66A, -37.088).
//   other_expenses = Handelsgoederen/diensten (código 60/61, -4.318.796) +
//     Waardeverminderingen op vorderingen (código 631/4, -41.123) + Andere
//     bedrijfskosten (código 640/8, -36.709) = -4.396.628.
//   officialTotalExpenses = 8.269.828+574.659+4.396.628 = 13.241.115, EXCLUYENDO el ítem
//   exceptional_items (37.088) — CORREGIDO en la integración: `computeYearGeneric()`
//   (js/finanzas-calc.js) excluye `exceptional_items` de `expenses` a propósito (mismo
//   criterio "Chelsea" que ya usan Charleroi/Club Brugge/Zulte Waregem), y la versión
//   original de este archivo incluía el ítem en `officialTotalExpenses`, desalineándolo del
//   cálculo real del motor — detectado por `node tools/audit.js` (`no-cierra`, P0).
//
// RESULTADO FINANCIERO: Financiële opbrengsten (145) - Financiële kosten (623.692) =
//   netInterest -623.547.
// TAX: Belastingen op het resultaat = -213.846 (código 67/77, SUMA como gasto pese a
//   que el club está en pérdida — así lo resta el propio esquema, Winst vóór belasting
//   9903 menos 213.846 = Winst 9904).
//
// TIE-OUT (verificado contra pág. 5, código 9904 "Winst (Verlies) van het boekjaar"):
//   revenue 9.162.346 - expenses 13.278.203 + netInterest (623.547) + tax (213.846) =
//   -4.953.250, contra -4.953.248 impreso — diferencia de EUR 2, redondeo del propio
//   documento (el mismo tipo de diferencia de EUR 1-2 ya documentado en
//   charleroi-be/anderlecht-be, no es error de carga: "Bedrijfswinst" 9901 impreso
//   (-4.115.855) también difiere en EUR 2 de la suma exacta de sus propias líneas
//   componentes, -4.115.857).
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en data/currency-map.js).
//
// grossDebt: Schulden op meer dan één jaar - Overige leningen (21.682.470, deuda con
//   accionistas/partes relacionadas según Nota 6.6: "RC Belinda Siahaan - vaste
//   vertegenwoordigd van Dender Foot NV") — no hay deuda financiera de corto plazo
//   separada (Kredietinstellingen/Overige leningen ≤1 año en 0). cash: Liquide
//   middelen = 44.976.
//
// GESTIÓN: 4 bestuurders listados (De Bolster Els, Verbeken Rik, Sitorus Sihar, Dender
//   Foot representado por Siahaan Belinda) sin un cargo de "voorzitter"/presidente
//   marcado en la lista → gestionId: null, sin entrada en gestionesByClub.
// ============================================================================

const denderBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:7.116234, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.119704, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfsopbrengsten (impliciet in Brutomarge, niet als aparte code afgedrukt — zie koptekst)', normalizedCategory:'other_income', amountNative:1.926408, disclosureLevel:'aggregated' },
  ],
};

const denderBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen + Waardeverminderingen op handelsvorderingen + Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-4.396628, disclosureLevel:'detailed', items:[
      ['Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen', -4.318796],
      ['Waardeverminderingen op voorraden/bestellingen/handelsvorderingen', -0.041123],
      ['Andere bedrijfskosten', -0.036709],
    ]},
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-8.269828, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op immateriële en materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.574659, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.037088, disclosureLevel:'detailed' },
  ],
};

const denderBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'dender-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    // Financiële opbrengsten(0.000145) - Financiële kosten(0.623692).
    netInterest:-0.623547,
    // Belastingen op het resultaat (código 67/77), resta pese a estar en pérdida.
    tax:-0.213846,
    // grossDebt = Schulden op meer dan één jaar - Overige leningen (deuda con partes
    // relacionadas, Nota 6.6). cash = Liquide middelen.
    grossDebt:21.682470, cash:0.044976,
    officialTotalRevenue:9.162346, officialTotalExpenses:13.241115, officialPAT:-4.953248,
  },
};

const denderBePresupuestoOverlayByYear = {};

const denderBePasesData = [];
const denderBeResultadosData = {};
const denderBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dender-be'] = {
  revenueLinesByYear: denderBeRevenueLinesByYear, expenseLinesByYear: denderBeExpenseLinesByYear,
  fiscalYearMeta: denderBeFiscalYearMeta, pasesData: denderBePasesData,
  resultadosData: denderBeResultadosData, titulosData: denderBeTitulosData,
  presupuestoOverlayByYear: denderBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'dender-be-jaarrekening-2025': {
    id:'dender-be-jaarrekening-2025', clubId:'dender-be',
    title:"Jaarrekening FCV Dender EH VZW voor het boekjaar van 01-07-2024 tot 30-06-2025",
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas de la VZW (asociación sin fines de lucro) individual, NO consolidadas con NV Dender Foot (sociedad comercial hermana que, per nota de la propia jaarrekening, absorberá parte de la actividad desde el ejercicio 2025-26). Esquema estatutario ABREVIADO (VKT-VZW): no desglosa Omzet por categoría de ingreso, a diferencia del esquema completo de otros clubes belgas cargados. PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Dender EH/jaarrekening-2025-06-30-individual.md.',
  },
});

memberCountByClub['dender-be'] = null;
