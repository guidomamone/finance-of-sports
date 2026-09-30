# Mapa de las herramientas (`tools/`)

Escrito el 2026-09-30 a pedido de Guido ("quiero entender qué js hay"). Es un mapa para entender, no una referencia técnica: cada
archivo explica en su propia cabecera cómo se usa.

## Qué son los archivos `.mjs`, `.js` y `.sh`

Todos son programas de **JavaScript** que corre **Node** (un programa que ejecuta JavaScript fuera del navegador). Se corren siempre igual:
`node tools/<nombre>` desde la carpeta del proyecto. No hay diferencia práctica para vos:
- `.mjs` = JavaScript "moderno" (módulos). `.js` = JavaScript clásico. Es una cuestión de cómo está escrito por dentro.
- `.sh` = un script de terminal (no JavaScript), solo hay uno: `video-transcript-fetch.sh`.

Ninguno gasta tokens de Claude Code. Los que llaman a una API (Mistral, Gemini, Claude por API, Jev) gastan dólares de la cuenta de cada una.

## El camino de un PDF hasta el sitio

```
 CONSEGUIR EL PDF ──► TRANSCRIBIR ──► VALIDAR ──► PREPARAR ──► CATEGORIZAR ──► CARGAR Y PUBLICAR
   (sourcing)         a .md          que sea        tablas,        Jev            (etapa 5,
                                     fiel           sumas                          en construcción)
```

## Lo que corrés vos (el resto lo llaman estos)

| Comando | Para qué |
|---|---|
| `node tools/pipeline.mjs --ejecutar --limit 50` | **El comando principal**: de PDF a "listo para Jev" + categorización con Jev. |
| `node tools/pipeline.mjs --resumen` | Cómo está el inventario, sin correr nada. |
| `node tools/jev-categorizar.mjs --backtest --limit 0` | Test de confiabilidad de Jev contra lo ya cargado. |
| `node tools/proponer-carga.mjs --backtest` | Mide si un script puede reconstruir ejercicios cargados (etapa 5, versión 0). |
| `node tools/audit.js` | Auditoría de todo el proyecto (0 P0/P1 = sano). |

## 1. Conseguir el PDF (sourcing)
- `exa-search.mjs`, `reddit-archive-search.mjs`, `twitterapiio-search.mjs`: búsquedas en la web, Reddit y X.
- `wayback-cdx.mjs`, `wayback-verify-download.mjs`: recuperar y verificar documentos desde Wayback Machine.
- `video-transcript-fetch.sh`: bajar la transcripción automática de un video de YouTube.
- `fetch-club-league-reference.mjs`, `fetch-brand-color-reference.mjs`, `fetch-fx-reference.mjs`, `resolve-wikipedia-season-page.mjs`: bajan **una vez** datos de referencia (ligas, colores, tipos de cambio) a carpetas locales.

## 2. Transcribir a `.md`
- `mistral-ocr-transcribe.mjs` (motor barato, entrega tablas), `gemini-transcribe.mjs` (segunda voz barata; rechaza ~1 de 4 por copyright), `claude-api-transcribe.mjs` (el desempate: caro, sin bloqueos).
- `check-transcripcion-fidelidad.js`: detecta transcripciones con bloques resumidos o páginas faltantes.
- `test-motores.mjs`, `compare-transcripts.mjs`: comparar motores entre sí (el primero fue el test de los 3 motores).

## 3. Validar (que los números sean los del PDF)
- `verify-numbers.mjs`: compara los números del `.md` con el texto interno del PDF, gratis.
- `inventario-transcripciones.mjs`: el **registro** (`Admin/transcripciones-estado.jsonl`): quién hizo cada `.md`, en qué estado está.
- `resolver-inventario.mjs`: la fase paga; Gemini y Claude solo ven las páginas con números que los chequeos gratis no respaldan; manejo de crédito agotado.
- `paginas-con-numeros.mjs`: qué páginas tienen cifras de carga (el resto es prosa y no se valida). Gratis.
- `chequeos-gratis.mjs`: valida gratis cada página con el texto del PDF, las sumas, el año anterior cargado y el balance; `--prueba` repite la medición.

## 4. Preparar (gratis)
- `extract-table-rows.mjs`: saca las tablas del `.md`. `sum-check.mjs`: chequeo de sumas contra el total impreso.
- `suggest-category-precedent.mjs`: si un rubro ya se categorizó antes en ese club, lo sugiere.
- `prepare-onboarding.mjs`: corre las tres de arriba y deja un `briefing.json`.
- `lookup-fx-close.js`, `lookup-club-league.js`, `lookup-brand-color.js`: consultan **localmente** (sin internet) los datos que bajaron los `fetch-*`.

