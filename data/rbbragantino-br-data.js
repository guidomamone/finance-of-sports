// ============================================================================
// data/rbbragantino-br-data.js — Red Bull Bragantino Futebol Ltda. (Bragança Paulista-SP, Brasil).
// CASO ATÍPICO: es una Sociedade Empresária Limitada (Ltda), NO una SAF ni una associação — ver
// fuentes/Brasil/RB Bragantino.md. Publica demonstrações financeiras auditadas (BDO) por ser
// "sociedade de grande porte" (Lei 11.638/2007), no por mandato de la Lei do SAF. 2 ejercicios
// cargados: 2019 y 2024 (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12, mismo criterio
// que Botafogo/Operário Ferroviário/Grêmio, clubs.js fiscalYearStart:'01-01').
//
// FUENTES (los 2 vía Wayback Machine — el sitio oficial migró a una SPA que ya no sirve los PDFs
// viejos en vivo, ver fuentes/Brasil/RB Bragantino.md):
// - 2019: `balanco-2019.pdf` ("Balanço patrimonial — Em 31 de dezembro de 2019 e 2018").
//   GOTCHA DE TOOLING: PDF "Microsoft: Print To PDF" vectorial (curvas), sin fuentes embebidas y
//   sin capa de texto real (pdftotext/pdffonts/pdfimages devuelven vacío) — se transcribió con
//   lectura visual/OCR sobre el render, no con extracción de texto nativo. La transcripción
//   resultante (`balanco-2019.md`) tiene el orden de columnas de la tabla de ACTIVO/PASIVO
//   parcialmente desordenado (números y etiquetas en bloques separados, típico de un PDF vectorial
//   sin capa lógica de lectura) — la DRE (Demonstração do resultado, pág. 2) es la parte más limpia
//   y confiable del documento, el Balanço patrimonial (pág. 1) requirió reconstrucción manual
//   cruzando subtotales (ver comentario de grossDebt/cash abajo).
// - 2024: `balanco-2024-auditado-fev2025.pdf` ("Balanços patrimoniais — Em 31 de dezembro de 2024 e
//   2023"), auditado por BDO RCS Auditores Independentes SS, firmado 11/02/2025. Con capa de texto
//   real (pdftotext extrae limpio), pero la transcripción disponible (`balanco-2024-auditado-
//   fev2025.md`) cubre solo 5 páginas (Balanço, DRE, DRA, DMPL, DFC) — NO incluye las Notas
//   explicativas (la prensa describe 8-9 páginas totales para este ejercicio, con notas). Sin esas
//   notas, no hay forma de desglosar "Custo do departamento de futebol" en sus componentes (sueldos
//   vs. amortización de pases vs. otros) — ver categorización abajo, es una limitación real del
//   documento disponible, no una omisión de esta carga.
//
// ESCALA: documentos "Em milhares de Reais" (miles de reales) — acá en MILLONES de BRL nativos
// (dividir por 1.000, mismo criterio que Botafogo/Operário/Grêmio).
//
// ESTRUCTURA REAL DEL DOCUMENTO — MUY DISTINTA a Botafogo/Operário: la DRE de RB Bragantino NO
// desglosa "Receita Líquida" en rubros (TV, sponsors, entradas, etc.) — es UNA sola cifra, sin nota
// de desglose disponible en la transcripción (ninguna Nota 12/13/14 fue transcripta más allá de su
// número de referencia en la DRE). Por eso `Receita Líquida` se cargó como `lump_football_operations`
// (bolsón sin desglosar POR LA FUENTE, no por decisión de esta carga — club-data-mapping sección 1,
// no aplica la excepción de "encabezado con líneas numeradas debajo": acá no hay líneas debajo en
// absoluto). Del lado de Gastos sí hay categorías reales (Comissão técnica, Custo do departamento de
// futebol, Gastos com jogos e bonificações, Custo com departamento amador, Despesas gerais e
// administrativas), aunque más gruesas que Botafogo/Operário.
//
// CATEGORIZACIÓN:
// - 'Receita Líquida' -> lump_football_operations (ver arriba: sin desglose disponible en la fuente).
// - 'Outras receitas e despesas operacionais' (SOLO 2024, línea neta positiva — no existe en el DRE
//   2019) -> other_income. Es un resultado operativo neto adicional entre el Resultado Operacional y
//   el Lucro antes das receitas e despesas financeiras; sin Notas transcriptas no se puede saber su
//   composición (podría incluir indemnizaciones, recuperación de gastos, resultado de formación de
//   jugadores, etc.) — se cargó completa como other_income por ser la categoría "no sé más" estándar
//   del skill, y quedó anotada como duda en Admin/dudas-por-club.md.
// - 'Comissão técnica' (comisión técnica/cuerpo técnico) -> wages_squad, mismo criterio que
//   Botafogo/Operário ('Comissão Técnica').
// - 'Custo do departamento de futebol' -> wages_squad. ES UNA APROXIMACIÓN: es la línea de gasto más
//   grande del documento (66-73% del total de costos según el año) y casi seguro mezcla sueldos del
//   plantel CON amortización de derechos federativos de atletas (la Demonstração dos fluxos de caixa
//   muestra "Depreciação e amortização" 110.770 M BRL como ajuste no-caja en 2024, y "Aquisição de
//   direitos federativos de atletas" -114.046 M BRL como capex de investimento — señal de que el club
//   SÍ capitaliza y amortiza pases, típico de clubes brasileños — pero la DRE no tiene una línea
//   "Amortização de atletas" separada como sí tienen Botafogo/Operário). Sin las Notas explicativas
//   (no transcriptas, ver arriba) no hay forma de separar cuánto de esto es wages_squad real vs.
//   player_amortisation — se cargó todo a wages_squad por ser la aproximación más conservadora (no
//   inventar un split sin base), documentado como duda genuina en Admin/dudas-por-club.md.
// - 'Gastos com jogos e bonificações' -> match_organisation_expense. Es una línea combinada (costos
//   de partido + bonificaciones/premios por resultado) que Botafogo/Operário SÍ separan en 2 líneas
//   distintas (match_organisation_expense para lo de partido, wages_squad para premios) — acá no se
//   puede separar sin inventar un split, se categorizó como match_organisation_expense porque "jogos"
//   (organización de partidos) encabeza el rótulo y es, en la práctica de otros clubes brasileños
//   cargados, el componente típicamente mayor de una línea así nombrada. Documentado como
//   aproximación, no como certeza.
// - 'Custo com departamento amador' -> youth_other_sports_expense (fútbol amateur/formación, mismo
//   criterio que Banfield/Botafogo para el equivalente-gasto de juveniles). En 2019 el propio
//   documento imprime "-" (sin actividad/cero) para este rubro — se cargó con amountNative:0 para
//   mantener la misma estructura de categorías entre los 2 ejercicios cargados.
// - 'Despesas gerais e administrativas' -> admin_general_expense.
//
// VERIFICACIÓN (antes de cargar, Node): AMBOS años cierran EXACTO contra los subtotales impresos de
// la propia DRE, dígito por dígito, sin ningún ajuste:
// - 2019: revenue (39,171) + expenses (-37,025) = 2,146 = "Resultado antes das receitas e despesas
//   financeiras" impreso, EXACTO. + netInterest (-2,002 = Receitas financeiras 0,008 + Despesas
//   financeiras -2,010) = 0,144 = "Superávit líquido do exercício" impreso, EXACTO.
// - 2024: revenue (425,224 + 80,992 [Outras receitas e despesas operacionais] = 506,216) + expenses
//   (-469,925) = 36,291 = "Lucro antes das receitas e despesas financeiras" impreso, EXACTO. +
//   netInterest (9,094 = Receitas financeiras 21,568 + Despesas financeiras -12,474) = 45,385 =
//   "Lucro antes do Imposto de Renda e Contribuição Social" impreso, EXACTO. + tax (-14,384) = 31,001
//   = "Lucro líquido do exercício" impreso, EXACTO.
// El cierre exacto en los 2 años (sin redondeo ni ajuste) es la evidencia más fuerte de que la
// transcripción de la DRE (la parte más confiable del documento 2019 vectorial) se leyó bien, pese
// al gotcha de tooling — un dígito mal leído en cualquiera de las líneas hubiera roto este cierre.
//
// grossDebt/cash — el Balanço patrimonial 2019 requirió reconstrucción manual (ver gotcha de tooling
// arriba, tabla con columnas/etiquetas desordenadas en la transcripción):
// - cash 2019 = 4,256 M BRL ("Caixa e equivalentes de caixa"), CONFIRMADO por partida doble: aparece
//   igual en el Balanço patrimonial Y en la Demonstração dos fluxos de caixa ("Caixa e equivalentes
//   de caixa no fim do exercício 4.256", pág. 5) — cross-check independiente, alta confianza.
// - grossDebt 2019 = 0,564 M BRL ("Empréstimos", Passivo Circulante). Reconstruido cruzando
//   subtotales: el subtotal Circulante impreso (73,730) menos los otros 5 ítems reconstruidos
//   (Fornecedores 0,552 + Obrigações sociais e trabalhistas 2,820 + Obrigações tributárias 0,670 +
//   Federação Paulista de Futebol 39,875 + Acordos trabalhistas e cíveis 29,249 = 73,166) deja
//   0,564 para "Empréstimos" — Y el subtotal Circulante (73,730) + Não circulante (61,465,= Partes
//   relacionadas 55,482 + otro ítem 5,983) + Déficit acumulado (-55,047) = 80,148 = Total do passivo
//   e patrimônio líquido impreso, EXACTO — confirma que la reconstrucción de todo el Passivo es
//   consistente, aunque la ASIGNACIÓN línea-por-línea específica dentro de cada bloque (cuál de los 5
//   ítems circulantes reconstruidos es cuál) se infirió por ORDEN de aparición en el documento, no
//   por una etiqueta 1:1 confirmada — ver duda en Admin/dudas-por-club.md. NO incluye "Partes
//   relacionadas" (55,482 M no circulante, financiamiento del grupo Red Bull, ~89% del Não circulante)
//   en grossDebt, mismo criterio que Boca/Botafogo (excluir pasivos intercompany/no financieros de la
//   definición angosta de deuda).
// - cash 2024 = 29,015 M BRL ("Caixa e equivalentes de caixa"), CONFIRMADO igual por la Demonstração
//   dos fluxos de caixa ("Caixa e equivalentes de caixa no fim do exercício 29 015", pág. 5).
// - grossDebt 2024 = 0. No hay línea "Empréstimos"/deuda financiera de terceros en el Balanço 2024 (ni
//   circulante ni não circulante) — el único pasivo de tipo préstamo visible, "Contraprestação a
//   pagar" (2,744 M al cierre 2023), se pagó por completo durante 2024 (coincide exacto con
//   "Pagamento de empréstimos — terceiros (2.744)" de la Demonstração dos fluxos de caixa 2024),
//   dejando el club sin deuda financiera de terceros al cierre. El financiamiento real del club es
//   casi enteramente intercompany ("Partes relacionadas": 170,346 circulante + 572,857 não circulante
//   = 743,203 M BRL, financiamiento del grupo Red Bull), excluido de grossDebt por el mismo criterio
//   que 2019.
//
// FX: ninguno de los 2 documentos declara tipo de cambio propio (no hay Anexo de moneda extranjera en
// ninguno de los 2 balances, pese a que sí tienen pasivos con "Federação Paulista de Futebol" y
// partes relacionadas — no se identificó como moneda extranjera en la transcripción disponible). Se
// usó PTAX de cierre (venda) del Banco Central do Brasil:
// - 2024: BRL@2024-12-31 (6,1923), YA EXISTE en FX_CLOSE (data/currency-map.js).
// - 2019: BRL@2019-12-31 (4,0307), investigado esta sesión vía la API Olinda del BCB
//   (CotacaoDolarDia, 31/12/2019, cotaçãoVenda), TODAVÍA NO EXISTE en FX_CLOSE — se referenció como
//   fxRef igual (degrada a fx:null con console.warn hasta que se agregue, no rompe nada mientras
//   tanto, ver currency-map.js resolveFx()) y se reporta el valor exacto para que se agregue
//   centralizado, no en este archivo (ver reporte de la sesión).
//
// Gestión: es una Ltda controlada por Red Bull GmbH, no un club asociativo con presidente electo —
// mismo criterio que Once Caldas/Envigado (Colombia) y Botafogo/Operário (Brasil, sus propias SAF/
// associação): no se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién
// es el responsable/CEO en cada ejercicio puntual, gestionId queda 'sinconfirmar' para los 2 años.
//
// brandColor: null. El club se rebrandeó de "preto e branco" (negro y blanco, colores originales
// 1928) a la identidad Red Bull a partir de 2019/2020. El kit HOME actual (infobox de pt.wikipedia,
// plantilla Info/Clube de futebol: corpo1=FFFFFF, calções1=FF0000, meias1=FFFFFF) es CAMISETA BLANCA
// con acento rojo solo en el short — mismo caso "camiseta blanca con acento fuerte" de
// club-or-year-onboarding sección 3 (River/Vélez/Sevilla/Real Madrid/Valencia/Once Caldas): blanco
// domina la prenda principal, no se fuerza un color. Ver fuentes/Brasil/RB Bragantino.md para el
// detalle completo de la investigación (colores originales, kit actual, fuente del infobox).
// ============================================================================

const rbbragantinoBrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Receita Líquida', normalizedCategory:'lump_football_operations', amountNative:39.171, disclosureLevel:'lump' },
  ],
  2024: [
    { rawLabel:'Receita Líquida', normalizedCategory:'lump_football_operations', amountNative:425.224, disclosureLevel:'lump' },
    { rawLabel:'Outras receitas e despesas operacionais', normalizedCategory:'other_income', amountNative:80.992, disclosureLevel:'summary' },
  ],
};

const rbbragantinoBrExpenseLinesByYear = {
  2019: [
    { rawLabel:'Comissão técnica', normalizedCategory:'wages_squad', amountNative:-3.189, disclosureLevel:'summary' },
    { rawLabel:'Custo do departamento de futebol', normalizedCategory:'wages_squad', amountNative:-23.807, disclosureLevel:'summary' },
    { rawLabel:'Gastos com jogos e bonificações', normalizedCategory:'match_organisation_expense', amountNative:-2.470, disclosureLevel:'summary' },
    { rawLabel:'Custo com departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:0, disclosureLevel:'summary' },
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-7.559, disclosureLevel:'summary' },
  ],
  2024: [
    { rawLabel:'Comissão técnica', normalizedCategory:'wages_squad', amountNative:-68.656, disclosureLevel:'summary' },
    { rawLabel:'Custo do departamento de futebol', normalizedCategory:'wages_squad', amountNative:-311.878, disclosureLevel:'summary' },
    { rawLabel:'Gastos com jogos e bonificações', normalizedCategory:'match_organisation_expense', amountNative:-13.822, disclosureLevel:'summary' },
    { rawLabel:'Custo com departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:-37.316, disclosureLevel:'summary' },
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-38.253, disclosureLevel:'summary' },
  ],
};

