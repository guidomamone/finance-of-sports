# HANDOFF: el pipeline de PDF a club cargado (sesión del 2026-09-29 y 2026-09-30)

Documento para que una sesión NUEVA de Claude Code entienda dónde quedó este trabajo sin leer el historial. Escrito por la sesión
anterior a pedido de Guido. Leé esto, después `Admin/MAPA-DE-TOOLS.md` (qué es cada archivo de `tools/`) y las entradas de
`Admin/CHANGELOG.md` desde la Versión 305 (todas las decisiones y los bugs, con causa raíz). Después `CLAUDE.md`, `Admin/ESTADO.md` y
`Admin/TODO.md` (to-do 108) como siempre.

## Estado de git (importante)

- Todo está en la rama **`inventario-transcripciones`** (13 commits por delante de `main`, ninguno subido). `main` local a su vez está unos
  50 commits por delante de `origin/main` (sesiones anteriores tampoco subieron). **No se hizo ningún push**: cada push necesita permiso
  explícito de Guido, y subir a `main` dispara un deploy de Netlify (plan gratis, ~25 deploys por mes).
- `git status` se ensucia mientras Guido corre lotes: los logs de `Admin/*/resultados.jsonl`, `Admin/transcripciones-*.jsonl` y varios `.md`
  de `Clubes/` cambian solos. Revisá antes de commitear y no mezcles.

## Lo que Guido quiere (léelo antes de proponer nada)

1. **Un solo comando** de punta a punta: `node tools/pipeline.mjs --ejecutar --limit 50 --concurrencia 4`. Que termine con el club cargado
   cuando el club ya exista y no haya rubros nuevos que necesiten criterio de Claude "por prosa". Hoy llega hasta Jev (etapa 5).
2. **No gastar tokens de sesión**: lo repetible va en scripts que él corre en su terminal. Gastar dólares de API (Mistral, Gemini, Claude
   por API, Jev) está bien: las cuentas tienen recarga automática. Cuando pide ver resultados, que sea con un resumen compacto (le pega el
   bloque `RESULTADO de esta corrida`), no volcados enteros.
3. **Pilotos para cazar bugs antes de gastar de más**: cada lote de 50 encontró bugs nuevos. Los arreglos van al script, no a mano.
4. **No categorizar rubros vos (Claude) en la sesión.** Eso lo hace Jev; lo dudoso lo resuelve Claude por API, y lo abierto va a
   `Admin/dudas-por-club.md` o a una ficha de revisión.
5. Aceptado por Guido: confianza de Jev >= 0,90; subir un club-año con solo el total de ingresos; los documentos `sin-rubros` quedan como fuente.
6. **Comentarios en el código** que expliquen qué hace cada cosa (para sesiones nuevas). Cada herramienta tiene una cabecera larga: mantenela.

## Cómo funciona (resumen; el detalle está en la cabecera de `tools/pipeline.mjs`)

`pipeline.mjs` -> regenera el registro (`inventario-transcripciones.mjs`) -> elige documentos -> `resolver-inventario.mjs` (transcribe y
valida) -> `prepare-onboarding.mjs` (tablas, sumas, rubros) -> `jev-categorizar.mjs --listos` (categorías). Estados de un PDF:
`sin-md`, `sin-tablas`, `pendiente-segunda-voz`, `revisar`, `reintentar`, `no-es-pdf`, `listo`, `listo-para-jev`, `sin-rubros`, `cargado`.
Registro por PDF: `Admin/transcripciones-estado.jsonl` (se regenera); historial: `Admin/transcripciones-verificaciones.jsonl` (solo se agrega).
Cada página reemplazada queda registrada con su motor (`proveniencia`); el `.md` reemplazado queda en `<nombre>.previo-*.md` (gitignoreado).

## Números medidos (para no volver a medirlos)

- Test de 3 motores (15 PDFs): Claude por API 15/15 sin bloqueos, ~$0,016/pág.; Gemini rechazó 7/15 por copyright (5 de 6 escaneos); Mistral ~$0,004/pág.
- Costo real de los lotes: piloto de 44 = $13,99 (~$0,32/doc); lote de 50 = $9,41; segundo lote de 50 = $11,58. Estimar ~$0,25 a $0,35 por documento.
- Inventario (3.358 PDFs en `Clubes/`): 316 ya cargados en el sitio; ~1.150 sin ningún `.md`; ~680 escaneos pendientes de segunda voz; ~500 a revisar.
- Jev, backtest sobre 3.975 rubros ya cargados (`Admin/test-jev-resultados*.md`): sin ayuda 69,5%; con lado 74,2%; lado + 8 ejemplos 86,6% (95,9% en la banda >= 0,90);
  con ejemplos solo de otros clubes (club nuevo) 83,0% (94,4%). Errores restantes: catch-alls (`admin_general_expense` <-> `other_expenses`) y convenciones de cada club.
