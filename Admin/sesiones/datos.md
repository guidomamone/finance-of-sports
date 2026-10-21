# Sesión datos (Sourcing 4) — to-dos 359 y 356

## To-do 359 (2026-10-21)

### (1) FC Emmen 2020-21: la jaarrekening con la controleverklaring se compra en la KvK, a €3,90

- El F.04 que tenemos (`F.04-FCE-Jaarverslag-2020-2021-incl.-Jaarcijfers-DEF.pdf`, 7 págs.) solo dice, en la página de las cifras, que sus datos «zijn ontleend uit de jaarrekening 2020-2021 van FC Emmen B.V., waarbij een accountantsverklaring is verstrekt»: el informe del auditor no está en él.
- **El documento existe en el Handelsregister de la KvK, pero hay que pagarlo.** Según el tarifario oficial de la KvK vigente desde el 1/1/2026 (`tarievenoverzicht_1_januari_2026.pdf`, leído): **jaarrekening, por pieza (descarga online): €3,90**; ver el listado de depósitos de la sociedad (para saber qué ejercicios hay): €2,95; un «gewaarmerkt» (certificado digital) es más caro (€9,60 según una fuente secundaria; no lo vi en el PDF). Se pide por kvk.nl > Producto > Jaarrekeningen > «Bestel», buscando la sociedad por nombre o número, y se puede bajar como PDF, XBRL o ZIP de XHTML/iXBRL. Se pueden pedir los últimos 7 años (el 2020-21 entra).
- **La sociedad:** FC Emmen B.V. (besloten vennootschap, activa; Stadionplein, Emmen). **KvK 40781860 según un directorio de terceros**; no lo pude verificar en kvk.nl (la búsqueda es una web dinámica) ni aparece en los PDF. Verificarlo al pedir.
- **No compré nada, y Guido dijo que no se compra** («no vamos a comprar el reporte»): solo fuentes gratis. Revisadas sin hallazgo: el sitio del club (`fcemmen.nl/jaarverslagen/`: el link 2020/2021 es el mismo F.04 que ya tenemos), Exa (una búsqueda; devuelve esa página y prensa de otros clubes) y prensa. La CDX de Wayback del sitio respondió 502.
- **Resultado:** solo existe de pago. Anotado en la nota del club (`Admin/sourcing/Países Bajos/FC Emmen.md`) y en `Admin/dudas-por-club.md` («pedírselo al club», para 2020-21 y 2019-20).

### (2) Url del depósito en regnskaber.virk.dk de las otras 15 fuentes danesas

Mismo método que con las 20 anteriores: el hash del archivo de `Clubes/Dinamarca/` (carpeta de main) contra el documento que sirve `regnskaber.virk.dk` para ese CVR (`distribution.virk.dk/offentliggoerelser`, por `cvrNummer`). Las 15 coinciden. `http://` (con `https://` el servidor da error de SSL).

