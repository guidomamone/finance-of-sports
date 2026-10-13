# Test de confiabilidad de Jev (backtest contra rubros ya cargados)

Generado por `tools/jev-categorizar.mjs --backtest` el 2026-09-30. 3975 rubros con respuesta; la "verdad" es la categoría que una sesión humana ya asignó y está en producción.
Modo: lado conocido (solo las categorías del lado correcto); con 8 ejemplos parecidos ya categorizados (solo de OTROS clubes).

**Acierto total: 3298/3975 (83.0%)**

| Confianza de Jev | Rubros | Aciertos | % |
|---|---|---|---|
| ≥ 0,90 | 2758 | 2603 | 94.4% |
| 0,70 – 0,90 | 590 | 390 | 66.1% |
| 0,50 – 0,70 | 400 | 212 | 53.0% |
| < 0,50 | 227 | 93 | 41.0% |

Rubros donde Jev eligió una categoría del LADO equivocado (ingreso vs gasto): 0.

## Errores con confianza ≥ 0,70 (el caso peligroso): 355

| Club | Rubro | Real | Jev | Conf. |
|---|---|---|---|---|
| alianzalima-pe | Otros ingresos | lump_football_operations | other_income | 1.00 |
| almagro-ar | Gastos bancarios | other_expenses | admin_general_expense | 1.00 |
| atleticogoianiense | Salários e encargos (administrativo) | wages_squad | admin_general_expense | 1.00 |
| banfield-ar | Sector Estadio (mantenimiento, servicios y personal) | match_organisation_expense | admin_general_expense | 1.00 |
| boca | Departamento de básquet — Remuneraciones y cargas sociales | wages_squad | youth_other_sports_expense | 1.00 |
| eintrachtfrankfurt-de | Aufwendungen für bezogene Waren | admin_general_expense | other_expenses | 1.00 |
| estudianteslp | Gastos por transferencias y préstamos jugadores | player_amortisation | other_expenses | 1.00 |
| fortaleza-br | Viagens e estadias (futebol) | wages_squad | match_organisation_expense | 1.00 |
| fortaleza-br | Amortização do intangível (softwares) | depreciation | other_amortisation | 1.00 |
| gimnasiaesgrima-ar | Venta Merchandising | other_income | sponsorship_commercial | 1.00 |
| newells-ar | Gastos Varios | admin_general_expense | other_expenses | 1.00 |
| newells-ar | Estadía, concentración y otros | wages_squad | match_organisation_expense | 1.00 |
| osasuna-es | Socios | season_tickets | member_dues | 1.00 |
| racing | Otros egresos | admin_general_expense | other_expenses | 1.00 |
| rosariocentral | Ingresos por concesiones | other_income | stadium_other | 1.00 |
| rosariocentral | Ingresos por ventas tiendas | other_income | sponsorship_commercial | 1.00 |
| sevillafc | Amortización del inmovilizado inmaterial (excluido jugadores) | depreciation | other_amortisation | 1.00 |
| alianzalima-pe | Otros ingresos deportivos | lump_football_operations | other_income | 0.99 |
| anderlecht-be | Niet-recurrente bedrijfskosten | player_impairment | exceptional_items | 0.99 |
| athleticoparanaense-br | Camarote | season_tickets | stadium_other | 0.99 |
| botafogosp-br | Outras Despesas (Nota 24) | admin_general_expense | other_expenses | 0.99 |
| brentford-gb | Administrative expenses (resto sin desglosar) | other_expenses | admin_general_expense | 0.99 |
| brentford-gb | Other (turnover, mismo criterio que 2024) | player_sales | other_income | 0.99 |
| ceara-br | Receitas com Eventos | other_income | stadium_other | 0.99 |
| ceara-br | Custos gerais com negociação de atletas | player_amortisation | other_expenses | 0.99 |
| cruzeiro | Pagamento de dívidas do Cruzeiro Associação, sem ressarcimento (Nota 1 | exceptional_items | other_expenses | 0.99 |
| godoycruz-ar | Departamento Médico | wages_squad | admin_general_expense | 0.99 |
| gremio | Receitas de Royalties | other_income | sponsorship_commercial | 0.99 |
| instituto | Mantenimiento de bienes de uso (La Agustina/Sede) | youth_other_sports_expense | admin_general_expense | 0.99 |
| instituto | Servicios de energía, agua, gas, etc. (La Agustina/Sede/Tienda) | youth_other_sports_expense | admin_general_expense | 0.99 |
| instituto | Quebranto por juicios | admin_general_expense | other_expenses | 0.99 |
| leeds-gb | Catering income | other_income | stadium_other | 0.99 |
| newells-ar | Resultado vta. Mercadería oficial | other_income | sponsorship_commercial | 0.99 |
| newells-ar | Gastos seguridad y control | admin_general_expense | match_organisation_expense | 0.99 |
| osasuna-es | Taquillas Liga y amistosos | competition_bonus | matchday_competition | 0.99 |
| racing | Pago por adquisición de jugadores | player_amortisation | other_expenses | 0.99 |
| rosariocentral | Costos de comercialización | other_expenses | admin_general_expense | 0.99 |
| talleres-ar | Quebranto previsión deud. incobrables | admin_general_expense | other_expenses | 0.99 |
| talleres-ar | Otros gastos ordinarios | youth_other_sports_expense | other_expenses | 0.99 |
| union | Ventas Tatengue (tienda) | other_income | sponsorship_commercial | 0.99 |
| velez | Pretemporada y concentraciones | admin_general_expense | match_organisation_expense | 0.99 |
| almagro-ar | Gastos Compra Jugadores | player_amortisation | other_expenses | 0.98 |
| atleticogoianiense | Contingências | other_expenses | admin_general_expense | 0.98 |
| botafogo | Mídias digitais | sponsorship_commercial | broadcasting | 0.98 |
| boyacachico-co | Ingresos por auxilio Hotelero – Dimayor | broadcasting | competition_bonus | 0.98 |
| colocolo-cl | Amortización Activos en concesión | depreciation | other_amortisation | 0.98 |
| coritiba | Patrimoniais | member_dues | other_income | 0.98 |
| cruzeiro | Outros (transferência de atletas e mecanismo de solidariedade) | other_income | player_sales | 0.98 |
| deportivopereira-co | Auxilio arbitraje (DIMAYOR) | competition_bonus | broadcasting | 0.98 |
| deportivopereira-co | Auxilio hotelero (DIMAYOR) | competition_bonus | broadcasting | 0.98 |
| estudianteslp | Resarcimiento por rescisión de contratos | other_income | player_sales | 0.98 |
| gremio | Receitas Patrimoniais | member_dues | other_income | 0.98 |
| losandes-ar | futbol | matchday_competition | lump_football_operations | 0.98 |
| losandes-ar | Servicios Públicos (Otros Dptos) | youth_other_sports_expense | admin_general_expense | 0.98 |
| rosariocentral | Ingresos regalías | other_income | sponsorship_commercial | 0.98 |
| rosariocentral | Balneario y pileta (gasto) | other_expenses | youth_other_sports_expense | 0.98 |
| santos-br | Amortização Intangível - software | other_amortisation | depreciation | 0.98 |
| talleres-ar | Quebranto previsión deudores incobrables | admin_general_expense | other_expenses | 0.98 |
| vascodagama-br | Mecanismo de solidariedade | youth_football | player_sales | 0.98 |
| velez | Por competencias deportivas | matchday_competition | competition_bonus | 0.98 |

## Acierto por categoría real

| Categoría | Rubros | Aciertos |
|---|---|---|
| admin_general_expense | 697 | 552 |
| other_income | 494 | 427 |
| other_expenses | 448 | 366 |
| wages_squad | 279 | 223 |
| sponsorship_commercial | 255 | 248 |
| player_amortisation | 196 | 166 |
| match_organisation_expense | 192 | 154 |
| player_sales | 180 | 164 |
| depreciation | 172 | 149 |
| broadcasting | 169 | 148 |
| youth_other_sports_expense | 160 | 110 |
| matchday_competition | 155 | 134 |
| competition_bonus | 94 | 77 |
| member_dues | 83 | 72 |
| other_sports | 56 | 37 |
| exceptional_items | 51 | 32 |
| lump_football_operations | 46 | 43 |
| stadium_other | 44 | 38 |
| season_tickets | 43 | 35 |
| other_amortisation | 41 | 31 |
| youth_football | 35 | 27 |
| player_impairment | 25 | 15 |
| education_expense | 20 | 18 |
| education | 19 | 16 |
| lump_football_operations_expense | 18 | 13 |
| womens_football | 3 | 3 |
