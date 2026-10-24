// ============================================================================
// tools/cargar-categorias.mjs — la fase de proponer() que decide la categoría de cada fila: la escalera, la cola humana y el escalón de materialidad
// Mudado de tools/cargar.mjs sin cambiar una línea (salvo `export`); tools/cargar.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { precedenteFamilia, agregarCaso, casoYRespuesta, respuestaPorDetalle, cerrarResueltoPorClub, respuestasDonde, ajustesDe, esLineaJunta, datosCategoria, ARCHIVO_APRENDIDAS, padreDe, padreEnClub, padreEnDoc, mismoPadre, contextoFila, sinMarca, NOMBRE_CAT, claveFamilia, FINANCIERO_RE, IMPUESTO_GANANCIAS_RE, IMPUESTO_SOLO_RE, UMBRAL_CLAUDE, norm, r6 } from './cargar.mjs';

// 4. La categoría de cada fila: la escalera, la cola humana y el escalón de materialidad.
export function faseCategorias(ctx) {
  const { catPath, P, club, cd, clubId, year, ladoDeCat, incluirNoRubro, sf, frena, pdf, e, per, reemplaza, voltearRespuestas, moneda, agregarCaso } = ctx;
  const cj = existsSync(catPath) ? JSON.parse(readFileSync(catPath, 'utf8')) : { rubros: [] };
  if (P.suma && existsSync(P.suma.categorias)) cj.rubros = [...(cj.rubros || []), ...(JSON.parse(readFileSync(P.suma.categorias, 'utf8')).rubros || [])]; // las del documento propio primero (porEtiqueta toma la primera)
  // Por etiqueta Y lado: la misma etiqueta puede estar de los dos lados en un documento (Fortaleza 2025 "Diversos"). Si el
  // rubro no trae lado, vale solo por etiqueta.
  const porEtiqueta = new Map(); for (const r of cj.rubros || []) { const k = norm(r.label); if (!porEtiqueta.has(k)) porEtiqueta.set(k, r); if (r.lado && !porEtiqueta.has(`${k}|${r.lado}`)) porEtiqueta.set(`${k}|${r.lado}`, r); }
  // Precedente del mismo club (todos sus años cargados; el año que se carga no está, por definición): exacto o por FAMILIA de etiquetas, con
  // la MISMA regla que el escalón 0 de la categorización (precedenteFamilia() de tools/categorizar-claude.mjs, medida en su comentario). Hasta la
  // Acá había una copia propia, solo exacta y solo con lado conocido.
  const lineasClub = [];
  for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const [y, ls] of Object.entries(cd[key] || {})) for (const l of ls || []) if (l.rawLabel && l.normalizedCategory) lineasClub.push({ club: clubId, year: String(y), side, label: l.rawLabel.trim(), cat: l.normalizedCategory, padre: padreEnClub(clubId, String(y), side, l.rawLabel) });
  // Categoría "aceptable" de una etiqueta: la del .categorias.json (escalón 0/1, o Claude >= --umbral-claude) o, si la etiqueta no está en
  // esa lista, el precedente del club.
  // COMPUERTA DEL LADO en toda la escalera de categorización (escalón a de "lo que cerró en la etapa 6 no se vuelve a decidir"):
  // una categoría del OTRO lado que la fila en el documento no se acepta. La fila baja al precedente del club DE SU LADO; si tampoco hay,
  // se propone la genérica de su lado (otros ingresos / otros gastos) con confianza 0, así llega a la cola como pregunta de sí o no, con la
  // clave "etiqueta|lado". Caso: Fortaleza 2025 "Diversos" 1.986 en otros ingresos, que Jev categorizó other_expenses con 0,99.
  const delOtroLado = (cat, lado) => lado && cat && ladoDeCat(cat) && ladoDeCat(cat) !== lado;
  // NO ES RUBRO (escalón c): en una fila VERIFICADA (la etapa 6 la usó para cerrar el
  // resultado), un "no_es_rubro" por debajo del umbral no la excluye en silencio: sigue el mismo camino que una categoría del otro lado
  // (precedente de su lado, o la genérica a la cola). Caso: Fortaleza 2019 "Total Costo de Ventas" 137.713 y 2020 52.995 (Claude, 0,6).
  const catDe = (label, lado, verificada = false, padre = null) => {
    const k = norm(label);
    let c = (lado && porEtiqueta.get(`${k}|${lado}`)) || porEtiqueta.get(k);
    const noRubroDudoso = verificada && lado && c?.categoria === 'no_es_rubro' && (c.escalon === 2 && (incluirNoRubro || (c.confianza ?? 0) < UMBRAL_CLAUDE));
    const rechazada = c && (delOtroLado(c.categoria, lado) || noRubroDudoso) ? c.categoria : null;
    if (c && !rechazada) return { cat: c.categoria || null, conf: c.confianza ?? null, escalon: c.escalon, fuenteCat: 'categorias.json', enLista: true };
    const p = precedenteFamilia(lineasClub, clubId, lado || null, label, { padre }); // con la nota de la fila: cambios A y B
    if (p && !delOtroLado(p.cat, lado) && !(noRubroDudoso && p.cat === 'no_es_rubro')) return { cat: p.cat, conf: 1, escalon: 0, fuenteCat: `precedente del club, ${p.via} (${rechazada ? `categorias.json decía ${rechazada}` : 'la fila no estaba en categorias.json'})`, enLista: true };
    if (rechazada) return { cat: lado === 'revenue' ? 'other_income' : 'other_expenses', conf: 0, escalon: 2, fuenteCat: `categorias.json decía ${rechazada}${noRubroDudoso ? ` con ${c.confianza} (fila verificada: no se excluye sola)` : ', del otro lado que la fila'}: se propone la genérica de su lado`, enLista: true, ladoRechazado: true };
    return { cat: null, fuenteCat: 'la fila no está en categorias.json ni tiene precedente', enLista: false };
  };
  const aceptable = (c) => c.cat && c.cat !== 'no_es_rubro' && ladoDeCat(c.cat) && (c.escalon !== 2 || (c.conf ?? 0) >= UMBRAL_CLAUDE);
  // ANCLA SIN ABRIR: proponer-carga abre un renglón del estado en la nota que lo desglosa, pero la lista de rubros de la etapa 3 del pipeline
  // (y por lo tanto el .categorias.json) solo tiene los renglones de las tablas de ESTADO, no los de las notas. Si alguna fila de una nota
  // abierta queda sin categoría y el renglón del estado que la originó SÍ la tiene, se carga ese renglón entero (menos detalle, pero
  // categorizado) y se avisa. El arreglo de fondo es que la etapa 3 prepare también las filas de las notas que abre el ancla.
  let raw = [];
  const grupos = new Map();
  for (const r of sf.raw) { if (r.ancla) { const k = `${norm(r.ancla.label)}|${r6(r.ancla.native)}`; if (!grupos.has(k)) grupos.set(k, { ancla: r.ancla, hijas: [] }); grupos.get(k).hijas.push(r); } else raw.push(r); }
  const colapsadas = [];
  for (const g of grupos.values()) {
    const faltan = g.hijas.filter((h) => !aceptable(catDe(h.label, h.tside)));
    if (faltan.length && aceptable(catDe(g.ancla.label, g.ancla.tside))) { raw.push({ label: g.ancla.label, page: g.ancla.page, native: g.ancla.native, tside: g.ancla.tside, origen: `estado (ancla sin abrir: ${faltan.length} de ${g.hijas.length} filas de su nota sin categoría)` }); colapsadas.push(g.ancla.label); }
    else raw.push(...g.hijas);
  }
  if (colapsadas.length) P.avisos.push(`${colapsadas.length} renglón(es) del estado cargados SIN abrir su nota, porque la nota no está en la lista de rubros categorizada: ${colapsadas.slice(0, 5).map((l) => `"${l.slice(0, 50)}"`).join('; ')}`);
  // CATEGORÍA DUDOSA -> COLA HUMANA (decisión de Guido: lo que Claude categorizó con menos de 0,80 no se carga solo). Hasta la
  // 330 esas filas quedaban afuera de la carga sin preguntarle a nadie, las sumas dejaban de cerrar y el documento frenaba con un "no cierra"
  // engañoso (UC 2025: "Transporte", "Arriendo de Bienes" y "Provisión No Operacionales" afuera = 322.108 de menos, resultado −407.737 en vez
  // de −729.845). Ahora:
  //   - cada una va a la cola como pregunta de sí o no ("¿'Transporte' va como Administración y gastos generales?") con la categoría propuesta;
  //   - mientras espera, cuenta en las sumas con la categoría propuesta (las sumas no se rompen) y el documento frena con "N filas esperan
  //     categoría", no con "no cierra";
  //   - la respuesta de Guido gana sobre cualquier otra categoría de esa fila (aceptar -> la propuesta; corregir --valor <categoría> -> esa;
  //     descartar -> la fila no se carga), y queda en Admin/registros/categorias-aprendidas.jsonl con confianza 1: los años siguientes del mismo club la
  //     toman como precedente gratis (memoria-categorias.mjs).
  // `clave`: la etiqueta normalizada, o "etiqueta|lado" para la pregunta propia de una fila cuyo lado contradice la respuesta
  // que ya hay para la etiqueta (ver COMPUERTA DEL LADO abajo).
  const respuestaCat = (label, clave = norm(label), padre = null, lado = null, { familia = false, propuesta = null } = {}) => {
    let { caso, resp } = casoYRespuesta(pdf, 'cargar', 'categoria', clave);
    // Si no hay respuesta para ESTE documento, vale la de otro documento del MISMO club con la misma etiqueta ("Otras ganancias
    // (pérdidas)" de UC llegaba a la cola una vez por año, 2010-2014). La carpeta del documento identifica al club.
    // la respuesta de OTRO documento del club vale solo si la fila está en la MISMA nota allá y acá (si no se sabe la
    // nota de alguna de las dos, como antes). Caso: "Serviços de terceiros", contestado para la fila de "Custo com futebol" (Goiás 2024-2025),
    // se aplicaba a 2008-2016, donde está en el bloque administrativo.
    const mismaNota = (c) => { if (!padre || !lado) return true; const otro = padreEnDoc(c.md || c.pdf.replace(/\.pdf$/i, '.md'), lado, label); return otro == null || mismoPadre(otro, padre); };
    // UN `aceptar` DE OTRO DOCUMENTO VALE SOLO CON LA MISMA PROPUESTA. `aceptar` dice "la propuesta de ESE caso está bien", no
    // "esta etiqueta va siempre ahí": si en este documento la fila tiene otra propuesta, la respuesta de allá no decide (sigue la escalera:
    // su propia categoría o la cola con su pregunta). `corregir` nombra la categoría y vale como antes. Casos de daño silencioso: Fortaleza
    // "auxilio de transporte", Goiás "servicos de terceiros", Avaí "viagens e hospedagens", Ferroviária "aluguel".
    // Lo que deja de decidir NO baja a la categoría propia de la fila (eso sería decidir distinto, no menos): pide una segunda mirada. Si el
    // `aceptar` salteado es lo único que había, la fila va a la cola con su propuesta y la nota de lo aceptado allá (`choque`), y no se
    // prueban los escalones A y B. Un `aceptar` del OTRO lado no choca: lo resuelve la clave "etiqueta|lado" (COMPUERTA DEL LADO, abajo).
    // Casos: Gil Vicente 2020-21 "Provisões (aumentos/reduções)" (aceptado other_amortisation en 2022-2024; acá la propuesta es
    // admin_general_expense), Braga 2015-16 "Direitos de formação", Goiás 2014 "(-) Serviços de terceiros".
    const choca = (c, x) => propuesta && x?.decision === 'aceptar' && c.categoriaPropuesta !== propuesta && !(lado && ladoDeCat(c.categoriaPropuesta) && ladoDeCat(c.categoriaPropuesta) !== lado);
    if (!resp) {
      const delClub = (c) => dirname(c.pdf) === dirname(pdf) && mismaNota(c);
      const otra = respuestaPorDetalle('cargar', 'categoria', clave, (c, x) => delClub(c) && !choca(c, x)); if (otra) ({ caso, resp } = otra);
      else { const ch = respuestaPorDetalle('cargar', 'categoria', clave, (c, x) => delClub(c) && choca(c, x)); if (ch) return { choque: ch.caso.categoriaPropuesta, choqueDe: ch.caso.pdf.split('/').pop() }; }
    }
    // ESCALÓN A: la respuesta de otro documento del MISMO club con una etiqueta de la MISMA FAMILIA (mismaFamilia() de
    // tools/vocabulario.mjs: sin la marca de lista "b)", "c)", "-", sin mayúsculas ni acentos). Hasta acá solo valía la etiqueta exacta y la
    // familia solo se usaba con los años ya CARGADOS. Caso: Atalanta 2024 "oneri sociali" volvió a preguntar lo contestado en 2021 como
    // "b) oneri sociali" (2021 no estaba cargado todavía). Compuertas: mismo lado (si la clave lo lleva), misma nota (la fila del otro
    // documento se busca con SU etiqueta) y una sola categoría entre todas las respuestas de la familia; si el club respondió distinto, no decide.
    // SOLO para una fila que iba a la cola (`familia`): lo que el precedente, Jev o Claude ya decidieron con confianza no se pisa (medido: sin
    // esto cambiaban categorías de años cargados, ej. Fortaleza "Auxilio hotelero"). Y familia ESTRICTA: claveFamilia() igual, sin la
    // tolerancia de letras de mismaFamilia() ("materiali" e "immateriali" difieren en 2 letras y son opuestas: Hellas Verona 2020).
    let viaFamilia = null;
    const catDe = ({ caso: c, resp: x }) => (x.decision === 'aceptar' ? c.categoriaPropuesta : x.decision === 'corregir' ? String(x.valor || '').trim() : x.decision === 'descartar' ? '(descartar)' : null);
    if (!resp && familia) {
      const [base, ladoClave] = String(clave).split('|');
      // misma nota, o una fila es el RENGLÓN del estado y la otra su HOJA en la nota que lo abre (Atalanta: 2021 "b) oneri sociali" en el
      // estado; 2024 "oneri sociali", hoja de la nota que abre "b) oneri sociali")
      const mismaNotaDe = (c, et) => { if (!padre || !lado) return true; const otro = padreEnDoc(c.md || c.pdf.replace(/\.pdf$/i, '.md'), lado, et);
        return otro == null || mismoPadre(otro, padre) || (otro === 'estado' && claveFamilia(padre) === claveFamilia(et)) || (padre === 'estado' && claveFamilia(otro) === claveFamilia(base)); };
      const fam = respuestasDonde('cargar', 'categoria', (c) => { const [et, ld] = String(c.detalle).split('|'); return dirname(c.pdf) === dirname(pdf) && ld === ladoClave && et !== base && claveFamilia(et) === claveFamilia(base) && mismaNotaDe(c, et); });
      // compuerta de lado: una categoría del otro lado no vale (Fortaleza 2017 "transporte", gasto, tomaba "transportes", ingreso)
      const cats = new Set(fam.map(catDe).filter(Boolean));
      if (cats.size === 1 && (!lado || [...cats][0] === '(descartar)' || !ladoDeCat([...cats][0]) || ladoDeCat([...cats][0]) === lado)) { const ult = fam.filter((x) => catDe(x)).sort((a, b) => String(b.resp.ts).localeCompare(String(a.resp.ts)))[0]; ({ caso, resp } = ult); viaFamilia = `familia de "${String(caso.detalle).split('|')[0]}" (${caso.pdf.split('/').pop()})`; }
    }
    // ESCALÓN B: la respuesta de OTROS CLUBES DEL MISMO PAÍS, solo para una fila que iba a la cola. Mínimo 1 club
    //: en Grecia solo AEL Larissa había contestado "Κόστος πωλήσεων" y Asteras, Levadiakos y OFI
    // volvieron a preguntarlo. Medido sobre las respuestas existentes: con 2 clubes decide 34 y acierta 34; con 1, decide 59 y acierta 59.
    // Una respuesta que saca la fila (descartar) no decide desde otro club (sacaFila, abajo).
    // Compuertas: misma etiqueta (claveFamilia), mismo lado, mismo CONTEXTO (contextoFila(): la nota que la abre o, en el estado, el renglón
    // título de arriba), respondida en al menos 1 club y todos con la misma categoría. Caso: "c) trattamento di fine rapporto" bajo
    // "per il personale" (wages_squad en varios clubes); "altri costi" no se generaliza porque cada club lo tiene bajo otro título.
    if (!resp && familia && lado) {
      const ctx = contextoFila(P.md, label, lado);
      if (ctx) {
        const [base, ladoClave] = String(clave).split('|'); const fb = claveFamilia(base);
        const clubDe = (p) => String(p).split('/').slice(0, 3).join('/'); const pais = pdf.split('/')[1];
        const otros = respuestasDonde('cargar', 'categoria', (c) => { const [et, ld] = String(c.detalle).split('|'); return c.pdf.split('/')[1] === pais && clubDe(c.pdf) !== clubDe(pdf) && ld === ladoClave && claveFamilia(et) === fb && contextoFila(c.md || c.pdf.replace(/\.pdf$/i, '.md'), et, lado) === ctx; }).filter((x) => catDe(x));
        const clubes = new Set(otros.map((x) => clubDe(x.caso.pdf))); const cats = new Set(otros.map(catDe)); const unica = [...cats][0];
        if (clubes.size >= 1 && cats.size === 1 && (unica === '(descartar)' || !ladoDeCat(unica) || ladoDeCat(unica) === lado)) {
          ({ caso, resp } = otros.sort((a, b) => String(b.resp.ts).localeCompare(String(a.resp.ts)))[0]);
          viaFamilia = `precedente del país: ${clubes.size} clubes (${[...clubes].map((c) => c.split('/')[2]).join(', ')}), ${ctx}`;
        }
      }
    }
    // Y si ESTE documento tenía su propio caso pendiente con esa etiqueta, la respuesta del club ya lo resolvió: se cierra (UC
    // 2013, caso 6c69d0a, seguía en la cola aunque la carga ya usaba la respuesta de 2014).
    // SACAR UNA FILA VALE SOLO PARA SU DOCUMENTO. Una respuesta que saca la fila (`descartar`, o `corregir --valor
    // no_es_rubro`, que la reemplaza desde cola.mjs) decide en el escalón 0 (el caso de ESTE documento) y en ningún otro: si viene de otro
    // documento del club (escalón 1), de la familia (A) o de otros clubes (B), no decide y la fila sigue su camino normal (precedente, Jev, la
    // cola). Caso: diez `descartar` de Novorizontino 2020/2021/2024 con nota "obsoleto: año ya cargado" sacaban "Com pessoal" (wages_squad,
    // −12,08 M en 2022) de 2022, 2023 y 2025; el tie-out frenaba esos años, pero una fila chica o compensada habría pasado.
    const sacaFila = (x) => x && (x.decision === 'descartar' || (x.decision === 'corregir' && String(x.valor || '').trim() === 'no_es_rubro'));
    if (resp && caso && caso.pdf !== pdf && sacaFila(resp)) return null;
    if (resp && caso && caso.pdf !== pdf) cerrarResueltoPorClub(pdf, 'cargar', 'categoria', clave, caso);
    if (!resp || !caso) return null;
    const notaDe = () => [viaFamilia, resp.nota].filter(Boolean).join(' · ') || null;
    if (resp.decision === 'aceptar') return { cat: caso.categoriaPropuesta, nota: notaDe() };
    if (resp.decision === 'corregir' && resp.valor) return { cat: String(resp.valor).trim(), nota: notaDe() };
    if (resp.decision === 'descartar') return { descartar: true };
    return null;
  };
  const aprendidasYa = existsSync(ARCHIVO_APRENDIDAS) ? readFileSync(ARCHIVO_APRENDIDAS, 'utf8') : '';
  // LA MISMA ETIQUETA BAJO DOS RENGLONES. La categoría se decide por etiqueta, y en un estado
  // por función la misma etiqueta cae en dos notas con sentido distinto: PAOK "Αποσβέσεις" en el cuadro de fútbol (amortización de pases) y
  // en los de administración y ventas (bienes y software, 0,2-0,3 M por año), que heredaba player_amortisation; Olympiacos 2025 "Εισφορές
  // κοινωνικής ασφάλισης" en la nota de jugadores y en la de otros empleados. Medido: 227 etiquetas en 81 documentos. UNA compuerta: la
  // etiqueta (del mismo lado) aparece bajo dos o más renglones distintos del documento (el estado cuenta como uno). Para esas filas la
  // categoría por etiqueta (.categorias.json, y el precedente sin contexto, que se arma con lo publicado y puede traer el error) no decide:
  // solo el precedente del club con la MISMA nota; si no hay, a la cola con la clave "etiqueta@renglón" y la categoría por etiqueta como
  // propuesta, así se contesta (o se corrige) una sola de las dos.
  // RENGLÓN DISTINTO = TÍTULO DISTINTO: acá los renglones se separan por su título exacto (sin la marca de nota), no por
  // mismoPadre(), que junta dos títulos con una palabra en común. Olympiacos 2025: "Δαπάνη παροχών ποδοσφαιριστών" (jugadores) y "Δαπάνη
  // παροχών λοιπών εργαζομένων" (otros empleados) comparten "Δαπάνη παροχών" y quedaban como una sola nota, así que "Εισφορές κοινωνικής
  // ασφάλισης" de los otros empleados (1,20 M) heredaba wages_squad sin pregunta. Lo que decide si son distintos de verdad es la compuerta
  // de abajo (dos categorías conocidas y distintas): dos variantes de un mismo título tienen la misma categoría y no preguntan.
  const padresPor = new Map(); const hijasPor = new Map();
  for (const r of raw) {
    const k = `${norm(r.label)}|${r.tside || ''}`; const pd = padreDe(r.origen) || 'estado';
    if (!padresPor.has(k)) padresPor.set(k, []); const ps = padresPor.get(k); if (!ps.some((x) => sinMarca(x) === sinMarca(pd))) ps.push(pd);
    const kh = `${sinMarca(pd)}|${r.tside || ''}`; if (!hijasPor.has(kh)) hijasPor.set(kh, []); hijasPor.get(kh).push(r);
  }
  // "Distintos" = renglones de CATEGORÍA distinta (la del renglón del estado en el .categorias.json): bajo "Gastos de administración" y
  // "Gastos de ventas" (Fortaleza 2017, los dos admin_general_expense) la etiqueta significa lo mismo y no se pregunta; bajo la nota del
  // departamento de fútbol y la de administración (PAOK), no. Medido en prueba-completa + PAOK: sin esto, 9 documentos que cargaban
  // pasaban a la cola con ~60 preguntas (34 solo en Fortaleza 2017). Un renglón sin categoría conocida (un "Total ..." que no está en el
  // .categorias.json) no cuenta: hacen falta dos categorías conocidas y distintas.
  // ESCALERA DE LA CATEGORÍA DEL RENGLÓN. Escalón 0: la del propio renglón (.categorias.json o
  // precedente del club). Escalón 1: si no hay, la de las OTRAS filas que lo abren, si son al menos 2 y todas dicen lo mismo; no cuentan las
  // filas cuya etiqueta también está bajo otro renglón (son las que están en duda). Olympiacos 2025 (pág. 35): los renglones de la nota 6 no
  // están en el .categorias.json (solo las hojas); las otras filas de "jugadores" dan wages_squad y las de "otros empleados",
  // admin_general_expense. Solo propone: la fila en duda sigue yendo a la cola con su clave "etiqueta@renglón".
  const enVarios = (r) => (padresPor.get(`${norm(r.label)}|${r.tside || ''}`) || []).length > 1;
  const catPadre = (pd, lado) => {
    if (pd === 'estado') return 'estado';
    const propia = catDe(pd, lado).cat; if (propia) return propia;
    const cats = (hijasPor.get(`${sinMarca(pd)}|${lado || ''}`) || []).filter((h) => !enVarios(h)).map((h) => catDe(h.label, h.tside).cat);
    const unicas = new Set(cats); return cats.length >= 2 && unicas.size === 1 && cats[0] ? cats[0] : null;
  };
  const repetida = (r) => { const ps = padresPor.get(`${norm(r.label)}|${r.tside || ''}`) || []; return ps.length > 1 && new Set(ps.map((pd) => catPadre(pd, r.tside)).filter(Boolean)).size > 1; };
  const enCola = [];
  const ETIQUETA_GENERICA_RE = /^(?:[a-z]\)|\d+[.)]|[-•])?\s*(?:outros|outras|otros|otras|others|other|altri|altre)\s*(?:\(.*\))?$/;
  const nl0 = (l) => norm(l).trim();
  const filas = raw.map((r) => {
    const f = { label: r.label, page: r.page, native: r.native, ladoDoc: r.tside || null, origen: r.origen, ...(r.signoFijo !== undefined ? { signoFijo: r.signoFijo } : {}), ...catDe(r.label, r.tside, String(r.origen || '').startsWith('verificacion'), padreDe(r.origen)) };
    if (repetida(r)) {
      const pd = padreDe(r.origen) || 'estado';
      const p = precedenteFamilia(lineasClub, clubId, r.tside || null, r.label, { padre: pd });
      if (p?.via === 'exacto-con-contexto' && !delOtroLado(p.cat, r.tside)) Object.assign(f, { cat: p.cat, conf: 1, escalon: 0, fuenteCat: `precedente del club con la misma nota ("${pd}"): la etiqueta está bajo renglones de categoría distinta`, enLista: true });
      else Object.assign(f, { conf: 0, escalon: 2, fuenteCat: `la etiqueta está bajo renglones de categoría distinta; la categoría por etiqueta (${f.cat || 'ninguna'}) no decide para la fila de "${pd}"`, enLista: true, ...(f.cat ? {} : { cat: r.tside === 'revenue' ? 'other_income' : 'other_expenses' }) });
    }
    // COMPUERTA DEL LADO: la respuesta de Guido se aplica solo si su categoría es del MISMO
    // lado que la fila en el documento. Hasta la 373 se aplicaba por etiqueta en todos los años del club: en Fortaleza CEIF, "Auxilio de
    // transporte" es gasto en 2020 y 2023 (nómina) e ingreso en 2021-2024 (de la Dimayor), y "Comisiones" es gasto en 2024 e ingreso en 2025.
    // Si el lado no coincide, la fila sigue por la escalera (y, si no se resuelve, llega a la cola con su propia pregunta).
    // Categoría que trae un ajuste manual (la fila "Diferencia en el documento" de un ajuste `desglose`): escalón 0, gana siempre.
    if (r.catAjuste && ladoDeCat(r.catAjuste) === r.tside) Object.assign(f, { cat: r.catAjuste, conf: 1, escalon: 0, fuenteCat: 'ajuste manual (Admin/registros/ajustes-manuales.jsonl)', enLista: true });
    // AJUSTE MANUAL `categoria`: escalón 0, gana sobre todo, también sobre la compuerta del lado (es una
    // decisión explícita de Guido). Si la categoría es del OTRO lado, la fila se muda sin cambiar su efecto en el resultado: un ingreso de
    // 140 pasa a gasto de +140 (ganancia). Caso: Goiás 2023, la venta del 20% de la Liga Forte União como exceptional_items.
    const ajCat = ajustesDe(pdf).find((a) => a.campo === 'categoria' && norm(a.etiqueta) === norm(r.label) && ladoDeCat(a.valor));
    if (ajCat) {
      Object.assign(f, { cat: ajCat.valor, conf: 1, escalon: 0, fuenteCat: `ajuste manual (Admin/registros/ajustes-manuales.jsonl, ${ajCat.fecha}): ${ajCat.motivo}`, enLista: true, ladoRechazado: false });
      if (r.tside && ladoDeCat(ajCat.valor) !== r.tside) { f.signoFijo = f.signoFijo !== undefined ? -f.signoFijo : -Math.abs(f.native); f.ladoDoc = ladoDeCat(ajCat.valor); }
    }
    const claveBase = repetida(r) ? `${norm(r.label)}@${norm(padreDe(r.origen) || 'estado')}` : norm(r.label); // una pregunta por renglón
    let rg = (r.catAjuste || ajCat) ? null : respuestaCat(r.label, claveBase, padreDe(r.origen), r.tside, { familia: !aceptable(f) && !repetida(r), propuesta: f.cat }); let claveCola = claveBase;
    if (!ajCat && ((rg?.cat && r.tside && ladoDeCat(rg.cat) && ladoDeCat(rg.cat) !== r.tside) || (f.ladoRechazado && !rg))) { claveCola = `${claveBase}|${r.tside}`; rg = respuestaCat(r.label, claveCola, padreDe(r.origen), r.tside, { familia: !aceptable(f), propuesta: f.cat }); }
    if (rg?.cat) {
      Object.assign(f, { cat: rg.cat, conf: 1, escalon: 0, fuenteCat: 'respuesta de Guido en la cola', enLista: true, notaGuido: rg.nota });
      const lado = ladoDeCat(rg.cat);
      // segunda pasada de proponerConEscalera: la respuesta del otro lado muda la fila como el ajuste `categoria`
      if (voltearRespuestas && lado && r.tside && lado !== r.tside) { f.signoFijo = f.signoFijo !== undefined ? -f.signoFijo : -Math.abs(f.native); f.ladoDoc = lado; f.fuenteCat += ' (del otro lado: se muda sin cambiar su efecto, to-do 237 f)'; }
      if (lado && !aprendidasYa.includes(`"label":${JSON.stringify(r.label)},"padre":${JSON.stringify(padreDe(r.origen))},"glosa":null,"categoria":${JSON.stringify(rg.cat)},"confianza":1`)) appendFileSync(ARCHIVO_APRENDIDAS, JSON.stringify({ ts: new Date().toISOString(), club: clubId, year: year != null ? String(year) : null, lado, label: r.label, padre: padreDe(r.origen), glosa: null, categoria: rg.cat, confianza: 1, motivo: 'respuesta de Guido en la cola humana (cargar.mjs)', jevDecia: null, jevConf: null, modelo: 'guido', md: e.md }) + '\n');
    }
    if (rg?.choque) Object.assign(f, { conf: 0, escalon: 2, choque: rg.choque, fuenteCat: `${f.fuenteCat}; en ${rg.choqueDe} se aceptó ${rg.choque} con otra propuesta: no decide, segunda mirada (to-do 237 ad)` });
    if (rg?.descartar) { f.destino = 'excluida'; f.fuenteCat = 'Guido la descartó en la cola'; return f; }
    // "OUTROS" CON LA GENÉRICA DE SU LADO. Una etiqueta genérica de lista cerrada (Outros, Outras, Otros, Otras, Others, Other,
    // Altri, Altre; con o sin marca de lista o nota) cuya propuesta es la genérica de su lado (other_income / other_expenses) se carga sin
    // preguntar: no hay otra lectura posible de la fila. En el formato SNC cada nota cierra con "Outros" y eso solo eran 96 preguntas en
    // Portugal; backtest contra la cola: 34 de 34 respuestas de Portugal coinciden. COMPUERTA: el renglón que abre la fila no tiene una
    // categoría conocida distinta de la genérica (catPadre). Los 2 que no coinciden en la cola son justamente eso: Vila Nova 2025 "Outros"
    // de la nota "Despesas gerais e administrativas" (admin_general_expense) y Cremonese 2025 "altri". La etiqueta repetida (bajo dos
    // renglones, clave "outros@renglón") va con la misma regla y la misma compuerta, NO con la categoría del bloque: las 13 respuestas de
    // la cola dicen la genérica, también bajo "Gastos com pessoal" (Académica 2022-23), donde el bloque habría dado wages_squad. Una
    // respuesta de la cola gana igual (va antes).
    const GENERICA = (lado) => (lado === 'revenue' ? 'other_income' : lado === 'expense' ? 'other_expenses' : null);
    if (!rg?.cat && !ajCat && !aceptable(f) && r.tside && f.cat && f.cat === GENERICA(r.tside) && ETIQUETA_GENERICA_RE.test(nl0(r.label))) {
      const cp = catPadre(padreDe(r.origen) || 'estado', r.tside);
      if (!cp || cp === 'estado' || cp === f.cat) Object.assign(f, { conf: 1, escalon: 'generica', fuenteCat: `${f.fuenteCat} · etiqueta genérica con la genérica de su lado (to-do 237 n)` });
    }
    const nl = norm(r.label);
    const verificadaConLado = String(r.origen || '').startsWith('verificacion') && !!r.tside;
    // Una fila que NO está en la lista de rubros de la etapa 3 y de la que el documento no dice el lado: la etapa 3 la descartó como no-rubro
    // (partidas de balance, cuadros de bienes de uso que el ancla abrió por error). No se carga y no cuenta como "sin categoría".
    if (r.destinoForzado) f.destino = r.destinoForzado; // proceso nuevo: financiero / impuesto decididos por extraer.mjs
    else if (!f.enLista && !f.ladoDoc) f.destino = 'no-rubro';
    // Resultado financiero e impuesto a las ganancias: al fiscalYearMeta, salvo que el precedente del club diga otra cosa (su convención).
    // DESTINO POR PALABRAS (escalón b de "lo que cerró en la etapa 6 no se vuelve a decidir"): "impuesto" / "intereses" en la
    // etiqueta mueven a impuesto o financiero solo una fila SIN lado. Una fila que viene de la verificación con lado ya cerró de ese lado.
    // Casos: Fortaleza 2025 "Impuestos" 11.98 (gasto del equipo profesional) iba a impuesto a las ganancias; 2019 "Intereses por mora"
    // 55.745 (otros ingresos) iba a financiero.
    else if (!verificadaConLado && f.escalon !== 0 && (IMPUESTO_GANANCIAS_RE.test(nl) || IMPUESTO_SOLO_RE.test(nl))) f.destino = 'tax';
    else if (!verificadaConLado && f.escalon !== 0 && FINANCIERO_RE.test(nl) && (!f.cat || f.cat === 'no_es_rubro' || ['other_income', 'other_expenses', 'exceptional_items', 'admin_general_expense'].includes(f.cat))) f.destino = 'netInterest';
    else if (f.cat === 'no_es_rubro') f.destino = 'excluida';
    else if (!f.cat || !ladoDeCat(f.cat)) f.destino = 'sin-categoria';
    else if (!aceptable(f)) {
      // a la cola (ver CATEGORÍA DUDOSA arriba); en las sumas cuenta con la categoría propuesta
      const nombre = NOMBRE_CAT[f.cat] || f.cat;
      f.casoCola = ({ pdf, md: e.md, etapa: 'cargar', motivo: 'categoria', detalle: claveCola, categoriaPropuesta: f.cat, pagina: r.page || null,
        que: `¿"${r.label}" (${Math.abs(r.native)} en millones de la moneda del documento) va como "${nombre}"?  (por qué: la categorización le dio ${f.conf ?? '?'} de confianza, menos que el mínimo ${UMBRAL_CLAUDE}${f.choque ? `; en otro año del club se aceptó como "${NOMBRE_CAT[f.choque] || f.choque}"` : ''})`,
        // una línea que JUNTA amortización de jugadores y depreciación de bienes de uso no se acepta entera: la parte partir-amortizacion.mjs cuando las notas cierran (REGLA de CONVENCIONES-DATOS)
        propuesta: esLineaJunta(r.label) && /player_amortisation|depreciation/.test(f.cat) ? `NO aceptar: la línea junta jugadores y bienes de uso. Se parte con las notas: node tools/partir-amortizacion.mjs "${pdf}" --escribir (y se vuelve a correr el lote). Si las notas no la abren, la REGLA manda la línea entera a player_amortisation con incluidoEn: corregir --valor player_amortisation` : `sí (responder aceptar si estás de acuerdo; si no, corregir --valor <categoría> con una de data/category-map.js)` });
      enCola.push(f); f.enCola = true; f.destino = ladoDeCat(f.cat);
    }
    else f.destino = ladoDeCat(f.cat);
    if ((f.destino === 'revenue' || f.destino === 'expense') && f.ladoDoc && f.ladoDoc !== f.destino) f.ladoContradictorio = true;
    return f;
  });
  P.filas = filas;
  // ESCALÓN DE MATERIALIDAD (pedido de Guido: "si lo que queda en duda representa 1% o menos del total, bajalo a
  // 60%; si son muchas dudas distintas y suman más de 1% de su lado, cola"). Después de todos los escalones de la categorización: por lado
  // (ingresos / gastos), si la suma de TODAS las filas en duda de ese lado es como mucho el 1% del total de ese lado (COMPUERTA), las que
  // tienen confianza 0,60 o más se cargan con su categoría y una nota; las de menos de 0,60 siguen a la cola. Si la suma pasa el 1%, todas a
  // la cola, como antes. Medido al proponerlo: en Fortaleza CEIF ningún año lo pasaba (las dudas iban de 3,4% a 99,7% de su lado).
  for (const lado of ['revenue', 'expense']) {
    const total = filas.filter((f) => f.destino === lado).reduce((a, f) => a + Math.abs(f.native || 0), 0);
    const dudas = enCola.filter((f) => f.destino === lado); const enDuda = dudas.reduce((a, f) => a + Math.abs(f.native || 0), 0);
    if (!dudas.length || !total) continue;
    // TOPE ACUMULADO (407, aprobado por Guido): ya no es todo o nada. Las dudas se toman de la más chica a la más grande mientras lo que se carga SIN preguntar
    // no pase el 1% del total de su lado (el error posible está acotado por ese tope, aunque todas estuvieran mal); las que quedan van a la cola. Piso de confianza 0,5
    // (antes 0,6). Medido contra las respuestas de la cola (1.870 preguntas): con tope de 1% por lado el error acumulado por documento quedó en 1,5% p90.
    // Nunca sin preguntar: la línea que junta amortización de jugadores y depreciación (se parte con las notas) ni una fila cuya categoría chocó con otro año del club.
    let acumulado = 0;
    for (const f of [...dudas].sort((a, b) => Math.abs(a.native || 0) - Math.abs(b.native || 0))) {
      const monto = Math.abs(f.native || 0);
      if ((f.conf ?? 0) < 0.5 || f.choque || esLineaJunta(f.label) || acumulado + monto > 0.01 * total) continue;
      acumulado += monto;
      enCola.splice(enCola.indexOf(f), 1); f.enCola = false; f.casoCola = null; f.escalon = 'materialidad';
      f.fuenteCat = `${f.fuenteCat} · escalón de materialidad: ${(100 * monto / total).toFixed(2)}% de su lado, acumulado ${(100 * acumulado / total).toFixed(2)}% (tope 1%) y confianza ${f.conf}`;
      P.avisos.push(`materialidad: "${f.label}" va como ${f.cat} con ${f.conf} (${(100 * monto / total).toFixed(2)}% de ${lado === 'revenue' ? 'ingresos' : 'gastos'}; acumulado sin preguntar ${(100 * acumulado / total).toFixed(2)}%)`);
    }
    // lo que queda en la cola llega con sus datos y sin «sí» por defecto (407): peso, lo contestado a la misma etiqueta y qué dijo cada modelo
    for (const f of enCola.filter((x) => x.destino === lado && x.casoCola)) {
      const datos = datosCategoria({ etiqueta: f.label, pdf, md: e.md, lado, monto: f.native, totalLado: total, propuesta: f.cat, confClaude: f.conf });
      if (datos) f.casoCola.que += `  ${datos}`;
      if (!/^NO aceptar/.test(f.casoCola.propuesta)) f.casoCola.propuesta = `sin respuesta por defecto: mirá los datos. Si la categoría propuesta (${f.cat}) está bien, responder aceptar; si no, corregir --valor <categoría> con una de data/category-map.js`;
    }
  }
  for (const f of enCola) if (f.casoCola) agregarCaso(f.casoCola);
  for (const f of filas) delete f.casoCola; // (no va al .carga.json)
  if (enCola.length) frena('categoria-en-cola', `${enCola.length} fila(s) esperan categoría en la cola humana (node tools/cola.mjs): ${enCola.slice(0, 5).map((f) => `"${f.label.slice(0, 40)}" -> ${f.cat} ${f.conf ?? ''}`).join('; ')}`);
  return { cj, aceptable, filas };
}
