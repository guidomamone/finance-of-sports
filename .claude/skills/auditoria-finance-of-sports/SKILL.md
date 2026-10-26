---
name: auditoria-finance-of-sports
description: Auditoría de rutina del proyecto finance-of-sports. El chequeo transversal y periódico de que el sitio entero está sano y va a seguir estándolo, distinto de la verificación de onboarding (que revisa el club que se acaba de cargar) y de auditAll() (que revisa que los totales cierren). Busca problemas de datos que un total correcto NO delata, cosas que se van a romper cuando el proyecto escale a cientos de clubes o a otros deportes, bugs de runtime, y dónde se puede ahorrar tokens sin resignar exactitud. Usar cuando Guido pida una auditoría, cada ~5 clubes nuevos, antes de un push grande, o cuando algo se sienta raro y no haya un síntoma concreto que perseguir. Acepta un eje: `datos`, `escala`, `codigo`, `docs`, `tokens`, `ux`.
---

# Auditoría de rutina de finance-of-sports

## 0. Qué es, y qué NO es

El proyecto ya tiene dos verificaciones, y las dos son buenas en lo suyo. Esta es una tercera cosa:

| | Qué contesta | Cuándo | Alcance |
|---|---|---|---|
| Verificación de onboarding (etapa 6 de `Admin/PIPELINE.md`, `verificar.mjs`, y la compuerta de `cargar.mjs`) | ¿El club que **acabo de cargar** está bien? | Bloqueante, en esa sesión | Un club, contra el PDF |
| `auditAll()` (`start-session` §4) | ¿Algo dejó de cerrar? | Antes de cada push de datos | Totales, rápido |
| **Esto** | ¿El proyecto **entero** está sano, y va a seguir estándolo? | Periódica, no bloqueante | Transversal |

La diferencia que importa: **el onboarding audita lo que se acaba de tocar; esto audita lo que nadie
tocó hace meses.** Un ejercicio cargado hace mucho no vuelve a pasar por el ojo de nadie, y
`auditAll()` solo confirma que sigue sumando igual que el día que se cargó, incluido el caso en que
se cargó mal desde el principio (si el total oficial se transcribió con el mismo error de escala,
cierra perfecto para siempre).

**Esto NO reemplaza a ninguna de las otras dos, y no las repite.** Asume que la verificación de
onboarding se hizo. No abre PDFs para revalidar números contra la fuente: eso solo lo puede hacer
quien tiene el documento delante. Audita CONSISTENCIA, no fuente.

---

## 1. El procedimiento: 3 capas, en orden

Las capas van de lo más determinista a lo más caro, y cada una acota a la siguiente. **No leas el
repo entero: leé lo que la capa 1 marcó.**

### Capa 1: el script (segundos, 0 juicio)

```bash
node tools/audit.js
```

Agrupa todo en P0 a P4 y sale con código 1 si hay P0 o P1. `--json` da la lista completa
(el informe humano corta cada grupo en 8), `--quiet` muestra solo P0/P1.

Si la sesión tocó `data/` o el motor, corré **además** `auditAll()` en el navegador (`?audit=1`):
la consola, los listeners y Chart.js no se ven desde Node.

### Capa 2: lectura dirigida (solo lo marcado)

Por cada hallazgo P0/P1 y por los P2 del eje de esta corrida, abrí **el archivo que el hallazgo
nombra**, no el vecino ni el motor entero. Un hallazgo sin archivo detrás no se reporta.

### Capa 3: un eje de juicio, rotando

Un solo eje por auditoría, no los seis. Cuál toca sale del reporte anterior (cada uno registra el
suyo); si Guido pidió uno explícito (`/auditoria escala`), ese manda.

