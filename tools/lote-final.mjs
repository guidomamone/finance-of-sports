// ============================================================================
// tools/lote-final.mjs — las fases de lote.mjs desde el costo del ensayo hasta la tabla final: sumar, categorizar, el resumen y la propuesta de carga
// ============================================================================
import { writeFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pendientes } from './cola.mjs';
import { soltarCandado } from './candado.mjs';
import { verificarLista, gastoPorDocumento, lineasGasto, categoriasAlDia, jevAlDia } from './lote.mjs';

// El costo del ensayo: lo que cuesta categorizar y los deterministas.
export async function faseEnsayo(ctx) {
  const { docs, cotizados, estado, testigos, ROOT, inicioUsd, docsXhtml, EJECUTAR, DET, PAGA_XHTML, PAGAR_XHTML, LISTA } = ctx;
  // LA CATEGORIZACIÓN DEL ENSAYO cuenta solo los documentos que van a llegar a categorizar (quedaron "extraído" o el ensayo los cotiza para localizar o extraer; no testigos) y cuyo .categorias.json no está al día (categoriasAlDia, la misma compuerta
  // de cargar.mjs): no cobra por los ya en el sitio, los sin .md ni los que frenan antes de localizar.
  const aCategorizar = docs.filter((d) => (cotizados.has(d) || String(estado[d] || '').startsWith('extraído')) && !testigos.has(d) && !(() => { const e = ctx.registro.find((x) => x.pdf === d); try { return e?.md && categoriasAlDia(resolve(ROOT, e.md)); } catch { return false; } })());
  const costoDe = (d) => { const i = docs.indexOf(d); return (i + 1 < docs.length ? inicioUsd[docs[i + 1]] : ctx.usd) - inicioUsd[d]; };
  const costoDet = docsXhtml.reduce((a, d) => a + costoDe(d), 0);
  if (!EJECUTAR) {
    const coma = (x) => x.toFixed(2).replace('.', ',');
    const total = `Correrlo cuesta ~US$ ${coma(ctx.usd + 0.03 * aCategorizar.length)} (localizar y extraer US$ ${coma(ctx.usd)} + categorización ~US$ 0,03 por documento en ${aCategorizar.length} de ${docs.length}: los demás ya están en el sitio, categorizados al día o frenan antes + páginas escaneadas ~US$ 0,003 cada una)`;
    if (!docsXhtml.length) { console.log(`\nEnsayo terminado, no se gastó nada. ${total}. Para correrlo: agregá --ejecutar.`); process.exit(0); }
    const catDet = aCategorizar.filter((d) => DET.has(d)).length; const catResto = aCategorizar.length - catDet;
    const conCosto = (ds) => ds.filter((d) => costoDe(d) > 0 || aCategorizar.includes(d)).length;
    const resto = docs.filter((d) => !DET.has(d)); const usdResto = ctx.usd - costoDet;
    const corre = `corre ~US$ ${coma(usdResto + 0.03 * catResto)} (${resto.length} documentos no deterministas, ${conCosto(resto)} con costo: localizar y extraer US$ ${coma(usdResto)} + categorización en ${catResto})`;
    const frena = `${PAGA_XHTML ? 'va por IA con --pagar-ia-xhtml' : 'se frena'} ~US$ ${coma(costoDet + 0.03 * catDet)} (${docsXhtml.length} deterministas de motor xhtml-ixbrl, ${conCosto(docsXhtml)} con costo: localizar y extraer US$ ${coma(costoDet)} + categorización en ${catDet})`;
    console.log(`\nEnsayo terminado, no se gastó nada. ${total}.\n  Separado: ${corre} · ${frena}.`);
    console.log(PAGA_XHTML ? '  Para correrlo: agregá --ejecutar (con la misma --pagar-ia-xhtml).' : `  --ejecutar frena el lote ENTERO mientras la lista tenga deterministas: sacalos de la lista para correr el resto (US$ 0 en ellos), o pasá --pagar-ia-xhtml "<motivo>" para pagarlos igual.`);
    process.exit(0);
  }

  if (docsXhtml.length) { // costo de los deterministas (con --ejecutar, lo gastado)
    const costo = costoDet;
    console.log(`\nDETERMINISTAS (xhtml-ixbrl): ${docsXhtml.length} documentos, ${EJECUTAR ? 'gastado' : 'costo estimado en juego si van por IA'}: ~US$ ${costo.toFixed(2).replace('.', ',')}${EJECUTAR ? '' : ` (--ejecutar los frena salvo con --pagar-ia-xhtml "<motivo>")`}`);
    if (EJECUTAR && PAGAR_XHTML) appendFileSync(resolve(ROOT, 'Admin', 'registros', 'pagar-ia-xhtml.jsonl'), JSON.stringify({ ts: new Date().toISOString(), lista: LISTA, cierre: true, docs: docsXhtml.length, costoUsd: +costo.toFixed(4) }) + '\n');
  }
}

