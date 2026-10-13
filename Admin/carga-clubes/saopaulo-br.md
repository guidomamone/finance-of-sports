# saopaulo-br — evidencia de carga

Lo que había como comentario en `data/saopaulo-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/saopaulo-br-data.js — São Paulo Futebol Clube, Brasil. Associação civil sem finalidade
econômica ou lucrativa (Nota 1: "constituída na forma de associação civil sem finalidade
econômica"), NO es SAF — mismo tipo de entidade que Flamengo (mejor plantilla de estructura para
este archivo). clubId 'saopaulo-br' (CON GUIÓN, mismo criterio que banfield-ar/flamengo-br:
bracket notation en clubs{}/CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub).

2 ejercicios cargados: 2023 y 2024 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — confirmado
leyendo la carátula de CADA documento: "NOS EXERCÍCIOS FINDOS EM 31 DE DEZEMBRO DE 2023 E 2022"
/ "...2024 E 2023", nota 2 "Base para apresentação" no declara otro cierre — clubs.js,
fiscalYearStart:'01-01', mismo criterio que Flamengo/Botafogo).

FUENTES (ver fuentes/Brasil/São Paulo.md):
- Clubes/Brasil/São Paulo/demonstracoes-financeiras-2022-2023.md/.pdf: imprime como "exercício
  corrente" el año 2023 (con 2022 de comparativo) — formato "publicação legal" (O Estado de S.
  Paulo, 26/4/2024, layout de diario en varias columnas). Se cargó el ejercicio 2023 DE ESTE
  documento (club-data-mapping sección 6, regla 5). La transcripción .md original (OCR/extracción
  de un layout de 4 columnas) intercala filas del Balanço y la DRE de forma poco confiable; para
  esta carga se re-extrajo el texto de las páginas 3, 7 y 8 del PDF fuente con
  `pdftotext -layout` (preserva la grilla de columnas del diario), lo que permitió reconciliar
  cada fila exacta contra los subtotales impresos (ver "VERIFICACIÓN" abajo).
- Clubes/Brasil/São Paulo/demonstracoes-financeiras-2023-2024.md/.pdf: PDF nativo (no es
  publicación legal, es el paquete de firmas/Clicksign), imprime como "exercício corrente" el año
  2024 (con 2023 de comparativo). Se cargó el ejercicio 2024 DE ESTE documento. Trae columnas
  "Individuais e Consolidados" — Consolidado 2024 = Controladora 2024 en TODAS las líneas (sin
  diferencia, aparentemente sin una subsidiaria consolidada material este año) — se usó
  Controladora por consistencia con el resto del archivo.
Nunca se mezcló la columna comparativa de un documento con el año corriente del otro (regla 5).

ESCALA: "Valores expressos em milhares de reais" (miles de reales) — acá en MILLONES de BRL
nativos (mismo criterio que Flamengo/Botafogo: el número impreso, reinterpretando el "." como
separador decimal en vez de miles, YA es el valor en millones; los valores impresos SIN separador
de miles, o sea menores a 1.000 miles, se escribieron manualmente como 0,XXX).

ESTRUCTURA REAL DEL DOCUMENTO: la DRE de São Paulo tiene 4 "unidades de negócio"/departamentos
como encabezados de FILA ACUMULADA (club-data-mapping/referencia/leer-pdf.md — cada header es exactamente la
suma de sus líneas de detalle, verificado exacto para los 8 bloques, los 2 años): "Futebol
profissional e da base" (Ingresos) / "Futebol profissional e de base" (Gastos), "Sociais e
esportes amadores" (Ingresos; "Sociais e esportes profissionais" en el rótulo de Gastos del
documento 2024, mismo bloque), "Esportes Profissionais" (Ingresos, un único sub-ítem
"Patrocínios"), "Estádio", y del lado de Gastos además "Administrativas". Como cada línea de
detalle tiene una categoría real identificable, se cargó cada línea de detalle como
revenueLine/expenseLine de PRIMER NIVEL — NUNCA el header de grupo (lo hubiera duplicado, regla
de club-data-mapping sección 1).

Además, el propio "TOTAL DAS RECEITAS OPERACIONAIS"/"TOTAL DAS DESPESAS OPERACIONAIS" que imprime
el documento NO son directamente comparables a `officialTotalRevenue`/`officialTotalExpenses` de
este archivo: "Total das Despesas Operacionais" INCLUYE un bloque "Encargos financeiros"
(Receitas financeiras + Despesas financeiras) que, por club-data-mapping sección 2, va SIEMPRE a
`netInterest`, nunca como línea — se restó del total de gastos operativos antes de cargar
(confirmado exacto: 2023 total impreso 731.221 − Encargos financeiros 77.544 = 653.677 = suma de
los 4 bloques operativos reales; 2024 ídem, 908.116 − 93.386 = 814.730).

Categorización (Ingresos), idéntica estructura/etiquetas en los 2 documentos (mismo formato año a año, mismo mapeo):
- 'Negociação de atestados liberatórios de atletas' (nota 21/22) -> player_sales (ingreso neto de
  negociación de derechos de jugadores — el club NO netea del lado de Gastos, ver "Intermediações
  sobre negociações c/atletas" abajo, mismo criterio Flamengo/Botafogo: ingreso bruto y comisión
  por separado).
- 'Direitos de transmissão de TV/Premiações' -> broadcasting. DUDA GENUINA (anotada en
  Admin/dudas-por-club.md): el documento combina en UNA sola línea derechos de TV (broadcasting)
  y premios por competencia (competition_bonus), sin desglosar en ningún otro lugar del balance —
  a diferencia de Flamengo/Botafogo, que sí las separan. Es una línea grande (259,441 M en 2023,
  239,421 M en 2024, ~35-40% del bloque "Futebol profissional"), así que la categorización elegida
  (broadcasting, asumiendo que los derechos de TV son el componente mayor, típico en clubes
  grandes del Brasileirão) afecta materialmente los buckets "Televisión" y "Premios por
  competencias" de Formato Simplificado — no se inventó un split sin base en la fuente.
- 'Publicidade e patrocínio' / 'Licenciamento da marca' / 'Publicidade' (dentro de Estádio) ->
  sponsorship_commercial.
- 'Projeto sócio torcedor' -> member_dues (programa de socios-hinchas, mismo criterio que 'Sócio
  Torcedor' de Flamengo/'Camisa 7' de Botafogo).
- 'Arrecadação de jogos' -> matchday_competition (recaudación de entradas).
- 'Outras receitas' (dentro de Futebol profissional) -> other_income.
- 'Contribuições e taxas' -> member_dues (cuota social/contribuciones de asociados).
- 'Departamentos e esportes amadores' -> other_sports (secciones deportivas amateur sin
  desglosar por disciplina).
- 'Festas e eventos sociais' -> other_income.
- 'Aluguéis e patrocínios' -> other_income: línea combinada (alquileres + patrocinios) sin
  desglosar, monto chico, mismo criterio conservador que la duda de TV/Premiações pero de menor
  materialidad — se dejó en el catch-all en vez de forzar un split.
- 'Patrocínios' (dentro de Esportes Profissionais) -> sponsorship_commercial.
- 'Camarotes e cadeiras cativas' (dentro de Estádio) -> season_tickets: acceso fijo por temporada
  completa (palcos/butacas cautivas), no venta partido por partido — mismo criterio que la
  distinción Estadio/Abonos de club-data-mapping/referencia/formato-simplificado.md (Versión 49).
- 'Publicidade' (dentro de Estádio) -> sponsorship_commercial (misma categoría que la publicidad
  del bloque Futebol profissional, el agrupamiento bajo "Estádio" es solo visual del documento).
- 'Aluguéis' (dentro de Estádio) -> stadium_other: uso del estadio FUERA del partido (alquiler de
  espacios), caso de manual de esta categoría — coincide con lo que el Relatório da Administração
  describe como la unidad de negocio "Estádio do MorumBiS" (shows y eventos, no fútbol).
- 'Outras receitas' (dentro de Estádio) -> stadium_other (catch-all de la unidad de negocio
  Estádio, que el propio Relatório describe como shows/eventos, no recaudación de partidos).
- 'Deduções'/'Direito de Arena' -> other_income (línea negativa, contra-revenue, mismo criterio
  que 'Deduções sobre a receita' de Flamengo/Botafogo).

Categorización (Gastos), bloque "Futebol profissional e de base":
- 'Pessoal' / 'Encargos trabalhistas' / 'Benefícios' / 'Prêmios' / 'Direito de uso de imagem' ->
  wages_squad (compensación al plantel profesional; direitos de imagem es la estructura habitual
  de compensación a jugadores en Brasil, mismo criterio Flamengo/Botafogo; Prêmios = bonos por
  desempeño deportivo, parte de la compensación variable).
- Nota 9 completa (Contratos de atletas profissionais 9.1, Custo de atletas em formação 9.2,
  Custo de atletas formados 9.3) -> player_amortisation/player_impairment: 'Amortização/baixa de
  contratos de atletas profissionais' (9.1) y 'Amortização do custo de atletas formados' (9.3) ->
  player_amortisation (amortización de activos intangibles de derechos de jugadores, sean
  adquiridos o formados en casa — mismo mecanismo contable); 'Provisão de impairment atletas
  profissionais' (9.1, reversión, signo +) -> player_impairment (categoría dedicada que ya existe
  en category-map.js). 'Baixa do custo de atletas em formação' (9.2, solo 2023: baja del costo
  capitalizado de jugadores de la cantera dados de baja/liberados) y 'Transferência para custo de
  formação de atletas' (9.2, solo 2023, signo +: reversión por capitalización del gasto de
  formación del año, R$33,8 M invertidos en 2023 según el Relatório da Administração — mismo
  mecanismo que el Anexo V de Banfield) -> player_amortisation también, para mantener toda la Nota
  9 (adquisición y formación de jugadores) en una sola categoría trazable. En 2024 estos 2 rubros
  dan "-" (cero, sin dispensa de atletas de cantera ni nueva capitalización ese año) — no se
  cargó línea.
- 'Mecanismo de solidariedade' (pagado) / 'Intermediações sobre negociações c/atletas' (comisiones
  de intermediación) / 'Resultado com a baixa de bens' (ganancia chica por baja de bienes, signo
  +) -> other_expenses, mismo criterio Flamengo/Botafogo (comisiones NO son player_amortisation).
- 'Arbitragens, federações e confederações' / 'Despesas com jogos' -> match_organisation_expense.
- 'Água/Luz/Telefone' / 'Manutenções' / 'Gerais' / 'Materiais' / 'Serviços' / 'Contingências' /
  'Tributos' -> admin_general_expense.
- 'Depreciação e amortização (software/marcas)' -> depreciation (presente en LOS 4 bloques de
  Gastos — Futebol profissional, Sociais e esportes amadores/profissionais, Estádio,
  Administrativas — se extrajo de cada uno; la suma de los 4 da EXACTO el total "Depreciações e
  amortizações" que declara la Demonstração do Valor Adicionado 2023 (13,866 M), buena
  confirmación cruzada independiente).

Bloque "Sociais e esportes amadores"/"Sociais e esportes profissionais" (mismo bloque, distinto
rótulo entre los 2 documentos) -> youth_other_sports_expense completo (espejo de gasto de
'Departamentos e esportes amadores'/other_sports del lado de Ingresos), salvo su propia
'Depreciação e amortização' -> depreciation y 'Perdas estimadas' (nota 6, solo 2024, previsión de
incobrables) -> other_expenses.

Bloque "Estádio" (Gastos) -> admin_general_expense completo: la definición de esta categoría en
category-map.js incluye explícitamente "mantenimiento de sede/estadio" — es el costo operativo de
la infraestructura (personal, limpieza, mantenimiento, servicios, tributos) de la unidad de
negocio Estádio, salvo su 'Depreciação e amortização' -> depreciation.

Bloque "Administrativas" -> admin_general_expense completo, salvo 'Depreciação e amortização' ->
depreciation. 'Rateios de serviços de alimentação, transporte e lavanderia' (signo +, crédito de
reasignación de costos) se dejó en admin_general_expense para netear dentro del mismo bloque.

Solo 2024 — "RESULTADO NÃO OPERACIONAL" (−92,687 M) y "Resultado de equivalência patrimonial em
cotas de fundos" (−8,909 M): bloques FUERA del cuerpo de Receitas/Despesas Operacionais, ítems no
recurrentes de multas/parcelamentos tributarios y de un fondo de inversión — van a
`exceptional_items` (club-data-mapping sección 6, regla 3), EXCLUIDOS de `officialTotalExpenses`.
En 2023 este bloque no existe (impreso "-"), no se cargó nada.

netInterest = 'Encargos financeiros' (Receitas financeiras + Despesas financeiras, ambas notas
dedicadas), NUNCA como línea aunque el documento las sume dentro de "Total das Despesas
Operacionais" (club-data-mapping sección 2): 2023 = 11,860 − 89,404 = −77,544 M; 2024 = 3,285 −
96,671 = −93,386 M. tax = 0 los 2 años (entidad sin fines de lucro, ningún "Imposto de renda"
impreso en la DRE). profitOnPlayerSales = assetSales = 0 (todo ya bruto en revenueLines/
expenseLines, el documento no netea).

VERIFICACIÓN (Node, antes de cargar — pdftotext -layout de las págs. 3/7/8 del PDF 2022-2023 y
las págs. 27-30 del PDF 2023-2024, no la transcripción .md original que intercala columnas):
2023: revenueLines suman EXACTO 668,963 M BRL = "TOTAL DAS RECEITAS OPERACIONAIS" impreso.
expenseLines (4 bloques operativos, sin Encargos financeiros) suman EXACTO 653,677 M BRL (731,221
impreso − 77,544 de Encargos financeiros). revenue − expenses + netInterest (−77,544) = 668,963 −
653,677 − 77,544 = −62,258 M BRL = "Déficit do exercício" impreso, EXACTO (déficit real pese al
título de Copa do Brasil 2023 — el propio Conselho Fiscal lo atribuye a que los gastos, sobre todo
de fútbol profesional, superaron el presupuesto aprobado).
2024: revenueLines suman EXACTO 722,072 M BRL = "TOTAL DAS RECEITAS OPERACIONAIS" impreso.
expenseLines ordinarias suman EXACTO 814,730 M BRL (908,116 impreso − 93,386 de Encargos
financeiros). revenue − expenses + netInterest (−93,386) + exceptional_items (−101,596: +5,500
Multas recebidas − 46,425 Parcelamentos Municipais − 20,068 Parcelamentos Federais − 31,694 Multas
pagas − 8,909 Resultado de equivalência patrimonial em cotas de fundos) = 722,072 − 814,730 −
93,386 − 101,596 = −287,640 M BRL = "Déficit do exercício" impreso, EXACTO (déficit real grande,
explicado por el propio documento por los ítems no operacionales de multas/parcelamentos
tributarios, ver notas 14 del PDF).

grossDebt/cash: el Balanço Patrimonial separa una línea angosta "Instituições financeiras" (nota
10/11, circulante + não circulante) de otros pasivos (Fornecedores, Direitos de imagem a pagar,
Direitos federativos e econômicos, Receitas a apropriar, Acordos trabalhistas, etc.) — mismo
criterio que Botafogo: grossDebt = esa línea angosta. 2023: 143,405 + 74,123 = 217,528 M
(confirmado exacto contra el "Total" que imprime la propia Nota 10). 2024: 126,229 + 133,031 =
259,260 M. cash = 'Caixa e equivalentes de caixa' (nota 5), Controladora: 2023 = 3,346 M; 2024 =
23,728 M.

FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio (Nota 3.8 "Moeda
estrangeira" es solo política contable, sin un valor numérico de cierre impreso en un Anexo
dedicado — se buscó explícitamente, ausente) — PTAX de cierre BCB, referenciado a FX_CLOSE
(data/currency-map.js), ya existían las 2 entradas antes de esta sesión: BRL@2023-12-31 (4,8413)
y BRL@2024-12-31 (6,1923).

Gestión: Julio Cesar Casares, presidente — firma el balance 2023 (13/3/2024) y el balance 2024
(asinado digitalmente 25/4/2025, ainda como presidente). Nota 24 (Eventos Subsequentes) del
balance 2023 confirma su reeleição en el proceso electoral de fines de 2023/inicio de 2024
("considerada a reeleição do Presidente da Diretoria"), consistente con conocimiento público
(electo Nov-2020, mandato 2021-2023; reelecto para 2024-2026). Se cargó una única entrada de
gestión cubriendo los 2 años (misma persona, mandato continuo).

memberCountByClub: null — no se encontró una cifra total de sócios/associados en ninguno de los 2
PDF (hay ingresos de "Contribuições e taxas"/"Projeto sócio torcedor", pero ninguna cantidad total
de socios impresa).
============================================================================
```

