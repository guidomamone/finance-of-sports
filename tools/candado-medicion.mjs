// ============================================================================
// tools/candado-medicion.mjs — una tool que escribe registros o datos se niega mientras `medir pipeline` mide.
//
// POR QUÉ. `medir-pipeline.mjs` deja Admin/mediciones/pipeline/_corriendo con su pid y revierte lo trackeado que cambie; el hook de pre-tool solo frena los
// Edit y Write. Un `node tools/…` por Bash que reescribe un registro (estado.mjs, inventario-transcripciones.mjs) pasaba igual y podía cambiar el antes o el
// después de la medición sin que nadie lo viera.
//
// USO. Al principio de la tool: `negarSiSeMide('estado.mjs')`, o con una condición (`{ si: A.includes('--responder') }`) si solo algunos modos escriben.
//   - Hay candado con un pid vivo y este proceso no es hijo de la medición (`medir-pipeline.mjs` marca a sus hijos con FOS_MIDIENDO=1): sale con 3 y un mensaje.
//   - Salida para una emergencia: `--ignorar-medicion` en la línea de comandos de la tool.
//   - Un pid muerto (la medición cayó) no cuenta.
// `fos --check` verifica que las tools de CON_CANDADO sigan llamándolo.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CANDADO = resolve(import.meta.dirname, '..', 'Admin', 'mediciones', 'pipeline', '_corriendo');
// las tools que lo llaman (fos --check comprueba que el código siga llamándolo) y en qué modo
export const CON_CANDADO = {
  'estado.mjs': 'siempre', 'inventario-transcripciones.mjs': 'siempre', 'publicar.mjs': 'siempre',
  'cola.mjs': '--responder, --corregir-categoria', 'ajustes.mjs': '--agregar, --anular', 'lote.mjs': '--ejecutar',
};

export function medicionEnCurso() {
  let pid; try { pid = Number(JSON.parse(readFileSync(CANDADO, 'utf8')).pid); } catch { return null; }
  try { process.kill(pid, 0); } catch (err) { if (err.code !== 'EPERM') return null; }
  return pid;
}

// argv: la línea de comandos de la tool, para la que recorta process.argv al importar otras (lote.mjs, cargar.mjs)
export function negarSiSeMide(tool, { si = true, argv = process.argv } = {}) {
  if (!si || process.env.FOS_MIDIENDO === '1' || argv.includes('--ignorar-medicion')) return;
  const pid = medicionEnCurso();
  if (!pid) return;
  console.error(`${tool} escribe registros o datos y hay una medición en curso (node tools/medir-pipeline.mjs, pid ${pid}): la medición revierte lo trackeado que cambie y el antes y el después dejarían de medirse sobre los mismos datos. Esperá a que termine. (Emergencia: agregá --ignorar-medicion; si la medición cayó y quedó el candado, borrá Admin/mediciones/pipeline/_corriendo.)`);
  process.exit(3);
}
