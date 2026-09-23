# Belgrano (Córdoba)

- Memoria Anual 2019 (ejercicio calendario 2019) — https://www.belgranosocios.com/upload/11294686561451.pdf
  — narrativa (socios, filiales, deportivo, infraestructura) + sección "Económicos" con cifras
  resumidas (superávit, patrimonio neto, índice de liquidez), SIN estados contables línea por línea.
  Descargado en `Clubes/Argentina/Belgrano/memoria-anual-2019.pdf`.
- Memoria Anual 2020 — https://www.belgranosocios.com/upload/14733772026375.pdf — mismo formato.
  Descargado en `Clubes/Argentina/Belgrano/memoria-anual-2020.pdf`.
- **Revisados a fondo en la Versión 95: NINGUNO de los 2 tiene datos financieros cargables.** Son
  10 páginas cada uno, puramente narrativos (socios, filiales, deportivo) — ni una fila de Estado de
  Recursos y Gastos ni de Situación Patrimonial en ninguno de los dos (confirmado con OCR, no solo
  con el texto nativo). No se cargó nada al sitio para este club.
- Pendiente: 2021 a 2025 (todos existen y se aprueban en asamblea cada año — la de 2025 fue aprobada
  29/4/2026, superávit $1.222M según prensa del propio club) pero están detrás de login de socio en
  socios.belgrano.com.ar, sección "Transparencia" — no hay copia pública indexada de esos años a
  diferencia de 2019/2020, que quedaron sueltos en /upload/ de una época anterior a que el club
  migrara todo detrás de login.
- Contacto: Departamento de Socios On-Line, o directo por el panel socios.belgrano.com.ar (si Guido
  consigue acceso de socio, ahí están los años que faltan); contacto general vía belgrano.com.ar.

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

- **Resultado: 0 documentos nuevos, con 2 gotchas de tooling que conviene anotar.** (1) `belgrano.com.ar` devuelve **HTTP 403 a cualquier `curl`**, con o sin User-Agent de navegador y headers `Accept`/`Accept-Language` completos — hay que usar el Browser pane. (2) Su buscador interno (`/?s=balance`) devuelve **"Ha habido un error crítico en esta web"** (WordPress caído en esa ruta), así que la vía del `?s=` no sirve acá. Vía browser se leyó el post "Los socios/as aprobaron la Memoria y Balance 2025" (29/4/2026, Asamblea Ordinaria 2026, >1.000 socios, "crecimiento patrimonial histórico" en el año del 120° aniversario, presidente Luis Fabián Artime): **confirma que el ejercicio 2025 existe y está aprobado, pero no adjunta PDF ni cifra**. Wayback: 6 PDFs archivados en el dominio, ninguno financiero.
- Último chequeo: 2026-09-22.
