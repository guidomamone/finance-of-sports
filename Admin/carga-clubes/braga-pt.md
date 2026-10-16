# braga-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/braga-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Braga: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Braga/relatorio-contas-2024-25.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Portugal/Braga.md; tools/cargar-lote.mjs).
```

```text
data/pt/braga-pt-data.js — Sporting Clube de Braga – Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Braga/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "braga-pt" — slug de "Braga" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Sporting Clube de Braga – Futebol, SAD" — respuesta de Guido en la cola (ad8c9aa)
  displayName        ok        "Braga" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (409 de 411 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 138 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] rb bragantino: #D2003C Crimson Red, #FFCC00 Yellow, #FFFFFF White, #001D46 Black
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (409 de 411 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-15): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "braga-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Braga"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"braga-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Braga/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Braga/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 125, Jev 1 |
| 2 | Receita de bilheteira | pág. 125, Jev 0.99 |
| 3 | Pacotes corporate | pág. 125, Jev 0.99 |
| 4 | Direitos de transmissões | pág. 125, Jev 1 |
| 5 | Publicidade / Patrocínios | pág. 125, Jev 1 |
| 6 | Outros | pág. 125, precedente |
| 7 | Subsídios à exploração | pág. 77, Jev 0.98 |
| 8 | Participação em competições europeias | pág. 131, Jev 1 |
| 9 | Participação em competições nacionais | pág. 131, Jev 1 |
| 10 | Rendimentos com alienações de direitos de atletas | pág. 131, Jev 1 |
| 11 | Outros ganhos com operações de atletas | pág. 131, precedente |
| 12 | Empréstimo de atletas | pág. 131, Claude 0.85 |
| 13 | Cedência de atletas a seleções nacionais | pág. 131, precedente |
| 14 | Mecanismo de solidariedade e direitos de formação | pág. 131, precedente |
| 15 | Receitas de apostas desportivas | pág. 131, Jev 1 |
| 16 | Indemnizações | pág. 131, Claude 0.8 |
| 17 | Outros | pág. 131, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 77, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 127, Jev 0.99 |
| 3 | Gastos com aquisição de atletas | pág. 127, Jev 0.98 |
| 4 | Despesas com provas | pág. 127, Jev 1 |
| 5 | Inscrições e registos | pág. 127, Jev 0.96 |
| 6 | Vigilância e segurança | pág. 127, Jev 0.96 |
| 7 | Honorários | pág. 127, Jev 1 |
| 8 | Conservação e reparação | pág. 127, Jev 0.98 |
| 9 | Serviços bancários | pág. 127, Jev 0.98 |
| 10 | Ferramentas e utensílios de desgaste rápido | pág. 127, Jev 1 |
| 11 | Equipamento e material desportivo | pág. 127, Jev 1 |
| 12 | Outros | pág. 127, Jev 1 |
| 13 | Eletricidade | pág. 127, Jev 1 |
| 14 | Combustíveis | pág. 127, Jev 0.98 |
| 15 | Água | pág. 127, Jev 0.99 |
| 16 | Deslocações e estadas | pág. 127, Jev 1 |
| 17 | Corporate (catering) | pág. 127, Jev 0.91 |
| 18 | Rendas / Direitos Exploração | pág. 127, precedente |
| 19 | Comunicação | pág. 127, Jev 1 |
| 20 | Royalties | pág. 127, Jev 1 |
| 21 | Seguros | pág. 127, Claude 0.8 |
| 22 | Contencioso e notariado | pág. 127, Jev 1 |
| 23 | Limpeza, higiene e conforto | pág. 127, Jev 1 |
| 24 | Pessoal do SCB ao serviço da SAD | pág. 127, precedente |
| 25 | Remuneração da Comissão Executiva | pág. 129, Claude 0.8 |
| 26 | Senhas de presença | pág. 129, Claude 0.8 |
| 27 | Atletas | pág. 129, Jev 0.91 |
| 28 | Treinadores | pág. 129, Jev 0.95 |
| 29 | Staff Geral | pág. 129, precedente |
| 30 | Prémios de assinatura | pág. 129, precedente |
| 31 | Prémios de desempenho | pág. 129, Jev 0.98 |
| 32 | Indemnizações | pág. 129, precedente |
| 33 | Encargos com remunerações | pág. 129, Jev 0.96 |
| 34 | Seguros de acidentes de trabalho | pág. 129, Jev 0.92 |
| 35 | Outros Gastos | pág. 129, Jev 0.99 |
| 36 | Imparidade de dívidas a receber (perdas/reversões) | pág. 77, Jev 0.98 |
| 37 | Imparidade de inventários (perdas/reversões) | pág. 77, Jev 1 |
| 38 | Provisões (aumentos/reduções) | pág. 77, Jev 0.98 |
| 39 | Impostos | pág. 134, Jev 0.95 |
| 40 | Abates | pág. 134, precedente |
| 41 | Empréstimo de atletas | pág. 134, precedente |
| 42 | Direitos de formação e mecanismo de solidariedade | pág. 134, precedente |
| 43 | Multas / Penalidades desportivas | pág. 134, Jev 0.93 |
| 44 | Outros | pág. 134, Jev 1 |
| 45 | Edifícios e outras construções | pág. 135, Jev 1 |
| 46 | Equipamento básico | pág. 135, Jev 1 |
| 47 | Equipamento de transporte | pág. 135, Jev 0.97 |
| 48 | Equipamento administrativo | pág. 135, Jev 0.96 |
| 49 | Plantel | pág. 135, Claude 0.9 |
| 50 | Direitos de superfície | pág. 135, precedente |
| 51 | Outros ativos intangíveis | pág. 135, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Braga".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Braga/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Braga/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 112, precedente |
| 2 | Receita de bilheteira | pág. 112, precedente |
| 3 | Pacotes corporate | pág. 112, precedente |
| 4 | Direitos de transmissões | pág. 112, precedente |
| 5 | Publicidade / Patrocínios | pág. 112, precedente |
| 6 | Outros | pág. 112, precedente |
| 7 | Subsídios à exploração | pág. 67, precedente |
| 8 | Participação em competições europeias | pág. 119, precedente |
| 9 | Participação em competições nacionais | pág. 119, precedente |
| 10 | Rendimentos com transações atletas | pág. 119, Jev 1 |
| 11 | Empréstimo de atletas | pág. 119, precedente |
| 12 | Ganhos em rescisões de contratos | pág. 119, ? 0.6 |
| 13 | Receitas de apostas desportivas | pág. 119, precedente |
| 14 | Indemnizações | pág. 119, precedente |
| 15 | Outros | pág. 119, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 67, precedente |
| 2 | Trabalhos especializados | pág. 114, precedente |
| 3 | Gastos com aquisição de atletas | pág. 114, precedente |
| 4 | Publicidade e propaganda | pág. 114, Jev 1 |
| 5 | Despesas com provas | pág. 114, precedente |
| 6 | Inscrições e registos | pág. 114, precedente |
| 7 | Vigilância e segurança | pág. 114, precedente |
| 8 | Honorários | pág. 114, precedente |
| 9 | Conservação e reparação | pág. 114, precedente |
| 10 | Outros serviços especializados | pág. 114, Jev 0.9 |
| 11 | Ferramentas e utensílios de desgaste rápido | pág. 114, precedente |
| 12 | Material de escritório | pág. 114, Jev 1 |
| 13 | Artigos para oferta | pág. 114, Jev 0.98 |
| 14 | Equipamento e material desportivo | pág. 114, precedente |
| 15 | Outros | pág. 114, precedente |
| 16 | Eletricidade | pág. 114, precedente |
| 17 | Combustíveis | pág. 114, precedente |
| 18 | Água | pág. 114, precedente |
| 19 | Deslocações e estadas | pág. 114, precedente |
| 20 | Corporate (catering) | pág. 114, precedente |
| 21 | Rendas / Direitos de exploração | pág. 114, Jev 0.92 |
| 22 | Comunicação | pág. 114, precedente |
| 23 | Seguros | pág. 114, precedente |
| 24 | Contencioso e notariado | pág. 114, precedente |
| 25 | Limpeza, higiene e conforto | pág. 114, precedente |
| 26 | Pessoal do SCB ao serviço da SAD | pág. 114, precedente |
| 27 | Remuneração da Comissão Executiva | pág. 117, precedente |
| 28 | Senhas de presença | pág. 117, precedente |
| 29 | Atletas | pág. 117, precedente |
| 30 | Treinadores | pág. 117, precedente |
| 31 | Staff Geral | pág. 117, precedente |
| 32 | Prémios de desempenho | pág. 117, precedente |
| 33 | Rescisão de contratos | pág. 117, precedente |
| 34 | Encargos com remunerações | pág. 117, precedente |
| 35 | Seguro de acidentes de trabalho | pág. 117, precedente |
| 36 | Outros gastos com pessoal | pág. 117, precedente |
| 37 | Imparidade de inventários (perdas/reversões) | pág. 67, precedente |
| 38 | Provisões (aumentos/reduções) | pág. 67, precedente |
| 39 | Impostos | pág. 123, precedente |
| 40 | Abates | pág. 123, precedente |
| 41 | Direitos de preferência | pág. 123, Jev 0.96 |
| 42 | Empréstimo de atletas | pág. 123, precedente |
| 43 | Direitos de formação e mecanismo de solidariedade | pág. 123, precedente |
| 44 | Gastos com transações atletas | pág. 123, Jev 1 |
| 45 | Multas / Penalidades desportivas | pág. 123, precedente |
| 46 | Protocolo futebol feminino | pág. 123, Jev 0.99 |
| 47 | Donativos | pág. 123, Jev 1 |
| 48 | Outros | pág. 123, precedente |
| 49 | Edifícios e outras construções | pág. 125, precedente |
| 50 | Equipamento básico | pág. 125, precedente |
| 51 | Equipamento de transporte | pág. 125, precedente |
| 52 | Equipamento administrativo | pág. 125, precedente |
| 53 | Plantel | pág. 125, precedente |
| 54 | Direitos de superfície | pág. 125, precedente |
| 55 | Outros ativos intangíveis | pág. 125, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Braga".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Braga/relatorio-contas-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Braga/relatorio-contas-2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de mercadorias (merchandising) | pág. 69, Jev 0.99 |
| 2 | Receita de bilheteira | pág. 69, Jev 0.99 |
| 3 | Direitos de transmissões | pág. 69, Jev 1 |
| 4 | Publicidade / Patrocínios | pág. 69, Jev 1 |
| 5 | Pacotes corporate | pág. 69, Jev 0.99 |
| 6 | Outros | pág. 69, precedente |
| 7 | Participação em competições europeias | pág. 84, Jev 1 |
| 8 | Participação em competições nacionais | pág. 84, Jev 1 |
| 9 | EURO 2016 (cedência de atletas) | pág. 84, Jev 0.92 |
| 10 | Rend. / (gastos) com transações atletas | pág. 84, Jev 0.99 |
| 11 | Empréstimo de atletas | pág. 84, Claude 0.85 |
| 12 | Indemnizações | pág. 84, Jev 1 |
| 13 | Outros | pág. 84, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 41, precedente |
| 2 | Trabalhos especializados | pág. 82, Jev 0.99 |
| 3 | Publicidade e propaganda | pág. 82, Jev 1 |
| 4 | Despesas com provas | pág. 82, Jev 1 |
| 5 | Vigilância e segurança | pág. 82, Jev 0.96 |
| 6 | Honorários | pág. 82, Jev 1 |
| 7 | Comissões | pág. 82, precedente |
| 8 | Conservação e reparação | pág. 82, Jev 0.98 |
| 9 | Outros serviços especializados | pág. 82, precedente |
| 10 | Ferramentas e utensílios de desgaste rápido | pág. 82, Jev 1 |
| 11 | Livros e documentação técnica | pág. 82, Jev 1 |
| 12 | Material de escritório | pág. 82, Jev 1 |
| 13 | Equipamento e material desportivo | pág. 82, Jev 1 |
| 14 | Outros | pág. 82, Jev 1 |
| 15 | Electricidade | pág. 82, Jev 1 |
| 16 | Combustíveis | pág. 82, Jev 0.98 |
| 17 | Água | pág. 82, Jev 0.99 |
| 18 | Deslocações e estadas | pág. 82, Jev 1 |
| 19 | Corporate (catering) | pág. 82, Jev 0.91 |
| 20 | Rendas e alugueres | pág. 82, precedente |
| 21 | Comunicação | pág. 82, Jev 1 |
| 22 | Seguros | pág. 82, Claude 0.8 |
| 23 | Contencioso e notariado | pág. 82, Jev 1 |
| 24 | Limpeza, higiene e conforto | pág. 82, Jev 1 |
| 25 | Pessoal do SCB ao serviço da SAD | pág. 82, precedente |
| 26 | Remuneração da Comissão Executiva | pág. 79, Claude 0.8 |
| 27 | Senhas de Presença CA | pág. 79, Jev 0.95 |
| 28 | Remuneração do pessoal | pág. 79, precedente |
| 29 | Prémios de desempenho | pág. 79, Jev 0.98 |
| 30 | Rescisão de contratos | pág. 79, precedente |
| 31 | Encargos com remunerações | pág. 79, Jev 0.96 |
| 32 | Seguro de acidentes de trabalho | pág. 79, Jev 0.99 |
| 33 | Outros gastos com pessoal | pág. 79, precedente |
| 34 | Imparidade de dívidas a receber (perdas/reversões) | pág. 41, Jev 0.98 |
| 35 | Impostos | pág. 85, Jev 0.95 |
| 36 | Gastos e perdas investim. não financeiros | pág. 85, Jev 1 |
| 37 | Empréstimo de atletas | pág. 85, precedente |
| 38 | Direitos de formação | pág. 85, precedente |
| 39 | Penalidades Desportivas | pág. 85, precedente |
| 40 | Outros | pág. 85, Jev 1 |
| 41 | Gastos/reversões de depreciação e de amortização | pág. 41, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2016–17 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Braga".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Braga/relatorio-contas-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Braga/relatorio-contas-2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de mercadorias (merchandising) | pág. 72, Jev 1 |
| 2 | Receita de bilheteira | pág. 72, precedente |
| 3 | Direitos de transmissões | pág. 72, precedente |
| 4 | Publicidade / Patrocínios | pág. 72, precedente |
| 5 | Pacotes corporate | pág. 72, precedente |
| 6 | Outros | pág. 72, precedente |
| 7 | Participação em competições europeias | pág. 72, precedente |
| 8 | Participação em competições nacionais | pág. 72, precedente |
| 9 | Rend. / (gastos) com trans. passes atletas | pág. 84, Jev 1 |
| 10 | Empréstimo de atletas | pág. 84, precedente |
| 11 | Indemnizações | pág. 84, precedente |
| 12 | Outros | pág. 84, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 45, precedente |
| 2 | Trabalhos especializados | pág. 85, precedente |
| 3 | Despesas com provas | pág. 85, precedente |
| 4 | Vigilância e segurança | pág. 85, precedente |
| 5 | Honorários | pág. 85, precedente |
| 6 | Comissões | pág. 85, precedente |
| 7 | Conservação e reparação | pág. 85, precedente |
| 8 | Outros serviços especializados | pág. 85, Jev 0.9 |
| 9 | Ferramentas e utensílios de desgaste rápido | pág. 85, precedente |
| 10 | Livros e documentação técnica | pág. 85, Jev 1 |
| 11 | Material de escritório | pág. 85, Jev 1 |
| 12 | Equipamento e material desportivo | pág. 85, precedente |
| 13 | Outros | pág. 85, precedente |
| 14 | Electricidade | pág. 85, precedente |
| 15 | Combustíveis | pág. 85, precedente |
| 16 | Água | pág. 85, precedente |
| 17 | Deslocações e estadas | pág. 85, precedente |
| 18 | Rendas e alugueres | pág. 85, precedente |
| 19 | Comunicação | pág. 85, precedente |
| 20 | Seguros | pág. 85, precedente |
| 21 | Contencioso e notariado | pág. 85, precedente |
| 22 | Limpeza, higiene e conforto | pág. 85, precedente |
| 23 | Pessoal do SCB ao serviço da SAD | pág. 85, precedente |
| 24 | Remunerações do pessoal | pág. 82, Claude 0.85 |
| 25 | Prémios de desempenho | pág. 82, precedente |
| 26 | Encargos sobre Remunerações | pág. 82, Jev 0.96 |
| 27 | Seguro Ac. Trab. e Doenças Profi. | pág. 82, Claude 0.92 |
| 28 | Senhas de presença CA | pág. 82, Jev 0.97 |
| 29 | Outros gastos com pessoal | pág. 82, precedente |
| 30 | Impostos | pág. 86, precedente |
| 31 | Gastos e perdas investim. não financeiros | pág. 86, Jev 1 |
| 32 | Empréstimo de atletas | pág. 86, precedente |
| 33 | Direitos de formação | pág. 86, precedente |
| 34 | Penalidades Desportivas | pág. 86, precedente |
| 35 | Outros | pág. 86, precedente |
| 36 | Valor do plantel | pág. 66, Claude 0.93 |
| 37 | Programas de computador | pág. 66, Jev 0.98 |
| 38 | Edifícios e outras construções | pág. 70, precedente |
| 39 | Equipamento básico | pág. 70, precedente |
| 40 | Equipamento de transporte | pág. 70, precedente |
| 41 | Equipamento administrativo | pág. 70, precedente |
| 42 | Outros ativos fixos tangíveis | pág. 70, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2015–16 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Braga".
```

## Fuentes

### braga-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Braga/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### braga-pt-relatorio-contas-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Braga/relatorio-contas-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### braga-pt-relatorio-contas-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Braga/relatorio-contas-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### braga-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Braga/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
