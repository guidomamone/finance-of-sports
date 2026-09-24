---
name: start-session-finance-of-sports-project
description: Checklist de arranque y de cierre de CUALQUIER sesión de trabajo en finance-of-sports (el sitio financeofsports.com, "El deporte en Números"). Qué leer antes de tocar nada y en qué orden, qué NO hace falta leer, cómo levantar el sitio local, cómo verificar que no se rompió nada, qué documentar antes de terminar, y la regla de git del proyecto. Usar SIEMPRE al empezar una sesión acá, sea cual sea la tarea (datos, UI, docs, onboarding de un club). Si la tarea además toca datos financieros de un club, este skill te manda a los otros 3 (club-sourcing, club-data-mapping, club-or-year-onboarding) en el momento correcto.
---

# Arrancar (y cerrar) una sesión en finance-of-sports

Este skill existe porque el costo más repetido del proyecto es el arranque en frío: una sesión que no
sabe qué hay cargado ni qué criterios ya se decidieron, o que lee 600 KB de documentación para hacer
un cambio de 3 líneas. Esto es el piso mínimo y el orden correcto.

**Este skill no reemplaza a `CLAUDE.md`.** CLAUDE.md se carga solo, siempre, y tiene las reglas
permanentes. Esto es el procedimiento.

---

## 1. Leer, en este orden, y parar cuando alcance

| # | Qué | Cuándo | Peso |
|---|---|---|---|
| 1 | `Admin/ESTADO.md`: qué hay armado hoy, y qué hay cargado de cada club | **siempre** | 38 KB |
| 2 | `Admin/CONVENCIONES.md` | **siempre** | 48 KB |
| 2b | `Admin/TODO.md`: qué falta hacer, en orden de prioridad | **siempre** | 23 KB |
| 3 | `Admin/ARQUITECTURA.md` | si tocás el motor de Finanzas o agregás un club | 17 KB |
| 4 | `.claude/skills/club-data-mapping` | si tocás datos financieros de un club | 84 KB |
| 5 | `.claude/skills/club-or-year-onboarding` | si cargás un club o un ejercicio nuevo | 71 KB |
| 6 | `.claude/skills/club-sourcing` | si BUSCÁS documentos de un club que no tiene nada todavía | 115 KB |
| 7 | `fuentes/README.md` (índice de países) → `fuentes/_indice/<País>.md` | antes de salir a buscar PDFs: mirá qué ya se probó. Leé SOLO el país que te toca | 10 KB + 2-8 KB por país |

**Los KB de esta tabla los chequea `node tools/audit.js`** (`doc-peso-desfasado`, P3, agregado en
la auditoría de docs del 2026-09-20): existen para decidir qué abrir y qué no, así que un número
desactualizado no es cosmético — cuando se midió, `club-sourcing` decía 33 KB y pesaba 91, y
`Admin/CHANGELOG.md` decía 68 y pesaba 189. Si el chequeo se queja, actualizá el número acá.

**Lo que NO hace falta leer para trabajar**, y conviene no abrir por las dudas:

- `Admin/finance-of-sports-project.md` (488 KB): es el diario narrativo. Contesta POR QUÉ se decidió algo viejo. Se
  consulta buscando una palabra puntual, nunca de corrido.
- `Admin/CHANGELOG.md` (245 KB): contesta QUÉ cambió y CUÁNDO. Mismo criterio, consulta puntual.

Con los puntos 1 y 2 ya podés trabajar. Todo lo demás es a demanda.

---

## 2. Antes de tocar nada: preguntar, no asumir

Las reglas de `Admin/CONVENCIONES.md` que dicen "pedido explícito de Guido" no se negocian sin preguntarle.
Si una decisión de esta sesión contradice una de esas, preguntá primero y actualizá el archivo
después, en la misma sesión.

Si al leer un documento fuente queda una pregunta genuina (algo que no se puede inferir con confianza
de la fuente ni de los criterios ya documentados), va a `Admin/dudas-por-club.md`, no a un comentario
perdido en el código ni a un criterio inventado. Esa es la lista que Guido usa para escribirle
directo a los clubes.

---

## 3. Levantar el sitio local

El sitio es estático (HTML + CSS + JS, sin build, sin backend). Usá `preview_start` con la config de
`.claude/launch.json`, nunca un server por Bash.

`window.ASSET_V` (arriba de los `<script src>` en `index.html`) es la versión de los assets propios.
**Si tocás cualquier archivo de `js/` o `data/` y el navegador te sigue mostrando lo viejo, subí
ASSET_V** a un valor que nunca se haya pedido antes (ej. `118a`), navegá, confirmá, y dejalo en un
valor limpio al terminar. El caché de este entorno es agresivo y NO se rinde con reload, Cmd+Shift+R,
pestaña nueva ni cambio de puerto: cambiar la URL exacta es lo único que funciona.

