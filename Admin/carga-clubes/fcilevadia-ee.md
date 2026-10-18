# fcilevadia-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fcilevadia-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FCI Levadia: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2025.pdf. brandColor #008100
(procedencia en Admin/sourcing/Estonia/FCI Levadia.md; tools/cargar-lote.mjs).
```

```text
data/ee/fcilevadia-ee-data.js — FCI Levadia MTÜ (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/FCI Levadia/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fcilevadia-ee" — slug de "FCI Levadia" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FCI Levadia MTÜ" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L8; firmas 'FCI Levadia MTÜ (registrikood: 80053192)' L659 (revisió
  displayName        ok        "FCI Levadia" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (46 de 50 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (46 de 50 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L142-177) (revisi
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): 2025 trae los dos estados (konsolideeritud L142-177 y Lisa 15, la MTÜ sola,
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "fcilevadia-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"fcilevadia-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Piletitulu Eesti-siseste võistlustustel | pág. 12, Claude 0.85 |
| 2 | Piletitulu UEFA klubisarjades osalemisest | pág. 12, Claude 0.8 |
| 3 | Hooajapiletite müügitulu | pág. 12, Jev 1 |
| 4 | Reklaamitulu | pág. 12, Jev 1 |
| 5 | Tulu ülekandeõiguste müügist | pág. 12, Jev 1 |
| 6 | Klubi sümboolikaga toodete müügitulu | pág. 12, Jev 1 |
| 7 | Staadioni rent | pág. 12, Jev 0.92 |
| 8 | Muud tulud | pág. 12, Jev 0.98 |
| 9 | Tulu mängijate üleminekutest klubist välja | pág. 5, Jev 1 |
| 10 | UEFA toetused | pág. 12, precedente |
| 11 | Riigi ja/või KOV toetused | pág. 12, Jev 0.98 |
| 12 | Toetus kogukonnajuht | pág. 12, Jev 0.96 |
| 13 | Riiklik treenerite tööjōukulude toetus | pág. 12, Jev 0.97 |
| 14 | EJL toetused | pág. 12, precedente |
| 15 | Seotud osapoolte toetused/annetused | pág. 12, Jev 1 |
| 16 | Mitteseotud osapoolte toetused/annetused | pág. 12, Jev 1 |
| 17 | Noormängijate osavõtutasud | pág. 5, Claude 0.8 |
| 18 | Tulu liikmemaksudest | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijate palgakulu | pág. 5, Claude 0.9 |
| 2 | Sotsiaalmaks mängijate töötasudelt | pág. 5, Jev 0.99 |
| 3 | Mängijatele makstav sportlasetoetus | pág. 5, precedente |
| 4 | Mängijatele makstud stipendiumid | pág. 5, precedente |
| 5 | Muu personali palgakulu | pág. 5, Jev 0.9 |
| 6 | Sotsiaalmaks muu personali töötasudelt | pág. 5, Jev 1 |
| 7 | Kulutused turvalisusele | pág. 12, Jev 0.9 |
| 8 | Trükised jm materjalid | pág. 12, precedente |
| 9 | Muud klassifitseerimata kodumängu korralduskulud | pág. 12, Jev 0.95 |
| 10 | Eesti meistrivōistluste osavōtutasu | pág. 12, Jev 1 |
| 11 | Lähetuskulud | pág. 12, Jev 1 |
| 12 | Turundus-, sponsorlus- ja reklaamikulud | pág. 12, Jev 1 |
| 13 | Klubisümboolikaga toodete omahind | pág. 12, Jev 0.95 |
| 14 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatisega seotud kulud | pág. 12, precedente |
| 15 | Klubi administeerimiskulud | pág. 12, Jev 1 |
| 16 | Muud tegevuskulud | pág. 12, Claude 0.85 |
| 17 | Kulu mängijate üleminekutest klubisse | pág. 5, precedente |
| 18 | Pōhivara kulum | pág. 5, Claude 0.8 |
| 19 | Ärikulud | pág. 5, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L142-177) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -279.290. costo financiero del consolidado (L172): resta; 2.675.678 - 3.624.036 + 8.037 - 279.290 = -1.219.611 impreso (L173) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Piletitulu Eesti-siseste võistlustustel | pág. 12, precedente |
| 2 | Piletitulu UEFA klubisarjades osalemisest | pág. 12, precedente |
| 3 | Hooajapiletite müügitulu | pág. 12, precedente |
| 4 | Reklaamitulu | pág. 12, precedente |
| 5 | Tulu ülekandeõiguste müügist | pág. 12, precedente |
| 6 | Tulu mängijate üleminekutest klubist välja | pág. 12, Jev 1 |
| 7 | Klubi sümboolikaga toodete müügitulu | pág. 12, precedente |
| 8 | Staadioni rent | pág. 12, precedente |
| 9 | Tulu turniiride/laagrite korraldamisest | pág. 12, Jev 0.99 |
| 10 | Muud tulud | pág. 12, precedente |
| 11 | UEFA toetused | pág. 12, precedente |
| 12 | Riigi ja/või KOV toetused | pág. 12, precedente |
| 13 | Toetus kogukonnajuht | pág. 12, precedente |
| 14 | Töötasu hüvitimise | pág. 12, Jev 0.98 |
| 15 | Riiklik treenerite tööjōukulude toetus | pág. 12, precedente |
| 16 | EJL toetused | pág. 12, precedente |
| 17 | Arengustipendiumid | pág. 12, precedente |
| 18 | Seotud osapoolte toetused/annetused | pág. 12, precedente |
| 19 | Mitteseotud osapoolte toetused/annetused | pág. 12, precedente |
| 20 | Noormängijate osavõtutasud | pág. 5, precedente |
| 21 | Tulu liikmemaksudest | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijate palgakulu | pág. 5, precedente |
| 2 | Sotsiaalmaks mängijate töötasudelt | pág. 5, precedente |
| 3 | Mängijatele makstav sportlasetoetus | pág. 5, precedente |
| 4 | Mängijatele makstud stipendiumid | pág. 5, precedente |
| 5 | Muu personali palgakulu | pág. 5, precedente |
| 6 | Sotsiaalmaks muu personali töötasudelt | pág. 5, precedente |
| 7 | Kulu mängijate üleminekutest klubisse | pág. 12, precedente |
| 8 | Kulutused turvalisusele | pág. 12, precedente |
| 9 | Trükised jm materjalid | pág. 12, precedente |
| 10 | Muud klassifitseerimata kodumängu korralduskulud | pág. 12, precedente |
| 11 | Eesti meistrivōistluste osavōtutasu | pág. 12, precedente |
| 12 | Lähetuskulud | pág. 12, precedente |
| 13 | Turundus-, sponsorlus- ja reklaamikulud | pág. 12, precedente |
| 14 | Klubisümboolikaga toodete omahind | pág. 12, precedente |
| 15 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatisega seotud kulud | pág. 12, precedente |
| 16 | Klubi administeerimiskulud | pág. 12, precedente |
| 17 | Muud kulud | pág. 12, Jev 1 |
| 18 | Muud tegevuskulud | pág. 12, precedente |
| 19 | Pōhivara kulum | pág. 5, precedente |
| 20 | Ärikulud | pág. 5, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Konsolideeritud tulude-kulude aruanne", .md L124) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Piletitulu Eesti-siseste võistlustustel | pág. 12, precedente |
| 2 | Piletitulu UEFA klubisarjades osalemisest | pág. 12, precedente |
| 3 | Hooajapiletite müügitulu | pág. 12, precedente |
| 4 | Reklaamitulu | pág. 12, precedente |
| 5 | Tulu ülekandeõiguste müügist | pág. 12, precedente |
| 6 | Tulu mängijate üleminekutest klubist välja | pág. 12, Jev 1 |
| 7 | Klubi sümboolikaga toodete müügitulu | pág. 12, precedente |
| 8 | Staadioni rent | pág. 12, precedente |
| 9 | Tulu turniiride/laagrite korraldamisest | pág. 12, Jev 0.99 |
| 10 | Muud tulud | pág. 5, Jev 1 |
| 11 | UEFA toetused | pág. 12, precedente |
| 12 | Riigi ja/või KOV toetused | pág. 12, precedente |
| 13 | Toetus kogukonnajuht | pág. 12, precedente |
| 14 | Töötasu hüvitimise | pág. 12, Jev 0.98 |
| 15 | Riiklik treenerite tööjōukulude toetus | pág. 12, precedente |
| 16 | EJL toetused noortetööle | pág. 12, precedente |
| 17 | Arengustipendiumid | pág. 12, precedente |
| 18 | Seotud osapoolte toetused/annetused | pág. 12, precedente |
| 19 | Mitteseotud osapoolte toetused/annetused | pág. 12, precedente |
| 20 | Noormängijate osavõtutasud | pág. 5, precedente |
| 21 | Tulu liikmemaksudest | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijate palgakulu | pág. 5, precedente |
| 2 | Sotsiaalmaks mängijate töötasudelt | pág. 5, precedente |
| 3 | Mängijatele makstav sportlasetoetus | pág. 5, precedente |
| 4 | Mängijatele makstud stipendiumid | pág. 5, precedente |
| 5 | Muu personali palgakulu | pág. 5, precedente |
| 6 | Sotsiaalmaks muu personali töötasudelt | pág. 5, precedente |
| 7 | Kulu mängijate üleminekutest klubisse | pág. 12, precedente |
| 8 | Kulutused turvalisusele | pág. 12, precedente |
| 9 | Trükised jm materjalid | pág. 12, precedente |
| 10 | Muud klassifitseerimata kodumängu korralduskulud | pág. 12, precedente |
| 11 | Eesti meistrivōistluste osavōtutasu | pág. 12, precedente |
| 12 | Lähetuskulud | pág. 12, precedente |
| 13 | Turundus-, sponsorlus- ja reklaamikulud | pág. 12, precedente |
| 14 | Klubisümboolikaga toodete omahind | pág. 12, precedente |
| 15 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatisega seotud kulud | pág. 12, precedente |
| 16 | Klubi administeerimiskulud | pág. 12, precedente |
| 17 | Meditsiinitarvikud - ja teenused | pág. 12, precedente |
| 18 | Mänguvormid jm varustus | pág. 12, Jev 1 |
| 19 | Muud tegevuskulud | pág. 12, precedente |
| 20 | Pōhivara kulum | pág. 5, precedente |
| 21 | Ärikulud | pág. 5, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Konsolideeritud tulude-kulude aruanne", .md L133) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Piletitulu Eesti-siseste võistlustustel | pág. 12, precedente |
| 2 | Piletitulu UEFA klubisarjades osalemisest | pág. 12, precedente |
| 3 | Hooajapiletite müügitulu | pág. 12, precedente |
| 4 | Reklaamitulu | pág. 12, precedente |
| 5 | Tulu ülekandeõiguste müügist | pág. 12, precedente |
| 6 | Tulu mängijate üleminekutest klubist välja | pág. 12, Jev 1 |
| 7 | Klubi sümboolikaga toodete müügitulu | pág. 12, precedente |
| 8 | Staadioni rent | pág. 12, precedente |
| 9 | Tulu turniiride/laagrite korraldamisest | pág. 12, Jev 0.99 |
| 10 | Muud tulud | pág. 5, Jev 1 |
| 11 | UEFA toetused | pág. 12, precedente |
| 12 | Riigi ja/või KOV toetused | pág. 12, precedente |
| 13 | Toetus kogukonnajuht | pág. 12, precedente |
| 14 | Riiklik treenerite tööjōukulude toetus | pág. 12, precedente |
| 15 | EJL toetused noortetööle | pág. 12, precedente |
| 16 | Arengustipendiumid | pág. 12, precedente |
| 17 | Mitteseotud osapoolte toetused/annetused | pág. 12, precedente |
| 18 | Noormängijate osavõtutasud | pág. 5, precedente |
| 19 | Tulu liikmemaksudest | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijate palgakulu | pág. 5, precedente |
| 2 | Sotsiaalmaks mängijate töötasudelt | pág. 5, precedente |
| 3 | Mängijatele makstav sportlasetoetus | pág. 5, precedente |
| 4 | Mängijatele makstud stipendiumid | pág. 5, precedente |
| 5 | Muu personali palgakulu | pág. 5, precedente |
| 6 | Sotsiaalmaks muu personali töötasudelt | pág. 5, precedente |
| 7 | Kulu mängijate üleminekutest klubisse | pág. 12, precedente |
| 8 | Kulutused turvalisusele | pág. 12, precedente |
| 9 | Trükised jm materjalid | pág. 12, precedente |
| 10 | Muud klassifitseerimata kodumängu korralduskulud | pág. 12, precedente |
| 11 | Eesti meistrivōistluste osavōtutasu | pág. 12, precedente |
| 12 | Lähetuskulud | pág. 12, precedente |
| 13 | Turundus-, sponsorlus- ja reklaamikulud | pág. 12, precedente |
| 14 | Klubisümboolikaga toodete omahind | pág. 12, precedente |
| 15 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatisega seotud kulud | pág. 12, precedente |
| 16 | Klubi administeerimiskulud | pág. 12, precedente |
| 17 | Meditsiinitarvikud - ja teenused | pág. 12, precedente |
| 18 | Mänguvormid jm varustus | pág. 12, Jev 1 |
| 19 | Muud tegevuskulud | pág. 12, precedente |
| 20 | Pōhivara kulum | pág. 5, precedente |
| 21 | Ärikulud | pág. 5, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Konsolideeritud tulude-kulude aruanne", .md L123) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Piletitulu Eesti-siseste võistlustustel | pág. 11, precedente |
| 2 | Piletitulu UEFA klubisarjades osalemisest | pág. 11, precedente |
| 3 | Hooajapiletite müügitulu | pág. 11, precedente |
| 4 | Reklaamitulu | pág. 11, precedente |
| 5 | Tulu ülekandeõiguste müügist | pág. 11, precedente |
| 6 | Tulu mängijate üleminekutest klubist välja | pág. 11, Jev 1 |
| 7 | Klubi sümboolikaga toodete müügitulu | pág. 11, precedente |
| 8 | Staadioni rent | pág. 11, precedente |
| 9 | Tulu turniiride/laagrite korraldamisest | pág. 11, Jev 0.99 |
| 10 | Muud tulud | pág. 5, Jev 1 |
| 11 | UEFA toetused | pág. 11, precedente |
| 12 | Riigi ja/või KOV toetused | pág. 11, precedente |
| 13 | Toetus kogukonnajuht | pág. 11, precedente |
| 14 | Töötasu hüvitimise | pág. 11, Jev 0.98 |
| 15 | Riiklik treenerite tööjõukulude toetus | pág. 11, precedente |
| 16 | EJL toetused noortetööle | pág. 11, precedente |
| 17 | Arengustipendiumid | pág. 11, precedente |
| 18 | Mitteseotud osapoolte toetused/annetused | pág. 11, precedente |
| 19 | Noormängijate osavõtutasud | pág. 5, precedente |
| 20 | Tulu liikmemaksudest | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijate palgakulu | pág. 5, precedente |
| 2 | Sotsiaalmaks mängijate töötasudelt | pág. 5, precedente |
| 3 | Mängijatele makstav sportlasetoetus | pág. 5, precedente |
| 4 | Mängijatele makstud stipendiumid | pág. 5, precedente |
| 5 | Muu personali palgakulu | pág. 5, precedente |
| 6 | Sotsiaalmaks muu personali töötasudelt | pág. 5, precedente |
| 7 | Kulu mängijate üleminekutest klubisse | pág. 11, precedente |
| 8 | Kulutused turvalisusele | pág. 11, precedente |
| 9 | Toitluskulud | pág. 11, precedente |
| 10 | Trükised jm materjalid | pág. 11, precedente |
| 11 | Muud klassifitseerimata kodumängu korralduskulud | pág. 11, precedente |
| 12 | Eesti meistrivõistluste osavõtutasu | pág. 11, precedente |
| 13 | Lähetuskulud | pág. 11, precedente |
| 14 | Turundus-, sponsorlus- ja reklaamikulud | pág. 11, precedente |
| 15 | Klubisümboolikaga toodete omahind | pág. 11, precedente |
| 16 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatisega seotud kulud | pág. 11, precedente |
| 17 | Klubi administeerimiskulud | pág. 11, precedente |
| 18 | Meditsiinitarvikud - ja teenused | pág. 11, precedente |
| 19 | Mänguvormid jm varustus | pág. 11, Jev 1 |
| 20 | Muud kulud | pág. 11, Jev 1 |
| 21 | Muud tegevuskulud | pág. 11, precedente |
| 22 | Põhivara kulum | pág. 5, precedente |
| 23 | Ärikulud | pág. 5, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Konsolideeritud tulude-kulude aruanne", .md L103) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, Jev 1 |
| 2 | Annetused ja toetused | pág. 5, Jev 0.99 |
| 3 | Piletide müük | pág. 12, Jev 1 |
| 4 | Reklaamiteenused | pág. 12, Jev 1 |
| 5 | Staadioni rent | pág. 12, precedente |
| 6 | Jalgpallurite ülemineku registreerimistasu | pág. 12, Jev 0.94 |
| 7 | Televisiooni ülekanne | pág. 12, Jev 1 |
| 8 | Muud | pág. 12, Jev 1 |
| 9 | Ehitustööd | pág. 12, Jev 0.99 |
| 10 | Muud | pág. 12, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 12, Jev 0.99 |
| 2 | Elektrienergia | pág. 12, Jev 1 |
| 3 | Kütus | pág. 12, Jev 1 |
| 4 | Mitmesugused bürookulud | pág. 12, Claude 0.85 |
| 5 | Lähetuskulud | pág. 12, precedente |
| 6 | Koolituskulud | pág. 12, precedente |
| 7 | Riiklikud ja kohalikud maksud | pág. 12, Jev 1 |
| 8 | Mängude ja treeningute kulud | pág. 12, Claude 0.85 |
| 9 | Liikmemaks | pág. 12, precedente |
| 10 | Kulu mängijate üleminekutest klubisse | pág. 12, precedente |
| 11 | Muud tegevuskulud | pág. 12, precedente |
| 12 | Sportlasetoetus | pág. 12, Claude 0.88 |
| 13 | Palgakulu | pág. 13, precedente |
| 14 | Sotsiaalmaksud | pág. 13, precedente |
| 15 | Põhivarade kulum ja väärtuse langus | pág. 5, Jev 1 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L112) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/FCI Levadia/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/FCI Levadia/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, Jev 1 |
| 2 | Annetused ja toetused | pág. 5, Jev 0.99 |
| 3 | Piletide müük | pág. 13, Jev 1 |
| 4 | Reklaamiteenused | pág. 13, Jev 1 |
| 5 | Staadioni rent | pág. 13, precedente |
| 6 | Jalgpallurite ülemineku registreerimistasu | pág. 13, Jev 0.94 |
| 7 | Televisiooni ülekanne | pág. 13, Jev 1 |
| 8 | Muud | pág. 13, Jev 1 |
| 9 | Muud tulud | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 13, Jev 0.99 |
| 2 | Elektrienergia | pág. 13, Jev 1 |
| 3 | Kütus | pág. 13, Jev 1 |
| 4 | Mitmesugused bürookulud | pág. 13, Claude 0.85 |
| 5 | Lähetuskulud | pág. 13, precedente |
| 6 | Koolituskulud | pág. 13, precedente |
| 7 | Riiklikud ja kohalikud maksud | pág. 13, Jev 1 |
| 8 | Mängude ja treeningute kulud | pág. 13, Claude 0.85 |
| 9 | Liikmemaks | pág. 13, precedente |
| 10 | Kulu mängijate üleminekutest klubisse | pág. 13, precedente |
| 11 | Muud tegevuskulud | pág. 13, precedente |
| 12 | Palgakulu | pág. 14, precedente |
| 13 | Sotsiaalmaksud | pág. 14, precedente |
| 14 | Põhivarade kulum ja väärtuse langus | pág. 5, Jev 1 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L128) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## Fuentes

### fcilevadia-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fcilevadia-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fcilevadia-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fcilevadia-ee-aruanne-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fcilevadia-ee-aruanne-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fcilevadia-ee-aruanne-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fcilevadia-ee-aruanne-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/FCI Levadia/aruanne-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
