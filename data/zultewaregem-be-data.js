// ============================================================================
// data/zultewaregem-be-data.js — SV Zulte Waregem (entidad legal "Grensverleggend
// NV", Bélgica). Uno de 3 clubes belgas + 1 danés cargados en esta sesión
// (2da tanda de onboarding, 20 transcripts más, 4 clubes totalmente nuevos).
//
// FUENTE: `Clubes/Bélgica/Zulte Waregem/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, cuentas INDIVIDUALES, no hay consolidado). Cierre
// 30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto
// nativa. Esquema estatutario belga "VOL-kap" (NV), en neerlandés.
//
// INGRESOS (Resultatenrekening pág. 8-9 + Nota 6.10 pág. 24-25, EUR):
//   Omzet (turnover, código 70) — Nota 6.10 solo repite el mismo total sin
//     desglose por categoría de actividad ni por rubro (a diferencia de Club
//     Brugge)                                                     13.087991 → lump_football_operations
//   Voorraad goederen in bewerking: toename (afname) (código 71, ajuste de
//     inventario, negativo este ejercicio, sin más explicación disponible en
//     el documento)                                                -0.405752 → other_income
//   Andere bedrijfsopbrengsten (código 74, total 3.180514) — la Nota 6.10 solo
//     completa el sub-ítem de subsidios (código 740); el resto queda sin
//     desglosar en ningún lado del documento (ni la nota ni el jaarverslag):
//     - Exploitatiesubsidies en vanwege de overheid ontvangen compenserende
//       bedragen (740, disclosed)                                  1.800180 → other_income
//     - Resto sin desglosar (3.180514-1.800180)                     1.380334 → other_income
//       (ver PREGUNTA ABIERTA abajo — a diferencia de Mechelen, acá no hay
//       ninguna frase del jaarverslag que atribuya este residuo a resultado de
//       transferencias, así que NO se asume player_sales)
//   Niet-recurrente bedrijfsopbrengsten (código 76A, "Andere niet-recurrente
//     bedrijfsopbrengsten", código 764/8) — el jaarverslag (pág. 45, punto
//     11a "Tegenstrijdige belangen") menciona que la sociedad "haar laatste
//     commerciële ruimte verkocht" (vendió su último espacio comercial) en
//     este mismo ejercicio a una empresa vinculada a parte del Raad van
//     Bestuur — consistente en magnitud y timing con esta línea, aunque el
//     documento no ata el monto exacto a esa venta explícitamente. Sigue en
//     revenueLines (no a un campo meta aparte) porque SÍ forma parte del
//     cuerpo principal de Recursos, a diferencia de netInterest/tax. CORREGIDO
//     en la integración: se había categorizado `exceptional_items`, pero esa
//     categoría es de la taxonomía de GASTOS, no existe del lado de Ingresos —
//     `other_income` es el equivalente correcto acá (detectado por
//     `node tools/audit.js`, `categoria-cruzada`, P2)  2.630436 → other_income
// Total revenueLines: 13.087991-0.405752+1.800180+1.380334+2.630436 = 18.493189
//   vs. "Bedrijfsopbrengsten" (70/76A) impreso 18.493.189, exacto.
//
// PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): a qué corresponde el
// residuo sin desglosar de "Andere bedrijfsopbrengsten" (1,38 M€, ~7,5% del
// revenue) y si el monto de "Niet-recurrente bedrijfsopbrengsten" (2,63 M€)
// corresponde en efecto a la venta del "laatste commerciële ruimte" mencionada
// en el jaarverslag.
//
// GASTOS (Resultatenrekening pág. 8 + Notas 6.2.3/6.3.1-6.3.3 pág. 11-14 +
// Nota 6.10 pág. 25):
//   Handelsgoederen, grond- en hulpstoffen (código 60, compras, sin variación
//     de stock separable en el documento)                        -1.840720 → other_expenses
//   Diensten en diverse goederen (código 61, sin más desglose disponible)
//                                                                  -3.571494 → other_expenses
//   Bezoldigingen, sociale lasten en pensioenen (código 62, todo el personal
//     de la sociedad — 89 empleados/65,3 FTE, sin separar plantel de resto,
//     Nota 6.10)                                                 -11.116049 → wages_squad
//     items: Bezoldigingen y ventajas sociales directas 7.137040 +
//       Contribuciones patronales seg. social 1.086382 + Premias seguros
//       extralegales 0.597252 + Otros costos de personal 2.295375
//   Afschrijvingen (código 630, total P&L 2.585230) — PROMOVIDO a 2 líneas
//     según el detalle de movimiento de activos fijos (Notas 6.2.3/6.3.1-3,
//     tomando la columna "Geboekt" del ejercicio, NO el saldo acumulado a
//     cierre): intangible (código 8072, derechos de inscripción de
//     jugadores) 1.453102; tangible (códigos 8271+8272+8273:
//     986.809+139.695+5.625=1.132129):
//     - Amortización droits/spelersregistratierechten (intangibles)
//                                                                  -1.453102 → player_amortisation
//     - Depreciación activo material (terrenos+instalaciones+mobiliario)
//                                                                  -1.132129 → depreciation
//       items: Terrenos y edificios 0.986809 + Instalaciones/máquinas
//       0.139695 + Mobiliario/rodante 0.005625
//     (suma 2.585231, diferencia de EUR 1 contra el código 630 impreso,
//     redondeo)
//   Waardeverminderingen op voorraden/handelsvorderingen (código 631/4,
//     -10.309, un NETO CRÉDITO — Teruggenomen > Geboekt este ejercicio, mismo
//     código/criterio que Charleroi)                                +0.010309 → other_expenses
//   Voorzieningen voor risico's en kosten: toevoegingen (código 635/8, mismo
//     código/criterio que Charleroi: provisión → exceptional_items)  -0.063715 → exceptional_items
//   Andere bedrijfskosten (código 640/8, total 177.913) — PROMOVIDO a 2 líneas
//     según Nota 6.10 pág. 25 (impuestos SIEMPRE admin_general_expense,
//     club-data-mapping sección 17):
//     - Bedrijfsbelastingen en -taksen (640)                       -0.151095 → admin_general_expense
//     - Andere (641/8)                                             -0.026818 → other_expenses
//     (suma 0.177913, exacto)
//   Niet-recurrente bedrijfskosten (código 66A, sin desglose adicional
//     disponible en la Nota 6.12, mismo criterio que 76A del lado de
//     ingresos: forma parte del cuerpo de Bedrijfskosten, no se saca a un
//     campo meta)                                                  -0.023333 → exceptional_items
// Total expenseLines: -19.368146, exacto contra "Bedrijfskosten" (60/66A)
//   impreso (19.368.146).
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten (75/76B, 0.310235:
//   751 Opbrengsten uit vlottende activa 0.024386 + 752/9 Andere 0.285849) -
//   Financiële kosten (65/66B, 3.699229: 650 Kosten van schulden 0.723893 +
//   651 Waardeverminderingen (neto crédito) -0.485506 + 652/9 Andere 0.196277
//   + 66B niet-recurrente 3.264564) = 0.310235 - 3.699229 = -3.388994.
//
// TAX: Belastingen op het resultaat (código 67/77: 670/3 Belastingen 0.049264
//   - 77 Regularisering 0.008485 = 0.040779, un COSTO) neteado contra
//   Onttrekking aan de uitgestelde belastingen (código 780, 0.061137, un
//   CRÉDITO) → tax = -0.040779+0.061137 = +0.020358 (beneficio neto,
//   impulsado por la liberación de un pasivo por impuesto diferido — mismo
//   criterio de "actuales + diferidos combinados" que ya usa Club Brugge).
//
// TIE-OUT (verificado exacto contra los 4 subtotales impresos, pág. 8-9):
//   Bedrijfsopbrengsten 18.493189 - Bedrijfskosten 19.368146 = Bedrijfswinst
//   -0.874957 (código 9901, exacto). -0.874957 + netInterest(-3.388994) =
//   -4.263951 = Winst vóór belasting (código 9903, exacto). -4.263951 +
//   tax(0.020358) = -4.243593 = Winst van het boekjaar (códigos 9904/9905,
//   exacto) → officialPAT.
//   officialTotalExpenses EXCLUYE los ítems exceptional_items de gasto
//   (-0.023333-0.063715=-0.087048), mismo criterio que Charleroi/Club Brugge
//   ("excluye exceptional_items, mismo criterio que Chelsea"): 19.368146-0.087048
//   = 19.281098. CORREGIDO en la integración: `officialTotalRevenue` NO se le
//   aplica el mismo criterio — `computeYearGeneric()` (js/finanzas-calc.js) suma
//   revenue como el total CRUDO de `revenueLines` sin excluir ninguna categoría
//   (a diferencia de `expenses`, que sí excluye `exceptional_items` a propósito),
//   así que restarle el ingreso `exceptional_items` acá lo desalineaba del
//   cálculo real del motor. `officialTotalRevenue` = 18.493189 (el total
//   impreso completo, "Bedrijfsopbrengsten"), sin excluir nada — detectado por
//   `node tools/audit.js` (`no-cierra`, P0).
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).
//
// grossDebt: "Schulden op meer dan één jaar" (20.206342) + "Schulden op ten
// hoogste één jaar" (9.241695) = 29.448037, EXCLUYENDO "Overlopende
// rekeningen" (0.763317, ingresos diferidos/gastos a pagar, sub-categoría
// separada dentro de Schulden en este balance) y "Voorzieningen" (0.482418,
// línea de pasivo separada) — mismo criterio que Charleroi/Mechelen/Club
// Brugge. cash: "Geldbeleggingen & liquide middelen" (0.629659). Total activa
// = Total pasiva = 30.969101 (balance cuadra, ver jaarverslag pág. 42).
//
// CONTEXTO DE SOLVENCIA (no afecta la carga de datos, relevante para leer el
// balance): el eigen vermogen (patrimonio neto) cerró NEGATIVO (-0.728241 M
// EUR), activando el procedimiento de alarma del art. 7:228/7:229 del código
// de sociedades belga (mismo tipo de situación que Mechelen). Se hizo un
// aumento de capital de 7.000.000 EUR durante el ejercicio (70.000 acciones
// nuevas) para reforzar la posición, aunque el patrimonio siguió negativo al
// cierre. El club descendió de Jupiler Pro League a Challenger Pro League al
// final de la temporada 2022-2023 (jaarverslag pág. 43), con impacto directo
// en ingresos de ticketing/sponsoring/TV desde entonces — relevante para
// interpretar por qué el ejercicio 2024/25 todavía se juega en 2da división
// (ver nota de liga abajo).
//
// GESTIÓN: el listado de administradores (pág. 2) no identifica ningún cargo
// de "Voorzitter" (todos figuran como "Bestuurder" a secas, incluida la
// sociedad Detaellenaere-Coppens NV) → gestionId: null, sin entrada en
// gestionesByClub (ver club-or-year-onboarding sección 16: ya no es
// obligatorio inventar una entrada solo por robustez técnica).
// ============================================================================

const zultewaregemBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:13.087991, disclosureLevel:'aggregated' },
    { rawLabel:'Voorraad goederen in bewerking: toename (afname)', normalizedCategory:'other_income', amountNative:-0.405752, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen', normalizedCategory:'other_income', amountNative:1.800180, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfsopbrengsten — resto sin desglosar', normalizedCategory:'other_income', amountNative:1.380334, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten (probablemente venta de un inmueble comercial, según jaarverslag)', normalizedCategory:'other_income', amountNative:2.630436, disclosureLevel:'aggregated' },
  ],
};

const zultewaregemBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-1.840720, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-3.571494, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-11.116049, disclosureLevel:'detailed', items:[
      ['Bezoldigingen en rechtstreekse sociale voordelen', 7.137040], ['Werkgeversbijdragen voor sociale verzekeringen', 1.086382], ['Werkgeverspremies voor bovenwettelijke verzekeringen', 0.597252], ['Andere personeelskosten', 2.295375],
    ]},
    { rawLabel:'Afschrijvingen op immateriële vaste activa (spelersregistratierechten)', normalizedCategory:'player_amortisation', amountNative:-1.453102, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-1.132129, disclosureLevel:'detailed', items:[
      ['Terreinen en gebouwen', 0.986809], ['Installaties, machines en uitrusting', 0.139695], ['Meubilair en rollend materieel', 0.005625],
    ]},
    { rawLabel:'Waardeverminderingen op voorraden en handelsvorderingen (netto terugneming)', normalizedCategory:'other_expenses', amountNative:0.010309, disclosureLevel:'aggregated' },
    { rawLabel:"Voorzieningen voor risico's en kosten", normalizedCategory:'exceptional_items', amountNative:-0.063715, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten — Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.151095, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfskosten — Andere', normalizedCategory:'other_expenses', amountNative:-0.026818, disclosureLevel:'detailed' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.023333, disclosureLevel:'aggregated' },
  ],
};

const zultewaregemBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'zultewaregem-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Financiële opbrengsten (0.310235) - Financiële kosten (3.699229).
    netInterest:-3.388994,
    // Belastingen (670/3, -0.040779) + Onttrekking aan de uitgestelde belastingen (780, +0.061137).
    tax:0.020358,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden op meer dan één jaar + Schulden op ten hoogste één jaar, EXCLUYE
    // Overlopende rekeningen y Voorzieningen. cash = Geldbeleggingen & liquide middelen.
    grossDebt:29.448037, cash:0.629659,
    // officialTotalExpenses EXCLUYE el ítem exceptional_items de gasto (mismo criterio que
    // Charleroi/Club Brugge, "Chelsea"). officialTotalRevenue NO excluye nada (ver comentario
    // de cabecera, corregido en la integración).
    officialTotalRevenue:18.493189, officialTotalExpenses:19.281098, officialPAT:-4.243593,
  },
};

const zultewaregemBePresupuestoOverlayByYear = {};

const zultewaregemBePasesData = [];
const zultewaregemBeResultadosData = {};
const zultewaregemBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['zultewaregem-be'] = {
  revenueLinesByYear: zultewaregemBeRevenueLinesByYear, expenseLinesByYear: zultewaregemBeExpenseLinesByYear,
  fiscalYearMeta: zultewaregemBeFiscalYearMeta, pasesData: zultewaregemBePasesData,
  resultadosData: zultewaregemBeResultadosData, titulosData: zultewaregemBeTitulosData,
  presupuestoOverlayByYear: zultewaregemBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'zultewaregem-be-jaarrekening-2025': {
    id:'zultewaregem-be-jaarrekening-2025', clubId:'zultewaregem-be',
    title:'Jaarrekening van Grensverleggend NV (SV Zulte Waregem) voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB), esquema estatutario VOL-kap. PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Zulte Waregem/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet por categoría/mercado geográfico) no fue completada por el club en este filing; "Andere bedrijfsopbrengsten" solo desglosa el componente de subsidios estatales, el resto queda sin especificar. Patrimonio neto negativo al cierre (-0,73 M EUR), procedimiento de alarma societaria activo, resuelto parcialmente con un aumento de capital de 7 M EUR durante el ejercicio.',
  },
});

memberCountByClub['zultewaregem-be'] = null;
