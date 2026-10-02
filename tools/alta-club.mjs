#!/usr/bin/env node
// ============================================================================
// tools/alta-club.mjs — el ALTA de un club nuevo y los DATOS DE CONTEXTO de un
// ejercicio (tipo de cambio, liga, moneda, cierre), por script, sin tokens de
// sesión. Pedido de Guido (2026-09-30): de 3.042 PDFs pendientes, ~2.200 son de
// clubes que todavía no existen en el sitio, y todo lo que es mecánico del alta
// no tiene por qué pasar por Claude.
//
// ----------------------------------------------------------------------------
// QUÉ HACE
// ----------------------------------------------------------------------------
// Dado un documento de `Clubes/<País>/<Club>/` (el PDF o su `.md`, da igual: se
// lee siempre el `.md`, que es la transcripción) y opcionalmente el año:
//
//   1. Resuelve si el club YA EXISTE en el sitio con la regla ÚNICA del proyecto,
//      `clubDeCarpeta()` de tools/carpetas-clubes.mjs (la misma que usan onboard.mjs,
//      inventario-transcripciones.mjs, pipeline.mjs y audit.js): (a) algún
//      `data/<id>-data.js` cita la carpeta `Clubes/<País>/<Club>/` -> ese club; (b) si
//      no, el nombre de la carpeta es IGUAL al de un club del mismo país; (c) si no,
//      club nuevo. Hasta la Versión 309 este script tenía su propia regla (citas +
//      `onboard.mjs --quien` + desempate por país) y onboard.mjs otra: se reemplazó
//      para que no haya dos respuestas posibles para la misma carpeta. (Contexto: el
//      registro de transcripciones daba ~205 carpetas "sin cargar" y 17 eran clubes que
//      SÍ están en el sitio — Racing, Almagro, Gent, Botafogo... — porque el nombre de
//      la carpeta matcheaba a 0 o 2+ clubes.)
//
//   2. Si es nuevo, arma la entrada de `data/clubs.js` con TODOS los campos que
//      usan las entradas existentes: id, name, displayName, country,
//      reportingCurrency, fiscalYearStart, sport, brandColor.
//
//   3. Para el ejercicio del documento: año y fecha de cierre, liga de esa
//      temporada, moneda del ejercicio, tipo de cambio de cierre, tipo de
//      documento (reportType), sourceId, y el PERÍMETRO (qué entidad es "el
//      club": individual o consolidado, asociación o sociedad).
//
//   4. Escribe su resultado en el REGISTRO DE ALTAS `Admin/altas-club.jsonl` (una línea
//      por carpeta, con huella de las entradas: ver tools/altas-registro.mjs). Siempre,
//      en cualquier modo salvo --backtest-claude: no depende de que quien lo corre se
//      acuerde de anotarlo (pedido de Guido: "las IA se olvidan").
//
//   5. Con `--claude`, manda las preguntas que se responden LEYENDO el documento a Claude
//      por API (tools/alta-claude.mjs: una llamada por club, cita textual verificada por
//      el script). Lo que Claude sostiene con cita se aplica y puede destrabar el alta.
//
//   6. Con `--escribir`, y SOLO si no quedó ninguna `pregunta`, aplica el alta
//      (ver "QUÉ ESCRIBE" abajo), corre los generadores y `node tools/audit.js`,
//      y si la auditoría da algún P0/P1 REVIERTE todo lo que escribió.
//
// ----------------------------------------------------------------------------
// LOS TRES ESTADOS DE CADA CAMPO
// ----------------------------------------------------------------------------
//   ok         el valor sale de una fuente mecánica (el propio documento, una
//              tabla del proyecto, una caché ya bajada) sin criterio de por medio.
//   pregunta   hace falta CRITERIO de verdad: no se inventa. El texto de la
//              pregunta va en el JSON, listo para mandarlo a Claude por API o
//              copiarlo a `Admin/dudas-por-club.md`. BLOQUEA `--escribir`.
//   pendiente  falta un DATO, no un criterio, y la ausencia es honesta y está a
//              la vista: se escribe el valor que el proyecto usa para "todavía
//              nadie lo miró" (brandColor AUSENTE, fila de liga en `null`, fx sin
//              cotización cacheada) y `node tools/audit.js` lo sigue contando. NO
//              bloquea `--escribir`. Existe como tercer estado porque tratar estos
//              casos como `pregunta` frenaría el alta de casi todos los clubes por
//              cosas que ninguna persona tiene que decidir, solo que alguien corra
//              un script de caché (fetch-fx-reference, fetch-club-league-reference,
//              fetch-brand-color-reference) — y tratarlos como `ok` sería mentir.
//
// ----------------------------------------------------------------------------
// DE DÓNDE SALE CADA CAMPO (y qué decide solo y qué NO)
// ----------------------------------------------------------------------------
// id               slug del nombre de la carpeta + '-' + ISO2 del país (convención
//                  de la Versión 129, `Admin/CONVENCIONES.md`: 'agf-dk',
//                  'racingsantander-es'). `pregunta` si choca con un id existente o
//                  si su base coincide con un id HEREDADO sin país ('racing',
//                  'union'...): la convención dice que ESE es el momento de
//                  renombrar el viejo, y eso lo decide Guido.
// displayName      el nombre de la carpeta (que ya es el nombre corto legible que
//                  eligió el sourcing), sin lo que vaya entre paréntesis.
// name             el nombre LEGAL: se busca en el `.md` una línea con el nombre del
//                  club + una forma societaria (A/S, N.V., S.p.A., GmbH, plc, S.A.,
//                  SAF, a.s., d.d., A.Ş., P.A.E., FLI...). `ok` si aparece al menos
//                  2 veces; si no, `pendiente` con el displayName como valor (no es
//                  falso, solo menos completo).
// country          tabla PAISES de abajo (nombre de la carpeta del país -> ISO2).
//                  `pregunta` para Escocia (el sitio no tiene país propio para
//                  Escocia: GB es "Inglaterra" en `data/leagues.js`).
// reportingCurrency tabla PAISES. Además mira el documento: si el ejercicio es
//                  anterior al euro (o a la redenominación de la lira turca, o a la
//                  entrada de Croacia al euro en 2023) y el documento habla en la
//                  moneda vieja, `pregunta`; si otra moneda domina claramente el
//                  texto, `pregunta`.
// fiscalYearStart  del CONTENIDO del `.md`: se cuentan todas las fechas de fin de
//                  mes que aparecen (en 15 idiomas, numéricas, ISO y CJK) y el mes
//                  de cierre es el más frecuente; el ejercicio arranca el día 1 del
//                  mes siguiente. Si el nombre del archivo trae una fecha ISO
//                  (`OFI_FS_2025-06-30`) se usa como confirmación. Si el documento
//                  no alcanza, se mira el resto de los `.md` de la carpeta del club;
//                  si tampoco, el patrón del país (lo que usan los clubes del mismo
//                  país ya cargados, solo si son unánimes). Si nada de eso alcanza,
//                  `pregunta`. Si los documentos del club muestran un CAMBIO de
//                  cierre (Genoa: 31/12 hasta 2023, 30/6 desde 2024) se usa el del
//                  documento más reciente (criterio de Racing, que cambió del 31/8 al
//                  30/6) y se avisa.
// sport            'futbol', salvo que el `.md` hable tanto o más de rugby / cricket /
//                  Fórmula 1 / NFL que de fútbol, que es `pregunta` ("Football Club" y
//                  "National Football League" no cuentan como fútbol: los clubes de
//                  rugby ingleses se llaman "... Football Club") (en `Clubes/`
//                  hay equipos de F1, rugby y cricket ingleses y los Green Bay
//                  Packers: el catálogo de `data/leagues.js` los tiene inactivos).
// brandColor       NUNCA lo decide este script. `tools/brand-color-reference/`
//                  (caché de footylogos) da candidatos, pero la regla de
//                  `club-or-year-onboarding` §3 1b es identidad primero (¿de qué
//                  color es la camiseta?) y hex después, y un color equivocado se
//                  lee peor que ninguno. Queda `pendiente`: el campo se escribe
//                  AUSENTE (= "nadie lo chequeó", P3 `club-sin-color-ni-null`), no
//                  `null` (= "se miró y no lleva color", que sería mentir).
//
// Del ejercicio:
// anio / cierre    año de CIERRE (convención del sitio) sacado del nombre del
//                  archivo con la misma función que `onboard.mjs --quien`, y
//                  confirmado contra las fechas de cierre del contenido. Si no
//                  coinciden, `pregunta`.
// liga             `data/club-leagues/<iso2>.js` si el club ya tiene fila; si no,
//                  la caché de rosters de `tools/club-league-reference/<iso2>.json`
//                  (la misma que lee `tools/lookup-club-league.js`). Coincidencia
//                  EXACTA del nombre normalizado, única, y con la liga en el
//                  catálogo -> `ok`. Coincidencia parcial ("OFI Crete" / "OFI") o liga
//                  fuera del catálogo -> `pendiente` con la duda en `nota` (hasta el
//                  2026-09-30 era `pregunta`: con la caché de rosters creciendo, más
//                  datos daban MENOS clubes listos, 21 carpetas frenadas solo por esto,
//                  y la fila en `null` es la verdad mientras nadie lo confirme). Sin caché
//                  para esa liga-temporada -> `pendiente` y la fila se escribe en `null`
//                  (= "nadie lo verificó", P3).
// currency         la del país, o la que el documento muestra (ver arriba).
// fx               REGLA #0 de `club-data-mapping` §5: el tipo de cambio que declara
//                  el propio documento gana siempre. Se buscan en el `.md` líneas
//                  con una palabra de tipo de cambio (tipo de cambio, taxa de
//                  câmbio, PTAX, exchange rate, Wechselkurs, tečaj, kurz, курс,
//                  ισοτιμία, 환율, 汇率...) y una mención al dólar, y se extraen los
//                  números que caen en el rango plausible de la moneda (y, si hay
//                  serie local, a menos de 20% de la cotización de mercado de ese
//                  día). Un solo valor -> `ok` con `fxSource:'document_close'`. Varios,
//                  o una moneda casi a la par del dólar (EUR/GBP/CHF, donde no se
//                  puede saber solo por el número si está invertido) -> `pregunta`
//                  con los candidatos y la línea de cada uno. Si el documento
//                  menciona tipo de cambio y dólar con números pero ninguno es una
//                  cotización plausible (un cuadro de sensibilidad, de exposición),
//                  `pendiente` ("confirmar en el documento antes de cargar") y se
//                  propone igual la de mercado. Además de la ventana de ±1 línea, cuenta
//                  como contexto un encabezado de anexo de moneda extranjera en las 40
//                  líneas previas (el TC va en una columna "TC", lejos de la palabra).
//                  Si el documento no
//                  declara nada: `FX_CLOSE` de `data/currency-map.js` si ya tiene
//                  esa fecha (`fxRef`), si no la serie local de
//                  `tools/fx-reference/` (la de `tools/lookup-fx-close.js`: ARS, BRL,
//                  COP, NOK, CZK, CHF, TRY, RUB, UAH, KRW, CLP), si no `pendiente` ("correr fetch-fx-reference.mjs").
// reportType       'official_balance_sheet' si el documento nombra un estado contable
//                  Y trae filas con números (10+ filas de tabla o líneas con 2+ montos:
//                  un dictamen de auditor nombra los estados sin traerlos); `pregunta`
//                  si parece un presupuesto (el fx pasa a ser una premisa,
//                  `document_assumption`), un estado INTERMEDIO (por el nombre o por el
//                  texto: "seis meses", "1º semestre", "interim"...), un acta, una
//                  memoria sin balance, etc. Un intermedio tampoco cuenta para decidir
//                  el cierre del ejercicio del club (Palestino 2018: semestral al 30/6
//                  de un club que cierra el 31/12).
// sourceId         `<id>-<nombre del archivo en slug>`, mecánico.
// perimetro        `pregunta` cuando el documento trae estados CONSOLIDADOS (con o
//                  sin los individuales al lado), o cuando la carpeta del club tiene
//                  documentos del mismo año de dos entidades distintas (Molde:
//                  "Molde Fotballklubb FLI" y "Molde Fotball AS"; Genoa: individual y
//                  consolidato). El criterio que el proyecto usó hasta ahora
//                  (preferir la entidad individual, Boca/Racing/Panathinaikos) va
//                  como SUGERENCIA en el texto de la pregunta, no como decisión: qué
//                  entidad es "el club" es exactamente el tipo de cosa que no se
//                  inventa.
//
// ----------------------------------------------------------------------------
// QUÉ ESCRIBE `--escribir` (y qué NO)
// ----------------------------------------------------------------------------
// Sale del commit que agregó Panathinaikos (839fea7) y del skill de onboarding §3:
//   - `data/clubs.js`: la línea del club en `clubs{}` (única cosa centralizada).
//   - `data/<id>-data.js`: el ESQUELETO, con la cabecera de comentario de siempre y
//     todas las estructuras vacías (sin ejercicios: los rubros los carga la etapa de
//     carga, `tools/proponer-carga.mjs`). El `fiscalYearMeta` propuesto va ADENTRO
//     DE UN COMENTARIO, no registrado: un ejercicio con meta y sin rubros se vería
//     en el sitio como un año en cero, y "sin dato no es cero".
//   - `data/club-leagues/<iso2>.js`: la fila (club, año) -> liga (o `null`). Si el
//     país no tenía archivo, lo crea con la cabecera estándar.
//   - PAÍS NUEVO: su entrada en `COUNTRIES` (`data/leagues.js`) y su nombre en
//     `data/lang/en.js` (tabla PAISES de abajo; la bandera sale del ISO2).
//   - MONEDA NUEVA: su entrada en `CURRENCY_META` y en `FX_PLAUSIBLE_RANGE`
//     (`data/currency-map.js`), con la escala y el rango de la tabla MONEDAS.
//   - FX de mercado nuevo (solo si salió de la serie local): su entrada en
//     `FX_CLOSE`, que es donde vive un dato de mercado (nunca en el archivo del club).
//   - `index.html`: sube ASSET_V (la constante Y cada `?v=` literal, CLAUDE.md "Gotchas
//     de tooling"), salvo que ya esté subido respecto del último commit. Sin esto
//     `audit.js` da P1 `asset-v-sin-subir` apenas cambia algo de `data/` (lo encontró la
//     primera prueba de `--escribir`, que se revirtió sola por eso). Subirlo regenera las
//     ~165 páginas `fuentes/<clubId>.html`, que leen la constante: es esperado.
//   - Corre `generate-club-index.js`, `generate-fuentes-page.js`,
//     `generate-rankings.js` y `generate-como-corre-stats.js`, y después
//     `node tools/audit.js --quiet`. Si sale con P0/P1, RESTAURA cada archivo que
//     cambió y borra cada archivo que creó (snapshot previo de `data/`, las páginas
//     de fuentes, el sitemap y los dos documentos generados de `Admin/`).
// NO escribe: `sources{}` del club (un documento en `fuentes.html` sin ningún dato
// cargado sería una fuente de nada), ningún ejercicio, ninguna liga nueva en el
// catálogo (`LEAGUES` es decisión de Guido, ver `'liga-no-catalogada'` en la
// cabecera de `data/club-leagues.js`), `brandColor`, ni nada fuera de esa lista.
// No commitea. OJO: un club dado de alta sin ejercicios aparece en `data/club-
// index.js` con 0 ejercicios; el alta y la carga del primer ejercicio van juntas
// en el mismo commit, nunca el alta sola a producción.
//
// ----------------------------------------------------------------------------
// USO
// ----------------------------------------------------------------------------
//   node tools/alta-club.mjs "Clubes/Grecia/OFI Crete/OFI_FS_2025-06-30.pdf"
//        (default --propuesta: imprime el JSON con cada campo, valor, fuente, estado)
//   node tools/alta-club.mjs "<pdf o md>" --anio 2025
//   node tools/alta-club.mjs "<pdf o md>" --escribir
//   node tools/alta-club.mjs "<doc1>" "<doc2>" ... --resumen
//        (varios documentos: una línea por club con % de campos ok y sus preguntas)
//   node tools/alta-club.mjs ... --anotar-misses
//        (en --propuesta las cachés se leen directo y NO se anota nada en los
//        misses.jsonl de las tools de lookup; con este flag, o con --escribir, se
//        llama a las tools de verdad, que anotan cada hueco para que Guido lo vea)
//
//   REGISTRO (Admin/altas-club.jsonl) — gratis salvo --claude:
//   node tools/alta-club.mjs --todos
//        todas las carpetas de Clubes/ que carpetas-clubes.mjs da como `nuevo` (sin
//        las de agregado "_*"); elige el documento base de cada una (estado contable
//        anual por el nombre > transcripción listo > ejercicio más reciente; si el
//        elegido no sirve de base —no es un balance anual, no se le saca el año— prueba
//        hasta 4 candidatos) y recalcula SOLO las carpetas cuya huella cambió.
//        ~5 s para 212 carpetas. --forzar recalcula todo; --solo <texto> filtra.
//   node tools/alta-club.mjs --todos --claude [--tope-usd 1]
//        además manda a Claude las preguntas de documento todavía sin preguntar
//        (primero las carpetas que Claude puede dejar listas). Reusa respuestas ya
//        pagadas si el .md y las preguntas no cambiaron (--forzar-claude las rehace).
//   node tools/alta-club.mjs --resumen      conteo por estado + los listo-para-alta
//   node tools/alta-club.mjs --dudas        candidatas a Admin/dudas-por-club.md (NO escribe ahí)
//   node tools/alta-club.mjs --backtest-claude [--limit 5] [--saltear N]
//        las mismas preguntas a clubes YA cargados, contra lo cargado (Admin/altas-claude/)
//   node tools/alta-club.mjs --informe-backtest   recalcula el acierto del backtest, gratis
//
// Sin --claude / --backtest-claude: 0 llamadas a APIs ni a internet, todo sale de
// archivos locales. Con --claude: ~US$ 0,05-0,09 por club (medido, Admin/tests/test-altas-claude.md).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync, mkdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname, basename, extname, relative, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { clubDeCarpeta } from './carpetas-clubes.mjs';
import { ajusteDe } from './ajustes.mjs';
import { huellaEntradas, sha1Archivo, leerRegistro, guardarEnRegistro, resumenAltas, ESTADOS } from './altas-registro.mjs';
import { preguntarAClaude, MODELO_DEFAULT, UMBRAL_CONFIANZA, paginas as paginasDe } from './alta-claude.mjs';
export { resumenAltas };

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flagVal = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
const RESUMEN = ARGS.includes('--resumen');
const ANOTAR_MISSES = ARGS.includes('--anotar-misses') || ESCRIBIR;
const ANIO_FORZADO = flagVal('--anio') ? Number(flagVal('--anio')) : null;
const TODOS = ARGS.includes('--todos');
const DUDAS = ARGS.includes('--dudas');
const CLAUDE = ARGS.includes('--claude');
const BACKTEST = ARGS.includes('--backtest-claude');
const FORZAR = ARGS.includes('--forzar');
const MODELO = flagVal('--modelo') || MODELO_DEFAULT;
const LIMITE = flagVal('--limit') !== null ? Number(flagVal('--limit')) : null;
const TOPE_USD = flagVal('--tope-usd') !== null ? Number(flagVal('--tope-usd')) : 1;
const CON_VALOR = new Set(['--anio', '--modelo', '--limit', '--tope-usd', '--solo']);
const DOCS = ARGS.filter((a, i) => !a.startsWith('--') && !CON_VALOR.has(ARGS[i - 1]));

