// ============================================================================
// data/almagro-ar-data.js — Club Almagro (Asociación Civil, Medrano 522, CABA):
// clubId lleva el sufijo de país ('almagro-ar') por la convención de la Versión 129
// (Admin/CONVENCIONES.md): cualquier club nuevo desde entonces nace con el país en el id,
// para no arrastrar una colisión futura si aparece otro "Almagro" en otro país. Los 41
// clubes de antes de esa versión (incluido "instituto"/"racing"/"velez"/"rosariocentral",
// cargados antes de la 129 o en la misma tanda sin haberse actualizado) se quedan sin
// migrar a propósito, ver el criterio completo en CONVENCIONES.md.
// club NUEVO, motor genérico. 6 ejercicios cargados, todos balances auditados reales,
// consecutivos: Ejercicio 80 (cierre 31/10/2018) a Ejercicio 85 (cierre 31/10/2023).
// PDF + transcripción en Clubes/Argentina/Almagro/{balance-2018,balance-2019,
// memoria-y-balance-2020,balance-2021,balance-2022,balance-2023}.{pdf,md}. Los 4 últimos
// (2020-2023) están marcados "ESCANEADO, TRANSCRIPTO CON MISTRAL OCR" en su .md — se
// verificaron a mano los 6 ejercicios sumando cada Anexo contra su total impreso (y el
// total contra el "TOTAL DE RECURSOS"/"TOTAL GASTOS"/resultado final de cada balance,
// columna del AÑO CORRIENTE de ESE balance, nunca la comparativa de un balance posterior —
// club-data-mapping sección 6 punto 5), así que la advertencia de esos 4 archivos ya se
// puede borrar.
//
// FORMATO DEL DOCUMENTO, igual los 6 años (confirmado leyendo 2018 entero y grepeando el
// resto): Estado de Resultados = "RECURSOS" (Cuota Sociales -Anexo II + Recaudación por
// Actividades -Anexo III) − "GASTOS" (Gastos Específicos -Anexo IV + Gastos de
// Operaciones -Anexo V + Amortización -Anexo I A y I B) = "Rtado de las operaciones
// ordinarias", +/− "Resultado financiero y por tenencia (incluye RECPAM)" = resultado
// final del ejercicio.
//
// TRAMPA REAL ENCONTRADA (2021 y 2022, y la más grande en 2023): el balance imprime DOS
// resultados con nombres que invitan a confundirlos. "RESULTADO DEL EJERCICIO" es el
// resultado ANTES del resultado financiero (Recursos − Gastos); "RESULTADO FINAL" es
// DESPUÉS de sumarle el resultado financiero — es este último el que se cargó como
// `officialPAT`, nunca el intermedio. El caso más extremo es 2023: "RESULTADO DEL
// EJERCICIO -GANANCIA-" da +69.702.506,29 (Recursos 423.070.550,27 − Gastos
// 353.368.043,98), pero el resultado financiero de ese año es -72.886.626,53, así que el
// "RESULTADO FINAL" -y el officialPAT real- es -3.184.120,24 (PÉRDIDA), lo opuesto de lo
// que sugiere leer solo la primera línea. Mismo patrón, menor magnitud, en 2021
// (RESULTADO DEL EJERCICIO -6.885.940,57 vs. RESULTADO FINAL -10.836.428,30) y 2022
// (-6.311.157,56 vs. -13.483.786,33). 2018/2019/2020 no tienen esta ambigüedad de rótulo
// (una sola línea de resultado, ya neta del resultado financiero cuando corresponde).
// 2020 es el único ejercicio de los 6 sin línea de "Resultado financiero" separada —
// "RESULTADO DEL EJERCICIO -GANANCIA-" ES el resultado final ese año (netInterest:0).
//
// CATEGORIZACIÓN (ver club-data-mapping SKILL.md sección 1 para el criterio de cada
// categoría; estas son las decisiones específicas de Almagro, algunas no cubiertas por el
// skill al 100%, ver reporte de la sesión):
// - "Sede Social - Medrano 522 CABA" (Anexo II, única línea) -> member_dues. DECISIÓN DE GUIDO (2026-10-05): son cuotas sociales;
//   no es una duda abierta y una auditoría no la reabre (el balance pone aparte "Alquiler de Sede").
// - "Futbol Ingreso por Partidos" / "Partidos Amistosos" (2023) -> matchday_competition.
// - "Ingreso A.F.A." / "Ingreso A.F.A: dcho tv" / "Derechos TV" -> broadcasting (el propio
//   rótulo 2020+ dice "dcho tv", confirma que es reparto de TV/torneos vía AFA).
// - "Alquiler de Sede" -> other_income, NO stadium_other: es alquiler de la SEDE SOCIAL
//   (Medrano 522), un domicilio distinto y explícitamente separado del Estadio (M.T. de
//   Alvear 223, José Ingenieros) en la carátula del propio balance — criterio conservador
//   de club-data-mapping sección 1 (stadium_other solo si el rótulo nombra el estadio).
// - "Alquiler de Canchas" -> other_income (no se puede confirmar que sean las canchas del
//   estadio vs. las del predio de entrenamiento; conservador, mismo criterio que Sede).
// - "Canon por Alquiler Cancha Tenis" -> other_sports (sección deportiva no futbolística,
//   ver tabla de club-data-mapping sección 1).
// - "Premio Copa Argentina" -> competition_bonus.
// - "Publicidad" / "Alquiler de Antena" -> sponsorship_commercial.
// - "Derechos de Solidaridad Jugadores" (2020) / "Derecho de Formacion Jugadores" (2021-22)
//   / "Prima por Venta Jugadores" (2022) -> player_sales (mecanismos FIFA de
//   solidaridad/formación y prima de venta, todos ingreso ligado a transferencias).
// - "Asignacion Extraordinaria A.F.A" (2021, $1,26M) -> other_income, NO broadcasting: a
//   diferencia de "Ingreso A.F.A: dcho tv" (que el propio rótulo liga a TV), esta línea no
//   aclara su origen y podría ser un aporte extraordinario (ej. alivio post-pandemia) sin
//   relación con derechos de TV — JUDGMENT CALL, no cubierto por el skill, señalado en el
//   reporte de la sesión.
// - "Intereses Fondo de Inversion" (2023, Anexo III) -> other_income, NO netInterest: es
//   financiero por naturaleza, pero el propio balance lo incluye dentro de "RECAUDACIÓN
//   POR ACTIVIDADES" (Anexo III), no dentro de "Resultado financiero y por tenencia" (que
//   es una línea aparte y ya se carga como netInterest) — mismo criterio que "Interese
//   perdidos" de Anexo V abajo: fiel a dónde lo puso el propio documento, sin reclasificar.
// - "Subsidio Otorgado" (2023) -> other_income.
// - "Interese perdidos" (TODOS los años, Anexo V) -> other_expenses, NO netInterest: el
//   propio documento lo computa DENTRO del total de "GASTOS DE OPERACIONES -Anexo V" (se
//   verificó sumando: en 2018, 349.387,63 está incluido en el total 31.796.015,48), a
//   diferencia de "Resultado financiero y por tenencia" que es una línea SEPARADA y
//   distinta (esa sí es netInterest). No se resta ni se reclasifica, se deja donde el
//   balance lo puso (regla explícita del pedido de esta sesión, alineada con
//   club-data-mapping sección 2: ahí solo aplica a lo que el documento muestra APARTE).
// - "Gastos de alimentos" (2018 solamente) / "Gastos Cuerpo Médico y Técnico" / "Honorarios
//   Cuerpo Medico y Tecnico" / "Sueldos y Jornales" / "Cargas Sociales" / "Cargas Sociales
//   Seg Soc." / "Primas por contrato privado" -> wages_squad. "Gastos de alimentos" (comida
//   del plantel) NO está explícitamente cubierto por el skill; se agrupó con wages_squad
//   seguindo el precedente de Racing (club-data-mapping sección 13, "CASO CONSULTADO":
//   costos no salariales del plantel — médico, viáticos, comida — que Boca/Racing ya
//   mezclan dentro de su propio wages_squad) — JUDGMENT CALL, señalado en el reporte.
// - "Comision por compra Jugadores" / "Comision por Representante" -> other_expenses, NO
//   player_amortisation: precedente de Racing (sección 13, Boca tampoco mezcla comisiones
//   de compraventa dentro de "Compra de jugadores").
// - "Gastos Compra Jugadores" (2023, costo directo de adquisición, $6,43M) -> SÍ
//   player_amortisation (a diferencia de las comisiones de arriba, es el costo del pase en
//   sí, mismo criterio que "Costo transferencia de jugadores" de Racing).
// - Impuestos (Ley 25413, Impuestos y Contribuciones, IVA no computable), honorarios
//   (abogados, contador), seguros, gastos administrativos/generales, gastos bancarios,
//   limpieza -> admin_general_expense (impuestos/honorarios/seguros/administrativos, ver
//   club-data-mapping sección 17) salvo gastos bancarios (sin precedente explícito,
//   quedaron en other_expenses junto con Interese perdidos, mismo tipo de costo financiero
//   operativo).
// - Estadías y traslados / movilidad / Gastos de Policía / Servicios de Emergencia /
//   Ambulancia para partidos / alquiler para entrenamiento / Servicio de Seguridad ->
//   match_organisation_expense.
// - Mantenimiento, gastos varios, lavandería, eventos, transmisión radio, alquiler
//   equipo electrógeno, alquiler vivienda para jugadores, Juicios, Multa, Percepciones
//   Perdidas, Servicio de Lavandería -> other_expenses (sin categoría más específica; ver
//   club-data-mapping sección 17 para Juicios/Moratoria — acá no hay moratoria, y Juicios
//   no tiene un contexto de agrupación del propio balance que sugiera admin_general_expense
//   como si tuvo Racing en algunos años).
//
// FX: ninguno de los 6 balances tiene Anexo de moneda extranjera (no hay Activos/Pasivos
// en USD/EUR declarados, club sin ese tipo de exposición) — confirmado en los 6 archivos.
// fxRef a ARS@AAAA-10-31 (dólar mayorista BCRA de cierre, serie Rava Bursátil, agregada a
// data/currency-map.js en esta sesión — no existían entradas de cierre 31/10 previas).
//
// grossDebt = TOTAL DEL PASIVO completo de cada año (el balance de Almagro no separa una
// línea "Deudas" angosta de otras categorías de pasivo tipo Previsiones/Ingresos
// anticipados — Deudas Fiscales + Remuneraciones y C. Sociales + AFA a Pagar son, los tres,
// deuda real — mismo criterio que Racing en club-data-mapping sección 14). cash = Caja y
// Bancos de cada año.
//
// GESTIÓN: la NÓMINA DE COMISIÓN DIRECTIVA impresa en cada balance confirma 2 presidencias
// distintas a lo largo de los 6 ejercicios: Jorge Julián Romeo (nóminas 2016-2018 en el
// balance 2018, 2018-2020 en 2019/2020, 2018-2021 en 2021 — cubre los ejercicios
// 2018-2021) y Julio Osvaldo Cucchi (nómina 2021-2024 impresa en los balances 2022 y 2023,
// y firmante en ambos — cubre 2022-2023). El propio balance 2021 aclara en su Nota 1.4 que
// Romeo renunció el 23/10/2023 (F ya vencido el ejercicio 2021, mientras el balance seguía
// sin firmar) y que lo firmaría Cucchi como nuevo presidente — no cambia a qué gestión
// pertenece el EJERCICIO 2021 (la nómina impresa para ESE ejercicio es la de Romeo).
//
// BRANDCOLOR: la tarea original asumía "blanco y violeta/lila", pero Wikipedia (infobox +
// texto: "fueron adoptados... los colores azul, blanco y negro y con ello adopta el apodo
// de tricolor") confirma que el club es TRICOLOR azul/blanco/negro, apodo "Tricolor" — no
// hay violeta/lila en ningún lado. Con 3 colores sin un orden de predominancia declarado
// por el club/liga (a diferencia de los casos bicolor de club-or-year-onboarding sección
// 3), y sin theme-color del sitio oficial ni hex confiable en agregadores (footylogos no
// lista a Almagro, teamcolorcodes no tiene el club), se dejó brandColor:null — resultado
// cerrado, no pendiente. Ver fuentes/Argentina/Almagro.md para el detalle de la búsqueda.
// ============================================================================

