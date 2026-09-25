// ============================================================================
// data/ferrocarriloeste-ar-data.js — Club Ferro Carril Oeste (Asociación Civil), Caballito, Buenos
// Aires, Argentina. Club social multideportivo (fútbol, básquet, natación, hockey, tenis, etc.),
// mismo tipo de entidad que Banfield/Vélez/Racing — NO una SAF. 2 EJERCICIOS CARGADOS: 118
// (1°/7/2021 al 30/6/2022) y 119 (1°/7/2022 al 30/6/2023). fiscalYearStart:'07-01'.
//
// Fuentes: Estados Contables oficiales completos (Estado de Situación Patrimonial + Estado de
// Recursos y Gastos + Anexos A-G), ambos con informe de auditoría (Dr. Gabriel Alejandro Warley,
// CPCECABA T°295 F°232) SIN salvedades, descargados de ferrocarriloeste.org.ar (ver
// fuentes/Argentina/Ferro Carril Oeste.md). PDF con texto nativo, transcripción completa en
// Clubes/Argentina/Ferro Carril Oeste/estados-contables-ejercicio-118-2021-22.md (Ej. 118) y
// balance-ejercicio-119-2022-23.md (Ej. 119). Preparados en MONEDA HOMOGÉNEA (RT6, reexpresados por
// inflación a la fecha de cierre de CADA balance) — se usó siempre la columna "año corriente" de
// CADA documento (nunca la comparativa del balance del año siguiente, que reexpresa a otra fecha de
// cierre: club-data-mapping sección 6.5 — confirmado real acá, la columna comparativa "30/06/2022"
// que imprime el balance 119 NO coincide con el año corriente "30/06/2022" que imprime el balance
// 118, exactamente por este motivo).
//
// ESTRUCTURA DEL DOCUMENTO (misma para los 2 ejercicios): el Estado de Recursos y Gastos separa
// "RECURSOS ORDINARIOS" (Anexo B: Cuotas Sociales + Aranceles por Actividades + Otros Ingresos
// Ordinarios + Ingresos Extraordinarios — las 4 sub-secciones suman "Total Recursos Ordinarios") de
// "GASTOS ORDINARIOS" (Anexo D "Específicos de sectores" + Anexo E "Generales de administración" +
// Amortizaciones de bienes, Anexo A). Entre Gastos Ordinarios y el Superávit Operativo hay una línea
// suelta "Recupero Decreto 1212/03" (ver más abajo). Debajo del Superávit Operativo va una única
// línea "Resultados Financieros incluido RECPAM" (neta, incluye el resultado por exposición a la
// inflación) -> netInterest. No hay ítems extraordinarios separados: "Superávit (Deficit) del
// Ejercicio" = "Superávit (Deficit) Ordinarios" en los 2 años.
//
// "Recupero Decreto 1212/03" (Nota 7 de cada balance): el Decreto 1212/03 es un régimen de
// percepción/retención de la AFA sobre entradas/transferencias/publicidad/TV de los clubes
// afiliados, destinado a cargas sociales de jugadores y personal de fútbol profesional. LA NATURALEZA
// EXACTA DE ESTE "RECUPERO" (¿crédito por retención en exceso? ¿reintegro vinculado a las cargas
// sociales del plantel?) NO SE PUDO CONFIRMAR con el texto del balance — es una DUDA GENUINA, anotada
// para Admin/dudas-por-club.md. Se cargó como `other_income` (catch-all conservador: es un ingreso/
// recupero real que el propio documento incluye dentro de "Recursos Ordinarios" al computar el
// Superávit Operativo, pero sin categoría más específica disponible con certeza).
//
// Categorización de Ingresos (Anexo B + Anexo C para el desglose por actividad):
// - 'Cuotas Sociales Gral' -> member_dues.
// - 'Servicios a Socios' (Anexo C: Natación/Fitness/Tenis/Racquetball/Otros, actividades
//   recreativas para socios) -> other_sports.
// - 'Ingresos por Actividades Federadas': el Anexo C desglosa esta línea por deporte, y SÍ incluye
//   una línea propia "Futbol Infantil" — promovida a línea de primer nivel con normalizedCategory
//   `youth_football` (regla de la sección 1 de club-data-mapping: un sub-ítem con categoría real
//   distinta del resto se promueve, no se aplana). El resto de los deportes de esta línea (Futsal,
//   Hockey, Handball, Voleyball, Basquetball, Gimnasia, Tenis, Natación, Otros) -> other_sports.
// - 'Ingreso por Colonia de Vacaciones' -> other_sports (actividad recreativa de verano/invierno).
// - 'Ingreso por Colegio Instituto Educativo' -> education (colegio del club).
// - 'Ingreso por Instituto del Deporte' -> other_sports.
// - 'Ingreso por Escuelas Deportivas' (Anexo C: Natación/Tenis/Futsal/Gimnasia/Hockey/Basquetball/
//   Patín/Handball/Voleyball/Fitness/Efi/Running/Beisbol/Taekwondo/Boxeo/Racquetball/Judo-Karate-
//   Lucha/Ajedrez/Tenis de Mesa — sin una línea "Futbol" propia, Futsal es una disciplina distinta) ->
//   other_sports completo.
// - 'Ingresos Ponteveedra' (instalación/predio anexo del club) -> other_sports.
// - 'Recaudaciones Eventos Deportivos' -> matchday_competition. 'Ingresos por Torneos' ->
//   competition_bonus. 'Derechos de Television' -> broadcasting. 'Venta de Abonos y Plateas' ->
//   season_tickets. 'Ingreso por Publicidad y Sponsors' -> sponsorship_commercial.
// - 'Ingresos por Alquileres': CRITERIO CONSERVADOR (club-data-mapping sección 1, regla de
//   `stadium_other`) — el rótulo NO nombra el estadio ni una parte de él, así que NO va a
//   `stadium_other`, va a `other_income` (mismo criterio que un "Alquileres" genérico de cualquier
//   otro club ya cargado).
// - 'Ingresos por Buffet' -> other_income (concesión de buffet, no ligada específicamente al
//   estadio en el propio documento).
// - 'Futbol Profesional Ventas y Prestamos' (SOLO Ej. 119, no existe como línea en Ej. 118 — ahí el
//   monto era marginal, "Otros ingresos Futbol Profesional") -> player_sales: título explícito de
//   venta/préstamo de jugadores del plantel profesional.
// - 'Otros Ingresos' -> other_income. 'Otros ingresos Futbol Profesional' (Ej. 118, monto chico, sin
//   desglose que permita separar venta de préstamo de otro concepto) -> other_income.
// - 'Derechos de Formacion y afines' -> youth_football (mecanismo de solidaridad/formación, mismo
//   criterio que Botafogo/Vasco da Gama SAF con "Mecanismo de solidariedade").
// - 'Programa de Asis. de Emerg. al Trabajo y la Produccion' (Ej. 118, programa ATP del Estado
//   argentino durante la pandemia) -> other_income (subsidio estatal, no ligado a ninguna categoría
//   deportiva específica). 'Subsidios Recibidos' (Ej. 119) -> other_income, mismo criterio.
// - 'Recupero Decreto 1212/03' -> other_income (ver nota extensa arriba, duda genuina).
//
// Categorización de Gastos (Anexo D "Específicos de sectores" + Anexo E "Generales de
// administración" + Amortizaciones de bienes):
// - '1- Departamento de Educacion Fisica': actividad físico-recreativa general para socios (no es
//   el colegio, que tiene su propio Anexo separado más abajo) -> youth_other_sports_expense.
// - '2- Departamento de Deportes [Federados]' (Basquetball Profesional/Basquetball/Beisball/Boxeo/
//   Efi/Fitness/Futsal/Gimnasia/Handball/Hockey/Judo/Natación/Patín/Racquetball/Taekwondo/Tenis/
//   Tenis de Mesa/Voley/Otros — sin línea "Futbol" propia) -> youth_other_sports_expense completo
//   (la etiqueta de esta categoría incluye explícitamente "básquet", ver category-map.js).
// - '3- Gastos Especificos Departamento Fútbol': 'Departamento de Futbol Profesional' (la línea más
//   grande de todo el archivo) -> wages_squad, mismo criterio que Racing/Boca 2027 (club-data-
//   mapping sección 13, "CASO CONSULTADO": el documento no separa sueldos de otros costos
//   operativos del plantel profesional dentro de esta línea, así que se carga entera junto con los
//   sueldos, como ya se hace para ese tipo de línea mixta en otros clubes). 'Departamento de Futbol
//   Femenino'/'...Infantil'/'...Amateur' -> youth_other_sports_expense (espejo de gasto de
//   youth_football/womens_football, que no tienen contraparte propia del lado de Gastos).
// - '4- Departamento Medico': a diferencia de Banfield (donde el gasto médico está DENTRO del Anexo
//   de Fútbol Profesional), acá es un departamento APARTE de "Gastos Especificos Departamento
//   Fútbol", lo que sugiere que sirve a todas las secciones del club, no solo al plantel
//   profesional -> admin_general_expense.
// - '5- Egresos por Actividades': 'Instituto Educativo' -> education_expense (espejo de
//   'Ingreso por Colegio Instituto Educativo'). 'Colonia de Vacaciones'/'Instituto del Deporte'/
//   'Ponteveedra' -> youth_other_sports_expense (espejo de sus ingresos, todos en other_sports).
// - '6- Intendencia Campos de Deportes': 'Egresos Sede Social'/'Egresos Anexos'/'Egresos Generales'
//   -> admin_general_expense. 'Egresos Campo Deportivo' (mantenimiento de las canchas/instalaciones
//   deportivas) -> match_organisation_expense, mismo criterio que el "Sector Estadio" de Banfield.
// - '7- Otros Egresos: Egresos Departamento Cultural' (Ej. 119 solamente, Ej. 118 = $0, sin línea) ->
//   other_expenses (catch-all, el propio documento ya lo llama "Otros").
// - Anexo E (Gastos Generales de Administración): TODAS admin_general_expense, incluyendo
//   'Impuestos / Tasas / Contribuciones' (regla permanente de club-data-mapping sección 17) y
//   'Cargas Sociales' (adosada al sueldo administrativo de este mismo Anexo, no al del plantel,
//   mismo criterio de esa sección). 'Gastos Bancarios' se mantiene acá (no a netInterest): son
//   comisiones/gastos de acreditación de tarjeta, no intereses de deuda financiera — el documento ya
//   tiene una línea aparte y agregada, "Resultados Financieros incluido RECPAM", para lo financiero.
// - 'Amortizaciones de bienes' (Anexo A) -> depreciation.
//
// Verificación (Node, antes de cargar):
// Ej. 118: revenueLines suma EXACTO 1.133.154.575,19 = Total Recursos Ordinarios (1.050.575.536,66)
//   + Recupero Decreto 1212/03 (82.579.038,53). expenseLines suma 1.126.908.873,56 vs. Total Gastos
//   Ordinarios impreso 1.126.908.873,57 (diferencia de 1 centavo = redondeo del propio documento,
//   ver club-data-mapping sección 6). revenue+expenses = 6.245.701,63 = "Superávit (deficit)
//   Operativo" impreso, EXACTO. + netInterest (250.656.213,95) = 256.901.915,58 = "Superávit
//   (Deficit) del Ejercicio" impreso, EXACTO.
// Ej. 119: revenueLines suma EXACTO 3.022.684.808,49 = Total Recursos Ordinarios (2.838.730.671,99)
//   + Recupero Decreto 1212/03 (183.954.136,50). expenseLines suma EXACTO 2.939.047.831,97 = Total
//   Gastos Ordinarios impreso. revenue+expenses = 83.636.976,52 = "Superávit (deficit) Operativo"
//   impreso, EXACTO. + netInterest (629.290.795,32) = 712.927.771,84 = "Superávit (Deficit) del
//   Ejercicio" impreso, EXACTO.
//
// grossDebt: el Estado de Situación Patrimonial separa "Deudas Financieras" (corriente + no
// corriente) de "Deudas Comerciales", "Deudas Sociales y Fiscales" y "Previsiones-Contingencias
// Judiciales" — se usó la línea más angosta (solo Deudas Financieras), mismo criterio que Boca/
// Vélez/Banfield. Ej. 118: 93.153.967,83 + 210.947.730,91 = 304.101.698,74. Ej. 119: 175.893.949,71
// + 239.129.381,37 = 415.023.331,08. cash = "Caja y Bancos" (sin sumar "Inversiones"), Nota 4.1 de
// cada balance: Ej. 118 = 3.903.444,64; Ej. 119 = 59.450.677,25.
//
// FX: NINGUNO de los 2 balances declara su propio tipo de cambio de cierre en un Anexo dedicado (se
// buscó explícitamente "U$S"/"USD"/"dólar" en los 2 documentos completos, sin resultado — solo hay
// una nota de criterio de valuación genérica que dice "al tipo de cambio comprador/vendedor del
// Banco de la Nación Argentina vigente al cierre", SIN dar el valor numérico). Se usó el dólar
// MAYORISTA de referencia del BCRA (Comunicación "A" 3500, serie oficial vía
// apis.datos.gob.ar/series/api/series, id 175.1_DR_REFE500_0_0_25): $125,215 al 30/6/2022 (jueves,
// día hábil) y $256,675 al 30/6/2023 (viernes, día hábil) — ninguna de las 2 fechas cae en fin de
// semana, no hace falta ajustar a la rueda hábil más cercana. Migrado a `fxRef` ('ARS@2022-06-30'/
// 'ARS@2023-06-30', ya agregadas a `FX_CLOSE` en `data/currency-map.js` en la integración de esta
// misma versión), mismo criterio que ya usan Racing/Vélez/Banfield para sus propias fechas de
// dólar mayorista.
//
// Gestión: Carlos Daniel Pandolfi firma como Presidente el informe de auditoría de LOS 2 balances
// (16/9/2022 para el Ej. 118, 7/9/2023 para el Ej. 119) — evidencia directa y consistente de que
// presidió el club durante ambos ejercicios. No se encontró en las Memorias narrativas una fecha de
// elección/mandato explícita, pero la firma en carácter de Presidente en 2 balances consecutivos
// alcanza la confianza que pide club-data-mapping sección 7.
//
// Socios: la Memoria del Ej. 119 (memoria-ejercicio-119-2022-23.md, pág. 12) publica "CANTIDAD DE
// SOCIOS/AS POR CATEGORÍA AL 30/6/23": TOTAL 18.280. La Memoria del Ej. 118 no publica un total
// equivalente (solo menciona "la asistencia de 342 socios habilitados" a la Asamblea, que es
// quórum, no el padrón total). Se usó el único total real disponible (18.280, al 30/6/2023).
// ============================================================================

