# coritiba — evidencia de carga

Lo que había como comentario en `data/coritiba-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/coritiba-data.js — Coritiba Sociedade Anônima do Futebol - SAF
(Curitiba, PR, Brasil). SÍ es SAF, desde julio de 2023: el Patrimônio Líquido
tiene Capital social subscrito (no "Patrimonio Social" de associação) y la DRE
informa "Lucro/(Prejuízo) por ação". Ejercicio social = ANO CALENDÁRIO
(1/1/2024 a 31/12/2024), ver `fiscalYearStart:'01-01'` en data/clubs.js.
2 ejercicios cargados: 2023 y 2024.

FUENTE 2024: `Clubes/Brasil/Coritiba/demonstracoes-financeiras-2024.pdf` (36
páginas, texto nativo, vía pdftotext -layout), firmado por Docusign,
transcripción completa en `demonstracoes-financeiras-2024.md` en la misma
carpeta. Trae Balanços patrimoniais, DRE, resultado abrangente, mutações do PL,
fluxos de caixa y Notas Explicativas 1-28.

FUENTE 2023: `Clubes/Brasil/Coritiba/demonstracoes-contabeis-2022-2023.pdf`
(publicidade legal, Diário Indústria&Comércio, texto nativo vía pdftotext
-layout), transcripción completa en `demonstracoes-contabeis-2022-2023.md`
en la misma carpeta. 2 ejercicios cargados: 2023 y 2024.

SOBRE 2022 (por qué NO se cargó): este documento también trae la columna
comparativa 2022, pero la Coritiba SAF recién se constituyó el 3/2/2022 y
quedó operacional desde el 1/7/2023 (drop-down de la operación desde el
Coritiba Foot Ball Club, la associação). La DRE 2022 de la SAF muestra "-"
(sin dato) en RECEITA OPERACIONAL LÍQUIDA y en CUSTOS OPERACIONAIS: solo
tuvo Administrativas e Marketing (10.359) y Resultado Financeiro (6.022),
con Prejuízo de apenas R$16.381. No es un ejercicio de operación real del
club, es solo la sociedad recién constituida sin actividad — cargar esto
como "revenueLines/expenseLines" de un año mostraría $0 de ingresos para
Coritiba en 2022, que sería engañoso (el club SÍ operó fútbol en 2022, pero
a través del Coritiba Foot Ball Club, cuyos estados contables no son los que
trae este documento). No se cargó ningún ejercicio 2022.

EL EJERCICIO 2023 EN SÍ TAMBIÉN ES UN PERÍODO PARCIAL (jul-dic 2023): la
propia Nota 20 lo aclara ("As receitas operacionais contemplam o período de
julho a dezembro de 2023"), por la misma transferencia de operación del
1/7/2023. Se cargó igual como "Ejercicio 2023" completo (es el único dato
disponible con ese year key, y el propio documento lo presenta como el
resultado del ejercicio social 2023) — la salvedad de período parcial queda
documentada acá y en `sources{}`.

EJERCICIO MUY MALO: PREJUÍZO de R$ 139.402.626 sobre una receita líquida de
R$ 87.002.707 (el club gastó 2,5 veces lo que ingresó), y cerró con PATRIMÔNIO
LÍQUIDO NEGATIVO de R$ (29.915.096). Es, de lejos, el peor ejercicio de
cualquier club cargado en el sitio hasta ahora.

ESCALA: el documento está en reales enteros ("Em Reais"), NO en miles. Acá se
guardan en MILLONES de BRL nativos, cada valor dividido por 1.000.000.

DE DÓNDE SALE CADA LÍNEA (esto importa, no se copió la DRE tal cual):
La DRE presenta los costos del fútbol en 2 líneas por DESTINO ("Futebol
profissional" 86.642.166 y "Futebol das categorias de base" 11.895.914). Esas
2 líneas NO se cargaron: son un bolsón sin categoría real identificable, y
cargarlas así dejaría el bucket "Salarios y primas" de Formato Simplificado en
CERO para Coritiba, que es exactamente el bug que la REGLA de la Versión 38
existe para evitar (ver club-data-mapping SKILL.md sección 1). En su lugar se
cargaron las 9 líneas POR NATUREZA de la Nota 22, que sí tienen cada una una
categoría real (pessoal, direito de imagem, jogos, viagens, etc.). Mismo
criterio con las Despesas administrativas: se cargaron las 13 líneas de la
Nota 23, no la única línea agregada de la DRE.

DISCREPANCIA REAL DE LA FUENTE (documentada, no un error de lectura): la Nota
22 suma 98.539.079 (exacto contra su propio total impreso) mientras que las 2
líneas de la DRE para el MISMO concepto suman 98.538.080. Son R$ 999 de
diferencia sin explicación en el documento. Como acá se cargó el desglose de la
Nota 22, la suma de expenseLines queda R$ 999 (0,000999 M) por encima de la
cascada impresa de la DRE, y el PAT calculado queda en R$ (139.403.626) contra
los R$ (139.402.626) impresos: R$ 1.000 de diferencia, contando también el
redondeo de R$ 1 que la propia DRE ya arrastra. `officialTotalExpenses` y
`officialPAT` guardan los números IMPRESOS por el documento, no los recalculados
— la diferencia (0,001 M) cae dentro de la tolerancia de `verifyTieOuts()`
(0,01 M), así que el check pasa, pero está documentada acá a propósito en vez de
esconderla ajustando alguna línea para que cierre exacto.

Categorización:
- INGRESOS (DRE, RECEITA OPERACIONAL BRUTA): 'Direitos de transmissão de TV' ->
  broadcasting; 'Mensalidades de associados' y 'Patrimoniais' -> member_dues
  (mismo criterio que 'Receitas Patrimoniais' de Grêmio: mensalidad de sócio
  patrimonial); 'Transações de atletas' -> player_sales;
  'Competições/bilheteria' -> matchday_competition; 'Patrocínios/subvenção' y
  'Receitas com vendas de mercadorias' -> sponsorship_commercial (la categoría
  ya incluye merchandising); 'Outras receitas' -> other_income.
- DEDUCCIONES de la receita bruta ('Tributos sobre receitas', 'Taxas
  federativas/direito de arena') -> other_income NEGATIVO: son deducciones
  DENTRO del bloque de ingresos del propio documento, dejarlas acá en negativo
  es lo que hace que revenueLines sume la RECEITA OPERACIONAL LÍQUIDA impresa
  (87.002.707). Mismo criterio que los impostos de Ituano y de Grêmio.
- COSTOS (Nota 22, por natureza): 'Pessoal, benefícios e encargos sociais' y
  'Direito de uso de imagem' -> wages_squad (en Brasil el direito de imagem es
  parte de la remuneración del plantel, no un gasto comercial); 'Despesas com
  Jogos', 'Viagens e estadias', 'Material esportivo' y 'Serviços de terceiros'
  -> match_organisation_expense; 'Gastos com cessão temporária de atletas' ->
  player_amortisation (costo de incorporar jugadores a préstamo: es adquisición
  de plantel, va al bucket "Compra de jugadores", mismo criterio que Racing
  expensando el costo de transferencia completo); 'Impostos e taxas' ->
  admin_general_expense; 'Outros custos' -> other_expenses.
- Resto de CUSTOS OPERACIONAIS de la DRE (no están en la Nota 22): 'Amortização
  de direitos econômicos de atletas' -> player_amortisation; 'Formação de
  atletas' -> youth_other_sports_expense; 'Custos das mercadorias vendidas' ->
  admin_general_expense (mismo criterio que el CMV de Grêmio Mania).
- DESPESAS ADMINISTRATIVAS (Nota 23, 13 líneas) -> admin_general_expense todas.
  Se omitió 'Despesas administrativa com liga forte', que en 2024 está en "-"
  (solo tuvo monto en 2023).
- 'Outras (despesas) receitas operacionais e não operacionais' (Nota 24) ->
  other_expenses. La Nota 24 NO trae tabla, solo un párrafo: dice que son el
  pago de la Recuperação Judicial, parcelamentos de impostos y repasses a la
  Associação que la SAF asumió al comprar el club. Sin desglose disponible, va
  como una sola línea.
- RESULTADO FINANCEIRO LÍQUIDO (Nota 25) -> NO va como línea, va neteado a
  `netInterest` (-4.515.749), como manda SKILL.md sección 2.

grossDebt = 'Empréstimos e financiamentos' circulante (20.854.479) + não
circulante (28.545.521) = 49.400.000, ambos Nota 13. Quedan fuera Fornecedores,
Obrigações trabalhistas/tributárias, Entidades desportivas y Outras obrigações:
son pasivos operativos, no deuda financiera (mismo criterio que Grêmio e
Ituano). cash = 'Caixa e equivalentes de caixa' (Nota 4) = 3.623.921, contra
11.830.912 en 2023.

FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 — misma cotización oficial del
Banco Central do Brasil que ya usan Grêmio, Botafogo, Ituano y Mirassol para ESE
MISMO cierre. El documento no declara tipo de cambio propio.

Gestión: el documento está firmado digitalmente vía Docusign y no identifica a
un presidente en el texto extraíble. No se confirmó ninguna gestión, se cargó
una entrada genérica (SKILL.md sección 7).

---------------------------------------------------------------------------
EJERCICIO 2023 (demonstracoes-contabeis-2022-2023.md) — categorización:

El documento estructura los costos en 2 notas separadas: Nota 21 "Custos
Operacionais do Futebol" (por natureza, 10 líneas) y Nota 22 "Despesas
administrativas e de Marketing" (10 líneas) — DISTINTO de la numeración de
notas del documento 2024 (ahí Nota 22 era personal/costos y Nota 23 era
administrativas). Mismo criterio de fondo: fútbol -> categoría de fútbol,
administrativo -> admin_general_expense, salvo Impuestos/Tasas que SIEMPRE
van a admin_general_expense sin importar el sector (club-data-mapping/referencia/casos-por-pais-y-formato.md),
igual que ya se hizo con las 2 líneas "Impostos e taxas (futebol/
administrativo)" del ejercicio 2024.

- INGRESOS (Nota 20, Receitas Operacionais Brutas): mismo mapeo que 2024
  línea por línea ('Direitos de Transmissão de TV'->broadcasting,
  'Mensalidades de Sócios' y 'Patrimoniais'->member_dues, 'Transações de
  Atletas'->player_sales, 'Competições/Bilheteria'->matchday_competition,
  'Patrocínios/Subvenção' y 'Venda de Mercadorias'->sponsorship_commercial,
  'Outras Receitas'->other_income). Deducciones ('Tributos sobre Receitas',
  'Taxas Federativas e Direito de Arena') -> other_income NEGATIVO, mismo
  criterio que 2024: hace que revenueLines sume la RECEITA OPERACIONAL
  LÍQUIDA impresa (64.616.238).
- CUSTOS OPERACIONAIS DO FUTEBOL (Nota 21, por natureza): 'Pessoal,
  Benefícios e Encargos sociais' y 'Direito de Uso de Imagem' ->
  wages_squad; 'Despesas com Jogos', 'Serviços de Terceiros', 'Viagens e
  Estadias', 'Material Esportivo' y 'Energia Elétrica, Gás, Água e
  Telefonia' (esta última SOLO en su versión "futebol" de esta nota, la
  versión "administrativo" de la Nota 22 va a admin_general_expense) ->
  match_organisation_expense; 'Gastos com Cessão Temporária de Atletas' ->
  player_amortisation; 'Impostos e Taxas' -> admin_general_expense (regla
  fija, club-data-mapping/referencia/casos-por-pais-y-formato.md); 'Outros Custos' -> other_expenses.
- RESTO DE CUSTOS OPERACIONAIS (fuera de la Nota 21, forman parte del
  subtotal impreso "(92.413.676)" junto con Futebol Profissional +
  Categorias de Base): 'Custos das Mercadorias Vendidas' ->
  admin_general_expense (mismo criterio que 2024); 'Amortização de Direitos
  Econômicos de Atletas' -> player_amortisation (mismo criterio que 2024);
  'Formação de Atletas' es un CRÉDITO/reversão (293.017, impreso SIN
  paréntesis, reduce el total de costos en vez de sumarle) -> se cargó como
  línea `youth_other_sports_expense` con amountNative POSITIVO (+0.293017),
  simétrico al criterio ya usado del lado de Ingresos para las deducciones
  negativas de la Nota 20.
- DESPESAS ADMINISTRATIVAS E DE MARKETING (Nota 22, 10 líneas) ->
  admin_general_expense todas (incluida 'Impostos e Taxas' administrativo,
  regla fija, club-data-mapping/referencia/casos-por-pais-y-formato.md).
- OUTRAS (DESPESAS)/RECEITAS OPERACIONAIS (Nota 23): a diferencia de 2024
  (una sola línea agregada `other_expenses`), acá el propio texto de la
  Nota SÍ desglosa 2 montos exactos: una RECEITA de R$159.180.000 líquida
  de la provisión TEF de R$7.145.600 (= R$152.034.400) por ceder el 20% de
  los derechos comerciales del Campeonato Brasileiro a LCP vía la Liga
  Forte União (cesión de 2025 a 2074, 50 años) — Nota 26 da el detalle
  completo —, y una DESPESA de R$65.872.826 por pagos para saldar deudas
  viejas del Coritiba Foot Ball Club (recuperación judicial, parcelamentos
  tributarios, empréstimos). 152.034.400 - 65.872.826 = 86.161.574, exacto
  contra la línea neta impresa en la DRE. Se cargaron LAS 2 por separado (no
  una sola neta) para no perder la información real del desglose: la
  receita -> other_income (+152.034400), la despesa -> other_expenses
  (-65.872826).
- RESULTADO FINANCEIRO LÍQUIDO (Nota 24) -> NO va como línea, neteado a
  `netInterest` (-0.359721): Receitas Financeiras 2.472189 - Despesas
  Financeiras 2.831910.

grossDebt 2023 = 0: el documento NO tiene ninguna nota de "Empréstimos e
financiamentos" (a diferencia de 2024, Nota 13) — el Passivo circulante +
não circulante de 2023 solo trae Fornecedores/Obrigações trabalhistas y
tributárias/Entidades Desportivas/Outras obrigações/Receitas a apropriar,
ningún préstamo financiero. cash = 'Caixa e equivalentes de caixa' (Nota 4)
= 11.830.912.

FX 2023: BRL/USD PTAX de cierre, boletín del 29/12/2023 (4,8413, último día
hábil de 2023) — ya está en FX_CLOSE (data/currency-map.js), se referencia
con fxRef, el documento no declara tipo de cambio propio.

VERIFICACIÓN (tie-out): revenueLines suma 216.650638 (Nota 20 líquida
64.616238 + la receita de la Nota 23, 152.034400). expenseLines suma
181.599149 en valor absoluto (CUSTOS OPERACIONAIS 92.413676 + Despesas
Administrativas 23.312648 + la despesa de la Nota 23, 65.872826, con un
redondeo de R$1 heredado del propio documento). 216.650638 - 181.599149 -
0.359721 (netInterest) = 34.691768, contra el LUCRO DO EXERCÍCIO impreso de
34.691767 — diferencia de R$1, dentro de la tolerancia de verifyTieOuts()
(0,01 M) y documentada, no ajustada a mano.

PERÍODO PARCIAL: los resultados de 2023 corresponden solo a jul-dic 2023
(ver nota arriba, "SOBRE 2022"), no a un año calendario completo — la Nota
20 lo aclara explícitamente. officialTotalRevenue/officialTotalExpenses/
officialPAT reflejan igual los montos IMPRESOS por el documento para "o
exercício 2023", que es lo que el propio Coritiba SAF declara como su
resultado del ejercicio.

Gestión 2023: mismo caso que 2024 (documento firmado sin identificar
presidente en el texto extraíble), se extendió el rango de la entrada
genérica `sinconfirmar` para cubrir 2023-2024.
---------------------------------------------------------------------------
============================================================================
```

