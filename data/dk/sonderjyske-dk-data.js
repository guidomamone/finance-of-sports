// GENERADO desde data/dk/sonderjyske-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const sonderjyskeDkRevenueLinesByYear = {
  2022: [
    {"rawLabel":"Kompensation for aflyste arrangementer og lønomkostninger, COVID-19 (Note \"Særlige poster\")","normalizedCategory":"other_income","amountNative":16.311422,"disclosureLevel":"detailed"},
    {"rawLabel":"Bruttofortjeneste, resto (nettoomsætning, vareforbrug, andre driftsindtægter og eksterne omkostninger sammendraget, § 32 ÅRL — NO es revenue bruto)","normalizedCategory":"lump_football_operations","amountNative":5.153565,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Bruttofortjeneste/Bruttotab","normalizedCategory":"lump_football_operations","amountNative":41.600084,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Bruttofortjeneste/Bruttotab","normalizedCategory":"lump_football_operations","amountNative":37.431315,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Nettoomsætning","normalizedCategory":"lump_football_operations","amountNative":66.288538,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsindtægter","normalizedCategory":"other_income","amountNative":0.116122,"disclosureLevel":"aggregated"},
  ],
};

const sonderjyskeDkExpenseLinesByYear = {
  2022: [
    {"rawLabel":"Personaleomkostninger","normalizedCategory":"wages_squad","amountNative":-50.298641,"disclosureLevel":"detailed","items":[["Lønninger",-45.442396],["Pensioner",-1.453435],["Andre omkostninger til social sikring",-0.607087],["Andre personaleomkostninger",-2.795723]]},
    {"rawLabel":"Årets afskrivninger — Kontraktrettigheder (immaterielle anlægsaktiver)","normalizedCategory":"player_amortisation","amountNative":-2.229341,"disclosureLevel":"detailed"},
    {"rawLabel":"Årets afskrivninger — materielle anlægsaktiver","normalizedCategory":"depreciation","amountNative":-0.397022,"disclosureLevel":"detailed","items":[["Andre anlæg, driftsmateriel og inventar",-0.297495],["Indretning af lejede lokaler",-0.099527]]},
  ],
  2023: [
    {"rawLabel":"Løn og gager","normalizedCategory":"wages_squad","amountNative":-48.195491,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensionsbidrag","normalizedCategory":"wages_squad","amountNative":-1.671142,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-0.724382,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre personaleomkostninger","normalizedCategory":"wages_squad","amountNative":-2.427605,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kontraktsrettigheder","normalizedCategory":"player_amortisation","amountNative":-2.478449,"disclosureLevel":"aggregated"},
    {"rawLabel":"Indretning lejede lokaler","normalizedCategory":"depreciation","amountNative":-0.246657,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre anlæg, driftsmateriel og inventar","normalizedCategory":"depreciation","amountNative":-0.255959,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Løn og gager","normalizedCategory":"wages_squad","amountNative":-36.933678,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensionsbidrag","normalizedCategory":"wages_squad","amountNative":-1.252567,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-0.671495,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre personaleomkostninger","normalizedCategory":"wages_squad","amountNative":-2.159485,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kontraktsrettigheder","normalizedCategory":"player_amortisation","amountNative":-1.669092,"disclosureLevel":"aggregated"},
    {"rawLabel":"Indretning lejede lokaler","normalizedCategory":"depreciation","amountNative":-0.22706,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre anlæg, driftsmateriel og inventar","normalizedCategory":"depreciation","amountNative":-0.171744,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Vareforbrug","normalizedCategory":"other_expenses","amountNative":-2.032057,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre eksterne omkostninger","normalizedCategory":"other_expenses","amountNative":-28.683802,"disclosureLevel":"aggregated"},
    {"rawLabel":"Løn og gager","normalizedCategory":"wages_squad","amountNative":-43.991746,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensionsbidrag","normalizedCategory":"wages_squad","amountNative":-1.633184,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-0.757445,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kontraktsrettigheder","normalizedCategory":"player_amortisation","amountNative":-3.100932,"disclosureLevel":"aggregated"},
    {"rawLabel":"Indretning lejede lokaler","normalizedCategory":"depreciation","amountNative":-0.471721,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre anlæg, driftsmateriel og inventar","normalizedCategory":"depreciation","amountNative":-0.234028,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsomkostninger","normalizedCategory":"other_expenses","amountNative":-0.314752,"disclosureLevel":"aggregated"},
  ],
};

const sonderjyskeDkFiscalYearMeta = {
  2022: {"currency":"DKK","sourceId":"sonderjyske-dk-aarsrapport-2022","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2022-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.522751,"tax":0,"grossDebt":14.080333,"cash":0.014547,"officialTotalRevenue":21.464987,"officialTotalExpenses":52.925004,"officialPAT":-31.982769},
  2023: {"currency":"DKK","sourceId":"sonderjyske-dk-aarsrapport-2022-2023-09-30-transicion","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2023-09-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.798938,"tax":4.132991,"grossDebt":null,"cash":null,"officialTotalRevenue":41.600084,"officialTotalExpenses":55.999685,"officialPAT":-11.065548,"extraRows":[{"label":"Andre finansielle indtægter","value":0.022386},{"label":"Øvrige finansielle omkostninger","value":-0.821324},{"label":"Skat af årets resultat","value":4.132991}],"sinDesglose":[{"renglon":"Bruttofortjeneste/Bruttotab","lado":"revenue","importe":41.600084,"motivo":"el documento no desglosa este renglón"}]},
  2024: {"currency":"DKK","sourceId":"sonderjyske-dk-aarsrapport-2024-09-30","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2024-09-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.846555,"tax":1.746248,"grossDebt":null,"cash":null,"officialTotalRevenue":37.431315,"officialTotalExpenses":43.085121,"officialPAT":-4.754113,"extraRows":[{"label":"Andre finansielle indtægter","value":0.010526},{"label":"Øvrige finansielle omkostninger","value":-0.857081},{"label":"Skat af årets resultat","value":1.746248}],"sinDesglose":[{"renglon":"Bruttofortjeneste/Bruttotab","lado":"revenue","importe":37.431315,"motivo":"el documento no desglosa este renglón"}]},
  2025: {"currency":"DKK","sourceId":"sonderjyske-dk-aarsrapport-2025-09-30","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2025-09-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.414407,"tax":3.762243,"grossDebt":null,"cash":null,"officialTotalRevenue":66.40466,"officialTotalExpenses":81.219667,"officialPAT":-11.467171,"extraRows":[{"label":"Finansielle indtægter","value":0.532637},{"label":"Finansielle omkostninger","value":-0.947044},{"label":"Skat af årets resultat","value":3.762243}],"sinDesglose":[{"renglon":"Nettoomsætning","lado":"revenue","importe":66.288538,"motivo":"el documento no desglosa este renglón"}]},
};

const sonderjyskeDkPresupuestoOverlayByYear = {};

const sonderjyskeDkPasesData = [];
const sonderjyskeDkResultadosData = {};
const sonderjyskeDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["sonderjyske-dk"] = {
  revenueLinesByYear: sonderjyskeDkRevenueLinesByYear, expenseLinesByYear: sonderjyskeDkExpenseLinesByYear,
  fiscalYearMeta: sonderjyskeDkFiscalYearMeta, pasesData: sonderjyskeDkPasesData,
  resultadosData: sonderjyskeDkResultadosData, titulosData: sonderjyskeDkTitulosData,
  presupuestoOverlayByYear: sonderjyskeDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"sonderjyske-dk-aarsrapport-2022":{"id":"sonderjyske-dk-aarsrapport-2022","clubId":"sonderjyske-dk","title":"Sønderjyske Fodbold A/S — Årsrapport 2021/22 (01.07.2021 - 30.06.2022)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzLzcyL2YwLzVlL2FiLzlkMGQtNDZlMy05ZGJhLWZhMjA5Y2E4MzcyMw.pdf"},"sonderjyske-dk-aarsrapport-2024-09-30":{"id":"sonderjyske-dk-aarsrapport-2024-09-30","clubId":"sonderjyske-dk","title":"Sønderjyske Fodbold A/S — aarsrapport-2024-09-30 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2YxLzBjLzMxLzFmLzJjZWMtNDI3YS05OWUwLWM1Njc4ZjUyNjg4NQ.xhtml","documento":"Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.pdf"},"sonderjyske-dk-aarsrapport-2022-2023-09-30-transicion":{"id":"sonderjyske-dk-aarsrapport-2022-2023-09-30-transicion","clubId":"sonderjyske-dk","title":"Sønderjyske Fodbold A/S — aarsrapport-2022-2023-09-30-transicion (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-2023-09-30-transicion.pdf","publicNote":"Informe oficial en formato XHTML (iXBRL)","url":"http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2U0L2M4L2I1L2UxL2VmMzgtNDNkNC1hOGMyLTAwMTA0Zjc2NzkwMQ.xhtml"},"sonderjyske-dk-aarsrapport-2025-09-30":{"id":"sonderjyske-dk-aarsrapport-2025-09-30","clubId":"sonderjyske-dk","title":"Sønderjyske Fodbold A/S — aarsrapport-2025-09-30 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Dinamarca/SønderjyskE/aarsrapport-2025-09-30.pdf","publicNote":"Informe oficial en formato XHTML (iXBRL). Hasta 2024 el club publicaba el balance resumido (solo el margen bruto, Årsregnskabsloven § 32); desde 2025 publica el estado de resultados completo, con ventas y gastos por separado. Por eso los ingresos y gastos de 2025 no son comparables con los de 2022 a 2024: el salto es de formato, no de actividad.","url":"http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2Y0L2UwLzY1L2NmL2NlMmEtNGI3Ny1iYjdiLTRiYjQyNmQyNmUwMw.xhtml"}});

memberCountByClub["sonderjyske-dk"] = null;
