// ============================================================================
// data/estudianteslp-data.js — Club Estudiantes de La Plata: 9no club del motor genérico. 4
// ejercicios consecutivos cargados: 2022, 2023, 2024, 2025 (30/6 de cada año), todos balances
// auditados reales, texto nativo (Becher y Asociados S.R.L.). PDF + transcripción en
// Clubes/Argentina/Estudiantes LP/memoria-y-balance-{2021-2022,2022-2023,2023-2024,2024-2025}.
// {pdf,md}. El 4to (2024-2025) es un escaneo sin capa de texto (127 páginas) — transcripto vía OCR
// (Tesseract, 300dpi); a diferencia de otros clubes esta sesión, sus 2 Anexos clave (Recursos-
// Resultados por Sectores / Gastos) resultaron ser tablas grandes pero NÍTIDAS en el escaneo — se
// verificaron visualmente contra la imagen renderizada (no solo el texto OCR crudo, que salía
// bastante ruidoso en esta tabla en particular) antes de cargar.
//
// 2025 — Estructura NUEVA respecto a 2022-2024: el eje de fútbol ahora tiene "Fútbol - Plantel
// profesional" como columna SEPARADA (antes esa economía de pases vivía dentro de "Fútbol -
// Exhibición y espectáculos") — el club separó explícitamente transferencias/pases de la operación
// de partidos este ejercicio. Se cargó con el mismo criterio de siempre: cada rubro por su
// NATURALEZA (no por la columna de departamento en la que aparece), "Sueldos y jornales"/"Cargas
// sociales" son los únicos 2 rubros que sí se reparten por columna (Fútbol - Exhibición y
// espectáculos → wages_squad, resto de columnas sumadas → youth_other_sports_expense). DÉFICIT
// real: $(14.277.112.789) ARS — primer déficit del club en los 4 ejercicios cargados.
//
// Estructura (Anexo V "Recursos-Resultados por Sectores" / Anexo VI "Gastos"): igual mecanismo de
// columna-por-sector que Vélez/Instituto/Rosario Central, pero acá el eje de fútbol se separa en
// "Fútbol - Plantel profesional" (economía de pases: transferencias, revaluación de jugadores,
// amortización acelerada) vs. "Fútbol - Exhibición y espectáculos" (operación de partidos: sueldos,
// TV, publicidad, entradas) — DISTINTO de Vélez/Instituto, que usan una sola columna "Fútbol
// Profesional" para todo. Para "Sueldos y jornales"/"Cargas sociales" se usó la columna "Fútbol -
// Exhibición y espectáculos" como wages_squad (es la que de verdad tiene personal del plantel/cuerpo
// técnico) y el resto de columnas como youth_other_sports_expense, mismo criterio de fondo que los
// demás clubes aunque la columna de referencia tenga otro nombre.
//
// A partir de 2023 aparece una 7ma columna "Estadio" (separada de "Fútbol - Exhibición y
// espectáculos", donde vivía en 2022) — la fuente de cada ejercicio ya trae esa separación (o no)
// por su cuenta, no se fuerza a que los 3 años tengan las mismas columnas.
//
// "OTROS INGRESOS Y EGRESOS" (Nota 3.7 de cada ejercicio: Indemnizaciones y juicios, Licitaciones de
// palco, Recuperos de cargas sociales Dto 1212, etc.) se cargó como líneas de revenue/expense
// normales (other_income/other_expenses), NO como parte de RECPAM/netInterest — el propio documento
// los separa de "RESULTADOS FINANCIEROS Y POR TENENCIA" (que SÍ va a netInterest).
//
// "Resultado por revaluación de jugadores" y "Gastos por transferencias y préstamos jugadores"/
// "Amortización acelerada por libertad de acción" van a `player_sales`/`player_amortisation`
// respectivamente (economía de pases, columna "Fútbol - Plantel profesional").
//
// grossDebt = "Deudas" (Nota 3.5) corriente+no corriente, EXCLUYENDO "Fondos específicos" y
// "Previsiones" — mismo criterio que Boca/Vélez/Instituto. cash = Caja y bancos.
//
// FX: cada balance declara su propio Anexo IV con DOS cotizaciones de USD (Activo vs. Pasivo,
// diferencia de centavos) — se usó siempre la del lado Activo/Caja (coherente con `cash`), mismo
// criterio que Rosario Central: $125,030 (2022), $256,30 (2023), $909,00 (2024 — mismo valor que
// declararon Racing/Vélez/Instituto para la misma fecha de cierre), $1.196 (2025).
//
// Gestión: Martín Gorostegui (presidente marzo-2021 a abril-2024) cubre 2022 y 2023 con confianza.
// El balance 2024 (cierre 30/6/2024) está FIRMADO por Juan Sebastián Verón, proclamado presidente el
// 6/4/2024 — o sea, asumió ~3 meses antes del cierre de este ejercicio. DUDA ABIERTA (ver
// dudas-por-club.md): Gorostegui presidió la gran mayoría de este ejercicio (jul-2023 a abr-2024),
// pero es Verón quien firma el balance como Presidente — se cargó gestionId:'veron' (criterio de
// "quien está a cargo al momento del cierre/firma", mismo usado para Berlanga/Belloso cuando asumen
// a mitad de ejercicio), pero la mayoría de los meses del ejercicio fueron de Gorostegui, vale
// confirmar el criterio con Guido. 2025 (Ejercicio completo bajo Verón, sin ambigüedad) también
// gestionId:'veron'.
// ============================================================================

