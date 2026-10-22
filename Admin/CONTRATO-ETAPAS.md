<!-- md: qué archivo lee y escribe cada etapa del pipeline, qué lo deja viejo y con qué comando se rehace | leer: antes de tocar algo que pasa de una etapa a otra (un arreglo local a una etapa no lo necesita) -->
# Contrato entre etapas del pipeline

Cada etapa le pasa a la siguiente un archivo, no una llamada. Esta página dice cuáles, quién los deja viejos y cómo se rehacen. Qué hace cada etapa por dentro: `Admin/PIPELINE.md`. Verificado contra el código el 2026-10-22 (los tres casos de abajo).

## Dónde viven los archivos

- Un documento = `Clubes/<País>/<Club>/<doc>.pdf` y su transcripción `<doc>.md`. Nada más va ahí.
- Todo lo que una tool deriva del documento = `Generados/<País>/<Club>/<doc><sufijo>`, mismo nombre base. La ruta la arma una sola función (`derivado()` de `tools/rutas.mjs`); ninguna tool arma la suya.
- En `Generados/` se trackean los `.json` (son el caché que hace que un club cargado vuelva a cerrar igual: la IA de localizar y extraer no es determinista; regla en `.gitignore`); las transcripciones derivadas (`.previo-*.md`, `.mistral-redo.md`) quedan locales. El comentario de `rutas.mjs` que dice que todo `Generados/` está gitignoreado es viejo.
- Lo que cruza documentos: la cola (`Admin/registros/cola-revision.jsonl`), el registro de estado (`transcripciones-estado.jsonl`, lo recalcula `estado.mjs`), los ajustes manuales (`ajustes-manuales.jsonl`, los escribe `tools/ajustes.mjs`) y las respuestas aprendidas de la cola (`categorias-aprendidas.jsonl`). Un solo proceso a la vez escribe el registro (`tools/candado.mjs`).

## Numeración

Esta página y `PIPELINE.md` numeran 1 a 9. Dos textos del código usan otra: `cargar.mjs` y `caja-deuda.mjs --partir` dicen «etapa 5» para la categorización (acá es la 7), y `lote.mjs` imprime pasos 1/5 a 5/5. Cuando un mensaje dice «etapa 5» y habla de `.categorias.json`, es la 7.

## Las etapas

| # | Etapa y comando | Lee | Escribe | Queda viejo cuando | Se rehace con |
|---|---|---|---|---|---|
| 1 | Conseguir (a mano) | — | el PDF | — | — |
| 2 | Transcribir: `pipeline.mjs` (Mistral) | PDF | `<doc>.md`, registro de estado | — (el `.md` es la raíz de todo) | `pipeline.mjs` sobre ese documento |
| 3 | Localizar: `localizar.mjs` | `.md`, ajustes (perímetro, estado) | `.ubicacion.json` (con `mdSha1` y el perímetro que usó) | cambia el `.md` (`mdSha1`) o el ajuste de perímetro | `lote.mjs --rehacer` (fuerza la IA) o solo, si el caché está viejo y el año no está cargado |
| 4 | Validar: `validar-bloques.mjs` | `.md`, `.ubicacion.json` | `.validacion.json` (con `mdSha1`) | cambia el `.md`; se mira por `mdSha1` o, sin huella, por fecha | `lote.mjs` rehace SOLO esta etapa si está vieja |
| 5 | Extraer: `extraer.mjs` | `.md`, `.ubicacion.json` | `.filas.json` (con `mdSha1` y `ubicacionSha1`) | cambia el `.md` (y alguna fila ya no está en su línea) o la localización (`ubicacionSha1`) | `lote.mjs --rehacer`, o solo si está vieja y el año no está cargado |
| 6 | Verificar: `verificar.mjs` (gratis) | `.filas.json`, `.validacion.json`, `.ubicacion.json`, ajustes, cola, el `.verificacion.json` de los años vecinos | `.verificacion.json` (con `scriptHuella`); con `--rubros`, también `.rubros.json`; casos a la cola | cambia una entrada, un ajuste o una respuesta de la cola; `scriptHuella` distinta avisa en `cargar.mjs`, no frena | `node tools/verificar.mjs --lista <lista> --rubros`; `lote.mjs` la corre (gratis) sobre los documentos que extrajo |
| 7 | Categorizar: `glosar-rubros.mjs`, `jev-categorizar.mjs`, `categorizar-claude.mjs --listos` | `.rubros.json`; `.jev.json` | `.jev.json` (con `rubrosHuella`); `.categorias.json` (con `rubrosHuella` y `jevHuella`) | cambia la lista de rubros (`huellaRubros`) o las respuestas de Jev (`huellaJev`) | `jev-categorizar.mjs --listos --lista <lista>` y después `categorizar-claude.mjs --listos --lista <lista>` |
| 8 | Cargar: `cargar.mjs <pdf> --desde-verificacion` (`--reemplazar` si el año ya está; `--escribir` para escribir) | `.verificacion.json`, `.categorias.json`, `.validacion.json`, `.filas.json`, `.ubicacion.json`, el club, ajustes, la cola | `data/<país>/<id>.json` (la fuente; al escribirlo, `club-json.mjs` genera el `-data.js` que carga el sitio), la evidencia en `Admin/carga-clubes/`; con `--lista`, el `.carga.json` (la propuesta) | frena si falta o no está al día algo de lo de la izquierda | `cargar.mjs` otra vez; `cargar-lote.mjs` escribe lo que quedó listo |
| 9 | Publicar: `generadores.mjs` (los corre `cargar.mjs`), `publicar.mjs` | el JSON del club | rankings, páginas, índices, listas de prueba; corre `audit.js` y revierte lo suyo con P0 o P1 | — | `node tools/publicar.mjs` |

