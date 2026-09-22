---
name: auditoria-finance-of-sports
description: Auditoría de rutina del proyecto finance-of-sports — el chequeo transversal y periódico de que el sitio entero está sano y va a seguir estándolo, distinto de la verificación de onboarding (que revisa el club que se acaba de cargar) y de auditAll() (que revisa que los totales cierren). Busca problemas de datos que un total correcto NO delata, cosas que se van a romper cuando el proyecto escale a cientos de clubes o a otros deportes, bugs de runtime, y dónde se puede ahorrar tokens sin resignar exactitud. Usar cuando Guido pida una auditoría, cada ~5 clubes nuevos, antes de un push grande, o cuando algo se sienta raro y no haya un síntoma concreto que perseguir. Acepta un eje: `datos`, `escala`, `codigo`, `docs`, `tokens`.
---

# Auditoría de rutina de finance-of-sports

## 0. Por qué existe, y qué NO es

El proyecto ya tiene dos verificaciones, y las dos son buenas en lo suyo. Esta es una tercera cosa:

| | Qué contesta | Cuándo | Alcance |
|---|---|---|---|
| Verificación de onboarding (`club-or-year-onboarding` §8) | ¿El club que **acabo de cargar** está bien? | Bloqueante, en esa sesión | Un club, contra el PDF |
| `auditAll()` (`start-session` §4) | ¿Algo dejó de cerrar? | Antes de cada push de datos | Totales, 30 segundos |
| **Esto** | ¿El proyecto **entero** está sano, y va a seguir estándolo? | Periódica, no bloqueante | Transversal |

La diferencia que importa: **el onboarding audita lo que se acaba de tocar; esto audita lo que nadie
tocó hace meses.** Un ejercicio cargado hace 60 versiones no vuelve a pasar por el ojo de nadie, y
`auditAll()` solo confirma que sigue sumando igual que el día que se cargó — incluido el caso en que
se cargó mal desde el principio (si el total oficial se transcribió con el mismo error de escala,
cierra perfecto para siempre).

**Esto NO reemplaza a ninguna de las otras dos, y no las repite.** Asume que la verificación de
onboarding se hizo. No abre PDFs para revalidar números contra la fuente: eso solo lo puede hacer
quien tiene el documento delante. Audita CONSISTENCIA, no fuente.

---

## 1. El procedimiento: 3 capas, en orden

Lo que hace que esto sea barato de correr es que las capas van de lo más determinista a lo más caro,
y cada una acota a la siguiente. **No leas el repo entero: leé lo que la capa 1 marcó.**

### Capa 1 — el script (5 segundos, 0 juicio)

```bash
node tools/audit.js
```

Agrupa todo en P0/P1/P2/P3 y sale con código 1 si hay P0 o P1. `--json` da la lista completa
(el informe humano corta cada grupo en 8), `--quiet` muestra solo P0/P1.

Si la sesión tocó `data/` o el motor, corré **además** `auditAll()` en el navegador (`?audit=1`):
la consola, los listeners y Chart.js no se ven desde Node.

### Capa 2 — lectura dirigida (solo lo marcado)

Por cada hallazgo P0/P1 y por los P2 del eje de esta corrida, abrí **el archivo que el hallazgo
nombra**, no el vecino ni el motor entero. Un hallazgo sin archivo detrás no se reporta.

### Capa 3 — un eje de juicio, rotando

Un solo eje por auditoría, no los cinco. Cuál toca sale del reporte anterior (cada uno registra el
suyo); si Guido pidió uno explícito (`/auditoria escala`), ese manda.