| Club (carpeta) | Archivo | Sag | Presentado | Período | dokumentUrl |
| --- | --- | --- | --- | --- | --- |
| AGF | `aarsrapport-2021-06-30.pdf` | X21-EW-21-JN | 2021-11-14 | 2020-07-01 → 2021-06-30 | http://regnskaber.virk.dk/01993838/amNsb3VkczovLzAzL2IzLzA5Lzk4L2MwL2JhOTktNGE0My1iM2E3LWE1OWMyMzg4MmI5Yg.pdf |
| Brøndby | `aarsrapport-2020-12-31.pdf` | X21-BQ-99-PP | 2021-05-04 | 2020-01-01 → 2020-12-31 | http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAzL2RhL2VkLzdmLzQ3LzVhM2MtNGUyMC05M2YxLTRiZTRlMjQzM2FiNA.pdf |
| FC København | `aarsrapport-2024-12-31.pdf` | X25-BU-66-GM | 2025-04-23 | 2024-01-01 → 2024-12-31 | http://regnskaber.virk.dk/16125934/amNsb3VkczovLzAzLzk0L2MzLzUyL2ZiLzljNDktNGYyZS1iOWFmLTFlMzQ3Y2RlMTMxZA.pdf |
| FC Fredericia | `aarsrapport-2019-12-31.pdf` | X20-CR-82-VS | 2020-06-19 | 2019-01-01 → 2019-12-31 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzLzE1Lzc3LzcyL2EzL2Q2NWYtNDBjOS1hOTQwLTJhZTAxNWEwZTI1OQ.pdf |
| FC Fredericia | `aarsrapport-2020-12-31.pdf` | X21-BN-23-PY | 2021-04-22 | 2020-01-01 → 2020-12-31 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzL2JiLzY3L2MwL2Y4LzA5NTctNGVmMC05NjI1LWE4NDhlMTFiZDc1Zg.pdf |
| FC Midtjylland | `aarsrapport-2019-06-30.pdf` | X19-DE-91-NK | 2019-10-29 | 2018-07-01 → 2019-06-30 | http://regnskaber.virk.dk/65167513/ZG9rdW1lbnRsYWdlcjovLzAzL2E1LzYzLzFiL2RjL2RhZDMtNGZiMC1iNzUyLWZjNTFiNDAyNWIwMg.pdf |
| FC Midtjylland | `aarsrapport-2020-06-30.pdf` | X20-ES-32-MX | 2020-12-02 | 2019-07-01 → 2020-06-30 | http://regnskaber.virk.dk/65167513/amNsb3VkczovLzAzLzIyLzY4L2MxLzhjLzliMDgtNDEwZS1hYThiLTg1NDNhYTMyYjgyMQ.pdf |
| FC Nordsjælland | `aarsrapport-2024-12-31.pdf` | X25-BW-84-AR | 2025-05-01 | 2024-01-01 → 2024-12-31 | http://regnskaber.virk.dk/30775242/amNsb3VkczovLzAzLzgwL2QwLzkzL2Q4LzY0ODQtNGRlZi1hOWFhLTFhYWM1NzdjNjFhZA.pdf |
| Randers FC | `aarsrapport-2023-06-30.pdf` | X23-FY-84-RN | 2023-10-31 | 2022-07-01 → 2023-06-30 | http://regnskaber.virk.dk/61804938/amNsb3VkczovLzAzLzVmL2ZlL2JkLzA0L2Q2MmMtNGQwNi1iNzAwLTgyYTQ5YjEzNWRiOQ.pdf |
| Silkeborg IF | `aarsrapport-2024-12-31.pdf` (idéntico: `Aarsrapport-2024-SIF.pdf`) | X25-BW-05-JP | 2025-04-29 | 2024-01-01 → 2024-12-31 | http://regnskaber.virk.dk/13779362/amNsb3VkczovLzAzL2Q0LzVjLzUyLzQzLzAwMzktNDkxYS04NmQ0LTEyYjRhZTQ3YzVlMQ.pdf |
| Silkeborg IF | `aarsrapport-2025-12-31.xhtml` | X26-BJ-59-BY | 2026-03-17 | 2025-01-01 → 2025-12-31 | http://regnskaber.virk.dk/13779362/amNsb3VkczovLzAzLzU0Lzc3LzdkLzExLzE3ZjYtNDdkNS1hMGUyLTBhZDMzNDIzMTVmZA.xhtml |
| SønderjyskE | `aarsrapport-2022-06-30.pdf` | X22-ER-69-FR | 2022-10-28 | 2021-07-01 → 2022-06-30 | http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzLzcyL2YwLzVlL2FiLzlkMGQtNDZlMy05ZGJhLWZhMjA5Y2E4MzcyMw.pdf |
| Vejle | `aarsrapport-2024-12-31.pdf` | X25-BL-51-YT | 2025-03-26 | 2024-01-01 → 2024-12-31 | http://regnskaber.virk.dk/97158013/amNsb3VkczovLzAzLzYwL2I4L2MxLzdhLzcyYWItNGQyOC04ZDAwLTNkN2I5OGM3MGNmNA.pdf |
| Viborg FF | `aarsrapport-2024-06-30.pdf` | X24-KP-37-FE | 2024-11-04 | 2023-07-01 → 2024-06-30 | http://regnskaber.virk.dk/31737038/amNsb3VkczovLzAzL2ZlLzVlLzljLzU4L2Y1ZTgtNDI4Mi04Mjk3LTI4NzA5MDk0MjI2Yg.pdf |
| Viborg FF | `aarsrapport-2025-06-30.xhtml` | X25-MZ-43-ES | 2025-10-30 | 2024-07-01 → 2025-06-30 | http://regnskaber.virk.dk/31737038/amNsb3VkczovLzAzLzA2LzRlL2UyLzM2L2RjYzEtNDdkNy1hZDgyLTU4YWQ3ZTZjNjA0Nw.xhtml |

