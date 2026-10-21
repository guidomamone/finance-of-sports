// Informes agregados del fútbol que el sitio linkea desde Ligas («Informes de esta liga»). Es una lista de lectura, no de datos: ningún
// número de acá entra en un ranking ni en un total. Una entrada por informe y edición; se revisa cuando sale una edición nueva.
// - ambito: 'europa' = cubre varias ligas europeas (va arriba en toda liga de Europa); 'liga' = solo las de `ligas`.
// - cifra: una sola, con su fuente y el año; `borrador: true` si el informe todavía no es el final (la tarjeta lo marca).
// - url: el PDF original, o la página oficial del informe cuando el PDF no tiene link directo. No se aloja nada.
// Los textos que van a la pantalla llevan {es, en}; títulos y editores son nombres propios y no se traducen.
window.INFORMES = [
  {
    id: 'uefa-ecfil-2025',
    titulo: 'The European Club Finance and Investment Landscape 2025',
    editor: 'UEFA',
    anio: 2025,
    ambito: 'europa',
    cubre: { es: 'Las primeras divisiones de Europa, agregado por liga y rubro (sin balance por club).', en: 'Top divisions across Europe, aggregated by league and line item (no club-by-club accounts).' },
    frase: { es: '¿Cuánto ingresan, gastan, ganan y deben los clubes europeos, y quién invierte en ellos?', en: 'How much do European clubs earn, spend, make and owe, and who invests in them?' },
    cifra: { es: 'Los ingresos de las primeras divisiones europeas pasan los €30.000 M en 2025.', en: 'Top-division revenues in Europe pass €30bn in 2025.', fuente: 'UEFA, ECFIL 2025', borrador: false },
    url: 'https://ecfil.uefa.com/2025',
    urlTipo: 'pagina'
  },
  {
    id: 'deloitte-arff-2026',
    titulo: 'Annual Review of Football Finance 2026',
    editor: 'Deloitte',
    anio: 2026,
    ambito: 'liga',
    ligas: ['gb-premierleague', 'gb-championship', 'gb-leagueone', 'gb-leaguetwo'],
    cubre: { es: 'Fútbol inglés por club (Premier y Championship) y total de League One y League Two; un capítulo sobre las cinco grandes de Europa.', en: 'English football by club (Premier League and Championship) and totals for League One and League Two; one chapter on Europe’s big five.' },
    frase: { es: '¿Cuánto ganaron y perdieron los clubes ingleses, qué pesan los sueldos y cuánta deuda hay?', en: 'How much did English clubs make and lose, what do wages weigh and how much debt is there?' },
    cifra: { es: 'Premier League 2024/25: pérdida antes de impuestos de £948 M.', en: 'Premier League 2024/25: loss before tax of £948m.', fuente: 'Deloitte, ARFF 2026', borrador: false },
    url: 'https://www.deloitte.com/content/dam/assets-shared/docs/industries/financial-services/2026/deloitte-annual-review-of-football-finance-2026.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'ifr-state-of-the-game-2026',
    titulo: 'State of the Game 2026',
    editor: 'Independent Football Regulator',
    anio: 2026,
    ambito: 'liga',
    ligas: ['gb-premierleague', 'gb-championship', 'gb-leagueone', 'gb-leaguetwo'],
    cubre: { es: 'Las cinco divisiones de hombres de Inglaterra, agregado por división (sin balance por club). Borrador en consulta.', en: 'England’s five men’s divisions, aggregated by division (no club-by-club accounts). Draft under consultation.' },
    frase: { es: '¿Qué tan sana es la economía del fútbol inglés y dónde están los riesgos de todo el sistema?', en: 'How healthy is English football’s economy and where are the system-wide risks?' },
    cifra: { es: '94% de los clubes con pérdida en 2025/26 (datos reales y proyectados).', en: '94% of clubs make a loss in 2025/26 (actual and projected data).', fuente: 'IFR, State of the Game 2026', borrador: true },
    url: 'https://sotg.footballregulator.org.uk/api/media/file/IFR%20State%20of%20the%20Game%20Report.pdf',
    urlTipo: 'pdf'
  }
];
