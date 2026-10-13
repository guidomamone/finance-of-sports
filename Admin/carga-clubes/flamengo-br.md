# flamengo-br — evidencia de carga

Lo que había como comentario en `data/flamengo-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/flamengo-br-data.js — Clube de Regatas do Flamengo, Rio de Janeiro, Brasil. A DIFERENCIA de
Botafogo/Cruzeiro/Coritiba (SAF), Flamengo NO se convirtió a Sociedade Anônima do Futebol — sigue
siendo una associação civil sin fines de lucro, multideportiva (fútbol, remo, básquet, natación,
etc.), que por estatuto publica "Relatório Anual com as Demonstrações Financeiras" auditadas todos
los años. clubId 'flamengo-br' (CON GUIÓN, mismo criterio que banfield-ar: bracket notation en
clubs{}/CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub, nunca notación de punto).

2 ejercicios cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — clubs.js,
fiscalYearStart:'01-01', mismo criterio que Botafogo/Grêmio). Fuente: "Relatório Anual com as
Demonstrações Financeiras" de cada año, descargados de images.flamengo.com.br (bucket de assets
del sitio oficial, ver fuentes/Brasil/Flamengo.md). Cada PDF trae Relatório de Gestão +
Demonstrações Financeiras + parecer del auditor independiente + parecer del Conselho Fiscal — PDF
con texto nativo, transcripción completa en
Clubes/Brasil/Flamengo/relatorio-anual-demonstracoes-financeiras-{2024,2025}.md.

Se usó la columna CONTROLADORA (standalone) en TODAS las líneas, no la Consolidado (que suma una
participação minoritária en la Fla-Flu Serviços S.A.) — mismo criterio que Botafogo, para no
mezclar 2 perímetros de consolidación. Escala: valores originales "em milhares de reais" (miles de
reales), acá en MILLONES de BRL nativos (dividir por 1.000, mismo criterio que Botafogo/Grêmio: el
número impreso, reinterpretando el "." como separador decimal en vez de miles, YA es el valor en
millones).

ESTRUCTURA REAL DEL DOCUMENTO (distinta de Botafogo, importante para no duplicar plata): la DRE de
Flamengo es UN SOLO cuerpo de resultado (no 2 bloques separados como Botafogo):
  Receita operacional líquida (neta de Impostos e contribuições + Direito de arena, detalle en
  Nota "Receita operacional líquida")
  − Custo das atividades sociais e esportivas (Nota, detalle línea por línea)
  = Resultado bruto
  − Despesas administrativas (Nota)
  − Despesas comerciais (Nota)
  + Outras receitas (despesas) operacionais líquidas (Nota — incluye "Movimentação de atletas":
    ventas/préstamos de jugadores brutos, MENOS bajas de costo de adquisición y gastos de
    negociación, sin netear del lado del sitio: se cargó cada componente bruto por separado)
  + Resultado de equivalência patrimonial (ítem no operativo/no recurrente, exceptional_items)
  = Resultado operacional antes do resultado financeiro
  − Despesas financeiras + Receitas financeiras (Nota "Receitas (despesas) financeiras, líquidas")
  = Resultado antes do imposto de renda e contribuição social
  − Imposto de renda e contribuição social (0 en Controladora los 2 años — el consolidado sí paga,
    por la Fla-Flu Serviços S.A.)
  = Superávit (déficit) do exercício

LA NUMERACIÓN DE NOTAS CAMBIA ENTRE LOS 2 AÑOS (el PDF de 2025 insertó/quitó una nota respecto del
de 2024, corriendo la numeración en 2): en el PDF 2024, Receita=17/Custo=18/Adm=19/Comercial=20/
Outras=21/Financeiras=22; en el PDF 2025, Receita=15/Custo=16/Adm=17/Comercial=18/Outras=19/
Financeiras=20. Se leyó cada año de SU PROPIO PDF (nunca la columna comparativa del otro), mismo
criterio de club-data-mapping/SKILL.md sección 6.5 — y de hecho el PDF 2025 muestra el 2024
comparativo con el desglose de "Receita operacional bruta por atividade" REEXPRESADO/reagrupado
distinto del que imprime el propio PDF 2024 (ej. "Estádio" da 54.961 en la comparativa del PDF
2025 vs. 47.711 en el PDF 2024 mismo; "Aluguel do Maracanã" desaparece como línea propia) — se
ignoró esa comparativa y se usaron los valores del PDF de CADA año.

"Receita operacional bruta por atividade": el documento imprime 3 CABECERAS DE GRUPO ("Mídia e
publicidade convencional", "Licenciamento, Patrocínio e Publicidade", "Operações de jogos",
"Diversos") que son FILAS ACUMULADAS (club-data-mapping/referencia/leer-pdf.md): su valor es exactamente la
suma de las líneas de detalle que traen debajo (verificado exacto para los 4 grupos, los 2 años).
Como cada línea de detalle tiene una categoría real DISTINTA de sus hermanas (regla de la sección
1: "si los sub-ítems tienen cada uno una categoría real distinta, promoverlos a líneas de primer
nivel"), se cargó cada línea de detalle como revenueLine propia — NUNCA la cabecera de grupo (la
hubiera duplicado la plata).

Categorización (Ingresos):
- 'Direitos de transmissão fixos' / 'Mídias digitais e serviços "on demand"' -> broadcasting.
- 'Participação, exposição e performance' -> competition_bonus (ingreso ligado al desempeño
  deportivo/avance en competencias, mismo criterio que 'Premiação'/'Participação em competições'
  de Botafogo).
- 'Licenciamento e royalties' / 'Patrocínio e publicidade' -> sponsorship_commercial.
- 'Bilheteria' / 'Estádio' -> matchday_competition: las 2 están agrupadas por el propio documento
  bajo "Operações de jogos" junto con 'Sócio Torcedor' — se interpretó 'Estádio' como ingresos de
  operación del estadio EN DÍA DE PARTIDO (concesiones, no recaudación de entradas en sí, que ya
  es 'Bilheteria'), no como uso del estadio FUERA del partido (eso sería stadium_other) — el
  propio agrupamiento del documento bajo "Operações de jogos" es la señal más fuerte disponible.
- 'Sócio Torcedor' -> member_dues: programa de socios-hinchas (igual criterio que Botafogo con su
  'Camisa 7 (Sócio Torcedor)'), aunque el documento lo agrupe bajo "Operações de jogos" en vez de
  "Diversos" (agrupamiento visual del documento, no cambia qué ES el ingreso).
- 'Quadro social' -> member_dues (cuota social tradicional, separada de Sócio Torcedor).
- 'Escolas esportivas' -> other_sports: el documento no especifica si son escuelas de fútbol
  específicamente o multideporte (Flamengo tiene escuelas de varias disciplinas) — se usó el
  catch-all deportivo genérico en vez de asumir youth_football sin evidencia; importe chico
  (<1% del ingreso los 2 años), no se anotó como duda a club por su tamaño marginal.
- 'Visitação (Museu e Tour Maracanã)' (solo 2024, en 2025 da 0/no se imprime aparte) / 'Aluguel do
  Maracanã' (solo 2024, ver nota de reagrupamiento arriba) -> stadium_other: uso del estadio FUERA
  del partido (tour/museo, alquiler para eventos), caso de manual exacto de esta categoría.
- 'Outros' (dentro de "Diversos") -> other_income.
- 'Impostos e contribuições' + 'Direito de arena' (Nota "Receita operacional líquida", deducciones
  sobre el ingreso bruto) -> other_income (línea negativa, contra-revenue), mismo criterio que la
  'Deduções sobre a receita' de Botafogo.
- Nota "Outras receitas (despesas) operacionais líquidas" / "Movimentação de atletas": 'Vendas de
  direitos federativos' (venta definitiva) / 'Empréstimos de atletas' (préstamos) -> player_sales;
  'Mecanismo de solidariedade' (recibido) -> youth_football, igual criterio que Botafogo/Grêmio.

Categorización (Gastos), de las Notas "Custo das atividades sociais e esportivas" / "Despesas
administrativas" / "Despesas comerciais" / "Outras receitas (despesas) operacionais líquidas":
- 'Salários, encargos e benefícios a funcionários' (de la nota de COSTO, el plantel) / 'Direito de
  imagem' -> wages_squad (derechos de imagen es la estructura habitual de compensación a
  jugadores en Brasil, mismo criterio que Botafogo).
- 'Amortizações de direitos sobre atletas' / 'Baixa do saldo de custo de aquisição de direitos
  federativos atletas' ('Baixa dos custos com aquisição de direitos federativos' en 2025) ->
  player_amortisation (cargo contable de amortización/baja del intangible del pase, no
  comisiones).
- 'Gastos com jogos e competições' -> match_organisation_expense.
- 'Materiais' / 'Manutenção' / 'Luz, telefone e gás' / 'Serviços profissionais' / 'Água e esgoto' /
  'Assessorias e consultorias' / 'Frete(s) e transportes' (de la nota de COSTO) -> admin_general_
  expense (costos operativos no deportivos del área de actividades sociais/esportivas).
- 'Depreciação de imobilizado/amortização de outros ativos' (de cualquiera de las 2 notas que la
  traen) -> depreciation.
- 'Outros'/'Outros gastos'/'Outras despesas' (catch-all explícito de cada nota) -> other_expenses.
- TODA la Nota "Despesas administrativas" (salários del área administrativa, acordos diversos,
  assessorias, honorários de advogados, provisão para contingências, serviços de terceiros) ->
  admin_general_expense, salvo su propio catch-all 'Outros gastos'/'Outras despesas' ->
  other_expenses (mismo criterio Botafogo).
- TODA la Nota "Despesas comerciais" -> admin_general_expense (category-map.js incluye
  explícitamente "comerciales" en la definición de admin_general_expense), salvo su catch-all ->
  other_expenses.
- 'Constituição de provisão para perdas esperadas de créditos de liquidação duvidosa' (2024) /
  'Constituição de provisão de perdas de crédito esperadas e realização efetiva de perdas' (2025)
  -> other_expenses: previsión rutinaria por incobrables, importe chico, no hay categoría más
  específica.
- 'Gastos com negociação de atletas' (comisiones/honorarios de intermediación en transferencias) ->
  other_expenses, mismo criterio que Botafogo/Racing/Grêmio (NO player_amortisation, que es solo
  el cargo contable de amortización/baja, no comisiones).
- 'Resultado de equivalência patrimonial' -> exceptional_items (ítem no operativo/no recurrente de
  una inversión por equivalencia patrimonial — NEGATIVO en 2024 (-3.465), POSITIVO en 2025
  (+13.939): se cargó con el signo real de cada año, mismo criterio Botafogo).

netInterest = 'Despesas financeiras' + 'Receitas financeiras' (Nota dedicada), NUNCA como línea
(club-data-mapping sección 2): -45.483 en 2024 (año con déficit financiero neto), +22.205 en 2025
(año con ganancia financiera neta, principalmente por 'Rendimento sobre aplicações financeiras'
17.955 y otros ítems de valorización). tax = 0 los 2 años (Imposto de renda e contribuição social
es 0 en Controladora, solo el Consolidado paga vía Fla-Flu Serviços S.A.). profitOnPlayerSales =
assetSales = 0 (no se netea nada aparte, todo ya está en revenueLines/expenseLines brutas, ver
club-data-mapping sección 3: el documento no netea, el sitio tampoco).

VERIFICACIÓN (Node, antes de cargar):
2024: revenueLines suman EXACTO 1.249,535 M BRL; expenseLines (ordinarias, sin exceptional_items)
suman EXACTO -1.201,321 M BRL; revenue + expenses ordinarias + exceptional_items (-3,465) =
44,749 M BRL = "Resultado operacional antes do resultado financeiro" impreso, exacto; +
netInterest (-45,483) = -0,734 M BRL = "Resultado antes do imposto de renda" impreso, exacto; +
tax (0) = -0,734 M BRL = "Superávit (déficit) do exercício" impreso, EXACTO (déficit real de
R$734 mil, el segundo déficit del club desde 2014 según el propio Relatório de Gestão).
2025: revenueLines suman EXACTO 1.912,496 M BRL; expenseLines ordinarias suman EXACTO -1.612,975 M
BRL; revenue + expenses ordinarias + exceptional_items (+13,939) = 313,460 M BRL = "Resultado
operacional antes do resultado financeiro" impreso, exacto; + netInterest (+22,205) = 335,665 M
BRL = "Resultado antes do imposto de renda" impreso, exacto; + tax (0) = 335,665 M BRL =
"Superávit do exercício" impreso, EXACTO (superávit real, año de venta de pases muy grande —
Gerson, Wesley, Carlos Alcaraz, Matheus Gonçalves, Fabrício Bruno — R$503,811 M en ventas de
derechos federativos).

grossDebt/cash: el Balanço Patrimonial de Flamengo, a diferencia de Botafogo, NO separa una línea
"Empréstimos e financiamentos" (deuda bancaria) del resto del pasivo — el propio Relatório de
Gestão usa una métrica no-GAAP propia, "Dívida Operacional Líquida" (DOL, fornecedores + clubes +
bancos + entes governamentais, EXCLUYENDO provisões para contingências y adiantamentos recebidos,
NETA de caja y de cuentas a cobrar por venta de jugadores), pero su desglose viene en un gráfico
del PDF con valores no confiablemente legibles en esta transcripción (OCR del gráfico, no una
tabla). Ante la ausencia de una línea "Deudas financieras" angosta y confiable, se usó el criterio
de Racing (club-data-mapping/referencia/formato-simplificado.md): grossDebt = Total do passivo completo, Controladora
(2024: 912,581 M BRL; 2025: 1.038,223 M BRL). cash = 'Caixa e equivalentes de caixa' Controladora
(2024: 70,557 M BRL; 2025: 143,941 M BRL), EXCLUYENDO 'Caixa restrito' (fondos de proyectos
incentivados, uso restringido) — este corte coincide EXACTO con lo que el propio Relatório de
Gestão 2024 llama "Caixa Livre" ("o saldo de caixa... sem considerar os valores de uso restrito
para projetos incentivados foi de R$ 70 milhões"), buena confirmación cruzada independiente.

FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio (hay política contable
de "taxa de câmbio de fechamento" para partidas en moneda extranjera, pero sin un valor numérico
impreso en un Anexo dedicado, a diferencia de los Anexos de Racing/River) — PTAX de cierre BCB,
referenciado a FX_CLOSE (ya existían las 2 entradas antes de esta sesión): BRL@2024-12-31 (6,1923)
y BRL@2025-12-31 (5,5024).

Gestión: Rodolfo Landim, 2° mandato (2022-2024), presidió TODO el ejercicio 2024 (se despidió del
cargo en diciembre de 2024 tras las elecciones). Luiz Eduardo Baptista ("BAP"), electo el
9/12/2024 con mandato 2025-2027, presidió TODO el ejercicio 2025 (año calendario completo).
Confirmado por prensa (flamengo.com.br, ESPN, Correio Braziliense), no por el propio balance.

memberCountByClub: null — no se encontró una cifra de socios/associados en ninguno de los 2 PDF
(sí hay ingresos de "Quadro social"/"Sócio Torcedor", pero ninguna cantidad total de socios
impresa).
============================================================================
```

