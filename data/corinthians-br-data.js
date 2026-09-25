// ============================================================================
// data/corinthians-br-data.js — Sport Club Corinthians Paulista, São Paulo, Brasil. NO es SAF: es
// una sociedade civil de fins não econômicos (associação), fundada em 1910 — mismo tipo de entidad
// que Flamengo/Palmeiras (asociación multideportiva, NO sociedad anônima do futebol). clubId
// 'corinthians-br' (CON GUIÓN, mismo criterio que banfield-ar/flamengo-br: bracket notation en
// clubs{}/CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub, nunca notación de punto).
//
// 2 ejercicios cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — clubs.js,
// fiscalYearStart:'01-01', confirmado leyendo la carátula de CADA balance: "Exercícios findos em 31
// de dezembro de 2024 e 2023" / "...de 2025 e 2024"). Fuente: "Demonstrações Financeiras" oficiales
// del Clube, descargadas de corinthians.com.br/clube/transparencia/demonstracoes-financeiras-e-
// balancetes-patrimoniais (ver fuentes/Brasil/Corinthians.md — las URLs de PDF de ese portal llevan
// un query string `?rand=` inestable entre sesiones, no confiar en el link directo sin re-visitar la
// página). 2024 se cargó del documento demonstracoes-financeiras-2023-2024.pdf (SU PROPIO año
// corriente, no la columna comparativa de 2025 — club-data-mapping sección 6.5); 2025 del documento
// demonstracoes-financeiras-2024-2025.pdf (ídem). Transcripciones completas en
// Clubes/Brasil/Corinthians/demonstracoes-financeiras-2023-2024.md (3224 líneas) y
// demonstracoes-financeiras-2024-2025.md (5211 líneas).
//
// Escala: valores originales "em milhares de reais" (miles de reales) en los 2 documentos — acá en
// MILLONES de BRL nativos (dividir por 1.000, mismo criterio que Flamengo/Botafogo: el número
// impreso, reinterpretando el "." como separador decimal en vez de miles, YA es el valor en
// millones).
//
// ESTRUCTURA REAL DE CADA DOCUMENTO (cambió entre los 2 años, IMPORTANTE):
// - 2024 (demonstracoes-financeiras-2023-2024.pdf): la DRE audita SEGMENTADA en 2 bloques —
//   "Segmento futebol" y "Segmento clube social e esportes amadores" — cada uno con su propio
//   cuerpo completo (receita bruta -> deduções -> despesas -> resultado financeiro -> superávit/
//   déficit del segmento), y el Total del Clube es la SUMA de los 2 segmentos ("Total de Superávit
//   (déficit) do exercício", pág. 10 del .md). Se cargaron las líneas de LOS 2 segmentos por
//   separado (con su `rawLabel` indicando el segmento de origen cuando hacía falta distinguir), NO
//   la "DRE Gerencial Ajustado" que el propio documento arma en la Nota 2.13 (es una reclasificación
//   NO auditada, hecha para separar efectos de deudas pasadas de ejercicios anteriores — se usó
//   únicamente como CHEQUEO CRUZADO de que la combinación de los 2 segmentos da el mismo total,
//   verificado exacto).
//   - "Rateio de despesas administrativas" (Nota 17): asignación INTERNA de gastos entre los 2
//     segmentos, -31.289 en el segmento futebol y +31.289 en el segmento clube social (mismo
//     importe, signo contrario) — se cargaron LAS 2 líneas tal cual, se cancelan solas al sumarse
//     (no hace falta neteo manual).
// - 2025 (demonstracoes-financeiras-2024-2025.pdf): la DRE ya NO está segmentada — es una única
//   "Demonstração do Resultado do Exercício" consolidada (pág. 35 del .md), con Notas 19-25 que
//   desglosan cada línea con mucho más detalle que el documento de 2024 (incluye sub-notas por
//   fuente de ingreso/gasto, ej. Nota 19.1 Direitos de TV, 19.2 Matchday, 19.3 Participações e
//   premiações, 19.4 Comerciais, 19.5 Programa Fiel Torcedor; Nota 24 con el desglose bruto de
//   Cessão definitiva/Baixa de atletas/Despesa na cessão). El cambio de formato entre los 2 años es
//   real (el propio documento de 2025 lo explica en la nota 2.x "Alterações na estrutura da
//   Demonstração do Resultado": "passou a ser apresentada em formato consolidado"), no un error de
//   transcripción — por eso las categorías de 2024 y 2025 no calzan línea por línea, aunque el
//   criterio de categorización (normalizedCategory) es el mismo.
//
// Categorización (Ingresos) — 2024 (por segmento):
// - Segmento futebol: 'Direitos de transmissão de TV' -> broadcasting; 'Patrocínios e publicidades'
//   -> sponsorship_commercial; 'Arrecadação de jogos' -> matchday_competition; 'Receitas com
//   repasses de direitos federativos' (venta/cesión de derechos federativos de jugadores) ->
//   player_sales.
// - Segmento clube social: 'Contribuições dos sócios' -> member_dues; 'Patrocínios e publicidades'
//   -> sponsorship_commercial; 'Arrecadação de jogos' -> matchday_competition (marginal, $88 mil);
//   'Licenciamento e franquias' -> sponsorship_commercial.
// - 'Premiações, Fiel Torcedor, Loterias e Outras' (AMBOS segmentos): línea COMBINADA que el propio
//   documento no desglosa (mezcla premios por competencia + programa de socio-hincha "Fiel
//   Torcedor" + lotería + varios) — club-data-mapping sección 1 ("no forzar una separación que el
//   dato no tiene"): se cargó entera a other_income en vez de asumir qué proporción es cada
//   concepto. Confirmado con el documento de 2025 (que SÍ separa "Programa Fiel Torcedor" como nota
//   propia, ver abajo) que esta línea combinada mezclaba conceptos genuinamente distintos, no era
//   solo un problema de nomenclatura.
// - 'Explorações comerciais' (segmento clube social, $3.908 mil): sin nota propia con más detalle,
//   ambigua (¿alquiler de espacios? ¿explotación comercial genérica?) -> other_income (catch-all
//   conservador, mismo criterio que un "Alquileres" genérico sin nombrar el estadio).
// - 'Impostos e contribuições' (deducción sobre receita bruta, AMBOS segmentos) -> other_income
//   (línea negativa, contra-revenue).
// - 'Outras receitas (despesas) operacionais' (AMBOS segmentos, neto) -> other_income.
//
// Categorización (Ingresos) — 2025 (consolidado, Nota 19 "Receita Operacional Líquida"):
// - 'Direitos de TV' (Nota 19.1) -> broadcasting.
// - 'Matchday' (Nota 19.2, bilheteria BRUTA — los costos de operar el partido van del lado de
//   Gastos, ver 'Despesas com jogos' abajo, NO se netean acá) -> matchday_competition.
// - 'Participação e Premiações' (Nota 19.3) -> competition_bonus.
// - 'Comerciais' (Nota 19.4: patrocínio no uniforme, material esportivo, outros patrocínios,
//   publicidade estática) -> sponsorship_commercial.
// - 'Locação de espaço' ($2.227 mil, sin nota propia, ambigua) -> other_income (criterio
//   conservador: un "Locação" genérico sin nombrar el estádio no es stadium_other).
// - 'Programa Fiel Torcedor' (Nota 19.5, ahora con nota propia y explícitamente descripto como
//   "receitas do programa de sócio torcedor do Clube") -> member_dues.
// - 'Parque São Jorge - Sócios e Atividades' -> member_dues: coincide EXACTO ($26.991 mil) con la
//   "Contribuições dos sócios" del documento de 2024, confirma que es el mismo concepto
//   reetiquetado, no uno nuevo.
// - 'Licenciamentos' -> sponsorship_commercial.
// - 'Outras Receitas' (eventos, memorial, estacionamento, programa Timemania) -> other_income.
// - Deducciones 'Impostos e contribuições' + 'Outras deduções' (Nota 19) -> other_income
//   (negativas).
// - 'Outras receitas (despesas) operacionais líquidas' (línea de la DRE, fuera de la Nota 19) ->
//   other_income.
// - 'Cessão definitiva de atletas' (Nota 24.1, receita BRUTA de venta de jugadores) -> player_sales
//   (bruto, sin netear — ver Gastos abajo para la baja/comisión, mismo criterio que Botafogo).
//
// Categorización (Gastos) — 2024 (por segmento):
// - Segmento futebol: 'Pessoal' -> wages_squad; 'Serviços de terceiros' -> admin_general_expense;
//   'Gerais e administrativas' -> admin_general_expense; 'Custo com vendas e aquisição de atletas'
//   (comisiones/costos de transacción de compra-venta de jugadores, sin nota propia de detalle) ->
//   other_expenses (mismo criterio que 'Gastos com negociação de atletas' de Flamengo/Botafogo);
//   'Futebol' ($54.566 mil, sin nota propia — costo operativo del área de fútbol no desglosado más)
//   -> match_organisation_expense; 'Rateio de despesas administrativas' -> admin_general_expense.
// - Segmento clube social: 'Pessoal' -> youth_other_sports_expense (personal del segmento social +
//   esportes amadores, mismo criterio que Banfield/Corinthians clube social); 'Serviços de
//   terceiros' -> admin_general_expense; 'Gerais e administrativas' -> admin_general_expense;
//   'Esportes amadores' -> youth_other_sports_expense; 'Rateio das despesas administrativas'
//   (+31.289, crédito que cancela la línea espejo del segmento futebol) -> admin_general_expense.
// - 'Provisão de contingências' (Nota 15, litigios cíveis/trabalhistas/tributários/CNRD-FIFA-CAS,
//   SOLO segmento futebol, $112.242 mil) -> exceptional_items: el propio documento la presenta
//   DEBAJO de "Total das despesas operacionais" (fuera del cuerpo operativo, antes del resultado
//   financiero), misma ubicación estructural que 'Resultado de equivalência patrimonial' en
//   Flamengo/Botafogo — señal fuerte de que el documento mismo la trata como no-operativa.
// - 'Depreciação e amortização de direitos' (AMBOS segmentos, $82.489 mil futebol + $3.065 mil
//   social = $85.554 mil combinado): el documento NO separa depreciación de bienes de uso de
//   amortización de derechos federativos en esta línea de la DRE, pero la Nota 7 (Imobilizado) SÍ
//   declara la depreciación de bienes de uso del ejercicio completo del Clube ($11.259 mil) en su
//   movimiento de altas/bajas — se usó ese dato para separar: depreciation = $11.259 mil (todo el
//   Imobilizado del Clube, sin discriminar por segmento, ya que la Nota 7 no lo separa);
//   player_amortisation = resto ($85.554 − $11.259 = $74.295 mil). Aproximación documentada
//   (club-data-mapping sección 5, "una aproximación documentada es mejor que forzar una separación
//   que el dato no tiene del todo limpia"), NO un dato inventado: el monto de depreciación de bienes
//   de uso es real y viene de la Nota 7, solo su atribución a "futebol" vs. "clube social" no está
//   disponible.
//
// Categorización (Gastos) — 2025 (consolidado):
// - 'Despesas com pessoal' (Nota 20: Salários e ordenados + Prêmios + Direito de Imagem + Encargos
//   sobre folha + Benefícios a funcionários) -> wages_squad, cargado como UNA línea con `items` del
//   desglose de la Nota 20.
// - 'Despesas administrativas' (Nota 21): 'Despesas Administrativas' + 'Impostos e Taxas' ->
//   admin_general_expense; 'Amortizações e Depreciações' ($104.816 mil, la propia Nota 21 aclara que
//   "referem-se substancialmente à amortização dos direitos federativos de atletas... e à
//   depreciação dos bens do ativo imobilizado") -> se separó igual que en 2024, usando la
//   depreciación de bienes de uso REAL del ejercicio (Nota 8 Imobilizado, movimiento: $12.138 mil) ->
//   depreciation; resto ($104.816 − $12.138 = $92.678 mil) -> player_amortisation (consistente con
//   el monto de amortização de direitos federativos que declara la Nota 9, Intangível: $93.041 mil,
//   diferencia de $363 mil por partidas menores no separables).
// - 'Despesas comerciais' (Nota 22): 'Despesas com Materiais e Serviços' -> admin_general_expense;
//   'Despesas com jogos' (= el "Total de despesa de jogos" de la Nota 19.2 Matchday) ->
//   match_organisation_expense (separado del resto de comerciales por tener categoría propia y
//   estar explícitamente vinculado a los costos de operar los partidos).
// - 'Despesas jurídicas e contingências' (Nota 23: indenizações/acordos/decisões judiciais + custas
//   processuais + provisão para contingências) -> exceptional_items, mismo criterio que 2024
//   (litigios/contingencias, ahora con nota propia separada en vez de una sola línea "Provisão de
//   contingências").
// - 'Outras receitas (despesas) operacionais líquidas' -> ya cargada en Ingresos (other_income, ver
//   arriba, es neta y positiva en 2025).
// - Nota 24 "Resultado na negociação de direitos": '(-) Baixa de atletas' (valor contable residual
//   dado de baja al transferir, cargo contable real de derecognición) -> player_amortisation, mismo
//   criterio que 'Baixa de atletas' de Botafogo; '(-) Despesa na cessão de atletas' (comisiones a
//   intermediarios, tasas federativas) -> other_expenses, mismo criterio que 'Despesa na cessão de
//   atletas' de Botafogo.
//
// netInterest = 'Despesas financeiras líquidas' (2024: −169.223 futebol + −109.933 social =
// −279.156, Nota 18) / 'Receitas financeiras' − 'Despesas financeiras' (2025: 266.385 − 324.492 =
// −58.107, Nota 25) — NUNCA como línea (club-data-mapping sección 2). tax = 0 los 2 años (sociedade
// civil sem fins lucrativos, sin línea de imposto de renda en ninguna de las 2 DRE).
// profitOnPlayerSales = assetSales = 0 (no se netea nada aparte de lo ya bruto en
// revenueLines/expenseLines).
//
// VERIFICACIÓN (Node, antes de cargar):
// 2024: revenueLines suman EXACTO 1.081,930 M BRL (1.019,229 segmento futebol + 62,701 segmento
// social); expenseLines ordinarias (excluyendo exceptional_items) suman EXACTO 872,298 M BRL
// (677,297 futebol + 109,447 social + 85,554 depreciación/amortización combinada); revenue −
// expenses_ordinarias − exceptional_items(112,242) + netInterest(−279,156) = 1.081,930 − 872,298 −
// 112,242 − 279,156 = −181,766 M BRL = "Total de Superávit (déficit) do exercício" impreso, EXACTO
// (déficit real, atribuido en la propia Nota 1.1 a "incerteza relacionada com a continuidade
// operacional" y un saldo expressivo de contingências reconhecidas).
// 2025: revenueLines suman EXACTO 923,076 M BRL; expenseLines ordinarias (excl. exceptional) suman
// EXACTO 943,262 M BRL; revenue − expenses_ordinarias − exceptional_items(65,148) +
// netInterest(−58,107) = 923,076 − 943,262 − 65,148 − 58,107 = −143.441 M BRL = "Prejuízo do
// exercício" impreso, EXACTO.
//
// grossDebt = 'Empréstimos e financiamentos' (circulante + não circulante), línea angosta separada
// de Fornecedores/Tributos parcelados/Provisão para contingências en el propio Balanço Patrimonial
// (mismo criterio que Botafogo/Flamengo/club-data-mapping sección 14): 2024 = 227,722 + 16,950 =
// 244,672 M BRL (Notas 10/10, doc. propio de 2024); 2025 = 146,782 + 103,250 = 250,032 M BRL (Notas
// 11/11, doc. propio de 2025 — la numeración de notas del pasivo cambió entre los 2 documentos,
// confirmado por el VALOR de 'Fornecedores' 2024 idéntico en los 2 documentos: 372,927 M BRL).
// cash = 'Caixa e equivalentes de caixa': 2024 = 12,699 M BRL; 2025 = 26,019 M BRL.
//
// FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio en un Anexo dedicado
// (solo lenguaje de política contable genérico sobre "taxa de câmbio de fechamento", sin un valor
// numérico impreso) — PTAX de cierre BCB, referenciado a FX_CLOSE (ya existían las 2 entradas antes
// de esta sesión): BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// Gestión: AMBOS años confirmados por el propio documento, no por prensa externa. 2024: Augusto
// Pereira de Melo, Presidente, eleito 25/11/2023 para o triênio 2024-2026, empossado 02/01/2024 —
// presidió TODO el ejercicio 2024 (nota 1, Contexto Operacional, doc. 2023-2024). 2025: ejercicio
// MIXTO — Augusto Melo continuó como Presidente hasta que el Conselho Deliberativo deliberó su
// afastamento; Osmar Stábile asumió INTERINAMENTE el 28/05/2025 y fue empossado oficialmente el
// 25/08/2025, com mandato até 31/12/2026 (nota 1, Contexto Operacional/Continuidade, doc.
// 2024-2025: "A Administração do Clube é exercida pelo Sr. Osmar Stábile... que assumiu o cargo
// interinamente em 28 de maio de 2025... A transição de gestão ocorreu de forma ordenada"). Se
// atribuyó el ejercicio 2025 completo a Stábile (gestionId 'stabile'): presidió la mayor parte del
// año (jun-dic, ~7 de 12 meses) y estaba en el cargo al cierre del ejercicio (31/12/2025) — mismo
// criterio que el sitio ya usa para atribuir un ejercicio a quien esté al mando al cierre cuando hay
// un cambio de gestión intra-año.
//
// memberCountByClub: null — no se encontró una cifra total de sócios/associados en ninguno de los 2
// PDF (sí hay ingresos de "Contribuições dos sócios"/"Programa Fiel Torcedor" y la Nota 19.5 de 2025
// menciona "ultrapassando 124 mil sócios adimplentes", pero es una cifra de ADIMPLENTES del
// programa Fiel Torcedor puntual, no el total de sócios del Clube).
// ============================================================================

