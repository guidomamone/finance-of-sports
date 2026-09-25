// ============================================================================
// data/vascodagama-br-data.js — Vasco da Gama Sociedade Anônima do Futebol (SAF), Rio de Janeiro,
// Brasil. 1 EJERCICIO CARGADO: 2023 (auditado). fiscalYearStart:'01-01' (ejercicio social = año
// calendario completo, mismo criterio que Botafogo/Grêmio, ver clubs.js/isCalendarYearClub()).
//
// *** IMPORTANTE: ESTA SESIÓN NO PUDO CARGAR UN 2do EJERCICIO (2024), Y ESE NO ES UN RECORTE DE
// ALCANCE — ES UN HALLAZGO SOBRE LA FUENTE. *** El plan original (ver consigna) asumía que
// `Clubes/Brasil/Vasco da Gama/dre-balanco-patrimonial-2024.md` eran las demonstrações contábeis
// 2024 de la SAF (no auditadas al momento de publicarse). Leído completo, el documento entero (7
// secciones: Carta do Presidente, Carta Administrativa, Balanço Patrimonial, DRE, Mutação do PN,
// Fluxo de Caixa, Comentários Gerais) es en realidad las demonstrações contábeis 2024 del
// **"Club de Regatas Vasco da Gama" (CRVG)**, la associação social — el mismo tipo de entidad que
// la consigna EXPLÍCITAMENTE excluye para 2022 ("NO uses demonstracoes-financeiras-associacao-
// crvg-2022.md — es de la associação CRVG, una entidad SOCIAL separada de la SAF"). El único rastro
// de la SAF (VGSAF) en todo el archivo es como PARTE RELACIONADA: el CRVG tiene una participación
// del 30% en el Vasco SAF, contabilizada por equivalencia patrimonial (línea 965 del .md), y la SAF
// aparece mencionada en el texto narrativo (disputa por el control societario con 777 Partners,
// recuperación judicial), pero NUNCA como demonstrações contábeis propias — no hay Balanço
// Patrimonial ni DRE de la SAF standalone en ningún punto del archivo (confirmado con grep sobre
// "Sociedade Anônima do Futebol"/"VGSAF" + balanço propio: cero resultados de un estado contable
// separado). Cargar esos números como si fueran de la SAF habría sido exactamente el error que la
// consigna pedía evitar para 2022, solo que con el archivo equivocado. Se decidió NO cargar 2024
// esta sesión — mejor 1 ejercicio bien identificado que 2 con una entidad mezclada. Reportado en la
// sesión como hallazgo principal, para que quede en Admin/dudas-por-club.md: falta reconseguir el
// PDF real "Vasco da Gama SAF DRE e Balanço Patrimonial 2024" standalone (el mirror de
// crvascodagama.com resultó ser del CRVG, no de la SAF pese a cómo lo describía la nota de
// sourcing) o esperar el próximo balance auditado de la SAF (2025, ya mencionado como descargado
// pero no transcripto en Botafogo — para Vasco no consta todavía).
//
// Fuente 2023: "VASCO DA GAMA SAF — DEMONSTRAÇÕES CONTÁBEIS 2023", exercício findo em 31/12/2023 e
// período findo em 31/12/2022 (a SAF nasceu em 08/08/2022, por eso 2022 es un período parcial de
// ~5 meses, no un año completo — no se cargó 2022 por ese motivo, además de no ser el pedido de
// esta sesión). Auditado por Grant Thornton Auditores Independentes, parecer SIN salvedades, Rio de
// Janeiro, 26/4/2024. PDF con texto nativo (82 páginas), descargado de netvasco.com.br (mirror sin
// el bloqueo Cloudflare del dominio oficial media.vasco.com.br), transcripción completa en
// Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md. Documento de UNA sola entidad (no
// hay columnas Controladora/Consolidado — a diferencia de Botafogo, la SAF Vasco no consolida
// ninguna subsidiaria en este balance), así que no aplica la decisión Controladora-vs-Consolidado.
//
// Escala: valores originales "em milhares de reais" (miles de reales) — acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Botafogo/Grêmio).
//
// Categorización (Nota 25, Receita operacional líquida — único bloque de revenue, a diferencia de
// Botafogo, que tiene un 2do bloque separado "Resultado com transações de direitos de atletas": acá
// TODO, incluida la venta de jugadores, vive dentro de la Nota 25 misma):
// - 'Direitos de transmissão' -> broadcasting. 'Bilheteria' -> matchday_competition. 'Marketing' ->
//   sponsorship_commercial. 'Licenciamento e royalties' -> sponsorship_commercial (incluye
//   merchandising, mismo criterio que Botafogo).
// - 'Repasse de direitos federativos' (123.739, la línea más grande de todo el revenue) ->
//   player_sales. Confirmado con el texto de la Nota 2 (política contable, línea 1945-1946 del
//   .md): "Receitas com repasses de direitos federativos... contabilizadas quando os contratos são
//   assinados e/ou os direitos federativos são transferidos à outra Companhia" — es venta/cesión de
//   jugadores a otro club, no televisación ni comercial.
// - 'Mecanismo de solidariedade' -> youth_football (mismo criterio que Botafogo: mecanismo FIFA de
//   solidaridad por formación, recibido).
// - 'Programa de sócio torcedor' -> member_dues (mismo criterio que Botafogo con 'Camisa 7').
// - 'Tour da Colina' -> stadium_other: el rótulo SÍ nombra el estadio (São Januário es conocido
//   como "a Colina Histórica"/"a Colina"), cumple el criterio conservador de la sección 1 de
//   club-data-mapping (que exige que el rótulo nombre el estadio o una parte de él).
// - 'Receitas com premiação' -> competition_bonus.
// - 'Receitas diversas' (4.159, valor OCR ilegible en la fila "MAD AOM" — RECONSTRUIDO por
//   reconciliación: Receita operacional bruta impresa 363.654 (=345.331 líquida + 18.323 de
//   deduções) menos la suma de las demás 9 líneas de receita bruta identificables (359.495) =
//   4.159 exacto) -> other_income.
// - 'Deduções sobre a receita (impostos e outras)' (Impostos e contribuições -11.278 + Outras
//   deduções -7.045 = -18.323, combinadas en una sola línea, mismo criterio que Botafogo) ->
//   other_income (línea negativa, contra-revenue).
//
// Custos operacionais (Nota 26) + Despesas gerais e administrativas (Nota 27), mismo criterio de
// Botafogo para las categorías espejo:
// - 'Salários, encargos e benefícios a funcionários' (custo dos serviços) -> wages_squad.
//   'Direitos de imagem' -> wages_squad (mismo criterio que Botafogo: estructura habitual de
//   compensación a jugadores en Brasil).
// - 'Amortizações de direitos sobre atletas' -> player_amortisation. 'Baixa de direitos econômicos
//   de atletas profissionais'/'...em formação' -> player_amortisation (baja/derecognición contable
//   del activo intangible, mismo tratamiento contable que la amortización, se agrupan juntas).
// - 'Gastos com jogos e competições' -> match_organisation_expense.
// - 'Manutenção'/'Serviços profissionais'/'Custo de material esportivo' (custo dos serviços) ->
//   admin_general_expense.
// - 'Repasse de direitos econômicos'/'Gastos com negociação de atletas' -> other_expenses
//   (comisiones/costos de intermediación en transferencias, mismo criterio que Botafogo: NO van a
//   player_amortisation, que es solo el cargo contable de amortización/baja).
// - 'Outros' (custo dos serviços) -> other_expenses.
// - G&A: 'Salários, encargos e benefícios a funcionários'/'Despesas operacionais e de
//   estruturação'/'Serviços profissionais'/'Manutenção'/'Provisão para riscos judiciais' ->
//   admin_general_expense. 'Outros' (G&A) -> other_expenses.
// - 'PECLD' (Nota 27): CELDA ILEGIBLE en el OCR ("PECLD 20 (3.229)", sin poder distinguir con
//   certeza cuál valor corresponde a 2023). RECONSTRUIDO por reconciliación: la suma de las otras 6
//   líneas de G&A da 72,053 M, 0,020 M MÁS que el total impreso (72,033 M) — así que PECLD 2023 es
//   una RECUPERACIÓN neta de R$20 mil (+0,020 M, reduce el total, no lo aumenta), no un cargo de
//   3.229 (ese valor es la columna 2022, mal alineada por el OCR). Se cargó como línea positiva
//   dentro de expenseLines (mismo patrón que la reversión de Banfield Fútbol Amateur) ->
//   admin_general_expense. Diferencia irrelevante en términos absolutos (R$20 mil de R$72 M = 0,03%).
// - 'Outras receitas (despesas) operacionais' (línea suelta de la DRE, -0,579, sin Nota propia) ->
//   other_expenses.
//
// Verificación (Node, antes de cargar): revenueLines suma EXACTO 345.331 M BRL = "Receita
// operacional líquida" impresa. expenseLines suma EXACTO -414.853 M BRL = Custos operacionais
// (-342.241) + Despesas G&A (-72.033) + Outras receitas/despesas operacionais (-0.579). revenue +
// expenses = -69.522 M BRL = "Resultado operacional antes do resultado financeiro" impreso, EXACTO.
// + netInterest (-53.976, Nota 28, Resultado financeiro líquido) = -123.498 M BRL = "Prejuízo do
// exercício/período" impreso, EXACTO.
//
// grossDebt = "Empréstimos e financiamentos", circulante (44.406) + não circulante (0.248) = 44.654
// (Nota 18, confirmado también contra el quadro de risco de taxa de juros da Nota 29: "Empréstimos e
// financiamentos 44.654"). cash = "Caixa e equivalentes de caixa" (Nota 4): 79.922.
//
// FX: el documento NO declara un tipo de cambio de cierre propio en un Anexo dedicado — la única
// mención numérica a USD/EUR es la tabela de análise de sensibilidade de risco cambial (Nota 29),
// que usa "Cenário I (provável)" como el tipo de cambio vigente (USD 4,84, EUR 5,35 al 31/12/2023),
// coincidente (dentro de redondeo) con la cotización PTAX de mercado ya investigada para esta misma
// fecha en otro club (BRL@2023-12-31 = 4,8413 — ver Grêmio/data/currency-map.js). Se usó fxRef a esa
// entrada ya existente (mismo criterio de "no reinvestigar lo que ya está en FX_CLOSE") en vez de
// declarar un document_close nuevo con el valor redondeado de la tabla de sensibilidad, que no es
// formalmente un "Anexo de moneda extranjera" (es una tabla de riesgo IFRS 7, con fines distintos).
//
// Gestión: DIRETORIA EXECUTIVA que firma el balance (abril 2024): Lucio Ferreira Barbosa, Diretor
// Presidente. No se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 que
// esa fue la gestión QUE PRESIDIÓ TODO el ejercicio 2023 (la SAF estuvo bajo control societario de
// 777 Partners durante gran parte de 2023, con cambios de gobierno corporativo documentados en el
// propio período) — mismo criterio que Botafogo: gestionId queda 'sinconfirmar', con una entrada
// genérica que cubre el único año cargado.
// ============================================================================

