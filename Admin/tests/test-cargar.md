# Test de la etapa 6 (`tools/cargar.mjs`): backtest, años nuevos y lo que no sirve de las etapas anteriores

2026-09-30. Rama `inventario-transcripciones`, sin commit. Pedido de Guido: construir la etapa 6 (cargar un año nuevo de un club que ya
existe) y probarla de punta a punta, porque "cuando introducimos un nuevo paso, descubrimos que algo hecho antes no sirvió". Lo más
valioso de este informe es la sección 4: la lista de problemas de etapas anteriores, con evidencia y la etapa donde hay que arreglarlo.

## 1. Resumen en números

| Qué | Resultado |
|---|---|
| Backtest (18 ejercicios ya cargados, 8 países, año borrado del data file en un worktree y reconstruido desde el `.md` con las etapas 3-5 reales del pipeline) | **1 carga, 17 frenan**. El que carga (Alianza Lima 2023) es igual a producción: ingresos, gastos, resultado, netInterest, fx y cada línea. |
| Los que frenan, ¿frenan bien? | Sí: en los 17 la propuesta tenía algo mal (escala, duplicados, filas de balance, categoría dudosa) o faltaba un dato (fx, perímetro). **Ninguno se hubiera cargado con números falsos**: el tie-out contra lo impreso los paró a todos. |
| Total de ingresos igual a producción (±0,5%) | 5 de 18 (Werder, RB Leipzig, Arsenal, Sunderland, Alianza Lima) |
| Dinero bien ubicado por categoría (mediana, solo líneas aceptadas) | ingresos 86%, gastos 85% (media 64% / 69%) |
| fx igual a producción | 13 de 18 (los 5 que no: CLP sin serie, GBP con un "tipo de cambio" falso del documento, CL/AR con varios valores declarados, COP) |
| Liga igual a producción | 5 de 18 (el resto queda `null`: no hay roster cacheado para esa liga-temporada) |
| `--escribir` en el worktree (Alianza Lima 2023) | escribió data file + liga + fuentes + ASSET_V, corrió los 4 generadores, `audit.js`: **P0 0 · P1 0** |
| Reversión | probada con una propuesta adulterada (total de ingresos falso): audit dio P0, se restauraron 8 archivos, md5 idénticos al estado previo |
| Años nuevos del piloto C+D (clubes existentes: Vejle 2014, PSV 2019-20, Dinamo Zagreb 2019, Los Andes 2009-10, Real Madrid 2005-06) | **0 cargan**; motivos abajo |
| Relevamiento: los 150 documentos `listo-para-jev` de clubes existentes | 0 cargan: **131 no tienen `.categorias.json`** y 14 lo tienen desactualizado; 91 sin fx; 28 con pregunta de perímetro |
| Gasto de API | **US$ 1,55 Claude** (dos corridas de las etapas 3-5 sobre los 18 documentos, 16 llamadas cada una) + ~US$ 0,04 Gemini (glosa) + centavos de Jev. Tope pedido: US$ 3 |

## 2. Cómo se corrió (reproducible)

1. Worktree en el scratchpad (`git worktree add --detach`), con `tools/` del working tree, una copia de `Generados/`, los 18 PDFs y las
   keys enlazadas. Para cada documento: el `.md` reemplazado por su `.mistral-redo.md` (lo que el pipeline produce hoy; 16 de 18),
   el año BORRADO de `data/<club>-data.js` (las tres estructuras + su fuente) y de `data/club-leagues/<iso2>.js`, sus derivados
   (`.rubros/.jev/.categorias/.briefing`) borrados, y una verificación sintética `listo` (el ejercicio ya está verificado a mano en
   producción) para que el pipeline vaya directo a la etapa 3.
2. `node tools/pipeline.mjs --ejecutar --lista Admin/bt.txt --limit 0 --max-paginas 0` en el worktree: etapas 3 (preparar), 5 (glosa,
   Jev, Claude). Así Jev y Claude NO ven la respuesta (el año no está en `data/`).
3. `node tools/cargar.mjs --lista Admin/bt.txt --comparar <repo real> --salida bt-res.jsonl` en el worktree.
4. `node tools/cargar.mjs "Clubes/Perú/Alianza Lima/estado-financiero-2023.pdf" --escribir` en el worktree, y la prueba de reversión.
5. En el repo real, solo `--propuesta` (no escribe `data/`): el piloto C+D y los 150 documentos de clubes existentes.

