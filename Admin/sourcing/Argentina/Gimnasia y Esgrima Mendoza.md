# Gimnasia y Esgrima (Mendoza)

**Ángulos**: sitio oficial: agotado (menú completo + wp-json, sin sección institucional con
documentos) · Wayback CDX: agotado (6 PDFs en todo el dominio, ninguno financiero) · búsqueda web:
agotado (sin resultados) · regulador/país: no aplica (Argentina sin regulador documentado salvo IGJ
pago) · prensa: agotado (sin cifras ni cobertura de asamblea reciente) · barrido: 1 (Sonnet) —
2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: gimnasiayesgrimamza.com.ar (OJO: distinto de
  gimnasia.org.ar, que es el de La Plata). Sitio chico, sin sección institucional con documentos. Una
  nota menciona que se leerá/aprobará el balance al 31/10/2022 en asamblea, sin PDF adjunto.
- Pendiente: todos los ejercicios.
- Contacto: sin email institucional encontrado. WhatsApp +54 9 261 509-1624, o redes: Instagram
  @gimnasiamzaoficial, X @GimnasiaMendoza, Facebook GimnasiaMendozaOK.

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

## Chequeo 2026-09-26 — escalera completa (Sonnet, GRUPO A control), sin hallazgo

El barrido automatizado del 2026-09-22 se había quedado corto en la familia 3 (no reportaba el
detalle de qué PDFs SÍ había en el dominio, solo "0 relevantes"). Se rehizo la escalera completa a
fondo:

- **Familia 1, sitio oficial**: menú completo revisado (Club → Historia/Comisión Directiva, Primera,
  Divisiones Fútbol → femenino/masculino, Disciplinas, Prensa, Contacto) + `wp-json/wp/v2/search`
  con `balance`, `memoria`, `asamblea`, `contable`, `ejercicio` + sitemap de posts (41 posts, todos
  noticias deportivas). Único resultado relevante: el post **"Asamblea General Ordinaria 2023"**
  (`/asamblea-general-ordinaria-2023/`), que menciona que se "leerá y aprobará el balance económico
  del club hasta el 31/10/2022" — sin ningún link, PDF, Drive ni visor adjunto en la página. Sección
  "Comisión Directiva" existe pero es solo nómina de dirigentes, no documentos.
- **Familia 3, Wayback CDX de dominio completo** (`matchType=domain&filter=original:.*\.pdf`): el
  dominio tiene **6 PDFs archivados en total**, ninguno financiero — se abrieron y verificaron todos:
  `Estatuto.pdf` (2009), `COMISIÓN-DIRECTIVA-GyE.pdf` (nómina, 2015), `Plantel-GyE-2012.pdf` y
  `PLANTEL-GYE-2013.pdf` (planteles de jugadores, no balances), un protocolo de prevención de
  violencia de género (2024), y **`GYE2018.pdf`** (26 MB, 64 páginas) — se descargó y renderizó:
  es una revista institucional/yearbook con diseño de Adobe InDesign (fotos, estadísticas
  deportivas, "Fútbol Femenino Primera División", etc.), **no un balance** — confirmado visualmente,
  sin ninguna cifra de estado contable.
- **Familia 4, búsqueda web dirigida**: `filetype:pdf` + "balance"/"estados contables" y "memoria y
  balance" + asamblea — ambas búsquedas devuelven resultados de OTROS clubes homónimos (Gimnasia La
  Plata, Gimnasia Jujuy) o del propio `GYE2018.pdf` ya descartado como no financiero. Cero
  resultados propios de Mendoza con cifras.
- **Familia 5, prensa**: búsqueda específica de asamblea/balance 2024-2025 del club — cero cobertura
  de prensa con cifras concretas, ni siquiera mención de que la asamblea se haya celebrado.
- **Conclusión: dead-end real, 0 señal de que el documento exista en ningún canal digital.** Club
  institucionalmente chico (sitio muy limitado, sin sección de transparencia). No amerita mail
  (no hay nada confirmado que pedirle que "resuba" — la nota de 2022 solo anuncia que se leerá en
  asamblea, no que exista un PDF en algún lado). Próximo paso: ninguno con la información actual;
  reintentar sin apuro si en el futuro el club rediseña su sitio o aparece cobertura de prensa nueva.
- Último chequeo: 2026-09-26.
