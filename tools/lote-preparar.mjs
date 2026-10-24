// ============================================================================
// tools/lote-preparar.mjs — la preparación de lote.mjs: argumentos, lista, registro, avisos previos y documentos deterministas
// Mudado de tools/lote.mjs sin cambiar una línea (salvo `export`); tools/lote.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { validar } from './validar-bloques.mjs';
import { derivado } from './rutas.mjs';
import { etapaDe } from './etapa-doc.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { resolverDeporte, olvidarDeportes } from './deporte-club.mjs';
import { tomarCandado } from './candado.mjs';
import { ajusteDe, loadSite, faltaAntesDeLocalizar } from './lote.mjs';

// Los argumentos, la lista, el registro, los avisos previos, los documentos deterministas y el estado de la corrida.
export async function fasePreparar(ctx) {
  const ROOT = resolve(import.meta.dirname, '..');
  const ARGS = process.argv.slice(2);
  const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
  const LISTA = flag('--lista'); const EJECUTAR = ARGS.includes('--ejecutar'); const REHACER = ARGS.includes('--rehacer');
  // --sin-api: con --ejecutar, corre todo lo gratis y FRENA, documento por documento, donde hoy llamaría a una API (localizar, extraer, validar un escaneo,
  // resolver el inventario, el perímetro por Jev, el primer año, Jev, Claude). Lo que ya está hecho (caché al día, categorías al día, o escrito por la sesión con
  // armar-a-mano.mjs y --desde-sesion) sigue de largo. `API` = puede llamar a una API: es EJECUTAR salvo con --sin-api.
  const SIN_API = ARGS.includes('--sin-api'); const API = EJECUTAR && !SIN_API;
  const CARGAR = ARGS.includes('--cargar');
  ctx.frenaSinApi = () => {}; // se define abajo, cuando existe `estado` // al final, tools/cargar-lote.mjs: altas, cargas y un commit por año (ensayo sin --ejecutar)
  // --reintentar (CAMINO DE ERROR: decisión de Guido, las reglas extra son "para cuando haya errores"): solo los documentos cuya
  // última verificación marcó desgloses que no suman (verificacion.reintentar) vuelven a localizar con el índice ampliado (filas que terminan
  // en "-") y a extraer con la lista de lo que no sumó. Una sola vez por documento (después queda `reintentado`). El resto del lote no se toca.
  const REINTENTAR = ARGS.includes('--reintentar');
  // --detalle: QUIÉN ENTRA al escalón 1 de la etapa 3 (el reintento).
  // Un desglose que no suma en un documento cuya etapa 6 CERRÓ (verificación "ok") no bloquea la carga: el año se carga igual, con el renglón
  // sin abrir. Ese reintento es DETALLE OPCIONAL y solo entra con --reintentar --detalle. Sin --detalle entran los que destraban la carga:
  // categoría en 0, o desglose que no suma con la etapa 6 sin cerrar. Caso: un --reintentar sobre Juventus 2022-2024 volvió a
  // localizar y extraer 2022-23 y 2023-24, que verificaban ok (US$ 0,79 de más). Sirve igual para UC 2013 (el caso del índice ampliado),
  // cuya etapa 6 no cerraba.
  const DETALLE = ARGS.includes('--detalle');
  const leerDerivado = (e, suf) => { try { const p = resolve(ROOT, derivado(e.md, suf, { crear: false })); return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null; } catch { return null; } };
  // Lo que hay que reintentar: desgloses que no suman (verificar.mjs) y categorías en 0 que deberían tener número.
  // `detalle`: los desgloses que no suman de un documento cuya etapa 6 cerró (opcionales, ver --detalle); `reintentar`: lo que
  // destraba la carga, más el detalle si se pidió --detalle.
  // UNA VEZ POR DOCUMENTO también para "categoría en 0": el intento queda en <doc>.reintento-categorias.json (lo escribe el lote al
  // reintentar); con esa marca, las categorías en 0 de la propuesta de carga ya no piden otro reintento. Caso: Fortaleza 2017, el lote volvía a
  // ofrecer el mismo reintento después de intentarlo (y se pagaba cada vez).
  const categoriasPendientes = (e) => (leerDerivado(e, '.reintento-categorias.json') ? [] : ((leerDerivado(e, '.carga.json') || {}).reintentar || []).filter((x) => x.categoria));
  const verifDe = (e, { detalle = DETALLE } = {}) => {
    const v = leerDerivado(e, '.verificacion.json') || {};
    const desgl = v.reintentar || []; const opcional = v.estado === 'ok' ? desgl : [];
    const r = [...(v.estado === 'ok' && !detalle ? [] : desgl), ...categoriasPendientes(e)];
    return { ...v, reintentar: r.length ? r : null, detalle: opcional.length ? opcional : null };
  };
  if (!LISTA) { console.error('Uso: node tools/lote.mjs --lista <archivo> [--ejecutar] [--rehacer] [--cargar]'); process.exit(1); }
  // CANDADO: un solo proceso a la vez escribiendo el registro, también en el ensayo (to-dos 162 y 164; el porqué y el cómo, en
  // tools/candado.mjs). Lo comparten lote.mjs, pipeline.mjs y cargar.mjs --escribir.
  tomarCandado('lote.mjs', { lista: LISTA, modo: EJECUTAR ? '--ejecutar' : 'ensayo' });
  // TESTIGOS: una línea "testigo <pdf>" es un documento que entra SOLO para verificar a otro (su columna "año
  // anterior" contra el año actual del otro: chequeo de año vecino de verificar.mjs). Pasa por localizar, validar y extraer, y nada más: no se
  // verifica, no se categoriza ni se propone cargar (UC 2022 en el lote 03: ya cargado, llenaba la terminal con 7 frenos esperables).
  const lineas = readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  const testigos = new Set(lineas.filter((l) => /^testigo\s+/i.test(l)).map((l) => l.replace(/^testigo\s+/i, '')));
  // DESCARTADOS: Admin/registros/documentos-descartados.txt lista los documentos que Guido descartó como fuente; el lote los saltea.
  const descartados = new Set((existsSync(resolve(ROOT, 'Admin', 'registros', 'documentos-descartados.txt')) ? readFileSync(resolve(ROOT, 'Admin', 'registros', 'documentos-descartados.txt'), 'utf8') : '').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')));
  // PARCIALES: los balances de menos de 12 meses (Admin/registros/documentos-parciales.txt) tampoco entran: falta el otro tramo.
  const parciales = new Set((existsSync(resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt')) ? readFileSync(resolve(ROOT, 'Admin', 'registros', 'documentos-parciales.txt'), 'utf8') : '').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')));
  const docs0 = lineas.map((l) => l.replace(/^testigo\s+/i, '')).filter((d) => { if (descartados.has(d)) { console.log(`  ${d}: descartado (Admin/registros/documentos-descartados.txt)`); return false; } if (parciales.has(d)) { console.log(`  ${d}: parcial, menos de 12 meses (Admin/registros/documentos-parciales.txt)`); return false; } return true; });
  // LA VERSIÓN CORREGIDA REEMPLAZA AL ORIGINAL. El registro belga publica a veces el balance del mismo
  // año otra vez, corregido ("verbeterde neerlegging"): quedan "<doc>.pdf" y "<doc>-correction.pdf" en la carpeta y entraban los dos al lote
  // (se pagaban dos veces y la cola preguntaba lo mismo dos veces). UNA compuerta: los dos están en la lista (misma carpeta, mismo nombre más
  // "-correction") y la corrección tiene su .md. Entonces entra solo la corrección; el original se saltea en esta corrida y queda como
  // propuesta para Admin/registros/documentos-descartados.txt (entra ahí solo con el ok de Guido). Un original solo, sin su corrección en la
  // lista, entra como siempre. Casos: Union Saint-Gilloise 2023, Club Brugge 2013 y 2020, Mechelen 2021, Beerschot 2019, Lommel SK 2021.
  const correccionDe = (d) => d.replace(/\.pdf$/i, '-correction.pdf');
  const reemplazadosPorCorreccion = docs0.filter((d) => !testigos.has(d) && !/-correction\.pdf$/i.test(d) && docs0.includes(correccionDe(d)) && existsSync(resolve(ROOT, correccionDe(d).replace(/\.pdf$/i, '.md'))));
  for (const d of reemplazadosPorCorreccion) console.log(`  ${d}: salteado, la versión corregida (${correccionDe(d).split('/').pop()}) lo reemplaza`);
  const docs = docs0.filter((d) => !reemplazadosPorCorreccion.includes(d));
  const avisoCorrecciones = () => { if (reemplazadosPorCorreccion.length) console.log(`\nREEMPLAZADOS POR SU VERSIÓN CORREGIDA (no entraron; propuesta para Admin/registros/documentos-descartados.txt, con el ok de Guido):\n${reemplazadosPorCorreccion.map((d) => `  ${d}`).join('\n')}`); };
  // EN OTRA LISTA ACTIVA. lote-71.txt siguió listando los 10 documentos de Olympiacos después de pasarlos al lote 74 y la
  // segunda corrida del 71 los pagó de nuevo. Aviso (no frena: a veces se repite a propósito): un documento de esta lista que también está
  // en otra Admin/lotes/lote-*.txt. Las prueba-*.txt repiten documentos por diseño y no cuentan; los testigos tampoco, de ningún lado.
  {
    const sinTestigo = (f) => readFileSync(f, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && !/^testigo\s+/i.test(l));
    const propia = resolve(ROOT, LISTA); const mios = new Set(docs.filter((d) => !testigos.has(d)));
    for (const f of readdirSync(resolve(ROOT, 'Admin', 'lotes')).filter((f) => /^lote-.*\.txt$/.test(f)).sort()) {
      const otra = resolve(ROOT, 'Admin', 'lotes', f); if (otra === propia) continue;
      const comunes = sinTestigo(otra).filter((d) => mios.has(d));
      if (comunes.length) console.log(`Aviso (no frena): ${comunes.slice(0, 3).map((d) => d.split('/').pop()).join(', ')}${comunes.length > 3 ? ` y ${comunes.length - 3} más` : ''} también ${comunes.length > 1 ? 'están' : 'está'} en la lista ${f.replace(/\.txt$/, '')}, que sigue activa. Decíselo a Claude para que archive la que ya terminó.`);
    }
  }
  const ajustesTodos = (() => { let cache = null; return () => (cache ??= (existsSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl')) ? readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return {}; } }) : [])); })();
  const leerRegistro = () => readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  ctx.registro = leerRegistro();
  // UN AÑO DEL CLUB QUE QUEDA AFUERA. Aris 2022 quedó fuera de lote-71.txt, con los
  // demás años de Aris adentro, y nada lo avisó. Aviso (no frena), de la etapa de etapa-doc.mjs (la misma que muestra estado.mjs): un
  // documento de un club de la lista, fuera de la lista y "sin localizar" (e3-localizar). UNA compuerta: su ejercicio (periodo.cierre del
  // registro) está identificado y no es el de ningún documento de la lista ni de uno ya cargado del club. Sin ella avisaba 24 en el
  // lote 71 (informes del auditor y del directorio de años que la lista ya cubre); con ella, 2. Un documento sin cierre identificado no
  // avisa (Atromitos_audit_2016-17: Admin/HALLAZGOS-pipeline.md).
  {
    const club = (p) => p.split('/').slice(0, 3).join('/');
    const enLista = new Set(docs); const clubes = new Set(docs.map(club));
    const cubiertos = new Set(ctx.registro.filter((e) => clubes.has(club(e.pdf)) && (enLista.has(e.pdf) || e.cargado || e.estado === 'cargado') && e.periodo?.cierre).map((e) => `${club(e.pdf)}|${e.periodo.cierre}`));
    for (const e of ctx.registro) {
      if (!clubes.has(club(e.pdf)) || enLista.has(e.pdf) || !e.periodo?.cierre || cubiertos.has(`${club(e.pdf)}|${e.periodo.cierre}`)) continue;
      if (etapaDe(e).clave === 'e3-localizar') console.log(`Aviso (no frena): ${e.pdf} está transcripto y nadie lo localizó, y su año (cierre ${e.periodo.cierre}) no está en esta lista. Decíselo a Claude: lo suma a un lote o lo descarta.`);
    }
  }
  // DUPLICADOS: el mismo PDF que otro (misma huella, inventario-transcripciones.mjs) no se procesa: se procesa el otro.
  for (let i = docs.length - 1; i >= 0; i--) { const e = ctx.registro.find((x) => x.pdf === docs[i]); if (e && e.estado === 'duplicado') { console.log(`  ${docs[i]}: duplicado de ${e.duplicadoDe} (misma huella): se saltea`); docs.splice(i, 1); } }
  // AVISO: UN ALTA ENTRA CON UN SOLO EJERCICIO (skill club-or-year-onboarding, 3a.2; pedido de Onboarding 9). Un club que todavía no está en el sitio
  // (quien.mjs: `clubDeCarpeta`) va con el ejercicio más reciente que traiga el estado de resultados completo; el resto de sus años, en el lote siguiente,
  // con las respuestas del primero como precedente. El lote 133 traía tres años por alta y nadie lo cortó antes del ensayo. Solo avisa: no saca nada de la lista.
  {
    const { quien } = await import('./quien.mjs'); const porClub = new Map();
    for (const d of docs) { const q = quien(resolve(ROOT, d)); if (q.clubDeCarpeta) porClub.set(dirname(d), [...(porClub.get(dirname(d)) || []), d]); }
    const varios = [...porClub].filter(([, ds]) => ds.length > 1);
    if (varios.length) {
      console.log(`\nAVISO (alta con más de un año): ${varios.length} club(es) nuevo(s) con más de un ejercicio en la lista. Un alta entra con UNO solo (el más reciente con estado de resultados completo); los demás, en el lote siguiente:`);
      for (const [c, ds] of varios) console.log(`  ${c}: ${ds.length} ejercicios (${ds.map((d) => d.split('/').pop()).join(', ')})`);
    }
  }
  // FRENO DE IA SOBRE UN DOCUMENTO DETERMINISTA (regla de Guido: lo que ya viene estructurado no se paga con IA, Admin/propuestas/estructurado-sin-ia.md). Un .md que escribió
  // tools/xhtml-aarsrapport.mjs (primera línea: «motor: xhtml-ixbrl (determinista)») trae sus cifras etiquetadas; localizar y extraer con IA es plata tirada si el escalón que lee las etiquetas puede
  // cerrarlo. Mientras ese escalón no exista, --ejecutar NO paga IA sobre esos documentos salvo con --pagar-ia-xhtml "<motivo>" (la bandera es el apagado: queda en
  // Admin/registros/pagar-ia-xhtml.jsonl con el motivo y los documentos, y audit.js da P1 si gasto.mjs registra una llamada paga sin ella). El ensayo dice, por documento, que hoy iría por IA.
  const esXhtml = (d) => { const x = ctx.registro.find((y) => y.pdf === d); try { return /motor: xhtml-ixbrl/.test(readFileSync(resolve(ROOT, x?.md || d.replace(/\.pdf$/i, '.md')), 'utf8').slice(0, 400)); } catch { return false; } };
  const docsXhtml = docs.filter(esXhtml); const PAGAR_XHTML = flag('--pagar-ia-xhtml');
  // Cada línea de costo del ensayo lo dice al lado del documento: sin la bandera, «se frenaría (determinista)»; con ella, que va por IA y por qué.
  // Y el total final separa lo que corre de lo que se frena (antes el aviso salía una vez arriba y cada línea seguía diciendo «localizar ~US$ … + extraer …»).
  const DET = new Set(docsXhtml); const PAGA_XHTML = !!PAGAR_XHTML && !PAGAR_XHTML.startsWith('--');
  const frenaria = (pdf) => (DET.has(pdf) ? (PAGA_XHTML ? ' · determinista: va por IA (--pagar-ia-xhtml)' : ' · se frenaría (determinista)') : '');
  if (docsXhtml.length) {
    console.log(`\nDETERMINISTAS (motor xhtml-ixbrl): ${docsXhtml.length} de ${docs.length} documentos. Sus cifras ya vienen etiquetadas; el escalón que las lee todavía no existe, así que hoy irían por IA (localizar y extraer): determinista, ¿va por etiquetas? NO (sin escalón). Cada uno dice «se frenaría (determinista)» al lado de su costo, y el total final separa lo que corre de lo que se frena.`);
    if (API) {
      if (!PAGA_XHTML) { console.error(`\nFRENADO: ${docsXhtml.length} documentos de motor xhtml-ixbrl (determinista) pagarían IA (localizar y extraer) y ya traen sus cifras etiquetadas. No se escribió nada. Si igual hay que pagarlo, con el motivo: --pagar-ia-xhtml "<motivo>". Primero: node tools/lote.mjs --lista ${LISTA} (ensayo, dice el costo).`); process.exit(1); }
      appendFileSync(resolve(ROOT, 'Admin', 'registros', 'pagar-ia-xhtml.jsonl'), JSON.stringify({ ts: new Date().toISOString(), lista: LISTA, motivo: PAGAR_XHTML, docs: docsXhtml }) + '\n');
      console.log(`  --pagar-ia-xhtml: queda registrado (Admin/registros/pagar-ia-xhtml.jsonl): ${PAGAR_XHTML}`);
    }
  }
  // silencioso: para las tools que se llaman solo por su efecto y imprimen un resumen de TODO el proyecto (inventario-transcripciones.mjs
  // imprimía ~150 líneas del registro entero en medio de la etapa 7). Si fallan, se muestra su salida igual.
  const node = (tool, argv, { silencioso = false } = {}) => {
    const r = spawnSync('node', [resolve(ROOT, tool), ...argv], { cwd: ROOT, stdio: silencioso ? 'pipe' : 'inherit', encoding: 'utf8' });
    if (silencioso && r.status !== 0) process.stdout.write(`${r.stdout || ''}${r.stderr || ''}`);
    return r;
  };

  const INICIO = new Date().toISOString(); // desde cuándo cuenta el gasto por documento
  const gastoValidar = {}; // lo que costó validar escaneos (Gemini con rutas temporales: no queda en ningún log con el PDF)
  const anotarValidar = (pdf, V) => { const c = V?.costo || 0; if (c) gastoValidar[pdf] = { validar: (gastoValidar[pdf]?.validar || 0) + c }; return c; };
  const sitio = loadSite(); // antes del loop: "año ya cargado" mira también el sitio
  // ¿el año de la última propuesta de carga (<doc>.carga.json) ya está en el sitio? El año sale del ajuste `anio` si el documento
  // lo tiene: la propuesta puede ser de antes del ajuste. Caso: Sporting 2001 (relatorio-contas-2000.pdf), la propuesta vieja decía 2000 (el
  // nombre del archivo), 2000 está cargado y el lote lo salteaba como "ya en el sitio".
  const propuestaEnSitio = (e) => { const c = leerDerivado(e, '.carga.json'); const anio = ajusteDe(e.pdf, 'anio')?.valor ?? c?.year; return !!(c?.clubId && anio && sitio.generic?.[c.clubId]?.fiscalYearMeta?.[anio]); };
  // `cotizados`: los que el ensayo cotiza para localizar o extraer; también van a categorizar
  ctx.usd = 0; const estado = {}; const cotizados = new Set(); const aRetranscribir = []; const aTextoPropio = []; const aFijar = [];
  ctx.frenaSinApi = (pdf, etapa, costo) => { if (SIN_API) estado[pdf] = `frena (--sin-api): ${etapa} llamaría a la API${costo ? ` (~US$ ${Number(costo).toFixed(3)})` : ''}`; };
  // Páginas interiores (sin las 2 primeras ni la última) con menos de 200 caracteres de texto propio: son imágenes.
  const paginasEnImagen = (pdf) => {
    const n = Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0); const out = [];
    for (let i = 3; i < n; i++) { const t = spawnSync('pdftotext', ['-f', String(i), '-l', String(i), resolve(ROOT, pdf), '-'], { encoding: 'utf8' }).stdout || ''; if (t.replace(/\s/g, '').length < 200) out.push(i); }
    return out;
  };
  console.log(`\n=== 1/5 · Leer el documento (etapas 3-5: localizar, validar, extraer)${API ? '' : SIN_API ? ' — SIN API: frena donde llamaría a una' : ' — ENSAYO: no llama a ninguna API'} ===`);
  // ETAPA 3, ANTES DE LA COMPUERTA: EL PERÍMETRO DEL CLUB POR SEÑALES. Para cada
  // club de la lista que frenaría por perímetro, mira todos sus .md y, si coinciden (tablas de cada perímetro y el voto de 3 criterios, uno de
  // Jev), fija el ajuste del club; si no, la compuerta frena como siempre y Guido decide. En el ensayo no pregunta a Jev ni escribe: dice qué
  // fijaría. Caso: lote 14, 12 clubes italianos nuevos, 29 documentos frenados por perímetro.
  const { fijarPerimetroDeClubes } = await import('./perimetro-senales.mjs');
  const PS = await fijarPerimetroDeClubes(docs, { registro: ctx.registro, ejecutar: API, descartados, faltaPerimetro: (p) => faltaAntesDeLocalizar(p, { registro: ctx.registro })?.falta === 'perimetro' });
  const previstoPerimetro = API ? null : new Map([...PS.filter((x) => x.valor || x.pendienteJev).map((x) => [x.carpeta, x.valor || '?']), ...PS.flatMap((x) => x.porDocumento.map((d) => [d.pdf, d.valor]))]);
  for (const x of PS) console.log(`  perímetro ${x.carpeta}: ${x.valor || x.porDocumento.length ? `${x.escrito ? 'fijado' : 'se fija al ejecutar'}: ${x.valor || 'sin perímetro del club, uno por documento'} (${x.detalle})` : x.pendienteJev ? `se decide al ejecutar, con Jev o Claude (${x.detalle})` : `no se fija solo: ${x.detalle}`}`);
  // PROPUESTAS FRESCAS ANTES DE REINTENTAR. Qué reintentar por "categoría en 0" sale de la
  // propuesta guardada (<doc>.carga.json), que solo se escribe cuando corre el lote. Si después el club se dio de alta fuera del lote, la propuesta
  // guardada sigue diciendo "el club no existe" y no menciona los ceros: --reintentar decía "sin desgloses que reintentar" (Vila Nova 2021-2024 y
  // Avaí 2021, lote 62). Escalón 0 del camino de error: se vuelve a proponer la carga de los documentos que no están en el sitio (gratis: cargar.mjs
  // sin --escribir) y recién ahí se decide. Los ya cargados no se tocan: su propuesta fresca podría pedir un reintento pago que nadie pidió.
  if (REINTENTAR) {
    const sinCargar = docs.filter((d) => !testigos.has(d) && !ctx.registro.find((x) => x.pdf === d)?.cargado);
    if (sinCargar.length) {
      const tmp = resolve(tmpdir(), `lote-propuestas-${process.pid}.txt`);
      writeFileSync(tmp, sinCargar.join('\n') + '\n');
      node('tools/cargar.mjs', ['--lista', tmp, '--desde-verificacion'], { silencioso: true });
      try { unlinkSync(tmp); } catch { /* ya no está */ }
    }
  }
  // EL DEPORTE ANTES DE LEER. Localizar, extraer, caja-deuda y perimetro-senales dicen en su prompt el deporte del club (deporteDePdf); un club nuevo todavía no tiene ficha, así que el alta
  // (gratis, recalcula solo si cambió la huella) corre sobre las carpetas sin deporte ANTES de la primera lectura. Si no, los clubes nuevos de fútbol leerían con otro prompt (y otra clave de caché).
  const sinDeporte = [...new Set(docs.filter((d) => !resolverDeporte({ club: clubDeRuta(d).clubId, pdf: d })).map((d) => d.split('/').slice(1, 3).join('/')))];
  for (const solo of sinDeporte) { console.log(`  alta-club (gratis) sobre ${solo}: el club no tiene deporte todavía`); node('tools/alta-club.mjs', ['--todos', '--solo', solo], { silencioso: true }); }
  if (sinDeporte.length) olvidarDeportes();
  return { ROOT, LISTA, EJECUTAR, REHACER, SIN_API, API, CARGAR, REINTENTAR, DETALLE, leerDerivado, categoriasPendientes, verifDe, testigos, docs, avisoCorrecciones, ajustesTodos, leerRegistro, docsXhtml, PAGAR_XHTML, DET, PAGA_XHTML, frenaria, node, INICIO, gastoValidar, anotarValidar, sitio, propuestaEnSitio, estado, cotizados, aRetranscribir, aTextoPropio, aFijar, paginasEnImagen, previstoPerimetro };
}