El worktree se borró al terminar. Script de armado: ver "Cómo repetirlo" al final.

## 3. Resultados

### 3a. Backtest (18 ejercicios)

"bien" = dinero de producción que quedó en la misma categoría (solo líneas aceptadas). Ingresos/gastos en millones de moneda nativa,
propuesta / producción.

| Club-año | País | Resultado | Ingresos | Gastos | bien ing/gas | fx | Causa principal (etapa) |
|---|---|---|---|---|---|---|---|
| Werder Bremen 2024 | DE | frena | 149,9 / 149,9 | -136,2 / -144,7 | 3% / 93% | = | "Umsatzerlöse" cargado sin abrir su nota (la nota no está en rubros.json, **E3**); amortización de intangibles con Claude 0,5 (**E5**); Anlagenspiegel en la lista de rubros (**E3**) |
| RB Leipzig 2024 | DE | frena | 466,8 / 466,7 | -1.361,8 / -454,1 | 100% / 100% | = | escala mezclada: "Steuern vom Einkommen" 3.091 y "Sonstige Steuern" 634 leídos en miles cuando son euros (**E6/proponer-carga**); "Spielerwerte" del Anlagenspiegel como amortización con Jev 0,92 (**E3**) |
| Hoffenheim 2025 | DE | frena | 0 / 173,4 | 0 / -203,2 | - | = | `sin-rubros`: la GuV no quedó `likelyRelevant` (solo el Anlagenspiegel) (**E3, extract-table-rows**) |
| Arsenal 2025 | GB | frena | 771,5 / 770,5 | -10.077 / -754 | 100% / 54% | ≠ | nota de intereses en £'000 leída como millones (**E6**); fx falso "£0.6 million denominated in US dollars" (**alta**); perímetro |
| Fulham 2024 | GB | frena | 179,2 / 218,9 | -154,8 / -251,0 | 22% / 62% | = | falta "profit on disposal of players" como ingreso (convención de producción); perímetro |
| Sunderland 2025 | GB | frena | 85,3 / 85,3 | -10,4 / -85,6 | 54% / 12% | = | "Operating expenses"/"Cost of sales" con Claude 0,70-0,75 (**E5**); interés contado dos veces (nota + estado, **E6**) |
| América Mineiro 2024 | BR | frena | 413,1 / 104,2 | -244,3 / -152,8 | 100% / 100% | = | estado consolidado + controladora y cuadro de bienes de uso ("Edificações") en la lista (**E3/E6**) |
| Palmeiras 2025 | BR | frena | 3.126 / 1.628 | -902 / -1.246 | 100% / 62% | = | toma las tablas del PRESUPUESTO ("ORÇADO") y subtotales ("RECEITAS OPERACIONAIS") (**E3/E6**) |
| Ponte Preta 2023 | BR | frena | 23.103 / 32,4 | -56,5 / -47,3 | 94% / 84% | = | una tabla de la pág. 3 en unidades leída como miles (x1000) (**E6**) |
| Colo-Colo 2024 | CL | frena | 56.723 / 47.608 | -54.706 / -44.816 | 100% / 99% | ≠ | periodo falso (**periodo.mjs**); cuadros de movimiento ("Saldo Inicial") abiertos por el ancla (**E6**); CLP sin serie de fx |
| U. Católica 2022 | CL | frena | 35.378 / 23.811 | -39.442 / -21.411 | 43% / 100% | ≠ | filas duplicadas entre nota y estado ("Remuneraciones" dos veces) (**E6**); fx con dos columnas de año (**alta**) |
| Once Caldas 2024 | CO | frena | 0 / 26.971 | 0 / -21.995 | - | ≠ | `sin-rubros` (**E3**); alta lo marca INTERMEDIO (falso) |
| **Alianza Lima 2023** | PE | **carga** | 108,21 / 108,21 | -100,96 / -100,96 | 65% / 100% (100%/100% en la 1ª corrida) | = | igual a producción; la diferencia de la 2ª corrida es Jev no determinista (ver 4.9) |
| Los Andes 2021 | AR | frena | 107,4 / 125,4 | -67,3 / -114,8 | 86% / 49% | = | "SUELDOS Y JORNALES" con Claude 0,5 (**E5**); producción tiene netInterest 27,0 (RECPAM) y la propuesta 0,4 |
| Vélez 2021 | AR | frena | 15.726 / 2.346 | -6.524 / -3.074 | 100% / 64% | = | escala x1000 en las tablas de publicidad (**E6**); encabezados "Ingresos para fines generales" sin categoría; perímetro "consolidado" falso (**alta**) |
| Osasuna 2022 | ES | frena | 2.927 / 70,1 | -6,4 / -69,1 | 9% / 85% | = | notas x1000 ("Ingresos excepcionales 3.654") (**E6**); sueldos con Claude 0,4 (**E5**) |
| Almagro 2022 | AR | frena | 152,1 / 143,6 | -137,9 / -149,9 | 100% / 92% | = | "Comisión por compra de jugadores" Claude 0,65; el resultado impreso (-6,31) no es el officialPAT de producción (-13,48): diferencia de PRODUCCIÓN a revisar, no del pipeline |
| Racing 2012 | AR | frena | 58.905 / 184,8 | -142,5 / -166,8 | 72% / 85% | ≠ | "Cuotas Sociales $27.908.682" leído en miles (x1000): escala por plausibilidad contra años inflados (**E6**); fx declarado varios valores (**alta**) |

