# ceara-br — evidencia de carga

Lo que había como comentario en `data/br/ceara-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/ceara-br-data.js — Ceará Sporting Club, Fortaleza (CE), Brasil (CNPJ
07.369.226/0001-03). Associação civil sem fins econômicos (fundada em 2 de junho de 1914,
originalmente Rio Branco Football Club — mudou de nome e cores em 1915, ver comentário de
brandColor abaixo), NÃO é SAF: mesmo tipo de entidade que Palmeiras/Flamengo/Corinthians. clubId
'ceara-br' (CON GUIÓN, bracket notation en clubs{}/CLUB_GENERIC_DATA/gestionesByClub/
memberCountByClub, mismo criterio que el resto de los clubes brasileños).

2 ejercicios cargados: 2025 e 2024 (ejercicio social = ANO CALENDÁRIO, 1°/1 a 31/12 —
clubs.js, fiscalYearStart:'01-01', confirmado por la carátula: "DOS EXERCÍCIOS FINDOS EM 31 DE
DEZEMBRO DE 2025 E 2024"). Fuente única: "Demonstrações Contábeis" com Relatório dos Auditores
Independentes (Sistema Auditores Independentes S/C, opinião SEM ressalva mas COM ênfase de
incerteza relevante sobre continuidade operacional — Nota Explicativa 2.2), assinado
30/04/2026, com comparativo completo 2025 x 2024 dentro do MESMO documento (não son 2 PDF
separados como Palmeiras). Transcrição completa (pdftotext -layout, texto nativo) em
Clubes/Brasil/Ceara/demonstracoes-contabeis-2025.md (2134 líneas).

UNIDADE: a diferença de Palmeiras/Flamengo (que reportam "em milhares"), este documento reporta
"Em Reais" DIRETO (valor nominal completo, ver DRE: "RECEITA OPERACIONAL LIQUIDA...
221.545.956,46" = R$221,5 milhões, confirmado contra o texto narrativo do Relatório da
Administração: "receita líquida total, que passou de R$ 161,9 milhões [2024] para R$ 221,5
milhões [2025]"). Acá en MILLONES de BRL nativos: dividir por 1.000.000 (não por 1.000 como
Palmeiras), cada amountNative redondeado a 3 decimales (nearest mil reais), mismo criterio de
precisión que ya usa Palmeiras (ver su comentario de cabecera sobre "ruído de redondeo").

ESTRUCTURA DEL DOCUMENTO: Nota 23 (Receita Operacional Líquida) e Nota 24 (Custos e despesas
operacionais) SEGMENTAN cada rubro en 2 columnas (Futebol Profissional / Administração, Clube
Social e esportes amadores) + Total, para los 2 ejercicios. Se aprovechó esta granularidad para
separar Pessoal e Encargos por sector (ver Gastos abajo), igual que Vélez/Palmeiras
(club-data-mapping/referencia/formato-simplificado.md).

GOTCHA DE EXTRACCIÓN ENCONTRADO EN ESTA SESIÓN, para que no haya que redescubrirlo: la tabla de
Nota 24 (Custos e despesas operacionais) viene con las filas 2024 de "Amortizações - Recompra
dos Direitos", "Jogos e Competições" y "Despesas programa de Sócio Torcedor"/"Despesas com
Tributos"/"Outros Resultados Operacionais" CORRIDAS/desplazadas una fila por el parsing de
pdftotext -layout sobre esta tabla ancha de 6 columnas — el valor 15.200.484,19 que el texto
narrativo del Relatório da Administração confirma como "Jogos e Competições... R$ 15,2 milhões
[2024]" aparecía adosado a la fila de "Amortizações - Recompra dos Direitos" en la extracción
cruda. Se resolvió cruzando 3 fuentes: (a) el total impreso de "CUSTOS E DESPESAS OPERACIONAIS"
2024 = R$148.303.303,98, (b) el texto narrativo del Relatório (que da Jogos e Competições
2024=R$15,2M expresamente), y (c) que "Amortizações - Direitos Econômicos" + "Depreciação" 2024
YA SUMABAN exacto el subtotal impreso de "Depreciação e Amortizações" (R$12.290.515,76), sin
necesitar la "Amortização - Recompra" (que da 0 en 2024, coherente con que la recompra de 5% de
los direitos de transmissão da LFF recién ocurrió en marzo de 2025, Nota 12). Con esto,
"Despesas programa de Sócio Torcedor" + "Despesas com Tributos" + "Outros Resultados
Operacionais" de 2024 no pudieron desagregarse individualmente con certeza (misma corrida de
filas), así que se cargaron COMBINADAS en una sola línea (residual exacto contra el total
impreso, ver Gastos 2024 abajo) — a diferencia de 2025, que SÍ tiene las 7 categorías de Nota 24
completamente desagregadas y verificadas.

Categorización (Ingresos), Nota 23 "Receita Operacional Líquida" (RECEITA BRUTA menos
DEDUÇÕES = RECEITA LÍQUIDA, los 2 años):
- 'Direitos de Transmissão' -> broadcasting. 'Premiações' (torneios/competições, separado de la
  línea de transmissão por el propio documento) -> competition_bonus (club-data-mapping sección
  1, "premios por avance de ronda/campeonato reportados como línea propia").
- 'Bilheteria — jogos' -> matchday_competition. 'Estacionamento, bares, camarotes' (uso del
  estádio FUERA del partido en sí — concessões/camarotes) -> stadium_other (criterio conservador
  de la sección 1: el rótulo SÍ nombra elementos del estádio explícitamente).
- 'Patrocínio', 'Royalties e Licenciamento' (royalties de lojas franqueadas, Nota 2.3.10.5), y
  'Outras receitas com publicidade' -> sponsorship_commercial (las 3, mismo criterio que Racing
  "Royalties de Produtos Licenciados").
- 'Programa de Sócio Torcedor' -> member_dues (Nota 2.3.10.4: "recursos provenientes dos valores
  de mensalidades recebidas dos sócios" — funciona igual que cuotas sociales).
- 'Negociação de atletas' -> player_sales (receita BRUTA de transferências, sem netear, mismo
  criterio que Racing/Boca — club-data-mapping sección 3).
- 'Escolinha/Fábrica de craques' -> youth_football (escuela de fútbol infantil, NO colegio
  formal — no hay línea de 'education' en este documento).
- 'Outras receitas patrimoniais', 'Timemania' (loteria federal, parceria), 'Convênio Enel'
  (convênio energético), 'Receitas com Eventos' (NO nombra el estádio explícitamente pese a ser
  probablemente eventos en el estádio — criterio conservador de la sección 1, se dejó en
  other_income en vez de stadium_other por no estar seguro), 'Outras receitas' y 'Lei do
  incentivo ao esporte' (ley federal de incentivo fiscal al deporte) -> other_income (todas
  marginales, catch-all).
- 'Venda de direitos de participação' (SOLO 2024, R$60.119.065,78 — venda de 5% dos direitos de
  transmissão da LFF a investidores Life Capital Partners/Serengeti Asset Management, Nota 12 e
  28; recomprado em março/2025) -> other_income. PREGUNTA GENUINA (ver reporte a Guido/dudas-por-
  club.md): esto podría también justificar `broadcasting` (es fundamentalmente una monetización
  de direitos de transmissão) o su propia categoría — se dejó other_income por ser una operación
  financiera/patrimonial one-off (venda de um ativo intangível, não receita operacional
  recorrente de transmissão), pero no hay un precedente exacto en el skill para este caso.
- Deduções da receita bruta (Nota 23, restadas del total, NO por tipo de receita — el documento
  no las desglosa por rubro): 'Impostos' -> other_income (negativo, contra-receita tributaria,
  mismo criterio que impuestos siempre reducen receita/van a admin, acá directo como deducción
  de receita porque así lo estructura el propio documento). 'Direito de arena' (repartição
  obrigatória de receita de bilheteria/transmissão entre clubes/atletas, Lei Pelé) ->
  broadcasting (negativo, reduce específicamente receita de transmissão/bilheteria). 'Outras
  deduções' -> other_income (negativo).

Categorización (Gastos), Nota 24 "Custos e despesas operacionais":
- 'Pessoal e Encargos': columna Futebol Profissional -> wages_squad; columna Administração,
  Clube Social e esportes amadores -> admin_general_expense (el documento NO separa más fino
  "clube social" de "esportes amadores" en esta columna, a diferencia de Palmeiras que sí tiene
  columnas propias para futebol feminino/de base — documentado, ver club-data-mapping/referencia/formato-simplificado.md, "grossDebt").
- 'Gerais e Administrativas' se desagregó en sus 4 componentes propios (Nota 24 los desglosa):
  'Materiais e Manutenção', 'Serviços de Terceiros' y 'Gerais' -> admin_general_expense; 'Custos
  gerais com negociação de atletas' -> player_amortisation (el Relatório da Administração
  confirma que ~70% del crecimiento de Gerais e Administrativas 2024->2025 es "custo com venda
  de atletas": quando um jogador é vendido antes do fim do contrato, o saldo líquido do
  investimento intangível menos a amortização já reconhecida se baixa como despesa — exactamente
  el mismo concepto que 'player_amortisation' ya usa para Racing/Boca).
- 'Depreciação e Amortizações' se desagregó en sus 3 componentes: 'Depreciação' -> depreciation;
  'Amortizações - Direitos Econômicos' (amortização de pases de jogadores) -> player_amortisation;
  'Amortizações - Recompra dos Direitos' (amortização do ativo intangível criado pela recompra de
  5% dos direitos de transmissão da LFF, Nota 12 — NÃO é pase de jogador) -> other_amortisation
  (SOLO 2025, 0 en 2024).
- 'Jogos e Competições' -> match_organisation_expense (mismo bucket que Boca "Organización de
  partidos").
- 'Despesas com Tributos' -> admin_general_expense (club-data-mapping/referencia/casos-por-pais-y-formato.md: impuestos
  siempre van ahí). 'Despesas programa de Sócio Torcedor' -> admin_general_expense (costo
  operativo de correr el programa, no hay categoría de "gasto de cuotas sociales" separada —
  mismo criterio que Palmeiras "Despesas sócio torcedor Avanti"). 'Outros Resultados
  Operacionais' -> other_expenses (marginal, R$146,66 en 2025).
- 2024: 'Despesas programa de Sócio Torcedor' + 'Despesas com Tributos' + 'Outros Resultados
  Operacionais' se cargaron COMBINADAS en una sola línea -> admin_general_expense (ver GOTCHA DE
  EXTRACCIÓN arriba: no se pudieron desagregar individualmente con certeza por la corrida de
  filas en la tabla, pero el residual agregado es EXACTO contra el total impreso).

netInterest = 'Receitas Financeiras' − 'Despesas Financeiras' (Nota 25, TOTAL, nunca como línea
— club-data-mapping sección 2): 2025 = 1.222.468,50 − 37.835.762,35 = −36.613.293,85 (−36,613 M
BRL); 2024 = 674.846,26 − 19.999.156,84 = −19.324.310,58 (−19,324 M BRL). tax=0 (associação sem
fins de lucro, sem linha de imposto de renda na DRE — 'Despesas com Tributos' ya está en
expenseLines, no es un tax aparte). profitOnPlayerSales = assetSales = 0 (nada se netea aparte
de lo ya bruto en revenueLines/expenseLines).

VERIFICACIÓN OBLIGATORIA (hecha a mano en R$ completos ANTES de dividir por 1.000.000 y
redondear, para no arrastrar error de redondeo a la verificación):
2025: revenueLines (bruto + deduções) suman EXACTO R$221.545.956,46 = "RECEITA OPERACIONAL
LIQUIDA" impresa. expenseLines suman EXACTO R$270.769.212,99 = "CUSTOS E DESPESAS OPERACIONAIS"
impresa. Receita − Despesas = R$-49.223.256,53 = "SUPERÁVIT OPERACIONAL ANTES DAS RECEITAS E
DESPESAS FINANCEIRAS" impreso, EXACTO. + netInterest (-36.613.293,85) = R$-85.836.550,38 =
"DÉFICIT DO EXERCÍCIO" impreso, EXACTO.
2024: revenueLines suman EXACTO R$161.925.359,42 = "RECEITA LÍQUIDA" impresa. expenseLines suman
EXACTO R$148.303.303,98 = "CUSTOS E DESPESAS OPERACIONAIS" impresa (ver GOTCHA arriba: se llegó
a este número combinando la línea residual). Receita − Despesas = R$13.622.055,44 = "SUPERÁVIT
OPERACIONAL ANTES..." impreso, EXACTO. + netInterest (-19.324.310,58) = R$-5.702.255,14 =
"DÉFICIT DO EXERCÍCIO" impreso, EXACTO. Los 2 ejercicios cierran perfecto contra los 4 números
oficiales impresos (Receita, Despesas, Superávit operacional, Déficit do exercício).
Nota: los `amountNative` de abajo están redondeados a 3 decimales (mil reais) para legibilidad en
millones, así que la suma de las líneas del archivo puede diferir del total oficial en unos
pocos miles de reais (ruído de redondeo, mismo criterio ya documentado en palmeiras-br-data.js) —
la verificación real y exacta es la de arriba, hecha sobre los valores completos en reais.

grossDebt = 'Empréstimos e Financiamentos' (Passivo Circulante + Não Circulante, Nota 14/Balanço
Patrimonial): 2025 = R$30.231.893,92 (circulante) + R$54.500.224,92 (não circulante) =
R$84.732.118,84 (mismo total que imprime la propia Nota 14). 2024 = R$9.775.343,16 (circulante,
leído del Balanço Patrimonial — Nota 14 solo desglosa el detalle por acreedor para 2025) +
R$37.383.716,21 (não circulante) = R$47.159.059,37. cash = 'Caixa e Equivalentes de Caixa' (Nota
3): 2025 = R$2.110.419,90; 2024 = R$619.155,50.

FX: el documento NO declara un tipo de cambio de cierre propio (no tiene Anexo de moeda
estrangeira — es ITG 2002/2003, formato distinto del RT6 argentino), así que se usó PTAX de
cierre BCB vía FX_CLOSE (data/currency-map.js, entradas YA EXISTENTES antes de esta sesión,
usadas también por Palmeiras/Flamengo/Cruzeiro): BRL@2025-12-31 (5,5024) e BRL@2024-12-31
(6,1923).

Gestão: João Paulo Silva, Presidente, assina o balanço dos 2 exercícios (2025 e 2024) — el
documento NO declara fecha de inicio/fin de mandato en ningún lado del texto disponible, así que
NO se agregó entrada a gestionesByClub (club-or-year-onboarding sección 16: ya no es obligatorio
para evitar crash, y el criterio de club-data-mapping sección 7 es "mejor sin gestión asignada
que una inventada").

memberCountByClub: null — 'Programa de Sócio Torcedor' es un programa de INGRESOS (mensalidades),
el documento no publica una cifra total de sócios/associados.

brandColor: '#000000' (preto). Confirmado vía pt.wikipedia.org/wiki/Ceará_Sporting_Club
(2026-09-25): "Os cores oficiais do clube são preto e branco" — desde 1915 (fundado em 1914 como
Rio Branco Football Club, cores roxo e branco; mudou de nome E de cores um ano depois, "devido a
dificuldade de se obter camisas na cor roxa"). Bicolor preto/branco: se aplicó el criterio (d) de
club-or-year-onboarding sección 3 ("si el otro color es blanco, gana el que no es blanco"), mismo
tie-break que ya usaron Estudiantes/Instituto/Unión.
============================================================================
```

