<!-- md: las reglas de datos que solo valen para Turquía (el mismo formato que CONVENCIONES-DATOS.md) | leer: al cargar o corregir un club de Turquía -->
# Reglas de datos de Turquía

## REGLA: en un balance turco, lo que el propio balance pone en las actividades principales va como línea operativa (votación 3 a 0, Beşiktaş)

Las partidas que el balance imprime dentro de las actividades principales (Tecil - faiz, Reeskont, kur farkı, vade farkı) se cargan
como líneas operativas (`other_income` / `other_expenses`), no como `netInterest`. El resultado financiero es el bloque Finansman.

CATEGORÍA (prompt): en un balance turco, las partidas que el propio balance imprime dentro de las actividades principales (Tecil - faiz, Reeskont, kur farkı, vade farkı) van como líneas operativas (other_income / other_expenses), no como interés neto.
EJEMPLO-CATEGORÍA: besiktas-tr | expense | Tecil - faiz giderleri | other_expenses
EJEMPLO-CATEGORÍA: besiktas-tr | revenue | Reeskont gelirleri | other_income
