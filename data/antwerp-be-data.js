// ============================================================================
// data/antwerp-be-data.js — Royal Antwerp Football Club NV / RAFC (Bélgica).
// Club nuevo, cargado en paralelo con otros 3 agentes sobre este mismo repo
// (cada uno con su propio club, sin tocar archivos ajenos).
//
// FUENTE: `Clubes/Bélgica/Antwerp/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
// 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto nativa. Depositado
// en la Balanscentrale de la Nationale Bank van België (NBB), formato VOL-kap
// (NV/sociedad anónima), igual esquema que Anderlecht.
//
// FORMATO DEL DOCUMENTO: jaarrekening estatutario belga VOL-kap individual,
// MUCHO menos desglosado que el IFRS consolidado de Club Brugge, muy parecido
// a Anderlecht. El P&L (Resultatenrekening, pág. 9-10) tiene solo 3 líneas de
// ingreso operativo (Omzet/Andere bedrijfsopbrengsten/Niet-recurrente), y la
// Nota 6.10 ("Uitsplitsing van de omzet per bedrijfscategorie/geografische
// markt") está LEGALMENTE PRESENTE en el formulario pero SIN NINGÚN VALOR
// CARGADO — mismo caso que Anderlecht, ver club-data-mapping SKILL.md
// sección 1 ("lump_football_operations" es justamente para esto).
//
// INGRESOS (Resultatenrekening, códigos NBB, EUR, pág. 9):
//   Omzet (turnover) — SIN desglose numérico disponible (Nota 6.10, códigos
//     70/71/72, vacía). El Jaarverslag (informe de gestión, pág. 43) solo
//     dice en prosa que la mejora se debe a "meer omzet en beheersing van de
//     kosten" (más facturación y control de costos), sin monto por
//     concepto                                                43.351487 → lump_football_operations
//   Andere bedrijfsopbrengsten (código 74) — a diferencia de Anderlecht, el
//     Jaarverslag de Antwerp NO dice que esta línea consista "mayormente" en
//     plusvalía por venta de jugadores: la ÚNICA sub-partida que la Nota 6.10
//     sí completa es "Exploitatiesubsidies en vanwege de overheid ontvangen
//     compenserende bedragen" (código 740, subsidios operativos/compensación
//     estatal) = 11.682618 de los 46.460900 totales. El resto (34.778282) no
//     tiene desglose disponible en esta fuente — podría incluir plusvalía por
//     transferencias (el club sí tuvo bajas de pases en el ejercicio, ver
//     Staat van de immateriële vaste activa, "Overdrachten en
//     buitengebruikstellingen" 31.599492 a costo), pero sin una afirmación
//     explícita del documento no se fuerza esa categoría (ver PREGUNTA
//     ABIERTA abajo)                                            46.460900 → other_income
//     (items: Exploitatiesubsidies 11.682618 + Overige sin desglose 34.778282)
//   Niet-recurrente bedrijfsopbrengsten (código 76A) = 0 este ejercicio
//     (Nota 6.12: toda la actividad "niet-recurrente" del año fue del lado de
//     gastos) — no se carga una línea en $0.
// Total: 43.351487 + 46.460900 = 89.812387 vs 89.812.387 impreso (exacto).
//
// PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): si Antwerp pudiera
// confirmar la composición de "Andere bedrijfsopbrengsten" más allá de los
// subsidios (¿cuánto es plusvalía de pases vendidos durante el ejercicio,
// cuánto es otro concepto?), y si "Omzet" se puede abrir por
// ticketing/sponsors/TV.
//
// GASTOS (Resultatenrekening + Nota 6.10 + Staat van de materiële/immateriële
// vaste activa, para separar el código 630 en su componente de pases vs.
// bienes de uso — la única línea de Antwerp con desglose derivable exacto):
//   Handelsgoederen, grond- en hulpstoffen (Aankopen 4.185547 + Voorraad
//     50.637)                                                  -4.236184 → other_expenses
//   Diensten en diverse goederen (sin más desglose disponible
//     en la fuente — a diferencia de Club Brugge, Antwerp no completó
//     la nota de detalle de esta línea)                        -28.290772 → other_expenses
//   Bezoldigingen, sociale lasten en pensioenen (sin separar plantel de
//     resto del personal — 145 empleados/118 FTE al cierre, Nota 6.10,
//     sin desglose por departamento)                            -42.479869 → wages_squad
//   Afschrijvingen en waardeverminderingen op oprichtingskosten, op
//     immateriële en materiële vaste activa (código 630) — SE PUDO separar
//     con exactitud cruzando 2 notas de detalle (Staat van de immateriële
//     vaste activa "Geboekt" 6.162963 + Staat van de materiële vaste activa,
//     suma de "Geboekt" de sus 4 sub-cuentas 0.134734+0.185850+0.071035+
//     0.486568=0.878187; total 6.162963+0.878187=7.041150, exacto contra el
//     código 630 del P&L):
//       Amortización de pases (immateriële vaste activa)         -6.162963 → player_amortisation
//       Depreciación de bienes de uso (materiële vaste activa)   -0.878187 → depreciation
//   Waardeverminderingen op voorraden/vorderingen (código 631/4,
//     deterioro de inventario/cuentas a cobrar, no relacionado a
//     jugadores)                                                 -0.042904 → other_expenses
//   Voorzieningen voor risico's en kosten (código 635/8) — CRÉDITO neto
//     (reversión de previsión, el pasivo "Voorzieningen" bajó de 213.502 a 0
//     en el balance)                                             +0.213502 → exceptional_items
//   Andere bedrijfskosten (código 640/8) — Nota 6.10 SÍ completa el
//     desglose en 2 sub-partidas con categoría real distinta, se promueven
//     a líneas propias (mismo criterio de club-data-mapping SKILL.md
//     sección 1):
//       Bedrijfsbelastingen en -taksen (impuestos, código 640)   -0.189605 → admin_general_expense
//       Andere (código 641/8, sin más desglose)                  -2.136177 → other_expenses
//   Niet-recurrente bedrijfskosten (código 66A) — Nota 6.12: 100% es
//     "Minderwaarde bij de realisatie van immateriële vaste activa" (código
//     6630, pérdida contable en la baja de un pase) — mismo concepto que
//     "Minderwaarde bij de overdracht van spelersregistratierechten" de
//     Club Brugge                                                -0.074116 → player_impairment
// Total: -4.236184-28.290772-42.479869-7.041150-0.042904+0.213502-2.325782-0.074116
//   = -84.277275 vs -84.277.275 impreso (exacto).
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten (75/76B,
// recurrente 0.555191 + niet-recurrente 0) - Financiële kosten (65/66B,
// recurrente 5.253491 + niet-recurrente 0.550000 = 5.803491) = -5.248300.
// Verificado contra "Winst voor belasting" impreso: Bedrijfswinst 5.535112 +
// (-5.248300) = 0.286812, vs 286.811,55 impreso (exacto, redondeo <1 EUR).
//
// TAX: Belastingen op het resultaat -0.802638 (código 67/77, incluye
// Belastingen 0.984826 - Regularisering/terugneming 0.182187).
//
// TIE-OUT (verificado): 89.812387 (revenue) - 84.277275 (expenses, TODAS las
// líneas incluido el crédito de exceptional_items) - 5.248300 (netInterest) -
// 0.802638 (tax) = -0.515826, vs "Verlies van het boekjaar" impreso
// -515.826,89 (-0.515827) — diferencia de EUR 1, redondeo acumulado (mismo
// orden de magnitud que Anderlecht/Club Brugge).
//
// officialTotalExpenses (84.490777) EXCLUYE la línea exceptional_items
// (+0.213502 crédito) del total de gastos, mismo criterio que
// Anderlecht/Club Brugge ("ver Admin/CONVENCIONES / criterio Chelsea"):
// 84.277275 + 0.213502 = 84.490777.
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE, no se tocó
// data/currency-map.js).
//
// grossDebt: "Schulden op meer dan één jaar" (16.561432) + "Schulden op ten
// hoogste één jaar" (34.187456) = 50.748888, EXCLUYENDO "Overlopende
// rekeningen" (12.487870, ingresos diferidos/gastos devengados — que en este
// balance vive DENTRO del grupo "SCHULDEN" pero se excluye igual, mismo
// criterio que Anderlecht/Köln/Boca: Schulden op meer dan één jaar +
// Schulden op ten hoogste één jaar + Overlopende rekeningen = 63.236758,
// que es el total impreso de "SCHULDEN", y de ahí se resta la porción de
// ingresos diferidos). cash: "Liquide middelen" (4.159718). Total activa =
// Total pasiva = 52.596797 (balance cuadra). Eigen vermogen (patrimonio neto)
// es NEGATIVO: -10.639961 — el propio Jaarverslag (pág. 41 y 45) dedica una
// sección entera a justificar la continuidad de la empresa pese a este
// patrimonio negativo (respaldo del accionista mayoritario Goala BV/Paul
// Gheysens + ingresos por transferencias post-cierre de EUR 44.745.000).
//
// GESTIÓN: Goala BV (accionista mayoritario, UBO = Paul Gheysens, dueño
// públicamente conocido del club desde 2016) tiene el mandato de "Gedelegeerd
// bestuurder" (administrador delegado) desde 2024-01-19, y el propio
// documento lo identifica repetidamente como "hoofdaandeelhouder" (accionista
// principal) del club → gestionId: 'actual'.
// ============================================================================

const antwerpBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:43.351487, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:46.460900, disclosureLevel:'aggregated', items:[
      ['Exploitatiesubsidies en compenserende bedragen (Nota 6.10)', 11.682618], ['Overige (sin más desglose en la fuente)', 34.778282],
    ]},
  ],
};

const antwerpBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-4.236184, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-28.290772, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-42.479869, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen — immateriële vaste activa (pases)', normalizedCategory:'player_amortisation', amountNative:-6.162963, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen — materiële vaste activa (bienes de uso)', normalizedCategory:'depreciation', amountNative:-0.878187, disclosureLevel:'detailed' },
    { rawLabel:'Waardeverminderingen op voorraden en handelsvorderingen', normalizedCategory:'other_expenses', amountNative:-0.042904, disclosureLevel:'aggregated' },
    { rawLabel:"Voorzieningen voor risico's en kosten (terugneming)", normalizedCategory:'exceptional_items', amountNative:0.213502, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten — bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.189605, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfskosten — overige', normalizedCategory:'other_expenses', amountNative:-2.136177, disclosureLevel:'detailed' },
    { rawLabel:'Niet-recurrente bedrijfskosten (minderwaarde bij realisatie van immateriële vaste activa)', normalizedCategory:'player_impairment', amountNative:-0.074116, disclosureLevel:'aggregated' },
  ],
};

const antwerpBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'antwerp-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Financiële opbrengsten (0.555191) - Financiële kosten (5.803491).
    netInterest:-5.248300,
    tax:-0.802638,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden op meer dan één jaar (16.561432) + Schulden op ten hoogste één jaar
    // (34.187456), EXCLUYE Overlopende rekeningen (12.487870, diferidos). cash = Liquide middelen.
    grossDebt:50.748888, cash:4.159718,
    officialTotalRevenue:89.812387, officialTotalExpenses:84.490777, /* excluye exceptional_items (+0.213502 crédito), ver criterio Chelsea */ officialPAT:-0.515827,
  },
};

