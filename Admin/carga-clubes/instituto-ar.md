# instituto — evidencia de carga

Lo que había como comentario en `data/ar/instituto-ar-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/instituto-ar-data.js — Instituto Atlético Central Córdoba: club nuevo, 4to del motor genérico
(después de River/Racing/Vélez). Un solo ejercicio cargado hasta ahora: 2023/2024 (Ejercicio
N°70, 1°/7/2023 a 30/6/2024), balance auditado real, texto nativo en el PDF (no hizo falta OCR).
PDF + transcripción en Clubes/Argentina/Instituto/balance-general-2023-2024.{pdf,md}.

El archivo del club también trae un Presupuesto 2025 (Clubes/Argentina/Instituto/
presupuesto-2025.pdf) y sus premisas, pero ESE documento presupuesta por AÑO CALENDARIO
(ene-25 a dic-25, formato de cash-flow mensual para AFA/LPF) en vez de por ejercicio económico
(jul-jun, el que usa el balance auditado) — no encaja en el mismo `year` key que el balance sin
forzar una equivalencia que el propio club no hace. Queda pendiente (ver to-do de index.html)
decidir cómo modelar un presupuesto de ejercicio calendario antes de cargarlo, no se cargó en
esta sesión.

Categorización del Anexo V ("Gastos Específicos de Sectores"): mismo mecanismo de columna-por-
sector que Vélez (Anexo III), ver club-data-mapping/referencia/formato-simplificado.md. Este Anexo tiene 6
columnas (Fútbol/Básquet/La Agustina/Sede/Colegio/Tienda) y CADA fila se carga partida en hasta 3
líneas de primer nivel, según qué columnas tenga con plata: Fútbol (-> wages_squad para
"Remuneraciones y cargas", -> other_expenses para el resto), Colegio (-> education_expense desde
la Versión 194, to-do 42) y el resto de columnas no-fútbol-no-colegio sumadas (Básquet+La
Agustina+Sede+Tienda -> youth_other_sports_expense). Cada columna usada en un split viene directo
del Anexo V impreso (ver Clubes/Argentina/Instituto/balance-general-2023-2024.md, pág. 17), no de
una estimación — y cada grupo de líneas partidas cierra exacto contra el total impreso de su fila.

"Comisiones y acuerdos de rescisión" (rubro de pases, 3.284,765346 M) se dejó en `other_expenses`,
NO en `player_amortisation`, siguiendo el precedente de Racing (club-data-mapping/referencia/formato-simplificado.md:
Boca tampoco mezcla comisiones de compraventa dentro de "Compra de jugadores"). "Compras y
préstamos de jugadores" (costo directo de adquisición, 213,545381 M) sí va a `player_amortisation`.

grossDebt: el Estado de Situación Patrimonial de Instituto no separa una línea "Deudas" de otras
categorías de pasivo (a diferencia de Boca/Vélez), pero SÍ tiene una "Previsión juicios" (pasivo
contingente por causas judiciales, Nota 4) que no es deuda financiera real. Se excluyó esa previsión
del cálculo (mismo espíritu que excluir Previsiones en Boca/Vélez, ver club-data-mapping/referencia/formato-simplificado.md, "grossDebt"):
grossDebt = TOTAL DEL PASIVO (3.336,889854 M) - Previsión juicios corriente+no corriente
(391,878758 + 180,641203 = 572,519961 M) = 2.764,369893 M.

netInterest = "Res. Fin. y por tenencia incluido RECPAM" (Nota 2.8, pág. 8), positivo este
ejercicio (intereses ganados/perdidos + diferencias de cambio + RECPAM, todo en una sola línea
combinada, mismo criterio que Vélez/Boca).

Verificado con verifyTieOuts(): Revenue, Expenses (incl. no-efectivo) y PAT cierran EXACTOS contra
el "Total recursos ordinarios"/"Total gastos ordinarios"/"SUPERÁVIT FINAL" impresos (pág. 3 del
balance). "Gastos extraordinarios" (Nota 3 y 2.9, -18,911650 M) se cargó como línea
`exceptional_items` — no participa del check de "Expenses" (que compara solo gasto ordinario +
no-efectivo), pero sí de PAT vía `operatingProfit`.
============================================================================
```

_de data/club-leagues/ar.js:_

