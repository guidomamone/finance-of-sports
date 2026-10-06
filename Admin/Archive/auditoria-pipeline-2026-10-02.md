# Auditoría del pipeline PDF → año cargado (UC, Fortaleza CEIF, Goiás), 2026-10-02

Solo lectura. Fuentes: HANDOFF, CHANGELOG 324-400, cabeceras de las tools, `Generados/**/*.json`, `Admin/ajustes-manuales.jsonl` (49 líneas),
`Admin/cola-revision.jsonl` (530 casos), `Generados/_cache/claude.jsonl`, `Admin/claude-api/resultados.jsonl`, y los tres `data/*-data.js`.
Los números de línea de `data/goias-br-data.js` cambian (otra sesión lo está editando: figura modificado en `git status`); por eso cito etiqueta + año.
`[CONFIRMADO]` = lo vi con evidencia. `[A CONFIRMAR]` = sospecha.

## Resumen (por impacto)

1. [CONFIRMADO] **Números mal publicados hoy en Goiás 2024 y 2025**: "Despesa com pessoal" está invertida entre la nota de fútbol y la administrativa. 2024: 44,6 M BRL de sueldos del plantel quedaron como gastos generales, y 9,4 M de sueldos administrativos como salarios del plantel. 2025: 7,97 M administrativos como salarios del plantel. Causa: el caché de Claude (`Generados/_cache/claude.jsonl`) no incluye la sección en la clave.
2. [CONFIRMADO] **Una categoría de ingresos con suma negativa en el sitio**: Goiás 2008, 2009, 2010, 2012, 2017 (otros ingresos, hasta -1,77 M) y 2021 (estadio -0,90 M), porque las "(-) Deduções da receita" se cargan como filas de ingreso negativas en una categoría que no es de donde salen.
3. [CONFIRMADO] **`sinDesglose` ya se usa y se usa mal**: "Serviços de terceiros" (8,1 / 7,5 / 12,8 M, Goiás 2023-2025) está en `sinDesglose` con categoría `lump_football_operations_expense`, pero es una fila desglosada. El HANDOFF dice "hoy ningún año cargado lo usa": son 8 años.
4. [CONFIRMADO] **Reglas de categorización por etiqueta sin contexto** en tres lugares (caché de Claude, `respuestaCat` de la cola, `--corregir-categoria`). Costó 10 ajustes `categoria` en Goiás y deja 2024/2025 sin corregir. Propuesta: la sección (`padre`) entra en la clave de las tres + un chequeo gratis de coherencia entre años.
5. [CONFIRMADO] **El aviso de "categorías en 0" se apaga entero si hay cualquier fila `lump_`** (`cargar.mjs:489`). Fortaleza 2017/2018 y Goiás 2012, 2013, 2016, 2023-2025 quedan sin ese control; 2017 tiene salarios en 0 y nadie avisó.
6. [CONFIRMADO] **`sin-dudas` se aplicó a los 9 años de Fortaleza** y silenció 55 dudas, incluidas las de escala y la de por qué no se abrió el detalle de gastos de 2017. Es un silenciador de todo o nada.
7. [CONFIRMADO] **Gasto repetido**: el lote 09b volvió a localizar/extraer Goiás 2025 y 2017 ya cargados (US$ 0,45) porque `lote.mjs:56` lee el `.carga.json` viejo; Goiás gastó 11 extracciones de más (US$ 2,93 + 0,46 para 15 documentos).
8. [CONFIRMADO] **Lo que se resolvió a mano tiene patrón**: `resultado-final` en 5 de 9 años de Fortaleza (4 repiten el mismo origen: nota de patrimonio + columna del año siguiente), `fila` de costos financieros mal rotulados 3 de 4 veces, `anio` 10 veces por un mismo patrón de nombre de archivo, `cero-real` 9 líneas para 6 hechos. Cada uno admite un escalón gratis con compuerta.
9. [CONFIRMADO] **La etapa 4 es circular para los documentos rearmados con texto propio** (8 de Goiás): el `.md` sale del `pdftotext` y se valida contra el `pdftotext`. Los 41 documentos de los tres clubes validaron por `pdftotext`: los escalones 1 y 2 (Gemini, Claude) nunca se usaron.
10. [CONFIRMADO] **Casos de la cola que nadie cierra**: `cargar.mjs` no llama a `cerrarObsoletos`; hoy quedan 6 pendientes, de los cuales 4 (2 `perfil`, 2 `categoria` de Goiás 2016) ya no tienen sentido. Y 289 preguntas de categoría (Fortaleza 186, Goiás 95, UC 8) se contestaron `aceptar` en el 91-94%.

