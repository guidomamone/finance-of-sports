// ============================================================================
// data/clubs.js — capa de identidad: qué clubes existen (clubs{}), de dónde sale
// cada número (sources{}), y qué gestiones/presidentes tiene cada uno
// (gestionesByClub{}/memberCountByClub{}).
//
// Versión 101 (refactor de escalabilidad, a pedido de Guido): `clubs{}` sigue siendo
// centralizado acá — es chico (5 campos por club) y hace falta ANTES de que se elija
// ningún club (populateClubSelect() arma el dropdown entero al cargar la página, antes de
// que se lazy-cargue el archivo de ningún club), así que no puede autoregistrarse desde
// un archivo que todavía no se pidió. En cambio, `sources{}`/`gestionesByClub{}`/
// `memberCountByClub{}` — el contenido que de verdad crece y se vuelve pesado con cada
// club nuevo — SÍ se autoregistran: acá solo quedan declarados (con Boca adentro, el único
// club eager-loaded) y cada `data/<club>-data.js` les agrega su propia entrada al final,
// con `Object.assign(sources, {...})`/`gestionesByClub.<club> = {...}`/
// `memberCountByClub.<club> = ...` (nunca redeclarando el `const`). Agregar un club nuevo
// significa: 1 línea acá en `clubs{}`, y su propio archivo se ocupa del resto.
// ============================================================================

