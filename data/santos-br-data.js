// ============================================================================
// data/santos-br-data.js — Santos Futebol Clube, Santos, São Paulo, Brasil. Associação civil sem
// fins econômicos (fundado 1912), NO é SAF (a diferencia de Botafogo/Cruzeiro/Coritiba) — mismo tipo
// de entidad que Flamengo (club social/multideportivo con Futebol Profissional, Futebol Amador y
// Clube Social como 3 "departamentos" contables separados, ver estructura abajo). clubId 'santos-br'
// (CON GUIÓN, mismo criterio que flamengo-br/banfield-ar: bracket notation en
// clubs{}/CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub, nunca notación de punto).
//
// 2 ejercicios cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — confirmado
// en la carátula de cada PDF: "exercício social findo em 31 de dezembro de 2024/2025", no asumido
// por el nombre del archivo — clubs.js, fiscalYearStart:'01-01', mismo criterio que Flamengo/
// Botafogo/Grêmio). Fuentes: `Clubes/Brasil/Santos/demonstracoes-financeiras-2023-2024.md` (imprime
// como "exercício corrente" el año 2024, con 2023 de columna comparativa — se cargó SOLO 2024 de
// ESTE documento) y `demonstracoes-financeiras-2024-2025.md` (imprime como "exercício corrente" el
// año 2025, con 2024 de comparativo — se cargó SOLO 2025 de ESTE documento, nunca la columna
// comparativa de un balance posterior, club-data-mapping sección 6.5). Ambos PDF con texto nativo
// (DocuSign), confirmado "SANTOS FUTEBOL CLUBE" explícito y texto coherente en español/portugués
// legible — NO se encontró mojibake en ninguno de los dos (a diferencia del caso Kolos Kovalivka de
// CLAUDE.md, que era cirílico sin ToUnicode: acá el texto sale limpio, sin caracteres sin sentido).
//
// ESTRUCTURA REAL DEL DOCUMENTO (la más rica de fidelidad de todos los clubes brasileños cargados
// hasta ahora, importante para no duplicar plata): la DRE de Santos reporta CADA línea partida en 3
// columnas de DEPARTAMENTO ("Futebol profissional" / "Futebol amador" / "Clube social,
// administrativo e outros desportos"), con una columna "Total" que es la suma de las 3 — mismo
// espíritu que el Anexo III de Vélez (club-data-mapping sección 14: "un balance que desglosa un
// rubro de gasto por SECTOR/DEPARTAMENTO permite separar salarios del plantel del resto, sin
// inventar nada"). Se usó la columna Total para la mayoría de las líneas (una sola revenueLine/
// expenseLine por rubro), EXCEPTO 'Pessoal e encargos sociais' de "Custos do departamento de
// esportes" (la única fila donde los 3 departamentos ameritan categorías DISTINTAS: profissional →
// wages_squad, amador/social → youth_other_sports_expense), donde se cargaron 3 líneas de primer
// nivel en vez de la columna Total combinada — ver categorización de Gastos abajo.
//
// La DRE tiene 3 secciones: "Custos do departamento de esportes" (costo directo de las 3 áreas
// deportivas/sociales), "Despesas operacionais" (G&A, ~100% en la columna "Clube social" con montos
// menores sueltos en profissional/amador) y "Resultado financeiro" (íntegro a netInterest, club-data-
// mapping sección 2 — el propio documento ya lo separa en su propio bloque de la DRE, no hace falta
// reclasificar nada, el "Total do resultado financeiro" impreso es exactamente netInterest).
//
// Escala: valores originales "em milhares de reais" (miles de reales), acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Flamengo/Botafogo/Grêmio: el número impreso,
// reinterpretando el "." como separador decimal en vez de miles, YA es el valor en millones —
// confirmado "(Valores expressos em milhares de Reais...)" en el propio documento, los dos años).
//
// Categorización (Ingresos), columna Total de la DRE:
// - 'Receitas com bilheterias e cotas de participação' -> matchday_competition: el documento agrupa
//   recaudación de entradas y premios/cuotas de participación en UNA sola línea sin separar (mismo
//   criterio de la tabla de club-data-mapping sección 1: "cuando el club NO separa premios de
//   recaudación" -> matchday_competition).
// - 'Receitas com transmissões televisivas' (Nota 21, confirma: "receitas advindas pelas
//   transmissões dos jogos... mediante contratos entre o Clube e as emissoras") -> broadcasting.
// - 'Outras receitas líquidas - Negociação de atletas' (Nota 20/23) -> player_sales, cargada TAL
//   CUAL la reporta la DRE: NETA (ganancia bruta de negociaciones MENOS "custos inerentes" de esas
//   mismas negociaciones, Nota 23) — a diferencia de Flamengo/Botafogo (que reportan bruto en su DRE
//   principal y el sitio replica bruto sin netear), la DRE PRIMARIA de Santos ya presenta este rubro
//   neteado como una única línea de "receita líquida" (club-data-mapping sección 3: "reflejá cómo lo
//   presenta el documento" — acá el documento mismo netea en su estado de resultados principal, así
//   que cargar neto es más fiel a la fuente primaria que reconstruir el bruto de una nota
//   secundaria). 2024: 127.028 (bruto Nota 20: 207.447, costos Nota 23: -80.691). 2025: 134.934.
// - 'Receitas de publicidade' -> sponsorship_commercial.
// - 'Receitas com manutenção e frequência' -> member_dues: no hay una línea "Cuotas sociales"/
//   "Mensalidade" separada en esta DRE — esta es la línea más cercana a cuota de socio (la Nota 7
//   describe el "Programa Sócio Rei", el programa de socios-hinchas del club, con una cuenta a
//   cobrar propia; "manutenção e frequência" es la tasa de mantenimiento/uso de instalaciones que
//   pagan los socios, 100% en la columna "Clube social" los 2 años). Se usó member_dues en vez de
//   other_income por ser la única línea de este tipo disponible, análoga a "Quadro social" de
//   Flamengo.
// - 'Receitas de aluguéis' -> other_income: "Alquileres" genérico, sin nombrar el estadio (Vila
//   Belmiro) ni una parte de él — criterio conservador de club-data-mapping sección 1/13 (NO
//   stadium_other sin que el rótulo nombre el estadio explícitamente).
// - 'Receitas Timemania' -> other_income: ingreso de la lotería federal brasileña Timemania,
//   programa de reparto de recaudación a clubes de fútbol para ayudar a pagar deuda (ligado al
//   PROFUT, ver Nota 18) — específico del régimen brasileño, sin categoría estructural propia en el
//   sitio, no comparable entre clubes.
// - 'Receita de Voluntariado Obtida' (Nota 22, ITG 2002(R1)) -> other_income: valor NOCIONAL (no es
//   caja real) del trabajo voluntario de Administración/Conselheiros, reconocido como contrapartida
//   de un gasto idéntico del mismo monto (ver 'Serviços Prestados por Voluntariado' del lado de
//   Gastos) — efecto neto cero en el resultado, se cargaron ambas líneas para no perder fidelidad
//   con la fuente (mismo criterio de "no aplanar/no omitir" del proyecto).
// - 'Receitas diversas' -> other_income (catch-all explícito de la propia DRE).
//
// Categorización (Gastos):
// "Custos do departamento de esportes" (por rubro, con 'Pessoal e encargos sociais' partida por
// departamento — ver nota de cabecera arriba):
// - 'Pessoal e encargos sociais (Futebol profissional)' -> wages_squad.
// - 'Pessoal e encargos sociais (Futebol amador)' -> youth_other_sports_expense (formación,
//   categorías inferiores).
// - 'Pessoal e encargos sociais (Clube social, administrativo e outros desportos)' ->
//   youth_other_sports_expense: mismo criterio que el Anexo III de Vélez (club-data-mapping sección
//   14) para la columna "resto" cuando el documento no separa más fino — cubre personal de áreas no
//   futbolísticas/no administrativas puras que caen en esta columna combinada.
// - 'Jogos e bonificações' -> match_organisation_expense (columna Total, las 3 áreas).
// - 'Direitos de imagem e arena' -> wages_squad: combina 'Direito de imagem' (estructura habitual de
//   compensación a jugadores en Brasil, mismo criterio Flamengo/Botafogo) con 'direito de arena' (ley
//   de derecho de arena, un porcentaje de ingresos de TV que se reparte a los jugadores por
//   disposición legal — también compensación al plantel), el documento no las separa.
// - 'Amortização de gastos com atletas' -> player_amortisation (cargo contable de amortización del
//   costo de adquisición/formación de atletas, columna Total).
// - 'Outros custos' (catch-all de "Custos do departamento de esportes") -> other_expenses.
// "Despesas operacionais" (columna Total, ~100% en "Clube social" con montos menores sueltos):
// - 'Pessoal e encargos sociais' (de ESTA sección, administrativa, distinta de la de Custos arriba)
//   -> admin_general_expense: a diferencia de la fila homónima de "Custos do departamento de
//   esportes", esta vive bajo "Despesas operacionais" (G&A), es personal administrativo, no del
//   plantel ni de fútbol amador — se mantuvo como columna Total sin partir por departamento (los
//   montos en profissional/amador son marginales, <2% del total los 2 años).
// - 'Gerais e administrativas' / 'Serviços profissionais' -> admin_general_expense.
// - 'Depreciações' -> depreciation.
// - 'Amortização Intangível - software' -> other_amortisation (amortización de un intangible NO
//   relacionado a jugadores — software —, categoría específica para este tipo de cargo).
// - 'Serviços Prestados por Voluntariado' (Nota 22) -> other_expenses: contrapartida exacta de
//   'Receita de Voluntariado Obtida' del lado de Ingresos, ver nota arriba.
// - 'Outras receitas (despesas) líquidas' -> other_expenses: catch-all de la propia nota, sin mayor
//   desglose disponible en el documento (se buscó una Nota dedicada, no existe — el único desglose
//   relacionado, Nota 23 "Custos com negociações de atletas", ya está neteado dentro de la línea de
//   Ingresos 'Outras receitas líquidas - Negociação de atletas').
// "Resultado financeiro": NO se carga como línea (club-data-mapping sección 2) — 'Atualizações
// monetárias de tributos' + 'Juros sobre empréstimos' + 'Outras despesas financeiras' + 'Outras
// receitas financeiras' se suman íntegras a netInterest, el propio documento ya las agrupa en un
// bloque separado de la DRE con su propio subtotal ("Total do resultado financeiro"), que es
// exactamente el netInterest de cada año.
//
// No hay 'Resultado de equivalência patrimonial' ni ningún otro ítem no operativo/no recurrente en
// la DRE de Santos (a diferencia de Flamengo/Botafogo) -> exceptional_items no se usa, 0 en los 2
// años. Tampoco hay línea de Imposto de renda/CSLL (asociación civil sin fines de lucro) -> tax:0 los
// 2 años. profitOnPlayerSales = assetSales = 0 (todo ya está en revenueLines/expenseLines, sin
// neteo adicional del lado del sitio más allá del que ya hace el propio documento, ver nota de
// 'player_sales' arriba).
//
// VERIFICACIÓN (Node, antes de cargar):
// 2024: revenueLines suman EXACTO 379,070 M BRL = "Total das receitas" impreso. expenseLines
// (Custos: 297,661 M + Despesas operacionais: 113,642 M) suman EXACTO -411,303 M BRL. revenue +
// expenses (-411,303) + netInterest (-72,973, = "Total do resultado financeiro" impreso exacto) =
// -105,206 M BRL = "(Déficit) Superávit do Exercício" impreso, EXACTO (déficit real, explicado en el
// Relatório da Administração por: encargos de financiamentos/empréstimos, atualização SELIC de
// parcelamentos PROFUT/Perse, variação cambial de contratos en moeda estrangeira, y provisões para
// demandas judiciais — el propio documento reporta un SUPERÁVIT operacional de R$58 M antes de
// financeiro/provisões, que se revierte a déficit por esos 4 factores).
// 2025: revenueLines suman EXACTO 624,922 M BRL = "Total das receitas" impreso. expenseLines
// (Custos: 558,925 M + Despesas operacionais: 69,485 M) suman EXACTO -628,410 M BRL. revenue +
// expenses (-628,410) + netInterest (-75,908, = "Total do resultado financeiro" impreso exacto) =
// -79,396 M BRL = "(Déficit) do Exercício" impreso, EXACTO (segundo año consecutivo de déficit, algo
// menor que 2024, pese a un salto grande en Receitas com transmissões televisivas —156,172 M vs.
// 55,480 M en 2024— y en Direitos de imagem e arena/Amortização de gastos com atletas del lado de
// Gastos, reflejando mayor actividad de plantel/transferencias).
//
// grossDebt/cash: el Balanço Patrimonial separa "Empréstimos e Antecipação de recebíveis" (Nota 11,
// corrente+não corrente) de "Contas a pagar" (deuda comercial con otros clubes/intermediarios, Nota
// 12), "Parcelamentos de tributos — PROFUT" (Nota 18) y "Acordos Judiciais" (Nota 19) — se usó la
// línea más angosta (Nota 11), que combina préstamos bancarios reales (Safra, Daycoval, BMG/XP,
// Itaú, Caixa Econômica) CON "Antecipação de recebíveis" de la Federação Paulista (factoring contra
// cuotas de campeonato futuras) — se incluyó esta última en grossDebt por ser financiamiento real
// (aunque no sea un préstamo bancario puro), mismo espíritu que la Nota 11 del propio documento, que
// la agrupa junto con los préstamos bajo un único título ("Empréstimos e Antecipação de
// Recebíveis"), a diferencia de "Contas a pagar" (deuda comercial ordinaria) que se dejó afuera.
// 2024: 129,591 M BRL (125,212 corrente + 4,379 não corrente). 2025: 94,338 M BRL (83,085 + 11,253).
// cash = 'Caixa e equivalentes de caixa' (Nota 5), EXCLUYENDO 'Aplicação Financeira' (Nota 6, una
// inversión financiera separada, no caja/equivalente de caja) — no hay 'Caixa restrito' en este
// balance. Valores MUY chicos los 2 años (Santos viene de una crisis de liquidez documentada en el
// propio Relatório da Administração: "início da gestão... déficit financeiro de R$62 milhões" a
// fines de 2023): 2024: 0,170 M BRL. 2025: 0,295 M BRL. Confirmado que no es error de transcripción:
// el propio balance dedica varios párrafos del Relatório da Administração a explicar cómo se
// gestionó la escasez de caja durante 2024 (antecipação de receitas de 2025, empréstimos, etc.).
//
// FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio en un Anexo dedicado
// (solo hay una nota de política contable genérica, "2.2 Conversão de moeda estrangeira", sin un
// valor numérico impreso) — PTAX de cierre BCB, referenciado a FX_CLOSE (entradas ya existentes):
// BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024), mismas que usan Flamengo/Botafogo para sus
// mismos cierres.
//
// Gestión: Marcelo Pirilo Teixeira, mandato 2024/2026 — confirmado DIRECTO en la firma de ambos
// balances ("Marcelo Pirilo Teixeira — Presidente do Santos Futebol Clube — 2024/2026"), cubre
// TODO el ejercicio 2024 y TODO el ejercicio 2025 con confianza total (más fuerte que una
// confirmación de prensa: sale del propio documento oficial).
//
// memberCountByClub: null — no se encontró una cifra total de sócios/associados en ninguno de los 2
// PDF (hay una cuenta a cobrar del "Programa Sócio Rei", Nota 7.1, pero ninguna cantidad total de
// socios impresa).
// ============================================================================

const santosBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receitas com bilheterias e cotas de participação', normalizedCategory:'matchday_competition', amountNative:34.342, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com transmissões televisivas', normalizedCategory:'broadcasting', amountNative:55.480, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas líquidas - Negociação de atletas', normalizedCategory:'player_sales', amountNative:127.028, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de publicidade', normalizedCategory:'sponsorship_commercial', amountNative:89.114, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com manutenção e frequência', normalizedCategory:'member_dues', amountNative:28.032, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de aluguéis', normalizedCategory:'other_income', amountNative:0.827, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Timemania', normalizedCategory:'other_income', amountNative:0.600, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Voluntariado Obtida', normalizedCategory:'other_income', amountNative:1.620, disclosureLevel:'detailed' },
    { rawLabel:'Receitas diversas', normalizedCategory:'other_income', amountNative:42.027, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Receitas com bilheterias e cotas de participação', normalizedCategory:'matchday_competition', amountNative:32.326, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com transmissões televisivas', normalizedCategory:'broadcasting', amountNative:156.172, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas líquidas - Negociação de atletas', normalizedCategory:'player_sales', amountNative:134.934, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de publicidade', normalizedCategory:'sponsorship_commercial', amountNative:142.433, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com manutenção e frequência', normalizedCategory:'member_dues', amountNative:57.224, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de aluguéis', normalizedCategory:'other_income', amountNative:1.374, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Timemania', normalizedCategory:'other_income', amountNative:0.600, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Voluntariado Obtida', normalizedCategory:'other_income', amountNative:1.620, disclosureLevel:'detailed' },
    { rawLabel:'Receitas diversas', normalizedCategory:'other_income', amountNative:98.239, disclosureLevel:'detailed' },
  ],
};

