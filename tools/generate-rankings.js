#!/usr/bin/env node
// ============================================================================
// tools/generate-rankings.js — precalcula el ranking de ingresos de cada
// liga-ejercicio y lo escribe en `data/rankings/<liga>.js`, uno por liga.
//
// EL PROBLEMA QUE RESUELVE. Un ranking de liga necesita el ingreso de los N
// clubes que la integraron ESE ejercicio, y esos números viven en los
// `data/<club>-data.js`, que el sitio carga POR DEMANDA justamente para no
// pagar 41 archivos por visita. Calcularlo en vivo cuesta, medido archivo por
// archivo el 2026-09-22:
//
//     jp-j1 2025      10 clubes    41 KB crudo     18 KB gzip
//     es-laliga 2025   9 clubes    83 KB crudo     29 KB gzip
//     ar-primera 2024  8 clubes   496 KB crudo    101 KB gzip
//
// Los argentinos pesan porque Racing trae 16 ejercicios y Vélez otros tantos:
// un ranking usa UNO y se bajaría todos. Y el costo se paga de nuevo en cada
// liga que el visitante mire.
//
// PERO EL ARGUMENTO DECISIVO NO ES LA VISTA DE LIGA, ES INICIO (to-do 33): la
// vista de liga está detrás de un click, o sea que el visitante la pidió; el
// ranking de Inicio lo paga TODO visitante, incluido el que rebota. Hoy el
// sitio no carga ni un solo `data/<club>-data.js` de forma eager, y eso es un
// logro explícito de la arquitectura (ver ESTADO.md). Un ranking en vivo en
// Inicio lo rompe.
//
// POR QUÉ UN ARCHIVO POR LIGA y no uno solo: mismo patrón y mismo motivo que
// `data/club-leagues/<iso2>.js` (Versión 164). La vista de la pestaña Ligas
// baja EXACTAMENTE la liga que se está mirando, y el día que haya 200 ligas no
// hay que re-particionar nada. Hoy los 8 archivos juntos son ~3 KB gzip.
//
// LO QUE ESTE ARCHIVO ES, Y LO QUE NO ES. Es una VISTA de los datos, como
// `data/club-index.js`: todo lo que imprime sale de `computeYearGeneric()` y
// `simplifiedReportForClub()`, el MOTOR REAL. No reimplementa ni una cuenta.
// Pero a diferencia de `club-index.js`, que copia metadatos, este copia
// NÚMEROS — o sea que es una segunda verdad sobre plata, que es lo más
// peligroso que este proyecto puede tener suelto. El seguro es `--check`
// corriendo dentro de `node tools/audit.js` como P1: si alguien carga un
// balance y no regenera esto, la auditoría falla ANTES del push.
//
// POR QUÉ SE PUEDE PRECALCULAR SIN MENTIR: el ranking fuerza USD y Formato
// simplificado y lo dice en pantalla, igual que hace Comparar desde la Versión
// 148. O sea que no depende del toggle de moneda ni del de formato, que son las
// dos cosas que podrían cambiar debajo de un número congelado.
//
// EL ORDEN GUARDADO ES DESCENDENTE (el 1 del ranking primero), que es el orden
// de la TABLA. El gráfico de barras lo dibuja al revés, ascendente, que es un
// pedido explícito de Guido — pero eso es decisión de la vista, no del dato.
//
// USO:
//   node tools/generate-rankings.js           reescribe data/rankings/*.js
//   node tools/generate-rankings.js --check   no escribe; sale con código 1 si
//                                             algún archivo quedó desactualizado
//   node tools/generate-rankings.js --print   imprime el ranking en la terminal,
//                                             para verificarlo a ojo contra la fuente
// ============================================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'data/rankings');

