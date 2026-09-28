# Miami Heat

**Ángulos**: sitio oficial: agotado (heat.com/nba.com sin transparencia financiera) ·
regulador/país: agotado — SEC vía Carnival Corp. descartado (solo related-party transactions, sin
estados financieros del club) · Wayback CDX: agotado (0 PDFs archivados en `heat.com`) · búsqueda
web: agotado, pero con un LEAD real (auditoría de gobierno) · barrido: 1 (Sonnet) — 2026-09-27

- **Deporte**: Básquet
- **Liga / competencia**: NBA (Estados Unidos)
- **Entidad legal**: **Miami Heat Limited Partnership (MHLP)** — dueña del club, cuyo general
  partner es FBA II, Inc. (controlada indirectamente por Micky Arison). El Kaseya Center (ex American
  Airlines Arena, ex FTX Arena) lo opera **Basketball Properties, Ltd. (BPL)**, cuyo general partner
  es Basketball Properties, Inc. (también de Arison). Ninguna de las dos es una entidad que cotiza ni
  presenta ante la SEC — son sociedades privadas de la familia Arison.

## Por qué la SEC NO es un canal acá (a diferencia de Knicks/Rangers/Braves)

Micky Arison también es Chairman de **Carnival Corporation & plc** (NYSE `CCL`, LSE) — la diferencia
clave con MSG Sports y Atlanta Braves Holdings es que ahí la COMPAÑÍA QUE COTIZA es la dueña del
club. Acá es al revés: Arison es dueño personal del Heat (vía MHLP/BPL) y por separado preside
Carnival, que no tiene ninguna participación societaria en el equipo. Confirmado en los proxy
statements de Carnival (DEF 14A, sección "Related Person Transactions"): ahí BPL y MHLP aparecen solo
como contraparte de acuerdos de auspicio/publicidad entre Carnival y el Heat (ej. cartelería en el
Kaseya Center), nunca con estados financieros propios. Tampoco aparece "Basketball Properties" ni
"Miami Heat" como emisor en el padrón completo de la SEC (`company_tickers.json`) — confirmado por
búsqueda directa.

## El hallazgo real: una auditoría del Inspector General de Miami-Dade (no es el balance del club, pero es un documento público real)

Esto no es un balance auditado del club — es un documento de un organismo de control del condado, con
información financiera real y verificable:

- **"OIG Audit of the Agreements Between Miami-Dade County and Basketball Properties, Ltd., et al.,
  to Operate the American Airlines Arena"** — Ref. IG11-34, emitido el 31/5/2012 por la Miami-Dade
  Office of the Inspector General.
  URL exacta: `https://www.miamidadeig.org/resources-oig/pdf/Reports2012/IG11.34FinalBasketball.pdf`
  (listado también en `https://www.miamidadeig.org/inspector-general/audits.page`).
- **Contenido verificado** (se bajó el PDF y se leyó completo con `pdftotext`; tiene capa de texto
  real, sin necesidad de OCR): documenta el contrato de 1997 entre el condado y BPL — el condado puso
  cerca de USD 200 millones (terreno de USD 37,6 M + subsidios de USD 72,2 M) para construir la
  arena, a cambio de que BPL comparta el 40% de la "Arena Distributable Net Cash Flow" que exceda
  USD 14 millones anuales. La auditoría confirma que **en ningún año, desde la apertura de la arena,
  el condado recibió un solo dólar de ese revenue-share**, pese a que la arena "genera revenues de
  más de USD 60 millones al año" (cita textual del reporte). También menciona pasivos de BPL con
  partes relacionadas que ameritaban más atención del condado.
- **Por qué esto NO reemplaza a un balance**: es un reporte de auditoría sobre el CUMPLIMIENTO
  CONTRACTUAL de la operación de la arena (ingresos y gastos "de Arena", tal como los define el
  contrato de 1997 para el cálculo del profit-share) — no un estado contable del club en el formato
  que usa el resto del proyecto (no tiene balance/resultado completo, ni ejercicios comparables entre
  sí, ni fue pensado para uso público más allá de la rendición de cuentas del condado). Sirve como
  CONFIRMACIÓN de que existe alguna base financiera pública (>USD 60 M/año de "Arena Revenues", que
  además mezcla al Heat con conciertos y otros eventos del Kaseya Center) pero no como fuente cargable
  al sitio con el criterio actual.
- **Prensa que sigue el mismo hilo** (confirma que el problema de disclosure es estructural, no un
  hueco de búsqueda): Miami New Times documentó en varias notas (2011-2012) que el condado nunca
  recibió el revenue-share prometido, y que una investigación posterior del mismo Inspector General
  encontró que BPL le debía entre USD 3 y 4 millones al condado por incumplimientos — de nuevo, son
  cifras de la ARENA, no del club.
- **No se revisó el listado completo** de `miamidadeig.org/inspector-general/audits.page` en esta
  sesión (solo se filtró por "arena"/"heat"/"basketball" en los links) — queda pendiente confirmar si
  hay una auditoría de seguimiento posterior a 2012 con cifras más actualizadas.

## Otros ángulos agotados

- **Sitio oficial**: `heat.com`/`nba.com/heat` sin ninguna sección de transparencia financiera —
  mismo patrón que el resto de la NBA (no hay obligación de disclosure a nivel liga).
- **Wayback CDX, dominio completo `heat.com`**: 0 PDFs archivados nunca — señal fuerte de ausencia
  total en ese canal.
- **SEC EDGAR**: descartado como canal directo (ver arriba) — ni "Heat" ni "Basketball" ni "Arison"
  aparecen como emisores relevantes en `company_tickers.json`.

## Pendiente / próximo paso si se retoma

- Leer el listado COMPLETO de `miamidadeig.org/inspector-general/audits.page` (no solo filtrado por
  palabra clave) por si hay una auditoría de seguimiento posterior a 2012 con cifras más actualizadas
  o más desagregadas.
- Evaluar si vale la pena un pedido de registro público (public records request, Florida Sunshine
  Law) directo al condado por los "annual budgets"/"financial reports" de BPL que la propia auditoría
  dice que el condado SÍ recibe (aunque no los revisa bien) — eso sería una gestión de Guido, no una
  tarea de sourcing (mismo criterio que River/IGJ en Argentina).

- Último chequeo: 2026-09-27.
