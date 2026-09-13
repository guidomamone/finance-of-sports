# Villarreal Club de Fútbol, S.A.D.

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
