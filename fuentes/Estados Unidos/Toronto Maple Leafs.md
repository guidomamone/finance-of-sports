# Toronto Maple Leafs

**Ángulos**: sitio oficial: agotado (mapleleafs.com/nhl.com/mlse.com sin ninguna sección de
transparencia financiera) · regulador/país: parcial — SEC vía Rogers Communications 40-F (documento
real, mismo bundle de MLSE ya documentado en `Toronto Raptors.md`, sin desagregar por equipo) ·
Wayback CDX: agotado (147 PDFs en el dominio `mapleleafs.com`, ninguno financiero) · búsqueda web:
agotado (solo estimaciones de terceros tipo CNBC/Statista/Sportico) · barrido: 1 (Sonnet) —
2026-09-27

- **Deporte**: Hockey sobre hielo
- **Liga / competencia**: NHL (Canadá)
- **Entidad legal**: **Maple Leaf Sports & Entertainment Ltd. (MLSE)** — la misma sociedad privada
  canadiense dueña de Toronto Raptors (NBA), Toronto FC (MLS) y Toronto Argonauts (CFL). Ver
  `fuentes/Estados Unidos/Toronto Raptors.md` para el desarrollo completo de la estructura societaria
  (no se repite acá) — es idéntica para los Maple Leafs.
- **Canal real encontrado**: el mismo 40-F de Rogers Communications Inc. (NYSE/TSX `RCI`, CIK
  0000733099) ya analizado para los Raptors — Nota 20 (antes de julio 2025, equity method) y el
  consolidado desde jul-2025 dentro del segmento "Media". Ningún cuadro desagrega Maple Leafs de los
  otros 3 equipos + arena.

## Mismo problema de perímetro que los Raptors — no se repite el análisis completo

Ya está hecho en `fuentes/Estados Unidos/Toronto Raptors.md`: MLSE mezcla 4 equipos de 4 ligas
(incluidos los Maple Leafs) + el Scotiabank Arena + participaciones en Live Nation Ontario Concerts y
York Bremner Developments, todo dentro del segmento "Media" de Rogers. Las cifras ya extraídas ahí
(Revenue CAD 2.837 M / Net income CAD 118 M de MLSE completo, ejercicio a jun-2025; ~CAD 0,6 mil M de
revenue pro forma jul-dic 2025 post-consolidación) aplican igual acá: son de MLSE entero, no de los
Maple Leafs solos. No hay ningún nivel adicional de desagregación por equipo en el 40-F que distinga a
los Leafs del resto.

## Ángulos propios chequeados en esta sesión (específicos de Maple Leafs, no heredados de Raptors)

- **Sitio oficial**: `mapleleafs.com` no resultó alcanzable desde este entorno (falló dos veces vía
  Firecrawl —`ERR_TUNNEL_CONNECTION_FAILED`— y un `curl` directo dio "Connection refused"/"No route to
  host" en las dos IPs que resuelve el dominio). El sitio real vigente redirige a `nhl.com/mapleleafs`
  (confirmado navegando con el Browser pane): pura cobertura deportiva (noticias, video, calendario,
  roster) — sin ninguna sección de transparencia financiera, mismo patrón que el resto de la NBA/NHL.
- **Wayback CDX, dominio completo `mapleleafs.com`**: 147 PDFs archivados, ninguno financiero — son
  guías/reportes de prospectos de hockey ("prospect_report", "rock_report"), records históricos,
  invitaciones a eventos comunitarios, mapas de estacionamiento. Filtrado también por palabras clave
  (`financ`, `annual`, `report`, `budget`, `statement`, `revenue`, `audit`, `fiscal`): nada financiero
  real.
- **Búsqueda web dirigida**: solo estimaciones de terceros (CNBC/Statista/Sportico/Forbes) —
  valuación 2025-26 de USD 4.300-4.400 M (la franquicia más valiosa de la NHL), revenue estimado
  ~USD 382 M y operating income ~USD 127-181 M según el año. Explícitamente descartadas como fuente
  por el criterio del proyecto (no son estados financieros auditados).

## Conclusión

Mismo dead-end estructural que Toronto Raptors: no existe ningún documento público que muestre el
resultado de los Maple Leafs como franquicia aislada. Lo más cerca es el revenue consolidado de MLSE
completo (4 equipos + arena) vía el 40-F de Rogers, que ya está documentado en `Toronto Raptors.md` y
no se vuelve a bajar ni transcribir acá para no duplicar.

## Pendiente / próximo paso si se retoma

Igual que Raptors: revisar el 40-F del ejercicio 2026 (se presentaría en marzo 2027) por si la nota de
intangibles empieza a desagregar el "franchise right" por equipo, y por si el cierre de la compra del
25% de Kilmer Sports (anunciado 2026-07-06) trae algún cambio de disclosure.

- Último chequeo: 2026-09-27.
