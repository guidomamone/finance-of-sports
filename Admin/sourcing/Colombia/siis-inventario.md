<!-- md: qué años de cada club colombiano tiene SIIS y cuáles faltan bajar | leer: antes de buscar documentos de Colombia; generado, no se edita -->
# SIIS: lo que tiene contra lo que bajamos (generado)

Generado el 2026-10-26 por `node tools/siis-estado.mjs --inventario --escribir`. 454 presentaciones de 66 NIT en los tres CIIU deportivos (R9312, R9319, R9311). Cada año: ✔ bajado (`siis-estado-AAAA.md`), p solo tenemos el PDF de notas, · no tenemos nada, ✗ frenado (una compuerta no cierra; `frenados` en `tools/siis-clubes.json`), – SIIS no tiene estado de resultados de ese año. La columna «faltan» cuenta los años sin `siis-estado`: se bajan con `node tools/siis-estado.mjs --club "<Club>" --todos --escribir`. El mismo faltante lo avisa `audit.js` (`siis-faltante`).

| Club (carpeta) | NIT | Años en SIIS | Faltan |
| --- | --- | --- | ---: |
| Alianza FC | 800115610 | 2016p 2017· 2018· 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| America de Cali | 890305773 | 2016· 2017· 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Atletico Nacional | 900464187 | 2015p 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 11 |
| Millonarios | 900430878 | 2015· 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023· 2024p 2025p | 11 |
| Barranquilla FC | 802019847 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Bogota FC | 800119855 | 2016p 2017· 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Atletico Bucaramanga | 890203822 | 2016p 2017p 2018p 2019p 2020p 2021· 2022p 2023p 2024p 2025p | 10 |
| Boca Juniors de Cali | 822005972 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Toros de Cordoba | 900477535 | 2017p 2018p 2019p 2021p 2022p 2023· | 6 |
| Real Sincelejo | 823004222 | 2017p | 1 |
| Deportes Tolima | 890700863 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025✔ | 9 |
| Atletico FC | 900913426 | 2016· 2017p 2018p 2019p 2020p 2021· 2022p 2023p 2024p 2025p | 10 |
| Atletico Huila | 800118562 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| La Equidad | 800108152 | 2016p 2017p 2018· 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Caimanes de Barranquilla | 900650770 | 2016p 2017· 2018p 2019p 2021· 2022· 2023p 2024· 2025p | 9 |
| Junior de Barranquilla | 900456729 | 2016p 2017· 2018· 2019p 2020· 2021· 2022· 2023p 2024p 2025p | 10 |
| Real Santander | 900124662 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Llaneros | 900525626 | 2016p 2017p 2018p 2019p 2020p 2021· 2022p 2023p 2024p 2025p | 10 |
| Titanes de Barranquilla | 901213941 | 2021p 2022p 2023p 2024p 2025p | 5 |
| Corsarios | 901509919 | 2022p 2023p 2024p 2025p | 4 |
| Deportivo Cali | 890301160 | 2025p | 1 |
| Cortulua | 800097185 | 2020· 2021p 2022p 2023p 2024p 2025p | 6 |
| Cucuta Deportivo | 890500817 | 2016p 2017p 2018p 2019p 2022p 2023p 2024p 2025p | 8 |
| Deportes Quindio | 890003300 | 2016p 2017p 2018p 2019p 2020p 2021p 2022· 2023· 2024· 2025· | 10 |
| Boyaca Chico | 830100504 | 2016p 2017· 2018· 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Deportivo Pereira | 901644853 | 2024p 2025p | 2 |
| Independiente Medellin | 900577148 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Envigado | 900470848 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Fortaleza CEIF | 900964178 | 2016· 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Independiente Santa Fe | 860009807 | 2016p 2017p 2018p 2019✗ 2020p 2021p 2022p 2023p 2024p 2025✗ | 8 |
| Jaguares | 808000102 | 2016· 2017p 2018· 2019p 2020p 2021· 2022p 2023p 2024p 2025p | 10 |
| Leones FC | 800015819 | 2016p 2017· 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Once Caldas | 890801447 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Orsomarso | 900472654 | 2016p 2017p 2018p 2020p 2021p 2022p 2023p 2024p 2025p | 9 |
| Patriotas Boyaca | 820004480 | 2016p 2017p 2018p 2019p 2020p 2021· 2022p 2023p 2024p 2025p | 10 |
| Real Cartagena | 800157706 | 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 9 |
| Aguilas Doradas | 900456885 | 2016p 2017p 2018p 2019p 2020p 2021p 2022p 2023p 2024p 2025p | 10 |
| Tigres FC | 806004636 | 2016· 2017p 2018p 2019p 2020p 2021p 2022p 2024p | 8 |
| Union Magdalena | 891700992 | 2016· 2017· 2018p 2019· 2020· 2021· 2022p 2023p 2024p 2025p | 10 |

