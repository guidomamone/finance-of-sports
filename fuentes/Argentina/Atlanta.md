# Atlanta

**Ángulos**: sitio oficial: agotado (4 ejercicios más — 2021-22, 2022-23, 2023-24 y 2024-25 — confirmados
por convocatoria/acta de asamblea vía wp-json, ninguno con PDF/Drive adjunto) · Wayback CDX: agotado
(0 snapshots de los 4 IDs de Drive revocados, ni un solo PDF de balance en 200+ PDFs archivados del
dominio) · búsqueda web: agotado (sin resultados nuevos) · regulador/país: no aplica (mención suelta a
"Resolución de la IGJ" en una convocatoria de 2013, no accionable) — 2026-09-26

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

## Chequeo 2026-09-26 — Drive sigue revocado, pero aparecieron 4 ejercicios más confirmados

- **Los 4 Drive del 2013-2016 siguen inaccesibles**: reintenté `drive.google.com/uc?export=download&id=<id>`
  para el de 2016 — mismo resultado que en septiembre, 942 KB de HTML "Google Drive: Sign-in", no el
  PDF. Wayback CDX consultado directo sobre cada uno de los 4 IDs de archivo
  (`http://web.archive.org/cdx/search/cdx?url=drive.google.com/file/d/<id>*`): **0 snapshots para los
  4**, o sea que archive.org nunca llegó a indexar el contenido real de esos Drive (ni siquiera cuando
  estaban públicos) — el ángulo de "Wayback sobre la URL de Drive" que pedía este barrido queda
  agotado sin resultado, no por falta de intentarlo.
- **Usando la wp-json real del sitio (`caatlanta.com.ar/wp-json/wp/v2/search`, que el chequeo de
  septiembre no había explotado) aparecieron 4 ejercicios más, todos confirmados por
  convocatoria + acta de asamblea, ninguno con documento descargable**:
  - Ejercicio 2021-2022: "Se aprobaron todos los puntos de la Asamblea de socios" (dic. 2022).
  - Ejercicio 2022-2023: "Asamblea ordinaria: por tercer año seguido, el balance de Atlanta finalizó
    con superávit" (ya conocido de la sesión anterior).
  - **Ejercicio 2023-2024**: convocatoria del 6/8/2024 (`institucionales/convocatoria-a-asamblea-ordinaria-2`)
    cita textual el punto del orden del día: *"Lectura y consideración de la Memoria, Balance General,
    Inventario y Cuenta de Ganancias y Pérdidas del ejercicio transcurrido entre 1 de julio de 2023 al
    30 de junio de 2024"* — o sea que el documento existe y se trató en asamblea, pero el post no
    adjunta nada.
  - **Ejercicio 2024-2025**: convocatoria del 27/11/2025 para la asamblea del 10/12/2025
    (`institucionales/convocatoria-a-asamblea-ordinaria-y-extraordinaria-2`), mismo texto de orden del
    día para el ejercicio 1° julio 2024 – 30 junio 2025. El post posterior
    ("Asamblea histórica: aprobación unánime para la construcción de la nueva tribuna Dorrego",
    10/12/2025) confirma que se aprobó ese ejercicio económico en la misma reunión — de nuevo, sin PDF
    ni Drive adjunto en el cuerpo del post.
  - Los 4 posts revisados letra por letra (HTML vía `wp-json/.../content.rendered`): 0 `href` a
    `.pdf`, 0 mención a `drive.google.com`.
- CDX del dominio completo `caatlanta.com.ar` con filtro `.pdf` (>200 resultados, colapsado por
  urlkey): además de las 16 "Revistas" históricas de 2009 ya conocidas, no aparece ningún archivo con
  nombre de balance/memoria/ejercicio.
- Búsqueda web dirigida: sin resultados con cifras o documentos nuevos.
- **Conclusión: sigue siendo candidato a mail (to-do 51), reforzado.** Ya no son solo los 4 balances
  de 2013-2016 con el compartir revocado — hay AL MENOS otros 2 ejercicios recientes (2023-24 y
  2024-25) confirmados por texto oficial del club como aprobados en asamblea, que nunca se publicaron
  en ningún formato digital. Pedirle al club que comparta cualquiera de los 6 ejercicios conocidos
  (2013 a 2025) es una sola gestión con alto valor esperado.
- Último chequeo: 2026-09-26.
