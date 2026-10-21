# Formato simplificado: buckets de la pantalla, grossDebt y sector

El set de categorías que ve la pantalla (filas, orden y nombres iguales a Boca), la regla de ingeniería al agregar una categoría, y los criterios de `grossDebt` y de gasto por sector. Leelo si vas a tocar un bucket, agregar una categoría o decidir `grossDebt` de un club.

## "Formato Simplificado" de CUALQUIER club usa el mismo set de categorías, el mismo orden y los mismos nombres que Boca

El objetivo es poder comparar clubes con las MISMAS categorías. Boca lee `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` (`js/finanzas-calc.js`) en vivo igual que cualquier otro club: un bucket nuevo se agrega en UN
SOLO lugar y afecta a todos.

**Filas de referencia, en este orden exacto (el de Boca Ejercicio 2027, la referencia canónica):**
- **Ingresos**: Cuotas Sociales, Comercial / Sponsors, **Estadio** (`matchday_competition` + `season_tickets` + `stadium_other`
  combinadas en una fila; el acordeón las separa por `rawLabel`; el interruptor `ABONOS_DENTRO_DE_ESTADIO` en
  `js/finanzas-calc.js` puede devolver `season_tickets` a su propia fila "Abonos" sin tocar ningún dato), Televisión, Premios por
  competencias, Venta de Jugadores, Educación, Otras secciones deportivas, Fútbol profesional (sin desglosar por la fuente,
  `hideIfZero:true`), catch-all **"Otros ingresos"**.
- **Gastos**: Compra de jugadores, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación),
  Organización de partidos, Otras secciones deportivas (juvenil/otros deportes/básquet), Administración y gastos generales,
  catch-all **"Otros gastos"**. **Estas 7 filas son SIEMPRE las mismas para cualquier club/año**, aunque el documento no permita
  separar las 3 del medio (Organización de partidos / Otras secciones / Administración): en ese caso esas 3 muestran $0 y el monto
  completo cae en "Otros gastos". Mostrar la fila en $0 no es "esconder", es "no hay cómo separar esto". Una categoría que se
  agregue a futuro va en la posición que le correspondería si Boca tuviera esa fila, no al final por comodidad.

**REGLA NO OPCIONAL**: si el documento no permite categorizar de esta misma manera, consultale a Guido primero (está en la sección 1
de `SKILL.md`).

**Los nombres tienen que ser IDÉNTICOS carácter por carácter contra Boca**, "parecido" no alcanza. Ejemplo del bug: `'Televisión'`
(Boca) vs. `'Televisión / Derechos de TV'` (motor genérico) para `broadcasting`. Copiá el label LITERAL del código de Boca, no lo
reescribas de memoria.

**`hideIfZero:true` es SOLO para categorías sin equivalente en Boca** ("Fútbol profesional, sin desglosar por la fuente" es la única):
mostrar esa fila en $0 para un club bien desglosado sería una fila extra rompiendo la promesa de "igual que Boca". No es una regla
de esconder cualquier $0: "Venta de Jugadores" en $0 (un club que no vendió a nadie) se muestra igual que en Boca. Cuando el bucket
sin desglosar SÍ tiene plata (ej. River 2024, 67% del revenue ahí), la fila se muestra normal.

**Por qué combinar categorías esconde errores (Athletic Club)**: al fusionar "Estadio", Athletic pasó a mostrar 97% de sus ingresos
ahí. La causa no era la fusión: su línea "Ingresos deportivos" (139,5 M€, 82% del club) estaba entera como `matchday_competition`,
cuando la Nota 21.4 de sus cuentas la abre en 5 conceptos, el más grande 72,7 M€ de TELEVISIÓN (el sitio mostraba "Televisión 0,0").
**Moraleja: una fila con un porcentaje absurdo del total es señal de sospechar de la línea más grande, no del bucket.**

**Estadio vs. Abonos son dos conceptos DISTINTOS de venta de acceso, nunca un label combinado tipo "Entradas / Abonos"**: "Estadio" es
lo que el club vende PARTIDO POR PARTIDO (`matchday_competition`, `r.exhibicionEspectaculos` en Boca); "Abonos" es season tickets,
pago adelantado por toda la temporada (`season_tickets`, `r.abonos` en Boca). Mapeá cada rubro con la pregunta "¿esto se paga por
partido o por temporada completa?".

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
