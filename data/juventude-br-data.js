// ============================================================================
// data/juventude-br-data.js — Esporte Clube Juventude, Caxias do Sul, Brasil.
// Entidad civil sem fins lucrativos (NO es SAF). clubId 'juventude-br' (CON GUIÓN,
// bracket notation en clubs{}/CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub, mismo
// criterio que el resto de los clubes de Brasil).
//
// 1 ejercicio cargado: 2020 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 —
// "BALANÇOS PATRIMONIAIS EM 31 DE DEZEMBRO de 2020 e 2019"). Fuente: "Relatório dos
// Auditores Independentes sobre as Demonstrações Financeiras" (Rosito & Filomena
// Auditores Independentes, Porto Alegre, opinião COM RESSALVA — ver salvedades abajo),
// descargado del repositorio de la Federação Gaúcha de Futebol
// (fgf.com.br/demonstracoes-financeiras-filiados, ver fuentes/Brasil/Juventude.md).
// Transcripción completa en Clubes/Brasil/Juventude/demonstracoes-financeiras-2020.md.
//
// NOTA DE TOOLING IMPORTANTE: el PDF fuente es un ESCANEO (generado con fotocopiadora
// "RICOH MP C2003", sin capa de texto — pdffonts/pdftotext confirman 0 fuentes
// embebidas). La transcripción .md ya existente se hizo por OCR y tiene ruido real en la
// página de la Demonstração do Déficit/Superávit (pág. 7 del PDF): números con dígitos
// mal leídos y filas desalineadas de su columna. Para esta carga se re-renderizó esa
// página a 300dpi (`pdftoppm -r 300 -f 7 -l 7`) y se leyó la imagen directo (Read tool,
// no otro OCR) — confirmado `Rotate: 0` con `tesseract --psm 0` antes de leer, sin
// necesidad de deskew. Los números usados acá salen de esa relectura directa de la
// imagen, no del .md (que queda con el ruido original, sin corregir). Con los números
// releídos, la tabla reconcilia EXACTO en las 3 columnas (Bruto → Operacional → Défict do
// exercício), ver verificación abajo.
//
// Escala: valores originales "Em reais" (reais completos, algunos con centavos) — acá en
// MILLONES de BRL nativos (dividir por 1.000.000).
//
// ESTRUCTURA REAL DEL DOCUMENTO: Nota 18 desglosa 'Receita Operacional Bruta Atividade do
// Desporto' en 7 líneas; Nota 19 desglosa 'Custo da Atividade do Desporto' en 2 líneas
// (una de ellas, la más grande, mezcla sueldos/cargas CON amortización de derechos de
// jugadores, sin poder separarlas — ver nota abajo). La propia Demonstração do
// Déficit/Superávit agrega, DEBAJO del Lucro Bruto, un bloque "Outras Receitas/Despesas
// Operacionais" con 4 líneas propias (Despesas Gerais e administrativas, Receita/Despesas
// financeiras líquidas, Receita de Royalties, Receitas Diversas) que NO están desglosadas
// en ninguna nota aparte.
//
// Categorización (Ingresos), Nota 18:
// - 'Venda/Empréstimo de Atletas' -> player_sales.
// - 'Receitas Patrimoniais' -> other_income (CRITERIO CONSERVADOR: el rótulo no nombra el
//   estádio explícitamente, así que no entra a stadium_other aunque es plausible que sea
//   renta de instalaciones propias — club-data-mapping sección 1, criterio de stadium_other.
//   Pregunta para Admin/dudas-por-club.md: ¿"Receitas Patrimoniais" incluye alquiler del
//   Estádio Alfredo Jaconi?).
// - 'Receita de Transmissão' -> broadcasting.
// - 'Receita jogos de Futebol' -> matchday_competition.
// - 'Receitas Publicitária' -> sponsorship_commercial.
// - 'Receita Loteria Esportiva' -> other_income (ingreso específico brasileño, participación
//   del club en la Loteria Esportiva/Timemania — no tiene categoría propia en el sitio;
//   pregunta para Admin/dudas-por-club.md sobre si amerita una categoría nueva si aparece
//   en más clubes brasileños).
// - 'Outras Receitas' (Nota 18) -> other_income.
// Categorización (Ingresos), bloque "Outras Receitas/Despesas Operacionais" de la propia DRE:
// - 'Receita de Royalties' -> sponsorship_commercial (licenciamiento/royalties de marca,
//   mismo criterio que 'Licenciamentos da marca e franquias' de Palmeiras).
// - 'Receitas Diversas' -> other_income.
//
// Categorización (Gastos):
// - Nota 19, 'Remuneração, Benefícios, Encargos e amortização de direitos e de custos de
//   formação' (-22.551.935,62, el 60% del costo directo de actividad deportiva): el propio
//   rótulo MEZCLA sueldos/cargas sociales del plantel CON amortización de derechos
//   federativos y costos de formación, sin que ningún otro lugar del documento permita
//   separar cuánto es cada cosa (la Nota 6 solo da SALDOS ACUMULADOS de amortización de
//   intangibles, no el cargo anual) -> se cargó como lump_football_operations_expense
//   (club-data-mapping sección 1: "el club de verdad no separa un rubro" — acá aplica
//   igual de bien a un gasto mixto sueldo+amortización que al caso típico de "fútbol
//   profesional sin desglosar"). Pregunta para Admin/dudas-por-club.md: pedirle al club el
//   desglose de esta línea entre remuneración y amortización.
// - Nota 19, 'Federação, viagem, imagem, serviços, material esportivo e outras'
//   -> match_organisation_expense.
// - Bloque "Outras Receitas/Despesas Operacionais": 'Despesas Gerais e administrativas'
//   -> admin_general_expense.
// - 'Receita/Despesas financeiras líquidas' (-1.704.895,89) = netInterest, NUNCA como línea
//   (club-data-mapping sección 2) — pese a que el documento la muestra DENTRO del bloque
//   operacional (no en una sección financiera aparte como Botafogo-SP), es conceptualmente
//   un resultado financiero neto y el sitio ya tiene un campo dedicado para eso.
//
// VERIFICACIÓN (a mano, releyendo la imagen de la página 7 del PDF a 300dpi):
// Nota 18: 9.530267,90+1.534877,36+15.425089,14+0.528436,55+3.264381,83+0.709446,28+0.839021,60
// = 31.831520,66 M BRL = 'Receita Operacional Bruta Atividade do Desporto' impreso, EXACTO.
// Nota 19: 22.551935,62+4.844999,61 = 27.396935,23 M BRL = 'Custo da Atividade do Desporto'
// impreso, EXACTO. 31.831520,66 - 27.396935,23 = 4.434585,43 M BRL = 'Superavit/Défict
// Bruto' impreso, EXACTO. Bloque Outras Receitas/Despesas: -6.008357,69 (Despesas Gerais) +
// (-1.704895,89) (financeiras líquidas) + 0.017771,40 (Royalties) + 0.534156,41 (Diversas)
// = -7.161325,77 M BRL = 'Défict Operacional' impreso, EXACTO. 4.434585,43 + (-7.161325,77)
// = -2.726740,34 M BRL = 'Défict do exercício' impreso, EXACTO — y coincide con
// 'Superavit/Déficit do exercício' de la Demonstração dos Fluxos de Caixa (2.726.740,34,
// signo invertido por ser un add-back) y con 'Transferência Deficit do exercicio' de la
// Demonstração das Mutações do Patrimônio Líquido. officialTotalRevenue (32,38344847 M BRL)
// = suma de revenueLines (Nota 18 + Royalties + Diversas, 9 líneas). officialTotalExpenses
// (33,40529292 M BRL) = suma de expenseLines (3 líneas). netInterest (-1,70489589 M BRL).
// Check final: 32,38344847 - 33,40529292 + (-1,70489589) = -2,72674034 M BRL = officialPAT,
// EXACTO.
//
// grossDebt = 'Empréstimos e Financiamentos a Pagar' (Nota 11: Mútuo Conselheiros
// 0,729873,06 + Instituições financeiras 0,003939,89 = 0,733812,95 M BRL, TODO circulante —
// no hay línea de financiamentos não circulante separada). cash = 'Caixa e Equivalentes de
// Caixa' (0,026330,58 M BRL).
//
// FX: el documento no declara su propio tipo de cambio de cierre (entidad brasileña, sin
// Anexo de moeda estrangeira). NO EXISTE 'BRL@2020-12-31' en FX_CLOSE (data/currency-map.js)
// — esta sesión tenía prohibido tocar ese archivo compartido (carga en paralelo con otros
// 2 clubes de Brasil), así que se usó un `fx` LITERAL en vez de `fxRef`, con el PTAX de
// cierre (venda) oficial del Banco Central do Brasil consultado directo a la API Olinda del
// BCB (https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo):
// 31/12/2020 = R$5,19670 (mismo valor que el 30/12/2020, boletín repetido). PENDIENTE PARA
// UNA SESIÓN FUTURA: agregar 'BRL@2024-12-31'-style la entrada 'BRL@2020-12-31': { fx:
// 5.1967, source:'market_close', label:'PTAX de cierre (venda) del Banco Central do Brasil
// al 31/12/2020' } a FX_CLOSE en data/currency-map.js, y migrar este ejercicio de `fx`
// literal a `fxRef:'BRL@2020-12-31'` (mismo criterio que el resto de los clubes de Brasil).
//
// Gestión: la Demonstração das Mutações e el parecer do Conselho Fiscal no identifican con
// claridad quién era el Presidente del Clube (las firmas visibles en el parecer del
// Conselho Fiscal — Bridi/Stumpf/Thomé/Zanettini/Cunico/Tcacenco Martins — son del Conselho
// Fiscal, no de la Diretoria) -> gestionId:null, sin entrada en gestionesByClub
// (club-or-year-onboarding sección 16: ya no es obligatorio).
//
// memberCountByClub: null — no se encontró ninguna cifra de sócios/associados en el
// documento.
//
// brandColor: '#009846' — Shamrock Green (PMS 347C), fuente teamcolorcodes.com/
// juventude-color-codes, consistente con la identidad "Alviverde"/"Verdão" confirmada por
// búsqueda (verde y branco). Verificado 2026-09-25.
// ============================================================================