_de data/club-leagues/br.js:_

```text
Tanda de 5 clubes brasileños nuevos (onboarding sesión 2026-09-25, tanda de 20 transcripts al
azar: Ceará, Sport Recife, Amazonas, Juventude, Botafogo-SP — este último NO es el Botafogo de
Río, ya cargado como `botafogo`, es la SAF de Ribeirão Preto).
2024 verificado el 2026-09-28 (to-do 104, herramienta ya corregida): Ceará NO aparece en el
roster de "2024 Campeonato Brasileiro Série A" (20 equipos, tools/club-league-reference/
br.json) y SÍ en el de "2024 Campeonato Brasileiro Série B" (28 equipos) -- jugó la B en 2024,
ascendió para 2025.
```

_de data/club-leagues/br.js:_

```text
2025 confirmado (rebaixado a la Série B recién para 2026)
```

## 2025

### Meta

```text
grossDebt = 'Empréstimos e Financiamentos' (Nota 14: circulante 30,232 + não circulante
54,500 = 84,732). cash = 'Caixa e Equivalentes de Caixa' (Nota 3).
netInterest = 'Receitas Financeiras' (1,222) - 'Despesas Financeiras' (37,836), Nota 25.
officialTotalRevenue = 'RECEITA OPERACIONAL LIQUIDA' impresa. officialTotalExpenses =
'CUSTOS E DESPESAS OPERACIONAIS' impresa. officialPAT = 'DÉFICIT DO EXERCÍCIO' impreso
(prejuízo real, com ênfase de continuidade operacional dos auditores — Nota 2.2). Os 3 tiram
EXACTO contra revenueLines/expenseLines/netInterest, ver verificación en el header.
```

