// ============================================================================
// data/fredericia-dk-data.js — Fodbold Club Fredericia 1991 ApS (Dinamarca),
// clubId 'fredericia-dk'. Uno de 3 clubes belgas + 1 danés cargados en esta
// sesión (2da tanda de onboarding, 20 transcripts más, 4 clubes totalmente
// nuevos).
//
// EJERCICIO CARGADO: 2019 (1/1/2019-31/12/2019), NO 2024 como sugería la
// tarea original. Motivo, documentado explícito porque es una desviación del
// archivo asignado (`aarsrapport-2024-12-31.md`):
//   El aarsrapport 2024 (y todos los de 2020 en adelante, confirmado con
//   grep sobre los .md ya transcriptos de 2020-2023) reporta la
//   Resultatopgørelse desde "Bruttofortjeneste" (Ganancia Bruta) hacia abajo,
//   SIN desglosar "Nettoomsætning" (Revenue bruto) en ningún lado del
//   documento — una exoneración legal danesa (årsregnskabsloven § 32) para
//   sociedades chicas, que protege el detalle comercial pero le impide a
//   este sitio separar Revenue real de Cost of Sales/gastos externos ya
//   netos entre sí. MISMO CRITERIO YA ESTABLECIDO en
//   `data/midtjylland-dk-data.js` (ver su comentario de cabecera): ante este
//   problema, se elige un ejercicio distinto del mismo club que SÍ desglose
//   Nettoomsætning, en vez de forzar "Bruttofortjeneste" como si fuera
//   Revenue bruto (lo que subestimaría Revenue Y Gastos por igual, ocultando
//   gastos externos reales dentro de un margen ya neteado). Se revisaron los
//   .md ya transcriptos de años anteriores (2012-2019) y 2019 es el más
//   RECIENTE que todavía desglosa Nettoomsætning como línea propia de la
//   Resultatopgørelse (2020 en adelante ya usa el formato Bruttofortjeneste).
//   PENDIENTE PARA QUIEN INTEGRE: si Guido prefiere el ejercicio 2024 pese a
//   esta limitación (por ejemplo, cargando solo lo que el documento SÍ
//   permite separar, con Revenue en null), avisar — no se cargó así por
//   default porque hubiera significado inventar una separación que el
//   documento no ofrece.
//
// FUENTE: `Clubes/Dinamarca/FC Fredericia/aarsrapport-2019-12-31.md`. PDF con
// capa de texto nativa (small-company Klasse B, formato compacto, auditor
// PwC). CVR-nr. 27 26 34 96.
//
// INGRESOS (Resultatopgørelse pág. 10, DKK):
//   Nettoomsætning — la política contable del propio documento (pág. 13,
//     "Nettoomsætning") dice explícito: "Nettoomsætningen omfatter
//     sponsorater, entreindtægter, cafeteriaoverskud, transferindtægter,
//     TV-aftaler og DBU-indtægter" (sponsors+entradas+cafetería+
//     transferencias+TV+ingresos DBU/federación, todo combinado, sin monto
//     individual por concepto en ningún lado del documento)  13.783959 → lump_football_operations
// Total revenueLines: 13.783959, exacto contra "Nettoomsætning" impreso.
//
// GASTOS (Resultatopgørelse pág. 10):
//   Omkostninger til råvarer og hjælpematerialer (costo de materiales/
//     mercadería, ej. cafetería/merchandising)                   -0.427011 → other_expenses
//   Andre eksterne omkostninger (política contable pág. 13: "omkostninger
//     til lokaler, salg samt kontorhold m.v." — instalaciones, ventas,
//     administración de oficina; sin más desglose disponible en el
//     documento, posiblemente incluye también gastos de organización de
//     partidos y otros costos operativos no separados)            -4.686890 → other_expenses
//   Personaleomkostninger (todo el personal de la sociedad, sin separar
//     plantel profesional de resto — mismo criterio que los belgas de esta
//     sesión)                                                     -9.875023 → wages_squad
//   Af- og nedskrivninger af materielle anlægsaktiver (solo activos
//     tangibles — "Andre anlæg, driftsmateriel og inventar"; el club NO
//     capitaliza derechos de jugadores como intangible bajo este régimen
//     contable, según la política de "Periodeafgrænsningsposter" del
//     aarsrapport 2024 los contratos de jugadores se tratan como gasto
//     anticipado/prepago amortizado linealmente, probablemente dentro de
//     "Andre eksterne omkostninger" arriba, sin línea propia)      -0.039377 → depreciation
// Total expenseLines: -15.028301, exacto contra la suma de los 4 renglones
//   impresos (0.427011+4.686890+9.875023+0.039377).
//
// RESULTADO FINANCIERO (netInterest): solo "Finansielle omkostninger"
//   (-0.149297) este ejercicio, sin "Finansielle indtægter" (0) → netInterest
//   = -0.149297.
//
// TAX: "Skat af årets resultat" = 0 (ambos ejercicios, 2019 y 2018 — la
//   sociedad no tributó, probablemente por pérdidas acumuladas/créditos
//   fiscales) → tax = 0.
//
// TIE-OUT (verificado exacto contra los subtotales impresos, pág. 10):
//   Nettoomsætning 13.783959 - (0.427011+4.686890) = Bruttoresultat 8.670058
//   (exacto). 8.670058 - Personaleomkostninger(9.875023) = Resultat før
//   afskrivninger -1.204965 (exacto). -1.204965 - Af-/nedskrivninger
//   (0.039377) = Resultat før finansielle poster -1.244342 (exacto).
//   -1.244342 + netInterest(-0.149297) = Resultat før skat -1.393639
//   (exacto) = Årets resultat (tax=0) → officialPAT.
//
// MONEDA: DKK. Este ejercicio (cierre 31/12/2019) NO tiene entrada en
// `FX_CLOSE` (`data/currency-map.js` solo tiene 'DKK@2019-06-30',
// 'DKK@2020-12-31' y años posteriores) — como esta sesión tiene prohibido
// tocar `data/currency-map.js`, se usa un `fx` LITERAL en este archivo con
// `fxSource:'market_close'` (no `fxRef`), en vez de la forma preferida
// (agregar la entrada compartida). PENDIENTE PARA QUIEN INTEGRE: mover este
// valor a `FX_CLOSE` como 'DKK@2019-12-31' es lo correcto a mediano plazo
// (ver `club-data-mapping` sección 5, "si la moneda y fecha que necesitás no
// está en FX_CLOSE, agregala ahí, no en el archivo del club"). Cálculo:
// cruce DKK/EUR (7,4715, cierre BCE 31/12/2019) ÷ EUR/USD (1,1234, cierre
// BCE 31/12/2019) = 6,6508 (1 DKK ≈ 0,1504 USD). Fuentes: ECB Euro foreign
// exchange reference rates, 31 December 2019 (ecb.europa.eu) y Euro exchange
// rates (2020/C 1/02), Diario Oficial de la UE (eur-lex.europa.eu).
//
// grossDebt: Langfristet gæld (2.261395) + Kortfristet gæld (3.020892) =
//   5.282287, EXCLUYENDO "Periodeafgrænsningsposter" (0.376953, ingresos
//   diferidos/gastos a pagar, parte de la Kortfristet gæld impresa) — mismo
//   criterio de exclusión que los belgas de esta sesión. grossDebt =
//   5.282287-0.376953 = 4.905334. cash: "Likvide beholdninger" (1.182138).
//   Total activa = Total pasiva = 2.363181 (balance cuadra, pág. 11-12).
//   Patrimonio neto (Egenkapital) NEGATIVO este ejercicio (-2.919106), con
//   nota de "Going concern" (pág. 14): la sociedad recibió DKK 2,0 M de
//   capital de préstamo subordinado ("ansvarlig lånekapital") en 2019 para
//   sostener la liquidez, y el presupuesto 2020/2021 proyectaba
//   superávits chicos (TDKK 47 y 332).
//
// LIGA: el propio ledelsesberetning (pág. 8) dice que el club jugó "Nordic
// Bet Ligaen 2018/19" (la 1. Division, SEGUNDA categoría danesa, no
// Superliga) — terminó 6° esa temporada. FC Fredericia recién ascendió a
// Superliga para la temporada 2025/26 (confirmado en da.wikipedia.org:
// "Klubben spiller i Superligaen fra sæsonen 2025/2026"), muy posterior a
// este ejercicio. No hay entrada de 2da división danesa en
// `data/leagues.js` (solo existe 'dk-superliga') — no agregar este club a
// `data/club-leagues/dk.js` con 'dk-superliga', sería incorrecto.
//
// GESTIÓN: Selskabsoplysninger (pág. 7) lista a "Morten Rahbek Hansen,
// formand" (presidente) para este ejercicio — a diferencia de los belgas de
// esta sesión, acá el título SÍ está explícito y sin ambigüedad.
// ============================================================================

