# Lanús

**Ángulos**: sitio oficial: agotado (menú completo + wp-json, sin PDF) · Wayback CDX: agotado (0
PDFs en todo el dominio) · búsqueda web: agotado (sin resultados nuevos) · regulador/país: no aplica
— 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clublanus.com. Una noticia propia ("Se celebró la
  111ª Asamblea Anual Ordinaria...", 30/11/2025) confirma aprobación por unanimidad de Memoria,
  Inventario, Balance General y Cuadro de Recursos y Gastos del ejercicio cerrado 31/8/2025 (superávit
  $5.531.559.857), pero es puramente narrativa, sin PDF ni link a Drive/Dropbox adjunto.
- Pendiente: todos los ejercicios.
- Contacto: contacto@clublanus.com, tel. +54 11 4357 9200.

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

- **Resultado: 0 documentos.** El club publica convocatorias numeradas ("CONVOCATORIA A LA 110ª ASAMBLEA ANUAL ORDINARIA", "...111ª...", "Asamblea Anual Ordinaria N°107", "Asamblea Anual Ordinaria 2022") y notas de resultado ("ASAMBLEA ANUAL ORDINARIA CON UN NUEVO SUPERÁVIT ECONÓMICO"), pero **ninguna adjunta documento**: se abrieron y el único `.pdf` del sitio es el arancelario de socios. Wayback: 0 PDFs archivados en todo el dominio. La numeración de asambleas sirve para pedirle al club un ejercicio concreto.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — familia 4 (búsqueda web dirigida), escalera agotada

Sourcing puro, sesión dedicada a 5 clubes tradicionales sin nada cargado. Family 1 y 3 ya estaban
agotadas (chequeo 2026-09-22, arriba); esta vuelta corrió la familia 4 a fondo: `filetype:pdf` +
"Lanús" + balance/estados contables/memoria y balance, más búsquedas dirigidas por año (2024, 2025)
y por número de ejercicio. También se releyó `wp-json/wp/v2/search` (`balance`, `memoria y balance`,
`estados contables`) — mismo resultado que el barrido de sitio: solo posts narrativos, ninguno con
PDF ni link a Drive/Dropbox (se abrió puntualmente "Se aprobó la Memoria y Balance N° 102" — ejercicio
2016, superávit $34M citado en el texto — para confirmar que tampoco ese post viejo tiene adjunto).

- **Resultado: sin PDF nuevo. Escalera completa (1, 3, 4) agotada; familia 2 no aplica** (no hay
  regulador documentado para clubes argentinos fuera de IGJ, bloqueado por clave fiscal AFIP paga).
- **Candidato a mail, no dead-end puro**: a diferencia de un club sin ninguna señal, acá SÍ hay
  confirmación de que el documento existe todos los años — el propio club publica el resultado
  numérico de cada asamblea (ej. 111ª Asamblea, superávit $5.531.559.857 del ejercicio cerrado
  31/8/2025; N°102, superávit $34M del ejercicio 2016) pero nunca el PDF. Mismo patrón que
  Independiente (ejercicio N°121) en `club-sourcing` 0.3. Guido decide si amerita el mail del to-do
  51 — pedirle al club que publique/comparta el balance de la 111ª Asamblea (ejercicio cerrado
  31/8/2025) es de bajo costo para el club y alto valor esperado.
- Último chequeo: 2026-09-26.
