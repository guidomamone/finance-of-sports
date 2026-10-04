# HANDOFF: de un PDF a un año cargado en el sitio

Mientras dura la mudanza a archivos propios (Versión 469): el proceso, caja y deuda y las decisiones tomadas están en
`Admin/PIPELINE.md`; lo que se midió y no entró, en `Admin/HALLAZGOS-pipeline.md`. Lo que sigue acá son las reglas de trabajo y los pendientes.

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

Los pendientes del pipeline están en `Admin/TODO.md`, to-dos 138 a 142 (Versión 470): 138 auditoría (incluye caja y deuda), 139 defecto D,
140 escalones y chequeos que faltan, 141 la cola humana, 142 decisiones pendientes de Guido. De a un cambio, con el ok de Guido; siempre
escalera; medir con los lotes de prueba de abajo.

### Lotes de prueba (medir CUALQUIER cambio de script antes y después)

Lo cargado tiene que dar idéntico. Tres listas fijas, sin repetidos: `Admin/prueba-rapida.txt` (16, los casos que ya
rompieron algo una vez), `Admin/prueba-mediana.txt` (34: la rápida + 3 años por club) y `Admin/prueba-completa.txt` (87, todos los
documentos de los 6 clubes). Los `lote-07` a `lote-13` quedan como registro de las corridas reales.

```bash
node tools/lote.mjs --lista Admin/prueba-completa.txt > /tmp/medir-antes.txt 2>&1     # antes del cambio
node tools/lote.mjs --lista Admin/prueba-completa.txt > /tmp/medir-despues.txt 2>&1   # después; diff entre los dos
```

Además, según lo que toque: lo mismo con `--reintentar` (camino de error); `node tools/caja-deuda.mjs --medir --club <id>` (caja y deuda);
`node tools/antes-de-localizar.mjs --lista <lista>` (compuerta de la etapa 3). Lo que no se puede ejercitar con lo cargado se simula en el
scratchpad con copia de seguridad de `Admin/` y se restaura.

Publicación: falta el push, que lo hace Guido (`git push origin main`).

## Caja y deuda: ahora en `Admin/PIPELINE.md`

---

## Cómo trabajamos (reglas de Guido)

- **Antes de cambiar una tool, mostrar el diseño en pocas líneas y esperar el ok.** No escribir código antes.
- **Un cambio por vez.** No mezclar varios arreglos en una tanda.
- **Nada de "manta corta":** cada arreglo se mide antes de entrar; si rompe otros, no entra. Se mide con los **lotes de prueba**
  ("Dónde estamos").
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

## El proceso nuevo: ahora en `Admin/PIPELINE.md`

---

## Decisiones

Tomadas por Guido: ahora en `Admin/PIPELINE.md` ("Decisiones tomadas por Guido").

Pendientes, a decidir con casos reales: ahora en `Admin/TODO.md`, to-do 142 (y 141d, dónde ver la cola).

---

## Lo que falló en los tests o no entró

Los descartes medidos están en `Admin/HALLAZGOS-pipeline.md`.

Lo no construido todavía está en `Admin/TODO.md`, to-dos 140 y 141.

---

## Trampas

- `git status` se ensucia solo mientras Guido corre lotes (logs en `Admin/`, `.md` en `Clubes/`, y desde V444 los `.json` de `Generados/`):
  revisar antes de commitear; los de `Generados/` van con los logs.
- `estado.mjs` mientras corre un lote muestra una foto a mitad de camino.
- Los "Syntax Error" en la terminal son de poppler leyendo PDFs dañados: no son errores del pipeline.
- Para esperar un proceso en segundo plano, usar su PID, no `pgrep -f` (se encuentra a sí mismo y no termina nunca).
- Corridas largas: la Mac se duerme; usar `caffeinate -i`.
- El proceso viejo (`pipeline.mjs --repreparar`) pisa el `.rubros.json` que deja `verificar.mjs`: no re-preparar documentos que pasaron por el
  proceso nuevo.

---

## Cómo arranca la próxima sesión

(2026-10-04, Versiones 441-470) No hay un arreglo en curso: elegir con Guido entre los to-dos 138 a 142 de `Admin/TODO.md`.
Medir cualquier cambio con `Admin/prueba-completa.txt` (y `caja-deuda.mjs --medir` en
TODOS los clubes si toca caja y deuda).

1. `git status` y `git log --oneline -5` en `main`.
2. `node tools/estado.mjs`.
3. Leer este HANDOFF (nada más hace falta para el pipeline).
4. `node tools/cola.mjs` para ver qué está esperando a Guido.
5. Seguir por los to-dos 138 a 142 de `Admin/TODO.md` (están en orden).
