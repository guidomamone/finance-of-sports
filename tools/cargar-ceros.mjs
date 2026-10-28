// ============================================================================
// tools/cargar-ceros.mjs — las fases de proponer() entre la categoría y los totales: categorías en 0, filas sin categoría y los signos
// Mudado de tools/cargar.mjs sin cambiar una línea (salvo `export`); tools/cargar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { citaPAE, citaSADpt } from './cargar-escribir.mjs';
import { derivado, respuestasDonde, cerrarPerfilSabido, pendientes, guardarPerfil, perfilVigente, perfilCercano, anioDeDoc, VENTANA_PERFIL, ajusteDe, ajustesDe, ceroRealDelClub, VERSION_AMPLIADO, GASTOS_RE, MAX_SIN_CAT, norm, r6 } from './cargar.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// 4b. Categorías en 0 que deberían tener número (perfil del club, ajustes cero-real, ventana COVID) y el reintento.
export function faseCeros(ctx) {
  const { club, pdf, filas, e, ingresosVerif, notasVerif, CEROS, frena, campo, clubId, cd, agregarCaso, year, P, sitio, alta } = ctx;
  // ---- 4b. CATEGORÍAS EN 0 -> REINTENTO (diseño aprobado por Guido; camino de error, solo con --desde-verificacion). Medido sobre
  // 241 años cargados: salarios del plantel nunca es 0, televisión 2%, estadio 1%: un 0 ahí es un desglose perdido (UC 2025, costo de ventas
  // sin abrir). Cuotas sociales (46% de ceros) y otras secciones deportivas (63-68%) solo cuentan si el perfil del club dice que tiene socios /
  // otros deportes (tools/perfil-clubes.mjs). Si el perfil no lo sabe, la pregunta va a la cola (sí o no) y su respuesta queda en el perfil.
  // Un documento con una línea "sin desglosar por la fuente" no se revisa (ya se sabe que no abre). Un documento ya reintentado
  // (.ubicacion.json con indiceAmpliado) no se vuelve a reintentar: se carga con aviso.
  // INCLUIDO EN: ajustes `incluye` del documento -> fiscalYearMeta.incluidoEn ({ member_dues: 'matchday_competition' }, o
  // { member_dues: { en: 'other_income', posible: true } } si no está confirmado). Lo lee la vista simplificada (js/finanzas-calc.js bucketize).
  // UN DOCUMENTO CON `filas-a-mano` (armado por script desde un estado ya leído, o por una sesión) no se reintenta: localizar y extraer lo devuelven protegido y el reintento no puede cambiar sus filas, así que pedirlo
  // frenaba la carga para nada y la pregunta de perfil (socios, otros deportes) no decidía nada. Sus categorías en 0 quedan en un aviso y se carga como está.
  const aMano = (() => { const a = ajusteDe(pdf, 'filas-a-mano'); return !!a && String(a.valor ?? '').trim().toLowerCase() !== 'no'; })();
  const incluidoEn = Object.fromEntries(ajustesDe(pdf).filter((a) => a.campo === 'incluye' && a.valor && a.categoria).map((a) => [a.valor, a.posible ? { en: a.categoria, posible: true } : a.categoria]));
  {
    const conCat = filas.filter((f) => (f.destino === 'revenue' || f.destino === 'expense') && f.cat);
    const suma = (cats) => conCat.filter((f) => cats.includes(f.cat)).reduce((a, f) => a + Math.abs(f.native || 0), 0);
    const yaReintentado = (() => { try { const v = JSON.parse(readFileSync(resolve(ROOT, derivado(e.md, '.ubicacion.json', { crear: false })), 'utf8')).indiceAmpliado; return Number(v === true ? 1 : v || 0) >= VERSION_AMPLIADO; } catch { return false; } })();
    const ceros = [];
    // un año sin ingresos (estado belga abreviado con la Brutomarge negativa, ver el paso 6b) no tiene televisión ni estadio que buscar.
    const sinIngresosNBB = ingresosVerif != null && Math.abs(Number(ingresosVerif)) < 1e-9 && /escalón "códigos NBB"/.test(notasVerif.join(' '));
    // una fila "sin desglosar por la fuente" apaga SOLO los avisos de SU lado: ingresos sin desglosar ->
    // no se revisan televisión, estadio, cuotas sociales ni otros deportes; gastos sin desglosar -> no se revisa sueldos del plantel. Hasta la
    // 404 cualquier fila lump_ apagaba todo. Caso: Fortaleza 2017, "Actividades Deportivas" (ingresos, 4.220,7) sin desglosar apagaba el aviso
    // de sueldos en 0, y los sueldos (nota 21, "Sueldos 705.432") quedaron adentro de "Total Gastos de Administración".
    const lumpIng = conCat.some((f) => f.destino === 'revenue' && /^lump_/.test(f.cat)); const lumpGas = conCat.some((f) => f.destino === 'expense' && /^lump_/.test(f.cat));
    {
      for (const { nombre, cats, lado } of CEROS.filter((x) => x.lado)) if (!(lado === 'gasto' ? lumpGas : (lumpIng || sinIngresosNBB)) && !suma(cats) && !cats.some((c) => incluidoEn[c]) /* un incluye sobre una de las tres del estadio alcanza: el estadio está dentro de otra línea */) ceros.push({ categoria: nombre, lado }); // el lado lo usa verificar.mjs
      // (decisión de Guido: "que cada 5 años se chequee, y ahí se puede ir para atrás y corregir") EL PERFIL POR AÑO:
      // vale el chequeo más cercano dentro de la ventana (tools/perfil-clubes.mjs, perfilVigente); la respuesta de la cola puede venir de
      // CUALQUIER documento del club dentro de la ventana (antes, solo la de este documento: 391 casos para 181 preguntas). Un chequeo nuevo
      // que contradice al más cercano abre una revisión de los años cargados entre los dos (motivo perfil-cambio; no frena).
      const registrarPerfil = (campo, nombre, v, ev, fuente, anioCh) => {
        const ant = perfilCercano(clubId, campo, anioCh, { excepto: anioCh });
        guardarPerfil(clubId, campo, v, ev, fuente, anioCh);
        if (ant && ant.valor !== v) {
          const [a, b] = [Math.min(ant.anio, anioCh), Math.max(ant.anio, anioCh)];
          const entre = Object.keys(cd.fiscalYearMeta || {}).map(Number).filter((y) => y > a && y < b).sort((x, y) => x - y);
          agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'perfil-cambio', detalle: `${clubId}:${campo}:${anioCh}`, anio: anioCh,
            que: `El perfil de ${club.name || clubId} cambió: ${campo === 'socios' ? 'socios' : 'otros deportes'} = ${ant.valor ? 'sí' : 'no'} en ${ant.anio} y ${v ? 'sí' : 'no'} en ${anioCh}. Revisar los años cargados entre los dos (${entre.join(', ') || 'ninguno'}): "${nombre}" en 0 se dio por ${ant.valor ? 'desglose perdido' : 'real'} con el chequeo viejo.`,
            propuesta: 'aceptar si esos años están bien; si no, corregir --valor "<año desde el que cambió>"' });
        }
      };
      const sn = (x) => (/^s[ií]/i.test(String(x)) ? true : /^no/i.test(String(x)) ? false : undefined);
      const respPerfil = (campo, nombre) => {
        const rs = respuestasDonde('cargar', 'perfil', (c) => c.detalle === `${clubId}:${campo}`)
          .map(({ caso, resp }) => ({ caso, resp, v: resp.decision === 'corregir' ? sn(resp.valor) : undefined, anio: caso.anio ?? anioDeDoc(caso.pdf) }))
          .filter((x) => x.v !== undefined && x.anio && Math.abs(x.anio - year) < VENTANA_PERFIL)
          .sort((a, b) => Math.abs(a.anio - year) - Math.abs(b.anio - year) || String(b.resp.ts).localeCompare(String(a.resp.ts)));
        const r = rs[0]; if (!r) return undefined;
        const ya = perfilVigente(clubId, campo, r.anio);
        if (!(ya && ya.anio === r.anio && ya.valor === r.v)) registrarPerfil(campo, nombre, r.v, `respuesta ${r.caso.id} en la cola (${r.resp.nota || 'sin nota'})`, 'guido-cola', r.anio);
        return r.v;
      };
      for (const [campo, nombre, catsIng, catsGas, pregunta] of CEROS.filter((x) => x.perfil).map((x) => [x.perfil.campo, x.nombre, x.perfil.catsIng, x.perfil.catsGas, x.perfil.pregunta(club.name || clubId)])) {
        if (aMano || lumpIng || suma(catsIng) || (catsGas.length && suma(catsGas))) continue;
        // ajuste `incluye`: la categoría está dentro de otra línea (el documento las junta): no es un 0 a revisar ni una pregunta.
        if (catsIng.every((c) => incluidoEn[c]) && catsGas.every((c) => incluidoEn[c])) { P.avisos.push(`"${nombre}" da 0 porque está incluida en otra línea (ajuste manual \`incluye\`)`); continue; }
        let tiene = perfilVigente(clubId, campo, year)?.valor; if (tiene === undefined || tiene === null) tiene = respPerfil(campo, nombre);
        // UN CHEQUEO CERCANO FUERA DE LA VENTANA TAMBIÉN VALE: el perfil de un club contestado en otro año no cambió nunca al volver a preguntar (medido en
        // perfil-clubes.jsonl y la cola: 201 de 201, y las 26 respuestas «sí» siguieron en «sí»); la cola ya no repite la pregunta por club, campo y tramo de 5 años.
        // No se registra como chequeo nuevo (no extiende la ventana): queda el aviso con el año del que sale, y un documento que sí traiga la línea no pasa por acá.
        if (tiene === undefined || tiene === null) {
          const cer = perfilCercano(clubId, campo, year);
          if (cer && cer.valor !== undefined && cer.valor !== null) { tiene = cer.valor; P.avisos.push(`perfil de "${nombre}": se usa el chequeo de ${cer.anio} (${cer.valor ? 'sí' : 'no'}), fuera de la ventana de ${VENTANA_PERFIL - 1} años`); }
        }
        // FORMA JURÍDICA: una ΠΑΕ (Ποδοσφαιρική Ανώνυμη Εταιρεία) es por ley una sociedad solo de
        // fútbol, con accionistas y no socios; las 12 griegas contestadas en la cola dieron "no" y "no". UNA compuerta: la forma está en la
        // PORTADA del documento (hasta la pág. 3 del visor), y esa línea es la cita (la portada nombra a quien presenta el balance; no se busca el
        // nombre del club porque está en griego y el del sitio en latín). Solo ΠΑΕ: la SAF brasileña no sirve (Cuiabá y Ferroviária tienen
        // socios) y Italia ya está contestada. Sin la cita, sigue a la cola. Caso: Athens Kallithea (balance del municipio) no la tiene.
        if (tiene === undefined || tiene === null) {
          const cita = citaPAE(readFileSync(resolve(ROOT, e.md), 'utf8'));
          if (cita) {
            const ev = `forma jurídica ΠΑΕ en la portada: ${e.md} L${cita.linea} "${cita.texto}" (cargar.mjs, to-do 232 c)`;
            registrarPerfil(campo, nombre, false, ev, 'forma-juridica', year); tiene = false;
            cerrarPerfilSabido(`${clubId}:${campo}`, `resuelto por la forma jurídica: ${ev}`);
            P.avisos.push(`"${nombre}" en 0: real (${clubId} es una ΠΑΕ, sin ${campo === 'socios' ? 'socios' : 'otros deportes'}; ${e.md} L${cita.linea})`);
          }
        }
        // SAD/SDUQ portuguesa en la portada: el 0 es real en ESTE documento; no se guarda en el perfil del club (ver citaSADpt).
        if ((tiene === undefined || tiene === null) && /^Clubes\/Portugal\//.test(pdf)) {
          const cita = citaSADpt(readFileSync(resolve(ROOT, e.md), 'utf8'));
          if (cita) { tiene = false; P.avisos.push(`"${nombre}" en 0: real en este documento (lo presenta una SAD/SDUQ, solo fútbol profesional: ${e.md} L${cita.linea} "${cita.texto}"; to-do 237 y)`); }
        }
        if (tiene === true) ceros.push({ categoria: nombre });
        else if (tiene === undefined || tiene === null) {
          // UNA pregunta por club, campo y tramo: si otro documento del club ya la tiene abierta dentro de la ventana, no se abre otra.
          const abierta = pendientes().find((c) => c.etapa === 'cargar' && c.motivo === 'perfil' && c.detalle === `${clubId}:${campo}` && c.pdf !== pdf && Math.abs((c.anio ?? anioDeDoc(c.pdf) ?? 0) - year) < VENTANA_PERFIL);
          // NUNCA frena la carga: un caso de perfil se contesta googleando el club (club-or-year-onboarding, «La cola»); mientras tanto el 0 queda con este aviso
          if (abierta) P.avisos.push(`perfil-en-cola (no frena): "${nombre}" da 0 y el perfil del club no dice si tiene ${campo === 'socios' ? 'socios' : 'otros deportes'} en ${year}: la pregunta ya está en la cola por ${abierta.pdf.split('/').pop()} (${abierta.id}) y vale para este año`);
          else {
            const prev = perfilCercano(clubId, campo, year);
            agregarCaso({ pdf, md: e.md, etapa: 'cargar', motivo: 'perfil', detalle: `${clubId}:${campo}`, anio: year, que: `${pregunta}  (por qué: en ${year} "${nombre}" da 0; si el club tiene, falta un desglose y se reintenta; si no tiene, el 0 es real. Vale para los años a menos de ${VENTANA_PERFIL} de ${year}.${prev ? ` Último chequeo: ${prev.valor ? 'sí' : 'no'} en ${prev.anio}.` : ''})`, propuesta: 'responder corregir --valor sí | corregir --valor no (o mandar un agente a buscar)' });
            P.avisos.push(`perfil-en-cola (no frena): "${nombre}" da 0 y el perfil del club no dice si tiene ${campo === 'socios' ? 'socios' : 'otros deportes'} en ${year}: pregunta en la cola; se contesta googleando el club y, si el club tiene, se reintenta (node tools/cola.mjs)`);
          }
        }
      }
    }
    // ESCALÓN 0 DEL AVISO: un ajuste manual `cero-real` de Guido para esa categoría dice que el 0 es real (tools/ajustes.mjs).
    for (const c of [...ceros]) { const aj = ajusteDe(pdf, 'cero-real') && ajustesDe(pdf).find((x) => x.campo === 'cero-real' && String(x.valor).toLowerCase() === c.categoria.toLowerCase()); if (aj) { ceros.splice(ceros.indexOf(c), 1); P.avisos.push(`"${c.categoria}" en 0: real, por ajuste manual (${aj.fecha}, ${aj.motivo})`); } }
    // ESCALÓN 0b DEL AVISO: el `cero-real` de esa categoría en OTRO documento del club vale para este
    // año, con UNA compuerta: ningún año cargado del club tiene esa categoría con monto (si alguno la tuvo, el 0 puede ser un desglose perdido
    // y sigue pidiendo reintento). Caso: Tallinna Kalev, "Televisión" en 0 con 7 ajustes, uno por año; 94 ajustes `cero-real` para 36
    // combinaciones de club y categoría.
    const CATS_CERO = Object.fromEntries(CEROS.map((x) => [x.nombre.toLowerCase(), x.cats]));
    const conMontoEnElClub = (cats) => ['revenueLinesByYear', 'expenseLinesByYear'].some((k) => Object.values(cd[k] || {}).some((ls) => (ls || []).some((l) => cats.includes(l.normalizedCategory) && Math.abs(l.amountNative || 0) > 0)));
    for (const c of [...ceros]) {
      const cats = CATS_CERO[c.categoria.toLowerCase()]; if (!cats) continue;
      const aj = ceroRealDelClub(pdf, c.categoria);
      if (aj && !conMontoEnElClub(cats)) { ceros.splice(ceros.indexOf(c), 1); P.avisos.push(`"${c.categoria}" en 0: real, por el ajuste cero-real del club (${aj.pdf.split('/').pop()}, ${aj.fecha}) y ningún año cargado la tiene con monto`); }
    }
    // ESCALÓN 1 DEL AVISO: un ejercicio que cierra dentro de la ventana COVID (period_end del 2020-03-31 al 2021-12-31, regla de
    // Admin/CONVENCIONES-DATOS.md, votación 3 a 0) jugó con partidos suspendidos, a puertas cerradas o con aforo limitado: la taquilla o las
    // entradas en 0 (la fila de ceros cuyas categorías son matchday o abonos; en fútbol, "Estadio") son reales y no piden reintento.
    // Sin cierre conocido queda la regla anterior (el año 2021). Se apaga por documento con el ajuste `covid-omitir`.
    // Casos: AEK 2021, Asteras 2021 (reintento pagado para nada).
    const cierreCovid = alta.ejercicio.cierre || null;
    const enVentanaCovid = cierreCovid ? (cierreCovid >= '2020-03-31' && cierreCovid <= '2021-12-31') : String(year) === '2021';
    if (enVentanaCovid && !ajusteDe(pdf, 'covid-omitir')) {
      const CATS_TAQUILLA = ['matchday_competition', 'season_tickets'];
      for (const c of [...ceros]) if ((CATS_CERO[c.categoria.toLowerCase()] || []).some((x) => CATS_TAQUILLA.includes(x))) { ceros.splice(ceros.indexOf(c), 1); P.avisos.push(`"${c.categoria}" en 0 con cierre ${cierreCovid || `en ${year}`}, dentro de la ventana COVID: real (partidos suspendidos, a puertas cerradas o con aforo limitado)`); }
    }
    if (ceros.length && aMano) P.avisos.push(`categorías en 0 en un documento con filas armadas a mano (el reintento con IA no puede cambiarlas; se carga así): ${ceros.map((c) => c.categoria).join(', ')}. Puede ser esperado: el documento (por ejemplo el estado de SIIS, o filas armadas a mano de un PDF) no trae el detalle de ese rubro; si el club no abre sueldos u otros rubros, queda en 0 y la nota «n/d» lo explica`);
    else if (ceros.length && !yaReintentado) { P.reintentar = ceros; frena('reintento', `categorías en 0 que deberían tener número: ${ceros.map((c) => c.categoria).join(', ')}. Reintento (una vez): node tools/lote.mjs --lista <lista> --ejecutar --reintentar`); }
    else if (ceros.length) P.avisos.push(`categorías en 0 aun después del reintento (se carga así): ${ceros.map((c) => c.categoria).join(', ')}`);
  }
  return { incluidoEn };
}

