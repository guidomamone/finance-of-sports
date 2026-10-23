// Monedas, procedencia del tipo de cambio y cotizaciones de mercado. El modelo (USD como pivote, qué es `fx`, `scale`, las
// procedencias, la regla de FX_CLOSE): Admin/ARQUITECTURA.md, "Monedas y tipo de cambio".

const CURRENCY_META = {
  ARS: { scale: 1000, unitSuffix: 'mil M' },  // Argentina
  CLP: { scale: 1000, unitSuffix: 'mil M' },  // Chile
  COP: { scale: 1000, unitSuffix: 'mil M' },  // Colombia
  USD: { scale: 1, unitSuffix: 'M' },          // pivote universal + Ecuador (dolarizado)
  BRL: { scale: 1, unitSuffix: 'M' },          // Brasil
  PEN: { scale: 1, unitSuffix: 'M' },          // Perú
  EUR: { scale: 1, unitSuffix: 'M' },          // España
  // México: ~18-20 MXN por USD, el orden de BRL/PEN, así que "millones" ya lee bien.
  MXN: { scale: 1, unitSuffix: 'M' },          // México
  // Japón: el documento reporta en millones de yenes, que ya leen bien como "millones".
  JPY: { scale: 1, unitSuffix: 'M' },          // Japón
  GBP: { scale: 1, unitSuffix: 'M' },          // Inglaterra
  DKK: { scale: 1, unitSuffix: 'M' },          // Dinamarca
  // Lira italiana (hasta 2001): ~1.800-2.300 ITL por USD y documentos en millones de liras, así que scale:1000. euroFijo = unidades de la
  // moneda legado por 1 EUR (paridad irrevocable, Reglamento CE 2866/98): toDisplayValue la pasa a EUR sin tipo de cambio de mercado.
  ITL: { scale: 1000, unitSuffix: 'mil M', euroFijo: 1936.27 },   // Italia (lira, hasta 2001)
  // Escudo portugués (hasta 2001): ~200-220 PTE por USD y documentos en miles de escudos (Sporting 1999-2000): scale:1000 como la lira.
  PTE: { scale: 1000, unitSuffix: 'mil M', euroFijo: 200.482 },   // Portugal (escudo, hasta 2001)
  RUB: { scale: 1, unitSuffix: 'M' }, // Rusia
  NOK: { scale: 1, unitSuffix: 'M' },
  CHF: { scale: 1, unitSuffix: 'M' },
  TRY: { scale: 1, unitSuffix: 'M' },  // Turquía
};

// Fallback para un código ISO sin entrada propia: nunca rompe ni muestra la unidad equivocada.
const DEFAULT_CURRENCY_META = { scale: 1, unitSuffix: 'M' };

function currencyMetaFor(code){
  return CURRENCY_META[code] || DEFAULT_CURRENCY_META;
}

// Procedencia de cada `fx` (qué significa cada una: Admin/ARQUITECTURA.md, "Monedas y tipo de cambio").
const FX_SOURCE = {
  document_close: {
    label: 'Declarado por el balance',
    detail: 'Tipo de cambio de cierre que el propio balance declara en su Anexo de moneda extranjera',
  },
  document_assumption: {
    label: 'Premisa del presupuesto',
    detail: 'Tipo de cambio que el propio presupuesto declara como supuesto para un ejercicio que todavía no cerró',
  },
  document_average: {
    label: 'Promedio del período, declarado por el balance',
    detail: 'Tipo de cambio promedio del ejercicio que el propio documento declara para convertir su estado de resultados, distinto del de cierre que usa para el balance',
  },
  market_close: {
    label: 'Cotización oficial de cierre',
    detail: 'El documento no declara ninguno: se usó la cotización oficial de la fecha de cierre (BCRA, BNA, PTAX, BCE, TRM)',
  },
  market_approx: {
    label: 'Cotización aproximada',
    detail: 'No se consiguió la cotización exacta del día: se interpoló o se usó una de fecha cercana',
  },
  placeholder: {
    label: 'Valor de referencia',
    detail: 'No sale de ninguna fuente: existe solo para que el toggle de moneda funcione',
  },
  unknown: {
    label: 'Sin determinar',
    detail: 'Todavía no se verificó de dónde salió; queda listado como pendiente en node tools/audit.js',
  },
};

