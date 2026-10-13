# americamineiro-br — evidencia de carga

Lo que había como comentario en `data/americamineiro-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/americamineiro-br-data.js — América Futebol Clube (AFC), Belo Horizonte-MG, Brasil.
3 ejercicios cargados: 2023, 2024, 2025 (año calendario completo, 1°/1 a 31/12,
fiscalYearStart:'01-01', mismo criterio que Botafogo/Grêmio).

Fuente: "Relatório Anual de Demonstrações" (Demonstrações Contábeis) do América Futebol Clube,
auditado por RSM Brasil Auditores Independentes, un documento por ejercicio, descargado del portal
de transparencia oficial (americafc.com.br/transparencia, links reales bajo
irp.cdn-website.com/05448cb5/files/uploaded/ — ver Admin/sourcing/Brasil/America Mineiro.md). PDF con
texto nativo (pdftotext funciona), no son escaneos. Transcripción completa en
Clubes/Brasil/America Mineiro/demonstracoes-financeiras-<año>.md.

ESTRUCTURA REAL DEL DOCUMENTO — DOS ENTIDADES, DOS COLUMNAS (distinto de Botafogo):
El AFC (associação civil sem fins lucrativos, "Clube") es dueño 100% de una SAF ("América
Futebol Clube Sociedade Anônima do Futebol"), creada a fines de 2021. Cada balance imprime 2
columnas: "Controladora" (el AFC solo, standalone) y "Consolidado" (AFC + SAF combinados). A
DIFERENCIA de Botafogo (donde "Controladora" ERA la SAF, el negocio de fútbol, y se usó esa
columna), acá es al revés: "Controladora" es la asociación social (multideportiva, sin la
mayoría del negocio de fútbol profesional, que se fue migrando a la SAF desde su creación — Nota
6 de 2023: "Até o final do ano de 2024 todos os contratos serão migrados para a SAF"), y
"Consolidado" es la que INCLUYE a la SAF. Se cargó CONSOLIDADO en los 3 ejercicios: es la columna
que refleja el negocio de fútbol completo (revenue Consolidado es 3x-4x más grande que
Controladora, y la Nota "Divulgação adicional do resultado" de cada año desglosa Consolidado por
segmento Futebol profissional/Futebol de base/Futebol feminino/Outros) — mismo criterio de fondo
que Botafogo ("usar la entidad que es el negocio de fútbol"), aplicado a la columna que en ESTE
club cumple ese rol.

AÑO CORRIENTE, NUNCA LA COMPARATIVA DE UN BALANCE POSTERIOR (club-data-mapping sección 6.5):
el balance 2024 REEXPRESA su columna comparativa "2023" ("Reapresentado") con Receita
operacional líquida de R$126.569.809, muy distinta de los R$187.876.760 que el balance 2023
(ese mismo ejercicio, su propio año corriente) imprime — la diferencia (R$61,3 M) es
básicamente la receita de "transferência de atletas" que en 2024 se reclasificó fuera de
"Receita operacional líquida". Se cargaron los 3 ejercicios SIEMPRE desde el balance CUYO año
corriente es ese año (2023 del balance 2023, 2024 del balance 2024, 2025 del balance 2025),
nunca de la comparativa de un balance posterior.

"OUTRAS RECEITAS OPERACIONAIS" — ítem grande, no auditable a nivel de detalle desde acá, ver
dudas-por-club.md: los 3 balances muestran, además del cuerpo normal de "Receita operacional
líquida" (Nota 19/20 según el año), un ítem GRANDE y separado ("Outras receitas e despesas
operacionais" en 2024 DRE, neto +R$46,78 M; "Outras receitas operacionais" en Nota 19 de 2025,
bruto +R$31,75 M) que NO se desglosa en ningún lado del documento en sub-ítems identificables.
Coincide en magnitud con la caída de "Receitas com transferência/negociação de atletas" fuera
del cuerpo principal (ver párrafo anterior) y con menciones a la Liga Forte União — LFU (contrato
de inversión 2023 sobre "Direitos de Participação": Direitos de Arena + Propriedades Comerciais,
con instrumentos financeiros derivados asociados, Nota 7/eventos subsequentes 2024) — pero el
documento no lo confirma explícitamente. Se cargó como línea propia `other_income` en los 3 años
(no se fuerza a `player_sales` sin evidencia directa). Para 2023 no aplica (el balance 2023
original, antes de la reexpresión, no tiene esta línea — su receita de transferência de atletas
SÍ está completa y explícita en el cuerpo principal, ver abajo). Para 2024, el propio balance
2024 NO desglosa esta línea en su Nota 20 (revenue); el valor bruto (R$55.214.774) sale de la
comparativa "2024" que SÍ imprime el balance 2025 en su propia Nota 19 (más granular que el
balance 2024 en este punto puntual) — cross-check: 55.214.774 - 8.438.770 (Outras despesas
operacionais, itemizada en la Nota 21 del balance 2024) = 46.776.004 ≈ 46.776.005 (neto DRE
2024, exacto salvo redondeo). Para 2025, el propio balance 2025 SÍ trae el desglose bruto
(Nota 19: +31.745.464) y su contraparte de gasto (Nota 20: Outras despesas operacionais,
-1.630.411) por separado.

TRANSCRIPCIÓN 2025 CON TABLAS PARCIALMENTE DESALINEADAS: el PDF de 2025 tiene texto nativo (no
es un escaneo), pero `pdftotext -layout` perdió el rawLabel de texto de varias filas en las
Notas 19/20 (números sueltos sin su etiqueta en la misma línea, ver el .md fuente). Se
reconstruyeron los labels por ORDEN (idéntico al de los balances 2023/2024, mismo documento
tipo) y se confirmó cada uno sumando contra el subtotal impreso de "Receita operacional" (exacto,
ver verificación abajo) — no quedó ningún número sin asignar a una fila con sentido.

LA FILA "DEPRECIAÇÕES E AMORTIZAÇÕES" SOLO SE PUDO DESAGREGAR EN 2023 (player_amortisation vs.
depreciation), NO en 2024/2025: en el balance 2023, la Demonstração do Fluxo de Caixa (Nota
"Ajustes ao Déficit do exercício") desglosa el ítem combinado de la Nota 20 (-R$15.841.579,
Consolidado) en sus 3 componentes reales — Depreciação imobilizado (R$1.442.105) + Amortização
de propriedades para investimento (R$7.195.216) + Amortização de atletas profissionais
(R$7.204.257) — que suman EXACTO el total combinado, así que se cargó desagregado:
`player_amortisation` (Amortização de atletas) + `depreciation` (los otros 2, ambos son D&A de
propiedad/inmuebles, no del plantel). En 2024, el mismo cruce con el flujo de caja NO cierra
limpio (el flujo de caja de 2024 trae 3 ítems que suman R$9,26 M mientras la Nota 21 solo imprime
-R$5.431.895 para "Depreciações e amortizações") — hay de por medio un ajuste puntual de 2024,
"Ajuste intangível adequação NBC ITG 2003" (-R$9.720.361, en Mutações do Patrimônio Social, que
coincide con el saldo de cierre 2023 de "Atletas em formação"), que da la baja de ese intangible
directo contra el patrimonio, no por el resultado — probablemente rompe la correspondencia 1:1
entre el flujo de caja y la Nota 21 para este año puntual. Se optó por NO forzar una
desagregación que no cierra: la línea 2024/2025 quedó completa en `depreciation` (o, en 2025, sin
línea propia — no aparece desagregada en la Nota 20 de ese año, ver abajo). Documentado como duda
en Admin/dudas-por-club.md.

CATEGORIZACIÓN (misma lógica en los 3 años, según qué desglose trae cada Nota 20 puntual):
- 'Receitas de transmissão e de imagem e desempenho' -> `broadcasting`: título compuesto
  (transmissão = TV/derechos de transmisión, confirmado por la Nota 14/15 de "Receitas a
  Realizar" que detalla un contrato de "Direitos de transmissão" con la Liga Forte Futebol; "de
  imagem e desempenho" no se pudo separar de la parte de TV, el documento no lo desglosa en
  ningún año) — se usó `broadcasting` por ser el término dominante del título y no existir una
  categoría combinada mejor. Duda genuina, anotada en dudas-por-club.md.
- 'Receitas de patrocínios, publicidade, luva e marketing' -> `sponsorship_commercial` (sponsors +
  publicidad + "luva"/bono de firma + marketing, mapeo directo).
- 'Receitas com transferência de atletas' (2023) / 'Receitas com negociações de atletas'
  (2024/2025, mismo concepto, texto reformulado) -> `player_sales`.
- 'Receitas de bilheteria' -> `matchday_competition`.
- 'Receitas com atividades sociais da entidade' -> `other_income`: no queda claro si es cuota de
  socios (`member_dues`) o ingreso de eventos/actividades sociales genéricas — el rótulo no dice
  "sócios"/mensalidade explícitamente, así que se usó el catch-all conservador. Duda anotada.
- 'Outras Receitas (Comerciais e Aluguéis)' (2023) / 'Receitas (Comerciais e aluguéis)'
  (2024/2025) -> `other_income`: título mixto (comercial + alquileres) sin desglose que permita
  separar, mismo criterio conservador de club-data-mapping sección 1 para líneas mixtas
  irreparables (un "Aluguéis" genérico no confirma que sea el estadio, así que tampoco entra a
  `stadium_other`).
- '(-) Deduções da receita bruta (impostos, INSS e Sindicato Atletas)' -> `other_income` (línea
  negativa, contra-revenue, mismo criterio que Botafogo "Deduções sobre a receita").
- 'Outras receitas operacionais' (2024/2025) -> `other_income` (ver nota grande arriba).
- 'Despesas com futebol (Salários, imagem e encargos)' / 'Despesas com Futebol' (2025) ->
  `wages_squad` (sueldos + derechos de imagen + cargas sociales del plantel/fútbol, mismo
  criterio que Botafogo).
- 'Despesas Desportivas' -> `match_organisation_expense` (costos deportivos/de competencia sin
  más desglose disponible en ningún año — viajes, logística, organización).
- 'Transporte/viagens' -> `match_organisation_expense` (mismo bucket que Despesas Desportivas).
- 'Salários, encargos e benefícios (demais funcionários)' -> `admin_general_expense` (personal
  FUERA del plantel de fútbol — administración/otras áreas).
- 'Impostos, taxas e contribuições' -> `admin_general_expense` (regla ya establecida en
  club-data-mapping/referencia/casos-por-pais-y-formato.md: impuestos siempre acá).
- 'Serviços prestados para terceiros' -> `admin_general_expense`.
- 'Demais despesas gerais e administrativas' -> `admin_general_expense`.
- 'Despesas administrativas' (línea única combinada, 2025 — el balance 2025 no desagrega
  servicios/demais gastos/depreciação por separado como sí hacían 2023/2024) -> `admin_general_expense`.
- 'Depreciações e amortizações' (2024, combinada, no desagregable — ver nota arriba) -> `depreciation`.
- 'Apropriação despesas intangível' (2023, único año con valor ≠0, CRÉDITO +R$11.493.091 dentro
  de Despesas Administrativas) -> `player_amortisation`: coincide casi exacto con la ADICIÓN 2023
  de "Atletas em formação" en la Nota 10 (R$11.549.785, diferencia de 0,5%) — es la contrapartida
  de capitalizar costos de formación de juveniles que se habían expensado, reclasificándolos al
  intangible. Mismo patrón que club-data-mapping/referencia/leer-pdf.md describe para Vélez 2015 (un crédito
  de reclasificación más grande que la amortización real del año, "nonCash" neto positivo) — no
  es un error, es un patrón ya documentado.
- 'Outras despesas operacionais' (2024/2025) -> `other_expenses`.

grossDebt = "Empréstimos e financiamentos"/"Empréstimos a pagar" (Nota 11 en 2023/2024, Nota 10
en 2025), Consolidado, deuda financiera circulante+não circulante — línea específica que el
balance separa de "Obrigações trabalhistas"/"Obrigações tributárias"/etc., mismo criterio que
Boca/Vélez (club-data-mapping/referencia/formato-simplificado.md, "grossDebt": preferir la línea angosta cuando el balance la
separa). cash = "Caixa e equivalentes de caixa" (Nota 4), Consolidado.

FX: el documento NO declara un tipo de cambio propio en ningún año (no hay Anexo de moeda
estrangeira con cotización de cierre — se buscó explícitamente "cotação"/"câmbio"/"dólar" en los
3 documentos, solo aparecen menciones de riesgo cambiario genérico sobre transferencias de
jugadores, sin cifra). Se usó PTAX BCB de cierre (venda) de cada 31/12:
- 2023: fxRef 'BRL@2023-12-31' — TODAVÍA NO EXISTE en data/currency-map.js, hay que agregarlo
  (ver reporte de esta sesión). Investigado vía API oficial del Banco Central
  (olinda.bcb.gov.br/olinda/servico/PTAX), PTAX venda del 29/12/2023 (último día hábil del año;
  30 y 31/12/2023 cayeron sábado y domingo): R$4,8413.
- 2024: fxRef 'BRL@2024-12-31' (ya existe en currency-map.js, R$6,1923).
- 2025: fxRef 'BRL@2025-12-31' (ya existe en currency-map.js, R$5,5024).
fxSource: 'market_close' en los 3 años (ninguno declarado por el documento).

Escala: documento "expressos em reais" (reales completos, NO milhares) en los 3 años — acá
divididos por 1.000.000 para guardar en MILLONES de BRL nativos (criterio CLAUDE.md para reales
completos, mismo que Envigado con pesos colombianos completos).

VERIFICACIÓN (Node, antes de cargar) — Consolidado, columna año corriente de cada balance:
- 2023: revenueLines suma EXACTO 187,876760 M BRL (= Receita operacional líquida impresa,
  187.876.760). expenseLines suma EXACTO -196,767023 M BRL (≈ -196.767.024 impreso, redondeo de
  1 real). Revenue + Expenses + netInterest(-13,244308) = -22,134570 M BRL ≈ Superávit(Déficit)
  impreso (-22.134.572/-22.134.573, dif. de centavos por redondeo en cascada del propio balance).
- 2024: revenueLines (incluye "Outras receitas operacionais" cross-referenciada) suma EXACTO
  104,248007 M BRL ≈ 104.248.006 impreso (Receita operacional 49.033.232 + Outras receitas
  operacionais 55.214.774, ver nota arriba). expenseLines suma EXACTO -152,812497 M BRL ≈
  -152.812.496 impreso. Revenue + Expenses + netInterest(-9,875294) = -58,439784 M BRL ≈
  Superávit(Déficit) impreso (-58.439.785).
- 2025: revenueLines suma EXACTO 71,810838 M BRL ≈ 71.810.839 impreso (Receita operacional
  40.065.375 + Outras receitas operacionais 31.745.464). expenseLines suma EXACTO -125,653755 M
  BRL ≈ -125.653.754 impreso. Revenue + Expenses + netInterest(-6,511643) = -60,354560 M BRL ≈
  Superávit(Déficit) impreso (-60.354.558). OJO: la propia página de DRE del balance 2025 (pág.
  10 del PDF) imprime "Resultado operacional antes do resultado financeiro" = -58.842.916, que NO
  reconcilia con el resto del documento (ni con la Nota 23 "Divulgação adicional", que suma por
  segmento a -53.842.916, ni con el Superávit final -60.354.558 si se le suma el resultado
  financeiro -6.511.643). Se usó -53.842.916 (Revenue+Expenses de la propia Nota 19+20, EXACTO
  igual al total de la Nota 23 por segmento, y que sí reconcilia con el Superávit final) — todo
  indica un typo de imprenta/transcripción en esa única celda de la página 10 (un "58" en vez de
  "53"), no un error de carga. Ver duda en dudas-por-club.md.
============================================================================
```

