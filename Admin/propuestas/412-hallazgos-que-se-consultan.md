<!-- md: propuesta del punto 412, que los hallazgos medidos se consulten sin depender de la memoria de la sesión | leer: antes de tocar HALLAZGOS-pipeline.md, el hook de edición de tools o fos existe -->
# 412 — Que los hallazgos se consulten sin depender de la memoria

**La pregunta (Guido).** `Admin/HALLAZGOS-pipeline.md` guarda lo que se midió y no entró (el próximo que piense lo mismo no lo repite). ¿Sirve si depende de que la sesión se acuerde de buscar? ¿Hace falta un orden como el del CHANGELOG, o un hook que obligue?

## Qué pasa hoy (medido)

- 53 KB en 5 secciones de prosa larga; un hallazgo no tiene tema ni tools en un lugar fijo. Se llega a él solo si la sesión decide hacer grep, con la palabra justa.
- Desde el 408, `fos changelog historial <tool>` y `fos existe <palabras>` ya lo buscan: pero la sesión tiene que acordarse de correrlos.
- Ejemplo de esta sesión: la regla de materialidad de Guido ya estaba en `cargar.mjs`, y el texto de `PIPELINE.md` sobre la ventana del perfil quedó desactualizado después de cambiar el comportamiento. En los dos casos el dato existía; faltó consultarlo.

## Qué se hace en proyectos parecidos

- **Un registro de decisiones con un formato fijo y etiquetas** (ADR: una decisión por entrada, con contexto, resultado y estado), buscable por etiqueta.
- **Recordar en el momento justo, sin bloquear** (como los avisos de un linter): el contexto aparece cuando se toca la cosa, no en un documento que hay que abrir.
- Una **compuerta dura** («no se commitea sin haber consultado») se evita cuando el cumplimiento se puede aparentar: se vuelve un trámite.

## Propuesta

1. **Formato por viñeta** (lo nuevo; lo viejo no se migra a mano): `- [tema: identidad del cuadro · tools: cola.mjs, verificar.mjs · 2026-10-23] Qué se midió y por qué no entró.` Una viñeta, una línea de etiquetas al principio. `fos existe` y `fos changelog historial` las encuentran por tema o por tool sin tocar su código.
2. **`fos hallazgo "<tema>" --tools a.mjs,b.mjs --texto "…"`** agrega la viñeta en la sección del día (o la crea), con la fecha, en el formato canónico. Evita la prosa suelta.
3. **Aviso suave al editar una tool**: un hook PostToolUse, la primera vez que se edita `tools/<x>.mjs` en una sesión, agrega al contexto «N hallazgos y M entradas del CHANGELOG nombran x.mjs: `node tools/fos.mjs changelog historial x.mjs`». No bloquea ni pregunta.
4. **Chequeo en `audit.js`** (P3): una viñeta nueva sin la línea de etiquetas.
5. **No se agrega una compuerta obligatoria.**

## Pros y contras

| | Pro | Contra |
|---|---|---|
| Viñeta con etiquetas | Una línea por hallazgo al grepear; `historial <tool>` las muestra | Lo viejo (53 KB) sigue en prosa hasta que alguien lo toque; se encuentra por palabras, no por etiqueta |
| `fos hallazgo` | El formato no depende de la disciplina | Una tool más para recordar; se mitiga con el chequeo de `audit.js` |
| Aviso al primer edit de una tool | Aparece justo cuando hace falta, una vez por tool y sesión | Es ruido si la tool no tiene historial (se omite cuando no hay nada que citar); una sesión puede ignorarlo |
| Sin compuerta dura | No se vuelve un trámite vacío | No garantiza la consulta (queda la responsabilidad de la sesión, con el empujón del aviso) |

## Qué se mide después

Cuántas veces el aviso aparece con historial (útil) contra sin historial (ruido) en las primeras 10 ediciones de tools; si el ruido pasa del 50 %, se acota a las tools con 3 o más citas.
