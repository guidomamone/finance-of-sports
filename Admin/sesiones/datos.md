# Sesión datos (Sourcing 4) — to-do 356: qué clubes británicos presentan sus cuentas en iXBRL

**Estado: relevamiento hecho; la descarga está FRENADA** a la espera del ok de la principal (el total sin comprimir pasa de 50 MB; ver «Tamaño»). Todavía no se bajó ningún archivo de cuentas.

## Cómo se midió

Método de `Admin/mediciones/companies-house-ixbrl.md` (que está en main, no en este worktree), ampliado:
1. **Clubes:** los de League One, League Two y la Premiership escocesa según las notas de `Admin/sourcing/Inglaterra/` y `Escocia/` (la liga que dice cada nota; puede estar un año atrás), más los 6 ya vistos (Plymouth, Oxford y Peterborough están en la Championship o League One). Salieron 62 clubes y 68 sociedades (Barnet, Crawley, Doncaster, Fleetwood, Port Vale y Salford tienen dos: la vieja y la actual).
2. **Qué presentó cada sociedad:** el historial de presentaciones de Companies House (`/company/<n>/filing-history`, tipo `AA`), con TODAS las cuentas, también las de empresa pequeña y micro (la primera pasada con `tools/companies-house-fetch.mjs --list` las salteaba y daba una lectura errónea de los clubes chicos). Se tomaron las 5 últimas por fecha de cierre.
3. **Si cada una es iXBRL:** el índice (directorio central) de los ZIP mensuales del Accounts Data Product, por rangos HTTP, en el mes de la presentación y en el siguiente (los ZIP anteriores a septiembre de 2025 viven bajo `/archive/`). Presente en el índice con ese número de sociedad y ese cierre = iXBRL (o XML); ausente = PDF. **No se bajó ningún archivo de cuentas**, solo el índice: 1,8 GB de directorios centrales en total (~30 MB por mes, 65 meses).
4. **Limitaciones:** una cuenta en papel o un PDF aparece como «pdf» (ausente del índice) sin que se haya abierto el documento; un «pdf» puede ser una presentación fuera del mes y el siguiente. Las cuentas «pequeña» (small, micro) pueden no traer la cuenta de resultados.

## Resultado

**54 de 68 sociedades (la mitad de las ligas bajas de Inglaterra y Escocia, y no «una minoría») tienen al menos un ejercicio iXBRL** entre los últimos 5; 22 lo tienen en los 5; 14 no tienen ninguno. Los 6 ya vistos se confirman: Plymouth 5/5, Lincoln 5/5, Peterborough 4/5, Oxford 4/5, Hibernian 4/5, Bolton 3/5 (y se ve que el 2021 y el 2022 de varios son PDF: el cambio a iXBRL fue en 2023 para Bolton, Burton, Chesterfield, Barnsley).
Sin ningún iXBRL: Aberdeen, Celtic, Hearts, Kilmarnock, Rangers, St Mirren (Premiership escocesa, salvo Dundee, Falkirk, Livingston, Motherwell, Ross County e Hibernian), Bradford City, Bromley, Forest Green, Harrogate, Huddersfield, Luton, MK Dons, Walsall.