_de data/clubs.js:_

```text
5 clubes nuevos (Versión 219, 2do batch de PDF transcriptos pendientes, sesión 2026-09-24):
mismo motor genérico, mismo país/moneda. `brandColor:null` en RB Bragantino: camiseta titular
blanca dominante, mismo criterio que River/Vélez/Once Caldas — ver `fuentes/Brasil/<Club>.md`
para el detalle de cada investigación de color.
```

_de data/club-leagues/br.js:_

```text
Verificado el 2026-09-24 (onboarding, Versión 219) contra Wikipedia en inglés (temporadas 2019,
2023, 2024 y 2025 de cada club). Ejercicio = año calendario, coincide con la temporada.
```

_de data/club-leagues/br.js:_

```text
3° en 2024, campeón 2025
```

## 2025

### Gastos

_antes de la fila 1 (`Salários, encargos e benefícios a funcionários (custo das atividades)`):_

```text
Custo das atividades sociais e esportivas (Nota 16)
```

_antes de la fila 14 (`Salários, encargos e benefícios a funcionários (despesas administrativas)`):_

```text
Despesas administrativas (Nota 17)
```

_antes de la fila 20 (`Anúncios e publicações`):_

```text
Despesas comerciais (Nota 18)
```

_antes de la fila 26 (`Depreciação e amortização de outros ativos (outras despesas operacionais)`):_

