# Notas generales — España

Primer barrido de sourcing para España (sesión 2026-09-13). A diferencia de Sudamérica, España no
tiene un regulador único tipo CMF (Chile) o Supersociedades (Colombia) que centralice los balances
de todos los clubes — cada S.A.D. publica (o no) por su cuenta en su propio sitio, casi siempre bajo
el paraguas de una "Ley de Transparencia" (Ley 19/2013) que en la práctica muchos clubes cumplen de
forma voluntaria/parcial aunque no reciban subvención pública que los obligue.

- **LaLiga (laliga.com/en-GB/transparency/economic-management/annual-accounts) NO es un atajo tipo
  CMF para todos los clubes** — confirmado explícitamente esta sesión: esa página solo publica las
  cuentas anuales de LaLiga como organización (la Liga Nacional de Fútbol Profesional en sí), no de
  los clubes individuales. No perder tiempo ahí buscando un club específico.
- **Patrón de bloqueo anti-bot muy variado entre clubes**, tres sabores distintos encontrados:
  1. El HTML de la página se sirve pero sin contenido útil (JS-driven, sin datos en el HTML crudo) —
     Sevilla FC (transparencia), Betis (parcial), Alavés (en el primer intento, se destrabó en el
     segundo con mejor user-agent).
  2. El dominio entero devuelve 403 a cualquier fetch automatizado (WAF/Cloudflare) — Athletic Club
     (`athletic-club.eus`), aunque su CDN de archivos (`cdn.athletic-club.eus`) no tiene el mismo
     bloqueo.
  3. El dominio sirve el HTML normal pero bloquea la descarga directa del PDF específico —
     Villarreal CF (`villarrealcf.es/wp-content/uploads/...`), solucionado con Wayback Machine.
  - **Lección para la próxima sesión**: si un dominio de club da 403/vacío, probar (a) con
    `curl -A "Mozilla/5.0 ..."` con un user-agent de navegador completo antes de asumir bloqueo total
    (funcionó para destrabar Alavés), (b) buscar si el club usa un CDN/subdominio separado para
    archivos (`cdn.<club>.eus`, `cms.bkndagroup.com`, `mediaverse.<club>.hiway.media`, etc. — varios
    proveedores de CMS deportivo español parecen compartir patrón), y (c) Wayback Machine sobre la
    URL exacta del PDF si todo lo anterior falla.
- **`cms.bkndagroup.com`** apareció como backend de transparencia de Deportivo Alavés — vale la pena
  probarlo como sospechoso de primera si otro club chico de La Liga/Segunda da bloqueo similar en su
  dominio principal (parece un proveedor de CMS compartido, no exclusivo de un club).
- **archive.org estuvo "Temporarily Offline" varias veces durante esta sesión** (confirmado con la
  CDX API devolviendo la página de error del propio Internet Archive, no un 404 real) — no es un
  dead-end del club en cuestión, reintentar en una sesión futura antes de asumir que Wayback no tiene
  el snapshot. Afectó específicamente a Villarreal CF (ejercicio 2021-22, snapshot no confirmado
  todavía) y quedó sin intentar del todo para Sevilla FC (ejercicios 2018-19 a 2020-21) y Valencia CF
  (ejercicio 2018-19, dominio legado `seguro.valenciacf.com` ya caído).
- **Varios PDFs bajados son escaneos sin capa de texto** (ej. algunos de Real Betis, el más viejo de
  Celta) — confirmado con `pdffonts` (sin fuentes embebidas = imagen pura) antes de asumir que
  `pdftotext` simplemente no encontró texto por un bug. Estos van a necesitar el flujo de Tesseract
  documentado en `CLAUDE.md` cuando llegue la sesión de mapeo/transcripción.