_de data/clubs.js:_

```text
3 clubes nuevos (Versión 217, onboarding en paralelo de 10 PDF transcriptos pendientes): mismo
motor genérico, mismo país/moneda que los de arriba. `brandColor:null` en 2 de los 3 no es
ausencia: se investigó y quedó ambiguo (bicolor sin predominancia clara declarada por ninguna
fuente) — ver `Admin/sourcing/Brasil/<Club>.md` para el detalle de cada investigación.
```

_de data/club-leagues/br.js:_

```text
Verificado el 2026-09-24 (onboarding, Versión 217) contra Wikipedia en inglés (temporadas 2023,
2024 y 2025 de cada club). Ejercicio = año calendario, coincide con la temporada.
```

_de data/club-leagues/br.js:_

```text
descendido de la Série A al cierre de 2023
```

## 2025

### Meta

```text
Versión 509: el sitio muestra "Incluido en …" en la fila de socios en vez de $0. "Receitas com atividades sociais da entidade" puede incluir las cuotas de socios; el documento no lo separa.
netInterest = "Resultado financeiro líquido" (Nota 21), Consolidado. Ver comentario de
cabecera sobre el typo de "Resultado operacional antes do resultado financeiro" impreso en
la pág. 10 del PDF 2025 (-58.842.916), que no se usó por no reconciliar con el resto del
propio documento.
```

