# Chacarita Juniors

**Ángulos**: sitio oficial: parcial — bloqueado por protección anti-bot en TODAS las rutas (ver
detalle abajo), no se pudo verificar el menú completo en vivo · Wayback CDX: agotado (13 PDFs
archivados, ninguno financiero, reconfirmado) · búsqueda web: agotado (sin resultados) ·
regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: chacaritajuniors.com.ar. Índice completo de Wayback
  Machine del dominio: 13 PDFs archivados, ninguno de balance/memoria (solo estatuto, protocolo
  anti-violencia de género y contenido no relacionado).
- Pendiente: todos los ejercicios.
- Contacto: socios@chacaritajuniors.org.ar, tel. +54 11 4553-0304 (sede Teodoro García 3550, CABA,
  L-V 14-20h), o Polideportivo Bahía Blanca 2681 San Andrés, tel. 11-2504-3533.
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

- **Resultado: 0 documentos, con un gotcha.** `chacaritajuniors.com.ar` devolvió **HTTP 429 (rate limit)** durante el barrido — o sea que el sitio existe y responde pero limita las peticiones seguidas; una sesión futura debería espaciar los requests en vez de asumir que está caído. Wayback: 13 PDFs archivados en el dominio, ninguno financiero.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — el 429 NO es rate limit, es un bloqueo de bot-protection persistente

**Corrección al chequeo anterior**: lo que el 2026-09-22 interpretó como "rate limit, espaciar
requests" no lo es — es un WAF de Vercel ("Vercel Security Checkpoint") que bloquea la petición
automatizada DESDE EL PRIMER intento, sin importar el espaciado. Confirmado de tres formas
independientes esta sesión, todas con el mismo resultado (HTTP 429 + página "Vercel Security
Checkpoint"):
1. `curl` con `User-Agent` de navegador y 5-8 segundos de espera entre requests, sobre
   `chacaritajuniors.com.ar` (apex) — 429 en el primer intento, sin mejorar con la espera.
2. `curl` sobre `www.chacaritajuniors.com.ar` (el subdominio que SÍ aparece indexado en Google, con
   rutas reales como `/nuevosocio.php`, `/futbol`, `/el-club/comision-directiva`) — mismo 429 en
   TODAS las rutas probadas (`el-club`, `institucional`, `transparencia`, `balance`, `socios`, etc.),
   incluida la home.
3. `WebFetch` (que usa un cliente distinto a `curl`) sobre la home — también HTTP 429.
- **No se pudo verificar el menú completo del sitio en vivo esta sesión tampoco** — la familia 1 sigue
  sin poder darse por agotada del todo mientras este bloqueo siga en pie. Queda pendiente para una
  sesión que use el Browser pane (navegador real, no `curl`/`WebFetch`) para completarla — no se probó
  acá porque esta sesión tenía el pane reservado para otros 6 agentes en paralelo.
- Wayback CDX del dominio completo con filtro de balance/memoria/transparencia/institucional/contable
  en el nombre de URL: reconfirma los mismos 13 PDFs de septiembre (estatuto, protocolo de género,
  etc.), más dos páginas HTML "balance-de-agosto-2021" y "balance-septiembre-2021" que por el nombre
  son recaps mensuales de recaudación (mismo patrón que Nueva Chicago), no balances anuales — no se
  intentó abrir el snapshot en detalle porque el 429 también aplica a Wayback cuando redirige al
  origen, pero el patrón de nombre ya descarta que sea un ejercicio contable.
- Búsqueda web dirigida (`filetype:pdf` + nombre + "memoria y balance"/"estados contables"): sin
  resultados relevantes.
- Último chequeo: 2026-09-26.
