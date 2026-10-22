#!/usr/bin/env node
// ============================================================================
// tools/recategorizar-subsidios.mjs — pasa lo ya cargado de «Otros ingresos» a `grants_donations` (subsidios, donaciones y aportes), por ETIQUETA.
//
// POR QUÉ. La fila «Subsidios y donaciones» del Formato simplificado (REGLA de Admin/CONVENCIONES-DATOS.md, votación 3 a 0) se alimenta de la categoría `grants_donations`. Las cargas nuevas la
// usan; esto mueve lo que ya estaba como `other_income`. Cambia en qué fila se ve la plata, no el total de ingresos de ningún club-año.
//
// CÓMO. Una línea de ingreso con categoría `other_income` cuya etiqueta matchea la expresión amplia es CANDIDATA. Las etiquetas distintas se listan agrupadas (cuántas líneas, cuántos clubes,
// qué países) y una sesión (o Guido) decide cuáles son; la decisión queda en tools/subsidios-etiquetas.json (`aprobadas`: la etiqueta normalizada; `excluidas`: lo que se miró y NO es,
// con el motivo). Nada se mueve sin estar en `aprobadas`. Es persistente: la próxima carga del mismo club usa lo cargado en el sitio como precedente (memoria-categorias.mjs: «lo cargado siempre gana»).
//
// USO:
//   node tools/recategorizar-subsidios.mjs --listar [--todas]   etiquetas candidatas agrupadas, con su estado (aprobada / excluida / SIN REVISAR); --todas incluye las ya aprobadas
//   node tools/recategorizar-subsidios.mjs --ensayo              qué líneas movería (club, año, etiqueta, monto) con lo aprobado
//   node tools/recategorizar-subsidios.mjs --escribir            las mueve (JSON de cada club + su -data.js); después: node tools/publicar.mjs y un commit con «Corrige:»
// ============================================================================
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { leerJsonClub, modificarClub } from './club-json.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const LISTA = resolve(ROOT, 'tools', 'subsidios-etiquetas.json');
const A = process.argv.slice(2);

// la expresión amplia: lo que PUEDE ser un subsidio, una donación o un aporte (en los idiomas de los clubes cargados). Una sesión confirma cada etiqueta distinta.
const AMPLIA = /subs[ií]d|subven|donac|\bgrants?\b|aporte|contribu|επιχορ|δωρε|взнос|субсид|пожертв|subsidie|tilskud|st[øö]tte|bijdrage|toetus|annetus|sponsorship grant|bidrag|gift|\bsupport\b/i;
// lo que NO entra aunque matchee (REGLA): subvención de capital imputada al resultado, premios y solidaridad UEFA o de la liga, subsidio de la educación
const NO_ENTRA = /imputaci|imputa[cç]|diferid|deferred|release of|capital grant|amortis|inmoviliz|investimento|solidarity|solidaridad|uefa|prize|premio|educaci|school|colegio/i;
// PROPUESTA (--proponer): reglas objetivas para no decidir 164 etiquetas una por una. Entra lo que el documento imprime como subsidio/donación/aporte; NO entra, por orden: (1) lo mezclado con otra cosa
// («Otros ingresos de explotación (…, subvenciones)»), (2) lo que reparten la federación o la liga (es solidaridad: `competition_bonus`) y los viajes que paga la federación, (3) la imputación o amortización de una
// subvención de capital, (4) impuestos y deducciones, (5) cuotas, tasas y créditos fiscales, (6) condonaciones y resultados de subsidiarias. Lo dudoso queda excluido: sumarlo después es una línea en el JSON.
const EXCLUYE = [
  [/^(otros ingresos|otras ingresos|andre driftsind|otros ingresos de explotaci|otros ingresos no operacion)|^ostali poslovni prihodi(?! . donacije$)/i, 'mezclado con otros ingresos'],
  [/donacije \+|\+ donaci|dotacije.*\+|επιχορηγήσεις (&|και) διάφορα|medlemsinntekter|mediemsinntekter|proventi lnp|izvanredni prihodi/i, 'mezclado con otro concepto'],
  [/federali|\bleghe\b|lnpa|lnpb|altri contributi sportivi|dimayor|conmebol|associações\/fpf|associa[cç][õo]es\/federa|federa[cç]|liga portuguesa|\bfpf\b|\blpf\b|fundo infraestruturas|desloca|ejl|eesti jalgpallil|ejliidu/i, 'lo reparte la federación o la liga (solidaridad: competition_bonus)'],
  [/imputaci|imputa[cç][aã]o|release of|amortis|c\/impianto/i, 'subvención de capital imputada o amortizada (no es plata del año)'],
  [/impostos|dedu[cç]/i, 'impuestos y deducciones'],
  [/egenandeler|deltakeravgift|crediti fiscali|investimenti pubblicitari/i, 'cuota, tasa o crédito fiscal'],
  [/condonaci|ganhos|perdas|subsidi[aá]ria/i, 'condonación o resultado de subsidiarias'],
];
const INCLUYE = /subs[ií]d|subven|donac|donativ|donacije|dotacije|\bgrants?\b|toetus|annetus|tilskudd|gaver|bidrag|doprinosi|contributi in c|contributi in clesercizio|contributi a fondo|contributi per sanificazione|contributo canoni|revenue from contributions|a\) grants|contributions from support|contribui[cç][oõ]es\/donativos|contribuciones de asociados|επιχορηγ|взнос|пожертв|subsidie|giften|bijdragen in giften|subsidio|subvenções/i;
const motivoExcluye = (l) => { const x = norm(l); for (const [re, m] of EXCLUYE) if (re.test(x) || re.test(String(l))) return m; return null; };