const antwerpBePresupuestoOverlayByYear = {};

const antwerpBePasesData = [];
const antwerpBeResultadosData = {};
const antwerpBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['antwerp-be'] = {
  revenueLinesByYear: antwerpBeRevenueLinesByYear, expenseLinesByYear: antwerpBeExpenseLinesByYear,
  fiscalYearMeta: antwerpBeFiscalYearMeta, pasesData: antwerpBePasesData,
  resultadosData: antwerpBeResultadosData, titulosData: antwerpBeTitulosData,
  presupuestoOverlayByYear: antwerpBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'antwerp-be-jaarrekening-2025': {
    id:'antwerp-be-jaarrekening-2025', clubId:'antwerp-be',
    title:'Jaarrekening van Royal Antwerp Football Club NV (RAFC) voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Antwerp/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet por categoría/mercado geográfico) no fue completada por el club en este filing; solo se completó el sub-detalle de subsidios operativos dentro de "Andere bedrijfsopbrengsten" y el desglose de "Andere bedrijfskosten". Patrimonio neto negativo al cierre (-EUR 10,64 M); el propio Jaarverslag documenta el respaldo del accionista mayoritario y la mejora post-cierre por ventas de jugadores.',
  },
});

gestionesByClub['antwerp-be'] = {
  actual: { nombre:'Paul Gheysens (hoofdaandeelhouder, via Goala BV)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['antwerp-be'] = null;
