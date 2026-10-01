#!/usr/bin/env node
// ============================================================================
// tools/fetch-fx-reference.mjs — baja UNA VEZ la serie histórica completa de un
// tipo de cambio y la guarda local, para que `tools/lookup-fx-close.js` pueda
// resolver la cotización de cualquier fecha sin salir a buscar en la web (to-do
// 91, 2026-09-27).
//
// EL PROBLEMA QUE RESUELVE: cada club nuevo que no declara su propio `fx` en el
// documento dispara una búsqueda web puntual de la cotización de SU fecha de
// cierre (`club-data-mapping/SKILL.md` sección 5) — pasó de nuevo onboardeando
// Almagro, 6 búsquedas para 6 cierres de 31/10 que la serie histórica completa
// ya tiene todas juntas en un solo lugar.
//
// MONEDAS SOPORTADAS HOY (agregar otra es sumarle una entrada a CURRENCIES con
// su propia fuente, no hay una API única que sirva para todos los países; el
// detalle de qué tasa exacta es cada una está en el comentario de su entrada):
//   - ARS: API pública del BCRA (Comunicación A 3500 / "dólar mayorista").
//   - BRL: API pública del BCB, PTAX de cierre (venda).
//   - COP: API pública de datos.gov.co (dataset de la TRM, Banco de la
//     República / Superintendencia Financiera).
//   - NOK: Norges Bank, tipo medio (API SDMX pública).                [2026-09-30]
//   - CZK: Česká národní banka, fixing diario (year.txt).             [2026-09-30]
//   - CHF: Reserva Federal H.10 vía FRED (el SNB no publica serie
//     diaria descargable).                                              [2026-09-30]
//   - TRY: TCMB, döviz alış, un XML por día (EVDS pide key).          [2026-09-30]
//   - RUB: Banco de Rusia, tipo oficial (XML_dynamic).                [2026-09-30]
//   - UAH: Banco Nacional de Ucrania, tipo oficial.                   [2026-09-30]
//   - KRW: Reserva Federal H.10 vía FRED (ECOS del Banco de Corea
//     pide key).                                                        [2026-09-30]
//   - CLP: dólar observado (Banco Central de Chile) tal como lo publica
//     el SII, el fisco chileno; la API del BCCh y la de la CMF piden
//     usuario/key.                                                      [2026-10-01]
// Todas son endpoints públicos sin API key, pensados para descarga. Ninguna es
// una tasa cruzada vía EUR: todas cotizan directo contra el USD.
// ARS/BRL/COP verificadas 2026-09-27 dígito por dígito contra los valores YA
// cargados a mano en FX_CLOSE (data/currency-map.js) para Almagro (ARS),
// y para BRL/COP contra las entradas ya existentes de otros clubes — coincide
// exacto en todos los casos probados. Las 7 de 2026-09-30 no tenían todavía
// ningún club cargado ni entrada en FX_CLOSE contra qué comparar: se
// verificaron contra el tipo que declaran las transcripciones de Clubes/ (RUB:
// Krasnodar 2020 y 2021, exacto; TRY: Fenerbahçe 10/8/2020) y contra una
// segunda fuente independiente día por día (BCE cruzado, SNB fin de mes, ČNB) —
// ver el comentario de cada entrada para las diferencias esperables.
//
// ARQUITECTURA (ver to-do 91, Admin/TODO.md): esta serie completa NUNCA va a
// `data/currency-map.js` — ese archivo es eager, se baja en cada pageview del
// sitio, y `FX_CLOSE` tiene que seguir siendo la lista CURADA y chica de
// cotizaciones que algún club realmente usa. La serie completa vive acá, en
// `tools/fx-reference/`, fuera de lo que el sitio sirve — es insumo de
// onboarding, no dato de producción. Un archivo de este directorio nunca se
// referencia desde `data/` ni desde ningún `<script src>` del sitio.
//
// USO:
//   node tools/fetch-fx-reference.mjs                  baja/actualiza todas (las 11)
//   node tools/fetch-fx-reference.mjs --currency ARS   solo una
//   node tools/fetch-fx-reference.mjs --currency COP --from 2015-01-01
//   node tools/fetch-fx-reference.mjs --currency TRY --full   TRY desde cero
//
// No necesita ninguna API key (todos los endpoints son públicos). Volver a
// correrlo pisa el archivo con la serie más actualizada. Todas bajan en
// segundos salvo TRY: la primera vez son ~6.800 requests (~5 minutos); después
// solo pide los días que faltan (ver fetchTRY). CHF y KRW (FRED/H.10) llegan
// con ~1 semana de atraso: la Fed publica la H.10 los lunes.
// ============================================================================

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outDir = resolve(projectRoot, 'tools', 'fx-reference');

