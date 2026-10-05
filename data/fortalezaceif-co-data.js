// ============================================================================
// data/fortalezaceif-co-data.js — FORTALEZA FUTBOL CLUB S.A. (Colombia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-02), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "fortalezaceif-co" — slug de "Fortaleza CEIF" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "FORTALEZA FUTBOL CLUB S.A." — el .md, 31 veces (nombre del club + forma societaria)
//   displayName        ok        "Fortaleza CEIF" — nombre de la carpeta del club en Clubes/
//   country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
//   reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (87 de 87 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 51 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] fortaleza ceif: #16233D dark navy, #FFFFFF white, #BC183D crimson red
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (87 de 87 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
//   currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
//   fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 1 línea(s), pero ninguno es una cotización plausible (descartadas por traer en su frase otra fec
//   fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
//   sourceId           ok        "fortalezaceif-co-estados-financieros-2025" — clubId + nombre del archivo en slug
//   liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Fortaleza" = "Fortaleza CEIF"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"fortalezaceif-co-estados-financieros-2025"}
// ============================================================================

const fortalezaceifcoRevenueLinesByYear = {
  // 2017: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2018: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Actividades Deportivas', normalizedCategory:'lump_football_operations', amountNative:5867.804, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:1.004, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.95
    { rawLabel:'Venta de Productos', normalizedCategory:'sponsorship_commercial', amountNative:535.273, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Servicio de Evaluación', normalizedCategory:'other_income', amountNative:6.029, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.96
    { rawLabel:'Venta Boletería', normalizedCategory:'matchday_competition', amountNative:10.93, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Devoluciones en Ventas', normalizedCategory:'other_income', amountNative:-0.076, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.99
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Venta De Derechos Deportivos', normalizedCategory:'player_sales', amountNative:1096.48, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.99
    { rawLabel:'Derechos De Televisión Nacional', normalizedCategory:'broadcasting', amountNative:827.456, disclosureLevel:'aggregated' }, // pág. 21, Jev 1
    { rawLabel:'Venta De Boletería', normalizedCategory:'matchday_competition', amountNative:467.677, disclosureLevel:'aggregated' }, // pág. 21, Jev 1
    { rawLabel:'Auxilio Hotelero', normalizedCategory:'competition_bonus', amountNative:112.286, disclosureLevel:'aggregated' }, // pág. 21, Claude 0.93
    { rawLabel:'Infraestructura', normalizedCategory:'other_income', amountNative:94, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.95
    { rawLabel:'Auxilio Arbitraje', normalizedCategory:'competition_bonus', amountNative:54.063, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.91
    { rawLabel:'Aux Mejoramiento De Gestión Organizacional Clubes', normalizedCategory:'other_income', amountNative:27.273, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.96
    { rawLabel:'Auxilio Análisis Deportivo', normalizedCategory:'other_income', amountNative:21, disclosureLevel:'aggregated' }, // pág. 21, precedente
    { rawLabel:'Auxilio Transporte', normalizedCategory:'other_income', amountNative:20.683, disclosureLevel:'aggregated' }, // pág. 21, precedente
    { rawLabel:'Federación Colombiana De Futbol', normalizedCategory:'competition_bonus', amountNative:19.038, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.97
    { rawLabel:'Convenio Entre Clubes', normalizedCategory:'other_income', amountNative:16.807, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.96
    { rawLabel:'Propaganda Y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:0.3, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.99
    { rawLabel:'Venta De Indumentaria', normalizedCategory:'sponsorship_commercial', amountNative:214.991, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
    { rawLabel:'Devoluciones De Productos Comercializados', normalizedCategory:'sponsorship_commercial', amountNative:-1.176, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Por Incumplimiento De Contratos', normalizedCategory:'other_income', amountNative:265.62, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Arrendamientos De Inmuebles', normalizedCategory:'other_income', amountNative:150.073, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.88
    { rawLabel:'Intereses Por Mora', normalizedCategory:'other_income', amountNative:55.745, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Diferencia En Cambio', normalizedCategory:'other_income', amountNative:13.229, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:5.499, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Reintegro De Otros Costos Y Gastos', normalizedCategory:'other_income', amountNative:2.052, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:0.84, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.95
    { rawLabel:'Ajuste Al Peso', normalizedCategory:'other_income', amountNative:0.011, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Derechos de televisión nacional', normalizedCategory:'broadcasting', amountNative:1278.52, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:114.8, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.97
    { rawLabel:'Auxilio hotelero', normalizedCategory:'competition_bonus', amountNative:195.613, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Convenio entre clubes', normalizedCategory:'other_income', amountNative:140.694, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'Auxilio de arbitraje', normalizedCategory:'other_income', amountNative:129.316, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Auxilio de transporte', normalizedCategory:'other_income', amountNative:11.013, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Otros auxilios(*)', normalizedCategory:'other_income', amountNative:950.417, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Propaganda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:510.624, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Derechos deportivos', normalizedCategory:'player_sales', amountNative:1106.21, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Enseñanza Deportiva', normalizedCategory:'education', amountNative:60, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Transportes', normalizedCategory:'other_income', amountNative:217, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Venta de Indumentaria', normalizedCategory:'sponsorship_commercial', amountNative:234.944, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.85
    { rawLabel:'Venta de boletería en taquilla', normalizedCategory:'matchday_competition', amountNative:400.42, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Alquiler Deportivo', normalizedCategory:'other_income', amountNative:144, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Reintegro de costos y gastos', normalizedCategory:'other_income', amountNative:404.064, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Marca Fortaleza', normalizedCategory:'sponsorship_commercial', amountNative:100, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.98
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:0.829, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_income', amountNative:0.005, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Derechos de televisión nacional', normalizedCategory:'broadcasting', amountNative:1499.854, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:174.561, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.97
    { rawLabel:'Auxilio hotelero', normalizedCategory:'competition_bonus', amountNative:186.067, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Convenio entre clubes', normalizedCategory:'other_income', amountNative:33.319, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'Auxilio de arbitraje', normalizedCategory:'other_income', amountNative:243.727, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Auxilio de transporte', normalizedCategory:'other_income', amountNative:16.531, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Otros auxilios (*)', normalizedCategory:'other_income', amountNative:394.384, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Propaganda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1997.067, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Derechos deportivos', normalizedCategory:'player_sales', amountNative:1506.472, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Boletería', normalizedCategory:'matchday_competition', amountNative:4464.064, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Enseñanza', normalizedCategory:'education', amountNative:132, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Transportes', normalizedCategory:'other_income', amountNative:189.856, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Venta de indumentaria deportiva', normalizedCategory:'sponsorship_commercial', amountNative:601.847, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Alquiler deportivo', normalizedCategory:'other_income', amountNative:245.014, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Reintegro de costos y gastos', normalizedCategory:'other_income', amountNative:434.006, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Utilidad en propiedad, planta y equipo', normalizedCategory:'other_income', amountNative:14, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:34.77, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_income', amountNative:0.021, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:38.698, disclosureLevel:'aggregated' }, // pág. 28, precedente
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Derechos de televisión nacional', normalizedCategory:'broadcasting', amountNative:1563.676, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:202.748, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.97
    { rawLabel:'Auxilio hotelero (*)', normalizedCategory:'competition_bonus', amountNative:240.988, disclosureLevel:'aggregated' }, // pág. 24, Claude 0.8
    { rawLabel:'Convenio entre clubes', normalizedCategory:'other_income', amountNative:100.362, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'Auxilio de arbitraje (*)', normalizedCategory:'competition_bonus', amountNative:344.687, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.91
    { rawLabel:'Auxilio de transporte (*)', normalizedCategory:'competition_bonus', amountNative:19.915, disclosureLevel:'aggregated' }, // pág. 24, Claude 0.8
    { rawLabel:'Otros auxilios (*)', normalizedCategory:'other_income', amountNative:376.977, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Propaganda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:3221.839, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Propaganda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:115.03, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Derechos deportivos', normalizedCategory:'player_sales', amountNative:11569.768, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Boletería', normalizedCategory:'matchday_competition', amountNative:4296.654, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Venta de indumentaria deportiva', normalizedCategory:'sponsorship_commercial', amountNative:979.871, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.98
    { rawLabel:'Alquiler deportivo', normalizedCategory:'other_income', amountNative:442.152, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Reintegro de costos y gastos', normalizedCategory:'other_income', amountNative:300.503, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Comisiones', normalizedCategory:'other_income', amountNative:17, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Uso de marca', normalizedCategory:'sponsorship_commercial', amountNative:54.093, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:1.07, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_income', amountNative:0.012, disclosureLevel:'aggregated' }, // pág. 30, Claude 0.8
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:1.986, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Derechos de televisión nacional(*)', normalizedCategory:'broadcasting', amountNative:1149.209, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:270, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'Auxilio protocolos bioseguridad(*)', normalizedCategory:'other_income', amountNative:237.238, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Auxilio hotelero(*)', normalizedCategory:'other_income', amountNative:161.7, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Convenio entre clubes', normalizedCategory:'other_income', amountNative:276.128, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.96
    { rawLabel:'Auxilio de arbitraje(*)', normalizedCategory:'other_income', amountNative:60.875, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Auxilio de transporte(*)', normalizedCategory:'other_income', amountNative:52.26, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Infraestructura(*)', normalizedCategory:'other_income', amountNative:12.842, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Derechos de televisión internacional(*)', normalizedCategory:'broadcasting', amountNative:4.603, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Propaganda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:141.578, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Derechos deportivos', normalizedCategory:'player_sales', amountNative:287.59, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Transportes', normalizedCategory:'other_income', amountNative:120, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Comercio al por mayor y menor', normalizedCategory:'sponsorship_commercial', amountNative:257.71, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.97
    { rawLabel:'Alquiler deportivo', normalizedCategory:'other_income', amountNative:69.5, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Subsidio nomina gobierno nacional', normalizedCategory:'other_income', amountNative:43.995, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Reintegro de otros costos y gastos', normalizedCategory:'other_income', amountNative:438.185, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:12.569, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_income', amountNative:0.004, disclosureLevel:'aggregated' }, // pág. 31, Claude 0.8
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Derechos de televisión nacional', normalizedCategory:'broadcasting', amountNative:1208.394, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:100, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Auxilio protocolos bioseguridad (*)', normalizedCategory:'other_income', amountNative:18.83, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Auxilio hotelero (*)', normalizedCategory:'competition_bonus', amountNative:112.436, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Convenio entre clubes', normalizedCategory:'other_income', amountNative:317.561, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Auxilio de arbitraje (*)', normalizedCategory:'competition_bonus', amountNative:101.356, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Auxilio de transporte (*)', normalizedCategory:'competition_bonus', amountNative:24.094, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Otros auxilios', normalizedCategory:'other_income', amountNative:51.775, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Infraestructura', normalizedCategory:'other_income', amountNative:71.681, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Propaganda y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:274.503, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Diferencia en el documento', normalizedCategory:'sponsorship_commercial', amountNative:54, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Derechos deportivos', normalizedCategory:'player_sales', amountNative:987.608, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Transportes', normalizedCategory:'other_income', amountNative:68, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Venta de Indumentaria', normalizedCategory:'sponsorship_commercial', amountNative:200.96, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Venta de boletería en taquilla', normalizedCategory:'matchday_competition', amountNative:357.908, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Alquiler Deportivo', normalizedCategory:'other_income', amountNative:168.84, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Reintegro De Otros Costos Y Gastos', normalizedCategory:'other_income', amountNative:147.506, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:4.284, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Indemnizaciones', normalizedCategory:'other_income', amountNative:26.29, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Ajuste Al Peso', normalizedCategory:'other_income', amountNative:0.011, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Diversos', normalizedCategory:'other_income', amountNative:6.089, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Derechos De Televisión Nacional', normalizedCategory:'broadcasting', amountNative:544.489, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Venta De Derechos Deportivos', normalizedCategory:'player_sales', amountNative:370.93, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
    { rawLabel:'Federación Colombiana De Futbol', normalizedCategory:'competition_bonus', amountNative:236.057, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.97
    { rawLabel:'Venta De Boletería', normalizedCategory:'matchday_competition', amountNative:191.189, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Subsidio Dimayor-Conmebol', normalizedCategory:'other_income', amountNative:107.36, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Aux Protocolos Bioseguridad', normalizedCategory:'other_income', amountNative:100.538, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.91
    { rawLabel:'Auxilio Hotelero', normalizedCategory:'competition_bonus', amountNative:94.879, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Auxilio Arbitraje', normalizedCategory:'competition_bonus', amountNative:67.811, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.91
    { rawLabel:'Convenio Entre Clubes', normalizedCategory:'other_income', amountNative:50, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.96
    { rawLabel:'Auxilio Transporte', normalizedCategory:'other_income', amountNative:13.086, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Comercio Al Por Mayor Y Al Por Menor', normalizedCategory:'sponsorship_commercial', amountNative:76.73, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.98
    { rawLabel:'Alquiler Deportivo', normalizedCategory:'other_income', amountNative:148, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Subsidio Nomina Gobierno Nal', normalizedCategory:'other_income', amountNative:107.518, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Reintegro De Otros Costos Y Gastos', normalizedCategory:'other_income', amountNative:103.617, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:11.524, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Ajuste Al Peso', normalizedCategory:'other_income', amountNative:0.009, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
  ],
  // 2017: cargado por tools/cargar.mjs (2026-10-04) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:0.001, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Ajuste al Peso', normalizedCategory:'other_income', amountNative:0.005, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Actividades Deportivas', normalizedCategory:'lump_football_operations', amountNative:4220.658, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:1027.45, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.96
    { rawLabel:'Venta de Productos', normalizedCategory:'sponsorship_commercial', amountNative:70.183, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'Casa Hogar', normalizedCategory:'other_income', amountNative:1.6, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.96
  ],
};
const fortalezaceifcoExpenseLinesByYear = {
  2018: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Costos de Ventas', normalizedCategory:'other_expenses', amountNative:-459.648, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Otros Costos', normalizedCategory:'other_expenses', amountNative:-165.909, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.98
    { rawLabel:'Nomina', normalizedCategory:'wages_squad', amountNative:-1412.182, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-444.51, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-113.541, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-1165.165, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.97
    { rawLabel:'Afiliaciones y Sostenimiento', normalizedCategory:'admin_general_expense', amountNative:-0.5, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-5.493, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-1338.331, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.98
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-152.81, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-101.126, disclosureLevel:'aggregated' }, // pág. 17, Claude 0.8
    { rawLabel:'Viajes', normalizedCategory:'match_organisation_expense', amountNative:-79.441, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Depreciaciones y Amortizaciones', normalizedCategory:'depreciation', amountNative:-169.397, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.99
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-837.677, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Impuestos Asumidos', normalizedCategory:'other_expenses', amountNative:-0.757, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Gastos Ejercicios Anteriores', normalizedCategory:'exceptional_items', amountNative:-34.769, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.96
    { rawLabel:'Multas, Sanciones y L', normalizedCategory:'other_expenses', amountNative:-57.46, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-376.803, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
  ],
  2019: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Total Costo de Ventas', normalizedCategory:'other_expenses', amountNative:-137.713, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Gastos Laborales', normalizedCategory:'wages_squad', amountNative:-1162.652, disclosureLevel:'aggregated' }, // pág. 22, precedente
    { rawLabel:'Gastos de Viaje', normalizedCategory:'match_organisation_expense', amountNative:-180.573, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Gastos Legales', normalizedCategory:'admin_general_expense', amountNative:-53.7, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Prestación de Servicios Deportivos', normalizedCategory:'match_organisation_expense', amountNative:-214.465, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Gastos Laborales (administración)', normalizedCategory:'admin_general_expense', amountNative:-526.714, disclosureLevel:'aggregated' }, // pág. 24, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Gastos por Honorarios', normalizedCategory:'admin_general_expense', amountNative:-151.847, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Gastos por Impuestos', normalizedCategory:'admin_general_expense', amountNative:-35.491, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Gastos por Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-182.886, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Gastos por Seguros', normalizedCategory:'admin_general_expense', amountNative:-5.439, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.9
    { rawLabel:'Gastos por Servicios', normalizedCategory:'admin_general_expense', amountNative:-385.986, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Gastos por Legales', normalizedCategory:'admin_general_expense', amountNative:-7.361, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Gastos por Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-62.566, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Gastos de Viajes', normalizedCategory:'match_organisation_expense', amountNative:-5.099, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
    { rawLabel:'Gastos por Depreciación', normalizedCategory:'depreciation', amountNative:-47.474, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Gastos por Amortización', normalizedCategory:'other_amortisation', amountNative:-127.617, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Gastos Diversos', normalizedCategory:'other_expenses', amountNative:-85.967, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Gastos No Deducibles', normalizedCategory:'other_expenses', amountNative:-64.674, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Donaciones', normalizedCategory:'other_expenses', amountNative:-5, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Multas Sanciones Y Litigios', normalizedCategory:'other_expenses', amountNative:-2.79, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.94
    { rawLabel:'Indemnizaciones', normalizedCategory:'other_expenses', amountNative:-2.734, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Impuestos Asumidos', normalizedCategory:'other_expenses', amountNative:-1.412, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Ajuste Al Peso', normalizedCategory:'other_expenses', amountNative:-0.015, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'El costo detallado a continuación corresponde a la comercialización de artículos deportivos, al 31 de diciembre de:', normalizedCategory:'other_expenses', amountNative:-132.31, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Sueldos', normalizedCategory:'wages_squad', amountNative:-648.297, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Auxilio de Transporte', normalizedCategory:'wages_squad', amountNative:-29.539, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Incapacidades', normalizedCategory:'wages_squad', amountNative:-33.217, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Bonificaciones', normalizedCategory:'wages_squad', amountNative:-314.797, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Cesantías', normalizedCategory:'wages_squad', amountNative:-73.649, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Prima de Servicios', normalizedCategory:'wages_squad', amountNative:-73.858, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Intereses Sobre Cesantías', normalizedCategory:'wages_squad', amountNative:-7.478, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Vacaciones', normalizedCategory:'wages_squad', amountNative:-69.69, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Bonificaciones (2ª fila)', normalizedCategory:'wages_squad', amountNative:-20.514, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Prima extralegal', normalizedCategory:'wages_squad', amountNative:-0.5, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.85
    { rawLabel:'Fondos Pensión', normalizedCategory:'wages_squad', amountNative:-104.85, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Fondos EPS', normalizedCategory:'wages_squad', amountNative:-0.203, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Aportes Cajas De Compensación Familiar - Sena - ICBF', normalizedCategory:'wages_squad', amountNative:-29.117, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Aportes Administradoras de Riesgos Profesionales', normalizedCategory:'wages_squad', amountNative:-4.593, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Indemnizaciones Laborales', normalizedCategory:'wages_squad', amountNative:-3.725, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Médicos y drogas', normalizedCategory:'match_organisation_expense', amountNative:-17.514, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-121.693, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Asesoría Jurídica', normalizedCategory:'admin_general_expense', amountNative:-11.842, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Asesoría Técnica', normalizedCategory:'admin_general_expense', amountNative:-39.687, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Derechos Deportivos', normalizedCategory:'player_amortisation', amountNative:-44.862, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-29.268, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Alquiler construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-126.261, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Alquiler maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-45.223, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Alquiler Terrenos', normalizedCategory:'match_organisation_expense', amountNative:-219.707, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Afiliaciones y sostenimientos', normalizedCategory:'admin_general_expense', amountNative:-2.62, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-38.43, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-28.398, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Seguridad', normalizedCategory:'match_organisation_expense', amountNative:-4.158, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-13.394, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'Transporte de Pasajeros', normalizedCategory:'match_organisation_expense', amountNative:-25.521, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Transportes fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-1.014, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.94
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'admin_general_expense', amountNative:-1.382, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Médico y ambulancias', normalizedCategory:'match_organisation_expense', amountNative:-58.445, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Logística de partidos', normalizedCategory:'match_organisation_expense', amountNative:-121.855, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-91.656, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-15.698, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-7.066, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Muebles y enseres', normalizedCategory:'admin_general_expense', amountNative:-1.415, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.8
    { rawLabel:'Flota y equipo de transporte', normalizedCategory:'admin_general_expense', amountNative:-44.323, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Reparaciones locativas', normalizedCategory:'admin_general_expense', amountNative:-14.162, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'Alojamiento y manutención', normalizedCategory:'match_organisation_expense', amountNative:-147.991, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'Pasajes aéreos y terrestres', normalizedCategory:'match_organisation_expense', amountNative:-137.351, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Peajes', normalizedCategory:'admin_general_expense', amountNative:-0.461, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Combustible', normalizedCategory:'admin_general_expense', amountNative:-25.412, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Taxis y buses', normalizedCategory:'admin_general_expense', amountNative:-24.056, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.92
    { rawLabel:'Casinos y restaurantes', normalizedCategory:'match_organisation_expense', amountNative:-121.033, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Papelería', normalizedCategory:'admin_general_expense', amountNative:-0.888, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Parqueadero', normalizedCategory:'admin_general_expense', amountNative:-0.31, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Elementos de aseo y cafetería (Hidratación)', normalizedCategory:'admin_general_expense', amountNative:-57.697, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Implementos Deportivos', normalizedCategory:'match_organisation_expense', amountNative:-0.936, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-11.111, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-53.133, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Deterioro de inventario', normalizedCategory:'other_expenses', amountNative:-15.637, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Sueldos (administración)', normalizedCategory:'admin_general_expense', amountNative:-278.356, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Horas extras y recargos', normalizedCategory:'admin_general_expense', amountNative:-1.97, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Incapacidades (administración)', normalizedCategory:'admin_general_expense', amountNative:-6.109, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Auxilio de transporte (administración)', normalizedCategory:'admin_general_expense', amountNative:-6.204, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Cesantías (administración)', normalizedCategory:'admin_general_expense', amountNative:-25.249, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Intereses sobre cesantías (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.963, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Prima de servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-25.251, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Vacaciones (administración)', normalizedCategory:'admin_general_expense', amountNative:-27.14, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Prima extralegal (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.7, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Bonificaciones (administración)', normalizedCategory:'admin_general_expense', amountNative:-146.841, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Aportes fondo de pensiones (administración)', normalizedCategory:'admin_general_expense', amountNative:-37.096, disclosureLevel:'aggregated' }, // pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Aportes caja de compensación familiar', normalizedCategory:'admin_general_expense', amountNative:-11.66, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Aportes de riesgos laborales', normalizedCategory:'admin_general_expense', amountNative:-1.493, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Aportes a entidades promotora de salud', normalizedCategory:'admin_general_expense', amountNative:-7.512, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Dotación y suministros a trabajadores', normalizedCategory:'admin_general_expense', amountNative:-2.307, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Aporte I.C.B.F.', normalizedCategory:'admin_general_expense', amountNative:-2.39, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Aporte SENA', normalizedCategory:'admin_general_expense', amountNative:-1.593, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.85
    { rawLabel:'Asesoría Jurídica', normalizedCategory:'admin_general_expense', amountNative:-38.182, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Revisoría Fiscal', normalizedCategory:'admin_general_expense', amountNative:-24.65, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Afiliaciones y sostenimientos', normalizedCategory:'admin_general_expense', amountNative:-1.43, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Aseo y vigilancia', normalizedCategory:'admin_general_expense', amountNative:-146.405, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Energía Eléctrica', normalizedCategory:'admin_general_expense', amountNative:-53.949, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Teléfono', normalizedCategory:'admin_general_expense', amountNative:-5.251, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Registro Mercantil', normalizedCategory:'admin_general_expense', amountNative:-2.074, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Tramites y licencias', normalizedCategory:'admin_general_expense', amountNative:-0.059, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-2.04, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Equipo de oficina', normalizedCategory:'admin_general_expense', amountNative:-3.225, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'Casino Y Restaurante', normalizedCategory:'admin_general_expense', amountNative:-0.04, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Taxis y buses', normalizedCategory:'admin_general_expense', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.92
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-111.553, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Deterioro de cartera', normalizedCategory:'other_expenses', amountNative:-33.88, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-13.323, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.9
    { rawLabel:'Gastos no deducibles', normalizedCategory:'other_expenses', amountNative:-21.013, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Multas sanciones y litigios', normalizedCategory:'other_expenses', amountNative:-23.391, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.96
    { rawLabel:'Impuestos Asumidos', normalizedCategory:'other_expenses', amountNative:-0.475, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Ajuste al Peso', normalizedCategory:'other_expenses', amountNative:-0.005, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Intereses de mora', normalizedCategory:'other_expenses', amountNative:-6.305, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.95
  ],
  2024: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Costo de ventas', normalizedCategory:'other_expenses', amountNative:-392.331, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Gastos Laborales', normalizedCategory:'wages_squad', amountNative:-4025.365, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-374.792, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Alquiler construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-332.199, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Alquiler maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-98.714, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Alquiler Terrenos', normalizedCategory:'match_organisation_expense', amountNative:-899.998, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Afiliaciones y sostenimientos', normalizedCategory:'admin_general_expense', amountNative:-0.239, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Industria y comercio pagados a la Secretaría de Hacienda de Bogotá por $ 35.065', normalizedCategory:'admin_general_expense', amountNative:-35.065, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.96
    { rawLabel:'De espectáculos públicos pagados IDRD por $ 388.776', normalizedCategory:'admin_general_expense', amountNative:-388.776, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'IVA descontable por $ 119.791', normalizedCategory:'admin_general_expense', amountNative:-119.791, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-47.515, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-956.647, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Tramites y licencias', normalizedCategory:'admin_general_expense', amountNative:-96.521, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Derechos Deportivos (7)', normalizedCategory:'player_amortisation', amountNative:-67.041, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Terrenos', normalizedCategory:'admin_general_expense', amountNative:-9.354, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-109.658, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-5.974, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Muebles y enseres', normalizedCategory:'admin_general_expense', amountNative:-1.941, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Flota y equipo de transporte', normalizedCategory:'admin_general_expense', amountNative:-16.478, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-624.095, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.97
    { rawLabel:'Comisiones', normalizedCategory:'admin_general_expense', amountNative:-274.65, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Combustible', normalizedCategory:'admin_general_expense', amountNative:-7.774, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Taxis y buses', normalizedCategory:'admin_general_expense', amountNative:-50.784, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.92
    { rawLabel:'Casinos y restaurantes', normalizedCategory:'match_organisation_expense', amountNative:-70.496, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Gastos de representación', normalizedCategory:'admin_general_expense', amountNative:-6.972, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Papelería', normalizedCategory:'admin_general_expense', amountNative:-2.785, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Parqueadero', normalizedCategory:'admin_general_expense', amountNative:-2.12, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Elementos de aseo y cafetería (Hidratación)', normalizedCategory:'admin_general_expense', amountNative:-83.51, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Implementos Deportivos', normalizedCategory:'match_organisation_expense', amountNative:-4.358, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-76.786, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-51.639, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-21.663, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.9
    { rawLabel:'Deterioro de inventario', normalizedCategory:'other_expenses', amountNative:-26.913, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Gastos Laborales (administración)', normalizedCategory:'admin_general_expense', amountNative:-996.661, disclosureLevel:'aggregated' }, // pág. 26, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-119.681, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Contribuciones y afiliaciones', normalizedCategory:'admin_general_expense', amountNative:-9.581, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-4.206, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-243.462, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.98
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-2.97, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-4.048, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Equipo de oficina', normalizedCategory:'admin_general_expense', amountNative:-4.79, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-1.955, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'Combustibles y lubricantes', normalizedCategory:'admin_general_expense', amountNative:-0.504, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Útiles, papelería y Fotocopias', normalizedCategory:'admin_general_expense', amountNative:-2.175, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Parqueaderos', normalizedCategory:'admin_general_expense', amountNative:-0.075, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Casino y restaurante', normalizedCategory:'admin_general_expense', amountNative:-3.192, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-19.774, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Taxis y buses', normalizedCategory:'admin_general_expense', amountNative:-0.2, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.92
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-135.69, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Deterioro de cartera', normalizedCategory:'other_expenses', amountNative:-132.591, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-16.891, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.9
    { rawLabel:'Gastos no deducibles', normalizedCategory:'other_expenses', amountNative:-76.911, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Multas sanciones y litigios', normalizedCategory:'other_expenses', amountNative:-78.742, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.96
    { rawLabel:'Impuestos asumidos', normalizedCategory:'other_expenses', amountNative:-4.787, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_expenses', amountNative:-0.015, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Intereses de mora', normalizedCategory:'other_expenses', amountNative:-81.367, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.95
  ],
  2025: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'COSTO DE VENTAS', normalizedCategory:'other_expenses', amountNative:-606.635, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'De personal', normalizedCategory:'wages_squad', amountNative:-7170.528, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-536.813, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Alquiler construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-225.384, disclosureLevel:'aggregated' }, // pág. 26, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Alquiler maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-150.895, disclosureLevel:'aggregated' }, // pág. 26, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Alquiler Terrenos', normalizedCategory:'match_organisation_expense', amountNative:-1278.814, disclosureLevel:'aggregated' }, // pág. 26, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Afiliaciones y sostenimientos', normalizedCategory:'admin_general_expense', amountNative:-0.303, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'INDUSTRIA Y COMERCIO', normalizedCategory:'admin_general_expense', amountNative:-55.493, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.9
    { rawLabel:'DE ESPECTACULOS PUBLICOS (I.D.R.D)', normalizedCategory:'admin_general_expense', amountNative:-373.032, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'BOMBEROS', normalizedCategory:'admin_general_expense', amountNative:-143.536, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'MOVILIDAD', normalizedCategory:'admin_general_expense', amountNative:-1.013, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'IVA DESCONTABLE', normalizedCategory:'admin_general_expense', amountNative:-359.859, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-33.568, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-1453.576, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Tramites y licencias', normalizedCategory:'admin_general_expense', amountNative:-16.891, disclosureLevel:'aggregated' }, // pág. 26, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Derechos Deportivos (7)', normalizedCategory:'player_amortisation', amountNative:-3483.228, disclosureLevel:'aggregated' }, // pág. 26, ajuste manual (auditoría 2026-10-04)
    { rawLabel:'Mantenimiento y adecuaciones', normalizedCategory:'admin_general_expense', amountNative:-479.854, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-674.771, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-1016.505, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-139.68, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-209.241, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.9
    { rawLabel:'Deterioro de inventario', normalizedCategory:'other_expenses', amountNative:-29.394, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'De personal', normalizedCategory:'wages_squad', amountNative:-674.055, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-46.283, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-15.715, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-11.98, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-35.05, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.98
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-13.065, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-79.959, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Gastos Laborales (administración)', normalizedCategory:'admin_general_expense', amountNative:-2234.94, disclosureLevel:'aggregated' }, // pág. 28, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-244.744, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-1.415, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Contribuciones y afiliaciones', normalizedCategory:'admin_general_expense', amountNative:-9.935, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-4.766, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-326.88, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-39.211, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Mantenimientos y reparaciones', normalizedCategory:'admin_general_expense', amountNative:-113.956, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-13.52, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
    { rawLabel:'Gastos Diversos', normalizedCategory:'other_expenses', amountNative:-85.164, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-176.383, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Deterioro de cartera', normalizedCategory:'other_expenses', amountNative:-99.738, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-36.828, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.9
    { rawLabel:'Gastos no deducibles', normalizedCategory:'other_expenses', amountNative:-9.493, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Multas y sanciones', normalizedCategory:'other_expenses', amountNative:-83.5, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Impuestos asumidos', normalizedCategory:'other_expenses', amountNative:-11.317, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_expenses', amountNative:-0.031, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  2021: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'COSTO DE VENTAS', normalizedCategory:'other_expenses', amountNative:-155.043, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Gastos Laborales', normalizedCategory:'wages_squad', amountNative:-1489.278, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-156.259, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-238.134, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'Afiliaciones y sostenimientos', normalizedCategory:'admin_general_expense', amountNative:-2.602, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-6.169, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-398.803, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.98
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-3.124, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Mantenimiento y adecuaciones', normalizedCategory:'admin_general_expense', amountNative:-28.025, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-212.466, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-260.061, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-91.84, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-124, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.9
    { rawLabel:'Gastos Laborales (administración)', normalizedCategory:'admin_general_expense', amountNative:-517.345, disclosureLevel:'aggregated' }, // pág. 28, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-106.062, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-6.608, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-0.45, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
    { rawLabel:'Contribuciones y afiliaciones', normalizedCategory:'admin_general_expense', amountNative:-24.471, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-131.186, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-3.235, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Mantenimientos', normalizedCategory:'admin_general_expense', amountNative:-25.797, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Gastos Diversos', normalizedCategory:'other_expenses', amountNative:-59.078, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-30.445, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-4.793, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.9
    { rawLabel:'Gastos no deducibles', normalizedCategory:'other_expenses', amountNative:-80.371, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Multas sanciones y litigios', normalizedCategory:'other_expenses', amountNative:-11.126, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.96
    { rawLabel:'Impuestos asumidos', normalizedCategory:'other_expenses', amountNative:-3.67, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Ajuste al peso', normalizedCategory:'other_expenses', amountNative:-0.412, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Intereses de mora', normalizedCategory:'other_expenses', amountNative:-18.438, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.95
  ],
  2022: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'El costo detallado a continuación corresponde a la comercialización de artículos', normalizedCategory:'other_expenses', amountNative:-127.201, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Gastos Laborales', normalizedCategory:'wages_squad', amountNative:-1686.353, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-177.218, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-377.814, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Afiliaciones y sostenimientos', normalizedCategory:'admin_general_expense', amountNative:-2.734, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-29.317, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-15.231, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-404.995, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Legales', normalizedCategory:'admin_general_expense', amountNative:-20.367, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Terrenos', normalizedCategory:'admin_general_expense', amountNative:-17.068, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Construcciones y edificaciones', normalizedCategory:'admin_general_expense', amountNative:-26.007, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Maquinaria y equipo', normalizedCategory:'admin_general_expense', amountNative:-5.981, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Equipo de computación y comunicación', normalizedCategory:'admin_general_expense', amountNative:-0.42, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Muebles y enseres', normalizedCategory:'admin_general_expense', amountNative:-1.689, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Flota y equipo de transporte', normalizedCategory:'admin_general_expense', amountNative:-16.077, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-265.396, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Combustible', normalizedCategory:'admin_general_expense', amountNative:-52.104, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Taxis y buses', normalizedCategory:'admin_general_expense', amountNative:-54.032, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Casinos y restaurantes', normalizedCategory:'match_organisation_expense', amountNative:-95.105, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Estampillas', normalizedCategory:'admin_general_expense', amountNative:-1.67, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Papelería', normalizedCategory:'admin_general_expense', amountNative:-0.085, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Parqueadero', normalizedCategory:'admin_general_expense', amountNative:-0.364, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Elementos de aseo y cafetería (Hidratación)', normalizedCategory:'admin_general_expense', amountNative:-42.92, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-13.526, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-71.858, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-2, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Gastos Laborales (administración)', normalizedCategory:'admin_general_expense', amountNative:-502.281, disclosureLevel:'aggregated' }, // pág. 28, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-51.355, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-8.522, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-0.301, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Contribuciones y afiliaciones', normalizedCategory:'admin_general_expense', amountNative:-5.401, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-141.507, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Registro Mercantil', normalizedCategory:'admin_general_expense', amountNative:-1.866, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Tramites y licencias', normalizedCategory:'admin_general_expense', amountNative:-0.02, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Maquinaria y Equipo', normalizedCategory:'admin_general_expense', amountNative:-0.539, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Equipo de Computación Y Comunicación', normalizedCategory:'admin_general_expense', amountNative:-1.643, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Equipo De Oficina', normalizedCategory:'admin_general_expense', amountNative:-0.202, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'De viaje', normalizedCategory:'match_organisation_expense', amountNative:-0.954, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Elementos de Aseo y Cafetería', normalizedCategory:'admin_general_expense', amountNative:-7.026, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Combustibles y Lubricantes', normalizedCategory:'admin_general_expense', amountNative:-1.851, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Útiles Papelería y Fotocopias', normalizedCategory:'admin_general_expense', amountNative:-1.732, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Parqueaderos', normalizedCategory:'admin_general_expense', amountNative:-0.06, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Casino Y Restaurante', normalizedCategory:'admin_general_expense', amountNative:-3.23, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Diversos', normalizedCategory:'other_expenses', amountNative:-4.764, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Taxis y buses', normalizedCategory:'admin_general_expense', amountNative:-0.011, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Depreciaciones', normalizedCategory:'depreciation', amountNative:-99.989, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Deterioro de cartera', normalizedCategory:'other_expenses', amountNative:-33.88, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-6.949, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Gastos no Deducibles', normalizedCategory:'other_expenses', amountNative:-23.354, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Multas sanciones y litigios', normalizedCategory:'other_expenses', amountNative:-31.998, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Impuestos Asumidos', normalizedCategory:'other_expenses', amountNative:-1.11, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Ajuste Al Peso', normalizedCategory:'other_expenses', amountNative:-0.567, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Intereses de mora', normalizedCategory:'other_expenses', amountNative:-14.852, disclosureLevel:'aggregated' }, // pág. 29, precedente
  ],
  2020: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Total Costo de Ventas', normalizedCategory:'other_expenses', amountNative:-52.995, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Sueldos', normalizedCategory:'wages_squad', amountNative:-727.972, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Bonificaciones', normalizedCategory:'wages_squad', amountNative:-101.481, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Cesantías', normalizedCategory:'wages_squad', amountNative:-67.456, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Prima De Servicios', normalizedCategory:'wages_squad', amountNative:-71.693, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Fondos Pensión', normalizedCategory:'wages_squad', amountNative:-89.424, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Vacaciones', normalizedCategory:'wages_squad', amountNative:-31.713, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Aportes Cajas De Compensación Familiar', normalizedCategory:'wages_squad', amountNative:-30.797, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Auxilio De Transporte', normalizedCategory:'wages_squad', amountNative:-29.944, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Aportes A Administradoras De Riesgos Profesionales', normalizedCategory:'wages_squad', amountNative:-18.71, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Indemnizaciones Laborales', normalizedCategory:'wages_squad', amountNative:-17.489, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Intereses Sobre Cesantías', normalizedCategory:'wages_squad', amountNative:-6.876, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Dotación De Personal', normalizedCategory:'wages_squad', amountNative:-5.886, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Aportes A Entidades Promotoras De Salud', normalizedCategory:'wages_squad', amountNative:-0.404, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Medico Y Ambulancias', normalizedCategory:'match_organisation_expense', amountNative:-136.422, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Logística De Partidos', normalizedCategory:'match_organisation_expense', amountNative:-91.143, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Alojamiento Y Manutención', normalizedCategory:'match_organisation_expense', amountNative:-49.327, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.98
    { rawLabel:'Arbitraje Art 383', normalizedCategory:'match_organisation_expense', amountNative:-45.359, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.93
    { rawLabel:'Transporte De Pasajeros', normalizedCategory:'match_organisation_expense', amountNative:-30.743, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Elementos De Aseo Y Cafetería', normalizedCategory:'admin_general_expense', amountNative:-21.017, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Multas Partidos Dimayor', normalizedCategory:'other_expenses', amountNative:-7.096, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Derechos Deportivos', normalizedCategory:'player_amortisation', amountNative:-4.8, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Pasajes Aéreos', normalizedCategory:'match_organisation_expense', amountNative:-2.655, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Combustible', normalizedCategory:'admin_general_expense', amountNative:-1.292, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Elementos Papelería', normalizedCategory:'admin_general_expense', amountNative:-0.241, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Peajes', normalizedCategory:'admin_general_expense', amountNative:-0.228, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Parqueadero', normalizedCategory:'admin_general_expense', amountNative:-0.141, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Transportes Fletes Y Acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.097, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.94
    { rawLabel:'Sueldos (administración)', normalizedCategory:'admin_general_expense', amountNative:-257.425, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Bonificaciones (administración)', normalizedCategory:'admin_general_expense', amountNative:-29.9, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Fondos Pensión (administración)', normalizedCategory:'admin_general_expense', amountNative:-29.598, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Prima De Servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-24.177, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Cesantías (administración)', normalizedCategory:'admin_general_expense', amountNative:-23.265, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Sena', normalizedCategory:'admin_general_expense', amountNative:-21.881, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Vacaciones (administración)', normalizedCategory:'admin_general_expense', amountNative:-11.833, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Aportes Cajas De Compensación Familiar (administración)', normalizedCategory:'admin_general_expense', amountNative:-10.93, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Aportes Administradoras De Riesgos Profe', normalizedCategory:'admin_general_expense', amountNative:-6.625, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Auxilio De Transporte (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.501, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Intereses Sobre Cesantías (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.788, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Aportes A Entidades Promotoras De Salud (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.63, disclosureLevel:'aggregated' }, // pág. 25, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo)
    { rawLabel:'Horas Extras Y Recargos', normalizedCategory:'admin_general_expense', amountNative:-1.627, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Dotación Y Suministro A Trabajadores', normalizedCategory:'admin_general_expense', amountNative:-0.964, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Aporte I.C.B.F.', normalizedCategory:'admin_general_expense', amountNative:-0.567, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Asesoría Financiera', normalizedCategory:'admin_general_expense', amountNative:-32.683, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.91
    { rawLabel:'Asesoría Jurídica', normalizedCategory:'admin_general_expense', amountNative:-14.292, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Asesoría Técnica', normalizedCategory:'admin_general_expense', amountNative:-0.13, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Gravamen Al Movimiento Financiero', normalizedCategory:'admin_general_expense', amountNative:-10.526, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
    { rawLabel:'Impuesto Al Consumo', normalizedCategory:'admin_general_expense', amountNative:-4.395, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Industria Y Comercio', normalizedCategory:'admin_general_expense', amountNative:-2.224, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.9
    { rawLabel:'De Vehículos', normalizedCategory:'admin_general_expense', amountNative:-1.337, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.93
    { rawLabel:'Construcciones Y Edificaciones', normalizedCategory:'admin_general_expense', amountNative:-59.558, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Terrenos', normalizedCategory:'admin_general_expense', amountNative:-38.805, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Maquinaria Y Equipo', normalizedCategory:'admin_general_expense', amountNative:-3.78, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Flota Y Equipo De Transporte', normalizedCategory:'admin_general_expense', amountNative:-3.492, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Cumplimiento', normalizedCategory:'admin_general_expense', amountNative:-2.43, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Responsabilidad Civil Y Extracontractual', normalizedCategory:'admin_general_expense', amountNative:-1.426, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.85
    { rawLabel:'Aseo Y Vigilancia', normalizedCategory:'admin_general_expense', amountNative:-104.252, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Propaganda Y Publicidad', normalizedCategory:'admin_general_expense', amountNative:-50.754, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Energía Eléctrica', normalizedCategory:'admin_general_expense', amountNative:-39.318, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Servicios Digitación', normalizedCategory:'admin_general_expense', amountNative:-13.48, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.8
    { rawLabel:'Transporte fletes Y Acarreos', normalizedCategory:'admin_general_expense', amountNative:-5.134, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.92
    { rawLabel:'Teléfono', normalizedCategory:'admin_general_expense', amountNative:-4.746, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Tv Cable', normalizedCategory:'admin_general_expense', amountNative:-4.619, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Acueducto Y Alcantarillado', normalizedCategory:'admin_general_expense', amountNative:-4.164, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Asistencia Técnica', normalizedCategory:'admin_general_expense', amountNative:-3.231, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-2.576, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Procesamiento Electrónico De Datos', normalizedCategory:'admin_general_expense', amountNative:-0.049, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'Correo portes Y Telegramas', normalizedCategory:'admin_general_expense', amountNative:-0.021, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Registro Mercantil', normalizedCategory:'admin_general_expense', amountNative:-3.777, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Tramites Y Licencias', normalizedCategory:'admin_general_expense', amountNative:-0.054, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.8
    { rawLabel:'Notariales', normalizedCategory:'admin_general_expense', amountNative:-0.052, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Reparaciones Locativas', normalizedCategory:'admin_general_expense', amountNative:-37.747, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Construcciones Y Edificaciones', normalizedCategory:'admin_general_expense', amountNative:-12.209, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Maquinaria Y Equipo', normalizedCategory:'admin_general_expense', amountNative:-8.427, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Flota Y Equipo De Transporte', normalizedCategory:'admin_general_expense', amountNative:-4.296, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Equipo De Computación Y Comunicación', normalizedCategory:'admin_general_expense', amountNative:-1.001, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Equipo Medico-Científico', normalizedCategory:'admin_general_expense', amountNative:-0.18, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Terrenos', normalizedCategory:'admin_general_expense', amountNative:-0.095, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Pasajes Aéreos', normalizedCategory:'match_organisation_expense', amountNative:-21.863, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Pasajes Terrestres', normalizedCategory:'admin_general_expense', amountNative:-8.857, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Mejoras A Propiedades Ajenas', normalizedCategory:'admin_general_expense', amountNative:-56.189, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Flota Y Equipo De Transporte', normalizedCategory:'admin_general_expense', amountNative:-43, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Equipo De Computación Y Comunicación', normalizedCategory:'admin_general_expense', amountNative:-4.548, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Maquinaria Y Equipo', normalizedCategory:'admin_general_expense', amountNative:-2.861, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Intangibles', normalizedCategory:'other_amortisation', amountNative:-122, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Licencias', normalizedCategory:'other_amortisation', amountNative:-5.743, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Comisiones', normalizedCategory:'admin_general_expense', amountNative:-65.195, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Elementos De Aseo Y Cafetería', normalizedCategory:'admin_general_expense', amountNative:-25.852, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Combustibles Y Lubricantes', normalizedCategory:'admin_general_expense', amountNative:-5.464, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Libros Suscripciones Periódicos Y Revistas', normalizedCategory:'admin_general_expense', amountNative:-2.402, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Taxis Y Buses', normalizedCategory:'admin_general_expense', amountNative:-1.385, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.92
    { rawLabel:'Útiles Papelería Y Fotocopias', normalizedCategory:'admin_general_expense', amountNative:-1.169, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Parqueaderos', normalizedCategory:'admin_general_expense', amountNative:-0.11, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Gastos No Deducibles', normalizedCategory:'other_expenses', amountNative:-6.034, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Multas sanciones Y Litigios', normalizedCategory:'other_expenses', amountNative:-2.77, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.96
    { rawLabel:'Impuestos Asumidos', normalizedCategory:'other_expenses', amountNative:-0.321, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Ajuste Al Peso', normalizedCategory:'other_expenses', amountNative:-0.098, disclosureLevel:'aggregated' }, // pág. 27, precedente
  ],
  2017: [ // tools/cargar.mjs (2026-10-04)
    { rawLabel:'Costos de Ventas', normalizedCategory:'other_expenses', amountNative:-127.783, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Costos Extraordinarios', normalizedCategory:'exceptional_items', amountNative:-49.494, disclosureLevel:'aggregated' }, // pág. 15, Jev 0.97
    { rawLabel:'Sueldos', normalizedCategory:'wages_squad', amountNative:-705.432, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Horas Extras y Recarg', normalizedCategory:'admin_general_expense', amountNative:-6.529, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Incapacidades', normalizedCategory:'wages_squad', amountNative:-0.138, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Auxilios de Transport', normalizedCategory:'wages_squad', amountNative:-25.947, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Cesantías', normalizedCategory:'wages_squad', amountNative:-52.367, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Intereses Sobre Las C', normalizedCategory:'wages_squad', amountNative:-4.87, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'Prima de Servicios', normalizedCategory:'wages_squad', amountNative:-51.994, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Vacaciones', normalizedCategory:'wages_squad', amountNative:-30.427, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Bonificaciones', normalizedCategory:'wages_squad', amountNative:-169.037, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Dotacion y Sum a Trab', normalizedCategory:'admin_general_expense', amountNative:-0.7, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Indmenizaciones Labor', normalizedCategory:'wages_squad', amountNative:-413.384, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'Gastos Deportivos y D', normalizedCategory:'admin_general_expense', amountNative:-0.25, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Aportes Admin de Ries', normalizedCategory:'wages_squad', amountNative:-14.645, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Aporte a Salud', normalizedCategory:'wages_squad', amountNative:-5.116, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Aportes a Fondos de P', normalizedCategory:'wages_squad', amountNative:-99.698, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'Aportes a Cajas de Co', normalizedCategory:'wages_squad', amountNative:-26.833, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Aportes a Icbf', normalizedCategory:'wages_squad', amountNative:-2.397, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Sena', normalizedCategory:'wages_squad', amountNative:-1.598, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Gastos Medicos y Drog', normalizedCategory:'match_organisation_expense', amountNative:-16.014, disclosureLevel:'aggregated' }, // pág. 15, Claude 0.85
    { rawLabel:'Asesoria Juridica', normalizedCategory:'admin_general_expense', amountNative:-5.164, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Asesoria Tecnica', normalizedCategory:'admin_general_expense', amountNative:-71.102, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Comisiones', normalizedCategory:'admin_general_expense', amountNative:-100.842, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Arbitraje Partidos Pr', normalizedCategory:'match_organisation_expense', amountNative:-45.079, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.97
    { rawLabel:'Impuesto al Consumo', normalizedCategory:'admin_general_expense', amountNative:-7.117, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Impuesto a la Riqueza', normalizedCategory:'admin_general_expense', amountNative:-1.171, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.98
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-13.961, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Terrenos', normalizedCategory:'admin_general_expense', amountNative:-38.184, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Contrucciones y Edifi', normalizedCategory:'admin_general_expense', amountNative:-43.741, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.92
    { rawLabel:'Maquinaria y Equipo', normalizedCategory:'admin_general_expense', amountNative:-9.011, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Equipo de Computacion', normalizedCategory:'admin_general_expense', amountNative:-0.61, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Ligas de Futbol', normalizedCategory:'admin_general_expense', amountNative:-2.024, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Ditritales Y/O Depart', normalizedCategory:'admin_general_expense', amountNative:-1.868, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Cumplimiento', normalizedCategory:'admin_general_expense', amountNative:-1.54, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Vida Colectiva', normalizedCategory:'admin_general_expense', amountNative:-2.516, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.93
    { rawLabel:'Responsabilidad Civil', normalizedCategory:'admin_general_expense', amountNative:-6.787, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Soat', normalizedCategory:'admin_general_expense', amountNative:-1.181, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-10.769, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Aseo y Vigilancia', normalizedCategory:'admin_general_expense', amountNative:-6.523, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Asistencia Tecnica', normalizedCategory:'admin_general_expense', amountNative:-19.435, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Acueducto y Alcantari', normalizedCategory:'admin_general_expense', amountNative:-0.298, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Energia Electrica', normalizedCategory:'admin_general_expense', amountNative:-8.764, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Telefono', normalizedCategory:'admin_general_expense', amountNative:-1.794, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Correo Portes y Teleg', normalizedCategory:'admin_general_expense', amountNative:-1.436, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Transportes, Fletes Y', normalizedCategory:'admin_general_expense', amountNative:-7.55, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-0.252, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Publicidad Propaganda', normalizedCategory:'admin_general_expense', amountNative:-21.72, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Tv Cable', normalizedCategory:'admin_general_expense', amountNative:-0.72, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Bomberos', normalizedCategory:'admin_general_expense', amountNative:-2.459, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Logistica y Manejo Pa', normalizedCategory:'match_organisation_expense', amountNative:-16.947, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
    { rawLabel:'Recoge Bolas', normalizedCategory:'match_organisation_expense', amountNative:-1.286, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.8
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-0.796, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Notariales', normalizedCategory:'admin_general_expense', amountNative:-0.109, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Registro Mercantil', normalizedCategory:'admin_general_expense', amountNative:-1.793, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Tramites y Licencias', normalizedCategory:'admin_general_expense', amountNative:-5.941, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Contrucciones y Edifi', normalizedCategory:'admin_general_expense', amountNative:-1.656, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.92
    { rawLabel:'Maquinaria y Equipo', normalizedCategory:'admin_general_expense', amountNative:-1.219, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Equipo de Comunicacio', normalizedCategory:'admin_general_expense', amountNative:-0.12, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Flota y Equipo de Tra', normalizedCategory:'admin_general_expense', amountNative:-6.856, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.97
    { rawLabel:'Reparaciones Locativa', normalizedCategory:'admin_general_expense', amountNative:-16.437, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Alojamiento y Manuten', normalizedCategory:'match_organisation_expense', amountNative:-27.142, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'Pasajes Aereos', normalizedCategory:'match_organisation_expense', amountNative:-4.99, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Pasajes Terrestres', normalizedCategory:'admin_general_expense', amountNative:-1.689, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Flota y Equipo de Trn', normalizedCategory:'admin_general_expense', amountNative:-19.299, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'Elementos de Aseo y C', normalizedCategory:'admin_general_expense', amountNative:-5.292, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.98
    { rawLabel:'Utiles Papeleria y Fo', normalizedCategory:'admin_general_expense', amountNative:-15.089, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Combustibles y Lubric', normalizedCategory:'admin_general_expense', amountNative:-0.377, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.96
    { rawLabel:'Taxis y Buses', normalizedCategory:'admin_general_expense', amountNative:-11.488, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Casino y Restaurante', normalizedCategory:'admin_general_expense', amountNative:-99.622, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Parqueaderos', normalizedCategory:'admin_general_expense', amountNative:-0.159, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Polvora y Similares', normalizedCategory:'other_expenses', amountNative:-0.027, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Peajes', normalizedCategory:'admin_general_expense', amountNative:-0.79, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-178.48, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Auxilio de Transporte', normalizedCategory:'wages_squad', amountNative:-0.6, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Bonificaciones', normalizedCategory:'wages_squad', amountNative:-0.2, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Dotacion y Suministro', normalizedCategory:'admin_general_expense', amountNative:-62.476, disclosureLevel:'aggregated' }, // pág. 17, Claude 0.8
    { rawLabel:'Gastos Medicos y Drog', normalizedCategory:'match_organisation_expense', amountNative:-1.138, disclosureLevel:'aggregated' }, // pág. 17, Claude 0.85
    { rawLabel:'Asesoria Juridica', normalizedCategory:'admin_general_expense', amountNative:-102.476, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Asesoria Tecnica', normalizedCategory:'admin_general_expense', amountNative:-70.5, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-13.071, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Impuesto Boleteria', normalizedCategory:'match_organisation_expense', amountNative:-0.052, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Impuesto al Consumo A', normalizedCategory:'admin_general_expense', amountNative:-0.011, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'Retenciones Asumidas', normalizedCategory:'other_expenses', amountNative:-0.077, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Gravamenes', normalizedCategory:'admin_general_expense', amountNative:-2.972, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-0.148, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Construcciones y Edif', normalizedCategory:'admin_general_expense', amountNative:-40.39, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.93
    { rawLabel:'Equipo de Computacion', normalizedCategory:'admin_general_expense', amountNative:-0.63, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'Aseo y Vigilancia', normalizedCategory:'admin_general_expense', amountNative:-28.53, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Acueducto y Alcantari', normalizedCategory:'admin_general_expense', amountNative:-0.751, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'Energia Electrica', normalizedCategory:'admin_general_expense', amountNative:-11.761, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Telefono', normalizedCategory:'admin_general_expense', amountNative:-0.514, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Comunicaciones', normalizedCategory:'admin_general_expense', amountNative:-0.46, disclosureLevel:'aggregated' }, // pág. 18, Claude 0.8
    { rawLabel:'Correo', normalizedCategory:'admin_general_expense', amountNative:-0.251, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.97
    { rawLabel:'Transporte', normalizedCategory:'admin_general_expense', amountNative:-2.177, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Publicidad', normalizedCategory:'admin_general_expense', amountNative:-27.98, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.99
    { rawLabel:'Servicio de Ambulanci', normalizedCategory:'match_organisation_expense', amountNative:-9.349, disclosureLevel:'aggregated' }, // pág. 18, Claude 0.8
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-5.254, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Notariales', normalizedCategory:'admin_general_expense', amountNative:-0.02, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Registro Mercantil', normalizedCategory:'admin_general_expense', amountNative:-0.006, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Construcciones y Edif', normalizedCategory:'admin_general_expense', amountNative:-11.888, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.93
    { rawLabel:'Maquinaria y Equipo', normalizedCategory:'admin_general_expense', amountNative:-15.213, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Equipo de Oficina', normalizedCategory:'admin_general_expense', amountNative:-4.78, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.99
    { rawLabel:'Flota y Equipo de Tra', normalizedCategory:'admin_general_expense', amountNative:-0.04, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.97
    { rawLabel:'Instalaciones Electri', normalizedCategory:'admin_general_expense', amountNative:-0.054, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Alojamiento y Manuten', normalizedCategory:'match_organisation_expense', amountNative:-5.98, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.99
    { rawLabel:'Pasajes Aereos', normalizedCategory:'match_organisation_expense', amountNative:-1.223, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Pasajes Terrestres', normalizedCategory:'admin_general_expense', amountNative:-0.635, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-1.087, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Comisiones', normalizedCategory:'admin_general_expense', amountNative:-3.697, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Elementos de Aseo y C', normalizedCategory:'admin_general_expense', amountNative:-10.159, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.98
    { rawLabel:'Utiles', normalizedCategory:'admin_general_expense', amountNative:-2.141, disclosureLevel:'aggregated' }, // pág. 18, Claude 0.8
    { rawLabel:'Combustibles y Lubric', normalizedCategory:'admin_general_expense', amountNative:-8.414, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.96
    { rawLabel:'Taxis y Buses', normalizedCategory:'admin_general_expense', amountNative:-11.419, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Casino y Restaurante', normalizedCategory:'admin_general_expense', amountNative:-4.07, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Parqueaderos', normalizedCategory:'admin_general_expense', amountNative:-0.424, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Propiedades', normalizedCategory:'admin_general_expense', amountNative:-0.48, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Amortizacion Marcas y Derechos', normalizedCategory:'other_amortisation', amountNative:-516.474, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-41.78, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
  ],
};
const fortalezaceifcoFiscalYearMeta = {
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = 41,780. Nota 23 partida por un salto de página: las filas quedaron en la pág. 18 y el total solo en la 19; extraer la dejó afuera. (1.468) + 36.151 + 4.658 + 1 + 1.615 + 823 = 41.780.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (3,581). El PDF rotula 'Total Otros Ingresos' el total de la nota 25 COSTOS FINANCIEROS (gastos bancarios 389 + comisiones 1.944 + intereses 1.249): es un costo.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = 1,347,094. El documento no imprime el impuesto en ningún lado (sin estado de resultados, sin nota de impuesto, sin conciliación fiscal); el resultado final está en la nota de patrimonio y lo repiten 2018-2020. El impuesto se deduce.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = (639,077). Localizar (notas como estado) no vio el resultado impreso y el año quedó como fuente. El resultado de 2018 está en la nota de resultados acumulados; lo repiten 2019 (L767) y 2020.
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (103,918). Nota de gastos financieros (bancarios 31.728 + comisiones 12.692 + intereses 266 + diferencial cambiario 59.233) con el total rotulado 'Total Otros Ingresos' en el PDF, como en 2017: es un costo. Con el signo bien, el impuesto calculado da 40.604 y el documento imprime 'Impuesto de Renta y Complementarios 40,612' (L448).
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra por ajuste manual; las dudas de localizar y extraer no vuelven a la cola.
  2018: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2018-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-103.918, tax:-40.604,
    extraRows: [
      {label:'Costos financieros', value:-103.918},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-40.604},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Actividades Deportivas', lado:'revenue', importe:5867.804, motivo:'Guido 2026-10-02: tabla de categorías de Fortaleza aprobada (la propuesta de la IA).'},
    ],
    // tools/caja-deuda.mjs (2026-10-02): cash escalón 0 (compuerta: año anterior): "Bancos" pág. 8 + "Cajas" pág. 8
    // tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): "Total Prestamos y Sobregiros Bancarios" pág. 11
    grossDebt:4.398, cash:919.687,
    officialTotalRevenue:6420.964, officialTotalExpenses:6880.75, officialPAT:-639.077,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = (52,122). Localizar (notas como estado) no vio el resultado impreso y el año quedó como fuente. 'Utilidad Contable' de la liquidación del impuesto 2019; el documento 2020 lo imprime como 'Resultado Año 2019 (52,122)'.
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (48,426). El total de costos financieros está impreso en positivo y entraba sumando como ingreso; el impuesto calculado daba 114.320 en vez de 17.462.
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra por ajuste manual; las dudas de localizar y extraer no vuelven a la cola.
  2019: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2019-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-48.426, tax:-17.468,
    extraRows: [
      {label:'Costos financieros', value:-48.426},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-17.468},
    ],
    // tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: año anterior): "Total Prestamos y Sobregiros Bancarios" pág. 16
    // tools/caja-deuda.mjs (2026-10-05): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Total Efectivo y Equivalente de Efectivo (nota 8; su columna 2018, 919.687, es lo cargado)
    grossDebt:0.794, cash:169.648,
    officialTotalRevenue:3463.947, officialTotalExpenses:3450.175, officialPAT:-52.122,
  },
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = 1.021.768. Cerrado por la fuerza por decisión de Guido: el resultado antes de impuestos (1.609.817) cierra con las notas, pero ni restando ni sumando el 'Total impuesto a cargo' (589.589) da el resultado impreso; el impuesto contable es 588.049.
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: 'que nunca más vuelva como problema o duda'. Las dudas de localizar y extraer de 2023 las contesta la aritmética (cierra con las notas) y el ajuste de resultado final.
  2023: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2023-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-46.371, tax:-588.049,
    extraRows: [
      {label:'Los costos financieros están comprendidos al 31 de diciembre de:', value:-46.371},
      {label:'Total Impuesto a Cargo (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-588.049},
    ],
    // tools/caja-deuda.mjs (2026-10-02): cash escalón 1 (compuerta: documento siguiente): "Bancos" pág. 13 + "Caja" pág. 13
    // tools/caja-deuda.mjs (2026-10-05): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Préstamos y sobregiros bancarios del cuadro de instrumentos financieros, criterio del club; su columna 2022 (238.144) coincide con el documento 2022
    grossDebt:110, cash:19.742,
    officialTotalRevenue:5998.469, officialTotalExpenses:4342.281, officialPAT:1021.768,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  2024: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2024-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-106.157, tax:-410.566,
    extraRows: [
      {label:'Costos financieros', value:-106.157},
      {label:'Total Impuesto a Cargo', value:-410.566},
    ],
    // tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): "Préstamos y sobregiros bancarios" pág. 13; cash escalón 1 (compuerta: documento siguiente): "Bancos" pág. 13 + "Caja" pág. 13
    grossDebt:4.379, cash:97.795,
    officialTotalRevenue:12206.258, officialTotalExpenses:11223.212, officialPAT:466.323,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  2025: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-356.543, tax:-372.407,
    extraRows: [
      {label:'Costos Financieros (netos)', value:-356.543},
      {label:'Total, Impuesto a Cargo', value:-372.407},
    ],
    // tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 0 (compuerta: año anterior): "Préstamos y sobregiros bancarios" pág. 13; cash escalón 0 (compuerta: año anterior): "Efectivo" pág. 13
    grossDebt:31.338, cash:1767.496,
    officialTotalRevenue:23849.331, officialTotalExpenses:22806.941, officialPAT:313.44,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  2021: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2021-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-54.012, tax:0,
    // ajuste manual (Admin/ajustes-manuales.jsonl, 2026-10-05): grossDebt = "Préstamos y sobregiros bancarios" del cuadro de instrumentos financieros (nota 5.A, .md L506); antes 102.513, solo el corto plazo
    // tools/caja-deuda.mjs (2026-10-05): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Efectivo del cuadro de instrumentos financieros (nota 5.A) = Bancos 14.963 + Caja 5.073
    grossDebt:295.846, cash:20.036,
    officialTotalRevenue:3595.986, officialTotalExpenses:4189.291, officialPAT:-647.319,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = (175.117). Localizar no eligió el bloque del resultado impreso (el documento trae solo notas). Nota de patrimonio 'Resultados del ejercicio (175.117)'; lo repite el documento 2023 en su columna 2022 (L1099). Antes de impuestos: (199.789), L789.
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra por ajuste manual; las dudas de localizar y extraer no vuelven a la cola.
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): desglose = 54.000. Guido 2026-10-02 (opción a): el renglón dice 2.334.630 y su detalle suma 2.280.630 (error del documento); se abre igual con la diferencia como 'Diferencia en el documento', patrocinio.
  2022: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2022-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-48.42, tax:24.673,
    extraRows: [
      {label:'Los costos financieros están comprendidos al 31 de diciembre de:', value:-48.42},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:24.673},
    ],
    // tools/caja-deuda.mjs (2026-10-05): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Préstamos y sobregiros bancarios del cuadro de instrumentos financieros (nota 5), criterio del club; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Efectivo del cuadro de instrumentos financieros (nota 5); el documento 2023 lo abre en Bancos 239.614 + Caja 2.152
    grossDebt:238.144, cash:241.766,
    officialTotalRevenue:4302.126, officialTotalExpenses:4453.496, officialPAT:-175.117,
  },
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  2020: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2020-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-12.112, tax:8.182,
    extraRows: [
      {label:'Total Costos Financieros', value:-12.112},
      {label:'Impuesto De Renta Y Complementario', value:8.182},
    ],
    // tools/caja-deuda.mjs (2026-10-05): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Bancos 148.882 + Caja 2.483 (nota de efectivo; el cuadro de instrumentos financieros del documento 2021 imprime 151.365 para 2020)
    grossDebt:188.998, cash:151.365,
    officialTotalRevenue:2223.737, officialTotalExpenses:2922.233, officialPAT:-702.423,
  },
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = 41,780. Nota 23 partida por un salto de página: las filas quedaron en la pág. 18 y el total solo en la 19; extraer la dejó afuera. (1.468) + 36.151 + 4.658 + 1 + 1.615 + 823 = 41.780.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (3,581). El PDF rotula 'Total Otros Ingresos' el total de la nota 25 COSTOS FINANCIEROS (gastos bancarios 389 + comisiones 1.944 + intereses 1.249): es un costo.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = 1,347,094. El documento no imprime el impuesto en ningún lado (sin estado de resultados, sin nota de impuesto, sin conciliación fiscal); el resultado final está en la nota de patrimonio y lo repiten 2018-2020. El impuesto se deduce.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 4,220,658. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 1,027,450. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 70,183. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 1,600. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
  2017: { // tools/cargar.mjs (2026-10-04). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2017-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.581, tax:-291.595,
    extraRows: [
      {label:'Costos financieros', value:-3.581},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-291.595},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Actividades Deportivas', lado:'revenue', importe:4220.658, motivo:'Guido 2026-10-02: tabla de categorías de Fortaleza aprobada (la propuesta de la IA).'},
    ],
    grossDebt:0, cash:1181.51,
    officialTotalRevenue:5319.897, officialTotalExpenses:3628.133, officialPAT:1347.094,
  },
};
const fortalezaceifcoPresupuestoOverlayByYear = {};

const fortalezaceifcoPasesData = [];
const fortalezaceifcoResultadosData = {};
const fortalezaceifcoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fortalezaceif-co'] = {
  revenueLinesByYear: fortalezaceifcoRevenueLinesByYear, expenseLinesByYear: fortalezaceifcoExpenseLinesByYear,
  fiscalYearMeta: fortalezaceifcoFiscalYearMeta, pasesData: fortalezaceifcoPasesData,
  resultadosData: fortalezaceifcoResultadosData, titulosData: fortalezaceifcoTitulosData,
  presupuestoOverlayByYear: fortalezaceifcoPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (agregado por la Versión 379: el esqueleto del alta no lo traía).
Object.assign(sources, {
  'fortalezaceif-co-estados-financieros-2017': {
    id:'fortalezaceif-co-estados-financieros-2017', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2018': {
    id:'fortalezaceif-co-estados-financieros-2018', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2019': {
    id:'fortalezaceif-co-estados-financieros-2019', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2020': {
    id:'fortalezaceif-co-estados-financieros-2020', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2023': {
    id:'fortalezaceif-co-estados-financieros-2023', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2024': {
    id:'fortalezaceif-co-estados-financieros-2024', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2025': {
    id:'fortalezaceif-co-estados-financieros-2025', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2021': {
    id:'fortalezaceif-co-estados-financieros-2021', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'fortalezaceif-co-estados-financieros-2022': {
    id:'fortalezaceif-co-estados-financieros-2022', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['fortalezaceif-co'] = null;
