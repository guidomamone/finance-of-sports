# Companies House: ¿cuántos clubes británicos presentan sus cuentas en iXBRL y no en PDF?

Medición del 2026-10-21 (Pipeline 13), gratis y sin código nuevo en `tools/`. Pedida por la principal con ok de Guido.

## Conclusión

**Los grandes no vienen en iXBRL.** De los 21 clubes de `data/gb/`, solo 3 aparecen en el producto de cuentas iXBRL de Companies House para sus últimas cuentas
(Nottingham Forest, Burnley y Bath Rugby); los otros 18 (Arsenal, Chelsea, Liverpool, Manchester City, Tottenham, Newcastle, Aston Villa, West Ham, Everton, Leeds,
Brentford, Brighton, Fulham, Crystal Palace, Bournemouth, Wolves, Sunderland y Celtic) presentaron un PDF. En las ligas de abajo y Escocia la proporción sube: 6 de 15 clubes
(Plymouth, Bolton, Lincoln, Oxford, Peterborough, Hibernian). Total medido: 9 de 36, el 25 %.

Por ahora `xhtml-aarsrapport.mjs` (o una versión) **no destraba la carga de los clubes británicos grandes**: siguen yendo por PDF y transcripción. Podría servir para una minoría de
clubes medianos y chicos, que además son los que más cuesta transcribir bien. Antes de programar nada falta mirar 3 archivos (abajo, «Qué falta»).

## Cómo se midió

1. **Número de sociedad** de cada club: el que figura en sus propios `.md` (`Clubes/Inglaterra/<Club>/`, «Company number») para los 21 de `data/gb/`; para 15 clubes de las
   ligas de abajo y de Escocia (16 sociedades; Rotherham tiene dos), la búsqueda por nombre de `find-and-update.company-information.service.gov.uk`, eligiendo a mano la sociedad que opera el club.
2. **Qué presentó cada club y cuándo:** el historial de presentaciones (`/company/<n>/filing-history`) de los 21, tipo `AA` (cuentas). Los 21 presentaron las de 2025 entre enero y abril de 2026
   (Celtic el 8 de enero; Arsenal y West Ham el 27 de febrero; el resto, entre marzo y abril).
