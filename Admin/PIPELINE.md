# PIPELINE: de un PDF a un año cargado en el sitio

Referencia del proceso nuevo: qué hace cada etapa, sus escaleras y compuertas, y las decisiones de Guido que lo parametrizan.
Se actualiza en la misma sesión en que cambia una tool. Cómo se trabaja con el pipeline (reglas, medición, arranque) está en el skill
`club-or-year-onboarding`; lo que se midió y no entró, en `Admin/HALLAZGOS-pipeline.md`.

---

## El proceso nuevo

Los comandos:

```bash
node tools/lote.mjs --lista Admin/lote-NN.txt                               # ensayo: qué haría y cuánto cuesta (gratis)
caffeinate -i node tools/lote.mjs --lista Admin/lote-NN.txt --ejecutar      # de verdad (lo corre Guido)
caffeinate -i node tools/lote.mjs --lista Admin/lote-NN.txt --ejecutar --reintentar   # camino de error (ver abajo)
node tools/cola.mjs                                                         # la cola humana
node tools/estado.mjs                                                       # el tablero: cada PDF en su etapa y escalón (gratis)
node tools/inventario-transcripciones.mjs                                   # el registro, con la etapa de cada estado (gratis)
node tools/gasto-doc.mjs --lista <lista> --desde <ISO> [--hasta <ISO>]       # lo gastado por documento en una corrida pasada
```

`lote.mjs` corre las etapas 3 a 8 sobre una lista chica.
- Lo que ya está hecho no se repite (queda en `Generados/`, que se respalda en git). Si el .md cambió desde extraer (`cache-al-dia.mjs`:
  misma huella, o cada fila sigue en su línea), un año sin cargar se rehace y uno cargado solo avisa.
- El ensayo estima con el tamaño real: extraer = salida 2 × entrada; sin localizar, la mediana del club (sin historia, US$ 0,12-0,32).
- Al final: el gasto por documento y por tarea, con "N.ª vez" si esa tarea ya se había pagado para ese PDF; y el RESULTADO (listos,
  frenados, ya en el sitio: un año cargado va ahí aunque su propuesta sea vieja).

### 1 Conseguir

- a) Se encuentra el documento oficial y se guarda en `Clubes/<País>/<Club>/`.
  - Tools: `exa-search.mjs`, `wayback-cdx.mjs`, `wayback-verify-download.mjs`, `reddit-archive-search.mjs`, `twitterapiio-search.mjs`.
- b) Llega roto (un HTML con extensión .pdf, o cortado): `estado.mjs` lo lista en la etapa 1 con el archivo de `fuentes/` a reabrir.

Riesgos:
- i) un documento que no es del club, del año o del perímetro;
- ii) el mismo documento bajado dos veces con nombres distintos.

Mitigaciones:
- i) las fuentes no oficiales se guardan sin publicar; el año se lee del contenido (`periodo.mjs`), no del nombre;
- ii) falta: detectar duplicados por huella del archivo (to-do 140c).

### 2 Transcribir

- a) PDF digital (tiene texto propio): Mistral transcribe; el texto propio del PDF queda como segunda fuente gratis para la etapa 4.
- b) PDF escaneado: Mistral lo marca como escaneo; no hay segunda fuente gratis.
- c) PDF con texto roto (letras sin sentido en vez del texto real): se detecta solo y se trata como escaneo.
- d) **Escalera** (escalón 1 construido; el 2 todavía no):

