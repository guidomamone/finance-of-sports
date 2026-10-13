# talleres-ar — evidencia de carga

Lo que había como comentario en `data/talleres-ar-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/talleres-ar-data.js — Club Atlético Talleres Asociación Civil (Córdoba,
Argentina). Onboarding inicial del club (sesión 2026-09-23): pasa de "sin
nada cargado" a 2 ejercicios auditados reales, 2024 y 2025, ejercicio
CALENDARIO (1/1-31/12, NO temporada jul-jun como la mayoría de los clubes
argentinos ya cargados — fiscalYearStart:'01-01', igual criterio que
data/stuttgart-de-data.js, usado como plantilla de shape/convención).

FUENTE: `Clubes/Argentina/Talleres/estados-contables-2024.md` y
`estados-contables-2025.md` — Estados Contables completos (Estado de
Situación Patrimonial + Estado de Recursos y Gastos + Anexos I-V/VI),
auditados, con Informe de la Comisión Revisora de Cuentas. Los dos PDF
fuente tienen texto nativo (pdftotext -layout, sin OCR, confirmado con
~4000 caracteres/página). Transcripción completa página por página en los
.md de arriba. El 3er PDF de la carpeta (`asamblea-social-2024.pdf`) es un
reporte infográfico sin cifras absolutas cargables — NO es fuente de esta
carga, ver Admin/sourcing/Argentina/Talleres.md.

EXPRESADO EN MONEDA HOMOGÉNEA (RT6, "en pesos sin centavos, a la fecha de
cierre"): cada documento reexpresa TODO el ejercicio (incluida su propia
columna comparativa del año anterior) al poder adquisitivo de SU fecha de
cierre. Por eso se usó SIEMPRE la columna "año corriente" de CADA balance
(31/12/2024 dentro del EECC 2024; 31/12/2025 dentro del EECC 2025), nunca
la columna comparativa del balance siguiente — confirmado que difieren
(ej. "Total del activo" 31/12/2024: 96.410.707.726 en su propio EECC vs.
126.818.644.941 como comparativo dentro del EECC 2025, mismo concepto,
reexpresado a 2 fechas de cierre distintas — club-data-mapping SKILL.md
sección 6.5).

ESTRUCTURA DEL "ESTADO DE RECURSOS Y GASTOS": el documento agrupa todo bajo
"RECURSOS" (incluida la sección "Transferencias de Derechos Económicos", ver
nota crítica abajo) y "GASTOS", con Anexos III/IV (2024) o IV/V (2025) que
desglosan cada línea de primer nivel en sub-ítems con monto propio — el
desglose más granular de cualquier club argentino cargado hasta ahora,
reconciliado EXACTO contra cada subtotal impreso del documento (Total
Recursos Fútbol Profesional, Total Otros Recursos, Total Gastos Fútbol
Profesional, Total Otros Gastos, y el Total Recursos/Total Gastos/
Resultado del Ejercicio final) con node antes de cargar, ver verificación
al final de este comentario.

NOTA CRÍTICA — "Transferencias de Derechos Económicos" SE CARGA NETO, a
diferencia de Boca/Racing (club-data-mapping SKILL.md sección 3, que dice
"reflejá cómo LO PRESENTA CADA CLUB, no una regla fija"): el propio Estado
de Recursos y Gastos de Talleres muestra "Ingreso por transferencias"
(bruto) MENOS "Costo computable de los activos transferidos" (valor libro
del pase dado de baja) MENOS "Gastos de transferencia" (comisiones), y el
resultado NETO ("Total por transferencias de Derechos Económicos") es lo
que suma a "Total Recursos Fútbol Profesional" — es decir, a diferencia de
Boca/Racing (que muestran las 3 partidas como líneas ORDINARIAS separadas,
cada una sumando a su propio Total de Ingresos/Total de Gastos), acá el
propio documento ya neteó estas 3 partidas ANTES de llegar a "Total
Recursos". Cargar los 3 componentes como revenueLine/expenseLine separados
(como si fuera Boca/Racing) habría inflado el revenueLines/expenseLines
combinado por encima del "Total Recursos"/"Total Gastos" oficiales en
~14681 M ARS (2024) / ~11510 M ARS (2025) — se probó así primero y
falló el tie-out contra los 2 totales oficiales por exactamente ese monto
(el PAT final igual daba exacto, porque revenue y expense suben lo mismo,
pero verifyTieOuts() chequea Revenue y Expenses POR SEPARADO, no solo el
PAT — ver index.html función verifyTieOuts()). Se cargó entonces como UNA
sola revenueLine (categoría player_sales) con el valor NETO, y los 3
componentes (bruto, costo computable, gastos) como `items` para que el
acordeón de "Formato del club"/"Formato simplificado" siga mostrando el
detalle real — mismo criterio de "reflejar cómo lo presenta cada club" de
la sección 3 del skill, aplicado al hecho de que ESTE club sí netea.
"Costo computable de los activos transferidos" y "Gastos de transferencia"
quedan así DENTRO del item de la revenueLine, no promovidos a
expenseLines — es una excepción deliberada a la regla general de "no
enterrar un gasto real dentro de items de una línea de ingreso", justificada
porque acá promoverlos rompería el tie-out contra los totales oficiales
impresos por EL PROPIO documento (a diferencia del caso de Racing en la
sección 1 del skill, donde promover SÍ mantenía el tie-out).

REVENUE — mapeo de las 13 líneas de primer nivel (2024) / 12 (2025, sin
"Partidos amistosos" que dio $0 en 2025) del Anexo de Recursos:
  Ingresos por publicidad - Aliados estratégicos  → sponsorship_commercial
  Cuotas sociales                                 → member_dues
  Partidos fútbol profesional (entradas por partido, NO abonos: el
    documento no reporta una línea de abonos/season tickets separada)
                                                   → matchday_competition
  Ingresos AFA derechos televisación y otros /
    Ingresos derechos televisación y otros        → broadcasting
  Otros ingresos socios (emisión de carnet, ingresos especiales a socios)
                                                   → member_dues (ingreso
    incremental ligado al padrón de socios, mismo negocio que Cuotas
    Sociales, no un negocio distinto)
  Partidos amistosos                              → matchday_competition
  Partidos de copas (el documento NO separa recaudación de premios por
    avance de ronda dentro de esta línea — ver club-data-mapping SKILL.md
    sección 1, regla de competition_bonus: solo se separa si el documento
    la reporta como línea propia, y acá no lo hace) → matchday_competition
  Ingresos concesiones (gastronomía/bar)           → stadium_other (uso
    del estadio fuera del partido en sí, concesiones — criterio
    conservador de la sección 1 del skill, acá el rótulo SÍ nombra
    "concesiones", no es un alquiler genérico)
  Otros ingresos fútbol profesional (préstamos de jugadores y derechos de
    preferencia, mecanismo de solidaridad FIFA, ingresos por cargas
    sociales Decreto 510/ex-1212 de préstamos, otros service charge) →
    other_income (4 conceptos heterogéneos de "negocio de pases" que no
    son ventas en firme — no encajan limpio en player_sales, que ya está
    usado para la línea de transferencias propiamente dicha arriba; se
    mantienen juntos como un solo revenueLine con items, mismo
    normalizedCategory en los 4 sub-ítems, no ameritan promoción según la
    regla de la sección 1 del skill)
  Total por transferencias de Derechos Económicos (NETO, ver nota crítica
    arriba)                                        → player_sales
  Ingresos por tienda netos de costo de venta (indumentaria, merchandising,
    ya neto de "costos de mercadería vendida" según lo imprime el propio
    documento)                                     → sponsorship_commercial
    (la categoría agrupa "sponsors, merchandising, canjes" explícito en
    category-map.js)
  Ingresos deportes amateurs (entradas fútbol amateur, cuotas, otros — es
    fútbol de inferiores/reserva, no otro deporte)  → youth_football
  Otros ingresos ordinarios / Otros ingresos (otros ingresos, donaciones,
    recupero gastos administrativos)                → other_income

EXPENSE — mapeo de las ~19-20 líneas de primer nivel del Anexo de Gastos:
  Plantel y cuerpo técnico (sueldos, reconocimiento trayectoria, premios)
                                                     → wages_squad
  Alojamiento/movilidad/atención médica, Gastos operativos de partidos,
    Honorarios y viáticos (personal + árbitros), Aportes A.F.A./L.C.F.,
    Inscripciones jugadores y técnicos, Otros gastos de entrenamientos →
    match_organisation_expense (costo de organizar partidos/participar en
    competencias — logística de viajes, seguridad, árbitros, AFA/LCF,
    entrenamiento del plantel profesional, calza exacto con la definición
    de la categoría en category-map.js)
  Alquileres y expensas                             → admin_general_expense
    (viviendas/locales/expensas genéricos, no nombra el estadio — criterio
    conservador de stadium_other, sección 1 del skill)
  Amortización de activos deportivos (pases)         → player_amortisation
  Prestamos, comisiones, gto. transferencias / gto. mercado y rescisiones
                                                      → other_expenses
    (comisiones e intermediación de compraventa — MISMO criterio que
    Racing, club-data-mapping/referencia/formato-simplificado.md: Boca tampoco separa
    comisiones dentro de su bucket "Compra de jugadores", que es solo
    amortización/deterioro de pases; meterlo ahí sería menos fiel, no más)
  Otros gastos (fútbol profesional: utilería, alquiler de canchas, service
    charge)                                          → other_expenses
  Gastos por sueldos y cargas sociales (ordinarios/estructura — personal
    que NO es plantel/cuerpo técnico)                → admin_general_expense
  Gastos impositivos, Gastos departamentos de servicios, Gastos de
    mantenimiento, Gastos de prensa y eventos, Quebranto previsión
    deudores incobrables                             → admin_general_expense
  Gastos de preparación de jugadores de inferiores (SOLO 2025, línea
    nueva: desarrollo de juveniles)                  → youth_other_sports_expense
  Depreciación de bienes de uso                       → depreciation
  Otros gastos (ordinarios/estructura: Básquet, Vóley, Patín, Donaciones,
    Varios — básquet/vóley/patín son EXACTAMENTE "otros deportes" per la
    definición de youth_other_sports_expense en category-map.js)
                                                       → youth_other_sports_expense

netInterest: "Resultados Financieros y por Tenencia" completo (2024:
Diferencias de cambio + Resultados por tenencia e intereses + Recpam,
ajuste por inflación —los 3 conceptos van juntos al mismo campo, ninguno
es revenueLine/expenseLine, club-data-mapping SKILL.md sección 2—; 2025:
una sola línea ya neta "Resultados financieros y por tenencia", el
documento no la desglosa en el propio Estado). tax = 0: Talleres es una
asociación civil con exención impositiva (Nota 3 de ambos documentos,
"Exenciones Impositivas") — no hay impuesto a las ganancias que restar.

TIPO DE CAMBIO: el Anexo V (2024) / Anexo VI (2025) "Activos y Pasivos en
Moneda Extranjera" NO declara un tipo de cambio único de cierre a pesar de
que su propio encabezado de columna dice "Importe moneda origen / Tipo de
cambio" — la celda solo completa el importe en moneda origen, nunca un
número de cotización, y la razón (moneda homogénea + partidas de distinto
origen temporal) se confirma dividiendo Importe convertido AR$ / Importe
moneda origen fila por fila: da valores DISTINTOS entre líneas de la MISMA
moneda al MISMO cierre (ej. 2024: ~912 para "Deudas con clubes" USD vs.
~1.060 para "Provisión de fútbol profesional" USD; 2025: entre ~1.060 y
~1.458 según la línea) — no hay un tipo de cambio de cierre único y
declarado que citar como document_close (regla 0 de club-data-mapping/referencia/fx.md exige un número EXPLÍCITO, no uno inferido y
contradictorio entre líneas). fxSource:'market_close', fxRef apuntando a
FX_CLOSE (data/currency-map.js) para 'ARS@2024-12-31'/'ARS@2025-12-31' —
NINGUNA de las 2 fechas existe todavía ahí (se revisó currency-map.js
completo: solo hay entradas @2024-06-30/@2025-06-30 para ARS, cierres de
junio de otros clubes). Van a generar console.warn hasta que el
orquestador agregue esas 2 entradas (dólar mayorista BCRA/BNA de cierre al
31/12/2024 y al 31/12/2025) — ver reporte final de la sesión.

grossDebt: el Estado de Situación Patrimonial separa "Cuentas por pagar"
(2024, Nota 2.6: proveedores + deudas con clubes + tarjetas + cheques
diferidos + AFA/LCF + provisión de fútbol profesional — deuda operativa y
de pases) de "Remuneraciones y cargas sociales", "Cargas fiscales", "Otros
pasivos" y "Previsiones" — mismo criterio que Boca/Vélez (club-data-mapping/referencia/formato-simplificado.md, "grossDebt"): se usó la línea más angosta "Cuentas por pagar"
(corriente+no corriente), NO el Total del Pasivo completo. 2025 usa el
equivalente "Deudas con proveedores" (el balance 2025 reordenó los rubros
del pasivo respecto de 2024, pero mantiene la misma separación conceptual).
cash = "Caja y bancos" en los 2 años.

PRESIDENCIA: Andrés Miguel Fassi confirmado como Presidente en la Comisión
Directiva de LOS 2 ejercicios (2024: firma el Vicepresidente 1° "al solo
efecto de identificación", con Fassi listado como Presidente en la nómina
de la Comisión Directiva de la pág. 2; 2025: Fassi firma directamente como
"Presidente"). gestionId:'fassi', firstYear:2024, lastYear:2025 (solo lo
que estos 2 documentos confirman con certeza, sin asumir hacia atrás).

memberCountByClub: null — ningún documento declara la cantidad de socios.

VERIFICACIÓN (tie-out, hecha con node antes de cargar — 3 checks por año,
más los subtotales intermedios impresos por el propio documento, TODOS
exactos sin redondeo):
  2024: revenueLines suman 66852.071667 M (= officialTotalRevenue exacto,
    "Total Recursos"). |expenseLines| suman 51795.390034 M (=
    officialTotalExpenses exacto, "Total Gastos"). revenue + expenses +
    netInterest + tax = 66852.071667 - 51795.390034 - 1860.248365 + 0 =
    13196.433268 M = EXACTO el "RESULTADO DEL EJERCICIO - SUPERAVIT"
    impreso (13.196.433.268 ARS). Subtotales intermedios también exactos:
    Total Recursos Fútbol Profesional sin transferencias (35.727199339 M),
    Total Gastos Fútbol Profesional (39.531434862 M), Total Otros Gastos
    Ordinarios (12.263955172 M), Total Otros Recursos Ordinarios
    (4.470594687 M).
  2025: revenueLines suman 73164.540148 M (= officialTotalRevenue exacto).
    |expenseLines| suman 72560.192543 M (= officialTotalExpenses exacto).
    73164.540148 - 72560.192543 - 41.692293 + 0 = 562.655312 M = EXACTO
    el "RESULTADO DEL EJERCICIO - SUPERAVIT" impreso (562.655.312 ARS).
    Subtotales intermedios exactos: Total Recursos Fútbol Profesional sin
    transferencias (46.492143755 M), Total Gastos Fútbol Profesional
    (53.007037703 M), Total Otros Gastos Estructura (19.553154840 M),
    Total Otros Recursos (3.709783732 M).
  Los ~90 sub-ítems de `items` (desglose de cada línea de primer nivel,
  Anexos III/IV de 2024 y IV/V de 2025) también reconciliaron EXACTOS
  contra el valor de su línea padre, uno por uno, antes de cargar.
============================================================================
```

