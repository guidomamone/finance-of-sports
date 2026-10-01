# HANDOFF: de un PDF a un año cargado en el sitio

Este es el único documento que hace falta leer para retomar el pipeline.

- La historia (qué se probó, cuándo, con qué números) está en `Admin/CHANGELOG.md`.
- El HANDOFF largo anterior está entero en `Admin/Archive/HANDOFF-pipeline-hasta-2026-10-01.md`.
- Qué hace cada tool está explicado en la cabecera de su propio archivo.

---

## El objetivo

Que un PDF de un club llegue solo hasta el año cargado en el sitio:

- sin gastar tokens de sesión (todo en scripts que corre Guido en su terminal),
- barato en dólares de API,
- sin errores en los números.

Lo que no se puede resolver solo va a una **cola humana**, con instrucciones exactas para que Guido lo mire.

---

## Dónde estamos

**Por elegir un nuevo club.**

- Último documento: Universidad Católica (Cruzados) 2025. Cargado en los datos del sitio, commiteado en la rama, sin push.
- Espera a Guido: publicar (merge de la rama a `main` y push).
- Quedó para otra sesión: que la página lea `fiscalYearMeta.sinDesglose` y muestre "No declarado" donde un renglón no está desglosado.
  Hoy UC 2025 muestra "Salarios / Ingresos 0%" porque los sueldos están adentro del costo de ventas.

**Próximo paso:**

- Elegir el próximo documento (ver "Cómo arranca la próxima sesión").
- Diseño por aprobar: precedente de categoría con contexto (etiqueta + renglón que desglosa).
- Agregar CLP, EUR, DKK y GBP al script de series oficiales.

---

## Cómo trabajamos (reglas de Guido)

- **Antes de cambiar una tool, mostrar el diseño en pocas líneas y esperar el ok.** No escribir código antes.
- **Un cambio por vez.** No mezclar varios arreglos en una tanda.
- **Nada de "manta corta":** si un arreglo resuelve un caso, medirlo en todos los documentos que se pueda. Si rompe otros, no entra.
- **Dos caminos, no más reglas:**
  - camino limpio: reglas pocas y estrictas; si todo cierra sin interpretar nada, se carga solo;
  - camino de dudas: lo que no pasa no se "arregla" con otra regla; se le pregunta a la IA algo puntual con cita del documento, y si tampoco
    alcanza, va a la cola humana.
- **Antes de proponer un comando:** qué etapa toca, para qué sirve y cuánto cuesta (primero el ensayo, que es gratis).
- **Los comandos que gastan API los corre Guido** en su terminal, con `caffeinate -i`. La sesión mira los resultados en `Generados/` y `Admin/`.
- **Ejemplos concretos:** club, año, fila, importe, antes y después. Mirar el caso antes de afirmar una causa. Explicar las siglas.
- **Páginas:** decir siempre las dos, "página N del visor (impreso M al pie)".
- **Cola humana:** preguntas concretas de sí o no, nunca exploratorias. Decirle exactamente qué abrir: "abrí el PDF en la página N del visor; en el .md, líneas X-Y; fijate si...".
- **Arreglar en los scripts, nunca a mano.**
- **Git:** rama `inventario-transcripciones`. No cambiar de rama, no mergear a `main`, no hacer push (cada push a `main` es un deploy; lo hace
  Guido). Commitear el código separado de los logs de los lotes. Una entrada en el CHANGELOG por cada cambio real.
- **No editar `.claude/skills/`** sin proponerle el texto a Guido.
- **`Admin/TODO.md`:** leerlo del disco antes de tocarlo (otra sesión lo edita).
- Cada tool lleva cabecera y comentarios largos.

---

## El proceso nuevo

Los comandos:

```bash
node tools/lote.mjs --lista Admin/lote-02.txt                               # ensayo: qué haría y cuánto cuesta (gratis)
caffeinate -i node tools/lote.mjs --lista Admin/lote-02.txt --ejecutar      # de verdad (lo corre Guido)
node tools/cola.mjs                                                         # la cola humana
node tools/estado.mjs                                                       # el tablero de todos los PDFs (gratis)
```

`lote.mjs` corre las etapas 3 a 8 sobre una lista chica. Lo que ya está hecho no se repite (se guarda en `Generados/`).

### 1 Conseguir

- a) Se encuentra el documento oficial y se guarda en `Clubes/<País>/<Club>/`.
  - Tools: `exa-search.mjs`, `wayback-cdx.mjs`, `wayback-verify-download.mjs`, `reddit-archive-search.mjs`, `twitterapiio-search.mjs`.
- b) Llega roto (un HTML con extensión .pdf, o cortado): `estado.mjs` lo lista en la etapa 1 con el archivo de `fuentes/` a reabrir.

Riesgos:
- i) un documento que no es del club, del año o del perímetro;
- ii) el mismo documento bajado dos veces con nombres distintos.

Mitigaciones:
- i) las fuentes no oficiales se guardan sin publicar; el año se lee del contenido (`periodo.mjs`), no del nombre;
- ii) falta: detectar duplicados por huella del archivo.

