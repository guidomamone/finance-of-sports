# 247 — Registro público de correcciones: diseño

Estado: PROPUESTA, para el ok de Guido. Solo diseño: no se tocó el sitio ni `tools/`. Los números salen de un prototipo de lectura
(compara versiones consecutivas de cada `-data.js` del historial de git; ~1 minuto para los 319 clubes). La implementación espera el ok
y el merge del 241 (toca `index.html`).

## 1. De dónde sale cada corrección

**Del historial de git de cada club, generado solo** (`tools/generar-correcciones.mjs`, nuevo). Para cada club se recorre
`git log --follow` de su archivo de datos (pasó por `data/<club>-data.js`, `data/<país>/<id>-data.js` y hoy `<id>.json`; `--follow` cubre las
mudanzas), se lee cada versión con el mismo evaluador de `tools/json-datos.mjs` (el JS viejo y el JSON dan el mismo objeto) y se comparan
versiones consecutivas. Se cachea por sha del blob.

**Qué se compara.** Una fila se identifica por `(año, lado, rótulo, n-ésima aparición)`, NO por posición: el prototipo con posición dio
falsos cambios en cada recarga de un año (Fortaleza 2020: 57 «valores» que eran filas reordenadas). Campos con registro: `amount`,
`category`; por ejercicio: totales oficiales, `gross_debt`, `cash`, moneda, `fx`, fuente, perímetro (`report_type`).

**Medido sobre el historial (2026-09-04 a hoy, 319 archivos):** 117 commits con algún cambio sobre un año ya publicado. Por tipo, en filas:
339 de categoría, 68 de valor, 124 de reestructuración de filas (año con filas sumadas o quitadas) y 24 años retirados; además 1.754 filas
de años nuevos, que NO son correcciones. Hay tandas grandes (un solo commit cambia 93 categorías), por eso el registro agrupa por
**evento = (commit, club, año)** y muestra las filas adentro.

**Motivo, en capas; nunca se inventa.**
1. Texto público escrito a propósito: `Admin/registros/correcciones.jsonl` (curado, una línea por evento: `commit`, `club`, `año`,
   `motivo_es`, `motivo_en`, `fuente` opcional). Es lo único que el sitio muestra como motivo.
2. Para eventos sin esa línea, un candidato para que alguien lo apruebe: el cuerpo del commit (hay buenos: «el valor real impreso en el PDF
   es 12.326.234, confirmado con zoom y sum-check») y el ajuste de `Admin/registros/ajustes-manuales.jsonl` del mismo club y año con
   fecha del commit ±1 día (trae `motivo`, `evidencia` con página y línea, `autor`). El generador los escribe en un borrador, no en el sitio.
3. Sin ninguna: el sitio dice «Motivo no registrado» y el tipo («recategorización», «valor»). Esa es la respuesta honesta para el historial
   viejo; los asuntos de commit («Versión 172: …», «to-do 103») son jerga interna y no se publican.

**Para adelante:** un trailer `Corrige: <motivo en una frase>` en el commit que cambia un dato publicado, y `audit.js` avisa
`correccion-sin-motivo` (P2) si un commit modificó un valor o categoría de un año publicado y no tiene ni trailer ni línea curada.
Hoy `ajustes.mjs` ya pide motivo y evidencia; el motivo público es una frase aparte, sin números de to-do.

## 2. Qué cuenta como corrección

| Cuenta (se publica) | No cuenta (no se publica) |
|---|---|
| **Valor**: cambia el `amount` de una fila de un año ya publicado | Año nuevo, o club nuevo (es una carga) |
| **Categoría**: la misma fila pasa a otro rubro | Filas nuevas dentro de un año recién cargado (misma tanda de carga) |
| **Reestructuración**: un año publicado suma, quita o parte filas (se muestra el total antes y después del lado afectado) | Reordenar filas, cambiar el rótulo sin cambiar categoría ni importe, redondeos menores a 1e-6 |
| **Ejercicio retirado** (se publicó y se sacó) | Renombrar ids (246), regenerar `-data.js`, subir `ASSET_V`, cambios de fuentes de texto, gestiones, resultados deportivos |
| **Total, caja o deuda** que cambia de valor, o pasa de valor a «—» | Caja o deuda que pasa de «—» a un valor (ampliación: se lista aparte, filtrable, no es corrección) |
| **Moneda, tipo de cambio, fuente o perímetro** de un año | |

