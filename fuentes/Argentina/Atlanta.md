# Atlanta

- **HALLAZGO PARCIAL 2026-09-22: el club TUVO 4 Memorias y Balances publicados (2013, 2014, 2015 y
  2016) y hoy están INACCESIBLES.** El sitio conserva 5 páginas dedicadas —
  `caatlanta.com.ar/memoria-y-balance-2013/`, `/memoria-y-balance-2014/`, `/memoria-y-balance-2015/`,
  `/memoria-balance-2016/` y `/institucionales/momoria-y-balance/` (sí, con la errata "momoria") —
  y cada una tiene un único link a un archivo de Google Drive con ID legado (formato `0B...`):
  - 2016 → `drive.google.com/file/d/0B0EKsg07_fg_ZDE3X1c0U1VQZms`
  - 2015 → `drive.google.com/file/d/0B6_cleodISkiMTFjMkNfUFI4aE0`
  - 2014 → `drive.google.com/file/d/0B6_cleodISkiS2lxYXBhY2doU0k`
  - 2013 → `drive.google.com/file/d/0B6_cleodISkiYVpGX0hNV1lRdWc` (el mismo que linkea la página
    `/institucionales/momoria-y-balance/`, o sea que esa página es un duplicado del 2013, no un 5° año)
  **Los 4 ya NO son públicos**: `drive.google.com/uc?export=download&id=<id>` devuelve HTTP 200 pero
  con ~942 KB de HTML cuyo `<title>` es "Google Drive: Sign-in", y abrir `/view` en un browser real
  redirige a `accounts.google.com`. No es un problema de método de descarga: la cuenta de Drive del
  club dejó de compartirlos. **Gotcha general que vale para cualquier club: un `curl` a Drive que
  devuelve 200 y ~940 KB es una página de login, no el PDF — siempre correr `file`/`pdfinfo` sobre lo
  descargado antes de darlo por bueno.**
  Pedirle al club que los vuelva a compartir es una acción concreta y barata (ver
  `Admin/dudas-por-club.md`).
- Nota propia del club ("institucionales/asamblea-de-socios-aprobo-memoria-y-balance-del-ultimo-periodo")
  confirma el MAYOR SUPERÁVIT DE LOS ÚLTIMOS 40 AÑOS ($81.000.000 histórico / $153.600.000 ajustado
  por inflación) aprobado en asamblea, con cifras reales citadas en el cuerpo de la noticia — pero
  sin ningún PDF ni Drive adjunto (revisado de nuevo el 2026-09-22: el único `.pdf` de la página es
  un informe de prensa del INDEC). Hay además un post
  "asamblea-ordinaria-por-tercer-ano-seguido-el-balance-de-atlanta-finalizo-con-superavit", también
  sin adjunto.
- Pendiente: el PDF real de cualquier ejercicio posterior a 2016. El índice de Wayback Machine del
  dominio tiene 40 PDFs archivados pero ninguno con nombre de balance/memoria/ejercicio.
- Contacto: sección Contacto en caatlanta.com.ar/contacto/, sede Humboldt 540, CABA (Socios, L-V
  10-21h).
- Último chequeo: 2026-09-22.