_de data/club-leagues/br.js:_

```text
2023 (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar): jugó la Série A completa
2023, descendido recién al cierre de esa temporada (confirmado por prensa: Gazeta Esportiva/
Banda B, derrota vs. Fluminense 25/11/2023).
```

_de data/club-leagues/br.js:_

```text
descendido de la Série A 2023
```

## 2024

### Meta

```text
grossDebt = Empréstimos e financiamentos circulante (20.854479) + não
circulante (28.545521), ambos Nota 13. cash = Caixa e equivalentes (Nota 4).
netInterest = RESULTADO FINANCEIRO LÍQUIDO (Nota 25): receitas financeiras
4.791274 - despesas financeiras 9.307023.
Los 3 campos guardan los números IMPRESOS por el documento, no los que da
sumar las líneas cargadas (ver la discrepancia de R$ 999 entre la Nota 22 y
la DRE, explicada en el comentario de cabecera). officialTotalRevenue =
RECEITA OPERACIONAL LÍQUIDA; officialTotalExpenses = CUSTOS OPERACIONAIS
(122.392.722) + (DESPESAS) RECEITAS OPERACIONAIS (99.496.862);
officialPAT = LUCRO/(PREJUÍZO) DO EXERCÍCIO.
```

## 2023

### Meta

