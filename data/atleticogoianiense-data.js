// ============================================================================
// data/atleticogoianiense-data.js — Atlético Clube Goianiense (Goiânia, GO, Brasil).
// 1 ejercicio cargado: 2025 (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12/2025 — ver
// clubs.js, fiscalYearStart:'01-01', isCalendarYearClub() en js/finanzas-calc.js).
//
// Fuente: "Demonstrações Financeiras", exercícios findos em 31/12/2025 e 2024 (comparativo),
// descargado directo del portal de transparencia propio del club
// (atleticogoianiense.com.br/up/TRANSPARENCIA-26/). PDF con texto nativo, transcripción completa en
// Clubes/Brasil/Atletico Goianiense/demonstracoes-financeiras-2024-2025.md.
//
// **Se usó la columna CONSOLIDADO, no Controladora** — al revés que Botafogo. Acá la Controladora
// (Associação, la entidad social) reporta cifras MUY chicas (Receitas líquidas 2025: apenas 20,549 M)
// porque el Departamento de Fútbol Profesional se transfirió a la SAF (Atlético Goianiense Sociedade
// Anônima do Futebol) durante 2025 (ver nota de la cabecera de la Nota 19) — el negocio real de
// fútbol vive en el perímetro CONSOLIDADO (Receitas líquidas 2025: 77,110 M), que es el que refleja
// fielmente el tamaño real de la operación futbolística del club, coherente con el objetivo del
// sitio (no la Associação standalone, que subestima groseramente la actividad real tras la
// reestructuración societaria).
//
// ESCALA: valores originales "em milhares de reais" (miles de reales), acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Grêmio/Botafogo/Cruzeiro).
//
// Categorización (Nota 18 "Receita Líquida" + la línea suelta "Outras receitas e despesas
// operacionais" de la DRE principal, para revenue; Nota 19 "Custos das atividades sociais e
// esportivas" + el resto de líneas de la sección "Resultado operacional" de la DRE, para expense):
// - 'Mensalidades Associativas'/'Receita de Mensalistas' -> member_dues (NO season_tickets: la Nota
//   18 aclara que es la recaudación de "mensalidades" de socios, cuota mensual asociativa, no un
//   abono de acceso a partidos).
// - 'Programa Sócio Torcedor' -> member_dues (2do programa de membresía, mismo criterio).
// - 'Receitas Condomínio LFU' (participación en el "condominio" de derechos audiovisuales de la Liga
//   Forte União) -> broadcasting, mismo bloque conceptual que Direitos de Transmissão.
// - 'Premiações' (Nota 18, fila que faltaba en la transcripción inicial de la DRE principal por un
//   salto de página — se encontró completa en el detalle de la Nota 18, que sí imprime las 9 líneas
//   y su Total, verificado exacto) -> competition_bonus.
// - 'Negociação de atletas' -> player_sales.
// - 'Outras receitas' (Nota 18-f, con su propio desglose de 9 sub-ítems: reavaliação de inversión,
//   bares/lanchonetes, bonificaciones, licenciamiento, etc.) -> other_income, sin promover cada
//   sub-ítem a categoría propia (ninguno es lo bastante grande ni conceptualmente distinto para
//   justificarlo, a diferencia del caso de Racing en club-data-mapping SKILL.md sección 1).
// - 'Outras receitas e despesas operacionais' (línea suelta de la sección "Resultado operacional" de
//   la DRE principal, +1,589 Consolidado, un neto positivo) -> other_income.
// - Nota 19 (Custo das atividades): 'Custos com Salários de Atletas/Com. Técnica' -> wages_squad;
//   'Direito de Imagem' -> wages_squad (mismo criterio que Botafogo/Cruzeiro); 'Despesas com
//   Patrocínio/Premiações' (bonos de rendimiento atados a resultados deportivos, según la nota c)
//   -> match_organisation_expense; 'Despesas CBF'/'Fenapaf / Direito de Arena'/'Quadro Móvel'
//   (logística de partidos, nota f) -> match_organisation_expense; 'INSS sobre Receita' (contribución
//   previsional sobre ingresos) -> admin_general_expense; 'Custos com Parcerias com outros
//   clubes'/'Comissão/intermediação' -> other_expenses (pagos de intermediación/transferencias, mismo
//   criterio que Racing/Grêmio/Botafogo: no van a player_amortisation, que es solo el cargo contable).
// - Resto de la sección "Resultado operacional" de la DRE principal: 'Salários e encargos' ->
//   wages_squad (personal administrativo, distinto del plantel ya cargado en Nota 19); 'Serviços de
//   Terceiros'/'Marketing'/'Despesas gerais' -> admin_general_expense; 'Amortização do custo de
//   atletas' -> player_amortisation; 'Depreciações' -> depreciation; 'Contingências' -> other_expenses.
//
// Verificación (Node, antes de cargar): revenueLines suma 78.700 M BRL; expenseLines suma -77.103 M
// BRL; revenue+expenses = 1.597 M BRL ≈ "Resultado operacional antes do resultado financeiro"
// impreso (1.596, Consolidado) — diferencia de R$1.000, mismo redondeo del propio documento (ver
// Nota 18, su propia suma de 9 líneas da 77.111 contra el 77.110 impreso); + netInterest (-0.899) +
// tax (-0.009) = 0.689 ≈ "Superávit do Exercício" impreso (0.687, Consolidado) — dentro de la
// tolerancia de verifyTieOuts() (<0.01 M = R$10.000). officialPAT se cargó con el número EXACTO
// impreso (0.687).
//
// grossDebt = "Empréstimos, financiamentos e encargos" circulante, Consolidado (9.666 — el propio
// texto del balance lo confirma como "endividamento oneroso consolidado", no hay porção não
// circulante de esta línea). cash = "Caixa e equivalentes de caixa" Consolidado (0.767).
//
// FX: BRL/USD PTAX de cierre 31/12/2025 = R$5,5024 (venda), mismo tipo de cambio investigado
// externamente que Cruzeiro (mismo cierre de ejercicio, regla especial del BCB de usar el boletín
// del 30/12/2025).
//
// Gestión: no se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién
// preside el club/la SAF — entrada mínima "sin confirmar", mismo criterio que Botafogo/Cruzeiro.
// ============================================================================

