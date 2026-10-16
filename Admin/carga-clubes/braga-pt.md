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