_de data/clubs.js:_

```text
3 clubes argentinos nuevos (sesión 2026-09-23, to-do 58 — barrido de sourcing del 2026-09-22
que descargó los PDFs, onboardeados en 3 agentes en paralelo): los 3 pasan de "sin nada
cargado" a tener ejercicios reales. `clubId` con sufijo de país porque son clubes NUEVOS
(Versión 129), a diferencia de los 11 argentinos de arriba, cargados antes de esa convención.
```

_de data/club-leagues/ar.js:_

```text
3 clubes nuevos (sesión 2026-09-23, onboarding de Talleres/Newell's/Banfield). Ninguno se
verificó contra Wikipedia línea por línea (mismo nivel de confianza que "conoce el dato" de
arriba, no una fuente primaria citada): Talleres jugó Copa Libertadores/Sudamericana los 2 años
(confirmado por sus propios ingresos "Copas internacionales" en data/talleres-ar-data.js, algo
que solo pasa jugando Primera); Newell's nunca descendió en toda su historia (hecho público muy
conocido del fútbol argentino); Banfield 2019-20 lo confirma el propio balance ("CONSIDERACIONES
REGLAMENTARIAS A.F.A./SAF", tratando la afiliación a la Superliga como vigente ese ejercicio).
```

## 2025

