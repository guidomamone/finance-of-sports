# Vegas Golden Knights

**Ángulos**: sitio oficial: agotado (`nhl.com/goldenknights` y `vegasgoldenknights.com` sin
transparencia financiera) · regulador/país: agotado — Black Knight Sports & Entertainment (el dueño)
no tiene ningún registro en la SEC (ni en la búsqueda de compañías de EDGAR ni en full text search de
Form D); MGM Resorts (socio del venue) y Cannae Holdings (Bill Foley es su Vice Chairman)
descartados como canal, ninguno declara participación en el club · Wayback CDX: agotado
(`vegasgoldenknights.com` solo trae mapas de asientos/guías de abonados; `nhl.com/goldenknights` 0
PDFs archivados nunca) · búsqueda web: agotado (solo confirma estructura de propiedad, sin cifras) ·
barrido: 1 (Sonnet) — 2026-09-27

- **Deporte**: Hockey sobre hielo
- **Liga / competencia**: NHL (Estados Unidos)
- **Entidad legal**: **Black Knight Sports & Entertainment LLC** — privada, liderada por **Bill
  Foley** (mayoritario), con **Adrienne Maloof** (familia Maloof) como socia minoritaria. Juega en el
  T-Mobile Arena, operado por una joint venture privada entre **MGM Resorts International** y
  **AEG** (no una entidad municipal).

## SEC: tres ángulos probados, los tres cerrados

1. **Black Knight Sports & Entertainment como emisor propio**: no aparece en
   `company_tickers.json`; la búsqueda de compañías de EDGAR
   (`browse-edgar?action=getcompany&company=black+knight+sports`) no devuelve ningún resultado; la
   búsqueda de texto completo de "Black Knight Sports" filtrada a Form D (colocaciones privadas
   exentas, que a veces sí registran entidades 100% privadas) da **0 resultados**. Es una entidad sin
   ningún rastro en la SEC, ni siquiera un Form D.
2. **MGM Resorts International** (`MGM`, CIK 0000789570) — socio del venue (T-Mobile Arena, JV con
   AEG). Se bajó el **10-K FY2025 completo** vía Firecrawl
   (`sec.gov/Archives/edgar/data/789570/000078957026000018/mgm-20251231.htm`, ~474.000 caracteres de
   markdown) y se buscó "Golden Knight", "VGK", "hockey" y "NHL": **cero menciones** en las cuatro.
   La idea —repetida en varios sitios de terceros/wikis— de que MGM tiene una participación
   societaria directa en el club no está confirmada en su 10-K más reciente: o nunca fue así, o dejó
   de ser materialmente relevante para requerir disclosure.
3. **Cannae Holdings, Inc.** (`CNNE`, CIK 0001704720) — Bill Foley es su Vice Chairman. Se bajó el
   **10-K FY2025 completo** vía Firecrawl (~432.000 caracteres de markdown) y se confirmó que Cannae
   sí tiene un segmento reportable ligado a Foley, pero es **"Black Knight Football" (BKFC)** — 44,7%
   de participación, dueña de clubes de FÚTBOL (AFC Bournemouth de la Premier League inglesa,
   Moreirense de Portugal, y otros) — una entidad DISTINTA de "Black Knight Sports & Entertainment"
   (la dueña de los Golden Knights). Vale la pena dejarlo anotado para no confundir las dos entidades
   de Foley en una sesión futura: **BKFC = fútbol** (cotiza indirectamente vía Cannae), **BKSE =
   hockey** (100% privada, sin ningún vínculo con Cannae según este 10-K).

## Por qué el venue tampoco abre un canal (a diferencia de Sacramento)

El T-Mobile Arena se financió como una joint venture privada, aproximadamente 50/50 entre MGM
Resorts y AEG (~USD 375 millones), sin bono municipal de por medio — a diferencia del Golden 1
Center de Sacramento (ver `fuentes/Estados Unidos/Sacramento Kings.md`), no hay una autoridad pública
emisora de bonos cuyo disclosure obligue a reportar los pagos de alquiler del club. Esto cierra el
único ángulo que dio algo de señal real en este mismo piloto.

## Otros ángulos agotados

- **Sitio oficial**: `nhl.com/goldenknights` (dominio compartido de toda la NHL) y
  `vegasgoldenknights.com` sin ninguna sección de transparencia financiera — confirmado con un scrape
  de ambas homes vía Firecrawl.
- **Wayback CDX**: `vegasgoldenknights.com` (dominio completo) solo trae 2 PDFs archivados, ambos de
  venta de entradas (mapa de precios de asientos 2018-19, guía de Flash Seats para abonados);
  `nhl.com/goldenknights` (prefix) da **0 PDFs archivados nunca** — señal fuerte de ausencia total en
  ese canal.
- **Búsqueda web dirigida**: solo confirma la estructura de propiedad (Foley/Black Knight Sports &
  Entertainment, Maloof como socia minoritaria), sin ninguna cifra financiera del club.

## Conclusión

Dead-end estructural, el más cerrado de los tres equipos de este piloto: propiedad 100% privada sin
ningún registro en la SEC (ni siquiera un Form D), sin ningún socio que cotice con participación
confirmada en el club, y sin bono público en el venue que abra un canal alternativo. No hay balance
del club en ningún canal público verificado.

## Pendiente / próximo paso si se retoma

- Si Bill Foley en algún momento fusiona o vincula Black Knight Sports & Entertainment con Cannae
  Holdings (como sí hizo con el fútbol vía BKFC), volver a revisar el 10-K de Cannae.
- No hay canal de país/regulador adicional aplicable — Nevada no exige disclosure público de LLCs
  privadas.

- Último chequeo: 2026-09-27.
