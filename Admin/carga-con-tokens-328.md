# To-do 328: cargar con tokens de sesión, paso a paso (propuesta para el ok de Guido)

Docs 1, 2026-10-20 (rehecho con las 4 tools del 328 ya en main). **No se editó ninguna skill.** Abajo: (1) lo que se averiguó leyendo, (2) el texto exacto de lo
que se agregaría a `club-or-year-onboarding` (un renglón en `SKILL.md` y un archivo nuevo `carga-con-tokens.md`, como `club-nuevo.md`), (3) lo que queda por mirar
y (4) lo que no probé. Fuentes: `Admin/PIPELINE.md` (etapas 3 a 8, ajustes manuales, cola), `tools/lote.mjs`, `localizar.mjs`, `extraer.mjs`, `cache-al-dia.mjs`,
`huellas.mjs`, `armar-a-mano.mjs`, `jev-categorizar.mjs`, `categorizar-claude.mjs`, `memoria-categorias.mjs`, `cargar.mjs`, `cola.mjs`, `ajustes.mjs`, y los archivos
reales de Alianza FC 2023 (corrida paga) y de Aris 2022 (carga con tokens del 2026-10-14, commit `fed4a72584`, el único precedente de punta a punta).

---

## 1. Qué se averiguó

**Qué reemplaza la sesión y qué no.** Las etapas pagas son localizar (3, `.ubicacion.json`), extraer (5, `.filas.json`), Jev y Claude de la etapa 7 (`.jev.json`,
`.categorias.json`), `primer-anio-ia` (6, escalón 3) y el escalón con IA de caja y deuda. Transcribir (2), validar (4: gratis en un PDF digital, ~US$ 0,003 por
página en un escaneo), verificar (6), cargar (8) y la cola son gratis o ya las hace la sesión.

**Por qué alcanza con escribir los archivos.** `lote.mjs` no repite lo que ya está en `Generados/`, y el ajuste manual `filas-a-mano` protege la ubicación y las
filas aunque se corra con `--rehacer`. De lo escrito a mano el script revisa la coherencia: la huella del `.md` (`mdSha1`), que cada fila siga en su línea con su
importe, y después `verificar.mjs`, que suma las filas contra el resultado impreso y el año anterior ya cargado.

**Cómo queda reproducible.** Los dos `.json`, el ajuste `filas-a-mano` (`Admin/registros/`) y las categorías que contesta la sesión (que entran a
`Admin/registros/categorias-aprendidas.jsonl`) están trackeados. Una corrida futura de la API llega a lo mismo porque el ajuste bloquea el `--rehacer`; para
rehacerlo de verdad hay que anularlo a conciencia (`ajustes.mjs --agregar … filas-a-mano --valor no`).

**Las huellas que el script compara** (las calculan las tools nuevas; la sesión no las escribe):

| Huella | Dónde vive | Qué compara |
|---|---|---|
| `mdSha1` | `.ubicacion.json`, `.filas.json`, `.validacion.json` | el sha1 del `.md` de hoy |
| `ubicacionSha1` | `.filas.json` | la ubicación de la que salieron las filas |
| `rubrosHuella` | `.jev.json`, `.categorias.json` | la lista de rubros que dejó `verificar.mjs` |
| `jevHuella` | `.categorias.json` | las respuestas del `.jev.json` |

Si una etapa dice «no al día», `node tools/huellas.mjs --documento "<pdf>"` (gratis, solo lectura) imprime las huellas del documento.

---

## 2. Texto exacto propuesto

### 2.1 `club-or-year-onboarding/SKILL.md`: un renglón nuevo, después de «b) Mejorar un script» (sección 3)

> ### c) Cargar con tokens de sesión
>
> Si Guido pide cargar «con tokens» (sin localizar, extraer, Jev ni Claude por API), el procedimiento está en `carga-con-tokens.md`, en esta carpeta: la sesión escribe la
> especificación de las filas y las respuestas de categoría, y las tools arman los archivos y corren el resto. No edita `tools/`: lo que falte va a
> `Admin/registros/frenados-por-script.jsonl`.

### 2.2 `club-or-year-onboarding/carga-con-tokens.md` (archivo nuevo)