// --- ARS: BCRA, Comunicación A 3500 -----------------------------------------
async function fetchARS(from, to) {
  const series = {};
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const url = `https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD` +
      `?fechadesde=${from}&fechahasta=${to}&offset=${offset}&limit=${limit}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`BCRA API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const json = await resp.json();
    for (const row of json.results ?? []) {
      const det = (row.detalle ?? []).find((d) => d.codigoMoneda === 'USD');
      if (det) series[row.fecha] = det.tipoCotizacion;
    }
    const total = json.metadata?.resultset?.count ?? 0;
    offset += limit;
    process.stdout.write(`  ${Math.min(offset, total)}/${total}\r`);
    if (offset >= total) break;
  }
  console.log('');
  return series;
}

// --- BRL: BCB, PTAX de cierre (venda) ---------------------------------------
async function fetchBRL(from, to) {
  const series = {};
  const [fy, fm, fd] = from.split('-');
  const [ty, tm, td] = to.split('-');
  const dataInicial = `${fm}-${fd}-${fy}`;
  const dataFinal = `${tm}-${td}-${ty}`;
  let skip = 0;
  const top = 1000;
  for (;;) {
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)` +
      `?@dataInicial='${dataInicial}'&@dataFinalCotacao='${dataFinal}'&$format=json&$top=${top}&$skip=${skip}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`BCB API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const json = await resp.json();
    const rows = json.value ?? [];
    for (const row of rows) {
      const date = row.dataHoraCotacao.slice(0, 10);
      series[date] = row.cotacaoVenda;
    }
    process.stdout.write(`  +${rows.length} (skip=${skip})\r`);
    if (rows.length < top) break;
    skip += top;
  }
  console.log('');
  return series;
}

// --- COP: datos.gov.co, dataset de la TRM -----------------------------------
async function fetchCOP(from, to) {
  const series = {};
  const where = encodeURIComponent(`vigenciadesde between '${from}T00:00:00.000' and '${to}T00:00:00.000'`);
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const url = `https://www.datos.gov.co/resource/32sa-8pi3.json?$where=${where}&$order=vigenciadesde&$limit=${limit}&$offset=${offset}`;
    const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!resp.ok) throw new Error(`datos.gov.co API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const rows = await resp.json();
    for (const row of rows) {
      // vigenciadesde/vigenciahasta pueden abarcar varios días (fines de
      // semana/feriados): expandir a cada fecha del rango, así el lookup no
      // necesita reimplementar esta lógica de rango.
      let d = new Date(row.vigenciadesde.slice(0, 10) + 'T00:00:00Z');
      const end = new Date(row.vigenciahasta.slice(0, 10) + 'T00:00:00Z');
      while (d <= end) {
        series[d.toISOString().slice(0, 10)] = parseFloat(row.valor);
        d.setUTCDate(d.getUTCDate() + 1);
      }
    }
    process.stdout.write(`  +${rows.length} (offset=${offset})\r`);
    if (rows.length < limit) break;
    offset += limit;
  }
  console.log('');
  return series;
}

// --- Helpers compartidos por las fuentes agregadas el 2026-09-30 ------------
// fetch con reintentos (los portales de bancos centrales cortan de vez en
// cuando una conexión larga). Devuelve la Response; 404 se devuelve tal cual
// (para TCMB es "no hubo fixing ese día", no un error).
async function fetchRetry(url, opts = {}, tries = 4) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const resp = await fetch(url, { ...opts, headers: { 'User-Agent': 'Mozilla/5.0 (finance-of-sports fetch-fx-reference)', ...(opts.headers ?? {}) } });
      if (resp.ok || resp.status === 404) return resp;
      lastErr = new Error(`HTTP ${resp.status} en ${url}: ${(await resp.text()).slice(0, 200)}`);
    } catch (err) {
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
  }
  throw lastErr;
}

const ddmmyyyyToIso = (s) => { const [d, m, y] = s.split('.'); return `${y}-${m}-${d}`; };

// Serie de la Reserva Federal (H.10, "noon buying rates in New York") vía el
// CSV público de descarga de FRED (fredgraph.csv, sin API key). Los feriados
// de EE.UU. vienen como celda vacía o '.' y se descartan.
async function fetchFredH10(seriesId, from, to) {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}&cosd=${from}&coed=${to}`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`FRED HTTP ${resp.status} para ${seriesId}`);
  const series = {};
  for (const line of (await resp.text()).split('\n').slice(1)) {
    const [date, val] = line.trim().split(',');
    if (!date || !val || val === '.') continue;
    series[date] = parseFloat(val);
  }
  return series;
}

