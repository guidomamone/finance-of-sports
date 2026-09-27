# Central Norte (Salta)

**Ángulos**: sitio oficial: agotado (`centralnorteweb.com.ar` es un sitio estático de 2002 sin ningún
link de navegación, solo imágenes; `centralnorte.com.ar` es un WordPress prácticamente vacío — 1 sola
página, `wp-json/wp/v2/search` sin resultados para balance/memoria/asamblea/contable, y su propio menú
"NOTICIAS" apunta a un placeholder de Hostinger) · Wayback CDX: agotado (0 capturas de CUALQUIER tipo,
no solo PDF, en ninguno de los dos dominios) · búsqueda web: agotado, con hallazgo fuerte de prensa ·
regulador/país: no aplica en la práctica (la Subsecretaría de Inspección General de Personas
Jurídicas de Salta, el regulador provincial de asociaciones civiles, no tiene portal público de
consulta de balances — solo guía de trámites) · prensa: CONFIRMA que 4 balances (ejercicios
07/2020-06/2021 a 07/2023-06/2024) fueron aprobados en asamblea el 12/11/2025, tras una conciliación
ante ese mismo regulador · barrido: 2 (Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Dos dominios propios verificados: centralnorteweb.com.ar (solo
  publica el Estatuto) y centralnorte.com.ar (sitio nuevo, deportivo genérico, sin sección
  institucional). 0 PDFs archivados en Wayback Machine para ninguno de los dos. El Estatuto exige
  tratar Memoria/Inventario/Balance en asamblea ordinaria anual (primer trimestre tras el cierre de
  ejercicio, 30/6), pero no se publica el PDF.
- Pendiente: todos los ejercicios.
- Contacto: socios@centralnorte.com.ar, tel. +54 387 458-6400, Av. Entre Ríos 1498, Salta.
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

## Chequeo 2026-09-26 — escalera completa (barrido 2, Sonnet)

Se corrió la escalera completa de `club-sourcing` 0.1 sobre AMBOS dominios del club, no solo el
barrido mecánico del 2026-09-22:

- **Familia 1 (sitio oficial)**: `centralnorteweb.com.ar` es un sitio estático de 2002 ("Designed by
  Daniel M. Maza", sin ningún `<a href>` en el HTML — es una sola página de imágenes con marquees,
  sin ningún link a otra página ni al Estatuto que un chequeo anterior había mencionado).
  `centralnorte.com.ar` es un WordPress real pero casi vacío: el menú tiene ítems "DISCIPLINAS",
  "INSTITUCIONAL" y "Noticias" pero todos son anclas `href="#"` sin submenú cargado en el HTML
  estático, solo existe 1 página (id 7594) y `wp-json/wp/v2/search` devuelve `[]` para "balance",
  "memoria", "asamblea" y "contable" — no hay ni un solo post. El link "NOTICIAS" del propio sitio
  apunta a un dominio ajeno de Hostinger (`mediumblue-hamster-809679.hostingersite.com`), señal de
  que el sitio real de noticias/institucional del club ya no es este dominio sino Facebook/X
  (@CACNoficial).
- **Familia 3 (Wayback CDX, dominio completo, sin filtro de extensión)**: 0 capturas de cualquier
  tipo en `centralnorteweb.com.ar` Y en `centralnorte.com.ar` — ninguno de los dos dominios tiene
  jamás una captura archivada, no solo ausencia de PDFs (reintentar más adelante si el club recupera
  un dominio con contenido real).
- **Familia 4/5 (búsqueda web + prensa) — el hallazgo real de esta sesión**: una nota de
  Informate Salta ("Central Norte convocó a Asamblea General Ordinaria") y una de El Tribuno
  ("Central Norte apeló al orden institucional y 'la casa está en orden'") confirman que el
  12/11/2025 el club aprobó en asamblea **4 balances**, correspondientes a los ejercicios
  07/2020-06/2021, 07/2021-06/2022, 07/2022-06/2023 y 07/2023-06/2024, tras una **conciliación
  celebrada ante la Subsecretaría de Inspección General de Personas Jurídicas de Salta** (resuelta en
  reunión de Comisión Directiva del 9/10/2025). El artículo de Informate Salta aclara que "los socios
  pueden consultar los balances" físicamente en la sede (Av. Entre Ríos 1498, Salta) a partir del
  20/10, no que estén publicados digitalmente. Ninguna nota cita cifras concretas.
  Se buscó además si la Subsecretaría de Inspección General de Personas Jurídicas de Salta
  (`personasjuridicas.salta.gob.ar`) tiene un portal público de consulta de balances de asociaciones
  civiles: no lo tiene, es solo una guía de trámites (y su contenido meta parece un template
  reciclado del organismo homólogo de Córdoba) — confirma que la familia 2 no aplica en la práctica
  para este club, más allá de que el regulador provincial sí existe y sí intervino.
- **Conclusión — candidato a mail fuerte (0.3)**: 4 ejercicios completos, CONFIRMADOS por prensa y ya
  aprobados en asamblea, sin ningún canal digital. Es el caso más claro de los 4 clubes de esta
  sesión: pedirle al club (o a la Subsecretaría, si el club no responde) los 4 PDFs ya aprobados
  tiene alto valor esperado. Contacto ya documentado: socios@centralnorte.com.ar,
  +54 387 458-6400.
- Último chequeo: 2026-09-26.
