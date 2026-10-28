// tools/club-siis-preparar.mjs — `node tools/club-siis.mjs "<Club>" --preparar`: lo de un club de SIIS que se puede adelantar SIN darlo de alta y sin tocar nada de lo que se publica.
// POR QUÉ. Cada club de SIIS pasaba por pasos en serie (alta, estados, dictámenes, liga, tres subagentes, lote, carga) con la sesión esperando a cada uno. Los estados de SIIS, los dictámenes y lo que buscan los subagentes
// (gestiones, estadio y sponsor, auditor) no dependen del alta: mientras la sesión carga otro club, el siguiente queda preparado. El alta es lo único que mete al club en `data/clubs.js` y por lo tanto en el sitio: queda para cargarlo.
// QUÉ HACE (todo gratis salvo los escaneos de dictámenes, que van por Mistral, ~US$ 0,004 por página):
//   1. baja los estados de SIIS que faltan (`siis-estado.mjs`: escribe Clubes/ y Generados/ del club, nada de data/ ni de las páginas);
//   2. transcribe los dictámenes del revisor fiscal (`dictamenes-md.mjs`; los escaneos por Mistral);
//   3. dice el clubId PREVISTO (el del alta: slug de la carpeta + «-co»; `--avanzar` avisa si el alta da otro) y deja listos los tres briefs de los subagentes, con ese id y los años.
// Los subagentes se lanzan juntos y en segundo plano (gestiones: data/gestiones/co.js, que ya admite clubes sin balance; estadio y sponsor: tools/contexto-manual.json; auditor: Admin/registros/auditoria.jsonl, SIN correr
// `auditoria.mjs`, que regenera data/auditoria/). Lo adelantado va en su propio commit, aparte de la carga. Con `--ensayo` dice qué haría y no escribe nada.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pendientes } from './cola.mjs';