// ============================================================================
// TABLAS FIJAS. Lo único "conocimiento propio" del script: datos públicos que no
// cambian (ISO 3166, la moneda de curso legal de cada país, en qué año dejó de
// circular la moneda vieja). La bandera NO está acá: sale del ISO2 (los emoji de
// bandera son los dos "regional indicators" del código, mecánico).
// ============================================================================
// Clave = nombre de la carpeta de país en `Clubes/` (en castellano, como las crea
// el sourcing). `en` es el nombre para `data/lang/en.js`; `legado` es la moneda
// que se usaba ANTES de `desde` (año de cierre del ejercicio a partir del cual los
// balances ya salen en la moneda actual).
const PAISES = {
  'Alemania':        { iso2: 'DE', moneda: 'EUR', region: 'europa', en: 'Germany', legado: { codigo: 'DEM', desde: 2002, tokens: ['dem', 'dm', 'deutsche mark'] } },
  'Argentina':       { iso2: 'AR', moneda: 'ARS', region: 'sudamerica', en: 'Argentina' },
  'Austria':         { iso2: 'AT', moneda: 'EUR', region: 'europa', en: 'Austria', legado: { codigo: 'ATS', desde: 2002, tokens: ['ats', 'schilling'] } },
  'Brasil':          { iso2: 'BR', moneda: 'BRL', region: 'sudamerica', en: 'Brazil' },
  'Bélgica':         { iso2: 'BE', moneda: 'EUR', region: 'europa', en: 'Belgium', legado: { codigo: 'BEF', desde: 2002, tokens: ['bef', 'belgische frank', 'francs belges', 'bfr'] } },
  'Chile':           { iso2: 'CL', moneda: 'CLP', region: 'sudamerica', en: 'Chile' },
  'China':           { iso2: 'CN', moneda: 'CNY', region: 'asia', en: 'China' },
  'Colombia':        { iso2: 'CO', moneda: 'COP', region: 'sudamerica', en: 'Colombia' },
  'Corea del Sur':   { iso2: 'KR', moneda: 'KRW', region: 'asia', en: 'South Korea' },
  'Costa Rica':      { iso2: 'CR', moneda: 'CRC', region: 'norteamerica', en: 'Costa Rica' },
  'Croacia':         { iso2: 'HR', moneda: 'EUR', region: 'europa', en: 'Croatia', legado: { codigo: 'HRK', desde: 2023, tokens: ['hrk', 'kuna', 'kuna', 'kn'] } },
  'Dinamarca':       { iso2: 'DK', moneda: 'DKK', region: 'europa', en: 'Denmark' },
  'Ecuador':         { iso2: 'EC', moneda: 'USD', region: 'sudamerica', en: 'Ecuador' },
  // Escocia NO tiene ISO2 propio (es parte de GB) y el sitio usa GB = "Inglaterra"
  // con la bandera inglesa: dar de alta un club escocés es una decisión de producto.
  'Escocia':         { iso2: null, moneda: 'GBP', region: 'europa', en: 'Scotland', pregunta: 'El sitio no tiene país "Escocia": GB está catalogado como "Inglaterra" (🏴 inglesa) en data/leagues.js. ¿El club escocés va bajo GB con otro nombre/bandera, o hace falta un código propio (ej. "GB-SCT") en COUNTRIES?' },
  'España':          { iso2: 'ES', moneda: 'EUR', region: 'europa', en: 'Spain', legado: { codigo: 'ESP', desde: 2002, tokens: ['pesetas', 'ptas', 'esp'] } },
  'Estados Unidos':  { iso2: 'US', moneda: 'USD', region: 'norteamerica', en: 'United States' },
  'Francia':         { iso2: 'FR', moneda: 'EUR', region: 'europa', en: 'France', legado: { codigo: 'FRF', desde: 2002, tokens: ['frf', 'francs'] } },
  'Grecia':          { iso2: 'GR', moneda: 'EUR', region: 'europa', en: 'Greece', legado: { codigo: 'GRD', desde: 2002, tokens: ['grd', 'δραχμ', 'drachm'] } },
  'Guatemala':       { iso2: 'GT', moneda: 'GTQ', region: 'norteamerica', en: 'Guatemala' },
  'Honduras':        { iso2: 'HN', moneda: 'HNL', region: 'norteamerica', en: 'Honduras' },
  'Inglaterra':      { iso2: 'GB', moneda: 'GBP', region: 'europa', en: 'England' },
  'Italia':          { iso2: 'IT', moneda: 'EUR', region: 'europa', en: 'Italy', legado: { codigo: 'ITL', desde: 2002, tokens: ['lire', 'itl', 'lit.'] } },
  'Jamaica':         { iso2: 'JM', moneda: 'JMD', region: 'norteamerica', en: 'Jamaica' },
  'Japón':           { iso2: 'JP', moneda: 'JPY', region: 'asia', en: 'Japan' },
  'México':          { iso2: 'MX', moneda: 'MXN', region: 'norteamerica', en: 'Mexico' },
  'Noruega':         { iso2: 'NO', moneda: 'NOK', region: 'europa', en: 'Norway' },
  // Panamá: el balboa está a la par del dólar y los balances suelen salir en "B/." o
  // en USD indistintamente — no es algo que el script pueda asumir.
  'Panamá':          { iso2: 'PA', moneda: null, region: 'norteamerica', en: 'Panama', preguntaMoneda: 'Panamá: el balboa (PAB) está a la par del dólar y los estados contables salen en B/. o en USD. ¿Se carga como USD (sin toggle) o como PAB con fx 1?' },
  'Países Bajos':    { iso2: 'NL', moneda: 'EUR', region: 'europa', en: 'Netherlands', legado: { codigo: 'NLG', desde: 2002, tokens: ['nlg', 'gulden', 'hfl', 'fl.'] } },
  'Perú':            { iso2: 'PE', moneda: 'PEN', region: 'sudamerica', en: 'Peru' },
  'Portugal':        { iso2: 'PT', moneda: 'EUR', region: 'europa', en: 'Portugal', legado: { codigo: 'PTE', desde: 2002, tokens: ['pte', 'escudos', 'contos'] } },
  'República Checa': { iso2: 'CZ', moneda: 'CZK', region: 'europa', en: 'Czech Republic' },
  'Rusia':           { iso2: 'RU', moneda: 'RUB', region: 'europa', en: 'Russia' },
  'Suiza':           { iso2: 'CH', moneda: 'CHF', region: 'europa', en: 'Switzerland' },
  'Turquía':         { iso2: 'TR', moneda: 'TRY', region: 'europa', en: 'Turkey', legado: { codigo: 'TRL', desde: 2005, tokens: ['trl', 'türk lirası', 'turk lirasi'] } },
  'Ucrania':         { iso2: 'UA', moneda: 'UAH', region: 'europa', en: 'Ukraine' },
};
const NOMBRE_PAIS_ES = { DE: 'Alemania', AR: 'Argentina', AT: 'Austria', BR: 'Brasil', BE: 'Bélgica', CL: 'Chile', CN: 'China', CO: 'Colombia', KR: 'Corea del Sur', CR: 'Costa Rica', HR: 'Croacia', DK: 'Dinamarca', EC: 'Ecuador', ES: 'España', US: 'Estados Unidos', FR: 'Francia', GR: 'Grecia', GT: 'Guatemala', HN: 'Honduras', GB: 'Inglaterra', IT: 'Italia', JM: 'Jamaica', JP: 'Japón', MX: 'México', NO: 'Noruega', PA: 'Panamá', NL: 'Países Bajos', PE: 'Perú', PT: 'Portugal', CZ: 'República Checa', RU: 'Rusia', CH: 'Suiza', TR: 'Turquía', UA: 'Ucrania' };

// Monedas: escala de visualización (mismo criterio que la cabecera de
// data/currency-map.js: scale 1000 = "miles de millones", para monedas de valor
// nominal grande), rango plausible de "moneda por 1 USD" (generoso a propósito:
// atrapa un fx invertido o con el orden de magnitud mal, no exige precisión), y
// las formas en que el texto de un balance nombra la moneda.
//
// RANGOS REVISADOS (2026-09-30) contra el mínimo y el máximo REAL de cada serie de tools/fx-reference/
// (bug real: TRY estaba en [1, 45] y la lira cotiza 48,93 al 30/9/2026, así que un tipo de cambio
// declarado de hoy se descartaba como "no plausible"). Criterio: [~90% del mínimo histórico, máximo
// histórico + margen para lo que puede moverse en ~1-2 años]. Mín./máx. medidos (fecha):
//   ARS 2,76 (2003-07) – 1.525,5 (2026-09)   -> [0.9, 3000]  (0,9: antes de 2002 la convertibilidad era 1:1)
//   BRL 1,5345 (2011-07) – 6,2086 (2025-01)  -> [1.4, 7.5]   (era [3, 7]: descartaba todo 2010-2015)
//   COP 1.748 (2011-07) – 5.061 (2022-11)    -> [1600, 5500] (era [2500, 5000]: descartaba 2010-2014)
//   NOK 4,96 (2008-04) – 11,48 (2025-01)     -> [4.5, 13]
//   CZK 14,45 (2008-07) – 42,13 (2000-10)    -> [13, 45]     (era [15, 35]: descartaba 2000-2003 y 2008)
//   CHF 0,7296 (2011-08) – 1,825 (2000-10)   -> [0.65, 1.95]
//   TRY 0,535 (2000-01) – 48,93 (2026-09)    -> [0.5, 70]    (lira nueva; se deprecia 20-40% por año: margen amplio)
//   RUB 23,13 (2008-07) – 120,38 (2022-03)   -> [20, 140]
//   UAH 4,84 (2008-07) – 44,98 (2026-06)     -> [4.5, 60]
//   KRW 903,2 (2007-10) – 1.570,1 (2009-03)  -> [800, 1800]
// Las monedas sin serie local (PEN, EUR, GBP, DKK, CNY, JPY, MXN...) quedan como estaban.
// OJO: esta tabla es la de alta-club.mjs (filtra candidatos del texto y es lo que `--escribir` copia a
// FX_PLAUSIBLE_RANGE cuando la moneda es NUEVA). El rango del sitio vive en data/currency-map.js
// (FX_PLAUSIBLE_RANGE) y no se edita desde acá.
const MONEDAS = {
  ARS: { scale: 1000, rango: [0.9, 3000], tokens: ['ars', '\\$'] },
  BRL: { scale: 1, rango: [1.4, 7.5], tokens: ['r\\$', 'brl', 'reais'] },
  CLP: { scale: 1000, rango: [600, 1200], tokens: ['clp', '\\$'] },
  COP: { scale: 1000, rango: [1600, 5500], tokens: ['cop', '\\$'] },
  PEN: { scale: 1, rango: [3, 5], tokens: ['pen', 's/\\.?', 'soles'] },
  USD: { scale: 1, rango: [1, 1], tokens: ['usd', 'us\\$', 'u\\$s'] },
  EUR: { scale: 1, rango: [0.7, 1.15], tokens: ['eur', '€', 'euro', 'euros', 'евро', 'євро', 'ευρω'] },
  GBP: { scale: 1, rango: [0.6, 0.95], tokens: ['gbp', '£'] },
  DKK: { scale: 1, rango: [5, 8], tokens: ['dkk', 't\\.kr', 'mio\\. kr', 'kr\\.'] },
  NOK: { scale: 1, rango: [4.5, 13], tokens: ['nok', 'kr', 'kroner'] },
  CZK: { scale: 1, rango: [13, 45], tokens: ['czk', 'kč', 'kc', 'korun'] },
  CHF: { scale: 1, rango: [0.65, 1.95], tokens: ['chf', 'fr\\.', 'franken'] },
  TRY: { scale: 1, rango: [0.5, 70], tokens: ['try', 'tl', 'türk lirası', 'turk lirasi'] },
  RUB: { scale: 1, rango: [20, 140], tokens: ['rub', 'руб', 'рубл'] },
  UAH: { scale: 1, rango: [4.5, 60], tokens: ['uah', 'грн', 'гривн'] },
  KRW: { scale: 1000, rango: [800, 1800], tokens: ['krw', '원', '₩'] },
  CNY: { scale: 1, rango: [6, 8], tokens: ['cny', 'rmb', '人民币', '元'] },
  JPY: { scale: 1, rango: [80, 180], tokens: ['jpy', '円', '¥'] },
  MXN: { scale: 1, rango: [10, 25], tokens: ['mxn', '\\$'] },
  GTQ: { scale: 1, rango: [7, 9], tokens: ['gtq', 'quetzales'] },
  HNL: { scale: 1, rango: [18, 27], tokens: ['hnl', 'lempiras'] },
  JMD: { scale: 1, rango: [80, 170], tokens: ['jmd', 'j\\$'] },
  CRC: { scale: 1, rango: [450, 700], tokens: ['crc', '₡', 'colones'] },
};
// Monedas casi a la par del dólar: por el número solo no se puede saber si el
// documento escribió "moneda por USD" o "USD por moneda" (1,08 es EUR/USD al
// derecho o al revés según quién lo escriba). El bug de España de la Versión 111
// fue exactamente esto. Un fx declarado en estas monedas siempre es `pregunta`.
const MONEDAS_A_LA_PAR = new Set(['EUR', 'GBP', 'CHF']);

// Palabras que marcan una línea de tipo de cambio, y las que nombran al dólar.
const FX_PALABRAS = ['tipo de cambio', 'tipos de cambio', 'cotizacion', 'taxa de cambio', 'taxas de cambio', 'ptax', 'cotacao', 'exchange rate', 'rate of exchange', 'rates of exchange', 'tasso di cambio', 'tassi di cambio', 'taux de change', 'wechselkurs', 'devisenkurs', 'stichtagskurs', 'wisselkoers', 'valutakurs', 'kurs ', 'kurz', 'tecaj', 'doviz kuru', 'kuru', 'курс', 'ισοτιμ', '환율', '汇率', 'trm', 'tasa representativa'];
const USD_PALABRAS = ['usd', 'us$', 'u$s', 'dolar', 'dollar', 'доллар', 'долар', 'δολαρ', '달러', '美元', 'dolár', 'dolaru', 'dolara'];
// Encabezados de un anexo de moneda extranjera (el tipo de cambio va en una columna, lejos de la
// palabra "tipo de cambio").
const ANCLAS_FX = ['moneda extranjera', 'foreign currenc', 'moeda estrangeira', 'moedas estrangeiras', 'valuta estera', 'valute estere', 'fremmed valuta', 'fremmede valuta', 'vreemde valuta', 'fremdwahrung', 'devises', 'cizi men', 'иностранн', 'іноземн', 'ξενο νομισμα', 'yabanci para', 'doviz', '외화', '外币', 'cotizacion', 'tipo de cambio', 'taxa de cambio', 'exchange rate'];
// Palabras que marcan que una tasa es la de CIERRE (y no un promedio del período).
const CIERRE_PALABRAS = ['cierre', 'closing', 'fechamento', 'encerramento', 'chiusura', 'stichtag', 'balansdag', 'closing rate', 'year end', 'year-end', 'al 31', 'al 30', 'em 31', 'at 31', 'at 30', 'на 31', 'на конец', 'станом на', 'kapanış', 'donem sonu', 'dönem sonu', '기말', '期末'];

// Formas societarias, para encontrar el nombre legal en el documento.
const FORMAS = ['a/s', 'aps', 'asa', 'as', 'ab', 'n\\.v\\.', 'nv', 'b\\.v\\.', 'bv', 'vzw', 'srl', 's\\.a\\.d\\.', 'sad', 's\\.a\\.', 'sa', 'saf', 's\\.p\\.a\\.', 'spa', 's\\.r\\.l\\.', 'gmbh & co\\. kgaa', 'gmbh', 'ag', 'e\\.v\\.', 'plc', 'ltd\\.?', 'limited', 'a\\.s\\.', 's\\.r\\.o\\.', 'z\\.s\\.', 'd\\.d\\.', 's\\.d\\.d\\.', 'd\\.o\\.o\\.', 'a\\.ş\\.', 'p\\.a\\.e\\.', 'π\\.α\\.ε\\.', 'παε', 'fli', 'inc\\.?', 'co\\., ltd\\.?', 'ltda\\.?', 's\\.a\\.s\\.', 'kgaa', 'oyj', 'ооо', 'ао', 'пао', 'тов', 'пат'];

// Deportes que NO son fútbol, para no dar de alta como 'futbol' un equipo de F1.
const DEPORTES_OTROS = {
  rugby: /\brugby\b/g,
  cricket: /\bcricket\b|\bcounty cricket\b|\bccc\b/g,
  f1: /formula (1|one)\b|\bgrand prix\b|\bf1\b/g,
  nfl: /\bnfl\b|national football league/g,
  basquet: /\bbasketball\b|\bbasquet\b|\bbaloncesto\b/g,
};
const FUTBOL_RE = /football|futbol|fútbol|futebol|calcio|fodbold|fotball|voetbal|fussball|fußball|nogomet|fotbal|ποδοσφ|футбол|축구|足球|サッカー|soccer/g;