```
 ESCALÓN 0  la transcripción que hay ──────── ¿localizar encuentra el estado de resultados? sí → sigue
 ESCALÓN 1  si no, la transcripción no es de Mistral y el PDF tiene páginas interiores en imagen
            → re-transcribir con Mistral y volver a localizar (con --reintentar) ── ¿lo encuentra? sí → sigue
 ESCALÓN 1a (Versión 433) el inventario dice "revisar" → resolver-inventario.mjs (las VOCES): Claude solo en las páginas con cifras que
            no coinciden con el texto del PDF; ignora las dudas en prosa ── compuerta: el inventario queda "listo" → sigue
            (Versión 443) por página: una página con la misma huella que en la última validación "listo" se reusa, no se paga otra vez
            (Versión 463) "sin verificar" (el .md cambió): primero la validación gratis del inventario; si queda "revisar", el resolver
 ESCALÓN 1b (Versión 395, camino de error) PDF digital, la etapa 4 dice que el .md no coincide con el texto propio y la verificación no
            quedó ok → texto-propio-a-md.mjs rearma esas páginas (gratis) y se vuelve a localizar ── compuerta: etapas 4 y 6
            rearmado, con su escalera (Versión 397): método "columnas" ─► si la etapa 6 sigue sin cerrar, método "regiones" (una vez cada uno)
            COMPUERTA por página (Versión 411): la rearmada tiene que conservar al menos la mitad de las filas de tabla; si no, queda
            la anterior (Novorizontino 2025: estado de resultados girado 90°)
            Solo cuentan los números sin confirmar de bloques ELEGIDOS HOY (Versión 458): una validación hecha con otra localización
            (otro perímetro) no dispara el rearmado
 ESCALÓN 2  (falta, to-do 140b) escaneo entero → Gemini o Claude sobre las páginas candidatas
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
- d) **Compuerta antes de pagar** (Versión 441, `antes-de-localizar.mjs`; solo documentos sin `.ubicacion.json`):

```
 CIERRE     ajuste `cierre` ─► periodo.mjs ── hay → sigue · no → no se localiza (sugiere el de los vecinos)
 PERÍMETRO  ajuste (doc o club) ─► el .md trae uno solo ─► trae consolidado y el año cargado más cercano es consolidado
            ── pasa → localizar · no → no se localiza; el lote imprime el ajuste que falta (dos entidades: descartar primero la otra)
```

- e) **Escalera** (es el reintento del camino de error):

```
 ESCALÓN 0  índice normal ────────────────────────────── ¿verificar cierra y no faltan categorías? sí → sigue
 ESCALÓN 1  índice ampliado (filas que terminan en "-") + la lista de lo que faltó (--reintentar, una vez) ── ¿cierra? sí → sigue
 ESCALÓN 2  sin estado pero con notas de ingresos y gastos: LAS NOTAS HACEN DE ESTADO (--reintentar, una vez; Versión 360)
            el total de cada nota es un renglón; cierra contra el resultado impreso (en Colombia, la conciliación del impuesto)
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

- a) `extraer.mjs` (IA, ~US$ 0,12; hasta ~US$ 0,35 en documentos largos) recibe solo los bloques elegidos, con cada línea numerada.
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
 LECTURA 4  + signos impresos; subtotal de un solo renglón; total bruto con deducciones aparte (Versiones 396, 409); los ajustes
            `fila` también con su signo, relativo a la mayoría de los ajustes de su lado (Versión 493)
 LECTURA 5  solo las hojas, con signo (C/D de balancetes); sin totales; compuerta: resultado impreso exacto (Versión 414)
 nada cierra → reintento (una vez) → cola humana
```

  Si el documento no tiene ningún total ni resultado impreso en los bloques elegidos, es un fallo (no se carga sin confirmar sumas).
- **Escalera de escala** (Versión 362; queda en el `.verificacion.json` como `escala`):

```
 ESCALÓN 0  la declarada (bloque → documento) ──────────────── declarada → manda, nunca se pisa
 ESCALÓN 1  si el documento dice "no se sabe": la del año vecino ANCLADO (la declara o la resolvió acá),
            si los ingresos del año en común dan exactamente x1.000 o x1.000.000 ──► COMPUERTA: chequeo de año vecino (d) ── pasa → adoptada
 nada → unidades y cola
```

  La cadena depende del orden (Fortaleza: 2025 declara → 2024 → 2023): `verificarLista()` repite la pasada si alguno se resolvió así.
- **Resultado impreso, escalón 2** (Versión 415): si no hay resultado en los bloques, una línea PREJUÍZO / SUPERÁVIT pegada al último
  bloque (hasta 4 líneas); compuerta: alguna lectura cierra con él exacto.
- **Chequeos cruzados** (año vecino, año anterior cargado; Versión 416): si ninguna fila trae la columna del año anterior, "no se puede".
- **Resultado final** (Versión 364), si cerró contra "antes de impuestos": candidatos antes ± impuesto → escalón 0, impreso en el .md del
  documento; escalón 1, impreso en el documento siguiente (columna del año anterior) → compuerta: uno solo coincide; si no, cola.
- **Dudas de la IA, escalera** (antes de llegar a la cola):

```
 ESCALÓN 0  ¿afecta la carga? ── no ──► nota
 ESCALÓN 1  ¿Guido ya la contestó para este club? (club + tema + renglón) ── sí ──► se aplica
 ESCALÓN 2  ¿la aritmética la confirma? (la escalera de lecturas cerró, ningún año vecino da distinto, tema = cuadro por segmento /
            cuadro duplicado / columna / escala, y la propuesta "sí" ya está aplicada) ── sí ──► se acepta sola, con nota
 COLA HUMANA (perímetro, cuadro de otro año, fila ilegible y "otro" siempre llegan)
