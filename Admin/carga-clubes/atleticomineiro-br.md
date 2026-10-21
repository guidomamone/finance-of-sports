# atleticomineiro-br — evidencia de carga

Lo que había como comentario en `data/br/atleticomineiro-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/atleticomineiro-br-data.js — Clube Atlético Mineiro SAF (Sociedade Anônima do Futebol),
Belo Horizonte-MG, Brasil ("Galo"). 3 ejercicios cargados: 2023, 2024, 2025.

Fuente: "Demonstrações contábeis individuais e consolidadas" da Atlético Mineiro S.A.F.,
auditadas por BDO RCS Auditores Independentes, descargadas del Portal da Transparência SAF
(atletico.com.br/institucional/portal-da-transparencia/portal-da-transparencia-saf/, PDFs reales
en atletico.com.br/informacoes-relatorios/). PDF con texto nativo (pdftotext -layout funciona
limpio, tablas bien alineadas), no son escaneos. Transcripción completa (y, para las tablas
numéricas, cruce directo contra `pdftotext -layout` página por página, más confiable que la
transcripción flotante para leer columnas) en:
- Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2023.md
- Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2024.md
- Clubes/Brasil/Atletico Mineiro/relatorio-integrado-saf-2025.md (el único de los 3 que es un
  "Relatório Integrado": financiero + sustentabilidad + gobernanza en un solo PDF de 200+
  páginas; las demonstrações financeiras están en su sección propia, Balanço/DRE en pág. 122-123,
  Notas explicativas de detalle en pág. 168-171).

EJERCICIO 2023, ACLARACIÓN IMPORTANTE (la consigna especulaba "10 meses associação + 2 meses
SAF" según prensa; el propio documento lo desmiente): el balance 2023 cubre EXCLUSIVAMENTE el
período 14/set/2023 a 31/dic/2023 (~3,5 meses), la vida de la SAF desde su constitución —
confirmado literal en el propio DRE ("Demonstrações do resultado... Período de 14 de setembro à
31 de dezembro de 2023") y repetido en cada Nota explicativa. NO incluye los meses previos de
actividad de fútbol bajo la associação (Clube Atlético Mineiro, entidad social separada, que
aportó el "acervo líquido" del departamento de fútbol a la SAF recién el 1°/11/2023 vía Acordo de
Investimento con Galo Holding S.A., que se quedó con el 75% de las acciones). Por eso 2023 es
estructuralmente MÁS CHICO que 2024/2025 (revenue ~75-86 M BRL vs. ~400-500 M BRL) — no es un
error de carga, es un ejercicio de duración real distinta (un "stub period" de constitución), y
se documenta así en `sources{}` para que no se lea como una caída interanual real.

COLUMNA ELEGIDA: CONTROLADORA (no Consolidado), mismo criterio que Botafogo (data/botafogo-
data.js) y por el mismo motivo: la entidad "Atlético Mineiro S.A.F." ES la Controladora (el
negocio de fútbol standalone). El Consolidado suma 3 controladas que NO son el negocio de
fútbol en sí — confirmado leyendo la Nota 1 de los 3 balances (Nota "Contexto operacional" /
"Estrutura societária"): Fundo de Investimento Imobiliário AVM FII (dueño de la Arena MRV/
estadio, registrado ante la CVM bajo la Instrução CVM 175 como fundo de investimento
imobiliário), Arena Vencer Complexo Esportivo Multiuso SPE Ltda. (locación del estadio) y Arena
Vencer Eventos SPE Ltda. (organización de eventos no futbolísticos en el estadio). Mezclar el
Consolidado habría sumado al "negocio de fútbol" el financiamiento inmobiliario del estadio (la
diferencia de "Empréstimos e financiamentos" entre columnas es enorme: 465,387 M Controladora vs.
992,753 M Consolidado en 2023) y una línea "Receitas Patrimoniais" que en 2023 es CERO en
Controladora pero 11,211 M en Consolidado — exactamente el tipo de mezcla de perímetros que
club-data-mapping SKILL.md pide evitar. Mismo criterio aplicado a los 3 ejercicios por igual.

DUDA DE SOURCING RESUELTA (ver Admin/sourcing/Brasil/Atletico Mineiro.md, que especulaba sobre una
posible relación con la CVM vía debêntures): la relación con la CVM que aparece en el documento
es por DOS vías, ninguna es una oferta pública de la propia SAF: (1) el AVM FII (fondo
inmobiliario dueño de la Arena, ver arriba) está registrado ante la CVM como fundo de
investimento imobiliário — pero es una CONTROLADA, no la SAF misma, y por eso no entra en la
columna Controladora igual; (2) la propia SAF SÍ emitió debêntures reales: 60.000 debêntures de
R$1.000 de valor nominal cada una (R$60.000 M nominal), emitidas 25/09/2024, quirografárias (sin
garantía real), 3,50% a.a., vencimiento 25/09/2027 (Nota de "Operações de debêntures" del balance
2024) — una colocación privada/restringida (no se confirmó el número exacto de instrução CVM que
la ampara, probablemente Instrução CVM 476 de oferta restrita a investidores profissionais, mismo
patrón que otros clubes-SAF brasileños, pero esto no se confirmó línea por línea en el documento).
Esta deuda de debêntures SÍ se sumó a `grossDebt` (ver abajo), por ser deuda financiera real de
la Controladora.

CAMBIO DE PRESIDENCIA ENTRE 2024 Y 2025 (encontrado en la firma de cada balance, no en prensa):
Bruno Muzzi firma como "Diretor Presidente" los balances 2023 y 2024; el Relatório Integrado 2025
lo firma "Pedro Daniel" como Diretor Presidente — un cambio real de gestión entre el cierre 2024 y
el cierre 2025, confirmado por la propia fuente primaria (no investigado en prensa externa). Ver
`gestionesByClub` abajo.

SITUACIÓN FINANCIERA 2025 — DÉFICIT SEVERO, CON ÉNFASIS DE AUDITORÍA (no ressalva): el "Prejuízo
do exercício" 2025 (-882,109 M BRL) casi triplica el de 2024 (-299,354 M), explicado
principalmente por: "Perda com Valor Justo" de R$572,161 M dentro de Despesas financeiras (un
impairment puntual, la propia Nota 1 lo caracteriza como "natureza não financeira e pontual") y un
salto en "Resultado equivalência patrimonial" (-180,320 M, resultado negativo de una inversión por
equivalencia patrimonial). El informe del auditor (BDO) incluye 2 párrafos de "Ênfase" (no
ressalva/salvedad, opinión limpia igual): (1) transacciones significativas con partes
relacionadas (cesión no onerosa de ingresos de boletería y sócio torcedor a la controlada Arena
Vencer, Nota 16); (2) deficiencia de capital circulante neto de R$817,991 M (individual) al
cierre 2025, con lenguaje de dependencia de que la Administración logre las medidas de
reestructuración financiera en curso. Se documenta en `sources{}`.

"OUTRAS RECEITAS" 2025 (98,056 M, dentro de Receita operacional bruta, NO dentro de "Receita
futebol profissional"): NO es ingreso recurrente de TV — la Nota 26(a) explica que es el
reconocimiento, en 2025, de la cesión PARCIAL (10%) de los derechos económicos sobre ingresos
FUTUROS de transmisión, por las Temporadas 2030 a 2074 (45 años), a un inversor — una
monetización anticipada de derechos futuros, evento no recurrente. Se cargó igual como
`other_income` (no `broadcasting`, que ya tiene su propia línea con el ingreso de TV recurrente
del año) para no inflar esa categoría con un ingreso de naturaleza distinta.

CATEGORIZACIÓN (misma estructura de Notas en los 3 años — Nota "Receita futebol profissional" +
Nota "Custo com atividades esportivas", ambas con las MISMAS 19 líneas rubro por rubro en los 3
ejercicios, lo que permitió categorizar por nombre de rubro consistente):
- 'Receitas de bilheteria' -> matchday_competition.
- 'Receitas de transmissão e imagem/Premiação' (línea compuesta, el propio documento no separa TV
  de premios) -> broadcasting.
- 'Outras receitas atividades esportivas' (Nota: "substancialmente" receita de Timemania, lotería
  federal de clubes brasileños) -> other_income.
- 'Receitas com sócio torcedor' -> member_dues (programa de socios-hinchas, mismo criterio que
  Botafogo "Camisa 7").
- 'Receitas com patrocínios/marketing' -> sponsorship_commercial.
- 'Receitas Patrimoniais' (Controladora, aparece desde 2024 — en 2023 era 0 en esta columna) ->
  other_income (alquileres/patrimonio, sin más desglose).
- 'Receita De Venda No Manto' (venta de camisetas) -> sponsorship_commercial (merchandising,
  mismo criterio que Botafogo "Venda de mercadorias").
- 'Receitas com Projetos' -> other_income.
- '(-) Impostos e contribuições' -> other_income (línea negativa, contra-revenue, mismo criterio
  que Botafogo/América Mineiro "Deduções sobre a receita").
- 'Custo de mercadorias e produtos' (costo de lo vendido, dentro de "Deduções da receita" del
  propio documento) -> admin_general_expense (mismo criterio que Botafogo "Custo venda de
  mercadoria").
- 'Outras receitas operacionais' (Nota separada, DRE: venda/empréstimo de direitos econômicos de
  jogadores) -> player_sales, las 3 sub-líneas (Empréstimos atletas, Vendas de atletas, Outras
  receitas c/transf. atletas).
- Nota "Custo com atividades esportivas" (19 líneas, idénticas en estructura los 3 años): las
  líneas de plantel/staff (Direito de imagem/comissão técnica, Salários/encargos sociais) ->
  wages_squad; 'Amortização dos direitos econômicos' -> player_amortisation; 'Custo com atletas
  negociados' -> other_expenses (costo asociado a jugadores transferidos, no amortización propia);
  'Despesas com competições' -> match_organisation_expense; el resto de líneas NO salariales
  propias del plantel (Outros custos com futebol, Lanches e refeições, Materiais esportivos,
  Materiais médico-cirúrgicos e medicamento, Serviços médicos/exames PJ) -> wages_squad, mismo
  criterio que Banfield Anexo IV / Boca 2027 / Racing (club-data-mapping/referencia/formato-simplificado.md, "CASO
  CONSULTADO": costos no salariales del plantel profesional mezclados en el mismo departamento
  de fútbol van con Sueldos); las líneas claramente administrativas/de oficina/instalaciones
  (Custo Sócio Torcedor, Energia elétrica, Licenciamento de Software, Manutenção –
  equipamentos/imóveis, Marketing/Publicidade/Mídias Sociais, Materiais de escritório e
  expediente, Outros custos gerais) -> admin_general_expense; 'Impostos e taxas' -> SIEMPRE
  admin_general_expense (regla ya establecida, club-data-mapping/referencia/casos-por-pais-y-formato.md).
- Nota "Custos com pessoal" (atividades patrimoniais, personal FUERA del plantel de fútbol) ->
  admin_general_expense completo.
- Nota "Custos gerais" (atividades patrimoniais) -> admin_general_expense completo (a diferencia
  de la nota homónima de fútbol, ésta es del sector patrimonial, no hay línea de plantel que
  separar).
- 'Custo com projetos' (línea suelta del DRE, sin nota de detalle propia) -> other_expenses.
- Nota "Despesas gerais e administrativas": 'Despesas com depreciação' -> depreciation; el resto
  (Despesas administrativas, Despesas com pessoal, Despesas indenizações trabalhistas) ->
  admin_general_expense.
- 'Despesas com contingências' (línea suelta del DRE, provisión por litigios) ->
  admin_general_expense (mismo criterio que Banfield "Juicios").
- 'Resultado equivalência patrimonial' -> exceptional_items (mismo criterio que Botafogo).

netInterest/tax: 'Receitas/(despesas) financeiras, líquidas' (Nota dedicada, Controladora) ->
netInterest. 'Imposto de renda e contribuição social' -> tax (fue 0 en Controladora los 3 años;
el Consolidado tuvo -3 en 2023, irrelevante para esta columna).

grossDebt = 'Empréstimos e financiamentos' (circulante + não circulante) + 'Operações de
debêntures' (circulante + não circulante, existe desde el balance 2024), Controladora — el
balance separa estas líneas de "Fornecedores e outras obrigações"/"Tributos e contribuições
sociais"/"Contas a pagar na transferência de jogadores", mismo criterio de club-data-mapping/referencia/formato-simplificado.md, "grossDebt" (preferir la línea angosta de deuda financiera real). cash = "Caixa e
equivalentes de caixa", Controladora.

Escala: documento "Em milhares de Reais" (miles de reales) los 3 años — acá en MILLONES de BRL
nativos (dividir por 1.000, mismo criterio que Botafogo/América Mineiro/Grêmio).

FX: ningún año declara un tipo de cambio de cierre propio (se buscó explícitamente
"cotação"/"câmbio"/"dólar" en los 3 documentos — la única mención es la política contable
genérica de IFRS sobre convertir activos/pasivos en moeda estrangeira a la tasa de cierre, sin
declarar la cifra). Se usó PTAX BCB de cierre (venda), vía fxRef a data/currency-map.js (ya
existían las 3 entradas antes de esta sesión): 'BRL@2023-12-31' (4,8413), 'BRL@2024-12-31'
(6,1923), 'BRL@2025-12-31' (5,5024). fxSource: 'market_close' los 3 años.

VERIFICACIÓN (Node, antes de cargar) — Controladora, columna año corriente de cada balance:
- 2023 (14/set-31/dic): revenueLines suma EXACTO 75,572 M BRL (75,343 Receita líquida + 0,229
  Outras receitas operacionais). expenseLines suma EXACTO -91,235 M BRL. Revenue + Expenses +
  netInterest(-25,520) = -41,183 M BRL = "Prejuízo do exercício" impreso, EXACTO.
- 2024: revenueLines suma EXACTO 580,132 M BRL (397,294 + 182,838). expenseLines suma EXACTO
  -739,558 M BRL (incluye Nota Custos esportivos -611,159 + Custos pessoal patrimonial -3,800 +
  Custos gerais patrimonial -20,578 + Custo com projetos -1,159 + Despesas G&A -35,592 +
  Despesas contingências -15,532 + Resultado equivalência patrimonial -51,738). Revenue +
  Expenses + netInterest(-139,928) = -299,354 M BRL = "Prejuízo do exercício" impreso, EXACTO.
- 2025: revenueLines suma EXACTO 664,760 M BRL (461,795 Receita líquida + 202,965 Outras receitas
  operacionais). expenseLines suma EXACTO -886,354 M BRL. Revenue + Expenses +
  netInterest(-660,515) = -882,109 M BRL = "Prejuízo do exercício" impreso, EXACTO. (Nota: la
  propia Nota 26 del balance 2025 imprime "Receita líquida 461.7956" — dígito de más, typo del
  propio documento; se usó 461,795, que es el valor que reconcilia contra el DRE y contra la
  comparativa "2025" que trae el propio balance en su encabezado de Nota. Además, dentro de esa
  misma Nota 26, las 2 líneas de "Deduções da receita" (Impostos e contribuições -50,537 + Custo
  de mercadorias e produtos -4,487) suman -55,024 impreso a mano, pero el propio documento
  imprime el subtotal de esa sección como -55,124 (100 mil de diferencia) — y es ESE subtotal
  impreso el que reconcilia exacto contra la Receita líquida (516,919 - 55,124 = 461,795). Se
  ajustó la línea "Impostos e contribuições" a -50,637 (en vez del -50,537 impreso) para que la
  suma de revenueLines cierre contra el subtotal impreso, documentado en el propio `rawLabel` de
  esa línea — mismo tipo de typo de imprenta de un dígito que el "461.7956" de arriba, no un
  error de carga.)

Gestión: ver "CAMBIO DE PRESIDENCIA" arriba — Bruno Muzzi (2023-2024), Pedro Daniel (2025),
ambos confirmados por firma en el propio balance (fuente primaria).
============================================================================
```