const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

const lista = existsSync(LISTA) ? JSON.parse(readFileSync(LISTA, 'utf8')) : { aprobadas: [], excluidas: {} };
const aprobada = (l) => lista.aprobadas.includes(norm(l));

function clubes() {
  const out = [];
  for (const d of readdirSync(resolve(ROOT, 'data')).filter((x) => /^[a-z]{2}$/.test(x))) for (const f of readdirSync(resolve(ROOT, 'data', d)).filter((x) => x.endsWith('.json'))) out.push(f.replace(/\.json$/, ''));
  return out.sort();
}

function candidatas() {
  const porEtiqueta = new Map();
  for (const id of clubes()) {
    let j; try { j = leerJsonClub(id); } catch { continue; }
    const anios = Array.isArray(j.years) ? j.years : Object.values(j.years || {});
    for (const y of anios) for (const l of y.revenue || []) {
      if (l.subcategory !== 'other_income' || !AMPLIA.test(l.label)) continue;
      const k = norm(l.label); const e = porEtiqueta.get(k) || { etiqueta: l.label, n: 0, clubes: new Set(), paises: new Set(), total: 0, ejemplos: [] };
      e.n++; e.clubes.add(id); e.paises.add(id.split('-').pop()); e.total += Math.abs(l.amount || 0); if (e.ejemplos.length < 2) e.ejemplos.push(`${id} ${y.fiscal_year}`);
      porEtiqueta.set(k, e);
    }
  }
  return porEtiqueta;
}

const estado = (k, e) => (aprobada(e.etiqueta) ? 'APROBADA' : lista.excluidas[k] ? 'excluida' : NO_ENTRA.test(e.etiqueta) ? 'excluida por la REGLA (revisar)' : 'SIN REVISAR');

if (A.includes('--proponer')) {
  // escribe tools/subsidios-etiquetas.json con la propuesta de las reglas de arriba para las etiquetas SIN REVISAR; lo ya decidido a mano no se pisa
  const c = candidatas(); let ap = 0; let ex = 0;
  for (const [k, e] of c) {
    if (lista.aprobadas.includes(k) || lista.excluidas[k]) continue;
    const m = motivoExcluye(e.etiqueta);
    if (m) { lista.excluidas[k] = m; ex++; } else if (INCLUYE.test(e.etiqueta)) { lista.aprobadas.push(k); ap++; } else { lista.excluidas[k] = 'no dice subsidio, donación ni aporte (la expresión amplia lo atrapó por otra palabra)'; ex++; }
  }
  writeFileSync(LISTA, JSON.stringify({ _comentario: 'Etiquetas de ingreso que se pasan a grants_donations (aprobadas) o que se miraron y NO van (excluidas, con el motivo). Las propone tools/recategorizar-subsidios.mjs --proponer con reglas objetivas; una sesión las revisa con --listar --todas. Una etiqueta nueva sin revisar la ve el --listar.', aprobadas: lista.aprobadas.sort(), excluidas: lista.excluidas }, null, 1) + '\n');
  console.log(`propuesta escrita: ${ap} aprobadas, ${ex} excluidas (tools/subsidios-etiquetas.json)`);
} else if (A.includes('--listar')) {
  const c = candidatas(); const filas = [...c.entries()].sort((a, b) => b[1].n - a[1].n);
  let sinRevisar = 0;
  for (const [k, e] of filas) {
    const est = estado(k, e); if (est === 'SIN REVISAR') sinRevisar++;
    if (!A.includes('--todas') && est === 'APROBADA') continue;
    console.log(`${String(e.n).padStart(4)} líneas · ${String(e.clubes.size).padStart(3)} clubes · ${[...e.paises].join(',').padEnd(10)} · ${est.padEnd(10)} · «${String(e.etiqueta).slice(0, 90)}» (${e.ejemplos.join('; ')})`);
  }
  console.log(`\n${filas.length} etiquetas distintas, ${sinRevisar} sin revisar. Se aprueban en tools/subsidios-etiquetas.json (aprobadas / excluidas).`);
} else if (A.includes('--ensayo') || A.includes('--escribir')) {
  const escribir = A.includes('--escribir'); let n = 0; let monto = 0; const porClub = {};
  for (const id of clubes()) {
    let j; try { j = leerJsonClub(id); } catch { continue; }
    const anios = Array.isArray(j.years) ? j.years : Object.values(j.years || {});
    const mover = []; for (const y of anios) for (const l of y.revenue || []) if (l.subcategory === 'other_income' && aprobada(l.label)) mover.push([y.fiscal_year, l.label, l.amount]);
    if (!mover.length) continue;
    porClub[id] = mover.length; n += mover.length; monto += mover.reduce((s, m) => s + Math.abs(m[2] || 0), 0);
    if (!escribir) { for (const m of mover.slice(0, 3)) console.log(`  ${id} ${m[0]} «${String(m[1]).slice(0, 60)}» ${m[2]}`); continue; }
    modificarClub(id, (c) => { for (const lines of Object.values(c.datos.revenueLinesByYear || {})) for (const l of lines) if (l.normalizedCategory === 'other_income' && aprobada(l.rawLabel)) l.normalizedCategory = 'grants_donations'; });
  }
  console.log(`${escribir ? 'movidas' : 'se moverían'}: ${n} líneas en ${Object.keys(porClub).length} clubes (suma de montos absolutos ${monto.toFixed(1)} M, en su moneda)`);
} else { console.error('uso: --listar [--todas] | --ensayo | --escribir (ver la cabecera)'); process.exit(1); }