// 4c. Filas que nadie miró o sin categoría aceptable: avisos y tope.
export function faseSinCategoria(ctx) {
  const { aceptable, frena, filas, ladoDeCat, P } = ctx;
  const suma = (arr) => arr.reduce((a, x) => a + Math.abs(x.native || 0), 0);
  // UNA FILA QUE NADIE MIRÓ. Una fila sin categoría aceptable que pesa menos del tope (MAX_SIN_CAT) es aviso y no se carga.
  // Eso vale para una fila que la categorización MIRÓ y no decidió; no para una que nunca vio: AEK 2024, la verificación abrió las entradas en
  // su nota ("Έσοδα από διεθνείς διοργανώσεις", 1,87 M, pág. 41) después de la etapa 5, el .categorias.json era del día anterior, y la fila
  // se cayó con un aviso (3,2% de los ingresos); solo frenó el tie-out del resultado, sin decir qué fila faltaba. Escalón antes del tope,
  // con UNA compuerta: la fila está impresa en el documento (tiene página), no está en el .categorias.json y nada le dio categoría
  // (precedente, cola, ajuste) -> frena con su nombre. Las "Diferencia de redondeo" de una nota (verificar.mjs, sin página) no entran.
  const nuncaVistas = filas.filter((f) => f.destino === 'sin-categoria' && !f.enLista && !f.cat && f.page != null);
  if (nuncaVistas.length) frena('categorizacion', `${nuncaVistas.length} fila(s) impresa(s) que no están en el .categorias.json (la verificación las abrió después de categorizar): ${nuncaVistas.slice(0, 4).map((f) => `"${f.label.slice(0, 50)}" ${r6(f.native)} (pág. ${f.page})`).join('; ')}. Volver a correr la etapa 5 o categorizarlas en la cola (node tools/cola.mjs --corregir-categoria)`);
  for (const side of ['revenue', 'expense']) {
    const delLado = filas.filter((f) => f.destino === side || ((f.destino === 'sin-categoria' || f.destino === 'confianza-baja') && (f.ladoDoc || ladoDeCat(f.cat) || 'revenue') === side));
    const sin = delLado.filter((f) => f.destino !== side);
    const share = suma(delLado) ? suma(sin) / suma(delLado) : 0;
    if (sin.length) P.avisos.push(`${side === 'revenue' ? 'ingresos' : 'gastos'}: ${sin.length} fila(s) sin categoría aceptable (${(share * 100).toFixed(1)}% del dinero del lado): ${sin.slice(0, 5).map((f) => `"${f.label.slice(0, 50)}" (${f.enLista ? `${f.cat || 'null'} ${f.conf ?? ''}` : 'no está en categorias.json'})`).join('; ')}`);
    if (share > MAX_SIN_CAT) frena('categorizacion', `${(share * 100).toFixed(1)}% del dinero de ${side === 'revenue' ? 'ingresos' : 'gastos'} queda sin categoría aceptable (tope ${(MAX_SIN_CAT * 100).toFixed(0)}%): ${sin.slice(0, 3).map((f) => `"${f.label.slice(0, 40)}" ${r6(f.native)} (${f.enLista ? `${f.cat || 'null'} ${f.conf ?? ''}` : 'no está en categorias.json'})`).join('; ')}`);
  }
  const contra = filas.filter((f) => f.ladoContradictorio);
  if (contra.length) P.avisos.push(`${contra.length} fila(s) con categoría de un lado y el documento del otro: ${contra.slice(0, 4).map((f) => `"${f.label.slice(0, 40)}" -> ${f.cat}`).join('; ')}`);
  const noRubro = filas.filter((f) => f.destino === 'no-rubro');
  if (noRubro.length) P.avisos.push(`${noRubro.length} fila(s) elegidas por proponer-carga que la etapa 3 no tiene como rubro y sin lado (no se cargan): ${noRubro.slice(0, 4).map((f) => `"${f.label.slice(0, 30)}"`).join(', ')}`);
  return { suma, contra };
}