const almagroArRevenueLinesByYear = {
  2018: [
    { rawLabel:'Sede Social- Medrano 522 CABA', normalizedCategory:'member_dues', amountNative:1.360000, disclosureLevel:'detailed' },
    { rawLabel:'Futbol Ingreso por Partidos', normalizedCategory:'matchday_competition', amountNative:1.114385, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso A.F.A.', normalizedCategory:'broadcasting', amountNative:17.996318, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Sede', normalizedCategory:'other_income', amountNative:8.013443, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Especiales', normalizedCategory:'other_income', amountNative:0.274730, disclosureLevel:'detailed' },
    { rawLabel:'Premio Copa Argentina', normalizedCategory:'competition_bonus', amountNative:1.745533, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:4.147735, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Antena', normalizedCategory:'sponsorship_commercial', amountNative:3.698120, disclosureLevel:'detailed' },
  ],
  2019: [
    { rawLabel:'Sede Social- Medrano 522 CABA', normalizedCategory:'member_dues', amountNative:1.948000, disclosureLevel:'detailed' },
    { rawLabel:'Futbol Ingreso por Partidos', normalizedCategory:'matchday_competition', amountNative:0.793120, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso A.F.A.', normalizedCategory:'broadcasting', amountNative:22.685984, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Sede', normalizedCategory:'other_income', amountNative:10.100922, disclosureLevel:'detailed' },
    { rawLabel:'Derechos TV', normalizedCategory:'broadcasting', amountNative:6.088439, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Especiales', normalizedCategory:'other_income', amountNative:0.095600, disclosureLevel:'detailed' },
    { rawLabel:'Premio Copa Argentina', normalizedCategory:'competition_bonus', amountNative:3.635227, disclosureLevel:'detailed' },
    { rawLabel:'Canon por Alquiler Cancha Tenis', normalizedCategory:'other_sports', amountNative:1.080000, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Canchas', normalizedCategory:'other_income', amountNative:1.200000, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:4.706491, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Sede Social- Medrano 522 CABA', normalizedCategory:'member_dues', amountNative:2.107500, disclosureLevel:'detailed' },
    { rawLabel:'Futbol Ingreso por Partidos', normalizedCategory:'matchday_competition', amountNative:0.133800, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso A.F.A: dcho tv', normalizedCategory:'broadcasting', amountNative:30.300000, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Sede', normalizedCategory:'other_income', amountNative:7.574380, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Especiales', normalizedCategory:'other_income', amountNative:1.125370, disclosureLevel:'detailed' },
    { rawLabel:'Premio Copa Argentina', normalizedCategory:'competition_bonus', amountNative:1.578299, disclosureLevel:'detailed' },
    { rawLabel:'Canon por Alquiler Cancha Tenis', normalizedCategory:'other_sports', amountNative:0.425000, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Canchas', normalizedCategory:'other_income', amountNative:0.425000, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:2.407220, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Antena', normalizedCategory:'sponsorship_commercial', amountNative:8.175000, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de Solidaridad Jugadores', normalizedCategory:'player_sales', amountNative:0.221064, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Sede Social- Medrano 522 CABA', normalizedCategory:'member_dues', amountNative:4.950662, disclosureLevel:'detailed' },
    { rawLabel:'Futbol Ingreso por Partidos', normalizedCategory:'matchday_competition', amountNative:1.960079, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso A.F.A: dcho tv', normalizedCategory:'broadcasting', amountNative:37.372298, disclosureLevel:'detailed' },
    // Ver comentario de cabecera: "Asignacion Extraordinaria A.F.A" no aclara su origen, se
    // categorizó other_income en vez de broadcasting (judgment call).
    { rawLabel:'Asignacion Extraordinaria A.F.A', normalizedCategory:'other_income', amountNative:1.255159, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Sede', normalizedCategory:'other_income', amountNative:11.850907, disclosureLevel:'detailed' },
    { rawLabel:'Canon por Alquiler Cancha Tenis', normalizedCategory:'other_sports', amountNative:1.609890, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:0.746931, disclosureLevel:'detailed' },
    { rawLabel:'Derecho de Formacion Jugadores', normalizedCategory:'player_sales', amountNative:3.493141, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Sede Social- Medrano 522 CABA', normalizedCategory:'member_dues', amountNative:8.510155, disclosureLevel:'detailed' },
    { rawLabel:'Futbol Ingreso por Partidos', normalizedCategory:'matchday_competition', amountNative:4.585779, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso A.F.A: dcho tv', normalizedCategory:'broadcasting', amountNative:63.647867, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Sede', normalizedCategory:'other_income', amountNative:31.223947, disclosureLevel:'detailed' },
    { rawLabel:'Canon por Alquiler Cancha Tenis', normalizedCategory:'other_sports', amountNative:2.710007, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:7.576691, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Antena', normalizedCategory:'sponsorship_commercial', amountNative:8.609140, disclosureLevel:'detailed' },
    { rawLabel:'Derecho de Formacion Jugadores', normalizedCategory:'player_sales', amountNative:4.294226, disclosureLevel:'detailed' },
    { rawLabel:'Prima por Venta Jugadores', normalizedCategory:'player_sales', amountNative:12.431224, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Sede Social- Medrano 522 CABA', normalizedCategory:'member_dues', amountNative:21.597932, disclosureLevel:'detailed' },
    { rawLabel:'Futbol Ingreso por Partidos', normalizedCategory:'matchday_competition', amountNative:13.070531, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso A.F.A: dicho tv', normalizedCategory:'broadcasting', amountNative:141.876265, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Sede', normalizedCategory:'other_income', amountNative:64.284389, disclosureLevel:'detailed' },
    { rawLabel:'Premio Copa Argentina', normalizedCategory:'competition_bonus', amountNative:12.880987, disclosureLevel:'detailed' },
    { rawLabel:'Canon por Alquiler Cancha Tenis', normalizedCategory:'other_sports', amountNative:6.688637, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:60.013253, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler de Antena', normalizedCategory:'sponsorship_commercial', amountNative:5.724398, disclosureLevel:'detailed' },
    { rawLabel:'Partidos Amistosos', normalizedCategory:'matchday_competition', amountNative:92.406682, disclosureLevel:'detailed' },
    { rawLabel:'Subsidio Otorgado', normalizedCategory:'other_income', amountNative:1.391422, disclosureLevel:'detailed' },
    // Ver comentario de cabecera: interés financiero, pero el propio balance lo mete en
    // Anexo III (Recaudación por Actividades), no en "Resultado financiero" — se deja ahí.
    { rawLabel:'Intereses Fondo de Inversion', normalizedCategory:'other_income', amountNative:3.136055, disclosureLevel:'detailed' },
  ],
};

const almagroArExpenseLinesByYear = {
  2018: [
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-2.668559, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos', normalizedCategory:'admin_general_expense', amountNative:-0.005925, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Contador', normalizedCategory:'admin_general_expense', amountNative:-0.094295, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-0.127403, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de lavandería', normalizedCategory:'other_expenses', amountNative:-0.046597, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-0.089308, disclosureLevel:'detailed' },
    { rawLabel:'Estadías y traslados', normalizedCategory:'match_organisation_expense', amountNative:-2.510006, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-0.241075, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.008287, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres Vivienda para Jugadores', normalizedCategory:'other_expenses', amountNative:-0.270000, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-0.902925, disclosureLevel:'detailed' },
    { rawLabel:'Gastos transmisión radio', normalizedCategory:'other_expenses', amountNative:-0.071000, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler equipo electrógeno', normalizedCategory:'other_expenses', amountNative:-0.030746, disclosureLevel:'detailed' },
    // Anexo V. "Interese perdidos": ver comentario de cabecera, se deja acá (no netInterest).
    { rawLabel:'Interese perdidos', normalizedCategory:'other_expenses', amountNative:-0.349388, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.009476, disclosureLevel:'detailed' },
    { rawLabel:'Impuesto Ley 25413', normalizedCategory:'admin_general_expense', amountNative:-0.266898, disclosureLevel:'detailed' },
    // "Gastos de alimentos": ver comentario de cabecera (judgment call, agrupado con plantel).
    { rawLabel:'Gastos de alimentos', normalizedCategory:'wages_squad', amountNative:-3.911227, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Cuerpo Medico y Tecnico', normalizedCategory:'wages_squad', amountNative:-3.854014, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales', normalizedCategory:'wages_squad', amountNative:-9.919308, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-0.087015, disclosureLevel:'detailed' },
    { rawLabel:'Primas por contrato privado', normalizedCategory:'wages_squad', amountNative:-10.148400, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Policía', normalizedCategory:'match_organisation_expense', amountNative:-0.770550, disclosureLevel:'detailed' },
    { rawLabel:'Juicios', normalizedCategory:'other_expenses', amountNative:-1.777900, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Representación', normalizedCategory:'admin_general_expense', amountNative:-0.288941, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Servicios de Emergencia', normalizedCategory:'match_organisation_expense', amountNative:-0.322734, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler para entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-0.090165, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (Anexo I A y I B)', normalizedCategory:'depreciation', amountNative:-1.735199, disclosureLevel:'detailed' },
  ],
  2019: [
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-1.382787, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos', normalizedCategory:'admin_general_expense', amountNative:-0.000616, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios abogados', normalizedCategory:'admin_general_expense', amountNative:-0.140000, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Contador', normalizedCategory:'admin_general_expense', amountNative:-0.064463, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-0.025926, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Limpieza', normalizedCategory:'admin_general_expense', amountNative:-0.089315, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de lavandería', normalizedCategory:'other_expenses', amountNative:-0.107735, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-0.339986, disclosureLevel:'detailed' },
    { rawLabel:'Estadias y traslados', normalizedCategory:'match_organisation_expense', amountNative:-5.574152, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-0.376407, disclosureLevel:'detailed' },
    { rawLabel:'Eventos', normalizedCategory:'other_expenses', amountNative:-0.471220, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.012825, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-0.042681, disclosureLevel:'detailed' },
    { rawLabel:'Gastos transmisión radio', normalizedCategory:'other_expenses', amountNative:-0.096000, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler Vivienda para jugadores', normalizedCategory:'other_expenses', amountNative:-1.431300, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler equipo electrógeno', normalizedCategory:'other_expenses', amountNative:-0.009245, disclosureLevel:'detailed' },
    { rawLabel:'Interese perdidos', normalizedCategory:'other_expenses', amountNative:-0.363542, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.033046, disclosureLevel:'detailed' },
    { rawLabel:'Impuesto Ley 25413', normalizedCategory:'admin_general_expense', amountNative:-0.338425, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de operación y administrativos', normalizedCategory:'admin_general_expense', amountNative:-10.188062, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Cuerpo Médico y Técnico', normalizedCategory:'wages_squad', amountNative:-4.380000, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales', normalizedCategory:'wages_squad', amountNative:-11.622090, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-0.119456, disclosureLevel:'detailed' },
    { rawLabel:'Primas por contrato privado', normalizedCategory:'wages_squad', amountNative:-10.050000, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Policía', normalizedCategory:'match_organisation_expense', amountNative:-1.311598, disclosureLevel:'detailed' },
    { rawLabel:'Juicios', normalizedCategory:'other_expenses', amountNative:-1.173600, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Representación', normalizedCategory:'admin_general_expense', amountNative:-0.231394, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Servicios de Emergencia', normalizedCategory:'match_organisation_expense', amountNative:-0.084623, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler para entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-0.015869, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (Anexo I A y I B)', normalizedCategory:'depreciation', amountNative:-2.679429, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-1.681382, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos', normalizedCategory:'admin_general_expense', amountNative:-0.002677, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios abogados', normalizedCategory:'admin_general_expense', amountNative:-0.222106, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Contador', normalizedCategory:'admin_general_expense', amountNative:-0.066116, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-0.205120, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Limpieza', normalizedCategory:'admin_general_expense', amountNative:-0.035650, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de lavandería', normalizedCategory:'other_expenses', amountNative:-0.094200, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-0.309646, disclosureLevel:'detailed' },
    { rawLabel:'Estadías y traslados', normalizedCategory:'match_organisation_expense', amountNative:-0.784798, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y Contribuciones', normalizedCategory:'admin_general_expense', amountNative:-0.961237, disclosureLevel:'detailed' },
    { rawLabel:'Servicio de Seguridad', normalizedCategory:'match_organisation_expense', amountNative:-0.015681, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-0.052891, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler Vivienda para jugadores', normalizedCategory:'other_expenses', amountNative:-1.495300, disclosureLevel:'detailed' },
    { rawLabel:'Interese perdidos', normalizedCategory:'other_expenses', amountNative:-0.169330, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.008812, disclosureLevel:'detailed' },
    { rawLabel:'Impuesto Ley 25413', normalizedCategory:'admin_general_expense', amountNative:-0.156418, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de operación y administrativos', normalizedCategory:'admin_general_expense', amountNative:-7.799781, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Cuerpo Médico y Técnico', normalizedCategory:'wages_squad', amountNative:-5.431000, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales', normalizedCategory:'wages_squad', amountNative:-11.563453, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-0.165476, disclosureLevel:'detailed' },
    { rawLabel:'Primas por contrato privado', normalizedCategory:'wages_squad', amountNative:-13.441619, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Policía', normalizedCategory:'match_organisation_expense', amountNative:-0.622820, disclosureLevel:'detailed' },
    { rawLabel:'Juicios', normalizedCategory:'other_expenses', amountNative:-3.773241, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Servicios de Emergencia', normalizedCategory:'match_organisation_expense', amountNative:-0.003636, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler para entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-0.230000, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (Anexo I A y I B)', normalizedCategory:'depreciation', amountNative:-0.717216, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-4.389060, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios abogados', normalizedCategory:'admin_general_expense', amountNative:-0.296345, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Contador', normalizedCategory:'admin_general_expense', amountNative:-0.393684, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-0.080000, disclosureLevel:'detailed' },
    { rawLabel:'Estadías y traslados', normalizedCategory:'match_organisation_expense', amountNative:-5.964474, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler Vivienda para jugadores', normalizedCategory:'other_expenses', amountNative:-3.524642, disclosureLevel:'detailed' },
    { rawLabel:'Interese perdidos', normalizedCategory:'other_expenses', amountNative:-0.146299, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.140192, disclosureLevel:'detailed' },
    { rawLabel:'Impuesto Ley 25413', normalizedCategory:'admin_general_expense', amountNative:-0.721960, disclosureLevel:'detailed' },
    { rawLabel:'Iva no Computable', normalizedCategory:'admin_general_expense', amountNative:-0.028801, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Cuerpo Médico y Técnico', normalizedCategory:'wages_squad', amountNative:-9.695858, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales', normalizedCategory:'wages_squad', amountNative:-16.378791, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-0.357757, disclosureLevel:'detailed' },
    { rawLabel:'Primas por contrato privado', normalizedCategory:'wages_squad', amountNative:-13.834296, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Policía', normalizedCategory:'match_organisation_expense', amountNative:-1.332480, disclosureLevel:'detailed' },
    { rawLabel:'Juicios', normalizedCategory:'other_expenses', amountNative:-4.306324, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler para entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-2.415097, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (Anexo I A y I B)', normalizedCategory:'depreciation', amountNative:-6.118948, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-13.498316, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios abogados', normalizedCategory:'admin_general_expense', amountNative:-0.298349, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Contador', normalizedCategory:'admin_general_expense', amountNative:-0.597491, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Ambulancia para partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.542001, disclosureLevel:'detailed' },
    { rawLabel:'Estadías y traslados', normalizedCategory:'match_organisation_expense', amountNative:-12.995735, disclosureLevel:'detailed' },
    // "Comision por compra Jugadores"/"Comision por Representante": ver comentario de
    // cabecera — comisiones, no costo del pase en sí, quedan en other_expenses.
    { rawLabel:'Comision por compra Jugadores', normalizedCategory:'other_expenses', amountNative:-11.999239, disclosureLevel:'detailed' },
    { rawLabel:'Comision por Representante', normalizedCategory:'other_expenses', amountNative:-1.491747, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler Vivienda para jugadores', normalizedCategory:'other_expenses', amountNative:-7.777297, disclosureLevel:'detailed' },
    // Nota: el "Totales" impreso en Anexo IV dice 49.206.174,97, pero la suma de las líneas
    // de arriba (verificada) da 49.200.174,97 — EXACTO lo que imprime el Estado de
    // Resultados ("GASTOS ESPECIFICOS -Anexos IV | 49.200.174,97"). El "Totales" del propio
    // Anexo IV es un dígito OCR mal leído (206 en vez de 200); se usó la cifra que
    // reconcilia con el Estado de Resultados y con la suma real de sus propias líneas.
    { rawLabel:'Interese perdidos', normalizedCategory:'other_expenses', amountNative:-0.402017, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.091193, disclosureLevel:'detailed' },
    { rawLabel:'Impuesto Ley 25413', normalizedCategory:'admin_general_expense', amountNative:-1.272475, disclosureLevel:'detailed' },
    { rawLabel:'Iva no Computable', normalizedCategory:'admin_general_expense', amountNative:-0.019012, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Cuerpo Medico y Tecnico', normalizedCategory:'wages_squad', amountNative:-9.472593, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales', normalizedCategory:'wages_squad', amountNative:-27.336178, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-0.617660, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales Seg Soc.', normalizedCategory:'wages_squad', amountNative:-0.968079, disclosureLevel:'detailed' },
    { rawLabel:'Multa', normalizedCategory:'other_expenses', amountNative:-0.165178, disclosureLevel:'detailed' },
    { rawLabel:'Percepciones Perdidas', normalizedCategory:'other_expenses', amountNative:-0.001837, disclosureLevel:'detailed' },
    { rawLabel:'Primas por contrato privado', normalizedCategory:'wages_squad', amountNative:-30.506617, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Policía', normalizedCategory:'match_organisation_expense', amountNative:-5.005487, disclosureLevel:'detailed' },
    { rawLabel:'Juicios', normalizedCategory:'other_expenses', amountNative:-10.370035, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler para entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-2.237620, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (Anexo I A y I B)', normalizedCategory:'depreciation', amountNative:-12.234039, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Gastos de mantenimiento', normalizedCategory:'other_expenses', amountNative:-11.670443, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios abogados', normalizedCategory:'admin_general_expense', amountNative:-0.418040, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Contador', normalizedCategory:'admin_general_expense', amountNative:-0.872086, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Ambulancia para partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.728548, disclosureLevel:'detailed' },
    { rawLabel:'Estadias y traslados', normalizedCategory:'match_organisation_expense', amountNative:-34.150721, disclosureLevel:'detailed' },
    // "Gastos Compra Jugadores": costo directo de adquisición (no comisión) -> SÍ
    // player_amortisation, ver comentario de cabecera.
    { rawLabel:'Gastos Compra Jugadores', normalizedCategory:'player_amortisation', amountNative:-6.429223, disclosureLevel:'detailed' },
    { rawLabel:'Comision por Representante', normalizedCategory:'other_expenses', amountNative:-0.850180, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler Vivienda para jugadores', normalizedCategory:'other_expenses', amountNative:-10.844608, disclosureLevel:'detailed' },
    { rawLabel:'Interese perdidos', normalizedCategory:'other_expenses', amountNative:-2.974452, disclosureLevel:'detailed' },
    { rawLabel:'Gastos bancarios', normalizedCategory:'other_expenses', amountNative:-0.501334, disclosureLevel:'detailed' },
    { rawLabel:'Impuesto Ley 25413', normalizedCategory:'admin_general_expense', amountNative:-2.710712, disclosureLevel:'detailed' },
    { rawLabel:'Iva no Computable', normalizedCategory:'admin_general_expense', amountNative:-0.102130, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Cuerpo Medico y Tecnico', normalizedCategory:'wages_squad', amountNative:-18.076651, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales', normalizedCategory:'wages_squad', amountNative:-62.017012, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-1.051960, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales Seg Soc.', normalizedCategory:'wages_squad', amountNative:-0.619418, disclosureLevel:'detailed' },
    { rawLabel:'Multa', normalizedCategory:'other_expenses', amountNative:-0.004495, disclosureLevel:'detailed' },
    { rawLabel:'Primas por contrato privado', normalizedCategory:'wages_squad', amountNative:-98.433000, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Policía', normalizedCategory:'match_organisation_expense', amountNative:-11.308326, disclosureLevel:'detailed' },
    { rawLabel:'Juicios', normalizedCategory:'other_expenses', amountNative:-52.679280, disclosureLevel:'detailed' },
    { rawLabel:'Servicio de Lavandería', normalizedCategory:'other_expenses', amountNative:-0.668864, disclosureLevel:'detailed' },
    { rawLabel:'Alquiler para entrenamiento', normalizedCategory:'match_organisation_expense', amountNative:-8.884901, disclosureLevel:'detailed' },
    { rawLabel:'Amortización (Anexo I A y I B)', normalizedCategory:'depreciation', amountNative:-27.371661, disclosureLevel:'detailed' },
  ],
};

const almagroArFiscalYearMeta = {
  // 2018: único año SIN ambigüedad de rótulo — "RESULTADO DEL EJERCICIO -PERDIDA-" ya es el
  // resultado final (post resultado financiero).
  2018: {
    currency:'ARS', fxRef:'ARS@2018-10-31',
    sourceId:'almagro-ar-balance-2018',
    reportType:'official_balance_sheet',
    gestionId:'romeo',
    grossDebt:3.759419, cash:0.103813,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-60.352422, tax:0,
    officialTotalRevenue:38.350265, officialTotalExpenses:40.597340, officialPAT:-62.599497,
  },
  2019: {
    currency:'ARS', fxRef:'ARS@2019-10-31',
    sourceId:'almagro-ar-balance-2019',
    reportType:'official_balance_sheet',
    gestionId:'romeo',
    grossDebt:2.353080, cash:0.159817,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:2.019200, tax:0,
    officialTotalRevenue:52.333782, officialTotalExpenses:52.755791, officialPAT:1.597190,
  },
  // 2020: único ejercicio de los 6 sin línea de "Resultado financiero" separada — el propio
  // balance va directo de TOTAL GASTOS a "RESULTADO DEL EJERCICIO -GANANCIA-", que es a la
  // vez operativo y final este año. netInterest:0.
  2020: {
    currency:'ARS', fxRef:'ARS@2020-10-31',
    sourceId:'almagro-ar-balance-2020',
    reportType:'official_balance_sheet',
    gestionId:'romeo',
    grossDebt:2.300103, cash:2.445138,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:0,
    officialTotalRevenue:54.472633, officialTotalExpenses:50.009604, officialPAT:4.463029,
  },
  // 2021: ver comentario de cabecera — "RESULTADO DEL EJERCICIO -PERDIDA-" -6.885.940,57 es
  // SOLO el operativo (Recursos-Gastos); officialPAT es "RESULTADO FINAL -PERDIDA-"
  // -10.836.428,30, después de sumar netInterest -3.950.487,73.
  2021: {
    currency:'ARS', fxRef:'ARS@2021-10-31',
    sourceId:'almagro-ar-balance-2021',
    reportType:'official_balance_sheet',
    gestionId:'romeo',
    grossDebt:1.987847, cash:0.149971,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.950488, tax:0,
    officialTotalRevenue:63.239067, officialTotalExpenses:70.125008, officialPAT:-10.836428,
  },
  // 2022: mismo patrón que 2021 — "RESULTADO DEL EJERCICIO -PERDIDA-" -6.311.157,56 es solo
  // el operativo; officialPAT es "RESULTADO FINAL -PERDIDA-" -13.483.786,33.
  2022: {
    currency:'ARS', fxRef:'ARS@2022-10-31',
    sourceId:'almagro-ar-balance-2022',
    reportType:'official_balance_sheet',
    gestionId:'cucchi',
    grossDebt:5.076054, cash:3.899197,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.172629, tax:0,
    officialTotalRevenue:143.589037, officialTotalExpenses:149.900194, officialPAT:-13.483786,
  },
  // 2023: EL CASO MÁS EXTREMO — "RESULTADO DEL EJERCICIO -GANANCIA-" +69.702.506,29
  // (Recursos-Gastos, operativo) se revierte a PÉRDIDA una vez sumado netInterest
  // -72.886.626,53: officialPAT es "RESULTADO FINAL -PERDIDA-" -3.184.120,24 (confirmado
  // también contra el Estado de Evolución del Patrimonio Neto: "Resultado del ejercicio
  // -3.184.120,24"). Ver comentario de cabecera, es la trampa que el pedido original de
  // esta sesión ya anticipaba.
  2023: {
    currency:'ARS', fxRef:'ARS@2023-10-31',
    sourceId:'almagro-ar-balance-2023',
    reportType:'official_balance_sheet',
    gestionId:'cucchi',
    grossDebt:8.350322, cash:8.921025,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-72.886627, tax:0,
    officialTotalRevenue:423.070550, officialTotalExpenses:353.368044, officialPAT:-3.184120,
  },
};

const almagroArPasesData = [];
const almagroArResultadosData = {};
const almagroArTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['almagro-ar'] = {
  revenueLinesByYear: almagroArRevenueLinesByYear, expenseLinesByYear: almagroArExpenseLinesByYear,
  fiscalYearMeta: almagroArFiscalYearMeta, pasesData: almagroArPasesData,
  resultadosData: almagroArResultadosData, titulosData: almagroArTitulosData,
};

Object.assign(sources, {
  'almagro-ar-balance-2018': {
    id:'almagro-ar-balance-2018', clubId:'almagro-ar',
    title:'Balance General (auditado), Ejercicio Económico N°80, al 31/10/2018',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (18 páginas, texto nativo). Presidente: Jorge Julián Romeo (nómina de Comisión Directiva 2016-2018 impresa en el propio balance). Cifras en moneda homogénea (ajuste por inflación, RT 6 FACPCE). Convertido a USD con $35,95, dólar mayorista BCRA de cierre al 31/10/2018 (serie Rava Bursátil) — el balance no declara Anexo de moneda extranjera propio.',
  },
  'almagro-ar-balance-2019': {
    id:'almagro-ar-balance-2019', clubId:'almagro-ar',
    title:'Balance General (auditado), Ejercicio Económico N°81, al 31/10/2019',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (18 páginas, texto nativo). Presidente: Jorge Julián Romeo (nómina 2018-2020). Cifras en moneda homogénea. Convertido a USD con $59,67, dólar mayorista BCRA de cierre al 31/10/2019.',
  },
  'almagro-ar-balance-2020': {
    id:'almagro-ar-balance-2020', clubId:'almagro-ar',
    title:'Memoria y Balance General (auditado), Ejercicio Económico N°82, al 31/10/2020',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (21 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Jorge Julián Romeo (nómina 2018-2020). Único ejercicio de los 6 sin línea de "Resultado financiero" separada. Cifras en moneda homogénea. Convertido a USD con $78,32, dólar mayorista BCRA de la última rueda hábil antes del cierre (viernes 30/10/2020, el 31/10 cayó sábado).',
  },
  'almagro-ar-balance-2021': {
    id:'almagro-ar-balance-2021', clubId:'almagro-ar',
    title:'Balance General (auditado), Ejercicio Económico N°83, al 31/10/2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (15 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Jorge Julián Romeo (nómina 2018-2021 impresa para este ejercicio; el balance se firmó recién en nov/dic 2023, y su Nota 1.4 aclara que Romeo renunció el 23/10/2023 y lo firmó el nuevo presidente Julio Osvaldo Cucchi — no cambia la gestión del ejercicio 2021 en sí). "RESULTADO DEL EJERCICIO -PERDIDA-" (-6.885.940,57) es solo el resultado operativo; el oficial (PAT) es "RESULTADO FINAL -PERDIDA-" (-10.836.428,30), después del resultado financiero. Convertido a USD con $99,72, dólar mayorista BCRA de la última rueda hábil antes del cierre (viernes 29/10/2021, 30 y 31/10 cayeron sábado y domingo).',
  },
  'almagro-ar-balance-2022': {
    id:'almagro-ar-balance-2022', clubId:'almagro-ar',
    title:'Balance General (auditado), Ejercicio Económico N°84, al 31/10/2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (15 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Julio Osvaldo Cucchi (nómina 2021-2024). "RESULTADO DEL EJERCICIO -PERDIDA-" (-6.311.157,56) es solo el resultado operativo; el oficial (PAT) es "RESULTADO FINAL -PERDIDA-" (-13.483.786,33). El "Totales" impreso del Anexo IV (Gastos Específicos) trae un dígito OCR mal leído (49.206.174,97); se usó 49.200.174,97, que reconcilia exacto contra la suma real de sus líneas y contra el Estado de Resultados. Convertido a USD con $156,91, dólar mayorista BCRA de cierre al 31/10/2022.',
  },
  'almagro-ar-balance-2023': {
    id:'almagro-ar-balance-2023', clubId:'almagro-ar',
    title:'Balance General (auditado), Ejercicio Económico N°85, al 31/10/2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (15 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Julio Osvaldo Cucchi (nómina 2021-2024). OJO al leer este ejercicio: "RESULTADO DEL EJERCICIO -GANANCIA-" da +69.702.506,29 (Recursos 423.070.550,27 − Gastos 353.368.043,98), pero el resultado financiero de -72.886.626,53 lo revierte a PÉRDIDA: el oficial (PAT) es "RESULTADO FINAL -PERDIDA-" (-3.184.120,24), confirmado también contra el Estado de Evolución del Patrimonio Neto. Convertido a USD con $350, dólar mayorista BCRA de cierre al 31/10/2023.',
  },
});

gestionesByClub['almagro-ar'] = {
  // Confirmado por la nómina de Comisión Directiva impresa en cada balance (ver comentario
  // de cabecera): Romeo cubre los ejercicios 2018-2021, Cucchi 2022-2023.
  romeo: { nombre:'Romeo (2016-2021)', firstYear:2018, lastYear:2021 },
  cucchi: { nombre:'Cucchi (2021-2024)', firstYear:2022, lastYear:2023 },
};

// No se encontró una cifra pública confiable de cantidad de socios de Club Almagro
// (Medrano 522, CABA) — la búsqueda de esta sesión solo encontró resultados de OTROS clubes
// homónimos ("Almagro" de Santa Fe, San Lorenzo de Almagro). Null es un resultado cerrado,
// no un pendiente (ver club-or-year-onboarding SKILL.md sección 3).
memberCountByClub['almagro-ar'] = null;