// Nombres de archivo que NO son un estado contable anual (presupuestos, intermedios, actas,
// memorias sueltas, dictámenes): no se cargan como balance y no cuentan para el historial de
// cierres del club (un semestral al 30/6 de un club que cierra el 31/12 NO es un cambio de cierre:
// bug real de la primera versión con Guangzhou Evergrande).
const NO_BALANCE = /presupuesto|orcamento|budget|previsional|semi-annual|semi annual|semiannual|interim|intermedi|trimestr|quarter|ene-jun|movimientos|pagos|presentacion|acta|asamblea|minutes|agm|informe-gestion|informe-presidencia|reglamento|board_report|board-report|dictamen|comision-revisora|pagos-agentes|review/;
// Señales en el CONTENIDO de un estado intermedio (6 meses, semestral, trimestral).
const INTERMEDIO_RE = /estados? financieros? intermedios?|periodo intermedio|seis meses|6 meses|semestral|[12][ºo°]? semestre|primeiro semestre|primer semestre|first half|interim (financial|condensed|report)|six months|half-year|half year|halbjahr|semestrale|tussentijds|halvars|pololet|полугод|піврічн|ενδιαμεσ|반기|中期/g;
// Meses, por idioma (sin acentos, en minúscula; ruso/ucraniano/griego/checo/croata
// en genitivo, que es como aparecen en una fecha). Valor = número de mes.
const MESES = {};
const agregarMeses = (lista) => lista.forEach((m, i) => { for (const alt of m.split('|')) MESES[alt] = i + 1; });
agregarMeses(['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre|setiembre', 'octubre', 'noviembre', 'diciembre']);
agregarMeses(['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']);
agregarMeses(['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']);
agregarMeses(['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']);
agregarMeses(['januar|jan', 'februar|feb', 'marz|maerz|mars|marts', 'april|apr', 'mai|maj', 'juni|jun', 'juli|jul', 'august|aug', 'september|sep|sept', 'oktober|okt', 'november|nov', 'dezember|desember|december|dez|des']);
agregarMeses(['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']);
agregarMeses(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']);
agregarMeses(['ledna', 'unora', 'brezna', 'dubna', 'kvetna', 'cervna', 'cervence', 'srpna', 'zari', 'rijna', 'listopadu', 'prosince']);
agregarMeses(['sijecnja', 'veljace', 'ozujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenoga|studenog', 'prosinca']);
agregarMeses(['ocak', 'subat', 'mart', 'nisan', 'mayis', 'haziran', 'temmuz', 'agustos', 'eylul', 'ekim', 'kasim', 'aralik']);
agregarMeses(['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']);
agregarMeses(['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']);
agregarMeses(['ιανουαριου', 'φεβρουαριου', 'μαρτιου', 'απριλιου', 'μαιου', 'ιουνιου', 'ιουλιου', 'αυγουστου', 'σεπτεμβριου', 'οκτωβριου', 'νοεμβριου', 'δεκεμβριου']);
agregarMeses(['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'wrzesnia', 'pazdziernika', 'listopada', 'grudnia']);
// "listopada" es noviembre en polaco y octubre en croata; "lutego" febrero en polaco y
// ucraniano: la última tabla agregada gana y las dos colisiones dan el mismo número
// salvo listopada (pl 11 / hr 10). Croacia pesa más en `Clubes/` que Polonia (0 clubes).
MESES['listopada'] = 10;
const MES_ALT = Object.keys(MESES).sort((a, b) => b.length - a.length).map((m) => m.replace(/\./g, '\\.')).join('|');

// ============================================================================
// UTILIDADES
// ============================================================================
// OJO con el `normalize('NFC')` final (bug real encontrado probando este script): NFD
// descompone las sílabas coreanas en jamo sueltos, y sin recomponerlas ni "2024년 12월 31일" ni
// "손익계산서" matcheaban nada. Efecto colateral aceptado: la "й" rusa y la "ї" ucraniana pierden
// su diacrítico (quedan "и"/"і"), así que los patrones de abajo usan raíces sin esas letras.
function norm(s) {
  return String(s || '').toLowerCase()
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/đ/g, 'd')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}
const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '');
const slugGuion = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const rel = (p) => relative(ROOT, p);
const ultimoDia = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const pad2 = (n) => String(n).padStart(2, '0');
const bandera = (iso2) => iso2 ? String.fromCodePoint(...[...iso2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : null;

function campo(nombre, valor, fuente, estado = 'ok', extra = {}) {
  return { campo: nombre, valor, fuente, estado, ...extra };
}

function runNode(script, args) {
  try {
    return { code: 0, out: execFileSync('node', [resolve(ROOT, script), ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'] }) };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') };
  }
}

// ============================================================================
// DATOS DEL SITIO (mismo patrón de `vm` que onboard.mjs / audit.js: se ejecutan
// los archivos reales, nunca se parsean a mano)
// ============================================================================
function cargarSitio() {
  const sandbox = { console: { log() {}, warn() {}, error() {} }, window: {}, document: { createElement() { return {}; }, head: { appendChild() {} } } };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const run = (relPath) => vm.runInContext(readFileSync(resolve(ROOT, relPath), 'utf8'), ctx, { filename: relPath });
  for (const f of ['data/clubs.js', 'data/currency-map.js', 'data/leagues.js', 'data/club-leagues.js']) run(f);
  for (const f of readdirSync(resolve(ROOT, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort()) run('data/club-leagues/' + f);
  return vm.runInContext(`({ clubs, CURRENCY_META, FX_CLOSE, FX_PLAUSIBLE_RANGE, COUNTRIES, LEAGUES, CLUB_LEAGUE_BY_YEAR: window.CLUB_LEAGUE_BY_YEAR })`, ctx);
}

// ============================================================================
// LECTURA DEL DOCUMENTO
// ============================================================================
// Todas las fechas de fin de mes del texto: {mes, anio, fecha:'YYYY-MM-DD'}.
function fechasFinDeMes(texto) {
  const t = norm(texto);
  const out = [];
  const push = (d, m, y) => {
    d = +d; m = +m; y = +y;
    if (!(m >= 1 && m <= 12) || y < 1980 || y > 2035) return;
    const ult = ultimoDia(y, m);
    if (d === ult || (m === 2 && d >= 28)) out.push({ mes: m, anio: y, fecha: `${y}-${pad2(m)}-${pad2(ult)}` });
  };
  // "31 de diciembre de 2024", "30 giugno 2024", "31. prosinca 2024.", "31 декабря 2023 г.",
  // y el encabezado típico de un balance comparativo: "Em 31 de dezembro de 2023 e 2024".
  const reNombre = new RegExp(`(?<![0-9])(\\d{1,2})\\.?\\s*(?:de\\s+|del\\s+)?(${MES_ALT})\\.?,?\\s*(?:de\\s+|del\\s+)?(\\d{4})(?:\\s+(?:e|y|and|und|en|et|i|og|ve|и|і|και)\\s+(\\d{4}))?`, 'g');
  for (const m of t.matchAll(reNombre)) { push(m[1], MESES[m[2]], m[3]); if (m[4]) push(m[1], MESES[m[2]], m[4]); }
  // "June 30, 2025"
  const reIngles = new RegExp(`(?<![a-z])(${MES_ALT})\\s+(\\d{1,2}),?\\s+(\\d{4})`, 'g');
  for (const m of t.matchAll(reIngles)) push(m[2], MESES[m[1]], m[3]);
  // "31.12.2024", "31/12/2024", "06/30/2025" (si el 2do número pasa de 12, es mes/día)
  for (const m of t.matchAll(/(?<![\d.,])(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?![\d])/g)) {
    if (+m[2] > 12 && +m[1] <= 12) push(m[2], m[1], m[3]); else push(m[1], m[2], m[3]);
  }
  // ISO y "2024.12.31"
  for (const m of t.matchAll(/(?<![\d])(\d{4})[-./](\d{1,2})[-./](\d{1,2})(?![\d])/g)) push(m[3], m[2], m[1]);
  // CJK: 2024년 12월 31일 / 2024年12月31日
  for (const m of t.matchAll(/(\d{4})\s*[년年]\s*(\d{1,2})\s*[월月]\s*(\d{1,2})\s*[일日]/g)) push(m[3], m[2], m[1]);
  return out;
}

// El mes de cierre y el año del ejercicio que muestra un texto.
function cierreDelTexto(texto) {
  const fechas = fechasFinDeMes(texto);
  if (!fechas.length) return null;
  const porMes = {};
  for (const f of fechas) porMes[f.mes] = (porMes[f.mes] || 0) + 1;
  const [mesTop, nTop] = Object.entries(porMes).sort((a, b) => b[1] - a[1])[0];
  const share = nTop / fechas.length;
  const porAnio = {};
  for (const f of fechas) if (f.mes === +mesTop) porAnio[f.anio] = (porAnio[f.anio] || 0) + 1;
  const maxN = Math.max(...Object.values(porAnio));
  // El año del ejercicio: el más nuevo que aparece con peso real (un balance cita el
  // año comparativo casi tantas veces como el propio; una fecha posterior suelta —
  // hechos posteriores, la fecha de aprobación— no llega al umbral).
  const anios = Object.entries(porAnio).filter(([, n]) => n >= Math.max(2, 0.3 * maxN)).map(([y]) => +y);
  const anio = anios.length ? Math.max(...anios) : +Object.entries(porAnio).sort((a, b) => b[1] - a[1])[0][0];
  return { mes: +mesTop, n: nTop, total: fechas.length, share, anio, porMes };
}

// La fecha que trae el propio nombre del archivo (OFI_FS_2025-06-30, Genoa-bilancio-30.06.2024,
// trabzonspor-...-31-05-2021), si es un fin de mes.
function cierreDelNombre(nombre) {
  const f = fechasFinDeMes(nombre.replace(/_/g, ' '));
  if (f.length) return f[f.length - 1];
  // "ESTADO-DE-SITUACION-FINANCIERA-DICIEMBRE-2022": mes con nombre completo + año, sin día.
  const n = norm(nombre);
  const m = n.match(new RegExp(`(?<![a-z])(${Object.keys(MESES).filter((k) => k.length >= 5).join('|')})[-_ .]+(\\d{4})(?!\\d)`));
  if (m) { const mes = MESES[m[1]]; const y = +m[2]; return { mes, anio: y, fecha: `${y}-${pad2(mes)}-${pad2(ultimoDia(y, mes))}` }; }
  return null;
}

// Misma función que tools/onboard.mjs (guessYear): año de CIERRE a partir del nombre.
function anioDelNombre(filename) {
  const iso = filename.match(/(?<!\d)(\d{4})[-_](0[1-9]|1[0-2])[-_](0[1-9]|[12]\d|3[01])(?!\d)/);
  if (iso) return parseInt(iso[1], 10);
  const dmy = filename.match(/(?<!\d)(0[1-9]|[12]\d|3[01])[-_.](0[1-9]|1[0-2])[-_.](\d{4})(?!\d)/);
  if (dmy) return parseInt(dmy[3], 10);
  const range = filename.match(/(\d{4})[-_](\d{2,4})(?!\d)/);
  if (range) {
    const start = parseInt(range[1], 10);
    if (range[2].length === 4) return parseInt(range[2], 10);
    const endYear = parseInt(range[1].slice(0, 2) + range[2], 10);
    if (endYear === start + 1) return endYear;
  }
  const single = filename.match(/(?<!\d)((?:19|20)\d{2})(?!\d)/);
  return single ? parseInt(single[1], 10) : null;
}

function contar(texto, re) {
  return (texto.match(re) || []).length;
}

// Cuántas veces el texto nombra cada moneda (por sus tokens).
function menciones(textoNorm, codigo) {
  const cfg = MONEDAS[codigo];
  if (!cfg) return 0;
  let n = 0;
  for (const tok of cfg.tokens) {
    const esSimbolo = /^[^a-zа-яα-ω]/i.test(tok) || /[^\x00-\x7f]/.test(tok);
    const re = esSimbolo ? new RegExp(tok, 'g') : new RegExp(`(?<![a-z])${tok}(?![a-z])`, 'g');
    n += contar(textoNorm, re);
  }
  return n;
}

// Números de una línea, en cualquier formato (1.234,56 / 1,234.56 / 909,5 / 6.2573).
function numerosDe(linea) {
  const out = [];
  for (const m of linea.matchAll(/(?<![\d.,])\d{1,3}(?:[.,\s]\d{3})*(?:[.,]\d+)?(?![\d])|(?<![\d.,])\d+(?:[.,]\d+)?(?![\d])/g)) {
    const raw = m[0].trim();
    // Un pedazo de fecha ("28.07" de "28.07.2008", "31/12") no es un número.
    const despues = linea.slice(m.index + m[0].length, m.index + m[0].length + 2);
    const antes = linea.slice(Math.max(0, m.index - 2), m.index);
    if (/^[./-]\d/.test(despues) || /\d[./-]$/.test(antes)) continue;
    let s = raw.replace(/\s/g, '');
    const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
    if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
    else if (c !== -1) s = /,\d{3}$/.test(s) && s.length > 5 ? s.replace(/,/g, '') : s.replace(',', '.');
    else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 4) s = s.replace(/\./g, '');
    const n = parseFloat(s);
    if (Number.isNaN(n)) continue;
    // Un año suelto (2021) no es un tipo de cambio.
    if (/^(19|20)\d{2}$/.test(raw)) continue;
    out.push({ n, raw });
  }
  return out;
}

// REGLA #0 de club-data-mapping §5: ¿el documento declara su propio tipo de cambio a USD?
// COMPUERTA DE FECHA (Versión 373, escalera del tipo de cambio aprobada por Guido el 2026-10-02): una cotización cuya frase (la línea y sus
// vecinas) trae una fecha completa que NO es la del cierre no es la de cierre: es la de una operación. Se descarta y la escalera sigue (tabla,
// serie oficial). Caso real: Fortaleza CEIF 2025, L534 "El 20 de noviembre del año 2025, se realizó un traslado de dineros ... por USD
// 150.000 a la TRM de $ 3.716,73": se tomaba como declarado; la TRM oficial al 31-12-2025 es 3.757,08. Una cotización SIN fecha en su frase
// pasa como antes (los anexos "TC 41,50" de Racing o River no la traen).
function fxDeclarado(md, moneda, mercado, cierre = null) {
  const lineas = md.split('\n');
  const cfg = MONEDAS[moneda];
  if (!cfg || moneda === 'USD') return { candidatos: [], lineasConMencion: 0 };
  const [min, max] = cfg.rango;
  const candidatos = [];
  let lineasConMencion = 0; const descartadas = [];
  // El caso típico no es una frase sino un ANEXO: "ACTIVOS Y PASIVOS EN MONEDA EXTRANJERA" con una
  // columna "TC" / "Cambio vigente" y filas "Banco ... U$S 41,50 ..." varias líneas más abajo
  // (Racing Anexo VI, River Anexo V, Newell's Anexo I). Por eso además de la ventana de ±1 línea,
  // cuenta como contexto de tipo de cambio cualquier encabezado de ese tipo en las 40 líneas previas.
  let ancla = -1000;
  for (let i = 0; i < lineas.length; i++) {
    const ln = norm(lineas[i]);
    if (ANCLAS_FX.some((p) => ln.includes(p)) || /(^|[\s|])(tc|t\.c\.|cambio vigente|cambio al cierre)([\s|]|$)/.test(ln)) ancla = i;
    const ventana = norm([lineas[i - 1] || '', lineas[i], lineas[i + 1] || ''].join(' '));
    const tieneUsd = USD_PALABRAS.some((p) => ln.includes(p));
    if (!tieneUsd) continue;
    if (!FX_PALABRAS.some((p) => ventana.includes(p)) && i - ancla > 40) continue;
    // Solo números con parte decimal (un tipo de cambio se imprime "41,50", "6,2573", "1.203,00")
    // y que no sean el número de una nota o un anexo ("(Nota 3)").
    const nums = numerosDe(lineas[i]).filter(({ raw }) => /[.,]\d{1,4}$/.test(raw) && !new RegExp(`(nota|note|notes|anexo|annex|pag|page|punto)\\s*n?[°º.]?\\s*${raw.replace(/[.]/g, '\\.')}`).test(ln));
    // Una mención narrativa sin ningún número ("el préstamo en dólares se convirtió...,
    // la oscilación del tipo de cambio no incidió") no es una declaración de tipo de cambio.
    if (!nums.length) continue;
    lineasConMencion++;
    for (const { n, raw } of nums) {
      if (n < min || n > max) continue;
      // Si hay serie de mercado para ese día, lo que se aleja más de 20% no es un tipo de cambio de cierre.
      if (mercado && Math.abs(n / mercado - 1) > 0.2) continue;
      const fechasFrase = cierre ? fechasDe([lineas[i - 1] || '', lineas[i], lineas[i + 1] || ''].join(' ')) : [];
      if (fechasFrase.length && !fechasFrase.includes(cierre)) { descartadas.push({ valor: n, linea: i + 1, fechas: fechasFrase }); continue; }
      candidatos.push({ valor: n, raw, linea: i + 1, texto: lineas[i].trim().slice(0, 220), cierre: CIERRE_PALABRAS.some((p) => ventana.includes(p)) });
    }
  }
  // Agrupa valores a menos de 0,5% entre sí.
  const grupos = [];
  for (const c of candidatos) {
    const g = grupos.find((x) => Math.abs(x.valor / c.valor - 1) < 0.005);
    if (g) g.items.push(c); else grupos.push({ valor: c.valor, items: [c] });
  }
  return { grupos, lineasConMencion, descartadas };
}

// La fecha de la COLUMNA en la que está la cotización `item` (de fxDeclarado), o null. Estricto a propósito: una versión anterior que
// aceptaba años sueltos y frases se equivocó en 4 de 17 documentos (Fluminense 2022, Argentinos 2019, Racing 2012, San Lorenzo 2015).
//   - la línea de la cotización tiene que ser una FILA DE TABLA: 2+ números con decimales separados por 2+ espacios o por "|" (no una
//     frase como "fue de $18.0012 y $20.7862 al 31 de diciembre de 2025 y 2024");
//   - hasta 8 líneas arriba, la primera línea con 2+ FECHAS COMPLETAS (día, mes y año: 31-12-2025, 31/12/2025, 2025-12-31, "31 de diciembre
//     de 2025") es el encabezado; tiene que tener exactamente tantas fechas como números con decimales tiene la fila, y no repetir fechas;
//   - entonces la k-ésima fecha es la de la k-ésima columna.
const MESES_FX = { enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
function fechasDe(linea) {
  const out = []; const t = norm(linea);
  for (const m of t.matchAll(/\b(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})\b|\b(\d{4})-(\d{2})-(\d{2})\b|\b(\d{1,2}) (?:de )?([a-z]+),? (?:de |del )?(?:ano )?(\d{4})\b/g)) {
    if (m[3]) out.push(`${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`);
    else if (m[4]) out.push(`${m[4]}-${m[5]}-${m[6]}`);
    else if (MESES_FX[m[8]]) out.push(`${m[9]}-${String(MESES_FX[m[8]]).padStart(2, '0')}-${String(m[7]).padStart(2, '0')}`);
  }
  return out;
}
function fechaDeColumna(md, item) {
  const L = md.split('\n'); const i = item.linea - 1; const fila = L[i] || '';
  const nums = numerosDe(fila).filter(({ raw }) => /[.,]\d{1,4}$/.test(raw));
  const enColumnas = fila.includes('|') || nums.every(({ raw }) => new RegExp(`(\\s{2,}|^)${raw.replace(/[.]/g, '\\.')}(\\s{2,}|$)`).test(fila));
  if (nums.length < 2 || !enColumnas) return null;
  const k = nums.findIndex(({ raw }) => raw === item.raw);
  if (k < 0) return null;
  for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
    const f = fechasDe(L[j]);
    if (f.length >= 2) return f.length === nums.length && new Set(f).size === f.length ? f[k] : null;
  }
  return null;
}

// Series locales de tools/fx-reference/ (las mismas que lee tools/lookup-fx-close.js).
const SERIES_FX = { ARS: 'ars-usd.json', BRL: 'brl-usd.json', COP: 'cop-usd.json', NOK: 'nok-usd.json', CZK: 'czk-usd.json', CHF: 'chf-usd.json', TRY: 'try-usd.json', RUB: 'rub-usd.json', UAH: 'uah-usd.json', KRW: 'krw-usd.json', CLP: 'clp-usd.json', EUR: 'eur-usd.json', DKK: 'dkk-usd.json', GBP: 'gbp-usd.json' };
const FUENTE_SERIE = { ARS: 'Dólar mayorista BCRA', BRL: 'PTAX de cierre (venda) del Banco Central do Brasil', COP: 'TRM oficial (Banco de la República / Superfinanciera de Colombia)',
  NOK: 'Tipo medio de referencia de Norges Bank', CZK: 'Fixing del Česká národní banka', CHF: 'Noon buying rate de Nueva York (Reserva Federal, H.10)',
  TRY: 'Döviz alış del TCMB', RUB: 'Tipo oficial del Banco de Rusia', UAH: 'Tipo oficial del Banco Nacional de Ucrania', KRW: 'Noon buying rate de Nueva York (Reserva Federal, H.10)', CLP: 'Dólar observado (Banco Central de Chile, publicado por el SII)',
  EUR: 'Tipo de referencia del Banco Central Europeo', DKK: 'Tipo oficial de Danmarks Nationalbank', GBP: 'Tipo spot del Bank of England' };
// Monedas cuya cotización de un cierre es la del PRIMER día con dato POSTERIOR (la serie publica el valor de un día al día siguiente). Mismo
// criterio que `diaCierre: 'siguiente'` en tools/lookup-fx-close.js (Versión 339; verificado para CLP contra los cierres declarados de UC y
// Palestino). Si se agrega otra moneda con esa convención, va en los dos lugares.
const FX_DIA_SIGUIENTE = new Set(['CLP']);
function fxDeSerie(moneda, fecha) {
  const f = SERIES_FX[moneda];
  if (!f) return { error: `sin serie local para ${moneda} (hoy solo ${Object.keys(SERIES_FX).join(', ')})` };
  const p = resolve(ROOT, 'tools/fx-reference', f);
  if (!existsSync(p)) return { error: `no existe tools/fx-reference/${f}` };
  const data = JSON.parse(readFileSync(p, 'utf8'));
  if (fecha < data.rangeFrom || fecha > data.rangeTo) return { error: `${fecha} fuera del rango bajado (${data.rangeFrom} a ${data.rangeTo})` };
  if (FX_DIA_SIGUIENTE.has(moneda)) {
    const d = new Date(fecha + 'T00:00:00Z');
    for (let i = 0; i < 10; i++) { d.setUTCDate(d.getUTCDate() + 1); const c = d.toISOString().slice(0, 10); if (c in data.series) return { fx: data.series[c], fecha: c, exacto: false }; }
    return { error: 'sin cotización en los 10 días siguientes al cierre' };
  }
  if (fecha in data.series) return { fx: data.series[fecha], fecha, exacto: true };
  const d = new Date(fecha + 'T00:00:00Z');
  for (let i = 0; i < 10; i++) {
    d.setUTCDate(d.getUTCDate() - 1);
    const c = d.toISOString().slice(0, 10);
    if (c in data.series) return { fx: data.series[c], fecha: c, exacto: false };
  }
  return { error: 'sin cotización ni en los 10 días hábiles anteriores' };
}

// Nombre legal: línea con un token del nombre del club + una forma societaria.
function nombreLegal(md, displayName) {
  const tokens = norm(displayName).split(/[^a-z0-9]+/).filter((t) => t.length >= 4);
  if (!tokens.length) return null;
  const formas = FORMAS.join('|');
  const re = new RegExp(`([A-Za-zÀ-ÿĀ-žΑ-ωА-я0-9][^\\n|#*]{2,110}?(?<![A-Za-z])(?:${formas}))(?![A-Za-z])`, 'gi');
  const cuenta = {};
  for (const lineaCruda of md.split('\n').slice(0, 4000)) {
    const linea = lineaCruda.replace(/[*_#>|]/g, ' ').replace(/\s+/g, ' ').trim();
    if (linea.length > 300) continue;
    const ln = norm(linea);
    if (!tokens.some((t) => ln.includes(t))) continue;
    for (const m of linea.matchAll(re)) {
      let s = m[1].trim().replace(/^[\d.)\-–:\s]+/, '');
      // Se queda con el tramo que arranca en el primer token del club (o una palabra antes).
      const nl = norm(s);
      const idx = Math.min(...tokens.map((t) => nl.indexOf(t)).filter((x) => x >= 0));
      if (!Number.isFinite(idx)) continue;
      const antes = s.slice(0, idx).trim().split(/\s+/);
      const prefijo = antes.length && antes[antes.length - 1] && antes[antes.length - 1].length <= 12 && /^[A-ZÀ-ÝΑ-ΩА-Я0-9]/.test(antes[antes.length - 1]) ? antes[antes.length - 1] + ' ' : '';
      s = (prefijo + s.slice(idx)).trim();
      if (s.length < 4 || s.length > 90) continue;
      cuenta[s] = (cuenta[s] || 0) + 1;
    }
  }
  const orden = Object.entries(cuenta).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  return orden.length ? { nombre: orden[0][0], veces: orden[0][1], otros: orden.slice(1, 4).map(([k, v]) => `${k} (${v})`) } : null;
}

// ============================================================================
// EL ANÁLISIS DE UN DOCUMENTO
// ============================================================================
// `ov` (overrides): respuestas que Claude por API ya dio CON CITA VERIFICADA (tools/alta-claude.mjs), para
// volver a correr el análisis con esos valores en lugar de la pregunta. Cada una es { valor, fuente }:
//   ov.cierre 'AAAA-MM-DD' · ov.reportType · ov.perimetro · ov.moneda · ov.sport · ov.name · ov.fx (número)
// Solo se aplican las que DESBLOQUEAN sin decidir nada de producto (ver aplicables() más abajo).
export function analizar(docArg, sitio, ov = {}) {
  // Relativo a donde se corre el comando, o a la raíz del proyecto.
  const abs = existsSync(resolve(process.cwd(), docArg)) ? resolve(process.cwd(), docArg) : resolve(ROOT, docArg);
  const ext = extname(abs).toLowerCase();
  const pdf = ext === '.pdf' ? abs : abs.replace(/\.md$/i, '.pdf');
  const mdPath = ext === '.md' ? abs : abs.replace(/\.pdf$/i, '.md');
  const r = { documento: rel(abs), pdf: existsSync(pdf) ? rel(pdf) : null, md: existsSync(mdPath) ? rel(mdPath) : null, club: {}, campos: [], ejercicio: { campos: [] }, avisos: [] };
  const partes = relative(resolve(ROOT, 'Clubes'), abs).split('/');
  if (partes.length < 3 || partes[0].startsWith('..')) { r.error = 'el documento no está en Clubes/<País>/<Club>/'; return r; }
  const [paisCarpeta, clubCarpeta] = partes;
  r.carpeta = `Clubes/${paisCarpeta}/${clubCarpeta}/`;
  if (clubCarpeta.startsWith('_')) { r.error = `"${clubCarpeta}" es una carpeta de agregado (empieza con "_"), no un club`; return r; }
  if (!r.md) { r.error = 'no hay .md: transcribir primero (tools/onboard.mjs --transcribe-only o mistral-ocr-transcribe.mjs)'; return r; }
  const md = readFileSync(mdPath, 'utf8');
  const mdNorm = norm(md);
  const pais = PAISES[paisCarpeta];

  // ---------------------------------------------------------------- ¿ya existe?
  // UNA sola regla en todo el proyecto (tools/carpetas-clubes.mjs, 2026-09-30): cita en algún
  // data/<id>-data.js -> ese club; si no, nombre IGUAL a un club del mismo país; si no, club nuevo.
  // Hasta la Versión 309 este script tenía su propia versión (mapa de citas + `onboard.mjs --quien` +
  // desempate por país) y onboard.mjs otra distinta: dos reglas que podían dar respuestas distintas
  // para la misma carpeta. Ahora las dos (y audit.js, que vigila que la regla sea inequívoca) usan esta.
  const res = clubDeCarpeta(paisCarpeta, clubCarpeta);
  let existente = null;
  if (res.clubId) existente = { clubId: res.clubId, fuente: `tools/carpetas-clubes.mjs (${res.via}: ${res.fuente})` };
  else if (res.via === 'ambigua') r.avisos.push(`tools/carpetas-clubes.mjs no puede decidir a qué club corresponde ${r.carpeta} (${res.fuente}): se analiza como club nuevo, pero audit.js da P1 hasta que se resuelva.`);
  r.resolucion = { via: res.via, clubId: res.clubId || null, ids: res.ids || undefined };
  r.club = existente ? { existe: true, ...existente } : { existe: false };

  // ---------------------------------------------------------------- año y cierre
  const nombreArchivo = basename(abs);
  const anioNombre = ANIO_FORZADO || anioDelNombre(nombreArchivo);
  const cierreTxt = cierreDelTexto(md);
  const cierreNom = cierreDelNombre(basename(abs, extname(abs)));
  let mesCierre = null; let fuenteCierre = null; let estadoCierre = 'ok'; let preguntaCierre = null;
  // Un estado INTERMEDIO (semestral al 30/6 de un club que cierra el 31/12: Palestino 2018) no dice
  // nada del cierre del ejercicio: en ese caso el mes sale de los demás documentos o del país.
  const nIntermedio = contar(norm(md.slice(0, 20000)), INTERMEDIO_RE);
  const esIntermedio = nIntermedio >= 2 || /semi-annual|semiannual|interim|intermedi|trimestr|quarter|ene-jun/.test(norm(nombreArchivo));
  if (esIntermedio) r.avisos.push(`El documento parece un estado INTERMEDIO (${nIntermedio} señales en el texto): su fecha no se usa para decidir el cierre del ejercicio del club.`);
  if (esIntermedio) { /* se decide abajo, con los demás .md del club o el patrón del país */ }
  else if (cierreNom && cierreTxt && cierreTxt.mes === cierreNom.mes) { mesCierre = cierreNom.mes; fuenteCierre = `nombre del archivo (${cierreNom.fecha}) y contenido del .md (${cierreTxt.n} de ${cierreTxt.total} fechas de fin de mes)`; }
  else if (cierreNom && (!cierreTxt || cierreTxt.share < 0.6)) { mesCierre = cierreNom.mes; fuenteCierre = `nombre del archivo (${cierreNom.fecha})`; }
  else if (cierreTxt && ((cierreTxt.n >= 3 && cierreTxt.share >= 0.6) || (cierreTxt.n >= 2 && cierreTxt.share === 1))) { mesCierre = cierreTxt.mes; fuenteCierre = `contenido del .md (${cierreTxt.n} de ${cierreTxt.total} fechas de fin de mes caen en el mes ${cierreTxt.mes})`; if (cierreNom && cierreNom.mes !== cierreTxt.mes) { estadoCierre = 'pregunta'; preguntaCierre = `El nombre del archivo dice cierre ${cierreNom.fecha}, pero el contenido cierra en el mes ${cierreTxt.mes}. ¿Cuál es el cierre de este ejercicio?`; } }

  // El resto de los .md del club, para ver si el cierre cambió en el tiempo.
  const dirClub = resolve(ROOT, 'Clubes', paisCarpeta, clubCarpeta);
  const hermanos = [];
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) { walk(f); continue; }
      if (!/\.md$/i.test(e) || /\.(previo-[a-z]+|gemini-check|claude-check|mistral-redo|t-[a-z]+)\.md$/i.test(e) || /^readme/i.test(e)) continue;
      hermanos.push(f);
    }
  })(dirClub);
  r.mdsCarpeta = hermanos.map(rel).sort();
  const cierresClub = [];
  for (const h of hermanos) {
    if (NO_BALANCE.test(norm(basename(h)))) continue;
    const t = h === mdPath ? md : readFileSync(h, 'utf8');
    if (contar(norm(t.slice(0, 20000)), INTERMEDIO_RE) >= 2) continue;
    const c = cierreDelTexto(t); const cn = cierreDelNombre(basename(h, '.md'));
    const mes = cn ? cn.mes : (c && c.n >= 3 && c.share >= 0.6 ? c.mes : null);
    const anio = anioDelNombre(basename(h)) || (c && c.anio);
    if (mes && anio) cierresClub.push({ archivo: basename(h), mes, anio });
  }
  if (!mesCierre) {
    const porMes = {};
    for (const c of cierresClub) porMes[c.mes] = (porMes[c.mes] || 0) + 1;
    const orden = Object.entries(porMes).sort((a, b) => b[1] - a[1]);
    if (orden.length === 1 || (orden.length && orden[0][1] >= 0.8 * cierresClub.length && cierresClub.length >= 2)) {
      mesCierre = +orden[0][0]; fuenteCierre = `los demás .md del club (${orden[0][1]} de ${cierresClub.length} documentos cierran en el mes ${orden[0][0]}); este documento no alcanza solo`;
    }
  }
  let fuentePatronPais = null;
  if (!mesCierre && pais && pais.iso2) {
    const delPais = Object.values(sitio.clubs).filter((c) => c.country === pais.iso2).map((c) => c.fiscalYearStart);
    const unicos = [...new Set(delPais)];
    if (delPais.length >= 2 && unicos.length === 1) {
      const [mm] = unicos[0].split('-').map(Number);
      mesCierre = mm === 1 ? 12 : mm - 1;
      fuentePatronPais = `patrón del país: los ${delPais.length} clubes de ${pais.iso2} ya cargados arrancan el ${unicos[0]} (el documento no trae fechas de cierre legibles)`;
      fuenteCierre = fuentePatronPais;
    }
  }
  // El año de cierre del contenido, para confirmar el del nombre.
  let anio = anioNombre;
  let estadoAnio = 'ok'; let fuenteAnio = ANIO_FORZADO ? '--anio' : 'nombre del archivo (misma regla que onboard.mjs --quien)';
  let preguntaAnio = null;
  // Solo se contradice al nombre del archivo con evidencia FUERTE del contenido (3+ fechas de
  // cierre, 60%+ en el mismo mes): un balance que dice una sola vez "31 de dezembro de 2023 e
  // 2024" no alcanza para decir que el archivo está mal nombrado.
  const contenidoFuerte = cierreTxt && cierreTxt.n >= 3 && cierreTxt.share >= 0.6;
  if (cierreTxt && mesCierre && cierreTxt.mes === mesCierre && (contenidoFuerte || !anio)) {
    if (!anio) { anio = cierreTxt.anio; fuenteAnio = 'contenido del .md (año más nuevo con fecha de cierre)'; }
    else if (cierreTxt.anio === anio) fuenteAnio += ', confirmado por las fechas de cierre del .md';
    else if (!ANIO_FORZADO) {
      const aniosTxt = Object.keys(cierreTxt.porMes).length ? fechasFinDeMes(md).filter((f) => f.mes === mesCierre).map((f) => f.anio) : [];
      if (aniosTxt.includes(anio)) fuenteAnio += `, presente en el .md (el año más citado con fecha de cierre es ${cierreTxt.anio})`;
      else { estadoAnio = 'pregunta'; preguntaAnio = `El nombre del archivo sugiere el ejercicio ${anio}, pero las fechas de cierre del documento son de ${cierreTxt.anio}. ¿Qué ejercicio es?`; }
    }
  }
  if (!anio) { estadoAnio = 'pregunta'; preguntaAnio = 'No se pudo determinar el año del ejercicio (ni por el nombre del archivo ni por el contenido). Pasar --anio.'; }
  if (ov.cierre) {
    // Claude leyó la fecha de cierre en el documento y el script verificó la cita: gana sobre el nombre
    // del archivo y sobre el conteo de fechas (que es justo lo que no alcanzó).
    const [yy, mm] = ov.cierre.valor.split('-').map(Number);
    anio = yy; mesCierre = mm; estadoAnio = 'ok'; preguntaAnio = null; estadoCierre = 'ok'; preguntaCierre = null;
    fuenteAnio = fuenteCierre = `claude-api con cita verificada: ${ov.cierre.fuente}`; fuentePatronPais = null;
  }
  const cierre = anio && mesCierre ? `${anio}-${pad2(mesCierre)}-${pad2(ultimoDia(anio, mesCierre))}` : null;
  const fiscalYearStart = mesCierre ? `${pad2(mesCierre === 12 ? 1 : mesCierre + 1)}-01` : null;

  // ---------------------------------------------------------------- moneda del ejercicio
  let moneda = pais ? pais.moneda : null;
  let estadoMoneda = 'ok'; let fuenteMoneda = pais ? `moneda de curso legal de ${paisCarpeta} (tabla PAISES de alta-club.mjs)` : null; let preguntaMoneda = null;
  if (!pais) { estadoMoneda = 'pregunta'; preguntaMoneda = `País "${paisCarpeta}" sin entrada en la tabla PAISES de tools/alta-club.mjs: ¿qué ISO2 y qué moneda?`; }
  else if (pais.preguntaMoneda) { estadoMoneda = 'pregunta'; preguntaMoneda = pais.preguntaMoneda; }
  else if (pais.legado && anio && anio < pais.legado.desde) {
    const nLeg = pais.legado.tokens.reduce((s, t) => s + contar(mdNorm, new RegExp(`(?<![a-z])${t.replace(/\./g, '\\.')}(?![a-z])`, 'g')), 0);
    const nAct = menciones(mdNorm, pais.moneda);
    if (nAct >= 5 && nAct > 3 * nLeg) { fuenteMoneda += `; ejercicio ${anio} anterior a ${pais.legado.desde}, pero el documento ya habla en ${pais.moneda} (${nAct} menciones contra ${nLeg} de ${pais.legado.codigo})`; }
    else { estadoMoneda = 'pregunta'; moneda = pais.legado.codigo; preguntaMoneda = `El ejercicio ${anio} es anterior a ${pais.legado.desde}: el documento puede estar en ${pais.legado.codigo} (${nLeg} menciones de la moneda vieja, ${nAct} de ${pais.moneda}). El sitio no tiene ninguna moneda "legado" cargada: ¿se carga en ${pais.legado.codigo} (con su fx a USD de ese cierre) o se convierte a ${pais.moneda} a la paridad fija?`; }
  } else if (moneda && moneda !== 'USD') {
    const nPropia = menciones(mdNorm, moneda);
    const otras = Object.keys(MONEDAS).filter((c) => c !== moneda && c !== 'USD' && !MONEDAS[c].tokens.includes('\\$')).map((c) => [c, menciones(mdNorm, c)]).sort((a, b) => b[1] - a[1]);
    if (nPropia === 0 && otras[0] && otras[0][1] >= 10) { estadoMoneda = 'pregunta'; preguntaMoneda = `El documento no nombra nunca ${moneda} y nombra ${otras[0][0]} ${otras[0][1]} veces: ¿en qué moneda está?`; }
    else if (nPropia === 0) r.avisos.push(`El documento no nombra la moneda (${moneda}) en ningún lado reconocible: se asume la del país.`);
  }

  // ---------------------------------------------------------------- deporte
  // "football" en inglés también es el de la NFL ("National Football League"), y "cricket" aparece
  // en el nombre legal del Genoa ("Genoa Cricket and Football Club"): esas frases no cuentan para
  // ningún lado.
  // Tampoco cuenta "Football Club": los clubes de rugby ingleses se llaman así ("Harlequin Football
  // Club Limited", "Leicester Football Club plc") — bug real de la primera versión.
  const nAmbiguo = contar(mdNorm, /national football league|american football|football club/g);
  const nGenoa = contar(mdNorm, /cricket\s*(and|&|e)\s*football/g);
  const nFutbol = contar(mdNorm, FUTBOL_RE) - nAmbiguo - nGenoa + contar(norm(clubCarpeta), FUTBOL_RE);
  const otros = Object.entries(DEPORTES_OTROS).map(([k, re]) => [k, contar(mdNorm, re) - (k === 'cricket' ? nGenoa : 0) + 3 * contar(norm(clubCarpeta), re)]).sort((a, b) => b[1] - a[1]);
  let deporte = otros[0][1] >= 3 && otros[0][1] >= nFutbol ? otros[0][0] : 'futbol';
  const fuenteDeporteClaude = ov.sport && ov.sport.valor === 'futbol' && deporte !== 'futbol' ? `claude-api con cita verificada: ${ov.sport.fuente}` : null;
  if (fuenteDeporteClaude) deporte = 'futbol';

  // ---------------------------------------------------------------- campos del club
  if (!r.club.existe) {
    const displayName = clubCarpeta.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
    if (displayName !== clubCarpeta) r.avisos.push(`La carpeta "${clubCarpeta}" tiene un paréntesis: se usó "${displayName}" como nombre corto.`);
    // id
    const base = slug(displayName);
    const iso = pais && pais.iso2 ? pais.iso2.toLowerCase() : 'xx';
    const id = `${base}-${iso}`;
    if (!pais || !pais.iso2) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: pais && pais.pregunta ? pais.pregunta : `País "${paisCarpeta}" sin ISO2: ¿qué sufijo lleva el id?` }));
    else if (sitio.clubs[id]) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: `El id '${id}' ya existe en data/clubs.js (${sitio.clubs[id].name}) y ninguna señal dice que sea este club. ¿Es el mismo club (y la carpeta se llama distinto) o hace falta otro id?` }));
    else if (sitio.clubs[base]) r.campos.push(campo('id', id, 'slug del nombre de la carpeta + país', 'pregunta', { pregunta: `El id base '${base}' es un id HEREDADO sin país (${sitio.clubs[base].name}, ${sitio.clubs[base].country}). Admin/CONVENCIONES.md (Versión 129): el día que entra un homónimo de otro país hay que renombrar el viejo a '${base}-${String(sitio.clubs[base].country).toLowerCase()}' (su archivo, su clubId y cada sourceId). ¿Se renombra ahora?` }));
    else r.campos.push(campo('id', id, `slug de "${displayName}" + '-${iso}' (convención de clubId, Admin/CONVENCIONES.md Versión 129)`));
    // name
    const nl = nombreLegal(md, displayName);
    if (ov.name) r.campos.push(campo('name', ov.name.valor, `claude-api con cita verificada: ${ov.name.fuente}`));
    else if (nl && nl.veces >= 2) r.campos.push(campo('name', nl.nombre, `el .md, ${nl.veces} veces (nombre del club + forma societaria)`, 'ok', nl.otros.length ? { nota: `otras formas vistas: ${nl.otros.join('; ')}` } : {}));
    else r.campos.push(campo('name', displayName, nl ? `candidato visto 1 sola vez en el .md: "${nl.nombre}"` : 'no se encontró el nombre legal en el .md; se usa el nombre de la carpeta', 'pendiente', { nota: 'name es el nombre legal completo (pestaña Fuentes); completarlo cuando alguien mire el documento, no bloquea el alta' }));
    r.campos.push(campo('displayName', displayName, 'nombre de la carpeta del club en Clubes/'));
    r.campos.push(campo('country', pais ? pais.iso2 : null, pais ? `carpeta de país "${paisCarpeta}" (tabla PAISES)` : null, pais && pais.iso2 ? 'ok' : 'pregunta', pais && pais.iso2 ? {} : { pregunta: pais && pais.pregunta ? pais.pregunta : `País "${paisCarpeta}" sin entrada en la tabla PAISES.` }));
    // reportingCurrency: la de HOY del país (el ejercicio puede tener otra, ver ejercicio.currency)
    const repCur = pais ? pais.moneda : null;
    r.campos.push(campo('reportingCurrency', repCur, pais ? `moneda de curso legal de ${paisCarpeta}` : null, repCur ? 'ok' : 'pregunta', repCur ? {} : { pregunta: (pais && pais.preguntaMoneda) || `¿En qué moneda reporta el club?` }));
    // fiscalYearStart
    const cambios = [...new Set(cierresClub.map((c) => c.mes))];
    if (fiscalYearStart) {
      let valor = fiscalYearStart; let fuente = `cierre del ejercicio: ${fuenteCierre}`; let estado = estadoCierre === 'pregunta' ? 'pregunta' : 'ok'; const extra = {};
      if (estadoCierre === 'pregunta') extra.pregunta = preguntaCierre;
      if (cambios.length > 1) {
        const masReciente = cierresClub.slice().sort((a, b) => b.anio - a.anio)[0];
        const detalle = cambios.map((m) => `mes ${m}: ${cierresClub.filter((c) => c.mes === m).map((c) => c.anio).sort().join(',')}`).join(' / ');
        valor = `${pad2(masReciente.mes === 12 ? 1 : masReciente.mes + 1)}-01`;
        fuente = `el documento más reciente del club (${masReciente.archivo}, cierre mes ${masReciente.mes}): el cierre CAMBIÓ en el tiempo (${detalle}); clubs.js lleva el vigente, criterio de Racing (31/8 hasta 2021, 30/6 después)`;
        r.avisos.push(`El cierre del ejercicio cambió en el tiempo (${detalle}). Los ejercicios con el cierre viejo necesitan su propio fx a SU fecha de cierre.`);
      }
      if (fuentePatronPais && estado === 'ok') extra.nota = 'sale del patrón del país, no del documento';
      r.campos.push(campo('fiscalYearStart', valor, fuente, estado, extra));
    } else {
      r.campos.push(campo('fiscalYearStart', null, 'ni el documento, ni los demás .md del club, ni el patrón del país alcanzan', 'pregunta', { pregunta: `¿En qué fecha cierra el ejercicio de ${displayName}? El .md no trae fechas de cierre suficientes${cierreTxt ? ` (${cierreTxt.total} fecha(s) de fin de mes en todo el texto; la más frecuente, mes ${cierreTxt.mes}, ${cierreTxt.n} vez/veces)` : ' (ninguna fecha de fin de mes reconocible)'}, los demás documentos del club tampoco, y no hay clubes del país ya cargados de los que tomar el patrón.` }));
    }
    // sport
    if (deporte === 'futbol') r.campos.push(campo('sport', 'futbol', fuenteDeporteClaude || `el .md nombra el fútbol ${nFutbol} veces y ningún otro deporte más que eso`));
    else r.campos.push(campo('sport', deporte, `el .md nombra "${deporte}" ${otros[0][1]} veces y el fútbol ${nFutbol}`, 'pregunta', { pregunta: `El documento parece de ${deporte}, no de fútbol. El catálogo de data/leagues.js tiene ese deporte inactivo (o no lo tiene). ¿Se da de alta igual (y con qué liga), o queda fuera del sitio por ahora?` }));
    // brandColor: nunca lo decide el script
    const candidatos = candidatosColor(displayName);
    r.campos.push(campo('brandColor', undefined, candidatos.length ? `tools/brand-color-reference/ (footylogos): ${candidatos.map((c) => `[${c.liga}] ${c.name}: ${c.swatches.slice(0, 4).map((s) => s.hex + ' ' + s.label.replace(/ #.*/, '')).join(', ')}`).join(' | ')}` : 'la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)', 'pendiente', { nota: 'el campo queda AUSENTE (= nadie lo chequeó, P3 club-sin-color-ni-null). La decisión es identidad primero (¿de qué color es la camiseta?, Wikipedia del país) y hex después, club-or-year-onboarding §3 1b: no la toma un script. NUNCA escribir null sin haberlo mirado.' }));
  }

  // ---------------------------------------------------------------- campos del ejercicio
  const clubId = r.club.existe ? r.club.clubId : (r.campos.find((c) => c.campo === 'id') || {}).valor;
  const E = r.ejercicio.campos;
  r.ejercicio.anio = anio; r.ejercicio.cierre = cierre;
  E.push(campo('anio', anio, fuenteAnio, estadoAnio, preguntaAnio ? { pregunta: preguntaAnio } : {}));
  E.push(campo('cierre', cierre, cierre ? `año del ejercicio + mes de cierre (${fuenteCierre})` : null, cierre ? (estadoCierre === 'pregunta' ? 'pregunta' : 'ok') : 'pregunta', cierre ? (preguntaCierre ? { pregunta: preguntaCierre } : {}) : { pregunta: 'No se pudo determinar la fecha de cierre del ejercicio.' }));

  // Tipo de documento
  const nomNorm = norm(nombreArchivo);
  const STATEMENT = /resultado|recursos y gastos|income statement|profit and loss|profit or loss|comprehensive income|statement of operations|statement of financial position|conto economico|resultatregnskap|resultatopgorelse|resultatenrekening|winst-en-verliesrekening|compte de resultat|gewinn- ?und verlust|erfolgsrechnung|racun dobiti|dobiti i gubitka|demonstrac(ao|oes) d[oe]s? result|demonstracoes (financeiras|contabeis)|balanc[oe]s? patrimon|αποτελεσματ|gelir tablosu|kar veya zarar|finansal durum|vykaz zisku|vysledovka|rozvaha|финансовых результат|бухгалтерск\S* баланс|фінансові результати|фінансовии результат|фінансовии стан|сукупнии дохід|손익계산서|재무상태표|利润表|资产负债表|損益計算書|balance sheet|estado de situacion|estados? de resultados|stato patrimoniale|jahresabschluss|jaarrekening|jaarcijfers|aarsregnskap|arsregnskap|arsrapport|aarsrapport|bilancio|bilanco|financijsko izvjesce|financni izkaz/;
  const esPresupuesto = /presupuesto|orcamento|budget|previsional/.test(nomNorm);
  // Un informe de auditoría o una memoria NOMBRAN los estados contables sin traerlos: además de la
  // palabra, hacen falta filas con números: filas de tabla Markdown con 2+ celdas numéricas, o
  // (transcripciones viejas, sin tablas Markdown) líneas con 2+ montos con separador de miles.
  const lineasMd = md.split('\n');
  const filasPipe = lineasMd.filter((l) => l.trim().startsWith('|') && (l.match(/\|\s*\(?-?\s*\d[\d.,\s]*\)?\s*(?=\|)/g) || []).length >= 2).length;
  const filasMontos = lineasMd.filter((l) => (l.match(/(?<![\d.,])\(?-?\d{1,3}(?:[.,   ]\d{3})+(?:[.,]\d{1,2})?\)?(?![\d])/g) || []).length >= 2).length;
  const filasNumericas = Math.max(filasPipe, filasMontos);
  const tieneEstado = (STATEMENT.test(mdNorm) || STATEMENT.test(nomNorm)) && filasNumericas >= 10;
  let reportType = 'official_balance_sheet'; let estadoRT = 'ok'; let fuenteRT = 'el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo'; let preguntaRT = null;
  if (esPresupuesto) { reportType = 'official_budget'; estadoRT = 'pregunta'; fuenteRT = 'nombre del archivo'; preguntaRT = 'El documento parece un PRESUPUESTO: se carga como official_budget y el tipo de cambio es la premisa del propio presupuesto (document_assumption), no un cierre. ¿Confirmar que es un presupuesto y cuál es su premisa de tipo de cambio?'; }
  else if (esIntermedio) { estadoRT = 'pregunta'; fuenteRT = `el documento parece un estado intermedio (${nIntermedio} señales en el texto: semestral, seis meses, interim...)`; preguntaRT = 'El documento parece un estado financiero INTERMEDIO, no el anual: el sitio carga ejercicios completos. ¿Es así (y hay que buscar el anual), o es el anual de un ejercicio corto?'; }
  else if (NO_BALANCE.test(nomNorm)) { estadoRT = 'pregunta'; fuenteRT = 'nombre del archivo'; preguntaRT = `El nombre del archivo ("${nombreArchivo}") sugiere que no es un estado contable anual (acta, informe intermedio, memoria, dictamen...). ¿Trae un estado de resultados anual cargable, o es un documento de contexto?`; }
  else if (!tieneEstado) { estadoRT = 'pregunta'; fuenteRT = filasNumericas < 10 ? `el .md casi no tiene tablas con números (${filasNumericas} filas numéricas): parece un informe/dictamen que nombra los estados sin traerlos` : 'el .md no tiene ninguna palabra de estado contable reconocible'; preguntaRT = '¿El documento trae un estado de resultados (o de recursos y gastos) anual cargable, o hay que buscar los estados en otro documento del club?'; }
  if (ov.reportType) { reportType = ov.reportType.valor; estadoRT = 'ok'; preguntaRT = null; fuenteRT = `claude-api con cita verificada: ${ov.reportType.fuente}`; }
  E.push(campo('reportType', reportType, fuenteRT, estadoRT, preguntaRT ? { pregunta: preguntaRT } : {}));

  // Perímetro: qué entidad es "el club"
  const CONSOL = /consolidad|consolidated|consolidato|geconsolideerd|konsolid|konzern|konsern|koncern|консолид|консолідов|ενοποιημεν|연결재무|合并|group accounts|consolide/g;
  const INDIV = /individual|separate financial statements|company only|standalone|stand-alone|enkelvoudig|selskapsregnskap|morselskap|einzelabschluss|η εταιρεια|bireysel|individuais|separado|별도재무|отдельн|bilancio d.esercizio|jahresabschluss der/g;
  const nCons = contar(mdNorm, CONSOL); const nInd = contar(mdNorm, INDIV);
  // Dos entidades distintas en la carpeta para el mismo año (por los nombres de archivo)
  const ENTIDAD_TOK = new Set(['fli', 'as', 'asa', 'invest', 'fotballinvest', 'holding', 'group', 'groupe', 'plc', 'saf', 'associacao', 'clube', 'sad', 'spa', 'idrettslag', 'fotballklubb', 'consolidato', 'consolidado', 'consolidated', 'individual', 'konzern', 'club']);
  const toks = (f) => new Set(norm(basename(f, '.md')).split(/[^a-z0-9]+/).filter((t) => t && !/^\d+$/.test(t)));
  const esteToks = toks(mdPath);
  const mismoAnio = hermanos.filter((h) => h !== mdPath && anioDelNombre(basename(h)) === anio);
  const otraEntidad = mismoAnio.find((h) => { const t = toks(h); const dif = [...t].filter((x) => !esteToks.has(x)).concat([...esteToks].filter((x) => !t.has(x))); return dif.some((x) => ENTIDAD_TOK.has(x)); });
  let estadoPer = 'ok'; let valorPer = 'individual'; let fuentePer = `el .md no presenta estados consolidados (${nCons} menciones de "consolidado")`; let preguntaPer = null;
  const sugerencia = 'Criterio usado hasta ahora (Boca, Racing, Panathinaikos): la entidad INDIVIDUAL del club, no el grupo, porque el consolidado puede sumar negocio de subsidiarias no futbolístico — pero hay excepciones (el fútbol en una subsidiaria, una SAD/SAF que es la que juega).';
  if (otraEntidad) {
    estadoPer = 'pregunta'; valorPer = null; fuentePer = `la carpeta tiene otro documento del mismo ejercicio de otra entidad: ${basename(otraEntidad)}`;
    preguntaPer = `En ${r.carpeta} hay documentos del ejercicio ${anio} de dos entidades distintas ("${basename(mdPath)}" y "${basename(otraEntidad)}"). ¿Cuál es "el club" para el sitio (asociación vs sociedad anónima, individual vs consolidado)? ${sugerencia}`;
  } else if (/individual|enkelvoudig|separate|individuais|einzel|standalone|company-only/.test(nomNorm)) {
    fuentePer = `el nombre del archivo dice que son los estados individuales ("${nombreArchivo}"), y no hay un consolidado del mismo ejercicio en la carpeta${nCons ? ` (el .md menciona el consolidado ${nCons} veces, como referencia)` : ''}`;
  } else if (nCons >= 3) {
    estadoPer = 'pregunta'; valorPer = null;
    fuentePer = `el .md menciona estados consolidados ${nCons} veces${nInd ? ` y los individuales ${nInd}` : ''}`;
    preguntaPer = nInd >= 2
      ? `El documento trae estados CONSOLIDADOS y también individuales/de la sociedad (${nCons} vs ${nInd} menciones). ¿Qué columna se carga? ${sugerencia}`
      : `El documento parece ser solo del GRUPO consolidado (${nCons} menciones, ninguna de estados individuales). ¿El grupo es "el club", o hay que buscar los estados individuales de la sociedad que juega? ${sugerencia}`;
  }
  if (ov.perimetro && !otraEntidad) { valorPer = ov.perimetro.valor; estadoPer = 'ok'; preguntaPer = null; fuentePer = `claude-api con cita verificada: ${ov.perimetro.fuente}`; }
  E.push(campo('perimetro', valorPer, fuentePer, estadoPer, { ...(preguntaPer ? { pregunta: preguntaPer } : {}), ...(otraEntidad ? { dosEntidades: basename(otraEntidad) } : {}) }));

  // Moneda del ejercicio
  if (ov.moneda && pais && ov.moneda.valor === pais.moneda && estadoMoneda === 'pregunta') { moneda = pais.moneda; estadoMoneda = 'ok'; preguntaMoneda = null; fuenteMoneda = `claude-api con cita verificada: ${ov.moneda.fuente}`; }
  E.push(campo('currency', moneda, fuenteMoneda, estadoMoneda, preguntaMoneda ? { pregunta: preguntaMoneda } : {}));

  // Tipo de cambio
  const fxCampos = proponerFx(md, moneda, cierre, estadoMoneda, reportType, sitio, ov.fx, r.pdf ? ajusteDe(r.pdf, 'fx') : null);
  E.push(...fxCampos);

  // sourceId
  // Si el nombre del archivo ya arranca con el nombre del club ("SlaviaPraha_SL108_2019-06-30",
  // "Genoa-bilancio-..."), esas palabras se sacan para no repetir el club dos veces en el id.
  let tokensArchivo = slugGuion(basename(abs, extname(abs))).split('-').filter(Boolean);
  const baseClub = clubId ? clubId.replace(/-[a-z]{2}$/, '').replace(/-/g, '') : '';
  for (let k = 1; k <= Math.min(4, tokensArchivo.length - 1); k++) {
    if (tokensArchivo.slice(0, k).join('') === baseClub || tokensArchivo.slice(0, k).join('') === slug(clubCarpeta)) { tokensArchivo = tokensArchivo.slice(k); break; }
  }
  const sourceId = clubId ? `${clubId}-${tokensArchivo.join('-')}` : null;
  E.push(campo('sourceId', sourceId, 'clubId + nombre del archivo en slug'));

  // Liga
  E.push(proponerLiga(clubId, r.club.existe ? (sitio.clubs[clubId] || {}).displayName : clubCarpeta, pais, anio, sitio, cierre));

  // Contexto que el alta necesita escribir aparte (país/moneda nuevos)
  r.contexto = {
    paisNuevo: pais && pais.iso2 && !sitio.COUNTRIES[pais.iso2] ? { iso2: pais.iso2, name: NOMBRE_PAIS_ES[pais.iso2] || paisCarpeta, en: pais.en, flag: bandera(pais.iso2), region: pais.region } : null,
    monedaNueva: pais && pais.moneda && !sitio.CURRENCY_META[pais.moneda] && MONEDAS[pais.moneda] ? { codigo: pais.moneda, scale: MONEDAS[pais.moneda].scale, rango: MONEDAS[pais.moneda].rango } : null,
  };
  if (r.contexto.paisNuevo) r.avisos.push(`País nuevo para el sitio (${pais.iso2}): --escribir agrega su entrada en COUNTRIES (data/leagues.js) y su nombre en data/lang/en.js.`);
  if (r.contexto.monedaNueva) r.avisos.push(`Moneda nueva para el sitio (${pais.moneda}): --escribir agrega CURRENCY_META (scale ${MONEDAS[pais.moneda].scale}) y FX_PLAUSIBLE_RANGE [${MONEDAS[pais.moneda].rango.join(', ')}] en data/currency-map.js.`);

  // Cruces que no bloquean pero conviene ver.
  const perCampo = E.find((c) => c.campo === 'perimetro');
  const nameCampo = r.campos.find((c) => c.campo === 'name');
  if (perCampo && perCampo.estado === 'pregunta' && nameCampo) nameCampo.nota = `${nameCampo.nota ? nameCampo.nota + '. ' : ''}OJO: depende de la respuesta de perímetro (qué entidad es el club)`;
  if (mesCierre && pais && pais.iso2) {
    const fysPropio = `${pad2(mesCierre === 12 ? 1 : mesCierre + 1)}-01`;
    if (r.club.existe && sitio.clubs[clubId] && sitio.clubs[clubId].fiscalYearStart !== fysPropio) {
      r.avisos.push(`El documento cierra en el mes ${mesCierre} (ejercicio desde el ${fysPropio}) pero data/clubs.js dice fiscalYearStart '${sitio.clubs[clubId].fiscalYearStart}' para ${clubId}: o el cierre del club cambió (como Racing) o el documento no es lo que parece.`);
    }
    const delPais = [...new Set(Object.values(sitio.clubs).filter((c) => c.country === pais.iso2).map((c) => c.fiscalYearStart))];
    if (!r.club.existe && delPais.length === 1 && delPais[0] !== fysPropio && !fuentePatronPais) {
      r.avisos.push(`Todos los clubes de ${pais.iso2} ya cargados arrancan el ejercicio el ${delPais[0]} y este documento dice ${fysPropio}: no es un error necesariamente (Almagro, FC Midtjylland), pero vale mirarlo.`);
    }
  }

  // Resumen
  const todos = [...r.campos, ...E];
  const cnt = (e) => todos.filter((c) => c.estado === e).length;
  r.resumen = { campos: todos.length, ok: cnt('ok'), pregunta: cnt('pregunta'), pendiente: cnt('pendiente'), pctOk: Math.round((100 * cnt('ok')) / todos.length), bloqueaEscribir: cnt('pregunta') > 0 || r.club.existe };
  r.preguntas = todos.filter((c) => c.estado === 'pregunta').map((c) => ({ campo: c.campo, pregunta: c.pregunta }));
  return r;
}

function candidatosColor(displayName) {
  const dir = resolve(ROOT, 'tools/brand-color-reference');
  if (!existsSync(dir)) return [];
  const q = norm(displayName).replace(/[^a-z0-9]+/g, ' ').trim();
  const out = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const c of d.clubs || []) {
      const n = norm(c.name).replace(/[^a-z0-9]+/g, ' ').trim();
      if (n.includes(q) || norm(c.slug.replace(/-/g, ' ')).includes(q)) out.push({ liga: f.replace('.json', ''), ...c });
    }
  }
  if (ANOTAR_MISSES) runNode('tools/lookup-brand-color.js', [displayName, '--json']);
  return out;
}

function proponerFx(md, moneda, cierre, estadoMoneda, reportType, sitio, ovFx = null, ajFx = null) {
  const out = [];
  // ESCALÓN 0 (Versión 373): ajuste manual de Guido (tools/ajustes.mjs, campo `fx`, en moneda por 1 USD).
  if (ajFx && isFinite(Number(String(ajFx.valor).replace(',', '.')))) {
    out.push(campo('fx', Number(String(ajFx.valor).replace(',', '.')), `ajuste manual (Admin/ajustes-manuales.jsonl, ${ajFx.autor} ${ajFx.fecha}): ${ajFx.motivo}`, 'ok', { fxSource: 'manual' }));
    return out;
  }
  if (ovFx && moneda && moneda !== 'USD' && estadoMoneda !== 'pregunta' && reportType !== 'official_budget') {
    out.push(campo('fx', Number(ovFx.valor), `declarado por el documento (regla #0), leído por claude-api con cita verificada: ${ovFx.fuente}`, 'ok', { fxSource: 'document_close' }));
    return out;
  }
  if (!moneda || estadoMoneda === 'pregunta') {
    out.push(campo('fx', null, 'depende de la moneda del ejercicio, que es una pregunta abierta', 'pendiente'));
    return out;
  }
  if (moneda === 'USD') {
    out.push(campo('fx', null, 'el ejercicio está en USD: no hay nada que convertir (fx-ausente para USD es P2, ver audit.js)', 'ok'));
    return out;
  }
  if (!cierre) { out.push(campo('fx', null, 'sin fecha de cierre no hay tipo de cambio de cierre', 'pendiente')); return out; }
  const serie = fxDeSerie(moneda, cierre);
  const mercado = serie.fx || (sitio.FX_CLOSE[`${moneda}@${cierre}`] || {}).fx || null;
  const dec = fxDeclarado(md, moneda, mercado, cierre);
  if (reportType === 'official_budget') {
    out.push(campo('fx', dec.grupos && dec.grupos.length ? dec.grupos.map((g) => g.valor) : null, 'presupuesto: el tipo de cambio es la PREMISA que declara el propio documento (fxSource document_assumption)', 'pregunta', { pregunta: 'Presupuesto: ¿qué tipo de cambio asume el documento? (si declara dos puntos, se promedian — club-data-mapping §5 regla 3)' }));
    return out;
  }
  if (dec.grupos && dec.grupos.length) {
    const grupos = dec.grupos;
    const deCierre = grupos.filter((g) => g.items.some((i) => i.cierre));
    // VARIOS VALORES EN UNA TABLA (decisión de Guido, 2026-10-01): gana la columna con la fecha MÁS NUEVA. Caso real, UC 2025, línea 797:
    // "Dólar Estadounidense 907,13 996,48" debajo de "Conversiones a pesos chilenos 31-12-2025 31-12-2024": gana 907,13. Solo se usa si hay
    // más de un valor (con uno solo no cambia nada) y solo si la fila y el encabezado se corresponden uno a uno (ver fechaDeColumna); si no,
    // sigue como antes y termina en la pregunta (cola). Ver la medición en Admin/CHANGELOG.md, Versión 328.
    const conFecha = grupos.length > 1 ? grupos.flatMap((g) => g.items.map((i) => ({ g, f: fechaDeColumna(md, i) }))).filter((x) => x.f) : [];
    const fechas = [...new Set(conFecha.map((x) => x.f))].sort();
    const masNueva = fechas.length >= 2 ? conFecha.filter((x) => x.f === fechas[fechas.length - 1]) : [];
    const porFecha = masNueva.length && new Set(masNueva.map((x) => x.g)).size === 1 ? masNueva[0] : null;
    const elegido = grupos.length === 1 ? grupos[0] : porFecha ? porFecha.g : (deCierre.length === 1 ? deCierre[0] : null);
    const detalle = grupos.map((g) => `${g.valor} (línea ${g.items[0].linea}: "${g.items[0].texto}")`).join(' | ');
    if (elegido && !MONEDAS_A_LA_PAR.has(moneda)) {
      out.push(campo('fx', elegido.valor, `declarado por el documento, línea ${elegido.items[0].linea}: "${elegido.items[0].texto}"${grupos.length > 1 ? ` (elegido entre ${grupos.length} valores ${porFecha ? `por ser el de la fecha más nueva de la tabla, ${porFecha.f}` : 'por ser el de cierre'})` : ''}`, 'ok', { fxSource: 'document_close', nota: mercado ? `mercado ese día: ${mercado}` : undefined }));
    } else {
      out.push(campo('fx', grupos.map((g) => g.valor), `el documento declara ${grupos.length === 1 ? 'un tipo de cambio' : grupos.length + ' valores de tipo de cambio'} a USD: ${detalle}`, 'pregunta', {
        pregunta: MONEDAS_A_LA_PAR.has(moneda)
          ? `El documento declara un tipo de cambio con el dólar (${detalle}). En ${moneda} el número solo no dice el sentido: el sitio guarda "${moneda} por 1 USD" (~${MONEDAS[moneda].rango.join('-')}); si el documento escribió "USD por 1 ${moneda}" hay que invertirlo. ¿Cuál es el de CIERRE y en qué sentido está?`
          : `El documento declara varios tipos de cambio a USD (${detalle}). Regla #0: gana el de CIERRE que declara el documento. ¿Cuál es?`,
      }));
    }
    return out;
  }
  if (dec.lineasConMencion > 0) {
    // Menciona tipo de cambio y dólar con números, pero ninguno plausible (casi siempre un cuadro
    // de sensibilidad o de exposición en moneda extranjera, sin la cotización). No es un criterio:
    // es un dato a confirmar en el documento antes de la carga. Se propone igual la cotización de
    // mercado (abajo), marcada como provisoria.
    out.push(campo('fx', null, `el .md menciona tipo de cambio y dólar con números en ${dec.lineasConMencion} línea(s), pero ninguno es una cotización plausible${dec.descartadas?.length ? ` (descartadas por traer en su frase otra fecha que la del cierre: ${dec.descartadas.map((d) => `${d.valor}, línea ${d.linea}, ${d.fechas.join('/')}`).join('; ')})` : ''}`, 'pendiente', { nota: 'Regla #0: antes de cargar, confirmar en el documento que NO declara su propio tipo de cambio de cierre; si lo declara, gana ese sobre el de mercado de abajo' }));
  }
  const key = `${moneda}@${cierre}`;
  if (sitio.FX_CLOSE[key]) {
    out.push(campo('fxRef', key, `el documento no declara tipo de cambio; FX_CLOSE ya tiene ${key} = ${sitio.FX_CLOSE[key].fx} (${sitio.FX_CLOSE[key].label})`));
    return out;
  }
  if (serie.fx) {
    const label = serie.exacto ? `${FUENTE_SERIE[moneda]} al ${serie.fecha}` : `${FUENTE_SERIE[moneda]}, última rueda hábil antes del cierre (${serie.fecha}, ${cierre} no es día hábil)`;
    out.push(campo('fxRef', key, `el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): ${serie.fx}. --escribir agrega '${key}' a FX_CLOSE`, 'ok', { fxClose: { fx: serie.fx, source: 'market_close', label } }));
    if (ANOTAR_MISSES) runNode('tools/lookup-fx-close.js', [cierre, '--currency', moneda, '--json']);
    return out;
  }
  if (ANOTAR_MISSES) runNode('tools/lookup-fx-close.js', [cierre, '--currency', moneda, '--json']);
  out.push(campo('fxRef', key, `el documento no declara tipo de cambio y no hay cotización cacheada (${serie.error})`, 'pendiente', { nota: `falta el dato de mercado, no un criterio: correr node tools/fetch-fx-reference.mjs para ${moneda} (o cargar ${key} en FX_CLOSE con su fuente oficial) antes de la etapa de carga` }));
  return out;
}

// Palabras genéricas de nombre de club que no identifican al club (Versión 315, pedido de Guido: "AC Milan y Milan son lo mismo, ídem
// OFI Crete y OFI"): se sacan de los dos lados antes de comparar por palabras.
const GENERICAS = new Set(['fc', 'ac', 'sc', 'cf', 'afc', 'cfc', 'sk', 'fk', 'nk', 'hnk', 'gnk', 'pfc', 'nfc', 'bk', 'if', 'il', 'ik', 'ssc', 'us', 'as', 'ss', 'cd', 'ud', 'sd', 'ca', 'club', 'calcio', 'fotball', 'fotbal', 'futebol', 'football', 'fussball', 'tj', 'jk', 'spor', 'kulubu', 'sv', 'vfb', 'vfl', 'tsv', 'fsv', 'rsc', 'kv', 'kaa', 'kvc', 'krc', 'sport', 'de', 'the', 'and', 'a', 's', 'as']);
function proponerLiga(clubId, nombre, pais, anio, sitio, cierre = null) {
  if (!pais || !pais.iso2 || !anio) return campo('liga', null, 'sin país o sin año', 'pendiente');
  const fila = (sitio.CLUB_LEAGUE_BY_YEAR[clubId] || {})[anio];
  if (fila !== undefined && fila !== null) return campo('liga', fila, `data/club-leagues/${pais.iso2.toLowerCase()}.js ya tiene la fila`);
  const iso = pais.iso2.toLowerCase();
  const cachePath = resolve(ROOT, 'tools/club-league-reference', `${iso}.json`);
  if (ANOTAR_MISSES) runNode('tools/lookup-club-league.js', [nombre, '--pais', iso, '--anio', String(anio), '--json']);
  if (!existsSync(cachePath)) return campo('liga', null, `sin caché de rosters para ${iso} (tools/club-league-reference/${iso}.json)`, 'pendiente', { nota: 'la fila se escribe en null (= nadie lo verificó, P3 liga-sin-verificar); para resolverla: resolve-wikipedia-season-page.mjs + fetch-club-league-reference.mjs (club-or-year-onboarding §17)' });
  const data = JSON.parse(readFileSync(cachePath, 'utf8'));
  const q = norm(nombre).replace(/[^a-z0-9]+/g, ' ').trim();
  const exactos = []; const parciales = [];
  // QUÉ TEMPORADA (Versión 315): la caché guarda una temporada partida ("2020–21") bajo el año en que TERMINA. La regla del sitio es "la
  // categoría al CIERRE del ejercicio" (data/club-leagues.js, decisión de Guido, Versión 132): un ejercicio que cierra entre julio y
  // diciembre en una liga partida está jugando la temporada que empezó ese año -> clave anio + 1. Antes se buscaba siempre `anio` y a un
  // club que cierra en diciembre (Atalanta 2020, Sassuolo 2021, Genoa 2022, Thun 2019, los rusos) le tocaba la temporada ANTERIOR.
  const mesCierre = cierre ? Number(String(cierre).slice(5, 7)) : null;
  const temporadaDe = (years) => {
    const partida = Object.values(years).some((e) => /\d{4}\s*[–\-\/]\s*\d{2,4}/.test(String(e.wikipediaPage || '')));
    return partida && mesCierre && mesCierre >= 7 ? String(Number(anio) + 1) : String(anio);
  };
  const sinGen = (x) => x.split(' ').filter((t) => t && !GENERICAS.has(t));
  for (const [leagueId, years] of Object.entries(data.leagues || {})) {
    const e = years[temporadaDe(years)];
    if (!e) continue;
    for (const c of e.clubs) {
      const n = norm(c).replace(/[^a-z0-9]+/g, ' ').trim();
      // Por PALABRAS, no por substring: "ael larissa" contiene "aris" como texto (bug real de la
      // primera versión, proponía a AEL Larissa como Aris).
      const tn = sinGen(n); const tq = sinGen(q);
      if (!tn.length || !tq.length) continue;
      if (n === q) exactos.push({ leagueId, club: c, page: e.wikipediaPage });
      else if (tn.every((t) => tq.includes(t)) || tq.every((t) => tn.includes(t))) parciales.push({ leagueId, club: c, page: e.wikipediaPage });
    }
  }
  const enCatalogo = (id) => Object.keys(sitio.LEAGUES).find((k) => k.toLowerCase() === id.toLowerCase());
  if (exactos.length === 1) {
    const cat = enCatalogo(exactos[0].leagueId);
    if (cat) return campo('liga', cat, `roster cacheado de "${exactos[0].page}" (tools/club-league-reference/${iso}.json), coincidencia exacta "${exactos[0].club}"`);
    // `pendiente`, no `pregunta` (cambio del 2026-09-30): agregar una liga al catálogo es UNA decisión de
    // Guido por liga, no por club, y no cambia si el alta es correcta. Con la caché de rosters creciendo
    // (it, kr...), dejarlo como `pregunta` hacía que MÁS datos dieran MENOS clubes listos (21 carpetas
    // frenadas solo por esto). La fila se escribe en `null` (= "nadie lo verificó", P3) y la pregunta
    // queda en `nota` para cuando se decida el catálogo.
    return campo('liga', null, `el roster "${exactos[0].page}" lo ubica en '${exactos[0].leagueId}', que NO está en el catálogo de data/leagues.js`, 'pendiente', { nota: `fila en null hasta decidir: el club jugó ${anio} en '${exactos[0].leagueId}' (${exactos[0].page}), liga que no está en el catálogo. ¿Se agrega al catálogo o la fila va como 'liga-no-catalogada'? (decisión de Guido, por liga)` });
  }
  // Una coincidencia parcial ÚNICA en toda la temporada del país ("AC Milan" / "Milan", "OFI Crete" / "OFI") vale como exacta
  // (confirmado por Guido para esos casos). Si hay más de una, sigue pendiente de confirmación.
  if (!exactos.length && parciales.length === 1) {
    const p1 = parciales[0]; const cat = enCatalogo(p1.leagueId);
    if (cat) return campo('liga', cat, `roster cacheado de "${p1.page}" (tools/club-league-reference/${iso}.json), coincidencia única por palabras "${p1.club}" = "${nombre}"`);
  }
  if (exactos.length + parciales.length > 0) {
    const todos = [...exactos, ...parciales];
    // Mismo criterio: `pendiente` con la fila en null. El script no confirma homónimos por su cuenta
    // ("OFI Crete" contra "OFI"), pero tampoco hace falta frenar el alta por eso: null es la verdad.
    return campo('liga', null, `coincidencia NO exacta en los rosters cacheados: ${todos.map((t) => `"${t.club}" en ${t.page}`).join(' | ')}`, 'pendiente', { nota: `fila en null hasta confirmar: ¿"${nombre}" es ${todos.map((t) => `"${t.club}" (${t.leagueId}, ${t.page})`).join(' o ')}?` });
  }
  const cacheados = Object.entries(data.leagues || {}).filter(([, y]) => y[String(anio)]).map(([l]) => l);
  return campo('liga', null, cacheados.length ? `no aparece en los rosters cacheados de ${anio} (${cacheados.join(', ')}): puede haber jugado otra división` : `no hay ninguna liga-temporada de ${iso} ${anio} cacheada`, 'pendiente', { nota: 'la fila se escribe en null (= nadie lo verificó); bajar el roster con fetch-club-league-reference.mjs (club-or-year-onboarding §17)' });
}

// ============================================================================
// ESCRITURA (--escribir)
// ============================================================================
function snapshot() {
  const archivos = new Map();
  const add = (p) => { if (existsSync(p) && statSync(p).isFile()) archivos.set(p, readFileSync(p)); };
  (function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); statSync(f).isDirectory() ? walk(f) : add(f); } })(resolve(ROOT, 'data'));
  for (const e of readdirSync(resolve(ROOT, 'fuentes'))) if (e.endsWith('.html')) add(resolve(ROOT, 'fuentes', e));
  for (const f of ['index.html', 'fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html']) add(resolve(ROOT, f));
  return archivos;
}
function revertir(snap) {
  const actual = snapshot();
  let restaurados = 0; let borrados = 0;
  for (const [p, buf] of snap) if (!actual.has(p) || !actual.get(p).equals(buf)) { writeFileSync(p, buf); restaurados++; }
  for (const p of actual.keys()) if (!snap.has(p)) { unlinkSync(p); borrados++; }
  return { restaurados, borrados };
}

