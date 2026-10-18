# Cierre de la rama datos-sourcing (worktree fos-datos), sesión Datos 2

Lo que la principal pasa a TODO, CHANGELOG y ESTADO al mergear. Se va completando mientras la sesión trabaja.

## Qué cambió (CHANGELOG)

- **273 (c): AVS 2021 y 2023 con liga.** Son la misma sociedad que UD Vilafranquense – Futebol, SAD (NIPC 510 779 301 en los tres
  balances; cambió de nombre en 2023), así que van a Liga Portugal 2, donde la lista los nombra "Vilafranquense". Alias
  "Vilafranquense" → avs-pt en `alias.json`; ligas con evidencia en `Admin/carga-clubes/avs-pt.md`; estadio y marca de los dos años en
  `data/contexto/pt.js` (el sponsor sigue faltando). ASSET_V 1303.
- **273 (b): `tools/generate-sponsors.js` suma lo que no salió de la página de temporada** (cargado a mano o de la página del club):
  lo lee de `data/contexto/<iso>.js` (campos en `manual` o en `club`), lo pone en la liga y temporada de ese ejercicio con su fuente como
  6º elemento de la entrada, y reemplaza lo que la tabla de la temporada decía de ese club y rol. Hoy no cambia nada: todavía no hay
  sponsor ni marca a mano.
- **273 (a): `tools/estadio-sponsor.mjs --camisetas`** (el diseño que aprobó Guido). Para los clubes con algún ejercicio sin sponsor o
  sin marca: la página del club es la que ENLAZA la página de temporada en la fila del club (no una búsqueda por nombre), y la del país
  sale del enlace entre idiomas; tiene que tener la ficha de club. Lee la tabla "Período | Marca | Sponsor" (también dos tablas
  separadas, como Almagro). Compuerta del rango: el valor vale solo si todas las lecturas posibles del período dan el mismo (filas de
  temporadas "2008/09" sin dudas; filas de años en un club de temporada partida: si la tabla encadena con el mismo año en el borde, hasta
  la temporada que termina ese año; si no, las dos lecturas); celda vacía, dos valores distintos, "ninguno", o inglés y país distintos:
  nada. Solo completa sponsor y marca que falten; la fuente va en `club: { campo: permalink }`, y `js/contexto.js` la muestra. Caché:
  `tools/club-league-reference/contexto/_clubes.json`. ASSET_V 1304.
  **Ensayo (sin escribir datos todavía):** 46 ejercicios completados; los ejercicios sin estadio o sin sponsor pasan de 150 a 112
  (con lo nuevo: sponsor 89%, marca 93% de 1001 ejercicios). Lo que no dio: 49 sin tabla de camisetas en la página, 21 sin enlace al club desde la
  temporada, 7 página sin ficha, unos 10 ambiguos o con celda vacía. Falta el ok de Guido a la muestra para `--escribir`.
- **252: Unión Magdalena con canal** ("Página del canal": SIIS, por NIT). `tools/ejercicios-nuevos.mjs` reconoce un ejercicio POSTERIOR
  ya bajado (un PDF de estados financieros de la carpeta con un año más nuevo que el esperado; no presupuestos ni informes): Unión
  Magdalena pasa de "a revisar 2019" (nunca depositado en SIIS) a "ya en su carpeta, sin cargar: 2025". Medido en todos los clubes: solo
  cambia ese.
- **252: los canales que el script no lee, revisados con el navegador.** Instituto 2024-25: la nota de la asamblea (25/08/2025) ahora
  trae Memoria, Balance General e Informe de la Revisora en Drive (anotados en la nota, sin bajar). Todavía no publicado: Ituano 2025 (la
  FPF no lo tiene en 2025), Monza 2025 (el sitio llega hasta el bilancio 2024), Salernitana 2024 (el club sacó la sección de bilanci;
  Wayback del CDN sin nada nuevo), Alianza Lima 2025 (certificado TLS vencido; 8 nombres de archivo probados, 404). Almagro: el dominio
  no resuelve. Newell's: el link es un análisis de hinchas del 23-24, no el balance (y el que falta es el 2020). River: el documento
  siguiente ya está en la carpeta (cierre 31/12/2025, con la duda del período ya anotada). La instrucción de la FPF en el script estaba
  vieja: la página es `/A-Federacao/Financas.aspx` y el handler `/Handlers/Institucional/ListaFinanca.ashx`.

## Qué queda (TODO)

- 273 (a): con el ok de Guido a la muestra, `node tools/estadio-sponsor.mjs --escribir` (lee la caché, no baja nada) y
  `node tools/generate-sponsors.js`. Lo que no sale (≈112 ejercicios, casi todos sin sponsor: Ferroviária, Novorizontino, Goiás, AEL,
  rusos y belgas de ascenso), a mano en `tools/contexto-manual.json` con fuente.
- 273 (a), mejoras posibles medidas en el ensayo: 21 ejercicios sin enlace al club desde la página de temporada (el nombre de la fila no
  pega con el del sitio); Goiás y otros con camisetas solo en plantillas `{{CamisaFutebol}}`, sin tabla.
- 273 (b): la pantalla de sponsor (`js/sponsor.js`, fos-pantallas) todavía no muestra la fuente propia de una entrada (6º elemento).
- 252: bajar los 3 documentos de Instituto 2024-25 (comando en el mensaje a Guido) y onboardearlos. Gladbach y Stuttgart en el
  Unternehmensregister piden enviar el formulario de búsqueda: con el ok de Guido. River: el script no reconoce como "ya bajado" un
  documento cuyo cierre cambió de fecha (agosto → diciembre).

## Qué deja de ser cierto en ESTADO

- "Estadio, capacidad, sponsor…": suma la página del club como tercera fuente para sponsor y marca (`--camisetas`, caché
  `_clubes.json`), cuando se escriba.
