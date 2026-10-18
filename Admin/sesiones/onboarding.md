# Cierre de la sesión onboarding (rama onboarding, arrancó 2026-10-18)

Se completa mientras se trabaja. No se tocan TODO, CHANGELOG ni ESTADO: la principal pasa esto a esos tres.

## Qué cambió (para CHANGELOG)
- `Admin/lotes/mistral-despues-del-merge.txt` recortada de 39 a 5 documentos (OH Leuven 2022, Boyacá Chicó 2020, Deportes Tolima 2025,
  Llaneros 2022, Viking Fotball AS 2025): de los 39, 25 ya estaban cargados en el sitio (`pipeline.mjs` no los toca), 5 ya tienen
  tablas (los rehízo el subagente) y Thun 2015-16 ya es de Mistral.

- 292: validadas las 326 transcripciones de subagentes de `subagentes-validar.txt` (todas `listo`, 1 con "reserva": Basel 2008
  pág. 32, cerrar con sum-check al cargar; US$ 2,53 contra ~3,47 del ensayo). Mistral: Boyacá Chicó 2020, Deportes Tolima 2025 (rehecho,
  839 filas de tabla) y Viking Fotball AS 2025 (transcripto nuevo) quedaron `listo` (US$ 0,64).

## Qué queda (para TODO)
- 292: validación y Mistral HECHOS (ver arriba). Falta: lotes de carga por país; OH Leuven 2022 y Llaneros 2022 (siguen sin tablas, ver
  mejoras de script); los 319 `.md` sin tablas. (Texto viejo del ensayo:
  que no anticipa el rehacer de los `listo` sin tablas: to-do 286), lotes de carga por país, los 319 `.md` sin tablas.
- 238, 285, 284, 283, 195, 165 c: sin empezar.

## Qué deja de ser cierto en ESTADO
- Nada todavía.

## Pantalla (para fos-finanzas)
- Nada todavía.

## PDFs bajados acá (copiar a la principal con rsync)
- Ninguno.

## Mejoras de script vistas (para fos-pipeline, sin aplicar)
- `pipeline.mjs`, control "sin tablas": `sinPasarPorElLote` exige `!e.jev`, así que un `.md` viejo con la marca de la preparación vieja
  (`listo-para-jev` o `sin-rubros`) nunca se marca `sin-tablas` ni se rehace con Mistral. Casos: OH Leuven 2022 (1 renglón de tabla,
  `jev: listo-para-jev`) y Llaneros 2022 (0 renglones, `jev: sin-rubros`); la segunda corrida de Mistral los dejó igual (0 documentos).
  Probablemente afecta a buena parte de los 319 de `sin-tablas-6paises.txt`.