---

## 1. Escaleras: qué escalones existen y cuáles se usaron

Evidencia: `Generados/<país>/<club>/*.verificacion.json` (41 documentos con ese archivo, 40 de ellos de Fortaleza y Goiás).

| Escalera | Escalones | Uso real en UC / Fortaleza / Goiás |
|---|---|---|
| Etapa 2 re-transcribir / rearmar | 0 transcripción · 1 Mistral · 1b texto propio (columnas → regiones) · 2 falta | Rearmado con texto propio en Goiás 2008-2012, 2014-2016 (8 `.antes-texto-propio.md` en `Generados/Brasil/Goias/`). UC 2015 (Mistral). Escalón 2: nunca hizo falta. |
| Etapa 3 localizar | 0 índice · 1 ampliado · 2 notas como estado | Fortaleza 2018, 2019, 2022 (notas como estado). UC y Goiás: escalón 0 casi siempre; reintento `ampliado` en UC 2010, 2011, 2013, 2015, 2022. |
| Etapa 4 validar | 0 texto propio · 1 Gemini · 2 Claude · 3 sumas | **Solo el 0** en los 41 documentos (`modo:"digital"`, `fuentes` todas `pdftotext`). Gemini: 9 llamadas en total desde el 1/10, todas sobre PDFs temporales. |
| Etapa 6 lecturas | 0 a 4 | Lectura 0: la mayoría. Lectura 1: Fortaleza 2021, 2023-2025. Lectura 3: Goiás 2016, 2022-2024. Lectura 4: Goiás 2008-2011 (los tres casos que la originaron). |
| Etapa 6 escala | 0 declarada · 1 año vecino | Escalón 1: Fortaleza 2022, 2023, 2024 (3 de 9). |
| Etapa 6 resultado final | 0 impreso · 1 documento siguiente | Escalón 0: Fortaleza 2024, 2025. Para 2017, 2018, 2019, 2022, 2023 no alcanzó y se usó ajuste. |
| Etapa 6 dudas de la IA | 0 nota · 1 respondida · 2 aritmética · cola | En Fortaleza, el ajuste `sin-dudas` las cerró **antes** de llegar al escalón 1: 55 de 55. |
| Etapa 8 categorías | 0 ajuste/respuesta · 1 precedente con contexto · 2 precedente · 3 familia · 4 Jev · 5 Claude · 6 materialidad | Escalón 6 (materialidad): ningún caso real todavía (CHANGELOG V386). Escalón 1: se saltea cuando la etiqueta trae "(a)" (ver punto 4). |
| Etapa 8 tipo de cambio / perímetro / fecha | ver HANDOFF | Funcionan; el único uso manual fue Fortaleza 2025 (TRM del 20-nov descartada por la compuerta de fecha, V373). |
| Caja y deuda | 0 precedente · 1 vocabulario · 2 IA | Fortaleza: 7 llamadas IA (US$ 0,25). Goiás: no se corrió; los 15 años tienen `grossDebt:null`. |

UC no tiene ni un ajuste manual en `ajustes-manuales.jsonl`: es el único club cargado por completo por las escaleras. Fortaleza y Goiás suman 49.

**Propuesta transversal**: registrar en el `.verificacion.json` y en la meta "en qué escalón salió" también para las etapas 4 y 8 (hoy lo dice el HANDOFF como pendiente). Sin eso no se puede medir qué escalón sobra, como acabo de hacer a mano.

## 2. Reglas agregadas por un solo caso que conviene revisar o que se pisan

**2.1 Cero-real desactivado por `lump_` [CONFIRMADO].** `tools/cargar.mjs:489`: `if (!conCat.some((f) => /^lump_/.test(f.cat)))` envuelve los tres controles (salarios, televisión, estadio) y los de socios/otros deportes. Basta una fila `lump_*` para que no corra ninguno.
- Fortaleza 2017: ingresos "Actividades Deportivas" 4.220,7 M COP como `lump_football_operations`, gastos con solo 5 filas (`Total Gastos de Administración` 2.478,6 y `Total Gastos de Ventas` 979,97 como administración) y **cero salarios** (`data/fortalezaceif-co-data.js` año 2017). En 2018 aparece "Nomina" 1.412,2: la serie se corta entre 2017 y 2018. Ningún aviso.
- Goiás 2023, 2024 y 2025 tienen una sola fila `lump_football_operations_expense`: "Serviços de terceiros". Eso apaga el control en esos tres años. El `cero-real` de Goiás 2025 (estadio, socios) existe porque el control corrió **antes** de que llegara la respuesta que le puso `lump_`: el resultado depende del orden en que llegan las respuestas.
- Propuesta: escalón de la etapa 8, el control corre siempre; solo se exime la categoría cuyo lado tiene la fila `lump_` (ingreso o gasto). Compuerta: el ejercicio de Goiás 2025 sigue pasando con sus `cero-real`.

