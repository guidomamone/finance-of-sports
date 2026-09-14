# Notas generales — Estados Unidos / Canadá (MLS)

## Metodología, sesión 2026-09-13 (sourcing CONCACAF)

Confirmado (no es solo un supuesto de partida): la MLS es legalmente una "single-entity league" —
Major League Soccer, L.L.C. es la única persona jurídica dueña de todos los equipos, sus nombres,
logos y los contratos de los jugadores; lo que la prensa llama "dueño" de un club (ej. Anschutz/AEG
en LA Galaxy, Kroenke en Colorado Rapids, etc.) es en rigor un accionista/operador de la LLC central,
no el dueño de una entidad separada con sus propios estados financieros. Como consecuencia:

- No existe, ni puede existir bajo esta estructura, un balance auditado "standalone" por club — los
  estados financieros que sí existen son consolidados a nivel de Major League Soccer, L.L.C., y la
  liga no los hace públicos (no es una entidad bursátil ni cotiza).
- Confirmado en SEC EDGAR: no hay filings de ningún club de MLS como entidad individual.
- La prensa de negocios (Forbes, Sportico) sí publica valuaciones ESTIMADAS por club todos los años —
  explícitamente descartado por las reglas de este proyecto como fuente (no es un documento oficial
  auditado, es una estimación de mercado hecha por un tercero).
- Esto aplica IGUAL a cualquier club de MLS (no solo LA Galaxy) y a cualquier club de la Canadian
  Premier League que en el futuro se investigue bajo el mismo paraguas de Canadá/USA — verificar caso
  por caso si la liga canadiense tiene la misma estructura de single-entity antes de asumirlo igual
  (no verificado en esta sesión, CPL es una liga separada de MLS).
- No vale la pena reintentar este ángulo salvo que la MLS cambie su estructura corporativa (viene
  discutiéndose en medios especializados como Conduct Detrimental si el single-entity debería
  eliminarse, pero es una discusión regulatoria/antitrust, no un cambio confirmado).
- Último chequeo: 2026-09-13.

---

## Actualización, sesión 2026-09-13 (sourcing multideporte): la SEC SÍ es un canal, para los deportes que no son fútbol

Lo de arriba sigue siendo cierto **para la MLS**, y por el motivo estructural que dice (single-entity).
Pero esa conclusión NO se puede extender a los deportes estadounidenses en general, que es justo el
supuesto que rompió esta sesión.

**La regla real es la misma que ya se había descubierto en México con Ollamani/Club América**: si el
dueño de un club es una compañía que cotiza, la SEC la obliga a publicar estados financieros
auditados completos, gratis y sin login. En EE.UU. eso alcanza hoy a por lo menos tres clubes de tres
deportes distintos:

| Club | Deporte | Liga | Compañía | Ticker | CIK |
|---|---|---|---|---|---|
| New York Knicks | Básquet | NBA | Madison Square Garden Sports Corp. | `MSGS` | 0001636519 |
| New York Rangers | Hockey sobre hielo | NHL | Madison Square Garden Sports Corp. | `MSGS` | 0001636519 |
| Atlanta Braves | Béisbol | MLB | Atlanta Braves Holdings, Inc. | `BATRA`/`BATRK` | 0001958140 |

Ver la ficha de cada uno para el detalle, las cifras ya verificadas y los problemas de perímetro.

### Procedimiento (confirmado funcionando con `curl`)

1. `https://www.sec.gov/files/company_tickers.json` — el padrón completo de emisores con ticker y
   CIK. Sirve además como método de DESCARTE rápido: si un club no aparece con ninguna compañía
   madre en ese archivo, no hay filings que buscar.
2. `https://data.sec.gov/submissions/CIK<cik a 10 dígitos>.json` — historial de presentaciones, con
   `form`, `filingDate`, `reportDate`, `accessionNumber` y `primaryDocument`.
3. El documento:
   `https://www.sec.gov/Archives/edgar/data/<cik>/<accessionNumber sin guiones>/<primaryDocument>`.
   Es **HTML con texto de verdad**, no un escaneo: se lee con cualquier parser, sin OCR. Pesa 2-4 MB.

**Gotcha que cuesta descubrir**: la SEC devuelve **HTTP 403** si el `User-Agent` no identifica a
quien consulta. Un User-Agent de navegador común NO alcanza (eso funciona en Companies House, acá no).
Hay que mandar el formato que pide la SEC, `Nombre contacto@dominio`.

**Nota sobre el `.gitignore`**: estos filings son HTML de varios MB, así que se agregaron
`Clubes/**/*.htm` y `Clubes/**/*.html` al `.gitignore`, con el mismo criterio que ya se usaba para
los PDFs (quedan locales; lo que se versiona es la transcripción). El patrón está limitado a
`Clubes/**` a propósito: `index.html` y `fuentes.html` viven en la raíz y sí son parte del sitio.

### Qué queda sin explorar en EE.UU.

- **Green Bay Packers (NFL)**: el único club de las 4 grandes ligas con accionariado público
  distribuido; publica un resumen financiero en su asamblea anual. NO presenta ante la SEC (está
  exento), así que el canal sería el sitio del club o la prensa de la asamblea — chequear si hay
  documento descargable o solo cifras citadas.
- Otras compañías bursátiles con una pata deportiva que habría que cruzar contra
  `company_tickers.json` antes de descartar: Rogers Communications (Toronto Blue Jays, MLB),
  Liberty Media (Fórmula 1 como negocio, no un equipo), TKO Group Holdings (UFC y WWE, que son
  promotoras, no clubes — probablemente fuera del esquema del sitio).
- Último chequeo de esta sección: 2026-09-13.
