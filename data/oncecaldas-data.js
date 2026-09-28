// ============================================================================
// data/oncecaldas-data.js — Once Caldas S.A. En Reorganización (Manizales,
// Colombia). Primer club colombiano cargado en finance-of-sports (junto con
// Envigado, misma sesión). Ejercicios 2022, 2024 y 2025 = REALES.
//
// EJERCICIO 2022 agregado el 2026-09-28 (ronda de 5 onboardings de prueba
// para los tools nuevos del to-do 98/95). FUENTE:
// `Clubes/Colombia/Once Caldas/estados-financieros-2022.pdf`, transcripción
// en `estados-financieros-2022.md`. Formato numérico EU (punto miles, coma
// decimal) — DISTINTO del que usa el 2024 de este mismo club (formato US),
// confirma que el separador decimal es por documento/plantilla, no por club
// ni por país (ver `tools/extract-table-rows.mjs`). A diferencia de 2024,
// esta Nota 25 SÍ reconcilia exacto: Gastos Extraordinarios ($746,016 M) +
// Impuesto Diferido, Nota 26 ($610,063 M) + Impuesto de Renta, Nota 27
// ($2.712,140 M) suman EXACTO el residuo de `tax` (PAT confirmado menos
// pretax línea por línea) — la Nota 25 de 2024/2025 no tenía esa suerte.
// `tools/suggest-category-precedent.mjs` sugirió EXACTO 10 de 11 rubros de
// ingreso y los 5 de gasto consultados (el único SIN_PRECEDENTE, "Ingresos
// por solidaridad", se categorizó igual que "Solidaridad" de 2025 por
// criterio, mismo concepto con texto distinto). FX: el documento no declara
// el propio (a diferencia de 2024) — se usó `tools/lookup-fx-close.js`
// (TRM oficial al 31/12/2022, agregada a `data/currency-map.js`).
//
// EJERCICIO 2024 agregado el 2026-09-28 (to-do 98, validación real del
// prototipo `tools/extract-table-rows.mjs`: usado para navegar el documento
// en vez de leerlo entero, aunque una tabla partida por salto de página con
// un separador Markdown mal puesto obligó a leer esa sección a mano — ver
// `Admin/TODO.md` to-do 98 para el detalle del bug encontrado en el
// prototipo, no en este documento). FUENTE:
// `Clubes/Colombia/Once Caldas/estados-financieros-2024.pdf`, transcripción
// en `estados-financieros-2024.md`, misma carpeta. Cifras en MILES de pesos
// colombianos igual que 2025 (aunque este PDF no repite la aclaración
// textual, el orden de magnitud y la consistencia contra el patrimonio de
// 2025 lo confirman) — acá también divididas por 1.000, en MILLONES COP.
//
// REVENUE 2024 = "INGRESOS OPERATIVOS" (total impreso $26.814,332 M,
// reconciliado EXACTO línea por línea con `tools/sum-check.mjs`) + la
// porción no-financiera de "INGRESOS NO OPERACIONALES" ($156,708 M = total
// impreso $4.783,272 M menos el componente FINANCIEROS $4.626,564 M, que va
// a `netInterest` — mismo criterio que carveó Ingresos Financieros aparte en
// 2025). "Taquilla" se separó en sus 2 sub-componentes impresos (partidos
// oficiales -> matchday_competition, venta de abonos -> season_tickets, ver
// SKILL.md sección 13: son 2 conceptos distintos) — 2025 no tenía este nivel
// de desglose disponible en su documento, así que quedó como una sola línea
// ese año; no es una inconsistencia entre ejercicios, es lo que cada
// documento permitió separar.
//
// EXPENSES 2024 = "COSTO DE VENTAS" ($1.276,105 M) + "GASTOS DE
// ADMINISTRACION" ($1.633,521 M) + "GASTOS DE VENTAS" ($19.085,241 M), los 3
// reconciliados EXACTO contra su propio total impreso. "Gastos de Ventas" se
// promovió por sub-categoría real (personal del plantel, derechos
// deportivos, organización/logística, administración del plantel,
// depreciación, diversos y provisiones), mismo criterio que 2025.
//
// `tax` 2024, RESIDUO (mismo método que 2025, documentado en su comentario):
// la Nota 25 "Gastos No Operacionales" ($3.435,595 M impreso) NO reconcilia
// contra la suma de sus propias líneas (Financieros + Extraordinarios +
// Impuesto Diferido + Diversos + Impuesto de Renta da ~$3.729 M antes de
// sumar el impuesto de renta, ya por encima del total impreso) — la propia
// fila "IMPUESTO DE RENTA Y COMPLEMENTARIO" muestra **0** en negrita pero
// **1.761.301** en la fila de detalle inmediatamente debajo, contradictorio.
// No se fuerza una categorización sobre números que no cierran (SKILL.md
// sección 6, punto 3: no confiar en un rótulo/número sin cruzarlo). En vez
// de eso: PAT confirmado (Utilidad del Ejercicio, $4.112,260 M, de la
// Cuenta de Patrimonio — único ejercicio SIN segunda fuente independiente
// que lo repita: el dictamen del revisor fiscal 2024 no narra la cifra como
// sí lo hace el de 2025, ver `fuentes/Colombia/Once Caldas.md`) menos
// pretax calculado línea por línea (Ingresos - Costo Ventas - Gastos Admin
// - Gastos Ventas + netInterest = $6.515,947 M) = tax -$2.403,687 M —
// absorbe impuesto corriente + diferido + extraordinarios + diversos no
// operacionales, sin separarlos (el documento no lo permite).
//
// FX 2024: el documento SÍ declara su propio cierre, en prosa dentro de la
// Nota 24 ("...terminando el año 2023 en $3.822,05 y en el año 2024 a
// $4.409,15" -- diferencia en cambio) -- SKILL.md sección 5 regla #0, se usa
// ESE valor (fxSource:'document_close'), no una TRM externa como sí hizo
// falta para 2025 (que no declaraba el propio).
//
// EJERCICIO 2025 (comentario original, sin cambios):
//
// FUENTE: `Clubes/Colombia/Once Caldas/estados-financieros-2025.pdf` (34
// páginas, "ESTADOS FINANCIEROS Al 31 de diciembre de 2025 y 2024 e Informe
// del Revisor Fiscal", texto real vía pdftotext -layout, NIT 890.801.447-5),
// transcripción completa en `estados-financieros-2025.md` en la misma
// carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co), ver
// `fuentes/Colombia/Once Caldas.md`.
//
// OJO — este PDF (a pesar del nombre "estados-financieros") son las NOTAS a
// los estados financieros (desglose rubro por rubro), NO incluye una tabla
// de Estado de Situación Financiera/Estado de Resultado Integral aparte como
// sí incluye el de Envigado (ver data/envigado-data.js). Esto afecta cómo se
// armó fiscalYearMeta[2025].tax, ver ese comentario.
//
// Cifras del documento en MILES de pesos colombianos (confirmado: pág. 7,
// "la información...se encuentra presentada en miles de pesos"; también
// verificado indirectamente: el Informe del Revisor Fiscal dice "generó
// utilidades por $9.138 millones", que coincide con dividir por 1.000 el
// $9.138.546 (miles) que trae la Nota 2). Acá se guardan ya divididas por
// 1.000, en MILLONES de pesos colombianos (COP), mismo criterio de unidad
// que usa el sitio para ARS (amountNative en millones nativos).
//
// REVENUE = Nota 20 "Ingresos de Actividades Ordinarias" (11 líneas, suma
// EXACTA a $58.810,323 M COP, el total impreso) + Nota 25 "Otros Ingresos"
// (4 líneas, $271,337 M) — se suman ambas al campo `revenue` del sitio
// porque acá no hay ninguna otra ubicación para "otros ingresos" que no sea
// financiero (ver criterio idéntico en Envigado). officialTotalRevenue por
// eso es 58.810,323 + 271,337 = 59.081,660 M, no el número que muestra la
// vista rápida de SIIS (que replica solo la Nota 20).
//
// EXPENSES: Nota 21 "Costo de Ventas" ($1.483,046 M), Nota 22 "Gastos de
// Administración" (13 líneas, $2.509,228 M impreso — la suma de mis líneas
// da $2.509,229 M, 1 milésima de diferencia por redondeo de la propia
// transcripción; se usa el TOTAL IMPRESO como amountNative del renglón
// consolidado, no mi propia suma, ver club-data-mapping SKILL.md sección 6),
// Nota 23 "Gastos de Ventas" (19 líneas, $40.862,125 M impreso) — estas 2
// últimas son bolsones heterogéneos (personal, derechos deportivos,
// logística, administración, depreciación...) que SÍ tienen sub-ítems con
// categoría real distinta entre sí (ver club-data-mapping SKILL.md sección
// 1), así que se promovieron a líneas de primer nivel agrupadas por
// categoría (no una única línea "Gastos de Ventas" con todo adentro). Nota
// 27 "Otros Gastos" ($360,154 M) se suma también, mismo criterio que Otros
// Ingresos.
//
// RESULTADO FINAL (PAT): confirmado TRIPLE, dentro del propio documento: (1)
// la tabla de indicadores de negocio en marcha de la Nota 2 dice
// literalmente "Año 2025: $9.138.546" como "resultado del ejercicio"; (2) el
// Informe del Revisor Fiscal narra "la Compañía generó utilidades por
// $9.138 millones"; (3) coincide con la cifra "Ganancia" que muestra la
// vista SIIS ($9.138.546 M, ver fuentes/Colombia/Once Caldas.md). officialPAT
// = 9.138,546 M COP, altísima confianza.
//
// PERO: sumando Ingresos - Costo Ventas - Gastos Admin - Gastos Ventas +
// Ingresos Financieros (Nota 24, $3.873,050 M) + Otros Ingresos - Gastos
// Financieros (Nota 26, $4.294,035 M) - Otros Gastos, el PRETAX que da esta
// cuenta ($13.446,121 M) NO reconcilia limpio contra el pretax que el propio
// documento llama "Utilidad contable" en su nota de conciliación fiscal
// (Nota 15, $9.846,710 M) — una diferencia de ~$3.599 M que este documento
// no explica (no hay una línea de "ganancia extraordinaria por acuerdo de
// reestructuración" ni similar en las notas descargadas). La Nota 15 SÍ da
// el impuesto de renta CORRIENTE exacto ($4.666,696 M), pero no alcanza para
// llegar de mi pretax al PAT confirmado, faltando el efecto de impuesto
// diferido (que la Nota 15 sí prueba que existe: activo por impuesto
// diferido reconocido de $232,682 M en 2025 vs. un pasivo de $195,091 M en
// 2024, un swing de ~$427,7 M, tampoco alcanza para cerrar toda la
// diferencia). Ante la imposibilidad de reconciliar el detalle completo con
// el documento descargado (que no trae el Estado de Resultados Integral
// primario, solo notas — ver fuentes/Colombia/Once Caldas.md para el
// pendiente de re-descargar el radicado correcto), se resolvió el ÚNICO
// campo sin fuente directa (`tax`, en fiscalYearMeta) como RESIDUO: pretax
// (calculado línea por línea desde las Notas 20-27, cada una con su propio
// número impreso) MENOS el PAT confirmado triple. Esto no es un número
// inventado a ciegas: es la única incógnita restante despejada de dos
// anclas 100% sourced (mi pretax línea por línea + el PAT confirmado). Ver
// Admin/dudas-por-club.md para la pregunta pendiente al club/SIIS sobre esta
// diferencia.
// ============================================================================

