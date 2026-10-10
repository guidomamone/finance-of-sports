// ============================================================================
// data/rankings/br-paulistaA1.js — GENERADO por tools/generate-rankings.js.
// NO EDITAR A MANO: se sobrescribe. Para cambiar un número hay que cambiar el
// `data/<club>-data.js` que lo origina y volver a correr el generador.
//
// Paulista Série A1 (BR) — 2 ejercicio(s) con ranking:
//   2017: 2 club(es) cargado(s), sin verificar cuántos equipos tuvo.
//   2016: 2 club(es) cargado(s), sin verificar cuántos equipos tuvo.
//
// Ingresos en MILLONES DE USD, convertidos con el tipo de cambio de cada
// documento (ver `fxSource`/`fxRef` en el archivo de cada club) y agrupados en
// Formato simplificado. Orden DESCENDENTE: el 1 del ranking primero.
// ============================================================================
window.RANKINGS = window.RANKINGS || {};
window.RANKINGS["br-paulistaA1"] = {
  2017: {
    leagueSize: null,
    clubs: [
      { id:"ferroviaria-br", revenue:2.713, reportType:"official_balance_sheet",
        sourceId:"ferroviaria-br-dre-2017",
        mix:[["Fútbol profesional (sin desglosar por la fuente)",2.623],["Otros ingresos",0.09]],
        incluidos:[["Cuotas Sociales","Fútbol profesional (sin desglosar por la fuente)",1],["Comercial / Sponsors","Fútbol profesional (sin desglosar por la fuente)",1],["Estadio","Fútbol profesional (sin desglosar por la fuente)",1],["Televisión","Fútbol profesional (sin desglosar por la fuente)",1]] },
      { id:"novorizontino-br", revenue:2.463, reportType:"official_balance_sheet",
        sourceId:"novorizontino-br-dre-e-fluxo-de-caixa-2017",
        mix:[["Fútbol profesional (sin desglosar por la fuente)",2.424],["Otros ingresos",0.038]] },
    ],
  },
  2016: {
    leagueSize: null,
    clubs: [
      { id:"ferroviaria-br", revenue:2.826, reportType:"official_balance_sheet",
        sourceId:"ferroviaria-br-balanco-2016",
        mix:[["Cuotas Sociales",0.175],["Comercial / Sponsors",0.633],["Estadio",0.29],["Televisión",0.885],["Venta de Jugadores",0.596],["Otros ingresos",0.246]] },
      { id:"novorizontino-br", revenue:0.995, reportType:"official_balance_sheet",
        sourceId:"novorizontino-br-balanco-2016",
        mix:[["Comercial / Sponsors",0.06],["Estadio",0.195],["Televisión",0.676],["Venta de Jugadores",0.064],["Otros ingresos",0.001]] },
    ],
  },
};