```
- g) Sin fecha de cierre detectada: se deduce si el documento anterior y el siguiente del club cierran el mismo día (con aviso).
- h) **Compuerta del registro** (deja el documento "listo" para categorizar): exige confirmados solo los números de los bloques que usa la
  lectura que cerró (las filas que se cargan); un número de una nota que no se carga no frena (Versión 457).
- Tool: `verificar.mjs` (gratis, sin IA: un modelo de lenguaje no sirve para verificar sumas).

Riesgos:
- i) dos errores que se compensan;
- ii) un club sin año vecino para comparar.

Mitigaciones:
- i) segundo chequeo (año vecino; falta: un número citado en el texto del documento, to-do 140f);
- ii) va a la cola.

### 7 Categorizar

- a) Precedente del club → Jev (si la confianza es 0,90 o más) → Claude por API (0,80 o más).
- b) Lo que queda debajo de 0,80 no se carga solo: va a la cola.
- c) **Escalera** (el escalón con contexto se agregó el 2026-10-01; Jev y Claude reciben como "sección" de dónde sale la fila, incluido
  "sin lado en el documento: entra como gasto por su signo, impreso en negativo"):

```
 ESCALÓN 0  ajuste manual · respuesta de Guido en la cola para esa fila ──────── gana siempre
 ESCALÓN 1  precedente exacto CON CONTEXTO (misma etiqueta y mismo renglón que desglosa)
 ESCALÓN 2  precedente exacto (misma etiqueta en el club, una sola categoría)
 ESCALÓN 3  precedente por familia de palabras
 ESCALÓN 4  Jev con confianza >= 0,90
 ESCALÓN 5a ¿Claude ya respondió esto? (caché: carpeta + lado + etiqueta + nota, Versión 404)
 ESCALÓN 5b Claude por API con confianza >= 0,80
 ESCALÓN 6  materialidad: las dudas de un lado suman ≤ 1% de ese lado → las de confianza >= 0,60 se cargan con aviso (Versión 386)
 "NO ES RUBRO" de la IA en una fila verificada con lado: se excluye; si la carga no cierra, se prueba incluirla (a la cola);
            gana la que cierra (Versión 462)
 COMPUERTA DEL LADO en todos los escalones (Versiones 374 y 377): la categoría tiene que ser del lado de la fila en el documento; si no,
            baja de escalón; la pregunta de la cola lleva la clave "etiqueta|lado"
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
- d) **Escaleras chicas** (ya funcionan así; falta registrar en qué escalón salió cada dato, to-do 140h):

