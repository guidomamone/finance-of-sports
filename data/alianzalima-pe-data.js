// ============================================================================
// data/alianzalima-pe-data.js — Alianza Lima (Perú), primer club peruano del sitio.
//
// FUENTE: 6 Estados Financieros auditados (NIIF), uno por ejercicio 2019-2024, transcriptos en
// `Clubes/Perú/Alianza Lima/estado-financiero-<año>.md`. Los de 2019 y 2021 tienen capa de texto
// nativa (pdftotext -layout); los de 2020, 2022, 2023 y 2024 son escaneos OCR con Tesseract
// (-l spa --psm 6) — ver la cabecera de cada .md. LOS TRES ÚLTIMOS (2022/2023/2024) SOLO TRANSCRIBEN
// los 4 estados principales (situación financiera, resultados integrales, cambios en el patrimonio,
// flujos de efectivo), NO las notas explicativas — por eso sus revenueLines/expenseLines son más
// gruesas que las de 2019-2021 (ver el comentario largo antes de cada año más abajo).
//
// EL CLUB ESTÁ EN PROCESO CONCURSAL POR INSOLVENCIA desde 2012 (Ley 27809, bajo supervisión de
// INDECOPI), administrado por un Administrador designado por la Junta de Acreedores (no un
// presidente electo) — por eso `gestionesByClub['alianzalima-pe']` queda vacío (ver sección 7 del
// skill club-data-mapping: mejor sin gestión asignada que una inventada; el concepto de "gestión
// presidencial" del resto del sitio no aplica limpio acá).
//
// TIE-OUT: Revenue - Expenses = Resultado operativo impreso, EXACTO, los 6 ejercicios (ver
// verificación completa en el comentario de cada año). PAT = "Resultado del periodo" (neto, ANTES de
// "Otros resultados integrales" — el único año con OCI ≠ 0 es 2019, S/ 6.305.226 de cambios de
// estimaciones de revaluación; se usó el resultado del periodo, no el "integral", mismo criterio que
// el resto del sitio usa "Superávit/Déficit del ejercicio" y no un totalizador con OCI incluido).
//
// MONEDA: PEN nativo, en MILLONES (mismo criterio que todos los clubes desde la Versión 32/103).
// `scale:1` para PEN ya estaba declarado en CURRENCY_META (data/currency-map.js) antes de esta
// sesión. FX: 2019/2020/2021 declaran su propio tipo de cambio de cierre en la Nota "Riesgo de tipo
// de cambio" (promedio ponderado SBS, publicado como un rango compra/venta — acá se usó el PROMEDIO
// de ambos, a falta de precedente en el sitio para un caso "compra/venta" en vez de un valor único;
// documentado en cada año). 2022/2023/2024 no tienen esa nota en la transcripción disponible, así que
// usan `fxRef` a `FX_CLOSE` (data/currency-map.js): 2022 cotización interbancaria BCRP del último día
// hábil del año (30/12, el 31/12/2022 fue sábado), 2023 y 2024 tipo de cambio contable SBS de cierre.
//
// CATEGORIZACIÓN — casos específicos de Alianza Lima que no estaban ya en la tabla de
// club-data-mapping/SKILL.md sección 1 (agregados ahí también al cerrar esta sesión):
//   - "Ingresos por participación en torneos internacionales"/"...nacionales": el club los reporta
//     como línea propia, separada de la taquilla (que va aparte, en la Nota de "Otros ingresos
//     deportivos") -> `competition_bonus` (premios/ingresos de la FPF o CONMEBOL por participar en el
//     torneo, no recaudación de boletería).
//   - "Taquilla por torneos locales" / "...internacionales y amistosos" -> `matchday_competition`
//     (recaudación de entradas, sea el partido local o de visita/amistoso).
//   - "Ingresos por derechos de formación y transferencias" -> `player_sales` (venta/formación de
//     jugadores).
//   - "Franquicias de academias" (franquiciar la marca/metodología "Academia Alianza Lima" a
//     terceros, ver Nota NIIF15 del EEFF 2019) -> `youth_football` (es negocio de fútbol juvenil,
//     aunque el ingreso sea un canon de franquicia y no una cuota de alumno).
//   - "Academias de fútbol y vóley" (operación propia, mixta con vóley) -> `other_sports` (no se
//     puede separar la porción de fútbol de la de vóley con lo que reporta la Nota).
//   - "Concesionarios" (del estadio) -> `stadium_other` ("uso del estadio fuera del partido",
//     Versión 189 de category-map.js: comparte la fila "Estadio" de Formato simplificado con
//     matchday_competition/season_tickets, sin decir que es recaudación de entradas).
//   - "Regalías" -> `sponsorship_commercial`.
//   - Campaña "De vuelta a casa" (2021, campaña puntual post-pandemia, sin más detalle en la Nota)
//     -> `other_income`.
//   - "Gastos deportivos: Personal" -> `wages_squad`. "...Depreciación" -> `depreciation`.
//     "...Amortización" -> `player_amortisation` (es la amortización de "Derechos federativos, neto",
//     el intangible de pases de jugadores — ver política contable "f. Intangible Derechos
//     federativos" en el EEFF 2020, activa y amortiza el costo de adquisición de cada jugador).
//     "...Diversos" -> `other_expenses`.
//     "...Servicios" -> `match_organisation_expense` — ESTO ES UNA APROXIMACIÓN, no una certeza: la
//     Nota no desglosa qué compone este bloque grande (S/ 9-15M/año, el 2do rubro más grande de
//     "Gastos deportivos" después de Personal). Podría incluir viajes/concentración/seguridad (que sí
//     es `match_organisation_expense`) pero también servicios médicos tercerizados, comisiones de
//     intermediación u otros conceptos que en otro club irían a categorías distintas. Se documentó
//     como pregunta en Admin/dudas-por-club.md / dudas-por-club.md (según dónde viva ese archivo en
//     este worktree) en vez de inventar una separación que el dato no permite.
//   - "Gastos administrativos: Personal/Servicios/Estimaciones contables/Diversos" -> las 4 a
//     `admin_general_expense` (mismo criterio que Vélez: administración/gastos generales).
//   - "Gastos de marketing" (línea propia del estado, sin nota) -> `admin_general_expense` (incluye
//     "comerciales" según la propia descripción de esta categoría en category-map.js).
//   - 2022/2023/2024, "Otros ingresos deportivos"/"Otros ingresos" (Nota 15/17, NO transcripta): se
//     dejó como UNA sola línea sin desglosar, `lump_football_operations` (ingreso) — mismo criterio
//     que usa River para su "Fútbol Profesional" (ver data/river-data.js): el documento SÍ separa
//     esto en algo (se ve en 2019-2021: cuotas de socios, taquilla, transferencias, academias,
//     concesionarios, regalías, diversos), pero ESTA transcripción no llegó a esa Nota, así que
//     mandarlo a `other_income` sería subestimar cuánto de esto es en realidad fútbol operativo
//     (30-47% del revenue total en estos 3 años). `disclosureLevel:'not_disclosed'` marca que es un
//     pendiente de transcripción, no un límite real de la fuente.
//   - 2022/2023/2024, "Costos deportivos" (Nota 16/18, NO transcripta): mismo criterio, UNA sola
//     línea `lump_football_operations_expense` (gasto) en vez de forzar una separación
//     Personal/Servicios/Depreciación/Amortización que no se puede confirmar sin releer esa Nota.
//
// PENDIENTE para una sesión futura: re-OCRear las páginas de Notas de estado-financiero-2022.md,
// -2023.md y -2024.md (Notas "Otros ingresos"/"Costos deportivos", equivalentes a las Notas 14-16 que
// SÍ están transcriptas en 2019/2020/2021) para poder separar esas 2 líneas lump en las mismas
// categorías finas que ya se usan en 2019-2021. Documentado también en
// fuentes/Perú/Alianza Lima.md.
// ============================================================================

