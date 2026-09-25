// ============================================================================
// data/vitoria-br-data.js — Esporte Clube Vitória (Salvador, Bahia, Brasil). Sigue siendo
// ASSOCIAÇÃO (NO se convirtió a SAF). clubId CON GUIÓN desde el arranque: 'vitoria-br' (mismo
// criterio que banfield-ar/athleticoparanaense-br), bracket notation en
// clubs/gestionesByClub/memberCountByClub/CLUB_GENERIC_DATA. 1 ejercicio cargado: 2025 (ejercicio
// social = AÑO CALENDARIO completo, 1°/1 a 31/12, clubs.js fiscalYearStart:'01-01').
//
// FUENTE: "Esporte Clube Vitória — Demonstrações financeiras individuais e consolidadas
// acompanhadas do Relatório do Auditor Independente — Em 31 de dezembro de 2025", publicado
// 09/07/2026, auditado por RSM Brasil Auditores Independentes Ltda. PDF con texto nativo,
// transcripción completa en Clubes/Brasil/Vitoria/demonstracoes-financeiras-2025.md.
//
// COLUMNA USADA: INDIVIDUAL/CONTROLADORA en TODAS las líneas, no Consolidado — mismo criterio que
// Athletico Paranaense/Botafogo/Operário Ferroviário (un solo perímetro de consolidación). La
// diferencia entre columnas es chica acá (ej. Receita operacional líquida 182,890 Controladora vs.
// 184,414 Consolidado) pero se mantiene el criterio por consistencia entre clubes.
//
// SITUACIÓN PATRIMONIAL: el club está en "Passivo a descoberto" (patrimonio neto NEGATIVO de
// R$300,309 millones al cierre de 2025, Controladora) — el pasivo total (R$407,714 M) supera
// ampliamente al activo total (R$107,405 M). No es un error de carga, es la situación real que
// reporta el propio balance auditado (con salvedad/párrafo de continuidad operacional esperable,
// ver el informe del auditor en el .md). Relevante para interpretar `grossDebt`/`cash` de este
// club: cash es extremadamente bajo (R$66 mil) relativo a su escala de ingresos.
//
// ESCALA: documento "Valores expressos em milhares de Reais" (miles de reales), formato numérico
// brasileño ("." = separador de miles). Mismo criterio que Athletico Paranaense: transcribir el
// dígito tal cual con "." como punto decimal de JS ya da millones de BRL nativos directo.
//
// ESTRUCTURA REAL DEL DOCUMENTO: la DRE está partida en 2 SEGMENTOS con su propio subtotal cada
// uno (una particularidad de este club, no vista en Athletico/Botafogo/Operário):
//   1) "Segmento futebol": Receita operacional líquida (Nota 23) − Pessoal (Nota 24, parte fútbol)
//      − Gerais e administrativas (Nota 25, parte fútbol) − Serviços − Tributárias (Nota 26, parte
//      fútbol) − Diretas (Nota 27) − Amortização intangível de atletas profissionais (Nota 15) +/−
//      Contingências cíveis e trabalhistas (Nota 22) + Resultado de equivalência patrimonial (Nota
//      12) = "Total do déficit líquido do exercício no segmento futebol".
//   2) "Segmento clube social e esportes olímpicos": − Pessoal (Nota 24, parte social/olímpica) −
//      Gerais e administrativas (Nota 25, parte social) − Amortização intangível de atletas da base
//      (Nota 15) − Depreciação e amortização + Outras receitas e despesas líquidas (Nota 29) =
//      "Total do superávit (déficit) líquido do exercício no segmento clube social e esportes
//      olímpicos".
//   Los 2 subtotales + Receitas (despesas) financeiras líquidas (Nota 28) = "Déficit do exercício".
//   TODO el costo del segmento "clube social e esportes olímpicos" se cargó como
//   `youth_other_sports_expense` en BLOQUE (mismo criterio que Banfield con sus Anexos de sector —
//   Predio/Departamento Deportes: cuando el documento reporta por SECTOR y no separa el costo por
//   naturaleza dentro de ese sector, se usa la categoría de sector completo en vez de forzar una
//   partición por tipo de gasto que el documento no ofrece).
//
// GOTCHA REAL ENCONTRADO EN ESTE DOCUMENTO (Nota 29 vs. la propia DRE, no reconcilian entre sí para
// 2025 — ver Nota 29(a)): la Nota 29 dice que, desde 2025, las transacciones de venta de atletas Y
// sus costos directos se reconocen en el grupo "Outras receitas e despesas" de la DRE, y da un total
// propio de R$43,514 M (Controladora 2025: 52,980 − 10,208 + 0,742). Pero la línea de la DRE
// "Outras receitas e despesas líquidas" (segmento clube social) imprime R$53,724 M, no R$43,514 M —
// una diferencia de exactamente R$10,208 M, el mismo valor de "Custo das transações com atletas".
// Cruzando contra la Nota 27 (Despesas diretas, segmento futebol): esa nota da un total propio de
// R$82,183 M, pero la DRE imprime "Diretas: (92.391)" para el segmento futebol — la MISMA diferencia
// de R$10,208 M, en el sentido contrario. Conclusión: el "Custo das transações com atletas"
// (R$10,208 M) quedó, en la DRE real, sumado adentro de "Diretas" (segmento futebol), NO restado de
// "Outras receitas e despesas líquidas" (segmento clube social) como sugiere la redacción de la Nota
// 29(a) — probablemente un desajuste entre la nota explicativa (redactada para describir el cambio
// de política) y cómo quedó la cascada de la DRE en la práctica. Se verificó que esta lectura
// reconcilia EXACTO con los 2 subtotales de segmento Y con el Déficit final impreso (-25.418), así
// que se cargó así: 'Custo das transações com atletas' -10,208 como línea DENTRO de 'Diretas'
// (segmento futebol, categorizada other_expenses), y 'Transações com atletas' (52,980, ingreso) +
// 'Outras receitas e despesas líquidas' (0,742) SIN restar el costo, dentro del segmento clube
// social. Documentar acá para que una sesión futura no "corrija" esto de vuelta a la lectura literal
// de la Nota 29, que NO reconcilia con la DRE auditada.
//
// CATEGORIZACIÓN:
// - Nota 23 (Receita operacional líquida segmento futebol): 'Direitos de transmissão de TV' ->
//   broadcasting; 'Patrocínios e publicidades' -> sponsorship_commercial; 'Arrecadação de jogos' ->
//   matchday_competition; 'Premiações e outras' -> competition_bonus (DUDA GENUINA: la nota (d)
//   dice que esta línea mezcla premios por avance de copa CON ingresos del programa de socio-hincha,
//   sin separarlos — se cargó entera como competition_bonus por ser el concepto "básico" según la
//   propia nota, pero es una aproximación; anotado en Admin/dudas-por-club.md); 'Receitas diversas'
//   -> other_income; '(-) Impostos e contribuições'/'(-) Descontos concedidos' -> other_income
//   (líneas negativas, contra-revenue).
// - Nota 24 (Despesas com pessoal, ya separada por segmento en la propia DRE): 'Pessoal' segmento
//   futebol -> wages_squad; 'Pessoal' segmento clube social -> youth_other_sports_expense (ver
//   criterio de sector completo arriba).
// - Nota 25 (Despesas gerais e administrativas, separada por segmento): 'Gerais e administrativas'
//   segmento futebol -> admin_general_expense; 'Gerais e administrativas' segmento clube social ->
//   youth_other_sports_expense.
// - 'Serviços' (segmento futebol, sin nota propia, prestação de serviços PJ contra Nota 25(a)) ->
//   admin_general_expense.
// - Nota 26 (Despesas tributárias, segmento futebol) -> admin_general_expense (impuestos, sección 17
//   del skill).
// - Nota 27 (Despesas diretas, segmento futebol): 'Direito de imagem' -> wages_squad (mismo criterio
//   que Botafogo/Athletico); 'Despesas com jogos' -> match_organisation_expense; 'Empréstimos de
//   atletas'/'Intermediação'/'Multas contratuais'/'Luvas'/'Outras despesas diretas'/'Custo das
//   transações com atletas' (ver gotcha arriba) -> other_expenses (comisiones/costos de transacción,
//   no el cargo contable de amortización); 'Rateio de despesas administrativas' ->
//   admin_general_expense; 'Taxas e registros federações' -> match_organisation_expense; 'Aquisições
//   de direitos econômicos' -> player_amortisation (compra de pases, mismo criterio que "Costo
//   Transferencia de Jugadores" de Racing); 'Salários e encargos administrativos' (0 en 2025) -> no
//   se carga (monto cero ese año).
// - Nota 15 (Amortização intangível): 'Atletas profissionais' -> player_amortisation (segmento
//   futebol); 'Atletas da base' -> youth_other_sports_expense (segmento clube social, junto con el
//   resto del sector, no player_amortisation — esa categoría es para el plantel profesional).
// - 'Depreciação e amortização' (segmento clube social, sin nota propia) -> youth_other_sports_expense
//   (mismo criterio de sector completo, no se promovió a `depreciation` por ser una línea chica sin
//   desglose propio dentro de un sector ya tratado en bloque).
// - Nota 22 ('Contingências cíveis e trabalhistas', crédito neto +1,272 en 2025 — reversión de
//   provisión) y Nota 12 ('Resultado de equivalência patrimonial', +4,149) -> exceptional_items:
//   ambas son líneas de la propia DRE explícitamente separadas del cuerpo operativo por su
//   naturaleza (contingencias legales/resultado por método de participación), mismo criterio que
//   'Resultado de equivalência patrimonial' de Botafogo/Athletico Paranaense.
// - Nota 29 ('Outras receitas e despesas', segmento clube social, ver gotcha arriba): 'Transações
//   com atletas' -> player_sales (ingreso); 'Outras receitas e despesas líquidas' (0,742) ->
//   other_income.
// - Nota 28 (Receitas e despesas financeiras): NO se carga como línea — neto a netInterest en
//   fiscalYearMeta.
//
// VERIFICACIÓN (Node, antes de cargar): revenueLines suma EXACTO 236,612 M BRL (incluye
// 'Transações com atletas' del segmento clube social). expenseLines suma EXACTO -252,943 M BRL.
// revenue + expenses + netInterest(-9,089) = -25,420 M BRL vs. Déficit do exercício impreso
// (-25,418) — diferencia de 0,002 M BRL, redondeo aceptable. Los 2 subtotales de segmento
// reconcilian EXACTOS contra lo impreso: segmento futebol -53,777 (revenueLines+expenseLines de ese
// segmento) y segmento clube social +37,448 (revenueLines+expenseLines de ese segmento) — ver
// cálculo completo en el reporte de la sesión.
//
// grossDebt = 'Empréstimos e financiamentos' Controladora, circulante (10,273; Nota 16) — sin
// porção não circulante en este balance (no aparece en la lista de pasivo no corriente). Línea
// angosta, separada de Fornecedores/Imagens-intermediações-luvas a pagar/Obrigações e encargos
// sociais/Tributos parcelados/Acordos a pagar/Provisão para contingências en el propio Balanço,
// mismo criterio que Boca/Athletico Paranaense (sección 14 del skill). cash = 'Caixa e equivalentes
// de caixa' Controladora (0,066; Nota 8) — extremadamente bajo, consistente con la situación de
// patrimonio neto negativo del club (ver comentario de cabecera).
//
// FX: el documento no declara tipo de cambio propio (Nota 6.15 "Conversão de saldos denominados em
// moeda estrangeira" solo describe el criterio general, sin declarar el número) — se usó PTAX de
// cierre del BCB vía fxRef: BRL@2025-12-31 (5,5024).
//
// Gestión: Fabio Rios Mota firma como Presidente el balance 2025, sin fecha de elección/mandato
// confirmada en el documento — gestionId 'sinconfirmar', mismo criterio que el resto de los clubes
// brasileños cargados.
//
// Socios: la Nota 23(d) menciona que "durante o ano de 2024 o Clube atingiu marca de 42 mil sócios"
// — es un umbral alcanzado durante 2024, no un conteo puntual a una fecha exacta (y menos al cierre
// de 2025, el ejercicio cargado), así que no cumple el estándar de "dato confiable" para
// memberCountByClub (queda null); mencionado en fuentes/Brasil/Vitoria.md por si sirve de referencia.
// ============================================================================

const vitoriaBrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:114.552, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios e publicidades', normalizedCategory:'sponsorship_commercial', amountNative:38.129, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:9.077, disclosureLevel:'detailed' },
    { rawLabel:'Premiações e outras (prêmios de copa + sócio torcedor, sem desglose — ver duda)', normalizedCategory:'competition_bonus', amountNative:32.404, disclosureLevel:'detailed' },
    { rawLabel:'Receitas diversas (royalties, aluguéis de bares do estádio)', normalizedCategory:'other_income', amountNative:4.523, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos e contribuições', normalizedCategory:'other_income', amountNative:-15.155, disclosureLevel:'detailed' },
    { rawLabel:'(-) Descontos concedidos', normalizedCategory:'other_income', amountNative:-0.640, disclosureLevel:'detailed' },
    { rawLabel:'Transações com atletas (Nota 29, venda de atletas)', normalizedCategory:'player_sales', amountNative:52.980, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas e despesas líquidas (Nota 29, segmento clube social)', normalizedCategory:'other_income', amountNative:0.742, disclosureLevel:'detailed' },
  ],
};

const vitoriaBrExpenseLinesByYear = {
  2025: [
    // Segmento futebol
    { rawLabel:'Pessoal (segmento futebol)', normalizedCategory:'wages_squad', amountNative:-86.850, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas (segmento futebol)', normalizedCategory:'admin_general_expense', amountNative:-28.052, disclosureLevel:'detailed' },
    { rawLabel:'Serviços (segmento futebol)', normalizedCategory:'admin_general_expense', amountNative:-9.959, disclosureLevel:'detailed' },
    { rawLabel:'Tributárias (segmento futebol)', normalizedCategory:'admin_general_expense', amountNative:-13.934, disclosureLevel:'detailed' },
    // Nota 27 — Despesas diretas (segmento futebol), incluye 'Custo das transações com atletas'
    // (Nota 29a) reclasificado acá para reconciliar con la DRE real — ver gotcha en cabecera.
    { rawLabel:'Direito de imagem (Diretas)', normalizedCategory:'wages_squad', amountNative:-45.717, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Diretas)', normalizedCategory:'match_organisation_expense', amountNative:-16.755, disclosureLevel:'detailed' },
    { rawLabel:'Empréstimos de atletas (Diretas)', normalizedCategory:'other_expenses', amountNative:-4.498, disclosureLevel:'detailed' },
    { rawLabel:'Intermediação (Diretas)', normalizedCategory:'other_expenses', amountNative:-2.938, disclosureLevel:'detailed' },
    { rawLabel:'Multas contratuais (Diretas)', normalizedCategory:'other_expenses', amountNative:-3.500, disclosureLevel:'detailed' },
    { rawLabel:'Luvas (Diretas)', normalizedCategory:'other_expenses', amountNative:-2.256, disclosureLevel:'detailed' },
    { rawLabel:'Rateio de despesas administrativas (Diretas)', normalizedCategory:'admin_general_expense', amountNative:-1.629, disclosureLevel:'detailed' },
    { rawLabel:'Taxas e registros federações (Diretas)', normalizedCategory:'match_organisation_expense', amountNative:-0.941, disclosureLevel:'detailed' },
    { rawLabel:'Aquisições de direitos econômicos (Diretas)', normalizedCategory:'player_amortisation', amountNative:-1.917, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas diretas (Diretas)', normalizedCategory:'other_expenses', amountNative:-2.032, disclosureLevel:'detailed' },
    { rawLabel:'Custo das transações com atletas (Nota 29a, reclassificado dentro de Diretas — ver gotcha)', normalizedCategory:'other_expenses', amountNative:-10.208, disclosureLevel:'detailed' },
    { rawLabel:'Amortização intangível - Atletas profissionais', normalizedCategory:'player_amortisation', amountNative:-10.902, disclosureLevel:'detailed' },
    { rawLabel:'Contingências cíveis e trabalhistas (reversão líquida)', normalizedCategory:'exceptional_items', amountNative:1.272, disclosureLevel:'detailed' },
    { rawLabel:'Resultado de equivalência patrimonial', normalizedCategory:'exceptional_items', amountNative:4.149, disclosureLevel:'detailed' },
    // Segmento clube social e esportes olímpicos — TODO el sector a youth_other_sports_expense (ver
    // criterio de sector completo en la cabecera, mismo que Banfield con sus Anexos de sector).
    { rawLabel:'Pessoal (segmento clube social e esportes olímpicos)', normalizedCategory:'youth_other_sports_expense', amountNative:-8.378, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas (segmento clube social e esportes olímpicos)', normalizedCategory:'youth_other_sports_expense', amountNative:-6.698, disclosureLevel:'detailed' },
    { rawLabel:'Amortização intangível - Atletas da base (segmento clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.077, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação e amortização (segmento clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.123, disclosureLevel:'detailed' },
  ],
};

const vitoriaBrFiscalYearMeta = {
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'vitoria-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = 'Empréstimos e financiamentos' Controladora, circulante (Nota 16) — sin porção
    // não circulante en este balance. cash = 'Caixa e equivalentes de caixa' Controladora (Nota 8),
    // extremadamente bajo (ver comentario de cabecera sobre el patrimonio neto negativo del club).
    grossDebt:10.273, cash:0.066,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receitas (despesas) financeiras, líquidas' Controladora (Nota 28).
    netInterest:-9.089, tax:0,
    // officialTotalRevenue = suma COMPLETA de revenueLines (236,612 M BRL) — el motor genérico suma
    // `revenue` sin excluir ninguna categoría. officialTotalExpenses = 258,364 M BRL = |expenses +
    // nonCash| del motor, EXCLUYENDO exceptional_items (el motor lo suma aparte, en
    // operatingProfit) — mismo criterio que Athletico Paranaense/Botafogo. officialPAT = 'Déficit
    // do exercício' impreso (-25,418), incluye todo. El club está en situación de patrimonio neto
    // negativo (ver comentario de cabecera) pero el DÉFICIT del ejercicio en sí (-25,418 de 236,612
    // en ingresos, ~11%) es moderado comparado con el agujero patrimonial acumulado (-300,309 M).
    officialTotalRevenue:236.612, officialTotalExpenses:258.364, officialPAT:-25.418,
  },
};

const vitoriaBrPresupuestoOverlayByYear = {};

const vitoriaBrPasesData = [];
const vitoriaBrResultadosData = {};
const vitoriaBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vitoria-br'] = {
  revenueLinesByYear: vitoriaBrRevenueLinesByYear, expenseLinesByYear: vitoriaBrExpenseLinesByYear,
  fiscalYearMeta: vitoriaBrFiscalYearMeta, pasesData: vitoriaBrPasesData,
  resultadosData: vitoriaBrResultadosData, titulosData: vitoriaBrTitulosData,
  presupuestoOverlayByYear: vitoriaBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'vitoria-br-demonstracoes-2025': {
    id:'vitoria-br-demonstracoes-2025', clubId:'vitoria-br',
    title:'Demonstrações financeiras individuais e consolidadas acompanhadas do Relatório do Auditor Independente, Esporte Clube Vitória, Em 31 de dezembro de 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://ecvitoria.com.br/transparencia/demonstracao-financeira/',
    note:'PDF oficial (texto nativo), publicado 09/07/2026 en el portal de transparencia propio del club (sección movida desde una URL vieja que daba 404 — ver fuentes/Brasil/Vitoria.md). Auditado por RSM Brasil Auditores Independentes Ltda. Se cargó la columna INDIVIDUAL/CONTROLADORA, no la Consolidado. El club reporta patrimonio neto NEGATIVO ("Passivo a descoberto") de R$300,309 millones al cierre — ver comentario de cabecera de data/vitoria-br-data.js para el detalle. Transcripción completa en "Clubes/Brasil/Vitoria/demonstracoes-financeiras-2025.md". Firmado por el presidente Fabio Rios Mota. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024). 2024 y años anteriores: "Nenhum documento encontrado" en la sección de transparencia del club, confirmado navegando la página real.',
  },
});

gestionesByClub['vitoria-br'] = {
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (firma 2025: Fabio Rios Mota, Presidente)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['vitoria-br'] = null; // Nota 23(d) menciona "42 mil sócios" alcanzados durante 2024, umbral no puntual — no cumple el estándar de dato confiable
