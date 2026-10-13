# Defensa y Justicia

**Ángulos**: sitio oficial: agotado (3 posts institucionales confirmados y abiertos, cero adjuntos) ·
Wayback CDX: agotado (0 PDFs archivados) · búsqueda web: agotado (confirma cifras de prensa/sitio
pero no un PDF descargable) · regulador/país: no aplica · barrido: 1 (Haiku+Sonnet) — 2026-09-26.
**Candidato a mail (to-do 51)**: documento confirmado que existe, no descargable en ningún canal.

- Sin PDFs de balance encontrados. Sitio oficial: defensayjusticia.org.ar. Publica notas narrativas
  con la cifra de superávit de cada ejercicio en PESOS ARGENTINOS, no dólares (Ejercicio N°90, cierre
  30/6/2024, superávit $3.456 millones ARS, 10mo balance consecutivo con superávit; Ejercicio N°91,
  cierre 30/6/2025, superávit $6.218 millones ARS, 11vo consecutivo — verificado 2026-09-26) pero SIN
  el estado contable adjunto. CUIT 30-66402501-5. Tiene un portal "Sede Virtual" con login de socio
  que podría tener el documento real, no explorable sin credenciales.
- Pendiente: el balance auditado real (PDF) de cualquier ejercicio.
- Contacto: sección Socios (defensayjusticia.org.ar/socios/) o Prensa del sitio oficial; no se
  encontró mail institucional directo publicado.

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

- **Resultado: 0 documentos.** Hay 3 posts institucionales que confirman ejercicios aprobados — "Se aprobó el ejercicio n° 91 de la institución", "Aprobación Ejercicio N°88 de la entidad" y "Aprobación Balance y nueva Comisión Directiva" — y los tres se abrieron y revisaron: **cero adjuntos** (ni `.pdf`, ni Drive, ni iframe de visor). Wayback: 0 PDFs archivados en todo el dominio. La numeración de ejercicios (88, 91) sirve igual para pedirle al club un rango concreto.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — verificación de barrido 1 (Haiku+Sonnet), con corrección de un dato

Haiku bajó de nuevo 2 PDFs de defensayjusticia.org.ar como candidatos:
`anibal-giron-defensa-y-justicia.pdf` (3.7 MB, 154 págs.) y `libro-desde-sus-raices.pdf` (14 MB, 141
págs.). Verificado abriendo ambos con `pdftotext`: **son libro/biografía institucional** ("Aníbal
Girón — Defensa y Justicia, desde sus raíces...", con el acta de fundación del 20/3/1935 en la
primera página), no estados contables ni memorias de ejercicio — confirmado, tal como sospechaba el
propio reporte de Haiku. Tienen valor histórico (fecha de fundación, socios fundadores) pero cero
valor financiero; **se dejan donde están** (no son falsos positivos por club equivocado, son
documentos reales del club correcto, solo del tipo equivocado para esta búsqueda).

**Corrección a un dato que el reporte de esta sesión traía mal**: el ejercicio N°91 (cierre
30/6/2025) tuvo superávit de **$6.218 millones de PESOS**, no "USD 3.456 millones" — esa cifra
($3.456M) es la del ejercicio N°90 anterior (cierre 30/6/2024), y en pesos argentinos, no dólares.
Confirmado releyendo el propio archivo de este club (ya lo tenía bien desde el chequeo del
2026-09-22) y cruzado con el post oficial "Se aprobó el ejercicio n° 91 de la institución" — texto
completo revisado de nuevo, sigue sin ningún adjunto descargable.

Sin cambios al veredicto: sigue siendo **candidato a mail** (documento confirmado que existe —
prensa/sitio cita cifras concretas de 2 ejercicios distintos — pero no descargable en ningún canal
digital encontrado).
- Último chequeo: 2026-09-26.
