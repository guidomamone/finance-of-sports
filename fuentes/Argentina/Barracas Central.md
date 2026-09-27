# Barracas Central

**Ángulos**: sitio oficial: agotado (sin sección de socios/transparencia/comisión directiva;
`wp-json/wp/v2/search` con 5 términos — 0 resultados de asamblea/memoria/contable/estados contables,
solo notas deportivas con la palabra "balance" en sentido futbolístico) · Wayback CDX: agotado (4
PDFs archivados en el dominio, los 4 ediciones de una revista deportiva del club, ninguno financiero
— confirma que el sitio SÍ puede alojar PDFs pero no los usa para balances) · búsqueda web: agotado
— encontró UNA nota de prensa externa (Doble Amarilla, 14/5/2022) confirmando que una asamblea
presencial aprobó la Memoria y Balance de DOS ejercicios (oct.2019-sep.2020 y oct.2020-sep.2021), sin
cifras concretas de superávit/déficit ni PDF adjunto; sin cobertura de asamblea posterior a 2022 ·
regulador/país: no aplica · barrido: 1 (Haiku+Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados, y es dudoso que existan publicados en un canal digital propio: el
  sitio oficial (barracascentral.com) no tiene ninguna sección de socios/transparencia/comisión
  directiva ni memoria/balance — solo Home/El club/Partidos/Media/Galería/Eventos/Prensa. Club chico
  y de ascenso reciente, estructura institucional menos desarrollada que el resto del lote. Sí hay
  confirmación externa (prensa) de que el club REALIZA asambleas y aprueba memoria y balance — ver
  Chequeo 2026-09-26.
- Pendiente: el PDF real de cualquier ejercicio (2019-2021 confirmado que se aprobó en asamblea;
  ejercicios posteriores sin ninguna cobertura encontrada).
- Contacto: info@barracascentral.com, Prensa prensa@barracascentral.com, tel. 4301-5855, Luna 1211,
  CABA.

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

- **Resultado: 0 documentos.** Wayback: 4 PDFs archivados en el dominio, ninguno financiero. Confirma lo ya anotado sobre la estructura institucional poco desarrollada del sitio.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — barrido 1 (Haiku+Sonnet), verificación + hallazgo de prensa

Un subagente Haiku reportó 0 PDFs, confirmó que el único PDF público del sitio es una revista
deportiva (no financiera), y anotó que "prensa menciona aprobaciones de asamblea sin cifras concretas
ni PDF" sin citar la fuente. Esta sesión (Sonnet) verificó y completó:

- **CDX de Wayback reconfirmado por `curl` directo**: 4 filas, las 4 son ediciones de
  "Revista Actualidad Barraqueña" (2019-2020), ninguna financiera. Coincide con Haiku.
- **`wp-json/wp/v2/search`** con 5 términos: 0 resultados de asamblea/memoria/contable — ni siquiera
  "asamblea" trae nada, lo que confirma que el club no cubre sus asambleas en su propio sitio (a
  diferencia de Rafaela). Ángulo que el reporte de Haiku no detalló para este club.
- **Identificada la fuente de prensa concreta que Haiku dejó sin citar**: Doble Amarilla
  (dobleamarilla.com.ar), nota del 14/5/2022, "Asamblea General en Barracas: aprobación de Balance y
  anuncio de reconstrucción del estadio". Confirma una asamblea presencial que aprobó la Memoria y
  Balance de DOS ejercicios acumulados (octubre 2019-septiembre 2020 y octubre 2020-septiembre 2021,
  represados por la pandemia) — sin cifras de superávit/déficit en el texto, sin PDF ni link
  adjunto. Se buscó cobertura de asamblea posterior (2023-2026): sin resultados nuevos, ninguna nota
  encontrada.

**Clasificación (criterio 0.3): caso límite entre dead-end y candidato a mail — más débil que
Rafaela.** A favor de "hay señal": la nota de Doble Amarilla confirma que un documento de Memoria y
Balance SÍ existió y SÍ fue tratado formalmente en asamblea (no es "0 señal, ni prensa, ni mención").
En contra de tratarlo igual que Rafaela/Independiente: no hay cifras concretas citadas (la señal que
el criterio 0.3 usa como ejemplo de "confirmado"), y no hay ninguna cobertura de asamblea en los
últimos ~4 años (2022 es el único dato), a diferencia de Rafaela que tiene 4 ejercicios consecutivos
con cifras exactas. Se documenta como candidato a mail de baja prioridad, no como dead-end — pero
vale la pena que Guido lo revise antes de sumarlo a la cola del to-do 51, porque la señal es
sensiblemente más débil que el resto de esa lista.

- Último chequeo: 2026-09-26.
