# oliveirense-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/oliveirense-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Oliveirense: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.pdf. brandColor #E93343
(procedencia en Admin/sourcing/Portugal/Oliveirense.md; tools/cargar-lote.mjs).
```

```text
data/pt/oliveirense-pt-data.js — União Desportiva Oliveirense - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "oliveirense-pt" — slug de "Oliveirense" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "União Desportiva Oliveirense - Futebol, SAD" — respuesta de Guido en la cola (bf3d31c)
  displayName        ok        "Oliveirense" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (56 de 56 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 82 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): El nombre del archivo (202425) se lee mal; el ejercicio es 2024-25, cierre 
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (56 de 56 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "oliveirense-pt-relatorio-e-contas-202425" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Oliveirense"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"oliveirense-pt-relatorio-e-contas-202425"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Oliveirense/Relatorio-e-Contas-202425.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de mercadorias | pág. 31, Jev 1 |
| 2 | Prestação de serviços | pág. 31, precedente |
| 3 | Federação Portuguesa de Futebol | pág. 31, precedente |
| 4 | Liga Portuguesa de Futebol Profissional | pág. 31, precedente |
| 5 | Fundo Infraestruturas - LPF | pág. 31, precedente |
| 6 | Prémio Allianz Cup -LPF | pág. 31, Jev 0.99 |
| 7 | Subs. Deslocação - FPF | pág. 31, Jev 1 |
| 8 | UDO - Fundos Formação FIFA | pág. 31, Jev 0.9 |
| 9 | Rendimentos suplementares | pág. 36, Jev 0.99 |
| 10 | Descontos de pronto pagamento obtidos | pág. 36, Jev 1 |
| 11 | Outras | pág. 36, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 40, Jev 0.96 |
| 2 | Subcontratos | pág. 36, Jev 0.98 |
| 3 | Serviços especializados | pág. 36, Jev 0.96 |
| 4 | Materiais | pág. 36, Jev 0.91 |
| 5 | Energia e fluidos | pág. 36, Jev 1 |
| 6 | Deslocações, estadas e transportes | pág. 36, Jev 1 |
| 7 | Serviços diversos | pág. 36, Jev 0.96 |
| 8 | Salários e ordenados | pág. 35, precedente |
| 9 | Gastos com rescisão de contratos | pág. 35, precedente |
| 10 | Contribuições para a segurança social | pág. 35, precedente |
| 11 | Outros gastos com o pessoal | pág. 35, precedente |
| 12 | Imparidade de dívidas a receber (perdas/reversões) | pág. 40, Jev 0.99 |
| 13 | Impostos | pág. 37, Jev 0.96 |
| 14 | Descontos de pronto pagamento concedidos | pág. 37, Jev 0.99 |
| 15 | Outros | pág. 37, Jev 0.99 |
| 16 | Gastos/reversões de depreciação e de amortização | pág. 40, Jev 0.92 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2025. El nombre del archivo (202425) se lee mal; el ejercicio es 2024-25, cierre 30/06/2025.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = matchday_competition. La bilheteira está dentro de 'Prestação de serviços' sin desglose (subagente Sonnet, revisado por Claude).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = stadium_other. La bilheteira está dentro de 'Prestação de serviços' sin desglose (subagente Sonnet, revisado por Claude).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = season_tickets. La bilheteira está dentro de 'Prestação de serviços' sin desglose (subagente Sonnet, revisado por Claude).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = broadcasting. Prestação de serviços es el 99% del rédito y no se abre; la TV, si la hubo, está ahí.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Oliveirense".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202223.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Oliveirense/Relatorio-e-Contas-202223.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de mercadorias | pág. 39, precedente |
| 2 | Prestação de serviços | pág. 39, precedente |
| 3 | Federação P. Futebol / LPFP | pág. 40, Claude 0.85 |
| 4 | Fundo Infraestruturas - Liga Portuguesa F[ilegible] | pág. 40, Jev 0.99 |
| 5 | IEFP | pág. 40, Jev 0.95 |
| 6 | Rendimentos suplementares | pág. 45, precedente |
| 7 | Descontos de pronto pagamento obtidos | pág. 45, precedente |
| 8 | Rendimentos em investimentos não financeiros | pág. 45, Jev 0.95 |
| 9 | Outras | pág. 45, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 21, precedente |
| 2 | Subcontratos | pág. 45, precedente |
| 3 | Serviços especializados | pág. 45, precedente |
| 4 | Materiais | pág. 45, precedente |
| 5 | Energia e fluidos | pág. 45, precedente |
| 6 | Deslocações, estadas e transportes | pág. 45, precedente |
| 7 | Serviços diversos | pág. 45, precedente |
| 8 | Salários e ordenados | pág. 44, precedente |
| 9 | Gastos com rescisão de contratos | pág. 44, precedente |
| 10 | Contribuições para a segurança social | pág. 44, precedente |
| 11 | Outros gastos com o pessoal | pág. 44, precedente |
| 12 | Imparidade de dívidas a receber (perdas/reversões) | pág. 21, precedente |
| 13 | Impostos | pág. 45, precedente |
| 14 | Descontos de pronto pagamento concedidos | pág. 45, precedente |
| 15 | Outros | pág. 45, precedente |
| 16 | Gastos/reversões de depreciação e de amortização | pág. 21, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2023. El nombre del archivo no da el año (o lo da mal: '202223' se lee 2022); el ejercicio cierra el 30/06/2023 según el registro (periodo.cierre).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Oliveirense".
```

## Fuentes

### oliveirense-pt-relatorio-e-contas-202425

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oliveirense-pt-relatorio-e-contas-202223

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202223.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
