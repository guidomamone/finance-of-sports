# Estados Unidos — la SEC, para los deportes que NO son fútbol

El dead-end de la MLS (`paises/CONCACAF.md`) es real pero es SOLO de la MLS. La regla que sí generaliza es la
misma que ya había aparecido en México con Ollamani/Club América: **si el dueño de un club es una
compañía que cotiza, la SEC la obliga a publicar estados auditados completos, gratis**. Confirmado
2026-09-13 para 3 clubes de 3 deportes: New York Knicks (NBA) y New York Rangers (NHL) vía Madison
Square Garden Sports Corp. (`MSGS`), y Atlanta Braves (MLB) vía Atlanta Braves Holdings (`BATRA`).

Procedimiento: `https://www.sec.gov/files/company_tickers.json` (padrón de emisores, sirve además
como descarte rápido) → `https://data.sec.gov/submissions/CIK<cik a 10 dígitos>.json` →
`https://www.sec.gov/Archives/edgar/data/<cik>/<accession sin guiones>/<primaryDocument>`.

**Dos ventajas y un gotcha:**
- Los documentos son **HTML con texto real**, no escaneos: cero OCR. El más barato de procesar de
  todos los canales del proyecto.
- El mismo canal sirve para clubes que no son de EE.UU.: Manchester United plc presenta un 20-F,
  así que es el único club inglés del proyecto que NO hay que OCRear.
- **Gotcha**: la SEC devuelve **HTTP 403** si el `User-Agent` no identifica a quien consulta. Un UA
  de navegador común NO alcanza (sí alcanza en Companies House); hay que mandar el formato que pide
  la SEC, `Nombre contacto@dominio`.

Problema recurrente de este canal, en los 3 casos: **el perímetro nunca es "un club"**. MSG Sports
mezcla dos clubes de dos deportes en un solo consolidado, Braves Holdings mezcla el club con un
desarrollo inmobiliario, Ollamani mezclaba el club con el estadio y con negocios que no son deporte.
Antes de cargar, mirar la nota de segmentos y decidir explícitamente qué perímetro se publica.
