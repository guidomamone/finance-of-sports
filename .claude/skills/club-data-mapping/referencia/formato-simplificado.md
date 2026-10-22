# Formato simplificado: buckets de la pantalla, grossDebt y sector

El set de categorías que ve la pantalla (filas, orden y nombres: los de `js/finanzas-calc.js`, iguales para todos los clubes), la regla de ingeniería al agregar una categoría, y los criterios de `grossDebt` y de gasto por sector. Leelo si vas a tocar un bucket, agregar una categoría o decidir `grossDebt` de un club.

## El Formato simplificado de CUALQUIER club usa las mismas filas, en el mismo orden y con los mismos nombres

El objetivo es poder comparar clubes con las MISMAS categorías. Las filas se definen en UN solo lugar, `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` y
`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` de `js/finanzas-calc.js`, y las lee igual cualquier club y cualquier deporte (Boca es un club más; ya no tiene un
reporte propio). Agregar, quitar o fusionar una fila es un cambio en esa lista, más las etiquetas (`data/site-labels.js`, `data/lang/en.js`), el color
(`js/finanzas-calc.js`, colores de ingresos) y las categorías que la alimentan (`data/category-map.js`).

**Cómo se decide una fila.** Con datos, no a ojo: `node tools/fos.mjs filas` (cuántos clubes la usan, cuánto pesa, en qué países) y, para una candidata que
hoy no es fila, `--etiqueta`. Una fila que existe en un par de clubes de un solo país se fusiona con la más parecida; una que está en muchos países se abre
aunque pese poco. La votación (`votacion-de-criterios`) la corre quien lo pida; la medición es la evidencia.

**Las filas son las del código; el orden es el que pide la lista.** Una fila nueva va donde corresponde por afinidad (lo deportivo junto, lo no deportivo
después), no al final por comodidad. Una fila de gastos o de ingresos aparece siempre, aunque dé cero: mostrar 0 no es esconder, es «el documento no
permite separarlo» (el caso más común: Organización de partidos, Otras actividades y Administración en un documento que las junta; el monto cae en
«Otros gastos»).

**Si el documento no permite categorizar de esta manera**, no se inventa una fila para ese club: el monto va al catch-all y la sesión lo anota. Un cambio de
criterio para todos los clubes sí es del párrafo anterior (medición y votación).

**Los nombres tienen que ser IDÉNTICOS carácter por carácter** a los de la lista de `js/finanzas-calc.js` y a las claves de `data/site-labels.js`:
«parecido» no alcanza (`'Televisión'` contra `'Televisión / Derechos de TV'` rompió la traducción). Copiá el label literal del código, no lo reescribas de
memoria.

**Estadio vs. Abonos son dos conceptos DISTINTOS de venta de acceso, nunca un label combinado tipo «Entradas / Abonos»**: «Estadio» es lo que el club vende
PARTIDO POR PARTIDO (`matchday_competition`); «Abonos» es season tickets, pago adelantado por toda la temporada (`season_tickets`). Hoy una sola fila
«Estadio» los junta (`ABONOS_DENTRO_DE_ESTADIO`) y el acordeón los separa por `rawLabel`. Mapeá cada rubro con la pregunta «¿esto se paga por partido o por
temporada completa?».

**`hideIfZero:true` es SOLO para el bolsón «Fútbol profesional (sin desglosar por la fuente)»**: mostrarlo en $0 para un club bien desglosado sería una
fila extra que no dice nada. No es una regla de esconder cualquier $0: «Venta de Jugadores» en $0 (un club que no vendió a nadie) se muestra igual, y ninguna
fila nueva se oculta en cero (el formato es siempre el mismo). Cuando el bolsón SÍ tiene plata (ej. River 2024, 67 % de los ingresos ahí), la fila se muestra normal.

