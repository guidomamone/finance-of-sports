# udinese-it — evidencia de carga

Lo que había como comentario en `data/it/udinese-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/udinese-it-data.js — Udinese Calcio S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Udinese/Udinese-bilancio-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "udinese-it" — slug de "Udinese" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Udinese Calcio S.p.A." — el .md, 50 veces (nombre del club + forma societaria)
  displayName        ok        "Udinese" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (235 de 240 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 89 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] udinese: #7F7F7F Grey, #8B7D37 Gold, #FFFFFF White, #000000 Black
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (235 de 240 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "udinese-it-bilancio-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Udinese"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"udinese-it-bilancio-2024-25"}
============================================================================
```

_de data/clubs.js:_

```text
Udinese: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Udinese/Udinese-bilancio-2024-25.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Udinese.md.
```

_de data/club-leagues/it.js:_

```text
Udinese (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Udinese".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Udinese/Udinese-bilancio-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Udinese/Udinese-bilancio-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 64, Jev 0.99 |
| 2 | - Gare Coppa Italia | pág. 64, Jev 0.99 |
| 3 | - Gare Coppa Italia | pág. 64, Jev 0.99 |
| 4 | Abbonamenti | pág. 64, Jev 1 |
| 5 | contributi in conto esercizio | pág. 29, Jev 0.97 |
| 6 | Proventi da sponsorizzazioni | pág. 64, Jev 1 |
| 7 | Proventi pubblicitari | pág. 64, Jev 1 |
| 8 | Proventi commerciali e royalties | pág. 64, Jev 0.99 |
| 9 | Proventi da cessioni diritti audiovisivi | pág. 65, Jev 1 |
| 10 | Ricavi da cessione temporanea prestazione calciatori | pág. 65, Jev 0.98 |
| 11 | Plusvalenze da cessione calciatori | pág. 65, Jev 0.99 |
| 12 | Altri proventi da trasferimento calciatori | pág. 65, Jev 0.93 |
| 13 | Rimborsi assicurativi | pág. 66, Jev 1 |
| 14 | Altri ricavi e proventi | pág. 66, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 29, Jev 0.99 |
| 2 | Costi per attività sportiva | pág. 66, precedente |
| 3 | Spese per organizzazione gare | pág. 66, Jev 0.99 |
| 4 | Costi specifici tecnici | pág. 66, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 66, Jev 1 |
| 6 | Assicurative e previdenziali | pág. 66, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 66, Jev 1 |
| 8 | Altre prestazioni di servizi | pág. 67, precedente |
| 9 | 8) per godimento di beni di terzi | pág. 29, Jev 0.99 |
| 10 | a) salari e stipendi | pág. 29, Jev 1 |
| 11 | b) oneri sociali | pág. 29, Jev 0.97 |
| 12 | c) trattamento di fine rapporto | pág. 29, Claude 0.85 |
| 13 | a) ammortamento delle immobilizzazioni immateriali | pág. 29, Claude 0.8 |
| 14 | b) ammortamento delle immobilizzazioni materiali | pág. 30, Jev 1 |
| 15 | c) altre svalutazioni delle immobilizzazioni | pág. 30, Jev 0.97 |
| 16 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 30, Jev 1 |
| 17 | 12) accantonamenti per rischi | pág. 30, Jev 0.97 |
| 18 | Oneri da organizzazione competizioni | pág. 72, Jev 1 |
| 19 | Minusvalenze da cessioni diritti calciatori | pág. 72, Jev 0.97 |
| 20 | Altri oneri da trasferimento diritti calciatori | pág. 72, Jev 0.94 |
| 21 | Altri oneri diversi di gestione | pág. 72, Jev 0.95 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 125.708. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (7.546.991). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (2.531.869). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.450.800. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Udinese/Udinese-bilancio-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Udinese/Udinese-bilancio-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 63, Jev 0.99 |
| 2 | - Gare Coppa Italia | pág. 63, Jev 0.99 |
| 3 | - Gare Coppa Italia | pág. 63, Jev 0.99 |
| 4 | Abbonamenti | pág. 63, Jev 1 |
| 5 | Contributi in conto esercizio | pág. 64, Jev 0.97 |
| 6 | Proventi da sponsorizzazioni | pág. 64, precedente |
| 7 | Proventi pubblicitari | pág. 64, precedente |
| 8 | Proventi commerciali e royalties | pág. 64, precedente |
| 9 | Proventi da cessioni diritti audiovisivi | pág. 64, precedente |
| 10 | Ricavi da cessione temporanea prestazione calciatori | pág. 64, precedente |
| 11 | Plusvalenze da cessione calciatori | pág. 64, precedente |
| 12 | Altri proventi da trasferimento calciatori | pág. 64, precedente |
| 13 | Rimborsi assicurativi | pág. 65, precedente |
| 14 | Altri ricavi e proventi | pág. 65, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 27, Jev 0.99 |
| 2 | Costi per attività sportiva | pág. 66, precedente |
| 3 | Spese per organizzazione gare | pág. 66, Jev 0.99 |
| 4 | Costi specifici tecnici | pág. 66, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 66, Jev 1 |
| 6 | Assicurative e previdenziali | pág. 66, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 66, Jev 1 |
| 8 | Altre prestazioni di servizi | pág. 66, precedente |
| 9 | affitto dei campi sportivi | pág. 67, Jev 0.96 |
| 10 | noleggio autoveicoli e automezzi per uso aziendale | pág. 67, Jev 1 |
| 11 | spese per affitti e utenze locali ad uso foresteria | pág. 67, Jev 0.95 |
| 12 | noleggio attrezzature | pág. 67, precedente |
| 13 | a) salari e stipendi | pág. 27, Jev 1 |
| 14 | b) oneri sociali | pág. 27, Jev 0.97 |
| 15 | c) trattamento di fine rapporto | pág. 27, Claude 0.85 |
| 16 | a) ammortamento delle immobilizzazioni immateriali | pág. 28, Claude 0.8 |
| 17 | b) ammortamento delle immobilizzazioni materiali | pág. 28, Jev 1 |
| 18 | c) altre svalutazioni delle immobilizzazioni | pág. 28, Jev 0.97 |
| 19 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 28, Jev 1 |
| 20 | 12) accantonamenti per rischi | pág. 28, Jev 0.97 |
| 21 | 13) altri accantonamenti | pág. 28, Claude 0.8 |
| 22 | Oneri da organizzazione competizioni | pág. 69, Jev 1 |
| 23 | Minusvalenze da cessioni diritti calciatori | pág. 69, Jev 0.97 |
| 24 | Altri oneri da trasferimento diritti calciatori | pág. 69, Jev 0.94 |
| 25 | Altri oneri diversi di gestione | pág. 69, Jev 0.95 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 5.153.111. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos,
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): incluye = broadcasting. Claude 2026-10-07: la TV (Proventi da cessioni diritti audiovisivi 36.160.511, nota L2442) está dentro del renglón 'altri' 70.918.956 del estado (L857); no se separa porque --reemplaza 'altri' también tocaría el 16) y el 17) (ver to-do 157)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 121.750. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (5.856.187). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (2.354.788). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 5.153.111. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Franco Soldati (data/gestiones/it.js):_

```text
Franco Soldati, presidente del consejo (la familia Pozzo controla vía Gesapar). La fuente dice 2000 en un lado y 2002 en otro; 01/01/2002 por convención.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### udinese-it-bilancio-2024-25

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Udinese/Udinese-bilancio-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### udinese-it-bilancio-2021-22

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Udinese/Udinese-bilancio-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
