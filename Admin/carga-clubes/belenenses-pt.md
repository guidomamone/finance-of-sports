# belenenses-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/belenenses-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Belenenses: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.pdf. brandColor #0033A0
(procedencia en Admin/sourcing/Portugal/Belenenses.md; tools/cargar-lote.mjs).
```

```text
data/pt/belenenses-pt-data.js — Belenenses (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "belenenses-pt" — slug de "Belenenses" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Belenenses" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Belenenses" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (109 de 111 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (109 de 111 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "belenenses-pt-sduq-demonstracoes-financeiras-30junho2025" — clubId + nombre del archivo en slug
  liga               ok        "pt-liga3" — roster cacheado de "2024–25 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Belenenses"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"belenenses-pt-sduq-demonstracoes-financeiras-30junho2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 4, Jev 0.9 |
| 2 | Subsídios à exploração | pág. 4, Jev 0.98 |
| 3 | Outros não especificados | pág. 20, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes | pág. 17, Claude 0.8 |
| 2 | Serviços de Gestão | pág. 17, Jev 0.98 |
| 3 | Contabilidade | pág. 17, Jev 1 |
| 4 | Acompanhamento Nutricional | pág. 17, precedente |
| 5 | Catapult One Team | pág. 17, precedente |
| 6 | Outros Serviços | pág. 17, Jev 0.99 |
| 7 | Publicidade e propaganda | pág. 17, Jev 1 |
| 8 | Vigilância e segurança | pág. 17, Jev 0.97 |
| 9 | Conservação e reparação | pág. 17, Jev 0.98 |
| 10 | Honorários | pág. 17, Jev 1 |
| 11 | Serviços bancários | pág. 17, Jev 0.99 |
| 12 | Comissões | pág. 17, precedente |
| 13 | Outros serviços especializados | pág. 17, Jev 0.93 |
| 14 | Ferramentas e utensílios de desgaste rápido | pág. 17, Jev 1 |
| 15 | Material de escritório | pág. 17, Jev 1 |
| 16 | Combustíveis | pág. 17, Jev 0.99 |
| 17 | Deslocações e estadias | pág. 17, Jev 1 |
| 18 | Rendas e alugueres | pág. 17, precedente |
| 19 | Comunicação | pág. 17, Jev 1 |
| 20 | Contencioso e notariado | pág. 17, Jev 1 |
| 21 | Despesas de representação | pág. 17, Jev 0.99 |
| 22 | Limpeza, higiene e conforto | pág. 17, Jev 1 |
| 23 | Outros | pág. 17, Jev 0.92 |
| 24 | Orgãos sociais e outros colaboradores | pág. 18, Claude 0.8 |
| 25 | Remunerações Plantel e Equipa Técnica | pág. 18, Jev 1 |
| 26 | Encargos sobre remunerações | pág. 18, Jev 0.91 |
| 27 | Seguros | pág. 18, precedente |
| 28 | Outros | pág. 18, Jev 0.92 |
| 29 | Impostos | pág. 18, Jev 0.97 |
| 30 | Taxas | pág. 18, Claude 0.85 |
| 31 | Quotizações Assoc. Futebol Lisboa | pág. 18, precedente |
| 32 | Multas desportivas | pág. 18, Jev 0.91 |
| 33 | Outros gastos e perdas | pág. 18, Jev 0.99 |
| 34 | Gastos / reversões de depreciação e de amortização | pág. 4, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 3
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Accionistas / sócios (corriente) 6.309,87; Financiamentos obtidos '-'. La nota 7 abre 'Accionistas' en el pasivo como 'Empréstimos concedidos' 6.309,87 corriente: préstamo de socios. Sin otra deuda financiera.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2024–25 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Belenenses".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 7, Jev 0.9 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 19, Jev 0.99 |
| 2 | Publicidade e propaganda | pág. 19, Jev 1 |
| 3 | Vigilância e segurança | pág. 19, Jev 0.97 |
| 4 | Honorários | pág. 19, Jev 1 |
| 5 | Serviços bancários | pág. 19, Jev 0.99 |
| 6 | Comissões | pág. 19, precedente |
| 7 | Ferramentas e utensílios de desgaste rápido | pág. 19, Jev 1 |
| 8 | Material de escritório | pág. 19, Jev 1 |
| 9 | Eletricidade | pág. 19, Jev 1 |
| 10 | Água | pág. 19, Jev 0.98 |
| 11 | Combustíveis | pág. 19, Jev 0.99 |
| 12 | Deslocações e estadias | pág. 19, Jev 1 |
| 13 | Rendas e alugueres | pág. 19, precedente |
| 14 | Comunicação | pág. 19, Jev 1 |
| 15 | Contechisioso e notariado | pág. 19, Jev 1 |
| 16 | Despesas de representação | pág. 19, Jev 0.99 |
| 17 | Limpeza, higiene e conforto | pág. 19, Jev 1 |
| 18 | Outros | pág. 19, Jev 0.92 |
| 19 | Órgãos sociais e outros colaboradores | pág. 20, Claude 0.8 |
| 20 | Remunerações Plantel e Equipa Técnica | pág. 20, Jev 1 |
| 21 | Encargos sobre remunerações | pág. 20, Jev 0.91 |
| 22 | Seguros | pág. 20, precedente |
| 23 | Outros | pág. 20, Jev 0.92 |
| 24 | Impostos | pág. 20, Jev 0.97 |
| 25 | Taxas | pág. 20, Claude 0.85 |
| 26 | Menos valias de ativos intangíveis | pág. 20, Jev 0.92 |
| 27 | Outros gastos e perdas | pág. 20, Jev 0.99 |
| 28 | Gastos / reversões de depreciação e de amortização | pág. 7, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 6
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Financiamentos obtidos no corriente '-' / sin fila financiera en el corriente; Total do passivo 515.866,28 = Fornecedores 221.501,51 + Estado 79.461,05 + Outras contas a pagar 54.903,72 + Diferimentos 160.000,00. Balance completo sin ninguna fila financiera con saldo.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Belenenses".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-10.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
Patrick Morais de Carvalho (2014-11-01 a hoy): Elegido presidente el sábado 18/10/2014 (maisfutebol, 18/10/2014, 52,4%); la prensa de entonces dijo que la posse de los órganos sociales sería a principios de noviembre y no se halló el día exacto: se usa 01/11/2014 por convención (día 01), no es una fecha confirmada al día. Reelecto 2017, 2020 y 2023 (mandato 2023-2026) y la fuente de abola (octubre 2024) lo da con 10 años al frente. Sigue en el cargo al 17/10/2026: elecciones convocadas para el 24/10/2026, donde se recandidata (Rui Rodrigues y otros son rivales), así que hasta es null. Documentos: en Clubes/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.md:962-967 (ata nº 4 del 16/10/2024) el socio único (el club) está representado por Patrick Morais de Carvalho como Presidente de la Direção y él figura entre los gerentes de la SDUQ; el balance 2023/24 lo aprueba la gerencia el 16/10/2024 (línea 366). El balance 2024/25 (Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md:242) lo aprueba la gerencia el 20/10/2025 y firma 'A Gerência' sin nombres. La SDUQ se constituyó el 21/6/2024 (nota 1 del archivo 2025, «constituída em 21 de junho de 2024»); el cierre 30/6/2024 es de la sociedad recién creada, y la gestión del club cubre ambos cierres sin cambio de presidente entre cierre y aprobación.
Duda: Día exacto de la posse de noviembre de 2014: no hallado (se usa 2014-11-01). No afecta a los cierres cargados.
Duda: Los documentos no nombran al presidente en las firmas de 'A Gerência' (solo el acta de 2024 lo nombra); la identidad como presidente del club se apoya en prensa.
```

## Fuentes

### belenenses-pt-sduq-demonstracoes-financeiras-30junho2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### belenenses-pt-sduq-relatorio-e-contas-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
