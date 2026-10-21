# Una dinámica más rápida (ideas 1 a 4, ok de Guido: «1-4 hacelas»)

Guido: «nos demoramos mucho en el 345 y aún no terminó». Las demoras de hoy: cada sesión esperaba a la principal para ver main, la Auditora aprobaba de a una y por mensaje, y un to-do sin final definido juntó documentos de diez países y cinco formatos. La idea 5 (partir el 345) no se aplica: se termina lo abierto y esto rige desde el próximo punto.

## Idea 1: cada worktree trae main sola (hook ya cambiado; texto para `worktree.md`)

Ancla y texto (`start-session-finance-of-sports-project/worktree.md`, primera línea):

la principal mergea. Para tener lo último de main, la sesión corre `git merge --ff-only main`, solo, en un comando aparte: no mezcla nada. Si git lo rechaza porque la rama tiene commits propios, le pide el merge a la principal.

## Idea 2: lotes de un solo tipo (skill `club-or-year-onboarding`, sección 4, primer punto)

## 4. Reglas de Guido

- **Un lote es de un solo tipo: un país o un formato de documento.** Una lista mezclada (los «documentos en mano» de varios países) se separa primero en grupos. Se carga enseguida lo que pasa con las reglas y tools de hoy; cada documento que pide una regla, una tool o una liga que no existe sale como un punto propio del TODO, y el lote se cierra sin esperarlo.

## Idea 3: cada punto del TODO dice cuándo está terminado (`Admin/CONVENCIONES.md`, no es skill)

- UN PUNTO NUEVO DEL TODO ARRANCA CON «Terminado cuando:»: la lista cerrada de lo que entra (clubes, años, archivos, tools) y la prueba de que está hecho. Lo que aparece en el camino y no está en esa lista va a un punto nuevo; el punto se cierra cuando se cumple su lista, aunque haya salido trabajo nuevo.

## Idea 4: lo que entra sin esperar a la Auditora

Skill `auditoria-finance-of-sports`, sección 7, después de «Una condición que relaja»:

**Una condición que relaja** (como una tabla vacía) se evalúa igual, con la pregunta 3 como la importante.

**Lo que entra sin esperar el veredicto** (la Auditora lo revisa en su corrida siguiente con el mismo criterio, y si no pasa se revierte): un aviso P3 nuevo de `audit.js`, que no frena nada; una mejora que cumple la sección 8 y da 0 años cargados cambiados, medido sobre todo lo cargado. Siguen esperando su veredicto: todo freno (P0, P1, un error o una pregunta nueva en una tool), todo cambio a lo que una tool asume y todo criterio de datos.

Skill `club-or-year-onboarding`, sección 3b, punto 2:

si es una mejora general o un parche, salvo lo que la sección 7 de esa skill deja entrar sin esperarla.