### Meta

```text
netInterest = "Resultados financieros y por tenencia" (línea única, el documento no la
desglosa en el propio Estado de Recursos y Gastos de 2025).
grossDebt = "Deudas con proveedores" (Estado de Situación Patrimonial, Pasivo Corriente),
equivalente 2025 de "Cuentas por pagar" de 2024 (mismo criterio, el balance reordenó las
etiquetas del pasivo entre un año y otro pero mantiene la separación deudas operativas/pases
vs. Deudas fiscales/laborales/Otras deudas/Previsiones).
```

## 2024

### Meta

```text
netInterest = Diferencias de cambio (-2118.541842) + Resultados por tenencia e intereses
(5166.919133) + Recpam (-4908.625656) = -1860.248365 M ARS.
grossDebt = "Cuentas por pagar" (Nota 2.6, corriente+no corriente: proveedores + deudas con
clubes + tarjetas + cheques diferidos + AFA/LCF + provisión de fútbol profesional),
EXCLUYE Remuneraciones y cargas sociales, Cargas fiscales, Otros pasivos y Previsiones —
mismo criterio de "línea más angosta" que Boca/Vélez (club-data-mapping/referencia/formato-simplificado.md).
cash = Caja y bancos (Estado de Situación Patrimonial, Activo Corriente).
```

## Fuentes

### talleres-ar-estados-contables-2024

_note (data/):_

```text
Descargado de clubtalleres.com.ar (nota de prensa de la Asamblea, no de una sección fija de transparencia — ver Admin/sourcing/Argentina/Talleres.md). Auditado, con Informe de la Comisión Revisora de Cuentas. Expresado en moneda homogénea (RT6) a la fecha de cierre. Ejercicio CALENDARIO (1/1/2024-31/12/2024). El Anexo V (Moneda Extranjera) no declara un tipo de cambio de cierre único — ver comentario de cabecera de data/talleres-ar-data.js. Transcripción completa en Clubes/Argentina/Talleres/estados-contables-2024.md.
```

### talleres-ar-estados-contables-2025

_note (data/):_

```text
Descargado de clubtalleres.com.ar (nota de prensa de la Asamblea 2026 — ver Admin/sourcing/Argentina/Talleres.md). Auditado, con Informe de la Comisión Revisora de Cuentas. Expresado en moneda homogénea (RT6) a la fecha de cierre. Ejercicio CALENDARIO (1/1/2025-31/12/2025). Transcripción completa en Clubes/Argentina/Talleres/estados-contables-2025.md.
```
