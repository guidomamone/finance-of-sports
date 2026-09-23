// ============================================================================
// data/gimnasiaesgrima-ar-data.js — Club de Gimnasia y Esgrima La Plata (Asociación Civil, "el
// Lobo"). Club nuevo, primeros ejercicios cargados: 2023/2024/2025 (balances reales, 136°/137°/138°
// Ejercicio) + 2026 (presupuesto standalone, todavía sin balance real). Ver
// fuentes/Argentina/Gimnasia y Esgrima LP.md para cómo se encontraron los 9 documentos (2 hosts
// distintos: CDN de mailing para el 136°, wp-content del sitio para 137°/138°).
//
// ARQUITECTURA DEL EJERCICIO DUAL (Presupuesto Y Balance a la vez, ver club-or-year-onboarding
// SKILL.md sección 11): los 3 presupuestos descargados NO son del mismo ejercicio que el balance
// con el que vienen empaquetados en la nota de prensa — son el presupuesto aprobado para el año
// SIGUIENTE, en la misma asamblea que aprueba el balance del año que cierra (patrón común
// argentino). Confirmado leyendo el título de cada presupuesto ("PRESUPUESTO ECONOMICO DE RECURSOS
// Y GASTOS — EJERCICIO <N>"):
//   - presupuesto-2023-2024.pdf (venía con el 136°/2022-23) → Ejercicio 2023-2024 → overlay de 2024.
//   - presupuesto-2024-2025.pdf (venía con el 137°/2023-24) → Ejercicio 2024-2025 → overlay de 2025.
//   - presupuesto-2025-2026.pdf (venía con el 138°/2024-25) → Ejercicio 2025-2026 → STANDALONE 2026
//     (no hay balance real de este ejercicio todavía, es el futuro).
// Mapeo real, confirmado exacto contra el análisis de la tarea: 2023 = solo balance;
// 2024/2025 = balance real (primario) + overlay de presupuesto del mismo ejercicio; 2026 = solo
// presupuesto (fuente primaria de ese año, no hay overlay porque no hay balance al lado).
//
// ESTRUCTURA DEL DOCUMENTO (balances): a diferencia de Racing/Boca (una sola tabla de rubros
// transversal), Gimnasia reporta Recursos y Gastos por SECTOR/DEPARTAMENTO como eje de COLUMNAS
// (Fútbol Profesional, Deportes y Actividades Sociales, Jardín de Infantes y Escuela, Generales,
// Financieros y por Tenencia) cruzado con RUBRO como eje de FILAS (Anexo IV/V de Recursos/Gastos,
// numeración de Anexo varía por año) — mismo patrón de matriz 2 ejes que Vélez Sarsfield (ver
// club-data-mapping SKILL.md sección 14). Cuando una fila tiene columnas en más de un sector CON
// LA MISMA normalizedCategory (ej. "Derechos de Televisión" en Fútbol Profesional + Deportes), se
// cargó como UNA sola línea con el total combinado. Cuando los sectores de una fila mapean a
// categorías DISTINTAS (ej. "Sueldos y Cargas Sociales", "Varios", "Atención Médica"), se partió en
// una línea por sector, con el sector aclarado entre paréntesis en el rawLabel.
//
// CRITERIO DE SECTOR → CATEGORÍA usado en los 3 ejercicios (igual en los 3, no varía):
//   Fútbol Profesional → wages_squad (sueldos/primas/premios/médico/viáticos del plantel, mismo
//     criterio "CASO CONSULTADO" de club-data-mapping sección 13: costos no salariales del plantel
//     profesional se suman a wages_squad, como ya hace Racing/Boca 2027/Banfield/Talleres) o
//     player_amortisation/player_impairment/other_expenses según el concepto puntual (ver abajo).
//   Deportes y Actividades Sociales → youth_other_sports_expense (gasto) / other_sports (ingreso).
//   Jardín de Infantes y Escuela → education_expense (gasto) / education (ingreso).
//   Generales → admin_general_expense (gasto) / other_income (ingreso, salvo Cuotas Sociales →
//     member_dues, que también vive en Generales).
//   Financieros y por Tenencia → SIEMPRE a netInterest, nunca revenueLine/expenseLine (Intereses,
//     Diferencia de Cambio, Rendimiento Inversiones del lado de Ingresos; Intereses y Gastos
//     Financieros, Diferencia de Cambio del lado de Gastos). "Cargas Fiscales" es la EXCEPCIÓN: pese
//     a aparecer bajo la columna Financieros en el documento, es un impuesto (Impuesto a los
//     Débitos/Créditos Bancarios), así que sigue la regla fija de club-data-mapping sección 17
//     ("Impuestos → SIEMPRE admin_general_expense") en vez del criterio de columna.
//
// RECPAM (Resultado por Exposición al Cambio del Poder Adquisitivo de la Moneda): en el balance
// 2023 vivía DENTRO de Anexo IV (columna "Financieros y por Tenencia" de Ingresos); desde 2024 el
// documento lo separó como línea propia bajo "Superávit (Déficit) No Operativo", junto con
// Amortización/Depreciación. En los 3 años se sumó a netInterest (mismo criterio que RECPAM de
// Racing/River/Vélez/Estudiantes LP/Rosario Central/Banfield — ver club-data-mapping sección 2 y el
// comentario de cabecera de banfield-ar-data.js), NUNCA como revenueLine/expenseLine.
//
// "Incremento Valor Jugadores FP" (2.900,943865 M en 2024; 2.051,113616 M en 2025): fila NUEVA que
// no existía en el Anexo IV de 2023, sin sub-ítems ni nota que la explique. Por el nombre, podría
// ser una revaluación/reconocimiento no-cash del valor de jugadores formados en el club (ver Nota
// de "Jugadores formados en el Ente" del balance 2023, que capitaliza el costo de formación al
// firmar el primer contrato profesional) — pero no hay forma de confirmarlo con lo que dice el
// documento. Se cargó a `other_income` (no es `player_sales`: la línea de ventas reales ya existe
// aparte, "Ventas Jugadores") y quedó anotada en Admin/dudas-por-club.md para preguntarle al club
// qué es exactamente.
//
// "Entradas, Palcos y Plateas" / "Ingresos Partidos - Entradas, Palcos y Plateas": el documento NO
// separa recaudación por partido (matchday_competition) de abonos/plateas de temporada
// (season_tickets) en esta fila — es una sola cifra combinada. A diferencia de la fila separada "3.-
// Recursos por Venta de Abonos Estadio" de los PRESUPUESTOS (que SÍ es abono puro, cargada a
// `season_tickets`), esta fila del BALANCE se cargó entera a `matchday_competition` (single figure,
// sin forma de separar), documentado acá para que quede claro que no es un descarte sino una
// limitación real del documento.
//
// FX: los 3 balances declaran su Anexo de "Activos y Pasivos en Moneda Extranjera", pero con
// VARIAS cotizaciones distintas por línea (USD banco oficial/BNA vendedor vs. USD MEP, más EUR),
// no una única "TC de cierre". Se usó la cotización BNA (la que aplica a la mayoría de las líneas
// de deuda en USD: Mutuos USD BNA, Acreedores Varios USD, Convenio Deuda Jugadores, Otras deudas
// FP) como fx de cierre: 268,00 (30/6/2023), 932,50 (30/6/2024), 1.215,00 (30/6/2025) —
// fxSource:'document_close' en los 3. Ver el reporte de la sesión para la lista completa de
// cotizaciones que aparecen en cada Anexo (incluye MEP, que quedó SIN usar por ser una cotización
// secundaria/informal, no la de la mayoría de las líneas).
//
// Los 3 presupuestos (overlay 2024/2025 y standalone 2026) NO declaran ningún tipo de cambio propio
// (son documentos puramente en pesos, sin Anexo de moneda extranjera ni mención de "tipo de cambio
// de referencia" en ningún lado — se buscó explícito, ausente). CORREGIDO en la integración
// centralizada (2026-09-23): la primera versión de este archivo reusaba el `fx` document_close del
// BALANCE pareado para los 2 overlays, pero eso etiqueta mal la procedencia — `document_close`
// significa específicamente "ESTE documento lo declara", y el presupuesto no declara nada. Un
// documento que no declara TC y cuyo ejercicio ya cerró cae en la regla 1/2 de club-data-mapping
// SKILL.md sección 5: cotización de mercado a la fecha de CIERRE del ejercicio, exactamente lo que
// ya existía en FX_CLOSE (`ARS@2024-06-30`:909, `ARS@2025-06-30`:1203 — agregadas en la Versión 207
// para otro club, reusables sin tocar nada). Los 2 overlays quedaron entonces `fxSource:
// 'market_close'` con esas referencias, NO 'document_close'. Para el standalone 2026 (sin balance
// pareado del que tomar nada), se agregó `ARS@2026-06-30`:1482 a FX_CLOSE (dólar mayorista BCRA vía
// Rava) en esta misma sesión.
//
// TRANSCRIPCIÓN DE presupuesto-2024-2025.pdf: este PDF tiene capa de texto nativa pero con una
// fuente subseteada sin tabla ToUnicode para los montos/meses (`pdffonts` confirma `uni:no` en
// `NSTNKC+CIDFont+F2`), así que `pdftotext` devuelve Unicode incorrecto para esas celdas (rótulos de
// fila SÍ se leen bien, están en otra fuente). Se resolvió renderizando las páginas 2 y 3 a imagen
// (300dpi) y leyendo visualmente rótulo + columna "TOTAL PERÍODO" — ver la nota al principio de
// Clubes/Argentina/Gimnasia y Esgrima LP/presupuesto-2024-2025.md para la tabla completa decodificada
// y la cita de página exacta.
//
// VERIFICACIÓN (node, ver script de la sesión): los 3 balances y los 3 presupuestos (2 overlays +
// el standalone) cierran EXACTO (o con diferencia de $1 por redondeo) contra su propio Superávit/
// Déficit o Resultado Económico impreso — revenue + expenses + netInterest = PAT en los 6 casos.
//
// grossDebt: los 3 balances separan "Deudas" (Operativas/Fiscales/Sociales/Otras) de "Previsiones"
// (una previsión por contingencias judiciales, no deuda financiera) como líneas de pasivo
// DISTINTAS — se usó Total Pasivo MENOS Previsiones en los 3 años (mismo criterio que Boca/Vélez).
//
// Gestión: Mariano Cowen, Presidente, confirmado en la Comisión Directiva impresa de los balances
// 2023-24 y 2024-25 y en la firma de los 2 presupuestos de esos mismos ejercicios. El Ejercicio
// 2022-23 (136°) NO se le atribuyó gestión (gestionId:null): el propio balance (Nota 10, Hechos
// Posteriores) y el Informe de Auditoría (Fundamento de la opinión con salvedades) documentan que
// la Comisión Directiva cambió A MEDIADOS de ese ejercicio — el Presidente saliente, Gabriel Rubén
// Pellegrino, cedió los derechos de TV del club a sí mismo en un acuerdo de noviembre de 2022; la
// "actual Comisión Directiva" (Cowen) ya estaba en funciones para diciembre de 2022, cuando pidió la
// medida cautelar que revirtió esa cesión. Sin una fecha exacta de asunción, no hay forma de
// asignar con confianza quién presidió la MAYOR parte del ejercicio jul-2022/jun-2023.
//
// El balance 2022-23 tiene OPINIÓN CON SALVEDADES del auditor externo (ver
// Clubes/Argentina/Gimnasia y Esgrima LP/informe-auditoria-2022-2023.md): salvedad por la cesión de
// derechos de TV al ex-presidente y falta de documentación UIF, más párrafo de "incertidumbre
// significativa relacionada con empresa en funcionamiento" (sin modificar la opinión). El club está
// además en CONCURSO PREVENTIVO DE ACREEDORES desde 2017 (Nota 7 del balance 2022-23), vigente en
// los 3 ejercicios cargados. Ninguna de las 2 cosas cambia cómo se cargaron los números (los estados
// contables están igual certificados como razonables), pero se documenta acá porque explica varias
// líneas puntuales (Previsión por Contingencias, Rescisión Contratos, Hechos Posteriores).
//
// No se encontró una cifra de cantidad de socios en ninguno de los 9 documentos.
// ============================================================================

