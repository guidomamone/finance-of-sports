// ============================================================================
// data/viborg-dk-data.js — Viborg F.F. Prof. Fodbold A/S (clubId 'viborg-dk').
// Dinamarca/DKK ya existen como país/moneda en el sitio (F.C. København,
// Brøndby, FC Midtjylland ya cargados). Un solo ejercicio: 2024
// (temporada 01.07.2023-30.06.2024, típica de la 3F Superliga — confirmado en
// la portada del propio documento: "Årsrapport for regnskabsåret 01.07.23 -
// 30.06.24"). Clave de año = año en que TERMINA el ejercicio, mismo criterio
// que Club Brugge/FC Midtjylland → 2024.
//
// ENTIDAD LEGAL: Viborg F.F. Prof. Fodbold A/S (CVR 83 07 37 13), la sociedad
// anónima que aísla la operación de fútbol profesional del club (no hay
// mención de una holding separada tipo PARKEN/FCK en este documento — parece
// ser la única entidad relevante para el fútbol de Viborg).
//
// FUENTE: transcripción completa en
// "Clubes/Dinamarca/Viborg FF/aarsrapport-2024-06-30.md" (aarsrapport danés,
// auditor Beierholm, sin salvedades — "Den uafhængige revisors
// revisionspåtegning" no reporta ningún "forbehold"). PDF con capa de texto
// nativa.
//
// UNIDADES: a diferencia de FC København/Brøndby (documentos en t.kr., miles
// de coronas), el Resultatopgørelse y la Balance de ESTE documento están en
// DKK PLENAS (ver pág. 22: encabezado de columna dice "DKK", no "t.DKK" — el
// único lugar que usa la abreviatura t.DKK es un párrafo de prosa sobre
// remuneración de directivos, pág. 30, y sus cifras coinciden exactamente con
// la tabla en DKK plenas). amountNative acá = cifra impresa / 1.000.000.
//
// CATEGORIZACIÓN DE INGRESOS (Resultatopgørelse, pág. 22 — SIN nota de
// segmentoplysninger que desglose Nettoomsætning por concepto, a diferencia
// de FCK; la Ledelsesberetning solo describe en PROSA que "Nettoomsætning"
// combina entrada/matchday, TV y comercial, sin dar montos por concepto —
// pág. 12-13: "Entréindtægterne...", "TV-indtægter...", "Kommercielle
// indtægter..." son 3 párrafos de prosa separados, ninguno con cifra propia):
//   - "Nettoomsætning" (75.989.957) -> lump_football_operations. Se evaluó
//     primero si esto era una tabla con jerarquía de 2 niveles (ver
//     club-data-mapping sección 1, la regla de Racing) — NO lo es, es una
//     única cifra de resultado sin ningún desglose numérico en ningún Note
//     del documento (los Notes van de 1 a 19, ninguno abre Nettoomsætning).
//   - "Andre driftsindtægter" (56.705.954) -> player_sales. La nota de
//     política contable (pág. 42, Note 19) dice explícito: "Andre
//     driftsindtægter- og omkostninger omfatter resultatet af selskabets
//     transferaktiviteter, herunder transferindtægter og -omkostninger samt
//     gevinst og tab ved salg af immaterielle anlægsaktiver (netto)" = esta
//     línea es el resultado NETO de las actividades de transferencia
//     (ingresos de transfer MENOS costos de transfer) más ganancia/pérdida
//     neta por venta de activos fijos. A diferencia de FCK/Boca/Racing (que
//     muestran transferencias brutas, sin netear), ACÁ el propio documento
//     ya presenta esta línea neteada — se replica tal cual la presenta el
//     club (club-data-mapping sección 3: "reflejá cómo LO PRESENTA CADA
//     CLUB"). La Ledelsesberetning (pág. 13) confirma que el driver
//     dominante son ventas reales de jugadores: "Transferindtægterne er
//     positiv forbedret med t.DKK 22.300 i forhold til sidste år. Salget
//     består primært af salget af Anton Gaaei til AFC Ajax Amsterdam, Elias
//     Achouri til FC København, videresalg på Tobias Bech Kristensen...,
//     Alassana Jatta til Notts County F.C.... Ligeledes solgte klubben Jacob
//     Friis til Augsburg." Nota 1 (Særlige poster) revela que esta línea
//     también incluye un ítem especial menor y negativo, "Kompensation fra
//     arrangørpuljeordningen" (-548.940, <1% del total), no se separó por
//     ser inmaterial.
//
// CATEGORIZACIÓN DE GASTOS:
//   - "Vareforbrug" (-32.365.378) -> other_expenses. Nota de política
//     contable (pág. 43): "Vareforbrug omfatter årets vareforbrug... samt
//     lejeomkostninger på lejede spillere" = incluye TANTO costo de
//     mercadería como costos de alquiler/préstamo de jugadores cedidos a
//     préstamo, mezclados sin separar montos — mismo criterio que
//     "Vareforbrug" de FCK (other_expenses), aproximación documentada, no
//     una certeza (pregunta anotada en Admin/dudas-por-club.md: qué
//     proporción es mercadería vs. cesiones de jugadores).
//   - "Andre eksterne omkostninger" (-7.242.746) -> admin_general_expense.
//     Nota: "comprise selling costs, vehicle expenses, cost of premises and
//     administrative expenses as well as other capacity costs, including bad
//     debts" — mismo criterio que FCK/Anderlecht.
//   - "Personaleomkostninger" (-52.095.551) -> wages_squad, la cifra
//     completa (entidad 100% fútbol profesional, sin polideportivo/colegio,
//     sin desglose por departamento — 88 empleados promedio, "Væsentligste
//     aktiviteter: at drive professionel fodbold og anden hermed beslægtet
//     virksomhed"). Note 2 SÍ desglosa el rubro en 4 sub-ítems (Lønninger,
//     Pensioner, Andre omkostninger til social sikring, Andre
//     personaleomkostninger) que suman exacto el total — se cargó como
//     `items` (transparencia, mismo `normalizedCategory`, no se promueven
//     porque las 4 son la misma categoría, ver club-data-mapping sección 1).
//   - "Af- og nedskrivninger af immaterielle og materielle anlægsaktiver"
//     (-12.059.367, una sola línea en el Resultatopgørelse) -> PROMOVIDA a
//     2 líneas usando el desglose real de Note 5 (Immaterielle
//     anlægsaktiver = "Erhvervede rettigheder", el activo intangible que
//     representa los pases de jugadores) y Note 6 (Materielle
//     anlægsaktiver, bienes de uso tangibles), mismo criterio que FCK:
//       Note 5, "Afskrivninger i året" (amortización del año sobre pases,
//       SIN incluir la línea de "Tilbageførsel af af- og nedskrivninger på
//       afhændede aktiver" +4.043.742, que es un ajuste de reconciliación
//       del rollforward de balance por activos DADOS DE BAJA/vendidos en el
//       año, no un ingreso ni una reversión que pase por el resultado del
//       ejercicio) -> player_amortisation, -9.911.410.
//       Note 6, suma de "Afskrivninger i året" de las 3 categorías de bien
//       de uso (Grunde og bygninger -10.732, Indretning af lejede lokaler
//       -1.183.333, Andre anlæg/driftsmateriel og inventar -953.892) ->
//       depreciation, -2.147.957 total, con `items` para las 3.
//     Verificado: -9.911.410 + -2.147.957 = -12.059.367, EXACTO igual a la
//     línea impresa del Resultatopgørelse. No hay "Nedskrivninger"
//     (deterioro) separado este ejercicio, así que no se cargó
//     player_impairment.
//   - "Andre driftsomkostninger" (-1.263.649) -> other_expenses. La nota de
//     política contable (pág. 42) agrupa conceptualmente "andre
//     driftsindtægter- OG omkostninger" (ambos títulos, ingreso Y gasto)
//     bajo la misma definición de resultado de transferencias + venta de
//     activos, pero es una línea chica (1,2% de los gastos totales) sin
//     monto propio identificable para separar con confianza qué parte es
//     transfer y qué parte es otra cosa — se dejó en el catch-all
//     conservador en vez de forzar player_amortisation/player_sales sin
//     certeza (mismo criterio de "no forzar una separación que el dato no
//     permite" de club-data-mapping).
//
// RESULTADOS FINANCIEROS (netInterest, fiscalYearMeta, NUNCA como línea):
//   "Indtægter af andre kapitalandele, værdipapirer og tilgodehavender, der
//   er anlægsaktiver" (100.180) + "Andre finansielle indtægter" (1.457.294)
//   - "Andre finansielle omkostninger" (-42.681) = netInterest 1.514.793.
//
// IMPUESTO: "Skat af årets resultat" -6.420.082 (Note 3: aktuel skat
// 5.973.066 + regulering af udskudt skat 447.016 = 6.420.082).
//
// GROSSDEBT/CASH (Balance, pág. 25): grossDebt = "Gældsforpligtelser i alt"
// (Total payables, 29.385.639 = Langfristede 796.625 + Kortfristede
// 28.589.014), EXCLUYENDO "Egenkapital i alt" (108.439.219, patrimonio) y
// "Hensatte forpligtelser i alt" (398.301, provisión por impuesto diferido)
// — mismo criterio de Boca/FCK/Anderlecht (línea de "deudas" angosta cuando
// el balance la separa de previsiones). cash = "Likvide beholdninger"
// 30.026.932. Verificado: 108.439.219 + 398.301 + 29.385.639 = 138.223.159 =
// Aktiver i alt (Total assets).
//
// FX — el documento NO declara ningún tipo de cambio propio (entidad 100%
// doméstica en DKK, sin Anexo de moneda extranjera ni activos/pasivos en
// USD/EUR). Cotización de referencia BCE (European Central Bank, SDMX API
// data-api.ecb.europa.eu/service/data/EXR/D.<CCY>.EUR.SP00.A) del viernes
// 28/6/2024 (30/6 es domingo, sin cotización; mismo criterio que ya usa el
// sitio para 'DKK@2019-06-30'):
//     EUR/DKK cierre 28/6/2024 = 7,4575
//     EUR/USD cierre 28/6/2024 = 1,0705
//     DKK por 1 USD = 7,4575 / 1,0705 = 6,96637 ≈ 6,9664
// Mismo método que ya usa el sitio para las entradas DKK existentes de
// FX_CLOSE (cruzar DKK/EUR × EUR/USD) — promovida a 'DKK@2024-06-30' en
// FX_CLOSE (data/currency-map.js) en la integración de esta misma sesión,
// `fxSource:'market_close'` (no fue una aproximación, es un cierre BCE
// puntual, solo quedó fuera de FX_CLOSE mientras el agente que lo cargó no
// podía tocar ese archivo compartido).
//
// VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
//   revenueLines suman 132.695.911 (75.989.957 Nettoomsætning + 56.705.954
//   Andre driftsindtægter) = officialTotalRevenue.
//   expenseLines suman -105.026.691 (-32.365.378 Vareforbrug + -7.242.746
//   Andre eksterne omkostninger + -52.095.551 Personaleomkostninger +
//   -9.911.410 player_amortisation + -2.147.957 depreciation + -1.263.649
//   Andre driftsomkostninger) = officialTotalExpenses.
//   132.695.911 - 105.026.691 = 27.669.220, EXACTO igual al "Resultat af
//   primær drift" (Operating profit) impreso.
//   27.669.220 + netInterest(1.514.793) = 29.184.013, EXACTO igual a
//   "Resultat før skat" (Profit before tax) impreso.
//   29.184.013 + tax(-6.420.082) = 22.763.931, EXACTO igual a "Årets
//   resultat" (officialPAT) impreso. Cierre perfecto en tres pasos, cada uno
//   contra un subtotal impreso del documento.
//
// GESTIÓN: no hay concepto de "presidencia"/continuidad de gestión aplicable
// a esta S.A. danesa (Bestyrelse/Board of Directors con Kim Nielsen como
// formand/chairman, sin indicio de que el sitio deba tratar esto como una
// "gestión" al estilo argentino) -> gestionId: null, sin entrada en
// gestionesByClub (mismo criterio que fckobenhavn-dk/anderlecht-be).
// ============================================================================

const viborgdkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Nettoomsætning (recaudación de entradas, TV y comercial combinados, sin desglose numérico en la fuente)', normalizedCategory:'lump_football_operations', amountNative:75.989957, disclosureLevel:'aggregated' },
    { rawLabel:'Andre driftsindtægter (resultado neto de transferencias — ingresos de transfer menos costos de transfer — más ganancia/pérdida neta por venta de activos fijos; venta de Anton Gaaei, Elias Achouri, Alassana Jatta, Jacob Friis, entre otros)', normalizedCategory:'player_sales', amountNative:56.705954, disclosureLevel:'aggregated' },
  ],
};

const viborgdkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Vareforbrug (costo de mercadería + costos de cesión/préstamo de jugadores, mezclados sin separar)', normalizedCategory:'other_expenses', amountNative:-32.365378, disclosureLevel:'aggregated' },
    { rawLabel:'Andre eksterne omkostninger (ventas, vehículos, locales, administración, deudores incobrables)', normalizedCategory:'admin_general_expense', amountNative:-7.242746, disclosureLevel:'aggregated' },
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-52.095551, disclosureLevel:'detailed', items:[
      ['Lønninger', 44.094465], ['Pensioner', 4.048080], ['Andre omkostninger til social sikring', 0.300549], ['Andre personaleomkostninger', 3.652457],
    ]},
    { rawLabel:'Afskrivninger af erhvervede rettigheder (amortización de pases, Note 5)', normalizedCategory:'player_amortisation', amountNative:-9.911410, disclosureLevel:'detailed' },
    { rawLabel:'Afskrivninger på materielle anlægsaktiver (bienes de uso: terrenos/edificios, mejoras a locales alquilados, equipamiento, Note 6)', normalizedCategory:'depreciation', amountNative:-2.147957, disclosureLevel:'detailed', items:[
      ['Afskrivning på grunde og bygninger', 0.010732], ['Afskrivning på indretning af lejede lokaler', 1.183333], ['Afskrivning på andre anlæg, driftsmateriel og inventar', 0.953892],
    ]},
    { rawLabel:'Andre driftsomkostninger (sin monto propio identificable para separar de other_expenses)', normalizedCategory:'other_expenses', amountNative:-1.263649, disclosureLevel:'aggregated' },
  ],
};

const viborgdkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-06-30', // promovido a FX_CLOSE en la integración (data/currency-map.js), ver comentario de cabecera para el cálculo
    sourceId:'viborg-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:1.514793, // 0.100180 (indtægter kapitalandele) + 1.457294 (andre fin. indtægter) - 0.042681 (andre fin. omk.)
    tax:-6.420082,
    profitOnPlayerSales:0, assetSales:0, // el resultado por venta de pases YA está en revenueLines (Andre driftsindtægter)
    grossDebt:29.385639, cash:30.026932,
    officialTotalRevenue:132.695911, officialTotalExpenses:105.026691, officialPAT:22.763931,
  },
};

const viborgdkPresupuestoOverlayByYear = {};

const viborgdkPasesData = [];
const viborgdkResultadosData = {};
const viborgdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['viborg-dk'] = {
  revenueLinesByYear: viborgdkRevenueLinesByYear, expenseLinesByYear: viborgdkExpenseLinesByYear,
  fiscalYearMeta: viborgdkFiscalYearMeta, pasesData: viborgdkPasesData,
  resultadosData: viborgdkResultadosData, titulosData: viborgdkTitulosData,
  presupuestoOverlayByYear: viborgdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'viborg-aarsrapport-2024': {
      id:'viborg-aarsrapport-2024', clubId:'viborg-dk',
      title:'Viborg F.F. Prof. Fodbold A/S — Årsrapport for regnskabsåret 01.07.23 - 30.06.24',
      type:'official_balance_sheet', reliability:'primary',
      note:'Auditado por Beierholm (Statsautoriseret Revisionspartnerselskab), sin salvedades. CVR 83 07 37 13. Tipo de cambio DKK/USD del cierre (6,9664) es una aproximación de mercado (cruce BCE EUR/DKK × EUR/USD del 28/6/2024, viernes hábil más cercano al 30/6), no declarada por el propio documento ni centralizada todavía en FX_CLOSE. Transcripción completa en "Clubes/Dinamarca/Viborg FF/aarsrapport-2024-06-30.md".',
    },
});

memberCountByClub['viborg-dk'] = null;