const santosBrExpenseLinesByYear = {
  2024: [
    // Custos do departamento de esportes
    { rawLabel:'Pessoal e encargos sociais (Futebol profissional)', normalizedCategory:'wages_squad', amountNative:-121.841, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (Futebol amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-21.022, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (Clube social, administrativo e outros desportos)', normalizedCategory:'youth_other_sports_expense', amountNative:-14.955, disclosureLevel:'detailed' },
    { rawLabel:'Jogos e bonificações', normalizedCategory:'match_organisation_expense', amountNative:-31.550, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de imagem e arena', normalizedCategory:'wages_squad', amountNative:-29.411, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de gastos com atletas', normalizedCategory:'player_amortisation', amountNative:-43.944, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (departamento de esportes)', normalizedCategory:'other_expenses', amountNative:-34.938, disclosureLevel:'detailed' },
    // Despesas operacionais
    { rawLabel:'Pessoal e encargos sociais (despesas administrativas)', normalizedCategory:'admin_general_expense', amountNative:-17.270, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-28.260, disclosureLevel:'detailed' },
    { rawLabel:'Serviços profissionais', normalizedCategory:'admin_general_expense', amountNative:-8.636, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-2.563, disclosureLevel:'detailed' },
    { rawLabel:'Amortização Intangível - software', normalizedCategory:'other_amortisation', amountNative:-0.412, disclosureLevel:'detailed' },
    { rawLabel:'Serviços Prestados por Voluntariado', normalizedCategory:'other_expenses', amountNative:-1.620, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (despesas) líquidas', normalizedCategory:'other_expenses', amountNative:-54.881, disclosureLevel:'detailed' },
  ],
  2025: [
    // Custos do departamento de esportes
    { rawLabel:'Pessoal e encargos sociais (Futebol profissional)', normalizedCategory:'wages_squad', amountNative:-217.540, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (Futebol amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-28.929, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (Clube social, administrativo e outros desportos)', normalizedCategory:'youth_other_sports_expense', amountNative:-14.943, disclosureLevel:'detailed' },
    { rawLabel:'Jogos e bonificações', normalizedCategory:'match_organisation_expense', amountNative:-31.513, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de imagem e arena', normalizedCategory:'wages_squad', amountNative:-102.278, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de gastos com atletas', normalizedCategory:'player_amortisation', amountNative:-91.272, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (departamento de esportes)', normalizedCategory:'other_expenses', amountNative:-72.450, disclosureLevel:'detailed' },
    // Despesas operacionais
    { rawLabel:'Pessoal e encargos sociais (despesas administrativas)', normalizedCategory:'admin_general_expense', amountNative:-19.543, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-11.386, disclosureLevel:'detailed' },
    { rawLabel:'Serviços profissionais', normalizedCategory:'admin_general_expense', amountNative:-13.071, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-2.499, disclosureLevel:'detailed' },
    { rawLabel:'Amortização Intangível - software', normalizedCategory:'other_amortisation', amountNative:-0.420, disclosureLevel:'detailed' },
    { rawLabel:'Serviços Prestados por Voluntariado', normalizedCategory:'other_expenses', amountNative:-1.620, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (despesas) líquidas', normalizedCategory:'other_expenses', amountNative:-20.946, disclosureLevel:'detailed' },
  ],
};

const santosBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'santos-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'teixeira',
    // grossDebt = "Empréstimos e Antecipação de recebíveis" (Nota 11), corrente + não corrente —
    // ver comentario de cabecera. cash = "Caixa e equivalentes de caixa" (Nota 5), EXCLUYENDO
    // "Aplicação Financeira" (Nota 6).
    grossDebt:129.591, cash:0.170,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Total do resultado financeiro" impreso (Atualizações monetárias de tributos
    // -21,769 + Juros sobre empréstimos -13,880 + Outras despesas financeiras -66,832 + Outras
    // receitas financeiras +29,508).
    netInterest:-72.973, tax:0,
    // officialTotalRevenue = "Total das receitas" impreso (379,070 M BRL). officialTotalExpenses =
    // "Total dos Custos" (297,661) + "Total das Despesas Operacionais" (113,642) = 411,303 M BRL (no
    // hay exceptional_items que excluir, Santos no tiene ítems no operativos en esta DRE).
    // officialPAT = "(Déficit) Superávit do Exercício" impreso (-105,206 M BRL, déficit real).
    officialTotalRevenue:379.070, officialTotalExpenses:411.303, officialPAT:-105.206,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'santos-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'teixeira',
    grossDebt:94.338, cash:0.295,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Total do resultado financeiro" impreso (Atualizações monetárias de tributos
    // -37,905 + Juros sobre empréstimos -28,122 + Outras despesas financeiras -86,970 + Outras
    // receitas financeiras +77,089).
    netInterest:-75.908, tax:0,
    // officialTotalRevenue = "Total das receitas" impreso (624,922 M BRL). officialTotalExpenses =
    // "Total dos Custos" (558,925) + "Total das Despesas Operacionais" (69,485) = 628,410 M BRL.
    // officialPAT = "(Déficit) do Exercício" impreso (-79,396 M BRL, déficit real, segundo año
    // consecutivo aunque algo menor que 2024).
    officialTotalRevenue:624.922, officialTotalExpenses:628.410, officialPAT:-79.396,
  },
};

const santosBrPresupuestoOverlayByYear = {};

const santosBrPasesData = [];
const santosBrResultadosData = {};
const santosBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['santos-br'] = {
  revenueLinesByYear: santosBrRevenueLinesByYear, expenseLinesByYear: santosBrExpenseLinesByYear,
  fiscalYearMeta: santosBrFiscalYearMeta, pasesData: santosBrPasesData,
  resultadosData: santosBrResultadosData, titulosData: santosBrTitulosData,
  presupuestoOverlayByYear: santosBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'santos-br-demonstracoes-2024': {
    id:'santos-br-demonstracoes-2024', clubId:'santos-br',
    title:'Demonstrações Financeiras, Exercício Findo em 31 de Dezembro de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://transparencia.santosfc.com.br/',
    note:'PDF oficial (texto nativo, assinado via DocuSign), descargado del portal de transparencia oficial del club (Balanco-Auditado-Ano-2024.pdf, mismo archivo espejado en media.santosfc.com.br y en el repositorio de la Federação Paulista de Futebol). Déficit real de R$105,206 mil, pese a un superávit operacional de R$58 M antes de resultado financeiro y provisiones judiciales — el propio Relatório da Administração atribuye la diferencia a encargos de financiamentos/empréstimos, actualización SELIC de parcelamentos PROFUT/Perse, variación cambial de contratos en moeda estrangeira y provisões para demandas judiciais. Situación de caja muy ajustada al cierre (R$170 mil en Caixa e equivalentes), documentada en el propio Relatório: déficit financeiro de R$62 M a fines de 2023, gestionado durante 2024 con antecipação de receitas de 2025 y nuevos empréstimos. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Santos/demonstracoes-financeiras-2023-2024.md.',
  },
  'santos-br-demonstracoes-2025': {
    id:'santos-br-demonstracoes-2025', clubId:'santos-br',
    title:'Demonstrações Financeiras, Exercício Findo em 31 de Dezembro de 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://media.santosfc.com.br/',
    note:'PDF oficial (texto nativo, assinado via DocuSign), descargado del dominio de medios del sitio oficial (Demonstracoes_Financeiras-2025-assinada.pdf, mismo archivo espejado en el repositorio de la Federação Paulista de Futebol). Segundo año consecutivo de déficit real (R$79,396 mil), algo menor que 2024, con un salto grande de Receitas com transmissões televisivas (R$156,172 M vs. R$55,480 M en 2024) y de Direitos de imagem e arena/Amortização de gastos com atletas del lado de Gastos, reflejando mayor actividad de plantel/transferencias. Caja al cierre sigue muy ajustada (R$295 mil en Caixa e equivalentes). Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024). Transcripción completa en Clubes/Brasil/Santos/demonstracoes-financeiras-2024-2025.md.',
  },
});

gestionesByClub['santos-br'] = {
  // Marcelo Pirilo Teixeira, mandato 2024/2026 — confirmado directo en la firma de ambos balances
  // ("Presidente do Santos Futebol Clube — 2024/2026"), cubre los 2 ejercicios cargados completos.
  teixeira: { nombre:'Marcelo Pirilo Teixeira (2024-2026)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['santos-br'] = null; // no se encontró una cifra total de sócios/associados en ninguno de los 2 PDF
