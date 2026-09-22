// ============================================================================
// data/destacados.js — QUÉ RANKINGS MUESTRA INICIO. Lista CURADA A MANO.
//
// Decisión de Guido (2026-09-22, to-dos 23(c) y 33): Inicio abre con la pregunta
// ("ver un club" / "comparar") y abajo lleva rankings de liga, "como para mostrar
// de qué es capaz y qué tiene la página". Hasta 10, y **se eligen
// discrecionalmente**: no hay una regla automática del tipo "las ligas con más de
// N clubes cargados".
//
// POR QUÉ A MANO Y NO POR UNA REGLA. Una regla automática elige por cantidad, y
// lo que hace buena a una vidriera no es la cantidad: la J1 2025 son 10 clubes de
// la misma fuente y el mismo ejercicio, y es el mejor ranking que tiene el sitio;
// el Brasileirão Série B 2024 son 3 clubes y entra igual porque muestra que hay
// segunda división cargada. Un ranking de 1 club no es un ranking, pero esa
// frontera es un criterio editorial, no un umbral.
//
// ESTE ARCHIVO ES DE EDICIÓN MANUAL: ningún generador lo toca. Lo que SÍ está
// automatizado es que no pueda mentir — `node tools/audit.js` chequea, por cada
// entrada, que exista el ranking precalculado correspondiente en
// `data/rankings/<liga>.js` (`destacado-sin-ranking`, P1). Así, el día que se
// borre un club o cambie una membresía, el bloque roto se avisa solo en vez de
// dibujar un ranking de 1 en la portada.
//
// EL EJERCICIO ES PARTE DE LA ENTRADA, no se elige solo. Un ranking es (liga,
// EJERCICIO) y el más reciente casi nunca es el mejor: los balances tardan en
// publicarse, así que el último ejercicio es siempre el más flaco. Hoy la Primera
// argentina tiene 8 clubes en 2024 y 5 en 2025, y va 2024.
//
// EL ORDEN DE ESTE ARRAY ES EL ORDEN EN PANTALLA.
// ============================================================================
window.DESTACADOS = [
  // Los 10 clubes de la J1 con el mismo ejercicio, la misma moneda y la misma
  // fuente (el informe de licencias de la J.League). Es el ranking más limpio que
  // tiene el sitio, y por eso va primero — aunque sea también el que menos
  // desglosa: la J.League publica total, patrocinio y recaudación por club, y el
  // resto solo por división.
  { league:'jp-j1',      year:2025 },
  // 9 de 20, pero incluye a Real Madrid y Barcelona: es el ranking que le dice a
  // un visitante nuevo que acá hay clubes que conoce.
  { league:'es-laliga',  year:2025 },
  // 8 de 28, el ejercicio con más clubes argentinos cargados. 2025 tiene 5.
  { league:'ar-primera', year:2024 },
  // 3 clubes, y entra a propósito: es lo único que muestra que el sitio tiene
  // segunda división cargada. Su temporada no tiene tamaño verificado, así que la
  // vista dice "3 clubes cargados" y NO "3 de N".
  { league:'br-serieB',  year:2024 },
];