const rbbragantinoBrFiscalYearMeta = {
  2019: {
    currency:'BRL', fxRef:'BRL@2019-12-31',
    sourceId:'rbbragantino-br-balanco-2019',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos" (Passivo Circulante) reconstruido cruzando subtotales — ver
    // comentario de cabecera. cash = "Caixa e equivalentes de caixa", confirmado por partida doble
    // (Balanço + Demonstração dos fluxos de caixa).
    grossDebt:0.564, cash:4.256,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas financeiras (0,008) + Despesas financeiras (-2,010), Nota 14.
    netInterest:-2.002, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines.
    // officialPAT = "Superávit líquido do exercício" impreso (144 mil = 0,144 M BRL). Verificado:
    // revenue + expenses + netInterest = 0,144 EXACTO, dígito por dígito.
    officialTotalRevenue:39.171, officialTotalExpenses:37.025, officialPAT:0.144,
  },
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'rbbragantino-br-balanco-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = 0 (sin deuda financiera de terceros al cierre, ver comentario de cabecera: el
    // único pasivo tipo préstamo se pagó por completo durante el año). cash = "Caixa e equivalentes
    // de caixa", confirmado por partida doble (Balanço + Demonstração dos fluxos de caixa).
    grossDebt:0, cash:29.015,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas financeiras (21,568) + Despesas financeiras (-12,474).
    netInterest:9.094, tax:-14.384,
    // officialTotalRevenue = suma de revenueLines (Receita Líquida + Outras receitas e despesas
    // operacionais) = 506,216 M BRL. officialTotalExpenses = suma de expenseLines = 469,925 M BRL.
    // officialPAT = "Lucro líquido do exercício" impreso (31.001 = 31,001 M BRL). Verificado: revenue
    // + expenses + netInterest + tax = 31,001 EXACTO, dígito por dígito.
    officialTotalRevenue:506.216, officialTotalExpenses:469.925, officialPAT:31.001,
  },
};