| Club | Liga | Sociedad | iXBRL de los últimos 5 | Años (cierre; mes si no es junio) | Cuentas | KB sin comprimir | KB en el ZIP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Accrington Stanley | League Two | 01287721 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña | 701 | 86 |
| Barnet | League Two | 01239681 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña | 786 | 66 |
| Barnet | League Two | 08938115 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña | 644 | 56 |
| Blackpool | League One | 12022161 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 1809 | 210 |
| Cambridge United | League One | 00482197 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 4658 | 1154 |
| Crawley Town | League Two | 03858150 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa/pequeña | 1105 | 67 |
| Doncaster Rovers | League One | 03739676 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña | 1361 | 95 |
| Dundee | Scottish Premiership | SC004585 | 5/5 | 2021(05), 2022(05), 2023(05), 2024(05), 2025(05) | pequeña | 879 | 85 |
| Falkirk | Scottish Premiership | SC005854 | 5/5 | 2021(05), 2022(05), 2023(05), 2024(05), 2025(05) | completa/pequeña | 1448 | 95 |
| Fleetwood Town | League Two | 03359117 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña/completa | 988 | 125 |
| Fleetwood Town | League Two | 06989818 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 2331 | 261 |
| Gillingham | League Two | 00039175 | 5/5 | 2021(05), 2022(05), 2023(05), 2024, 2025 | completa | 3009 | 190 |
| Lincoln City | League One | 00045611 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 3444 | 207 |
| Mansfield Town | League One | 00181839 | 5/5 | 2020(12), 2021(12), 2022(12), 2023(12), 2025 | completa/pequeña | 1841 | 110 |
| Morecambe | League Two / National League | 00224792 | 5/5 | 2021(05), 2022(05), 2023(05), 2024(05), 2025(05) | completa | 1660 | 227 |
| Northampton Town | League One | 00183917 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa/pequeña | 1614 | 182 |
| Notts County | League Two | 04789632 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña | 734 | 97 |
| Plymouth Argyle | Championship | 07796376 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 5536 | 957 |
| Reading | League One | 00053703 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 1692 | 212 |
| Ross County | Scottish Premiership | SC171034 | 5/5 | 2021(05), 2022(05), 2023(05), 2024(05), 2025(05) | completa | 4649 | 222 |
| Shrewsbury Town | League One | 00315587 | 5/5 | 2021, 2022, 2023, 2024, 2025 | completa | 5130 | 251 |
| Stockport County | League One | 07254012 | 5/5 | 2021, 2022, 2023, 2024, 2025 | pequeña/completa | 1177 | 93 |
| Cheltenham Town | League Two | 00324807 | 4/5 | 2021(05), 2023(05), 2024(05), 2025(05) | pequeña | 927 | 71 |
| Crewe Alexandra | League Two | 00062367 | 4/5 | 2021, 2023, 2024, 2025 | completa | 789 | 104 |
| Hibernian | Scottish Premiership | SC005323 | 4/5 | 2022, 2023, 2024, 2025 | completa | 1443 | 177 |
| Leyton Orient | League One | 00088982 | 4/5 | 2022, 2023, 2024, 2025 | completa | 1222 | 79 |
| Livingston | Scottish Premiership | SC142420 | 4/5 | 2021, 2022, 2023, 2024 | pequeña | 513 | 65 |
| Oxford United | Championship | 00470509 | 4/5 | 2021, 2022, 2023, 2025 | completa | 916 | 115 |
| Peterborough United | League One | 00290803 | 4/5 | 2022, 2023, 2024, 2025 | completa | 1419 | 181 |
| Salford City | League Two | 09112699 | 4/5 | 2022, 2023, 2024, 2025 | completa | 1556 | 174 |
| Salford City | League Two | 08912116 | 4/5 | 2022, 2023, 2024, 2025 | pequeña | 503 | 64 |
| Stevenage | League One | 02901467 | 4/5 | 2021(05), 2023(05), 2024(05), 2025(05) | completa/pequeña | 2136 | 361 |
| Swindon Town | League Two | 00053100 | 4/5 | 2021(05), 2023(05), 2024(05), 2025(05) | completa | 945 | 64 |
| Barnsley | League One | 04573250 | 3/5 | 2023(05), 2024, 2025 | completa | 1900 | 114 |
| Bolton Wanderers | League One | 11761052 | 3/5 | 2023, 2024, 2025 | completa | 1267 | 142 |
| Burton Albion | League One | 00488096 | 3/5 | 2023, 2024, 2025 | completa | 5020 | 1516 |
| Chesterfield | League Two | 04273743 | 3/5 | 2023, 2024, 2025 | completa | 1970 | 128 |
| Doncaster Rovers | League One | 00170192 | 3/5 | 2024(05), 2025(05), 2026(05) | completa | 512 | 34 |
| Grimsby Town | League Two | 00034760 | 3/5 | 2023(05), 2024(05), 2025 | completa | 876 | 58 |
| Sutton United | League Two | 00519334 | 3/5 | 2023(05), 2024(05), 2025(05) | completa | 382 | 34 |
| Wycombe Wanderers | League One | 05132509 | 3/5 | 2022, 2024, 2025 | pequeña | 324 | 43 |
| AFC Wimbledon | League One | 04458490 | 2/5 | 2024, 2025 | completa | 2219 | 116 |
| Exeter City | League One | 00097808 | 2/5 | 2024, 2025 | completa | 3817 | 433 |
| Motherwell | Scottish Premiership | SC005702 | 2/5 | 2021(05), 2022(05) | completa | 722 | 91 |
| Newport County | League Two | 02395863 | 2/5 | 2024, 2025 | completa | 812 | 43 |
| Port Vale | League One | 08876768 | 2/5 | 2024, 2025 | completa | 432 | 32 |
| Port Vale | League One | 11954695 | 2/5 | 2024, 2025 | completa | 198 | 18 |
| Wigan Athletic | League One | 13161421 | 2/5 | 2023, 2024 | completa | 1249 | 87 |
| Bristol Rovers | League One | 00051828 | 1/5 | 2025 | completa | 283 | 38 |
| Carlisle United | League Two | 00175280 | 1/5 | 2025 | completa | 1214 | 173 |
| Colchester United | League Two | 02705301 | 1/5 | 2021 | pequeña | 362 | 20 |
| Crawley Town | League Two | 15899186 | 1/1 | 2025(08) | micro | 22 | 4 |
| Rotherham United | League One | 06550400 | 1/5 | 2024 | completa | 261 | 32 |
| Tranmere Rovers | League Two | 00118587 | 1/5 | 2025 | completa | 574 | 59 |

