#!/usr/bin/env node
// ============================================================================
// tools/mover-bloque.mjs — `fos mover`: muda un bloque de líneas de una tool a un módulo nuevo SIN cambiarlo, para partir los archivos grandes.
//
//   node tools/mover-bloque.mjs <tool.mjs> <desde>-<hasta> <destino.mjs> ["porqué del módulo"] [--escribir]
//
// El bloque son las líneas <desde> a <hasta> (de `node tools/fos.mjs mapa <tool>`), enteras y a nivel de módulo. La tool calcula con el código (sin comentarios, cadenas
// ni regex; con las interpolaciones de los templates) qué nombres del resto del archivo usa el bloque, y cuáles del bloque usa el resto:
//   - lo que el bloque usa de los imports de la tool se importa igual en el módulo; lo que usa de las declaraciones de la tool se importa de la tool (y se le agrega `export`);
//   - lo que el resto de la tool usa del bloque se exporta (`export` al principio de su declaración) y la tool lo importa del módulo; lo que el bloque ya exportaba, la tool lo
//     re-exporta (`export { … } from`), así los llamadores no cambian.
// Escribe el módulo con una cabecera corta, deja el import en la tool y comprueba: el bloque es idéntico salvo el `export` agregado, `node --check` pasa en los dos y el resto de la
// tool no cambió. Ensayo por defecto (dice qué haría y avisa los riesgos); con --escribir escribe. Después: node tools/fos.mjs que-pide / medir pipeline.
// RIESGOS que imprime: un import circular (el módulo importa de la tool y la tool del módulo: seguro si ninguna constante del módulo usa un ayudante de la tool al evaluarse),
// código que se ejecuta al importar dentro del bloque, `import.meta` / `process.argv` / `__dirname` en el bloque.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve, basename } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const KW_REGEX = new Set(['return', 'typeof', 'case', 'in', 'of', 'delete', 'void', 'throw', 'new', 'else', 'do', 'yield', 'await', 'instanceof']);
const PALABRAS = new Set(['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'async', 'await', 'of', 'static', 'get', 'set', 'null', 'true', 'false', 'undefined', 'NaN', 'Infinity', 'from', 'as']);

// Máscara: por carácter, 1 si es código (fuera de comentarios, cadenas, texto de templates y regex; el código de un `${…}` sí cuenta)
export function mascara(src) {
  const n = src.length, m = new Uint8Array(n);
  const pila = []; // llaves abiertas dentro de un `${`
  let i = 0, prev = '', prevWord = '';
  const marcarCodigo = (a, b) => { for (let k = a; k < b; k++) m[k] = 1; };
  const plantilla = () => { // i está después de la comilla invertida (o de la `}` que cierra un `${`): recorre el texto hasta el cierre o el siguiente `${`
    while (i < n) {
      const c = src[i];
      if (c === '\\') { i += 2; continue; }
      if (c === '`') { i++; prev = '`'; prevWord = ''; return; }
      if (c === '$' && src[i + 1] === '{') { i += 2; pila.push(0); prev = '{'; return; }
      i++;
    }
  };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { const f = src.indexOf('*/', i + 2); i = f < 0 ? n : f + 2; continue; }
    if (c === '"' || c === "'") { let j = i + 1; while (j < n && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1; i = j + 1; prev = c; prevWord = ''; continue; }
    if (c === '`') { i++; plantilla(); continue; }
    if (pila.length && c === '{') pila[pila.length - 1]++;
    if (pila.length && c === '}') { if (pila[pila.length - 1] === 0) { pila.pop(); i++; plantilla(); continue; } pila[pila.length - 1]--; }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev) || KW_REGEX.has(prevWord))) { // regex literal
      let j = i + 1, clase = false;
      while (j < n && src[j] !== '\n') { if (src[j] === '\\') { j += 2; continue; } if (src[j] === '[') clase = true; else if (src[j] === ']') clase = false; else if (src[j] === '/' && !clase) break; j++; }
      i = j + 1; while (i < n && /[a-z]/i.test(src[i])) i++; prev = '/'; prevWord = ''; continue;
    }
    m[i] = 1;
    if (!/\s/.test(c)) { prev = c; if (/[\w$]/.test(c)) prevWord = (/[\w$]/.test(src[i - 1] || '') ? prevWord : '') + c; else prevWord = ''; }
    i++;
  }
  return m;
}