const oncecaldasRevenueLinesByYear = {
  2022: [
    { rawLabel:'Taquilla - Partidos oficiales', normalizedCategory:'matchday_competition', amountNative:2569.934, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla - Venta de abonos', normalizedCategory:'season_tickets', amountNative:1824.074, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:40673.858, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por solidaridad', normalizedCategory:'player_sales', amountNative:1574.756, disclosureLevel:'detailed' },
    { rawLabel:'Préstamo derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:2441.619, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:2670.956, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:529.345, disclosureLevel:'detailed', items:[
      ['Vallas publicitarias', 518.540], ['Publicidad en partidos', 10.084], ['Regalías', 0.721],
    ]},
    { rawLabel:'DIMAYOR', normalizedCategory:'broadcasting', amountNative:5704.177, disclosureLevel:'detailed', items:[
      ['Participaciones DIMAYOR', 295.685], ['Derechos TV cerrada', 2268.028], ['Derechos TV internacional', 116.576],
      ['Fondo equipos no clasificados', 175.660], ['Televisión variable', 868.665], ['Participación transporte', 68.169],
      ['Participación hospedaje', 289.705], ['Televisión premium', 1404.901], ['Auxilio apoyo logístico', 71.500],
      ['Apoyo pruebas COVID', 12.920], ['Transmisiones de TV', 132.368],
    ]},
    { rawLabel:'Federación Nacional de Fútbol Colombiano', normalizedCategory:'competition_bonus', amountNative:436.000, disclosureLevel:'detailed' },
    { rawLabel:'Participaciones nacionales e internacionales', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Venta de artículos deportivos (neto de devoluciones)', normalizedCategory:'sponsorship_commercial', amountNative:670.162, disclosureLevel:'detailed', items:[
      ['Venta de artículos deportivos', 674.869], ['Devolución ventas almacén', -4.707],
    ]},
    { rawLabel:'Actividades conexas', normalizedCategory:'other_income', amountNative:1.840, disclosureLevel:'detailed' },
    // $214,305 M = total impreso de "Ingresos No Operacionales" ($6.112,155 M) menos el componente
    // "Financieros" ($5.897,850 M, va a netInterest).
    { rawLabel:'Otros ingresos no operacionales (recuperaciones, indemnizaciones, diversos, subvenciones)', normalizedCategory:'other_income', amountNative:214.305, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 67.600], ['Indemnizaciones', 75.988], ['Ingresos de ejercicios anteriores', 14.387], ['Diversos', 56.330],
    ]},
  ],
  2024: [
    { rawLabel:'Taquilla - Partidos oficiales', normalizedCategory:'matchday_competition', amountNative:9214.593, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla - Venta de abonos', normalizedCategory:'season_tickets', amountNative:2822.704, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:1246.593, disclosureLevel:'detailed' },
    { rawLabel:'Préstamo derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:599.657, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:2265.877, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:784.967, disclosureLevel:'detailed', items:[
      ['Vallas publicitarias', 417.666], ['Publicidad en partidos', 115.966], ['Regalías', 251.334],
    ]},
    { rawLabel:'DIMAYOR', normalizedCategory:'broadcasting', amountNative:7095.459, disclosureLevel:'detailed' },
    { rawLabel:'Federación Nacional de Fútbol Colombiano', normalizedCategory:'competition_bonus', amountNative:595.734, disclosureLevel:'detailed' },
    { rawLabel:'Participaciones nacionales e internacionales', normalizedCategory:'competition_bonus', amountNative:81.922, disclosureLevel:'detailed' },
    { rawLabel:'Venta de artículos deportivos (neto de devoluciones)', normalizedCategory:'sponsorship_commercial', amountNative:1825.012, disclosureLevel:'detailed', items:[
      ['Venta de artículos deportivos', 1833.023], ['Devolución ventas almacén', -8.011],
    ]},
    { rawLabel:'Actividades conexas', normalizedCategory:'other_income', amountNative:281.813, disclosureLevel:'detailed' },
    // $156,708 M = total impreso de "Ingresos No Operacionales" ($4.783,272 M) menos el componente
    // "Financieros" ($4.626,564 M, va a netInterest) -- se usa el total impreso, no mi propia suma de
    // sub-ítems (que da $156,731 M, $23 M de diferencia sin explicación clara en el documento).
    { rawLabel:'Otros ingresos no operacionales (recuperaciones, indemnizaciones, diversos, subvenciones)', normalizedCategory:'other_income', amountNative:156.708, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 109.072], ['Indemnizaciones', 43.975], ['Diversos', 3.661], ['Ajuste al peso', 0.023],
    ]},
  ],
  2025: [
    { rawLabel:'Taquilla - Venta de boletería', normalizedCategory:'matchday_competition', amountNative:16372.622, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:12277.477, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:50.000, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:759.749, disclosureLevel:'detailed' },
    { rawLabel:'DIMAYOR', normalizedCategory:'broadcasting', amountNative:7652.866, disclosureLevel:'detailed' },
    { rawLabel:'Federación Nacional de Fútbol Colombiano', normalizedCategory:'competition_bonus', amountNative:721.400, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:4159.546, disclosureLevel:'detailed' },
    { rawLabel:'Participaciones nacionales e internacionales', normalizedCategory:'competition_bonus', amountNative:13388.395, disclosureLevel:'detailed' },
    { rawLabel:'Venta de artículos deportivos', normalizedCategory:'sponsorship_commercial', amountNative:2235.906, disclosureLevel:'detailed' },
    { rawLabel:'Solidaridad', normalizedCategory:'player_sales', amountNative:19.913, disclosureLevel:'detailed' },
    { rawLabel:'Actividades conexas', normalizedCategory:'other_income', amountNative:1172.449, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (recuperaciones, indemnizaciones, arrendamientos, diversos)', normalizedCategory:'other_income', amountNative:271.337, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 225.608], ['Indemnizaciones', 34.277], ['Arrendamientos', 2.731], ['Diversos', 8.721],
    ]},
  ],
};

