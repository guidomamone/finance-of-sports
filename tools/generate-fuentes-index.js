#!/usr/bin/env node
// ============================================================================
// tools/generate-fuentes-index.js — genera, desde los propios
// `fuentes/_indice/<País>.md`, la sección "Índice de países" de
// `fuentes-por-club.md` (la lista de países con sus tres números, más el
// párrafo de totales que la encabeza).
//
// EL PROBLEMA QUE RESUELVE: desde el split del 2026-09-20 (REGLA 4 de
// `fuentes-por-club.md`), el detalle línea-por-club vive en un archivo por país
// y acá quedó solo el índice. Los tres números de cada línea de país —clubes
// trackeados, cuántos con documento, chequeo más antiguo— se escribieron UNA
// vez, con un script de un solo uso, y desde entonces se mantenían a mano: o
// sea, una copia derivada de otro archivo, mantenida por una persona. Es la
// misma fuga que `generate-club-index.js` cerró para ESTADO.md. Cada sesión de
// sourcing toca `fuentes/_indice/<País>.md`, y actualizar la línea del país acá
// es un paso aparte que se puede olvidar sin que nada se rompa visiblemente.
//
// CÓMO LO RESUELVE: el índice deja de ser prosa paralela y pasa a ser una VISTA
// de los archivos de país. No puede desincronizarse porque no hay nada que
// sincronizar.
//
// LO QUE NO ES MECÁNICO, Y POR QUÉ ESTE SCRIPT ABORTA EN VEZ DE ADIVINAR:
// "cuántos clubes con documento encontrado" no sale de ningún campo
// estructurado. El estado de cada club es PROSA LIBRE que escribe el agente de
// sourcing ("sin PDFs, pendiente todo", "8 ejercicios reales (2018-2025), sin
// cargar aún", "2 memorias descargadas, sin datos financieros cargables"). No
// existe un booleano en ningún lado.
//
// La clasificación original (sesión 2026-09-20) se hizo con las dos listas de
// regex de abajo, y quedó verificada así: de 530 clubes, 518 matchearon señales
// de un solo lado, 0 no matchearon ninguna, y 12 matchearon señales de los dos
// lados — esos 12 se resolvieron A MANO leyendo el estado completo, y están
// abajo en OVERRIDES con su motivo.
//
// Lo importante del diseño: cuando una línea matchea señales de los dos lados,
// o de ninguno, y no tiene override, el script ABORTA (o, con `--check`, la
// marca para revisión). NO adivina. Un heurístico silencioso clasifica mal sin
// que nadie se entere — ej.: "dead-end propio, solo agregado SFL (5 años)"
// matchea un "N años" que PARECE señal de documento y no lo es. Que aborte es
// el mecanismo que hace confiable al script, no un detalle: el costo de una
// línea que hay que resolver a mano cada tanto es mucho menor que el de un
// número publicado que nadie sabe que está mal.
//
// USO:
//   node tools/generate-fuentes-index.js           reescribe la sección
//   node tools/generate-fuentes-index.js --check   no escribe; sale con código 1
//                                                  si quedó desactualizada
//   node tools/generate-fuentes-index.js --debug   imprime la clasificación club
//                                                  por club (para auditar el
//                                                  criterio sin tocar nada)
// ============================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDICE_DIR = path.join(ROOT, 'fuentes/_indice');
const DESTINO = path.join(ROOT, 'fuentes-por-club.md');

// ---------------------------------------------------------------------------
// EL CRITERIO DE "CON DOCUMENTO ENCONTRADO"
//
// Definición (la que está escrita en `fuentes-por-club.md`; no cambiarla sin
// avisarle a Guido): existe al menos un documento financiero identificado y
// ACCESIBLE con cifras de ese club — propio, o un agregado de liga con desglose
// club por club, como la DNCG francesa — aunque todavía no esté cargado al
// sitio. NO cuenta un documento confirmado pero inaccesible (pago, captcha,
// 403), ni un agregado que solo publica el total de la liga (como la DFL
// alemana).
//
// Estas dos listas son las de la corrida original del 2026-09-20, reproducidas
// tal cual. Si agregás una señal nueva, corré el script sobre todo el repo y
// mirá que no reclasifique ninguna línea vieja en silencio.
// ---------------------------------------------------------------------------
const SENAL_SI = [
  /\bcargado\b/i,
  /\d+\s+(ejercicios?|documentos?|memorias?|informes?|balances?|reportes?|temporadas?|pdfs?|archivos?|entidades|tablas|comptes)\b/i,
  /\bdescargad[oa]s?\b/i,
  /\bserie\s+(completa\s+)?\d{4}/i,
  /estados financieros .*reales/i,
  /\bPDF real\b/i,
  /cubierto vía agregado/i,
  /\bauditoría\b/i,
  /\bnotas \d{4}/i,
  /\bsolo \d{4}\b/i,
  /\b(10-K|20-F)\b/i,
  /memoria y presupuesto/i,
  /\bcompleto\b/i,
  /\bparcial\b/i,
];

