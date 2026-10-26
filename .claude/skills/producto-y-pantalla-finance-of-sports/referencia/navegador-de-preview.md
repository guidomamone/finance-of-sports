# Verificar una pantalla en el navegador

## Qué se prueba, siempre

**El sitio anda de dos maneras y se prueban las dos antes de pedir el merge:** servido (el preview de `launch.json`, y `/club/<id>` y `/liga/<id>` directos y navegando desde la portada) y abierto como archivo (`file:///…/index.html`). Por eso `index.html` no lleva `<base>` fijo ni rutas que empiecen con `/`: con `file://` la raíz es la del disco y la página sale sin estilos ni scripts. Las cargas dinámicas y los links que arma el JS pasan por `fosUrl()` de `js/i18n.js`. Solo las páginas generadas de `club/` y `liga/` llevan `<base>`. `audit.js` lo chequea (`index-file-roto`).

**Cómo verlo como archivo.** El Browser pane abre un `file://` como una captura sin estilos y el navegador de Guido no se maneja: se usa Chrome sin ventana, con la ruta del worktree y una salida en el scratchpad:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --allow-file-access-from-files --window-size=1280,1600 --virtual-time-budget=8000 --screenshot=<scratchpad>/x.png "file:///…/index.html?tab=liga"
```

Después se mira la imagen con Read.

**La cuenta a mano no alcanza.** Verificar que `revenueLines` y `expenseLines` suman el total impreso es necesario, pero un bug de display no aparece sin abrir el sitio. Después de tocar una función de display o de conversión: `preview_start`, cambiar de club, tocar los dos toggles (moneda y Formato del club o simplificado) y leer los números en pantalla. `verifyTieOuts()` corre en moneda nativa, nunca pasa por el toggle y no detecta una doble conversión.

**Un ejercicio recién categorizado se mira línea por línea.** Que `verifyTieOuts()` pase y que «Formato del club» se vea bien no alcanza: abrir «Formato simplificado» y confirmar que ningún bucket que debería tener plata (según el documento) está en $0. Un bucket en $0 sin explicación es la señal de que algo quedó enterrado en `items` en vez de promovido a su categoría (por ejemplo una línea real de televisión bajo `lump_football_operations`: el total cierra igual).

## Trampas del navegador de preview

- **Caché de `data/*.js`, `js/*.js` o del propio `index.html`.** Si después de editar los números o estilos siguen viejos aunque `curl` ya muestre el archivo nuevo, es caché antes que un bug. No alcanzan: `location.reload()`, `Cmd+Shift+R`, relanzar `preview_start`, abrir una pestaña nueva, cambiar el puerto de `.claude/launch.json` (la caché HTTP se comparte por origen entre pestañas). Lo que funciona: cambiar la URL. Para los scripts, subir `ASSET_V` (la constante y cada `?v=`, regla en `Admin/PANTALLA.md`, «CACHE DE ASSETS») a un valor que nunca se pidió, navegar, confirmar y dejarlo limpio. Para el `index.html` mismo, navegar con `?cb=<algo nuevo>` en la URL de nivel superior; confirmar con `window.ASSET_V` antes y después.
- **Confirmar antes de concluir.** Con `javascript_tool` (`Object.keys(algunaConstDeEseArchivo)`, `document.querySelector('style').textContent.includes('tu regla')`) tanto antes de concluir que algo no funciona como antes de concluir que sí: `read_console_messages` de una pestaña reusada puede mostrar un error ya arreglado. Si el error es sospechosamente el mismo, volver a chequear el estado real.
- **`read_console_messages` sin filtro trae el ruido de analytics del sitio en local.** Pasar `onlyErrors: true` o un `pattern` (el texto del error que se busca).
- **Un diálogo nativo abierto (`alert`, `confirm`) congela también las herramientas.** Si `javascript_tool` da timeout, un `setTimeout` corto no resuelve o un `loadClubData()` queda pendiente con su request en 200, es un `alert()` abierto: bloquea el hilo entero. Se destraba navegando con `force:true`. Ningún camino de error del sitio usa `alert()`.
- **El screenshot sale en blanco si la página está scrolleada** (`window.scrollY > 0`, sin importar cómo se llegó). Con `scrollY === 0` sale bien. Para capturar algo largo: `resize_window` con un `height` grande (2500-3000), capturar, y volver con `resize_window({preset:'desktop'})`. `zoom` con `region` devuelve la imagen completa. Es una limitación de la herramienta, no del sitio.
