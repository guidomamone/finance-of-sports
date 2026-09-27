# Deportivo Madryn

**Ángulos**: sitio oficial: agotado (WordPress real con menú completo — jugadores, comisión directiva,
cuerpo técnico, calendario, clasificación, historia, estadio, contactos, palmares, patrocinadores,
noticias — sin ninguna sección de socios/institucional/transparencia; `wp-json/wp/v2/search` sin
resultados relevantes para "balance"/"contable"/"estatuto", y "memoria"/"asamblea" solo matchean la
página de Historia por casualidad de vocabulario) · Wayback CDX: agotado (0 PDFs en todo el dominio)
· búsqueda web: agotado, con hallazgo de prensa · regulador/país: no aplica · prensa: CONFIRMA balance
del ejercicio 2024 aprobado por unanimidad en asamblea el 1/3/2025 (El Chubut), sin cifras publicadas
· barrido: 2 (Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: deportivomadryn.com. Sitio puramente deportivo
  (jugadores, calendario, historia, palmarés) — no tiene ninguna sección institucional, de socios,
  ni de transparencia/balances, y 0 PDFs archivados en Wayback Machine para el dominio.
- Pendiente: todos los ejercicios (ni siquiera se pudo confirmar si el club publica un balance en
  algún canal).
- Contacto: prensaclubmadryn@outlook.com, X @ClubMadryn.
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

Se corrió la escalera completa de `club-sourcing` 0.1 a fondo, no solo el barrido mecánico del
2026-09-22 (que había concluido, de forma imprecisa, que el sitio "no tiene ninguna sección
institucional" — cierto para el menú visible, pero faltaba probar `wp-json` y prensa):

- **Familia 1 (sitio oficial)**: `deportivomadryn.com` SÍ es WordPress (confirmado por
  `wp-json/` accesible), con un menú completo de jugadores/comisión directiva/cuerpo técnico/
  calendario/clasificación/historia/estadio/contactos/palmares/patrocinadores/noticias — ninguna
  sección de socios, transparencia o institucional más allá de la nómina de la Comisión Directiva.
  `wp-json/wp/v2/search` con "balance", "contable" y "estatuto" devuelve `[]`; "memoria" y "asamblea"
  devuelven solo la página de Historia (probablemente por usar esas palabras en sentido narrativo,
  no contable — se revisó y no tiene relación). `/contactos/` no tiene ningún mailto visible en el
  HTML estático.
- **Familia 3 (Wayback CDX, dominio completo)**: 0 PDFs archivados nunca en `deportivomadryn.com`
  (el índice general del dominio sí tiene cientos de páginas de jugadores/noticias, pero cero
  archivos `.pdf`).
- **Familia 4/5 (búsqueda web + prensa) — el hallazgo real de esta sesión**: El Chubut cubrió una
  asamblea del club ("El club Madryn realizó una asamblea donde se aprobaron los balances del año
  pasado", 1/3/2025): bajo la presidencia de Ricardo Daniel Sastre, se leyeron y aprobaron por
  votación unánime los balances del **ejercicio 2024**, en la sede social (Av. Woodley, Puerto
  Madryn). El artículo no cita cifras ni linkea ningún documento. Se buscó además una asamblea más
  reciente (ejercicio 2025) sin encontrar cobertura de prensa todavía.
- **Conclusión — candidato a mail (0.3)**: documento CONFIRMADO que existe (leído y aprobado en
  asamblea), sin ningún canal digital. Contacto ya documentado: prensaclubmadryn@outlook.com. No se
  encontró ningún PDF nuevo para descargar en esta sesión.
- Último chequeo: 2026-09-26.
