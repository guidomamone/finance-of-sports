---
name: escala-finance-of-sports
description: Mapa de puntos calientes de escala de finance-of-sports — qué archivo, estructura de datos o proceso funciona bien con 50 clubes (el volumen de hoy) y se rompe entre 200 y 3000 clubes cargados (~5 ejercicios cada uno), con el número aproximado en el que aparece cada uno y cómo particionarlo/indexarlo. Es UN eje entre los cinco de `auditoria-finance-of-sports` (`escala`), separado en su propia skill porque el mapa es grande y evoluciona con cada sesión de sourcing/onboarding, y bloquearía la skill genérica de auditoría si viviera adentro. Usar cuando Guido pida explícitamente un chequeo de escala/capacidad, antes de un cambio grande de arquitectura, o como el contenido del eje `escala` al correr `auditoria-finance-of-sports`.
---

# Escala de finance-of-sports: qué se rompe entre 50 y 3000 clubes

## 0. Por qué existe esta skill y no vive adentro de `auditoria-finance-of-sports`

`auditoria-finance-of-sports` es el PROCEDIMIENTO (3 capas, severidades, formato de reporte) para
CUALQUIERA de sus cinco ejes (`datos`, `escala`, `codigo`, `docs`, `tokens`). Su propia sección "Cómo
mantener este skill" dice la regla que se aplicó acá: *"si el archivo crece tanto que no se lee en
dos minutos, es señal de que algo debería vivir en otro lado"*. El mapa de escala ya no entra en dos
minutos — cada sesión de sourcing agrega países, cada onboarding agrega ejercicios, y el mapa tiene
que actualizar proyecciones y agregar hallazgos nuevos con cada uno. Meterlo adentro de la skill
genérica la volvería un archivo sobre UN eje disfrazado de skill sobre cinco.

Además, a diferencia de los otros cuatro ejes (que se corren dentro de una auditoría de rutina
periódica), Guido ya pidió este eje dos veces fuera de esa cadencia, explícitamente, "porque viene un
cambio grande" — es un chequeo que se invoca solo, no necesariamente empaquetado con los otros
cuatro. Mismo criterio que separó `club-sourcing` de `club-data-mapping` de
`club-or-year-onboarding`: temas relacionados, invocación independiente.

**Esta skill NO reemplaza el procedimiento de `auditoria-finance-of-sports`.** Cuando el eje de una
auditoría de rutina sea `escala`, el reporte se sigue escribiendo con el formato de esa skill
(`auditorias/<fecha>.md`, severidades P0-P3, diff contra el anterior); esta skill es el contenido de
ese eje, no un procedimiento alternativo.

**Tampoco reemplaza `checkEscala()` de `tools/audit.js`.** Ese chequeo automático (clubId hardcodeado
en código, proyección de `data/*.js`, umbrales de archivos pesados) es determinista y barato — corré
`node tools/audit.js` primero, siempre. Esta skill es el juicio que el script no puede automatizar:
qué archivo o proceso, aunque hoy no dispare ningún umbral, va a romperse antes de llegar a 1000
clubes y por qué.

---

## 1. El criterio general, antes del mapa puntual

Tres preguntas para encontrar un cuello de escala que el mapa de abajo todavía no liste (el proyecto
va a seguir cambiando; este criterio es lo que no cambia):

1. **¿Este archivo/estructura se LEE, CARGA o ITERA ENTERO, o solo la porción que hace falta?**
   `index.html`/`ESTADO.md`/`TODO.md` se leen enteros cada sesión — su tamaño importa. `CHANGELOG.md`
   se consulta con grep — su tamaño casi no importa. Un `data/<club>-data.js` se carga bajo demanda,
   uno por visita — no importa cuántos existan, importa cuánto pesa CADA UNO. La misma pregunta
   aplica en el navegador: `clubs.js`/`club-index.js`/`club-leagues.js` se bajan SIEMPRE, antes de
   elegir club; el resto de `data/` es lazy.