```text
Outras receitas (despesas) operacionais líquidas (Nota 19)
```

_antes de la fila 31 (`Resultado de equivalência patrimonial`):_

```text
Resultado de equivalência patrimonial (ítem no operativo, POSITIVO este año)
```

### Meta

```text
netInterest = Despesas financeiras (-28.534) + Receitas financeiras (50.739), Nota 20,
Controladora — año con ganancia financiera neta (rendimiento de aplicações financeiras).
officialTotalRevenue = suma de revenueLines (1.912,496 M BRL). officialTotalExpenses = suma de
expenseLines EXCLUYENDO 'Resultado de equivalência patrimonial' (+13,939, exceptional_items) =
1.612,975 M BRL. officialPAT = "Superávit do exercício" impreso (335,665 M BRL, superávit
real, año de ventas de pases muy grande: R$503,811 M en Vendas de direitos federativos).
```

## 2024

### Gastos

_antes de la fila 1 (`Salários, encargos e benefícios a funcionários (custo das atividades)`):_

```text
Custo das atividades sociais e esportivas (Nota 18)
```

_antes de la fila 14 (`Salários, encargos e benefícios a funcionários (despesas administrativas)`):_

```text
Despesas administrativas (Nota 19)
```

_antes de la fila 21 (`Anúncios e publicações`):_

