// tools/siis-adicionales.mjs — los documentos adicionales que SIIS tiene de cada año de un club (punto 465 (9)): nombre del trámite y radicado. Solo lee: un GET por año al endpoint `documentos-adicionales`, sin descargar ningún archivo.
// El radicado de cada año sale del `siis-estado-AAAA.json` ya bajado (`infoEmpresa.num_radicado`); no se usa el campo `documentos_adicionales` del índice, que viene vacío desde 2021 (Admin/sourcing/Colombia/_notas-generales.md, paso 2).
// USO: node tools/siis-adicionales.mjs "<Club>"
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const club = process.argv.slice(2).find((a) => !a.startsWith('--'));
const cfg = JSON.parse(readFileSync(join(ROOT, 'tools/siis-clubes.json'), 'utf8'));
if (!club || !cfg.clubes[club]) { console.error(`Uso: node tools/siis-adicionales.mjs "<Club>"  (uno de tools/siis-clubes.json: ${Object.keys(cfg.clubes).join(', ')})`); process.exit(1); }
const dir = join(ROOT, 'Clubes', cfg.pais, club);
const anios = readdirSync(dir).map((f) => f.match(/^siis-estado-(\d{4})\.json$/)?.[1]).filter(Boolean).sort();
if (!anios.length) { console.error(`${club} no tiene siis-estado-AAAA.json bajados (node tools/siis-estado.mjs --club "${club}" --todos --escribir).`); process.exit(1); }
const tiene = (a) => ['estados-financieros', 'certificacion-ef', 'dictamen-revisor-fiscal'].filter((n) => existsSync(join(dir, `${n}-${a}.pdf`)));
for (const a of anios) {
  // el radicado del resultado integral viene como «None» en algunos años (Tolima 2021 y 2022): se toma el del registro de empresas o del balance
  const j = JSON.parse(readFileSync(join(dir, `siis-estado-${a}.json`), 'utf8'));
  const radicado = [j.siis_resultadointegral, j.siis_empresas, j.siis_sitfinan].map((x) => x?.infoEmpresa?.num_radicado).find((r) => r && r !== 'None');
  if (!radicado) { console.log(`${a}  sin radicado en el json`); continue; }
  let texto;
  try {
    const res = await fetch(`https://siis.ia.supersociedades.gov.co/plantillas-api/documentos-adicionales?numero-radicado=${encodeURIComponent(radicado)}`);
    if (!res.ok) texto = `HTTP ${res.status}: sin documentos depositados`;
    else { const j = await res.json(); const l = j.aditionals || []; texto = l.length ? l.map((d) => `${d.nombreTramite} (${d.numeroRadicado})`).join(' · ') : 'ninguno'; }
  } catch (e) { texto = `error de red: ${e.message}`; }
  console.log(`${a}  radicado ${radicado}  en SIIS: ${texto}  |  en la carpeta: ${tiene(a).join(', ') || 'nada'}`);
  await new Promise((r) => setTimeout(r, 300));
}