2. **¿Su unidad de crecimiento es el CLUB, o algo que crece más rápido que el club?** Un archivo que
   crece por (club, ejercicio) — como `club-leagues.js` — crece ~5x más rápido que uno que crece por
   club a secas, con el promedio de ejercicios/club de hoy. Uno que crece por (club, país, división)
   crece más rápido todavía. Mirá la unidad real, no solo "cuántos clubes hay".
3. **¿Es un archivo único con "una sección por club", mantenido a mano?** Es el patrón que ya rompió
   una vez (`fuentes-por-club.md` antes de la Versión 137) y el que hay que buscar en cualquier lado
   nuevo: si hace falta scrollear o repasar entero para actualizar UN club, no escala aunque hoy
   pese poco. El síntoma no es el tamaño en KB, es el proceso de mantenerlo.

Y una anti-pregunta, para no gastar tiempo donde no hace falta: **¿esto vive en disco pero se sirve
de a uno por visita/sesión?** (`data/<club>-data.js`, `Clubes/<País>/<Club>/`, el detalle de
`fuentes/<País>/<Club>.md`). Si la respuesta es sí, el peso TOTAL en disco no es un cuello aunque sea
grande — un directorio de 1000 carpetas no es más lento de abrir que uno de 41, y el sitio nunca baja
más de un archivo de club por visita.

---

## 2. El mapa de puntos calientes (actualizado 2026-09-17, ver `auditorias/2026-09-17-escala.md`)

Formato de cada fila: **qué**, **a qué volumen se rompe** (con el número, no "no escala"), **estado**.

### A. Documentos que se leen/cargan ENTEROS

| Qué | Hoy | Se rompe en | Estado |
|---|---|---|---|
| `fuentes-por-club.md` (índice de sourcing) | 468 líneas-club, 39 países, 80 KB | YA cruzó el umbral que se le fijó a su gemelo `fuentes.html` (~300); a cobertura de liga completa en 60-80 países, 1500-3000 líneas-club, 250-500 KB | **Vigente.** Partir en `fuentes/_indice/<País>.md` + índice de países en `fuentes-por-club.md`, mismo patrón que ya funcionó una vez con el contenido por club |
| `fuentes.html` | 86,5 KB, ~90 documentos | ~300 documentos (fijado en la auditoría 2026-09-13); a 1000 clubes × ~2 docs/club, ~1,9 MB | **Vigente, sin cambios en 4 días.** Partir por país en `tools/generate-fuentes-page.js` |
| `ESTADO.md`, bloque CLUB-INDEX generado | 4,07 KB / 41 clubes (99 B/club) | ~600 clubes cruza el umbral de 60 KB que `tools/audit.js` ya usa para TODO `ESTADO.md` (que además tiene contenido fijo que sí hay que leer siempre) | **Nuevo.** Mover el bloque generado a un archivo separado (referenciado con puntero), mismo mecanismo que liberó a `index.html` de su comentario en la Versión 138 |
| `index.html` | 128 KB | Umbral propio 150 KB, sin crecimiento por club desde la Versión 138 | Resuelto, monitoreado por `tools/audit.js` |
| `CLAUDE.md`, `TODO.md` | 25-27 KB | No crecen por club (prosa de proceso) | Sano |
| `CHANGELOG.md` / `finance-of-sports-project.md` | 167 KB / 482 KB | Umbrales generosos a propósito (consulta puntual, no lectura entera); el sourcing por lote (país entero en una entrada) amortigua el crecimiento por club | Sano MIENTRAS se mantenga el patrón de "una entrada por lote", no por club individual — vigilar si cambia |

### B. Payload eager del navegador (`index.html` carga 8 archivos de `data/` ANTES de elegir club)

| Archivo | Hoy | Unidad | Proyección |
|---|---|---|---|
| `data/clubs.js` | 405 B/club | club | ~395 KB a 1000 clubes |
| `data/club-index.js` | 173 B/club | club | ~168 KB a 1000 clubes |
| `data/club-leagues.js` | 164 B/ejercicio | **ejercicio, no club** | ~803 KB a 5000 ejercicios (crece ~5x más rápido que los dos de arriba) |
| `data/currency-map.js` | 18 KB hoy | combinación moneda×fecha, compartida entre clubes | sub-lineal, no es cuello proporcional |
| `data/leagues.js`, `category-map.js`, `site-labels.js`, `sources-view.js` | fijos | catálogo/taxonomía | no crecen con clubes |