> # Cargar con tokens de sesión
>
> **Cuándo.** Guido lo pide («con tokens», presupuesto de API en cero), o una etapa paga falló en un documento y rehacerla no vale. Reemplaza localizar, extraer, Jev,
> Claude de la etapa 7 y `primer-anio-ia`. No reemplaza transcribir, validar, verificar, cargar ni la cola. Se lee el `.md` (la transcripción), nunca el PDF. Si un
> número no se lee con seguridad, no se inventa: se deja afuera y va a `dudas` de la especificación, con su línea.
>
> **Antes.** El `.md` está transcripto y validado (`node tools/estado.mjs`). El club tiene los ajustes que el lote exige antes de localizar: `cierre` del documento y
> `perimetro` si trae consolidado e individual (`node tools/antes-de-localizar.mjs --lista <lista>` lo dice, gratis). La lista es `Admin/lotes/lote-NN.txt`, con el
> número que da la principal.
>
> **1. Los bloques.** `node tools/indice-bloques.mjs "<pdf>" --json` (gratis) da cada tabla con su id (`b3`), página y líneas. Leé con `Read` (offset y límite) las líneas
> del estado de resultados y de las notas que desglosan ingresos y gastos. Elegí qué bloques son el `estado`, las `notas_ingresos` y las `notas_gastos`. Qué elegir y qué
> no: las reglas de `SYSTEM` en `tools/localizar.mjs` (no el balance, ni el flujo, ni presupuestos, ni conciliaciones de impuestos, ni cuadros por jugador; un cuadro por
> segmento solo si la columna de un segmento abre un renglón que nadie más abre).
>
> **2. La especificación y los dos archivos.** Escribí la especificación en un JSON del scratchpad de la sesión (ruta entera, nunca `/tmp`). Los campos están en la
> cabecera de `tools/armar-a-mano.mjs`: ids de bloques, escala de cada bloque con la frase impresa, moneda, columnas, perímetro, y las filas (`bloque`, `linea`,
> `etiqueta`, `actual`, `anterior`, `tipo`, `lado`, `detalla_a`) con los importes TAL CUAL impresos, más los totales y el resultado impresos. No se suma, no se convierte, no
> se categoriza; todas las filas con importe, en orden. Después:
> ```
> node tools/armar-a-mano.mjs <especificacion.json>              ensayo: valida cada fila contra el .md y dice qué escribiría
> node tools/armar-a-mano.mjs <especificacion.json> --escribir   escribe .ubicacion.json y .filas.json (con sus huellas) y el ajuste filas-a-mano
> ```
> El ensayo frena con la lista de problemas (fila fuera de su línea, bloque no elegido, `detalla_a` que no es etiqueta de otra fila, falta una escala); se corrige la
> especificación y se repite. No se escriben los `.json` a mano.
>
> **3. Verificar (gratis).** `node tools/verificar.mjs "<pdf>" --rubros`. Tiene que cerrar: los renglones suman el resultado impreso, el año anterior coincide con el
> cargado, los desgloses suman. Si no, se corrige la especificación y se vuelve a armar, o se resuelve con un ajuste (`fila`, `desglose`, `resultado-final`, `escala`,
> `categoria`, `incluye`) o con la cola. Deja el `.verificacion.json` y el `.rubros.json` (rubro, lado, página, sección): la lista que se categoriza.
>
> **4. Jev, desde la sesión.** `node tools/jev-categorizar.mjs --listos --desde-sesion <jev.json> --lista <lista>`, con
> `{"pdf":"<pdf>","respuestas":[{"label":"<etiqueta del .rubros.json>","choice":"<categoría>","confidence":0.5}]}`: UNA respuesta por cada rubro único del `.rubros.json` (si
> falta uno o una categoría no existe, no escribe nada y dice cuáles). Se contesta con confianza **0,5**, por debajo del 0,90 con que se acepta a Jev: así la decisión de
> cada rubro la toma el paso 5, donde se mira el `.md` y queda registrada.
>
> **5. Claude, desde la sesión.** Primero `node tools/categorizar-claude.mjs --listos --dry-run --lista <lista>`: dice cuántos rubros van a «Claude» (el resto lo decide el
> precedente del club, gratis). Esos se contestan con **el `.md` a la vista**, uno por uno, con la skill `club-data-mapping` (muchos: un subagente Sonnet por club, sin
> Bash, con las líneas del `.md` y el `.rubros.json`). Después:
> `node tools/categorizar-claude.mjs --listos --desde-sesion <claude.json>` con
> `{"pdf":"<pdf>","respuestas":[{"label":"<etiqueta>","categoria":"<categoría>","confianza":0.9,"motivo":"<una frase>"}]}`. Si falta un rubro que quedaba para Claude, no
> escribe nada y dice cuáles. **La confianza es real:** lo que se conteste con 0,80 o más entra a `Admin/registros/categorias-aprendidas.jsonl` y es precedente del club
> para todos sus años (con 0,90 o más decide solo); lo dudoso se contesta por debajo de 0,80, y va a la cola. Una fila que no es un rubro se resuelve en la cola
> (`cola.mjs --corregir-categoria … no_es_rubro`), no acá.
>
> **6. El lote, sin API.** Ensayo: `node tools/lote.mjs --lista Admin/lotes/lote-NN.txt` (gratis). Después, en segundo plano:
> `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --sin-api` (con `--cargar` si todo queda listo). `--sin-api` corre todo lo gratis y frena,
> documento por documento, donde llamaría a una API: lo ya escrito por la sesión sigue de largo. Dos frenos se resuelven acá: **el primer año de un club**
> (`node tools/primer-anio-ia.mjs --lista <lista> --exportar <carpeta del scratchpad>`, lo contesta un subagente, y `--importar <carpeta>`) y las **categorías que
> faltan** (volver al paso 4 o 5). La cola la contesta un subagente, como siempre.
>
> **7. Antes de dar el año por bueno.** La propuesta de `cargar.mjs` sin motivos de freno; ingresos, gastos y resultado contra lo impreso; `?audit=1` en el sitio;
> `node tools/audit.js --quiet` en 0 P0 y 0 P1. **En el primer uso de `--sin-api`, mirar a mano la etapa 7 y el primer año** (qué decidió el precedente, qué se contestó
> con qué confianza, qué quedó en la cola).
>
> **Qué queda registrado:** el ajuste `filas-a-mano`, los dos `.json`, las líneas nuevas de `categorias-aprendidas.jsonl`, las respuestas de la cola, la evidencia
> `Admin/carga-clubes/<club>.md` (la escribe `cargar.mjs`) y el mensaje del commit, que dice «con tokens de sesión».
>
> **Si algo no se puede sin tocar `tools/`:** una línea en `Admin/registros/frenados-por-script.jsonl` y se sigue con el resto.