_de data/club-leagues/br.js:_

```text
clasificó a Libertadores 2023, a Sudamericana 2025
```

## 2025

### Meta

```text
grossDebt = "Empréstimos e financiamentos" (355,698 + 318,479 = 674,177) + "Operações de
debêntures" (47,580 circulante + 0 não circulante = 47,580), Controladora = 721,757.
cash = "Caixa e equivalentes de caixa".
netInterest = "Receitas/(despesas) financeiras, líquidas", Controladora (152,216 - 812,731) —
incluye la "Perda com Valor Justo" de R$572,161 M (impairment puntual, ver comentario de
cabecera). tax = 0 (Controladora).
officialTotalExpenses EXCLUYE 'Resultado equivalência patrimonial' (-180,320, exceptional_items),
mismo criterio que 2024 (ver comentario de ese año) y que Botafogo. Documento imprime 886,354
incluyendo ese ítem; acá va 706,034 (886,354 - 180,320).
```

## 2024

### Meta

```text
grossDebt = "Empréstimos e financiamentos" (285,563 + 210,168 = 495,731) + "Operações de
debêntures" (13,548 + 45,423 = 58,971, emitidas 25/09/2024), Controladora = 554,702.
cash = "Caixa e equivalentes de caixa".
netInterest = "Receitas/(despesas) financeiras, líquidas", Controladora (35,037 - 174,965).
officialTotalExpenses EXCLUYE 'Resultado equivalência patrimonial' (-51,738, exceptional_items)
— mismo criterio que Botafogo (data/br/botafogo-br-data.js): verifyTieOuts()/tools/audit.js comparan
"Expenses" contra gasto ordinario + no-efectivo solamente (expenses+nonCash), exceptional_items
no participa de ese check (sí de officialPAT, vía operatingProfit). Documento imprime 739,558
como total de despesas INCLUYENDO ese ítem; acá va 687,820 (739,558 - 51,738) para que cierre
contra la fórmula real del motor.
```

