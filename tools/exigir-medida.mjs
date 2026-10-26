// ============================================================================
// tools/exigir-medida.mjs — una tool que escribe datos reales se niega si hay tools cambiadas sin medir.
//
// POR QUÉ. El hook de commit exige la medición de una tool antes de commitear, pero nada impedía ESCRIBIR datos publicados con una versión sin medir: se rehacían años con
// una tool a medio arreglar, se la arreglaba otra vez y había que rehacer y medir de nuevo. El orden correcto es: ensayo gratis sobre todos los datos reales que usa la tool,
// arreglarla, medirla UNA vez y recién después escribir datos. Esto lo impone el código y no la memoria de una sesión.
//
// CÓMO. Mira los archivos de primer nivel de tools/ cambiados contra HEAD (o nuevos) y que no están declarados fuera del pipeline en `no_pipeline` de tools/pipeline-tools.json:
// cada uno tiene que tener una medición buena de su versión actual en Admin/registros/mediciones-pipeline.jsonl (la misma que pide el hook de commit). Lo desconocido cuenta como
// del pipeline. No usa otras tools (una tool del pipeline no puede depender de una declarada de afuera). Sin cambios en tools/ no hace nada. Siguen sin frenarse: el ensayo (sin
// --escribir), lo que corre `medir pipeline` (FOS_MIDIENDO=1) y, para una emergencia con el ok de Guido, `--ignorar-medicion`.
//
// USO. Al principio de la tool: `exigirMedida('cargar.mjs', { si: ESCRIBIR, argv })`. `fos --check` verifica que las de CON_MEDIDA sigan llamándolo.
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
// las tools que lo llaman y en qué modo escriben datos reales
export const CON_MEDIDA = { 'siis-estado.mjs': '--escribir', 'cargar.mjs': '--escribir' };

const git = (...a) => { try { return execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const BUENO = /^(idéntico|\d+ diferencias, todas explicadas)$/;

// los archivos de tools/ cambiados contra HEAD, o nuevos, que no son de afuera del pipeline y no tienen una medición buena de su versión actual
export function sinMedir() {
  let fuera = {}; try { fuera = JSON.parse(readFileSync(join(ROOT, 'tools', 'pipeline-tools.json'), 'utf8')).no_pipeline || {}; } catch { return []; }
  const mediciones = []; const ruta = join(ROOT, 'Admin', 'registros', 'mediciones-pipeline.jsonl');
  if (existsSync(ruta)) for (const l of readFileSync(ruta, 'utf8').split('\n')) { try { const m = JSON.parse(l); if (BUENO.test(m.resultado || '')) mediciones.push(m); } catch { /* línea rota */ } }
  const cambiados = new Set([...git('diff', '--name-only', 'HEAD', '--', 'tools').split('\n'), ...git('ls-files', '--others', '--exclude-standard', 'tools').split('\n')].filter((f) => /^tools\/[^/]+\.(mjs|js)$/.test(f)).map((f) => f.slice(6)));
  return [...cambiados].filter((n) => existsSync(join(ROOT, 'tools', n)) && !(n in fuera) && !(n in (fuera.tools || {}))).filter((n) => {
    const h = git('hash-object', join('tools', n));
    return !mediciones.some((m) => m.tools?.[n]?.despues === h);
  });
}

export function exigirMedida(tool, { si = true, argv = process.argv } = {}) {
  if (!si || process.env.FOS_MIDIENDO === '1' || argv.includes('--ignorar-medicion')) return;
  const faltan = sinMedir();
  if (!faltan.length) return;
  console.error(`${tool} escribe datos reales y hay tools cambiadas sin medir (${faltan.length}): ${faltan.join(', ')}.\nEl orden es: ensayo gratis sobre todos los datos reales (sin --escribir), arreglar la tool, medirla una vez (node tools/fos.mjs cerrar-tool …) y recién después escribir. Detalle: node tools/fos.mjs que-pide.`);
  process.exit(3);
}