## NIT de SIIS sin carpeta en tools/siis-clubes.json

Algunos son clubes de fútbol que faltan dar de alta (se suman a `tools/siis-clubes.json` y a `alta-club.mjs`); el resto son gimnasios, campos de golf y empresas de instalaciones que no entran.

| NIT | Razón social | CIIU | Años (cantidad) |
| --- | --- | --- | --- |
| 800097356 | -BG EVENTOS SAS | R9319 | 2020–2022 (2) |
| 900434583 | AFE ATHLETIC FITNESS EXPERIENCE CENTRO MEDICO DEPORTIVO | R9319 | 2022–2023 (2) |
| 860500634 | AUTODROMOS SA | R9311 | 2018–2019 (2) |
| 900720607 | BOGOTA PIRATAS SA | R9312 | 2016–2025 (8) |
| 890904078 | CLUB CAMPESTRE EL RODEO S.A. | R9312 | 2016–2025 (9) |
| 890903649 | CLUB SOCIAL Y DEPORTIVO LOS ANADES | R9312 | 2020–2025 (6) |
| 900938991 | COLOMBIA TRI EVENTS S.A.S. | R9319 | 2019–2020 (2) |
| 900563427 | COMERCIALIZADORA DE DEPORTES S.A.S. | R9312 | 2020–2025 (6) |
| 900695572 | CONDORES DE CUNDINAMARCA CLUB DEPORTIVO PROFESIONAL SA | R9312 | 2021–2022 (2) |
| 900721306 | Fomentar, patrocinar y practicar el baloncesto con deportistas bajo remuneración | R9312 | 2024–2024 (1) |
| 901123128 | FRASTBREAK BASKETBALL CLUB SA | R9319 | 2018–2025 (7) |
| 900043080 | FUTBOL 5 COLOMBIA SAS | R9311 | 2017–2024 (8) |
| 901330760 | GIGANTES DE BARRANQUILLA SA | R9312 | 2021–2025 (5) |
| 900906314 | GLOBAL SPORTS GS SAS | R9311 | 2019–2019 (1) |
| 900722580 | GRUPO EMPRESARIAL CTAF INVERSIONES SAS | R9311 | 2020–2020 (1) |
| 830092626 | IMLA DE COLOMBIA SAS | R9319 | 2016–2016 (1) |
| 800114736 | INVERSIONES CLUB CAMPESTRE DE CARTAGO S.A. | R9319 | 2024–2024 (1) |
| 900410156 | INVERSIONES DEPORTIVAS VML S.A.S. | R9319 | 2016–2016 (1) |
| 900198996 | JORDAN INDUSTRIAS DE COLOMBIA  S.A.S. | R9311 | 2019–2019 (1) |
| 800140673 | LAVERDIER SAS | R9312 | 2019–2019 (1) |
| 900707366 | MAXIROJO SAS | R9319 | 2016–2022 (5) |
| 900766397 | OTF COLOMBIA S A S | R9311 | 2022–2025 (4) |
| 900358965 | PLAYGREENS INTERNATIONALSAS | R9311 | 2019–2024 (6) |
| 830514070 | RUITOQUE GOLF COUNTRY CLUB S.A.S | R9312 | 2019–2025 (7) |
| 900777063 | SPORTY CITY S.A.S | R9311 | 2016–2025 (10) |
| 900527811 | ULTRA WELLNESS CENTER SAS | R9312 | 2017–2022 (4) |
| 824006447 | VALLEDUPAR FUTBOL CLUB S.A. | R9312 | 2016–2025 (10) |