| Eje | Qué mirar, que el script no puede |
|---|---|
| `datos` | **Se corre POR PAÍS, no sobre el proyecto entero.** A qué país le toca: el que tenga la fecha más vieja (o "nunca") en el campo **Última auditoría de datos** de su `Admin/sourcing/_indice/<País>.md` (mismo mecanismo que usa `Admin/sourcing/README.md` para sourcing, ver su REGLA 5). Dentro del país elegido: los ejercicios con catch-all alto o sin verificación, contra su `.md` transcripto (NO contra el PDF). ¿La categorización dice algo, o está todo en "Otros"? En una carga nueva, ¿el criterio contable es el mismo que en clubes parecidos del mismo país? Si difiere, se marca para decidirlo (un criterio de datos va a Guido). Lo ya cargado no se reabre ni se recategoriza por consistencia entre clubes, salvo un error claro. El JSON de cada club valida contra el esquema y cada `-data.js` es lo que sale de su JSON: lo vigila `audit.js` (P1). Al terminar, actualizar esa fecha a la de hoy. **`brandColor` no es parte de este eje**: se verifica una sola vez, al onboardear el club (`club-or-year-onboarding/club-nuevo.md`, chequeo contra el escudo), no en cada auditoría periódica. **Perímetro decidido por Claude:** `node tools/perimetro-senales.mjs --auditar-a2 <carpeta del scratchpad>` lista los documentos cuyo perímetro (individual o consolidado) decidió el paso A2 en una corrida real; los de este país los revisa un subagente con el `instruccion.txt` que deja la tool (grupo o sociedad sola, con cita del `.md`). Un error se corrige con un ajuste `perimetro` del documento y abre un punto en `Admin/TODO.md` para revisar los pesos o el umbral de A2, que se miden otra vez con `Admin/mediciones/perimetro-a2-medicion.txt`. |
| `escala` | Ver `.claude/skills/escala-finance-of-sports/SKILL.md`: tiene el mapa completo de puntos calientes (con el comando que mide cada uno y el volumen en el que se rompe) y la metodología para actualizarlo. Es una skill aparte porque el mapa es grande y cambia con cada sesión de sourcing y onboarding. |
| `codigo` | Con el sitio levantado: consola limpia, re-render que no duplica listeners, charts que se destruyen, `loadClubData()` con un club que falla, toggles combinados (moneda × formato × club × año). |
| `docs` | Qué dice dos veces lo mismo, qué se lee en cada sesión sin usarse, qué está desactualizado respecto de los datos (`node tools/generate-club-index.js --check`). **También la memoria de la sesión principal** (`~/.claude/projects/<proyecto>/memory/`): memorias repetidas entre sí o con una skill o una convención, y memorias que son una regla de trabajo y tendrían que ser una skill, una convención o un chequeo. Cada una se lista con a dónde va. |
| `tokens` | Dónde se van los tokens de una sesión típica, y qué de eso es automatizable. **Con el §4 de este skill al lado.** |
| `ux` | Con el sitio levantado, a escritorio y a 375 px: recorrer entera `producto-y-pantalla-finance-of-sports/referencia/ux.md` sobre las vistas principales (Inicio, un club, Comparar, Ligas, una liga, un sponsor), cada punto con su prueba. Lo que no cumple va a `Admin/TODO.md` como punto de Pantallas, con la prueba que falla y el caso. Una falla que un script puede detectar (un 404 después de navegar, un área de toque chica, scroll horizontal) se propone además como chequeo. |

---

## 2. Severidades, y qué hacer con cada una

| | Qué significa | Qué se hace |
|---|---|---|
| **P0** | un número publicado está mal, o puede estarlo | Se arregla en esta sesión, antes que nada |
| **P1** | algo roto que frena el commit, lo vea o no el visitante | Se arregla en esta sesión, o va al tope de `Admin/TODO.md` con su motivo |
| **P2** | riesgo: no está mal hoy, se rompe o no escala mañana | Va a `Admin/TODO.md` |
| **P3** | limpieza: pide trabajo de una sesión | Queda en el reporte. No ensucia `Admin/TODO.md` |
| **P4** | informativo: no pide nada | Queda en el reporte (un código con acción `nada` en `tools/audit-acciones.json` pasa de P3 a P4) |

