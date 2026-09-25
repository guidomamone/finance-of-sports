// ============================================================================
// data/sinttruiden-be-data.js — Koninklijke Sint-Truidense Voetbalvereniging NV
// (STVV, Bélgica). Uno de 3 clubes belgas + 1 danés cargados en esta sesión
// (2da tanda de onboarding, 20 transcripts más, 4 clubes totalmente nuevos).
//
// FUENTE: `Clubes/Bélgica/Sint-Truiden/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, cuentas INDIVIDUALES, no hay consolidado). Cierre
// 30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto
// nativa. Esquema estatutario belga "VOL-kap" (NV), en neerlandés. Accionistas:
// Spacenine Co. Ltd. y la holding DG Holdings LLC (grupo japonés), firmaron
// una "comfort letter" de sostén financiero hasta la asamblea que trate el
// balance a 30/6/2027 (VOL-kap 6.20, pág. 39) — el patrimonio venía activando
// el art. 7:228 WVV, y el propio jaarverslag dice explícito que "door enkele
// transfers van spelers in het begin van het nieuwe boekjaar" (2025-26) se
// espera resultado positivo suficiente para dejar de aplicar ese artículo.
//
// INGRESOS (Resultatenrekening pág. 9 + Nota 6.10 pág. 25, EUR):
//   Omzet (turnover, código 70) — Nota 6.10 tiene los encabezados
//     "Uitsplitsing per bedrijfscategorie"/"per geografische markt" pero
//     SIN ningún valor completado debajo (a diferencia de Club Brugge)
//                                                                  20.175525 → lump_football_operations
//   Andere bedrijfsopbrengsten (código 74, total 16.004064, más que TRIPLICÓ
//     el ejercicio anterior de 4.488435) — la Nota 6.10 solo completa el
//     sub-ítem de subsidios (740); el resto (70,4% de esta línea, 35% del
//     revenue total del club) queda SIN explicar en ningún lado del
//     documento — no hay, a diferencia de Mechelen, ninguna frase del
//     jaarverslag que lo atribuya a resultado de transferencias (la única
//     mención de "transfers" en todo el documento es sobre el ejercicio
//     SIGUIENTE, 2025-26, pág. 39). Dado el salto de magnitud y que STVV es
//     conocido como club "puente" del grupo japonés propietario hacia Europa,
//     es plausible que sea total o parcialmente resultado de pases, pero no
//     hay evidencia textual en ESTE documento — se categoriza conservadoramente
//     como other_income, no player_sales, y se anota como PREGUNTA ABIERTA de
//     alta prioridad en Admin/dudas-por-club.md:
//     - Exploitatiesubsidies en vanwege de overheid ontvangen compenserende
//       bedragen (740, disclosed)                                  3.319965 → other_income
//     - Resto sin desglosar (16.004064-3.319965)                   12.684099 → other_income
//   Niet-recurrente bedrijfsopbrengsten (76A): 0 este ejercicio, no se carga línea.
// Total revenueLines: 20.175525+3.319965+12.684099 = 36.179589 vs.
//   "Bedrijfsopbrengsten" (70/76A) impreso 36.179.589, exacto.
//
// GASTOS (Resultatenrekening pág. 9 + Notas 6.2.3/6.3.1-6.3.3 pág. 12-16 +
// Nota 6.10 pág. 25-26):
//   Handelsgoederen, grond- en hulpstoffen (código 60, compras 546931 -
//     variación de stock 3497)                                    -0.543434 → other_expenses
//   Diensten en diverse goederen (código 61, sin más desglose)    -10.439201 → other_expenses
//   Bezoldigingen, sociale lasten en pensioenen (código 62, todo el personal
//     de la sociedad — 80 empleados/72,6 FTE, sin separar plantel de resto,
//     Nota 6.10)                                                 -16.332861 → wages_squad
//     items: Bezoldigingen y ventajas sociales directas 13.201481 +
//       Contribuciones patronales seg. social 1.962508 + Premias seguros
//       extralegales 0.093944 + Otros costos de personal 1.074929
//   Afschrijvingen (código 630, total P&L 1.260990) — PROMOVIDO a 2 líneas
//     según el detalle de movimiento de activos fijos (Notas 6.2.3/6.3.1-3,
//     columna "Geboekt" del ejercicio, no el saldo acumulado a cierre):
//     intangible (código 8072, derechos de jugadores) 1.043877; tangible
//     (códigos 8271+8272+8273: 0.119448+0.073697+0.023969=0.217114):
//     - Amortización spelersregistratierechten (intangibles)      -1.043877 → player_amortisation
//     - Depreciación activo material (terrenos+instalaciones+mobiliario)
//                                                                  -0.217114 → depreciation
//       items: Terrenos y edificios 0.119448 + Instalaciones/máquinas
//       0.073697 + Mobiliario/rodante 0.023969
//     (suma 1.260991, diferencia de EUR 1 contra el código 630 impreso,
//     redondeo)
//   Waardeverminderingen op voorraden/handelsvorderingen (código 631/4,
//     esta vez un COSTO neto — Geboekt > Teruggenomen, a diferencia del
//     crédito de Zulte Waregem/Charleroi este mismo ejercicio)      -0.092231 → other_expenses
//   Voorzieningen voor risico's en kosten (635/8): 0 este ejercicio, no se
//     carga línea.
//   Andere bedrijfskosten (código 640/8, total 236.106) — PROMOVIDO a 2
//     líneas según Nota 6.10 pág. 26 (impuestos SIEMPRE admin_general_expense,
//     club-data-mapping sección 17):
//     - Bedrijfsbelastingen en -taksen (640)                       -0.222326 → admin_general_expense
//     - Andere (641/8)                                             -0.013780 → other_expenses
//     (suma 0.236106, exacto)
//   Niet-recurrente bedrijfskosten (código 66A, 2.300.000, sin desglose
//     legible más allá del total — Nota 6.12 pág. 28, tabla con layout
//     degradado por el propio pdftotext -layout del documento; se usa el
//     total impreso, sin desagregar en sub-ítems) — mismo criterio que 76A
//     del lado de ingresos de Zulte Waregem: forma parte del cuerpo de
//     Bedrijfskosten, se categoriza exceptional_items, no se saca a un campo
//     meta aparte                                                 -2.300000 → exceptional_items
// Total expenseLines: -31.204823, exacto contra "Bedrijfskosten" (60/66A)
//   impreso (31.204.823).
//
// PREGUNTA ABIERTA #2 (anotada en Admin/dudas-por-club.md): a qué corresponde
// el "Niet-recurrente bedrijfskosten" de 2,3 M EUR (código 66A) — el documento
// no lo explica en prosa en ningún lado (jaarverslag ni notas).
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten (75/76B, 0.154449:
//   751 Opbrengsten uit vlottende activa 0.073204 + 752/9 Andere 0.081245) -
//   Financiële kosten (65/66B, 0.635594: 650 Kosten van schulden 0.451082 +
//   652/9 Andere 0.184512) = 0.154449 - 0.635594 = -0.481145.
//
// TAX: Belastingen op het resultaat (código 67/77, todo en 670/3, sin
//   regularización ni movimiento de impuestos diferidos este ejercicio —
//   780/680 en blanco) → tax = -0.873978.
//
// TIE-OUT (verificado exacto contra los 4 subtotales impresos, pág. 9-10):
//   Bedrijfsopbrengsten 36.179589 - Bedrijfskosten 31.204823 = Bedrijfswinst
//   4.974766 (código 9901, exacto). 4.974766 + netInterest(-0.481145) =
//   4.493621 = Winst vóór belasting (código 9903, exacto). 4.493621 +
//   tax(-0.873978) = 3.619643 ≈ Winst van het boekjaar impreso (códigos
//   9904/9905: 3.619.642, diferencia de EUR 1, redondeo del propio
//   documento) → officialPAT.
//   officialTotalRevenue/officialTotalExpenses EXCLUYEN el único ítem
//   exceptional_items (-2.300000 gasto, no hay ingreso excepcional este
//   ejercicio), mismo criterio que Zulte Waregem/Charleroi/Club Brugge:
//   officialTotalRevenue = 36.179589 (sin cambios, no hay exceptional en
//   ingresos); officialTotalExpenses = 31.204823-2.300000 = 28.904823.
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).
//
// grossDebt: "Schulden op meer dan één jaar" (13.473982) + "Schulden op ten
// hoogste één jaar" (10.816129) = 24.290111, EXCLUYENDO "Overlopende
// rekeningen" (4.743682, ingresos diferidos/gastos a pagar, sub-categoría
// separada dentro de Schulden en este balance, pág. 8) — mismo criterio que
// Zulte Waregem/Charleroi/Mechelen/Club Brugge. Este balance no tiene línea
// de "Voorzieningen" separada (no aparece en el pasivo). cash: "Liquide
// middelen" (código 54/58, 3.805795). Total activa = Total pasiva = 30.803707
// (balance cuadra, pág. 8 y jaarverslag pág. 42).
//
// GESTIÓN: el Raad van Bestuur es mayoritariamente japonés (accionista de
// control: Spacenine Co. Ltd / DG Holdings LLC), con 2 "Gedelegeerd
// bestuurder" (Tateishi Takayuki, Muranaka Yusuke) pero SIN un "Voorzitter"
// explícito identificado en la lista de administradores (pág. 2-3) → gestionId:
// null, sin entrada en gestionesByClub (ver club-or-year-onboarding sección
// 16: ya no es obligatorio inventar una entrada solo por robustez técnica).
// ============================================================================

const sinttruidenBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:20.175525, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen', normalizedCategory:'other_income', amountNative:3.319965, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfsopbrengsten — resto sin desglosar', normalizedCategory:'other_income', amountNative:12.684099, disclosureLevel:'aggregated' },
  ],
};

const sinttruidenBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-0.543434, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-10.439201, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-16.332861, disclosureLevel:'detailed', items:[
      ['Bezoldigingen en rechtstreekse sociale voordelen', 13.201481], ['Werkgeversbijdragen voor sociale verzekeringen', 1.962508], ['Werkgeverspremies voor bovenwettelijke verzekeringen', 0.093944], ['Andere personeelskosten', 1.074929],
    ]},
    { rawLabel:'Afschrijvingen op immateriële vaste activa (spelersregistratierechten)', normalizedCategory:'player_amortisation', amountNative:-1.043877, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.217114, disclosureLevel:'detailed', items:[
      ['Terreinen en gebouwen', 0.119448], ['Installaties, machines en uitrusting', 0.073697], ['Meubilair en rollend materieel', 0.023969],
    ]},
    { rawLabel:'Waardeverminderingen op voorraden en handelsvorderingen', normalizedCategory:'other_expenses', amountNative:-0.092231, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten — Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.222326, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfskosten — Andere', normalizedCategory:'other_expenses', amountNative:-0.013780, disclosureLevel:'detailed' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-2.300000, disclosureLevel:'aggregated' },
  ],
};

const sinttruidenBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'sinttruiden-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Financiële opbrengsten (0.154449) - Financiële kosten (0.635594).
    netInterest:-0.481145,
    // Belastingen op het resultaat (670/3), sin movimiento de diferidos este ejercicio.
    tax:-0.873978,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden op meer dan één jaar + Schulden op ten hoogste één jaar, EXCLUYE
    // Overlopende rekeningen. cash = Liquide middelen.
    grossDebt:24.290111, cash:3.805795,
    // officialTotalExpenses EXCLUYE el ítem exceptional_items (-2.300000, niet-recurrente
    // bedrijfskosten), mismo criterio que Zulte Waregem/Charleroi/Club Brugge.
    officialTotalRevenue:36.179589, officialTotalExpenses:28.904823, officialPAT:3.619642,
  },
};

const sinttruidenBePresupuestoOverlayByYear = {};

const sinttruidenBePasesData = [];
const sinttruidenBeResultadosData = {};
const sinttruidenBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sinttruiden-be'] = {
  revenueLinesByYear: sinttruidenBeRevenueLinesByYear, expenseLinesByYear: sinttruidenBeExpenseLinesByYear,
  fiscalYearMeta: sinttruidenBeFiscalYearMeta, pasesData: sinttruidenBePasesData,
  resultadosData: sinttruidenBeResultadosData, titulosData: sinttruidenBeTitulosData,
  presupuestoOverlayByYear: sinttruidenBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sinttruiden-be-jaarrekening-2025': {
    id:'sinttruiden-be-jaarrekening-2025', clubId:'sinttruiden-be',
    title:'Jaarrekening van Koninklijke Sint-Truidense Voetbalvereniging NV (STVV) voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB), esquema estatutario VOL-kap. PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Sint-Truiden/jaarrekening-2025-06-30-individual.md. "Andere bedrijfsopbrengsten" (16,0 M EUR, 44% del revenue) solo desglosa el componente de subsidios estatales (3,3 M); el resto (12,7 M, 35% del revenue total) no tiene explicación en el documento — ver comentario de cabecera del archivo de datos y Admin/dudas-por-club.md. Accionistas (Spacenine Co. Ltd / DG Holdings LLC, grupo japonés) firmaron una comfort letter de sostén financiero.',
  },
});

memberCountByClub['sinttruiden-be'] = null;
