# Registro de altas y Claude por API para las preguntas del alta (2026-09-30)

Tres cambios en `tools/alta-club.mjs`, más dos módulos nuevos:

- `tools/altas-registro.mjs`: el registro `Admin/altas-club.jsonl`, con huellas y `resumenAltas()`.
- `tools/alta-claude.mjs`: Claude por API con cita verificada.

Las reglas están en la cabecera de cada archivo. Este documento guarda **lo que se midió**.

## 1. Una sola regla carpeta → club

`alta-club.mjs` ya no tiene su propia detección de "¿el club ya existe?". Antes usaba el mapa de
citas, después `onboard.mjs --quien` y desempataba por país. Ahora usa `clubDeCarpeta()` de
`tools/carpetas-clubes.mjs`, la misma que usan onboard, el inventario, el pipeline y `audit.js`.

- El año sale de `anioDelNombre()`, que es la misma regla de `guessYear` de onboard, más el caso
  `dd-mm-aaaa`.
- Como ya no se llama a `onboard.mjs` por cada documento, `--todos` tarda **~5 s para 212 carpetas**.
  Antes eran 16 s para 164.

## 2. Registro de altas por script: `Admin/altas-club.jsonl`

Tiene una línea por carpeta, que se **reemplaza** en cada corrida (no se apila). La escribe el
script en cualquier modo, salvo `--backtest-claude`. Antes de escribir relee el archivo del disco y
lo reemplaza de forma atómica, así que dos sesiones que corren carpetas distintas no se pisan.

Cada línea trae:

- `carpeta`, `clubId` propuesto y `estado`;
- `documento` base, `anio` y `cierre`;
- `preguntas`, cada una con su `clase` (`documento` o `producto`), lo que dijo Claude y
  `candidataDudas`;
- `pendientes`, con `bloquea`;
- `resueltas`, con `fuente: 'claude-api'`, la cita y el modelo;
- `claude`, con las páginas enviadas, el costo, las respuestas y `preguntasHuella`;
- `fecha`, `huella` y `entradas`, con el sha1 de cada archivo usado.

**La huella** junta cuatro cosas:

- todos los `.md` de la carpeta;
- los archivos de referencia: `data/clubs.js`, `data/currency-map.js`,
  `tools/fx-reference/<moneda>-usd.json`, `tools/club-league-reference/<iso2>.json` y
  `data/club-leagues/<iso2>.js`;
- la resolución de `carpetas-clubes.mjs` y el estado de transcripción de cada `.md`;
- el sha1 de `alta-club.mjs`, `alta-claude.mjs` y `carpetas-clubes.mjs`.

Una segunda corrida de `--todos` sin cambios da **"0 recalculadas, 212 sin cambios de huella"**.

**Las respuestas de Claude se reusan** mientras no cambien el `.md`, las preguntas ni el modelo. Un
cambio de huella de la carpeta, como editar el script, recalcula la carpeta pero no vuelve a pagar
a Claude. Un cambio del prompt tampoco invalida las respuestas solo: para rehacerlas está
`--forzar-claude`.

**Documento base de cada carpeta** (`--todos`). Primero van los estados contables anuales según el
nombre del archivo, después los que tienen la transcripción `listo` o `cargado`, y dentro de eso el
ejercicio más reciente. Si el elegido no sirve de base (no es un balance anual o no se le puede
sacar el año), se prueba el siguiente, con un máximo de 4.

### Estados

| Estado | Criterio |
|---|---|
| `existe` | La regla única dice que ya es un club del sitio. Solo aparece si se corre un documento suelto de un club existente: `--todos` recorre las carpetas `nuevo`. |
| `listo-para-alta` | Sin preguntas abiertas. Las que Claude resolvió con cita cuentan como resueltas. Tiene tipo de cambio. |
| `con-preguntas` | Queda al menos una pregunta abierta. |
| `faltan-datos` | La carpeta no tiene `.md`, o no hay tipo de cambio para el cierre: ni declarado, ni en `FX_CLOSE`, ni en la serie local. El resto de los `pendiente` (color, liga en `null`, nombre legal incompleto) no bloquea. |