**Por qué combinar categorías esconde errores (Athletic Club)**: al fusionar "Estadio", Athletic pasó a mostrar 97% de sus ingresos
ahí. La causa no era la fusión: su línea "Ingresos deportivos" (139,5 M€, 82% del club) estaba entera como `matchday_competition`,
cuando la Nota 21.4 de sus cuentas la abre en 5 conceptos, el más grande 72,7 M€ de TELEVISIÓN (el sitio mostraba "Televisión 0,0").
**Moraleja: una fila con un porcentaje absurdo del total es señal de sospechar de la línea más grande, no del bucket.**


**Educación/Otras secciones deportivas no son una rareza de 2 clubes**: `auditorias/2026-09-22-catchall-no-futbol.md` midió que los
11 clubes argentinos cargados tienen negocio no futbolístico (colegio, polideportivo, otros deportes) contra 0 de los 10 españoles y
0 de los 10 japoneses. El corte es por forma jurídica (asociación civil multideportiva vs. sociedad anónima deportiva), no por
país. Antes de mandar una línea de colegio/polideportivo/alquiler de estadio a `other_income` por descarte, revisá si encaja en
`education`/`other_sports`/`stadium_other` (criterio conservador para esta última, tabla de la sección 1 de `SKILL.md`).

**Precedentes de categorización de Gastos de Racing ("CASO CONSULTADO"), para cualquier club nuevo con la misma ambigüedad:**
- "Costo transferencia de jugadores"/"Pago por adquisición de jugadores" → `player_amortisation` (Racing no capitaliza/amortiza como
  Boca, expensa el costo completo al momento de la operación; no hay amortización real que separar).
- Comisiones de compraventa de jugadores y CAPEX (compra de bienes de uso) → se quedan en `other_expenses`, NO en
  `player_amortisation`/`Inversiones`: Boca tampoco separa comisiones dentro de "Compra de jugadores", y CAPEX es plata de caja para
  comprar activos, distinta de "Inversiones" (amortización + depreciación, cargo contable no-cash). Mezclarlos rompe la
  comparabilidad.
- "Fútbol profesional"/"Otros gastos deportivos fútbol profesional" (costos NO salariales del plantel: médico, indumentaria, viajes,
  pretemporada) → `wages_squad`, no una categoría nueva, porque Boca Ejercicio 2027 mezcla ese tipo de costo en su `wages_squad`
  (`data/ar/boca-ar.json`, línea "Fútbol Profesional — Remuneraciones y primas"). OJO: Boca 2025 (balance auditado) SÍ separa esto en 2
  líneas (Remuneraciones / Otros gastos operativos), así que `wages_squad` significa algo un poco distinto según el ejercicio de
  Boca que se tome; el criterio de Racing sigue al Ejercicio 2027 por ser la referencia de nombres/orden.

**REGLA DE INGENIERÍA, fácil de pisar al agregar una categoría nueva**: `computeYearGeneric()` (`js/finanzas-calc.js`) calcula
`otherExpenses` (que alimenta `expenses`/`ebitda`/`pat`, no solo lo que se muestra) sumando una lista explícita de categorías.
Agregar una categoría SOLO a `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` no alcanza: hay que sumarla también a `otherExpenses` (gasto
operativo en efectivo) o al cálculo de `nonCash` (no-efectivo) dentro de `computeYearGeneric()`, si no esa plata desaparece del
cálculo real aunque la tabla se vea bien. Caso real: al crear 3 categorías sin sumarlas a `otherExpenses`, Racing mostró SUPERÁVIT en
ejercicios con déficit real ($11-52 mil millones ARS de diferencia en Expenses/PAT, detectado por `verifyTieOuts()`). Verificá con
`verifyTieOuts()` en el navegador (`node --check` solo valida sintaxis) después de agregar una categoría.