const oncecaldasExpenseLinesByYear = {
  2022: [
    { rawLabel:'Costo de Ventas: Venta de artículos deportivos-miscelaneos', normalizedCategory:'other_expenses', amountNative:-384.189, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-8022.052, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Derechos deportivos (costo transferencia de jugadores)', normalizedCategory:'player_amortisation', amountNative:-18221.445, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Organización y logística (honorarios, arrendamientos, servicios, viaje, mantenimiento, adecuación)', normalizedCategory:'match_organisation_expense', amountNative:-1655.423, disclosureLevel:'detailed', items:[
      ['Mantenimiento y reparaciones', 714.700], ['Gastos de viaje', 479.979], ['Servicios', 224.543], ['Honorarios', 119.018], ['Arrendamientos', 115.243], ['Adecuación e instalación', 1.940],
    ]},
    { rawLabel:'Gastos de Ventas: Administración del plantel (impuestos, contribuciones, seguros, legales)', normalizedCategory:'admin_general_expense', amountNative:-829.484, disclosureLevel:'detailed', items:[
      ['Impuestos', 791.129], ['Seguros', 31.039], ['Contribuciones y afiliaciones', 7.005], ['Gastos legales', 0.311],
    ]},
    { rawLabel:'Gastos de Ventas: Depreciación', normalizedCategory:'depreciation', amountNative:-74.900, disclosureLevel:'detailed' },
    // $1.481,810 M = Provisiones ($30,574 M) + total impreso de "Diversos" ($1.451,236 M).
    { rawLabel:'Gastos de Ventas: Diversos y provisiones', normalizedCategory:'other_expenses', amountNative:-1481.810, disclosureLevel:'detailed', items:[
      ['Diversos', 1451.236], ['Provisiones', 30.574],
    ]},
    // Nota 22 "Gastos de Administración" ($2.309,739 M impreso; mi propia suma de sub-ítems da
    // $2.309,240 M, $499 M de diferencia sin explicar en el documento -- se usa el total impreso).
    { rawLabel:'Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, legales, mantenimiento)', normalizedCategory:'admin_general_expense', amountNative:-2308.097, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1959.465], ['Honorarios', 60.400], ['Diversos', 57.769], ['Arrendamientos', 129.596], ['Gastos de viaje', 32.405], ['Servicios', 64.694], ['Gastos legales', 3.016], ['Mantenimiento y reparaciones', 0.136], ['Adecuación e instalación', 0.117],
    ]},
    { rawLabel:'Gastos de Administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-1.642, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Costo de Ventas: Venta de artículos deportivos-miscelaneos', normalizedCategory:'other_expenses', amountNative:-1276.105, disclosureLevel:'detailed' },
    // Nota 23 "Gastos de Ventas" ($19.085,241 M impreso), promovida por sub-categoría real:
    { rawLabel:'Gastos de Ventas: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-10764.652, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Derechos deportivos (costo transferencia de jugadores)', normalizedCategory:'player_amortisation', amountNative:-2528.655, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Organización y logística (honorarios, arrendamientos, servicios, viaje, mantenimiento, adecuación)', normalizedCategory:'match_organisation_expense', amountNative:-1814.390, disclosureLevel:'detailed', items:[
      ['Gastos de viaje', 861.540], ['Servicios', 312.845], ['Mantenimiento y reparaciones', 353.355], ['Arrendamientos', 222.430], ['Honorarios', 64.100], ['Adecuación e instalación', 0.120],
    ]},
    { rawLabel:'Gastos de Ventas: Administración del plantel (impuestos, contribuciones, seguros, legales)', normalizedCategory:'admin_general_expense', amountNative:-1412.017, disclosureLevel:'detailed', items:[
      ['Impuestos', 1358.701], ['Contribuciones y afiliaciones', 8.974], ['Seguros', 43.431], ['Gastos legales', 0.911],
    ]},
    { rawLabel:'Gastos de Ventas: Depreciación', normalizedCategory:'depreciation', amountNative:-171.377, disclosureLevel:'detailed' },
    // $2.394,150 M = Provisiones ($12,405 M) + total impreso de "Diversos" ($2.381,745 M, no mi
    // propia suma del detalle publicado, que da $2.380,103 M -- $1,642 M de diferencia sin explicar).
    { rawLabel:'Gastos de Ventas: Diversos y provisiones', normalizedCategory:'other_expenses', amountNative:-2394.150, disclosureLevel:'detailed', items:[
      ['Diversos', 2381.745], ['Provisiones', 12.405],
    ]},
    // Nota 22 "Gastos de Administración" ($1.633,521 M impreso), mismo criterio:
    { rawLabel:'Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, seguros, legales, mantenimiento)', normalizedCategory:'admin_general_expense', amountNative:-1622.437, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1208.958], ['Honorarios', 134.008], ['Diversos', 85.709], ['Gastos de viaje', 64.091], ['Arrendamientos', 71.622], ['Servicios', 41.017], ['Gastos legales', 5.746], ['Seguros', 8.684], ['Mantenimiento y reparaciones', 2.587], ['Impuestos', 0], ['Adecuación e instalación', 0.015],
    ]},
    { rawLabel:'Gastos de Administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-10.173, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.911, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Costo de Ventas productos deportivos', normalizedCategory:'other_expenses', amountNative:-1483.046, disclosureLevel:'detailed' },
    // Nota 23 "Gastos de Ventas" ($40.862,125 M impreso), promovida por sub-categoría real (ver
    // comentario de cabecera):
    { rawLabel:'Gastos de Ventas: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-19303.075, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Derechos deportivos (costo transferencia de jugadores)', normalizedCategory:'player_amortisation', amountNative:-7681.212, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Organización y logística (viaje, arrendamientos, servicios, mantenimiento, adecuaciones)', normalizedCategory:'match_organisation_expense', amountNative:-9109.879, disclosureLevel:'detailed', items:[
      ['Logística y preparación evento', 3771.072], ['Gastos de viaje', 3258.787], ['Arrendamientos', 970.242], ['Servicios', 765.383], ['Mantenimiento y reparaciones', 339.246], ['Adecuación e instalación', 5.149],
    ]},
    { rawLabel:'Gastos de Ventas: Administración del plantel (impuestos, seguros, honorarios, contribuciones, legales, publicidad)', normalizedCategory:'admin_general_expense', amountNative:-2992.179, disclosureLevel:'detailed', items:[
      ['Impuestos', 2397.058], ['Publicidad', 531.304], ['Seguros', 23.844], ['Honorarios', 23.489], ['Contribuciones y afiliaciones', 14.281], ['Gastos legales', 2.203],
    ]},
    { rawLabel:'Gastos de Ventas: Diversos y provisiones', normalizedCategory:'other_expenses', amountNative:-1654.881, disclosureLevel:'detailed', items:[
      ['Provisiones', 774.126], ['Diversos área deportiva', 722.906], ['Diversos', 157.849],
    ]},
    { rawLabel:'Gastos de Ventas: Depreciación', normalizedCategory:'depreciation', amountNative:-108.072, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-12.827, disclosureLevel:'detailed' },
    // Nota 22 "Gastos de Administración" ($2.509,228 M impreso), mismo criterio:
    { rawLabel:'Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, seguros, legales, mantenimiento, impuestos)', normalizedCategory:'admin_general_expense', amountNative:-2457.550, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1424.308], ['Honorarios', 635.150], ['Diversos', 160.553], ['Gastos de viaje', 72.927], ['Arrendamientos', 72.663], ['Servicios', 53.787], ['Seguros', 20.263], ['Gastos legales', 13.514], ['Mantenimiento y reparaciones', 4.386], ['Impuestos', 0], ['Adecuaciones instalaciones', 0],
    ]},
    { rawLabel:'Gastos de Administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-49.248, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-2.430, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (diversos, impuestos asumidos, pérdida en venta de bienes, seguridad social, ejercicios anteriores)', normalizedCategory:'other_expenses', amountNative:-360.154, disclosureLevel:'detailed', items:[
      ['Gastos diversos', 205.834], ['Impuestos asumidos', 102.931], ['Pérdida en venta y retiro de bienes', 20.800], ['Seguridad social asumida', 19.811], ['Costos y gastos de ejercicios anteriores', 8.227], ['Gastos no deducibles', 1.777], ['Otros', 0.757], ['Costas y procesos judiciales', 0.017],
    ]},
  ],
};