```text
Despesas comerciais (Nota 20)
```

_antes de la fila 27 (`Depreciação e amortização de outros ativos (outras despesas operacionais)`):_

```text
Outras receitas (despesas) operacionais líquidas (Nota 21)
```

_antes de la fila 32 (`Resultado de equivalência patrimonial`):_

```text
Resultado de equivalência patrimonial (ítem no operativo, fuera del cuerpo de costos/gastos)
```

### Meta

```text
grossDebt = Total do passivo, Controladora (no hay línea angosta de "Empréstimos e
financiamentos" en este balance — ver comentario de cabecera). cash = "Caixa e equivalentes de
caixa" Controladora, EXCLUYENDO "Caixa restrito" (fondos de proyectos incentivados).
netInterest = Despesas financeiras (-59.474) + Receitas financeiras (13.991), Nota 22,
Controladora.
officialTotalRevenue = suma de revenueLines (1.249,535 M BRL). officialTotalExpenses = suma de
expenseLines EXCLUYENDO 'Resultado de equivalência patrimonial' (-3,465, exceptional_items) =
1.201,321 M BRL, mismo criterio que Botafogo (verifyTieOuts() compara "Expenses" contra gasto
ordinario + no-efectivo solamente). officialPAT = "Superávit (déficit) do exercício" impreso
(-0,734 M BRL, déficit real — el segundo déficit del club desde 2014).
```