**2.2 `lump_*` usada como "otros gastos del fútbol" [CONFIRMADO].** Guido contestó "operación del fútbol" para "Serviços de terceiros" de la nota de Custo com futebol (2024-2025) y quedó `lump_football_operations_expense`. `cargar.mjs:683` toda fila con esa categoría va a `fiscalYearMeta.sinDesglose`; `data/goias-br-data.js` líneas ≈662, 682, 707 listan "Serviços de terceiros" como "el documento no desglosa". El HANDOFF punto "Que la página lea `sinDesglose`" va a mostrar "No declarado" para una fila que sí está declarada.
- Propuesta: dos conceptos separados. `lump_` solo si la fila es un total sin abrir (`disclosureLevel` "aggregated" con hijos esperados); una fila hoja del fútbol va a una categoría de gasto del fútbol (`other_expenses` o una nueva), no a `lump_`. Gate gratis: una fila `lump_*` no puede tener hermanas desglosadas dentro de la misma nota.

**2.3 `sin-dudas` por documento [CONFIRMADO].** Se creó para Fortaleza 2023 ("que nunca más vuelva como problema o duda") y se replicó en 2017-2025 (9 ajustes, `ajustes-manuales.jsonl`). `verificar.mjs:511` corta **antes** de la escalera de dudas. Muestra de lo silenciado: Fortaleza 2017, "¿Se cargan las partidas de Gastos de Administración (b23 L587-L606…) como detalle de Total Gastos de Administración?" (el detalle nunca se abrió; ver 2.1); 2020, "¿Se carga el Impuesto de Renta (8,182) como ingreso por impuesto?"; 2022/2024, dudas de escala.
- Propuesta: `sin-dudas` pasa a tener un tema (`--tema escala|ingresos|...`) o a ser lista de claves aceptadas; el resto sigue la escalera (escalón 2 de la aritmética). Mientras tanto, que el listado de `ajustes.mjs` muestre cuántas dudas silenció cada uno.

**2.4 Ladder de lecturas 0-4 [A CONFIRMAR].** Cada escalón se agregó por un caso (lectura 3: Goiás 2024; 4: Goiás 2008; V392 y V388 también). El criterio de "gana la primera que cierra" con 5 lecturas que combinan signos aumenta la chance de cerrar por casualidad. Evidencia a favor de revisar: Goiás 2016 cierra con lectura 3 pero su nota 19 "no suma el renglón (0,017242 contra 19,707325)" y el sitio tiene 2 filas de ingreso y 6 de gasto (`verificacion.json` 2016, `notas`). Propuesta: la compuerta de cada lectura ≥ 1 incluye el chequeo de año vecino **antes** de aceptarla (hoy es posterior e independiente, V398 lo arregló parcialmente).

**2.5 Compuertas del lado apiladas [CONFIRMADO].** V374 (respuesta de la cola), V377 (toda la escalera), V375/V376/V378 (signos, palabras, no_es_rubro) y V394 (`categoria` que las saltea) son cinco reglas independientes sobre el mismo dato: el lado de la fila. Se pisan: una respuesta de otro lado se descarta **sin ningún aviso** (`cargar.mjs:424` pide una clave nueva `etiqueta|lado` y la respuesta original desaparece; no queda nota en `avisos`). Es el "cola.mjs --corregir-categoria se descarta en silencio" del HANDOFF. Propuesta: cuando la compuerta descarta una respuesta de Guido, `cargar.mjs` escribe un aviso con la respuesta y el motivo.

**2.6 Perfil por documento [CONFIRMADO].** `cargar.mjs` hace la pregunta del perfil por PDF: Fortaleza tiene 14 casos `perfil` (7 años × socios/otros deportes), los 14 con la misma respuesta "no" (`cola-revision.jsonl`, `ts` 2026-10-02T20:22). El perfil es del club. Propuesta: la clave del caso se arma con el club, no el pdf, y `cargar.mjs` relee `perfil-clubes.jsonl` justo antes de crear el caso.

## 3. Lo que se resolvió a mano y debería tener escalón

Agrupado por patrón (cada uno con su compuerta natural).

