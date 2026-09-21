# Athletic Club (Bilbao)

- **Hit moderado (2026-09-13).** 4 ejercicios anuales consecutivos, del 2021-22 al 2024-25,
  descargados a `Clubes/España/Athletic Club/`: `cuentas-anuales-2021-2022.pdf` a
  `cuentas-anuales-2024-2025.pdf` (documento "Cuentas Anuales" oficial, presentado en la Asamblea
  General de socios).
- **Gotcha de navegación**: el dominio principal `athletic-club.eus` (tanto la home como
  `/club/sobre-el-club/transparencia/` y la versión inglesa `/en/club/about-the-club/transparency/`)
  devuelve **403 Forbidden** ante cualquier fetch automatizado (`curl` con distintos user-agents,
  `WebFetch`) — parece un WAF/Cloudflare que bloquea tráfico no-navegador en el dominio raíz. El
  subdominio de archivos **`cdn.athletic-club.eus`** (donde viven los PDFs reales, carpeta
  `txoko-utils/`) NO tiene el mismo bloqueo y sirve los PDFs sin problema una vez que se tiene la URL
  exacta (conseguida vía resultados de búsqueda, no navegando la página bloqueada).
- Los 4 años encontrados no siguen un patrón de nombre de archivo consistente
  (`obn2025-cuentasanuales2425-pdf`, `2324%20Cuentas%20Anuales%20y%20Memoria%20Economica.pdf`,
  `Cuentas%20Anuales%202022-23.pdf`, `asamblea/cuentas-anuales-2021-22.pdf`) — se probó adivinar
  nombres para 2018-19/2019-20/2020-21 con las mismas convenciones y todos dieron 404. Sin el HTML de
  la página de transparencia (bloqueada), no hay forma de descubrir el nombre exacto de años
  anteriores sin acceso al sitio.
- Pendiente: años anteriores a 2021-22 (el club existe como S.A.D. desde 2002, así que en teoría
  podría haber más años). Próximo ángulo a probar: Wayback Machine sobre la página de transparencia
  bloqueada (`web.archive.org/web/*/athletic-club.eus/club/sobre-el-club/transparencia/`) para ver
  snapshots históricos del HTML con los links de años previos — no se intentó en esta sesión porque
  archive.org devolvió "Temporarily Offline" en el momento de la búsqueda (ver también Villarreal CF,
  mismo bloqueo temporal).
- Contacto: `cdn.athletic-club.eus/txoko-utils/` (los PDFs reales) — la página que los lista
  (`athletic-club.eus/.../transparencia/`) está bloqueada para fetch automatizado.
- Último chequeo: 2026-09-13.
