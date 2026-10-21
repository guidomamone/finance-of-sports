// Las categorías compartidas (normalizedCategory) a las que se mapea cada línea de cada club; el nombre real del club queda en
// rawLabel. `lump_football_operations`: el bolsón para un monto real que la fuente no separó más (nunca se inventa cómo dividirlo).
// El criterio de cada categoría: skill club-data-mapping.

const REVENUE_CATEGORIES = [
  'member_dues',              // cuotas sociales / socios
  'season_tickets',           // abonos
  'matchday_competition', // recaudación de entradas (los premios van en competition_bonus)
  'stadium_other', // uso del estadio FUERA del partido: alquiler para eventos, concesiones, palcos. Comparte la fila "Estadio" con matchday_competition
  'broadcasting',             // televisación / derechos de TV
  'competition_bonus', // premios/bonos por avance de ronda o participación en un torneo
  'sponsorship_commercial',   // sponsors, merchandising, canjes
  'player_sales',             // ventas de jugadores (ingreso bruto)
  'other_sports',             // básquet, otros deportes
  'youth_football',           // fútbol juvenil / derechos de formación
  'womens_football',          // fútbol femenino
  'education', // colegio/escuela del club: aranceles y subsidios estatales a la educación (un negocio no futbolístico, con fila propia)
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
  // Las 3 de abajo desagregan "Otros gastos" cuando la fuente lo permite, para que el catch-all other_expenses absorba menos.
  'match_organisation_expense',     // costo de organizar partidos/participar en competencias (seguridad, viajes, concentración, AFA, tickets, etc.)
  'education_expense', // colegio/escuela del club: sueldos docentes, mantenimiento, servicios del área educativa (espejo de `education`)
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
  education_expense: 'Educación',
  youth_other_sports_expense: 'Otras secciones deportivas (juvenil, otros deportes, básquet)',
  admin_general_expense: 'Administración y gastos generales',
  other_expenses: 'Otros gastos',
  lump_football_operations_expense: 'Fútbol profesional (sin desglosar por la fuente)',
};

// Mapa de rubros reales -> categorías normalizadas de algunos clubes cargados a mano (referencia; las líneas de cada club ya traen su
// normalizedCategory en su data file).
const categoryMapByClub = {
  'boca-ar': {
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
