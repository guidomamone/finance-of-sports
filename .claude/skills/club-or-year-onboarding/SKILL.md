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
4. De `Admin/PIPELINE.md`, solo la etapa que se va a tocar. Si el cambio altera lo que pasa ENTRE etapas (un ajuste, una huella, qué archivo lee la siguiente), antes `Admin/CONTRATO-ETAPAS.md` (una página).
5. Una tool de más de 50 KB no se lee entera: `node tools/fos.mjs mapa tools/<archivo>` y `Read` con `offset` y `limit` del tramo que el mapa señala (`--buscar <texto>` filtra).

## 3. Qué abrir y cuándo (cada archivo está en esta carpeta; las secciones conservan su número)

| La tarea es | Abrí |
|---|---|
| correr un lote, cargar un año o dar de alta un club (3a) | `correr-clubes.md` y `reglas.md` |
| arreglar o sumar una tool del pipeline, y medir antes y después (3b y 5) | `mejorar-script.md` y `reglas.md` |
| cargar sin API, con tokens de sesión (3c) | `carga-con-tokens.md` |
| un club nuevo: color, escudo, liga de cada temporada (7) | `club-nuevo.md` |
| algo frenó, una trampa rara, o un club, liga o deporte nuevo (6 y 7) | `trampas.md` |
| un club colombiano que deposita en SIIS (estado de resultados y balance como datos, no PDF) | `node tools/club-siis.mjs "<Club>"` (dice qué falta y con qué comando) y `Admin/paises/co.md`, «Pipeline de Colombia: los estados de SIIS»; SIIS es el estado primario oficial y las «NOTAS EF» son solo las notas |
| correr UNA tool que ya existe (un ensayo, un script de datos) | nada de esto: la cabecera de la tool y la etapa de `Admin/PIPELINE.md` |

Sesión de tipo c) (cargar con tokens): si Guido pide cargar «con tokens», el procedimiento está en `carga-con-tokens.md`. La sesión no edita `tools/`: lo que falte va a
`Admin/registros/frenados-por-script.jsonl`.


## 8. Al cerrar la sesión

- Cambió una tool → `Admin/PIPELINE.md` al día (ese texto no necesita el ok de Guido).
- Se midió algo y no entró → una línea en `Admin/HALLAZGOS-pipeline.md`.
- El resto del cierre (nota de sesión en un worktree, o TODO, CHANGELOG y ESTADO en la principal): `CLAUDE.md`, «Antes de terminar la sesión».
- Commitear el código separado de los logs de los lotes.

## 9. Cómo mantener este skill

Acá van las reglas y el modo de trabajar, que cambian poco; cambiarlas requiere proponerle el texto a Guido. El proceso va en
`Admin/PIPELINE.md`, los pendientes en `Admin/TODO.md`, los descartes medidos en `Admin/HALLAZGOS-pipeline.md` y la historia en
`Admin/CHANGELOG.md`. Si una sección de acá empieza a contar casos uno por uno o cuándo se decidió algo, va a uno de esos archivos. Sin historia ni contadores: ver `CLAUDE.md`.