### Conteos (212 carpetas `nuevo`, sin las de agregado "_*")

| | Sin Claude | Con Claude (36 carpetas preguntadas) |
|---|---|---|
| listo-para-alta | 60 | **77** |
| con-preguntas | 83 | 63 |
| faltan-datos | 69 (63 sin `.md` + 6 sin fx) | 72 (63 sin `.md` + 9 sin fx) |

A esto se suma `existe`: 1, que es Racing, de una prueba con un documento suelto.

- **Carpetas con `.md`:** hoy son 149. En la prueba anterior eran 141, porque desde entonces se
  transcribió más.
- **Comparación con los ~55 listos de antes.** Si la liga siguiera siendo `pregunta` (ver abajo),
  sin Claude habría **42 listos**. La caché de rosters de it, kr y co creció y trajo 43 preguntas de
  liga.
- **Liga pasó a `pendiente`.** Las ligas fuera del catálogo y las coincidencias parciales de nombre
  ("OFI Crete" / "OFI") dejaron de ser `pregunta`: 21 carpetas estaban frenadas solo por eso. Ahora
  son `pendiente`, con la fila en `null` y la duda en la `nota`. Agregar una liga al catálogo es una
  decisión de Guido **por liga**, no por club, y `null` es la verdad mientras nadie lo confirme.
  Más datos no pueden dar menos clubes listos.
- **Faltan tipos de cambio (9).** Juventus 2012, FC Groningen 2013, Rio Ave 2015, Tondela 2021, OB,
  Atalanta y Sassuolo son EUR/DKK de fechas que no están en `FX_CLOSE` y no tienen serie local.
  Sigma Olomouc y Slovan Liberec son de 1997, antes de que arranque la serie de CZK. Se agregaron 3
  tras Claude: al resolverse su pregunta, quedó a la vista que no había fx.

Preguntas abiertas con Claude, por campo:

| Campo | Abiertas |
|---|---|
| perimetro | 44 |
| fiscalYearStart | 15 |
| cierre | 15 |
| sport | 14 |
| reportType | 12 |
| fx | 6 |
| id | 2 |
| anio | 1 |
| country | 1 |

## 3. Claude por API, con cita verificada

Se hace **una llamada por club** con `claude-opus-5-5`, effort `low`, salida JSON estricta y el
system prompt cacheado. Se manda el `.md` entero si pesa hasta 45.000 caracteres. Si no, van las 3
primeras páginas y las 4 más pertinentes para cada pregunta.

**El script no le cree a Claude.** Una pregunta queda resuelta solo si se cumplen las cuatro
condiciones:

1. Claude dice que el documento la responde.
2. La confianza es de al menos 0,80.
3. **Todas** las citas existen literalmente en la página que dice. Se normalizan espacios, `|`, `*`,
   `#` y `_`, y hace falta al menos una cita de 12 caracteres o más.
4. Pasa el chequeo propio de su tipo:
   - el nombre legal tiene que aparecer en la cita;
   - el tipo de cambio tiene que estar impreso en la cita, o su inverso si la moneda está casi a la
     par del dólar;
   - la fecha de cierre tiene que ser un fin de mes;
   - el valor tiene que estar en la lista de valores permitidos.

**Respuestas verificadas que no desbloquean.** Algunas respuestas pasan la verificación, pero no
destraban nada porque lo que queda es una decisión de producto:

- el documento es un intermedio o no es cargable;
- el deporte no es fútbol;
- la moneda es anterior al euro;
- el nombre está en otro alfabeto;
- `otra_entidad`.

Esas respuestas se guardan con su cita, y la pregunta sigue abierta.

**No se mandan a Claude las preguntas de producto:** id heredado, Escocia, Panamá, dos entidades en
la carpeta y la premisa de un presupuesto.

### 3.1 Backtest sobre clubes ya cargados (13 club-años, uno por país)

