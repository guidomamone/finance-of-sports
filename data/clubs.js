// ============================================================================
// data/clubs.js — capa de identidad: qué clubes existen, de dónde sale cada
// número (Source), y qué gestiones/presidentes tiene cada uno.
// Esto es lo que le da a cada dato del sitio un lugar de dónde "colgar".
// ============================================================================

const clubs = {
  boca:   { id:'boca',   name:'Club Atlético Boca Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  river:  { id:'river',  name:'Club Atlético River Plate',  country:'AR', reportingCurrency:'ARS', fiscalYearStart:'01-01' },
  racing: { id:'racing', name:'Racing Club',                country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
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
    blanco: { nombre:'Blanco (2013-2024)',   firstYear:2024, lastYear:2024 },
  },
};

// Socios: solo se cargó donde se encontró un número real y citable en esta sesión
// (Racing, de la cobertura de prensa de su presupuesto). Boca usa el número que ya
// tenía el sitio. River queda null a propósito: no se encontró una cifra confiable.
const memberCountByClub = {
  boca: 365000,
  river: null,
  racing: 86529,
};
