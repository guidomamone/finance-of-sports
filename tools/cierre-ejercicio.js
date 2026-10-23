// ============================================================================
// tools/cierre-ejercicio.js — la fecha de cierre de UN ejercicio, para los generadores.
//
// Es la misma escalera que `cierreEjercicio()` de js/finanzas-calc.js (el sitio), para que fuentes.html y data/club-index.js
// nombren cada ejercicio igual que la página: 1) el campo `cierre` de su fiscalYearMeta; 2) la fecha de su `fxRef`
// ("EUR@2018-06-30", el pipeline la escribe con el cierre real); 3) la regla del club (`fiscalYearStart` de data/clubs.js).
// Por qué por ejercicio y no por club: Parma, Atalanta, Milan, Genoa y Fiorentina cambiaron la fecha de cierre algunos años.
// ============================================================================

function cierreDelClub(club, y) {
  const ini = (club && club.fiscalYearStart) || '07-01';
  if (ini === '01-01') return `${y}-12-31`;
  const d = new Date(Date.UTC(y, Number(ini.slice(0, 2)) - 1, Number(ini.slice(3, 5))));
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function cierreEjercicio(meta, club, y) {
  if (meta && meta.cierre) return meta.cierre;
  const ref = meta && meta.fxRef && String(meta.fxRef).split('@')[1];
  if (ref && /^\d{4}-\d{2}-\d{2}$/.test(ref)) return ref;
  return cierreDelClub(club, y);
}

const esCalendario = (meta, club, y) => cierreEjercicio(meta, club, y).slice(5, 7) === '12';

module.exports = { cierreEjercicio, cierreDelClub, esCalendario };