## 2023

### Meta

```text
grossDebt = "Empréstimos e financiamentos" (circulante 145,102 + não circulante 320,285),
Controladora — todavía sin debêntures en 2023 (línea "Operações de debêntures" aparece recién
en el balance 2024, con comparativo 2023 en cero). cash = "Caixa e equivalentes de caixa".
netInterest = "Receitas/(despesas) financeiras, líquidas", Controladora (31,370 - 56,890).
```

## Gestiones

_antes de Bruno Muzzi (data/gestiones/br.js):_

```text
SAF con cuatro accionistas personas (Menin, Guimaraes, Salvador): sin dueño unico, se carga el Diretor Presidente que firma el balance.
Muzzi: la fuente solo dice "desde 2022" (oficializacion de la SAF), dia 01/01 aproximado. Dejo el 31/12/2025.
```

_antes de Pedro Daniel (data/gestiones/br.js):_

```text
Pedro Daniel firma el balance 2025 (relatorio integrado) aunque asume el 01/01/2026: firmo [2025].
```

## Fuentes

### atleticomineiro-br-demonstracoes-2023

_note (data/):_

```text
PDF oficial (texto nativo), descargado del Portal da Transparência SAF (atletico.com.br/institucional/portal-da-transparencia/portal-da-transparencia-saf/). Se cargó la columna CONTROLADORA (la SAF standalone), no la Consolidado (que suma 3 controladas ajenas al negocio de fútbol: un fundo de investimento imobiliário dueño de la Arena MRV, y 2 SPE de locación/eventos del estadio). Este ejercicio cubre SOLO el período 14/set-31/dic/2023 (~3,5 meses desde la constitución de la SAF), no un año completo — ver comentario de cabecera de data/br/atleticomineiro-br-data.js. Firmado por Bruno Muzzi como Diretor Presidente. Convertido a USD con PTAX BCB de cierre 31/12/2023 (R$4,8413), el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2023.md.
```