Dos reglas para que no haya ruido: (a) un evento con más de la mitad de las filas del año cambiadas se muestra como **un** evento
«Ejercicio recargado» con ingresos, gastos y resultado antes y después, y las filas quedan plegadas; (b) la ventana de carga: los cambios
de un año hechos dentro de su propia tanda de alta (mismo día de su primera publicación) no se cuentan.

## 3. Dónde se publica

1. **Página propia `correcciones.html`**, con link en el pie junto a `metodologia.html`. Es lo que el periodista cita: tabla de eventos
   ordenada por fecha, filtros por club, país, tipo y año; cada fila lleva club, ejercicio, qué cambió, antes y después, fecha y motivo,
   con el sha del commit que enlaza al repo público si Guido decide mostrarlo (decisión 3). Arriba, una línea de método: cómo se genera
   y qué cuenta como corrección.
2. **Bloque en la pestaña Finanzas del club**, chico, debajo de «Quién auditó estos números»: «Correcciones a estos números», con los
   últimos eventos del club y un link a la página filtrada (`correcciones.html?club=<id>`). Si el club no tiene correcciones, el bloque
   NO se esconde: dice «Sin correcciones desde <fecha de inicio del registro>» (que un club no tenga es información). Un ejercicio
   corregido lleva una marca discreta en su card de ejercicio, con el mismo link.
3. **Dato abierto al lado de los JSON de clubes:** `data/correcciones/correcciones.json` (todo, con `schema_version`, `generated_at` y
   `registro_desde`) y `data/correcciones/<país>.json` si el total pesa; más `correcciones.csv` plano para periodistas. Cada evento:
   `id` (`<clubId>-<año>-<sha7>`), `club_id`, `fiscal_year`, `fecha`, `tipo`, `cambios[]` con `{lado, rotulo, campo, antes, despues, moneda}`,
   `motivo_es`, `motivo_en`, `fuente`, `commit`. Importes en millones de la moneda del club, igual que los JSON de clubes (`unit`). Se
   describe en `metodologia.html` y en el Data Package (`tools/exportar-paquete.mjs`).

El archivo se **regenera** (no se edita): `node tools/generar-correcciones.mjs` (`--check` para `audit.js`, como los otros generadores).
Solo cuenta lo que ya está en `main`.

## 4. Decisiones para Guido

1. **Desde cuándo.** (a) Desde 2026-10-20, cuando el JSON pasó a ser la fuente: arranca limpio, casi vacío, y crece. (b) Con el historial
   desde 2026-09-04, 117 commits, con motivo «no registrado» en la mayoría y los pocos buenos curados a mano (River, Racing, Fortaleza…).
   Recomiendo (b) marcado «anterior al registro» y filtrado por defecto a «desde el registro»: un registro de transparencia vacío no
   dice nada, y las correcciones viejas existen. Si te asusta mostrar tanta tanda de recategorizaciones, (a).
2. **Idioma del motivo:** español y inglés curados (como el resto del sitio), o solo español con el inglés traducido al generar.
3. **Link al commit:** mostrar el sha con link al repo `guidomamone/finance-of-sports` (hoy privado: entonces solo el sha, sin link) o
   no mostrarlo. Recomiendo mostrar el sha corto sin link hasta que haya repo público.
4. **Aviso para no apilar jerga:** si aprobás el trailer `Corrige:` y el chequeo P2 en `audit.js` (regla de proceso nueva).

## 5. Implementación, después del ok y del merge del 241

1. `tools/generar-correcciones.mjs` + `Admin/registros/correcciones.jsonl` + `--check` en `audit.js` (solo `tools/`, sin pantalla).
2. Curar los motivos de los ~20 eventos con más impacto (valor, retiros y recargas) con subagentes: leen el cuerpo del commit y el ajuste.
3. `correcciones.html` + el bloque en Finanzas (`index.html`, `js/`, claves en `data/lang/`), con mockup ya aprobado y `ASSET_V`.
4. Documentar: `metodologia.html`, `Admin/PANTALLA.md`, `Admin/CONVENCIONES.md` (el trailer).

Mockup: ver el artifact enlazado por la sesión principal.
