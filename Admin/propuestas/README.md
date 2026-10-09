# Propuestas de cambios al script, medidas y NO aplicadas

Cada `.diff` lo escribió y midió un Sonnet en una copia del repo (2026-10-09); se aplica con `git apply Admin/propuestas/<archivo>.diff` desde la raíz (`-p1`). No están aplicados: cada uno necesita el ok de
Guido y volver a medir antes y después con `Admin/prueba-completa.txt` y los 177 documentos de Italia (skill `club-or-year-onboarding`, sección 5). Los informes están en `Admin/TODO.md`, puntos 188 y 189.

- `188-costos-financieros-codice-civile.diff`: el escalón "17) resta" también cuando el .md no trae el 17), el total de C probado del último subtotal al primero y la D que la extracción dejó en el financiero.
- `189-ano-vecino-con-ajustes.diff`: el chequeo del año vecino usa los ajustes `fila` de cada documento (columna actual), con la regla "ok si coincide con o sin ajustes", más el campo nuevo `fila-anterior`.
- `medir-carga.mjs` y `medir-vecino.mjs`: los scripts con los que se midió (comparan lo que se carga y los chequeos del vecino); hay que apuntarlos a las copias de trabajo.