## Gestiones

_antes de Rodolfo Landim (data/gestiones/br.js):_

```text
Landim: termino de mandato 01/01/2019 (algunas notas dicen que el acto formal fue el 02/01).
```

_antes de Luiz Eduardo Baptista (data/gestiones/br.js):_

```text
Baptista asume el 01/01/2025 y firma las demostraciones financieras 2024 (cerradas con Landim): firmo [2024].
```

## Fuentes

### flamengo-br-demonstracoes-2024

_note (data/):_

```text
PDF oficial (texto nativo), descargado del bucket de assets del sitio oficial (ver fuentes/Brasil/Flamengo.md para cómo se ubicó — la sección de transparencia del sitio es una SPA que no permite navegar directo, se ubicó vía la nota de prensa del club anunciando la publicación). Incluye Relatório de Gestão + Demonstrações Financeiras + parecer del auditor independiente + parecer do Conselho Fiscal. Se cargó la columna CONTROLADORA (standalone), no la Consolidado (incluye la Fla-Flu Serviços S.A.). 2024 fue un ejercicio de DÉFICIT real (R$734 mil), el segundo déficit del club desde 2014 según su propio Relatório de Gestão, atribuido a variación cambial y menor resultado de equivalencia patrimonial. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Flamengo/relatorio-anual-demonstracoes-financeiras-2024.md.
```

### flamengo-br-demonstracoes-2025

_note (data/):_

```text
PDF oficial (texto nativo), mismo canal y estructura que el de 2024 (ver esa entrada). Superávit real de R$335,665 M, impulsado por un año grande de venta de jugadores (R$503,811 M en Vendas de direitos federativos: Gerson, Wesley, Carlos Alcaraz, Matheus Gonçalves, Fabrício Bruno, entre otros) y un resultado financiero neto positivo. Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024). Transcripción completa en Clubes/Brasil/Flamengo/relatorio-anual-demonstracoes-financeiras-2025.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub['flamengo-br']

```text
Rodolfo Landim, 2° mandato (2022-2024): presidió todo el ejercicio 2024 (año calendario
completo), se despidió del cargo en diciembre de 2024 tras las elecciones. Confirmado por
prensa (flamengo.com.br, ESPN), no por el propio balance.
Luiz Eduardo Baptista ("BAP"), electo 9/12/2024, mandato 2025-2027: presidió todo el ejercicio
2025 (año calendario completo).
```

### memberCountByClub['flamengo-br']

```text
no se encontró una cifra total de socios/associados en ninguno de los 2 PDF
```
