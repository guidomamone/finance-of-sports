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
const clubs = {
  boca:   { id:'boca',   name:'Club Atlético Boca Juniors', displayName:'Boca Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  river:  { id:'river',  name:'Club Atlético River Plate',  displayName:'River Plate', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'01-01' },
  racing: { id:'racing', name:'Racing Club',                displayName:'Racing Club', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  velez:  { id:'velez',  name:'Club Atlético Vélez Sarsfield', displayName:'Vélez Sarsfield', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  instituto: { id:'instituto', name:'Instituto Atlético Central Córdoba', displayName:'Instituto ACC', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  rosariocentral: { id:'rosariocentral', name:'Club Atlético Rosario Central', displayName:'Rosario Central', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  independiente: { id:'independiente', name:'Club Atlético Independiente', displayName:'Independiente', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  argentinosjuniors: { id:'argentinosjuniors', name:'Asociación Atlética Argentinos Juniors', displayName:'Argentinos Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  estudianteslp: { id:'estudianteslp', name:'Club Estudiantes de La Plata', displayName:'Estudiantes de La Plata', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  sanlorenzo: { id:'sanlorenzo', name:'Club Atlético San Lorenzo de Almagro', displayName:'San Lorenzo', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
  union: { id:'union', name:'Club Atlético Unión', displayName:'Unión', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01' },
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
      note:'Pendiente reemplazar con los balances oficiales de bocajuniors.com.ar/club/presupuesto (ver fuentes-por-club.md). El Ejercicio 2025 ya no es placeholder, ver boca-balance-2024-25.',
    },
  'boca-balance-2024-25': {
      id:'boca-balance-2024-25', clubId:'boca',
      title:'Memoria y Balance (estados contables auditados), Ejercicio Económico N°121, 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.bocajuniors.com.ar/club/presupuesto',
      note:'PDF oficial (149 páginas, firmado por Comisión Directiva/Fiscalizadora, con dictamen de auditoría de Becher y Asociados S.R.L. sin salvedades, 10/09/2025), descargado del Google Drive linkeado en la página oficial del club. Cifras en moneda homogénea (reexpresadas a poder adquisitivo del 30/06/2025 según RT 6/17, Nota 2.2 del balance), no nominales del momento de cada operación. "Revenue" del sitio excluye ingresos por venta/rescisión de pases (se llevan netos a "Ganancia por venta de jugadores", ver comentario en yearsRaw de index.html); "wages" es la suma real de "Remuneraciones y cargas sociales" de los 8 anexos que la desglosan por departamento.',
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

