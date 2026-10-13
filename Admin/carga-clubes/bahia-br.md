# bahia-br — evidencia de carga

Lo que había como comentario en `data/bahia-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/bahia-br-data.js — Esporte Clube Bahia S.A.F. (Sociedade Anônima do Futebol),
Salvador/Camaçari-BA, Brasil ("Tricolor Baiano"/"Esquadrão de Aço"). 2 ejercicios cargados:
2024 y 2025.

DOS ENTIDADES SEPARADAS, MISMO CLUB (ver fuentes/Brasil/Bahia.md): la SAF (Esporte Clube Bahia
S.A.F., constituída 27/02/2023 junto al City Football Group, el negocio de fútbol profesional
desde entonces) y a associação (Esporte Clube Bahia, entidad social civil sin fines de lucro,
dueña del patrimonio histórico/marca/títulos). Se cargó SOLO la SAF — los 3 PDFs de la
associação (demonstracoes-financeiras-associacao-2020-2021/2021-2022/2022-2023.md, en la misma
carpeta Clubes/Brasil/Bahia/) NO se usaron acá, son otra entidad jurídica.

Fuente: "Demonstrações Financeiras acompanhadas do Relatório do Auditor Independente" da
Esporte Clube Bahia S.A.F. (auditor: RSM Brasil Auditores Independentes Ltda.), descargadas de
esporteclubebahia.com.br/wp-content/uploads/. PDF con texto nativo. Transcripción completa en:
- Clubes/Brasil/Bahia/demonstracoes-financeiras-2024.md (exercício findo 31/12/2024, comparativo
  10 meses findos 31/12/2023 — la SAF empezó a operar recién el 27/02/2023).
- Clubes/Brasil/Bahia/demonstracoes-financeiras-2025.md (exercício findo 31/12/2025, comparativo
  2024 REAPRESENTADO — ver "REGLA 6.5" abajo, NO se usó esa columna comparativa para el 2024).

NO HAY COLUMNA CONTROLADORA/CONSOLIDADO PARA ELEGIR (a diferencia de Botafogo/Atlético Mineiro):
se buscó explícitamente "Consolidado"/"controlada"/"controladas" en los 2 PDF y NO aparece
ninguna nota de "Estrutura societária" con subsidiarias ni un balanço com 2 columnas — el Bahia
S.A.F. presenta un único juego de estados financieros standalone. No aplica el criterio de
sección 1 del comentario de Botafogo/Atlético Mineiro, simplemente no hay 2 perímetros entre los
que elegir.

REGLA 6.5 DE club-data-mapping (columna año corriente, NUNCA la comparativa de un balance
posterior) — ACÁ ES CRÍTICO Y CONFIRMADO CON UN HALLAZGO REAL: el balance 2025 declara
explícitamente (Nota 2.20 "Reapresentação dos valores correspondentes") que SU PROPIA columna
comparativa "2024" fue REAPRESENTADA (reclasificada) respecto del 2024 tal como se publicó
originalmente, por 2 motivos: (a) cambio de criterio de reconocimiento de "Receitas a realizar"
(patrocinios/TV ya no se reconocen 100% a la firma del contrato, sino por devengamiento), y (b)
adopción de ITG 2003(R2) ítems 10-12, que obliga a mostrar venta de jugadores y sus costos
directamente atribuibles NETEADOS dentro de "Outras receitas e despesas", separados de Receita
Líquida/Custo das Atividades. El Total do Ativo 2024 cambia de R$1.318.700 (mil) tal como se
publicó en el balance 2024 a R$970.335 (mil) reexpresado en la columna comparativa del balance
2025 — una diferencia de R$348.365 mil, NADA chica. Se usó, para 2024, EXCLUSIVAMENTE la columna
año corriente de demonstracoes-financeiras-2024.md (el balance CUYO año corriente ES 2024, antes
de la reexpresión), tal como exige la regla. Para 2025 se usó la columna año corriente (2025) de
demonstracoes-financeiras-2025.md, que ya viene en el formato reexpresado/nuevo.

CONSECUENCIA PRÁCTICA DE LO ANTERIOR PARA LA CATEGORIZACIÓN: como 2024 (as-filed) y 2025 usan 2
estructuras de Nota DISTINTAS para el mismo tipo de gasto, la categorización no es 100% paralela
entre los 2 años — documentado línea por línea abajo. En particular:
- En el balance 2024 as-filed, "Despesa de amortização sobre direitos de jogadores" (R$98.430 mil,
  confirmado por el Estado de Flujo de Efectivo, que la muestra como ítem no-caja a revertir) está
  ENTERRADA dentro de "Custo das Atividades" (Nota 16, solo 4 líneas: Pessoal/Negociação/Viagens/
  Outros), sin una línea propia. La propia Nota 2.20 del balance 2025 lo confirma: al reexpresar
  2024, "Amortização" pasa a ser una línea aparte de -98.430, sacada de min "Custo das Atividades"
  (que baja de 445.465 a 330.947, un ajuste de +114.518). Cruzando esto contra el detalle de las 4
  líneas de Nota 16 en su versión reexpresada (Pessoal 269.217, Negociação 4.686, Viagens 30.952,
  Outros custos 26.092 — Nota 18 del balance 2025) contra las 4 líneas as-filed (Pessoal 293.677,
  Negociação 97.272, Viagens 30.952, Outros custos 23.564): "Negociação" es la que más cae
  (97.272 -> 4.686, -92.586) y es, con diferencia, la más próxima en magnitud a los 98.430 de
  amortización — evidencia fuerte (no 100% exacta, no hay más desglose disponible en el as-filed)
  de que la amortización de jugadores estaba mayormente enterrada ahí. Por eso, para 2024, 'Custos
  com negociação' (97.272) se cargó como `player_amortisation` en vez de `other_expenses`
  (comisiones/intermediación) — es la mejor aproximación disponible con el nivel de detalle que
  ofrece el as-filed, documentada acá para que quede claro que no es una lectura literal de un
  rótulo "amortização", es una inferencia razonada. DUDA GENUINA para Bahia: pedir el desglose de
  Nota 16 as-filed en el mismo formato que ya usan desde 2025 (Amortização separada).
- El balance 2025 (año corriente, formato YA reexpresado) SÍ separa una línea "Amortização" propia
  (-144.833, Nota 8) fuera de "Custo das Atividades" — se cargó directo a `player_amortisation`,
  sin ambigüedad. La línea residual 'Negociações' (Nota 18, -16.801) que queda DENTRO de "Custo das
  Atividades" ahora sí es puramente costo de negociación/intermediación (agentes, comisiones), no
  amortización — se cargó a `other_expenses`, mismo criterio que Botafogo/Racing/Grêmio para
  comisiones de intermediación (club-data-mapping sección 1: "comisiones/pagos de intermediación NO
  van a player_amortisation"). Y 'Custos/baixas por negociação de direitos contratuais' (Nota 21,
  -70.720), que agrupa la baja/write-off de derechos federativos por ventas/rescisiones de
  jugadores (conceptualmente igual a "Baixa de atletas" de Botafogo) -> `player_amortisation`
  también.

'Receitas com negociação de direitos contratuais' (2024: 35.693: 2025, Nota 21: 168.944) ->
`player_sales`: la Nota 21(b) del balance 2025 la define explícita como "receitas auferidas com a
cessão/transferência definitiva ou temporária de direitos contratuais... eventuais indenizações,
multas e demais valores", ingreso bruto de venta/préstamo de jugadores, sin netear contra costos
(mismo criterio que Racing/Boca: si el documento no netea, no se netea acá tampoco — aunque el
balance 2025 SÍ muestra esta línea y su costo asociado juntas dentro de la misma Nota 21, son 2
líneas separadas con signo propio, no una línea neta única).

'Receitas de sócios e bilheteria' / 'Sócios e bilheteria' (2024: 83.183; 2025: 116.810) — DUDA
GENUINA SIN RESOLVER, documentada para Admin/dudas-por-club.md: el documento NUNCA separa cuánto
de esta línea es cuota de sócio-torcedor (member_dues) y cuánto es recaudación de entradas
(matchday_competition) — ni en la Nota 15/17 de Receita, ni en la Nota de Contas a Receber (que
también junta "Contribuições de sócios e Matchday" en una sola cifra). La Nota 17(b) del balance
2025 confirma que son 2 fuentes de ingreso reales y crecientes ("aumento das receitas de programas
de sócios/associação decorrente do aumento do preço e aumento do número de vagas para sócios" +
"receitas de bilheteria são decorrentes do contrato com a Arena Fonte Nova"), pero sin desglosar
el peso de cada una. A diferencia de Botafogo/Atlético Mineiro (que sí separan "Camisa 7"/"Sócio
torcedor" de "Bilheteria" en líneas propias), Bahia las funde. Se cargó la línea COMPLETA como
`matchday_competition` (con el rawLabel dejando explícito que es una cifra combinada) — la
consecuencia es que "Cuotas Sociales" (member_dues) muestra $0 en Formato Simplificado para Bahia
pese a que el club sí tiene un programa de sócio-torcedor real y creciente. Es una limitación de
la fuente, no una categorización descartada a la ligera: no hay ningún desglose disponible en
ningún lado del documento para separarlo sin inventar un porcentaje. Reportado como duda genuina
para escribirle a Bahia.

'Filiais' (ingresos por operación de sucursales/locales del club, "comercialização de produtos e
demais receitas acessórias", Nota 17c/19c 2025 — la tienda física se discontinuó en 2023) ->
`other_income` (mixto, sin categoría más específica).
'Loterias' (Timemania, lotería federal para clubes brasileños) -> `other_income`, mismo criterio
que Atlético Mineiro.
'Impostos e contribuições incidentes' / 'Custo e deduções de venda' (deducciones de la Receita
Bruta, contra-revenue) -> `other_income` (negativo), mismo criterio que Botafogo/Atlético Mineiro
"Deduções sobre a receita".
'Reversão de provisões' (reversión de litigios resueltos favorablemente) -> `other_income`.

'Custo de pessoal / encargos / benefícios' (Custo das Atividades) -> `wages_squad`.
'Custos de viagens'/'Viagens' (vuelos fretados para plantel/staff) -> `match_organisation_expense`.
'Outros custos' (Custo das Atividades — Nota 16c/18c: activaciones de sponsors, experiencia del
hincha en días de partido, alquiler del Arena Fonte Nova, repases del programa de sócios a Fonte
Nova Participações) -> `other_expenses` (mezcla sin categoría única clara; el propio texto de la
nota descarta que sea costo de jugadores).
Despesas Gerais e Administrativas (Nota 17/19: Pessoal, Gerais, Consumo, Manutenção, Aluguéis) y
Despesas de Serviços (Nota 18/20: Informática, Marketing, Jurídico, Manutenção, Consultoria e
Auditoria, Segurança, Transporte, Médico) -> `admin_general_expense` completas (mismo criterio que
Botafogo: costos de oficina/administración/servicios profesionales, no del plantel).
'Despesas tributárias' -> `admin_general_expense` (regla fija, club-data-mapping/referencia/casos-por-pais-y-formato.md).
'Depreciação e amortização' (2024, línea única del imobilizado — la de intangible/jugadores está
en Custo das Atividades, ver arriba) / 'Depreciação' (2025, Nota 7, ya separada de 'Amortização'
que es Nota 8 de intangible) -> `depreciation`.
'Perda na recuperação de créditos de sócios' (deterioro/incobrabilidad de cuentas por cobrar a
sócios) -> `other_expenses` (no hay categoría más específica; conceptualmente ligada a member_dues
pero es un cargo de gasto, no contra-revenue, en la propia DRE).
'Processos cíveis'/'Processos trabalhistas' (litigios heredados de la Associação) -> `other_expenses`.
'Contingência fiscal' (2025 únicamente: parcelamento de ICMS anterior al acuerdo de accionistas,
que paga la Associação y la SAF reembolsa) -> `other_expenses`.
'Partes relacionadas' (Nota 19e/21e: pago anual de R$2.500 a la Associação por mantenimiento de
sus operaciones, corregido por IPCA) -> `other_expenses`.

netInterest/tax: 'Resultado financeiro' (Nota 20/22, ya neto de Receitas financeiras − Despesas
financeiras ± Variação cambial) -> `netInterest`. No hay línea de Imposto de renda/CSLL en ningún
año (el Bahia S.A.F. viene reportando pérdidas, consistente con no deber IR/CSLL) -> `tax:0`.
profitOnPlayerSales/assetSales: 0 en los 2 años — no hay una línea separada de "ganancia por venta
de activos fijos" ni una utilidad de pases neteada aparte (ya está dentro de revenueLines/
expenseLines sin netear, ver arriba).

Escala: documento "Valores expressos em milhares de Reais" (miles de reales) — acá en MILLONES de
BRL nativos (dividir por 1.000, mismo criterio que Botafogo/Atlético Mineiro). OJO con los valores
impresos SIN separador de miles (ej. "Marketing 623", "Contingência fiscal 475", "Descontos
financeiros 86"): esos son < R$1.000 mil, van como 0.623/0.475/0.086 en millones, NO como 623/475/
86 — confirmado en cada caso porque la suma de la Nota cierra exacto solo con esa lectura (ver
verificación abajo).

FX: ningún año declara un tipo de cambio de cierre propio — Nota 21 (2024)/23 (2025) "Gestão do
Risco de Taxa de Câmbio" solo describe la exposición cualitativamente ("O Bahia S.A.F possui
transações em moeda estrangeira... consequentemente, surgem exposições"), sin declarar una cifra
de cierre. Se usó PTAX BCB de cierre (venda), vía fxRef a data/currency-map.js (ya existían las 2
entradas antes de esta sesión): 'BRL@2024-12-31' (6,1923), 'BRL@2025-12-31' (5,5024). fxSource:
'market_close' los 2 años.

VERIFICACIÓN (Node, antes de cargar):
- 2024: revenueLines suma EXACTO 278,556 M BRL (273,347 Receita líquida das atividades + 5,209
  Reversão de provisões, Nota 19). expenseLines suma EXACTO -528,441 M BRL. revenue + expenses +
  netInterest(3,340, Resultado financeiro Nota 20) = -246,545 M BRL = "Prejuízo do exercício"
  impreso, EXACTO.
- 2025: revenueLines suma EXACTO 545,404 M BRL (367,570 Receita líquida das atividades + 8,890
  Reversão de provisões + 168,944 Receitas com negociação de direitos contratuais, ambas Nota 21).
  expenseLines suma EXACTO -698,216 M BRL. revenue + expenses + netInterest(-1,812, Resultado
  financeiro Nota 22) = -154,624 M BRL = "Prejuízo do exercício" impreso, EXACTO.

grossDebt: NO hay línea "Empréstimos e financiamentos" bancarios en este balance — el financiamiento
real de la SAF es 100% vía mútuos (préstamos) de sus accionistas/partes relacionadas (City Football
Group Matriz/Brazil, y desde 2025 también Manchester City por transacciones de jugadores), la línea
"Partes relacionadas" (Passivo não circulante, Nota 7/9), clasificada por el propio balance dentro
de "Passivos financeiros" en su nota de instrumentos financieros (2024) — es la deuda financiera
real, separada de Fornecedores/Obrigações trabalhistas/Receita a apropriar (pasivos operativos). Se
usó ESA línea, no el Total do Passivo completo: 2024 = 679,901 M (mútuos con CFG Matriz + CFG
Brazil); 2025 = 36,841 M (cayó fuerte: la mayor parte del saldo de mútuos, R$906,718 M, se convirtió
en AFAC — Adiantamento para Futuro Aumento de Capital, dentro del Patrimônio Líquido — durante 2025,
ver Nota 16.2/9.4 del balance 2025). cash = "Caixa e equivalentes de caixa": 2024 = 134,387 M; 2025
= 33,984 M.

Gestión: Raul Aguirre Zegarra firma como "Presidente" AMBOS balances (2024, firmado 21/03/2025; y
2025, firmado en 2026) — mismo presidente confirmado por firma en la propia fuente primaria los 2
ejercicios, sin cambio de gestión entre 2024 y 2025.

brandColor: NO SE PUDO RESOLVER CON CONFIANZA — ver fuentes/Brasil/Bahia.md para el detalle
completo. Bahia es tricolor EN PARTES IGUALES (azul, vermelho, branco — "Tricolor Baiano"), y
Wikipedia en portugués no declara predominancia de ninguno de los 3 sobre los otros 2 (cada color
tiene su propio origen: azul de la Associação Atlética da Bahia, blanco del Clube Bahiano de Tênis,
rojo de la bandera del estado de Bahia). Ninguno de los 4 criterios de desempate de
club-or-year-onboarding sección 3 resuelve un empate a TRES colores donde ninguno es explícitamente
"el que no es blanco" contra un solo rival (acá hay 2 colores no-blancos empatados entre sí). El
`theme-color`/paleta CSS del sitio oficial está contaminada por la paleta default de Gutenberg/
WordPress (#ff6900, #fcb900, #f78da7, etc., ninguno de la familia real del club). `brandColor: null`
— resultado cerrado, no pendiente (ver criterio de esa sección).
============================================================================
```

