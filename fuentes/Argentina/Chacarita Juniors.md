# Chacarita Juniors

- Sin PDFs oficiales encontrados. Sitio oficial: chacaritajuniors.com.ar. Índice completo de Wayback
  Machine del dominio: 13 PDFs archivados, ninguno de balance/memoria (solo estatuto, protocolo
  anti-violencia de género y contenido no relacionado).
- Pendiente: todos los ejercicios.
- Contacto: socios@chacaritajuniors.org.ar, tel. +54 11 4553-0304 (sede Teodoro García 3550, CABA,
  L-V 14-20h), o Polideportivo Bahía Blanca 2681 San Andrés, tel. 11-2504-3533.
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

- **Resultado: 0 documentos, con un gotcha.** `chacaritajuniors.com.ar` devolvió **HTTP 429 (rate limit)** durante el barrido — o sea que el sitio existe y responde pero limita las peticiones seguidas; una sesión futura debería espaciar los requests en vez de asumir que está caído. Wayback: 13 PDFs archivados en el dominio, ninguno financiero.
- Último chequeo: 2026-09-22.