---

## 3. Qué queda por mirar

- **Jev a 0,5.** Las respuestas de Jev desde la sesión van con confianza 0,5 para que no decidan solas. Es lectura mía de las cabeceras (Jev ≥ 0,90 se acepta directo, sin
  pasar por Claude ni por la memoria); si Pipeline prefiere otra convención (por ejemplo, que `--desde-sesion` de Jev nunca sea escalón 1), el paso 4 cambia.
- **La memoria de aprendidas.** Cada respuesta del paso 5 con 0,80 o más pasa a ser precedente del club en todos sus años. Se contesta con el `.md` a la vista, y
  cuando hay duda, por debajo de 0,80.
- **Primer uso real.** `--sin-api` no se usó todavía en un documento real: la primera vez, revisar la etapa 7 y el primer año (paso 7).

## 4. Lo que no probé

- **Nada de esto se corrió de punta a punta.** Es lectura de las cabeceras y del código de las 4 tools (`armar-a-mano.mjs`, `huellas.mjs --documento`, `--desde-sesion` de Jev
  y de Claude, `lote.mjs --sin-api`) y del precedente de Aris 2022. No armé una especificación real ni corrí el ensayo sobre un documento (no hay uno pendiente que lo
  justifique; las tools no se importan para chequear). El primer documento que se cargue con este texto es la prueba.
- No leí el cuerpo completo de `lote.mjs --sin-api`: el texto del paso 6 sale de la cabecera y de los avisos que imprime (`frena (--sin-api): …`).
