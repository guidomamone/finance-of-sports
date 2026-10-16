# torreense-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/torreense-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Torreense: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Torreense/SAD_RelatorioContas2023-2024.pdf. brandColor #005489
(procedencia en Admin/sourcing/Portugal/Torreense.md; tools/cargar-lote.mjs).
```

```text
data/pt/torreense-pt-data.js — Sport Clube União Torreense - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Torreense/SAD_RelatorioContas2023-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "torreense-pt" — slug de "Torreense" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Sport Clube União Torreense - Futebol, SAD" — respuesta de Guido en la cola (6ea1fee)
  displayName        ok        "Torreense" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (81 de 83 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 143 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (81 de 83 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "torreense-pt-sad-relatoriocontas2023-2024" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Torreense"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"torreense-pt-sad-relatoriocontas2023-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Torreense/SAD_RelatorioContas2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Torreense/SAD_RelatorioContas2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 54, precedente |
| 2 | Aumentos/reduções de justo valor | pág. 54, Jev 1 |
| 3 | Outros rendimentos | pág. 54, Jev 0.95 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 70, Jev 0.99 |
| 2 | Publicidade e propaganda | pág. 70, Jev 1 |
| 3 | Vigilância e segurança | pág. 70, Jev 0.97 |
| 4 | Comissões | pág. 70, Jev 0.93 |
| 5 | Conservação e reparação | pág. 70, Jev 0.98 |
| 6 | Ferramentas e utensílios de desgaste rápido | pág. 70, Jev 1 |
| 7 | Material de escritório | pág. 70, Jev 1 |
| 8 | Artigos para oferta | pág. 70, Jev 0.98 |
| 9 | Outros | pág. 70, Jev 0.98 |
| 10 | Eletricidade | pág. 70, Jev 1 |
| 11 | Combustíveis | pág. 70, Jev 0.99 |
| 12 | Água | pág. 70, Jev 1 |
| 13 | Deslocações e estadas | pág. 70, Jev 1 |
| 14 | Transportes de pessoal | pág. 70, Jev 0.99 |
| 15 | Transportes de mercadorias | pág. 71, precedente |
| 16 | Rendas e alugueres | pág. 71, precedente |
| 17 | Comunicação | pág. 71, Jev 1 |
| 18 | Seguros | pág. 71, Claude 0.8 |
| 19 | Contencioso e notariado | pág. 71, Jev 1 |
| 20 | Despesas de representação | pág. 71, Jev 1 |
| 21 | Limpeza, higiene e conforto | pág. 71, Jev 1 |
| 22 | Outros serviços | pág. 71, Jev 1 |
| 23 | Remunerações do pessoal | pág. 75, precedente |
| 24 | Indemnizações | pág. 75, precedente |
| 25 | Encargos sobre as remunerações | pág. 75, Jev 0.96 |
| 26 | Seguros de acidentes no trabalho e doenças profissionais | pág. 75, Jev 0.99 |
| 27 | Gastos de acção social | pág. 75, precedente |
| 28 | Outros gastos com o pessoal, dos quais: | pág. 75, precedente |
| 29 | Provisões (aumentos/reduções) | pág. 54, precedente |
| 30 | 681 - Impostos | pág. 72, Jev 1 |
| 31 | 6881-Corr. Rel. Periodos Anteriores | pág. 72, Jev 1 |
| 32 | 6882-Donativos | pág. 72, Jev 1 |
| 33 | 6888-Multas e penalidades | pág. 72, Jev 0.91 |
| 34 | 6888-Desp. N dev. Documentadas | pág. 72, Jev 0.99 |
| 35 | Gastos/reversões de depreciação e de amortização | pág. 54, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Torreense".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Torreense/SAD_RelatorioContas2022-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Torreense/SAD_RelatorioContas2022-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 24, precedente |
| 2 | Subsídios à exploração | pág. 24, Jev 0.94 |
| 3 | Aumentos/reduções de justo valor | pág. 24, precedente |
| 4 | Outros rendimentos | pág. 24, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 40, precedente |
| 2 | Publicidade e propaganda | pág. 40, precedente |
| 3 | Vigilância e segurança | pág. 40, precedente |
| 4 | Comissões | pág. 40, precedente |
| 5 | Ferramentas e utensílios de desgaste rápido | pág. 40, precedente |
| 6 | Material de escritório | pág. 40, precedente |
| 7 | Artigos para oferta | pág. 40, precedente |
| 8 | Outros | pág. 40, precedente |
| 9 | Energia e fluidos | pág. 40, Jev 1 |
| 10 | Deslocações e estadas | pág. 40, precedente |
| 11 | Transportes de pessoal | pág. 40, precedente |
| 12 | Rendas e alugueres | pág. 40, precedente |
| 13 | Comunicação | pág. 40, precedente |
| 14 | Seguros | pág. 40, precedente |
| 15 | Contencioso e notariado | pág. 40, precedente |
| 16 | Despesas de representação | pág. 40, precedente |
| 17 | Limpeza, higiene e conforto | pág. 40, precedente |
| 18 | Outros serviços | pág. 40, precedente |
| 19 | Remunerações do pessoal | pág. 45, precedente |
| 20 | Indemnizações | pág. 45, precedente |
| 21 | Encargos sobre as remunerações | pág. 45, precedente |
| 22 | Seguros de acidentes no trabalho e doenças profissionais | pág. 45, precedente |
| 23 | Gastos de acção social | pág. 45, precedente |
| 24 | Outros gastos com o pessoal, dos quais: | pág. 45, precedente |
| 25 | Outros gastos | pág. 24, Jev 1 |
| 26 | Gastos/reversões de depreciação e de amortização | pág. 24, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Torreense".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Torreense/SAD_RelatorioContas2021-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 25, precedente |
| 2 | Subsídios à exploração | pág. 25, Jev 0.94 |
| 3 | Aumentos/reduções de justo valor | pág. 25, precedente |
| 4 | Outros rendimentos | pág. 25, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 45, precedente |
| 2 | Publicidade e propaganda | pág. 45, precedente |
| 3 | Vigilância e segurança | pág. 45, precedente |
| 4 | Comissões | pág. 45, precedente |
| 5 | Ferramentas e utensílios de desgaste rápido | pág. 45, precedente |
| 6 | Material de escritório | pág. 45, precedente |
| 7 | Artigos para oferta | pág. 45, precedente |
| 8 | Outros | pág. 45, precedente |
| 9 | Eletricidade | pág. 45, precedente |
| 10 | Combustíveis | pág. 45, precedente |
| 11 | Deslocações e estadas | pág. 45, precedente |
| 12 | Transportes de pessoal | pág. 45, precedente |
| 13 | Rendas e alugueres | pág. 45, precedente |
| 14 | Comunicação | pág. 45, precedente |
| 15 | Contencioso e notariado | pág. 45, precedente |
| 16 | Limpeza, higiene e conforto | pág. 45, precedente |
| 17 | Outros serviços | pág. 45, precedente |
| 18 | Remunerações do pessoal | pág. 50, precedente |
| 19 | Indemnizações | pág. 50, precedente |
| 20 | Encargos sobre as remunerações | pág. 50, precedente |
| 21 | Seguros de acidentes no trabalho e doenças profissionais | pág. 50, precedente |
| 22 | Outros gastos com o pessoal, dos quais: | pág. 50, precedente |
| 23 | 681 - Impostos | pág. 46, precedente |
| 24 | Multas não fiscais | pág. 46, Jev 0.97 |
| 25 | Outras Penalidades | pág. 46, Jev 0.99 |
| 26 | Desp. Não devidamente document. | pág. 46, Jev 1 |
| 27 | 6881 - Corr.Relat.Periodos anteriores | pág. 46, precedente |
| 28 | 6885 - Insufic. Estimat. p/ Impostos | pág. 46, Jev 1 |
| 29 | Gastos/reversões de depreciação e de amortização | pág. 25, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2021–22 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Torreense".
```

## Fuentes

### torreense-pt-sad-relatoriocontas2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Torreense/SAD_RelatorioContas2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torreense-pt-sad-relatoriocontas2021-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torreense-pt-sad-relatoriocontas2022-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Torreense/SAD_RelatorioContas2022-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
