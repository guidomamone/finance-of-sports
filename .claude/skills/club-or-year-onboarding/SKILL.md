---
name: club-or-year-onboarding
description: Onboardear clubes en finance-of-sports con el pipeline (de un PDF a un año cargado en el sitio) — correr lotes que Guido ejecuta en su terminal, leer los resultados y la cola humana, cargar con los scripts, y mejorar los scripts de a un escalón con su ok. Usar SIEMPRE que Guido diga "onboarding" o pida cargar un club o un año, y para cualquier cambio a las tools del pipeline (`tools/lote.mjs`, `cargar.mjs`, `caja-deuda.mjs` y las de cada etapa). El proceso etapa por etapa está en `Admin/PIPELINE.md`.
---

# Onboarding de clubes con el pipeline

Onboardear es llevar un PDF de un club hasta el año cargado en el sitio con los scripts del pipeline. La sesión no lee balances ni
categoriza a mano: prepara las corridas, lee lo que dejaron y mejora los scripts. Este skill es CÓMO se trabaja; QUÉ hace cada etapa
está en `Admin/PIPELINE.md`.

## 1. El objetivo

Que un PDF de un club llegue solo hasta el año cargado en el sitio:

- sin gastar tokens de sesión (todo en scripts que corre Guido en su terminal),
- barato en dólares de API,
- sin errores en los números.

Lo que no se puede resolver solo va a una **cola humana**, con instrucciones exactas para que Guido lo mire.

## 2. Al arrancar

1. `git status` y `git log --oneline -5`.
2. `node tools/estado.mjs` (gratis): cada PDF en su etapa y escalón.
3. `node tools/cola.mjs`: qué está esperando a Guido.
4. De `Admin/PIPELINE.md`, solo la etapa que se va a tocar.

## 3. Los dos tipos de sesión

### a) Correr clubes

1. Si el PDF no tiene `.md`, primero se transcribe (`CLAUDE.md`, "Cada PDF nuevo"); lo corre Guido.
2. Armar la lista (`Admin/lote-NN.txt`). Con un club de varios años: todos los años de la etapa más baja juntos.
3. Club nuevo: fijar perímetro y cierre (`node tools/ajustes.mjs`) antes del primer lote, para no pagar dos veces la localización.
   `node tools/antes-de-localizar.mjs --lista <lista>` dice qué falta (gratis).
4. Ensayo: `node tools/lote.mjs --lista Admin/lote-NN.txt` (gratis). Decirle a Guido qué etapa toca, para qué sirve y cuánto cuesta.
5. Guido corre `caffeinate -i node tools/lote.mjs --lista Admin/lote-NN.txt --ejecutar`. Si el final del lote pide `--reintentar` o
   `--rehacer`, va con una lista que tenga SOLO los documentos que lo necesitan, y se lo digo.
6. Leer el resultado: el bloque final que pega Guido (no la terminal entera), `Generados/`, `estado.mjs` y `cola.mjs`. Mostrarlo en un solo mensaje,
   con una tabla año → etapa → por qué frenó → qué necesita, y las decisiones numeradas con la recomendación al lado.
7. Lo que frena se resuelve en este orden: un ajuste manual (gratis, sin preguntar); una pregunta de sí o no de la cola para Guido; si es
   un defecto de un script, una sesión del tipo b).