const oncecaldasFiscalYearMeta = {
  2022: {
    // El documento NO declara su propio TC de cierre (a diferencia de 2024) -- TRM oficial al
    // 31/12/2022 vía tools/lookup-fx-close.js, agregada a data/currency-map.js FX_CLOSE.
    currency:'COP', fxRef:'COP@2022-12-31',
    sourceId:'oncecaldas-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Financieros (Nota 24, ingreso $5.897,850 M) - Gastos Financieros (dentro de Nota 25, $1.188,649 M).
    netInterest:4709.201,
    // tax: RESIDUO (mismo método que 2024/2025) -- pero ACÁ reconcilia EXACTO contra los componentes
    // que el documento SÍ separa: Gastos Extraordinarios (Nota 25, $746,016 M) + Impuesto Diferido
    // (Nota 26, $610,063 M) + Impuesto de Renta (Nota 27, $2.712,140 M) = $4.068,219 M, coincide
    // centavo a centavo con el residuo (PAT confirmado $26.972,965 M menos pretax línea por línea
    // $31.041,184 M).
    tax:-4068.219,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0, // no verificado esta sesión, mismo alcance que 2024
    officialTotalRevenue:59311.026, officialTotalExpenses:32979.043, officialPAT:26972.965,
  },
  2024: {
    // El documento declara su propio cierre, en prosa dentro de la Nota 24 ("...terminando el año
    // 2023 en $3.822,05 y en el año 2024 a $4.409,15" -- diferencia en cambio). SKILL.md sección 5
    // regla #0: se usa ESE valor, no una TRM externa.
    currency:'COP', fx:4409.15, fxSource:'document_close',
    sourceId:'oncecaldas-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Financieros (Nota 24, ingreso $4.626,564 M) - Gastos Financieros (dentro de Nota 25, $3.086,790 M).
    netInterest:1539.774,
    // tax: RESIDUO, ver comentario de cabecera del archivo -- la Nota 25 no reconcilia contra sus
    // propias líneas. pretax línea por línea = $6.515,947 M. officialPAT confirmado (Cuenta de
    // Patrimonio, "Utilidad o pérdida del ejercicio") = $4.112,260 M. tax = 4112.260 - 6515.947 =
    // -2403.687 (gasto neto: corriente + diferido + extraordinarios + diversos no operacionales,
    // sin poder separarlos con lo que declara este documento).
    tax:-2403.687,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0, // no verificado esta sesión (el foco fue validar tools/extract-table-rows.mjs, to-do 98) -- el documento sí trae Notas de deuda financiera (10, 16) que permitirían cargarlo en una sesión futura
    officialTotalRevenue:26971.040, officialTotalExpenses:21994.867, officialPAT:4112.260,
  },
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento NO declara su propio tipo de cambio (a
    // diferencia de los balances argentinos, este balance no tiene un Anexo de "activos y pasivos en
    // moneda extranjera"), así que se usa la TRM de cierre oficial, mismo criterio que ya aplica el
    // sitio cuando un balance argentino no declara su propio fx (ver club-data-mapping SKILL.md
    // sección 5, regla 1). Fuente: Superintendencia Financiera de Colombia
    // (superfinanciera.gov.co/powerbi/reportes/514/482/), cruzado contra dolar-colombia.com.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'oncecaldas-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos Financieros (Nota 24, $3.873,050 M) - Gastos Financieros (Nota 26, $4.294,035 M).
    netInterest:-420.985,
    // tax: RESIDUO, ver comentario de cabecera del archivo. pretax línea por línea (Notas 20-27,
    // cada línea con su propio número impreso) = 13.446,121 M. officialPAT confirmado triple =
    // 9.138,546 M. tax = 9.138,546 - 13.446,121 = -4.307,575 (gasto por impuesto a las ganancias,
    // corriente + diferido neto — la Nota 15 solo prueba el corriente, $4.666,696 M; el diferido neto
    // implícito de ~$359 M de beneficio no está separado explícito en las notas descargadas).
    tax:-4307.575,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0, // no se cargó (el documento no trae el Estado de Situación Financiera primario en este PDF, solo notas — ver fuentes/Colombia/Once Caldas.md)
    officialTotalRevenue:59081.660, officialTotalExpenses:45214.554, officialPAT:9138.546,
  },
};

const oncecaldasPresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
// club (fuera de alcance de esta sesión, que se enfocó en Finanzas del Ejercicio 2025 — ver
// Admin/CHANGELOG.md). Arrays vacíos en vez de placeholders inventados.
const oncecaldasPasesData = [];
const oncecaldasResultadosData = {};
const oncecaldasTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.oncecaldas = {
  revenueLinesByYear: oncecaldasRevenueLinesByYear, expenseLinesByYear: oncecaldasExpenseLinesByYear,
  fiscalYearMeta: oncecaldasFiscalYearMeta, pasesData: oncecaldasPasesData,
  resultadosData: oncecaldasResultadosData, titulosData: oncecaldasTitulosData,
  presupuestoOverlayByYear: oncecaldasPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'oncecaldas-estados-financieros-2022': {
      id:'oncecaldas-estados-financieros-2022', clubId:'oncecaldas',
      title:'Estados Financieros (Notas) e Informe del Revisor Fiscal, al 31 de diciembre de 2022 y 2021',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). PAT confirmado en la Cuenta de Patrimonio ("Utilidad o pérdida del ejercicio"). Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2022.md.',
    },
  'oncecaldas-estados-financieros-2024': {
      id:'oncecaldas-estados-financieros-2024', clubId:'oncecaldas',
      title:'Estados Financieros (Notas) e Informe del Revisor Fiscal, al 31 de diciembre de 2024 y 2023',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). El dictamen del revisor fiscal 2024 es una opinión limpia sin narrar la cifra de resultado (a diferencia del de 2025) -- el PAT ($4.112,260 M COP) sale confirmado de una sola fuente (Cuenta de Patrimonio, fila "Utilidad o pérdida del ejercicio"), no triple como 2025. Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2024.md.',
    },
  'oncecaldas-estados-financieros-2025': {
      id:'oncecaldas-estados-financieros-2025', clubId:'oncecaldas',
      title:'Estados Financieros (Notas) e Informe del Revisor Fiscal, al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). El PDF trae las notas completas a los estados financieros (34 páginas, texto real) pero NO el Estado de Situación Financiera/Estado de Resultado Integral primario como tabla aparte — el resultado del ejercicio ($9.138,546 M COP) se confirma triple: tabla de indicadores de negocio en marcha (Nota 2), narrativa del Informe del Revisor Fiscal, y la vista SIIS. La compañía sigue en proceso de reorganización empresarial (Superintendencia de Sociedades, desde agosto de 2012), aunque el ejercicio 2025 dio utilidad. Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2025.md.',
    },
});

// gestionesByClub: no se pudo confirmar con confianza una "gestión"/presidencia en el sentido
// argentino del término (Once Caldas S.A. es una sociedad anónima con Representante Legal, no un
// club asociativo con presidente electo) — se agrega UNA entrada genérica "Gestión actual" (no un
// nombre propio, para no publicar una atribución que no se confirmó) solo para que el selector "Por
// gestión" de Finanzas tenga al menos 1 opción y no rompa (ver club-data-mapping SKILL.md sección 7:
// "mejor un año sin gestión asignada que una gestión inventada" — acá se optó por una etiqueta
// neutra en vez de dejar el objeto vacío, que sí rompía el selector para cualquier club sin ninguna
// entrada).
gestionesByClub.oncecaldas = {
  actual: { nombre:'Gestión actual', firstYear:2022, lastYear:2025 },
};

memberCountByClub.oncecaldas = null;