**3.1 `resultado-final` (Fortaleza 2017, 2018, 2019, 2022, 2023).** 4 de 5 dicen "lo repite el documento siguiente" (2017: `estados-financieros-2018.md` L541; 2018: 2019 L767; 2019: 2020 L829; 2022: 2023 L1099). El escalón 1 actual solo mira filas "resultado" y las combina con ±impuesto; no mira la nota de patrimonio/acumulados.
- Escalón nuevo (etapa 6, resultado final): el valor que figura en la nota de patrimonio o de resultados acumulados del propio documento (`Resultado Año 2018 (639,077)`) y también en la columna del año anterior del documento siguiente. Compuerta: los dos valores coinciden exactamente **y** (antes de impuestos − valor) es un impuesto razonable (|impuesto| ≤ 100% del resultado antes de impuestos). Pasa → resultado final adoptado, con nota. 2023 no pasa (ningún candidato) y sigue siendo ajuste.
- Impacto: 4 de los 9 años de Fortaleza dejan de depender de Guido.

**3.2 `fila` de costos financieros rotulados al revés (Fortaleza 2017, 2018, 2019).** El título de la nota dice "COSTOS FINANCIEROS" y el total se rotula "Total Otros Ingresos" (2017 L785-794; 2018 L772-780) o aparece positivo (2019 L1110). V375 invierte el signo solo si cierra el resultado.
- Escalón: el título de la nota (no la etiqueta del total) decide el lado del total de esa nota. Compuerta: el resultado y el impuesto calculado cierran con ese lado (en 2018: impuesto 40.604 contra 40.612 impreso, L448).

**3.3 `anio` (10 ajustes, Goiás 2008-2017).** Todos del mismo patrón `demonstracoes-contabeis-AAAA-BBBB.pdf` con AAAA = ejercicio. `alta-club.mjs` toma el último año del nombre.
- Escalón: si el nombre es `AAAA-(AAAA-1)` con años consecutivos y la fecha de cierre del contenido (`periodo.mjs`) es el 31-12 de AAAA, el año es AAAA. Compuerta: la fecha de cierre leída del contenido (ya existe) o, sin fecha, el vecino (2011 se resolvió así). 10 ajustes menos y el club siguiente con el mismo patrón sale solo.

**3.4 `cero-real` (Goiás 9 líneas / 6 hechos; Fortaleza 1).** Tres de las nueve líneas (Goiás 2014, 2015, 2017 "Otras secciones deportivas") son un 0 que en realidad es "no desglosado": Guido primero lo aprobó como "no existe" (búsqueda de "olímp/amador") y Claude lo corrigió después con otra línea ("Esportes olímpicos" aparece en las cuentas a cobrar, `2014.md` L507, `2015.md` L429, `2017.md` L485).
- Escalón gratis antes de reintentar (etapa 8, camino de error): buscar el vocabulario de la categoría (léxico multilingüe ya existente en `tools/vocabulario.mjs`) en el `.md` completo. Si no aparece nunca → cero real automático, con aviso. Si aparece solo fuera de los bloques elegidos (balance, cuentas a cobrar) → "no desglosado" (`sinDesglose` con el motivo), **sin reintento**, porque reintentar no encuentra un dato que el estado no separa. Si aparece dentro de un bloque no elegido → reintento (el caso actual).
- Coste evitado: el reintento de 2025 y 2017 (ver punto 5).

**3.5 `categoria` (Goiás 10 ajustes).** Uno es genuino (LFU 2023, `exceptional_items`). Los otros 9 son correcciones de la propagación por etiqueta: "Serviços de terceiros" 2008-2012, 2015, 2016 (6) y "Despesa com pessoal" 2014 y 2015 (2) más 2014/2015 cero. Todos los arregla la propuesta del punto 4.

**3.6 Respuestas de categoría en la cola.** 289 casos (`cargar|categoria`): Fortaleza 186 (aceptar 169, corregir 17), Goiás 95 (81 / 12 / 2 pendientes), UC 8. Las 17 correcciones de Fortaleza son una sola decisión repetida: "Auxilio de arbitraje/transporte/hotelero/Otros auxilios de la Dimayor → `other_income`, no `competition_bonus`" (fechas 2026-10-02, notas idénticas). Y no quedó uniforme [CONFIRMADO]: "Auxilio hotelero" es `competition_bonus` en 2019, 2022, 2023, 2024, 2025 y `other_income` en 2020 y 2021; "Auxilio de arbitraje" es `competition_bonus` en 2019, 2020, 2022, 2025 y `other_income` en 2021, 2023, 2024 (`data/fortalezaceif-co-data.js`, buscar "Auxilio").
- Escalón: una respuesta de Guido sobre una etiqueta es una regla de familia del club ("auxilio*" + tema) y se aplica a las hermanas ya cargadas **como propuesta de recarga**, no solo hacia adelante. Gate gratis de coherencia entre años (punto 4.3) lo detecta.
- Para bajar las preguntas: las filas hoja de una nota grande con confianza ≥ 0,5 y que no cambian la suma de su lado (todas son del mismo lado) podrían cargarse con aviso (materialidad por categoría, no solo por 1% del lado). [A CONFIRMAR]: no medí cuánto subiría el 1%.