Corrió con `--backtest-claude` y el informe sale gratis con `--informe-backtest`. A cada club se le
hicieron las 5 preguntas (perímetro, reportType, cierre, moneda, nombre legal) como si fuera nuevo, y
las respuestas se compararon contra lo cargado.

| Pregunta | Resueltas | Bien, de las resueltas | Abiertas |
|---|---|---|---|
| perimetro | 13/13 | 12/12 (+1 sin verdad: Cercle Brugge) | 0 |
| reportType | 11/13 | 11/11 | 2 (confianza 0,75: Once Caldas y América; las dos habrían estado bien) |
| cierre | 13/13 | 13/13 | 0 |
| moneda | 13/13 | 13/13 | 0 |
| name | 13/13 | 11/13 | 0 |
| **Total** | **63/65** | **60/62** | |

- **Citas verificadas: 71/71.**
- **Costo: US$ 1,15, o US$ 0,088 por club-año con 5 preguntas.** La entrada es ~15.000 tokens y
  pesa el 85% del costo.
- **Los 2 "mal" de nombre no son errores de lectura, son de convención.**
  - Panathinaikos: Claude copió el griego impreso ("ΠΑΝΑΘΗΝΑΙΚΟΣ ΑΘΛΗΤΙΚΟΣ ΟΜΙΛΟΣ Π.Α.Ε."), y el sitio
    usa la transliteración. Desde ahora un nombre en alfabeto no latino se guarda con su cita, pero
    **no se aplica**, porque una transliteración no se puede verificar contra el documento.
  - América: el documento es el informe de Ollamani, la controlante, y Claude contestó bien quién
    emite los estados.
- **Dos errores de la vara, no de Claude, corregidos a mano** en `VERDAD_MANUAL` del script:
  - FC København: se cargó la entidad de fútbol sola, que "ikke udarbejdet koncernregnskab".
  - Osijek: se cargó el informe *kombinirani*.

### 3.2 Corrida real sobre los clubes nuevos (`--todos --claude`)

Se preguntaron 36 carpetas por **US$ 1,73**, o US$ 0,048 por carpeta: acá hay menos preguntas por
club que en el backtest. El tope pedido era US$ 1,45 y se pasó por la concurrencia. Ya está
arreglado: cada trabajador reserva el costo estimado antes de llamar.

- **Citas verificadas: 70/72.** Las 2 que fallaron las cazó el script:
  - Viking: Claude "corrigió" el OCR ("Konsernreqnskap"), así que el texto no existe en el `.md`.
  - Una cita de menos de 12 caracteres.
- **Resueltas: 31 de 46 preguntas.**

| Pregunta | Resueltas | Nota |
|---|---|---|
| perimetro | 20/31 | |
| name | 7/10 | |
| reportType | 2/3 | |
| sport | 2/2 | Verificadas, pero no son fútbol: siguen abiertas como decisión de producto. |

Motivos de las no resueltas:

- 12 por confianza por debajo de 0,80;
- 1 porque el nombre no estaba en la cita;
- 2 por cita no verificada.

**17 clubes pasaron a `listo-para-alta` gracias a Claude:** Goiás, Asteras Tripolis, Inter, Lazio,
Napoli, Bodø/Glimt, Brann, KFUM, Lillestrøm, Rosenborg, Sandefjord, Start, Vålerenga, Go Ahead
Eagles, Thun, İstanbul Başakşehir y Trabzonspor.

**Bug encontrado en la primera corrida: Sarpsborg 08.** El documento base es de "Sarpsborg Fotball
Invest AS", un vehículo inversor. Claude lo dijo en la prosa, pero el formato lo obligaba a elegir
"individual", y la carpeta quedó como lista. Por eso se agregó el valor `otra_entidad`, que no
desbloquea. Se volvió a preguntar solo esa carpeta (US$ 0,08) y ahora sigue `con-preguntas`.

