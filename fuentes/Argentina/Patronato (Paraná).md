# Patronato (Paraná)

**Ángulos**: sitio oficial: agotado (WordPress — `wp-json/wp/v2/search` probado con
balance/memoria/contable/asamblea, sin PDF financiero) · Wayback CDX: agotado (0 PDFs en el
dominio) · búsqueda web: agotado (0 PDFs, pero CONFIRMA que el documento existe — ver Chequeo
2026-09-26) · regulador/país: no aplica — 2026-09-26

- Sin PDFs de balance encontrados. Sitio oficial: capatronato.com.ar, con secciones "Institucional" y
  "Socios" reales (ambas revisadas) pero sin ningún balance/memoria en PDF linkeado. 0 PDFs
  archivados en Wayback Machine para el dominio.
- Pendiente: todos los ejercicios.
- Contacto: prensaclubpatronato@hotmail.com, tel. +54 343 424-3766, Padre Bartolomé Grella 874,
  Paraná (atención 8-21h).
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

## Chequeo 2026-09-26 — familia 4 (búsqueda web dirigida), documento CONFIRMADO, tratado dos veces en 2026

Sesión de sourcing puro (5 clubes del interior). Se repitió `wp-json/wp/v2/search` sobre
`capatronato.com.ar` con balance/memoria/contable/asamblea: sin resultados financieros (confirma lo
ya sabido). El aporte de esta sesión es prensa, que muestra que el club trata Memoria y Balance en
CADA asamblea reciente, siempre sin publicar el PDF:

- Asamblea de mayo 2026 (orden del día completo vía Análisis Digital,
  https://www.analisisdigital.com.ar/deportes/2026/05/28/cambios-en-el-estatuto-convenios-y-espectaculos-los-temas-que-tratara-patronato-en-asamblea):
  Asamblea General Ordinaria con "lectura y consideración de la Memoria y Balance del período
  comprendido entre el 1 de febrero de 2025 y el 31 de enero de 2026" (más una Extraordinaria el
  mismo día por convenio de gimnasio con SportClub y reforma de estatuto).
- Los socios aprobaron ese balance el 30 de mayo de 2026 (Mirador Provincial,
  https://www.miradorprovincial.com/2026/05/30/los-socios-de-patronato-aprobaron-todos-los-puntos-de-la-asamblea-extraordinaria/)
  — sin anexos ni documento descargable en la nota.
- Búsqueda anterior (WebSearch genérico) ya había encontrado más asambleas con Memoria y Balance en
  agenda para los ejercicios 2023-2024 y 2024-2025 (Análisis Digital, junio 2025) — o sea, al menos
  3 ejercicios distintos (2023-24, 2024-25, y el recién cerrado 2025-26) tienen Memoria y Balance
  confirmado por prensa, ninguno publicado como PDF.
- **0 PDFs encontrados** en ningún canal digital para ningún ejercicio.
- **Candidato a mail** (ver `club-sourcing` 0.3): el club tiene el hábito de tratar y aprobar el
  documento en asamblea todos los años y de comunicarlo a la prensa local — pedirle el PDF de
  cualquiera de los últimos 3 ejercicios confirmados es de bajo costo y alto valor esperado.
  Decisión de Guido.
- Último chequeo: 2026-09-26.
