// ============================================================================
// data/rosariocentral-data.js — Club Atlético Rosario Central: 6to club del motor genérico. Dos
// ejercicios cargados: 2022/2023 (1°/7/2022 al 30/6/2023) y 2024/2025 (1°/7/2024 al 30/6/2025, ver
// comentario propio más abajo), ambos balances auditados reales (Grant Thornton / Adler, Hasenclever
// y Asociados S.R.L.), ambos texto nativo. PDF + transcripción en
// Clubes/Argentina/Rosario Central/estados-contables-2022-2023.{pdf,md} y
// estados-contables-2024-2025.{pdf,md}. Falta el ejercicio 2023/2024 (ver fuentes/Argentina/Rosario
// Central.md).
//
// Estructura del documento (Anexo V "Recursos" / Anexo VI "Gastos"): cada rubro tiene una fila
// propia con un desglose por DEPARTAMENTO (Fútbol Profesional/Estadio/Ciudad Deportiva/Cruce
// Alberdi/Otras Disciplinas/Subsedes/Tiendas/Administración/Comisión Directiva/Socios/Judiciales/
// Guardería Náutica/Arroyo Seco) — mucho más granular que el Anexo III de Vélez/Instituto (19 filas
// x 8 columnas en Recursos, 38 filas x 13 columnas en Gastos). Para las 3 filas de personal (Sueldos,
// Cargas sociales, Primas) se aplicó el mismo criterio de columna-por-sector (Fútbol Profesional ->
// wages_squad, resto de columnas -> youth_other_sports_expense) que Vélez/Instituto. El resto de las
// ~35 filas (sin desglose salarial) se cargó con su propia columna Total, categorizada por la
// naturaleza del rubro (ver comentario en cada línea abajo), sin partir por departamento.
//
// VERIFICACIÓN QUE ENCONTRÓ Y CORRIGIÓ UN ERROR DE LECTURA: la suma de los 38 rubros de Gastos
// (Anexo VI) contra el "Total gastos ordinarios" impreso ($11.600.201.350) dio una diferencia de
// $201.178.171 en el primer intento — la fila "Préstamos" se había leído con Total=$418.582.883,
// mientras que su columna Fútbol Profesional (única columna con valor) daba $619.761.055. Usando
// $619.761.055 como Total de esa fila, la suma cierra exacta (diferencia de $1, redondeo). El
// `pdftotext -layout` desalinea columnas en tablas muy anchas con salto de línea — la fila entera es
// Fútbol Profesional, ninguna otra columna tiene valor. Ver club-data-mapping/SKILL.md sección 6
// para el criterio general ("si no cierra, buscar qué explica la diferencia antes de asumir nada").
//
// grossDebt: excluye "Previsiones" (Anexo III, contingencia por juicios, no deuda financiera real) —
// mismo criterio que Boca/Vélez/Instituto: Total del Pasivo (5.166,386522) - Previsiones
// (1.037,827336) = 4.128,559186 M.
//
// DUDA ABIERTA (ver Admin/dudas-por-club.md): el Anexo IV (moneda extranjera) declara DOS cotizaciones de
// USD distintas en el MISMO balance — $255,00 del lado del Activo (Caja y bancos) y $268,00 del lado
// del Pasivo (Acreedores varios fútbol). Se usó $255,00 (la que corresponde a "Caja y bancos", el
// campo que alimenta `cash`) como fx único del sitio, pero es una aproximación — el club claramente
// usa "comprador"/"vendedor" distinto según el rubro, y el sitio solo modela un fx por ejercicio.
//
// Gestión: Gonzalo Belloso asumió el 18/12/2022, a mitad de este ejercicio (1°/7/2022-30/6/2023) —
// se cargó bajo su gestión completa, mismo criterio que Berlanga/Rapisarda en Vélez (el ejercicio
// donde asume a mitad de año cae bajo la gestión nueva).
// ============================================================================

