// ============================================================================
// data/deflactores.js — deflactor del PBI por moneda y año, para "Valores ajustados por inflación"
// en Finanzas (to-do 147, paso 11; resuelve el 23(d)).
//
// QUÉ AJUSTA Y QUÉ NO. Cada ejercicio ya se convierte a USD (o EUR) con el tipo de cambio de SU
// cierre, y eso absorbe la inflación local (pesos, reales, etc.). Lo que queda es la inflación de la
// moneda en la que se muestra: 100 M USD de 2005 no compran lo mismo que 100 M USD de 2025. Por eso
// hay una serie por moneda DE PANTALLA, no por club ni por país. Solo USD y EUR: en las demás monedas
// el toggle no aparece.
//
// DECISIONES DE GUIDO (2026-10-05): el deflactor del PBI y no el IPC; año base = el último año de la
// serie (hoy 2025, o sea el ejercicio 2024/25); cada ejercicio usa el año en que CIERRA (2024/25 usa
// 2025, mismo criterio que el tipo de cambio); un ejercicio posterior al año base (un presupuesto
// futuro) no se ajusta.
//
// EL OBJETO DE ABAJO SE GENERA, NO SE EDITA A MANO: `node tools/fetch-fx-reference.mjs --deflactores`
// baja las dos series de su fuente oficial a tools/fx-reference/ (deflactor-usd.json, deflactor-eur.json,
// al lado de las series de tipo de cambio del pipeline de altas) y reescribe el objeto; este encabezado
// se conserva. Se corre una vez por año, cuando BEA y Eurostat publican el año que cerró: el año base se
// mueve solo (es el último de cada serie). Si la fuente revisó años viejos, también se actualizan.
// ============================================================================

window.DEFLACTORES = {
  USD: {
    nombre: 'deflactor del PBI de EE.UU.',
    fuente: 'BEA, vía FRED (A191RD3A086NBEA), índice 2017 = 100',
    valores: {
      2000: 72.722, 2001: 74.360, 2002: 75.515, 2003: 77.006, 2004: 79.077, 2005: 81.556,
      2006: 84.071, 2007: 86.349, 2008: 88.013, 2009: 88.556, 2010: 89.632, 2011: 91.481,
      2012: 93.185, 2013: 94.771, 2014: 96.421, 2015: 97.316, 2016: 98.241, 2017: 100.000,
      2018: 102.291, 2019: 103.979, 2020: 105.377, 2021: 110.159, 2022: 118.026, 2023: 122.451,
      2024: 125.587, 2025: 128.893,
    },
  },
  EUR: {
    nombre: 'deflactor del PBI de la zona euro',
    fuente: 'Eurostat (nama_10_gdp, EA20, PD15_EUR), índice 2015 = 100',
    valores: {
      2000: 77.708, 2001: 79.663, 2002: 81.655, 2003: 83.479, 2004: 85.108, 2005: 86.757,
      2006: 88.525, 2007: 90.728, 2008: 92.638, 2009: 93.584, 2010: 94.258, 2011: 95.308,
      2012: 96.522, 2013: 97.720, 2014: 98.635, 2015: 100.000, 2016: 100.912, 2017: 102.063,
      2018: 103.620, 2019: 105.377, 2020: 107.317, 2021: 109.566, 2022: 115.137, 2023: 122.348,
      2024: 125.867, 2025: 128.841,
    },
  },
};