Notas: AGF 2019-20 (`aarsrapport-2020-06-30.pdf`, X20-EC-36-VT, presentado 2020-10-23) también coincide; la url es `http://regnskaber.virk.dk/01993838/amNsb3VkczovLzAzL2MxL2M0Lzc5Lzg3L2IwZWItNGYyYi05ZjNlLTA4NGExOWM2ZTJjNQ.pdf`. Los PDF de las carpetas con otro nombre que **no** coinciden con ningún depósito (Midtjylland `A_rsrapport-for-FC-Midtjylland-2019-2020.pdf` y `...2020-2021.pdf`, Silkeborg `Annual-Report-2025-Silkeborg-IF-A_S-FACT.pdf` y `Regnskab_PM_2025.pdf`, Viborg `2023-2024-rsrapport-...pdf` y `2025-rsrapport-...pdf`) son documentos del sitio del club, no la presentación del registro: no tienen url del depósito.

---

# (Anterior) to-do 356: qué clubes británicos presentan sus cuentas en iXBRL

**Estado: relevamiento hecho y descarga hecha con la opción (c)** (completas de los últimos 3 cierres, aprobada por la principal): **69 archivos `.xhtml`, 45,5 MB en disco (6,1 MB por la red)**, ya en `Clubes/` de este worktree y copiados a `Clubes/` de main. Los `.xhtml` están ignorados por git: no viajan con el merge. Nada se cargó. Después, con el ok de Guido en el chat, se bajó el resto: **198 archivos en total, 84,0 MB**, todos ya en main (ver «Descarga del resto»).

## Los 2 «PDF» que eran HTML (con el ok de Guido, vía la principal)

- **CFR Cluj consolidado 2024: resuelto.** El real es `https://cfr1907.ro/wp-content/uploads/2025/03/Contul-de-profit-si-pierdere-consolidat-2024.pdf` (vivo en el sitio del club): PDF de 1 página, escaneo sin capa de texto (OCR). Ya está en main como `Clubes/Rumania/CFR Cluj/cpp-consolidat-2024.pdf` (`file` lo confirma); el HTML quedó como `cpp-consolidat-2024-pagina-html.html`.
- **Unión Magdalena dictamen 2021: no se pudo.** El servidor de SIIS bloquea la URL del archivo (su nombre real es `1%%7p601!.PDF` y el servidor responde 500 «URL blocked» a cualquier codificación, también desde el visor del propio portal). El HTML se renombró a `dictamen-revisor-fiscal-2021-pagina-html.html` en main; no hay un PDF real que reemplazarlo. Detalle y qué queda en `Admin/sourcing/Colombia/Union Magdalena.md`.
- Quité de mi worktree el enlace roto a `dictamen-revisor-fiscal-2021.pdf` (apuntaba al archivo que se renombró en main).

## Archivos bajados (para Onboarding)

Cada uno salió del ZIP mensual del Accounts Data Product (pedido por rango, inflado y comprobado contra el tamaño del índice), a una carpeta nueva y vacía, tratado como dato no confiable (no se ejecutó nada) y movido con el nombre del PDF que ya existe de ese ejercicio y extensión `.xhtml` (Gillingham 2022-23 no tenía PDF de ese año con ese patrón: `gillingham-00039175-accounts-2022-23.xhtml`). Todos son cuentas completas (Full, Group, Medium).
- Clubes/Inglaterra/AFC Wimbledon/: 2023-24, 2024-25
- Clubes/Inglaterra/Barnsley/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Blackpool/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Bolton Wanderers/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Bristol Rovers/: 2024-25
- Clubes/Inglaterra/Burton Albion/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Cambridge United/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Carlisle United/: 2024-25
- Clubes/Inglaterra/Chesterfield/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Crewe Alexandra/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Exeter City/: 2023-24, 2024-25
- Clubes/Inglaterra/Fleetwood Town/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Gillingham/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Lincoln City/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Morecambe/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Northampton Town/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Oxford United/: 2024-25
- Clubes/Inglaterra/Peterborough United/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Plymouth Argyle/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Reading/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Rotherham United/: 2023-24
- Clubes/Inglaterra/Salford City/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Shrewsbury Town/: 2022-23, 2023-24, 2024-25
- Clubes/Inglaterra/Tranmere Rovers/: 2024-25
- Clubes/Inglaterra/Wigan Athletic/: 2022-23, 2023-24
- Clubes/Escocia/Falkirk/: 2024-25
- Clubes/Escocia/Hibernian/: 2022-23, 2023-24, 2024-25
- Clubes/Escocia/Ross County/: 2022-23, 2023-24, 2024-25

