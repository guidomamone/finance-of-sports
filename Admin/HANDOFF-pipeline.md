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

**UC 2010-2017: listos para el reintento y la carga** (lote 06).

- Cargados (commiteados, sin push): UC 2018-2025.
- UC 2016: verificado; respuesta de categoría ya dada. UC 2017: reintento por "cuotas sociales en 0".
- UC 2010-2014: con la escalera de lecturas cierran (lectura 3); perímetro individual ya contestado por Guido; 2011 con fecha deducida.
- UC 2015: PDF híbrido (los estados son imágenes): lo toma el escalón 1 de la etapa 2 con `--reintentar` (~US$ 0,26 de Mistral + 0,15).
- UC 2009: descartado (PDF de una sola página escaneada).
- Espera a Guido: publicar (merge de la rama a `main` y push; `main` ya tiene 49 commits sin pushear, que salen juntos).
- Quedó para otra sesión: que la página lea `fiscalYearMeta.sinDesglose` y muestre "No declarado" (hoy ningún año cargado lo usa).
- Encontrado por el subagente del perfil, en datos ya publicados (sin tocar): Almagro tiene "Sede Social - Medrano 522" como cuotas sociales;
  Grêmio, "Receitas Patrimoniais" como cuotas sociales; Vitória, Bahia y América Mineiro tienen socios en sus documentos y no en el sitio.

**Próximo paso:**

- Correr `caffeinate -i node tools/lote.mjs --lista Admin/lote-06.txt --ejecutar` (verificación con la escalera; gratis salvo categorización)
  y después `--reintentar` (2017 por los socios, 2015 para re-transcribir).
- Ojo: la escalera de la etapa 6 vive en verificar.mjs, que usa lote.mjs (el proceso nuevo). pipeline.mjs (el proceso viejo) no la usa.
- Escaleras: construidas la de la etapa 2 (escalón 1) y la de la 7; dibujadas todas en su etapa. Falta: escalón 2 de la etapa 2 (Gemini en
  escaneos enteros) y que las etapas 4 y 8 registren en qué escalón salió cada dato.

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
- d) **Escalera** (escalón 1 construido; el 2 todavía no):

```
 ESCALÓN 0  la transcripción que hay ──────── ¿localizar encuentra el estado de resultados? sí → sigue
 ESCALÓN 1  si no, la transcripción no es de Mistral y el PDF tiene páginas interiores en imagen
            → re-transcribir con Mistral y volver a localizar (con --reintentar) ── ¿lo encuentra? sí → sigue
 ESCALÓN 2  (falta) escaneo entero → Gemini sobre las páginas candidatas
 nada → queda como fuente (memoria, dictamen, balance solo)
```

  Caso real: UC 2015, PDF híbrido; las páginas 4-9 (los estados) son imágenes y la transcripción vieja salió del texto propio del PDF.
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
- d) **Escalera** (es el reintento del camino de error):

```
 ESCALÓN 0  índice normal ────────────────────────────── ¿verificar cierra y no faltan categorías? sí → sigue
 ESCALÓN 1  índice ampliado (filas que terminan en "-") + la lista de lo que faltó (--reintentar, una vez) ── ¿cierra? sí → sigue
 nada → se carga lo que cerró (sin abrir) o va a la cola
```

Riesgos:
- i) elige el balance, un presupuesto u otro perímetro;
- ii) el índice parte un estado en dos o pierde un renglón suelto.

Mitigaciones:
- i) la etapa 6 lo frena si no cierra; sus dudas van a la cola;
- ii) el índice tolera huecos chicos entre filas y marca "continúa" cuando un bloque sigue al anterior.

### 4 Validar

- a) PDF digital: cada número de los bloques elegidos se busca en el texto propio de su página. Gratis.
- b) Escaneo: Gemini lee la imagen de esa página (si la rechaza, Claude). ~US$ 0,003 por página.
- **Escalera** (ya funciona así; no registra todavía en qué escalón quedó cada número):

```
 ESCALÓN 0  texto propio del PDF (digital) ────── ¿el número está en su página? sí → confirmado
 ESCALÓN 1  Gemini lee la imagen de la página ─── ¿coincide? sí → confirmado
 ESCALÓN 2  Claude lee la imagen (si Gemini la rechaza) ── ¿coincide? sí → confirmado
 ESCALÓN 3  las sumas de la etapa 6 lo confirman
 nada → cola con los dos números
```
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
- c) Una nota puede desglosar un renglón de otra nota (desglose anidado). De un cuadro por segmento toma solo la columna del segmento que
  abre un renglón (UC: "Comerciales").
- d) No suma, no convierte, no categoriza.

Riesgos:
- i) lado o tipo equivocados;
- ii) una fila de nota pegada al renglón equivocado.