// Inserta `texto` antes del primer `cierre` (regex de línea) que sigue a `apertura`.
function insertarAntes(contenido, apertura, cierre, texto, archivo) {
  const i = contenido.indexOf(apertura);
  if (i < 0) throw new Error(`${archivo}: no encontré "${apertura}"`);
  const resto = contenido.slice(i);
  const m = resto.match(cierre);
  if (!m) throw new Error(`${archivo}: no encontré el cierre del bloque "${apertura}"`);
  const pos = i + m.index;
  return contenido.slice(0, pos) + texto + contenido.slice(pos);
}

function jsStr(s) { return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`; }

function escribir(r) {
  const val = (n) => (r.campos.find((c) => c.campo === n) || {}).valor;
  const eVal = (n) => (r.ejercicio.campos.find((c) => c.campo === n) || {});
  const id = val('id');
  const hoy = new Date().toISOString().slice(0, 10);
  const escritos = [];
  const snap = snapshot();
  try {
    // 1. data/clubs.js
    const clubsPath = resolve(ROOT, 'data/clubs.js');
    let clubsJs = readFileSync(clubsPath, 'utf8');
    if (new RegExp(`['"]?${id}['"]?\\s*:\\s*\\{\\s*id:`).test(clubsJs)) throw new Error(`data/clubs.js ya tiene '${id}'`);
    const campos = [`id:${jsStr(id)}`, `name:${jsStr(val('name'))}`, `displayName:${jsStr(val('displayName'))}`, `country:${jsStr(val('country'))}`, `reportingCurrency:${jsStr(val('reportingCurrency'))}`, `fiscalYearStart:${jsStr(val('fiscalYearStart'))}`, `sport:${jsStr(val('sport'))}`];
    const linea = `  // ${val('displayName')}: alta por tools/alta-club.mjs (${hoy}) desde ${r.documento}. brandColor AUSENTE a propósito\n  // (nadie lo chequeó todavía: club-or-year-onboarding §3 1b, identidad primero).\n  ${jsStr(id)}: { ${campos.join(', ')} },\n`;
    clubsJs = insertarAntes(clubsJs, 'const clubs = {', /^\};$/m, linea, 'data/clubs.js');
    writeFileSync(clubsPath, clubsJs); escritos.push('data/clubs.js');

    // 2. data/<id>-data.js (esqueleto)
    const v = id.replace(/[^a-z0-9]/g, '');
    const dataPath = resolve(ROOT, 'data', `${id}-data.js`);
    if (existsSync(dataPath)) throw new Error(`ya existe data/${id}-data.js`);
    const metaProp = {};
    for (const c of r.ejercicio.campos) {
      if (c.campo === 'currency') metaProp.currency = c.valor;
      if (c.campo === 'fx' && c.valor != null && c.fxSource) { metaProp.fx = c.valor; metaProp.fxSource = c.fxSource; }
      if (c.campo === 'fxRef') metaProp.fxRef = c.valor;
      if (c.campo === 'sourceId') metaProp.sourceId = c.valor;
      if (c.campo === 'reportType') metaProp.reportType = c.valor;
    }
    const fuentesCampo = [...r.campos, ...r.ejercicio.campos].map((c) => `//   ${c.campo.padEnd(18)} ${c.estado.padEnd(9)} ${c.valor === undefined ? '(ausente)' : JSON.stringify(c.valor)} — ${String(c.fuente || '').slice(0, 150)}`).join('\n');
    const esqueleto = `// ============================================================================
// data/${id}-data.js — ${val('name')} (${NOMBRE_PAIS_ES[val('country')] || val('country')}).
// ALTA POR SCRIPT (tools/alta-club.mjs, ${hoy}), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: ${r.documento}
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
${fuentesCampo}
//
// FISCAL YEAR META PROPUESTO para ${r.ejercicio.anio} (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   ${r.ejercicio.anio}: ${JSON.stringify(metaProp)}
// ============================================================================

const ${v}RevenueLinesByYear = {};
const ${v}ExpenseLinesByYear = {};
const ${v}FiscalYearMeta = {};
const ${v}PresupuestoOverlayByYear = {};

const ${v}PasesData = [];
const ${v}ResultadosData = {};
const ${v}TitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA[${jsStr(id)}] = {
  revenueLinesByYear: ${v}RevenueLinesByYear, expenseLinesByYear: ${v}ExpenseLinesByYear,
  fiscalYearMeta: ${v}FiscalYearMeta, pasesData: ${v}PasesData,
  resultadosData: ${v}ResultadosData, titulosData: ${v}TitulosData,
  presupuestoOverlayByYear: ${v}PresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub[${jsStr(id)}] = null;
`;
    writeFileSync(dataPath, esqueleto); escritos.push(`data/${id}-data.js`);

    // 3. data/club-leagues/<iso2>.js
    const iso = val('country').toLowerCase();
    const liga = eVal('liga');
    const anio = r.ejercicio.anio;
    const ligaPath = resolve(ROOT, 'data/club-leagues', `${iso}.js`);
    const filaLiga = `  // ${val('displayName')} (alta-club.mjs, ${hoy}): ${liga.valor ? `verificado contra ${liga.fuente}` : `SIN VERIFICAR (${liga.fuente})`}.\n  ${jsStr(id)}: { ${anio}: ${liga.valor ? jsStr(liga.valor) : 'null'} },\n`;
    if (existsSync(ligaPath)) {
      const txt = readFileSync(ligaPath, 'utf8');
      writeFileSync(ligaPath, insertarAntes(txt, 'Object.assign(window.CLUB_LEAGUE_BY_YEAR, {', /^\}\);$/m, filaLiga, `data/club-leagues/${iso}.js`));
    } else {
      writeFileSync(ligaPath, `// ============================================================================
// data/club-leagues/${iso}.js — en qué liga jugó cada club de ${NOMBRE_PAIS_ES[val('country')] || val('country')} en cada
// ejercicio. Creado por tools/alta-club.mjs (${hoy}) al dar de alta el primer club del país.
//
// SE EDITA A MANO (o por alta-club.mjs), no lo genera ningún generador. Un archivo por
// país (Versión 164). SE AUTOREGISTRA con Object.assign sobre la tabla que ya existe.
//
// LAS REGLAS (qué significa \`null\`, el criterio de "la categoría al cierre", por qué los
// ids de liga nombran el escalón) están UNA sola vez, en la cabecera de
// \`data/club-leagues.js\`. No se copian acá.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
${filaLiga}});
`);
    }
    escritos.push(`data/club-leagues/${iso}.js`);

    // 4. País nuevo
    if (r.contexto.paisNuevo) {
      const p = r.contexto.paisNuevo;
      const lp = resolve(ROOT, 'data/leagues.js');
      const lj = readFileSync(lp, 'utf8');
      const pad = `${p.iso2}: `;
      writeFileSync(lp, insertarAntes(lj, 'const COUNTRIES = {', /^\};$/m, `  ${pad}{ name:${jsStr(p.name)}, key:'country.${p.iso2}', flag:'${p.flag}', region:'${p.region}' }, // alta-club.mjs ${hoy}\n`, 'data/leagues.js'));
      escritos.push('data/leagues.js');
      const ep = resolve(ROOT, 'data/lang/en.js');
      const ej = readFileSync(ep, 'utf8');
      const ancla = ej.match(/^\s*"country\.[A-Z]{2}": "[^"]*",\n/m);
      if (ancla && !ej.includes(`"country.${p.iso2}"`)) {
        const pos = ej.indexOf(ancla[0]) + ancla[0].length;
        writeFileSync(ep, ej.slice(0, pos) + `  "country.${p.iso2}": ${JSON.stringify(p.en)},\n` + ej.slice(pos));
        escritos.push('data/lang/en.js');
      }
    }
    // 5. Moneda nueva
    const cmPath = resolve(ROOT, 'data/currency-map.js');
    let cm = readFileSync(cmPath, 'utf8'); let cmTocado = false;
    if (r.contexto.monedaNueva) {
      const m = r.contexto.monedaNueva;
      cm = insertarAntes(cm, 'const CURRENCY_META = {', /^\};$/m, `  ${m.codigo}: { scale: ${m.scale}, unitSuffix: '${m.scale === 1000 ? 'mil M' : 'M'}' },          // ${NOMBRE_PAIS_ES[val('country')] || ''} (alta-club.mjs ${hoy})\n`, 'data/currency-map.js');
      cm = insertarAntes(cm, 'const FX_PLAUSIBLE_RANGE = {', /^\};$/m, `  ${m.codigo}: [${m.rango.join(', ')}],${' '.repeat(Math.max(1, 9 - m.rango.join(', ').length))}// ${NOMBRE_PAIS_ES[val('country')] || ''} (alta-club.mjs ${hoy}, rango generoso de la tabla MONEDAS)\n`, 'data/currency-map.js');
      cmTocado = true;
    }
    // 6. FX de mercado nuevo
    const fxc = r.ejercicio.campos.find((c) => c.campo === 'fxRef' && c.fxClose && c.estado === 'ok');
    if (fxc && !cm.includes(`'${fxc.valor}':`)) {
      cm = insertarAntes(cm, 'const FX_CLOSE = {', /^\};$/m, `  '${fxc.valor}': { fx: ${fxc.fxClose.fx}, source: 'market_close', label: ${jsStr(fxc.fxClose.label)} }, // alta-club.mjs ${hoy} (tools/fx-reference/)\n`, 'data/currency-map.js');
      cmTocado = true;
    }
    if (cmTocado) { writeFileSync(cmPath, cm); escritos.push('data/currency-map.js'); }

    // 7. ASSET_V (CLAUDE.md, "Gotchas de tooling"; audit.js lo exige como P1 `asset-v-sin-subir`
    // apenas cambia algo de data/): se sube la constante Y cada `?v=` literal de index.html, las
    // dos cosas juntas (subir una sola es peor que ninguna). Si index.html ya tiene un ASSET_V
    // distinto al del último commit (otra alta u otro cambio sin commitear ya lo subió), no se toca.
    const idxPath = resolve(ROOT, 'index.html');
    const idx = readFileSync(idxPath, 'utf8');
    const actual = (idx.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
    let enHead = null;
    try { enHead = (execFileSync('git', ['show', 'HEAD:index.html'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1]; } catch { enHead = null; }
    if (actual && (enHead === null || enHead === actual)) {
      const nuevo = /^\d+$/.test(actual) ? String(Number(actual) + 1) : `${actual}a`;
      const esc = actual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const idxNuevo = idx.replace(`window.ASSET_V = '${actual}'`, `window.ASSET_V = '${nuevo}'`).replace(new RegExp(`\\?v=${esc}(?=["'])`, 'g'), `?v=${nuevo}`);
      writeFileSync(idxPath, idxNuevo); escritos.push(`index.html (ASSET_V ${actual} -> ${nuevo})`);
    }

    // 8. Generadores + auditoría
    const gens = ['tools/generate-club-index.js', 'tools/generate-fuentes-page.js', 'tools/generate-rankings.js', 'tools/generate-como-corre-stats.js'].filter((g) => existsSync(resolve(ROOT, g)));
    const salidaGen = [];
    for (const g of gens) {
      const res = runNode(g, []);
      salidaGen.push({ generador: g, codigo: res.code });
      if (res.code !== 0) throw new Error(`${g} falló (código ${res.code}): ${res.out.slice(-600)}`);
    }
    const audit = runNode('tools/audit.js', ['--quiet']);
    const linea0 = (audit.out.match(/P0 \d+ · P1 \d+[^\n]*/) || [''])[0];
    if (audit.code !== 0) {
      const rv = revertir(snap);
      return { ok: false, motivo: `node tools/audit.js dio P0/P1 (${linea0}); se revirtió todo (${rv.restaurados} archivos restaurados, ${rv.borrados} borrados)`, audit: audit.out.slice(-3000), escritos };
    }
    return { ok: true, escritos, generadores: salidaGen, audit: linea0 };
  } catch (e) {
    const rv = revertir(snap);
    return { ok: false, motivo: `${e.message} — se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`, escritos };
  }
}

// ============================================================================
// PREGUNTAS PARA CLAUDE (tools/alta-claude.mjs): cuáles van, y qué se hace con la respuesta
// ============================================================================
// Campo de alta-club.mjs -> tipo de pregunta de alta-claude.mjs. Las de cierre (anio, cierre,
// fiscalYearStart) se juntan en UNA sola pregunta: son la misma fecha vista de tres lados.
const TIPO_DE_CAMPO = { perimetro: 'perimetro', reportType: 'reportType', anio: 'cierre', cierre: 'cierre', fiscalYearStart: 'cierre', currency: 'moneda', fx: 'fx', sport: 'sport', name: 'name' };

// ¿Esta pregunta se responde LEYENDO el documento (va a Claude, y si Claude no puede, es candidata a
// preguntarle al club), o es una decisión de PRODUCTO (id heredado a renombrar, país Escocia, liga fuera
// del catálogo, Panamá USD/PAB, dos entidades en la carpeta: las decide Guido, no un club)?
function clasePregunta(c, r) {
  const pais = PAISES[(r.carpeta || '').split('/')[1]];
  if (!TIPO_DE_CAMPO[c.campo]) return 'producto';
  if (c.campo === 'perimetro' && c.dosEntidades) return 'producto';
  if (c.campo === 'currency' && pais && pais.preguntaMoneda) return 'producto';
  if (c.campo === 'fx' && /presupuesto/i.test(c.pregunta || '')) return 'producto'; // premisa de un presupuesto: otra pregunta
  return 'documento';
}

function preguntasParaClaude(r) {
  const porTipo = new Map();
  const todos = [...r.campos, ...r.ejercicio.campos];
  for (const c of todos) {
    const esNombre = c.campo === 'name' && c.estado === 'pendiente';
    if (c.estado !== 'pregunta' && !esNombre) continue;
    if (!esNombre && clasePregunta(c, r) !== 'documento') continue;
    const tipo = TIPO_DE_CAMPO[c.campo];
    const texto = esNombre ? `¿Cuál es el nombre legal completo de la entidad que emite estos estados (el script no lo encontró; candidato: "${c.valor}")?` : c.pregunta;
    const x = porTipo.get(tipo) || { id: tipo, tipo, textos: [], campos: [], contexto: [] };
    if (!x.textos.includes(texto)) x.textos.push(texto);
    x.campos.push(c.campo);
    if (c.fuente) x.contexto.push(`${c.campo}: ${String(c.fuente).slice(0, 300)}`);
    porTipo.set(tipo, x);
  }
  const moneda = (r.ejercicio.campos.find((c) => c.campo === 'currency') || {}).valor;
  return [...porTipo.values()].map((x) => ({
    id: x.id, tipo: x.tipo, campos: x.campos, texto: x.textos.join(' / '), contexto: x.contexto.join(' | '),
    ctxFx: x.tipo === 'fx' && MONEDAS[moneda] ? { moneda, rango: MONEDAS[moneda].rango, aLaPar: MONEDAS_A_LA_PAR.has(moneda) } : undefined,
  }));
}

// De las respuestas verificadas, cuáles se APLICAN (desbloquean sin decidir nada de producto).
// Una respuesta verificada que no desbloquea (el documento es un intermedio; el club es de rugby; la
// moneda es la vieja, anterior al euro) queda guardada con su cita al lado de la pregunta, que sigue abierta.
function aplicables(respuestas, r) {
  const ov = {};
  const pais = PAISES[(r.carpeta || '').split('/')[1]];
  for (const x of respuestas || []) {
    if (!x.resuelta) continue;
    const c0 = (x.citas || [])[0] || {};
    const fuente = `pág. ${c0.pagina}: "${String(c0.texto || '').slice(0, 160)}" (confianza ${x.confianza})`;
    const v = { valor: x.valor, fuente };
    if (x.tipo === 'cierre') ov.cierre = v;
    else if (x.tipo === 'reportType' && ['official_balance_sheet', 'official_budget'].includes(x.valor)) ov.reportType = v;
    else if (x.tipo === 'perimetro' && x.valor !== 'otra_entidad') ov.perimetro = v;
    else if (x.tipo === 'moneda' && pais && x.valor === pais.moneda) ov.moneda = v;
    else if (x.tipo === 'sport' && x.valor === 'futbol') ov.sport = v;
    // Nombre en alfabeto no latino (griego, cirílico, hangul): verificado, pero NO se aplica. Los clubes
    // cargados usan la transliteración latina ("Panathinaikos Athlitikos Omilos P.A.E."; en el backtest
    // Claude devolvió el griego impreso, bien leído pero con otra convención) y una transliteración no se
    // puede verificar contra el documento. Queda en el registro, con su cita, para quien complete `name`.
    else if (x.tipo === 'name' && !/[^\u0000-\u024F\u1E00-\u1EFF\s]/.test(x.valor)) ov.name = v;
    else if (x.tipo === 'fx') ov.fx = v;
  }
  return ov;
}

// ============================================================================
// EL REGISTRO (Admin/altas-club.jsonl, ver tools/altas-registro.mjs)
// ============================================================================
const sha1 = (x) => createHash('sha1').update(x).digest('hex');
let _estadoTransc = null;
function estadoTranscripciones() {
  if (_estadoTransc) return _estadoTransc;
  _estadoTransc = new Map();
  const p = resolve(ROOT, 'Admin/transcripciones-estado.jsonl');
  if (existsSync(p)) for (const l of readFileSync(p, 'utf8').split('\n')) { try { const e = JSON.parse(l); if (e.md) _estadoTransc.set(e.md, e.estado); } catch { /* */ } }
  return _estadoTransc;
}

function mdsDeCarpeta(paisCarpeta, clubCarpeta) {
  const dir = resolve(ROOT, 'Clubes', paisCarpeta, clubCarpeta);
  const out = [];
  if (!existsSync(dir)) return out;
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) { walk(f); continue; }
      if (!/\.md$/i.test(e) || /\.(previo-[a-z]+|gemini-check|claude-check|mistral-redo|t-[a-z]+)\.md$/i.test(e) || /^readme/i.test(e)) continue;
      out.push(rel(f));
    }
  })(dir);
  return out.sort();
}

