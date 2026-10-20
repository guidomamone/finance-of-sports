# To-do 328: cargar con tokens de sesión, paso a paso (propuesta para el ok de Guido)

Docs 1, 2026-10-20. **No se editó ninguna skill.** Abajo: (1) lo que se averiguó leyendo, (2) el texto exacto de lo que se agregaría a `club-or-year-onboarding`
(un renglón en `SKILL.md` y un archivo nuevo `carga-con-tokens.md`, como `club-nuevo.md`), (3) lo que no se puede hacer hoy sin tocar `tools/` (frenados para
Pipeline) y (4) lo que no probé. Fuentes leídas: `Admin/PIPELINE.md` (etapas 3 a 8, ajustes manuales, cola), `tools/lote.mjs`, `localizar.mjs`, `extraer.mjs`,
`cache-al-dia.mjs`, `huellas.mjs`, `respuestas-cache.mjs`, `memoria-categorias.mjs`, `categorizar-claude.mjs`, `jev-categorizar.mjs`, `cargar.mjs`, `cola.mjs`,
`ajustes.mjs`; los archivos reales de Alianza FC 2023 (corrida paga) y Aris 2022 (carga con tokens del 2026-10-14, commit `fed4a72584`); y los commits de Onboarding 5
de hoy (Lierse Kempenzonen, Alianza FC, La Louvière), que fueron todos con las etapas pagas. **El único precedente real de carga con tokens es Aris 2022**
(y Torino, Inter, Lazio, Salernitana y Ferroviária con `filas-a-mano`); el procedimiento sale de ahí y del código.

---

## 1. Qué se averiguó

**Qué reemplaza la sesión y qué no.** De las etapas del pipeline, las pagas son localizar (3, `.ubicacion.json`), extraer (5, `.filas.json`), Jev y Claude de la
etapa 7 (`.jev.json`, `.categorias.json`), `primer-anio-ia` (6, escalón 3) y el escalón con IA de caja y deuda. Transcribir (2), validar (4: gratis en un PDF digital,
~US$ 0,003 por página en un escaneo), verificar (6), cargar (8) y la cola son gratis o ya las hace la sesión. Con tokens se reemplazan los archivos de 3 y 5, la
categorización de 7 y el primer año; el resto corre con el mismo `lote.mjs`.

**Por qué alcanza con escribir los archivos.** `lote.mjs` no repite lo que ya está en `Generados/`: si existe el `.ubicacion.json`, `localizar` devuelve «hecho» sin
llamar a la API; lo mismo `extraer` con el `.filas.json`. Y el ajuste manual `filas-a-mano` (`tools/ajustes.mjs`) protege los dos archivos aunque se corra con
`--rehacer`. Lo que el script revisa de lo escrito a mano es solo su coherencia: la huella del `.md` (`mdSha1`), que cada fila siga en su línea con su importe
(`cache-al-dia.mjs`), y después `verificar.mjs`, que suma las filas contra el resultado impreso y el año anterior ya cargado.

**Cómo queda reproducible.** El script de una corrida futura llega a lo mismo porque los dos archivos y el ajuste `filas-a-mano` están trackeados (`Generados/**/*.json`
y `Admin/registros/`), y porque las categorías decididas quedan como precedente del club en `Admin/registros/categorias-aprendidas.jsonl`, también trackeado. Para
rehacerlo de verdad con la API hay que anular el ajuste a conciencia (`ajustes.mjs --agregar … filas-a-mano --valor no`).

**Cuatro huellas que el script compara** (y qué pasa si no coinciden):

| Huella | Dónde vive | Qué compara | Si no coincide |
|---|---|---|---|
| `mdSha1` | `.ubicacion.json`, `.filas.json`, `.validacion.json` | el sha1 del `.md` de hoy | `lote.mjs` rehace (y paga) un año sin cargar; en uno cargado, solo avisa |
| `ubicacionSha1` | `.filas.json` | la ubicación de la que salieron las filas (bloques, columnas, escala, perímetro) | sin ella, vale la fecha: la `generado` de la ubicación no puede ser posterior a la de las filas |
| `rubrosHuella` | `.jev.json`, `.categorias.json` | la lista de rubros que dejó `verificar.mjs` | Jev y Claude rehacen su salida (pagan) |
| `jevHuella` | `.categorias.json` | las respuestas del `.jev.json` | `cargar.mjs` frena («categorías no al día») |

