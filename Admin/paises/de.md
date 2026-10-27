<!-- md: las reglas de datos que solo valen para Alemania (el mismo formato que CONVENCIONES-DATOS.md) | leer: al cargar o corregir un club de Alemania -->
# Reglas de datos de Alemania

## REGLA: `officialPAT` de un consolidado alemán con partner silencioso o minoritarios es el resultado ANTES de esas asignaciones (votación 3 a 0)

Se carga la línea del resultado consolidado total (Konzernjahresüberschuss), no la que queda después de la asignación al partner silencioso o a otros
socios; la asignación no es un impuesto. Criterio de Augsburg y Eintracht Frankfurt. Caso: Hoffenheim 2023/24 y 2024/25 (línea 14: +1,268 M y +1,100 M
en vez de la línea 16: -0,368 M y -0,189 M; `tax` deja de absorber la asignación). Pendiente de revisar: Stuttgart carga el resultado después de
minoritarios y suma el NCI a `tax`, el criterio contrario.