```text
ascendido para 2023, ya en Primera al cierre
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Argentina/Instituto/balance-general-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Argentina/Instituto/balance-general-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Para fines generales (Anexo III) | pág. 3, Jev 0.99 |
| 2 | Centros educativos | pág. 15, precedente |
| 3 | Abonos deportivos sede | pág. 15, precedente |
| 4 | Derechos de TV | pág. 15, precedente |
| 5 | Entradas generales fútbol | pág. 15, precedente |
| 6 | Entradas plateas y palcos fútbol | pág. 15, precedente |
| 7 | Publicidad institucional | pág. 15, precedente |
| 8 | Publicidad otras competencias | pág. 15, precedente |
| 9 | Publicidad y sponsors fútbol | pág. 15, precedente |
| 10 | Recursos predio La Agustina | pág. 15, precedente |
| 11 | Transferencias y préstamos de jugadores | pág. 15, precedente |
| 12 | Ventas de salón Gloriamanía | pág. 15, precedente |
| 13 | Subsidios recibidos | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones y cargas | pág. 16, Claude 0.9 |
| 2 | Honorarios | pág. 16, Claude 0.9 |
| 3 | Servicios, luz, agua, gas, etc. | pág. 16, precedente |
| 4 | Gastos bancarios | pág. 16, precedente |
| 5 | Gastos de juicios | pág. 16, precedente |
| 6 | (Recuperos) / Quebranto por Juicios | pág. 16, Claude 0.85 |
| 7 | Seguros | pág. 17, precedente |
| 8 | Honorarios | pág. 17, Claude 0.9 |
| 9 | Diversos | pág. 17, precedente |
| 10 | Mantenimiento de bienes de uso | pág. 17, precedente |
| 11 | Vigilancia sede | pág. 17, precedente |
| 12 | Servicios de energía, agua, gas, etc.. | pág. 17, precedente |
| 13 | Gastos generales por eventos deportivos | pág. 17, precedente |
| 14 | Viajes y concentraciones | pág. 17, precedente |
| 15 | Compras de mercadería | pág. 17, precedente |
| 16 | Comisiones y acuerdos de rescisión | pág. 17, precedente |
| 17 | Limpieza y vigilancia | pág. 17, precedente |
| 18 | Compras y préstamos de jugadores | pág. 17, precedente |
| 19 | Vigilancia La Agustina | pág. 17, precedente |
| 20 | Depreciación de bienes de uso (Anexo I) | pág. 3, precedente |
| 21 | Amortización de Intangibles (Anexo II) | pág. 3, Jev 0.91 |
| 22 | Gastos extraordinarios(Nota 3 y 2.9.) | pág. 3, precedente |
| 23 | Remuneraciones y cargas (Fútbol Profesional) | pág. ?, precedente |
| 24 | Remuneraciones y cargas (Colegio) | pág. 17, precedente |
| 25 | Remuneraciones y cargas (Básquet/La Agustina/Sede/Tienda) | pág. 17, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. L99 repite 'Gastos extraordinarios' (L98, 1.038.794): las dos estaban como gasto y las filas sumaban 2 x 1.038.794 de más (diferencia 2.077.588 contra el total impreso); con la fila en 0 el resultado cierra con el Superávit final impreso 2.087.261.474. Claude 2026-10-19 (subagente Sonnet, revisado contra el .md L98-100)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): fila = 4.068.248.882. Anexo V (gastos específicos de sectores) imprime 'Remuneraciones y cargas' por columna de sector; la fila total (6.086.836.134) mezclaba el fútbol con el colegio y el resto. Se parte por columna como en el ejercicio 2023-24 (TODO 351): columna FUTBOL
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): fila = 1.174.886.574. Anexo V, columna COLEGIO de 'Remuneraciones y cargas' (TODO 351)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): fila = 843.700.678. Anexo V, columnas BASQUET (--) + LA AGUSTINA 468.718.384 + SEDE 312.325.195 + TIENDA 62.657.099 de 'Remuneraciones y cargas' (TODO 351)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): categoria = wages_squad. Columna FUTBOL del Anexo V: sueldos del fútbol profesional (precedente del ejercicio 2023-24)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): categoria = education_expense. Columna COLEGIO del Anexo V (precedente del ejercicio 2023-24)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): categoria = youth_other_sports_expense. Resto de las columnas del Anexo V (precedente del ejercicio 2023-24)
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Gastos

_antes de la fila 1 (`Remuneraciones y cargas (Fútbol Profesional)`):_

```text
Anexo V, fila "Remuneraciones y cargas" (3.937,353593 M total impreso), separada por columna
de sector: Fútbol Profesional (2.501,512775) / Colegio (979,100475) / resto (Básquet 0 + La
Agustina 214,946875 + Sede 170,658677 + Tienda 71,134791 = 456,740343).
```

_antes de la fila 4 (`Seguros (Colegio)`):_

```text
RESTO DE ANEXO V, DESGLOSADO POR SECTOR (corregido el 2026-09-20, to-do 20(b); Colegio
separado del resto no-fútbol el 2026-09-22, Versión 194, to-do 42 — antes de esa versión
`education_expense` no existía, así que Colegio se sumaba junto con Básquet/La
Agustina/Sede/Tienda en `youth_other_sports_expense`, sin fila propia).
ACÁ DECÍA "sin desglose por sector — no son filas de personal, no aplica el criterio de
columna Fútbol Profesional de arriba", Y ERA FALSO: el Anexo V tiene las 6 columnas
(FUTBOL / BASQUET / LA AGUSTINA / SEDE / COLEGIO / TIENDA) para TODAS sus filas, no solo
para las de personal. Con el desglose sin usar, 2.425,8 M ARS que el propio balance
atribuye a sectores no-fútbol quedaban en el catch-all "Otros gastos", que se llevaba el
42% del ejercicio y no decía nada. Es el criterio de club-data-mapping/referencia/formato-simplificado.md (Vélez), que
este archivo ya aplicaba a Remuneraciones y a Honorarios y no al resto.
NINGÚN PESO SE MUEVE: `other_expenses`, `education_expense` y `youth_other_sports_expense`
son las tres gasto operativo en efectivo y las tres suman a `otherExpenses` en
computeYearGeneric(). Las filas que son 100% de un solo sector van enteras (ej. "Seguros",
100% Colegio); las mixtas se parten en tantas líneas como columnas del Anexo tengan plata, y
cada grupo cierra exacto contra el total impreso de su fila.
```

_antes de la fila 5 (`Honorarios (Colegio)`):_

```text
Honorarios: Básquet 833,133038 + La Agustina 171,642083 + Sede 33,624717 + Colegio 80,466336
= 1.118,866174 impreso (columna FUTBOL es 0 en esta fila).
```

_antes de la fila 7 (`Diversos (Fútbol Profesional)`):_

```text
Diversos: FUTBOL 1.123,895617 + (Básquet 264,516282 + La Agustina 207,123376 + Sede
142,326601 + Colegio 73,671180 + Tienda 25,391667 = 713,029106) = 1.836,924723 impreso.
La columna FUTBOL se queda en el catch-all porque el Anexo no la abre más: "Diversos" es
literalmente lo que dice el documento y no hay dónde ir a buscar el detalle.
```

_antes de la fila 10 (`Mantenimiento de bienes de uso (Fútbol Profesional)`):_

```text
Mantenimiento: FUTBOL 167,652401 + (La Agustina 403,420203 + Sede 155,621600 + Colegio
145,746239 = 704,788042) = 872,440443 impreso.
```

_antes de la fila 14 (`Servicios de energía, agua, gas, etc. (Fútbol Profesional)`):_

```text
Servicios: FUTBOL 13,240852 + (La Agustina 76,165275 + Sede 16,249603 + Colegio 6,010492 +
Tienda 6,773240 = 105,198610) = 118,439462 impreso.
```

_antes de la fila 20 (`Comisiones y acuerdos de rescisión`):_

```text
Comisiones/rescisiones de pases: en `other_expenses`, NO en `player_amortisation` (precedente
de Racing, ver club-data-mapping/referencia/formato-simplificado.md — Boca tampoco mezcla comisiones ahí).
RE-CONFIRMADO el 2026-09-20 contra el Anexo V: esta fila es 100% de la columna FUTBOL
(3.284.765.346 y cero en las otras cinco), o sea que NO hay un desglose por sector que
aprovechar como en las filas de arriba. Se queda donde está, y es la línea que sola explica
19,6% de los gastos del ejercicio: el catch-all de Instituto no baja de ahí sin cambiar el
criterio de comisiones, que es una decisión ya tomada para todo el sitio.
```

_antes de la fila 24 (`Remuneraciones y cargas (administración)`):_

```text
Anexo IV, "Gastos Generales de Administración" (1.919,810448 M total impreso).
```

_antes de la fila 30 (`Depreciación de bienes de uso`):_

```text
Depreciación (Anexo I) y amortización de intangibles (Anexo II, "Plantel Profesional" —
valuación del pase de jugadores propios, ver Nota 1.2.b).
```

_antes de la fila 32 (`Gastos extraordinarios`):_

```text
Gastos extraordinarios (Nota 3 y 2.9): fuera de "Gastos ordinarios", no participa del check de
Expenses de verifyTieOuts(), sí de PAT.
```

### Meta

```text
grossDebt = TOTAL DEL PASIVO (3.336,889854) - Previsión juicios corriente+no corriente
(391,878758+180,641203=572,519961), ver comentario de cabecera. cash = Caja y bancos.
netInterest = "Res. Fin. y por tenencia incluido RECPAM" (Nota 2.8).
officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
ordinarios" impresos (pág. 3). SUPERÁVIT FINAL real (post-extraordinarios): $1.830.503.804 ARS.
```

## Fuentes

### instituto-ar-balance-2023-24

_note (data/):_

```text
PDF oficial (17 páginas, texto nativo, sin necesidad de OCR), con informe de auditoría de fecha 15/10/2024. Instituto es el primer club nuevo agregado al sitio después de Vélez (Versión 94). Cifras en moneda homogénea reexpresada (RT 6, Resol. JG FACPCE 539/18). Convertido a USD con $909, el dólar mayorista de cierre al 30/6/2024 (mismo tipo de cambio ya usado para Racing y Vélez en esa misma fecha de cierre — el documento de Instituto no declara su propio tipo de cambio, a diferencia de Boca/Racing/Vélez, no tiene Anexo de moneda extranjera). SUPERÁVIT FINAL real del ejercicio: $1.830.503.804 ARS. El Anexo V ("Gastos Específicos de Sectores") desglosa gasto por sector (Fútbol/Básquet/La Agustina/Sede/Colegio/Tienda), mismo mecanismo que el Anexo III de Vélez para separar "Salarios y primas (plantel y cuerpo técnico)" del resto — ver comentario completo en data/ar/instituto-ar-data.js. Presidente: Juan Manuel Cavagliatto ("Juntos por Instituto"), electo 4/5/2021, reelecto para el período 2022-2025 (institutoacc.com.ar/index.php/asumio-la-nueva-comision-directiva-en-instituto/), cubre la totalidad de este ejercicio. Club con 30.000 socios (institutoacc.com.ar/index.php/somos-30-mil-socios-y-socias/).
```

### instituto-ar-balance-general-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Argentina/Instituto/balance-general-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Versión 95 (Guido: "onboard all pdfs we have"): con 6+ clubes del motor genérico sumándose en la
misma sesión, extender a mano 8 ternarios `clubId === 'river-ar' ? ... : clubId === 'racing-ar' ? ... :
...` por cada club nuevo (finanzas-calc.js x5, finanzas-render.js x2, index.html x3) dejó de
escalar — cada club nuevo era una rama más en CADA uno de esos 8 lugares, alto riesgo de
olvidarse uno (exactamente el problema que ya advertía club-or-year-onboarding/SKILL.md sección
2). Reemplazado por un registro simple: cada data/<país>/<club>-data.js se anota a sí mismo en
`window.CLUB_GENERIC_DATA[clubId]` (un objeto plano, sin ternarios) al final del archivo. Los 8
call-sites ahora hacen `CLUB_GENERIC_DATA[clubId].fiscalYearMeta` (etc.) en vez de la cadena de
ternarios — agregar un club nuevo de acá en más significa SOLO agregar este bloque a su propio
archivo de datos, sin tocar finanzas-calc.js/finanzas-render.js/index.html nunca más para esto.
`const` de nivel superior en un script clásico (no-módulo) NO cuelga de `window`, por eso hace
falta la asignación explícita acá — no se puede hacer `window[clubId + 'FiscalYearMeta']`
directamente sobre las consts ya declaradas.
```

### gestionesByClub.instituto

```text
Confirmado por búsqueda (Versión 94): Juan Manuel Cavagliatto asumió por primera vez el
4/5/2021 y fue reelecto para el período 2022-2025, cubriendo la totalidad del Ejercicio
2023/2024 (el único cargado hasta ahora).
```
