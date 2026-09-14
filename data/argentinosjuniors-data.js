// ============================================================================
// data/argentinosjuniors-data.js — Asociación Atlética Argentinos Juniors: 8vo club del motor
// genérico. 5 ejercicios cargados (2015 a 2019, 30/6 de cada año).
//
// BUG REAL ENCONTRADO Y CORREGIDO (sesión de onboarding posterior a la Versión 95): los 4
// ejercicios 2015-2018 estaban cargados desde "presentacion-asamblea-2018-2019.pdf" (comparativo
// de 5 años a la vez), pero ese documento dice EXPLÍCITAMENTE en su encabezado "(cifras en pesos
// AJUSTADAS POR INFLACIÓN)" — son pesos RESTATED a poder adquisitivo de una fecha posterior (no
// nominales), mientras que TODO el resto del sitio (todos los demás clubes/ejercicios) usa pesos
// NOMINALES tal cual los reporta el balance auditado de cada año. Esto se descubrió al OCRear
// balance-2017-2018.pdf (el balance auditado REAL de ese ejercicio) para agregar detalle: su
// Estado de Recursos y Gastos imprime TOTAL DE RECURSOS $610.699.504 para 2018, muy distinto de
// los $951.176.055 que decía la presentación restated. La nota 1.2 del balance 2018 confirma que
// NO se aplicó ajuste por inflación al ejercicio 2017/2018 (solo ajustes históricos de 1995 y
// 2002-2003) — o sea, el balance real es nominal, la presentación de asamblea NO lo es.
//
// FIX: se reemplazaron los 4 ejercicios (2015-2018) con datos extraídos de los 3 balances
// auditados reales vía OCR (Tesseract, 300dpi): `balance-2015-2016.pdf` (Ejercicio N°112, da 2016
// con detalle completo de Anexo IV/V + 2015 como comparativo), `balance-2016-2017.pdf` (Ejercicio
// N°113, da 2017 con detalle completo + 2016 comparativo) y `balance-2017-2018.pdf` (Ejercicio
// N°114, da 2018 con detalle completo + 2017 comparativo). Los 3 documentos se solapan en sus
// columnas comparativas, lo que permitió cruzar y confirmar cifras entre archivos distintos (ej.
// el TOTAL DEL PASIVO de 2017 sale idéntico calculado desde el balance de 2017 y desde el
// comparativo del balance de 2018). Regla aplicada: para cada año, se usó SIEMPRE el balance donde
// ese año es el "actual" (Anexo V da desglose completo por departamento), no la columna
// comparativa de un balance posterior (que a veces reclasifica algún rubro sin cambiar el total,
// ver nota de "Información comparativa" de cada balance) — el balance de 2015/2016 no existe en
// nuestro archivo descargado, así que 2015 SÍ se cargó desde la columna comparativa del balance
// 2015-2016 (único disponible), con el mismo criterio de "agregación honesta" que ya usa San
// Lorenzo 2014: revenue con detalle completo por rubro (Anexo IV siempre da ambos años en
// detalle), gastos SOLO al nivel de las 4 categorías agregadas (Anexo V solo desglosa por
// departamento el año "actual" de cada balance, 2015 nunca lo es en ninguno de los 3 archivos que
// tenemos).
//
// 2019 NO se tocó — sigue viniendo de la presentación de asamblea. Como esa presentación se
// preparó DESPUÉS del cierre del Ejercicio 2018/2019 (el más reciente de los 5), su columna 2019
// coincide (o casi) con pesos nominales de esa fecha — el ajuste por inflación restated hacia
// atrás afecta a los años VIEJOS (2015-2018), no al año base de la restatement. No hay un balance
// auditado real de 2018/2019 descargado para confirmarlo con certeza (el archivo
// "balance-2018-2019.pdf" es en realidad la Memoria narrativa, sin cifras) — documentado como
// incertidumbre en dudas-por-club.md, no se inventó nada nuevo para 2019.
//
// Categorización (misma lógica en los 3 años con detalle completo, 2016/2017/2018): Anexo IV
// (Recursos) da 4 subtablas (Fútbol profesional, Actividades deportivas y culturales, Socios,
// Diversos) con rubros por NATURALEZA — se categorizó cada rubro según su naturaleza real
// (Derechos de televisación->broadcasting, Esponsorización->sponsorship_commercial, Venta neta de
// jugadores/Valorización del plantel profesional/Derechos de formación->player_sales, etc.).
// "Actividades deportivas y culturales" agrupa ~15 disciplinas individuales (Básquet, Boxeo,
// Natación, etc.) que TODAS mapean a la misma categoría (other_sports) — se cargó como una sola
// línea agregada por año en vez de 15 líneas idénticamente categorizadas, no pierde información
// relevante para el sitio. Anexo V (Gastos) es una tabla cruzada rubro x departamento (Fútbol
// profesional/Actividades deportivas y culturales/Administración/Estadio y predios) — la mayoría
// de los rubros están concentrados en UN solo departamento (se cargan como 1 línea con la
// categoría de esa naturaleza); "Sueldos y cargas sociales" y "Viajes" SÍ se reparten entre varios
// departamentos en los 3 años, así que se cargaron como líneas separadas por departamento (Fútbol
// ->wages_squad, Actividades->youth_other_sports_expense, Administración->admin_general_expense,
// Estadio->match_organisation_expense), mismo mecanismo de columna-por-sector que Vélez/
// Instituto/Rosario Central/Estudiantes LP/San Lorenzo.
//
// Verificado línea por línea contra los totales impresos de cada Anexo antes de cargar (ver
// fiscalYearMeta de cada año). ÚNICA excepción, documentada, no inventada: el Anexo IV de 2016
// (`balance-2015-2016.pdf`, hoja 1/2) tiene un error aritmético propio del documento — sus 10
// líneas de "Fútbol profesional" suman $77.570.507 (verificado 2 veces, incluida una relectura
// visual de la imagen renderizada de la página para descartar error de OCR), pero el propio
// documento imprime "Total 77.550.507" para esa subtabla (y el Estado de Recursos y Gastos
// principal repite ese mismo 77.550.507) — una diferencia de $20.000 (0,03%) que no se pudo
// atribuir a una línea específica mal impresa. Se usó la suma verificada de las líneas reales
// como `officialTotalRevenue` (no el total impreso), documentado acá para que quede claro que no
// es un error de esta transcripción.
//
// grossDebt = Pasivo corriente + no corriente, EXCLUYENDO Previsiones cuando el balance de ESE
// año las desglosa por separado (2017 y 2018 sí lo hacen; 2016 y 2015, en sus propias
// presentaciones, no separan Previsiones de "Otras deudas" así que se usó el Total del Pasivo tal
// cual el documento lo imprime, sin restar nada que la fuente no desglosa — mismo criterio de "no
// inventar" que el resto del sitio). cash = Caja y bancos.
//
// FX: la fuente no declara tipo de cambio propio en ningún año (ninguno de los 3 balances reales
// tiene Anexo de moneda extranjera para pesos/dólares, solo notas puntuales de partidas en U$S/EUR
// sueltas) — se mantiene el dólar vendedor BNA de cierre de cada 30/6 ya investigado (datos.gob.ar/
// series): $9,085 (2015), $15,2 (2016), $16,8 (2017), $28,85 (2018), $42,45 (2019).
//
// Gestión: Cristian Malaspina, presidente desde 2015 (confirmado por búsqueda), reelecto en
// diciembre de 2019 y de nuevo en 2023. DUDA ABIERTA (ver dudas-por-club.md): no se confirmó el
// mes exacto de su primera asunción en 2015 — si fue después del cierre del Ejercicio 2015
// (30/6/2015), ese año en particular podría no caer bajo su gestión. Se mantiene gestionId:null
// para 2015 y gestionId:'malaspina' para 2016-2019, mismo criterio que antes del fix.
// ============================================================================