const gimnasiaesgrimaArRevenueLinesByYear = {
  // Ejercicio 136° (2022-23), balance-general-2022-2023.pdf (28 págs, texto nativo).
  2023: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:1163.587465, disclosureLevel:'detailed' },
    { rawLabel:'Venta Jugadores y Otros Ingresos Gestión', normalizedCategory:'player_sales', amountNative:1104.572985, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Televisión', normalizedCategory:'broadcasting', amountNative:806.093031, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:186.403703, disclosureLevel:'detailed' },
    { rawLabel:'Entradas, Palcos y Plateas', normalizedCategory:'matchday_competition', amountNative:375.945332, disclosureLevel:'detailed' },
    { rawLabel:'Competencias Copas Internacionales', normalizedCategory:'competition_bonus', amountNative:424.756899, disclosureLevel:'detailed' },
    { rawLabel:'Fundación ECDLP (subvención Fundación Estadio Ciudad de La Plata, Nota 4)', normalizedCategory:'stadium_other', amountNative:22.380430, disclosureLevel:'detailed' },
    { rawLabel:'Venta Merchandising', normalizedCategory:'other_income', amountNative:216.860037, disclosureLevel:'detailed' },
    { rawLabel:'Matrícula, Cuotas y Subvención (Jardín de Infantes y Escuela)', normalizedCategory:'education', amountNative:300.598003, disclosureLevel:'detailed' },
    { rawLabel:'Arancel Deportes', normalizedCategory:'other_sports', amountNative:80.571950, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres y Canon', normalizedCategory:'other_income', amountNative:36.481371, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_income', amountNative:94.377925, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Deportes y Actividades Sociales)', normalizedCategory:'other_sports', amountNative:89.592842, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Generales)', normalizedCategory:'other_income', amountNative:344.445824, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones', normalizedCategory:'other_income', amountNative:221.155346, disclosureLevel:'detailed' },
    // Intereses (37,543387), Diferencia de Cambio (19,989227), Rendimiento Inversiones (20,221026) y
    // RECPAM (1.556,386009) NO se cargan como líneas: van netos a fiscalYearMeta[2023].netInterest.
  ],
  // Ejercicio 137° (2023-24), balance-2023-2024.pdf (30 págs, texto nativo).
  2024: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:3932.260239, disclosureLevel:'detailed' },
    { rawLabel:'Incremento Valor Jugadores FP (ver comentario de cabecera, duda en Admin/dudas-por-club.md)', normalizedCategory:'other_income', amountNative:2900.943865, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Gestión de Futbol', normalizedCategory:'other_income', amountNative:1977.143294, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Jugadores', normalizedCategory:'player_sales', amountNative:5208.117402, disclosureLevel:'detailed' },
    { rawLabel:'Prestamos jugadores', normalizedCategory:'player_sales', amountNative:13.495962, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Televisión', normalizedCategory:'broadcasting', amountNative:2483.365334, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:644.976410, disclosureLevel:'detailed' },
    { rawLabel:'Entradas, Palcos y Plateas', normalizedCategory:'matchday_competition', amountNative:944.418376, disclosureLevel:'detailed' },
    { rawLabel:'Competencias Copas Internacionales', normalizedCategory:'competition_bonus', amountNative:297.945252, disclosureLevel:'detailed' },
    { rawLabel:'Fundación ECDLP (subvención Fundación Estadio Ciudad de La Plata, Nota 4)', normalizedCategory:'stadium_other', amountNative:59.490291, disclosureLevel:'detailed' },
    { rawLabel:'Venta Merchandising', normalizedCategory:'other_income', amountNative:916.807835, disclosureLevel:'detailed' },
    { rawLabel:'Matrícula, Cuotas y Subvención (Jardín de Infantes y Escuela)', normalizedCategory:'education', amountNative:1063.587888, disclosureLevel:'detailed' },
    { rawLabel:'Arancel Deportes', normalizedCategory:'other_sports', amountNative:229.208085, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres y Canon', normalizedCategory:'other_income', amountNative:82.598342, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_income', amountNative:12.208945, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Deportes y Actividades Sociales)', normalizedCategory:'other_sports', amountNative:259.330503, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Generales)', normalizedCategory:'other_income', amountNative:1078.209461, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones', normalizedCategory:'other_income', amountNative:95.726368, disclosureLevel:'detailed' },
    // Diferencia de Cambio (10.971,407854) y Rendimiento Inversiones (368,203928) del lado de
    // Ingresos, más Intereses y Gastos Financieros (474,167767) y Diferencia de Cambio
    // (5.033,858016) del lado de Gastos, más RECPAM (-2.543,491374, ya separado como línea propia
    // "No Operativo" por el propio documento este año): van netos a fiscalYearMeta[2024].netInterest.
  ],
  // Ejercicio 138° (2024-25), balance-2024-2025.pdf (31 págs, texto nativo).
  2025: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:6789.210138, disclosureLevel:'detailed' },
    { rawLabel:'Incremento Valor Jugadores FP (ver comentario de cabecera, duda en Admin/dudas-por-club.md)', normalizedCategory:'other_income', amountNative:2051.113616, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos Gestión de Futbol', normalizedCategory:'other_income', amountNative:2825.509837, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Jugadores', normalizedCategory:'player_sales', amountNative:7567.812997, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Televisión', normalizedCategory:'broadcasting', amountNative:4920.469608, disclosureLevel:'detailed' },
    { rawLabel:'Sponsor y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:997.980813, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Partidos - Entradas, Palcos y Plateas', normalizedCategory:'matchday_competition', amountNative:2668.557175, disclosureLevel:'detailed' },
    { rawLabel:'Competencias Copas Nacionales', normalizedCategory:'competition_bonus', amountNative:49.601509, disclosureLevel:'detailed' },
    { rawLabel:'Fundación Estadio CDLP', normalizedCategory:'stadium_other', amountNative:77.182479, disclosureLevel:'detailed' },
    { rawLabel:'Venta Merchandising', normalizedCategory:'other_income', amountNative:1125.370251, disclosureLevel:'detailed' },
    { rawLabel:'Matrícula, Cuotas y Subvención (Jardín de Infantes y Escuela)', normalizedCategory:'education', amountNative:1340.264486, disclosureLevel:'detailed' },
    { rawLabel:'Arancel Deportes', normalizedCategory:'other_sports', amountNative:433.693577, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres y Canon', normalizedCategory:'other_income', amountNative:39.392100, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_income', amountNative:41.312296, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Deportes y Actividades Sociales)', normalizedCategory:'other_sports', amountNative:184.854752, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Jardín de Infantes y Escuela)', normalizedCategory:'education', amountNative:11.312853, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Generales)', normalizedCategory:'other_income', amountNative:2066.761021, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones', normalizedCategory:'other_income', amountNative:0.077372, disclosureLevel:'detailed' },
    // Prestamos jugadores: $0 este ejercicio (no se carga fila en $0).
    // Intereses (64,068734), Diferencia de Cambio (4.119,615702) y Rendimiento Inversiones
    // (56,782596) del lado de Ingresos, más Intereses y Gastos Financieros (857,433660) y Diferencia
    // de Cambio (846,949226) del lado de Gastos, más "Resultado por Exposición al Cambio del Poder
    // Adquisitivo" (-499,920059, línea propia "No Operativo"): van netos a
    // fiscalYearMeta[2025].netInterest.
  ],
  // Ejercicio 2025-2026 (139°, TODAVÍA SIN balance real), presupuesto-2025-2026.pdf (5 págs, texto
  // nativo, fuentes Arial/WinAnsi normales — sin el problema de codificación del presupuesto
  // 2024-2025). Fuente PRIMARIA de este año (no hay balance al lado, ver comentario de cabecera).
  2026: [
    { rawLabel:'1.- Recursos por Venta de Entradas', normalizedCategory:'matchday_competition', amountNative:201.500000, disclosureLevel:'detailed' },
    { rawLabel:'2.- Recursos por Participación', normalizedCategory:'competition_bonus', amountNative:64.488827, disclosureLevel:'detailed' },
    { rawLabel:'3.- Recursos por Venta de Abonos Estadio', normalizedCategory:'season_tickets', amountNative:2707.860000, disclosureLevel:'detailed' },
    { rawLabel:'4.- Retransmisión y Derechos de TV', normalizedCategory:'broadcasting', amountNative:5978.502670, disclosureLevel:'detailed' },
    { rawLabel:'5.- Marketing y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:2408.584088, disclosureLevel:'detailed' },
    { rawLabel:'6.- Recursos por Venta de Jugadores', normalizedCategory:'player_sales', amountNative:7481.704120, disclosureLevel:'detailed' },
    { rawLabel:'7.- Recursos por Préstamo de Jugadores', normalizedCategory:'player_sales', amountNative:39.139076, disclosureLevel:'detailed' },
    { rawLabel:'8.- Derechos de Formación y Mecanismo de Solidaridad', normalizedCategory:'other_income', amountNative:507.353759, disclosureLevel:'detailed' },
    { rawLabel:'Recursos de Cuotas Sociales', normalizedCategory:'member_dues', amountNative:9816.214800, disclosureLevel:'detailed' },
    { rawLabel:'Recursos de Otras Actividades Deportivas', normalizedCategory:'other_sports', amountNative:1607.426740, disclosureLevel:'detailed' },
    { rawLabel:'Recursos de Instituciones Educativas', normalizedCategory:'education', amountNative:1942.542015, disclosureLevel:'detailed' },
    { rawLabel:'Otros Recursos Ordinarios', normalizedCategory:'other_income', amountNative:185.683838, disclosureLevel:'detailed' },
    // 9.- Otros Recursos de Gestión por Fútbol, Recursos Financieros y Recursos Extraordinarios: $0.
  ],
};