// ============================================================================
// EJERCICIO 2024/2025 (1°/7/2024 al 30/6/2025), agregado en sesión posterior. Balance auditado real
// (Grant Thornton / Adler, Hasenclever & Asociados S.R.L., informe 13/10/2025). PDF + transcripción en
// Clubes/Argentina/Rosario Central/estados-contables-2024-2025.{pdf,md} (41 págs, TEXTO NATIVO —
// la nota vieja de fuentes/Argentina/Rosario Central.md que decía "escaneo sin capa de texto" estaba
// mal, corregida).
//
// Estructura del documento (Anexo V "Recursos" / Anexo VI "Gastos"): esta vez agrupa en SOLO 6
// departamentos (Fútbol Profesional/Institucional/Fútbol Amateur ["Inferiores"]/Deportes ["Deporte
// Amateur"]/Tiendas/Guardería Náutica) — mucho MENOS granular que el Anexo V/VI del ejercicio 2022-23
// (que tenía 12+ columnas de departamento). Igual que en 2022-23, para las filas de personal
// ("Sueldos y cargas sociales") se aplicó columna-por-sector: Fútbol Profesional -> wages_squad, resto
// de columnas -> youth_other_sports_expense. "Primas" solo tenía valor en la columna Fútbol
// Profesional (el documento no desglosó primas por otro departamento este año), así que fue íntegro a
// wages_squad. Mismo criterio nuevo aplicado a INGRESOS: la fila "Ingresos por cuotas" mezclaba en una
// sola fila Institucional (cuotas sociales genuinas, 17.861,005014 M) + Deporte Amateur (504,929437 M)
// + Guardería Náutica (602,898123 M) — se separó en 3 líneas por columna-por-sector, mismo criterio
// que ya usa el ejercicio 2023 para "Abonos guardería náutica" (other_sports, no member_dues): la
// columna Institucional -> member_dues, las otras 2 (secciones recreativas, no fútbol) -> other_sports.
// El resto de filas (Recursos y Gastos) se cargó con su Total impreso, sin desglose por departamento,
// mismo criterio que usó 2022-23 para sus ~35 filas sin desglose salarial (el desglose de departamento
// no cambia la normalizedCategory de esas filas, así que perderlo en `items` no pierde información
// relevante para el motor genérico — la fila del PDF sigue citable 1:1 vía la transcripción .md).
//
// CATEGORÍAS SIN HOGAR CLARO EN category-map.js HOY (se dejaron en other_income/other_expenses,
// catch-all, sin tocar category-map.js — ver nota en la sesión que agregó este ejercicio):
// - "Ingresos por ventas tiendas" (3.880,592172 M) y su costo "Costo de mercadería vendida"
//   (2.673,789474 M): venta minorista de indumentaria/merchandising del club. No hay
//   `merchandise_sales`/`cost_of_goods_sold` en category-map.js, candidatas a agregar si más clubes
//   reportan una tienda con este volumen.
// - "Ingresos fútbol profesional" (2.732,084479 M): línea genérica sin más desglose en el documento
//   (a diferencia de TV/entradas/sponsors, que sí tienen su propia fila), fue a other_income.
// - "Gastos de fútbol profesional" (5.308,772334 M): mismo caso del lado de gastos, catch-all sin más
//   detalle en el documento, fue a other_expenses (NO a lump_football_operations_expense: esa
//   categoría es para cuando el departamento ENTERO no se desglosa, acá sí hay decenas de otras filas
//   de fútbol profesional desglosadas, esta es solo una línea residual del propio documento).
// - "Gastos bancarios y financieros" (889,618876 M) y "Gastos por comisiones pagadas"/"Gastos gestión
//   de socios"/"Gastos sistemas informáticos"/"Tasas e impuestos": a admin_general_expense (gastos de
//   funcionamiento administrativo, NO confundir con `netInterest` — el resultado financiero real del
//   ejercicio, RECPAM incluido, ya está separado como línea propia "RESULTADOS FINANCIEROS Y POR
//   TENENCIA NETOS" en el Estado de Recursos y Gastos, y se cargó en fiscalYearMeta.netInterest, no
//   acá).
// - "Quebranto por cuotas" (2.187,552982 M, incobrabilidad de cuotas sociales) y "Quebrantos por
//   previsión" (1.292,418614 M, aumento de la previsión para juicios del Anexo III — mismo concepto
//   que "Juicios (aumento de previsión)" del ejercicio 2023): ambos a other_expenses.
//
// VERIFICACIÓN: revenueLines suma exacto contra "Total recursos ordinarios" impreso
// (45.989,403491 M). expenseLines suma 58.497,629214 M contra "Total gastos ordinarios" impreso de
// 58.497,629215 M (diferencia de $1, redondeo del propio documento). revenue+expenses = -12.508,225723
// M contra "(DÉFICIT) OPERATIVO" impreso de -12.508,225724 M (diferencia de $1, mismo redondeo).
// +netInterest(-901,781813) = -13.410,007536 M, exacto contra "(DÉFICIT) DEL EJERCICIO" impreso
// ($(13.410.007.536)).
//
// fx: Anexo IV declara USD 1.165,00 del lado ACTIVO (Caja/Bancos/Deudores por fútbol, las 3 líneas en
// USD del activo corriente usan ese mismo valor) y USD 1.215,00 del lado PASIVO (Convenios y
// Acreedores por fútbol, corriente y no corriente). Se usó 1.165,00 (lado Activo/Créditos), mismo
// criterio ya establecido para Unión/Newell's. A diferencia del ejercicio 2022-23 (que tenía una duda
// abierta real por diferencia entre "Caja y bancos" vs. "Acreedores varios fútbol"), acá el lado Activo
// es un valor ÚNICO y consistente en sus 3 líneas, sin ambigüedad adicional.
//
// grossDebt: Total del Pasivo (38.552,024890) - Previsiones no corrientes/Anexo III (4.591,676771,
// contingencia por juicios, no deuda financiera real) = 33.960,348119 M. cash = Caja y bancos
// (271,773022 M, nota 4.a).
//
// assetSales: la fila "OTROS INGRESOS" del Estado de Recursos y Gastos (separada del cuerpo de
// Recursos Ordinarios, junto a "RESULTADOS FINANCIEROS...") vale $0 para el ejercicio 2025 (sí tenía
// $1.462.872.561 en la columna comparativa 2024, no se usa: ver regla de columna comparativa en
// club-data-mapping sección 6.5). Se dejó assetSales:0 para este ejercicio.
// ============================================================================

