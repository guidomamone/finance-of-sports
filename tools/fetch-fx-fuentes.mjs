// ============================================================================
// tools/fetch-fx-fuentes.mjs — los lectores de cada banco central o fuente: una función fetchXXX por moneda que devuelve la serie diaria
// Mudado de tools/fetch-fx-reference.mjs sin cambiar una línea (salvo `export`); tools/fetch-fx-reference.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outDir = resolve(projectRoot, 'tools', 'fx-reference');

export async function fetchARS(from, to) {
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
export async function fetchBRL(from, to) {
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
export async function fetchCOP(from, to) {
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

// --- Helpers compartidos por las fuentes agregadas después ------------
// fetch con reintentos (los portales de bancos centrales cortan de vez en
// cuando una conexión larga). Devuelve la Response; 404 se devuelve tal cual
// (para TCMB es "no hubo fixing ese día", no un error).
export async function fetchRetry(url, opts = {}, tries = 4) {
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
export async function fetchNOK(from, to) {
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
export async function fetchCLP(from, to) {
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
export async function fetchCZK(from, to) {
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
export const fetchCHF = (from, to) => fetchFredH10('DEXSZUS', from, to);
export const fetchKRW = (from, to) => fetchFredH10('DEXKOUS', from, to);
// --- PEN: Banco de Pagos Internacionales (BIS), dataset WS_XRU ---------------
// Serie diaria del tipo de cambio contra el USD que el BIS recibe de cada banco
// central (para Perú, del BCRP). CSV de la API SDMX pública, sin key.
async function fetchBIS(pais, moneda, from, to) {
  const resp = await fetchRetry(`https://stats.bis.org/api/v1/data/WS_XRU/D.${pais}.${moneda}.A?startPeriod=${from}&endPeriod=${to}&format=csv`);
  if (!resp.ok) throw new Error(`BIS HTTP ${resp.status} para ${moneda}`);
  const lines = (await resp.text()).trim().split('\n');
  const head = lines[0].split(',');
  const iD = head.indexOf('TIME_PERIOD'), iV = head.indexOf('OBS_VALUE');
  const series = {};
  for (const line of lines.slice(1)) {
    const f = line.split(',');
    if (f[iV]) series[f[iD]] = parseFloat(f[iV]);
  }
  return series;
}
export const fetchPEN = (from, to) => fetchBIS('PE', 'PEN', from, to);

export const fetchJPY = (from, to) => fetchFredH10('DEXJPUS', from, to);
export const fetchCNY = (from, to) => fetchFredH10('DEXCHUS', from, to);
export const fetchMXN = (from, to) => fetchFredH10('DEXMXUS', from, to);

// --- EUR: Banco Central Europeo, tipo de referencia diario EUR/USD -----------
// El BCE publica USD por 1 EUR (~1,05-1,18); el sitio guarda EUR por 1 USD, así
// que se invierte: 1/valor, redondeado a 6 decimales (ver comentario de EUR).
export async function fetchEUR(from, to) {
  const url = `https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?format=csvdata&startPeriod=${from}&endPeriod=${to}`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`BCE HTTP ${resp.status}`);
  const lines = (await resp.text()).split('\n').filter(Boolean);
  const header = lines[0].split(',');
  const iDate = header.indexOf('TIME_PERIOD');
  const iVal = header.indexOf('OBS_VALUE');
  const series = {};
  for (const line of lines.slice(1)) {
    const c = line.split(',');
    const v = parseFloat(c[iVal]);
    if (c[iDate] && v > 0) series[c[iDate]] = Math.round((1 / v) * 1e6) / 1e6;
  }
  return series;
}

// --- DKK: Danmarks Nationalbank, valutakurser (tabla DNVALD de su Statbank) ---
// La tabla publica DKK por 100 unidades de USD; se divide por 100. La API da
// error si se pide un día que no existe (24/12, 31/12, feriados), por eso se baja
// la serie entera con Tid="*" y se filtra por rango acá.
export async function fetchDKK(from, to) {
  const resp = await fetchRetry('https://api.statbank.dk/v1/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: 'DNVALD', format: 'CSV', variables: [
      { code: 'VALUTA', values: ['USD'] }, { code: 'KURTYP', values: ['KBH'] }, { code: 'Tid', values: ['*'] }] }),
  });
  if (!resp.ok) throw new Error(`Danmarks Nationalbank HTTP ${resp.status}`);
  const series = {};
  for (const line of (await resp.text()).split('\n').slice(1)) {
    const c = line.trim().split(';');
    const m = /^(\d{4})M(\d{2})D(\d{2})$/.exec(c[2] ?? '');
    const v = parseFloat((c[3] ?? '').replace(',', '.'));
    if (!m || !(v > 0)) continue;
    const date = `${m[1]}-${m[2]}-${m[3]}`;
    if (date >= from && date <= to) series[date] = Math.round((v / 100) * 1e6) / 1e6;
  }
  return series;
}

// --- GBP: Bank of England, base IADB, serie XUDLUSS ---------------------------
// Publica USD por 1 GBP (~1,2-1,3); se invierte a GBP por 1 USD.
export async function fetchGBP(from, to) {
  const MES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fmt = (iso) => { const [y, m, d] = iso.split('-'); return `${d}/${MES[+m - 1]}/${y}`; };
  const url = `https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?csv.x=yes&Datefrom=${fmt(from)}&Dateto=${fmt(to)}&SeriesCodes=XUDLUSS&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`Bank of England HTTP ${resp.status}`);
  const meses = Object.fromEntries(MES.map((m, i) => [m, String(i + 1).padStart(2, '0')]));
  const series = {};
  for (const line of (await resp.text()).split('\n').slice(1)) {
    const [d, val] = line.trim().split(',');
    const m = /^(\d{1,2}) (\w{3}) (\d{4})$/.exec(d ?? '');
    const v = parseFloat(val);
    if (!m || !(v > 0)) continue;
    series[`${m[3]}-${meses[m[2]]}-${m[1].padStart(2, '0')}`] = Math.round((1 / v) * 1e6) / 1e6;
  }
  return series;
}

// --- TRY: TCMB, "gösterge niteliğindeki" kurlar, un XML por día hábil ----------
// Es el camino más lento (un request por día, ~6.800 para 2000-hoy) porque EVDS
// (la API de series del TCMB) pide API key y el requisito es no depender de
// ninguna. Para no volver a bajar 26 años cada vez que se corre, reusa lo que
// ya esté en tools/fx-reference/try-usd.json y solo pide los días que faltan
// (--full fuerza a bajar todo de nuevo). Sábados/domingos no se piden (el
// TCMB no publica); un feriado devuelve 404 y simplemente no entra en la serie.
export async function fetchTRY(from, to) {
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
      // Antes de 2005 la moneda era la lira vieja (TRL): 1 TRY = 1.000.000
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
export async function fetchRUB(from, to) {
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
export async function fetchUAH(from, to) {
  const url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${from.replaceAll('-', '')}&end=${to.replaceAll('-', '')}&valcode=usd&sort=exchangedate&order=asc&json`;
  const resp = await fetchRetry(url);
  if (!resp.ok) throw new Error(`NBU HTTP ${resp.status}`);
  const series = {};
  for (const row of await resp.json()) series[ddmmyyyyToIso(row.exchangedate)] = row.rate_per_unit;
  return series;
}

// --- SEK: Sveriges Riksbank, API SWEA (serie SEKUSDPMI) ---------------------
// Una sola llamada trae la serie entera (~6.700 días desde 2000). Sin key, la
// API admite pocas llamadas por minuto: alcanza de sobra para una.
export async function fetchSEK(from, to) {
  const resp = await fetchRetry(`https://api.riksbank.se/swea/v1/Observations/SEKUSDPMI/${from}/${to}`);
  if (!resp.ok) throw new Error(`Riksbank HTTP ${resp.status}`);
  const series = {};
  for (const row of await resp.json()) if (row.value != null) series[row.date] = row.value;
  return series;
}

// --- PLN: Narodowy Bank Polski, tabla A (tipo medio) ------------------------
// La API acepta como máximo 367 días por consulta: se pide año por año. Datos
// desde 2002 (antes de esa fecha la API no tiene la tabla A).
export async function fetchPLN(from, to) {
  const series = {};
  const start = from < '2002-01-02' ? '2002-01-02' : from;
  for (let y = Number(start.slice(0, 4)); y <= Number(to.slice(0, 4)); y++) {
    const a = y === Number(start.slice(0, 4)) ? start : `${y}-01-01`;
    const b = y === Number(to.slice(0, 4)) ? to : `${y}-12-31`;
    const resp = await fetchRetry(`https://api.nbp.pl/api/exchangerates/rates/a/usd/${a}/${b}/?format=json`);
    if (resp.status === 404) continue; // NBP: 404 = "no hay tabla en ese rango"
    for (const row of (await resp.json()).rates ?? []) series[row.effectiveDate] = row.mid;
    process.stdout.write(`  ${y}\r`);
  }
  console.log('');
  return series;
}

// --- HRK: Hrvatska narodna banka, tečajna lista v2 (srednji tečaj) ----------
// Se pide año por año. La kuna dejó de existir en 2023 (Croacia pasó al
// euro): la serie termina en 2022 aunque se pida más.
export async function fetchHRK(from, to) {
  const series = {};
  const end = to > '2022-12-31' ? '2022-12-31' : to;
  for (let y = Number(from.slice(0, 4)); y <= Number(end.slice(0, 4)); y++) {
    const a = y === Number(from.slice(0, 4)) ? from : `${y}-01-01`;
    const b = y === Number(end.slice(0, 4)) ? end : `${y}-12-31`;
    const resp = await fetchRetry(`https://api.hnb.hr/tecajn/v2?valuta=USD&datum-primjene-od=${a}&datum-primjene-do=${b}`);
    if (!resp.ok) throw new Error(`HNB HTTP ${resp.status} para ${y}`);
    for (const row of await resp.json()) {
      series[row.datum] = parseFloat(row.srednji_tecaj.replace(',', '.')) / (row.jedinica || 1);
    }
    process.stdout.write(`  ${y}\r`);
  }
  console.log('');
  return series;
}
