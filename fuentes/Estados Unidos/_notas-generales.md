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

---

## Sesión 2026-10-03 (sourcing Norteamérica): un canal nuevo para clubes chicos, y qué NO sirvió

### Canal nuevo: Form C-AR de Regulation Crowdfunding (clubes que levantaron capital de hinchas)

Un club que vendió participaciones a sus hinchas por crowdfunding (Regulation CF, plataformas tipo Wefunder o
StartEngine) está obligado a presentar en EDGAR un **Form C** al levantar y un **Form C-AR anual** después, con estados
financieros (sin auditar y autocertificados, o revisados/auditados según el monto levantado). Es gratis, es PDF
con texto y alcanza a cualquier deporte y a clubes que NO son de MLS ni de las 4 ligas grandes. Encontrados:
**Detroit City FC** (5 C-AR, FY2021-FY2025) y **Oakland Ballers** (béisbol, 3 ejercicios); ver sus fichas.
Cómo se busca: búsqueda de texto completo de EDGAR,
`https://efts.sec.gov/LATEST/search-index?q="football club"&forms=C-AR` (con el `User-Agent` de la SEC), y después
`data.sec.gov/submissions/CIK<cik>.json` para la lista de filings y `.../<accession>/index.json` para el nombre del
archivo. **Límite**: la búsqueda de texto completo tiene mucho ruido (la mayoría de los hits son empresas sin relación
con deportes) y solo indexa algunos documentos; probar nombres propios de clubes da más que buscar por palabras
genéricas. Sin resultado para Sacramento Republic (solo Form D de 2013), Louisville City, Hartford Athletic, North Carolina FC ni
Oakland Roots. Pendiente (no se hizo): recorrer más nombres de clubes USL/NISA/ligas menores que hayan hecho crowdfunding.

### Liberty Media (tracking stock): la etapa "Braves Group" de Atlanta Braves
Hasta jul-2023 el club estaba dentro de Liberty Media Corp (CIK 1560385) como "Braves Group"; los 10-K de Liberty
de FY2019 y FY2022 (bajados) cubren 2017-2022. Liberty también es la controlante de Formula One (otro tracking stock, "Formula One Group"):
es una organización de la competencia, no un equipo, y los equipos de F1 ya están en `fuentes/Inglaterra/`; no se bajó nada de F1.
**TKO Group (UFC/WWE) y Endeavor**: son promotoras/agencias, no clubes; no se exploraron. Decisión de Guido si el sitio las quiere.

### Green Bay Packers: reintento sin resultado (ver su ficha)
FY2023-FY2026 siguen sin PDF; la prensa del club repite cifras sin enlazar el documento.

### Lo que sigue pendiente de lo pedido para EE.UU.
- Deuda pública en EMMA (bonos municipales de estadios/arenas) de franquicias de NBA/NFL/MLB/NHL: **no se hizo en esta sesión**; la sesión anterior ya cubrió
  Sacramento Kings (Golden 1 Center) y Vegas, Chicago, Boston, Golden State y Dallas dieron todos privados sin bonos públicos.
- Canadá: ver `fuentes/Canadá/_notas-generales.md`.

## Pendientes (venían del TODO)

- (ex to-do 127, 2026-10-03) SOURCING EE.UU. Y MÉXICO, LO QUE QUEDÓ (misma sesión). (a) Reg CF / Form C-AR en EDGAR es un canal nuevo para clubes chicos (Detroit City FC 5 ejercicios, Oakland Ballers 3): faltan nombres de clubes USL/NISA/ligas menores y de otros deportes que hayan hecho crowdfunding; (b) Packers FY2023-FY2026 siguen sin PDF (pedir a `shareholderservices@packers.com` o probar `materials.proxyvote.com`); (c) deuda municipal en EMMA de arenas/estadios de NBA/NFL/MLB/NHL no se hizo en esta sesión; (d) Liberty Media: bajados los 10-K FY2019 y FY2022 con el "Braves Group" pero sin leer qué tablas traen; (g) pasó al TODO, to-do 144.
