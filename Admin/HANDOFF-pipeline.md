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

**Seis clubes en el sitio local, sin push:** UC (Chile) 2010-2025; Fortaleza CEIF (Colombia) 2017-2025; Goiás (Brasil) 2008-2017 y
2021-2025; Novorizontino (Brasil) 2010 y 2013-2025; AEL Larissa (Grecia) 2016-2025; **Juventus (Italia) 2003-2025**.
Versiones de esta tanda: 407-440.

Plan, en orden (de a un cambio, con el ok de Guido; siempre escalera; medir en UC + Fortaleza + Goiás + el club en curso):

1. **Juventus (`juventus-it`) cargado 2003-2025** (estado separado; Versiones 433-440). Pendiente:
   - **Deuda 2007-2025 sin dato:** la IA (escalón 2) propone valores razonables (2007 18,7 M = "Loans and other financial liabilities"
     corriente + no corriente) pero la compuerta no confirma: la columna "año anterior" del documento siguiente dice otra cosa (reexpresiones
     IFRS, o la IA del año vecino eligió otras filas). Y desde 2007 la deuda viene en dos filas con la misma etiqueta, que el escalón 1 no
     suma (familia repetida). A diseñar: escalón 1 que sume corriente + no corriente de la misma familia.
   - **Caja 2022, 2024, 2025 sin dato y `caja-deuda.mjs` no respeta el ajuste `perimetro`:** lee el primer balance del .md (el consolidado).
     2023 se corrigió a mano. A diseñar: que caja-deuda reciba el perímetro (como el cambio H para localizar).
   - **Escala de caja-deuda equivocada cuando hay filas de ajuste manual:** `factorPorIngresos` compara los rubros cargados con las cifras
     del .md; en 2003-2006 las filas de la nota de sponsors (en miles) ganaron y la escala salió miles (valores x1000, corregidos a mano).
   - **2022 (.md cambiado), A TRATAR:** (a) que `avisarRegistro` exija confirmados solo los bloques que usa la lectura ganadora (en 2022
     frenaban notas no usadas: se destrabó con 29 ajustes `confirmado`); (b) el rearmado no debería dispararse por la marca de una corrida
     con otro perímetro; (c) `--reintentar` sobre una lista mezclada rehace lo que no hace falta; (d) el caché de localizar/extraer no se
     invalida si el .md cambió (el resolver corrió 4 líneas el estado de 2022).
   - Nota visible para el sitio (no hecha): quiebre de serie 2006 (formato italiano, con extraordinarios) → 2007 (IFRS).
   Cambios de esta tanda: E (voces antes de rearmar; V433), F (lectura 6; V434), G (ajuste `fila` en lecturas 5-6; V435, 437), H (perímetro
   a localizar; V436), `carpetas-clubes --json` sin corte (V438), diccionario de deuda en inglés reactivado (V439). Defectos vistos: el
   ensayo estima extraer con un costo fijo; `compararVecino` no cuenta filas de ajuste; el escalón 1a solo mira "revisar"; "4) Due to banks"
   no matchea por el número adelante; escalón 3 de caja/deuda (media móvil) aprobado y en pausa.
1b. **PRIORIDAD (pedido de Guido, 2026-10-04): una dinámica que no haga pasar lo mismo por las APIs varias veces.** Con Juventus se pagó
   de más varias veces: el lote 13 localizó 2022-2025 antes de que el perímetro llegara a localizar (cambio H) y hubo que relocalizar; un
   `--reintentar` sobre una lista mezclada rehízo 2023-2025 sin necesidad; rearmar una página invalidó la validación del .md entero y hubo
   que pagar el resolver otra vez (2022, ~US$ 1); el ensayo subestima extraer ~5 veces en documentos largos (sorpresas de costo). A diseñar,
   en este orden: (i) **antes del primer lote de un club**, fijar todo lo que cambia lo que se localiza (perímetro, cierre) y avisar si falta;
   (ii) el lote reintenta **solo** los documentos que lo piden, aunque la lista tenga más; (iii) cambiar una página del .md no invalida las
   páginas validadas que no cambiaron (validación por página, no por archivo); (iv) el ensayo estima extraer por el tamaño real de los
   bloques elegidos; (v) en el resumen final, lo gastado en cada documento y por qué (para ver repeticiones).