// ---------------------------------------------------------------------------
// EL MOTOR. Mismo loader que `tools/audit.js`, y por el mismo motivo que está
// explicado allá: `computeYearGeneric()` lee `CLUB_GENERIC_DATA` SIN el prefijo
// `window.`, así que el objeto global del contexto tiene que ser su propio
// `window` para que el `window.X = ...` de cada data file cree también el global
// suelto que el motor busca.
// ---------------------------------------------------------------------------
function loadEngine() {
  const sandbox = { console };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);

  // Globals que `js/finanzas-calc.js` espera del <script> de index.html. Los
  // mismos valores que usa la auditoría. `toDisplayValue(v, meta, 'USD')` recibe
  // la moneda explícita, así que FX_RATE no entra en ninguna cuenta de acá: se
  // declara igual porque el archivo lo referencia al cargarse.
  vm.runInContext('var FX_RATE = 1450; var currentCurrency = "USD"; var simplifyFormat = true;',
    ctx, { filename: 'globals-de-index.html' });

  const files = [
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js',
    'data/sources-view.js', 'data/site-labels.js', 'data/leagues.js',
    'data/club-leagues.js',
    ...fs.readdirSync(path.join(ROOT, 'data/club-leagues')).filter(f => f.endsWith('.js')).sort()
      .map(f => 'data/club-leagues/' + f),
    ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js')).sort()
      .map(f => 'data/' + f),
    'js/finanzas-calc.js',
  ];
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) throw new Error(`Falta ${rel}`);
    try { vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: rel }); }
    catch (e) { throw new Error(`No se pudo cargar ${rel}: ${e.message}`); }
  }

  return vm.runInContext(`({
    computeYearGeneric, toDisplayValue, yearMetaFor, simplifiedReportForClub,
    clubs, LEAGUES,
    clubsOfLeagueYear, leagueYears, leagueSizeAt,
  })`, ctx, { filename: 'leer-globals' });
}

// Redondeo a 3 decimales. Guardar el número completo engorda el archivo sin que
// se note en pantalla (el sitio muestra 1 decimal); guardar 1 decimal haría que
// la suma de las filas no diera el total. Con 3, el error de una liga de 20
// clubes es menor a 0,01 M USD, o sea invisible a 1 decimal.
function r3(v) { return Math.round(v * 1000) / 1000; }

// ---------------------------------------------------------------------------
// EL RANKING DE UNA LIGA-EJERCICIO.
//
// `clubsOfLeagueYear()` es el ÚNICO camino válido para preguntar quiénes
// integraron una liga: es la regla de `data/club-leagues.js`, y la versión sin
// año (`clubsOfLeague()`) mezclaría temporadas distintas en el mismo ranking.
// ---------------------------------------------------------------------------
function rankingDe(api, leagueId, year) {
  const ids = api.clubsOfLeagueYear(leagueId, year);
  const filas = [];
  const sinDato = [];

  for (const id of ids) {
    const c = api.computeYearGeneric(id, year);
    const meta = api.yearMetaFor(id, year);
    // Un club sin ejercicio calculable, o con ingreso 0, NO entra al ranking con
    // una barra en cero: queda contado aparte. Es la misma regla que ya usa
    // Comparar ("un club sin el dato no suma cero: queda afuera y se cuenta
    // aparte") y la que Swiss Ramble escribe como "rankings have only been
    // applied where data is available".
    if (!c || !meta) { sinDato.push(id); continue; }
    const revenue = api.toDisplayValue(c.revenue, meta, 'USD');
    if (!revenue) { sinDato.push(id); continue; }

    const rep = api.simplifiedReportForClub(id, year) || {};
    // OJO CON EL FILTRO: se descartan los CEROS exactos (una fila en 0 no dibuja
    // ningún segmento), pero NO los negativos. Tres clubes los tienen, y es un
    // dato real, no un artefacto: Botafogo 2024, Cruzeiro 2025 y Envigado 2025
    // reportan ingreso BRUTO y después una línea de deducciones
    // ("Deduções sobre a receita", "Impostos e contribuições", "Devoluciones,
    // rebajas y descuentos"), que cae en el catch-all y lo deja en negativo.
    // Filtrando por `> 0` —que es lo que hacía la primera versión de este
    // script, y lo que sigue haciendo `mezclaDe()` en js/selector.js— la
    // composición de Cruzeiro sumaba 119,7 M USD contra un total declarado de
    // 114,1: el gráfico se contradecía con su propio total Y escondía una
    // deducción de 5,6 M USD. Lo caza el invariante de más abajo.
    const mix = (rep.ingresos || [])
      .map(row => [row.label, api.toDisplayValue(row.value, meta, 'USD')])
      .filter(row => row[1] !== 0)
      .map(row => [row[0], r3(row[1])]);

    // EL INVARIANTE: la composición tiene que sumar el ingreso. Si no cierra, el
    // gráfico apilado va a mostrar segmentos que no dan el total que el mismo
    // gráfico anuncia, que es exactamente el tipo de número mal publicado que
    // este proyecto no se puede permitir. Se ABORTA en vez de escribir un
    // archivo a medias — mismo criterio que usaban los generadores de
    // Prototyping/, y el motivo por el que aquel error se vio enseguida.
    const sumaMix = mix.reduce((a, m) => a + m[1], 0);
    if (Math.abs(sumaMix - revenue) > 0.02) {
      throw new Error(`${id} ${year}: la composición simplificada suma ${sumaMix.toFixed(3)} M USD `
        + `pero computeYearGeneric() da ${revenue.toFixed(3)} M USD. El ranking no se genera con un `
        + `desglose que no cierra contra su propio total.`);
    }

    filas.push({
      id,
      revenue: r3(revenue),
      // OJO: `reportType`, `sourceId` y `yearLabel` salen de `c.meta` y de `c`,
      // NO de `yearMetaFor()`. Ese helper devuelve SOLO moneda y tipo de cambio
      // (currency, fx, fxSource, fxLabel, fxRef) — leerle `reportType` da
      // undefined en silencio, y el `yearLabel` sale mal: los 82 ejercicios que
      // son `official_balance_sheet` quedaban etiquetados "Ejercicio 2023/2024"
      // en vez de "Balance 2023/2024" (bug real de esta sesión, cazado al
      // comparar la salida de `--print` contra la ficha de Finanzas).
      //
      // El tipo de documento viaja para que la vista pueda avisar que un
      // ejercicio es un PRESUPUESTO (una proyección del club) y no un cierre.
      reportType: c.meta.reportType || null,
      sourceId: c.meta.sourceId || null,
      // La etiqueta la escribe el MOTOR (`ejercicioLabel()`, vía
      // `computeYearGeneric()`), no este script: un club de año calendario dice
      // "Balance 2025" y uno de ejercicio partido "Balance 2024/2025". Guardar
      // el año pelado obligaría a la vista a reimplementar esa regla.
      yearLabel: c.yearLabel,
      mix,
    });
  }

  if (!filas.length) return null;
  // Descendente: el 1 del ranking primero. Desempate por id, para que el archivo
  // generado sea estable entre corridas (dos clubes con el mismo ingreso no
  // pueden alternar de lugar y ensuciar un diff).
  filas.sort((a, b) => (b.revenue - a.revenue) || a.id.localeCompare(b.id));

  const out = {
    // `leagueSizeAt()` devuelve null en la mayoría de las liga-temporadas: nadie
    // las verificó. El null viaja tal cual, y la vista NO puede escribir un "de
    // M" sin él. Rellenarlo con "los que tenemos cargados" sería exactamente el
    // dato inventado que `data/club-leagues.js` existe para no inventar.
    leagueSize: api.leagueSizeAt(leagueId, year),
    clubs: filas,
  };
  if (sinDato.length) out.sinDato = sinDato.sort();
  return out;
}

