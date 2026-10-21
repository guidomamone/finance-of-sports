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
    cifra: { es: '94% de los clubes de las cinco primeras divisiones inglesas, con pérdida antes de impuestos en 2025/26 (datos reales y proyectados).', en: '94% of clubs in England’s top five divisions make a loss before tax in 2025/26 (actual and projected data).', fuente: 'IFR, State of the Game 2026', borrador: true },
    url: 'https://sotg.footballregulator.org.uk/api/media/file/IFR%20State%20of%20the%20Game%20Report.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'dfl-wirtschaftsreport-2425',
    titulo: 'DFL-Wirtschaftsreport 24/25',
    editor: 'DFL',
    anio: 2025,
    ambito: 'liga',
    ligas: ['de-bundesliga', 'de-2bundesliga'],
    cubre: { es: 'Bundesliga y 2. Bundesliga, agregado por liga y por grupos de clubes (sin balance por club).', en: 'Bundesliga and 2. Bundesliga, aggregated by league and club group (no club-by-club accounts).' },
    frase: { es: '¿Cuánto ingresan, gastan y ganan los clubes del fútbol profesional alemán, y qué patrimonio tienen?', en: 'How much do German professional clubs earn, spend and make, and what equity do they hold?' },
    cifra: { es: 'Bundesliga 2024/25: ganancia operativa récord de €242,1 M; 13 de 18 clubes con ganancia.', en: 'Bundesliga 2024/25: record operating profit of €242.1m; 13 of 18 clubs in profit.', fuente: 'DFL, Wirtschaftsreport 24/25', borrador: false },
    url: 'https://report.bundesliga.de/2425/de/_assets/downloads/key-economic-figures-dfl-er25.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'laliga-informe-economico-2425',
    titulo: 'Informe Económico Financiero 2024/25',
    editor: 'LaLiga',
    anio: 2026,
    ambito: 'liga',
    ligas: ['es-laliga', 'es-segunda'],
    cubre: { es: 'LaLiga EA Sports y LaLiga Hypermotion (42 clubes), agregado, con estados financieros agregados en anexo (sin balance por club).', en: 'LaLiga EA Sports and LaLiga Hypermotion (42 clubs), aggregated, with aggregated financial statements in an annex (no club-by-club accounts).' },
    frase: { es: '¿Cuánto ingresan los clubes de las dos categorías profesionales de España y qué resultado tienen?', en: 'How much do clubs in Spain’s two professional divisions earn and what result do they post?' },
    cifra: { es: 'LaLiga y Hypermotion 2024/25: ingresos totales normalizados de €5.464 M, +8,1%.', en: 'LaLiga and Hypermotion 2024/25: total normalised revenue of €5,464m, +8.1%.', fuente: 'LaLiga, Informe Económico Financiero 2024/25', borrador: false },
    url: 'https://assets.laliga.com/assets/2026/03/18/originals/5658090da03d3a5134540accdc341c89.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'reportcalcio-2025',
    titulo: 'ReportCalcio 2025',
    editor: 'FIGC · AREL · PwC',
    anio: 2025,
    ambito: 'liga',
    ligas: ['it-seriea', 'it-serieb', 'it-seriec'],
    cubre: { es: 'Fútbol italiano profesional (Serie A, B y C) agregado; el link es el resumen público de la 15.ª edición.', en: 'Italian professional football (Serie A, B and C) in aggregate; the link is the public summary of the 15th edition.' },
    frase: { es: '¿Cuánto pierde y cuánto debe el fútbol profesional italiano, y qué peso económico tiene en el país?', en: 'How much do Italian professional clubs lose and owe, and what is their weight in the economy?' },
    cifra: { es: 'Serie A, B y C: la pérdida agregada bajó de €1.400 M (2021/22) a €731 M (2023/24).', en: 'Serie A, B and C: aggregate loss fell from €1.4bn (2021/22) to €731m (2023/24).', fuente: 'FIGC, ReportCalcio 2025', borrador: false },
    url: 'https://www.figc.it/media/277126/report-calcio-2025.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'ey-clubes-brasileiros-2025',
    titulo: 'Levantamento Financeiro Clubes Brasileiros 2025',
    editor: 'EY',
    anio: 2026,
    ambito: 'liga',
    ligas: ['br-serieA'],
    cubre: { es: 'Los clubes de la Série A de 2025, a partir de sus estados financieros publicados: ingresos, costos y endeudamiento.', en: 'The 2025 Série A clubs, from their published financial statements: revenue, costs and debt.' },
    frase: { es: '¿Cuánto ingresan, gastan y deben los clubes del Brasileirão?', en: 'How much do Brasileirão clubs earn, spend and owe?' },
    cifra: { es: 'Série A 2025: ingresos totales de R$ 14.900 M, +33% contra 2024.', en: 'Série A 2025: total revenue of R$ 14.9bn, +33% vs. 2024.', fuente: 'EY, Levantamento Financeiro 2025', borrador: false },
    url: 'https://www.ey.com/content/dam/ey-unified-site/ey-com/pt-br/insights/media-entertainment/documents/ey-brasil-relatorio-financeiro-clubes-2025.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'toppfotballbarometeret-2026',
    titulo: 'Toppfotballbarometeret 2026',
    editor: 'Norsk Toppfotball · Deloitte',
    anio: 2026,
    ambito: 'liga',
    ligas: ['no-eliteserien', 'no-1divisjon'],
    cubre: { es: 'Eliteserien, OBOS-ligaen (1. divisjon) y Toppserien según el reporte de licencia de cada club, con página por club en los capítulos de cada liga.', en: 'Eliteserien, OBOS-ligaen (1. divisjon) and Toppserien from each club’s licence reporting, with a page per club in each league chapter.' },
    frase: { es: '¿Cuánto ingresan y gastan los clubes noruegos y en qué se les va la plata?', en: 'How much do Norwegian clubs earn and spend, and where does the money go?' },
    cifra: { es: 'Eliteserien 2025: ingresos de NOK 2.711 M (+25%) contra costos de NOK 3.036 M.', en: 'Eliteserien 2025: revenue of NOK 2,711m (+25%) against costs of NOK 3,036m.', fuente: 'Norsk Toppfotball y Deloitte, Toppfotballbarometeret 2026', borrador: false },
    url: 'https://toppfotball.no/nyheter/okte-inntekter-og-forbedret-robusthet-i-norske-toppfotballklubber/_/attachment/inline/a9fe0e41-9955-4689-a989-99534568542a:424f9da6da9d2b43ff79de08e3357a46a5c9afb2/TFB%202026_Hovedfunn.pdf',
    urlTipo: 'pdf'
  },
  {
    id: 'supersociedades-futbol-2025',
    titulo: 'Comportamiento financiero del fútbol profesional colombiano 2025',
    editor: 'Superintendencia de Sociedades',
    anio: 2026,
    ambito: 'liga',
    ligas: ['co-primeraA', 'co-primeraB'],
    cubre: { es: 'Clubes del fútbol profesional colombiano constituidos como sociedades anónimas, con corte al 31-dic-2025; tablero interactivo.', en: 'Colombian professional clubs incorporated as limited companies, as of 31 Dec 2025; interactive dashboard.' },
    frase: { es: '¿Cómo les fue a los clubes colombianos: ingresos, activos y de dónde sale la plata?', en: 'How did Colombian clubs do: revenue, assets and where the money comes from?' },
    cifra: { es: 'Fútbol masculino 2025: ingresos operacionales +16,6% y activos de $925 mil millones (+7,7%).', en: 'Men’s football 2025: operating revenue +16.6% and assets of COP 925bn (+7.7%).', fuente: 'Supersociedades, informe 2025', borrador: false },
    url: 'https://www.supersociedades.gov.co/noticias-supersociedades/-/asset_publisher/atwl/content/los-clubes-del-f%C3%BAtbol-profesional-colombiano-fortalecieron-su-desempe%C3%B1o-financiero-durante-2025',
    urlTipo: 'pagina'
  },
  {
    id: 'jleague-season-review-2025',
    titulo: 'Season Review 2025: Club Licensing and Revenue',
    editor: 'J.League',
    anio: 2025,
    ambito: 'liga',
    ligas: ['jp-j1'],
    cubre: { es: 'Los 60 clubes de J1, J2 y J3: ingresos operativos del año fiscal 2024 y proyección 2025, agregado.', en: 'The 60 clubs of J1, J2 and J3: FY2024 operating revenue and 2025 projection, aggregated.' },
    frase: { es: '¿Cuánto facturan los clubes de la J.League y cómo evolucionan sus ingresos?', en: 'How much do J.League clubs bring in and how is their revenue trending?' },
    cifra: { es: 'J.League, año fiscal 2024: ingresos operativos de ¥172.500 M (60 clubes), +14%.', en: 'J.League, FY2024: operating revenue of ¥172.5bn (60 clubs), +14%.', fuente: 'J.League, Season Review 2025', borrador: false },
    url: 'https://aboutj.jleague.jp/seasonreview2025/en/management/m_2/',
    urlTipo: 'pagina'
  }
];