```
 TIPO DE CAMBIO   ajuste ─► declarado (compuerta: su frase no trae otra fecha que el cierre) ─► en tabla (fecha más nueva) ─► serie oficial ─► cola
 PERÍMETRO        heredado del año cargado más cercano ─► cola
 FECHA DE CIERRE  títulos ─► encabezados de las tablas (ejercicio | un año antes) ─► vecinos ─► cola; compuerta: no más de 2 años después de hoy
 CATEGORÍAS EN 0  ajuste `cero-real` ─► salarios / TV / estadio, o socios / otros deportes según el perfil ─► reintento (una vez) ─► aviso
 LO QUE CERRÓ EN LA ETAPA 6 (Versiones 375-378): financiero e impuesto con el signo con que cerró; una fila verificada con lado no se mueve
                  por palabras ni se excluye sola por "no es rubro" dudoso
 "NO ES RUBRO"    (fila verificada con lado, dicho por la IA) excluirla ─► si la carga no cierra, incluirla (a la cola) ─► gana la que
                  cierra; el intento descartado no escribe en la cola (Versión 462)
```
- Hoy en el lote es solo propuesta: no escribe el sitio.
- Escribir: `cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año; después `caja-deuda.mjs --club <id> [--ejecutar] --escribir`.

Riesgos:
- i) el documento declara varios tipos de cambio;
- ii) el documento no declara y la moneda no está en el archivo de series (hoy hay 21).

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

- Antes del primer pago de cada documento, la compuerta de la etapa 3 (perímetro y cierre fijados).
- Al final del lote aparecen dos listas con su comando (Versión 442): lo que destraba la carga (`--reintentar`: categoría en 0, o desglose
  que no suma con la etapa 6 sin cerrar) y el detalle opcional (`--reintentar --detalle`: desglose que no suma con la etapa 6 cerrada; el
  año se carga igual con el renglón sin abrir). Un año ya cargado (registro o sitio) solo se reintenta por categoría en 0, y solo si su
  propuesta de carga está al día: ningún ajuste manual del mismo documento o de su club con fecha igual o posterior (Versión 461).
- El reintento vuelve a localizar con un índice más permisivo (cuenta las filas que terminan en "-") y con la lista de lo que faltó, y
  extrae con esa misma lista (y la regla de usar la columna de totales de un cuadro por segmento para un renglón del estado).
- Una sola vez por documento (también por "categoría en 0": queda la marca `.reintento-categorias.json`). Si sigue faltando, se carga con aviso.
- Va en el MISMO modo que la localización vigente (si es "las notas hacen de estado", en ese modo), y un resultado "sin estado" no pisa una
  localización que tenía estado.

### Troubleshooting: un desglose que sigue sin sumar después del reintento

```
 el lote lo lista al final ("DESGLOSES QUE SIGUEN SIN SUMAR DESPUÉS DEL REINTENTO")
        │
        ▼
 node tools/diagnostico-desglose.mjs "<pdf>"   (gratis)
        │ ¿hay líneas con cifras FUERA de los bloques elegidos, cerca del desglose?
        ├── sí ──► problema del ÍNDICE (etapa 3): la tool dice por qué quedó afuera cada línea
        │          (etiqueta partida en dos, termina en "-", hueco largo...)
        │          → mejorar el índice ampliado en tools/indice-bloques.mjs
        │          → MEDIR en todas las transcripciones (ningún documento puede perder filas)
        │          → subir VERSION_AMPLIADO (cada documento reintentado tiene un reintento más) → --reintentar
        │ no
        ▼
 problema de la TRANSCRIPCIÓN o del PDF (etapa 2): escalón 1 (re-transcribir con Mistral) o mirar la página
```

Mientras tanto el documento se carga con el renglón sin abrir (correcto, con menos detalle). Caso que lo originó: UC 2013 (etiquetas partidas
en dos renglones en el cuadro por segmento); el índice ampliado v2 lo resolvió.

### Perfil de cada club

- Archivo `Admin/perfil-clubes.jsonl`, se lee con `node tools/perfil-clubes.mjs [clubId]`.
- Dos datos por club: ¿tiene socios que pagan cuota?, ¿tiene otros deportes en sus estados financieros? Sí, no o no se sabe, con evidencia.
- Hoy: los 66 clubes sudamericanos (armado por un subagente con lo cargado y las transcripciones). Socios: 49 sí, 11 no, 6 no se sabe.
  Otros deportes: 31 sí, 25 no, 10 no se sabe. Criterio aceptado por Guido: "clube social e esportes amadores" que además nombra básquet,
  vóley, futsal o remo cuenta como otros deportes.
- Si un club no está o dice "no se sabe" y la categoría da 0: pregunta de sí o no en la cola. Guido contesta o manda un agente a buscar; la
  respuesta queda en el perfil para todos los años del club.

### Ajustes manuales (Versión 366)

- `Admin/ajustes-manuales.jsonl`, se lee y se agrega con `node tools/ajustes.mjs`. Una decisión de Guido atada al documento y al campo
  (`resultado-final`, `sin-dudas`, `fila`, `fx`, `cero-real`, `desglose`, `categoria`, `perimetro` — este también para todo el club —, `cierre`, `reportType`, `confirmado`, `caja`, `deuda-incluye` — este también para todo el club); es el escalón 0 de cada escalera y queda escrita en el `.verificacion.json` y en la meta del año.
- Va acá lo que Guido decide forzar. NO va escrita en un documento (ningún script lo lee) ni en una respuesta de la cola (esa se ata al texto de la pregunta).

### Cola humana

- Archivo: `Admin/cola-revision.jsonl`. Se lee con `node tools/cola.mjs`.
- Cada caso es una **pregunta de sí o no**, con la propuesta del sistema, la página del visor y la impresa, y las líneas del .md.
- Guido contesta con `node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club --nota "..."`.
- Una categoría que da 0 porque el documento la junta con otra línea: ajuste `incluye` (`--valor <categoría> --categoria <donde está> [--posible]`); `cargar.mjs` la escribe en `fiscalYearMeta.incluidoEn` y no la revisa como un 0 (Versión 511).
- Para fijar la categoría de una fila sin que haya un caso: `node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."`.
- La próxima corrida toma la respuesta.
- Al abrir la cola, se cierran solos (estado "obsoleto", sin efecto en ninguna tool) los casos de `verificar` y de `cargar · perimetro` de
  años que ya están en el sitio: ya no frenan nada. Nunca los de categoría (pueden tocar un dato publicado) ni los de perfil (son del club).
  Si una etapa vuelve a levantar uno, se reabre y no se vuelve a cerrar solo.