### atleticomineiro-br-demonstracoes-2024

_note (data/):_

```text
PDF oficial (texto nativo). Columna CONTROLADORA. Primer ejercicio con emisión de debêntures reales (60.000 debêntures de R$1.000 nominal cada una, emitidas 25/09/2024, quirografárias, 3,50% a.a., vencimiento 25/09/2027) — sumadas a grossDebt. Firmado por Bruno Muzzi como Diretor Presidente. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923), ya existente en data/currency-map.js. Transcripción completa en Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2024.md.
```

### atleticomineiro-br-relatorio-integrado-2025

_note (data/):_

```text
A diferencia de 2023/2024 (PDFs solo-financieros), 2025 se publicó como "Relatório Integrado", un documento único y más amplio (financiero + sustentabilidad + gobernanza corporativa) que incluye las demonstrações financeiras en su propia sección (Balanço/DRE pág. 122-123, Notas explicativas de detalle pág. 168-171 del PDF). Columna CONTROLADORA. Prejuízo do exercício de R$882,109 M (casi triplica 2024), explicado principalmente por una "Perda com Valor Justo" de R$572,161 M (impairment puntual, no recurrente según la propia Nota 1) y un resultado negativo de equivalencia patrimonial de R$180,320 M. El informe del auditor (BDO) incluye 2 párrafos de Ênfase sin salvedad: transacciones con partes relacionadas (Nota 16, cesión no onerosa de ingresos de boletería/sócio torcedor a la controlada Arena Vencer) y deficiencia de capital circulante neto de R$817,991 M al cierre. Firmado por Pedro Daniel como Diretor Presidente (cambio de gestión respecto de 2023-2024, cuando firmaba Bruno Muzzi). Incluye además una cesión parcial (10%) de derechos económicos de transmisión futuros (Temporadas 2030-2074, R$98,056 M reconocidos en 2025) — ver comentario de cabecera de data/br/atleticomineiro-br-data.js sobre por qué se cargó como other_income y no como broadcasting. Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024), ya existente en data/currency-map.js. Transcripción completa en Clubes/Brasil/Atletico Mineiro/relatorio-integrado-saf-2025.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (bracket notation, clubId con guión — mismo patrón que
banfield-ar/americamineiro-br desde la Versión 82).
```

### gestionesByClub['atleticomineiro-br']

```text
Confirmado por firma en el propio balance (fuente primaria, no prensa externa).
```

### memberCountByClub['atleticomineiro-br']

```text
no se encontró una cifra total de sócios/sócio torcedor en los documentos
```