## 2024

### Meta

```text
Versión 509: el sitio muestra "Incluido en …" en la fila de socios en vez de $0. "Receitas com atividades sociais da entidade" puede incluir las cuotas de socios; el documento no lo separa.
netInterest = "Resultado financeiro líquido" (Nota 22), Consolidado.
```

## 2023

### Meta

```text
Versión 509: el sitio muestra "Incluido en …" en la fila de socios en vez de $0. "Receitas com atividades sociais da entidade" puede incluir las cuotas de socios; el documento no lo separa.
grossDebt = "Empréstimos e financiamentos" (Nota 11), Consolidado, circulante+não circulante.
cash = "Caixa e equivalentes de caixa" (Nota 4), Consolidado.
netInterest = "Resultado financeiro líquido" (Nota 21), Consolidado.
```

## Fuentes

### americamineiro-br-demonstracoes-2023

_note (data/):_

```text
PDF oficial (texto nativo), descargado del portal de transparencia oficial del club (americafc.com.br/transparencia). Se cargó la columna CONSOLIDADO (AFC + SAF, el negocio de fútbol completo), no la Controladora (el AFC social solo). Transcripción completa en Clubes/Brasil/America Mineiro/demonstracoes-financeiras-2023.md. Tipo de cambio de cierre 31/12/2023 (R$4,8413, PTAX venda BCB) investigado externamente vía API oficial del Banco Central, el documento no declara uno propio.
```