const fredericiadkRevenueLinesByYear = {
  2019: [
    { rawLabel:'Nettoomsætning', normalizedCategory:'lump_football_operations', amountNative:13.783959, disclosureLevel:'aggregated' },
  ],
};

const fredericiadkExpenseLinesByYear = {
  2019: [
    { rawLabel:'Omkostninger til råvarer og hjælpematerialer', normalizedCategory:'other_expenses', amountNative:-0.427011, disclosureLevel:'aggregated' },
    { rawLabel:'Andre eksterne omkostninger', normalizedCategory:'other_expenses', amountNative:-4.686890, disclosureLevel:'aggregated' },
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-9.875023, disclosureLevel:'aggregated' },
    { rawLabel:'Af- og nedskrivninger af materielle anlægsaktiver', normalizedCategory:'depreciation', amountNative:-0.039377, disclosureLevel:'aggregated' },
  ],
};

const fredericiadkFiscalYearMeta = {
  2019: {
    currency:'DKK',
    // Literal, NO está en FX_CLOSE todavía (ver comentario de cabecera): cruce DKK/EUR
    // (7,4715) ÷ EUR/USD (1,1234), cierres BCE al 31/12/2019.
    fxRef:'DKK@2019-12-31', // promovido a FX_CLOSE en la integración (data/currency-map.js)
    sourceId:'fredericia-dk-aarsrapport-2019',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-0.149297,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Langfristet gæld + Kortfristet gæld, EXCLUYE Periodeafgrænsningsposter.
    // cash = Likvide beholdninger.
    grossDebt:4.905334, cash:1.182138,
    officialTotalRevenue:13.783959, officialTotalExpenses:15.028301, officialPAT:-1.393639,
  },
};