- Los `.md` viejos: 82% (778 de 954) no tienen tablas; ~42% de los que tienen texto en el PDF tienen cifras mal leídas.
- Carga automática (`tools/proponer-carga.mjs --backtest --mistral-fresco`, 40 ejercicios cargados): arma propuesta 88%; detecta el total de ingresos oficial 14%; dinero
  bien ubicado por categoría 67% ingresos / 60% gastos. **Todavía NO es viable dejarla escribir.**

## Qué falta (en orden)

1. **Detectar los totales impresos de forma robusta** (hoy 14%): por el chequeo de sumas de cada tabla y no por palabras de la etiqueta; elegir con más cuidado la tabla y la
   columna del ejercicio. Volver a medir con el backtest. Recién con ~90% vale la pena la carga automática.
2. **Etapa 6 (cargar)**: la especificación completa (esquema de `data/<club>-data.js`, reglas mecánicas, lo que requiere criterio, orden de regeneración y trampas) la dejó un
   subagente el 2026-09-30; los puntos clave están en el to-do 108 de `Admin/TODO.md`. Reglas: solo un año nuevo de un club existente; tipo de cambio con `tools/lookup-fx-close.js`
   (LOCAL, no internet); si algo requiere criterio, frenar y dejar una FICHA en `Admin/revision/<club>-<año>.md` que diga exactamente qué mirar (páginas, filas, precedente
   del año anterior, secciones de las skills). Preguntas cerradas (¿a qué categoría va este rubro?) por API de Claude; lo abierto por sesión con la ficha.
3. **Rubros con Jev < 0,90**: derivarlos a Claude por API con contexto del club (el piso 3 del to-do 99).
4. **Escritura en `data/`** con reversión automática si `audit.js` (0 P0/P1) o `auditAll()` fallan. Commit local; el push es de Guido.
5. Ideas de herramientas gratis todavía no hechas (las propuso la sesión anterior; ninguna está construida): fecha del ejercicio leída del CONTENIDO del PDF contra el nombre del
   archivo (los nombres con fechas ya mintieron una vez); tablas exactas desde el texto del PDF (`pdftotext -bbox` o `pdfplumber`) para los PDFs con texto; comparar la columna
   comparativa del año N con lo cargado del año N-1; detectar consolidado o individual por palabras clave y por el alcance del año anterior; balance (activo = pasivo + patrimonio) y
   aritmética del estado de resultados; clasificador local (TF-IDF + kNN sobre los 3.975 rubros) como segunda opinión gratis de Jev; duplicados de PDF por hash; un `tools/gasto.mjs`
   que sume el gasto por API desde los `resultados.jsonl`.

## Trampas que ya costaron tiempo

- Los `Syntax Error` de la terminal son de poppler (pdftotext/pdfinfo) leyendo PDFs dañados; están silenciados. `qpdf` devuelve 3 = éxito con advertencias; 2 = PDF dañado (cae a
  `pdfseparate`/`pdfunite`). Un ".pdf" puede ser un HTML (estado `no-es-pdf`).
- `onboard.mjs --all` también salta los documentos con briefing al día; el registro usa `ONBOARD_IGNORE_BRIEFING=1` para saber qué está cargado de verdad.
- Nombres de archivo con fecha ISO (`...-2025-12-31.pdf`) se leían como el año 2012: ya corregido en `guessYear()`; hay que seguir desconfiando del año que sale del nombre.
- Documentos de más de 40 páginas: Gemini y Claude van por tramos de 20; los de más de 100 páginas quedan para el final (`--max-paginas 0` los incluye).
- No editar `.claude/skills/*/SKILL.md` sin proponerle el texto a Guido y esperar su ok (regla de memoria del proyecto).
- Un motor que devuelve menos páginas que las pedidas ya no falla el documento: se reparte el lote en mitades.

## Cómo retomar

```bash
cd ~/Claude/Projects/finance-of-sports && git switch inventario-transcripciones
node tools/pipeline.mjs --resumen                       # estado del inventario, sin gastar nada
node tools/pipeline.mjs --limit 50                      # ensayo del próximo lote (estimación de costo, sin API)
node tools/pipeline.mjs --ejecutar --limit 50 --concurrencia 4 2>&1 | grep -v "^Syntax"   # lo corre Guido
```
