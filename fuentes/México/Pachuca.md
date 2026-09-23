# Pachuca (Tuzos — Club de Fútbol Pachuca)

- Sin PDF. Propiedad de **Grupo Pachuca** (Jesús Martínez), sociedad privada, la misma tenedora que
  controla a León (ver `León.md`) y al Real Oviedo en España.
- **Qué se probó y falló (sesión 2026-09-22)**:
  1. `tuzos.com.mx` devuelve **HTTP 403** a `curl` con User-Agent de navegador real (mismo bloqueo de
     WAF/CDN que `clubleon.mx`, los dos sitios del grupo) — no se llegó a barrer la home.
  2. **SEC EDGAR full-text**: `"Pachuca"` → 632 hits, todos irrelevantes (la ciudad, en filings de
     mineras, América Móvil, ICA). `"Grupo Pachuca"` → 3 hits, todos 6-K de patrocinio de América
     Móvil. Ningún filing propio.
  3. **BMV**: no aparece en el listado completo de emisoras de capitales al 22/09/2026.
  4. **Vía Real Oviedo (España), descartada**: el grupo controla una S.A.D. española que sí deposita
     cuentas, pero esas cuentas son de la filial española y consolidan hacia ARRIBA, no hacia abajo —
     no exponen cifras de Pachuca ni de León. Es el caso INVERSO al de Atlético San Luis (ver
     `Atlético San Luis.md`), donde el club mexicano SÍ es la filial del club europeo que publica.
- **Ángulo pendiente**: si Grupo Pachuca capitaliza el grupo con un socio cotizante (hoy solo negocia
  la venta de León), la nota de segmentos o de combinación de negocios del comprador sería la ventana.
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Es decir: el documento existe y está auditado, pero
  el regulador deportivo lo exige y lo blinda.
- Último chequeo: 2026-09-22.