_de data/club-leagues/br.js:_

```text
clasificó a Libertadores los 2 años
```

## 2025

### Meta

```text
Versión 509: el sitio muestra "Incluido en …" en la fila de socios en vez de $0. "Sócios e bilheteria" junta cuotas de socio-torcedor y entradas; los documentos de la SAF no los separan.
grossDebt = "Partes relacionadas" (Passivo não circulante, Nota 9 — mútuos com CFG Brazil +
Manchester City). Cayó fuerte vs. 2024 porque R$906,718 M del saldo se convirtió en AFAC
(Adiantamento para Futuro Aumento de Capital, dentro do Patrimônio Líquido) durante 2025.
cash = "Caixa e equivalentes de caixa" (Nota 3).
netInterest = "Resultado financeiro" (Nota 22): Receitas financeiras 3,043 − Despesas
financeiras 0,151 − Variação cambial líquida 4,704 (negativa, oriunda principalmente de
operações com negociação de atletas no exterior).
```

## 2024

### Gastos

_antes de la fila 2 (`Custos com negociação (Custo das Atividades — incluye amortização de direitos de jogadores no separada por la fuente, ver comentario de cabecera)`):_

```text
Ver comentario de cabecera: no hay línea propia de "amortização de atletas" en el as-filed
2024 — esta línea es la mejor aproximación disponible (evidencia cuantitativa vía la
reexpresión del balance 2025, no una lectura literal del rótulo).
```

