// Las etiquetas del SITIO que se traducen (las filas de Formato simplificado y los catch-all); un rubro textual del balance de un club
// (rawLabel) no se traduce nunca. La clave es la etiqueta en castellano de GENERIC_SIMPLIFIED_*_BUCKETS (js/finanzas-calc.js): si se
// renombra un bucket allá, hay que renombrarlo acá (si no, degrada a castellano). Se traduce al dibujar: el castellano es la clave con
// la que matchean findPrevVal() y el overlay.

window.SITE_LABEL_KEYS = {
  "Ingresos": "section.revenue",
  "Gastos": "section.expenses",
  "Abonos": "bucket.season_tickets",
  "Administración y gastos generales": "bucket.admin",
  "Comercial / Sponsors": "bucket.sponsorship",
  "Compra de jugadores": "bucket.player_purchase",
  "Cuotas Sociales": "bucket.member_dues",
  "Estadio": "bucket.stadium",
  "Estadio: recaudación de partidos": "bucket.matchday",
  "Fútbol profesional (sin desglosar por la fuente)": "bucket.lump_football",
  "Rugby profesional (sin desglosar por la fuente)": "bucket.lump_rugby",
  "Inversiones (amortizaciones y depreciación)": "bucket.depreciation",
  "Organización de partidos": "bucket.match_org",
  "Otras actividades (educación, juvenil, otros deportes, básquet)": "bucket.youth_other",
  "Otras actividades (educación y otros deportes)": "bucket.other_sections_revenue",
  "Otras secciones deportivas y otros ingresos": "bucket.other_sections_revenue_legacy",
  "Otros gastos": "bucket.other_expense",
  "Otros ingresos": "bucket.other_revenue",
  "Premios por competencias": "bucket.competition_bonus",
  "Salarios y primas (plantel y cuerpo técnico)": "bucket.wages",
  "Subsidios y donaciones": "bucket.grants",
  "Televisión": "bucket.broadcasting",
  "Venta de Jugadores": "bucket.player_sales"
};
