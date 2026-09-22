// ============================================================================
// data/instituto-data.js — Instituto Atlético Central Córdoba: club nuevo, 4to del motor genérico
// (después de River/Racing/Vélez). Un solo ejercicio cargado hasta ahora: 2023/2024 (Ejercicio
// N°70, 1°/7/2023 a 30/6/2024), balance auditado real, texto nativo en el PDF (no hizo falta OCR).
// PDF + transcripción en Clubes/Argentina/Instituto/balance-general-2023-2024.{pdf,md}.
//
// El archivo del club también trae un Presupuesto 2025 (Clubes/Argentina/Instituto/
// presupuesto-2025.pdf) y sus premisas, pero ESE documento presupuesta por AÑO CALENDARIO
// (ene-25 a dic-25, formato de cash-flow mensual para AFA/LPF) en vez de por ejercicio económico
// (jul-jun, el que usa el balance auditado) — no encaja en el mismo `year` key que el balance sin
// forzar una equivalencia que el propio club no hace. Queda pendiente (ver to-do de index.html)
// decidir cómo modelar un presupuesto de ejercicio calendario antes de cargarlo, no se cargó en
// esta sesión.
//
// Categorización del Anexo V ("Gastos Específicos de Sectores"): mismo mecanismo de columna-por-
// sector que Vélez (Anexo III), ver club-data-mapping/SKILL.md sección 14. Este Anexo tiene 6
// columnas (Fútbol/Básquet/La Agustina/Sede/Colegio/Tienda) y CADA fila se carga partida en hasta 3
// líneas de primer nivel, según qué columnas tenga con plata: Fútbol (-> wages_squad para
// "Remuneraciones y cargas", -> other_expenses para el resto), Colegio (-> education_expense desde
// la Versión 194, to-do 42) y el resto de columnas no-fútbol-no-colegio sumadas (Básquet+La
// Agustina+Sede+Tienda -> youth_other_sports_expense). Cada columna usada en un split viene directo
// del Anexo V impreso (ver Clubes/Argentina/Instituto/balance-general-2023-2024.md, pág. 17), no de
// una estimación — y cada grupo de líneas partidas cierra exacto contra el total impreso de su fila.
//
// "Comisiones y acuerdos de rescisión" (rubro de pases, 3.284,765346 M) se dejó en `other_expenses`,
// NO en `player_amortisation`, siguiendo el precedente de Racing (club-data-mapping sección 13:
// Boca tampoco mezcla comisiones de compraventa dentro de "Compra de jugadores"). "Compras y
// préstamos de jugadores" (costo directo de adquisición, 213,545381 M) sí va a `player_amortisation`.
//
// grossDebt: el Estado de Situación Patrimonial de Instituto no separa una línea "Deudas" de otras
// categorías de pasivo (a diferencia de Boca/Vélez), pero SÍ tiene una "Previsión juicios" (pasivo
// contingente por causas judiciales, Nota 4) que no es deuda financiera real. Se excluyó esa previsión
// del cálculo (mismo espíritu que excluir Previsiones en Boca/Vélez, ver sección 14 del skill):
// grossDebt = TOTAL DEL PASIVO (3.336,889854 M) - Previsión juicios corriente+no corriente
// (391,878758 + 180,641203 = 572,519961 M) = 2.764,369893 M.
//
// netInterest = "Res. Fin. y por tenencia incluido RECPAM" (Nota 2.8, pág. 8), positivo este
// ejercicio (intereses ganados/perdidos + diferencias de cambio + RECPAM, todo en una sola línea
// combinada, mismo criterio que Vélez/Boca).
//
// Verificado con verifyTieOuts(): Revenue, Expenses (incl. no-efectivo) y PAT cierran EXACTOS contra
// el "Total recursos ordinarios"/"Total gastos ordinarios"/"SUPERÁVIT FINAL" impresos (pág. 3 del
// balance). "Gastos extraordinarios" (Nota 3 y 2.9, -18,911650 M) se cargó como línea
// `exceptional_items` — no participa del check de "Expenses" (que compara solo gasto ordinario +
// no-efectivo), pero sí de PAT vía `operatingProfit`.
// ============================================================================

const institutoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Cuotas sociales y abonos deportivos', normalizedCategory:'member_dues', amountNative:2734.838041, disclosureLevel:'detailed' },
    { rawLabel:'Abonos deportivos sede', normalizedCategory:'season_tickets', amountNative:110.393384, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de TV', normalizedCategory:'broadcasting', amountNative:2283.418911, disclosureLevel:'detailed' },
    { rawLabel:'Entradas generales fútbol', normalizedCategory:'matchday_competition', amountNative:1335.932147, disclosureLevel:'detailed' },
    { rawLabel:'Entradas plateas y palcos fútbol', normalizedCategory:'matchday_competition', amountNative:1851.384253, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad institucional', normalizedCategory:'sponsorship_commercial', amountNative:39.810623, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad otras competencias', normalizedCategory:'sponsorship_commercial', amountNative:1013.662215, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y sponsors fútbol', normalizedCategory:'sponsorship_commercial', amountNative:2832.484669, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:3288.129685, disclosureLevel:'detailed' },
    { rawLabel:'Centros educativos', normalizedCategory:'education', amountNative:1480.506179, disclosureLevel:'detailed' },
    { rawLabel:'Recursos predio La Agustina', normalizedCategory:'other_sports', amountNative:148.864908, disclosureLevel:'detailed' },
    { rawLabel:'Ventas de salón Gloriamanía', normalizedCategory:'other_income', amountNative:816.979303, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios recibidos', normalizedCategory:'other_income', amountNative:21.961181, disclosureLevel:'detailed' },
  ],
};

const institutoExpenseLinesByYear = {
  2024: [
    // Anexo V, fila "Remuneraciones y cargas" (3.937,353593 M total impreso), separada por columna
    // de sector: Fútbol Profesional (2.501,512775) / Colegio (979,100475) / resto (Básquet 0 + La
    // Agustina 214,946875 + Sede 170,658677 + Tienda 71,134791 = 456,740343).
    { rawLabel:'Remuneraciones y cargas (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-2501.512775, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y cargas (Colegio)', normalizedCategory:'education_expense', amountNative:-979.100475, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y cargas (Básquet/La Agustina/Sede/Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-456.740343, disclosureLevel:'detailed' },
    // RESTO DE ANEXO V, DESGLOSADO POR SECTOR (corregido el 2026-09-20, to-do 20(b); Colegio
    // separado del resto no-fútbol el 2026-09-22, Versión 194, to-do 42 — antes de esa versión
    // `education_expense` no existía, así que Colegio se sumaba junto con Básquet/La
    // Agustina/Sede/Tienda en `youth_other_sports_expense`, sin fila propia).
    // ACÁ DECÍA "sin desglose por sector — no son filas de personal, no aplica el criterio de
    // columna Fútbol Profesional de arriba", Y ERA FALSO: el Anexo V tiene las 6 columnas
    // (FUTBOL / BASQUET / LA AGUSTINA / SEDE / COLEGIO / TIENDA) para TODAS sus filas, no solo
    // para las de personal. Con el desglose sin usar, 2.425,8 M ARS que el propio balance
    // atribuye a sectores no-fútbol quedaban en el catch-all "Otros gastos", que se llevaba el
    // 42% del ejercicio y no decía nada. Es el criterio de club-data-mapping §14 (Vélez), que
    // este archivo ya aplicaba a Remuneraciones y a Honorarios y no al resto.
    // NINGÚN PESO SE MUEVE: `other_expenses`, `education_expense` y `youth_other_sports_expense`
    // son las tres gasto operativo en efectivo y las tres suman a `otherExpenses` en
    // computeYearGeneric(). Las filas que son 100% de un solo sector van enteras (ej. "Seguros",
    // 100% Colegio); las mixtas se parten en tantas líneas como columnas del Anexo tengan plata, y
    // cada grupo cierra exacto contra el total impreso de su fila.
    { rawLabel:'Seguros (Colegio)', normalizedCategory:'education_expense', amountNative:-7.003365, disclosureLevel:'detailed' },
    // Honorarios: Básquet 833,133038 + La Agustina 171,642083 + Sede 33,624717 + Colegio 80,466336
    // = 1.118,866174 impreso (columna FUTBOL es 0 en esta fila).
    { rawLabel:'Honorarios (Colegio)', normalizedCategory:'education_expense', amountNative:-80.466336, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Básquet/La Agustina/Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-1038.399838, disclosureLevel:'detailed' },
    // Diversos: FUTBOL 1.123,895617 + (Básquet 264,516282 + La Agustina 207,123376 + Sede
    // 142,326601 + Colegio 73,671180 + Tienda 25,391667 = 713,029106) = 1.836,924723 impreso.
    // La columna FUTBOL se queda en el catch-all porque el Anexo no la abre más: "Diversos" es
    // literalmente lo que dice el documento y no hay dónde ir a buscar el detalle.
    { rawLabel:'Diversos (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-1123.895617, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (Colegio)', normalizedCategory:'education_expense', amountNative:-73.671180, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (Básquet/La Agustina/Sede/Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-639.357926, disclosureLevel:'detailed' },
    // Mantenimiento: FUTBOL 167,652401 + (La Agustina 403,420203 + Sede 155,621600 + Colegio
    // 145,746239 = 704,788042) = 872,440443 impreso.
    { rawLabel:'Mantenimiento de bienes de uso (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-167.652401, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento de bienes de uso (Colegio)', normalizedCategory:'education_expense', amountNative:-145.746239, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento de bienes de uso (La Agustina/Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-559.041803, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia sede (Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-91.516356, disclosureLevel:'detailed' },
    // Servicios: FUTBOL 13,240852 + (La Agustina 76,165275 + Sede 16,249603 + Colegio 6,010492 +
    // Tienda 6,773240 = 105,198610) = 118,439462 impreso.
    { rawLabel:'Servicios de energía, agua, gas, etc. (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-13.240852, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de energía, agua, gas, etc. (Colegio)', normalizedCategory:'education_expense', amountNative:-6.010492, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de energía, agua, gas, etc. (La Agustina/Sede/Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-99.188118, disclosureLevel:'detailed' },
    { rawLabel:'Gastos generales por eventos deportivos', normalizedCategory:'match_organisation_expense', amountNative:-895.612298, disclosureLevel:'detailed' },
    { rawLabel:'Viajes y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-1022.310864, disclosureLevel:'detailed' },
    { rawLabel:'Compras de mercadería (Tienda)', normalizedCategory:'youth_other_sports_expense', amountNative:-669.262280, disclosureLevel:'detailed' },
    // Comisiones/rescisiones de pases: en `other_expenses`, NO en `player_amortisation` (precedente
    // de Racing, ver club-data-mapping sección 13 — Boca tampoco mezcla comisiones ahí).
    // RE-CONFIRMADO el 2026-09-20 contra el Anexo V: esta fila es 100% de la columna FUTBOL
    // (3.284.765.346 y cero en las otras cinco), o sea que NO hay un desglose por sector que
    // aprovechar como en las filas de arriba. Se queda donde está, y es la línea que sola explica
    // 19,6% de los gastos del ejercicio: el catch-all de Instituto no baja de ahí sin cambiar el
    // criterio de comisiones, que es una decisión ya tomada para todo el sitio.
    { rawLabel:'Comisiones y acuerdos de rescisión', normalizedCategory:'other_expenses', amountNative:-3284.765346, disclosureLevel:'detailed' },
    { rawLabel:'Limpieza y vigilancia (Sede)', normalizedCategory:'youth_other_sports_expense', amountNative:-22.460193, disclosureLevel:'detailed' },
    { rawLabel:'Compras y préstamos de jugadores', normalizedCategory:'player_amortisation', amountNative:-213.545381, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia La Agustina (La Agustina)', normalizedCategory:'youth_other_sports_expense', amountNative:-112.503089, disclosureLevel:'detailed' },
    // Anexo IV, "Gastos Generales de Administración" (1.919,810448 M total impreso).
    { rawLabel:'Remuneraciones y cargas (administración)', normalizedCategory:'admin_general_expense', amountNative:-136.389896, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (administración)', normalizedCategory:'admin_general_expense', amountNative:-201.457618, disclosureLevel:'detailed' },
    { rawLabel:'Servicios, luz, agua, gas, etc. (administración)', normalizedCategory:'admin_general_expense', amountNative:-13.049239, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'admin_general_expense', amountNative:-1140.780590, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de juicios', normalizedCategory:'admin_general_expense', amountNative:-17.865467, disclosureLevel:'detailed' },
    { rawLabel:'Quebranto por juicios', normalizedCategory:'admin_general_expense', amountNative:-410.267638, disclosureLevel:'detailed' },
    // Depreciación (Anexo I) y amortización de intangibles (Anexo II, "Plantel Profesional" —
    // valuación del pase de jugadores propios, ver Nota 1.2.b).
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-310.502231, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del plantel profesional (intangibles)', normalizedCategory:'player_amortisation', amountNative:-317.109648, disclosureLevel:'detailed' },
    // Gastos extraordinarios (Nota 3 y 2.9): fuera de "Gastos ordinarios", no participa del check de
    // Expenses de verifyTieOuts(), sí de PAT.
    { rawLabel:'Gastos extraordinarios', normalizedCategory:'exceptional_items', amountNative:-18.911650, disclosureLevel:'detailed' },
  ],
};

const institutoFiscalYearMeta = {
  2024: {
    currency:'ARS', fxRef:'ARS@2024-06-30',
    sourceId:'instituto-balance-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'cavagliatto',
    // grossDebt = TOTAL DEL PASIVO (3.336,889854) - Previsión juicios corriente+no corriente
    // (391,878758+180,641203=572,519961), ver comentario de cabecera. cash = Caja y bancos.
    grossDebt:2764.369893, cash:450.629479,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Res. Fin. y por tenencia incluido RECPAM" (Nota 2.8).
    netInterest:641.475849, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
    // ordinarios" impresos (pág. 3). SUPERÁVIT FINAL real (post-extraordinarios): $1.830.503.804 ARS.
    officialTotalRevenue:17958.365499, officialTotalExpenses:16750.425894, officialPAT:1830.503804,
  },
};

const institutoPasesData = [];
const institutoResultadosData = {};
const institutoTitulosData = [];

// Versión 95 (Guido: "onboard all pdfs we have"): con 6+ clubes del motor genérico sumándose en la
// misma sesión, extender a mano 8 ternarios `clubId === 'river' ? ... : clubId === 'racing' ? ... :
// ...` por cada club nuevo (finanzas-calc.js x5, finanzas-render.js x2, index.html x3) dejó de
// escalar — cada club nuevo era una rama más en CADA uno de esos 8 lugares, alto riesgo de
// olvidarse uno (exactamente el problema que ya advertía club-or-year-onboarding/SKILL.md sección
// 2). Reemplazado por un registro simple: cada data/<club>-data.js se anota a sí mismo en
// `window.CLUB_GENERIC_DATA[clubId]` (un objeto plano, sin ternarios) al final del archivo. Los 8
// call-sites ahora hacen `CLUB_GENERIC_DATA[clubId].fiscalYearMeta` (etc.) en vez de la cadena de
// ternarios — agregar un club nuevo de acá en más significa SOLO agregar este bloque a su propio
// archivo de datos, sin tocar finanzas-calc.js/finanzas-render.js/index.html nunca más para esto.
// `const` de nivel superior en un script clásico (no-módulo) NO cuelga de `window`, por eso hace
// falta la asignación explícita acá — no se puede hacer `window[clubId + 'FiscalYearMeta']`
// directamente sobre las consts ya declaradas.
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.instituto = {
  revenueLinesByYear: institutoRevenueLinesByYear, expenseLinesByYear: institutoExpenseLinesByYear,
  fiscalYearMeta: institutoFiscalYearMeta, pasesData: institutoPasesData,
  resultadosData: institutoResultadosData, titulosData: institutoTitulosData,
};


Object.assign(sources, {
  'instituto-balance-2023-24': {
      id:'instituto-balance-2023-24', clubId:'instituto',
      title:'Estados Contables (balance auditado), Ejercicio Económico N°70, 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (17 páginas, texto nativo, sin necesidad de OCR), con informe de auditoría de fecha 15/10/2024. Instituto es el primer club nuevo agregado al sitio después de Vélez (Versión 94). Cifras en moneda homogénea reexpresada (RT 6, Resol. JG FACPCE 539/18). Convertido a USD con $909, el dólar mayorista de cierre al 30/6/2024 (mismo tipo de cambio ya usado para Racing y Vélez en esa misma fecha de cierre — el documento de Instituto no declara su propio tipo de cambio, a diferencia de Boca/Racing/Vélez, no tiene Anexo de moneda extranjera). SUPERÁVIT FINAL real del ejercicio: $1.830.503.804 ARS. El Anexo V ("Gastos Específicos de Sectores") desglosa gasto por sector (Fútbol/Básquet/La Agustina/Sede/Colegio/Tienda), mismo mecanismo que el Anexo III de Vélez para separar "Salarios y primas (plantel y cuerpo técnico)" del resto — ver comentario completo en data/instituto-data.js. Presidente: Juan Manuel Cavagliatto ("Juntos por Instituto"), electo 4/5/2021, reelecto para el período 2022-2025 (institutoacc.com.ar/index.php/asumio-la-nueva-comision-directiva-en-instituto/), cubre la totalidad de este ejercicio. Club con 30.000 socios (institutoacc.com.ar/index.php/somos-30-mil-socios-y-socias/).',
    },
});

gestionesByClub.instituto = {
    // Confirmado por búsqueda (Versión 94): Juan Manuel Cavagliatto asumió por primera vez el
    // 4/5/2021 y fue reelecto para el período 2022-2025, cubriendo la totalidad del Ejercicio
    // 2023/2024 (el único cargado hasta ahora).
    cavagliatto: { nombre:'Cavagliatto (2021-actual)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.instituto = 30000;

