// ============================================================================
// data/mechelen-be-data.js — Yellow-Red KV Mechelen (Bélgica). Uno de 4 clubes
// belgas cargados en este batch en paralelo (Club Brugge, Anderlecht, Genk,
// Gent/otros ya existentes en el sitio; Mechelen es un país YA onboardeado,
// club nuevo dentro de Bélgica).
//
// FUENTE: `Clubes/Bélgica/Mechelen/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
// 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto nativa (verificado
// con pdftotext -layout).
//
// FORMATO DEL DOCUMENTO: jaarrekening estatutario belga, esquema "VOL-kap"
// (NV/sociedad anónima), igual formato que Anderlecht. Nombre legal en la
// carátula: "YELLOW-RED KV MECHELEN" (yellow mencionado primero, dato
// relevante para brandColor más abajo).
//
// INGRESOS (Resultatenrekening pág. 8, códigos NBB, EUR):
//   Omzet (turnover) — Nota 6.10 "Uitsplitsing per bedrijfscategorie/
//     geografische markt" presente pero SIN valores cargados (mismo caso que
//     Anderlecht: el club optó por no divulgar el desglose)     20.890688 → lump_football_operations
//   Andere bedrijfsopbrengsten — Nota 6.10 solo completa UN sub-ítem
//     ("Exploitatiesubsidies en vanwege de overheid ontvangen compenserende
//     bedragen", código 740, subsidios/compensaciones del Estado), el resto
//     de la nota queda en blanco:
//     - Exploitatiesubsidies (740, disclosed)                     4.059643 → other_income
//     - Resto sin desglosar (12.595743 - 4.059643): el Jaarverslag
//       (verslag van de Raad van Toezicht, pág. 43) atribuye la mejora del
//       resultado del ejercicio "vooral" a "gerealiseerde netto
//       transferresultaten welke circa 4,8 mio EUR hoger zijn" — no hay una
//       línea "Meerwaarde bij overdracht van spelersregistratierechten"
//       separada como en Club Brugge/Anderlecht (acá el resultado de pases
//       parece ir neto dentro de Andere bedrijfsopbrengsten), así que el
//       residuo se categoriza como resultado de venta de jugadores,
//       aproximación documentada, no una certeza (ver PREGUNTA ABIERTA)  8.536100 → player_sales
//   Niet-recurrente bedrijfsopbrengsten: 0 (no se carga línea)
// Total: 20.890688+4.059643+8.536100 = 33.486431 vs 33.486.431 impreso (Bedrijfsopbrengsten, exacto).
//
// PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): confirmar con el
// club qué compone el residuo de "Andere bedrijfsopbrengsten" sin desglosar
// (8.536.100 EUR) — si es 100% resultado neto de transferencias o incluye
// otros conceptos (recupero de bedrijfsvoorheffing, indemnizaciones, etc.,
// como en Anderlecht).
//
// GASTOS (Resultatenrekening pág. 8-9 + notas 6.2.3/6.3.1-6.3.5 pág. 11-15):
//   Handelsgoederen, grond- en hulpstoffen (Aankopen 2.774757 - variación
//     de stock -0.046213)                                       -2.728544 → other_expenses
//   Diensten en diverse goederen (sin más desglose disponible)  -10.728110 → other_expenses
//   Bezoldigingen, sociale lasten en pensioenen (Nota 6.10: todo el
//     personal de la sociedad, 168 empleados/155,2 FTE, sin separar plantel
//     de resto — mismo criterio que Anderlecht)                -17.739750 → wages_squad
//     items: Bezoldigingen y ventajas sociales directas 14.591188 +
//       Contribuciones patronales seg. social 2.482892 + Otros costos de
//       personal 0.665670
//   Afschrijvingen (código 630, total P&L 2.639622) — PROMOVIDO a 2 líneas
//     según el detalle de movimientos de activos fijos (Notas 6.2.3
//     "Concessies, octrooien, licenties... " = activo intangible que en un
//     club de fútbol belga aloja los derechos de inscripción de jugadores, y
//     6.3.1-6.3.5, materiële vaste activa = terrenos/edificios/instalaciones/
//     mobiliario/otros). Es el mismo criterio de "sub-ítems con categoría
//     real distinta se promueven" de club-data-mapping SKILL.md sección 1,
//     acá aplicado sobre la nota de activo fijo en vez de sobre el P&L
//     directamente, porque el P&L no discrimina esto y la nota sí:
//     - Amortización activo intangible (jugadores), Nota 6.2.3
//       "Geboekt" 1.112255                                       -1.112255 → player_amortisation
//     - Depreciación activo material (edificios+instalaciones+mobiliario+
//       otros), Notas 6.3.1/6.3.2/6.3.3/6.3.5 "Geboekt" sumados
//       (0.044729+0.209039+0.194897+1.078702=1.527367)            -1.527367 → depreciation
//       items: Terrenos y edificios 0.044729 + Instalaciones/máquinas
//       0.209039 + Mobiliario/rodante 0.194897 + Otros activos materiales
//       1.078702
//     Suma 1.112255+1.527367 = 2.639622, EXACTO contra el total impreso.
//   Andere bedrijfskosten (código 640/8, total P&L 0.604834) — PROMOVIDO a 2
//     líneas según Nota 6.10 (confirmado con pdftotext -layout, la columna
//     "Boekjaar" quedaba desalineada en la transcripción con pdftotext -layout
//     sin flags de página; se re-verificó línea por línea contra la página 24
//     del PDF):
//     - Bedrijfsbelastingen en -taksen (impuestos/tasas empresariales,
//       mismo criterio que club-data-mapping sección 17: impuestos SIEMPRE
//       admin_general_expense)                                   -0.499055 → admin_general_expense
//     - Andere (sin más desglose)                                -0.105779 → other_expenses
//     Suma 0.499055+0.105779 = 0.604834, EXACTO contra el total impreso.
//   Waardeverminderingen op voorraden (631/4): 0 — no se carga línea.
//   Voorzieningen (635/8): 0 — no se carga línea.
//   Niet-recurrente bedrijfskosten (66A): 0 — no se carga línea.
// Total propio: 2.728544+10.728110+17.739750+1.112255+1.527367+0.499055+0.105779
//   = 34.440860 vs 34.440.862 impreso (Bedrijfskosten) — diferencia de EUR 2,
//   redondeo del propio documento (se usa el total impreso en
//   officialTotalExpenses, no la suma propia).
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten 0.012922 -
// Financiële kosten 1.453720 = -1.440798 (pág. 9, códigos 75/76B y 65/66B).
//
// TAX: Belastingen op het resultaat (código 67/77) 0.358728, impreso como
// costo → tax:-0.358728.
//
// TIE-OUT (verificado con los subtotales IMPRESOS del documento, pág. 8-9):
// Bedrijfsopbrengsten 33.486431 - Bedrijfskosten 34.440862 = Bedrijfswinst
// -0.954431 (impreso -954.431, exacto). -0.954431 + netInterest(-1.440798) =
// -2.395229 = "Winst voor belasting" impreso (-2.395.229, exacto). -2.395229 -
// tax(0.358728) = -2.753957 = "Winst (Verlies) van het boekjaar" / "Te
// bestemmen winst (verlies)" impreso (-2.753.957, exacto) → officialPAT.
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE, 0,8532).
//
// grossDebt: "Schulden op meer dan één jaar" (17.456974) + "Schulden op ten
// hoogste één jaar" (10.498826) = 27.955800, EXCLUYENDO "Overlopende
// rekeningen" (4.087372, ingresos diferidos/gastos a pagar, es una 3ra
// sub-categoría separada dentro de SCHULDEN en este balance) — mismo criterio
// que Anderlecht/Köln/Boca. No hay línea de "Voorzieningen" en este balance
// (código 16 en blanco, sección VOORZIENINGEN EN UITGESTELDE BELASTINGEN
// vacía). cash: "Liquide middelen" (3.134613). Total activa = Total pasiva =
// 41.691869 (balance cuadra).
//
// CONTEXTO DE SOLVENCIA (no afecta la carga de datos, documentado porque es
// relevante para leer el balance): el Jaarverslag (pág. 43-46) describe que
// el 25/9/2024 se activó el "alarmbelprocedure" (procedimiento de alarma del
// art. 7:228 del código de sociedades belga, activo neto caído por debajo de
// la mitad del capital) y que se tomaron medidas de saneamiento (aumento de
// capital de ~17M EUR vía conversión de préstamos de accionistas — Parmon
// International AG, Saffelberg Investments, Edwin De Reys — más un nuevo
// préstamo de Parmon de 2.480.000 EUR). El patrimonio neto pasó de
// -4.597.636 a 9.648.697 EUR gracias a esa capitalización, pese a la pérdida
// del ejercicio.
//
// GESTIÓN: el board (Raad van Toezicht: De Reys Edwin, Van Esch Philippus,
// Leemans Luc, todos "Bestuurder" desde 27/2/2023) no tiene un "Voorzitter"
// explícito identificado en el documento, y el accionista de referencia
// (Parmon International AG) no se declara como controlante único con fecha
// de inicio confirmada dentro de este ejercicio puntual → gestionId: null,
// sin entrada en gestionesByClub (ver skill sección 7 y sección 16: ya no es
// obligatorio inventar una entrada solo por robustez técnica).
// ============================================================================

const mechelenBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:20.890688, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen', normalizedCategory:'other_income', amountNative:4.059643, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfsopbrengsten — resto sin desglosar (probablemente resultado neto de transferencias, según jaarverslag)', normalizedCategory:'player_sales', amountNative:8.536100, disclosureLevel:'aggregated' },
  ],
};

const mechelenBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-2.728544, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-10.728110, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-17.739750, disclosureLevel:'detailed', items:[
      ['Bezoldigingen en rechtstreekse sociale voordelen', 14.591188], ['Werkgeversbijdragen voor sociale verzekeringen', 2.482892], ['Andere personeelskosten', 0.665670],
    ]},
    { rawLabel:'Afschrijvingen op immateriële vaste activa (spelersregistratierechten)', normalizedCategory:'player_amortisation', amountNative:-1.112255, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-1.527367, disclosureLevel:'detailed', items:[
      ['Terreinen en gebouwen', 0.044729], ['Installaties, machines en uitrusting', 0.209039], ['Meubilair en rollend materieel', 0.194897], ['Overige materiële vaste activa', 1.078702],
    ]},
    { rawLabel:'Andere bedrijfskosten — Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.499055, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfskosten — Andere', normalizedCategory:'other_expenses', amountNative:-0.105779, disclosureLevel:'detailed' },
  ],
};

const mechelenBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'mechelen-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Financiële opbrengsten (0.012922) - Financiële kosten (1.453720).
    netInterest:-1.440798,
    // Belastingen op het resultaat.
    tax:-0.358728,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden op meer dan één jaar + Schulden op ten hoogste één jaar, EXCLUYE
    // Overlopende rekeningen (ingresos diferidos/gastos a pagar). cash = Liquide middelen.
    grossDebt:27.955800, cash:3.134613,
    officialTotalRevenue:33.486431, officialTotalExpenses:34.440862, officialPAT:-2.753957,
  },
};

const mechelenBePresupuestoOverlayByYear = {};

const mechelenBePasesData = [];
const mechelenBeResultadosData = {};
const mechelenBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['mechelen-be'] = {
  revenueLinesByYear: mechelenBeRevenueLinesByYear, expenseLinesByYear: mechelenBeExpenseLinesByYear,
  fiscalYearMeta: mechelenBeFiscalYearMeta, pasesData: mechelenBePasesData,
  resultadosData: mechelenBeResultadosData, titulosData: mechelenBeTitulosData,
  presupuestoOverlayByYear: mechelenBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'mechelen-be-jaarrekening-2025': {
    id:'mechelen-be-jaarrekening-2025', clubId:'mechelen-be',
    title:'Jaarrekening van Yellow-Red KV Mechelen NV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Mechelen/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet por categoría/mercado geográfico) no fue completada por el club en este filing; "Andere bedrijfsopbrengsten" solo desglosa el componente de subsidios estatales, el resto queda sin especificar (ver comentario de cabecera del archivo de datos). El ejercicio incluyó un procedimiento de "alarmbelprocedure" (activo neto por debajo de la mitad del capital) resuelto con un aumento de capital de ~17M EUR vía conversión de préstamos de accionistas.',
  },
});

memberCountByClub['mechelen-be'] = null;
