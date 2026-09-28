# Golden State Warriors

**Ángulos**: sitio oficial: agotado (warriors.com sin sección de transparencia financiera) ·
regulador/país: agotado — SEC, no hay filer propio ni compañía madre que cotice con participación
societaria en el club (las menciones en 10-Ks ajenos son solo biográficas) · Wayback CDX: agotado
(dominio `warriors.com`/`cdn.warriors.com`, sin PDFs financieros) · búsqueda web: agotado (solo
confirma financiamiento 100% privado del Chase Center) · barrido: 1 (Sonnet) — 2026-09-27

- **Deporte**: Básquet
- **Liga / competencia**: NBA (Estados Unidos)
- **Entidad legal**: **Golden State Warriors, LLC** — privada. Vendida en 2010 por el grupo de Chris
  Cohan a un consorcio liderado por **Joe Lacob** y **Peter Guber** (co-executive chairmen) por
  ~USD 450 millones; Forbes la valuó en USD 8.800 millones en 2025.

## Por qué la SEC no es un canal

Ni "Golden State Warriors" ni "Golden State Warriors, LLC" aparecen como emisor en
`company_tickers.json`. La búsqueda de texto completo de EDGAR (`efts.sec.gov`) de "Golden State
Warriors" filtrada a 10-K devuelve 67 resultados — se revisó el patrón general y se abrió el más
representativo: el 10-K 2013 de **Mandalay Digital Group, Inc.** (hoy Digital Turbine, CIK
0000317788), donde la única mención es la bio de Peter Guber como director: *"Mr. Guber is the
Owner and Co-executive Chairman of the NBA franchise, the Golden State Warriors."* Es texto
biográfico, sin ninguna cifra del club. Ninguna compañía que cotiza tiene participación societaria
en el equipo (a diferencia de MSG Sports Corp. con Knicks/Rangers o Atlanta Braves Holdings) — mismo
patrón de "el dueño preside una empresa que cotiza, pero la empresa no es dueña del club" ya
documentado en `fuentes/Estados Unidos/Miami Heat.md` (Arison/Carnival) y `fuentes/Estados
Unidos/Dallas Mavericks.md` (Adelson/Las Vegas Sands).

## Chase Center: financiado 100% en forma privada, sin bono municipal que abra un canal

A diferencia de Sacramento (Golden 1 Center, ver `fuentes/Estados Unidos/Sacramento Kings.md`) o
Miami (Kaseya Center), el **Chase Center** (San Francisco, inaugurado 2019, costo ~USD 1.400-1.600
millones) se construyó **sin ningún aporte público ni bono municipal** — confirmado en múltiples
notas de prensa (Washington Post, Forbes, Field of Schemes, 2017-2019): la franquicia compró el
terreno y financió la construcción en su totalidad (naming rights de Chase por ~USD 300 millones a
20 años, más ~USD 2.000 millones recaudados en entradas/suites/sponsors anticipados). La única
contribución pública documentada es de infraestructura de transporte (extensión de una línea de
light-rail, ~USD 62 millones, de los cuales los Warriors pusieron USD 19 millones) — no hay ningún
bono respaldado por el club ni por la arena que amerite un "Annual Continuing Disclosure Report"
como el que sí existe para el Golden 1 Center de Sacramento. Esto descarta de entrada el único ángulo
que dio algo de señal real en este mismo piloto (ver Sacramento Kings).

## Otros ángulos agotados

- **Sitio oficial** (`warriors.com`): sin ninguna sección de transparencia financiera, "annual
  report", "investor" ni "ownership" — confirmado con un scrape completo de la home vía Firecrawl
  (sin necesidad de reintento con `stealth`, cargó bien al primer intento).
- **Wayback CDX, dominio completo `warriors.com` + `cdn.warriors.com`**: los PDFs archivados son
  guías de medios (media guide), paquetes de pruebas abiertas (tryouts), calendarios de TV, y un
  **"GSW Chase Center Economic Impact Assessment"** (`cdn.warriors.com/cc_5year/...`) — un estudio de
  impacto económico regional encargado por el propio club, no un estado contable. Mismo tipo de
  documento que el reporte de impacto económico que también existe para Golden 1 Center/Kings:
  confirma actividad económica agregada, no reemplaza un balance.
- **Búsqueda web dirigida**: solo confirma el financiamiento privado del Chase Center y valuaciones
  de Forbes (estimaciones de mercado de un tercero, ya descartadas como fuente por el criterio del
  proyecto, sección 0 de `club-sourcing`).

## Conclusión

Dead-end estructural: propiedad 100% privada (Lacob/Guber y una treintena de socios limitados), sin
ninguna compañía que cotiza con participación societaria en el club, y sin bono público que abra un
canal de disclosure alternativo (a diferencia de Sacramento). No hay balance del club en ningún canal
público verificado.

## Pendiente / próximo paso si se retoma

- Si en el futuro el ownership group cambia (venta parcial a un fondo o compañía que cotiza), volver
  a revisar el padrón de la SEC.
- El "GSW Chase Center Economic Impact Assessment" queda identificado pero no descargado: es un
  estudio de impacto económico, no un estado contable — mismo criterio de descarte que ya aplica a
  los reportes de impacto económico de Golden 1 Center/Kings.

- Último chequeo: 2026-09-27.
