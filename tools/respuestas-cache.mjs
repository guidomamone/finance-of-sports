// ============================================================================
// tools/respuestas-cache.mjs — MEMORIA DE RESPUESTAS PAGAS de la categorización (Jev y Claude por API), por (club, lado, rubro). Gratis: solo
// lee y agrega líneas a un archivo.
//
// POR QUÉ EXISTE (Versión 321, 2026-09-30). Dos problemas medidos en el test de la etapa 6 (Admin/tests/test-cargar.md):
//   1. PAGAR DOS VECES LO MISMO. La categorización de un documento se invalida entera cuando cambia su lista de rubros (huellas,
//      tools/huellas.mjs), y cada arreglo de la preparación (etapa 3: qué filas, qué escala, qué tablas) cambia las listas de cientos de
//      documentos a la vez. Sin memoria, cada arreglo volvía a mandar a Jev y a Claude las MISMAS filas que ya habían contestado (~US$ 0,04 por
//      documento, cientos de documentos por arreglo). Con memoria, solo se paga lo que es nuevo de verdad.
//   2. JEV NO ES DETERMINISTA (test-cargar.md 4.9): el mismo rubro, en dos corridas, dio `lump_football_operations` y `other_income`, y el
//      umbral 0,90 cae justo en el borde: el mismo documento cargaba en una corrida y frenaba en la otra. Con memoria, la primera respuesta
//      queda y la carga es reproducible.
//
// QUÉ GUARDA: una línea JSON por respuesta, en Generados/_cache/<motor>.jsonl (gitignoreado, como todo Generados/: es un derivado, se puede
// borrar y se rehace pagando). Clave: club | lado | etiqueta normalizada (normalizar() de tools/vocabulario.mjs). NO entra en la clave la
// sección, las vecinas ni los ejemplos que vio el motor: se acepta a propósito que el mismo rubro del mismo club reciba siempre la misma
// categoría, que es lo mismo que ya hace el precedente del club (escalón 0).
//   - jev:    { choice, confidence }  (lo que devuelve askJev() de tools/jev-categorizar.mjs)
//   - claude: { categoria, confianza, motivo, modelo }  (lo que devuelve categorizarConClaude() de tools/categorizar-claude.mjs)
// Nunca se guarda una respuesta con error ni sin categoría. Si la misma clave se guarda dos veces, al leer gana la última.
//
// DIFERENCIA CON Admin/categorias-aprendidas.jsonl (tools/memoria-categorias.mjs): aquel es CONOCIMIENTO (solo lo que Claude resolvió con
// confianza >= 0,80, trackeado en git, se usa como precedente y como ejemplos para otros clubes). Esto es solo para no volver a preguntar:
// guarda TODAS las respuestas, también las de confianza baja, y no se muestra a ningún motor.
//
// CÓMO SE SALTEA: `--sin-cache` en jev-categorizar.mjs / categorizar-claude.mjs vuelve a preguntar todo (y guarda las respuestas nuevas, que
// pasan a ganar). Para medir si un cambio de prompt o de modelo mejora algo, hay que saltearla: si no, se mide la respuesta vieja.
//
// USO:
//   import { abrirCache } from './respuestas-cache.mjs';
//   const cache = abrirCache('jev'); cache.get(club, lado, label); cache.set(club, lado, label, { choice, confidence });
//   node tools/respuestas-cache.mjs           cuántas respuestas hay guardadas por motor
//   node tools/respuestas-cache.mjs --sembrar carga la memoria con lo YA PAGADO: cada Generados/**/*.jev.json (club de su .rubros.json) y
//                                             cada *.categorias.json (sus filas de escalón 2). Se puede repetir: al leer gana la última.
// ============================================================================

import { readFileSync, appendFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { normalizar } from './vocabulario.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const DIR = resolve(ROOT, 'Generados', '_cache');
const clave = (club, lado, label) => `${club}|${lado || ''}|${normalizar(label)}`;

export function abrirCache(motor) {
  const archivo = resolve(DIR, `${motor}.jsonl`);
  const mapa = new Map();
  if (existsSync(archivo)) for (const l of readFileSync(archivo, 'utf8').split('\n')) {
    if (!l.trim()) continue;
    try { const x = JSON.parse(l); mapa.set(x.k, x.v); } catch { /* línea cortada por un Control+C: se ignora */ }
  }
  let nuevas = 0;
  return {
    get: (club, lado, label) => mapa.get(clave(club, lado, label)) || null,
    set(club, lado, label, v) {
      const k = clave(club, lado, label);
      mapa.set(k, v); nuevas++;
      mkdirSync(DIR, { recursive: true });
      appendFileSync(archivo, JSON.stringify({ ts: new Date().toISOString(), k, v }) + '\n');
    },
    get tamano() { return mapa.size; },
    get nuevas() { return nuevas; },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--sembrar')) {
    const jev = abrirCache('jev'); const claude = abrirCache('claude'); let nj = 0; let nc = 0;
    const leer = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
    const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = resolve(d, e.name); if (e.isDirectory()) { if (e.name !== '_cache') walk(p); continue; }
      if (e.name.endsWith('.jev.json')) { const j = leer(p); const rj = leer(p.replace(/\.jev\.json$/, '.rubros.json')); if (!j || !rj?.club) continue;
        for (const r of j.rubros || []) if (!r.error && r.choice && !r.desdeCache) { jev.set(rj.club, r.lado, r.label, { choice: r.choice, confidence: r.confidence ?? null }); nj++; } }
      if (e.name.endsWith('.categorias.json')) { const c = leer(p); if (!c?.club || c.error) continue;
        for (const r of c.rubros || []) if (r.escalon === 2 && !r.desdeCache && r.categoria) { claude.set(c.club, r.lado, r.label, { categoria: r.categoria, confianza: r.confianza ?? null, motivo: r.motivo || null, modelo: c.modelo || null }); nc++; } } } };
    if (existsSync(resolve(ROOT, 'Generados'))) walk(resolve(ROOT, 'Generados'));
    console.log(`Sembrado: ${nj} respuestas de Jev y ${nc} de Claude, de lo que ya estaba en Generados/.`);
  }
  const motores = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.jsonl')).map((f) => f.slice(0, -6)) : [];
  if (!motores.length) console.log('Todavía no hay respuestas guardadas (Generados/_cache/ está vacía).');
  for (const m of motores) console.log(`${m}: ${abrirCache(m).tamano} respuestas guardadas (Generados/_cache/${m}.jsonl)`);
}