### Meta

```text
Versión 509: el sitio muestra "Incluido en …" en la fila de socios en vez de $0. "Sócios e bilheteria" junta cuotas de socio-torcedor y entradas; los documentos de la SAF no los separan.
grossDebt = "Partes relacionadas" (Passivo não circulante, Nota 7 — mútuos com City Football
Group Matriz + CFG Brazil), la línea de deuda financeira real (el propio balance la clasifica
dentro de "Passivos financeiros" en su nota de instrumentos financieros). cash = "Caixa e
equivalentes de caixa" (Nota 3).
netInterest = "Resultado financeiro" (Nota 20): Receitas financeiras 4,336 − Despesas
financeiras 0,996.
officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines
(no hay ítem de exceptional_items que excluir en este balance). officialPAT = "Prejuízo do
exercício" impreso, exacto.
```

## Gestiones

_antes de Raul Aguirre Zegarra (data/gestiones/br.js):_

```text
SAF controlada por City Football Group (sociedad, sin dueño persona). Raul Aguirre Zegarra firma los balances como "Presidente"; la prensa lo llama CEO.
```

## Fuentes

### bahia-br-demonstracoes-2024

_note (data/):_

```text
PDF oficial (texto nativo), auditado por RSM Brasil Auditores Independentes Ltda., sem ressalvas (com parágrafo de Ênfase sobre operações com partes relacionadas, Nota 7). Se cargó la SAF (Esporte Clube Bahia S.A.F.), NO la associação social (entidad jurídica separada, ver fuentes/Brasil/Bahia.md) — el documento no tiene columna Controladora/Consolidado, es un único juego de estados financieros standalone. Prejuízo do exercício de R$246,545 M (patrimônio líquido negativo de R$95,848 M al cierre), explicado por la Administração como inversión sostenida en el plantel profesional y en la estructuración de la SAF desde su constitución en 2023. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923) — el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Bahia/demonstracoes-financeiras-2024.md. DUDA GENUINA: el documento no separa "sócios" de "bilheteria" en ninguna nota (ver comentario de cabecera de data/bahia-br-data.js) — candidato a pregunta directa al club.
```