Suma de los tres que sí escalan: **~38 KB hoy → ~1,4 MB proyectado (37x)**, bajado por cada
visitante antes de elegir un club. **Estado: vigente, ampliado el 2026-09-17** — la auditoría del
2026-09-13 solo había mirado `clubs.js`. Recomendación: adelgazar `clubs.js` (sacar
`reportingCurrency`/`fiscalYearStart` al archivo de cada club) y generar un índice liviano de
`club-leagues.js` (solo temporadas/conteos por liga) separado del detalle completo, que se carga lazy
por país/liga cuando el usuario entra a esa vista del selector — mismo mecanismo que
`loadClubData()`.

### C. Runtime del navegador, sin límite

- **Buscador del selector (`js/selector.js:1982`, `renderBusqueda`)**: sin debounce, filtra
  `Object.keys(CLUB_INDEX)` completo en cada tecla, sin límite de resultados mostrados. A 41 clubes
  invisible; a 1000-3000, cada tecla puede reconstruir cientos de nodos DOM con listener propio.
  **Vigente, nuevo** (el selector jerárquico no existía en la auditoría de escala anterior).
  Recomendación: debounce ~150-200ms + top-N con "mostrar más".
- **Grid de clubes de un país en el constructor de mezcla (línea ~899)**: mismo patrón, sin
  buscador de por medio — todo el país se renderiza de una.

### D. Scripts de `tools/` — confirmado que escalan bien (no gastar tiempo acá)

- `tools/audit.js`: 0,28 s con 41 clubes → ~5-7 s proyectado a 1000. Un solo pase in-memory con el
  motor real (`vm`), sin operación cuadrática.
- `tools/generate-club-index.js`, `tools/generate-fuentes-page.js`: mismo patrón, un pase sobre los
  archivos de club. Sano.
- **`auditAll()` (en el navegador, NO en `tools/`)**: `for (const id of ids) { await
  loadClubData(id); }`, en serie. 114 ms con 41 clubes → ~30 s proyectado a 1000 con latencia real de
  red. Es el chequeo obligatorio antes de cada push de datos. **Vigente hace dos auditorías
  seguidas** — recomendación sin cambios: `Promise.all` en tandas de ~20-30.

### E. Namespacing / IDs

- **`clubId` sin país**: resuelto como MECANISMO, no como migración completa. `checkClubIds()` en
  `tools/audit.js` detecta el momento exacto en que un id heredado deja de ser inequívoco (P2) y
  marca cualquier club nuevo sin país (P2). No requiere más trabajo salvo mantenerlo — es el modelo a
  copiar para el resto de esta lista: un chequeo automático que avisa en el momento en que migrar
  deja de ser prematuro, en vez de migrar todo por las dudas.
- **Carpetas `Clubes/<País>/<Club>/`**: namespaced por país, sin colisión hoy. Riesgo latente (no
  urgente): dos clubes del MISMO país con el mismo nombre corto en ligas/deportes distintos
  colisionarían en la misma carpeta — `fuentes-por-club.md` ya tiene la regla escrita para cuando
  pase (desambiguar en el nombre del archivo), pero es reactiva, no hay chequeo automático todavía.

### F. Documentación "una sección por club" en archivo único, más allá de `fuentes-por-club.md`