// --- NOK: Norges Bank ---------------------------------------------------------
async function fetchNOK(from, to) {
  const url = `https://data.norges-bank.no/api/data/EXR/B.USD.NOK.SP?format=csv&startPeriod=${from}&endPeriod=${to}&locale=en`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`Norges Bank HTTP ${resp.status}`);
  const lines = (await resp.text()).split('\n').filter(Boolean);
  const header = lines[0].split(';');
  const iDate = header.indexOf('TIME_PERIOD');
  const iVal = header.indexOf('OBS_VALUE');
  const series = {};
  for (const line of lines.slice(1)) {
    const cols = line.split(';');
    const v = parseFloat(cols[iVal]);
    if (cols[iDate] && Number.isFinite(v)) series[cols[iDate]] = v;
  }
  return series;
}

// --- CLP: dólar observado, publicado por el SII -----------------------------
// El Banco Central de Chile (API BDE, si3.bcentral.cl) y la CMF
// (api.cmfchile.cl) piden usuario / API key, así que NO se usan. El SII
// (Servicio de Impuestos Internos) publica el "dólar observado" que le informa
// el Banco Central, una página HTML por año, sin registro. Dos layouts:
//  - 2013 en adelante: sii.cl/valores_y_fechas/dolar/dolarAAAA.htm, un bloque
//    <div id='mes_<mes>'> por mes, con filas de 3 pares (día, valor), decimal
//    con punto, celdas vacías = día sin observado.
//  - hasta 2012: sii.cl/pagina/valores/dolar/dolarAAAA.htm, una grilla
//    día (filas 1-31) x mes (12 columnas), decimal con coma o con punto según
//    el año (2005 punto, 2010 coma).
const MESES_CL = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const clNum = (txt) => {
  const t = txt.replace(/&nbsp;|\s/g, '').replace(',', '.');
  const v = parseFloat(t);
  return /^[\d.]+$/.test(t) && Number.isFinite(v) && v > 0 ? v : null;
};
async function fetchCLP(from, to) {
  const series = {};
  for (let y = +from.slice(0, 4); y <= +to.slice(0, 4); y++) {
    const nuevo = y >= 2013;
    const url = nuevo
      ? `https://www.sii.cl/valores_y_fechas/dolar/dolar${y}.htm`
      : `https://www.sii.cl/pagina/valores/dolar/dolar${y}.htm`;
    const resp = await fetchRetry(url);
    if (resp.status === 404) continue; // año todavía sin página
    if (!resp.ok) throw new Error(`SII HTTP ${resp.status} para ${y}`);
    const html = new TextDecoder('latin1').decode(await resp.arrayBuffer());
    const put = (m, d, v) => {
      if (v === null) return;
      const iso = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (iso >= from && iso <= to) series[iso] = v;
    };
    if (nuevo) {
      MESES_CL.forEach((mes, i) => {
        const a = html.indexOf(`id='mes_${mes}'`);
        if (a < 0) return;
        const b = html.indexOf(`id='mes_`, a + 10);
        const bloque = html.slice(a, b < 0 ? undefined : b);
        const re = /<th[^>]*><strong>(\d+)<\/strong><\/th>\s*<td[^>]*>([^<]*)<\/td>/g;
        let m;
        while ((m = re.exec(bloque))) put(i + 1, +m[1], clNum(m[2]));
      });
    } else {
      const re = /<th id='f(\d+)'[^>]*>\d+<\/th>([\s\S]*?)<\/tr>/g;
      let m;
      while ((m = re.exec(html))) {
        const celdas = [...m[2].matchAll(/<td[^>]*>([^<]*)<\/td>/g)].map((c) => c[1]);
        celdas.forEach((c, i) => put(i + 1, +m[1], clNum(c)));
      }
    }
  }
  if (!Object.keys(series).length) throw new Error('SII: no se pudo leer ninguna cotización (¿cambió el HTML?)');
  return series;
}