```text
grossDebt = 0: el documento no tiene nota de Empréstimos e financiamentos
para 2023 (a diferencia de 2024). cash = Caixa e equivalentes (Nota 4).
netInterest = RESULTADO FINANCEIRO LÍQUIDO (Nota 24): receitas financeiras
2.472189 - despesas financeiras 2.831910.
officialTotalRevenue = RECEITA OPERACIONAL LÍQUIDA (Nota 20, 64.616238) +
la receita de la Nota 23 (152.034400) = 216.650638. officialTotalExpenses
= CUSTOS OPERACIONAIS (92.413676) + Administrativas e Marketing
(23.312648) + la despesa de la Nota 23 (65.872826) = 181.599150.
officialPAT = LUCRO DO EXERCÍCIO impreso. Ver comentario de cabecera para
el detalle completo del tie-out (diferencia de R$1 vs. la suma propia,
dentro de tolerancia).
```

## Fuentes

### coritiba-demonstracoes-2022-2023

_note (data/):_

```text
Publicação legal en el Diário Indústria&Comércio (12-14/4/2024, texto nativo) con Balanços patrimoniais, DRE, resultado abrangente, mutações do PL, fluxos de caixa y Notas Explicativas 1-27 de la Coritiba SAF. Se cargó el ejercicio 2023 (Lucro de R$34.691.767 sobre uma receita líquida de R$64.616.238). NO se cargó 2022: la SAF recién se constituyó el 3/2/2022 y quedó operacional desde el 1/7/2023 (la DRE 2022 muestra "-" en ingresos y costos operacionais, solo Prejuízo de R$16.381 de una sociedad sin actividad todavía). El ejercicio 2023 en sí es también un período PARCIAL (jul-dic 2023, aclarado explícitamente por la propia Nota 20), por la transferencia de operación del Coritiba Foot Ball Club a la SAF. Los costos se cargaron desde la Nota 21 "Custos Operacionais do Futebol" (por natureza) y la Nota 22 "Despesas administrativas e de Marketing" (distinta numeración de notas que el documento 2024). La Nota 23 ("Outras despesas/receitas operacionais") se desglosó en 2 líneas reales (receita de R$152.034.400 por ceder el 20% de los derechos comerciales del Campeonato Brasileiro a LCP vía la Liga Forte União, y despesa de R$65.872.826 por saldar deudas viejas del Coritiba Foot Ball Club) en vez de cargarla neta como una sola línea. grossDebt = 0 (sin nota de Empréstimos e financiamentos en este documento). Convertido a USD con el PTAX BCB de cierre del 29/12/2023 (R$4,8413). Transcripción completa en Clubes/Brasil/Coritiba/demonstracoes-contabeis-2022-2023.md.
```

### coritiba-demonstracoes-2024

_note (data/):_

```text
PDF oficial (36 páginas, texto nativo, firmado por Docusign) con Balanços patrimoniais, DRE, mutações do PL, fluxos de caixa y Notas Explicativas 1-28. Coritiba ES SAF desde julio de 2023. Ejercicio 2024 con PREJUÍZO de R$ 139.402.626 sobre una receita líquida de R$ 87.002.707, y patrimônio líquido NEGATIVO de R$ (29.915.096) al cierre. Los costos del fútbol se cargaron desde el desglose POR NATUREZA de la Nota 22 (9 líneas con categoría real) y no desde las 2 líneas por destino de la DRE, que son un bolsón sin categoría. OJO: la Nota 22 suma R$ 999 más que esas 2 líneas de la DRE para el mismo concepto, una inconsistencia real del documento, documentada en data/coritiba-data.js y en la transcripción. grossDebt = las 2 líneas de Empréstimos e financiamentos (Nota 13). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Coritiba/demonstracoes-financeiras-2024.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.coritiba

```text
Los 2 documentos (2023 y 2024) están firmados/publicados sin identificar
presidente en el texto extraíble.
```

### memberCountByClub.coritiba

```text
no se encontró una cifra confiable en esta sesión
```