**Cuando una estructura nativa de display no alcanza para categorizar bien, no fuerces la categorización sobre esa estructura:
volvé al documento fuente transcripto y buscá el nivel de detalle que sí distinga lo que hace falta.** Ejemplo (Boca 2025): separar
a mano la porción salarial de una línea mixta dio ~$4.500 M ARS de diferencia contra `otherExpenses` real y se descartó; se resolvió
releyendo los Anexos ORIGINALES (`Clubes/Argentina/Boca/memoria-y-balance-2024-25.md`, Anexos IX y XI-XVIII), donde cada
departamento tiene su propia línea "Remuneraciones y cargas sociales"; sumar esas 9 líneas dio EXACTO el total ya usado.

## `grossDebt` es POR CLUB, y un gasto desglosado por sector se puede separar por columna

**`grossDebt` no tiene un único campo "correcto" a copiar entre balances.** Racing usa el TOTAL DEL PASIVO completo. Boca usa solo la
línea "Deudas" (corriente + no corriente), EXCLUYENDO "Obligaciones de hacer"/Previsiones. Vélez sigue el criterio de Boca (su
balance también separa "Deudas" de "Ingresos anticipados"/"Fondos con destino específico"/"Previsiones"). Antes de copiar
`grossDebt = Total del Pasivo` de un club a otro, revisá si el Estado de Situación Patrimonial separa "Deudas" de otros pasivos: si
las separa, usá esa línea más angosta (deuda financiera real). `tools/caja-deuda.mjs` completa `cash` y `grossDebt` donde el sitio
tiene null (ver `Admin/PIPELINE.md`); este criterio es el que hay que revisar en lo que propone.

**Deuda financiera sin precedente del club** = bancos + otros financiadores + obligaciones + préstamos de socios, corriente + no
corriente. Italia: debiti verso banche + altri finanziatori (factoring, anticipos) + obbligazioni + soci per finanziamenti (Hellas
Verona 2022: 30.272.857 + 13.194.724 + 603.703). Fuera: proveedores, fiscal, previsional y traspasos (enti-settore specifico). Un .md
con dos perímetros (Lazio "separato-consolidato": PARTE I separado, PARTE II consolidado; Milan: consolidado y después la capogruppo)
se lee en el perímetro con que se carga el club. Leasing (IFRS 16): fuera si tiene fila propia; si viene dentro de los debiti finanziari
sin separar, queda. Bono convertible común (por ejemplo una Wandelschuldverschreibung dentro de las deudas): dentro, es deuda financiera.
Convertible con conversión obligatoria en acciones, que el documento muestra como partida especial después del patrimonio (Sonderposten
nach dem Eigenkapital): fuera. Caso: HSV, donde el convertible común entra y el obligatorio no (detalle en `Admin/CONVENCIONES-DATOS.md`,
"bonos convertibles"). Factoring: con recurso (pro solvendo, o el documento lo llama deuda financiera o autoliquidante) dentro; pro-soluto
fuera (no es deuda del club); se lee en la nota de cada documento. Préstamos de la controlante: dentro si la nota dice que son
préstamos (Sassuolo con Mapei, Parma); si no, fuera.

**Un balance que desglosa un rubro de gasto por SECTOR/DEPARTAMENTO permite separar "Salarios y primas (plantel y cuerpo técnico)"
del resto del personal sin inventar nada.** El Anexo III de Vélez tiene "Remuneraciones al personal"/"Cargas sociales" como FILAS y
Fútbol Profesional/Amateur/Complejo Polideportivo/Enseñanza/Culturales/Otros Deportes como COLUMNAS, con total por fila y por
columna. Racing, Boca y River solo tienen una cifra por rubro, así que su `wages_squad` incluye "todo el personal reportado en ese
rubro". Cuando el documento SÍ tiene el 2do eje, partí la línea en 2: la columna "Fútbol Profesional" (→ `wages_squad`, comparable
entre clubes) y el resto de las columnas sumadas (→ `youth_other_sports_expense`, que cubre amateur/juvenil/otros deportes y, si el
club no separa más fino, personal de escuela/cultura no deportiva; documentarlo en la evidencia del club). Verificá que las 2 líneas nuevas
sumen EXACTO el total de fila impreso (sección 6 de `SKILL.md`).
