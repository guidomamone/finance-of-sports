# Rama `pantallas`

## Pantallas 3 (2026-10-19)

### Qué cambió (para CHANGELOG)

- 284: Fredrikstad 2012 con estadio, capacidad (13.300), sponsor (Stabburet, principal de FFK desde marzo de 2010 durante siete temporadas, hasta
  diciembre de 2016) y marca (Adidas, desde febrero de 2012) en `tools/contexto-manual.json`, con fuentes. La compuerta de estadio y sponsor lo acepta
  (`--club fredrikstad-no --anio 2012 --liga no-eliteserien --cierre 12-31`). Sarpsborg 08 no se tocó.
- 195: Fortaleza 2025 con el CEO Pedro Martins (decisión de Guido) en `data/gestiones/br.js`, desde 2025-12-28 (el club lo confirmó ese día) y `firmo: [2025]`
  porque una nota habla del 2026-01-03 como inicio formal; Barreira y Cals dejan de cargarse. Nota en `Admin/carga-clubes/fortaleza-br.md`. ASSET_V 1398.
- `node tools/gestiones-tanda.mjs --armar`: 0 casos de gestión pendientes en la cola, no se armó tanda.

### Qué queda (para TODO)

- 284: correr el lote 95 para cargar el FLI de Fredrikstad 2012 (comando abajo; la 2013-2018 ya están). Después borrar 284 de Fredrikstad del TODO.
- 195: borrar el punto de Fortaleza. Falta del club la fecha exacta de asunción de Martins (ya en la nota del club).
- 282: Hamburgo 2024 espera el PDF del Bestätigungsvermerk del ejercicio 2023/24 (captcha de Guido); después se transcribe y se carga la línea de
  `Admin/registros/auditoria.jsonl`. La (f) es de Pipeline 4.
- 273 y 309: diseño mostrado a Guido, esperan su confirmación del texto / de `wiki.n` como respaldo de `leagueSize` (223 liga-años); no se tocó nada.

### Qué deja de ser cierto en ESTADO

- Nada de ESTADO cambia todavía; cuando se cargue Fredrikstad 2012 y se resuelva el 309, `ESTADO-clubes.md` se regenera solo.