const argentinosJuniorsRevenueLinesByYear = {
  2015: [
    { rawLabel:'Cuotas sociales (socios simples)', normalizedCategory:'member_dues', amountNative:4.732401, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:14.485372, disclosureLevel:'detailed' },
    { rawLabel:'Esponsorización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:11.843750, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Copa Argentina', normalizedCategory:'competition_bonus', amountNative:0.898000, disclosureLevel:'detailed' },
    { rawLabel:'Partidos amistosos', normalizedCategory:'matchday_competition', amountNative:4.776750, disclosureLevel:'detailed' },
    { rawLabel:'Valorización del plantel profesional', normalizedCategory:'player_sales', amountNative:0.691712, disclosureLevel:'detailed' },
    { rawLabel:'Venta de entradas, plateas y palcos', normalizedCategory:'matchday_competition', amountNative:2.042117, disclosureLevel:'detailed' },
    { rawLabel:'Venta neta de jugadores', normalizedCategory:'player_sales', amountNative:20.399511, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (fútbol)', normalizedCategory:'other_income', amountNative:0.859329, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'other_sports', amountNative:7.504834, disclosureLevel:'detailed' },
    { rawLabel:'Socios (cuotas simples/adherentes + inscripciones)', normalizedCategory:'member_dues', amountNative:9.486436, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (alquileres, concesiones, etc.)', normalizedCategory:'other_income', amountNative:2.977440, disclosureLevel:'detailed' },
  ],
  2016: [
    { rawLabel:'Cuotas sociales (socios simples)', normalizedCategory:'member_dues', amountNative:4.400060, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'player_sales', amountNative:2.985280, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:28.431053, disclosureLevel:'detailed' },
    { rawLabel:'Esponsorización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:12.810709, disclosureLevel:'detailed' },
    { rawLabel:'Partidos amistosos', normalizedCategory:'matchday_competition', amountNative:6.160000, disclosureLevel:'detailed' },
    { rawLabel:'Valorización del plantel profesional', normalizedCategory:'player_sales', amountNative:0.501454, disclosureLevel:'detailed' },
    { rawLabel:'Venta de entradas, plateas y palcos', normalizedCategory:'matchday_competition', amountNative:1.470691, disclosureLevel:'detailed' },
    { rawLabel:'Venta neta de jugadores', normalizedCategory:'player_sales', amountNative:20.129026, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (fútbol)', normalizedCategory:'other_income', amountNative:0.682234, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'other_sports', amountNative:10.757903, disclosureLevel:'detailed' },
    { rawLabel:'Socios (cuotas simples/adherentes + inscripciones)', normalizedCategory:'member_dues', amountNative:10.397525, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (alquileres, concesiones, etc.)', normalizedCategory:'other_income', amountNative:6.318022, disclosureLevel:'detailed' },
  ],
  2017: [
    { rawLabel:'Cuotas sociales (socios simples)', normalizedCategory:'member_dues', amountNative:7.250611, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'player_sales', amountNative:9.503289, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:35.144032, disclosureLevel:'detailed' },
    { rawLabel:'Esponsorización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:16.174110, disclosureLevel:'detailed' },
    { rawLabel:'Resarcimiento por rescisión de contratos', normalizedCategory:'player_sales', amountNative:1.058150, disclosureLevel:'detailed' },
    { rawLabel:'Valorización del plantel profesional', normalizedCategory:'player_sales', amountNative:52.283226, disclosureLevel:'detailed' },
    { rawLabel:'Venta de entradas, plateas y palcos', normalizedCategory:'matchday_competition', amountNative:1.390504, disclosureLevel:'detailed' },
    { rawLabel:'Venta neta de jugadores', normalizedCategory:'player_sales', amountNative:10.048679, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (fútbol)', normalizedCategory:'other_income', amountNative:0.359877, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'other_sports', amountNative:15.742519, disclosureLevel:'detailed' },
    { rawLabel:'Socios (cuotas simples/adherentes + inscripciones)', normalizedCategory:'member_dues', amountNative:18.108523, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (alquileres, concesiones, etc.)', normalizedCategory:'other_income', amountNative:27.729052, disclosureLevel:'detailed' },
  ],
  2018: [
    { rawLabel:'Cuotas sociales (socios simples)', normalizedCategory:'member_dues', amountNative:10.226927, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'player_sales', amountNative:1.307848, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:51.835179, disclosureLevel:'detailed' },
    { rawLabel:'Esponsorización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:22.203228, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos otras competiciones', normalizedCategory:'competition_bonus', amountNative:0.960346, disclosureLevel:'detailed' },
    { rawLabel:'Resarcimiento por rescisión de contratos', normalizedCategory:'player_sales', amountNative:0.555867, disclosureLevel:'detailed' },
    { rawLabel:'Valorización del plantel profesional', normalizedCategory:'player_sales', amountNative:233.826918, disclosureLevel:'detailed' },
    { rawLabel:'Venta de entradas, plateas y palcos', normalizedCategory:'matchday_competition', amountNative:3.298819, disclosureLevel:'detailed' },
    { rawLabel:'Venta neta de jugadores', normalizedCategory:'player_sales', amountNative:226.354197, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (fútbol)', normalizedCategory:'other_income', amountNative:3.066992, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'other_sports', amountNative:17.467061, disclosureLevel:'detailed' },
    { rawLabel:'Socios (cuotas simples/adherentes + inscripciones)', normalizedCategory:'member_dues', amountNative:24.498092, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (alquileres, concesiones, etc.)', normalizedCategory:'other_income', amountNative:15.098030, disclosureLevel:'detailed' },
  ],
  2019: [
    { rawLabel:'Fútbol profesional', normalizedCategory:'lump_football_operations', amountNative:1033.075093, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'other_sports', amountNative:20.753946, disclosureLevel:'detailed' },
    { rawLabel:'Socios', normalizedCategory:'member_dues', amountNative:33.954376, disclosureLevel:'detailed' },
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:73.173983, disclosureLevel:'detailed' },
  ],
};

const argentinosJuniorsExpenseLinesByYear = {
  2015: [
    { rawLabel:'Fútbol profesional (sin desglosar por rubro, ver comentario de cabecera)', normalizedCategory:'lump_football_operations_expense', amountNative:-106.285897, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'youth_other_sports_expense', amountNative:-8.732963, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-13.821121, disclosureLevel:'detailed' },
    { rawLabel:'Estadio y predios', normalizedCategory:'match_organisation_expense', amountNative:-8.853987, disclosureLevel:'detailed' },
  ],
  2016: [
    { rawLabel:'Amortización de bienes intangibles', normalizedCategory:'player_amortisation', amountNative:-10.089964, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.572525, disclosureLevel:'detailed' },
    { rawLabel:'Gastos A.F.A.', normalizedCategory:'match_organisation_expense', amountNative:-0.498565, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-1.050312, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento y conservación', normalizedCategory:'admin_general_expense', amountNative:-2.366005, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de oficina', normalizedCategory:'admin_general_expense', amountNative:-0.333805, disclosureLevel:'detailed' },
    { rawLabel:'Gastos diversos', normalizedCategory:'other_expenses', amountNative:-6.813002, disclosureLevel:'detailed' },
    { rawLabel:'Gastos legales', normalizedCategory:'admin_general_expense', amountNative:-10.193171, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-1.178672, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios', normalizedCategory:'admin_general_expense', amountNative:-1.016110, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y concentración', normalizedCategory:'match_organisation_expense', amountNative:-2.050337, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos, tasas y contribuciones', normalizedCategory:'admin_general_expense', amountNative:-1.190260, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-1.839611, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos y transferencias de jugadores', normalizedCategory:'other_expenses', amountNative:-5.280408, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios', normalizedCategory:'wages_squad', amountNative:-6.565800, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-1.820259, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.482047, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-1.105336, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-40.472668, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Actividades deportivas y culturales)', normalizedCategory:'youth_other_sports_expense', amountNative:-17.708022, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Administración)', normalizedCategory:'admin_general_expense', amountNative:-4.222770, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Estadio y predios)', normalizedCategory:'match_organisation_expense', amountNative:-2.847292, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Fútbol profesional)', normalizedCategory:'match_organisation_expense', amountNative:-0.846633, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Administración)', normalizedCategory:'admin_general_expense', amountNative:-0.198128, disclosureLevel:'detailed' },
  ],
  2017: [
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-13.406325, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.506612, disclosureLevel:'detailed' },
    { rawLabel:'Desvalorización plantel', normalizedCategory:'player_impairment', amountNative:-17.463017, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-2.185298, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento y conservación', normalizedCategory:'admin_general_expense', amountNative:-2.607852, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de oficina', normalizedCategory:'admin_general_expense', amountNative:-1.677850, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de prensa', normalizedCategory:'admin_general_expense', amountNative:-1.089769, disclosureLevel:'detailed' },
    { rawLabel:'Gastos diversos', normalizedCategory:'other_expenses', amountNative:-5.082384, disclosureLevel:'detailed' },
    { rawLabel:'Gastos legales', normalizedCategory:'admin_general_expense', amountNative:-10.503443, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por venta de jugadores', normalizedCategory:'other_expenses', amountNative:-0.666667, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-3.346699, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios', normalizedCategory:'admin_general_expense', amountNative:-0.771942, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y concentración', normalizedCategory:'match_organisation_expense', amountNative:-2.250934, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos, tasas y contribuciones', normalizedCategory:'admin_general_expense', amountNative:-0.922162, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-4.387726, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos y transferencias de jugadores', normalizedCategory:'other_expenses', amountNative:-3.682601, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios', normalizedCategory:'wages_squad', amountNative:-7.985209, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-1.793272, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.374982, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-2.286152, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-36.312995, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Actividades deportivas y culturales)', normalizedCategory:'youth_other_sports_expense', amountNative:-22.849998, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Administración)', normalizedCategory:'admin_general_expense', amountNative:-7.287931, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Estadio y predios)', normalizedCategory:'match_organisation_expense', amountNative:-4.902985, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Fútbol profesional)', normalizedCategory:'match_organisation_expense', amountNative:-2.060799, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Administración)', normalizedCategory:'admin_general_expense', amountNative:-0.314093, disclosureLevel:'detailed' },
  ],
  2018: [
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-13.938250, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-0.605642, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de imagen', normalizedCategory:'wages_squad', amountNative:-3.405000, disclosureLevel:'detailed' },
    { rawLabel:'Desvalorización plantel', normalizedCategory:'player_impairment', amountNative:-3.405911, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-6.089395, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento y conservación', normalizedCategory:'admin_general_expense', amountNative:-5.419138, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de oficina', normalizedCategory:'admin_general_expense', amountNative:-0.843424, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de prensa', normalizedCategory:'admin_general_expense', amountNative:-0.744550, disclosureLevel:'detailed' },
    { rawLabel:'Gastos diversos', normalizedCategory:'other_expenses', amountNative:-1.664279, disclosureLevel:'detailed' },
    { rawLabel:'Gastos legales', normalizedCategory:'admin_general_expense', amountNative:-7.647056, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por venta de jugadores', normalizedCategory:'other_expenses', amountNative:-64.714770, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-6.881995, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios', normalizedCategory:'admin_general_expense', amountNative:-1.567242, disclosureLevel:'detailed' },
    { rawLabel:'Hospedaje y concentración', normalizedCategory:'match_organisation_expense', amountNative:-5.737351, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos, tasas y contribuciones', normalizedCategory:'admin_general_expense', amountNative:-2.617905, disclosureLevel:'detailed' },
    { rawLabel:'Organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-12.429345, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos y transferencias de jugadores', normalizedCategory:'other_expenses', amountNative:-18.571303, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios', normalizedCategory:'wages_squad', amountNative:-14.165999, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-3.610960, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.533417, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-3.320998, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-57.663711, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Actividades deportivas y culturales)', normalizedCategory:'youth_other_sports_expense', amountNative:-19.728118, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Administración)', normalizedCategory:'admin_general_expense', amountNative:-7.317549, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (Estadio y predios)', normalizedCategory:'match_organisation_expense', amountNative:-4.216407, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Fútbol profesional)', normalizedCategory:'match_organisation_expense', amountNative:-4.883119, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Actividades deportivas y culturales)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.248100, disclosureLevel:'detailed' },
    { rawLabel:'Viajes (Administración)', normalizedCategory:'admin_general_expense', amountNative:-0.444286, disclosureLevel:'detailed' },
  ],
  2019: [
    { rawLabel:'Fútbol profesional', normalizedCategory:'lump_football_operations_expense', amountNative:-951.379297, disclosureLevel:'detailed' },
    { rawLabel:'Actividades deportivas y culturales', normalizedCategory:'youth_other_sports_expense', amountNative:-49.480646, disclosureLevel:'detailed' },
    { rawLabel:'Administración', normalizedCategory:'admin_general_expense', amountNative:-59.619273, disclosureLevel:'detailed' },
    { rawLabel:'Estadio y predios', normalizedCategory:'admin_general_expense', amountNative:-35.314290, disclosureLevel:'detailed' },
  ],
};

const argentinosJuniorsFiscalYearMeta = {
  2015: {
    // Único disponible para 2015: columna comparativa del balance 2015-2016 (no hay balance
    // 2014-2015 en nuestro archivo) — revenue con detalle completo (Anexo IV siempre da ambos
    // años), gastos solo a nivel de las 4 categorías agregadas (Anexo V no desglosa el año
    // comparativo). SUPERÁVIT/DÉFICIT real: DÉFICIT $67.509.882 ARS (antes decía, con las cifras
    // restated, $228.557.786 — completamente distinto).
    currency:'ARS', fx:9.085, fxSource:'market_close', sourceId:'argentinosjuniors-balance-2015-2016',
    reportType:'official_balance_sheet', gestionId:null, // ver duda abierta en dudas-por-club.md
    grossDebt:200.426712, cash:1.105450,
    profitOnPlayerSales:0, assetSales:0, netInterest:-10.513566, tax:0,
    officialTotalRevenue:80.697652, officialTotalExpenses:137.693968, officialPAT:-67.509882,
  },
  2016: {
    // Balance 2015-2016 (Ejercicio N°112), año "actual" de ese archivo — detalle completo de
    // Anexo IV/V. OJO: el Anexo IV de este balance tiene un error aritmético propio (ver
    // comentario de cabecera) — sus 10 líneas de Fútbol profesional suman $77.570.507, pero el
    // documento imprime "Total 77.550.507" (usado también en el Estado de Recursos y Gastos
    // principal). officialTotalRevenue de acá usa la SUMA VERIFICADA de las líneas reales
    // ($105.043.957 = 77.570.507+10.757.903+10.397.525+6.318.022), $20.000 (0,02%) por encima del
    // total impreso por el propio documento ($105.023.957) — diferencia inmaterial, documentada,
    // no inventada.
    currency:'ARS', fx:15.2, fxSource:'market_close', sourceId:'argentinosjuniors-balance-2015-2016',
    reportType:'official_balance_sheet', gestionId:'malaspina',
    grossDebt:239.269605, cash:1.381149,
    profitOnPlayerSales:0, assetSales:0, netInterest:-8.989351, tax:0,
    officialTotalRevenue:105.043957, officialTotalExpenses:120.741702, officialPAT:-24.687096,
  },
  2017: {
    // Balance 2016-2017 (Ejercicio N°113), año "actual" de ese archivo — detalle completo de
    // Anexo IV/V, cruzado contra la columna comparativa del balance 2017-2018 (coincide exacto en
    // Total del Pasivo y en los totales de Recursos/Gastos). SUPERÁVIT real: $30.812.797 ARS.
    currency:'ARS', fx:16.8, fxSource:'market_close', sourceId:'argentinosjuniors-balance-2016-2017',
    reportType:'official_balance_sheet', gestionId:'malaspina',
    grossDebt:235.072669, cash:0.991633,
    profitOnPlayerSales:0, assetSales:0, netInterest:-7.260078, tax:0,
    officialTotalRevenue:194.792572, officialTotalExpenses:156.719697, officialPAT:30.812797,
  },
  2018: {
    // Balance 2017-2018 (Ejercicio N°114), año "actual" de ese archivo — detalle completo de
    // Anexo IV/V. SUPERÁVIT real: $318.336.988 ARS (antes decía, con las cifras restated,
    // $495.815.894 — completamente distinto, esto es lo que disparó el hallazgo del bug).
    currency:'ARS', fx:28.85, fxSource:'market_close', sourceId:'argentinosjuniors-balance-2017-2018',
    reportType:'official_balance_sheet', gestionId:'malaspina',
    grossDebt:232.933684, cash:0.837555,
    profitOnPlayerSales:0, assetSales:0, netInterest:-19.947296, tax:0,
    officialTotalRevenue:610.699504, officialTotalExpenses:272.415220, officialPAT:318.336988,
  },
  2019: {
    // NO tocado en el fix — sigue viniendo de presentacion-asamblea-2018-2019.pdf (ver comentario
    // de cabecera: al ser el año más reciente de esa presentación, su columna probablemente ya es
    // ~nominal, pero no hay balance auditado real de este ejercicio descargado para confirmarlo).
    currency:'ARS', fx:42.45, fxSource:'market_close', sourceId:'argentinosjuniors-presentacion-asamblea-2015-2019',
    reportType:'official_balance_sheet', gestionId:'malaspina',
    grossDebt:247.566408, cash:0,
    profitOnPlayerSales:0, assetSales:0, netInterest:54.110381, tax:0,
    officialTotalRevenue:1160.957398, officialTotalExpenses:1095.793506, officialPAT:119.274273,
  },
};

const argentinosJuniorsPasesData = [];
const argentinosJuniorsResultadosData = {};
const argentinosJuniorsTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.argentinosjuniors = {
  revenueLinesByYear: argentinosJuniorsRevenueLinesByYear, expenseLinesByYear: argentinosJuniorsExpenseLinesByYear,
  fiscalYearMeta: argentinosJuniorsFiscalYearMeta, pasesData: argentinosJuniorsPasesData,
  resultadosData: argentinosJuniorsResultadosData, titulosData: argentinosJuniorsTitulosData,
};


Object.assign(sources, {
  'argentinosjuniors-presentacion-asamblea-2015-2019': {
      id:'argentinosjuniors-presentacion-asamblea-2015-2019', clubId:'argentinosjuniors',
      title:'Presentación de Asamblea: Estados de Situación Patrimonial y de Resultados comparativos, Ejercicios 2015 a 2019 (30/6 de cada año)',
      type:'official_balance_sheet', reliability:'primary',
      publicNote:'Cifras tomadas de una presentación de asamblea, no de un balance completo: comparan cinco ejercicios a la vez, están agregadas en cuatro categorías y se expresan en pesos ajustados por inflación, no nominales.',
      note:'PDF oficial de 2 páginas (texto nativo) preparado para la asamblea del club, con las cifras COMPARATIVAS de los 5 ejercicios a la vez, EN PESOS AJUSTADOS POR INFLACIÓN (dice explícito "cifras en pesos ajustadas por inflación" en el propio título de cada cuadro) — NO son pesos nominales, a diferencia de todo el resto del sitio. Usado SOLO para el Ejercicio 2019 (el más reciente de la presentación, su columna es ~nominal ya que la restatement se hace hacia atrás desde el año más nuevo) — los ejercicios 2015 a 2018 se reemplazaron con datos reales de los balances auditados de cada año (ver las 3 fuentes de abajo y el comentario de cabecera de data/argentinosjuniors-data.js para el detalle completo del bug encontrado y corregido). El archivo "balance-2018-2019.pdf" del mismo club, a pesar del nombre, resultó ser la Memoria narrativa (sin una sola cifra contable), y no hay balance auditado real de 2018/2019 descargado — SUPERÁVIT 2019 $119.274.273 ARS sigue sin confirmar contra un documento primario propio.',
    },
  'argentinosjuniors-balance-2015-2016': {
      id:'argentinosjuniors-balance-2015-2016', clubId:'argentinosjuniors',
      title:'Estados Contables auditados, Ejercicio N°112 (1°/7/2015 al 30/6/2016)',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (39 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract). Da el Ejercicio 2016 con detalle completo de Anexo IV (Recursos por rubro)/Anexo V (Gastos por rubro x departamento) y el Ejercicio 2015 como comparativo (revenue con detalle completo, gastos solo a nivel de 4 categorías agregadas — Anexo V no desglosa el año comparativo). DÉFICIT real 2016: $(24.707.096) ARS. DÉFICIT real 2015: $(67.509.882) ARS. El Anexo IV de este balance tiene un error aritmético propio de $20.000 (0,02%) entre la suma de sus líneas de "Fútbol profesional" y su propio total impreso — verificado visualmente contra la imagen de la página, no es un error de transcripción (ver comentario de cabecera de data/argentinosjuniors-data.js). Convertido a USD con $15,2 (2016)/$9,085 (2015), dólar vendedor BNA de cierre investigado externamente (la fuente no declara tipo de cambio propio).',
    },
  'argentinosjuniors-balance-2016-2017': {
      id:'argentinosjuniors-balance-2016-2017', clubId:'argentinosjuniors',
      title:'Estados Contables auditados, Ejercicio N°113 (1°/7/2016 al 30/6/2017)',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (45 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract). Da el Ejercicio 2017 con detalle completo de Anexo IV/V. SUPERÁVIT real: $30.812.797 ARS. Cruzado contra la columna comparativa del balance 2017-2018 (mismo Total del Pasivo, $252.159.592, y mismos totales de Recursos/Gastos en ambos documentos). Convertido a USD con $16,8, dólar vendedor BNA de cierre investigado externamente.',
    },
  'argentinosjuniors-balance-2017-2018': {
      id:'argentinosjuniors-balance-2017-2018', clubId:'argentinosjuniors',
      title:'Estados Contables auditados, Ejercicio N°114 (1°/7/2017 al 30/6/2018)',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (31 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract). Da el Ejercicio 2018 con detalle completo de Anexo IV/V. SUPERÁVIT real: $318.336.988 ARS — este documento fue el que disparó el hallazgo del bug de pesos restated (su Total de Recursos real, $610.699.504, es muy distinto de los $951.176.055 que decía la presentación de asamblea para el mismo ejercicio). Convertido a USD con $28,85, dólar vendedor BNA de cierre investigado externamente.',
    },
});

gestionesByClub.argentinosjuniors = {
    // Confirmado por búsqueda (Versión 95): Cristian Malaspina presidente desde 2015, reelecto en
    // dic-2019 y de nuevo en 2023. Mes exacto de asunción en 2015 sin confirmar (ver duda abierta en
    // dudas-por-club.md) — por eso el Ejercicio 2015 (30/6/2015) quedó sin gestión asignada
    // (gestionId:null en data/argentinosjuniors-data.js), y esta entrada arranca en 2016.
    malaspina: { nombre:'Malaspina (2015-actual)', firstYear:2016, lastYear:2019 },
  };

memberCountByClub.argentinosjuniors = 20069; // AFA, 2026 (cobertura de prensa)

