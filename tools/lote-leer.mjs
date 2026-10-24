// ============================================================================
// tools/lote-leer.mjs — la fase de lote.mjs que lee cada documento: perímetro, localizar, validar y extraer, con el ensayo y el reintento
// Mudado de tools/lote.mjs sin cambiar una línea (salvo `export`); tools/lote.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { writeFileSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer, estimarExtraerSinBloques } from './extraer.mjs';
import { respuestaPosterior } from './cola.mjs';
import { derivado } from './rutas.mjs';
import { paginasARearmar, rearmar } from './texto-propio-a-md.mjs';
import { verificarLista, ajusteDe, ajustePerimetroDe, faltaAntesDeLocalizar, cacheAlDia, validacionAlDia, ubicacionAlDia } from './lote.mjs';

// 1/5. Leer cada documento: perímetro, localizar, validar y extraer (etapas 3 a 5), con el ensayo y el reintento.
export async function faseLeer(ctx) {
  const { docs, ROOT, estado, REINTENTAR, testigos, propuestaEnSitio, node, leerRegistro, SIN_API, EJECUTAR, LISTA, leerDerivado, ajustesTodos, sitio, categoriasPendientes, verifDe, paginasEnImagen, API, cotizados, frenaria, anotarValidar, aTextoPropio, DETALLE, previstoPerimetro, aFijar, REHACER, aRetranscribir, avisoCorrecciones } = ctx;
  const inicioUsd = {};
  for (const pdf of docs) {
    inicioUsd[pdf] = ctx.usd;
    let e = ctx.registro.find((x) => x.pdf === pdf);
    // el registro puede tener la ruta del .md sin el archivo en disco (tieneMd: false, "PAGADO SIN .md": Novorizontino 2022);
    // antes pasaba a localizar.mjs y el lote entero se caía con ENOENT.
    if (!e?.md || !existsSync(resolve(ROOT, e.md))) { estado[pdf] = 'sin transcripción (etapa 2)'; console.log(`  ${pdf}: sin .md`); continue; }
    // AÑO YA EN EL SITIO: un documento cuyo año ya está cargado no pasa por ninguna etapa más (ni
    // verificar, ni categorizar, ni la propuesta de carga): cargar-lote.mjs no lo iba a tocar igual, y la tabla final lo cuenta en "ya estaba en
    // el sitio" por su cuenta (yaEnSitio, abajo). Misma compuerta que "año ya cargado según el sitio": el registro o el sitio por
    // el clubId y el año de la última propuesta. Caso: lote 80, quinta corrida, 52 documentos verificados, glosados y categorizados para que 44
    // terminaran en "ya en el sitio: no se tocan". Con --reintentar sigue el camino de siempre (reintenta categorías en 0 de un año cargado).
    // Los testigos tampoco se saltean: entran solo para que otro documento compare su año anterior.
    if (!REINTENTAR && !testigos.has(pdf) && (e.cargado || propuestaEnSitio(e))) {
      estado[pdf] = 'ya en el sitio'; console.log(`  ${pdf}: ya en el sitio (no se verifica, categoriza ni propone de nuevo)`); continue;
    }
    // ETAPA 2, ESCALÓN 1a: si el inventario dice "revisar", primero las VOCES
    // (tools/resolver-inventario.mjs, la herramienta que ya existía en el proceso viejo): compara cada página del .md con el texto del PDF,
    // ignora las dudas en prosa y manda a Claude solo las páginas con cifras que no coinciden. COMPUERTA: se regenera el inventario y el
    // documento queda "listo" -> sigue. Si no, el escalón 1b de abajo (rearmar con el texto propio) como antes. Hasta acá el lote iba directo
    // al rearmado, que con la marca "dígito distinto" reescribía TODAS las páginas por un código postal (Juventus 2017-18: "10121 Torino"
    // contra "10151 Turin"; 1 página con cifras dudosas de 117). Se llama como comando aparte: una sola versión de la lógica.
    // ETAPA 2, ESCALÓN 1a, "SIN VERIFICAR" (grupo C de los defectos chicos, aprobado por Guido): el .md cambió
    // después de su última validación (desde la V443, el registro dice qué páginas). Antes de localizar (que se paga) va la validación GRATIS
    // del inventario (números del .md contra el texto del PDF), solo para la carpeta del club: si queda "listo", sigue; si queda "revisar",
    // el resolver de abajo (que paga solo las páginas cambiadas). Corre también en el ensayo: es gratis. Hasta acá un "sin verificar" iba
    // directo a localizar sobre una transcripción sin validar. Caso: Juventus 2021-22 quedó así al rearmar 3 páginas.
    if (e.estado === 'sin-verificar' && !e.cargado) {
      const carpeta = pdf.split('/').slice(0, 3).join('/');
      node('tools/inventario-transcripciones.mjs', ['--verificar', '--estado', 'sin-verificar', '--dir', carpeta, '--solo', carpeta], { silencioso: true });
      ctx.registro = leerRegistro(); e = ctx.registro.find((x) => x.pdf === pdf) || e;
      console.log(`  ${pdf}: "sin verificar" -> validación gratis del inventario (etapa 2, escalón 1a): ahora "${e.estado}"`);
    }
    let resolverEnsayo = false;
    if (e.estado === 'revisar' && !e.cargado) {
      if (SIN_API) { estado[pdf] = 'frena (--sin-api): el inventario dice "revisar" y resolver-inventario pagaría las páginas dudosas'; console.log(`  ${pdf}: ${estado[pdf]}`); continue; }
      const R = node('tools/resolver-inventario.mjs', ['--pdf', pdf, ...(EJECUTAR ? ['--ejecutar'] : [])], { silencioso: true });
      const sal = `${R.stdout || ''}`;
      if (!EJECUTAR) {
        const l = sal.split('\n').find((x) => x.includes(pdf)) || '';
        ctx.usd += Number((l.match(/~\$([\d.]+)/) || [])[1] || 0);
        console.log(`  ${pdf}: el inventario dice "revisar" -> resolver-inventario (etapa 2, escalón 1a): ${l.replace(pdf, '').replace(/\s+/g, ' ').trim()}`);
        resolverEnsayo = true;
      } else {
        node('tools/inventario-transcripciones.mjs', ['--solo', LISTA], { silencioso: true }); ctx.registro = leerRegistro(); // --solo: solo la lista del lote
        e = ctx.registro.find((x) => x.pdf === pdf) || e;
        console.log(`  ${pdf}: resolver-inventario (etapa 2, escalón 1a): el inventario ahora dice "${e.estado}"${e.estado === 'listo' ? '' : ` (${String(e.detalle || '').slice(0, 120)}): sigue el escalón 1b`}`);
      }
    }
    // AÑO YA CARGADO: con --reintentar, un documento cuyo año ya está en el sitio NO se reintenta por
    // "desglose que no suma" (se cargó con el renglón sin abrir, a propósito; en Fortaleza 2018-2020 esas marcas eran ruido: 5.867,807 contra
    // 5.867,804). Solo por "categoría en 0" de su propuesta de carga, y solo si esa propuesta es posterior al último ajuste manual (si no, es
    // vieja: Goiás 2025 y 2017 se reprocesaron por una propuesta anterior a sus ajustes cero-real, US$ 0,45). Caso que sí: Fortaleza 2017,
    // sueldos en 0 (Admin/Archive/lotes/lote-08b.txt).
    // (grupo A de los defectos chicos, aprobado por Guido) AL DÍA POR DOCUMENTO: la propuesta es vieja solo si hay un
    // ajuste manual del MISMO documento o de su CLUB con fecha igual o posterior al día de la propuesta (mismo día = vieja, igual de prudente
    // que antes). Hasta acá se comparaba con la fecha del archivo de ajustes ENTERO: un ajuste de Novorizontino dejaba "vieja" la propuesta
    // de Fortaleza 2017 y su reintento no corría (86 de 87 propuestas de prueba-completa contaban como viejas; por documento y club, 58).
    const cargaFresca = (() => { try { const c = leerDerivado(e, '.carga.json'); if (!c?.generado) return false; const dia = String(c.generado).slice(0, 10); const carpeta = pdf.split('/').slice(0, 3).join('/') + '/'; return !ajustesTodos().some((a) => (a.pdf === pdf || a.pdf === carpeta) && String(a.fecha || '') >= dia); } catch { return false; } })();
    // AÑO YA CARGADO SEGÚN EL SITIO: el registro se queda viejo si no se regenera después de cargar (Juventus 2021-22: en
    // data/it/juventus-it-data.js y `cargado: false` en el registro; un --reintentar lo volvía a pagar). Se mira también el sitio, por el clubId y
    // el año de la última propuesta de carga del documento.
    const cargado = e.cargado || propuestaEnSitio(e);
    // RESPUESTA POSTERIOR A LA VERIFICACIÓN: si la cola tiene respuestas a casos de la etapa 6 de este documento más nuevas
    // que su .verificacion.json, se vuelve a verificar (gratis) ANTES de decidir el reintento y el rearmado, que se deciden con esa verificación.
    // Sin esto, un documento con la cola ya contestada seguía con la verificación vieja: no pasaba a "extraído", pedía rearmar con el texto
    // propio (paginasARearmar) o un --reintentar pagaba localizar y extraer de nuevo y abría preguntas nuevas (lote 80: Sporting 2007-08 y
    // Benfica 2019-20; lote 79). Compuerta: solo si la respuesta es posterior; después de verificar, ya no lo es (no se repite).
    if (!cargado && e.md && respuestaPosterior(pdf, 'verificar', leerDerivado(e, '.verificacion.json')?.generado || null) && leerDerivado(e, '.verificacion.json') && leerDerivado(e, '.filas.json')) {
      const [[, VQ]] = verificarLista([pdf], { registro: ctx.registro, sitio });
      console.log(`  ${pdf}: la cola tiene respuestas posteriores a su verificación: etapa 6 de nuevo, gratis -> ${VQ?.estado || VQ?.error || '?'}`);
    }
    const reintento = !REINTENTAR ? null : cargado ? (cargaFresca && categoriasPendientes(e).length ? categoriasPendientes(e) : null) : verifDe(e)?.reintentar || null;
    if (REINTENTAR && cargado && !reintento) { estado[pdf] = 'ya cargado, sin categorías en 0 que reintentar'; console.log(`  ${pdf}: ya cargado (no se reintenta por desgloses)`); continue; }
    const sinEstadoAntes = !!leerDerivado(e, '.ubicacion.json')?.sin_estado; // candidato al escalón 1 de la etapa 2 (re-transcribir)
    // ETAPA 3, ESCALÓN 2: "las notas hacen de estado". Solo con --reintentar, una vez por documento, si la
    // localización anterior no encontró estado (sin_estado, o la lista del estado vacía) pero sí notas de ingresos Y de gastos, y la transcripción
    // no es candidata al escalón 1 de la etapa 2 (re-transcribir: no es de Mistral y tiene páginas en imagen; ese va primero). Caso real: Fortaleza
    // CEIF, Colombia (solo notas; 2022 con transcripción vieja, sin páginas en imagen).
    const ubAntes = leerDerivado(e, '.ubicacion.json');
    const candidatoNotas = REINTENTAR && ubAntes && !ubAntes.intentoNotasComoEstado && (ubAntes.sin_estado || !(ubAntes.estado || []).length)
      && (ubAntes.notas_ingresos || []).length && (ubAntes.notas_gastos || []).length && (String(e.motor || '').includes('mistral') || e.retranscritoPorLote || paginasEnImagen(pdf).length < 2);
    // CON AJUSTE MANUAL (idea de Guido: "el camino de error es ¿tiene un ajuste manual? si está, aplicarlo; si no, seguir la
    // escalera"): un documento que quedó como fuente y tiene un ajuste `resultado-final` con línea repite UNA vez las notas como estado, con el
    // dato del ajuste como pista para localizar. Casos: Fortaleza CEIF 2018 y 2019.
    // PERÍMETRO, ESCALÓN 0 EN LA ETAPA 3: el ajuste manual `perimetro` (del documento
    // o del club) se le pasa a localizar, que hasta acá elegía el consolidado por defecto y el ajuste recién lo leía cargar (etapa 8). Caso:
    // Juventus 2020-21, localizar eligió el consolidado (b15, pág. 32) con el individual al lado (b87, pág. 69) y el ajuste del club en
    // "individual"; no cerraba ninguna lectura. Sin ajuste, localizar elige como antes.
    const perimetroClub = ajustePerimetroDe(pdf)?.valor || null;
    const ajRes = ajusteDe(pdf, 'resultado-final');
    const candidatoAjuste = REINTENTAR && ubAntes && !ubAntes.intentoNotasConAjuste && (ubAntes.sin_estado || !(ubAntes.estado || []).length) && ajRes?.linea;
    if (candidatoNotas || candidatoAjuste) {
      const L3 = await localizar(pdf, { registro: ctx.registro, perimetroClub, ejecutar: API, rehacer: true, notasComoEstado: true, pistaResultado: candidatoAjuste ? { valor: ajRes.valor, linea: ajRes.linea } : null });
      if (L3.ensayo) { ctx.frenaSinApi(pdf, 'localizar (las notas hacen de estado)', L3.usd); cotizados.add(pdf); const EX = estimarExtraerSinBloques(pdf); ctx.usd += L3.usd + EX.usd; console.log(`  ${pdf}: sin estado, con notas: las notas hacen de estado (etapa 3, escalón 2${candidatoAjuste ? ', con la pista del ajuste manual' : ''}) · localizar ~US$ ${L3.usd.toFixed(3)} + extraer ${EX.texto}${frenaria(pdf)}`); continue; }
      if (L3.error) { estado[pdf] = `localizar (notas como estado): ${L3.error}`; continue; }
      ctx.usd += L3.costo || 0;
      if (L3.datos.sin_estado) { estado[pdf] = 'sin estado de resultados ni notas con resultado impreso (queda como fuente)'; console.log(`  ${pdf}: ${estado[pdf]}`); continue; }
      const V3 = await validar(pdf, { registro: ctx.registro, ejecutar: true, rehacer: true }); ctx.usd += anotarValidar(pdf, V3) || V3.usd || 0;
      const X3 = await extraer(pdf, { registro: ctx.registro, ejecutar: true, rehacer: true }); ctx.usd += X3.costo || 0;
      if (X3.error) { estado[pdf] = `extraer: ${X3.error}`; continue; }
      estado[pdf] = 'extraído (las notas hacen de estado)'; console.log(`  ${pdf}: las notas hacen de estado · ${X3.datos.filas.length} filas · US$ ${ctx.usd.toFixed(2)} acumulado`);
      continue;
    }
    // ETAPA 2, ESCALÓN 1: la etapa 4 de una corrida anterior dijo que el .md NO
    // coincide con el texto propio del PDF (cifras con un dígito distinto, o casi nada en común) y el PDF sí tiene texto propio: esas páginas
    // se rearman con él (tools/texto-propio-a-md.mjs, gratis) y el documento vuelve a localizar, validar y extraer. Una vez por documento
    // (el .md queda marcado). Compuerta: la etapa 4 sobre el .md nuevo y, después, la etapa 6. Caso: Goiás 2008-2016 (balances de diario).
    // el rearmado tiene su propia escalera: método "columnas" primero; "regiones" solo si con "columnas" la etapa 6 no cerró.
    // LOTE CORTADO: LA ETAPA 6 ANTES DEL REARMADO. Un lote que se corta (lote 14: se reinició la terminal) deja
    // documentos con la etapa 4 hecha (.validacion.json) y la 6 sin hacer (sin .verificacion.json). paginasARearmar() decide con los "no
    // confirmados" de la etapa 4 y, sin verificación, rearma; pero esos números casi siempre son falsos (medido en los lotes 14 y 19: 193 de
    // 193 en páginas que validó la etapa 2) y el rearmado con el texto propio puede EMPEORAR la página. Caso: AC Milan 2022-23, pág. 84,
    // "42 | 2.456" bien en el .md y partido en el texto propio. La etapa 6 es gratis: corre primero, también en el ensayo (como la validación
    // del inventario de arriba), y el rearmado decide con ella.
    if (!resolverEnsayo && e.md && !e.cargado && leerDerivado(e, '.validacion.json') && leerDerivado(e, '.filas.json') && !leerDerivado(e, '.verificacion.json')) {
      const [[, VR]] = verificarLista([pdf], { registro: ctx.registro, sitio });
      console.log(`  ${pdf}: tenía la etapa 4 sin la 6 (un lote cortado): etapa 6 primero, gratis -> ${VR?.estado || VR?.error || '?'}`);
    }
    const TP = resolverEnsayo ? null : paginasARearmar(pdf, e.md, e); const pagsTP = TP?.paginas; // en el ensayo, el 1a va primero
    if (pagsTP) {
      if (!(REINTENTAR && API)) { aTextoPropio.push({ pdf, paginas: pagsTP }); console.log(`  ${pdf}: ${TP.metodo === 'regiones' ? 'rearmada con el texto propio (columnas) y sigue sin cerrar' : 'la transcripción no coincide con el texto propio del PDF'} (págs. ${pagsTP.join(', ')}): rearmar (método ${TP.metodo}, --reintentar, gratis) + localizar ~US$ 0,05 + extraer ${estimarExtraerSinBloques(pdf).texto}${frenaria(pdf)}`); if (!EJECUTAR) ctx.usd += 0.05 + estimarExtraerSinBloques(pdf).usd; continue; }
      const RA = rearmar(pdf, pagsTP, TP.metodo);
      console.log(`  ${pdf}: págs. ${RA.paginas.join(', ') || 'ninguna'} rearmadas con el texto propio del PDF (etapa 2, escalón 1, método ${TP.metodo})${RA.rechazadas.length ? `; págs. ${RA.rechazadas.join(', ')} NO (la compuerta del rearmado: perdían filas de tabla, queda la transcripción anterior)` : ''}`);
      const L4 = await localizar(pdf, { registro: ctx.registro, perimetroClub, ejecutar: true, rehacer: true }); ctx.usd += L4.costo || 0;
      if (L4.error || L4.datos?.sin_estado) { estado[pdf] = L4.error ? `localizar: ${L4.error}` : 'sin estado de resultados aun con el texto propio (queda como fuente)'; continue; }
      const V4 = await validar(pdf, { registro: ctx.registro, ejecutar: true, rehacer: true }); ctx.usd += anotarValidar(pdf, V4) || V4.usd || 0;
      const X4 = await extraer(pdf, { registro: ctx.registro, ejecutar: true, rehacer: true }); ctx.usd += X4.costo || 0;
      if (X4.error) { estado[pdf] = `extraer: ${X4.error}`; continue; }
      estado[pdf] = 'extraído (texto propio del PDF)'; console.log(`  ${pdf}: estado ${L4.datos.estado.join(',')} · ${V4.datos?.modo || '?'} · ${X4.datos.filas.length} filas · US$ ${ctx.usd.toFixed(2)} acumulado`);
      continue;
    }
    if (REINTENTAR && !reintento && !sinEstadoAntes) { const op = !DETALLE && verifDe(e).detalle; estado[pdf] = op ? 'cierra; detalle opcional (--detalle)' : 'sin reintento pendiente'; console.log(`  ${pdf}: ${op ? `cierra; desgloses que no suman como detalle opcional (--detalle): ${op.map((x) => `"${x.renglon}"`).join(', ')}` : 'sin desgloses que reintentar'}`); continue; }
    // ETAPA 3, COMPUERTA ANTES DE PAGAR: si el documento todavía no
    // se localizó y le falta fijar el CIERRE o el PERÍMETRO (trae consolidado e individual y no hay ajuste ni año cargado de dónde heredarlo),
    // no se localiza: se imprime el ajuste que falta y el resto del lote sigue. Caso: Juventus, lote 13, localizó 2020-21 a 2024-25 con el
    // consolidado y hubo que pagar localizar y extraer otra vez (~US$ 2,8). La escalera está en tools/antes-de-localizar.mjs.
    const FP = faltaAntesDeLocalizar(pdf, { registro: ctx.registro, previsto: previstoPerimetro });
    if (FP?.aviso) console.log(`  ${pdf}: compuerta antes de localizar: ${FP.aviso}`);
    else if (FP) { aFijar.push({ pdf, ...FP }); estado[pdf] = `falta fijar el ${FP.falta} antes de localizar`; console.log(`  ${pdf}: FALTA FIJAR EL ${FP.falta.toUpperCase()} antes de localizar (no se paga): ${FP.detalle}`); continue; }
    // ETAPAS 3-5, ¿EL CACHÉ SIGUE SIRVIENDO?: si el .md cambió
    // desde extraer y las filas ya no están en su línea (tools/cache-al-dia.mjs), un año sin cargar se rehace (localizar, validar y extraer;
    // el ensayo dice el costo) y un año cargado solo avisa (no se paga nada). Caso: Juventus 2021-22, 148 de 149 filas corridas.
    const CA = REHACER || reintento ? null : cacheAlDia(e.md);
    const cacheViejo = CA && !CA.alDia && !cargado;
    if (CA && !CA.alDia) console.log(`  ${pdf}: ${CA.detalle}${cargado ? ' (año cargado: solo aviso, no se rehace)' : ': se rehace localizar, validar y extraer'}`);
    // EL REINTENTO EN EL MISMO MODO: si la localización vigente es "las notas
    // hacen de estado" (etapa 3, escalón 2), el reintento relocaliza en ese modo (con el índice ampliado y la lista de lo que faltó). Caso:
    // Fortaleza 2017 (solo notas) relocalizó en el modo normal, dio "sin estado" y pisó la localización buena.
    const enModoNotas = !!reintento && !!ubAntes?.estadoDesdeNotas;
    const L = await localizar(pdf, { registro: ctx.registro, perimetroClub, ejecutar: API, rehacer: REHACER || !!reintento || cacheViejo, ampliado: !!reintento, reintento, notasComoEstado: enModoNotas });
    // MODO BATCH (tools/lote-batch.mjs, Batch API): la respuesta de localizar llega en la ola siguiente; el documento se corta acá.
    if (L.pendiente) { estado[pdf] = 'esperando la Batch API (localizar)'; console.log(`  ${pdf}: localizar pendiente de la Batch API`); continue; }
    if (!L.ensayo && !L.error && reintento && reintento.some((x) => x.categoria)) { try { writeFileSync(resolve(ROOT, derivado(e.md, '.reintento-categorias.json')), JSON.stringify({ fecha: new Date().toISOString(), categorias: reintento.filter((x) => x.categoria).map((x) => x.categoria), modoNotas: enModoNotas }, null, 1)); } catch { /* sin marca: como antes */ } }
    // COMPUERTA: un reintento que da "sin estado" cuando la localización anterior sí tenía estado NO la pisa (sin estado nunca se
    // puede cargar): el intento queda en <doc>.ubicacion-reintento.json y vuelve la anterior.
    if (!L.ensayo && !L.error && reintento && L.datos?.sin_estado && ubAntes && !ubAntes.sin_estado && (ubAntes.estado || []).length) {
      writeFileSync(resolve(ROOT, derivado(e.md, '.ubicacion-reintento.json')), JSON.stringify(L.datos, null, 1));
      writeFileSync(resolve(ROOT, derivado(e.md, '.ubicacion.json')), JSON.stringify(ubAntes, null, 1));
      ctx.usd += L.costo || 0; estado[pdf] = 'reintento sin estado: queda la localización anterior'; console.log(`  ${pdf}: el reintento no encontró estado; queda la localización anterior (el intento, en .ubicacion-reintento.json)`);
      continue;
    }
    if (L.ensayo) { ctx.frenaSinApi(pdf, 'localizar', L.usd); cotizados.add(pdf); const EX = estimarExtraerSinBloques(pdf); ctx.usd += L.usd + EX.usd; console.log(`  ${pdf}: ${enModoNotas ? 'reintento con las notas como estado: ' : ''}localizar ~US$ ${L.usd.toFixed(3)} + extraer ${EX.texto}${frenaria(pdf)}`); continue; }
    if (L.error) { estado[pdf] = `localizar: ${L.error}`; continue; }
    ctx.usd += L.costo;
    if (L.datos.sin_estado) {
      // ETAPA 2, ESCALÓN 1: "no hay estado de resultados" puede ser culpa de la TRANSCRIPCIÓN. Caso
      // real, UC 2015: PDF híbrido, las páginas 4-9 (los estados) son imágenes; la transcripción vieja salió del texto propio del PDF y no las
      // tiene. Si la transcripción no la hizo Mistral y el PDF tiene páginas interiores casi sin texto, se marca para re-transcribir con Mistral
      // (que lee las imágenes); con --reintentar se hace y se vuelve a localizar. Si no, queda como fuente (como siempre).
      const enImagen = paginasEnImagen(pdf);
      const candidato = !String(e.motor || '').includes('mistral') && enImagen.length >= 2;
      if (candidato && REINTENTAR && API && !e.retranscritoPorLote) {
        // La transcripción vieja se MUEVE a Generados/ (mistral-ocr-transcribe.mjs no pisa un .md existente: "Ya existe el .md -- no lo piso",
        // UC 2015 en la primera corrida). Si Mistral falla, se restaura.
        const mdAbs = resolve(ROOT, e.md); const previo = resolve(ROOT, derivado(e.md, `.previo-${new Date().toISOString().slice(0, 10)}.md`));
        copyFileSync(mdAbs, previo); unlinkSync(mdAbs);
        console.log(`  ${pdf}: re-transcribiendo con Mistral (páginas en imagen: ${enImagen.join(', ')})...`);
        const r = node('tools/mistral-ocr-transcribe.mjs', [pdf]);
        if (r.status !== 0 || !existsSync(mdAbs)) { if (!existsSync(mdAbs)) copyFileSync(previo, mdAbs); estado[pdf] = 'escalón 1 de la etapa 2: Mistral falló (se restauró la transcripción anterior)'; continue; }
        node('tools/inventario-transcripciones.mjs', ['--solo', LISTA], { silencioso: true }); ctx.registro = leerRegistro(); // --solo: solo la lista del lote
        const L2 = await localizar(pdf, { registro: ctx.registro, perimetroClub, ejecutar: true, rehacer: true }); ctx.usd += L2.costo || 0;
        if (L2.error || L2.datos?.sin_estado) { estado[pdf] = 'sin estado de resultados aun re-transcripto (queda como fuente)'; continue; }
        const V2 = await validar(pdf, { registro: ctx.registro, ejecutar: true, rehacer: true }); ctx.usd += anotarValidar(pdf, V2);
        const X2 = await extraer(pdf, { registro: ctx.registro, ejecutar: true, rehacer: true }); ctx.usd += X2.costo || 0;
        if (X2.error) { estado[pdf] = `extraer: ${X2.error}`; continue; }
        estado[pdf] = 'extraído (re-transcripto con Mistral)'; console.log(`  ${pdf}: re-transcripto y extraído · ${X2.datos.filas.length} filas`);
        continue;
      }
      if (candidato) aRetranscribir.push({ pdf, paginas: enImagen });
      estado[pdf] = candidato ? `sin estado en la transcripción; ${enImagen.length} páginas en imagen: re-transcribir (--reintentar)` : 'sin estado de resultados (queda como fuente)';
      // el costo que se imprime por documento (Mistral + localizar y extraer) también entra en el total del ensayo: antes el total daba
      // "~US$ 0,00" aunque cada línea decía ~0,13 + 0,15 (Fulham 2021-22: 29 páginas en imagen).
      const costoMistral = candidato && REINTENTAR && !EJECUTAR ? 0.004 * Number((spawnSync('pdfinfo', [resolve(ROOT, pdf)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1] || 0) : 0;
      if (costoMistral) ctx.usd += costoMistral + 0.15;
      console.log(`  ${pdf}: ${estado[pdf]}${costoMistral ? ` · Mistral ~US$ ${costoMistral.toFixed(2)} + localizar y extraer ~US$ 0,15` : ''}`);
      continue;
    }
    // En el ensayo, validar y extraer TAMBIÉN van en ensayo (antes iban con ejecutar: true fijo: con localizar ya hecho, el
    // ensayo llamaba a extraer de verdad y gastaba). validar en un PDF digital es gratis y corre igual; en un escaneo estima.
    // Las filas se rehacen si son de otra localización (relocalizar cambió columna, bloques o escala) y la validación si es
    // de otra versión del .md (una cifra corregida a mano). Un año cargado no se toca. Lo mismo deciden cargar.mjs (validación) y extraer (huella).
    const ubVieja = !cargado && !REHACER && !reintento && !cacheViejo && !ubicacionAlDia(e.md);
    const valVieja = !cargado && !REHACER && !reintento && !cacheViejo && !validacionAlDia(e.md);
    if (ubVieja) console.log(`  ${pdf}: las filas son de otra localización: se rehacen validar y extraer`);
    else if (valVieja) console.log(`  ${pdf}: la validación es de otra versión del .md: se rehace validar (no localizar ni extraer)`);
    const rehacerVal = REHACER || !!reintento || cacheViejo || ubVieja || valVieja;
    let V = await validar(pdf, { registro: ctx.registro, ejecutar: API, rehacer: rehacerVal });
    // --sin-api no validaba nunca, ni siquiera un PDF digital (gratis), y el documento frenaba más adelante con «faltan las categorías». Ahora: la validación
    // gratis corre igual (no usa API) y la que llamaría a Gemini frena AHÍ, diciendo que falta validar-bloques y cuánto cuesta.
    if (SIN_API && EJECUTAR && V.ensayo) {
      if (!V.usd) V = await validar(pdf, { registro: ctx.registro, ejecutar: true, rehacer: rehacerVal });
      else { estado[pdf] = `frena (--sin-api): falta validar-bloques (llamaría a la API, ~US$ ${Number(V.usd).toFixed(3)}): node tools/validar-bloques.mjs "${pdf}" --ejecutar`; console.log(`  ${pdf}: ${estado[pdf]}`); ctx.usd += V.usd; continue; }
    }
    ctx.usd += (API ? anotarValidar(pdf, V) : V.costo) || V.usd || 0;
    const X = await extraer(pdf, { registro: ctx.registro, ejecutar: API, rehacer: REHACER || !!reintento || cacheViejo || ubVieja, reintento });
    if (X.ensayo) { ctx.frenaSinApi(pdf, 'extraer', X.usd); cotizados.add(pdf); ctx.usd += X.usd; console.log(`  ${pdf}: localizar ya hecho · extraer ~US$ ${X.usd.toFixed(3)} (estimado)${frenaria(pdf)}`); continue; }
    if (X.pendiente) { estado[pdf] = 'esperando la Batch API (extraer)'; console.log(`  ${pdf}: extraer pendiente de la Batch API`); continue; }
    ctx.usd += X.costo || 0;
    if (X.error) { estado[pdf] = `extraer: ${X.error}`; continue; }
    estado[pdf] = testigos.has(pdf) ? 'testigo (solo hasta extraer)' : 'extraído';
    console.log(`  ${pdf}: estado ${L.datos.estado.join(',')} · ${V.datos?.modo || '?'} · ${X.datos.filas.length} filas · US$ ${ctx.usd.toFixed(2)} acumulado`);
  }
  // Lo que falta fijar antes de localizar: un comando por club (perímetro) o por documento (cierre), sin repetir.
  const imprimirAFijar = () => {
    if (!aFijar.length) return;
    console.log(`\nFALTA FIJAR ANTES DE LOCALIZAR (etapa 3; ${aFijar.length} documento(s) sin pagar hasta que esté fijado; gratis):`);
    for (const c of [...new Set(aFijar.map((x) => x.comando))]) console.log(`  ${c}`);
  };
  if (!API) imprimirAFijar();
  avisoCorrecciones();
  return { inicioUsd, imprimirAFijar };
}