const SENAL_NO = [
  /\bsin pdfs?\b/i,
  /\bsin eeff\b/i,
  /\bsin hits\b/i,
  /\bnada encontrado\b/i,
  /\bpendiente todo\b/i,
  /\bdead-end\b/i,
  /\bsin fuente p[uú]blica\b/i,
  /\bdominio inalcanzable\b/i,
  /\bsin obligaci[oó]n\b/i,
  /\bno se encontr[oó]\b/i,
  /\bsin estructura\b/i,
  /\bbloquead[oa]s?\b/i,
  /\bsolo agregado\b/i,
  /\bsolo el agregado\b/i,
  /\bsolo para socios\b/i,
  /\bsin secci[oó]n financiera\b/i,
  /sin balance descargable/i,
  /nada bajado/i,
  /no verificado individualmente/i,
  /\bexceptuado\b/i,
  /sin cifras propias/i,
  /sin regulador/i,
  /ni transparencia/i,
  /\bsin cerrar\b/i,
  /bloqueo de tooling/i,
  /sin balance adjunto/i,
  /\binmaterial\b/i,
  /no consolida/i,
  /sin datos financieros cargables/i,
  /\bsin datos\b/i,
  /\bsin adjuntar\b/i,
];

// ---------------------------------------------------------------------------
// LOS 12 CONFLICTOS RESUELTOS A MANO en la corrida del 2026-09-20, leyendo el
// estado completo de cada uno. Clave: `País|Club` con el nombre EXACTO como
// aparece en el texto del link de su línea.
//
// Un override acá no es un parche: es la decisión humana que el script no puede
// tomar. Si el texto de una de estas líneas cambia tanto que deja de ser
// ambiguo, el override sigue mandando (y el script lo avisa como sobrante, para
// que se pueda borrar).
// ---------------------------------------------------------------------------
const OVERRIDES = {
  'Argentina|Belgrano': { doc: false, motivo: 'memorias descargadas, pero sin datos financieros' },
  'Argentina|Gimnasia y Esgrima (La Plata)': { doc: false, motivo: 'memorias descargadas, pero sin datos financieros' },
  'Argentina|Temperley': { doc: false, motivo: 'memorias narrativas' },
  'Brasil|Ceará': { doc: true, motivo: 'dead-end viejo destrabado, 8 ejercicios reales' },
  'Brasil|Fortaleza': { doc: true, motivo: 'dead-end viejo destrabado, 11 ejercicios' },
  'Brasil|Vitória': { doc: true, motivo: 'dead-end viejo destrabado, 1 ejercicio' },
  'Corea del Sur|Ulsan HD': { doc: false, motivo: 'entidad en DART pero sin informes en 10 años' },
  'Francia|OGC Nice': { doc: true, motivo: 'cubierto por el agregado DNCG (lo de INPI bloqueado es aparte)' },
  'Portugal|Tondela': { doc: true, motivo: '1 ejercicio parcial real vía arquivo.pt' },
  'Portugal|Arouca': { doc: false, motivo: '4 ejercicios existen pero truncados en Wayback, no usables' },
  'Suiza|Basel': { doc: true, motivo: '18 documentos 2005-2021' },
  'España|Real Sociedad': { doc: false, motivo: 'el depósito existe, el PDF queda detrás de un informe pago' },
};

// ---------------------------------------------------------------------------
// Parseo de un `fuentes/_indice/<País>.md`.
//
// Una línea de club es `- [Nombre](link) — estado libre`. El link va entre `<>`
// cuando el path tiene espacios o paréntesis. Se EXCLUYEN las líneas cuyo texto
// de link empieza con "Notas generales": apuntan al `_notas-generales.md` del
// país, no son un club. También quedan afuera, por no matchear el formato, las
// líneas sueltas sin link (ej. la del agregado "DFL Finanzkennzahlen" en
// Alemania), que tampoco son clubes.
// ---------------------------------------------------------------------------
const RE_CLUB = /^- \[([^\]]+)\]\((<[^>]+>|[^)]+)\)(.*)$/;
const RE_FECHA = /—\s*Último chequeo:\s*(\d{4}-\d{2}-\d{2})/;

