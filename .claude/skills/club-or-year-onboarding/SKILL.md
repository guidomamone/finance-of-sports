---
name: club-or-year-onboarding
description: Onboardear clubes en finance-of-sports con el pipeline (de un PDF a un año cargado en el sitio) — correr lotes en segundo plano, leer los resultados y la cola humana, cargar con los scripts, y mejorar los scripts de a un escalón con su ok. Usar SIEMPRE que Guido diga "onboarding" o pida cargar un club o un año, y para cualquier cambio a las tools del pipeline (`tools/lote.mjs`, `cargar.mjs`, `caja-deuda.mjs` y las de cada etapa). El proceso etapa por etapa está en `Admin/PIPELINE.md`.
---

# Onboarding de clubes con el pipeline

Onboardear es llevar un PDF de un club hasta el año cargado en el sitio con los scripts del pipeline. La sesión no lee balances ni
categoriza a mano: prepara las corridas, lee lo que dejaron y mejora los scripts. Este skill es CÓMO se trabaja; QUÉ hace cada etapa
está en `Admin/PIPELINE.md`.

## 1. El objetivo

Que un PDF de un club llegue solo hasta el año cargado en el sitio:

- sin gastar tokens de sesión (todo en scripts de `tools/` que la propia sesión corre en segundo plano),
- barato en dólares de API,
- sin errores en los números.

Lo que no se puede resolver solo va a una **cola** de preguntas de sí o no, con su cita. La contesta un subagente (Guido no la revisa); a
Guido se le pregunta solo lo que el subagente no puede decidir y frena el alta de un club o la carga de un año.

## 2. Al arrancar

1. `git status` y `git log --oneline -5`.
2. `node tools/estado.mjs` (gratis): cada PDF en su etapa y escalón.
3. `node tools/cola.mjs`: qué está esperando a Guido.
4. De `Admin/PIPELINE.md`, solo la etapa que se va a tocar.

## 3. Los dos tipos de sesión

### a) Correr clubes

1. La etapa 2 (transcribir con Mistral y validar el inventario: primero la validación gratis, y solo las páginas dudosas se pagan) la hace `tools/pipeline.mjs`, no el lote: `lote.mjs` saltea los PDFs sin `.md` y
   arranca en la etapa 3. Ensayo: `node tools/pipeline.mjs --dir "Clubes/<País>/<Club>" --max-paginas 0 --limit 0`; la sesión
   corre lo mismo con `caffeinate -i` y `--ejecutar`, dentro de su presupuesto (`Admin/CONVENCIONES.md`). `--max-paginas 0` incluye los PDFs de más de 100 páginas (sin él quedan para el
   final). El costo es el del ensayo (cuenta páginas); el de `estado.mjs` es fijo por documento y subestima los PDFs largos.
2. Armar la lista (`Admin/lotes/lote-NN.txt`). Club nuevo (alta): un solo ejercicio en el lote, el más reciente que traiga estado de resultados completo. Cuando el alta esté hecha y la cola de ese año contestada, el resto de los años va en el lote siguiente, donde las respuestas del primero ya sirven de precedente y no se repiten las preguntas. Club que ya está en el sitio: todos los años de la etapa más baja juntos. Un documento sin
   estado de resultados (informe del auditor, memoria sola) no va a la lista: se le propone a Guido para `Admin/registros/documentos-descartados.txt`
   (el lote los saltea) y entra ahí solo con su ok. Un balance de menos de 12 meses (le falta el otro tramo del ejercicio) tampoco va a
   la lista: va a `Admin/registros/documentos-parciales.txt` con lo que cubre y lo que falta, también con su ok. Antes de crear la lista, `ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -3` y tomar el
   número siguiente; nunca reusar uno. Al cerrar un lote, su lista va a `Admin/Archive/lotes/`.
3. Club nuevo: el lote fija el perímetro solo (`perimetro-senales.mjs`, con la regla de `Admin/CONVENCIONES-DATOS.md`) y deduce el
   cierre de los documentos vecinos. `node tools/antes-de-localizar.mjs --lista <lista>` dice qué falta (gratis). Un ajuste a mano
   (`node tools/ajustes.mjs`) solo para lo que el lote frena e imprime, antes de localizar, para no pagar dos veces la localización.