const fredericiadkPresupuestoOverlayByYear = {};

const fredericiadkPasesData = [];
const fredericiadkResultadosData = {};
const fredericiadkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fredericia-dk'] = {
  revenueLinesByYear: fredericiadkRevenueLinesByYear, expenseLinesByYear: fredericiadkExpenseLinesByYear,
  fiscalYearMeta: fredericiadkFiscalYearMeta, pasesData: fredericiadkPasesData,
  resultadosData: fredericiadkResultadosData, titulosData: fredericiadkTitulosData,
  presupuestoOverlayByYear: fredericiadkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fredericia-dk-aarsrapport-2019': {
    id:'fredericia-dk-aarsrapport-2019', clubId:'fredericia-dk',
    title:'Fodbold Club Fredericia 1991 ApS — Årsrapport 2019 (1.1.2019-31.12.2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Depositado en Erhvervsstyrelsen (registro mercantil danés). Auditor: PricewaterhouseCoopers, sin salvedades. Transcripción completa en Clubes/Dinamarca/FC Fredericia/aarsrapport-2019-12-31.md. Se eligió este ejercicio (no el 2024 originalmente sugerido) porque los ejercicios 2020 en adelante reportan desde "Bruttofortjeneste" sin desglosar Nettoomsætning — ver comentario de cabecera de data/fredericia-dk-data.js. El club jugó en la 1. Division (2da categoría danesa, "Nordic Bet Ligaen" ese año), no en Superliga; recién ascendió a Superliga para la temporada 2025/26. Patrimonio neto negativo al cierre, con nota de going concern resuelta con un préstamo subordinado de DKK 2,0 M recibido en el propio ejercicio.',
  },
});

gestionesByClub['fredericia-dk'] = {
  actual: { nombre:'Morten Rahbek Hansen (formand)', firstYear:2019, lastYear:2019 },
};

memberCountByClub['fredericia-dk'] = null;
