# amazonas-br — evidencia de carga

Lo que había como comentario en `data/br/amazonas-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/amazonas-br-data.js — Amazonas FC, Manaus, Brasil (CNPJ 34.639.980/0001-99).
clubId 'amazonas-br' (CON GUIÓN, bracket notation en clubs{}/CLUB_GENERIC_DATA/
gestionesByClub/memberCountByClub, mismo criterio que el resto de los clubes de Brasil).

1 ejercicio cargado: 2024 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 —
carátula "BALANÇO EM 31/12/2024", sin columna comparativa de 2023). Fuente:
Clubes/Brasil/Amazonas/balanco-patrimonial-2024.pdf ("Balanço Patrimonial em
31/12/2024" + Demonstração do Resultado do Exercício + Análise Econômico-Financeira),
firmado digitalmente por el Diretor Presidente (Francisco Weslley Couto dos Santos) y
la Contadora (Neida Maria de Oliveira Farias, CRC-AM 013501/O-0) — NO trae un
"Relatório dos Auditores Independentes" como Botafogo-SP/Juventude, así que es el
balance PROPIO del club, no uno con auditoría externa. OJO: existe OTRO archivo del
mismo club en la misma carpeta, `balancos-2022-2023.md`, que es el excluido por mala
calidad de OCR (NO es este documento, que es texto nativo vía `pdftotext -layout`,
confirmado legible al 100%). Transcripción completa en
Clubes/Brasil/Amazonas/balanco-patrimonial-2024.md.

Escala: valores originales "Em Reais" (reais completos, sin "em milhares") — acá en
MILLONES de BRL nativos (dividir por 1.000.000).

ESTRUCTURA REAL DEL DOCUMENTO: es un balance MUY agregado (una sola página con Ativo /
Passivo / DRE lado a lado), sin notas explicativas ni anexos de desglose — a
diferencia de Botafogo-SP/Juventude/Palmeiras (que tienen Demonstrações Financeiras
completas con notas numeradas), acá la DRE entera son 7 líneas. Se cargó tal cual: sin
desglose de ingresos por rubro (todo "Receita de Atividades Esportivas" en una sola
línea) y con solo 4 categorías de gasto operativo. Esto ES una tabla real de
Receitas/Despesas del ejercicio anual completo (no una Memoria narrativa ni un período
intermedio) — cumple el criterio para cargar, solo que con disclosureLevel:'aggregate'
en vez de 'detailed'.

Categorización:
- 'Receita de Atividades Esportivas' (única línea de ingreso, sin ningún desglose
  disponible en ningún lado del documento) -> lump_football_operations (club-data-mapping
  sección 1: es exactamente el caso "el club de verdad no separa el rubro", no hay
  ninguna nota ni anexo que permita partirlo en member_dues/broadcasting/sponsorship/etc.).
- 'Custo das atividades Esportivas' (línea de costo directo, tampoco desglosada: podría
  incluir sueldos de plantel, costos de competencia, todo junto) -> lump_football_operations_expense,
  mismo criterio que la línea de ingreso.
- 'Despesas Administrativas' -> admin_general_expense.
- 'Despesas Comerciais' -> admin_general_expense (category-map.js incluye "comerciales"
  explícitamente en la descripción de esta categoría).
- 'Despesas Tributárias' -> admin_general_expense (club-data-mapping/referencia/casos-por-pais-y-formato.md: impuestos
  SIEMPRE admin_general_expense).
- 'Outras Despesas Operacionais' (R$601,56, marginal) -> other_expenses.
- 'Receitas Financeiras' (R$16,99) − 'Despesas Financeiras' (R$14.036,03) = netInterest,
  NUNCA como línea (club-data-mapping sección 2).

DUDA para Admin/dudas-por-club.md (no se pudo resolver sin más disclosure): el documento
no tiene NINGUNA nota que permita separar 'Receita de Atividades Esportivas' en cuotas
sociales/TV/sponsors/entradas, ni 'Custo das atividades Esportivas' en sueldos/pases/
organización de partidos — preguntarle al club si existe una versão con notas
explicativas (nota fiscal detallada) que sí desglose estos 2 números.

VERIFICACIÓN (a mano, antes de cargar):
revenueLines (1 línea) = 36,055764,60 M BRL = 'Receita de Atividades Esportivas' impreso,
EXACTO. expenseLines (4 líneas) suman 39,42349092 M BRL = 33,06579984 (custo) +
2,54805502 (administrativas) + 2,85553898 (comerciais) + 0,95349552 (tributárias) +
0,00060156 (outras) = EXACTO. 'LUCRO BRUTO' impreso (2,989964,76) = revenue - custo =
36,05576460 - 33,06579984 = 2,98996476 M BRL, EXACTO. 'DÉFICIT OPERACIONAL' impreso
(-3.367.726,32) = 2,98996476 - 2,54805502 - 2,85553898 - 0,95349552 - 0,00060156 =
-3,36772632 M BRL, EXACTO. + netInterest (0,01699 - 0,01403603 = -0,01401904) =
-3,38174536 M BRL = 'DÉFICITS LÍQUIDO DO PERÍODO' impreso (-3.381.745,36), EXACTO.

grossDebt = 'Empréstimos e Financiamentos' (circulante R$0 + não circulante R$923.007,50,
única línea de deuda financiera propiamente dicha del Passivo, separada de Fornecedores/
Encargos e Obrigações Sociais/Provisões Fiscais, mismo criterio que club-data-mapping/referencia/formato-simplificado.md, "grossDebt"). cash = 'Disponibilidades' (R$127.598,33).

FX: el documento no declara su propio tipo de cambio de cierre (no tiene Anexo de moneda
extranjera) — PTAX de cierre BCB, referenciado a FX_CLOSE (BRL@2024-12-31, ya existía
antes de esta sesión).

Gestión: no se pudo confirmar con confianza el período de mandato del Diretor Presidente
(Francisco Weslley Couto dos Santos) — gestionId:null, sin entrada en gestionesByClub
(club-or-year-onboarding sección 16: ya no es obligatorio inventar una entrada
sintética).

memberCountByClub: null — no se encontró ninguna cifra de sócios/associados en el
documento (es un balance de una sociedade/associação esportiva sin sección de socios
visible en esta única página).

brandColor: '#FFDD00' — amarelo, del template de kit de la infobox de pt.wikipedia.org
(corpo1:FFDD00), consistente con la identidad "Aurinegro Amazonense" (amarelo/preto)
confirmada por búsqueda. Verificado 2026-09-25.
============================================================================
```

