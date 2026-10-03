# Test de confiabilidad de Jev (backtest contra rubros ya cargados)

Generado por `tools/jev-categorizar.mjs --backtest` el 2026-09-30. 3975 rubros con respuesta; la "verdad" es la categoría que una sesión humana ya asignó y está en producción.
Modo: lado conocido (solo las categorías del lado correcto); con 8 ejemplos parecidos ya categorizados por rubro.

**Acierto total: 3443/3975 (86.6%)**

| Confianza de Jev | Rubros | Aciertos | % |
|---|---|---|---|
| ≥ 0,90 | 2873 | 2756 | 95.9% |
| 0,70 – 0,90 | 547 | 388 | 70.9% |
| 0,50 – 0,70 | 381 | 223 | 58.5% |
| < 0,50 | 174 | 76 | 43.7% |

Rubros donde Jev eligió una categoría del LADO equivocado (ingreso vs gasto): 0.

## Errores con confianza ≥ 0,70 (el caso peligroso): 276

| Club | Rubro | Real | Jev | Conf. |
|---|---|---|---|---|
| alianzalima-pe | Otros ingresos deportivos | lump_football_operations | other_income | 1.00 |
| atleticogoianiense | Salários e encargos (administrativo) | wages_squad | admin_general_expense | 1.00 |
| banfield-ar | Sector Estadio (mantenimiento, servicios y personal) | match_organisation_expense | admin_general_expense | 1.00 |
| eintrachtfrankfurt-de | Aufwendungen für bezogene Waren | admin_general_expense | other_expenses | 1.00 |
| estudianteslp | Gastos por transferencias y préstamos jugadores | player_amortisation | other_expenses | 1.00 |
| fortaleza-br | Amortização do intangível (softwares) | depreciation | other_amortisation | 1.00 |
| gimnasiaesgrima-ar | Venta Merchandising | other_income | sponsorship_commercial | 1.00 |
| gremio | Receitas de Royalties | other_income | sponsorship_commercial | 1.00 |
| leeds-gb | Catering income | other_income | stadium_other | 1.00 |
| newells-ar | Gastos Varios | admin_general_expense | other_expenses | 1.00 |
| racing | Otros egresos | admin_general_expense | other_expenses | 1.00 |
| rosariocentral | Ingresos por concesiones | other_income | stadium_other | 1.00 |
| rosariocentral | Ingresos por ventas tiendas | other_income | sponsorship_commercial | 1.00 |
| sevillafc | Amortización del inmovilizado inmaterial (excluido jugadores) | depreciation | other_amortisation | 1.00 |
| velez | Pretemporada y concentraciones | admin_general_expense | match_organisation_expense | 1.00 |
| almagro-ar | Gastos bancarios | other_expenses | admin_general_expense | 0.99 |
| almagro-ar | Gastos de Limpieza | admin_general_expense | other_expenses | 0.99 |
| almagro-ar | Gastos Compra Jugadores | player_amortisation | other_expenses | 0.99 |
| anderlecht-be | Niet-recurrente bedrijfskosten | player_impairment | exceptional_items | 0.99 |
| athleticoparanaense-br | Camarote | season_tickets | stadium_other | 0.99 |
| ceara-br | Receitas com Eventos | other_income | stadium_other | 0.99 |
| ceara-br | Custos gerais com negociação de atletas | player_amortisation | other_expenses | 0.99 |
| colocolo-cl | Amortización Activos en concesión | depreciation | other_amortisation | 0.99 |
| godoycruz-ar | Departamento Médico | wages_squad | admin_general_expense | 0.99 |
| newells-ar | Resultado vta. Mercadería oficial | other_income | sponsorship_commercial | 0.99 |
| newells-ar | Estadía, concentración y otros | wages_squad | match_organisation_expense | 0.99 |
| newells-ar | Gastos seguridad y control | admin_general_expense | match_organisation_expense | 0.99 |
| osasuna-es | Taquillas Liga y amistosos | competition_bonus | matchday_competition | 0.99 |
| osasuna-es | Socios | season_tickets | member_dues | 0.99 |
| racing | Pago por adquisición de jugadores | player_amortisation | other_expenses | 0.99 |
| rosariocentral | Costos de comercialización | other_expenses | admin_general_expense | 0.99 |
| sanlorenzo | Ciudad deportiva (gasto) | other_expenses | admin_general_expense | 0.99 |
| vascodagama-br | Mecanismo de solidariedade | youth_football | player_sales | 0.99 |
| velez | Productos químicos, fertilizantes y semillas | admin_general_expense | other_expenses | 0.99 |
| atleticogoianiense | Contingências | other_expenses | admin_general_expense | 0.98 |
| atleticomineiro-br | Materiais médico-cirúrgicos e medicamento | wages_squad | admin_general_expense | 0.98 |
| boca | Otras contribuciones de asociados | other_income | member_dues | 0.98 |
| botafogo | Mídias digitais | sponsorship_commercial | broadcasting | 0.98 |
| brentford-gb | Administrative expenses (resto sin desglosar) | other_expenses | admin_general_expense | 0.98 |
| coritiba | Patrimoniais | member_dues | other_income | 0.98 |
| cruzeiro | Pagamento de dívidas do Cruzeiro Associação, sem ressarcimento (Nota 1 | exceptional_items | other_expenses | 0.98 |
| deportivoalaves | Otros consumos | admin_general_expense | other_expenses | 0.98 |
| estudianteslp | Resarcimiento por rescisión de contratos | other_income | player_sales | 0.98 |
| fortaleza-br | Viagens e estadias (futebol) | wages_squad | match_organisation_expense | 0.98 |
| losandes-ar | futbol | matchday_competition | lump_football_operations | 0.98 |
| rosariocentral | Ingresos regalías | other_income | sponsorship_commercial | 0.98 |
| santos-br | Amortização Intangível - software | other_amortisation | depreciation | 0.98 |
| union | Ventas Tatengue (tienda) | other_income | sponsorship_commercial | 0.98 |
| alianzalima-pe | Otros ingresos | lump_football_operations | other_income | 0.97 |
| boca | Otras Amortizaciones | depreciation | other_amortisation | 0.97 |
| corinthians-br | Explorações comerciais (segmento clube social) | other_income | sponsorship_commercial | 0.97 |
| cruzeiro | Custos com alimentação | match_organisation_expense | admin_general_expense | 0.97 |
| fortaleza-br | Baixa de partes relacionadas | exceptional_items | other_expenses | 0.97 |
| losandes-ar | Gastos Otros Dptos (Admin/Sede) | other_expenses | admin_general_expense | 0.97 |
| newells-ar | Gastos estadio cubierto | youth_other_sports_expense | match_organisation_expense | 0.97 |
| rosariocentral | Ingresos fútbol profesional | other_income | lump_football_operations | 0.97 |
| banfield-ar | Fútbol Amateur - Derechos | player_sales | youth_football | 0.96 |
| banfield-ar | Traslados Partidos y Pretemporadas | wages_squad | match_organisation_expense | 0.96 |
| chapecoense-br | Contingência Processos | exceptional_items | other_expenses | 0.96 |
| ferrocarriloeste-ar | Egresos Departamento Cultural | other_expenses | admin_general_expense | 0.96 |

## Acierto por categoría real

| Categoría | Rubros | Aciertos |
|---|---|---|
| admin_general_expense | 697 | 584 |
| other_income | 494 | 438 |
| other_expenses | 448 | 389 |
| wages_squad | 279 | 230 |
| sponsorship_commercial | 255 | 248 |
| player_amortisation | 196 | 170 |
| match_organisation_expense | 192 | 153 |
| player_sales | 180 | 165 |
| depreciation | 172 | 154 |
| broadcasting | 169 | 155 |
| youth_other_sports_expense | 160 | 129 |
| matchday_competition | 155 | 138 |
| competition_bonus | 94 | 85 |
| member_dues | 83 | 74 |
| other_sports | 56 | 41 |
| exceptional_items | 51 | 37 |
| lump_football_operations | 46 | 42 |
| stadium_other | 44 | 38 |
| season_tickets | 43 | 37 |
| other_amortisation | 41 | 35 |
| youth_football | 35 | 27 |
| player_impairment | 25 | 19 |
| education_expense | 20 | 19 |
| education | 19 | 18 |
| lump_football_operations_expense | 18 | 15 |
| womens_football | 3 | 3 |
