// Cómo se MUESTRA una fuente (etiquetas de tipo y nivel, salvedades derivadas de los datos), compartido por la ficha de Finanzas, la
// pestaña Fuentes y fuentes.html; lo cargan el navegador y los generadores de tools/. OJO: `note` es INTERNA y no se renderiza nunca;
// `publicNote` es para el lector; el resto de las salvedades se derivan acá (sourceCaveats), no se escriben a mano.

// Qué tipo de documento es. Las claves son las de `sources[].type`.
const SOURCE_TYPE_LABEL = {
  official_balance_sheet: 'Balance auditado',
  official_budget: 'Presupuesto oficial',
  official_budget_and_balance: 'Presupuesto y balance',
  unofficial_mirror: 'Balance auditado, copia no oficial',
  press_coverage_of_assembly: 'Cobertura de prensa de la asamblea',
  estimate_placeholder: 'Sin documento',
};

// Cuánto pesa la fuente. Las claves son las de `sources[].reliability`.
const SOURCE_LEVEL = {
  primary:          { label: 'Fuente primaria',    color: '#1b7a3d' },
  secondary_mirror: { label: 'Réplica no oficial', color: '#9a6b00' },
  secondary_press:  { label: 'Prensa',             color: '#9a6b00' },
  placeholder:      { label: 'Sin fuente',         color: '#b5372b' },
};

function sourceTypeLabel(type){ return SOURCE_TYPE_LABEL[type] || type || ''; }
function sourceLevel(reliability){
  return SOURCE_LEVEL[reliability] || { label: reliability || '', color: '#6b6b6b' };
}

// sourceCaveats(source, metas): las salvedades que salen de los datos, como
// frases cortas listas para mostrar. `metas` son las entradas de
// `fiscalYearMeta` que usan ESE documento (una sola en la ficha de Finanzas,
// todas las del documento en fuentes.html). Devuelve [] cuando no hay nada que
// aclarar, que es el caso normal: un balance auditado que publica todo no
// necesita ninguna advertencia.
function sourceCaveats(source, metas){
  const out = [];
  const lista = (metas || []).filter(Boolean);
  const fxDe = m => (typeof fxMetaFor === 'function' ? fxMetaFor(m).source : m.fxSource);
  const algun = f => lista.some(f);

  if(algun(m => fxDe(m) === 'placeholder')){
    out.push('El documento no declara un tipo de cambio y no se consiguió uno de su fecha de cierre: el valor en dólares usa una referencia redonda y sirve solo para dar orden de magnitud.');
  } else if(algun(m => fxDe(m) === 'market_approx')){
    out.push('El tipo de cambio usado para pasar a dólares es aproximado: no se consiguió la cotización exacta de la fecha de cierre.');
  } else if(algun(m => fxDe(m) === 'unknown')){
    out.push('Falta verificar de dónde salió el tipo de cambio usado para pasar a dólares.');
  }

  const esBalance = m => ['official_balance_sheet', 'official_budget_and_balance', 'unofficial_mirror'].includes(m.reportType);
  if(algun(m => esBalance(m) && m.officialPAT == null)){
    out.push('El documento no publica el resultado del ejercicio, así que esa cifra no se puede verificar contra un total impreso.');
  }
  if(algun(m => m.grossDebt == null && m.cash == null)){
    out.push('No informa deuda ni caja.');
  }
  return out;
}

// Calidad de dato por club: el punto de color del selector. Los 4 estados NO son los 4 valores de `reliability`: la pregunta es
// "¿hay algún documento REAL?" (un balance auditado conseguido en una réplica es un dato real), no "¿hay algún primary?".
const CLUB_QUALITY = {
  full:        { label: 'Todos los ejercicios con documento oficial', dot: 'verde' },
  mixed:       { label: 'Mezcla de documento real y placeholder',     dot: 'amarillo' },
  placeholder: { label: 'Solo placeholder, sin documento todavía',    dot: 'gris' },
  empty:       { label: 'Sin datos cargados',                         dot: 'vacio' },
};

// clubQuality(sources, clubId): uno de los 4 estados de arriba.
// `sources` se pasa por parámetro (y no se lee del global) porque los
// generadores de `tools/` lo tienen completo y el navegador solo tiene el de los
// clubes ya cargados: quien llama sabe cuál está usando.
function clubQuality(sources, clubId){
  const propias = Object.keys(sources || {})
    .map(k => sources[k])
    .filter(s => s.clubId === clubId);
  if(!propias.length) return 'empty';
  const reales = propias.filter(s => s.reliability !== 'placeholder');
  if(!reales.length) return 'placeholder';
  const todosOficiales = propias.every(s => s.reliability === 'primary');
  return todosOficiales ? 'full' : 'mixed';
}