// ---------------------------------------------------------------------------
// EL ARCHIVO DE UNA LIGA.
// ---------------------------------------------------------------------------
function archivoDe(api, leagueId, porAnio) {
  const lg = api.LEAGUES[leagueId] || {};
  const anios = Object.keys(porAnio).map(Number).sort((a, b) => b - a);
  const L = [];
  L.push('// ============================================================================');
  L.push(`// data/rankings/${leagueId}.js — GENERADO por tools/generate-rankings.js.`);
  L.push('// NO EDITAR A MANO: se sobrescribe. Para cambiar un número hay que cambiar el');
  L.push('// `data/<club>-data.js` que lo origina y volver a correr el generador.');
  L.push('//');
  L.push(`// ${lg.name || leagueId} (${lg.country || '??'}) — ${anios.length} ejercicio(s) con ranking:`);
  anios.forEach(y => {
    const r = porAnio[y];
    const m = r.leagueSize == null ? 'sin verificar cuántos equipos tuvo' : `de ${r.leagueSize}`;
    L.push(`//   ${y}: ${r.clubs.length} club(es) cargado(s), ${m}.`);
  });
  L.push('//');
  L.push('// Ingresos en MILLONES DE USD, convertidos con el tipo de cambio de cada');
  L.push('// documento (ver `fxSource`/`fxRef` en el archivo de cada club) y agrupados en');
  L.push('// Formato simplificado. Orden DESCENDENTE: el 1 del ranking primero.');
  L.push('// ============================================================================');
  L.push('window.RANKINGS = window.RANKINGS || {};');
  L.push(`window.RANKINGS[${JSON.stringify(leagueId)}] = {`);
  anios.forEach(y => {
    const r = porAnio[y];
    L.push(`  ${y}: {`);
    L.push(`    leagueSize: ${r.leagueSize == null ? 'null' : r.leagueSize},`);
    if (r.sinDato) L.push(`    sinDato: ${JSON.stringify(r.sinDato)},`);
    L.push('    clubs: [');
    r.clubs.forEach(f => {
      L.push(`      { id:${JSON.stringify(f.id)}, revenue:${f.revenue}, reportType:${JSON.stringify(f.reportType)},`);
      L.push(`        sourceId:${JSON.stringify(f.sourceId)}, yearLabel:${JSON.stringify(f.yearLabel)},`);
      L.push(`        mix:[${f.mix.map(m => `[${JSON.stringify(m[0])},${m[1]}]`).join(',')}] },`);
    });
    L.push('    ],');
    L.push('  },');
  });
  L.push('};');
  L.push('');
  return L.join('\n');
}