// LAS LÍNEAS DEL AUDITOR ADELANTADAS: `auditoria.mjs` rechaza una línea de un ejercicio que no tiene balance cargado, así que lo que el subagente escribe antes de la carga vive en
// Admin/registros/auditoria-adelantada.jsonl (que nadie lee) y se muda a auditoria.jsonl cuando el año está cargado. Devuelve cuántas mudó. `anios`: los años ya cargados del club.
export function mudarAuditor({ ROOT, clubId, anios, ENSAYO }) {
  const adel = join(ROOT, 'Admin/registros/auditoria-adelantada.jsonl'); if (!existsSync(adel)) return 0;
  const L = readFileSync(adel, 'utf8').split('\n').filter(Boolean);
  const va = (l) => { try { const j = JSON.parse(l); return j.clubId === clubId && anios.includes(String(j.anio)); } catch { return false; } };
  const mudar = L.filter(va); if (!mudar.length) return 0;
  console.log(`Líneas del auditor adelantadas de ${clubId}: ${mudar.length} (años ${mudar.map((l) => JSON.parse(l).anio).join(', ')})${ENSAYO ? ' (ensayo, no se mudan)' : ''}`);
  if (ENSAYO) return mudar.length;
  const aud = join(ROOT, 'Admin/registros/auditoria.jsonl'); const base = readFileSync(aud, 'utf8').replace(/\n*$/, '\n');
  writeFileSync(aud, base + mudar.join('\n') + '\n'); writeFileSync(adel, L.filter((l) => !va(l)).join('\n') + (L.some((l) => !va(l)) ? '\n' : ''));
  const r = execFileSync('node', ['tools/auditoria.mjs'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); console.log(r.trim().split('\n').slice(-2).join('\n'));
  return mudar.length;
}

// El `git add` de lo que hay que commitear, CALCULADO de `git status` (una lista escrita a mano perdió el clubId de siis-clubes.json y las imágenes de og/): cada carpeta o archivo cambiado
// de la raíz, y de Clubes/ y Generados/ solo lo de este club; lo de otro club se dice aparte para que no se mezcle en este commit.
export function listaParaCommitear({ ROOT, cfg, club }) {
  const salida = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
  const propios = new Set(); const ajenos = new Set(); const suyo = `/${cfg.pais}/${club}`;
  for (const l of salida) {
    let p = l.slice(3).replace(/^"|"$/g, ''); if (p.includes(' -> ')) p = p.split(' -> ')[1];
    if (/^(Clubes|Generados)\//.test(p)) { (p.includes(`${suyo}/`) || p.endsWith(suyo) ? propios : ajenos).add(p.includes(suyo) ? p.slice(0, p.indexOf(suyo) + suyo.length) : p.split('/').slice(0, 3).join('/')); continue; }
    propios.add(p.includes('/') && !p.startsWith('tools/') ? p.split('/')[0] : p); // las tools de una en una: un cambio de tool va en su propio commit
  }
  const q = (p) => (/\s/.test(p) ? `"${p}"` : p);
  return { add: propios.size ? `git add -A ${[...propios].sort().map(q).join(' ')}` : '(nada para commitear)', ajenos: [...ajenos].sort() };
}

export async function preparar({ club, cfg, ROOT, estadoDe, evaluar, ENSAYO }) {
  const q = JSON.stringify(club); const ev = evaluar();
  console.log(`=== --preparar ${club} · ${ev.veredicto}${ENSAYO ? ' · ENSAYO (no se escribe nada)' : ''} ===`);
  if (ev.veredicto === 'DESCARTAR') { console.log(`${ev.motivos.join('; ')}. No se prepara.`); return; }
  const corre = (args) => { console.log(`$ node ${args.join(' ')}`); if (ENSAYO) return ''; try { return execFileSync('node', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'pipe'] }); } catch (err) { console.log(`SE FRENÓ: ${String(err.stdout || '').trim().split('\n').slice(-6).join('\n')}${String(err.stderr || '').trim()}`); process.exit(1); } };

  let s = estadoDe(club);
  const sinEstado = s.filas.filter((f) => !f.siis && !f.cargado).map((f) => f.a);
  console.log(`\n1. Estados de SIIS: ${sinEstado.length ? `faltan ${sinEstado.join(', ')}` : 'todos bajados'}`);
  for (const a of sinEstado) corre(['tools/siis-estado.mjs', '--club', club, '--anio', a, '--escribir']);
  if (!ENSAYO) s = estadoDe(club);

  const dir = s.dir; const sinMd = () => (existsSync(dir) ? readdirSync(dir) : []).filter((x) => /^dictamen-revisor-fiscal-\d{4}\.pdf$/.test(x) && !existsSync(join(dir, x.replace(/\.pdf$/, '.md'))));
  console.log(`\n2. Dictámenes del revisor fiscal: ${sinMd().length ? `sin transcribir ${sinMd().map((x) => x.match(/\d{4}/)[0]).join(', ')}` : 'todos transcriptos'}`);
  if (sinMd().length) {
    const out = corre(['tools/dictamenes-md.mjs', club, '--escribir']);
    const escaneos = [...out.matchAll(/ESCANEO: node tools\/mistral-ocr-transcribe\.mjs "([^"]+)"/g)].map((m) => m[1]);
    let costo = 0; for (const pdf of escaneos) { const r = corre(['tools/mistral-ocr-transcribe.mjs', pdf]); costo += Number((r.match(/costo=\$([\d.]+)/) || [])[1] || 0); }
    if (escaneos.length) { console.log(`   Mistral: ${escaneos.length} escaneo(s), US$ ${costo.toFixed(3)}`); corre(['tools/dictamenes-md.mjs', club, '--escribir']); }
  }

  s = estadoDe(club); const id = s.idEf; const filas = s.filas;
  const previsto = !s.c.clubId; const anios = filas.map((f) => f.a).join(', ');
  console.log(`\n3. clubId ${previsto ? 'PREVISTO' : 'del alta'}: ${id}${previsto ? ' (el alta lo da por la carpeta; si da otro, --avanzar avisa: lo preparado hay que renombrarlo)' : ''}`);
  if (previsto) { // el ensayo del alta (sin --escribir): la pregunta del nombre legal, si la hay, queda en la cola ahora y no frena a --avanzar después
    const ultimo = s.filas.filter((f) => f.siis).map((f) => f.a).pop(); const pdf = `Clubes/${cfg.pais}/${club}/siis-estado-${ultimo}.pdf`;
    if (!ultimo || !existsSync(join(ROOT, pdf))) console.log(`   Ensayo del alta: todavía no hay estado de SIIS bajado${ENSAYO ? ' (el ensayo no los baja)' : ''}.`);
    else {
      const out = corre(['tools/alta-club.mjs', pdf, '--resumen']); console.log(`   Ensayo del alta (no escribe data/): ${out.trim().split('\n').join('\n   ')}`);
      const casos = pendientes().filter((p) => p.pdf.startsWith(`Clubes/${cfg.pais}/${club}`));
      if (casos.length) console.log(`   Pregunta(s) en la cola del club: ${casos.map((p) => p.id).join(', ')}. Contestarlas ahora (node tools/cola.mjs --responder <id> corregir --valor "<nombre legal>" … --causa lectura-del-documento) deja el alta sin frenos.`);
      else console.log('   El alta no pregunta nada.');
    }
  }
  const faltan = { gestiones: !s.hayGestion, 'estadio-sponsor': filas.some((f) => !f.ctx && !f.cargado), auditor: filas.some((f) => f.dictamen && !f.aud) };
  const lanzar = Object.entries(faltan).filter(([, v]) => v).map(([k]) => k);
  console.log(`\n4. Subagentes de lo adelantable (años ${anios}): ${lanzar.length ? lanzar.join(' · ') : 'nada falta'}`);
  if (lanzar.length) console.log(`   LANZÁ JUNTOS y en segundo plano, en UN solo mensaje con una llamada a Agent cada uno (modelo sonnet; el brief: node tools/club-siis.mjs ${q} --brief <nombre>):\n   ${lanzar.map((k) => `${k}  →  node tools/club-siis.mjs ${q} --brief ${k}`).join('\n   ')}\n   El del auditor NO corre auditoria.mjs mientras el club no esté cargado (lo dice su brief).`);
  const lc = listaParaCommitear({ ROOT, cfg, club });
  console.log(`\n5. Commit de lo adelantado, después de los subagentes (aparte de la carga; ninguna página del sitio cambia; la lista sale de \`git status\` de ahora, vuelve a pedirla al terminar):\n   ${lc.add}${lc.ajenos.length ? `\n   (no incluidos, son de otro club: ${lc.ajenos.join(', ')})` : ''}\n   git commit -m "${club}: adelantado desde SIIS (474)"\n   Después, cuando toque cargarlo: node tools/club-siis.mjs ${q} --avanzar [--escribir [--ejecutar [--cargar]]]`);
}
