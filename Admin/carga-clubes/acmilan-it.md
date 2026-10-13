# acmilan-it — evidencia de carga

Lo que había como comentario en `data/acmilan-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/acmilan-it-data.js — A.C. Milan S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "acmilan-it" — slug de "AC Milan" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "A.C. Milan S.p.A." — el .md, 18 veces (nombre del club + forma societaria)
  displayName        ok        "AC Milan" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 74 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [argentina] ac milan: #E4002B Crimson Red, #101820 Black, #FFFFFF White | [italia] ac milan: #E4002B Crimso
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 2 línea(s), pero ninguno es una cotización plausible
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "acmilan-it-bilanci-relazioni-2023-24" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "AC Milan"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"acmilan-it-bilanci-relazioni-2023-24"}
============================================================================
```

_de data/clubs.js:_

```text
AC Milan: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.pdf.
brandColor y su procedencia: fuentes/Italia/AC Milan.md.
```

_de data/club-leagues/it.js:_

```text
AC Milan (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "AC Milan".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 36, precedente |
| 2 | b) abbonamenti | pág. 36, precedente |
| 3 | c) ricavi da altre competizioni | pág. 36, precedente |
| 4 | 2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 36, precedente |
| 5 | a) contributi in conto esercizio | pág. 36, precedente |
| 6 | b) proventi da sponsorizzazioni | pág. 36, precedente |
| 7 | c) proventi pubblicitari | pág. 36, Jev 1 |
| 8 | d) proventi commerciali e royalties | pág. 36, precedente |
| 9 | e) proventi da cessione diritti audiovisivi | pág. 36, precedente |
| 10 | f) proventi vari | pág. 36, precedente |
| 11 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 36, precedente |
| 12 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 36, precedente |
| 13 | i) altri proventi da gestione calciatori | pág. 36, precedente |
| 14 | l) ricavi e proventi diversi | pág. 36, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 36, precedente |
| 2 | Costi generali attività sportiva | pág. 99, precedente |
| 3 | Consulenze e collaborazioni | pág. 99, precedente |
| 4 | Pubblicità e spese promozionali | pág. 99, precedente |
| 5 | Assicurazioni | pág. 99, precedente |
| 6 | Emolumenti ad organi sociali | pág. 99, precedente |
| 7 | Spese amministrative e generali | pág. 99, precedente |
| 8 | Mensa e servizi di ristorazione | pág. 99, precedente |
| 9 | Manutenzione e riparazione | pág. 99, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 99, precedente |
| 11 | Altri costi per servizi | pág. 99, precedente |
| 12 | Affitti passivi | pág. 101, precedente |
| 13 | Noleggi e altre locazioni | pág. 101, precedente |
| 14 | a) salari e stipendi | pág. 36, precedente |
| 15 | b) oneri sociali | pág. 36, precedente |
| 16 | c) trattamento di fine rapporto | pág. 36, precedente |
| 17 | d) trattamento di quiescenza e simili | pág. 36, Jev 0.99 |
| 18 | e) altri costi | pág. 36, precedente |
| 19 | a) ammortamento delle immobilizzazioni immateriali | pág. 36, precedente |
| 20 | b) ammortamento delle immobilizzazioni materiali | pág. 36, precedente |
| 21 | c) altre svalutazioni delle immobilizzazioni | pág. 36, precedente |
| 22 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 36, precedente |
| 23 | 11 variazione delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 36, Jev 1 |
| 24 | 12 accantonamenti per rischi | pág. 36, precedente |
| 25 | 13 altri accantonamenti | pág. 36, Claude 0.85 |
| 26 | a) spese varie organizzazione gare | pág. 36, precedente |
| 27 | b) tasse iscrizione gare | pág. 36, precedente |
| 28 | c) percentuale su incassi gare a squadre ospiti | pág. 36, Jev 0.99 |
| 29 | d) costi per acquisizione temporanea calciatori | pág. 36, precedente |
| 30 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 36, precedente |
| 31 | f) altri oneri da gestione calciatori | pág. 36, precedente |
| 32 | g) altri oneri diversi di gestione | pág. 36, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 39, Jev 1 |
| 2 | b) abbonamenti | pág. 39, Jev 1 |
| 3 | c) ricavi da altre competizioni | pág. 39, Jev 0.93 |
| 4 | 2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 39, Jev 0.94 |
| 5 | a) contributi in conto esercizio | pág. 39, Jev 0.98 |
| 6 | b) proventi da sponsorizzazioni | pág. 39, Jev 1 |
| 7 | d) proventi commerciali e royalties | pág. 39, Jev 1 |
| 8 | e) proventi da cessione diritti audiovisivi | pág. 39, Jev 1 |
| 9 | f) proventi vari | pág. 39, Jev 1 |
| 10 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 39, Jev 0.98 |
| 11 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 39, Jev 1 |
| 12 | i) altri proventi da gestione calciatori | pág. 39, Jev 0.95 |
| 13 | l) ricavi e proventi diversi | pág. 39, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 39, Jev 0.99 |
| 2 | Costi generali attività sportiva | pág. 91, precedente |
| 3 | Consulenze e collaborazioni | pág. 91, precedente |
| 4 | Pubblicità e spese promozionali | pág. 91, Jev 1 |
| 5 | Assicurazioni | pág. 92, precedente |
| 6 | Emolumenti ad organi sociali | pág. 92, Jev 0.98 |
| 7 | Spese amministrative e generali | pág. 92, Jev 1 |
| 8 | Mensa e servizi di ristorazione | pág. 92, precedente |
| 9 | Manutenzione e riparazione | pág. 92, Jev 0.93 |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 92, Jev 0.9 |
| 11 | Altri costi per servizi | pág. 92, Jev 0.92 |
| 12 | Affitti passivi | pág. 93, Jev 0.96 |
| 13 | Noleggi e altre locazioni | pág. 93, precedente |
| 14 | a) salari e stipendi | pág. 39, Jev 1 |
| 15 | b) oneri sociali | pág. 39, Jev 0.98 |
| 16 | c) trattamento di fine rapporto | pág. 39, Jev 0.98 |
| 17 | e) altri costi | pág. 39, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 39, Claude 0.8 |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 39, Jev 1 |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 39, Jev 0.93 |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 39, Jev 1 |
| 22 | 12 accantonamenti per rischi | pág. 39, Jev 0.97 |
| 23 | a) spese varie organizzazione gare | pág. 39, Jev 0.99 |
| 24 | b) tasse iscrizione gare | pág. 39, Jev 1 |
| 25 | d) costi per acquisizione temporanea calciatori | pág. 39, Jev 0.98 |
| 26 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 39, Jev 0.99 |
| 27 | f) altri oneri da gestione calciatori | pág. 39, Jev 0.99 |
| 28 | g) altri oneri diversi di gestione | pág. 39, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 672. D) rettifiche quedaban sin lado; las dos filas se llaman igual (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (800). ver el anterior (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 33, precedente |
| 2 | b) abbonamenti | pág. 33, precedente |
| 3 | c) ricavi da altre competizioni | pág. 33, precedente |
| 4 | Rimanenze Finali E-Commerce | pág. 77, Claude 0.8 |
| 5 | Rimanenze Finali Store Casa Milan | pág. 77, Claude 0.8 |
| 6 | Acc. Fondo Obsolescenza E-commerce | pág. 77, ? 0.7 |
| 7 | a) contributi in conto esercizio | pág. 33, precedente |
| 8 | b) proventi da sponsorizzazioni | pág. 33, precedente |
| 9 | d) proventi commerciali e royalties | pág. 33, precedente |
| 10 | e) proventi da cessione diritti audiovisivi | pág. 33, precedente |
| 11 | f) proventi vari | pág. 33, precedente |
| 12 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 33, precedente |
| 13 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 33, precedente |
| 14 | i) altri proventi da gestione calciatori | pág. 33, precedente |
| 15 | l) ricavi e proventi diversi | pág. 33, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 33, precedente |
| 2 | Costi generali attività sportiva | pág. 80, precedente |
| 3 | Consulenze e collaborazioni | pág. 80, precedente |
| 4 | Pubblicità e spese promozionali | pág. 80, precedente |
| 5 | Assicurazioni | pág. 80, precedente |
| 6 | Emolumenti ad organi sociali | pág. 80, precedente |
| 7 | Spese amministrative e generali | pág. 80, precedente |
| 8 | Mensa e servizi di ristorazione | pág. 80, precedente |
| 9 | Manutenzione e riparazione | pág. 80, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 81, precedente |
| 11 | Altri costi per servizi | pág. 81, precedente |
| 12 | Affitti passivi | pág. 82, precedente |
| 13 | Noleggi e altre locazioni | pág. 82, precedente |
| 14 | a) salari e stipendi | pág. 33, precedente |
| 15 | b) oneri sociali | pág. 33, precedente |
| 16 | c) trattamento di fine rapporto | pág. 33, precedente |
| 17 | e) altri costi | pág. 33, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 33, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 33, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 33, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 33, precedente |
| 22 | 12 accantonamenti per rischi | pág. 33, precedente |
| 23 | a) spese varie organizzazione gare | pág. 33, precedente |
| 24 | b) tasse iscrizione gare | pág. 33, precedente |
| 25 | c) percentuale da riconoscere a squadre ospiti | pág. 33, Jev 0.99 |
| 26 | d) costi per acquisizione temporanea calciatori | pág. 33, precedente |
| 27 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 33, precedente |
| 28 | f) altri oneri da gestione calciatori | pág. 33, precedente |
| 29 | g) altri oneri diversi di gestione | pág. 33, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 27, precedente |
| 2 | c) ricavi da altre competizioni | pág. 27, precedente |
| 3 | 2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 27, precedente |
| 4 | a) contributi in conto esercizio | pág. 27, precedente |
| 5 | b) proventi da sponsorizzazioni | pág. 27, precedente |
| 6 | d) proventi commerciali e royalties | pág. 27, precedente |
| 7 | e) proventi da cessione diritti audiovisivi | pág. 27, precedente |
| 8 | f) proventi vari | pág. 27, precedente |
| 9 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 27, precedente |
| 10 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 27, precedente |
| 11 | i) altri proventi da gestione calciatori | pág. 27, precedente |
| 12 | l) ricavi e proventi diversi | pág. 27, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 27, precedente |
| 2 | 7 per servizi | pág. 27, Jev 1 |
| 3 | 8 per godimento di beni di terzi | pág. 27, Jev 0.97 |
| 4 | a) salari e stipendi | pág. 27, precedente |
| 5 | b) oneri sociali | pág. 27, precedente |
| 6 | c) trattamento di fine rapporto | pág. 27, precedente |
| 7 | e) altri costi | pág. 27, precedente |
| 8 | a) ammortamento delle immobilizzazioni immateriali | pág. 27, precedente |
| 9 | b) ammortamento delle immobilizzazioni materiali | pág. 27, precedente |
| 10 | c) altre svalutazioni delle immobilizzazioni | pág. 27, precedente |
| 11 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 27, precedente |
| 12 | 12 accantonamenti per rischi | pág. 27, precedente |
| 13 | a) spese varie organizzazione gare | pág. 27, precedente |
| 14 | b) tasse iscrizione gare | pág. 27, precedente |
| 15 | d) costi per acquisizione temporanea calciatori | pág. 27, precedente |
| 16 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 27, precedente |
| 17 | f) altri oneri da gestione calciatori | pág. 27, precedente |
| 18 | g) altri oneri diversi di gestione | pág. 27, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 521. D) rettifiche sin lado: 18) a) rivalutazioni di partecipazioni 521 (TOTALE D (479), L844); igual que AC Milan 2023-24 (to-do 155)
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1.000). D) rettifiche sin lado: 19) a) svalutazioni di partecipazioni (1.000); ver el anterior (to-do 155)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: verificado 2026-10-09 contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), "Milan" (el script no lo tomó: "Inter Milan" también dice Milan)
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | A) RICAVI DA GARE | pág. 25, precedente |
| 2 | B) ABBONAMENTI | pág. 25, precedente |
| 3 | C) RICAVI DA ALTRE COMPETIZIONI | pág. 25, precedente |
| 4 | 2 VARIAZIONI DELLE RIMANENZE DI PRODUIT IN CORSO DI LAVORAZIONE, SEMILAVORATI E FINITI | pág. 25, Jev 0.99 |
| 5 | B) PROVENTI DA SPONSORIZZAZIONI | pág. 25, precedente |
| 6 | D) PROVENTI COMMERCIALI E ROYALTIES | pág. 25, precedente |
| 7 | E) PROVENTI DA CESSIONE DIRITTI AUDIOVISIVI | pág. 25, precedente |
| 8 | F) PROVENTI VARI | pág. 25, precedente |
| 9 | G) RICAVI DA CESSIONE TEMPORANEA PRESTAZIONI CALCIATORI | pág. 25, precedente |
| 10 | H) PLUSVALENZE DA CESSIONE DIRITTI PLURIENNALI PRESTAZIONI CALCIATORI | pág. 25, precedente |
| 11 | I) ALTRI PROVENTI DA GESTIONE CALCIATORI | pág. 25, precedente |
| 12 | L) RICAVI E PROVENTI DIVERSI | pág. 25, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 PER MATERIE PRIME, SUSSIDIARIE, DI CONSUMO, MERCI | pág. 25, precedente |
| 2 | Costi generali attività sportiva | pág. 67, precedente |
| 3 | Consulenze e collaborazioni | pág. 67, precedente |
| 4 | Pubblicità e spese promozionali | pág. 67, precedente |
| 5 | Assicurazioni | pág. 67, precedente |
| 6 | Emolumenti ad organi sociali | pág. 67, precedente |
| 7 | Spese amministrative e generali | pág. 67, precedente |
| 8 | Mensa e servizi di ristorazione | pág. 67, precedente |
| 9 | Manutenzione e riparazione | pág. 67, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 67, precedente |
| 11 | Altri costi per servizi | pág. 67, precedente |
| 12 | Affitti passivi | pág. 68, precedente |
| 13 | Noleggi e altre locazioni | pág. 68, precedente |
| 14 | A) SALARI E STIPENDI | pág. 25, precedente |
| 15 | B) ONERI SOCIALI | pág. 25, precedente |
| 16 | C) TRATTAMENTO DI FINE RAPPORTO | pág. 25, precedente |
| 17 | E) ALTRI COSTI | pág. 25, precedente |
| 18 | A) AMMORTAMENTO DELLE IMMOBILIZZAZIONI IMMATERIALI | pág. 25, precedente |
| 19 | B) AMMORTAMENTO DELLE IMMOBILIZZAZIONI MATERIALI | pág. 25, precedente |
| 20 | C) ALTRE SVALUTAZIONI DELLE IMMOBILIZZAZIONI | pág. 25, precedente |
| 21 | D) SVALUTAZIONE DEI CREDITI COMPRESI NELL'ATTIVO CIRCOLANTE E DELLE DISPONIBILITÀ LIQUIDE | pág. 25, precedente |
| 22 | 12 ACCANTONAMENTI PER RISCHI | pág. 25, precedente |
| 23 | A) SPESE VARIE ORGANIZZAZIONE GARE | pág. 25, precedente |
| 24 | B) TASSE ISCRIZIONE GARE | pág. 25, precedente |
| 25 | C) PERCENTUALE DA RICONOSCERE A SQUADRE OSPITI | pág. 25, precedente |
| 26 | D) COSTI PER ACQUISIZIONE TEMPORANEA CALCIATORI | pág. 25, precedente |
| 27 | E) MINUSVALENZE DA CESSIONE DIRITTI PLURIENNALI PRESTAZIONI CALCIATORI | pág. 25, precedente |
| 28 | F) ALTRI ONERI DA GESTIONE CALCIATORI | pág. 25, precedente |
| 29 | G) ALTRI ONERI DIVERSI DI GESTIONE | pág. 25, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 28, precedente |
| 2 | b) abbonamenti | pág. 28, precedente |
| 3 | c) ricavi da altre competizioni | pág. 28, precedente |
| 4 | 2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 28, precedente |
| 5 | b) proventi da sponsorizzazioni | pág. 28, precedente |
| 6 | d) proventi commerciali e royalties | pág. 28, precedente |
| 7 | e) proventi da cessione diritti audiovisivi | pág. 28, precedente |
| 8 | f) proventi vari | pág. 28, precedente |
| 9 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 28, precedente |
| 10 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 28, precedente |
| 11 | i) altri proventi da gestione calciatori | pág. 28, precedente |
| 12 | l) ricavi e proventi diversi | pág. 28, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 28, precedente |
| 2 | Costi generali attività sportiva | pág. 74, precedente |
| 3 | Consulenze e collaborazioni | pág. 74, precedente |
| 4 | Pubblicità e spese promozionali | pág. 74, precedente |
| 5 | Assicurazioni | pág. 74, precedente |
| 6 | Emolumenti ad organi sociali | pág. 74, precedente |
| 7 | Spese amministrative e generali | pág. 74, precedente |
| 8 | Mensa e servizi di ristorazione | pág. 74, precedente |
| 9 | Manutenzione e riparazione | pág. 74, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 74, precedente |
| 11 | Altri costi per servizi | pág. 74, precedente |
| 12 | Affitti passivi | pág. 76, precedente |
| 13 | Noleggi e altre locazioni | pág. 76, precedente |
| 14 | a) salari e stipendi | pág. 28, precedente |
| 15 | b) oneri sociali | pág. 28, precedente |
| 16 | c) trattamento di fine rapporto | pág. 28, precedente |
| 17 | e) altri costi | pág. 28, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 28, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 28, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 28, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 28, precedente |
| 22 | 12 accantonamenti per rischi | pág. 28, precedente |
| 23 | a) spese varie organizzazione gare | pág. 28, precedente |
| 24 | b) tasse iscrizione gare | pág. 28, precedente |
| 25 | c) percentuale da riconoscere a squadre ospiti | pág. 28, precedente |
| 26 | d) costi per acquisizione temporanea calciatori | pág. 28, precedente |
| 27 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 28, precedente |
| 28 | f) altri oneri da gestione calciatori | pág. 28, precedente |
| 29 | g) altri oneri diversi di gestione | pág. 28, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 38, precedente |
| 2 | b) abbonamenti | pág. 38, precedente |
| 3 | c) ricavi da altre competizioni | pág. 38, precedente |
| 4 | 2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 38, precedente |
| 5 | b) proventi da sponsorizzazioni | pág. 38, precedente |
| 6 | d) proventi commerciali e royalties | pág. 38, precedente |
| 7 | e) proventi da cessione diritti audiovisivi | pág. 38, precedente |
| 8 | f) proventi vari | pág. 38, precedente |
| 9 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 38, precedente |
| 10 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 38, precedente |
| 11 | i) altri proventi da gestione calciatori | pág. 38, precedente |
| 12 | l) ricavi e proventi diversi | pág. 38, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 38, precedente |
| 2 | Costi generali attività sportiva | pág. 90, precedente |
| 3 | Consulenze e collaborazioni | pág. 90, precedente |
| 4 | Pubblicità e spese promozionali | pág. 90, precedente |
| 5 | Assicurazioni | pág. 90, precedente |
| 6 | Emolumenti ad organi sociali | pág. 90, precedente |
| 7 | Spese amministrative e generali | pág. 90, precedente |
| 8 | Mensa e servizi di ristorazione | pág. 90, precedente |
| 9 | Manutenzione e riparazione | pág. 90, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 90, precedente |
| 11 | Altri costi per servizi | pág. 90, precedente |
| 12 | Affitti passivi | pág. 92, precedente |
| 13 | Noleggi e altre locazioni | pág. 92, precedente |
| 14 | a) salari e stipendi | pág. 38, precedente |
| 15 | b) oneri sociali | pág. 38, precedente |
| 16 | c) trattamento di fine rapporto | pág. 38, precedente |
| 17 | e) altri costi | pág. 38, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 38, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 38, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 38, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 38, precedente |
| 22 | 12 accantonamenti per rischi | pág. 38, precedente |
| 23 | a) spese varie organizzazione gare | pág. 38, precedente |
| 24 | b) tasse iscrizione gare | pág. 38, precedente |
| 25 | c) percentuale da riconoscere a squadre ospiti | pág. 38, precedente |
| 26 | d) costi per acquisizione temporanea calciatori | pág. 38, precedente |
| 27 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 38, precedente |
| 28 | f) altri oneri da gestione calciatori | pág. 38, precedente |
| 29 | g) altri oneri diversi di gestione | pág. 38, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 43, precedente |
| 2 | b) abbonamenti | pág. 43, precedente |
| 3 | c) ricavi da altre competizioni | pág. 43, precedente |
| 4 | 2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 43, precedente |
| 5 | b) proventi da sponsorizzazioni | pág. 43, precedente |
| 6 | d) proventi commerciali e royalties | pág. 43, precedente |
| 7 | e) proventi da cessione diritti audiovisivi | pág. 43, precedente |
| 8 | f) proventi vari | pág. 43, precedente |
| 9 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 43, precedente |
| 10 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 43, precedente |
| 11 | i) altri proventi da gestione calciatori | pág. 43, precedente |
| 12 | l) ricavi e proventi diversi | pág. 43, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 43, precedente |
| 2 | 7 per servizi | pág. 43, Jev 1 |
| 3 | 8 per godimento di beni di terzi | pág. 43, Jev 0.97 |
| 4 | a) salari e stipendi | pág. 43, precedente |
| 5 | b) oneri sociali | pág. 43, precedente |
| 6 | c) trattamento di fine rapporto | pág. 43, precedente |
| 7 | e) altri costi | pág. 43, precedente |
| 8 | a) ammortamento delle immobilizzazioni immateriali | pág. 43, precedente |
| 9 | b) ammortamento delle immobilizzazioni materiali | pág. 43, precedente |
| 10 | c) altre svalutazioni delle immobilizzazioni | pág. 43, precedente |
| 11 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 43, precedente |
| 12 | 12 accantonamenti per rischi | pág. 43, precedente |
| 13 | a) spese varie organizzazione gare | pág. 43, precedente |
| 14 | b) tasse iscrizione gare | pág. 43, precedente |
| 15 | c) percentuale da riconoscere a squadre ospiti | pág. 43, precedente |
| 16 | d) costi per acquisizione temporanea calciatori | pág. 43, precedente |
| 17 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 43, precedente |
| 18 | f) altri oneri da gestione calciatori | pág. 43, precedente |
| 19 | g) altri oneri diversi di gestione | pág. 43, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (218). D) rettifiche quedan sin lado: 19) a) svalutazioni di partecipazioni (218), TOTALE D (218) L1018; igual que AC Milan 2023-24 (to-do 155)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2017–18 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 26, precedente |
| 2 | b) abbonamenti | pág. 26, precedente |
| 3 | c) ricavi da altre competizioni | pág. 26, precedente |
| 4 | 4 Incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio | pág. 26, Jev 0.99 |
| 5 | a) contributi in conto esercizio | pág. 26, precedente |
| 6 | b) proventi da sponsorizzazioni | pág. 26, precedente |
| 7 | c) proventi pubblicitari | pág. 26, Jev 1 |
| 8 | d) proventi commerciali e royalties | pág. 26, precedente |
| 9 | e) proventi da cessione diritti audiovisivi | pág. 26, precedente |
| 10 | f) proventi vari | pág. 26, precedente |
| 11 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 26, precedente |
| 12 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 13 | i) altri proventi da gestione calciatori | pág. 26, precedente |
| 14 | l) ricavi e proventi diversi | pág. 26, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 26, precedente |
| 2 | Costi generali attività sportiva | pág. 54, precedente |
| 3 | Consulenze e collaborazioni | pág. 54, precedente |
| 4 | Pubblicità e altre spese promozionali | pág. 54, Jev 0.97 |
| 5 | Assicurazioni | pág. 54, precedente |
| 6 | Emolumenti ad organi sociali | pág. 54, precedente |
| 7 | Spese amministrative e generali | pág. 54, precedente |
| 8 | Mensa e servizi di ristorazione | pág. 54, precedente |
| 9 | Manutenzione e riparazione | pág. 54, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 54, precedente |
| 11 | Altri costi per servizi | pág. 54, precedente |
| 12 | Affitti passivi | pág. 55, precedente |
| 13 | Noleggi e altre locazioni | pág. 55, precedente |
| 14 | a) salari e stipendi | pág. 26, precedente |
| 15 | b) oneri sociali | pág. 26, precedente |
| 16 | c) trattamento di fine rapporto | pág. 26, precedente |
| 17 | e) altri costi | pág. 26, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 26, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 26, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 26, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liq. | pág. 26, Jev 1 |
| 22 | 12 accantonamenti per rischi | pág. 26, precedente |
| 23 | a) spese varie organizzazione gare | pág. 26, precedente |
| 24 | b) tasse iscrizione gare | pág. 26, precedente |
| 25 | c) costi per acquisizione temporanea calciatori | pág. 26, precedente |
| 26 | d) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 27 | e) altri oneri da gestione calciatori | pág. 26, precedente |
| 28 | f) altri oneri diversi di gestione | pág. 26, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 25, precedente |
| 2 | b) abbonamenti | pág. 25, precedente |
| 3 | c) ricavi da altre competizioni | pág. 25, precedente |
| 4 | 4 incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio | pág. 25, Jev 0.99 |
| 5 | a) contributi in conto esercizio | pág. 25, precedente |
| 6 | b) proventi da sponsorizzazioni | pág. 25, precedente |
| 7 | c) proventi pubblicitari | pág. 25, precedente |
| 8 | d) proventi commerciali e royalties | pág. 25, precedente |
| 9 | e) proventi da cessione diritti audiovisivi | pág. 25, precedente |
| 10 | f) proventi vari | pág. 25, precedente |
| 11 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 25, precedente |
| 12 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 25, precedente |
| 13 | i) altri proventi da gestione calciatori | pág. 25, precedente |
| 14 | l) ricavi e proventi diversi | pág. 25, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 25, precedente |
| 2 | Costi generali attività sportiva | pág. 52, precedente |
| 3 | Consulenze e collaborazioni | pág. 52, precedente |
| 4 | Pubblicità e propaganda | pág. 52, Jev 1 |
| 5 | Assicurazioni | pág. 52, precedente |
| 6 | Emolumenti ad organi sociali | pág. 52, precedente |
| 7 | Spese amministrative e generali | pág. 52, precedente |
| 8 | Mensa, ricerca e formazione del personale | pág. 52, Claude 0.88 |
| 9 | Manutenzione e riparazione | pág. 52, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 52, precedente |
| 11 | Altri costi per servizi | pág. 52, precedente |
| 12 | Affitti passivi | pág. 53, precedente |
| 13 | Noleggi e altre locazioni | pág. 53, precedente |
| 14 | a) salari e stipendi | pág. 25, precedente |
| 15 | b) oneri sociali | pág. 25, precedente |
| 16 | c) trattamento di fine rapporto | pág. 25, precedente |
| 17 | e) altri costi | pág. 25, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 25, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 25, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 25, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liq. | pág. 25, Jev 1 |
| 22 | 12 accantonamenti per rischi | pág. 25, precedente |
| 23 | a) spese varie organizzazione gare | pág. 25, precedente |
| 24 | b) tasse iscrizione gare | pág. 25, precedente |
| 25 | c) costi per acquisizione temporanea calciatori | pág. 25, precedente |
| 26 | d) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 25, precedente |
| 27 | e) altri oneri da gestione calciatori | pág. 25, precedente |
| 28 | f) altri oneri diversi di gestione | pág. 25, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2012: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2012–13 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2011.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 26, precedente |
| 2 | b) abbonamenti | pág. 26, precedente |
| 3 | c) ricavi da altre competizioni | pág. 26, precedente |
| 4 | 4 incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio | pág. 26, Jev 0.99 |
| 5 | a) contributi in conto esercizio | pág. 26, precedente |
| 6 | b) proventi da sponsorizzazioni | pág. 26, precedente |
| 7 | c) proventi pubblicitari | pág. 26, precedente |
| 8 | d) proventi commerciali e royalties | pág. 26, precedente |
| 9 | e) proventi da cessione diritti audiovisivi | pág. 26, precedente |
| 10 | f) proventi vari | pág. 26, precedente |
| 11 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 26, precedente |
| 12 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 13 | i) altri proventi da gestione calciatori | pág. 26, precedente |
| 14 | l) ricavi e proventi diversi | pág. 26, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 per materie prime, sussidiarie, di consumo, merci | pág. 26, precedente |
| 2 | Costi generali attività sportiva | pág. 55, precedente |
| 3 | Consulenze e collaborazioni | pág. 55, precedente |
| 4 | Pubblicità e propaganda | pág. 55, Jev 1 |
| 5 | Assicurazioni | pág. 55, precedente |
| 6 | Emolumenti ad organi sociali | pág. 55, precedente |
| 7 | Spese amministrative e generali | pág. 55, precedente |
| 8 | Mensa, ricerca e formazione del personale | pág. 55, Claude 0.88 |
| 9 | Manutenzione e riparazione | pág. 55, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 55, precedente |
| 11 | Altri costi per servizi | pág. 55, precedente |
| 12 | Affitti passivi | pág. 56, precedente |
| 13 | Noleggi e altre locazioni | pág. 56, precedente |
| 14 | a) salari e stipendi | pág. 26, precedente |
| 15 | b) oneri sociali | pág. 26, precedente |
| 16 | c) trattamento di fine rapporto | pág. 26, precedente |
| 17 | e) altri costi | pág. 26, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 26, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 26, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 26, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 26, precedente |
| 22 | a) spese varie organizzazione gare | pág. 26, precedente |
| 23 | b) tasse iscrizione gare | pág. 26, precedente |
| 24 | c) costi per acquisizione temporanea calciatori | pág. 26, precedente |
| 25 | d) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 26 | e) altri oneri da gestione calciatori | pág. 26, precedente |
| 27 | f) altri oneri diversi di gestione | pág. 26, precedente |

### Meta

```text
2011: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (101). Claude 2026-10-08 (Guido: a mano): la extracción se salteó la sección D de 2011 (.md L1006-L1010: a) di partecipazioni (96), b) di immobilizzazioni finanziarie (5), Totale (101), TOTALE D (101)); sin ella el resultado daba −67,233 M contra −67,334 M impreso. Sin línea a propósito: el escalón de la sección D sigue trayendo las filas de la E
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2011: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 30, Jev 1 |
| 2 | b) abbonamenti | pág. 30, precedente |
| 3 | d) ricavi da altre competizioni | pág. 30, precedente |
| 4 | 4) incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio | pág. 30, Jev 0.98 |
| 5 | a) contributi in conto esercizio | pág. 30, precedente |
| 6 | b) proventi da sponsorizzazioni | pág. 30, precedente |
| 7 | c) proventi pubblicitari | pág. 30, precedente |
| 8 | d) proventi commerciali e royalties | pág. 30, precedente |
| 9 | e) proventi da cessione diritti televisivi | pág. 30, Jev 1 |
| 10 | f) proventi vari | pág. 30, precedente |
| 11 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 30, precedente |
| 12 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 30, precedente |
| 13 | i) altri proventi da gestione calciatori | pág. 30, precedente |
| 14 | l) ricavi e proventi diversi | pág. 30, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo, merci | pág. 30, precedente |
| 2 | Costi generali attività sportiva | pág. 81, precedente |
| 3 | Consulenze e collaborazioni | pág. 81, precedente |
| 4 | Pubblicità e propaganda | pág. 81, Jev 1 |
| 5 | Assicurazioni | pág. 81, precedente |
| 6 | Emolumenti ad organi sociali | pág. 81, precedente |
| 7 | Spese amministrative e generali | pág. 81, precedente |
| 8 | Mensa, ricerca e formazione del personale | pág. 81, Claude 0.88 |
| 9 | Manutenzione e riparazione | pág. 81, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 81, precedente |
| 11 | Altri costi per servizi | pág. 81, precedente |
| 12 | Affitti passivi | pág. 83, precedente |
| 13 | Noleggi e altre locazioni | pág. 83, precedente |
| 14 | a) salari e stipendi | pág. 30, precedente |
| 15 | b) oneri sociali | pág. 30, precedente |
| 16 | c) trattamento di fine rapporto | pág. 30, precedente |
| 17 | e) altri costi | pág. 30, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 30, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 30, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 30, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 30, precedente |
| 22 | a) spese varie organizzazione gare | pág. 30, precedente |
| 23 | b) tasse iscrizione gare | pág. 30, precedente |
| 24 | c) costi per acquisizione temporanea calciatori | pág. 30, precedente |
| 25 | d) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 30, precedente |
| 26 | e) altri oneri da gestione calciatori | pág. 30, precedente |
| 27 | f) altri oneri diversi di gestione | pág. 30, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2010: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2010–11 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 31, Jev 1 |
| 2 | b) percentuale su incassi gare da squadre ospitanti | pág. 31, Jev 0.96 |
| 3 | c) abbonamenti | pág. 31, precedente |
| 4 | d) ricavi da altre competizioni | pág. 31, precedente |
| 5 | 4) incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio | pág. 31, Jev 0.98 |
| 6 | a) contributi in conto esercizio | pág. 31, precedente |
| 7 | b) proventi da sponsorizzazioni | pág. 31, precedente |
| 8 | c) proventi pubblicitari | pág. 31, precedente |
| 9 | d) proventi commerciali e royalties | pág. 31, precedente |
| 10 | e) proventi da cessione diritti televisivi | pág. 31, Jev 1 |
| 11 | f) proventi vari | pág. 31, precedente |
| 12 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 31, precedente |
| 13 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 31, precedente |
| 14 | i) altri proventi da gestione calciatori | pág. 31, precedente |
| 15 | l) ricavi e proventi diversi | pág. 31, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo, merci | pág. 31, precedente |
| 2 | Costi generali attività sportiva | pág. 79, precedente |
| 3 | Consulenze e collaborazioni | pág. 79, precedente |
| 4 | Pubblicità e propaganda | pág. 79, Jev 1 |
| 5 | Assicurazioni | pág. 79, precedente |
| 6 | Emolumenti ad organi sociali | pág. 79, precedente |
| 7 | Spese amministrative e generali | pág. 79, precedente |
| 8 | Mensa, ricerca e formazione del personale | pág. 79, Claude 0.88 |
| 9 | Manutenzione e riparazione | pág. 79, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 79, precedente |
| 11 | Altri costi per servizi | pág. 79, precedente |
| 12 | 8) per godimento di beni di terzi | pág. 31, precedente |
| 13 | a) salari e stipendi | pág. 31, precedente |
| 14 | b) oneri sociali | pág. 31, precedente |
| 15 | c) trattamento di fine rapporto | pág. 31, precedente |
| 16 | e) altri costi | pág. 31, precedente |
| 17 | a) ammortamento delle immobilizzazioni immateriali | pág. 31, precedente |
| 18 | b) ammortamento delle immobilizzazioni materiali | pág. 31, precedente |
| 19 | c) altre svalutazioni delle immobilizzazioni | pág. 31, precedente |
| 20 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 31, precedente |
| 21 | a) spese varie organizzazione gare | pág. 31, precedente |
| 22 | b) tasse iscrizione gare | pág. 31, precedente |
| 23 | c) oneri specifici verso squadre ospitate: | pág. 31, Jev 1 |
| 24 | d) costi per acquisizione temporanea calciatori | pág. 31, precedente |
| 25 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 31, precedente |
| 26 | f) altri oneri da gestione calciatori | pág. 31, precedente |
| 27 | g) altri oneri diversi di gestione | pág. 31, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2009: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2009–10 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 31, Jev 1 |
| 2 | b) percentuale su incassi gare da squadre ospitanti | pág. 31, Jev 0.96 |
| 3 | c) abbonamenti | pág. 31, precedente |
| 4 | d) ricavi da altre competizioni | pág. 31, precedente |
| 5 | 4) incrementi di immobilizzazioni per lavori interni e capitalizzazione costi vivaio | pág. 31, Jev 0.98 |
| 6 | a) contributi in conto esercizio | pág. 31, precedente |
| 7 | b) proventi da sponsorizzazioni | pág. 31, precedente |
| 8 | c) proventi pubblicitari | pág. 31, precedente |
| 9 | d) proventi commerciali e royalties | pág. 31, precedente |
| 10 | e) proventi da cessione diritti televisivi | pág. 31, Jev 1 |
| 11 | f) proventi vari | pág. 31, precedente |
| 12 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 31, precedente |
| 13 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 31, precedente |
| 14 | i) altri proventi da gestione calciatori | pág. 31, precedente |
| 15 | l) ricavi e proventi diversi | pág. 31, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo, merci | pág. 31, precedente |
| 2 | Costi generali attività sportiva | pág. 79, precedente |
| 3 | Consulenze e collaborazioni | pág. 79, precedente |
| 4 | Pubblicità e propaganda | pág. 79, Jev 1 |
| 5 | Assicurazioni | pág. 79, precedente |
| 6 | Emolumenti ad organi sociali | pág. 79, precedente |
| 7 | Spese amministrative e generali | pág. 79, precedente |
| 8 | Mensa, ricerca e formazione del personale | pág. 79, Claude 0.88 |
| 9 | Manutenzione e riparazione | pág. 79, precedente |
| 10 | Trasporti, magazzinaggio e spese viaggio | pág. 79, precedente |
| 11 | Altri costi per servizi | pág. 79, precedente |
| 12 | Affitti passivi | pág. 81, precedente |
| 13 | Noleggi e altre locazioni | pág. 81, precedente |
| 14 | a) salari e stipendi | pág. 31, precedente |
| 15 | b) oneri sociali | pág. 31, precedente |
| 16 | c) trattamento di fine rapporto | pág. 31, precedente |
| 17 | e) altri costi | pág. 31, precedente |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 31, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 31, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 31, precedente |
| 21 | d) svalutazione dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 31, precedente |
| 22 | a) spese varie organizzazione gare | pág. 31, precedente |
| 23 | b) tasse iscrizione gare | pág. 31, precedente |
| 24 | c) oneri specifici verso squadre ospitate: | pág. 31, Jev 1 |
| 25 | d) costi per acquisizione temporanea calciatori | pág. 31, precedente |
| 26 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 31, precedente |
| 27 | f) altri oneri a gestione calciatori | pág. 31, precedente |
| 28 | g) altri oneri diversi di gestione | pág. 31, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2008: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2008–09 Serie A" (tools/club-league-reference/it.json), coincidencia ú
```

## Gestiones

_antes de Silvio Berlusconi (data/gestiones/it.js):_

```text
Berlusconi: dueño del 20/2/1986 al 13/4/2017 (presidente 1986-2004 y 2006-2008; de 2008 a 2017 el cargo de presidente estuvo vacante y
fue presidente honorario desde el 29/3/2012). Se carga como dueño con nombre (regla de la cabecera de ar.js).
```

_antes de Paolo Scaroni (data/gestiones/it.js):_

```text
Elliott (fondo) subió a Scaroni a la presidencia el 21/7/2018; RedBird (fondo) lo confirmó desde 2022.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### acmilan-it-bilanci-relazioni-2023-24

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2022-23

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2017-18

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2021-22

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2019-20

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2024-25

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2020-21

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilancio-gruppo-dic-2008

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2008.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilancio-gruppo-dic-2009

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilancio-gruppo-dic-2010

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilancio-gruppo-dic-2011

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilancio-gruppo-dic-2012

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilancio-gruppo-dic-2013

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilancio-gruppo-dic-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### acmilan-it-bilanci-relazioni-2018-19

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