const juventudeBrRevenueLinesByYear = {
  2020: [
    { rawLabel:'Venda/Empréstimo de Atletas', normalizedCategory:'player_sales', amountNative:9.53026790, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Patrimoniais', normalizedCategory:'other_income', amountNative:1.53487736, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:15.42508914, disclosureLevel:'detailed' },
    { rawLabel:'Receita jogos de Futebol', normalizedCategory:'matchday_competition', amountNative:0.52843655, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Publicitária', normalizedCategory:'sponsorship_commercial', amountNative:3.26438183, disclosureLevel:'detailed' },
    { rawLabel:'Receita Loteria Esportiva', normalizedCategory:'other_income', amountNative:0.70944628, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (Nota 18)', normalizedCategory:'other_income', amountNative:0.83902160, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.01777140, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:0.53415641, disclosureLevel:'detailed' },
  ],
};

const juventudeBrExpenseLinesByYear = {
  2020: [
    { rawLabel:'Remuneração, Benefícios, Encargos e amortização de direitos e de custos de formação', normalizedCategory:'lump_football_operations_expense', amountNative:-22.55193562, disclosureLevel:'lump' },
    { rawLabel:'Federação, viagem, imagem, serviços, material esportivo e outras', normalizedCategory:'match_organisation_expense', amountNative:-4.84499961, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-6.00835769, disclosureLevel:'detailed' },
  ],
};

const juventudeBrFiscalYearMeta = {
  2020: {
    currency:'BRL',
    // PTAX venda de cierre BCB 31/12/2020, consultado directo a la API Olinda. Promovido a
    // 'BRL@2020-12-31' en FX_CLOSE (data/currency-map.js) en la integración de esta misma sesión.
    fxRef:'BRL@2020-12-31',
    sourceId:'juventude-br-demonstracoes-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    // grossDebt = 'Empréstimos e Financiamentos a Pagar' (Nota 11, todo circulante). cash =
    // 'Caixa e Equivalentes de Caixa'.
    grossDebt:0.73381295, cash:0.02633058,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receita/Despesas financeiras líquidas' de la Demonstração do
    // Déficit/Superávit.
    netInterest:-1.70489589, tax:0,
    // officialTotalRevenue = suma revenueLines (32,38344847 M BRL). officialTotalExpenses =
    // suma expenseLines (33,40529292 M BRL). officialPAT = 'Défict do exercício' impreso
    // (-2,72674034 M BRL / R$-2.726.740,34), EXACTO contra revenue-expenses+netInterest.
    officialTotalRevenue:32.38344847, officialTotalExpenses:33.40529292, officialPAT:-2.72674034,
  },
};

const juventudeBrPresupuestoOverlayByYear = {};

const juventudeBrPasesData = [];
const juventudeBrResultadosData = {};
const juventudeBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['juventude-br'] = {
  revenueLinesByYear: juventudeBrRevenueLinesByYear, expenseLinesByYear: juventudeBrExpenseLinesByYear,
  fiscalYearMeta: juventudeBrFiscalYearMeta, pasesData: juventudeBrPasesData,
  resultadosData: juventudeBrResultadosData, titulosData: juventudeBrTitulosData,
  presupuestoOverlayByYear: juventudeBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'juventude-br-demonstracoes-2020': {
    id:'juventude-br-demonstracoes-2020', clubId:'juventude-br',
    title:'Relatório dos Auditores Independentes sobre as Demonstrações Financeiras, 31 de Dezembro de 2020 e 2019',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://fgf.com.br/demonstracoes-financeiras-filiados/2020',
    note:'PDF oficial (escaneo, sin capa de texto — la transcripción original en Clubes/Brasil/Juventude/demonstracoes-financeiras-2020.md tiene ruido de OCR; los números cargados acá salen de una relectura directa de la imagen a 300dpi de la página con la Demonstração do Déficit/Superávit, ver comentario de cabecera del archivo de datos). Auditado por Rosito & Filomena Auditores Independentes (Porto Alegre), opinião COM RESSALVA: (a) el club no deprecia/amortiza la totalidad de su activo imobilizado/intangível; (b) no aplicó la Resolução 1.292/10 (valor recuperável de activos); (c) mantiene la marca JUVENTUDE revaluada en R$6.000.000 desde 1996, práctica no aceita en Brasil. Déficit real de R$2.726.740,34, con passivo a descoberto de R$8.011.948,22 al cierre (arrastre de moratoria PROFUT de 2009-2015 + contingencias). Convertido a USD con PTAX BCB de cierre 31/12/2020 (R$5,1967, fx literal — ver comentario de cabecera). Descargado del repositorio de demonstrações financeiras de clubes filiados de la Federação Gaúcha de Futebol. Transcripción completa (con ruido de OCR sin corregir) en Clubes/Brasil/Juventude/demonstracoes-financeiras-2020.md.',
  },
});

memberCountByClub['juventude-br'] = null; // no se encontró cifra de sócios/associados en el documento