const estudiantesLPRevenueLinesByYear = {
  2022: [
    { rawLabel:'Transferencias y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:956.625854, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:756.244108, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos internacionales', normalizedCategory:'competition_bonus', amountNative:744.663742, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:587.976172, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:437.584455, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas colegio', normalizedCategory:'education', amountNative:249.808934, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:151.662867, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles deportivos y recreativos', normalizedCategory:'other_sports', amountNative:147.605277, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por subvención provincial', normalizedCategory:'other_income', amountNative:86.637846, disclosureLevel:'detailed' },
    { rawLabel:'Abonos a plateas', normalizedCategory:'season_tickets', amountNative:84.814570, disclosureLevel:'detailed' },
    { rawLabel:'Recursos fútbol infantil/amateur', normalizedCategory:'youth_football', amountNative:25.072719, disclosureLevel:'detailed' },
    { rawLabel:'Colonia de vacaciones', normalizedCategory:'other_sports', amountNative:16.333259, disclosureLevel:'detailed' },
    { rawLabel:'Subvenciones a la explotación', normalizedCategory:'other_income', amountNative:9.690346, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por temporada de verano', normalizedCategory:'other_sports', amountNative:6.819750, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos nacionales', normalizedCategory:'competition_bonus', amountNative:2.644952, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos de cargas sociales Dto 1212', normalizedCategory:'other_income', amountNative:68.756627, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Transferencias y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:419.096447, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:932.721572, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:1750.947647, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas colegio', normalizedCategory:'education', amountNative:526.665093, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles deportivos y recreativos', normalizedCategory:'other_sports', amountNative:303.085543, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:203.502078, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por subvención provincial', normalizedCategory:'other_income', amountNative:184.271364, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:954.851714, disclosureLevel:'detailed' },
    { rawLabel:'Recursos fútbol infantil/amateur', normalizedCategory:'youth_football', amountNative:59.508880, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por temporada de verano', normalizedCategory:'other_sports', amountNative:25.452195, disclosureLevel:'detailed' },
    { rawLabel:'Colonia de vacaciones', normalizedCategory:'other_sports', amountNative:42.957615, disclosureLevel:'detailed' },
    { rawLabel:'Abonos a plateas', normalizedCategory:'season_tickets', amountNative:295.434548, disclosureLevel:'detailed' },
    { rawLabel:'Resarcimiento por rescisión de contratos', normalizedCategory:'other_income', amountNative:0.005287, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos nacionales', normalizedCategory:'competition_bonus', amountNative:5.695584, disclosureLevel:'detailed' },
    { rawLabel:'Subvenciones a la explotación', normalizedCategory:'other_income', amountNative:22.379121, disclosureLevel:'detailed' },
    { rawLabel:'Resultado por revaluación de jugadores', normalizedCategory:'player_sales', amountNative:291.226786, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos internacionales', normalizedCategory:'competition_bonus', amountNative:1386.950250, disclosureLevel:'detailed' },
    { rawLabel:'Licitaciones de palco', normalizedCategory:'stadium_other', amountNative:9.148760, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos de cargas sociales Dto 1212', normalizedCategory:'other_income', amountNative:236.542911, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Transferencias y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:20177.210830, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:5965.397318, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos internacionales', normalizedCategory:'competition_bonus', amountNative:5528.364085, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:5410.733442, disclosureLevel:'detailed' },
    { rawLabel:'Resultado por revaluación de jugadores', normalizedCategory:'player_sales', amountNative:4052.863235, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:2983.862729, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas colegio', normalizedCategory:'education', amountNative:1387.863255, disclosureLevel:'detailed' },
    { rawLabel:'Abonos a plateas', normalizedCategory:'season_tickets', amountNative:1119.900205, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles deportivos y recreativos', normalizedCategory:'other_sports', amountNative:1002.218944, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:641.959977, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por subvención provincial', normalizedCategory:'other_income', amountNative:608.276048, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos nacionales', normalizedCategory:'competition_bonus', amountNative:292.389415, disclosureLevel:'detailed' },
    { rawLabel:'Recursos fútbol infantil/amateur', normalizedCategory:'youth_football', amountNative:195.536742, disclosureLevel:'detailed' },
    { rawLabel:'Colonia de vacaciones', normalizedCategory:'other_sports', amountNative:152.193791, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por temporada de verano', normalizedCategory:'other_sports', amountNative:68.693469, disclosureLevel:'detailed' },
    { rawLabel:'Subvenciones a la explotación', normalizedCategory:'other_income', amountNative:60.588771, disclosureLevel:'detailed' },
    { rawLabel:'Licitaciones de palco', normalizedCategory:'stadium_other', amountNative:9.707725, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos de cargas sociales Dto 1212', normalizedCategory:'other_income', amountNative:172.145497, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Transferencias y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:15047.007896, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales', normalizedCategory:'member_dues', amountNative:11204.094875, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_income', amountNative:8467.914089, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos internacionales', normalizedCategory:'competition_bonus', amountNative:7347.724761, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:6123.550259, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas colegio', normalizedCategory:'education', amountNative:2141.150911, disclosureLevel:'detailed' },
    { rawLabel:'Abonos a plateas', normalizedCategory:'season_tickets', amountNative:1971.109249, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles deportivos y recreativos', normalizedCategory:'other_sports', amountNative:1500.756697, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1061.054904, disclosureLevel:'detailed' },
    { rawLabel:'Participación en campeonatos nacionales', normalizedCategory:'competition_bonus', amountNative:958.849774, disclosureLevel:'detailed' },
    { rawLabel:'Recursos marketing', normalizedCategory:'sponsorship_commercial', amountNative:882.744685, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por subvención provincial', normalizedCategory:'other_income', amountNative:753.533291, disclosureLevel:'detailed' },
    { rawLabel:'Colonia de vacaciones', normalizedCategory:'other_sports', amountNative:251.677071, disclosureLevel:'detailed' },
    { rawLabel:'Recursos fútbol infantil/amateur', normalizedCategory:'youth_football', amountNative:217.990839, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por temporada de verano', normalizedCategory:'other_sports', amountNative:106.711574, disclosureLevel:'detailed' },
    { rawLabel:'Subvenciones a la explotación', normalizedCategory:'other_income', amountNative:77.052581, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos y egresos', normalizedCategory:'other_income', amountNative:1404.273084, disclosureLevel:'detailed' },
  ],
};

const estudiantesLPExpenseLinesByYear = {
  2022: [
    { rawLabel:'Sueldos y jornales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-659.860990, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y jornales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-677.104281, disclosureLevel:'detailed' },
    { rawLabel:'Salario complementario DNU 332/20 y REPRO (Fútbol - Exhibición)', normalizedCategory:'wages_squad', amountNative:10.817976, disclosureLevel:'detailed' },
    { rawLabel:'Salario complementario DNU 332/20 y REPRO (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:21.630126, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por transferencias y préstamos jugadores', normalizedCategory:'player_amortisation', amountNative:-434.068466, disclosureLevel:'detailed' },
    { rawLabel:'Amortización acelerada por libertad de acción', normalizedCategory:'player_amortisation', amountNative:-428.885403, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-364.350711, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y premios', normalizedCategory:'match_organisation_expense', amountNative:-352.503491, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos internacionales', normalizedCategory:'match_organisation_expense', amountNative:-233.409423, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-75.742867, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-153.323695, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos nacionales', normalizedCategory:'match_organisation_expense', amountNative:-99.548976, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios profesionales', normalizedCategory:'admin_general_expense', amountNative:-85.897314, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-57.745883, disclosureLevel:'detailed' },
    { rawLabel:'Gastos estadio', normalizedCategory:'match_organisation_expense', amountNative:-55.647963, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-48.651233, disclosureLevel:'detailed' },
    { rawLabel:'Servicios impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-25.399025, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y comunicación', normalizedCategory:'admin_general_expense', amountNative:-25.202786, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de comedor', normalizedCategory:'other_expenses', amountNative:-13.024333, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de colonia de vacaciones', normalizedCategory:'youth_other_sports_expense', amountNative:-8.618492, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada de verano', normalizedCategory:'youth_other_sports_expense', amountNative:-4.668394, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-4.112301, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos y traslados', normalizedCategory:'match_organisation_expense', amountNative:-3.840040, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-200.405775, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-439.641672, disclosureLevel:'detailed' },
    { rawLabel:'Indemnizaciones y juicios', normalizedCategory:'other_expenses', amountNative:-29.218628, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (Otros ingresos y egresos)', normalizedCategory:'other_expenses', amountNative:-0.024121, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Sueldos y jornales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-1293.963095, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y jornales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-1501.533091, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y premios', normalizedCategory:'match_organisation_expense', amountNative:-1217.864742, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos internacionales', normalizedCategory:'match_organisation_expense', amountNative:-737.833743, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-727.116735, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por transferencias y préstamos jugadores', normalizedCategory:'player_amortisation', amountNative:-560.143316, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-150.215930, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-334.469688, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos nacionales', normalizedCategory:'match_organisation_expense', amountNative:-241.882925, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios profesionales', normalizedCategory:'admin_general_expense', amountNative:-208.385760, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-113.303308, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-93.775341, disclosureLevel:'detailed' },
    { rawLabel:'Amortización acelerada por libertad de acción', normalizedCategory:'player_amortisation', amountNative:-87.622187, disclosureLevel:'detailed' },
    { rawLabel:'Servicios impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-83.667921, disclosureLevel:'detailed' },
    { rawLabel:'Gastos estadio', normalizedCategory:'match_organisation_expense', amountNative:-78.096124, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y comunicación', normalizedCategory:'admin_general_expense', amountNative:-56.738148, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de comedor', normalizedCategory:'other_expenses', amountNative:-43.441508, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de colonia de vacaciones', normalizedCategory:'youth_other_sports_expense', amountNative:-23.254275, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada de verano', normalizedCategory:'youth_other_sports_expense', amountNative:-16.033463, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos y traslados', normalizedCategory:'match_organisation_expense', amountNative:-4.548742, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-2.490227, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-425.249147, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-1107.860171, disclosureLevel:'detailed' },
    { rawLabel:'Indemnizaciones y juicios', normalizedCategory:'other_expenses', amountNative:-61.980949, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Sueldos y jornales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-4761.049974, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y jornales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-5455.670716, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por transferencias y préstamos jugadores', normalizedCategory:'player_amortisation', amountNative:-4667.951256, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y premios', normalizedCategory:'match_organisation_expense', amountNative:-4402.027264, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos internacionales', normalizedCategory:'match_organisation_expense', amountNative:-2759.110986, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-531.866624, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-1306.134631, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-1782.873275, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos nacionales', normalizedCategory:'match_organisation_expense', amountNative:-1708.811261, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-622.034925, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios profesionales', normalizedCategory:'admin_general_expense', amountNative:-583.197186, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-402.378762, disclosureLevel:'detailed' },
    { rawLabel:'Servicios impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-382.924638, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de comedor', normalizedCategory:'other_expenses', amountNative:-231.175888, disclosureLevel:'detailed' },
    { rawLabel:'Gastos estadio', normalizedCategory:'match_organisation_expense', amountNative:-226.992462, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y comunicación', normalizedCategory:'admin_general_expense', amountNative:-154.542784, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de colonia de vacaciones', normalizedCategory:'youth_other_sports_expense', amountNative:-76.234688, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada de verano', normalizedCategory:'youth_other_sports_expense', amountNative:-48.456594, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos y traslados', normalizedCategory:'match_organisation_expense', amountNative:-17.551509, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-1.829612, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-1625.574475, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-8878.189862, disclosureLevel:'detailed' },
    { rawLabel:'Indemnizaciones y juicios', normalizedCategory:'other_expenses', amountNative:-172.697275, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gastos por transferencias y préstamos jugadores', normalizedCategory:'player_amortisation', amountNative:-17020.954487, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y jornales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-6901.258217, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y jornales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-7981.851536, disclosureLevel:'detailed' },
    { rawLabel:'Reconocimientos y premios', normalizedCategory:'wages_squad', amountNative:-9322.519329, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-4422.669636, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos internacionales', normalizedCategory:'match_organisation_expense', amountNative:-3486.276784, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (Fútbol - Exhibición y espectáculos)', normalizedCategory:'wages_squad', amountNative:-779.431141, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-1893.841472, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos nacionales', normalizedCategory:'match_organisation_expense', amountNative:-1939.656547, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios profesionales', normalizedCategory:'admin_general_expense', amountNative:-1107.346382, disclosureLevel:'detailed' },
    { rawLabel:'Servicios impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-1000.513145, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-929.445512, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-553.379576, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y comunicación', normalizedCategory:'admin_general_expense', amountNative:-488.739224, disclosureLevel:'detailed' },
    { rawLabel:'Gastos estadio', normalizedCategory:'match_organisation_expense', amountNative:-365.377142, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de comedor', normalizedCategory:'other_expenses', amountNative:-310.357487, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de colonia de vacaciones', normalizedCategory:'youth_other_sports_expense', amountNative:-134.560481, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada de verano', normalizedCategory:'youth_other_sports_expense', amountNative:-54.261690, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos y traslados', normalizedCategory:'match_organisation_expense', amountNative:-33.080590, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-3.475727, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2300.800056, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-15240.011382, disclosureLevel:'detailed' },
  ],
};

const estudiantesLPFiscalYearMeta = {
  2022: {
    currency:'ARS', fx:125.030, fxSource:'document_close', sourceId:'estudianteslp-memoria-y-balance-2021-22',
    reportType:'official_balance_sheet', gestionId:'gorostegui',
    grossDebt:1153.353229, cash:12.545548,
    profitOnPlayerSales:0, assetSales:0, netInterest:690.331357, tax:0,
    // officialTotalRevenue/Expenses = RECURSOS/GASTOS ORDINARIOS + la porción positiva/negativa de
    // "Otros Ingresos y Egresos" (Nota 3.7), ya que esas líneas se cargaron como revenue/expense
    // normales (ver comentario de cabecera): 4264.184851+68.756627 / 4419.205412+29.218628+0.024121.
    officialTotalRevenue:4332.941478, officialTotalExpenses:4448.448161, officialPAT:574.824674,
  },
  2023: {
    currency:'ARS', fx:256.30, fxSource:'document_close', sourceId:'estudianteslp-memoria-y-balance-2022-23',
    reportType:'official_balance_sheet', gestionId:'gorostegui',
    grossDebt:2410.436335, cash:36.433986,
    profitOnPlayerSales:0, assetSales:0, netInterest:1535.101326, tax:0,
    // 7404.751724+9.148760+236.542911 / 9109.489587+61.980949.
    officialTotalRevenue:7650.443395, officialTotalExpenses:9171.470536, officialPAT:14.074185,
  },
  2024: {
    currency:'ARS', fx:909.00, fxSource:'document_close', sourceId:'estudianteslp-memoria-y-balance-2023-24',
    reportType:'official_balance_sheet', gestionId:'veron', // ver duda abierta en dudas-por-club.md
    grossDebt:12029.051057, cash:67.946816,
    profitOnPlayerSales:0, assetSales:0, netInterest:534.909348, tax:0,
    // 49648.052256+9.707725+172.145497 / 40626.579372+172.697275.
    officialTotalRevenue:49829.905478, officialTotalExpenses:40799.276647, officialPAT:9565.538179,
  },
  2025: {
    currency:'ARS', fx:1196.00, fxSource:'document_close', sourceId:'estudianteslp-memoria-y-balance-2024-25',
    reportType:'official_balance_sheet', gestionId:'veron',
    // grossDebt = Deudas corriente (23197.866989) + no corriente (12564.970707), EXCLUYENDO Fondos
    // específicos (144.600000+710.269290) y Previsiones (129.000000).
    grossDebt:35762.837696, cash:1364.903809,
    profitOnPlayerSales:0, assetSales:0, netInterest:2475.498214, tax:0,
    // 58112.923456+1404.273084 / 76269.807543. DÉFICIT FINAL real: $(14.277.112.789) ARS — primer
    // déficit del club en los 4 ejercicios cargados.
    officialTotalRevenue:59517.196540, officialTotalExpenses:76269.807543, officialPAT:-14277.112789,
  },
};

const estudiantesLPPasesData = [];
const estudiantesLPResultadosData = {};
const estudiantesLPTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.estudianteslp = {
  revenueLinesByYear: estudiantesLPRevenueLinesByYear, expenseLinesByYear: estudiantesLPExpenseLinesByYear,
  fiscalYearMeta: estudiantesLPFiscalYearMeta, pasesData: estudiantesLPPasesData,
  resultadosData: estudiantesLPResultadosData, titulosData: estudiantesLPTitulosData,
};


Object.assign(sources, {
  'estudianteslp-memoria-y-balance-2021-22': {
      id:'estudianteslp-memoria-y-balance-2021-22', clubId:'estudianteslp',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2021 al 30/6/2022',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (92 páginas, texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 29/9/2022. SUPERÁVIT real: $574.824.674 ARS. Convertido a USD con $125,03 (Anexo IV, lado Activo/Caja — el Pasivo declara $125,23, diferencia de centavos). Ver data/estudianteslp-data.js para el detalle completo de categorización (columna "Fútbol - Exhibición y espectáculos" = wages_squad, distinto nombre que Vélez/Instituto pero mismo criterio de fondo).',
    },
  'estudianteslp-memoria-y-balance-2022-23': {
      id:'estudianteslp-memoria-y-balance-2022-23', clubId:'estudianteslp',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2022 al 30/6/2023',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (94 páginas, texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 10/10/2023. SUPERÁVIT real: $14.074.185 ARS (mucho más chico que 2022, ver RESULTADOS FINANCIEROS/RECPAM). Convertido a USD con $256,30 (Anexo IV, lado Activo/Caja). OJO: la columna comparativa "30/06/2022" de ESTE documento reexpresa esos valores a la fecha de cierre de 2023 (moneda homogénea) — no se usó, se usa siempre el Ejercicio 2022 cargado desde SU PROPIO balance (ver club-data-mapping/SKILL.md sección 6, regla 5).',
    },
  'estudianteslp-memoria-y-balance-2024-25': {
      id:'estudianteslp-memoria-y-balance-2024-25', clubId:'estudianteslp',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2024 al 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (127 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract — a diferencia de los 3 ejercicios anteriores del mismo club, que son texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 7/10/2025, firmado por Juan Sebastián Verón como Presidente (ejercicio completo bajo su gestión, sin ambigüedad). DÉFICIT real: $(14.277.112.789) ARS — primer déficit del club en los 4 ejercicios cargados. Estructura nueva: "Fútbol - Plantel profesional" aparece como columna separada de "Fútbol - Exhibición y espectáculos" (antes la economía de pases vivía dentro de esa 2da columna). Convertido a USD con $1.196 (Anexo de moneda extranjera, lado Activo/Caja). Ver data/estudianteslp-data.js.',
    },
  'estudianteslp-memoria-y-balance-2023-24': {
      id:'estudianteslp-memoria-y-balance-2023-24', clubId:'estudianteslp',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (108 páginas, texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 8/10/2024, firmado por Juan Sebastián Verón como Presidente (proclamado el 6/4/2024, ~3 meses antes del cierre de este ejercicio — Martín Gorostegui presidió la mayoría de los meses de este mismo ejercicio, ver duda abierta en dudas-por-club.md). SUPERÁVIT real: $9.565.538.179 ARS (salto grande por una venta de pases importante: "Transferencias y préstamos de jugadores" $20.177.210.830). Convertido a USD con $909,00 (mismo valor que Racing/Vélez/Instituto para la misma fecha de cierre 30/6/2024).',
    },
});

gestionesByClub.estudianteslp = {
    // Confirmado por búsqueda (Versión 95): Martín Gorostegui presidente marzo-2021 a abril-2024.
    gorostegui: { nombre:'Gorostegui (2021-2024)', firstYear:2022, lastYear:2023 },
    // Juan Sebastián Verón, proclamado presidente el 6/4/2024 (sin elecciones, lista única). Firma
    // el balance del Ejercicio 2024 como Presidente — ver duda abierta sobre el criterio de
    // atribución en dudas-por-club.md (la mayoría de los meses de ese ejercicio fueron de
    // Gorostegui).
    veron: { nombre:'Verón (2024-actual)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.estudianteslp = 56000; // ~55.781-56.000 socios (cobertura de prensa, 2026)

