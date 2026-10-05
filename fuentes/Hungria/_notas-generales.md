# Hungría — notas generales (sourcing NB I, sesión 2026-10-03)

## Canal estatal: e-beszamolo.im.gov.hu — NO scripteable (captcha), gestión de Guido

El depósito oficial gratis de beszámolók del Ministerio de Justicia (`e-beszamolo.im.gov.hu`) tiene el
buscador protegido por un widget **ALTCHA** (captcha de proof-of-work, `/altcha/api/v1/challenge`,
`<altcha-widget id="altcha">` dentro del form de búsqueda). Resolverlo = completar un captcha, prohibido
para un agente. No se probó la descarga. Si Guido quiere este canal, tiene que pasar él el captcha (búsqueda
por adószám/cégjegyzékszám). Sirve de respaldo/cross-check, no hizo falta para los 10 clubes con documentos.

## Agregadores (opten.hu, nemzeticegtar.hu, ceginfo.hu, ceginformacio.hu): son de pago, solo leads

`nemzeticegtar.hu`/`webshop.opten.hu`: "Pénzügyi beszámoló" cuesta 759 Ft por empresa (el PDF presentado
al Ministerio + xlsx). Las fichas gratuitas muestran solo facturación y resultado del último año (sirven
para cruzar un total, no como fuente). No se descargó nada de ahí.

## El canal real: la sección TAO / licencia / gazdálkodás del propio sitio del club

Casi todos los clubes de la NB I cuelgan en su web el paquete **Éves beszámoló + Kiegészítő melléklet +
Üzleti jelentés + Független könyvvizsgálói jelentés** de cada año (en una página `/tao`, `/gazdalkodas`,
`/eves-beszamolok`, `/beszamolok`, `licencdokumentumok`). Es inferido —no verificado en la norma— que el
motivo es el régimen TAO (apoyo de impuesto de sociedades al deporte, el SFP exige transparencia) y la
licencia de la MLSZ. Patrón de búsqueda: `<club> éves beszámoló könyvvizsgálói jelentés pdf`, y listar los
links de la página con un script (hay muchas más PDFs de SFP/határozat que ruido: filtrar por
`besz|konyv|merleg|kieg`).

## Gotchas
- **Todos los PDFs húngaros son escaneos sin capa de texto** (el formulario oficial impreso y escaneado).
  OCR con tesseract `-l hun`. `pdftotext` devuelve vacío.
- **Homonimia de entidades**: Ferencváros publica DOS paquetes en su web: `/klub/szakosztalyi-gazdalkodas`
  = **FTC Labdarúgó Zrt.** (el fútbol, el que interesa) y `/klub/gazdalkodas` = Ferencvárosi Torna Club
  (la asociación madre, resto de deportes, "egyéb szervezet" PK-1043). Mismo patrón en Kisvárda (Várda
  Labdarúgó Szolgáltató Kft. vs Várda SE asociación vs "összevont/konszolidált") y Puskás (Puskás Futball
  Club Kft. vs fundación/escuelas). Chequear la carátula antes de usar.
- **Ejercicio**: Újpest 1885 Futball Kft. pasó de cerrar el 30-jun a cerrar el 31-dic (hay "évközi" al 30-jun
  2020/2021/2022 además de los al 31-dic).
- **Wayback**: ver nota del skill sobre capturas truncadas a 1.048.576 bytes; en este país truncó `paksifc.hu` 2020
  y varias capturas tempranas; las capturas con fecha más reciente suelen estar completas. `curl --compressed`
  hace falta con Wayback `id_` (si no, se baja un gzip crudo — pasó con ujpestfc.hu).
- **Links protocol-relative** (`//www2.itworx.hu/...` en ztefc.hu): `dl.sh` falla con rc=3 si no se antepone `https:`.
- **Descargas de Google Drive** de un sitio oficial (`drive.google.com/uc?export=download&id=`) funcionaron
  (Újpest); el de 26 págs de la kiegészítő 2023 devolvió HTML de confirmación.

## Texto propuesto para `paises/Hungria.md` (a copiar por la sesión principal)
Canal: sitios de los clubes (`/tao`, `/eves-beszamolok`, `/beszamolok`); e-beszamolo.im.gov.hu con captcha ALTCHA
(gestión de Guido); agregadores pagos (759 Ft). PDFs escaneados -> OCR `hun`. Cuidar homonimia
asociación/Zrt. Ver `fuentes/Hungria/_notas-generales.md`.

## Pendientes (venían del TODO)

- (ex to-do 133, 2026-10-03) **Gestiones de Guido que desbloquean varios países de Europa del Este** (sesión 2026-10-03; ninguna es tarea de sourcing, cada una exige IP, cuenta, captcha o pago de una persona): (c) captcha de `e-beszamolo.im.gov.hu` (Hungría: Fehérvár y huecos de Paks 2020, MTK 2019).
- (ex to-do 135) **Candidatos a mail (existencia confirmada o muy probable, no escritos; Guido decide y aprueba cada envío, proceso en `club-outreach`)**: Fehérvár (`titkarsag@vidi.hu`, estados 2020-2025).