- Las dudas de la IA traen un tema de una lista fija (usar un cuadro por segmento, cuadro duplicado, cuadro de otro año, perímetro, escala,
  columna, fila ilegible, otro) y el renglón al que afectan. Una duda de tema fijo se reconoce por club + tema + renglón: si Guido ya la
  contestó en cualquier año del club, se aplica sola.
- Qué entra: números no confirmados que no cierran, totales o resultado que no cierran, año vecino distinto, primer año sin vecino, dudas de
  localizar y de extraer que afectan la carga, y filas con categoría menor a 0,80 (etapa 8).
- Una respuesta de categoría queda como precedente del club para los años siguientes (`Admin/categorias-aprendidas.jsonl`).
- Falta: que otras respuestas (convenciones de un grupo de países) se vuelvan regla (to-do 141c).

---

## Caja y deuda (`tools/caja-deuda.mjs`)

Comando aparte, con el club ya publicado: completa `cash` y `grossDebt` de cada año cargado donde el sitio tiene null (nunca pisa un valor
cargado) y nunca frena. Medir: `node tools/caja-deuda.mjs --medir --club <id> [--detalle]` (gratis). Escribir: `--escribir`.

```
 LECTURA DE FILAS  una sola referencia a nota; activo y pasivo en la misma fila = dos filas; sin código de cuenta ni numeración
                   ("4)", "a)") para el diccionario. La referencia a nota es una escalera: escalón 1, si la tabla tiene una columna de
                   notas inequívoca antes de la cifra, la cifra es un importe (Novorizontino 2019 "| Empréstimos |  | 27 | 24 |");
                   escalón 2, sin esa evidencia, el primer entero de 1-2 dígitos se descarta como nota
 PÁGINAS DEL BALANCE  título o total del balance, y no el flujo de efectivo ni los cambios en el patrimonio (una FILA con esas palabras
                      no cuenta si la página tiene el título del balance como encabezado)
 PERÍMETRO  cada página del balance es consolidado o individual por su encabezado; con ajuste `perimetro` solo cuenta ese (si el .md
            trae los dos, solo las páginas marcadas)
 ESCALA     una por documento (la del estado de resultados contra lo cargado); la del vecino, con SU escala; en la compuerta, si
            el valor no es plausible (1/100 a 100 veces el año cargado más cercano) o no pasa, se prueban las otras escalas y se
            acepta si UNA sola da ok y plausible
 ESCALÓN 0  ajuste manual `caja` / `deuda` del año · precedente del club (las familias que suman lo cargado en el año más cercano)
 ESCALÓN 1  diccionario (vocabulario.mjs) + términos del club o del documento (ajuste `deuda-incluye`); jerarquía de balancete: padre e
            hija no se suman; cuenta D no es deuda. Además propone: deuda corriente + no corriente de la misma etiqueta (exactamente
            dos filas, a cada lado del total del pasivo no corriente); las filas de la nota de efectivo si la caja es una parte; el total
            de la nota de deuda si no hay otra fila de deuda
 ESCALÓN 2  IA (solo líneas)
 COMPUERTA (la misma para todos): la familia de la fila es la del dato y el año anterior cargado o el documento siguiente dicen lo mismo
            ── pasa → dato · no pasa → siguiente escalón · nada → null
 VECINO     lo cargado en el sitio o el documento vecino; nunca un valor aceptado en la misma corrida (Versión 502)
```

Los pendientes están en `auditorias/2026-10-04-clubes-pipeline.md` (to-do 138).

---

## Decisiones tomadas por Guido

1. Una fila categorizada con confianza menor a 0,80 no se carga sola: va a la cola.
2. Un total de ingresos o gastos que el documento no imprime se acepta si cierra con el resultado, y se busca un segundo chequeo.
3. Un total que cierra solo por redondeo lleva una fila "Diferencia de redondeo".
4. Una diferencia de una unidad entre dos tablas (UC: 1.790.062 contra 1.790.063) no va a la cola.
5. Tipo de cambio: si el documento declara el suyo, **gana el del documento**; si declara varios en una tabla, el de la fecha más nueva (puede que el club acceda a una cotización mejor que la de
   mercado). El promedio entre apertura y cierre es solo para presupuestos.
