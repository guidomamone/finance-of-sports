# Cierre de la sesión del worktree `pipeline` (rama `pipeline`)

La sesión principal pasa esto a CHANGELOG, TODO y ESTADO al mergear, y después lo archiva en `Admin/Archive/`.

## Qué cambió (para CHANGELOG)

- **Ajuste `caja` / `deuda` por PDF y año (to-do 263).** `tools/ajustes.mjs --agregar <pdf> caja|deuda --valor X --anio AAAA`; en
  `caja-deuda.mjs` el escalón 0 toma el ajuste de ese año, y uno sin año vale solo si el PDF alimenta un único año del club. Ajustes por
  año escritos para Dortmund 2024 (deuda 28.701, caja 4.360 TEUR, comparativo del informe 2024/25) y 2025 (34.173 / 20.633), y RB Leipzig
  2025 (162.104 TEUR / 714.561,87 EUR). Medido: `--medir --detalle`, lote `prueba-completa` y ensayo `--club` de los 259 clubes idénticos
  salvo Dortmund y Leipzig.
- **Diccionario de deuda italiano (to-do 262):** suma `obbligazioni*` y `debiti verso soci per finanziament*`. `--medir`: deuda 164 → 168
  iguales, 13 → 11 distintos, sin errores nuevos; caja, lote y ensayo de clubes idénticos. La compuerta del total impreso (el diseño
  original del to-do) quedó en HALLAZGOS con su medición.
- **`tools/worktree.mjs preparar`:** saltea las otras copias de `.claude/worktrees/` (reventaba con ENOENT en la primera).

## Qué queda pendiente (para TODO)

- **Escribir Dortmund y RB Leipzig en `data/`** (decisión de Guido: en la carpeta principal, después del merge; sin API, solo escalón 0):
  `node tools/caja-deuda.mjs --club dortmund-de --escribir && node tools/caja-deuda.mjs --club rbleipzig-de --escribir`. Escribe Dortmund
  2024-2025, Leipzig 2022 y 2025.
- **RB Leipzig 2024 sin dato (escala):** el comparativo 30.06.2024 del jahresabschluss-2024-25 está impreso en TEUR (caja 783, préstamos
  de Red Bull 153.717, .md L531), pero `caja-deuda.mjs` detecta para ese año la escala EUR (1e-6), así que un ajuste "tal cual impreso"
  daría 0,15 M. Mismo problema de fondo que Leipzig 2023 y HSV 2024 (to-do 260, "sin escala del documento"): la escala del año, no el
  ajuste.
- **Genoa 2022 sigue mal en `--medir`** (15,7 M contra 95,7 M): le faltan las filas "4 bis) … oltre l'esercizio successivo" y "altri
  finanziatori".
- **Duda de criterio (Guido decide; no se reabrió):** ¿el factoring de "debiti verso altri finanziatori" es deuda? En Monza 2024 se
  decidió que no (ajuste del 2026-10-17: 0); en Genoa 2022 el sitio publica 95,7 M que lo incluyen (30,4 M con Banca Sistema, .md L2637).

## Qué deja de ser cierto en ESTADO

- En la línea de caja y deuda: Dortmund 2024-2025 y RB Leipzig 2022/2025 ya no esperan al to-do 263 (falta solo escribirlos);
  RB Leipzig 2024 pasa a "sin escala del documento", con Leipzig 2023 y HSV 2024.
