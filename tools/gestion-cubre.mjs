// tools/gestion-cubre.mjs — ¿las gestiones CONFIRMADAS de un club cubren cada cierre de los años por cargar? (club-siis.mjs decide con esto si lanza el subagente de gestiones)
// POR QUÉ. Antes bastaba con que `data/gestiones/<iso>.js` tuviera la clave del club: Envigado la tenía, con una gestión que empezaba en octubre de 2013 sin día (`confirmada:false`), y la cola igual preguntó 9
// veces quién conducía en cada cierre 2016-2024 cuando el lote ya había corrido. Cargar.mjs exige EXACTAMENTE UNA gestión confirmada por cierre (desde <= cierre <= hasta, hasta null = hoy): la misma regla acá.
// ENTRADA: el texto de data/gestiones/<iso>.js, el id del club y los cierres (AAAA-MM-DD). SALIDA: los cierres sin exactamente una gestión confirmada (lista vacía = cubierto).
// USO: import { cierresSinGestion } from './gestion-cubre.mjs'.  Prueba: node tools/probar-gestion-cubre.mjs
import vm from 'node:vm';

export function gestionesDe(texto, id) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(texto, ctx);
  return ctx.window.CLUB_GESTIONES?.[id] || [];
}

export function cierresSinGestion(texto, id, cierres) {
  const conf = gestionesDe(texto, id).filter((g) => g.confirmada === true);
  return cierres.filter((c) => conf.filter((g) => g.desde <= c && (g.hasta == null || g.hasta >= c)).length !== 1);
}