## 4. Los problemas anotados en el HANDOFF (punto 2), confirmados

**4.1 "Despesa com pessoal" y "Serviços de terceiros" por etiqueta [CONFIRMADO, y peor de lo anotado].** El HANDOFF dice que se corrigió con ajustes. No se corrigió todo:
- Goiás 2024 (`data/goias-br-data.js`, gastos 2024): "Despesa com pessoal" -44,603582 `admin_general_expense` (pág. 26, "Claude 0.85"); `.md` L1054 es la nota 18 "Custos com futebol". Y "Despesa com pessoal (a)" -9,428348 `wages_squad` (pág. 27) está en la nota 19 de administración (`.md` L1094). **Invertidas.**
- Goiás 2025: "Despesa com pessoal" -7,972794 `wages_squad` (pág. 30); `.md` L1265 está en la nota 20 "Despesas administrativas". Mal. La de L1224 (-60,604081, `wages_squad`) está bien.
- Correctas: 2021, 2022, 2023. Los ajustes de 2014 y 2015 sí se aplicaron.
- Mecanismo: `categorias.json` 2024 dice `escalon:2, desdeCache:true, section:"nota que desglosa \"Custo com futebol\"", motivo:"Personal en nota de gastos administrativos"`. Es la respuesta que Claude dio en otro documento (nota administrativa) y se sirvió para esta. Clave del caché: `Generados/_cache/claude.jsonl:2937` `goias-br|expense|despesa com pessoal` (admin) y `:2882` `goias|expense|despesa com pessoal` (wages): **dos claves de club distintas** (`goias` y `goias-br`) para el mismo club, con respuestas opuestas, y sin sección. Código: `tools/categorizar-claude.mjs:533` (`cacheClaude.get(rj.club, r.lado, r.label)`) y `:541` (`cacheClaude.set(...)`, sin `section`).
- Por qué el escalón 1 (precedente con contexto) no lo salvó: `Admin/categorias-aprendidas.jsonl` guarda `padre`, pero la etiqueta cambia entre años con la marca "(a)" (`Despesa com pessoal (a)` 2022-2025 en fútbol; sin "(a)" en la nota administrativa). `vocabulario.normalizar` no saca marcas de nota "(a)", "(b)", "(*)".
- Propuesta (escalera, etapa 7): (a) la clave del caché lleva la sección (`padre` normalizado); (b) `normalizar` para la clave de precedente saca las marcas "(a)/(b)/(*)" finales; (c) el precedente sin contexto **no** se sirve si la etiqueta ya tiene dos categorías o dos secciones en el club (ya existe para el precedente del sitio, no para el caché); (d) club id único (`goias-br`) en el caché y en `categorias-aprendidas.jsonl`. Medir en UC (idéntico) y en Goiás 2021-2025 (deben cambiar solo 2024 y 2025).

**4.2 `cola.mjs --corregir-categoria` se descarta en silencio [CONFIRMADO].** El comando crea un caso con la clave sin lado ni sección (`tools/cola.mjs:161-168`), por club entero. En `cargar.mjs:424`, si el lado no coincide, la respuesta se ignora sin aviso (ver 2.5), y si coincide se aplica a **todos los años del club por etiqueta**, que es el origen de 4.1. Propuesta: `--corregir-categoria` pasa a requerir `--documento` o `--seccion` (default: el pdf dado), y escribe un ajuste `categoria` (escalón 0, ya existe) en lugar de una respuesta de cola.

**4.3 Faltante: coherencia entre años [CONFIRMADO que lo habría atrapado].** Un chequeo gratis después de cargar (o en la propuesta): para cada fila, otras filas del mismo club con la misma etiqueta normalizada y la misma sección, ya cargadas, con otra categoría. Corriéndolo a mano sobre los tres archivos, aparecen exactamente: Goiás "Despesa com pessoal" (2022, 2023, 2024, 2025), Goiás "Serviços de terceiros" (2008-2016 admin; 2023-2025 `lump_`), Goiás "Despesas legais e judiciais" (2025 `exceptional_items`; otros años admin: [A CONFIRMAR] si es real), Fortaleza "Auxilio hotelero/arbitraje". UC: ninguno. Es un escalón de la etapa 8: "cambia de categoría entre años" → aviso, y a la cola solo si la suma pasa de un umbral.

