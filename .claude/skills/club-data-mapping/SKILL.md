---
name: club-data-mapping
description: Supuestos y patrones para mapear el balance/presupuesto NATIVO de un club de fútbol (categorías propias del documento, ej. "Generales/Específicos/Diversos" de Racing, o las 5 categorías de River) al esquema compartido del sitio finance-of-sports (normalizedCategory de data/category-map.js, revenueLines/expenseLines, meta fields). Usar SIEMPRE que se cargue un balance o presupuesto nuevo, de un club ya existente (un ejercicio que faltaba) o de un club completamente nuevo, antes de decidir cómo categorizar cada línea o cómo convertir a USD. El objetivo es no reinventar estos criterios cada vez: si una decisión de esta sesión contradice lo que dice este skill, o aparece un caso que el skill no cubre, proponerle a Guido el cambio al terminar (ver "Cómo mantener este skill" al final). También usar para revisar la cola de categorización del pipeline (etapa 7) o decidir a qué normalizedCategory va un rubro que nadie categorizó. Los casos de tipos de cambio y monedas, formato de pantalla (Formato simplificado, `grossDebt`), PDFs difíciles (escaneos, tablas rotadas, filas que no concilian) y casos por país o formato de documento están en `referencia/`: el índice de este archivo dice cuándo leer cada uno.
---

# Mapeo de formato-club a formato-sitio

Este skill es la memoria de los criterios de categorización y conversión con los que se cargan los balances/presupuestos de los
clubes en `finance-of-sports`. Cada regla salió de un caso real y, cuando ayuda, el caso va como ejemplo. Leelo ANTES de mapear un
documento nuevo: evita que dos ejercicios del mismo club (o de clubes distintos) queden categorizados con criterios diferentes sin querer.

En el pipeline la categorización la hacen los scripts (etapa 7 de `Admin/PIPELINE.md`: precedente del club, Jev, Claude por API,
cola para Guido), así que este skill es el criterio que esos scripts aplican y que vos usás para revisar la cola, cargar a mano fuera
del pipeline o decidir un rubro que nadie categorizó.

## Archivos de referencia (se leen solo cuando hace falta)

Este archivo trae el criterio que se aplica en toda carga. Lo demás vive en `referencia/`; leé solo el que corresponda. Las secciones
de este archivo conservan su número (0 a 7, 11, 12); las que faltan viven en `referencia/`, con nombre en vez de número. La conversión a USD
está resumida en la sección 5 y el detalle en `referencia/fx.md`.

| Archivo | Qué hay | Cuándo leerlo |
|---|---|---|
| `referencia/fx.md` | Detalle de la conversión a USD (la sección 5 es el resumen): qué tipo de cambio usar y en qué orden, `fxSource`/`fxRef`, sentido de `fx`, cotización que no aparece | El club no es ARS, aparece una moneda nueva o hay que fijar un `fx` |
| `referencia/formato-simplificado.md` | Filas, orden y nombres de los buckets de la pantalla (los define `js/finanzas-calc.js`), regla de ingeniería al agregar una categoría, `grossDebt` por club, gasto por sector | Vas a tocar un bucket, agregar una categoría, decidir `grossDebt` o separar un gasto por sector |
| `referencia/leer-pdf.md` | Medir si el PDF tiene texto, enderezar escaneos torcidos o rotados, OCR con Tesseract, fila acumulada que no concilia, verificación de un `.md` de Mistral OCR | El PDF es escaneado o sin capa de texto, o una fila no concilia |
| `referencia/casos-por-pais-y-formato.md` | Presupuesto de caja con sección Extraordinaria, impuestos/cargas/moratoria, fuente que publica solo ingresos, rubros NIIF de Perú, balance danés (§ 32), ejemplo largo de `items` enterrados (Racing) | Tu club cae en uno de esos casos |

## 0. Ubicate primero