_de data/club-leagues/br.js:_

```text
ascendido campeón de la Série C 2023
```

## 2024

### Meta

```text
grossDebt = 'Empréstimos e Financiamentos' (circulante 0 + não circulante 0,923007,50).
cash = 'Disponibilidades'.
netInterest = 'Receitas Financeiras' (0,00001699) - 'Despesas Financeiras' (0,01403603).
officialTotalRevenue = revenueLines (36,05576460 M BRL) = 'Receita de Atividades
Esportivas' impreso, EXACTO. officialTotalExpenses = suma expenseLines (39,42349092 M
BRL), EXACTO contra los 5 conceptos impresos. officialPAT = 'Déficits líquido do
período' impreso (-3,38174536 M BRL / R$-3.381.745,36), EXACTO.
```

## Fuentes

### amazonas-br-balanco-2024

_note (data/):_

```text
PDF oficial (texto nativo, extraído con pdftotext -layout), firmado digitalmente por el Diretor Presidente y la Contadora (CRC-AM 013501/O-0). Recuperado vía Wayback Machine: el dominio amazonasfc.com.br no resuelve desde 2026-09-22 (ver Admin/sourcing/Brasil/Amazonas.md), pero la página de transparencia quedó archivada (snapshot 22/04/2026) y linkeaba este PDF. Documento MUY agregado: una sola página con Ativo/Passivo/DRE, sin notas explicativas ni anexos de desglose, y SIN un relatório de auditores independentes (a diferencia de Botafogo-SP/Juventude/Palmeiras). OJO: Admin/sourcing/Brasil/Amazonas.md (chequeo 2026-09-22) decía que con estos documentos "se puede armar el balance pero no un estado de resultados" — ESO NO ES CIERTO para balanco-patrimonial-2024.pdf específicamente, que SÍ trae una DRE completa de 7 líneas que reconcilia exacto (puede referirse solo a balancos-2022-2023.pdf, el otro archivo del club, excluido de esta carga por mala calidad de OCR); corregir esa nota en una sesión futura. Déficit real de R$3.381.745,36. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Amazonas/balanco-patrimonial-2024.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### memberCountByClub['amazonas-br']

```text
no se encontró cifra de sócios/associados en el documento
```