Mitigaciones:
- i y ii) la etapa 6 lo frena si no cierra.

### 6 Verificar

- a) Notas: reemplazan a su renglón solo si suman, también anidadas (una fila de una nota abierta por otro cuadro). Se lee la estructura impresa: qué subtotal suma qué, cuadros de detalle que no se suman
  dos veces, subtotales impresos arriba de sus componentes.
- b) Resultado: ingresos − gastos ± financiero ± impuesto tiene que dar el resultado impreso.
- c) Año anterior cargado: la columna del año anterior contra lo que tiene el sitio.
- d) Año vecino: si el documento del año siguiente ya pasó por extraer, su columna "año anterior" tiene que coincidir.
- e) Redondeo: si solo falta menos de media unidad por fila, se agrega una fila "Diferencia de redondeo".
- f) **Escalera de lecturas** (si la base no cierra con un número impreso, se prueba la siguiente; gana la primera que cierra y queda escrita):

```
 LECTURA 0  las filas tal cual ───────────────── ¿cierra? sí → OK
 LECTURA 1  + "resultado antes de impuestos" si no hay resultado final ── ¿cierra? sí → OK
 LECTURA 2  + el total impreso puede ser un renglón más del estado ─────── ¿cierra? sí → OK
 LECTURA 3  + renglones sin lado, según su signo ──────────────────────── ¿cierra? sí → OK
 nada cierra → reintento (una vez) → cola humana
```

  Si el documento no tiene ningún total ni resultado impreso en los bloques elegidos, es un fallo (no se carga sin confirmar sumas).
- g) Sin fecha de cierre detectada: se deduce si el documento anterior y el siguiente del club cierran el mismo día (con aviso).
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
- c) **Escalera** (el escalón con contexto se agregó el 2026-10-01):

```
 ESCALÓN 0  respuesta de Guido en la cola para esa fila ─────────────────────── gana siempre
 ESCALÓN 1  precedente exacto CON CONTEXTO (misma etiqueta y mismo renglón que desglosa)
 ESCALÓN 2  precedente exacto (misma etiqueta en el club, una sola categoría)
 ESCALÓN 3  precedente por familia de palabras
 ESCALÓN 4  Jev con confianza >= 0,90
 ESCALÓN 5  Claude con confianza >= 0,80
 nada → cola (pregunta de sí o no)
```

  Si la misma etiqueta tiene categorías distintas en el club, el precedente sin contexto no decide y se baja de escalón: "Remuneraciones"
  dentro del costo de ventas (sueldos del plantel) no se confunde con "Remuneración" dentro de gastos de administración.
- Tools: `glosar-rubros.mjs`, `jev-categorizar.mjs`, `categorizar-claude.mjs`, `memoria-categorias.mjs`. ~US$ 0,03 por documento.

Riesgos:
- i) categoría equivocada con sumas correctas (nada lo delata).

Mitigaciones:
- i) el primer año automático de cada club lo revisa Guido (decisión pendiente: ¿siempre?).

### 8 Cargar

- a) `cargar.mjs --desde-verificacion`: carga solo lo que la etapa 6 dejó en "ok". Tipo de cambio, liga y fuente con página.
- b) Club nuevo: `alta-club.mjs`, en el mismo commit que su primer año.
- c) Después corre `audit.js`; si da un error grave, revierte solo.
- d) **Escaleras chicas** (ya funcionan así; falta registrar en qué escalón salió cada dato):

```
 TIPO DE CAMBIO   declarado único ─► declarado en tabla (gana la fecha más nueva) ─► serie oficial (tools/fx-reference/) ─► cola
 PERÍMETRO        heredado del año cargado más cercano ─► cola
 FECHA DE CIERRE  leída del documento ─► deducida de los vecinos (mismo día, años consecutivos) ─► cola
 CATEGORÍAS EN 0  salarios / televisión / estadio, o socios / otros deportes según el perfil ─► reintento (una vez) ─► se carga con aviso
```
- Hoy en el lote es solo propuesta: no escribe el sitio.

Riesgos:
- i) el documento declara varios tipos de cambio;
- ii) el documento no declara y la moneda no está en el archivo de series (hoy hay 14: faltan, por ejemplo, PEN, MXN, JPY).

Mitigaciones:
- i) si están en una tabla con una fecha por columna, gana la fecha más nueva; si no (frase, años sueltos, activo y pasivo), a la cola;
- ii) se agrega la moneda al script de series oficiales; mientras tanto, frena.

### 9 Publicar

- Commit local, un commit por año cargado. El push lo hace Guido.

### Camino de error (reintento)

