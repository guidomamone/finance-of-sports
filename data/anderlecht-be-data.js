// ============================================================================
// data/anderlecht-be-data.js — Royal Sporting Club Anderlecht (Bélgica). Uno de
// 4 clubes belgas de la Pro League cargados en esta sesión (onboarding de
// Bélgica como país nuevo): Club Brugge, Anderlecht, Genk, Gent.
//
// FUENTE: `Clubes/Bélgica/Anderlecht/jaarrekening-2025-06-30-individual.md`
// (única versión disponible para este club, no hay consolidado). Cierre
// 30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto
// nativa.
//
// FORMATO DEL DOCUMENTO: jaarrekening estatutario belga, esquema "VOL-kap"
// (NV/sociedad anónima) del Belgisch Wetboek van Vennootschappen — MUCHO menos
// desglosado que el IFRS consolidado de Club Brugge: el P&L tiene solo 4 líneas
// de ingreso operativo (Omzet/Andere bedrijfsopbrengsten/Niet-recurrente) y las
// notas de desglose numérico (6.10, "Uitsplitsing van de omzet per
// bedrijfscategorie/geografische markt") están LEGALMENTE PRESENTES en el
// formulario pero SIN NINGÚN VALOR CARGADO (el club optó por no divulgar ese
// nivel de detalle, permitido bajo el régimen belga salvo que sea significativo
// — ver club-data-mapping SKILL.md sección 1, "lump_football_operations" es
// justamente para este caso).
//
// INGRESOS (Resultatenrekening, códigos NBB, EUR):
//   Omzet (turnover) — SIN desglose numérico disponible (Nota 6.10 vacía).
//     El "Jaarverslag" (informe de gestión) solo dice, en prosa, que el
//     crecimiento vino de "comerciales, participación europea y venta de
//     jugadores de la Academia" — sin montos por concepto        91.304983 → lump_football_operations
//   Andere bedrijfsopbrengsten — el Jaarverslag dice explícito que consiste
//     "voornamelijk" (mayormente) en la plusvalía por transferencia de
//     jugadores COMPRADOS + recupero de bedrijfsvoorheffing (retención
//     impositiva sobre sueldos de jugadores) — se categoriza por el
//     componente mayoritario declarado, sin poder separar el resto      19.517775 → player_sales
//   Niet-recurrente bedrijfsopbrengsten (sin detalle)                    0.185851 → other_income
// Total: 111.008609 vs 111.008.608,63 impreso (exacto, redondeo <1 EUR).
//
// PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): si Anderlecht pudiera
// confirmar la separación de "Omzet" entre ticketing/sponsors/TV, y qué
// proporción de "Andere bedrijfsopbrengsten" es específicamente plusvalía de
// pases vs. recupero impositivo.
//
// GASTOS (Resultatenrekening, códigos NBB):
//   Aankopen handelsgoederen (compra de mercadería, incl. variación de
//     stock)                                                    -3.983067 → other_expenses
//   Diensten en diverse goederen (servicios y bienes diversos —
//     sin más desglose disponible en la fuente)                -35.897374 → other_expenses
//   Bezoldigingen (sueldos, sin separar plantel de resto del personal —
//     el Jaarverslag dice que el aumento se debe a "inversiones en el
//     plantel Y en la Academia propia", mezclado)               -53.328314 → wages_squad
//   Afschrijvingen (código 630, depreciación/amortización de intangibles y
//     bienes de uso) — el Jaarverslag dice "grotendeels" (mayormente)
//     amortización de pases                                     -10.832766 → player_amortisation
//   Waardeverminderingen op voorraden/vorderingen (código 631/4,
//     deterioro de inventario/cuentas a cobrar, no relacionado a jugadores) -0.505416 → other_expenses
//   Andere bedrijfskosten                                        -1.662686 → other_expenses
//   Voorzieningen voor risico's en kosten (provisiones)           -0.199000 → exceptional_items
//   Niet-recurrente bedrijfskosten — el Jaarverslag dice que son
//     "grotendeels" deterioros NO recurrentes sobre pases          -2.948383 → player_impairment
// Total: -109.357006 vs -109.357.006 impreso (exacto).
//
// RESULTADO FINANCIERO (netInterest): Financieel resultaat impreso en el
// resumen del Jaarverslag: -1.309.868,79 → -1.309869 (Financiële opbrengsten
// 0.167880 - Financiële kosten 1.477749, niet-recurrente financiële
// opbrengsten/kosten = 0 los dos).
//
// TAX: Belastingen op het resultaat -0.232140.
//
// TIE-OUT (verificado): 111.008609 - 109.357006 - 1.309869 - 0.232140 =
// 0.109594, vs "Te bestemmen winst (verlies) van het boekjaar" impreso
// 109.593,19 (0.109593) — diferencia de EUR 1, redondeo acumulado.
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).
//
// grossDebt: "Schulden op meer dan één jaar" (16.298798) + "Schulden op ten
// hoogste één jaar" (40.767437) = 57.066235, EXCLUYENDO "Voorzieningen en
// uitgestelde belastingen" (2.143270) y "Overlopende rekeningen" (8.657720,
// ingresos diferidos) — mismo criterio de Köln/Boca. cash: "Liquide middelen"
// (1.516035). Total activa = Total pasiva = 73.063219.
//
// GESTIÓN: no se identificó con confianza un único responsable/accionista de
// control para todo el ejercicio (Anderlecht tuvo un cambio de estructura
// accionaria — Vandenhaute/Coucke — en años recientes, sin confirmar la fecha
// exacta dentro de este ejercicio puntual) → gestionId: null.
// ============================================================================

const anderlechtBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:91.304983, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'player_sales', amountNative:19.517775, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.185851, disclosureLevel:'aggregated' },
  ],
};

const anderlechtBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankopen handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-3.983067, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-35.897374, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-53.328314, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'player_amortisation', amountNative:-10.832766, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen', normalizedCategory:'other_expenses', amountNative:-0.505416, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-1.662686, disclosureLevel:'aggregated' },
    { rawLabel:"Voorzieningen voor risico's en kosten", normalizedCategory:'exceptional_items', amountNative:-0.199000, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'player_impairment', amountNative:-2.948383, disclosureLevel:'aggregated' },
  ],
};

const anderlechtBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'anderlecht-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-1.309869,
    tax:-0.232140,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden op meer dan één jaar + Schulden op ten hoogste één jaar, EXCLUYE
    // Voorzieningen en uitgestelde belastingen y Overlopende rekeningen. cash = Liquide middelen.
    grossDebt:57.066235, cash:1.516035,
    officialTotalRevenue:111.008609, officialTotalExpenses:109.158006, /* excluye exceptional_items (-0.199), ver Admin/CONVENCIONES / criterio Chelsea */ officialPAT:0.109593,
  },
};

const anderlechtBePresupuestoOverlayByYear = {};

const anderlechtBePasesData = [];
const anderlechtBeResultadosData = {};
const anderlechtBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['anderlecht-be'] = {
  revenueLinesByYear: anderlechtBeRevenueLinesByYear, expenseLinesByYear: anderlechtBeExpenseLinesByYear,
  fiscalYearMeta: anderlechtBeFiscalYearMeta, pasesData: anderlechtBePasesData,
  resultadosData: anderlechtBeResultadosData, titulosData: anderlechtBeTitulosData,
  presupuestoOverlayByYear: anderlechtBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'anderlecht-be-jaarrekening-2025': {
    id:'anderlecht-be-jaarrekening-2025', clubId:'anderlecht-be',
    title:'Jaarrekening van Royal Sporting Club Anderlecht NV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Anderlecht/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet) y detalle numérico de "Andere bedrijfsopbrengsten" no fueron completados por el club en este filing.',
  },
});

memberCountByClub['anderlecht-be'] = null;