// --- CZK: Česká národní banka, fixing diario --------------------------------
// Un archivo year.txt por año. OJO: dentro de un mismo año la línea de
// cabecera ("Date|1 AUD|...") puede repetirse con otro set de columnas cuando
// cambia la canasta de monedas (pasó con la llegada del euro), así que la
// posición de "1 USD" se recalcula en cada cabecera en vez de fijarla una vez.
async function fetchCZK(from, to) {
  const series = {};
  for (let y = +from.slice(0, 4); y <= +to.slice(0, 4); y++) {
    const url = `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/year.txt?year=${y}`;
    const resp = await fetchRetry(url);
    if (!resp.ok) throw new Error(`ČNB HTTP ${resp.status} para ${y}`);
    let iUsd = -1;
    let unit = 1;
    for (const line of (await resp.text()).split('\n')) {
      const cols = line.trim().split('|');
      if (cols[0] === 'Date') {
        iUsd = cols.findIndex((c) => /^\d+ USD$/.test(c));
        unit = iUsd >= 0 ? parseInt(cols[iUsd], 10) : 1;
        continue;
      }
      if (iUsd < 0 || !/^\d{2}\.\d{2}\.\d{4}$/.test(cols[0])) continue;
      const v = parseFloat(cols[iUsd]);
      const iso = ddmmyyyyToIso(cols[0]);
      if (Number.isFinite(v) && iso >= from && iso <= to) series[iso] = +(v / unit).toFixed(6);
    }
    process.stdout.write(`  ${y}\r`);
  }
  console.log('');
  return series;
}

// --- CHF y KRW: Reserva Federal H.10 (ver comentario en CURRENCIES) ----------
const fetchCHF = (from, to) => fetchFredH10('DEXSZUS', from, to);
const fetchKRW = (from, to) => fetchFredH10('DEXKOUS', from, to);