La columna «Qué significa» es la misma frase que `SEV_TITULO` de `tools/audit.js`; el aviso `severidades-desfasadas` salta si dejan de coincidir.
`node tools/audit.js --leyenda` da cada nivel con su definición, los hallazgos de hoy y los códigos que lo emiten. P0 y P1 frenan el commit.

**Nunca bajes la severidad de un hallazgo para que el resumen quede más lindo.** Si un hallazgo está
mal clasificado, se reclasifica en `tools/audit.js` (con el comentario de por qué), no en el reporte.

### Lo que queda en P2 y P3

Los P2 y P3 no se miran de a uno: se baja la lista de a un código por corrida.

1. **Elegir un código.** El de más hallazgos entre P2 y P3 (`node tools/audit.js --json`) que no se trató en las últimas tres corridas (`Admin/registros/auditoria-proceso.jsonl`, campo `codigo_tratado`).
2. **Mirar cinco hallazgos de muestra** contra el archivo o el documento, y decidir por el código entero:
   - **falso positivo del chequeo:** se arregla el chequeo (es una condición nueva: sección 7);
   - **real y lo arregla un script:** se arregla en la misma corrida, o va a `Admin/TODO.md` con el comando;
   - **real y aceptado** (un club que no publica, un formato del país): se silencia en `tools/audit-ignore.json`, con el motivo;
   - **el chequeo no sirve:** se propone sacarlo (sección 7).
3. **Anotar** la decisión con `node tools/decision.mjs` (ver su cabecera): el código, la decisión y cuántos hallazgos había antes y después. Si la decisión deja trabajo por hacer, se pasa
   `--punto <id del TODO> --aplicar "paso"` (uno por paso) y la tool copia los pasos al cuerpo de ese punto en `Admin/TODO.md`: quien toma el punto no tiene que buscarlos en el registro.
   El JSON de `Admin/registros/auditoria-proceso.jsonl` no se escribe a mano; lo arma la tool.
4. Un código que lleva tres corridas tratadas sin bajar va a `Admin/TODO.md`.

---

## 3. El reporte

Va a `auditorias/<AAAA-MM-DD>.md` (con el sufijo del eje si coincide con otra del mismo día, por
ejemplo `auditorias/<fecha>-escala.md`). Estructura fija:

```markdown
# Auditoría <fecha>

**Corrida:** N clubes, M ejercicios · P0 x · P1 x · P2 x · P3 x · eje de juicio: <eje>

## Novedades desde <fecha anterior>
## Resueltos desde <fecha anterior>
## Hallazgos                      (agrupados por severidad y código)
## Eje de juicio: <eje>           (lo que no es asertable)
## Qué se movió a Admin/TODO.md
```

**El diff contra el reporte anterior no es opcional: es lo que hace que esto sirva más de una vez.**
Sin él, cada auditoría repite los mismos hallazgos y nadie la lee. Leé el reporte anterior ANTES de
escribir el nuevo.

Los P0/P1/P2 que sobrevivan van a **`Admin/TODO.md`**, que es la única lista oficial de pendientes
del proyecto (`CLAUDE.md`): un punto nuevo toma el número siguiente al más alto, y lo resuelto se
borra. El reporte no es una segunda lista de pendientes.

### Qué mostrarle a Guido en pantalla

10-15 líneas, no el reporte entero: el resumen de una línea, los P0/P1 completos, lo NUEVO respecto
de la auditoría anterior, y el link al archivo. El detalle está en el reporte, para cuando lo quiera.

---

## 4. Tokens: qué se puede recortar y qué NO

El eje `tokens` existe porque el arranque en frío es el costo más repetido del proyecto. Pero esto es
un sitio de finanzas para periodistas e hinchas reales: **un token ahorrado a costa de un número peor
es una mala operación, siempre.**

