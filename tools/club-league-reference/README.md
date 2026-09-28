# tools/club-league-reference/ — arquitectura del to-do 95

**Evaluado 2026-09-28, antes de ejecutar nada** (Wikipedia, TheSportsDB, RSSSF): ninguna de las 3
fuentes candidatas tiene datos temporada-por-temporada lo bastante limpios y uniformes como para un
scraper masivo tipo "precargar todos los clubes de una liga" (el patrón que sí funciona en
`tools/brand-color-reference/`). Wikipedia no trae tabla estructurada para clubes chicos (prosa
suelta), TheSportsDB solo da la liga ACTUAL sin historial, y RSSSF tiene el dato pero con problemas
de encoding y formato inconsistente entre países — riesgo real de leer mal un carácter o una fila.
Detalle de la prueba (Boyacá Chicó, Colombia) en la sesión del 2026-09-28.

**Por eso esto NO es un scraper.** Es una caché de lo que YA se buscó y confirmó, para no repetir la
búsqueda — mismo objetivo que el to-do 95, con menos riesgo:

1. Onboarding de un club-año: si `tools/lookup-club-league.js <clubId> <año> --pais <iso2>` encuentra
   el dato en caché, lo usa como punto de partida (sigue habiendo que confirmarlo si hay dudas, no es
   fuente de verdad ciega).
2. Si no está en caché, se busca online como hoy (WebSearch/WebFetch contra Wikipedia/RSSSF/prensa),
   y una vez CONFIRMADO el dato se agrega en dos lugares:
   - Acá (`tools/club-league-reference/<iso2>.json`), sin nota — es solo un atajo para no repetir la
     búsqueda.
   - En `data/club-leagues/<iso2>.js`, CON la nota de cómo se confirmó (la convención real del
     archivo, ver su propia cabecera) — eso sigue siendo a mano, esto no lo reemplaza.
3. Con el tiempo, cada país acumula temporadas ya resueltas (sobre todo útil cuando dos clubes
   distintos del proyecto jugaron la MISMA liga-temporada: la segunda búsqueda ya sale gratis).

## Formato

`tools/club-league-reference/<iso2>.json`, mismo shape que el cuerpo de
`data/club-leagues/<iso2>.js` para poder copiar una entrada confirmada directo de acá para allá:

```json
{
  "boyacachico": { "2016": "co-primeraa", "2017": "co-primerab" }
}
```

## Estado actual

Vacío — a propósito. Se puebla la primera vez que un onboarding real busque un club-año de ese país
y lo confirme, no de una vez con un barrido.