6. Si el documento no declara tipo de cambio: la cotización de cierre del **archivo de series oficiales** (`tools/fx-reference/`, bajado de
   cada banco central). Nunca una cotización dada por Claude. Si la moneda no está en el archivo, se agrega al script que baja las series,
   desde su fuente oficial (hoy hay 21 monedas; CLP toma el primer día con dato posterior al cierre, como lo declaran los clubes).
7. Perímetro: cuando un documento trae los dos estados (individual y consolidado), se carga el **individual**, salvo que una controlada
   concentre ingresos del club (por ejemplo, el marketing): eso se mira en el `.md` antes de fijar el ajuste `perimetro` del club. Se fija
   antes del primer lote. Casos: Boca, Racing, Panathinaikos, Juventus.


---

## Documentos fuente: carpetas, transcripción y trampas de PDF (venía de `CLAUDE.md`)

Texto movido sin cambios. Lo que dice "este archivo" o "acá" se refería a `CLAUDE.md`.

## Estructura de carpetas de documentos fuente: Clubes/<País>/<Club>/ (PDF y transcripción juntos)

Todos los PDFs fuente Y sus transcripciones a Markdown viven JUNTOS, en la
misma carpeta: `finance-of-sports/Clubes/<País>/<Club>/` — NO carpetas sueltas
tipo `racing-pdfs/`, `river-pdfs/` al nivel raíz (eso fue un error temprano,
corregido en la Versión 17), y NO dos árboles paralelos separados para PDFs
y para transcripciones (eso fue el esquema `PDFs/` + `pdf-extracts/` de la
Versión 17, reemplazado en la Versión 28 a pedido de Guido: quería el PDF y
su transcripción uno al lado del otro, no en dos carpetas distintas que hay
que mantener sincronizadas).

Ejemplo actual: `Clubes/Argentina/Boca/`, `Clubes/Argentina/River/`,
`Clubes/Argentina/Racing/`. País y club van CAPITALIZADOS (`Argentina`,
`Boca`, `River`, `Racing` — no `argentina`/`boca` en minúscula). Ojo: esto es
distinto del criterio que sigue usando el CÓDIGO del sitio para los
`clubId` (`boca`, `river`, `racing`, siempre en minúscula) — son dos
convenciones separadas a propósito, una para carpetas (legible para Guido en
Finder), otra para identificadores internos (consistente con el resto del
código). Si en el futuro se agrega un club de otro país (ej. Flamengo,
Brasil), la carpeta nueva es `Clubes/Brasil/Flamengo/` — NUNCA una carpeta
nueva al nivel raíz de `finance-of-sports/` por club o por país.

Dentro de la carpeta de cada club podés tener subcarpetas propias si hace
falta separar por tipo o por procedencia del documento (ej.
`Clubes/Argentina/River/estados-contables-leads/` para el PDF de fuente no
oficial — Y su transcripción, juntos ahí también, mismo criterio) — eso sí
está bien, lo que no escala es una carpeta nueva por club al nivel raíz del
proyecto.

**OJO CON LO QUE SE TRACKEA, que no es lo mismo que lo que se guarda (2026-09-17).**
El repo entero se deploya: Netlify publica la raíz, así que cualquier archivo
trackeado queda servido en `financeofsports.com/<su ruta>` salvo que `netlify.toml`
lo saque del artefacto de deploy (ver arriba: `Admin/` y poco más). Los PDFs no viajan (`*.pdf` está en `.gitignore`),
pero las transcripciones `.md` sí, y son 106 MB de los 110 MB del repo. Para un
balance oficial eso está bien y hasta es coherente con el proyecto. Para un
documento que NO es del dominio del club, no: la carpeta
`Clubes/Argentina/River/estados-contables-leads/` está en `.gitignore` por eso —
el PDF se consiguió en una réplica de la comunidad tuRiver. Los archivos siguen en
la máquina y se usan igual; lo único que cambia es que no se publican. **Si
aparece otra fuente no oficial, mismo criterio: se guarda, no se trackea.**

## Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo

Cuando se descarga o recibe un PDF nuevo para este proyecto (balance, presupuesto,
lo que sea), lo primero que se hace con él — antes de extraer datos, antes de
cargar nada al sitio — es transcribir el contenido COMPLETO a un archivo
`.md`, en LA MISMA carpeta que el PDF: `finance-of-sports/Clubes/<País>/<Club>/`
(crear las carpetas si no existen), con el mismo nombre base que el PDF (ej.
`Memoria y Balance al 30-06-2025.pdf` → `memoria-y-balance-2024-25.md`, los
dos juntos en `Clubes/Argentina/Boca/`).