// --- TRY: TCMB, "gösterge niteliğindeki" kurlar, un XML por día hábil ----------
// Es el camino más lento (un request por día, ~6.800 para 2000-hoy) porque EVDS
// (la API de series del TCMB) pide API key y el requisito es no depender de
// ninguna. Para no volver a bajar 26 años cada vez que se corre, reusa lo que
// ya esté en tools/fx-reference/try-usd.json y solo pide los días que faltan
// (--full fuerza a bajar todo de nuevo). Sábados/domingos no se piden (el
// TCMB no publica); un feriado devuelve 404 y simplemente no entra en la serie.
async function fetchTRY(from, to) {
  const existingPath = resolve(outDir, 'try-usd.json');
  const series = {};
  const full = process.argv.includes('--full');
  if (!full && existsSync(existingPath)) Object.assign(series, JSON.parse(readFileSync(existingPath, 'utf8')).series);
  const todo = [];
  const d = new Date(from + 'T00:00:00Z');
  const end = new Date(to + 'T00:00:00Z');
  // Los últimos 10 días se re-piden siempre (por si la corrida anterior fue
  // antes de la publicación de las 15:30 de ese día).
  const recent = new Date(end); recent.setUTCDate(recent.getUTCDate() - 10);
  for (; d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const dow = d.getUTCDay();
    if (dow === 0 || dow === 6) continue;
    const iso = d.toISOString().slice(0, 10);
    if (iso in series && d < recent) continue;
    todo.push(iso);
  }
  let done = 0;
  const worker = async () => {
    while (todo.length) {
      const iso = todo.shift();
      const [y, m, dd] = iso.split('-');
      const resp = await fetchRetry(`https://www.tcmb.gov.tr/kurlar/${y}${m}/${dd}${m}${y}.xml`);
      done++;
      if (done % 100 === 0) process.stdout.write(`  ${done} días pedidos (${iso})\r`);
      if (resp.status === 404) continue;
      const xml = await resp.text();
      const block = xml.match(/<Currency[^>]*Kod="USD"[\s\S]*?<\/Currency>/);
      const buy = block?.[0].match(/<ForexBuying>([\d.]+)<\/ForexBuying>/);
      if (!buy) continue;
      let v = parseFloat(buy[1]);
      // Antes del 2005-01-01 la moneda era la lira vieja (TRL): 1 TRY = 1.000.000
      // TRL. Se convierte a TRY para que toda la serie esté en la misma unidad.
      if (iso < '2005-01-01') v = +(v / 1e6).toFixed(6);
      series[iso] = v;
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log('');
  return series;
}

// --- RUB: Банк России, tipo oficial ------------------------------------------
async function fetchRUB(from, to) {
  const [fy, fm, fd] = from.split('-');
  const [ty, tm, td] = to.split('-');
  const url = `https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${fd}/${fm}/${fy}&date_req2=${td}/${tm}/${ty}&VAL_NM_RQ=R01235`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`CBR HTTP ${resp.status}`);
  const xml = await resp.text();
  const series = {};
  for (const m of xml.matchAll(/<Record Date="(\d{2}\.\d{2}\.\d{4})"[^>]*><Nominal>(\d+)<\/Nominal><Value>([\d,]+)<\/Value>/g)) {
    series[ddmmyyyyToIso(m[1])] = +(parseFloat(m[3].replace(',', '.')) / parseInt(m[2], 10)).toFixed(6);
  }
  return series;
}

// --- UAH: Національний банк України, tipo oficial ------------------------------
async function fetchUAH(from, to) {
  const url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${from.replaceAll('-', '')}&end=${to.replaceAll('-', '')}&valcode=usd&sort=exchangedate&order=asc&json`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`NBU HTTP ${resp.status}`);
  const series = {};
  for (const row of await resp.json()) series[ddmmyyyyToIso(row.exchangedate)] = row.rate_per_unit;
  return series;
}

const CURRENCIES = {
  ARS: { file: 'ars-usd.json', label: 'ARS por 1 USD (BCRA, Comunicación A 3500 / dólar mayorista)', fetch: fetchARS, defaultFrom: '2003-01-01',
    source: 'BCRA API pública, api.bcra.gob.ar/estadisticascambiarias' },
  BRL: { file: 'brl-usd.json', label: 'BRL por 1 USD (Banco Central do Brasil, PTAX de cierre — venda)', fetch: fetchBRL, defaultFrom: '2010-01-01',
    source: 'BCB API pública (Olinda), olinda.bcb.gov.br/olinda/servico/PTAX' },
  COP: { file: 'cop-usd.json', label: 'COP por 1 USD (TRM oficial, Banco de la República / Superfinanciera de Colombia)', fetch: fetchCOP, defaultFrom: '2010-01-01',
    source: 'datos.gov.co, dataset 32sa-8pi3 (TRM)' },

  // --- Las 7 de abajo se agregaron el 2026-09-30 (pedido de Guido: que el
  // pipeline resuelva el cierre de Noruega, Chequia, Suiza, Turquía, Rusia,
  // Ucrania y Corea sin salir a la web). Todas son unidades de moneda local por
  // 1 USD, igual que las 3 de arriba y que `fx` en los archivos de club.

  // NOK — Norges Bank, "exchange rates" (dataset EXR, serie B.USD.NOK.SP).
  // Qué tasa es: el tipo MEDIO (mid rate, promedio entre compra y venta del
  // mercado interbancario) que Norges Bank fija cada día hábil a las 14:15 CET
  // (la misma hora de concertación del BCE). Es la tasa de referencia que usan
  // los balances noruegos ("Norges Banks midtkurs"). Directa contra el USD, no
  // cruzada. Dirección: NOK por 1 USD (~7,9 en 2000, ~10-11 en 2023-25). Hay
  // datos desde bastante antes de 2000; se baja desde 2000. Días sin fixing:
  // fines de semana y feriados noruegos (el lookup cae al hábil anterior).
  // Fuente: API SDMX pública de data.norges-bank.no, sin key, pensada para
  // descarga (la documenta Norges Bank en "Open data").
  NOK: { file: 'nok-usd.json', label: 'NOK por 1 USD (Norges Bank, tipo medio de referencia 14:15 CET)', fetch: fetchNOK, defaultFrom: '2000-01-01',
    source: 'Norges Bank, API SDMX pública data.norges-bank.no/api/data/EXR/B.USD.NOK.SP' },

  // CZK — Česká národní banka, "kurzy devizového trhu" (fixing del ČNB).
  // Qué tasa es: el fixing ÚNICO (no hay compra/venta) que el ČNB publica cada
  // día hábil después de las 14:30, a partir de las cotizaciones del mercado
  // interbancario. Es el que exige la ley contable checa para valuar partidas en
  // moneda extranjera al cierre ("kurz ČNB ke dni účetní závěrky"). Directo
  // contra el USD. El archivo del ČNB lo da por N unidades de moneda extranjera
  // (para el USD siempre N=1; el script divide igual por las dudas). Dirección:
  // CZK por 1 USD (~36 en 2000, ~20-24 en 2020-25). Datos desde 1991; se baja
  // desde 2000. Días sin fixing: fines de semana y feriados checos. OJO
  // 2000-2001: en esos años el fixing del día D reflejaba el mercado del día
  // hábil ANTERIOR (contra el BCE del mismo día difiere hasta ~4%; contra el
  // BCE del día anterior, mediana 0,15-0,18%). Desde 2002 coincide con el
  // mismo día (mediana 0,02%). Es el dato oficial tal cual, no un error. Fuente:
  // year.txt de cnb.cz, el archivo de texto que el propio ČNB ofrece para
  // descargar la serie de un año entero.
  CZK: { file: 'czk-usd.json', label: 'CZK por 1 USD (Česká národní banka, fixing diario)', fetch: fetchCZK, defaultFrom: '2000-01-01',
    source: 'ČNB, cnb.cz/.../central-bank-exchange-rate-fixing/year.txt?year=AAAA' },

  // CHF — Reserva Federal de EE.UU., release H.10 (serie DEXSZUS), vía FRED.
  // POR QUÉ NO EL SNB: el Banco Nacional Suizo NO publica una serie diaria
  // descargable en su portal de datos (data.snb.ch solo tiene el cubo
  // `devkum`, promedio mensual y fin de mes; se probaron varios ids de cubo
  // diario y no existen). La H.10 sí es diaria, es de un banco central y es
  // directa contra el USD (no cruzada vía EUR). Qué tasa es: el "noon buying
  // rate" en Nueva York (tasa compradora de mediodía para transferencias en
  // moneda extranjera, que certifica la Fed de NY para aduana). NO es la hora
  // de cierre europea: puede diferir unas décimas de % del cierre de Zúrich que
  // use un balance suizo, y los días de feriado de EE.UU. (4 de julio, Thanksgiving,
  // 25/12, 1/1...) no tienen dato aunque Suiza haya operado — el lookup cae al
  // hábil anterior. Si el documento del club declara su propio tipo, gana ese
  // (regla #0 de club-data-mapping). Dirección: CHF por 1 USD (~1,6 en 2000,
  // ~0,8-0,95 en 2020-25). Datos desde 1971; se baja desde 2000. Fuente:
  // fredgraph.csv de FRED (St. Louis Fed), descarga CSV pública sin key; los
  // datos H.10 son de dominio público de la Junta de la Reserva Federal.
  CHF: { file: 'chf-usd.json', label: 'CHF por 1 USD (Reserva Federal H.10, noon buying rate Nueva York)', fetch: fetchCHF, defaultFrom: '2000-01-01',
    source: 'Federal Reserve Board H.10 (serie DEXSZUS) vía FRED, fred.stlouisfed.org/graph/fredgraph.csv' },

  // TRY — Türkiye Cumhuriyet Merkez Bankası (TCMB), "gösterge niteliğindeki
  // Merkez Bankası kurları", un XML por día en tcmb.gov.tr/kurlar/AAAAMM/DDMMAAAA.xml.
  // Qué tasa es: DÖVİZ ALIŞ (ForexBuying, compra de divisa) que el TCMB anuncia
  // cada día hábil a las 15:30 — es la que usan los estados financieros turcos
  // (TFRS/VUK) para valuar activos y pasivos en moneda extranjera al cierre. El
  // XML trae también ForexSelling y los de billete (Banknote); no se guardan.
  // Directa contra el USD. Dirección: TRY por 1 USD. CAMBIO DE UNIDAD: antes del
  // 2005-01-01 la moneda era la lira vieja (TRL, 1 TRY = 1.000.000 TRL); el TCMB
  // la publicaba en TRL (~540.000 en 2000) y el script la divide por 1.000.000
  // para que toda la serie quede en TRY (~0,54 en 2000, ~29 al cierre de 2023).
  // Días sin XML (404): fines de semana y feriados turcos, incluidos los
  // feriados religiosos de varios días (Ramazan/Kurban Bayramı), que pueden
  // dejar huecos de hasta ~9 días corridos — el lookup busca 10 días atrás.
  // POR QUÉ UN REQUEST POR DÍA: EVDS, la API de series del TCMB, pide API key
  // (el endpoint sin key redirige al login). Ver fetchTRY para cómo evita
  // re-bajar todo en cada corrida.
  TRY: { file: 'try-usd.json', label: 'TRY por 1 USD (TCMB, döviz alış — compra — de las 15:30)', fetch: fetchTRY, defaultFrom: '2000-01-01',
    source: 'TCMB, tcmb.gov.tr/kurlar/AAAAMM/DDMMAAAA.xml (ForexBuying USD; antes de 2005 en TRL, dividido por 1e6)' },

  // RUB — Банк России (CBR), tipo oficial ("официальный курс"), servicio
  // XML_dynamic de cbr.ru (código de moneda R01235 = USD). Qué tasa es: el tipo
  // OFICIAL único (no compra/venta) que el CBR fija cada día hábil y que rige a
  // partir del día siguiente. OJO CON LA FECHA: la fecha de cada registro es la
  // de VIGENCIA, no la de fijación (el registro 31.12.2014 = 56,2584 lo fijó el
  // CBR el 30.12). Es justo lo que usan los balances rusos ("официальный курс
  // ЦБ РФ на отчетную дату"), así que se guarda tal cual. Un sábado puede
  // aparecer con registro propio (vigencia de lo fijado el viernes): el
  // 31.12.2023 cayó domingo, no tiene registro, y el lookup cae al del sábado
  // 30.12 = 89,6883, que es el oficial "на 31.12.2023". Contra el BCE del mismo
  // día difiere más que las otras monedas (mediana 0,27%, 5,6% el 31/12/2014)
  // justamente por ese día de desfase: contra el BCE del día anterior la
  // mediana baja a 0,13%. Directo contra el USD. Dirección: RUB por 1 USD (~27 en 2000, ~90
  // a fines de 2023). El CBR siguió publicando después de 2022 (a diferencia del
  // BCE, que dejó de publicar RUB en marzo de 2022 — por eso NO se usa el BCE
  // acá). Desde junio de 2024, con la bolsa de Moscú sin operar dólares por las
  // sanciones, el CBR calcula el tipo con operaciones OTC de los bancos: sigue
  // siendo el oficial, pero conviene saberlo si un número 2024+ se ve raro.
  // Datos desde 1992; se baja desde 2000.
  RUB: { file: 'rub-usd.json', label: 'RUB por 1 USD (Banco de Rusia, tipo oficial vigente ese día)', fetch: fetchRUB, defaultFrom: '2000-01-01',
    source: 'Banco de Rusia, cbr.ru/scripts/XML_dynamic.asp (VAL_NM_RQ=R01235)' },

  // UAH — Національний банк України (NBU), tipo oficial ("офіційний курс"),
  // endpoint exchange_site de bank.gov.ua (el mismo que usa su página de
  // descarga de cotizaciones). Qué tasa es: el tipo OFICIAL único que el NBU
  // fija el día hábil anterior (campo calcdate) para regir en la fecha
  // `exchangedate`; es el que usan los balances ucranianos al cierre. Viene un
  // dato por CADA día calendario (fines de semana y feriados repiten el
  // vigente), así que el lookup casi nunca necesita caer al día anterior.
  // Directo contra el USD. El NBU lo publica por 100 unidades hasta ~2015 y por
  // 1 después; se guarda rate_per_unit, que ya viene normalizado a 1 USD.
  // Dirección: UAH por 1 USD (~5,2 en 2000, ~38 a fines de 2023, ~41-45 en
  // 2025-26). Hueco conocido: ninguno en la serie. OJO con los tramos PLANOS,
  // que no son un error de la serie sino política cambiaria del NBU: 7,993
  // durante 2012-2013; 29,2549 desde el 24/2/2022 hasta el 20/7/2022; 36,5686
  // desde el 21/7/2022 hasta el 2/10/2023. En esos tramos, y en las crisis de
  // 2008-09 y 2014-15, el tipo oficial se separó del mercado interbancario
  // hasta un ~10% (verificado 2026-09-30 contra el cruzado del ČNB): un balance
  // ucraniano usa el oficial, que es el que está acá.
  UAH: { file: 'uah-usd.json', label: 'UAH por 1 USD (Banco Nacional de Ucrania, tipo oficial)', fetch: fetchUAH, defaultFrom: '2000-01-01',
    source: 'NBU, bank.gov.ua/NBU_Exchange/exchange_site?valcode=usd (rate_per_unit)' },

  // KRW — Reserva Federal de EE.UU., release H.10 (serie DEXKOUS), vía FRED.
  // POR QUÉ NO EL BANCO DE COREA: ECOS (su API de series) pide API key; con la
  // key pública de ejemplo ("sample") solo devuelve 10 filas. Lo que usan los
  // balances coreanos es el "매매기준율" (tipo base de mercado) de Seoul Money
  // Brokerage, que no tiene un endpoint de descarga público. La H.10 es diaria,
  // de un banco central y directa contra el USD. Qué tasa es: "noon buying
  // rate" en Nueva York (ver CHF arriba). Puede diferir unas décimas de % del
  // 매매기준율 de Seúl de esa fecha (hora distinta: mediodía en NY es la
  // madrugada del día siguiente en Seúl), y los feriados de EE.UU. no tienen
  // dato. Si el documento declara su tipo (los balances coreanos casi siempre
  // lo declaran en la nota de moneda extranjera), gana ese. Dirección: KRW por
  // 1 USD (~1.130 en 2000, ~1.290 a fines de 2023). Datos desde 1981; se baja
  // desde 2000.
  KRW: { file: 'krw-usd.json', label: 'KRW por 1 USD (Reserva Federal H.10, noon buying rate Nueva York)', fetch: fetchKRW, defaultFrom: '2000-01-01',
    source: 'Federal Reserve Board H.10 (serie DEXKOUS) vía FRED, fred.stlouisfed.org/graph/fredgraph.csv' },
  // CLP — dólar observado (Banco Central de Chile), tal como lo publica el SII.
  // Qué tasa es: el "dólar observado" del Banco Central de Chile: promedio
  // ponderado de las transacciones interbancarias en dólares de cada día hábil,
  // que el Banco Central informa al día siguiente hábil y que el SII publica
  // (es la que el fisco usa para valuar moneda extranjera) y la que declaran los
  // balances chilenos al cierre. Directa contra el USD. Dirección: CLP por 1 USD
  // (~500-600 en 2000-2013, ~1.000 en 2024-25). Días sin dato: fines de semana y
  // feriados chilenos; OJO: el observado de un día se fija con el mercado de ESE
  // día pero el SII/BCCh lo publican al hábil siguiente — la fecha de la serie es
  // la del día de vigencia tal como figura en la tabla del SII.
  // VERIFICADO 2026-10-01 contra los tipos de cierre declarados por Universidad
  // Católica (31/12/2016-2025) y Palestino (30/6/2018 y 2019): los 12 coinciden
  // CON EL VALOR DE LA SERIE DEL PRIMER DÍA CON DATO POSTERIOR a la fecha de
  // cierre (2016: 669,47 = 3/1/2017; 2018: 694,77 = 2/1/2019; 2023: 877,12 =
  // 2/1/2024; 2025: 907,13 = 2/1/2026; Palestino 651,21 = 3/7/2018, 679,15 =
  // 1/7/2019), exacto al centavo en 11 y a 0,02 en uno (2024: 996,48 vs 996,46).
  // NO coinciden con el último día hábil ANTERIOR, que es lo que hace
  // lookup-fx-close.js por defecto (diferencias de -0,55% a +0,85%): el 31/12
  // no es día bancario en Chile y los balances usan el observado que rige/publica
  // el primer hábil siguiente. Para un club chileno, tomar el valor de la serie de
  // la primera fecha >= cierre, no la anterior.
  // POR QUÉ EL SII Y NO EL BANCO CENTRAL: la API BDE del BCCh
  // (si3.bcentral.cl/SieteRestWS) exige usuario y contraseña, y la API de la CMF
  // (api.cmfchile.cl, ex SBIF) exige API key; el Banco Mundial solo tiene
  // promedios anuales; FRED/H.10 no incluye CLP. mindicador.cl funciona sin key
  // pero es un agregador privado, no una fuente oficial, y no se usa. El SII es
  // un organismo del Estado y publica la misma cifra del Banco Central.
  // Datos desde 1990; se baja desde 2000 (hasta 2012 la página antigua, desde
  // 2013 la nueva; ver fetchCLP para los dos layouts).
  CLP: { file: 'clp-usd.json', label: 'CLP por 1 USD (dólar observado, Banco Central de Chile, publicado por el SII)', fetch: fetchCLP, defaultFrom: '2000-01-01',
    source: 'SII, sii.cl/valores_y_fechas/dolar/dolarAAAA.htm (desde 2013) y sii.cl/pagina/valores/dolar/dolarAAAA.htm (hasta 2012)' },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, def) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : def;
  };
  const curFlag = get('--currency', null);
  return {
    currencies: curFlag ? [curFlag] : Object.keys(CURRENCIES),
    from: get('--from', null),
    to: get('--to', new Date().toISOString().slice(0, 10)),
  };
}

async function runOne(code, from, to) {
  const cfg = CURRENCIES[code];
  if (!cfg) {
    console.error(`Moneda '${code}' no configurada en CURRENCIES. Hoy solo: ${Object.keys(CURRENCIES).join(', ')}`);
    return;
  }
  const effectiveFrom = from ?? cfg.defaultFrom;
  console.log(`Bajando serie ${cfg.label} de ${effectiveFrom} a ${to}...`);
  const series = await cfg.fetch(effectiveFrom, to);
  const dates = Object.keys(series).sort();
  if (!dates.length) {
    console.error(`  ${code}: la API no devolvió ningún dato -- no piso el archivo existente.`);
    return;
  }
  mkdirSync(outDir, { recursive: true });
  const out = {
    label: cfg.label,
    source: cfg.source,
    fetchedAt: new Date().toISOString(),
    rangeFrom: dates[0],
    rangeTo: dates[dates.length - 1],
    count: dates.length,
    series,
  };
  const outPath = resolve(outDir, cfg.file);
  writeFileSync(outPath, JSON.stringify(out, null, 1), 'utf8');
  console.log(`  Listo: ${dates.length} cotizaciones (${dates[0]} a ${dates[dates.length - 1]}) -> ${outPath.replace(projectRoot + '/', '')}`);
}

async function main() {
  const { currencies, from, to } = parseArgs();
  for (const code of currencies) await runOne(code, from, to);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
