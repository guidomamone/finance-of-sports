# Napoli (SSC Napoli)

**Ángulos**: sitio oficial: agotado (`/en/balance/`, 2020-2025) · Wayback CDX: agotado (`sscnapoli.it/shared/UserFiles/file/Bilancio_30_*`) · búsqueda web: Exa · regulador/país: no aplica · barrido: 3 (Sonnet) — 2026-10-07

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

- **Color de marca**: `#00ABE7` (celeste) — "maglia azzurra" (it.wikipedia, Società_Sportiva_Calcio_Napoli); hex de footylogos. Elegido por Claude (Guido delega el color, 2026-10-06), verificado 2026-10-06.

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2025 desde `Clubes/Italia/Napoli/Napoli-bilancio-2025.pdf` (sourceId `napoli-it-bilancio-2025`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2024 desde `Clubes/Italia/Napoli/Napoli-bilancio-2024.pdf` (sourceId `napoli-it-bilancio-2024`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2023 desde `Clubes/Italia/Napoli/Napoli-bilancio-2023.pdf` (sourceId `napoli-it-bilancio-2023`).

## Sesión de sourcing Italia sección 1 (2026-10-07): +2 ejercicios (2018, 2019), total 8

De Wayback (el sitio viejo `sscnapoli.it/shared/UserFiles/`, snapshots de 2022-04-19), PDFs completos y **escaneados (sin capa de texto)**: `https://www.sscnapoli.it/shared/UserFiles/file/Bilancio_30_Giugno_2018/SSCN%20bilancio%20PDF%2030%2006%202018.pdf` (60 págs, 12,3 MB) -> `Napoli-bilancio-2018.pdf`; `https://www.sscnapoli.it/shared/UserFiles/file/Bilancio_30_giugno_2019/Bilancio_al_30.06.2019.pdf` (60 págs, 12,5 MB) -> `Napoli-bilancio-2019.pdf`. El OCR de la pág. 2 confirma "Bilancio al 30 giugno 2018/2019". La CDX de dominio no lista nada anterior a 2018. 2025/26: Napoli publica en enero-marzo del año siguiente.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2021 desde `Clubes/Italia/Napoli/Napoli-bilancio-2021.pdf` (sourceId `napoli-it-bilancio-2021`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2022 desde `Clubes/Italia/Napoli/Napoli-bilancio-2022.pdf` (sourceId `napoli-it-bilancio-2022`).