---

## 2. Texto exacto propuesto

### 2.1 `club-or-year-onboarding/SKILL.md`: un renglón nuevo, después de «b) Mejorar un script» (sección 3)

> ### c) Cargar con tokens de sesión
>
> Si Guido pide cargar «con tokens» (sin localizar, extraer, Jev ni Claude por API), el procedimiento está en `carga-con-tokens.md`, en esta carpeta. La sesión arma a mano
> los archivos de esas etapas, los protege con el ajuste `filas-a-mano`, y el resto del pipeline (validar, verificar, cargar) corre igual. No edita `tools/`: lo que
> falte va a `Admin/registros/frenados-por-script.jsonl`.

### 2.2 `club-or-year-onboarding/carga-con-tokens.md` (archivo nuevo)

> # Cargar con tokens de sesión
>
> **Cuándo.** Guido lo pide («con tokens», presupuesto de API en cero), o una etapa paga falló en un documento y rehacerla no vale. Reemplaza localizar, extraer, Jev,
> Claude de la etapa 7 y `primer-anio-ia`. No reemplaza transcribir, validar, verificar, cargar ni la cola. Se lee el `.md` (la transcripción), nunca el PDF; si un
> número no se lee, no se inventa: va a `dudas` con su línea.
>
> **Antes.** El `.md` está transcripto y su etapa 2 validada (`node tools/estado.mjs`). El club tiene los ajustes que el lote exige antes de localizar:
> `cierre` del documento y `perimetro` si trae consolidado e individual (`node tools/antes-de-localizar.mjs --lista <lista>` lo dice, gratis). La lista del lote es
> `Admin/lotes/lote-NN.txt` con el número que da la principal.
>
> **1. Los bloques.** `node tools/indice-bloques.mjs "<pdf>" --json` (gratis) da cada tabla con su id (`b3`), página y líneas. Leé con `Read` (offset y límite) las líneas
> del estado de resultados y de las notas que desglosan ingresos y gastos. Elegí: `estado` (ids), `notas_ingresos`, `notas_gastos`, la escala de cada bloque con la frase
> impresa que la dice, la moneda, los encabezados de la columna del ejercicio y del año anterior, y el perímetro. Reglas de qué bloques elegir y cuáles no: las de
> `tools/localizar.mjs` (SYSTEM): no el balance, ni el flujo, ni presupuestos, ni conciliaciones de impuestos, ni cuadros por jugador; un cuadro por segmento solo si la
> columna de un segmento abre un renglón que nadie más abre.
>
> **2. `Generados/<País>/<Club>/<doc>.ubicacion.json`.** Campos (todos):
> ```
> pdf, md                     rutas relativas al repo
> mdSha1                      el sha1 del .md: `shasum "<md>"` (el primer campo)
> modelo                      "a mano (Claude Code, sesión AAAA-MM-DD)"
> generado                    ISO; igual o anterior al de las filas
> bloques                     { "b3": {"pagina": 11, "lineas": [433, 455], "tipo": "tabla"}, ... }  (solo los elegidos; salen del índice)
> sin_estado                  false
> estado, notas_ingresos, notas_gastos      listas de ids
> escala, escala_evidencia    unidades | miles | millones, y la frase impresa con su línea
> moneda, columna_ejercicio, columna_anterior, perimetro (individual | consolidado)
> necesito_ver [], dudas []   observaciones   "Armado a mano (tokens de sesión): <qué se eligió y por qué>"
> ```
> Si el documento no tiene estado y las notas hacen de estado, además `estadoDesdeNotas: true` (cada nota es una fila del estado con el TÍTULO de la nota como
> etiqueta; ver `PEDIDO_NOTAS_COMO_ESTADO` en `localizar.mjs`).
>
> **3. `Generados/<País>/<Club>/<doc>.filas.json`.** Mismos `pdf`, `md`, `mdSha1`, `modelo`, `generado`, más:
> ```
> salida "a mano"
> ubicacion { estado, notas_ingresos, notas_gastos }                    (copia de la de arriba)
> escalas [ {bloque, escala, evidencia}, ... ]                          (una por bloque; pueden ser distintas)
> filas [ {bloque, linea, etiqueta, actual, anterior, tipo, lado, detalla_a}, ... ]
> total_ingresos {linea, actual}  total_gastos {linea, actual}  resultado {linea, actual, anterior}     (null si no están impresos)
> dudas []  observaciones
> ```
> Por fila (las reglas de `tools/extraer.mjs`): `etiqueta` y los importes TAL CUAL están impresos (puntos, comas, paréntesis, signo), `anterior` null si no hay
> columna; `linea` = la del `.md` donde está la fila (1 = primera); `tipo` = renglon | subtotal | total | resultado; `lado` = ingreso | gasto | financiero | impuesto |
> resultado | otro; `detalla_a` = la etiqueta EXACTA del renglón que esa fila de nota desglosa, o null si es del estado. No se suma, no se convierte, no se categoriza.
> Todas las filas con importe, en orden. **Cada fila tiene que seguir en su línea:** la línea citada tiene el comienzo de la etiqueta (12 letras) o el importe, y el
> importe está en esa línea o en las 3 siguientes; si no, el lote declara el caché viejo y lo rehace pagando. No escribas `ubicacionSha1` (no hay cómo calcularlo sin
> importar una tool: ver el frenado 1); alcanza con que la `generado` de la ubicación no sea posterior a la de las filas. Si no hay forma de leer una fila con
> seguridad, se deja afuera y va a `dudas` con su línea.
>
> **4. Protegerlo.** `node tools/ajustes.mjs --agregar "<pdf>" filas-a-mano --motivo "Claude <fecha> (tokens de sesión, pedido de Guido): ubicación y filas armadas a mano
> desde el .md" --evidencia "<doc>.md L<desde>-L<hasta>"`. Sin este ajuste, un `--rehacer` o una relocalización pisa los dos archivos y paga.
>
> **5. Verificar (gratis).** `node tools/verificar.mjs "<pdf>" --rubros`. Tiene que cerrar: los renglones suman el resultado impreso, el año anterior coincide con el
> cargado, los desgloses suman. Si no cierra, se corrigen las filas (nunca `tools/`) o se resuelve con un ajuste (`fila`, `desglose`, `resultado-final`, `escala`,
> `categoria`, `incluye`) o con la cola. Esto deja el `.verificacion.json` y el `.rubros.json` (label, lado, página, sección, valores): es la lista que se categoriza.
>
> **6. Categorías sin API.** `node tools/categorizar-claude.mjs --listos --dry-run --lista <lista>` dice, por documento, cuántos rubros van a Claude («N a Claude»); el resto
> lo resuelve el precedente del club (gratis). Para esos N: decidí la categoría con `club-data-mapping` (muchos: un subagente Sonnet por club, sin Bash) y registrala como
> precedente del club con **una línea por fila en `Admin/registros/categorias-aprendidas.jsonl`**:
> ```
> {"ts":"<ISO>","club":"<id del club o su slug>","year":"2023","lado":"revenue|expense","label":"<etiqueta tal cual del .rubros.json>","padre":"estado","glosa":null,"categoria":"<categoria de data/category-map.js>","confianza":1,"motivo":"<una frase>","jevDecia":null,"jevConf":null,"modelo":"claude-code (sesión)","md":"Clubes/<País>/<Club>/<doc>.md"}
> ```
> `padre` es `"estado"` si la `section` del rubro no dice «desglosa», y si dice `nota que desglosa "X"`, es `X`. Repetí el `--dry-run` hasta que diga 0 a Claude. Jev
> cuesta centavos por documento; si Guido dijo cero, el frenado 2 lo cubre. Una fila que no es un rubro (`no_es_rubro`) o que va a otra categoría que la del precedente se
> resuelve en la cola (`cola.mjs --corregir-categoria`), no acá.
>
> **7. Primer año de un club.** Si `verificar` deja `primerAnio.estado = pendiente`, no corras `lote.mjs --ejecutar` (preguntaría a Claude por API): `node tools/primer-anio-ia.mjs
> --lista <lista> --exportar <carpeta del scratchpad>` arma los pedidos; los contesta un subagente y `--importar <carpeta>` los guarda como si fueran de la API.
>
> **8. Correr el lote.** Ensayo: `node tools/lote.mjs --lista Admin/lotes/lote-NN.txt`. Tiene que decir localizar y extraer «ya hecho», sin costo, y ninguna etapa con
> dólares salvo la validación de un escaneo. Recién ahí, `--ejecutar` (y `--cargar` si todo queda listo). La cola la contesta un subagente, como siempre.
>
> **9. Antes de dar el año por bueno.** La propuesta de `cargar.mjs` sin motivos de freno; ingresos, gastos y resultado contra lo impreso; `?audit=1` en el sitio;
> `node tools/audit.js --quiet` en 0 P0 y 0 P1.
>
> **Qué queda registrado:** el ajuste `filas-a-mano`, los dos `.json`, las líneas de `categorias-aprendidas.jsonl`, las respuestas de la cola, la evidencia
> `Admin/carga-clubes/<club>.md` (la escribe `cargar.mjs`) y el mensaje del commit, que dice «con tokens de sesión».
>
> **Si algo no se puede sin tocar `tools/`:** una línea en `Admin/registros/frenados-por-script.jsonl` y se sigue con el resto.

