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
//        [--club sonderjyske-dk] [--palabras "Bruttofortjeneste,reexpres,comparab"]   el club (sus precedentes) y las palabras que se buscan en CONVENCIONES-DATOS.md
//        [--escribir]                             sin esto solo imprime (ensayo); no pisa un archivo que ya existe
//   Escribe Admin/mediciones/<id>-votacion-<slug>.md. Las citas de los votos no se verifican acá todavía.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { rutaData } from './data-clubes.js';

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
if (existsSync(salida)) falla(`Ya existe ${salida.replace(`${ROOT}/`, '')}: no se pisa.`);

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
if (club) {
  let json = null; try { json = rutaData(club).replace(/-data\.js$/, '.json'); } catch { /* club sin ruta */ }
  if (json && existsSync(resolve(ROOT, json))) {
    precedentes.push(`- Mismo club (criterio 1): ${json}${existsSync(resolve(ROOT, `Admin/carga-clubes/${club}.md`)) ? ` y Admin/carga-clubes/${club}.md` : ''}`);
    const otros = readdirSync(resolve(ROOT, dirname(json))).filter((f) => f.endsWith('.json') && f !== basename(json)).map((f) => `${dirname(json)}/${f}`);
    precedentes.push(`- Mismo país (criterio 3): ${otros.length} clubes en ${dirname(json)}/ (los votantes buscan los que tuvieron el mismo hecho; ejemplos: ${otros.slice(0, 6).map((f) => basename(f)).join(', ')})`);
  } else precedentes.push(`- Mismo club: no se encontró el JSON de «${club}» (rutaData)`);
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
  "criterios": { "1": { "valor": "a favor | en contra | no aplica", "cita": "archivo:línea o club-año" }, "2": {}, "…": {}, "9": {} },
  "anios_que_cambian": ["club-año"],
  "no_abri": ["rutas de la lista de arriba que no abriste"] }
\`\`\`

Un precedente (criterios 1 a 4) cuenta solo con su cita y siendo el mismo hecho económico. Lo que no abriste va en \`no_abri\`: no se lo apoya en el texto del caso.
`;
if (!A.includes('--escribir')) { console.log(txt); console.log(`\n(ensayo: no se escribió ${salida.replace(`${ROOT}/`, '')}; agregá --escribir)`); process.exit(0); }
writeFileSync(salida, txt);
console.log(`Escrito ${salida.replace(`${ROOT}/`, '')}. Completá los hechos si faltan y pasale la ruta a los tres votantes. Después: node tools/indice-md.mjs --escribir`);