// ---------------------------------------------------------------------------
function main() {
  const check = process.argv.includes('--check');
  const print = process.argv.includes('--print');
  const api = loadEngine();

  // Qué ligas y qué ejercicios: TODOS los que tengan al menos un club con
  // ingreso calculable. El filtro de "cuáles vale la pena mostrar" NO es
  // problema del generador — es de `data/destacados.js` (la lista curada de
  // Inicio) y de la vista. Un ranking de 1 club se genera igual: la pestaña
  // Ligas tiene que poder contestar por cualquier liga que el selector ofrezca.
  const porLiga = {};
  for (const leagueId of Object.keys(api.LEAGUES)) {
    const porAnio = {};
    for (const y of api.leagueYears(leagueId)) {
      const r = rankingDe(api, leagueId, y);
      if (r) porAnio[y] = r;
    }
    if (Object.keys(porAnio).length) porLiga[leagueId] = porAnio;
  }

  if (print) {
    for (const leagueId of Object.keys(porLiga)) {
      for (const y of Object.keys(porLiga[leagueId]).map(Number).sort((a, b) => b - a)) {
        const r = porLiga[leagueId][y];
        const lg = api.LEAGUES[leagueId];
        console.log(`\n${lg.name} (${leagueId}) ${y} — ${r.clubs.length} de ${r.leagueSize == null ? '?' : r.leagueSize}`);
        let tot = 0;
        r.clubs.forEach((f, i) => {
          tot += f.revenue;
          console.log(`${String(i + 1).padStart(3)} ${api.clubs[f.id].displayName.padEnd(24)} ${f.revenue.toFixed(1).padStart(9)} M USD  ${f.yearLabel}`);
        });
        console.log(`    TOTAL de los cargados: ${tot.toFixed(1)} M USD`);
      }
    }
    return;
  }

  if (!fs.existsSync(OUT_DIR)) {
    if (check) { console.error('data/rankings/ no existe. Corré: node tools/generate-rankings.js'); process.exit(1); }
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const esperados = new Set(Object.keys(porLiga).map(l => l + '.js'));
  const enDisco = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.js'));
  const desfasados = [];

  for (const leagueId of Object.keys(porLiga)) {
    const destino = path.join(OUT_DIR, leagueId + '.js');
    const nuevo = archivoDe(api, leagueId, porLiga[leagueId]);
    const viejo = fs.existsSync(destino) ? fs.readFileSync(destino, 'utf8') : null;
    if (viejo === nuevo) continue;
    if (check) { desfasados.push('data/rankings/' + leagueId + '.js'); continue; }
    fs.writeFileSync(destino, nuevo, 'utf8');
    console.log((viejo === null ? 'nuevo    ' : 'actualiza') + '  data/rankings/' + leagueId + '.js');
  }

  // Una liga que dejó de tener clubes cargados tiene que perder su archivo: si
  // no, Netlify lo sigue sirviendo y la vista puede pedirlo y dibujar un ranking
  // de clubes que ya no están. Mismo criterio que `generate-fuentes-page.js`,
  // que borra la página de un club que deja de existir.
  for (const f of enDisco) {
    if (esperados.has(f)) continue;
    if (check) { desfasados.push('data/rankings/' + f + ' (sobra)'); continue; }
    fs.unlinkSync(path.join(OUT_DIR, f));
    console.log('borra      data/rankings/' + f);
  }

  if (check) {
    if (desfasados.length) {
      console.error('Rankings desactualizados:\n  ' + desfasados.join('\n  ')
        + '\nCorré: node tools/generate-rankings.js');
      process.exit(1);
    }
    console.log('data/rankings/ al día (' + esperados.size + ' ligas).');
    return;
  }
  console.log(`Listo: ${esperados.size} ligas.`);
}

main();
