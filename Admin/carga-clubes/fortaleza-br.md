# fortaleza-br — evidencia de carga

Lo que había como comentario en `data/br/fortaleza-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/fortaleza-br-data.js — Fortaleza EC SAF (Sociedade Anônima do Futebol), Fortaleza-CE, Brasil.
1 ejercicio cargado: 2025 (exercício social = AÑO CALENDÁRIO, 1°/1 a 31/12/2025 — mismo criterio
que Botafogo/Atlético Mineiro/isCalendarYearClub()).

Fuente: "Demonstrações contábeis" da Fortaleza EC SAF, exercícios findos em 31/12/2025 e 2024,
auditadas por BDO RCS Auditores Independentes, descargadas de
transparencia.fortaleza1918.com.br/portal-saf/ (portal oficial de transparência da SAF). PDF con
texto nativo, transcripción completa en
Clubes/Brasil/Fortaleza/demonstracoes-contabeis-saf-2025.md. Se cargó SOLO el ejercicio 2025 —
el club tiene DOS entidades con transparencia separada (SAF y associação, ver
Admin/sourcing/Brasil/Fortaleza.md), y esta SAF es la que corresponde al negocio de fútbol. NO se usaron
balancete-anual-saf-2024.md/-2025.md (exports de software contable "Fortes Contábil", sin parecer
de auditor ni notas explicativas — calidad insuficiente, ver Admin/sourcing/Brasil/Fortaleza.md).

COLUMNA ÚNICA, NO HAY CONTROLADORA/CONSOLIDADO QUE ELEGIR (a diferencia de Botafogo/Atlético
Mineiro): la Nota 1 ("Contexto operacional") no menciona ninguna controlada/subsidiária de la SAF
— el balanço patrimonial y la DRE imprimen una sola columna de cifras por año, sin distinción
Controladora/Consolidado. El Fortaleza EC SAF pertenece 100% al Fortaleza Esporte Clube
(associação, accionista controlador), pero es la SAF la entidad standalone que reporta acá, sin
perímetro de consolidación propio que mezclar. Confirmado leyendo la Nota 1 completa antes de
categorizar.

2025 ES EL PRIMER EJERCICICIO COMPLETO: la SAF se constituyó 08/01/2024 (Lei 14.193/2021), y el
balance de 2024 (no cargado, solo aparece como columna comparativa en este documento) cubre un
"stub period" corto (08/01/2024-31/12/2024, ~11,7 meses) — mismo patrón que Atlético Mineiro 2023.
No afecta la carga de 2025, que sí es un ejercicio calendario completo.

INCERTEZA DE CONTINUIDADE OPERACIONAL (párrafo de énfasis del auditor, sin salvedad en la
opinión): la SAF incurrió en prejuízo de R$120.141 mil en 2025 y su passivo circulante excedió el
ativo circulante en R$166.807 mil al cierre — el propio informe de auditoría (BDO) llama la
atención sobre esto (Nota 1.2) sin calificar la opinión. Se documenta en `sources{}`.

ESTRUCTURA REAL DEL DOCUMENTO (para no duplicar plata leyendo el código de abajo): la DRE tiene 2
blocos separados de revenue, no uno solo — Nota 17 "Receita operacional líquida" (276.709, el
cuerpo principal: bilheteria/patrocínios/TV/sócio torcedor/etc., ya neta de deducciones fiscales
tipo INSS/ISS/Direito de arena) y, MÁS ABAJO en la DRE, dentro de "Outras receitas e despesas
operacionais, líquidas" (Nota 20, neto +41.740), un bloque de "Outras receitas operacionais"
(123.927, incluye venta/préstamo de jugadores) contra "Outras despesas operacionais" (-82.187,
incluye 2 bajas contables no recurrentes). Las 2 líneas "Receita bruta de futebol" (290.679) y
"Receita bruta diversas" (12.789) de la Nota 17 son SUBTOTALES de sus propios ítems (ver club-data-mapping/referencia/leer-pdf.md, "fila acumulada") — NO se cargaron como líneas propias, solo sus
componentes, para no duplicar.

CATEGORIZACIÓN (Nota 17, Receita operacional líquida):
- 'Bilheteria' -> matchday_competition; 'Patrocínios'/'Royalties'/'Ativação de marca' ->
  sponsorship_commercial (Royalties = licenciamento de marca, mismo criterio que Botafogo
  'Licenciamento'); 'Transmissão de jogos' -> broadcasting; 'Sócio torcedor' -> member_dues
  (programa de socios-hinchas, mismo criterio que Botafogo 'Camisa 7'/Atlético Mineiro); 'Participação
  e performance' -> competition_bonus (premios por avance/participación en torneos); 'Cessão de
  camarote' -> stadium_other (uso de un palco del estadio, coincide EXACTO con "licitación de
  palcos" de la tabla de category-map.js); 'Luvas' (premio de firma/cesión de derechos, sin
  desglose adicional en el documento) -> other_income (no encaja limpio en ninguna categoría
  específica — ver duda anotada más abajo); 'Timemania' (lotería federal de clubes brasileños) ->
  other_income, mismo criterio que Atlético Mineiro; 'Eventos sociais' -> other_income (eventos no
  futbolísticos, catch-all específico del club).
- 'Deduções sobre a receita' (9 líneas de INSS/ISS/Direito de arena/Earn In/Condomínio LFU/Repasse
  investidor LFU, todas deducciones fiscales/contractuales contra la receita bruta) -> other_income
  (línea negativa, contra-revenue, mismo criterio que Botafogo/Atlético Mineiro "Deduções sobre a
  receita"), cargada como una sola línea con `items` desglosando las 9 sub-líneas para no perder
  trazabilidad (sección 4 de club-data-mapping: mismo `normalizedCategory` en las 9, así que
  bucketizarlas como items de un padre es válido).

CATEGORIZACIÓN (Nota 20, "Outras receitas e despesas operacionais, líquidas"):
- 'Cessão definitiva de atletas'/'Cessão temporária de atletas' -> player_sales; 'Mecanismo de
  solidariedade' (recebido) -> youth_football, mismo criterio que Botafogo; 'Multas rescisórias de
  atletas' (recebida) -> other_income (no es una venta, es una compensación/multa — se prefirió el
  catch-all antes de forzarla a player_sales); 'Recuperação de despesas'/'Doações'/'Reversão de
  PECLD'/'Alienação de imobilizado' (línea chica, 19 mil, no se separó a `assetSales` en
  fiscalYearMeta por su tamaño marginal y porque el documento la mezcla dentro de esta misma Nota
  operativa, no aparte del cuerpo principal como exige la sección 2 del skill para justificar
  sacarla) -> other_income; 'Receita com estacionamento' -> other_income (criterio CONSERVADOR de
  stadium_other: el rótulo no nombra el estadio, y la propia tabla de category-map.js lista
  "estacionamiento" explícitamente como ejemplo de other_income cuando no se puede confirmar que es
  del estadio); 'Outras receitas' -> other_income, AJUSTADA +0,060 M BRL (14,626 impreso -> 14,686
  cargado) para que la suma de items cierre EXACTO contra el subtotal impreso de "Outras receitas
  operacionais" (123,927) — la suma de las 11 líneas tal cual impresas da 123,867, una diferencia de
  0,060 M BRL (0,05% del subtotal) que no se pudo atribuir a ninguna otra línea, mismo tipo de
  typo de redondeo de imprenta ya documentado en atleticomineiro-br-data.js (ver su comentario de
  cabecera, Versión de esa sesión) — se ajustó la línea catch-all en vez de una línea con concepto
  propio identificable.
- 'Provisão para contingências' -> admin_general_expense (litigios, mismo criterio que Atlético
  Mineiro 'Despesas com contingências'); 'Baixa de recebíveis LFU' (a) y 'Baixa de partes
  relacionadas' (b) -> exceptional_items: son bajas contables puntuales y no recurrentes
  explícitamente descritas como tales por el propio documento (nota (a): recompra de derechos
  vendidos en 2023 sobre la Liga Forte União, con el saldo remanente dado de baja; nota (b): baja
  de saldos entre partes relacionadas "espelhando... a expectativa de realização") — no son costo
  operativo del negocio de fútbol del ejercicio; 'Baixa de intangível' -> player_amortisation (la
  Nota 8 confirma que el intangible de la SAF es casi enteramente "Atletas" — derechos federativos
  —, así que una baja de intangible es una derecognición de pase, mismo criterio que Botafogo
  'Baixa de atletas').

CATEGORIZACIÓN (Nota 18, "Custo das atividades sociais e esportivas por natureza", -327.259 M BRL):
costos NO salariales del plantel profesional mezclados en la misma nota que sueldos/primas van
TODOS a wages_squad, mismo criterio "CASO CONSULTADO" de club-data-mapping/referencia/formato-simplificado.md (Racing/Boca
2027/Banfield/Atlético Mineiro): 'Salários, encargos e benefícios'/'Direito de imagem'/'Prêmios e
gratificações'/'Gastos com premiação de atletas'/'Viagens e estadias'/'Outros gastos com atletas'
-> wages_squad. 'Gastos com jogos e competições' -> match_organisation_expense. Costos
transaccionales de negociación de jugadores (NO amortización/deterioro propio, sino comisiones/
pagos ligados a movimientos de plantel) -> other_expenses, mismo criterio que Botafogo/Atlético
Mineiro para este tipo de línea: 'Gastos com atletas emprestados', 'Mecanismo de solidariedade'
(pago), 'Repasses de direitos econômicos', 'Multas rescisórias de atletas' (paga), 'Direito de
preferência em negociações'. 'Custos com regularização de atletas' (documentación/regularización
federativa) -> admin_general_expense. 'Amortização de atletas' -> player_amortisation.
'Provisão para redução do valor recuperável de atletas' -> player_impairment (0 en 2025, la línea
solo tuvo saldo en el ejercicio-stub 2024 no cargado; se incluye en 0 por transparencia/consistencia
de categoría disponible).

CATEGORIZACIÓN (Nota 19, "Despesas administrativas por natureza", -59.478 M BRL): TODAS
admin_general_expense salvo 'Depreciação de imobilizado'/'Amortização de direito de uso de ativo
imobilizado'/'Amortização do intangível' (softwares, Nota 8 "Outros intangíveis") -> depreciation;
'Despesas com jogos e competições' (línea separada de la homónima de Nota 18, clasificada G&A por
el propio documento) -> match_organisation_expense; 'Outros gastos' -> other_expenses (catch-all
propio de la nota).

'Despesas tributárias' (-14.470 M BRL): línea suelta de la DRE, sin nota de detalle propia (no es
IRPJ/CSLL — no aparece ninguna línea de impuesto a las ganancias en la DRE, la SAF arrastra
pérdidas acumuladas) -> admin_general_expense, regla permanente de club-data-mapping/referencia/casos-por-pais-y-formato.md
("Impuestos... SIEMPRE admin_general_expense").

netInterest/tax: 'Resultado financeiro, líquido' (Nota 21: Receitas financeiras 4.888 − Despesas
financeiras -42.271) -> netInterest = -37.383. tax = 0 (no hay línea de IRPJ/CSLL en la DRE).

grossDebt = 'Empréstimos e financiamentos' (Nota 10, circulante 35.966 + não circulante 24.200 =
60.166) — el balance separa esta línea de 'Contas a pagar de transferência de jogadores' (Nota 9,
deuda por pases, no deuda financiera) y de 'Passivos de arrendamentos' (Nota 11, obligación de
leasing del centro de treinamento, no préstamo), mismo criterio de club-data-mapping/referencia/formato-simplificado.md, "grossDebt"
(preferir la línea angosta de deuda financiera real). cash = 'Caixa e equivalentes de caixa' (Nota
4, 4.074).

Escala: documento "Em milhares de Reais" (miles de reales) — acá en MILLONES de BRL nativos (los
dígitos impresos, ej. "92.293", ya son directamente el valor en millones bajo esta reinterpretación,
mismo criterio que Botafogo/Atlético Mineiro).

FX: el documento NO declara un tipo de cambio de cierre propio (se buscó explícitamente "câmbio"/
"moeda estrangeira"/"dólar" en las 38 páginas — la única mención de USD es en la Nota 23 "Eventos
subsequentes", ventas de jugadores post-cierre con cotización BACEN del día de CADA operación en
abril 2026, no del cierre 31/12/2025, así que no aplica como fx del ejercicio). Se usó PTAX BCB de
cierre vía fxRef 'BRL@2025-12-31' (5,5024), ya existente en data/currency-map.js. fxSource:
'market_close'.

VERIFICACIÓN (Node, antes de cargar): revenueLines suma EXACTO 400,636 M BRL (276,709 de Nota 17 +
123,927 de "Outras receitas operacionais" de Nota 20, con el ajuste de +0,060 documentado arriba).
expenseLines suma EXACTO -483,394 M BRL (-327,259 Nota 18 − 59,478 Nota 19 − 14,470 Despesas
tributárias − 82,187 "Outras despesas operacionais" de Nota 20). Revenue + Expenses = -82,758 M BRL
= "Prejuízo antes do resultado financeiro" impreso, EXACTO. + netInterest (-37,383) = -120,141 M
BRL = "Prejuízo do exercício" impreso, EXACTO.

officialTotalExpenses EXCLUYE los 2 ítems 'exceptional_items' (-30,615 − 36,922 = -67,537) — mismo
criterio que Botafogo/Atlético Mineiro: verifyTieOuts()/tools/audit.js comparan "Expenses" contra
gasto ordinario + no-efectivo solamente, exceptional_items no participa de ese check (sí de
officialPAT, vía operatingProfit). Documento imprime -483,394 M BRL de gasto total (incluyendo esos
2 ítems); acá va 415,857 M BRL (483,394 - 67,537) para que cierre contra la fórmula real del motor.

Gestión: NO se encontró ningún título ("Diretor Presidente"/"Presidente"/"Representante Legal") en
las firmas digitales del documento (solo nombres de firmantes, sin cargo) — gestionId queda
'sinconfirmar', sin entrada real en gestionesByClub, mismo criterio que Botafogo (mejor sin gestión
asignada que una inventada, club-data-mapping sección 7).

brandColor: '#FF0000' (rojo). Fortaleza es "Tricolor de Aço" — azul, blanco y rojo (Wikipedia pt,
verificado 2026-09-24: colores adoptados por influencia francesa, presentes en la bandera de
Francia). Sin predominancia declarada explícita en el texto de Wikipedia entre los 3 colores, así
que se pasó a la 2da capa (hex): la plantilla de camiseta de Wikipedia pt (Info/Clube de futebol)
SÍ está completa para el kit titular — corpo1 (torso, el área visualmente dominante de la camiseta)
= #FF0000 (rojo), braço1/calções1 = #0000DD (azul), meias1 = #FFFFFF (blanco). Se usó el color del
CORPO (torso) como criterio de desempate, cae en la familia tricolor confirmada por la capa 1.
============================================================================
```

