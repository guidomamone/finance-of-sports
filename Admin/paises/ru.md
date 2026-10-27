<!-- md: el camino de entrada de Rusia (JSON del fisco en vez de PDF), sin reglas de datos de categoría | leer: al cargar o corregir un club de Rusia -->
# Rusia

## Pipeline de Rusia (GIR BO): otro camino de entrada

Rusia no sale de PDFs. Para cada club hay un JSON oficial del fisco ruso (`Clubes/Rusia/<Club>/bfo-AAAA-datos.json`), así que el camino
reemplaza las etapas 2 a 7 y comparte la 8 (cargar) y la 9 (un commit por año, sin push). El proceso completo, con ejemplos, está en la
sección Rusia de `Admin/COMO-CORRE-EL-PROYECTO.html`; el detalle de cada escalón, en la cabecera de cada script.

- Escalón 1, `tools/bfo-rusia.mjs` (gratis, sin IA): el formulario 2 ruso con un mapa fijo de código a categoría. Compuerta: la suma de
  los renglones da el 2300 impreso. Si no cierra, el año no se carga.
- Escalón 2, `tools/bfo-rusia-notas.mjs` (IA barata, la corre Guido con `--ejecutar`): abre los renglones del formulario 2 con las tablas de
  las notas explicativas. Compuerta aritmética sin IA: las filas suman el código del formulario 2. Si no suma, el año queda con el renglón
  entero del escalón 1.
- Formulario 6, también en `tools/bfo-rusia.mjs`: para los clubes que reciben aportes (sin fines de lucro o con aportes del dueño o del
  gobierno regional). Compuerta del propio formulario: 6100 + 6200 − 6300 = 6400.
- Ensayo por defecto: `node tools/bfo-rusia.mjs [--club <Club>]` no escribe el sitio. `--escribir` carga (con la misma función
  `escribir()` de `cargar.mjs`, que audita y revierte si da P0/P1) y `--reemplazar` reescribe los años ya cargados que tienen tablas de
  notas o formulario 6.
