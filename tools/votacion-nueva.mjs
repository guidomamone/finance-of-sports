#!/usr/bin/env node
// ============================================================================
// tools/votacion-nueva.mjs — `fos votacion nueva`: el archivo del caso de una votación de criterios (skill votacion-de-criterios), desde una plantilla.
//
// POR QUÉ. Armar a mano el documento que leen los votantes (hechos, números medidos, opciones, rutas) era lo más lento de cada votación. Esta tool pone
// lo que es siempre igual (la marca de primera línea, Conclusión y Destino, el cuánto mueve de la skill sección 4, la lista fija de qué abrir y dónde, el
// formato JSON del voto) y deja a la sesión solo lo que es del caso: los hechos y las opciones.
//
// USO:
//   node tools/votacion-nueva.mjs --id 413 --slug formato-completo-vs-reducido --titulo "un club danés pasa del formato reducido al completo"
//        [--hechos <archivo.md>]                  los hechos y la tabla de números medidos (un .md que escribe la sesión; sin él, queda un marcador)
//        --opcion "A=Cargar 2025 como se imprime|35.69" --opcion "B=…|66.40"     cada opción con su monto (el importe que cambia, en la misma unidad)
//        [--total 66.40]                          el total de ingresos o gastos del año contra el que se mide cuánto mueve (sección 4 de la skill)
//        [--precedente "ref|texto"]               un precedente del mismo hecho (ruta:línea o club-id@año, y un fragmento literal): si se verifica, vota UN votante en vez de tres
//        [--club sonderjyske-dk] [--palabras "Bruttofortjeneste,reexpres,comparab"]   el club (sus precedentes) y las palabras que se buscan en CONVENCIONES-DATOS.md
//        [--escribir]                             sin esto solo imprime (ensayo); no pisa un archivo que ya existe
//   Escribe Admin/mediciones/<id>-votacion-<slug>.md. Las citas de los votos no se verifican acá todavía.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { rutaData } from './data-clubes.js';
import { verificarCita } from './votacion-citas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const val = (k) => { const i = A.indexOf(k); return i < 0 ? undefined : A[i + 1]; };
const todos = (k) => A.flatMap((a, i) => (a === k ? [A[i + 1]] : []));
const falla = (m) => { console.error(m); process.exit(1); };

const id = val('--id'), slug = val('--slug'), titulo = val('--titulo');
if (!/^\d+$/.test(id || '') || !/^[a-z0-9-]+$/.test(slug || '') || !titulo) falla('Uso: node tools/votacion-nueva.mjs --id <punto> --slug <palabras-con-guiones> --titulo "…" --opcion "A=texto|monto" --opcion "B=texto|monto" [--hechos f.md] [--total n] [--club id] [--palabras "a,b"] [--escribir]  (ver la cabecera)');
const opciones = todos('--opcion').map((o) => { const m = /^([A-Z])=(.*?)(?:\|(-?[\d.,]+))?$/s.exec(o); if (!m) falla(`Opción mal escrita: «${o}» (A=texto|monto)`); return { letra: m[1], texto: m[2].trim(), monto: m[3] === undefined ? null : Number(m[3].replace(',', '.')) }; });
if (opciones.length < 2) falla('Hacen falta al menos dos --opcion.');
const salida = resolve(ROOT, 'Admin', 'mediciones', `${id}-votacion-${slug}.md`);
if (A.includes('--escribir') && existsSync(salida)) falla(`Ya existe ${salida.replace(`${ROOT}/`, '')}: no se pisa.`);

// cuánto mueve (skill, sección 4): la diferencia entre cada par de opciones sobre el total del año; 1 % o menos no se vota
const total = val('--total') === undefined ? null : Number(val('--total').replace(',', '.'));
const mueve = [];
for (let i = 0; i < opciones.length; i++) for (let j = i + 1; j < opciones.length; j++) {
  const a = opciones[i], b = opciones[j]; if (a.monto === null || b.monto === null) continue;
  const d = Math.abs(a.monto - b.monto); const pct = total ? (d / Math.abs(total)) * 100 : null;
  mueve.push(`- ${a.letra} contra ${b.letra}: diferencia ${d.toLocaleString('es-AR', { maximumFractionDigits: 3 })}${pct === null ? ' (falta --total para el porcentaje)' : `, ${pct.toLocaleString('es-AR', { maximumFractionDigits: 2 })} % del total ${total}`}${pct !== null ? (pct <= 1 ? ': 1 % o menos, no se vota si no le cambia el signo al resultado (se elige la más fiel al documento, criterio 5, y se anota la medida)' : ': más de 1 %, votan tres') : ''}`);
}

