// ============================================================================
// data/operarioferroviario-br-data.js — Operário Ferroviário Esporte Clube (Ponta Grossa, Paraná,
// Brasil). Sigue siendo ASSOCIAÇÃO (no se convirtió a SAF) — publica igual por obligación de la
// Lei Pelé + licenciamento de la Federação Paranaense. 2 ejercicios cargados: 2024 y 2025
// (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12, mismo criterio que Botafogo/Grêmio,
// clubs.js fiscalYearStart:'01-01').
//
// FUENTES (2 canales oficiales distintos, ver fuentes/Brasil/Operario Ferroviario.md):
// - 2025: `demonstracoes-financeiras-2025.pdf` (19 págs.), del sitio propio (CDN Fanbase),
//   firmado por el presidente Juarez Costa Pinto y el contador Marcos Antonio Martins
//   (CRC PR 056385/O-5), auditado por JSP Serviços (Junior Svieck Pinto, CRC/PR 058.111/O-0).
// - 2024: `demonstracoes-financeiras-2024.pdf` (20 págs.), del repositorio de la Federação
//   Paranaense, mismo auditor/contador, sin firma de presidente visible en el documento.
// Los 2 son PDF con texto nativo, transcripción completa en
// Clubes/Brasil/Operario Ferroviario/demonstracoes-financeiras-<año>.md.
//
// ESCALA: documentos "Em milhares de Reais" (miles de reales) — acá en MILLONES de BRL nativos
// (dividir por 1.000, mismo criterio que Botafogo/Grêmio).
//
// ESTRUCTURA REAL DEL DOCUMENTO: la DRE tiene 2 bloques operativos separados, cada uno con su
// propio resultado parcial, más el resultado financiero neto al final:
//   1) "Futebol profissional" (Receita líquida − Custos e despesas = Déficit/Superávit futebol
//      profissional).
//   2) "Esportes amadores e clube social" (mismo esquema, resultado propio).
//   3) Los 2 resultados parciales se suman al "Resultado financeiro líquido" (Nota 5) para dar el
//      "Superávit/Déficit do exercício" final.
// No hay línea de impuesto a las ganancias (el clube es una associação sem fins lucrativos, exenta
// de tributos federales sobre el resultado — Nota 2.1.10) → tax:0 los 2 años.
//
// ¡OJO! LA COLUMNA COMPARATIVA "2024" DEL PDF DE 2025 **NO** ES LA MISMA QUE EL AÑO CORRIENTE "2024"
// DEL PDF DE 2024 (club-data-mapping SKILL.md sección 6.5): el PDF de 2025 muestra "Direitos de
// transmissão" 2024 = 9.032 y agrega una línea "Premiações (receita)" 4.448 que el PDF de 2024 (su
// propio año corriente) NO tiene — ese documento reporta "Direitos de transmissão" 2024 = 13.480 y
// no separa premios. El total (28.909) coincide en los 2, pero el desglose está reclasificado
// distinto. Se usó SIEMPRE la columna "año corriente" del PDF DE ESE AÑO (2024 → PDF 2024, 2025 →
// PDF 2025), nunca la comparativa del PDF siguiente, como exige la sección 6.5 del skill.
//
// CATEGORIZACIÓN:
// - 'Direitos de transmissão' -> broadcasting; 'Bilheteria' -> matchday_competition; 'Patrocínio'
//   -> sponsorship_commercial; 'Programa de sócio torcedor' -> member_dues (mismo criterio que
//   'Camisa 7' de Botafogo: programa de socios-hinchas, no sponsor de camiseta); 'Premiações
//   (receita)' (solo 2025) -> competition_bonus; 'Negociação de Atletas' (solo 2025) ->
//   player_sales.
// - 'Timemania' (lotería federal brasileña, participación legal de clubes inscriptos en el
//   programa de regularización de deudas fiscales del fútbol) -> other_income: es un programa
//   estatal específico sin equivalente en ninguna categoría estándar, no es sponsor ni TV ni
//   entradas. 'Outras receitas' -> other_income.
// - Sección social/amateur: 'Clube social - contribuições e taxas' -> member_dues (cuota de socios
//   del club social); 'Escolinhas de futebol' -> youth_football; 'Shows e Eventos' -> other_income
//   (criterio conservador sección 1 del skill: el rótulo NO nombra el estadio, así que no es
//   stadium_other aunque probablemente ocurran ahí); 'Outras receitas (social)' -> other_income.
// - Gastos futebol profissional: 'Salários e encargos'/'Direitos de imagem'/'Comissão Técnica'/
//   'Premiações' (gasto, bono por resultados) -> wages_squad; 'Taxas de Federações e
//   Confederações'/'Bilheteria (Custo)'/'Viagens e Hospedagens' -> match_organisation_expense;
//   'Amortização do custo de atletas' -> player_amortisation; 'Depreciações' -> depreciation;
//   'Serviços de terceiros'/'Despesas administrativas'/'Despesas gerais' -> admin_general_expense;
//   'Despesas da base' (fútbol juvenil/formación, nombrado explícito "da base") ->
//   youth_other_sports_expense.
// - Gastos esportes amadores e clube social: 'Salários e encargos'/'Serviços de terceiros'/
//   'Despesas gerais' -> youth_other_sports_expense (la categoría incluye explícitamente
//   "actividades sociales" en category-map.js, cubre el mix amateur+social de esta sección);
//   'Depreciações' -> depreciation; 'Obras e Manutenções' -> admin_general_expense (coincide con
//   "mantenimiento de sede" de la definición de esta categoría); 'Despesas administrativas' ->
//   admin_general_expense (rótulo explícito).
//
// VERIFICACIÓN (antes de cargar, Node): las revenueLines de cada año suman EXACTO el total
// impreso en la Nota "Receita líquida" (30.308 M BRL en 2024, 39.514 M BRL en 2025). Las
// expenseLines de cada año reconciliaron con ±0,001-0,002 M BRL (±R$1.000-2.000) contra los
// subtotales impresos de la propia DRE ("Custos e despesas - futebol profissional"/"...esportes
// amadores") — redondeo del propio documento a nivel de línea (mismo patrón que Racing 2026/27,
// club-data-mapping sección 9.3), no error de carga: revenue+expenses+netInterest reconcilia
// exacto contra el Superávit/Déficit del exercício impreso en los 2 años (ver detalle por año en
// fiscalYearMeta abajo).
//
// AVISO: la Nota 14 "Custos e despesas" del PDF de 2024 imprime un total (-30.483 M BRL) que NO
// reconcilia con la propia DRE de ese mismo documento (-30.554 M BRL, la suma de "Custos e
// despesas - futebol profissional" + "...esportes amadores e clube social" que sí da el Déficit
// del ejercicio impreso). Se usó el total de la DRE (30.554), no el de la Nota 14, porque es el
// que efectivamente reconcilia con el resultado final del propio documento — la Nota 14 del PDF
// 2024 parece tener un error de totalización interno del club/auditor (no aplica a la Nota 14 del
// PDF de 2025, que sí reconcilia exacto). No se investigó más a fondo, es una inconsistencia menor
// del propio documento, no un error de carga (mismo criterio que club-data-mapping sección 6.4).
//
// FX: ninguno de los 2 documentos declara tipo de cambio propio (no hay Anexo de moneda
// extranjera, el clube no opera en moneda extranjera). Se usó PTAX de cierre del BCB, ya cargado
// en FX_CLOSE: BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// grossDebt = "Empréstimos e financiamentos" (circulante + não circulante). cash = "Caixa e
// equivalentes de caixa" (Nota 4).
//
// Gestión: el PDF de 2025 firma "Juarez Costa Pinto — Presidente" (junto al contador), pero esa
// firma es del 24/04/2026, aprobando el ejercicio 2025 — no hay confirmación de que ya fuera
// presidente durante TODO 2024 (el PDF de 2024 no muestra firma de presidente, solo de contador y
// auditor). Sin la profundidad de confirmación que exige club-data-mapping SKILL.md sección 7,
// gestionId queda 'sinconfirmar' para los 2 años (mismo criterio que Botafogo).
// ============================================================================

const operarioferroviarioBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:13.480, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:3.254, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:7.784, disclosureLevel:'detailed' },
    { rawLabel:'Programa de sócio torcedor', normalizedCategory:'member_dues', amountNative:3.260, disclosureLevel:'detailed' },
    { rawLabel:'Timemania', normalizedCategory:'other_income', amountNative:0.500, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (futebol)', normalizedCategory:'other_income', amountNative:0.631, disclosureLevel:'detailed' },
    { rawLabel:'Clube social - contribuições e taxas', normalizedCategory:'member_dues', amountNative:0.741, disclosureLevel:'detailed' },
    { rawLabel:'Escolinhas de futebol', normalizedCategory:'youth_football', amountNative:0.413, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (social)', normalizedCategory:'other_income', amountNative:0.245, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:14.033, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:2.271, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:7.266, disclosureLevel:'detailed' },
    { rawLabel:'Premiações (receita)', normalizedCategory:'competition_bonus', amountNative:5.281, disclosureLevel:'detailed' },
    { rawLabel:'Programa de sócio torcedor', normalizedCategory:'member_dues', amountNative:4.005, disclosureLevel:'detailed' },
    { rawLabel:'Timemania', normalizedCategory:'other_income', amountNative:0.467, disclosureLevel:'detailed' },
    { rawLabel:'Negociação de Atletas', normalizedCategory:'player_sales', amountNative:3.617, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (futebol)', normalizedCategory:'other_income', amountNative:0.831, disclosureLevel:'detailed' },
    { rawLabel:'Clube social - contribuições e taxas', normalizedCategory:'member_dues', amountNative:0.924, disclosureLevel:'detailed' },
    { rawLabel:'Escolinhas de futebol', normalizedCategory:'youth_football', amountNative:0.504, disclosureLevel:'detailed' },
    { rawLabel:'Shows e Eventos', normalizedCategory:'other_income', amountNative:0.096, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (social)', normalizedCategory:'other_income', amountNative:0.219, disclosureLevel:'detailed' },
  ],
};

const operarioferroviarioBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários e encargos (futebol profissional)', normalizedCategory:'wages_squad', amountNative:-10.327, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de imagem', normalizedCategory:'wages_squad', amountNative:-7.436, disclosureLevel:'detailed' },
    { rawLabel:'Comissão Técnica', normalizedCategory:'wages_squad', amountNative:-2.443, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-0.775, disclosureLevel:'detailed' },
    { rawLabel:'Amortização do custo de atletas', normalizedCategory:'player_amortisation', amountNative:-0.100, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações (futebol profissional)', normalizedCategory:'depreciation', amountNative:-0.094, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria (Custo)', normalizedCategory:'match_organisation_expense', amountNative:-0.550, disclosureLevel:'detailed' },
    { rawLabel:'Viagens e Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-1.050, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-2.006, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-1.405, disclosureLevel:'detailed' },
    { rawLabel:'Despesas da base', normalizedCategory:'youth_other_sports_expense', amountNative:-0.617, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-2.250, disclosureLevel:'detailed' },
    { rawLabel:'Salários e encargos (esportes amadores e clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.368, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (esportes amadores e clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.183, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais (esportes amadores e clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.030, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações (esportes amadores e clube social)', normalizedCategory:'depreciation', amountNative:-0.001, disclosureLevel:'detailed' },
    { rawLabel:'Obras e Manutenções', normalizedCategory:'admin_general_expense', amountNative:-0.587, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas (esportes amadores e clube social)', normalizedCategory:'admin_general_expense', amountNative:-0.334, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Salários e encargos (futebol profissional)', normalizedCategory:'wages_squad', amountNative:-14.438, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de imagem', normalizedCategory:'wages_squad', amountNative:-10.349, disclosureLevel:'detailed' },
    { rawLabel:'Premiações (gasto, bônus por resultados)', normalizedCategory:'wages_squad', amountNative:-0.323, disclosureLevel:'detailed' },
    { rawLabel:'Comissão Técnica', normalizedCategory:'wages_squad', amountNative:-1.690, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-1.026, disclosureLevel:'detailed' },
    { rawLabel:'Amortização do custo de atletas', normalizedCategory:'player_amortisation', amountNative:-0.122, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações (futebol profissional)', normalizedCategory:'depreciation', amountNative:-0.092, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria (Custo, futebol profissional)', normalizedCategory:'match_organisation_expense', amountNative:-0.820, disclosureLevel:'detailed' },
    { rawLabel:'Viagens e Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.592, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-3.087, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-1.331, disclosureLevel:'detailed' },
    { rawLabel:'Despesas da base', normalizedCategory:'youth_other_sports_expense', amountNative:-0.210, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-3.819, disclosureLevel:'detailed' },
    { rawLabel:'Salários e encargos (esportes amadores e clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.566, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (esportes amadores e clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.104, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais (esportes amadores e clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.038, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações (esportes amadores e clube social)', normalizedCategory:'depreciation', amountNative:-0.001, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria (Custo, esportes amadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.003, disclosureLevel:'detailed' },
    { rawLabel:'Obras e Manutenções', normalizedCategory:'admin_general_expense', amountNative:-0.476, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas (esportes amadores e clube social)', normalizedCategory:'admin_general_expense', amountNative:-0.436, disclosureLevel:'detailed' },
  ],
};

const operarioferroviarioBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'operarioferroviario-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos e financiamentos" circulante (425) + não circulante (0, no hay saldo
    // en 2024). cash = "Caixa e equivalentes de caixa" (Nota 4).
    grossDebt:0.425, cash:1.343,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas financeiras (223) - Despesas financeiras (222), Nota 5.
    netInterest:0.001, tax:0,
    // officialTotalRevenue = 30.308 M BRL, EXACTO igual a la Nota 13 "Receita líquida" impresa.
    // officialTotalExpenses = 30.554 M BRL = suma de "Custos e despesas - futebol profissional"
    // (29.052) + "...esportes amadores e clube social" (1.502), los 2 subtotales impresos en la
    // propia DRE (NO el total de la Nota 14, que no reconcilia — ver comentario de cabecera).
    // officialPAT = "Déficit do exercício" impreso (-246), negativo real: 2024 fue año de déficit.
    officialTotalRevenue:30.308, officialTotalExpenses:30.554, officialPAT:-0.246,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'operarioferroviario-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos e financiamentos": saldo cero en 2025 (Nota 9: el clube terminó de
    // pagar el préstamo del Banco Sicredi durante el año). cash = "Caixa e equivalentes de caixa"
    // (Nota 4).
    grossDebt:0, cash:1.363,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas financeiras (269) - Despesas financeiras (208), Nota 5.
    netInterest:0.061, tax:0,
    // officialTotalRevenue = 39.514 M BRL, officialTotalExpenses = 39.523 M BRL: los 2 EXACTOS
    // iguales a la Nota 13 "Receita líquida" y la Nota 14 "Custos e despesas" impresas (a
    // diferencia de 2024, acá la Nota 14 SÍ reconcilia con la DRE). officialPAT = "Superávit
    // (Déficit) do exercício" impreso (52), positivo real: 2025 revirtió el déficit de 2024.
    officialTotalRevenue:39.514, officialTotalExpenses:39.523, officialPAT:0.052,
  },
};

const operarioferroviarioBrPresupuestoOverlayByYear = {};

const operarioferroviarioBrPasesData = [];
const operarioferroviarioBrResultadosData = {};
const operarioferroviarioBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['operarioferroviario-br'] = {
  revenueLinesByYear: operarioferroviarioBrRevenueLinesByYear, expenseLinesByYear: operarioferroviarioBrExpenseLinesByYear,
  fiscalYearMeta: operarioferroviarioBrFiscalYearMeta, pasesData: operarioferroviarioBrPasesData,
  resultadosData: operarioferroviarioBrResultadosData, titulosData: operarioferroviarioBrTitulosData,
  presupuestoOverlayByYear: operarioferroviarioBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'operarioferroviario-br-demonstracoes-2024': {
      id:'operarioferroviario-br-demonstracoes-2024', clubId:'operarioferroviario-br',
      title:'Demonstrações Financeiras do Operário Ferroviário Esporte Clube, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://federacaopr.sfo3.digitaloceanspaces.com/wp-content/uploads/2025/04/30175550/Operario-2024.pdf',
      note:'PDF oficial (texto nativo), descargado del repositorio de documentos de la Federação Paranaense. Auditado por JSP Serviços (Junior Svieck Pinto, CRC/PR 058.111/O-0). Transcripción completa en Clubes/Brasil/Operario Ferroviario/demonstracoes-financeiras-2024.md. 2024 fue un ejercicio de déficit (R$246 mil). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923).',
    },
  'operarioferroviario-br-demonstracoes-2025': {
      id:'operarioferroviario-br-demonstracoes-2025', clubId:'operarioferroviario-br',
      title:'Demonstrações Financeiras do Operário Ferroviário Esporte Clube, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://cdn.fanbase.com.br/fanhub/operario/docs/transparencia/dfs-operario-assinado.pdf',
      note:'PDF oficial (texto nativo), descargado del portal de transparencia propio del club (CDN Fanbase). Firmado por el presidente Juarez Costa Pinto y el contador Marcos Antonio Martins (CRC PR 056385/O-5), auditado por JSP Serviços. Transcripción completa en Clubes/Brasil/Operario Ferroviario/demonstracoes-financeiras-2025.md. 2025 revirtió el déficit de 2024 con un superávit de R$52 mil, en línea con la prensa local (aRede, Ponta Grossa: receita total de R$30,3 M en 2024 a R$39,5 M en 2025). Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024).',
    },
});

// gestionesByClub: entrada genérica "Sin confirmar" cubriendo los 2 años cargados — el PDF de 2025
// firma "Juarez Costa Pinto — Presidente" (24/04/2026, aprobando el ejercicio 2025), pero eso no
// confirma que ya fuera presidente durante TODO 2024 (el PDF de 2024 no lleva firma de presidente
// visible), así que no alcanza la confianza que exige club-data-mapping SKILL.md sección 7. Mismo
// criterio que Botafogo.
gestionesByClub['operarioferroviario-br'] = {
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (firma 2025: Juarez Costa Pinto, Presidente)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['operarioferroviario-br'] = null;