Los nombres son `<base del PDF>.xhtml` (por ejemplo `plymouth-group-accounts-2024-25.xhtml` al lado de `plymouth-group-accounts-2024-25.pdf`). Los «Total exemption full accounts» (p. ej. Port Vale, Sutton, Grimsby) cuentan como pequeñas y no se bajaron.

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

Carga: Onboarding, con `tools/xhtml-aarsrapport.mjs` (el eje de consolidación del grupo y la ausencia de `Revenue` que dejó la prueba anterior siguen siendo condiciones de la Auditora). Las cuentas «pequeñas» y los 5 años enteros de cada club (hasta 84 MB en disco): ver «Descarga del resto» más abajo.

## Descarga del resto (to-do 356, punto 1): hecha, con el ok de Guido en el chat («baja el resto»)

Se bajaron los **129 archivos restantes: 38,5 MB en disco (3,7 MB por la red)**; con los 69 de antes son los **198 del relevamiento, 84,0 MB**. Mismo método (pedido por rango al ZIP mensual, cada uno a una carpeta nueva y vacía, tamaño y nombre comprobados contra el índice, sin ejecutar nada) y todos con cabecera XHTML/XML. Quedaron en `Clubes/` de este worktree **y** de main, con el nombre `<base del PDF del año>-ixbrl.xhtml`; cuando el año no tiene PDF con ese patrón (44 casos, sobre todo ejercicios 2020-21 y 2019-20) el nombre es `<club>-<sociedad>-accounts-AAAA-AA-ixbrl.xhtml`; cuando la sociedad es la segunda de un club (Barnet, Doncaster, Port Vale, Salford, Crawley, Fleetwood) o el nombre ya existía, lleva `-<sociedad>` antes de `-ixbrl`. Son las cuentas «pequeñas» (small, micro, total exemption, abridged) de todos los años y las completas de 2020-21 y 2021-22 que faltaban. **Ojo:** las pequeñas pueden venir sin cuenta de resultados. Los 69 de antes, en mi worktree, siguen con el nombre viejo (sin `-ixbrl`); en main ya los renombró la principal (el de Gillingham 2022-23 le quedó fuera).
- Clubes/Inglaterra/Accrington Stanley/: 5 (2020-21 a 2024-25, small)
- Clubes/Inglaterra/Barnet/: 10 (dos sociedades, 2020-21 a 2024-25 cada una, small)
- Clubes/Inglaterra/Blackpool/: 2 (2020-21, 2021-22, group)
- Clubes/Inglaterra/Cambridge United/: 2 (2020-21, 2021-22, total exemption)
- Clubes/Inglaterra/Cheltenham Town/: 4 (2020-21, 2022-23, 2023-24, 2024-25, small)
- Clubes/Inglaterra/Colchester United/: 1 (2020-21, small)
- Clubes/Inglaterra/Crawley Town/: 6 (2020-21 a 2024-25 de 03858150 y 2024-25 micro de 15899186)
- Clubes/Inglaterra/Crewe Alexandra/: 1 (2020-21, full)
- Clubes/Inglaterra/Doncaster Rovers/: 8 (03739676 2020-21 a 2024-25, small; 00170192 2023-24, 2024-25, 2025-26, total exemption)
- Clubes/Inglaterra/Fleetwood Town/: 7 (small 2021-22 a 2024-25; full 2020-21; group 2020-21 y 2021-22)
- Clubes/Inglaterra/Gillingham/: 2 (2020-21, 2021-22, full)
- Clubes/Inglaterra/Grimsby Town/: 3 (2022-23 a 2024-25, total exemption)
- Clubes/Inglaterra/Leyton Orient/: 4 (2021-22 a 2024-25, total exemption)
- Clubes/Inglaterra/Lincoln City/: 2 (2020-21, 2021-22, full)
- Clubes/Inglaterra/Mansfield Town/: 5 (2019-20, 2020-21, 2021-22, 2022-23, 2024-25)
- Clubes/Inglaterra/Morecambe/: 2 (2020-21, 2021-22, full)
- Clubes/Inglaterra/Newport County/: 2 (2023-24, 2024-25, total exemption)
- Clubes/Inglaterra/Northampton Town/: 2 (2020-21, 2021-22, small)
- Clubes/Inglaterra/Notts County/: 5 (2020-21 a 2024-25, small)
- Clubes/Inglaterra/Oxford United/: 3 (2020-21, 2021-22, 2022-23, total exemption)
- Clubes/Inglaterra/Peterborough United/: 1 (2021-22, full)
- Clubes/Inglaterra/Plymouth Argyle/: 2 (2020-21, 2021-22, full)
- Clubes/Inglaterra/Port Vale/: 4 (08876768 y 11954695, 2023-24 y 2024-25, total exemption)
- Clubes/Inglaterra/Reading/: 2 (2020-21, 2021-22, full)
- Clubes/Inglaterra/Salford City/: 5 (group 2021-22; 08912116 2021-22 a 2024-25, small)
- Clubes/Inglaterra/Shrewsbury Town/: 2 (2020-21, 2021-22, full)
- Clubes/Inglaterra/Stevenage/: 4 (2020-21, 2022-23, 2023-24, 2024-25)
- Clubes/Inglaterra/Stockport County/: 5 (2020-21 a 2024-25)
- Clubes/Inglaterra/Sutton United/: 3 (2022-23 a 2024-25, total exemption)
- Clubes/Inglaterra/Swindon Town/: 4 (2020-21, 2022-23, 2023-24, 2024-25, total exemption)
- Clubes/Inglaterra/Wycombe Wanderers/: 3 (2021-22, 2023-24, 2024-25, small)
- Clubes/Escocia/Dundee/: 5 (2020-21 a 2024-25, small)
- Clubes/Escocia/Falkirk/: 4 (2020-21 a 2023-24, small)
- Clubes/Escocia/Hibernian/: 1 (2021-22, full)
- Clubes/Escocia/Livingston/: 4 (2020-21 a 2023-24, small)
- Clubes/Escocia/Motherwell/: 2 (2020-21, 2021-22, full)
- Clubes/Escocia/Ross County/: 2 (2020-21, 2021-22, full)

