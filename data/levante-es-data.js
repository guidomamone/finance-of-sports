// ============================================================================
// data/levante-es-data.js — Levante Unión Deportiva, S.A.D. y Sociedades Dependientes (clubId
// 'levante-es'), Ejercicio 2024/25 único (1/7/2024 a 30/6/2025, confirmado en la carátula: "EJERCICIO
// TERMINADO EL 30 DE JUNIO 2025"). Es el único ejercicio con transcripción disponible para este club.
//
// ENTIDAD: cuentas CONSOLIDADAS del grupo ("Levante Unión Deportiva, S.A.D. Y Sociedades
// Dependientes": Levante UD S.A.D. + Levante UD Nuevos Desarrollos, S.L.U. + Linkshow, S.L.U.), no
// las individuales de la S.A.D. sola.
//
// Fuente: transcripción completa en Clubes/España/Levante UD/cuentas-anuales-consolidadas-2024-
// 2025.md.
//
// ============================================================================
// OJO LIGA — HALLAZGO GENUINO DE ESTA SESIÓN, NO ANTICIPADO POR EL PEDIDO ORIGINAL (que solo
// marcaba a Sunderland como caso a revisar): Levante jugó la temporada 2024/25 en SEGUNDA DIVISIÓN,
// NO en LaLiga. La propia memoria consolidada (Nota de activos por impuesto diferido, pág. 56) lo
// dice al fundamentar por qué se reconoce el crédito fiscal: "tras el ascenso a Primera División, un
// incremento significativo de los ingresos recurrentes" para el "plan de negocio... para la
// temporada 2025-26" — o sea, el ascenso a Primera fue el RESULTADO del ejercicio 2024/25 (playoff de
// junio de 2025), para jugarse recién en 2025/26. Además, la Nota de Inmovilizado Intangible lista
// altas de jugadores con "Importe variable desembolsado por ascenso a Primera División" dentro del
// propio ejercicio 2024/25, confirmando que el ascenso se pagó/gatilló DURANTE este ejercicio, no
// antes. Se cargó `es-segunda` en data/club-leagues/es.js para 2025, NO `es-laliga` — mismo patrón
// exacto que Sunderland en Inglaterra (ascenso vía playoff al FINAL del ejercicio cargado, para la
// temporada SIGUIENTE). Documentado también en fuentes/España/Levante UD.md.
// ============================================================================
//
// Cifras originales en MILES de euros (formato español, "Datos expresados en miles de euros"),
// divididas por 1.000 al cargar (quedan en MILLONES de EUR, mismo criterio que el resto de los
// clubes españoles). `fxRef:'EUR@2025-06-30'` (ya en FX_CLOSE) porque el documento no declara un
// tipo de cambio propio a USD (no tiene partidas materiales en moneda extranjera).
//
// CATEGORIZACIÓN DE INGRESOS (Nota 16.2 "Importe neto de la cifra de negocios", 6 líneas, suman
// EXACTO 15.129,10 miles = cifra de negocios impresa; + "Otros ingresos de explotación", 2 líneas):
//   - "Ingresos deportivos" -> competition_bonus (ingreso por participación/premios en competencias,
//     mismo criterio que "Ingresos por competiciones" de Getafe).
//   - "Ingresos por abonados y socios" -> season_tickets.
//   - "Ingresos por retransmisión" -> broadcasting.
//   - "Ingresos por comercialización" + "Ingresos por publicidad" -> sponsorship_commercial (2
//     líneas separadas, mismo criterio que Getafe/Celta).
//   - "Otros ingresos" -> other_income.
//   - "Ingresos accesorios y otros de gestión corriente" + "Subvenciones de explotación
//     incorporadas al resultado del ejercicio" -> other_income.
//
// "Deterioro y resultado por enajenaciones del inmovilizado" (12.298,96 miles, NETO POSITIVO) NO se
// cargó como revenueLine: se separó en sus 2 componentes reales (Nota a.10/pág. 38-39) y se cargaron
// en fiscalYearMeta, mismo criterio que Getafe (club-data-mapping sección 2/3, el documento lo separa
// del cuerpo principal de ingresos/gastos):
//   - "Resultado por traspaso de jugadores" (12.301,88) -> fiscalYearMeta.profitOnPlayerSales.
//   - "Resultados por enajenaciones y otras" (-2,92, inmaterial) -> fiscalYearMeta.assetSales.
//
// CATEGORIZACIÓN DE GASTOS:
//   - "Aprovisionamientos" (Consumo de material deportivo + Otros consumos + Deterioro de
//     mercaderías, suman EXACTO -1.779,61) -> other_expenses (consumo de material deportivo, sin
//     categoría específica en la taxonomía del sitio).
//   - "Sueldos, salarios asociados a la plantilla deportiva" -> wages_squad.
//   - "Otros sueldos, salarios y asimilados" -> admin_general_expense (personal no deportivo).
//   - "Cargas sociales" (-2.498,75, línea ÚNICA sin separar por sector, a diferencia de Getafe que sí
//     la separaba): APROXIMACIÓN documentada (no hay forma de separarla con precisión con lo que
//     transcribe el documento) — se prorrateó entre wages_squad/admin_general_expense en la MISMA
//     proporción que las 2 líneas de sueldo base (55,87% plantilla deportiva / 44,13% resto,
//     11.709,34 / (11.709,34+9.250,35)). Pregunta anotada en Admin/dudas-por-club.md: si Levante
//     puede separar cargas sociales por sector como sí hacen otros clubes españoles ya cargados.
//   - "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" ->
//     admin_general_expense.
//   - "Desplazamientos" -> match_organisation_expense.
//   - "Pérdidas, deterioro y variación de provisiones por operaciones comerciales" -> other_expenses
//     (provisión por incobrables, sin categoría específica).
//   - "Gastos en adquisición de jugadores" -> other_expenses (comisiones/intermediación, mismo
//     criterio que Getafe: Boca tampoco separa comisiones dentro de "Compra de jugadores").
//   - "Amortización del inmovilizado" (Nota 16.8, -2.014,21 total) se separó en sus 3 componentes
//     reales vía la Nota 4 "Inmovilizado intangible" (pág. 38, tabla "Dotación a la amortización"
//     2024/2025): "Derechos de traspaso" (jugadores, -784,32) -> player_amortisation; "Patentes,
//     licencias, marcas" + "Aplicaciones informáticas" (-42,50-47,97=-90,47) -> other_amortisation;
//     "Inmovilizado material" (Nota 5, -1.139,42) -> depreciation.
//   - "Otros resultados" (-1.322,96, este ejercicio negativo) -> other_expenses (mismo criterio que
//     Getafe: "Otros Resultados" según signo).
//
// "netInterest" = Ingresos financieros (0) − Gastos financieros (-5.672,48) + Diferencias de cambio
// (+3,40) = -5.669,08 = "RESULTADO FINANCIERO" impreso EXACTO.
//
// "tax" = +4.398,95 (CRÉDITO fiscal, activo por impuesto diferido por bases imponibles negativas
// reconocido en este ejercicio — Nota pág. 56 "El detalle de los activos por impuesto diferido
// registrados": 4.398,95 al 30.06.25, 0 al 30.06.24). Reconciliado contra la diferencia entre
// "Resultado del ejercicio antes de impuestos" (-18.594,57, Estado de Flujos de Efectivo) y
// "Resultado del ejercicio atribuido a la sociedad dominante" (-14.195,62): -18.594,57 + 4.398,95 =
// -14.195,62 EXACTO.
//
// GROSSDEBT: "Deudas a largo plazo" (39.775,79, Otros pasivos financieros) + "Deudas con empresas
// del grupo y asociadas a largo plazo" (5.016,62) + "Deudas a corto plazo" (63.304,17: Deudas con
// entidades de crédito 21.048,25 + Otros pasivos financieros 42.255,92) + "Deudas con empresas del
// grupo y asociadas a corto plazo" (13.026,93) = 121.123,51 — EXCLUYE Acreedores comerciales,
// Periodificaciones y Provisiones (mismo criterio que Boca/Getafe: solo "Deudas", no todo el pasivo).
// cash = "Efectivo y otros activos líquidos equivalentes" del balance consolidado (608,15).
//
// VERIFICACIÓN (a mano, contra los totales impresos):
//   revenueLines suman 16,27769 M = officialTotalRevenue. expenseLines suman -41,50214 M =
//   officialTotalExpenses (ambos son sumas propias para auto-chequeo, no un subtotal impreso único
//   del formato español). RESULTADO DE EXPLOTACIÓN reconciliado: revenue + expenses +
//   profitOnPlayerSales + assetSales = 16,27769 - 41,50214 + 12,30188 - 0,00292 = -12,92549 =
//   "RESULTADO DE EXPLOTACIÓN" impreso EXACTO (-12.925,49). + netInterest (-5,66908) = -18,59457 =
//   "Resultado del ejercicio antes de impuestos" EXACTO (-18.594,57, Estado de Flujos de Efectivo). +
//   tax (+4,39895) = -14,19562 = officialPAT EXACTO ("Resultado del ejercicio atribuido a la sociedad
//   dominante" impreso, -14.195,62). Cierra exacto en los 3 niveles, sin residuo.
// ============================================================================

const levanteesRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos deportivos', normalizedCategory:'competition_bonus', amountNative:1.73653, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:2.90677, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:6.59776, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización', normalizedCategory:'sponsorship_commercial', amountNative:2.47295, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1.37046, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:0.04463, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos accesorios y otros de gestión corriente', normalizedCategory:'other_income', amountNative:0.13348, disclosureLevel:'detailed' },
    { rawLabel:'Subvenciones de explotación incorporadas al resultado del ejercicio', normalizedCategory:'other_income', amountNative:1.01511, disclosureLevel:'detailed' },
  ],
};

const levanteesExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aprovisionamientos (consumo de material deportivo y otros)', normalizedCategory:'other_expenses', amountNative:-1.77961, disclosureLevel:'detailed', items:[
      ['Consumo de material deportivo', -1.61923], ['Otros consumos', -0.15933], ['Deterioro de mercaderías, materias primas y otros aprovisionamientos', -0.00105],
    ]},
    { rawLabel:'Sueldos, salarios asociados a la plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-11.70934, disclosureLevel:'detailed' },
    { rawLabel:'Otros sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-9.25035, disclosureLevel:'detailed' },
    // Cargas sociales (-2.49875, línea única sin separar por sector) prorrateada en la misma
    // proporción que las 2 líneas de sueldo base (aproximación documentada, ver comentario de
    // cabecera).
    { rawLabel:'Cargas sociales (prorrateo aprox., plantilla deportiva)', normalizedCategory:'wages_squad', amountNative:-1.39577, disclosureLevel:'aggregated' },
    { rawLabel:'Cargas sociales (prorrateo aprox., resto del personal)', normalizedCategory:'admin_general_expense', amountNative:-1.10298, disclosureLevel:'aggregated' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-5.65616, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.42748, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-0.61673, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-2.61585, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-1.64298, disclosureLevel:'detailed' },
    { rawLabel:'Gastos en adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-1.96772, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de traspaso (jugadores)', normalizedCategory:'player_amortisation', amountNative:-0.78432, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de otro inmovilizado intangible (patentes/licencias/aplicaciones informáticas)', normalizedCategory:'other_amortisation', amountNative:-0.09047, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de inmovilizado material', normalizedCategory:'depreciation', amountNative:-1.13942, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_expenses', amountNative:-1.32296, disclosureLevel:'detailed' },
  ],
};

const levanteesFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'levante-es-cuentas-anuales-consolidadas-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = Deudas a largo plazo (39.775,79) + Deudas grupo LP (5.016,62) + Deudas a corto
    // plazo (63.304,17) + Deudas grupo CP (13.026,93). cash = Efectivo y otros activos líquidos
    // equivalentes (balance consolidado).
    grossDebt:121.12351, cash:0.60815,
    profitOnPlayerSales:12.30188, assetSales:-0.00292, netInterest:-5.66908, tax:4.39895,
    officialTotalRevenue:16.27769, officialTotalExpenses:41.50214, officialPAT:-14.19562,
  },
};

