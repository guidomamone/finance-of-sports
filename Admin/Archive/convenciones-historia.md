> **ARCHIVADO el 2026-10-04 (Versión 477).** Dos textos de `Admin/CONVENCIONES.md` que ya no mandan: la regla de la Versión 49
> (reemplazada por la 189, que está en `Admin/CONVENCIONES-DATOS.md`) y el párrafo de `netlify.toml`, que repite el de `CLAUDE.md`.

- REGLA HISTÓRICA (Versión 49, pedido explícito de Guido en su momento, VIGENTE HASTA LA VERSIÓN
  189 — se deja escrita porque explica por qué la fila se llamó "Estadio: recaudación de partidos"
  durante 140 versiones): "Estadio" y "Abonos" en Formato
  Simplificado son 2 conceptos DISTINTOS de venta de acceso al estadio, no un mismo concepto
  repartido en 2 filas. "Estadio: recaudación de partidos" = entradas que el club vende PARTIDO POR
  PARTIDO (Boca: `r.exhibicionEspectaculos`; River/Racing: categoría `matchday_competition`).
  "Abonos" (ahora sin la palabra "Entradas" adelante, la tenía antes y generaba la confusión de que
  había entradas repartidas entre las 2 filas) = abonos/season tickets pagados por adelantado para
  TODA la temporada (Boca: `r.abonos`; River/Racing: categoría `season_tickets`). Renombrado en
  `simplifiedReportForBoca()` y `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` (mismo valor, solo cambió el
  label). Detalle completo en `.claude/skills/club-data-mapping/SKILL.md` sección 13 y en
  `Admin/finance-of-sports-project.md`.
**YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY lo interno: la carpeta `Admin/` entera, `CLAUDE.md`, las 1122 notas de `fuentes/**/*.md`, `auditorias/` y `Prototyping/`. O sea: todo se trackea —el respaldo en GitHub está completo— y lo interno no se publica. Las 169 páginas `fuentes/<clubId>.html` SÍ se publican, son parte del sitio. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba. **Si dejás un archivo nuevo en el repo, va adentro de `Admin/` si es interno (no hace falta tocar este archivo); si lo dejás suelto en la raíz, se publica.**