### americamineiro-br-demonstracoes-2024

_note (data/):_

```text
PDF oficial (texto nativo). Columna CONSOLIDADO. El balance 2024 reexpresa (Reapresentado) su comparativo 2023 con criterios distintos al balance 2023 original (ver comentario de cabecera del archivo de datos) — NO se usó esa comparativa, se cargó 2023 desde su propio balance. La línea "Outras receitas operacionais" (R$55,2 M) no se desagrega en el balance 2024 mismo; su valor bruto sale del comparativo que sí imprime el balance 2025 (Nota 19). Transcripción completa en Clubes/Brasil/America Mineiro/demonstracoes-financeiras-2024.md. Tipo de cambio de cierre 31/12/2024 (R$6,1923, PTAX BCB), ya existente en data/currency-map.js.
```

### americamineiro-br-demonstracoes-2025

_note (data/):_

```text
PDF oficial (texto nativo). Columna CONSOLIDADO. La portada del PDF dice "2025" pero el encabezado del sumário quedó con "2024" (typo de maqueta del propio documento, el ejercicio real ES 2025 — confirmado por las fechas del cuerpo). Las tablas de las Notas 19/20 salieron con varias filas sin rawLabel en la transcripción pdftotext -layout (números sueltos); se reconstruyeron los labels por orden, idéntico al de 2023/2024, y se confirmó sumando contra el subtotal impreso. La página 10 del PDF imprime un "Resultado operacional antes do resultado financeiro" que no reconcilia con el resto del propio documento (ver comentario de cabecera) — se usó el valor que sí reconcilia (derivado de las Notas 19/20 y confirmado por la Nota 23, segmento por segmento). Transcripción completa en Clubes/Brasil/America Mineiro/demonstracoes-financeiras-2025.md. Tipo de cambio de cierre 31/12/2025 (R$5,5024, PTAX BCB), ya existente en data/currency-map.js.
```

## Otros

### gestionesByClub['americamineiro-br']

```text
No se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién preside
el AFC/la SAF en cada uno de los 3 ejercicios (el balance 2023 nombra a Alencar Magalhães da
Silveira Junior como "Presidente do Conselho de Administração", pero no hay confirmación de que
sea el mismo cargo/persona en 2024 y 2025) — entrada genérica, mismo criterio que Botafogo.
```