// 5. Los signos: por tabla de origen y las lecturas alternativas de gastos y de financiero / impuesto.
export function faseSignos(ctx) {
  const { filas, P, frena } = ctx;
  const rev = filas.filter((f) => f.destino === 'revenue'); const exp = filas.filter((f) => f.destino === 'expense');
  // POR TABLA DE ORIGEN, no por documento (bug de la primera versión, PSV 2020): el estado principal imprime "Afschrijving op
  // vergoedingssommen -22.305" con signo y la nota de gastos "Wedstrijdkosten 5.113" sin signo; mirando el documento entero ganaba "sin
  // signo" y la amortización quedaba POSITIVA. Cada tabla decide por la mayoría de SUS filas de gasto (y de ingreso).
  const tablaDe = (f) => String(f.origen || '').replace(/\s*\(ancla.*$/, '');
  const conSigno = new Map(); const revInv = new Map();
  for (const k of new Set(filas.map(tablaDe))) {
    const e2 = exp.filter((f) => tablaDe(f) === k); const r2 = rev.filter((f) => tablaDe(f) === k);
    conSigno.set(k, e2.length ? e2.filter((f) => f.native < 0).length >= e2.length / 2 : true);
    revInv.set(k, r2.length >= 2 && r2.filter((f) => f.native < 0).length > r2.length / 2);
  }
  // Un gasto suelto (una sola fila de gasto en su tabla) no alcanza para decidir: toma lo que diga el resto del documento.
  const expDoc = exp.length ? exp.filter((f) => f.native < 0).length >= exp.length / 2 : true;
  for (const k of conSigno.keys()) if (exp.filter((f) => tablaDe(f) === k).length === 1) conSigno.set(k, expDoc);
  for (const f of rev) f.amountNative = r6(f.signoFijo !== undefined ? f.signoFijo : revInv.get(tablaDe(f)) ? -f.native : f.native);
  const gastosConSigno = expDoc;
  P.signos = { porTabla: Object.fromEntries([...conSigno].map(([k, v]) => [k, v ? 'gastos con signo' : 'gastos sin signo (se invierten)'])) };
  const metaFilas = filas.filter((f) => f.destino === 'netInterest' || f.destino === 'tax');
  const ventaJugadoresFilas = filas.filter((f) => f.destino === 'profitOnPlayerSales'); // ajuste `fila` con destino profit_on_player_sales (Auditora 5)
  // DOS LECTURAS DE SIGNO PARA LOS GASTOS, y la que haga cerrar el resultado impreso gana (si ninguna cierra, se queda la primera y frena):
  //   'por tabla'          la mayoría de las filas de gasto de cada tabla decide si esa tabla imprime los gastos con signo;
  //   'todos negativos'    -|x| para todo gasto. Existe por los estados que MEZCLAN presentaciones en la misma tabla (PSV 2020: "Kostprijs
  //                        van de omzet 3.793" sin signo arriba de "Som der bedrijfslasten" y "Afschrijving op vergoedingssommen -22.305"
  //                        con signo más abajo): ninguna mayoría por tabla acierta las dos.
  // Y dos para el resultado financiero y el impuesto: como sus gastos vecinos, o por las palabras de la etiqueta (gasto/pérdida -> negativo).
  const signoPorPalabras = (f) => (GASTOS_RE.test(norm(f.label)) || /aufwend|expense|cost|charge|gasto|despesa|omkostning|kostnad|udgift|verlust|loss|perdida|negativ/.test(norm(f.label)) || f.destino === 'tax' ? -Math.abs(f.native) : Math.abs(f.native));
  const lecturasGasto = [
    // Cada fila trae el signo que verificó verificar.mjs: un gasto es −M (M negativo = reduce el gasto).
    { nombre: 'signos de la verificación', v: (f) => (f.signoFijo !== undefined ? -f.signoFijo : (conSigno.get(tablaDe(f)) ? f.native : -f.native)) },
    { nombre: 'gastos por tabla', v: (f) => (conSigno.get(tablaDe(f)) ? f.native : -f.native) },
    { nombre: 'gastos todos negativos', v: (f) => -Math.abs(f.native) },
  ];
  const lecturasMeta = [
    { nombre: 'financiero/impuesto como su tabla', v: (f) => ((conSigno.get(tablaDe(f)) ?? gastosConSigno) ? f.native : (f.ladoDoc === 'revenue' ? f.native : -f.native)) },
    { nombre: 'financiero/impuesto por palabras', v: signoPorPalabras },
  ];
  return { rev, exp, metaFilas, ventaJugadoresFilas, lecturasGasto, lecturasMeta };
}