const atleticogoianienseRevenueLinesByYear = {
  2025: [
    { rawLabel:'Direitos de Transmissão', normalizedCategory:'broadcasting', amountNative:4.465, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:1.004, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:8.828, disclosureLevel:'detailed' },
    { rawLabel:'Mensalidades Associativas', normalizedCategory:'member_dues', amountNative:0.312, disclosureLevel:'detailed' },
    { rawLabel:'Negociação de atletas', normalizedCategory:'player_sales', amountNative:37.657, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:10.399, disclosureLevel:'detailed' },
    { rawLabel:'Programa Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.705, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Condomínio LFU', normalizedCategory:'broadcasting', amountNative:10.819, disclosureLevel:'detailed' },
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:2.922, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas e despesas operacionais', normalizedCategory:'other_income', amountNative:1.589, disclosureLevel:'detailed' },
  ],
};

const atleticogoianienseExpenseLinesByYear = {
  2025: [
    { rawLabel:'Custos com Salários de Atletas/Com. Técnica', normalizedCategory:'wages_squad', amountNative:-40.600, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-13.428, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Patrocínio/Premiações (bonos de rendimiento)', normalizedCategory:'match_organisation_expense', amountNative:-3.160, disclosureLevel:'detailed' },
    { rawLabel:'Despesas CBF', normalizedCategory:'match_organisation_expense', amountNative:-0.238, disclosureLevel:'detailed' },
    { rawLabel:'INSS sobre Receita', normalizedCategory:'admin_general_expense', amountNative:-0.085, disclosureLevel:'detailed' },
    { rawLabel:'Fenapaf / Direito de Arena', normalizedCategory:'match_organisation_expense', amountNative:-0.006, disclosureLevel:'detailed' },
    { rawLabel:'Quadro Móvel (logística de partidos)', normalizedCategory:'match_organisation_expense', amountNative:-0.183, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Parcerias com outros clubes', normalizedCategory:'other_expenses', amountNative:-1.131, disclosureLevel:'detailed' },
    { rawLabel:'Comissão/intermediação', normalizedCategory:'other_expenses', amountNative:-1.209, disclosureLevel:'detailed' },
    { rawLabel:'Salários e encargos (administrativo)', normalizedCategory:'wages_squad', amountNative:-1.506, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.699, disclosureLevel:'detailed' },
    { rawLabel:'Marketing', normalizedCategory:'admin_general_expense', amountNative:-1.095, disclosureLevel:'detailed' },
    { rawLabel:'Amortização do custo de atletas', normalizedCategory:'player_amortisation', amountNative:-6.074, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-2.156, disclosureLevel:'detailed' },
    { rawLabel:'Contingências', normalizedCategory:'other_expenses', amountNative:-0.003, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-3.530, disclosureLevel:'detailed' },
  ],
};

const atleticogoianienseFiscalYearMeta = {
  2025: {
    currency:'BRL', fx:5.5024,
    sourceId:'atleticogoianiense-demonstracoes-2024-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos, financiamentos e encargos" circulante, Consolidado (9.666 — el
    // propio texto del balance lo llama "endividamento oneroso consolidado", sin porção não
    // circulante). cash = "Caixa e equivalentes de caixa" Consolidado (0.767).
    grossDebt:9.666, cash:0.767,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultado financeiro líquido" Consolidado: Receitas financeiras 0.170 -
    // Despesas financeiras 1.070.
    netInterest:-0.899,
    // tax = "Tributos" Consolidado (línea suelta debajo del resultado financeiro, antes del
    // Superávit final).
    tax:-0.009,
    // officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines
    // (78.700 / 77.103 M BRL). officialPAT = "Superávit do Exercício" impreso (Consolidado, el
    // número EXACTO del documento).
    officialTotalRevenue:78.700, officialTotalExpenses:77.103, officialPAT:0.687,
  },
};

const atleticogoianiensePresupuestoOverlayByYear = {};

const atleticogoianiensePasesData = [];
const atleticogoianienseResultadosData = {};
const atleticogoianienseTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.atleticogoianiense = {
  revenueLinesByYear: atleticogoianienseRevenueLinesByYear, expenseLinesByYear: atleticogoianienseExpenseLinesByYear,
  fiscalYearMeta: atleticogoianienseFiscalYearMeta, pasesData: atleticogoianiensePasesData,
  resultadosData: atleticogoianienseResultadosData, titulosData: atleticogoianienseTitulosData,
  presupuestoOverlayByYear: atleticogoianiensePresupuestoOverlayByYear,
};


Object.assign(sources, {
  'atleticogoianiense-demonstracoes-2024-2025': {
      id:'atleticogoianiense-demonstracoes-2024-2025', clubId:'atleticogoianiense',
      title:'Demonstrações Financeiras (Relatório da Administração), Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://atleticogoianiense.com.br/up/TRANSPARENCIA-26/',
      note:'PDF oficial (texto nativo), descargado del portal de transparencia propio del club. Se cargó la columna CONSOLIDADO (no Controladora — ver comentario de cabecera de data/atleticogoianiense-data.js: la Associação standalone reporta cifras muy chicas tras transferir el fútbol profesional a la SAF durante 2025, el Consolidado refleja el tamaño real de la operación). Transcripción completa en Clubes/Brasil/Atletico Goianiense/demonstracoes-financeiras-2024-2025.md. 2025 marcó el retorno al superávit tras un déficit de R$45.111 mil en 2024 (año de descenso a la Série B). Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024), investigado externamente.',
    },
});

gestionesByClub.atleticogoianiense = {
    sinconfirmar: { nombre:'Atlético Goianiense (gestión no confirmada en detalle)', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.atleticogoianiense = null;