// 2/5. Sumar y cruzar con lo impreso (etapa 6, gratis).
export async function faseSumar(ctx) {
  const { docs, estado, EJECUTAR, sitio, leerDerivado, ROOT, SIN_API, node } = ctx;
  console.log('\n=== 2/5 · Sumar y cruzar con lo impreso (etapa 6, gratis) ===');
  // LA LÍNEA DE DEPRECIACIÓN Y AMORTIZACIÓN JUNTA se parte sola con las notas cuando la aritmética cierra (REGLA de CONVENCIONES-DATOS); si no cierra, queda para la cola. Escribe ajustes solo con --ejecutar.
  { const { partirDocumentos } = await import('./partir-amortizacion.mjs'); const n = partirDocumentos(docs.filter((d) => String(estado[d]).startsWith('extraído')), { escribir: EJECUTAR, avisar: false }); if (n) console.log(`  ${n} documento(s) con la amortización junta ${EJECUTAR ? 'partidos' : 'que se partirían'} con las notas (partir-amortizacion.mjs)`); }
  // startsWith: el escalón 1 de la etapa 2 deja 'extraído (re-transcripto con Mistral)'; con la igualdad exacta ese documento no pasaba a verificar en la misma corrida. verificarLista repite la pasada si un documento tomó la escala del año vecino.
  for (const [pdf, r] of verificarLista(docs.filter((d) => String(estado[d]).startsWith('extraído')), { registro: ctx.registro, sitio, escribirRubros: true })) {
    estado[pdf] = r.error ? `verificar: ${r.error}` : r.estado === 'ok' ? 'verificado' : `verificado con ${r.cola.length} caso(s) en la cola`;
    if (!r.error) for (const c of r.chequeos) console.log(`  ${pdf.split('/').slice(2).join('/')}: ${c.ok === true ? 'ok' : c.ok === false ? 'NO' : '-'} ${c.nombre}: ${c.detalle}`);
  }

  // (escalón 3 del primer año) los documentos que verificar dejó con el pedido a Claude pendiente: se pregunta y se vuelven a verificar, para que la respuesta confirme el año en esta misma corrida.
  {
    const pend214 = docs.filter((d) => String(estado[d]).startsWith('verificado') && leerDerivado(ctx.registro.find((x) => x.pdf === d) || { md: d.replace(/\.pdf$/i, '.md') }, '.verificacion.json')?.primerAnio?.estado === 'pendiente');
    if (pend214.length) {
      console.log(`\n=== Etapa 6, primer año (escalón 3): ${pend214.length} documento(s) ===`);
      writeFileSync(resolve(ROOT, 'Admin', 'registros', '.lote-primer-anio.txt'), pend214.join('\n') + '\n');
      if (SIN_API) { for (const d of pend214) estado[d] = 'frena (--sin-api): el primer año llamaría a Claude (primer-anio-ia.mjs --exportar, que contesta la sesión, y --importar)'; console.log(`  --sin-api: ${pend214.length} documento(s) quedan para primer-anio-ia.mjs --exportar/--importar`); }
      else node('tools/primer-anio-ia.mjs', ['--lista', 'Admin/registros/.lote-primer-anio.txt', '--ejecutar']);
      if (!SIN_API) for (const [pdf, r] of verificarLista(pend214, { registro: ctx.registro, sitio, escribirRubros: true })) {
        estado[pdf] = r.error ? `verificar: ${r.error}` : r.estado === 'ok' ? 'verificado' : `verificado con ${r.cola.length} caso(s) en la cola`;
        if (!r.error) for (const c of r.chequeos.filter((x) => x.nombre === 'primer año')) console.log(`  ${pdf.split('/').slice(2).join('/')}: ok primer año: ${c.detalle}`);
      }
    }
  }

}

