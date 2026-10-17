# salernitana-it — evidencia de carga

Lo que había como comentario en `data/it/salernitana-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/salernitana-it-data.js — U.S. Salernitana 1919 S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "salernitana-it" — slug de "Salernitana" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "U.S. Salernitana 1919 S.r.l." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): Claude 2026-10-08 (revisión Sonnet de las altas de Italia): nombre legal; el escaneo d
  displayName        ok        "Salernitana" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2022-06-30) y contenido del .md (152 de 155 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2022-06-30) y contenido del .md (152 de 155 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "salernitana-it-bilancio-30-giugno-2022" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Salernitana"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"salernitana-it-bilancio-30-giugno-2022"}
============================================================================
```

_de data/clubs.js:_

```text
Salernitana: alta por tools/alta-club.mjs (2026-10-08) desde Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

_de data/club-leagues/it.js:_

```text
Salernitana (alta-club.mjs, 2026-10-08): verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Salernitana".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2023-def.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Salernitana/Salernitana-bilancio-30-giugno-2023-def.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 15, Jev 1 |
| 2 | Ricavi da gare ospitate | pág. 15, Claude 0.85 |
| 3 | Abbonamenti | pág. 15, Jev 1 |
| 4 | Audiovisivi | pág. 15, Jev 1 |
| 5 | Sponsorizzazioni | pág. 15, Jev 1 |
| 6 | Proventi pubblicitari | pág. 15, Jev 1 |
| 7 | Canoni per licenze, marchi, brevetti | pág. 15, Jev 1 |
| 8 | Cessione temporanea calciatori | pág. 15, Jev 0.99 |
| 9 | Altri proventi da gestione calciatori | pág. 15, Jev 0.99 |
| 10 | Sopravvenienze attive (non ricorrenti) | pág. 15, Jev 1 |
| 11 | Contributi in c/esercizio | pág. 15, Jev 0.95 |
| 12 | Proventi vari | pág. 15, Jev 1 |
| 13 | Ricavi da merchandising | pág. 15, precedente |
| 14 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 16, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti di materie prime,sussidiarie,di consumo e di merci | pág. 15, Jev 1 |
| 2 | Variazione delle rimanenze | pág. 15, Jev 1 |
| 3 | Salari e stipendi | pág. 15, Jev 1 |
| 4 | Oneri sociali | pág. 15, Claude 0.85 |
| 5 | Trattamento di fine rapporto | pág. 15, Jev 0.97 |
| 6 | Altri costi | pág. 15, Jev 0.97 |
| 7 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 15, Jev 0.99 |
| 8 | Altri oneri da gestione calciatori | pág. 15, Jev 0.99 |
| 9 | Costi per tesserati | pág. 15, precedente |
| 10 | Costi per attività sportiva | pág. 15, precedente |
| 11 | Costi specifici tecnici | pág. 15, Jev 0.97 |
| 12 | Costi per vitto,alloggio e locomozione | pág. 15, Jev 0.99 |
| 13 | Servizio biglietteria, controllo ingressi | pág. 15, Jev 1 |
| 14 | Spese assicurative | pág. 15, Jev 0.99 |
| 15 | Spese amministrative | pág. 15, Jev 1 |
| 16 | Spese per pubblicità e promozione | pág. 15, Jev 1 |
| 17 | Spese bancarie | pág. 15, Jev 0.99 |
| 18 | Per godimento di beni di terzi | pág. 15, Jev 0.99 |
| 19 | Spese varie organizzazione gare | pág. 15, Jev 0.99 |
| 20 | Tassa iscrizioni gare | pág. 15, Jev 1 |
| 21 | - percentuale su incassi gare a squadra ospite | pág. 15, Jev 0.98 |
| 22 | Altri oneri di gestione | pág. 15, Jev 1 |
| 23 | Sopravvenienze passive (non ricorrenti) | pág. 15, Jev 1 |
| 24 | Minusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 16, Jev 1 |
| 25 | Amm. delle attività immateriali | pág. 16, Jev 0.92 |
| 26 | Amm. delle attività materiali | pág. 16, Jev 0.99 |
| 27 | Amm. dei diritti d'uso | pág. 16, Jev 0.97 |
| 28 | Svalutaz. delle attività immateriali | pág. 16, Jev 1 |
| 29 | Svalutaz. delle attività materiali | pág. 16, precedente |
| 30 | Svalutaz. dei crediti dell'attivo circolante | pág. 16, Jev 0.99 |
| 31 | Accantonamenti per rischi diversi | pág. 16, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso banche non correnti 663.991 + debiti verso banche correnti 500.761 + debiti verso altri finanziatori correnti (24.1) 30.391.923 = 31.556.675. 24.1 son ~30M de anticipos de crédito (cesión de derechos audiovisivi) + canoni de locazioni finanziarie del resto, que no se pueden separar (nota: 30.416 migliaia). Excluido 17.2 (157.396, canoni de locazioni/licenze, IFRS 16).; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): depositi bancari e postali 5.406.624 + danaro e valori in cassa 52.440 = 5.459.064. Disponibilità liquide e mezzi equivalenti 5.459.063 (30/06/2023).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 15, Jev 1 |
| 2 | Diritti audiovisivi e proventi media | pág. 15, Jev 1 |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 15, Jev 1 |
| 4 | Proventi da gestione diritti calciatori | pág. 15, Jev 1 |
| 5 | Altri ricavi | pág. 15, Jev 0.99 |
| 6 | Ricavi da merchandising | pág. 15, Jev 1 |
| 7 | RICAVI NETTI DA CESSIONE DIRITTI PLURIENNALI PRESTAZIONI TESSERATI | pág. 16, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 15, Jev 0.99 |
| 2 | Personale | pág. 15, Claude 0.8 |
| 3 | Oneri da gestione diritti calciatori | pág. 15, Jev 0.96 |
| 4 | Oneri per servizi esterni | pág. 15, Claude 0.8 |
| 5 | Altri oneri | pág. 15, Jev 1 |
| 6 | Ammortamenti e svalutazioni delle attività materiali ed immateriali | pág. 16, precedente |
| 7 | Accantonamenti e altre svalutazioni | pág. 16, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso banche non correnti 1.164.752 + debiti verso banche correnti 475.203 + debiti verso altri finanziatori correnti (24.1) 273.922 = 1.913.877. El .md de 2022 está mal transcripto (OCR): imprime 1.184.732 / 475.277 / 272.824 (=1.932.833), pero su nota dice 1.165 / 475 / 274 migliaia; se usan los importes del comparativo 2022 del bilancio 2023 (pág. 13), que coinciden con las notas. Excluido 17.2 (272.433 = canoni de locaciones, IFRS 16). Si Guido prefiere lo impreso en el .md de 2022: 1.932.833. (valor en la escala del documento, miles: el ajuste se multiplica por ella); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): depositi bancari e postali 7.000.106 + danaro e valori in cassa 21.034 = 7.021.140. Total impreso 7.021.140 (30/06/2022). El comparativo del bilancio 2023 muestra 7.221.109 para el mismo cierre (reexpresado: 7.196.075+25.034); se toma el del propio documento del año. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## Gestiones

_antes de Danilo Iervolino (data/gestiones/it.js):_

```text
Iervolino: presidente del consejo desde el 13/1/2022 (el trust Salernitana 2021, con un administrador único, condujo antes); firma los balances 2022 y 2023.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### salernitana-it-bilancio-30-giugno-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### salernitana-it-bilancio-30-giugno-2023-def

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2023-def.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
