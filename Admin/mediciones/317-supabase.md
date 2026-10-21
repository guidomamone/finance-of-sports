# 317: Supabase como espejo de lectura (experimento descartable)

Medido el 2026-10-21 por Pruebas 1. No es una migración. Scripts: `Admin/mediciones/317-supabase/` (`exportar.mjs`, `auditorias.sql`).

## Qué se hizo, y qué NO

- **No se creó ningún proyecto Supabase.** Del repo solo sale la `anon key` de MI CUENTA (`Admin/api-keys/supabase.env`): sirve para leer con RLS, no para crear tablas, y crear un proyecto aparte pide un token de la cuenta de Supabase de Guido, que esta sesión no tiene ni debe pedir. MI CUENTA no se tocó.
- Lo medido corrió en **Postgres 17 local**, que es el motor que usa Supabase: el SQL y el esquema son los mismos. **Sin medir** quedan la latencia de red, el tiempo de carga por la API y el cupo real del plan gratis (lo de abajo sobre el plan sale de la página de precios, no de una prueba).
- País: **Argentina** (19 clubes, 81 ejercicios, 2.985 líneas; varios con inflación alta, que es lo difícil). Después se repitió con **los 320 clubes** (1.301 ejercicios, 35.885 líneas) para medir escala.

## Esquema y carga

Tres tablas: `clubs`, `club_years` (totales oficiales, `financial`, fx, tipo de documento) y `lines` (una fila por rubro: lado, etiqueta, `category`, `subcategory`, importe). Sale directo de `years[]` del JSON, sin transformar. Lo que NO entra: `adjustments` (`included_in`, `extra_rows`, `no_breakdown`), `sources`, gestiones, pases, resultados.

| | Argentina | 320 clubes |
|---|---|---|
| Exportar JSON → .sql | 0,03 s, 439 KB | menos de 1 s, 5,2 MB |
| Cargar en Postgres | 0,13 s | 1,1 s |
| Tamaño en disco | pocos MB | 13 MB (con un índice) |
| Las 7 consultas de auditoría | 255 ms sin índice | **~40 ms** con un índice en `lines(club_id, fiscal_year, side)`; sin índice, la consulta C3 sola tardó ~30 s |

Costo: 0 US$. El plan gratis (página de precios, 2026-10-21): 500 MB por proyecto, 2 proyectos activos, **se pausa tras 1 semana sin uso**, 5 GB de egress. Los 13 MB de hoy son el 2,6 % del cupo; a 1.000 clubes con 5 ejercicios cada uno (~5.000 ejercicios) serían unos 50 MB. El cupo no es el problema.

## Las tres auditorías, contra lo que ya existe

| Auditoría en SQL | Argentina | Todos | Contra `verifyTieOuts()` / `audit.js` |
|---|---|---|---|
| A. Rubros que no suman (ingresos y gastos contra el total oficial, 0,5 %) | 0 | **247 gastos, 0 ingresos** | `verifyTieOuts()` da 0. Los 247 son **falsos positivos**: el motor compara `expenses + nonCash` y descuenta las partidas que la cascada trata aparte. Es la regla del proyecto («nunca reimplementar la cascada por afuera») probada otra vez. Los ingresos sí se verifican bien en SQL (0 de 1.284) |
| A2. Ejercicio sin líneas de un lado | 0 | 14 | `audit.js` no tiene un chequeo con este nombre; no se miró si los 14 son ejercicios `sinDesglose` legítimos |
| B. Años faltantes (huecos entre el primero y el último) | 15 (Boca 2024 y 2026, Racing 2022-23, River 2022-23, San Lorenzo 2018-23...) | 97 | **`audit.js` no lo hace**: solo tiene `faltantes-desfasado` (que `data/faltantes/` esté al día). Es lo que SQL encuentra y lo otro no, y es una consulta de 6 líneas |
| B2. Atraso del último ejercicio de cada club | 8 clubes a 3-8 años | — | Tampoco está en `audit.js`; `Admin/ESTADO-clubes.md` lo muestra por club pero no lo alerta |
| C. Outlier de ingresos entre clubes (z-score del log, mismo año y moneda) | 0 | 4 | `audit.js` tiene `outlier-liga` (21 hallazgos en todo el sitio, 5 de Argentina, todos Almagro). Mismo objetivo, distinto método: `audit.js` convierte a USD y compara con la mediana de la liga |
| C2. Salto interanual en moneda nativa (>5x o <1/5) | **7, todos falsos positivos** | 21 | En Argentina es inflación (Racing 2024: 19,9x; River 2024: 22,8x). `audit.js` (`salto-interanual`) convierte a USD y no marca ninguno de Argentina. Para hacerlo bien en SQL hay que cargar la tabla de tipos de cambio y los deflactores, o sea duplicar lo que ya hace el JS |
| C3. Una línea >90 % del lado | 0 | 10 | `audit.js` ya lo cubre como `catchall-dominante` (256 hallazgos con su umbral) |

Lo que **`audit.js` encuentra y SQL no**, porque no está en las tres tablas o necesita el motor: signo invertido (30), línea duplicada (927), `sin-salarios` (48), `escala-implausible` (5), moneda sin meta, color del club, generadores desfasados, documentos internos publicados, rutas muertas. Es más de la mitad del catálogo (27 códigos), y casi todo es sobre código y archivos, no sobre datos.

## Tiempo de la auditoría que ya existe

`node tools/audit.js` tardó **15-16 s** en este worktree (320 clubes), no los «menos de un segundo» que dice la skill de arranque. No se investigó si es el worktree, la carga de los `-data.js` o que creció; la skill de arranque quedó desactualizada en ese número (es una observación para la Auditora, no se tocó la skill). SQL hace las auditorías de datos en ~40 ms, pero parte de un `.sql` que hay que regenerar (1 s) cada vez que cambia un JSON.

## Conclusión

**No sirve como medida de cuándo `data/*.js` deja de alcanzar, y no hay que migrar.**

1. Lo que la skill de escala necesita saber es cuándo el *visitante* baja demasiado o cuándo el proceso de mantener los archivos se vuelve inmanejable. Un espejo SQL no mide ninguna de las dos: el sitio baja un `-data.js` por club visitado, y esa medida sale de `wc -c` y de `checkEscala()`.
2. Hoy los 320 clubes caben en 13 MB de Postgres y en 7,2 MB de `-data.js`: ningún cupo está cerca. Lo que sí crece es el costo de las auditorías que cargan todo (`auditAll()`, `audit.js` ~15 s, lineal en clubes: a 1.000 clubes serían ~50 s). SQL las baja a milisegundos, pero solo las de datos.
3. Con las tablas armadas aparecieron **dos chequeos que `audit.js` no tiene** y que valen sin Supabase: años faltantes (B) y atraso del último ejercicio (B2). Se pueden escribir en `audit.js` sobre los JSON en pocas líneas. Es una condición nueva en una tool: **va a la Auditora 4 antes de codear**, no se codeó.
4. El gasto contra el total oficial en SQL puro da falsos positivos; el dato de SQL siempre pasaría por el motor (`computeYearGeneric`) si se quisiera confiar en él.

Si Guido igual quiere ver Supabase real, falta un proyecto aparte con su token (el gratis admite 2 activos; el de MI CUENTA ocupa uno) y volver a correr `exportar.mjs` + `auditorias.sql`; el espejo no debería vivir en MI CUENTA para no mezclar con las búsquedas guardadas.