const ferrocarriloesteArRevenueLinesByYear = {
  2022: [
    { rawLabel:'Cuotas Sociales Gral', normalizedCategory:'member_dues', amountNative:363.510683, disclosureLevel:'detailed' },
    { rawLabel:'Servicios a Socios (Natación, Fitness, Tenis, Racquetball, Otros)', normalizedCategory:'other_sports', amountNative:34.467860, disclosureLevel:'detailed' },
    { rawLabel:'Actividades Federadas: Fútbol Infantil', normalizedCategory:'youth_football', amountNative:9.802125, disclosureLevel:'detailed' },
    { rawLabel:'Actividades Federadas: resto de deportes (Futsal, Hockey, Handball, Voley, Básquet, Gimnasia, Tenis, Natación, Otros)', normalizedCategory:'other_sports', amountNative:108.922346, disclosureLevel:'detailed' },
    { rawLabel:'Colonia de Vacaciones', normalizedCategory:'other_sports', amountNative:76.716424, disclosureLevel:'detailed' },
    { rawLabel:'Colegio Instituto Educativo', normalizedCategory:'education', amountNative:110.771247, disclosureLevel:'detailed' },
    { rawLabel:'Instituto del Deporte', normalizedCategory:'other_sports', amountNative:0.462031, disclosureLevel:'detailed' },
    { rawLabel:'Escuelas Deportivas (Natación, Tenis, Futsal, Gimnasia, Hockey, Básquet, Patín, Handball, Voley, Fitness, Efi, Running, Beisbol, Taekwondo, Boxeo, Racquetball, Judo/Karate/Lucha, Ajedrez, Tenis de Mesa)', normalizedCategory:'other_sports', amountNative:98.200141, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Ponteveedra', normalizedCategory:'other_sports', amountNative:17.605376, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones Eventos Deportivos', normalizedCategory:'matchday_competition', amountNative:4.209047, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Torneos', normalizedCategory:'competition_bonus', amountNative:2.525245, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Television', normalizedCategory:'broadcasting', amountNative:68.124557, disclosureLevel:'detailed' },
    { rawLabel:'Venta de Abonos y Plateas', normalizedCategory:'season_tickets', amountNative:15.403914, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y Sponsors', normalizedCategory:'sponsorship_commercial', amountNative:41.731842, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Alquileres', normalizedCategory:'other_income', amountNative:19.739383, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Buffet', normalizedCategory:'other_income', amountNative:2.995336, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:4.013933, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Formación y afines', normalizedCategory:'youth_football', amountNative:12.139650, disclosureLevel:'detailed' },
    { rawLabel:'Programa de Asistencia de Emergencia al Trabajo y la Producción (ATP)', normalizedCategory:'other_income', amountNative:58.388019, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos Fútbol Profesional', normalizedCategory:'other_income', amountNative:0.846380, disclosureLevel:'detailed' },
    { rawLabel:'Recupero Decreto 1212/03 (ver nota de cabecera — duda genuina)', normalizedCategory:'other_income', amountNative:82.579039, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Cuotas Sociales Gral', normalizedCategory:'member_dues', amountNative:879.624083, disclosureLevel:'detailed' },
    { rawLabel:'Servicios a Socios (Natación, Fitness, Tenis, Racquetball, Otros)', normalizedCategory:'other_sports', amountNative:99.496064, disclosureLevel:'detailed' },
    { rawLabel:'Actividades Federadas: Fútbol Infantil', normalizedCategory:'youth_football', amountNative:27.899285, disclosureLevel:'detailed' },
    { rawLabel:'Actividades Federadas: resto de deportes (Futsal, Hockey, Handball, Voley, Básquet, Gimnasia, Tenis, Natación, Otros)', normalizedCategory:'other_sports', amountNative:208.465412, disclosureLevel:'detailed' },
    { rawLabel:'Colonia de Vacaciones', normalizedCategory:'other_sports', amountNative:191.371407, disclosureLevel:'detailed' },
    { rawLabel:'Colegio Instituto Educativo', normalizedCategory:'education', amountNative:264.637640, disclosureLevel:'detailed' },
    { rawLabel:'Instituto del Deporte', normalizedCategory:'other_sports', amountNative:0.811689, disclosureLevel:'detailed' },
    { rawLabel:'Escuelas Deportivas (Natación, Tenis, Futsal, Gimnasia, Hockey, Básquet, Patín, Handball, Voley, Fitness, Efi, Running, Beisbol, Taekwondo, Boxeo, Racquetball, Judo/Karate/Lucha, Ajedrez, Tenis de Mesa)', normalizedCategory:'other_sports', amountNative:247.443036, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Ponteveedra', normalizedCategory:'other_sports', amountNative:36.082915, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones Eventos Deportivos', normalizedCategory:'matchday_competition', amountNative:32.507327, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Torneos', normalizedCategory:'competition_bonus', amountNative:8.256661, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Television', normalizedCategory:'broadcasting', amountNative:115.609920, disclosureLevel:'detailed' },
    { rawLabel:'Venta de Abonos y Plateas', normalizedCategory:'season_tickets', amountNative:15.491412, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y Sponsors', normalizedCategory:'sponsorship_commercial', amountNative:48.888312, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Alquileres', normalizedCategory:'other_income', amountNative:122.049192, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Buffet', normalizedCategory:'other_income', amountNative:7.150961, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol Profesional: Ventas y Préstamos', normalizedCategory:'player_sales', amountNative:459.755138, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:1.140521, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Formación y afines', normalizedCategory:'youth_football', amountNative:70.979941, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios Recibidos', normalizedCategory:'other_income', amountNative:1.069756, disclosureLevel:'detailed' },
    { rawLabel:'Recupero Decreto 1212/03 (ver nota de cabecera — duda genuina)', normalizedCategory:'other_income', amountNative:183.954137, disclosureLevel:'detailed' },
  ],
};

const ferrocarriloesteArExpenseLinesByYear = {
  2022: [
    { rawLabel:'Departamento de Educación Física', normalizedCategory:'youth_other_sports_expense', amountNative:-26.987439, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Deportes Federados', normalizedCategory:'youth_other_sports_expense', amountNative:-279.401006,
      disclosureLevel:'detailed', items:[
        ['Basquetball Profesional', -55.068976],
        ['Basquetball', -21.803942],
        ['Beisball', -1.748407],
        ['Boxeo', -1.031596],
        ['Efi', -3.337597],
        ['Fitnes', -9.046886],
        ['Futsal', -38.208451],
        ['Gimnasia Artística y Rítmica', -10.257244],
        ['Handball', -21.851508],
        ['Hockey', -14.979758],
        ['Judo', -1.172202],
        ['Natación', -34.438353],
        ['Patín', -1.577381],
        ['Racquetball', -0.326840],
        ['Taekwondo', -2.855210],
        ['Tenis', -24.206804],
        ['Tenis de Mesa', -1.234802],
        ['Voley', -23.218274],
        ['Otros', -13.036777],
      ] },
    { rawLabel:'Departamento de Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-272.645575, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Fútbol Femenino', normalizedCategory:'youth_other_sports_expense', amountNative:-12.025531, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Fútbol Infantil', normalizedCategory:'youth_other_sports_expense', amountNative:-6.843857, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-19.932965, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Médico', normalizedCategory:'admin_general_expense', amountNative:-6.518555, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Instituto Educativo', normalizedCategory:'education_expense', amountNative:-121.577680, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Colonia de Vacaciones', normalizedCategory:'youth_other_sports_expense', amountNative:-19.821991, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Instituto del Deporte', normalizedCategory:'youth_other_sports_expense', amountNative:-0.946247, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Ponteveedra', normalizedCategory:'youth_other_sports_expense', amountNative:-31.844100, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Sede Social', normalizedCategory:'admin_general_expense', amountNative:-21.670908, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Campo Deportivo', normalizedCategory:'match_organisation_expense', amountNative:-45.229700, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Anexos', normalizedCategory:'admin_general_expense', amountNative:-2.079218, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Generales', normalizedCategory:'admin_general_expense', amountNative:-91.819464, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales de Administración (Anexo E)', normalizedCategory:'admin_general_expense', amountNative:-156.346545,
      disclosureLevel:'detailed', items:[
        ['Sueldos al Personal', -37.598817],
        ['Honorarios y Otras Retribuciones', -6.467904],
        ['Servicios de Telefonía e Internet', -1.198156],
        ['Provisiones, Previsiones por Juicios e Incobrables', -45.821224],
        ['Cargas Sociales', -12.923772],
        ['Gastos Bancarios', -3.612969],
        ['Gastos por Acreditación de Tarjetas de Crédito', -6.606241],
        ['Movilidad y Viáticos', -0.216128],
        ['Publicidad Institucional', -5.394209],
        ['Gastos Varios', -0.221551],
        ['Papelería y Útiles', -1.355310],
        ['Insumos Informáticos', -4.314490],
        ['Franqueos, Telegramas y Correos', -0.075772],
        ['Mantenimiento Infraestructura', -0.211047],
        ['Impuestos / Tasas / Contribuciones', -30.328956],
      ] },
    { rawLabel:'Amortizaciones de bienes (Anexo A)', normalizedCategory:'depreciation', amountNative:-11.218090, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Departamento de Educación Física', normalizedCategory:'youth_other_sports_expense', amountNative:-96.308067, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Deportes Federados', normalizedCategory:'youth_other_sports_expense', amountNative:-647.414872,
      disclosureLevel:'detailed', items:[
        ['Basquetball Profesional', -124.822388],
        ['Basquetball', -38.119250],
        ['Beisball', -4.290061],
        ['Boxeo', -1.971456],
        ['Efi', -8.810611],
        ['Fitnes', -18.804272],
        ['Futsal', -89.613700],
        ['Gimnasia Artística y Rítmica', -29.222098],
        ['Handball', -42.433094],
        ['Hockey', -36.555475],
        ['Judo', -4.101989],
        ['Natación', -92.500644],
        ['Patín', -3.414742],
        ['Racquetball', -0.683763],
        ['Taekwondo', -4.563729],
        ['Tenis', -59.515616],
        ['Tenis de Mesa', -3.158850],
        ['Voley', -54.336466],
        ['Otros', -30.496669],
      ] },
    { rawLabel:'Departamento de Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-766.030131, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Fútbol Femenino', normalizedCategory:'youth_other_sports_expense', amountNative:-35.148810, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Fútbol Infantil', normalizedCategory:'youth_other_sports_expense', amountNative:-10.741247, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-56.548922, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Médico', normalizedCategory:'admin_general_expense', amountNative:-28.051389, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Instituto Educativo', normalizedCategory:'education_expense', amountNative:-255.842560, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Colonia de Vacaciones', normalizedCategory:'youth_other_sports_expense', amountNative:-32.675088, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Instituto del Deporte', normalizedCategory:'youth_other_sports_expense', amountNative:-0.890963, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Ponteveedra', normalizedCategory:'youth_other_sports_expense', amountNative:-72.358611, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Sede Social', normalizedCategory:'admin_general_expense', amountNative:-91.372933, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Campo Deportivo', normalizedCategory:'match_organisation_expense', amountNative:-198.667728, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Anexos', normalizedCategory:'admin_general_expense', amountNative:-9.041560, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Generales', normalizedCategory:'admin_general_expense', amountNative:-253.639079, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Departamento Cultural', normalizedCategory:'other_expenses', amountNative:-0.010530, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales de Administración (Anexo E)', normalizedCategory:'admin_general_expense', amountNative:-358.156826,
      disclosureLevel:'detailed', items:[
        ['Sueldos al Personal', -104.157425],
        ['Honorarios y Otras Retribuciones', -25.333009],
        ['Servicios de Telefonía e Internet', -2.957593],
        ['Provisiones, Previsiones por Juicios e Incobrables', -84.702770],
        ['Cargas Sociales', -32.553186],
        ['Gastos Bancarios', -2.490532],
        ['Gastos por Acreditación de Tarjetas de Crédito', -16.364315],
        ['Movilidad y Viáticos', -0.413021],
        ['Publicidad Institucional', -14.931185],
        ['Gastos Varios', -1.319016],
        ['Papelería y Útiles', -3.448378],
        ['Insumos Informáticos', -10.204519],
        ['Franqueos, Telegramas y Correos', -0.202199],
        ['Mantenimiento Infraestructura', -0.762246],
        ['Impuestos / Tasas / Contribuciones', -58.317434],
      ] },
    { rawLabel:'Amortizaciones de bienes (Anexo A)', normalizedCategory:'depreciation', amountNative:-26.148515, disclosureLevel:'detailed' },
  ],
};

const ferrocarriloesteArFiscalYearMeta = {
  2022: {
    currency:'ARS', fxRef:'ARS@2022-06-30',
    sourceId:'ferrocarriloeste-ar-estados-contables-118-2021-22',
    reportType:'official_balance_sheet', gestionId:'pandolfi',
    // netInterest = "Resultados Financieros incluido RECPAM" impreso.
    netInterest:250.656214, profitOnPlayerSales:0, assetSales:0, tax:0,
    // grossDebt = Deudas Financieras (corriente 93.153.967,83 + no corriente 210.947.730,91).
    // cash = Caja y Bancos (Nota 4.1).
    grossDebt:304.101699, cash:3.903445,
    // officialTotalRevenue = Total Recursos Ordinarios (1.050.575.536,66) + Recupero Decreto
    // 1212/03 (82.579.038,53), ver nota de cabecera. officialTotalExpenses = Total Gastos Ordinarios
    // impreso. officialPAT = "Superávit (Deficit) del Ejercicio" impreso. Verificado exacto:
    // revenue + expenses = "Superávit (deficit) Operativo" (6.245.701,63); + netInterest =
    // 256.901.915,58 = officialPAT.
    officialTotalRevenue:1133.154575, officialTotalExpenses:1126.908874, officialPAT:256.901916,
  },
  2023: {
    currency:'ARS', fxRef:'ARS@2023-06-30',
    sourceId:'ferrocarriloeste-ar-balance-119-2022-23',
    reportType:'official_balance_sheet', gestionId:'pandolfi',
    netInterest:629.290795, profitOnPlayerSales:0, assetSales:0, tax:0,
    // grossDebt = Deudas Financieras (corriente 175.893.949,71 + no corriente 239.129.381,37).
    // cash = Caja y Bancos (Nota 4.1).
    grossDebt:415.023331, cash:59.450677,
    // officialTotalRevenue = Total Recursos Ordinarios (2.838.730.671,99) + Recupero Decreto
    // 1212/03 (183.954.136,50). officialTotalExpenses = Total Gastos Ordinarios impreso
    // (2.939.047.831,97). officialPAT = "Superávit (Deficit) del Ejercicio" impreso (712.927.771,84).
    // Verificado exacto: revenue + expenses = 83.636.976,52 = "Superávit (deficit) Operativo".
    officialTotalRevenue:3022.684808, officialTotalExpenses:2939.047832, officialPAT:712.927772,
  },
};

const ferrocarriloesteArPresupuestoOverlayByYear = {};
const ferrocarriloesteArPresupuestoSupuestosByYear = {};
const ferrocarriloesteArPresupuestoFinancieroByYear = {};
const ferrocarriloesteArPresupuestoInversionesByYear = {};
const ferrocarriloesteArPasesData = [];
const ferrocarriloesteArResultadosData = {};
const ferrocarriloesteArTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['ferrocarriloeste-ar'] = {
  revenueLinesByYear: ferrocarriloesteArRevenueLinesByYear, expenseLinesByYear: ferrocarriloesteArExpenseLinesByYear,
  fiscalYearMeta: ferrocarriloesteArFiscalYearMeta, pasesData: ferrocarriloesteArPasesData,
  resultadosData: ferrocarriloesteArResultadosData, titulosData: ferrocarriloesteArTitulosData,
  presupuestoOverlayByYear: ferrocarriloesteArPresupuestoOverlayByYear,
  presupuestoSupuestosByYear: ferrocarriloesteArPresupuestoSupuestosByYear,
  presupuestoFinancieroByYear: ferrocarriloesteArPresupuestoFinancieroByYear,
  presupuestoInversionesByYear: ferrocarriloesteArPresupuestoInversionesByYear,
};

Object.assign(sources, {
  'ferrocarriloeste-ar-estados-contables-118-2021-22': {
    id:'ferrocarriloeste-ar-estados-contables-118-2021-22', clubId:'ferrocarriloeste-ar',
    title:'Estados Contables, Ejercicio Económico N° 118 (1°/7/2021 al 30/6/2022)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.ferrocarriloeste.org.ar/institucional/',
    note:'PDF oficial (texto nativo), informe de auditoría sin salvedades (Dr. Gabriel Alejandro Warley, CPCECABA T°295 F°232, 16/9/2022). Estados contables preparados en moneda homogénea (RT6). SUPERÁVIT real: $256.901.915,58 ARS. Total del Activo al cierre: $3.693.397.732,35. No declara tipo de cambio de cierre propio (sin Anexo de moneda extranjera) — convertido con dólar mayorista de referencia BCRA (Comunicación A 3500) al 30/6/2022 ($125,215), investigado vía apis.datos.gob.ar. Ver data/ferrocarriloeste-ar-data.js para el detalle completo de categorización.',
  },
  'ferrocarriloeste-ar-balance-119-2022-23': {
    id:'ferrocarriloeste-ar-balance-119-2022-23', clubId:'ferrocarriloeste-ar',
    title:'Estados Contables, Ejercicio Económico N° 119 (1°/7/2022 al 30/6/2023)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.ferrocarriloeste.org.ar/institucional/',
    note:'PDF oficial (texto nativo), informe de auditoría sin salvedades (Dr. Gabriel Alejandro Warley, CPCECABA T°295 F°232, 7/9/2023). Estados contables preparados en moneda homogénea (RT6). SUPERÁVIT real: $712.927.771,84 ARS, impulsado por una venta/préstamo grande de jugadores del plantel profesional ($459,755138 M, línea "Futbol Profesional Ventas y Prestamos", que no existía como línea propia en el Ej. 118). Total del Activo al cierre: $8.563.450.301,47. No declara tipo de cambio de cierre propio — convertido con dólar mayorista de referencia BCRA al 30/6/2023 ($256,675). 18.280 socios/as al 30/6/2023 (única cifra de padrón encontrada en las 2 memorias). Ver data/ferrocarriloeste-ar-data.js para el detalle completo de categorización.',
  },
});

gestionesByClub['ferrocarriloeste-ar'] = {
  // Carlos Daniel Pandolfi, Presidente — firma en ese carácter el informe de auditoría de AMBOS
  // balances (Ej. 118: 16/9/2022; Ej. 119: 7/9/2023). No se encontró una fecha de elección/mandato
  // explícita en las Memorias narrativas, pero la firma consistente en 2 balances consecutivos
  // confirma la gestión para los 2 ejercicios cargados con la confianza que exige club-data-mapping
  // SKILL.md sección 7.
  pandolfi: { nombre:'Pandolfi', firstYear:2022, lastYear:2023 },
};

memberCountByClub['ferrocarriloeste-ar'] = 18280; // al 30/6/2023, memoria-ejercicio-119-2022-23.md
