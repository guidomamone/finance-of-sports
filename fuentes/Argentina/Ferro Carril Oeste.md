# Ferro Carril Oeste

- Archivo oficial parcial vía noticias institucionales — ferrocarriloeste.org.ar (dominio inalcanzable
  directo al momento de esta investigación, ver nota de fuentes arriba; todo lo de abajo se bajó vía
  Wayback Machine de las URLs oficiales). Descargados 5 PDFs reales a
  `Clubes/Argentina/Ferro Carril Oeste/`:
  - `balance-ejercicio-119-2022-23.pdf` — Estados Contables reales completos (Situación Patrimonial +
    Recursos y Gastos + notas y anexos), Ejercicio N°119 (1/7/2022 a 30/6/2023). SUPERÁVIT real
    $712.927.771,84 (vs. $553.880.529,98 del ejercicio anterior, columna comparativa).
  - `memoria-ejercicio-119-2022-23.pdf` — Memoria narrativa del mismo ejercicio, sin cifras.
  - `estados-contables-ejercicio-118-2021-22.pdf` — Estados Contables reales (Situación Patrimonial +
    Recursos y Gastos), Ejercicio N°118 (1/7/2021 a 30/6/2022, en moneda constante). SUPERÁVIT real
    $256.901.915,58 (vs. $190.297.634,11 del ejercicio anterior).
  - `memoria-ejercicio-118-2021-22.pdf` — Memoria narrativa del mismo ejercicio, sin cifras.
  - `memoria-ejercicio-120-2023-24.pdf` — Memoria narrativa Ejercicio N°120, sin cifras.
- **EL DOMINIO VOLVIÓ A RESPONDER (2026-09-22)** — `ferrocarriloeste.org.ar` está 200 y sirve sus
  PDFs por `curl` sin problema. Todo lo que la sesión anterior había dejado pendiente "hasta que el
  dominio vuelva" se resolvió en esta. 4 PDFs nuevos descargados a
  `Clubes/Argentina/Ferro Carril Oeste/`:
  - `memoria-y-balance-ejercicio-122-2025-26.pdf` (111 págs, **texto nativo, estados contables
    completos**) — Ejercicio 122, 1/7/2025 a 30/6/2026. Estado de Situación Patrimonial (Total del
    Activo $64.883.884.065,48 vs. $61.186.189.458,43 del anterior) + Estado de Recursos y Gastos:
    superávit operativo $369.884.150,11, **DÉFICIT del ejercicio $(160.341.727,07)** contra un
    superávit de $902.482.845,95 el año anterior. URL:
    `.../wp-content/uploads/2026/09/firm-lw3939232.pdf` (nombre de archivo opaco, cuelga del post
    `/destacada/memoria-y-balance-ejercicio-122/`).
  - `balance-ejercicio-121-2024-25.pdf` (27 págs) y `memoria-ejercicio-121-2024-25.pdf` (62 págs) —
    `.../uploads/2025/09/BALANCE.pdf` y `.../MEMORIA.pdf`, del post
    `/institucional/balance-general-ejercicio-121-al-30-6-25/`. **Ojo: el BALANCE del 121 sale
    ILEGIBLE con `pdftotext`** (fuentes con encoding roto: el texto extraído es basura tipo
    `$#(."$1#"/"`, NO es un escaneo). Va a necesitar el flujo de OCR del proyecto
    (`pdftoppm -png -r 300` + `tesseract -l spa --psm 6`) antes de poder mapear cifras.
  - `memoria-y-balance-ejercicio-117-2020-21.pdf` (88 págs) —
    `.../uploads/2021/09/memoria-y-balance-30-06-2021_compressed-1.pdf`, el archivo que Wayback
    truncaba a 1.048.576 bytes: bajado entero (1.631.049 bytes) del sitio vivo. **Mismo problema de
    encoding que el 121**: `pdftotext` no encuentra ni "patrimonial" ni "superávit" en las 88
    páginas. Necesita OCR.
- **Nota de método para Ferro**: el sitio tiene un buscador propio (`/search/<término>/`) que además
  expone un feed RSS (`/search/balance/feed/rss2/`) — ese feed fue la forma más rápida de listar
  todos los posts con PDFs de balance de una sola vez, más barato que recorrer categorías. Sirve en
  cualquier WordPress que tenga la búsqueda habilitada.
- **NINGUNO de los 2 balances reales está todavía cargado al sitio** — quedan para una sesión de
  onboarding de datos aparte (esta sesión fue solo de descubrimiento de fuentes).
- Pendiente (REESCRITO 2026-09-22): ya NO faltan el 117 ni el 121 ni el 122 (los 3 están arriba).
  Lo que sigue faltando son los ejercicios ANTERIORES al 117 (116 y hacia atrás): el sitio los
  menciona en actas viejas pero no hay PDF en `wp-content/uploads` para ninguno, y el buscador
  interno solo devuelve posts desde 2021. Además falta el **Balance del Ejercicio 120 (2023-24)** —
  de ese ejercicio solo tenemos la Memoria narrativa; el post
  `/institucional/memoria-y-balance-ejercicio-120/` existe pero NO tiene ningún PDF adjunto (se
  revisó su HTML completo: los únicos `.pdf` de la página son el reglamento de tenis y los manuales
  de contratación, que están en el pie de todas las páginas del sitio). Mismo caso el post
  `/institucional/asamblea-2024-se-aprobo-el-balance/`.
- **Además, hay actas de asamblea escaneadas** (no son estados contables, pero documentan las
  aprobaciones): `.../uploads/2025/10/CamScanner-17-10-2025-11.10.pdf` (32 págs, escaneo OCR-able)
  es el acta taquigráfica completa de la Asamblea General Ordinaria del 28/9/2025. No se descargó al
  proyecto por no aportar cifras, pero queda anotada la URL por si sirve de contexto.
- Pendiente viejo, ya resuelto arriba: el Balance/Estados Contables real del Ejercicio 117 (2020-21) — se encontró
  `memoria-y-balance-30-06-2021_compressed-1.pdf` en el índice de Wayback pero las 2 copias
  archivadas están truncadas a exactamente 1.048.576 bytes (mismo bug de límite de tamaño de Wayback
  Machine ya documentado en la nota de Unión más arriba) y no se pudieron leer — reintentar
  descargando directo de ferrocarriloeste.org.ar cuando el dominio vuelva a responder. También
  pendiente el Ejercicio 121 (2024-25): el índice de Wayback muestra que existieron
  `wp-content/uploads/2025/09/BALANCE.pdf` y `MEMORIA.pdf` (confirmados vía asamblea de socios de
  septiembre 2026 recién aprobada, según X oficial del club) pero la captura de archive.org de esos
  2 archivos específicos devuelve 404 — probablemente autodenegado por robots.txt o nunca crawleado
  completo; reintentar directo del sitio oficial.
- Contacto: no se relevó sección de contacto específica del sitio (dominio caído); redes o Secretaría
  del club.
- Último chequeo: 2026-09-22.

