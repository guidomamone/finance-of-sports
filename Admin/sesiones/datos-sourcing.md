# Cierre de la rama datos-sourcing (worktree fos-datos), sesión Datos 2

Lo anterior al merge del 2026-10-18 ya pasó a TODO y CHANGELOG (copia en `Admin/Archive/sesion-datos-sourcing-2026-10-18-f.md`).

## Después del merge del 2026-10-18 (Datos 2)

### Qué cambió (CHANGELOG)

- **273 (a): camisetas de la página del club, escritas** (ok de Guido a la muestra): `estadio-sponsor.mjs --escribir` desde la caché
  (`_clubes.json`), sponsor o marca en 46 ejercicios con su fuente en `club`. `data/sponsors.js` suma 73 entradas con fuente propia (de
  1001 ejercicios: sponsor 89%, marca 93%). Verificado con node que la fuente de cada campo resuelve a la página del club (Sporting CP
  2001, Almagro 2021, Alianza Lima 2022). ASSET_V 1309. No se pudo mirar en pantalla: el servidor local (puerto 8971) lo tenía otra sesión.
- **252: Gladbach y Stuttgart (ok de Guido para el formulario).** El Unternehmensregister y el Bundesanzeiger no respondieron hoy
  (timeout desde la terminal y "navigation failed" en el navegador). Una búsqueda web no encontró el Jahresabschluss 2024/25 de ninguno
  de los dos en sus sitios; VfB publica solo la nota con las cifras de la asamblea. Quedan "a revisar" para la próxima revisión mensual.

### Qué queda (TODO)

- 273 (a): ~110 ejercicios sin sponsor, a mano con fuente en `tools/contexto-manual.json` (lista: `node tools/estadio-sponsor.mjs
  --ensayo --detalle`).
- 252: Gladbach y Stuttgart en el Unternehmensregister cuando vuelva a responder.

### Qué deja de ser cierto en ESTADO

- "Estadio, capacidad, sponsor…": la página del club ya es la tercera fuente para sponsor y marca (`--camisetas`), escrita.

## Después del merge de las camisetas (2026-10-18)