**4.4 `cero-real` para "no desglosado" [CONFIRMADO].** Goiás 2014, 2015, 2017: dos líneas de ajuste cada uno (la primera diciendo "no existe", la segunda corrigiendo). Falta el campo del que habla el HANDOFF. Ver 3.4. Observación: `cargar.mjs:683` ya arma `sinDesglose` desde categorías `lump_`; el campo faltante es para el 0 de una categoría sin fila (hoy no hay dónde escribirlo).

**4.5 Reintento que repite lo ya cargado [CONFIRMADO].** `tools/lote.mjs:56` (`verifDe`) junta `reintentar` del `.verificacion.json` **y del `.carga.json`**. El `.carga.json` de 2025 y de 2017 conservaba el pedido de "categorías en 0" de la primera corrida (la que después resolvieron los `cero-real`). `Admin/claude-api/resultados.jsonl`: 2026-10-02T22:45-22:47, `localizar` + `localizar-2` + `extraer-reintento` de 2025 (US$ 0,049 + 0,039 + 0,152) y `localizar` + `extraer-reintento` de 2017 (0,036 + 0,177) = **US$ 0,45**, más la corrida original (21:19-21:25) de los mismos dos documentos.
- Propuesta (compuerta gratis en `lote.mjs:88`, antes de llamar a la IA): no reintentar si (a) el año ya está en el sitio, (b) hay un ajuste `cero-real` por cada categoría pedida, o (c) el ajuste/respuesta es más nuevo que el `.carga.json`. Si no pasa, imprime por qué no reintenta.

## 5. Gasto de API y pasos que dependen de la memoria

Desde el 1/10 (Claude API, `resultados.jsonl`), solo los tres clubes: **US$ 16,96**.

| | llamadas / documentos | US$ |
|---|---|---|
| UC localizar + localizar-2 | 54 / 17 | 3,36 |
| UC extraer + reintento | 31 / 17 | 3,61 |
| Fortaleza localizar + extraer | 36 / 9 | 4,69 |
| Goiás localizar + extraer | 70 / 15 | 5,04 |
| Caja y deuda (Fortaleza) | 7 / 7 | 0,25 |

- [CONFIRMADO] Goiás: 26 `extraer` para 15 documentos y 5 `localizar`, 4 `extraer` del 2016 en un día (US$ 1,00 por un documento, ~4 veces su costo normal). Causa: cada ajuste al texto propio (V395, V397, V399, V400) obliga a volver a localizar y extraer. Propuesta: `lote.mjs` guarda la huella del `.md` junto al `.filas.json`; si el `.md` cambió pero los bloques elegidos (líneas y cifras) son idénticos, reutiliza `filas`. Medir con el 2016 (el cambio de etiquetas sí cambia las filas: debe re-extraer; los otros no).
- [CONFIRMADO] UC 2025 se extrajo 3 veces el 1/10 (12:37, 13:48, 15:30) y UC 2021 dos (15:12, 15:28) mientras se medían reglas. Es el costo de la regla "medir en UC lote 07"; ver abajo.
- Caché `Generados/_cache/claude.jsonl` (2.963 entradas) y `jev.jsonl` (20.647): en Goiás, `goias` y `goias-br` duplican entradas (ver 4.1); cada una se pagó.
- `categorizar` de todos los clubes: 149 llamadas, US$ 4,98 en el período (no separado por club).
- Pasos de memoria humana: (1) después de cambiar un `.md` (rearmado), `estado.mjs --actualizar` o `inventario-transcripciones.mjs`; el `lote.mjs` lo hace en dos puntos (líneas 152 y 192) pero `texto-propio-a-md.mjs` corrido suelto no. (2) Después de un ajuste/respuesta nueva, recargar los años ya cargados (`cargar.mjs --reemplazar`) no tiene aviso: el sitio puede quedar distinto de lo que propondría hoy el pipeline. Propuesta: `node tools/estado.mjs` (o un `--deriva`) corre la propuesta de carga de cada año cargado y lista las filas con otra categoría (gratis). (3) `verificar.mjs --rubros` hay que acordarse (lo hace `lote.mjs`). (4) Los logs de lote y `Admin/.lote-lista-actual.txt` sin trackear quedan sueltos en `git status`.