const alianzalimaPeRevenueLinesByYear = {
  // EEFF 2019 (estado-financiero-2019.md, texto nativo). Nota 15 "Otros ingresos deportivos"
  // desglosada íntegra: sus 9 sub-ítems tienen categorías reales DISTINTAS entre sí (cuotas de
  // socios, taquilla, transferencias, academias, concesionarios, regalías, diversos), así que se
  // promovieron a líneas de primer nivel en vez de anidarlas como `items` de una sola línea "Otros
  // ingresos deportivos" (club-data-mapping SKILL.md sección 1, regla de la "fila acumulada"/
  // promoción de sub-ítems). Suma total = 59.376339 M PEN, EXACTO igual a "Ingresos" del Estado de
  // resultados integrales (18.401167+12.300941+11.252943+17.421288 = 59.376339).
  2019: [
    { rawLabel:'Ingresos por derechos de transmisión televisiva', normalizedCategory:'broadcasting', amountNative:18.401167, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auspicios publicitarios', normalizedCategory:'sponsorship_commercial', amountNative:12.300941, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por participación en torneos internacionales', normalizedCategory:'competition_bonus', amountNative:11.252943, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla por torneos locales', normalizedCategory:'matchday_competition', amountNative:7.260732, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla por torneos internacionales y amistosos', normalizedCategory:'matchday_competition', amountNative:3.995774, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de socios', normalizedCategory:'member_dues', amountNative:1.099599, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de formación y transferencias', normalizedCategory:'player_sales', amountNative:0.726000, disclosureLevel:'detailed' },
    { rawLabel:'Franquicias de academias', normalizedCategory:'youth_football', amountNative:0.675986, disclosureLevel:'detailed' },
    { rawLabel:'Regalías', normalizedCategory:'sponsorship_commercial', amountNative:0.499810, disclosureLevel:'detailed' },
    { rawLabel:'Academias de fútbol y vóley', normalizedCategory:'other_sports', amountNative:0.488110, disclosureLevel:'detailed' },
    { rawLabel:'Concesionarios', normalizedCategory:'stadium_other', amountNative:0.291975, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros ingresos deportivos)', normalizedCategory:'other_income', amountNative:2.383302, disclosureLevel:'detailed' },
  ],
  // EEFF 2020 (estado-financiero-2020.md, OCR). Nota 14 desglosada. Se usó la columna propia "2020"
  // del EEFF 2020 (no la comparativa "2020" del EEFF 2021, que difiere un poco en 2 sub-ítems —
  // "Academias de fútbol y vóley" 293.797 vs 241.496 y "Diversos" 1.564.381 vs 1.616.682 — ver
  // club-data-mapping sección 6, regla 5: usar siempre la columna del año corriente de ESE
  // documento). Suma = 44.948112 M PEN, EXACTO igual a "Ingresos" del Estado de resultados
  // integrales 2020.
  2020: [
    { rawLabel:'Ingresos por derechos de transmisión televisiva', normalizedCategory:'broadcasting', amountNative:19.193625, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auspicios publicitarios', normalizedCategory:'sponsorship_commercial', amountNative:10.167672, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de formación y transferencias', normalizedCategory:'player_sales', amountNative:5.879687, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla por torneos locales', normalizedCategory:'matchday_competition', amountNative:3.011445, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla por torneos internacionales y amistosos', normalizedCategory:'matchday_competition', amountNative:2.920665, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de socios', normalizedCategory:'member_dues', amountNative:0.790199, disclosureLevel:'detailed' },
    { rawLabel:'Regalías', normalizedCategory:'sponsorship_commercial', amountNative:0.318018, disclosureLevel:'detailed' },
    { rawLabel:'Academias de fútbol y vóley', normalizedCategory:'other_sports', amountNative:0.293797, disclosureLevel:'detailed' },
    { rawLabel:'Franquicias de academias', normalizedCategory:'youth_football', amountNative:0.264597, disclosureLevel:'detailed' },
    { rawLabel:'Concesionarios', normalizedCategory:'stadium_other', amountNative:0.132693, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros ingresos deportivos)', normalizedCategory:'other_income', amountNative:1.564381, disclosureLevel:'detailed' },
    // Nota: 2020 NO tiene "Ingresos por participación en torneos internacionales" como línea
    // relevante en Formato Simplificado porque el propio Estado de resultados la reporta en apenas
    // S/ 411.333 (pandemia: los torneos internacionales de ese año casi no se jugaron) — sí se carga,
    // ver la línea de abajo, solo que es chica.
    { rawLabel:'Ingresos por participación en torneos internacionales', normalizedCategory:'competition_bonus', amountNative:0.411333, disclosureLevel:'detailed' },
  ],
  // EEFF 2021 (estado-financiero-2021.md, texto nativo). Nota 14 desglosada, columna propia "2021"
  // (verificada exacta contra la comparativa "2021" del EEFF 2022, coinciden dígito a dígito). Suma
  // = 60.786207 M PEN, EXACTO igual a "Ingresos" del Estado de resultados integrales 2021.
  2021: [
    { rawLabel:'Ingresos por derechos de transmisión televisiva', normalizedCategory:'broadcasting', amountNative:25.270915, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auspicios publicitarios', normalizedCategory:'sponsorship_commercial', amountNative:15.474359, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por participación en torneos internacionales', normalizedCategory:'competition_bonus', amountNative:14.404729, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de socios', normalizedCategory:'member_dues', amountNative:1.994992, disclosureLevel:'detailed' },
    { rawLabel:'Campaña "De vuelta a casa"', normalizedCategory:'other_income', amountNative:0.947210, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de formación y transferencias', normalizedCategory:'player_sales', amountNative:0.866658, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla por torneos locales', normalizedCategory:'matchday_competition', amountNative:0.337998, disclosureLevel:'detailed' },
    { rawLabel:'Regalías', normalizedCategory:'sponsorship_commercial', amountNative:0.236393, disclosureLevel:'detailed' },
    { rawLabel:'Academias de fútbol y vóley', normalizedCategory:'other_sports', amountNative:0.154233, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla por torneos internacionales y amistosos', normalizedCategory:'matchday_competition', amountNative:0.077119, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros ingresos deportivos)', normalizedCategory:'other_income', amountNative:1.021601, disclosureLevel:'detailed' },
    // "Franquicias de academias" y "Concesionarios" dieron 0 en 2021 (Nota 14) — no se cargan líneas
    // en 0 sin motivo (mismo criterio que el resto del sitio: no inventar una fila vacía).
  ],
  // EEFF 2022 (estado-financiero-2022.md, OCR, SOLO estados principales transcriptos — ver
  // comentario de cabecera). "Otros ingresos deportivos" queda como un bolsón sin desglosar,
  // `lump_football_operations`. Suma = 89.052777 M PEN, EXACTO igual a "Ingresos" del Estado de
  // resultado integral 2022.
  2022: [
    { rawLabel:'Ingresos por derechos de transmisión televisiva', normalizedCategory:'broadcasting', amountNative:25.097040, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auspicios publicitarios', normalizedCategory:'sponsorship_commercial', amountNative:21.210888, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por participación en torneos internacionales', normalizedCategory:'competition_bonus', amountNative:15.460312, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos deportivos', normalizedCategory:'lump_football_operations', amountNative:27.284537, disclosureLevel:'not_disclosed' },
  ],
  // EEFF 2023 (estado-financiero-2023.md, OCR, solo estados principales). Aparece por primera vez
  // "Ingresos por participación en torneos nacionales" (línea nueva del propio documento, separada de
  // la de torneos internacionales). Suma = 108.214198 M PEN, EXACTO igual al Estado de resultados
  // integrales 2023.
  2023: [
    { rawLabel:'Ingresos por auspicios publicitarios', normalizedCategory:'sponsorship_commercial', amountNative:27.643857, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de transmisión televisiva', normalizedCategory:'broadcasting', amountNative:27.003971, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'lump_football_operations', amountNative:37.861997, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ingresos por participación en torneos internacionales', normalizedCategory:'competition_bonus', amountNative:12.941076, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por participación en torneos nacionales', normalizedCategory:'competition_bonus', amountNative:2.763297, disclosureLevel:'detailed' },
  ],
  // EEFF 2024 (estado-financiero-2024.md, OCR, solo estados principales). Suma = 120.465726 M PEN,
  // EXACTO igual al Estado de resultados integrales 2024 (Memoria Anual 2024).
  2024: [
    { rawLabel:'Otros ingresos', normalizedCategory:'lump_football_operations', amountNative:57.179317, disclosureLevel:'not_disclosed' },
    { rawLabel:'Ingresos por auspicios publicitarios', normalizedCategory:'sponsorship_commercial', amountNative:34.139985, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de transmisión televisiva', normalizedCategory:'broadcasting', amountNative:27.106486, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por participación en torneos internacionales', normalizedCategory:'competition_bonus', amountNative:1.836950, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por participación en torneos nacionales', normalizedCategory:'competition_bonus', amountNative:0.202988, disclosureLevel:'detailed' },
  ],
};

const alianzalimaPeExpenseLinesByYear = {
  // EEFF 2019. Nota 16 "Gastos deportivos" (Personal/Servicios/Depreciación/Diversos — sin
  // "Amortización" todavía, el intangible "Derechos federativos" recién aparece en el balance de
  // 2020) y Nota 17 "Gastos administrativos" (Personal/Servicios/Estimaciones contables/Diversos),
  // cada sub-ítem promovido a línea de primer nivel (categorías distintas entre sí). Suma total =
  // -46.494783 M PEN, EXACTO igual a "Gastos" del Estado de resultados integrales 2019
  // (38.945731+6.696803+0.852249).
  2019: [
    { rawLabel:'Personal (gastos deportivos)', normalizedCategory:'wages_squad', amountNative:-18.700778, disclosureLevel:'detailed' },
    { rawLabel:'Servicios (gastos deportivos)', normalizedCategory:'match_organisation_expense', amountNative:-15.145809, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación (gastos deportivos)', normalizedCategory:'depreciation', amountNative:-2.533594, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (gastos deportivos)', normalizedCategory:'other_expenses', amountNative:-2.565550, disclosureLevel:'detailed' },
    { rawLabel:'Personal (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-3.484002, disclosureLevel:'detailed' },
    { rawLabel:'Servicios (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-2.358920, disclosureLevel:'detailed' },
    { rawLabel:'Estimaciones contables (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-0.163419, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-0.690462, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-0.852249, disclosureLevel:'detailed' },
  ],
  // EEFF 2020. Nota 15/16, columna propia "2020". Suma = -47.452429 M PEN, EXACTO igual a "Gastos"
  // del Estado de resultados integrales 2020 (39.750555+6.473894+1.227980).
  2020: [
    { rawLabel:'Personal (gastos deportivos)', normalizedCategory:'wages_squad', amountNative:-18.711159, disclosureLevel:'detailed' },
    { rawLabel:'Servicios (gastos deportivos)', normalizedCategory:'match_organisation_expense', amountNative:-15.190865, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación (gastos deportivos)', normalizedCategory:'depreciation', amountNative:-3.564638, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (gastos deportivos, derechos federativos)', normalizedCategory:'player_amortisation', amountNative:-0.967114, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (gastos deportivos)', normalizedCategory:'other_expenses', amountNative:-1.316779, disclosureLevel:'detailed' },
    { rawLabel:'Personal (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-2.932057, disclosureLevel:'detailed' },
    { rawLabel:'Servicios (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-3.033907, disclosureLevel:'detailed' },
    { rawLabel:'Estimaciones contables (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-0.507930, disclosureLevel:'detailed' },
    // "Diversos (gastos administrativos)" dio 0 en 2020, no se carga una fila en 0 sin motivo.
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-1.227980, disclosureLevel:'detailed' },
  ],
  // EEFF 2021. Nota 15/16, columna propia "2021" (verificada exacta contra la comparativa del EEFF
  // 2022). Suma = -49.326371 M PEN, EXACTO igual a "Gastos" del Estado de resultados integrales 2021
  // (39.293039+7.165247+2.868085).
  2021: [
    { rawLabel:'Personal (gastos deportivos)', normalizedCategory:'wages_squad', amountNative:-22.084159, disclosureLevel:'detailed' },
    { rawLabel:'Servicios (gastos deportivos)', normalizedCategory:'match_organisation_expense', amountNative:-9.789858, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación (gastos deportivos)', normalizedCategory:'depreciation', amountNative:-3.002081, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (gastos deportivos, derechos federativos)', normalizedCategory:'player_amortisation', amountNative:-1.135495, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (gastos deportivos)', normalizedCategory:'other_expenses', amountNative:-3.281446, disclosureLevel:'detailed' },
    { rawLabel:'Personal (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-3.408437, disclosureLevel:'detailed' },
    { rawLabel:'Servicios (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-2.021474, disclosureLevel:'detailed' },
    { rawLabel:'Estimaciones contables (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-0.903427, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (gastos administrativos)', normalizedCategory:'admin_general_expense', amountNative:-0.831909, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-2.868085, disclosureLevel:'detailed' },
  ],
  // EEFF 2022 (solo estados principales transcriptos). "Costos deportivos" queda como bolsón sin
  // desglosar, `lump_football_operations_expense` (mismo criterio que usa River para su "Fútbol
  // profesional", ver data/river-data.js: el documento sí lo desglosaría en su Nota, pero esta
  // transcripción no llegó a esa página). Suma = -75.511252 M PEN, EXACTO igual a "Gastos" del
  // Estado de resultado integral 2022 (60.792598+8.734136+5.984518).
  2022: [
    { rawLabel:'Costos deportivos', normalizedCategory:'lump_football_operations_expense', amountNative:-60.792598, disclosureLevel:'not_disclosed' },
    { rawLabel:'Gastos administrativos', normalizedCategory:'admin_general_expense', amountNative:-8.734136, disclosureLevel:'not_disclosed' },
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-5.984518, disclosureLevel:'detailed' },
  ],
  // EEFF 2023 (solo estados principales). Suma = -100.961185 M PEN, EXACTO igual a "Costos y gastos"
  // del Estado de resultados integrales 2023 (80.506543+12.265510+8.189132).
  2023: [
    { rawLabel:'Costos deportivos', normalizedCategory:'lump_football_operations_expense', amountNative:-80.506543, disclosureLevel:'not_disclosed' },
    { rawLabel:'Gastos administrativos', normalizedCategory:'admin_general_expense', amountNative:-12.265510, disclosureLevel:'not_disclosed' },
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-8.189132, disclosureLevel:'detailed' },
  ],
  // EEFF 2024 (solo estados principales, Memoria Anual 2024). Suma = -119.800515 M PEN, EXACTO igual
  // a "Costos y gastos" del Estado de resultados integrales 2024 (92.697274+17.027913+10.075328).
  2024: [
    { rawLabel:'Costos deportivos', normalizedCategory:'lump_football_operations_expense', amountNative:-92.697274, disclosureLevel:'not_disclosed' },
    { rawLabel:'Gastos administrativos', normalizedCategory:'admin_general_expense', amountNative:-17.027913, disclosureLevel:'not_disclosed' },
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-10.075328, disclosureLevel:'detailed' },
  ],
};

// fiscalYearMeta: los 6 son ejercicios REALES (EEFF auditados), año calendario (1/1 a 31/12, ver
// fiscalYearStart:'01-01' en data/clubs.js). netInterest = "Gastos financieros, neto" + "Diferencia
// de cambio, neta" combinados (club-data-mapping sección 2: nunca van como línea, siempre netos en
// meta) — extraRows muestra los 2 componentes por separado para que la tabla "Estado de resultados"
// los distinga, igual que hace River. grossDebt = "Deuda concursal" (corriente + no corriente): es la
// única línea de pasivo que es deuda financiera de verdad (el resto — cuentas por pagar comerciales,
// impuestos por pagar, ingresos diferidos — es pasivo operativo, no deuda), mismo criterio que
// Boca/Vélez (club-data-mapping sección 14). cash = "Efectivo y equivalente de efectivo".
const alianzalimaPeFiscalYearMeta = {
  2019: {
    currency:'PEN', fx:3.314, fxSource:'document_close',
    // 3.314 = promedio de compra S/3.311 y venta S/3.317 al 31/12/2019, el tipo de cambio que el
    // PROPIO EEFF 2019 declara en su Nota "Riesgo de tipo de cambio" (SBS, promedio ponderado). El
    // documento da un rango compra/venta, no un valor único como los Anexos de River/Racing — se usó
    // el promedio de los dos a falta de otro precedente en el sitio para este caso puntual.
    sourceId:'alianzalima-pe-eeff-2019', reportType:'official_balance_sheet', gestionId:null,
    grossDebt:48.669842, cash:1.240650,
    profitOnPlayerSales:0, assetSales:0, netInterest:-1.457420, tax:0,
    extraRows: [
      {label:'Gastos financieros, neto', value:-1.602653},
      {label:'Diferencia de cambio, neta', value:0.145233},
    ],
    officialTotalRevenue:59.376339, officialTotalExpenses:46.494783, officialPAT:11.424136,
  },
  2020: {
    currency:'PEN', fx:3.621, fxSource:'document_close',
    // 3.621 = promedio de compra S/3.618 y venta S/3.624 al 31/12/2020, declarado por el propio EEFF
    // 2020 (misma Nota que 2019).
    sourceId:'alianzalima-pe-eeff-2020', reportType:'official_balance_sheet', gestionId:null,
    grossDebt:49.326356, cash:1.111894,
    profitOnPlayerSales:0, assetSales:0, netInterest:-2.112686, tax:0,
    extraRows: [
      {label:'Gastos financieros, neto', value:-1.230364},
      {label:'Diferencia de cambio, neta', value:-0.882322},
    ],
    officialTotalRevenue:44.948112, officialTotalExpenses:47.452429, officialPAT:-4.617003,
  },
  2021: {
    currency:'PEN', fx:3.9865, fxSource:'document_close',
    // 3.9865 = promedio de compra S/3.975 y venta S/3.998 al 31/12/2021, declarado por el propio EEFF
    // 2021 (misma Nota que 2019/2020).
    sourceId:'alianzalima-pe-eeff-2021', reportType:'official_balance_sheet', gestionId:null,
    grossDebt:54.907198, cash:2.118800,
    profitOnPlayerSales:0, assetSales:0, netInterest:-2.691774, tax:0,
    extraRows: [
      {label:'Gastos financieros, neto', value:-1.256711},
      {label:'Diferencia de cambio, neta', value:-1.435063},
    ],
    officialTotalRevenue:60.786207, officialTotalExpenses:49.326371, officialPAT:8.768062,
  },
  2022: {
    currency:'PEN', fxRef:'PEN@2022-12-31',
    // El EEFF 2022 transcripto no incluye la Nota de riesgo de tipo de cambio (solo se transcribieron
    // los 4 estados principales) — se usó la cotización de mercado de FX_CLOSE (data/currency-map.js).
    sourceId:'alianzalima-pe-eeff-2022', reportType:'official_balance_sheet', gestionId:null,
    grossDebt:50.038719, cash:6.131999,
    profitOnPlayerSales:0, assetSales:0, netInterest:-1.202567, tax:0,
    extraRows: [
      {label:'Gastos financieros, neto', value:-1.095609},
      {label:'Diferencia de cambio, neta', value:-0.106958},
    ],
    officialTotalRevenue:89.052777, officialTotalExpenses:75.511252, officialPAT:12.338958,
  },
  2023: {
    currency:'PEN', fxRef:'PEN@2023-12-31',
    // grossDebt: el propio EEFF 2023 no separa "Deuda concursal" como línea propia en su Estado de
    // situación financiera (aparece mezclada dentro de "Otras cuentas por pagar") — se usó el valor
    // de "Deuda concursal" que sí declara la comparativa "2023" del EEFF 2024 (Nota 13, más
    // desglosada), consistente con que ambos documentos deberían describir el mismo 31/12/2023.
    sourceId:'alianzalima-pe-eeff-2023', reportType:'official_balance_sheet', gestionId:null,
    grossDebt:47.027776, cash:3.371734,
    profitOnPlayerSales:0, assetSales:0, netInterest:-1.514391, tax:0,
    extraRows: [
      {label:'Ingresos y gastos financieros, neto', value:-0.687669},
      {label:'Diferencia de cambio, neta', value:-0.826722},
    ],
    officialTotalRevenue:108.214198, officialTotalExpenses:100.961185, officialPAT:5.738622,
  },
  2024: {
    currency:'PEN', fxRef:'PEN@2024-12-31',
    sourceId:'alianzalima-pe-eeff-2024', reportType:'official_balance_sheet', gestionId:null,
    grossDebt:47.233336, cash:2.709729,
    profitOnPlayerSales:0, assetSales:0, netInterest:-2.029833, tax:0,
    extraRows: [
      {label:'Ingresos y gastos financieros, neto', value:-1.810517},
      {label:'Diferencia de cambio, neta', value:-0.219316},
    ],
    officialTotalRevenue:120.465726, officialTotalExpenses:119.800515, officialPAT:-1.364622,
  },
};

const alianzalimaPePresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos verificados todavía para este club
// (fuera del alcance de esta sesión, que fue onboarding financiero). Mismo patrón que otros clubes
// recién onboardeados sin este trabajo hecho todavía (ver data/envigado-data.js).
const alianzalimaPePasesData = [];
const alianzalimaPeResultadosData = {};
const alianzalimaPeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['alianzalima-pe'] = {
  revenueLinesByYear: alianzalimaPeRevenueLinesByYear, expenseLinesByYear: alianzalimaPeExpenseLinesByYear,
  fiscalYearMeta: alianzalimaPeFiscalYearMeta, pasesData: alianzalimaPePasesData,
  resultadosData: alianzalimaPeResultadosData, titulosData: alianzalimaPeTitulosData,
  presupuestoOverlayByYear: alianzalimaPePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'alianzalima-pe-eeff-2019': {
      id:'alianzalima-pe-eeff-2019', clubId:'alianzalima-pe',
      title:'Estados Financieros, Club Alianza Lima, al 31 de diciembre de 2019 y 2018',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF auditados (NIIF) por TGS Sarrio & Asociados, dictamen sin salvedades (con párrafo de énfasis sobre el proceso concursal por insolvencia del club, ver Nota 1b). Transcripción con texto nativo (pdftotext -layout) en Clubes/Perú/Alianza Lima/estado-financiero-2019.md.',
    },
  'alianzalima-pe-eeff-2020': {
      id:'alianzalima-pe-eeff-2020', clubId:'alianzalima-pe',
      title:'Estados Financieros, Club Alianza Lima, al 31 de diciembre de 2020 y 2019',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF auditados (NIIF) por TGS Sarrio & Asociados, dictamen sin salvedades (mismo párrafo de énfasis sobre el proceso concursal). Documento escaneado, transcripción OCR (Tesseract, -l spa --psm 6) en Clubes/Perú/Alianza Lima/estado-financiero-2020.md — números verificados contra el tie-out de Ingresos/Gastos/Resultado operativo del propio documento.',
    },
  'alianzalima-pe-eeff-2021': {
      id:'alianzalima-pe-eeff-2021', clubId:'alianzalima-pe',
      title:'Estados Financieros, Club Alianza Lima, al 31 de diciembre de 2021 y 2020',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF auditados (NIIF) por Ropert, Sarrio y Asociados (mismo estudio, nueva razón social), dictamen sin salvedades. Transcripción con texto nativo en Clubes/Perú/Alianza Lima/estado-financiero-2021.md, columna 2021 verificada exacta contra la comparativa 2021 del EEFF 2022.',
    },
  'alianzalima-pe-eeff-2022': {
      id:'alianzalima-pe-eeff-2022', clubId:'alianzalima-pe',
      title:'Estados Financieros, Club Alianza Lima, al 31 de diciembre de 2022 y 2021',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF auditados (NIIF) por Panez, Chacaliaza y Asociados. Documento escaneado, transcripción OCR en Clubes/Perú/Alianza Lima/estado-financiero-2022.md — ESTA TRANSCRIPCIÓN SOLO CUBRE LOS 4 ESTADOS PRINCIPALES, no las notas explicativas (a diferencia de 2019-2021), así que "Otros ingresos deportivos" y "Costos deportivos" quedan sin desglosar en revenueLines/expenseLines (ver comentario de cabecera de este archivo).',
    },
  'alianzalima-pe-eeff-2023': {
      id:'alianzalima-pe-eeff-2023', clubId:'alianzalima-pe',
      title:'Estados Financieros, Club Alianza Lima, al 31 de diciembre de 2023 y 2022',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF auditados (NIIF). Documento escaneado de baja calidad (OCR con bastante ruido en las páginas de portada), transcripción en Clubes/Perú/Alianza Lima/estado-financiero-2023.md — igual que 2022, solo los 4 estados principales, sin notas. Deuda concursal de este ejercicio se tomó de la comparativa del EEFF 2024 (ver comentario en fiscalYearMeta[2023]).',
    },
  'alianzalima-pe-eeff-2024': {
      id:'alianzalima-pe-eeff-2024', clubId:'alianzalima-pe',
      title:'Estados Financieros, Club Alianza Lima, al 31 de diciembre de 2024 y 2023 (Memoria Anual 2024)',
      type:'official_balance_sheet', reliability:'primary',
      note:'EEFF auditados (NIIF), publicados dentro de la Memoria Anual 2024 del club. Documento escaneado, transcripción OCR en Clubes/Perú/Alianza Lima/estado-financiero-2024.md — igual que 2022/2023, solo los 4 estados principales, sin notas.',
    },
});

// gestionesByClub: sin entradas para este club (ver comentario de cabecera — el club está bajo
// administración concursal, no una presidencia electa, y no se investigó con confianza suficiente
// quién administraba cada ejercicio puntual como para armar una atribución por año).
gestionesByClub['alianzalima-pe'] = {};

memberCountByClub['alianzalima-pe'] = null;