### 2 Transcribir

- a) PDF digital (tiene texto propio): Mistral transcribe; el texto propio del PDF queda como segunda fuente gratis para la etapa 4.
- b) PDF escaneado: Mistral lo marca como escaneo; no hay segunda fuente gratis.
- c) PDF con texto roto (letras sin sentido en vez del texto real): se detecta solo y se trata como escaneo.
- Tools: `mistral-ocr-transcribe.mjs`, `check-transcripcion-fidelidad.js` (corre solo), `reparar-pdf.mjs`.

Riesgos:
- i) en un escaneo, Mistral puede inventar un número con la misma seguridad que uno bien leído;
- ii) se saltea o resume una página.

Mitigaciones:
- i) la etapa 4 confirma cada número contra una fuente independiente;
- ii) `check-transcripcion-fidelidad.js` revisa páginas faltantes y bloques resumidos.

### 3 Localizar

- a) `indice-bloques.mjs` (gratis) arma una ficha de cada tabla o bloque de texto con cifras: página, líneas del .md, título de arriba,
  primeras y últimas filas.
- b) `localizar.mjs` (IA, ~US$ 0,05) ve las fichas y elige: los bloques del estado de resultados, las notas de ingresos y de gastos, la
  escala, la moneda, las columnas y el perímetro.
- c) Si el documento no tiene estado de resultados (memoria sola, dictamen), queda como fuente.

Riesgos:
- i) elige el balance, un presupuesto u otro perímetro;
- ii) el índice parte un estado en dos o pierde un renglón suelto.

Mitigaciones:
- i) la etapa 6 lo frena si no cierra; sus dudas van a la cola;
- ii) el índice tolera huecos chicos entre filas y marca "continúa" cuando un bloque sigue al anterior.

### 4 Validar

- a) PDF digital: cada número de los bloques elegidos se busca en el texto propio de su página. Gratis.
- b) Escaneo: Gemini lee la imagen de esa página (si la rechaza, Claude). ~US$ 0,003 por página.
- Tool: `validar-bloques.mjs`.

Riesgos:
- i) Mistral y Gemini leen mal el mismo dígito borroso;
- ii) el número está en la página pero en otra columna.

Mitigaciones:
- i) las sumas de la etapa 6;
- ii) el chequeo de año anterior y de año vecino.

### 5 Extraer

- a) `extraer.mjs` (IA, ~US$ 0,07) recibe solo los bloques elegidos, con cada línea numerada.
- b) Devuelve las filas tal cual: etiqueta, importe, año anterior, tipo (renglón, subtotal, total, resultado), lado (ingreso, gasto,
  financiero, impuesto), qué renglón del estado desglosa cada fila de nota, y la escala de cada bloque.
- c) No suma, no convierte, no categoriza.

Riesgos:
- i) lado o tipo equivocados;
- ii) una fila de nota pegada al renglón equivocado.

Mitigaciones:
- i y ii) la etapa 6 lo frena si no cierra.

### 6 Verificar

- a) Notas: reemplazan a su renglón solo si suman. Se lee la estructura impresa: qué subtotal suma qué, cuadros de detalle que no se suman
  dos veces, subtotales impresos arriba de sus componentes.
- b) Resultado: ingresos − gastos ± financiero ± impuesto tiene que dar el resultado impreso.
- c) Año anterior cargado: la columna del año anterior contra lo que tiene el sitio.
- d) Año vecino: si el documento del año siguiente ya pasó por extraer, su columna "año anterior" tiene que coincidir.
- e) Redondeo: si solo falta menos de media unidad por fila, se agrega una fila "Diferencia de redondeo".
- Tool: `verificar.mjs` (gratis, sin IA: un modelo de lenguaje no sirve para verificar sumas).

Riesgos:
- i) dos errores que se compensan;
- ii) un club sin año vecino para comparar.

Mitigaciones:
- i) segundo chequeo (año vecino; falta: un número citado en el texto del documento);
- ii) va a la cola.

### 7 Categorizar

- a) Precedente del club → Jev (si la confianza es 0,90 o más) → Claude por API (0,80 o más).
- b) Lo que queda debajo de 0,80 no se carga solo: va a la cola.
- Tools: `glosar-rubros.mjs`, `jev-categorizar.mjs`, `categorizar-claude.mjs`, `memoria-categorias.mjs`. ~US$ 0,03 por documento.

Riesgos:
- i) categoría equivocada con sumas correctas (nada lo delata).

Mitigaciones:
- i) el primer año automático de cada club lo revisa Guido (decisión pendiente: ¿siempre?).

### 8 Cargar

- a) `cargar.mjs --desde-verificacion`: carga solo lo que la etapa 6 dejó en "ok". Tipo de cambio, liga y fuente con página.
- b) Club nuevo: `alta-club.mjs`, en el mismo commit que su primer año.
- c) Después corre `audit.js`; si da un error grave, revierte solo.
- Hoy en el lote es solo propuesta: no escribe el sitio.