---

## 4. Verificar antes de dar algo por bueno

**`auditAll()` es el chequeo real del proyecto.** Abrí `?audit=1` o corrélo en la consola: fuerza la
carga de TODOS los clubes y corre las 2 verificaciones (`verifyTieOuts()` compara la suma de los
rubros de cada ejercicio contra el total que ese balance imprime; `checkFxSanity()` revisa que cada
tipo de cambio caiga en un rango plausible).

Por qué importa: los clubes se cargan por demanda, así que una carga normal de la página audita SOLO
Boca. Sin `auditAll()`, un error en un club que nadie está mirando es invisible.

**Correlo siempre antes de pushear algo que toque datos.** El resultado esperado hoy es 41 clubes,
228 checks, 0 que no cierran, 0 warnings.

**`node tools/audit.js` es el otro lado de lo mismo** (Versión 122). `auditAll()` verifica que cada
ejercicio CIERRE contra su propio documento; `audit.js` busca lo que cierra igual: ejercicios sin
ningún total contra qué compararse, categorías con typo o prestadas de la otra taxonomía, errores de
escala (un `fx` mal transcripto deja todos los tie-outs en verde y publica un número 1000 veces más
grande), desgloses que se contradicen con su propia fila, catch-all dominante, ramas por club.
Corre en menos de un segundo y sale con código 1 si hay P0 o P1. Hoy (2026-09-22, Versión 196): 0 P0, 0 P1, 0 P2, 7 P3.
Los 8 P2 que había hasta la 195 eran todos `.md` internos sueltos en la raíz: se cerraron de una
mudándolos a `Admin/`, que `netlify.toml` saca entera del deploy con un solo `rm -rf`. **Desde la Versión 183 también chequea que los 4
generadores estén al día** (`checkGenerados()`, P1): si tocaste `js/` o `data/` y subiste
`ASSET_V`, hay que regenerar `fuentes.html` y sus 41 páginas, porque ese generador LEE `ASSET_V`
de `index.html`.

Para una auditoría DE RUTINA (no la verificación de un cambio puntual: el chequeo periódico de que
el proyecto entero está sano y va a seguir estándolo) el procedimiento completo está en
`.claude/skills/auditoria-finance-of-sports/SKILL.md`. Cadencia sugerida: cada ~5 clubes nuevos,
antes de un push grande, o cuando algo se sienta raro sin un síntoma concreto que perseguir.

REGLA: cualquier verificación total tiene que pasar por `computeYearGeneric()`, el motor real. NUNCA
reimplementar la cascada del resultado por afuera — se probó, y una fórmula simplificada tiró 12
falsos positivos porque no contemplaba `nonCash`, `profitOnPlayerSales`, `assetSales` ni `tax`.

---

## 5. Antes de terminar: documentar

Si hubo cualquier cambio real (datos, features, estructura, copy), sin que Guido lo pida:

1. **`Admin/ESTADO.md`**: es un snapshot, no un log. Si algo que decía ya no es cierto, se reemplaza, no
   se apila una línea nueva al lado de la vieja. Su sección "QUÉ ES REAL POR CLUB" se GENERA
   (`node tools/generate-club-index.js`), no se escribe.
2. **`Admin/TODO.md`**: BORRAR lo resuelto (no marcarlo "RESUELTO" y dejarlo, que es como la lista vieja
   terminó con la mitad de los puntos siendo cosas ya hechas), agregar lo que quedó pendiente,
   reordenar si cambió la prioridad. Los números son identificadores estables, no prioridad.
3. **`Admin/CHANGELOG.md`**: SIEMPRE una entrada nueva, aunque el cambio sea chico.
4. **`Admin/finance-of-sports-project.md`**: SOLO si el cambio amerita contexto narrativo (el porqué, el proceso de
   investigación, un bug real con su causa raíz). Un ajuste de UI no lo amerita.
5. **`Admin/CONVENCIONES.md`**: si se decidió una regla nueva o se contradijo una vieja.

No dupliques la to-do list en `Admin/CHANGELOG.md` ni en `Admin/finance-of-sports-project.md`: la lista oficial vive sólo en
`Admin/TODO.md`.

**SI TOCASTE DATOS DE UN CLUB, HAY 3 ARCHIVOS GENERADOS QUE HAY QUE REGENERAR** (Versión 184; lo
chequea `node tools/audit.js` como P1, así que no hace falta acordarse — pero sí saber qué correr):