// Orden de preferencia del documento BASE de una carpeta (mismo criterio que la prueba de
// Admin/tests/test-alta-club.md, ahora por script): primero los que son un estado contable anual por el
// nombre (no presupuesto/acta/intermedio), después los de transcripción `listo`/`cargado` antes que los
// `revisar`/`pendiente-segunda-voz`, y dentro de eso el ejercicio más reciente.
function candidatosBase(mds) {
  const est = estadoTranscripciones();
  const rango = (m) => ({ listo: 0, cargado: 0, 'sin-verificar': 1 }[est.get(m)] ?? 2);
  return mds.map((m) => ({ m, nb: NO_BALANCE.test(norm(basename(m))) ? 1 : 0, rk: rango(m), y: anioDelNombre(basename(m)) || 0 }))
    .sort((a, b) => a.nb - b.nb || a.rk - b.rk || b.y - a.y || a.m.localeCompare(b.m)).map((x) => x.m);
}

function huellaCarpeta(paisCarpeta, clubCarpeta, mds, docForzado) {
  const pais = PAISES[paisCarpeta] || {};
  const iso = (pais.iso2 || 'xx').toLowerCase();
  const archivos = [...mds, 'data/clubs.js', 'data/currency-map.js', 'data/leagues.js', `data/club-leagues/${iso}.js`, `tools/club-league-reference/${iso}.json`, 'tools/alta-club.mjs', 'tools/alta-claude.mjs', 'tools/carpetas-clubes.mjs'];
  if (pais.moneda && SERIES_FX[pais.moneda]) archivos.push(`tools/fx-reference/${SERIES_FX[pais.moneda]}`);
  const res = clubDeCarpeta(paisCarpeta, clubCarpeta);
  const est = estadoTranscripciones();
  return huellaEntradas({ archivos, extra: { resolucion: [res.via, res.clubId || null], docForzado: docForzado || null, anioForzado: ANIO_FORZADO, transcripcion: mds.map((m) => est.get(m) || null) } });
}

