# portimonense-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/portimonense-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Portimonense: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Portimonense/Relatorio-Contas-24-25_assinado.pdf. brandColor #000000
(procedencia en Admin/sourcing/Portugal/Portimonense.md; tools/cargar-lote.mjs).
```

```text
data/pt/portimonense-pt-data.js — Portimonense Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Portimonense/Relatorio-Contas-24-25_assinado.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "portimonense-pt" — slug de "Portimonense" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Portimonense Futebol, SAD" — la portada y lo más frecuente del .md coinciden (79 veces)
  displayName        ok        "Portimonense" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (57 de 62 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 148 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — contenido del .md (año más nuevo con fecha de cierre)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (57 de 62 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "portimonense-pt-relatorio-contas-24-25-assinado" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Portimonense"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"portimonense-pt-relatorio-contas-24-25-assinado"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Portimonense/Relatorio-Contas-24-25_assinado.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Portimonense/Relatorio-Contas-24-25_assinado.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 66, Jev 0.9 |
| 2 | Subsídios à exploração | pág. 49, Jev 0.98 |
| 3 | Rendimentos suplementares | pág. 71, Jev 0.99 |
| 4 | Descontos de pronto pagamento | pág. 71, Jev 1 |
| 5 | Rendimentos e ganhos nos restantes ativos financeiros | pág. 71, Jev 0.97 |
| 6 | Rendimentos e ganhos em investimentos não financeiros | pág. 71, precedente |
| 7 | Outros | pág. 71, precedente |
| 8 | Bilheteira | pág. 11, Jev 1 |
| 9 | Publicidade e patrocínios | pág. 11, Jev 1 |
| 10 | Direitos televisivos | pág. 11, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias cons. | pág. 49, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 70, Jev 0.99 |
| 3 | Publicidade e propaganda | pág. 70, Jev 1 |
| 4 | Vigilância e segurança | pág. 70, Jev 0.97 |
| 5 | Honorários | pág. 70, Jev 1 |
| 6 | Comissões | pág. 70, Jev 0.95 |
| 7 | Conservação e reparação | pág. 70, Jev 0.99 |
| 8 | Outros | pág. 70, Jev 0.98 |
| 9 | Ferramentas e utensílios de desgaste rápido | pág. 70, Jev 1 |
| 10 | Material de escritório | pág. 70, Jev 1 |
| 11 | Artigos para oferta | pág. 70, Jev 0.98 |
| 12 | Outros | pág. 70, Jev 0.98 |
| 13 | Electricidade | pág. 70, Jev 1 |
| 14 | Combustíveis | pág. 70, Jev 0.99 |
| 15 | Água | pág. 70, Jev 0.99 |
| 16 | Deslocações e estadas | pág. 70, Jev 1 |
| 17 | Transportes de mercadorias | pág. 70, Jev 0.97 |
| 18 | Rendas e alugueres | pág. 70, precedente |
| 19 | Comunicação | pág. 70, Jev 1 |
| 20 | Seguros | pág. 70, Jev 0.95 |
| 21 | Contencioso e notariado | pág. 70, Jev 1 |
| 22 | Despesas de representação | pág. 70, Jev 1 |
| 23 | Limpeza, higiene e conforto | pág. 70, Jev 1 |
| 24 | Outros | pág. 70, Jev 0.98 |
| 25 | Gastos com o Pessoal | pág. 49, precedente |
| 26 | Outros gastos e perdas | pág. 49, Jev 1 |
| 27 | Gastos/reversões de depreciação e de amortização | pág. 49, Jev 0.92 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 70.054. Prestações de Serviços se abre con el cuadro de gestión, que cierra exacto con la nota 12.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 498.286. Parte de Prestações de Serviços (cuadro de gestión).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 450.000. Parte de Prestações de Serviços (cuadro de gestión).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Portimonense".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Portimonense/Relatorio-Contas-23-24_assinado.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Portimonense/Relatorio-Contas-23-24_assinado.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 50, precedente |
| 2 | Prestações de Serviços | pág. 50, precedente |
| 3 | Subsídios à exploração | pág. 33, precedente |
| 4 | Trabalhos para a própria entidade | pág. 33, Jev 0.99 |
| 5 | Rendimentos suplementares | pág. 55, precedente |
| 6 | Descontos de pronto pagamento | pág. 55, precedente |
| 7 | Rendimentos e ganhos nos restantes ativos financeiros | pág. 55, precedente |
| 8 | Rendimentos e ganhos em investimentos não financeiros | pág. 55, precedente |
| 9 | Outros | pág. 55, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 33, Jev 0.99 |
| 2 | Trabalhos especializados | pág. 54, precedente |
| 3 | Publicidade e propaganda | pág. 54, precedente |
| 4 | Vigilância e segurança | pág. 54, precedente |
| 5 | Honorários | pág. 54, precedente |
| 6 | Comissões | pág. 54, precedente |
| 7 | Conservação e reparação | pág. 54, precedente |
| 8 | Outros | pág. 54, precedente |
| 9 | Ferramentas e utensílios de desgaste rápido | pág. 54, precedente |
| 10 | Material de escritório | pág. 54, precedente |
| 11 | Artigos para oferta | pág. 54, precedente |
| 12 | Outros | pág. 54, precedente |
| 13 | Electricidade | pág. 54, precedente |
| 14 | Combustíveis | pág. 54, precedente |
| 15 | Água | pág. 54, precedente |
| 16 | Deslocações e estadas | pág. 54, precedente |
| 17 | Transportes de mercadorias | pág. 54, precedente |
| 18 | Rendas e alugueres | pág. 54, precedente |
| 19 | Comunicação | pág. 54, precedente |
| 20 | Seguros | pág. 54, precedente |
| 21 | Contencioso e notariado | pág. 54, precedente |
| 22 | Despesas de representação | pág. 54, precedente |
| 23 | Limpeza, higiene e conforto | pág. 54, precedente |
| 24 | Outros | pág. 54, precedente |
| 25 | Remunerações dos órgãos sociais | pág. 53, Jev 1 |
| 26 | Remunerações do pessoal | pág. 53, Claude 0.85 |
| 27 | Encargos sobre remunerações | pág. 53, Jev 0.95 |
| 28 | Seguros de acidentes de trabalho e doenças profissionais | pág. 53, Jev 0.99 |
| 29 | Gastos de acção social | pág. 53, Jev 0.91 |
| 30 | Outros gastos com o pessoal | pág. 53, precedente |
| 31 | Ajustamentos de inventários (perdas/reversões) | pág. 33, Jev 0.99 |
| 32 | Imparidade de dividas a receber (perdas/reversões) | pág. 33, Jev 1 |
| 33 | Provisões (aumentos/reduções) | pág. 33, precedente |
| 34 | Outras imparidades (perdas/reversões) | pág. 33, Jev 0.96 |
| 35 | Outros gastos e perdas | pág. 33, precedente |
| 36 | Gastos/reversões de depreciação e de amortização | pág. 33, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Portimonense".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Portimonense/Relatorio-Contas-21-22_assinado.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Portimonense/Relatorio-Contas-21-22_assinado.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 49, precedente |
| 2 | Prestações de Serviços | pág. 49, precedente |
| 3 | Subsídios à exploração | pág. 32, precedente |
| 4 | Rendimentos suplementares | pág. 53, precedente |
| 5 | Rendimentos e ganhos em investimentos não financeiros | pág. 53, precedente |
| 6 | Rendimentos e ganhos nos outros Inv.Financ. | pág. 53, Jev 1 |
| 7 | Outros | pág. 53, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 32, Jev 0.99 |
| 2 | Trabalhos especializados | pág. 53, precedente |
| 3 | Publicidade e propaganda | pág. 53, precedente |
| 4 | Vigilância e segurança | pág. 53, precedente |
| 5 | Honorários | pág. 53, precedente |
| 6 | Comissões | pág. 53, precedente |
| 7 | Conservação e reparação | pág. 53, precedente |
| 8 | Outros | pág. 53, precedente |
| 9 | Ferramentas e utensílios de desgaste rápido | pág. 53, precedente |
| 10 | Material de escritório | pág. 53, precedente |
| 11 | Mat. Sinal e Segurança | pág. 53, Jev 0.99 |
| 12 | Materiais Covid | pág. 53, precedente |
| 13 | Outros | pág. 53, precedente |
| 14 | Electricidade | pág. 53, precedente |
| 15 | Combustíveis | pág. 53, precedente |
| 16 | Água | pág. 53, precedente |
| 17 | Deslocações e estadas | pág. 53, precedente |
| 18 | Transportes de mercadorias | pág. 53, precedente |
| 19 | Rendas e alugueres | pág. 53, precedente |
| 20 | Comunicação | pág. 53, precedente |
| 21 | Seguros | pág. 53, precedente |
| 22 | Contencioso e notariado | pág. 53, precedente |
| 23 | Despesas de representação | pág. 53, precedente |
| 24 | Limpeza, higiene e conforto | pág. 53, precedente |
| 25 | Outros | pág. 53, precedente |
| 26 | Remunerações dos órgãos sociais | pág. 52, Jev 1 |
| 27 | Remunerações do pessoal | pág. 52, Claude 0.85 |
| 28 | Encargos sobre remunerações | pág. 52, Jev 0.95 |
| 29 | Seguros de acidentes de trabalho e doenças profissionais | pág. 52, Jev 0.99 |
| 30 | Gastos de acção social | pág. 52, Jev 0.91 |
| 31 | Outros gastos com o pessoal | pág. 52, precedente |
| 32 | Impostos | pág. 54, Jev 1 |
| 33 | Gastos e perdas em investimentos não financeiros | pág. 54, Jev 0.99 |
| 34 | Outros juros | pág. 54, Jev 0.99 |
| 35 | Outras diferenças de câmbio desfavoráveis | pág. 54, precedente |
| 36 | Outros | pág. 54, precedente |
| 37 | Gastos/reversões de depreciação e de amortização | pág. 32, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Portimonense".
```

## Fuentes

### portimonense-pt-relatorio-contas-24-25-assinado

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Portimonense/Relatorio-Contas-24-25_assinado.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### portimonense-pt-relatorio-contas-21-22-assinado

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Portimonense/Relatorio-Contas-21-22_assinado.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### portimonense-pt-relatorio-contas-23-24-assinado

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Portimonense/Relatorio-Contas-23-24_assinado.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
