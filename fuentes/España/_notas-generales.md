# Notas generales — España

Primer barrido de sourcing para España (sesión 2026-09-13). A diferencia de Sudamérica, España no
tiene un regulador único tipo CMF (Chile) o Supersociedades (Colombia) que centralice los balances
de todos los clubes — cada S.A.D. publica (o no) por su cuenta en su propio sitio, casi siempre bajo
el paraguas de una "Ley de Transparencia" (Ley 19/2013) que en la práctica muchos clubes cumplen de
forma voluntaria/parcial aunque no reciban subvención pública que los obligue.

- **LaLiga (laliga.com/en-GB/transparency/economic-management/annual-accounts) NO es un atajo tipo
  CMF para todos los clubes** — confirmado explícitamente esta sesión: esa página solo publica las
  cuentas anuales de LaLiga como organización (la Liga Nacional de Fútbol Profesional en sí), no de
  los clubes individuales. No perder tiempo ahí buscando un club específico.
- **Patrón de bloqueo anti-bot muy variado entre clubes**, tres sabores distintos encontrados:
  1. El HTML de la página se sirve pero sin contenido útil (JS-driven, sin datos en el HTML crudo) —
     Sevilla FC (transparencia), Betis (parcial), Alavés (en el primer intento, se destrabó en el
     segundo con mejor user-agent).
  2. El dominio entero devuelve 403 a cualquier fetch automatizado (WAF/Cloudflare) — Athletic Club
     (`athletic-club.eus`), aunque su CDN de archivos (`cdn.athletic-club.eus`) no tiene el mismo
     bloqueo.
  3. El dominio sirve el HTML normal pero bloquea la descarga directa del PDF específico —
     Villarreal CF (`villarrealcf.es/wp-content/uploads/...`), solucionado con Wayback Machine.
  - **Lección para la próxima sesión**: si un dominio de club da 403/vacío, probar (a) con
    `curl -A "Mozilla/5.0 ..."` con un user-agent de navegador completo antes de asumir bloqueo total
    (funcionó para destrabar Alavés), (b) buscar si el club usa un CDN/subdominio separado para
    archivos (`cdn.<club>.eus`, `cms.bkndagroup.com`, `mediaverse.<club>.hiway.media`, etc. — varios
    proveedores de CMS deportivo español parecen compartir patrón), y (c) Wayback Machine sobre la
    URL exacta del PDF si todo lo anterior falla.
- **`cms.bkndagroup.com`** apareció como backend de transparencia de Deportivo Alavés — vale la pena
  probarlo como sospechoso de primera si otro club chico de La Liga/Segunda da bloqueo similar en su
  dominio principal (parece un proveedor de CMS compartido, no exclusivo de un club).
- **archive.org estuvo "Temporarily Offline" varias veces durante esta sesión** (confirmado con la
  CDX API devolviendo la página de error del propio Internet Archive, no un 404 real) — no es un
  dead-end del club en cuestión, reintentar en una sesión futura antes de asumir que Wayback no tiene
  el snapshot. Afectó específicamente a Villarreal CF (ejercicio 2021-22, snapshot no confirmado
  todavía) y quedó sin intentar del todo para Sevilla FC (ejercicios 2018-19 a 2020-21) y Valencia CF
  (ejercicio 2018-19, dominio legado `seguro.valenciacf.com` ya caído).
- **Varios PDFs bajados son escaneos sin capa de texto** (ej. algunos de Real Betis, el más viejo de
  Celta) — confirmado con `pdffonts` (sin fuentes embebidas = imagen pura) antes de asumir que
  `pdftotext` simplemente no encontró texto por un bug. Estos van a necesitar el flujo de Tesseract
  documentado en `CLAUDE.md` cuando llegue la sesión de mapeo/transcripción.
- Candidato pendiente de explorar en una sesión futura (no estaba en la lista original de 10/11 pero
  surgió como mención en resultados de búsqueda): **Getafe CF, RCD Mallorca, RC Deportivo, SD
  Ponferradina, Real Zaragoza** — los 5 tienen página propia de "Ley de Transparencia" confirmada por
  búsqueda (mismo patrón que Betis/Alavés/Villarreal), sin explorar en profundidad todavía.

## Cómo mantener esta nota

Actualizar cuando un ángulo nuevo de nivel-país se confirme (un CMS compartido nuevo, un patrón de
bloqueo nuevo con su solución) — no hace falta una entrada por cada club individual, eso vive en
`fuentes/España/<Club>.md`.