---

## 3. Frenados para Pipeline (lo que hoy hay que hacer a mano y debería ser una tool)

1. **Armar los dos archivos desde una especificación.** Hoy se escriben a mano dos JSON de decenas de filas, con el `sha1` por `shasum`, sin `ubicacionSha1` y con la
   regla de la línea de cada fila controlada recién al correr el lote. Propongo `tools/armar-a-mano.mjs` (gratis): recibe una especificación corta (ids de bloques, escalas,
   filas con etiqueta, línea, importes, tipo, lado, `detalla_a`), valida contra el `.md` que cada fila esté en su línea con su importe, escribe `.ubicacion.json` y
   `.filas.json` con las dos huellas bien calculadas, y agrega el ajuste `filas-a-mano`. (Esto además ahorraría los minutos que hoy pierde cada sesión.)
2. **La etapa 7 sin API.** Hoy se registra la categoría a mano en `categorias-aprendidas.jsonl` (un registro que escriben las tools) y, si Guido dice cero API, hay que
   sembrar además `Generados/_cache/jev.jsonl` a mano (no está trackeado). Propongo `--desde-sesion <archivo>` en `jev-categorizar.mjs` y `categorizar-claude.mjs`: un JSON
   de respuestas de la sesión que escriben `.jev.json` y `.categorias.json` con sus huellas, sin llamar a nadie, y que registran el origen («sesión»).