### bahia-br-demonstracoes-2025

_note (data/):_

```text
PDF oficial (texto nativo), auditado por RSM Brasil Auditores Independentes Ltda. Se cargó la SAF, NO la associação. Prejuízo do exercício de R$154,624 M (menor que el 2024 pese a más gasto operativo, por una fuerte ganancia bruta de venda de jugadores — Receitas com negociação de direitos contratuais de R$168,944 M, Nota 21). Este balance reexpresó su columna comparativa 2024 (Nota 2.20: cambio de criterio de reconocimiento de receitas a realizar + adopción de ITG 2003(R2) para netear venta de jugadores) — el ejercicio 2024 cargado en este sitio usa la columna año corriente del balance 2024 ORIGINAL (demonstracoes-financeiras-2024.md), no esta columna comparativa reexpresada, ver comentario de cabecera de data/bahia-br-data.js. Patrimônio líquido pasó a ser POSITIVO (R$656,246 M) por la conversión de R$906,718 M de mútuos con accionistas en AFAC (Adiantamento para Futuro Aumento de Capital). Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024) — el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Bahia/demonstracoes-financeiras-2025.md. Misma duda genuina de "sócios e bilheteria" sin separar (ver 2024).
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (bracket notation, clubId con guión — mismo patrón que
banfield-ar/atleticomineiro-br).
```

### gestionesByClub['bahia-br']

```text
Raul Aguirre Zegarra firma como "Presidente" los balances 2024 (firmado 21/03/2025) y 2025 —
confirmado por firma en la propia fuente primaria los 2 ejercicios, fuente primaria directa.
```

### memberCountByClub['bahia-br']

```text
no se encontró una cifra total de sócios/sócio-torcedor en los documentos
```