// El texto con todo lo que no es código reemplazado por espacios (mismas posiciones y mismos saltos de línea)
export function soloCodigo(src) {
  const m = mascara(src);
  let out = '';
  for (let i = 0; i < src.length; i++) out += m[i] || src[i] === '\n' ? src[i] : ' ';
  return out;
}

// Líneas con su profundidad de llaves/paréntesis/corchetes al empezar
function profundidades(codigo) {
  const L = codigo.split('\n'), prof = [];
  let d = 0;
  for (const l of L) { prof.push(d); for (const ch of l) { if ('{(['.includes(ch)) d++; else if ('})]'.includes(ch)) d--; } }
  return { L, prof };
}

const ids = (txt) => [...txt.matchAll(/(?<![\w$.])(?:\.\.\.)?([A-Za-z_$][\w$]*)/g)].map((m) => m[1]).filter((x) => !PALABRAS.has(x));
const idsConPunto = (txt) => [...txt.matchAll(/(\.?)\.?\.?([A-Za-z_$][\w$]*)/g)].filter((m) => m[1] !== '.' || /\.\.\./.test(m[0])).map((m) => m[2]).filter((x) => !PALABRAS.has(x));

// Lo declarado a nivel de módulo: { locales: Map nombre -> { linea, exportada }, imports: Map nombre -> { texto, modulo, spec, linea } }
export function declaraciones(src) {
  const codigo = soloCodigo(src), { L, prof } = profundidades(codigo);
  const locales = new Map(), imports = new Map();
  const m = mascara(src);
  for (const mm of src.matchAll(/(^|\n)([ \t]*)import\s+([^;'"]*?)\s*from\s*(['"])([^'"]+)\4/g)) {
    const pos = mm.index + mm[1].length + mm[2].length;
    const linea = src.slice(0, pos).split('\n').length - 1;
    if (!m[pos] || prof[linea] !== 0) continue; // un «import» dentro de un comentario o de una cadena no cuenta
    const spec = mm[3].trim(), modulo = mm[5];
    const ns = /^\*\s*as\s+([\w$]+)$/.exec(spec);
    if (ns) { imports.set(ns[1], { spec: `* as ${ns[1]}`, modulo, linea, tipo: 'ns' }); continue; }
    const llaves = /\{([^}]*)\}/.exec(spec);
    const defecto = spec.replace(/\{[^}]*\}/, '').replace(/,/g, '').trim();
    if (defecto) imports.set(defecto, { spec: defecto, modulo, linea, tipo: 'def' });
    if (llaves) for (const e of llaves[1].split(',').map((x) => x.trim()).filter(Boolean)) { const [orig, local] = e.split(/\s+as\s+/); imports.set(local || orig, { spec: e, modulo, linea, tipo: 'named' }); }
  }
  L.forEach((l, i) => {
    if (prof[i] !== 0) return;
    let m;
    if ((m = /^\s*(export\s+)?(?:default\s+)?(?:async\s+)?function\s*\*?\s*([\w$]+)/.exec(l))) locales.set(m[2], { linea: i, exportada: !!m[1] });
    else if ((m = /^\s*(export\s+)?class\s+([\w$]+)/.exec(l))) locales.set(m[2], { linea: i, exportada: !!m[1] });
    else if ((m = /^\s*(export\s+)?(?:const|let|var)\s+([^=;]+?)\s*(?:=|;|$)/.exec(l))) {
      const patron = m[2].trim();
      const nombres = /^[{[]/.test(patron) ? patron.replace(/^[{[]|[}\]]$/g, '').split(',').map((e) => e.split(':').pop().split('=')[0].replace(/\.\.\./, '').trim()).filter((x) => /^[\w$]+$/.test(x)) : [patron.split(/\s+/)[0]];
      for (const nom of nombres) if (/^[\w$]+$/.test(nom)) locales.set(nom, { linea: i, exportada: !!m[1] });
    }
  });
  return { locales, imports, codigo, L, prof };
}

function chequear(texto) { // node --check de un texto como módulo
  const dir = mkdtempSync(join(tmpdir(), 'mover-'));
  const f = join(dir, 'x.mjs');
  try { writeFileSync(f, texto); execFileSync('node', ['--check', f], { stdio: 'pipe' }); return null; } catch (e) { return String(e.stderr || e.message).split('\n').slice(0, 4).join(' '); } finally { rmSync(dir, { recursive: true, force: true }); }
}

// Plan de la mudanza; no escribe nada
export function planear(origen, srcOrigen, desde, hasta, destino, porque = '') {
  const D = declaraciones(srcOrigen);
  const L = srcOrigen.split('\n');
  if (desde < 1 || hasta > L.length || desde > hasta) throw new Error(`rango ${desde}-${hasta} fuera del archivo (${L.length} líneas)`);
  const a = desde - 1, b = hasta - 1;
  if (D.prof[a] !== 0 || (D.prof[b + 1] ?? 0) !== 0) throw new Error(`el bloque ${desde}-${hasta} no empieza y termina a nivel de módulo (profundidad ${D.prof[a]} al principio y ${D.prof[b + 1] ?? 0} después): ajustá el rango con fos mapa`);
  const bloqueCodigo = D.L.slice(a, b + 1).join('\n'), restoCodigo = [...D.L.slice(0, a), ...D.L.slice(b + 1)].join('\n');
  // declarado en el bloque / en el resto
  const enBloque = new Map([...D.locales].filter(([, v]) => v.linea >= a && v.linea <= b));
  const delResto = new Map([...D.locales].filter(([, v]) => v.linea < a || v.linea > b));
  const usadosBloque = new Set(idsConPunto(bloqueCodigo)), usadosResto = new Set(idsConPunto(restoCodigo));
  const localesUsados = [...delResto.keys()].filter((n) => usadosBloque.has(n) && !enBloque.has(n));
  // una constante de una línea que solo usa imports y literales (`const ROOT = resolve(import.meta.dirname, '..')`) se DUPLICA en el módulo: importarla de la tool en un ciclo falla (TDZ) y su valor es el mismo
  // una constante de una línea que solo usa imports, literales y OTRAS constantes puras (`const REF = resolve(ROOT, 'x')`, con `const ROOT = resolve(import.meta.dirname, '..')`)
  const puraRec = (n, camino = new Set()) => {
    if (camino.has(n) || !delResto.has(n)) return null;
    const l = D.L[delResto.get(n).linea]; const mm = /^\s*const\s+([\w$]+)\s*=\s*(.+);\s*$/.exec(l);
    if (!mm || mm[1] !== n) return null;
    // no se duplica lo que otro código puede cambiar (un objeto o arreglo que se llena después, `const MESES = {}`) ni una regex con estado (/g, /y: lastIndex)
    const nom = n.replace(/\$/g, '\\$');
    const orig = (/^\s*const\s+[\w$]+\s*=\s*(.+);\s*$/.exec(L[delResto.get(n).linea]) || [])[1] || ''; // el texto real (en `D.L` las regex y cadenas están borradas)
    if (/^\s*[[{]/.test(orig) && new RegExp(`(?<![\\w$.])${nom}\\s*(?:\\[[^\\]]*\\]|\\.[\\w$]+)?\\s*(?:=(?![=>])|\\+=|-=)|(?<![\\w$.])${nom}\\.(?:push|pop|shift|unshift|splice|sort|reverse|set|add|delete|clear|fill|assign)\\b|Object\\.(?:assign|defineProperty)\\(\\s*${nom}\\b`).test(D.codigo.split('\n').filter((_, i) => i !== delResto.get(n).linea).join('\n'))) return null;
    if (/\/[a-z]*[gy][a-z]*\s*$/.test(orig.trim())) return null;
    const lineas = [], imps = new Set(), cam = new Set(camino).add(n);
    for (const x of idsConPunto(mm[2].replace(/'[^']*'|"[^"]*"|\d[\d._]*/g, ' ')).filter((y) => y !== n)) {
      if (D.imports.has(x)) { imps.add(x); continue; }
      const r = puraRec(x, cam); if (!r) return null;
      for (const y of r.lineas) if (!lineas.includes(y)) lineas.push(y);
      r.imps.forEach((y) => imps.add(y));
    }
    lineas.push(L[delResto.get(n).linea]);
    return { lineas, imps };
  };
  const dupInfo = new Map(localesUsados.map((n) => [n, puraRec(n)]).filter(([, r]) => r));
  const duplicadas = [...dupInfo.keys()];
  const lineasDuplicadas = []; for (const r of dupInfo.values()) for (const y of r.lineas) if (!lineasDuplicadas.includes(y)) lineasDuplicadas.push(y);
  const localesDelBloque = localesUsados.filter((n) => !duplicadas.includes(n));
  const usadosPorDuplicadas = new Set([...dupInfo.values()].flatMap((r) => [...r.imps]));
  const importsBloque = [...D.imports].filter(([n, v]) => (usadosBloque.has(n) || usadosPorDuplicadas.has(n)) && (v.linea < a || v.linea > b));
  const importsEnBloque = [...D.imports].filter(([, v]) => v.linea >= a && v.linea <= b);
  if (importsEnBloque.length) throw new Error('el bloque contiene imports: movelos aparte');
  const exportarDelBloque = [...enBloque.keys()].filter((n) => usadosResto.has(n));
  const yaExportadas = [...enBloque].filter(([, v]) => v.exportada).map(([n]) => n);
  const riesgos = [];
  const dudosos = localesDelBloque.filter((n) => new RegExp(`\\b(?:const|let|var)\\s+(?:[\\[{][^=]*\\b)?${n}\\b|function\\s+${n}\\b`).test(bloqueCodigo));
  if (dudosos.length) riesgos.push(`posible sombra local: ${dudosos.join(', ')} (el bloque también los declara adentro; se importan igual, sobran si solo son locales)`);
  if (/import\.meta|process\.argv|__dirname|__filename/.test(bloqueCodigo)) riesgos.push('el bloque usa import.meta / process.argv / __dirname: cambian de valor en otro archivo');
  const ejecuta = D.L.slice(a, b + 1).map((l, i) => ({ l, i: a + i })).filter(({ l, i }) => D.prof[i] === 0 && l.trim() && !/^\s*(export\s+)?(async\s+)?(function|class|const|let|var)\b|^\s*[})\]]|^\s*\}/.test(l) && !/^\s*(\/\/|\*)/.test(l));
  if (ejecuta.length) riesgos.push(`el bloque tiene ${ejecuta.length} línea(s) a nivel de módulo que no son declaraciones (¿código que se ejecuta al importar?): línea ${ejecuta[0].i + 1}`);
  if (duplicadas.length) riesgos.push(`duplicadas en el módulo (constantes puras, mismo valor): ${duplicadas.join(', ')}`);
  const alImportar = []; // sentencias const/let/var a nivel de módulo del bloque que usan, al evaluarse, un nombre que no es una función de la tool
  for (let i = a; i <= b; i++) {
    if (D.prof[i] !== 0 || !/^\s*(?:export\s+)?(?:const|let|var)\b/.test(D.L[i])) continue;
    let j = i; while (j < b && !/[;}]\s*$/.test(D.L[j]) ) j++;
    const usos = new Set(idsConPunto(D.L.slice(i, j + 1).join('\n')));
    for (const n of localesDelBloque) if (usos.has(n) && !/^\s*(?:export\s+)?(?:async\s+)?(?:function|class)\b/.test(D.L[delResto.get(n).linea]) && !/=>/.test(D.L.slice(i, j + 1).join('\n'))) alImportar.push(`${n} (línea ${i + 1})`);
  }
  if (alImportar.length) riesgos.push(`TDZ: una constante del bloque usa al evaluarse un nombre que importaría de la tool: ${alImportar.join(', ')}; en el ciclo falla al importar. Mové también esa declaración, o hacela función`);
  if (localesDelBloque.length) riesgos.push(`import circular: ${basename(destino)} importa ${localesDelBloque.length} nombre(s) de ${basename(origen)} y ${basename(origen)} importa de ${basename(destino)}; seguro mientras ninguna constante del bloque use ${localesDelBloque.filter((n) => !/^(function|class)/.test(D.L[delResto.get(n).linea].trim().replace(/^export\s+/, '').replace(/^async\s+/, ''))).slice(0, 4).join(', ') || 'esos nombres'} al evaluarse`);
  // estado compartido: una variable `let`/`var` que cruza el borde y se REASIGNA del otro lado no funciona (un import es de solo lectura): se frena
  const asignada = (n, codigo) => new RegExp(`(?<![\\w$.])${n.replace(/\$/g, '\\$')}\\s*(?:=(?![=>])|\\+=|-=|\\*=|/=|\\|\\|=|&&=|\\?\\?=|\\+\\+|--)|(?:\\+\\+|--)\\s*${n.replace(/\$/g, '\\$')}\\b`).test(codigo);
  const compartidas = [];
  for (const n of exportarDelBloque) if (/^\s*(?:export\s+)?(?:let|var)\b/.test(D.L[enBloque.get(n).linea]) && asignada(n, restoCodigo)) compartidas.push(n);
  for (const n of localesDelBloque) if (/^\s*(?:export\s+)?(?:let|var)\b/.test(D.L[delResto.get(n).linea]) && asignada(n, bloqueCodigo)) compartidas.push(n);
  // el módulo nuevo
  const exportarEnBloque = new Set([...exportarDelBloque, ...yaExportadas]);
  const lineasBloque = L.slice(a, b + 1).map((l, i) => {
    const decl = [...enBloque].find(([, v]) => v.linea === a + i);
    return decl && exportarEnBloque.has(decl[0]) && !/^\s*export\s/.test(l) ? l.replace(/^(\s*)/, '$1export ') : l;
  });
  const imp = new Map(); // modulo -> specs
  for (const [, v] of importsBloque) { if (!imp.has(v.modulo)) imp.set(v.modulo, { named: [], otros: [] }); (v.tipo === 'named' ? imp.get(v.modulo).named : imp.get(v.modulo).otros).push(v.spec); }
  const lineasImport = [...imp].flatMap(([mod, v]) => [...v.otros.map((s) => `import ${s} from '${mod}';`), ...(v.named.length ? [`import { ${v.named.join(', ')} } from '${mod}';`] : [])]);
  if (localesDelBloque.length) lineasImport.push(`import { ${localesDelBloque.join(', ')} } from './${basename(origen)}';`);
  const cab = ['// ============================================================================',
    `// tools/${basename(destino)} — ${porque || `bloque mudado TAL CUAL de tools/${basename(origen)} (movimiento puro, TODO 375)`}`,
    `// Mudado de tools/${basename(origen)} sin cambiar una línea (salvo \`export\`); tools/${basename(origen)} lo importa y re-exporta lo que ya exportaba.`,
    '// ============================================================================'];
  const modulo = [...cab, ...lineasImport, ...(lineasDuplicadas.length ? ['', ...lineasDuplicadas] : []), '', ...lineasBloque, ''].join('\n');
  // la tool de origen: sin el bloque, con el import del módulo y el export de lo que el bloque necesita de ella
  const Lo = [...L];
  const aExportar = new Set(localesDelBloque);
  for (const n of aExportar) { const k = delResto.get(n).linea; if (!/^\s*export\s/.test(Lo[k])) Lo[k] = Lo[k].replace(/^(\s*)/, '$1export '); }
  const quitar = (b - a + 1) + (L[b + 1] !== undefined && L[b + 1].trim() === '' && (L[a - 1] ?? '').trim() === '' ? 1 : 0);
  Lo.splice(a, quitar);
  const ultimoImport = Math.max(-1, ...[...D.imports.values()].map((v) => v.linea));
  const usados = exportarDelBloque.filter((n) => usadosResto.has(n));
  const nuevas = [];
  if (usados.length) nuevas.push(`import { ${usados.join(', ')} } from './${basename(destino)}';`);
  if (yaExportadas.length) nuevas.push(`export { ${yaExportadas.join(', ')} } from './${basename(destino)}';`);
  // después del último import (que puede ocupar varias líneas); sin imports, después de la cabecera de comentarios
  let punto = ultimoImport >= 0 ? ultimoImport + 1 : (() => { let k = 0; while (k < Lo.length && (Lo[k].startsWith('//') || Lo[k].startsWith('#!') || Lo[k].trim() === '')) k++; return k; })();
  if (ultimoImport >= 0) while (punto < Lo.length && !/;\s*$/.test(Lo[punto - 1] ?? '')) punto++;
  Lo.splice(punto, 0, ...nuevas);
  const original = Lo.join('\n');
  // comprobaciones
  const problemas = [];
  if (compartidas.length) problemas.push(`estado compartido: ${compartidas.join(', ')} es let/var y se reasigna del otro lado del corte (un import es de solo lectura): mové también quien lo reasigna, o cambiá el rango`);
  const quitarExport = lineasBloque.map((l, i) => (l !== L[a + i] ? l.replace(/^(\s*)export /, '$1') : l));
  if (quitarExport.join('\n') !== L.slice(a, b + 1).join('\n')) problemas.push('el bloque no quedó idéntico salvo el export');
  const e1 = chequear(modulo); if (e1) problemas.push(`node --check falla en el módulo: ${e1}`);
  const e2 = chequear(original); if (e2) problemas.push(`node --check falla en ${basename(origen)}: ${e2}`);
  return { modulo, original, importsBloque: importsBloque.map(([n]) => n), localesDelBloque, duplicadas, alImportar, exportarDelBloque, yaExportadas, riesgos, problemas, lineas: b - a + 1 };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2).filter((x) => x !== '--escribir' && x !== '--forzar');
  const [tool, rango, dest, porque] = A;
  const m = /^(\d+)-(\d+)$/.exec(rango || '');
  if (!tool || !m || !dest) { console.error('Uso: node tools/mover-bloque.mjs <tool.mjs> <desde>-<hasta> <destino.mjs> ["porqué del módulo"] [--escribir]'); process.exit(1); }
  const ruta = join(ROOT, 'tools', tool.replace(/^tools\//, '')), rutaDest = join(ROOT, 'tools', dest.replace(/^tools\//, ''));
  let plan;
  try { plan = planear(ruta, readFileSync(ruta, 'utf8'), Number(m[1]), Number(m[2]), rutaDest, porque); } catch (e) { console.error(e.message); process.exit(1); }
  console.log(`${plan.lineas} líneas de ${basename(ruta)} → ${basename(rutaDest)}`);
  console.log(`  el módulo importa: ${plan.importsBloque.join(', ') || '—'}${plan.localesDelBloque.length ? `\n  y de ${basename(ruta)} (se les agrega export): ${plan.localesDelBloque.join(', ')}` : ''}`);
  console.log(`  ${basename(ruta)} importa del módulo: ${plan.exportarDelBloque.join(', ') || '—'}; re-exporta: ${plan.yaExportadas.join(', ') || '—'}`);
  for (const r of plan.riesgos) console.log(`  ⚠ ${r}`);
  for (const p of plan.problemas) console.log(`  ✗ ${p}`);
  if (plan.alImportar.length && !process.argv.includes('--forzar')) { console.log('  ✗ hay riesgo de TDZ (arriba): no se escribe sin --forzar'); process.exit(1); }
  if (plan.problemas.length) process.exit(1);
  if (!process.argv.includes('--escribir')) { console.log('Ensayo: --escribir lo aplica.'); process.exit(0); }
  if (existsSync(rutaDest)) { console.error(`${basename(rutaDest)} ya existe: no se pisa.`); process.exit(1); }
  if (execFileSync('git', ['status', '--porcelain', '--', ruta], { cwd: ROOT, encoding: 'utf8' }).split('\n').some((l) => l && !l.startsWith('??'))) { console.error(`${basename(ruta)} tiene cambios sin commitear: commitealos primero.`); process.exit(1); }
  writeFileSync(rutaDest, plan.modulo); writeFileSync(ruta, plan.original);
  console.log(`Escrito. Siguiente: clasificar ${basename(rutaDest)} (node tools/clasificar-tools.mjs ${basename(rutaDest)}), node tools/fos.mjs que-pide y node tools/fos.mjs medir pipeline.`);
}
