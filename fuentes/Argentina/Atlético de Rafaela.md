# Atlético de Rafaela

**Ángulos**: sitio oficial: agotado (6 posts de asamblea/convocatoria 2023-2026 revisados
individualmente vía `wp-json/wp/v2/posts` — contenido completo, no solo el HTML renderizado — más
`wp-json/wp/v2/search` con 5 términos y `wp-json/wp/v2/media` con 4 términos, ninguno con PDF/Drive
adjunto; páginas "Socios y servicios", "socios" y "Autoridades" revisadas, sin links de documento;
listado completo de las 25 páginas del sitio revisado, sin ninguna de transparencia/institucional) ·
Wayback CDX: agotado (4 PDFs archivados en todo el dominio, ninguno financiero: 3 copias de un mismo
PDF de referencias del autódromo 2019-2022 y 1 PDF de bases de una promo 2010) · búsqueda web:
agotado (sin PDF ni portal municipal/provincial con el documento) · regulador/país: no aplica ·
barrido: 1 (Haiku+Sonnet) — 2026-09-26

- Sin PDFs de balance encontrados, pese a que SÍ existe cobertura con cifras reales de MÚLTIPLES
  ejercicios consecutivos (ver Chequeo 2026-09-26 para el detalle completo: 2022, 2023, 2024 y 2025).
  Sitio oficial: atleticorafaela.com.ar, con sección "Socios y servicios" e "Institucionales",
  ninguna con el documento. 0 PDFs financieros archivados en Wayback Machine para el dominio.
- Pendiente: el PDF real del balance (cifras solo confirmadas por cobertura propia del club, no por
  un documento descargable — no califica como fuente primaria bajo el criterio de este barrido).
- Contacto: sección Institucionales/Socios de atleticorafaela.com.ar; info@atleticorafaela.com.ar /
  +54 3492 50-6075.
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

## Chequeo 2026-09-26 — barrido 1 (Haiku+Sonnet), verificación + ampliación

Un subagente Haiku encontró la señal fuerte de este club: convocatorias a asamblea con cifras
concretas para 2 ejercicios (2022: superávit $138.042.365; 2023: superávit $296.698.476,80), sin PDF
adjunto ni linkeado. Esta sesión (Sonnet) verificó ese hallazgo y lo amplió a 4 ejercicios
consecutivos, leyendo el contenido completo (`content.rendered`, vía `wp-json/wp/v2/posts?slug=...`,
no solo el resumen HTML) de los 3 posts de asamblea con aprobación de balance más el post de
convocatoria más reciente:

- **Ejercicio cerrado 31/12/2022** (asamblea 28/4/2023, 264 socios): Memoria y Balance aprobados,
  **superávit $138.042.365,00**. Coincide con el reporte de Haiku.
- **Ejercicio cerrado 31/12/2023** (asamblea 30/4/2024, 150 socios): Memoria y Balance aprobados,
  **superávit $296.698.476,80**. Coincide con el reporte de Haiku. El mismo post confirma el
  crecimiento de socios: 3.755 (31/12/2022) → 5.133 (31/12/2023) → 5.634 (a la fecha del post).
- **Ejercicio cerrado 31/12/2024**: no tiene post de aprobación propio indexado por `wp-json/wp/v2/
  search` (sí hay un post "Se realiza la Asamblea General Ordinaria" del 14/4/2025 que la convoca,
  sin cifras), pero el post de 2026 (ver debajo) lo cita retroactivamente: **déficit
  $891.866.564,20** — dato NUEVO que Haiku no reportó.
- **Ejercicio cerrado 31/12/2025** (asamblea 30/4/2026, 106 socios): Memoria y Balance aprobados,
  **déficit $32.008.145,71** — dato NUEVO que Haiku no reportó, y el más reciente disponible. El
  mismo post confirma una reforma al Estatuto Social "disponible para los Socios en la Secretaría
  Administrativa «Julio Litvak»" — o sea que ni el estatuto reformado se publica digitalmente.

**Verificación adicional de ausencia de PDF** (más a fondo que lo que reportó Haiku):
- Los 6 posts de asamblea/convocatoria 2023-2026 no tienen ningún `href`/`src` a `.pdf`, Drive,
  Dropbox, Issuu, Scribd ni Calaméo (`grep` sobre el HTML crudo de cada uno).
- `wp-json/wp/v2/media?search=<balance|memoria|contable|estatuto>`: 0 resultados — no hay ningún
  archivo con esos términos en la biblioteca de medios de WordPress, ni siquiera sin linkear desde un
  post.
- Las páginas "Socios y servicios", "socios" y "Autoridades" no tienen links de documento.
- CDX de Wayback reconfirmado por `curl` directo: 4 filas totales, que son 2 PDFs DISTINTOS con
  varias capturas cada uno (coincide con el "2 PDFs archivados" del chequeo 2026-09-22, contando por
  archivo en vez de por captura) — ninguno financiero: 3 capturas (2019-2022) del mismo PDF de
  referencias del autódromo de TC, y 1 captura de 2010 de las bases de una promo. Ninguna truncada a
  1 MiB (tamaños entre 22 KB y 744 KB), así que el gotcha de capturas truncadas de la sección 0.1 no
  aplica acá.
- Búsqueda web dirigida (`filetype:pdf`, portal municipal/provincial): sin resultados.

**Clasificación (criterio 0.3): candidato a mail (to-do 51), señal FUERTE.** No es un ejercicio
aislado: son 4 ejercicios consecutivos (2022-2025) con Memoria y Balance formalmente aprobados en
asamblea, con cifras exactas citadas por el propio club en su sitio, y el club tiene sección de
"Socios y servicios" activa donde publicar el documento sería trivial. Coincide en punto y forma con
el caso de Independiente (Ejercicio N°121) que cita el skill como ejemplo de "documento confirmado
que existe pero no descargable". Guido decide y aprueba el envío vía `club-outreach`.

- Último chequeo: 2026-09-26.
