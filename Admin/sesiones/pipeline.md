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

- **La numeración "bis" en caja-deuda (to-do 290).** `sinCodigo` (`tools/caja-deuda.mjs`) y `claveFamilia` (`tools/vocabulario.mjs`) sacan
  "4 bis)", "5-bis)", "17bis)", "15 bis )" (y "ter") como sacaban "4)": el diccionario de deuda ve "4 bis) Debiti verso banche oltre
  l'esercizio successivo". Medido: `--medir` deuda, distintos de lo cargado 11 → 10 (sale Genoa 2022, que daba 15,68 M contra 95,7 M:
  ahora propone 65,24 M y la compuerta no lo confirma, sin dato) y ningún distinto nuevo; ensayo de los 259 clubes idéntico;
  `medir-cargar --dir Clubes/Italia` (176) y `medir-verificar` sobre prueba-completa (358) idénticos.

- **Opus → Sonnet, primera tarea: caja-deuda (to-do 288).** `tools/claude-llamada.mjs`: `modelo` por llamada (Opus por defecto). `tools/caja-deuda.mjs`:
  `--medir --ia --modelo opus|sonnet` (respuestas aparte, `.caja-deuda-ia.<modelo>.json`) y el escalón 2 pasa a Sonnet. Medido en los 606 documentos
  de los años cargados (US$ 12,37): deuda 210 iguales / 14 distintos contra 211 / 18 de Opus, caja 421 / 7 contra 417 / 7, ningún distinto
  nuevo. Las respuestas de Opus guardadas se siguen usando; con ellas más las de Sonnet donde no había: deuda 215 / 18, caja 423 / 7 (antes
  211 / 18 y 417 / 7). Ensayo de los 259 clubes idéntico. No se repitió Opus (piso de variación): la compuerta contra lo cargado ya pasaba.

## Qué queda pendiente (para TODO)

- **Escribir caja y deuda en `data/`, en la carpeta principal después del merge** (sin API: escalón 0). Junto con lo que ya dejó la
  sesión anterior:
  `node tools/caja-deuda.mjs --club dortmund-de --escribir && node tools/caja-deuda.mjs --club rbleipzig-de --escribir && node tools/caja-deuda.mjs --club hamburgersv-de --escribir`
  Escribe Dortmund 2024-2025, RB Leipzig 2022-2025 y HSV 2024.
- **Criterio nuevo de deuda (decisión de Guido, 2026-10-18), para `Admin/CONVENCIONES-DATOS.md` y la skill `club-data-mapping`:** un bono
  convertible (Wandelschuldverschreibung) es deuda financiera y entra en `grossDebt`. Caso: HSV 2024, 57.848 TEUR con la WSV de 30.000.
  HSV 2025 no la suma (ver el criterio de abajo).

- **Genoa 2022 en `--medir`:** con la regla de los "bis", la propuesta es 65,24 M (soci 1,3 + banche 15,68 + banche oltre 48,27). Para
  llegar a los 95,7 M publicados faltan las dos filas de altri finanziatori (factoring, 30,45 M): depende de la decisión del to-do 291.
  Además, la compuerta del documento siguiente no confirma: en 2023 "3 bis) soci" tiene vacía la columna del año (pasó a corto plazo).
- **Nuevo to-do, Milan 2018 en `--medir` (1,21 M contra 164,27 M publicados):** las filas de deuda son "a) entro 12 mesi" y "b) oltre 12
  mesi" debajo de un título sin importe ("1 obbligazioni", "5 debiti verso altri finanziatori"; AC-Milan-bilanci-relazioni-2017-18.md
  L895-904), y el diccionario solo ve "4 debiti verso banche" (la única con importe en su renglón). Sin daño hoy: es un año cargado.
- **Criterio, para `Admin/CONVENCIONES-DATOS.md` y `club-data-mapping` (decisión de Guido, 2026-10-18):** un bono convertible con conversión
  OBLIGATORIA en acciones, que el documento muestra como partida especial después del patrimonio (Sonderposten nach dem Eigenkapital), no
  es deuda. HSV 2025 queda en 22,03 M (la Wandelschuldverschreibung de 30 M fuera; .md L395-406). Junto con el de arriba: convertible
  común dentro de las deudas, sí; convertible obligatorio fuera de las deudas, no.

## Qué deja de ser cierto en ESTADO

- Los to-dos 289 y 290 se cierran (290: Genoa 2022 deja de dar un valor mal; el valor publicado depende del 291).
- RB Leipzig 2023-2024 y HSV 2024 dejan de estar "sin escala del documento" en caja-deuda.

## Para fos-onboarding (cómo se carga)

- Nada cambia mientras un documento no tenga un ajuste `escala`. El campo nuevo `escala` existe solo en esta rama hasta el merge.
- `claveFamilia` saca ahora la numeración "bis" (to-do 290): `cargar.mjs` y `verificar.mjs` medidos idénticos (Italia y prueba-completa); cambia solo qué filas "bis" ve el diccionario de deuda de caja-deuda.
