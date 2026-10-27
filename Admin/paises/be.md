<!-- md: las reglas de datos que solo valen para Bélgica (el mismo formato que CONVENCIONES-DATOS.md) | leer: al cargar o corregir un club de Bélgica -->
# Reglas de datos de Bélgica

## REGLA: el intangible belga "Concessies, octrooien, licenties…" no es de jugadores sin confirmación del documento (votación 3 a 0)

La amortización de ese intangible va a `depreciation` y el residuo de "Andere bedrijfsopbrengsten" a `other_income`, salvo que el propio
documento (una nota de reglas de evaluación, el Jaarverslag con la cifra) diga que es de jugadores o de transferencias: entonces
`player_amortisation` y `player_sales`. El rótulo cargado no agrega palabras que el documento no imprime ("spelersregistratierechten",
"probablemente…"). Casos: Dender (`depreciation`), Charleroi y Anderlecht (confirmados por texto: `player_amortisation`), Mechelen 2025 (sin
confirmación: pasa a `depreciation` el 1,11 M y a `other_income` el 8,54 M). Westerlo y Antwerp: mirar si tienen la confirmación por texto.

CATEGORÍA (prompt, futbol): en Bélgica, el intangible «Concessies, octrooien, licenties…» y su amortización van a depreciation, y el residuo de «Andere bedrijfsopbrengsten» a other_income, salvo que el documento diga que es de jugadores o de transferencias (entonces player_amortisation y player_sales); no agregues palabras que el documento no imprime.