Ya se sabía de Nottingham Forest, Burnley y Bath Rugby (tabla de la medición anterior, iXBRL en los tres): no se repiten.
Ojo con «completa»: es «Full / Group / Medium / Total exemption full», que traen cuenta de resultados; «pequeña» es «Accounts for a small company», que puede no traerla (los de pocos KB, como Port Vale, suelen ser solo balance).

## Tamaño (lo que hay que decidir)

Los 54 clubes con iXBRL suman **198 archivos**: **9,7 MB comprimidos** (lo que viaja por la red) y **84,0 MB sin comprimir** (lo que ocupan en disco como `.xhtml`). Por tipo:
- Cuentas «completas» (94 archivos): 7,6 MB en el ZIP / **60,6 MB** sin comprimir.
- Cuentas «pequeñas» (104 archivos): 2,1 MB / 23,4 MB.
- Solo los últimos 3 cierres: 136 archivos, 7,5 / 59,8 MB. Completas y últimos 3: 69 archivos, 6,1 / **45,5 MB**.

El tope de 50 MB lo pasa el total sin comprimir (84 MB), no la descarga (9,7 MB). Por eso **no bajé nada**. Opciones: (a) bajar los 198 (84 MB en disco; ~10 MB por la red); (b) solo completas (94 archivos, 61 MB; también pasa); (c) completas de los últimos 3 cierres (69 archivos, 45,5 MB: entra).
Los `.xhtml` están ignorados por git (`*.xhtml`, como los tres de Forest, Burnley y Bath); no engordan el repo.

## Qué falta

Esperar la decisión; bajar con pedidos por rango al ZIP mensual (cada archivo a una carpeta nueva y vacía, leído como datos y movido a `Clubes/Inglaterra/<Club>/` o `Escocia/`), nombre del `.md` que ya existe de ese año con extensión `.xhtml`; pasar a la principal la lista exacta para copiar a main. No se carga nada: carga Onboarding con `tools/xhtml-aarsrapport.mjs`.