// Una entrada del registro a partir del análisis (ya con las respuestas de Claude aplicadas).
function armarEntrada({ paisCarpeta, clubCarpeta, r, huella, detalle, claude, probados, error }) {
  const carpeta = `Clubes/${paisCarpeta}/${clubCarpeta}/`;
  const base = { carpeta, pais: paisCarpeta, club: clubCarpeta, fecha: new Date().toISOString(), huella, entradas: detalle };
  if (error || !r) return { ...base, clubId: null, estado: 'faltan-datos', documento: null, detalle: error || 'sin análisis', preguntas: [], pendientes: [], resueltas: [], claude: null };
  if (r.error) return { ...base, clubId: null, estado: 'faltan-datos', documento: r.documento, detalle: r.error, preguntas: [], pendientes: [], resueltas: [], claude: null };
  const todos = [...r.campos, ...r.ejercicio.campos];
  const clubId = r.club.existe ? r.club.clubId : (r.campos.find((c) => c.campo === 'id') || {}).valor;
  const respPorTipo = new Map(((claude && claude.respuestas) || []).map((x) => [x.tipo, x]));
  const preguntas = todos.filter((c) => c.estado === 'pregunta').map((c) => {
    const clase = clasePregunta(c, r);
    const x = clase === 'documento' ? respPorTipo.get(TIPO_DE_CAMPO[c.campo]) : null;
    return {
      campo: c.campo, clase, pregunta: c.pregunta,
      claude: x ? { valor: x.valor, respuesta: x.respuesta, confianza: x.confianza, verificada: x.resuelta, motivoNoResuelta: x.motivoNoResuelta, citas: x.citas } : null,
      // Candidata a Admin/dudas-por-club.md (preguntarle al CLUB): solo si es de lectura del documento y
      // Claude ya la leyó y no la pudo sostener con una cita. Si Claude la contestó con cita pero la
      // respuesta no desbloquea (intermedio, otro deporte, moneda vieja), no hay nada que preguntarle al
      // club: la decisión es de Guido (usar otro documento, ¿entra ese deporte?, ¿se convierte?).
      candidataDudas: clase === 'documento' && !!x && !x.resuelta,
    };
  });
  const fxOk = todos.some((c) => (c.campo === 'fx' || c.campo === 'fxRef') && c.estado === 'ok');
  const faltaFx = !fxOk && !preguntas.some((p) => p.campo === 'fx' || p.campo === 'currency');
  const pendientes = todos.filter((c) => c.estado === 'pendiente').map((c) => ({ campo: c.campo, fuente: String(c.fuente || '').slice(0, 240), bloquea: (c.campo === 'fx' || c.campo === 'fxRef') && faltaFx }));
  const resueltas = todos.filter((c) => /^claude-api/.test(String(c.fuente || '')) && c.estado === 'ok').map((c) => {
    const x = respPorTipo.get(TIPO_DE_CAMPO[c.campo]) || {};
    return { campo: c.campo, valor: c.valor, fuente: 'claude-api', modelo: claude && claude.modelo, confianza: x.confianza, respuesta: x.respuesta, citas: (x.citas || []).map(({ pagina, texto }) => ({ pagina, texto })) };
  });
  let estado;
  if (r.club.existe) estado = 'existe';
  else if (preguntas.length) estado = 'con-preguntas';
  else if (faltaFx) estado = 'faltan-datos';
  else estado = 'listo-para-alta';
  return {
    ...base, clubId, estado, documento: r.documento, anio: r.ejercicio.anio, cierre: r.ejercicio.cierre,
    detalle: estado === 'faltan-datos' ? 'sin tipo de cambio para el cierre: ni declarado por el documento, ni en FX_CLOSE, ni en tools/fx-reference/ (correr fetch-fx-reference.mjs)' : undefined,
    documentosProbados: probados && probados.length > 1 ? probados : undefined,
    resumen: { ok: r.resumen.ok, pregunta: r.resumen.pregunta, pendiente: r.resumen.pendiente },
    preguntas, pendientes, resueltas,
    claude: claude ? { preguntasHuella: claude.preguntasHuella, fecha: claude.fecha, modelo: claude.modelo, costUsd: claude.costUsd, paginasEnviadas: claude.paginasEnviadas, entero: claude.entero, error: claude.error, respuestas: claude.respuestas } : null,
  };
}

