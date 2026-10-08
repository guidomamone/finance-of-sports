# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión
por versión, desde la Versión 300 hasta hoy. **Las Versiones 10 a 299 (desde que el sitio pasó de ser solo de
Boca a multi-club) están en `Admin/Archive/CHANGELOG-v010-v299.md`: si buscás una versión menor a la 300, buscá ahí.** Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `Admin/finance-of-sports-project.md`. Para el
estado actual del proyecto (qué hay armado, qué es real vs. placeholder por club) ver
`Admin/ESTADO.md`, y para la to-do list vigente, `Admin/TODO.md` — hasta la Versión 137
las dos cosas vivían en un comentario HTML al principio de `index.html`.

**Las rutas que aparecen DENTRO de cada entrada son las de su época.** La Versión 196 mudó
los documentos internos a `Admin/` y no reescribió el historial: una entrada de septiembre
que dice `ESTADO.md` era verdad ese día.

---

## Versión 600 — Sourcing: recuperación de Vojvodina, Marítimo completo, fichas de WorldFootball reintentadas (2026-10-08)

- Solo sourcing, sin transcribir ni cargar. **Vojvodina (Serbia)**: carpeta recuperada con Wayback (`web/<ts>id_/`, eligiendo capturas completas: las más nuevas venían truncadas a 1 MiB): ejercicios 2019, 2020, 2022, 2023 y 2024 en disco. **Falta 2025** (`Zavrsni-racun-FKV-2025_260521_170537.pdf`): el sitio da timeout desde esta IP, Wayback no lo tiene y Firecrawl solo devuelve texto; reintentar desde otra red. Regla ya conocida y repetida: nunca borrar una carpeta de `Clubes/` sin mirar antes si ya existía (los PDF no se trackean, no hay `git checkout`).
- **Marítimo (Portugal)**: SAD 2021, 2022 y 2023 y Club Sport Marítimo (asociación) 2020/21 a 2024/25, todo de Wayback; con 2024 y 2025 de la SAD que ya estaban, quedan ambas entidades completas 2021-2025.
- **Ligue 2 / DNCG 2023/24**: no había nada que buscar. El PDF de 24 págs. que ya estaba en disco (`dncg-comptes-individuels-ligue1-2023-24.pdf`, idéntico a `lfp.fr/assets/comptes_clubs_24_7ff73eb7c6.pdf`) trae también la sección LIGUE 2 desde la pág. 13. Nota corregida en `fuentes/Francia/_notas-generales.md`.
- **SIIS Colombia, 2021 GRUPO 2** (Jaguares, Unión Magdalena, Bogotá Piratas): confirmado no recuperable. El HTML del subvisor trae `1%%r%v01!.PDF` y el servidor responde 500 a toda codificación de `%`; el JS del propio visor solo escapa el primer `%`. Habría que pedirlo al club o a Supersociedades.
- **WorldFootball**: las 35 fichas que daban página de error se leyeron con Firecrawl `proxy: stealth` (30 de 35 resolvieron; siguen con error los ids 1832 Floridsdorfer AC, 48, 835, 807 de Inglaterra y 2392 de Portugal; varios de los resueltos no tienen PDF en la ficha). 60 PDF nuevos de 22 clubes (18 duplicados descartados); carpetas renombradas a la convención de `fuentes/` (AS Monaco bajo Francia, RC Strasbourg Alsace, Toulouse FC).
- **Companies House, cuentas pequeñas**: las 1.174 son escaneos; OCR de las 2 más recientes de cada uno de 111 clubes (206 PDF): 43 con señal de cuenta de resultados, listados en `fuentes/Inglaterra/_notas-generales.md`.
- Austria y Alemania: los «NO» del índice de países son clubes cubiertos por la publicación de la liga (Bundesliga `Klub-JA` 2017/18-2024/25 y DFL Finanzkennzahlen hasta GJ2024); no hay nada pendiente de club. `fuentes/README.md` regenerado (1.231 clubes, 924 con documento).
- Sin tocar skills.

## Versión 599 — Sourcing del año 2023 (fútbol, sin Italia): barridos por canal, clubes nuevos y un país nuevo (2026-10-08)

- Sesión de solo sourcing (sin transcribir ni cargar nada; todo queda en `Clubes/` y en `fuentes/`). Primero se midió qué había en disco: el ejercicio 2022/23 ya estaba en casi todos los países con canal; los huecos reales eran clubes sin nada de ese año, clubes nuevos y series cortas. Resultado: ~4.800 archivos nuevos (sin Italia) y ~190 fichas nuevas o ampliadas en `fuentes/`, todas con la línea `**Ángulos**`; `fuentes/README.md` regenerado (79 países, 1.222 clubes, 915 con documento).
- **Colombia**: se enumeró SIIS por CIIU (454 registros) y se bajó todo lo que faltaba: de ~100 a 316 estados financieros (series 2016-2025). **Independiente Medellín dejó de ser dead-end**: su sociedad es *El Equipo del Pueblo S.A.* (NIT 900577148). Clubes nuevos: Patriotas, Deportes Quindío, Real Soacha/Valledupar, Real Sincelejo. 2021 "GRUPO 2" de 3 clubes devuelve 500 del servidor (`%%` en el nombre).
- **Turquía**: Kasımpaşa 2021-2024, Başakşehir 2018 y 2020-2024, Karagümrük (corregido: el PDF "2021-2022" era el 2020) y Kocaelispor. **Noruega**: Lillestrøm 2018-2025 (las Årsberetning traen el årsregnskap), Bodø/Glimt 2019-2022 (segunda entidad), KFUM sin publicar (candidato a mail); 11 clubes nuevos (Odd, Strømsgodset, Haugesund, Stabæk, Sogndal, Lyn, Moss, Hødd, Raufoss, Åsane, Arendal). **Croacia**: Dinamo Zagreb 2023 y 2025 consolidados y no consolidados 2020-2025; Hrvatski dragovoljac y Vukovar nuevos documentos.
- **Reino Unido**: 11 clubes de divisiones bajas con 2022/23 (solo Bristol Rovers, Bradford City y Leyton Orient traen cuenta de resultados); barrido `--all` de Companies House sobre ~90 clubes; clubes nuevos de Inglaterra (Forest Green, Morecambe, Oldham, Sutton, Rochdale, Hartlepool, Scunthorpe, Southend, Dagenham y 19 de la National League), Escocia (18) y Gales (Connah's Quay).
- **Suecia (país nuevo)**: 18 clubes (AIK, Malmö FF, Djurgården, IFK Göteborg, Norrköping, Kalmar, Sirius, Elfsborg, Hammarby...) con årsredovisning de 2004 a 2025 según el club, más los informes de economía de la liga. **Finlandia (país nuevo)**: HJK, SJK, Haka, AC Oulu, KuPS, Lahti. **Chipre (país nuevo)**: Omonia, Pafos, APOEL y otros desde WorldFootball.
- **Dinamarca**: AaB (55 depósitos), Lyngby, AC Horsens, Esbjerg, Hobro, Vendsyssel, Helsingør, Hvidovre, Kolding, Næstved. **Países Bajos**: Willem II, RKC, FC Emmen, Cambuur, Dordrecht, Den Bosch, De Graafschap, ADO Den Haag, Roda JC (informes F.04). **Bélgica**: Lommel, Beerschot, RWDM, Patro Eisden, Lierse, Lokeren-Temse. **Portugal**: Arouca, Vizela, Marítimo, Portimonense, Belenenses, Leixões, União de Leiria, Mafra. **España**: Leganés, Deportivo, Zaragoza, Valladolid, Las Palmas, Córdoba, Tenerife y Cultural Leonesa; Real Sociedad sí publica cuentas (corrige la nota "gateadas"). **Alemania**: Schalke, Hertha, Braunschweig. **Polonia**: 12 clubes (ŁKS, Ruch, Odra, Miedź, Termalica, Warta, Stomil, Stal Rzeszów...). **República Checa**: 12 clubes de la FNL por `or.justice.cz`. **Eslovaquia**: Dukla Banská Bystrica, Skalica, Košice, Petržalka, Liptovský Mikuláš. **Brasil, Chile, Perú, Uruguay, Hungría, Rumania, Bosnia, Serbia, Montenegro**: hallazgos sueltos hallados con Exa (ver sus fichas).
- **WorldFootball (`worldfootball.com/financials`)**: portal con ficha financiera por club y espejo de los informes oficiales; se leyó con Firecrawl (445 fichas, 22 países, sin Italia) y se bajaron ~720 PDF sin duplicar. Hallazgos: **DFL Bundesliga/2. Bundesliga hasta FY2025**, J.League kessan 2022-2023, Bundesliga austríaca (Klub-JA 2022-2023), informes de economía de la Allsvenskan/Superettan, y los **comptes individuels de la Ligue 1 2023/24** que faltaban de la DNCG (la Ligue 2 sigue pendiente). 35 fichas del sitio devuelven página de error.
- **Corea del Sur**: sin novedades (códigos de DART 00699354 y 00544018; el buscador por `curl` no sirve).
- Herramientas de la sesión (scripts de scratchpad, no entraron al repo): descargador SIIS de 3 pasos, `cdxdl` (Wayback por dominio con reintentos de capturas y doble codificación de `%`), `czj` (Sbírka listin), `sk_dl` (registeruz.sk), `exa_auto`, `harvest`, `wf_scrape`/`wf_download`. Gotchas nuevos: el CDX devuelve URLs con espacios literales; Wayback pide `%2520` para algunas URLs; el PDF de la BNB belga exige `Accept: */*`; Companies House da 403 si se lanzan varios barridos en paralelo; `cvrapi.dk` bloquea por cuota (se reemplazó por proff.dk vía búsqueda).
- Sin tocar skills (queda por decidir con Guido cambiar el texto de Colombia/Independiente Medellín, España/Real Sociedad, Suecia/Finlandia y las páginas de WorldFootball en `club-sourcing`).

## Versión 598 — El CHANGELOG se parte una vez, por época (to-do 178) (2026-10-08)

- `Admin/CHANGELOG.md` (724 KB, 7.139 líneas, con las Versiones 217-597 de la más nueva a la más vieja y las 10-216 al revés) se parte en dos:
  las Versiones 10 a 299 pasan, ordenadas de la más nueva a la más vieja, a `Admin/Archive/CHANGELOG-v010-v299.md` (445 KB, 274 entradas); aquí
  quedan la 300 en adelante (279 KB, 298 entradas). La cabecera dice dónde está lo anterior. Decisión de Guido: un solo corte por época, no
  rangos. El comentario de `tools/audit.js` sobre partir archivos pesados dice ahora por qué se hizo.

## Versión 597 — Atalanta 2018 y 2023 cargados (2026-10-08)

- Atalanta 2018 (calendario, ene-dic) y 2023 (jul 2022 a jun 2023), consolidados, por el pipeline (lote 39; etapa 2 US$ 1,05, etapas 3-5 US$ 1,13) sin
  ajustes. 2018: ingresos 155.740.626, gastos 120.096.113, resultado 23.958.355. 2023: ingresos 195.386.565, gastos 185.639.201, resultado 5.616.433.
  Dos dudas de la cola respondidas "no" (Guido): el desglose de Oneri diversi 2018 (las filas suman 6.226.604, el total de la nota 6.408.220 y el
  estado 6.444.735: el documento no cuadra) y el de Salari-stipendi 2023 (solo la columna Tesserati: desglose parcial). Auditoría P0 0, P1 0.

## Versión 596 — Parma 2018/19 cargado (2026-10-08)

- Parma 30.06.2019 (individual, jul 2018 a jun 2019; la portada dice por errata "01.07.2019 – 30.06.2019") cargado por el pipeline sin ajustes (lote 39,
  US$ 0,28 de localizar y extraer): ingresos 60.242.772, gastos 68.442.675, resultado −9.423.000. Auditoría P0 0, P1 0. Etiqueta en el sitio:
  "2019" (Parma tiene fiscalYearStart 01-01; to-do 177, no se toca).

## Versión 595 — Atalanta 2022 fuera (ejercicio de 6 meses); lote 39 (2026-10-08)

- Decisión de Guido: un ejercicio de menos de 12 meses no se muestra. Atalanta 2022 (1/1 al 30/6/2022, cambio de cierre) sale de
  `data/atalanta-it-data.js` y `data/club-leagues/it.js`; ese PDF y los dos de Parma sep-dic 2020 (4 meses) van a
  `Admin/documentos-descartados.txt`. Generados regenerados, `ASSET_V` 517, auditoría P0 0 y P1 0.
- Lote 39 (etapa 2): Atalanta 2018 y 2023 y Parma 30.06.2019 individual, para armarlos por fuera del script. La etiqueta de los clubes con cambio
  de cierre no se toca (to-do 177).

## Versión 594 — Napoli 2022 cargado (2026-10-08)

- Napoli 2022 cargado tras el lote 38 (etapa 7: 72 rubros, US$ 0,05) con `cargar.mjs --desde-verificacion --escribir`: ingresos 175.995.109,
  gastos 241.171.517, resultado −51.951.202 exacto. Auditoría P0 0, P1 0.

## Versión 593 — Napoli 2021 cargado (2026-10-08)

- Napoli 2021 (`Napoli-bilancio-2021.pdf`) cargado con `cargar.mjs --desde-verificacion --escribir`, sin ajustes: ingresos 228.097.847, gastos
  306.643.672, resultado −58.941.765 exacto (lectura 4, Versión 592). Auditoría P0 0, P1 0. Napoli 2022 queda para el lote con la etapa 7 (`Admin/lote-38.txt`).
- To-do 169 medido: sus 9 documentos ya están cargados y cierran con ajustes; pasa a "conocido, sin daño hoy".

## Versión 592 — El resultado impreso en una tabla de una fila, pegada al estado (to-do 168, primera parte) (2026-10-08)

- `verificar.mjs`, escalón 2 del resultado impreso (Versión 415): además de PREJUÍZO / SUPERÁVIT, reconoce "UTILE (PERDITA) DELL'ESERCIZIO" con el
  signo del importe impreso, y `ANTES_RE` reconoce "prima delle imposte". La compuerta no cambia: alguna lectura tiene que cerrar exacto.
- Caso: Napoli 2021 (resultado en L299, b14, fuera del estado b12-b13) y 2022 (L309, b15). Antes quedaban "ok" sin resultado impreso; 2022 con
  gastos 483,2 M (el doble). Ahora cierran por la lectura 4 con el resultado exacto (2021: gastos 306.643.672, resultado −58.941.765;
  2022: gastos 241.171.517, resultado −51.951.202). Medido sobre los 163 documentos de Generados/: cambian solo esos dos. Ensayo de
  `cargar.mjs`: 2021 carga; 2022 frena por categorización (falta `.categorias.json`; "Valore di realizzo" y "Sell on Fee" sin categoría).

## Versión 591 — Lazio 2007-08 y 2011-12 resueltos a mano; tools/estado-desde-md.mjs (2026-10-08)

- Decisión de Guido: documentos viejos, a mano y no con un cambio de script (to-do 167). 2007-08: sin las filas de las notas en miles
  (b197, b204, b211) en el .filas.json y TOTALE COSTI OPERATIVI fuera por ajuste; cierra 102.482.030 − 68.609.526 − 4.962.375 −
  15.148.258 = 13.761.871 vs 13.761.874. 2011-12: filas del estado armadas desde el .md (la extracción solo trajo subtotales) con
  `tools/estado-desde-md.mjs` (nuevo, uso a mano, gratis), TOTALE RICAVI / TOTALE COSTI OPERATIVI fuera, 2 ajustes viejos anulados; cierra
  exacto (4.221.554). Falsas alarmas del año vecino aceptadas en la cola con la explicación. Lote 37 (categorización, US$ 0,05):
  los dos cargados (auditoría P0 0, P1 0).

## Versión 590 — El signo del 17-bis lo eligen las sumas (to-do 166, segunda parte) (2026-10-08)

- `verificar.mjs`, escalón "17) resta": si la suma no da el total de C impreso, se prueban los signos de las filas del 17-bis (hasta 4) y se
  usa la única combinación que da exacto el total de C. Sin etiquetas: Napoli 2024 ("b) perdite su cambi" 4.559 impreso en positivo,
  17bis impreso (4.529)) y Atalanta 2019 (el 17-bis de 923 metido dentro del "Totale 17)").
- Medido: con los ajustes, 0 de 162 cambian; sin ellos, Atalanta 2019 y Napoli 2023/2024 dan idéntico (4 ajustes anulados, cargas
  idénticas). Napoli 2022 (sin cargar, to-do 167) sigue con su ajuste.

## Versión 589 — Escalón "sección D" en verificar.mjs (to-do 166, primera parte) (2026-10-08)

- Las rettifiche di valore (D del Codice Civile) llegaban sin lado: la lectura 3 las sumaba como ingreso/gasto o la tolerancia las tapaba
  (Como 2024 y Bologna 2019-20 daban "ok" sin ellas). Con el encabezado de la D impreso (italiano o inglés) y sin ajuste del financiero en
  esa zona, las filas sin lado de la D van al financiero (18) suma, 19) resta, por el encabezado del .md); compuerta: el total de D impreso
  exacto; después las lecturas 0-6, gana la primera que cierra exacto. El gatillo es estructural, no "no cerró exacto": con notas en miles
  la tolerancia exacta tapa una D chica.
- Medido en una copia sobre 162 documentos con los ajustes puestos: 0 cambian (descartado antes de entrar: sin el encabezado de la D movía
  10 Juventus IFRS; sin el control del ajuste, Como 2024 contaba la D dos veces). Sin sus ajustes, Inter 2021-22, Bologna 2019-20 y Como
  2024 dan idéntico: 4 ajustes anulados, cargas idénticas.

## Versión 588 — La etapa 4 ya no frena la categorización en silencio (to-do 176) (2026-10-08)

- `verificar.mjs` (avisarRegistro): un número sin confirmar que no es el valor del año de una fila que se carga no frena (escalón 3a);
  uno de una fila que se carga queda confirmado si el resultado cierra con él y deja de cerrar con el de la segunda lectura (3b); si
  las dos lecturas cierran, va a la cola como pregunta en vez de frenar sin avisar. `confirmadosPorSumas` queda en el .verificacion.json.
- Destrabados: AS Roma 2021 (13 números, ninguno de una fila que se carga) y Torino 2023 (TV L493 52.376.963; con la segunda lectura
  52.176.963 el resultado se iría 200 mil). Atalanta 2019: L393 y L394 confirmadas por las sumas; L375 (2.875.337 vs 2.875.357) a la cola.
- Medido sobre 162 documentos (Italia y prueba completa): números idénticos en todos; cambian solo las marcas de 4 (Novorizontino 2016,
  cargado, pasa a tener 2 preguntas de un dígito que antes se aceptaban en silencio).

## Versión 587 — Escalón "renglón grande sin abrir" en verificar.mjs; to-do 175 cerrado (2026-10-08)

- Si la lectura que ganó (0-4) deja un renglón de ingresos de 20% o más del total dentro de un grupo de 3 renglones o menos (un grupo que
  el estado no desglosa), se prueba la misma lectura con la nota del subtotal abierta del lado de los ingresos, sin esperar a que la
  propuesta de carga marque una categoría en 0 (el reintento). Compuerta: la misma lectura cierra igual. No depende de la categorización.
- Medido en una copia: sin la marca del camino de error, los 11 documentos que hoy se abrieron por reintento o a mano (Bologna 2018-22,
  Cremonese 2022/2024/2025, Sampdoria 2018, Sassuolo 2021/2024/2025, Udinese 2021-22) dan idéntico a lo cargado en la primera pasada; con
  las marcas, 0 de 98 cambian; prueba completa 0 de 87. Descartado: el gatillo del 20% solo (rompía Atalanta 2022/2024 y Genoa 2022).
- Cargados con el escalón 1 (Versión 586): Parma 2018, 2024 y 2025; Parma 2022 recargado. To-do 175 cerrado.

## Versión 586 — Escalón "subtotal repetido" en verificar.mjs (to-do 175, escalón 1) (2026-10-08)

- Si la lectura 4 no cierra, se prueba la 4 sin contar el subtotal que tiene el MISMO importe que el renglón inmediato de arriba (es ese
  renglón repetido): si el renglón ya se abrió con su nota, el subtotal se saltea; si no, ocupa su lugar y se abre con SU nota. Misma
  compuerta que la 4. También lo usan los chequeos de año anterior y año vecino, y el escalón "17) resta" prueba esta base después de la 4.
- Causa en Parma: "Totale altri ricavi e proventi" repite "altri" (2025: L525/L526, 118.887.215); los ingresos daban el doble, ganaba la
  lectura 5 (sin notas) y la televisión quedaba en 0 aun en el reintento.
- Medido en una copia: Italia, cambian solo 5 de 98 (Parma 2018, 2022, 2024 y 2025 pasan de la lectura 5 a la 4 con la nota abierta;
  Parma 2023, solo el texto de un chequeo); prueba completa 0 de 87. Parma 2023 deja su ajuste de "altri" (anulado; carga idéntica).

## Versión 585 — Cremonese 2022 y 2024 recargados con "altri" abierto (to-do 174 cerrado) (2026-10-08)

- "altri" (21,7 y 42,8 M, el 74% de los ingresos en 2024) entraba entero como lump_football_operations. Arreglo sin reintento pago:
  categoría fuera del lump por la cola, `cargar.mjs --lista` (propuesta) marca Televisión en 0 y `verificar.mjs` abre la nota del
  subtotal (Versión 578). Mutualità, concessioni radio televisive y paracadute -> broadcasting por precedente (Cremonese 2025, Genoa 2022).
- 2022: TV 8,6 M, sponsors 18,6 M; 2024: TV 16,0 M, sponsors 36,3 M, jugadores 2,8 M. Totales y resultado idénticos a lo cargado.
  Auditoría P0 0, P1 0. El camino quedó anotado en el to-do 175 (sirve para Parma 2022).

## Versión 584 — Sourcing Italia: más años de Serie A, Serie B-D, rugby y tenis (2026-10-07)

- 6 agentes de sourcing en paralelo; ~124 PDFs nuevos en `Clubes/Italia/` (sin transcribir ni cargar). Más años: AS Roma 2005-2017, AC Milan
  grupo 2008-2013, Lazio 1998-2001 y 2003-2005 más 2025/26, Parma 2016-2025, Inter 2017/18-2018/19 y 2020/21, Napoli 2018-19, Sassuolo
  2018-19, Bologna 2023/24-2024/25, Verona 2024, Sampdoria 2020. Clubes nuevos: Salernitana y Chievo Verona (extintos valen), Juve Stabia
  (vía la SEC, dueño Brera Holdings), Catania viejo (extracto del Registro Imprese de prensa). Serie B/C/D y Calabria/Sicilia: dead-end
  reconfirmado. Rugby: FIR y Zebre Parma. Tenis: FITP (consuntivi 2012-2024) y sus entes Business & Media, Sportcast, Mario Belardinelli, más
  Sport e Salute. Las federaciones entran al sitio (decisión de Guido).
- `fuentes/_indice/Italia.md` y `fuentes/README.md` regenerados; `fuentes/Italia/_notas-generales.md` con el resumen y los gotchas; mails
  posibles anotados en `paises/Italia.md` (no se envía nada). `node tools/audit.js`: 0 P0, 0 P1.

---

## Versión 583 — Escalón "17) resta" en verificar.mjs; 25 ajustes manuales anulados (to-do 155, escalón 2) (2026-10-07)

- `verificar.mjs`: si el resultado no cerró exacto, el 17) del Codice Civile (encabezado buscado en el .md: la extracción a veces no lo
  trae, Cremonese 2025, o lo trae sin número, Torino 2018) y sus hojas restan; compuerta: el total de C impreso exacto; después las
  lecturas 0-6 con ese financiero. El fin de la sección C se busca en el .md (encabezado D/E en mayúscula, 18), resultado antes de
  impuestos): en Torino 2018 la D vino como financiero.
- Medido en una copia: sin los ajustes del 17), 14 de 16 documentos dan lo mismo que lo cargado (12 proponen carga idéntica; Juventus
  2003-04 y 2004-05 siguen en cola como antes). Con los ajustes, cambia solo Bologna 2018-19 (sin cargar): financiero +552.236 ->
  (556.520), el C impreso. Prueba completa: 0 de 87.
- Anulados 24 ajustes de financiero/impuesto de esos 14 documentos; el ajuste de ingresos de Parma 2023 ("altri" L557) pasa a
  `--reemplaza-linea` (con `--reemplaza "altri"` se llevaba también los "altri" del financiero). Napoli 2024 (17-bis desglosado) y Bologna
  2019-20 (D 19) siguen con sus ajustes: to-do 155, conocido, sin daño.

## Versión 582 — La compuerta del resultado prueba primero el resultado exacto (to-do 155, escalón 1) (2026-10-07)

- `verificar.mjs`: de las 4 combinaciones de signo (financiero, impuesto), primero la que da el resultado impreso EXACTO; la tolerancia
  ancha queda como escalón de abajo. Antes ganaba la primera dentro de la tolerancia.
- Medido: 57 de Italia, cambia solo Cremonese 2025; prueba completa (87), cambia solo Novorizontino 2010. Los dos tenían el
  financiero con el signo al revés en el sitio y se recargaron (`cargar.mjs --reemplazar`): Cremonese 2025 netInterest +4.261 ->
  −4.261 EUR (Totale C impreso (4.261)); Novorizontino 2010 +1.691 -> −1.691 R$ ("Financeiras Líquidas" dentro de las despesas).
  Auditoría P0 0, P1 0.

## Versión 581 — Escalón "ajustes del financiero sin reemplaza" en verificar.mjs (to-do 156 B); AS Roma 2025 re-transcripto (2026-10-07)

- `verificar.mjs`: si ninguna lectura 0-6 cerró el RESULTADO, se repite la lectura 5 sumando también los ajustes `fila` del financiero
  que no reemplazan ninguna fila (la 5 solo sumaba los que reemplazan). Misma compuerta que la 5. Como regla de la lectura 5 rompía Roma
  2018 (resultado cerrado desde la lectura 0, fallan solo los totales); como escalón no lo toca. Inter 2024-25 cierra por el escalón y su
  ajuste vuelve a no llevar `--reemplaza-linea`.
- Medido: 57 de Italia, cambia solo Inter 2024-25 (mismos totales que con el ajuste manual); prueba completa (87), cambian 0.
- AS Roma 2025: la página 22 del visor (conto economico consolidato) re-transcripta con Claude, la página sola (US$ 0,027), y
  reemplazada en el .md; lote 24 (US$ 0,36): cierra por la lectura 4. Cola de Roma 2025 e Inter 2024-25 respondida.
- Lote 25 (categorización, US$ 0,08). Cargados Inter 2024-25 y AS Roma 2025 (auditoría P0 0, P1 0). Roma 2025: Trigoria y Stadio
  Olimpico (alquiler de instalaciones deportivas) a gastos de partido; otras sedes, bienes y sueldos de empleados y directivos a gastos
  generales (criterios de Italia y de club-data-mapping). To-do 157 cerrado.

## Versión 580 — To-do 157: Lazio 2014-15 y Sampdoria 2021 cargados; Inter 2024-25 cierra; el escalón B del 156 no entra (2026-10-07)

- Ajustes manuales (gratis): Lazio 2014-15, imposte b) y c) con `--reemplaza-linea` (columnas corridas, el subtotal 933.312 entraba
  además de sus partes); Sampdoria 2021, i) 5.785.259 sale (es un di cui de h)) y cierre 2021-12-31 (30/03/2022 era la aprobación);
  Inter 2024-25, el D) 18) +780.928 con `--reemplaza-linea` (la lectura 5 solo suma los ajustes del financiero que reemplazan).
- Lote 23 (categorización, ~US$ 0,06). Cargados Lazio 2014-15 y Sampdoria 2021 (primer año del club; alta revisada por un subagente
  Sonnet: nombre, tipo y cierre OK). Auditoría P0 0, P1 0. Perfil de Sampdoria: sin socios, solo fútbol (criterio de Italia);
  "d) altri costi" del personal -> salarios del plantel (precedente de Atalanta 2021).
- Medido y descartado: la lectura 5 con todos los ajustes del financiero (to-do 156 B) rompe Roma 2018 (HALLAZGOS).

## Versión 579 — La nota del subtotal: componentes abajo, señal estable, negrita y anular ajustes (2026-10-07)

- `verificar.mjs`: el escalón de la nota del subtotal busca los componentes también ABAJO del subtotal (Sassuolo 2025) y la señal de
  categoría en 0 se queda prendida (`notaSubtotal`): sin eso oscilaba (Bologna 2019-20: TV 33,9 M, después 0, después 33,9 M).
- `proponer-carga.mjs`, `parseNumber()`: sin las marcas de negrita ("**67.881.535**" se leía 67,881; "**(727.914)**", positivo). Afecta 3
  documentos; fuera de Bologna 2019-20 no cambia nada cargado.
- `ajustes.mjs --anular`: saca un ajuste que el script ya resuelve (registro `anulado`). Anulados 35: los ingresos de Bologna 2019-2022, la
  TV de Sassuolo 2025 y el `incluye` de Udinese 2021-22.
- Medido: de 122 documentos solo cambian los 6 del to-do; Bologna da sin ajustes exactamente lo cargado. TODO 163 cerrado.
- Recargados con el detalle de la nota (auditoría P0 0, P1 0; P2 de 32 a 30): Sassuolo 2025 (sponsors y comerciales 0,4 -> 42,6 M),
  Udinese 2021-22 (TV 0 -> 36,2 M) y Cremonese 2025 (un balde de 50,3 M -> sponsors 42,9, TV 6,9, jugadores 5,7 M). 24 categorías
  nuevas fijadas por Claude con los criterios de Italia.

## Versión 578 — La nota del subtotal abre el grupo cuando una categoría sale en 0 (2026-10-07)

- `verificar.mjs`, to-do 163 problema 2: si la nota quedó asignada al subtotal del grupo y la última propuesta de carga marcó una categoría
  en 0 de ese lado, las filas de la nota que suman el subtotal impreso reemplazan a sus renglones. `cargar.mjs` guarda el lado de cada
  categoría en 0.
- Medido: probado sin la condición, cambiaba Atalanta 2024 (TV 107,5 -> 101,8 M y dejaba de cerrar) y Parma 2023 (mismas cifras con otro
  nombre); con ella, de 122 documentos solo cambian los ingresos de Cremonese 2025 y Udinese 2021-22 (TV que estaba en "altri").

## Versión 577 — Una nota con nombres repetidos se prueba solo con las filas de su lado (2026-10-07)

- `verificar.mjs`, to-do 163 problema 1: si las filas que dicen abrir un renglón no lo cierran, escalón con solo las del mismo lado.
  Causa en Bologna 2020-21: las notas de intereses (16 y 17) también dicen abrir "altri" y sumaban 81.433.661 contra 79.927.219.
- Medido: probado primero como regla, rompía Goiás 2025 (cargado: su nota mezcla gasto e ingreso). Como escalón: de 122 documentos solo
  cambia Bologna, lo cargado idéntico; sin sus ajustes de ingresos, Bologna 2020-21 da lo mismo que el sitio (TV 62,7 M).

## Versión 576 — El nombre legal del alta: portada y más frecuente tienen que coincidir; si no, a la cola (2026-10-07)

- `alta-club.mjs`, `decidirNombre()`: ajuste `name` (nuevo en `ajustes.mjs`, también por carpeta) o respuesta de la cola → portada y más
  frecuente coinciden → si no, pregunta a la cola (decisión de Guido: el alta es una sola vez). `nombrePortada()` recorta bien
  ("ASSOCIAZIONE CALCIO MONZA", "AZUL & BLANCO MILLONARIOS", "1. FC Köln"); `nombreBienEscrito()` arregla las mayúsculas.
- Medido en los 175 clubes del sitio: 61 se deciden solos (51 iguales al sitio; el resto, nombre desarrollado a mano en el sitio), 55
  van a la cola (antes se elegía el más frecuente, que acertaba 13 de 48 cuando no coincidían: Hellas Verona Service por Hellas Verona),
  59 con el nombre de la carpeta como siempre. Propuestas de carga de 122 documentos idénticas.
- Tipo de documento y cierre (Monza): se revisan con un subagente Sonnet después del alta y se corrigen con ajustes. El tipo de cambio
  fuera del commit era de proceso (PIPELINE). TODO 161 cerrado.

## Versión 575 — Las respuestas de categoría se reusan entre clubes del mismo país (2026-10-07)

- `cargar.mjs`, escalón B del to-do 152: una fila que iba a la cola toma la respuesta de otros clubes del mismo país si la misma etiqueta,
  del mismo lado y en el mismo contexto (nota que la abre, o renglón título del estado: `contextoFila()` en `padres-filas.mjs`) se respondió
  en al menos 2 clubes con la misma categoría. "altri costi" no se generaliza: cada club lo tiene bajo otro título.
- Medido: sobre las respuestas existentes decide 34 y acierta 34; propuestas de 122 documentos idénticas salvo Bologna 2018-19 (no
  cargado): 11 -> 7 preguntas de categoría. TODO 152 resuelto.

## Versión 574 — Una respuesta de categoría vale para los otros años del club aunque cambie la marca de lista (2026-10-07)

- `cargar.mjs`, escalón A del to-do 152: una fila que iba a la cola toma la respuesta de Guido de otro año del club con la misma etiqueta
  salvo la marca de lista ("b) oneri sociali" = "oneri sociali"). Compuertas: mismo lado, misma nota (o renglón del estado y su hoja), una
  sola categoría. `cola.mjs`: `respuestasDonde()`.
- Medido: sobre 757 respuestas de categoría, decide 7 y acierta 7 (Atalanta 2021/2024, Fortaleza, Novorizontino); propuestas de 122
  documentos idénticas salvo Bologna 2018-19 (no cargado): una pregunta menos. Dos intentos descartados al medir: familia con tolerancia
  de letras ("materiali" = "immateriali") y pisar decisiones con confianza (cambiaba Fortaleza "Auxilio hotelero", cargado).

## Versión 573 — Una pregunta contestada antes del alta del club ya no vuelve (2026-10-07)

- `verificar.mjs`, dudas por tema: escalón 1 que busca la respuesta con la clave de antes del alta (nombre de la carpeta) cuando no la
  hay con la de después (id del sitio). Compuerta: misma carpeta de club; solo decisiones reales (no "obsoleto"). Causa real del to-do
  153: no era la IA redactando distinto, era la clave del club que cambia con el alta (56 preguntas repetidas en Goiás, Lazio, Verona...).
- Medido: 122 `.verificacion.json` idénticos; Hellas Verona 2020 sin la respuesta repetida: COLA con el código viejo, OK con el nuevo;
  con la respuesta de otra carpeta, COLA. TODO 153 resuelto.

## Versión 572 — El candado del lote alcanza a pipeline.mjs y cargar.mjs --escribir (2026-10-07)

- `tools/candado.mjs` (nuevo): la lógica del candado de `lote.mjs`, compartida. Lo toman `lote.mjs` y `pipeline.mjs` (también en ensayo)
  y `cargar.mjs` solo con `--escribir`. Archivo: `Admin/.candado.lock` (antes `.lote.lock`).
- Medido: ensayos de `lote.mjs` (prueba-completa) y `pipeline.mjs` (Italia) idénticos; con un lote vivo, `pipeline.mjs` y `cargar.mjs
  --escribir` salen sin tocar nada y la propuesta de `cargar.mjs` corre; un candado de un `pipeline.mjs` muerto se reemplaza. TODO 164 resuelto.

## Versión 571 — PDF híbrido: una página escaneada dentro de un PDF digital se valida con Gemini (2026-10-07)

- `validar-bloques.mjs`: una página de un PDF digital sin texto propio (menos de 50 caracteres) se valida como escaneo (Gemini; si la
  rechaza, Claude). Excepción pedida por Guido aunque sea 1 caso en 632 páginas: Como 2025, pág. 9 del visor (sin número impreso), el
  pro-forma firmado y escaneado entero. Medido en 122 documentos: solo cambia Como (120 sin confirmar -> 0, US$ 0,003).
- `verificar.mjs` (`avisarRegistro`): un número sin ninguna segunda lectura (Gemini y Claude rechazaron la página) no frena la
  categorización si la etapa 6 cerró; sin cerrar ya iba a la cola. Hoy hay 0 números así; simulado en Como sin claves: 120 -> 0.
- TODO 160 resuelto. Los 101 ajustes `confirmado` de Como quedan (ya no hacen falta, no molestan).

## Versión 570 — Un lote cortado ya no rearma páginas que estaban bien (2026-10-07)

- `lote.mjs` (paso A): un documento con la etapa 4 y sin la 6 (lote cortado) pasa primero por la etapa 6, gratis, también en el ensayo.
- `texto-propio-a-md.mjs` (paso B): el rearmado con el texto propio no corre si los chequeos de números de la etapa 6 cierran todos, aunque
  el estado sea "cola" por dudas de la IA. Caso: AC Milan 2022-23, pág. 84 ("42 | 2.456" bien en el .md, partido en el texto propio).
- Medido: ensayo de prueba-completa idéntico; de 122 documentos con validación solo cambia Milan (deja de rearmarse, US$ 0,33 menos);
  con un chequeo de año vecino que falla (simulado, tipo Goiás 2015) se sigue rearmando. TODO 162 resuelto.

## Versión 569 — Bologna 2019-20, 2020-21 y 2021-22 cargados (2026-10-07)

- Cargados con ajustes manuales: el 17) por línea (`--reemplaza-linea`) y la D de 2019-20; los ingresos abiertos con la nota "Altri
  ricavi e proventi" (10 filas por año generadas por script, to-do 163), categorizadas con `cola.mjs --corregir-categoria` sin otro lote.
- Cola de Bologna respondida por Claude con los criterios de Italia (ok de Guido): 31 casos más 30 categorías fijadas.
- TODO 150 medido y cerrado (lotes 14 y 19: 193 "no confirmados" de la etapa 4, todos en páginas que validó la etapa 2, 192 con la
  etapa 6 cerrada); lo que sigue va en los to-dos 162 (rearmado sin verificación, Milan 2022-23) y 160 (frenar la categorización).
- Re-correr el script sobre Bologna da idéntico a lo cargado (etapa 6 y propuesta de carga, fila por fila).
- Italia: 28 ejercicios de 15 clubes además de Juventus. Caja y deuda de Bologna sin dato (escalón 2 con IA, lo corre Guido).

## Versión 568 — Un ajuste `fila` puede reemplazar una línea, no solo una etiqueta (2026-10-07)

- `ajustes.mjs fila --reemplaza-linea N` y `verificar.mjs`: sale solo la fila de esa línea del .md (o las hojas de su nota, si estaba
  abierta: cada hoja recuerda la línea de su renglón en una propiedad no visible), en todas las lecturas. `--reemplaza` por etiqueta, igual.
- Medido: los 121 `.verificacion.json` re-verificados, idénticos; renglón abierto en su nota (Bologna 2020-21, L860): salen sus 4 hojas.
- Bologna 2019-20, 2020-21 y 2021-22 cierran: un ajuste por año en el 17) por línea (y la D de 2019-20). El ingreso "altri" de
  79.927.219 (L833) queda adentro, que era lo que el reemplazo por etiqueta sacaba. TODO 158 resuelto; 157 al día.

## Versión 567 — Un año en el encabezado de una tabla ya no frena la categorización (2026-10-07)

- Etapa 4, escalón 2b (`validar-bloques.mjs`): un 1900-2099 en la fila de encabezado de una tabla sigue sin confirmar pero lleva la
  propuesta `anio-encabezado`; la compuerta en `avisarRegistro()` (`verificar.mjs`) lo deja pasar solo si su línea no es la de ninguna fila
  que se carga. Caso: Napoli 2024, "2023" en L276.
- Medido re-corriendo la etapa 4 (gratis) en los 10 documentos con números sin confirmar: los mismos 235, 9 marcados; con la compuerta solo
  Napoli 2024 pasaría sin su ajuste manual (ya está cargado). Los `.validacion.json` existentes llevan la marca recién cuando se rehace la etapa 4.
- TODO 160 queda con la parte 2.

## Versión 566 — Un solo lote a la vez (2026-10-07)

- `lote.mjs` toma un candado (`Admin/.lote.lock`, en `.gitignore`) al arrancar, también en ensayo: un segundo lote sale sin tocar nada; el
  candado de un lote cortado se avisa y se reemplaza. Sin manejador de Ctrl+C a propósito (no cortaba las etapas sincrónicas).
- TODO 162 queda con la otra mitad (verificar al arrancar lo que dejó un lote cortado); TODO 164 nuevo: el candado para pipeline.mjs y
  cargar.mjs --escribir.

## Versión 565 — El resultado del lote muestra todos los motivos de freno (2026-10-07)

- `lote.mjs`, bloque RESULTADO: cada documento frenado lista todos sus motivos, uno por línea (antes solo el primero), y avisa si el
  análisis se cortó en un freno y pueden aparecer más motivos después de resolverlo (`cortadoEn`, nuevo en `.carga.json`).
- `cargar.mjs`: el freno "no está listo-para-jev" ahora dice la causa concreta (etapa 6 sin correr o sin cerrar, validación vieja,
  números sin confirmar de la etapa 4, registro sin actualizar). Medido en 122 propuestas: mismos frenos, filas y montos; cambia solo ese texto.
- TODO 159 resuelto.

## Versión 564 — Italia: 25 ejercicios cargados con ajustes manuales del formato italiano (2026-10-07)

- Cargados AS Roma 2018 y 2022, Atalanta 2021 y 2024, Como 2025, Cremonese 2025, Hellas Verona 2020, Inter 2021-22, Lazio 2006-07,
  2008-09, 2009-10, 2019-20, 2021-22 y 2022-23, AC Milan 2023-24, Monza 2022, Napoli 2024 y 2025, Parma 2023, Sassuolo 2025, Torino 2018,
  2021 y 2024, Udinese 2021-22 y 2024-25.
- Ajustes manuales (Admin/ajustes-manuales.jsonl) para lo que el script todavía no resuelve: signo del 17) y de las imposte, variación de
  existencias, renglones contados dos veces, rettifiche D sin lado, columna Como 1907 del pro-forma, TV de Sassuolo, números "no
  confirmados" falsos. Cola respondida por Claude con los criterios de Guido (to-do 152). Colores de marca de 19 clubes; Juventus #000000.
- TODO 150 y 152-163 con el contexto de cada falla de script. Sassuolo 2025: Serie A.

## Versión 563 — Alta de 16 clubes italianos sin años y gestiones de Italia (2026-10-07)

- Alta, sin cargar ningún año (decisión de Guido, 2026-10-06): AC Milan, AS Roma, Atalanta, Bologna, Como, Cremonese, Hellas Verona, Inter,
  Lazio, Monza, Napoli, Parma, Sampdoria, Sassuolo, Torino y Udinese, un commit por club, con `brandColor` (Parma `null`). Nombre legal
  corregido a mano donde `alta-club.mjs` tomó otra entidad o una forma truncada (Hellas Verona, AS Roma, Sassuolo, Monza, etc.). ASSET_V 453.
- `data/gestiones/it.js` nuevo ('it' en `PAISES`): gestiones de 14 clubes (Monza y Como quedan sin cargar, ver `Admin/TODO.md`); ASSET_V 454. Los 3 casos de gestión de la cola
  (Atalanta 2021, Hellas Verona 2020, Sassuolo 2025) respondidos con aceptar.

## Versión 562 — El alta lee el ajuste de perímetro; el resultado del lote dice el club (2026-10-06)

- `alta-club.mjs`: el ajuste `perimetro` (del documento o del club) es el escalón 0, como ya era en `cargar.mjs`. Con dos entidades en la
  carpeta, vale solo si el nombre del documento dice ese perímetro (Parma 2023 individual sí; el consolidato del mismo año sigue
  preguntando). Juventus y Novorizontino dejan de preguntar el perímetro (toman el de su ajuste, igual a lo cargado).
- `lote.mjs`: cada línea del RESULTADO lleva el club ("Torino 2021", no "2021").

## Versión 561 — Italia: etapa 2 del primer tercio y el perímetro del club por señales (2026-10-06)

- `pipeline.mjs` sobre 35 de los 105 documentos italianos sin validar (todos "listo"); lista `Admin/lote-14.txt` (34, sin el informe del
  auditor de Lazio 2024-25).
- Nuevo `tools/perimetro-senales.mjs`: propone individual o consolidado por documento (tablas de cada perímetro y voto de 3 criterios, uno
  de Jev) y fija el ajuste del club cuando sus documentos coinciden. Lo llaman `lote.mjs` y `antes-de-localizar.mjs` antes de la compuerta;
  `ajustes.mjs` exporta `agregarAjuste()`. Verdad de prueba: `Admin/tests/perimetro-verdad.tsv`. Prueba completa idéntica antes y después.
- Ajuste de Parma: individual (Guido).

## Versión 560 — To-do 23 cerrado (2026-10-06)

- Lo único que quedaba era la nota "techo del modelo" (la taxonomía es de fútbol), que no es una tarea: pasó a `Admin/ESTADO.md`.

## Versión 559 — To-do 23: Comparar con el diseño de Finanzas y valores ajustados por inflación (2026-10-06)

- Construido en 7 pasos desde el mockup aprobado (`Prototyping/Comparar/mockup-23.html`), todo en `js/selector.js`, `js/styles.css`,
  `index.html` y `data/lang/en.js`: inflación con la serie USD por ejercicio antes de juntar el lado; chips de ejercicio de Finanzas
  (varios ejercicios por club, "Promedio | Suma", default el último balance); sin botón "Comparar" y sin pisar el club activo; barra
  con formato fijo y toggle de inflación, sin USD / ARS en el header; un solo gráfico A contra B por año de cierre (reemplaza a la
  composición al 100%); tabla con las filas de Finanzas, B / A, % del total y rubro desplegable (reemplaza a los 6 indicadores con
  barras); avisos de cada lado en su card, "dentro de otro rubro" en la celda, fuentes por ejercicio; reintento y aviso si el
  archivo de un club no carga. `ASSET_V` a 451; `fuentes.html` y las 169 páginas de club regeneradas.

## Versión 558 — To-do 23: mockup de Comparar con el diseño de Finanzas (2026-10-06)

- `Prototyping/Comparar/mockup-23.html`, aprobado por Guido. Comparar pasa a leerse como Finanzas: los dos cards de lado son el título, chips de ejercicio de Finanzas (un club elige varios ejercicios, cada lado con "Promedio | Suma"), barra con formato fijo en Simplificado y "Valores ajustados por inflación", un solo gráfico con A y B en el mismo eje de años, tabla con las filas de Finanzas (A, B, B / A) y un gráfico A contra B al tocar un rubro. Sin USD / ARS en el header de Comparar. Números reales del motor; el porqué de cada decisión, en un comentario al principio del archivo. Nada del sitio cambió todavía.

## Versión 557 — To-do 101 cerrado sin más cambios (2026-10-06)

- Decisión de Guido: los criterios de categoría entre clubes no se siguen revisando ("va a ser un círculo sin fin"). Quedan como están, sin cambios en los datos: gastos de transferencias y préstamos de jugadores (entre `other_expenses` y `player_amortisation` según el club), seguros fuera de administración en 4 clubes, intereses como línea de gasto en 5, alquileres repartidos entre administración y otros gastos, y la línea de sueldos de Boca 2027 con gastos no salariales adentro. Lo único que se cambió del 101 fue el punto 1 (Boca, Versión 554).

## Versión 556 — 64 archivos de corridas viejas a `Admin/Archive/`; to-do 109 cerrado (2026-10-06)

- A `Admin/Archive/lotes/` las 32 listas `lote-*.txt` y `juventus-etapa2.txt`; a `pilotos/` los 5 `piloto-*.txt`; a `prompts/` los 3 prompts de sourcing; a `tests/` 21 variantes viejas de `Admin/tests/`; a `Admin/Archive/` `medicion-caja-deuda-ia.txt` y `auditoria-pipeline-2026-10-02.md`. Ninguna tool los leía.
- Ejemplos de uso de `lote.mjs`, `antes-de-localizar.mjs` y `gasto-doc.mjs` con `Admin/lote-NN.txt`; citas de `lote.mjs`, `resolver-inventario.mjs`, `escalones.mjs` y `tools/archivo/localizar-extraer.mjs` a la ruta nueva. `audit.js`: 0 rutas muertas.

## Versión 555 — Cuatro documentos cerrados a `Admin/Archive/` (to-do 109) (2026-10-06)

- `Admin/test-barridos.md`, `Admin/test-costo-transcripcion.md` (con su carpeta), `Admin/inventario-pendiente.md` y `Prototyping/Selector/MERGE-A-PRODUCCION.md` (ahora `selector-merge-a-produccion.md`), con su banner y su línea en `Admin/Archive/README.md`.
- Citas actualizadas en las tools (comentarios y la advertencia de escaneo de `mistral-ocr-transcribe.mjs`), `Admin/PIPELINE.md`, `Admin/ARQUITECTURA.md`, `Prototyping/README.md`, `index.html`, `js/selector.js`, `js/styles.css` y dos notas de `fuentes/Argentina/`. Sin cambios de comportamiento.
- Skills `club-data-mapping` (§6 y §15) y `club-sourcing` (0.1b) sin citas a esos tests (con el ok de Guido); §15 apunta a `Admin/PIPELINE.md`, "Documentos fuente". ASSET_V 449 → 450 (comentarios en `js/` y el cambio de Boca); generadores corridos.

## Versión 554 — Boca: el sueldo de cada departamento va con su departamento (to-do 101, punto 1) (2026-10-06)

- `data/boca-data.js`, 2022, 2023 y 2025: los sueldos de Estadio, Casa Amarilla, Departamento médico y Estructura operativa pasan de `wages_squad` a `admin_general_expense`, y los de Educación física, Fútbol juvenil y Básquet a `youth_other_sports_expense`, la misma categoría que los otros gastos de cada departamento. Solo Fútbol profesional queda en `wages_squad` (2025: 67.870 → 46.452 M ARS). Totales sin cambio. La decisión queda escrita arriba de `bocaExpenseLinesByYear`. ASSET_V 449 → 450; generadores corridos.

## Versión 553 — To-do 149 cerrado: 62 clubes con sus presidentes en el formato nuevo (2026-10-05)

- Un subagente (Sonnet) pasó a `data/gestiones/<país>.js` los clubes que tenían nombres de presidentes en `gestionesByClub` (que sigue vivo para otras pestañas): 105 gestiones de 65 clubes en total, con fecha de asunción y fuente; archivos nuevos br, gb, cl, co, de, be, dk, hr y es, y esos países en `PAISES` de `js/finanzas-anios.js`. Ninguna confirmada sin fuente.
- Verificado en el preview con todos los clubes cargados: cada ejercicio cargado tiene su presidente, salvo Operário Ferroviario 2024-2025 (`confirmada:false`, sin fuente). No pasaron los de relleno (sin nombre de persona) ni las sociedades sin dueño persona (Liverpool, Newcastle, Wolves, RB Leipzig).
- Fechas aproximadas (día 1 cuando la fuente da solo mes o año) y criterios para revisar (Vélez 2023, Estudiantes 2024, Corinthians 2024, Bayern con el CEO de la AG, cabeza de sociedades inglesas): en el informe de la sesión; ninguna cambia qué presidente le toca a un ejercicio cargado salvo esos casos de criterio. ASSET_V 448 → 449, audit 0 P0/P1.

## Versión 552 — To-do 149: los presidentes en el pipeline (2026-10-05)

- `cargar.mjs`: `cargarSitio()` lee `data/gestiones/*.js`; si ninguna gestión confirmada cubre el cierre del año, un caso `gestion` en la cola (no frena) con lo que hay que completar y, como pista, los firmantes de la transcripción (el renglón del nombre y el del cargo, nunca el del documento de la persona). "descartar" (club sin presidente persona) no se vuelve a preguntar; "aceptar" con un año que siguió sin cubrir abre un caso para ese año.
- Probado en sandbox: Goiás 2021 abre el caso con "Paulo Rogério de Carvalho Pinheiro / Presidente Executivo" (L1317); descartado, Goiás 2022 no abre otro. Ensayo de `prueba-completa` idéntico.
- Queda en el to-do 149 pasar al formato nuevo los ~40 clubes con nombres en `gestionesByClub`.

## Versión 551 — To-do 148: el chequeo de tipo de cambio vuelve a 0 avisos (2026-10-05)

- `FX_PLAUSIBLE_RANGE` (data/currency-map.js): mínimo de CLP de 600 a 400 (UC 2010-2013 cerró a 468-525, real) y de EUR de 0,7 a 0,6 (Juventus 2008 0,634 y 2011 0,692, reales). El máximo de EUR (1,15) no se toca: atrapa el fx invertido de España (1,172). `auditAll()`: 0 avisos de tipo de cambio (antes 6), 1.136 OK, los 3 de Bayern de siempre. ASSET_V 447 → 448, audit 0 P0/P1.

## Versión 550 — To-do 101: errores claros de categoría corregidos (2026-10-05)

- River 2021 y 2024: el gasto "Educación" (−279,2 y −4.113,0 M ARS) pasa de `youth_other_sports_expense` a `education_expense`, espejo del ingreso (quedó fuera de la recategorización de la Versión 194). Sin ajuste manual: el ajuste `categoria` va por etiqueta y movería también el ingreso "Educación"; River no pasa por el pipeline.
- Racing presupuestos 2019, 2026 y 2027: los sub-ítems de "Ingresos/Egresos de otras secciones" pasan a líneas propias; los de instituciones educativas van a `education` / `education_expense`, como el colegio en 2009-2025.
- Ningún total cambia: `auditAll()` 1.136 OK y los 3 de Bayern de siempre. ASSET_V 446 → 447, audit 0 P0/P1.
- La revisión de los 169 clubes (subagente) dejó 6 decisiones de criterio en el to-do 101.

## Versión 549 — To-dos 139, 140 y 145 fuera de la lista (2026-10-05)

- Decisión de Guido: el 139 (defecto D, un solo caso, sin daño), el 140(b) (Gemini sobre escaneos enteros, sin caso) y el 145 (caja-deuda en tablas sin columna de notas, sin daño) salen de la lista. El diagnóstico de cada uno queda en las Versiones 513-514 y 521 de este archivo.

## Versión 548 — To-do 147 cerrado: Finanzas multi-año (2026-10-05)

- Cierre: pasada en celular (Racing, Juventus y Flamengo con Todos y ajuste por inflación: sin scroll horizontal de la página; la fila de años y las tablas se scrollean de costado), `auditAll()` igual que `main` (169 clubes, 1136 checks; los 3 de Bayern y los 6 avisos de fx del to-do 148 ya conocidos), `audit.js` 0 P0 / 0 P1.
- `Admin/TODO.md`: sale el 147 (sus decisiones viven en `Admin/PANTALLA.md`, "Finanzas multi-año"). `Admin/ESTADO.md`, `Prototyping/README.md` (el mockup se conserva por sus notas), entrada en `Admin/finance-of-sports-project.md`.

## Versión 547 — To-do 147, paso 13: el card "otra liga" muestra el puesto (2026-10-05)

- `index.html` (`renderLigaSimPuesto()`, `#ligaSimRes`): selector "Si jugara en" con las ligas que tienen clubes cargados ese ejercicio (`leagueAt` sobre `CLUB_INDEX`; default, la de más clubes) y el puesto en ingresos, "6.º en ingresos, entre los 17 clubes de Premier League 2024/2025 que tenemos cargados" (más "(la liga tuvo N)" si se sabe). Calculado con `LIGA_VIEW.filaSimulada` contra el ranking precalculado, igual que Ligas. "Ver el ranking completo" abre Ligas con el club simulado. Sin ligas candidatas, queda el botón viejo "Elegir una liga".
- `js/liga.js` expone `loadRanking`, `rankingDe` y `filaSimulada`. `js/styles.css`, `data/lang/en.js` (`finanzas.ligasim.*`). `ASSET_V` 446.
- Verificado: Juventus 2024/25 (617,1 M USD) queda 6.º, detrás de los 5 clubes de la Premier con más ingresos en el ranking; el botón abre Ligas con Juventus simulado en la Premier 2024/25.

## Versión 546 — Sin pesos en KB en la guía de arranque; Racing 2012/13 con Blanco (2026-10-05)

- `.claude/skills/start-session-finance-of-sports-project/SKILL.md`: la tabla de qué leer pierde la columna "Peso" y los párrafos que la explicaban (pedido de Guido: no tener que actualizar esos números nunca más). `tools/audit.js`: se borra `checkPesoDocs()` (`doc-peso-desfasado`), que comparaba esos números contra el tamaño real.
- `data/gestiones/ar.js`: Racing 2012/13 pasa a Blanco (`firmo:[2013]`, decisión de Guido): cerró con Cogorno pero Blanco asumió el 30/9/2013, antes de la aprobación del balance. `ASSET_V` 445.

## Versión 545 — To-do 147, paso 12: gestión en Finanzas, con el formato nuevo de gestiones (2026-10-05)

- `data/gestiones/ar.js` (nuevo, formato nuevo): Boca (Angelici, Ameal, Riquelme) y Racing (Molina, Cogorno, Blanco, Milito), cada una con fecha de asunción, fin, fuente (prensa o Wikipedia, verificadas hoy) y `confirmada`. Los ejercicios de cada gestión se derivan: quien estaba en el cargo al cierre del ejercicio; `firmo` queda para cuando el firmante del balance sea otro. Caso abierto anotado en el archivo: Racing 2012/13 (cerró con Cogorno, Blanco asumió el 30/9/2013; la transcripción no trae firmas).
- `js/finanzas-anios.js` (`FIN_GESTION`): carga el archivo del país al elegir el club y arma la fila "Gestión" (botones acumulables, más vieja primero, "+N más" con más de 4). `js/finanzas-multi.js`: franjas por gestión en el gráfico y columnas agrupadas por presidente en la tabla.
- `tools/audit.js` (`checkGestiones`): fuente de cada gestión confirmada, fechas, superposiciones, club existente y la lista `PAISES` contra los archivos. `index.html` (`#finGest`), `js/styles.css`, `data/lang/en.js` (`finanzas.gest.*`). `ASSET_V` 444.
- Los ~40 clubes con nombres reales en `gestionesByClub` no se migraron: pasan al to-do 149 (gestiones en el pipeline de altas).
- Verificado: años de cada gestión (Racing: Molina 2009-11, Cogorno 2012-13, Blanco 2014-24, Milito 2025-27; Boca: Ameal 2022-23, Riquelme 2025 y 2027, Angelici sin ejercicios y sin botón), prender y apagar, franjas, columnas agrupadas, Juventus sin fila. Con `?multi=0`, los 65 ejercicios idénticos a `main`.

## Versión 544 — Los deflactores se bajan con el mismo script que los tipos de cambio (2026-10-05)

- `tools/fetch-fx-reference.mjs --deflactores` (pedido de Guido: que convivan con las series de tipo de cambio del pipeline de altas): baja el deflactor del PBI de EE.UU. (FRED) y de la zona euro (Eurostat) a `tools/fx-reference/deflactor-usd.json` y `deflactor-eur.json`, con el mismo formato que las cotizaciones, y regenera el objeto de `data/deflactores.js` conservando su encabezado. Corrido hoy: reproduce byte por byte lo que se había cargado a mano en la Versión 543. `Admin/PIPELINE.md` (regla 6 del tipo de cambio).

## Versión 543 — To-do 147, paso 11: valores ajustados por inflación en Finanzas (2026-10-05)

- `data/deflactores.js` (nuevo): deflactor del PBI de EE.UU. (BEA vía FRED, A191RD3A086NBEA, 2017=100) y de la zona euro (Eurostat nama_10_gdp EA20 PD15_EUR, 2015=100), 2000-2025, bajados de las dos fuentes el 2026-10-05. Se actualiza una vez por año.
- `js/finanzas-multi.js`: `FIN_REAL` (factor por ejercicio: año base = el último de la serie, por año de cierre, 1 para años posteriores al base) y `FIN_REAL_UI` (toggle y franja explicativa). La tabla, la deuda, los KPIs (número grande incluido), el gráfico y el gráfico de cada rubro multiplican por el factor; unidad "M USD de 2024/25", factor por columna. Solo con USD o EUR en pantalla; en ARS u otra moneda el toggle no aparece. Prendido con un solo ejercicio, se usa la tabla multi-año.
- `index.html` (`#realToggleWrap`, `#finRealNote`, script de deflactores), `js/finanzas-render.js`, `js/styles.css`, `data/lang/en.js` (`finanzas.real.*`). To-do 23(d) queda reducido a Comparar. `ASSET_V` 443.
- Verificado: cada total de ingresos ajustado = nominal × factor (±0,1 por redondeo) en Juventus, Racing y Köln en USD; factor EUR igual a Eurostat (2020/21 ×1,1759); un solo ejercicio viejo (Juventus 2004/05: 259,1 × 1,4851 = 384,8 M EUR de 2024/25); gráfico, KPIs y tabla iguales; ARS sin toggle. Con `?multi=0`, los 65 ejercicios idénticos a `main`.

## Versión 542 — To-do 147: Finanzas multi-año pasa a ser la vista por default (2026-10-05)

- `js/finanzas-anios.js`: `FIN_MULTI` es `true` salvo con `?multi=0`, que vuelve a la vista de un ejercicio con el dropdown (salida de emergencia). Los comentarios que decían "con ?multi=1" se reescribieron.
- `Admin/PANTALLA.md`: sección nueva "Finanzas multi-año" (cómo es, qué no romper, cómo verificar); el card "otra liga" en "Simular clubes". `Admin/ESTADO.md`: bloque "Finanzas multi-año". `ASSET_V` 441.

## Versión 541 — To-do 147, paso 10: las búsquedas guardadas de Mi Cuenta recuerdan varios ejercicios (2026-10-05)

- `index.html`: Finanzas le pasa a `CUENTA.notifyStateChange()` también `years` (la lista de FIN_SEL); `year` (el más nuevo) se sigue mandando. `reopenSavedSearch()`: con `?multi=1` y una búsqueda con varios ejercicios, vuelve a elegir todos los que el club siga teniendo; sin los cards, queda el más nuevo.
- `js/cuenta.js`: con más de un ejercicio, la clave lleva la lista y el nombre dice "Racing Club, 2017/2018 a 2024/2025, 5 ejercicios" (hasta 3, se nombran). Con uno solo, la clave de siempre: las búsquedas viejas no se duplican. `stateKey` y `labelFor` quedan expuestos en `window.CUENTA` para verificarlos sin sesión.
- Verificado sin login (guardar de verdad lo necesita): la clave de un año es idéntica a la vieja, la de varios años distinta, el nombre, reabrir una búsqueda de 3 ejercicios desde otro club y reabrir una vieja de un año. Sin `?multi=1`, los 65 ejercicios idénticos a `main`. `data/lang/en.js` (`cuenta.years.range`). `ASSET_V` 440.

## Versión 540 — To-do 147, paso 9: fuentes, aviso de calidad y cards de presupuesto con varios ejercicios (?multi=1) (2026-10-05)

- Fuentes: con `?multi=1` y varios ejercicios, un renglón plegable por ejercicio elegido (el más nuevo abierto), cada uno con la ficha de siempre, más "Documento del presupuesto" en los años que tienen las dos fuentes. La ficha de un año se extrajo a `fichaFuenteDeAnio()` (`js/finanzas-render.js`), que usan las dos vistas.
- Aviso de calidad: con varios ejercicios cubre a todos los elegidos, un renglón por año ("2023/24: Balance real y auditado…, descargado de una réplica…"), no solo al más nuevo.
- Cards de presupuesto (Supuestos, Presupuesto Financiero, Inversiones, Torneos): con `?multi=1` son los del presupuesto más nuevo elegido (`presupuestoMasNuevoElegido()`) y llevan el año en el título; el año va en un `<span class="fin-card-yr">` aparte del texto traducible para que `I18N.apply()` no lo pise.
- Verificado: Racing (5 y Todos), Boca (5 y Todos), River (aviso del balance de réplica) y el cambio de idioma. Sin `?multi=1`, los 65 ejercicios idénticos a `main`, ficha de fuente y aviso incluidos. `data/lang/en.js` (`fuentes.card.docBudget`). `ASSET_V` 439.

## Versión 539 — To-do 147, paso 8: Deuda con una columna por ejercicio (?multi=1) (2026-10-05)

- `js/finanzas-multi.js` (`FIN_MULTI_DEBT`) + `index.html` (`#finanzasDebtMulti`): con `?multi=1` y más de un ejercicio, la tabla de deuda va con una columna por año (las mismas 4 filas: Salarios / Ingresos, Deuda bruta, Caja, Deuda neta), "…" en los saltos, Δ (puntos, %, % y plata respectivamente) y sparkline. Un año cuyo documento no desglosa deuda o que es solo presupuesto muestra "—" en vez de "0.0" (con varios años lado a lado, un cero se leería como "no debía nada"), y la nota de abajo dice cuáles son. La tabla de un año se sigue armando escondida.
- Verificado: 240 valores (60 ejercicios de 7 clubes) contra la tabla de deuda de un año; los "—" son exactamente los años solo-presupuesto. Sin `?multi=1`, los 65 ejercicios idénticos a `main`. `data/lang/en.js` (`finanzas.debt.multi.*`). `ASSET_V` 438.

## Versión 538 — To-do 147, paso 7: el gráfico de evolución va arriba de la tabla y sigue a la selección (?multi=1) (2026-10-05)

- `js/finanzas-multi.js` (`FIN_MULTI_CHART`) + `index.html` (`#finTrendCard`, entre los KPIs y la tabla): "Totales" = ingresos y gastos en líneas y resultado neto en barras verdes/rojas; "De qué vive el club" = barras apiladas con los rubros de ingreso del formato simplificado, un ejercicio por barra (reemplaza a la torta de un año). Tramo punteado en saltos y presupuestos, punto hueco y barra clara en presupuestos. Bajada armada con los números ("De 2017/18 a 2024/25 los ingresos subieron 50%; el resultado fue negativo en 3 de 5 ejercicios"). Usa los mismos totales por año que los KPIs (`FIN_MULTI_KPIS.delAnio`, ahora expuesto).
- Con `?multi=1` la sección "Gráficos" (`#finChartsCard`) se esconde por CSS. Sin el parámetro no cambia nada (los 65 ejercicios idénticos a `main`).
- Verificado: los ingresos del gráfico, las sumas de las barras apiladas y el Total ingresos de la tabla coinciden año por año en Racing, Juventus, Boca y Köln. `js/styles.css`, `data/lang/en.js` (`finanzas.mchart.*`). `ASSET_V` 437.

## Versión 537 — To-do 147, paso 6: KPIs con año, comparación y sparkline (?multi=1) (2026-10-05)

- `js/finanzas-multi.js` (`FIN_MULTI_KPIS`): con `?multi=1`, los 5 cards de arriba dicen de qué ejercicio son ("Ingresos · 2024/25"); con más de uno elegido, comparan contra el primero (ingresos y gastos en %, resultado y deuda neta en plata, porque cambian de signo) y llevan una sparkline. Si el más nuevo es solo presupuesto, van punteados con "Presupuesto" y la deuda neta en "—" ("Un presupuesto no informa deuda"). El número grande sigue saliendo de los totales de la tabla de un año.
- `js/finanzas-render.js`: los cards llevan `data-k` (ing, gas, extra, pat, nd); `updateFinanzasByAnioGeneric()` llama a `FIN_MULTI_KPIS.render()`. Se sacó de `updateFinanzasByGestionGeneric()` el bloque de la tabla multi-año que el paso 5a había copiado ahí por error (un reemplazo de texto que matcheó dos veces; el modo gestión está oculto, no se vio).
- Verificado: el Δ de ingresos y gastos de los KPIs coincide con el Δ de Total ingresos / Total gastos de la tabla, y la diferencia de resultado con la de sus celdas (±0,1 por redondeo), en 6 clubes con Últimos 5 y con Todos. Sin `?multi=1`, los 65 ejercicios idénticos a `main`. `js/styles.css`, `data/lang/en.js` (`stat.multi.noDebt`). `ASSET_V` 436.

## Versión 536 — To-do 147, paso 5b: rubro desplegable, % del total y presupuesto al lado del balance (?multi=1) (2026-10-05)

- `js/finanzas-multi.js` reescrito como `FIN_MULTI_PL` (con `renderMultiPLTable()` de alias): tocar un rubro (o Enter) abre su gráfico Chart.js debajo de la fila (gastos en tamaño, punto hueco y tramo punteado en presupuestos y saltos; las instancias se destruyen en cada re-render); "M <moneda> | % del total" (cada rubro contra el total de su sección ese año, el resultado como margen sobre ingresos, Δ en puntos); "Presupuesto al lado del balance" (aparece solo si algún año elegido tiene las dos fuentes, apagado por default) abre esos años en presupuesto (amarillo), balance y desvío (%; en el resultado neto, diferencia en plata). Los rubros abiertos y el botón vuelven a cero al cambiar de club.
- `index.html` (`#plMultiCtrls`), `js/finanzas-render.js` (esconde los controles fuera del modo multi), `js/styles.css`, `data/lang/en.js` (6 claves `pl.multi.*`). `ASSET_V` 435.
- Verificado: totales de cada columna contra la tabla de un año (180 chequeos, 7 clubes), columnas de presupuesto contra la columna de presupuesto de la tabla de un año en los 6 ejercicios con las dos fuentes (Racing 4, Gimnasia 2), % que suman 100 por columna, gráfico de rubro. Sin `?multi=1`, los 65 ejercicios idénticos a `main`.

## Versión 535 — To-do 147, paso 5a: Estado de resultados con una columna por ejercicio (?multi=1) (2026-10-05)

- `js/finanzas-multi.js` (nuevo, `renderMultiPLTable()`): con `?multi=1` y más de un ejercicio elegido, la tabla `#finanzasPLMulti` reemplaza en pantalla a la de un año. Rubro | un ejercicio por columna (más viejo a la izquierda, "…" donde la selección saltea años) | Δ del primero al último (en gastos compara el tamaño: más gasto = rojo) | sparkline (punteada en saltos y presupuestos). Filas = unión de las filas de los años elegidos; en formato del club un rubro que un año no tiene sale "—". Solo-presupuesto en amarillo y cursiva. Cada año con su propio tipo de cambio. Rubro fija al scrollear de costado.
- La tabla de un año se sigue armando escondida: sus totales alimentan los KPIs (`updateFinanzasByAnioGeneric`).
- Bugs encontrados al verificar: (1) Juventus 2002/03 repite "- from others" en la misma sección y la tabla tomaba solo la primera: ahora suma las filas con la misma etiqueta (`filaDe()`); (2) `tipoTexto(t)` en `js/finanzas-anios.js` tapaba `t()` con su parámetro y los cards no se dibujaban.
- Verificado: Total ingresos, Total gastos y Resultado neto de cada columna contra la tabla de un año, 60 ejercicios de 7 clubes en formato simplificado (180 chequeos) y 52 de 4 clubes en formato del club (156), sin diferencias. Sin `?multi=1`, mismos 65 ejercicios idénticos a `main`.
- `tools/audit.js`: el chequeo de i18n mira también `js/finanzas-anios.js` y `js/finanzas-multi.js`. `data/lang/en.js` (`pl.multi.*`), `js/styles.css` (`.pl-multi`). `ASSET_V` 434.

## Versión 534 — To-do 147, paso 4: cards de ejercicios en Finanzas, detrás de ?multi=1 (2026-10-05)

- `js/finanzas-anios.js` (nuevo, `FIN_ANIOS`): un card por ejercicio que se prende y se apaga solo, sin checkbox. Dice Balance / Presupuesto / Presupuesto y Balance; los años vacíos entre el primero y el último cargado salen rayados, "Sin publicar", y no se eligen. Atajos Últimos 5 (default, solo años con balance), Todos (tocarlo de nuevo saca todos → estado vacío) y Solo el último. Con más de 5 ejercicios la fila arranca corta y "+N más" va al principio. Al cambiar de club vuelve al default; al cambiar idioma o moneda se conserva. En celular la fila se scrollea de costado y arranca en lo más nuevo.
- Solo con `?multi=1` (`window.FIN_MULTI`, clase `fin-multi` que esconde el dropdown). Con varios elegidos la página muestra todavía el más nuevo (pasos 5 a 9). Sin el parámetro, nada cambia: verificado contra `main` en los mismos 65 ejercicios de 7 clubes.
- `index.html` (markup `#finYears`, `refreshFinanzas()` llama a `FIN_ANIOS.render()`, Mi Cuenta no guarda una búsqueda sin ejercicios), `js/finanzas-render.js` (`populateFinanzasSelectors()` le pasa el club a `FIN_ANIOS.alCargarClub()`), `js/styles.css`, `data/lang/en.js` (12 claves `finanzas.card.*`). `ASSET_V` 430, `fuentes.html` regenerado.

## Versión 533 — To-do 147, paso 3: el año elegido en Finanzas vive en FIN_SEL, no en el dropdown (2026-10-05)

- `js/finanzas-render.js`: `FIN_SEL` (también `window.FIN_SEL`) guarda la LISTA de ejercicios elegidos; `primary()` es el más nuevo (lo que muestra UN ejercicio: tabla, KPIs, banner de calidad, ficha de fuente) y `lastBalance()` el balance más nuevo elegido (otra liga). Las 6 lecturas de `#anioSelect.value` pasan a `FIN_SEL`; el dropdown escribe con `set()` (su `change`, `populateFinanzasSelectors()` y `reopenSavedSearch()`). Sin cambio visible.
- Verificado contra `main`: 7 clubes (Racing, Boca, Juventus, Köln, Flamengo, Gimnasia, San Lorenzo), 65 ejercicios, mismo texto en tabla, KPIs, deuda, banner y fuente, y el mismo año arrastrado al cambiar de club; cambio de idioma sin pérdida. `ASSET_V` 429, `fuentes.html` regenerado.

## Versión 532 — To-do 147, paso 2: "otra liga" es un card propio (2026-10-05)

- `index.html`: el botón "¿Cómo le iría en otra liga?" sale de la barra de controles (ahí parecía un filtro) y pasa a un card entre Deuda y Gráficos, "<club> en otra liga", que explica qué hace y con qué ejercicio, y un botón "Elegir una liga". `ligaSimYear()`: el ejercicio elegido si tiene balance; si es un presupuesto o un placeholder, el balance más nuevo del club (nunca un presupuesto). `renderLigaSimCard()` lo llena desde `refreshFinanzas()`.
- `js/styles.css` (`.liga-sim-card`), `data/lang/en.js` (`finanzas.ligasim.title/sub/cta`; sale `finanzas.ligasim.btn`). `ASSET_V` 428, `fuentes.html` regenerado.

## Versión 531 — To-do 147, paso 1: en Finanzas el título es el club (2026-10-05)

- `index.html` + `js/selector.js` (`renderFinSelector`, `finSubtitle`): con club, el H1 es el nombre del club y la bajada dice liga · país · cuántos balances y presupuestos hay y de qué ejercicio a cuál (sale de `CLUB_INDEX`; la liga, de `leagueAt` del ejercicio más reciente, y se rearma cuando cargan las tablas de ligas). El card "Cambiar de club" se esconde: repetía el chip del header. Sin club no cambia nada: H1 "Finanzas" y el card para elegir uno.
- `data/lang/en.js`: 6 claves `finanzas.head.*`; salen `finanzas.sub`, `finanzas.sel.change` y `finanzas.sel.sub.club`, que ya no se usan. `ASSET_V` 426, `fuentes.html` regenerado.
- Mockup del rediseño completo (cards de ejercicios, presupuesto y balance, gestión): `Prototyping/Finanzas/mockup-147.html`.

## Versión 530 — To-do 146: el chip del club del header ya no vuelve a un club viejo al cambiar de idioma (2026-10-05)

- `index.html`: el nombre, la línea de arriba y el title del chip ya no llevan `data-i18n` (I18N.apply() guardaba como castellano el nombre de un club y lo reponía); `I18N.onChange` ahora llama a `CLUB_SELECTOR.refresh()`, que faltaba. Verificado en el preview: Bayern Munich → 1. FC Köln, ES → EN → ES, el chip sigue en 1. FC Köln y solo se traduce "Estás viendo". Regla en `Admin/PANTALLA.md`. ASSET_V 424 → 425, audit 0 P0/P1.

## Versión 529 — To-do 142 cerrado: proceso viejo retirado de pipeline.mjs (2026-10-05)

- (a) primer año por la cola y (b) perímetro heredado: ya funcionaban así (`verificar.mjs` caso `primer-anio` salvo que un vecino confirme; `cargar.mjs` Versión 412). Fuera de la lista.
- (c) `tools/pipeline.mjs` hace solo la etapa 2: se sacaron la preparación para Jev (prepare-onboarding, lista de rubros, marca listo-para-jev / sin-rubros), la categorización con Jev y Claude y `--repreparar` / `--solo-preparar`; `--sin-jev` se acepta y no hace nada. Queda el control "sin tablas" (corre sobre todos los validados que no pasaron por el lote, fuera de `--limit`). Ninguna tool se archivó: todas las que usaba siguen en uso por el lote (mapa de llamadas sin comentarios). Saca una trampa: `verificar.mjs` no pisa una marca listo-para-jev de la preparación vieja, y el tablero sugería `pipeline.mjs --ejecutar` sin `--sin-jev`.
- Medido: ensayo de `pipeline.mjs` sobre Clubes/Colombia idéntico salvo un texto; ensayo de `prueba-completa` idéntico.

## Versión 528 — To-do 141 cerrado (2026-10-05)

- La cola humana no necesita ordenarse por impacto, ni volver reglas sus respuestas, ni otra vista: Guido la resuelve con un subagente (Sonnet) que resume los casos. Medido antes de cerrar: 853 casos en su historia, 187 abiertos en el pico (2026-10-02), 54% de categoría; hoy vacía.

## Versión 527 — To-do 140(k) y 140(l) fuera de la lista (2026-10-05)

- (k) diferencias por grupo de países como configuración: sin caso que frene hoy (Vélez 2021 "consolidado" se cargó bien a mano); se resuelve caso por caso si vuelve. (l) presupuestos por el pipeline: 16 de 22 PDFs de presupuesto ya cargados a mano, quedan 5 de Argentina y 1 de España; se cargan a mano. Decisión de Guido.

## Versión 526 — To-do 140(i) y 140(j) fuera de la lista (2026-10-05)

- Decisión de Guido: se dan por hechos; el paso 4 del (i) (la cola para años sin precedente) y el perfil de clubes fuera de Sudamérica (j) van a aparecer solos con los casos.

## Versión 525 — To-do 140(h): en qué escalón salió cada dato (2026-10-05)

- `cargar.mjs` guarda en el `.carga.json` la `procedencia` de las escaleras chicas (año, cierre, perímetro, moneda, tipo de cambio, liga: el texto de `alta-club.mjs` más lo que decide encima del perímetro) y `_fuenteCat` en cada línea. Solo registro: el ensayo de `prueba-completa` da idéntico.
- `tools/escalones.mjs` (`node tools/estado.mjs --escalones`, gratis): junta la etapa 4 (`.validacion.json` → `fuentes` por página) y la 8. `--rehacer-procedencia` completó las 89 propuestas viejas sin tocar `generado`. Primer conteo: páginas confirmadas 438 texto propio / 17 Gemini / 1 Claude; categorías 1.475 escalón 0 / 847 Jev / 199 Claude; tipo de cambio 78 serie oficial / 11 declarado; año 78 nombre confirmado por el contenido / 11 ajuste.
- `Admin/altas-club.jsonl` al día como efecto de correr `alta-club.mjs` (caché por carpeta: Fortaleza, AEL y Juventus ya no figuran "listo-para-alta").

## Versión 524 — To-dos 140(f) y 140(g) cerrados: medidos, sin construir (2026-10-05)

- (f) número citado en el texto: 84 de 88 años ya tienen chequeo cruzado; los 4 restantes no citan el total en prosa. (g) coherencia de categoría entre años: 16 de 18 avisos serían falsos; los errores no volvieron. Detalle en `Admin/HALLAZGOS-pipeline.md`.

## Versión 523 — To-do 140(e) cerrado: medido y descartado (2026-10-05)

- Filtro de identificadores (CNPJ, CPF, 10+ dígitos sin separador) en la validación gratis: 3 de 453 documentos en "revisar" pasan a "listo" y 4 de 467 "listo" empeoran a "no aplica". No entra; detalle en `Admin/HALLAZGOS-pipeline.md`.

## Versión 522 — To-do 140(d) cerrado: premisa vencida (2026-10-05)

- "Reabrir solo el sourcing de un PDF roto" ya lo hace `estado.mjs` desde la Versión 447 (lista el PDF roto con la ficha de `fuentes/` a reabrir). El único caso, Unión Magdalena `dictamen-revisor-fiscal-2021.pdf` (una página HTML guardada como .pdf), ya está documentado en su ficha; volver a bajarlo es sourcing, y SIIS no devuelve la ruta del PDF de 2021 (régimen Pymes).
- Notas de sourcing: los 6 duplicados con años distintos del 140(c) quedaron en `fuentes/<País>/_notas-generales.md` (Colombia, Inglaterra, Kazajistán, República Checa, Portugal).

## Versión 521 — To-do 140(c): PDFs duplicados por huella; 140(b) sin caso (2026-10-05)

- `inventario-transcripciones.mjs`: sha1 de cada PDF (cacheado por tamaño y fecha: la primera corrida hashea 10 GB, las siguientes ~20 s) y estado `duplicado` para las copias idénticas (queda el cargado, si no el que tiene .md, si no el que no se llama como un anexo, si no la primera ruta; un PDF cargado nunca pasa a duplicado). `etapa-doc.mjs` lo nombra (etapa 1); `lote.mjs` lo saltea; `pipeline.mjs` no lo transcribe (elige por estado).
- Medido: 22 grupos idénticos, todos dentro de la carpeta de un club; 20 PDFs pasan a `duplicado` (Elche y Mirassol tienen las dos copias cargadas). 14 iban a transcribirse dos veces. Ensayo de `prueba-completa` idéntico.
- Hallazgo de sourcing: 6 duplicados tienen años distintos en el nombre (Tolima dictamen 2024 = 2025, Santa Fe 2024 = 2023, Surrey 2026 = 2025, Kaspiy 2023 = 2022, Jablonec 2019 = 2018, Benfica 2010-12-06 = 2010-11-11): un año que figura como conseguido falta.
- 140(b) (Gemini sobre escaneos enteros): sin caso hoy (0 documentos sin estado de resultados); queda anotado así en el TODO.

## Versión 520 — To-do 140(a) cerrado (2026-10-05)

- "Resultado final que repite el documento siguiente": medido y descartado (89% de coincidencia en 80 pares; no arregla ninguno de sus 4 casos de Fortaleza CEIF), en `Admin/HALLAZGOS-pipeline.md`. "Costos financieros mal rotulados": descartado por Guido, sin construir. Con el año del nombre ya hecho (Versión 519), el 140(a) sale de la lista.

## Versión 519 — To-do 140(a): el año de un nombre "2017-2016" lo decide el documento (2026-10-05)

- `tools/alta-club.mjs`: un nombre con dos años seguidos que bajan es ambiguo (Goiás "2017-2016" = ejercicio 2017; Suduva "up2021-2020.12.31" = ejercicio 2020). Si las fechas de cierre del .md (evidencia fuerte, la de siempre) son de uno de los dos, gana ese; si no, la regla de siempre. Antes Goiás daba 2016 y lo aceptaba porque 2016 "está presente en el .md" (la columna comparativa).
- Medido en sandbox sin los 10 ajustes `anio`: Goiás 11 de 11 correctos (antes 0 de 11), incluido `balanco-publicado-2024-2023` (2024; no está cargado, el lote 09 lo dejó afuera). Suduva y Transinvest sin cambios (sin transcripción). Ensayo de `prueba-completa` idéntico. Descartado "si baja, el primero" (rompe Suduva): `Admin/HALLAZGOS-pipeline.md`.

## Versión 518 — To-do 140(i), paso 3: `cargar.mjs` aplica "Posiblemente dentro de otro rubro" al escribir (2026-10-05)

- `cargar.mjs --escribir` llama a `marcarClub()` de `tools/dentro-de-otro.mjs` sobre el club entero, antes de publicar (un P0/P1 revierte todo junto): el año nuevo nace con sus marcas y un año viejo gana o pierde las suyas si el nuevo le cambia el precedente. Imprime las marcas del club en la salida.
- Probado en sandbox: Fortaleza CEIF sin marcas, `cargar.mjs` 2017 `--reemplazar --escribir` → vuelven las marcas de 2017 y de 2018. Ensayo de `Admin/prueba-completa.txt` (87 documentos) idéntico antes y después. `dentro-de-otro.mjs --todos --escribir` sobre el sitio: 102 → 102, no escribe nada.
- `Admin/PIPELINE.md` al día (escalera de la etapa de carga). La skill de onboarding no cambia: no hay un paso más.

## Versión 517 — To-do 140(i), paso 2: "Posiblemente dentro de otro rubro" por precedente del club (2026-10-05)

- `tools/dentro-de-otro.mjs` (nuevo, gratis): corre el motor de la página en Node (`js/finanzas-calc.js` expone `window.SIMPLIFIED_BUCKETS`) y, si una fila está en "—" por un renglón sin desglosar y tiene plata en todos los otros balances desglosados del club (al menos 2, sin presupuestos), escribe `incluidoEn` con `posible:true, por:'precedente'`. Escalón 0: `incluye` y `cero-real` de Guido. Reescribe sus propias marcas en cada corrida (idempotente; una que deja de cumplir la regla se borra).
- Backtest: 0,8% de marcas falsas (11 de 1.394); la variante "en algún otro año", 7,4%, descartada (`Admin/HALLAZGOS-pipeline.md`). Probado en sandbox: segunda corrida idéntica, `cero-real` y precedente perdido borran la marca, las marcas manuales no se tocan.
- Escrito: 70 filas (102 marcas por categoría) en 16 años de AEL Larissa, Alianza Lima, Argentinos, Bayern, Fortaleza CEIF, San Lorenzo y Unión. Ningún número cambia: `auditAll()` 1.136 OK, los 3 que no cierran de siempre (Bayern); verificado en el navegador (Bayern 2021, Unión 2024-2025, AEL 2018, Fortaleza 2017). Rankings regenerados. ASSET_V 423 → 424, audit 0 P0/P1.
- To-do 148 nuevo: 6 falsos positivos de `checkFxSanity()` en años viejos (UC 2010-2013, Juventus 2008 y 2011).

## Versión 516 — Simulador de Ligas traducido al inglés (2026-10-05)

- 13 claves `liga.sim.*` que un visitante en inglés veía en castellano desde que existe el simulador (to-do 83): aparecieron cuando `js/liga.js` entró al chequeo de i18n de `audit.js` (Versión 515). Traducidas en `data/lang/en.js`. ASSET_V 422 → 423, audit 0 P0/P1, P3 113.

## Versión 515 — To-do 140(i), paso 1: "Dentro de otro rubro" con bocadillo (2026-10-05)

- Finanzas y Ligas: la fila con `incluidoEn` dice "Dentro de otro rubro" / "Posiblemente dentro de otro rubro" (textos de Guido) y el rubro va en un bocadillo (hover o tap): "Sospecho que está dentro de X: no es un cero, pero la fuente no lo aclara o es confusa." Comparar: "está dentro de" / "posiblemente está dentro de". Inglés: "Within another line" / "Possibly within another line".
- `js/info-tip.js` nuevo: el bocadillo del "?" del selector, sacado de `js/selector.js` y compartido (delegación con `data-info-tip`). El "?" del selector, probado: abre, no selecciona el país, cierra afuera.
- `tools/audit.js`: `js/liga.js` entra en el chequeo de i18n (llamaba a `t()` y no estaba); aparecen 13 claves del simulador de Ligas sin traducir (P3, se traducen aparte).
- Verificado en el preview: América Mineiro 2023 (Finanzas, ES/EN, desktop y mobile con tap) y Série B 2025 (Ligas). ASSET_V 421 → 422, audit 0 P0/P1.

## Versión 514 — To-do 139 diagnosticado (2026-10-05)

- El defecto D (`compararVecino` sin ajustes `fila`) explica 1 solo de los 7 "NO" de año vecino de todas las verificaciones (Juventus 2005); los otros son reexpresiones reales (Juventus 2006 IFRS, 2010 TV centralizada) y UC 2009 (sin estado extraído). Sin daño: nada cargado distinto, cola vacía.
- Probado en un sandbox con `Admin/prueba-completa.txt` y descartado: usar el total con el que cerró cada documento (arregla 2005, rompe 2003 y 2004). El 139 queda reescrito con el diagnóstico; el descarte, en `Admin/HALLAZGOS-pipeline.md`. Sin cambios de código.

## Versión 513 — To-do 143: caja-deuda no confunde un importe chico con un número de nota (2026-10-05)

- `tools/caja-deuda.mjs` (`columnasDeNotas`): la referencia a nota pasa a ser una escalera. Si la tabla tiene una columna de notas inequívoca (en las filas con la cantidad de celdas más común, todas sus celdas con número son "4", "5,6", "18/26"…, al menos 2) y la cifra está a su derecha, es un importe; si no, la regla de siempre. Aprobado por Guido.
- Medido: 181 filas cambian en las 2.298 transcripciones (muestra de 12 documentos revisada: todas pasan a leer el año en curso); `--medir` deuda 47 → 48 iguales (Novorizontino 2018), ningún distinto nuevo, caja idéntico; `--club novorizontino-br` idéntico. Dos versiones más amplias, descartadas: `Admin/HALLAZGOS-pipeline.md`.
- Dato publicado mal, corregido en `data/` y con ajuste `deuda`: Novorizontino 2019 deuda 32,32 → 32,323 (había leído "Empréstimos" 24, de 2018, en vez de 27; la compuerta lo dejó pasar por la tolerancia de redondeo). ASSET_V 420 → 421, generadores corridos, audit 0 P0/P1.
- To-do 143 cerrado; lo que no cubre (tablas sin columna de notas) queda como to-do 145.

## Versión 512 — To-do 138 cerrado (2026-10-05)

- Auditoría de los clubes del pipeline (`auditorias/2026-10-04-clubes-pipeline.md`): los 13 hallazgos y las 3 dudas de otros clubes resueltos (Versiones 492-511). Queda anotado en el archivo el d) de caja y deuda de Juventus, que no se sigue sin un caso nuevo.

## Versión 511 — "Incluido en" en el pipeline (ajuste `incluye`) y "Posiblemente incluido en" (2026-10-05)

- `tools/ajustes.mjs`: campo `incluye` (`--valor <categoría en 0> --categoria <donde está> [--posible]`). `tools/cargar.mjs` lo escribe en `fiscalYearMeta.incluidoEn` y no trata esa categoría como un 0 a revisar (ni reintento ni pregunta de perfil en la cola). Probado con un ajuste temporal sobre UC 2016 (la propuesta lleva el `incluidoEn`, sin frenos); revertido.
- Forma "no confirmado": `{ member_dues: { en: 'other_income', posible: true } }` → "Posiblemente incluido en" / "Possibly included in", en Finanzas, ligas y Comparar ("puede estar incluido en"). América Mineiro 2023-2025 pasa a esa forma (recomendación aceptada por Guido).
- 6 ajustes `incluye` (Bahia 2024-2025, Vitória 2025, América Mineiro 2023-2025). Rankings regenerados. ASSET_V 419 → 420.

## Versión 510 — "Incluido en …" también en las páginas de liga y en Comparar (2026-10-05)

- `tools/generate-rankings.js`: cada club lleva, aparte de `mix` (que sigue sumando el ingreso), `incluidos: [[fila, fila que la contiene]]`; `js/liga.js` lo muestra en el desglose por categoría ("Cuotas Sociales · Incluido en Estadio"), también en las filas simuladas. Rankings regenerados: Bahia, Vitória y América Mineiro en Série A y B.
- `js/selector.js` (Comparar): aviso debajo de la tabla con las filas incluidas en otra ("Bahia 2025: Cuotas Sociales está incluido en Estadio"); la mezcla no cambia. Claves en inglés en `data/lang/en.js`. Verificado en el navegador. ASSET_V 418 → 419.

## Versión 509 — "Incluido en …": la fila que el documento junta con otra deja de mostrar $0 (paso 1: dato y Finanzas) (2026-10-05)

- `fiscalYearMeta[año].incluidoEn` (ej. `{ member_dues: 'matchday_competition' }`): `bucketize()` (`js/finanzas-calc.js`) marca la fila que da 0 con la etiqueta de la fila que la contiene, y `js/finanzas-render.js` pinta "Incluido en <fila>" (es) / "Included in" (en), con "—" en el %. El valor sigue siendo el número 0: los totales no cambian (verificado: `auditAll()` igual que antes).
- Datos: Bahia 2024-2025 (socios dentro de Estadio), Vitória 2025 (dentro de Premios por competencias), América Mineiro 2023-2025 (dentro de Otros ingresos). Regla en `Admin/CONVENCIONES-DATOS.md`. ASSET_V 417 → 418.
- Pendiente (pasos siguientes): rankings y Comparar; ajuste `incluye` en el pipeline (`cargar.mjs`) y que `audit.js` lo respete.

## Versión 508 — Grêmio: "Receitas Patrimoniais" confirmado como cuotas sociales (2026-10-05)

- Duda de la auditoría 2026-10-04 cerrada con evidencia del documento (política de reconocimiento, nota 29 de voluntariado, "Ingressos a Sócios" y mensalidades anticipadas), escrita en el comentario de `data/gremio-data.js`. Sin cambio de datos. ASSET_V 416 → 417.

## Versión 507 — Almagro: "Sede Social - Medrano 522" queda como cuotas sociales, decisión de Guido (2026-10-05)

- Duda de la auditoría 2026-10-04 cerrada: la decisión queda escrita en el comentario de categorización de `data/almagro-ar-data.js` para que una auditoría no la reabra. Sin cambio de datos. ASSET_V 415 → 416.

## Versión 506 — Fortaleza CEIF: los auxilios de la Dimayor, a premios de competición en todos los años (2026-10-05)

- Auditoría 2026-10-04, hallazgo 12: "Auxilio de arbitraje / transporte / hotelero" estaban en `competition_bonus` unos años (2019, 2020, 2022, 2025; ajuste de Guido de 2020) y en `other_income` otros. 9 filas de 2019-2024 pasan a `competition_bonus` (0,73 M COP en total); "Otros auxilios", bioseguridad y análisis deportivo quedan en `other_income`. Totales sin cambios.
- Ajustes `categoria` por año. En 2023 el ingreso "Auxilio de transporte" pasa a "Auxilio de transporte (Dimayor)": la categoría por etiqueta no distingue mayúsculas y la nómina del equipo tiene "Auxilio de Transporte" (se habría mudado de lado). ASSET_V 414 → 415.

## Versión 505 — Deducciones de ingresos que el documento no abre: regla escrita y hallazgos silenciados (2026-10-05)

- Auditoría 2026-10-04, hallazgo 11 (Goiás 2008-2017, "(-) Dedução da receita" entera en `other_income`): no se corrige, es el criterio. Regla nueva en `Admin/CONVENCIONES-DATOS.md`: una deducción que el documento no abre por tipo de ingreso va entera a `other_income`; no se reparte.
- `tools/audit-ignore.json`: 7 entradas verificadas contra el documento (deducciones de Goiás 2012-2017, que el vocabulario de `audit.js` no reconoce en plural, y la reversión de provisiones de Goiás 2013). Auditoría: P2 41 → 34.
- Hallazgo 13 (SENA de Fortaleza): sin cambios, ya sigue el criterio de nómina de la Versión 500.

## Versión 504 — Fortaleza CEIF: caja 2019-2022 y deuda 2022-2023 con ajustes manuales (2026-10-05)

- Auditoría 2026-10-04, caja y deuda: el dato está en el cuadro de instrumentos financieros o en la nota de efectivo, no en las páginas del balance que lee `caja-deuda.mjs`. Caja 2019 169.648 (total de la nota 8), 2020 151.365 (bancos + caja), 2021 20.036, 2022 241.766; deuda 2022 238.144 y 2023 110.000 (préstamos y sobregiros bancarios, criterio del club). Cada número leído en el documento; 6 ajustes `caja` / `deuda`, escritos por `caja-deuda.mjs --club fortalezaceif-co --escribir` (escalón 0, sin IA). Fortaleza queda con caja y deuda en 2017-2025. ASSET_V 413 → 414.

## Versión 503 — Novorizontino: deuda 2018 y 2020-2022 con ajuste manual `deuda` (2026-10-05)

- Auditoría 2026-10-04, caja y deuda: con el criterio del club (préstamos + débitos con partes relacionadas, corrientes y no corrientes; confirmado con la columna 2019 del balance 2020 = 32.323, lo cargado): 2018 27,491 M; 2020 40,059 M; 2021 51,884 M (el documento 2022 imprime 51.883.784 para 2021); 2022 70,311934 M. Cada número leído en el balance y cargado con su ajuste; probado que `caja-deuda.mjs` lo reproduce con el año en null.
- 2018: la herramienta proponía 27,51 porque leía "Empréstimos" 43 (2017): tomaba el 24 por número de nota. Anotado en el TODO. ASSET_V 412 → 413.

## Versión 502 — caja-deuda.mjs: un valor aceptado en la misma corrida ya no sirve de vecino (2026-10-05)

- `tools/caja-deuda.mjs --club`: hasta acá (Versión 356) un valor completado en la corrida contaba como cargado para el año siguiente, y un error se encadenaba (probado: la caja chica de Fortaleza 2020 validaba la de 2021 y esa la de 2022). Ahora el vecino es solo lo cargado en el sitio o el documento vecino.
- Medido: `--medir` idéntico; ensayo de completar en todos los clubes: Goiás caja 2022-2024 dan el mismo valor, ahora validados contra el documento siguiente; 2009 y 2025 quedan sin dato (solo se validaban en cadena). Ningún valor cambia.
- Probados y descartados en la misma sesión (ver `Admin/HALLAZGOS-pipeline.md`): "-" como 0, vecino por importe y caja en las notas.

## Versión 501 — Juventus 2006 y 2007: nota visible del cambio de normas contables (2026-10-05)

- `publicNote` en las fuentes 2005-06 y 2006-07 (texto propuesto por la auditoría 2026-10-04, aprobado por Guido, corregido por la Versión 492: los 30 M€ de Mediaset ya están en Televisión y en otros ingresos quedan los 13,75 M€ de la RAI). Cifras verificadas: pérdida −36.480.230 € con normas italianas (informe 2005-06, L1722) y −45.986.220 € reexpresada con IFRS (informe 2006-07, L1652). ASSET_V 411 → 412.

## Versión 500 — Fortaleza CEIF 2019-2025: la nómina administrativa sale de "Salarios del plantel" (2026-10-05)

- Auditoría 2026-10-04, hallazgo 6, decisión de Guido: cuando el documento separa la nómina de la nota de gastos de administración de la del equipo (2019-2025), la de administración va a `admin_general_expense`, como en UC y Goiás; reemplaza la respuesta anterior de la cola (todo a `wages_squad`). 25 renglones, 5.732 M COP en total; quedan con la etiqueta "… (administración)". 2017 y 2018 no cambian: ahí el documento no separa (la única nómina, con el plantel, está en administración u operación).
- 70 ajustes (`fila` + `categoria`) en 2019-2023 y 2025, con dos casos de etiqueta repetida resueltos con etiqueta propia: "Bonificaciones (2ª fila)" (dos filas en la nota de ventas 2023) y el ingreso "Auxilio de transporte" 2023 (misma etiqueta que una fila de la nómina). `verificar.mjs`: los seis años dan los mismos totales que antes. 2024 sin ajustes: la verificación de hoy no abre esa nota. ASSET_V 410 → 411.

## Versión 499 — Goiás 2012 y 2013: gastos desde la nota por segmento; sueldos del plantel 25,5 M y 31,9 M (2026-10-05)

- Auditoría 2026-10-04, hallazgo 5: `wages_squad` en 0 y los gastos de fútbol en bolsón (35,8 M y 44,6 M). La nota de costos y gastos (2012: nota 20, pág. 3; 2013: nota 18, pág. 18) viene por segmento y su columna TOTAL suma exacto los renglones del estado; la auditoría no cerraba porque comparaba profesional + base contra el renglón "futebol" del estado, que reparte distinto. Se cargan las filas de la nota; "Despesas com pessoal" se parte: futebol profissional → `wages_squad`, social e administrativo → `admin_general_expense` (el documento separa la nómina administrativa: criterio de la etiqueta "Salarios del plantel" y de UC).
- 18 ajustes `fila` + 8 `categoria`; `verificar.mjs` cierra los dos años (2013 en la lectura 4: la reversión de provisiones 1.588.481,02 impresa en positivo resta). ASSET_V 409 → 410.

## Versión 498 — AEL Larissa 2023: gastos por naturaleza, sueldos 2,06 M€ (2026-10-05)

- Auditoría 2026-10-04, hallazgo 8: 2023 estaba cargado por función (Κόστος πωλήσεων 1,59 M€ en bolsón) y `wages_squad` en 0; ahora con la nota 16 por naturaleza, como 2022 y 2024 (Αμοιβές και έξοδα προσωπικού 2.062.578,73 → `wages_squad`). Las seis filas suman 2.737.531,21 = estado; el Σύνολο impreso de la nota (2.745.139,63) suma además los gastos bancarios de la nota 18.
- 6 ajustes `fila` (3 con `reemplaza`) + 1 `categoria`; `verificar.mjs` cierra con ellos. ASSET_V 408 → 409.

## Versión 497 — Goiás 2025: Earn In y "Outras Receitas (b)" a ítems excepcionales (2026-10-05)

- Auditoría 2026-10-04, hallazgo 10: la nota 22 "Outras Receitas e Despesas Operacionais" (Earn In de la Liga Forte União 7,98 M y Outras Receitas 1,44 M) estaba en `other_expenses` / `other_income`; en 2024 el mismo rubro está en `exceptional_items`. Las dos filas pasan a `exceptional_items` (la de ingreso se muda de lado con el mismo efecto en el resultado); totales oficiales sin la partida, como los calcula `cargar.mjs`. 2 ajustes `categoria`. ASSET_V 407 → 408.

## Versión 496 — AEL Larissa: "Λοιπά έξοδα και ζημιές" a ítems excepcionales, 2016-2025 (2026-10-05)

- Auditoría 2026-10-04, hallazgo 9: el renglón es "Έκτακτα κι ανόργανα έξοδα" (gastos extraordinarios y no operativos) según la nota de 2019-2025; 2016-2017 sin nota, mismo renglón del estado ΕΛΠ. Era `other_expenses`; 2024: 1,63 M€, el 46% del gasto.
- 10 ajustes `categoria` (uno por año) y `officialTotalExpenses` de cada año sin la partida, como lo calcula `cargar.mjs` (los excepcionales van aparte del total de gastos). Resultado del ejercicio sin cambios. ASSET_V 406 → 407. Auditoría 0 P0 / 0 P1.

## Versión 495 — Fortaleza CEIF 2021: deuda 102,5 → 295,8 (ajuste manual `deuda`, nuevo) (2026-10-05)

- Auditoría 2026-10-04, hallazgo 7: el escalón 2 de `caja-deuda.mjs` había leído solo el corto plazo ("Total Prestamos y Sobregiros", nota 12); la deuda bruta es "Préstamos y sobregiros bancarios" 295.846 del cuadro de instrumentos financieros (nota 5.A, .md L506; 2020 en el mismo cuadro, 188.997, coincide con lo cargado).
- `tools/ajustes.mjs`: campo `deuda` (el número tal cual impreso), igual que `caja`; `tools/caja-deuda.mjs` lo toma como escalón 0. Probado con 2021 en null: propone 295.846 por el ajuste. ASSET_V 405 → 406.

## Versión 494 — La cabecera de cargar.mjs dice qué escribe la propuesta (2026-10-05)

- `tools/cargar.mjs`: decía "propuesta: no escribe nada"; no toca el sitio, pero escribe a propósito en la cola, en los precedentes aprendidos y el briefing (así le hace preguntas el lote). Solo documentación.

## Versión 493 — Los ajustes `fila` llevan su signo en la lectura 4 de verificar.mjs (2026-10-05)

- `tools/verificar.mjs`: en la lectura 4 (signos impresos), un ajuste `fila` entra con su signo relativo a la mayoría de los ajustes de su lado; en las demás lecturas sigue con valor absoluto. La escalera prueba las dos formas y gana la que cierra (pedido de Guido: nada de regla fija).
- Caso: Goiás 2016, "(-) Deduções das receitas" (7.401.426,19) entre las partes de la nota 17: pasa de "cola" (ingresos 97,8 M contra 83,0 M impresos) a cerrar en la lectura 4. Medido con `verificar.mjs --lista Admin/prueba-completa.txt`: 1 de 87 documentos cambia (ese); los otros 86, idénticos.

## Versión 492 — Auditoría de los clubes del pipeline: hallazgos 1 a 4 corregidos (to-do 138) (2026-10-05)

- Goiás 2016: ingresos y gastos de fútbol abiertos con las notas 17 y 18 (antes, dos bolsones con `sinDesglose` falso); TV 53,9 M, transferencias 24,1 M y sueldos 30,1 M dejan de verse en 0.
- Fortaleza CEIF 2025: "Legales" y "Arrendamientos" abiertos en sus partes (Derechos Deportivos 3.483 M COP a `player_amortisation`, Alquiler Terrenos a `match_organisation_expense`); 2024: "Legales" 163,6 abierto igual.
- Juventus 2006: los 30 M€ de opciones de TV a RTI salen de `other_income` a `broadcasting`.
- Universidad Católica 2016: "Remuneraciones" 447,5 M CLP de la nota de administración pasa a `admin_general_expense` con etiqueta propia.
- Corrección a mano de `data/*.js` (pedido de Guido: sin API) + 41 ajustes en `Admin/ajustes-manuales.jsonl` para que el pipeline lo reproduzca; `verificar.mjs` cierra con los ajustes en Fortaleza 2025, Juventus 2006 y UC 2016. Goiás 2016 queda pendiente del signo de la deducción en el ajuste `fila`. ASSET_V 404 → 405; rankings y página de fuentes regenerados. Auditoría 0 P0 / 0 P1; `auditAll()` sin cambios en lo que no cierra (Bayern, redondeo).

## Versión 491 — Lo aprendido en el sourcing de Europa del Este, a la skill (ex to-do 136) (2026-10-05)

- `club-sourcing`, aprobado por Guido: 17 archivos de país nuevos en `paises/` (Armenia, Azerbaiyán, Bielorrusia, Bosnia, Bulgaria, Eslovaquia, Eslovenia, Estonia, Georgia, Hungría, Kazajistán, Letonia, Lituania, Macedonia del Norte, Polonia, Rumania, Serbia) con su línea en el índice; `Rusia.md` (endpoints `details` JSON y `XLS`), `Croacia.md` (Slaven y Varaždin por CDX de dominio) y `Ucrania.md` (Dynamo Kyiv deja de ser dead-end, Shakhtar, Oleksandriya por Wayback, 14 de 16).
- SKILL.md 0.1: la licencia nacional de la federación como canal en Europa, la mediateca de WordPress (`wp-json/wp/v2/media`) y validar cada captura de Wayback con `pdfinfo` + `curl --compressed`.
- Borradas las secciones de texto propuesto de `fuentes/<País>/_notas-generales.md`; corregidas las secciones viejas de dead-ends y Oleksandriya en la nota de Ucrania. Peso de `club-sourcing` en la skill de arranque: 33 → 42 KB.

## Versión 490 — Lo aprendido en el sourcing de Sudamérica, a la skill (ex to-do 132) (2026-10-05)

- `club-sourcing`, aprobado por Guido: `paises/Brasil.md` (otros deportes, Google Drive, portales que bloquean curl, `.PDF` en minúscula; Juventude deja de ser dead-end), `Chile.md` (wp-json, Palestino), `Colombia.md` (subvisor desde el url de documentos-adicionales; 404 = sin documentos), `Uruguay.md` (Peñarol 2018 por el dominio punycode), `Ecuador.md` (informes a socios), `Peru-Paraguay-Bolivia-Venezuela.md` y SKILL.md 0.1 (quedarse con la captura de Wayback más grande).
- `Admin/propuestas-skills-sudamerica.md` borrado (aplicado); to-do 132 cerrado.

## Versión 489 — Siete series de tipo de cambio más: SEK, PLN, HRK, JPY, CNY, MXN y PEN (to-do 112) (2026-10-04)

- `tools/fetch-fx-reference.mjs`: SEK (Riksbank), PLN (NBP, tabla A), HRK (HNB, tipo medio, hasta 2022-12-31), y JPY, CNY y MXN (Reserva Federal H.10 vía FRED). PEN, del Banco de Pagos Internacionales (BIS), que la recibe del BCRP: el BCRP, la SBS y la SUNAT bloquean la descarga automática. Series nuevas en `tools/fx-reference/`; son 21 monedas en total.
- `tools/lookup-fx-close.js` y `tools/alta-club.mjs` (`SERIES_FX`) las leen.
- Verificadas contra el cruce del BCE (diferencias entre 0% y 1,2%, por la hora de fijación) y contra los tipos que declaran los documentos: HRK exacto en Dinamo Zagreb 2020 y 2021; MXN −0,02% en Atlas 2019 y −0,06% en América 2024; CNY −0,21% en Guangzhou 2019; PEN exacto en los cierres 2023 y 2024 de Alianza Lima (tipo contable SBS) y +0,09% en 2022.
- `data/currency-map.js`, `FX_PLAUSIBLE_RANGE`: COP [2500, 5000] → [1600, 5500] y BRL [3, 7] → [1,4; 7,5], según las series. Novorizontino 2010 (BRL 1,6662) quedaba afuera del rango viejo. ASSET_V 403 → 404; generadores corridos.
- TODO 112: salen los perímetros resueltos como consolidado y las preguntas de `--dudas` (se ven al trabajar cada club), la corrida de Claude de los 91 documentos y las series.
## Versión 488 — estado.mjs estima la etapa 2 por páginas (ex to-do 140m) (2026-10-04)

- `tools/estado.mjs`: un PDF sin `.md` cuesta páginas × US$ 0,0086 (la misma cuenta que el ensayo de `pipeline.mjs`), con las páginas de `Admin/.paginas-cache.json`; si el PDF no está en la caché, sigue en US$ 0,20. Lazio: ~US$ 4 → ~US$ 25 (el ensayo da 25,60). Todo el inventario sin `.md`: ~US$ 910 → ~US$ 1.068. El resto del tablero, idéntico.

## Versión 487 — La cola cierra sola los casos de años ya cargados (ex to-do 141a) (2026-10-04)

- `tools/cola.mjs`: `cerrarCargados()`, que corre al listar: cierra como "obsoleto" los casos pendientes de `verificar` y de `cargar · perimetro` cuyo año ya está en el sitio (registro o `.carga.json` + `fiscalYearMeta`, como lote.mjs). Nunca categoría ni perfil; un caso reabierto no se vuelve a cerrar. Cerró los 11 de Juventus.
- Medido sobre copias de la cola: las respuestas que leen las tools, idénticas (600 → 600); 0 casos de categoría cerrados (43 de 43 siguen); un caso vuelto a levantar reaparece; ensayo del lote de `prueba-completa` idéntico; propuesta de carga de los 87 documentos idéntica con y sin el cambio.
- `Admin/PIPELINE.md`, cola humana: la regla.

## Versión 486 — CLAUDE.md de 30 a 6 KB; to-do 143 cerrado (2026-10-04)

- `CLAUDE.md` reescrito corto: separación del sitio profesional, netlify, dónde va un documento, archivar, al empezar, antes de terminar, cada PDF nuevo, precisión y punteros a las trampas.
- Movido sin cambios: carpetas de `Clubes/`, transcripción y trampas de PDF/grep a `Admin/PIPELINE.md` ("Documentos fuente"); trampas del navegador a `Admin/PANTALLA.md`; agentes en paralelo y el Browser a la skill `club-sourcing`. Original en `Admin/Archive/CLAUDE-md-hasta-2026-10-04.md`.
- To-do 143 cerrado: lo que se lee al arrancar bajó de ~225 KB a ~45 KB.

## Versión 485 — ESTADO sin la descripción del sitio (to-do 143, paso 3) (2026-10-04)

- `Admin/ESTADO.md` (50 → 11 KB): queda el estado (objetivo, pipeline, sitio, analytics, datos, "Si algo no cierra").
- A `Admin/ARQUITECTURA.md`: convención de archivos, taxonomía del selector, liga por ejercicio, tamaño de liga, índice liviano, verificación automática, fuentes, procedencia del fx y "Dónde está cada cosa". A `Admin/PANTALLA.md`: presupuestos por club, pestañas, Ligas, simular clubes, selector, portada, Comparar, toggles, idiomas, caché de assets y branding. Texto sin cambios.
- `Admin/Archive/estado-historia.md`: por qué es un archivo, el retiro de los placeholder y la copia del párrafo de netlify.
- Skill de arranque: pesos de ESTADO (11), ARQUITECTURA (60) y PANTALLA (63).

## Versión 484 — Mantener instalaciones va a Administración: Argentinos y San Lorenzo (to-do 101) (2026-10-04)

- Criterio (Guido): el costo de mantener instalaciones (estadio, predios, ciudad deportiva, sedes) es `admin_general_expense`.
- `data/argentinosjuniors-data.js`: "Estadio y predios" 2015 y "Sueldos y cargas sociales (Estadio y predios)" 2016-2018, de `match_organisation_expense` a `admin_general_expense` (la columna de la sección es mantenimiento, servicios, impuestos y personal; 2019 ya estaba así).
- `data/sanlorenzo-data.js`: "Ciudad deportiva (gasto)" y "Subsedes" 2014, de `other_expenses` a `admin_general_expense`, como 2011.
- Totales sin cambio; `auditAll()` sin "no cierra" de los dos. ASSET_V 402 → 403; generadores corridos.

## Versión 483 — Estudiantes: "Reconocimientos y premios" en sueldos del plantel todos los años (to-do 101) (2026-10-04)

- `data/estudianteslp-data.js`: 2022, 2023 y 2024 pasan de `match_organisation_expense` a `wages_squad`, como 2025 (columna de los sueldos de los jugadores en el anexo de gastos; la memoria: "reconocimientos con el plantel profesional"). Totales sin cambio; `auditAll()` sin "no cierra" de Estudiantes. ASSET_V 401 → 402; generadores corridos.

## Versión 482 — pipeline.mjs con la numeración de etapas de PIPELINE.md (ex to-do 140n) (2026-10-04)

- `tools/pipeline.mjs`: "Etapas 1-2: transcribir y validar" pasa a "Etapa 2 (Admin/PIPELINE.md)"; preparar para Jev, Jev y Claude por API se rotulan "Proceso viejo" (el lote los hace en su etapa 7). Solo texto en pantalla; el ensayo corre igual.

## Versión 481 — Argentina con su archivo en la skill de sourcing (ex to-do 93) (2026-10-04)

- `.claude/skills/club-sourcing/paises/Argentina.md` (nuevo, texto aprobado por Guido): sitio oficial primero, IGJ bloqueada (gestión de Guido), CNV/AIF para los clubes que emiten deuda, Reddit no rinde. La skill lo lista en el índice de países y deja de decir que Argentina va aparte.
- Skill de arranque: el TODO pesa 23 KB. To-do 93 borrado.

## Versión 480 — River 2021 y 2024 con "Fútbol Profesional" abierto; TODO más corto (2026-10-04)

- `data/river-data.js`: "Fútbol Profesional" (Anexo VII) en sus 4 renglones con categoría propia, 2021 y 2024 (ex to-do 102): venta de jugadores → `player_sales`, TV → `broadcasting`, publicidad → `sponsorship_commercial`, "Ingresos torneos nacionales e internacionales" → `matchday_competition` (es taquilla: $2,3 M en 2021, sin público). Totales sin cambio; `auditAll()` sin "no cierra" de River. ASSET_V 400 → 401; generadores corridos (el ranking de `ar-primera` muestra el desglose).
- `Admin/TODO.md`: borrados 95, 97 y 99 (resueltos o superados), 34 (sin acciones) y 102 (hecho); 23(d) con la propuesta de deflactar por el IPC de EE.UU. y el pedido de comparar el club contra sí mismo; 144(a) descartado por Guido (anotado en la nota de Estados Unidos) y 144(b) fusionado en el 130; 143 al día.

## Versión 479 — Dos decisiones de producto, de las notas de sourcing al TODO (2026-10-04)

- To-do 144: TKO/Endeavor/Formula One Group (de la nota de Estados Unidos) y abrir béisbol con Diablos Rojos (de la nota de México), con la aclaración de que Diablos ya está sourceado. En las notas queda un puntero.

## Versión 478 — El TODO, sin el sourcing por país y sin leerse al arrancar (to-do 143, paso 2) (2026-10-04)

- 24 puntos de sourcing (50, 59, 100, 113-129, 131, 133-135) del TODO a `fuentes/<País>/_notas-generales.md`, partidos por país sin reescribir (sección "Pendientes (venían del TODO)"); 22 notas de país nuevas. `Admin/TODO.md`: 55 → 32 KB.
- La lista "sacados el 2026-09-14" a `Admin/Archive/todo-sacados-2026-09-14.md`; en "Cómo leer esta lista", que los pendientes de sourcing de un país viven en su nota.
- `CLAUDE.md` y skill de arranque: `Admin/TODO.md` ya no se lee al arrancar (pedido de Guido); se abre para elegir qué sigue, cuando Guido lo pide o para agregar/borrar un punto.
- Párrafo de `netlify.toml` en `CLAUDE.md` y `Admin/ESTADO.md`: 1144 notas de `fuentes/`.

## Versión 477 — CONVENCIONES partido en proceso, datos y pantalla (to-do 143, paso 1) (2026-10-04)

- `Admin/CONVENCIONES.md` (58 → 13 KB): quedan las 5 reglas de proceso y un índice de 1 línea por regla mudada.
- `Admin/CONVENCIONES-DATOS.md` (nuevo): las 16 reglas de datos. `Admin/PANTALLA-FINANZAS.md` → `Admin/PANTALLA.md`, con las 25 reglas de pantalla y código al final. Texto sin cambios.
- `Admin/Archive/convenciones-historia.md`: la regla de la Versión 49 y la copia del párrafo de `netlify.toml`.
- Skill de arranque: filas 2, 2c y 3b de la tabla y dónde va una regla nueva; skill de onboarding y `club-nuevo.md`: `PANTALLA.md`. Referencias repuntadas en `audit.js`, ARQUITECTURA y el Archive.

## Versión 476 — Ajustes al onboarding tras la prueba con Lazio (2026-10-04)

- Skill `club-or-year-onboarding`: la etapa 2 la corre `pipeline.mjs --sin-jev --max-paginas 0` (no `mistral-ocr-transcribe.mjs`); los documentos sin estado de resultados se le proponen a Guido para `Admin/documentos-descartados.txt`; trampa: los ensayos reescriben el registro y la lista de la corrida.
- `Admin/ESTADO.md`, `CLAUDE.md` ("Cada PDF nuevo") y `Admin/COMO-CORRE-EL-PROYECTO.html`: la etapa 2 es `pipeline.mjs`.
- `Admin/PIPELINE.md`, decisión 7: con los dos estados en un documento, se carga el individual salvo que una controlada concentre ingresos.
- To-dos 140(m) (`estado.mjs` estima la etapa 2 por documento y no por páginas) y 140(n) (`pipeline.mjs` numera las etapas como el proceso viejo).

## Versión 475 — Limpieza de lo que quedó del onboarding manual (2026-10-04)

- `Admin/ESTADO.md`: un solo bloque del pipeline, sin historia; el proceso viejo (`pipeline.mjs`) como referencia; inventario al día (6.825 PDFs, 517 cargados, 4.550 sin `.md`).
- `Admin/TODO.md`: los to-dos 98, 105, 85, 89 y 108 a `Admin/Archive/todos-cerrados-onboarding-manual.md` (tal cual); el 112 reescrito con lo que sigue vivo, verificado (11 preguntas de perímetro, 91 documentos sin preguntar, faltan las series SEK y PLN, rangos de COP y BRL).
- `Admin/COMO-CORRE-EL-PROYECTO.html`: la sección "Onboardear un club" describe el pipeline (9 etapas, cola humana, caja y deuda, lo que queda a mano); pesos y descripción del skill de onboarding y de ARQUITECTURA al día.

## Versión 474 — El arranque y CLAUDE.md, alineados con el skill de onboarding nuevo (2026-10-04)

- `start-session-finance-of-sports-project`: si la tarea es onboarding o el pipeline, el arranque es el de `club-or-year-onboarding`; tabla con `Admin/PANTALLA-FINANZAS.md`, pesos al día (ARQUITECTURA 38 KB, onboarding 9 KB) y `club-data-mapping` solo para cargas a mano.
- `CLAUDE.md`: `club-or-year-onboarding` es el skill del onboarding con el pipeline; `club-data-mapping` deja de ser obligatorio para el onboarding (consulta con grep).

## Versión 473 — Skill de onboarding nuevo, para el pipeline; HANDOFF archivado (2026-10-04)

- `.claude/skills/club-or-year-onboarding/SKILL.md` reescrito (texto aprobado por Guido): objetivo, arranque, los dos tipos de sesión (correr clubes / mejorar un script), reglas de Guido (incluidas las que estaban solo en la memoria de Claude), lotes de prueba, trampas, lo que el pipeline no cubre, cierre y mantenimiento. Sin versiones ni fechas.
- `Admin/HANDOFF-pipeline.md` → `Admin/Archive/HANDOFF-pipeline-hasta-2026-10-04.md`. Referencias repuntadas en `Admin/PIPELINE.md`, `Admin/ESTADO.md` y to-do 108.
- To-do 140(l): que el pipeline cubra presupuestos.

## Versión 472 — Estudio de qué documentos partir (2026-10-04)

- `auditorias/2026-10-04-partir-archivos.md` (nuevo, hecho por un subagente, solo lectura): qué se lee en cada sesión (≈225 KB) y 4 particiones recomendadas.
- To-do 143: partir los documentos que se leen en cada sesión (después del 109).

## Versión 471 — El skill de onboarding viejo, repartido y archivado (2026-10-04)

- `Admin/PANTALLA-FINANZAS.md` (nuevo): las reglas de pantalla de Finanzas (ex §4-8, §10, §12-14 del skill), sin cambios de texto.
- `Admin/ARQUITECTURA.md`: sección nueva "Finanzas para cualquier club" con los ex §2, §3 (sin el color) y §11.
- `.claude/skills/club-or-year-onboarding/club-nuevo.md` (nuevo): color de marca (ex §3 1b, sin la sangría de lista), chequeo contra el escudo y liga (ex §17).
- `Admin/CONVENCIONES.md`: el presupuesto en año calendario (ex §15) al final; 5 referencias al skill repuntadas.
- `Admin/Archive/club-or-year-onboarding-hasta-V470.md`: el skill viejo entero, con la tabla de a dónde fue cada sección. El `SKILL.md` queda con esa tabla hasta que se reescriba (paso 4).
- `alta-club.mjs`, `audit.js`, `lookup-brand-color.js` y `fetch-brand-color-reference.mjs` apuntan a `club-nuevo.md` / `PANTALLA-FINANZAS.md`. Las referencias en `data/`, `js/` y `fuentes/` no se tocaron (se resuelven con la tabla del Archive).

## Versión 470 — Los pendientes del pipeline, del HANDOFF al TODO (2026-10-04)

- `Admin/TODO.md`: to-dos nuevos 139 (defecto D), 140 (escalones y chequeos que le faltan al proceso, a-k), 141 (la cola humana, a-d) y 142 (decisiones pendientes de Guido, a-c), justo después del 138. Salen de "Dónde estamos", "Pendientes, a decidir con casos reales" y "No construido todavía" del HANDOFF, y de un pendiente que solo estaba en `tools/grupos-pais.mjs` (140k).
- `auditorias/2026-10-04-clubes-pipeline.md`: hallazgo 13 (Fortaleza, SENA) y sección "Otros clubes ya publicados" (Almagro, Grêmio, Vitória, Bahia, América Mineiro), que estaban en el HANDOFF.
- HANDOFF: "Dónde estamos", los pendientes y "Cómo arranca" apuntan a los to-dos 138-142.
- `Admin/PIPELINE.md`: cada "falta" lleva su to-do. `cola.mjs`, `estado.mjs` y `grupos-pais.mjs`: los comentarios de pendientes apuntan al to-do en vez del HANDOFF.

## Versión 469 — El proceso del pipeline y sus hallazgos, del HANDOFF a archivos propios (2026-10-04)

- `Admin/PIPELINE.md` (nuevo): "El proceso nuevo", "Caja y deuda" y las decisiones tomadas por Guido, movidos del HANDOFF sin cambiar el texto. Se actualiza en la misma sesión en que cambia una tool, sin pedir ok para el texto (decisión de Guido).
- `Admin/HALLAZGOS-pipeline.md` (nuevo): "Lo que falló en los tests o no entró", movido igual.
- HANDOFF: en cada lugar movido queda una línea que dice a dónde fue; siguen ahí las reglas de trabajo, los lotes de prueba, los pendientes y el arranque (paso 1 de la mudanza del HANDOFF al skill de onboarding).
- 15 comentarios y mensajes de 12 tools apuntan ahora a `Admin/PIPELINE.md` en vez del HANDOFF.

## Versión 468 — Pendientes de caja y deuda, del HANDOFF a la auditoría (2026-10-04)

- `auditorias/2026-10-04-clubes-pipeline.md`, sección "Caja y deuda": los pendientes que estaban en el HANDOFF más 3 casos nuevos (4 propuestas sin vecino para la compuerta en Novorizontino y Fortaleza; deuda de Fortaleza 2021 cargada solo con el corto plazo; caja de Fortaleza 2019-2022 sin propuesta).
- HANDOFF: "Dónde estamos" queda con el defecto D, el puntero al to-do 138 y los no urgentes.

## Versión 467 — Auditoría de los 6 clubes del pipeline nuevo, a su archivo (2026-10-04)

- `auditorias/2026-10-04-clubes-pipeline.md`: 12 hallazgos (UC, Fortaleza CEIF, Goiás, Novorizontino, AEL Larissa, Juventus) con evidencia y arreglo propuesto, 4 verificados por la sesión; y la propuesta de nota visible del quiebre de serie de Juventus 2006 → 2007.
- To-do 138 (genérico): ver los temas de auditoría pendientes. El HANDOFF ya no los lista.

## Versión 466 — `estado.mjs --logica` con las etapas del proceso nuevo (2026-10-04)

- `estado.mjs --logica` imprime las 7 etapas del HANDOFF (2 Transcribir, 3 Localizar, 4 Validar, 5 Extraer, 6 Verificar, 7 Categorizar, 8 Cargar) en vez de las 5 del proceso viejo.
- `grupos-pais.mjs`: los 60 puntos medidos pasan a su etapa nueva sin reescribirse (preparar → 3 localizar, validar → 4, categorizar → 7, cargar → 8); la cabecera y el pie aclaran que se vieron con el proceso viejo (2026-09-30).
- Medido: los 60 puntos en la etapa esperada (0 mal ubicados); ensayo de `prueba-completa` idéntico; solo `estado.mjs` lee `logica`.

## Versión 465 — Comentario de la meta: caja y deuda las completa caja-deuda.mjs (2026-10-04)

- `cargar.mjs`: el comentario que escribe en el `fiscalYearMeta` de cada año nuevo dice "grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía)" en vez de "no se leen por script todavía". Los años ya cargados conservan el texto viejo.
- Medido: ensayo de `prueba-completa` y propuestas de `cargar.mjs --desde-verificacion` de los 87 documentos, idénticos antes y después.

## Versión 464 — Fortaleza CEIF 2017 recargado con los gastos desglosados (2026-10-04)

- Reintento con las notas como estado (V460) + 4 ajustes `fila` con las partes de la nota de ingresos (L538-541) en lugar de su total + cola contestada (17 casos; Aportes a Icbf y Sena a `wages_squad`, decisión de Guido) + `cargar.mjs --reemplazar --escribir`.
- Ingresos 5.319,897 en las mismas 4 partes de antes; gastos 3.677,627 en 119 líneas (sueldos del plantel 1.604,683 aparte; antes, 5 renglones con los sueldos dentro de administración); resultado 1.347,094 = impreso. Auditoría 0 P0 / 0 P1; ASSET_V 399 → 400. Queda marcado: el lote no lo vuelve a reintentar.

## Versión 463 — "Sin verificar" pasa por la validación gratis antes de localizar (2026-10-04)

- `lote.mjs`, etapa 2 escalón 1a: un documento "sin-verificar" (el .md cambió después de validarse) pasa primero por la validación gratis del inventario (solo la carpeta del club); si queda "revisar", sigue el resolver como antes (que paga solo las páginas cambiadas, V443). Corre también en el ensayo (es gratis).
- Medido: ensayo de `prueba-completa` con y sin `--reintentar` idéntico (hoy no hay ningún "sin-verificar"). Simulado con copia de seguridad (Ferroviária 2018 con una validación de un .md anterior): "sin verificar" → validación gratis → "revisar" → resolver (ensayo US$ 0,03, 5 págs.) → la compuerta de perímetro frena antes de pagar localizar.

## Versión 462 — Escalera de "no es rubro" en la carga (2026-10-04)

- `cargar.mjs` (`proponerConEscalera`): una fila verificada con lado que la IA marcó "no es rubro" se excluye (escalón 0, como siempre); si la carga no cierra por tie-out, se prueba incluirla (escalón 1, su categoría va a la cola) y gana solo si cierra. El intento del escalón 1 no escribe en la cola salvo que gane.
- Medido sobre las propuestas de los 87 documentos de `prueba-completa` (código viejo contra nuevo, con `Generados/` y `Admin/` restaurados): solo cambia Fortaleza 2017 (sin los 3 frenos por tie-out; +1 caso en la cola: "Total Ingresos actividades ordinarias" 5.319,891, que Claude dio "no es rubro" con 0,85). Descartado antes, por manta corta: incluir siempre las filas verificadas, sin probar primero excluirlas.

## Versión 461 — Propuesta de carga al día por documento; RESULTADO del lote sin propuestas viejas (2026-10-04)

- `lote.mjs`: una propuesta de carga es vieja solo si hay un ajuste manual del mismo documento o de su club con fecha igual o posterior (antes: cualquier ajuste del archivo; el de Novorizontino frenaba el reintento de Fortaleza 2017). Y en el RESULTADO final, un año que ya está en el sitio va a "Ya en el sitio" aunque su propuesta sea vieja.
- Medido: ensayo de `prueba-completa` con y sin `--reintentar` idéntico. RESULTADO simulado sobre los 87 (todos cargados): antes 56 "listo", 21 "frenados" (6 de ellos "el club no existe") y 10 "ya en el sitio"; ahora 87 "ya en el sitio".
- Fortaleza 2017 reintentado con las notas como estado (Versión 460): verifica ok con los gastos desglosados; no se recargó (la propuesta frena: 16 categorías en la cola e ingresos 0,006 en la propuesta).

## Versión 460 — Reintento en el mismo modo, sin pisar lo que sirve, una vez (2026-10-04)

- `lote.mjs --reintentar`: (1) si la localización vigente es "las notas hacen de estado", el reintento relocaliza en ese modo (con el índice ampliado y lo que faltó); (2) un reintento que da "sin estado" no pisa una localización con estado (el intento queda en `.ubicacion-reintento.json`); (3) el reintento por "categoría en 0" queda marcado en `.reintento-categorias.json` y no se vuelve a ofrecer.
- Caso: Fortaleza 2017 (solo notas) se reintentó en modo normal, dio "sin estado" y pisó la localización buena (restaurada desde git); el lote lo volvía a ofrecer.
- Medido: ensayo de `prueba-completa` sin `--reintentar` idéntico; con `--reintentar`, solo Fortaleza 2017 pasa a "reintento con las notas como estado". Afecta como mucho a 8 localizaciones (Fortaleza con notas como estado) y 3 propuestas con categoría en 0. Simulada la marca: Fortaleza 2017 deja de ofrecerse. La pieza (2) se comprueba en la próxima corrida real.

## Versión 459 — Caja y deuda: la escala en la compuerta, con plausibilidad; "4) Due to banks" (2026-10-04)

- `caja-deuda.mjs`: la etiqueta para el diccionario pierde una numeración de lista al principio ("4)", "a)", "IV.").
- `compuerta`: escalón 0, la escala del documento si la compuerta pasa y el valor es plausible (entre 1/100 y 100 veces el año cargado más cercano del mismo dato); escalón 1, las otras escalas sobre las filas de la propuesta (y en el documento siguiente), aceptada si UNA sola da ok y plausible.
- Medido con `--medir` en TODOS los clubes (519 años de caja y deuda): de 141 a 146 iguales, 0 empeoran, distintos 10 → 10. Pasan a igual: Juventus deuda 2005 (24,973807) y 2006 (14,927923), Fluminense 2025 caja y deuda, Mönchengladbach 2024 caja. Diseño medido antes en una copia por un subagente; descartada la "escala de la tabla" (los encabezados mienten: Fortaleza dice "pesos colombianos" con cifras en miles; perdía 4 años).

## Versión 458 — El rearmado solo usa números sin confirmar de bloques elegidos hoy (2026-10-04)

- `texto-propio-a-md.mjs` (`paginasARearmar`, etapa 2 escalón 1b): los números sin confirmar de la `.validacion.json` cuentan solo si su bloque sigue elegido en el `.ubicacion.json` vigente. Caso: Juventus 2021-22, una validación hecha con el consolidado (b54, b55, b67-b71, págs. 92, 93 y 100) disparó el rearmado después de pasar a individual.
- Medido: en los 87 documentos de `prueba-completa` la elección de páginas da idéntica (hoy ninguno rearma). Simulado con copia de seguridad: con la validación del consolidado, viejo [92, 93, 100] → nuevo ninguna; control con un bloque elegido (b100, pág. 136) → nuevo [136].

## Versión 457 — La compuerta del registro exige solo los bloques que se cargan (2026-10-04)

- `verificar.mjs` (`avisarRegistro`): los números sin confirmar que frenan son solo los de los bloques que usa la lectura que cerró (los de las filas que se cargan, por su línea en el `.filas.json`); sin `.filas.json`, como antes (todos).
- Medido en los 87 documentos de `prueba-completa`: 42 números sin confirmar, 11 dentro de los bloques que se cargan (Novorizontino 2014-b y 2016, UC 2015: siguen exigidos), 31 fuera; los 30 de Juventus 2021-22 están todos fuera (los 29 ajustes `confirmado` que lo destrabaron no hacían falta; se dejan). Simulado con copia de seguridad: sin esos 29 ajustes, el código viejo frena y el nuevo pasa. Lo cargado no cambia (la compuerta no actúa en años cargados).

## Versión 456 — Escala de caja y deuda: probado y NO adoptado; `--medir --escalas` (2026-10-04)

- `caja-deuda.mjs --medir --escalas`: lista la escala que eligió `factorPorIngresos` en cada año (solo para medir; no cambia resultados).
- Probado y no adoptado: escala sin los rubros de ajustes `fila` y, en empate, desempate en las filas del estado de resultados. Cambia justo lo esperado (Juventus 2003-2006 a unidades, Novorizontino 2016 a miles) pero empeora 4 años: hay documentos con DOS escalas (Novorizontino `balanco-2016.md`: balance resumido "em milhares" L6 y balancete en reais L329, que es lo que lee caja-deuda; Juventus 2002-03: posición financiera resumida en €000, "Bank and post-office deposits (67,185)" + "Cash at bank and in hand (13)" = caja cargada, y el estado en euros). Una escala por documento no puede acertar las dos.

## Versión 455 — Probado y NO adoptado todavía: "4) Due to banks"; HANDOFF reordenado (2026-10-04)

- `caja-deuda.mjs`: sacar la numeración de lista ("4)", "a)", "IV.") antes del diccionario lee bien "4) Due to banks" (Juventus 2005-06 L1967, 2004-05 L1715), pero con la escala actual 2005 entra en miles y pasa de sin dato a distinto (24.973,8 contra 24,97). Revertido: va después del arreglo de la escala.
- HANDOFF: "Dónde estamos" con todos los pendientes (sin el punto de la API, ya hecho); "Caja y deuda" con título propio y la escalera al día, sin historia (vive acá).

## Versión 454 — Caja y deuda respetan el ajuste de perímetro (2026-10-04)

- `caja-deuda.mjs`: cada página del balance con título como encabezado se marca "consolidado" o "individual" (la siguiente sin título hereda). Con ajuste `perimetro` y páginas de ese perímetro en el .md, las filas del otro dejan de contar como balance; si el .md trae los dos perímetros, solo cuentan las páginas marcadas con el del ajuste (los resúmenes del balance en el informe de gestión, sin marca, también quedan afuera).
- En el camino (escalones): sacar las páginas sin marca en TODOS los documentos hacía perder Juventus caja 2008 y metía una suma casual en deuda 2015: se limitó a los documentos con los dos perímetros.
- Medido con `--medir`: UC, Fortaleza CEIF, Goiás, Novorizontino y AEL Larissa idénticos; Juventus caja de 12 a 17 iguales (2021, antes distinto, y 2022-2025), deuda de 9 a 12 (2021, 2022, 2024); ningún año empeora.

## Versión 453 — Probado y NO adoptado: filtrar lo que aprende el precedente de deuda (2026-10-04)

- Objetivo: que el escalón 0 de `caja-deuda.mjs` no aprenda sumas casuales (Juventus 2017: "Players' registration rights, net + Tangible assets in progress", dos ACTIVOS; 2018 da 332,3 M contra 329,2 M cargado).
- Probado 1, solo filas del pasivo (después del total del activo): 2018 pasa a igual pero 2020 (igual) pasa a distinto ("Deferred tax liabilities + Loans + Retained earnings", otra suma casual). Manta corta: descartado.
- Probado 2, solo filas que el diccionario reconoce como deuda: Juventus 10 iguales y 0 distintos, pero AEL Larissa pierde sus 6 iguales (etiquetas en griego fuera del diccionario). Descartado.
- Sin cambios en el código. Sin riesgo para lo cargado: `caja-deuda.mjs` nunca pisa un valor ya cargado; el distinto de 2018 solo aparece en `--medir`.

## Versión 452 — Caja y deuda: una fila con "cash flow" no saca la página del balance (2026-10-04)

- `caja-deuda.mjs`, páginas del balance: si la página tiene el título del balance como ENCABEZADO corto (renglón con # o en negrita sola, hasta 70 caracteres), la exclusión del flujo de efectivo / cambios en el patrimonio mira solo el texto fuera de las tablas. Caso: Juventus 2011-12 pág. 84, "Cash flow hedge reserve" en el patrimonio.
- Probado y descartado en el camino (manta corta): ignorar las filas en todas las páginas metía índices ("INDICE" con "Estado de Flujo de Efectivo", UC 2015 págs. 2-3), notas con "Saldo inicial" (UC 2015 págs. 37-51), Fortaleza 2017-2018 pág. 10, Goiás 2014 pág. 1 y Novorizontino 2023 pág. 2; un encabezado largo en prosa (UC 2015 pág. 50) también.
- Medido: páginas del balance en los 87 documentos de `prueba-completa`: solo cambian 10 de Juventus (se agrega la página del pasivo). `--medir`: los otros 5 clubes idénticos; Juventus deuda de 2 a 9 iguales y de 2 a 1 distinto (2018, el precedente con filas de activo); caja igual.

## Versión 451 — Caja y deuda: deuda corriente + no corriente de la misma etiqueta (2026-10-04)

- `caja-deuda.mjs`, escalón 1 de deuda: una familia con EXACTAMENTE dos filas, una a cada lado del total del pasivo no corriente del mismo balance (a menos de 40 líneas), se propone sumada; en el documento siguiente la compuerta busca el mismo par (`enOtroDoc`). Más de dos filas (consolidado + separado) sigue sin decidir.
- Medido con `--medir`: UC, Fortaleza CEIF, Goiás, Novorizontino y AEL Larissa idénticos; Juventus deuda de 0 a 2 iguales (2010 y 2017), sin distintos nuevos.
- Encontrado: en la mayoría de los años de Juventus la página del balance no cuenta como balance porque la fila "Cash flow hedge reserve" la hace pasar por el flujo de efectivo (`FLUJO_O_PATRIMONIO_RE`); queda como el próximo defecto de caja y deuda.

## Versión 450 — Listas de prueba fijas y deuda de Novorizontino 2015 (2026-10-04)

- `Admin/prueba-rapida.txt` (16), `prueba-mediana.txt` (34) y `prueba-completa.txt` (87): el pool para medir cualquier cambio de script, sin repetidos (los lotes 07-13 tenían 131 renglones para 87 documentos).
- Ajuste `deuda-incluye` de Novorizontino 2015 ("instituicoes financeiras", más los términos del club): la deuda cargada 10,240466 = empréstimos 10.162.885,71 + instituições financeiras 77.580,50; `caja-deuda.mjs --medir` daba distinto (10,162886) y ahora da 5 de 5 iguales.

## Versión 449 — Gasto por documento al final del lote (2026-10-04)

- `tools/gasto-doc.mjs` (nuevo, gratis): lo gastado en una corrida por documento y por tarea (Claude, Mistral, resolver y validar), con "N.ª vez" si esa tarea ya se había pagado antes para el mismo PDF. Suelto: `--lista <l> --desde <ISO> [--hasta <ISO>]`. No cuenta la línea que `verificar.mjs` copia de la validación anterior (repetía su `costoUsd`).
- `lote.mjs`: imprime el bloque "GASTO POR DOCUMENTO" antes del total; anota lo que costó validar escaneos (Gemini con rutas temporales).
- Medido: ensayo de los lotes 07 a 13 idéntico (con y sin `--reintentar`). Simulado sobre la corrida real del 2026-10-04 17:30-18:00: Juventus 2022-23 US$ 0,64 (localizar 3.ª vez, extraer 3.ª vez), 2023-24 US$ 0,16 (localizar 3.ª vez), 2021-22 US$ 1,51 (resolver 2.ª vez); coincide con el registro crudo.

## Versión 448 — El tablero (estado.mjs) con las etapas del proceso nuevo (2026-10-04)

- `tools/etapa-doc.mjs` (nuevo): en qué etapa y escalón del proceso nuevo está cada documento (registro + lo que dejaron las etapas 3-8 en `Generados/`). Lo usan el inventario (V447, movido acá) y el tablero.
- `estado.mjs`: secciones 1-9 del HANDOFF (antes, las del proceso viejo: "4. Preparar lista de rubros"); tools por etapa al día; costo de localizar + extraer con el estimador de V446; motivos de la etapa 8 frenada; descartados aparte; el proceso viejo solo como una línea de referencia.
- Medido: 6825 PDFs en los dos, mismas cuentas que el inventario (603 escaneos sin validar = 602 + 1 descartado). Hoy: 663 en la etapa 3 (~US$ 228 hasta la propuesta de carga), 517 en el sitio.

## Versión 447 — El inventario dice en qué etapa y escalón está cada estado (2026-10-04)

- `inventario-transcripciones.mjs`: el resumen "Por estado" agrega la etapa y el escalón del proceso nuevo; los "listo" se abren según lo que dejaron las etapas 3-8 en `Generados/` (localizar, extraer, verificar, propuesta de carga); los descartados como fuente se cuentan aparte. "Por motor" sin la lista de páginas (de ~120 renglones a ~20).
- El registro (`Admin/transcripciones-estado.jsonl`) no cambia: medido, idéntico byte a byte. Hoy: los 663 "listo" están en la etapa 3 (localizar pendiente); los 87 documentos con localizar hecho están todos cargados.

## Versión 446 — El ensayo estima extraer por el tamaño real (2026-10-04)

- `extraer.mjs`: en el ensayo, salida = 2 x entrada (antes 4.000 tokens fijos). Contra las 155 extracciones reales (US$ 24,03): antes US$ 14,76 y 68 llamadas subestimadas más de 30%; ahora US$ 25,96 y 5.
- `extraer.mjs` `estimarExtraerSinBloques()`: sin localizar todavía, la mediana de lo que costó extraer en ese club; sin historia, rango US$ 0,12-0,32 y el total usa 0,32. `lote.mjs` la usa en vez de los US$ 0,07 fijos (también en las notas como estado y en el rearmado).
- Medido: lotes 07 a 13 idénticos (todo extraído); Ferroviária sin historia: US$ 0,12-0,32 por documento; Juventus: US$ 0,28 (mediana de 29).

## Versión 445 — El caché de localizar, validar y extraer sabe si el .md cambió (2026-10-04)

- `tools/cache-al-dia.mjs` (nuevo, gratis): escalón 0, la huella del .md con la que se hizo el caché (`mdSha1`, que ahora guardan `localizar.mjs`, `validar-bloques.mjs` y `extraer.mjs`); escalón 1, cada fila del `.filas.json` sigue en su línea (etiqueta o importe en la línea citada, importe ahí o en las 3 siguientes por etiquetas partidas en dos renglones).
- `lote.mjs`: si el caché es viejo, un año sin cargar rehace localizar, validar y extraer (el ensayo lo cobra); un año cargado solo avisa.
- Medido: de 120 documentos de los 6 clubes, 1 viejo (Juventus 2021-22, 148 de 149 filas corridas, cargado: solo aviso). UC 2010 y 2011 eran falsos positivos de la primera versión (etiquetas en dos renglones) y quedaron al día. Ensayo de los lotes 07 a 13: solo el aviso de Juventus 2021-22; con `--reintentar`, idéntico. Simulado: UC 2009 con el .md corrido 5 líneas → viejo.

## Versión 444 — Respaldo del caché del pipeline en git (2026-10-04)

- `.gitignore`: los `.json` de `Generados/` se trackean (3413 archivos, ~91 MB); las transcripciones viejas de `Generados/` siguen locales. `netlify.toml` borra `Generados/` del artefacto de deploy.

## Versión 443 — Validación por página: lo que no cambió no se vuelve a pagar (2026-10-04)

- `tools/huella-paginas.mjs` (nuevo): huella (sha1) de cada página del .md; `splitPages` se mudó ahí desde `resolver-inventario.mjs`.
- `resolver-inventario.mjs`: guarda `paginasSha` en su línea de `transcripciones-verificaciones.jsonl`; una página con la misma huella que en la última validación "listo" no vuelve a Claude ni a Gemini (conserva su resolución). El ensayo también las descuenta.
- `inventario-transcripciones.mjs`: si el .md cambió pero ninguna página validada cambió, conserva el estado; si cambiaron, "sin-verificar" dice cuáles.
- Medido: ninguna validación tenía huellas (todo idéntico; ensayo de los lotes 07 a 13 idéntico). Simulado (y restaurado): Juventus 2021-22 con la pág. 233 cambiada, ensayo del resolver US$ 1,00 (50 págs.) → US$ 0,02 (1 pág.); Ferroviária 2018 con la pág. 5 cambiada → "sin-verificar ... 5"; 2022 sin páginas cambiadas → sigue "listo".
- `.gitignore`: `.doc` y `.rtf` fuente (Kazajistán, Eslovaquia) y `Admin/.lote-lista-actual.txt`.
- HANDOFF: "Dónde estamos" sin lo resuelto y con los lotes de prueba para medir cualquier cambio de script.

## Versión 442 — --reintentar solo sobre lo que destraba la carga; --detalle para lo opcional (2026-10-04)

- `lote.mjs`: un desglose que no suma en un documento cuya etapa 6 cerró (verificación ok) ya no entra al reintento (etapa 3, escalón 1) con `--reintentar`; entra solo con `--reintentar --detalle`. Entran siempre: categoría en 0 y desglose que no suma con la etapa 6 sin cerrar.
- "Año ya cargado" mira también el sitio (clubId y año del `.carga.json` contra `data/*.js`), no solo el registro.
- El resumen final separa "REINTENTOS QUE DESTRABAN LA CARGA" y "DETALLE OPCIONAL", cada uno con su comando (costo estimado ~US$ 0,50 por documento).
- Medido: ensayo sin `--reintentar` idéntico en los lotes 07 a 13; con `--reintentar`, la única diferencia es Juventus 2021-22 (en el sitio, `cargado: false` en el registro), que deja de reintentarse (lotes 13, 13f-13i).

## Versión 441 — Compuerta antes de localizar: perímetro y cierre fijados antes de pagar (2026-10-04)

- `tools/antes-de-localizar.mjs` (nuevo, gratis): para un documento sin `.ubicacion.json`, frena si no hay cierre (ajuste o periodo.mjs; sugiere el de los vecinos) o si el .md trae consolidado e individual (o dos entidades) y no hay ajuste `perimetro` ni año cargado consolidado de dónde heredarlo. Usa el detector de `alta-club.mjs` y la herencia de `cargar.mjs` (exportados `cargarSitio`, `perimetroHeredado`, `perimetroCercano`).
- `lote.mjs`: llama a la compuerta antes de localizar; el documento que frena no se paga y el lote imprime el comando de `ajustes.mjs` que falta (uno por club). Suelto: `node tools/antes-de-localizar.mjs --lista <lista>`.
- Medido: ensayo de los lotes 07 a 13 idéntico (26 listas). Juventus sin el ajuste del club: frenaría 14 de 17 del lote 13 (incluidos 2020-21 a 2024-25, que se pagaron dos veces). Candidatos (Ferroviária, Operário, noruegos): 131 de 144 frenan (perímetro o dos entidades en Molde, Aalesund, Fredrikstad; 18 sin cierre).

## Versión 440 — Juventus entero: 2003-2025 con caja y deuda parcial (2026-10-04)

- Estado de resultados de Juventus (`juventus-it`, estados separados) 2003-2025 cargado: 2022-2024 relocalizados con el perímetro individual y 2025 recargado (antes consolidado). Ajustes manuales: fila "per share" fuera en 2023-2024, números de notas no usadas `confirmado` en 2022.
- Caja escrita 2003-2021 y 2023 (8 ajustes `caja` + precedente); deuda 2005-2006 ("Due to banks"). Corregidos a mano: 2003-2006 (caja-deuda tomó esos documentos en miles por las filas de la nota de sponsors abiertas a mano; valores x1000) y caja 2023 (había tomado el balance consolidado; va el separado, 48.389.386, .md L4800).
- Deuda 2007-2025 y caja 2022, 2024, 2025 cargadas a mano del balance separado (decisión de Guido): la IA proponía bien la deuda pero la compuerta no confirmaba, y caja-deuda leía el consolidado en 2022-2025. Deuda 2003-2004 sin dato (no hay deuda financiera).

## Sourcing Europa del Este, 2026-10-03

- Sesión de sourcing de región (worktree `sourcing-europa-del-este`), sin cargar nada al sitio ni transcribir.
  Países con carpeta completados: Rusia (los 16 clubes con balance + resultados 2021-2025 como JSON/XLS
  oficiales de `bo.nalog.gov.ru`, endpoints `/nbo/bfo/details/<id>` y `/download/bfo/<id>?type=XLS`),
  Croacia (Slaven Belupo 2→7, Varaždin 1→5, vía Wayback), Ucrania (Shakhtar 8, Oleksandriya 7, Obolon 6,
  Metalist 1925 3, Dynamo Kyiv, Kolos parcial), República Checa ya estaba completa.
- Países nuevos con carpeta: Polonia (19 clubes, 5-9 ejercicios, canal = sitio del club por licencia PZPN),
  Rumanía (12 de 16), Moldavia, Hungría (10 de 11), Eslovaquia (10 clubes, API abierta de `registeruz.sk`),
  Eslovenia (4 de 9), Serbia, Bulgaria (Registro Mercantil scripteable), Bosnia, Macedonia del Norte,
  Albania/Montenegro/Kosovo (pasada corta), Estonia (9 clubes, 7 ejercicios), Letonia, Lituania, Georgia,
  Armenia, Azerbaiyán, Kazajistán (depositario `opi.dfo.kz`, también básquet y vóley) y Bielorrusia (dead-end).
- `.gitignore`: `Clubes/**/*.json|zip|xls|xlsx` (documento fuente crudo, mismo criterio que XML/DOCX).
- `tools/generate-fuentes-index.js`: 14 overrides nuevos de líneas ambiguas.
- Corregidos: Dynamo Kyiv NO era dead-end (sección `fcdynamo.com/pages/40`), Shakhtar NO estaba "sin cerrar"
  (publica 2018-2025), Oleksandriya no estaba bloqueado (Wayback), Obolon es la ТОВ del club (duda cerrada),
  Varaždin ya publicaba desde 2019.

## Sourcing Sudamérica, 2026-10-03

- Colombia: 6 clubes con 1 ejercicio pasaron a 5-6 (Nacional, Junior, Tolima, Millonarios, Santa Fe, América de Cali) y Unión Magdalena a 5, todo por la API de SIIS. Clubes nuevos de Primera B y otros deportes, 4-6 ejercicios cada uno: Real Santander, Jaguares, Atlético FC, Barranquilla FC, Tigres FC, Boca Juniors de Cali, Atlético Huila, Real Cartagena, Bogotá FC, Corsarios (4), Leones FC, Orsomarso, Cúcuta, Cortuluá, Caimanes (béisbol), Titanes (básquet), Toros (béisbol).
- Brasil: 21 clubes a 5+ ejercicios (federación paulista, sitios oficiales, Wayback); Amazonas y Athletic Club (SAF) siguen cortos (candidatos a mail). Otros deportes: Minas Tênis Clube, Minas Tênis Náutico, Paulistano, Praia Clube, Pinheiros (1 ejercicio).
- Chile: Palestino 1 → 8 ejercicios (wp-json/media del sitio oficial). Uruguay: Peñarol 2018 vía Wayback. Ecuador: Emelec 2023 y Barcelona SC 2018. Perú: Universitario parcial (Memoria 2018 + comunicados BDO). Paraguay, Bolivia, Venezuela y Nacional (Uruguay): dead-end documentado.
- Notas nuevas: `fuentes/{Paraguay,Bolivia,Venezuela,Perú}/_notas-generales.md`, `fuentes/Brasil/_otros-deportes.md`, 17 fichas de Colombia. `tools/generate-fuentes-index.js`: 6 OVERRIDES nuevos. Texto propuesto para las skills en `Admin/propuestas-skills-sudamerica.md` (no aplicado).

## Sourcing Inglaterra, 2026-10-03

- Todos los clubes ingleses con carpeta tienen ≥5 ejercicios en disco (PDF/HTM en `Clubes/Inglaterra/`, sin
  trackear): 19 de Premier, rugby, F1 y cricket que ya existían, + Manchester United con 6 20-F de la SEC
  (2020/21-2025/26) + ~57 clubes nuevos (Championship, League One/Two, 11 condados de cricket, Saracens).
  Sin cargar al sitio: falta transcribir (OCR) y el pipeline de carga.
- Tools nuevas: `tools/companies-house-fetch.mjs` (lista/busca/baja, `--include-small`) y
  `tools/fca-mutuals-fetch.mjs`. Aprendizajes en `fuentes/Inglaterra/_notas-generales.md` sección 6.
- Una nota `fuentes/Inglaterra/<Club>.md` por club con bloque `ing-sourcing` y línea `**Ángulos**`.

## Sourcing Italia, 2026-10-03

- Fútbol: **+45 ejercicios en disco** (PDFs en `Clubes/Italia/`, no trackeados). Lazio +18 (serie completa 2006/07-2024/25: CMS viejo vía Wayback y la API del widget de documentos del sitio), Torino +8 (dic 2018-2025: la sección `torinofc.it/relazioni_e_bilanci` SÍ existía, la nota del 2026-09-17 era incorrecta), Hellas Verona +4, Bologna +4, Cremonese +2, Fiorentina +3 (reconstruidos desde las imágenes del lector público de Issuu, sin capa de texto), Monza +3 (2022-2024), Sampdoria +3 (2018, 2019, 2021). Ya tienen 5 o más: Lazio, Torino, Verona, Bologna, Fiorentina.
- Serie B: de 18 clubes barridos solo Monza y Sampdoria publican; los otros 16 no tienen ningún documento público (solo Registro Imprese, pago). Se recomienda no repetir el barrido en Serie C. Pisa y Lecce (Serie A) confirmados sin documento. Cagliari: 2018 en Issuu y 2021 en Drive de solo lectura (mail). Udinese 2022/23-2023/24 solo truncados en Wayback. Genoa, Como y Cremonese: el sitio no publica años anteriores a 2022/2023/2023.
- 28 fichas con la línea `Ángulos` (10 de Serie A + 18 nuevas de Serie B) y `fuentes/_indice/Italia.md` y `_notas-generales.md` actualizados; `node tools/generate-fuentes-index.js` corrido.
- Rugby, vóley y básquet: no se empezaron en esta tanda.
- Nota de tooling: `archive.org` rechaza conexiones (rate limit) tras ~60 consultas CDX seguidas; el CDX da 504 en prefijos grandes (partir por carpeta de año). La página `España.md` que citaba el prompt no existe en el repo.

## Sourcing Norteamérica, 2026-10-03

- México: Club América pasa de 2 a 7 ejercicios con cifras (2019-2023 salen del *Information Statement* de la escisión y de los
  estados de Televisa; solo ingresos de "Eventos de fútbol y otros espectáculos"); Diablos Rojos del México (béisbol, BMV `DIABLOS`)
  entra como club nuevo con 4 ejercicios auditados (FY2022-FY2025).
- EE.UU.: MSG Sports (Knicks/Rangers) con 10-K de FY2019 a FY2026; Atlanta Braves con 10-K 2023 y los de Liberty Media FY2019 y FY2022
  (etapa "Braves Group"); Packers reintentado sin éxito para FY2023-26; Detroit City FC (5 Form C-AR, FY2021-25) y Oakland Ballers
  (3 ejercicios) entran como clubes nuevos por el canal Reg CF de EDGAR.
- Canadá (país nuevo, carpeta y índice): Winnipeg Blue Bombers, Saskatchewan Roughriders y Edmonton Elks (informes anuales de clubes comunitarios
  de la CFL, `static.cfl.ca`), Atlético Ottawa (vía cuentas del Atlético de Madrid) y Toronto Blue Jays (sin desglose en Rogers).
- Pendientes en `Admin/TODO.md` 126 y 127.

## Sourcing Centroamérica, 2026-10-03

- Región CENTROAMERICA (Costa Rica, Guatemala, Honduras, Panamá, Jamaica + El Salvador nuevo): 0 PDFs
  descargados, pero 3 canales cerrados con evidencia y 2 candidatos a mail confirmados.
- Jamaica: el Form 19A del Companies Office (Thirteenth Schedule) exime de presentar cuentas a las
  compañías privadas sin accionista corporativo, y la ficha pública no muestra estados financieros:
  el "lead más prometedor de la región" se achica a gestión de Guido de bajo valor esperado.
- Honduras: listado completo de emisores de la BCV (15) sin ningún club. Guatemala: portal de
  información pública de la FEDEFUT sin clubes. Panamá: la FPF publica sus propios EEFF (federación,
  no club); el reglamento de licencias masculino da 404.
- Costa Rica: Saprissa (2023-2024, Grant Thornton) y Alajuelense (2023, 2025) quedan como candidatos a
  mail. El Salvador: país nuevo con índice, notas y 3 clubes; el CNR deposita y certifica balances
  (US$ 6 + 0,25/hoja). Pendientes en `Admin/TODO.md` 122-125.

## Sourcing África, 2026-10-03

- Costa de Marfil (país nuevo): ASEC Mimosas, 15 ejercicios (2009, 2010, 2012-2024) en `Clubes/Costa de Marfil/ASEC Mimosas/`, de la propia `asec.ci` vía Wayback CDX de dominio completo. Primer club africano con documentos. Sin transcribir ni cargar (to-do 117).
- Marruecos: búsqueda gratuita de directinfo.ma hecha. Raja S.A. tiene Etats de synthèse 2025 depositados (75 MAD, gestión de Guido, to-do 118); Wydad S.A. no tiene ningún bilan. Se corrige la nota de 2026-09-13 (la S.A. de Raja es de 2020, no de 2025).
- Túnez (país nuevo): Espérance/Taraji Holding en trámite de cotizar, sin visa CMF (to-do 119). Argelia (país nuevo): solo notas de canal.
- Sudáfrica: manual PAIA de Orlando Pirates leído (to-do 120). Egipto: notas de los IPO fallidos de Ghazl El-Mahalla y Al Ahly.
- `tools/generate-fuentes-index.js`: 3 overrides nuevos (Wydad, Raja, Espérance).

## Sourcing Oceanía, 2026-10-03

- Primer barrido de la región (Australia y Nueva Zelanda), sin transcribir ni cargar nada: ~280 PDFs en `Clubes/Australia/` y `Clubes/Nueva Zelanda/` (no trackeados).
- AFL: los 18 clubes con 12-15 ejercicios cada uno (2011-2025). Collingwood, Essendon, Hawthorn, Brisbane, St Kilda, Melbourne, Geelong, Carlton, Adelaide, Fremantle, North Melbourne, Richmond (solo informe conciso) y Western Bulldogs, desde el sitio oficial o Wayback; Sydney, West Coast, Port Adelaide, Gold Coast y GWS solo vía el espejo no oficial footyindustry.com (copias de ASIC Form 388, muchas escaneadas).
- NRL: 10 de 17 clubes con documentos (Penrith, Bulldogs, Souths [solo el Member Co], Parramatta, Roosters, Cronulla, Broncos, Storm, Wests Tigers, Cowboys, Raiders escaneado); sin nada público: Manly, Knights, Titans, Dolphins, Dragons (Pty), Warriors.
- NZ: NZ Rugby (9) y NZ Cricket (7); las franquicias de Super Rugby, Phoenix y Auckland FC no tienen estados públicos (GP Ltd + LP).
- Rugby Australia (11), Football Australia (10), Cricket Australia (8), Cricket Victoria (9), WACA (6). A-League y NBL: Pty Ltd privadas, sin publicación.
- Notas por club en `fuentes/Australia/` y `fuentes/Nueva Zelanda/`, índices `fuentes/_indice/Australia.md` y `Nueva Zelanda.md` (con 11 y 6 líneas reescritas para el clasificador de `generate-fuentes-index.js`, que no entendía "reports").
- Pendiente de proponer a Guido: `paises/Australia.md` y `paises/Nueva-Zelanda.md` (no se editó ningún skill).

## Sourcing España/Francia, 2026-10-03

- España: ~40 PDFs de cuentas anuales/informes de auditoría nuevos en `Clubes/España/<Club>/` (no
  trackeados). Girona 7 y Getafe 7 ejercicios, Valencia 6, Celta 6, Athletic 5 (ya llegaron a 5);
  Elche, Rayo, Mallorca y Villarreal 4; Oviedo, Espanyol y Osasuna 3; Levante 3 + memoria.
- Técnica nueva documentada en `fuentes/España/_notas-generales.md`: listar el prefijo del CMS de
  LaLiga (`statics-maker.llt-services.com/<código>/*`) y los CDN propios en Wayback y leer la
  carátula de cada PDF. Aviso de falsos "0 resultados" cuando archive.org está offline.
- Francia: `sta.lfp.fr` pasó a `www.sta.lfp.fr`; DNCG sigue sin 2023/24. Sin PDFs nuevos.
- Mismo día, archive.org de vuelta: Sevilla 8 ejercicios (+4 históricos 2014-2020 del archivo legado),
  Mallorca 5 (+2013-14); Levante: 14 PDFs de reestructuración 2025 (deuda/viabilidad/valoración).
- Línea `**Ángulos**` agregada a las 13 fichas de club tocadas; `fuentes/_indice/España.md`
  actualizado. Pendientes reales en `Admin/TODO.md` punto 113.

## Versión 439 — El diccionario de deuda en inglés vuelve a funcionar (+3 términos) (2026-10-03)

- `tools/vocabulario.mjs`: la lista `en` de DEUDA_FINANCIERA había quedado dentro de un comentario desde la Versión 422 (ningún balance en inglés encontraba su deuda por diccionario). Va en su propia línea y suma 'due to banks', 'loans and other financial*', 'bonds and other financial liabilities' (formato italiano en inglés, Juventus). Aprobado por Guido.
- Medido (`caja-deuda.mjs --medir`, todos los clubes): resumen idéntico (deuda: 30 iguales, 7 distintos; caja sin cambios). Solo aparecen propuestas nuevas en años sin dato (Arsenal, Burnley, Sunderland, Wolves), que la compuerta rechaza.

## Versión 438 — `carpetas-clubes.mjs --json` ya no se corta en 64 KB (2026-10-03)

- `tools/carpetas-clubes.mjs`: con `--json` sale recién cuando terminó de escribir (antes `process.exit(0)` inmediato perdía todo lo que pasaba de 64 KB por un pipe). La lista llegó a ~68 KB con las carpetas nuevas de otra sesión y `audit.js` daba P1 `carpetas-clubes-fallo`, así que `cargar.mjs --escribir` revertía cualquier carga. Aprobado por Guido.
- Verificado: JSON completo (68.785 bytes, 644 carpetas), salida normal idéntica, auditoría P1 0.

## Versión 437 — Arreglo de G: un ajuste `fila` financiero también entra en las lecturas 5 y 6; ajustes manuales de Juventus 2003-2006 y 2021 (2026-10-03)

- `tools/verificar.mjs`: en las lecturas 5/6 el ajuste `fila` del lado financiero con `reemplaza` saca la fila vieja Y agrega la suya (antes solo la sacaba). Medido: lotes 07-13 idénticos.
- Ajustes manuales (decisión de Guido, formato italiano viejo, el signo lo da el encabezado): 2003-2006 gastos financieros de "17)" en negativo; 2003-2005 partidas de "19)", "20)" y "21)" con su lado; 2021 sale la fila de pérdida por acción "(0,157)". Los cinco años cierran (2003-2006 con la lectura 5, 2021 con la 6).
- Cambio H probado con Juventus 2020-21: localizar eligió el individual (b87).

## Versión 436 — Cambio H: el ajuste de perímetro llega a localizar (etapa 3, escalón 0) (2026-10-03)

- `tools/lote.mjs`: pasa `ajustePerimetroDe(pdf)` (del documento o del club) a las cuatro llamadas a `localizar`, que ya tenía el parámetro pero no lo recibía; hasta acá el ajuste solo lo leía cargar (etapa 8). Diseño aprobado por Guido.
- Caso: Juventus 2020-21, localizar eligió el consolidado (b15, pág. 32) aunque el club tiene ajuste "individual" (b87, pág. 69).
- Medido: el ensayo de los lotes 07-13 da idéntico (solo cambia una localización nueva en un club con ajuste `perimetro`).

## Versión 435 — Cambio G: el ajuste manual `fila` actúa en las lecturas 5 y 6, y con valor 0 solo saca la fila (2026-10-03)

- `tools/verificar.mjs`: la fila que nombra `reemplaza` sale también de las hojas de la lectura 5 y de los renglones sin lado de la 6; con `--valor 0` el ajuste solo la saca (no agrega una línea en cero). Diseño aprobado por Guido.
- Caso: Juventus 2018-19, "Basic and diluted earning/(loss) per share (0,040)" (.md L1160) se leía como 40 € y la lectura 6 no cerraba; con el ajuste cierra exacto contra −39.895.794.
- Medido con `verificar.mjs` sobre los lotes 07-13: sin el ajuste, todo idéntico; con el ajuste, solo cambia Juventus 2018-19.
- Lote 13 (Juventus, 17 años): listos para cargar 2013, 2014, 2015 y 2025.

## Versión 434 — Cambio F: lectura 6 de la etapa 6 (la 5 + los renglones sin lado según su signo) (2026-10-03)

- `tools/verificar.mjs`: lectura 6 al final de la escalera de lecturas = la 5 (solo hojas, sin totales, resultado impreso exacto) más los renglones sin lado por su signo, como la 3. También en el chequeo de año vecino (`ingresosConLectura`). Diseño aprobado por Guido.
- Caso: Juventus 2015-16 a 2019-20, "Other non-recurring revenues and costs" (+10.638.769 en 2015-16) y "Group's share of results of associates" quedaban sin lado y ninguna lectura cerraba. Ahora cierran 2015-16, 2016-17, 2017-18 y 2019-20; 2018-19 no (la fila "per share" "(0,040)" se lee como 40 €).
- Medido con `verificar.mjs` sobre los lotes 07-12: todo idéntico salvo esos años de Juventus.

## Versión 433 — Cambio E: el lote pasa por las voces (resolver-inventario) antes de rearmar una transcripción "revisar" (2026-10-03)

- `tools/lote.mjs`, etapa 2, escalón 1a: si el inventario dice "revisar", corre `resolver-inventario.mjs --pdf` (en el ensayo, su estimación; con `--ejecutar`, de verdad), regenera el inventario y, si queda "listo", sigue; si no, el rearmado (escalón 1b) como antes. Pedido y diseño aprobados por Guido.
- Caso: Juventus 2015-16 a 2019-20, marcados "revisar" por códigos postales y años ("10121 Torino" contra "10151 Turin"); el lote los salteaba o les reescribía todas las páginas. Ahora: 5 páginas con cifras dudosas de 650, ~US$ 0,10.
- Medido: el ensayo de los lotes 07-11 da idéntico (sus 64 documentos están "cargado").

## Versión 432 — Juventus: alta del club y ejercicio 2012 (2026-10-03)

- Alta `juventus-it` (Italia, EUR, ejercicio desde el 07-01, "Juventus Football Club S.p.A."). Perfil (sin socios ni otros deportes) y ligas 2003-2025 en la caché (Serie B en 2007).
- Ejercicio 2011-12 por el proceso nuevo (`lote-12a.txt`, el único año en "listo" en el inventario): cierra con la lectura 5 contra la pérdida impresa (−48.654.550). Categorías: "Other personnel" y compras a administración; provisiones/reversiones a otras amortizaciones; "Expenses from players' registration rights" a otros gastos (decisiones de Guido).
- Sin abrir: las notas de "Other revenues" y "Other expenses" no suman su renglón (no se reintentó).

## Versión 431 — Cambio C: en la lectura 2, el total impreso puede ser el total de una nota abierta por el escalón 1 (2026-10-03)

- `tools/verificar.mjs` (`ajuste` de totales, desde la lectura 2): si el total impreso de un lado es el de una nota que abrió el escalón 1 de las notas (grupo de renglones), sus filas lo cierran y el resto del lado queda afuera, como ya pasaba con un renglón (Forest). La compuerta sigue siendo el resultado impreso. Diseño aprobado por Guido.
- Caso: AEL Larissa 2019, extraer tomó como total de gastos el de la nota 15 (3.534.818,85, sin los 21.600 de otros gastos); ahora cierra con la lectura 2 y el gasto queda por naturaleza (antes ganaba la lectura 5, por función).
- Medido con `verificar.mjs` sobre los lotes 07-11: todo idéntico salvo AEL 2019.

## Versión 430 — B2, lectura de filas de caja y deuda: una celda "Γ.9" es referencia a nota, no importe (2026-10-03)

- `tools/caja-deuda.mjs` (`esRefNota`): una celda con 1-2 letras y un número ("Γ.9", "C.7") se descarta antes de tomar las cifras. Diseño aprobado por Guido.
- Caso: AEL Larissa 2025 "| Δάνεια | Γ.9 | 7.031,22 | 7.500,00 |" se leía como deuda 0,9 y pasaba la compuerta; además corría la columna del año anterior y rechazaba la caja 2024. Ahora: deuda 2025 7.031,22, caja 2025 252.355,66, caja 2024 212.242,36.
- Medido (`--medir --club`): UC, Fortaleza y Novorizontino idénticos (Goiás no tiene caja ni deuda cargadas).

## Versión 429 — AEL Larissa: alta del club y ejercicios 2016-2018, 2020, 2022, 2024 y 2025 (2026-10-03)

- Alta `aellarissa-gr` (Grecia, EUR, ejercicio desde el 07-01; nombre legal `Athlitiki Enosi Larissas AEL P.A.E.`, transliterado como Panathinaikos). Primer club de la Super League 2 (`data/rankings/gr-superleague2.js`).
- Años del proceso nuevo (`lote-11.txt`), un commit por año; gasto por naturaleza en 2020, 2022, 2024 y 2025 (Versión 427), por función en 2016-2018. Categorías de las 7 etiquetas griegas aceptadas por Guido en la cola.
- 2021 cargado después de re-extraer (la nota 16 no había venido); 2019 después del cambio C (Versión 431); 2023 por función con ajuste `sin-dudas` (decisión de Guido: su nota de gastos suma también los intereses). Caja 2016-2025 y deuda 2020-2025 con `caja-deuda.mjs` (después de B2, Versión 430). Los 10 años cargados.

## Versión 428 — Cambio B: una nota con una sola fila con importe que da su renglón no marca reintento (2026-10-03)

- `tools/verificar.mjs` (`desgloseTrivial`): si una nota no abre su renglón porque tiene una sola fila con importe (o todas en 0) y esa fila da exacto el renglón, deja una nota y no marca el documento para el reintento. Solo cambia el aviso; queda el renglón, con el mismo importe. Diseño aprobado por Guido.
- Casos: AEL Larissa 2022 "Κύκλος εργασιών" (mercadería 0,00 + servicios 2.068.146,00); 2023 "Λοιπά έξοδα" en 0.
- Medido sobre los lotes 07-11: lo cargado idéntico en todos; dejan de pedir reintento 7 documentos de AEL, Fortaleza 2019 y 2020 y Novorizontino 2020 (los tres con una sola fila, ya cargados).

## Versión 427 — Escalón 1 de las notas: una nota sin renglón que desglosa un grupo de renglones de gasto (2026-10-03)

- `tools/verificar.mjs` (`notaDeGrupo`): si ninguna fila de una nota dice qué renglón abre, propone el único conjunto de 2+ renglones de gasto del estado (sin nota propia) que suma su total impreso; decide la compuerta de siempre (`cerrarNota`). La duda de extraer de esa nota se cierra con nota si la lectura que ganó la usó. Diseño aprobado por Guido.
- Caso: AEL Larissa, gasto por función (costo de ventas + administración + comercialización) abierto por naturaleza por la nota "Έξοδα". Pasan 2020, 2022, 2024 y 2025. No pasan, a propósito: 2019 (gana la lectura 5, que no abre notas), 2021 (extraer no trajo las filas de la nota) y 2023 (la nota suma también los intereses).
- Medido con `verificar.mjs` sobre los lotes 07-11: UC, Fortaleza, Goiás y Novorizontino idénticos (estado, totales, líneas, cola).

## Versión 426 — Ligas estaduales: Paulista A1, A2 y A3 (2026-10-02)

- `data/leagues.js`: `br-paulistaA1`, `br-paulistaA2`, `br-paulistaA3`, con `scope:'estadual'` y sin `tier` (el Paulista no es un escalón de la pirámide nacional); el orden de las ligas de un país (`leaguesOfCountry`, `js/liga.js`) pone al final las que no tienen tier. Decisión de Guido.
- Planteles cacheados (pt.wikipedia, sección "Participantes"; A1 de en.wikipedia) y Novorizontino 2013-2017 recargados con `--reemplazar` (mismos números): 2013-2014 A3, 2015 A2, 2016-2017 A1. 2010 sigue null (solo juveniles).
- Verificado en el sitio local: orden de ligas de Brasil, sin "Nª división" para las estaduales, `leagueAt` por año; sin errores de consola propios.

## Versión 425 — Ajuste manual `deuda-incluye`, por club: términos de deuda propios del club para el diccionario (2026-10-02)

- `ajustes.mjs`: `deuda-incluye` (términos separados por ';'), para un documento o todo el club (`ajusteClubODoc`, mismo mecanismo que `perimetro`). `caja-deuda.mjs`: el escalón 1 (diccionario) suma esos términos para ese club; la compuerta sigue decidiendo.
- Caso: Novorizontino, la deuda es el mútuo de su controlante I-9 Sports ("Débitos com partes relacionadas" / "Partes relacionadas"; 2015 ya cargado así como "Empréstimos e mútuos"). Pasan la compuerta 2019 (32,3 M), 2023 (94,0 M), 2024 (111,8 M), 2025 (145,2 M).
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos.

## Versión 424 — Caja y deuda: balance de dos lados en una fila (2026-10-02)

- `caja-deuda.mjs` (`filasDelMd`): en una fila de tabla con dos etiquetas ("| Caixa | 4 | 952 | 85 | Empréstimos e financiamentos | 8 | 87 | 79 |"), cada etiqueta con sus cifras es una fila. Antes las cifras del pasivo quedaban pegadas a la caja y la deuda no existía como fila.
- Caso: Novorizontino 2018-2025 (la IA elegía la fila de "Caixa" como deuda porque esa línea dice "Empréstimos").
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos. Novorizontino: ahora aparecen los empréstimos bancarios; la deuda grande (I-9 Sports, "partes relacionadas") espera decisión de Guido, no se escribió nada.

## Versión 423 — Caja y deuda, escalón 1: jerarquía de un balancete y lado de la cuenta (2026-10-02)

- `caja-deuda.mjs` (`propuestaVocabulario`): una fila hija de otra que también coincide sale (código de cuenta que empieza con el de la otra, o, sin códigos, pegada abajo con el mismo importe); en deuda, una fila con marca D (deudora, activo) no cuenta.
- Caso: Novorizontino 2016, "2.2.01 EMPRESTIMOS E FINANCIAMENTOS" y "2.2.01.01 EMPRESTIMOS E MUTUOS" se sumaban (31,9 M) más "1.2.02.05 CONTRATOS DE MUTUOS 4.000 D"; ahora 15.965.049.
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos.

## Versión 422 — Caja y deuda: el diccionario ignora el código de cuenta del balancete; "mutuo" (2026-10-02)

- `caja-deuda.mjs`: para el diccionario (`norm`), la etiqueta va sin el código de cuenta del principio ("2.2.01 EMPRESTIMOS…", "29 2201010001 - …"); la etiqueta impresa y la familia no cambian. `vocabulario.mjs`: "mutuo*" en DEUDA_FINANCIERA (pt).
- Caso: Novorizontino 2013-2017. El escalón 1 de deuda ahora propone (antes "sin propuesta"), pero todavía no destraba: suma el préstamo en los tres niveles del balancete (2016: 31,9 M contra ~10 M) y la compuerta lo frena.
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos.

## Versión 421 — Caja y deuda: una sola referencia a nota por fila (2026-10-02)

- `caja-deuda.mjs` (lectura de filas): se saca UNA referencia a nota al principio de las cifras, no en bucle; el importe siguiente también puede ser un entero chico (en miles).
- Caso: Novorizontino 2020 "Caixa e equivalentes de caixa | 4 | 85 | 695 |": sacaba el 4 y el 85 y leía 695 (2019); 2019 fallaba contra esa lectura. Ahora 2019 = 0,695 y 2020 = 0,085, con la compuerta del año anterior.
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos.

## Versión 420 — Caja y deuda: la compuerta exige la familia de la fila (2026-10-02)

- `caja-deuda.mjs` (`compuerta`): deuda nunca con una fila de caja (CAJA_RE) y caja nunca con una fila de deuda financiera (DEUDA_FINANCIERA_RE). Es el filtro que los escalones 0 y 1 ya usaban al buscar; ahora también frena la propuesta de la IA (escalón 2). La comparación con el vecino no lo atrapaba: el mismo error en los dos años coincide.
- Caso: Novorizontino 2021, 2022, 2024 y 2025: la IA proponía "Caixa e equivalentes de caixa" como deuda (2024: 2.133.179, pasaba la compuerta del documento siguiente).
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos.

## Versión 419 — Ajuste manual `caja` (2026-10-02)

- `ajustes.mjs`: `caja` (--valor tal cual impreso en el documento del año). `caja-deuda.mjs` lo toma como escalón 0 (gana sobre la escalera, sin compuerta) y lo pasa a millones con la escala del documento.
- Caso: Novorizontino 2022: el documento imprime 721.730 (con aplicaciones de proyectos incentivados); el 2023 lo reclasificó a 146.924, coherente con 2023-2025.
- Medido: ningún otro documento tiene este ajuste.

## Versión 418 — Caja y deuda: la compuerta pasa el documento siguiente a su propia escala (2026-10-02)

- `caja-deuda.mjs` (`compuerta`): las cifras del documento siguiente se multiplican por la escala de ESE documento (`factorSiguiente`, de sus ingresos cargados), no por la de este; si no se conoce, la de este, como antes.
- Caso: Novorizontino 2021 (en miles), caja 0,952 contra 951.927 del documento 2022 (en reales): el mismo número; ahora pasa.
- Medido (`--medir --club`): UC, Fortaleza y Goiás idénticos.

## Versión 417 — Ajuste manual `confirmado`: un número confirmado a mano contra el PDF (2026-10-02)

- `ajustes.mjs`: `confirmado` (--linea N --valor "tal cual en el .md"), varios por documento. `verificar.mjs` (compuerta del registro): un número sin confirmar por la segunda lectura que tiene su ajuste no frena el paso a "listo".
- Casos: Novorizontino 2016 (Gemini leyó otro dígito en 2.204, 1.794, 1.945, 1.422; la versión detallada en reais del mismo PDF confirma el .md, L157, L216, L247) y 2014 (Gemini no leyó 5 números chicos; la lectura 5 cierra al centavo).
- Medido: ningún otro documento tiene este ajuste (sin cambios fuera de esos dos).

## Versión 416 — Etapa 6, chequeos cruzados: la columna del año en común tiene que existir (2026-10-02)

- `verificar.mjs`: compuerta del escalón 0 de los dos chequeos cruzados (año vecino y año anterior cargado): si ninguna fila del estado trae la columna del año anterior, "no se puede comparar" (sin caso en la cola), en vez de comparar 0. El año anterior cargado también usa la lectura 5 cuando esa fue la que cerró.
- Casos: Novorizontino 2014 y 2015 (balancetes de una sola columna: 0 contra 1.060.016) y 2023 (su extracción no trajo la columna 2022: 0 contra 30.003.234).
- Medido: lotes 07, 08 y 09 idénticos; lote 10: 14 de 14 OK.

## Versión 415 — Etapa 6, resultado impreso, escalón 2: la línea pegada al último bloque (2026-10-02)

- `verificar.mjs`: si extraer no encontró el resultado en los bloques (ni el de antes de impuestos), una línea PREJUÍZO / DÉFICIT / SUPERÁVIT / LUCRO con un número, hasta 4 líneas después del último bloque del estado, propone el resultado. Compuerta: alguna lectura cierra con él exacto (a media unidad por fila).
- Casos: Novorizontino 2015 ("PREJUIZO: 5.598.142,50", L158) y 2013 ("PREJUÍZO 728.230,75", L225): los dos cierran exacto con la lectura 5.
- Medido: lotes 07, 08 y 09 idénticos.

## Versión 414 — Etapa 6, lectura 5: solo las hojas con su signo (C/D de los balancetes) (2026-10-02)

- `verificar.mjs`: lectura 5, después de la 4. Usa solo los renglones del estado (ningún subtotal ni total), con su signo: la marca C/D de un balancete si la trae (D en ingresos resta, C en gastos resta, financiero C − D) y si no, el impreso. No usa los totales como chequeo; la única compuerta es el resultado impreso, exacto a media unidad por fila. El chequeo de año vecino usa la misma lectura.
- Casos (diagnóstico de Novorizontino 2013-2017): grupos de un solo renglón repetidos como subtotal y total (2017: 8.019.563,48 contado 3 veces), subtotales que mezclan lados (en los 5), marcas C/D descartadas (2013-2015).
- Medido: lotes 07 (UC), 08 (Fortaleza) y 09 (Goiás) idénticos; lote 10: 2017, 2016 y 2014 cierran exacto con la lectura 5 (2017 y 2016 OK; 2014 frena por el falso rojo de año vecino; 2013 y 2015 no tienen resultado impreso en sus bloques).

## Versión 413 — Ajustes manuales `cierre` y `reportType` (2026-10-02)

- `ajustes.mjs`: `cierre` (AAAA-MM-DD) y `reportType` (official_balance_sheet | official_budget), por documento. Escalón 0 en `alta-club.mjs` (ganan sobre lo detectado y sobre la respuesta de Claude por API) y, el cierre, en `localizar.mjs` (el ejercicio que se le pide buscar).
- Casos: Novorizontino 2022 (el detector de período tomó la fecha de la firma, 28/04/2023; localizar lo dejó "sin estado") y 2010 (estado de resultados en una tabla con pocas filas numéricas: el alta preguntaba si era un dictamen).
- Medido: ningún documento de los lotes 07-10 tenía estos ajustes (sin cambios hasta agregar uno).
- `inventario-transcripciones.mjs`: el ajuste `cierre` fija el `periodo` del registro, de donde lo toman localizar, verificar (año y año vecino) y cargar. Medido sobre el registro entero: 3.358 documentos, solo cambia Novorizontino 2022 (28/04/2023 → 31/12/2022).
- `cargar.mjs`: con ajuste `cierre` no recalcula el período desde el .md (lo pisaba con la fecha de la firma).

## Versión 412 — Ajuste manual `perimetro`, por documento o por club (2026-10-02)

- `ajustes.mjs`: campo `perimetro` (individual | consolidado); se fija para un documento o para la carpeta del club (`Clubes/<País>/<Club>/`), y el del documento gana. `cargar.mjs`: es el escalón 0 del perímetro (gana sobre lo que detecta el documento y sobre la cola).
- Caso: Novorizontino, una sola entidad; "Consolidado" en el membrete del auditor hacía preguntar cada año (2018-2020; una vez se cargó al revés). Ajuste del club: individual.
- Medido: ningún documento de los lotes 07-10 tenía ajuste de perímetro (sin cambios hasta agregar uno); Goiás no recibe el de Novorizontino.

## Versión 411 — Etapa 2, escalón 1b: compuerta del rearmado por página (2026-10-02)

- `texto-propio-a-md.mjs` (`rearmar`): una página rearmada con el texto propio se usa solo si conserva al menos la mitad de las filas de tabla (etiqueta + número) de la anterior; si no, queda la anterior con una marca "Página NO rearmada" (el escalón no se repite). `lote.mjs` dice qué páginas rechazó.
- Caso: Novorizontino 2025, pág. 7 (estado de resultados girado 90° en una hoja vertical): Mistral 16 filas, rearmada 3. Rechazadas 6, 7, 8 y 10; rearmadas las otras 19.
- Medido sobre los 12 documentos ya rearmados: Goiás (9) ninguna página rechazada; Novorizontino 2023 rechazaría las págs. 20 y 25, que su carga no usa (7, 8 y 26), y su rearmado ya está hecho.

## Versión 410 — Ligas: celdas de estado con rowspan en las tablas de Wikipedia; Série D en el catálogo (2026-10-02)

- `fetch-club-league-reference.mjs`: una fila que abre un grupo de estado (`|rowspan=N |{{flagicon|...}}`, también dentro de `{{nowrap|...}}`) toma como club la celda siguiente. Antes guardaba el estado y perdía el primer club del grupo.
- `data/leagues.js`: `br-serieD` (decisión de Guido).
- Caso: Série D 2020, fila "São Paulo | Novorizontino". Medido: 7 planteles ya cacheados (B 2017, 2022-2024; C 2021, 2025; A 2024) dan el mismo conjunto de clubes; Série D 2019 y 2020 con Novorizontino y sin estados.
- Novorizontino 2019 y 2020 recargados con `--reemplazar`: liga `br-serieD`, mismos rubros.

## Versión 409 — Etapa 6, lectura 4: deducciones de la receita bruta (2026-10-02)

- `verificar.mjs`, solo en la lectura 4 (signos impresos): (1) un subtotal igual al único renglón que tiene arriba es ese renglón repetido, no una fila más; (2) el total impreso puede ser el bruto: si los renglones de signo normal lo suman, cierra, y las deducciones restan aparte. La compuerta sigue siendo el resultado impreso.
- Caso: Novorizontino 2024, "Receita bruta" 40.157.783, "Impostos incidentes sobre a receita" (1.303.783) y "(-) Deduções" (1.303.783): ingresos 81.619.349 → 38.854.000; el resultado −22.692.012 cierra con el impreso.
- Medido: lotes 07 (UC), 08 (Fortaleza) y 09 (Goiás) idénticos; lote 10, 2024 pasa de 5 casos en la cola a 1.

## Versión 408 — Cola: --corregir-categoria graba la corrección aunque la fila ya tenga un caso abierto (2026-10-02)

- `cola.mjs --corregir-categoria`: la respuesta es `corregir` con la categoría, no `aceptar`. Si la fila ya tenía un caso abierto, `aceptar` aceptaba la propuesta vieja de ese caso.
- Caso: Novorizontino 2021, "Repasse da federação" seguía como competition_bonus después de fijarlo como broadcasting. Medido sobre ese caso: queda broadcasting.

## Versión 407 — Lote: un .md registrado pero ausente en disco ya no tira abajo el lote (2026-10-02)

- `lote.mjs`: si el registro tiene la ruta del `.md` pero el archivo no está (`tieneMd: false`), el documento queda "sin transcripción (etapa 2)" y el lote sigue. Antes pasaba a `localizar.mjs` y se caía con ENOENT.
- Caso: Novorizontino 2022 ("PAGADO SIN .md"). Medido en ensayo con 2022 + 2010: 2022 "sin .md", 2010 sigue normal.

## Versión 406 — Lote: con --reintentar, un año ya cargado no se reprocesa por desgloses (2026-10-03)

- `lote.mjs`: un documento cuyo año ya está en el sitio solo se reintenta por "categoría en 0" de su propuesta de carga, y solo si esa propuesta es posterior al último ajuste manual. Por "desglose que no suma" no (se cargó con el renglón sin abrir, a propósito).
- Casos: `lote-08 --reintentar` iba a reprocesar Fortaleza 2018-2024 ya cargados (US$ 0,61; en 2018-2020 las marcas eran ruido: 5.867,807 contra 5.867,804); Goiás 2025 y 2017 se reprocesaron por una propuesta anterior a sus ajustes cero-real (US$ 0,45).
- Medido (ensayo con --reintentar): lotes 07, 09 y 09b, nada; 08 y 08b, solo Fortaleza 2017 (sueldos en 0, el caso buscado).

## Versión 405 — Carga: una fila sin desglosar apaga solo los avisos de "categorías en 0" de su lado (2026-10-03)

- `cargar.mjs`: ingresos sin desglosar → no se revisan televisión, estadio, cuotas sociales ni otros deportes; gastos sin desglosar → no se revisa sueldos del plantel. Hasta la 404 cualquier fila `lump_` apagaba todos los avisos del año.
- Caso: Fortaleza 2017, "Actividades Deportivas" (ingresos, sin desglosar) apagaba el aviso de sueldos en 0; los sueldos (nota 21, "Sueldos 705.432") quedaron dentro de "Total Gastos de Administración" porque la duda de extraer que proponía cargar el detalle la silenció `sin-dudas`. Ahora pide el reintento.
- Medido (propuesta de carga de los 40 años cargados): UC sin cambios; Fortaleza solo 2017 (reintento por sueldos); Goiás 2025 muestra sus ajustes cero-real; Goiás 2012, 2013 y 2023 avisan "otras secciones deportivas en 0" (esportes olímpicos no desglosados en el estado: ajustes cero-real con ese motivo, como 2014, 2015 y 2017).

## Versión 404 — Etapa 7: la caché de Claude es un escalón con la nota en la clave (2026-10-03)

- `respuestas-cache.mjs` / `categorizar-claude.mjs`: escalón 5a "¿Claude ya respondió esto?" con clave carpeta del club + lado + etiqueta + nota (antes: id del club + lado + etiqueta). Si no está, escalón 5b, preguntar por API. `--sembrar` rearma la caché de Claude con la clave nueva desde los `.categorias.json` (solo las respuestas pagadas, no las que salieron de la caché vieja). Jev sigue igual (no ve la nota).
- Caso: Goiás "Despesa com pessoal": la respuesta para la nota administrativa ("gastos generales", guardada como 'goias-br') se reusaba en la nota de fútbol de 2024 (44.603.582); la de fútbol estaba guardada como 'goias' (id antes del alta).
- Medido (filas que hoy resolvió Claude): UC 19 (4 en la caché nueva, 15 a volver a preguntar si se recategoriza), Fortaleza 196 (99 / 97), Goiás 94 (86 / 8); 2 dan otra categoría, las dos de Goiás 2021 ("(-) Direito de Arena" y "(-) INSS Patrocínio", cargadas como otros ingresos; la caché nueva da televisión y patrocinio, el criterio de 2022-2024).

## Versión 403 — Etapa 7: el precedente y las respuestas de la cola miran en qué nota está la fila (2026-10-03)

- `padres-filas.mjs` (nuevo, gratis): en qué nota está cada fila ya verificada (lo lee del `.verificacion.json`); `sinMarca()` saca la marca de nota del final ("(a)", "(1)", "(nota 17)"); `mismoPadre()` compara notas por palabras de contenido (sin "gastos", "despesas", "total"...), porque cada año nombra distinto la misma nota.
- `categorizar-claude.mjs` y `cargar.mjs`: (A) el precedente con contexto compara etiquetas sin la marca de nota y usa también lo cargado; (B) si la etiqueta tiene precedentes con nota conocida y ninguno está en la misma nota, el precedente sin contexto no decide (baja a Jev/Claude); (C) una respuesta de la cola de otro documento del club se aplica solo si la fila está en la misma nota.
- Casos: Goiás "Despesa com pessoal" (2014, 2015, 2017, 2021, nota de fútbol) y "Serviços de terceiros" (2008-2016 administrativo; 2023-2025 de "Custo com futebol") salen bien solos por contexto.
- Medido (precedente de cada fila cargada contra los otros años del club): UC bien 500 → 498, mal 0 → 0; Fortaleza bien 433 → 414, mal 7 → 7; Goiás bien 407 → 420, mal 1 → 1. Lo que deja de decidir baja a Jev/Claude. Comparar la nota por texto exacto daba Fortaleza 433 → 286 y no entró.

## Versión 402 — Carga: una liga en null se reemplaza por una verificada (2026-10-02)

- `cargar.mjs`: una fila de liga existente en `null` ("nadie lo verificó") ya no frena una liga verificada nueva, y al escribir se reemplaza ese año en vez de agregarlo repetido.
- Goiás: 2009-2011, 2013, 2014 y 2016 recargados con `--reemplazar`; las 15 temporadas tienen liga (2008-2010, 2013-2015, 2022-2023 Série A; el resto Série B). Rosters de 2014 (plantilla sports table) y 2016 a la caché. Medido: rubros, importes y meta de los 15 años idénticos antes y después.

## Versión 401 — Ligas: escalón por la plantilla "sports table" de Wikipedia (2026-10-02)

- `fetch-club-league-reference.mjs`: escalón 0, una tabla común en la sección de equipos (lo de siempre); escalón 1, si no hay, la tabla de posiciones hecha con la plantilla `{{#invoke:sports table}}` en cualquier parte de la página (sus `name_XXX`). Compuerta: al menos 4 equipos.
- Caso: Brasileirão 2009 y 2010 Série A y 2011 Série B: 20 equipos cada uno, Goiás 9°, 19° y 11° (coincide con las capturas de Guido). Caché `tools/club-league-reference/br.json`.

## Versión 400 — Texto propio: etiquetas partidas en dos renglones (escalón con compuerta) (2026-10-02)

- `texto-propio-a-md.mjs`: escalón 0, el renglón tal cual; escalón 1, se une con el renglón de texto inmediatamente de arriba solo si la compuerta dice que es su continuación (el de arriba termina en un conector, "DAS", "de", "e", "com"…, o este empieza en minúscula; y están pegados). Un título arriba de un renglón completo ("RECEITAS" / "Futebol profissional e de base") no pasa.
- Caso: Goiás 2016, "ATIVIDADES (nota 17)" → "RECEITA LÍQUIDA DAS ATIVIDADES (nota 17)"; "profissional e amador (nota 18)" → "Despesas com futebol profissional e amador (nota 18)".
- Medido en las 8 transcripciones rearmadas de Goiás: en los estados de resultados solo cambia 2016; en los demás años, renglones del flujo de caja y párrafos de notas (nada que se cargue). Se rearmó solo 2016.

## Versión 399 — Rearmado con el texto propio: escalón por el registro de transcripciones (2026-10-02)

- `texto-propio-a-md.mjs` / `lote.mjs`: si el registro de transcripciones (que compara el .md ENTERO con el texto propio) dice "revisar" por cifras con un dígito distinto, se rearman las páginas con texto propio que todavía no se rearmaron (método columnas), aunque la etapa 6 cierre: ese estado frena la carga igual.
- Casos: Goiás 2016 (la pág. 2, nota 17 de ingresos, seguía con la lectura de Mistral: 94 cifras distintas) y 2014 (cierra, pero 10 cifras mal leídas en otras páginas).
- Cola: dudas de 2008-2013 contestadas en bloque (escala en reales; ejercicio 2011; 2012 ingresos con la columna TOTAL de la nota 19; gastos de 2012 y 2013 con las filas del estado). 2008-2015 quedan ok sin casos.
- Medido (ensayo): UC (lote 07) y Fortaleza (lote 08) no lo activan; en Goiás solo 2016 (pág. 2) y 2014.

## Versión 398 — Etapa 6: el chequeo del año vecino lee cada documento con la lectura con la que cerró (2026-10-02)

- `verificar.mjs`: el chequeo 4b (año vecino) suma los ingresos de este documento con la lectura con la que cerró y los del vecino con la suya (la que dejó escrita en su `.verificacion.json`). Hasta la 397 los dos se leían con la lectura 0.
- Caso: Goiás 2011 cerró con la lectura 4 (ingresos 17.096.667 = total impreso = columna 2011 del documento 2012) y el chequeo comparaba 52.419.680 contra 17.096.667. En 2008-2010 coincidía por casualidad: los dos documentos se inflaban igual.
- Medido: UC (lote 07) y Fortaleza (lote 08) idénticos; Goiás 2011 pasa a ok y 2012 deja de marcar el vecino; los demás años solo cambian los importes del detalle del chequeo (ahora los reales).

## Versión 397 — Rearmado con el texto propio: escalera de métodos (columnas → regiones) (2026-10-02)

- `texto-propio-a-md.mjs`: el rearmado tiene su propia escalera (pedido de Guido: una escalera en vez de cambiar el método para todos). Escalón 0, método "columnas" (cortes verticales en toda la página, el de la Versión 395). Escalón 1, método "regiones" (cortes alternados horizontales y verticales), solo si el .md ya se rearmó con "columnas" y la etapa 6 sigue sin cerrar el resultado impreso. Una vez cada uno; la marca del .md dice cuál se usó. `lote.mjs` lo usa en `--reintentar`.
- Caso: Goiás 2010, pág. 1: el balance de arriba y el estado de resultados de abajo tienen columnas en lugares distintos; con "columnas" el estado salió mezclado renglón por renglón con el flujo de caja ("Premiação 2.913.373 1.574.641 Lucro (prejuízo) líquido do exercício"). Con "regiones" sale limpio (17 renglones de ingresos hasta "TOTAL DAS RECEITAS 30.362.984").
- Medido (ensayo): UC (lote 07) y Fortaleza (lote 08) no lo activan; en Goiás solo 2010 sube al escalón 1.

## Versión 396 — Etapa 6: lectura 4, signos impresos (2026-10-02)

- `verificar.mjs`: lectura 4 de la escalera de lecturas (solo si 0-3 no cierran): los renglones del estado conservan su signo respecto del signo normal de su lado (un renglón negativo entre los ingresos resta) y los subtotales se reconocen por la suma con signo.
- Caso: Goiás 2008, "(-) Dedução da receita (1.290.613)" sumaba; los ingresos daban 62.455.533 en vez de 20.242.293. Con la lectura 4 cierran 2008, 2009 y 2011 (2010 no).
- El chequeo del año anterior cargado también acepta la columna contra lo cargado más una ganancia extraordinaria (`exceptional_items` positivo) que un ajuste sacó de ingresos (Goiás 2024 contra 2023, la venta a la LFU).
- Medido: UC (lote 07) y Fortaleza (lote 08), 26 verificaciones idénticas (una nota de ajuste se repetía en Fortaleza 2022 y se corrigió); Goiás: 2008, 2009, 2011 cierran con la lectura 4; 2014 pasa a ok (su vecino 2015 ya está bien).

## Versión 395 — Etapa 2, escalón 1: rearmar páginas con el texto propio del PDF (2026-10-02)

- `texto-propio-a-md.mjs` (nuevo, gratis): rearma páginas del .md con el texto propio del PDF (`pdftotext -bbox`): separa las columnas de la página por los huecos verticales que casi ningún renglón cruza, une a su izquierda una "columna" que es solo importes (la del otro año), y arma tablas Markdown con etiqueta + importes (el número de nota va a la etiqueta). Guarda el .md anterior en Generados/ (`.antes-texto-propio.md`).
- `lote.mjs`: escalón en el camino de error (`--reintentar`): si la etapa 4 dijo que el .md no coincide con el texto propio (cifras con un dígito distinto, casi nada en común, o texto parcial con números no confirmados) y la verificación no quedó ok, se rearman esas páginas y el documento vuelve a localizar, validar y extraer. Una vez por documento (el .md queda marcado).
- Caso: Goiás 2008, pág. 1: "Pessoal (15.643.605)" (PDF) contra "Passas (15.845.699)" (Mistral); 2015: "Receita líquida 70.333.324,50" contra "70.303.924.30".
- Medido (ensayo): UC (lote 07) y Fortaleza (lote 08) no lo activan; Goiás, los 7 documentos de 2008-2012, 2015 y 2016. UC 2015 (híbrido, 2 números no confirmados en la pág. 59) lo activaba hasta exigir que la verificación no esté ok.

## Versión 394 — Ajuste manual `categoria` (escalón 0 de la categorización, también entre lados) (2026-10-02)

- `ajustes.mjs`: campo nuevo `categoria` (--etiqueta, --valor <categoría>). `cargar.mjs` lo toma como escalón 0: gana sobre todo, también sobre la compuerta del lado; si la categoría es del otro lado, la fila se muda sin cambiar su efecto en el resultado (un ingreso de 140 pasa a gasto de +140).
- Caso: Goiás 2023, "Outras Receitas e Despesas" 140.214.785 (venta del 20% de la Liga Forte União) como exceptional_items. La corrección a mano de `ed302de9` se rehízo con `cargar.mjs --reemplazar`: mismo resultado (ingresos 89.972.753, officialTotalRevenue = Receita líquida impresa), ahora sobrevive a una recarga. `cola.mjs --corregir-categoria` no servía: la compuerta del lado la descartaba en silencio.

## Versión 393 — Etapa 6: el chequeo del año anterior usa la lectura con la que cerró el año (2026-10-02)

- `verificar.mjs`: si el año cerró con la lectura 3, la columna del año anterior también suma los renglones sin lado por su signo (y lee los subtotales con ellos), igual que lo cargado.
- Caso: Goiás 2024, la columna 2023 sumaba 89.972.753 y el sitio tiene 230.187.538 (con "Outras Receitas e Despesas" 140.214.785): falsa alarma. Ahora 230.187.538 = 230.187.538; 2023 contra 2022, 106.090.159 = 106.090.159.
- Medido: Fortaleza (lote 08) idéntico; Goiás 2023 y 2024 pasan de cola a ok; el resto igual.

## Versión 392 — Etapa 6: una hoja de nota que resta del otro lado se escribe en su lado (2026-10-02)

- `verificar.mjs`: al escribir las líneas, una hoja de nota de un lado que quedó restando dentro del otro (signo negativo) se escribe en su propio lado y en positivo. Las sumas y el cierre no cambian.
- Caso: Goiás 2025, "Outras Receitas (b)" 1.439.848 (ingreso) dentro de "Outras Receitas e Despesas" (gastos), .md L1299-1303: salía como ingreso de −1.439.848 y la carga no cerraba (ingresos 43.934.776 en vez de 46.814.472).
- Medido: Fortaleza (lote 08) idéntico; Goiás: solo cambia esa fila de 2025. 2023 y 2024 pasan a la cola por el chequeo del año anterior cargado, que ahora corre (2022 y 2023 están en el sitio) y no ve las filas sin lado de la lectura 3: pendiente.

## Versión 391 — Carga: la apertura de un bloque se busca al principio de una línea (2026-10-02)

- `cargar.mjs` (`insertarEnObjeto`): "Object.assign(sources, {" y las demás aperturas se buscan al principio de una línea. El esqueleto de `alta-club.mjs` trae un comentario que nombra esa apertura y la búsqueda caía en el comentario: la primera carga de Goiás (2021) se revertía con "no pude cerrar el bloque".

## Versión 390 — Ajuste manual `anio` (escalón 0 del año del ejercicio) (2026-10-02)

- `ajustes.mjs`: campo nuevo `anio`. `alta-club.mjs` (y con él `cargar.mjs`) y `onboard.mjs --quien` lo toman antes que el nombre del archivo.
- Caso: Goiás, `demonstracoes-contabeis-2017-2016.pdf` daba ejercicio 2016 (último año del nombre); el contenido cierra el 31-12-2017. Ajustes para los 10 archivos 2008-2007 a 2017-2016. Con el ajuste, 2017: año 2017, liga br-serieB, tipo de cambio BRL@2017-12-31.
- Perfil de Goiás (`Admin/perfil-clubes.jsonl`, subagente Sonnet): socios sí (Associados, Nação Esmeraldina, Sou Goiás), otros deportes sí ("Esportes Olímpicos" como renglón de ingresos, sin disciplinas nombradas).
- Cola: perímetro de Goiás 2022-2025 contestado "individual" (la palabra "consolidado" era de deudas parceladas).

## Versión 389 — Ligas: tablas de "equipos por estado" en Wikipedia (2026-10-02)

- `fetch-club-league-reference.mjs`: si la última columna del encabezado es plural ("Team(s)", "Teams", "Clubs"), se toman todos los equipos de esa celda. Caso: Série B 2017 y 2021, cuya única tabla es "Number of teams by state": salían números de rowspan y nombres sueltos, y Goiás no aparecía.
- Caché `tools/club-league-reference/br.json`: Série B 2017, 2021, 2024 y 2025 y Série A 2023 (20 equipos en 2017 y 2021; Série B 2024-2025 traen además nombres de estadios, regla vieja de la primera celda, sin tocar). Série B 2024 y 2025 iguales con la regla nueva.

## Versión 388 — Etapa 6: financiero e impuesto sin renglones toman su subtotal impreso (2026-10-02)

- `verificar.mjs`: si el estado no trae ningún renglón financiero (o de impuesto) pero sí UN subtotal/total de ese lado, se usa ese subtotal. Si hay renglones, el subtotal no se usa.
- Caso: Goiás 2023, solo "Resultado financeiro líquido (1.425.102)" (pág. 7 del visor, .md L221): el financiero daba 0 y el resultado no cerraba. Ahora cierra (124.434.274); queda en la cola solo por una duda de extraer (nota 19).
- Medido: Fortaleza (lote 08) idéntico; Goiás: solo cambia 2023.

## Versión 387 — Etapa 6: la lectura 3 lee los subtotales con los renglones sin lado (2026-10-02)

- `verificar.mjs`, lectura 3 ("renglones sin lado según su signo"): antes de decidir si un subtotal es la suma de los renglones de arriba o de abajo, cuenta también los renglones sin lado, con signo o en valor absoluto. Hasta ahora esos renglones se ubicaban después y el subtotal se sumaba además de sus componentes.
- Caso: Goiás 2024, "Despesas (34.610.029)" impreso arriba de administrativas + tributárias + "Outras Receitas e Despesas" (6.903.788, sin lado), pág. 7 del visor, .md L209-212. Los gastos daban 138.963.710 en vez de 111.257.469. En 2022, "Outras" es positivo (8.918.100) y solo cierra la suma con signo.
- Medido: Fortaleza (lote 08) igual (2023 cambia solo porque ahora el sitio tiene 2022 para el chequeo del año anterior). Goiás: 2022 y 2024 pasan de cola a ok; el resto igual. UC no se midió (decisión de Guido).

## Versión 386 — Etapa 8: escalón de materialidad en la categorización (2026-10-02)

- `cargar.mjs`: después de todos los escalones, por lado (ingresos / gastos): si la suma de todas las filas en duda es como mucho el 1% del total de ese lado (compuerta), las de confianza 0,60 o más se cargan con su categoría y un aviso; las de menos siguen a la cola; si pasa el 1%, todas a la cola. Los casos de la cola se crean después de este escalón.
- Medido: propuestas de carga de UC (16) y Fortaleza (9) idénticas; ninguna tiene dudas abiertas, así que el escalón todavía no actuó sobre un caso real.

## Versión 385 — Caja y deuda: el total de la nota de deuda (2026-10-02)

- `caja-deuda.mjs`, escalón 1: si no hay filas de deuda financiera pero sí el TOTAL de una nota de deuda (en cualquier página), se propone ese total; "ninguna fila = 0" solo si tampoco existe ese total. La compuerta busca una fila de notas también en las notas del documento vecino.
- Caso: Fortaleza 2018 y 2019 tienen solo "Total Prestamos y Sobregiros Bancarios" (4.398, L396; 794, L582): se escribía deuda 0 y la compuerta lo dejaba pasar (2017 también es 0). Se corrigió antes de commitear.
- Fortaleza (corrida de Guido con IA, US$ 0,20, y esta): caja 2017 1.181.510 y 2018 919.687 (totales de la nota 6); deuda 2017 0, 2018 4.398, 2019 794, 2020 188.998, 2021 102.513. Medido: propuestas de UC idénticas.

## Versión 384 — Fortaleza CEIF 2017-2025 entero en el sitio local (2026-10-02)

- 2021 (ajuste `cero-real` de Estadio) y 2022 (ajuste `desglose` de Patrocinios; categorización ~US$ 0,05) cargados con `cargar.mjs --desde-verificacion --escribir`, auditoría P0 0 · P1 0. Totales de los 9 años iguales a la verificación; revisado en el sitio local (2025: ingresos 6,3 M USD, resultado +0,1 M USD).

## Versión 383 — Caja y deuda: la caja es una parte de la nota de efectivo (2026-10-02)

- `caja-deuda.mjs`, escalón 1: si la fila de caja está en una tabla que termina en un total que suma sus filas, se proponen todas esas filas; la compuerta compara contra el total de la nota de efectivo del documento vecino (las filas cambian de nombre entre años, el total no). Un 0 al principio de la fila ya no se toma como número de nota.
- Casos: Fortaleza 2024 "Caja 430" pasa a 97.795 (Bancos 97.365 + Caja 430); 2023 "Caja | 0 | 2.152" se leía 2.152 (columna 2022), ahora 19.742; 2025, 1.767.496.
- Medido: propuestas de UC idénticas. Fortaleza: 5 datos (caja 2023-2025, deuda 2024-2025).

## Versión 382 — Ajuste manual `desglose`: escalón 0 del cierre de una nota con un error del documento (2026-10-02)

- `ajustes.mjs`: campo `desglose` (etiqueta del renglón, valor = la diferencia impresa, categoría opcional). `verificar.mjs`: si la nota de ese renglón no suma, se abre igual con una fila "Diferencia en el documento", solo si la diferencia es exactamente la del ajuste (compuerta). `cargar.mjs`: la categoría del ajuste es escalón 0 de esa fila.
- Caso: Fortaleza 2022 "Patrocinios (1)" 2.334.630 con detalle que suma 2.280.630: se abre y la televisión (1.208.394) queda aparte; diferencia 54.000 como patrocinio.
- Medido: carga de UC idéntica (16 de 16). Fortaleza: solo cambia 2022 (más el chequeo "año anterior cargado", que ahora corre contra los años ya cargados y coincide).

## Versión 381 — Ajuste manual `cero-real`: escalón 0 del aviso de categorías en 0 (2026-10-02)

- `ajustes.mjs`: campo `cero-real` (valor = la categoría del aviso: "Estadio", "Televisión"...). `cargar.mjs`: si hay un ajuste para esa categoría, el 0 es real: no frena ni pide reintento, queda como aviso.
- Caso: Fortaleza 2021, Estadio en 0 (boletería "-" en 2021, L1141). Medido: propuesta de carga de UC idéntica (16 de 16).

## Versión 380 — Fortaleza CEIF 2017-2020 y 2023-2025 en el sitio local (2026-10-02)

- Alta del club (`alta-club.mjs`, color #003366 de Guido) y 7 años con `cargar.mjs --desde-verificacion --escribir`, un commit por año, auditoría P0 0 · P1 0 en cada uno.
- Frenan 2021 (Estadio en 0: real, la boletería 2021 es "-", L1141) y 2022 (Televisión en 0: el renglón "Patrocinios (1)" dice 2.334.630 y su detalle suma 2.280.630, error del documento; la TV 1.208.394 queda adentro).
- Caja y deuda sin escribir: `caja-deuda.mjs` toma "Caja 430" en vez del total del efectivo 97.795 (2024, nota 6).

## Versión 379 — Alta: el esqueleto del archivo de datos trae el bloque de fuentes (2026-10-02)

- `alta-club.mjs`: el `data/<id>-data.js` nuevo trae `Object.assign(sources, {});`, donde `cargar.mjs` agrega la fuente de cada año. Sin él, la primera carga de un club dado de alta por script se revertía ("no encontré Object.assign(sources, {"). Caso: Fortaleza CEIF, primera vez que alta y carga corrieron juntas; a su archivo se le agregó el mismo bloque.

## Versión 378 — Etapa 8: una fila verificada no se excluye sola por "no es rubro" dudoso (2026-10-02)

- `cargar.mjs`: en una fila que viene de la verificación, un "no_es_rubro" de Claude por debajo del umbral sigue el camino de la compuerta del lado (precedente de su lado, o la genérica a la cola). Cierra el pendiente del HANDOFF (UC 2010, "Ingresos por recaudaciones y otros").
- Caso: Fortaleza 2019 "Total Costo de Ventas" 137.713 y 2020 52.995 (Claude, 0,6) se excluían y el resultado no cerraba.
- Medido: propuesta de carga de UC idéntica (16 de 16). Fortaleza: los 9 años cierran en la carga; quedan preguntas de categoría y categorías en 0.

## Versión 377 — Etapa 8: compuerta del lado en toda la escalera de categorización (2026-10-02)

- `cargar.mjs`: la lista de categorías del documento se busca por etiqueta y lado; una categoría (de la lista o del precedente) del otro lado que la fila no se acepta; si no hay ninguna de su lado, se propone la genérica del lado (otros ingresos / otros gastos) con confianza 0 y va a la cola con la clave "etiqueta|lado".
- Caso: Fortaleza 2025 "Diversos" 1.986 (otros ingresos) que Jev categorizó other_expenses con 0,99; "Ajuste al peso" del lado contrario.
- Medido: propuesta de carga de UC idéntica (16 de 16); en Fortaleza 2021-2025 los cierres de la carga coinciden con la verificación.

## Versión 376 — Etapa 8: "impuesto" / "intereses" en la etiqueta no mueven una fila verificada con lado (2026-10-02)

- `cargar.mjs`: el destino por palabras (a impuesto o a financiero) solo para filas sin lado; una fila que viene de la verificación con lado se queda de ese lado.
- Casos: Fortaleza 2025 "Impuestos" 11.98 (gasto) iba a impuesto a las ganancias; 2019 "Intereses por mora" 55.745 (ingreso) iba a financiero.
- Medido: propuesta de carga de UC idéntica (16 de 16); en Fortaleza el financiero de la carga coincide con el de la verificación.

## Versión 375 — Etapa 6 → 8: financiero e impuesto se escriben como su efecto en el resultado (2026-10-02)

- `verificar.mjs`: `financiero` e `impuesto` del `.verificacion.json` llevan el signo con que cerró el resultado (lectura con signos invertidos, impuesto "restado", ajuste con impuesto deducido); `signosCarga` dice qué se invirtió. `cargar.mjs` los suma tal cual. Escalón "lo que cerró en la etapa 6 no se vuelve a decidir en la 8" (aprobado por Guido).
- Caso: Fortaleza 2025, impuesto 372.407 que había que restar; la carga lo sumaba.
- Medido: propuesta de carga de UC idéntica (16 de 16). Fortaleza: el impuesto resta en todos los años; 2017 y 2018 cargarían.

## Versión 374 — Etapa 8: la respuesta de categoría de la cola respeta el lado de la fila (2026-10-02)

- `cargar.mjs`: compuerta del escalón 0 de la categorización: la respuesta de Guido se aplica solo si su categoría es del mismo lado que la fila en el documento; si no, la fila sigue por la escalera y, si llega a la cola, su caso lleva el lado en la clave ("etiqueta|lado"), así no choca con el ya contestado.
- Caso: Fortaleza 2025 "Comisiones" 17 (ingreso) tomaba "gasto de administración" de la respuesta de 2024; ahora `other_income`. "Auxilio de transporte" es gasto en 2020/2023 e ingreso en 2021-2024.
- Medido: propuesta de carga de UC (lote 07, `--reemplazar`) idéntica en los 16 años; Fortaleza cambia solo esa fila.
- Cola: 160 respuestas de categoría de Fortaleza (tabla aprobada por Guido; auxilios y subsidio de la Dimayor a `other_income`).

## Versión 373 — Etapa 8: escalera del tipo de cambio con compuerta de fecha (2026-10-02)

- `alta-club.mjs` (lo usa también `cargar.mjs`): escalón 0, ajuste manual `fx` (nuevo campo de `ajustes.mjs`); escalón 1, declarado por el documento, con COMPUERTA: si la frase de la cotización trae una fecha completa que no es la del cierre, no es la de cierre y se descarta (queda escrito en el aviso); después tabla y serie oficial, como antes. `fechasDe` lee también "20 de noviembre del año 2025".
- Caso: Fortaleza CEIF 2025, L534 "El 20 de noviembre del año 2025 ... a la TRM de $ 3.716,73" se tomaba como declarado; ahora 3.757,08 (TRM oficial al 31-12-2025).
- Medido: tipo de cambio de los 16 años de UC idéntico; Fortaleza solo cambia 2025.

## Versión 372 — Fortaleza CEIF 2017-2025 verificado entero; el impuesto calculado de cada ajuste, a la vista (2026-10-02)

- `ajustes.mjs`: el listado muestra, al lado de cada `resultado-final`, el impuesto que verificar.mjs calculó por diferencia (el ajuste no tiene compuerta: un error en las filas termina en el impuesto).
- `verificar.mjs`: fuera la parte B de la Versión 363 (una duda de escala contestada por la escala del año vecino: era un desvío entre escaleras). Queda la parte A: el tema "escala" no lo confirma la aritmética.
- Ajustes: Fortaleza 2018 y 2019, costo financiero en negativo (2018: total rotulado "Total Otros Ingresos" en el PDF, como 2017; el impuesto pasa de 248.440 a 40.604 y el documento imprime 40.612; 2019: de 114.320 a 17.462); `sin-dudas` en 2018, 2019 y 2022.
- Resultado (lote 08c, ~US$ 0,83 + 0,07 de categorización, y verificar): los 9 años de Fortaleza en "ok", cola vacía. Lote 07 (UC) idéntico.

## Versión 371 — Revertida la Versión 367 (2026-10-02)

- `indice-bloques.mjs`: fuera la regla "encabezado que es fila de datos continúa la tabla anterior" y `VERSION_AMPLIADO` vuelve a 2. Decisión de Guido: era una regla, no una escalera, y el caso que la originó (Fortaleza 2017, nota 23) lo resuelve un ajuste manual. Si vuelve a hacer falta, entra como escalón.
- Medido: los índices de UC y Fortaleza son idénticos a los de antes de la 367; UC 2010, 2011, 2013, 2015 y 2022 vuelven a `reintentado: true`.

## Versión 370 — Etapa 3: el ajuste manual de resultado es la pista para "las notas hacen de estado" (2026-10-02)

- `ajustes.mjs`: `--linea` para cualquier campo. `localizar.mjs`: opción `pistaResultado` (valor y línea): le dice a la IA dónde está impreso el resultado y muestra ese bloque aunque tenga una sola cifra; deja `intentoNotasConAjuste`. `lote.mjs --reintentar`: un documento que quedó como fuente y tiene un ajuste `resultado-final` con línea repite una vez las notas como estado con esa pista.
- Ajustes: Fortaleza 2018 "Resultado Año 2018 (639,077)" (L542) y 2019 "Utilidad Contable (52,122)" (L455). `Admin/lote-08b.txt`: Fortaleza 2022, para volver a localizar con el año bien leído.
- Medido (ensayos, gratis): lote 07 (UC) no reintenta nada (US$ 0,00); lote 08 reintenta 2018 y 2019 (con la pista) y 2020 y 2024 (desgloses, índice v3), ~US$ 0,49; lote 08b ~US$ 0,12.

## Versión 369 — Etapa 1: escalera de la fecha de cierre (2026-10-02)

- `periodo.mjs`: compuerta, un cierre no puede ser de más de 2 años después de hoy (Fortaleza CEIF 2022 leía 2050-12-31 de "la duración legal del Club es definida hasta el 31 de diciembre del 2050"; "posterior a hoy", lo primero que se probó, dejaba sin fecha los presupuestos 2026-27 de Boca y Racing). Escalón 1: si los títulos no traen el cierre, la primera fecha de los encabezados de columna de las tablas cuya columna de al lado es el mismo día un año antes (Fortaleza 2017-2020: "| | A 31 de Diciembre de 2020 | A 31 de Diciembre de 2019 |").
- Medido: UC sin cambios (ni en `periodo` ni en la verificación). Fortaleza 2017-2020 y 2022 con el año correcto; 2020 y 2021 se confirman por año vecino y quedan en "ok". El registro (`inventario-transcripciones.mjs`, global) suma fecha a 102 documentos que no tenían (1 con "el nombre no coincide": Levadiakos 2019, leído 2018-06-30) y no pierde ninguna.

## Versión 368 — Ajustes manuales de filas; Fortaleza CEIF 2017 cierra (2026-10-02)

- `tools/ajustes.mjs`: campo `fila` (etiqueta, lado, valor impreso con signo, línea, `reemplaza` opcional); varias por documento. `verificar.mjs` las aplica antes de la escalera de lecturas (escalón 0); `reemplaza` saca también las filas de la nota que abría esa fila.
- Fortaleza 2017 (decisión de Guido: el camino de error para un año así es el ajuste manual, no otro reintento): "Otros gastos" 41.780 (nota 23 perdida en un salto de página), "Costos financieros" (3.581) en lugar de "Total Otros Ingresos" (etiqueta cruzada en el PDF), resultado final 1.347.094. Antes de impuestos 1.638.692, impuesto deducido 291.598.
- Medido: lote 07 (UC) idéntico salvo `reintentado` (true → false en 2010, 2011, 2013, 2015, 2022: efecto de `VERSION_AMPLIADO` 3 de la Versión 367; el ensayo de `--reintentar` no reintenta ninguno, no tienen desgloses pendientes). Lote 08: solo cambia 2017.

## Versión 367 — Índice ampliado: una tabla cuyo encabezado es una fila de datos continúa la de la página anterior (2026-10-02)

- `indice-bloques.mjs` (solo el índice AMPLIADO, el del reintento): en la página siguiente, una tabla con separadora cuyo "encabezado" es una etiqueta con importes que no son años se marca `continuaDe` y ese encabezado pasa al cuerpo. Caso: Fortaleza CEIF 2017, nota 23 "Otros gastos" (filas L756-761, total 41.780 solo en L771). `VERSION_AMPLIADO` 2 → 3.
- Medido en las 41 transcripciones de UC y Fortaleza: el índice normal no cambia; el ampliado de UC no cambia; en Fortaleza cambian 27 bloques, todos tablas cortadas por un salto de página. Descartado al medir: contar los años de los encabezados como importes (encadenaba casi todas las tablas) y la misma página (3 falsos positivos en 2021-2022).

## Versión 366 — Ajustes manuales: una base de consulta que leen los scripts (2026-10-02)

- `tools/ajustes.mjs` + `Admin/ajustes-manuales.jsonl`: una decisión de Guido atada al documento y al campo (no al texto de una pregunta de la cola). `node tools/ajustes.mjs` lista; `--agregar "<pdf>" <campo> --valor --motivo --evidencia` agrega. Campos: `resultado-final` (el impreso; el impuesto se deduce) y `sin-dudas` (las dudas del documento quedan como nota).
- `verificar.mjs`: el ajuste es el escalón 0 (gana siempre); con `resultado-final` los chequeos de resultado que no cerraban quedan aceptados por el ajuste. Queda en el `.verificacion.json` (`ajustes`). El caso `resultado-final` de la cola ahora pide un ajuste (la respuesta en la cola de la Versión 365 ya no aplica).
- `cargar.mjs`: cada ajuste aplicado se escribe como comentario arriba de la meta del año.
- Fortaleza CEIF 2023 pasó de las respuestas de la cola a dos ajustes (resultado final 1.021.768; sin dudas). Medido: lote 07 (UC) idéntico; lote 08 igual salvo 2023 (mismo resultado, ahora por ajuste).

## Versión 365 — Fortaleza CEIF 2023 cerrado por decisión de Guido (2026-10-02)

- `verificar.mjs`: una respuesta `corregir --valor` al caso `resultado-final` fija el resultado final y DEDUCE el impuesto (antes de impuestos − final), para que la carga cierre.
- Cola: Guido decidió cerrar Fortaleza 2023 por la fuerza ("que nunca más vuelva como problema o duda"). Respuestas: `b5a087e` resultado final 1.021.768 (patrimonio, .md L1099; impuesto deducido 588.049 en vez de 589.589), y las dudas `e415497`, `69bf7de`, `5cad482`, `96d6edd` aceptadas, `247c2f6` "no". 2023 queda en "ok" (cola 29 → 23). Lote 07 (UC) idéntico.

## Versión 364 — Etapa 6: escalera del resultado final (el signo del impuesto) (2026-10-02)

- `verificar.mjs`: si se cerró contra "resultado antes de impuestos", el resultado final ya no es siempre antes + impuesto: candidatos antes ± impuesto; escalón 0, el que está impreso en el .md del documento; escalón 1, el que imprime el documento del año siguiente en la columna del año anterior; compuerta, uno solo coincide. Si no, caso `resultado-final` en la cola (`corregir --valor` con el impreso fija el resultado) y `resultadoParaCargar` null. Queda en `totales.resultadoFinal`.
- Medido: lote 07 (UC) mismo resultado y rubros en los 16 años (2012 suma el chequeo "resultado final": −742.014 impreso en L149). Lote 08: Fortaleza 2025 pasa de 1.058.254 a 313.440 y 2024 de 1.287.455 a 466.323 (impuesto restado, impreso en la nota de patrimonio); 2023 a la cola (impreso 1.021.768, ningún candidato).

## Versión 363 — Etapa 6: las dudas de escala las contesta la escalera de escala, no las sumas (2026-10-02)

- `verificar.mjs`: el tema "escala" sale del escalón 2 de las dudas (las sumas no confirman una escala: cerrar es invariante a la escala del documento entero). Si el documento tomó la escala del año vecino (escalón 1 de la Versión 362), la duda queda contestada por esa escala, con nota; si no, a la cola. Caso: Fortaleza CEIF 2023 tenía aceptadas a la vez "¿están en miles?" y "¿están en unidades y no en miles?".
- Medido: lote 07 (UC) idéntico (ninguna duda de escala). Lote 08: misma cola; 2023 y 2024 cambian solo el texto de las notas.

## Versión 362 — Etapa 6: escalera de escala (la del año vecino) (2026-10-02)

- `verificar.mjs`: si el documento dice escala "no se sabe", el escalón 1 propone la del año vecino anclado (la declara o ya la resolvió así) cuando los ingresos del año en común dan exactamente x1.000 o x1.000.000; la compuerta es el mismo chequeo de año vecino (4b). Queda en el `.verificacion.json` como `escala { valor, escalon, factor, de }`. Una escala declarada nunca se pisa.
- `verificar.mjs`: el año vecino se busca entre los documentos del año que pasaron por extraer (antes, el primero del año: Fortaleza 2023 nunca se comparó con 2024 porque el primero era `certificacion-ef-2024.pdf`).
- `verificarLista()` (usada por `verificar.mjs --lista` y la etapa 6 de `lote.mjs`): si un documento resolvió la escala por el escalón 1, repite la pasada una vez.
- Medido: lote 07 (UC) idéntico (16 `.verificacion.json` y `.rubros.json`). Lote 08: Fortaleza 2024 y 2023 pasan a miles (ingresos 12.206,258 y 5.998,469 millones de COP; rubros exactamente x1000), 2025↔2024↔2023 coinciden; salen de la cola 9535f3f, 19ba845, e4c96b9 y los "primer año" de 2025 y 2023 (cola 35 → 28).

## Versión 361 — Verificar lee el resultado impreso por su etiqueta (2026-10-02)

- `verificar.mjs`: si la línea que extraer marcó como "resultado del ejercicio" dice "antes de impuestos", se toma como resultado antes de impuestos (lectura 1), no como final. Caso: Fortaleza CEIF 2023-2025 (las notas hacen de estado), donde se restaba el impuesto a "Utilidad contable antes de impuesto". Medido: UC 16 años idéntico; Fortaleza 2023, 2024 y 2025 pasan a cerrar, 2021 sigue cerrando (por la lectura 1).

## Versión 360 — Etapa 3, escalón 2: las notas hacen de estado (2026-10-02)

- `lote.mjs --reintentar`: un documento cuya localización no encontró estado de resultados pero sí notas de ingresos y de gastos (y no es candidato a re-transcribir) vuelve a localizar con `notasComoEstado`, una vez. `localizar.mjs`: PEDIDO_NOTAS_COMO_ESTADO (elegir las notas cuyo total es un renglón del estado y el bloque del resultado impreso). `extraer.mjs`: INSTRUCCION_NOTAS_COMO_ESTADO (una fila por nota con el título como etiqueta y el TOTAL impreso; sus filas la desglosan). Verificar sin cambios. Caso: Fortaleza CEIF (solo notas; 2023: notas 19-25 suman 1.609.817 = "Utilidad contable antes de impuesto", nota 8).
- Medido: lote 07 (UC), con y sin `--reintentar`, idéntico antes y después. Ensayo del lote 08: 8 de 9 años entran al escalón (~US$ 0,97); 2022 no, porque `periodo.mjs` le dedujo cierre 2050-12-31 ("duración legal hasta 2050").

## Versión 359 — Universidad Católica 2010-2025 escrita en el sitio por el script (2026-10-02)

- UC 2010-2017 cargados con `cargar.mjs --desde-verificacion --escribir` (un commit por año, audit.js P0 0 · P1 0). 2022-2024 rehechos con `--reemplazar`: "Servicios de Seguridad" pasa a organización de partidos (65,574 / 72,244 / 77,365 millones de CLP), tipo de cambio del documento en vez del de mercado, se conservan caja, deuda, gestión y los jugadores vendidos.
- Caja y deuda de 2010-2025 con `caja-deuda.mjs --club catolica-cl --escribir`: 21 de 26 vacíos; sin dato deuda 2011, 2012, 2015, 2016 y caja 2015 (2016 reexpresa la caja de 2015; 2011 tiene "Pasivos financieros no corrientes" que no coincide con 2010).
- `cargar.mjs`: la meta escribe `gestionId`, `grossDebt` y `cash` reales (en un año nuevo siguen en null); arreglo del escape en la búsqueda del año de `--reemplazar`.

## Versión 358 — cargar.mjs --reemplazar: rehacer con el script un ejercicio ya cargado (2026-10-02)

- `cargar.mjs --reemplazar`: "ya cargado", "la fuente ya existe" y "sin .categorias.json" pasan de frenar a aviso (lo demás frena igual); al escribir borra los bloques del año y escribe los nuevos, conservando grossDebt/cash (si el script no los trae), gestionId, la fuente existente y los `items` (jugadores vendidos) por etiqueta. Sin `--reemplazar`, la propuesta de los 16 años de UC es idéntica antes y después.

## Versión 357 — Caja y deuda: una escalera con una sola compuerta (2026-10-01)

- `caja-deuda.mjs` rehecho a pedido de Guido ("siempre escalera, sin reglas una encima de otra"): una escala por documento (la del estado de resultados contra lo cargado); los escalones 0 (precedente del club), 1 (vocabulario, con "ninguna fila" = deuda 0) y 2 (IA, solo números de línea) solo PROPONEN filas; una sola compuerta para los tres (año anterior cargado o documento siguiente, mismas filas, columna del año anterior). Fuera: escala propia por escalón, confirmaciones distintas por escalón, el "ninguna" de la IA, la deduplicación por importe. Valor absoluto al leer cualquier fila.
- Medido (205 años, respuestas de IA guardadas): deuda 10 iguales / 8 distintos / 187 sin dato; caja 50 / 4 / 151. Los distintos que pasan la compuerta: compuerta circular (Bahia 2025, Tottenham 2025), número del año no confirmado (Espanyol 2025 "13.950,790,99", Flamengo 2024 dos columnas pegadas), lectura del balance (U. de Chile 2022, Wolves 2025), y 6 que no son error del script (Colo-Colo con 0 de relleno en el sitio; AZ, PSV, Athletico con otro criterio en lo cargado a mano).

## Versión 356 — Caja y deuda como comando aparte, sobre clubes ya publicados (2026-10-01)

- `caja-deuda.mjs --club <id> [--ejecutar] [--escribir]` (decisión de Guido: "dos scripts"; caja y deuda no van en el lote): completa `grossDebt`/`cash` solo donde el sitio tiene null, de más viejo a más nuevo (un dato completado cuenta como cargado para el año siguiente); `--escribir` reemplaza solo esos null en `data/<club>-data.js` con un comentario de la fuente, y publica (ASSET_V, generadores, audit.js; revierte si da P0/P1).
- `cargar.mjs`: `publicarCambios()` sacado de `escribir()` sin cambios (lo reusa caja-deuda.mjs); exporta `snapshot`, `revertir`, `runNode`.
- UC: los 10 vacíos (2018-2021 y 2025) salen sin IA; deuda 2018-2019 = 0, 2020 = 1.016.921 (L138 + L146), 2021 = 763.151, 2025 = 30.952.393.

## Versión 355 — Caja y deuda: la medición con IA hace 6 llamadas a la vez (2026-10-01)

- `caja-deuda.mjs --medir --ia --ejecutar`: llamadas de a 6 en paralelo, con avance cada 10 documentos (pedido de Guido: tardaba demasiado de a una).

## Versión 354 — Caja y deuda: escalón 2 con IA (2026-10-01)

- `caja-deuda.mjs`: `porIA()` (una llamada a Claude por documento, solo si los escalones 0 y 1 no dieron nada) elige las líneas del balance de caja y de deuda (criterio del club si hay precedente; si no, deuda financiera) y la escala con su frase. `datoDeIA()`: las cifras salen de esas líneas del .md, nunca de la IA; se descarta si una línea no es fila del balance o la frase de la escala no está en el balance; se acepta confirmada por un año vecino; "ninguna deuda" + total del pasivo = 0. Respuesta guardada en `Generados/<doc>.caja-deuda-ia.json`. `--medir --ia`: ensayo 171 documentos, ~US$ 5,49.

## Versión 353 — Caja y deuda: un balance completo sin deuda financiera es deuda 0 (2026-10-01)

- `caja-deuda.mjs`: deuda 0 (decisión de Guido) cuando el balance tiene su total del pasivo, ninguna fila es deuda financiera y el club tiene un precedente aprendido de deuda financiera que en este documento no aparece. UC 2010-2019: 0 (2015 y 2019 revisados: el pasivo son cuentas por pagar, provisiones e impuestos). Medido: sin cambios en los 205 años (ningún 0 equivocado). Probado y descartado: sin exigir el precedente, 3 aciertos y 25 ceros equivocados (Boca, Flamengo, Talleres: su deuda se llama de otra forma).

## Versión 352 — Caja y deuda del balance, etapa 6b (paso 1: escalones 0 y 1, sin conectar al lote) (2026-10-01)

- `tools/caja-deuda.mjs` (nuevo): lee `cash` y `grossDebt` del balance. Escalón 0: precedente del club (qué filas, 1 a 3, suman lo cargado en otro año; mismas familias en este documento). Escalón 1: vocabulario. Un dato se acepta solo si lo confirma un año vecino (año anterior cargado o documento siguiente, en su columna del año anterior); el escalón 1 necesita el año anterior cargado (el documento siguiente no ataja un error de escala). Si no, null con el motivo: nunca frena. `--medir`: lectura de los años ya cargados contra lo cargado a mano, con precedente solo de los OTROS años del club.
- `vocabulario.mjs`: conceptos CAJA y DEUDA_FINANCIERA (nuevos, no cambian los existentes).
- Medido (205 años con deuda y caja y con transcripción): deuda 11 iguales, 1 distinta, 193 sin dato; caja 47 iguales, 1 distinta, 157 sin dato. Las 2 distintas las confirma el documento vecino (Athletico Paranaense 2024, Wolves 2025): a revisar si es el criterio de lo cargado a mano. Probado y descartado: leer solo el "balance principal" (arreglaba U. de Chile 2022 y perdía 13 cajas).

## Versión 351 — El lote termina con "Listo para cargar Y" y "Frenados X" (2026-10-01)

- `lote.mjs`: bloque RESULTADO al final de la corrida, con la última propuesta de carga de cada documento de la lista (también los que no pasaron por la etapa 8 en esa corrida): listos (con años), frenados (año y primer motivo), ya en el sitio y sin propuesta. Pedido de Guido. Probado sobre los archivos del lote 07: 8 listos (2010-2017), 0 frenados, 8 ya en el sitio.

## Versión 350 — En la cola, "obsoleto" es un estado y no una respuesta; un caso que vuelve a aparecer se reabre (2026-10-01)

- `cola.mjs`: solo cuentan como respuesta las de Guido (aceptar, corregir, descartar, preguntar-club). "obsoleto" y "reabierto" son estados. `agregarCaso` reabre un caso cerrado como obsoleto que una etapa vuelve a levantar; `pendientes()` y `cola.mjs` lo muestran. Antes: `cargar.mjs` frenaba por un caso que la cola no mostraba (UC 2013, "Otras ganancias (pérdidas)", regresión de la Versión 348) y `verificar.mjs` daba por contestado un chequeo fallado que había vuelto. `cargar.mjs`: sin la excepción por 'obsoleto' (ya no hace falta).
- Medido en los 17 documentos con verificación, dos pasadas con el código viejo y dos con el nuevo desde la misma cola: `verificar` idéntico; `cargar` solo cambia UC 2013 (FRENA → CARGA); la cola no cambia; pasada 1 = pasada 2. Prueba aparte sobre una cola de prueba: cerrar, no volver a cerrar, reabrir.

## Versión 349 — El proceso nuevo le avisa al registro cuando un documento queda listo para categorizar (2026-10-01)

- `verificar.mjs` (`avisarRegistro`): al terminar ok desde el lote, si el `.md` no está cargado ni ya es `listo-para-jev` para su huella, y `validacion.json` es posterior al `.md` y no tiene números sin confirmar, agrega al historial (`transcripciones-verificaciones.jsonl`) la misma línea que escribe `pipeline.mjs`, con método "validar-bloques (proceso nuevo)" y el detalle "solo los bloques que se cargan; el resto del .md no se validó". Caso: UC 2015, re-transcripto, quedaba "sin-verificar" y la etapa 7 no lo categorizaba. Medido en los 16 años de UC: una sola línea nueva (2015); en el registro solo cambia 2015 (sin-verificar → listo, listo-para-jev).

## Versión 348 — Un caso de categoría que una respuesta del club ya resolvió se cierra solo (2026-10-01)

- `cola.mjs`: `cerrarResueltoPorClub()`. `cargar.mjs`: cuando aplica a un documento la respuesta de categoría que Guido dio en otro año del club, cierra el caso pendiente de ese documento con la misma etiqueta (`obsoleto`, con la respuesta que lo resolvió). UC 2013, caso 6c69d0a ("Otras ganancias (pérdidas)", resuelto por 4094e9d de 2014). Medido en los 17 documentos de UC: `.carga.json` y salida de `cargar.mjs` idénticos antes y después; en la cola solo cambia ese caso.

## Versión 347 — El documento re-transcripto en el lote pasa a verificar en la misma corrida (2026-10-01)

- `lote.mjs`: la etapa 6 toma todo estado que empiece con "extraído" (antes, igualdad exacta: UC 2015, re-transcripto con Mistral y extraído en el reintento del lote 06, quedaba sin verificar). Los testigos siguen afuera. Ensayo del lote 06, con y sin `--reintentar`: idéntico antes y después.

## Versión 346 — Dudas confirmadas por la aritmética; la categorización sabe cuándo una fila entró por su signo; diagnóstico de desgloses (2026-10-01)

- `verificar.mjs`: escalón 2 de las dudas: si la escalera cerró, ningún año vecino da distinto, el tema es cuadro por segmento / cuadro duplicado / columna / escala y la propuesta "sí" ya está aplicada, se acepta sola con nota. Las filas que entran por su signo (lectura 3) llevan esa explicación como sección para Jev y Claude. Guarda `faltasDesglose` siempre.
- `tools/diagnostico-desglose.mjs` (nuevo): para un desglose que sigue sin sumar después del reintento, lista las líneas con cifras fuera de los bloques elegidos y por qué el índice las dejó afuera (índice, etapa 3) o dice que no hay (transcripción, etapa 2). `lote.mjs` lo recomienda al final. HANDOFF: escalera de troubleshooting.

## Versión 345 — Índice ampliado v2 (etiquetas partidas en dos renglones); el reintento re-transcribe moviendo la transcripción vieja (2026-10-01)

- `indice-bloques.mjs` (solo el índice ampliado, que usa el reintento): un renglón solo de números debajo de un renglón solo de texto es una fila con la etiqueta partida (UC 2013, cuadro por segmento). `VERSION_AMPLIADO = 2`: un documento reintentado con una versión anterior tiene un reintento más (`verificar.mjs`, `cargar.mjs`, `localizar.mjs`). Medido: ampliado v2 505.203 filas en bloques (v1 498.282, normal 485.595), ningún documento pierde filas.
- `lote.mjs`: el escalón 1 de la etapa 2 mueve la transcripción vieja a Generados/ antes de llamar a Mistral (no la pisaba: "Ya existe el .md"); si Mistral falla, la restaura.
- Lote 06, reintento: UC 2017 da CARGA; UC 2013 vuelve a reintentar con el índice v2; UC 2015 se re-transcribe en la próxima corrida.

## Versión 344 — Arreglos del lote 06: respuesta de categoría por club, resultado derivado, año vecino con fecha deducida, descartados (2026-10-01)

- `cargar.mjs`: una respuesta de categoría vale para todos los documentos del mismo club con la misma etiqueta ("Otras ganancias (pérdidas)" de UC llegaba una vez por año). Tie-out contra `resultadoParaCargar` (si la verificación cerró contra "antes de impuestos", el resultado del ejercicio es ese más el impuesto impreso: UC 2013, 220.616).
- `verificar.mjs`: el chequeo de año vecino usa la fecha deducida del otro documento (UC 2010 contra 2011: ok; ya no pide "primer año").
- `Admin/documentos-descartados.txt` (nuevo): lo saltea `lote.mjs`. UC 2009.

## Versión 343 — Escaleras de la etapa 2 (re-transcribir) y de la 7 (precedente con contexto); dibujos en el HANDOFF (2026-10-01)

- `lote.mjs`: si localizar dice "no hay estado de resultados", la transcripción no es de Mistral y el PDF tiene páginas interiores en imagen, se marca para re-transcribir; con `--reintentar` re-transcribe con Mistral (guarda la anterior en Generados/) y vuelve a localizar y extraer. Caso: UC 2015 (páginas 4-9 en imagen).
- `categorizar-claude.mjs` / `memoria-categorias.mjs` / `cargar.mjs`: lo aprendido guarda el renglón que desglosa su fila (`padre`); el precedente prueba primero misma etiqueta y mismo renglón. Probado con "Remuneraciones" bajo "Costo de ventas" (sueldos del plantel) y bajo "Gastos de Administración" (administración).
- HANDOFF: el dibujo de la escalera de cada etapa (2, 3, 4, 6, 7, 8).

## Versión 342 — Etapa 6: escalera de lecturas; fecha de cierre deducida de los vecinos (2026-10-01)

- `verificar.mjs`: si la lectura base no cierra con un número impreso, prueba en orden: (1) "resultado antes de impuestos" si no hay resultado final, (2) el total impreso puede ser un renglón, (3) renglones sin lado según su signo. Acumulativas; gana la primera que cierra y queda escrita. Si el documento no tiene ningún número impreso para cerrar, es un fallo (antes pasaba como OK). Prueba gratis sobre UC 2010-2025: 2010-2014 cierran con la lectura 3 ("Otras ganancias (pérdidas)" quedaba afuera); los 8 años que ya cerraban siguen con la lectura 0 y las mismas líneas.
- `tools/cierre-vecinos.mjs` (nuevo): sin fecha de cierre detectada, se deduce si el documento anterior y el siguiente del club cierran el mismo día y mes; con aviso. Lo usan `verificar.mjs` y `cargar.mjs`. UC 2011: 31-12-2011, y los chequeos de año vecino contra 2010 y 2012 dan ok.
- Lote 06 (UC 2009-2017): 2009 descartado (PDF de una página escaneada); 2015 sin estado de resultados en la transcripción vieja (falta re-transcribir); 2016 y 2017 limpios.

## Versión 341 — UC 2018-2020 cargados; dudas reconocidas por club + tema + renglón (2026-10-01)

- UC 2018, 2019 y 2020 escritos (reintento por "cuotas sociales en 0": ahora con socios 98.296 / 202.753 / 99.645 y escuelas de fútbol). UC queda con 2018-2025.
- `localizar.mjs` / `extraer.mjs`: cada duda trae `tema` (lista fija: usar-cuadro-por-segmento, cuadro-duplicado, cuadro-de-otro-anio, perimetro, escala, columna, fila-ilegible, otro) y `renglon`. `verificar.mjs` reconoce las de tema fijo por club + tema + renglón (`cola.mjs respuestaPorDetalle`): una respuesta de Guido en cualquier año del club se aplica a todos. Motivo: la misma pregunta del cuadro por segmento llegó tres veces redactada distinto. La respuesta ya dada para UC se pasó a la clave nueva.

## Versión 340 — Reintento por categorías en 0; perfil de clubes (socios, otros deportes) (2026-10-01)

- `cargar.mjs` (etapa 8, con `--desde-verificacion`): marca reintento si salarios del plantel, televisión o estadio dan 0 (siempre), o cuotas sociales / otras secciones deportivas dan 0 y el perfil del club dice que tiene socios / otros deportes. Si el perfil no lo sabe, pregunta de sí o no en la cola y la respuesta se guarda en el perfil. Medido sobre 241 años cargados: con "cualquier categoría en 0" se reintentaría el 94% de los documentos.
- `tools/perfil-clubes.mjs` (nuevo) y `Admin/perfil-clubes.jsonl` (66 clubes sudamericanos, armado por un subagente con evidencia de data/ y transcripciones).
- `lote.mjs --reintentar` toma también estas marcas; `localizar.mjs` y `extraer.mjs` reciben qué faltó en el intento anterior.
- UC 2018-2020: frenan por "cuotas sociales en 0" (localizar no había elegido el cuadro por segmento); reintento pendiente.

## Versión 339 — Peso chileno: la cotización de un cierre es la del primer día con dato posterior (2026-10-01)

- `lookup-fx-close.js` (`diaCierre: 'siguiente'` en CLP) y `alta-club.mjs` (`FX_DIA_SIGUIENTE`): para CLP se toma el primer día con dato posterior al cierre (el dólar observado se publica al día siguiente). Los 12 cierres declarados por UC y Palestino: 11 exactos, 2024 a 0,02 (antes, entre 0,04% y 0,85% de diferencia). Las demás monedas no cambian.

## Versión 338 — Series oficiales de EUR, DKK y GBP; la carga usa el signo verificado (2026-10-01)

- `fetch-fx-reference.mjs`: EUR (BCE, tipo de referencia diario, invertido), DKK (Danmarks Nationalbank, Statbank DNVALD, por 100) y GBP (Bank of England, serie XUDLUSS, invertida). Banco central de cada moneda en vez de la Reserva Federal (H.10 se aleja hasta 0,4-0,9% de lo que declaran los documentos). EUR coincide exacto con 4 cierres declarados por Hajduk Split (tomando el hábil ANTERIOR, aun cuando el 31/12 tiene dato); DKK y GBP sin tipos declarados en las transcripciones: comparados contra BCE cruzado y FRED. `lookup-fx-close.js` y `alta-club.mjs` las conocen.
- `cargar.mjs --desde-verificacion`: usa el signo que decidió verificar.mjs (`signoFijo`) en vez de adivinarlo por tabla. UC 2020 frenaba porque "Feriado Legal −15.597" (reversión dentro de gastos de administración) quedaba sumando gasto (31.194 de diferencia). UC 2018-2020: los tres dan CARGA.
- Lote 05 (UC 2018-2020): la cadena de años vecinos coincide al peso en los tres.

## Versión 337 — UC 2021 y 2025 cargados con todos los desgloses; perímetro del año más cercano (2026-10-01)

- `cargar.mjs`: el perímetro se hereda del año cargado más cercano (UC: individual hasta 2021, consolidado desde 2022); si no se puede heredar, va a la cola como pregunta de sí o no (antes frenaba sin cola).
- UC 2025 recargado (se revirtió la carga anterior): costo de ventas abierto por la columna de totales del cuadro por segmento (sueldos del plantel 10.762.861) e "Ingresos Comerciales" por la columna Comerciales (Membresía de Socios 278.185). En el sitio local: sueldos del plantel 11,9 M USD (42% de los ingresos); "Salarios / Ingresos" ya no da 0%.
- UC 2021 cargado (perímetro individual, como el documento): ingresos 16,8 M USD, resultado −4,2 M, tipo de cambio 844,69 declarado.

## Versión 336 — Camino de error: reintento cuando un desglose no suma (2026-10-01)

- `verificar.mjs` marca `reintentar` con los desgloses (notas o anidados) de 2+ filas que no suman. `lote.mjs --reintentar` vuelve a localizar SOLO esos documentos con el índice ampliado (`indice-bloques.mjs`, opción `ampliado`: filas que terminan en "-") y a extraer con la lista de lo que no sumó y la regla de la columna de Totales para un renglón del estado. Una vez por documento. El camino limpio no cambia (decisión de Guido: las reglas extra son para cuando hay errores).
- Caso que lo motivó, UC 2025 (lote 04): la nota de segmentos tiene el desglose de "Ingresos Comerciales" y del costo de ventas, pero las filas con "-" partían el cuadro (5.180.336 contra 7.940.492; 20.162.209 contra 20.985.893). Con el índice ampliado el cuadro queda entero.
- Lote 04: UC 2021 con "Ingresos Comerciales" abierto por la nota de segmentos da CARGA.

## Versión 335 — Desgloses anidados y cuadros por segmento (2026-10-01)

- `localizar.mjs` / `extraer.mjs`: una nota puede desglosar un renglón de otra nota; un cuadro por segmento se usa solo con la columna del segmento que abre un renglón (UC: columna "Comerciales" -> "Ingresos Comerciales"); los cuadros por jugador no se eligen.
- `verificar.mjs`: `abrirAnidadas()` reemplaza una hoja de una nota por su propio desglose si suma (misma regla de `cerrarNota`), hasta 3 niveles. Probado con las filas de segmentos de UC 2021 agregadas a mano a una copia: "Ingresos Comerciales 6.542.146" se abre en socios, escuelas de fútbol, publicidad, tienda y merchandising; el resultado y la columna del documento 2022 siguen cerrando. Con lo ya extraído, UC 2021 y 2025 no cambian.
- Guido cambió sus respuestas sobre la nota de segmentos de UC 2021 y 2025: sí se usa como desglose de "Ingresos Comerciales", como en 2022-2024.

## Versión 334 — Lote: documentos testigo; UC 2021 da CARGA (2026-10-01)

- `lote.mjs`: una línea `testigo <pdf>` entra solo hasta extraer (para el chequeo de año vecino de otro documento); no se verifica, categoriza ni propone cargar.
- Lote 03: UC 2021 verificado contra la columna 2021 del documento 2022 (14.157.951 contra 14.157.952): primera vez que el chequeo de año vecino corre con datos reales. Propuesta de carga: CARGA (resultado −3.538.301, tipo de cambio 844,69 declarado). No se escribió el sitio.
- Probada y descartada en la misma sesión: "las notas por segmento nunca se eligen". En UC el desglose de "Ingresos Comerciales" (socios, escuelas de fútbol, publicidad, tienda, merchandising) solo está en la nota de segmentos, y 2022-2024 se cargaron con él.

## Versión 333 — Serie oficial del peso chileno (CLP) (2026-10-01)

- `fetch-fx-reference.mjs`: CLP, "dólar observado" del Banco Central de Chile publicado por el SII (HTML público, sin usuario; la API del Banco Central y la de la CMF piden credenciales). 6.666 cotizaciones, 2000-2026, en `tools/fx-reference/clp-usd.json`. `lookup-fx-close.js` y `alta-club.mjs` la conocen.
- Verificada contra los 12 cierres que declaran UC (2016-2025) y Palestino (2018, 2019): 11 exactos y uno a 0,02, PERO tomando el primer día con dato posterior al cierre (el dólar observado de un día se publica al día siguiente). El lookup de hoy toma el hábil anterior y queda entre 0,04% y 0,85% lejos: decisión pendiente.

## Versión 332 — UC 2025 cargado: primer año del proceso nuevo en el sitio; costo de ventas "sin desglosar" (2026-10-01)

- Universidad Católica 2025 escrito por `cargar.mjs --escribir`: ingresos 25.850.434, gastos 25.665.995, resultado −729.845 (miles de CLP), tipo de cambio 907,13 declarado. Auditoría P0 0 · P1 0. Visto en el sitio local: 28,5 / 28,3 / −0,8 M USD.
- "Costo de ventas" (20.985.893, sin desglose porque la Nota 20 del documento trae la tabla equivocada) va a `lump_football_operations_expense` ("sin desglosar por la fuente"); sueldos del plantel se ve "—". Marca nueva `fiscalYearMeta.sinDesglose` (renglón, importe, motivo), que la página todavía no lee.
- `cola.mjs --corregir-categoria`: Guido fija la categoría de una fila aunque la categorización no haya tenido dudas. `cargar.mjs`: escribe `sinDesglose` para toda línea "sin desglosar".
- Visto y pendiente: "Salarios / Ingresos" muestra 0% para UC 2025 (los sueldos están adentro del costo de ventas).

## Versión 331 — Categoría dudosa a la cola en la etapa 8; UC 2025 da "CARGA" (2026-10-01)

- `cargar.mjs`: una fila con categoría menor a 0,80 va a la cola como pregunta de sí o no, cuenta en las sumas con la categoría propuesta y el documento frena con "N filas esperan categoría" (antes quedaba afuera y frenaba con un "no cierra" engañoso). La respuesta de Guido gana sobre cualquier categoría de esa fila y se guarda en `Admin/categorias-aprendidas.jsonl` con confianza 1 (precedente del club). `cola.mjs`: `casoYRespuesta()`.
- UC 2025: con las 3 respuestas de Guido (Transporte, Arriendo de Bienes, Provisión No Operacionales -> gastos de administración), la propuesta de carga da CARGA: ingresos 25.850.434, gastos 25.665.995, resultado −729.845 (igual al impreso), tipo de cambio 907,13 del documento. Primer documento del proceso nuevo que llega a "carga". No se escribió el sitio.

## Versión 330 — La etapa 8 imprime un resumen; UC 2025 espera la Nota 20 del club (2026-10-01)

- `cargar.mjs --lista`: imprime siempre el resumen por documento (carga o frena, motivos, avisos) y deja la propuesta completa en `Generados/.../<doc>.carga.json` (sufijo nuevo en `rutas.mjs`). Antes, un lote de un documento imprimía ~400 líneas de JSON.
- UC 2025: segunda corrida, verificación OK y cola vacía; la carga frena por 3 filas con categoría menor a 0,80. Guido decidió no cargar 2025 hasta tener la Nota 20 (en una línea, sueldos del plantel quedaría en 0).

## Versión 329 — Dudas de la IA como preguntas de sí o no (2026-10-01)

- `localizar.mjs` y `extraer.mjs`: cada duda trae `pregunta` (concreta, se contesta sí o no mirando el PDF) y `propuesta` (sí/no), además del porqué. `verificar.mjs` y `cola.mjs` muestran la pregunta y la propuesta. Pedido de Guido: la cola mostraba explicaciones exploratorias. Dudas en el formato anterior se muestran como antes.

## Versión 328 — Tipo de cambio: con varios valores en una tabla, gana la fecha más nueva (2026-10-01)

- `alta-club.mjs`: si el documento declara más de un tipo de cambio y están en una fila de tabla cuyo encabezado tiene una fecha completa por columna, gana la columna con la fecha más nueva (decisión de Guido). Frases, años sueltos o filas que no se corresponden con el encabezado siguen yendo a la pregunta (cola).
- Medido sobre los 3.358 documentos: cambia en 11 (UC 2016-2025 y Palestino 2018, verificados contra el .md); Fluminense 2022, Argentinos 2019, Racing 2012, San Lorenzo 2015, Club América 2025, Atlético Nacional 2025 y Rubin Kazan 2025 siguen en la cola.
- Reglas confirmadas por Guido: gana el tipo de cambio que declara el documento; si no declara, la serie oficial de `tools/fx-reference/` (nunca una cotización dada por Claude).

## Versión 327 — Primer documento por el proceso nuevo (UC 2025); cierre de notas por estructura; HANDOFF corto (2026-10-01)

- Primera corrida real del proceso nuevo, un solo PDF: Universidad Católica (Cruzados) 2025 (`Admin/lote-02.txt`, US$ 0,24). El resultado cierra y la columna 2024 coincide con el sitio; frenó en la carga por la cola y por dos tipos de cambio declarados.
- `verificar.mjs`: `cerrarNota()` lee la estructura impresa (subtotal que cierra lo de arriba o lo de abajo, renglón suelto en negrita, cuadros de detalle y notas repetidas que no se suman dos veces), con tolerancia de media unidad por fila en vez de 0,5%. Medido en 69 renglones con nota de 27 extracciones: 62 igual, 5 mejoran (UC, Betis, Athletic, Nordsjælland, Levante), Chapecoense deja de "cerrar" 917 contra 912. Filas sin importe ("-") no se cargan.
- Dudas: `localizar.mjs` y `extraer.mjs` las devuelven con bloques y `afecta_carga`; `verificar.mjs` manda a la cola las de las dos etapas, con página y líneas del bloque, y deja las que no afectan la carga como notas.
- `cola.mjs`: casos que la última corrida ya no levanta se cierran solos como `obsoleto`.
- `lote.mjs`: el ensayo ya no llama a extraer de verdad cuando localizar estaba hecho; la etapa 7 no imprime el registro entero.
- Probada y descartada: elegir el tipo de cambio por el encabezado de la columna (4 errores en 17 documentos).
- `tools/archivo/`: `localizar-extraer.mjs` y `test-motores.mjs`. `Admin/Archive/`: `MAPA-DE-TOOLS.md` y el HANDOFF largo; `Admin/HANDOFF-pipeline.md` reescrito corto.
- UC 2025, Nota 20 con la tabla equivocada: a `Admin/dudas-por-club.md` (decisión de Guido: costo de ventas en una línea).

## Versión 326 — La cola humana dice la página del visor y el número impreso (2026-10-01)

- `cola.mjs`: "Abrí el PDF en la página N del visor (la hoja tiene impreso "M" al pie)". El número impreso sale del último renglón de la página en el .md o, si no está, del texto propio del PDF; si no hay, lo dice. Pedido de Guido: buscó "pág. 8" de Bahia en la hoja con el "6" impreso (era otro documento y otra numeración).

## Versión 325 — Índice de bloques: no perder renglones sueltos del estado de resultados (2026-10-01)

- `indice-bloques.mjs`: dentro de un bloque de texto tolera huecos de hasta 3 líneas (blancas, hasta dos líneas de texto sin cifras, o un número de página suelto), y cuenta como fila una línea que termina en 2+ números chicos. Encontrado antes de correr el lote 01: en Bahia 2021 pág. 8 "Outras receitas (despesas), líquidas 64.283" y "Receitas financeiras 77" quedaban fuera de todo bloque, y extraer no los iba a ver.
- Medido sobre las 2.249 transcripciones: filas en bloques 436.679 -> 485.595, ningún documento pierde filas. Bahia 2021 y 2022 y FC Midtjylland 2021 (bilingüe; antes 0 filas de estado) quedan con el estado de resultados entero en un bloque.

## Versión 324 — El proceso nuevo (localizar, validar, extraer, verificar) con cola humana: tools construidas, sin correr (2026-10-01)

- Diseño acordado con Guido etapa por etapa (riesgos, mitigaciones, cola humana) en `Admin/HANDOFF-pipeline.md`, "El proceso nuevo", junto con lo que falló en los tests y lo que no entró. Se trabaja en lotes de 5; no se corrió ningún piloto (pedido de Guido).
- Tools nuevas: `indice-bloques.mjs` (localizar por bloque, no por página: el estado puede empezar a mitad de página), `localizar.mjs`, `validar-bloques.mjs` (números contra el PDF: texto propio o lectura de la imagen; solo los bloques elegidos), `extraer.mjs` (escala por bloque, línea del .md, columna del año anterior), `verificar.mjs` (notas por cierre, totales, resultado, año anterior cargado y documento del año vecino: 101 de los 159 años nuevos tienen el documento siguiente transcripto y solo 2 el año anterior cargado), `cola.mjs` (cola humana con qué abrir en el PDF y en el .md; respuestas que la próxima corrida toma), `lote.mjs` (orquesta las etapas 3-8, ensayo por defecto), `claude-llamada.mjs`. `cargar.mjs --desde-verificacion`. `rutas.mjs`: sufijos nuevos.
- `estado.mjs`: lista los PDFs rotos con el archivo de `fuentes/` a reabrir (antes quedaban como caso cerrado), y el comando del proceso nuevo.
- Probado gratis: índice de bloques (Köln, PSV), ensayos de costo (lote 01: ~US$ 0,63 + categorización), `verificar.mjs` con datos sintéticos del test por página (Köln y Bournemouth cierran; Forest frena por el resultado). `Admin/lote-01.txt`: Bahia 2021-2023 y Athletic Club 2022-2023.

## Versión 323 — Etapa 6 en el tablero por grupo; test localizar-extraer-verificar con IA (2026-10-01)

- `cargar.mjs --lista` deja su última corrida en `Admin/cargar-ultimo.jsonl`; `estado.mjs` la muestra (6c) por grupo y motivo.
- Test de la etapa 4 por grupo (266 años cargados, gratis): la selección por palabras reproduce los ingresos de producción (±2%) en 7%, y "solo el estado principal y sus notas" en 11%.
- `tools/localizar-extraer.mjs` (nuevo, test): Claude localiza las páginas del estado de resultados y sus notas, extrae las filas tal cual y un script verifica (importe literal en la página, escala de la nota deducida del cierre, suma contra producción). 31 años: 5 bien descartados por no tener estado; de 26, ingresos 11 y gastos 18 a ±2% (palabras: 0-1 y 2); 1 de 1.117 importes no literal. US$ 3,52. `rutas.mjs`: sufijos `.localizar.json` / `.extraccion.json`.

## Versión 322 — Grupos de países en el tablero; escala: el "000" de adentro de un número; etapa 6 sobre 159 años nuevos (2026-09-30)

- `tools/grupos-pais.mjs` (nuevo): 12 grupos por marco contable (ARG, BRA, LAT, IBE, GBR, GER, BNL, NOR, EST, MED, ASI, OTR) y, por grupo y etapa, lo propio que ya se vio en documentos reales (pedido de Guido: partir la lógica por país).
- `estado.mjs`: qué tools hacen las etapas 2, 3 y 4; desglose por grupo debajo de cada estado y en la etapa 6; `--logica [grupo]`.
- `proponer-carga.mjs detectScale()`: el "000" de adentro de un número ("363,750,000.00", "$1.000.000") ya no dice "en miles" (Almagro 2023, Racing 2012). Sobre 199 años cargados reconstruidos: ingresos x1000 de más 40 -> 9, bien 71 -> 92. Escala única por documento probada en dos variantes y descartada (empeoraba 15 y 7 años: la prosa de la página engaña).
- Etapa 6 sobre `Admin/piloto-existentes.txt` (159 años nuevos de clubes existentes, categorizados por Guido): 0 cargan; 150 frenan por el cierre de sumas, por tablas que no son el estado de resultados (detalle por grupo y ejemplos en el HANDOFF).
- HANDOFF: reglas de trabajo de Guido (etapa y para qué al proponer un comando, ejemplos reales, siglas explicadas).

## Versión 321 — Etapa 3 = lo que carga la etapa 6; familia de etiquetas; memoria de respuestas pagas; fila de redondeo (2026-09-30)

- `pipeline.mjs` etapa 3: la lista de rubros (`.rubros.json`) pasa a ser la selección de `seleccionarFilas()` (lo que carga `cargar.mjs`) más cada renglón del estado que se abrió en una nota (`esAncla`); lista vieja solo si la selección falla (`seleccion.ok: false`). Medido en 719 documentos: de 17.266 filas categorizadas, 4.700 no se cargaban nunca y 3.068 que se cargaban no se categorizaban. Regenerado sin API: 429 con rubros (antes 407), 290 sin rubros; selección en 475, lista vieja en 244. Se conserva la glosa de etiquetas ya glosadas.
- `pipeline.mjs --solo-preparar` ya no corre la etapa 5 (bug: prometía "sin API" y después mandaba todo a Jev y Claude).
- `proponer-carga.mjs`: no abre en una nota el resultado del ejercicio, el impuesto a las ganancias ni el resultado financiero (van enteros al fiscalYearMeta); su nota se consume sin abrir y sus filas quedan como vistas. Una ventana con una fila de resultado del ejercicio no es desglose de nada. Un estado PRINCIPAL que repite importes ya vistos es una copia (Sandefjord 2019, controladora + consolidado de Brann y Parma). Cada fila lleva su sección. Contra la selección anterior (719 documentos, gratis): 85 cambian, ningún documento deja de cerrar contra un total impreso y 7 empiezan a cerrar.
- `vocabulario.mjs`: `FINANCIERO_RE`, `IMPUESTO_GANANCIAS_RE`, `IMPUESTO_SOLO_RE` (mudados desde cargar.mjs); "totaalresultaat", "resultaat (van het) boekjaar"; `claveFamilia()` / `mismaFamilia()`.
- Precedente por FAMILIA de etiquetas (`precedenteFamilia()` en categorizar-claude.mjs, usado también por cargar.mjs; pedido de Guido): sin número de nota, numeración, markdown ni traducción `<br>`, hasta 1 letra de diferencia (10+ caracteres) o 2 (20+); el paréntesis final (el sector) tiene que coincidir si las dos lo tienen. Contra producción (7.098 líneas): 110 líneas más con 96,4% de acierto con lado conocido; sin lado (antes no había precedente) exacto 99,7% y familia estricta 60 más con 100%.
- `tools/respuestas-cache.mjs` (nuevo): toda respuesta de Jev y de Claude por (club, lado, rubro) en `Generados/_cache/`; `jev-categorizar.mjs` y `categorizar-claude.mjs` no vuelven a preguntar lo ya contestado (`--sin-cache` sí). Resuelve pagar dos veces tras cada cambio de listas y que Jev no sea determinista. Sembrada con lo ya pagado: 12.348 respuestas de Jev, 977 de Claude.
- `cargar.mjs`: fila explícita "Diferencia de redondeo" cuando un total impreso difiere de la suma solo por redondeo (menos de media unidad impresa por fila; decisión 3 de Guido), y el resultado se vuelve a buscar con ella. Decisión 1 (Claude < 0,80 aunque cierre el resultado): no se carga; decisión 2 (`por-resultado`): se acepta, doble chequeo propuesto.
- `Admin/piloto-existentes.txt`: los 159 documentos con rubros de clubes que ya están en el sitio.

## Versión 320 — Etapa 6: `tools/cargar.mjs`, probada de punta a punta (2026-09-30)

- `tools/cargar.mjs` (nuevo): carga un año nuevo de un club existente; `--propuesta` / `--escribir` (reversión automática si audit.js da P0/P1, probada) / `--comparar`. Frena con motivo escrito si falta algo (anual, categorías al día, fx, liga, cierre de sumas contra los totales impresos). Backtest sobre 18 ejercicios cargados reconstruidos: 1 idéntico a producción (Alianza Lima 2023), 17 frenados con motivo, ningún número falso; PSV 2019-20 carga con `--umbral-claude 0.7`. Informe y lista de problemas de etapas anteriores: `Admin/tests/test-cargar.md`.
- `proponer-carga.mjs`: exporta `seleccionarFilas`, `briefingFor`, `loadSite`, `parseNumber` (el CLI no corre al importarse); marca el ancla de cada fila; `esNoPL()` descarta flujos de fondos y tablas de balance. `periodo.mjs`: reconoce temporadas "AAAA-AA" (nombreNoCoincide 226 -> 15).
- Gasto de API del test: ~US$ 1,60 (quedó en el log del worktree borrado, no en `Admin/claude-api/resultados.jsonl`).

## Versión 319 — Memoria de categorías: lo que Claude resuelve y Jev no sabía queda para la próxima (2026-09-30)

- Sembrada con 148 rubros de 61 documentos. Bug encontrado al sembrar: respuestas viejas traían el club equivocado (el Athletic Club brasileño como 'athleticclub', el de Bilbao) y los clubes nuevos tienen id provisorio: la memoria recalcula el club desde la carpeta del documento con `carpetas-clubes.mjs` al leer.
- `inventario-transcripciones.mjs --verificar --estado <x>`: revalida solo los de ese estado. Pasos gratis corridos: los 7 `sin-verificar` revalidados; los 43 validados sin preparar (memorias de más de 100 páginas, que `--max-paginas` dejaba afuera) preparados: 3 con rubros, 2 sin rubros, 38 `sin-tablas` (transcripciones viejas sin tablas: hay que rehacerlas con Mistral, pago).
- `tools/memoria-categorias.mjs` (nuevo) + `Admin/categorias-aprendidas.jsonl`: cada rubro que Claude por API categoriza con confianza >= 0,80 queda registrado (club, año, lado, rubro, glosa, categoría, confianza, motivo, qué decía Jev). Pedido de Guido: "debería quedar documentado para que Jev la próxima vez sepa".
- `categorizar-claude.mjs`: registra lo que resuelve; usa lo aprendido con >= 0,90 como PRECEDENTE del mismo club (escalón 0, gratis: el año siguiente no vuelve a pagar el mismo rubro) y lo aprendido con >= 0,80 como contexto y ejemplos. `jev-categorizar.mjs --listos`: lo aprendido entra entre los ejemplos parecidos que ve Jev. Lo cargado en el sitio siempre gana; los backtests no usan la memoria. `--sembrar` la llena con los `.categorias.json` ya hechos.

## Versión 318 — Tablero del inventario (`tools/estado.mjs`) y tools/ fuera del deploy (2026-09-30)

- `tools/estado.mjs` (nuevo, gratis): por estado, cuántos PDFs, qué significa, qué le falta, con qué comando se avanza y cuánto cuesta; detalle de los que tienen rubros (categorización al día, club en el sitio o nuevo, no anuales, reservas) y de las altas. `--actualizar` regenera el registro antes.
- `tools/estado.mjs` reorganizado por etapas del proyecto (1 conseguir ... 7 en el sitio), con los estados en 0 (pedido de Guido). HANDOFF reescrito al cierre de la sesión.
- `netlify.toml`: `rm -rf tools` (pedido de Guido: "no publiquemos tools"); ninguna página carga nada de `tools/`.

## Versión 317 — Los archivos generados salen de Clubes/: todo derivado vive en Generados/ (2026-09-30)

- `tools/rutas.mjs` (nuevo): la única regla de dónde vive un derivado de un documento. `Clubes/<País>/<Club>/` queda SOLO con el PDF y su `.md`; los derivados (`.briefing.json`, `.rubros.json`, `.jev.json`, `.categorias.json`, `.previo-*.md`, `.antes-sumas.md`, `.mistral-redo.md`, `.gemini-check.md`, `.claude-check.md`, `.t-*.md`) van a `Generados/<País>/<Club>/` con la misma ruta relativa (gitignoreado). `ubicar()` traduce las rutas viejas que guarda el historial.
- 17 tools pasaron de armar la ruta a mano (~45 lugares) a `derivado()`: los tres transcriptores (con `--out-suffix`), resolver, pipeline, prepare-onboarding, onboard, inventario, huellas, jev, categorizar-claude, glosar, proponer-carga, chequeos-gratis, revisar-reservas, test-motores.
- Mudanza (`node tools/rutas.mjs --mudar --aplicar`): 2.704 archivos movidos, ninguno borrado (varios son caché de APIs ya pagadas o evidencia de correcciones). Las 10 transcripciones `-mistral-test.md` del test de costo del 26/09, que estaban trackeadas, se movieron con `git mv` a `Admin/test-costo-transcripcion/mistral-test/`.
- Informes de tests (`Admin/test-*`, 37) a `Admin/tests/`; las tools que los escriben y los documentos vivos apuntan ahí. Quedan en `Admin/` `test-costo-transcripcion.md` (+ su carpeta) y `test-barridos.md` porque los citan `CLAUDE.md` y dos skills (mover sus referencias en las skills requiere el OK de Guido).
- Verificado: una "foto" sin API del estado (resumen, ensayos del pipeline, del resolver, de Jev y Claude, revisar-reservas, chequeos-gratis --prueba, gasto, periodo, altas) tomada con el código y los archivos de antes es IDÉNTICA a la de después.

## Versión 316 — Vocabulario contable en 29 idiomas en un solo módulo (2026-09-30)

- `tools/vocabulario.mjs` (nuevo): por concepto (título de estado de resultados, ingresos, gastos, impuestos, resultado, total al comienzo y al final, total de ingresos, resultado del ejercicio, flujo de efectivo, cambios en el patrimonio, saldo inicial, balance, total del activo/pasivo, columna de notas / código de fila) los términos en 29 idiomas (es, pt, en, de, fr, it, nl, da, no, sv, fi, cs, sk, pl, hr/bs/sr, sr cirílico, sl, hu, ro, bg, el, tr, ru, uk, zh, ja, ko, ar, he), con límites de palabra y UNA normalización (`normalizar()`). `pipeline.mjs`, `extract-table-rows.mjs`, `filas-rubro.mjs`, `proponer-carga.mjs` y `chequeos-gratis.mjs` toman el vocabulario de ahí; la lógica de cada tool no cambió.
- Bugs de vocabulario arreglados (medidos): "venta" encontraba "inventario" (91 tablas de notas de activo/inventario entraban como rubros); "oneri", "costi", "custo", "cost", "tulos", "ertr" dentro de otras palabras; la ı turca y el Hangul coreano nunca coincidían (Beşiktaş 0 -> 93 rubros, Jeju SK 0 -> 34); la columna "Код рядка" (código de fila ruso/ucraniano) se tomaba como importes; estados de resultados españoles que no entraban (Barcelona 2015-16 0 -> 49, Getafe 3 -> 55, Celta 2 -> 42); ligaduras de PDF ("Deﬁcit").
- Medido sobre 1.061 `.md` (Admin/test-vocabulario.md): documentos con estado de resultados 675 -> 684, `listo-para-jev` 621 -> 631, rubros 30.083 -> 30.949, rubros con lado 76% -> 81%, lado contradictorio con producción 4,90% -> 4,83%. Los 150 documentos que perdieron filas las perdieron por falsos positivos, flujo/patrimonio o totales reconocidos; los 17 que duplicaron son estados de resultados reales (revisados uno por uno). Re-preparados los 713 documentos del inventario (sin API). `chequeos-gratis.mjs --prueba` sigue en 196/196 errores reales detectados en páginas con números.
- Pendiente: Japón (14 documentos) sigue sin ningún estado de resultados reconocido; sv, fi, sk, pl, sr, sl, hu, ro, bg, ar y he están en el vocabulario pero sin documentos para medirlos. Los `.jev.json`/`.categorias.json` de los 404 documentos re-preparados quedaron desactualizados (la huella lo detecta): la próxima categorización los rehace (Jev + Claude por API).

## Versión 315 — Ligas y países de los clubes nuevos en el catálogo; liga por la categoría al cierre y nombres sin palabras genéricas (2026-09-30)

- `data/leagues.js`: 11 países (AT, CH, CN, CZ, EC, IT, KR, NO, PT, RU, TR) y 25 ligas (Serie A/B de Italia, Eliteserien, Primeira Liga, Süper Lig, K League, Eerste Divisie, League One/Two...) agregados ANTES de tener ejercicios cargados. Decisión de Guido ("no pasa nada si están vacías"), que cambia la regla del archivo ("ni una liga sin ejercicios"); anotada en el comentario. Verificado en el navegador: la pestaña Ligas las lista y una liga vacía muestra "todavía no hay ejercicios". ASSET_V 292 -> 293, generadores regenerados.
- `alta-club.mjs`: (1) temporada por "la categoría al CIERRE del ejercicio" (regla de la Versión 132): en una liga de temporada partida, un ejercicio que cierra entre julio y diciembre usa la temporada que empezó ese año (antes Atalanta 2020, Sassuolo 2021, Genoa 2022, Thun 2019 y los rusos recibían la anterior); (2) nombres comparados sin palabras genéricas (FC, AC, SK, NFC...) y una coincidencia parcial ÚNICA en la temporada vale ("AC Milan" = "Milan", "OFI Crete" = "OFI", confirmado por Guido); (3) `data/leagues.js` en la huella del registro de altas. Liga resuelta: 17 -> 63 de 150 carpetas con `.md`; ninguna duda de nombre pendiente.
- Rosters: 146 liga-temporadas de 13 países más (`tools/club-league-reference/`); "co-primeraa" unificada con "co-primeraA".
- Bug encontrado: correr `alta-club.mjs --todos` SIN `--claude` descartaba del registro las respuestas de Claude ya pagadas (quedaban 12 de 36). Recuperadas desde git y recalculado con `--claude --tope-usd 0` (reusa sin pagar): 78 listos para alta. Arreglado: las respuestas anteriores viajan en `claudeAnterior` hasta que una corrida con `--claude` las reemplace.

## Versión 314 — Período de cada documento leído del contenido: trimestral, semestral, anual calendario o temporada (2026-09-30)

- `tools/periodo.mjs` (nuevo, gratis): tipo de período (anual calendario / temporada, trimestral, semestral, nueve meses, bimestral, intermedio, otro), meses, cierre y la cita que lo sostiene, leídos de los TÍTULOS de las primeras páginas en ~15 idiomas ("three months ended", "Üç Aylık Ara Hesap Dönemi", "01.01.2018 bis 30.06.2018", "13 month period ended"); avisa si el nombre del archivo dice otra fecha. `--grupos` lista por club y año los períodos parciales para juntarlos cuando lleguen los demás.
- Primera versión medida sobre 2.249 `.md`: 58 "intermedio" casi todos falsos ("intermediação de atletas", "segundo semestre" en prosa). Con frases completas y solo títulos: 16 no anuales, todos casos reales (Galatasaray T1 2019, América trimestral, Osasuna intermedios, RB Leipzig y OH Leuven 6 meses, Westerlo 18, Midtjylland y Wolves 13, Gaziantep 7) + 2 dudosos (U. de Chile anual con columnas trimestrales, Real Madrid).
- `inventario-transcripciones.mjs`: campo `periodo` por PDF en `Admin/transcripciones-estado.jsonl`.

## Versión 313 — La aritmética decide las páginas "con reserva": sumas verticales y horizontales (2026-09-30)

- `chequeos-gratis.mjs`: `respaldoFilas()` (nuevo): en tablas de movimiento (saldo inicial + altas - bajas = saldo final) una celda es igual a una combinación con signo de las demás de su fila. `respaldoSumas()` exportada.
- `resolver-inventario.mjs`: el desempate por aritmética usa celdas respaldadas por sumas verticales y horizontales (antes `tieScore()`, que solo veía filas "total" y había decidido 2 de 1.190 páginas); gana la lectura que le saca >= 3 celdas a la segunda. También se aplica cuando Gemini rechaza la página y solo quedan dos lecturas (antes ganaba Claude directo, con reserva).
- `tools/revisar-reservas.mjs` (nuevo, gratis): aplica ese criterio a los documentos ya resueltos. Sobre 163 páginas con reserva (31 documentos): 44 confirmadas por sumas, 10 CORREGIDAS (la lectura anterior cerraba sumas y la elegida no; Rubin Kazan 2025 págs. 14 y 32 entre ellas), 109 siguen con reserva. Aplicado; el `.md` anterior queda en `<nombre>.antes-sumas.md` (gitignoreado).

## Versión 312 — Piloto D: estados de resultados sin título en la tabla, etiqueta en la segunda columna, flujo de efectivo y patrimonio fuera, lado en ucraniano/checo/turco (2026-09-30)

- Piloto D (`Admin/piloto-d.txt`, 10 PDFs): US$ 1,73 de transcripción y validación + US$ 0,42 de categorización; PDFs con texto validados 100% gratis (Athletic Club, Fortaleza CEIF, Vitória Guimarães, Rubin 2023: 0 páginas a Claude); las carpetas que antes caían en otro club resolvieron bien; 69% de rubros categorizados solos (bajado por los formularios en cirílico, con muchas filas que no son rubros).
- `extract-table-rows.mjs`: en formularios oficiales (checo, ucraniano, ruso) la primera columna es un código ("I.", "A.") y el rubro está en la segunda: se toma la segunda como etiqueta. Nuevo `filasDeResultados` (>= 3 filas con palabras de ingresos/gastos); NO cambia `likelyRelevant` (probado así: Real Madrid 32 -> 253 rubros, Polissya 0 -> 200).
- `pipeline.mjs`: una tabla con filas de resultados en una página cuyo TÍTULO (línea corta fuera de tablas) es de estado de resultados cuenta como estado de resultados (Baník 1997: 3 -> 31 rubros; Polissya 0 -> 56; Galatasaray 0 -> 48). Los estados de flujo de efectivo y de cambios en el patrimonio se excluyen (Karpaty 60 -> 41).
- `filas-rubro.mjs`: palabras de ingreso/gasto en ucraniano, checo y turco (filas con lado: Karpaty 11 -> 24 de 41, Polissya 12 -> 26).
- Pendiente anotado: Fortaleza CEIF 2025 trae solo notas (sin estados) pero la nota 19 abre los ingresos; hoy queda `sin-rubros`.

## Versión 311 — Registro de altas por script y preguntas del alta resueltas por Claude con cita verificada (2026-09-30)

- `tools/altas-registro.mjs` (nuevo) + `alta-club.mjs --todos`: `Admin/altas-club.jsonl`, una línea por carpeta de club nuevo con estado (`listo-para-alta` / `con-preguntas` / `faltan-datos` / `existe`), preguntas, pendientes y la huella de sus entradas (`.md`, series de fx, rosters, `data/clubs.js`); si algo cambia, se recalcula solo. `pipeline.mjs --resumen` lo muestra. Hoy, de 212 carpetas: 77 listos para alta, 63 con preguntas, 72 esperando datos (63 sin `.md`).
- `tools/alta-claude.mjs` (nuevo, `alta-club.mjs --claude`): las preguntas del alta (perímetro, tipo de documento, cierre, moneda, nombre legal) van a Claude por API, una llamada por club, y cada respuesta tiene que traer una cita textual que el script verifica en la página del `.md`; sin cita verificada no se da por resuelta. Backtest sobre 13 club-años cargados: 60/62 coinciden con producción (los 2 restantes son de convención de nombre), 71/71 citas verificadas, US$ 0,088 por club. Corrida real: 36 carpetas, US$ 1,73, 17 pasaron a listo. `--dudas` lista lo que queda (12, casi todo criterio de perímetro); no escribe en `dudas-por-club.md`. Informe: `Admin/test-altas-claude.md`.
- La liga ya no bloquea el alta (queda `null` con nota); `alta-club.mjs` usa `carpetas-clubes.mjs`; rangos plausibles de fx ajustados a las series reales (TRY [0,5; 70]).

## Versión 310 — Lotes de Claude de hasta 8 páginas (2026-09-30)

- `resolver-inventario.mjs`: Claude recibe como máximo 8 páginas por llamada. Una página densa de escaneo son ~2.300 tokens de salida (Real Madrid 2005-06: 18 páginas = 41.763 tokens, US$ 0,45) y el tope es 64.000: con lotes de 18-25 páginas un intento se cortaba por `max_tokens`, se pagaba y se tiraba. El costo por página no cambia.

## Versión 309 — Una sola regla carpeta -> club, vigilada por audit.js; el registro marca lo pagado sin .md (2026-09-30)

- `tools/carpetas-clubes.mjs` (nuevo): el club de `Clubes/<País>/<Club>/` sale de la cita en `data/<id>-data.js`, y si no la hay, de un nombre IGUAL entre los clubes del mismo país; si no, es club nuevo. `onboard.mjs` (y con él `--quien`, el registro y el pipeline) la usa en vez de `guessClubId()` (substring, sin país).
- Medido con la regla vieja: 17 carpetas de clubes del sitio quedaban ambiguas (Racing = Racing Club y Genk; Nacional = Internacional y Atlético Nacional) y 11 caían en un club EQUIVOCADO (Porto -> Grêmio, Inter -> Internacional, Lazio y Rubin Kazan -> AZ, Braga -> Bragantino, Vitória Guimarães -> Vitória, Independiente Rivadavia -> Independiente). En el registro: 15 PDFs figuraban "ya cargados" sin estarlo y 87 figuraban pendientes estando cargados (316 -> 388 cargados).
- `audit.js`: P1 `carpeta-club-ambigua` (salvo carpetas de agregado `_*`), P2 `club-sin-carpeta`.
- `inventario-transcripciones.mjs`: un `sin-md` con transcripción de Mistral registrada dice "PAGADO SIN .md" en el detalle (21 PDFs).
- Tipos de cambio locales para NOK (Norges Bank), CZK (ČNB), TRY (TCMB), RUB (Banco de Rusia), UAH (NBU), CHF y KRW (Reserva Federal H.10), 2000-2026, en `tools/fx-reference/` (`fetch-fx-reference.mjs`, `lookup-fx-close.js`, `alta-club.mjs`). Verificados contra los tipos declarados en Krasnodar 2020/2021 y Fenerbahçe 2020 (exactos) y contra el BCE día por día (mediana < 0,3%; las diferencias grandes son crisis o tipos oficiales fijos).

## Versión 308 — La etapa 5 solo toca los documentos de la corrida; resultados derivados con huella; lotes de Claude que exceden el tope se parten (2026-09-30)

- Bug del piloto C: la etapa 5 del pipeline tomaba TODOS los `listo-para-jev` del inventario; `categorizar-claude.mjs` mandó 44 documentos a Claude (US$ 1,90) con `.jev.json` hechos sobre la lista de rubros anterior a la Versión 307 antes de que se cortara. Ahora `pipeline.mjs` pasa `--lista` (los documentos de la corrida) a `glosar-rubros`, `jev-categorizar` y `categorizar-claude`.
- `tools/huellas.mjs` (nuevo): `.jev.json` guarda la huella de su `.rubros.json`, y `.categorias.json` la de los dos. Una etapa rehace su salida si la huella falta o no coincide; Claude no recibe un documento cuyo `.jev.json` está desactualizado. Los documentos preparados sin categorizar entran solos en la siguiente corrida (`needsCategorize`).
- `resolver-inventario.mjs`: un lote que Claude corta por `max_tokens` se reparte en mitades (Real Madrid 2005-06: 18 páginas densas en un lote dejaban el documento en `revisar`).
- `glosar-rubros.mjs --listos` ya no saltea las listas con un `.jev.json` viejo.
- Piloto C: el estado de resultados ucraniano en nominativo ("ФІНАНСОВІ РЕЗУЛЬТАТИ") y el turco ("Kar veya Zarar", "Hasılat") no se reconocían (Polissya y Galatasaray quedaban `sin-rubros`): regex en `pipeline.mjs`, `proponer-carga.mjs` y `extract-table-rows.mjs`. El año de un club que `onboard.mjs` no identifica se tomaba del PRIMER año del nombre ("2023-24" -> 2023): ahora el de cierre, misma regla que `guessYear()`. `gasto.mjs` ya no cuenta dos veces el Mistral que el resolver hace adentro de la validación.

## Versión 307 — Validación paga solo en páginas con números y dudosas, Claude después de Jev, alta de club por script, tabla por ancla, lado corregido (2026-09-30)

- `tools/paginas-con-numeros.mjs` (nuevo, gratis): decide con el `.md` de Mistral qué páginas tienen cifras de carga. Sobre 222 ejercicios cargados elige el 58% de las páginas y cubre el 99,7% de los importes de producción. Con `pdftotext` rinde menos y no sirve en el 23% de los PDFs (escaneo o mojibake). Informe: `Admin/test-seleccion-paginas.md`.
- `tools/chequeos-gratis.mjs` (nuevo, gratis): cascada por página (texto del PDF, sumas de la tabla, columna del año anterior en producción, balance). Sobre 104 documentos ya resueltos: 163 de 163 páginas con números con error real quedan `dudosa`, ahorro ~49% del costo. La regla "una tabla que cierra valida la página" se descartó (dejaba pasar 37 páginas con error). Informe: `Admin/test-chequeos-gratis.md`.
- `resolver-inventario.mjs`: Gemini y Claude solo reciben las páginas `dudosa` de la cascada; la prosa no se paga. Bug arreglado: en un escaneo con lista de páginas chica, Gemini recibía el PDF entero.
- `tools/categorizar-claude.mjs` (nuevo) y etapa 5b de `pipeline.mjs`: precedente del club, Jev >= 0,90, y el resto a Claude por API (Opus 5.5, una llamada por documento, con las líneas ya cargadas del club); se acepta >= 0,80. Backtest sobre 3.975 rubros: 80,2% automático con 94,5% de acierto (Jev sola: 69,4% con 94,4%), ~US$ 0,015 por documento. Deja `<md>.categorias.json`. Informe: `Admin/test-categorizar-claude.md`.
- `tools/alta-club.mjs` (nuevo): propone la entrada de `data/clubs.js`, moneda, cierre del ejercicio, tipo de cambio, liga, perímetro; `--escribir` solo sin preguntas abiertas, con reversión si `audit.js` da P0/P1. Sobre 141 clubes nuevos: 75% de campos `ok`, 39% escribibles hoy. Todavía no está en el pipeline (el alta va con la carga del primer año). Informe: `Admin/test-alta-club.md`.
- `proponer-carga.mjs`: estrategia `--tabla ancla-listas` (default): carga la nota cuyas filas suman la línea del estado de resultados. Sobre 92 ejercicios: ingresos bien ubicados 54% -> 64% (mediana 63% -> 77%), ingresos cargados de más 53% -> 20%; gastos sin cambio (55%). Informe: `Admin/test-eleccion-tabla.md`.
- `filas-rubro.mjs` + `pipeline.mjs`: lado ingreso/gasto corregido (resultados con palabra de gasto, columna "Notas" tomada como importes, "rendimentos"). Contra producción, 913 filas: contradicciones 67 -> 27. `pipeline.mjs` usa `columnaDeImportes()`; `--repreparar` ya no crea marcas `sin-tablas`.
- `tools/gasto.mjs` (nuevo, gratis): gasto por motor, día y documento; lista lo pagado cuyo `.md` no está en disco (25 transcripciones, US$ 5,01). Cuenta una sola vez las validaciones que el pipeline vuelve a escribir.
- Gasto de API de los tests: Claude US$ 5,62, Mistral US$ 2,75, Jev ~US$ 0,3.

## Versión 306 — Piloto de 9 documentos de punta a punta: Gemini página por página, PDFs dañados, filtro de filas, lado por estructura, glosa para Jev (2026-09-30)

- `tools/reparar-pdf.mjs` (nuevo): diagnostica y arregla PDFs antes de gastar API. `qpdf` reconstruye los dañados recuperables; las páginas con imágenes de más de 8000 px (Thun: 128x105.696, Mistral respondía HTTP 400) se rasterizan en una copia; un PDF truncado (PEC Zwolle) queda como `no-es-pdf` con el link de `fuentes/` para volver a bajarlo. Conectado a `mistral-ocr-transcribe.mjs` y a `resolver-inventario.mjs`. Thun 2019 verificado: 20 de 20 páginas por $0,08.
- `resolver-inventario.mjs`: cuando Gemini rechaza un documento entero por RECITATION (124 de 141 fallos registrados), se prueba página por página (medido: Ituano 7/8 aceptadas, Alverca 21/29, Start 17/17, Sandefjord 16/16) y Claude recibe solo las rechazadas. Antes recibía el documento entero (~$0,016 por página contra ~$0,003 de Gemini).
- `pipeline.mjs`: la etapa 5 usaba el registro viejo y los documentos preparados en la misma corrida quedaban sin categorizar hasta la siguiente; ahora lo regenera antes. `--repreparar` ahora sí rehace los que ya tenían lista de rubros. `STATEMENT_RE` no reconocía "Rendimentos e gastos" (SNC portugués): Alverca quedaba con 0 rubros.
- `tools/filas-rubro.mjs` (nuevo, gratis): descarta filas que no son rubros (números sueltos, subtotales detectados por suma, resultados, metadatos) y deduce el lado ingreso/gasto por la estructura de la tabla. Rosenborg pasó de 10 a 57 filas con lado.
- `tools/glosar-rubros.mjs` (nuevo, ~$0,001 por documento): glosa en español de cada rubro para que la búsqueda de ejemplos parecidos funcione en idiomas que el sitio no tiene. Sobre 7 documentos: Jev con confianza >= 0,90 pasó de 30% a 39,5%.
- `proponer-carga.mjs`: `--solo-totales`, `--sin-filtro`, `--con-escape`, `--etiqueta`. Hallazgo: el 14% de "total impreso = oficial de producción" no es un bug del detector, en 23 de 35 ejercicios el total de producción no está impreso (definiciones curadas: Dortmund usa HGB de la KGaA, Fluminense suma las líneas ordinarias). Ofrecerle `no_es_rubro` a Jev no ayudó (68% / 60% contra 67% / 60%).

## Versión 305 — Inventario de transcripciones: registro de quién hizo cada `.md`, validación gratis contra el texto del PDF, y resolución paga solo de las páginas dudosas (2 pilotos, 21 documentos)

- **`tools/verify-numbers.mjs`**: compara los números de un `.md` contra el texto interno del PDF (`pdftotext`),
  sin depender del formato de tablas. Detecta cifras mal leídas (dígito distinto, mismo largo) y `.md`
  incompletos; "no aplica" en escaneos o texto ilegible (cobertura < 25%). Bugs encontrados al calibrarlo:
  pegaba columnas contiguas (`133.816 189.064` como un solo número) y una referencia de nota con su importe
  (`13 228.106`); ignora cifras redondas al buscar "casi iguales".
- **`tools/inventario-transcripciones.mjs`**: registro `Admin/transcripciones-estado.jsonl` (regenerable): por
  cada PDF con `.md`, motor/modelo/fecha/costo de quien lo hizo (de los logs de las APIs; "legado" = anterior a
  las APIs), otras versiones que existen, si el ejercicio ya está cargado y estado de validación (`cargado`,
  `listo`, `revisar`, `pendiente-segunda-voz`, `reintentar`, `sin-verificar`). Las validaciones se guardan en
  `Admin/transcripciones-verificaciones.jsonl` (solo se agrega, con hash del `.md`: si el archivo cambia, el
  estado vuelve solo a sin-verificar). NO se escribe dentro de los `.md`. Resultado inicial sobre 2.166 PDFs
  con `.md`: 276 cargados, 598 listos sin gastar API, 561 a revisar, 730 escaneos pendientes de segunda voz.
  Hallazgo: los `.md` viejos (Tesseract/subagentes) tienen cifras mal leídas en ~42% de los casos con texto,
  también entre los ya cargados (el dato del sitio se corrigió a mano; el `.md` quedó con el error).
- **`tools/resolver-inventario.mjs`**: la fase paga, con `--ejecutar` (sin él es un ensayo con estimación de
  costo), `--dir`, `--lista`, `--limit`, `--estado`, `--concurrencia`. Claude ve SOLO las páginas dudosas
  (recortadas con qpdf). PDF con texto: páginas cuyos números no cierran con el texto del PDF -> Claude -> revalida;
  si sigue mal o más de la mitad no coincide, el texto del PDF no es confiable y pasa a comparar voces.
  Escaneo: Gemini entero como segunda voz -> Claude solo en páginas que difieren -> voto entre voces por página
  (un número gana si está en 2 voces) -> cuarta voz (Mistral, solo en esas páginas) si sigue sin consenso; si
  Gemini rechaza por RECITATION, Claude transcribe entero y Gemini desempata página a página; si también rechaza
  la página, gana Claude y queda como `reserva` (cerrar con sum-check al onboardear). Cada página reemplazada
  queda registrada con su motor. Fallos por crédito/límite/red: espera con backoff creciente y reintenta el MISMO
  motor, deja el documento en `reintentar` y corta la corrida tras 3 seguidos.
- **`tools/test-motores.mjs`** + `Admin/test-motores-lista.txt` / `test-motores-resultados.md`: test de los 3 motores
  sobre 15 PDFs. Claude por API: 15/15, 0 bloqueos, ~$0,016/pág.; Gemini rechazó 7/15 (5 de 6 escaneos, incluidos
  balances numéricos, no solo memorias); Mistral leyó mal cifras en Ponte Preta aunque el PDF tiene texto.
- **`tools/compare-transcripts.mjs`**: ignora la columna "Nota", celdas vacías, símbolos de moneda y una columna de
  más en un lado (antes: ~280 discrepancias falsas en 15 documentos, ahora 33, casi todas errores reales del `.md` viejo).
- **`tools/claude-api-transcribe.mjs`**: parte PDFs de más de 25 páginas o más de 20 MB en tramos (antes una memoria
  de 88 páginas se guardó cortada en la 46 sin avisar); nunca guarda una transcripción truncada por `max_tokens`;
  `qpdf` código 3 (éxito con advertencias) ya no cuenta como fallo.
- Bugs del piloto ya corregidos: decidir por página aceptaba un error de Claude cuando Mistral y Gemini coincidían
  (Almagro 2018); texto de PDF roto (Ferro 121, Cuiaba) gastaba Claude en vano; PDFs de 34 MB superaban el límite de
  la API (Temperley: una página de 25 MB se rasteriza a 130 dpi -> 170 KB).
- Pilotos: 21 documentos de 14 países, todos `listo` (algunos con `reserva`), ~$5,20 de API.
- **Bugs de las tools de onboarding encontrados corriéndolas (gratis) sobre los 21 documentos del piloto:**
  - `tools/onboard.mjs` `guessYear()`: una fecha ISO en el nombre (`...-2025-12-31.pdf`) se leía como el rango
    "2025-12" -> **2012**, y `2011-06-30` como 2006. Efecto real: **26 ejercicios ya cargados** (Bélgica 2025-06-30,
    Dinamarca, etc.) figuraban como pendientes, así que un `--all` los habría re-transcripto y pagado de nuevo. Corregido
    (fecha ISO = año de cierre; un sufijo de 2 dígitos solo es rango si es el año siguiente). Cargados en el registro: 276 -> 302.
  - `tools/prepare-onboarding.mjs` tie-out: en un balance con jerarquía sumaba subtotales Y sus rubros (cada peso dos veces:
    la "diferencia" daba exactamente el total). Ahora, si no cierra, prueba sin las filas en negrita y solo con ellas
    (cierre exacto obligatorio), y tolera ±redondeo en documentos de importes enteros. Fallos falsos en los 21: 244 -> 107;
    los que quedan son totales encadenados/jerárquicos sin negrita (límite conocido), y las cuentas de los documentos cierran a mano.
  - `tools/extract-table-rows.mjs` `RELEVANT_KEYWORDS`: solo reconocía ingresos/gastos en ES/IT/EN/NO/GR sin acentos, así que en
    balances en alemán, croata, francés/neerlandés, danés y portugués no marcaba NINGUNA tabla como relevante y el precedente de
    categorías se omitía en silencio (0 de 13-35 tablas en Mönchengladbach, Hamburger, Dinamo, Gorica, Anderlecht). Ampliada y
    comparada sin acentos/diéresis: pasan a 2-12 tablas relevantes y calculan precedente.
  - Probado y DESCARTADO (revertido): ignorar en `suggest-category-precedent.mjs` las palabras genéricas de un club para el nivel
    PARECIDO. No arregló el caso real (Dinamo: "Prihodi od ulaznica" = entradas, emparejado con derechos de TV "Prihodi od prava
    emitiranja" al 50%) y empeoró Ferro (más emparejamientos entre ingreso y egreso del mismo nombre). PARECIDO seguirá siendo baja
    confianza por diseño; la mejora de fondo es Jev (to-do 99).
  - Piloto de 44: los `Syntax Error` que inundaban la terminal eran mensajes de poppler (`pdftotext`/`pdfinfo`) leyendo PDFs
    dañados, no bugs del código; `execFileSync` los heredaba a la pantalla. Ahora se silencian (`stdio` sin stderr). Bug real
    del mismo piloto: `qpdf` devuelve código 2 en un PDF dañado (DNCG Francia 2018-19) y el resolver lo marcaba `revisar`;
    ahora cae a `pdfseparate` + `pdfunite` (poppler, más tolerante).
  - **`tools/pipeline.mjs`: el comando único de punta a punta** (`node tools/pipeline.mjs --ejecutar [--limit N] [--dir ...] [--lista ...]`,
    sin `--ejecutar` es un ensayo con estimación de costo; `--resumen` muestra el estado sin correr nada). Toma los PDFs no cargados en
    el sitio que no tienen `.md` o tienen uno sin confirmar; Mistral transcribe los que no tienen; `resolver-inventario.mjs` valida; las
    tools gratis de onboarding preparan la lista de rubros; y deja `<md>.rubros.json` (gitignoreado) con la marca `listo-para-jev`, o
    `sin-rubros` (actas, memorias narrativas). NO categoriza rubros (eso es Jev, to-do 99). Probado de verdad con 3 documentos
    (uno sin `.md`, uno sin confirmar, uno ya validado). El registro pasó a incluir los PDFs sin `.md` (estado `sin-md`, 1.178) y el campo `jev`.
  - Consenso entre voces en una página, en este orden: mayoría -> **parche de dígitos por mayoría** (cifra que ninguna otra voz tiene y casi
    igual a una que tienen 2 -> se corrige el dígito) -> cuarta voz (Mistral) -> **aritmética del documento** (gana la versión cuyas
    sumas cierran, vía prepare-onboarding) -> Claude con `reserva`. Un `revisar` por "sin consenso" ya solo queda si no hay versión de Claude.
  - Primera corrida real del pipeline (50 documentos): los 4 primeros eran informes anuales de Borussia Dortmund de 224-244 páginas en
    paralelo; Gemini tiene un tope de 150 s y de tokens de salida, así que daba timeout seguro y gastaba reintentos. Arreglado:
    documentos de más de 40 páginas se transcriben por tramos de 20 (Gemini y Claude), timeouts proporcionales, `--max-paginas 100`
    por defecto (los más grandes quedan aparte, `--max-paginas 0` los incluye) y un lote con `--limit` toma una muestra repartida
    por tamaño en vez de los N primeros del listado.
  - Resolver, PDF con texto y más de la mitad de las páginas sin coincidir con el texto del PDF: antes se asumía que el texto del PDF
    era el roto y se pasaba a Gemini + Claude (visto en la corrida de 50 con `.md` viejos de Tesseract, incluso de 1 página). Ahora
    primero se hace una lectura fresca con Mistral (~$0,004/pág.): si esa sí coincide, el `.md` viejo era el malo y se lo reemplaza
    (el original queda en `.previo-*.md`); solo si tampoco coincide se comparan voces.
  - Resolver, PDF con texto: el veredicto final ya no es el chequeo global (que contaba como "cifras sin respaldo" las de páginas-imagen sin
    texto en el PDF y, por coincidencias de un dígito con cifras de otras páginas, las tomaba por lecturas mal hechas: Gent, Charleroi,
    Sint-Truiden mandaban el documento ENTERO a Gemini + Claude). Ahora es por página: las páginas con texto se verifican contra el texto
    del PDF (una cifra de Claude ausente en el PDF solo es sospechosa si se parece a una que sí está); las páginas SIN texto en el PDF
    (imágenes dentro de un PDF con texto), y aquellas donde Claude discrepa de todo, pasan al camino de voces SOLO ellas. Si el `.md`
    viejo y Claude leyeron igual y el texto del PDF difiere, se acepta (es el texto del PDF).
  - Casos nuevos de la primera corrida del pipeline: (1) **`.pdf` que no es PDF** (2 en Clubes/: Unión Magdalena, un HTML de 38 KB guardado como
    .pdf; DNCG Francia 2014-15, 2,9 MB sin cabecera): el resolver los marca `no-es-pdf` (no reintenta) para volver a conseguir el documento.
    (2) **Un motor que devuelve menos páginas que las pedidas** (Aston Martin F1, Claude: 12 de 20): antes fallaba todo el documento; ahora
    reparte el lote en mitades y reintenta, y una página sola que vuelve vacía se toma como página en blanco.
  - **`tools/jev-categorizar.mjs`: la etapa de Jev** (API de typesafe.ai, ~$42 por mil millones de tokens; 0 tokens de Claude Code). `--backtest`
    toma rubros de ejercicios YA CARGADOS (3.975 rubros únicos de 164 clubes), cuya categoría real ya decidió una sesión humana, se los
    pregunta a Jev sin mostrársela y deja `Admin/test-jev-resultados.md`: acierto total, por banda de confianza, errores con confianza
    ≥ 0,70 (el caso peligroso para una integración automática), acierto por categoría. `--listos` categoriza los `<md>.rubros.json` de los
    documentos `listo-para-jev` y deja `<md>.jev.json` (gitignoreado). El lado (ingreso/gasto) no se le dice: se le ofrecen las 26
    categorías juntas (`--lado-conocido` las separa). Las descripciones de las categorías salen de `data/category-map.js`. Probado con 6 rubros reales.
  - **Backtest de Jev completo** (3.975 rubros únicos ya cargados, 164 clubes; informes en `Admin/test-jev-resultados*.md`): sin ayuda 69,5%
    (90,3% en la banda de confianza ≥ 0,90); diciéndole el lado (ingreso/gasto) 74,2% (93,0%); lado + 8 ejemplos parecidos ya categorizados
    86,6% (95,9% en la banda alta, que cubre el 72% de los rubros); lado + ejemplos SOLO de otros clubes (el caso de un club nuevo) 83,0% (94,4%,
    69% de los rubros). Los errores que quedan son sobre todo entre catch-alls (`admin_general_expense` <-> `other_expenses`) y convenciones
    propias de cada club. Conclusión: sirve como primer piso con la banda alta, pero un ~5% de error en esa banda no alcanza para aceptar sin un
    segundo control. `--listos` ahora usa lado (cuando el documento lo indica) y ejemplos por defecto.
  - `tools/pipeline.mjs`: `<md>.rubros.json` ahora lleva el `lado` de cada tabla (por palabras del título y las columnas en varios idiomas; 49% de
    los rubros lo traen) y un documento solo es `listo-para-jev` si tiene un **estado de resultados** (o de recursos y gastos) con al menos 5 rubros;
    si no, `sin-rubros` (272 de los 304 `sin-rubros` no tienen ninguno: actas, dictámenes, certificaciones, memorias narrativas). Nuevos flags:
    `--solo-preparar` (solo la preparación gratis, sin API), `--repreparar` (rehace documentos que ya la tenían). Corrida sin API sobre los 640
    documentos validados: 336 `listo-para-jev`, 304 `sin-rubros`.
  - **`tools/proponer-carga.mjs` (etapa 5, versión 0, solo mide; no escribe nada del sitio)** + `onboard.mjs --quien <pdf>` (a qué club/año corresponde un PDF,
    aunque ya esté cargado). Primer backtest sobre 40 ejercicios ya cargados: 0% de aciertos en total de ingresos y resultado; 53% arma alguna propuesta,
    7% de cobertura de los rubros de producción. Es un resultado útil, no un bug: (1) los `rawLabel` de producción son agrupaciones curadas a mano, no
    filas literales del documento, así que el precedente por texto exacto casi nunca coincide; (2) elegir la tabla correcta y la columna del año es la parte
    difícil; (3) la detección de escala por palabras da falsos positivos (Volta Redonda: dividió por 1.000 un documento en unidades). Siguiente versión:
    escala por plausibilidad contra la historia del club, tablas elegidas por chequeo de sumas, rubros categorizados con Jev y comparación a nivel de
    total por categoría (no por texto de rubro).
  - **Segundo lote de 50** (24 `listo-para-jev`, 25 `sin-rubros`, 1 `no-es-pdf`; $11,58). Casos nuevos y arreglos: (1) **el 82% de los `.md` viejos (778 de 954) no
    tiene NINGUNA tabla** (0 líneas con `|`; etiquetas e importes en bloques separados, típico de Bélgica y Argentina): sus números validan contra el PDF pero no
    sirven para rubros, sumas ni categorías. El resolver ahora los rehace con Mistral (~$0,004/pág.) si el nuevo tiene tablas (el viejo queda en `.previo-*.md`), y el
    pipeline marca `sin-tablas` para que la próxima corrida lo haga (una sola vez, `formatoIntentado`). (2) Documentos en ruso/ucraniano, checo, neerlandés, japonés,
    coreano y chino no reconocían sus tablas de resultados: ampliadas las palabras clave (`extract-table-rows.mjs`) y la detección de estado de resultados y de lado
    (`pipeline.mjs`). (3) Unión Magdalena figuraba `sin-md` en vez de `no-es-pdf` y consumía un lugar en cada lote. (4) **Jev es la etapa 5 del pipeline**
    (`--sin-jev` la saltea). Nuevo `Admin/MAPA-DE-TOOLS.md`: qué es cada archivo de `tools/`.
  - **`proponer-carga.mjs` versión 1** (escala por plausibilidad contra la historia del club, filas categorizadas con Jev con lado y ejemplos que EXCLUYEN el ejercicio
    reconstruido, comparación por categoría; `--mistral-fresco` usa una transcripción nueva con tablas). Backtest de 40 ejercicios cargados: con el `.md` guardado (casi sin
    tablas) 75% arma propuesta, dinero bien ubicado 45% ingresos / 26% gastos; con Mistral fresco 88% arma propuesta, el total de ingresos oficial se detecta en 14%, el
    resultado en 17%, y el dinero bien ubicado (solo filas con Jev >= 0,90) es 67% ingresos / 60% gastos. Conclusión: la carga 100% automática todavía no es viable; lo
    que falta es sobre todo detectar de forma robusta los totales impresos (son la puerta de aceptación) y no la categorización.
  - Documentación de traspaso para sesiones nuevas: `Admin/HANDOFF-pipeline.md` (estado, decisiones de Guido, números medidos, qué falta), `Admin/MAPA-DE-TOOLS.md`, cabecera de `pipeline.mjs` con las 7 etapas y snapshot en `Admin/ESTADO.md`. Nuevo to-do 109 (ordenar las carpetas del proyecto).
  - Bug: `inventario-transcripciones.mjs` contaba como "cargado" todo lo que `onboard.mjs --all` no listaba, incluidos los documentos
    con briefing al día (lo que el propio pipeline prepara). `ONBOARD_IGNORE_BRIEFING=1` separa las dos cosas.
  - Jev (typesafe.ai): API `POST https://api.typesafe.ai/v1/systemone`, `Authorization: Bearer`, cuerpo `{state, model:"jev-latest",
    questions:{<nombre>:{type:"choice", instructions, criteria:{<categoría>:<descripción>}}}}`; devuelve `choice`, `confidence` y
    `probabilities`. Docs: https://docs.typesafe.ai/ (índice en `/llms.txt`). Categorizar rubros NO es parte del pipeline actual.


## Versión 304 — `tools/claude-api-transcribe.mjs`: la 3ra API conectada de verdad (Claude, API directa), y el paso 2 del HTML al día

- **`tools/thirdapi-transcribe.mjs` (placeholder de la Versión 301) renombrado a `tools/claude-api-transcribe.mjs`
  y conectado de verdad**: Guido decidió Claude como 3ra API. Llama a `POST /v1/messages` con el PDF
  adjunto (`claude-sonnet-5-5`, $2/$10 por MTok) por HTTP crudo con `fetch()` (sin SDK, mismo
  criterio que Mistral/Gemini: este proyecto no tiene `package.json` ni `node_modules`, a propósito),
  **streameado** (no una espera simple) porque una transcripción completa puede generar decenas de
  miles de tokens de salida y a la velocidad normal de generación eso puede tardar varios minutos —
  una respuesta no streameada se corta sola antes de terminar. Mismo prompt, mismo formato de
  resultado/fallidos.jsonl y mismo chequeo de fidelidad que `gemini-transcribe.mjs`, para que
  `tools/onboard.mjs` no tenga que tratarla distinto. `tools/onboard.mjs` actualizado con el nuevo
  nombre; `Admin/claude-api/.env` (antes `Admin/thirdapi/.env`) sumado a `.gitignore`.
- **Todavía sin key ni test de calidad propio** — Guido va a abrir la API key de Anthropic
  (aclarado: es facturación aparte, pago por uso, NO consume los tokens semanales de su plan de
  Claude Code/Claude.ai) y correr su propia prueba antes de confiar en esto para casos reales.
- **`Admin/COMO-CORRE-EL-PROYECTO.html`, "El paso 2, en detalle" actualizado**: la tabla y el texto
  describían el flujo viejo (Gemini solo redoing escaneos, subagente de Claude como única red de
  contención) — ahora describe el flujo real desde la Versión 302/303: Mistral y Gemini SIEMPRE en
  paralelo + comparación, Claude API como reemplazo puntual cuando Gemini rechaza por RECITATION, y
  el subagente completo como última red.
- **Mergeado `worktree-todo-106-mistral-gemini`** (sesión terminada): el test real de 8 escaneos que
  fundamenta la Versión 303, con `Admin/test-mistral-gemini-escaneos.md` como detalle completo.

## Versión 303 — to-do 106, la corrida real: head-to-head Mistral vs. Gemini en 8 escaneos (8 subagentes, ~1.660 celdas), confirma "ninguna es mejor"

- **La corrida ampliada que la Versión 302 (abajo) anticipaba con un solo documento**, ahora hecha
  de verdad: 8 documentos que Mistral marcó como escaneados (Brasil, Colombia, Grecia y Noruega — 2
  por país), verificados celda por celda contra el PDF fuente por 8 subagentes en paralelo, uno por
  documento. Resultado: ningún motor domina — cada uno cometió errores reales que el otro no
  cometió, en cantidad similar, sobre una tasa de error minúscula (~1.660 celdas comparadas). **No
  se cambia el DEFAULT Mistral→Gemini** de CLAUDE.md/`club-data-mapping/SKILL.md` sección 15.
- **2 hallazgos nuevos, ninguno detectable con un chequeo de sumas**: Mistral puede saltearse
  contenido real SIN NINGUNA advertencia (una columna entera de ratios, en un documento); Gemini
  puede fabricar un valor en una celda vacía, o "corregir" en silencio un dígito hacia lo que le
  parece más consistente. Confirma que la verificación manual obligatoria para escaneos sigue
  siendo necesaria con cualquiera de los dos motores — el chequeo de comparación (`tools/compare-
  transcripts.mjs`, Versión 302) atrapa un desacuerdo ENTRE los dos, pero no un error en el que
  ambos coincidan por accidente. Detalle completo en `Admin/test-mistral-gemini-escaneos.md`.

## Versión 302 — to-do 106 cerrado: "ninguna es mejor" → Mistral+Gemini en paralelo con comparación, no un default

- **to-do 106 (¿conviene cambiar el default Mistral→Gemini?) cerrado con una respuesta distinta a
  la esperada**: una sesión en worktree corrió el comparativo de punta a punta contra una muestra
  amplia de documentos y el resultado fue que NINGUNA de las dos es sistemáticamente mejor — cada
  motor se equivoca en celdas DISTINTAS del mismo documento. Elegir un default no resuelve nada.
- **Propuesta de Guido, adoptada**: correr Mistral Y Gemini en paralelo para cada documento (acepta
  el costo 2x) y usar el DESACUERDO entre los dos como la señal de qué necesita revisión humana, en
  vez de confiar en uno solo. `tools/compare-transcripts.mjs` (nueva) compara ambas transcripciones
  por rubro — probado contra River 2021 (Mistral vs. la transcripción de Gemini de la Versión
  298/299): encontró el error ya conocido ("Amortización de software") MÁS otras 18 discrepancias
  reales en el mismo documento, confirmando el diagnóstico de "ninguna es mejor".
- **`tools/onboard.mjs` reescrito** con el flujo completo: Mistral → Gemini en paralelo → comparar →
  si coinciden, `prepare-onboarding.mjs` automático; si no, para ahí y deja los 2 `.md` listos para
  cuando Guido convoque a Claude a resolverlo (nunca automático). `gemini-transcribe.mjs` sumó
  `--out-suffix` (mismo patrón que ya tenía `mistral-ocr-transcribe.mjs`) para poder transcribir en
  paralelo sin pisar el `.md` de Mistral.
- `*.gemini-check.md` sumado a `.gitignore`, mismo criterio que `*.briefing.json`.

## Versión 301 — `tools/onboard.mjs`: el comando único (Mistral → Gemini redo → prepare-onboarding)

- **Pedido de Guido**: que correr Mistral/Gemini desde su terminal también dispare las tools nuevas
  del to-do 105, sin un comando aparte que acordarse de correr. `tools/onboard.mjs` encadena, sin
  tocarlas, `mistral-ocr-transcribe.mjs` → `gemini-transcribe.mjs --redo-mistral-scanned` →
  `prepare-onboarding.mjs` (un briefing.json por documento). Uso individual (`<pdf> [--club]
  [--year]`) o en lote (`--all [--dir] [--limit]`).
- **`--club` se adivina comparando el nombre de la CARPETA contra `data/clubs.js`, solo si hay UNA
  coincidencia clara** — probado con un caso real ambiguo ("Racing" matchea tanto a Racing Club
  como a Genk, cuyo nombre legal en bélgico incluye "Racing"): ahí se niega a adivinar y pide
  `--club` explícito, en vez de arriesgar cargar bajo el clubId equivocado. `--year` sí se adivina
  siempre del nombre del archivo (bajo riesgo, solo afecta la búsqueda de liga cacheada).
- **OJO para cuando se corra `--all` de verdad**: el paso de Gemini (`--redo-mistral-scanned`) barre
  TODO el proyecto, no solo el `--dir` pedido — no se corrió de punta a punta en esta sesión por
  eso, queda para que Guido lo tire desde su terminal.

## Versión 300 — to-do 105 #1, ronda 2: `prepare-onboarding.mjs` probado contra portugués/EUR, 3 bugs más en `extract-table-rows.mjs`

- **`extract-table-rows.mjs` no encontraba NINGUNA tabla en un documento sin "|"** (Corinthians
  2024-25: Mistral transcribió un PDF con capa de texto nativa muy limpia como texto corrido en vez
  de tabla Markdown -- 0 tablas en un documento de 5000+ líneas con datos reales adentro). Agregado
  un segundo parser (`parsePlainTextRow`) que reconoce "Etiqueta [Nota] Valor1 [Valor2]" en texto
  plano, escaneando desde la derecha por tokens que parecen un valor monetario real (con separador
  de miles/decimal) para distinguirlos de una referencia de Nota.
- **Una sub-nota tipo "24.1"/"24.2" se confundía con un valor real** (ambas tienen un "."), corregido
  con la señal que las distingue: un separador de miles real agrupa de a 3 dígitos, una sub-nota de
  a 1.
- **Un heading FUERTE repetido en cada página (membrete de Corinthians) bloqueaba para siempre el uso
  del heading DÉBIL real** ("Demonstração do Resultado do Exercício"), porque el trail de headings
  nunca se reseteaba por página y la ventana de solo 2 headings se llenaba con metadata (fecha,
  moneda, fila "Nota AÑO AÑO") antes de llegar a la tabla. Arreglado reseteando el trail en cada
  salto de página y ensanchando la ventana de 2 a 5 (`TRAIL_MAX`).
- Probado sin regresión contra los 3 documentos de la Versión 299 (River, Once Caldas, Rosenborg) +
  2 nuevos (Corinthians portugués/BRL en texto plano, AC Milan italiano/EUR con tablas `|`
  normales) -- 8 bugs reales encontrados y arreglados en total entre las 2 rondas.
- Sigue sin conectarse a ningún skill (misma razón que la Versión 299): ya cubrió la diversidad de
  idioma/moneda/formato que hacía falta, queda pendiente que Guido confirme antes de sumarlo.