## 2024

### Gastos

_antes de la fila 1 (`Pessoal (Futebol profissional e de base)`):_

```text
Futebol profissional e de base
```

_antes de la fila 21 (`Pessoal (Sociais e esportes profissionais)`):_

```text
Sociais e esportes profissionais (nota 20) — mismo bloque que "Sociais e esportes amadores" del documento 2023
```

_antes de la fila 35 (`Pessoal (Estádio)`):_

```text
Estádio
```

_antes de la fila 46 (`Pessoal (Administrativas)`):_

```text
Administrativas
```

_antes de la fila 58 (`Multas recebidas (Resultado Não Operacional)`):_

```text
Resultado Não Operacional + Resultado de equivalência patrimonial (fuera del cuerpo operativo, ver cabecera)
```

### Meta

```text
grossDebt = 'Instituições financeiras' (nota 11), circulante + não circulante (126,229 +
133,031 = 259,260). cash = 'Caixa e equivalentes de caixa' (nota 5).
netInterest = Receitas financeiras (3,285) + Despesas financeiras (-96,671), mismo bloque
'Encargos financeiros' del documento, reclasificado.
officialTotalRevenue = suma de revenueLines (722,072 M) = "TOTAL DAS RECEITAS OPERACIONAIS"
impreso, exacto. officialTotalExpenses = suma de expenseLines ORDINARIAS (814,730 M, EXCLUYE
exceptional_items) = "Total das Despesas Operacionais" impreso (908,116) MENOS 'Encargos
financeiros' (93,386). officialPAT = "Déficit do exercício" impreso (-287,640 M, déficit real
grande: 722,072 - 814,730 - 93,386 (netInterest) - 101,596 (exceptional_items: multas y
parcelamentos tributarios + resultado de equivalência patrimonial em cotas de fundos) =
-287,640, exacto).
```

