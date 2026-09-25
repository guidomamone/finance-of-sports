// ============================================================================
// data/rankings/de-2bundesliga.js — GENERADO por tools/generate-rankings.js.
// NO EDITAR A MANO: se sobrescribe. Para cambiar un número hay que cambiar el
// `data/<club>-data.js` que lo origina y volver a correr el generador.
//
// 2. Bundesliga (DE) — 2 ejercicio(s) con ranking:
//   2025: 2 club(es) cargado(s), sin verificar cuántos equipos tuvo.
//   2024: 1 club(es) cargado(s), sin verificar cuántos equipos tuvo.
//
// Ingresos en MILLONES DE USD, convertidos con el tipo de cambio de cada
// documento (ver `fxSource`/`fxRef` en el archivo de cada club) y agrupados en
// Formato simplificado. Orden DESCENDENTE: el 1 del ranking primero.
// ============================================================================
window.RANKINGS = window.RANKINGS || {};
window.RANKINGS["de-2bundesliga"] = {
  2025: {
    leagueSize: null,
    clubs: [
      { id:"koln-de", revenue:176.806, reportType:"official_balance_sheet",
        sourceId:"koln-de-jahresabschluss-2025",
        mix:[["Comercial / Sponsors",67.443],["Estadio",39.314],["Televisión",38.07],["Venta de Jugadores",14.277],["Otros ingresos",17.703]] },
      { id:"hamburgersv-de", revenue:151.249, reportType:"official_balance_sheet",
        sourceId:"hamburgersv-de-fussball-ag-jahresabschluss-2025",
        mix:[["Comercial / Sponsors",48.363],["Estadio",51.992],["Televisión",21.662],["Venta de Jugadores",4.485],["Otros ingresos",24.747]] },
    ],
  },
  2024: {
    leagueSize: null,
    clubs: [
      { id:"hamburgersv-de", revenue:134.86, reportType:"official_balance_sheet",
        sourceId:"hamburgersv-de-fussball-ag-jahresabschluss-2024",
        mix:[["Comercial / Sponsors",35.442],["Estadio",51.929],["Televisión",23.068],["Venta de Jugadores",1.714],["Otros ingresos",22.708]] },
    ],
  },
};