3. **No hay forma de calcular `ubicacionSha1` y `rubrosHuella` desde la línea de comandos.** `cache-al-dia.mjs` y `huellas.mjs` son bibliotecas sin CLI. Un
   `node tools/huellas.mjs --documento "<pdf>"` que imprima las huellas de un documento resolvería esto y el punto 1.
4. **`lote.mjs --ejecutar` no tiene un modo «sin API».** Si queda un rubro sin categoría o un primer año pendiente, el lote paga sin avisar antes. Propongo `--sin-api`: corre
   todo lo gratis y frena con un mensaje donde hoy llamaría a la API.

---

## 4. Lo que no probé

- **Nada de esto se corrió.** Es lectura del código y de los archivos de Aris 2022 y de Alianza FC 2023; no armé un documento de punta a punta (no hay uno pendiente que lo
  justifique y las tools no se importan para chequear). El primer documento que se cargue con este texto es la prueba; los puntos más riesgosos son el 3 (la regla de la
  línea de cada fila) y el 6 (la clave de `categorias-aprendidas.jsonl` y el `padre`: se comprueba con el `--dry-run`, que tiene que dar 0 a Claude).
- No verifiqué qué hace `jev-categorizar.mjs --listos` si no hay clave de Jev y todos los rubros están en la caché; por eso el texto dice «centavos» y no promete cero.
- `ubicacionSha1` ausente: el código lo trata por fecha (`ubicacionAlDia` en `cache-al-dia.mjs`), pero no corrí `lote.mjs` sobre un `.filas.json` sin la huella. Aris 2022
  se cargó así y la carga salió, por eso lo propongo.