const rbbragantinoBrPresupuestoOverlayByYear = {};

const rbbragantinoBrPasesData = [];
const rbbragantinoBrResultadosData = {};
const rbbragantinoBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rbbragantino-br'] = {
  revenueLinesByYear: rbbragantinoBrRevenueLinesByYear, expenseLinesByYear: rbbragantinoBrExpenseLinesByYear,
  fiscalYearMeta: rbbragantinoBrFiscalYearMeta, pasesData: rbbragantinoBrPasesData,
  resultadosData: rbbragantinoBrResultadosData, titulosData: rbbragantinoBrTitulosData,
  presupuestoOverlayByYear: rbbragantinoBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rbbragantino-br-balanco-2019': {
    id:'rbbragantino-br-balanco-2019', clubId:'rbbragantino-br',
    title:'Red Bull Bragantino — Balanço Patrimonial e Demonstração do Resultado, Exercícios Findos em 31 de Dezembro de 2019 e de 2018',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://web.archive.org/web/2019*/https://www.redbullbragantino.com.br/balanco/2019.pdf',
    note:'PDF oficial recuperado vía Wayback Machine (el sitio en vivo, redbullbragantino.com.br, migró a una SPA que ya no sirve PDFs viejos, cualquier ruta devuelve el shell HTML — ver fuentes/Brasil/RB Bragantino.md). GOTCHA: PDF "Microsoft: Print To PDF" vectorial, sin capa de texto real — se transcribió con lectura visual/OCR, no extracción nativa; la tabla de Balanço patrimonial (Activo/Pasivo) salió con columnas/etiquetas parcialmente desordenadas en la transcripción y se reconstruyó cruzando subtotales impresos (ver comentario de cabecera de este archivo para el detalle). La DRE (Demonstração do resultado) es la parte confiable del documento: cierra EXACTO contra el Superávit líquido do exercício impreso (144 mil BRL, superávit real pese al Patrimônio Líquido negativo de -55.047 mil BRL heredado de años anteriores). Convertido a USD con PTAX BCB de cierre 31/12/2019 (R$4,0307 venda, investigado vía API Olinda del BCB esta sesión, todavía no está en FX_CLOSE).',
  },
  'rbbragantino-br-balanco-2024': {
    id:'rbbragantino-br-balanco-2024', clubId:'rbbragantino-br',
    title:'Red Bull Bragantino Futebol Ltda. — Balanços Patrimoniais e Demonstrações do Resultado, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://web.archive.org/web/2025*/https://www.redbullbragantino.com.br/balanco/Red_Bull_Bragantino_(BDO...11_de_Fevereiro_de_2025).pdf',
    note:'PDF oficial recuperado vía Wayback Machine (mismo gotcha del sitio en vivo que 2019, ver fuentes/Brasil/RB Bragantino.md). Auditado por BDO RCS Auditores Independentes SS, firmado 11/02/2025, con capa de texto real. La transcripción disponible cubre 5 páginas (Balanço, DRE, DRA, DMPL, DFC) pero NO las Notas explicativas (que existen en el PDF de 8-9 páginas según la prensa) — sin ellas, "Custo do departamento de futebol" (la línea de gasto más grande, 311,878 M BRL) no se pudo desglosar entre sueldos y amortización de derechos federativos de atletas, se cargó entera a wages_squad como aproximación (ver comentario de cabecera). Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923), ya en FX_CLOSE.',
  },
});

// gestionesByClub: entrada genérica "sin confirmar" — es una Ltda controlada por Red Bull GmbH, no un
// club asociativo con presidente electo (mismo criterio que Once Caldas/Envigado en Colombia). Cubre
// los 2 años cargados.
gestionesByClub['rbbragantino-br'] = {
  sinconfirmar: { nombre:'Red Bull Bragantino Futebol Ltda. (controlada por Red Bull GmbH, sin gestión/presidencia electa)', firstYear:2019, lastYear:2024 },
};

memberCountByClub['rbbragantino-br'] = null; // es una Ltda, no tiene socios en el sentido de un club asociativo
