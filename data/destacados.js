// Los rankings de la vidriera de Inicio: hasta 10 pares (liga, ejercicio), elegidos a mano (es un criterio editorial, no un umbral).
// Se edita a mano; audit.js avisa si una entrada no tiene su ranking (destacado-sin-ranking). El ejercicio va siempre en la entrada (el
// más reciente casi nunca es el de más clubes). El orden del array es el orden en pantalla.
window.DESTACADOS = [
  // J1: todos los clubes de la misma fuente y el mismo ejercicio: el ranking más limpio, aunque el que menos desglosa.
  { league:'jp-j1',      year:2025 },
  // Incluye a Real Madrid y Barcelona: el ranking que le dice a un visitante nuevo que acá hay clubes que conoce.
  { league:'es-laliga',  year:2025 },
  // El ejercicio con más clubes argentinos cargados.
  { league:'ar-primera', year:2024 },
  // Pocos clubes, y entra a propósito: muestra que hay segunda división cargada. Sin tamaño verificado: "N clubes cargados", no "N de M".
  { league:'br-serieB',  year:2024 },
];