// Analiza una carpeta: elige el documento base (o usa el forzado), consulta/reusa a Claude, arma la entrada.
// Devuelve { entrada, pendienteClaude } — `pendienteClaude` es la tarea a mandar a Claude si hace falta
// (se corren todas juntas después, con concurrencia y tope de gasto).
function analizarCarpeta(paisCarpeta, clubCarpeta, sitio, previo, docForzado = null) {
  const mds = mdsDeCarpeta(paisCarpeta, clubCarpeta);
  const { huella, detalle } = huellaCarpeta(paisCarpeta, clubCarpeta, mds, docForzado);
  const ctxBase = { paisCarpeta, clubCarpeta, huella, detalle };
  if (!mds.length && !docForzado) return { entrada: armarEntrada({ ...ctxBase, error: 'la carpeta no tiene ningún .md: falta transcribir (tools/pipeline.mjs / mistral-ocr-transcribe.mjs)' }) };
  let r = null; const probados = [];
  const orden = docForzado ? [docForzado] : candidatosBase(mds).slice(0, 4);
  for (const m of orden) {
    const x = analizar(m, sitio);
    probados.push(x.documento);
    if (!r) r = x;
    // Un documento que no sirve de base (no es un balance anual, o no se le puede sacar el ejercicio)
    // se cambia por el siguiente candidato: "usar otro documento de la misma carpeta" era la respuesta
    // más frecuente a esas preguntas en la prueba de Admin/tests/test-alta-club.md.
    const malBase = x.error || (x.preguntas || []).some((p) => ['reportType', 'anio', 'cierre', 'fiscalYearStart'].includes(p.campo));
    if (!malBase) { r = x; break; }
  }
  if (r.error || r.club.existe) return { entrada: armarEntrada({ ...ctxBase, r, probados }) };
  const pregs = preguntasParaClaude(r);
  const mdSha = sha1Archivo(r.md);
  const preguntasHuella = sha1(JSON.stringify({ mdSha, pregs: pregs.map((p) => [p.tipo, p.texto]), MODELO }));
  // Respuestas de Claude reusables si se hicieron sobre el MISMO .md y las MISMAS preguntas (y modelo).
  // Un cambio del prompt de alta-claude.mjs NO las invalida solo (costaría volver a pagar todo): para
  // rehacerlas, --forzar-claude.
  // BUG REAL (2026-09-30): una corrida que no reusaba las respuestas (otra versión de las preguntas, o un recálculo de otra sesión) escribía
  // la entrada SIN el campo `claude`, y las respuestas ya pagadas se perdían del registro (quedaron 12 de 36; se recuperaron de git). Ahora
  // las respuestas anteriores viajan siempre en `claudeAnterior` hasta que una corrida con --claude las reemplace, y se reusan desde ahí si
  // la huella de las preguntas coincide.
  const anterior = (previo && (previo.claude || previo.claudeAnterior)) || null;
  let claude = anterior && anterior.preguntasHuella === preguntasHuella && !anterior.error && !ARGS.includes('--forzar-claude') ? anterior : null;
  if (claude || !pregs.length) return { entrada: finalizar({ ...ctxBase, r, probados, claude }), sinClaude: false };
  const e0 = armarEntrada({ ...ctxBase, r, probados });
  return { entrada: anterior ? { ...e0, claudeAnterior: anterior } : e0, pendienteClaude: { ...ctxBase, r, probados, pregs, preguntasHuella } };
}

// Con las respuestas de Claude (nuevas o reusadas): vuelve a analizar el documento con lo que desbloquea.
function finalizar({ paisCarpeta, clubCarpeta, huella, detalle, r, probados, claude }) {
  let r2 = r;
  if (claude && claude.respuestas) {
    const ov = aplicables(claude.respuestas, r);
    if (Object.keys(ov).length) r2 = analizar(r.documento, cargarSitioCache(), ov);
  }
  return armarEntrada({ paisCarpeta, clubCarpeta, r: r2, huella, detalle, claude, probados });
}

let _sitio = null;
function cargarSitioCache() { return (_sitio ??= cargarSitio()); }

