# Deportivo Morón

**Ángulos**: sitio oficial: agotado (menú completo + wp-json, sin PDF; sitio con errores 520
intermitentes) · Wayback CDX: agotado (0 PDFs de balance en todo el dominio) · búsqueda web: agotado
(sin confirmación de existencia reciente) · regulador/país: no aplica — 2026-09-26

- Sin PDFs de balance encontrados. Sitio oficial: deportivomoron.com.ar, con sección
  "Institucional" real (noticias sobre obras del predio, sistema de socios) y sección "Socios", pero
  los únicos PDFs publicados (confirmado con el índice completo de Wayback Machine, 4 archivos) son
  Estatuto Social y Reglamento de Comicios, Reglamento de Prensa 2025 y Reglamento del Tribunal de
  Disciplina — ninguno es memoria/balance. El Estatuto exige tratar Memoria y Balance en asamblea
  cada noviembre, pero no se publica el PDF.
- Pendiente: todos los ejercicios.
- Contacto: tel. (11) 6643-4007, formulario en deportivomoron.com.ar/contacto/.
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

## Chequeo 2026-09-26 — familia 4 (búsqueda web dirigida), sigue sin señal de existencia reciente

Sourcing puro, sesión dedicada a 5 clubes tradicionales. Se corrió `filetype:pdf` + "Deportivo Morón"
+ balance/estados contables/memoria y balance (sin resultados del club, solo de otras entidades), y
búsquedas dirigidas por asamblea/superávit/déficit reciente. El `wp-json/wp/v2/search?search=balance`
del sitio devolvió vacío (`[]`), y `search=asamblea` dio error 520 de Cloudflare (el sitio tiene caídas
intermitentes, ya notado en sesiones previas). Se reconfirmó el CDX completo del dominio
(`matchType=domain&filter=original:.*\.pdf`): 4 PDFs en total, el mismo Estatuto/Reglamentos ya
conocidos más un PDF nuevo de 2026 sobre el predio Nolo Aguirre (obras de infraestructura, no es un
estado contable).

- **A diferencia de Lanús y Tigre, acá NO apareció ninguna nota de prensa ni noticia propia con
  cifras concretas de una asamblea reciente** — el hallazgo más cercano fue una asamblea de 2013
  (memoria y balance 2009-10 y 2010-11), sin nada posterior indexado. El Estatuto exige tratar
  Memoria y Balance cada noviembre, así que el documento probablemente se sigue produciendo, pero no
  hay ninguna confirmación pública reciente de su contenido (a diferencia de Independiente/Lanús/
  Tigre, donde prensa o el propio club citan cifras).
- **Resultado: sin PDF nuevo. Escalera completa (1, 3, 4) agotada; familia 2 no aplica.**
- **No se eleva a candidato a mail** con la evidencia de hoy — no hay confirmación de existencia
  reciente que justifique pedirle al club un documento puntual (distinto del caso Lanús/Tigre). Si
  en una sesión futura aparece una nota de prensa o noticia propia citando la asamblea de noviembre
  con cifras, reconsiderar.
- Último chequeo: 2026-09-26.
