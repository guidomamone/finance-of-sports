# San Miguel

**Ángulos**: sitio oficial: agotado (sitio WordPress completo revisado, sin sección institucional) ·
Wayback CDX: agotado (0 PDFs en el dominio principal ni en el portal de socios) · regulador/país: no
aplica · búsqueda web: no intentado esta sesión (sin señal que lo amerite) · barrido: 1
(Haiku+Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clubatleticosanmiguel.com.ar (WordPress con tema
  Elementor: Noticias/Historia/Comisión Directiva/Palmarés/Estadio/Cuerpo técnico/Jugadores/
  Inferiores/Clasificación/Calendario/Fotos/Sponsors/Contactos — sin sección institucional ni de
  transparencia). Portal de socios aparte, en `socios.clubatleticosanmiguel.com` (SIN `.ar`, dominio
  distinto): confirmado como CRM de gestión de cuotas con login/registro (`registro.php`) y donación
  (`colabora.php`), no un repositorio de documentos.
- Pendiente: todos los ejercicios.
- Contacto: sede Ángel D'Elía 1360, San Miguel, tel. 4664-4609 / 4667-8244; estadio José L. Suárez
  2828, Los Polvorines, tel. 4660-1523.
- Último chequeo: 2026-09-26.

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

- **Resultado: 0 documentos.** La home de `clubatleticosanmiguel.com` devuelve 1.861 bytes — prácticamente vacía, sin navegación. Wayback: 0 PDFs archivados.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — barrido 1 (Haiku descubrimiento + Sonnet verificación)

Haiku encontró el dominio oficial y señaló el probable portal de socios con login, "sin evidencia
pública" en ninguno de los dos. Esta sesión (Sonnet) confirmó y a la vez corrigió un dato importante
que el chequeo del 2026-09-22 había dejado mal registrado.

- **CORRECCIÓN al chequeo anterior: el sitio NO está "prácticamente vacío".** El chequeo del
  2026-09-22 registró que la home devolvía 1.861 bytes. Esta sesión confirmó que hoy la home devuelve
  ~160 KB, con un sitio WordPress/Elementor completo y activo (noticias de partidos recientes,
  plantel, comisión directiva, etc.) — probablemente el club rehizo el sitio entre sesiones, o el
  chequeo anterior pegó en un momento de caída/redirect. El menú completo se revisó de punta a punta:
  Noticias, Historia, Comisión Directiva, Palmarés, Estadio, Cuerpo Técnico, Jugadores, Inferiores,
  Clasificación, Calendario, Fotos, Sponsors, Contactos — CERO sección institucional, de transparencia
  o de socios con documentos. `wp-json/wp/v2/search` con `balance`/`memoria y balance`/`contable`/
  `asamblea`/`estatuto`/`transparencia`: 0 resultados para los 6 términos.
- **CDX de dominio completo, re-confirmado**: `clubatleticosanmiguel.com.ar` tiene 870 capturas
  totales en Wayback (no 0, hay historial real del sitio desde 2019), pero 0 son `.pdf`.
- **Portal de socios, explorado a fondo (Haiku lo había dejado "no explorado")**: el dominio real es
  `socios.clubatleticosanmiguel.com` (sin `.ar` — un dominio DISTINTO al oficial, dato que no estaba
  anotado antes). Confirmado como un CRM de gestión de socios con login (`Usuario`/`Password`),
  registro de nuevos socios (`registro.php`) y una página de donaciones (`colabora.php`) — es cobro de
  cuotas, no un repositorio de documentos. CDX de dominio completo: 58 capturas, 0 son `.pdf` (todo son
  páginas del formulario y assets estáticos).
- **Evaluación**: escalera de 0.1 agotada a fondo en las familias aplicables (sitio oficial, Wayback
  CDX). Sin ninguna señal de que un balance exista en ningún canal (a diferencia de Racing Cba, acá no
  hay ni un post de asamblea que confirme lectura de memoria/balance) → clasificado como **dead-end
  real**, no candidato a mail por ahora. El hallazgo más útil de esta sesión no fue un documento sino
  la corrección del dato "sitio vacío" — que hubiera llevado a una próxima sesión a confiar en un
  resultado obsoleto si no se hubiera vuelto a mirar el sitio en vivo.
- Último chequeo: 2026-09-26.