const vascodagamaBrRevenueLinesByYear = {
  2023: [
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:98.697, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:25.533, disclosureLevel:'detailed' },
    { rawLabel:'Marketing', normalizedCategory:'sponsorship_commercial', amountNative:48.982, disclosureLevel:'detailed' },
    { rawLabel:'Repasse de direitos federativos', normalizedCategory:'player_sales', amountNative:123.739, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidariedade', normalizedCategory:'youth_football', amountNative:1.282, disclosureLevel:'detailed' },
    { rawLabel:'Programa de sócio torcedor', normalizedCategory:'member_dues', amountNative:31.798, disclosureLevel:'detailed' },
    { rawLabel:'Tour da Colina', normalizedCategory:'stadium_other', amountNative:0.988, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com premiação', normalizedCategory:'competition_bonus', amountNative:19.838, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento e royalties', normalizedCategory:'sponsorship_commercial', amountNative:8.638, disclosureLevel:'detailed' },
    { rawLabel:'Receitas diversas', normalizedCategory:'other_income', amountNative:4.159, disclosureLevel:'detailed' },
    { rawLabel:'Deduções sobre a receita (impostos e outras)', normalizedCategory:'other_income', amountNative:-18.323, disclosureLevel:'detailed' },
  ],
};

const vascodagamaBrExpenseLinesByYear = {
  2023: [
    // Nota 26 — Custos operacionais
    { rawLabel:'Salários, encargos e benefícios a funcionários (custo dos serviços)', normalizedCategory:'wages_squad', amountNative:-123.573, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações de direitos sobre atletas', normalizedCategory:'player_amortisation', amountNative:-58.783, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de imagem', normalizedCategory:'wages_squad', amountNative:-36.235, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com jogos e competições', normalizedCategory:'match_organisation_expense', amountNative:-30.314, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção (custo dos serviços)', normalizedCategory:'admin_general_expense', amountNative:-7.470, disclosureLevel:'detailed' },
    { rawLabel:'Serviços profissionais (custo dos serviços)', normalizedCategory:'admin_general_expense', amountNative:-11.501, disclosureLevel:'detailed' },
    { rawLabel:'Custo de material esportivo', normalizedCategory:'admin_general_expense', amountNative:-2.924, disclosureLevel:'detailed' },
    { rawLabel:'Repasse de direitos econômicos', normalizedCategory:'other_expenses', amountNative:-27.232, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de direitos econômicos de atletas profissionais', normalizedCategory:'player_amortisation', amountNative:-13.004, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de direitos econômicos de atletas em formação', normalizedCategory:'player_amortisation', amountNative:-8.745, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-21.383, disclosureLevel:'detailed' },
    { rawLabel:'Outros (custo dos serviços)', normalizedCategory:'other_expenses', amountNative:-1.077, disclosureLevel:'detailed' },
    // Nota 27 — Despesas gerais e administrativas
    { rawLabel:'Salários, encargos e benefícios a funcionários (G&A)', normalizedCategory:'admin_general_expense', amountNative:-22.128, disclosureLevel:'detailed' },
    { rawLabel:'Despesas operacionais e de estruturação', normalizedCategory:'admin_general_expense', amountNative:-30.673, disclosureLevel:'detailed' },
    { rawLabel:'PECLD (recuperação líquida, valor reconciliado — ver cabecera)', normalizedCategory:'admin_general_expense', amountNative:0.020, disclosureLevel:'detailed' },
    { rawLabel:'Serviços profissionais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-9.842, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção (G&A)', normalizedCategory:'admin_general_expense', amountNative:-1.256, disclosureLevel:'detailed' },
    { rawLabel:'Provisão para riscos judiciais', normalizedCategory:'admin_general_expense', amountNative:-6.495, disclosureLevel:'detailed' },
    { rawLabel:'Outros (G&A)', normalizedCategory:'other_expenses', amountNative:-1.659, disclosureLevel:'detailed' },
    // Linha solta da DRE, sem Nota própria
    { rawLabel:'Outras receitas (despesas) operacionais', normalizedCategory:'other_expenses', amountNative:-0.579, disclosureLevel:'detailed' },
  ],
};

