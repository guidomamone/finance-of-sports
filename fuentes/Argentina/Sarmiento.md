# Sarmiento (Junín)

**Ángulos**: sitio oficial: agotado (sin sección institucional/transparencia, sitio chico sin más
que un PDF de nómina de CD) · Wayback CDX: agotado (0 PDFs en el dominio) · búsqueda web: agotado
(0 PDFs, pero CONFIRMA que el documento existe — ver Chequeo 2026-09-26) · regulador/país: no
aplica (Argentina no tiene regulador documentado salvo IGJ, que no corresponde a un club
bonaerense) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clubatleticosarmiento.com — chico, sin sección
  Institucional/Transparencia/Memoria/Balance ni en menú ni en footer, solo un PDF público (nómina de
  Comisión Directiva 2021-23).
- Pendiente: todos los ejercicios — probablemente solo se publica en papel para la asamblea.
- Contacto: Secretaría 2364-319596 / 4437263, sarmientoprensa@mail.com, Av. Arias y Necochea, Junín
  (BA), L-V 8-13h y 15-19h.

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

## Chequeo 2026-09-26 — familia 4 (búsqueda web dirigida), documento CONFIRMADO que existe

Sesión de sourcing puro (5 clubes del interior). Familias 1 y 3 ya estaban agotadas a fondo desde el
2026-09-22 (ver arriba), así que esta sesión se concentró en familia 4 (búsqueda web dirigida) y
prensa, que no se habían agotado todavía.

- **La Memoria y Balance SÍ existe y se presenta todos los años en asamblea — con cifras concretas
  citadas por prensa**, pero nunca como PDF público:
  - Ejercicio 1/7/2020-30/6/2021: superávit **$36.831.305,05**, socios activos 5.497→5.534, deuda
    mayorista a 3 meses $5.932.640 al cierre (Semanario de Junín,
    https://semanariodejunin.com.ar/nota/23624/sarmiento-presento-su-memoria-y-balance-con-un-superavit-de-36-8-millones-de-pesos/).
  - Ejercicio 2018/19 (jul-jul): superávit >$4.500.000 (mención de búsqueda web, sin artículo
    fuente guardado — no se profundizó porque el ejercicio 2020/21 ya alcanza como confirmación).
  - La asamblea electoral de mayo 2025 (Diario Democracia,
    https://www.diariodemocracia.com/mas-deportivo/polideportivo/319040-asamblea-electoral-club-sarmiento-junin-se-realiza/)
    fue puramente electoral, sin Memoria y Balance en el orden del día — no sirve como confirmación
    de un ejercicio reciente, pero tampoco contradice que el club siga presentando el documento en
    otras asambleas.
- **0 PDFs encontrados** en ningún canal digital (ni sitio oficial, ni Wayback, ni búsqueda web
  `filetype:pdf`) para ningún ejercicio.
- **Candidato a mail** (ver `club-sourcing` 0.3): el documento existe, se lee ante los socios con
  cifras auditadas, y el club ya tiene el hábito de comunicarlo a la prensa local — pedirle que
  comparta el PDF (de cualquiera de los últimos 5 ejercicios) es de bajo costo para el club y alto
  valor esperado. Decisión de Guido si aprobar el envío.
- Último chequeo: 2026-09-26.
