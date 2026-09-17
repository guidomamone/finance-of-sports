# Napoli (SSC Napoli)

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Società Sportiva Calcio Napoli S.p.A., propiedad de Filmauro S.r.l. (familia De
  Laurentiis). No cotiza, pero publica una serie completa en su propio sitio bajo el mismo patrón de
  disclosure voluntario por licencia UEFA que el resto de la liga.
- **Canal**: `sscnapoli.it/en/balance/`, gratis, sin login. Los PDF históricos vivieron en TRES
  dominios/CDN distintos a lo largo de los años (ver gotcha abajo).

## Qué se bajó (sesión 2026-09-17)

**6 ejercicios, serie COMPLETA 2019/20-2024/25 sin huecos**, en `Clubes/Italia/Napoli/`:
`Napoli-bilancio-<ejercicio>.pdf` (usando el año de cierre, ej. `2020` = ejercicio 2019/20).

- **Gotcha central: el club migró de CDN dos veces, y los links viejos del propio sitio quedaron
  rotos** — `cdn.sscnapoli.iquii.info` (usado para 2019/20 y 2020/21) y `cdn-assets.sscnapoli.it`
  (usado para 2021/22) ya no resuelven o devuelven error del origen (`530`), aunque el sitio actual
  SIGUE LINKEANDO esas URLs muertas en su página `/en/balance/`. Los 3 ejercicios se recuperaron de
  Wayback Machine (snapshots de 2023) sin problema — mismo patrón que Inter (`static.inter.it`), así
  que un club que migra de CDN sin actualizar sus propios links viejos parece más común de lo
  esperado en Italia, vale la pena tenerlo presente para el resto del país.
- Los ejercicios 2022/23, 2023/24 y 2024/25 sí están en el CDN actual (`cdn.sscnapoli.it`) y
  descargaron directo sin intermediarios.

## Verificación hecha en esta sesión

6 PDF confirmados `PDF document` real (los 3 recuperados de Wayback también, `pdfinfo` sin errores),
entre 12,8 MB y 25,2 MB.

## Dudas / pendientes

Ninguna. Serie completa 2019/20-2024/25.

- Último chequeo: 2026-09-17.
