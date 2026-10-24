// tools/cambio-formato.js — detecta que el formato del balance de un club cambió de un año al siguiente: de RESUMIDO (los ingresos son una sola línea
// sin desglosar, `lump_football_operations`) a COMPLETO (más de una línea de ingresos) o al revés. Lo usan cargar.mjs (el aviso de la propuesta, con el
// texto sugerido de la nota pública) y audit.js (P3 si el año nuevo quedó sin publicNote). Solo mira la forma de las líneas de ingresos, no nombra ningún club.
const LUMP = 'lump_football_operations';
const esLump = (l) => (l.normalizedCategory ?? l.subcategory) === LUMP;

// previas, nuevas: las líneas de ingresos del año anterior cargado y del año por cargar. Devuelve 'resumido-a-completo', 'completo-a-resumido' o null.
function cambioDeFormato(previas, nuevas) {
  const resumido = (ls) => ls.length === 1 && esLump(ls[0]);
  if (resumido(previas) && nuevas.length > 1) return 'resumido-a-completo';
  if (resumido(nuevas) && previas.length > 1) return 'completo-a-resumido';
  return null;
}

// El año cargado inmediatamente anterior a `year` en revenueLinesByYear (year - 1; con un hueco en el medio no se compara: el formato pudo cambiar
// en cualquier año que falta), o null.
function anioAnterior(porAnio, year) {
  const y = Number(year) - 1;
  return (porAnio?.[y] || []).length ? y : null;
}

// El texto que se sugiere para la nota pública de la fuente del año nuevo.
function textoSugerido(cambio) {
  return cambio === 'resumido-a-completo'
    ? 'Hasta el ejercicio anterior el club publicaba el balance resumido (solo el margen bruto); desde este ejercicio publica el estado de resultados completo, con ventas y gastos por separado. Por eso los ingresos y gastos no son comparables con los de los años anteriores: el salto es de formato, no de actividad.'
    : 'Desde este ejercicio el club publica el balance resumido (solo el margen bruto) en vez del estado de resultados completo. Por eso los ingresos y gastos no son comparables con los de los años anteriores: el salto es de formato, no de actividad.';
}

module.exports = { cambioDeFormato, anioAnterior, textoSugerido, esLump };
