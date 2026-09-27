**Ángulos**: sitio oficial: agotado (sitio Next.js/SPA sin capa WordPress, menú completo revisado:
inicio, disciplinas×9, historia, predio, estadio, socios, noticias, arenaceleste, contacto — ninguna
sección institucional/transparencia/balance) · Wayback CDX: agotado (0 URLs archivadas NUNCA en todo
el dominio `aaestudiantesriocuarto.com` — dominio muy nuevo) · búsqueda web: agotado, con hallazgo
de prensa que confirma el documento (ver Chequeo) · regulador/país: no aplica · barrido: 1 (Sonnet)
— 2026-09-26

# Estudiantes de Río Cuarto

- Sin PDFs oficiales encontrados, sin sección institucional de transparencia/balances. Sitio oficial:
  aaestudiantesriocuarto.com (nuevo, recién ascendido, sin memoria y balance publicada). OJO: el
  dominio aaestudiantes.com.ar (sin "riocuarto") NO es del club — es un dominio vencido reutilizado
  por un sitio de casino online, descartado por completo.
- Pendiente: todo — club recién ascendido con presencia institucional online todavía muy limitada.
- Contacto: sin email visible en el sitio. Instagram @estudiantesrio4 / X @EstudiantesRio4, o
  domicilio social Av. España 251, Río Cuarto, Córdoba. Portal de socios (login):
  aaestudiantes.accessfan.ar.

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

## Chequeo 2026-09-26 — escalera completa (barrido 1, Sonnet), documento confirmado por prensa, candidato a mail

- **Familia 1 (sitio oficial)**: sitio nuevo hecho en Next.js (no WordPress: `wp-json` redirige a la
  home, no hay endpoint de búsqueda). Se revisó el menú completo — no existe ninguna sección
  institucional/transparencia/balances, solo deportiva (disciplinas, plantel, estadio) y comercial
  (socios vía portal externo `accessfan.ar`, login).
- **Familia 3 (Wayback CDX, dominio completo)**: re-confirmado, **0 URLs archivadas jamás** para
  `aaestudiantesriocuarto.com` (dominio recién registrado, consistente con el ascenso reciente del
  club).
- **Familia 4/5 (búsqueda web + prensa)**: [puntal.com.ar](https://www.puntal.com.ar/estudiantes-rio-cuarto/estudiantes-llevo-cabo-su-asamblea-extraordinaria-y-renovo-autoridades-n208497)
  confirma que el club realizó una Asamblea Extraordinaria (nota publicada 28/12/2023) donde "los
  socios aprobaron por unanimidad el balance y la memoria correspondientes a los ejercicios cerrados
  al 30 de septiembre del 2023", con informe del órgano de fiscalización y estados contables
  presentados, en el estadio de básquet Jorge Artundo. Alicio Dagatti fue reelecto presidente
  (5º mandato). El artículo no menciona cifras ni adjunta el documento.
- **Conclusión**: documento CONFIRMADO que existe (ejercicio cerrado 30/09/2023, con informe de
  fiscalización) pero sin ningún canal digital — candidato a mail (`club-outreach`), no dead-end sin
  señal. Sin email visible en el sitio; contacto vía Instagram @estudiantesrio4 / X @EstudiantesRio4
  o el domicilio social (ver arriba).
- Último chequeo: 2026-09-26.