const gimnasiaesgrimaArExpenseLinesByYear = {
  2023: [
    { rawLabel:'Sueldos y Cargas Sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-1204.326656, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-356.865061, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Jardín de Infantes y Escuela)', normalizedCategory:'education_expense', amountNative:-296.979745, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Generales)', normalizedCategory:'admin_general_expense', amountNative:-402.222917, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y Premios', normalizedCategory:'wages_squad', amountNative:-644.742300, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Transferencias', normalizedCategory:'other_expenses', amountNative:-72.779252, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Partidos Oficiales', normalizedCategory:'match_organisation_expense', amountNative:-170.503865, disclosureLevel:'detailed' },
    { rawLabel:'Competencias Copas Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-134.262015, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-22.241150, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-24.999090, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Generales)', normalizedCategory:'admin_general_expense', amountNative:-2.633090, disclosureLevel:'detailed' },
    { rawLabel:'Rescisión Contratos', normalizedCategory:'player_impairment', amountNative:-399.292929, disclosureLevel:'detailed' },
    { rawLabel:'Movilidad, Viaticos, Hotelería', normalizedCategory:'wages_squad', amountNative:-309.042980, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-57.171544, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-183.189808, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Jardín de Infantes y Escuela)', normalizedCategory:'education_expense', amountNative:-67.197198, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Generales)', normalizedCategory:'admin_general_expense', amountNative:-474.227251, disclosureLevel:'detailed' },
    { rawLabel:'Costo Venta Merchandising', normalizedCategory:'other_expenses', amountNative:-74.822484, disclosureLevel:'detailed' },
    { rawLabel:'Costo Venta Lotes', normalizedCategory:'other_expenses', amountNative:-157.268641, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Fiscales', normalizedCategory:'admin_general_expense', amountNative:-41.860202, disclosureLevel:'detailed' },
    // Líneas propias fuera de "Gastos Ordinarios" (Estado de Recursos y Gastos, sección "No Operativo"):
    { rawLabel:'Amortización Activos Intangibles (Anexo I, derechos federativos)', normalizedCategory:'player_amortisation', amountNative:-390.134838, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación Bienes de Uso (Anexo II)', normalizedCategory:'depreciation', amountNative:-116.244010, disclosureLevel:'detailed' },
    // Intereses y Gastos Financieros (-215,830989) y Diferencia de Cambio (-2.033,296300) NO se
    // cargan como líneas: van netos a fiscalYearMeta[2023].netInterest.
  ],
  2024: [
    { rawLabel:'Sueldos y Cargas Sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-3010.525920, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-1489.570093, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Jardín de Infantes y Escuela)', normalizedCategory:'education_expense', amountNative:-1049.359147, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Generales)', normalizedCategory:'admin_general_expense', amountNative:-1389.789151, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y Premios', normalizedCategory:'wages_squad', amountNative:-2915.300197, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Transferencias', normalizedCategory:'other_expenses', amountNative:-1929.413931, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Partidos Oficiales', normalizedCategory:'match_organisation_expense', amountNative:-431.002147, disclosureLevel:'detailed' },
    { rawLabel:'Competencias Copas Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-11.860164, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-104.895475, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-132.006103, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Generales)', normalizedCategory:'admin_general_expense', amountNative:-9.451619, disclosureLevel:'detailed' },
    { rawLabel:'Rescisión Contratos', normalizedCategory:'player_impairment', amountNative:-231.096262, disclosureLevel:'detailed' },
    { rawLabel:'Movilidad, Viaticos, Hotelería', normalizedCategory:'wages_squad', amountNative:-2960.900856, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-344.992213, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-703.180087, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Jardín de Infantes y Escuela)', normalizedCategory:'education_expense', amountNative:-249.181263, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Generales)', normalizedCategory:'admin_general_expense', amountNative:-454.068434, disclosureLevel:'detailed' },
    { rawLabel:'Costo Venta Merchandising', normalizedCategory:'other_expenses', amountNative:-280.725532, disclosureLevel:'detailed' },
    { rawLabel:'Costo Venta Lotes', normalizedCategory:'other_expenses', amountNative:-66.550633, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Fiscales', normalizedCategory:'admin_general_expense', amountNative:-200.272569, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos Intangibles (Anexo I, derechos federativos)', normalizedCategory:'player_amortisation', amountNative:-3041.606930, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación Bienes de Uso (Anexo II)', normalizedCategory:'depreciation', amountNative:-415.599514, disclosureLevel:'detailed' },
    // Costo Cesión Der. Federativos: $0 este ejercicio (no se carga fila en $0).
    // Intereses y Gastos Financieros (-474,167767) y Diferencia de Cambio (-5.033,858016) NO se
    // cargan como líneas: van netos a fiscalYearMeta[2024].netInterest.
  ],
  2025: [
    { rawLabel:'Sueldos y Cargas Sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-4210.091766, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-2971.904922, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Jardín de Infantes y Escuela)', normalizedCategory:'education_expense', amountNative:-1343.265386, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Sociales (Generales)', normalizedCategory:'admin_general_expense', amountNative:-3789.071582, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y Premios', normalizedCategory:'wages_squad', amountNative:-3743.180357, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Transferencias', normalizedCategory:'other_expenses', amountNative:-3643.562124, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Partidos Oficiales', normalizedCategory:'match_organisation_expense', amountNative:-959.915457, disclosureLevel:'detailed' },
    { rawLabel:'Competencias Copas Nacionales e Internacionales', normalizedCategory:'match_organisation_expense', amountNative:-4.845190, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-200.170782, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-66.945612, disclosureLevel:'detailed' },
    { rawLabel:'Atención Médica (Generales)', normalizedCategory:'admin_general_expense', amountNative:-27.402503, disclosureLevel:'detailed' },
    { rawLabel:'Rescisión Contratos', normalizedCategory:'player_impairment', amountNative:-220.142362, disclosureLevel:'detailed' },
    { rawLabel:'Viaticos, Hotelería, Transporte', normalizedCategory:'wages_squad', amountNative:-659.720297, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Fútbol Profesional)', normalizedCategory:'other_expenses', amountNative:-2117.876534, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Deportes y Actividades Sociales)', normalizedCategory:'youth_other_sports_expense', amountNative:-1606.764891, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Jardín de Infantes y Escuela)', normalizedCategory:'education_expense', amountNative:-458.155030, disclosureLevel:'detailed' },
    { rawLabel:'Varios (Generales)', normalizedCategory:'admin_general_expense', amountNative:-1596.015287, disclosureLevel:'detailed' },
    { rawLabel:'Costo Venta y gastos Merchandising', normalizedCategory:'other_expenses', amountNative:-570.033681, disclosureLevel:'detailed' },
    { rawLabel:'Costo Venta Lotes', normalizedCategory:'other_expenses', amountNative:-6.926320, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Fiscales', normalizedCategory:'admin_general_expense', amountNative:-289.059076, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos Intangibles (Anexo I, derechos federativos)', normalizedCategory:'player_amortisation', amountNative:-2124.114987, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación Bienes de Uso (Anexo II)', normalizedCategory:'depreciation', amountNative:-595.297062, disclosureLevel:'detailed' },
    // Intereses y Gastos Financieros (-857,433660) y Diferencia de Cambio (-846,949226) NO se
    // cargan como líneas: van netos a fiscalYearMeta[2025].netInterest.
  ],
  // Ejercicio 2025-2026 (139°, TODAVÍA SIN balance real), presupuesto-2025-2026.pdf.
  2026: [
    { rawLabel:'1.- Gastos Explotación del Estadio', normalizedCategory:'match_organisation_expense', amountNative:-1862.750785, disclosureLevel:'detailed' },
    { rawLabel:'2.- Gastos por Participación', normalizedCategory:'match_organisation_expense', amountNative:-1308.020881, disclosureLevel:'detailed' },
    { rawLabel:'3.- Remuneraciones Plantel Profesional', normalizedCategory:'wages_squad', amountNative:-7676.700335, disclosureLevel:'detailed' },
    { rawLabel:'4.- Remuneraciones Cuerpo Técnico', normalizedCategory:'wages_squad', amountNative:-802.351759, disclosureLevel:'detailed' },
    { rawLabel:'5.- Otros Gastos Deportivos Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-3222.135036, disclosureLevel:'detailed' },
    { rawLabel:'7.- Gastos Relacionados por Venta de Jugadores', normalizedCategory:'other_expenses', amountNative:-479.135412, disclosureLevel:'detailed' },
    { rawLabel:'8.- Gastos por Préstamos de Jugadores Recibidos', normalizedCategory:'other_expenses', amountNative:-39.186491, disclosureLevel:'detailed' },
    { rawLabel:'9.- Gastos de Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-3148.846337, disclosureLevel:'detailed' },
    { rawLabel:'10.- Gastos de Comercialización', normalizedCategory:'admin_general_expense', amountNative:-996.425805, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones Otras Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-4208.438777, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Gastos Otras Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-2528.386638, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones de Instituciones Educativas', normalizedCategory:'education_expense', amountNative:-1647.275125, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Gastos de Instituciones Educativas', normalizedCategory:'education_expense', amountNative:-489.498119, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-3216.474959, disclosureLevel:'detailed' },
    // 6.- Costo de Venta de Jugadores y Gastos Extraordinarios: $0, no se cargan filas. Gastos
    // Financieros (-491,939500) va neto a netInterest, no es línea.
  ],
};

const gimnasiaesgrimaArFiscalYearMeta = {
  2023: {
    currency:'ARS', fx:268.00, fxSource:'document_close',
    sourceId:'gimnasiaesgrima-ar-balance-2022-2023',
    reportType:'official_balance_sheet', gestionId:null,
    // netInterest = Intereses (37,543387) + Diferencia de Cambio ingreso (19,989227) + Rendimiento
    // Inversiones (20,221026) + RECPAM (1.556,386009) − Intereses y Gastos Financieros (215,830989)
    // − Diferencia de Cambio gasto (2.033,296300) = -614,987640.
    netInterest:-614.987640, profitOnPlayerSales:0, assetSales:0, tax:0,
    // grossDebt = Total Pasivo (4.279,850248) − Previsiones (314,280088, Anexo III, no es deuda
    // financiera). cash = Caja y Bancos (Nota 3.1).
    grossDebt:3965.570160, cash:23.110860,
    officialTotalRevenue:5467.823142, officialTotalExpenses:5603.007025, officialPAT:-750.171524,
  },
  2024: {
    currency:'ARS', fx:932.50, fxSource:'document_close',
    sourceId:'gimnasiaesgrima-ar-balance-2023-2024',
    reportType:'official_budget_and_balance', gestionId:'cowen',
    // netInterest = Diferencia de Cambio ingreso (10.971,407854) + Rendimiento Inversiones
    // (368,203928) − Intereses y Gastos Financieros (474,167767) − Diferencia de Cambio gasto
    // (5.033,858016) − RECPAM (-2.543,491374, línea propia "No Operativo") = 3.288,094625.
    netInterest:3288.094625, profitOnPlayerSales:0, assetSales:0, tax:0,
    grossDebt:9628.914000, cash:194.383705,
    officialTotalRevenue:22199.833850, officialTotalExpenses:21421.348241, officialPAT:4066.580234,
  },
  2025: {
    currency:'ARS', fx:1215.00, fxSource:'document_close',
    sourceId:'gimnasiaesgrima-ar-balance-2024-2025',
    reportType:'official_budget_and_balance', gestionId:'cowen',
    // netInterest = Intereses (64,068734) + Diferencia de Cambio ingreso (4.119,615702) +
    // Rendimiento Inversiones (56,782596) − Intereses y Gastos Financieros (857,433660) − Diferencia
    // de Cambio gasto (846,949226) − Resultado por Exposición al Cambio del Poder Adquisitivo
    // (-499,920059, línea propia "No Operativo") = 2.036,164087.
    netInterest:2036.164087, profitOnPlayerSales:0, assetSales:0, tax:0,
    grossDebt:14125.318171, cash:228.738518,
    officialTotalRevenue:33190.476877, officialTotalExpenses:31204.461211, officialPAT:4022.179754,
  },
  2026: {
    // Presupuesto STANDALONE (Ejercicio 2025-2026, todavía sin balance real — ver comentario de
    // cabecera). El documento no declara tipo de cambio propio: dólar mayorista BCRA al 30/6/2026
    // (1.482, `ARS@2026-06-30` en FX_CLOSE, agregado en esta integración).
    currency:'ARS', fxRef:'ARS@2026-06-30', fxSource:'market_close',
    sourceId:'gimnasiaesgrima-ar-presupuesto-2025-2026',
    reportType:'official_budget', gestionId:'cowen',
    // netInterest = Recursos Financieros (0) − Gastos Financieros (491,939500) = -491,939500.
    netInterest:-491.939500, profitOnPlayerSales:0, assetSales:0, tax:0,
    // Sin balance real todavía: no hay grossDebt/cash de este ejercicio.
    // officialPAT NO se carga (presupuesto puro, sin balance auditado — mismo criterio que Racing
    // 2019/2026/2027, ver club-or-year-onboarding SKILL.md sección 3 punto 3).
    officialTotalRevenue:32940.999932, officialTotalExpenses:31625.626459,
  },
};

// gimnasiaesgrimaArPresupuestoOverlayByYear (ver club-or-year-onboarding SKILL.md sección 11): para
// los 2 ejercicios duales (2024/2025), el presupuesto de ESE MISMO ejercicio, usado solo para la
// columna "Presupuesto" de "Estado de resultados". fx: el presupuesto no declara TC propio, así que
// usa la cotización de mercado de FX_CLOSE a la fecha de cierre de ESE ejercicio (`market_close`,
// no `document_close` — ver comentario de cabecera), NO el TC declarado por el balance pareado.
const gimnasiaesgrimaArPresupuestoOverlayByYear = {
  // Ejercicio 2023-2024 (aprobado en la asamblea del 136°/2022-23): presupuesto-2023-2024.pdf,
  // 3 págs, texto nativo, desglose mensual jul-23 a jun-24 + columna Total Período.
  2024: {
    currency:'ARS', fxRef:'ARS@2024-06-30', fxSource:'market_close',
    sourceId:'gimnasiaesgrima-ar-presupuesto-2023-2024',
    revenueLines: [
      { rawLabel:'1.- Recursos por Venta de Entradas', normalizedCategory:'matchday_competition', amountNative:55.445314 },
      { rawLabel:'2.- Recursos por Participación', normalizedCategory:'competition_bonus', amountNative:18.000000 },
      { rawLabel:'3.- Recursos por Venta de Abonos Estadio', normalizedCategory:'season_tickets', amountNative:307.866379 },
      { rawLabel:'4.- Retransmisión y Derechos de TV', normalizedCategory:'broadcasting', amountNative:1380.582728 },
      { rawLabel:'5.- Marketing y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:565.143587 },
      { rawLabel:'6.- Recursos por Venta de Jugadores', normalizedCategory:'player_sales', amountNative:2794.933450 },
      { rawLabel:'8.- Derechos de Formación y Mecanismo de Solidaridad', normalizedCategory:'other_income', amountNative:3.997265 },
      { rawLabel:'9.- Otros Recursos de Gestión por Fútbol', normalizedCategory:'other_income', amountNative:1882.662660 },
      { rawLabel:'Recursos de Cuotas Sociales', normalizedCategory:'member_dues', amountNative:1704.899133 },
      { rawLabel:'Recursos de Otras Actividades Deportivas', normalizedCategory:'other_sports', amountNative:504.194883 },
      { rawLabel:'Recursos de Instituciones Educativas', normalizedCategory:'education', amountNative:544.784196 },
      { rawLabel:'Otros Recursos Ordinarios', normalizedCategory:'other_income', amountNative:122.589788 },
      // Recursos Financieros: a diferencia del BALANCE (donde este concepto va a netInterest, ver
      // club-data-mapping sección 2), en el OVERLAY se carga como línea normal — el overlay no
      // tiene su propio mecanismo de netInterest/extraRows (`presupuestoOverlayReportFor()`,
      // js/finanzas-calc.js: "el overlay no tiene su propio concepto de extraRows separado"), así
      // que excluirlo dejaría el Resultado Neto de la columna Presupuesto sin cerrar contra el
      // Resultado Económico impreso (mismo criterio ya usado en racingPresupuestoOverlayByYear
      // [2020], "Cobros por venta de inversiones financieras" -> other_income).
      { rawLabel:'Recursos Financieros', normalizedCategory:'other_income', amountNative:154.146731 },
      // Recursos por Préstamo de Jugadores y Recursos Extraordinarios: $0, no se cargan filas.
    ],
    expenseLines: [
      { rawLabel:'1.- Gastos Explotación del Estadio', normalizedCategory:'match_organisation_expense', amountNative:-708.470846 },
      { rawLabel:'2.- Gastos por Participación', normalizedCategory:'match_organisation_expense', amountNative:-209.935695 },
      { rawLabel:'3.- Remuneraciones Plantel Profesional', normalizedCategory:'wages_squad', amountNative:-959.520210 },
      { rawLabel:'4.- Remuneraciones Cuerpo Técnico', normalizedCategory:'wages_squad', amountNative:-578.535725 },
      { rawLabel:'5.- Otros Gastos Deportivos Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-574.892591 },
      { rawLabel:'6.- Costo de Venta de Jugadores', normalizedCategory:'player_amortisation', amountNative:-55.749224 },
      { rawLabel:'7.- Gastos Relacionados por Venta de Jugadores', normalizedCategory:'other_expenses', amountNative:-661.021060 },
      { rawLabel:'8.- Gastos por Préstamos de Jugadores Recibidos', normalizedCategory:'other_expenses', amountNative:-211.336125 },
      { rawLabel:'9.- Gastos de Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-514.603579 },
      { rawLabel:'10.- Gastos de Comercialización', normalizedCategory:'admin_general_expense', amountNative:-121.054758 },
      { rawLabel:'Remuneraciones Otras Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-695.324897 },
      { rawLabel:'Resto de Gastos Otras Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-203.122781 },
      { rawLabel:'Remuneraciones de Instituciones Educativas', normalizedCategory:'education_expense', amountNative:-514.770625 },
      { rawLabel:'Resto de Gastos de Instituciones Educativas', normalizedCategory:'education_expense', amountNative:-132.811453 },
      { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-899.449707 },
      // Gastos Financieros: línea normal por el mismo motivo que Recursos Financieros arriba
      // (mismo criterio que racingPresupuestoOverlayByYear[2020], "Pago de gastos financieros" ->
      // admin_general_expense).
      { rawLabel:'Gastos Financieros', normalizedCategory:'admin_general_expense', amountNative:-114.631443 },
      // Gastos Extraordinarios: $0, no se carga fila.
    ],
  },
  // Ejercicio 2024-2025 (aprobado en la asamblea del 137°/2023-24): presupuesto-2024-2025.pdf,
  // 4 págs, texto nativo con fuente rota para montos/meses (ver comentario de cabecera y la nota de
  // transcripción en el .md) — valores tomados de la lectura visual de la columna Total Período.
  2025: {
    currency:'ARS', fxRef:'ARS@2025-06-30', fxSource:'market_close',
    sourceId:'gimnasiaesgrima-ar-presupuesto-2024-2025',
    revenueLines: [
      { rawLabel:'1.- Recursos por Venta de Entradas', normalizedCategory:'matchday_competition', amountNative:146.912200 },
      { rawLabel:'2.- Recursos por Participación', normalizedCategory:'competition_bonus', amountNative:90.420892 },
      { rawLabel:'3.- Recursos por Venta de Abonos Estadio', normalizedCategory:'season_tickets', amountNative:1237.360000 },
      { rawLabel:'4.- Retransmisión y Derechos de TV', normalizedCategory:'broadcasting', amountNative:3536.236114 },
      { rawLabel:'5.- Marketing y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1671.999960 },
      { rawLabel:'6.- Recursos por Venta de Jugadores', normalizedCategory:'player_sales', amountNative:8244.410000 },
      { rawLabel:'8.- Derechos de Formación y Mecanismo de Solidaridad', normalizedCategory:'other_income', amountNative:99.354902 },
      { rawLabel:'9.- Otros Recursos de Gestión por Fútbol', normalizedCategory:'other_income', amountNative:272.951600 },
      { rawLabel:'Recursos de Cuotas Sociales', normalizedCategory:'member_dues', amountNative:6613.479222 },
      { rawLabel:'Recursos de Otras Actividades Deportivas', normalizedCategory:'other_sports', amountNative:1053.966726 },
      { rawLabel:'Recursos de Instituciones Educativas', normalizedCategory:'education', amountNative:1137.057902 },
      { rawLabel:'Otros Recursos Ordinarios', normalizedCategory:'other_income', amountNative:23.159001 },
      // Recursos por Préstamo de Jugadores, Recursos Financieros y Recursos Extraordinarios: $0.
    ],
    expenseLines: [
      { rawLabel:'1.- Gastos Explotación del Estadio', normalizedCategory:'match_organisation_expense', amountNative:-1361.042516 },
      { rawLabel:'2.- Gastos por Participación', normalizedCategory:'match_organisation_expense', amountNative:-549.817987 },
      { rawLabel:'3.- Remuneraciones Plantel Profesional', normalizedCategory:'wages_squad', amountNative:-4200.952278 },
      { rawLabel:'4.- Remuneraciones Cuerpo Técnico', normalizedCategory:'wages_squad', amountNative:-785.407700 },
      { rawLabel:'5.- Otros Gastos Deportivos Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-2095.447270 },
      { rawLabel:'7.- Gastos Relacionados por Venta de Jugadores', normalizedCategory:'other_expenses', amountNative:-2213.263345 },
      { rawLabel:'9.- Gastos de Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-1656.823778 },
      { rawLabel:'10.- Gastos de Comercialización', normalizedCategory:'admin_general_expense', amountNative:-478.208695 },
      { rawLabel:'Remuneraciones Otras Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-1842.764187 },
      { rawLabel:'Resto de Gastos Otras Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-908.065980 },
      { rawLabel:'Remuneraciones de Instituciones Educativas', normalizedCategory:'education_expense', amountNative:-1206.230365 },
      { rawLabel:'Resto de Gastos de Instituciones Educativas', normalizedCategory:'education_expense', amountNative:-270.104262 },
      { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-2358.079648 },
      // Gastos Financieros: línea normal, mismo motivo documentado en el overlay 2024 arriba (el
      // overlay no tiene su propio netInterest/extraRows).
      { rawLabel:'Gastos Financieros', normalizedCategory:'admin_general_expense', amountNative:-32.621198 },
      // Costo de Venta de Jugadores, Gastos por Préstamos de Jugadores Recibidos y Gastos
      // Extraordinarios: $0, no se cargan filas.
    ],
  },
};

// Los presupuestos de Gimnasia son tablas de rubros con desglose mensual, sin premisas
// macroeconómicas en prosa ni un waterfall de caja separado (Saldo Inicial+Ingresos-Egresos=Saldo
// Final aparte del cuerpo Recursos/Gastos) — no tienen el contenido narrativo que sí tienen los
// presupuestos de Racing/Boca. Igual que Newell's/Banfield/Talleres, se dejan vacíos.
const gimnasiaesgrimaArPresupuestoSupuestosByYear = {};
const gimnasiaesgrimaArPresupuestoFinancieroByYear = {};
const gimnasiaesgrimaArPresupuestoInversionesByYear = {};

const gimnasiaesgrimaArPasesData = [];
const gimnasiaesgrimaArResultadosData = {};
const gimnasiaesgrimaArTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['gimnasiaesgrima-ar'] = {
  revenueLinesByYear: gimnasiaesgrimaArRevenueLinesByYear, expenseLinesByYear: gimnasiaesgrimaArExpenseLinesByYear,
  fiscalYearMeta: gimnasiaesgrimaArFiscalYearMeta, pasesData: gimnasiaesgrimaArPasesData,
  resultadosData: gimnasiaesgrimaArResultadosData, titulosData: gimnasiaesgrimaArTitulosData,
  presupuestoOverlayByYear: gimnasiaesgrimaArPresupuestoOverlayByYear,
  presupuestoSupuestosByYear: gimnasiaesgrimaArPresupuestoSupuestosByYear,
  presupuestoFinancieroByYear: gimnasiaesgrimaArPresupuestoFinancieroByYear,
  presupuestoInversionesByYear: gimnasiaesgrimaArPresupuestoInversionesByYear,
};

Object.assign(sources, {
  'gimnasiaesgrima-ar-balance-2022-2023': {
    id:'gimnasiaesgrima-ar-balance-2022-2023', clubId:'gimnasiaesgrima-ar',
    title:'Balance General, 136° Ejercicio Económico (1°/7/2022 al 30/6/2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (28 páginas, texto nativo), publicado junto a la convocatoria a Asamblea General Ordinaria en gimnasia.org.ar (CDN de plataforma de mailing, myperfit.net). Informe de Auditoría con OPINIÓN CON SALVEDADES (cesión de derechos de TV al ex-presidente Gabriel Pellegrino sin documentación UIF; párrafo de incertidumbre por empresa en funcionamiento, sin modificar la opinión) — ver informe-auditoria-2022-2023.md. Club en concurso preventivo de acreedores desde 2017 (vigente). Comisión Directiva cambió a mediados de este ejercicio (Pellegrino → Cowen, nov/dic 2022): sin gestión asignada por esa ambigüedad. Tipo de cambio: no declara un único TC de cierre, sino varias cotizaciones por línea en su Anexo VI (USD BNA 268, USD MEP 484,69, EUR 291) — se usó 268 (BNA, la que aplica a la mayoría de la deuda en USD). Superávit/Déficit del Ejercicio real: -$750.171.524 ARS (déficit).',
  },
  'gimnasiaesgrima-ar-balance-2023-2024': {
    id:'gimnasiaesgrima-ar-balance-2023-2024', clubId:'gimnasiaesgrima-ar',
    title:'Balance General, 137° Ejercicio Económico (1°/7/2023 al 30/6/2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (30 páginas, texto nativo), publicado junto a la convocatoria a Asamblea General Ordinaria en gimnasia.org.ar/wp-content. Ejercicio dual: convive con gimnasiaesgrima-ar-presupuesto-2023-2024 (el presupuesto aprobado para ESTE mismo ejercicio, en la asamblea del 136° anterior), cargado como columna "Presupuesto" de comparación. Tipo de cambio de cierre declarado en Anexo VI: 932,50 (BNA, la cotización de la mayoría de la deuda en USD; MEP declaraba 1.347,96 ese mismo cierre, no usado). Superávit del Ejercicio real: $4.066.580.234 ARS.',
  },
  'gimnasiaesgrima-ar-balance-2024-2025': {
    id:'gimnasiaesgrima-ar-balance-2024-2025', clubId:'gimnasiaesgrima-ar',
    title:'Balance General, 138° Ejercicio Económico (1°/7/2024 al 30/6/2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (31 páginas, texto nativo), publicado junto a la convocatoria a Asamblea General Ordinaria en gimnasia.org.ar/wp-content. Ejercicio dual: convive con gimnasiaesgrima-ar-presupuesto-2024-2025 (el presupuesto aprobado para ESTE mismo ejercicio, en la asamblea del 137° anterior), cargado como columna "Presupuesto" de comparación. Tipo de cambio de cierre declarado en Anexo V: 1.215,00 (BNA; MEP declaraba 1.211,10 ese mismo cierre, prácticamente convergidas). Superávit del Ejercicio real: $4.022.179.754 ARS.',
  },
  'gimnasiaesgrima-ar-presupuesto-2023-2024': {
    id:'gimnasiaesgrima-ar-presupuesto-2023-2024', clubId:'gimnasiaesgrima-ar',
    title:'Presupuesto Económico de Recursos y Gastos, Ejercicio 2023-2024',
    type:'official_budget', reliability:'primary',
    note:'PDF oficial (3 páginas, texto nativo), aprobado en la Asamblea General Ordinaria del 136° Ejercicio (2022-23), publicado junto a ese balance. Desglose mensual jul-23 a jun-24 + columna Total Período. No declara tipo de cambio propio (documento puramente en pesos): la columna "Presupuesto" de Estado de resultados usa la cotización de mercado de FX_CLOSE al 30/6/2024 (909, market_close), no el TC declarado por el balance real de este mismo ejercicio. Resultado Económico del Período presupuestado: $2.884.015.397 ARS.',
  },
  'gimnasiaesgrima-ar-presupuesto-2024-2025': {
    id:'gimnasiaesgrima-ar-presupuesto-2024-2025', clubId:'gimnasiaesgrima-ar',
    title:'Presupuesto Económico de Recursos y Gastos, Ejercicio 2024-2025',
    type:'official_budget', reliability:'primary',
    note:'PDF oficial (4 páginas), aprobado en la Asamblea General Ordinaria del 137° Ejercicio (2023-24), publicado junto a ese balance. Capa de texto nativa pero con una fuente subseteada sin ToUnicode para montos/meses (pdftotext devuelve Unicode incorrecto en esas celdas, rótulos de fila sí se leen bien) — valores extraídos leyendo visualmente la página renderizada, ver nota al principio del .md transcripto. No declara tipo de cambio propio: la columna "Presupuesto" usa la cotización de mercado de FX_CLOSE al 30/6/2025 (1.203, market_close), no el TC declarado por el balance real de este mismo ejercicio. Resultado Económico del Período presupuestado: $4.168.479.311 ARS.',
  },
  'gimnasiaesgrima-ar-presupuesto-2025-2026': {
    id:'gimnasiaesgrima-ar-presupuesto-2025-2026', clubId:'gimnasiaesgrima-ar',
    title:'Presupuesto Económico de Recursos y Gastos, Ejercicio 2025-2026',
    type:'official_budget', reliability:'primary',
    note:'PDF oficial (5 páginas, texto nativo), aprobado en la Asamblea General Ordinaria del 138° Ejercicio (2024-25), publicado junto a ese balance. Ejercicio 2025-2026 TODAVÍA SIN balance real (es el más reciente, cerró 30/6/2026 pero el club no publicó su balance auditado todavía) — este presupuesto es la fuente PRIMARIA de este año, no un overlay. No declara tipo de cambio propio: cotización de mercado FX_CLOSE al 30/6/2026 (1.482, dólar mayorista BCRA vía Rava, market_close). Resultado Económico del Período presupuestado: $823.433.973 ARS.',
  },
});

gestionesByClub['gimnasiaesgrima-ar'] = {
  // Mariano Cowen, Presidente, confirmado en la Comisión Directiva impresa de los balances 2023-24
  // y 2024-25, y firmante de los presupuestos 2024-25 y 2025-26. Ejercicio 2022-23 (136°) queda
  // afuera a propósito: la Comisión Directiva cambió a mediados de ese ejercicio (ver comentario de
  // cabecera), sin fecha exacta de asunción no hay forma de atribuir con confianza quién presidió la
  // mayor parte del año.
  cowen: { nombre:'Cowen (2022-presente)', firstYear:2024, lastYear:2026 },
};

memberCountByClub['gimnasiaesgrima-ar'] = null; // no se encontró una cifra de socios en ningún documento
