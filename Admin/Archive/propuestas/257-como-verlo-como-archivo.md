# 257: mudar «Cómo verlo como archivo» a la referencia del navegador de preview

Propuesta, sin aplicar nada. Guido tiene que ver el texto exacto antes de su ok (cambio a una skill).

**Qué es.** En `Admin/PANTALLA.md`, bajo «Verificar en el browser de verdad, no solo revisar los números a mano», quedó un párrafo que explica cómo abrir el sitio como archivo (`file://`) con Chrome sin ventana y mirar la captura. El texto aprobado de `producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md` dice que el sitio se prueba abierto como archivo, pero no dice cómo; el cómo quedó en `PANTALLA.md`. Es un paso de la misma verificación y va con el resto.

**Qué se cambia.**
1. `.claude/skills/producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md`: después del primer párrafo de «Qué se prueba, siempre» (el que termina en «`audit.js` lo chequea (`index-file-roto`).»), se agrega el párrafo de abajo. El bloque siguiente es el texto exacto que reemplaza a esa última frase (la primera línea ya existe):

````
`audit.js` lo chequea (`index-file-roto`).

**Cómo verlo como archivo.** El Browser pane abre un `file://` como una captura sin estilos y el navegador de Guido no se maneja: se usa Chrome sin ventana, con la ruta del worktree y una salida en el scratchpad:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --allow-file-access-from-files --window-size=1280,1600 --virtual-time-budget=8000 --screenshot=<scratchpad>/x.png "file:///…/index.html?tab=liga"
```

Después se mira la imagen con Read.
````

2. `Admin/PANTALLA.md`: se borra el párrafo «Cómo verlo como archivo: …» (4 líneas, con el comando) y queda solo la línea que apunta a la skill. No es skill; no pasa por el candado.

**Qué no cambia.** El resto de `navegador-de-preview.md` y de `PANTALLA.md`.
