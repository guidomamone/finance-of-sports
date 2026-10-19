# fcgroningen-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fcgroningen-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FC Groningen: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2024-2025.pdf. brandColor #008E5A
(procedencia en Admin/sourcing/Países Bajos/FC Groningen.md; tools/cargar-lote.mjs).
```

```text
data/nl/fcgroningen-nl-data.js — FC Groningen B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fcgroningen-nl" — slug de "FC Groningen" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FC Groningen B.V." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): licenciatario/sociedad del fútbol; r
  displayName        ok        "FC Groningen" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): balans per 30 
  sport              ok        "futbol" — el .md nombra el fútbol 44 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): balans per 30 juni 2025 (temporada 2
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): b
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): La entidad que presenta es la holding FC Groningen Beheer B.V.; el fútbol e
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fcgroningen-nl-jaarverslag-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Groningen" = "FC Groningen"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fcgroningen-nl-jaarverslag-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdopbrengsten | pág. 57, Jev 0.98 |
| 2 | Sponsoring en reclame | pág. 57, Jev 1 |
| 3 | Mediarechten | pág. 57, Jev 1 |
| 4 | Merchandising | pág. 57, Jev 1 |
| 5 | Food & Beverage | pág. 57, Jev 0.97 |
| 6 | Uitkeringen | pág. 57, precedente |
| 7 | Overige baten | pág. 57, Jev 0.99 |
| 8 | Overige bedrijfsopbrengsten | pág. 36, Jev 1 |
| 9 | Netto ontvangen afkoopsommen | pág. 59, Claude 0.8 |
| 10 | Boekwaarde contracten spelers | pág. 59, precedente |
| 11 | Ontvangen/(betaalde) opleidingsvergoedingen | pág. 59, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inkoopwaarde van de omzet | pág. 36, Jev 0.97 |
| 2 | Contractspelers | pág. 58, Jev 0.99 |
| 3 | Overige spelers | pág. 58, precedente |
| 4 | Technische staf | pág. 58, Jev 0.99 |
| 5 | Medische staf | pág. 58, precedente |
| 6 | Scouting | pág. 58, Jev 0.97 |
| 7 | Overige staf voetbalorganisatie | pág. 58, precedente |
| 8 | Directie/management | pág. 58, Jev 0.99 |
| 9 | Commercie | pág. 58, precedente |
| 10 | Operationeel | pág. 58, precedente |
| 11 | Merchandise | pág. 58, precedente |
| 12 | Horeca | pág. 58, precedente |
| 13 | Gebouwen | pág. 58, Jev 1 |
| 14 | Andere vaste bedrijfsmiddelen | pág. 58, Jev 0.93 |
| 15 | Wedstrijdkosten | pág. 59, Jev 1 |
| 16 | Huisvestingskosten | pág. 59, precedente |
| 17 | Verkoopkosten | pág. 59, Jev 1 |
| 18 | Kosten merchandise | pág. 59, precedente |
| 19 | Kosten horeca | pág. 59, precedente |
| 20 | Algemene kosten | pág. 59, Jev 1 |
| 21 | Nagekomen baten en lasten | pág. 59, Jev 0.92 |
| 22 | Afschrijvingen vergoedingssommen | pág. 36, Jev 1 |
| 23 | Bijzondere waardeverminderingen | pág. 36, Jev 0.9 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-06-30. Revisión del alta (Claude, 2026-10-09): balans per 30 juni 2025 (temporada 2024-2025)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. La entidad que presenta es la holding FC Groningen Beheer B.V.; el fútbol está en la controlada FC Groningen B.V. (primer equipo, fichajes), más Euroborg Horeca B.V. (catering del estadio), Regionale voetbalopleiding Groningen B.V. (fútbol base) y Greenrock Holding B.V. (no se describe; minoritaria frente al resto). Hay cuenta de resultados consolidada (L1010) y enkelvoudige (cap. 10-12, índice L52-54). (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = player_sales. renglón de la nota 9.8 que arma el Resultaat vergoedingssommen (4.446.617): el valor en libros de los jugadores vendidos va dentro de la venta de jugadores, no como amortización (la amortización es otra fila, nota 9.7) (subagente Sonnet, revisado por Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Groningen" = "FC Groningen".
```

## Fuentes

### fcgroningen-nl-jaarverslag-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
