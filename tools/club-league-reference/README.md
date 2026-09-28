# tools/club-league-reference/ — arquitectura del to-do 95

**CORREGIDO 2026-09-28** (Guido, mirando https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League):
la evaluación original de esta sesión había mirado la página del CLUB (sin tabla temporada-por-
temporada para clubes chicos) y RSSSF (problemas de encoding, formato inconsistente entre países), y
concluyó que un scraper no alcanzaba. Estaba mirando las fuentes equivocadas: la página de la
TEMPORADA en Wikipedia (no la del club) tiene una tabla "Teams"/"Clubs" en wikitext estándar de
MediaWiki (`{| class="wikitable" ... |- ... | [[Club]] ...`), consistente entre países — probado
bajando el roster real de Colombia 2016 (20 equipos, incluido Boyacá Chicó) y Noruega 2019 (16
equipos, incluido Lillestrøm), con columnas distintas por liga pero el mismo patrón de tabla. Se
parsea con wikitext crudo de la API de Wikipedia (mecánico, no un LLM resumiendo — mismo criterio que
`tools/fetch-brand-color-reference.mjs`), no con HTML renderizado.

## El pipeline, 3 tools

1. **`tools/resolve-wikipedia-season-page.mjs "<liga>" <año>`** — busca en Wikipedia y lista
   candidatos de título exacto de la página de esa temporada (la convención de título varía por liga:
   "2016 Categoría Primera A season", "2019 Eliteserien", "2025–26 Premier League", sin fórmula
   única). NO elige solo el resultado #1: un nombre de liga ambiguo puede traer un torneo distinto
   con nombre parecido (ej. "Premier League" trae también la canadiense, la rusa, la israelí) —
   confirmar cuál es antes de bajarla.
2. **`tools/fetch-club-league-reference.mjs "<título exacto>" <leagueId> <año> --pais <iso2>`** — baja
   el wikitext de esa página, parsea la tabla de equipos, guarda el roster completo en
   `tools/club-league-reference/<iso2>.json`. Si no encuentra una tabla parseable, NO escribe nada
   (mejor fallar visible que guardar una lista incompleta). **LIMITACIÓN CONOCIDA, sin arreglar
   (to-do 104)**: toma la PRIMERA tabla wikitable de la sección "Teams", y no siempre es el roster
   completo — encontrado con Grecia ("2024–25 Super League Greece": la primera tabla ahí es un
   resumen de "Promoted from/Relegated from" de 2 equipos, no las 14 que juegan la liga) y con
   Argentina (algunas páginas de temporada no tienen sección "Teams" en absoluto, usan una
   plantilla `{{#invoke:Sports table}}`). Si el resultado trae menos equipos de los esperados,
   confirmar a mano contra el wikitext crudo en vez de confiar en el fetch.
3. **`tools/lookup-club-league.js "<club>" --pais <iso2>`** — busca por nombre (normalizado, como
   `lookup-brand-color.js`) contra los rosters ya cacheados. Si no hay coincidencia, lo anota en
   `misses.jsonl` y dice que hace falta bajar esa liga-temporada con el paso 2.

**Por qué por NOMBRE y no por `clubId`**: la mayoría de los clubes que esto tiene que cubrir todavía
no están onboardeados (están sourceados nomás — ver to-do 50, Boyacá Chicó), así que no tienen
`clubId` asignado. El roster cacheado guarda el nombre tal cual aparece en Wikipedia.

**Esto NO es fuente de verdad ni reemplaza la verificación.** `data/club-leagues/<iso2>.js` sigue
siendo a mano, con su nota de cómo se confirmó cada club-año (ver su propia cabecera) — este roster
es el punto de partida para no salir a buscar de nuevo una liga-temporada que ya se bajó, nada más.
Si hay dudas sobre un caso puntual (ej. un club que cambió de nombre entre temporadas, o el criterio
de "la categoría al cierre" cuando el ejercicio cruza dos torneos), se sigue confirmando a mano como
hoy.

## Formato de la caché

`tools/club-league-reference/<iso2>.json`:

```json
{
  "leagues": {
    "co-primeraa": {
      "2016": {
        "wikipediaPage": "2016 Categoría Primera A season",
        "lang": "en",
        "section": "Teams",
        "fetchedAt": "2026-09-28T...",
        "clubs": ["Alianza Petrolera", "Atlético Bucaramanga", "...", "Boyacá Chicó", "..."]
      }
    }
  }
}
```

## Estado actual

Poblado con 2 liga-temporada de prueba (Colombia Primera A 2016, Noruega Eliteserien 2019) — quedan
ahí porque están verificadas y no hace daño tenerlas. El resto se puebla con el uso real, liga-
temporada por liga-temporada, no con un barrido de una vez.