// `displayName`: el nombre CORTO que se muestra en el dropdown de clubes del header
// (`#clubSelect`, ver index.html/populateClubSelect()) — antes cada <option> se escribía a
// mano en el HTML, con este mismo texto tipeado por separado; ahora el dropdown se genera
// en runtime a partir de este campo. `name` (el nombre legal completo) sigue usándose donde
// ya se usaba (pestaña Fuentes, etc.).
// `sport` (Versión 137): el deporte del club, para el primer nivel del selector jerárquico. Hoy los
// 41 dicen `'futbol'` y es redundante, pero el campo existe desde ahora para que sumar un club de
// otro deporte no obligue a migrar los 41. Va en el club y no derivado de su liga porque un club no
// cambia de deporte: no hay ninguna arista con año que valga.
//
// NO HAY, NI VA A HABER, UN CAMPO `league` ACÁ (decisión de la Versión 137, después de que Guido
// levantara el problema: "si el usuario quiere ver cuánto generaba una liga en 2025 y 2024, 2023,
// 2022, tiene que tener en cuenta que los clubes fueron cambiando"). La membresía de liga es
// (club, ejercicio) → liga y vive SOLO en `data/club-leagues.js`. Un `clubs[id].league` con "la liga
// de hoy" sería una segunda verdad sobre el mismo hecho, y encima inútil para todo agregado de liga,
// que necesita saber quiénes la integraban ESE año. Ver la cabecera de `data/leagues.js`.
const clubs = {
  boca:   { id:'boca',   name:'Club Atlético Boca Juniors', displayName:'Boca Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  // fiscalYearStart corregido a '09-01' en esta sesión (onboarding de Brasil): decía '01-01' desde
  // siempre, un dato incorrecto pero inofensivo mientras nada leía este campo (ver comentario de
  // `isCalendarYearClub()` en js/finanzas-calc.js, agregado esta sesión — es la primera vez que
  // `fiscalYearStart` se usa de verdad). El ejercicio real de River corre de 1° de septiembre a 31 de
  // agosto (ver cabecera de data/river-data.js: "Ejercicio 2024 (1° de septiembre de 2023 al 31 de
  // agosto de 2024...)"), nunca fue año calendario — con el '01-01' viejo, `isCalendarYearClub('river')`
  // hubiera dado true por error y el dropdown "Año"/tabla "Estado de resultados" de River habrían
  // perdido el rango de temporada "2023/2024", mostrando solo "2024" suelto, un caso real de dato
  // muerto que se vuelve vivo (y rompe algo) al generalizar una función existente — visto y corregido
  // en el spot-check del navegador de esta sesión, no antes.
  river:  { id:'river',  name:'Club Atlético River Plate',  displayName:'River Plate', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'09-01', sport:'futbol' },
  racing: { id:'racing', name:'Racing Club',                displayName:'Racing Club', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  velez:  { id:'velez',  name:'Club Atlético Vélez Sarsfield', displayName:'Vélez Sarsfield', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  instituto: { id:'instituto', name:'Instituto Atlético Central Córdoba', displayName:'Instituto ACC', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  rosariocentral: { id:'rosariocentral', name:'Club Atlético Rosario Central', displayName:'Rosario Central', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  independiente: { id:'independiente', name:'Club Atlético Independiente', displayName:'Independiente', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  argentinosjuniors: { id:'argentinosjuniors', name:'Asociación Atlética Argentinos Juniors', displayName:'Argentinos Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  estudianteslp: { id:'estudianteslp', name:'Club Estudiantes de La Plata', displayName:'Estudiantes de La Plata', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  sanlorenzo: { id:'sanlorenzo', name:'Club Atlético San Lorenzo de Almagro', displayName:'San Lorenzo', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  union: { id:'union', name:'Club Atlético Unión', displayName:'Unión', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol' },
  // Primer club no argentino del sitio (Versión 104). reportingCurrency:'MXN' — ver data/currency-map.js
  // (entrada MXN, scale:1) y data/clubamerica-data.js (comentario de cabecera) para el detalle completo
  // de la fuente (segmento de negocio de una compañía bursátil, no un balance propio del club).
  // fiscalYearStart:'01-01': Ollamani reporta en año calendario (1/1 a 31/12), no en un ejercicio
  // partido como los clubes argentinos.
  clubamerica: { id:'clubamerica', name:'Club de Fútbol América, S.A. de C.V.', displayName:'Club América', country:'MX', reportingCurrency:'MXN', fiscalYearStart:'01-01', sport:'futbol' },
  // Japón (J.League), sesión 2026-09-13: 10 clubes, todos con Ejercicio 2025 (temporada calendario
  // ene-dic 2025, la convención estándar de J.League — ninguno de estos 10 está en la lista de 7
  // clubes con cierre marzo/junio del club_doc-2025.pdf, ver fuentes/Japón/_notas-generales.md).
  // reportingCurrency:'JPY' — ver data/currency-map.js para el CURRENCY_META nuevo. displayName usa
  // el nombre corto habitual en español/inglés (el que ya usan medios deportivos hispanohablantes),
  // name lleva el nombre oficial completo en inglés.
  kashimaantlers: { id:'kashimaantlers', name:'Kashima Antlers Football Club', displayName:'Kashima Antlers', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  urawareddiamonds: { id:'urawareddiamonds', name:'Urawa Red Diamonds', displayName:'Urawa Red Diamonds', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  yokohamafmarinos: { id:'yokohamafmarinos', name:'Yokohama F. Marinos', displayName:'Yokohama F. Marinos', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  kawasakifrontale: { id:'kawasakifrontale', name:'Kawasaki Frontale', displayName:'Kawasaki Frontale', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  visselkobe: { id:'visselkobe', name:'Vissel Kobe', displayName:'Vissel Kobe', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  gambaosaka: { id:'gambaosaka', name:'Gamba Osaka', displayName:'Gamba Osaka', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  cerezoosaka: { id:'cerezoosaka', name:'Cerezo Osaka', displayName:'Cerezo Osaka', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  fctokyo: { id:'fctokyo', name:'FC Tokyo', displayName:'FC Tokyo', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  sanfreccehiroshima: { id:'sanfreccehiroshima', name:'Sanfrecce Hiroshima', displayName:'Sanfrecce Hiroshima', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  nagoyagrampus: { id:'nagoyagrampus', name:'Nagoya Grampus', displayName:'Nagoya Grampus', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol' },
  // Primeros clubes de Brasil (sesión 2026-09-13): ejercicio social = año calendario
  // (fiscalYearStart:'01-01', no jul-jun/sep-ago como los clubes argentinos de arriba) — ver
  // isCalendarYearClub() en js/finanzas-calc.js, que generaliza el dropdown "Año"/"Estado de
  // resultados"/gráficos de Inicio para mostrar "2024" en vez de un rango de temporada "2023/2024"
  // que sería falso para este club.
  gremio: { id:'gremio', name:'Grêmio Foot-Ball Porto Alegrense', displayName:'Grêmio', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  botafogo: { id:'botafogo', name:'Botafogo Sociedade Anônima do Futebol', displayName:'Botafogo', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  cruzeiro: { id:'cruzeiro', name:'Cruzeiro Esporte Clube SAF', displayName:'Cruzeiro', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  mirassol: { id:'mirassol', name:'Mirassol Futebol Clube', displayName:'Mirassol', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  ituano: { id:'ituano', name:'Ituano Futebol Clube', displayName:'Ituano', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  coritiba: { id:'coritiba', name:'Coritiba Sociedade Anônima do Futebol - SAF', displayName:'Coritiba', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  atleticogoianiense: { id:'atleticogoianiense', name:'Atlético Clube Goianiense', displayName:'Atlético Goianiense', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol' },
  // Colombia: ejercicio fiscal es año calendario (1-ene a 31-dic), moneda nativa COP (ver
  // data/currency-map.js y fuentes/Colombia/*.md sobre el tipo de cambio TRM usado).
  oncecaldas: { id:'oncecaldas', name:'Once Caldas S.A. En Reorganización', displayName:'Once Caldas', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol' },
  envigado: { id:'envigado', name:'Envigado Fútbol Club S.A.', displayName:'Envigado FC', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol' },
  // España (Versión 111): sexto país con datos reales. `reportingCurrency:'EUR'` ya soportado de
  // forma genérica por CURRENCY_META (data/currency-map.js) desde la Versión 103 — el toggle de
  // moneda y "Formato del club/simplificado" se muestran para CUALQUIER club (no gateados por
  // `country === 'AR'` ni por ninguna moneda en particular, ver populateCurrencyToggle() en
  // index.html). `fiscalYearStart:'07-01'`: los ejercicios de LaLiga corren 1/7 a 30/6, confirmado
  // en cada PDF fuente ("ejercicio anual terminado el 30 de junio de AAAA") — temporada partida,
  // igual que los clubes argentinos (no aplica isCalendarYearClub acá).
  realmadrid: { id:'realmadrid', name:'Real Madrid Club de Fútbol', displayName:'Real Madrid', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  fcbarcelona: { id:'fcbarcelona', name:'Futbol Club Barcelona', displayName:'FC Barcelona', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  atleticomadrid: { id:'atleticomadrid', name:'Club Atlético de Madrid, S.A.D.', displayName:'Atlético de Madrid', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  athleticclub: { id:'athleticclub', name:'Athletic Club', displayName:'Athletic Club', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  sevillafc: { id:'sevillafc', name:'Sevilla Fútbol Club, S.A.D.', displayName:'Sevilla FC', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  valenciacf: { id:'valenciacf', name:'Valencia Club de Fútbol, S.A.D.', displayName:'Valencia CF', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  villarrealcf: { id:'villarrealcf', name:'Villarreal Club de Fútbol, S.A.D.', displayName:'Villarreal CF', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  realbetis: { id:'realbetis', name:'Real Betis Balompié, S.A.D.', displayName:'Real Betis', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  celtavigo: { id:'celtavigo', name:'Real Club Celta de Vigo, S.A.D.', displayName:'Celta de Vigo', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
  deportivoalaves: { id:'deportivoalaves', name:'Deportivo Alavés, S.A.D.', displayName:'Deportivo Alavés', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol' },
};

// Source: de dónde sale cada número. reliability es lo que le permite al
// sitio mostrar "dato oficial" vs. "dato de prensa" vs. "placeholder" sin
// que esa distinción quede escondida en un comentario. Solo Boca acá — el resto de los
// clubes agrega sus propias entradas vía Object.assign(sources, {...}) al final de su
// propio data/<club>-data.js.
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
      publicNote:'No es un documento: son números de prueba, puestos para diseñar el sitio mientras se consiguen los balances reales de esos ejercicios.',
      note:'Pendiente reemplazar con los balances oficiales de bocajuniors.com.ar/club/presupuesto (ver fuentes-por-club.md). El Ejercicio 2025 ya no es placeholder, ver boca-balance-2024-25.',
    },
  'boca-balance-2024-25': {
      id:'boca-balance-2024-25', clubId:'boca',
      title:'Memoria y Balance (estados contables auditados), Ejercicio Económico N°121, 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.bocajuniors.com.ar/club/presupuesto',
      note:'PDF oficial (149 páginas, firmado por Comisión Directiva/Fiscalizadora, con dictamen de auditoría de Becher y Asociados S.R.L. sin salvedades, 10/09/2025), descargado del Google Drive linkeado en la página oficial del club. Cifras en moneda homogénea (reexpresadas a poder adquisitivo del 30/06/2025 según RT 6/17, Nota 2.2 del balance), no nominales del momento de cada operación. "Revenue" del sitio incluye ingresos por venta/rescisión de pases (Versión 102: igual que el propio balance los trata en su Total de Recursos, pág. 76, y que el resto de los clubes del motor genérico); "wages" es la suma real de "Remuneraciones y cargas sociales" de los 9 anexos que la desglosan por departamento (ver comentario de cabecera de data/boca-data.js).',
    },
};

// Gestion: un presidente/período por club. Se guarda por club para evitar que
// dos clubes con presidentes de apellido parecido choquen entre sí. Solo Boca acá — el
// resto de los clubes agrega gestionesByClub.<club> = {...} al final de su propio archivo.
const gestionesByClub = {
  boca: {
      riquelme:  { nombre:'Riquelme (2023-actual)', firstYear:2024, lastYear:2027 },
      ameal:     { nombre:'Ameal (2019-2023)',      firstYear:2021, lastYear:2023 },
      angelici:  { nombre:'Angelici (2015-2019)',   firstYear:2018, lastYear:2019 },
    },
};

// Socios: solo se cargó donde se encontró un número real y citable. Solo Boca acá — el
// resto de los clubes agrega memberCountByClub.<club> = ... al final de su propio archivo.
const memberCountByClub = {
  boca: 365000,
};