const vascodagamaBrFiscalYearMeta = {
  2023: {
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'vascodagama-br-demonstracoes-2023',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos e financiamentos" circulante (44.406) + não circulante (0.248),
    // Nota 18. cash = "Caixa e equivalentes de caixa", Nota 4.
    grossDebt:44.654, cash:79.922,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultado financeiro líquido" (Nota 28).
    netInterest:-53.976, tax:0,
    // officialTotalRevenue = "Receita operacional líquida" impresa (Nota 25). officialTotalExpenses
    // = suma de expenseLines (Custos operacionais + G&A + Outras receitas/despesas operacionais).
    // officialPAT = "Prejuízo do exercício/período" impreso.
    officialTotalRevenue:345.331, officialTotalExpenses:414.853, officialPAT:-123.498,
  },
};

const vascodagamaBrPresupuestoOverlayByYear = {};

const vascodagamaBrPasesData = [];
const vascodagamaBrResultadosData = {};
const vascodagamaBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vascodagama-br'] = {
  revenueLinesByYear: vascodagamaBrRevenueLinesByYear, expenseLinesByYear: vascodagamaBrExpenseLinesByYear,
  fiscalYearMeta: vascodagamaBrFiscalYearMeta, pasesData: vascodagamaBrPasesData,
  resultadosData: vascodagamaBrResultadosData, titulosData: vascodagamaBrTitulosData,
  presupuestoOverlayByYear: vascodagamaBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'vascodagama-br-demonstracoes-2023': {
    id:'vascodagama-br-demonstracoes-2023', clubId:'vascodagama-br',
    title:'Vasco da Gama SAF — Demonstrações Contábeis 2023 (exercício findo em 31/12/2023 e período findo em 31/12/2022)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://media.vasco.com.br/transparencia',
    note:'PDF oficial (texto nativo, 82 páginas), auditado por Grant Thornton Auditores Independentes, parecer SIN salvedades (26/4/2024) — descargado de un mirror en netvasco.com.br porque el dominio oficial (media.vasco.com.br) está bloqueado por un challenge de Cloudflare. Transcripción completa en Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md. 2023 fue un ejercicio de DÉFICIT real (Prejuízo de R$123,498 M), atribuido en el propio balance a un resultado financeiro negativo (R$53,976 M) sobre un resultado operacional ya negativo. No se cargó un 2do ejercicio (2024) esta sesión: el documento originalmente identificado para 2024 (dre-balanco-patrimonial-2024.pdf, mirror de crvascodagama.com) resultó, tras lectura completa, ser las demonstrações contábeis del CRVG (Club de Regatas Vasco da Gama, la associação social) y NO de la SAF — ver comentario de cabecera de data/vascodagama-br-data.js para el detalle. Convertido a USD con PTAX BCB de cierre 31/12/2023 (R$4,8413, FX_CLOSE), el documento no declara su propio tipo de cambio de cierre en un Anexo dedicado.',
  },
});

gestionesByClub['vascodagama-br'] = {
  // No se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién presidió
  // el Vasco SAF durante TODO el ejercicio 2023 (período de disputa societaria con 777 Partners) —
  // entrada mínima para que el selector "Por gestión" no rompa, cubre únicamente el año cargado.
  sinconfirmar: { nombre:'Vasco da Gama SAF (gestión no confirmada en detalle)', firstYear:2023, lastYear:2023 },
};

memberCountByClub['vascodagama-br'] = null;