2. Candidatos después: Ferroviária (Brasil, 12 años, 9 escaneos). Noruegos (Molde, Fredrikstad, Aalesund, Brann): escaneos, esperan el
   escalón 2 de la etapa 2. Guido quiere probar varios clubes a la vez con el mismo esquema de tabla y etapas (mejor si son del mismo país
   o formato).
3. Opcional, sin urgencia: Fortaleza 2017 tiene los sueldos dentro de "gastos generales" (totales bien): `caffeinate -i node tools/lote.mjs
   --lista Admin/lote-08b.txt --ejecutar --reintentar` (~US$ 0,30) y recargar con `cargar.mjs --reemplazar` si las notas 21-22 suman.
4. Defectos vistos con Novorizontino, sin arreglar: el RESULTADO final de `lote.mjs` muestra propuestas de carga viejas ("el club no
   existe" en años ya cargados); el caché de localizar/extraer no se invalida si el .md cambió (hace falta `--rehacer`).
5. Pendientes de la auditoría, no urgentes: escalones automáticos para lo que hoy son ajustes (año del nombre del archivo; resultado final
   que repite el documento siguiente; costos financieros mal rotulados); marcar "no desglosado" distinto de `cero-real` y que la página lo
   muestre (`fiscalYearMeta.sinDesglose`); cerrar casos obsoletos de la cola automáticamente; falso positivo del inventario con números que
   no son cifras contables (firmas digitales); chequeo de coherencia entre años (prototipado, no construido).

Publicación: `inventario-transcripciones` está mergeada entera en `main` (2026-10-02); falta el push, que lo hace Guido (`git push origin main`).

Caja y deuda (`tools/caja-deuda.mjs`, comando aparte, con el club ya publicado; nunca frena; `--medir --club <id>` para medir):

```
 LECTURA DE FILAS  una sola referencia a nota (V421); activo y pasivo en la misma fila = dos filas (V424)
 ESCALA: una por documento (la del estado de resultados contra lo cargado); la del vecino, con SU escala (V418)
 ESCALÓN 0 ajuste manual `caja` del año (V419) · precedente del club
 ESCALÓN 1 diccionario (vocabulario.mjs, sin el código de cuenta, V422) + términos del club (ajuste `deuda-incluye`, V425);
           jerarquía de balancete: padre e hija no se suman; cuenta D no es deuda (V423)
 ESCALÓN 2 IA (solo líneas)
 COMPUERTA (la misma para todos): la familia de la fila es la del dato (V420) y el año anterior cargado o el documento siguiente
           dicen lo mismo ── pasa → dato · no pasa → siguiente escalón · nada → null
```

El escalón 1 propone, además (Versiones 383 y 385): las filas de la nota de efectivo si la caja es una parte de ella (la compuerta compara el
total de la nota del vecino), y el total de la nota de deuda si no hay otra fila de deuda (antes caía en "ninguna fila = 0").

Pendientes:

- Caja y deuda, probado y no adoptado (manta corta, Versión 357+): compuerta con "vecino independiente" (perdía el escalón 0) y lectura en el
  texto del PDF (no sirve en escaneos). Ideas pendientes, a medir solo con un club real: precedente que sume lo cargado en DOS años (Bahia
  2025 aprendió una suma casual); el número del año en un escaneo necesita una segunda lectura (Gemini), como la etapa 4.
- El comentario que escribe `cargar.mjs` en la meta todavía dice "grossDebt/cash: no se leen por script todavía": ahora los completa
  `caja-deuda.mjs` (o los conserva `--reemplazar`).
- Que la página lea `fiscalYearMeta.sinDesglose` y muestre "No declarado" (otra sesión; ya lo usan 8 años cargados).
- Etapa 2, escalón 2: Gemini sobre escaneos enteros (hoy, si no hay estado, queda como fuente).
- Etapas 4 y 8: registrar en qué escalón salió cada dato (las escaleras existen, falta dejarlo escrito por documento).
- Perfil de clubes fuera de Sudamérica (cuando aparezcan documentos de esos clubes).
- Datos ya publicados con categorías dudosas (encontrado por el subagente del perfil, sin tocar): Almagro tiene "Sede Social - Medrano
  522" como cuotas sociales; Grêmio, "Receitas Patrimoniais" como cuotas sociales; Vitória, Bahia y América Mineiro tienen socios en sus
  documentos y no en el sitio.

---

## Cómo trabajamos (reglas de Guido)

- **Antes de cambiar una tool, mostrar el diseño en pocas líneas y esperar el ok.** No escribir código antes.
- **Un cambio por vez.** No mezclar varios arreglos en una tanda.
- **Nada de "manta corta":** cada arreglo se mide antes de entrar; si rompe otros, no entra. Por ahora se mide en **Universidad Católica**
  (`Admin/lote-07.txt`, tiene que dar idéntico) y en **Fortaleza CEIF** (`Admin/lote-08.txt`), más el club en curso. Más adelante: un pool
  fijo de años/clubes de prueba (distintos países, formatos y escaneos) para medir siempre contra el mismo conjunto.
  "Idéntico" es lo que se CARGA. En un escalón que decide (como el precedente de la etapa 7) vale que decida MENOS veces si nunca se equivoca
  más: lo que deja de decidir baja de escalón y pide una segunda mirada (Jev/Claude o la cola). Caso (Versión 403, aprobado por Guido): el
  precedente con la nota deja sin decidir "Otros gastos" de UC 2014 y 2016 (no se equivocan, piden otra mirada); errores de precedente: 0 → 0.
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
- Ajuste `categoria` = MUDAR una fila de lado (salta la compuerta del lado). Para aceptar/corregir dentro del mismo lado: la cola
  (`cola.mjs --corregir-categoria`), que respeta la compuerta. Caso: Novorizontino 2024, "Premiações" es ingreso y gasto.
- **Git:** desde el 2026-10-02 se trabaja directo en `main` (la rama `inventario-transcripciones` quedó mergeada y no se usa más). No hacer
  push: cada push a `main` es un deploy y lo hace Guido. Commitear el código separado de los logs de los lotes. Una entrada en el CHANGELOG
  por cada cambio real.
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
 ESCALÓN 1a (Versión 433) el inventario dice "revisar" → resolver-inventario.mjs (las VOCES): Claude solo en las páginas con cifras que
            no coinciden con el texto del PDF; ignora las dudas en prosa ── compuerta: el inventario queda "listo" → sigue
 ESCALÓN 1b (Versión 395, camino de error) PDF digital, la etapa 4 dice que el .md no coincide con el texto propio y la verificación no
            quedó ok → texto-propio-a-md.mjs rearma esas páginas (gratis) y se vuelve a localizar ── compuerta: etapas 4 y 6
            rearmado, con su escalera (Versión 397): método "columnas" ─► si la etapa 6 sigue sin cerrar, método "regiones" (una vez cada uno)
            COMPUERTA por página (Versión 411): la rearmada tiene que conservar al menos la mitad de las filas de tabla; si no, queda
            la anterior (Novorizontino 2025: estado de resultados girado 90°)
 ESCALÓN 2  (falta) escaneo entero → Gemini o Claude sobre las páginas candidatas
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
 LECTURA 4  + signos impresos; subtotal de un solo renglón; total bruto con deducciones aparte (Versiones 396, 409)
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
- d) **Escaleras chicas** (ya funcionan así; falta registrar en qué escalón salió cada dato):

