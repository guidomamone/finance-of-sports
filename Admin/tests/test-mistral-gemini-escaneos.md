# Mistral OCR vs. Gemini en documentos marcados como escaneo: muestra ampliada

To-do 106 de `Admin/TODO.md`, corrido el 2026-09-28. Sigue del to-do 103 (cerrado el mismo día): el
caso puntual que lo disparó (River Ejercicio 2021, "Amortización de software") era una sola celda de
un solo documento — no alcanzaba para decidir si conviene cambiar el DEFAULT Mistral→Gemini para
escaneos que documenta CLAUDE.md ("Cada PDF nuevo") y `club-data-mapping/SKILL.md` sección 15. Este
test corre el mismo head-to-head contra una muestra bastante más amplia.

## Resumen ejecutivo

**No cambiar el default.** Ni Mistral ni Gemini domina: en ~1.660 celdas numéricas comparadas across
8 documentos de 4 países, cada motor cometió errores reales que el otro no cometió, en cantidad
similar (7 discrepancias donde Mistral se equivocó, 8 donde se equivocó Gemini — contando cada valor
o fila afectada por separado), y **ambos con una tasa de error minúscula** (bien por debajo del 1% de
las celdas comparadas). Lo que sí encontró el test, y es el hallazgo que importa de verdad: **cada
motor falla de una forma distinta y silenciosa**, ninguna de las dos detectable por un chequeo de
sumas/tie-out. El paso de verificación manual que ya exige CLAUDE.md para cualquier documento marcado
como escaneo sigue siendo imprescindible — este test es evidencia a favor de mantenerlo, no de
relajarlo.

## Metodología

- **8 documentos** que Mistral marcó `scanned:true` en `Admin/mistral/resultados.jsonl`, elegidos por
  diversidad de país (Brasil, Colombia, Grecia, Noruega — los 4 con volumen real de escaneos en el
  proyecto al momento del test) y por tamaño (18 a 40 páginas, evitando tanto los anexos de 1 página
  como los bilanci italianos de 100+ páginas, poco representativos del caso común).
- **Mismo PDF, dos transcripciones independientes**: la de Mistral ya cargada en el repo (la que se
  usaría hoy), y una corrida nueva de `node tools/gemini-transcribe.mjs` sobre una copia del mismo PDF
  en un directorio aparte (para no pisar la transcripción real ni interferir con otra sesión
  trabajando en paralelo sobre los mismos archivos).
- **Verificación con un subagente por documento** (8 en paralelo, Agent tool): cada uno leyó las dos
  transcripciones completas, extrajo fila por fila las tablas financieras principales (y, en varios
  casos, también las tablas de notas — el contenido numérico real de los documentos, que casi siempre
  supera ampliamente el par Balance/Resultado), listó toda discrepancia entre A y B, y para cada una
  renderizó la página exacta del PDF a 300-600dpi (`pdftoppm -png -r 300`) y la leyó con el tool Read
  para confirmar visualmente cuál transcripción (si alguna) tenía razón.
- **3 de los 8 PDFs elegidos originalmente rechazaron la llamada a Gemini** con
  `finishReason: RECITATION` (falso positivo de copyright de Google, ya documentado en CLAUDE.md) —
  se reemplazaron por un documento alternativo del mismo país/club antes de correr el test, sin volver
  a intentar los 3 originales.

## Resultado documento por documento

| Documento | País | Celdas comparadas | Discrepancias reales | Quién ganó |
|---|---|---|---|---|
| Levadiakos, auditoría 2024 | Grecia | ~110 | 0 | Empate — ambos perfectos |
| Aguilas Doradas, EEFF 2022 | Colombia | ~200 | 0 (un typo real del documento, replicado igual por ambos) | Empate |
| Bodø-Glimt, årsregnskap 2024 | Noruega | ~233 | 0 | Empate — ambos perfectos (el flag "escaneado" de Mistral fue una falsa alarma acá) |
| La Equidad, EEFF 2017 | Colombia | ~340 | 1 | Gemini (Mistral leyó mal una celda de bajo contraste) |
| Brann, årsregnskap 2019 | Noruega | ~320 | 1 | Mistral (Gemini "corrigió" en silencio una cifra hacia el valor de otra página, en vez de transcribir el dígito real impreso — el PDF tiene una inconsistencia real entre sus dos versiones de la misma tabla) |
| Panetolikos, EEFF 2015-16 | Grecia | ~169 | 3 (2 de Mistral, 1 de Gemini) | Ninguno — Mistral **omitió una columna entera** de 10 ratios y desalineó una tabla completa; Gemini "corrigió" una celda en silencio |
| Ituano, balanço 2022 | Brasil | ~262 filas | 5 (4 de Mistral, 1 de Gemini) | Ninguno — Mistral "corrigió" 4 typos reales del documento en vez de transcribirlos tal cual (nombre de jugador, encabezado, 2 cifras); Gemini **fabricó un número** en una celda que en el PDF está vacía |
| Ituano, balanço 2017 | Brasil | 444 valores | 6 (0 de Mistral, 6 de Gemini) | Mistral — en la tabla "resumen firmado" (pág. 21, una segunda versión del mismo balance), Gemini erró 4 dígitos completos (ej. 601.287,13 en vez de 481.287,13) e inventó una fila de subtotal que no existe en el PDF |

## El patrón real: dos formas distintas de fallar, ninguna atrapable por un tie-out