Riesgos:
- i) el documento declara varios tipos de cambio;
- ii) el documento no declara y la moneda no está en el archivo de series (CLP, EUR, DKK, GBP).

Mitigaciones:
- i) si están en una tabla con una fecha por columna, gana la fecha más nueva; si no (frase, años sueltos, activo y pasivo), a la cola;
- ii) se agrega la moneda al script de series oficiales; mientras tanto, frena.

### 9 Publicar

- Commit local, un commit por año cargado. El push lo hace Guido.

### Cola humana

- Archivo: `Admin/cola-revision.jsonl`. Se lee con `node tools/cola.mjs`.
- Cada caso es una **pregunta de sí o no**, con la propuesta del sistema, la página del visor y la impresa, y las líneas del .md.
- Guido contesta con `node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club --nota "..."`.
- Para fijar la categoría de una fila sin que haya un caso: `node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."`.
- La próxima corrida toma la respuesta.
- Qué entra: números no confirmados que no cierran, totales o resultado que no cierran, año vecino distinto, primer año sin vecino, dudas de
  localizar y de extraer que afectan la carga, y filas con categoría menor a 0,80 (etapa 8).
- Una respuesta de categoría queda como precedente del club para los años siguientes (`Admin/categorias-aprendidas.jsonl`).
- Falta: que otras respuestas (convenciones de un grupo de países) se vuelvan regla.

---

## Decisiones

Tomadas por Guido:

1. Una fila categorizada con confianza menor a 0,80 no se carga sola: va a la cola.
2. Un total de ingresos o gastos que el documento no imprime se acepta si cierra con el resultado, y se busca un segundo chequeo.
3. Un total que cierra solo por redondeo lleva una fila "Diferencia de redondeo".
4. Una diferencia de una unidad entre dos tablas (UC: 1.790.062 contra 1.790.063) no va a la cola.
5. Tipo de cambio: si el documento declara el suyo, **gana el del documento**; si declara varios en una tabla, el de la fecha más nueva (puede que el club acceda a una cotización mejor que la de
   mercado). El promedio entre apertura y cierre es solo para presupuestos.
6. Si el documento no declara tipo de cambio: la cotización de cierre del **archivo de series oficiales** (`tools/fx-reference/`, bajado de
   cada banco central). Nunca una cotización dada por Claude. Si la moneda no está en el archivo, se agrega al script que baja las series,
   desde su fuente oficial (faltan CLP, EUR, DKK y GBP).

Pendientes, a decidir con casos reales:

- ¿El primer año automático de cada club pasa siempre por la cola?
- ¿Dónde ver la cola? Hoy es un archivo que se lee con `cola.mjs`.
- Retirar el proceso viejo de las etapas 3 a 5 (~10 tools): cuando el proceso nuevo haya cargado bien algunos documentos.

---

## Lo que falló en los tests o no entró

- **Elegir filas por palabras clave** (la etapa vieja): reproduce los ingresos ya cargados en 7-11% de los años. Por eso existe el proceso nuevo.
- **Localizar por páginas enteras:** descartado; un estado puede empezar a mitad de página.
- **Una sola escala por documento:** descartado; la nota puede estar en miles y el estado en unidades (1. FC Köln).
- **Escala por "plausibilidad" contra otros años del club:** inútil con inflación y años en otra moneda (Racing).
- **Heurística de encabezados para el tipo de cambio:** 4 errores en 17 documentos. Se saca.
- **Cierre de notas sumando todo** (la versión vieja de `verificar.mjs`): contaba dos veces los cuadros de detalle (UC, Betis, Athletic) y
  aceptaba notas que no cerraban por la tolerancia de 0,5% (Chapecoense).
- **No construido todavía:** duplicados de PDF por huella; número citado en el texto como segundo chequeo; que una respuesta de la cola se vuelva
  regla; ordenar la cola por impacto; reabrir solo el sourcing de un PDF roto; series oficiales de CLP, EUR, DKK y GBP.

---

## Trampas

- `git status` se ensucia solo mientras Guido corre lotes (logs en `Admin/`, `.md` en `Clubes/`): revisar antes de commitear.
- `estado.mjs` mientras corre un lote muestra una foto a mitad de camino.
- Los "Syntax Error" en la terminal son de poppler leyendo PDFs dañados: no son errores del pipeline.
- Para esperar un proceso en segundo plano, usar su PID, no `pgrep -f` (se encuentra a sí mismo y no termina nunca).
- Corridas largas: la Mac se duerme; usar `caffeinate -i`.
- El proceso viejo (`pipeline.mjs --repreparar`) pisa el `.rubros.json` que deja `verificar.mjs`: no re-preparar documentos que pasaron por el
  proceso nuevo.

---

## Cómo arranca la próxima sesión

1. `git status` y `git log --oneline -5` en la rama `inventario-transcripciones`.
2. `node tools/estado.mjs`.
3. Leer este HANDOFF (nada más hace falta para el pipeline).
4. `node tools/cola.mjs` para ver qué está esperando a Guido.
5. Seguir por "Próximo paso" de la sección "Dónde estamos".
