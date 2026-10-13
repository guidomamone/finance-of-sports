# inter-it — evidencia de carga

Lo que había como comentario en `data/it/inter-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/inter-it-data.js — F.C. Internazionale Milano S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "inter-it" — slug de "Inter" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "F.C. Internazionale Milano S.p.A." — el .md, 50 veces (nombre del club + forma societaria)
  displayName        ok        "Inter" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (368 de 391 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 74 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] sc internacional: #E5050F Red, #FFFFFF White | [colombia] internacional de bogota: #C49F65 gold, #
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (368 de 391 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 5 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "inter-it-fascicolo-bilancio-consolidato-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Inter Milan" = "Inter"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"inter-it-fascicolo-bilancio-consolidato-2024-25"}
============================================================================
```

_de data/clubs.js:_

```text
Inter: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Inter.md.
```

_de data/club-leagues/it.js:_

```text
Inter (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Inter Milan" = "Inter".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 46, Jev 1 |
| 2 | b) abbonamenti | pág. 46, Jev 1 |
| 3 | 2) Variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 46, Jev 0.99 |
| 4 | - altri contributi in conto esercizio | pág. 46, Jev 0.97 |
| 5 | b) proventi da sponsorizzazioni | pág. 46, Jev 1 |
| 6 | c) proventi pubblicitari | pág. 46, Jev 1 |
| 7 | d) proventi commerciali e royalties | pág. 46, Jev 1 |
| 8 | e) proventi da cessione diritti audiovisivi | pág. 46, Jev 1 |
| 9 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 46, Jev 0.99 |
| 10 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 46, Jev 1 |
| 11 | - proventi diversi da trasferimento diritti calciatori | pág. 46, Jev 0.94 |
| 12 | i) ricavi e proventi diversi | pág. 46, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo | pág. 46, Jev 0.99 |
| 2 | 7) Per servizi | pág. 46, Jev 1 |
| 3 | 8) Per godimento di beni di terzi | pág. 46, Jev 0.99 |
| 4 | a) salari e stipendi | pág. 46, Jev 1 |
| 5 | b) oneri sociali | pág. 46, Jev 0.92 |
| 6 | c) trattamento di fine rapporto | pág. 46, Jev 0.92 |
| 7 | e) altri costi | pág. 46, Claude 0.88 |
| 8 | a) ammortamento immobilizzazioni immateriali | pág. 46, Claude 0.88 |
| 9 | b) ammortamento immobilizzazioni materiali | pág. 46, Jev 1 |
| 10 | c) svalutazioni delle immobilizzazioni | pág. 46, Jev 0.98 |
| 11 | d) svalutazioni di crediti compresi nell'attivo circolante e nelle disponibilità liquide | pág. 46, Jev 1 |
| 12 | 12) Accantonamenti per rischi | pág. 46, Jev 0.98 |
| 13 | 13) Altri accantonamenti | pág. 46, Claude 0.92 |
| 14 | a) oneri da organizzazione competizioni | pág. 46, Jev 1 |
| 15 | b) costi da acquisizione temporanea prestazioni calciatori | pág. 46, Jev 1 |
| 16 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 46, Jev 0.99 |
| 17 | - oneri diversi da trasferimento diritti calciatori | pág. 46, Jev 1 |
| 18 | e) altri oneri diversi di gestione | pág. 46, Jev 0.99 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 780.928. D) 18) rettifiche: la fila no se extrajo (to-do 155). Sin reemplaza: la toma el escalón 'ajustes del financiero sin reemplaza' de verificar.mjs (to-do 156 B), ya no hace falta --reemplaza-linea
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Championship matches | pág. 81, precedente |
| 2 | - TIM Cup matches | pág. 81, Jev 0.98 |
| 3 | - International Cup matches | pág. 81, precedente |
| 4 | - Tournaments and friendly matches | pág. 81, precedente |
| 5 | b) season tickets | pág. 44, precedente |
| 6 | 2) Changes in inventories of work in progress, semi-finished and finished products | pág. 44, precedente |
| 7 | a) grants and contribution | pág. 44, precedente |
| 8 | b) sponsorships | pág. 44, precedente |
| 9 | c) advertising income | pág. 44, precedente |
| 10 | d) commercial income and royalties | pág. 44, precedente |
| 11 | - television revenues | pág. 82, Jev 1 |
| 12 | - television income from UEFA competitions | pág. 82, Jev 0.99 |
| 13 | - Other television income | pág. 82, Jev 1 |
| 14 | f) revenues from temporary loan of players | pág. 44, precedente |
| 15 | g) gains on sale of player registrations rights | pág. 44, precedente |
| 16 | h) other income from player management | pág. 44, precedente |
| 17 | i) sundry revenues and income | pág. 44, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Technical material | pág. 83, precedente |
| 2 | Consumables | pág. 83, precedente |
| 3 | Health material | pág. 83, precedente |
| 4 | E-commerce material | pág. 83, precedente |
| 5 | Other | pág. 83, precedente |
| 6 | Costs for training sessions and camps | pág. 84, precedente |
| 7 | Health expenses | pág. 84, precedente |
| 8 | Fees for self-employed contractors | pág. 84, precedente |
| 9 | Retirement costs | pág. 84, precedente |
| 10 | Expenses for maintenance of sport pitches | pág. 84, precedente |
| 11 | Sundry | pág. 84, precedente |
| 12 | Player scouting and trials | pág. 84, precedente |
| 13 | Subsidized teams | pág. 84, precedente |
| 14 | Transfer campaign agent fees | pág. 84, Jev 1 |
| 15 | Costs for accomodation, food, transport | pág. 84, precedente |
| 16 | Ticketing service, ground admission, security control | pág. 84, precedente |
| 17 | Insurance and pension | pág. 84, precedente |
| 18 | Intercampus | pág. 84, precedente |
| 19 | Administrative, advertising and general | pág. 84, precedente |
| 20 | Licence to use Meazza Stadium | pág. 86, precedente |
| 21 | Rental expenses | pág. 86, precedente |
| 22 | Operating lease payments | pág. 86, precedente |
| 23 | Other user licence fees | pág. 86, precedente |
| 24 | Concession sports facilities | pág. 86, precedente |
| 25 | Rental fees | pág. 86, Jev 1 |
| 26 | Other Rental fees | pág. 86, precedente |
| 27 | a) salaries and wages | pág. 44, precedente |
| 28 | b) social security contributions | pág. 44, precedente |
| 29 | c) employee severance indemnity | pág. 44, precedente |
| 30 | e) other costs | pág. 44, precedente |
| 31 | a) amortisation of intangibles assets | pág. 44, precedente |
| 32 | b) depreciation of tangible | pág. 44, precedente |
| 33 | c) write-downs of assets | pág. 44, precedente |
| 34 | d) write-downs of doubtful account receivables included in current assets | pág. 44, precedente |
| 35 | 12) Provision for risks | pág. 44, precedente |
| 36 | 13) Other provisions | pág. 44, precedente |
| 37 | a) various costs of organising competitions | pág. 44, precedente |
| 38 | b) costs for the temporary acquisition of players | pág. 44, precedente |
| 39 | c) losses from the sale of player registrations | pág. 44, precedente |
| 40 | d) other expenses from player management | pág. 44, precedente |
| 41 | - Costs, fines and penalties for matches | pág. 88, precedente |
| 42 | - Indirect tax expenses | pág. 88, precedente |
| 43 | - Contributions from Football League | pág. 88, precedente |
| 44 | - Transactions and compensation | pág. 88, precedente |
| 45 | - Cost of previously years | pág. 88, precedente |
| 46 | - Sundry costs | pág. 88, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Championship matches | pág. 47, precedente |
| 2 | - Coppa Italia matches | pág. 47, precedente |
| 3 | - International Cup matches | pág. 47, precedente |
| 4 | - Tournaments and friendly matches | pág. 47, precedente |
| 5 | b) season tickets | pág. 14, precedente |
| 6 | 2) Changes in inventories of work in progress, semi-finished and finished products | pág. 14, precedente |
| 7 | 4) Capitalization of youth programme costs | pág. 14, precedente |
| 8 | a) grants and contribution | pág. 14, precedente |
| 9 | b) sponsorships | pág. 14, precedente |
| 10 | c) advertising income | pág. 14, precedente |
| 11 | d) commercial income and royalties | pág. 14, precedente |
| 12 | - television revenues | pág. 48, precedente |
| 13 | - television income from UEFA competitions | pág. 48, precedente |
| 14 | - Other television income | pág. 48, precedente |
| 15 | f) revenues from temporary loan of players | pág. 14, precedente |
| 16 | g) gains on sale of player registrations rights | pág. 14, precedente |
| 17 | h) other income from player management | pág. 14, precedente |
| 18 | i) sundry revenues and income | pág. 14, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Technical material | pág. 49, precedente |
| 2 | Consumables | pág. 49, precedente |
| 3 | Health material | pág. 49, precedente |
| 4 | E-commerce material | pág. 49, precedente |
| 5 | Other | pág. 49, precedente |
| 6 | Costs for training sessions and camps | pág. 50, precedente |
| 7 | Health expenses | pág. 50, precedente |
| 8 | Fees for self-employed contractors | pág. 50, precedente |
| 9 | Retirement costs | pág. 50, precedente |
| 10 | Expenses for maintenance of sport pitches | pág. 50, precedente |
| 11 | Sundry | pág. 50, precedente |
| 12 | Player scouting and trials | pág. 50, precedente |
| 13 | Subsidized teams | pág. 50, precedente |
| 14 | Transfer market agent fees | pág. 50, precedente |
| 15 | Sundry | pág. 50, precedente |
| 16 | Costs for accomodation, food, transport | pág. 50, precedente |
| 17 | Ticketing service, ground admission, security control | pág. 50, precedente |
| 18 | Insurance and pension | pág. 50, precedente |
| 19 | Intercampus | pág. 50, precedente |
| 20 | Administrative, advertising and general | pág. 50, precedente |
| 21 | Licence to use Meazza Stadium | pág. 51, precedente |
| 22 | Rental expenses | pág. 51, precedente |
| 23 | Operating lease payments | pág. 51, precedente |
| 24 | Other user licence fees | pág. 51, precedente |
| 25 | Concession sports facilities | pág. 51, precedente |
| 26 | Rental fees | pág. 51, precedente |
| 27 | Other Rental fees | pág. 51, precedente |
| 28 | a) salaries and wages | pág. 14, precedente |
| 29 | b) social security contributions | pág. 14, precedente |
| 30 | c) employee severance indemnity | pág. 14, precedente |
| 31 | e) other costs | pág. 14, precedente |
| 32 | a) amortisation of intangibles assets | pág. 14, precedente |
| 33 | b) depreciation of tangible | pág. 14, precedente |
| 34 | c) write-downs of assets | pág. 14, precedente |
| 35 | d) write-downs of doubtful account receivables included in current assets | pág. 14, precedente |
| 36 | 12) Provision for risks | pág. 14, precedente |
| 37 | 13) Other provisions | pág. 14, precedente |
| 38 | a) various costs of organising competitions | pág. 14, precedente |
| 39 | b) costs for the temporary acquisition of players | pág. 14, precedente |
| 40 | c) losses from the sale of player registrations | pág. 14, precedente |
| 41 | d) other expenses from player management | pág. 14, precedente |
| 42 | - Costs, fines and penalties for matches | pág. 54, precedente |
| 43 | - Indirect tax expenses | pág. 54, precedente |
| 44 | - Contributions from Football League | pág. 54, precedente |
| 45 | - Transactions and compensation | pág. 54, precedente |
| 46 | - Cost of previous years | pág. 54, precedente |
| 47 | - Sundry costs | pág. 54, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Championship matches | pág. 53, Jev 0.97 |
| 2 | - Coppa Italia matches | pág. 53, Jev 0.97 |
| 3 | - International Cup matches | pág. 53, Claude 0.8 |
| 4 | - Tournaments and friendly matches | pág. 53, Jev 0.99 |
| 5 | b) revenue from away matches | pág. 17, precedente |
| 6 | c) season tickets | pág. 17, Jev 1 |
| 7 | - Inter Club/Member Fan Cards | pág. 53, Jev 0.98 |
| 8 | - Sponsorship EU in house | pág. 53, Jev 0.98 |
| 9 | - Sponsorship Regional | pág. 53, Jev 1 |
| 10 | - Rai-Infront-CSB-Dazn Library | pág. 53, Jev 0.93 |
| 11 | - Inter TV | pág. 53, Jev 0.97 |
| 12 | - Others | pág. 53, Jev 0.99 |
| 13 | 2) Changes in inventories of work in progress, semi-finished and finished products | pág. 17, precedente |
| 14 | 4) Capitalization of youth programme costs | pág. 17, precedente |
| 15 | a) grants and contribution | pág. 17, Jev 0.98 |
| 16 | b) sponsorships | pág. 17, Jev 1 |
| 17 | c) advertising income | pág. 17, Jev 1 |
| 18 | d) commercial income and royalties | pág. 17, Jev 1 |
| 19 | - television revenues | pág. 17, Jev 1 |
| 20 | - television income from participation in UEFA competitions | pág. 17, Jev 0.97 |
| 21 | g) revenues from temporary loan of players | pág. 17, Jev 0.99 |
| 22 | h) gains on sale of player registrations rights | pág. 17, Jev 1 |
| 23 | i) other income from player management | pág. 17, precedente |
| 24 | l) sundry revenues and income | pág. 17, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Technical material | pág. 56, precedente |
| 2 | Consumables | pág. 56, precedente |
| 3 | Health material | pág. 56, precedente |
| 4 | E-commerce material | pág. 56, precedente |
| 5 | Other | pág. 56, Jev 0.93 |
| 6 | Costs for training sessions and camps | pág. 57, precedente |
| 7 | Health expenses | pág. 57, precedente |
| 8 | Fees for self-employed contractors | pág. 57, precedente |
| 9 | Retirement costs | pág. 57, precedente |
| 10 | Expenses for maintenance of sport pitches | pág. 57, precedente |
| 11 | Sundry | pág. 57, Jev 0.91 |
| 12 | Player scouting and trials | pág. 57, precedente |
| 13 | Subsidized teams | pág. 57, precedente |
| 14 | Transfer market agent fees | pág. 57, precedente |
| 15 | Sundry | pág. 57, Jev 0.91 |
| 16 | Costs for accomodation, food, transport | pág. 57, Jev 1 |
| 17 | Ticketing service, ground admission, security control | pág. 57, Jev 1 |
| 18 | Insurance and pension | pág. 57, precedente |
| 19 | Intercampus | pág. 57, precedente |
| 20 | Administrative, advertising and general | pág. 57, Jev 1 |
| 21 | Licence to use Meazza Stadium | pág. 58, precedente |
| 22 | Rental expenses | pág. 58, precedente |
| 23 | Operating lease payments | pág. 58, precedente |
| 24 | Other user licence fees | pág. 58, Jev 0.93 |
| 25 | Concession sports facilities | pág. 58, precedente |
| 26 | Other Rental fees | pág. 58, precedente |
| 27 | a) salaries and wages | pág. 17, Jev 0.99 |
| 28 | b) social security contributions | pág. 17, Jev 0.95 |
| 29 | c) employee severance indemnity | pág. 17, precedente |
| 30 | e) other costs | pág. 17, precedente |
| 31 | a) amortisation of intangibles assets | pág. 17, precedente |
| 32 | b) depreciation of tangible | pág. 17, Jev 1 |
| 33 | c) write-downs of assets | pág. 17, precedente |
| 34 | d) write-downs of doubtful account receivables included in current assets | pág. 17, Jev 0.96 |
| 35 | 12) Provision for risks | pág. 17, precedente |
| 36 | 13) Other provisions | pág. 17, precedente |
| 37 | a) various costs of organising competitions | pág. 17, Jev 0.97 |
| 38 | b) competition registration fees | pág. 17, Jev 0.99 |
| 39 | - percentage of match takings paid to visiting teams | pág. 17, precedente |
| 40 | d) costs for the temporary acquisition of players | pág. 17, precedente |
| 41 | e) losses from the sale of player registrations | pág. 17, Jev 0.94 |
| 42 | f) other expenses from player management | pág. 17, Jev 0.97 |
| 43 | - Costs, fines and penalties for matches | pág. 61, precedente |
| 44 | - Indirect tax expenses | pág. 61, Jev 0.98 |
| 45 | - Contributions from Football League | pág. 61, precedente |
| 46 | - Transactions and compensation | pág. 61, precedente |
| 47 | - Cost of previously years | pág. 61, Jev 0.96 |
| 48 | - Sundry costs | pág. 61, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 521.197. D) rettifiche quedaban sin lado (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2020-21-en.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2020-21-en.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Inter Club/Member Fan Cards | pág. 54, precedente |
| 2 | - Sponsorship EU in house | pág. 54, precedente |
| 3 | - Sponsorship Regional | pág. 54, precedente |
| 4 | - Sponsorship Global | pág. 54, Jev 1 |
| 5 | - Rai-Infront Library | pág. 54, Jev 1 |
| 6 | - Inter TV | pág. 54, precedente |
| 7 | - Others | pág. 54, precedente |
| 8 | Coaches compensation and bonuses | pág. 55, Jev 0.9 |
| 9 | Inps – Enpals – cost for coaches | pág. 55, Claude 0.88 |
| 10 | Coaches and of career allowances | pág. 55, Jev 0.95 |
| 11 | Health care costs | pág. 55, Jev 0.97 |
| 12 | Retirement management | pág. 55, Jev 0.91 |
| 13 | Sport Facilities | pág. 55, Claude 0.85 |
| 14 | Room and Board for the matches | pág. 55, Claude 0.85 |
| 15 | a) grants and contribution | pág. 16, precedente |
| 16 | b) sponsorships | pág. 16, precedente |
| 17 | c) advertising income | pág. 16, precedente |
| 18 | d) commercial income and royalties | pág. 16, precedente |
| 19 | - television revenues | pág. 16, precedente |
| 20 | - television income from participation in UEFA competitions | pág. 16, precedente |
| 21 | 8) revenues from temporary loan of players | pág. 16, precedente |
| 22 | h) gains on sale of player registrations rights | pág. 16, precedente |
| 23 | i) other income from player management | pág. 16, precedente |
| 24 | I) sundry revenues and income | pág. 16, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Technical material | pág. 56, precedente |
| 2 | Consumables | pág. 56, precedente |
| 3 | Health material | pág. 56, precedente |
| 4 | Other | pág. 56, precedente |
| 5 | Costs for training sessions and camps | pág. 57, precedente |
| 6 | Health expenses | pág. 57, precedente |
| 7 | Fees for self-employed contractors | pág. 57, precedente |
| 8 | Retirement costs | pág. 57, precedente |
| 9 | Expenses for maintenance of sport pitches | pág. 57, precedente |
| 10 | Sundry | pág. 57, precedente |
| 11 | Player scouting and trials | pág. 57, precedente |
| 12 | Subsidized teams | pág. 57, precedente |
| 13 | Transfer campaign agent fees | pág. 57, precedente |
| 14 | Sundry | pág. 57, precedente |
| 15 | Costs for accomodation, food, transport | pág. 57, precedente |
| 16 | Ticketing service, ground admission, security control | pág. 57, precedente |
| 17 | Insurance and pension | pág. 57, precedente |
| 18 | Intercampus | pág. 57, precedente |
| 19 | Administrative, advertising and general | pág. 57, precedente |
| 20 | Licence to use Meazza Stadium | pág. 58, precedente |
| 21 | Rental expenses | pág. 58, precedente |
| 22 | Operating lease payments | pág. 58, precedente |
| 23 | Other user licence fees | pág. 58, precedente |
| 24 | Concession sports facilities | pág. 58, precedente |
| 25 | Other Rental fees | pág. 58, precedente |
| 26 | a) salaries and wages | pág. 16, precedente |
| 27 | b) social security contributions | pág. 16, precedente |
| 28 | c) employee severance indemnity | pág. 16, precedente |
| 29 | e) other costs | pág. 16, precedente |
| 30 | a) amortisation of intangibles assets | pág. 16, precedente |
| 31 | b) depreciation of tangible | pág. 16, precedente |
| 32 | c) write-downs of assets | pág. 16, precedente |
| 33 | receivables included in current assets | pág. 16, precedente |
| 34 | 12) Provision for risks | pág. 16, precedente |
| 35 | 13) Other provisions | pág. 16, precedente |
| 36 | a) various costs of organising competitions | pág. 16, precedente |
| 37 | b) competition registration fees | pág. 16, precedente |
| 38 | d) costs for the temporary acquisition of players | pág. 16, precedente |
| 39 | e) losses from the sale of player registrations | pág. 16, precedente |
| 40 | f) other expenses from player management | pág. 16, precedente |
| 41 | - Costs, fines and penalties for matches | pág. 61, precedente |
| 42 | - Indirect tax expenses | pág. 61, precedente |
| 43 | - Contributions from Football League | pág. 61, precedente |
| 44 | - Cost of previously years | pág. 61, precedente |
| 45 | - Sundry costs | pág. 61, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): resultado-final = (245.579.264). Claude 2026-10-08 (Guido: to-do 179, ok): el resultado impreso quedó afuera de las filas; cierra exacto con los totales impresos (364.712.220 - 568.782.409 - 33.431.112 - 1.972.728 - 6.105.235)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1.972.728). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la sección D (19 impairment of investments, 1.972.728 impreso en negativo) no entró en el financiero: el impuesto deducido daba 8,08 M contra 6,105 M impresos (current 4.009.004 + deferred -3.805 + 2.100.036)
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 49, Jev 0.99 |
| 2 | - Gare Tim Cup | pág. 49, Jev 0.98 |
| 3 | - Gare Coppe Internazionali | pág. 49, Claude 0.95 |
| 4 | - Tomei e amichevoli | pág. 49, Jev 0.98 |
| 5 | c) abbonamenti | pág. 16, precedente |
| 6 | - Quote Inter Club/Tessere del tifoso | pág. 49, Jev 1 |
| 7 | - Sponsorship EU in house | pág. 49, Jev 0.98 |
| 8 | - Sponsorship Regional | pág. 49, Jev 1 |
| 9 | - Sponsorship Global | pág. 49, Jev 1 |
| 10 | - Archivio Rai/Infront | pág. 49, Jev 0.9 |
| 11 | - Inter Tv | pág. 49, Jev 0.97 |
| 12 | - Diversi | pág. 49, precedente |
| 13 | 4) Capitalizzazione costi vivaio | pág. 16, Claude 0.93 |
| 14 | a) contributi in conto esercizio | pág. 16, Jev 0.97 |
| 15 | b) proventi da sponsorizzazioni | pág. 16, precedente |
| 16 | c) proventi pubblicitari | pág. 16, precedente |
| 17 | d) proventi commerciali e royalties | pág. 16, precedente |
| 18 | - proventi televisivi | pág. 16, Jev 1 |
| 19 | - proventi televisivi da partecip. a compet. UEFA | pág. 16, Jev 0.97 |
| 20 | f) proventi vari | pág. 16, Jev 1 |
| 21 | g) ricavi da cessione temporanea prestazioni calciat. | pág. 16, Jev 0.97 |
| 22 | h) plusvalenze da cessione dir. plur. prest. calciatori | pág. 16, Jev 1 |
| 23 | i) altri proventi da gestione calciatori | pág. 16, Jev 0.92 |
| 24 | l) ricavi e proventi diversi | pág. 16, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico | pág. 51, Jev 0.95 |
| 2 | Materiale consumo | pág. 51, Jev 0.92 |
| 3 | Materiale sanitario | pág. 51, Claude 0.93 |
| 4 | Altri | pág. 51, Jev 0.98 |
| 5 | Costi per allenamenti e ritiri | pág. 52, Jev 0.98 |
| 6 | Spese sanitarie | pág. 52, Claude 0.92 |
| 7 | Compensi lavoratori autonomi | pág. 52, Jev 0.95 |
| 8 | Costi pensionato | pág. 52, Claude 0.8 |
| 9 | Spese per manutenzione campi sportivi | pág. 52, Claude 0.92 |
| 10 | Diversi | pág. 52, Jev 0.96 |
| 11 | Osservazione calciatori | pág. 52, Claude 0.92 |
| 12 | Squadre sovvenzionate | pág. 52, Claude 0.92 |
| 13 | Costi accessori campagna trasferimenti | pág. 52, Jev 1 |
| 14 | Diversi | pág. 52, Jev 0.96 |
| 15 | Costi vitto, alloggio, locomozione | pág. 52, Jev 0.99 |
| 16 | Servizio biglietteria, controllo ingressi | pág. 52, Jev 1 |
| 17 | Assicurative e previdenziali | pág. 52, Jev 0.95 |
| 18 | Costi Intercampus | pág. 52, Jev 0.98 |
| 19 | Amministrative - pubblicitarie e generali | pág. 52, Jev 1 |
| 20 | Concessione d'uso Stadio Meazza | pág. 53, Claude 0.93 |
| 21 | Affitti passivi | pág. 53, Jev 1 |
| 22 | Canoni leasing operativo | pág. 53, Jev 0.99 |
| 23 | Canoni licenza d'uso diversi | pág. 53, Claude 0.92 |
| 24 | Concessione impianti sportivi | pág. 53, Jev 0.92 |
| 25 | Canoni noleggio | pág. 53, Jev 0.95 |
| 26 | a) salari e stipendi | pág. 16, precedente |
| 27 | b) oneri sociali | pág. 16, precedente |
| 28 | c) trattamento di fine rapporto | pág. 16, precedente |
| 29 | e) altri costi | pág. 16, precedente |
| 30 | a) ammortamento delle immobilizzazioni immateriali | pág. 16, Jev 0.92 |
| 31 | b) ammortamento delle immobilizzazioni materiali | pág. 16, Jev 1 |
| 32 | c) altre svalutazioni delle immobilizzazioni | pág. 16, Jev 0.96 |
| 33 | d) svalutazioni di crediti compresi nell'attivo circolante e nelle disponibilità liquide | pág. 16, precedente |
| 34 | 12) Accantonamenti per rischi | pág. 16, precedente |
| 35 | 13) Altri accantonamenti | pág. 16, precedente |
| 36 | a) spese varie organizzazione gare | pág. 16, Jev 0.99 |
| 37 | b) tasse di iscrizione gare | pág. 16, Jev 1 |
| 38 | - percentuali su incassi gare a squadre ospitate | pág. 16, Jev 1 |
| 39 | d) costi per acquisizione temporanea calciatori | pág. 16, Jev 1 |
| 40 | e) minusvalenze da cessione dir. plur. prest. calc. | pág. 16, Jev 0.98 |
| 41 | f) altri oneri di gestione calciatori | pág. 16, Jev 0.99 |
| 42 | - spese, ammende e multe gare | pág. 56, Jev 0.92 |
| 43 | - oneri tributari indiretti | pág. 56, Jev 1 |
| 44 | - contributi a Lega Calcio | pág. 56, Jev 0.95 |
| 45 | - transazioni e risarcimenti | pág. 56, Jev 0.98 |
| 46 | - oneri esercizi precedenti | pág. 56, Jev 0.99 |
| 47 | - diversi | pág. 56, Jev 0.93 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): resultado-final = (102.393.789). el estado cortó en b12 y el resultado impreso (L912 y L918) quedó afuera; cierra exacto con los totales impresos (372.370.111 − 443.923.801 − 26.213.126 + 529.404 − 5.156.377)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2020: verificado 2026-10-09 contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), "Internazionale" (= Inter)
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 47, precedente |
| 2 | - Gare Tim Cup | pág. 47, precedente |
| 3 | - Gare Coppe Internazionali | pág. 47, precedente |
| 4 | - Tomei e amichevoli | pág. 47, precedente |
| 5 | b) percentuale su incassi gare da squadre ospitanti | pág. 14, Jev 0.98 |
| 6 | c) abbonamenti | pág. 14, precedente |
| 7 | - Quote Inter Club/Tessere del tifoso | pág. 47, precedente |
| 8 | - Sponsorship EU/ex Infront | pág. 47, Jev 0.99 |
| 9 | - Sponsorship Regional | pág. 47, precedente |
| 10 | - Archivio Rai/Infront | pág. 47, precedente |
| 11 | - Inter TV | pág. 47, precedente |
| 12 | - Diversi | pág. 47, precedente |
| 13 | a) contributi in conto esercizio | pág. 14, precedente |
| 14 | b) proventi da sponsorizzazioni | pág. 14, precedente |
| 15 | c) proventi pubblicitari | pág. 14, precedente |
| 16 | d) proventi commerciali e royalties | pág. 14, precedente |
| 17 | - proventi televisivi | pág. 14, precedente |
| 18 | - proventi televisivi da partecip. a compet. UEFA | pág. 14, precedente |
| 19 | f) proventi vari | pág. 14, precedente |
| 20 | g) ricavi da cessione temporanea prestazioni calciat. | pág. 14, precedente |
| 21 | h) plusvalenze da cessione dir. plur. prest. calciatori | pág. 14, precedente |
| 22 | i) altri proventi da gestione calciatori | pág. 14, precedente |
| 23 | l) ricavi e proventi diversi | pág. 14, precedente |
| 24 | 4) Capitalizzazione costi vivaio | pág. 14, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico | pág. 49, precedente |
| 2 | Materiale consumo | pág. 49, precedente |
| 3 | Materiale sanitario | pág. 49, precedente |
| 4 | Altri | pág. 49, precedente |
| 5 | 7) Per servizi | pág. 14, precedente |
| 6 | Concessione d'uso Stadio Meazza | pág. 51, precedente |
| 7 | Affitti passivi | pág. 51, precedente |
| 8 | Canoni leasing operativo | pág. 51, precedente |
| 9 | Canoni licenza d'uso diversi | pág. 51, precedente |
| 10 | Concessione impianti sportivi | pág. 51, precedente |
| 11 | Canoni noleggio | pág. 51, precedente |
| 12 | a) salari e stipendi | pág. 14, precedente |
| 13 | b) oneri sociali | pág. 14, precedente |
| 14 | c) trattamento di fine rapporto | pág. 14, precedente |
| 15 | e) altri costi | pág. 14, precedente |
| 16 | a) ammortamento delle immobilizzazioni immateriali | pág. 14, precedente |
| 17 | b) ammortamento delle immobilizzazioni materiali | pág. 14, precedente |
| 18 | c) altre svalutazioni delle immobilizzazioni | pág. 14, precedente |
| 19 | d) svalutazioni di crediti compresi nell'attivo circolante e nelle disponibilità liquide | pág. 14, precedente |
| 20 | 12) Accantonamenti per rischi | pág. 14, precedente |
| 21 | 13) Altri accantonamenti | pág. 14, precedente |
| 22 | a) spese varie organizzazione gare | pág. 14, precedente |
| 23 | b) tasse di iscrizione gare | pág. 14, precedente |
| 24 | - percentuali su incassi gare a squadre ospitate | pág. 14, precedente |
| 25 | d) costi per acquisizione temporanea calciatori | pág. 14, precedente |
| 26 | e) minusvalenze da cessione dir. plur. prest. calc. | pág. 14, precedente |
| 27 | f) altri oneri di gestione calciatori | pág. 14, precedente |
| 28 | - spese, ammende e multe gare | pág. 53, precedente |
| 29 | - oneri tributari indiretti | pág. 53, precedente |
| 30 | - contributi a Lega Calcio | pág. 53, precedente |
| 31 | - transazioni e risarcimenti | pág. 53, precedente |
| 32 | - oneri esercizi precedenti | pág. 53, precedente |
| 33 | - diversi | pág. 53, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 7.147.379. Claude 2026-10-08 (Guido: a mano): el renglón 4) del estado (L795, ingreso 7.147.379) se queda entero: la nota b41 (L2307-L2314) explica los costos que se capitalizan (entrenadores, pensionato, instalaciones) y no es un desglose de ingreso; sin esto sus filas quedaban como gastos y el resultado no cerraba (−62,68 M contra −48,39 M impreso)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2019: verificado 2026-10-09 contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), "Internazionale" (= Inter)
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 47, precedente |
| 2 | - Gare Tim Cup | pág. 47, precedente |
| 3 | - Tornei e amichevoli | pág. 47, Jev 1 |
| 4 | b) percentuale su incassi gare da squadre ospitanti | pág. 13, Jev 0.98 |
| 5 | c) abbonamenti | pág. 13, precedente |
| 6 | - Quote Inter Club | pág. 47, Jev 1 |
| 7 | - Sponsorship Infront | pág. 47, Jev 0.99 |
| 8 | - Sponsorship Regional | pág. 47, precedente |
| 9 | - Archivio Rai/Infront | pág. 47, precedente |
| 10 | - Inter Tv | pág. 47, precedente |
| 11 | - Diversi | pág. 47, precedente |
| 12 | 4) Capitalizzazione costi vivaio | pág. 13, precedente |
| 13 | a) contributi in conto esercizio | pág. 13, precedente |
| 14 | b) proventi da sponsorizzazioni | pág. 13, precedente |
| 15 | c) proventi pubblicitari | pág. 13, precedente |
| 16 | d) proventi commerciali e royalties | pág. 13, precedente |
| 17 | - proventi televisivi | pág. 13, precedente |
| 18 | - proventi televisivi da partecip. a compet. UEFA. | pág. 13, precedente |
| 19 | g) ricavi da cessione temporanea prestazioni calciati. | pág. 13, precedente |
| 20 | h) plusvalenze da cessione dir. plur. prest. calciatori | pág. 13, precedente |
| 21 | i) altri proventi da gestione calciatori | pág. 13, precedente |
| 22 | l) ricavi e proventi diversi | pág. 13, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico | pág. 50, precedente |
| 2 | Materiale consumo | pág. 50, precedente |
| 3 | Materiale sanitario | pág. 50, precedente |
| 4 | Altri | pág. 50, precedente |
| 5 | Costi per allenamenti e ritiri | pág. 50, precedente |
| 6 | Spese sanitarie | pág. 50, precedente |
| 7 | Compensi lavoratori autonomi | pág. 50, precedente |
| 8 | Costi pensionato | pág. 50, precedente |
| 9 | Spese per manutenzione campi sportivi | pág. 50, precedente |
| 10 | Diversi | pág. 50, precedente |
| 11 | Osservazione calciatori | pág. 51, precedente |
| 12 | Squadre sovvenzionate | pág. 51, precedente |
| 13 | Costi accessori campagna trasferimenti | pág. 51, precedente |
| 14 | Diversi | pág. 51, precedente |
| 15 | Costi vitto, alloggio, locomozione | pág. 50, precedente |
| 16 | Servizio biglietteria, controllo ingressi | pág. 50, precedente |
| 17 | Assicurative e previdenziali | pág. 50, precedente |
| 18 | Costi Intercampus | pág. 50, precedente |
| 19 | Amministrative - pubblicitarie e generali | pág. 50, precedente |
| 20 | Concessione d'uso Stadio Meazza | pág. 52, precedente |
| 21 | Affitti passivi | pág. 52, precedente |
| 22 | Canoni leasing operativo | pág. 52, precedente |
| 23 | Canoni licenza d'uso diversi | pág. 52, precedente |
| 24 | Concessione impianti sportivi | pág. 52, precedente |
| 25 | Canoni noleggio | pág. 52, precedente |
| 26 | a) salari e stipendi | pág. 13, precedente |
| 27 | b) oneri sociali | pág. 13, precedente |
| 28 | c) trattamento di fine rapporto | pág. 13, precedente |
| 29 | e) altri costi | pág. 13, precedente |
| 30 | a) ammortamento delle immobilizzazioni immateriali | pág. 13, precedente |
| 31 | b) ammortamento delle immobilizzazioni materiali | pág. 13, precedente |
| 32 | c) altre svalutazioni delle immobilizzazioni | pág. 13, precedente |
| 33 | d) svalutazioni di crediti compresi nell'attivo circolante e nelle disponibilità liquide | pág. 13, precedente |
| 34 | 12) Accantonamenti per rischi | pág. 13, precedente |
| 35 | 13) Altri accantonamenti | pág. 13, precedente |
| 36 | a) spese varie organizzazione gare | pág. 13, precedente |
| 37 | b) tasse di iscrizione gare | pág. 13, precedente |
| 38 | - percentuali su incassi gare a squadre ospitate | pág. 13, precedente |
| 39 | d) costi per acquisizione temporanea calciatori | pág. 13, precedente |
| 40 | e) minusvalenze da cessione dir. plur. prest. calc. | pág. 13, precedente |
| 41 | f) altri oneri di gestione calciatori | pág. 13, precedente |
| 42 | - spese, ammende e multe gare | pág. 54, precedente |
| 43 | - oneri tributari indiretti | pág. 54, precedente |
| 44 | - contributi a Lega Calcio | pág. 54, precedente |
| 45 | - transazioni e risarcimenti | pág. 54, precedente |
| 46 | - diversi | pág. 54, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: verificado 2026-10-09 contra roster cacheado de "2017–18 Serie A" (tools/club-league-reference/it.json), "Internazionale" (= Inter)
```

## Gestiones

_antes de Erick Thohir (data/gestiones/it.js):_

```text
Thohir: presidente desde el 15/11/2013 (LaPresse, 15/11/2013) hasta el 26/10/2018, cuando lo reemplazó Zhang (Calcio e Finanza, 26/10/2018).
```

_antes de Giuseppe Marotta (data/gestiones/it.js):_

```text
Oaktree (fondo) tomó el control en mayo de 2024; Marotta es presidente del consejo desde el 4/6/2024.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### inter-it-fascicolo-bilancio-consolidato-2021-22

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2024-25

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2019-20

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2018-19

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2017-18

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2023-24

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2022-23

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### inter-it-fascicolo-bilancio-consolidato-2020-21-en

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2020-21-en.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
