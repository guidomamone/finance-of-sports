# Cierre de la sesión pipeline (worktree fos-pipeline, rama pipeline)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- **La escala del año en caja-deuda (to-do 289).** `tools/caja-deuda.mjs`, `escalaDe`: escalón 0, ajuste manual `escala`
  (`unidades` | `miles` | `millones`, por PDF y año con `--anio`, campo nuevo en `tools/ajustes.mjs`); escalón 1, `factorPorIngresos`
  como antes. Lo usan todos los lugares de `contexto()` y `--medir --escalas`. Medido sin ajustes: `--medir --detalle` y ensayo `--club`
  de los 259 clubes, idénticos antes y después. Con los ajustes nuevos, `--medir` sigue idéntico.
- **Ajustes escritos** (`Admin/registros/ajustes-manuales.jsonl`, leídos por subagente Sonnet y revisados contra el `.md`):
  RB Leipzig 2024 (escala miles; caja 783 TEUR; deuda 153.717 TEUR), RB Leipzig 2023 (escala miles; caja 765.425,23 EUR; deuda 111.731
  TEUR), HSV 2024 (escala miles; caja 35.723.518,58 EUR; deuda 57.848 TEUR, con el bono convertible por decisión de Guido). Ensayo: Leipzig 4 de 4
  años vacíos, HSV 2 de 2.

## Qué queda pendiente (para TODO)

- **Escribir caja y deuda en `data/`, en la carpeta principal después del merge** (sin API: escalón 0). Junto con lo que ya dejó la
  sesión anterior:
  `node tools/caja-deuda.mjs --club dortmund-de --escribir && node tools/caja-deuda.mjs --club rbleipzig-de --escribir && node tools/caja-deuda.mjs --club hamburgersv-de --escribir`
  Escribe Dortmund 2024-2025, RB Leipzig 2022-2025 y HSV 2024.
- **Criterio nuevo de deuda (decisión de Guido, 2026-10-18), para `Admin/CONVENCIONES-DATOS.md` y la skill `club-data-mapping`:** un bono
  convertible (Wandelschuldverschreibung) es deuda financiera y entra en `grossDebt`. Caso: HSV 2024, 57.848 TEUR con la WSV de 30.000.
  HSV 2025 (22,03 M, ya publicado) no la tiene porque el documento la saca de Verbindlichkeiten a una línea propia (B.): revisar si 2025
  debería sumarla. No se tocó.

## Qué deja de ser cierto en ESTADO

- El to-do 289 se cierra. RB Leipzig 2023-2024 y HSV 2024 dejan de estar "sin escala del documento" en caja-deuda.

## Para fos-onboarding (cómo se carga)

- Nada cambia mientras un documento no tenga un ajuste `escala`. El campo nuevo `escala` existe solo en esta rama hasta el merge.
