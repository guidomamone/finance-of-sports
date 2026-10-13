// Deflactor del PBI por moneda de pantalla (USD, EUR) para "Valores ajustados por inflación". El criterio (deflactor del PBI y no IPC;
// año base = el último de la serie; cada ejercicio usa el año en que cierra; un ejercicio posterior al año base no se ajusta):
// Admin/ARQUITECTURA.md, "Monedas y tipo de cambio". El objeto lo GENERA `node tools/fetch-fx-reference.mjs --deflactores` (una vez
// por año); esta cabecera se conserva.

window.DEFLACTORES = {
  USD: {
    nombre: 'deflactor del PBI de EE.UU.',
    fuente: 'BEA, vía FRED (A191RD3A086NBEA), índice 2017 = 100',
    valores: {
      1995: 66.939, 1996: 68.164, 1997: 69.340, 1998: 70.119, 1999: 71.111, 2000: 72.722,
      2001: 74.360, 2002: 75.515, 2003: 77.006, 2004: 79.077, 2005: 81.556, 2006: 84.071,
      2007: 86.349, 2008: 88.013, 2009: 88.556, 2010: 89.632, 2011: 91.481, 2012: 93.185,
      2013: 94.771, 2014: 96.421, 2015: 97.316, 2016: 98.241, 2017: 100.000, 2018: 102.291,
      2019: 103.979, 2020: 105.377, 2021: 110.159, 2022: 118.026, 2023: 122.451, 2024: 125.587,
      2025: 128.893,
    },
  },
  EUR: {
    nombre: 'deflactor del PBI de la zona euro',
    fuente: 'Eurostat (nama_10_gdp, EA20, PD15_EUR), índice 2015 = 100',
    valores: {
      1995: 72.901, 1996: 74.752, 1997: 74.584, 1998: 75.386, 1999: 76.631, 2000: 77.708,
      2001: 79.663, 2002: 81.655, 2003: 83.479, 2004: 85.108, 2005: 86.757, 2006: 88.525,
      2007: 90.728, 2008: 92.638, 2009: 93.584, 2010: 94.258, 2011: 95.308, 2012: 96.522,
      2013: 97.720, 2014: 98.635, 2015: 100.000, 2016: 100.912, 2017: 102.063, 2018: 103.620,
      2019: 105.377, 2020: 107.317, 2021: 109.566, 2022: 115.137, 2023: 122.348, 2024: 125.867,
      2025: 128.841,
    },
  },
};
