---
name: start-session
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
| 1 | El comentario HTML al principio de `index.html` (antes de `<html lang>`): ESTADO ACTUAL, QUÉ ES REAL POR CLUB, TO-DO LIST | **siempre** | ~51 KB |
| 2 | `CONVENCIONES.md` | **siempre** | 22 KB |
| 3 | `ARQUITECTURA.md` | si tocás el motor de Finanzas o agregás un club | 8 KB |
| 4 | `.claude/skills/club-data-mapping` | si tocás datos financieros de un club | 73 KB |
| 5 | `.claude/skills/club-or-year-onboarding` | si cargás un club o un ejercicio nuevo | 64 KB |
| 6 | `.claude/skills/club-sourcing` | si BUSCÁS documentos de un club que no tiene nada todavía | 33 KB |
| 7 | `fuentes-por-club.md` | antes de salir a buscar PDFs: mirá qué ya se probó | 33 KB |

**Lo que NO hace falta leer para trabajar**, y conviene no abrir por las dudas:

- `Proyecto Boca.md` (447 KB): es el diario narrativo. Contesta POR QUÉ se decidió algo viejo. Se
  consulta buscando una palabra puntual, nunca de corrido.
- `CHANGELOG.md` (68 KB): contesta QUÉ cambió y CUÁNDO. Mismo criterio, consulta puntual.

Con los puntos 1 y 2 ya podés trabajar. Todo lo demás es a demanda.

---

## 2. Antes de tocar nada: preguntar, no asumir

Las reglas de `CONVENCIONES.md` que dicen "pedido explícito de Guido" no se negocian sin preguntarle.
Si una decisión de esta sesión contradice una de esas, preguntá primero y actualizá el archivo
después, en la misma sesión.

Si al leer un documento fuente queda una pregunta genuina (algo que no se puede inferir con confianza
de la fuente ni de los criterios ya documentados), va a `dudas-por-club.md`, no a un comentario
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
222 checks, 0 que no cierran, 0 warnings.

REGLA: cualquier verificación total tiene que pasar por `computeYearGeneric()`, el motor real. NUNCA
reimplementar la cascada del resultado por afuera — se probó, y una fórmula simplificada tiró 12
falsos positivos porque no contemplaba `nonCash`, `profitOnPlayerSales`, `assetSales` ni `tax`.

---

## 5. Antes de terminar: documentar

Si hubo cualquier cambio real (datos, features, estructura, copy), sin que Guido lo pida:

1. **`index.html`, bloque ESTADO ACTUAL**: es un snapshot, no un log. Si algo que decía ya no es
   cierto, se reemplaza, no se apila una línea nueva al lado de la vieja.
2. **`index.html`, TO-DO LIST**: sacar lo resuelto, agregar lo que quedó pendiente, reordenar si
   cambió la prioridad.
3. **`CHANGELOG.md`**: SIEMPRE una entrada nueva, aunque el cambio sea chico.
4. **`Proyecto Boca.md`**: SOLO si el cambio amerita contexto narrativo (el porqué, el proceso de
   investigación, un bug real con su causa raíz). Un ajuste de UI no lo amerita.
5. **`CONVENCIONES.md`**: si se decidió una regla nueva o se contradijo una vieja.

No dupliques la to-do list en `CHANGELOG.md` ni en `Proyecto Boca.md`: la lista oficial vive sólo en
`index.html`.

Si onboardeaste un club, la sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" de `index.html` se
GENERA, no se escribe a mano: corré `node tools/generate-club-index.js` (ver sección 7).

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

- `node tools/generate-club-index.js` — regenera, desde los propios `data/<club>-data.js`, la sección
  "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" de `index.html`. Corrélo después de onboardear un club
  en vez de escribir el párrafo a mano. `--check` (sin escribir) avisa si la sección quedó
  desactualizada respecto de los datos.

---

## Cómo mantener este skill

Si en una sesión aparece un paso de arranque, de verificación o de cierre que no está acá, agregalo.
Si un paso de acá resultó innecesario, sacalo. Este archivo tiene que poder leerse entero en un
minuto: si crece mucho, es señal de que algo debería vivir en `CONVENCIONES.md` (una regla) o en
`ARQUITECTURA.md` (cómo funciona algo), no acá (qué hacer y en qué orden).
