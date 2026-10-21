---
name: producto-y-pantalla-finance-of-sports
description: Cómo se diseña y se construye una pantalla o un cambio visible del sitio finance-of-sports, del pedido a la verificación en celular. Usar siempre que Guido pida una pantalla, un card, un cambio de diseño o un texto visible, antes de tocar `index.html`, `js/` o `css/`. Las reglas de código y las trampas están en `Admin/PANTALLA.md`; esto es el orden.
---

# Una pantalla, de punta a punta

1. **Leer** `Admin/ESTADO.md` y, de `Admin/PANTALLA.md`, solo la sección de la pantalla que se toca («Cómo funciona cada pantalla») y «Convenciones de pantalla y código».
2. **Mockup antes de código.** Un cambio que se ve (un card, una tabla, un flujo) se dibuja primero en `Prototyping/<Tema>/mockup-N.html` con números reales del motor, o en el artifact de Design «Pantallas FoS». Guido lo ve y dice sí o no. Sin su ok no se construye. Si dice no, se rehace el mockup, no el código.
3. **Construir** lo aprobado y nada más. Cada texto visible pasa por `t()` (español e inglés). Un archivo de `js/` que llame a `t()` va en la lista de `tools/audit.js`. Lo que se escribe en `index.html` o `js/` viaja al visitante: sin comentarios internos.
4. **Verificar, siempre, sin pedirle a Guido que mire:**
   - `preview_start` y recarga con `?cb=<nuevo>` (subí `ASSET_V` si tocaste `js/` o `data/`).
   - Servido y abierto como archivo (`file:///…/index.html`), navegando desde la portada y entrando directo a `/club/<id>` y `/liga/<id>`.
   - `?audit=1` en la consola: no crecen los «no cierran» ni los warnings.
   - Escritorio y 375 px (`resize_window` preset `mobile`), en español y en inglés, sin scroll horizontal ni texto cortado a la mitad de una palabra.
   - `read_console_messages`: sin errores nuevos.
   - `node tools/audit.js`: 0 P0 y 0 P1.
   - El detalle de qué se prueba y las trampas del navegador: `referencia/navegador-de-preview.md`.
5. **Dejar escrito:** lo que la pantalla hace hoy, en `Admin/PANTALLA.md` («Cómo funciona cada pantalla»); si se decidió una regla, en «Convenciones de pantalla y código». El mockup aprobado se conserva en `Prototyping/` con una nota arriba que diga qué decisiones explica y que sus números son del día en que se hizo.
6. Commit local. Nada de push.

## Cómo mantener esta skill

Si aparece un paso que no está acá, proponele a Guido el texto exacto y esperá su ok.