```
node tools/generate-club-index.js      # la sección "QUÉ ES REAL POR CLUB" de Admin/ESTADO.md
node tools/generate-fuentes-page.js    # fuentes.html, las 41 páginas de club y sitemap.xml
node tools/generate-rankings.js        # data/rankings/<liga>.js, lo que muestran Inicio y Ligas
```

Y **si subiste `ASSET_V`** —aunque no hayas tocado un solo dato— hay que correr
`generate-fuentes-page.js` igual: ese generador LEE `ASSET_V` de `index.html` y lo escribe en las 42
páginas, así que sin eso el visitante recibe el JS nuevo en el sitio y el viejo de su caché en la
página de fuentes.

---

## 6. Git: la regla del proyecto

- **`git commit` local: libre.** Después de cada chunk verificado, sin preguntar.
- **`git push`: SIEMPRE hay que pedirle permiso explícito a Guido, cada vez.** No importa cuánto
  trabajo se acumuló ni qué tan verificado esté. Un "dale" general o pasar a la tarea siguiente NO es
  autorización.

Por qué: el repo está conectado a Netlify con deploy automático al pushear a `main`, y el plan es el
free tier (~25 deploys/mes). Un commit local no dispara nada; un push sí.

---

## 7. Herramientas del repo

- `node tools/audit.js` — auditoría determinista del proyecto entero, agrupada en P0/P1/P2/P3.
  `--json` para la lista completa, `--quiet` para usarlo como gate antes de un push.
  `tools/audit-ignore.json` silencia un hallazgo YA verificado a mano contra el documento, con el
  motivo escrito — nunca uno sin verificar, que es justo el atajo que este proyecto no se puede dar.
  `--fx` (Versión 125) no audita: LISTA. Imprime los 89 tipos de cambio, uno por club-ejercicio,
  agrupados por moneda y ordenados por año, con de dónde salió cada uno (lo declara el balance, es
  la premisa de un presupuesto, es una cotización de mercado de `FX_CLOSE`, o todavía no se sabe).
  Es la respuesta a "¿de dónde salió este número?" sin abrir un solo archivo de club.
- `node tools/generate-fuentes-page.js`: regenera `fuentes.html`, el listado completo de documentos
  fuente del sitio (la página pública que linkean la ficha de Finanzas y la pestaña Fuentes), desde
  `sources{}` y los `fiscalYearMeta`. Corrélo después de cargar un club o de tocar una fuente.
  `--check` avisa si quedó vieja. NO editar `fuentes.html` a mano: se sobrescribe.
- `node tools/generate-club-index.js` — regenera, desde los propios `data/<club>-data.js`, la sección
  "QUÉ ES REAL POR CLUB" de `Admin/ESTADO.md`. Corrélo después de onboardear un club
  en vez de escribir el párrafo a mano. `--check` (sin escribir) avisa si la sección quedó
  desactualizada respecto de los datos.
- `node tools/generate-rankings.js` (Versión 182) — precalcula el ranking de ingresos de cada
  liga-ejercicio en `data/rankings/<liga>.js`, uno por liga. Corrélo después de cargar un club o
  un ejercicio. `--check` avisa si quedó viejo (y `audit.js` lo corre solo, como P1), `--print`
  imprime los rankings para verificarlos contra la fuente. Es lo que alimenta la pestaña Ligas.
- `node tools/generate-fuentes-index.js` (Versión 175) — regenera, desde los propios
  `fuentes/_indice/<País>.md`, la sección "Índice de países" de `fuentes/README.md`: la línea de
  cada país con sus 3 números (clubes trackeados, cuántos con documento, chequeo más antiguo) y el
  párrafo de totales. Corrélo después de CUALQUIER sesión de sourcing, en vez de actualizar la línea
  del país a mano. `--check` avisa si quedó vieja; `--debug` imprime la clasificación club por club.
  **Lo que hay que saber antes de usarlo**: "con documento encontrado" no es un campo, es prosa libre
  del agente de sourcing, así que se infiere con dos listas de regex (señales de SÍ / señales de NO).
  Cuando una línea matchea señales de los dos lados o de ninguno, el script ABORTA en vez de
  adivinar, y la decisión se toma a mano leyendo el `fuentes/<País>/<Club>.md` y se escribe en
  `OVERRIDES`, adentro del script, con el motivo. Hoy hay 12 overrides, de la corrida original. Si
  aborta, no es un bug: es el diseño.

---

## Cómo mantener este skill

Si en una sesión aparece un paso de arranque, de verificación o de cierre que no está acá, agregalo.
Si un paso de acá resultó innecesario, sacalo. Este archivo tiene que poder leerse entero en un
minuto: si crece mucho, es señal de que algo debería vivir en `Admin/CONVENCIONES.md` (una regla) o en
`Admin/ARQUITECTURA.md` (cómo funciona algo), no acá (qué hacer y en qué orden).
