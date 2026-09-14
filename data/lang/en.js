// ============================================================================
// data/lang/en.js - Diccionario inglés (Versión 115).
//
// CÓMO FUNCIONA: cada clave se corresponde con un `data-i18n="clave"` del HTML o
// con una llamada `I18N.t('clave', 'castellano')` desde el JS. Si una clave NO
// está acá, el sitio muestra el castellano original (ver `js/i18n.js`): faltar
// una traducción degrada, no rompe.
//
// PARA AGREGAR UN IDIOMA: copiar este archivo a `data/lang/<code>.js`, cambiar
// `window.I18N.strings.en` por el código nuevo, traducir los valores (NO las
// claves), y sumar la entrada en `data/lang/langs.js`. Nada más.
//
// OJO, DECISIÓN ABIERTA: `site.name` traduce la marca ("Tu club en números" ->
// "Finance of Sports", que es el dominio que Guido compró el 2026-09-13). Es la
// única clave que cambia el NOMBRE del sitio y no solo su copy. Si el branding
// definitivo termina siendo otro, se cambia acá y en el HTML. Ver to-do 7 y 8.
//
// LO QUE NO ESTÁ TRADUCIDO TODAVÍA (por si alguien se pregunta si falta o si fue
// a propósito):
//   - Los rubros de "Formato del club" en Finanzas: salen textuales del balance
//     de cada club y NO se traducen nunca, a propósito. Traducir una línea de un
//     balance argentino sería inventar un dato que el documento no dice.
//   - Los buckets de "Formato simplificado", los avisos por tipo de reporte y los
//     nombres de gestión: esos SÍ son strings del sitio y SÍ deberían traducirse.
//     Están generados en `js/finanzas-render.js`/`js/finanzas-calc.js` y todavía
//     no pasan por `I18N.t()`. Es el próximo paso natural de esta tarea.
//   - El párrafo largo "Calidad de dato por club" de la pestaña Fuentes: se
//     reescribe seguido y hoy habla casi solo de clubes argentinos.
// ============================================================================

