// ============================================================================
// data/hoffenheim-de-data.js — TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH
// (Alemania, Bundesliga). 2 ejercicios REALES, los 2 Konzernabschluss (cuentas
// CONSOLIDADAS del grupo: 2 subsidiarias + 1 Zweckgesellschaft), bajados de
// unternehmensregister.de. Transcripciones completas en
// Clubes/Alemania/TSG Hoffenheim/konzernabschluss-<ejercicio>.md.
//
// Ejercicio fiscal: 01/07 al 30/06 (confirmado en cada documento). Clave = año
// de CIERRE (2024 = ejercicio 2023/24, 2025 = ejercicio 2024/25).
//
// ADVERTENCIA DE CALIDAD DE FUENTE — LA TABLA DE GuV DE 2023/24 LLEGÓ CON LAS
// COLUMNAS DESALINEADAS por el proceso de conversión PDF→Markdown (columnas de
// la Bilanz-Passiva y de la Konzern-GuV intercaladas en el mismo bloque de
// texto, ver el .md original alrededor de "Konzern - Gewinn- und" pág. 4-5).
// Los 14 valores de las líneas 4-16 de la GuV se reconstruyeron cruzando ORDEN
// de aparición + los 2 tie-outs de la sección V del Konzernanhang (Materialaufwand
// T€3.390/T€2.982, Personalaufwand T€90.996/T€90.137→84.790+5.347, Steuern vom
// Einkommen "Ertrag T€3"/Vorjahr "Aufwand T€646") + Lagebericht 4.3 ("Umsatzerlöse
// T€149.217/Vorjahr T€171.442"). Con esos anclajes, la cadena completa
// revenue+expenses+netInterest+tax reconcilia EXACTA (a 1 EUR) contra CADA
// resultado intermedio impreso (Ergebnis nach Steuern, Ergebnis vor Übernahme,
// Konzernjahresüberschuss, Konzernverlust) para LOS DOS ejercicios — ver el
// detalle línea por línea abajo. El ejercicio 2024/25 llegó con la tabla
// perfectamente alineada (incluye AMBAS columnas, actual + comparativo del año
// anterior en T€), y esa columna comparativa 2023/24 coincide EXACTA con la
// reconstrucción hecha a mano para el archivo de 2023/24 — confirma que la
// reconstrucción fue correcta.
//
// ESTRUCTURA DE CAPITAL — "atypisch stille Beteiligung" (participación
// societaria atípica) de Dietmar Hopp, TRATAMIENTO DE officialPAT (VER TAMBIÉN
// Admin/dudas-por-club.md): el Konzern-GuV tiene 3 líneas de resultado final,
// no 1:
//   14. Konzernjahresüberschuss (resultado consolidado TOTAL, antes de repartir
//       entre el GmbH y el partner silencioso)
//   15. auf andere Gesellschafter entfallender Gewinn/Verlust (porción asignada
//       a "otros socios" — la Zweckgesellschaft por la que Dietmar Hopp
//       participa, tratada como "nicht beherrschende Anteile")
//   16. Konzernverlust (el resultado FINAL, el que se traslada literalmente a
//       "IV. Konzernverlust" del PASIVO de la Bilanz — el único de los 3 que
//       reconcilia con el patrimonio neto del grupo)
// Precedente ya establecido para Augsburg/Eintracht Frankfurt (NCI de
// subsidiaria común): usan el resultado ANTES de nicht beherrschende Anteile
// como officialPAT ("reconcilia exacta con revenue+expenses+netInterest+tax sin
// necesitar un campo aparte"). Ese precedente NO calza acá: la "Ergebniszuweisung
// atypisch stiller Gesellschafter" (línea 13, +24,6M en 2023/24) no es una simple
// asignación de % de propiedad de una subsidiaria — es una cláusula contractual
// de absorción de pérdidas/ganancias del partner silencioso que por sí sola
// transforma un resultado operativo+financiero de -23,4M en un resultado
// consolidado de +1,3M. Se decidió: officialPAT = Konzernverlust (línea 16, el
// cierre real de la Bilanz), y `tax` absorbe TODAS las líneas "por debajo de la
// línea" que German HGB imprime entre "Ergebnis nach Steuern" y "Konzernverlust"
// (Steuern vom Einkommen + sonstige Steuern + Ergebniszuweisung atypisch stiller
// Gesellschafter + auf andere Gesellschafter entfallender Gewinn/Verlust) — el
// mismo criterio que ya usa Stuttgart para su NCI real (VfB Reha-Welt GmbH 20%),
// "no hay un campo dedicado a interés minoritario en fiscalYearMeta". Esto hace
// que `tax` salga como una cifra grande y POSITIVA (22,79M en 2023/24), lo cual
// es inusual, pero es la única forma de que el tie-out cierre exacto contra el
// número que la propia Bilanz usa como patrimonio del grupo. Pregunta abierta en
// Admin/dudas-por-club.md: ¿usar en cambio Konzernjahresüberschuss (línea 14,
// antes de TODA asignación a terceros, criterio Augsburg/Frankfurt) sería más
// representativo del resultado "del club"? Ambas lecturas son defendibles.
//
// REVENUE — Umsatzerlöse por línea de negocio (Konzernanhang V., en TEUR, más el
// Lagebericht 4.3/3.3 que confirma el total exacto): Medienrechte, Sponsoring,
// Transfers, Handel, Spielbetrieb tienen cifra propia; el resto (Umsatzerlöse
// total menos esas 5 partidas) es RESIDUAL sin desglose propio en el documento
// → other_income, disclosureLevel:'aggregated_residual' (mismo criterio que
// Werder Bremen). "Handel" (venta de merchandising) → sponsorship_commercial,
// mismo criterio que Werder/Köln. Sonstige betriebliche Erträge (línea 2 del
// P&L, separada de Umsatzerlöse) → other_income, sin más desglose numérico en
// el Anhang (solo texto narrativo: Sachbezüge, reversión de previsiones,
// indemnizaciones de seguro).
//
// GASTOS — Materialaufwand: UNA sola sub-línea impresa ("Aufwendungen für Roh-,
// Hilfs- und Betriebsstoffe und bezogene Waren", a diferencia de Werder que
// tiene 2 sub-líneas) → other_expenses completo, sin desglose adicional.
// Personalaufwand (Löhne + soziale Abgaben) → wages_squad, el documento no
// separa plantel profesional de personal administrativo (mismo caso que Werder/
// Köln). Abschreibungen: el P&L combina en una sola línea intangibles+tangibles,
// pero el Konzern-Anlagenspiegel (tabla de movimiento de activo fijo, columna
// "Zugänge" = cargo del ejercicio) SÍ separa "entgeltlich erworbene Konzessionen"
// (derechos federativos de jugadores capitalizados) de Sachanlagen — se
// promovieron a 2 líneas (player_amortisation/depreciation), mismo criterio que
// Köln. La suma de los 2 componentes del Anlagenspiegel (en T€, redondeado) no
// cierra al EUR exacto contra la cifra del P&L (diferencia de <1 T€, redondeo
// del propio documento entre la tabla del Anlagenspiegel en miles y el P&L en
// EUR exactos) — se ajustó el 2do componente (depreciation) para que la suma
// de las 2 líneas cierre EXACTA contra el total impreso del P&L, documentado
// en el comentario del año. Sonstige betriebliche Aufwendungen → other_expenses,
// sin desglose numérico adicional en el Anhang de ninguno de los 2 ejercicios.
//
// MONEDA: EUR los 2 ejercicios. El documento no declara tipo de cambio propio a
// USD → fxRef contra FX_CLOSE (data/currency-map.js): EUR@2024-06-30 y
// EUR@2025-06-30 YA EXISTÍAN antes de esta carga (no hizo falta agregar ninguna
// fecha nueva).
//
// grossDebt: C. Verbindlichkeiten (Bilanz Passiva) completo — Verbindlichkeiten
// gegenüber Kreditinstituten + aus Lieferungen und Leistungen + sonstige
// Verbindlichkeiten — EXCLUYE B. Rückstellungen y D. Rechnungsabgrenzungsposten,
// mismo criterio angosto que Boca/Vélez/Köln (club-data-mapping SKILL.md sección
// 14). cash = III. Kassenbestand, Bundesbankguthaben, Guthaben bei
// Kreditinstituten und Schecks (Bilanz Aktiva, Umlaufvermögen).
//
// LIGA: Bundesliga los 2 ejercicios (7° puesto 2023/24, 15° puesto 2024/25, sin
// descenso — confirmado en el Lagebericht de cada año). Cargado en
// data/club-leagues/de.js.
//
// gestionId: 'actual' en los 2 ejercicios — la Geschäftsführung cambió DENTRO y
// ENTRE los 2 ejercicios (Denni Strich/Prof. Dr. Jan Mayer/Alexander Rosen hasta
// mediados de 2024, Dr. Markus Schütz como Vorsitzender desde el 8/7/2024), sin
// un único responsable identificable con solvencia para todo el período, mismo
// criterio que Köln.
// ============================================================================