const rosarioCentralRevenueLinesByYear = {
  2023: [
    { rawLabel:'Emisión de cuotas mensuales', normalizedCategory:'member_dues', amountNative:2076.206694, disclosureLevel:'detailed' },
    { rawLabel:'Conscripción Socios', normalizedCategory:'member_dues', amountNative:0.014344, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión', normalizedCategory:'broadcasting', amountNative:814.423507, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales', normalizedCategory:'matchday_competition', amountNative:367.548178, disclosureLevel:'detailed' },
    { rawLabel:'Comercialización', normalizedCategory:'sponsorship_commercial', amountNative:249.284142, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:323.838454, disclosureLevel:'detailed' },
    { rawLabel:'Venta y préstamo de jugadores', normalizedCategory:'player_sales', amountNative:4348.286047, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación y mecanismos de solidaridad', normalizedCategory:'player_sales', amountNative:109.935115, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_income', amountNative:18.299684, disclosureLevel:'detailed' },
    { rawLabel:'Balneario y pileta', normalizedCategory:'other_sports', amountNative:56.654725, disclosureLevel:'detailed' },
    { rawLabel:'Abonos guardería náutica', normalizedCategory:'other_sports', amountNative:128.261093, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones', normalizedCategory:'other_income', amountNative:9.307793, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:29.676000, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y adicionales hoteles', normalizedCategory:'other_income', amountNative:0.549583, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por eventos', normalizedCategory:'other_income', amountNative:89.270069, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos regalías', normalizedCategory:'other_income', amountNative:2.809438, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:135.381638, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Ingresos abonos de platea y palcos', normalizedCategory:'season_tickets', amountNative:3167.828786, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos fondo organización partidos', normalizedCategory:'matchday_competition', amountNative:3560.440834, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos actividades sociales', normalizedCategory:'other_income', amountNative:88.434238, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos fútbol profesional', normalizedCategory:'other_income', amountNative:2732.084479, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por alquileres de inmuebles e instalaciones', normalizedCategory:'other_income', amountNative:57.246838, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por concesiones', normalizedCategory:'other_income', amountNative:173.384852, disclosureLevel:'detailed' },
    // "Ingresos por cuotas" del documento venía en 1 sola fila con 3 columnas de departamento —
    // separado por columna-por-sector (ver comentario de cabecera): Institucional = cuotas sociales
    // genuinas, Deporte Amateur/Guardería Náutica = abonos de secciones recreativas (mismo criterio
    // que "Abonos guardería náutica" del ejercicio 2023).
    { rawLabel:'Ingresos por cuotas (Institucional)', normalizedCategory:'member_dues', amountNative:17861.005014, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por cuotas (Deporte Amateur)', normalizedCategory:'other_sports', amountNative:504.929437, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por cuotas (Guardería Náutica)', normalizedCategory:'other_sports', amountNative:602.898123, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:5844.152621, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por organización de espectáculos y eventos', normalizedCategory:'other_income', amountNative:131.528448, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:3124.761134, disclosureLevel:'detailed' },
    // Sin categoría propia en category-map.js hoy (ver comentario de cabecera) — venta minorista de
    // indumentaria/merchandising del club.
    { rawLabel:'Ingresos por ventas tiendas', normalizedCategory:'other_income', amountNative:3880.592172, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:2011.625198, disclosureLevel:'detailed' },
    { rawLabel:'Venta de jugadores', normalizedCategory:'player_sales', amountNative:2248.491317, disclosureLevel:'detailed' },
  ],
};

const rosarioCentralExpenseLinesByYear = {
  2023: [
    // Anexo VI, 3 filas de personal separadas por columna de sector (Fútbol Profesional -> wages_squad,
    // resto de columnas -> youth_other_sports_expense), mismo criterio que Vélez/Instituto.
    { rawLabel:'Sueldos (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-321.831837, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos (resto de departamentos)', normalizedCategory:'youth_other_sports_expense', amountNative:-941.589958, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-56.521835, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (resto de departamentos)', normalizedCategory:'youth_other_sports_expense', amountNative:-266.696462, disclosureLevel:'detailed' },
    { rawLabel:'Primas (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-1107.149920, disclosureLevel:'detailed' },
    { rawLabel:'Primas (Otras Disciplinas)', normalizedCategory:'youth_other_sports_expense', amountNative:-3.145226, disclosureLevel:'detailed' },
    // Resto de Anexo VI, sin desglose salarial — su propia columna Total, por naturaleza del rubro.
    { rawLabel:'Costo por transferencias y bajas de derechos', normalizedCategory:'player_amortisation', amountNative:-3640.416289, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de intangibles (Anexo I)', normalizedCategory:'player_amortisation', amountNative:-1004.762266, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de contratación', normalizedCategory:'player_amortisation', amountNative:-559.757335, disclosureLevel:'detailed' },
    // Corregido: Total real de esta fila es la columna Fútbol Profesional ($619.761.055), no el
    // $418.582.883 que el layout de pdftotext desalineó — ver comentario de cabecera.
    { rawLabel:'Préstamos (de jugadores)', normalizedCategory:'player_amortisation', amountNative:-619.761055, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismos de formación pagados', normalizedCategory:'player_amortisation', amountNative:-14.923484, disclosureLevel:'detailed' },
    { rawLabel:'Premios y gratificaciones', normalizedCategory:'match_organisation_expense', amountNative:-102.144374, disclosureLevel:'detailed' },
    { rawLabel:'Campeonatos oficiales (gasto)', normalizedCategory:'match_organisation_expense', amountNative:-141.717321, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y comidas', normalizedCategory:'match_organisation_expense', amountNative:-184.143545, disclosureLevel:'detailed' },
    { rawLabel:'Equipos y útiles deportivos', normalizedCategory:'match_organisation_expense', amountNative:-22.928896, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-4.391479, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios profesionales', normalizedCategory:'admin_general_expense', amountNative:-142.370189, disclosureLevel:'detailed' },
    { rawLabel:'Franqueo y correspondencia', normalizedCategory:'admin_general_expense', amountNative:-2.363358, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de telefonía e internet', normalizedCategory:'admin_general_expense', amountNative:-2.077660, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por cobradores y comisiones tarjetas', normalizedCategory:'admin_general_expense', amountNative:-114.909671, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos, tasas y contribuciones', normalizedCategory:'admin_general_expense', amountNative:-82.854739, disclosureLevel:'detailed' },
    { rawLabel:'Libros, impresos y útiles', normalizedCategory:'admin_general_expense', amountNative:-11.035082, disclosureLevel:'detailed' },
    { rawLabel:'Prensa', normalizedCategory:'admin_general_expense', amountNative:-0.008827, disclosureLevel:'detailed' },
    { rawLabel:'Sistemas de computación', normalizedCategory:'admin_general_expense', amountNative:-31.835612, disclosureLevel:'detailed' },
    { rawLabel:'Asistencia médica y farmacéutica', normalizedCategory:'admin_general_expense', amountNative:-71.382180, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones de bienes de uso (Anexo II)', normalizedCategory:'depreciation', amountNative:-102.664906, disclosureLevel:'detailed' },
    { rawLabel:'Indemnizaciones', normalizedCategory:'other_expenses', amountNative:-38.871344, disclosureLevel:'detailed' },
    { rawLabel:'Movilidad y viáticos', normalizedCategory:'other_expenses', amountNative:-138.332497, disclosureLevel:'detailed' },
    { rawLabel:'Custodia y vigilancia', normalizedCategory:'other_expenses', amountNative:-228.862955, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (gasto)', normalizedCategory:'other_expenses', amountNative:-74.786599, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-77.537636, disclosureLevel:'detailed' },
    { rawLabel:'Agasajos, distinciones y homenajes', normalizedCategory:'other_expenses', amountNative:-16.197753, disclosureLevel:'detailed' },
    { rawLabel:'Balneario y pileta (gasto)', normalizedCategory:'other_expenses', amountNative:-6.843609, disclosureLevel:'detailed' },
    { rawLabel:'Costos de comercialización', normalizedCategory:'other_expenses', amountNative:-94.747012, disclosureLevel:'detailed' },
    { rawLabel:'Descuentos concedidos', normalizedCategory:'other_expenses', amountNative:-0.429998, disclosureLevel:'detailed' },
    { rawLabel:'Eventos (gasto)', normalizedCategory:'other_expenses', amountNative:-56.558474, disclosureLevel:'detailed' },
    { rawLabel:'Litigios judiciales pagados', normalizedCategory:'other_expenses', amountNative:-36.629662, disclosureLevel:'detailed' },
    { rawLabel:'Quebrantos por incobrabilidad', normalizedCategory:'other_expenses', amountNative:-59.066553, disclosureLevel:'detailed' },
    { rawLabel:'Reparación y mantenimiento', normalizedCategory:'other_expenses', amountNative:-182.815069, disclosureLevel:'detailed' },
    { rawLabel:'Seguros pagados', normalizedCategory:'other_expenses', amountNative:-16.567644, disclosureLevel:'detailed' },
    // Aumento de la previsión por juicios (Anexo III), mayormente en Fútbol Profesional — ordinario
    // según el propio Estado de Recursos y Gastos (no está en una sección de extraordinarios aparte).
    { rawLabel:'Juicios (aumento de previsión)', normalizedCategory:'other_expenses', amountNative:-1018.571040, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Alquileres pagados', normalizedCategory:'other_expenses', amountNative:-331.984056, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones bienes de uso', normalizedCategory:'depreciation', amountNative:-721.330912, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones intangibles', normalizedCategory:'player_amortisation', amountNative:-13044.055581, disclosureLevel:'detailed' },
    { rawLabel:'Asistencia médica y gastos de farmacia', normalizedCategory:'admin_general_expense', amountNative:-77.902286, disclosureLevel:'detailed' },
    // Sin categoría propia en category-map.js hoy (ver comentario de cabecera) — costo de la
    // mercadería vendida en tiendas del club.
    { rawLabel:'Costo de mercadería vendida', normalizedCategory:'other_expenses', amountNative:-2673.789474, disclosureLevel:'detailed' },
    // "Diferencia de inventario": $0 en el ejercicio 2025 (tenía $7.235.909 en la comparativa 2024),
    // omitida por no tener valor en el año corriente.
    { rawLabel:'Gastos bancarios y financieros', normalizedCategory:'admin_general_expense', amountNative:-889.618876, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de atenciones y agasajos', normalizedCategory:'other_expenses', amountNative:-141.801163, disclosureLevel:'detailed' },
    // Línea residual del propio documento (catch-all sin más desglose) — NO es
    // lump_football_operations_expense: el departamento Fútbol Profesional SÍ está desglosado en
    // decenas de otras filas de este mismo Anexo VI, esta es solo una línea más entre ellas.
    { rawLabel:'Gastos de fútbol profesional', normalizedCategory:'other_expenses', amountNative:-5308.772334, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de hospedaje y comida', normalizedCategory:'match_organisation_expense', amountNative:-465.062117, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de indumentaria, equipo', normalizedCategory:'match_organisation_expense', amountNative:-1011.790697, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de limpieza y desinfección', normalizedCategory:'other_expenses', amountNative:-377.178294, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de organización partido', normalizedCategory:'match_organisation_expense', amountNative:-2485.536021, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de reparación y mantenimiento', normalizedCategory:'other_expenses', amountNative:-1067.663346, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de servicios', normalizedCategory:'other_expenses', amountNative:-603.047731, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de vigilancia y custodia', normalizedCategory:'other_expenses', amountNative:-1154.258210, disclosureLevel:'detailed' },
    { rawLabel:'Gastos gestión de socios', normalizedCategory:'admin_general_expense', amountNative:-204.647285, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por comisiones pagadas', normalizedCategory:'admin_general_expense', amountNative:-413.818794, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por movilidad y viáticos', normalizedCategory:'other_expenses', amountNative:-1404.616695, disclosureLevel:'detailed' },
    { rawLabel:'Gastos sistemas informáticos', normalizedCategory:'admin_general_expense', amountNative:-263.918973, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-91.710129, disclosureLevel:'detailed' },
    // "Primas" solo tenía valor en la columna Fútbol Profesional este año (a diferencia de 2023, que
    // también tenía "Primas (Otras Disciplinas)").
    { rawLabel:'Primas (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-13694.932147, disclosureLevel:'detailed' },
    { rawLabel:'Quebranto por cuotas', normalizedCategory:'other_expenses', amountNative:-2187.552982, disclosureLevel:'detailed' },
    // Aumento de la previsión para juicios (Anexo III) — mismo concepto que "Juicios (aumento de
    // previsión)" del ejercicio 2023.
    { rawLabel:'Quebrantos por previsión', normalizedCategory:'other_expenses', amountNative:-1292.418614, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de catering', normalizedCategory:'match_organisation_expense', amountNative:-506.684077, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de terceros', normalizedCategory:'other_expenses', amountNative:-1438.051790, disclosureLevel:'detailed' },
    // Anexo VI, fila "Sueldos y cargas sociales" — columna-por-sector (Fútbol Profesional ->
    // wages_squad, resto de columnas -> youth_other_sports_expense), mismo criterio que 2023.
    { rawLabel:'Sueldos y cargas sociales (Fútbol Profesional)', normalizedCategory:'wages_squad', amountNative:-1393.219747, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (resto de departamentos)', normalizedCategory:'youth_other_sports_expense', amountNative:-5241.160002, disclosureLevel:'detailed' },
    { rawLabel:'Tasas e impuestos', normalizedCategory:'admin_general_expense', amountNative:-11.106881, disclosureLevel:'detailed' },
  ],
};

const rosarioCentralFiscalYearMeta = {
  2023: {
    // Ver DUDA ABIERTA en el comentario de cabecera: el balance declara $255 (Activo) y $268
    // (Pasivo) para USD en el mismo Anexo IV. Se usó $255 (coherente con `cash`, que sale de "Caja
    // y bancos").
    currency:'ARS', fx:255, fxSource:'document_close',
    sourceId:'rosariocentral-estados-contables-2022-23',
    reportType:'official_balance_sheet',
    gestionId:'belloso',
    // grossDebt = Total del Pasivo (5.166,386522) - Previsiones/Anexo III (1.037,827336, contingencia
    // por juicios, no deuda financiera real). cash = Caja y bancos.
    grossDebt:4128.559186, cash:42.788840,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia, netos, incluyendo RECPAM".
    netInterest:-266.766751, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
    // ordinarios" impresos (pág. 6). DÉFICIT DEL EJERCICIO real: $(3.107.221.597) ARS.
    officialTotalRevenue:8759.746504, officialTotalExpenses:11600.201350, officialPAT:-3107.221597,
  },
  2025: {
    // Anexo IV: USD 1.165,00 lado Activo (Caja/Bancos/Deudores por fútbol, valor único y consistente
    // en las 3 líneas), USD 1.215,00 lado Pasivo (Convenios/Acreedores). Se usó el lado Activo/
    // Créditos, mismo criterio que Unión/Newell's — ver comentario de cabecera.
    currency:'ARS', fx:1165, fxSource:'document_close',
    sourceId:'rosariocentral-estados-contables-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'belloso',
    // grossDebt = Total del Pasivo (38.552,024890) - Previsiones/Anexo III (4.591,676771,
    // contingencia por juicios, no deuda financiera real). cash = Caja y bancos.
    grossDebt:33960.348119, cash:271.773022,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia, netos, incluyendo RECPAM" (línea separada
    // del cuerpo de Recursos/Gastos Ordinarios en el Estado de Recursos y Gastos).
    netInterest:-901.781813, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
    // ordinarios" impresos (pág. 6/Anexos V-VI). DÉFICIT DEL EJERCICIO real: $(13.410.007.536) ARS.
    officialTotalRevenue:45989.403491, officialTotalExpenses:58497.629215, officialPAT:-13410.007536,
  },
};

const rosarioCentralPasesData = [];
const rosarioCentralResultadosData = {};
const rosarioCentralTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.rosariocentral = {
  revenueLinesByYear: rosarioCentralRevenueLinesByYear, expenseLinesByYear: rosarioCentralExpenseLinesByYear,
  fiscalYearMeta: rosarioCentralFiscalYearMeta, pasesData: rosarioCentralPasesData,
  resultadosData: rosarioCentralResultadosData, titulosData: rosarioCentralTitulosData,
};


Object.assign(sources, {
  'rosariocentral-estados-contables-2022-23': {
      id:'rosariocentral-estados-contables-2022-23', clubId:'rosariocentral',
      title:'Estados Contables (balance auditado), Ejercicio 1°/7/2022 al 30/6/2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://rosariocentral.com/wp-content/uploads/2023/10/EECC-Club-Atletico-Rosario-Central-e-Informe-del-auditor-30.06.2023-Firma-FT-1-1-1.pdf',
      note:'PDF oficial (43 páginas, texto nativo), auditado por Adler, Hasenclever y Asociados S.R.L. (Grant Thornton), informe de fecha 11/10/2023. DÉFICIT real del ejercicio: $(3.107.221.597) ARS. El Anexo IV (moneda extranjera) declara DOS cotizaciones de USD distintas en el mismo balance ($255 lado Activo, $268 lado Pasivo) — se usó $255 (coherente con "Caja y bancos"), ver duda abierta en Admin/dudas-por-club.md. Se corrigió una diferencia de $201.178.171 al verificar la suma de Gastos contra el total impreso: la fila "Préstamos" del Anexo VI se había leído con el valor equivocado por desalineación de columnas de pdftotext en una tabla muy ancha — ver comentario completo en data/rosariocentral-data.js.',
    },
  'rosariocentral-estados-contables-2024-25': {
      id:'rosariocentral-estados-contables-2024-25', clubId:'rosariocentral',
      title:'Estados Contables (balance auditado), Ejercicio 1°/7/2024 al 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://rosariocentral.com/wp-content/uploads/2025/10/Balance.pdf',
      note:'PDF oficial (41 páginas, TEXTO NATIVO — a pesar de que la nota de sourcing decía "escaneo", se verificó con pdftotext -layout y tiene texto extraíble completo), auditado por Adler, Hasenclever & Asociados S.R.L. (Grant Thornton), informe de fecha 13/10/2025, Ejercicio Económico N° 136. DÉFICIT real del ejercicio: $(13.410.007.536) ARS. El Anexo IV declara USD 1.165,00 lado Activo (Caja/Bancos/Deudores por fútbol) y USD 1.215,00 lado Pasivo (Acreedores) — se usó 1.165 (lado Activo/Créditos). "Ingresos por cuotas" y "Sueldos y cargas sociales" se separaron por columna-por-sector (Institucional/Fútbol Profesional vs. resto de departamentos) — ver comentario completo en data/rosariocentral-data.js.',
    },
});

gestionesByClub.rosariocentral = {
    // Confirmado por búsqueda (Versión 95) y reconfirmado en el propio documento del ejercicio
    // 2024/2025 (pág. 3, "Composición de la Comisión Directiva... al 30 de junio de 2025", Presidente:
    // Sr. Belloso Gonzalo Luis): Gonzalo Belloso asumió el 18/12/2022 y sigue en el cargo al cierre de
    // este ejercicio.
    belloso: { nombre:'Belloso (2022-actual)', firstYear:2023, lastYear:2025 },
  };

memberCountByClub.rosariocentral = 96000; // "más de 96.000 socios" (sitio oficial vía cobertura de prensa, 2025-26)

