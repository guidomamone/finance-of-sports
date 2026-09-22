// ============================================================================
// data/category-map.js — la "tabla de traducción" que normaliza las
// categorías de ingresos/gastos de cada club a un vocabulario compartido,
// sin borrar el nombre real que usa cada club (eso se guarda aparte, en
// rawLabel, junto a cada número).
//
// Por qué existe: Boca reporta 9 rubros de ingresos bien separados. Racing
// reporta básicamente 2 (todo "fútbol profesional" junto, más "cuotas
// sociales"). Forzar los datos de Racing dentro de las 9 cajas de Boca
// implicaría inventar cómo se divide ese número — por eso existe la
// categoría de "bolsón sin desglosar" (lump_football_operations): un lugar
// honesto para un monto real que el club/la prensa no separó más.
// ============================================================================

const REVENUE_CATEGORIES = [
  'member_dues',              // cuotas sociales / socios
  'season_tickets',           // abonos
  'matchday_competition',     // recaudación de entradas (Versión 46: ya NO incluye premios, ver competition_bonus)
  'stadium_other',            // uso del estadio FUERA del partido: alquiler para recitales/eventos, concesiones del estadio, licitación de palcos (Versión 189). NO es recaudación: comparte la fila "Estadio" de Formato simplificado con matchday_competition y season_tickets, pero se guarda aparte para no decir que un alquiler de recital fue venta de entradas — y para que el día que "Estadio" se vuelva a partir en filas, la distinción siga estando en el dato.
  'broadcasting',             // televisación / derechos de TV
  'competition_bonus',        // premios/bonos por avance de ronda o participación en un torneo (Versión 46, separado de matchday_competition para poder igualar la fila "Premios por competencias" que ya usa Boca)
  'sponsorship_commercial',   // sponsors, merchandising, canjes
  'player_sales',             // ventas de jugadores (ingreso bruto)
  'other_sports',             // básquet, otros deportes
  'youth_football',           // fútbol juvenil / derechos de formación
  'womens_football',          // fútbol femenino
  'education',                // colegio/escuela del club: aranceles de enseñanza y subsidios estatales a la educación (Versión 189). Es un negocio no futbolístico con fila propia — hasta la 188 caía al catch-all y era, por ejemplo, el 20% de los ingresos de Vélez sin aparecer en ninguna fila. NO incluye escuelas/academias de fútbol (eso es youth_football) ni departamentos de educación física (eso es other_sports).
  'other_income',             // diversos, intereses ganados, partidas sueltas
  'lump_football_operations', // bolsón sin desglosar (ver nota arriba)
];

const REVENUE_CATEGORY_LABELS = {
  member_dues: 'Cuotas sociales',
  season_tickets: 'Abonos',
  matchday_competition: 'Recaudación de entradas',
  stadium_other: 'Estadio: uso y alquiler',
  broadcasting: 'Televisación / derechos de TV',
  competition_bonus: 'Premios por competencias',
  sponsorship_commercial: 'Comercial / sponsors',
  player_sales: 'Ventas de jugadores',
  other_sports: 'Otros deportes',
  youth_football: 'Fútbol juvenil',
  womens_football: 'Fútbol femenino',
  education: 'Educación',
  other_income: 'Otros ingresos',
  lump_football_operations: 'Fútbol profesional (sin desglosar por la fuente)',
};

const EXPENSE_CATEGORIES = [
  'wages_squad',
  'player_amortisation',
  'player_impairment',
  'depreciation',
  'other_amortisation',
  'exceptional_items',
  // Versión 53: las 3 categorías de abajo son el equivalente-gasto de la fila "Otros gastos"
  // desagregada, siguiendo el mismo criterio que ya usa Boca en su Ejercicio 2027 (ver
  // otrosGastos2027 en js/finanzas-calc.js y GENERIC_SIMPLIFIED_EXPENSE_BUCKETS): reducen cuánto
  // cae en el catch-all genérico `other_expenses` para un club/año que sí tiene el desglose
  // disponible en la fuente.
  'match_organisation_expense',     // costo de organizar partidos/participar en competencias (seguridad, viajes, concentración, AFA, tickets, etc.)
  'youth_other_sports_expense',     // fútbol juvenil, femenino, otros deportes, básquet, actividades sociales (todo lo que no es el plantel profesional)
  'admin_general_expense',          // administración, gastos generales, comerciales, impuestos, mantenimiento de sede/estadio (costos NO deportivos)
  'other_expenses',
  'lump_football_operations_expense', // mismo concepto que arriba, para gastos
];

const EXPENSE_CATEGORY_LABELS = {
  wages_squad: 'Salarios del plantel',
  player_amortisation: 'Amortización de pases',
  player_impairment: 'Deterioro de pases',
  depreciation: 'Depreciación',
  other_amortisation: 'Otras amortizaciones',
  exceptional_items: 'Ítems excepcionales',
  match_organisation_expense: 'Organización de partidos',
  youth_other_sports_expense: 'Otras secciones deportivas (juvenil, otros deportes, básquet)',
  admin_general_expense: 'Administración y gastos generales',
  other_expenses: 'Otros gastos',
  lump_football_operations_expense: 'Fútbol profesional (sin desglosar por la fuente)',
};

// Mapa de categorías reales -> normalizadas, por club. Esto es lo que se
// edita si mañana Boca cambia cómo nombra un rubro, o si se agrega otro
// club: una fila acá, no tocar la lógica de cálculo del sitio.
// Nota: el motor de Finanzas del sitio hoy sólo usa este mapa como
// referencia/documentación para Boca (Boca sigue con su código original,
// ya verificado). River y Racing sí lo usan en vivo — ver data/river-data.js
// y data/racing-data.js.
const categoryMapByClub = {
  boca: {
    revenue: {
      cuotasSociales: 'member_dues',
      comerciales: 'sponsorship_commercial',
      exhibicionEspectaculos: 'matchday_competition',
      abonos: 'season_tickets',
      diversos: 'other_income',
      otrosDeportes: 'other_sports',
      basketProfesional: 'other_sports',
      futbolJuvenil: 'youth_football',
      futbolFemenino: 'womens_football',
    },
    expense: {
      wages: 'wages_squad',
      otherExpenses: 'other_expenses',
      exceptionalItems: 'exceptional_items',
      playerAmortisation: 'player_amortisation',
      playerImpairment: 'player_impairment',
      depreciation: 'depreciation',
      otherAmortisation: 'other_amortisation',
    },
  },
};
