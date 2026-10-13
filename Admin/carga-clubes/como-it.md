# como-it — evidencia de carga

Lo que había como comentario en `data/como-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/como-it-data.js — Como 1907 S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Como/Como-gruppo-pro-forma-consolidamento-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "como-it" — slug de "Como" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Como 1907 S.r.l." — el .md, 6 veces (nombre del club + forma societaria)
  displayName        ok        "Como" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (133 de 133 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 36 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] como 1907: #10416A Navy Blue, #FFFFFF White
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (133 de 133 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: individual (Como 1907 S.p.A.); el pro-forma di consolidamento es una
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "como-it-gruppo-pro-forma-consolidamento-2025" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Como"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"como-it-gruppo-pro-forma-consolidamento-2025"}
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Como/Como-gruppo-pro-forma-consolidamento-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Como/Como-gruppo-pro-forma-consolidamento-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Campionato | pág. 29, Jev 1 |
| 2 | Percentuale squadra ospite | pág. 29, Claude 0.85 |
| 3 | Tornei e amichevoli | pág. 29, Jev 0.98 |
| 4 | b) abbonamenti | pág. 9, Jev 1 |
| 5 | a) contributi in conto esercizio | pág. 9, Jev 0.98 |
| 6 | e) proventi da cessione diritti televisivi | pág. 9, Jev 1 |
| 7 | f) ricavi cessione temporanea calciatori | pág. 9, Jev 0.98 |
| 8 | g) plusvalenze cessione diritti prestazioni calciatori | pág. 9, Jev 1 |
| 9 | h) altri proventi da gestione calciatori | pág. 9, Claude 0.85 |
| 10 | b) sponsorizzazioni (Como 1907) | pág. 9, Jev 1 |
| 11 | d) proventi commerciali e royalties (Como 1907) | pág. 9, Jev 1 |
| 12 | i) altri ricavi e proventi diversi (Como 1907) | pág. 9, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | b) costi per acquisizione temporanea prestazione calciatori | pág. 9, Jev 0.99 |
| 2 | c) minusvalenze cessione diritti prestaz.calciatori | pág. 9, Jev 0.98 |
| 3 | d) altri oneri da gestione calciatori | pág. 9, Jev 0.98 |
| 4 | 6) Per materie prime, sussidiarie, di consumo (Como 1907) | pág. 9, Jev 0.99 |
| 5 | 7) Per servizi (Como 1907) | pág. 9, Jev 1 |
| 6 | 8) Per godimento di beni di terzi (Como 1907) | pág. 9, Jev 0.99 |
| 7 | a) salari e stipendi (Como 1907) | pág. 9, Jev 1 |
| 8 | b) oneri sociali (Como 1907) | pág. 9, Jev 0.92 |
| 9 | c) trattamento di fine rapporto (Como 1907) | pág. 9, Jev 0.91 |
| 10 | a) ammortamento delle immobilizzazioni immateriali (Como 1907) | pág. 9, Claude 0.8 |
| 11 | b) ammortamento delle immobilizzazioni materiali (Como 1907) | pág. 9, Jev 1 |
| 12 | c) altre svalutazioni delle immobilizzazioni (Como 1907) | pág. 9, Jev 0.98 |
| 13 | a) oneri da organizzazione competizioni (Como 1907) | pág. 9, Jev 1 |
| 14 | e) altri oneri diversi e sopravvenienze passive (Como 1907) | pág. 9, Jev 0.95 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 5.213.198. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 568.130. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 360.799. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.966.288. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 26.307.897. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.633.489. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 80.140.300. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.824.772. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 691.136. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 26.618.093. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 176.785. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.687.777. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 673.144. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.492.695. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 146.607. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.862.027). Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (98.887). Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (37.000). Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): resultado-final = (105.065.627). Guido 2026-10-06/07: perímetro individual (Como 1907 S.r.l.): se carga la columna "Como 1907" del prospetto pro-forma (L356-409), no la del consolidado pro-forma que tomó la extracción (to-do 154)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1907. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2025. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2.958.856. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2.962.219. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.438.174. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 4.671.024. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 5.213.198. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.694.132. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 568.130. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.168.914. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2.689.124. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 4.047.920. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 31.781.894. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 880.488. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 5.146.957. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 853.053. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 360.799. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 5.440.013. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 5.190.302. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 610.509. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 55.396.617. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 19.741.233. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 13.092.624. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 62.045.226. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.966.288. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.323.293. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.910.724. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.378.857. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 26.307.897. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 25.666.810. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 10.555.377. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 41.419.331. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.633.489. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2.229.730. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 380.000. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 3.483.219. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 80.140.300. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.097.750. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 59.221. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 86.178.829. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 4.824.772. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.658.315. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.483.088. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 691.136. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 337.058. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.028.195. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 26.618.093. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 206.201. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 26.824.294. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 176.785. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 625.326. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 802.112. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 4.687.777. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 23.514. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 4.711.291. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 204.808. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 182.605. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 66.500. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 673.144. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.020.837. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.693.982. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.542.998. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2.219.836. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2.635.726. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 4.492.695. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 960.572. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.037.127. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 6.490.393. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 158.610.937. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 45.603.321. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 11.868.195. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 192.346.063. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 103.214.320. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 25.862.088. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.224.430. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 130.300.838. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 146.607. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 43.691. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 190.298. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.862.027. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.862.381. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 98.887. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 5.031. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 93.856. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.814.307. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 48.369. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 1.765.938. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 37.000. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 10.188.310. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 10.225.310. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 105.065.627. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 36.002.029. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 9.000.880. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 132.066.776. Claude 2026-10-07: tabla pro-forma con encabezados de varias líneas: el texto propio del PDF no la conserva; los importes de la columna Como 1907 cierran con su total impreso (55.396.617 / 158.610.937) y con el resultado (105.065.627)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Como/Como-fascicolo-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Como/Como-fascicolo-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Campionato | pág. 30, precedente |
| 2 | Percentuale squadra ospite | pág. 30, precedente |
| 3 | Tornei e amichevoli | pág. 30, precedente |
| 4 | b) abbonamenti | pág. 12, precedente |
| 5 | a) contributi in conto esercizio | pág. 12, precedente |
| 6 | b) sponsorizzazioni | pág. 12, precedente |
| 7 | c) proventi pubblicitari | pág. 12, Jev 1 |
| 8 | d) proventi commerciali e royalties | pág. 12, precedente |
| 9 | e) proventi da cessione diritti televisivi | pág. 12, precedente |
| 10 | f) ricavi cessione temporanea calciatori | pág. 12, precedente |
| 11 | g) plusvalenze cessione diritti prestazioni calciatori | pág. 12, precedente |
| 12 | h) altri proventi da gestione calciatori | pág. 12, precedente |
| 13 | i) altri ricavi e proventi diversi | pág. 12, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo | pág. 12, precedente |
| 2 | Costi per allenamenti e ritiri | pág. 31, precedente |
| 3 | Spese sanitarie | pág. 31, Jev 0.91 |
| 4 | Compensi lavoratori autonomi | pág. 31, precedente |
| 5 | Spese manutenzione campi sportivi | pág. 31, precedente |
| 6 | Diversi | pág. 31, precedente |
| 7 | Osservazione calciatori | pág. 31, Jev 0.91 |
| 8 | Costi accessori campagna trasferimenti | pág. 31, Jev 1 |
| 9 | Costi vitto, alloggio, locomozione | pág. 31, Jev 0.99 |
| 10 | Servizio biglietteria, controllo ingressi | pág. 31, Jev 1 |
| 11 | Assicurative e previdenziali | pág. 31, Jev 0.98 |
| 12 | Servizi da controllante e controllate dalla controllante | pág. 32, precedente |
| 13 | Omaggi, promozionali e rappresentanza | pág. 32, Jev 0.99 |
| 14 | Commissioni su fidejussioni | pág. 32, precedente |
| 15 | Consulenti esterni | pág. 32, Jev 0.93 |
| 16 | Rimborsi vari | pág. 32, precedente |
| 17 | Diversi | pág. 32, precedente |
| 18 | Utenze diverse | pág. 32, Claude 0.8 |
| 19 | Pubblicità | pág. 32, Jev 1 |
| 20 | Legali e notarili | pág. 32, Jev 1 |
| 21 | Spese bancarie | pág. 32, Jev 0.99 |
| 22 | Compenso collegio sindacale | pág. 32, Jev 0.99 |
| 23 | Manutenzioni ordinarie | pág. 32, Jev 0.96 |
| 24 | Postelegrafoniche | pág. 32, Jev 0.96 |
| 25 | Affitti passivi | pág. 32, Jev 0.96 |
| 26 | Affitto stadio Sinigaglia | pág. 32, precedente |
| 27 | Canoni leasing operativo | pág. 32, Jev 0.98 |
| 28 | Concessione impianti sportivi | pág. 32, precedente |
| 29 | Canoni noleggio | pág. 32, precedente |
| 30 | Salari e stipendi (Tesserati) | pág. 32, Jev 1 |
| 31 | Salari e stipendi (Altri) | pág. 32, Claude 0.8 |
| 32 | Oneri sociali (Tesserati) | pág. 32, Jev 0.98 |
| 33 | Oneri sociali (Altri) | pág. 32, precedente |
| 34 | Trattamento di fine rapporto (Tesserati) | pág. 32, Jev 0.96 |
| 35 | Trattamento di fine rapporto (Altri) | pág. 32, precedente |
| 36 | a) ammortamento delle immobilizzazioni immateriali | pág. 12, Claude 0.95 |
| 37 | b) ammortamento delle immobilizzazioni materiali | pág. 12, Jev 1 |
| 38 | c) altre svalutazioni delle immobilizzazioni | pág. 12, precedente |
| 39 | 12) Accantonamenti per rischi | pág. 12, Claude 0.85 |
| 40 | a) oneri da organizzazione competizioni | pág. 12, precedente |
| 41 | b) costi per acquisizione temporanea prestazione calciatori | pág. 12, precedente |
| 42 | c) minusvalenze cessione diritti prestaz.calciatori | pág. 12, precedente |
| 43 | d) altri oneri da gestione calciatori | pág. 12, precedente |
| 44 | - Spese, ammende e multe gare | pág. 33, Jev 0.98 |
| 45 | - Oneri tributari indiretti | pág. 33, Jev 0.99 |
| 46 | - Contributi Lega | pág. 33, Jev 0.91 |
| 47 | - Oneri precedenti esercizi | pág. 33, precedente |
| 48 | - Diversi | pág. 33, Jev 0.96 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (8.695). la sección D (rettifiche di valore) no se extrajo; mismo criterio que Milan 2023-24 y Bologna 2019-20 (D va al financiero)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