### 3b. Años nuevos de clubes existentes (piloto C+D, `--propuesta` en el repo real)

| Documento | Frena por |
|---|---|
| Vejle 2014 | perímetro (el alta ve "koncern" 4 veces; 2024 se cargó como la sociedad individual); "Af- og nedskrivninger" con Claude 0,55 (sin ella el resultado impreso -4,527 cierra exacto); **DKK sin cotización** (FX_CLOSE solo tiene DKK@2024-12-31) |
| PSV 2019-20 | "Vergoedingsommen" (ingresos por transferencias, 46,9 M) con Claude 0,75; con esa fila el resultado impreso 1,571 cierra exacto (verificado a mano). Perímetro heredado (consolidado) |
| Dinamo Zagreb 2019 | moneda: el documento está en HRK y el sitio no tiene moneda "legado" (decisión de Guido, to-do 112); UEFA con Claude 0,75 |
| Los Andes 2009-10 | **escala mezclada** (estado x1000, anexo x1: TV 1.440,5 contra sueldos 2,6) por la plausibilidad contra 2020-21; "Revaluación Pl. Profesional" 1.330 con Claude 0,45 |
| Real Madrid 2005-06 | **EUR sin cotización** para 2006-06-30; "Gastos de Operación" / "Amortizaciones" con Claude 0,45-0,6; gastos cierran solo por redondeo (0,12) |
| Los otros 15 del piloto | clubes nuevos (fuera del alcance: alta) |

Con el umbral por defecto (Claude >= 0,80) ninguno llega a `--escribir`. **Con `--umbral-claude 0.7`, PSV 2019-20 CARGA**: 11 líneas de
ingresos y 11 de gastos, netInterest -3,743 y tax -0,584 (con `extraRows`), resultado 1,571 = "Resultaat na belastingen" impreso, fx
`EUR@2020-06-30`, perímetro consolidado heredado. Se escribió en el worktree: `audit.js` P0 0 · P1 0. La fila dudosa era
"Vergoedingsommen" (así, con una sola s): producción tiene "Vergoedingssommen (transferopbrengsten)" -> `player_sales` en 2024 y 2025,
pero el precedente es por texto EXACTO y no la reconoció (ver 4.5). Vejle 2014 con la fila de 0,55 aceptada también cierra exacto
(-4,527), pero sigue frenado por perímetro y por falta de la cotización DKK.

### 3c. Los 150 documentos `listo-para-jev` de clubes existentes (`--propuesta`)

| Frena por | Documentos |
|---|---|
| sin `.categorias.json` (nunca se corrió la etapa 5 sobre ellos) | 131 |
| `.categorias.json` desactualizado (huellas) | 14 |
| sin tipo de cambio: EUR 36, CLP 27, DKK 9, varios valores declarados 13, otros 6 | 91 |
| pregunta de perímetro del alta (consolidado / dos entidades) | 28 (y 45 heredaron "consolidado" de sus años ya cargados) |
| moneda legado HRK (Croacia antes de 2023) | 5 |
| periodo (`nombreNoCoincide` o no anual) | 5 |
| liga: fila `null` (sin roster cacheado) | 122 de 150 |

