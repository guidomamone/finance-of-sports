// ============================================================================
// data/clubs.js — capa de identidad: qué clubes existen, de dónde sale cada
// número (Source), y qué gestiones/presidentes tiene cada uno.
// Esto es lo que le da a cada dato del sitio un lugar de dónde "colgar".
// ============================================================================

const clubs = {
  boca:   { id:'boca',   name:'Club Atlético Boca Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  river:  { id:'river',  name:'Club Atlético River Plate',  country:'AR', reportingCurrency:'ARS', fiscalYearStart:'01-01' },
  racing: { id:'racing', name:'Racing Club',                country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  velez:  { id:'velez',  name:'Club Atlético Vélez Sarsfield', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
};

// Source: de dónde sale cada número. reliability es lo que le permite al
// sitio mostrar "dato oficial" vs. "dato de prensa" vs. "placeholder" sin
// que esa distinción quede escondida en un comentario.
const sources = {
  'boca-presupuesto-2026-27': {
    id:'boca-presupuesto-2026-27', clubId:'boca',
    title:'Presupuesto Económico, Financiero y de Inversiones, Ejercicio N°123 (jul-2026 a jun-2027)',
    type:'official_budget', reliability:'primary',
    note:'PDF subido directamente por Guido. Transcripto completo en el acordeón "Presupuesto 2026/27 (oficial)" de Finanzas.',
  },
  'boca-placeholder-historico': {
    id:'boca-placeholder-historico', clubId:'boca',
    title:'Placeholder histórico 2018-2024 (números inventados para probar el diseño del sitio)',
    type:'estimate_placeholder', reliability:'placeholder',
    note:'Pendiente reemplazar con los balances oficiales de bocajuniors.com.ar/club/presupuesto (ver fuentes-por-club.md). El Ejercicio 2025 ya no es placeholder, ver boca-balance-2024-25.',
  },
  'boca-balance-2024-25': {
    id:'boca-balance-2024-25', clubId:'boca',
    title:'Memoria y Balance (estados contables auditados), Ejercicio Económico N°121, 1/7/2024 a 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.bocajuniors.com.ar/club/presupuesto',
    note:'PDF oficial (149 páginas, firmado por Comisión Directiva/Fiscalizadora, con dictamen de auditoría de Becher y Asociados S.R.L. sin salvedades, 10/09/2025), descargado del Google Drive linkeado en la página oficial del club. Cifras en moneda homogénea (reexpresadas a poder adquisitivo del 30/06/2025 según RT 6/17, Nota 2.2 del balance), no nominales del momento de cada operación. "Revenue" del sitio excluye ingresos por venta/rescisión de pases (se llevan netos a "Ganancia por venta de jugadores", ver comentario en yearsRaw de index.html); "wages" es la suma real de "Remuneraciones y cargas sociales" de los 8 anexos que la desglosan por departamento.',
  },
  'racing-presupuesto-2025-26-prensa': {
    id:'racing-presupuesto-2025-26-prensa', clubId:'racing',
    title:'Cobertura de prensa del presupuesto económico-financiero de Racing, julio 2025 a junio 2026',
    type:'press_coverage_of_assembly', reliability:'secondary_press',
    url:'https://x.com/Sacostaracing/status/1944855768127431049',
    note:'Hilo de X con el resumen presentado en asamblea, no el documento oficial del club. Los rubros vienen agrupados de forma más gruesa que los de Boca — por ejemplo "fútbol profesional" junto en vez de separado por TV/matchday/pases. Donde la prensa no desglosaba un monto, se dejó como línea residual "no desglosado" en vez de inventar categorías.',
  },
  'river-placeholder': {
    id:'river-placeholder', clubId:'river',
    title:'Placeholder (números enteramente inventados, sin ninguna fuente todavía)',
    type:'estimate_placeholder', reliability:'placeholder',
    note:'Sigue sin fuente real el Ejercicio 2025 (gestión Brito) y el Ejercicio 2021 (última temporada de D\'Onofrio). El Ejercicio 2024 ya no es placeholder, ver river-estados-contables-2023-24. Pendiente: cargar balance o presupuesto oficial para el resto (ver fuentes-por-club.md).',
  },
  'river-estados-contables-2023-24': {
    id:'river-estados-contables-2023-24', clubId:'river',
    title:'Estados Contables (balance auditado), Ejercicio Económico N°123, 1°/9/2023 al 31/8/2024',
    type:'unofficial_mirror', reliability:'secondary_mirror',
    url:'https://turiver.s3.us-west-000.backblazeb2.com/original/4X/1/7/a/17ac4c09709f687d2249c3e21b8e7c5262b78116.pdf',
    note:'PDF de 67 páginas con informe de auditoría independiente real y sellos de legalización, pero conseguido en una réplica subida por la comunidad tuRiver (turiver.com), NO desde el dominio oficial de River (riverplate.com/cariverplate.com.ar solo exponen la "Memoria" narrativa sin estados contables — ver river-data.js para el detalle de este hallazgo). El contenido en sí tiene toda la apariencia de ser el documento real y auditado; lo que no está confirmado por canal primario es la vía de distribución. Copia local en numeros-de-boca/Clubes/Argentina/River/estados-contables-leads/turiver-estados-contables.pdf. Transcripción completa en Clubes/Argentina/River/estados-contables-leads/river-estados-contables-2023-24.md. Convertido a USD con $950,50, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo V (Versión 32; antes se usaba $953,50, una cotización externa de Rava Bursátil/BCRA).',
  },
  'racing-placeholder': {
    id:'racing-placeholder', clubId:'racing',
    title:'Placeholder (ya no se usa — ver racing-balance-2023-24/2024-25/racing-presupuesto-2025-26)',
    type:'estimate_placeholder', reliability:'placeholder',
    note:'Todas las finanzas de Racing que estaban cargadas con esta fuente (Blanco placeholder puro, Milito con dato de prensa) se reemplazaron por documentos oficiales reales en la Versión 15/16. Queda esta entrada solo por si algún dato viejo la sigue referenciando.',
  },
  'racing-balance-2009': {
    id:'racing-balance-2009', clubId:'racing',
    title:'Estado de Recursos y Gastos (balance auditado), Ejercicio N°107, 1°/11/2008 al 31/10/2009',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2009.pdf',
    note:'PDF oficial (22 páginas, con texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. Ejercicio anterior a la presidencia de Víctor Blanco (asumió en 2013) — no se identificó con confianza quién presidía el club en este ejercicio específico, ver comentario en data/racing-data.js. El balance en sí documenta que Racing venía de una quiebra (línea "Resultado Extraordinario s/Quiebra"). GANANCIA real del ejercicio de $2.687.137 ARS. Cifras en pesos históricos, SIN reexpresión por inflación (la práctica de moneda homogénea/RT6 llegó recién con la crisis de los 2020) — convertido a USD con el dólar mayorista de cierre estimado en $3,82 al 31/10/2009 (no se encontró la cotización exacta de ese día puntual, se usó la cotización más cercana disponible, ver comentario en racing-data.js). Copia local en numeros-de-boca/Clubes/Argentina/Racing/balance2009.pdf.',
  },
  'racing-balance-2010': {
    id:'racing-balance-2010', clubId:'racing',
    title:'Estado de Recursos y Gastos (balance auditado), Ejercicio N°108, 1°/11/2009 al 31/10/2010',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2010.pdf',
    note:'PDF oficial (25 páginas, texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. PÉRDIDA real del ejercicio de $(9.714.118) ARS. Convertido a USD con el dólar mayorista interpolado linealmente entre los valores de apertura ($3,82) y cierre ($4,01) de 2010 publicados por cotizacion-dolar.com.ar (no se encontró la cotización exacta del 31/10/2010) — estimado en $3,98. Copia local en numeros-de-boca/Clubes/Argentina/Racing/balance2010.pdf.',
  },
  'racing-balance-2011': {
    id:'racing-balance-2011', clubId:'racing',
    title:'Estado de Recursos y Gastos (balance auditado), Ejercicio N°109, 1°/11/2010 al 31/10/2011',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2011.pdf',
    note:'PDF oficial (23 páginas, texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. GANANCIA real del ejercicio de $267.202 ARS (el propio documento imprime la fila como "RESULTADO FINAL (Pérdida)" pese a ser positiva — verificado por aritmética propia antes de cargar, es un rótulo de plantilla mal actualizado del documento original, no un error de este sitio). Convertido a USD con el dólar mayorista interpolado entre apertura ($4,01) y cierre ($4,32) de 2011 — estimado en $4,27, mismo criterio y misma limitación de fuente que el Ejercicio 2010. Copia local en numeros-de-boca/Clubes/Argentina/Racing/balance2011.pdf.',
  },
  'racing-balance-2012': {
    id:'racing-balance-2012', clubId:'racing',
    title:'Memoria y Balance (balance auditado), Ejercicio N°110, 1°/11/2011 al 31/10/2012',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2012.pdf',
    note:'PDF oficial (25 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Presidente Gastón Federico Cogorno (PRE-Blanco). BENEFICIO real del ejercicio de $17.024.354 ARS. A diferencia de 2009-2011 (cargados en USD ya-convertido con un dólar mayorista investigado externamente), este ejercicio se cargó en ARS NATIVO con $4,7260 por dólar, el tipo de cambio que el propio balance declara en su Anexo de Moneda Extranjera (lado Activo — el lado Pasivo usa $4,7660, inconsistencia menor). Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2012.pdf + racing-balance-2012.md).',
  },
  'racing-balance-2013': {
    id:'racing-balance-2013', clubId:'racing',
    title:'Memoria y Balance (balance auditado), Ejercicio N°111, 1°/11/2012 al 31/10/2013',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2013.pdf',
    note:'PDF oficial (28 páginas, 110° aniversario del club), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal, aunque de calidad de escaneo más baja que otros años; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). BENEFICIO real del ejercicio de $11.226.840 ARS. Presidencia de este ejercicio puntual INCIERTA (ninguna página del balance muestra firma rotulada "Presidente"; cargado como gestionId:null por inferencia de fecha, no confirmado — ver nota en racing-balance-2013.md). Convertido a USD con $5,8720 por dólar, la tasa dominante que declara el propio balance en su Anexo de Moneda Extranjera. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2013.pdf + racing-balance-2013.md).',
  },
  'racing-balance-2014': {
    id:'racing-balance-2014', clubId:'racing',
    title:'Memoria y Balance (balance auditado), Ejercicio N°112 (irregular de 10 meses), 1°/11/2013 al 31/8/2014',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2014.pdf',
    note:'PDF oficial (38 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Ejercicio irregular de 10 meses, de transición del cierre de octubre al de agosto. Presidente Víctor Blanco Rodríguez. BENEFICIO real del ejercicio de $100.936.735 ARS. Mismo ejercicio que `racing-presupuesto-2013-14` (cargado antes como dato primario, ahora columna "Presupuesto" de comparación) — con este balance el ejercicio pasa a `reportType:\'official_budget_and_balance\'`. Convertido a USD con $8,3070 por dólar, la tasa dominante que el propio balance declara en su Anexo de Moneda Extranjera. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2014.pdf + racing-balance-2014.md).',
  },
  'racing-presupuesto-2013-14': {
    id:'racing-presupuesto-2013-14', clubId:'racing',
    title:'Presupuesto Financiero, Ejercicio 2013/2014 (1°/9/2013 al 31/8/2014)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto2013-14.pdf',
    note:'PDF oficial (10 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; las 3 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotaron para leerlas). Primer presupuesto de la gestión Blanco cargado al sitio (firmado por Víctor Blanco Rodríguez como Presidente). Mismo ejercicio que `racing-balance-2014` (el balance real, dato primario desde que se cargó — este presupuesto pasó a ser la columna "Presupuesto" de comparación en "Estado de resultados"). Convertido a USD con $6,00 por dólar, promedio de los 2 puntos que el propio presupuesto declara como premisa ($5,80 al 31/12/13, $6,20 para el semestre siguiente). Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (presupuesto2013-14.pdf + racing-presupuesto-2013-14.md).',
  },
  'racing-balance-2014-15': {
    id:'racing-balance-2014-15', clubId:'racing',
    title:'Memoria y Balance (balance auditado), Ejercicio N°113, 1°/9/2014 al 31/8/2015',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2015.pdf',
    note:'PDF oficial (25 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos I/II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). BENEFICIO real del ejercicio de $102.544.513 ARS. Sin presupuesto propio en el archivo para este mismo ejercicio (salta de presupuesto2013-14 a presupuesto2015-16). Convertido a USD con $9,20 por dólar, el dólar oficial de cierre de agosto de 2015, la tasa dominante que declara el propio balance en su Anexo de Moneda Extranjera (algunas líneas de crédito heredadas mantienen tipos de cambio históricos congelados de ejercicios anteriores, no representativos, no se usaron). Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2015.pdf + racing-balance-2014-15.md).',
  },
  'racing-balance-2017': {
    id:'racing-balance-2017', clubId:'racing',
    title:'Memoria y Balance (balance auditado), Ejercicio N°115, 1°/9/2016 al 31/8/2017',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2017.pdf',
    note:'PDF oficial (34 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos I/II/III/V estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Segundo ejercicio con auditoría externa (Estudio Bertora y Asociados S.R.L.). Presidente Víctor Blanco Rodríguez. SUPERÁVIT real del ejercicio de $134.160.676 ARS. Sin presupuesto propio en el archivo (no existe presupuesto2016-17.pdf). La columna comparativa "31/08/2016" de este documento coincide exacto con racing-balance-2016 (a diferencia de la transición 2015→2016, acá no hubo reclasificación del auditor). Convertido a USD con $17,21 por dólar, la tasa dominante que el propio balance declara en su Anexo V. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2017.pdf + racing-balance-2017.md).',
  },
  'racing-balance-2016': {
    id:'racing-balance-2016', clubId:'racing',
    title:'Memoria y Balance (balance auditado), Ejercicio N°114, 1°/9/2015 al 31/8/2016',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2016.pdf',
    note:'PDF oficial (36 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III/V estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Primer ejercicio con auditoría externa (Estudio Bertora y Asociados S.R.L.). Presidente Víctor Blanco Rodríguez. BENEFICIO real del ejercicio de $193.973.303 ARS. Mismo ejercicio que `racing-presupuesto-2015-16` (cargado antes como dato primario, ahora columna "Presupuesto" de comparación) — con este balance el ejercicio pasa a `reportType:\'official_budget_and_balance\'`. OJO: la columna comparativa "31/08/2015" de este documento fue reclasificada por el nuevo auditor (Nota 1.c del propio documento) y NO coincide con `racing-balance-2014-15` — no se tocaron los datos ya cargados de ese ejercicio, ver nota completa en racing-balance-2016.md. Convertido a USD con $14,83 por dólar, la tasa dominante que el propio balance declara en su Anexo V. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2016.pdf + racing-balance-2016.md).',
  },
  'racing-presupuesto-2015-16': {
    id:'racing-presupuesto-2015-16', clubId:'racing',
    title:'Presupuesto Financiero, Ejercicio 2015/2016 (1°/9/2015 al 31/8/2016)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto2015-16.pdf',
    note:'PDF oficial (11 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; las 3 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotaron para leerlas). Mismo formato que `racing-presupuesto-2013-14`, con premisas macro que ya reflejan la devaluación de diciembre de 2015 (2 tipos de cambio declarados, dólar y euro). Mismo ejercicio que `racing-balance-2016` (el balance real, dato primario desde que se cargó — este presupuesto pasó a ser la columna "Presupuesto" de comparación). Convertido a USD con $11,80 por dólar, promedio de los 2 puntos que el propio presupuesto declara como premisa ($10,10 al 31/12/15, $13,5 para el semestre siguiente). Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (presupuesto2015-16.pdf + racing-presupuesto-2015-16.md).',
  },
  'racing-presupuesto-2017-18': {
    id:'racing-presupuesto-2017-18', clubId:'racing',
    title:'Presupuesto Financiero, Ejercicio 2017/2018 (1°/9/2017 al 31/8/2018)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto2017-18.pdf',
    note:'PDF oficial (11 páginas, texto extraíble nativo) del archivo de racingclub.com.ar/informes/. Presupuesto de Recursos y Gastos en base de CAJA (cash-flow mensual, 12 columnas), no el formato acumulado/accrual de los presupuestos 2025-26/2026-27. Mismo ejercicio que `racing-balance-2018` (el balance real, dato primario desde la Versión 64) — este presupuesto es la columna "Presupuesto" de comparación en "Estado de resultados". Convertido a USD con $20 por dólar, el tipo de cambio único que el propio presupuesto declara como premisa ("Premisas Macro"), distinto al $36,65 del balance. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (presupuesto2017-18.pdf + racing-presupuesto-2017-18.md).',
  },
  'racing-presupuesto-2018-19': {
    id:'racing-presupuesto-2018-19', clubId:'racing',
    title:'Presupuesto Financiero de Recursos y Gastos, Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto2018-19.pdf',
    note:'PDF oficial (9 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal en ninguna página; las 2 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotó la imagen para leerlas en orientación normal). Sin balance real cargado todavía para este mismo ejercicio (`reportType:\'official_budget\'` simple) — es un ejercicio PRESUPUESTO-ONLY por ahora, mismo estado en el que estuvo `racing-presupuesto-2017-18` hasta que se cargó su balance. Convertido a USD con $40 por dólar, el tipo de cambio único que el propio presupuesto declara como premisa ("Premisas Macro"). Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (presupuesto2018-19.pdf + racing-presupuesto-2018-19.md).',
  },
  'racing-balance-2018': {
    id:'racing-balance-2018', clubId:'racing',
    title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°116, 1°/9/2017 al 31/8/2018',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2018.pdf',
    note:'PDF oficial (36 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal, no hizo falta deskew). SUPERÁVIT real: $616.520.502 ARS. Mismo ejercicio que `racing-presupuesto-2017-18` (cargado antes, en la Versión 63) — con este balance el ejercicio pasa a `reportType:\'official_budget_and_balance\'`. Convertido a USD con $36,65, el tipo de cambio de cierre que el propio balance declara en su Anexo V. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2018.pdf + racing-balance-2018.md).',
  },
  'racing-balance-2019-20': {
    id:'racing-balance-2019-20', clubId:'racing',
    title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°118, 1°/9/2019 al 31/8/2020',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2019-20.pdf',
    note:'PDF oficial (33 páginas, texto extraíble nativo) bajado de racingclub.com.ar/informes/. Último ejercicio con cierre a agosto (la Asamblea del 18/12/2019 aprobó pasar el cierre a 30 de junio desde el ejercicio siguiente). Tiene también su propio Presupuesto real cargado como overlay de comparación, ver `racing-presupuesto-2019-20`. Convertido a USD con $73,98, el tipo de cambio de cierre que el propio balance declara en su Anexo V. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2019-20.pdf + racing-balance-2019-20.md).',
  },
  'racing-presupuesto-2019-20': {
    id:'racing-presupuesto-2019-20', clubId:'racing',
    title:'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2019/2020 (1°/9/2019 al 31/8/2020)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto2019-20.pdf',
    note:'PDF oficial (8 páginas), a diferencia de la mayoría de los presupuestos de este archivo es un ESCANEO puro (sin texto extraíble), transcripto con el Read tool sobre imágenes de página, corrigiendo primero una inclinación diagonal real del escaneo (~0,78°, ver `.claude/skills/club-data-mapping/SKILL.md` sección 9 para la receta de deskew). Mismo ejercicio que `racing-balance-2019-20` (el balance real, dato primario) — este presupuesto es la columna "Presupuesto" de comparación en "Estado de resultados". Convertido a USD con $70, el tipo de cambio que el propio presupuesto declara como premisa (distinto al $73,98 del balance). Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (presupuesto2019-20.pdf + racing-presupuesto-2019-20.md).',
  },
  'racing-balance-2021': {
    id:'racing-balance-2021', clubId:'racing',
    title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°119 (irregular de 10 meses), 1°/9/2020 al 30/6/2021',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2021.pdf',
    note:'PDF oficial (35 páginas, texto extraíble nativo) bajado de racingclub.com.ar/informes/. Ejercicio irregular de 10 meses, de transición del cierre de agosto al de junio (ver `racing-balance-2019-20`). SUPERÁVIT real chico: $7.012.082 ARS. Sin presupuesto propio en el archivo para este mismo ejercicio (`presupuesto2020-21.pdf` no existe). Convertido a USD con $95,52, el tipo de cambio de cierre que el propio balance declara en su Anexo V, usado sin excepciones en todo el anexo. Copia local y transcripción completa en numeros-de-boca/Clubes/Argentina/Racing/ (balance2021.pdf + racing-balance-2021.md).',
  },
  'racing-balance-2023-24': {
    id:'racing-balance-2023-24', clubId:'racing',
    title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°122, 1°/7/2023 al 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2024.pdf',
    note:'PDF oficial (40 páginas, con informe de auditoría de Bertora y Asociados S.R.L., firmado por Víctor Blanco Rodríguez como Presidente), bajado directo de racingclub.com.ar/informes/ — a diferencia de Boca y River, este PDF tiene texto extraíble (no es un escaneo). Última temporada de la gestión Blanco: DÉFICIT real del ejercicio de $(6.127.619.872) ARS. Cifras en moneda homogénea al 30/06/2024 (RT 6). Copia local en numeros-de-boca/Clubes/Argentina/Racing/balance2024.pdf. Convertido a USD con $909, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo VI (Versión 32; antes se usaba $912, una cotización externa).',
  },
  'racing-balance-2024-25': {
    id:'racing-balance-2024-25', clubId:'racing',
    title:'Estado de Recursos y Gastos + Estado de Situación Patrimonial (balance auditado), Ejercicio N°123, 1°/7/2024 al 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/balance2025.pdf',
    note:'PDF oficial (43 páginas, con informe de auditoría de Bertora y Asociados S.R.L., firmado por Diego Alberto Milito como Presidente), bajado directo de racingclub.com.ar/informes/. Primer ejercicio completo de la gestión Milito (asumió 20/12/2024, a mitad de este ejercicio, pero el balance está firmado y presentado bajo su gestión): déficit real del ejercicio de $(178.451.821) ARS, mucho menor al de la gestión anterior. Cifras en moneda homogénea al 30/06/2025 (RT 6). Copia local en numeros-de-boca/Clubes/Argentina/Racing/balance2025.pdf. Convertido a USD con $1.196, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo VI (Versión 32; antes se usaba $1.203, una cotización externa).',
  },
  'racing-presupuesto-2025-26': {
    id:'racing-presupuesto-2025-26', clubId:'racing',
    title:'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2025/2026 (1°/7/2025 al 30/6/2026)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto-2025-26.pdf',
    note:'PDF oficial (8 páginas) bajado directo de racingclub.com.ar/informes/ — reemplaza a racing-presupuesto-2025-26-prensa (un hilo de X), ahora con el documento real: un presupuesto financiero mensual (12 columnas, jul-25 a jun-26) mucho más detallado que la cobertura de prensa. Convertido a USD con el tipo de cambio promedio que el propio presupuesto declara como premisa ($1.438), no con un tipo de cambio de cierre (todavía no cerró este ejercicio). Copia local en numeros-de-boca/Clubes/Argentina/Racing/presupuesto2025-26.pdf.',
  },
  'racing-presupuesto-2026-27': {
    id:'racing-presupuesto-2026-27', clubId:'racing',
    title:'Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2026/2027 (1°/7/2026 al 30/6/2027)',
    type:'official_budget', reliability:'primary',
    url:'https://www.racingclub.com.ar/informes/presupuesto-2026-27.pdf',
    note:'PDF oficial (8 páginas, texto nativo) bajado directo de racingclub.com.ar/informes/, mismo formato que racing-presupuesto-2025-26 (presupuesto financiero mensual, 12 columnas jul-26 a jun-27). Transcripción completa en Clubes/Argentina/Racing/presupuesto2026-27.md (Versión 32). Convertido a USD con el promedio de los dos tipos de cambio que el propio presupuesto declara como premisa ($1.505 para julio 2026 y $1.870 para junio 2027) = $1.687,5 — mismo criterio que usa Boca para su Presupuesto 2027.',
  },
  'velez-balance-2024-25': {
    id:'velez-balance-2024-25', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°115, 1°/7/2024 al 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (50 páginas, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 15/10/2025, firmado por Luis Fabián Berlanga como Presidente), descargado de la página institucional de balances del club (archivo completo, 2015-2025). Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2025.pdf. Cifras en moneda homogénea (reexpresadas según FACPCE, Nota 1.b). Convertido a USD con $1.196, el tipo de cambio de cierre que el propio balance declara en su Anexo VI (Activos y pasivos en moneda extranjera) para USD al 30/06/2025 — mismo valor que declaró el balance de Racing para la misma fecha de cierre. SUPERÁVIT real del ejercicio: $36.833.752 ARS (mucho más chico que el del ejercicio anterior, que fue déficit de $(1.551.939.880) ARS). "Salarios y primas (plantel y cuerpo técnico)" se separó de "Otras secciones deportivas" usando la columna "FÚTBOL PROFESIONAL" del Anexo III (el club desglosa gastos por sector: fútbol profesional/amateur/complejo polideportivo/enseñanza/culturales/otros deportes), no el total de sector — ver comentario completo en data/velez-data.js.',
  },
  'velez-balance-2023-24': {
    id:'velez-balance-2023-24', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°114, 1°/7/2023 al 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (48 páginas, texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 7/10/2024, firmado por Luis Fabián Berlanga como Presidente), mismo archivo institucional que el Ejercicio 2025. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2024.pdf. Convertido a USD con $909, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2024. DÉFICIT real del ejercicio: $(1.113.139.098) ARS. Mismo criterio de categorización que el Ejercicio 2025 (ver data/velez-data.js): "Primas y premios" se cargó completa en wages_squad (99,94% ya es columna Fútbol Profesional); "Costo de desarrollo de jugadores propios" es un crédito que compensa exacto la columna Amateur del Anexo III (confirmado: esa columna suma $0 neto en el total impreso).',
  },
  'velez-balance-2014-15': {
    id:'velez-balance-2014-15', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°105, 1°/7/2014 al 30/6/2015',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial ESCANEADO, de tamaño de página reducido (178x252pt), sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 450-900dpi según la página; algunas tablas anchas rotadas 90° en el escaneo original). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 28/9/2015, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017 — NO Rapisarda, que asumió recién en noviembre 2017). Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2015.pdf (transcripción en balance-general-2015.md). Convertido a USD con $8,988, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2015 (previo a la devaluación de diciembre 2015). DÉFICIT real del ejercicio: $(36.195.305) ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); varios valores de columnas intermedias del Anexo III tuvieron ruido de OCR de unos pocos miles de pesos, pero los valores usados (columna Fútbol Profesional y columna Total del año) se verificaron con una suma fila por fila que cierra EXACTO contra el total impreso.',
  },
  'velez-balance-2015-16': {
    id:'velez-balance-2015-16', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°106, 1°/7/2015 al 30/6/2016',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 450dpi; algunas tablas anchas rotadas 90°). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 26/9/2016, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017). Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2016.pdf (transcripción en balance-general-2016.md). Convertido a USD con $14,94, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2016. SUPERÁVIT real del ejercicio: $66.227.589 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); TODAS las sumas del Anexo II/III/IV cerraron exacto contra los totales impresos, sin ruido de OCR detectado — y la columna comparativa "2015" de este mismo balance confirmó, en forma independiente, cada cifra ya cargada para el Ejercicio 2015.',
  },
  'velez-balance-2016-17': {
    id:'velez-balance-2016-17', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°107, 1°/7/2016 al 30/6/2017',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 300dpi; algunas tablas anchas rotadas 90° en el escaneo original). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 25/9/2017, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017). Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2017.pdf (transcripción en balance-general-2017.md). Convertido a USD con $16,53, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2017. DÉFICIT real del ejercicio: $(73.534.953) ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); casi todas las filas del Anexo III cerraron su checksum interno exacto, el total del Anexo/Gastos Ordinarios tiene una diferencia de $40 (ruido de OCR irrelevante) contra el impreso.',
  },
  'velez-balance-2017-18': {
    id:'velez-balance-2017-18', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°108, 1°/7/2017 al 30/6/2018',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 24/9/2018, firmado por Sergio D. Rapisarda como Presidente, su primera gestión), mismo archivo institucional. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2018.pdf. Convertido a USD con $28,75, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2018. SUPERÁVIT real del ejercicio: $342.815.648 ARS. Este ejercicio (cierre 30/6/2018) es el último ANTES de que la FACPCE empezara a considerar a la Argentina economía de alta inflación (desde el 1°/7/2018) — no tiene línea de RECPAM en Resultados financieros, a diferencia de todos los ejercicios posteriores. Mismo criterio de categorización que el resto (ver data/velez-data.js).',
  },
  'velez-balance-2018-19': {
    id:'velez-balance-2018-19', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°109, 1°/7/2018 al 30/6/2019',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 16/9/2019, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2019.pdf. Convertido a USD con $42,263, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2019. SUPERÁVIT real del ejercicio: $370.018.627 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); incluye una línea de crédito por "Regularización valuación plantel profesional de fútbol (Ejercicio 2015)" (mismo tipo de ajuste que aparece también en el Ejercicio 2020) y una línea nueva "Subvención a otras entidades" (donación del club a terceros, monto ínfimo, other_expenses).',
  },
  'velez-balance-2019-20': {
    id:'velez-balance-2019-20', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°110, 1°/7/2019 al 30/6/2020',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 13/11/2020, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2020.pdf. Convertido a USD con $70,26, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2020. DÉFICIT real del ejercicio: $(145.019.616) ARS. Ejercicio de pandemia (COVID-19): incluye el mismo subsidio estatal "Subsidio A.T.P." que el Ejercicio 2021. Mismo criterio de categorización que el resto (ver data/velez-data.js); incluye una línea de crédito por "Regularización valuación plantel profesional de fútbol (Ejercicio 2015)" que reduce el costo de amortización de este ejercicio en particular.',
  },
  'velez-balance-2020-21': {
    id:'velez-balance-2020-21', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°111, 1°/7/2020 al 30/6/2021',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 28/9/2021, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2021.pdf. Convertido a USD con $95,52, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2021. DÉFICIT real del ejercicio: $(753.625.872) ARS. Incluye un ingreso extraordinario COVID ("Subsidio A.T.P.", programa estatal de asistencia al trabajo y la producción) categorizado como other_income. Mismo criterio de categorización que 2022/2024/2025 (ver data/velez-data.js).',
  },
  'velez-balance-2021-22': {
    id:'velez-balance-2021-22', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°112, 1°/7/2021 al 30/6/2022',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 30/9/2022, firmado por Sergio D. Rapisarda como Presidente, NO Berlanga — ejercicio anterior a su gestión), mismo archivo institucional. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2022.pdf. Convertido a USD con $125,03, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2022. SUPERÁVIT real del ejercicio: $1.216.670.585 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js).',
  },
  'velez-balance-2022-23': {
    id:'velez-balance-2022-23', clubId:'velez',
    title:'Estados Contables (Balance General auditado), Ejercicio N°113, 1°/7/2022 al 30/6/2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
    note:'PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 300dpi; páginas con tablas anchas de 6 columnas rotadas 90° en el escaneo original se re-rotaron antes de correr el OCR para que saliera legible). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 25/9/2023, firmado por el Vicepresidente 1° (Lic. Diego González) en lugar de Rapisarda — Rapisarda se tomó licencia recién en julio 2023, después del cierre de este ejercicio, así que el ejercicio en sí transcurrió íntegro bajo su presidencia. Copia local en numeros-de-boca/Clubes/Argentina/Velez Sarsfield/balance-general-2023.pdf (transcripción en balance-general-2023.md). Convertido a USD con $256,30, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2023. SUPERÁVIT real del ejercicio: $522.234.138 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); los números se verificaron con 2 sumas independientes del Anexo III antes de cargarlos (ambas coinciden exacto con el total impreso), no solo con el OCR crudo.',
  },
};

// Gestion: un presidente/período por club. Se guarda por club para evitar que
// dos clubes con presidentes de apellido parecido choquen entre sí.
const gestionesByClub = {
  boca: {
    riquelme:  { nombre:'Riquelme (2023-actual)', firstYear:2024, lastYear:2027 },
    ameal:     { nombre:'Ameal (2019-2023)',      firstYear:2021, lastYear:2023 },
    angelici:  { nombre:'Angelici (2015-2019)',   firstYear:2018, lastYear:2019 },
  },
  river: {
    brito:    { nombre:'Brito (2021-actual)',   firstYear:2025, lastYear:2025 },
    donofrio: { nombre:"D'Onofrio (2013-2021)", firstYear:2021, lastYear:2021 },
  },
  racing: {
    // milito.firstYear=2025 es su primer ejercicio REAL completo (balance auditado, Ejercicio
    // N°123); lastYear=2027 es el presupuesto vigente (Ejercicio 2026-27, todavía no cerró — el
    // Ejercicio 2025-26 sí cerró en jun-2026 pero el balance auditado real todavía no se publicó,
    // ver to-do en index.html; se actualizó de 2026 a 2027 en la Versión 32 al cargar el nuevo
    // presupuesto).
    milito: { nombre:'Milito (2024-actual)', firstYear:2025, lastYear:2027 },
    // blanco.firstYear: mismo criterio siempre, "el ejercicio REAL más antiguo cargado de esta
    // gestión", no la fecha exacta en que asumió (2013). Pasó de 2024 a 2020 en la Versión 58
    // (balance2019-20.pdf), de 2020 a 2018 en la Versión 63 (presupuesto2017-18.pdf), y de 2018 a
    // 2014 en la Versión 67 (presupuesto2013-14.pdf, su primer presupuesto como Presidente).
    blanco: { nombre:'Blanco (2013-2024)',   firstYear:2014, lastYear:2024 },
  },
  velez: {
    // Confirmado (Versión 83): Fabián Berlanga fue electo presidente el 12/11/2023 (nota oficial
    // del club, velez.com.ar/club/notas/2023/11/12/220544_fabian-berlanga-presidente), mandato
    // 2023-2026. `nombre` ya refleja esa fecha real de asunción. firstYear/lastYear siguen siendo
    // el rango de EJERCICIOS REALES CARGADOS (no la fecha de asunción) — mismo criterio que
    // "milito"/"blanco" de Racing. Ampliado a 2024 en la Versión 84 (el Ejercicio 114, 1°/7/2023 al
    // 30/6/2024, cae bajo su gestión — asumió en noviembre 2023, a mitad de ese ejercicio).
    berlanga: { nombre:'Berlanga (2023-actual)', firstYear:2024, lastYear:2025 },
    // Confirmado (Versión 85): Sergio Rapisarda asumió por primera vez en noviembre 2017, fue
    // reelecto en marzo 2021, y se tomó licencia en julio 2023 tras la agresión de barras (dejando
    // paso, meses después, a la elección de Berlanga en noviembre 2023). Ampliado a 2018 en la
    // Versión 89 (el Ejercicio 108, 1°/7/2017 al 30/6/2018, también cae dentro de su primera
    // gestión — asumió en noviembre 2017, a mitad de este ejercicio).
    // Ampliado a 2023 en la Versión 90 (Ejercicio 113, 1°/7/2022 al 30/6/2023) — el ejercicio
    // transcurrió íntegro bajo su presidencia aunque el balance esté firmado por el Vicepresidente
    // (Rapisarda se tomó licencia recién en julio 2023, después del cierre de este ejercicio).
    rapisarda: { nombre:'Rapisarda (2017-2023)', firstYear:2018, lastYear:2023 },
    // Confirmado por búsqueda (Versión 91): Raúl H. Gámez fue presidente de Vélez en 3 mandatos no
    // consecutivos (1996-1999, 2002-2005, 2014-2017); el Ejercicio 2015 (1°/7/2014-30/6/2015) cae
    // en su 3er mandato, el único cargado hasta ahora bajo su gestión.
    // Ampliado a 2017 en la Versión 92 (Ejercicio 107, 1°/7/2016 al 30/6/2017, último de su 3ra
    // gestión antes de que asumiera Rapisarda en noviembre 2017).
    gamez: { nombre:'Gámez (2014-2017)', firstYear:2015, lastYear:2017 },
  },
};

// Socios: solo se cargó donde se encontró un número real y citable en esta sesión
// (Racing, de la cobertura de prensa de su presupuesto; Vélez, de su ficha de Wikipedia). Boca usa
// el número que ya tenía el sitio. River queda null a propósito: no se encontró una cifra confiable.
const memberCountByClub = {
  boca: 365000,
  river: null,
  racing: 86529,
  velez: 72889,
};