**A mirar antes de escribir estas altas:** 5 de los 20 perímetros resueltos son **consolidado**:
Inter, Atalanta, Go Ahead Eagles, Başakşehir y Trabzonspor. Claude los justificó con la excepción del
criterio: el documento solo trae el consolidado, o el fútbol está en una subsidiaria. Cada uno queda
en el registro con su cita. Es criterio aplicado, no dato leído, y conviene que Guido los vea una vez.

**Lo que falta preguntar.** Quedan 85 preguntas de documento sin preguntar, en ~50 carpetas. Se
estiman **~US$ 2,4** a US$ 0,048 por carpeta (`node tools/alta-club.mjs --todos --claude --tope-usd 3`).

### 3.3 Candidatas a `Admin/dudas-por-club.md` (`--dudas`)

Hay **12**, casi todas de perímetro, en las que Claude contestó con cita verificada pero con
confianza 0,75: Parma, Tromsø, Beşiktaş y otras. Ninguna se escribió en `dudas-por-club.md`.

Leyéndolas, la mayoría **no es una pregunta para el club**, sino de criterio para Guido: Claude
explica en la prosa qué trae el documento, y lo que queda es elegir. `--dudas` muestra, para cada una,
lo que dijo Claude, cada cita con su estado y qué páginas se revisaron.

**Gasto total de API de esta tarea: US$ 2,95** (backtest 1,15 + corrida 1,73 + Sarpsborg 0,08).
Todo quedó en `Admin/claude-api/resultados.jsonl` con `tarea: "alta-club"` o
`"alta-club-backtest"`, sin campo `md`.

## 4. Rangos plausibles de tipo de cambio

Se revisó la tabla `MONEDAS` de `alta-club.mjs` contra el mínimo y el máximo real de cada serie de
`tools/fx-reference/`. Los valores medidos están en el comentario de la tabla.

| Moneda | Antes | Ahora |
|---|---|---|
| TRY | [1, 45] (hoy cotiza 48,93) | [0.5, 70] |
| BRL | [3, 7] | [1.4, 7.5] |
| COP | [2500, 5000] | [1600, 5500] |
| CZK | [15, 35] | [13, 45] |
| KRW | [900, 1500] | [800, 1800] |
| UAH | [5, 45] | [4.5, 60] |
| RUB | [25, 130] | [20, 140] |
| CHF | [0.75, 1.8] | [0.65, 1.95] |
| NOK | [5, 13] | [4.5, 13] |
| ARS | [3, 3000] | [0.9, 3000] |

**`data/currency-map.js` → `FX_PLAUSIBLE_RANGE` no se editó.** Sugerencias:

- `COP: [2500, 5000]` → `[1600, 5500]`. La serie llegó a 5.061 en noviembre de 2022; hoy lo cargado
  va de 3.250 a 4.810.
- `BRL: [3, 7]` → `[1.4, 7.5]`, antes de cargar cualquier ejercicio brasileño anterior a 2015 (la
  serie arranca en 1,53). Hoy lo cargado va de 3,31 a 6,19.
- `ARS` está bien.
- TRY y las demás monedas de la tabla no están en `FX_PLAUSIBLE_RANGE`. `--escribir` las agrega
  con el rango nuevo cuando entra el primer club de esa moneda.

## 5. Para `pipeline.mjs --resumen` (no se editó)

Agregar el import junto a los otros:

```js
import { resumenAltas } from './altas-registro.mjs';
```

Y después de `printSummary(ledger, 'Estado del inventario');`, en la línea 98, y del
`printSummary` final:

```js
{ const a = resumenAltas(); if (a.total) console.log(`\nAltas de clubes nuevos (Admin/altas-club.jsonl, ${String(a.fecha).slice(0, 10)}): ${Object.entries(a.porEstado).map(([k, v]) => `${k} ${v}`).join(' · ')}${a.listos.length ? `\n  listos: ${a.listos.map((l) => l.clubId).join(', ')}` : ''}`); }
```

## 6. Verificación

`node tools/audit.js --quiet` da `P0 0 · P1 0 · P2 8 · P3 11`. No se tocó nada de `data/`, ni
`index.html`, ni el deploy.
