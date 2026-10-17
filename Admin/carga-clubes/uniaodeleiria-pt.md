# uniaodeleiria-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/uniaodeleiria-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
União de Leiria: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2023-2024.pdf. brandColor #D71920
(procedencia en Admin/sourcing/Portugal/União de Leiria.md; tools/cargar-lote.mjs).
```

```text
data/pt/uniaodeleiria-pt-data.js — União de Leiria- Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2023-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "uniaodeleiria-pt" — slug de "União de Leiria" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "União de Leiria- Futebol, SAD" — la portada y lo más frecuente del .md coinciden (23 veces)
  displayName        ok        "União de Leiria" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (59 de 63 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 33 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (59 de 63 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "uniaodeleiria-pt-relatorio-contas-udl-sad-2023-2024" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "União de Leiria"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"uniaodeleiria-pt-relatorio-contas-udl-sad-2023-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 19, Jev 1 |
| 2 | Prestação de serviços | pág. 19, precedente |
| 3 | Subsídios do estado e outros entes públicas | pág. 19, Jev 0.99 |
| 4 | Subsídios de outras entidades | pág. 19, Jev 1 |
| 5 | Rendimentos suplementares | pág. 21, Jev 1 |
| 6 | Outros rendimentos e ganhos | pág. 21, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 3, Jev 0.96 |
| 2 | Subcontratos | pág. 20, Jev 0.97 |
| 3 | Serviços especializados | pág. 20, Jev 0.96 |
| 4 | Materiais | pág. 20, precedente |
| 5 | Energia e fluídos | pág. 20, Jev 1 |
| 6 | Deslocações e estadas | pág. 20, Jev 1 |
| 7 | Rendas e alugueres | pág. 20, precedente |
| 8 | Serviços diversos (*) | pág. 20, Jev 0.95 |
| 9 | Remunerações do pessoal | pág. 20, precedente |
| 10 | Indemnizações | pág. 20, precedente |
| 11 | Encargos sobre remunerações | pág. 20, Jev 0.92 |
| 12 | Seguros | pág. 20, precedente |
| 13 | Outros gastos com pessoal | pág. 20, precedente |
| 14 | Impostos | pág. 21, Claude 0.9 |
| 15 | Outros gastos e perdas | pág. 21, Jev 0.99 |
| 16 | Gastos/reversões de depreciação e de amortização | pág. 3, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = matchday_competition. La bilheteira está dentro de 'Prestação de serviços' sin desglose (subagente Sonnet, revisado por Claude).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = stadium_other. La bilheteira está dentro de 'Prestação de serviços' sin desglose (subagente Sonnet, revisado por Claude).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = season_tickets. La bilheteira está dentro de 'Prestação de serviços' sin desglose (subagente Sonnet, revisado por Claude).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Televisión. El documento no tiene ingresos de TV (subagente Sonnet, revisado por Claude).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 2; cash escalón 1 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 2
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "União de Leiria".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 18, precedente |
| 2 | Prestação de serviços | pág. 18, precedente |
| 3 | Subsídios à exploração | pág. 3, Jev 0.95 |
| 4 | Outros rendimentos | pág. 3, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 3, precedente |
| 2 | Serviços especializados | pág. 19, precedente |
| 3 | Materiais | pág. 19, precedente |
| 4 | Energia e fluídos | pág. 19, precedente |
| 5 | Deslocações e estadas | pág. 19, precedente |
| 6 | Rendas e alugueres | pág. 19, precedente |
| 7 | Serviços diversos (*) | pág. 19, precedente |
| 8 | Remunerações do pessoal | pág. 20, precedente |
| 9 | Indemnizações | pág. 20, precedente |
| 10 | Encargos sobre remunerações | pág. 20, precedente |
| 11 | Seguros | pág. 20, precedente |
| 12 | Outros gastos com pessoal | pág. 20, precedente |
| 13 | Impostos | pág. 21, precedente |
| 14 | Outros gastos e perdas | pág. 21, precedente |
| 15 | Gastos/reversões de depreciação e de amortização | pág. 3, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Financiamentos obtidos n/c 5,846,407 + Financiamentos obtidos c 0. Balance de la SAD; incluye la deuda con accionistas/financiadores según nota 15 (Jubilantadvice).
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2022–23 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "União de Leiria".
```

## Fuentes

### uniaodeleiria-pt-relatorio-contas-udl-sad-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### uniaodeleiria-pt-relatorio-contas-udl-sad-2022-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
