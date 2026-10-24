<!-- md: qué encuentran hoy en tools/ y cuánto tardan los revisores automáticos gratis y locales que se probaron para el 440 | leer: antes de sumar otro chequeo estático a audit.js o a fos --check -->
# 440: revisores automáticos gratis y locales sobre tools/

Conclusión: se activaron 14 reglas de eslint (de las 15 probadas: `no-inner-declarations` no marca nada en un módulo con eslint 10, lo mostró la prueba) junto a `no-undef`, con 0 hallazgos hoy y 1 s de costo (P3 `error-estatico`), y los 220 imports sin uso como P4 `imports-sin-uso`. TypeScript `checkJs` NO suma: 270 errores en tools/, casi todos ruido de código sin tipos (una propiedad que se agrega después de crear un objeto, una unión `string | number` que el código distingue a mano), y no ve el error que importa (una propiedad mal escrita de un objeto literal de JS). `madge` y `knip` funcionan pero solo dan información (38 ciclos entre módulos partidos, 205 exports sin uso): no se dejaron instalados.
Destino: `tools/eslint.config.mjs` (ERRORES), `tools/indefinidos.mjs`, los avisos `error-estatico` e `imports-sin-uso` de `audit.js` (entradas en `tools/audit-acciones.json`), `tools/probar-eslint.mjs` (la prueba de cada regla) y el punto 440, que se cierra.

## Cómo se midió (2026-10-24)

`tools/node_modules/.bin/eslint` (10.13.0, ya instalado por el 433) con una configuración de prueba fuera del repo (una regla por corrida, nivel `warn`), sobre los 247 `.mjs` y `.js` de `tools/` y `tools/hooks/`. Los tiempos son de la corrida completa (arranque incluido). Los chequeos propios (ciclos, exports) son scripts de 20 líneas con regex sobre los `import` y `export`, sin dependencias.

## Resultados

| Revisor | Hallazgos hoy | Tiempo | Lectura |
|---|---|---|---|
| `no-undef` (ya activa en `fos indefinidos`) | 0 | 1,1 s | el 433 arregló el único caso (`BIG_CHUNK`) |
| `no-dupe-keys`, `no-unreachable`, `no-redeclare`, `no-const-assign`, `no-self-assign`, `no-dupe-else-if`, `no-case-declarations`, `no-fallthrough`, `no-cond-assign`, `no-prototype-builtins`, `no-unsafe-finally`, `no-loss-of-precision`, `no-inner-declarations`, `no-async-promise-executor`, `no-unused-labels` | 0 cada una | 1,0 s cada una | sin ruido: activadas como P3 `error-estatico`, salvo `no-inner-declarations`, que en un módulo de eslint 10 no marca nada (lo mostró `probar-eslint.mjs`) |
| `no-sparse-arrays` | 1 (`tablero.mjs:55`) | 1,0 s | falso positivo: `const [, casos, docs] = …` salta un elemento a propósito |
| `no-empty` | 7 en 5 archivos | 1,0 s | son `try { … } catch {}` donde un fallo se ignora a propósito (miré dos: `pre-tool.mjs:350`, `todo.mjs:140`): ruido, no activar |
| `no-useless-escape` | 14 en 11 archivos | 1,0 s | estilo, no errores: no activar |
| `no-unused-vars` (args y errores de catch sin mirar) | 303 en 64 archivos: 220 imports sin uso en 43 archivos y 83 variables o funciones | 1,1 s | los imports sin uso son lo que deja partir un módulo (`alta-club`, `cargar`, `lote`); no rompen nada, pero un nombre importado y no usado esconde que el código ya no lo necesita. P4 informativo con el conteo |
| Ciclos entre `.mjs` de tools/ (script propio sobre `import … from './x.mjs'`) | 34 ciclos, casi todos entre un módulo y los que salieron de partirlo (`alta-club` con `alta-club-lectura`, `-escribir` y `-backtest`; `categorizar-claude` con `-backtest` y `-listos`) | menos de 1 s | ESM tolera un ciclo si los nombres se usan dentro de funciones; el riesgo es un `export const` usado al cargar el módulo. Ninguno de los 34 causó un error hasta ahora; informativo |
| Exports que ningún otro archivo de tools/ nombra (script propio, por nombre) | 85 candidatos | menos de 1 s | aproximado (el mismo nombre en otro archivo cuenta como uso; un export usado solo dentro de su archivo o por una prueba también figura): una lista para mirar, no un aviso |

## Cuántas veces una sesión leyó código para encontrar lo mismo

En el CHANGELOG y en HALLAZGOS solo hay UN caso escrito de un nombre sin definir (`BIG_CHUNK`, 433). La partición del 399 (cargar, alta-club, lote, verificar, audit) no deja constancia de corridas perdidas por imports; el punto 440 lo dice de memoria de la sesión. No hay número que sostenga más de uno.

## Las que necesitaban bajar paquetes (probadas con permiso de Guido, 2026-10-24)

Se instalaron en `tools/` (typescript 5.9.3, knip 6.43.0, madge 8.0.0, @types/node 22: 88 MB contra 19 MB), se probaron con un defecto plantado y sobre tools/, y se desinstalaron.

| Revisor | Defecto plantado | Sobre tools/ | Tiempo | Lectura |
|---|---|---|---|---|
| TypeScript `checkJs` (`tsc --noEmit --allowJs --checkJs`) | encuentra `"x".toUppercase()` («Did you mean toUpperCase»); NO encuentra `objeto.nonbre` en un objeto literal de JS (los objetos de JS se consideran abiertos) | 270 errores: 192 «la propiedad no existe» (147 sobre objetos propios a los que el código les agrega una propiedad después), el resto uniones y comparaciones. En una muestra de 24 de los que no son «propiedad no existe», ninguno era un error real: `s === P` entre el resultado de una fase y la propuesta es a propósito, y `acum` se usa como booleano y como texto | unos segundos | no suma: mucho ruido, y no ve el error que sí importa (un nombre de propiedad mal escrito) |
| madge (`--circular`) | encuentra el ciclo `a.mjs > b.mjs` | 38 ciclos (mi script propio daba 34): casi todos entre un módulo y los que salieron de partirlo | menos de 1 s | información: un ciclo ESM funciona si los nombres se usan dentro de funciones; ninguno de los 38 causó un error. No se activó |
| knip (`--include-entry-exports`) | lista los exports que nadie importa | 205 exports sin uso, muchos usados solo dentro de su archivo (pruebas, re-exports) | 0,6 s | información para una limpieza; mi script propio daba 85 por nombre. No se activó |

## Qué quedó activo

1. `tools/eslint.config.mjs` (`ERRORES`: 14 reglas) e `indefinidos.mjs`: cada hallazgo de esas reglas es el P3 `error-estatico` de `audit.js`; `no-undef` sigue siendo `nombre-sin-definir`. `tools/probar-eslint.mjs` comprueba que cada regla encuentra su defecto en un archivo de juguete y que uno limpio no da nada (así una regla que no hace nada, como `no-inner-declarations`, no pasa por buena).
2. Los imports sin uso (`indefinidos.mjs --imports`, 220 en 43 archivos) son el P4 `imports-sin-uso`; se limpian de a un archivo.