const hoffenheimDeRevenueLinesByYear = {
  // Ejercicio 2023/24 (01.07.2023-30.06.2024). Umsatzerlöse total T€149.217
  // (Lagebericht 4.3/3.3 y Konzernanhang V.). Componentes con cifra propia
  // (Konzernanhang V.): Medienrechte 58.005, Sponsoring 23.109, Transfers
  // 44.873, Handel 2.980, Spielbetrieb 15.145 — suma 144.112. Residual =
  // 149.216596-144.112 = 5.104596 (other_income, sin desglose propio).
  2024: [
    { rawLabel:'Medienrechte', normalizedCategory:'broadcasting', amountNative:58.005000, disclosureLevel:'detailed' },
    { rawLabel:'Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:23.109000, disclosureLevel:'detailed' },
    { rawLabel:'Transfers', normalizedCategory:'player_sales', amountNative:44.873000, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:2.980000, disclosureLevel:'detailed' },
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:15.145000, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:5.104596, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:1.575090, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2024/25 (01.07.2024-30.06.2025). Umsatzerlöse total T€171.941.
  // Componentes con cifra propia: Medienrechte 84.099, Sponsoring 22.986,
  // Transfers 37.679, Handel 3.589, Spielbetrieb 17.312 — suma 165.665.
  // Residual = 171.941496-165.665 = 6.276496.
  2025: [
    { rawLabel:'Medienrechte', normalizedCategory:'broadcasting', amountNative:84.099000, disclosureLevel:'detailed' },
    { rawLabel:'Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:22.986000, disclosureLevel:'detailed' },
    { rawLabel:'Transfers', normalizedCategory:'player_sales', amountNative:37.679000, disclosureLevel:'detailed' },
    { rawLabel:'Handel', normalizedCategory:'sponsorship_commercial', amountNative:3.589000, disclosureLevel:'detailed' },
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:17.312000, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:6.276496, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:1.456315, disclosureLevel:'detailed' },
  ],
};

const hoffenheimDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-3.389566, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-90.996243, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -85.064540], ['soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -5.931703],
    ]},
    // Abschreibungen (P&L, EUR exacto 30.138.809), separada vía Konzern-Anlagenspiegel
    // (Zugänge del ejercicio, en T€): immateriell 25.823, Sachanlagen 3.143+391+783=4.317,
    // suma 30.140 (vs 30.139 exacto — diferencia de redondeo del propio documento entre la
    // tabla en miles y el P&L en EUR). Se ajustó depreciation para que la suma cierre exacta.
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen; überwiegend Spielervermögen), laut Konzern-Anlagenspiegel', normalizedCategory:'player_amortisation', amountNative:-25.823000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Konzern-Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-4.315809, disclosureLevel:'detailed', items:[
      ['Grundstücke, grundstücksgleiche Rechte etc.', -3.143000], ['technische Anlagen und Maschinen', -0.391000], ['andere Anlagen, Betriebs- und Geschäftsausstattung', -0.783000],
    ]},
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-54.148713, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-3.996119, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-94.870639, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -88.032356], ['soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', -6.838283],
    ]},
    // Reconcilia: Zugänge Anlagenspiegel immateriell 39.445 + Sachanlagen (3.187+263+991=4.441)
    // = 43.886 (T€) vs 43.885434 exacto — depreciation ajustada para cerrar exacto.
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen; überwiegend Spielervermögen), laut Konzern-Anlagenspiegel', normalizedCategory:'player_amortisation', amountNative:-39.445000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Konzern-Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-4.440434, disclosureLevel:'detailed', items:[
      ['Grundstücke, grundstücksgleiche Rechte etc.', -3.187000], ['technische Anlagen und Maschinen', -0.263000], ['andere Anlagen, Betriebs- und Geschäftsausstattung', -0.991000],
    ]},
    { rawLabel:'Sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-60.442856, disclosureLevel:'detailed' },
  ],
};

const hoffenheimDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'hoffenheim-de-konzernabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = 7. Sonstige Zinsen und ähnliche Erträge (5.163357) - 8. Zinsen und ähnliche
    // Aufwendungen (0.444625) = 4.718732.
    netInterest:4.718732,
    // tax absorbe TODO lo "por debajo de la línea" HGB entre Ergebnis nach Steuern y Konzernverlust
    // (ver comentario de cabecera): 9. Steuern vom Einkommen (+0.003296, Ertrag) + 11. sonstige
    // Steuern (-0.206206) + 13. Ergebniszuweisung atypisch stiller Gesellschafter (+24.633713) +
    // 15. auf andere Gesellschafter entfallender Gewinn/Verlust (-1.636257) = 22.794546.
    tax:22.794546,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:58.277885, cash:35.578492,
    officialTotalRevenue:150.791686, officialTotalExpenses:178.673331,
    // officialPAT = 16. Konzernverlust (el resultado final, el que se traslada a la Bilanz).
    officialPAT:-0.368366,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'hoffenheim-de-konzernabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = 4.080081 - 0.567994 = 3.512087.
    netInterest:3.512087,
    // tax = 9. (-0.280078, Aufwand) + 11. (-0.088739) + 13. (+27.754237) + 15. (-1.289426) = 26.095994.
    tax:26.095994,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:79.418182, cash:41.681699,
    officialTotalRevenue:173.397811, officialTotalExpenses:203.195048,
    officialPAT:-0.189156,
  },
};