4. Ensayo: `node tools/lote.mjs --lista Admin/lotes/lote-NN.txt` (gratis). Decirle a la principal qué etapa toca, para qué sirve y cuánto cuesta.
5. La sesión corre `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar` en segundo plano, y con `--cargar` si lo que quede listo se
   escribe en esa misma corrida (`tools/cargar-lote.mjs`: alta del club, un commit por año; si ningún año entra, revierte el alta). Si el
   final del lote pide `--reintentar`, va con una lista que tenga SOLO los documentos que lo necesitan, y se lo digo.
6. Leer el resultado: la salida del lote (no la terminal entera), `Generados/`, `estado.mjs` y `cola.mjs`. Mostrarlo en un solo mensaje,
   con una tabla etapa · ejercicios · qué significa la etapa · qué falta (solo lo pendiente: los cargados y descartados van en una línea
   aparte), y las decisiones numeradas con la recomendación al lado.
7. Lo que frena se resuelve en este orden: un ajuste manual (gratis, sin preguntar); la cola, que contesta un subagente (ver "La cola" en la sección 4); si es
   un defecto de un script, se anota en `Admin/registros/frenados-por-script.jsonl` (pdf, defecto, detalle, sesión, fecha), se deja ese
   documento y se sigue con el resto. Lo arregla la sesión de pipeline, la única que edita `tools/` (`Admin/CONVENCIONES.md`, "ONBOARDING
   CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA"). En un caso de categoría de la cola, `descartar` se rechaza: para sacar la fila es
   `corregir --valor no_es_rubro`, y vale solo para ese documento. Un ajuste manual lo firma quien corre `tools/ajustes.mjs` (Claude si lo
   corre Claude Code, Guido si no; `--autor` lo fuerza).
8. Escribir: lo que el lote dejó listo entra con `--cargar`. Lo que no, a mano: `node tools/cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año (club nuevo: `alta-club.mjs` en el mismo
   commit que su primer año). Después caja y deuda: `node tools/caja-deuda.mjs --club <id>` (ensayo); `--ejecutar --escribir` lo corre
   la sesión si el ensayo gratis entra en el presupuesto; si no, se frena y se avisa a la principal.
   Club nuevo: antes de cargar su primer año, un subagente Sonnet revisa contra el documento lo que propuso el alta (nombre legal, tipo
   de documento y fecha de cierre); lo que esté mal se corrige con un ajuste (`name`, `reportType`, `cierre`). Si el nombre legal quedó
   como pregunta en la cola (la portada y lo más frecuente no coinciden), el subagente propone la respuesta con cita del documento. Se
   commitean todos los archivos que lista "Alta escrita (...)", también `data/currency-map.js`.

### b) Mejorar un script

1. Mirar 2-3 casos reales antes de afirmar la causa.
2. Mostrar el diseño en pocas líneas, con la escalera completa y el escalón nuevo, y un ejemplo real que recorra cada escalón. No
   commitear antes del veredicto de la sesión auditora. A Guido va solo lo que agrega un criterio de datos o endurece una compuerta
   (`Admin/CONVENCIONES.md`).
3. Medir antes y después con los lotes de prueba (sección 5).
4. Un commit por cambio. La tool lleva cabecera y comentarios largos; `Admin/PIPELINE.md` queda al día.

## 4. Reglas de Guido

- **Un cambio por vez.** No mezclar varios arreglos en una tanda.
- **Siempre escalera, nada de manta corta.** Cada arreglo es un escalón con UNA compuerta, la misma para todos; los escalones solo
  proponen. Nada de condiciones especiales por caso apiladas una arriba de otra. Un arreglo que rompe un caso que antes salía bien no
  entra. "Idéntico" es lo que se CARGA: en un escalón que decide vale que decida MENOS veces si nunca se equivoca más; lo que deja de
  decidir baja de escalón y pide una segunda mirada (Jev/Claude o la cola). Caso: el precedente con la nota deja sin decidir "Otros
  gastos" de UC 2014 y 2016 (no se equivocan, piden otra mirada); errores de precedente: 0 → 0.
- **Dos caminos, no más reglas:**
  - camino limpio: reglas pocas y estrictas; si todo cierra sin interpretar nada, se carga solo;
  - camino de dudas: lo que no pasa no se "arregla" con otra regla; se le pregunta a la IA algo puntual con cita del documento, y si tampoco
    alcanza, va a la cola.
- **No perseguir casos sin daño.** `Admin/HALLAZGOS-pipeline.md`, sección "Conocido, sin daño hoy", es SOLO para un defecto que no
  afecta ningún dato cargado ni frena nada: se mide su impacto y se anota con la condición para retomarlo, y no se diseña un arreglo.
  Un defecto que frena una carga no va ahí: va a `Admin/registros/frenados-por-script.jsonl` (sección 3a, punto 7) y sigue el circuito de
  `Admin/CONVENCIONES.md` (Pipeline arregla, la Auditora aprueba). Si la condición de un caso de HALLAZGOS se cumple, pasa a ese
  circuito. Una regla que "siempre incluye/excluye" algo es manta corta: va como
  escalón (probar lo que dijo la IA y, solo si la compuerta no cierra, probar lo otro).
- **Arreglar en los scripts, nunca a mano.** Lo que se repite va a un script de `tools/` con un ensayo que estime el costo. Gastar
  dólares de API está bien, dentro del presupuesto de la sesión (`Admin/CONVENCIONES.md`); tokens de sesión, no. Archivos grandes se leen con filtros, no enteros.
- **Ejemplos concretos:** club, año, fila, importe, antes y después. Explicar las siglas.
- **Páginas:** decir siempre las dos, "página N del visor (impreso M al pie)".
- **La cola (Guido no la revisa).** Preguntas concretas de sí o no, con la página del visor y las líneas del .md. Las contesta un subagente
  Sonnet, un club por vez: lee el criterio de `club-data-mapping` y los precedentes del país, abre cada caso en el .md y devuelve decisión +
  cita + seguridad, o "no sé" con la pregunta concreta. Claude revisa contra el documento las correcciones grandes (cambio de bloque, una
  fila que sale con `no_es_rubro`, una fila mixta) antes de aplicarlas con `cola.mjs --responder`, firmadas "Claude <fecha> (subagente
  Sonnet)". Un "no sé" que frena el alta de un club o la carga de un año se le pregunta a Guido, de sí o no y diciéndole exactamente qué
  abrir ("abrí el PDF en la página N del visor; en el .md, líneas X-Y; fijate si..."); si es algo que solo el club sabe, va a
  `Admin/dudas-por-club.md`.
- Ajuste `categoria` = MUDAR una fila de lado (salta la compuerta del lado). Para aceptar/corregir dentro del mismo lado: la cola
  (`cola.mjs --corregir-categoria`), que respeta la compuerta. Caso: Novorizontino 2024, "Premiações" es ingreso y gasto.

## 5. Lotes de prueba (medir CUALQUIER cambio de script antes y después)

Lo cargado tiene que dar idéntico. Tres listas, sin repetidos: `Admin/lotes/prueba-rapida.txt` (a mano: los casos que ya rompieron
algo una vez, cada uno con su motivo en un comentario), `Admin/lotes/prueba-mediana.txt` (la rápida + 3 documentos por club: el más viejo,
el del medio y el más nuevo) y `Admin/lotes/prueba-completa.txt` (todos los documentos con verificación). La mediana y la completa las arma
`node tools/lotes-prueba.mjs --escribir`; correrlo cuando entran clubes o años nuevos. Un caso nuevo que rompió algo va a la rápida, con su motivo.

```bash
node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt > <carpeta de scratchpad de la sesión>/medir-antes.txt 2>&1     # antes del cambio
node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt > <carpeta de scratchpad de la sesión>/medir-despues.txt 2>&1   # después; diff entre los dos
# la ruta del scratchpad va escrita entera, sin /tmp ni variables
```

Además, según lo que toque: lo mismo con `--reintentar` (camino de error); `node tools/caja-deuda.mjs --medir` en TODOS los clubes (caja y deuda);
`node tools/antes-de-localizar.mjs --lista <lista>` (compuerta de la etapa 3). Lo que no se puede ejercitar con lo cargado se simula en el
scratchpad con copia de seguridad de `Admin/` y se restaura.

## 6. Trampas

- `git status` se ensucia solo mientras corre un lote (logs en `Admin/`, `.md` en `Clubes/`, y los `.json` de `Generados/`):
  revisar antes de commitear; los de `Generados/` van con los logs.
- `estado.mjs` mientras corre un lote muestra una foto a mitad de camino.
- Los ensayos no llaman a ninguna API, pero reescriben el registro (`Admin/registros/transcripciones-estado.jsonl`) y la lista temporal de la
  corrida: que aparezcan en `git status` después de un ensayo no quiere decir que algo cambió de verdad.
- **Compuerta de estadio y sponsor** (`estadio-sponsor.mjs`, la corre `cargar.mjs` antes de escribir un año): frena el alta si al ejercicio le
  falta estadio o sponsor. Se completa a mano en `tools/contexto-manual.json`, con fuente. Alcanza el estadio, sin sponsor, en una liga amateur
  (la del catálogo nombra "amateur") y en las segundas que figuran en `SOLO_ESTADIO` (hoy `nl-eerstedivisie`, `no-1divisjon`, `no-2divisjon`),
  porque ahí no hay fuente del sponsor por temporada. La lista vigente está en `estadio-sponsor.mjs`, no la copies acá.
- Los "Syntax Error" en la terminal son de poppler leyendo PDFs dañados: no son errores del pipeline.
- Para esperar un proceso en segundo plano, usar su PID, no `pgrep -f` (se encuentra a sí mismo y no termina nunca).
- Corridas largas: la Mac se duerme; usar `caffeinate -i`.

## 7. Lo que el pipeline no cubre

- **Club nuevo:** color de marca, chequeo contra el escudo y liga de cada temporada, a mano: `club-nuevo.md`, en esta misma carpeta.
- **Presupuestos:** `localizar.mjs` no los elige, así que el pipeline no los carga. A mano: `Admin/ARQUITECTURA.md` (ex §11, presupuesto y
  balance del mismo año) y `Admin/CONVENCIONES.md` (ex §15, presupuesto en año calendario).
- **Buscar el PDF:** skill `club-sourcing`.
- **Rusia:** no sale de PDFs. `tools/bfo-rusia.mjs` lee los JSON del fisco (`Clubes/Rusia/<Club>/bfo-AAAA-datos.json`); el detalle, en
  `Admin/PIPELINE.md`, sección Rusia.
- **Cómo se ve el club en el sitio:** `Admin/PANTALLA.md`.

## 8. Al cerrar la sesión

- Cambió una tool → `Admin/PIPELINE.md` al día (ese texto no necesita el ok de Guido).
- Se midió algo y no entró → una línea en `Admin/HALLAZGOS-pipeline.md`.
- El resto del cierre (nota de sesión en un worktree, o TODO, CHANGELOG y ESTADO en la principal): `CLAUDE.md`, «Antes de terminar la sesión».
- Commitear el código separado de los logs de los lotes.

## 9. Cómo mantener este skill

Acá van las reglas y el modo de trabajar, que cambian poco; cambiarlas requiere proponerle el texto a Guido. El proceso va en
`Admin/PIPELINE.md`, los pendientes en `Admin/TODO.md`, los descartes medidos en `Admin/HALLAZGOS-pipeline.md` y la historia en
`Admin/CHANGELOG.md`. Si una sección de acá empieza a contar casos uno por uno o cuándo se decidió algo, va a uno de esos archivos. Sin historia ni contadores: ver `CLAUDE.md`.