## La cadena de huellas (qué dispara qué)

```
.md ──mdSha1──► .ubicacion.json ──ubicacionSha1──► .filas.json
.md ──mdSha1──► .validacion.json
.filas.json + .validacion.json + ajustes + cola ──► .verificacion.json ──(--rubros)──► .rubros.json
.rubros.json ──rubrosHuella──► .jev.json ──jevHuella──► .categorias.json  (también guarda rubrosHuella)
```

- Una etapa rehace su salida cuando la huella de su entrada no coincide o falta; nadie borra nada a mano (`tools/huellas.mjs`, `tools/cache-al-dia.mjs`).
- `node tools/huellas.mjs --documento "<pdf>"` imprime las huellas de un documento, las guardadas y si cada etapa está al día. Primer comando cuando una carga frena con «no está al día».
- Cambiar un ajuste que mueve filas (`fila`, `incluye`, `desglose`) cambia la salida de verificar, o sea `.rubros.json`, o sea las huellas de 7: hay que volver a correr 6, 7 y 8, en ese orden.
- Un documento cuyo año ya está en el sitio no pasa por 3 a 7 en `lote.mjs` (dice «ya en el sitio»), ni con `--rehacer`; solo `--reintentar` o una línea «testigo <pdf>» en la lista lo toca.

## Tres casos verificados contra el código

1. **`caja-deuda.mjs --personal --club <id> --partir --escribir`** (`tools/caja-deuda.mjs`, `partirFilaGlobal`, hacia las líneas 1386 a 1403). Cadena que corre sola: `ajustes.mjs --agregar` (escribe `ajustes-manuales.jsonl`) → `verificar.mjs --lista <lista> --rubros` (aplica el ajuste `fila`, reescribe `.verificacion.json` y `.rubros.json`) → `jev-categorizar.mjs --listos --lista` → `categorizar-claude.mjs --listos --lista` (las filas nuevas) → `cargar.mjs <pdf> --desde-verificacion --reemplazar --escribir` por año. La lista intermedia es `Generados/_cache/partir-lista.txt`. Si se saltea la 6 o la 7, `cargar.mjs` frena con «el .categorias.json NO está al día» (`cargar.mjs`, línea 384). Si frena, el mensaje trae los cuatro comandos a mano.
2. **`cargar.mjs <pdf> --desde-verificacion`**. Primero las compuertas de lectura (existe el `.md`; `.categorias.json` existe y `categoriasAlDia`; la validación al día, la misma `validacionAlDia` de `lote.mjs`), después club y año, período, estadio y sponsor, categorías, y recién con `--escribir` modifica `data/<país>/<id>.json`, corre los generadores y `audit.js`, y revierte todo si da P0 o P1 (`publicarCambios`). Sin `--escribir` es un ensayo y no toca el sitio (así lo usa `medir-cargar.mjs`). Prueba de las huellas: `huellas.mjs --documento` sobre Liverpool 2021-22 da `OK` en las cinco y «categorías al día: sí».
3. **`lote.mjs --rehacer`**. Fuerza la IA de 3 (localizar), 4 (validar) y 5 (extraer) aunque el caché esté al día; verificar (6) corre después, gratis, sobre lo que se extrajo; no toca un año cargado (ver arriba). Sin `--ejecutar` es un ensayo con costo. El camino contrario, `--reintentar`, es solo para errores: categorías en 0 o un desglose que no suma.