| Eje | Qué mirar, que el script no puede |
|---|---|
| `datos` | Los ejercicios con catch-all alto o sin verificación, contra su `.md` transcripto (NO contra el PDF). ¿La categorización dice algo, o está todo en "Otros"? ¿El criterio contable es el mismo que en clubes parecidos? Y el `brandColor` de los clubes nuevos desde la última auditoría: el script solo ve si el campo ESTÁ, no si el hex es de verdad el del club — que sea el del ESCUDO y no el de la camiseta, o un color del design system del sitio oficial, no lo ve nadie más que vos (ver `club-or-year-onboarding` §3 punto 1b). |
| `escala` | Ver `.claude/skills/escala-finance-of-sports/SKILL.md`: tiene el mapa completo de puntos calientes (con el número en el que se rompe cada uno) y la metodología para actualizarlo. Es una skill aparte porque el mapa es grande y cambia con cada sesión de sourcing/onboarding — meterlo acá bloquearía esta skill genérica. |
| `codigo` | Con el sitio levantado: consola limpia, re-render que no duplica listeners, charts que se destruyen, `loadClubData()` con un club que falla, toggles combinados (moneda × formato × club × año). |
| `docs` | Qué dice dos veces lo mismo, qué se lee en cada sesión sin usarse, qué quedó desactualizado respecto de los datos (`node tools/generate-club-index.js --check`). |
| `tokens` | Dónde se van los tokens de una sesión típica, y qué de eso es automatizable. **Con el §4 de este skill al lado.** |

---

## 2. Severidades, y qué hacer con cada una

| | Qué significa | Qué se hace |
|---|---|---|
| **P0** | Un número publicado está mal, o puede estarlo | Se arregla en esta sesión, antes que nada |
| **P1** | Algo roto o ausente que el visitante ve | Se arregla en esta sesión, o va al tope de la to-do con su motivo |
| **P2** | No está mal hoy; se rompe o no escala mañana | Va a la to-do de `index.html` |
| **P3** | Limpieza e informativo | Queda en el reporte. No ensucia la to-do |

**Nunca bajes la severidad de un hallazgo para que el resumen quede más lindo.** Si un hallazgo está
mal clasificado, se reclasifica en `tools/audit.js` (con el comentario de por qué), no en el reporte.

---

## 3. El reporte

Va a `auditorias/<AAAA-MM-DD>.md`. Estructura fija:

```markdown
# Auditoría <fecha>

**Corrida:** N clubes, M ejercicios · P0 x · P1 x · P2 x · P3 x · eje de juicio: <eje>

## Novedades desde <fecha anterior>
## Resueltos desde <fecha anterior>
## Hallazgos                      (agrupados por severidad y código)
## Eje de juicio: <eje>           (lo que no es asertable)
## Qué se movió a la to-do
```

**El diff contra el reporte anterior no es opcional: es lo que hace que esto sirva más de una vez.**
Sin él, la cuarta auditoría repite los mismos 52 hallazgos y nadie la lee. Leé el reporte anterior
ANTES de escribir el nuevo.

Los P0/P1/P2 que sobrevivan van a la **to-do de `index.html`**, que es la única lista oficial de
próximos pasos del proyecto (`CLAUDE.md`). El reporte no es una segunda to-do.

### Qué mostrarle a Guido en pantalla

10-15 líneas, no el reporte entero: el resumen de una línea, los P0/P1 completos, lo NUEVO respecto
de la auditoría anterior, y el link al archivo. El detalle está en el reporte, para cuando lo quiera.

---

## 4. Tokens: qué se puede recortar y qué NO

El eje `tokens` existe porque el arranque en frío es el costo más repetido del proyecto. Pero esto es
un sitio de finanzas para periodistas e hinchas reales: **un token ahorrado a costa de un número peor
es una mala operación, siempre.**

**PROHIBIDO recortar acá. No es negociable por sesión, ni "solo esta vez":**

- Verificar el OCR fila por fila antes de cargar un ejercicio (`club-data-mapping` §15).
- Re-sumar las líneas en vez de confiar en el total impreso.
- Resumir o saltear partes de una transcripción de PDF (`CLAUDE.md`: es transcripción fiel, no resumen).
- Saltear un tie-out, o cargar un ejercicio sin `officialTotal*` habiendo un total impreso disponible.
- Pre-convertir moneda al cargar el dato (la conversión pasa SIEMPRE al renderizar).
- Silenciar un hallazgo en `tools/audit-ignore.json` sin haber mirado el documento.

