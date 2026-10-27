// tools/docs-reglas.mjs — los documentos donde viven las reglas de datos: Admin/CONVENCIONES-DATOS.md (las generales) y un archivo por país, Admin/paises/<iso>.md (las que solo valen para un país o un club).
// Las tools que leen las reglas (reglas-categoria, votacion-nueva, historia, existe, audit) piden la lista acá, así un país nuevo no obliga a tocarlas. Rutas relativas a la raíz; el general primero y los países por orden alfabético.
import { readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
export const DOC_GENERAL = 'Admin/CONVENCIONES-DATOS.md';
export const CARPETA_PAISES = 'Admin/paises';

// Una línea para imprimir al empezar una tarea sobre un club: dónde están las reglas de su país (null si no tiene archivo propio). Así no depende de que alguien se acuerde de abrirlo.
export function punteroReglasPais(clubId) {
  const iso = String(clubId || '').split('-').pop(); const f = `${CARPETA_PAISES}/${iso}.md`;
  return /^[a-z]{2}$/.test(iso) && existsSync(join(ROOT, f)) ? `Reglas de datos de ${iso.toUpperCase()} (solo valen para sus clubes): ${f}` : null;
}

export function docsDeReglas() {
  const dir = join(ROOT, CARPETA_PAISES);
  const paises = existsSync(dir) ? readdirSync(dir).filter((f) => /^[a-z]{2}\.md$/.test(f)).sort().map((f) => `${CARPETA_PAISES}/${f}`) : [];
  return [DOC_GENERAL, ...paises];
}
