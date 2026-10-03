# Test de confiabilidad de Jev (backtest contra rubros ya cargados)

Generado por `tools/jev-categorizar.mjs --backtest` el 2026-09-30. 3975 rubros con respuesta; la "verdad" es la categoría que una sesión humana ya asignó y está en producción.
Modo: lado desconocido (las 26 categorías juntas).

**Acierto total: 2762/3975 (69.5%)**

| Confianza de Jev | Rubros | Aciertos | % |
|---|---|---|---|
| ≥ 0,90 | 1676 | 1514 | 90.3% |
| 0,70 – 0,90 | 813 | 591 | 72.7% |
| 0,50 – 0,70 | 699 | 360 | 51.5% |
| < 0,50 | 787 | 297 | 37.7% |

Rubros donde Jev eligió una categoría del LADO equivocado (ingreso vs gasto): 359.

## Errores con confianza ≥ 0,70 (el caso peligroso): 384

| Club | Rubro | Real | Jev | Conf. |
|---|---|---|---|---|
| alianzalima-pe | Otros ingresos | lump_football_operations | other_income | 1.00 |
| anderlecht-be | Andere bedrijfsopbrengsten | player_sales | other_income | 1.00 |
| atleticomadrid | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| boca | Otras Amortizaciones | depreciation | other_amortisation | 1.00 |
| celtavigo | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| deportivoalaves | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| elche-es | Ingresos de taquillas (Liga y Copa del Rey) | competition_bonus | matchday_competition | 1.00 |
| elche-es | Ingresos de taquillas (Liga, Copa del Rey y amistosos) | competition_bonus | matchday_competition | 1.00 |
| fcbarcelona | Otras amortizaciones (Notas 6 y 7) | depreciation | other_amortisation | 1.00 |
| genk-be | Andere bedrijfsopbrengsten | player_sales | other_income | 1.00 |
| gent-be | Andere bedrijfsopbrengsten | player_sales | other_income | 1.00 |
| gimnasiaesgrima-ar | Venta Merchandising | other_income | sponsorship_commercial | 1.00 |
| gremio | Ingressos a Sócios | admin_general_expense | member_dues | 1.00 |
| newells-ar | Gastos seguridad y control | admin_general_expense | match_organisation_expense | 1.00 |
| osasuna-es | Taquillas Liga y amistosos | competition_bonus | matchday_competition | 1.00 |
| realbetis | Otras amortizaciones (propiedad industrial, aplicaciones informáticas, | depreciation | other_amortisation | 1.00 |
| rosariocentral | Ingresos fútbol profesional | other_income | lump_football_operations | 1.00 |
| sanlorenzo | Administración central | member_dues | admin_general_expense | 1.00 |
| tottenham-gb | Exceptional items - Onerous employment contracts | admin_general_expense | exceptional_items | 1.00 |
| tottenham-gb | Exceptional items - Onerous employment contracts and other employment  | admin_general_expense | exceptional_items | 1.00 |
| valenciacf | Otras amortizaciones | depreciation | other_amortisation | 1.00 |
| boca | Departamento de básquet — Remuneraciones y cargas sociales | wages_squad | youth_other_sports_expense | 0.99 |
| boca | Socios | admin_general_expense | member_dues | 0.99 |
| botafogo | Locação de camarotes | season_tickets | stadium_other | 0.99 |
| botafogo | Diversos (G&A) | other_expenses | admin_general_expense | 0.99 |
| brentford-gb | Administrative expenses (resto sin desglosar) | other_expenses | admin_general_expense | 0.99 |
| corinthians-br | Futebol (custo operacional da área, sem nota própria de detalhe) | match_organisation_expense | lump_football_operations_expense | 0.99 |
| cruzeiro | Impostos e contribuições | other_income | admin_general_expense | 0.99 |
| eintrachtfrankfurt-de | Merchandising | admin_general_expense | sponsorship_commercial | 0.99 |
| fluminense-br | Resultado de Equivalência Patrimonial (Fla-Flu Serviços S.A.) | exceptional_items | other_income | 0.99 |
| godoycruz-ar | Ingreso por Derecho de Formación / Mec. Solidaridad | player_sales | youth_football | 0.99 |
| godoycruz-ar | Ingreso por Alquiler Instalaciones Deportivas | other_income | stadium_other | 0.99 |
| instituto | Limpieza y vigilancia (Sede) | youth_other_sports_expense | admin_general_expense | 0.99 |
| junior-co | Gastos Operacionales de Administración: Diversos | other_expenses | admin_general_expense | 0.99 |
| osasuna-es | Socios | season_tickets | member_dues | 0.99 |
| racing | Televisión AFA | admin_general_expense | broadcasting | 0.99 |
| racing | Otros egresos | admin_general_expense | other_expenses | 0.99 |
| river | Socios | admin_general_expense | member_dues | 0.99 |
| rosariocentral | Ingresos por concesiones | other_income | stadium_other | 0.99 |
| rosariocentral | Ingresos por alquileres de inmuebles e instalaciones | other_income | stadium_other | 0.99 |
| rosariocentral | Gastos de fútbol profesional | other_expenses | lump_football_operations_expense | 0.99 |
| saopaulo-br | Multas recebidas (Resultado Não Operacional) | exceptional_items | other_income | 0.99 |
| saopaulo-br | Resultado de equivalência patrimonial em cotas de fundos (nota 10.3) | exceptional_items | other_income | 0.99 |
| tottenham-gb | Profit on disposal of property, plant and equipment | other_expenses | other_income | 0.99 |
| union | Recursos por alquiler de instalaciones | other_income | stadium_other | 0.99 |
| voltaredonda-br | Ganho Mensuração a Valor Justo (reavaliação de imóveis, Nota 9) | exceptional_items | other_income | 0.99 |
| argentinosjuniors | Derechos de formación | player_sales | youth_football | 0.98 |
| atleticomineiro-br | (-) Impostos e contribuições | other_income | admin_general_expense | 0.98 |
| botafogo | Locações de camarotes | season_tickets | stadium_other | 0.98 |
| botafogosp-br | Impostos Incidentes sobre Receitas (TEF) | other_income | admin_general_expense | 0.98 |
| botafogosp-br | Outras Despesas (Nota 24) | admin_general_expense | other_expenses | 0.98 |
| losandes-ar | Gastos Otros Dptos (Admin/Sede) | other_expenses | admin_general_expense | 0.98 |
| newells-ar | Resultado vta. Mercadería oficial | other_income | sponsorship_commercial | 0.98 |
| pontepreta-br | Administrativo - Estadio | stadium_other | admin_general_expense | 0.98 |
| pontepreta-br | Administrativo - Estadio | match_organisation_expense | admin_general_expense | 0.98 |
| racing | Cobros de derechos de formación y mecanismo de solidaridad | player_sales | youth_football | 0.98 |
| rbbragantino-br | Custo do departamento de futebol | wages_squad | lump_football_operations_expense | 0.98 |
| sanlorenzo | Derechos de formación | player_sales | youth_football | 0.98 |
| velez | Derechos de formación | player_sales | youth_football | 0.98 |
| velez | Seguridad y vigilancia (sectores) | admin_general_expense | match_organisation_expense | 0.98 |

## Acierto por categoría real

| Categoría | Rubros | Aciertos |
|---|---|---|
| admin_general_expense | 697 | 497 |
| other_income | 494 | 333 |
| other_expenses | 448 | 298 |
| wages_squad | 279 | 170 |
| sponsorship_commercial | 255 | 238 |
| player_amortisation | 196 | 125 |
| match_organisation_expense | 192 | 145 |
| player_sales | 180 | 111 |
| depreciation | 172 | 153 |
| broadcasting | 169 | 133 |
| youth_other_sports_expense | 160 | 75 |
| matchday_competition | 155 | 107 |
| competition_bonus | 94 | 64 |
| member_dues | 83 | 73 |
| other_sports | 56 | 16 |
| exceptional_items | 51 | 12 |
| lump_football_operations | 46 | 33 |
| stadium_other | 44 | 35 |
| season_tickets | 43 | 33 |
| other_amortisation | 41 | 34 |
| youth_football | 35 | 17 |
| player_impairment | 25 | 15 |
| education_expense | 20 | 16 |
| education | 19 | 16 |
| lump_football_operations_expense | 18 | 10 |
| womens_football | 3 | 3 |
