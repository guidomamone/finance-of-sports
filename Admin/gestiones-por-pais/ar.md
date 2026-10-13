# Gestiones por país: ar

Lo que había como comentario en `data/gestiones/ar.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/ar.js — quién condujo cada club de Argentina y desde/hasta cuándo (to-do 147, paso 12).

FORMATO NUEVO DE GESTIONES (reemplaza a `gestionesByClub`, que sigue vivo solo para las pestañas
ocultas Pases y Resultados hasta el to-do 149). Un archivo por país, igual que data/club-leagues/:
es un dato sobre personas, que se actualiza con cada elección, no con cada documento.

Cada gestión:
  nombre      el nombre completo, como lo publica la fuente
  corto       el que va en el botón y en la franja del gráfico (el apellido, casi siempre)
  cargo       'Presidente' (en una sociedad, el dueño solo si es una persona con nombre)
  desde       fecha en que ASUMIÓ (no la de la elección), AAAA-MM-DD
  hasta       fecha en que dejó el cargo, o null si sigue
  fuente      de dónde salen las fechas (una URL)
  confirmada  true solo con fuente. Una gestión sin confirmar no se muestra en el sitio.

LOS EJERCICIOS DE CADA GESTIÓN NO SE ESCRIBEN: se derivan. Un ejercicio es de quien estaba en el
cargo el día de su CIERRE (30/6 para un club que arranca el 1/7). La regla que decidió Guido es
"de quien firmó el balance"; las dos coinciden salvo cuando el cambio cae entre el cierre y la
aprobación del balance. Para esos casos existe `firmo` (lista de ejercicios que esta gestión firmó
aunque no estuviera al cierre). Racing 2012/13: cerró con Cogorno (30/6/2013), Blanco asumió el
30/9/2013, así que probablemente aprobó ese balance; la transcripción no trae la página de firmas, y Guido
decidió (2026-10-05) dejarlo con Blanco.
============================================================================
```