**Sí se puede, y es donde conviene buscar:**

- Duplicación de documentación: el mismo dato de un club vive en `ESTADO.md` (antes el comentario de `index.html`, en
  la cabecera de su `data/*.js`, en `CHANGELOG.md` y en `fuentes/`. `tools/generate-club-index.js`
  ya eliminó una copia; medir cuánta queda.
- Lo que se lee en CADA sesión (`start-session` §1) contra lo que de verdad se usa.
- Reabrir un PDF ya transcripto: siempre se usa el `.md`, nunca el PDF de nuevo.
- **Cada chequeo que se automatiza en `tools/audit.js` es un chequeo que deja de costar razonamiento
  para siempre.** Si en una auditoría encontraste algo a ojo que un script podía encontrar solo,
  el trabajo no termina en reportarlo: termina en agregar el chequeo.

---

## 5. El loop que hace que las auditorías se terminen

Una auditoría que solo lista problemas se vuelve ruido en la tercera corrida. La regla:

**Cuando un hallazgo se repite en más de un club, el arreglo no es arreglar los datos: es escribir la
regla en el skill que corresponde.** Tres clubes con la misma mala categorización se arreglan los
tres *y* se agrega la regla a `club-data-mapping`, para que el cuarto no nazca mal. Así cada
auditoría deja menos trabajo para la siguiente en vez de la misma lista de siempre.

Destinos: criterio de categorización/moneda → `club-data-mapping`; proceso de onboarding o
arquitectura a reusar → `club-or-year-onboarding`; dónde buscar documentos → `club-sourcing`; regla
de UI/datos ya decidida → `CONVENCIONES.md`; trampa del entorno → `CLAUDE.md`.

---

## 6. Falsos positivos ya descartados (no volver a "descubrirlos")

Los 4 que tiró la primera versión de `tools/audit.js` y ya están corregidos en el script. Están acá
por si reaparecen en otra forma:

- **`fx: null` no rompe la conversión.** `yearMetaFor()` sustituye el `FX_RATE` placeholder global
  (1450), así que el toggle a moneda nativa muestra un número aproximado, no `$0`. Aproximado y
  callado es un problema distinto (y menor) que un cero.
- **Los `items` de un gasto se guardan en positivo y su línea en negativo.** Comparar con signo da
  un falso positivo en toda línea de gasto desglosada: se comparan magnitudes.
- **Un ingreso negativo o un gasto positivo casi siempre es legítimo** (deducciones sobre a receita
  en Brasil, variación de existencias en España). Solo importa si la línea pesa.
- **Un ejercicio placeholder tiene sus líneas en cero.** No le "faltan" los sueldos: no tiene datos.

- **Un club sin color NO es un dato faltante si dice `brandColor:null`** (Versión 179). `null` es el
  resultado CERRADO de "se miró y no lleva color" — el que lo identifica es el blanco, o es ambiguo
  entre dos (ver `CONVENCIONES.md`) — no un pendiente que alguien tenga que completar: completarlo a
  ojo es exactamente lo que el criterio prohíbe. Lo que sí es un hallazgo es el campo AUSENTE, y para
  eso ya está `club-sin-color-ni-null` (P3) en el script, así que tampoco hace falta mirarlo a mano.

Y uno estructural, del propio motor: **`auditAll()` y `verifyTieOuts()` solo ven los clubes cargados
en memoria.** Cualquier verificación que se escriba en el navegador tiene que forzar la carga primero
(`?audit=1`), o audita Boca y nada más.

---

## Cómo mantener este skill

Si una auditoría encuentra una clase de problema que no está en ningún eje, agregá el eje o
extendelo. Si un chequeo terminó siendo automatizable, movelo a `tools/audit.js` y sacalo de acá —
este archivo es para el juicio, no para lo que una máquina hace mejor. Si un falso positivo costó más
de una vez entenderlo, va a la sección 6. Si el archivo crece tanto que no se lee en dos minutos, es
señal de que algo debería vivir en `CONVENCIONES.md` (una regla) o en `tools/audit.js` (un chequeo).