**PROHIBIDO recortar acá. No es negociable por sesión, ni "solo esta vez":**

- Verificar el OCR fila por fila antes de cargar un ejercicio (`club-data-mapping/referencia/leer-pdf.md`).
- Re-sumar las líneas en vez de confiar en el total impreso.
- Resumir o saltear partes de una transcripción de PDF (`CLAUDE.md`: es transcripción fiel, no resumen).
- Saltear un tie-out, o cargar un ejercicio sin `officialTotal*` habiendo un total impreso disponible.
- Pre-convertir moneda al cargar el dato (la conversión pasa SIEMPRE al renderizar).
- Silenciar un hallazgo en `tools/audit-ignore.json` sin haber mirado el documento.

**Sí se puede, y es donde conviene buscar:**

- Duplicación de documentación: el mismo dato de un club puede vivir en `Admin/ESTADO-clubes.md`, en
  el JSON del club, en `Admin/CHANGELOG.md` y en `fuentes/`. `tools/generate-club-index.js`
  genera una de esas copias; medir cuánta duplicación queda en las demás.
- Lo que se lee en CADA sesión (`start-session` §1) contra lo que de verdad se usa.
- Reabrir un PDF ya transcripto: siempre se usa el `.md`, nunca el PDF de nuevo.
- **Cada chequeo que se automatiza en `tools/audit.js` es un chequeo que deja de costar razonamiento
  para siempre.** Si en una auditoría encontraste algo a ojo que un script podía encontrar solo,
  el trabajo no termina en reportarlo: termina en agregar el chequeo.
- **Pagar IA por lo que ya viene estructurado es plata tirada, y la Auditora lo marca sin que se lo pidan.** Al aprobar una tool o un lote, y al comparar lo gastado en cada merge, mira si el formato del documento (iXBRL o XBRL, XML o CSV del depósito, códigos NBB) ya trae lo que se le pide a la IA. Si lo trae, lo frena y pide el escalón que lee esa estructura.

---

## 5. El loop que hace que las auditorías se terminen

Una auditoría que solo lista problemas se vuelve ruido en la tercera corrida. La regla:

**Cuando un hallazgo se repite en más de un club, el arreglo no es arreglar los datos: es escribir la
regla en el lugar que corresponde.** Tres clubes con la misma mala categorización se arreglan los
tres *y* se agrega la regla a `club-data-mapping`, para que el cuarto no nazca mal. Así cada
auditoría deja menos trabajo para la siguiente en vez de la misma lista de siempre.

Destinos: criterio de categorización/moneda → `club-data-mapping`; proceso de onboarding o
arquitectura a reusar → `club-or-year-onboarding`; dónde buscar documentos → `club-sourcing`;
regla de proceso → `Admin/CONVENCIONES.md`; regla de datos → `Admin/CONVENCIONES-DATOS.md`; regla de
pantalla o código del sitio, o trampa del navegador → `Admin/PANTALLA.md`; trampa de PDF o del
pipeline → `Admin/PIPELINE.md`.

---

## 6. Falsos positivos ya descartados (no volver a "descubrirlos")

Están corregidos en `tools/audit.js`. Quedan acá por si reaparecen en otra forma:

- **`fx: null` no rompe la conversión.** `yearMetaFor()` sustituye el `FX_RATE` placeholder global
  (1450), así que el toggle a moneda nativa muestra un número aproximado, no `$0`. Aproximado y
  callado es un problema distinto (y menor) que un cero.
- **Los `items` de un gasto se guardan en positivo y su línea en negativo.** Comparar con signo da
  un falso positivo en toda línea de gasto desglosada: se comparan magnitudes.
- **Un ingreso negativo o un gasto positivo casi siempre es legítimo** (deducciones sobre a receita
  en Brasil, variación de existencias en España). Solo importa si la línea pesa.