## 6. Trampas que el HANDOFF todavía no cuenta

1. [CONFIRMADO] Hay dos claves de club para Goiás en el caché y en `categorias-aprendidas.jsonl` (`goias` y `goias-br`, líneas 543/548 contra 555). Cualquier club dado de alta después de haber categorizado queda partido.
2. [CONFIRMADO] La etapa 4 con documentos rearmados con texto propio no es una segunda fuente: ver resumen 9. Hay que marcar en el `.validacion.json` `circular:true` y no contarlo como confirmación independiente.
3. [CONFIRMADO] `cargar.mjs` nunca cierra casos obsoletos (`cerrarObsoletos` solo se llama desde `verificar.mjs:605`). Pendientes hoy: Goiás 2025 `perfil` (socios), 2017 `perfil` (otros deportes), 2016 `categoria` ("ATIVIDADES (nota 17)" y "profissional e amador (nota 18)": etiquetas de antes del rearmado de la V400), y dos `duda-tema` de 2013 y 2015 de años ya cargados. Los dos `perfil` ya tienen respuesta en `Admin/perfil-clubes.jsonl` línea 68 (`goias-br`, socios y otros deportes en `true`).
4. [CONFIRMADO] La mayoría de los casos de `verificar` termina `obsoleto`: Fortaleza 60 de 66, Goiás 93 de 112. La cola se llena de casos creados antes de que corra toda la escalera y se cierran solos. Propuesta: crear el caso solo al final de la pasada de `verificarLista` (después de la repetición de escala).
5. [CONFIRMADO] La cabecera de `data/goias-br-data.js` dice "SIN EJERCICIOS CARGADOS TODAVÍA… las estructuras de abajo están vacías a propósito" con 15 años cargados. La escribe `alta-club.mjs` y `cargar.mjs` no la reemplaza (el comentario dice que la reemplaza la sesión de onboarding).
6. [CONFIRMADO] `officialTotalRevenue` de Goiás 2025 = 46,814472, pero el total impreso es 45,374624 (`verificacion.json`: "45.374624 = 45.374624" ok): la diferencia 1,439848 es "Outras Receitas (b)" que V392 pasó a ingreso. Además es un "levantamiento de créditos tributários… R$ 4.000.816" (nota b) que probablemente es extraordinario, no recurrente. [A CONFIRMAR] la categoría.
7. [CONFIRMADO] Etiquetas que son oraciones: Fortaleza 2023 `rawLabel:'El costo detallado a continuación corresponde a la comercialización de artículos deportivos, al 31 de diciembre de:'` (132,31, `other_expenses`, "Jev 0.99") y 2024 la misma truncada. Se publican tal cual. Gate gratis: etiqueta de más de 60 caracteres o que termina en ":" → usar el título de la nota como etiqueta, con aviso.
8. [CONFIRMADO] Fechas de los ajustes: los de Goiás de las 00:2x UTC quedan "2026-10-03" con motivo "Guido 2026-10-02". Inofensivo, pero confunde al leer el historial.
9. [CONFIRMADO] La regla "medir en UC lote 07 (idéntico)" cuesta API: 54 `localizar` y 31 `extraer` de UC en los dos días. El `verificar` y `cargar` son gratis, pero `localizar`/`extraer` no; si el lote 07 se mide solo desde verificar y cargar con los `.filas.json` existentes (sin `--rehacer`), el costo es 0. Ya es así por defecto; lo que gastó es re-localizar a pedido. [A CONFIRMAR] cuántas de esas llamadas fueron mediciones.
10. [A CONFIRMAR] Goiás 2025: "Patrocínio/bilheteria/Sócio Torcedor/Outras" 19,93 M como `sponsorship_commercial` (43% del ingreso). La etiqueta mezcla boletería, socios y patrocinio; la categoría la cuenta entera como patrocinio. El `cero-real` de estadio y cuotas es razonable, pero la fila debería ser `lump` o una categoría mixta, no patrocinio.

## 7. Datos ya cargados que podrían estar mal (solo señalo)

Todos de `data/*-data.js` (líneas aproximadas al momento de la lectura).