const corinthiansBrRevenueLinesByYear = {
  2024: [
    // Segmento futebol
    { rawLabel:'Direitos de transmissão de TV (segmento futebol)', normalizedCategory:'broadcasting', amountNative:295.064, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios e publicidades (segmento futebol)', normalizedCategory:'sponsorship_commercial', amountNative:253.721, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de jogos (segmento futebol)', normalizedCategory:'matchday_competition', amountNative:93.994, disclosureLevel:'detailed' },
    { rawLabel:'Premiações, Fiel Torcedor, Loterias e Outras (segmento futebol)', normalizedCategory:'other_income', amountNative:70.635, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com repasses de direitos federativos (segmento futebol)', normalizedCategory:'player_sales', amountNative:338.421, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições (dedução, segmento futebol)', normalizedCategory:'other_income', amountNative:-34.536, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (despesas) operacionais (segmento futebol)', normalizedCategory:'other_income', amountNative:1.930, disclosureLevel:'detailed' },
    // Segmento clube social e esportes amadores
    { rawLabel:'Contribuições dos sócios (segmento clube social)', normalizedCategory:'member_dues', amountNative:26.991, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios e publicidades (segmento clube social)', normalizedCategory:'sponsorship_commercial', amountNative:10.828, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de jogos (segmento clube social)', normalizedCategory:'matchday_competition', amountNative:0.088, disclosureLevel:'detailed' },
    { rawLabel:'Explorações comerciais (segmento clube social)', normalizedCategory:'other_income', amountNative:3.908, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento e franquias (segmento clube social)', normalizedCategory:'sponsorship_commercial', amountNative:19.750, disclosureLevel:'detailed' },
    { rawLabel:'Premiações, Fiel Torcedor, Loterias e Outras (segmento clube social)', normalizedCategory:'other_income', amountNative:1.523, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições (dedução, segmento clube social)', normalizedCategory:'other_income', amountNative:-0.872, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (despesas) operacionais (segmento clube social)', normalizedCategory:'other_income', amountNative:0.485, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Direitos de TV', normalizedCategory:'broadcasting', amountNative:233.855, disclosureLevel:'detailed' },
    { rawLabel:'Matchday (bilheteria bruta)', normalizedCategory:'matchday_competition', amountNative:118.597, disclosureLevel:'detailed' },
    { rawLabel:'Participação e Premiações', normalizedCategory:'competition_bonus', amountNative:128.825, disclosureLevel:'detailed' },
    { rawLabel:'Comerciais (patrocínio, material esportivo, publicidade)', normalizedCategory:'sponsorship_commercial', amountNative:252.163, disclosureLevel:'detailed' },
    { rawLabel:'Locação de espaço', normalizedCategory:'other_income', amountNative:2.227, disclosureLevel:'detailed' },
    { rawLabel:'Programa Fiel Torcedor', normalizedCategory:'member_dues', amountNative:61.740, disclosureLevel:'detailed' },
    { rawLabel:'Parque São Jorge - Sócios e Atividades', normalizedCategory:'member_dues', amountNative:30.189, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamentos', normalizedCategory:'sponsorship_commercial', amountNative:25.545, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (eventos, memorial, estacionamento, Timemania)', normalizedCategory:'other_income', amountNative:10.544, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições (dedução)', normalizedCategory:'other_income', amountNative:-27.022, disclosureLevel:'detailed' },
    { rawLabel:'Outras deduções sobre a receita', normalizedCategory:'other_income', amountNative:-26.537, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (despesas) operacionais líquidas', normalizedCategory:'other_income', amountNative:5.545, disclosureLevel:'detailed' },
    { rawLabel:'Cessão definitiva de atletas (receita bruta)', normalizedCategory:'player_sales', amountNative:107.405, disclosureLevel:'detailed' },
  ],
};

const corinthiansBrExpenseLinesByYear = {
  2024: [
    // Segmento futebol
    { rawLabel:'Pessoal (segmento futebol)', normalizedCategory:'wages_squad', amountNative:-367.714, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (segmento futebol)', normalizedCategory:'admin_general_expense', amountNative:-46.311, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas (segmento futebol)', normalizedCategory:'admin_general_expense', amountNative:-106.376, disclosureLevel:'detailed' },
    { rawLabel:'Custo com vendas e aquisição de atletas', normalizedCategory:'other_expenses', amountNative:-71.041, disclosureLevel:'detailed' },
    { rawLabel:'Futebol (custo operacional da área, sem nota própria de detalhe)', normalizedCategory:'match_organisation_expense', amountNative:-54.566, disclosureLevel:'detailed' },
    { rawLabel:'Rateio de despesas administrativas (segmento futebol, Nota 17)', normalizedCategory:'admin_general_expense', amountNative:-31.289, disclosureLevel:'detailed' },
    { rawLabel:'Provisão de contingências (Nota 15: cível, trabalhista, tributária, CNRD/FIFA/CAS)', normalizedCategory:'exceptional_items', amountNative:-112.242, disclosureLevel:'detailed' },
    // Segmento clube social e esportes amadores
    { rawLabel:'Pessoal (segmento clube social)', normalizedCategory:'youth_other_sports_expense', amountNative:-60.951, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (segmento clube social)', normalizedCategory:'admin_general_expense', amountNative:-42.770, disclosureLevel:'detailed' },
    { rawLabel:'Gerais e administrativas (segmento clube social)', normalizedCategory:'admin_general_expense', amountNative:-35.339, disclosureLevel:'detailed' },
    { rawLabel:'Esportes amadores', normalizedCategory:'youth_other_sports_expense', amountNative:-1.676, disclosureLevel:'detailed' },
    { rawLabel:'Rateio das despesas administrativas (segmento clube social, Nota 17, crédito que cancela a linha espelho do segmento futebol)', normalizedCategory:'admin_general_expense', amountNative:31.289, disclosureLevel:'detailed' },
    // Depreciação e amortização de direitos — separada usando a Nota 7 (Imobilizado), ver cabeçalho
    { rawLabel:'Depreciação de bens do imobilizado (Nota 7, todo o Clube)', normalizedCategory:'depreciation', amountNative:-11.259, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de direitos federativos de atletas (resto de "Depreciação e amortização de direitos", ambos segmentos)', normalizedCategory:'player_amortisation', amountNative:-74.295, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Despesas com pessoal (Nota 20)', normalizedCategory:'wages_squad', amountNative:-571.179,
      disclosureLevel:'detailed', items:[
        ['Salários e ordenados', -295.129],
        ['Prêmios', -72.356],
        ['Direito de Imagem', -131.134],
        ['Encargos sobre folha', -39.799],
        ['Benefícios a funcionários', -32.761],
      ] },
    { rawLabel:'Despesas Administrativas (Nota 21)', normalizedCategory:'admin_general_expense', amountNative:-53.697, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e Taxas (Nota 21)', normalizedCategory:'admin_general_expense', amountNative:-18.060, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação de bens do imobilizado (Nota 8, parte de "Amortizações e Depreciações" da Nota 21)', normalizedCategory:'depreciation', amountNative:-12.138, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de direitos federativos de atletas (resto de "Amortizações e Depreciações" da Nota 21)', normalizedCategory:'player_amortisation', amountNative:-92.678, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Materiais e Serviços (Nota 22)', normalizedCategory:'admin_general_expense', amountNative:-124.123, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Nota 22, = Nota 19.2 Matchday)', normalizedCategory:'match_organisation_expense', amountNative:-53.148, disclosureLevel:'detailed' },
    { rawLabel:'Despesas jurídicas e contingências (Nota 23: indenizações/acordos judiciais, custas processuais, provisão para contingências)', normalizedCategory:'exceptional_items', amountNative:-65.148, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de atletas (Nota 24.2)', normalizedCategory:'player_amortisation', amountNative:-0.941, disclosureLevel:'detailed' },
    { rawLabel:'Despesa na cessão de atletas (Nota 24.3, comissões e taxas federativas)', normalizedCategory:'other_expenses', amountNative:-17.298, disclosureLevel:'detailed' },
  ],
};

const corinthiansBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'corinthians-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'melo',
    // grossDebt = 'Empréstimos e financiamentos' (circulante 227,722 + não circulante 16,950, Notas
    // 10/10 do documento próprio de 2024). cash = 'Caixa e equivalentes de caixa'.
    grossDebt:244.672, cash:12.699,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Despesas financeiras líquidas' segmento futebol (-169,223) + segmento clube
    // social (-109,933), Nota 18.
    netInterest:-279.156, tax:0,
    // officialTotalRevenue = suma de revenueLines (1.081,930 M BRL). officialTotalExpenses = suma de
    // expenseLines EXCLUYENDO 'Provisão de contingências' (-112,242, exceptional_items) = 872,298 M
    // BRL. officialPAT = 'Total de Superávit (déficit) do exercício' impreso (-181,766 M BRL, déficit
    // real).
    officialTotalRevenue:1081.930, officialTotalExpenses:872.298, officialPAT:-181.766,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'corinthians-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'stabile',
    // grossDebt = 'Empréstimos e financiamentos' (circulante 146,782 + não circulante 103,250, Notas
    // 11/11 do documento próprio de 2025). cash = 'Caixa e equivalentes de caixa'.
    grossDebt:250.032, cash:26.019,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receitas financeiras' (266,385) - 'Despesas financeiras' (324,492), Nota 25.
    netInterest:-58.107, tax:0,
    // officialTotalRevenue = suma de revenueLines (923,076 M BRL). officialTotalExpenses = suma de
    // expenseLines EXCLUYENDO 'Despesas jurídicas e contingências' (-65,148, exceptional_items) =
    // 943,262 M BRL. officialPAT = 'Prejuízo do exercício' impreso (-143,441 M BRL).
    officialTotalRevenue:923.076, officialTotalExpenses:943.262, officialPAT:-143.441,
  },
};

const corinthiansBrPresupuestoOverlayByYear = {};

const corinthiansBrPasesData = [];
const corinthiansBrResultadosData = {};
const corinthiansBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['corinthians-br'] = {
  revenueLinesByYear: corinthiansBrRevenueLinesByYear, expenseLinesByYear: corinthiansBrExpenseLinesByYear,
  fiscalYearMeta: corinthiansBrFiscalYearMeta, pasesData: corinthiansBrPasesData,
  resultadosData: corinthiansBrResultadosData, titulosData: corinthiansBrTitulosData,
  presupuestoOverlayByYear: corinthiansBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'corinthians-br-demonstracoes-2024': {
    id:'corinthians-br-demonstracoes-2024', clubId:'corinthians-br',
    title:'Demonstrações Financeiras, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.corinthians.com.br/clube/transparencia/demonstracoes-financeiras-e-balancetes-patrimoniais',
    note:'PDF oficial (texto nativo, layout de "publicação legal" tipo página de diário para a capa, corpo do documento com camada de texto real), descarregado do portal de transparência oficial do Clube (a URL direta do PDF leva um query string ?rand= instável entre sessões — ver fuentes/Brasil/Corinthians.md). DRE auditada SEGMENTADA em 2 blocos (Segmento futebol / Segmento clube social e esportes amadores), não consolidada — ver comentário de cabeçalho de data/corinthians-br-data.js. Déficit real de R$181.766 mil, ano com nota de incerteza sobre continuidade operacional (pedido de RCE — Regime Centralizado de Execuções — para organizar dívidas cíveis) e saldo expressivo de contingências reconhecidas de exercícios passados. Convertido a USD com PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcrição completa em Clubes/Brasil/Corinthians/demonstracoes-financeiras-2023-2024.md.',
  },
  'corinthians-br-demonstracoes-2025': {
    id:'corinthians-br-demonstracoes-2025', clubId:'corinthians-br',
    title:'Demonstrações Financeiras, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.corinthians.com.br/clube/transparencia/demonstracoes-financeiras-e-balancetes-patrimoniais',
    note:'PDF oficial (texto nativo), mesmo canal que o de 2024. A partir deste exercício a DRE passou a ser apresentada em formato CONSOLIDADO (não mais segmentada) — ver nota explicativa do próprio documento. Prejuízo real de R$143.441 mil, ano com transição de gestão: Osmar Stábile assumiu interinamente em 28/05/2025 e foi empossado oficialmente em 25/08/2025, após deliberação do Conselho Deliberativo sobre o afastamento de Augusto Melo. Também reconheceu R$205.541 mil de ajuste de exercícios anteriores direto em déficits acumulados (nota explicativa 18). Convertido a USD com PTAX BCB de cierre 31/12/2025 (R$5,5024). Transcrição completa em Clubes/Brasil/Corinthians/demonstracoes-financeiras-2024-2025.md.',
  },
});

gestionesByClub['corinthians-br'] = {
  // Augusto Pereira de Melo, Presidente, eleito 25/11/2023 para o triênio 2024-2026, empossado
  // 02/01/2024 — presidiu TODO o exercício 2024 (nota 1, Contexto Operacional, documento 2023-2024).
  melo: { nombre:'Augusto Melo (2024-2026, até afastamento em maio de 2025)', firstYear:2024, lastYear:2024 },
  // Osmar Stábile assumiu interinamente em 28/05/2025 (deliberação do Conselho Deliberativo),
  // empossado oficialmente em 25/08/2025, mandato até 31/12/2026 — atribuído o exercício 2025
  // completo (presidiu a maior parte do ano e estava no cargo no fechamento, 31/12/2025).
  stabile: { nombre:'Osmar Stábile (interino desde maio/2025, efetivado agosto/2025, mandato até dez/2026)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['corinthians-br'] = null; // não se encontrou uma cifra total de sócios/associados em nenhum dos 2 PDF (a Nota 19.5 de 2025 menciona "mais de 124 mil sócios adimplentes" do programa Fiel Torcedor puntual, não o total de sócios do Clube)
