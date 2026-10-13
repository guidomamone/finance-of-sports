# Gestiones por país: it

Lo que había como comentario en `data/gestiones/it.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/it.js: quién condujo cada club de Italia y desde/hasta cuándo (to-do 149).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre;
donde el dueño es un fondo o una holding (Milan, Inter desde 2024, Monza) se carga el presidente del
consejo de administración, que es quien firma el balance. Cuando la fuente da solo el año, el día es 01
por convención (se avisa en el comentario de la gestión).
============================================================================
```