- **Goiás 2024**, `Despesa com pessoal` -44,603582 (`admin_general_expense`, L≈363) y `Despesa com pessoal (a)` -9,428348 (`wages_squad`, L≈381): invertidas. El gasto de plantel cae de 54,0 a 9,4 M y administración sube. [CONFIRMADO]
- **Goiás 2025**, `Despesa com pessoal` -7,972794 `wages_squad` (L≈408): es administrativa (`.md` L1265). [CONFIRMADO]
- **Goiás 2023**, `Outras Receitas e Despesas` +140,214785 dentro de gastos (`exceptional_items`): es intencional (V394) y el total oficial excluye ese monto, pero "gastos" suma +35,89 M positivo si alguien lee las líneas sin la meta. [A CONFIRMAR] cómo lo ve la página.
- **Goiás 2008, 2009, 2010, 2012, 2017**: `(-) Deduções da receita` / `Deduções das receitas` (-1,29 a -6,12 M) dentro de `other_income`, que queda negativo (-0,17, -0,83, -1,21, -1,66, -1,77). 2013-2015 igual pero positivo por casualidad (ej. 2015: -5,10 M contra 9,5 M de otras). [CONFIRMADO]
- **Goiás 2021**: `(-) INSS Competições/Torneios` -1,485264 en `matchday_competition` con "Bilheterias" +0,620535 → estadio neto -0,90 M. Es una deducción sobre ingresos de torneos (derechos de arena), no sobre boletería. [CONFIRMADO el signo; A CONFIRMAR la categoría]
- **Goiás 2016**: solo 2 filas de ingreso (RECEITA LÍQUIDA DAS ATIVIDADES 83,004966 `lump_football_operations`, 56% de todo) y 6 de gasto; sin televisión ni sueldos (la nota 17 de L885 no abre). Está bien declarado como `sinDesglose`, pero es el año más grueso del club. 2012 y 2013 tampoco tienen sueldos (`Despesas com futebol` 35,83 y 44,65 M `lump_`).
- **Fortaleza 2017**: sin salarios, `Total Gastos de Administración` 2.478,598 y `Total Gastos de Ventas` 979,969 como `admin_general_expense`; el `.md` tiene el detalle (L587-L746) y la duda de por qué no se abrió fue silenciada por `sin-dudas`. [CONFIRMADO; A CONFIRMAR por qué no abrió]
- **Fortaleza 2017 y 2018**: ingresos "Actividades Deportivas" 4.220,658 y 5.867,804 `lump_football_operations` (79% y 91% del ingreso); el `.md` 2017 tiene los detalles b20/b21 (L547-L566), dejados afuera.
- **Fortaleza 2018**: dos filas con la etiqueta "Otros" (837,677 y 376,803) y una "Impuestos Asumidos" -0,757 en `other_expenses`; etiquetas ambiguas sin sección que el precedente no distingue.
- **Fortaleza 2023-2025**: `rawLabel` "Transportes" 217 M y "Alquiler Deportivo" 144 M como `other_income`; "Alquiler Terrenos" 219,7 M como `match_organisation_expense` (2023). [A CONFIRMAR]
- **Fortaleza "Auxilio hotelero/arbitraje"**: inconsistente entre años (ver 3.6).
- **UC**: sin hallazgos. Las categorías con signo raro de 2016 ("Provisiones No Operacionales" +179,068) y 2020 ("Feriado Legal" +15,597) son reversiones impresas entre paréntesis y la carga las respeta; no hay categoría negativa ni año con una categoría que se lleve más del 27% de ingresos + gastos.
- Ya anotados en el HANDOFF y no repetidos: Almagro "Sede Social - Medrano 522" como cuotas, Grêmio "Receitas Patrimoniais", Vitória/Bahia/América Mineiro sin socios.

## 8. Orden sugerido de escalones (de a uno, medir en UC lote 07 + Fortaleza + Goiás)

1. Corregir los 3 datos de Goiás 2024/2025 con ajustes `categoria` (hoy; no toca el pipeline).
2. Caché de Claude y `respuestaCat` con sección + marcas "(a)" fuera + id de club único (4.1). Costo: 0 de API para medir.
3. Gate de coherencia entre años (4.3) y aviso cuando la compuerta del lado descarta una respuesta (2.5).
4. `lote.mjs`: no reintentar si ya está cargado o hay ajuste (4.5).
5. Control de ceros siempre activo por lado (2.1) + separar `lump_` de "fila hoja del fútbol" (2.2).
6. `cargar.mjs` cierra obsoletos y el perfil se pregunta por club (2.6, trampa 3).
7. Escalones de ajustes frecuentes: `anio` por patrón de nombre (3.3), `resultado-final` por patrimonio + año siguiente (3.1), título de nota decide el lado del total (3.2), cero-real por vocabulario (3.4).
8. `sin-dudas` por tema (2.3) y marca `circular` en la etapa 4 (trampa 2).
9. Deducciones de ingreso: gate de "categoría de ingresos con suma negativa" (resumen 2) con propuesta de agrupar las deducciones en una sola fila.