- **`data/club-leagues.js`**: 241 líneas hoy, una entrada por club con TODOS sus años inline. Su
  propio comentario de cabecera describe un proceso manual ("una vez por temporada, mirando ascensos
  y descensos") sobre el archivo entero. Es la misma forma que tenía `fuentes-por-club.md` antes de
  partirse, un escalón más adelante en el tiempo. **Nuevo, no urgente todavía** (85 ejercicios se
  repasan en minutos) — decidir el split (por país o por liga) ANTES de que deje de ser viable
  repasarlo de una sentada, no después.
- `dudas-por-club.md` (537 líneas): mismo patrón, hoy chico, sin cruzar ningún umbral. Vigilar.
- Cabeceras de `data/<club>-data.js`: NO es un caso de este problema — ya es 1 archivo por club.

### G. Proceso, no código

- **Backlog de transcripción (`Clubes/`)**: 1234 archivos `.md` en 18 países, para 41 clubes
  efectivamente cargados — Bélgica sola tiene 315. No es un cuello de arquitectura (un directorio
  por club no colisiona ni pesa como problema), es un aviso de ritmo: la fase de
  sourcing+transcripción ya corre ~8x más rápido que la carga real al sitio. El cuello real para
  llegar a 1000-3000 clubes no va a ser ningún archivo de este repo — va a ser el trabajo de sesión
  de mapear y verificar cada balance uno por uno (ver `club-data-mapping`).

### H. Techo del modelo (no es un cuello de volumen, es de alcance)

La taxonomía (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Mercado de
Pases/Resultados/Títulos asumen fútbol; `gestionesByClub` asume un club de socios con presidente
electo. Un club de otro deporte entra hoy con media taxonomía vacía. No se rompe con el VOLUMEN de
clubes, se rompe con la VARIEDAD — mencionado acá porque es la otra dimensión de "escala" que este
mapa no cubre (cantidad, no diversidad), y conviene no confundir las dos.

---

## 3. Cómo correr este chequeo de nuevo

1. `node tools/audit.js` primero, siempre — leé el grupo `escala` (P3 `proyeccion`, P3
   `archivo-pesado`) antes de razonar nada a mano, es determinista y gratis.
2. Repasá la sección 2 de esta skill fila por fila: ¿algo que decía "vigente" se resolvió? ¿algo
   "sano" se acercó a su umbral? Los números concretos (bytes/club, líneas, KB) están ahí para
   volver a calcularlos con `wc -c`/`wc -l`, no para creerlos de memoria — actualizá los que hayan
   cambiado.
3. Aplicá el criterio de la sección 1 a cualquier archivo/estructura NUEVO desde la última corrida
   (una skill nueva, un `data/*.js` nuevo, una vista nueva del selector): ¿se lee/carga entero?
   ¿su unidad crece más rápido que "por club"? ¿es una sección por club en un archivo único?
4. Si el eje de una auditoría de rutina (`auditoria-finance-of-sports`) es `escala`, el reporte sigue
   el formato de esa skill; el contenido de la sección "Eje de juicio: escala" es esta sección 2,
   actualizada.
5. Guardá el reporte en `auditorias/<fecha>-escala.md` (con el sufijo `-escala`, porque puede
   coincidir con otra auditoría del mismo día) y actualizá esta skill con lo que cambió — ver abajo.

---

## Cómo mantener este skill

- **Cuando un hallazgo de esta lista se resuelve**, no se borra la fila: se marca "Resuelto (Versión
  X)" con una línea, igual que hacen `ESTADO.md`/`TODO.md` con los suyos. Si se acumulan muchas filas
  resueltas y el archivo deja de leerse en dos minutos, ESE es el momento de recortar las más viejas
  a una sola línea en la sección de diff del reporte correspondiente y sacarlas de acá.
- **Cuando aparece un cuello nuevo**, agregalo a la categoría que corresponda (A-H) con los tres
  datos mínimos: qué es, a qué volumen se rompe (el número), y la recomendación. Si no encaja en
  ninguna categoría existente, es señal de que el criterio de la sección 1 tiene un hueco — ampliá
  ese criterio, no solo la lista.
- **Cuando un hallazgo de acá se vuelve chequeable en código**, movelo a `checkEscala()` en
  `tools/audit.js` y sacalo de esta lista (o dejalo con una línea "automatizado, ver audit.js"). Un
  cuello que un script detecta solo no necesita vivir en juicio humano.
- Esta skill asume que `auditoria-finance-of-sports` existe y sigue siendo el procedimiento
  compartido de los cinco ejes. Si ese procedimiento cambia (formato de reporte, severidades), esta
  skill no necesita cambiar salvo que el eje `escala` en particular deje de encajar en él.
