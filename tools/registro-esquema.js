// ============================================================================
// tools/registro-esquema.js — valida una línea de un registro de decisión contra tools/esquemas-registros.json (punto 437)
//
// Lo usan las tools que escriben (patron.mjs, decision.mjs, votacion-contar.mjs, cola.mjs) para NO escribir una línea que no cumple, y audit.js (`registro-fuera-de-esquema`) para
// avisar de las que ya están en el archivo. Una línea sin `esquema` es legado y no se valida. Las reglas y los valores admitidos están en el JSON (clave `validacion`); acá solo está
// el mecanismo.
//
// USO:   const { validar, DESDE } = require('./registro-esquema.js');   validar('auditoria-proceso' | 'cola-respuesta', linea) -> [mensajes de error] (vacío si cumple o es legado)
// ============================================================================
const ESQUEMAS = require('./esquemas-registros.json').validacion;

const tipoDe = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);
const DESDE = ESQUEMAS.desde; // { registro: 'AAAA-MM-DD' }: desde esa fecha una línea de ese registro tiene que llevar `esquema`

function validar(registro, linea) {
  const def = ESQUEMAS.registros[registro];
  if (!def) throw new Error(`registro desconocido: ${registro}`);
  if (!linea || linea.esquema === undefined) return []; // legado
  const errores = [];
  for (const [campo, d] of Object.entries(def.campos)) {
    const v = linea[campo];
    let obligatorio = d.obligatorio === true;
    if (d.obligatorio && typeof d.obligatorio === 'object') obligatorio = Object.entries(d.obligatorio.si).every(([c, vals]) => vals.includes(linea[c]));
    if (v === undefined) { if (obligatorio) errores.push(`falta \`${campo}\``); continue; }
    if (v === null && obligatorio && typeof d.obligatorio === 'object') { errores.push(`\`${campo}\` no puede ser null en este caso`); continue; } // el obligatorio condicional pide un valor, no null
    if (!d.tipo.includes(tipoDe(v))) errores.push(`\`${campo}\` es ${tipoDe(v)} y tiene que ser ${d.tipo.join(' o ')}`);
    else if (d.enum && !d.enum.includes(v)) errores.push(`\`${campo}\` = ${JSON.stringify(v)} no es uno de ${d.enum.join(', ')}`);
  }
  for (const campo of Object.keys(linea)) if (!(campo in def.campos)) errores.push(`\`${campo}\` no está en el esquema`);
  return errores;
}

module.exports = { validar, DESDE };