**Mistral "corrige" en silencio lo que interpreta como un error del documento**, en vez de transcribir
literalmente lo impreso — pasó en Ituano 2022 (4 veces: un nombre de jugador, un encabezado de año, 2
cifras) y es exactamente lo opuesto de lo que pide CLAUDE.md ("números exactos tal cual figuran
impresos... sin reclasificar"). Además, en Panetolikos, **Mistral se salteó contenido real** sin
ninguna marca de advertencia: una columna entera de 10 ratios de rendimiento, y desalineó las
etiquetas de una tabla de dotación de personal (fusionó dos filas en una). Ninguna de las dos fallas
rompe ningún total conocido — un chequeo de sumas no las detecta.

**Gemini, en cambio, a veces fabrica o corrige un número con la misma confianza que uno bien leído** —
el riesgo que ya señalaba `Admin/Archive/test-costo-transcripcion.md` para Mistral, pero que este test
encuentra también del lado de Gemini: fabricó un valor en una celda vacía (Ituano 2022), "corrigió" una
cifra hacia el valor de otra página en vez de transcribir el dígito real impreso (Panetolikos, Brann), y
en Ituano 2017 cometió 4 errores de dígito reales en una tabla completa (601 en vez de 481, 429 en vez
de 479, 170.000 en vez de 120.000, 76.378 en vez de 78.378) más una fila de subtotal inventada que no
existe en el documento — el caso más grave de los 8, porque si esa tabla se hubiera cargado tal cual
salió de Gemini sin verificación, habría introducido 3 números reales equivocados al sitio.

**Un detalle a favor de Gemini en campos "blandos" (no financieros)**: en Ituano 2017, frente a un CPF
tapado por una firma manuscrita, Gemini lo marcó `[ilegible]` mientras Mistral inventó un número con
formato inválido — el comportamiento que el proyecto quiere premiar (CLAUDE.md: "si es ilegible o
ambiguo, escribí `[ilegible]` en vez de adivinar"). Pero ese mismo documento es también donde Gemini
cometió sus peores errores NUMÉRICOS reales — o sea, el comportamiento "más honesto" en un campo no le
impidió alucinar con confianza en otro.

## Qué significa esto para el proyecto

1. **El DEFAULT no cambia**: seguir con Mistral primero, Gemini como segunda pasada para lo que
   Mistral marca como escaneo y amerita más cuidado (CLAUDE.md, `club-data-mapping/SKILL.md` sección
   15). Ninguno de los dos motores es sistemáticamente más confiable — cambiar el orden solo
   cambiaría CUÁL de los dos tipos de error silencioso es más probable encontrarse primero, no lo
   eliminaría.
2. **La verificación manual obligatoria para documentos escaneados (`club-data-mapping` sección 6,
   más `tools/sum-check.mjs`/`node tools/audit.js` como red de seguridad aritmética) sigue siendo
   imprescindible, con cualquiera de los dos motores.** Este test encontró errores reales de AMBOS
   motores que ningún chequeo de sumas detecta (omisión silenciosa de una columna entera, fabricación
   de un valor en celda vacía, "corrección" silenciosa de un dígito) — la única red que los atrapó fue
   la lectura humana/de Claude contra el documento fuente.
3. **Dato nuevo, no evaluado antes**: Mistral puede saltearse contenido REAL sin ninguna marca de
   advertencia (la columna de ratios de Panetolikos) — no es un caso de `[ilegible]` ni de "escaneado,
   revisar a mano", es contenido que simplemente no aparece en el `.md`. Esto es más grave que un
   dígito mal leído, porque no hay ningún indicador de que falta algo. No se investigó todavía si es
   un patrón frecuente o un caso aislado — candidato a to-do aparte si se repite en futuros
   onboardings.
4. **Confirma, con una muestra bastante más grande, la razón por la que se cerró el to-do 103 así**:
   la corrección a mano de una sesión anterior sobre "Amortización de software" de River (que
   originó el 103) también estaba mal — ningún transcriptor automático NI la revisión humana son
   infalibles solos. La combinación (dos motores + verificación manual + tie-out aritmético) es lo que
   funciona, no un solo eslabón.

## Caveats

- **n=8 no es una muestra grande** — alcanza para ver que ningún motor domina claramente y para
  encontrar 2 patrones de falla reales y distintos, pero no para calibrar una tasa de error exacta por
  motor.
- **3 de los 8 documentos elegidos originalmente rechazaron la llamada a Gemini por `RECITATION`** y se
  reemplazaron por alternativas — la tasa de rechazo (~27% de los intentos en este test) es consistente
  con el ~25% que ya documenta CLAUDE.md, y es en sí mismo un costo operativo de depender de Gemini
  (cada rechazo necesita reintento manual o caída al flujo de Claude+Tesseract).
- **La verificación fue hecha por subagentes de Claude, el mismo tipo de modelo que produce
  transcripciones con Gemini** — no es una fuente de verdad 100% independiente del tipo de error que
  se está buscando, aunque cada verificación se ancló en una lectura visual del PDF renderizado, no en
  el propio criterio del modelo sobre qué "debería" decir.

## Datos crudos

- Las 8 transcripciones de Gemini generadas para este test quedaron en
  `/private/tmp/claude-501/.../scratchpad/mistral-gemini-test/` de la sesión que corrió el test — no
  se promovieron al repo (son duplicados de la transcripción Mistral ya cargada, generados solo para
  comparar). Si se quiere reproducir el test, volver a correr
  `node tools/gemini-transcribe.mjs <copia-del-pdf>` sobre los mismos 8 PDFs (listados en la tabla de
  arriba).
- Los 8 reportes completos de verificación (con la tabla fila-por-fila y el detalle de cada render
  usado para confirmar contra el PDF) fueron generados por subagentes en la sesión del 2026-09-28 y no
  se conservan aparte — este archivo es el resumen consolidado de esos 8 reportes.
