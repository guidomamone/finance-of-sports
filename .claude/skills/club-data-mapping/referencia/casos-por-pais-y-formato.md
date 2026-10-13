# Casos por país y formato de documento

Criterios para estructuras de documento puntuales: presupuesto de caja con sección Extraordinaria, impuestos/cargas/moratoria, fuente que publica solo ingresos, rubros NIIF de Perú, balance danés con exención § 32, y el ejemplo largo de `items` enterrados en `lump_football_operations`. Leelo solo si tu club cae en uno de esos casos.

## Un presupuesto de CAJA con sección "Extraordinaria" (financiamiento) se carga SOLO en su parte Ordinaria

Ejemplo: Presupuesto 2023-2024 de San Lorenzo (`Clubes/Argentina/San Lorenzo/presupuesto-2023-2024.md`). A diferencia de un Estado
de Recursos y Gastos devengado, es un presupuesto de CAJA mensual con 2 secciones: "Ordinario" (Ingresos/Egresos de la operación
normal: sociales, copas, TV, sueldos, gastos de estadio, etc.) y "Orígenes y Aplicaciones Extraordinarias" (Ingresos Extraordinarios
= aportes bancarios/financieros/dirigenciales; Egresos Extraordinarios = cancelación de esos aportes; Propiedades y obras = obras
de capital; Compra/Venta Jugadores = el DESEMBOLSO de caja del pase, no su amortización; Cancelación Deuda = pago de deuda vieja).

