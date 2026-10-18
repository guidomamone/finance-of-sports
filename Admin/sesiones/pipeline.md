# Cierre de la sesión pipeline (worktree fos-pipeline, rama pipeline)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- **La escala del año en caja-deuda (to-do 289).** `tools/caja-deuda.mjs`, `escalaDe`: escalón 0, ajuste manual `escala`
  (`unidades` | `miles` | `millones`, por PDF y año con `--anio`, campo nuevo en `tools/ajustes.mjs`); escalón 1, `factorPorIngresos`
  como antes. Lo usan todos los lugares de `contexto()` y `--medir --escalas`. Medido sin ajustes: `--medir --detalle` y ensayo `--club`
  de los 259 clubes, idénticos antes y después. Con los ajustes nuevos, `--medir` sigue idéntico.
- **Ajustes escritos** (`Admin/registros/ajustes-manuales.jsonl`, leídos por subagente Sonnet y revisados contra el `.md`):
  RB Leipzig 2024 (escala miles; caja 783 TEUR; deuda 153.717 TEUR), RB Leipzig 2023 (escala miles; caja 765.425,23 EUR; deuda 111.731
  TEUR), HSV 2024 (escala miles; caja 35.723.518,58 EUR). Ensayo: Leipzig 4 de 4 años vacíos, HSV 1 de 2.

## Qué queda pendiente (para TODO)

- **Escribir caja y deuda en `data/`, en la carpeta principal después del merge** (sin API: escalón 0). Junto con lo que ya dejó la
  sesión anterior:
  `node tools/caja-deuda.mjs --club dortmund-de --escribir && node tools/caja-deuda.mjs --club rbleipzig-de --escribir && node tools/caja-deuda.mjs --club hamburgersv-de --escribir`
  Escribe Dortmund 2024-2025 y RB Leipzig 2022-2025, más HSV 2024 caja.
- **HSV 2024 deuda:** espera la decisión de Guido: ¿entra la Wandelschuldverschreibung (bono convertible) de TEUR 30.000? Con ella, 57.848 TEUR (lo que HSV imprime como Finanzverbindlichkeiten, .md L563); sin ella, 27.848 (como 2025, donde la WSV pasó a una línea propia fuera de Verbindlichkeiten). Con la decisión: `node tools/ajustes.mjs --agregar "Clubes/Alemania/Hamburger SV/fussball-ag-jahresabschluss-2023-24.pdf" deuda --anio 2024 --valor <57848 o 27848> --motivo "..."`.

## Qué deja de ser cierto en ESTADO

- El to-do 289 se cierra. RB Leipzig 2023-2024 y HSV 2024 dejan de estar "sin escala del documento" en caja-deuda.

## Para fos-onboarding (cómo se carga)

- Nada cambia mientras un documento no tenga un ajuste `escala`. El campo nuevo `escala` existe solo en esta rama hasta el merge.