8. Escribir: `node tools/cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año (club nuevo: `alta-club.mjs` en el mismo
   commit que su primer año). Después caja y deuda: `node tools/caja-deuda.mjs --club <id>` (ensayo); `--ejecutar --escribir` lo corre
   Guido, porque su escalón 2 usa IA.

### b) Mejorar un script

1. Mirar 2-3 casos reales antes de afirmar la causa.
2. Mostrar el diseño en pocas líneas, con la escalera completa y el escalón nuevo, y un ejemplo real que recorra cada escalón. No
   escribir código antes del ok de Guido.
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
    alcanza, va a la cola humana.
- **No perseguir casos sin daño.** Si un defecto no afecta ningún dato cargado ni frena nada hoy, se mide su impacto y se anota en el
  TODO como "conocido, sin daño hoy"; no se diseña un arreglo. Una regla que "siempre incluye/excluye" algo es manta corta: va como
  escalón (probar lo que dijo la IA y, solo si la compuerta no cierra, probar lo otro).
- **Arreglar en los scripts, nunca a mano.** Lo que se repite va a un script de `tools/` con un ensayo que estime el costo. Gastar
  dólares de API está bien; tokens de sesión, no. Archivos grandes se leen con filtros, no enteros.
- **Ejemplos concretos:** club, año, fila, importe, antes y después. Explicar las siglas.
- **Páginas:** decir siempre las dos, "página N del visor (impreso M al pie)".
- **Cola humana:** preguntas concretas de sí o no, nunca exploratorias. Decirle exactamente qué abrir: "abrí el PDF en la página N del visor; en el .md, líneas X-Y; fijate si...".
- **Sin la herramienta de preguntas:** las decisiones van numeradas en el mensaje.
- Ajuste `categoria` = MUDAR una fila de lado (salta la compuerta del lado). Para aceptar/corregir dentro del mismo lado: la cola
  (`cola.mjs --corregir-categoria`), que respeta la compuerta. Caso: Novorizontino 2024, "Premiações" es ingreso y gasto.

## 5. Lotes de prueba (medir CUALQUIER cambio de script antes y después)

Lo cargado tiene que dar idéntico. Tres listas fijas, sin repetidos: `Admin/prueba-rapida.txt` (16, los casos que ya
rompieron algo una vez), `Admin/prueba-mediana.txt` (34: la rápida + 3 años por club) y `Admin/prueba-completa.txt` (87, todos los
documentos de los 6 clubes).

```bash
node tools/lote.mjs --lista Admin/prueba-completa.txt > /tmp/medir-antes.txt 2>&1     # antes del cambio
node tools/lote.mjs --lista Admin/prueba-completa.txt > /tmp/medir-despues.txt 2>&1   # después; diff entre los dos
```

Además, según lo que toque: lo mismo con `--reintentar` (camino de error); `node tools/caja-deuda.mjs --medir` en TODOS los clubes (caja y deuda);
`node tools/antes-de-localizar.mjs --lista <lista>` (compuerta de la etapa 3). Lo que no se puede ejercitar con lo cargado se simula en el
scratchpad con copia de seguridad de `Admin/` y se restaura.

## 6. Trampas

- `git status` se ensucia solo mientras Guido corre lotes (logs en `Admin/`, `.md` en `Clubes/`, y los `.json` de `Generados/`):
  revisar antes de commitear; los de `Generados/` van con los logs.
- `estado.mjs` mientras corre un lote muestra una foto a mitad de camino.
- Los "Syntax Error" en la terminal son de poppler leyendo PDFs dañados: no son errores del pipeline.
- Para esperar un proceso en segundo plano, usar su PID, no `pgrep -f` (se encuentra a sí mismo y no termina nunca).
- Corridas largas: la Mac se duerme; usar `caffeinate -i`.
- El proceso viejo (`pipeline.mjs --repreparar`) pisa el `.rubros.json` que deja `verificar.mjs`: no re-preparar documentos que pasaron por el
  proceso nuevo.

## 7. Lo que el pipeline no cubre

- **Club nuevo:** color de marca, chequeo contra el escudo y liga de cada temporada, a mano: `club-nuevo.md`, en esta misma carpeta.
- **Presupuestos:** `localizar.mjs` no los elige, así que el pipeline no los carga. A mano: `Admin/ARQUITECTURA.md` (ex §11, presupuesto y
  balance del mismo año) y `Admin/CONVENCIONES.md` (ex §15, presupuesto en año calendario).
- **Buscar el PDF:** skill `club-sourcing`.
- **Cómo se ve el club en el sitio:** `Admin/PANTALLA-FINANZAS.md`.

## 8. Al cerrar la sesión

- Cambió una tool → `Admin/PIPELINE.md` al día (ese texto no necesita el ok de Guido).
- Se midió algo y no entró → una línea en `Admin/HALLAZGOS-pipeline.md`.
- Pendiente nuevo o resuelto → `Admin/TODO.md` (lo resuelto se borra).
- Una entrada en `Admin/CHANGELOG.md` por cada cambio real.
- Git: commitear el código separado de los logs de los lotes. Sin push: cada push a `main` es un deploy y lo hace Guido.

## 9. Cómo mantener este skill

Acá van las reglas y el modo de trabajar, que cambian poco; cambiarlas requiere proponerle el texto a Guido. El proceso va en
`Admin/PIPELINE.md`, los pendientes en `Admin/TODO.md`, los descartes medidos en `Admin/HALLAZGOS-pipeline.md` y la historia en
`Admin/CHANGELOG.md`. Si una sección de acá empieza a contar casos uno por uno o cuándo se decidió algo, va a uno de esos archivos.