Por qué: estos PDFs suelen ser escaneos sin capa de texto (pdftotext no sirve),
así que leerlos implica OCR o (si no hay más remedio) renderizar página por
página como imágenes con el Read tool — caro en tokens. Guido quiere poder
iterar sobre CÓMO se muestra un número (probar formatos, reclasificaciones,
layouts) sin que cada prueba implique volver a abrir el PDF de página en
página. Con el `.md` ya transcripto, esas iteraciones futuras leen texto
plano — rápido y barato.

Actualizado (Versión 90 de `index.html`, onboarding de Vélez Sarsfield): para
un PDF escaneado sin capa de texto, antes de recurrir al Read tool sobre
imágenes, instalar Tesseract (`brew install tesseract tesseract-lang`) y
generar la transcripción con `pdftoppm -png -r 300` + `tesseract -l spa
--psm 6` página por página — mucho más barato en tokens, y el OCR de tablas
numéricas resultó muy confiable en la práctica. Ver
`.claude/skills/club-data-mapping/SKILL.md` sección 15 para el flujo
completo (incluye qué hacer con tablas anchas rotadas 90° en el escaneo, y
cómo verificar los números del OCR fila por fila antes de cargarlos).

**En el onboarding con el pipeline, la transcripción (etapa 2) la corre `tools/pipeline.mjs --sin-jev`, que además la valida: ver el
skill `club-or-year-onboarding`.** Lo que sigue describe los motores que usa por dentro y el camino para un PDF suelto.

**ACTUALIZADO OTRA VEZ (Versiones 244-248, 2026-09-26): el DEFAULT para transcribir en volumen ya
no es que la sesión de Claude lo haga, es mandarlo a una API externa barata, corrida por Guido desde
SU PROPIA terminal — 0 tokens de Claude, sea 1 PDF o sean 2000.** El test completo (30 documentos,
costo y calidad comparados cifra por cifra) está en `Admin/test-costo-transcripcion.md`; el criterio
que salió de ese test:

1. **Default: `node tools/mistral-ocr-transcribe.mjs --all`** (Mistral OCR, motor de extracción
   dedicado, ~$4 cada 1000 páginas). Marca en la consola y con una advertencia adentro del `.md`
   cuando el PDF es un escaneo — en ese caso, antes de cargar esos datos hace falta verificar a mano
   contra el PDF (`club-data-mapping` sección 6): es el único caso real donde encontramos que
   inventa un número con la misma confianza que uno bien leído, en vez de avisar.
2. **`node tools/gemini-transcribe.mjs --redo-mistral-scanned`** (Gemini 3.8 Flash) para lo que
   Mistral marcó como escaneo y amerita más cuidado — OJO, no es `--all`: ese flag busca PDFs sin
   ningún `.md` y se saltea justo los que Mistral ya tocó (aunque los haya marcado escaneados) — en el test manejó escaneos rotados/dañados sin errores. Rechaza
   ~1 de cada 4 documentos con `finishReason: RECITATION` (falso positivo de copyright de Google,
   más común en "memorias" narrativas) — no es un problema del documento ni de Mistral.
3. **Un subagente de Claude** (el flujo de siempre, Tesseract incluido, descripto abajo) para lo que
   Gemini rechaza por RECITATION, o cualquier caso donde ninguna de las dos APIs alcance. Es el más
   caro (70.000-290.000 tokens por documento) pero también el más minucioso: cruza sumas entre notas,
   marca `[ilegible]` en vez de inventar, y corrige ambigüedades de OCR contra el resto del documento.

Las dos APIs necesitan su propia key en `Admin/gemini/.env` / `Admin/mistral/.env` (gitignoreadas,
mismo criterio que la de Resend) — si no existen todavía, pedírselas a Guido, no asumir que hay que
usar el flujo de Tesseract de abajo por default.

