// ============================================================================
// data/sources-view.js — cómo se MUESTRA una fuente. Las etiquetas de tipo y
// nivel de documento, y las salvedades que se derivan solas de los datos.
//
// POR QUÉ EXISTE (Versión 127): la ficha de Fuentes de Finanzas, la pestaña
// Fuentes y `fuentes.html` muestran lo mismo, y hasta acá cada una tenía su
// propia copia de las etiquetas ("Balance auditado", "Fuente primaria"...): dos
// en `js/finanzas-render.js` y dos más en `tools/generate-fuentes-page.js`. Es
// la misma duplicación que veníamos sacando de los datos, ahora en la capa de
// presentación. Vive en `data/` y no en `js/` porque lo cargan los dos mundos:
// el navegador por `<script src>` y los generadores de `tools/` por `vm`.
//
// LA DIVISIÓN QUE IMPORTA, Y ES LA RAZÓN DE FONDO DE ESTE ARCHIVO:
//
//   `note`        es INTERNA. Se la escribe una sesión para la siguiente: dónde
//                 quedó la transcripción, cómo se leyó el PDF, qué se verificó,
//                 qué quedó pendiente. NO SE RENDERIZA NUNCA. Hasta la Versión
//                 126 se publicaba tal cual, y el visitante terminaba leyendo
//                 rutas del disco de Guido y detalles de OCR.
//   `publicNote`  es para el LECTOR. Una o dos oraciones, solo donde hay una
//                 salvedad real que no se puede deducir de los datos (que el
//                 balance de River salga de una réplica de hinchas, que Club
//                 América venga del segmento de Ollamani junto con el estadio).
//                 Hoy la tienen 17 de 91 documentos, y está bien que sea así.
//   derivadas     todo lo demás. Que un tipo de cambio sea de referencia y no
//                 del documento, que el balance no publique el resultado del
//                 ejercicio, que no informe deuda ni caja: eso ya está en los
//                 campos, y escribirlo a mano documento por documento sería
//                 inventar una tercera copia que se desincroniza. Lo arma
//                 `sourceCaveats()`, acá abajo, y un club nuevo las trae bien
//                 sin que nadie escriba una línea.
// ============================================================================

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
