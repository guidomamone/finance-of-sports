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
  'education', // colegio/escuela del club: aranceles y subsidios estatales a la educación (un negocio no futbolístico; comparte fila con las otras secciones)
  'grants_donations', // subsidio público de explotación, donación o aporte de socios o accionistas impreso como ingreso (no: la subvención de capital imputada al resultado, los premios y la solidaridad UEFA o de la liga, el subsidio de la educación, un aporte que el documento lleva al patrimonio neto)
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
  grants_donations: 'Subsidios, donaciones y aportes',
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
  { id: 'grants_donations',        block: 'revenue', label: 'Subsidios, donaciones y aportes', en: 'Grants, donations and contributions' },
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

// Las SUBCATEGORÍAS del rugby (union), mismo formato que las del fútbol de arriba: la lista con la descripción en el comentario de cada una
// (la leen Jev y Claude para categorizar) y los rótulos. Un rubro del club que no encaja va a other_income / other_expenses.
const RUGBY_REVENUE_CATEGORIES = [
  'central_income',           // lo que reparten la liga (Premiership Rugby: TV y comercial central) y la federación (RFU: desarrollo de jugadores y selección). El ingreso de un fondo que compró parte de la liga (CVC) no: va a other_income.
  'gate_receipts',            // recaudación de entradas de los partidos, con los abonos cuando el documento no los separa.
  'season_tickets',           // abonos de temporada, solo si el documento da su importe aparte de las entradas.
  'commercial_activities',    // sponsors, publicidad, hospitalidad, comida y bebida del estadio, merchandising y eventos en el estadio o el centro de entrenamiento.
  'player_transfers',         // cobros por el traspaso o la rescisión del contrato de un jugador (ingreso bruto).
  'academy_community',        // academia, rugby juvenil y femenino, programas comunitarios y escuelas.
  'other_income',             // todo lo demás: subsidios, ingresos varios, el ingreso por el acuerdo de CVC, la revaluación (fair value) de una participación.
  'lump_rugby_operations',    // bolsón: un monto real de ingresos que la fuente no separa por tipo (nunca se inventa cómo dividirlo).
];
const RUGBY_REVENUE_CATEGORY_LABELS = {
  central_income: 'Reparto central (liga y federación)',
  gate_receipts: 'Entradas',
  season_tickets: 'Abonos',
  commercial_activities: 'Comercial',
  player_transfers: 'Transferencias de jugadores',
  academy_community: 'Academia y comunidad',
  other_income: 'Otros ingresos',
  lump_rugby_operations: 'Rugby profesional (sin desglosar por la fuente)',
};
const RUGBY_EXPENSE_CATEGORIES = [
  'squad_wages',                       // sueldos, cargas sociales y pensiones de jugadores y cuerpo técnico; si la nota de personal no los separa del resto del personal, el total.
  'matchday_costs',                    // costo de jugar los partidos: seguridad, viajes, alojamiento, arbitraje y operación del día de partido.
  'academy_community_expense',         // academia, juveniles, rugby femenino y programas comunitarios (espejo de academy_community).
  'admin_general_expense',             // administración, comercial, mantenimiento del estadio, impuestos y seguros (costos no deportivos).
  'other_expenses',                    // partidas sueltas sin otra categoría.
  'lump_rugby_operations_expense',     // bolsón: un monto real de gastos que la fuente no separa por tipo (Cost of sales + Administrative expenses menos lo que sí se abre).
  'player_registrations_amortisation', // amortización del registro de jugadores adquiridos, o su costo si el club no lo capitaliza.
  'depreciation',                      // depreciación de bienes de uso tangibles.
  'other_amortisation',                // amortización de intangibles que no son jugadores.
  'exceptional_items',                 // cargos extraordinarios o no recurrentes que el documento muestra aparte.
];
const RUGBY_EXPENSE_CATEGORY_LABELS = {
  squad_wages: 'Salarios del plantel y cuerpo técnico',
  matchday_costs: 'Organización de partidos',
  academy_community_expense: 'Academia y comunidad',
  admin_general_expense: 'Administración y gastos generales',
  other_expenses: 'Otros gastos',
  lump_rugby_operations_expense: 'Rugby profesional (sin desglosar por la fuente)',
  player_registrations_amortisation: 'Amortización de registros de jugadores',
  depreciation: 'Depreciación',
  other_amortisation: 'Otras amortizaciones',
  exceptional_items: 'Ítems excepcionales',
};

// (deporte del sitio, lado, subcategoría) -> genérica. La clave es el id interno del deporte (data/leagues.js, SPORTS); `version` va a
// club.taxonomy del JSON y sube si cambia una genérica de una subcategoría ya cargada. `lists` nombra las listas de subcategorías del deporte
// (con su descripción en el comentario) y sus rótulos; `lump`, el bolsón sin desglosar de cada lado.
const SPORT_TAXONOMIES = {
  futbol: {
    version: 'football-1',
    lists: { revenue: ['REVENUE_CATEGORIES', 'REVENUE_CATEGORY_LABELS'], expense: ['EXPENSE_CATEGORIES', 'EXPENSE_CATEGORY_LABELS'] },
    lump: { revenue: 'lump_football_operations', expense: 'lump_football_operations_expense' },
    revenue: {
      member_dues: 'membership', matchday_competition: 'matchday', season_tickets: 'season_tickets', stadium_other: 'venue',
      broadcasting: 'media_rights', competition_bonus: 'prize_money', sponsorship_commercial: 'commercial', player_sales: 'player_transfers',
      other_sports: 'other_sporting_sections', youth_football: 'other_sporting_sections', womens_football: 'other_sporting_sections',
      education: 'non_sporting_activities', grants_donations: 'grants_donations', other_income: 'other_revenue', lump_football_operations: 'undisclosed',
    },
    expense: {
      wages_squad: 'first_team_staff', match_organisation_expense: 'match_operations', youth_other_sports_expense: 'other_sporting_sections',
      education_expense: 'non_sporting_activities', admin_general_expense: 'admin_general', other_expenses: 'other_operating_expenses',
      lump_football_operations_expense: 'undisclosed', player_amortisation: 'player_registrations_amortisation',
      player_impairment: 'player_registrations_impairment', depreciation: 'depreciation', other_amortisation: 'other_amortisation',
      exceptional_items: 'exceptional',
    },
  },
  rugby: {
    version: 'rugby-1',
    lists: { revenue: ['RUGBY_REVENUE_CATEGORIES', 'RUGBY_REVENUE_CATEGORY_LABELS'], expense: ['RUGBY_EXPENSE_CATEGORIES', 'RUGBY_EXPENSE_CATEGORY_LABELS'] },
    lump: { revenue: 'lump_rugby_operations', expense: 'lump_rugby_operations_expense' },
    revenue: {
      central_income: 'media_rights', gate_receipts: 'matchday', season_tickets: 'season_tickets', commercial_activities: 'commercial',
      player_transfers: 'player_transfers', academy_community: 'other_sporting_sections', other_income: 'other_revenue', lump_rugby_operations: 'undisclosed',
    },
    expense: {
      squad_wages: 'first_team_staff', matchday_costs: 'match_operations', academy_community_expense: 'other_sporting_sections',
      admin_general_expense: 'admin_general', other_expenses: 'other_operating_expenses', lump_rugby_operations_expense: 'undisclosed',
      player_registrations_amortisation: 'player_registrations_amortisation', depreciation: 'depreciation', other_amortisation: 'other_amortisation',
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
