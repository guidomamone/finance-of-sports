// tools/partir-fases.mjs: parte una función enorme en fases con un `ctx`, sin cambiar el texto de cada tramo (así se partieron
// proponer() de cargar.mjs y verificar()). Cada fase lee del ctx lo que usa y devuelve lo que declara y las siguientes usan; una variable
// `let` que se reasigna entre fases o dentro de una función pasa a ser `ctx.N` en todos sus usos. Mide llaves, strings, plantillas y regex
// (tools/lexico-js.mjs), avisa de una reasignación peligrosa y no deja cortar en medio de un bloque. El corte tiene que caer en el
// comienzo de una sentencia (`--mapa` las lista). Después: `--proxy` (un ctx que falla si una fase pide algo que nadie dejó), correr el
// medidor del pipeline sobre el lote completo y regenerar sin `--proxy`.
// USO: node tools/partir-fases.mjs <config.json> [--proxy | --mapa]
//   --mapa    imprime las sentencias del nivel superior (línea, profundidad) para elegir dónde cortar; no escribe nada
// Config: { file, funcStart, funcEnd, setupEnd, sangria, inicial:[...], salidaTemprana:"P"|null, asincrona:bool, indentar:bool, fases:[{name, from, to, comentario}] }
//   asincrona: las fases son `async` y se esperan (un flujo con `await`); indentar: el cuerpo de cada fase gana 2 espacios (si el código estaba a nivel de módulo, sin sangría;
//   las líneas que empiezan dentro del texto de una plantilla no se tocan). Para un script de nivel de módulo: envolverlo antes en `async function f() { … }` y partir esa función.
//   Una fase con `return X` de salida temprana: si cfg.salidaTemprana (p. ej. "P") la fase devuelve eso y la orquestadora corta.
import { readFileSync, writeFileSync } from 'node:fs';
import { lexico } from './lexico-js.mjs';
const [cfgPath, ...flags] = process.argv.slice(2);
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const L = readFileSync(cfg.file, 'utf8').split('\n');
const LORIG = [...L];
const seg = (a, b) => L.slice(a - 1, b);
const F0 = cfg.funcStart;
let lex = lexico(seg(F0, cfg.funcEnd).join('\n'));
const marcadas = new Map();
if (!flags.includes('--mapa') && cfg.fases.length) {
  // Las variables `let` / `var` del nivel superior que se reasignan y se usan en más de una fase (o se reasignan dentro de una función) no
  // pueden pasarse por copia: viven en el ctx (`ctx.N`) y cada uso, desde su declaración, se reescribe así.
  const faseDe0 = (ln) => cfg.fases.findIndex((x) => ln >= x.from && ln <= x.to);
  for (const d of lex.declStmts.filter((x) => x.simple && (x.tipo === 'let' || x.tipo === 'var'))) {
    const asigs = lex.asignaciones.filter((a) => a.nombre === d.nombre && a.linea > d.linea);
    if (!asigs.length) continue;
    const fs = new Set(lex.tokens.filter((t) => t.nombre === d.nombre && t.linea >= d.linea).map((t) => faseDe0(F0 + t.linea)));
    if (fs.size > 1 || asigs.some((a) => a.enFuncion)) marcadas.set(d.nombre, d);
  }
  const texto = seg(F0, cfg.funcEnd).join('\n'); const edits = [];
  for (const [nom, d] of marcadas) edits.push({ ini: d.kwIni, fin: d.nombreFin, nuevo: `ctx.${nom}${/^\s*=(?![=>])/.test(texto.slice(d.nombreFin, d.nombreFin + 6)) ? '' : ' = undefined'}` });
  for (const t of lex.tokens) {
    const d = marcadas.get(t.nombre); if (!d || t.linea < d.linea) continue;
    if (t.ini >= d.kwIni && t.fin <= d.nombreFin) continue;
    const claveObj = t.inner === 'o' && (t.prev === '{' || t.prev === ',');
    if (claveObj && t.next === ':') continue;
    edits.push({ ini: t.ini, fin: t.fin, nuevo: claveObj && (t.next === ',' || t.next === '}') ? `${t.nombre}: ctx.${t.nombre}` : `ctx.${t.nombre}` });
  }
  edits.sort((a, b) => b.ini - a.ini);
  let nuevoTxt = texto; for (const e of edits) nuevoTxt = nuevoTxt.slice(0, e.ini) + e.nuevo + nuevoTxt.slice(e.fin);
  L.splice(F0 - 1, cfg.funcEnd - F0 + 1, ...nuevoTxt.split('\n'));
  lex = lexico(seg(F0, cfg.funcEnd).join('\n'));
  console.log(`en el ctx (${marcadas.size}): ${[...marcadas.keys()].join(', ')}`);
}
const profEn = (linea) => lex.prof[linea - F0];
if (flags.includes('--mapa')) {
  let ult = -1;
  for (let ln = cfg.setupEnd + 1; ln < cfg.funcEnd; ln++) {
    if (profEn(ln) !== 1) continue;
    const t = L[ln - 1].trim(); if (!t) continue;
    console.log(`${ln}: ${t.slice(0, 110)}`);
  }
  process.exit(0);
}
const proxy = flags.includes('--proxy');
const salida = cfg.salidaTemprana || null;
const AW = cfg.asincrona ? 'await ' : ''; const ASYNC = cfg.asincrona ? 'async ' : '';
const declEn = (a, b) => lex.declaradas.filter((d) => F0 + d.linea >= a && F0 + d.linea <= b).map((d) => d.nombre);
const idsEn = (a, b) => { // identificadores del código (no strings/comentarios) de las líneas a..b
  const l = lexico(seg(a, b).join('\n')); return new Set(l.ids);
};
const faseDe = (ln) => cfg.fases.findIndex((x) => ln >= x.from && ln <= x.to);
// PELIGRO: una variable `let` / `var` del nivel superior que se reasigna fuera de su fase, o dentro de una función (que puede correr después)
const peligros = [];
for (const d of lex.declaradas.filter((x) => x.tipo === 'let' || x.tipo === 'var')) {
  const fd = faseDe(F0 + d.linea);
  for (const a of lex.asignaciones.filter((x) => x.nombre === d.nombre && x.linea > d.linea)) {
    const fa = faseDe(F0 + a.linea);
    if (fa !== fd || a.enFuncion) peligros.push(`  ${d.nombre} (declarada L${F0 + d.linea}, fase ${cfg.fases[fd]?.name}) se asigna en L${F0 + a.linea}${a.enFuncion ? ' DENTRO DE UNA FUNCIÓN' : ''} (fase ${cfg.fases[fa]?.name})`);
  }
}
if (peligros.length) { console.log('PELIGROS (estado que cambia entre fases):\n' + [...new Set(peligros)].join('\n')); if (!flags.includes('--seguir')) process.exit(2); }
const disponibles = new Set(cfg.inicial);
const fases = cfg.fases.map((f) => ({ ...f, cuerpo: seg(f.from, f.to) }));
for (const f of fases) f.cuerpo = indentarLineas(f.from, f.cuerpo);
for (const f of fases) {
  if (profEn(f.from) !== 1 || profEn(f.to + 1) !== 1) { console.error(`✗ ${f.name}: corta en medio de un bloque (profundidad ${profEn(f.from)} al empezar la línea ${f.from}, ${profEn(f.to + 1)} después de la ${f.to})`); process.exit(1); }
}
for (const f of fases) { const rt = lex.retornos.filter((l) => F0 + l >= f.from && F0 + l <= f.to); if (rt.length && !cfg.salidaTemprana) { console.error(`✗ ${f.name}: tiene un return propio de la función en las líneas ${rt.map((l) => F0 + l).join(', ')} (poné salidaTemprana en la config)`); process.exit(1); } }
// con cfg.indentar, el cuerpo de cada fase gana 2 espacios (menos las líneas que empiezan dentro del texto de una plantilla)
function indentarLineas(a, lineas) { return lineas.map((l, k) => (cfg.indentar && l.trim() && !lex.tpl[a + k - F0] ? '  ' + l : l)); }
const pre = (i) => seg(i === 0 ? cfg.setupEnd + 1 : fases[i - 1].to + 1, fases[i].from - 1);
const textoDespues = (i) => { const a = fases[i].to + 1; return new Set([...(i + 1 < fases.length ? idsEn(fases[i + 1].from - 0, cfg.funcEnd) : idsEn(a, cfg.funcEnd - 1)), ...idsEn(a, a)]); };
const orquesta = [...seg(1, cfg.setupEnd)];
orquesta.push(proxy ? `  const ctx = estricto({ ${cfg.inicial.join(', ')} });` : `  const ctx = { ${cfg.inicial.join(', ')} };`);
const funciones = []; const informe = [];
fases.forEach((f, i) => {
  const dec = new Set(declEn(f.from, f.to));
  const usados = idsEn(f.from, f.to);
  const params = [...usados].filter((n) => disponibles.has(n) && !dec.has(n));
  // lo que se usa después: desde el final de esta fase hasta el final de la función (sin la llave de cierre, que no tiene ids)
  const despues = idsEn(f.to + 1, cfg.funcEnd);
  const salen = [...dec].filter((n) => despues.has(n));
  informe.push(`${f.name} (${f.to - f.from + 1} l): lee [${params.join(', ')}] deja [${salen.join(', ')}]`);
  orquesta.push(...pre(i));
  if (salida) orquesta.push(salen.length ? `  { const s = ${AW}${f.name}(ctx); if (s === ${salida}) return ${salida}; Object.assign(ctx, s); }` : `  if (${AW}${f.name}(ctx) === ${salida}) return ${salida};`);
  else orquesta.push(salen.length ? `  Object.assign(ctx, ${AW}${f.name}(ctx));` : `  ${AW}${f.name}(ctx);`);
  funciones.push('', `// ${f.comentario}`, `${ASYNC}function ${f.name}(ctx) {`, ...(params.length ? [`  const { ${params.join(', ')} } = ctx;`] : []), ...f.cuerpo, ...(salen.length ? [`  return { ${salen.join(', ')} };`] : []), '}');
  for (const n of salen) disponibles.add(n);
});
const cola = seg(fases.at(-1).to + 1, cfg.funcEnd);
const colaUsa = [...idsEn(fases.at(-1).to + 1, cfg.funcEnd)].filter((n) => disponibles.has(n) && !cfg.inicial.includes(n));
if (colaUsa.length) orquesta.push(`  const { ${colaUsa.join(', ')} } = ctx;`);
orquesta.push(...cola);
const ESTRICTO = proxy ? ['', '// (verificación) un ctx que falla si una fase pide algo que nadie dejó', 'function estricto(t) { return new Proxy(t, { get(o, k) { if (!(k in o)) throw new Error(`ctx sin ${String(k)}`); return o[k]; } }); }'] : [];
writeFileSync(cfg.file, [...orquesta, ...funciones, ...ESTRICTO, ...seg(cfg.funcEnd + 1, L.length)].join('\n'));
console.log(informe.join('\n')); console.log('cola lee:', colaUsa.join(', '));