const hoffenheimDePresupuestoOverlayByYear = {};
const hoffenheimDePasesData = [];
const hoffenheimDeResultadosData = {};
const hoffenheimDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['hoffenheim-de'] = {
  revenueLinesByYear: hoffenheimDeRevenueLinesByYear, expenseLinesByYear: hoffenheimDeExpenseLinesByYear,
  fiscalYearMeta: hoffenheimDeFiscalYearMeta, pasesData: hoffenheimDePasesData,
  resultadosData: hoffenheimDeResultadosData, titulosData: hoffenheimDeTitulosData,
  presupuestoOverlayByYear: hoffenheimDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'hoffenheim-de-konzernabschluss-2024': {
    id:'hoffenheim-de-konzernabschluss-2024', clubId:'hoffenheim-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Konzernabschluss (cuentas consolidadas: TSG 1899 Hoffenheim Akademie GmbH, achtzehn99 Reha GmbH y la Zweckgesellschaft TSG 1899 Hoffenheim Fußball-Besitzgesellschaft mbH & Co. KG) bajado de unternehmensregister.de. 17 páginas. Transcripción completa en Clubes/Alemania/TSG Hoffenheim/konzernabschluss-2023-24.md. La tabla de GuV de este ejercicio llegó con columnas desalineadas en la conversión PDF→Markdown; se reconstruyó cruzando el Konzernanhang/Lagebericht — ver comentario de cabecera de hoffenheim-de-data.js.',
  },
  'hoffenheim-de-konzernabschluss-2025': {
    id:'hoffenheim-de-konzernabschluss-2025', clubId:'hoffenheim-de',
    title:'Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Konzernabschluss (cuentas consolidadas). Bajado de unternehmensregister.de. 18 páginas. Transcripción completa en Clubes/Alemania/TSG Hoffenheim/konzernabschluss-2024-25.md.',
  },
});

gestionesByClub['hoffenheim-de'] = {
  actual: { nombre:'Gestión actual (Dr. Markus Schütz, Vorsitzender der Geschäftsführung desde 8/7/2024)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['hoffenheim-de'] = null;