_de data/club-leagues/br.js:_

```text
descendido al cierre de 2025 (jugó la Série A completa ese año)
```

## 2025

### Meta

```text
grossDebt = 'Empréstimos e financiamentos' (Nota 10, circulante 35.966 + não circulante 24.200).
cash = 'Caixa e equivalentes de caixa' (Nota 4).
netInterest = 'Resultado financeiro, líquido' (Nota 21: Receitas financeiras 4.888 − Despesas
financeiras -42.271).
officialTotalRevenue = suma verificada de revenueLines (400,636 M BRL). officialTotalExpenses =
415,857 M BRL = suma de expenseLines EXCLUYENDO los 2 ítems 'exceptional_items' (-30,615 −
36,922 = -67,537) — mismo criterio que Botafogo/Atlético Mineiro: verifyTieOuts() compara
"Expenses" contra gasto ordinario + no-efectivo solamente, exceptional_items no participa de ese
check (sí de officialPAT, vía operatingProfit). officialPAT = 'Prejuízo do exercício' impreso.
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-18/resultado-1.json, tools/gestiones-tanda.mjs, 2026-10-18):_

```text
Fabiano Barreira (2025-04-15 a 2026-01-15): Portal IN (16-04-2025) dice que fue elegido presidente del Conselho de Administração de la SAF 'na última terça-feira (15)', o sea el 15-04-2025 (el mes sale de inferir con la fecha de la nota). Seguía en el cargo el 28-12-2025: lideró la contratación de Pedro Martins como CEO (Diário do Nordeste/ESPN, 28-12-2025). Hasta = 2026-01-15: fecha de la nota de O Povo que anuncia a Bruno Cals (consejo aprobado el 14-01-2026, 98 votos a favor); NE45 (15-01-2026) dice que Cals sucede a Barreira. La fecha exacta de asunción de Cals no figura, por eso 15 es aproximada. Balance SAF 2025 (Clubes/Brasil/Fortaleza/demonstracoes-contabeis-saf-2025.md): aprobado por la Administración el 31-03-2026 (línea 628) y firmado digitalmente por Pedro Martins Gomes da Silva (CEO, líneas 205, 240, 276) y el contador José Orlando Belchior Ribeiro Filho; no firma el presidente del consejo.
Bruno Cals (2026-01-15 a hoy): Era vicepresidente del Conselho; presidente desde el anuncio del 15-01-2026 (O Povo, NE45). No cubre ningún cierre pedido; se agrega para cerrar el hasta de Barreira.
Duda: El balance 2025 de la SAF lo firma el CEO Pedro Martins (nombrado el 28-12-2025, antes lo era Marcelo Paz hasta el 27-12-2025), no el presidente del consejo. Si Guido prefiere cargar al ejecutivo en vez del presidente del consejo, el cierre 2025-12-31 queda sin fuente que fije el día de asunción de Martins (ninguna dice desde cuándo ejerce formalmente; Diário do Nordeste habla del 03-01-2026).
Duda: Pregunta para el club: ¿desde qué fecha exacta Pedro Martins es CEO de Fortaleza EC SAF y hasta qué fecha lo fue Marcelo Paz?
Duda: La presidencia de la asociación civil (José Rolim Machado, 2025-2027 según la tanda anterior) es distinta de la de la SAF; los balancetes de asociación no se usaron para decidir la gestión.
```

## Fuentes

### fortaleza-br-demonstracoes-saf-2025

_note (data/):_

```text
PDF oficial (texto nativo), descargado del portal de transparência da SAF. Se cargó la SAF (Fortaleza EC SAF), NO la associação (Fortaleza Esporte Clube) — son 2 entidades separadas con transparencia propia, ver Admin/sourcing/Brasil/Fortaleza.md. El documento no tiene columna Controladora/Consolidado (la SAF no tiene subsidiárias propias a diferencia de Botafogo/Atlético Mineiro) — una sola columna de cifras por año. El informe del auditor (BDO) incluye un párrafo de énfasis sobre incerteza de continuidade operacional (prejuízo de R$120,141 M en 2025, passivo circulante excede o ativo circulante en R$166,807 M), sin salvedad en la opinión. Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024), el documento no declara un tipo de cambio propio. NO se cargaron balancete-anual-saf-2024.pdf/-2025.pdf (exports de software contable sin parecer de auditor) ni ningún documento de la associação. Transcripción completa en Clubes/Brasil/Fortaleza/demonstracoes-contabeis-saf-2025.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (bracket notation, clubId con guión — mismo patrón que
banfield-ar/atleticomineiro-br).
```

### gestionesByClub['fortaleza-br']

```text
No se encontró ningún título ("Diretor Presidente"/"Presidente"/"Representante Legal") en las
firmas digitales del documento, solo nombres sin cargo — entrada mínima para que el selector "Por
gestión" no rompa, cubre únicamente el año cargado (mismo criterio que Botafogo).
```

### memberCountByClub['fortaleza-br']

```text
no se encontró una cifra de sócios/sócio torcedor en el documento de la SAF
```

## Gestión 2025 (Pantallas 3, 2026-10-19)

Decisión de Guido (to-do 195): para el cierre 2025 va el CEO de la SAF, Pedro Martins (el balance lo firma él), no el presidente del consejo
(Fabiano Barreira / Bruno Cals, que dejan de cargarse). Desde 2025-12-28: el club confirmó su contratación ese día, un día después de que Marcelo
Paz anunciara su salida a Corinthians (Diário do Nordeste, https://diariodonordeste.verdesmares.com.br/jogada/fortaleza-contrata-pedro-martins-como-novo-ceo-para-substituir-marcelo-paz-1.3722334).
Una nota habla del 2026-01-03 como inicio formal; por eso el año 2025 va también en `firmo`. Pregunta abierta para el club: fecha exacta de asunción.
