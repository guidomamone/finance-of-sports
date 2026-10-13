# Gestiones por país: dk

Lo que había como comentario en `data/gestiones/dk.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/dk.js: quién condujo cada club de Dinamarca y desde/hasta cuándo (to-do 149).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
Cargo: 'Formand' (presidente del directorio). Salvo FC Midtjylland (dueño persona con nombre), la gestión es el
bestyrelsesformand de la sociedad que firma el årsrapport (no el direktør: es quien figura en cada informe).
FUENTE: salvo donde se cita otra, el propio årsrapport (ruta del .md en Clubes/Dinamarca/<club>/).
CONVENCION DE FECHAS: el informe dice quién presidía al firmar, no el día del cambio. Cuando el cambio cae
entre dos informes, el nuevo formand asume el primer día del primer ejercicio que firmó (01/01 en los que cierran
el 31/12, 01/07 en los que cierran el 30/06) y el anterior termina esa misma fecha. El primero de cada serie
arranca el primer día de su primer ejercicio con documento (la fuente no da el inicio real). Las fechas
exactas (asamblea) figuran en el comentario de cada gestión.
============================================================================
```

_ob-dk, antes de Niels Thorborg:_

```text
Odense Boldklub A/S. Niels Thorborg figura como "Direktør ... formand" en todos los informes 2014 a 2021.
```
