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

// CAPA GENÉRICA. Las listas de arriba son las SUBCATEGORÍAS del fútbol: las que eligen el pipeline
// y la cola, y las que usa el motor. Cada una tiene además una categoría GENÉRICA, la misma para cualquier deporte, que NO se elige: se deriva
// de SPORT_TAXONOMIES. El JSON de cada club la guarda (`category`, con `subcategory` al lado) y tools/json-datos.mjs exige que el par coincida.
// `block` es la parte de la cascada del resultado (la misma de computeYearGeneric): revenue; operating (gasto en efectivo), non_cash
// (amortizaciones y depreciación), exceptional. Una subcategoría nueva necesita su genérica acá en la misma sesión (audit.js:
// taxonomia-incompleta).
const GENERIC_REVENUE_CATEGORIES = [
  { id: 'membership',              block: 'revenue', label: 'Cuotas sociales',                en: 'Membership' },
  { id: 'matchday',                block: 'revenue', label: 'Entradas',                       en: 'Matchday' },
  { id: 'season_tickets',          block: 'revenue', label: 'Abonos',                         en: 'Season tickets' },
  { id: 'venue',                   block: 'revenue', label: 'Estadio: uso fuera del partido', en: 'Venue (non-matchday)' },
  { id: 'media_rights',            block: 'revenue', label: 'Derechos de TV y medios',        en: 'Media rights' },
  { id: 'prize_money',             block: 'revenue', label: 'Premios por competencias',       en: 'Prize money' },
  { id: 'commercial',              block: 'revenue', label: 'Comercial / sponsors',           en: 'Commercial' },
  { id: 'player_transfers',        block: 'revenue', label: 'Venta de jugadores',             en: 'Player transfers' },
  { id: 'other_sporting_sections', block: 'revenue', label: 'Otras secciones deportivas',     en: 'Other sporting sections' },
  { id: 'non_sporting_activities', block: 'revenue', label: 'Actividades no deportivas',      en: 'Non-sporting activities' },
  { id: 'other_revenue',           block: 'revenue', label: 'Otros ingresos',                 en: 'Other revenue' },
  { id: 'undisclosed',             block: 'revenue', label: 'Sin desglosar por la fuente',    en: 'Not broken down by the source' },
];

const GENERIC_EXPENSE_CATEGORIES = [
  { id: 'first_team_staff',                  block: 'operating',   label: 'Salarios del plantel y cuerpo técnico', en: 'First-team staff' },
  { id: 'match_operations',                  block: 'operating',   label: 'Organización de partidos',              en: 'Match operations' },
  { id: 'other_sporting_sections',           block: 'operating',   label: 'Otras secciones deportivas',            en: 'Other sporting sections' },
  { id: 'non_sporting_activities',           block: 'operating',   label: 'Actividades no deportivas',             en: 'Non-sporting activities' },
  { id: 'admin_general',                     block: 'operating',   label: 'Administración y gastos generales',     en: 'Administration and overheads' },
  { id: 'other_operating_expenses',          block: 'operating',   label: 'Otros gastos',                          en: 'Other operating expenses' },
  { id: 'undisclosed',                       block: 'operating',   label: 'Sin desglosar por la fuente',           en: 'Not broken down by the source' },
  // Lleva también la compra de jugadores en efectivo de un club que no capitaliza (club-data-mapping, sección 1).
  { id: 'player_registrations_amortisation', block: 'non_cash',    label: 'Amortización de pases',                 en: 'Player registrations amortisation' },
  { id: 'player_registrations_impairment',   block: 'non_cash',    label: 'Deterioro de pases',                    en: 'Player registrations impairment' },
  { id: 'depreciation',                      block: 'non_cash',    label: 'Depreciación',                          en: 'Depreciation' },
  { id: 'other_amortisation',                block: 'non_cash',    label: 'Otras amortizaciones',                  en: 'Other amortisation' },
  { id: 'exceptional',                       block: 'exceptional', label: 'Ítems excepcionales',                   en: 'Exceptional items' },
];

// (deporte del sitio, lado, subcategoría) -> genérica. La clave es el id interno del deporte (data/leagues.js, SPORTS); `version` va a
// club.taxonomy del JSON y sube si cambia una genérica de una subcategoría ya cargada.
const SPORT_TAXONOMIES = {
  futbol: {
    version: 'football-1',
    revenue: {
      member_dues: 'membership', matchday_competition: 'matchday', season_tickets: 'season_tickets', stadium_other: 'venue',
      broadcasting: 'media_rights', competition_bonus: 'prize_money', sponsorship_commercial: 'commercial', player_sales: 'player_transfers',
      other_sports: 'other_sporting_sections', youth_football: 'other_sporting_sections', womens_football: 'other_sporting_sections',
      education: 'non_sporting_activities', other_income: 'other_revenue', lump_football_operations: 'undisclosed',
    },
    expense: {
      wages_squad: 'first_team_staff', match_organisation_expense: 'match_operations', youth_other_sports_expense: 'other_sporting_sections',
      education_expense: 'non_sporting_activities', admin_general_expense: 'admin_general', other_expenses: 'other_operating_expenses',
      lump_football_operations_expense: 'undisclosed', player_amortisation: 'player_registrations_amortisation',
      player_impairment: 'player_registrations_impairment', depreciation: 'depreciation', other_amortisation: 'other_amortisation',
      exceptional_items: 'exceptional',
    },
  },
};

// La genérica de una línea. Una subcategoría del OTRO lado (`exceptional_items` en una línea de ingreso, por ejemplo) va a la genérica
// catch-all de su lado, que es la fila donde ya se ve y se suma. null = la subcategoría no existe en el deporte.
const GENERIC_CATCH_ALL = { revenue: 'other_revenue', expense: 'other_operating_expenses' };
function genericCategoryOf(sport, side, sub) {
  const t = SPORT_TAXONOMIES[sport || 'futbol'];
  if (!t || !t[side]) return null;
  if (t[side][sub]) return t[side][sub];
  return t[side === 'revenue' ? 'expense' : 'revenue'][sub] ? GENERIC_CATCH_ALL[side] : null;
}

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
