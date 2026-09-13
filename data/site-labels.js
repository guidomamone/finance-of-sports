// ============================================================================
// data/site-labels.js - Etiquetas del SITIO que se pueden traducir (Versión 115).
//
// POR QUÉ ESTÁ SEPARADO: en la tabla de Finanzas conviven dos clases de texto muy
// distintas, y solo UNA se traduce.
//
//   1. Los rubros de "Formato del club": salen textuales del balance de cada club
//      (`rawLabel`). NO se traducen NUNCA. La promesa del sitio es mostrar cada
//      club tal cual lo reporta; traducir "Ingresos por Cuota Social" de un
//      balance argentino sería poner en el documento algo que el documento no
//      dice.
//   2. Los buckets de "Formato simplificado" y los catch-all ("Otros gastos"):
//      son categorías que inventó el SITIO para poder comparar clubes entre sí.
//      Esos SÍ se traducen.
//
// Este archivo es la lista de la clase (2). `tLabel()` en js/finanzas-render.js
// traduce solo si la etiqueta está acá; cualquier otra pasa de largo intacta, que
// es justo lo que necesita la clase (1).
//
// La CLAVE de este mapa es la etiqueta en castellano tal cual aparece en
// GENERIC_SIMPLIFIED_*_BUCKETS (js/finanzas-calc.js). Si se renombra un bucket
// allá, hay que renombrarlo acá también, o deja de traducirse (degrada a
// castellano, no rompe). Los `label` en castellano siguen siendo los que usa el
// código para MATCHEAR (findPrevVal, el overlay de presupuesto): acá solo se
// traduce al momento de dibujar.
// ============================================================================

window.SITE_LABEL_KEYS = {
  "Ingresos": "section.revenue",
  "Gastos": "section.expenses",
  "Abonos": "bucket.season_tickets",
  "Administración y gastos generales": "bucket.admin",
  "Comercial / Sponsors": "bucket.sponsorship",
  "Compra de jugadores": "bucket.player_purchase",
  "Cuotas Sociales": "bucket.member_dues",
  "Estadio: recaudación de partidos": "bucket.matchday",
  "Fútbol profesional (sin desglosar por la fuente)": "bucket.lump_football",
  "Inversiones (amortizaciones y depreciación)": "bucket.depreciation",
  "Organización de partidos": "bucket.match_org",
  "Otras secciones deportivas (juvenil, otros deportes, básquet)": "bucket.youth_other",
  "Otras secciones deportivas y otros ingresos": "bucket.other_sections_revenue",
  "Otros gastos": "bucket.other_expense",
  "Otros ingresos": "bucket.other_revenue",
  "Premios por competencias": "bucket.competition_bonus",
  "Salarios y primas (plantel y cuerpo técnico)": "bucket.wages",
  "Televisión": "bucket.broadcasting",
  "Venta de Jugadores": "bucket.player_sales"
};