- Las reglas de datos generales están en `Admin/CONVENCIONES-DATOS.md`; las que solo valen para un país, en `Admin/paises/<iso>.md` (se leen al cargar o corregir un club de ese país).
- La taxonomía compartida está en `data/category-map.js` (`REVENUE_CATEGORIES`, `EXPENSE_CATEGORIES`). Leela antes de inventar una
  categoría nueva: probablemente ya está.
  REGLA: `category-map.js` tiene que reflejar EXACTAMENTE los `normalizedCategory` que usan los datos reales. Al agregar o usar una
  `normalizedCategory` nueva, actualizá `category-map.js` EN LA MISMA sesión, sin dejarlo como pendiente (ejemplo de lo que pasa si
  no: `category-map.js` documentaba `transfer_income_gross`, que ningún dato usaba, mientras un data file usaba `player_sales`
  sin que figurara en `REVENUE_CATEGORIES`; el motor funcionaba igual y por eso nadie lo corrigió). Los buckets del motor genérico
  (`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS`, en `js/finanzas-calc.js`) no leen `category-map.js` en vivo, tienen su
  propia lista: si tocás uno, sincronizá el otro a mano (dónde vive cada archivo: `Admin/ARQUITECTURA.md`, la lista de archivos del principio, donde figuran `data/category-map.js` y `data/currency-map.js`).
- `normalizedCategory` es una clave INTERNA: la usan `computeYearGeneric()` y `sumCat()` para los KPIs de Finanzas, los gráficos y
  `wagesToTurnover`. NUNCA se muestra. `rawLabel` es la evidencia: en el JSON y en `fuentes/` queda tal cual lo escribe el club, no lo traduzcas ni lo prolijes. La pantalla muestra, en cambio, su glosa en el idioma del visitante (`data/<país>/<club>-glosas.js`, con el original en el title de la celda); la glosa la escribe `tools/glosas-etiquetas.mjs` sola al escribir un año, no a mano.
- El motor genérico (`computeYearGeneric`, para todos los clubes) espera `revenueLines`/`expenseLines`: arrays de
  `{ rawLabel, normalizedCategory, amountNative, disclosureLevel, items? }`. En el JSON del club los campos se llaman
  `{ label, category, subcategory, amount, disclosure, items? }`: `subcategory` es la `normalizedCategory` (la que se elige con este
  skill) y `category` es la genérica, igual para cualquier deporte, que no se elige: la escribe `tools/json-datos.mjs` desde
  `SPORT_TAXONOMIES` de `data/category-map.js`. Una subcategoría nueva lleva su genérica en ese mapa en la misma sesión (`audit.js`,
  `taxonomia-incompleta`). (`amount` en millones de la moneda del club, `unit.scale = 1000000`); el data file
  generado y el motor usan los nombres de siempre. `items` es el desglose recursivo del renglón (sección 4).

## 1. Elegir `normalizedCategory`: cuándo darle una propia y cuándo mandarlo a "other"

Los rubros que son estructuralmente iguales entre clubes (cuotas sociales, TV, entradas/campeonatos, sponsors, sueldos del plantel,
transferencias de jugadores, depreciación) tienen su propia categoría. Todo lo demás, específico de CADA club (ej. "Ingresos Colegio"
y "Sede Villa del Parque" de Racing), va a `other_income`/`other_expenses`. No fuerces una categoría nueva porque un club nombre
distinto un rubro: primero preguntate si es conceptualmente lo mismo que ya existe (ej. "Televisión AFA" es `broadcasting`).

**Primer paso, antes de decidir a mano: `node tools/suggest-category-precedent.mjs <clubDataFile> "<rubro>" ["<rubro2>" ...] --side revenue|expense`.**
Busca el texto exacto (o parecido) contra lo YA categorizado en otros años del MISMO club, separado por ingreso/gasto (el mismo
rubro puede significar cosas distintas según el lado: Boca, "Futbol Femenino" ingreso vs. "Fútbol femenino" gasto). Resultados:
`EXACTO` (misma categoría entre años: usarla), `PARECIDO` (candidato a revisar, no aceptar sin más), `SIN_PRECEDENTE` (criterio de
esta sección, de cero), `CONFLICTO` (el mismo texto tuvo 2 categorías en años distintos: revisar a mano cuál es correcta). Es una
consulta, nunca escribe en `data/<país>/<club>.json`. `--list` vuelca todo el precedente cargado de un club.

Mapeos usados en la práctica (no es la lista completa de `category-map.js`):

