// ============================================================================
// data/dinamozagreb-hr-data.js — Građanski nogometni klub Dinamo (Zagreb, Croacia).
// Primer club croata cargado en el sitio (país nuevo, sesión de onboarding de
// Croacia). clubId 'dinamozagreb-hr' (sufijo de país, convención desde la
// Versión 129).
//
// FUENTE: `Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2024.md`
// (transcripción completa vía pdftotext, ya provista al onboardear el país —
// el PDF SÍ tiene capa de texto nativa, sin necesidad de OCR). Es el informe
// CONSOLIDADO ("Revidirani konsolidirani financijski izvještaji za posebne
// namjene") que integra GNK Dinamo (la udruga/asociación) con sus 2
// subsidiarias 100%-controladas: Dinamo trade d.o.o. (venta de merchandising)
// y Plavi korner d.o.o. (concesiones de bebidas en el estadio). Auditado por
// Forvis Mazars d.o.o., dictamen "Mišljenje s rezervom" (opinión CON
// SALVEDADES, no limpia) — las 3 salvedades son sobre el EJERCICIO DE
// RECONOCIMIENTO de ciertas partidas entre 2023 y 2024 (ingreso UEFA
// Conference League de 1.425.800 EUR, ingreso de transfer de 9.415.287 EUR +
// comisión de 1.883.057 EUR, y una previsión judicial de 1.359.255 EUR — el
// auditor considera que corresponden al ejercicio 2023, no 2024), no sobre la
// exactitud de los montos en sí. Se carga el ejercicio 2024 TAL CUAL lo
// imprime el propio balance (no se ajustan las salvedades del auditor, que
// afectan la comparación INTERANUAL 2023 vs 2024, no la cifra 2024 en sí
// misma). Ejercicio fiscal = año CALENDARIO (1/1 a 31/12/2024, confirmado en
// el propio documento: "za godinu koja završava na dan 31. prosinca 2024.").
//
// Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2024 está 100% en
// EUR sin necesidad de convertir de kuna.
//
// FORMATO DEL DOCUMENTO: plantilla estandarizada del "Pravilnik o
// licenciranju i financijskoj održivosti klubova" de la HNS (Federación
// Croata de Fútbol) — la misma estructura de líneas se repite en los 3
// clubes croatas cargados en esta sesión (Dinamo/Hajduk/Rijeka), lo que
// resultó muy útil para categorizar consistente entre los 3.
//
// PRIHODI (ingresos) 2024, EUR exactos (no en miles):
//   Prihodi od ulaznica (tickets) - ukupno: 6.656.275, desglosado en:
//     Nacionalna natjecanja 1.174.982 + UEFA klupska natjecanja 2.585.754 +
//     VIP ulaznice i hospitality 630.476 + Ostali nerazvrstani 20.733 →
//     matchday_competition (4.411.945 combinado); Godišnje ulaznice
//     (abonos anuales) 1.356.000 → season_tickets; Članarine (membresías)
//     888.330 → member_dues (ver duda en Admin/dudas-por-club.md: la
//     plantilla HNS agrupa "Članarine" DENTRO del bloque de "Prihodi od
//     ulaznica"/tickets, distinto del criterio argentino donde cuotas
//     sociales es un bloque separado de "recaudación de entradas" — se
//     mapeó a member_dues por ser la traducción literal, pero es una
//     categorización con incertidumbre genuina).
//   Prihod od sponzorstva i oglašavanja - Ukupno: 2.904.304 → sponsorship_commercial.
//   Prihodi od prava emitiranja - Ukupno: 1.265.400 → broadcasting.
//   Komercijalni prihodi - Ukupno: 6.380.549, desglosado en Nacionalna
//     natjecanja 1.147.826 + Prodaja proizvoda (merchandising) 5.128.032 →
//     sponsorship_commercial (6.275.858 combinado); Ugostiteljske usluge
//     durante partidos 104.691 → stadium_other (catering de matchday, mismo
//     criterio que "Catering" de 1.FC Köln).
//   Uefine nagrade i solidarne uplate - Ukupno: 32.430.730 (56% del revenue
//     total — el club jugó la fase de liga de la Champions League 2024/25) →
//     competition_bonus (mismo criterio que "Premies Europese competities"
//     de Ajax).
//   Ostali poslovni prihodi - Ukupno: 7.924.977 (donaciones de entidades
//     nacionales/estatales/terceros + partidas sueltas) → other_income.
//   Ukupno - Prihodi (impreso): 57.562.235. Suma de líneas de arriba
//     verificada EXACTA contra este total.
//
// RASHODI (gastos) 2024, ANTES de la sección de transferencias de jugadores:
//   Troškovi prodaje/materijala: -5.073.592 → other_expenses.
//   Troškovi primanja igrača -25.469.684 + Troškovi primanja stručnog
//     stožera -6.532.043 → wages_squad (-32.001.727 combinado, plantel +
//     cuerpo técnico).
//   Trošak primanja ostalih zaposlenika: -6.238.624 → admin_general_expense
//     (resto del personal, no futbolístico).
//   Amortizacija dugotrajne materijalne imovine (tangible): -341.710 →
//     depreciation. Amortizacija ostale nematerijalne imovine, bez
//     registracija igrača (intangible NO relacionado a jugadores): -299.380
//     → other_amortisation.
//   Trošak imovine s pravom korištenja (leasing operativo) -439.748 +
//     Troškovi sponzorstva i oglašavanja -210.882 + Troškovi imovine i
//     objekata -360.394 → admin_general_expense (-1.011.024 combinado).
//   Troškovi utakmica: -2.565.436 → match_organisation_expense.
//   Ostali nerazvrstani poslovni rashodi: -6.662.775 → other_expenses.
//   Ukupno - poslovni rashodi (bez registracija igrača) impreso: -54.194.268.
//     Suma de líneas de arriba verificada EXACTA.
//   Poslovni rezultat (bez registracija igrača) impreso: 3.367.967 (=
//     57.562.235 - 54.194.268, verificado).
//
// SECCIÓN DE TRANSFERENCIAS DE JUGADORES (el documento la muestra APARTE del
// cuerpo principal de Ingresos/Gastos, método de CAPITALIZACIÓN Y
// AMORTIZACIÓN de pases — Dinamo SÍ capitaliza, a diferencia de Hajduk):
//   Amortizacija nematerijalne imovine (registracije igrača): -6.117.746 →
//     PROMOVIDA a línea de gasto propia `player_amortisation` (no metida en
//     el neto de meta, ver club-data-mapping SKILL.md sección 1 — igual
//     criterio que Köln/Ajax: nunca esconder la amortización real de pases
//     en un campo meta cuando el documento la separa como línea propia).
//   Dobit od raspolaganja nematerijalnom imovinom (ganancia por venta de
//     pases) +12.944.185, Dobit/gubitak od ustupanja ostalog osoblja
//     -118.335, Nekapitalizirani troškovi para agentes -1.219.642 → NETEADOS
//     en `fiscalYearMeta.profitOnPlayerSales` = 12.944.185 - 118.335 -
//     1.219.642 = 11.606.208 (mismo criterio que "Resultaat vergoedingssommen"
//     de Ajax: el documento no desglosa el bruto de estos 3 conceptos por
//     separado del resultado neto).
//   Neto rezultat impreso de TODA esta sección (incluyendo la amortización):
//     5.488.462 = -6.117.746 + 11.606.208 ✓ tie-out exacto contra el
//     impreso, confirmando que la separación arriba es fiel.
//
// RESULTADO FINANCIERO (netInterest): Financijski prihodi 14.966 -
//   Financijski rashodi 544.459 - Neto tečajne razlike/gubici 2.543 =
//   -532.036 (impreso exacto).
// assetSales: Ukupno dobit/(gubitak) od raspolaganja (dugotrajnom) imovinom,
//   NO relacionado a pases = -154.714 (impreso exacto).
// tax: Porezni prihod/(rashod) = -784.561.
//
// TIE-OUT FINAL (verificado exacto): revenue 57.562.235 - expenses
//   60.312.014 [= 54.194.268 + 6.117.746 player_amortisation] +
//   profitOnPlayerSales 11.606.208 + assetSales -154.714 + netInterest
//   -532.036 + tax -784.561 = 7.385.118 = Dobit(gubitak) poslije oporezivanja
//   impreso EXACTO.
//
// MONEDA: EUR. El documento no declara tipo de cambio propio a USD (no hay
// Anexo de moneda extranjera con TC de cierre) — se usa fxRef a FX_CLOSE
// (data/currency-map.js), que YA tenía la fecha necesitada (EUR@2024-12-31)
// antes de esta carga.
//
// grossDebt: Bankovni i ostali zajmovi (bank loans), corriente 3.700.000 +
//   no corriente 0 = 3.700.000. Se usó SOLO esta línea (deuda financiera
//   real), EXCLUYENDO obveze prema agentima/dobavljačima/zaposlenicima
//   (pasivos operativos, no deuda financiera) y obračunati troškovi/
//   rezerviranja (devengados/previsiones) — mismo criterio angosto que
//   Boca/Vélez/Köln/Ajax (club-data-mapping SKILL.md sección 14). cash:
//   Novac i novčani ekvivalenti = 562.542.
//
// GESTIÓN: la Uprava (directorio ejecutivo) cambió de composición DENTRO del
// ejercicio 2024 (Vlatka Peras presidenta hasta 23/5/2024, Zvonimir Manenica
// desde 5/6/2024) — sin un único responsable identificable para todo el
// ejercicio, gestionId genérico 'actual', sin entrada nominal en
// gestionesByClub (ya no es obligatorio, ver club-or-year-onboarding SKILL.md
// sección 16).
// ============================================================================

const dinamozagrebHrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Prihodi od ulaznica — Nacionalna natjecanja + UEFA klupska natjecanja + VIP ulaznice i hospitality + ostalo nerazvrstano', normalizedCategory:'matchday_competition', amountNative:4.411945, disclosureLevel:'detailed', items:[
      ['Nacionalna natjecanja', 1.174982], ['UEFA klupska natjecanja', 2.585754],
      ['VIP ulaznice i hospitality', 0.630476], ['Ostali nerazvrstani prihodi od ulaznica', 0.020733],
    ]},
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:1.356000, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Članarine', normalizedCategory:'member_dues', amountNative:0.888330, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja', normalizedCategory:'sponsorship_commercial', amountNative:2.904304, disclosureLevel:'detailed', items:[
      ['Sponzor za opremu (proizvođač sprava)', 1.107500], ['Glavni sponzor na opremi', 0.765809],
      ['Ostali nerazvrstani prihodi od sponzorstva i oglašavanja', 1.030995],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:1.265400, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi — Nacionalna natjecanja + Prodaja proizvoda', normalizedCategory:'sponsorship_commercial', amountNative:6.275858, disclosureLevel:'detailed', items:[
      ['Komercijalni prihodi - Nacionalna natjecanja', 1.147826], ['Komercijalni prihodi - Prodaja proizvoda (merchandising)', 5.128032],
    ]},
    { rawLabel:'Komercijalni prihodi - Ugostiteljske usluge za vrijeme odigravanja utakmica', normalizedCategory:'stadium_other', amountNative:0.104691, disclosureLevel:'detailed' },
    { rawLabel:'Uefine nagrade i solidarne uplate', normalizedCategory:'competition_bonus', amountNative:32.430730, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi', normalizedCategory:'other_income', amountNative:7.924977, disclosureLevel:'detailed', items:[
      ['Donacije od nacionalnih nogometnih tijela', 0.014000], ['Donacije/dotacije od države i lokalne samouprave', 1.697500],
      ['Donacije nepovezanih strana', 0.150000], ['Ostali nerazvrstani poslovni prihodi', 6.063477],
    ]},
  ],
};

const dinamozagrebHrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Troškovi prodaje/materijala', normalizedCategory:'other_expenses', amountNative:-5.073592, disclosureLevel:'detailed', items:[
      ['Troškovi prodaje robe/proizvoda - izravni', -2.189318], ['Troškovi prodaje robe/proizvoda - ostali nerazvrstani', -2.884274],
    ]},
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-32.001727, disclosureLevel:'detailed', items:[
      ['Troškovi primanja igrača', -25.469684], ['Troškovi primanja stručnog stožera', -6.532043],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika', normalizedCategory:'admin_general_expense', amountNative:-6.238624, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-0.341710, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija ostale nematerijalne imovine (bez registracija igrača)', normalizedCategory:'other_amortisation', amountNative:-0.299380, disclosureLevel:'detailed' },
    { rawLabel:'Trošak imovine s pravom korištenja + Troškovi sponzorstva i oglašavanja + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-1.011024, disclosureLevel:'detailed', items:[
      ['Trošak imovine s pravom korištenja (operativni najam)', -0.439748], ['Troškovi sponzorstva i oglašavanja', -0.210882],
      ['Troškovi imovine i objekata', -0.360394],
    ]},
    { rawLabel:'Troškovi utakmica', normalizedCategory:'match_organisation_expense', amountNative:-2.565436, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-6.662775, disclosureLevel:'detailed' },
    // Amortizacija nematerijalne imovine (registracije igrača) — promovida a línea propia, ver
    // comentario de cabecera (no se netea con profitOnPlayerSales).
    { rawLabel:'Amortizacija nematerijalne imovine (registracije igrača)', normalizedCategory:'player_amortisation', amountNative:-6.117746, disclosureLevel:'detailed' },
  ],
};

const dinamozagrebHrFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'dinamozagreb-hr-financijsko-izvjesce-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Dobit od raspolaganja nematerijalnom imovinom (12.944.185) + Dobit/gubitak od ustupanja
    // ostalog osoblja (-118.335) + Nekapitalizirani troškovi za naknade agentima (-1.219.642).
    // Ver comentario de cabecera para el tie-out completo de esta sección.
    profitOnPlayerSales:11.606208,
    // Ukupno - dobit/(gubitak) od raspolaganja (dugotrajnom) imovinom, no relacionado a pases.
    assetSales:-0.154714,
    // Financijski prihodi(14.966) - Financijski rashodi(544.459) - Neto tečajne razlike(2.543).
    netInterest:-0.532036,
    tax:-0.784561,
    // grossDebt = Bankovni i ostali zajmovi (corriente 3.700.000 + no corriente 0). cash = Novac i
    // novčani ekvivalenti.
    grossDebt:3.700000, cash:0.562542,
    officialTotalRevenue:57.562235, officialTotalExpenses:60.312014, officialPAT:7.385118,
  },
};

const dinamozagrebHrPresupuestoOverlayByYear = {};

const dinamozagrebHrPasesData = [];
const dinamozagrebHrResultadosData = {};
const dinamozagrebHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dinamozagreb-hr'] = {
  revenueLinesByYear: dinamozagrebHrRevenueLinesByYear, expenseLinesByYear: dinamozagrebHrExpenseLinesByYear,
  fiscalYearMeta: dinamozagrebHrFiscalYearMeta, pasesData: dinamozagrebHrPasesData,
  resultadosData: dinamozagrebHrResultadosData, titulosData: dinamozagrebHrTitulosData,
  presupuestoOverlayByYear: dinamozagrebHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'dinamozagreb-hr-financijsko-izvjesce-2024': {
    id:'dinamozagreb-hr-financijsko-izvjesce-2024', clubId:'dinamozagreb-hr',
    title:'Revidirani konsolidirani financijski izvještaji za posebne namjene za 2024. godinu',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado CONSOLIDADO (GNK Dinamo + Dinamo trade d.o.o. + Plavi korner d.o.o., 100% controladas), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de la HNS (Federación Croata de Fútbol). Auditor: Forvis Mazars d.o.o. Dictamen "Mišljenje s rezervom" (opinión con 3 salvedades sobre el EJERCICIO de reconocimiento de ciertas partidas entre 2023/2024, ver comentario de cabecera de data/dinamozagreb-hr-data.js) — no afecta la exactitud del ejercicio 2024 tal cual se carga acá. Transcripción completa en Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2024.md.',
  },
});

gestionesByClub['dinamozagreb-hr'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['dinamozagreb-hr'] = null;
