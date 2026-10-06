> **ARCHIVADO el 2026-10-06 (to-do 109).** El test de costo y calidad de transcripción del 2026-09-26 (to-do 66), con sus datos en `Admin/Archive/test-costo-transcripcion/`. Su criterio (Mistral → Gemini → subagente) vive en `Admin/PIPELINE.md`, sección "Documentos fuente". Las rutas `Admin/test-costo-transcripcion/...` de adentro son las de antes de archivarlo.

# Test de costo/calidad de transcripción PDF→MD: Sonnet vs Haiku vs Gemini

To-do 66 de `Admin/TODO.md`, corrido el 2026-09-26. Objetivo: medir costo y calidad de transcribir
un balance financiero real a `.md` con 3 "patas" distintas, sobre 30 documentos reales del backlog
de Colombia (`Admin/inventario-pendiente.md`).

## Resumen ejecutivo

**Gemini 3.8 Flash (API directa) gana en las tres dimensiones: más barato, más rápido, y el único
con verificación independiente 10/10 perfecta.** Sonnet es el más caro y lento por lejos, pero
también salió impecable en la única señal de calidad dura que tengo para las 3 patas por igual (el
chequeo estructural de páginas). **Haiku es más barato que Sonnet en tokens de Claude, pero 4 de sus
10 documentos quedaron con páginas completas faltantes o colapsadas — a pesar de que cada subagente
reportó "transcripción completa" en su resumen final.** Ese es el hallazgo más importante del test:
el autorreporte de Haiku no es confiable.

## Metodología

- **30 PDFs** de `Clubes/Colombia/*/estados-financieros-*.pdf`, todos del mismo formato regulatorio
  (NIIF para Pymes, Colombia), elegidos por cantidad de páginas (5 a 50) y repartidos round-robin
  entre las 3 patas para que ninguna quedara con los documentos más difíciles.
- **Mismo insumo, mismo criterio para las 3**: el PDF original y la consigna de transcripción de
  CLAUDE.md ("Cada PDF nuevo") — página por página, marca `--- pág. N ---`, tablas Markdown, cifras
  exactas sin redondear, `[ilegible]` en vez de adivinar.
- **Sonnet y Haiku**: subagentes del `Agent` tool (10 c/u), corriendo con las tools normales del
  proyecto (Bash, Read, Write) — podían usar `pdftotext`, Tesseract, o mirar imágenes, a su criterio.
- **Gemini**: script propio (`Admin/test-costo-transcripcion/gemini-transcribe.mjs`), le pasa el PDF
  entero como `inline_data` a la API de `gemini-3.8-flash` en una sola llamada, sin pre-proceso.
- **Verificación independiente**: 10 subagentes más (uno por documento de Gemini), ciegos a qué pata
  generó el archivo, comparando ~9-12 cifras clave contra el PDF fuente. **Por costo, solo se hizo
  para la pata Gemini** — verificar las 20 de Sonnet/Haiku con el mismo rigor hubiera triplicado el
  costo real del test. Para Sonnet/Haiku la señal de calidad es: (a) el autorreporte del propio
  subagente transcriptor, y (b) un chequeo estructural barato (páginas del PDF vs marcas `--- pág.
  N ---` en el `.md`, y presencia de `[ilegible]`).
- **Descubrimiento a mitad del test**: los PDFs de Colombia NO son escaneos en general — tienen capa
  de texto real (`pdftotext -layout` funciona limpio). Dos documentos de Aguilas Doradas (2017 y
  2025, ambos en la pata Sonnet) resultaron ser la excepción: escaneos puros sin capa de texto. Eso
  los vuelve más caros que el resto de su propia pata — está marcado en los datos crudos, y significa
  que el promedio de Sonnet está sesgado un poco hacia arriba por esos dos.

## Resultados agregados (n=10 por pata)

| Pata | Tokens (min–max) | Tokens promedio | Costo USD promedio | Tiempo promedio | Calidad verificada |
|---|---|---|---|---|---|
| **Gemini 3.8 Flash** | 22.582–66.731 (propios) | 41.858 | **$0,092** | 64s | **10/10 documentos, ~100 cifras chequeadas, 0 discrepancias** |
| **Sonnet 5** (Claude) | 114.943–292.800 | 183.557 | ~$1,10 (estimado)¹ | 447s (7,4 min) | 10/10 páginas completas (chequeo estructural); autorreporte detallado y con hallazgos reales (corrigió una ambigüedad de OCR cruzando notas, detectó inconsistencias del documento fuente) |
| **Haiku 4.5** (Claude) | 70.304–144.318 | 91.114 | ~$0,27 (estimado)¹ | 209s (3,5 min) | **6/10 páginas completas; 4/10 con páginas faltantes o colapsadas pese a reportar "completo"** |

¹ Estimación gruesa: la notificación de uso del subagente reporta tokens totales, no el desglose
input/output, así que el costo se calculó con el promedio simple de precio input/output publicado
($2/$10 por MTok → ~$6 blended para Sonnet 5; $1/$5 → ~$3 blended para Haiku 4.5). El número real
puede variar según cuánto de esos tokens fue input (leer el PDF/OCR) vs output (escribir la
transcripción) — dirección del resultado no cambia, la magnitud exacta sí podría.

**Comparación de tokens de Claude por documento**: Gemini usa **cero tokens de Claude** — todo el
costo de esa pata lo paga la API de Google, aparte de cualquier cuota de Anthropic. Rutear un
documento a Gemini en vez de a Sonnet/Haiku ahorra el 100% de esos 70.000-290.000 tokens de Claude
por documento, a cambio de $0,03-$0,17 de costo en la cuenta de Google.

