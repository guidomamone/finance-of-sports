# Los Andes

- **Archivo oficial completo de balances, publicado directo en el propio dominio** (a diferencia de
  la mayoría del lote, este SÍ estaba online y descargable en vivo al momento de la investigación) —
  losandesoficial.com/sites/default/files/2023-12/BALANCE%20<N>.pdf. Descargados 13 PDFs reales,
  CONSECUTIVOS, a `Clubes/Argentina/Los Andes/`: Ejercicios Económicos N° 93 a 105, uno por año,
  confirmado con OCR de la portada de cada uno (ej. Ejercicio 93: "Iniciado el 01 de Julio de 2008,
  Finalizado el 30 de Junio de 2009"; Ejercicio 105: "Finalizado el 30/06/2021"):
  - `balance-ejercicio-93-2008-09.pdf` a `balance-ejercicio-105-2020-21.pdf` (13 archivos, un año
    calendario económico cada uno, jul-jun).
  Todos son escaneos (CamScanner) SIN capa de texto — confirmado con OCR de muestra que sí tienen
  Estado de Resultados/Patrimonio Neto real con cifras (una página aparece rotada 90° en el escaneo),
  no son narrativa. NINGUNO fue OCReado a fondo ni cargado al sitio en esta sesión (solo
  descubrimiento de fuentes) — es el hallazgo más grande de este barrido de Primera Nacional, 13
  ejercicios consecutivos reales de un club que hoy no tiene nada cargado.
- Pendiente: todo el onboarding de datos (OCR + categorización) de los 13 ejercicios, y confirmar si
  existe algún ejercicio posterior a 105 (2020-21) en el sitio — no se encontró un ejercicio 106+ en
  el mismo directorio ni en el resto del dominio.
- Contacto: socios@clublosandes.com, WhatsApp +54 9 11 3926-2050, sede Av. Hipólito Yrigoyen 9549/53,
  Lomas de Zamora.
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