- Candidato pendiente de explorar en una sesión futura (no estaba en la lista original de 10/11 pero
  surgió como mención en resultados de búsqueda): **RC Deportivo, SD Ponferradina, Real Zaragoza** —
  los 3 tienen página propia de "Ley de Transparencia" confirmada por búsqueda (mismo patrón que
  Betis/Alavés/Villarreal), sin explorar en profundidad todavía. (Getafe CF y RCD Mallorca, que
  estaban en esta misma lista, ya se cargaron en la sesión 2026-09-16 — ver sus fichas.)
- **`statics-maker.llt-services.com/<código-3-letras>/documents/<fecha-subida>/<uuid>-<n>.pdf` — el
  CMS de transparencia MÁS COMPARTIDO encontrado hasta ahora en LaLiga (sesión 2026-09-16).** Mismo
  host, mismo patrón de URL, para AL MENOS: Girona (`/gir/`), RCD Mallorca (`/mll/`), Rayo Vallecano
  (`/ray/`), Getafe (`/get/`), Elche (`/elc/`), Levante (`/lev/`), Real Oviedo (`/ovi/`) — 7 de los 9
  clubes barridos esta sesión. Es un host de archivos puro, sin anti-bot: `curl` con un User-Agent de
  navegador normal alcanza siempre (probado con los 7 códigos de club, siempre 200). La fecha en la
  URL es la fecha de SUBIDA del archivo, no el ejercicio que cubre — hay que confirmar el ejercicio
  por el texto interno del PDF (cuando tiene capa de texto) o por el texto del link en la página que
  lo linkea, nunca asumir por la fecha de la URL sola (pasó con Girona: un archivo subido en 2023-09
  resultó ser el ejercicio 2019-20). Vale la pena, ante un club nuevo de LaLiga con anti-bot en su
  propio dominio, probar directamente si tiene una carpeta en este host (buscando
  `site:statics-maker.llt-services.com "<club>"` o el nombre exacto del club en Google) antes de
  pelearse con el dominio propio.
- **`files.proyectoclubes.com` — otro CDN compartido de transparencia (visto en Mallorca, Rayo
  Vallecano y Real Oviedo para documentos NO financieros — estatutos, reglamentos), pero devolvió
  timeout de conexión (no 403, no bloqueo confirmado) al intentar bajar un PDF financiero de Real
  Oviedo (`files.proyectoclubes.com/oviedo/202201/19102746ro-ccaa-20-21-auditadas.pdf`) en la sesión
  2026-09-16, dos intentos.** Puede ser un problema de red temporal (como el de archive.org
  "Temporarily Offline" ya documentado abajo) — reintentar en una sesión futura antes de asumir que es
  un dead-end del club.
- **RCD Espanyol: la URL corta `rcdespanyol.com/es/transparencia/` está rota — devuelve un loop
  infinito de redirects 302 a sí misma con `curl`, y el browser también la reporta como fallida (sesión
  2026-09-16).** No es un bloqueo anti-bot: es que el club movió la página a una URL más larga,
  `rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones`, y dejó un alias roto en la
  corta. Ante cualquier club cuya URL de transparencia ya documentada empiece a fallar, probar primero
  si cambiaron la URL (buscar "[club] transparencia" de nuevo) antes de asumir un bloqueo nuevo.
- **Registro Mercantil vía agregadores comerciales (einforma.com, axesor, etc.) — sirve para
  CONFIRMAR que un depósito de cuentas existe (gratis, sin login), pero el PDF completo del depósito
  siempre está detrás de un "informe" de pago (sesión 2026-09-16, probado con Real Sociedad).** Mismo
  patrón que el OMPIC marroquí: útil como señal de que vale la pena insistir (o pagar) por un club que
  parece bloqueado por todos los demás ángulos, pero no resuelve el sourcing por sí solo. La vía más
  barata sin explorar todavía es pedir la "publicidad mercantil" directo en `registradores.org` en vez
  del informe comercial del agregador.

## Cómo mantener esta nota

Actualizar cuando un ángulo nuevo de nivel-país se confirme (un CMS compartido nuevo, un patrón de
bloqueo nuevo con su solución) — no hace falta una entrada por cada club individual, eso vive en
`fuentes/España/<Club>.md`.
