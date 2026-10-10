// ============================================================================
// data/gestiones/gr.js: quién condujo cada club de Grecia y desde/hasta cuándo (to-do 195).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre
// (AEK, Panathinaikos, AEL, OFI); donde hay dos dueños sin uno que conduzca (Asteras) o el dueño no
// aparece y quien conduce es el presidente del directorio (Levadiakos, Volos, Panserraikos), se carga el
// presidente que firma el balance. Cuando la fuente da solo el año o el mes, el día es 01 por convención
// (se avisa en el comentario de la gestión). Los cierres son el 30/6.
// Presidentes formales de Panathinaikos mientras Alafouzos seguía de dueño (Wikipedia, List of Panathinaikos
// F.C. presidents): Mavrokoukoulakis 21/4/2017 al 29/9/2017, Konstantinou 29/9/2017 al 25/2/2019, Mavrokoukoulakis
// 25/2/2019 al 11/7/2022. Quedan fuera por el criterio del dueño; los balances 2017 a 2022 los firman ellos.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'aekathens-gr': [
    // Melissanidis: dueño de hecho desde que volvió al club como administrador (7/6/2013, tras el descenso administrativo) hasta julio de 2024, cuando
    // traspasó la conducción y las acciones a Iliopoulos (en.wikipedia da solo el mes: dia 01). Evangelos Aslanidis es el presidente del directorio que firma
    // los balances 2016 a 2025 (Presidente del Consejo desde julio de 2014), pero no es el dueño: no se carga (criterio de la cabecera de ar.js).
    { nombre:'Dimitris Melissanidis', corto:'Melissanidis', cargo:'Presidente', desde:'2013-06-07', hasta:'2024-07-01',
      fuente:'https://en.wikipedia.org/wiki/Dimitris_Melissanidis', confirmada:true },
    // Iliopoulos: armador, nuevo dueño de la PAE AEK (presentado por Melissanidis en junio de 2024; traspaso en julio). Dia 01 aproximado.
    { nombre:'Marios Iliopoulos', corto:'Iliopoulos', cargo:'Presidente', desde:'2024-07-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Dimitris_Melissanidis', confirmada:true },
  ],
  'panathinaikos-gr': [
    // Alafouzos: dueño desde que la Alianza Panathinaikos tomó el control (julio de 2012) y presidente electo el 25/9/2012; fue presidente formal hasta el 21/4/2017
    // y desde el 11/7/2022; entre medio fue el dueño y financista mientras presidían Mavrokoukoulakis y Konstantinou (ver cabecera). Sigue de dueño.
    { nombre:'Giannis Alafouzos', corto:'Alafouzos', cargo:'Presidente', desde:'2012-09-25', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/List_of_Panathinaikos_F.C._presidents', confirmada:true },
  ],
  'aellarissa-gr': [
    // Kougias: compró la mayoría en julio de 2015 (en.wikipedia, mes sin día: 01) y conduce hasta junio de 2022, cuando anunció su salida y la cesión de las acciones a
    // Achilleas Ntavelis (el.wikipedia da solo el mes: 01). Entre 2016 y 2020 firmaron los balances Liontos (2016, 2017) y Markou (2018, 2019) como presidentes del directorio;
    // quedan fuera por el criterio del dueño.
    { nombre:'Alexis Kougias', corto:'Kougias', cargo:'Presidente', desde:'2015-07-01', hasta:'2022-06-01',
      fuente:'https://el.wikipedia.org/wiki/%CE%91.%CE%95.%CE%9B._(%CF%80%CE%BF%CE%B4%CF%8C%CF%83%CF%86%CE%B1%CE%B9%CF%81%CE%BF_%CE%B1%CE%BD%CE%B4%CF%81%CF%8E%CE%BD)', confirmada:true },
    // Achilleas Ntavelis: dueño y presidente (firma los balances 2022 a 2024). Hasta el 9/7/2026, cuando Zisis Stylianos se presentó como nuevo dueño
    // (Skai, 9/7/2026). Su hermano Ioannis firma el balance 2025 como presidente del directorio.
    { nombre:'Achilleas Ntavelis', corto:'Ntavelis', cargo:'Presidente', desde:'2022-06-01', hasta:'2026-07-09',
      fuente:'https://www.skai.gr/news/sports/episima-se-nea-epoxi-me-idioktiti-ton-styliano-i-ael', confirmada:true },
  ],
  'asterastripolis-gr': [
    // Borovilos: presidente del directorio y director ejecutivo (firma los balances 2019 a 2025); los dueños son dos (Bakos y Kaimenakis), sin uno que conduzca.
    // No se encontró la fecha en que asumió: la primera en que la prensa lo nombra presidente es el 4/10/2013 (Neos Kosmos, comunicado por la salida de Tsiolis). Asumió antes.
    { nombre:'Giorgos Borovilos', corto:'Borovilos', cargo:'Presidente', desde:'2013-10-04', hasta:null,
      fuente:'https://neoskosmos.com/el/2013/10/04/sport/football/%CF%84%CE%AD%CE%BB%CE%BF%CF%82-%CE%BF-%CF%84%CF%83%CE%B9%CF%8E%CE%BB%CE%B7%CF%82-%CE%B1%CF%80%CF%8C-%CE%B1%CF%83%CF%84%CE%AD%CF%81%CE%B1/', confirmada:true },
  ],
  'levadiakos-gr': [
    // Pantiskos: presidente del directorio y director ejecutivo desde diciembre de 2016 (fuente secundaria, sin día: 01); firma los balances 2019 a 2025.
    // Los dueños son los Kolokythas (Andreas 59,93%, Konstantinos 10,60%), que no conducen. En 2026 el sitio del club ya muestra a Aikaterini Kompoti de presidente y a Pantiskos de director ejecutivo (sin fecha).
    { nombre:'Dimitrios Pantiskos', corto:'Pantiskos', cargo:'Presidente', desde:'2016-12-01', hasta:null,
      fuente:'https://grokipedia.com/page/Levadiakos_F.C.', confirmada:true },
  ],
  'oficrete-gr': [
    // Bousis: aprobado como mayor accionista el 4/10/2018 y asumió la presidencia el 10/10/2018 (en.wikipedia). Dueño y presidente; los balances los firma en su nombre el vicepresidente primero.
    // Antes (ejercicio 2018) no se encontró quién presidía.
    { nombre:'Michalis Bousis', corto:'Bousis', cargo:'Presidente', desde:'2018-10-10', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/OFI_Crete_F.C.', confirmada:true },
  ],
  'panserraikos-gr': [
    // Kazias: dueño y presidente (firma los balances 2022 a 2025). La PAE se constituyó el 22/7/2020 (primer ejercicio 22/7/2020 a 30/6/2021); la primera fecha documentada con
    // él como presidente es el informe del directorio del 2/12/2021. Asumió antes: no se encontró la fecha exacta.
    { nombre:'Anastasios Kazias', corto:'Kazias', cargo:'Presidente', desde:'2021-12-02', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Panserraikos_F.C.', confirmada:true },
  ],
  'volosnfc-gr': [
    // Beos: alcalde de Volos; asumió la presidencia el 24/7/2020 al frente de la administración provisoria que designó el tribunal (Ethnos) y firma los balances 2021 a 2023.
    // La PAE anunció el 14/7/2021 que seguiría presidiendo hasta junio de 2024: hasta = 1/7/2024 (aproximado).
    { nombre:'Achilleas Beos', corto:'Beos', cargo:'Presidente', desde:'2020-07-24', hasta:'2024-07-01',
      fuente:'https://www.ethnos.gr/sports/article/116868/oaxilleasmpeosepestrepsestopodosfairoanalambaneithnproedriatoyboloy', confirmada:true },
    // Spyridopoulos: ya era director ejecutivo en 2019 (firmaba los balances 2019 y 2020 como tal); desde 2024 firma como "Presidente y Director Ejecutivo". La fecha del cambio no se encontró:
    // desde = 1/7/2024 (aproximado, fin del mandato de Beos). `firmo:[2024]`: el balance al 30/6/2024 lo firma él como presidente (17/12/2024).
    { nombre:'Giorgos Spyridopoulos', corto:'Spyridopoulos', cargo:'Presidente', desde:'2024-07-01', hasta:null, firmo:[2024],
      fuente:'https://en.wikipedia.org/wiki/Volos_F.C.', confirmada:true },
  ],
});
