# Godoy Cruz

**Ángulos**: sitio oficial: agotado (WordPress — `wp-json/wp/v2/media` y `search` probados con
balance/contable/legalizado/DPJ/ejercicio/estados, sin PDF financiero nuevo) · Wayback CDX: agotado
(el índice completo del dominio tiene un solo PDF financiero en toda su historia — el ya bajado) ·
búsqueda web: agotado (0 PDFs nuevos, pero CONFIRMA un ejercicio adicional que existe — ver Chequeo
2026-09-26) · regulador/país: no aplica — 2026-09-26

- Estados Contables Entidades Sin Fines de Lucro, Ejercicio cerrado 30/6/2020 —
  clubgodoycruz.com.ar/wp-content/uploads/2021/11/B-BALANCE-2020-LEGALIZADO-PARA-DPJ.pdf (dominio
  inalcanzable directo al momento de esta investigación, descargado vía Wayback Machine de la misma
  URL oficial). Documento real: 14 páginas, con legalización electrónica del Consejo Profesional de
  Ciencias Económicas de Mendoza en la portada (Legalización N° 2-27024-26993, contador Bermejillo
  Carlos Eduardo, matrícula 1-03477) — máxima garantía de autenticidad. Descargado en
  `Clubes/Argentina/Godoy Cruz/estados-contables-ejercicio-2019-20.pdf`. Las páginas 2-14 (donde
  están las cifras) son un escaneo SIN capa de texto — no se OCReó en esta sesión (solo
  descubrimiento de fuentes, no onboarding de datos), queda pendiente.
- Pendiente: OCR del documento ya bajado, y el Balance/Estados Contables de cualquier otro ejercicio
  (no se encontró ningún otro PDF financiero en el dominio — el índice completo de Wayback Machine
  del dominio solo tiene 5 PDFs en total, y este es el único financiero).
- Contacto: secretariaclub@clubgodoycruz.com.ar, tel. +54 261 424-5144.
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

- **Resultado: 0 documentos nuevos.** El único post institucional relevante es "Godoy Cruz realizó su Asamblea de Socios", sin adjunto. Wayback: 0 PDFs archivados en el dominio. Sigue en pie lo ya anotado: 1 balance escaneado descargado, pendiente de OCR.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — se buscaron los ejercicios que faltan (2021-2025), ninguno descargable, pero hay uno CONFIRMADO

Sesión de sourcing puro (5 clubes del interior, este es el único con al menos 1 documento ya
cargado). Tarea puntual: ver si hay más ejercicios además del único bajado (cierre 30/6/2020).

- `wp-json/wp/v2/media?search=<término>` sobre `clubgodoycruz.com.ar` (además del `search` de
  posts ya usado en la sesión anterior) probado con balance, contable, legalizado, DPJ, ejercicio,
  estados — 0 resultados en todos. La CDX API de Wayback sobre el dominio completo (repetida esta
  sesión) sigue devolviendo un solo PDF financiero en toda la historia del dominio: el mismo
  `B-BALANCE-2020-LEGALIZADO-PARA-DPJ.pdf` ya descargado.
- **Hallazgo de prensa: hay al menos un ejercicio más, confirmado, que el club SÍ trató y aprobó en
  asamblea pero nunca subió como PDF** — el patrón "legalizado para DPJ" del nombre del archivo 2020
  sugiere que el club legaliza sus balances ante la Dirección de Personas Jurídicas de Mendoza como
  procedimiento normal, así que es esperable que existan también en papel/trámite los ejercicios
  intermedios:
  - Ejercicio julio 2023-junio 2024: Asamblea Ordinaria de Socios en el estadio Feliciano Gambarte,
    Memoria y Balance aprobados por unanimidad, con superávit de $13.000 millones (ingresos
    $55.000M, egresos $42.000M) — Doble Amarilla,
    https://www.dobleamarilla.com.ar/liga-/en-el-gambarte--godoy-cruz-realizo-su-asamblea-ordinaria-con-memoria-y-balance-aprobados_a6771ceb7d508107902973d81.
  - No se encontró confirmación de prensa específica para los ejercicios 2021, 2022 y 2023 (jul-jun
    cada uno) en esta pasada — no se profundizó más porque ya alcanza con 1 ejercicio confirmado
    para justificar un pedido de "todos los que tengan disponibles" en vez de uno puntual.
- **0 PDFs nuevos encontrados** en ningún canal digital.
- **Candidato a mail** (ver `club-sourcing` 0.3): este es el candidato MÁS fuerte de los 5 clubes de
  esta sesión — el club YA publicó un balance en PDF una vez (2020, con legalización real del
  Consejo de Ciencias Económicas), así que pedirle que suba también 2021-2025 (o que comparta los
  que tenga) es un pedido de "hacé de nuevo lo que ya hiciste una vez", no algo nuevo para ellos.
  Decisión de Guido.
- Último chequeo: 2026-09-26.

## Color de marca (corregido 2026-09-26, ver `Admin/TODO.md` to-do 64)

- `data/clubs.js` tenía `brandColor:'#0000FF'` (azul saturado, hue ~240°) desde la barrida original de
  los 41 clubes — nunca se verificó contra el escudo real. Wikipedia (es/en) declara "Azul y blanco"
  sin más precisión, así que la capa de identidad no alcanzaba para descartar el error.
- Verificado en Browser pane 2026-09-26 contra el escudo real
  (`en.wikipedia.org/wiki/File:Godoy_Cruz_Antonio_Tomba.png`): el color dominante del escudo (muestreo
  de píxeles vía canvas, ~13.400 px de la muestra) es `rgb(0,112,208)` = `#0070D0`, un celeste/azul
  cielo saturado (hue ~205°), no el azul violáceo de `#0000FF`. Corregido a `brandColor:'#0070D0'`.
- Último chequeo: 2026-09-26.
