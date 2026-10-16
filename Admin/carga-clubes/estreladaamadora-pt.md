# estreladaamadora-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/estreladaamadora-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Estrela da Amadora: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Estrela da Amadora/relatorio-contas-2022-23.pdf. brandColor #008000
(procedencia en Admin/sourcing/Portugal/Estrela da Amadora.md; tools/cargar-lote.mjs).
```

```text
data/pt/estreladaamadora-pt-data.js — Club Football Estrela, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Estrela da Amadora/relatorio-contas-2022-23.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "estreladaamadora-pt" — slug de "Estrela da Amadora" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Club Football Estrela, SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): relatorio-contas-2023-24.md L58 dic
  displayName        ok        "Estrela da Amadora" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 6); este documento no alcanza solo
  sport              ok        "futbol" — el .md nombra el fútbol 24 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2023-06-30" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 6); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2023-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-06-30 = 0.9203 (Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD))
  sourceId           ok        "estreladaamadora-pt-relatorio-contas-2022-23" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Estrela da Amadora"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-06-30","sourceId":"estreladaamadora-pt-relatorio-contas-2022-23"}
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Estrela da Amadora/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estrela da Amadora/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 6, Jev 0.97 |
| 2 | Subsídios à exploração | pág. 6, Jev 0.98 |
| 3 | Outros rendimentos | pág. 6, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e serviços externos | pág. 6, Jev 1 |
| 2 | Gastos com pessoal | pág. 6, Claude 0.85 |
| 3 | Imparidade de dívidas a receber (perdas/reversões) | pág. 6, Jev 0.98 |
| 4 | Outros gastos | pág. 6, Jev 1 |
| 5 | Gastos/reversões de depreciação e de amortização | pág. 6, Jev 0.93 |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-ligaportugal2, verificado contra roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Estrela da Amadora".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estrela da Amadora/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 7, precedente |
| 2 | IEFP | pág. 20, Jev 0.92 |
| 3 | PT2020 | pág. 20, Claude 0.88 |
| 4 | Subsídios de Outras Entidades | pág. 20, Jev 1 |
| 5 | Rendimentos nos Restantes Ativos Financeiros | pág. 22, Jev 1 |
| 6 | Rendimentos em Investimentos não Financeiros | pág. 22, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 21, Jev 0.99 |
| 2 | Publicidade e propaganda | pág. 21, Jev 1 |
| 3 | Vigilância e segurança | pág. 21, Jev 0.98 |
| 4 | Honorários | pág. 21, Jev 1 |
| 5 | Conservação e reparação | pág. 21, Jev 0.99 |
| 6 | Serviços bancários | pág. 21, Jev 0.98 |
| 7 | Outros | pág. 21, precedente |
| 8 | Ferramentas e utensílios de desgaste rápido | pág. 21, Jev 1 |
| 9 | Material de Escritório | pág. 21, Jev 1 |
| 10 | Vestuário e Fardamento | pág. 21, Jev 0.97 |
| 11 | Outros | pág. 21, precedente |
| 12 | Electricidade | pág. 21, Jev 1 |
| 13 | Combustíveis | pág. 21, Jev 1 |
| 14 | Água | pág. 21, Jev 0.98 |
| 15 | Outros | pág. 21, precedente |
| 16 | Deslocações, estadas e transportes | pág. 21, Jev 1 |
| 17 | Rendas e Alugueres Diferenciadas | pág. 21, precedente |
| 18 | Comunicação | pág. 21, Jev 1 |
| 19 | Seguros | pág. 21, Claude 0.8 |
| 20 | Contencioso e Notariado | pág. 21, Jev 1 |
| 21 | Despesas de representação | pág. 21, Jev 1 |
| 22 | Limpeza, higiene e conforto | pág. 21, Jev 1 |
| 23 | Outros Serviços | pág. 21, Jev 1 |
| 24 | Remunerações dos Órgãos Sociais | pág. 21, Jev 1 |
| 25 | Remunerações do Pessoal | pág. 21, Claude 0.85 |
| 26 | Indemnizações | pág. 21, precedente |
| 27 | Encargos sobre remunerações | pág. 21, Jev 0.98 |
| 28 | Seguro de Acidentes no Trabalho e Doenças I | pág. 21, Jev 1 |
| 29 | Outros Gastos com o Pessoal | pág. 21, precedente |
| 30 | Imparidade de dívidas a receber (perdas/reversões) | pág. 7, precedente |
| 31 | Impostos | pág. 22, Jev 1 |
| 32 | Outros | pág. 22, precedente |
| 33 | Juros de mora e compensatórios | pág. 22, Jev 1 |
| 34 | Juros de acordos | pág. 22, Jev 0.95 |
| 35 | Activos Fixos Tangíveis | pág. 22, Jev 0.99 |
| 36 | Activos Intangíveis | pág. 22, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Estrela da Amadora".
```

## Fuentes

### estreladaamadora-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Estrela da Amadora/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### estreladaamadora-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