**Los pasos 1 y 2 corren solos `tools/check-transcripcion-fidelidad.js` (to-do 90) sobre cada `.md`
recién escrito, y avisan en la consola si encuentran algo** — no hace falta acordarse de correrlo
aparte para esos dos. El chequeo mira CONTENIDO, no solo cantidad de páginas: agarra un bloque
reemplazado por un resumen en inglés en vez de transcripto (el error real que dejó pasar el test de
costo de Haiku, ver `Admin/test-costo-transcripcion.md`) y huecos en la numeración de página. Es
gratis (script de Node puro, sin ninguna llamada a modelo) y no bloquea la transcripción si encuentra
algo, solo marca qué archivo revisar antes de onboardear. **El paso 3 (subagente de Claude) NO lo
corre solo** — correlo a mano al terminar (`node tools/check-transcripcion-fidelidad.js
<archivo.md>`), es la misma clase de modelo (chat, no motor de extracción) que produjo el bug
original, así que el chequeo tiene más chance real de encontrar algo ahí que en Mistral.

Qué transcribir: TODO el documento, página por página, en el mismo orden,
incluyendo tablas (como tablas Markdown o listas alineadas, lo que se lea
mejor), números exactos tal cual figuran impresos (sin redondear, sin
reclasificar a ninguna categoría del sitio todavía — eso es un paso aparte,
después), y una marca de página (ej. `--- pág. 76 ---`) antes de cada una para
poder citar la fuente exacta más adelante. Es una transcripción fiel, no un
resumen: si se resume o se salta contenido "poco relevante", se pierde
justamente el dato suelto que capaz hace falta en una sesión futura.

Una vez que el `.md` está armado, se usa ESE archivo (no el PDF) para extraer
los datos que se vayan a cargar a `<club>RevenueLinesByYear`/
`<club>ExpenseLinesByYear`/etc. (ver `data/river-data.js` para el shape, el
mismo que usan todos los clubes incluida Boca desde la Versión 102), y para
cualquier experimentación de formato que pida Guido más adelante sobre ese
mismo documento.

### Trampas de PDF y de grep

- **`grep -oP '.{20}CARACTER.{20}'` (u otro cuantificador de caracteres
  alrededor de un carácter especial) puede fallar en silencio cerca de
  acentos**: el cuantificador `.{N}` con `-P` (PCRE) en este entorno no
  cuenta bien caracteres cuando hay vocales acentuadas cerca (más, línea,
  categoría, año) del texto en español, así que una línea real puede
  simplemente no aparecer en el resultado, dando una falsa sensación de "ya
  no queda ninguna". El chequeo confiable: `grep -n 'CARACTER' archivo` (sin
  capturar contexto con un cuantificador de caracteres, solo el número de
  línea) y revisar cada línea completa a mano.
- **`pdfinfo archivo.pdf | grep "^Pages:"` puede devolver VACÍO en silencio
  si el PDF trae bytes NUL en sus metadatos** (encontrado en la transcripción
  masiva de la Versión 156/157, con PDF de clubes chinos generados por
  PDFsharp: el campo `Producer` arrastra restos de un string UTF-16 de
  Windows sin convertir, con bytes `\0` de por medio). `grep` detecta esos
  bytes NUL, decide que el stream es binario, y deja de hacer matching línea
  por línea — así que la línea `Pages:` (que viene DESPUÉS de `Producer` en
  la salida de `pdfinfo`) nunca aparece, aunque `pdfinfo` sin pipear muestre
  todo bien. Síntoma típico: una variable de cantidad de páginas que queda
  vacía y rompe el comando siguiente (`seq 1 ""` → "invalid floating point
  argument"), no un error de `pdfinfo` en sí. El fix es `grep -a` (fuerza a
  tratar el input como texto pase lo que pase) en vez de `grep` a secas,
  cualquier vez que se parsee la salida de `pdfinfo` (o de cualquier otra
  herramienta que pueda traer metadata binaria) con grep.
- **`pdftotext` puede devolver texto que "funciona" (no vacío, sin error) pero es MOJIBAKE, no el
  contenido real** (encontrado transcribiendo `Clubes/Ucrania/Kolos Kovalivka/kolos-auditor-
  info-adicional-2025.pdf`, Versión 214): el PDF tenía capa de texto, pero sus fuentes eran
  Helvetica/WinAnsi no embebidas y sin mapa ToUnicode (confirmable con `pdffonts`), así que
  `pdftotext` devolvía caracteres latinos sin sentido (`TOB (AyAI4TOPCbKA`) en vez del cirílico real
  (`ТОВ «АУДИТОРСЬКА»`). La señal: si el idioma esperado del documento es no-latino (cirílico,
  griego, etc.) y `pdftotext` devuelve caracteres latinos, no asumas que "no tiene texto que
  aportar" ni that el documento está en otro idioma — es mojibake. Tratarlo como escaneado (OCR con
  Tesseract, en el idioma real del documento) en vez de confiar en esa capa de texto rota.