// FX_CLOSE: cotizaciones de mercado, una sola vez por moneda y fecha de cierre (la regla: ARQUITECTURA.md; por qué cada una:
// Admin/fx-cotizaciones.md). Solo cotizaciones exactas y verificadas.
const FX_CLOSE = {
  'ARS@2014-06-30': { fx: 8.15,    source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2014' },
  'ARS@2015-06-30': { fx: 9.085,   source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2015' },
  'ARS@2016-06-30': { fx: 15.2,    source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2016' },
  'ARS@2017-06-30': { fx: 16.8,    source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2017' },
  'ARS@2018-06-30': { fx: 28.85,   source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2018' },
  'ARS@2019-06-30': { fx: 42.45,   source: 'market_close', label: 'Dólar oficial vendedor BNA al 30/6/2019' },
  'ARS@2020-06-30': { fx: 70.46,   source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2020' },
  'ARS@2021-06-30': { fx: 95.72,   source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2021' },
  'ARS@2022-06-30': { fx: 125.215, source: 'market_close', label: 'Dólar mayorista de referencia BCRA (Comunicación A 3500) al 30/6/2022' },
  'ARS@2023-06-30': { fx: 256.675, source: 'market_close', label: 'Dólar mayorista de referencia BCRA (Comunicación A 3500) al 30/6/2023' },
  'ARS@2024-06-30': { fx: 909,     source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2024' },
  'ARS@2025-06-30': { fx: 1203,    source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2025' },
  'ARS@2024-12-31': { fx: 1032,    source: 'market_close', label: 'Dólar mayorista BCRA, última rueda de 2024 (30/12/2024)' },
  'ARS@2025-12-31': { fx: 1457,    source: 'market_close', label: 'Dólar mayorista BCRA, última rueda de 2025 (29/12/2025)' },
  'ARS@2026-06-30': { fx: 1482,    source: 'market_close', label: 'Dólar mayorista BCRA al 30/6/2026' },
  'ARS@2018-10-31': { fx: 35.95,   source: 'market_close', label: 'Dólar mayorista BCRA al 31/10/2018' },
  'ARS@2019-10-31': { fx: 59.67,   source: 'market_close', label: 'Dólar mayorista BCRA al 31/10/2019' },
  'ARS@2020-10-31': { fx: 78.32,   source: 'market_close', label: 'Dólar mayorista BCRA, última rueda hábil antes del cierre (viernes 30/10/2020, 31/10 cayó sábado)' },
  'ARS@2021-10-31': { fx: 99.72,   source: 'market_close', label: 'Dólar mayorista BCRA, última rueda hábil antes del cierre (viernes 29/10/2021, 30 y 31/10 cayeron sábado y domingo)' },
  'ARS@2022-10-31': { fx: 156.91,  source: 'market_close', label: 'Dólar mayorista BCRA al 31/10/2022' },
  'ARS@2023-10-31': { fx: 350.00,  source: 'market_close', label: 'Dólar mayorista BCRA al 31/10/2023' },
  'BRL@2017-12-31': { fx: 3.3080,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, 29/12/2017 (último día hábil del año)' },
  'BRL@2019-12-31': { fx: 4.0307,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2019' },
  'BRL@2020-12-31': { fx: 5.1967,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2020' },
  'BRL@2021-12-31': { fx: 5.5805,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021' },
  'BRL@2022-12-31': { fx: 5.2177,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, 30/12/2022 (último día hábil del año; 31/12 cayó sábado)' },
  'BRL@2023-12-31': { fx: 4.8413,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, 29/12/2023 (último día hábil del año; 30 y 31/12 cayeron sábado y domingo)' },
  'BRL@2024-12-31': { fx: 6.1923,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2024' },
  'BRL@2025-12-31': { fx: 5.5024,  source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, boletín del 30/12/2025' },
  'COP@2018-12-31': { fx: 3249.75, source: 'market_close', label: 'TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2018' },
  'COP@2022-12-31': { fx: 4810.2, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 31/12/2022' },
  'COP@2023-12-31': { fx: 3822.05, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 31/12/2023' },
  'COP@2024-12-31': { fx: 4409.15, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 31/12/2024' },
  'COP@2025-12-31': { fx: 3757.08, source: 'market_close', label: 'TRM oficial (Superintendencia Financiera de Colombia) al 31/12/2025' },
  'EUR@2021-06-30': { fx: 0.8415,  source: 'market_close', label: 'Cierre BCE al 30/6/2021 (1 EUR = 1,1884 USD)' },
  'EUR@2024-06-30': { fx: 0.9337,  source: 'market_close', label: 'Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD)' },
  'EUR@2025-06-30': { fx: 0.8532,  source: 'market_close', label: 'Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD)' },
  'EUR@2025-12-31': { fx: 0.8511,  source: 'market_close', label: 'Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD)' },
  'JPY@2025-12-31': { fx: 150,     source: 'placeholder',  label: 'Referencia redonda de ¥150 por USD; el documento de la J.League no declara ninguna' },
  'PEN@2022-12-31': { fx: 3.8105, source: 'market_close', label: 'TC Interbancario BCRP, promedio compra/venta del 30/12/2022 (último día hábil del año: el 31/12/2022 fue sábado)' },
  'PEN@2023-12-31': { fx: 3.709,  source: 'market_close', label: 'Tipo de cambio contable SBS (promedio compra/venta) al cierre del ejercicio 2023' },
  'PEN@2024-12-31': { fx: 3.764,  source: 'market_close', label: 'Tipo de cambio contable SBS (promedio compra/venta) al cierre del ejercicio 2024' },
  'EUR@2020-06-30': { fx: 0.8930, source: 'market_close', label: 'Cierre BCE al 30/6/2020 (1 EUR = 1,1198 USD)' },
  'EUR@2022-06-30': { fx: 0.9627, source: 'market_close', label: 'Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD)' },
  'EUR@2023-06-30': { fx: 0.9203, source: 'market_close', label: 'Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD)' },
  'EUR@2023-12-31': { fx: 0.9050, source: 'market_close', label: 'Cierre BCE del viernes 29/12/2023 (el 31 es domingo, sin cotización) (1 EUR = 1,1050 USD)' },
  'EUR@2024-12-31': { fx: 0.9626, source: 'market_close', label: 'Cierre BCE al 31/12/2024 (1 EUR = 1,0389 USD)' },
  'GBP@2024-05-31': { fx: 0.7866, source: 'market_close', label: 'Cierre BCE al 31/5/2024, cruzando GBP/EUR (0,85365) × EUR/USD (1,0852) (1 GBP ≈ 1,2712 USD)' },
  'GBP@2025-05-31': { fx: 0.7419, source: 'market_close', label: 'Cierre BCE del viernes 30/5/2025 (el 31 es sábado, sin cotización), cruzando GBP/EUR (0,84120) × EUR/USD (1,1339) (1 GBP ≈ 1,3480 USD)' },
  'GBP@2024-06-30': { fx: 0.7906, source: 'market_close', label: 'Cierre BCE del viernes 28/6/2024 (el 30 es domingo, sin cotización), cruzando GBP/EUR (0,84638) × EUR/USD (1,0705) (1 GBP ≈ 1,2648 USD)' },
  'GBP@2025-06-30': { fx: 0.7299, source: 'market_close', label: 'Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,1720) (1 GBP ≈ 1,3700 USD)' },
  'GBP@2024-07-31': { fx: 0.7793, source: 'market_close', label: 'Cierre BCE al 31/7/2024, cruzando GBP/EUR (0,84380) × EUR/USD (1,0828) (1 GBP ≈ 1,2832 USD)' },
  'GBP@2025-07-31': { fx: 0.7556, source: 'market_close', label: 'Cierre BCE al 31/7/2025, cruzando GBP/EUR (0,86490) × EUR/USD (1,1446) (1 GBP ≈ 1,3235 USD)' },
  'DKK@2019-06-30': { fx: 6.5585, source: 'market_close', label: 'Cierre BCE del viernes 28/6/2019 (el 30 es domingo, sin cotización), cruzando DKK/EUR (7,4636) × EUR/USD (1,1380) (1 DKK ≈ 0,1525 USD)' },
  'DKK@2019-12-31': { fx: 6.6508, source: 'market_close', label: 'Cierre BCE al 31/12/2019, cruzando DKK/EUR (7,4715) × EUR/USD (1,1234) (1 DKK ≈ 0,1504 USD)' },
  'DKK@2020-12-31': { fx: 6.0638, source: 'market_close', label: 'Cierre BCE al 31/12/2020, cruzando DKK/EUR (7,4409) × EUR/USD (1,2271) (1 DKK ≈ 0,1650 USD)' },
  'DKK@2021-06-30': { fx: 6.2573, source: 'market_close', label: 'Cierre BCE al 30/6/2021, cruzando DKK/EUR (7,4362) × EUR/USD (1,1884) (1 DKK ≈ 0,1598 USD)' },
  'DKK@2022-06-30': { fx: 7.0980, source: 'market_close', label: 'Cierre BCE al 30/6/2022, cruzando DKK/EUR (7,4362) × EUR/USD (1,0477) (1 DKK ≈ 0,1409 USD)' },
  'DKK@2023-06-30': { fx: 6.8089, source: 'market_close', label: 'Cierre Danmarks Nationalbank al 30/6/2023, cotización directa DKK/USD (1 DKK ≈ 0,1469 USD)' },
  'DKK@2024-06-30': { fx: 6.9664, source: 'market_close', label: 'Cierre BCE del viernes 28/6/2024 (el 30 es domingo, sin cotización), cruzando DKK/EUR (7,4575) × EUR/USD (1,0705) (1 DKK ≈ 0,1435 USD)' },
  'DKK@2024-12-31': { fx: 7.1786, source: 'market_close', label: 'Cierre BCE al 31/12/2024, cruzando DKK/EUR (7,4578) × EUR/USD (1,0389) (1 DKK ≈ 0,1393 USD)' },
  'CLP@2010-12-31': { fx: 468.01, source: 'market_close', label: 'Dólar observado (Banco Central de Chile, publicado por el SII), última rueda hábil antes del cierre (2011-01-03, 2010-12-31 no es día hábil)' },
  'CLP@2011-12-31': { fx: 519.2, source: 'market_close', label: 'Dólar observado (Banco Central de Chile, publicado por el SII), última rueda hábil antes del cierre (2012-01-02, 2011-12-31 no es día hábil)' },
  'CLP@2012-12-31': { fx: 479.96, source: 'market_close', label: 'Dólar observado (Banco Central de Chile, publicado por el SII), última rueda hábil antes del cierre (2013-01-02, 2012-12-31 no es día hábil)' },
  'CLP@2013-12-31': { fx: 524.61, source: 'market_close', label: 'Dólar observado (Banco Central de Chile, publicado por el SII), última rueda hábil antes del cierre (2014-01-02, 2013-12-31 no es día hábil)' },
  'CLP@2014-12-31': { fx: 606.75, source: 'market_close', label: 'Dólar observado (Banco Central de Chile, publicado por el SII), última rueda hábil antes del cierre (2015-01-02, 2014-12-31 no es día hábil)' },
  'COP@2017-12-31': { fx: 2984, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 2017-12-31' },
  'COP@2019-12-31': { fx: 3277.14, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 2019-12-31' },
  'COP@2020-12-31': { fx: 3432.5, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 2020-12-31' },
  'COP@2021-12-31': { fx: 3981.16, source: 'market_close', label: 'TRM oficial (Banco de la República / Superfinanciera de Colombia) al 2021-12-31' },
  'BRL@2008-12-31': { fx: 2.337, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2008-12-31' },
  'BRL@2009-12-31': { fx: 1.7412, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2009-12-31' },
  'BRL@2010-12-31': { fx: 1.6662, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2010-12-31' },
  'BRL@2011-12-31': { fx: 1.8758, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, última rueda hábil antes del cierre (2011-12-30, 2011-12-31 no es día hábil)' },
  'BRL@2012-12-31': { fx: 2.0435, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2012-12-31' },
  'BRL@2013-12-31': { fx: 2.3426, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2013-12-31' },
  'BRL@2015-12-31': { fx: 3.9048, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2015-12-31' },
  'BRL@2014-12-31': { fx: 2.6562, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2014-12-31' },
  'BRL@2016-12-31': { fx: 3.2591, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil, última rueda hábil antes del cierre (2016-12-30, 2016-12-31 no es día hábil)' },
  'BRL@2018-12-31': { fx: 3.8748, source: 'market_close', label: 'PTAX de cierre (venda) del Banco Central do Brasil al 2018-12-31' },
  'EUR@2018-06-30': { fx: 0.85778, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2018-06-29, 2018-06-30 no es día hábil)' },
  'EUR@2017-06-30': { fx: 0.876271, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2017-06-30' },
  'EUR@2016-06-30': { fx: 0.900739, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2016-06-30' },
  'EUR@2019-06-30': { fx: 0.878735, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2019-06-28, 2019-06-30 no es día hábil)' },
  'EUR@2012-06-30': { fx: 0.794281, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2012-06-29, 2012-06-30 no es día hábil)' },
  'EUR@2013-06-30': { fx: 0.764526, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2013-06-28, 2013-06-30 no es día hábil)' },
  'EUR@2014-06-30': { fx: 0.732172, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2014-06-30' },
  'EUR@2015-06-30': { fx: 0.893735, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2015-06-30' },
  'EUR@2007-06-30': { fx: 0.740466, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2007-06-29, 2007-06-30 no es día hábil)' },
  'EUR@2009-06-30': { fx: 0.707514, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2009-06-30' },
  'EUR@2010-06-30': { fx: 0.81493, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2010-06-30' },
  'ITL@1999-06-30': { fx: 1874.78, source: 'market_close', label: '1 EUR = 1.936,27 ITL (paridad fija) y 1 EUR = 1,0328 USD, tipo de referencia del BCE al 30/06/1999' },
  'ITL@2000-06-30': { fx: 2026.23, source: 'market_close', label: '1 EUR = 1.936,27 ITL (paridad fija) y 1 EUR = 0,9556 USD, tipo de referencia del BCE al 30/06/2000' },
  'ITL@2001-06-30': { fx: 2283.34, source: 'market_close', label: '1 EUR = 1.936,27 ITL (paridad fija) y 1 EUR = 0,848 USD, tipo de referencia del BCE al 29/06/2001 (el 30/6/2001 fue sábado: cierre del viernes 29/6)' },
  'PTE@2000-07-31': { fx: 216.9015, source: 'market_close', label: '1 EUR = 200,482 PTE (paridad fija) y 1 EUR = 0,9243 USD (1,0819 EUR por USD), tipo de referencia del BCE al 31/07/2000' },
  'PTE@2001-07-31': { fx: 228.9913, source: 'market_close', label: '1 EUR = 200,482 PTE (paridad fija) y 1,142204 EUR por USD, tipo de referencia del BCE al 31/07/2001' },
  'EUR@2003-06-30': { fx: 0.87512, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2003-06-30' },
  'EUR@2004-06-30': { fx: 0.822707, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2004-06-30' },
  'EUR@2005-06-30': { fx: 0.826993, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2005-06-30' },
  'EUR@2006-06-30': { fx: 0.786596, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2006-06-30' },
  'EUR@2008-06-30': { fx: 0.634357, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2008-06-30' },
  'EUR@2011-06-30': { fx: 0.691898, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2011-06-30' },
  'EUR@2021-12-31': { fx: 0.882924, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2021-12-31' },
  'EUR@2022-12-31': { fx: 0.937559, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2022-12-30, 2022-12-31 no es día hábil)' },
  'EUR@2018-12-31': { fx: 0.873362, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2018-12-31' },
  'EUR@2020-12-31': { fx: 0.81493, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2020-12-31' },
  'EUR@2019-12-31': { fx: 0.890155, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2019-12-31' },
  'EUR@2026-06-30': { fx: 0.877655, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2026-06-30' },
  'EUR@2008-12-31': { fx: 0.718546, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2008-12-31' },
  'EUR@2009-12-31': { fx: 0.694155, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2009-12-31' },
  'EUR@2010-12-31': { fx: 0.748391, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2010-12-31' },
  'EUR@2011-12-31': { fx: 0.772857, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo, última rueda hábil antes del cierre (2011-12-30, 2011-12-31 no es día hábil)' },
  'EUR@2012-12-31': { fx: 0.75792, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2012-12-31' },
  'EUR@2013-12-31': { fx: 0.725111, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2013-12-31' },
  'RUB@2021-12-31': { fx: 74.2926, source: 'market_close', label: 'Tipo oficial del Banco de Rusia al 2021-12-31' },
  'RUB@2022-12-31': { fx: 70.3375, source: 'market_close', label: 'Tipo oficial del Banco de Rusia al 2022-12-31' },
  'RUB@2023-12-31': { fx: 89.6883, source: 'market_close', label: 'Tipo oficial del Banco de Rusia, última rueda hábil antes del cierre (2023-12-30, 2023-12-31 no es día hábil)' },
  'RUB@2024-12-31': { fx: 101.6797, source: 'market_close', label: 'Tipo oficial del Banco de Rusia, última rueda hábil antes del cierre (2024-12-29, 2024-12-31 no es día hábil)' },
  'RUB@2025-12-31': { fx: 78.2267, source: 'market_close', label: 'Tipo oficial del Banco de Rusia al 2025-12-31' },
  'EUR@2007-07-31': { fx: 0.729554, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2007-07-31' },
  'EUR@2003-07-31': { fx: 0.883548, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2003-07-31' },
  'NOK@2025-12-31': { fx: 10.0791, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2025-12-31' },
  'CHF@2021-12-31': { fx: 0.9146, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2021-12-30, 2021-12-31 no es día hábil)' },
  'CHF@2025-06-30': { fx: 0.7938, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2025-06-30' },
  'NOK@2024-12-31': { fx: 11.3534, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2024-12-31' },
  'NOK@2016-12-31': { fx: 8.62, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank, última rueda hábil antes del cierre (2016-12-30, 2016-12-31 no es día hábil)' },
  'NOK@2017-12-31': { fx: 8.205, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank, última rueda hábil antes del cierre (2017-12-29, 2017-12-31 no es día hábil)' },
  'NOK@2013-12-31': { fx: 6.0837, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2013-12-31' },
  'NOK@2014-12-31': { fx: 7.4332, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2014-12-31' },
  'NOK@2015-12-31': { fx: 8.809, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2015-12-31' },
  'NOK@2018-12-31': { fx: 8.6885, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2018-12-31' },
  'NOK@2012-12-31': { fx: 5.5664, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2012-12-31' },
  'NOK@2019-12-31': { fx: 8.7803, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2019-12-31' },
  'NOK@2020-12-31': { fx: 8.5326, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2020-12-31' },
  'NOK@2021-12-31': { fx: 8.8194, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2021-12-31' },
  'NOK@2022-12-31': { fx: 9.8573, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank, última rueda hábil antes del cierre (2022-12-30, 2022-12-31 no es día hábil)' },
  'NOK@2023-12-31': { fx: 10.1724, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank, última rueda hábil antes del cierre (2023-12-29, 2023-12-31 no es día hábil)' },
  'CHF@2019-06-30': { fx: 0.9758, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2019-06-28, 2019-06-30 no es día hábil)' },
  'CHF@2022-06-30': { fx: 0.955, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2022-06-30' },
  'CHF@2018-06-30': { fx: 0.9922, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2018-06-29, 2018-06-30 no es día hábil)' },
  'CHF@2020-06-30': { fx: 0.9467, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2020-06-30' },
  'CHF@2024-06-30': { fx: 0.8992, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2024-06-28, 2024-06-30 no es día hábil)' },
  'GBP@2023-05-31': { fx: 0.806842, source: 'market_close', label: 'Tipo spot del Bank of England al 2023-05-31' },
  'GBP@2022-05-31': { fx: 0.793588, source: 'market_close', label: 'Tipo spot del Bank of England al 2022-05-31' },
  'GBP@2022-06-30': { fx: 0.82352, source: 'market_close', label: 'Tipo spot del Bank of England al 2022-06-30' },
  'GBP@2023-06-30': { fx: 0.786535, source: 'market_close', label: 'Tipo spot del Bank of England al 2023-06-30' },
  'GBP@2019-05-31': { fx: 0.793525, source: 'market_close', label: 'Tipo spot del Bank of England al 2019-05-31' },
  'GBP@2021-05-31': { fx: 0.705418, source: 'market_close', label: 'Tipo spot del Bank of England, última rueda hábil antes del cierre (2021-05-28, 2021-05-31 no es día hábil)' },
  'GBP@2021-06-30': { fx: 0.723641, source: 'market_close', label: 'Tipo spot del Bank of England al 2021-06-30' },
  'GBP@2020-05-31': { fx: 0.808538, source: 'market_close', label: 'Tipo spot del Bank of England, última rueda hábil antes del cierre (2020-05-29, 2020-05-31 no es día hábil)' },
  'GBP@2020-06-30': { fx: 0.809127, source: 'market_close', label: 'Tipo spot del Bank of England al 2020-06-30' },
  'CHF@2005-12-31': { fx: 1.3148, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2005-12-30, 2005-12-31 no es día hábil)' },
  'CHF@2006-12-31': { fx: 1.2195, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2006-12-29, 2006-12-31 no es día hábil)' },
  'CHF@2007-12-31': { fx: 1.1329, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2007-12-31' },
  'CHF@2008-12-31': { fx: 1.0673, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2008-12-31' },
  'CHF@2009-12-31': { fx: 1.0358, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2009-12-31' },
  'CHF@2010-12-31': { fx: 0.9369, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2010-12-30, 2010-12-31 no es día hábil)' },
  'CHF@2011-12-31': { fx: 0.9374, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2011-12-30, 2011-12-31 no es día hábil)' },
  'CHF@2012-12-31': { fx: 0.9155, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2012-12-31' },
  'CHF@2013-12-31': { fx: 0.8904, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2013-12-31' },
  'CHF@2014-12-31': { fx: 0.9934, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2014-12-31' },
  'CHF@2015-12-31': { fx: 1.0017, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2015-12-31' },
  'CHF@2016-12-31': { fx: 1.016, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2016-12-30, 2016-12-31 no es día hábil)' },
  'CHF@2017-12-31': { fx: 0.9738, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10), última rueda hábil antes del cierre (2017-12-29, 2017-12-31 no es día hábil)' },
  'CHF@2018-12-31': { fx: 0.9832, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2018-12-31' },
  'CHF@2019-12-31': { fx: 0.9677, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2019-12-31' },
  'CHF@2020-12-31': { fx: 0.8841, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2020-12-31' },
  'DKK@2020-06-30': { fx: 6.6553, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank al 2020-06-30' },
  'DKK@2025-12-31': { fx: 6.3527, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank, última rueda hábil antes del cierre (2025-12-30, 2025-12-31 no es día hábil)' },
  'CLP@2025-12-31': { fx: 907.13, source: 'market_close', label: 'Dólar observado (Banco Central de Chile, publicado por el SII), última rueda hábil antes del cierre (2026-01-02, 2025-12-31 no es día hábil)' },
  'DKK@2025-06-30': { fx: 6.366, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank al 2025-06-30' },
  'CHF@2023-06-30': { fx: 0.8947, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2023-06-30' },
  'GBP@2023-07-31': { fx: 0.777424, source: 'market_close', label: 'Tipo spot del Bank of England al 2023-07-31' },
  'GBP@2022-07-31': { fx: 0.822233, source: 'market_close', label: 'Tipo spot del Bank of England, última rueda hábil antes del cierre (2022-07-29, 2022-07-31 no es día hábil)' },
  'GBP@2019-06-30': { fx: 0.785669, source: 'market_close', label: 'Tipo spot del Bank of England, última rueda hábil antes del cierre (2019-06-28, 2019-06-30 no es día hábil)' },
  'GBP@2020-07-31': { fx: 0.761847, source: 'market_close', label: 'Tipo spot del Bank of England al 2020-07-31' },
  'GBP@2019-07-31': { fx: 0.816593, source: 'market_close', label: 'Tipo spot del Bank of England al 2019-07-31' },
  'GBP@2021-07-31': { fx: 0.719062, source: 'market_close', label: 'Tipo spot del Bank of England, última rueda hábil antes del cierre (2021-07-30, 2021-07-31 no es día hábil)' },
  'CHF@2021-06-30': { fx: 0.9253, source: 'market_close', label: 'Noon buying rate de Nueva York (Reserva Federal, H.10) al 2021-06-30' },
  'TRY@2023-05-31': { fx: 20.6632, source: 'market_close', label: 'Döviz alış del TCMB al 2023-05-31' },
  'TRY@2019-05-31': { fx: 5.8613, source: 'market_close', label: 'Döviz alış del TCMB al 2019-05-31' },
  'TRY@2020-05-31': { fx: 6.8138, source: 'market_close', label: 'Döviz alış del TCMB, última rueda hábil antes del cierre (2020-05-29, 2020-05-31 no es día hábil)' },
  'TRY@2021-05-31': { fx: 8.499, source: 'market_close', label: 'Döviz alış del TCMB al 2021-05-31' },
  'TRY@2014-05-31': { fx: 2.0916, source: 'market_close', label: 'Döviz alış del TCMB, última rueda hábil antes del cierre (2014-05-30, 2014-05-31 no es día hábil)' },
  'TRY@2017-05-31': { fx: 3.5334, source: 'market_close', label: 'Döviz alış del TCMB al 2017-05-31' },
  'TRY@2022-05-31': { fx: 16.3876, source: 'market_close', label: 'Döviz alış del TCMB al 2022-05-31' },
  'TRY@2009-05-31': { fx: 1.5345, source: 'market_close', label: 'Döviz alış del TCMB, última rueda hábil antes del cierre (2009-05-29, 2009-05-31 no es día hábil)' },
  'TRY@2010-05-31': { fx: 1.5665, source: 'market_close', label: 'Döviz alış del TCMB al 2010-05-31' },
  'TRY@2011-05-31': { fx: 1.5859, source: 'market_close', label: 'Döviz alış del TCMB al 2011-05-31' },
  'TRY@2016-05-31': { fx: 2.9515, source: 'market_close', label: 'Döviz alış del TCMB al 2016-05-31' },
  'TRY@2018-05-31': { fx: 4.4808, source: 'market_close', label: 'Döviz alış del TCMB al 2018-05-31' },
  'NOK@2008-12-31': { fx: 6.9989, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2008-12-31' },
  'NOK@2009-12-31': { fx: 5.7767, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2009-12-31' },
  'NOK@2010-12-31': { fx: 5.8564, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank al 2010-12-31' },
  'NOK@2011-12-31': { fx: 5.9927, source: 'market_close', label: 'Tipo medio de referencia de Norges Bank, última rueda hábil antes del cierre (2011-12-30, 2011-12-31 no es día hábil)' },
  'DKK@2024-09-30': { fx: 6.6595, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank al 2024-09-30' },
  'DKK@2021-12-31': { fx: 6.5612, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank, última rueda hábil antes del cierre (2021-12-30, 2021-12-31 no es día hábil)' },
  'DKK@2022-12-31': { fx: 6.9722, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank, última rueda hábil antes del cierre (2022-12-30, 2022-12-31 no es día hábil)' },
  'DKK@2023-12-31': { fx: 6.7447, source: 'market_close', label: 'Tipo oficial de Danmarks Nationalbank, última rueda hábil antes del cierre (2023-12-29, 2023-12-31 no es día hábil)' },
  'EUR@2024-05-31': { fx: 0.921489, source: 'market_close', label: 'Tipo de referencia del Banco Central Europeo al 2024-05-31' },
};

// fxMetaFor(meta): el tipo de cambio de un ejercicio (o de un overlay) como {fx, source, label, ref}. Es el ÚNICO lugar que resuelve
// `fxRef` en FX_CLOSE: todo lo que necesite un fx pasa por acá (si no, un ejercicio con fxRef parece no tener tipo de cambio).
// `fx:null` devuelve null: el fallback a FX_RATE es de yearMetaFor.
function fxMetaFor(meta){
  const m = meta || {};
  if(m.fxRef){
    const entry = FX_CLOSE[m.fxRef];
    if(!entry){
      console.warn(`[fx] fxRef desconocido: '${m.fxRef}', no está en FX_CLOSE (data/currency-map.js). El ejercicio queda sin tipo de cambio.`);
      return { fx: null, source: 'unknown', label: `Referencia inexistente: ${m.fxRef}`, ref: m.fxRef };
    }
    return { fx: entry.fx, source: entry.source, label: entry.label, ref: m.fxRef };
  }
  const source = m.fxSource || (m.fx == null ? 'placeholder' : 'unknown');
  return { fx: (m.fx != null ? m.fx : null), source, label: (FX_SOURCE[source] || {}).label || source, ref: null };
}

// FX_PLAUSIBLE_RANGE: [min, max] de moneda nativa por 1 USD, solo para atrapar un fx invertido o de orden de magnitud equivocado
// (ARQUITECTURA.md). Ancho a propósito.
const FX_PLAUSIBLE_RANGE = {
  ARS: [3, 3000],        // Argentina: alta inflación, rango histórico amplio a propósito (clubes
                          // cargados van de ~$4 en 2011 a ~$1900 en presupuestos 2026/27)
  CLP: [400, 1200], // Chile
  COP: [1600, 5500],     // Colombia — serie TRM 2010-2026: mínimo 1.748 (2011), máximo 5.061 (2022)
  BRL: [1.4, 7.5],       // Brasil — serie PTAX 2010-2026: mínimo 1,53 (2011), máximo 6,21 (2024)
  PEN: [3, 5],           // Perú
  EUR: [0.6, 1.15], // OJO: va EUR por 1 USD (~0,85-1,0). Un valor >1,15 casi seguro está invertido (USD por EUR).
  MXN: [15, 25],         // México
  JPY: [100, 180],       // Japón
  GBP: [0.6, 0.95],      // Inglaterra — GBP por 1 USD; la libra rondó 1,05-1,45 USD en las últimas
                          // dos décadas, así que el inverso (lo que va acá) ronda 0,69-0,95.
  DKK: [5, 8],           // Dinamarca — fijada al euro (ERM II, ~7,46 DKK = 1 EUR desde 1982), así
                          // que el rango sigue de cerca al de EUR/USD histórico (0,7-1,15) cruzado
                          // por ~7,46: nunca se aleja mucho de 6-8 DKK por USD.
  RUB: [20, 140], // Rusia
  NOK: [4.5, 13],
  CHF: [0.65, 1.95],
};

// checkFxSanity(): avisa por consola (warn, no error) si algún fx cae fuera del rango plausible de su moneda. Una moneda sin rango
// no se chequea.
function checkFxSanity(){
  const data = (typeof window !== 'undefined' && window.CLUB_GENERIC_DATA) || {};
  Object.keys(data).forEach(clubId => {
    const meta = data[clubId].fiscalYearMeta;
    if(!meta) return;
    Object.keys(meta).forEach(year => {
      const y = meta[year];
      if(!y || y.currency === 'USD') return;
      // Por fxMetaFor y no `y.fx`: con fxRef el número está en FX_CLOSE.
      const fx = fxMetaFor(y).fx;
      if(fx == null) return;
      const range = FX_PLAUSIBLE_RANGE[y.currency];
      if(!range) return;
      const [min, max] = range;
      if(fx < min || fx > max){
        console.warn(`[fx sanity] ${clubId} ${year}: fx:${fx} para ${y.currency} está fuera del rango plausible [${min}, ${max}] (moneda nativa por 1 USD), revisar si está invertido o con el orden de magnitud equivocado.`);
      }
    });
  });
}
