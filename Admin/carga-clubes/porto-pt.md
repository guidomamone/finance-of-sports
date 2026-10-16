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

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/wf-2023-2024-293efed8.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/wf-2023-2024-293efed8.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 43, precedente |
| 2 | Prémios competições europeias | pág. 105, Jev 1 |
| 3 | Receita de bilheteira | pág. 105, precedente |
| 4 | Receita de lugares anuais | pág. 105, precedente |
| 5 | Outras receitas desportivas | pág. 105, precedente |
| 6 | Publicidade | pág. 105, precedente |
| 7 | Direitos de transmissões | pág. 105, precedente |
| 8 | Corporate Hospitality | pág. 105, precedente |
| 9 | Outras prestações de serviços | pág. 105, precedente |
| 10 | Outros proveitos | pág. 43, precedente |
| 11 | Proveitos com alienações de passes de jogadores (i) | pág. 109, precedente |
| 12 | Proveitos com empréstimos de jogadores | pág. 109, precedente |
| 13 | Outros proveitos com jogadores | pág. 109, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 |  | pág. 87, precedente |
| 2 | Perdas por imparidade | pág. 87, precedente |
| 3 | Trabalhos especializados | pág. 106, precedente |
| 4 | Subcontratos | pág. 106, precedente |
| 5 | Material desportivo | pág. 106, precedente |
| 6 | Despesas de representação | pág. 106, precedente |
| 7 | Despesas de organização | pág. 106, precedente |
| 8 | Vigilância e segurança | pág. 106, precedente |
| 9 | Seguros | pág. 106, precedente |
| 10 | Rendas e alugueres | pág. 106, precedente |
| 11 | Direitos de imagem de atletas | pág. 106, precedente |
| 12 | Honorários | pág. 106, precedente |
| 13 | Publicidade e propaganda | pág. 106, precedente |
| 14 | Conservação e reparação | pág. 106, precedente |
| 15 | Comunicação | pág. 106, precedente |
| 16 | Combustíveis | pág. 106, precedente |
| 17 | Eletricidade | pág. 106, precedente |
| 18 | Limpeza, higiene e conforto | pág. 106, precedente |
| 19 | Serviços de catering | pág. 106, precedente |
| 20 | Outros fornecimentos e serviços | pág. 106, precedente |
| 21 | Custos com o pessoal | pág. 43, precedente |
| 22 | Depreciações e Amortizações, excluindo passes de jogadores | pág. 43, precedente |
| 23 | Provisões e perdas por imparidade excluindo passes de jogadores | pág. 43, precedente |
| 24 | Outros custos | pág. 43, precedente |
| 25 | Amortizações de passes de jogadores | pág. 109, precedente |
| 26 | Perdas por imparidade com passes de jogadores | pág. 109, precedente |
| 27 | Custos com alienações de passes de jogadores (ii) | pág. 109, precedente |
| 28 | Custos com empréstimos de jogadores | pág. 109, precedente |
| 29 | Outros custos com jogadores | pág. 109, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Cuotas sociales. Documento de FC Porto SAD (no del club asociación): la SAD no cobra cuotas; perfil de porto-pt = sí por los consolidados del club 2016-2023. Igual que 2024-25.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Otras secciones deportivas. Documento de FC Porto SAD: solo la modalidad fútbol; las modalidades son del club asociación. Igual que 2024-25.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 97, Jev 0.91 |
| 2 | Receitas associativas | pág. 97, Jev 1 |
| 3 | Prémios competições europeias | pág. 97, Jev 1 |
| 4 | Receita de bilheteira (Estádio do Dragão) | pág. 97, precedente |
| 5 | Receita de lugares anuais | pág. 97, precedente |
| 6 | Outras receitas desportivas | pág. 97, precedente |
| 7 | Publicidade | pág. 97, precedente |
| 8 | Direitos de transmissões televisivas | pág. 97, Jev 1 |
| 9 | Outros | pág. 97, precedente |
| 10 | Subsídios à exploração | pág. 35, Jev 0.98 |
| 11 | Compensação por utilização de jogadores ao serviço de seleções nacionais | pág. 100, Jev 0.95 |
| 12 | Rendimentos de propriedades de investimento | pág. 100, Jev 0.98 |
| 13 | Imputação de subsídios para o investimento | pág. 100, Jev 1 |
| 14 | Outros rendimentos suplementares | pág. 100, Jev 1 |
| 15 | Correções relativas a exercícios anteriores | pág. 100, precedente |
| 16 | Reembolsos de sinistros | pág. 100, Jev 1 |
| 17 | Transferências de atletas de outras modalidades | pág. 100, precedente |
| 18 | Outros rendimentos e ganhos | pág. 100, Jev 0.97 |
| 19 | Proveitos com alienações de passes de jogadores (i) | pág. 102, precedente |
| 20 | Proveitos com empréstimos de jogadores | pág. 102, precedente |
| 21 | Outros proveitos com jogadores | pág. 102, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 35, Jev 0.99 |
| 2 | Trabalhos Especializados | pág. 98, precedente |
| 3 | Subcontratos | pág. 98, precedente |
| 4 | Rendas e Alugueres | pág. 98, precedente |
| 5 | Direitos de imagem de atletas | pág. 98, precedente |
| 6 | Vigilância e Segurança | pág. 98, precedente |
| 7 | Conservação e reparação | pág. 98, precedente |
| 8 | Publicidade e propaganda | pág. 98, precedente |
| 9 | Despesas de organização | pág. 98, precedente |
| 10 | Seguros | pág. 98, precedente |
| 11 | Honorários | pág. 98, precedente |
| 12 | Material Desportivo | pág. 98, precedente |
| 13 | Comunicação | pág. 98, precedente |
| 14 | Despesas de representação | pág. 98, precedente |
| 15 | Limpeza, higiene e conforto | pág. 98, precedente |
| 16 | Relvados | pág. 98, precedente |
| 17 | Energia e Fluidos | pág. 98, Jev 1 |
| 18 | Serviços de catering | pág. 98, precedente |
| 19 | Outros fornecimentos e serviços | pág. 98, precedente |
| 20 | Remunerações dos Órgãos Sociais | pág. 99, Jev 1 |
| 21 | Remunerações de atletas e equipas técnicas | pág. 99, Jev 1 |
| 22 | Remunerações do pessoal | pág. 99, precedente |
| 23 | Benefícios pós-emprego | pág. 99, Jev 0.97 |
| 24 | Indemnizações | pág. 99, precedente |
| 25 | Encargos sobre remunerações | pág. 99, Jev 0.97 |
| 26 | Seguros de acidentes de trabalho e doenças profissionais | pág. 99, Jev 1 |
| 27 | Outros gastos com pessoal | pág. 99, precedente |
| 28 | Imparidade de inventários (perdas / reversões) | pág. 35, Jev 1 |
| 29 | Imparidade de dívidas a receber (perdas / reversões) | pág. 35, Jev 1 |
| 30 | Provisões (aumentos / reduções) | pág. 35, Jev 0.97 |
| 31 | Dívidas incobráveis | pág. 101, Jev 1 |
| 32 | Correções relativas a exercícios anteriores | pág. 101, Jev 1 |
| 33 | Impostos | pág. 101, Jev 0.92 |
| 34 | Penalizações Desportivas | pág. 101, Jev 0.93 |
| 35 | Multas/Dívidas Fiscais e não fiscais | pág. 101, precedente |
| 36 | Gastos com transferências de atletas de outras modalidades | pág. 101, precedente |
| 37 | Outros | pág. 101, Jev 1 |
| 38 | Ativos fixos tangíveis | pág. 101, Jev 1 |
| 39 | Propriedades de investimento | pág. 101, precedente |
| 40 | Outros ativos intangíveis | pág. 101, Jev 1 |
| 41 | Goodwill | pág. 101, Jev 0.99 |
| 42 | Amortizações de passes de jogadores | pág. 102, precedente |
| 43 | Perdas por imparidade com passes de jogadores | pág. 102, precedente |
| 44 | Custos com alienações de passes de jogadores (ii) | pág. 102, precedente |
| 45 | Custos com empréstimos de jogadores | pág. 102, precedente |
| 46 | Outros custos com jogadores | pág. 102, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 95, Jev 0.91 |
| 2 | Receitas associativas | pág. 95, Jev 1 |
| 3 | Prémios competições europeias | pág. 95, Jev 1 |
| 4 | Receita de bilheteira | pág. 95, precedente |
| 5 | Receita de lugares anuais | pág. 95, precedente |
| 6 | Outras receitas desportivas | pág. 95, precedente |
| 7 | Publicidade | pág. 95, precedente |
| 8 | Direitos de transmissões televisivas | pág. 95, Jev 1 |
| 9 | Outros | pág. 95, precedente |
| 10 | Subsídios à exploração | pág. 35, Jev 0.98 |
| 11 | Compensação por utilização de jogadores ao serviço de seleções nacionais | pág. 98, Jev 0.95 |
| 12 | Royalties | pág. 98, Jev 0.96 |
| 13 | Rendimentos de propriedades de investimento | pág. 98, Jev 0.98 |
| 14 | Imputação de subsídios para o investimento | pág. 98, Jev 1 |
| 15 | Outros rendimentos suplementares | pág. 98, Jev 1 |
| 16 | Correções relativas a exercícios anteriores | pág. 98, precedente |
| 17 | Reembolsos de sinistros | pág. 98, Jev 1 |
| 18 | Reembolsos de impostos | pág. 98, Jev 1 |
| 19 | Transferências de atletas de outras modalidades | pág. 98, precedente |
| 20 | Outros rendimentos e ganhos | pág. 98, Jev 0.97 |
| 21 | Proveitos com alienações de passes de jogadores (i) | pág. 99, precedente |
| 22 | Proveitos com empréstimos de jogadores | pág. 99, precedente |
| 23 | Outros proveitos com jogadores | pág. 99, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 35, Jev 0.99 |
| 2 | Trabalhos Especializados | pág. 96, precedente |
| 3 | Subcontratos | pág. 96, precedente |
| 4 | Rendas e Alugueres | pág. 96, precedente |
| 5 | Direitos de imagem de atletas | pág. 96, precedente |
| 6 | Vigilância e Segurança | pág. 96, precedente |
| 7 | Conservação e reparação | pág. 96, precedente |
| 8 | Publicidade e propaganda | pág. 96, precedente |
| 9 | Despesas de organização | pág. 96, precedente |
| 10 | Seguros | pág. 96, precedente |
| 11 | Honorários | pág. 96, precedente |
| 12 | Material Desportivo | pág. 96, precedente |
| 13 | Comunicação | pág. 96, precedente |
| 14 | Despesas de representação | pág. 96, precedente |
| 15 | Limpeza, higiene e conforto | pág. 96, precedente |
| 16 | Relvados | pág. 96, precedente |
| 17 | Energia e Fluidos | pág. 96, Jev 1 |
| 18 | Serviços de catering | pág. 96, precedente |
| 19 | Outros fornecimentos e serviços | pág. 96, precedente |
| 20 | Remunerações dos Órgãos Sociais | pág. 97, Jev 1 |
| 21 | Remunerações de atletas e equipas técnicas | pág. 97, Jev 1 |
| 22 | Remunerações do pessoal | pág. 97, precedente |
| 23 | Benefícios pós-emprego | pág. 97, Jev 0.97 |
| 24 | Indemnizações | pág. 97, precedente |
| 25 | Encargos sobre remunerações | pág. 97, Jev 0.97 |
| 26 | Seguros de acidentes de trabalho e doenças profissionais | pág. 97, Jev 1 |
| 27 | Outros gastos com pessoal | pág. 97, precedente |
| 28 | Imparidade de inventários (perdas / reversões) | pág. 35, Jev 1 |
| 29 | Imparidade de dívidas a receber (perdas / reversões) | pág. 35, Jev 1 |
| 30 | Provisões (aumentos / reduções) | pág. 35, Jev 0.97 |
| 31 | Correções relativas a exercícios anteriores | pág. 98, Jev 1 |
| 32 | Impostos | pág. 98, Jev 0.92 |
| 33 | Penalizações Desportivas | pág. 98, Jev 0.93 |
| 34 | Multas/Dividas Fiscais e não fiscais | pág. 98, precedente |
| 35 | Gastos com transferências de atletas de outras modalidades | pág. 98, precedente |
| 36 | Outros | pág. 98, Jev 1 |
| 37 | Ativos fixos tangíveis | pág. 99, Jev 1 |
| 38 | Propriedades de investimento | pág. 99, precedente |
| 39 | Outros ativos intangíveis | pág. 99, Jev 1 |
| 40 | Goodwill | pág. 99, Jev 0.99 |
| 41 | Amortizações de passes de jogadores | pág. 99, precedente |
| 42 | Perdas por imparidade com passes de jogadores | pág. 99, precedente |
| 43 | Custos com alienações de passes de jogadores (ii) | pág. 99, precedente |
| 44 | Custos com empréstimos de jogadores | pág. 99, precedente |
| 45 | Outros custos com jogadores | pág. 99, precedente |
| 46 | Resultados relativos a investimentos | pág. 35, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 36, Jev 0.94 |
| 2 | Subsídios à exploração | pág. 36, Jev 0.98 |
| 3 | Rendimentos de propriedades de investimento | pág. 99, Jev 0.98 |
| 4 | Imputação de subsídios para o investimento | pág. 99, Jev 1 |
| 5 | Outros rendimentos suplementares | pág. 99, Jev 1 |
| 6 | Correções relativas a exercícios anteriores | pág. 99, Jev 1 |
| 7 | Reembolsos de sinistros | pág. 99, Jev 1 |
| 8 | Reembolsos de impostos | pág. 99, Jev 1 |
| 9 | Transferências de atletas de outras modalidades | pág. 99, precedente |
| 10 | Mais-valias | pág. 99, ? 0.6 |
| 11 | Outros rendimentos e ganhos | pág. 99, Jev 0.97 |
| 12 | Proveitos com alienações de passes de jogadores | pág. 100, precedente |
| 13 | Proveitos com empréstimos de jogadores | pág. 100, precedente |
| 14 | Outros proveitos com jogadores | pág. 100, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 36, Jev 0.99 |
| 2 | Fornecimentos e serviços externos | pág. 36, Jev 0.99 |
| 3 | Gastos com o pessoal | pág. 36, precedente |
| 4 | Imparidade de inventários (perdas / reversões) | pág. 36, Jev 1 |
| 5 | Imparidade de dívidas a receber (perdas / reversões) | pág. 36, Jev 1 |
| 6 | Outros gastos e perdas | pág. 36, Jev 1 |
| 7 | Gastos / reversões de depreciação e de amortização | pág. 36, Claude 0.8 |
| 8 | Amortizações de passes de jogadores | pág. 100, precedente |
| 9 | Perdas por imparidade com passes de jogadores | pág. 100, precedente |
| 10 | Custos com alienações de passes de jogadores | pág. 100, precedente |
| 11 | Custos com empréstimos de jogadores | pág. 100, precedente |
| 12 | Outros custos com jogadores | pág. 100, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-16): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2017, 2018, 2019, 2022, 2023, 2024, 2025): Comercial / Sponsors, Estadio, Televisión, Premios por competencias
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 97, Jev 0.91 |
| 2 | Receitas associativas | pág. 97, Jev 1 |
| 3 | Prémios competições europeias | pág. 97, Jev 1 |
| 4 | Receita de bilheteira | pág. 97, precedente |
| 5 | Receita de lugares anuais | pág. 97, precedente |
| 6 | Outras receitas desportivas | pág. 97, precedente |
| 7 | Publicidade | pág. 97, precedente |
| 8 | Direitos de transmissões televisivas | pág. 97, Jev 1 |
| 9 | Outros | pág. 97, precedente |
| 10 | Subsídios à exploração | pág. 40, Jev 0.98 |
| 11 | Compensação de utilização de jogadores no Mundial 2018 | pág. 99, precedente |
| 12 | Rendimentos de propriedades de investimento | pág. 99, Jev 0.98 |
| 13 | Imputação de subsídios para o investimento | pág. 99, Jev 1 |
| 14 | Outros rendimentos suplementares | pág. 99, Jev 1 |
| 15 | Correções relativas a exercícios anteriores | pág. 99, precedente |
| 16 | Reembolsos de sinistros | pág. 99, Jev 1 |
| 17 | Reembolsos de impostos | pág. 99, Jev 1 |
| 18 | Outros rendimentos e ganhos | pág. 99, Jev 0.97 |
| 19 | Proveitos com alienações de passes de jogadores | pág. 101, precedente |
| 20 | Proveitos com empréstimos de jogadores | pág. 101, precedente |
| 21 | Outros proveitos com jogadores | pág. 101, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 40, Jev 0.99 |
| 2 | Trabalhos Especializados | pág. 98, precedente |
| 3 | Subcontratos | pág. 98, precedente |
| 4 | Rendas e Alugueres | pág. 98, precedente |
| 5 | Direitos de imagem de atletas | pág. 98, precedente |
| 6 | Vigilância e Segurança | pág. 98, precedente |
| 7 | Conservação e reparação | pág. 98, precedente |
| 8 | Publicidade e propaganda | pág. 98, precedente |
| 9 | Despesas de organização | pág. 98, precedente |
| 10 | Seguros | pág. 98, precedente |
| 11 | Honorários | pág. 98, precedente |
| 12 | Material Desportivo | pág. 98, precedente |
| 13 | Comunicação | pág. 98, precedente |
| 14 | Despesas de representação | pág. 98, precedente |
| 15 | Limpeza, higiene e conforto | pág. 98, precedente |
| 16 | Relvados | pág. 98, precedente |
| 17 | Energia e Fluídos | pág. 98, Jev 1 |
| 18 | Serviços de catering | pág. 98, precedente |
| 19 | Outros fornecimentos e serviços | pág. 98, precedente |
| 20 | Remunerações dos Órgãos Sociais | pág. 99, Jev 1 |
| 21 | Remunerações de atletas e equipas técnicas | pág. 99, Jev 1 |
| 22 | Remunerações do pessoal | pág. 99, precedente |
| 23 | Benefícios pós-emprego | pág. 99, Jev 0.97 |
| 24 | Indemnizações | pág. 99, precedente |
| 25 | Encargos sobre remunerações | pág. 99, Jev 0.97 |
| 26 | Seguros de acidentes de trabalho e doenças profissionais | pág. 99, Jev 1 |
| 27 | Outros gastos com pessoal | pág. 99, precedente |
| 28 | Imparidade de inventários (perdas / reversões) | pág. 40, Jev 1 |
| 29 | Imparidade de dívidas a receber (perdas / reversões) | pág. 40, Jev 1 |
| 30 | Provisões (aumentos / reduções) | pág. 40, Jev 0.97 |
| 31 | Dívidas incobráveis | pág. 100, Jev 1 |
| 32 | Correções relativas a exercícios anteriores | pág. 100, Jev 1 |
| 33 | Impostos | pág. 100, Jev 0.92 |
| 34 | Penalizações Desportivas | pág. 100, Jev 0.93 |
| 35 | Multas/Dividas Fiscais e não fiscais | pág. 100, precedente |
| 36 | Organização Taça Mundo e Europa de Bilhar | pág. 100, precedente |
| 37 | Outros | pág. 100, Jev 1 |
| 38 | Ativos fixos tangíveis | pág. 100, Jev 1 |
| 39 | Propriedades de investimento | pág. 100, precedente |
| 40 | Outros ativos intangíveis | pág. 100, Jev 1 |
| 41 | Goodwill | pág. 100, Jev 0.99 |
| 42 | Amortizações de passes de jogadores | pág. 101, precedente |
| 43 | Perdas por imparidade com passes de jogadores | pág. 101, precedente |
| 44 | Custos com alienações de passes de jogadores | pág. 101, precedente |
| 45 | Custos com empréstimos de jogadores | pág. 101, precedente |
| 46 | Outros custos com jogadores | pág. 101, precedente |
| 47 | Resultados relativos a investimentos | pág. 40, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2018–19 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Porto/relatorio-contas-consolidadas-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Porto/relatorio-contas-consolidadas-2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 93, Jev 0.91 |
| 2 | Receitas associativas | pág. 93, Jev 1 |
| 3 | Prémios competições europeias | pág. 93, Jev 1 |
| 4 | Receita de bilheteira | pág. 93, precedente |
| 5 | Receita de lugares anuais | pág. 93, precedente |
| 6 | Outras receitas desportivas | pág. 93, precedente |
| 7 | Publicidade | pág. 93, precedente |
| 8 | Direitos de transmissões televisivas | pág. 93, Jev 1 |
| 9 | Outros | pág. 93, precedente |
| 10 | Subsídios à exploração | pág. 36, Jev 0.98 |
| 11 | Compensação de utilização de jogadores no Mundial 2018 | pág. 95, precedente |
| 12 | Rendimentos de propriedades de investimento | pág. 95, Jev 0.98 |
| 13 | Imputação de subsídios para o investimento | pág. 95, Jev 1 |
| 14 | Outros rendimentos suplementares | pág. 95, Jev 1 |
| 15 | Correções relativas a exercícios anteriores | pág. 95, precedente |
| 16 | Reembolsos de sinistros | pág. 95, Jev 1 |
| 17 | Outros rendimentos e ganhos | pág. 95, Jev 0.97 |
| 18 | Proveitos com alienações de passes de jogadores | pág. 97, precedente |
| 19 | Proveitos com empréstimos de jogadores | pág. 97, precedente |
| 20 | Outros proveitos com jogadores | pág. 97, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 36, Jev 0.99 |
| 2 | Trabalhos Especializados | pág. 94, precedente |
| 3 | Subcontratos | pág. 94, precedente |
| 4 | Rendas e Alugueres | pág. 94, precedente |
| 5 | Direitos de imagem de atletas | pág. 94, precedente |
| 6 | Vigilância e Segurança | pág. 94, precedente |
| 7 | Conservação e reparação | pág. 94, precedente |
| 8 | Publicidade e propaganda | pág. 94, precedente |
| 9 | Despesas de organização | pág. 94, precedente |
| 10 | Seguros | pág. 94, precedente |
| 11 | Honorários | pág. 94, precedente |
| 12 | Material Desportivo | pág. 94, precedente |
| 13 | Comunicação | pág. 94, precedente |
| 14 | Despesas de representação | pág. 94, precedente |
| 15 | Limpeza, higiene e conforto | pág. 94, precedente |
| 16 | Relvados | pág. 94, precedente |
| 17 | Energia e Fluidos | pág. 94, Jev 1 |
| 18 | Serviços de catering | pág. 94, precedente |
| 19 | Outros fornecimentos e serviços | pág. 94, precedente |
| 20 | Remunerações dos Órgãos Sociais | pág. 95, Jev 1 |
| 21 | Remunerações de atletas e equipas técnicas | pág. 95, Jev 1 |
| 22 | Remunerações do pessoal | pág. 95, precedente |
| 23 | Benefícios pós-emprego | pág. 95, Jev 0.97 |
| 24 | Indemnizações | pág. 95, precedente |
| 25 | Encargos sobre remunerações | pág. 95, Jev 0.97 |
| 26 | Seguros de acidentes de trabalho e doenças profissionais | pág. 95, Jev 1 |
| 27 | Outros gastos com pessoal | pág. 95, precedente |
| 28 | Imparidade de inventários (perdas / reversões) | pág. 36, Jev 1 |
| 29 | Imparidade de dívidas a receber (perdas / reversões) | pág. 36, Jev 1 |
| 30 | Provisões (aumentos / reduções) | pág. 36, Jev 0.97 |
| 31 | Dívidas incobráveis | pág. 96, Jev 1 |
| 32 | Correções relativas a exercícios anteriores | pág. 96, Jev 1 |
| 33 | Impostos | pág. 96, Jev 0.92 |
| 34 | Penalizações Desportivas | pág. 96, Jev 0.93 |
| 35 | Multas/Dividas Fiscais e não fiscais | pág. 96, precedente |
| 36 | Outros | pág. 96, Jev 1 |
| 37 | Ativos fixos tangíveis | pág. 96, Jev 1 |
| 38 | Propriedades de investimento | pág. 96, precedente |
| 39 | Outros ativos intangíveis | pág. 96, Jev 1 |
| 40 | Goodwill | pág. 96, Jev 0.99 |
| 41 | Amortizações de passes de jogadores | pág. 97, precedente |
| 42 | Perdas por imparidade com passes de jogadores | pág. 97, precedente |
| 43 | Custos com alienações de passes de jogadores | pág. 97, precedente |
| 44 | Custos com empréstimos de jogadores | pág. 97, precedente |
| 45 | Outros custos com jogadores | pág. 97, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Otras secciones deportivas. Las modalidades del club no tienen fila propia: sus ingresos vienen mezclados en 'Outras receitas desportivas' (con Taça, pretemporada y Dragon Force) y sus gastos dentro de FSE y personal; no se pueden separar sin inventar (subagente Sonnet, revisado por Claude).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2017–18 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Porto".
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

### porto-pt-relatorio-contas-consolidadas-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-relatorio-contas-consolidadas-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-relatorio-contas-consolidadas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-relatorio-contas-consolidadas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-relatorio-contas-consolidadas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/relatorio-contas-consolidadas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### porto-pt-wf-2023-2024-293efed8

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Porto/wf-2023-2024-293efed8.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