function parsePais(pais, texto) {
  const clubes = [];
  const fechas = [];

  for (const linea of texto.split('\n')) {
    // La fecha del chequeo más viejo sale de TODAS las líneas del archivo, no
    // solo de las de club: una línea de agregado de liga también se chequea.
    const f = linea.match(RE_FECHA);
    if (f) fechas.push(f[1]);

    const m = linea.match(RE_CLUB);
    if (!m) continue;
    const nombre = m[1].trim();
    if (/^Notas generales/i.test(nombre)) continue;

    clubes.push({ pais, nombre, estado: m[3], linea });
  }

  return { pais, clubes, fechaMasVieja: fechas.length ? fechas.sort()[0] : null };
}

// Clasifica una línea de club. Devuelve `true`/`false` si está claro, o un
// objeto `{ ambiguo }` cuando matchea los dos lados o ninguno y no hay override.
function clasificar(club) {
  const clave = `${club.pais}|${club.nombre}`;
  const ov = OVERRIDES[clave];

  const si = SENAL_SI.filter(r => r.test(club.estado));
  const no = SENAL_NO.filter(r => r.test(club.estado));

  if (ov) return { doc: ov.doc, via: 'override', motivo: ov.motivo, si, no };
  if (si.length && !no.length) return { doc: true, via: 'regex', si, no };
  if (no.length && !si.length) return { doc: false, via: 'regex', si, no };

  return {
    ambiguo: si.length && no.length ? 'matchea señales de los DOS lados' : 'no matchea NINGUNA señal',
    si, no,
  };
}

// ---------------------------------------------------------------------------
// Armado de la línea de país, en el formato EXACTO del archivo de hoy.
// ---------------------------------------------------------------------------
function linkPais(pais) {
  const rel = `fuentes/_indice/${pais}.md`;
  // Markdown exige `<>` alrededor del destino cuando tiene espacios o paréntesis.
  return /[ ()]/.test(rel) ? `[${pais}](<${rel}>)` : `[${pais}](${rel})`;
}

function lineaPais(p) {
  if (!p.clubes.length) {
    // Un país saltado o resuelto a nivel liga (hoy Arabia Saudita y Nigeria) no
    // tiene clubes trackeados uno por uno: su archivo es todo notas generales.
    return `- ${linkPais(p.pais)} — sin clubes trackeados individualmente, ver el detalle`;
  }
  const n = p.clubes.length;
  const m = p.clubes.filter(c => c.doc).length;
  const cuenta = `${n} club${n === 1 ? '' : 'es'}, ${m} con documento`;
  const fecha = p.fechaMasVieja ? ` — Chequeo más antiguo: ${p.fechaMasVieja}` : '';
  return `- ${linkPais(p.pais)} — ${cuenta}${fecha}`;
}