window.I18N = window.I18N || {};
window.I18N.strings = window.I18N.strings || {};
window.I18N.strings.en = {
  "bucket.admin": "Administration and general costs",
  "bucket.broadcasting": "Broadcasting",
  "bucket.competition_bonus": "Competition prize money",
  "bucket.depreciation": "Capex (amortisation and depreciation)",
  "bucket.lump_football": "Professional football (not broken down by the source)",
  "bucket.match_org": "Match organisation",
  "bucket.matchday": "Stadium: matchday revenue",
  "bucket.member_dues": "Membership dues",
  "bucket.other_expense": "Other costs",
  "bucket.other_revenue": "Other revenue",
  "bucket.other_sections_revenue": "Other sporting sections and other revenue",
  "bucket.player_purchase": "Player acquisitions",
  "bucket.player_sales": "Player sales",
  "bucket.season_tickets": "Season tickets",
  "bucket.sponsorship": "Commercial / Sponsors",
  "bucket.wages": "Wages and bonuses (squad and coaching staff)",
  "bucket.youth_other": "Other sporting sections (youth, other sports, basketball)",
  "budget.assump.sub": "Before showing the budget figures, the club sets out the assumptions behind them: expected inflation, exchange rate, projected sporting results, and so on. This is the fine print explaining where the projections above come from. It only appears for financial years with a budget loaded at this level of detail.",
  "budget.assump.title": "Assumptions",
  "budget.capex.sub": "The breakdown of the construction and infrastructure work the club plans to spend on over the financial year: stadium, facilities, training grounds, systems, and so on. It only appears for financial years with a capex budget loaded.",
  "budget.capex.title": "Capital expenditure budget",
  "budget.cash.sub": "Unlike the income statement above (which records everything on an accrual basis), this shows actual cash movement: how much money comes in and goes out, down to the closing balance. It only appears for financial years with a cash budget loaded.",
  "budget.cash.title": "Cash budget",
  "chart.nodata": "Not reported by the club",
  "comparar.sub": "The same financial and sporting indicators, side by side.",
  "comparar.title": "Compare boards",
  "cuenta.empty.text": "The plan is a free tier (what you already see on the site) and a paid tier with deeper analytics and material aimed at journalists and content creators, paid through dLocal Go. It is not built yet: this tab is a placeholder, not a working form.",
  "cuenta.empty.title": "Nothing here yet",
  "cuenta.sub": "Accounts and subscriptions, coming soon.",
  "cuenta.title": "My Account",
  "finanzas.charts.sub": "The same numbers as above, as charts: how revenue and costs moved across financial years, and which lines the club actually lives on.",
  "finanzas.charts.title": "Charts",
  "finanzas.debt.sub": "How much the club owes third parties (gross debt), how much cash it has on hand, and the difference between the two (net debt).",
  "finanzas.debt.title": "Debt",
  "finanzas.fmt.club": "Club's own format",
  "finanzas.fmt.simple": "Simplified format",
  "finanzas.pl.sub": "Revenue shows how much money came in and costs show how much went out over this financial year, category by category.",
  "finanzas.pl.title": "Income statement",
  "finanzas.sub": "A profit-and-loss style income statement.",
  "finanzas.title": "Finances",
  "finanzas.view.board": "By board",
  "finanzas.view.year": "Year by year",
  "footer.note": "MVP · placeholder data · test version",
  "footer.text": "This site does not represent any electoral list or candidacy. Its only goal is to make public data easy to reach, so every member can decide their vote for themselves.",
  "fuentes.about.text": "I am a Boca supporter. That is all. This site is anonymous on purpose: it does not represent any electoral list, candidacy, or the club leadership. What matters here is the data, not who collects it.",
  "fuentes.about.title": "About me",
  "fuentes.nivel.placeholder": "No source (placeholder)",
  "fuentes.nivel.primary": "Primary source",
  "fuentes.nivel.secondary_mirror": "Unofficial mirror",
  "fuentes.nivel.secondary_press": "Press coverage",
  "fx.detail.document_assumption": "Exchange rate the budget itself states as an assumption for a financial year that has not closed yet",
  "fx.detail.document_close": "Closing exchange rate the balance sheet itself states in its foreign-currency note",
  "fx.detail.market_approx": "The exact rate for that day was not available: it was interpolated, or a nearby date was used",
  "fx.detail.market_close": "The document states none: the official rate for the closing date was used (BCRA, BNA, PTAX, ECB, TRM)",
  "fx.detail.placeholder": "Not from any source: it exists only so the currency toggle works",
  "fx.detail.unknown": "Not verified yet where it came from",
  "fx.source.document_assumption": "Budget assumption",
  "fx.source.document_close": "Stated by the balance sheet",
  "fx.source.market_approx": "Approximate rate",
  "fx.source.market_close": "Official closing rate",
  "fx.source.placeholder": "Reference value",
  "fx.source.unknown": "Not determined",
  "fuentes.banner.ver": "The document and its caveats are under \"Sources\", at the end of this section.",
  "fuentes.card.all": "See every source on the site",
  "fuentes.card.doc": "Document",
  "fuentes.card.fx": "Exchange rate",
  "fuentes.card.fxBudget": "Budget exchange rate",
  "fuentes.card.level": "Source level",
  "fuentes.card.none": "This financial year has no official document loaded yet: the figures shown are a placeholder used to test the design, not the club's real numbers.",
  "fuentes.card.note": "Caveats",
  "fuentes.card.see": "see document",
  "fuentes.card.sub": "Where every number in this financial year comes from.",
  "fuentes.card.title": "Sources",
  "fuentes.club.none": "No document has been loaded for this club yet.",
  "fuentes.club.nourl": "no public URL",
  "fuentes.club.title": "Documents from",
  "fuentes.sub": "Every figure on this site cites its origin and date. Here is where each number of the club you are looking at comes from, plus the full list for the whole site.",
  "fuentes.title": "Sources",
  "header.club": "Choose a club",
  "header.contact": "Contact",
  "header.currency": "Currency: applies to Home and Finances",
  "header.lang": "Change language",
  "inicio.chart.debt": "Net debt by year",
  "inicio.chart.exp": "Costs by year",
  "inicio.chart.rev": "Revenue by year",
  "inicio.sub": "Look at your club's numbers. Revenue, costs, debt, transfers and results for each board, with the source and date for every figure.",
  "inicio.title": "Club data",
  "label.board": "Board:",
  "label.boardA": "Board A:",
  "label.boardB": "Board B:",
  "label.year": "Year:",
  "modal.cancel": "Cancel",
  "modal.email": "Email (optional)",
  "modal.message": "Message",
  "modal.name": "Name (optional)",
  "modal.send": "Send",
  "modal.sub": "Questions, suggestions or data to improve the site. You can stay anonymous.",
  "modal.title": "Contact",
  "nav.cuenta": "My Account",
  "nav.finanzas": "Finances",
  "nav.fuentes": "Sources",
  "nav.inicio": "Home",
  "pases.table.title": "Movements",
  "pases.title": "Transfers",
  "resultados.table.title": "Trophies and competitions by year",
  "resultados.title": "On-pitch results",
  "section.expenses": "Costs",
  "section.revenue": "Revenue",
  "site.name": "Finance of Sports",
  "site.title": "Finance of Sports | Club finances, straight from the source",
  "stat.extra": "Other",
  "stat.extra.tip": "Net interest and other adjustments that are neither operating revenue nor operating costs, but do feed into the net result",
  "stat.members": "Active members",
  "stat.netdebt": "Current net debt",
  "stat.netdebt.short": "Net debt",
  "stat.netspend": "Net transfer spend",
  "stat.netspend.tip": "Current board",
  "stat.nodata": "No data",
  "stat.pat": "Net result",
  "stat.result": "Latest result",
  "stat.result.tip": "Financial year",
  "th.amount": "Amount",
  "th.board": "Board",
  "th.competition": "Competition",
  "th.indicator": "Indicator",
  "th.line": "Line item",
  "th.movement": "Movement",
  "th.name": "Name",
  "th.provides": "What it provides",
  "th.result": "Result",
  "th.source": "Source",
  "th.type": "Type",
  "th.window": "Window",
  "th.year": "Year"
};
