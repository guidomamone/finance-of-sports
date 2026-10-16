# avai-br — evidencia de carga

Lo que había como comentario en `data/br/avai-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/avai-br-data.js — Avaí Futebol Clube (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Avai/demonstracoes-contabeis-2021.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "avai-br" — slug de "Avai" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Avaí Futebol Clube" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "Avai" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (71 de 72 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 69 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (71 de 72 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): una sola entidad (associação civil); las menci
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
  sourceId           ok        "avai-br-demonstracoes-contabeis-2021" — clubId + nombre del archivo en slug
  liga               ok        "br-serieB" — roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Avaí"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"avai-br-demonstracoes-contabeis-2021"}
============================================================================
```

_de data/clubs.js:_

```text
Avai: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2021.pdf. brandColor #0040CF
(procedencia en Admin/sourcing/Brasil/Avai.md, club-or-year-onboarding/club-nuevo.md).
```

_de data/club-leagues/br.js:_

```text
Avai (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Avaí".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Avai/demonstracoes-contabeis-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arrendamentos | pág. 33, Claude 0.8 |
| 2 | Bilheteria | pág. 33, Jev 1 |
| 3 | Cota TV e transmissão jogos | pág. 33, Jev 1 |
| 4 | Mensalidades dos Sócios | pág. 33, Jev 1 |
| 5 | Patrocínios | pág. 33, Jev 1 |
| 6 | Participações em competições | pág. 33, Jev 0.99 |
| 7 | Publicidades | pág. 33, Jev 1 |
| 8 | Receitas de locações | pág. 33, Claude 0.8 |
| 9 | Repasses da Loteria Timemania | pág. 33, Jev 1 |
| 10 | Venda de Material Esportivo | pág. 33, Jev 0.99 |
| 11 | Venda e uso da Marca | pág. 33, Jev 1 |
| 12 | (-) Deduções da Receita operacional | pág. 33, Jev 0.99 |
| 13 | OUTRAS RECEITAS OPERACIONAIS | pág. 7, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários | pág. 34, Claude 0.9 |
| 2 | Direito de uso de imagem | pág. 34, Jev 0.99 |
| 3 | Auxílio moradia | pág. 34, precedente |
| 4 | Férias | pág. 34, Claude 0.9 |
| 5 | Amortização | pág. 34, Claude 0.8 |
| 6 | Rescisões | pág. 34, precedente |
| 7 | Premiação por desempenho | pág. 34, Claude 0.85 |
| 8 | FGTS | pág. 34, Claude 0.9 |
| 9 | Honorários profissionais | pág. 34, Jev 0.92 |
| 10 | Comissões de negociação de atletas | pág. 34, Jev 0.98 |
| 11 | INSS | pág. 34, Claude 0.85 |
| 12 | Empréstimos de jogadores | pág. 34, precedente |
| 13 | Viagens | pág. 34, Claude 0.85 |
| 14 | Bônus contratuais | pág. 34, Jev 0.98 |
| 15 | 13 Salário | pág. 34, Claude 0.9 |
| 16 | Direitos econômicos profissionais | pág. 34, precedente |
| 17 | Borderô de jogos | pág. 34, Jev 0.91 |
| 18 | Outros custos profissionais | pág. 34, precedente |
| 19 | Taxa de registro de atletas | pág. 34, precedente |
| 20 | Material esportivo | pág. 34, precedente |
| 21 | Hospedagens | pág. 34, Claude 0.85 |
| 22 | Luvas | pág. 34, Claude 0.85 |
| 23 | Ajuda de custo | pág. 34, Claude 0.8 |
| 24 | Alimentação | pág. 34, precedente |
| 25 | Pis sobre folha | pág. 34, Jev 0.9 |
| 26 | Concentração | pág. 34, Jev 1 |
| 27 | Comissões sobre vendas | pág. 34, Jev 1 |
| 28 | Gratificações | pág. 34, Jev 0.98 |
| 29 | Software e consultorias | pág. 34, Jev 0.96 |
| 30 | Futebol feminino | pág. 34, Jev 0.99 |
| 31 | Esportes Olímpicos | pág. 34, Jev 0.95 |
| 32 | Outros Custos | pág. 34, Jev 0.97 |
| 33 | 13 Salário | pág. 35, Claude 0.9 |
| 34 | Ajuda de custo | pág. 35, Claude 0.8 |
| 35 | Alimentação | pág. 35, precedente |
| 36 | Aluguéis de campos | pág. 35, Claude 0.85 |
| 37 | Auxílio moradia | pág. 35, precedente |
| 38 | Comissão em negociações de atletas | pág. 35, Jev 0.96 |
| 39 | Direito de imagem | pág. 35, Jev 0.9 |
| 40 | Empréstimos de jogadores | pág. 35, precedente |
| 41 | Férias | pág. 35, Claude 0.9 |
| 42 | FGTS | pág. 35, Claude 0.9 |
| 43 | Honorários profissionais | pág. 35, Jev 0.92 |
| 44 | Hospedagens | pág. 35, Claude 0.85 |
| 45 | Impostos e taxas | pág. 35, Jev 0.96 |
| 46 | INSS | pág. 35, Claude 0.85 |
| 47 | Material de consumo | pág. 35, Claude 0.85 |
| 48 | Material esportivo | pág. 35, precedente |
| 49 | Material médico | pág. 35, Claude 0.85 |
| 50 | Outros custos categoria de formação (Base) | pág. 35, Jev 0.91 |
| 51 | Pis sobre folha | pág. 35, Jev 0.9 |
| 52 | Rescisões | pág. 35, precedente |
| 53 | Salários | pág. 35, Claude 0.9 |
| 54 | Serviços de terceiros | pág. 35, Claude 0.85 |
| 55 | Taxas de registro de atletas | pág. 35, Claude 0.8 |
| 56 | Transporte | pág. 35, Claude 0.85 |
| 57 | Viagens | pág. 35, Claude 0.85 |
| 58 | Administrativas | pág. 36, Jev 1 |
| 59 | Alimentação | pág. 36, precedente |
| 60 | Comercialização | pág. 36, Jev 0.99 |
| 61 | Comunicação | pág. 36, Jev 0.99 |
| 62 | Depreciação/Amortização | pág. 36, Jev 0.97 |
| 63 | Infraestrutura | pág. 36, Jev 0.98 |
| 64 | Logística de eventos | pág. 36, precedente |
| 65 | Marketing | pág. 36, Jev 1 |
| 66 | Negócios | pág. 36, Jev 0.98 |
| 67 | Plano de Saúde | pág. 36, Jev 0.94 |
| 68 | Seguros | pág. 36, Jev 0.94 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento anterior): "CAIXA E EQUIVALENTES DE CAIXA" pág. 5
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Avai/demonstracoes-contabeis-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mensalidades dos Sócios | pág. 36, precedente |
| 2 | Bilheteria | pág. 36, precedente |
| 3 | Arrendamentos, Patrocínios e Publicidades | pág. 36, Claude 0.8 |
| 4 | TV e transmissão jogos | pág. 36, Jev 1 |
| 5 | Repasses da Loteria Timemania | pág. 36, precedente |
| 6 | Venda de Material Esportivo | pág. 36, precedente |
| 7 | Venda e uso da Marca | pág. 36, precedente |
| 8 | Receitas de locações | pág. 36, precedente |
| 9 | Participações em competições | pág. 36, precedente |
| 10 | (-) deduções das receitas | pág. 36, Jev 0.99 |
| 11 | Receita LFU | pág. 9, ? 0.6 |
| 12 | Receceita negociação Atletas Profissionais | pág. 9, Jev 1 |
| 13 | Deságio Recuperação Judicial | pág. 9, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários e Encargos Sociais | pág. 37, Claude 0.9 |
| 2 | Direito de Uso de Imagem | pág. 37, precedente |
| 3 | Empréstimo de Jogadores | pág. 37, precedente |
| 4 | Premiações por Desempenho | pág. 37, Jev 1 |
| 5 | Registro de Atletas | pág. 37, Claude 0.8 |
| 6 | Amortização | pág. 37, precedente |
| 7 | Honorários Profissionais PJ | pág. 37, Jev 1 |
| 8 | Alimentação/Plano de saúde e seguro | pág. 37, precedente |
| 9 | Serviço de Terceiros | pág. 37, precedente |
| 10 | Comissões em negociação de atletas | pág. 37, precedente |
| 11 | Aluguel campo | pág. 37, Jev 0.91 |
| 12 | Luvas | pág. 37, precedente |
| 13 | Viagens/hospedagens/Transportes | pág. 37, Jev 1 |
| 14 | Atletas dispensados | pág. 37, Claude 0.8 |
| 15 | Material esportivo e outros | pág. 37, Jev 1 |
| 16 | Softwares e consultoria | pág. 37, precedente |
| 17 | Outros custos futebol Profissional | pág. 37, Claude 0.85 |
| 18 | Futebol Feminino | pág. 37, precedente |
| 19 | Espostes Olimpicos | pág. 37, precedente |
| 20 | Ajuda de custo | pág. 37, precedente |
| 21 | Alimentação | pág. 37, precedente |
| 22 | Alugueis de Campos | pág. 37, precedente |
| 23 | Arbitragem de Jogos | pág. 37, Jev 0.99 |
| 24 | Competições Esportivas | pág. 37, precedente |
| 25 | Plano e saúde | pág. 37, precedente |
| 26 | Honorários Profissionais PJ | pág. 37, Jev 1 |
| 27 | Material de uso e Consumo | pág. 37, Claude 0.8 |
| 28 | Material Esportivo | pág. 37, precedente |
| 29 | Material Médico | pág. 37, precedente |
| 30 | Registro de Atletas | pág. 37, Claude 0.8 |
| 31 | Salários e Encargos Sociais | pág. 37, Claude 0.9 |
| 32 | Serviço de Terceiros | pág. 37, precedente |
| 33 | Viagens e Hospedagens | pág. 37, precedente |
| 34 | Alimentação/Plano de saúde/Seguros | pág. 38, precedente |
| 35 | Aluguéis | pág. 38, precedente |
| 36 | Assessoria de comunicação | pág. 38, Jev 1 |
| 37 | Depreciação | pág. 38, Jev 1 |
| 38 | Energia Elétrica | pág. 38, Jev 1 |
| 39 | Eventos | pág. 38, precedente |
| 40 | Taxas/Bordero | pág. 38, precedente |
| 41 | Manutenção de Equipamentos | pág. 38, Jev 0.92 |
| 42 | Manutenção e conservação do Estádio | pág. 38, Jev 1 |
| 43 | Material de consumo | pág. 38, Jev 0.93 |
| 44 | Material esportivo | pág. 38, precedente |
| 45 | Propaganda e publicidade | pág. 38, Jev 1 |
| 46 | Repasse Bares | pág. 38, precedente |
| 47 | Softwares e consultorias | pág. 38, precedente |
| 48 | Telefone e Internet | pág. 38, Jev 1 |
| 49 | Salários e Encargos | pág. 38, Claude 0.9 |
| 50 | Marketing/licenciamento | pág. 38, Jev 0.98 |
| 51 | Honorários Profissionais PJ | pág. 38, Jev 1 |
| 52 | Serviços de terceiros | pág. 38, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Empréstimos e financiamentos" pág. 8; cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 8
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Avai/demonstracoes-contabeis-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mensalidades dos Sócios | pág. 26, precedente |
| 2 | Bilheteria | pág. 26, precedente |
| 3 | Direitos econômicos/Mecanismo de solidariedade (i) | pág. 26, Jev 0.98 |
| 4 | Empréstimo de jogadores | pág. 26, Jev 1 |
| 5 | Arrendamentos, Patrocínios e Publicidades | pág. 26, Claude 0.8 |
| 6 | TV e transmissão jogos | pág. 26, Jev 1 |
| 7 | Repasses da Loteria Timemania | pág. 26, precedente |
| 8 | Venda de Material Esportivo | pág. 26, precedente |
| 9 | Venda e uso Marca | pág. 26, Jev 1 |
| 10 | Receitas Diversas | pág. 26, Jev 1 |
| 11 | Outras receitas operacionais (ii) | pág. 26, precedente |
| 12 | Receitas não operacionais | pág. 26, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários e Encargos | pág. 28, Claude 0.8 |
| 2 | Ajuda de Custo | pág. 28, precedente |
| 3 | Viagens e Hospedagem | pág. 28, Jev 0.95 |
| 4 | INSS s/ Receitas | pág. 28, precedente |
| 5 | Aluguel e manutenção dos campos | pág. 28, precedente |
| 6 | Consultoria Esportiva | pág. 28, Jev 0.99 |
| 7 | Honorários Profissionais | pág. 28, precedente |
| 8 | Arbitragem/Federação | pág. 28, Jev 1 |
| 9 | Amortização Custo Atletas Profissionais | pág. 28, Jev 1 |
| 10 | Seguros/Plano de Saúde | pág. 28, Claude 0.8 |
| 11 | Direito de Uso de Imagem | pág. 28, precedente |
| 12 | Material Esportivo/Material Médico | pág. 28, precedente |
| 13 | Borderoux de Jogos | pág. 28, Jev 0.96 |
| 14 | Taxa de Policiamento | pág. 28, Jev 0.99 |
| 15 | Softwares e Consultorias | pág. 28, precedente |
| 16 | Alimentação | pág. 28, precedente |
| 17 | Premiações | pág. 28, Jev 0.9 |
| 18 | Direito de Arena | pág. 28, Jev 1 |
| 19 | Empréstimos de Atletas | pág. 28, Claude 0.8 |
| 20 | Intermediação e Negociação de Atletas | pág. 28, Jev 0.98 |
| 21 | Materiais e serviços diversos | pág. 28, precedente |
| 22 | Manutenção, conservação e reformas | pág. 28, Jev 0.9 |
| 23 | Futebol Feminino | pág. 28, precedente |
| 24 | Custo com atletas dispensados | pág. 28, precedente |
| 25 | (-) Transferência para o Intangível | pág. 28, precedente |
| 26 | Alimentação/Plano de saúde/Seguros | pág. 29, precedente |
| 27 | Aluguéis | pág. 29, precedente |
| 28 | Assessoria e comunicação | pág. 29, Jev 1 |
| 29 | CMV/ICMS | pág. 29, Jev 1 |
| 30 | Demais despesas | pág. 29, precedente |
| 31 | Depreciação | pág. 29, Jev 1 |
| 32 | Energia Elétrica | pág. 29, Jev 1 |
| 33 | Eventos | pág. 29, precedente |
| 34 | Impostos e taxas | pág. 29, Jev 1 |
| 35 | Manutenção de Equipamentos | pág. 29, Jev 0.92 |
| 36 | Manutenção e conservação do Estádio | pág. 29, Jev 1 |
| 37 | Material de consumo | pág. 29, Jev 0.93 |
| 38 | Propaganda e publicidade | pág. 29, Jev 1 |
| 39 | Provisões para contingências | pág. 29, Jev 0.99 |
| 40 | Repasse Bares | pág. 29, precedente |
| 41 | Softwares e consultorias | pág. 29, precedente |
| 42 | Telefone e Internet | pág. 29, Jev 1 |
| 43 | Salários e Encargos | pág. 29, Claude 0.8 |
| 44 | Atualização Dívida PGFN (i) | pág. 29, precedente |
| 45 | Serviços de terceiros + Honorários profissionais | pág. 29, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Empréstimos e financiamentos" pág. 3
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Avai/demonstracoes-contabeis-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita líquida das atividades | pág. 28, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários e Encargos | pág. 49, Claude 0.8 |
| 2 | Ajuda de Custo | pág. 49, precedente |
| 3 | Viagens e Hospedagem | pág. 49, Jev 0.95 |
| 4 | INSS s/ Receitas | pág. 49, precedente |
| 5 | Aluguel e manutenção dos campos | pág. 49, precedente |
| 6 | Serviços de Terceiros | pág. 49, precedente |
| 7 | Arbitragem/ Federação e Confederação | pág. 49, Jev 1 |
| 8 | Amortização Custo Atletas Profissionais | pág. 49, Jev 1 |
| 9 | Seguros/ Plano de Saúde | pág. 49, Jev 0.96 |
| 10 | Direito de Uso de Imagem | pág. 49, precedente |
| 11 | Material Esportivo - Patrocínio | pág. 49, precedente |
| 12 | Borderoux de Jogos | pág. 49, Jev 0.96 |
| 13 | Taxa de Policiamento | pág. 49, Jev 0.99 |
| 14 | Despesas com jogo | pág. 49, Jev 0.99 |
| 15 | Alimentação | pág. 49, precedente |
| 16 | Premiação Campeonatos | pág. 49, Jev 0.97 |
| 17 | Direito de Arena | pág. 49, Jev 1 |
| 18 | Empréstimos de Atletas | pág. 49, Claude 0.8 |
| 19 | Intermediação e Negociação de Atletas | pág. 49, Jev 0.98 |
| 20 | Materiais e serviços diversos | pág. 49, precedente |
| 21 | Manutenção, conservação e reformas | pág. 49, Jev 0.9 |
| 22 | Perda com atletas dispensados | pág. 49, precedente |
| 23 | Alimentação | pág. 50, precedente |
| 24 | Aluguéis | pág. 50, precedente |
| 25 | Comunicação | pág. 50, precedente |
| 26 | Energia Elétrica | pág. 50, Jev 1 |
| 27 | Impostos e Taxas | pág. 50, Jev 1 |
| 28 | Outras despesas | pág. 50, precedente |
| 29 | PCLD | pág. 50, precedente |
| 30 | Plano de Saúde | pág. 50, precedente |
| 31 | Provisão para Contingência | pág. 50, Jev 0.99 |
| 32 | Salários e Encargos | pág. 50, Claude 0.8 |
| 33 | Seguros | pág. 50, precedente |
| 34 | Serviços de Terceiros | pág. 50, precedente |
| 35 | Softwares e Consultoria de TI | pág. 50, Jev 1 |
| 36 | Telefone e Internet | pág. 50, Jev 1 |
| 37 | Viagens e Hospedagens | pág. 50, precedente |
| 38 | Outras receitas (despesas) operacionais | pág. 28, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2023, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Televisión
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Empréstimos e financiamentos" pág. 27; cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 27
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Avai/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de Mensalidades dos Sócios | pág. 4, Jev 1 |
| 2 | Receitas de Negociação de Atletas Profissionais | pág. 4, Jev 1 |
| 3 | Receitas Arrendaments, Patrocínios e Publicidades | pág. 4, Jev 0.96 |
| 4 | Receitas de Repasses da Loteria Timemania | pág. 4, Jev 0.99 |
| 5 | Receitas de Venda e uso Marca | pág. 4, Jev 1 |
| 6 | Receitas TV e transmissão jogos | pág. 4, Jev 1 |
| 7 | Receitas Diversas | pág. 4, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custos Futebol Profissional | pág. 4, precedente |
| 2 | Custos Futebol Feminino | pág. 4, Jev 1 |
| 3 | Custos Esportes Olímpicos | pág. 4, Jev 1 |
| 4 | Administrativas | pág. 4, Jev 1 |
| 5 | Depreciação e Amortização do Imobilizado | pág. 4, Jev 1 |
| 6 | Materiais e despesas diversas | pág. 4, precedente |
| 7 | CMV e Icms | pág. 4, precedente |
| 8 | Futebol Amador (Custos - Transferência) | pág. 4, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Claude 2026-10-09: subtotal impreso que se sumaba ademas de sus componentes (ingresos 75,9M y gastos 167,3M en vez de 25,3M y 53,1M). Se saca y quedan sus componentes. Cuenta completa del estado (L121-148): ingresos 25.303.151 - custo bruto 43.772.256 = -18.469.105 (L140); -18.469.105 - despesas operacionais 15.142.893 - Avai Store 855.694 = -34.467.692 (L148, impreso).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 2.064.896. Claude 2026-10-09: 'Futebol Amador (Custos - Transferência)' 2.064.896 (L137) es el subtotal de Custos do Futebol Categoria de Base 7.805.604 (L138) menos Transferência para o Imobilizado (5.740.708) (L139): 7.805.604 - 5.740.708 = 2.064.896. La transferencia RESTA y no se puede cargar negativa dentro de gastos, asi que se carga el neto de L137 y salen L138 y L139. Custo bruto: 41.707.360 + 2.064.896 = 43.772.256 (L131).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Claude 2026-10-09: 'Futebol Amador (Custos - Transferência)' 2.064.896 (L137) es el subtotal de Custos do Futebol Categoria de Base 7.805.604 (L138) menos Transferência para o Imobilizado (5.740.708) (L139): 7.805.604 - 5.740.708 = 2.064.896. La transferencia RESTA y no se puede cargar negativa dentro de gastos, asi que se carga el neto de L137 y salen L138 y L139. Custo bruto: 41.707.360 + 2.064.896 = 43.772.256 (L131).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 27.397. Claude 2026-10-09: financiero con su signo: Receita Financeira +27.397 (L130), despesas financeiras deságio (3.995.456) (L134, dentro de los 41.707.360 de Custos Futebol Profissional total: 37.345.703 + 3.995.456 + 354.097 + 12.103 = 41.707.359) y Despesas Financeiras (2.690.087) (L144). Neto -6.658.146. Cierre: ingresos 25.275.754 (25.303.151 - 27.397) - gastos 53.085.300 (43.772.256 - 3.995.456 + 12.192.491 + 260.315 + 855.694) - 6.658.146 = -34.467.692.
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = (3.995.456). Claude 2026-10-09: financiero con su signo: Receita Financeira +27.397 (L130), despesas financeiras deságio (3.995.456) (L134, dentro de los 41.707.360 de Custos Futebol Profissional total: 37.345.703 + 3.995.456 + 354.097 + 12.103 = 41.707.359) y Despesas Financeiras (2.690.087) (L144). Neto -6.658.146. Cierre: ingresos 25.275.754 (25.303.151 - 27.397) - gastos 53.085.300 (43.772.256 - 3.995.456 + 12.192.491 + 260.315 + 855.694) - 6.658.146 = -34.467.692.
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = (2.690.087). Claude 2026-10-09: financiero con su signo: Receita Financeira +27.397 (L130), despesas financeiras deságio (3.995.456) (L134, dentro de los 41.707.360 de Custos Futebol Profissional total: 37.345.703 + 3.995.456 + 354.097 + 12.103 = 41.707.359) y Despesas Financeiras (2.690.087) (L144). Neto -6.658.146. Cierre: ingresos 25.275.754 (25.303.151 - 27.397) - gastos 53.085.300 (43.772.256 - 3.995.456 + 12.192.491 + 260.315 + 855.694) - 6.658.146 = -34.467.692.
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2023, 2024, 2025): Compra de jugadores, Salarios y primas (plantel y cuerpo técnico), Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 2
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Francisco José Battistotti (2016-04-16 a 2022-01-01): Wikipedia pt (lista de presidentes): 16/04/2016, tras la renuncia de Nilton Macedo Machado el 15/04/2016; NSC Total confirma 'abril de 2016'. Su mandato terminó el 31/12/2021.
Júlio César Heerdt (2022-01-01 a 2026-01-01): Elegido el 04/12/2021; posse el sábado 01/01/2022 en el auditorio de Ressacada (NSC Total). Mandato de cuatro años; terminó el 31/12/2025 (ND Mais). Hasta 2026-01-01 por convención del proyecto.
Bernardo Pessi (2026-01-01 a hoy): Elegido el domingo 09/11/2025 (920 votos contra 841); mandato 01/01/2026 a 31/12/2029 (ND Mais, Futebol na Web).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### avai-br-demonstracoes-contabeis-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### avai-br-demonstracoes-contabeis-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### avai-br-demonstracoes-contabeis-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### avai-br-demonstracoes-contabeis-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### avai-br-demonstracoes-contabeis-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