function main() {
  const check = process.argv.includes('--check');
  const debug = process.argv.includes('--debug');

  const archivos = fs.readdirSync(INDICE_DIR)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  const paises = archivos.map(f =>
    parsePais(path.basename(f, '.md'), fs.readFileSync(path.join(INDICE_DIR, f), 'utf8')));

  // --- Clasificación, con abort en las ambiguas -----------------------------
  const ambiguas = [];
  const usados = new Set();

  for (const p of paises) {
    for (const c of p.clubes) {
      const r = clasificar(c);
      if (r.ambiguo) {
        ambiguas.push({ club: c, motivo: r.ambiguo, si: r.si, no: r.no });
        continue;
      }
      c.doc = r.doc;
      c.via = r.via;
      if (r.via === 'override') usados.add(`${c.pais}|${c.nombre}`);
      if (debug) {
        console.log(`${r.doc ? 'SÍ' : 'NO'}  ${r.via === 'override' ? '[a mano] ' : '         '}` +
                    `${c.pais} / ${c.nombre}${r.motivo ? `  (${r.motivo})` : ''}`);
      }
    }
  }

  if (ambiguas.length) {
    console.error(
      `\nNO PUEDO CLASIFICAR ${ambiguas.length} línea${ambiguas.length === 1 ? '' : 's'}, ` +
      `y no las voy a adivinar.\n\n` +
      `Leé el estado completo de cada club en su \`fuentes/<País>/<Club>.md\`, decidí si tiene o no\n` +
      `un documento accesible con cifras propias (o un agregado con desglose club por club), y\n` +
      `agregá la decisión a OVERRIDES en este mismo script, con el motivo escrito.\n`);
    for (const a of ambiguas) {
      console.error(`  ${a.club.pais} / ${a.club.nombre} — ${a.motivo}`);
      console.error(`    línea: ${a.club.linea.trim()}`);
      if (a.si.length) console.error(`    señales SÍ: ${a.si.map(String).join(' ')}`);
      if (a.no.length) console.error(`    señales NO: ${a.no.map(String).join(' ')}`);
    }
    process.exit(1);
  }

  // Un override que ya no matchea ninguna línea es basura acumulada: avisarlo,
  // pero no es motivo para frenar la corrida.
  const sobrantes = Object.keys(OVERRIDES).filter(k => !usados.has(k));
  if (sobrantes.length) {
    console.warn(`OJO: ${sobrantes.length} override(s) de este script ya no matchean ninguna línea ` +
                 `(el club se renombró o se borró). Revisalos y borralos: ${sobrantes.join(', ')}`);
  }

  // Un país con clubes pero sin ninguna fecha de chequeo sale sin el tercer
  // número. No es un error, pero conviene verlo: la REGLA del 2026-09-12 pide
  // fecha en cada línea que se revisa.
  const sinFecha = paises.filter(p => p.clubes.length && !p.fechaMasVieja);
  if (sinFecha.length) {
    console.warn(`OJO: ${sinFecha.length} país(es) con clubes pero sin ninguna fecha de "Último chequeo": ` +
                 sinFecha.map(p => p.pais).join(', '));
  }

  // --- Armado del bloque ---------------------------------------------------
  const lista = paises.map(lineaPais).join('\n');
  const totalClubes = paises.reduce((a, p) => a + p.clubes.length, 0);
  const totalDoc = paises.reduce((a, p) => a + p.clubes.filter(c => c.doc).length, 0);
  const totales = `Hoy: **${paises.length} países,\n${totalClubes} clubes trackeados, ${totalDoc} con documento encontrado.**`;

  if (debug) {
    console.log(`\n${paises.length} países, ${totalClubes} clubes, ${totalDoc} con documento.`);
  }

  // --- Reemplazo dentro de `fuentes-por-club.md` ---------------------------
  //
  // No se usan marcadores tipo CLUB-INDEX:START/END como en
  // `generate-club-index.js`: agregarlos habría sido la primera diferencia
  // contra el archivo de hoy, y la verificación de esta tarea es justamente que
  // el generador NO cambie ni una línea. Se ancla en la estructura que ya
  // existe: la sección va desde el heading `## Índice de países` hasta el `---`
  // siguiente, y adentro se reemplazan dos cosas — la frase de totales y el
  // bloque contiguo de líneas `- [`.
  const original = fs.readFileSync(DESTINO, 'utf8');
  const iSec = original.indexOf('\n## Índice de países\n');
  if (iSec === -1) {
    console.error('ERROR: no encontré el heading "## Índice de países" en fuentes-por-club.md.');
    process.exit(1);
  }
  const jSec = original.indexOf('\n---\n', iSec);
  if (jSec === -1) {
    console.error('ERROR: no encontré el cierre "---" de la sección "## Índice de países".');
    process.exit(1);
  }

  let seccion = original.slice(iSec, jSec);

  const RE_TOTALES = /Hoy: \*\*\d+ países,\n\d+ clubes trackeados, \d+ con documento encontrado\.\*\*/;
  if (!RE_TOTALES.test(seccion)) {
    console.error('ERROR: no encontré el párrafo de totales ("Hoy: **N países, ...") en la sección.');
    process.exit(1);
  }
  seccion = seccion.replace(RE_TOTALES, totales);

  const lineas = seccion.split('\n');
  const primera = lineas.findIndex(l => l.startsWith('- ['));
  let ultima = -1;
  for (let k = lineas.length - 1; k >= 0; k--) {
    if (lineas[k].startsWith('- [')) { ultima = k; break; }
  }
  if (primera === -1) {
    console.error('ERROR: no encontré ninguna línea de país en la sección "## Índice de países".');
    process.exit(1);
  }
  seccion = [...lineas.slice(0, primera), lista, ...lineas.slice(ultima + 1)].join('\n');

  const nuevo = original.slice(0, iSec) + seccion + original.slice(jSec);

  if (nuevo === original) {
    console.log(`fuentes-por-club.md ya está al día (${paises.length} países, ${totalClubes} clubes, ${totalDoc} con documento).`);
    return;
  }
  if (check) {
    console.error('fuentes-por-club.md quedó DESACTUALIZADO respecto de los fuentes/_indice/<País>.md. Corré: node tools/generate-fuentes-index.js');
    process.exit(1);
  }

  fs.writeFileSync(DESTINO, nuevo, 'utf8');
  console.log(`fuentes-por-club.md actualizado: ${paises.length} países, ${totalClubes} clubes, ${totalDoc} con documento.`);
}

main();
