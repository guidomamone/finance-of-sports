# Aldosivi

**Ángulos**: sitio oficial: agotado (sitio en Angular/SPA, menú completo revisado incluyendo
`socios/informacion`, `archivo`, `club/estatuto` — sin PDF financiero, solo el escudo en
`/CAA.pdf`; hay un portal de socios separado, `portal.ourclub.io/aldosivi`, que exige login) ·
Wayback CDX: agotado (0 PDFs financieros en el dominio) · búsqueda web: agotado (0 PDFs, pero
CONFIRMA que el documento existe — ver Chequeo 2026-09-26) · regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: aldosivi.com (secciones "El Club"/"Socios", sin
  Transparencia/Memoria/Balance ni portal público). El estatuto exige tratar Memoria y Balance en
  asamblea (confirmado por noticias propias del club), pero no se publica el PDF en la web pública.
- Pendiente: todos los ejercicios.
- Contacto: formulario en aldosivi.com ("El Club" > "Contacto"), o Secretaría de Socios —
  socios@aldosivi.com, tel. (0223) 484-0157 / 484-4230 / 484-3645, WhatsApp 223 3 00-5724, Av. de los
  Trabajadores 1800, Mar del Plata.

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

## Chequeo 2026-09-26 — sitio revisado a mano (SPA) + familia 4, documento CONFIRMADO

Sesión de sourcing puro (5 clubes del interior). El barrido automatizado del 2026-09-22 asumía un
patrón WordPress (`wp-json/wp/v2/search`); `aldosivi.com` NO es WordPress, es una SPA (Angular/JS
propio con `URL_ROOT` y rutas client-side) — todas las rutas devuelven el mismo HTML de shell, así
que el barrido anterior probablemente no vio el contenido real de cada sección. Esta sesión revisó
el menú completo a mano vía `curl` + grep de `href`:
- `El Club`: `comisiondirectiva`, `estatuto`, `fundacional`, `galeria`, `historia`,
  `momentoshistoricos`, `sedesocialycultural`, `noticias` — ninguna con PDF financiero linkeado.
- `Socios`: `informacion`, `noticias`, `valores` — nada financiero en el HTML (aunque, al ser SPA,
  el contenido real puede cargar vía JS/API no visible por `curl`; no se pudo profundizar sin
  Browser pane, compartido con otros 6 agentes en esta sesión).
- **Hallazgo nuevo: `socios.aldosivi.com` redirige a `portal.ourclub.io/aldosivi/`**, un portal de
  socios (Angular, `ng-app="portalsocios"`) con login. Es un portal privado de gestión de socios
  (pagos, credenciales), no un regulador — mismo tipo de bloqueo que un canal que "exige la
  identidad de una persona real" (ver `club-sourcing` 0.3), aunque acá no hay certeza de que el
  balance viva ahí adentro. Si Guido es socio y tiene login, vale la pena que chequee una vez si el
  portal tiene una sección de "Documentos institucionales" — no es una tarea de sourcing (no se
  puede crear una cuenta ni loguearse desde acá).
- El único PDF público del dominio (`/CAA.pdf`) es el escudo del club en PDF vectorial de una
  página, sin texto — no es un documento financiero. Confirmado con `pdftotext` (0 caracteres) y
  visualmente.
- **El documento SÍ existe y se presenta en asamblea todos los años**, confirmado por prensa:
  - Asamblea del 3-4 de julio de 2025: tratamiento y aprobación de "Memoria, Balance General,
    Inventario, Estado de Recursos y Gastos, e Informe de la Comisión Revisora de Cuentas"
    correspondientes al ejercicio 2024, más renovación de autoridades (asumió Hernán Tillous como
    presidente) — El Retrato de Hoy,
    https://elretratodehoy.com.ar/2025/07/04/ecos-de-la-multitudinaria-asamblea-del-club-aldosivi/.
    El artículo no da cifras ni link al documento.
  - Nota de contexto financiero (sin ser el balance en sí): "Los números no cierran en Aldosivi"
    (La Capital de Mar del Plata,
    https://www.lacapitalmdp.com/los-numeros-no-cierran-en-aldosivi/) cita un déficit mensual de
    ~USD 100.000 según fuente dirigencial (ingresos: ~$200M TV + $40-50M cuota social/mes; egresos:
    logística, viajes, juveniles), sin fecha de ejercicio ni ser un estado contable formal — dato
    de color, no reemplaza el documento.
- **0 PDFs encontrados** en ningún canal digital para ningún ejercicio.
- **Candidato a mail** (ver `club-sourcing` 0.3): documento confirmado, tratado en asamblea reciente
  (julio 2025) con cifras auditadas — pedirle al club el PDF del ejercicio 2024 (o los últimos 5)
  es de bajo costo y alto valor esperado. Decisión de Guido.
- Último chequeo: 2026-09-26.
