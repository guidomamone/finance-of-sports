# heraclesalmelo-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/heraclesalmelo-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Heracles Almelo: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Heracles Almelo/Heracles-Jaarrekening-2024-2025.pdf. brandColor #000000
(procedencia en Admin/sourcing/Países Bajos/Heracles Almelo.md; tools/cargar-lote.mjs).
```

```text
data/nl/heraclesalmelo-nl-data.js — Stichting Heracles Almelo (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Heracles Almelo/Heracles-Jaarrekening-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "heraclesalmelo-nl" — slug de "Heracles Almelo" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Stichting Heracles Almelo" — respuesta de Guido en la cola (b545579)
  displayName        ok        "Heracles Almelo" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (112 de 113 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 35 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (112 de 113 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: el ejercicio 2025-06-30 se publicó solo c
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "heraclesalmelo-nl-heracles-jaarrekening-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Heracles Almelo"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"heraclesalmelo-nl-heracles-jaarrekening-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Heracles Almelo/Heracles-Jaarrekening-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Heracles Almelo/Heracles-Jaarrekening-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Seizoenkaarten | pág. 44, Jev 1 |
| 2 | Vriendschappelijke wedstrijden | pág. 44, Jev 1 |
| 3 | Competitie | pág. 44, Claude 0.85 |
| 4 | Beker | pág. 44, precedente |
| 5 | TV gelden | pág. 44, Jev 1 |
| 6 | Opbrengst loten | pág. 44, Jev 1 |
| 7 | Reclame (borden) | pág. 44, Jev 1 |
| 8 | Business seats | pág. 44, precedente |
| 9 | Business units en Skyboxen | pág. 44, precedente |
| 10 | Overige sponsoring | pág. 44, Jev 0.96 |
| 11 | Merchandising | pág. 44, Jev 0.99 |
| 12 | Diverse baten | pág. 45, Jev 0.99 |
| 13 | Solidariteitsbijdrage UEFA | pág. 45, precedente |
| 14 | Plaatsingspremie K.N.V.B. Beker | pág. 45, Jev 1 |
| 15 | Graspremie | pág. 45, precedente |
| 16 | Vergoedingen Eredivisie Media | pág. 45, Jev 1 |
| 17 | Heffing K.N.V.B. 2,5% | pág. 45, precedente |
| 18 | Horeca gelden | pág. 45, precedente |
| 19 | Huuropbrengsten | pág. 45, precedente |
| 20 | Project stimulatiefonds-jeugd | pág. 45, precedente |
| 21 | Sperwer/Plus | pág. 45, precedente |
| 22 | Basic-Fit Nederland B.V. | pág. 45, precedente |
| 23 | Van Iersel | pág. 45, precedente |
| 24 | Supportersverenigingen | pág. 45, precedente |
| 25 | Partygroep Twente B.V. | pág. 45, Jev 0.96 |
| 26 | Uptown Consultancy | pág. 45, precedente |
| 27 | Overige bedrijfsopbrengsten | pág. 19, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 45, Jev 0.97 |
| 2 | Sociale lasten | pág. 45, Jev 0.91 |
| 3 | Pensioenlasten | pág. 45, precedente |
| 4 | Overige personeelskosten | pág. 45, Jev 0.93 |
| 5 | Afschrijvingen op materiële vaste activa | pág. 19, Jev 1 |
| 6 | Gas, water en elektra | pág. 46, Jev 0.96 |
| 7 | Schoonmaakkosten | pág. 46, Jev 0.9 |
| 8 | Huur parkeerruimte | pág. 46, precedente |
| 9 | Onroerende zaakbelasting | pág. 46, Jev 0.99 |
| 10 | Onderhoud gebouwen | pág. 46, Jev 0.95 |
| 11 | Huur voetbalacademie | pág. 46, precedente |
| 12 | Veldonderhoud | pág. 46, precedente |
| 13 | Ledigen containers | pág. 46, Claude 0.8 |
| 14 | Onderhoud liften | pág. 46, Claude 0.8 |
| 15 | Overige huisvestingskosten | pág. 46, Jev 0.99 |
| 16 | Reis- en verblijfkosten | pág. 46, Jev 1 |
| 17 | Bewakingskosten | pág. 46, Jev 0.98 |
| 18 | Kleding en materialen | pág. 46, precedente |
| 19 | Kosten jeugdopleiding en scheidsrechters | pág. 46, Jev 0.91 |
| 20 | Medische begeleiding | pág. 46, precedente |
| 21 | Sfeeracties | pág. 46, precedente |
| 22 | Kosten Voetbalacademie | pág. 46, Jev 0.92 |
| 23 | Ontvangstkosten wedstrijden | pág. 46, Claude 0.8 |
| 24 | Vergoedingen stewards | pág. 46, Jev 1 |
| 25 | Schade en boetes | pág. 46, Jev 0.92 |
| 26 | Trainingskampkosten | pág. 46, Jev 0.99 |
| 27 | Overige | pág. 46, Jev 0.92 |
| 28 | Promotiekosten wedstrijden | pág. 46, precedente |
| 29 | Geluidsinstallatie | pág. 46, precedente |
| 30 | Consumenten verwervingskosten | pág. 47, precedente |
| 31 | Kosten businessclub | pág. 47, precedente |
| 32 | KNVB heffing | pág. 47, precedente |
| 33 | Inkoopkosten merchandise | pág. 47, Jev 0.92 |
| 34 | Business verwervingskosten | pág. 47, precedente |
| 35 | Overige verkoopkosten | pág. 47, precedente |
| 36 | Kosten Ticketing | pág. 47, precedente |
| 37 | Reclame- en advertentiekosten | pág. 47, Jev 0.99 |
| 38 | Communicatiekosten | pág. 47, Jev 1 |
| 39 | Specials | pág. 47, precedente |
| 40 | Dotatie voorziening dubieuze vorderingen op handelsdebiteuren | pág. 47, Jev 0.99 |
| 41 | Inkoopkosten horeca voetbalacademie | pág. 47, precedente |
| 42 | Kosten automatisering | pág. 47, Jev 0.99 |
| 43 | Porti | pág. 47, Claude 0.85 |
| 44 | Bank- en incassokosten | pág. 47, precedente |
| 45 | Telefoonkosten | pág. 47, Claude 0.85 |
| 46 | Kantoorbenodigdheden | pág. 47, Jev 1 |
| 47 | Advieskosten | pág. 47, Jev 0.99 |
| 48 | Kosten business bestuur | pág. 47, Jev 0.98 |
| 49 | Verzekeringskosten | pág. 47, Claude 0.85 |
| 50 | Representatiekosten | pág. 47, Jev 1 |
| 51 | Accountantskosten | pág. 47, Jev 0.93 |
| 52 | Scoutingskosten | pág. 47, precedente |
| 53 | Abonnementen en contributies | pág. 47, Jev 0.96 |
| 54 | Vrijval van kostenreserveringen | pág. 47, precedente |
| 55 | Administratiekosten | pág. 47, Jev 1 |
| 56 | Overige algemene kosten | pág. 47, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = consolidado. perimetro-senales.mjs: el ejercicio 2025-06-30 se publicó solo consolidado (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 4 ejercicio(s) con un solo perímetro (consolidado); 7 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Heracles Almelo".
```

## Fuentes

### heraclesalmelo-nl-heracles-jaarrekening-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Heracles Almelo/Heracles-Jaarrekening-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
