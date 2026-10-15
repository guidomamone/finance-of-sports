# criciuma-br — evidencia de carga

Lo que había como comentario en `data/br/criciuma-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/criciuma-br-data.js — Criciúma Esporte Clube (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-09), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "criciuma-br" — slug de "Criciuma" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Criciúma Esporte Clube" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "Criciuma" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro de transcrip
  sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2012 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre nul
  cierre             ok        "2012-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2012-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2012-12-31 = 2.0435 (PTAX de cierre (venda) del Banco Central do Brasil al 2012-12-31)
  sourceId           ok        "criciuma-br-demonstrativo-financeiro-2012" — clubId + nombre del archivo en slug
  liga               ok        "br-serieB" — roster cacheado de "2012 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Criciúma"

FISCAL YEAR META PROPUESTO para 2012 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2012: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2012-12-31","sourceId":"criciuma-br-demonstrativo-financeiro-2012"}
============================================================================
```

_de data/clubs.js:_

```text
Criciuma: alta por tools/alta-club.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.pdf. brandColor:null a propósito:
tricolor amarillo, negro y blanco, mismo criterio que Fortaleza (procedencia en Admin/sourcing/Brasil/Criciuma.md).
```

_de data/club-leagues/br.js:_

```text
Criciuma (alta-club.mjs, 2026-10-09): verificado contra roster cacheado de "2012 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Criciúma".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/relatorio-auditoria-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/relatorio-auditoria-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão | pág. 24, Jev 1 |
| 2 | Receita com sócios | pág. 24, Jev 0.9 |
| 3 | Receita com patrocínios | pág. 24, Jev 1 |
| 4 | Receita de subvenções | pág. 24, precedente |
| 5 | Receita com negociação de atletas | pág. 24, Jev 1 |
| 6 | Receita com jogos | pág. 24, Jev 0.99 |
| 7 | Receita com licenciamento – royalties | pág. 24, Jev 1 |
| 8 | Receita Timemania - CEF | pág. 24, Jev 1 |
| 9 | Demais Receitas | pág. 24, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 9, precedente |
| 2 | Departamento Futebol de Base | pág. 9, Jev 1 |
| 3 | Departamento Futebol Feminino | pág. 9, Jev 1 |
| 4 | Departamento Administrativo | pág. 9, Jev 1 |
| 5 | Departamento de Patrimônio | pág. 9, Jev 0.98 |
| 6 | Despesas Tributárias | pág. 9, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2025-12-31
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/relatorio-de-balanco-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/relatorio-de-balanco-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão | pág. 25, Jev 1 |
| 2 | Receita com sócios | pág. 25, Jev 0.9 |
| 3 | Receita com patrocínios | pág. 25, Jev 1 |
| 4 | Receita de subvenções | pág. 25, precedente |
| 5 | Receita com negociação de atletas | pág. 25, Jev 1 |
| 6 | Receita com jogos | pág. 25, Jev 0.99 |
| 7 | Receita com licenciamento – royalties | pág. 25, Jev 1 |
| 8 | Receita Timemania - CEF | pág. 25, Jev 1 |
| 9 | Demais Receitas | pág. 25, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita Direitos Condomínio LFU | pág. 25, precedente |
| 2 | Departamento Futebol Profissional | pág. 9, precedente |
| 3 | Departamento Futebol de Base | pág. 9, Jev 1 |
| 4 | Departamento Futebol Feminino | pág. 9, Jev 1 |
| 5 | Departamento Administrativo | pág. 9, Jev 1 |
| 6 | Departamento de Patrimônio | pág. 9, Jev 0.98 |
| 7 | Despesas Tributárias | pág. 9, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2024-12-31
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/relatorio-de-balanco-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/relatorio-de-balanco-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão | pág. 25, Jev 1 |
| 2 | Receita com sócios | pág. 25, Jev 0.9 |
| 3 | Receita com patrocínios | pág. 25, Jev 1 |
| 4 | Receita de subvenções | pág. 25, precedente |
| 5 | Receita com negociação de atletas | pág. 25, Jev 1 |
| 6 | Receita com jogos | pág. 25, Jev 0.99 |
| 7 | Receita com licenciamento – royalties | pág. 25, Jev 1 |
| 8 | Receita Timemania - CEF | pág. 25, Jev 1 |
| 9 | Demais Receitas | pág. 25, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita Direitos Condomínio LFU | pág. 25, precedente |
| 2 | Departamento Futebol Profissional | pág. 9, precedente |
| 3 | Departamento Futebol de Base | pág. 9, Jev 1 |
| 4 | Departamento Futebol Feminino | pág. 9, Jev 1 |
| 5 | Departamento Administrativo | pág. 9, Jev 1 |
| 6 | Departamento de Patrimônio | pág. 9, Jev 0.98 |
| 7 | Despesas Tributárias | pág. 9, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2023-12-31
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstracoes-financeiras-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/demonstracoes-financeiras-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITA OPERACIONAL BRUTA | pág. 9, Jev 0.98 |
| 2 | Outras receitas Operacionais | pág. 9, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 9, precedente |
| 2 | Departamento Futebol de Base | pág. 9, Jev 1 |
| 3 | Departamento Futebol Feminino | pág. 9, Jev 1 |
| 4 | Departamento Administrativo | pág. 9, Jev 1 |
| 5 | Departamento de Patrimônio | pág. 9, Jev 0.98 |
| 6 | Despesas Tributárias | pág. 9, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae la fecha de la firma (2023-04-28); el ejercicio del documento cierra el 2022-12-31
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): el subtotal 23.790.402 (L241) es NETO de 'Outras receitas Operacionais' 32.222 (L248); se cargan los departamentos (L242-L247, 23.822.624) y la otra receita como ingreso: 27.268.558 + 32.222 - 23.822.624 - 1.207.001 = 2.271.155 (L253)
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Televisión, Venta de Jugadores
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/demonstrativo-financeiro-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão | pág. 20, Jev 1 |
| 2 | Receita com sócios | pág. 20, Jev 0.9 |
| 3 | Receita com patrocínios | pág. 20, Jev 1 |
| 4 | Receita de subvenções | pág. 20, precedente |
| 5 | Receita com negociação de atletas | pág. 20, Jev 1 |
| 6 | Receita com jogos | pág. 20, Jev 0.99 |
| 7 | Reversão contingências – Termo de Rescisão Parcial GA | pág. 20, Jev 0.98 |
| 8 | Demais Receitas | pág. 20, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 8, precedente |
| 2 | Departamento Futebol de Base | pág. 8, Jev 1 |
| 3 | Departamento Futebol Feminino | pág. 8, Jev 1 |
| 4 | Departamento Administrativo | pág. 8, Jev 1 |
| 5 | Departamento de Patrimônio | pág. 8, Jev 0.98 |
| 6 | Despesas Tributárias | pág. 8, Jev 1 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2021-12-31
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2021 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/balanco-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/balanco-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão | pág. 17, Jev 1 |
| 2 | Receita com sócios | pág. 17, Jev 0.9 |
| 3 | Receita com patrocínios | pág. 17, Jev 1 |
| 4 | Receita de subvenções | pág. 17, precedente |
| 5 | Receita com negociação de atletas | pág. 17, Jev 1 |
| 6 | Receita com jogos | pág. 17, Jev 0.99 |
| 7 | Demais Receitas | pág. 17, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 4, precedente |
| 2 | Departamento Futebol de Base | pág. 4, Jev 1 |
| 3 | Departamento Administrativo | pág. 4, Jev 1 |
| 4 | Departamento de Patrimônio | pág. 4, Jev 0.98 |
| 5 | Despesas Tributárias | pág. 4, Jev 1 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2020-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2020-12-31
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2020 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/balanco-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/balanco-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão | pág. 16, Jev 1 |
| 2 | Receita com sócios | pág. 16, Jev 0.9 |
| 3 | Receita com patrocínios | pág. 16, Jev 1 |
| 4 | Receita de subvenções | pág. 16, precedente |
| 5 | Receita com negociação de atletas | pág. 16, Jev 1 |
| 6 | Receita com jogos | pág. 16, Jev 0.99 |
| 7 | Demais Receitas | pág. 16, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 4, precedente |
| 2 | Departamento Futebol de Base | pág. 4, Jev 1 |
| 3 | Departamento Administrativo | pág. 4, Jev 1 |
| 4 | Departamento de Patrimônio | pág. 4, Jev 0.98 |
| 5 | Despesas Tributárias | pág. 4, Jev 1 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2019-12-31
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2019 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/balanco-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão televisíveis | pág. 29, precedente |
| 2 | Receita com mensalidades de sócios | pág. 29, precedente |
| 3 | Receita com patrocínios | pág. 29, precedente |
| 4 | Receita de subvenções | pág. 29, precedente |
| 5 | Receita com negociação de atletas | pág. 29, precedente |
| 6 | Receita com jogos | pág. 28, precedente |
| 7 | Receita Loteria Esportiva/Timemania | pág. 28, Jev 1 |
| 8 | Venda de mercadorias | pág. 28, precedente |
| 9 | Receitas de royalties | pág. 28, precedente |
| 10 | Receitas de publicidades | pág. 28, precedente |
| 11 | Demais Receitas | pág. 28, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 10, precedente |
| 2 | Departamento Futebol de Base | pág. 10, precedente |
| 3 | Departamento Administrativo | pág. 10, precedente |
| 4 | Departamento de Patrimônio | pág. 10, precedente |
| 5 | Despesas Tributárias | pág. 10, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2018 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/balanco-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão televisíveis | pág. 28, Jev 1 |
| 2 | Receita com mensalidade de sócios | pág. 28, Jev 0.95 |
| 3 | Receita com Patrocínios | pág. 28, Jev 1 |
| 4 | Receita de mecanismo de solidariedade | pág. 28, Jev 0.9 |
| 5 | Repasse de direitos federativos | pág. 28, Jev 1 |
| 6 | Venda de mercadorias | pág. 28, Jev 1 |
| 7 | Receitas de royalties | pág. 28, precedente |
| 8 | Receitas Publicidades | pág. 28, Jev 0.96 |
| 9 | Demais Receitas | pág. 28, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Profissional | pág. 9, precedente |
| 2 | Departamento Amador | pág. 9, Jev 1 |
| 3 | Departamento Administrativo | pág. 9, Jev 1 |
| 4 | Departamento de Marketing e Comercial | pág. 9, Jev 1 |
| 5 | Departamento de Patrimonio | pág. 9, Jev 0.98 |
| 6 | Departamento Juridico | pág. 9, Jev 1 |
| 7 | Departamento Loja - Tigre Maniacos | pág. 9, Jev 0.91 |
| 8 | Despesas Tributárias | pág. 9, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2017 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-auditado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/balanco-auditado-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão televisíveis | pág. 28, precedente |
| 2 | Receita com mensalidade de sócios | pág. 28, precedente |
| 3 | Receita com Patrocínios | pág. 28, precedente |
| 4 | Receita de mecanismo de solidariedade | pág. 28, precedente |
| 5 | Repasse de direitos federativos | pág. 28, precedente |
| 6 | Venda de mercadorias | pág. 28, precedente |
| 7 | Receitas de royalties | pág. 28, precedente |
| 8 | Receitas Publicidades | pág. 28, precedente |
| 9 | Demais Receitas | pág. 28, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Profissional | pág. 9, precedente |
| 2 | Departamento Amador | pág. 9, precedente |
| 3 | Departamento Administrativo | pág. 9, precedente |
| 4 | Departamento de Marketing e Comercial | pág. 9, precedente |
| 5 | Departamento de Patrimonio | pág. 9, precedente |
| 6 | Departamento Jurídico | pág. 9, precedente |
| 7 | Departamento Loja - Tigre Maniacos | pág. 9, precedente |
| 8 | Despesas Tributárias | pág. 9, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2016 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/balanco-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita com transmissão televisíveis | pág. 25, Jev 1 |
| 2 | Receita com mensalidade de sócios | pág. 25, Jev 0.95 |
| 3 | Receita de mecanismo de solidariedade | pág. 25, Jev 0.9 |
| 4 | Repasse de direitos federativos | pág. 25, Jev 1 |
| 5 | Venda de mercadorias | pág. 25, Jev 1 |
| 6 | Receitas de royalties | pág. 25, precedente |
| 7 | Receitas Publicidades | pág. 25, Jev 0.96 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento Futebol Profissional | pág. 5, precedente |
| 2 | Departamento Futebol de Base | pág. 5, Jev 1 |
| 3 | Departamento Administrativo | pág. 5, Jev 1 |
| 4 | Departamento de Marketing e Comercial | pág. 5, Jev 1 |
| 5 | Departamento Financeiro | pág. 5, Jev 0.98 |
| 6 | Departamento de Patrimonio | pág. 5, Jev 0.98 |
| 7 | Departamento Jurídico | pág. 5, Jev 1 |
| 8 | Departamento Loja - Tigre Maníacos | pág. 5, Jev 0.91 |
| 9 | Despesas Tributárias | pág. 5, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2015 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/demonstrativo-financeiro-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas com transmissões televisivas | pág. 27, Jev 1 |
| 2 | Receitas com mensalidade dos sócios | pág. 27, Jev 1 |
| 3 | Receita de mecanismo de solidariedade | pág. 27, Jev 0.9 |
| 4 | Repasses de direitos federativos | pág. 27, Jev 1 |
| 5 | Venda de mercadorias | pág. 27, Jev 1 |
| 6 | Receitas com royalties | pág. 27, ? 0.65 |
| 7 | Receitas de publicidade | pág. 27, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento profissional | pág. 6, precedente |
| 2 | Departamento amador | pág. 6, Jev 1 |
| 3 | Departamento administrativo | pág. 6, Jev 1 |
| 4 | Departamento marketing e comercial | pág. 6, Jev 1 |
| 5 | Departamento financeiro | pág. 6, Jev 0.98 |
| 6 | Departamento de patrimônio | pág. 6, Jev 0.98 |
| 7 | Departamento jurídico | pág. 6, Jev 1 |
| 8 | Departamento loja Tigre Maníacos | pág. 6, precedente |
| 9 | Despesas tributárias | pág. 6, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2014: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2014 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstracoes-financeiras-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/demonstracoes-financeiras-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Futebol | pág. 6, Jev 0.92 |
| 2 | Sócios | pág. 6, Jev 1 |
| 3 | MESP - Projeto Formação Atletas – nota 5 | pág. 6, precedente |
| 4 | Extraordinárias | pág. 6, Jev 1 |
| 5 | Venda de mercadorias | pág. 6, Jev 1 |
| 6 | Royalties | pág. 6, Jev 0.95 |
| 7 | Outras receitas | pág. 6, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento profissional | pág. 6, precedente |
| 2 | Departamento amador | pág. 6, Jev 1 |
| 3 | Departamento administrativo | pág. 6, Jev 1 |
| 4 | Departamento marketing e comercial | pág. 6, Jev 1 |
| 5 | Departamento financeiro | pág. 6, Jev 0.98 |
| 6 | Departamento de patrimônio | pág. 6, Jev 0.98 |
| 7 | Departamento jurídico | pág. 6, Jev 1 |
| 8 | Departamento loja Tigre Maníacos | pág. 6, precedente |
| 9 | Despesas tributárias | pág. 6, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025): Televisión, Venta de Jugadores
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2013 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Criciuma/demonstrativo-financeiro-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Futebol | pág. 6, Jev 0.92 |
| 2 | Sócios | pág. 6, Jev 1 |
| 3 | Extraordinárias | pág. 6, Jev 1 |
| 4 | Venda de mercadorias | pág. 6, Jev 1 |
| 5 | Royalties | pág. 6, Jev 0.95 |
| 6 | Subvenções | pág. 6, Jev 1 |
| 7 | Outras receitas | pág. 6, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Departamento profissional | pág. 6, precedente |
| 2 | Departamento amador | pág. 6, Jev 1 |
| 3 | Departamento administrativo | pág. 6, Jev 1 |
| 4 | Departamento marketing e comercial | pág. 6, Jev 1 |
| 5 | Departamento financeiro | pág. 6, Jev 0.98 |
| 6 | Departamento de patrimônio | pág. 6, Jev 0.98 |
| 7 | Departamento jurídico | pág. 6, Jev 1 |
| 8 | Departamento loja Tigre Maníacos | pág. 6, precedente |
| 9 | Despesas tributárias | pág. 6, Jev 1 |

### Meta

```text
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2012-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2012-12-31
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025): Televisión, Venta de Jugadores
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Jaime Dal Farra (2015-12-08 a 2021-01-01): Aclamado nuevo presidente en reunión extraordinaria del Conselho Deliberativo el martes 08/12/2015 (club). Renunció el 14/05/2020 y siguió hasta el 31/12/2020 (OCP News 15/05/2020): hasta = 2021-01-01 por convención.
Vilmar Guedes (2022-06-28 a 2024-12-05): Aclamado la noche del martes 28/06/2022 (Futebol Interior, 30/06/2022); la fuente no da fecha de posse: se usa la de aclamación. Renunció el jueves 05/12/2024 (ND Mais).
Alexandre Farias (2024-12-05 a 2025-11-26): Vice-presidente administrativo, asumió interinamente al renunciar Guedes (05/12/2024) y siguió hasta la asunción de Canella (4oito). Anunció su renuncia el 09/12/2024 pero permaneció hasta las elecciones.
Pedro Paulo Canella (2025-11-26 a hoy): Posse el miércoles 26/11/2025 en la ACIC (4oito); actividades desde el 27/11/2025. Mandato de tres años.
SIN CONFIRMAR, no cargada: Antenor Angeloni (2010-01-01 a 2015-12-08), https://www.criciuma.com.br/noticias/o-clube/novo-presidente-e-empossado: Club (08/12/2015): Dal Farra reemplaza a Angeloni, 'que comandaba el club desde 2010' y renunció formalmente (4oito: renunció en octubre de 2015). Desde = 01/01/2010 (solo año, 'inicio de 2010'); hasta = 08/12/2015 (día de la aclamación de Dal Farra; no se sabe quién lo condujo entre la renuncia de octubre y esa fecha).
SIN CONFIRMAR, no cargada: Anselmo Freitas (2021-01-01 a 2022-06-28), https://www.criciuma.com.br/noticias/o-clube/anselmo-freitas-e-eleito-presidente-administrativo: Sucedió a Dal Farra: 4oito y OCP lo indican, pero ninguna fuente leída da el día de asunción; 2021-01-01 es inferido del fin de Dal Farra el 31/12/2020. La Wikipedia pt dice 'elegido 17/12/2020' (no verificado). Fue reelecto/ratificado el 23/11/2021 para el trienio 2022-2024 (club). Salió antes del 28/06/2022 (Guedes fue aclamado 'tras la salida de Anselmo Freitas'); hasta = día de aclamación de Guedes, no la fecha de su salida.
Duda: Cierre 2015: Dal Farra asumió el 08/12/2015; Angeloni presidió casi todo el año (posible firmo).
Duda: Cierre 2022: Freitas presidió hasta ~junio; Guedes el resto.
Duda: Cierre 2024: Guedes presidió casi todo el año; el interino Farias estaba al cierre (posible firmo).
Duda: Cierre 2025: Farias hasta el 26/11; Canella al cierre.
Duda: Quién condujo el club entre octubre y diciembre de 2015 (renuncia de Angeloni - posse de Dal Farra): sin dato.
Duda: Wikipedia pt (texto) dice que Búrigo renunció en 2010 y que Angeloni volvió a su segundo mandato antes de la Série C 2010; el club dice que Angeloni 'comandaba desde 2010'. No afecta a los cierres cubiertos.
```

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Jaime Dal Farra (2015-12-08 a 2021-01-01): Aclamado el 08/12/2015 (club). Renunció el 14/05/2020 y siguió hasta el 31/12/2020: hasta = 2021-01-01 por convención. Ya confirmada en la tanda anterior.
Vilmar Guedes (2022-06-28 a 2024-12-05): Aclamado el 28/06/2022 (Futebol Interior); la fuente no da posse, se usa la aclamación. Renunció el 05/12/2024 (ND Mais / NSC Total). Ya cargada en la tanda anterior; no vuelto a verificar.
Pedro Paulo Canella (2025-11-26 a hoy): Posse el 26/11/2025 en la ACIC (4oito). Cargada antes; no re-leída aquí.
SIN CONFIRMAR, no cargada: Antenor Angeloni (2010-01-01 a 2015-12-08), https://www.criciuma.com.br/noticias/o-clube/novo-presidente-e-empossado: Wikipedia pt (lista): 2010 a 2015, solo años; el club (08/12/2015) dice que comandaba desde 2010. Desde = 01/01/2010 (solo año), hasta = 08/12/2015, aclamación de Dal Farra. Para los cierres 2012-2014 no hay dudas sobre quién conducía (presentado como presidente en 2013, DC; campeón estadual 2013). confirmada=false por el día 01.
SIN CONFIRMAR, no cargada: Anselmo Freitas (2021-01-01 a 2022-06-28), https://www.criciuma.com.br/noticias/o-clube/anselmo-freitas-e-eleito-presidente-administrativo: Wikipedia pt: electo el 17/12/2020 (no verificado en prensa); el club informa su ratificación el 23/11/2021 para el trienio 2022-2024 (única chapa, 109 votos). Ninguna fuente da el día de posse: 2021-01-01 inferido del fin de Dal Farra. Hasta = 2022-06-28, aclamación de Guedes; la fecha de su salida no se encontró (carta al Conselho por salud, NSC Total, sin fecha). confirmada=false.
SIN CONFIRMAR, no cargada: Alexandre Farias (2024-12-05 a 2025-11-26), https://www.4oito.com.br/: Vice-presidente administrativo, interino desde la renuncia de Guedes (05/12/2024) hasta la posse de Canella (4oito). Cargada antes con fuente 4oito; no re-leída aquí.
Duda: Anselmo Freitas: día de asunción y de salida no confirmados (2021-01-01 y 2022-06-28 son convenciones).
Duda: Cierre 2015: Angeloni presidió casi todo el año, Dal Farra estaba al cierre (posible firmo).
Duda: Cierre 2022: Freitas hasta ~junio, Guedes el resto. Cierre 2024: Guedes casi todo el año, Farias al cierre. Cierre 2025: Farias hasta el 26/11, Canella al cierre.
Duda: NSC Total (nota sobre la renuncia de Guedes) dice por error que asumió en junio de 2024; las demás fuentes dicen 2022.
Duda: Quién condujo entre octubre y diciembre de 2015 (renuncia de Angeloni - posse de Dal Farra): sin dato.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-14-2/resultado-2.json, tools/gestiones-tanda.mjs, 2026-10-15):_

```text
Antenor Angeloni (2010-01-01 a 2015-11-30): Presidente 2010-2015 según la lista oficial de presidentes del club (criciumaec.com.br/diretoria: '32 Antenor Angeloni 2010-2015'). La fuente (ND Mais, 2015-09-20) dice que asumió en 2010 y que dejaría el cargo el 30/11/2015: 'desde' es año solo (01-01) y 'hasta' es la fecha anunciada, no la efectiva (Jaime Dal Farra fue aclamado el 08/12/2015 según criciuma.com.br/sala-de-imprensa/novo-presidente-e-empossado, que no se publica como gestión por no estar en los cierres). Los balances 2012 y 2013 (demonstrativo-financeiro-2012.md:36-37; demonstracoes-financeiras-2013.md:32-33) van dirigidos al Vice Presidente Financeiro Ailton Schuelter y no traen firma de presidente; el 2014 tampoco. Los tres cierres caen en el medio de la gestión, sin cambio entre cierre y aprobación.
Anselmo Freitas (2021-01-01 a 2022-06-02): Presidente 2021-2022 según la lista oficial del club ('34 Anselmo Freitas 2021-2022'). Engeplus (2022-06-02) dice que asumió en diciembre de 2020 tras la salida de Jaime Dal Farra, sin día (otra fuente de prensa habla de enero de 2021): 'desde' 2020-12-01 es mes solo; el cierre 2021-12-31 queda adentro en cualquiera de las dos. 'hasta' 2022-06-02 es la fecha de la nota que informa su renuncia ('na manhã desta quinta-feira (2)'). Firma el balance 2021 como PRESIDENTE (demonstrativo-financeiro-2021.md:969, y firma digital en la línea 188). Cambio de gestión posterior al cierre: Vilmar Guedes asumió en 2022, después de la aprobación. Ajuste de Guido (2026-10-15): desde 2020-12-01 -> 2021-01-01 (la fuente da solo el mes; otra dice enero de 2021; Dal Farra ya está cargado hasta el 2021-01-01 y el cierre 2020 quedaba con dos presidentes).
Duda: Fecha exacta de asunción de Angeloni (2010; una nota de radio habla del 01/03/2010 pero no pude verificarla en la página) y de su salida (anunciada 30/11/2015, sucesor aclamado 08/12/2015).
Duda: Fecha exacta de asunción de Anselmo Freitas: diciembre de 2020 (Engeplus) vs enero de 2021 (otra fuente, interino tras Dal Farra); no afecta el cierre 2021.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### criciuma-br-demonstrativo-financeiro-2012

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-demonstracoes-financeiras-2013

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstracoes-financeiras-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-balanco-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/balanco-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-balanco-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/balanco-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-demonstrativo-financeiro-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-relatorio-de-balanco-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/relatorio-de-balanco-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-relatorio-de-balanco-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/relatorio-de-balanco-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-relatorio-auditoria-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/relatorio-auditoria-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-demonstracoes-financeiras-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstracoes-financeiras-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-demonstrativo-financeiro-2014

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-balanco-2015

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-balanco-2017

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-balanco-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### criciuma-br-balanco-auditado-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-auditado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