```
 TIPO DE CAMBIO   ajuste ─► declarado (compuerta: su frase no trae otra fecha que el cierre) ─► en tabla (fecha más nueva) ─► serie oficial ─► cola
 PERÍMETRO        heredado del año cargado más cercano ─► cola
 FECHA DE CIERRE  títulos ─► encabezados de las tablas (ejercicio | un año antes) ─► vecinos ─► cola; compuerta: no más de 2 años después de hoy
 CATEGORÍAS EN 0  ajuste `cero-real` ─► salarios / TV / estadio, o socios / otros deportes según el perfil ─► reintento (una vez) ─► aviso
 LO QUE CERRÓ EN LA ETAPA 6 (Versiones 375-378): financiero e impuesto con el signo con que cerró; una fila verificada con lado no se mueve
                  por palabras ni se excluye sola por "no es rubro" dudoso
```
- Hoy en el lote es solo propuesta: no escribe el sitio.
- Escribir: `cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año; después `caja-deuda.mjs --club <id> [--ejecutar] --escribir`.

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
- Va acá lo que Guido decide forzar. NO va en el HANDOFF ni en una respuesta de la cola (esa se ata al texto de la pregunta).

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

1. `git status` y `git log --oneline -5` en `main`.
2. `node tools/estado.mjs`.
3. Leer este HANDOFF (nada más hace falta para el pipeline).
4. `node tools/cola.mjs` para ver qué está esperando a Guido.
5. Seguir por el plan de la sección "Dónde estamos" (está en orden).
