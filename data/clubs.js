// ============================================================================
// data/clubs.js — capa de identidad: qué clubes existen (clubs{}), de dónde sale
// cada número (sources{}), y qué gestiones/presidentes tiene cada uno
// (gestionesByClub{}/memberCountByClub{}).
//
// Versión 101 (refactor de escalabilidad, a pedido de Guido): `clubs{}` sigue siendo
// centralizado acá — es chico (7-8 campos por club) y hace falta ANTES de que se elija
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
// `brandColor` (Versión 178, to-do 23(e)): el color de marca del club, para el círculo de
// iniciales del selector (ver pintarCrest() en js/selector.js). SOLO color: los escudos como
// imagen quedaron afuera a propósito (derechos y hosting — el repo se deploya entero, así que
// una imagen se serviría desde el dominio propio, que es justo lo que un club puede objetar).
// CÓMO SE ELIGIÓ, club por club, y por qué el campo PUEDE FALTAR:
//   - Se verificó el color de cada club contra su propia fuente (sitio oficial cuando declara
//     un `theme-color` o un CSS con un color dominante — así salieron River #E30520, Vélez,
//     San Lorenzo, Independiente, Estudiantes e Ituano; infobox de Wikipedia en el idioma del
//     país para el resto; y para Japón la `クラブカラー` que cada club declara, que es un dato
//     oficial de la J.League). Ninguno se dedujo del color de otro club del mismo país.
//   - El hex es el color VERIFICADO, no un tono inventado: cuando la fuente daba un hex se usó
//     ese; cuando daba solo el nombre del color ("ディープレッド"), se tomó el hex de la paleta
//     del escudo publicada (logotyp.us / footylogos / teamcolorcodes) que coincide con él.
//   - **`brandColor` es OPCIONAL, y que falte es una decisión, no un olvido.** Si el club no
//     tiene un color primario claro y sin ambigüedad, el círculo se queda con el azul del sitio:
//     un color equivocado se lee peor que ninguno. Esa decisión se ESCRIBE (Versión 179):
//     `brandColor:null` = "se miró y no lleva color", y nadie lo completa a ojo después; el campo
//     AUSENTE = nadie lo chequeó, y lo marca `node tools/audit.js` (`club-sin-color-ni-null`, P3).
//     En pantalla son lo mismo (`pintarCrest()` hace `if(!c)`). Hoy los `null` son 2 de 41, los dos
//     porque el color que los identifica es el BLANCO y un círculo blanco no se ve contra el fondo
//     blanco del modal. Decisión de Guido del 2026-09-21, en la misma consulta que resolvió los
//     otros 3 casos dudosos: Sevilla (camiseta blanca, pero se representa con su rojo de marca),
//     Rosario Central (bastones azul y amarillo en partes iguales, gana el azul del escudo) y
//     Valencia (camiseta blanca, marca naranja).
//   - Cómo se resuelve el color de un club NUEVO (identidad primero, hex después, las 4 trampas ya
//     pagadas y dónde anotar la procedencia): `club-or-year-onboarding/SKILL.md` §3, punto 1b.
//   - El texto de las iniciales NO se guarda acá: lo decide por contraste `textoSobre()` en
//     js/selector.js, porque blanco sobre el amarillo de Club América no se lee.
//
// NO HAY, NI VA A HABER, UN CAMPO `league` ACÁ (decisión de la Versión 137, después de que Guido
// levantara el problema: "si el usuario quiere ver cuánto generaba una liga en 2025 y 2024, 2023,
// 2022, tiene que tener en cuenta que los clubes fueron cambiando"). La membresía de liga es
// (club, ejercicio) → liga y vive SOLO en `data/club-leagues.js`. Un `clubs[id].league` con "la liga
// de hoy" sería una segunda verdad sobre el mismo hecho, y encima inútil para todo agregado de liga,
// que necesita saber quiénes la integraban ESE año. Ver la cabecera de `data/leagues.js`.
const clubs = {
  boca:   { id:'boca',   name:'Club Atlético Boca Juniors', displayName:'Boca Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0A2B5C' },
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
  river:  { id:'river',  name:'Club Atlético River Plate',  displayName:'River Plate', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'09-01', sport:'futbol', brandColor:'#E30520' },
  racing: { id:'racing', name:'Racing Club',                displayName:'Racing Club', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#029CDC' },
  velez:  { id:'velez',  name:'Club Atlético Vélez Sarsfield', displayName:'Vélez Sarsfield', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0061A8' },
  instituto: { id:'instituto', name:'Instituto Atlético Central Córdoba', displayName:'Instituto ACC', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#DF040B' },
  rosariocentral: { id:'rosariocentral', name:'Club Atlético Rosario Central', displayName:'Rosario Central', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0A3D72' },
  independiente: { id:'independiente', name:'Club Atlético Independiente', displayName:'Independiente', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#EC1C24' },
  argentinosjuniors: { id:'argentinosjuniors', name:'Asociación Atlética Argentinos Juniors', displayName:'Argentinos Juniors', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E32021' },
  estudianteslp: { id:'estudianteslp', name:'Club Estudiantes de La Plata', displayName:'Estudiantes de La Plata', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E41815' },
  sanlorenzo: { id:'sanlorenzo', name:'Club Atlético San Lorenzo de Almagro', displayName:'San Lorenzo', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#00325A' },
  union: { id:'union', name:'Club Atlético Unión', displayName:'Unión', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#ED1C24' },
  // Primer club no argentino del sitio (Versión 104). reportingCurrency:'MXN' — ver data/currency-map.js
  // (entrada MXN, scale:1) y data/clubamerica-data.js (comentario de cabecera) para el detalle completo
  // de la fuente (segmento de negocio de una compañía bursátil, no un balance propio del club).
  // fiscalYearStart:'01-01': Ollamani reporta en año calendario (1/1 a 31/12), no en un ejercicio
  // partido como los clubes argentinos.
  clubamerica: { id:'clubamerica', name:'Club de Fútbol América, S.A. de C.V.', displayName:'Club América', country:'MX', reportingCurrency:'MXN', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FFEB00' },
  // Japón (J.League), sesión 2026-09-13: 10 clubes, todos con Ejercicio 2025 (temporada calendario
  // ene-dic 2025, la convención estándar de J.League — ninguno de estos 10 está en la lista de 7
  // clubes con cierre marzo/junio del club_doc-2025.pdf, ver fuentes/Japón/_notas-generales.md).
  // reportingCurrency:'JPY' — ver data/currency-map.js para el CURRENCY_META nuevo. displayName usa
  // el nombre corto habitual en español/inglés (el que ya usan medios deportivos hispanohablantes),
  // name lleva el nombre oficial completo en inglés.
  kashimaantlers: { id:'kashimaantlers', name:'Kashima Antlers Football Club', displayName:'Kashima Antlers', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#B7183F' },
  urawareddiamonds: { id:'urawareddiamonds', name:'Urawa Red Diamonds', displayName:'Urawa Red Diamonds', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#E4032E' },
  yokohamafmarinos: { id:'yokohamafmarinos', name:'Yokohama F. Marinos', displayName:'Yokohama F. Marinos', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#164194' },
  kawasakifrontale: { id:'kawasakifrontale', name:'Kawasaki Frontale', displayName:'Kawasaki Frontale', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#3EA3DC' },
  visselkobe: { id:'visselkobe', name:'Vissel Kobe', displayName:'Vissel Kobe', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#A40931' },
  gambaosaka: { id:'gambaosaka', name:'Gamba Osaka', displayName:'Gamba Osaka', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#0E3192' },
  cerezoosaka: { id:'cerezoosaka', name:'Cerezo Osaka', displayName:'Cerezo Osaka', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FA1A82' },
  fctokyo: { id:'fctokyo', name:'FC Tokyo', displayName:'FC Tokyo', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#11216C' },
  sanfreccehiroshima: { id:'sanfreccehiroshima', name:'Sanfrecce Hiroshima', displayName:'Sanfrecce Hiroshima', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#59358C' },
  nagoyagrampus: { id:'nagoyagrampus', name:'Nagoya Grampus', displayName:'Nagoya Grampus', country:'JP', reportingCurrency:'JPY', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#D51317' },
  // Primeros clubes de Brasil (sesión 2026-09-13): ejercicio social = año calendario
  // (fiscalYearStart:'01-01', no jul-jun/sep-ago como los clubes argentinos de arriba) — ver
  // isCalendarYearClub() en js/finanzas-calc.js, que generaliza el dropdown "Año"/"Estado de
  // resultados"/gráficos de Inicio para mostrar "2024" en vez de un rango de temporada "2023/2024"
  // que sería falso para este club.
  gremio: { id:'gremio', name:'Grêmio Foot-Ball Porto Alegrense', displayName:'Grêmio', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#0D80BF' },
  botafogo: { id:'botafogo', name:'Botafogo Sociedade Anônima do Futebol', displayName:'Botafogo', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  cruzeiro: { id:'cruzeiro', name:'Cruzeiro Esporte Clube SAF', displayName:'Cruzeiro', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#2F529E' },
  mirassol: { id:'mirassol', name:'Mirassol Futebol Clube', displayName:'Mirassol', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#EEED05' },
  ituano: { id:'ituano', name:'Ituano Futebol Clube', displayName:'Ituano', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#E2041A' },
  coritiba: { id:'coritiba', name:'Coritiba Sociedade Anônima do Futebol - SAF', displayName:'Coritiba', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#005742' },
  atleticogoianiense: { id:'atleticogoianiense', name:'Atlético Clube Goianiense', displayName:'Atlético Goianiense', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#ED3237' },
  // 3 clubes nuevos (Versión 217, onboarding en paralelo de 10 PDF transcriptos pendientes): mismo
  // motor genérico, mismo país/moneda que los de arriba. `brandColor:null` en 2 de los 3 no es
  // ausencia: se investigó y quedó ambiguo (bicolor sin predominancia clara declarada por ninguna
  // fuente) — ver `fuentes/Brasil/<Club>.md` para el detalle de cada investigación.
  'americamineiro-br': { id:'americamineiro-br', name:'América Futebol Clube', displayName:'América Mineiro', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#007242' },
  'operarioferroviario-br': { id:'operarioferroviario-br', name:'Operário Ferroviário Esporte Clube', displayName:'Operário Ferroviário', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  'voltaredonda-br': { id:'voltaredonda-br', name:'Volta Redonda Futebol Clube', displayName:'Volta Redonda', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  // 5 clubes nuevos (Versión 219, 2do batch de PDF transcriptos pendientes, sesión 2026-09-24):
  // mismo motor genérico, mismo país/moneda. `brandColor:null` en RB Bragantino: camiseta titular
  // blanca dominante, mismo criterio que River/Vélez/Once Caldas — ver `fuentes/Brasil/<Club>.md`
  // para el detalle de cada investigación de color.
  'flamengo-br': { id:'flamengo-br', name:'Clube de Regatas do Flamengo', displayName:'Flamengo', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FF0000' },
  'atleticomineiro-br': { id:'atleticomineiro-br', name:'Clube Atlético Mineiro SAF', displayName:'Atlético Mineiro', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  'athleticoparanaense-br': { id:'athleticoparanaense-br', name:'Club Athletico Paranaense', displayName:'Athletico Paranaense', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#CE181E' },
  'vitoria-br': { id:'vitoria-br', name:'Esporte Clube Vitória', displayName:'Vitória', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FF1100' },
  'rbbragantino-br': { id:'rbbragantino-br', name:'Red Bull Bragantino Futebol Ltda.', displayName:'RB Bragantino', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  // 10 clubes nuevos (Versión 220, 3er batch de PDF transcriptos pendientes, sesión 2026-09-24):
  // mismo motor genérico, mismo país/moneda. `brandColor:null` en Bahia (tricolor en partes
  // iguales, sin predominancia declarada por ninguna fuente) y São Paulo (camiseta titular blanca
  // dominante, mismo criterio que RB Bragantino) — ver `fuentes/Brasil/<Club>.md` para el detalle.
  'corinthians-br': { id:'corinthians-br', name:'Sport Club Corinthians Paulista', displayName:'Corinthians', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  'palmeiras-br': { id:'palmeiras-br', name:'Sociedade Esportiva Palmeiras', displayName:'Palmeiras', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#035F30' },
  'saopaulo-br': { id:'saopaulo-br', name:'São Paulo Futebol Clube', displayName:'São Paulo', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  'santos-br': { id:'santos-br', name:'Santos Futebol Clube', displayName:'Santos', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  'internacional-br': { id:'internacional-br', name:'Sport Club Internacional', displayName:'Internacional', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#E5050F' },
  'fluminense-br': { id:'fluminense-br', name:'Fluminense Football Club', displayName:'Fluminense', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#870A28' },
  'fortaleza-br': { id:'fortaleza-br', name:'Fortaleza EC SAF', displayName:'Fortaleza', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FF0000' },
  'bahia-br': { id:'bahia-br', name:'Esporte Clube Bahia S.A.F.', displayName:'Bahia', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  'chapecoense-br': { id:'chapecoense-br', name:'Associação Chapecoense de Futebol', displayName:'Chapecoense', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#1B552A' },
  'vascodagama-br': { id:'vascodagama-br', name:'Vasco da Gama Sociedade Anônima do Futebol', displayName:'Vasco da Gama', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  // 2 clubes nuevos (Versión 221, 4to batch de PDF transcriptos pendientes, sesión 2026-09-25,
  // prioridad Sudamérica): mismo motor genérico.
  'guarani-br': { id:'guarani-br', name:'Guarani Futebol Clube', displayName:'Guarani', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#006C51' },
  'pontepreta-br': { id:'pontepreta-br', name:'Associação Atlética Ponte Preta', displayName:'Ponte Preta', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  // Colombia: ejercicio fiscal es año calendario (1-ene a 31-dic), moneda nativa COP (ver
  // data/currency-map.js y fuentes/Colombia/*.md sobre el tipo de cambio TRM usado).
  // `brandColor:null` (no ausente): se miró y NO lleva color, el que lo identifica es el blanco.
  oncecaldas: { id:'oncecaldas', name:'Once Caldas S.A. En Reorganización', displayName:'Once Caldas', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  envigado: { id:'envigado', name:'Envigado Fútbol Club S.A.', displayName:'Envigado FC', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#ED7039' },
  'unionmagdalena-co': { id:'unionmagdalena-co', name:'Unión Magdalena S.A.', displayName:'Unión Magdalena', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  'millonarios-co': { id:'millonarios-co', name:'Azul y Blanco Millonarios FC S.A.', displayName:'Millonarios', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#293378' },
  'deportivopereira-co': { id:'deportivopereira-co', name:'Deportivo Pereira F.C. S.A.', displayName:'Deportivo Pereira', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FF0013' },
  // España (Versión 111): sexto país con datos reales. `reportingCurrency:'EUR'` ya soportado de
  // forma genérica por CURRENCY_META (data/currency-map.js) desde la Versión 103 — el toggle de
  // moneda y "Formato del club/simplificado" se muestran para CUALQUIER club (no gateados por
  // `country === 'AR'` ni por ninguna moneda en particular, ver populateCurrencyToggle() en
  // index.html). `fiscalYearStart:'07-01'`: los ejercicios de LaLiga corren 1/7 a 30/6, confirmado
  // en cada PDF fuente ("ejercicio anual terminado el 30 de junio de AAAA") — temporada partida,
  // igual que los clubes argentinos (no aplica isCalendarYearClub acá).
  // `brandColor:null` (no ausente): se miró y NO lleva color, el que lo identifica es el blanco.
  realmadrid: { id:'realmadrid', name:'Real Madrid Club de Fútbol', displayName:'Real Madrid', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  fcbarcelona: { id:'fcbarcelona', name:'Futbol Club Barcelona', displayName:'FC Barcelona', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#004D98' },
  atleticomadrid: { id:'atleticomadrid', name:'Club Atlético de Madrid, S.A.D.', displayName:'Atlético de Madrid', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E8151E' },
  athleticclub: { id:'athleticclub', name:'Athletic Club', displayName:'Athletic Club', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#EE2523' },
  sevillafc: { id:'sevillafc', name:'Sevilla Fútbol Club, S.A.D.', displayName:'Sevilla FC', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#F43333' },
  valenciacf: { id:'valenciacf', name:'Valencia Club de Fútbol, S.A.D.', displayName:'Valencia CF', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E23C07' },
  villarrealcf: { id:'villarrealcf', name:'Villarreal Club de Fútbol, S.A.D.', displayName:'Villarreal CF', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#FFD733' },
  realbetis: { id:'realbetis', name:'Real Betis Balompié, S.A.D.', displayName:'Real Betis', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#00954C' },
  celtavigo: { id:'celtavigo', name:'Real Club Celta de Vigo, S.A.D.', displayName:'Celta de Vigo', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#6DACE5' },
  deportivoalaves: { id:'deportivoalaves', name:'Deportivo Alavés, S.A.D.', displayName:'Deportivo Alavés', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0232A0' },
  // Chile (onboarding 2026-09-25): primer país sudamericano con moneda propia CLP (scale:1000, ver
  // data/currency-map.js). fiscalYearStart:'01-01': los 3 son sociedades anónimas cerradas/abiertas
  // que reportan EEFF IFRS en año calendario (1/1 a 31/12), igual que Brasil/Colombia, no un
  // ejercicio partido como los clubes argentinos/españoles.
  // Los 3 clubes de Chile llevan el país al final del id (convención desde la Versión 129,
  // CONVENCIONES.md: `<clubId>-<iso2>`), a diferencia de los 41 clubes heredados de arriba. Clave
  // entre comillas porque un id con guion no es una key JS válida sin comillas. brandColor: color
  // identificador del club verificado contra footylogos.com (Colo-Colo negro de su camiseta, no el
  // azul/dorado del escudo; U de Chile y Católica el azul de su camiseta pese a ser predominantemente
  // blanca, mismo criterio que River con su franja roja).
  'colocolo-cl': { id:'colocolo-cl', name:'Blanco y Negro S.A.', displayName:'Colo-Colo', country:'CL', reportingCurrency:'CLP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  'udechile-cl': { id:'udechile-cl', name:'Azul Azul S.A.', displayName:'Universidad de Chile', country:'CL', reportingCurrency:'CLP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#022F87' },
  'catolica-cl': { id:'catolica-cl', name:'Cruzados S.A.D.P.', displayName:'Universidad Católica', country:'CL', reportingCurrency:'CLP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#0071B9' },
  // Perú, primer club del país (onboarding 2026-09-25). fiscalYearStart:'01-01': año calendario
  // (los EEFF dicen "Al 31 de diciembre de AAAA"), mismo criterio que Brasil/Colombia/Chile.
  // reportingCurrency:'PEN', ya soportado en CURRENCY_META (data/currency-map.js, scale:1).
  'alianzalima-pe': { id:'alianzalima-pe', name:'Club Alianza Lima', displayName:'Alianza Lima', country:'PE', reportingCurrency:'PEN', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#192745' },
  // 5 clubes colombianos nuevos (sesión 2026-09-22, Ejercicio 2025 cada uno), mismo criterio de
  // ejercicio/moneda que Envigado/Once Caldas de arriba.
  'americadecali-co': { id:'americadecali-co', name:'América de Cali S.A. En Reorganización', displayName:'América de Cali', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#B00000' },
  'atlnacional-co': { id:'atlnacional-co', name:'Atlético Nacional S.A.', displayName:'Atlético Nacional', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#00953B' },
  'depcali-co': { id:'depcali-co', name:'Club Profesional Deportivo Cali S.A.', displayName:'Deportivo Cali', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#2A975E' },
  'santafe-co': { id:'santafe-co', name:'Independiente Santa Fe S.A. En Reorganización', displayName:'Independiente Santa Fe', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#ED1E26' },
  'junior-co': { id:'junior-co', name:'Club Deportivo Popular Junior F.C. S.A.', displayName:'Junior de Barranquilla', country:'CO', reportingCurrency:'COP', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#B21117' },
  // 3 clubes españoles nuevos (sesión 2026-09-22, 2 ejercicios cada uno salvo Girona), mismo
  // criterio de ejercicio/moneda que los 10 españoles de arriba.
  'getafe-es': { id:'getafe-es', name:'Getafe Club de Fútbol, S.A.D.', displayName:'Getafe CF', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#005999' },
  'girona-es': { id:'girona-es', name:'Girona Futbol Club, S.A.D.', displayName:'Girona FC', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#CF0C29' },
  'espanyol-es': { id:'espanyol-es', name:'R.C.D. Espanyol de Barcelona, S.A.D.', displayName:'RCD Espanyol', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#007fc8' },
  'elche-es': { id:'elche-es', name:'Elche Club de Fútbol, S.A.D.', displayName:'Elche CF', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#05642C' },
  'osasuna-es': { id:'osasuna-es', name:'Club Atlético Osasuna', displayName:'CA Osasuna', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#D91A21' },
  // 3 clubes nuevos (Versión 221, 4to batch de PDF transcriptos pendientes, sesión 2026-09-25,
  // completando a 10 tras agotar el pool limpio de Sudamérica). `brandColor:null` en Rayo
  // Vallecano: camiseta blanca dominante con franja diagonal roja, mismo bucket que River/Vélez/
  // Sevilla/Real Madrid.
  'rcdmallorca-es': { id:'rcdmallorca-es', name:'Real Club Deportivo Mallorca, S.A.D.', displayName:'RCD Mallorca', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E20613' },
  'realoviedo-es': { id:'realoviedo-es', name:'Real Oviedo, S.A.D.', displayName:'Real Oviedo', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0033A0' },
  'rayovallecano-es': { id:'rayovallecano-es', name:'Rayo Vallecano de Madrid, S.A.D.', displayName:'Rayo Vallecano', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  // Alemania (sesión 2026-09-22): PAÍS NUEVO, 5 clubes de Bundesliga. `fiscalYearStart:'07-01'`
  // (ejercicio 1/7-30/6, igual que España) para los 4 primeros; VfB Stuttgart es la excepción, su
  // ejercicio es año CALENDARIO (confirmado en el propio documento, ver data/stuttgart-de-data.js).
  'koln-de': { id:'koln-de', name:'1. FC Köln GmbH & Co. KGaA', displayName:'1. FC Köln', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#ED1C24' },
  'eintrachtfrankfurt-de': { id:'eintrachtfrankfurt-de', name:'Eintracht Frankfurt Fußball Aktiengesellschaft', displayName:'Eintracht Frankfurt', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E1000F' },
  'werderbremen-de': { id:'werderbremen-de', name:'SV Werder Bremen GmbH & Co. KGaA', displayName:'Werder Bremen', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#1D9053' },
  'augsburg-de': { id:'augsburg-de', name:'Fußball-Club Augsburg 1907 GmbH & Co. KGaA', displayName:'FC Augsburg', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#BA3733' },
  // `brandColor:null` (no ausente): se miró (de.wikipedia.org, "Vereinsfarben: Weiß-Rot") y NO
  // lleva color, el que lo identifica es el blanco.
  'stuttgart-de': { id:'stuttgart-de', name:'VfB Stuttgart 1893 AG', displayName:'VfB Stuttgart', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  // 6 clubes alemanes nuevos (sesión 2026-09-25, 2 ejercicios cada uno: 2023/24 y 2024/25 salvo
  // Mönchengladbach, ejercicio CALENDARIO). Colores: footylogos.com/Wikipedia.
  'hoffenheim-de': { id:'hoffenheim-de', name:'TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH', displayName:'TSG Hoffenheim', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#1966A6' },
  // Hamburger SV: se carga la Fußball AG (entidad de fútbol profesional), no el e.V. (club social) —
  // ver comentario de cabecera de data/hamburgersv-de-data.js.
  'hamburgersv-de': { id:'hamburgersv-de', name:'HSV Fußball AG & Co. KGaA', displayName:'Hamburger SV', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#041E42' },
  // Borussia Mönchengladbach: ejercicio CALENDARIO (01/01-31/12), confirmado en el propio documento.
  'monchengladbach-de': { id:'monchengladbach-de', name:'Borussia VfL 1900 Mönchengladbach GmbH', displayName:'Borussia Mönchengladbach', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#00963A' },
  'bayernmunich-de': { id:'bayernmunich-de', name:'FC Bayern München AG', displayName:'Bayern Munich', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#DC052D' },
  'dortmund-de': { id:'dortmund-de', name:'Borussia Dortmund GmbH & Co. KGaA', displayName:'Borussia Dortmund', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#FDE100' },
  'rbleipzig-de': { id:'rbleipzig-de', name:'RasenBallsport Leipzig GmbH', displayName:'RB Leipzig', country:'DE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#DD0741' },
  // Inglaterra (sesión 2026-09-22): PAÍS NUEVO, LIBRA ESTERLINA (GBP) MONEDA NUEVA, 5 clubes de
  // Premier League, 2 ejercicios cada uno (2023/24 y 2024/25). `fiscalYearStart` varía por club
  // (a diferencia de España/Alemania, cada club inglés cierra en una fecha distinta, confirmada
  // en su propio documento): Arsenal/Liverpool cierran 31 de mayo (`'06-01'`), Manchester
  // City/Everton/Tottenham cierran 30 de junio (`'07-01'`).
  'arsenal-gb': { id:'arsenal-gb', name:'Arsenal Holdings Limited', displayName:'Arsenal', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'06-01', sport:'futbol', brandColor:'#EF0107' },
  'liverpool-gb': { id:'liverpool-gb', name:'The Liverpool Football Club and Athletic Grounds Limited', displayName:'Liverpool', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'06-01', sport:'futbol', brandColor:'#C8102E' },
  'mancity-gb': { id:'mancity-gb', name:'Manchester City Football Club Limited', displayName:'Manchester City', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#6CABDD' },
  'everton-gb': { id:'everton-gb', name:'Everton Football Club Company, Limited', displayName:'Everton', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#003399' },
  'tottenham-gb': { id:'tottenham-gb', name:'Tottenham Hotspur Limited', displayName:'Tottenham Hotspur', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#000a3c' },
  // 5 clubes nuevos (onboarding 2026-09-25, pool de PDF ya transcriptos): Nottingham Forest,
  // Sunderland, West Ham, Wolves (Inglaterra) y Levante (España, país ya cargado). brandColor
  // verificado contra footylogos.com salvo Levante (ver duda en Admin/dudas-por-club.md: kit
  // mitades azul/granate sin predominancia declarada, mismo caso que Crystal Palace).
  'nottinghamforest-gb': { id:'nottinghamforest-gb', name:'Nottingham Forest Football Club Limited', displayName:'Nottingham Forest', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#DD0000' },
  'sunderland-gb': { id:'sunderland-gb', name:'Sunderland Association Football Club, Limited (The)', displayName:'Sunderland', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'08-01', sport:'futbol', brandColor:'#EB172B' },
  'westham-gb': { id:'westham-gb', name:'West Ham United Football Club Limited', displayName:'West Ham United', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'06-01', sport:'futbol', brandColor:'#7C2C3B' },
  'wolves-gb': { id:'wolves-gb', name:'Wolverhampton Wanderers Football Club (1986) Limited', displayName:'Wolverhampton Wanderers', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'06-01', sport:'futbol', brandColor:'#FDB913' },
  'levante-es': { id:'levante-es', name:'Levante Unión Deportiva, S.A.D. y Sociedades Dependientes', displayName:'Levante UD', country:'ES', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  // 4 clubes ingleses más (onboarding 2026-09-25, mismo pool de PDF transcriptos). brandColor
  // verificado contra footylogos.com.
  'astonvilla-gb': { id:'astonvilla-gb', name:'Aston Villa Football Club Limited', displayName:'Aston Villa', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#480024' },
  'bournemouth-gb': { id:'bournemouth-gb', name:'AFC Bournemouth Limited', displayName:'AFC Bournemouth', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#D6171C' },
  'brentford-gb': { id:'brentford-gb', name:'Brentford FC Ltd', displayName:'Brentford', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#E30613' },
  'burnley-gb': { id:'burnley-gb', name:'Burnley FC Holdings Limited', displayName:'Burnley', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'08-01', sport:'futbol', brandColor:'#5F0041' },
  // 5 clubes ingleses más (onboarding 2026-09-25, mismo pool de PDF transcriptos). brandColor
  // verificado contra footylogos.com/chelseafc.com, salvo Crystal Palace (ver duda en
  // Admin/dudas-por-club.md: franjas rojo/azul desde 1973, sin predominancia declarada, mismo caso
  // que Levante) y Fulham (camiseta blanca, mismo bucket que River/Vélez/Sevilla/Real Madrid).
  'newcastle-gb': { id:'newcastle-gb', name:'Newcastle United Limited', displayName:'Newcastle United', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#231F20' },
  'crystalpalace-gb': { id:'crystalpalace-gb', name:'CPFC 2010 Limited', displayName:'Crystal Palace', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  'fulham-gb': { id:'fulham-gb', name:'Fulham Football Club Limited', displayName:'Fulham', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  'leeds-gb': { id:'leeds-gb', name:'Leeds United Football Club Limited', displayName:'Leeds United', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  'chelsea-gb': { id:'chelsea-gb', name:'Chelsea FC Holdings Limited', displayName:'Chelsea', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0033A0' },
  'brighton-gb': { id:'brighton-gb', name:'The Brighton and Hove Albion Football Club Limited', displayName:'Brighton', country:'GB', reportingCurrency:'GBP', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#005DAA' },
  // 3 clubes argentinos nuevos (sesión 2026-09-23, to-do 58 — barrido de sourcing del 2026-09-22
  // que descargó los PDFs, onboardeados en 3 agentes en paralelo): los 3 pasan de "sin nada
  // cargado" a tener ejercicios reales. `clubId` con sufijo de país porque son clubes NUEVOS
  // (Versión 129), a diferencia de los 11 argentinos de arriba, cargados antes de esa convención.
  'talleres-ar': { id:'talleres-ar', name:'Club Atlético Talleres Asociación Civil', displayName:'Talleres', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#040D2D' },
  'newells-ar': { id:'newells-ar', name:"Club Atlético Newell's Old Boys", displayName:"Newell's Old Boys", country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#F42121' },
  'banfield-ar': { id:'banfield-ar', name:'Club Atlético Banfield', displayName:'Banfield', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#03953F' },
  // Gimnasia y Esgrima (La Plata), club nuevo (sesión 2026-09-23, to-do 58): 3 balances reales +
  // presupuestos, 2 de ellos cargados como overlay de un ejercicio dual (ver
  // data/gimnasiaesgrima-ar-data.js). `brandColor:null` (no ausente): camiseta blanca con banda
  // azul marino, el que lo identifica es el blanco — mismo bucket que River/Vélez/Sevilla/Real
  // Madrid/Valencia/Once Caldas, confirmado en.wikipedia.org.
  'gimnasiaesgrima-ar': { id:'gimnasiaesgrima-ar', name:'Club de Gimnasia y Esgrima La Plata', displayName:'Gimnasia y Esgrima (La Plata)', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  // Ferro Carril Oeste, club nuevo (Versión 220, 3er batch de PDF transcriptos pendientes, sesión
  // 2026-09-24): 2 balances reales (Ejercicios 118 y 119, 2021-22 y 2022-23).
  'ferrocarriloeste-ar': { id:'ferrocarriloeste-ar', name:'Club Ferro Carril Oeste', displayName:'Ferro Carril Oeste', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#156538' },
  // Países Bajos (sesión de esta tanda): PAÍS NUEVO, 4 clubes de Eredivisie, 2 ejercicios cada uno
  // (2023/2024 y 2024/2025, ambos cierran 30/6). brandColor verificado contra footylogos.com
  // (color-codes/eredivisie): los 4 clubes tienen rojo como color primario listado (no el blanco
  // ni el negro que también llevan en el escudo/indumentaria).
  'ajax-nl': { id:'ajax-nl', name:'AFC Ajax N.V.', displayName:'Ajax', country:'NL', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#DA121A' },
  'psv-nl': { id:'psv-nl', name:'PSV N.V.', displayName:'PSV', country:'NL', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#ED1C24' },
  'feyenoord-nl': { id:'feyenoord-nl', name:'Feyenoord Rotterdam N.V.', displayName:'Feyenoord', country:'NL', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#FF0000' },
  'az-nl': { id:'az-nl', name:'AZ Holding B.V.', displayName:'AZ', country:'NL', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#CA0008' },
  // Croacia (onboarding 2026-09-25): PAÍS NUEVO, 3 clubes de HNL, ejercicio 2024 (año CALENDARIO,
  // fiscalYearStart:'01-01' — confirmado en cada documento fuente: "za godinu koja završava na dan
  // 31. prosinca 2024."). reportingCurrency:'EUR' (Croacia adoptó el euro el 1/1/2023, el ejercicio
  // 2024 es 100% en euros). brandColor verificado vía schemecolor.com/brandpalettes (Dinamo: azul de
  // su escudo/camiseta, "Hermes" en la paleta; Hajduk: camiseta blanca dominante con acento azul,
  // mismo criterio que River — se usó el azul #21409A de su indumentaria; Rijeka: camiseta
  // blanca/azul con la cruz celeste característica, se usó ese azul #38A1CE).
  'dinamozagreb-hr': { id:'dinamozagreb-hr', name:'Građanski nogometni klub Dinamo', displayName:'Dinamo Zagreb', country:'HR', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#1D3A8D' },
  'hajduksplit-hr': { id:'hajduksplit-hr', name:'HNK Hajduk s.d.d.', displayName:'Hajduk Split', country:'HR', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#21409A' },
  'rijeka-hr': { id:'rijeka-hr', name:'Hrvatski nogometni klub Rijeka s.d.d.', displayName:'Rijeka', country:'HR', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#38A1CE' },
  // Bélgica (sesión de esta tanda): PAÍS NUEVO, 4 clubes de la Pro League, 1 ejercicio cada uno
  // (2024/2025, cierra 30/6). brandColor verificado con Wikipedia (colores oficiales del infobox)
  // + teamcolorcodes.com/schemecolor.com/logotyp.us para el hex — mismo criterio que River: bicolor
  // con blanco, se usa el acento NO blanco (Club Brugge es azul/negro sin blanco, se usó el azul).
  'clubbrugge-be': { id:'clubbrugge-be', name:'Club Brugge NV', displayName:'Club Brugge', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0078BF' },
  'anderlecht-be': { id:'anderlecht-be', name:'Royal Sporting Club Anderlecht NV', displayName:'Anderlecht', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#4C2484' },
  'genk-be': { id:'genk-be', name:'K. Racing Club Genk 322 VZW', displayName:'Genk', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#00468F' },
  'gent-be': { id:'gent-be', name:'K.A.A. Gent NV', displayName:'Gent', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#004794' },
  // Dinamarca (sesión de esta tanda): PAÍS NUEVO, DKK MONEDA NUEVA (ver data/currency-map.js), 3
  // clubes de la Superliga, cada uno con el ejercicio más reciente que permitiera separar Revenue de
  // Expenses de verdad (ver comentario de cabecera de cada archivo — FC Midtjylland usa 2019 en vez
  // de un año más reciente porque sus balances 2022+ netean Revenue contra Cost of Sales en una sola
  // línea "Bruttofortjeneste", sin desglose disponible). brandColor: footylogos.com/Wikipedia.
  'fckobenhavn-dk': { id:'fckobenhavn-dk', name:'F.C. København P/S', displayName:'FC København', country:'DK', reportingCurrency:'DKK', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#375197' },
  'brondby-dk': { id:'brondby-dk', name:'Brøndbyernes I.F. Fodbold A/S', displayName:'Brøndby', country:'DK', reportingCurrency:'DKK', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FFD100' },
  'midtjylland-dk': { id:'midtjylland-dk', name:'FC Midtjylland A/S', displayName:'FC Midtjylland', country:'DK', reportingCurrency:'DKK', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#B60C28' },
  // Tanda de 15 clubes nuevos (sesión 2026-09-25, "onboardear 20 transcripts al azar"): 2 más de
  // Croacia, 3 más de Dinamarca, 3 más de Bélgica (los 3 países ya venían de la tanda de arriba),
  // 5 de Brasil (país ya cargado) y 2 de Argentina (país ya cargado). De los 20 candidatos
  // elegidos al azar, 3 resultaron dead-ends sin estados contables reales (Temperley: solo
  // Memoria narrativa sin balance; Belgrano: ídem; Palestino: solo un estado financiero
  // intermedio de 6 meses, sin P&L anual) y se reemplazaron por otros 3 (Botafogo-SP, Juventude,
  // Amazonas). Las 3 preguntas quedaron en Admin/dudas-por-club.md. brandColor: Wikipedia del
  // idioma del país primero (identidad), hex después (footylogos/teamcolorcodes/wikitext de kit
  // template) — ver el detalle por club en `fuentes/<País>/<Club>.md`.
  'osijek-hr': { id:'osijek-hr', name:'Nogometni klub Osijek, sportsko dioničko društvo', displayName:'Osijek', country:'HR', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  'slavenbelupo-hr': { id:'slavenbelupo-hr', name:'Nogometni klub Slaven Belupo', displayName:'Slaven Belupo', country:'HR', reportingCurrency:'EUR', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#0000FF' },
  'agf-dk': { id:'agf-dk', name:'AGF A/S', displayName:'AGF', country:'DK', reportingCurrency:'DKK', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  'silkeborg-dk': { id:'silkeborg-dk', name:'Silkeborg IF A/S', displayName:'Silkeborg IF', country:'DK', reportingCurrency:'DKK', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#EF0000' },
  'viborg-dk': { id:'viborg-dk', name:'Viborg F.F. Prof. Fodbold A/S', displayName:'Viborg FF', country:'DK', reportingCurrency:'DKK', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#009A44' },
  'charleroi-be': { id:'charleroi-be', name:'R. Charleroi S.C.', displayName:'Charleroi', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0A0A0A' },
  'mechelen-be': { id:'mechelen-be', name:'KV Mechelen', displayName:'Mechelen', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#FFD700' },
  'antwerp-be': { id:'antwerp-be', name:'Royal Antwerp F.C.', displayName:'Antwerp', country:'BE', reportingCurrency:'EUR', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#FF0000' },
  'ceara-br': { id:'ceara-br', name:'Ceará Sporting Club', displayName:'Ceará', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#000000' },
  'sportrecife-br': { id:'sportrecife-br', name:'Sport Club do Recife', displayName:'Sport Recife', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
  'godoycruz-ar': { id:'godoycruz-ar', name:'Club Deportivo Godoy Cruz Antonio Tomba', displayName:'Godoy Cruz', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:'#0000FF' },
  'losandes-ar': { id:'losandes-ar', name:'Club Atlético Los Andes', displayName:'Los Andes', country:'AR', reportingCurrency:'ARS', fiscalYearStart:'07-01', sport:'futbol', brandColor:null },
  'amazonas-br': { id:'amazonas-br', name:'Amazonas Futebol Clube', displayName:'Amazonas', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#FFDD00' },
  'juventude-br': { id:'juventude-br', name:'Esporte Clube Juventude', displayName:'Juventude', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:'#009846' },
  'botafogosp-br': { id:'botafogosp-br', name:'Botafogo Futebol S.A. - SAF', displayName:'Botafogo-SP', country:'BR', reportingCurrency:'BRL', fiscalYearStart:'01-01', sport:'futbol', brandColor:null },
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
      riquelme:  { nombre:'Riquelme (2023-actual)', firstYear:2025, lastYear:2027 },
      ameal:     { nombre:'Ameal (2019-2023)',      firstYear:2021, lastYear:2023 },
      angelici:  { nombre:'Angelici (2015-2019)',   firstYear:2018, lastYear:2019 },
      // Versión 138: `ameal` y `angelici` ya NO tienen ningún ejercicio de Finanzas detrás. Sus
      // años eran los placeholder de Boca, que se borraron. Se quedan acá porque Mercado de Pases
      // y Resultados Deportivos siguen agrupando por gestión y tienen filas de las dos, y porque
      // `finanzasYears`/`finanzasGestiones` de data/boca-data.js ya las excluía del selector de
      // Finanzas desde la Versión 81. El día que se cargue un balance real de esos años, sus
      // firstYear/lastYear vuelven a apuntar a algo.
    },
};

// Socios: solo se cargó donde se encontró un número real y citable. Solo Boca acá — el
// resto de los clubes agrega memberCountByClub.<club> = ... al final de su propio archivo.
const memberCountByClub = {
  boca: 365000,
};