El camino limpio no cambia: si todo suma y nada falta, el documento sigue. Las reglas extra viven acá (regla de Guido: "para cuando haya
errores"). Un documento se marca para reintentar por dos motivos:

- a) **Un desglose no suma** (una nota, o un cuadro que abre una fila de una nota). Lo detecta la etapa 6.
- b) **Una categoría da 0 cuando debería tener número.** Lo detecta la etapa 8 (ahí ya hay categorías):
  - salarios del plantel, televisión o estadio en 0: siempre (en 241 años cargados, salarios nunca es 0, televisión 2%, estadio 1%);
  - cuotas sociales en 0: solo si el perfil del club dice que tiene socios;
  - otras secciones deportivas en 0: solo si el perfil dice que tiene otros deportes (básquet, vóley, futsal...);
  - educación nunca dispara;
  - un documento con una línea "sin desglosar por la fuente" no se revisa.

Qué pasa después:

- Al final del lote aparece la lista y el comando: `caffeinate -i node tools/lote.mjs --lista <lista> --ejecutar --reintentar`.
- El reintento vuelve a localizar con un índice más permisivo (cuenta las filas que terminan en "-") y con la lista de lo que faltó, y
  extrae con esa misma lista (y la regla de usar la columna de totales de un cuadro por segmento para un renglón del estado).
- Una sola vez por documento. Si sigue faltando, se carga con aviso.

### Perfil de cada club

- Archivo `Admin/perfil-clubes.jsonl`, se lee con `node tools/perfil-clubes.mjs [clubId]`.
- Dos datos por club: ¿tiene socios que pagan cuota?, ¿tiene otros deportes en sus estados financieros? Sí, no o no se sabe, con evidencia.
- Hoy: los 66 clubes sudamericanos (armado por un subagente con lo cargado y las transcripciones). Socios: 49 sí, 11 no, 6 no se sabe.
  Otros deportes: 31 sí, 25 no, 10 no se sabe. Criterio aceptado por Guido: "clube social e esportes amadores" que además nombra básquet,
  vóley, futsal o remo cuenta como otros deportes.
- Si un club no está o dice "no se sabe" y la categoría da 0: pregunta de sí o no en la cola. Guido contesta o manda un agente a buscar; la
  respuesta queda en el perfil para todos los años del club.

### Cola humana

- Archivo: `Admin/cola-revision.jsonl`. Se lee con `node tools/cola.mjs`.
- Cada caso es una **pregunta de sí o no**, con la propuesta del sistema, la página del visor y la impresa, y las líneas del .md.
- Guido contesta con `node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club --nota "..."`.
- Para fijar la categoría de una fila sin que haya un caso: `node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."`.
- La próxima corrida toma la respuesta.
- Las dudas de la IA traen un tema de una lista fija (usar un cuadro por segmento, cuadro duplicado, cuadro de otro año, perímetro, escala,
  columna, fila ilegible, otro) y el renglón al que afectan. Una duda de tema fijo se reconoce por club + tema + renglón: si Guido ya la
  contestó en cualquier año del club, se aplica sola.
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
   desde su fuente oficial (hoy hay 14 monedas; CLP toma el primer día con dato posterior al cierre, como lo declaran los clubes).

Pendientes, a decidir con casos reales:

- ¿El primer año automático de cada club pasa siempre por la cola?
- ¿Dónde ver la cola? Hoy es un archivo que se lee con `cola.mjs`.
- Perímetro: se hereda del año cargado más cercano; si no se puede, pregunta en la cola.
- Retirar el proceso viejo de las etapas 3 a 5 (~10 tools): cuando el proceso nuevo haya cargado bien algunos documentos.

---

## Lo que falló en los tests o no entró

- **Elegir filas por palabras clave** (la etapa vieja): reproduce los ingresos ya cargados en 7-11% de los años. Por eso existe el proceso nuevo.
- **Localizar por páginas enteras:** descartado; un estado puede empezar a mitad de página.
- **Una sola escala por documento:** descartado; la nota puede estar en miles y el estado en unidades (1. FC Köln).
- **Escala por "plausibilidad" contra otros años del club:** inútil con inflación y años en otra moneda (Racing).
- **Heurística de encabezados para el tipo de cambio:** 4 errores en 17 documentos. Se saca.
- **"Las notas por segmento nunca se eligen":** descartada. En UC el desglose de "Ingresos Comerciales" solo está en la nota de segmentos.
  Reemplazo: un cuadro por segmento se usa si la columna de un segmento desglosa un renglón (y tiene que sumar).
- **Cierre de notas sumando todo** (la versión vieja de `verificar.mjs`): contaba dos veces los cuadros de detalle (UC, Betis, Athletic) y
  aceptaba notas que no cerraban por la tolerancia de 0,5% (Chapecoense).
- **No construido todavía:** duplicados de PDF por huella; número citado en el texto como segundo chequeo; que una respuesta de la cola se vuelva
  regla; ordenar la cola por impacto; reabrir solo el sourcing de un PDF roto.

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