## 2024

### Gastos

_antes de la fila 10 (`Despesas programa de Sócio Torcedor + Despesas com Tributos + Outros Resultados Operacionais (combinado, ver nota de extração)`):_

```text
Ver GOTCHA DE EXTRACCIÓN en el comentario de cabecera: Sócio Torcedor + Tributos + Outros
Resultados Operacionais de 2024 no se pudieron desagregar individualmente con certeza por
una corrida de filas en la tabla de Nota 24; esta línea combinada es el residual EXACTO
contra el total impreso de CUSTOS E DESPESAS OPERACIONAIS 2024.
```

### Meta

```text
grossDebt = 'Empréstimos e Financiamentos' (Balanço Patrimonial: circulante 9,775 + não
circulante 37,384 = 47,159 — Nota 14 solo desglosa el detalle por acreedor para 2025, el
total 2024 sale del propio Balanço). cash = 'Caixa e Equivalentes de Caixa' (Nota 3).
netInterest = 'Receitas Financeiras' (0,675) - 'Despesas Financeiras' (19,999), Nota 25.
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-18/resultado-4.json, tools/gestiones-tanda.mjs, 2026-10-18):_

```text
João Paulo Silva (2023-03-29 a hoy): Elegido por el Conselho Deliberativo el 29-03-2023 (179 votos contra 47) para completar el mandato de Robinson de Castro, que renunció el 09-02-2023 (interino: Carlos Moraes, 2º vicepresidente). La Wikipedia (infobox de la temporada 2023) lo da como presidente 'from 29 March' y a Moraes 'until 29 March'; O Povo (https://mais.opovo.com.br/jornal/esportes/2023/03/30/joao-paulo-silva-vence-eleicao-e-assume-presidencia-do-ceara-ate-o-final-de-2024.html) titula 'vence eleição e assume presidência' pero no da fecha de posse formal; el 29-03 coincide con la elección. Reelecto el 28-11-2024 para 2025-2027, sin cambio de persona. Balance 2024: demonstracoes-contabeis-2024.md:306 lo nombra 'Presidente da Executiva João Paulo Silva' en la ata del Conselho Deliberativo que aprobó las cuentas. Balance 2025: demonstracoes-contabeis-2025.md:364-373 lo firma digitalmente como Presidente (sello 2026-05-11). Ninguno de los dos cierres está cerca de un cambio de gestión.
Duda: El día formal de posse en 2023 no figura en prensa; se usa 29-03-2023 (elección, y fecha que da la Wikipedia). Pregunta al club: ¿qué día tomó posse João Paulo Silva? No afecta los cierres 2024/2025.
Duda: Pedido de impeachment de conselheiros (mayo 2026) sin desenlace verificado; se asume que sigue (hasta:null).
```

## Fuentes

### ceara-br-demonstracoes-2025

_note (data/):_

```text
PDF oficial (texto nativo, pdftotext -layout), com comparativo completo 2025 x 2024 no mesmo documento. Auditoria com opinião SEM ressalva mas COM ênfase de incerteza relevante sobre continuidade operacional (Nota 2.2): prejuízo de R$85.836.550,38 em 2025 e passivo circulante excedendo o ativo circulante em R$82.483.756,21. Rebaixamento à Série B do Brasileirão ao final de 2025, após temporada na Série A/Copa do Brasil/Copa do Nordeste. Convertido a USD com PTAX BCB de cierre: 31/12/2025 (R$5,5024) e 31/12/2024 (R$6,1923) — o documento não declara tipo de cambio próprio. Transcrição completa em Clubes/Brasil/Ceara/demonstracoes-contabeis-2025.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### memberCountByClub['ceara-br']

```text
'Programa de Sócio Torcedor' é receita (mensalidades), não há cifra total de sócios publicada
```