// qué abrir y dónde: los renglones de CONVENCIONES-DATOS.md con las palabras del caso, y los precedentes del club y del país
const palabras = (val('--palabras') || '').split(',').map((s) => s.trim()).filter(Boolean);
const leer = (rel) => { try { return readFileSync(resolve(ROOT, rel), 'utf8').split('\n'); } catch { return []; } };
const conv = leer('Admin/CONVENCIONES-DATOS.md');
const reglas = palabras.map((p) => {
  const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const hits = conv.flatMap((l, i) => (re.test(l) ? [`  - Admin/CONVENCIONES-DATOS.md:${i + 1} — ${l.replace(/\s+/g, ' ').trim().slice(0, 110)}`] : [])).slice(0, 6);
  return `- «${p}»: ${hits.length ? `\n${hits.join('\n')}` : 'ningún renglón de CONVENCIONES-DATOS.md (buscar en la skill club-data-mapping y su referencia/)'}`;
});
const club = val('--club');
const precedentes = [];
// la liga del club en su último ejercicio, y los demás clubes que jugaron en ella (data/club-leagues/<iso2>.js)
function mismaLiga(clubId) {
  const f = resolve(ROOT, 'data', 'club-leagues', `${clubId.split('-').pop()}.js`);
  if (!existsSync(f)) return null;
  const filas = [...readFileSync(f, 'utf8').matchAll(/^\s*'([a-z0-9-]+)':\s*\{([^}]*)\}/gm)].map((m) => ({ id: m[1], anios: [...m[2].matchAll(/(\d{4}):\s*'([^']+)'/g)].map((x) => [Number(x[1]), x[2]]) }));
  const propia = filas.find((x) => x.id === clubId); if (!propia?.anios.length) return null;
  const liga = propia.anios.sort((a, b) => b[0] - a[0])[0][1];
  return { liga, clubes: filas.filter((x) => x.id !== clubId && x.anios.some(([, l]) => l === liga)).map((x) => x.id) };
}
if (club) {
  let json = null; try { json = rutaData(club).replace(/-data\.js$/, '.json'); } catch { /* club sin ruta */ }
  if (json && existsSync(resolve(ROOT, json))) {
    precedentes.push(`- Mismo club (criterio 1): ${json}${existsSync(resolve(ROOT, `Admin/carga-clubes/${club}.md`)) ? ` y Admin/carga-clubes/${club}.md` : ''}`);
    const ml = mismaLiga(club);
    if (ml) precedentes.push(`- Misma liga (criterio 2), ${ml.liga}: ${ml.clubes.length} clubes${ml.clubes.length ? ` (${ml.clubes.slice(0, 8).join(', ')})` : ''}; sus JSON están en ${dirname(json)}/`);
    const otros = readdirSync(resolve(ROOT, dirname(json))).filter((f) => f.endsWith('.json') && f !== basename(json)).map((f) => `${dirname(json)}/${f}`);
    precedentes.push(`- Mismo país (criterio 3): ${otros.length} clubes en ${dirname(json)}/ (los votantes buscan los que tuvieron el mismo hecho; ejemplos: ${otros.slice(0, 6).map((f) => basename(f)).join(', ')})`);
  } else precedentes.push(`- Mismo club: no se encontró el JSON de «${club}» (rutaData)`);
}

// ¿cuántos votan? (skill, sección 4): 1 % o menos y sin cambio de signo, nadie; un precedente verificado del mismo hecho (--precedente "ref|texto"), un votante que lo confirma; si no, tres
let cuantos = 'tres votantes, para que siempre haya desempate';
const pct1 = mueve.length && total && mueve.every((l) => /1 % o menos/.test(l));
if (pct1) cuantos = 'ninguno si no le cambia el signo al resultado: se elige la opción más fiel al documento (criterio 5) y se anota la medida';
else if (val('--precedente')) {
  const [ref, ...resto] = val('--precedente').split('|'); const r = verificarCita({ ref, texto: resto.join('|') });
  cuantos = r.ok ? `UN votante, que confirma que el precedente ${ref} es el mismo hecho económico (la cita se verificó con votacion-citas.mjs); si no lo confirma, votan tres` : `tres votantes (el precedente ${ref} NO se verificó: ${r.motivo})`;
}

const hechos = val('--hechos') ? readFileSync(resolve(ROOT, val('--hechos')), 'utf8').trim() : '(la sesión escribe acá los hechos: el club, el documento y la línea del .md, qué está en duda, y la tabla de números medidos)';
const txt = `<!-- md: el caso de la votación del ${id} (${titulo}) con los números medidos | leer: al votar o al revisar esa decisión -->
# Votación ${id}: ${titulo}

Conclusión: (se completa al contar los votos: la opción, el resultado en \`Admin/registros/auditoria-proceso.jsonl\` y la regla que salga en \`Admin/CONVENCIONES-DATOS.md\`)
Destino: (la regla o la carga que cambia)

## El caso

${hechos}

## Las opciones

${opciones.map((o) => `- **${o.letra}.** ${o.texto}${o.monto === null ? '' : ` (monto: ${o.monto})`}`).join('\n')}

## Cuánto mueve (skill votacion-de-criterios, sección 4)

${mueve.length ? mueve.join('\n') : '(sin montos en las opciones: se mide a mano y se anota acá)'}

Votan: ${cuantos}.

## Qué abrir y dónde (lista fija: el votante no decide qué mirar, mira esto)

1. Las reglas que salen de las palabras del caso:
${reglas.length ? reglas.join('\n') : '- (sin --palabras: grep de las palabras del caso en Admin/CONVENCIONES-DATOS.md)'}
2. Precedentes (escala de la skill, criterios 1 a 4):
${precedentes.length ? precedentes.join('\n') : '- (sin --club)'}
3. La escala y cómo se vota: .claude/skills/votacion-de-criterios/SKILL.md (secciones 2 y 3).
4. Una votación anterior sobre el mismo hecho: grep del hecho en Admin/registros/auditoria-proceso.jsonl.

## Cómo devolver el voto (JSON, no prosa)

\`\`\`json
{ "opcion": "A",
  "criterios": {
    "1": { "valor": "a favor | en contra | no aplica", "cita": { "ref": "ruta/archivo.md:123 (o :123-130) | club-id@2023", "texto": "fragmento LITERAL de esa línea o de ese ejercicio", "mismo_hecho": true } },
    "2": {}, "…": {}, "9": {} },
  "anios_que_cambian": ["club-año"],
  "no_abri": ["rutas de la lista de arriba que no abriste"] }
\`\`\`

Se guarda un archivo por votante. Antes de contar: \`node tools/votacion-citas.mjs <voto.json …>\` verifica cada cita (la línea existe y contiene el texto) y \`node tools/votacion-contar.mjs <voto1.json> <voto2.json> <voto3.json> --caso "…" --escribir\` cuenta, verifica y anota. Un precedente (criterios 1 a 3) suma solo con la cita verificada y \`mismo_hecho: true\`; un voto cuya cita no se verifica no suma. Lo que no abriste va en \`no_abri\`: no se lo apoya en el texto del caso.
`;
if (!A.includes('--escribir')) { console.log(txt); console.log(`\n(ensayo: no se escribió ${salida.replace(`${ROOT}/`, '')}; agregá --escribir)`); process.exit(0); }
writeFileSync(salida, txt);
console.log(`Escrito ${salida.replace(`${ROOT}/`, '')}. Completá los hechos si faltan y pasale la ruta a los tres votantes. Después: node tools/indice-md.mjs --escribir`);