| Rubro tal cual lo reporta el club | normalizedCategory |
|---|---|
| Cuotas Sociales / Ingresos Sociales | `member_dues` |
| Televisación, Televisión AFA, derechos de TV | `broadcasting` |
| Campeonatos Oficiales, Otros Torneos, recaudación de entradas (cuando el club NO separa premios de recaudación) | `matchday_competition` |
| Cobranzas por participación, premios por avance de ronda/campeonato (SOLO si el documento la reporta como línea propia, separada de la recaudación de entradas) | `competition_bonus` |
| Publicidad, sponsors, canjes comerciales | `sponsorship_commercial` |
| Transferencia de Jugadores / Cobros por venta de jugadores (ingreso) | `player_sales` (si el club NO las netea, van así, ver sección 3) |
| Costo Transferencia de Jugadores / Pago por adquisición de jugadores (gasto) | `player_amortisation`: reusa la categoría de "amortización de pases" de Boca como el bucket "Compra de jugadores", aunque Racing no capitalice/amortice y expense el costo completo al momento de la operación; es la aproximación más fiel para que esa plata aparezca en el bucket correcto de Formato simplificado en vez de perderse en el catch-all |
| Sueldos del Personal, Cargas Sociales, remuneraciones del plantel | `wages_squad` |
| Amortización/Depreciación de bienes de uso tangibles | `depreciation` |
| Previsiones, amortizaciones intangibles, cargos extraordinarios de fin de ejercicio | `other_amortisation` |
| Desafectación de previsiones/provisiones, condonaciones, resultado por quiebra (también cuando son un INGRESO: ver `Admin/CONVENCIONES-DATOS.md`) | `exceptional_items` |
| Colegio/escuela del club: aranceles de enseñanza, subsidios estatales a la educación (fila propia "Educación" en Formato simplificado). NO una escuela/academia de FÚTBOL (eso es `youth_football`) ni un departamento de educación física (eso es `other_sports`) | `education` (ingreso) |
| Uso del estadio fuera del partido: alquiler para recitales/eventos, concesiones del estadio, licitación de palcos. Comparte la fila "Estadio" con `matchday_competition` y `season_tickets`, pero se guarda aparte. **CRITERIO CONSERVADOR**: solo si el rótulo nombra el estadio o una parte de él; un "Alquileres"/"Arrendamientos" genérico NO entra, va a `other_income` y la pregunta a `Admin/dudas-por-club.md` | `stadium_other` (ingreso) |
| Secciones y actividades deportivo-recreativas del socio: básquet, tenis, polideportivo, ciudad deportiva, pileta, náutica, colonia de vacaciones, subcomisiones (fila propia "Otras secciones deportivas", espejo de `youth_other_sports_expense`) | `other_sports` (ingreso) |
| Todo lo demás específico del club (sede social, alquileres genéricos, eventos y salones, hotelería, estacionamiento, actividades varias) | `other_income` / `other_expenses` |
| Un club que agrupa gruesamente ("fútbol profesional" sin desglosar): ver la regla de abajo antes de usar esta categoría | `lump_football_operations` (ingreso) / `lump_football_operations_expense` (gasto) |

### Antes de usar `lump_football_operations`, fijate si el documento REALMENTE no desglosa

