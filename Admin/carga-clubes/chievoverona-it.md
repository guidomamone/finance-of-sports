# chievoverona-it — evidencia de carga

Lo que había como comentario en `data/it/chievoverona-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/chievoverona-it-data.js — Associazione Calcio Chievo-Verona S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "chievoverona-it" — slug de "Chievo Verona" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Associazione Calcio Chievo-Verona S.r.l." — respuesta de Guido en la cola (a2ef8d4)
  displayName        ok        "Chievo Verona" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2014-06-30) y contenido del .md (186 de 187 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 15 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2014 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2014-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2014-06-30) y contenido del .md (186 de 187 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2014-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2014-06-30 = 0.732172 (Tipo de referencia del Banco Central Europeo al 2014-06-30)
  sourceId           ok        "chievoverona-it-bilancio-30-giugno-2014" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Chievo" = "Chievo Verona"

FISCAL YEAR META PROPUESTO para 2014 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2014: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2014-06-30","sourceId":"chievoverona-it-bilancio-30-giugno-2014"}
============================================================================
```

_de data/clubs.js:_

```text
Chievo Verona: alta por tools/alta-club.mjs (2026-10-08) desde Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

_de data/club-leagues/it.js:_

```text
Chievo Verona (alta-club.mjs, 2026-10-08): verificado contra roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Chievo" = "Chievo Verona".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare campionato | pág. 49, Jev 1 |
| 2 | - Gare Coppa Italia | pág. 49, Jev 0.96 |
| 3 | - Altre gare Italia/estero | pág. 49, Jev 0.91 |
| 4 | Abbonamenti | pág. 49, Jev 1 |
| 5 | 4) incrementi di immobilizzazioni per lavori interni | pág. 30, Jev 1 |
| 6 | Contributi in conto esercizio | pág. 49, Jev 0.96 |
| 7 | Proventi da sponsorizzazioni | pág. 49, Jev 1 |
| 8 | Proventi pubblicitari | pág. 49, Jev 1 |
| 9 | - Proventi televisivi | pág. 49, Jev 1 |
| 10 | Proventi vari | pág. 50, Jev 1 |
| 11 | Ricavi da cessione temporanea calciatori | pág. 50, Jev 0.97 |
| 12 | Plusvalenze da cessione diritti pluriennali calciatori | pág. 50, Jev 1 |
| 13 | Altri proventi da gestione calciatori | pág. 50, Jev 0.94 |
| 14 | Ricavi e proventi diversi | pág. 50, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 30, Jev 0.98 |
| 2 | 7) per servizi | pág. 30, Jev 1 |
| 3 | 8) per godimento di beni di terzi | pág. 30, Jev 0.99 |
| 4 | a) salari e stipendi | pág. 30, Jev 1 |
| 5 | b) oneri sociali | pág. 30, Jev 0.92 |
| 6 | c) trattamento di fine rapporto | pág. 30, Jev 1 |
| 7 | a) ammortamento delle immobilizzazioni immateriali | pág. 30, Claude 0.8 |
| 8 | b) ammortamento delle immobilizzazioni materiali | pág. 30, Jev 1 |
| 9 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 30, Jev 1 |
| 10 | 13) altri accantonamenti | pág. 30, Claude 0.85 |
| 11 | Spese varie organizzazione gare | pág. 53, Jev 0.99 |
| 12 | Tasse iscrizioni gare | pág. 53, Jev 1 |
| 13 | - Percentuale su incassi gare a squadre ospitate | pág. 53, Jev 0.99 |
| 14 | Costo per acquisii.temporanea prestaz. | pág. 53, Jev 0.98 |
| 15 | Minusvalenze da cessione diritti plur. calciatori | pág. 53, Jev 0.99 |
| 16 | Altri oneri da gestione calciatori | pág. 53, Jev 0.99 |
| 17 | Altri oneri diversi di gestione | pág. 53, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Debiti finanziari a breve termine" pág. 19; cash escalón 1 (compuerta: documento anterior): "Disponibilità liquide ed azioni proprie" pág. 19
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): soci 2.254.397 + banche 11.734.679 + altri finanziatori 10.489.295 = 24.478.371. Lo cargado (18,277235 M) es solo corriente (7.787.940+10.489.295); falta la parte oltre esercizio de bancos y los soci.
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2015–16 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | GARE IN CASA CAMPIONATO 1^ SQUAD | pág. 47, Jev 1 |
| 2 | GARE IN CASA COPPA ITAL 1^ SQUAD | pág. 47, Jev 1 |
| 3 | GARE FUORI CASA COPPA ITALIA | pág. 47, Jev 1 |
| 4 | ABBONAMENTI | pág. 47, precedente |
| 5 | 4) incrementi di immobilizzazioni per lavori interni | pág. 30, precedente |
| 6 | contributi in conto esercizio | pág. 30, Jev 0.98 |
| 7 | Proventi da sponsorizzazioni | pág. 47, Jev 1 |
| 8 | Proventi pubblicitari | pág. 47, Jev 1 |
| 9 | Proventi televisivi | pág. 47, precedente |
| 10 | Proventi vari | pág. 47, Jev 1 |
| 11 | Ricavi da cessione temporanea calciatori | pág. 47, Jev 0.98 |
| 12 | Plusvalenze da cessione diritti pluriennali calciatori | pág. 47, Jev 1 |
| 13 | Altri proventi da gestione calciatori | pág. 47, Jev 0.99 |
| 14 | Ricavi e proventi diversi | pág. 47, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 30, precedente |
| 2 | 7) per servizi | pág. 30, precedente |
| 3 | 8) per godimento di beni di terzi | pág. 30, precedente |
| 4 | a) salari e stipendi | pág. 30, precedente |
| 5 | b) oneri sociali | pág. 30, precedente |
| 6 | c) trattamento di fine rapporto | pág. 30, precedente |
| 7 | a) ammortamento delle immobilizzazioni immateriali | pág. 30, precedente |
| 8 | b) ammortamento delle immobilizzazioni materiali | pág. 30, precedente |
| 9 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 30, precedente |
| 10 | Spese varie organizzazione gare | pág. 50, precedente |
| 11 | Tasse iscrizioni gare | pág. 50, precedente |
| 12 | Costo per acquist.temporanea prestaz. | pág. 50, precedente |
| 13 | Minusvalenza da cessioni diritti plur. calciatori | pág. 50, precedente |
| 14 | Altri oneri da gestione calciatori | pág. 51, precedente |
| 15 | Altri oneri diversi di gestione | pág. 51, precedente |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 5.577.362. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 965.024. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 29.390.994. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 61.500. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 749.000. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 12.790.553. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 301.239. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 635.672. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la nota de Altri ricavi e proventi (L1731-L1745) lleva también los Contributi (1.133.333, ya en su renglón) y por eso no suma el renglón 'altri' (50.471.344); sus 8 filas restantes suman exacto 50.471.344. Se cargan en lugar del renglón
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Debiti finanziari a breve termine" pág. 5; cash escalón 1 (compuerta: documento siguiente): "Disponibilità liquide ed azioni proprie" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): soci 2.254.397 + banche 12.142.214 + altri finanziatori 9.984.936 = 24.381.547. Lo cargado (17,705538 M) es solo la parte corriente (7.720.602+9.984.936); falta la parte oltre esercizio: banche totale 12.142.214 y soci 2.254.397.
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2014–15 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare campionato | pág. 24, Jev 1 |
| 2 | - Gare Coppa Italia | pág. 24, Jev 0.96 |
| 3 | - Gare Coppa Italia | pág. 24, Jev 0.96 |
| 4 | - Gare Amichevoli estero | pág. 24, Jev 0.96 |
| 5 | Abbonamenti | pág. 24, Jev 1 |
| 6 | 4) incrementi di immobilizzazioni per lavori interni | pág. 8, Jev 1 |
| 7 | Contributi in conto esercizio | pág. 25, Jev 0.96 |
| 8 | Proventi da sponsorizzazioni | pág. 25, Jev 1 |
| 9 | Proventi pubblicitari | pág. 25, Jev 1 |
| 10 | - Proventi televisivi | pág. 25, Jev 1 |
| 11 | Proventi vari | pág. 25, Jev 1 |
| 12 | Ricavi da cessione temporanea calciatori | pág. 25, Jev 0.97 |
| 13 | Plusvalenze da cessione diritti pluriennali calciatori | pág. 25, Jev 1 |
| 14 | Altri proventi da gestione calciatori | pág. 25, Jev 0.94 |
| 15 | Ricavi e proventi diversi | pág. 25, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 8, Jev 0.98 |
| 2 | 7) per servizi | pág. 8, Jev 1 |
| 3 | 8) per godimento di beni di terzi | pág. 8, Jev 0.99 |
| 4 | a) salari e stipendi | pág. 8, Jev 1 |
| 5 | b) oneri sociali | pág. 8, Jev 0.92 |
| 6 | c) trattamento di fine rapporto | pág. 8, Jev 1 |
| 7 | a) ammortamento delle immobilizzazioni immateriali | pág. 8, Claude 0.8 |
| 8 | b) ammortamento delle immobilizzazioni materiali | pág. 8, Jev 1 |
| 9 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 8, Jev 1 |
| 10 | Spese varie organizzazione gare | pág. 29, Jev 0.99 |
| 11 | Tasse iscrizioni gare | pág. 29, Jev 1 |
| 12 | - Percentuale su incassi gare a squadre ospitate | pág. 29, Jev 0.99 |
| 13 | Costo per acquisiti temporanea prestaz. Calciatori | pág. 29, Jev 0.98 |
| 14 | Minusvalenze da cessione diritti plur. calciatori | pág. 29, Jev 0.99 |
| 15 | Altri oneri da gestione calciatori | pág. 29, Jev 0.99 |
| 16 | Altri oneri diversi di gestione | pág. 29, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Disponibilità liquide ed azioni proprie" pág. 39
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): soci 2.254.397 + banche 11.413.447 + altri finanziatori 9.596.807 = 23.264.651. Obbligazioni 0; soci+banche+factoring (totali con scadenza breve y larga).
```

## Gestiones

_antes de Luca Campedelli (data/gestiones/it.js):_

```text
Luca Campedelli: presidente desde septiembre de 1992 (murió su padre Luigi) hasta 2022; la fuente da solo mes y año o solo el año: día 01 por convención.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### chievoverona-it-bilancio-30-giugno-2014

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### chievoverona-it-bilancio-30-giugno-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### chievoverona-it-bilancio-30-giugno-2015

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Chievo Verona/ChievoVerona-bilancio-30-giugno-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