## Fuente pública de los depósitos daneses (to-do 356, punto 2)

Cada archivo se identificó **comparando el hash** del documento de `Clubes/Dinamarca/` (carpeta de main) con el que sirve `regnskaber.virk.dk` para ese CVR y ese ejercicio (índice `distribution.virk.dk/offentliggoerelser`, por `cvrNummer`). El link es el `dokumentUrl` de la Erhvervsstyrelsen, tal cual lo da la API: **`http://`** (con `https://` el servidor da error de SSL), descarga directa sin cuenta. La ficha del CVR en `datacvr.virk.dk` da 403 (Cloudflare) desde la terminal: sirve el `dokumentUrl`, no esa página. «Sag» es el número de la presentación. CVR: Fredericia 27263496, Vejle 31085179, Brøndby 83933410, Nordsjælland 24257703, SønderjyskE 31588111, FC København P/S 43952161 y PARKEN Sport & Entertainment 15107707.

| Club (carpeta) | Archivo | Sag | Presentado | dokumentUrl |
| --- | --- | --- | --- | --- |
| FC Fredericia | `aarsrapport-2021-12-31.pdf` | X22-BX-21-DY | 2022-04-08 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzLzdkL2QzL2IwLzM2LzYzZTctNDNkOC05YzQ0LWJkOWI2MmQ4NDRiOQ.pdf |
| FC Fredericia | `aarsrapport-2022-12-31.pdf` | X23-DU-70-NE | 2023-04-26 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzL2E0LzcxL2RkLzg3L2UzZTEtNGMwMS04OTA4LTlmMDNkMjg1NzMwOQ.pdf |
| FC Fredericia | `aarsrapport-2023-12-31.pdf` | X24-HC-05-HK y X24-HC-05-HV (dos presentaciones idénticas el mismo día) | 2024-04-09 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzLzYwLzlmLzBhLzIzLzU1ODItNDQ5NS1hNDYxLTgxMWIzNWJiNzRjZA.pdf (HK) <br> http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzLzVjLzc3LzU2L2NiLzc0NWYtNGQxYS1iNDI4LTNkNWIyYzFmY2IxNw.pdf (HV) |
| FC Fredericia | `aarsrapport-2024-12-31.pdf` | X25-BQ-11-RT | 2025-04-08 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzL2RiLzYwLzJhL2IzLzcyMzgtNDU2Mi1iZmE0LTJlOGJlZjgxMjFjYw.pdf |
| FC Fredericia | `aarsrapport-2025-12-31.xhtml` | X26-BT-55-KB | 2026-04-22 | http://regnskaber.virk.dk/69436272/amNsb3VkczovLzAzLzM2L2FlL2M0Lzk4LzI3OTItNGNkZi1iYmM2LTM0MTg4OTlkNWE3Zg.xhtml |
| FC København | `aarsrapport-2025-12-31.xhtml` (F.C. København P/S) | X26-CA-54-CK | 2026-05-06 | http://regnskaber.virk.dk/16125934/amNsb3VkczovLzAzL2JjL2JmLzdmLzk2L2E0NDItNGQ1Yy1hZDFlLTJhNWM0Njg0Nzk3Yg.xhtml |
| FC København | `aarsrapport-2021-12-31-PSE-consolidado.xhtml` | X22-CL-60-FP | 2022-05-05 | http://regnskaber.virk.dk/70770151/amNsb3VkczovLzAzL2U0LzFiLzQyLzAzLzRlZTktNGZmNS1iNTMzLTQ0NTU3M2JlYzZiNw.xhtml |
| FC København | `aarsrapport-2022-12-31-PSE-consolidado.xhtml` | X23-DV-57-DQ | 2023-05-02 | http://regnskaber.virk.dk/70770151/amNsb3VkczovLzAzLzIzL2YxLzFhLzNhLzM1ZjAtNDg5Yi04NDVlLTg5NTY5MWM2MmRkNw.xhtml |
| FC København | `aarsrapport-2023-12-31-PSE-consolidado.xhtml` | X24-HH-38-SC | 2024-04-23 | http://regnskaber.virk.dk/70770151/amNsb3VkczovLzAzLzEzL2VkL2EwLzY1LzlmMWUtNGU2NS1hMmQxLWQ2NGE3OTJhMjczZQ.xhtml |
| FC København | `aarsrapport-2024-12-31-PSE-consolidado.xhtml` | X25-BU-66-BF | 2025-04-23 | http://regnskaber.virk.dk/70770151/amNsb3VkczovLzAzL2ZkL2E0L2RmL2ExLzA1MDUtNDA3YS04OTQ3LWM4ZTk1YjQzNTU3ZQ.xhtml |
| FC København | `aarsrapport-2025-12-31-PSE-consolidado.xhtml` | X26-BZ-40-WF | 2026-05-04 | http://regnskaber.virk.dk/70770151/amNsb3VkczovLzAzLzliLzM2Lzc0L2FjLzEwMjUtNGU3NS04ZGUwLTAwZjI1ZWI4NjhjYg.xhtml |
| FC Nordsjælland | `aarsrapport-2025-12-31.xhtml` | X26-CH-91-PB | 2026-05-21 | http://regnskaber.virk.dk/30775242/amNsb3VkczovLzAzL2ZhLzhjLzdjLzNjLzkwMjMtNDhhYS05YTc1LTJiMzUwZTVmMzAzZQ.xhtml |
| Vejle | `aarsrapport-2025-12-31.xhtml` | X26-BM-48-YE | 2026-03-26 | http://regnskaber.virk.dk/97158013/amNsb3VkczovLzAzL2YzLzUzL2VhLzRiL2NjNzQtNDlkNC04YmM5LTEzYWU3OTU4MzQwYw.xhtml |
| Brøndby | `aarsrapport-2021-12-31.xhtml` | X22-BW-43-BX | 2022-04-04 | http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAyLzZjLzlhLzgyL2ZiLzFiMzctNDRjNS04OGZjLTQxMjQwMTM5ZTgzNA.xhtml (idéntico: http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAzLzgwLzE4LzQ4LzZkL2IyNmYtNGI1NC05OWY4LTFlZWY0ZjdmNThiNQ.xhtml) |
| Brøndby | `aarsrapport-2022-12-31.xhtml` | X23-CM-00-BF | 2023-04-09 | http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAzLzdlL2JlL2E1LzNiL2E1ZmItNDkwYS1iM2ZjLThjY2UyMjRlYWI1OQ.xhtml (idéntico: http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAyLzYwLzg1LzY1L2NjLzQ3Y2MtNDY0MS1hZDAxLThlOGM5ZWZjMTE2Yw.xhtml) |
| Brøndby | `aarsrapport-2023-2024-06-30-transicion.xhtml` (01/01/2023-30/06/2024) | X24-KH-26-ZJ | 2024-10-04 | http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAyL2UzL2NkL2JkLzJlLzc3NDAtNGMxNC05N2U2LTc2OWU4MDYyMjNhZQ.xhtml (idéntico: http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAzLzhlLzM3LzNhLzQ3L2IzZGQtNGQ0NS1hODk5LTgwOTM5MDkwNjFjMw.xhtml) |
| Brøndby | `aarsrapport-2025-06-30.xhtml` | X25-MX-25-YU (republicación del 27/10/2025, con `REDEGOERELSE_FOR_OMGOERELSE`; la primera fue X25-MW-88-HQ del 23/10/2025, casi idéntica, 1 byte menos) | 2025-10-27 | http://regnskaber.virk.dk/01433938/amNsb3VkczovLzAzL2VmLzI1L2EwL2Y2LzdhMTAtNDQyYi1iMDc4LTdjM2ViOTBjYzFiNA.xhtml |
| SønderjyskE | `aarsrapport-2022-2023-09-30-transicion.xhtml` (01/07/2022-30/09/2023) | X23-GH-21-DT | 2024-04-10 | http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2U0L2M4L2I1L2UxL2VmMzgtNDNkNC1hOGMyLTAwMTA0Zjc2NzkwMQ.xhtml |
| SønderjyskE | `aarsrapport-2024-09-30.xhtml` | X24-KS-96-MZ | 2025-04-02 | http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2YxLzBjLzMxLzFmLzJjZWMtNDI3YS05OWUwLWM1Njc4ZjUyNjg4NQ.xhtml |
| SønderjyskE | `aarsrapport-2025-09-30.xhtml` | X26-BN-34-MY | 2026-03-30 | http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2Y0L2UwLzY1L2NmL2NlMmEtNGI3Ny1iYjdiLTRiYjQyNmQyNmUwMw.xhtml |

Notas:
- **Fredericia 2021-24 no tienen XHTML en el depósito**: la API solo ofrece PDF y XML para esos años (el XHTML recién aparece en 2025). Los archivos de `Clubes/` son esos PDF; el XML iXBRL de la misma presentación está en el mismo registro si se lo quiere para el tie-out (ver `dokumenter` de cada presentación en la API).
- **Defecto en `Clubes/Dinamarca/Brøndby/aarsrapport-2025-06-30.xhtml` (en main): está comprimido con gzip** (412.218 bytes; descomprimido son 953.987, exactamente el del depósito). Cualquier lector que lo abra como texto ve basura. Revisé todos los `.xhtml` de `Clubes/Dinamarca/` de main: es el único comprimido. Hay que `gunzip`earlo antes de convertirlo.
- **Brøndby 2021-2024 trae dos `.xhtml` idénticos por presentación** (los dos `AARSRAPPORT`): se listó ambos; es el mismo documento.
- SønderjyskE: los depósitos corresponden a las fechas de la carpeta (el ejercicio largo del 01/07/2022 al 30/09/2023 es la «transición»).