`lump_football_operations`/`_expense` es para cuando el club de verdad no separa un rubro (ej. "fútbol profesional" como una sola
cifra, sin ningún desglose disponible en ningún lado del documento). NO es para un renglón que el documento presenta como encabezado
de grupo con líneas numeradas debajo (ej. Racing: "A. INGRESOS PROVENIENTES DE FUTBOL" con 9 líneas "1.- COBRANZAS POR VENTA DE
ENTRADAS" a "9.- COBROS DE OTROS RECURSOS...", cada una con nombre y monto propio): eso es una tabla con jerarquía de dos niveles y
cada línea de abajo tiene una categoría real (entradas → `matchday_competition`, TV → `broadcasting`, marketing →
`sponsorship_commercial`, etc.).

Un ejemplo concreto del error (Racing 2025/26 y 2026/27) está en `referencia/casos-por-pais-y-formato.md`, "Ejemplo largo".

**Regla concreta**: si vas a meter algo adentro de `items`, preguntate si esos sub-ítems tienen cada uno una categoría REAL distinta.
Si sí, promovelos a líneas de primer nivel con su propio `normalizedCategory`, aunque el documento los agrupe bajo un encabezado
común. `items` es para el caso contrario: sub-ítems que son todos la MISMA categoría que el padre y se desglosan solo para mostrar
más detalle (ej. "Torneo Oficial" de Boca, con Derechos de TV/Recaudaciones/Premio adentro, las 3 `matchday_competition`).
Pregunta rápida: "¿estos sub-ítems, sumados cada uno a su categoría real, dan un Formato simplificado distinto a dejarlos todos en la
categoría del padre?". Si sí, promovelos.

Dos mapeos generales más (el detalle está en `referencia/casos-por-pais-y-formato.md`):

- Impuestos, tasas, ART, seguros → `admin_general_expense`.
- Cargas sociales: van con el sueldo de su sector, nunca como categoría propia.

**REGLA NO OPCIONAL: si el documento de un club NO permite categorizar con las filas del Formato simplificado (las de `js/finanzas-calc.js`, ver
`referencia/formato-simplificado.md`), no decidas solo cómo resolverlo (categoría inventada, catch-all sin avisar, aproximación
forzada). El monto va al catch-all, se anota, y un cambio de criterio para todos los clubes se mide con `node tools/fos.mjs filas` y se consulta a Guido
con la discrepancia concreta y las opciones, no en abstracto.**

## 2. Resultados financieros (intereses, diferencias de cambio): NUNCA una línea

Intereses ganados/perdidos y diferencias de cambio NO van como `revenueLine`/`expenseLine`, ni siquiera si el documento los muestra
como una línea más de "Recursos". Van netos (ingresos menos egresos financieros) al campo `financial.net_interest` del año (en el JSON; `netInterest` de `fiscalYearMeta` en el data file generado).
Motivo: es un resultado financiero, no operativo, y meterlo en `revenueLines` lo cuenta como revenue del club.

Mismo criterio para `profitOnPlayerSales`, `assetSales` y `tax`: si el documento los muestra aparte del cuerpo principal de
Recursos/Gastos, van a `financial` del año, no a las líneas.

## 3. Transferencias de jugadores: reflejá cómo LO PRESENTA CADA CLUB, no una regla fija

Varía entre clubes y es intencional:

- **Racing**: el balance reporta "Transferencia de Jugadores" (ingreso) y "Costo Transferencia de Jugadores" (gasto) como dos
  líneas ordinarias separadas, sin netear. El sitio las carga IGUAL, separadas: no hay una línea "ganancia neta por pases" en el
  documento, así que inventar un neteo sería menos fiel.
- **Boca 2025** (`revenue`/`expenses` de `years[2025]` en `boca-ar.json`): el balance auditado reporta las líneas brutas de
  transferencias/rescisión (ingreso, `player_sales`) y sus costos asociados (gasto) como líneas ordinarias, SIN netear (pág. 76 del
  balance). Boca no netea a mano en `meta.profitOnPlayerSales`, igual que ningún otro club migrado.

Regla general: mirá primero si el DOCUMENTO FUENTE neteó o no. Si no neteó, no netees vos: replicar la estructura real del club
importa más que uniformar entre clubes (el free tier es "tal cual lo reporta el club").

## 4. Sub-ítems anidados: no aplanar, usar el formato recursivo

Si el documento tiene sub-grupos dentro de una categoría (ej. Racing: "Gerencia de Fútbol Profesional" con sub-grupos "Depto
Medico" y "Canjes" adentro, cada uno con sus líneas), usá el formato recursivo `[label, value, items?]` en vez de aplanar. El
renderer (`renderBreakdownRows` en `index.html`) soporta profundidad arbitraria. "No perder información en la carga" es un principio
general del proyecto.

Cuando un sub-grupo no tiene un total propio impreso (ej. "Canjes" es solo un subtítulo en una tabla plana), calculá su `value`
como la suma de sus `items`: no lo dejes en 0 ni inventes un número.

## 5. Conversión a USD (resumen; el detalle está en `referencia/fx.md`)

- Cada ejercicio lleva `currency`, `fx` (moneda nativa por 1 USD, nunca al revés) y `fxSource` (o `fxRef` a una entrada de `FX_CLOSE`
  en `data/currency-map.js`). Un `fx` sin procedencia sale como pendiente en `node tools/audit.js`.
- Si el propio documento declara su tipo de cambio de cierre, gana ese (regla #0 de `referencia/fx.md`), antes que cualquier cotización
  externa.
- Nunca se guarda un valor ya convertido: se guarda `amount` (JSON) / `amountNative` (data file generado) y la conversión pasa al renderizar.
- El orden de reglas, las fuentes (`fxSource`), las monedas nuevas y la cotización que no aparece: `referencia/fx.md`.

## 6. Verificación antes de cargar (no es opcional)

**Primer paso: `node tools/audit.js`** (gratis, sin tokens). Ya chequea solo, para cualquier club: que cada `items` sume exacto
contra su línea padre (`items-no-cierran`), que la escala en USD sea plausible (`escala-implausible`) y que no haya un salto
implausible contra los años anteriores del mismo club (`salto-interanual`), que agarra justo el bug de cargar en pesos en vez de
millones (Boca 2022/2023: un bug de suma y uno de escala, detectables así en vez de a mano). Los puntos 1-6 de abajo cubren lo que
`audit.js` NO ve: que la categorización sea la CORRECTA, no solo que sume.

**Para encontrar las tablas de Recursos/Gastos sin leer el documento entero: `node tools/extract-table-rows.mjs <archivo.md>`.**
Saca solo las tablas del `.md` transcripto a JSON compacto (página, sección, filas), descartando actas/firmas/dictamen. Detecta el
separador decimal (coma/punto) y NUNCA convierte los montos a número (quedan como string tal cual impresos). Límite: una tabla
cortada por un salto de página puede perderse o desarmarse; si una tabla del JSON no tiene sentido, leé esa sección del `.md` a
mano. `--relevant` filtra a las tablas con palabra clave (una ayuda de dónde mirar, no un filtro definitivo).

1. Sumá tus `revenueLines`/`expenseLines` y confirmá que cierran contra el subtotal que imprime el DOCUMENTO fuente para esa
   categoría; no confíes en tu propia suma sin cruzarla contra algo externo. La aritmética se saca de tokens:
   `node tools/sum-check.mjs <num1> <num2> ... --target <total>` suma una lista (separador de miles "," o "." auto-detectado,
   negativos entre paréntesis) y dice si cierra y por cuánto. Qué filas entran sigue siendo criterio tuyo.
2. Sumá `revenue + expenses + netInterest` (+ otros meta fields que correspondan) y confirmá que da el RESULTADO FINAL / Superávit /
   Déficit impreso. Es el check más fuerte: un solo número inambiguo que no depende de cómo categorizaste cada línea.
3. Si el documento etiqueta algo como "(Pérdida)" o "(Ganancia)", NO asumas que el rótulo es correcto: sumá y confirmá (Racing 2011
   arrastraba un rótulo de plantilla del año anterior, con el número real de signo contrario).
4. Si el documento agrupa categorías distinto según el año (ej. a veces incluye Amortizaciones en el total de Gastos impreso, a
   veces no, en varios balances viejos de Racing), NO fuerces un check automático de `verifyTieOuts()` contra un número que
   significa algo distinto de un año a otro. Documentá la verificación a mano en la evidencia del club (`Admin/carga-clubes/<clubId>.md`, el título de ese ejercicio)
   explicando la inconsistencia, antes
   que agregar un check frágil que parezca "no cerrar" por una diferencia de definición y no de datos.
5. **Usá SIEMPRE la columna "año corriente" del balance DE ESE MISMO ejercicio, nunca la comparativa de un balance posterior.**
   Un balance en "moneda homogénea"/RT6 REEXPRESA el ejercicio anterior al poder adquisitivo de la fecha de cierre del balance
   ACTUAL. Ejemplo: el balance 2024-25 de Racing imprime $92.529.945.669 de recursos ordinarios en su columna comparativa "2024";
   el balance 2023-24 imprime $66.367.712.489 como su propio año corriente. Mismo concepto, dos fechas de reexpresión. Para cargar
   el ejercicio N, andá al documento CUYO año corriente ES N.
6. **Si el `.md` empieza con la advertencia "ESCANEADO, TRANSCRIPTO CON MISTRAL OCR"**, el chequeo 1-5 NO alcanza solo: ver
   `referencia/leer-pdf.md`, "Documento transcripto con Mistral OCR".

## 7. Atribución de gestión: solo si estás seguro

`years[].management_id` y `management[]` del JSON (`gestionId` y `gestionesByClub` en el data file generado) son documentación, no algo que el motor use para filtrar el
selector "Año a año" (lee directo `Object.keys(fiscalYearMeta)`). Cuándo una gestión queda en `null` y cómo se busca:
`Admin/CONVENCIONES-DATOS.md`, «una gestión (presidente) sin fuente pública queda en null». Con `null`, el año sigue visible en
"Año a año", solo no participa de "Por gestión"/"Comparar Gestiones". Mejor un año sin gestión que una gestión inventada.

## 11. Pedir ayuda a Guido para leer algo ilegible: siempre página + fila + columna exactos

**Esto NO es una pausa preventiva por "el PDF se ve difícil".** Un escaneo denso, muchas páginas, una tabla en landscape o una
inclinación diagonal no son motivo para frenar y preguntar. El default es seguir solo: renderizar a más DPI, rotar, enderezar
(`referencia/leer-pdf.md`), cruzar contra los subtotales impresos (sección 6). Preguntarle a Guido es el ÚLTIMO recurso, para UN número puntual que
sigue sin confirmarse después de intentar todo eso (o que no reconcilia y ninguna fila del documento explica la diferencia, ver
`referencia/leer-pdf.md`, "fila acumulada"). Nunca una pregunta abierta tipo "¿podés ayudarme con este PDF?".

La pregunta tiene que incluir siempre: (1) el número exacto de página del PDF, (2) el nombre exacto de la fila/rubro tal cual está
impreso, (3) qué columna (si hay más de una), (4) el número que se está leyendo (aunque se sospeche que está mal). Una pregunta
genérica ("no me cierra tal cosa, ¿podés revisar?") no sirve; la que funcionó fue: "página 7, fila '9.- Cobros de otros recursos
de gestión por fútbol', columna B (o la que corresponda), leo 634.152.050, ¿es correcto?", con captura de esa zona del PDF si hace
falta. Nunca preguntar "¿esto está bien?" sin esas 4 cosas.

## 12. "Formato simplificado": cada fila tiene que ser un acordeón, nunca `items:null`

Cada fila de Formato simplificado tiene que poder abrirse y mostrar la cuenta: es la forma en que Guido controla el trabajo de
categorización (ver de qué campo(s) nativo(s) salió cada número reclasificado). Aplica a todos los clubes por igual: `bucketize()`
(`js/finanzas-calc.js`) arma `items` para cada bucket. Criterio:

- Un bucket que agrupa una sola `normalizedCategory` con una sola línea real: `items` = esa línea con su propio desglose
  (`line.items`) si lo tiene, o una fila `[line.rawLabel, line.amountNative]` si no. Nunca dejar el bucket sin nada que mostrar al
  abrirlo.
- Un bucket que suma VARIAS líneas (mismo `normalizedCategory` repetido, o el catch-all "Otros ingresos"/"Otros gastos"): `items` =
  una tupla `[rawLabel, amountNative, line.items || null]` por cada línea que aporta a la suma.
- Nunca inventar un número nuevo para armar el desglose: reusar por referencia los mismos `revenueLines`/`expenseLines`/`items` que
  alimentan "Formato del club". El desglose tiene que ser trazable 1:1 a esos datos.
- Si un ejercicio no tiene más detalle que el campo nativo ya sumado (la mayoría de los ejercicios viejos de Boca), la fila igual
  lleva `items` con una sola fila que confirma de qué campo salió. La falta de más desglose no es excusa para volver a `items:null`.

Verificación (mismo criterio que la sección 6): abrir CADA fila en el navegador y confirmar que la suma de sus sub-ítems cierra
exacto contra el `value` de la fila padre. Un desglose mal armado puede pasar `verifyTieOuts()` y aun así mostrar datos incorrectos
(es el caso de Racing de `referencia/casos-por-pais-y-formato.md`, "Ejemplo largo").

## Cómo mantener este skill

Se lee UNA VEZ al empezar a mapear un balance/presupuesto nuevo, y al terminar la sesión se le PROPONE a Guido un cambio (texto exacto, y espera su ok) si:
- Apareció un rubro que no encajaba limpio en la tabla de la sección 1: proponé agregarlo con el criterio que usaste.
- Tomaste una decisión que contradice algo de este skill: proponé actualizar la sección y explicá por qué el caso nuevo justificaba
  desviarse (no borres el criterio viejo sin más, salvo que haya quedado obsoleto).
- Encontraste un club con una estructura genuinamente distinta (otro país, otra moneda, otro régimen contable): evaluá si necesita su
  propia sección o un skill separado.
- Aprendiste algo nuevo sobre CÓMO leer un PDF fuente (otra trampa de escaneo, otra fila engañosa): va en `referencia/leer-pdf.md` (o en la sección 11 de este archivo), con el
  documento/página exacto donde se encontró.

Todo cambio al texto de este skill, también los menores, se le muestra antes a Guido y espera su ok.

**Este es un skill de criterio, no un changelog.** Al agregar o editar una sección:

- **Se queda**: la regla de categorización/conversión, el árbol de decisión para un rubro o un `fx` ambiguo, y un ejemplo concreto
  (club, año, fila, importe) cuando ilustra CÓMO aplicar la regla.
- **No se escribe**: números de versión, fechas de decisión, "antes se hacía X", "ya no", cómo se llegó a la regla, contadores
  fijos ("hoy son N clubes") ni números de to-do. Eso va a `Admin/CHANGELOG.md`; los pendientes viven solo en `Admin/TODO.md`.
- **Antes de archivar algo** de acá, sacale lo que todavía sirve como criterio: la regla permanente que dejó, no el debugging.