// 3/5. Categorizar las filas (etapa 7).
export async function faseCategorizar(ctx) {
  const { docs, estado, SIN_API, ROOT, node, LISTA, leerRegistro } = ctx;
  console.log('\n=== 3/5 · Categorizar las filas (etapa 7) ===');
  let conRubros = docs.filter((d) => String(estado[d]).startsWith('verificado'));
  if (SIN_API) {
    // Sin API: solo siguen los documentos con Jev y las categorías al día (los dejó la sesión con --desde-sesion o ya estaban); el resto frena.
    const alDia = (d) => { const e = ctx.registro.find((x) => x.pdf === d); try { return !!e?.md && jevAlDia(resolve(ROOT, e.md)) && categoriasAlDia(resolve(ROOT, e.md)); } catch { return false; } };
    for (const d of conRubros.filter((x) => !alDia(x))) { estado[d] = 'frena (--sin-api): faltan las categorías (jev-categorizar.mjs y categorizar-claude.mjs con --desde-sesion <json>)'; console.log(`  ${d}: ${estado[d]}`); }
    conRubros = conRubros.filter(alDia);
  }
  if (conRubros.length) {
    writeFileSync(resolve(ROOT, 'Admin', 'registros', '.lote-lista-actual.txt'), conRubros.join('\n') + '\n');
    node('tools/inventario-transcripciones.mjs', ['--solo', LISTA], { silencioso: true }); ctx.registro = leerRegistro(); // --solo: solo la lista del lote
    if (!SIN_API) {
      node('tools/glosar-rubros.mjs', ['--listos', '--lista', 'Admin/registros/.lote-lista-actual.txt']);
      node('tools/jev-categorizar.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/registros/.lote-lista-actual.txt']);
      node('tools/categorizar-claude.mjs', ['--listos', '--limit', '0', '--lista', 'Admin/registros/.lote-lista-actual.txt']);
    }
    console.log('\n=== 4/5 · Proponer la carga (etapa 8, todavía no escribe el sitio) ===');
    node('tools/cargar.mjs', ['--lista', 'Admin/registros/.lote-lista-actual.txt', '--desde-verificacion']);
  }

}

