# Atlético de Rafaela

- Sin PDFs de balance encontrados, pese a que SÍ existe cobertura con cifras reales: nota propia del
  club/prensa local confirma que la Asamblea Anual Ordinaria (30/4/2026, 106 socios presentes)
  aprobó por unanimidad la Memoria y el Balance General del ejercicio cerrado 31/12/2025 — DÉFICIT
  real de $(32.008.145,71), una recuperación fuerte contra el déficit del ejercicio anterior de
  $(891.866.564,20) — pero se revisó el artículo institucional completo
  (atleticorafaela.com.ar/2026/05/04/la-asamblea-anual-ordinaria-aprobo-todos-los-puntos-del-orden-
  del-dia-2/) y NO tiene ningún PDF ni link a Drive/Dropbox adjunto, solo texto. Sitio oficial:
  atleticorafaela.com.ar, con sección "Socios y servicios" e "Institucionales", ninguna con el
  documento. 0 PDFs archivados en Wayback Machine para el dominio.
- Pendiente: el PDF real del balance (cifras arriba solo confirmadas por cobertura propia del club,
  no por un documento descargable — no califica como fuente primaria bajo el criterio de este
  barrido).
- Contacto: sección Institucionales/Socios de atleticorafaela.com.ar.
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

- **Resultado: 0 documentos.** El club SÍ cubre sus asambleas en el sitio (posts de 2023, 2024, 2025 y 2026: "La Asamblea Anual Ordinaria aprobó todos los puntos del Orden del Día", "Se realiza la Asamblea General Ordinaria") pero ninguno adjunta PDF ni Drive. Wayback: solo 2 PDFs archivados en todo el dominio, ninguno financiero. Sigue valiendo lo ya anotado: cifras confirmadas por prensa, documento no publicado.
- Último chequeo: 2026-09-22.
