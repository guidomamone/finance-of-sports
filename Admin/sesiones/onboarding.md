# Onboarding: notas para la principal

## Onboarding 3

Rama `onboarding`, sin push. Último commit al escribir esto: ver `git log`.

### Qué cambió
- **Viking AS 2017-2024** transcriptos (to-do 285; ya mergeado).
- **Lote 93 (Países Bajos)**: 19 altas escritas (ya mergeado).
- **Fredrikstad (to-do 284)**: el club es el FLI (Fredrikstad Fotballklubb). Cargados 2013-2018 desde el lote 95 (`Admin/lotes/lote-95.txt`); 2012 queda fuera (ver abajo). La Årsmøte 2025 es el FLI 2024 (ya cargado) con 2023 solo como comparativo.
- **Sarpsborg 08 (to-do 284)**: transcriptos por el pipeline los PDFs del FLI (2008, 2012, 2014-2024 y dos `wf-`). La alta sobre el FLI NO se rehízo todavía.
- **Ligas noruegas**: `no-2divisjon` (tier 3) en `data/leagues.js`; `data/club-leagues/no.js` con Fredrikstad 2012-2018; listas de la 1. divisjon 2012-2018, Tippeligaen 2012 y 2. divisjon 2018 en `tools/club-league-reference/`.
- **Compuerta de estadio** (`tools/estadio-sponsor.mjs`): `SOLO_ESTADIO` ahora incluye `no-1divisjon` y `no-2divisjon` (decisión de Guido, 2026-10-19), además de `nl-eerstedivisie`. Alias `Eindhoven` -> `fceindhoven-nl` en `alias.json` y lista de la Eerste Divisie 2021-22.
- Fredrikstad 2018: estadio a mano en `tools/contexto-manual.json` con fuente (la página de la 2. divisjon no trae tabla de estadios).

### Qué queda
- **Fredrikstad 2012**: la cola está contestada (9 casos) pero la compuerta pide sponsor (Tippeligaen no tiene la excepción). Falta un sponsor con fuente en `contexto-manual.json`. Si se pone, correr de nuevo `lote.mjs --lista Admin/lotes/lote-95.txt --ejecutar --cargar`.
- **Sarpsborg 08**: rehacer el alta sobre el FLI (`Sarpsborg 08 Fotballforening`) con sus años ya transcriptos.
- **Vålerenga (to-do 283)**: 46 PDFs sin `.md`. Siete subagentes Sonnet cortaron por el límite de uso y algunos escribieron sin ver las imágenes. Los 40 `.md` que dejaron están SIN trackear y SIN verificar: pasarlos por `node tools/pipeline.mjs --lista Admin/lotes/transcribir-valerenga.txt --max-paginas 0 --ejecutar` (valida contra el PDF) antes de usarlos; o borrarlos y transcribir con Mistral.
- Lote de las altas de los países nuevos (165 c), Bélgica (lote 92) y los demás años de los clubes nuevos: sin empezar.

### Qué deja de ser cierto en ESTADO
- Fredrikstad ya no tiene solo 2024: tiene 2013-2018 (y 2024).
- La compuerta de estadio acepta sin sponsor la Eerste Divisie, la 1. y la 2. divisjon noruegas.

## Después del primer merge de Onboarding 3 (2026-10-19)

## Sarpsborg 08 (lote 96) y vålerenga, cierre parcial (2026-10-19)

### Qué cambió
- **Sarpsborg 08 (to-do 284)**: el alta ya estaba sobre el FLI (nombre legal y 2025 del FLI). Cargados los años del FLI 2012 y 2014-2022 (10 años) con el lote 96 (`Admin/lotes/lote-96.txt`). Ligas asignadas en `data/club-leagues/no.js` verificadas contra las listas (2012 en la 1. divisjon; 2014-2025 en la Eliteserien). 2008 queda afuera: la liga no se pudo confirmar (la lista de 2008 trae a "Sarpsborg Sparta").
- Perímetro individual por documento para 2022, 2023 y 2024 (ajustes `perimetro`), igual que el 2025: la controlada es Prozo AS (negocio comercial aparte). Sin eso el club-nivel `consolidado` hacía leer el consolidado.
- Cola de Sarpsborg contestada (37 casos) con subagentes Sonnet revisados.

### Qué queda
- **Sarpsborg 08 2023 y 2024** no se cargan todavía. Dos causas, la primera es del script:
  1. **Mejora de script (para fos-pipeline):** el escalón "nota del subtotal" REEMPLAZA los 8 renglones del estado individual (Billetinntekter, Medlemsinntekter, Reklame- og sponsorinntekter, Mediainntekter, Salg/utleie spillere, Andre salgsinntekter, Andre inntekter, Tilskudd) por los 2 de la Note 1 por área (Arrangement 69,1 M + Salg/utleie spillere 134,6 M en 2024) porque la nota suma el subtotal impreso. La nota es MÁS gruesa que el estado y pierde el desglose. Debería ganar el estado cuando abre más renglones. Caso: Sarpsborg 08 2024 (L116-124 y L1517-1523 del .md) y 2022 en el consolidado. Hoy, con la nota descartada (`no_es_rubro`), quedan 134,6 M de ingresos y no cierra. Opciones: aceptar "Arrangement" como `lump_football_operations` (cierra, pierde el detalle) o esperar la mejora.
  2. **2023**: la extracción sigue leyendo el consolidado (ingresos 166,5 M y no 146,5 M) aunque el documento tiene `perimetro` individual. Hay que ver por qué el bloque individual de 2023 no se elige (el 2024 sí lo toma bien: verificación de 203,7 M).
- **Fredrikstad 2012**: falta un sponsor con fuente (Tippeligaen).
- **Vålerenga**: los 40 `.md` de los Sonnets siguen sin verificar y sin trackear.
- Altas de los países nuevos (165 c), Bélgica (lote 92), y los demás años de los clubes nuevos: sin empezar.

### Qué deja de ser cierto en ESTADO
- Sarpsborg 08 tiene 2012 y 2014-2025 menos 2023 y 2024.
