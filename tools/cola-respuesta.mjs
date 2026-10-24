// ============================================================================
// tools/cola-respuesta.mjs — la línea de una respuesta de la cola de revisión con el esquema de tools/esquemas-registros.json (punto 437)
// Lo usa cola.mjs --responder. Con --evidencia, --seguridad o --causa la línea lleva `esquema: 1` y se valida; sin ninguna es la de siempre (sin `esquema`).
// ============================================================================
import { validar } from './registro-esquema.js';

export const CAUSAS = ['decision-de-guido', 'precedente-del-club', 'precedente-del-pais', 'regla-escrita', 'lectura-del-documento', 'otra'];

// evidencia: "ruta.md:12-30" (o «ninguna»); seguridad: alta | media | baja; causa: una de CAUSAS; precedentes: "id,id". Devuelve { linea, errores, conEsquema }.
export function lineaDeRespuesta({ id, decision, valor = null, nota = null, evidencia = null, seguridad = null, causa = null, precedentes = null, ts = new Date().toISOString() }) {
  const base = { tipo: 'respuesta', id, ts, decision, valor, nota };
  if (!evidencia && !seguridad && !causa) return { linea: base, errores: [], conEsquema: false };
  const em = evidencia && /^(.+\.md):(\d+)(?:-(\d+))?$/.exec(evidencia);
  const errores = [];
  if (!evidencia) errores.push('falta --evidencia ("ruta.md:12-30" o ninguna)');
  else if (evidencia !== 'ninguna' && !em) errores.push(`--evidencia «${evidencia}» no es ruta.md:línea ni ninguna`);
  const linea = { esquema: 1, ...base, evidencia: evidencia === 'ninguna' ? null : em ? { md: em[1], lineas: [Number(em[2]), Number(em[3] || em[2])] } : undefined, seguridad: seguridad || undefined, causa: causa || undefined, ...(precedentes ? { precedentes: String(precedentes).split(',').filter(Boolean) } : {}) };
  for (const k of Object.keys(linea)) if (linea[k] === undefined) delete linea[k];
  return { linea, errores: [...errores, ...validar('cola-respuesta', linea).filter((e) => !(errores.length && /`evidencia`/.test(e)))], conEsquema: true };
}
