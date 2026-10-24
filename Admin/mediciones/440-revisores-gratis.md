<!-- md: qué encuentran hoy en tools/ y cuánto tardan los revisores automáticos gratis y locales que se probaron para el 440 | leer: antes de sumar otro chequeo estático a audit.js o a fos --check -->
# 440: revisores automáticos gratis y locales sobre tools/

Conclusión: de lo que corre sin instalar nada nuevo, 15 reglas de eslint de las que encuentran errores reales dan 0 hallazgos en 247 archivos (cuestan 1 s cada una), así que se pueden activar sin ruido junto a `no-undef`; `no-unused-vars` da 303 (220 son imports sin uso, 43 archivos: código muerto que dejaron las particiones) y conviene como P4 informativo, no como P3; los ciclos entre módulos son 34 (informativos, ninguno probado como causa de un error) y los exports que ningún otro archivo nombra son 85 candidatos. TypeScript `checkJs`, `knip` y `madge` NO se probaron: requieren `npm install` (bajar paquetes de la red), decisión de Guido.
Destino: la línea de `Admin/TODO.md` (punto 440, qué queda) y, si Guido lo aprueba, `tools/eslint.config.mjs` + el aviso de `audit.js` `nombre-sin-definir` ampliado. No se activó nada.

## Cómo se midió (2026-10-24)

`tools/node_modules/.bin/eslint` (10.13.0, ya instalado por el 433) con una configuración de prueba fuera del repo (una regla por corrida, nivel `warn`), sobre los 247 `.mjs` y `.js` de `tools/` y `tools/hooks/`. Los tiempos son de la corrida completa (arranque incluido). Los chequeos propios (ciclos, exports) son scripts de 20 líneas con regex sobre los `import` y `export`, sin dependencias.

## Resultados

| Revisor | Hallazgos hoy | Tiempo | Lectura |
|---|---|---|---|
| `no-undef` (ya activa en `fos indefinidos`) | 0 | 1,1 s | el 433 arregló el único caso (`BIG_CHUNK`) |
| `no-dupe-keys`, `no-unreachable`, `no-redeclare`, `no-const-assign`, `no-self-assign`, `no-dupe-else-if`, `no-case-declarations`, `no-fallthrough`, `no-cond-assign`, `no-prototype-builtins`, `no-unsafe-finally`, `no-loss-of-precision`, `no-inner-declarations`, `no-async-promise-executor`, `no-unused-labels` | 0 cada una | 1,0 s cada una | sin ruido: activables como P3 de un solo código |
| `no-sparse-arrays` | 1 (`tablero.mjs:55`) | 1,0 s | falso positivo: `const [, casos, docs] = …` salta un elemento a propósito |
| `no-empty` | 7 en 5 archivos | 1,0 s | son `try { … } catch {}` donde un fallo se ignora a propósito (miré dos: `pre-tool.mjs:350`, `todo.mjs:140`): ruido, no activar |
| `no-useless-escape` | 14 en 11 archivos | 1,0 s | estilo, no errores: no activar |
| `no-unused-vars` (args y errores de catch sin mirar) | 303 en 64 archivos: 220 imports sin uso en 43 archivos y 83 variables o funciones | 1,1 s | los imports sin uso son lo que deja partir un módulo (`alta-club`, `cargar`, `lote`); no rompen nada, pero un nombre importado y no usado esconde que el código ya no lo necesita. P4 informativo con el conteo |
| Ciclos entre `.mjs` de tools/ (script propio sobre `import … from './x.mjs'`) | 34 ciclos, casi todos entre un módulo y los que salieron de partirlo (`alta-club` con `alta-club-lectura`, `-escribir` y `-backtest`; `categorizar-claude` con `-backtest` y `-listos`) | menos de 1 s | ESM tolera un ciclo si los nombres se usan dentro de funciones; el riesgo es un `export const` usado al cargar el módulo. Ninguno de los 34 causó un error hasta ahora; informativo |
| Exports que ningún otro archivo de tools/ nombra (script propio, por nombre) | 85 candidatos | menos de 1 s | aproximado (el mismo nombre en otro archivo cuenta como uso; un export usado solo dentro de su archivo o por una prueba también figura): una lista para mirar, no un aviso |

## Cuántas veces una sesión leyó código para encontrar lo mismo

En el CHANGELOG y en HALLAZGOS solo hay UN caso escrito de un nombre sin definir (`BIG_CHUNK`, 433). La partición del 399 (cargar, alta-club, lote, verificar, audit) no deja constancia de corridas perdidas por imports; el punto 440 lo dice de memoria de la sesión. No hay número que sostenga más de uno.

## No probado (necesita bajar paquetes de npm)

- TypeScript en modo `checkJs` (propiedades inexistentes): `npm install typescript`.
- `knip` (archivos y exports sin uso, con más precisión que el script propio) y `madge` o `dependency-cruiser` (ciclos con un grafo real): `npm install`.
- Links muertos en los `.md`: ya lo hace `ruta-muerta` de `audit.js`.
Instalar paquetes es decisión de Guido; con ese ok se prueban con la misma tabla.

## Qué haría falta para activar lo que vale

1. Sumar las 15 reglas con 0 hallazgos a `tools/eslint.config.mjs` y que `indefinidos.mjs` las cuente (hoy filtra `no-undef`); un P3 con un código nuevo (`error-estatico`) y su entrada en `audit-acciones.json`. Cambia una tool que `audit.js` llama: se mide.
2. `no-unused-vars` (solo imports) como P4 con el conteo, y limpiar los 220 imports de a un archivo con `fos reemplazar`.