3. **Si esa presentación es iXBRL:** el [Accounts Data Product](https://download.companieshouse.gov.uk/en_accountsdata.html) gratis de Companies House es un ZIP mensual con las cuentas presentadas
   **en formato electrónico** (`.html` iXBRL, `.xml` o un `.zip` de iXBRL), con el número de sociedad en el nombre (`Prod224_2603_03170814_20250630.html`). Se leyó el directorio central de los ZIP de
   septiembre de 2025 a septiembre de 2026 con pedidos HTTP por rango (final del ZIP, unos MB cada uno): **no se bajó ningún archivo de cuentas**. Se buscó el número de sociedad de cada club en el índice.
   Un club presente = su documento es iXBRL; ausente = lo presentó en otro formato (PDF).
4. Control del método: el mismo club aparece en el mes de su presentación del año anterior (Forest y Bath en marzo de 2025, Burnley en abril de 2025); y dos grandes grupos fuera del fútbol (Marks & Spencer y Tesco) no aparecen
   en septiembre de 2025 a septiembre de 2026 aunque presentaron cuentas: coherente con que los grupos grandes presenten PDF.

La API REST de Companies House (con el metadato de formatos de cada documento) pide una clave; no se creó cuenta. La web solo ofrece PDF (`document?format=xhtml` da error 500 aun en un iXBRL).

## Resultado

| Grupo | Clubes medidos | iXBRL | PDF |
| --- | --- | --- | --- |
| Los 21 de `data/gb/` (Premier League, Celtic y Bath Rugby) | 21 | 3: Nottingham Forest, Burnley, Bath Rugby | 18 |
| Ligas de abajo y Escocia, elegidas a mano (aparte) | 15 clubes, 16 sociedades | 6: Plymouth, Bolton, Lincoln, Oxford, Peterborough, Hibernian | 10: Leicester, Norwich, Wrexham, Portsmouth, Stockport, Rotherham (las dos sociedades), Rangers, Hearts, Aberdeen |

Detalle de los iXBRL (última presentación, mes del producto, cierre del ejercicio; tamaño del archivo dentro del ZIP):

| Club | Sociedad | Presentación | Cierre | Archivo |
| --- | --- | --- | --- | --- |
| Nottingham Forest | 01630402 | marzo de 2026 | 2025-06-30 | 392 KB |
| Burnley (grupo) | 08335231 | abril de 2026 | 2025-07-31 | 422 KB |
| Bath Rugby | 03170814 | marzo de 2026 | 2025-06-30 | 731 KB |
| Plymouth Argyle | 07796376 | diciembre de 2025 | 2025-06-30 | |
| Lincoln City | 00045611 | enero de 2026 | 2025-06-30 | |
| Oxford United | 00470509 | marzo de 2026 | 2025-06-30 | |
| Peterborough United | 00290803 | marzo de 2026 | 2025-06-30 | |
| Hibernian | SC005323 | marzo de 2026 | 2025-06-30 | |
| Bolton Wanderers | 12184224 | junio de 2026 | 2025-09-30 | |

Los tres primeros también venían en iXBRL el año anterior (ejercicio 2024). Con eso, para esos clubes el iXBRL cubre al menos dos años.

Dos matices:
- «Group of companies' accounts» (cuentas consolidadas de un grupo) aparece iXBRL solo en Burnley; las de Arsenal, Chelsea, Liverpool, Tottenham y las demás son PDF.
- No se abrió ningún PDF de los grandes: «PDF» quiere decir «no está en el producto iXBRL», no que se haya visto el archivo.
- Las ligas de abajo se eligieron a mano (sin distinguir Championship, League One y League Two) y el club operador se tomó por el nombre de la sociedad: son una muestra, no el universo.

## Qué falta, si Guido quiere seguir

Bajar los 3 archivos de arriba (Forest, Burnley, Bath; unos 150 KB comprimidos entre los tres, desde el ZIP mensual por rango) y correrles una versión de `xhtml-aarsrapport.mjs` en ensayo para ver:
(a) si traen sus cifras como `ix:nonFraction` con taxonomía FRC (`core:Turnover`, `core:ProfitLoss`), que serviría de total oficial independiente para el tie-out;
(b) si el `.md` que sale cierra contra el resultado impreso; (c) cuántas líneas ubica el PDF de ancla. Es una descarga: espera el ok de Guido, con estos nombres y tamaños.
Si no sale nada, el resto de los clubes británicos medianos y chicos se queda por PDF como hoy.

Para repetirlo: los scripts de la medición no se guardaron en el repo (viven en el scratchpad de la sesión); el método está arriba y alcanza para rehacerlos en 40 líneas de Node.

## Prueba del lector con los 3 archivos (2026-10-21, Guido dijo «ok»)

Bajados del Accounts Data Product de Companies House con pedidos HTTP por rango (solo esos archivos, 48 + 47 + 54 KB comprimidos), a carpetas nuevas y vacías; leídos como datos, sin ejecutar nada. Copias en `Clubes/Inglaterra/<Club>/` con el nombre del `.md` que ya existe de ese año y extensión `.xhtml` (ignorada por git): `forest-full-accounts-2024-25.xhtml`, `burnley-fc-holdings-group-accounts-2024-25.xhtml`, `bath-rugby-medium-company-accounts-2024-25.xhtml`. Ya tienen `.md` y `.pdf` de PDF de esos años; no se escribió ninguno nuevo ni se cargó nada.

`tools/xhtml-aarsrapport.mjs` (sin tocar el código para el iXBRL británico; solo el escalón óptimo ya aprobado) en ensayo:

| Club (cierre) | Líneas | Hechos iXBRL | Compuerta (a) | Compuerta (b) | El `.md` cierra |
| --- | --- | --- | --- | --- | --- |
| Nottingham Forest (2025-06-30) | 1.531 | 292 (30 ocultos) | 0 faltantes | 763/763; el codicioso ubicaba 645 (84 %): pasa **solo** por el escalón óptimo | sí: 221.746 − 15.224 = 206.522; − 271.449 = −64.927; +5 −21.016 +7.017 = −78.921 (= `ProfitLoss`) |
| Burnley, grupo (2025-07-31) | 1.764 | 292 (83 ocultos) | 0 faltantes | 819/825 (99,3 %), codicioso | sí: 71.746 − 30.401 − 82.263 − 2.606 + 5.576 = −37.948 (operación sin fichajes) |
| Bath Rugby (2025-06-30) | 1.682 | 257 (1 oculto) | 0 faltantes | 749/749, codicioso | sí: 23.339.778 − 20.059.154 = 3.280.624; − 6.251.494 + 69.825 = −2.901.045; − 127.574 = −3.028.619; + 250.554 = −2.778.065 (= `ProfitLoss`) |

Conclusión: **el lector actual ya lee el iXBRL británico (FRS 102) y el `.md` cierra contra los totales del documento**, en los tres. No hizo falta una versión nueva; sí el escalón óptimo para Forest.

Lo que no sale tan limpio:
- **Burnley (cuentas de grupo)**: el `ProfitLoss` del grupo (−28.530 miles) viene con el eje `GroupCompanyDataDimension=Consolidated`; el hecho SIN dimensiones es el de la sociedad matriz, 0. El chequeo del resultado de `cargar.mjs` (contexto sin dimensiones, condición de la Auditora 5) compararía 0 contra el resultado del grupo y daría un aviso falso para toda cuenta británica de grupo. Hace falta una regla para el eje de consolidación (condición nueva: va a la Auditora 5).
- **`Revenue`/`Turnover` casi no está etiquetado** en estos informes (solo Bath tiene `TurnoverRevenue`; Forest y Burnley no): la comparación de ingresos no sirve en el Reino Unido. El iXBRL británico etiqueta 257-292 hechos, sobre todo del balance y las notas.
- **Bath**: el `.md` parte el paréntesis de negativo en otra celda (`| (2,970,870 | ) |`); las cifras están, pero la fila no es limpia para quien la lea con regex.
- Los tres traen el ejercicio entero en un solo documento y el mismo número de sociedad que ya figura en los `.md`; no cambia el perímetro ni la moneda respecto de la transcripción del PDF.

Falta decidir si conviene usarlo: los 9 de 36 clubes con iXBRL son sobre todo los chicos y medianos; para los 18 grandes sigue siendo el PDF.
