# León (Club León, S.A. de C.V.)

- Sin PDF. Propiedad de **Grupo Pachuca** (Jesús Martínez), sociedad privada. Es uno de los dos clubes
  del grupo (el otro es Pachuca), y esa multipropiedad es justamente lo que está forzando una venta.
- **Qué se probó y falló (sesión 2026-09-22)**:
  1. `clubleon.mx` devuelve **HTTP 403** a `curl` con User-Agent de navegador real — bloqueo de
     WAF/CDN, no un 404. No se llegó a barrer la home; queda como el único club del barrido con un
     bloqueo de tooling en vez de una ausencia confirmada de sección económica.
  2. **SEC EDGAR full-text**: `"Club Leon"` → 2 resultados, ambos un Form 4 de una persona apellidada
     Leon (falso positivo). `"Grupo Pachuca"` → 3 resultados, todos 6-K de América Móvil
     (patrocinio). Ningún filing propio.
  3. **BMV**: ni Club León ni Grupo Pachuca aparecen en el listado completo de emisoras de capitales al
     22/09/2026.
- **Ángulo pendiente, y es un ángulo REAL con fecha**: la LIGA MX puso mediados de 2026 como plazo para
  eliminar la multipropiedad, y Grupo Pachuca está obligado a ceder hasta el **80% de las acciones**
  del club; a septiembre de 2026 negocia con fondos de inversión internacionales por una operación
  valuada en más de USD 100 millones, sin cierre todavía. **Si el comprador resulta ser un vehículo
  cotizante o que emita deuda registrada, se abre la misma ventana que Ollamani/Club América.** Vale la
  pena rechequear después del cierre de la venta.
- **Chequeo 2026-09-27 (to-do 75, evaluación de Firecrawl): el 403 de `clubleon.mx` RESISTIÓ TODO lo
  que tiene el proyecto, no es un WAF con challenge JS común.** Se probó, en este orden: (1) Firecrawl
  scrape con proxy `stealth` — llegó al servidor y recibió un 403 real (página cPanel "ERROR 403 -
  FORBIDDEN" con lenguaje de "IP Deny rules"/permisos de archivo, no un challenge de Cloudflare); (2)
  Firecrawl `/v1/map` (enumeración de URLs del dominio) — devolvió solo 2 links, señal de que ni
  siquiera el sitemap es accesible; (3) Browser pane real (el mismo método que destrabó Chacarita y
  Newell's) — mismo resultado, `403 - FORBIDDEN`. **Es un bloqueo a nivel de IP/hosting (cPanel),
  no un desafío que un navegador (real o emulado) resuelva** — a diferencia de Chacarita/Newell's, que
  eran un WAF con challenge. No queda ningún ángulo de tooling más para probar; el camino sigue siendo
  el de arriba (esperar el cierre de la venta) o, si Guido quiere, probar desde su propia conexión
  (por si el bloqueo es geográfico/por rango de IP del proveedor de la sesión).
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Es decir: el documento existe y está auditado, pero
  el regulador deportivo lo exige y lo blinda.
- Último chequeo: 2026-09-22.