- **Un ejercicio placeholder tiene sus líneas en cero.** No le "faltan" los sueldos: no tiene datos.
- **Un club sin color NO es un dato faltante si dice `brandColor:null`.** `null` es el resultado
  CERRADO de "se miró y no lleva color" (el que lo identifica es el blanco, o es ambiguo entre dos;
  ver `Admin/PANTALLA.md` y `club-or-year-onboarding/club-nuevo.md`), no un pendiente que alguien
  tenga que completar: completarlo a ojo es exactamente lo que el criterio prohíbe. Lo que sí es un
  hallazgo es el campo AUSENTE, y para eso ya está `club-sin-color-ni-null` (P3) en el script, así
  que tampoco hace falta mirarlo a mano.

Y uno estructural, del propio motor: **`auditAll()` y `verifyTieOuts()` solo ven los clubes cargados
en memoria.** Cualquier verificación que se escriba en el navegador tiene que forzar la carga primero
(`?audit=1`), o audita Boca y nada más.

---

## 7. Condiciones nuevas en las tools

**Cuándo.** Una condición nueva es todo lo que agrega un frenazo, un aviso, un filtro o una pregunta a una tool del pipeline (`cargar.mjs`, `alta-club.mjs`, Jev, `categorizar-claude.mjs`, `verificar.mjs`…), o cambia lo que una tool asume. La Auditora la aprueba o la rechaza antes de que se codee; el veredicto va a `Admin/registros/auditoria-proceso.jsonl`.

**Las cinco preguntas, en orden:**
1. ¿Qué problema real la motiva? Un caso con nombre (club, año, documento). Sin caso, se rechaza.
2. ¿Puede frenar o descartar una carga buena? Se mide contra los datos y lotes de hoy, con el comando que lo da, y se escribe el número.
3. ¿Puede dejar pasar una carga mala? Qué otro chequeo (tie-out, `auditAll()`, la cola) la atrapa si esta condición falla o no existe.
4. ¿Qué cambia para lo ya cargado? Debe ser nada: se exige una comparación antes y después (prompt, backtest, `generar-data --check`, `audit.js`) y se dice cuál.
5. ¿Se puede apagar o corregir sin tocar datos? Si una sesión se queda trabada, la condición tiene que poder saltearse con un ajuste o una respuesta en la cola.

**Qué se mide.** El número de casos que cambian de resultado (años, clubes, documentos), no una opinión. Si no se puede medir hoy, se dice qué falta y la condición va como aviso, no como frenazo.

**Aprobada**: las preguntas 2 y 3 no muestran daño y la 4 da cero cambios. **Aprobada con un cambio**: sirve, pero tiene un borde medido (se escribe el cambio exacto y su criterio de aceptación). **Rechazada**: cuando (a) frena casos buenos medidos y no hay forma de distinguirlos de los malos, (b) no tiene un caso real, (c) cambia lo ya cargado sin que Guido lo haya decidido, (d) duplica un chequeo que ya existe, o (e) resuelve con una regla de datos lo que es un criterio: eso va a `votacion-de-criterios` y no se aprueba acá.

**Una condición que relaja** (como una tabla vacía) se evalúa igual, con la pregunta 3 como la importante.

**Lo que entra sin esperar el veredicto** (la Auditora lo revisa en su corrida siguiente con el mismo criterio, y si no pasa se revierte): un aviso P3 nuevo de `audit.js`, que no frena nada; una mejora que cumple la sección 8 y da 0 años cargados cambiados, medido sobre todo lo cargado. Siguen esperando su veredicto: todo freno (P0, P1, un error o una pregunta nueva en una tool), todo cambio a lo que una tool asume y todo criterio de datos.

## 8. Mejoras de script: ¿general o parche?

Toda mejora a una tool del pipeline pasa por la Auditora antes del commit, además de las cinco preguntas de la sección 7 si agrega una condición. La pregunta es si arregla un patrón o un caso.