## 4. PROBLEMAS DE ETAPAS ANTERIORES (lo que no sirve para cargar), con evidencia

Ordenados por cuánto bloquean. "E3" = preparación (`pipeline.mjs` etapa 3 + `prepare-onboarding` / `extract-table-rows`), "E5" =
categorización, "E6 (selección)" = `proponer-carga.mjs`, que hasta hoy era un medidor y ahora es la selección de filas de la carga.

1. **La lista de rubros que se categoriza (E3) y las filas que se cargan (E6) son CONJUNTOS DISTINTOS.** La etapa 3 arma
   `.rubros.json` solo con las tablas `likelyRelevant` de estado de resultados; la carga usa la estrategia ancla-listas, que abre cada
   renglón del estado en la NOTA que lo desglosa. Las filas de esas notas nunca se categorizaron. Evidencia: Werder 2024 ("1.
   Umsatzerlöse" se abre en su nota; ninguna fila de la nota está en `.categorias.json` -> 3% del dinero de ingresos bien ubicado);
   Vejle 2014 ("Andre driftsindtægter" -> "Akkord 13,3 M" sin categoría); PSV ("Uitgaven inzake vergoedingssommen" sin categoría);
   103 de los 150 documentos traen filas elegidas por la carga que la etapa 3 no tiene. **Arreglo: que la etapa 3 prepare la lista de
   rubros con la MISMA selección (`seleccionarFilas()` de proponer-carga, ya exportada)**; mientras tanto `cargar.mjs` carga el renglón
   del estado sin abrir cuando su nota no está categorizada (15 casos en los 150), y lo avisa.
2. **Escala por tabla (E6 selección / prepare).** `pickScale()` elige la escala de CADA tabla por plausibilidad contra la mediana de
   ingresos de los otros años del club. Falla (a) con inflación (Racing 2012 contra años de cientos de miles de millones: "Cuotas Sociales
   $27.908.682" -> 27.908; Los Andes 2009-10 contra 2020-21), (b) en notas chicas dentro de un documento en otra unidad (RB Leipzig
   "Steuern vom Einkommen" 3.091, Arsenal nota de intereses £'000 -> 9.670, Osasuna, Vélez, Ponte Preta pág. 3). 6 de 18 ejercicios del
   backtest tienen al menos una tabla con la escala equivocada (RB Leipzig, Arsenal, Ponte Preta, Vélez, Osasuna, Racing). **Arreglo: una escala por DOCUMENTO** (la del encabezado del estado principal, "en miles
   de pesos" / "T€" / "£'000"), y las notas con la escala que las hace cerrar contra su renglón (como ya hace `findExpansion()`); la
   plausibilidad contra otros años solo como alarma, nunca para elegir.
3. **Tablas que no son de resultados entran a la lista de rubros (E3) y a la selección (E6).** Balances ("Aktiver"/"Passiver" de Vejle),
   flujos de fondos en neerlandés/croata ("Kasstroomoverzicht" de PSV, "novčanim tokovima" de Dinamo Zagreb), cuadros de bienes de uso
   (Anlagenspiegel de Werder, Hoffenheim y RB Leipzig: "Spielerwerte 547,9" categorizado `player_amortisation` por Jev con 0,92, es
   decir, se hubiera CARGADO como gasto si el resto cerraba; "Edificações" de América Mineiro), cuadros de movimiento ("Saldo Inicial" de
   Colo-Colo), y en Palmeiras las columnas de PRESUPUESTO ("SUPERÁVIT ORÇADO"). Además se paga a Claude para que diga `no_es_rubro` de
   subtotales ("RECEITAS OPERACIONAIS", "DESPESAS OPERACIONAIS"). `vocabulario.mjs` ya tenía FLUJO_EFECTIVO / TITULO_BALANCE /
   TOTAL_ACTIVO en 29 idiomas y su propio comentario dice "no los usa ninguna tool todavía". **Arreglado en esta sesión para la selección
   (E6)**: `esNoPL()` en proponer-carga usa esos patrones y descarta tablas con filas "total del activo / pasivo" o "Aktiver/Passiver".
   **Falta en E3** (`pipeline.mjs` sigue usando solo FLUJO_O_PATRIMONIO_RE) y un filtro de Anlagenspiegel/bienes de uso y de presupuesto.
4. **Filas duplicadas entre el estado y sus notas (E6 selección).** Universidad Católica ("Remuneraciones" 9.820 de una nota y -9.217 del
   estado), Sunderland ("Bank interest" de la nota + "Interest payable" del estado: netInterest contado dos veces), América Mineiro
   (consolidado + controladora). El filtro de "tabla secundaria con la mitad de importes ya vistos" no alcanza con tablas de 1-2 filas.
5. **La categorización (E5) deja con confianza < 0,80 justo las filas GRANDES y genéricas.** "SUELDOS Y JORNALES" 0,5 (Los Andes),
   "a) Sueldos, salarios y asimilados" 0,4 (Osasuna), "Operating expenses" 0,70 (Sunderland), "Vergoedingsommen" 0,75 (PSV),
   "Abschreibungen auf immaterielle Vermögensgegenstände" 0,5 (Werder), "Af- og nedskrivninger" 0,55 (Vejle), "Gastos de Operación"
   0,6 (Real Madrid). Parte es un problema del escalón 0: el precedente es por texto EXACTO, y "Vergoedingsommen" (PSV 2020, una s de
   menos) no matchea "Vergoedingssommen (transferopbrengsten)" de 2024/2025 -> va a Claude, que duda (0,75). Un precedente tolerante
   (sin paréntesis finales, sin número de nota, distancia de edición 1) lo hubiera resuelto gratis. Lo demás es honesto (la convención de cada club reparte sueldos por sector), pero con el tope de 5% de dinero sin categoría,
   **una sola fila así frena el ejercicio** (13 de 18 frenan por categorización). En PSV y Vejle, con esa fila aceptada, el resultado
   impreso cierra EXACTO: el tie-out ya es una verificación independiente de que la categoría no cambia montos. Decisión para Guido:
   ¿aceptar una fila de confianza baja cuando el resultado impreso cierra y la categoría solo cambia el reparto entre filas del
   "Formato simplificado"?
6. **El `.categorias.json` casi nunca existe para un año nuevo de club existente (pipeline).** 131 de 150 documentos `listo-para-jev` de
   clubes que ya están en el sitio no tienen `.categorias.json`: la etapa 5 solo corre sobre "los documentos de la corrida", y los
   re-preparados el 2026-09-30 quedaron sin categorizar (HANDOFF punto 7). Hay que correr la etapa 5 sobre ellos antes de cualquier carga.
7. **`periodo.mjs` marca `nombreNoCoincide` de más.** (a) Temporadas abreviadas "2009-10", "2023-24": el regex solo veía el primer año;
   eran **165 de los 226** documentos marcados (Los Andes, Nacional, Lazio, todos los alemanes). **Arreglado en esta sesión**: quedan 61.
   Hay que regenerar el registro para que llegue a `transcripciones-estado.jsonl` (`cargar.mjs` recalcula el período en vivo y avisa si el
   registro está viejo). (b) Quedan falsos por el "cierre = fecha más citada": Colo-Colo 2024 (el `.md` cita más el 31/12/2023),
   jaarrekening belgas "2018-06-30" con cierre leído 2018-11-29 (fecha de depósito), Gorica 2021 con 2022-03-31 (fecha del informe).
8. **Preparación `sin-rubros` con estado de resultados presente (E3).** Hoffenheim 2025: la tabla de la GuV (título "# **Konzern - Gewinn- und
   Verlustrechnung ...**" justo arriba) quedó `likelyRelevant: false` y la sección vacía; la única tabla relevante era el Anlagenspiegel.
   Once Caldas 2024: tablas PUC ("INGRESOS NO OPERACIONALES", "GASTOS DE VENTAS") sin título de estado reconocido. Los dos tienen 7 y 12
   líneas cargadas en producción.
9. **Jev no es determinista y el umbral 0,90 cae en el borde.** Mismo documento, dos corridas: Alianza Lima "Otros ingresos" -> 1ª corrida
   Jev < 0,90 y Claude `lump_football_operations` 0,8 (= producción); 2ª corrida Jev `other_income` 0,90 aceptado (≠ producción). Sunderland
   pasó de 37% a 12% del dinero de gastos bien ubicado entre corridas. Conviene fijar la respuesta (caché por club|lado|etiqueta, como `--cache-jev` de
   proponer-carga) para que la carga sea reproducible.
10. **Alta (`alta-club.mjs analizar()`) aplicada a un club EXISTENTE:**
    - Perímetro: pregunta en 28 de 150 aunque el club ya tiene su perímetro decidido en los años cargados. Vélez 2021 "solo del GRUPO
      consolidado" por 4 menciones (es una asociación civil); Vejle 2014 por "koncern". `cargar.mjs` hereda "consolidado" cuando todos los
      años cargados lo son (45 casos); el individual no se puede heredar porque la selección de filas no sabe elegir sus columnas.
    - fx declarado: falso positivo en Arsenal (0,6 de "£0.6 million denominated in US dollars"); tablas con dos columnas de año toman los
      dos valores (Católica "855,86 | 844,69", Racing 2012 varios): `fxDeclarado()` no sabe cuál es la columna del ejercicio.
    - Once Caldas 2024 marcado INTERMEDIO (es el anual).
    - Liga: para un club existente sin roster cacheado queda `null` (122 de 150; 13 de 18 en el backtest). No es un error, pero la
      carga escribe una fila `null` en `data/club-leagues` en casi todos los casos.
11. **fx de mercado faltante (dato, to-do 112):** EUR, CLP y DKK sin serie local; FX_CLOSE solo tiene los cierres ya usados. 72 de 150
    documentos no tienen cotización (EUR 36, CLP 27, DKK 9).
12. **Costos que no se registran:** `glosar-rubros.mjs` (Gemini) y `jev-categorizar.mjs` no dejan su costo en ningún `resultados.jsonl`,
    así que `gasto.mjs` no los cuenta (son centavos, pero el total del pipeline queda subestimado).
13. **Diferencias que NO son del pipeline (producción, to-do 101):** Almagro 2022 (resultado impreso -6,31, officialPAT de producción
    -13,48), Los Andes 2021 (producción tiene netInterest 27,0 que el estado no muestra como fila), Fulham (producción cuenta el "profit on
    disposal of players" como ingreso). Las decide una sesión, no el pipeline.

## 5. Qué se cambió en esta sesión (sin commit)

- `tools/cargar.mjs` (nuevo): la etapa 6. Propuesta por defecto, `--escribir` con reversión, `--lista`, `--salida`, `--comparar`.
- `tools/proponer-carga.mjs`: exporta `seleccionarFilas()`, `briefingFor()`, `loadSite()`, `parseNumber()` (el CLI no cambia y no corre al
  importarse); marca el `ancla` de cada fila abierta en una nota; `esNoPL()` (punto 4.3). OJO: esto último cambia lo que mide
  `--backtest` respecto de `Admin/tests/test-eleccion-tabla.md` (no se volvió a medir: cuesta Jev).
- `tools/periodo.mjs`: temporadas "AAAA-AA" (punto 4.7a).

## 6. Decisiones para Guido

1. ¿Una fila con confianza baja (Claude < 0,80) puede cargarse si el resultado impreso cierra exacto con ella? (4.5; con 0,70 PSV 2019-20 ya carga, `--umbral-claude`).
2. ¿Un total de ingresos o de gastos que el documento NO imprime puede darse por verificado por el resultado del ejercicio? Hoy
   `cargar.mjs` lo acepta y lo marca `por-resultado` (Alianza Lima: el documento no imprime "total ingresos"; producción tampoco lo tenía
   impreso). Si la respuesta es no, `--estricto` sería un cambio de una línea.
3. Un total que cierra solo por redondeo (Real Madrid 0,12; PSV, Fulham): audit.js exige < 0,01. ¿Fila de redondeo, o usar el impreso y
   tolerar el P0?
4. El orden de los arreglos: 4.1 (misma selección en E3 y E6) y 4.2 (escala por documento) son los que más destraban; 4.6 es correr la
   etapa 5 sobre lo ya preparado.

## Cómo repetirlo

El armado del worktree está en el scratchpad de la sesión (no quedó en `tools/`): crear el worktree, copiar `Generados/`, y por cada
documento borrar el año del data file y de `data/club-leagues`, reemplazar el `.md` por su `.mistral-redo.md`, borrar sus derivados y
agregar una verificación `listo`. Si se va a repetir seguido, conviene convertirlo en `tools/cargar.mjs --backtest-armar <lista>`.
Después: `node tools/pipeline.mjs --ejecutar --lista <lista> --limit 0 --max-paginas 0` y
`node tools/cargar.mjs --lista <lista> --comparar <repo real> --salida <x.jsonl>` en el worktree.
