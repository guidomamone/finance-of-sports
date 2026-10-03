# Villarreal Club de Fútbol, S.A.D.

**Ángulos**: sitio oficial: parcial — falta 2019-20, 2020-21 y 2022-23 (no aparecen en ningún listado) · Wayback CDX: agotado (wp-content/uploads 28 PDFs + images/el-club/transparencia) · búsqueda web: no intentado · regulador/país: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Hit débil (2026-09-13).** 1 solo ejercicio real descargado a `Clubes/España/Villarreal CF/`:
  `cuentas-anuales-2023-2024.pdf` (20 páginas).
- **Gotcha de bloqueo**: el dominio `villarrealcf.es` bloquea con **403 Forbidden** cualquier fetch
  directo de sus PDFs alojados en `/wp-content/uploads/...` (confirmado con `curl` con varios
  user-agents/headers de navegador, y con `WebFetch`) — a diferencia de Athletic Club (que bloqueaba
  el HTML pero no el CDN de PDFs), acá el bloqueo es sobre el PDF mismo, probablemente Cloudflare
  anti-hotlinking. **La vuelta que funcionó**: la CDX API de Wayback Machine
  (`web.archive.org/cdx/search/cdx?url=<url exacta>&output=json`) confirmó un snapshot existente del
  PDF de 2023-24, y descargarlo vía `web.archive.org/web/<timestamp>if_/<url>` (con el modificador
  `if_` para servir el contenido crudo sin el chrome de la Wayback Machine) sí funcionó — mismo
  método que ya documenta el skill para dominios oficiales caídos, aplicado acá a un dominio vivo
  pero que bloquea bots.
- **Pendiente por causa externa, no por el club**: se identificó también la URL del ejercicio
  2021-22 (`villarrealcf.es/wp-content/uploads/2023/02/2.b.ii-CCAA-Villarreal-21-22-firmadas-1.pdf`)
  pero la consulta a la CDX API de Wayback para esa URL específica coincidió con una caída temporal
  de todo archive.org ("Internet Archive: Temporarily Offline", confirmado en dos intentos
  separados) — no es un dead-end del club, es que el servicio externo estaba caído en el momento de
  la sesión. Reintentar esta URL puntual (y buscar más años con el mismo patrón
  `villarrealcf.es/wp-content/uploads/<año-subida>/<nombre>.pdf`) en cuanto Wayback esté disponible
  de nuevo.
- Contacto: `villarrealcf.es/es/transparencia-economico-financiera/` (la página en sí también
  bloquea fetch automatizado, no se pudo enumerar el listado completo de años) — usar Wayback Machine
  sobre las URLs de PDF ya conocidas o descubiertas por búsqueda, no pelear con el bloqueo directo.
- Último chequeo: 2026-09-13.
- Color de marca: `#FFD733` — tabla por liga de footylogos (LaLiga), 1er color, exacto, verificado
  2026-09-21.

## Sourcing España/Francia (2026-10-03)

Se bajaron por Wayback (el dominio da 403 al PDF directo): 2021-22 (`wp-content/uploads/2023/02/2.b.ii-CCAA-Villarreal-21-22-firmadas.pdf`, 103 págs. — el pendiente de la sesión anterior), 2018-19 (`images/el-club/transparencia/3.a.v CCAA Villarreal 18-19.pdf`, 64 págs.) y 2024-25 (`wp-content/uploads/2026/02/3.a.v-CCAA-Villarreal-24-25-firmado.pdf`, 104 págs.). Con 2023-24 → **4 ejercicios**. Falta uno para llegar a 5: 2019-20, 2020-21 o 2022-23, que no figuran en el listado de Wayback del dominio (ver aviso de la caída de archive.org en `_notas-generales.md`).

PDFs guardados en `Clubes/España/Villarreal CF/` (no se transcribieron ni se cargaron al sitio). Último chequeo: 2026-10-03.