## 2023

### Gastos

_antes de la fila 1 (`Pessoal (Futebol profissional e de base)`):_

```text
Futebol profissional e de base
```

_antes de la fila 24 (`Pessoal (Sociais e esportes amadores)`):_

```text
Sociais e esportes amadores
```

_antes de la fila 37 (`Pessoal (Estádio)`):_

```text
Estádio
```

_antes de la fila 48 (`Pessoal (Administrativas)`):_

```text
Administrativas
```

### Meta

```text
grossDebt = 'Instituições financeiras' (nota 10), circulante + não circulante (143,405 +
74,123 = 217,528, confirmado exacto contra el "Total" que imprime la propia nota). cash =
'Caixa e equivalentes de caixa' (nota 5).
netInterest = Receitas financeiras (11,860) + Despesas financeiras (-89,404), ambas dentro del
bloque 'Encargos financeiros' que el documento suma DENTRO de "Total das Despesas
Operacionais" — reclasificado acá, nunca como línea (club-data-mapping sección 2).
officialTotalRevenue = suma de revenueLines (668,963 M) = "TOTAL DAS RECEITAS OPERACIONAIS"
impreso, exacto. officialTotalExpenses = suma de expenseLines (653,677 M) = "Total das
Despesas Operacionais" impreso (731,221) MENOS 'Encargos financeiros' (77,544), reclasificado
a netInterest. officialPAT = "Déficit do exercício" impreso (-62,258 M, déficit real pese al
título de Copa do Brasil 2023 — el propio Conselho Fiscal lo atribuye al exceso de gastos de
fútbol profesional sobre el presupuesto aprobado).
```

## Gestiones

_antes de Julio Casares (data/gestiones/br.js):_

```text
Reelecto para 2024-2026 (una sola gestion). Afastado/renuncia en enero de 2026 (Wikipedia: 16/01/2026; otras notas dicen 21/01).
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub['saopaulo-br']

```text
Julio Cesar Casares: firma como Presidente el balance de 2023 (13/3/2024) y el de 2024 (firma
digital 25/4/2025). El propio balance 2023 (Nota 24, Eventos Subsequentes) confirma su
reeleição en el proceso electoral de fines de 2023/inicio de 2024 — consistente con el registro
público (electo nov-2020, mandato 2021-2023; reelecto para el mandato 2024-2026). Mandato
continuo, una sola entrada cubriendo los 2 ejercicios cargados.
```

### memberCountByClub['saopaulo-br']

```text
no se encontró una cifra total de sócios/associados en ninguno de los 2 PDF
```