## 5. Categorizar
- `jev-categorizar.mjs`: le pide a Jev la categoría de cada rubro (con lado y ejemplos parecidos); `--backtest` mide su confiabilidad.
- `categorizar-claude.mjs`: lo que Jev deja < 0,90 va a Claude por API, una llamada por documento, con lo ya cargado del club; deja `<md>.categorias.json`.
- `filas-rubro.mjs`: descarta filas que no son rubros y deduce el lado (ingreso/gasto); lo usa `pipeline.mjs`.
- `vocabulario.mjs`: EL vocabulario contable en 29 idiomas (título de estado de resultados, ingresos, gastos, impuestos, resultado, total, flujo de efectivo, cambios en el patrimonio, balance, columna de notas) y la única normalización del texto (`normalizar()`). Lo usan `pipeline.mjs`, `extract-table-rows.mjs`, `filas-rubro.mjs` y `proponer-carga.mjs`. `node tools/vocabulario.mjs "texto"` dice qué conceptos encuentra; `--cobertura`, qué idioma falta en qué concepto. Medición: `Admin/test-vocabulario.md`.

## 6. Cargar y publicar
- `proponer-carga.mjs`: qué filas cargaría (elige la nota que abre cada línea del estado de resultados, `--tabla ancla-listas`); solo mide, no escribe nada del sitio.
- `alta-club.mjs`: club nuevo (entrada de `data/clubs.js`, moneda, cierre, tipo de cambio, liga); propone por defecto, `--escribir` solo sin preguntas abiertas.
- `alta-claude.mjs`: las preguntas del alta a Claude por API, con cita del documento que el script verifica. `altas-registro.mjs`: el registro `Admin/altas-club.jsonl` (lo lee `pipeline.mjs --resumen`).
- `carpetas-clubes.mjs`: la única regla "¿de qué club es esta carpeta de Clubes/?" (la usan onboard, el registro, alta-club y audit.js).
- `huellas.mjs`: si un `.jev.json` / `.categorias.json` sigue correspondiendo a su entrada; si no, se rehace.
- `periodo.mjs`: qué período cubre un documento (anual calendario / temporada, trimestral, semestral...), leído del contenido; `--grupos` junta los parciales.
- `revisar-reservas.mjs`: decide con sumas las páginas "con reserva" de documentos ya resueltos.
- `rutas.mjs`: dónde vive cada archivo generado (`Generados/<País>/<Club>/`, al lado de nada en `Clubes/`); todas las tools la usan.
- `gasto.mjs`: cuánto se gastó por motor, día y documento, y qué se pagó y ya no está en disco. Gratis.
- `generate-club-index.js`, `generate-fuentes-page.js`, `generate-fuentes-index.js`, `generate-rankings.js`, `generate-como-corre-stats.js`: regeneran páginas y tablas derivadas de los datos. Nunca se editan a mano sus resultados.
- `audit.js` (+ `audit-ignore.json`): la auditoría.
- `outreach-send.js`: manda los mails aprobados a clubes (Resend).

## 7. Los que orquestan
- `pipeline.mjs`: **el que usás**. Encadena 1 a 5 de arriba para cada PDF.
- `onboard.mjs`: el orquestador anterior (Mistral + Gemini + comparación). Ya no es el camino principal, pero sigue siendo el que resuelve "a qué club y año corresponde este PDF" y "¿ya está cargado en el sitio?" (lo usan los demás).

## Los archivos que dejan (para saber dónde mirar)

| Archivo | Qué es |
|---|---|
| `Admin/transcripciones-estado.jsonl` | El registro por PDF: motor, estado, `listo-para-jev`/`sin-rubros`, reservas. Se regenera solo. |
| `Admin/transcripciones-verificaciones.jsonl` | Historial de cada validación (se le agregan líneas, nunca se borra). |
| `Generados/.../<doc>.rubros.json` | Lista de rubros del documento para Jev (todos los derivados viven en `Generados/`, misma ruta que el documento en `Clubes/`). |
| `<md>.jev.json` | Categoría y confianza que devolvió Jev por rubro. |
| `<md>.briefing.json` | Tablas y chequeo de sumas del documento. |
| `<md>.previo-*.md` | El `.md` anterior, guardado cuando una herramienta lo reemplazó. |
| `Admin/test-*.md` | Informes de cada test (motores, Jev, carga). |