## El hallazgo de calidad: páginas faltantes en la pata Haiku

Chequeo estructural (páginas reales del PDF, según `pdfinfo`, contra marcas `--- pág. N ---` en el
`.md` producido):

| Documento (Haiku) | Páginas PDF | Marcas en el .md | Problema |
|---|---|---|---|
| Envigado 2024 | 30 | 18 | **Saltea las páginas 18 a 29 completas** (12 páginas, ~40% del documento) |
| Envigado 2023 | 46 | 39 | Saltea 3 páginas sueltas (24, 33, 38), colapsa "40-42" en una sola marca, duplica la marca de la pág. 31 |
| Atletico Bucaramanga 2017 | 21 | 18 | Saltea las páginas 18 a 20 completas |
| Alianza FC 2024 | 17 | 15 | Colapsa las páginas 15-17 en una sola marca "pág. 15-17" en vez de transcribirlas una por una |

En los 4 casos, el subagente de Haiku reportó en su resumen final que la transcripción estaba
"completa" — el autorreporte no detectó (o no comunicó) el problema. Los 6 documentos restantes de
Haiku SÍ tienen las páginas completas.

Las 10 de Sonnet y las 10 de Gemini tienen un 1:1 exacto entre páginas del PDF y marcas en el `.md`
— cero casos de este problema en esas dos patas.

**Interpretación**: no es que Haiku "OCR peor" — varios de sus documentos completos salieron con
buena calidad de tabla. El problema es de **seguimiento de instrucciones en documentos largos**: en
4 de 10 casos perdió el hilo de "transcribir TODO, página por página" a mitad de un documento de 17+
páginas, sin darse cuenta ni avisarlo.

## Qué significa esto para el uso real del proyecto

1. **Para transcribir el backlog de 2047 PDFs** (`Admin/inventario-pendiente.md`), Gemini vía
   `Admin/test-costo-transcripcion/gemini-transcribe.mjs` es la opción más barata, más rápida, y la
   que salió con mejor calidad verificada en este test. Es standalone (corre desde terminal, sin
   sesión de Claude) — ver el script para el uso exacto.
2. **Haiku no es un reemplazo confiable de Sonnet para este trabajo tal como está planteado hoy** (un
   subagente que hace todo el proceso solo, sin verificación por fuera). Si se quisiera usar Haiku
   para bajar costo de Claude, haría falta un paso de verificación estructural barato (justamente el
   chequeo de páginas de esta sección) ANTES de confiar en el resultado — algo que hoy el proyecto no
   hace de forma automática.
3. **Sonnet no mostró errores de completitud**, y su autorreporte incluyó hallazgos genuinos
   (correcciones de ambigüedad cruzando notas, detección de inconsistencias del documento fuente) que
   ni Haiku ni el chequeo de Gemini reportaron con ese nivel de detalle — para el caso de que la
   fidelidad narrativa/de contexto importe más que el costo.

## Caveats (para no sobre-interpretar)

- **n=10 por pata no es significancia estadística formal** — es una muestra piloto que alcanza para
  ver una diferencia grande y clara (que es lo que salió), pero no para calibrar la magnitud exacta
  ni detectar diferencias chicas.
- **La verificación con cifras cruzadas contra el PDF solo se hizo para Gemini** (10/10 documentos,
  ~100 cifras). Para Sonnet y Haiku la señal es más débil (autorreporte + chequeo estructural de
  páginas) — es posible que haya errores de cifras puntuales en Sonnet/Haiku que este test no
  detectó, aunque la completitud estructural sí se verificó en las 3 patas por igual.
- **El costo de Sonnet/Haiku es una estimación**, no una medición exacta (ver nota ¹ arriba).
- **2 de los 10 documentos de Sonnet resultaron ser escaneos** (Aguilas Doradas), distinto al resto
  del cluster — sesga el promedio de Sonnet un poco hacia arriba, aunque no cambia la conclusión
  (sigue siendo la pata más cara por un margen grande).

## Datos crudos

- `Admin/test-costo-transcripcion/resultados.jsonl` — las 10 corridas de Gemini (tokens propios de la
  API, costo, tiempo).
- `Admin/test-costo-transcripcion/resultados-claude.jsonl` — las 20 corridas de Sonnet/Haiku (tokens
  de Claude reportados por el harness, tool_uses, tiempo).
- `Admin/test-costo-transcripcion/verificaciones.jsonl` — las 10 verificaciones independientes de la
  pata Gemini.
- `tools/gemini-transcribe.mjs` — el script standalone para correr la pata Gemini fuera de una sesión
  de Claude Code, sin gastar tokens de Claude (promovido de `Admin/test-costo-transcripcion/` a
  `tools/` el 2026-09-26, con modo `--all` para procesar en lote sin tipear rutas — ver Versión 245 en
  `Admin/CHANGELOG.md`). La API key vive en `Admin/gemini/.env` (gitignoreada).
- Los 30 `.md` resultantes quedaron cargados de verdad en `Clubes/Colombia/<Club>/estados-financieros-
  <año>.md`, al lado de su PDF — son transcripciones reales y utilizables para onboarding, no solo
  artefactos del test (salvo los 4 de Haiku con páginas faltantes, que necesitan una pasada de
  corrección antes de usarse para cargar datos).
