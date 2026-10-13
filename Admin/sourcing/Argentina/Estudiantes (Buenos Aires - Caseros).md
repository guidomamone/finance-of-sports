**Ángulos**: sitio oficial: agotado (sitio comprometido con spam, wp-json revisado con 4 términos
—`balance`/`memoria`/`estados contables`/`asamblea`—, las 2 convocatorias a asamblea encontradas
confirman Ejercicios 126 y 127 aprobados pero el texto no adjunta ni linkea ningún PDF) · Wayback
CDX: agotado (23 PDFs archivados en el dominio completo, revisados uno por uno: todas "Gacetillas de
Prensa" o convocatorias, ninguno es balance/memoria) · búsqueda web: agotado (`filetype:pdf` y
variantes solo devuelven resultados de Estudiantes de **La Plata**, por homonimia — nada de Caseros)
· regulador/país: no aplica (Argentina sin regulador documentado salvo IGJ, pago) · barrido: 1
(Sonnet) — 2026-09-26

# Estudiantes (Buenos Aires / Caseros)

- Sin PDFs oficiales encontrados. OJO club distinto de Estudiantes de La Plata (ya cargado en el
  sitio, ver Primera División arriba) — este es Club Atlético Estudiantes de Caseros. Sitio oficial:
  caestudiantes.com.ar — **el dominio aparece comprometido/hackeado**: al revisarlo en esta sesión
  mezclaba contenido real del club con decenas de posts de spam de casas de apuestas (Bet365, Bwin,
  Betway, etc.) con fecha del mismo día de esta investigación. El índice de Wayback Machine del
  dominio tiene 23 PDFs, todos "Gacetillas de Prensa" (comunicados) o una convocatoria a asamblea,
  ninguno con estados contables.
- Pendiente: todos los ejercicios. Ojo también con la seguridad del sitio antes de linkearlo desde
  cualquier lado.
- Contacto: portal socios.caestudiantes.com.ar, redes @caestudiantes (Instagram/Facebook/X).
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

## Chequeo 2026-09-26 — escalera completa (barrido 1, Sonnet), confirma dead-end de canal digital

Se corrió la escalera completa de `club-sourcing` 0.1 sobre este club:

- **Familia 1 (sitio oficial)**: `wp-json/wp/v2/search` con 4 términos (`balance`, `memoria`,
  `estados contables`, `asamblea`). Los únicos posts relevantes fueron 2 convocatorias a asamblea
  (id 16676, 30/05/2025; id 15792, 05/07/2024). Se leyó el texto completo de ambas: la primera pone
  en el orden del día "Aprobación de memoria, inventario, balance general, y recursos y gastos...
  Ejercicio Nº 127" (período 01-10-2023 al 30-09-2024); la segunda, "Ejercicio Nº 126" (período
  01-10-2022 al 30-09-2023). **Confirma que los ejercicios 126 y 127 existen y fueron tratados en
  asamblea**, pero el texto de la convocatoria no adjunta ni linkea ningún PDF (a diferencia del
  patrón de Gimnasia LP, acá no hay un post separado con el documento real).
- **Familia 3 (Wayback CDX, dominio completo)**: re-confirmado, mismos 23 PDFs ya documentados el
  2026-09-22 (gacetillas de prensa + 1 convocatoria + 1 comunicado), ninguno nuevo.
- **Familia 4 (búsqueda web dirigida)**: `"Estudiantes" Caseros "memoria y balance" OR "estados
  contables" filetype:pdf` y variantes devuelven exclusivamente documentos de **Estudiantes de La
  Plata** (homónimo ya cargado en el sitio) — 0 resultados propios de este club.
- **Conclusión**: documento CONFIRMADO que existe (ejercicios 126 y 127 nombrados explícitamente en
  las convocatorias) pero no descargable en ningún canal digital — candidato a mail (`club-outreach`,
  ver `Admin/dudas-por-club.md` si se agrega la pregunta), no dead-end sin señal. El sitio sigue
  comprometido con spam de apuestas — cuidado si se lo visita de nuevo.
- Último chequeo: 2026-09-26.