**Es general** si cumple las tres:
1. **Se describe sin nombres.** La regla se escribe con lo que el documento imprime (un rótulo, un signo, una estructura, el régimen contable: Codice Civile, NRS, códigos NBB), nunca con un club, un id, un año o una ruta. El código tampoco los nombra.
2. **El patrón se repite.** Se buscan en los `.md` ya transcriptos los documentos con el mismo patrón, con el comando que lo da, y se escribe el número: 3 documentos o más, de 2 clubes o más.
3. **No rompe nada.** Antes y después, sobre todo lo cargado y los lotes de prueba (sección 5 de `club-or-year-onboarding`): 0 años que cambian lo que se carga, o cada uno que cambia es un error que se corrige, con la cita del documento. El caso que la motivó queda destrabado.

**Es un parche** si el patrón está en 1 o 2 documentos, o en un solo club. Un parche no va al código: va como ajuste en `Admin/registros/ajustes-manuales.jsonl`, con motivo y cita, y con el patrón escrito en una frase. **Al tercer documento con el mismo patrón** (dos clubes o más), los ajustes se reemplazan por una mejora general, que tiene que dar el mismo resultado sin ellos.

**Rechazada**: no se describe sin nombres; o rompe un caso que antes salía bien; o el patrón tiene menos de 3 documentos y se quiso meter igual en el código.

**Cómo se decide.** `node tools/fos.mjs patron --cambio "…" --patron "<regex sobre los .md>" [--escribir]` hace los puntos 1 a 3 y escribe el veredicto; un parche imprime el `ajustes.mjs --agregar`.

**Dónde queda.** El veredicto en `Admin/registros/auditoria-proceso.jsonl`, con el patrón, el comando de búsqueda, el número de documentos y el antes y después.

## 9. Ligas: años sin liga y ligas que no coinciden

**Años sin liga.** En cada auditoría de rutina se listan los club-años con liga `null` en `data/club-leagues/`. Si 3 o más son de la misma liga (la que dicen las fuentes, aunque el sitio no la tenga), esa liga se abre: Pipeline la agrega a `data/leagues.js` con su nivel y su lista de equipos de la temporada en `tools/club-league-reference/`, y una sesión de datos asigna esos años. Con menos de 3, quedan en `null` y se anotan con la liga que dicen las fuentes.

**Ligas que no coinciden.** Si la liga cargada de un año no coincide con una fuente (la lista de equipos de esa temporada, la página de la temporada, la caché de Wikipedia), no la decide quien la vio: se juntan las fuentes, cada una con su cita, y votan tres votantes con `votacion-de-criterios`. Gana la liga que la mayoría ve respaldada por la fuente más directa (la lista oficial de la temporada antes que una página general). El cambio se aplica con el trailer `Corrige:` y el veredicto va a `Admin/registros/auditoria-proceso.jsonl`. Una fuente que nombra al club con otro nombre puede ser otro club de la misma ciudad. Caso: RAAL La Louvière 2021, que la caché daba en la tercera categoría por «La Louvière Centre», un club distinto; la carga en la cuarta estaba bien.

## Cómo mantener este skill

Sin historia ni contadores: ver `CLAUDE.md`.

Si una auditoría encuentra una clase de problema que no está en ningún eje, proponele a Guido agregar el eje o
extenderlo (texto exacto, y espera su ok). Si un chequeo terminó siendo automatizable, el chequeo va a `tools/audit.js` y se propone sacarlo de acá:
este archivo es para el juicio, no para lo que una máquina hace mejor. Si un falso positivo costó más
de una vez entenderlo, va a la sección 6. Si el archivo crece tanto que no se lee en dos minutos, es
señal de que algo debería vivir en `Admin/CONVENCIONES.md` o `Admin/CONVENCIONES-DATOS.md` (una
regla) o en `tools/audit.js` (un chequeo).