async function correrClaude(tareas) {
  // Tope de gasto con concurrencia: cada trabajador reserva el costo estimado de su llamada ANTES de
  // hacerla (bug de la primera corrida: con 4 en paralelo y el chequeo solo contra lo ya gastado, un tope
  // de US$ 1,45 terminó en US$ 1,72).
  let gastado = 0; let hechas = 0; let enCurso = 0; const out = [];
  const estimado = () => (hechas ? gastado / hechas : 0.09);
  const cola = [...tareas];
  async function trabajador() {
    while (cola.length) {
      if (gastado + (enCurso + 1) * estimado() > TOPE_USD) return;
      const t = cola.shift(); enCurso++;
      const moneda = (t.r.ejercicio.campos.find((c) => c.campo === 'currency') || {}).valor;
      const res = await preguntarAClaude({ md: readFileSync(resolve(ROOT, t.r.md), 'utf8'), preguntas: t.pregs, modelo: MODELO,
        ctx: { carpeta: `${t.paisCarpeta}/${t.clubCarpeta}`, documento: basename(t.r.documento), pais: t.paisCarpeta, anio: t.r.ejercicio.anio, moneda } });
      gastado += res.costUsd || 0; hechas++; enCurso--;
      const claude = { preguntasHuella: t.preguntasHuella, fecha: new Date().toISOString(), modelo: res.model || MODELO, costUsd: Number((res.costUsd || 0).toFixed(5)), paginasEnviadas: res.paginasEnviadas, entero: res.entero, error: res.error, respuestas: res.respuestas };
      out.push({ t, claude });
      console.error(`  claude ${hechas}/${tareas.length} ${t.paisCarpeta}/${t.clubCarpeta}: ${res.respuestas.filter((x) => x.resuelta).length}/${t.pregs.length} resueltas, $${(res.costUsd || 0).toFixed(4)} (acumulado $${gastado.toFixed(3)})${res.error ? ' ERROR ' + res.error.slice(0, 120) : ''}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, trabajador));
  if (cola.length) console.error(`  Tope de gasto (--tope-usd ${TOPE_USD}) alcanzado: ${cola.length} carpetas quedaron sin preguntar.`);
  return { resultados: out, gastado };
}

// ============================================================================
// MODOS DE LA LÍNEA DE COMANDOS
// ============================================================================
async function modoTodos() {
  const sitio = cargarSitioCache();
  const { todasLasCarpetas } = await import('./carpetas-clubes.mjs');
  let carpetas = todasLasCarpetas().filter((c) => c.via === 'nuevo' && !c.carpeta.startsWith('_'));
  const solo = flagVal('--solo');
  if (solo) carpetas = carpetas.filter((c) => `${c.pais}/${c.carpeta}`.includes(solo));
  const previo = leerRegistro();
  const nuevas = []; const tareas = []; let sinCambio = 0;
  for (const c of carpetas) {
    const k = `Clubes/${c.pais}/${c.carpeta}/`;
    const p = previo.get(k);
    const { huella } = huellaCarpeta(c.pais, c.carpeta, mdsDeCarpeta(c.pais, c.carpeta), null);
    // Sin cambios de huella: la línea sigue valiendo. Solo se rehace si se pide Claude y a esa carpeta
    // todavía le quedan preguntas de documento sin preguntar.
    const faltaClaude = CLAUDE && p && (p.preguntas || []).some((q) => q.clase === 'documento' && !q.claude) || (CLAUDE && p && (p.pendientes || []).some((q) => q.campo === 'name') && !p.claude);
    if (p && p.huella === huella && !FORZAR && !faltaClaude) { sinCambio++; continue; }
    const x = analizarCarpeta(c.pais, c.carpeta, sitio, p);
    if (x.pendienteClaude && CLAUDE) tareas.push(x.pendienteClaude);
    nuevas.push(x.entrada);
  }
  // Las de Claude, en tanda (con tope de gasto) y después se rehace su entrada con lo que desbloquea.
  if (tareas.length) {
    // Primero las carpetas que Claude puede dejar LISTAS: sin preguntas de producto (que Claude no
    // desbloquea) y con menos preguntas. Con tope de gasto, así rinde más cada dólar.
    const prodCount = (t) => [...t.r.campos, ...t.r.ejercicio.campos].filter((c) => c.estado === 'pregunta' && clasePregunta(c, t.r) === 'producto').length;
    // Las que solo tienen `name` pendiente (no bloquea) van al final.
    const soloNombre = (t) => (t.pregs.every((p) => p.tipo === 'name') ? 1 : 0);
    tareas.sort((a, b) => soloNombre(a) - soloNombre(b) || prodCount(a) - prodCount(b) || a.pregs.length - b.pregs.length || a.r.carpeta.localeCompare(b.r.carpeta));
    const lim = LIMITE !== null ? tareas.slice(0, LIMITE) : tareas;
    console.error(`Claude: ${lim.length} carpetas con preguntas de documento (modelo ${MODELO}, tope US$ ${TOPE_USD}).`);
    const { resultados, gastado } = await correrClaude(lim);
    for (const { t, claude } of resultados) {
      const e = finalizar({ ...t, claude });
      const i = nuevas.findIndex((n) => n.carpeta === e.carpeta);
      nuevas[i] = e;
    }
    console.error(`Claude: gastado US$ ${gastado.toFixed(3)}.`);
  }
  guardarEnRegistro(nuevas);
  console.log(`${carpetas.length} carpetas de club nuevo: ${nuevas.length} recalculadas, ${sinCambio} sin cambios de huella.`);
  imprimirResumen();
}

function imprimirResumen() {
  const s = resumenAltas();
  console.log(`\nAdmin/altas-club.jsonl: ${s.total} carpetas — ${ESTADOS.map((e) => `${e} ${s.porEstado[e] || 0}`).join(' · ')}`);
  console.log(`Preguntas abiertas por campo: ${Object.entries(s.preguntasPorCampo).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', ') || 'ninguna'}`);
  console.log(`Campos resueltos por Claude con cita verificada: ${s.resueltasPorClaude}`);
  if (s.listos.length) {
    console.log(`\nListos para alta (${s.listos.length}):`);
    for (const l of s.listos) console.log(`  ${String(l.clubId).padEnd(26)} ${l.documento}`);
  }
}

// Candidatas a Admin/dudas-por-club.md: preguntas de LECTURA del documento que Claude leyó y no pudo
// sostener con una cita (o dijo que el documento no lo dice). NO se escriben en dudas-por-club.md: la
// lista es para que Guido decida. Con qué páginas se revisaron, para no volver a leerlas.
function modoDudas() {
  const reg = leerRegistro();
  let n = 0; let sinPreguntar = 0; let producto = 0;
  for (const e of [...reg.values()].sort((a, b) => a.carpeta.localeCompare(b.carpeta))) {
    for (const q of e.preguntas || []) {
      if (q.clase === 'producto') { producto++; continue; }
      if (!q.claude) { sinPreguntar++; continue; }
      if (!q.candidataDudas) continue;
      n++;
      console.log(`\n${e.carpeta}  (${e.clubId}, documento ${e.documento})`);
      console.log(`  ? ${q.campo}: ${q.pregunta}`);
      console.log(`    Claude (${e.claude && e.claude.modelo}): ${q.claude.valor || '(sin valor)'} — ${q.claude.respuesta || ''} [confianza ${q.claude.confianza}; ${q.claude.motivoNoResuelta}]`);
      for (const c of q.claude.citas || []) console.log(`      cita pág. ${c.pagina} ${c.ok ? 'VERIFICADA' : 'NO verificada (' + c.motivo + ')'}: "${String(c.texto).slice(0, 160)}"`);
      console.log(`    Páginas revisadas: ${e.claude && e.claude.entero ? 'el documento entero' : (e.claude && e.claude.paginasEnviadas || []).join(', ')}`);
    }
  }
  console.log(`\n${n} preguntas candidatas a Admin/dudas-por-club.md (NO se escribieron: decide Guido). Además: ${sinPreguntar} de documento todavía sin preguntar a Claude (correr --todos --claude) y ${producto} de producto (las decide Guido, no un club).`);
}

// ============================================================================
// BACKTEST: las mismas preguntas a clubes que YA están en el sitio, contra lo cargado
// ============================================================================
function cargarDatosSitio() {
  const sandbox = { console: { log() {}, warn() {}, error() {} } }; sandbox.window = sandbox; sandbox.globalThis = sandbox;
  sandbox.document = { createElement() { return {}; }, head: { appendChild() {} } };
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/club-leagues.js', ...readdirSync(resolve(ROOT, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const f of files) { try { vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx, { filename: f }); } catch { /* un archivo roto no frena el backtest */ } }
  return vm.runInContext('({ clubs, sources, generic: window.CLUB_GENERIC_DATA || {} })', ctx);
}

// Perímetro "verdadero" de lo cargado: no hay un campo, está en la nota de la fuente o en la cabecera
// del data file. Heurística por palabras; lo que no se puede decidir queda "?" y no cuenta para el acierto.
function perimetroCargado(nota) {
  const t = norm(nota || '');
  const cons = /consolidad|consolidated|koncern|konzern|konsern|grupo consolidado|group accounts|\bgrupo\b/.test(t);
  const ind = /individual|moderselskab|morselskap|no el grupo|no del grupo|no consolidad|separate|company only|sociedad (anonima )?deportiva sola|la sociedad|einzelabschluss|enkelvoudig/.test(t);
  if (cons && !/no del koncern|no el koncern|no el consolidado|no del consolidado|no del grupo|no el grupo/.test(t) && !ind) return 'consolidado';
  if (ind && !cons) return 'individual';
  if (/no del koncern|no el koncern|no el consolidado|no del consolidado|no del grupo|no el grupo/.test(t)) return 'individual';
  if (cons && ind) return '?';
  return 'individual?'; // sin mención: casi siempre un club-asociación sin grupo (una sola entidad)
}

// Perímetro revisado A MANO donde la heurística de palabras de perimetroCargado() se equivoca (leyendo la
// cabecera del data file y la nota de la fuente, 2026-09-30):
//   fckobenhavn-dk 2024: la nota dice "distinta de la holding consolidada PARKEN (no cargada)": se cargó la
//     entidad de fútbol sola, que NO consolida ("der ikke udarbejdet koncernregnskab") -> individual.
//   osijek-hr 2025: se cargó el informe COMBINADO (NK Osijek s.d.d. + FM 20 d.o.o. + la escuela) -> grupo.
const VERDAD_MANUAL = { 'fckobenhavn-dk|2024': { perimetro: 'individual' }, 'osijek-hr|2025': { perimetro: 'consolidado' } };
const notaFuente = (src) => `${src.title || ''} ${src.label || ''} ${src.note || ''}`;
// Lo cargado en el sitio para ese club-año, en el mismo formato que las respuestas de Claude.
function verdadCargada(club, meta, y, nota) {
  const [mm] = String(club.fiscalYearStart || '07-01').split('-').map(Number);
  const mesCierre = mm === 1 ? 12 : mm - 1; // convención del sitio: el año del ejercicio es el de CIERRE
  return {
    perimetro: perimetroCargado(nota), reportType: meta.reportType,
    cierre: `${y}-${pad2(mesCierre)}-${pad2(ultimoDia(y, mesCierre))}`,
    moneda: meta.currency || club.reportingCurrency, name: club.name,
  };
}
// Nombre: sin mayúsculas, acentos, espacios ni puntuación ("Cruzados SADP" = "Cruzados S.A.D.P."), y vale
// que uno contenga al otro ("Club Atlético Vélez Sarsfield Asociación Civil" contiene al del sitio).
// Perímetro: "individual?" (la fuente no dice nada: club de una sola entidad) cuenta como individual; "?" no cuenta.
function aciertoBacktest(tipo, valor, v) {
  if (tipo === 'name') { const a = norm(valor).replace(/[^a-z0-9]+/g, ''); const b = norm(v).replace(/[^a-z0-9]+/g, ''); return !!a && (a === b || a.includes(b) || b.includes(a)); }
  if (tipo === 'perimetro') return v === '?' ? null : valor === v.replace('?', '');
  return valor === v;
}

// Recalcula el acierto de todo Admin/altas-claude/backtest.jsonl con la verdad ACTUAL (gratis, sin API):
// así un arreglo de la heurística de la verdad no obliga a volver a pagar las llamadas.
function modoInformeBacktest() {
  const datos = cargarDatosSitio();
  const p = resolve(ROOT, 'Admin/altas-claude/backtest.jsonl');
  const filas = readFileSync(p, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const vistos = new Map(); for (const f of filas) vistos.set(`${f.md}|${f.modelo}`, f); // la última corrida de cada documento
  const por = {}; let citas = 0; let citasOk = 0; let costo = 0; const malas = [];
  for (const f of vistos.values()) {
    costo += f.costUsd || 0;
    const club = datos.clubs[f.clubId]; const meta = datos.generic[f.clubId].fiscalYearMeta[f.anio];
    const v = { ...verdadCargada(club, meta, f.anio, notaFuente((datos.sources || {})[meta.sourceId] || {})), ...(VERDAD_MANUAL[`${f.clubId}|${f.anio}`] || {}) };
    for (const x of f.filas) {
      const a = aciertoBacktest(x.tipo, x.valor, v[x.tipo]);
      const t = (por[x.tipo] ??= { n: 0, resueltas: 0, resueltasBien: 0, resueltasSinVerdad: 0, abiertas: 0, abiertasBien: 0 });
      t.n++;
      if (x.resuelta) { t.resueltas++; if (a === true) t.resueltasBien++; else if (a === null) t.resueltasSinVerdad++; else malas.push(`${f.clubId} ${f.anio} ${x.tipo}: claude=${JSON.stringify(x.valor)} cargado=${JSON.stringify(v[x.tipo])}`); }
      else { t.abiertas++; if (a) t.abiertasBien++; }
      for (const c of x.citas || []) { citas++; if (c.ok) citasOk++; }
    }
  }
  console.log(`Backtest: ${vistos.size} club-años, US$ ${costo.toFixed(3)} (US$ ${(costo / vistos.size).toFixed(4)} por club-año). Citas verificadas: ${citasOk}/${citas}.`);
  let R = 0; let RB = 0; let N = 0;
  for (const [k, t] of Object.entries(por)) {
    R += t.resueltas; RB += t.resueltasBien; N += t.n;
    console.log(`  ${k.padEnd(11)} resueltas ${t.resueltas}/${t.n}; de esas bien ${t.resueltasBien}/${t.resueltas - t.resueltasSinVerdad}${t.resueltasSinVerdad ? ` (+${t.resueltasSinVerdad} sin verdad)` : ''}; abiertas ${t.abiertas} (${t.abiertasBien} habrían estado bien)`);
  }
  console.log(`  TOTAL      resueltas ${R}/${N}; bien ${RB}`);
  if (malas.length) { console.log('Resueltas que NO coinciden con lo cargado (revisar a mano: puede estar mal Claude o la vara):'); for (const m of malas) console.log('  ' + m); }
}

async function modoBacktest() {
  const datos = cargarDatosSitio();
  const est = estadoTranscripciones();
  const { clubDeRuta } = await import('./carpetas-clubes.mjs');
  const cand = [];
  for (const [md, estado] of est) {
    if (estado !== 'cargado') continue;
    const abs = resolve(ROOT, md); if (!existsSync(abs)) continue;
    const cr = clubDeRuta(md); if (!cr.clubId) continue;
    const club = datos.clubs[cr.clubId]; const g = datos.generic[cr.clubId]; if (!club || !g) continue;
    const y = anioDelNombre(basename(md)); const meta = y && g.fiscalYearMeta && g.fiscalYearMeta[y]; if (!meta || !meta.reportType) continue;
    const tam = statSync(abs).size; if (tam < 8000 || tam > 600000) continue;
    const txt = readFileSync(abs, 'utf8'); if (paginasDe(txt).length < 3) continue;
    const src = (datos.sources || {})[meta.sourceId] || {};
    // Qué documentos cita la fuente de ese año: el .md tiene que ser ESE (no otro documento del mismo año).
    const citaDoc = JSON.stringify(src).includes(basename(md, '.md')) || JSON.stringify(src).includes(basename(md).replace(/\.md$/, '.pdf'));
    cand.push({ md, clubId: cr.clubId, country: club.country, y, meta, club, nota: notaFuente(src), citaDoc, tam });
  }
  // Uno por país (el de sourceId que cita el documento, si hay), orden estable por sha1 para no elegir a mano.
  const porPais = new Map();
  for (const c of cand.sort((a, b) => (b.citaDoc - a.citaDoc) || sha1(a.md).localeCompare(sha1(b.md)))) if (!porPais.has(c.country)) porPais.set(c.country, c);
  const saltear = Number(flagVal('--saltear') || 0);
  const sel = [...porPais.values()].sort((a, b) => sha1(a.md).localeCompare(sha1(b.md))).slice(saltear, saltear + (LIMITE ?? 5));
  const outDir = resolve(ROOT, 'Admin/altas-claude'); mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'backtest.jsonl');
  let costo = 0;
  for (const c of sel) {
    if (costo >= TOPE_USD) { console.error(`Tope de gasto alcanzado (US$ ${TOPE_USD}).`); break; }
    const verdad = verdadCargada(c.club, c.meta, c.y, c.nota);
    const pregs = [
      { id: 'perimetro', tipo: 'perimetro', texto: '¿Qué estados carga el sitio como "el club": los individuales o los consolidados?' },
      { id: 'reportType', tipo: 'reportType', texto: '¿Qué tipo de documento es?' },
      { id: 'cierre', tipo: 'cierre', texto: '¿Cuál es la fecha de cierre del ejercicio que presenta el documento?' },
      { id: 'moneda', tipo: 'moneda', texto: '¿En qué moneda están expresados los importes?' },
      { id: 'name', tipo: 'name', texto: '¿Cuál es el nombre legal completo de la entidad que emite los estados?' },
    ];
    const res = await preguntarAClaude({ md: readFileSync(resolve(ROOT, c.md), 'utf8'), preguntas: pregs, modelo: MODELO, tarea: 'alta-club-backtest', ctx: { carpeta: dirname(c.md).replace(/^Clubes\//, ''), documento: basename(c.md), pais: c.country } });
    costo += res.costUsd || 0;
    const filas = res.respuestas.map((x) => {
      const v = verdad[x.tipo];
      const acierto = aciertoBacktest(x.tipo, x.valor, v);
      return { tipo: x.tipo, valor: x.valor, verdad: v, acierto, resuelta: x.resuelta, confianza: x.confianza, motivoNoResuelta: x.motivoNoResuelta, citas: x.citas.map((q) => ({ pagina: q.pagina, ok: q.ok, motivo: q.motivo, texto: q.texto.slice(0, 160) })) };
    });
    appendFileSync(outPath, JSON.stringify({ ts: new Date().toISOString(), md: c.md, clubId: c.clubId, anio: c.y, modelo: res.model || MODELO, costUsd: res.costUsd, paginasEnviadas: res.paginasEnviadas, entero: res.entero, error: res.error, filas }) + '\n');
    console.log(`${c.clubId} ${c.y} (${c.md}) $${(res.costUsd || 0).toFixed(4)}${res.error ? ' ERROR ' + res.error : ''}`);
    for (const f of filas) console.log(`   ${f.tipo.padEnd(10)} ${f.resuelta ? 'RESUELTA ' : 'abierta  '} ${f.acierto === null ? '  ?' : f.acierto ? ' ok' : 'MAL'}  claude=${JSON.stringify(f.valor)} cargado=${JSON.stringify(f.verdad)}${f.resuelta ? '' : '  (' + f.motivoNoResuelta + ')'}`);
  }
  console.log(`\nCosto de esta corrida: US$ ${costo.toFixed(3)}. Detalle en Admin/altas-claude/backtest.jsonl (se agrega, no se pisa).`);
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  if (BACKTEST) return modoBacktest();
  if (ARGS.includes('--informe-backtest')) return modoInformeBacktest();
  if (DUDAS) return modoDudas();
  if (TODOS) return modoTodos();
  if (RESUMEN && !DOCS.length) return imprimirResumen();
  if (!DOCS.length) {
    console.error('Uso: node tools/alta-club.mjs "<Clubes/País/Club/doc.pdf|.md>" [--anio N] [--escribir] [--claude] [--anotar-misses]\n     node tools/alta-club.mjs --todos [--claude] [--tope-usd 1] [--limit N] [--solo <texto>] [--forzar]\n     node tools/alta-club.mjs --resumen | --dudas | --backtest-claude [--limit 5] [--saltear N]');
    process.exit(1);
  }
  if (ESCRIBIR && DOCS.length > 1) { console.error('--escribir va de a un documento por vez.'); process.exit(1); }
  const sitio = cargarSitioCache();
  const previo = leerRegistro();
  const resultados = []; const entradas = [];
  for (const d of DOCS) {
    const r0 = analizar(d, sitio);
    if (r0.error && !r0.carpeta) { resultados.push(r0); continue; }
    const [, paisCarpeta, clubCarpeta] = (r0.carpeta || '').split('/');
    if (!paisCarpeta || clubCarpeta.startsWith('_')) { resultados.push(r0); continue; }
    // El registro se actualiza SIEMPRE (pedido de Guido: que lo haga el script, no quien lo corre).
    const x = analizarCarpeta(paisCarpeta, clubCarpeta, sitio, previo.get(r0.carpeta), r0.md || r0.documento);
    let entrada = x.entrada;
    if (x.pendienteClaude && CLAUDE) {
      const { resultados: rs } = await correrClaude([x.pendienteClaude]);
      if (rs[0]) entrada = finalizar({ ...x.pendienteClaude, claude: rs[0].claude });
    }
    entradas.push(entrada);
    // Lo que se imprime/escribe es el análisis CON las respuestas verificadas de Claude aplicadas.
    const ov = entrada.claude ? aplicables(entrada.claude.respuestas, r0) : {};
    resultados.push(Object.keys(ov).length ? analizar(r0.documento, sitio, ov) : r0);
  }
  if (entradas.length) guardarEnRegistro(entradas);

  if (RESUMEN) {
    for (const r of resultados) {
      if (r.error) { console.log(`ERROR  ${r.documento}: ${r.error}`); continue; }
      const quien = r.club.existe ? `YA EXISTE (${r.club.clubId})` : (r.campos.find((c) => c.campo === 'id') || {}).valor;
      console.log(`${String(r.resumen.pctOk).padStart(3)}% ok  ${r.resumen.ok}/${r.resumen.campos} (${r.resumen.pregunta} preg, ${r.resumen.pendiente} pend)  ${quien}  <- ${r.documento}`);
      for (const p of r.preguntas) console.log(`         ? ${p.campo}: ${p.pregunta}`);
    }
    return;
  }
  if (!ESCRIBIR) { console.log(JSON.stringify(resultados.length === 1 ? resultados[0] : resultados, null, 2)); return; }

  const r = resultados[0];
  if (r.error) { console.log(JSON.stringify(r, null, 2)); console.error(`\nNo se escribe nada: ${r.error}`); process.exit(1); }
  if (r.club.existe) { console.log(JSON.stringify(r, null, 2)); console.error(`\nNo se escribe nada: el club ya existe (${r.club.clubId}). El alta es solo para clubes nuevos; el ejercicio lo carga la etapa de carga.`); process.exit(1); }
  if (r.resumen.pregunta > 0) {
    console.log(JSON.stringify(r, null, 2));
    console.error(`\nNo se escribe nada: quedan ${r.resumen.pregunta} pregunta(s):`);
    for (const p of r.preguntas) console.error(`  - ${p.campo}: ${p.pregunta}`);
    process.exit(1);
  }
  const res = escribir(r);
  console.log(JSON.stringify({ ...r, escritura: res }, null, 2));
  if (!res.ok) { console.error(`\nAlta REVERTIDA: ${res.motivo}`); process.exit(1); }
  console.error(`\nAlta escrita (${res.escritos.join(', ')}). Auditoría: ${res.audit}. No se commiteó nada.`);
}

// Solo corre como comando: importado (pipeline.mjs --resumen importa resumenAltas) no hace nada.
if (import.meta.url === `file://${process.argv[1]}`) await main();
