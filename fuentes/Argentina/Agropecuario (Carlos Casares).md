# Agropecuario (Carlos Casares)

- Sin PDFs oficiales encontrados. Sitio oficial: clubagropecuario.com — mismo template genérico que
  Godoy Cruz/Chacarita/Deportivo Madryn (solo fútbol: jugadores, calendario, historia, estadio), sin
  ninguna sección institucional, de socios ni de transparencia. Club joven (fundado 2011 por el
  empresario Bernardo Grobocopatel), con una base de socios muy chica según Wikipedia (50 personas al
  momento de la fundación) — la estructura de gobierno tipo asociación civil con asamblea tradicional
  puede no aplicar de la misma forma que en los clubes centenarios del lote.
- Pendiente: todos los ejercicios (si es que se producen/publican).
- Contacto: sección Contactos en clubagropecuario.com/contactos/, X @Agropecuario_Of, Chacabuco 206,
  Carlos Casares.
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

- **Resultado: 0 documentos.** Ni el sitio vivo ni el índice de Wayback Machine del dominio tienen un PDF, Drive o visor embebido con balance/memoria/estados contables.
- Último chequeo: 2026-09-22.