**Regla: cargar SOLO la sección Ordinaria.** La Extraordinaria es financiamiento y movimientos de capital/caja, no ingreso o gasto
de la operación del ejercicio: cargarla mezclaría financiamiento con operación e inflaría o desinflaría el resultado (ej. "Compra
Jugadores" en caja no es lo mismo que su amortización en varios ejercicios, que es como el sitio trata los pases). El "Resultado
Ordinario" impreso por el documento (Total Ingresos Ordinarios menos Total Egresos Ordinarios) es el PAT del ejercicio; NO el "Saldo
Final por Período", que mezcla operación con financiamiento. La pregunta de por qué San Lorenzo presupuesta en caja y no devengado
quedó en `Admin/dudas-por-club.md`, sección San Lorenzo.

Si aparece un presupuesto de OTRO club con esta estructura (Ordinario + Extraordinario/financiamiento en secciones separadas),
mismo criterio: solo la parte Ordinaria entra al sitio.

## Impuestos / Cargas sociales / Moratoria: el mapeo ya está establecido

Revisado con grep sobre `data/*.js`, no de memoria:

- **Impuestos (tasas, impuestos municipales, ART, seguros)** → SIEMPRE `admin_general_expense`. Se cargan en casi todos los clubes:
  Vélez ("Impuestos (sectores)"/"Impuestos (administración)", los 11 ejercicios), San Lorenzo 2013 ("Impuestos y tasas"), Rosario
  Central ("Impuestos, tasas y contribuciones"). Es uno de los mapeos MÁS consistentes del sitio.
- **Cargas sociales** → NUNCA es su propia categoría. Se pega SIEMPRE a la categoría del sueldo al que corresponde, separando por
  sector si el documento lo permite: la porción de plantel profesional/cuerpo técnico va a `wages_squad` (junto con "Sueldos y
  primas" del mismo sector); el resto (amateur, polideportivo, administración, otros deportes) va a `youth_other_sports_expense` o
  `admin_general_expense` según el sector. Mismo patrón en Vélez, Estudiantes LP, Rosario Central, Racing, San Lorenzo.
- **Moratoria** (plan de pago de deuda impositiva) → el precedente está DIVIDIDO: Racing la cargó como `admin_general_expense` en 2
  ejercicios ("Pago de Moratoria") y como `other_expenses` en un tercero ("Pago de Otros Gastos Extraordinarios - Moratoria",
  porque ese balance la agrupaba bajo "Gastos Extraordinarios"). Nunca como interés (`netInterest`): una moratoria impositiva es un
  plan de pago de tasas/impuestos atrasados, no interés de deuda financiera. Cuando el documento la separa como línea propia, seguí
  dónde la agrupa el propio balance (Extraordinario → `other_expenses`; Ordinario/administración → `admin_general_expense`).
- **Fila combinada**: el Presupuesto 2023-24 de San Lorenzo junta los 3 conceptos en UNA fila ("Impuestos/Moratoria/Cargas
  sociales", un solo número por mes/Total); no hay forma de separarlos, así que se cargó entera como una única línea
  `admin_general_expense` (la única opción posible, y coherente con que impuestos y moratoria van ahí en la mayoría de los
  precedentes).

## Una fuente que publica INGRESOS y no gastos: qué se carga, qué queda en `null`, qué NO se inventa

Aparece cuando la fuente no es el club sino su liga o su controladora. Es un caso de mapeo, no un hueco de carga: **un `null` acá es
el dato correcto.**

**Caso A: la liga publica un renglón por club (los 10 de la J.League).** El informe de gestión da el INGRESO de cada club y 3
líneas de desglose; su estructura de costos solo existe a nivel división. Entonces: `officialTotalRevenue` con el número y
`officialTotalExpenses: null` + `officialPAT: null`. Sin gastos publicados no hay resultado que cargar, y pedirle el PAT a estos
ejercicios es pedir un número que no existe en ninguna fuente (`Admin/sourcing/Japón/_notas-generales.md` documenta que el desglose por
club no está publicado en ningún lado; lo que queda son 2 preguntas abiertas en `Admin/dudas-por-club.md`, no trabajo de mapeo).

**Caso B: la controladora reporta un SEGMENTO, no el club (Club América dentro de Ollamani).** Un segmento IFRS 8 informa
"utilidad del segmento", que **no es el resultado neto** (no le imputa costos financieros ni impuestos) y puede agrupar al club con
otro negocio (acá, el Estadio Banorte). Entonces: los totales que SON una identidad aritmética del segmento se cargan
(`officialTotalRevenue`, `officialTotalExpenses`) y `officialPAT` queda en `null`. Cargar la utilidad del segmento como PAT
publicaría un "Resultado neto" que ningún documento afirma.

**En la vista**: un ejercicio así muestra "Sin dato" en Gastos y en Resultado neto, no `$0` (regla "SIN DATO NO ES CERO" en
`Admin/CONVENCIONES-DATOS.md`; la cascada arranca en los gastos y se lleva el resultado). **En la auditoría**: `tools/audit.js` no
reporta `balance-sin-pat` cuando `officialTotalExpenses` es `null`, porque no es accionable; no hace falta silenciar nada.

## Rubros NIIF de Perú (Alianza Lima): academias, franquicias, concesionarios

Rubros que ningún club argentino tenía y que no encajaban limpio en la tabla de la sección 1 de `SKILL.md`:

- **"Ingresos por derechos de formación y transferencias"** → `player_sales` (igual que "Transferencia de Jugadores" de Racing).
- **"Franquicias de academias"** (franquiciar la marca/metodología "Academia [Club]" a un tercero que la opera, cobrando un canon;
  Nota NIIF15) → `youth_football`: es negocio de fútbol juvenil, aunque el ingreso sea un canon y no una cuota de alumno.
- **"Academias de fútbol Y vóley"** (operación propia, mixta con OTRO deporte, sin poder separar cada porción) → `other_sports`:
  no forzar una separación que el dato no permite.
- **"Ingresos por participación en torneos internacionales/nacionales"**, cuando el club los reporta como línea propia SEPARADA de la
  taquilla → `competition_bonus` (plata de la federación/confederación por participar, no de boletería).
- **"Concesionarios" (del estadio, fuera del día de partido)** → `stadium_other`.
- **"Servicios" dentro de "Gastos deportivos"** (bloque grande, S/ 9-15M/año, sin más desglose en la Nota) → se categorizó como
  `match_organisation_expense` por falta de otra opción mejor ("mejor aproximación disponible, no una certeza"); quedó como pregunta
  abierta en `Admin/dudas-por-club.md` porque el tamaño lo amerita.

## Balance danés con la exención § 32 (Bruttofortjeneste, sin Revenue desglosado): todo a `lump_football_operations`

La Årsregnskabsloven danesa (§ 32) permite reportar el estado de resultados mostrando solo **"Bruttofortjeneste"** (Gross profit),
un número YA NETO de Nettoomsætning (revenue) + otros ingresos operativos - costos externos, sin desglosar ninguno de esos 3
componentes en ningún lado (ni en el cuerpo, ni en una nota, ni en la política contable, que solo explica QUÉ compone el neto).
Ejemplos: FC Nordsjælland, Randers FC, Vejle. A diferencia de fckobenhavn-dk, silkeborg-dk y agf-dk (que sí tienen Nota 2 "Revenue"
con entradas/TV/sponsors/merchandising), estos balances no dejan vía para separar el revenue.

**Regla**: cuando el balance usa esta exención (la política contable cita "årsregnskabslovens § 32" o describe el Gross profit como
neto de costos externos), TODO el revenue va como una única línea `lump_football_operations` por el valor de "Bruttofortjeneste".
Es el caso más extremo de la regla de la sección 1 de `SKILL.md` (`lump_football_operations`): ni siquiera hay un encabezado con líneas debajo, es un solo número. Los Gastos
sí se pueden seguir desglosando: Personaleomkostninger (Staff costs) y Af-/nedskrivninger (D&A) SIEMPRE se reportan aparte, y las
notas de roll-forward de activos permiten separar `player_amortisation` de `depreciation` cruzando "Transferrettigheder"/
"Kontraktrettigheder" contra el de PP&E.

**Efecto en "Formato simplificado"**: la fila "Fútbol profesional (sin desglosar por la fuente)" va a tener prácticamente el 100%
del revenue. Es el comportamiento CORRECTO acá, no un error de carga. Documentalo en `Admin/carga-clubes/<clubId>.md` (con la
cita textual de la nota de política contable que confirma el § 32) y anotalo como pregunta en `Admin/dudas-por-club.md`, por si
existe una versión más desglosada del informe (uso interno del club).

**"Indtægter/Resultat af kapitalandele i tilknyttede virksomheder" (resultado de subsidiarias por el método de la participación) →
`netInterest`, no revenue.** randers-dk (un centro de empleo, un parque de negocios, un colegio deportivo) y vejle-dk (VB Plus ApS,
grupos de networking) la presentan ENTRE el resultado operativo y "Finansielle indtægter"/"Finansielle omkostninger", como una
línea más del bloque financiero. No es interés en sentido literal, pero es resultado no-operativo de inversiones, y sigue el
criterio de la sección 2 de `SKILL.md`. Documentá en la evidencia del club que ese neto incluye este concepto.

## Ejemplo largo: sub-ítems enterrados en `lump_football_operations` (Racing)

Contexto: la regla y el caso (encabezado "A. INGRESOS PROVENIENTES DE FUTBOL" con 9 líneas numeradas) están en la sección 1 de `SKILL.md`.

**Ejemplo del error** (Racing 2025/26 y 2026/27): esas 9 líneas se guardaron como `items` DENTRO de una única línea de primer nivel
`lump_football_operations`. Visualmente correcto en "Formato del club", pero roto para cualquier cálculo por `normalizedCategory`:
"Formato simplificado" mostraba Televisión/Comercial/Venta de jugadores en $0, porque esa plata estaba **enterrada adentro de
`items`**, un campo que `sumCat()`/`computeYearGeneric()` NUNCA mira (solo suman por `normalizedCategory` de las líneas de PRIMER NIVEL).
