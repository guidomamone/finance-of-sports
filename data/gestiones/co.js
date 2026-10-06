// ============================================================================
// data/gestiones/co.js: quién condujo cada club de Colombia y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'junior-co': [
    // Antonio Char asumió de nuevo a principios de 2025 (la prensa lo anunció el 18/1/2025 "desde el lunes"): 20/1/2025 es aproximada.
    // Presidió antes 2016-12 a 2020-12 (reemplazado por Alejandro Arteta el 21/12/2020); ese tramo no hace falta para los años cargados.
    { nombre:'Antonio Char Chaljub', corto:'Char', cargo:'Presidente', desde:'2025-01-20', hasta:null,
      fuente:'https://www.colombia.com/futbol/futbol-colombiano/junior-confirmo-el-cambio-de-mandatario-para-la-siguiente-temporada-502108', confirmada:true },
  ],
  'atlnacional-co': [
    // Cargo: Presidente (representante legal). El dueño es la Organización Ardila Lulle, una sociedad sin dueño persona: no se carga como gestión.
    { nombre:'Sebastián Arango Botero', corto:'Arango', cargo:'Presidente', desde:'2024-05-01', hasta:null,
      fuente:'https://www.futbolred.com/futbol-colombiano/liga-betplay/sebastian-arango-botero-es-nuevo-presidente-de-atletico-nacional-208523', confirmada:true },
  ],
  'americadecali-co': [
    // Marcela Gómez Giraldo (hija del accionista mayoritario Tulio Gómez) es la presidente y firma como representante legal; Tulio Gómez no ejerce el cargo.
    { nombre:'Marcela Gómez Giraldo', corto:'Gómez', cargo:'Presidente', desde:'2024-01-04', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Am%C3%A9rica_de_Cali', confirmada:true },
  ],
  'depcali-co': [
    // Tinoco: la nueva junta directiva se oficializó el 19-20/11/2025 (las fuentes difieren por un día); renunció el 21/4/2026 y asumió Joaquín Losada Fina (fecha de relevo aproximada).
    { nombre:'Rafael Tinoco Kipps', corto:'Tinoco', cargo:'Presidente', desde:'2025-11-20', hasta:'2026-04-21',
      fuente:'https://www.publimetro.co/deportes/2025/11/20/deportivo-cali-tiene-nuevo-presidente-y-tan-pronto-llego-hizo-una-fuerte-advertencia/', confirmada:true },
    { nombre:'Joaquín Losada Fina', corto:'Losada', cargo:'Presidente', desde:'2026-04-21', hasta:null,
      fuente:'https://www.elpais.com.co/deportes/joaquin-losada-fina-asume-la-presidencia-de-la-junta-directiva-del-deportivo-cali-conozca-los-detalles-2100.html', confirmada:true },
  ],
});