const levanteesPresupuestoOverlayByYear = {};

const levanteesPasesData = [];
const levanteesResultadosData = {};
const levanteesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['levante-es'] = {
  revenueLinesByYear: levanteesRevenueLinesByYear, expenseLinesByYear: levanteesExpenseLinesByYear,
  fiscalYearMeta: levanteesFiscalYearMeta, pasesData: levanteesPasesData,
  resultadosData: levanteesResultadosData, titulosData: levanteesTitulosData,
  presupuestoOverlayByYear: levanteesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'levante-es-cuentas-anuales-consolidadas-2024-25': {
    id:'levante-es-cuentas-anuales-consolidadas-2024-25', clubId:'levante-es',
    title:'Cuentas Anuales Consolidadas e Informe de Gestión Consolidado, Ejercicio anual terminado el 30 de junio de 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial, cuentas CONSOLIDADAS del grupo (Levante UD S.A.D. + Levante UD Nuevos Desarrollos S.L.U. + Linkshow S.L.U.). Transcripción completa en Clubes/España/Levante UD/cuentas-anuales-consolidadas-2024-2025.md. Temporada jugada en Segunda División (el ascenso a Primera se definió al final de ESTE ejercicio, vía playoff de junio de 2025, para la temporada 2025/26 — ver aviso completo en el comentario de cabecera de data/levante-es-data.js). Cargas sociales prorrateadas por aproximación al no venir separadas por sector en el documento.',
  },
});

gestionesByClub['levante-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2025, lastYear:2025 },
};

memberCountByClub['levante-es'] = null; // no investigado en esta sesión (alcance: solo Finanzas)
