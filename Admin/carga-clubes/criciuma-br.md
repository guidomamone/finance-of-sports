# criciuma-br — evidencia de carga

Lo que había como comentario en `data/criciuma-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/criciuma-br-data.js — Criciúma Esporte Clube (Brasil).
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
tricolor amarillo, negro y blanco, mismo criterio que Fortaleza (procedencia en fuentes/Brasil/Criciuma.md).
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
