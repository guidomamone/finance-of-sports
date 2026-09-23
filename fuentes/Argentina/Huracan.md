# Huracán

- Sin PDFs oficiales encontrados. Sitio oficial: cahuracan.com (y subdominio admin.cahuracan.com).
  Solo publica comunicados narrativos de asamblea sin adjuntos — confirma que se aprobó Memoria y
  Balance 2022/23 y el presupuesto anual, pero sin link a documento.
- Pendiente: todos los ejercicios.
- Contacto: socios@cahuracan.com (Departamento de Socios), WhatsApp +54 9 11 5060-1908.

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

- **Resultado: 0 documentos.** El post "Comunicado Oficial: Asamblea General" (`cahuracan.com/noticias/comunicado-oficial-asamblea-general`) informa que se aprobó la memoria y balance por 40 votos sobre 53 asambleístas, sin adjuntar nada. Wayback: 0 PDFs archivados en todo el dominio. Ojo al buscar en prensa: hay varios "Club Huracán" homónimos en Argentina (San Antonio de Areco, Ingeniero White, Corrientes, Blanca Grande) cuyas asambleas ensucian cualquier búsqueda web — filtrar siempre por Parque Patricios/CABA.
- Último chequeo: 2026-09-22.