// El resumen de en qué quedó cada documento, el camino de error (reintentos) y el gasto por documento.
export async function faseResumen(ctx) {
  const { docs, estado, leerDerivado, aTextoPropio, REINTENTAR, LISTA, aRetranscribir, propuestaEnSitio, verifDe, imprimirAFijar, INICIO, gastoValidar, avisoCorrecciones } = ctx;
  console.log('\n=== Resumen: en qué quedó cada documento ===');
  for (const pdf of docs) console.log(`  ${String(estado[pdf] || 'sin novedad en esta corrida').padEnd(42)} ${pdf}`);
  const cola = pendientes().filter((c) => docs.includes(c.pdf));
  // TROUBLESHOOTING: desgloses que siguen sin sumar DESPUÉS del reintento -> diagnóstico (¿índice o transcripción?).
  const sinArreglo = docs.filter((d) => { const e = ctx.registro.find((x) => x.pdf === d); const v = e?.md ? leerDerivado(e, '.verificacion.json') : null; return v?.reintentado && v?.faltasDesglose; });
  if (sinArreglo.length) {
    console.log(`\nDESGLOSES QUE SIGUEN SIN SUMAR DESPUÉS DEL REINTENTO (se cargan con el renglón sin abrir; diagnóstico gratis):`);
    for (const d of sinArreglo) console.log(`  node tools/diagnostico-desglose.mjs "${d}"`);
  }
  if (aTextoPropio.length && !REINTENTAR) {
    console.log(`\nTRANSCRIPCIONES QUE NO COINCIDEN CON EL TEXTO PROPIO DEL PDF (etapa 2, escalón 1: se rearman gratis con él y se vuelve a localizar y extraer):`);
    for (const d of aTextoPropio) console.log(`  ${d.pdf.split('/').slice(2).join('/')}: págs. ${d.paginas.join(', ')}`);
    console.log(`  caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
  }
  if (aRetranscribir.length) {
    console.log(`\nTRANSCRIPCIONES SIN LAS PÁGINAS EN IMAGEN (etapa 2, escalón 1):`);
    for (const x of aRetranscribir) console.log(`  ${x.pdf.split('/').slice(2).join('/')}: páginas ${x.paginas.join(', ')}`);
    console.log(`  Re-transcribir con Mistral y volver a localizar (~US$ 0,004 por página + localizar y extraer): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
  }
  const yaEnSitio = (e) => e.cargado || propuestaEnSitio(e);
  const motivos = (xs) => xs.map((x) => (x.categoria ? `"${x.categoria}" en 0` : `"${x.renglon}" ${x.suma} contra ${x.objetivo}`)).join('; ');
  const aReintentar = []; const aDetalle = [];
  for (const d of docs) {
    const e = ctx.registro.find((x) => x.pdf === d); if (!e?.md) continue;
    const v = verifDe(e, { detalle: false }); const enSitio = yaEnSitio(e);
    const destraba = enSitio ? (v.reintentar || []).filter((x) => x.categoria) : v.reintentar || [];
    if (destraba.length) aReintentar.push({ d, m: destraba }); else if (!enSitio && v.detalle) aDetalle.push({ d, m: v.detalle });
  }
  if (aReintentar.length) {
    console.log(`\nREINTENTOS QUE DESTRABAN LA CARGA (camino de error, una vez por documento: categorías en 0, o desgloses que no suman con la etapa 6 sin cerrar):`);
    for (const x of aReintentar) console.log(`  ${x.d.split('/').slice(2).join('/')}: ${motivos(x.m)}`);
    console.log(`  Reintento con índice ampliado (~US$ 0,50 por documento): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar`);
  }
  if (aDetalle.length) {
    console.log(`\nDETALLE OPCIONAL (el año se carga igual, con el renglón sin abrir; desgloses que no suman con la etapa 6 cerrada):`);
    for (const x of aDetalle) console.log(`  ${x.d.split('/').slice(2).join('/')}: ${motivos(x.m)}`);
    console.log(`  Solo si hace falta el detalle (~US$ 0,50 por documento): caffeinate -i node tools/lote.mjs --lista ${LISTA} --ejecutar --reintentar --detalle`);
  }
  imprimirAFijar();
  const GD = gastoPorDocumento(docs, { desde: INICIO, registro: ctx.registro, extra: gastoValidar });
  if (GD.length) { console.log('\nGASTO POR DOCUMENTO (esta corrida; "N.ª vez" = esa tarea ya se había pagado antes para el mismo PDF):'); for (const l of lineasGasto(GD)) console.log(l); }
  avisoCorrecciones();
  console.log(`\nGastado: US$ ${ctx.usd.toFixed(2).replace('.', ',')} en localizar y extraer (la categorización: node tools/gasto.mjs).${cola.length ? ` ${cola.length === 1 ? 'Quedó 1 pregunta' : `Quedaron ${cola.length} preguntas`} en la cola: no tenés que hacer nada, ${cola.length === 1 ? 'la contesta' : 'las contesta'} Claude.` : ''}`);

  return { yaEnSitio, motivos };
}

// La propuesta de carga (etapa 8) y, con --cargar, lo que se escribe en el sitio.
export async function faseResultado(ctx) {
  const { docs, testigos, leerDerivado, yaEnSitio, estado, motivos, CARGAR, ROOT, LISTA, EJECUTAR } = ctx;
  // RESULTADO: lee la última propuesta de carga (<doc>.carga.json) de CADA documento de la lista, no solo de los que pasaron por la etapa 8 en esta corrida (un --reintentar la corre solo sobre los reintentados). "Ya en el sitio" va aparte: un año ya
  // cargado frena por diseño (cargar.mjs no pisa un ejercicio), y contarlo como frenado escondería los frenados de verdad.
  // La etapa de un documento frenado, para la tabla final: la MÁS TEMPRANA de sus frenos. `club` solo no frena de verdad con --cargar (el alta la hace cargar-lote.mjs), por eso va después de las demás.
  function etapaDeFrenos(frenos) {
    const de = (f) => {
      const e = String(f.etapa || ''); const m = String(f.motivo || '');
      if (e === 'registro') { const n = (m.match(/la etapa (\d)/) || [])[1]; return n ? `${n} ${n === '4' ? 'validar (números sin confirmar)' : n === '6' ? 'verificar (sumas)' : 'pipeline'}` : '6 verificar (sumas)'; }
      if (e === 'filas') return '6 verificar (casos en la cola)';
      if (['categorizacion', 'categoria-en-cola', 'perfil-en-cola'].includes(e)) return '7 categorizar (cola de categorías y perfil)';
      if (['tie-out', 'tie-out-resultado', 'reintento'].includes(e)) return '8 cargar: no cierra o pide reintento';
      if (e === 'club' || e === 'alta') return '8 alta del club nuevo';
      return `8 cargar: ${e || 'otro'}`;
    };
    return frenos.map(de).sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))[0] || '8 cargar: otro';
  }
  const resultado = { listo: [], frenado: [], yaCargado: [], sinPropuesta: [] };
  for (const pdf of docs.filter((d) => !testigos.has(d))) {
    const e = ctx.registro.find((x) => x.pdf === pdf); const c = e?.md ? leerDerivado(e, '.carga.json') : null;
    const anio = `${pdf.split('/')[2] || ''} ${c?.year || (pdf.match(/(\d{4})(?!.*\d{4})/) || [])[1] || pdf}`.trim();
    // un año que ya está en el sitio va a "Ya en el sitio" aunque su última propuesta sea vieja (de antes del alta del club decía "el club no existe en el sitio").
    if (e?.md && yaEnSitio(e)) resultado.yaCargado.push({ anio });
    else if (!c) resultado.sinPropuesta.push({ anio, motivo: estado[pdf] || 'sin propuesta de carga' });
    else if (!(c.frena || []).length) resultado.listo.push({ anio });
    else if ((c.frena || []).some((f) => f.etapa === 'año' && /ya tiene el ejercicio/.test(f.motivo))) resultado.yaCargado.push({ anio });
    // TODOS los motivos, uno por línea, y si cargar.mjs cortó el análisis en un freno (`cortadoEn`), el aviso de que al resolverlo pueden aparecer más.
    else resultado.frenado.push({ anio, motivos: c.frena.map((f) => `[${f.etapa}] ${String(f.motivo).slice(0, 160)}`), cortadoEn: c.cortadoEn || null, etapaFreno: etapaDeFrenos(c.frena) });
  }
  const anios = (xs) => xs.map((x) => x.anio).sort().join(', ');
  console.log('\n=== Propuesta de carga (etapa 8): qué se escribiría ===');
  console.log(`Listo para cargar ${resultado.listo.length}${resultado.listo.length ? `   (${anios(resultado.listo)})` : ''}`);
  console.log(`Frenados ${resultado.frenado.length}`);
  for (const x of resultado.frenado.sort((a, b) => String(a.anio).localeCompare(String(b.anio)))) {
    const n = x.motivos.length;
    console.log(`   ${x.anio}: frena por ${n} motivo${n === 1 ? '' : 's'}${x.cortadoEn ? ` (el análisis se cortó en "${x.cortadoEn}": después de resolverlo pueden aparecer más)` : ''}`);
    for (const m of x.motivos) console.log(`      ${m}`);
  }
  if (resultado.yaCargado.length) console.log(`Ya en el sitio ${resultado.yaCargado.length}   (${anios(resultado.yaCargado)})`);
  if (resultado.sinPropuesta.length) { console.log(`Sin propuesta de carga ${resultado.sinPropuesta.length}`); for (const x of resultado.sinPropuesta) console.log(`   ${x.anio}: ${x.motivo}`); }

  // ETAPA 8 ESCRITA EN EL SITIO: con --cargar, lo que quedó "listo para cargar" se escribe con tools/cargar-lote.mjs (alta del club nuevo con su color, cargar.mjs --escribir con su auditoría, un commit por año; sin push). Sin --ejecutar es su
  // ensayo. El candado del lote se suelta antes: cargar.mjs --escribir toma el suyo.
  ctx.escritos = 0;
  if (CARGAR) {
    soltarCandado();
    // antes de cargar, las listas de equipos que faltan para los años de la lista (gratis: Wikipedia): la carga de un año nuevo necesita su liga y la compuerta de estadio y sponsor, su página.
    const rl = spawnSync('node', [resolve(ROOT, 'tools/listas-lote.mjs'), '--lote', LISTA, ...(EJECUTAR ? [] : ['--ensayo'])], { cwd: ROOT, stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
    const resumenListas = String(rl.stdout || '').split('\n').filter((l) => /^listas-lote:|^ {2}NO:/.test(l));
    if (resumenListas.length) console.log(`\nListas de equipos para la liga de los años nuevos (tools/listas-lote.mjs --lote):\n${resumenListas.join('\n')}${EJECUTAR ? '\n(lo guardado en tools/club-league-reference/ se commitea aparte)' : ''}`);
    const r = spawnSync('node', [resolve(ROOT, 'tools/cargar-lote.mjs'), '--lista', LISTA, ...(EJECUTAR ? ['--escribir'] : [])], { cwd: ROOT, stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    if (r.stdout) process.stdout.write(r.stdout);
    ctx.escritos = (String(r.stdout || '').match(/: escrito y commiteado/g) || []).length;
  }

  return { resultado };
}

// La tabla final «Dónde quedó cada PDF de la lista».
export async function faseTabla(ctx) {
  const { resultado, CARGAR, EJECUTAR } = ctx;
  // TABLA FINAL "Dónde quedó cada PDF de la lista" (pedido de Guido): cada documento de la lista una sola vez, en la etapa más temprana donde frenó.
  // Solo lee lo que ya se calculó arriba (la propuesta de carga de cada documento) y lo escrito por la etapa 8: no cambia nada.
  {
    const filas = new Map(); const sumar = (k, n = 1) => filas.set(k, (filas.get(k) || 0) + n);
    sumar('3-5 sin propuesta de carga (localizar, validar, extraer)', resultado.sinPropuesta.length);
    for (const x of resultado.frenado) sumar(x.etapaFreno);
    const listosSinEscribir = Math.max(0, resultado.listo.length - ctx.escritos);
    if (CARGAR && EJECUTAR) { sumar('8 escrito en esta corrida', ctx.escritos); sumar('8 listo pero no se escribió (ver la etapa 8 arriba)', listosSinEscribir); }
    else sumar('8 listo para cargar (falta --cargar --ejecutar)', resultado.listo.length);
    sumar('ya estaba en el sitio', resultado.yaCargado.length);
    const orden = [...filas].filter(([, n]) => n > 0).sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }));
    const ancho = Math.max(5, ...orden.map(([k]) => k.length));
    console.log('\n=== Dónde quedó cada PDF de la lista ===');
    console.log(`${'ETAPA'.padEnd(ancho)}   #`);
    for (const [k, n] of orden) console.log(`${k.padEnd(ancho)}  ${String(n).padStart(2)}`);
    console.log(`${'TOTAL'.padEnd(ancho)}  ${String(orden.reduce((s, [, n]) => s + n, 0)).padStart(2)}`);
  }
}
