# Defensores de Belgrano

- Sin PDFs oficiales encontrados. Sitio oficial: defeweb.com.ar, con sección "Socios" (cuotas,
  convocatorias a asamblea) y una sección "Institucional" — ninguna de las dos linkea el PDF del
  balance.
- Pendiente: todos los ejercicios.
- Contacto: info@defeweb.com.ar, tel./fax +54 11 4702-8967, Comodoro Rivadavia 1450, Núñez, CABA.
- Último chequeo: 2026-09-12.

## Chequeo 2026-09-22 — barrido automatizado, sin hallazgo

Se corrió el barrido de 4 pasos descrito en `_notas-generales.md` ("Metodología — barrido
automatizado 2026-09-22") sobre el dominio oficial de este club: (1) home + rutas institucionales
típicas + `?s=balance`/`?s=memoria+y+balance`/`?s=estados+contables`, (2) `wp-json/wp/v2/search`
con `balance`, `memoria y balance`, `contable` y `asamblea`, (3) `sitemap_index.xml`/`sitemap.xml`/
`wp-sitemap.xml`, (4) segundo nivel: abrir cada página cuyo slug contenga
balance/memoria/contable/ejercicio/asamblea/transparencia/gestión y buscar en su HTML `href`, `src`
y `data-src` a `.pdf`, Drive, `docs.google.com/viewer|gview`, Issuu, Scribd, Calaméo o Dropbox. Se
sumó el índice COMPLETO de PDFs del dominio en la CDX API de Wayback Machine
(`matchType=domain&filter=original:.*\.pdf`), que detecta archivos que nunca estuvieron linkeados
desde una página viva.

- **Resultado: 0 documentos.** El sitio tiene un post titulado "Memoria y Balance 2009-2010" (`defeweb.com.ar/meno0910/`) — se abrió: **no tiene ningún adjunto**, el contenido debe haberse perdido en alguna migración. Los posts de asamblea de 2024 y 2025 (`asamblea-general-ordinaria-2/`, `asamblea-general-ordinaria-2025/`) tampoco adjuntan nada. Wayback: 67 PDFs archivados en el dominio, revisados uno por uno — son gacetillas de partido, legajos de baby fútbol, historia y notas; **ninguno financiero**.
- Último chequeo: 2026-09-22.
