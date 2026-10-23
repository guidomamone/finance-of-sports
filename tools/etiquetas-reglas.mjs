// tools/etiquetas-reglas.mjs — las reglas objetivas por categoría y las decisiones ya tomadas sobre etiquetas de línea. Lo usan
// tools/recategorizar-etiquetas.mjs (el proceso) y audit.js (`etiqueta-sin-revisar`). Una etiqueta es el texto de la línea tal cual figura en el
// documento, normalizado (minúsculas, sin acentos, espacios simples).
//
// Agregar una categoría: una entrada en REGLAS (`desde`: la categoría donde cae hoy lo que va a ella; `amplia`: lo que PUEDE ser; `excluye`: lo que
// NO entra aunque matchee, con el motivo; `incluye`: lo que el documento imprime con la palabra) y su `CATEGORÍA (prompt)` en Admin/CONVENCIONES-DATOS.md.
// Las decisiones viven en tools/etiquetas/<categoría>.json (grants_donations conserva tools/subsidios-etiquetas.json).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

export const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

export const REGLAS = {
  grants_donations: {
    desde: 'other_income', lado: 'revenue', archivo: 'tools/subsidios-etiquetas.json',
    nombre: 'subsidios, donaciones y aportes',
    // lo que PUEDE ser un subsidio, una donación o un aporte (en los idiomas de los clubes cargados)
    amplia: /subs[ií]d|subven|donac|donat|doa[cç]|auxil|incentiv|ayuda|apoio|\bgrants?\b|aporte|contribu|επιχορ|δωρε|взнос|субсид|пожертв|subsidie|tilskud|st[øö]tte|bijdrage|toetus|annetus|sponsorship grant|bidrag|gift|\bsupport\b/i,
    // lo que NO entra aunque matchee (REGLA): subvención de capital imputada al resultado, premios y solidaridad UEFA o de la liga, subsidio de la educación
    noEntra: /imputaci|imputa[cç]|diferid|deferred|release of|capital grant|amortis|inmoviliz|investimento|solidarity|solidaridad|uefa|prize|premio|educaci|school|colegio/i,
    // por orden: (1) lo mezclado con otra cosa, (2) lo que reparten la federación o la liga (solidaridad: `competition_bonus`) y los viajes que paga la federación,
    // (3) la imputación o amortización de una subvención de capital, (4) impuestos y deducciones, (5) cuotas, tasas y créditos fiscales, (6) condonaciones y resultados de subsidiarias
    excluye: [
      [/^(otros ingresos|otras ingresos|andre driftsind|otros ingresos de explotaci|otros ingresos no operacion)|^ostali poslovni prihodi(?! . donacije$)/i, 'mezclado con otros ingresos'],
      [/donacije \+|\+ donaci|dotacije.*\+|επιχορηγήσεις (&|και) διάφορα|medlemsinntekter|mediemsinntekter|proventi lnp|izvanredni prihodi/i, 'mezclado con otro concepto'],
      [/federali|\bleghe\b|lnpa|lnpb|altri contributi sportivi|dimayor|conmebol|associações\/fpf|associa[cç][õo]es\/federa|federa[cç]|liga portuguesa|\bfpf\b|\blpf\b|fundo infraestruturas|desloca|ejl|eesti jalgpallil|ejliidu/i, 'lo reparte la federación o la liga (solidaridad: competition_bonus)'],
      [/imputaci|imputa[cç][aã]o|release of|amortis|c\/impianto/i, 'subvención de capital imputada o amortizada (no es plata del año)'],
      [/impostos|dedu[cç]/i, 'impuestos y deducciones'],
      [/egenandeler|deltakeravgift|crediti fiscali|investimenti pubblicitari/i, 'cuota, tasa o crédito fiscal'],
      [/condonaci|ganhos|perdas|subsidi[aá]ria/i, 'condonación o resultado de subsidiarias'],
    ],
    incluye: /subs[ií]d|subven|donac|donativ|donacije|dotacije|\bgrants?\b|toetus|annetus|tilskudd|gaver|bidrag|doprinosi|contributi in c|contributi in clesercizio|contributi a fondo|contributi per sanificazione|contributo canoni|revenue from contributions|a\) grants|contributions from support|contribui[cç][oõ]es\/donativos|contribuciones de asociados|επιχορηγ|взнос|пожертв|subsidie|giften|bijdragen in giften|subsidio|subvenções/i,
  },
};

// el motivo por el que una regla objetiva EXCLUYE esta etiqueta, o null
export function motivoExcluye(cat, etiqueta) {
  const x = norm(etiqueta);
  for (const [re, m] of REGLAS[cat].excluye) if (re.test(x) || re.test(String(etiqueta))) return m;
  return null;
}

export const archivoDe = (cat) => resolve(ROOT, REGLAS[cat]?.archivo || `tools/etiquetas/${cat}.json`);

// { aprobadas: [norm], excluidas: { norm: motivo }, quien: { norm: 'regla'|'jev'|'agente'|'guido' }, revisar: { norm: { etiqueta, confianza } }, guido: { norm: { etiqueta, motivo } } }
// (lo que respondió Jev vive en Admin/registros/etiquetas-jev.jsonl)
export function leerDecisiones(cat) {
  const f = archivoDe(cat);
  const d = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
  return { aprobadas: d.aprobadas || [], excluidas: d.excluidas || {}, quien: d.quien || {}, revisar: d.revisar || {}, guido: d.guido || {} };
}

export function escribirDecisiones(cat, d) {
  const f = archivoDe(cat); mkdirSync(dirname(f), { recursive: true });
  const ord = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
  const comentario = `Etiquetas de línea sobre ${cat} (${REGLAS[cat].nombre}): aprobadas (van a ${cat}) y excluidas (se miraron y NO van, con el motivo); quien: quién decidió cada una (regla, jev, agente, guido); revisar: entre 0,50 y 0,90 de Jev, pendiente del agente; guido: lo que quedó para la lista corta. Las escribe tools/recategorizar-etiquetas.mjs.`;
  writeFileSync(f, JSON.stringify({ _comentario: comentario, aprobadas: [...new Set(d.aprobadas)].sort(), excluidas: ord(d.excluidas), quien: ord(d.quien), revisar: ord(d.revisar), guido: ord(d.guido) }, null, 1) + '\n');
}

export const decidida = (d, etiqueta) => { const k = norm(etiqueta); return d.aprobadas.includes(k) ? 'aprobada' : d.excluidas[k] ? 'excluida' : null; };
