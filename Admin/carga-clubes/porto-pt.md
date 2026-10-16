# porto-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/porto-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Porto: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Porto/wf-2024-2025-6b41056f.pdf. brandColor #00428C
(procedencia en Admin/sourcing/Portugal/Porto.md; tools/cargar-lote.mjs).
```

```text
data/pt/porto-pt-data.js — Futebol Clube do Porto (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Porto/wf-2024-2025-6b41056f.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "porto-pt" — slug de "Porto" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube do Porto" — respuesta de Guido en la cola (0a65682)
  displayName        ok        "Porto" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): periodo.mjs no encontró el cierre; confirmado contra 
  sport              ok        "futbol" — el .md nombra el fútbol 863 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de al
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): periodo.mjs no encontró el cierre; confi
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-15): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "porto-pt-wf-2024-2025-6b41056f" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"porto-pt-wf-2024-2025-6b41056f"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Porto/wf-2024-2025-6b41056f.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/wf-2024-2025-6b41056f.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 117, Claude 0.8 |
| 2 | Prémios competições UEFA | pág. 152, Jev 1 |
| 3 | Prémios competições FIFA | pág. 152, Jev 1 |
| 4 | Receita de bilheteira | pág. 152, Jev 0.99 |
| 5 | Receita de lugares anuais | pág. 152, Claude 0.93 |
| 6 | Outras receitas desportivas | pág. 152, Jev 0.99 |
| 7 | Publicidade | pág. 152, Jev 1 |
| 8 | Direitos de transmissões | pág. 152, Jev 1 |
| 9 | Corporate Hospitality | pág. 152, precedente |
| 10 | Outras prestações de serviços | pág. 152, Jev 1 |
| 11 | Diferencia de redondeo | pág. ?, precedente |
| 12 | Outros proveitos | pág. 117, Jev 0.99 |
| 13 | Proveitos com alienações de passes de jogadores (i) | pág. 156, Jev 1 |
| 14 | Proveitos com empréstimos de jogadores | pág. 156, Jev 0.98 |
| 15 | Outros proveitos com jogadores | pág. 156, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das vendas | pág. 117, precedente |
| 2 | Trabalhos especializados | pág. 153, Jev 1 |
| 3 | Subcontratos | pág. 153, Jev 0.98 |
| 4 | Direitos de imagem de atletas | pág. 153, Jev 0.91 |
| 5 | Rendas e alugueres | pág. 153, precedente |
| 6 | Vigilância e segurança | pág. 153, Jev 0.98 |
| 7 | Despesas de organização | pág. 153, Jev 0.96 |
| 8 | Honorários | pág. 153, Jev 1 |
| 9 | Publicidade e propaganda | pág. 153, Jev 1 |
| 10 | Serviços de catering | pág. 153, Jev 0.99 |
| 11 | Material desportivo | pág. 153, Jev 1 |
| 12 | Comunicação | pág. 153, Jev 1 |
| 13 | Conservação e reparação | pág. 153, Jev 0.99 |
| 14 | Seguros | pág. 153, Jev 0.93 |
| 15 | Limpeza, higiene e conforto | pág. 153, Jev 1 |
| 16 | Combustíveis | pág. 153, Jev 0.99 |
| 17 | Eletricidade | pág. 153, Jev 1 |
| 18 | Despesas de representação | pág. 153, Jev 0.99 |
| 19 | Outros fornecimentos e serviços | pág. 153, precedente |
| 20 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 21 | Custos com o pessoal | pág. 117, Jev 0.99 |
| 22 | Depreciações e Amortizações, excluindo passes de jogadores | pág. 117, Jev 1 |
| 23 | Provisões e perdas por imparidade excluindo passes de jogadores | pág. 117, precedente |
| 24 | Outros custos | pág. 117, Jev 1 |
| 25 | Amortizações de passes de jogadores | pág. 156, Jev 1 |
| 26 | Perdas por imparidade com passes de jogadores | pág. 156, Jev 1 |
| 27 | Custos com alienações de passes de jogadores (ii) | pág. 156, precedente |
| 28 | Custos com empréstimos de jogadores | pág. 156, precedente |
| 29 | Outros custos com jogadores | pág. 156, precedente |
| 30 | Diferencia de redondeo | pág. ?, Jev 0.98 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2025-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cero-real = Cuotas sociales. Documento de FC Porto SAD (consolidado de la SAD, no del club): la SAD no cobra cuotas; las cuotas son del club asociación (perfil de porto-pt = sí por los consolidados del club 2016-2023).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cero-real = Otras secciones deportivas. Documento de FC Porto SAD: solo la modalidad fútbol; las modalidades son del club asociación.
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 92, Jev 0.91 |
| 2 | Receitas associativas | pág. 92, Jev 1 |
| 3 | Prémios competições europeias | pág. 92, Jev 1 |
| 4 | Receita de bilheteira | pág. 92, precedente |
| 5 | Receita de lugares anuais | pág. 92, precedente |
| 6 | Outras receitas desportivas | pág. 92, precedente |
| 7 | Publicidade | pág. 92, precedente |
| 8 | Direitos de transmissões televisivas | pág. 92, Jev 1 |
| 9 | Corporate Hospitality | pág. 92, precedente |
| 10 | Outros | pág. 92, precedente |
| 11 | Subsídios à exploração | pág. 36, Jev 0.98 |
| 12 | Rendimentos de propriedades de investimento | pág. 94, Jev 0.98 |
| 13 | Imputação de subsídios para o investimento | pág. 94, Jev 1 |
| 14 | Outros rendimentos suplementares | pág. 94, Jev 1 |
| 15 | Correções relativas a exercícios anteriores | pág. 94, precedente |
| 16 | Reembolsos de sinistros | pág. 94, Jev 1 |
| 17 | Reembolsos de impostos | pág. 94, Jev 1 |
| 18 | Outros rendimentos e ganhos | pág. 94, Jev 0.97 |
| 19 | Proveitos com alienações de passes de jogadores | pág. 96, precedente |
| 20 | Proveitos com empréstimos de jogadores | pág. 96, precedente |
| 21 | Outros proveitos com jogadores | pág. 96, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 36, Jev 0.99 |
| 2 | Trabalhos Especializados | pág. 93, precedente |
| 3 | Subcontratos | pág. 93, precedente |
| 4 | Rendas e Alugueres | pág. 93, precedente |
| 5 | Direitos de imagem de atletas | pág. 93, precedente |
| 6 | Vigilância e Segurança | pág. 93, precedente |
| 7 | Conservação e reparação | pág. 93, precedente |
| 8 | Publicidade e propaganda | pág. 93, precedente |
| 9 | Despesas de organização | pág. 93, precedente |
| 10 | Seguros | pág. 93, precedente |
| 11 | Honorários | pág. 93, precedente |
| 12 | Material Desportivo | pág. 93, precedente |
| 13 | Comunicação | pág. 93, precedente |
| 14 | Despesas de representação | pág. 93, precedente |
| 15 | Limpeza, higiene e conforto | pág. 93, precedente |
| 16 | Relvados | pág. 93, precedente |
| 17 | Energia e Fluídos | pág. 93, Jev 1 |
| 18 | Outros fornecimentos e serviços | pág. 93, precedente |
| 19 | Remunerações dos Órgãos Sociais | pág. 94, Jev 1 |
| 20 | Remunerações de atletas e equipas técnicas | pág. 94, Jev 1 |
| 21 | Remunerações do pessoal | pág. 94, precedente |
| 22 | Benefícios pós-emprego | pág. 94, Jev 0.97 |
| 23 | Indemnizações | pág. 94, precedente |
| 24 | Encargos sobre remunerações | pág. 94, Jev 0.97 |
| 25 | Seguros de acidentes de trabalho e doenças profissionais | pág. 94, Jev 1 |
| 26 | Outros gastos com pessoal | pág. 94, precedente |
| 27 | Imparidade de inventários (perdas / reversões) | pág. 36, Jev 1 |
| 28 | Imparidade de dívidas a receber (perdas / reversões) | pág. 36, Jev 1 |
| 29 | Dívidas incobráveis | pág. 95, Jev 1 |
| 30 | Correções relativas a exercícios anteriores | pág. 95, Jev 1 |
| 31 | Impostos | pág. 95, Jev 0.92 |
| 32 | Penalizações Desportivas | pág. 95, Jev 0.93 |
| 33 | Multas/Dívidas Fiscais e não fiscais | pág. 95, precedente |
| 34 | Outros | pág. 95, Jev 1 |
| 35 | Ativos fixos tangíveis | pág. 95, Jev 1 |
| 36 | Propriedades de investimento | pág. 95, precedente |
| 37 | Outros ativos intangíveis | pág. 95, Jev 1 |
| 38 | Goodwill | pág. 95, Jev 0.99 |
| 39 | Amortizações de passes de jogadores | pág. 96, precedente |
| 40 | Perdas por imparidade com passes de jogadores | pág. 96, precedente |
| 41 | Custos com alienações de passes de jogadores | pág. 96, precedente |
| 42 | Custos com empréstimos de jogadores | pág. 96, precedente |
| 43 | Outros custos com jogadores | pág. 96, precedente |
| 44 | Resultados relativos a investimentos | pág. 36, Jev 0.99 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Otras secciones deportivas. Las modalidades del club no tienen fila propia: sus ingresos vienen mezclados en 'Outras receitas desportivas' (con Taça, pretemporada y Dragon Force) y sus gastos dentro de FSE y personal; no se pueden separar sin inventar (subagente Sonnet, revisado por Claude).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2016–17 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 99, Jev 0.91 |
| 2 | Receitas associativas | pág. 99, Jev 1 |
| 3 | Prémios competições europeias | pág. 99, Jev 1 |
| 4 | Receita de bilheteira | pág. 99, precedente |
| 5 | Receita de lugares anuais | pág. 99, precedente |
| 6 | Outras receitas desportivas | pág. 99, precedente |
| 7 | Publicidade | pág. 99, precedente |
| 8 | Direitos de transmissão televisiva | pág. 99, Jev 1 |
| 9 | Corporate Hospitality | pág. 99, precedente |
| 10 | Outros | pág. 99, precedente |
| 11 | Subsídios à exploração | pág. 37, Jev 0.98 |
| 12 | Compensação de utilização de jogadores no Europeu 2016 | pág. 101, Jev 0.91 |
| 13 | Royalties | pág. 101, Jev 0.96 |
| 14 | Rendimentos de propriedades de investimento | pág. 101, Jev 0.98 |
| 15 | Imputação de subsídios para o investimento | pág. 101, Jev 1 |
| 16 | Outros rendimentos suplementares | pág. 101, Jev 1 |
| 17 | Reembolsos de sinistros | pág. 101, Jev 1 |
| 18 | Outros | pág. 101, precedente |
| 19 | Proveitos com alienações de passes de jogadores | pág. 103, precedente |
| 20 | Proveitos com empréstimos de jogadores | pág. 103, precedente |
| 21 | Outros proveitos com jogadores | pág. 103, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 37, Jev 0.99 |
| 2 | Trabalhos Especializados | pág. 100, precedente |
| 3 | Subcontratos | pág. 100, precedente |
| 4 | Direitos de imagem de atletas | pág. 100, precedente |
| 5 | Rendas e Alugueres | pág. 100, precedente |
| 6 | Vigilância e Segurança | pág. 100, precedente |
| 7 | Conservação e reparação | pág. 100, precedente |
| 8 | Energia e Fluidos | pág. 100, Jev 1 |
| 9 | Despesas de organização | pág. 100, precedente |
| 10 | Seguros | pág. 100, precedente |
| 11 | Material Desportivo | pág. 100, precedente |
| 12 | Honorários | pág. 100, precedente |
| 13 | Comunicação | pág. 100, precedente |
| 14 | Publicidade e propaganda | pág. 100, precedente |
| 15 | Limpeza, higiene e conforto | pág. 100, precedente |
| 16 | Despesas de representação | pág. 100, precedente |
| 17 | Relvados | pág. 100, precedente |
| 18 | Outros fornecimentos e serviços | pág. 100, precedente |
| 19 | Remunerações dos Órgãos Sociais | pág. 101, Jev 1 |
| 20 | Remunerações dos Atletas/Técnicos/Médicos | pág. 101, Jev 1 |
| 21 | Remunerações do pessoal | pág. 101, precedente |
| 22 | Benefícios pós-emprego | pág. 101, Jev 0.97 |
| 23 | Indemnizações | pág. 101, precedente |
| 24 | Encargos sobre remunerações | pág. 101, Jev 0.97 |
| 25 | Seguros de acidentes de trabalho e doenças profissionais | pág. 101, Jev 1 |
| 26 | Outros gastos com pessoal | pág. 101, precedente |
| 27 | Imparidade de inventários (perdas / reversões) | pág. 37, Jev 1 |
| 28 | Imparidade de dívidas a receber (perdas / reversões) | pág. 37, Jev 1 |
| 29 | Provisões (aumentos / reduções) | pág. 37, Jev 0.97 |
| 30 | Correções relativas a exercícios anteriores | pág. 102, Jev 1 |
| 31 | Impostos | pág. 102, Jev 0.92 |
| 32 | Penalizações Desportivas | pág. 102, Jev 0.93 |
| 33 | Multas/Dividas Fiscais e não fiscais | pág. 102, precedente |
| 34 | Comissões de intermediação contratação de treinadores | pág. 102, precedente |
| 35 | Outros | pág. 102, Jev 1 |
| 36 | Ativos fixos tangíveis | pág. 102, Jev 1 |
| 37 | Propriedades de investimento | pág. 102, precedente |
| 38 | Outros ativos intangíveis | pág. 102, Jev 1 |
| 39 | Amortizações de passes de jogadores | pág. 103, precedente |
| 40 | Perdas por imparidade com passes de jogadores | pág. 103, precedente |
| 41 | Custos com alienações de passes de jogadores | pág. 103, precedente |
| 42 | Custos com empréstimos de jogadores | pág. 103, precedente |
| 43 | Outros custos com jogadores | pág. 103, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Otras secciones deportivas. Las modalidades del club no tienen fila propia: sus ingresos vienen mezclados en 'Outras receitas desportivas' (con Taça, pretemporada y Dragon Force) y sus gastos dentro de FSE y personal; no se pueden separar sin inventar (subagente Sonnet, revisado por Claude).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2015–16 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## Fuentes

### porto-pt-wf-2024-2025-6b41056f

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Porto/wf-2024-2025-6b41056f.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-relatorio-contas-consolidadas-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-relatorio-contas-consolidadas-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
