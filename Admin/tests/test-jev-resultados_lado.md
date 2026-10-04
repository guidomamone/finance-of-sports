# Test de confiabilidad de Jev (backtest contra rubros ya cargados)

Generado por `tools/jev-categorizar.mjs --backtest` el 2026-09-30. 3975 rubros con respuesta; la "verdad" es la categoría que una sesión humana ya asignó y está en producción.
Modo: lado conocido (solo las categorías del lado correcto); sin ejemplos.

**Acierto total: 2951/3975 (74.2%)**

| Confianza de Jev | Rubros | Aciertos | % |
|---|---|---|---|
| ≥ 0,90 | 1845 | 1715 | 93.0% |
| 0,70 – 0,90 | 836 | 600 | 71.8% |
| 0,50 – 0,70 | 710 | 380 | 53.5% |
| < 0,50 | 584 | 256 | 43.8% |

Rubros donde Jev eligió una categoría del LADO equivocado (ingreso vs gasto): 0.

## Errores con confianza ≥ 0,70 (el caso peligroso): 366

| Club | Rubro | Real | Jev | Conf. |
|---|---|---|---|---|
| alianzalima-pe | Otros ingresos | lump_football_operations | other_income | 1.00 |
| anderlecht-be | Andere bedrijfsopbrengsten | player_sales | other_income | 1.00 |
| argentinosjuniors | Derechos de formación | player_sales | youth_football | 1.00 |
| atleticomadrid | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| boca | Otras Amortizaciones | depreciation | other_amortisation | 1.00 |
| botafogo | Locação de camarotes | season_tickets | stadium_other | 1.00 |
| celtavigo | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| corinthians-br | Futebol (custo operacional da área, sem nota própria de detalhe) | match_organisation_expense | lump_football_operations_expense | 1.00 |
| deportivoalaves | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| elche-es | Ingresos de taquillas (Liga y Copa del Rey) | competition_bonus | matchday_competition | 1.00 |
| elche-es | Ingresos de taquillas (Liga, Copa del Rey y amistosos) | competition_bonus | matchday_competition | 1.00 |
| fcbarcelona | Otras amortizaciones (Notas 6 y 7) | depreciation | other_amortisation | 1.00 |
| gent-be | Andere bedrijfsopbrengsten | player_sales | other_income | 1.00 |
| gimnasiaesgrima-ar | Venta Merchandising | other_income | sponsorship_commercial | 1.00 |
| godoycruz-ar | Ingreso por Alquiler Instalaciones Deportivas | other_income | stadium_other | 1.00 |
| newells-ar | Gastos seguridad y control | admin_general_expense | match_organisation_expense | 1.00 |
| osasuna-es | Taquillas Liga y amistosos | competition_bonus | matchday_competition | 1.00 |
| osasuna-es | Socios | season_tickets | member_dues | 1.00 |
| pontepreta-br | Administrativo - Estadio | match_organisation_expense | admin_general_expense | 1.00 |
| realbetis | Otras amortizaciones (propiedad industrial, aplicaciones informáticas, | depreciation | other_amortisation | 1.00 |
| rosariocentral | Ingresos fútbol profesional | other_income | lump_football_operations | 1.00 |
| rosariocentral | Gastos de fútbol profesional | other_expenses | lump_football_operations_expense | 1.00 |
| sanlorenzo | Derechos de formación | player_sales | youth_football | 1.00 |
| tottenham-gb | Exceptional items - Onerous employment contracts | admin_general_expense | exceptional_items | 1.00 |
| valenciacf | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| velez | Derechos de formación | player_sales | youth_football | 1.00 |
| almagro-ar | Derecho de Formacion Jugadores | player_sales | youth_football | 0.99 |
| botafogo | Locações de camarotes | season_tickets | stadium_other | 0.99 |
| botafogo | Diversos (G&A) | other_expenses | admin_general_expense | 0.99 |
| botafogosp-br | Outras Despesas (Nota 24) | admin_general_expense | other_expenses | 0.99 |
| bournemouth-gb | Hospitality and events | other_income | stadium_other | 0.99 |
| genk-be | Andere bedrijfsopbrengsten | player_sales | other_income | 0.99 |
| gimnasiaesgrima-ar | 8.- Derechos de Formación y Mecanismo de Solidaridad | other_income | youth_football | 0.99 |
| godoycruz-ar | Ingreso por Derecho de Formación / Mec. Solidaridad | player_sales | youth_football | 0.99 |
| instituto | Limpieza y vigilancia (Sede) | youth_other_sports_expense | admin_general_expense | 0.99 |
| newells-ar | Resultado vta. Mercadería oficial | other_income | sponsorship_commercial | 0.99 |
| racing | Cobros de derechos de formación y mecanismo de solidaridad | player_sales | youth_football | 0.99 |
| racing | Otros egresos | admin_general_expense | other_expenses | 0.99 |
| river | Educación | youth_other_sports_expense | education_expense | 0.99 |
| rosariocentral | Derechos de formación y mecanismos de solidaridad | player_sales | youth_football | 0.99 |
| rosariocentral | Ingresos por alquileres de inmuebles e instalaciones | other_income | stadium_other | 0.99 |
| rosariocentral | Ingresos por concesiones | other_income | stadium_other | 0.99 |
| tottenham-gb | Exceptional items - Onerous employment contracts and other employment  | admin_general_expense | exceptional_items | 0.99 |
| union | Recursos por alquiler de instalaciones | other_income | stadium_other | 0.99 |
| velez | Seguridad y vigilancia (sectores) | admin_general_expense | match_organisation_expense | 0.99 |
| banfield-ar | Sector Estadio (mantenimiento, servicios y personal) | match_organisation_expense | admin_general_expense | 0.98 |
| boca | Departamento de básquet — Remuneraciones y cargas sociales | wages_squad | youth_other_sports_expense | 0.98 |
| brentford-gb | Administrative expenses (resto sin desglosar) | other_expenses | admin_general_expense | 0.98 |
| independiente | Plateas | season_tickets | matchday_competition | 0.98 |
| independiente | Resultados por derechos de formación y mecanismos de solidaridad | player_sales | youth_football | 0.98 |
| instituto | Mantenimiento de bienes de uso (La Agustina/Sede) | youth_other_sports_expense | admin_general_expense | 0.98 |
| junior-co | Gastos Operacionales de Administración: Diversos | other_expenses | admin_general_expense | 0.98 |
| newells-ar | Concesiones | other_income | stadium_other | 0.98 |
| rbbragantino-br | Custo do departamento de futebol | wages_squad | lump_football_operations_expense | 0.98 |
| rosariocentral | Concesiones | other_income | stadium_other | 0.98 |
| rosariocentral | Costos de comercialización | other_expenses | admin_general_expense | 0.98 |
| sanlorenzo | Concesiones | other_income | stadium_other | 0.98 |
| vascodagama-br | Outros (G&A) | other_expenses | admin_general_expense | 0.98 |
| almagro-ar | Sede Social- Medrano 522 CABA | member_dues | other_income | 0.97 |
| athleticoparanaense-br | Custo das Operações de Eventos | admin_general_expense | match_organisation_expense | 0.97 |

## Acierto por categoría real

| Categoría | Rubros | Aciertos |
|---|---|---|
| admin_general_expense | 697 | 488 |
| other_income | 494 | 413 |
| other_expenses | 448 | 349 |
| wages_squad | 279 | 168 |
| sponsorship_commercial | 255 | 246 |
| player_amortisation | 196 | 128 |
| match_organisation_expense | 192 | 149 |
| player_sales | 180 | 117 |
| depreciation | 172 | 152 |
| broadcasting | 169 | 133 |
| youth_other_sports_expense | 160 | 95 |
| matchday_competition | 155 | 109 |
| competition_bonus | 94 | 71 |
| member_dues | 83 | 75 |
| other_sports | 56 | 23 |
| exceptional_items | 51 | 12 |
| lump_football_operations | 46 | 32 |
| stadium_other | 44 | 38 |
| season_tickets | 43 | 33 |
| other_amortisation | 41 | 30 |
| youth_football | 35 | 22 |
| player_impairment | 25 | 14 |
| education_expense | 20 | 19 |
| education | 19 | 18 |
| lump_football_operations_expense | 18 | 14 |
| womens_football | 3 | 3 |
