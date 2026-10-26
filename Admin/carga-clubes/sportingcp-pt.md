# sportingcp-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/sportingcp-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Sporting CP: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.pdf. brandColor #008057
(procedencia en Admin/sourcing/Portugal/Sporting CP.md; tools/cargar-lote.mjs).
```

```text
data/pt/sportingcp-pt-data.js — SPORTING - Sociedade Desportiva de Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "sportingcp-pt" — slug de "Sporting CP" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "SPORTING - Sociedade Desportiva de Futebol, SAD" — respuesta de Guido en la cola (596d838): aceptó la propuesta
  displayName        ok        "Sporting CP" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — el documento más reciente del club (relatorio-contas-2024-25.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 7: 1999,2000,2001,2003 / mes 6: 200
  sport              ok        "futbol" — el .md nombra el fútbol 304 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (230 de 237 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-15): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "sportingcp-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"sportingcp-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Participação na fase de liga - Liga dos Campeões | pág. 145, Jev 0.98 |
| 2 | Value Pillar - Liga dos Campeões | pág. 145, Claude 0.85 |
| 3 | Prémio de performance na Liga dos Campeões | pág. 145, Jev 1 |
| 4 | Outros | pág. 145, precedente |
| 5 | Direitos televisivos - Competições nacionais | pág. 145, Jev 1 |
| 6 | Outros direitos televisivos | pág. 145, Jev 0.99 |
| 7 | Outros | pág. 145, precedente |
| 8 | Patrocínios e Publicidade | pág. 145, Jev 1 |
| 9 | Merchandising | pág. 145, Jev 1 |
| 10 | Outros | pág. 145, precedente |
| 11 | Bilheteira | pág. 145, Jev 1 |
| 12 | Bilhetes de época | pág. 145, Jev 1 |
| 13 | Camarotes | pág. 145, precedente |
| 14 | Business Seats | pág. 145, precedente |
| 15 | Outros | pág. 145, precedente |
| 16 | Venda de direitos desportivos | pág. 151, Jev 1 |
| 17 | Mecanismo de solidariedade/Compensação por formação | pág. 151, precedente |
| 18 | Cedência de jogadores | pág. 151, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 125, precedente |
| 2 | Refeições | pág. 147, precedente |
| 3 | Assistência aos jogos | pág. 147, Jev 0.91 |
| 4 | Electricidade | pág. 147, Jev 0.99 |
| 5 | Vigilância | pág. 147, precedente |
| 6 | Limpeza | pág. 147, Jev 0.99 |
| 7 | Patrocínios e publicidade | pág. 147, Jev 0.91 |
| 8 | Logística | pág. 147, Jev 0.99 |
| 9 | Manutenções | pág. 147, Jev 0.9 |
| 10 | Outros | pág. 147, Jev 0.9 |
| 11 | Organização, deslocações e estadias de jogos | pág. 147, Jev 1 |
| 12 | Trabalhos especializados | pág. 147, Jev 0.99 |
| 13 | Publicidade e Propaganda | pág. 147, Jev 1 |
| 14 | Honorários | pág. 147, Jev 1 |
| 15 | Rendas e alugueres | pág. 147, precedente |
| 16 | Royalties | pág. 147, precedente |
| 17 | Aquisição de jogadores | pág. 148, Jev 0.9 |
| 18 | Outras comissões | pág. 148, Jev 0.99 |
| 19 | Comunicações | pág. 147, Jev 0.99 |
| 20 | Combustíveis | pág. 147, Jev 0.99 |
| 21 | Seguros | pág. 147, Claude 0.85 |
| 22 | Conservação e reparação | pág. 147, Jev 0.99 |
| 23 | Equipamentos Desportivos | pág. 147, precedente |
| 24 | Outros | pág. 147, Jev 0.9 |
| 25 | Remuneração dos órgãos sociais | pág. 148, Jev 1 |
| 26 | Remuneração do pessoal | pág. 148, precedente |
| 27 | Encargos com remunerações | pág. 148, Jev 0.97 |
| 28 | Seguros | pág. 148, Claude 0.85 |
| 29 | Prémios de desempenho e de performance desportiva | pág. 148, Jev 1 |
| 30 | Indemnizações | pág. 148, precedente |
| 31 | Outros | pág. 148, Jev 0.9 |
| 32 | Depreciações e amortizações excluindo plantel | pág. 125, Jev 0.98 |
| 33 | Provisões para outros riscos e encargos | pág. 149, precedente |
| 34 | Imparidade de outros devedores | pág. 149, Jev 0.93 |
| 35 | Imparidade de inventários | pág. 149, Jev 0.99 |
| 36 | Imparidade de clientes | pág. 149, Jev 0.99 |
| 37 | Multas e penalidades | pág. 150, Jev 0.99 |
| 38 | Quotizações | pág. 150, Jev 0.92 |
| 39 | Prospecção de mercado | pág. 150, Jev 0.96 |
| 40 | Impostos | pág. 150, Claude 0.88 |
| 41 | Juros de mora | pág. 150, Jev 1 |
| 42 | Outros | pág. 150, Jev 0.9 |
| 43 | Amortizações do exercício | pág. 150, Claude 0.95 |
| 44 | Perdas por imparidade | pág. 150, Claude 0.93 |
| 45 | Percentagem dos direitos económicos/mais-valias | pág. 151, precedente |
| 46 | Comissões | pág. 151, precedente |
| 47 | Cedência de jogadores | pág. 151, Jev 0.98 |
| 48 | Mecanismo de solidariedade/Compensação por formação | pág. 151, precedente |
| 49 | Outros/Abates | pág. 151, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 124 + "Financiamentos obtidos" pág. 124; cash escalón 1b (compuerta: documento anterior): "Caixa e equivalentes de caixa" pág. 124
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Loja Verde | pág. 120, Jev 0.97 |
| 2 | Distribuição/Retalho | pág. 120, Jev 0.97 |
| 3 | Loja Verde Online | pág. 120, Jev 0.97 |
| 4 | Direitos televisivos | pág. 120, Jev 1 |
| 5 | Market Pool da Liga Europa | pág. 120, precedente |
| 6 | Outros direitos televisivos | pág. 120, Jev 0.99 |
| 7 | Bilhetes de época | pág. 121, Jev 1 |
| 8 | Camarotes | pág. 121, precedente |
| 9 | Bilheteira Liga Nacional | pág. 121, Jev 1 |
| 10 | Business Seats | pág. 121, precedente |
| 11 | Bilheteira Liga Europa | pág. 121, Jev 1 |
| 12 | Bilheteira Taça de Portugal | pág. 121, Jev 1 |
| 13 | Lugares de Leão e VIP | pág. 121, precedente |
| 14 | Bilheteira Jogos particulares | pág. 121, Jev 1 |
| 15 | Bilheteira Taça da Liga | pág. 121, Jev 0.96 |
| 16 | Outros | pág. 121, precedente |
| 17 | Patrocínios e Publicidade | pág. 120, Jev 1 |
| 18 | Outros | pág. 120, precedente |
| 19 | Prémio de performance pela participação na Liga Europa | pág. 121, Jev 1 |
| 20 | Prémio de performance na fase de Grupos da Liga Europa | pág. 121, Jev 1 |
| 21 | Passagem ao play-off da Liga Europa | pág. 121, Jev 0.99 |
| 22 | Outros prémios | pág. 121, Jev 0.99 |
| 23 | Participação nas Competições Nacionais | pág. 121, Jev 1 |
| 24 | Participação em Competições Particulares | pág. 121, Jev 0.94 |
| 25 | Cedência e rendimentos com jogadores | pág. 121, Jev 0.97 |
| 26 | Recuperação de custos | pág. 121, Jev 1 |
| 27 | Subsidios à exploração | pág. 121, Jev 0.97 |
| 28 | Outros | pág. 121, precedente |
| 29 | Venda de direitos desportivos | pág. 126, Jev 1 |
| 30 | Mecanismo de solidariedade/Compensação por formação | pág. 126, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 97, precedente |
| 2 | Refeições | pág. 123, precedente |
| 3 | Assistencia aos jogos | pág. 123, Jev 0.91 |
| 4 | Vigilância | pág. 123, precedente |
| 5 | Manutenções | pág. 123, Jev 0.9 |
| 6 | Electricidade | pág. 123, Jev 0.99 |
| 7 | Limpeza | pág. 123, Jev 0.99 |
| 8 | Patrocinios e publicidade | pág. 123, Jev 0.91 |
| 9 | Outros | pág. 123, Jev 0.9 |
| 10 | Organização, deslocações e estadias de jogos | pág. 122, Jev 1 |
| 11 | Trabalhos especializados | pág. 122, Jev 0.99 |
| 12 | Royalties | pág. 122, precedente |
| 13 | Honorários | pág. 122, Jev 1 |
| 14 | Publicidade e Propaganda | pág. 122, Jev 1 |
| 15 | Aquisição de jogadores | pág. 123, Jev 0.9 |
| 16 | Cedência de jogadores | pág. 123, Jev 0.98 |
| 17 | Outras comissões | pág. 123, Jev 0.99 |
| 18 | Rendas e alugueres | pág. 122, precedente |
| 19 | Comunicações | pág. 122, Jev 0.99 |
| 20 | Seguros | pág. 122, Claude 0.85 |
| 21 | Conservação e reparação | pág. 122, Jev 0.99 |
| 22 | Combustíveis | pág. 122, Jev 0.99 |
| 23 | Equipamentos Desportivos | pág. 122, precedente |
| 24 | Outros | pág. 122, Jev 0.9 |
| 25 | Remuneração dos órgãos sociais | pág. 124, Jev 1 |
| 26 | Remuneração do pessoal | pág. 124, precedente |
| 27 | Encargos com remunerações | pág. 124, Jev 0.97 |
| 28 | Seguros | pág. 124, Claude 0.85 |
| 29 | Prémios de desempenho e de performance desportiva | pág. 124, Jev 1 |
| 30 | Indemnizações | pág. 124, precedente |
| 31 | Outros | pág. 124, Jev 0.9 |
| 32 | Depreciações e amortizações excluindo plantel | pág. 97, Jev 0.98 |
| 33 | Imparidade de clientes | pág. 125, Jev 0.99 |
| 34 | Provisões para outros riscos e encargos | pág. 125, precedente |
| 35 | Quotizações | pág. 125, Jev 0.92 |
| 36 | Multas e penalidades | pág. 125, Jev 0.99 |
| 37 | Impostos | pág. 125, Claude 0.88 |
| 38 | Cedência de jogadores | pág. 125, Jev 0.98 |
| 39 | Prospecção de mercado | pág. 125, Jev 0.96 |
| 40 | Juros de mora | pág. 125, Jev 1 |
| 41 | Outros | pág. 125, Jev 0.9 |
| 42 | Amortizações do exercício | pág. 125, Claude 0.95 |
| 43 | Perdas por imparidade | pág. 125, Claude 0.93 |
| 44 | Percentagem dos direitos económicos/mais-valias | pág. 126, precedente |
| 45 | Comissões | pág. 126, precedente |
| 46 | Mecanismo de solidariedade/Compensação por formação | pág. 126, precedente |
| 47 | Outros/Abates | pág. 126, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 96 + "Financiamentos obtidos" pág. 96; cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 96
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Loja Verde | pág. 116, Jev 0.97 |
| 2 | Distribuição/Retalho | pág. 116, Jev 0.97 |
| 3 | Loja Verde Online | pág. 116, Jev 0.97 |
| 4 | Direitos televisivos | pág. 117, Jev 1 |
| 5 | Market Pool da Liga dos Campeões | pág. 117, precedente |
| 6 | Market Pool da Liga Europa | pág. 117, precedente |
| 7 | Outros direitos televisivos | pág. 117, Jev 0.99 |
| 8 | Bilhetes de época | pág. 117, Jev 1 |
| 9 | Camarotes | pág. 117, precedente |
| 10 | Bilheteira Liga Nacional | pág. 117, Jev 1 |
| 11 | Bilheteira Liga Europa | pág. 117, Jev 1 |
| 12 | Bilheteira Liga dos Campeões | pág. 117, Jev 1 |
| 13 | Business Seats | pág. 117, precedente |
| 14 | Lugares de Leão e VIP | pág. 117, precedente |
| 15 | Bilheteira Jogos particulares | pág. 117, Jev 1 |
| 16 | Bilheteira Taça da Liga | pág. 117, Jev 0.96 |
| 17 | Bilheteira Taça de Portugal | pág. 117, Jev 1 |
| 18 | Outros | pág. 117, precedente |
| 19 | Patrocínios e Publicidade | pág. 116, Jev 1 |
| 20 | Outros | pág. 116, precedente |
| 21 | Participação na fase de grupos - Liga dos Campeões | pág. 118, Jev 0.99 |
| 22 | Prémio de performance na fase de Grupos da Liga dos Campeões | pág. 118, Jev 1 |
| 23 | Prémio de performance pela participação na Liga Europa | pág. 118, Jev 1 |
| 24 | Outros prémios | pág. 118, Jev 0.99 |
| 25 | Participação nas Competições Nacionais | pág. 118, Jev 1 |
| 26 | Cedência de jogadores | pág. 118, precedente |
| 27 | Prémio Mundial 2022 | pág. 118, Jev 1 |
| 28 | Subsídios à exploração | pág. 118, Jev 0.97 |
| 29 | Recuperação de custos | pág. 118, Jev 1 |
| 30 | Outros | pág. 118, precedente |
| 31 | Venda de direitos desportivos | pág. 123, Jev 1 |
| 32 | Mecanismo de solidariedade/Compensação por formação | pág. 123, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 93, precedente |
| 2 | Refeições | pág. 119, precedente |
| 3 | Assistencia aos jogos | pág. 119, Jev 0.91 |
| 4 | Vigilância | pág. 119, precedente |
| 5 | Manutenções | pág. 119, Jev 0.9 |
| 6 | Electricidade | pág. 119, Jev 0.99 |
| 7 | Patrocinios e publicidade | pág. 119, Jev 0.91 |
| 8 | Limpeza | pág. 119, Jev 0.99 |
| 9 | Outros | pág. 119, Jev 0.9 |
| 10 | Trabalhos especializados | pág. 119, Jev 0.99 |
| 11 | Organização, deslocações e estadias de jogos | pág. 119, Jev 1 |
| 12 | Royalties | pág. 119, precedente |
| 13 | Honorários | pág. 119, Jev 1 |
| 14 | Cedência de jogadores | pág. 120, Jev 0.98 |
| 15 | Aquisição de jogadores | pág. 120, Jev 0.9 |
| 16 | Outras comissões | pág. 120, Jev 0.99 |
| 17 | Combustíveis | pág. 119, Jev 0.99 |
| 18 | Publicidade e Propaganda | pág. 119, Jev 1 |
| 19 | Rendas e alugueres | pág. 119, precedente |
| 20 | Seguros | pág. 119, Claude 0.85 |
| 21 | Equipamentos Desportivos | pág. 119, precedente |
| 22 | Conservação e reparação | pág. 119, Jev 0.99 |
| 23 | Outros | pág. 119, Jev 0.9 |
| 24 | Remuneração dos órgãos sociais | pág. 121, Jev 1 |
| 25 | Remuneração do pessoal | pág. 121, precedente |
| 26 | Prémios de desempenho e de performance desportiva | pág. 121, Jev 1 |
| 27 | Indemnizações | pág. 121, precedente |
| 28 | Encargos com remunerações | pág. 121, Jev 0.97 |
| 29 | Seguros | pág. 121, Claude 0.85 |
| 30 | Outros | pág. 121, Jev 0.9 |
| 31 | Depreciações e amortizações excluindo plantel | pág. 93, Jev 0.98 |
| 32 | Imparidade de clientes | pág. 122, Jev 0.99 |
| 33 | Provisões para outros riscos e encargos | pág. 122, precedente |
| 34 | Cedência de jogadores | pág. 122, Jev 0.98 |
| 35 | Quotizações | pág. 122, Jev 0.92 |
| 36 | Impostos | pág. 122, Claude 0.88 |
| 37 | Multas e penalidades | pág. 122, Jev 0.99 |
| 38 | Prospecção de mercado | pág. 122, Jev 0.96 |
| 39 | Juros de mora | pág. 122, Jev 1 |
| 40 | Outros | pág. 122, Jev 0.9 |
| 41 | Amortizações do exercício | pág. 122, Claude 0.95 |
| 42 | Perdas por imparidade | pág. 122, Claude 0.93 |
| 43 | Percentagem dos direitos económicos/mais-valias | pág. 123, precedente |
| 44 | Comissões | pág. 123, precedente |
| 45 | Mecanismo de solidariedade/Compensação por formação | pág. 123, precedente |
| 46 | Outros/Abates | pág. 123, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento anterior): "Clientes" pág. 92 + "Inventários" pág. 92 + "Estado e outros entes públicos" pág. 92 + "Outros devedores" pág. 92 + "Outros activos correntes" pág. 92 + "Caixa e equivalentes de caixa" pág. 92 — CORREGIDO 2026-10-17: cash vaciado; esas filas suman el total del activo corriente, no la caja (to-do 260 c)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 92
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 78.243 + Financiamentos obtidos c 60.010 = 138.253 miles. Balance de la SAD (individual) en miles de euros. Los pasivos de locación (IFRS 16) están en filas propias y no se suman (la nota 21 de dívida remunerada suma 147.139 con ellos). (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Loja Verde | pág. 129, Jev 0.97 |
| 2 | Distribuição/Retalho | pág. 129, Jev 0.97 |
| 3 | Loja Verde *Online | pág. 129, Jev 0.94 |
| 4 | Direitos televisivos | pág. 129, Jev 1 |
| 5 | Market Pool* da Liga dos Campeões | pág. 129, precedente |
| 6 | Outros direitos televisivos | pág. 129, Jev 0.99 |
| 7 | Bilhetes de época | pág. 130, Jev 1 |
| 8 | Bilheteira Liga Nacional | pág. 130, Jev 1 |
| 9 | Bilheteira Liga dos Campeões | pág. 130, Jev 1 |
| 10 | Bilheteira Taça de Portugal | pág. 130, Jev 1 |
| 11 | Bilheteira Taça da Liga | pág. 130, Jev 0.96 |
| 12 | Camarotes | pág. 130, precedente |
| 13 | Business Seats | pág. 130, precedente |
| 14 | Lugares de Leão e VIP | pág. 130, precedente |
| 15 | Outros | pág. 130, precedente |
| 16 | Patrocínios e Publicidade | pág. 129, Jev 1 |
| 17 | Outros | pág. 129, precedente |
| 18 | Participação na fase de grupos - *UEFA Champions League | pág. 131, Jev 1 |
| 19 | Prémio de performance na fase de Grupos - *UEFA Champions League | pág. 131, Jev 1 |
| 20 | Passagem aos oitavos-de-final da *UEFA Champions League | pág. 131, Jev 1 |
| 21 | Outros prémios | pág. 131, Jev 0.99 |
| 22 | Participação nas Competições Nacionais | pág. 130, Jev 1 |
| 23 | Cedência de jogadores | pág. 130, precedente |
| 24 | Prémio Euro 2020 | pág. 130, Jev 0.99 |
| 25 | Subsídios à exploração | pág. 130, Jev 0.97 |
| 26 | Recuperação de custos | pág. 130, Jev 1 |
| 27 | Outros | pág. 130, precedente |
| 28 | Venda de direitos desportivos | pág. 135, Jev 1 |
| 29 | Mecanismo de solidariedade/Compensação por formação | pág. 135, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 106, precedente |
| 2 | Refeições | pág. 132, precedente |
| 3 | Assistência aos jogos | pág. 132, Jev 0.91 |
| 4 | Manutenções | pág. 132, Jev 0.9 |
| 5 | Electricidade | pág. 132, Jev 0.99 |
| 6 | Vigilância | pág. 132, precedente |
| 7 | Patrocínios e publicidade | pág. 132, Jev 0.91 |
| 8 | Limpeza | pág. 132, Jev 0.99 |
| 9 | Outros | pág. 132, Jev 0.9 |
| 10 | Trabalhos especializados | pág. 131, Jev 0.99 |
| 11 | Organização, deslocações e estadias de jogos | pág. 131, Jev 1 |
| 12 | Honorários | pág. 131, Jev 1 |
| 13 | Royalties | pág. 131, precedente |
| 14 | Aquisição de jogadores | pág. 132, Jev 0.9 |
| 15 | Cedência de jogadores | pág. 132, Jev 0.98 |
| 16 | Outras comissões | pág. 132, Jev 0.99 |
| 17 | Combustíveis | pág. 131, Jev 0.99 |
| 18 | Publicidade e Propaganda | pág. 131, Jev 1 |
| 19 | Rendas e alugueres | pág. 131, precedente |
| 20 | Equipamentos Desportivos | pág. 131, precedente |
| 21 | Seguros | pág. 131, Claude 0.85 |
| 22 | Conservação e reparação | pág. 131, Jev 0.99 |
| 23 | Outros | pág. 131, Jev 0.9 |
| 24 | Remuneração dos órgãos sociais | pág. 133, Jev 1 |
| 25 | Remuneração do pessoal | pág. 133, precedente |
| 26 | Prémios de desempenho e de performance desportiva | pág. 133, Jev 1 |
| 27 | Indemnizações | pág. 133, precedente |
| 28 | Encargos com remunerações | pág. 133, Jev 0.97 |
| 29 | Gastos com benefícios pós-emprego | pág. 133, precedente |
| 30 | Seguros | pág. 133, Claude 0.85 |
| 31 | Outros | pág. 133, Jev 0.9 |
| 32 | Depreciações e amortizações excluindo plantel | pág. 106, Jev 0.98 |
| 33 | Provisões e perdas por imparidade excluindo plantel | pág. 106, Jev 0.95 |
| 34 | Cedência de jogadores | pág. 134, Jev 0.98 |
| 35 | Quotizações | pág. 134, Jev 0.92 |
| 36 | Impostos | pág. 134, Claude 0.88 |
| 37 | Multas e penalidades | pág. 134, Jev 0.99 |
| 38 | Prospecção de mercado | pág. 134, Jev 0.96 |
| 39 | Juros de mora | pág. 134, Jev 1 |
| 40 | Outros | pág. 134, Jev 0.9 |
| 41 | Amortizações do exercício - Futebol profissional | pág. 135, Jev 1 |
| 42 | Perdas por imparidade - Futebol profissional | pág. 135, Jev 0.91 |
| 43 | Percentagem dos direitos económicos/mais-valias | pág. 135, precedente |
| 44 | Comissões | pág. 135, precedente |
| 45 | Mecanismo de solidariedade/Compensação por formação | pág. 135, precedente |
| 46 | Outros/Abates | pág. 135, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 105 + "Financiamentos obtidos" pág. 105; cash escalón 1 (compuerta: documento siguiente): "Clientes" pág. 105 + "Inventários" pág. 105 + "Estado e outros entes públicos" pág. 105 + "Outros devedores" pág. 105 + "Outros activos correntes" pág. 105 + "Caixa e equivalentes de caixa" pág. 105 — CORREGIDO 2026-10-17: cash vaciado; esas filas suman el total del activo corriente, no la caja (to-do 260 c)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 105
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Loja Verde | pág. 112, Jev 0.97 |
| 2 | Distribuição/Retalho | pág. 112, Jev 0.97 |
| 3 | Loja Verde Online | pág. 112, Jev 0.96 |
| 4 | Direitos Televisivos | pág. 112, Jev 1 |
| 5 | Bilheteira e Bilhetes de Época | pág. 112, precedente |
| 6 | Patrocínios e Publicidade | pág. 112, Jev 1 |
| 7 | Outros | pág. 112, precedente |
| 8 | Diferencia de redondeo | pág. ?, precedente |
| 9 | Participação nas Competições Europeias | pág. 113, Jev 1 |
| 10 | Participação nas Competições Nacionais | pág. 113, Jev 1 |
| 11 | Cedência de jogadores | pág. 113, precedente |
| 12 | Subsidios à exploração | pág. 113, Jev 0.98 |
| 13 | Recuperação de custos | pág. 113, Jev 1 |
| 14 | Outros | pág. 113, precedente |
| 15 | Venda de direitos desportivos | pág. 119, precedente |
| 16 | Mecanismo de solidariedade/Compensação por formação | pág. 119, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 88, precedente |
| 2 | Fornecimentos e serviços externos | pág. 88, Jev 1 |
| 3 | Remuneração dos órgãos sociais | pág. 116, precedente |
| 4 | Remuneração do pessoal | pág. 116, precedente |
| 5 | Prémios de desempenho e de performance desportiva | pág. 116, precedente |
| 6 | Indemnizações | pág. 116, precedente |
| 7 | Encargos com remunerações | pág. 116, precedente |
| 8 | Gastos com benefícios pós-emprego | pág. 116, precedente |
| 9 | Seguros | pág. 116, precedente |
| 10 | Outros | pág. 116, precedente |
| 11 | Depreciações e amortizações excluindo plantel | pág. 88, precedente |
| 12 | Imparidade de clientes | pág. 117, precedente |
| 13 | Imparidade de inventários | pág. 117, precedente |
| 14 | Provisões para outros riscos e encargos | pág. 117, precedente |
| 15 | Diferencia de redondeo | pág. ?, Jev 1 |
| 16 | Quotizações | pág. 118, precedente |
| 17 | Impostos | pág. 118, precedente |
| 18 | Multas e penalidades | pág. 118, precedente |
| 19 | Prospecção de mercado | pág. 118, precedente |
| 20 | Juros de mora | pág. 118, precedente |
| 21 | Outros | pág. 118, precedente |
| 22 | Diferencia de redondeo | pág. ?, Jev 1 |
| 23 | Amortizações do exercício - Futebol profissional | pág. 118, precedente |
| 24 | Perdas por imparidade - Futebol profissional | pág. 118, precedente |
| 25 | Percentagem dos direitos económicos/mais-valias | pág. 119, precedente |
| 26 | Comissões | pág. 119, precedente |
| 27 | Mecanismo de solidariedade/Compensação por formação | pág. 119, precedente |
| 28 | Outros | pág. 119, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 87 + "Financiamentos obtidos" pág. 87; cash escalón 1 (compuerta: documento siguiente): "Clientes" pág. 87 + "Inventários" pág. 87 + "Estado e outros entes públicos" pág. 87 + "Outros devedores" pág. 87 + "Outros activos correntes" pág. 87 + "Caixa e equivalentes de caixa" pág. 87 — CORREGIDO 2026-10-17: cash vaciado; esas filas suman el total del activo corriente, no la caja (to-do 260 c)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 87
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 129, Jev 1 |
| 2 | Contrato de transmissão de direitos televisivos com a NOS | pág. 129, Jev 1 |
| 3 | Market Pool da Liga Europa | pág. 129, precedente |
| 4 | Bilhetes de época (Gamebox) | pág. 130, precedente |
| 5 | Bilheteira Liga Nacional | pág. 130, Jev 1 |
| 6 | Bilheteira Liga UEFA | pág. 130, Jev 0.9 |
| 7 | Bilheteira Supertaça | pág. 130, Jev 1 |
| 8 | Bilheteira Taça de Portugal | pág. 130, Jev 0.99 |
| 9 | Bilheteira Jogos particulares | pág. 130, Jev 1 |
| 10 | Bilheteira Taça da Liga | pág. 130, Jev 0.97 |
| 11 | Camarotes | pág. 130, precedente |
| 12 | Business Seats | pág. 130, precedente |
| 13 | Lugares de Leão e VIP | pág. 130, precedente |
| 14 | Outros | pág. 130, precedente |
| 15 | Patrocínios e Publicidade | pág. 129, Jev 1 |
| 16 | Outros | pág. 129, precedente |
| 17 | Apuramento para a fase de grupos da Liga Europa | pág. 131, Jev 1 |
| 18 | Performance desportiva na fase de grupos da Liga Europa | pág. 131, Jev 1 |
| 19 | Passagem às eliminatórias subsequentes da Liga Europa | pág. 131, Jev 1 |
| 20 | Outros prémios | pág. 131, Jev 0.99 |
| 21 | Participação nas Competições Nacionais | pág. 130, Jev 1 |
| 22 | Participação em Competições Particulares | pág. 130, ? 0.75 |
| 23 | Cedência de jogadores | pág. 130, precedente |
| 24 | Subsídios à exploração | pág. 130, Jev 0.98 |
| 25 | Recuperação de custos | pág. 130, Jev 1 |
| 26 | Outros | pág. 130, precedente |
| 27 | Venda de direitos desportivos deduzido do valor líquido contabilístico | pág. 137, Jev 0.99 |
| 28 | Mecanismo de solidariedade/Compensação por formação | pág. 137, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 98, precedente |
| 2 | Patrocínios e publicidade | pág. 132, precedente |
| 3 | Manutenções | pág. 132, precedente |
| 4 | Vigilância | pág. 132, precedente |
| 5 | Limpeza | pág. 132, precedente |
| 6 | Refeições | pág. 132, precedente |
| 7 | Assistência aos jogos | pág. 132, precedente |
| 8 | Electricidade | pág. 132, precedente |
| 9 | Outros | pág. 132, precedente |
| 10 | Organização, deslocações e estadias de jogos | pág. 131, precedente |
| 11 | Aquisição de jogadores | pág. 132, precedente |
| 12 | Cedência de jogadores | pág. 132, precedente |
| 13 | Outras comissões | pág. 132, precedente |
| 14 | Honorários | pág. 131, precedente |
| 15 | Trabalhos especializados | pág. 131, precedente |
| 16 | Equipamentos desportivos | pág. 131, precedente |
| 17 | Combustíveis | pág. 131, precedente |
| 18 | Publicidade e Propaganda | pág. 131, precedente |
| 19 | Rendas e alugueres | pág. 131, precedente |
| 20 | Conservação e reparação | pág. 131, precedente |
| 21 | Seguros | pág. 131, precedente |
| 22 | Outros | pág. 131, precedente |
| 23 | Remuneração dos órgãos sociais | pág. 134, precedente |
| 24 | Remuneração do pessoal | pág. 134, precedente |
| 25 | Prémios de desempenho e de performance desportiva | pág. 134, precedente |
| 26 | Indemnizações | pág. 134, precedente |
| 27 | Encargos com remunerações | pág. 134, precedente |
| 28 | Gastos com benefícios pós-emprego | pág. 134, precedente |
| 29 | Seguros | pág. 134, precedente |
| 30 | Outros | pág. 134, precedente |
| 31 | Depreciações e amortizações excluindo plantel | pág. 98, precedente |
| 32 | Imparidade de clientes | pág. 135, precedente |
| 33 | Imparidade de inventários | pág. 135, precedente |
| 34 | Provisões para outros riscos e encargos | pág. 135, precedente |
| 35 | Cedência de jogadores de terceiros | pág. 136, Jev 1 |
| 36 | Quotizações | pág. 136, precedente |
| 37 | Impostos | pág. 136, precedente |
| 38 | Multas e penalidades | pág. 136, precedente |
| 39 | Prospecção de mercado | pág. 136, precedente |
| 40 | Direitos de imagem | pág. 136, Jev 0.96 |
| 41 | Outros | pág. 136, precedente |
| 42 | Amortizações do exercício - Futebol profissional | pág. 136, precedente |
| 43 | Perdas por imparidade - Futebol profissional | pág. 136, precedente |
| 44 | Percentagem dos direitos económicos/mais-valias | pág. 137, precedente |
| 45 | Comissões | pág. 137, precedente |
| 46 | Mecanismo de solidariedade/Compensação por formação | pág. 137, precedente |
| 47 | Outros | pág. 137, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 97 + "Financiamentos obtidos" pág. 97; cash escalón 1 (compuerta: documento siguiente): "Clientes" pág. 97 + "Inventários" pág. 97 + "Estado e outros entes públicos" pág. 97 + "Outros devedores" pág. 97 + "Outros Activos correntes" pág. 97 + "Caixa e equivalentes de caixa" pág. 97 — CORREGIDO 2026-10-17: cash vaciado; esas filas suman el total del activo corriente, no la caja (to-do 260 c)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 97
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2019–20 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 100, Jev 1 |
| 2 | Direitos Televisivos | pág. 100, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 100, precedente |
| 4 | Patrocínios e Publicidade | pág. 100, Jev 1 |
| 5 | Outros | pág. 100, precedente |
| 6 | Diferencia de redondeo | pág. ?, precedente |
| 7 | Participação nas Competições Europeias | pág. 101, Jev 1 |
| 8 | Participação nas Competições Nacionais | pág. 101, Jev 1 |
| 9 | Prémio Mundial 2018 | pág. 101, Jev 1 |
| 10 | Cedência de jogadores | pág. 101, precedente |
| 11 | Subsídios à exploração | pág. 101, Jev 0.98 |
| 12 | Redébito de gastos | pág. 101, Jev 1 |
| 13 | Outros | pág. 101, precedente |
| 14 | Venda de direitos desportivos | pág. 106, precedente |
| 15 | Mecanismo de solidariedade/Compensação por formação | pág. 106, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 73, precedente |
| 2 | Subcontratos | pág. 102, Jev 0.97 |
| 3 | Organização, deslocações e estadias de jogos | pág. 102, precedente |
| 4 | Comissões | pág. 102, precedente |
| 5 | Honorários | pág. 102, precedente |
| 6 | Trabalhos especializados | pág. 102, precedente |
| 7 | Equipamentos Desportivos | pág. 102, precedente |
| 8 | Combustíveis | pág. 102, precedente |
| 9 | Publicidade e Propaganda | pág. 102, precedente |
| 10 | Rendas e alugueres | pág. 102, precedente |
| 11 | Conservação e reparação | pág. 102, precedente |
| 12 | Seguros | pág. 102, precedente |
| 13 | Outros | pág. 102, precedente |
| 14 | Remuneração dos órgãos sociais | pág. 103, precedente |
| 15 | Remuneração do pessoal | pág. 103, precedente |
| 16 | Prémios de desempenho e de performance desportiva | pág. 103, precedente |
| 17 | Indemnizações | pág. 103, precedente |
| 18 | Encargos com remunerações | pág. 103, precedente |
| 19 | Gastos com benefícios pós-emprego | pág. 103, precedente |
| 20 | Seguros | pág. 103, precedente |
| 21 | Outros | pág. 103, precedente |
| 22 | Depreciações e amortizações excluindo plantel | pág. 73, precedente |
| 23 | Imparidade de clientes | pág. 104, precedente |
| 24 | Provisões para outros riscos e encargos (Nota 19 e 27) | pág. 104, precedente |
| 25 | Cedência de jogadores de terceiros | pág. 105, Jev 1 |
| 26 | Quotizações | pág. 105, precedente |
| 27 | Impostos | pág. 105, precedente |
| 28 | Multas e penalidades | pág. 105, precedente |
| 29 | Prospecção de mercado | pág. 105, precedente |
| 30 | Outros | pág. 105, precedente |
| 31 | Diferencia de redondeo | pág. ?, Jev 1 |
| 32 | Amortizações do exercício - Futebol profissional | pág. 105, precedente |
| 33 | Perdas por imparidade - Futebol profissional | pág. 105, precedente |
| 34 | Percentagem dos direitos económicos/mais valias | pág. 106, precedente |
| 35 | Comissões | pág. 106, precedente |
| 36 | Mecanismo de solidariedade/Compensação por formação | pág. 106, precedente |
| 37 | Outros | pág. 106, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 72 + "Financiamentos obtidos" pág. 72; cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 72
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2018–19 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 99, Jev 1 |
| 2 | Direitos Televisivos | pág. 99, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 99, precedente |
| 4 | Patrocínios e Publicidade | pág. 99, Jev 1 |
| 5 | Outros | pág. 99, precedente |
| 6 | Participação nas Competições Europeias | pág. 100, Jev 1 |
| 7 | Participação nas Competições Nacionais | pág. 100, Jev 1 |
| 8 | Participação em Competições Particulares | pág. 100, Jev 0.94 |
| 9 | Prémio mundial 2018 | pág. 100, Jev 0.97 |
| 10 | Cedência de jogadores | pág. 100, Jev 0.99 |
| 11 | Subsidios à exploração | pág. 100, Jev 0.97 |
| 12 | Outros | pág. 100, precedente |
| 13 | Venda de direitos desportivos | pág. 105, Jev 1 |
| 14 | Mecanismo de solidariedade/Compensação por formação | pág. 105, precedente |
| 15 | Outros | pág. 105, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 75, precedente |
| 2 | Subcontratos | pág. 101, Jev 0.96 |
| 3 | Organização e deslocações e estadias de jogos | pág. 101, Jev 1 |
| 4 | Comissões | pág. 101, precedente |
| 5 | Honorários | pág. 101, Jev 1 |
| 6 | Trabalhos especializados | pág. 101, Jev 0.99 |
| 7 | Equipamentos Desportivos | pág. 101, precedente |
| 8 | Combustíveis | pág. 101, Jev 0.99 |
| 9 | Publicidade e Propaganda | pág. 101, Jev 1 |
| 10 | Rendas e alugueres | pág. 101, precedente |
| 11 | Conservação e reparação | pág. 101, Jev 0.99 |
| 12 | Seguros | pág. 101, Claude 0.85 |
| 13 | Outros | pág. 101, Jev 0.9 |
| 14 | Remuneração dos órgãos sociais | pág. 103, Jev 1 |
| 15 | Remuneração do pessoal | pág. 103, precedente |
| 16 | Prémios de desempenho e performance desportiva | pág. 103, Jev 0.99 |
| 17 | Indemnizações | pág. 103, precedente |
| 18 | Encargos com remunerações | pág. 103, Jev 0.97 |
| 19 | Gastos com benefícios pós-emprego | pág. 103, precedente |
| 20 | Seguros | pág. 103, Claude 0.85 |
| 21 | Outros | pág. 103, Jev 0.9 |
| 22 | Diferencia de redondeo | pág. ?, precedente |
| 23 | Depreciações e amortizações excluindo plantel | pág. 75, Jev 0.98 |
| 24 | Imparidade de clientes | pág. 104, Jev 0.99 |
| 25 | Provisões para outros riscos e encargos | pág. 104, precedente |
| 26 | Diferencia de redondeo | pág. ?, precedente |
| 27 | Cedência de jogadores de terceiros | pág. 104, Jev 0.98 |
| 28 | Quotizações | pág. 104, Jev 0.92 |
| 29 | Impostos | pág. 104, Claude 0.88 |
| 30 | Multas e penalidades | pág. 104, Jev 0.99 |
| 31 | Prospeção de mercado | pág. 104, Jev 0.98 |
| 32 | Direitos de imagem | pág. 104, Claude 0.8 |
| 33 | Outros | pág. 104, Jev 0.9 |
| 34 | Diferencia de redondeo | pág. ?, precedente |
| 35 | Amortizações do exercício - Futebol profissional | pág. 104, Jev 1 |
| 36 | Perdas por imparidade - Futebol profissional | pág. 104, Jev 0.91 |
| 37 | Diferencia de redondeo | pág. ?, precedente |
| 38 | Percentagem dos direitos económicos/mais valias | pág. 105, precedente |
| 39 | Comissões | pág. 105, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 74
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 36.488 + Financiamentos obtidos c 74.755 = 111.243 miles. Balance de la SAD (individual) en miles de euros.  (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2017–18 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 114, Jev 1 |
| 2 | Contrato de transmissão de direitos televisivos com a PPTV, SA | pág. 115, Jev 1 |
| 3 | Market Pool da Liga dos Campeões | pág. 115, precedente |
| 4 | Bilhetes de época (Gamebox) | pág. 115, precedente |
| 5 | Bilheteira Liga Nacional | pág. 115, Jev 1 |
| 6 | Bilheteira UEFA | pág. 115, Claude 0.93 |
| 7 | Bilheteira Taça de Portugal | pág. 115, Jev 0.99 |
| 8 | Bilheteira Jogos particulares | pág. 115, Jev 1 |
| 9 | Bilheteira Taça da Liga | pág. 115, Jev 0.97 |
| 10 | Camarotes | pág. 115, precedente |
| 11 | Business Seats | pág. 115, precedente |
| 12 | Lugares de Leão e VIP | pág. 115, precedente |
| 13 | Membros Fundadores | pág. 115, Jev 0.96 |
| 14 | Outros | pág. 115, precedente |
| 15 | Patrocínios e Publicidade | pág. 114, Jev 1 |
| 16 | Outros | pág. 114, precedente |
| 17 | Apuramento para a fase de grupos da Liga dos Campeões | pág. 116, Jev 1 |
| 18 | Performance desportiva na fase de grupos da Liga dos Campeões | pág. 116, Jev 1 |
| 19 | Outros prémios | pág. 116, Jev 0.99 |
| 20 | Participação nas Competições Nacionais | pág. 116, Jev 1 |
| 21 | Cedência de jogadores | pág. 116, precedente |
| 22 | Subsídios à exploração | pág. 116, Jev 0.98 |
| 23 | Outros | pág. 116, precedente |
| 24 | Venda de direitos desportivos | pág. 122, precedente |
| 25 | Mecanismo de solidariedade/Compensação por formação | pág. 122, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 88, precedente |
| 2 | Patrocínios e publicidade | pág. 117, precedente |
| 3 | Manutenções | pág. 117, precedente |
| 4 | Vigilância | pág. 117, precedente |
| 5 | Limpeza | pág. 117, precedente |
| 6 | Refeições | pág. 117, precedente |
| 7 | Assistencia aos jogos | pág. 117, precedente |
| 8 | Electricidade | pág. 117, precedente |
| 9 | Outros | pág. 117, precedente |
| 10 | Organização e deslocações e estadias de jogos | pág. 117, precedente |
| 11 | Aquisição de jogadores | pág. 118, precedente |
| 12 | Renovação de contratos de trabalho | pág. 118, Claude 0.82 |
| 13 | Cedência de jogadores | pág. 118, precedente |
| 14 | Outras comissões | pág. 118, precedente |
| 15 | Honorários | pág. 117, precedente |
| 16 | Trabalhos especializados | pág. 117, precedente |
| 17 | Equipamentos Desportivos | pág. 117, precedente |
| 18 | Combustíveis | pág. 117, precedente |
| 19 | Publicidade e Propaganda | pág. 117, precedente |
| 20 | Rendas e alugueres | pág. 117, precedente |
| 21 | Conservação e reparação | pág. 117, precedente |
| 22 | Seguros | pág. 117, precedente |
| 23 | Outros | pág. 117, precedente |
| 24 | Remuneração dos órgãos sociais | pág. 119, precedente |
| 25 | Plantel e equipa técnica | pág. 119, Jev 1 |
| 26 | Outros | pág. 119, precedente |
| 27 | Indemnizações | pág. 119, precedente |
| 28 | Encargos com remunerações | pág. 119, precedente |
| 29 | Gastos com benefícios pós-emprego | pág. 119, precedente |
| 30 | Seguros | pág. 119, precedente |
| 31 | Outros | pág. 119, precedente |
| 32 | Depreciações e amortizações excluindo plantel | pág. 88, precedente |
| 33 | Imparidade de clientes | pág. 120, precedente |
| 34 | Imparidade de inventários | pág. 120, precedente |
| 35 | Provisões para outros riscos e encargos | pág. 120, precedente |
| 36 | Cedência de jogadores de terceiros | pág. 120, Jev 1 |
| 37 | Quotizações | pág. 120, precedente |
| 38 | Impostos | pág. 120, precedente |
| 39 | Multas e penalidades | pág. 120, precedente |
| 40 | Prospecção de mercado | pág. 120, precedente |
| 41 | Direitos de imagem | pág. 120, Jev 0.96 |
| 42 | Outros | pág. 120, precedente |
| 43 | Amortizações do exercício - Futebol profissional | pág. 121, precedente |
| 44 | Perdas por imparidade - Futebol profissional | pág. 121, precedente |
| 45 | Percentagem dos direitos económicos/mais valias | pág. 122, precedente |
| 46 | Comissões | pág. 122, precedente |
| 47 | Outros | pág. 122, precedente |
| 48 | Outros gastos não recorrentes | pág. 88, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 89
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 36.265 + Financiamentos obtidos c 91.106 = 127.371 miles. Balance de la SAD (individual) en miles de euros.  (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2016–17 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 133, Jev 1 |
| 2 | Direitos Televisivos | pág. 133, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 133, precedente |
| 4 | Patrocínios e Publicidade | pág. 133, Jev 1 |
| 5 | Outros | pág. 133, precedente |
| 6 | Participação nas Competições Europeias | pág. 134, Jev 1 |
| 7 | Participações nas Competições Nacionais | pág. 134, Jev 1 |
| 8 | Participações em Competições Particulares | pág. 134, Jev 0.98 |
| 9 | Cedência de jogadores | pág. 134, Jev 0.99 |
| 10 | Descontos de pronto pagamento obtidos | pág. 134, Jev 1 |
| 11 | Outros | pág. 134, precedente |
| 12 | Venda de direitos desportivos | pág. 139, Jev 1 |
| 13 | Mecanismo de solidariedade/compenção por formação | pág. 139, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 107, precedente |
| 2 | Subcontratos | pág. 135, Jev 0.96 |
| 3 | Organização e deslocações e estadias de jogos | pág. 135, Jev 1 |
| 4 | Comissões | pág. 135, precedente |
| 5 | Honorários | pág. 135, Jev 1 |
| 6 | Trabalhos especializados | pág. 135, Jev 0.99 |
| 7 | Equipamentos Desportivos | pág. 135, precedente |
| 8 | Combustíveis | pág. 135, Jev 0.99 |
| 9 | Publicidade e Propaganda | pág. 135, Jev 1 |
| 10 | Rendas e alugueres | pág. 135, precedente |
| 11 | Conservação e reparação | pág. 135, Jev 0.99 |
| 12 | Outros FSE (de valor individual < 200keur) | pág. 135, precedente |
| 13 | Remunerações Órgãos Sociais | pág. 137, Jev 1 |
| 14 | Remuneração do Pessoal | pág. 137, precedente |
| 15 | Indemnizações | pág. 137, precedente |
| 16 | Encargos com remunerações | pág. 137, Jev 0.97 |
| 17 | Gastos com benefícios pós-emprego | pág. 137, precedente |
| 18 | Seguros | pág. 137, precedente |
| 19 | Outros | pág. 137, Jev 0.9 |
| 20 | Depreciações e amortizações excluindo plantel | pág. 107, Jev 0.98 |
| 21 | Imparidade de clientes | pág. 138, Jev 0.99 |
| 22 | Imparidade de inventários | pág. 138, Jev 0.99 |
| 23 | Provisões para outros riscos e encargos | pág. 138, precedente |
| 24 | Quotizações | pág. 138, Jev 0.92 |
| 25 | Impostos | pág. 138, Claude 0.88 |
| 26 | Multas e penalidades | pág. 138, Jev 0.99 |
| 27 | Prospeção de mercado | pág. 138, Jev 0.98 |
| 28 | Diferenças de câmbio desfavoráveis operacionais | pág. 138, precedente |
| 29 | Direitos de imagem | pág. 138, Claude 0.8 |
| 30 | Outros | pág. 138, Jev 0.9 |
| 31 | Amortizações do exercício - Futebol profissional | pág. 139, Jev 1 |
| 32 | Perdas por imparidade - Futebol profissional | pág. 139, Jev 0.91 |
| 33 | Outros gastos não recorrentes | pág. 107, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 108
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 88.119 + Financiamentos obtidos c 43.936 = 132.055 miles. Balance de la SAD (individual) en miles de euros. Hay "Outros passivos não correntes" con Associação em Participação (nota 21, 6.060 miles) que no se sumó. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2015–16 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2014-15.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Loja Verde | pág. 107, Jev 0.97 |
| 2 | Direitos Televisivos | pág. 107, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 107, precedente |
| 4 | Patrocínios e Publicidade | pág. 107, Jev 1 |
| 5 | Royalties | pág. 107, Jev 0.99 |
| 6 | Outros | pág. 107, precedente |
| 7 | Diferencia de redondeo | pág. ?, precedente |
| 8 | Participação nas Competições Europeias | pág. 108, Jev 1 |
| 9 | Participações nas Competições Nacionais | pág. 108, Jev 1 |
| 10 | Participações em Competições Particulares | pág. 108, Jev 0.98 |
| 11 | Cedência de jogadores | pág. 108, Jev 0.99 |
| 12 | Diferenças de câmbio | pág. 108, Jev 1 |
| 13 | Descontos de pronto pagamento obtidos | pág. 108, Jev 1 |
| 14 | Outros | pág. 108, precedente |
| 15 | Diferencia de redondeo | pág. ?, precedente |
| 16 | Cedência de direitos económicos ao Sporting Portugal Fund | pág. 114, Jev 0.94 |
| 17 | Venda de direitos desportivos | pág. 114, Jev 1 |
| 18 | Mecanismo de solidariedade/compensão por formação | pág. 114, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 78, precedente |
| 2 | Subcontratos | pág. 110, Jev 0.96 |
| 3 | Organização e deslocações e estadias de jogos | pág. 110, Jev 1 |
| 4 | Comissões | pág. 110, precedente |
| 5 | Honorários | pág. 110, Jev 1 |
| 6 | Trabalhos especializados | pág. 110, Jev 0.99 |
| 7 | Equipamentos Desportivos | pág. 110, precedente |
| 8 | Combustíveis | pág. 110, Jev 0.99 |
| 9 | Publicidade e Propaganda | pág. 110, Jev 1 |
| 10 | Outros FSE | pág. 110, precedente |
| 11 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 12 | Remunerações Órgãos Sociais | pág. 111, Jev 1 |
| 13 | Remuneração do Pessoal | pág. 111, precedente |
| 14 | Indemnizações | pág. 111, precedente |
| 15 | Encargos com remunerações | pág. 111, Jev 0.97 |
| 16 | Gastos com benefícios pós-emprego | pág. 111, precedente |
| 17 | Seguros | pág. 111, precedente |
| 18 | Outros | pág. 111, Jev 0.9 |
| 19 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 20 | Depreciações e amortizações excluindo plantel | pág. 78, Jev 0.98 |
| 21 | Imparidade de clientes | pág. 112, Jev 0.99 |
| 22 | Imparidade de inventários | pág. 112, Jev 0.99 |
| 23 | Provisões para outros riscos e encargos | pág. 112, precedente |
| 24 | Cedência de jogadores de terceiros | pág. 113, Jev 0.98 |
| 25 | Quotizações | pág. 113, Jev 0.92 |
| 26 | Impostos | pág. 113, Claude 0.88 |
| 27 | Multas e penalidades | pág. 113, Jev 0.99 |
| 28 | Prospeção de mercado | pág. 113, Jev 0.98 |
| 29 | Diferenças de câmbio desfavoráveis operacionais | pág. 113, precedente |
| 30 | Direitos de imagem | pág. 113, Claude 0.8 |
| 31 | Outros | pág. 113, Jev 0.9 |
| 32 | Amortizações do exercício - Futebol profissional | pág. 113, Jev 1 |
| 33 | Perdas por imparidade - Futebol profissional | pág. 113, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 79
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 80.344 + Financiamentos obtidos c 49.709 = 130.053 miles. Balance de la SAD (individual) en miles de euros. Hay "Outros passivos não correntes" con Associação em Participação (nota 21, 9.030 miles) que no se sumó. La página de resumen de gestión repite el balance; se usó el balance. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2014–15 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2013-14.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2013-14.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos Televisivos | pág. 103, Jev 1 |
| 2 | Bilheteira e Bilhetes de Época | pág. 103, precedente |
| 3 | Patrocínios e Publicidade | pág. 103, Jev 1 |
| 4 | Royalties | pág. 103, Jev 0.99 |
| 5 | Outros | pág. 103, precedente |
| 6 | Participações nas Competições Nacionais | pág. 104, Jev 1 |
| 7 | Participações em Competições Particulares | pág. 104, Jev 0.98 |
| 8 | Cedência de jogadores | pág. 104, Jev 0.99 |
| 9 | Indemnizações de seguros | pág. 104, Jev 1 |
| 10 | Diferenças de câmbio | pág. 104, Jev 1 |
| 11 | Outros | pág. 104, precedente |
| 12 | Cedência de direitos económicos ao Sporting Portugal Fund | pág. 109, Jev 0.94 |
| 13 | Venda de direitos desportivos | pág. 109, Jev 1 |
| 14 | Mecanismo de solidariedade/compenção por formação | pág. 109, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 105, Jev 0.96 |
| 2 | Organização e deslocações e estadias de jogos | pág. 105, Jev 1 |
| 3 | Comissões | pág. 105, precedente |
| 4 | Honorários | pág. 105, Jev 1 |
| 5 | Trabalhos especializados | pág. 105, Jev 0.99 |
| 6 | Equipamentos Desportivos | pág. 105, precedente |
| 7 | Seguros | pág. 105, Claude 0.85 |
| 8 | Publicidade e Propaganda | pág. 105, Jev 1 |
| 9 | Outros FSE | pág. 105, precedente |
| 10 | Remunerações Orgãos Sociais | pág. 106, Jev 1 |
| 11 | Remuneração do Pessoal | pág. 106, precedente |
| 12 | Indemnizações | pág. 106, precedente |
| 13 | Encargos com remunerações | pág. 106, Jev 0.97 |
| 14 | Gastos com benefícios pós-emprego | pág. 106, precedente |
| 15 | Seguros | pág. 106, Claude 0.85 |
| 16 | Outros | pág. 106, Jev 0.9 |
| 17 | Depreciações e amortizações excluindo plantel | pág. 80, Jev 0.98 |
| 18 | Imparidade de clientes | pág. 108, Jev 0.99 |
| 19 | Imparidade de outras dívidas a receber | pág. 108, Jev 1 |
| 20 | Provisões para outros riscos e encargos | pág. 108, precedente |
| 21 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 22 | Quotizações | pág. 108, Jev 0.92 |
| 23 | Impostos | pág. 108, Claude 0.88 |
| 24 | Multas e penalidades | pág. 108, Jev 0.99 |
| 25 | Prospecção de mercado | pág. 108, Jev 0.96 |
| 26 | Diferenças de câmbio desfavoráveis operacionais | pág. 108, precedente |
| 27 | Direitos de imagem | pág. 108, Claude 0.8 |
| 28 | Outros | pág. 108, Jev 0.9 |
| 29 | Amortizações e perdas de imparidade do plantel | pág. 80, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 81
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 31.680 + Financiamentos obtidos c 149.057 = 180.737 miles. Balance de la SAD (individual) en miles de euros. Hay "Outros passivos não correntes" con Associação em Participação (nota 21) que no se sumó. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2013–14 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2012-13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2012-13.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 101, precedente |
| 2 | Direitos Televisivos | pág. 101, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 101, precedente |
| 4 | Patrocínios e Publicidade | pág. 101, Jev 1 |
| 5 | Royalties | pág. 101, Jev 0.99 |
| 6 | Outros | pág. 101, precedente |
| 7 | Participações nas Competições Europeias | pág. 102, Jev 1 |
| 8 | Participações nas Competições Nacionais | pág. 102, Jev 1 |
| 9 | Participações em Competições Particulares | pág. 102, Jev 0.98 |
| 10 | Cedência de jogadores | pág. 102, Jev 0.99 |
| 11 | Indemnizações de seguros | pág. 102, Jev 1 |
| 12 | Diferenças de câmbio | pág. 102, Jev 1 |
| 13 | Outros | pág. 102, precedente |
| 14 | Cedência de direitos económicos ao Sporting Portugal Fund | pág. 107, Jev 0.94 |
| 15 | Venda de direitos desportivos | pág. 107, Jev 1 |
| 16 | Mecanismo de solidariedade/compenção por formação | pág. 107, precedente |
| 17 | Abate de direitos desportivos | pág. 107, Jev 0.92 |
| 18 | Diferencia de redondeo | pág. ?, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 104, Jev 0.96 |
| 2 | Organização de jogos, deslocações e estadias | pág. 104, Jev 1 |
| 3 | Comissões | pág. 104, precedente |
| 4 | Honorários | pág. 104, Jev 1 |
| 5 | Trabalhos especializados | pág. 104, Jev 0.99 |
| 6 | Equipamentos Desportivos | pág. 104, precedente |
| 7 | Seguros | pág. 104, Claude 0.85 |
| 8 | Publicidade e Propaganda | pág. 104, Jev 1 |
| 9 | Outros FSE | pág. 104, precedente |
| 10 | Remunerações Órgãos Sociais | pág. 105, Jev 1 |
| 11 | Remuneração do Pessoal | pág. 105, precedente |
| 12 | Indemnizações | pág. 105, precedente |
| 13 | Encargos com remunerações | pág. 105, Jev 0.97 |
| 14 | Gastos com benefícios pós-emprego | pág. 105, precedente |
| 15 | Seguros | pág. 105, Claude 0.85 |
| 16 | Outros | pág. 105, Jev 0.9 |
| 17 | Depreciações e amortizações excluindo plantel | pág. 80, Jev 0.98 |
| 18 | Imparidade de clientes | pág. 106, Jev 0.99 |
| 19 | Imparidade de outras dívidas a receber | pág. 106, Jev 1 |
| 20 | Provisões para outros riscos e encargos | pág. 106, precedente |
| 21 | Quotizações | pág. 106, Jev 0.92 |
| 22 | Impostos | pág. 106, Claude 0.88 |
| 23 | Multas e penalidades | pág. 106, Jev 0.99 |
| 24 | Prospecção de mercado | pág. 106, Jev 0.96 |
| 25 | Diferenças de câmbio desfavoráveis operacionais | pág. 106, precedente |
| 26 | Outros | pág. 106, Jev 0.9 |
| 27 | Amortizações do exercício - Futebol profissional | pág. 107, Jev 1 |
| 28 | Perdas por imparidade - Futebol profissional | pág. 107, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 81
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Financiamentos obtidos n/c 56.458 + Financiamentos obtidos c 101.398 = 157.856 miles. Balance de la SAD (individual) en miles de euros. "Outros passivos não correntes" incluye "Associação em Participação" (nota 21; 43.075 miles en 2013) que no se sumó por no ser préstamo explícito. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2012–13 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2011-12.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2011-12.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 96, precedente |
| 2 | Direitos Televisivos | pág. 96, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 96, precedente |
| 4 | Patrocínios e Publicidade | pág. 96, Jev 1 |
| 5 | Merchandising e Licenciamento | pág. 96, Jev 1 |
| 6 | Serviços Diretos | pág. 96, precedente |
| 7 | Outras | pág. 96, Jev 1 |
| 8 | Participações nas Competições Europeias | pág. 97, Jev 1 |
| 9 | Participações nas Competições Nacionais | pág. 97, Jev 1 |
| 10 | Participações em Competições Particulares | pág. 97, Jev 0.98 |
| 11 | Benefícios contratuais | pág. 97, Jev 0.92 |
| 12 | Cedência de Jogadores | pág. 97, Jev 0.99 |
| 13 | Outros | pág. 97, precedente |
| 14 | Abate de direitos desportivos | pág. 100, Jev 0.92 |
| 15 | Cedência de direitos económicos ao Sporting Portugal Fund | pág. 100, Jev 0.94 |
| 16 | Venda de direitos desportivos | pág. 100, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 97, Jev 0.96 |
| 2 | Trabalhos especializados | pág. 97, Jev 0.99 |
| 3 | Organização de Jogos, deslocações e estadias | pág. 97, Jev 1 |
| 4 | Honorários | pág. 97, Jev 1 |
| 5 | Comissões | pág. 97, precedente |
| 6 | Seguros | pág. 97, Claude 0.85 |
| 7 | Equipamentos Desportivos | pág. 97, precedente |
| 8 | Publicidade e Propaganda | pág. 97, Jev 1 |
| 9 | Outros FSE | pág. 97, precedente |
| 10 | Remunerações Órgãos Sociais | pág. 98, Jev 1 |
| 11 | Remuneração do Pessoal | pág. 98, precedente |
| 12 | Indemnizações | pág. 98, precedente |
| 13 | Encargos com remunerações | pág. 98, Jev 0.97 |
| 14 | Seguros | pág. 98, Claude 0.85 |
| 15 | Outros | pág. 98, Jev 0.9 |
| 16 | Amortizações excluindo depreciação do plantel | pág. 77, Claude 0.85 |
| 17 | Ajustamentos a clientes de cobrança duvidosa | pág. 99, precedente |
| 18 | Provisão para complemento de Pensões de Reforma | pág. 99, precedente |
| 19 | Outras provisões para riscos e encargos | pág. 99, precedente |
| 20 | Despesas com Transferências de Jogadores | pág. 99, precedente |
| 21 | Quotizações | pág. 99, Jev 0.92 |
| 22 | Imposto de Selo | pág. 99, Jev 0.96 |
| 23 | Multas e outras penalidades | pág. 99, Jev 0.98 |
| 24 | Penalidades Contratuais | pág. 99, Jev 0.98 |
| 25 | Prospecção de Mercado | pág. 99, Jev 0.96 |
| 26 | Outros | pág. 99, Jev 0.9 |
| 27 | Amortizações do exercício - Futebol profissional | pág. 99, Claude 0.95 |
| 28 | Perdas por imparidade - Futebol profissional | pág. 99, Claude 0.95 |

### Meta

```text
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2012-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Clientes" pág. 21 + "Caixa e equivalentes de caixa" pág. 21 + "Outros devedores" pág. 21 + "Outros ativos correntes" pág. 21 — CORREGIDO 2026-10-17: cash vaciado; esas filas suman el total del activo corriente, no la caja (to-do 260 c)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 21
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Dívida financeira n/c 80.291 + Dívida financeira c 36.075 = 116.366 miles. Balance de la SAD (individual) en miles de euros. Otros credores não correntes 39.706 no se suma. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2011–12 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2010-11.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2010-11.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 107, precedente |
| 2 | Direitos Televisivos | pág. 107, precedente |
| 3 | Bilheteira e Bilhetes de Época | pág. 107, precedente |
| 4 | Patrocínios e Publicidade | pág. 107, precedente |
| 5 | Merchandising e Licenciamento | pág. 107, precedente |
| 6 | Serviços Directos | pág. 107, precedente |
| 7 | Outras | pág. 107, precedente |
| 8 | Participações nas Competições Europeias | pág. 107, precedente |
| 9 | Participações em Competições Particulares | pág. 107, precedente |
| 10 | Benefícios contratuais | pág. 107, precedente |
| 11 | Outras | pág. 107, precedente |
| 12 | (Custos)/Proveitos com transacções de passes de jogadores | pág. 88, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 108, precedente |
| 2 | Trabalhos especializados | pág. 108, precedente |
| 3 | Organização de Jogos | pág. 108, Jev 1 |
| 4 | Honorários | pág. 108, precedente |
| 5 | Comissões | pág. 108, precedente |
| 6 | Seguros | pág. 108, Claude 0.85 |
| 7 | Equipamentos Desportivos | pág. 108, precedente |
| 8 | Publicidade e Propaganda | pág. 108, precedente |
| 9 | Outros FSE | pág. 108, precedente |
| 10 | Remunerações Orgãos Sociais | pág. 108, precedente |
| 11 | Remuneração do Pessoal | pág. 108, precedente |
| 12 | Indemnizações | pág. 108, precedente |
| 13 | Encargos com remunerações | pág. 108, precedente |
| 14 | Seguros | pág. 108, Claude 0.85 |
| 15 | Outros | pág. 108, precedente |
| 16 | Amortizações excluindo depreciação do plantel | pág. 88, precedente |
| 17 | Ajustamentos a clientes de cobrança duvidosa | pág. 109, precedente |
| 18 | Provisão para complemento de Pensões de Reforma | pág. 109, precedente |
| 19 | Outras provisões para riscos e encargos | pág. 109, precedente |
| 20 | Despesas com Transferências de Jogadores | pág. 110, precedente |
| 21 | Quotizações | pág. 110, precedente |
| 22 | Imposto de Selo | pág. 110, precedente |
| 23 | Multas e outras penalidades | pág. 110, precedente |
| 24 | Penalidades Contratuais | pág. 110, precedente |
| 25 | Prospecção de Mercado | pág. 110, precedente |
| 26 | Outros | pág. 110, precedente |
| 27 | Amortizações do exercício - Futebol profissional | pág. 110, precedente |
| 28 | Perdas por imparidade - Futebol profissional | pág. 110, precedente |

### Meta

```text
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2011-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 18.168. La extracción dejó afuera el neto de transacciones de pases (nota 9), impreso sin paréntesis en el bloque de costos: es proveito (18.168 − 23.288 = (5.120), el subtotal impreso). Con la fila el resultado cierra: 35.366 + 18.168 − 76.062 − 7.331 − 14.132 = −43.991.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 25
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Dívida financeira n/c 42.289 + Dívida financeira c 53.271 = 95.560 miles. Balance de la SAD (individual) en miles de euros. Coincide con los 95,6 M de dívida financeira del informe de gestión. Los VMOC están en patrimonio; "Outros credores não correntes - Entidades relacionadas" 33.405 compensa un activo con el grupo y no se suma. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2010–11 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Portugal/Sporting CP/relatorio-contas-2009-10.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2009-10.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 70, precedente |
| 2 | Direitos televisivos | pág. 70, precedente |
| 3 | Bilheteira e bilhetes de época | pág. 70, precedente |
| 4 | Patrocínios e publicidade | pág. 70, precedente |
| 5 | Merchandising e licenciamento | pág. 70, precedente |
| 6 | Serviços directos | pág. 70, precedente |
| 7 | Outras | pág. 70, precedente |
| 8 | Outros Proveitos operacionais | pág. 60, precedente |
| 9 | (Custos)/Proveitos com transacções de passes de jogadores | pág. 60, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 71, precedente |
| 2 | Trabalhos especializados | pág. 71, precedente |
| 3 | Organização de jogos | pág. 71, precedente |
| 4 | Deslocações e estadas | pág. 71, precedente |
| 5 | Honorários | pág. 71, precedente |
| 6 | Comissões | pág. 71, precedente |
| 7 | Seguros | pág. 71, Claude 0.85 |
| 8 | Equipamentos desportivos | pág. 71, precedente |
| 9 | Publicidade e propaganda | pág. 71, precedente |
| 10 | Outros FSE | pág. 71, precedente |
| 11 | Remunerações Órgãos Sociais | pág. 72, precedente |
| 12 | Remuneração do Pessoal | pág. 72, precedente |
| 13 | Encargos com remunerações | pág. 72, precedente |
| 14 | Seguros | pág. 72, Claude 0.85 |
| 15 | Outros | pág. 72, precedente |
| 16 | Amortizações excluindo depreciação do plantel | pág. 60, precedente |
| 17 | Ajustamentos de dívidas a receber | pág. 72, Jev 1 |
| 18 | Provisão para complemento de Pensões de Reforma | pág. 72, precedente |
| 19 | Outras provisões para riscos e encargos | pág. 72, precedente |
| 20 | Cedência de jogadores de terceiros | pág. 73, precedente |
| 21 | Quotizações | pág. 73, precedente |
| 22 | Imposto de selo | pág. 73, precedente |
| 23 | Multas e outras penalidades | pág. 73, precedente |
| 24 | Prospecção de mercado | pág. 73, precedente |
| 25 | Outros | pág. 73, precedente |
| 26 | Amortizações do exercício - Futebol profissional | pág. 73, precedente |
| 27 | Perdas por imparidade - Futebol profissional | pág. 73, precedente |

### Meta

```text
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2010-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): pt-primeiraliga, verificado contra roster cacheado de "2009–10 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Portugal/Sporting CP/relatorio-contas-2008-09.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2008-09.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 114, precedente |
| 2 | Direitos Televisivos | pág. 114, precedente |
| 3 | Bilheteira | pág. 114, Jev 1 |
| 4 | Bilhetes de Época | pág. 114, precedente |
| 5 | Patrocínios e Publicidade | pág. 114, precedente |
| 6 | Merchandising e Licenciamento | pág. 114, precedente |
| 7 | Serviços Diretos | pág. 114, precedente |
| 8 | Outras | pág. 114, precedente |
| 9 | Participações nas Competições Europeias | pág. 115, precedente |
| 10 | Benefícios contratuais | pág. 115, precedente |
| 11 | Outras | pág. 115, precedente |
| 12 | (Custos)/Proveitos com transacções de passes de jogadores | pág. 95, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 116, precedente |
| 2 | Trabalhos especializados | pág. 116, precedente |
| 3 | Organização de jogos | pág. 116, precedente |
| 4 | Deslocações e Estadas | pág. 116, precedente |
| 5 | Honorários | pág. 116, precedente |
| 6 | Comissões | pág. 116, precedente |
| 7 | Seguros | pág. 116, Claude 0.85 |
| 8 | Equipamentos Desportivos | pág. 116, precedente |
| 9 | Publicidade e Propaganda | pág. 116, precedente |
| 10 | Outros FSE | pág. 116, precedente |
| 11 | Remunerações Órgãos Sociais | pág. 116, precedente |
| 12 | Remunerações do Pessoal | pág. 116, Claude 0.85 |
| 13 | Encargos com remunerações | pág. 116, precedente |
| 14 | Seguros | pág. 116, Claude 0.85 |
| 15 | Outros | pág. 116, precedente |
| 16 | Amortizações excluindo depreciação do plantel | pág. 95, precedente |
| 17 | Ajustamentos de dívidas a receber | pág. 117, Jev 1 |
| 18 | Provisão para complemento de Pensões de Reforma | pág. 117, precedente |
| 19 | Outras provisões para riscos e encargos | pág. 117, precedente |
| 20 | Cedência de Jogadores de terceiros | pág. 117, precedente |
| 21 | Quotizações | pág. 117, precedente |
| 22 | Imposto de Selo | pág. 117, precedente |
| 23 | Multas e outras penalidades | pág. 117, precedente |
| 24 | Penalidades Contratuais | pág. 117, precedente |
| 25 | Prospecção de Mercado | pág. 117, precedente |
| 26 | Outros | pág. 117, precedente |
| 27 | Amortizações do exercício - Futebol profissional | pág. 118, precedente |
| 28 | Perdas por imparidade - Futebol profissional | pág. 118, precedente |

### Meta

```text
2009: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2009-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): pt-primeiraliga, verificado contra roster cacheado de "2008–09 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2007-08.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2007-08.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 51, Jev 1 |
| 2 | Direitos Televisivos | pág. 51, Jev 1 |
| 3 | Bilheteira e Bilhetes de Época | pág. 51, precedente |
| 4 | Patrocinios e Publicidade | pág. 51, Jev 1 |
| 5 | Serviços Directos | pág. 51, precedente |
| 6 | Outras | pág. 51, precedente |
| 7 | Participações nas Competições Europeias | pág. 52, Jev 1 |
| 8 | Cedência de Jogadores a terceiros | pág. 52, Jev 0.98 |
| 9 | Benefícios contratuais | pág. 52, Jev 0.92 |
| 10 | Outras | pág. 52, precedente |
| 11 | (Custos)/Proveitos com transacções de passes de jogadores | pág. 40, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sub-contratos | pág. 52, Jev 0.9 |
| 2 | Trabalhos especializados | pág. 52, Jev 0.99 |
| 3 | Organização de jogos | pág. 52, Jev 1 |
| 4 | Deslocações e Estadas | pág. 52, Jev 1 |
| 5 | Honorários | pág. 52, Jev 1 |
| 6 | Comissões | pág. 52, precedente |
| 7 | Seguros | pág. 52, Claude 0.85 |
| 8 | Equipamentos Desportivos | pág. 52, precedente |
| 9 | Outros FSE | pág. 52, precedente |
| 10 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 11 | Remunerações Órgãos Sociais | pág. 53, Jev 1 |
| 12 | Remuneração do Pessoal | pág. 53, precedente |
| 13 | Encargos com remunerações | pág. 53, Jev 0.97 |
| 14 | Seguros | pág. 53, Claude 0.85 |
| 15 | Pensões de Reforma | pág. 53, precedente |
| 16 | Outros | pág. 53, Jev 0.9 |
| 17 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 18 | Amortizações excluindo depreciação do plantel | pág. 40, Claude 0.85 |
| 19 | Provisões e perdas por imparidade excluindo plantel | pág. 40, Jev 0.95 |
| 20 | Outros custos operacionais | pág. 40, Claude 0.85 |
| 21 | Amortizações e perdas de imparidade com passes de jogadores | pág. 40, Jev 0.9 |

### Meta

```text
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2008-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': Empréstimos 15 000 (L1036, no corriente) + 28 767 (L1042, corriente), miles de euros
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): En miles de euros: Caixa e equivalentes de caixa 332. Balance de Sporting SAD dice 332 miles; la nota 13 (depósitos a la orden) imprime 322, probable errata de una de las dos. Se usó el balance. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2007–08 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2007

### Ingresos

```text
2007: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2006-07.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2006-07.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à Exploração | pág. 19, Jev 0.98 |
| 2 | Outros Proveitos e Ganhos Operacionais | pág. 19, Jev 0.99 |
| 3 | BENEF. CONTRATIAIS | pág. 25, Jev 1 |
| 4 | CONR. EX. ANTERIORES | pág. 25, Jev 1 |
| 5 | O. P. EXTRAORDINAR. | pág. 25, Jev 0.98 |
| 6 | BILHETEIRA | pág. 8, Jev 1 |
| 7 | BILHETES ÉPOCA | pág. 8, Jev 1 |
| 8 | DIREITOS TV | pág. 8, Jev 1 |
| 9 | QUOTIZAÇÃO | pág. 8, Jev 1 |
| 10 | PATROCÍNIOS + PUBLIC. | pág. 8, Jev 1 |
| 11 | ROYALTIES | pág. 8, Jev 0.99 |
| 12 | PARTICIPAÇÃO LC | pág. 8, Jev 1 |
| 13 | Outros proveitos operacionais (resto) | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e Serviços Externos | pág. 19, Jev 1 |
| 2 | Remunerações | pág. 19, Jev 0.99 |
| 3 | Encargos Sociais | pág. 19, Jev 0.91 |
| 4 | Amortizações de Imob. Corpóreas e Incorpóreas | pág. 19, Jev 0.99 |
| 5 | Ajustamento de Dívidas de Clientes | pág. 19, Jev 1 |
| 6 | Provisões do Exercício | pág. 19, Jev 0.91 |
| 7 | Impostos | pág. 19, Claude 0.85 |
| 8 | Outros Custos e Perdas Operacionais | pág. 19, Jev 1 |
| 9 | Custos e Perdas Extraordinários | pág. 19, Jev 0.98 |

### Meta

```text
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3470. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 7860. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 8992. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 4098. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 6131. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 297. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 6618. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 655. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (31462+6659=38121) en 7 filas (37466); el resto (655) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: año anterior): "Dívidas a Instituições de Crédito" pág. 18 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: año anterior): "Cash Flow: (RLE) + (Amortizações + Provisões)" pág. 19
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 33 000 (L634) + 2 364 (L638; la transcripción decía 'Fornecedores, Conta Corrente 2 064', corregida contra el PDF pág. 18), miles de euros
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2006–07 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2006

### Ingresos

```text
2006: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2005-06.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2005-06.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à Exploração | pág. 18, Jev 0.98 |
| 2 | Outros Proveitos e Ganhos Operacionais | pág. 18, Jev 0.99 |
| 3 | G. Imobilizações | pág. 29, Jev 0.99 |
| 4 | Benef. Contratuais | pág. 29, Jev 1 |
| 5 | O. P. Extraordinár. | pág. 29, Jev 0.98 |
| 6 | Bilheteira | pág. 5, Jev 1 |
| 7 | Bilhetes Época | pág. 5, Jev 1 |
| 8 | Direitos TV | pág. 5, Jev 1 |
| 9 | Quotização | pág. 5, Jev 1 |
| 10 | Patrocínios | pág. 5, Jev 1 |
| 11 | Royalties | pág. 5, Jev 0.99 |
| 12 | Particip. UEFA | pág. 5, Claude 0.88 |
| 13 | Outros proveitos operacionais (resto) | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Corr Ex Anteriores | pág. 29, precedente |
| 2 | Fornecimentos e Serviços Externos | pág. 18, Jev 1 |
| 3 | Remunerações | pág. 18, Jev 0.99 |
| 4 | Outros | pág. 18, precedente |
| 5 | Amortizações de Imob. Corpóreas e Incorpó | pág. 18, precedente |
| 6 | Provisões | pág. 18, Claude 0.85 |
| 7 | Impostos | pág. 18, Claude 0.85 |
| 8 | Outros Custos e Perdas Operacionais | pág. 18, Jev 1 |
| 9 | Donativos | pág. 29, precedente |
| 10 | Multas e Penalid. | pág. 29, Claude 0.9 |
| 11 | Corr Ex Anteriores | pág. 29, precedente |
| 12 | O. C. Extraordinár. | pág. 29, Jev 0.95 |

### Meta

```text
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2006-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = exceptional_items. Claude 2026-10-16 (lote 84): corrección de ejercicios anteriores del lado ingreso, ingreso extraordinario: exceptional_items (CONVENCIONES-DATOS), como Nacional 2024-25. Ajuste categoria para mudarla sin cambiarle el signo (to-do 237 f)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 4070. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 5862. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 8106. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3788. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 4074. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 1170. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 4503. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 777. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (27810+4540=32350) en 7 filas (31573); el resto (777) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Dívidas a Instituições de Crédito" pág. 17 + "Clientes c/Corrente" pág. 17 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: año anterior): "Cash Flow: (RLE) + (Amortizações + Provis)" pág. 18
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 33 000 (L388) + 1 766 (L392, fila de dos lados con Clientes c/Corrente), miles de euros
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2005–06 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2005

### Ingresos

```text
2005: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2004-05.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2004-05.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à Exploração | pág. 18, Jev 0.98 |
| 2 | Outros Proveitos e Ganhos Operacionais | pág. 18, Jev 0.99 |
| 3 | G. Imobilizações | pág. 29, Jev 0.99 |
| 4 | Benef. Contratuais | pág. 29, Jev 1 |
| 5 | Corr. Exer. Anteriores | pág. 29, Jev 1 |
| 6 | O. P. Extraordinários | pág. 29, Jev 0.98 |
| 7 | Bilheteira | pág. 5, Jev 1 |
| 8 | Bilhetes Época | pág. 5, Jev 1 |
| 9 | Direitos TV | pág. 5, Jev 1 |
| 10 | Quotização | pág. 5, Jev 1 |
| 11 | Patrocínios | pág. 5, Jev 1 |
| 12 | Royalties | pág. 5, Jev 0.99 |
| 13 | Particip. UEFA | pág. 5, Claude 0.88 |
| 14 | Outros proveitos operacionais (resto) | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e Serviços Externos | pág. 18, Jev 1 |
| 2 | Remunerações | pág. 18, Jev 0.99 |
| 3 | Outros | pág. 18, precedente |
| 4 | Corpóreo e Incorpóreo | pág. 18, precedente |
| 5 | Provisões | pág. 18, Claude 0.85 |
| 6 | Impostos | pág. 18, Claude 0.85 |
| 7 | Outros Custos e Perdas Operacionais | pág. 18, Jev 1 |
| 8 | Custos e Perdas Extraordinários | pág. 18, Jev 0.98 |

### Meta

```text
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2005-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 6203. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 5736. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 9731. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3761. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2778. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 1215. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3053. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 412. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (29815+3074=32889) en 7 filas (32477); el resto (412) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento anterior): "Cash Flow: (RLE) + (Amortizações + Provisões)" pág. 18
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: documento siguiente): "Dívidas a Instituições de Crédito" pág. 17 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 15 000 (L361) + 10 728 (L365), miles de euros
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2004–05 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2004

### Ingresos

```text
2004: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2003-04.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2003-04.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à Exploração | pág. 15, Jev 0.98 |
| 2 | Outros Proveitos e Ganhos Operacionais | pág. 15, Jev 0.99 |
| 3 | Ganhos em Imobiliz. | pág. 19, Jev 0.99 |
| 4 | Benefícios Contratuais | pág. 19, precedente |
| 5 | Redução de Provisões | pág. 19, Jev 1 |
| 6 | O. Prov. e G. Extraord. | pág. 19, Jev 0.98 |
| 7 | Bilheteira | pág. 7, Jev 1 |
| 8 | Bilhetes de Época | pág. 7, Jev 1 |
| 9 | Dir. Transmissão Televisiva | pág. 7, Jev 1 |
| 10 | Quotas de Sócios | pág. 7, Jev 1 |
| 11 | Patrocínios e Publicidade | pág. 7, Jev 1 |
| 12 | Royalties | pág. 7, Jev 0.99 |
| 13 | Outros proveitos operacionais (resto) | pág. 7, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Corr. R. Ex. Anterior | pág. 19, precedente |
| 2 | Fornecimentos e Serviços Externos | pág. 15, Jev 1 |
| 3 | Remunerações | pág. 15, Jev 0.99 |
| 4 | Outros | pág. 15, precedente |
| 5 | Corpóreo e Incorpóreo | pág. 15, precedente |
| 6 | Provisões | pág. 15, Claude 0.85 |
| 7 | Impostos | pág. 15, Claude 0.85 |
| 8 | Outros Custos e Perdas Operacionais | pág. 15, Jev 1 |
| 9 | Donativos | pág. 19, precedente |
| 10 | Perdas em Imobilização | pág. 19, precedente |
| 11 | Multas e Penalidades | pág. 19, precedente |
| 12 | Corr. R. Ex. Anterior | pág. 19, precedente |
| 13 | O. Custos P. Extraord. | pág. 19, precedente |

### Meta

```text
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = exceptional_items. Claude 2026-10-16 (lote 84): corrección de ejercicios anteriores del lado ingreso, ingreso extraordinario: exceptional_items (CONVENCIONES-DATOS), como Nacional 2024-25. Ajuste categoria para mudarla sin cambiarle el signo (to-do 237 f)
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 4796. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 5325. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 7170. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3241. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2432. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 586. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2004: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 144. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (23668+26=23694) en 6 filas (23550); el resto (144) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Cash Flow: (RLE) + (Amortizações + Provisões)" pág. 15
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: año anterior): "Dívidas a Instituições de Crédito" pág. 14 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 5 000 (L537) + 25 708 (L541), miles de euros
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2003–04 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2003

### Ingresos

```text
2003: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2002-03.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2002-03.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à Exploração | pág. 21, Jev 0.98 |
| 2 | Outros Proveitos e Ganhos Operacionais | pág. 21, Jev 0.99 |
| 3 | Ganhos em Imobiliz. | pág. 31, Jev 0.99 |
| 4 | Benefícios Contratuais | pág. 31, precedente |
| 5 | Redução de Provisões | pág. 31, Jev 1 |
| 6 | O Prov. e G. Extraord. | pág. 31, Jev 0.98 |
| 7 | Bilheteira | pág. 9, Jev 1 |
| 8 | Bilhetes de Época | pág. 9, Jev 1 |
| 9 | Dir. Transmissão Televisiva | pág. 9, Jev 1 |
| 10 | Quotas de Sócios | pág. 9, Jev 1 |
| 11 | Patrocínios e Publicidade | pág. 9, Jev 1 |
| 12 | Royalties | pág. 9, Jev 0.99 |
| 13 | Outros proveitos operacionais (resto) | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Corr. R. Ex. Anterior. | pág. 31, precedente |
| 2 | Fornecimentos e Serviços Externos | pág. 21, Jev 1 |
| 3 | Remunerações | pág. 21, Jev 0.99 |
| 4 | Outros | pág. 21, precedente |
| 5 | Corpóreo e Incorpóreo | pág. 21, precedente |
| 6 | Provisões | pág. 21, Claude 0.85 |
| 7 | Impostos | pág. 21, Claude 0.85 |
| 8 | Outros Custos e Perdas Operacionais | pág. 21, Jev 1 |
| 9 | Donativos | pág. 31, precedente |
| 10 | Perdas em Imobilizaç. | pág. 31, precedente |
| 11 | Multas e Penalidades | pág. 31, precedente |
| 12 | Corr. R. Ex. Anterior. | pág. 31, precedente |
| 13 | O. Custos P. Extraord. | pág. 31, precedente |

### Meta

```text
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = exceptional_items. Claude 2026-10-16 (lote 84): corrección de ejercicios anteriores del lado ingreso, ingreso extraordinario: exceptional_items (CONVENCIONES-DATOS), como Nacional 2024-25. Ajuste categoria para mudarla sin cambiarle el signo (to-do 237 f)
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2527. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2053. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 6635. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3652. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2180. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 224. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2003: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 443. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (17607+107=17714) en 6 filas (17271); el resto (443) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1b (compuerta: documento siguiente): "Dívidas a Instituições de Crédito" pág. 20; cash escalón 1 (compuerta: documento anterior): "Cash Flow: (RLE) + (Amortizações + Provis" pág. 21 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 17 396 (L391) + 15 101 (L395), miles de euros
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2003–04 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2002

### Ingresos

```text
2002: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2001.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2001.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à Exploração | pág. 22, Jev 0.98 |
| 2 | Outros Proveitos e Ganhos Operacionais | pág. 22, Jev 0.99 |
| 3 | Ganhos em Imobiliz. | pág. 32, Jev 0.99 |
| 4 | Benefícios Contratuais | pág. 32, precedente |
| 5 | Redução de Provisões | pág. 32, Jev 1 |
| 6 | O Prov. e G. Extraord. | pág. 32, Jev 0.98 |
| 7 | Bilheteira | pág. 9, Jev 1 |
| 8 | Bilhetes de Época | pág. 9, Jev 1 |
| 9 | Dir. Transmissão Televisiva | pág. 9, Jev 1 |
| 10 | Quotas de Sócios | pág. 9, Jev 1 |
| 11 | Patrocínios | pág. 9, Jev 1 |
| 12 | Royalties | pág. 9, Jev 0.99 |
| 13 | Outros proveitos operacionais (resto) | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Corr. R. Ex. Anterior. | pág. 32, precedente |
| 2 | Fornecimentos e Serviços Externos | pág. 22, Jev 1 |
| 3 | Remunerações | pág. 22, Jev 0.99 |
| 4 | Outros | pág. 22, precedente |
| 5 | Corpóreo e Incorpóreo | pág. 22, precedente |
| 6 | Provisões | pág. 22, Claude 0.85 |
| 7 | Impostos | pág. 22, Claude 0.85 |
| 8 | Outros Custos e Perdas Operacionais | pág. 22, Jev 1 |
| 9 | Donativos | pág. 32, precedente |
| 10 | Perdas em Imobilizaç. | pág. 32, precedente |
| 11 | Multas e Penalidades | pág. 32, precedente |
| 12 | Corr. R. Ex. Anterior. | pág. 32, precedente |
| 13 | O. Custos P. Extraord. | pág. 32, precedente |

### Meta

```text
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2002-07-31. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2002. Claude 2026-10-16: el documento es el ejercicio del 1/8/2001 al 31/7/2002 (L17); la etiqueta sale del cierre: 2002. El nombre del archivo ('2001') hacía que el registro dijera 2001 y alta-club 2002
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 1.0222. Claude 2026-10-16: la nota 4 da 1 EUR = 0,9783 USD al 31/07/2002; el sitio guarda EUR por 1 USD = 1/0,9783 = 1,0222
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = exceptional_items. Claude 2026-10-16 (lote 84): corrección de ejercicios anteriores del lado ingreso, ingreso extraordinario: exceptional_items (CONVENCIONES-DATOS), como Nacional 2024-25. Ajuste categoria para mudarla sin cambiarle el signo (to-do 237 f)
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 5589. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2675. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 7073. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 3590. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 1930. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 523. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
2002: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 971. Claude 2026-10-16 (ok de Guido): cuadro de gestión de los proveitos (columna de resultados reales, igual al estado: mismo total de proveitos y resultado). Abre Prestações de Serviços + Proveitos Suplementares (21477+874=22351) en 6 filas (21380); el resto (971) queda en 'Outros proveitos operacionais (resto)'. Suma exacta
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1b (compuerta: documento siguiente): "Dívidas a Instituições de Crédito" pág. 21; cash escalón 1 (compuerta: documento siguiente): "Cash Flow: (RLE) + (Amortizações + Provis" pág. 22 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 24 486 (L433) + 11 885 (L437), miles de euros
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2002–03 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2001

### Ingresos

```text
2001: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-2000.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-2000.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prestações de Serviços | pág. 2, precedente |
| 2 | Subsídios à Exploração | pág. 2, precedente |
| 3 | Proveitos Suplementares | pág. 2, precedente |
| 4 | Outros Proveitos e Ganhos Operacionais | pág. 2, precedente |
| 5 | Proveitos e Ganhos Extraordinários | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e Serviços Externos | pág. 2, precedente |
| 2 | Remunerações | pág. 2, precedente |
| 3 | Outros | pág. 2, precedente |
| 4 | Corpóreo e Incorpóreo | pág. 2, precedente |
| 5 | Provisões | pág. 2, precedente |
| 6 | Impostos | pág. 2, precedente |
| 7 | Outros Custos e Perdas Operacionais | pág. 2, precedente |
| 8 | Custos e Perdas Extraordinários | pág. 2, precedente |

### Meta

```text
2001: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2001. Claude 2026-10-16: el documento es el ejercicio cerrado el 31/07/2001 (balance '31 JUL 01', L18 y L97); el nombre del archivo dice 2000
2001: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cierre = 2001-07-31. Claude 2026-10-16: ejercicio del 1/8/2000 al 31/7/2001 (columnas '31 JUL 01 | 31 JUL 00')
2001: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): moneda = PTE. Claude 2026-10-16: el ejercicio al 31/07/2001 está en miles de escudos (L14 'Valores expressos em milhares de escudos'); se carga en PTE con la paridad fija, como Sporting 2000
2001: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 228.9913. Claude 2026-10-16: 1 EUR = 200,482 PTE (paridad fija) y BCE al 31/07/2001: 1,142204 EUR por USD -> 228,9913 PTE por USD (FX_CLOSE PTE@2001-07-31)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento anterior): "Cash Flow: (RLE) + (Amortizações + Provisões)" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 1 650 000 (L71) + 3 465 922 (L75), miles de escudos
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2001–02 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## 2000

### Ingresos

```text
2000: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Sporting CP/relatorio-contas-1999.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Sporting CP/relatorio-contas-1999.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prestações de Serviços | pág. 2, precedente |
| 2 | Subsídios à Exploração | pág. 2, precedente |
| 3 | Proveitos Suplementares | pág. 2, Jev 1 |
| 4 | Outros Proveitos e Ganhos Operacionais | pág. 2, precedente |
| 5 | Proveitos e Ganhos Extraordinários | pág. 2, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e Serviços Externos | pág. 2, precedente |
| 2 | Remunerações | pág. 2, precedente |
| 3 | Encargos Sociais | pág. 2, precedente |
| 4 | Outros | pág. 2, precedente |
| 5 | Corpóreo e Incorpóreo | pág. 2, precedente |
| 6 | Provisões | pág. 2, precedente |
| 7 | Impostos | pág. 2, precedente |
| 8 | Outros Custos e Perdas Operacionais | pág. 2, precedente |
| 9 | Custos e Perdas Extraordinários | pág. 2, precedente |

### Meta

```text
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): moneda = PTE. Guido 2026-10-16 (por Claude): el ejercicio al 31/07/2000 está en miles de escudos; se carga en PTE con su tipo de cambio de cierre y la paridad fija a euro (200,482), como las liras de Lazio
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 216.9015. Claude 2026-10-16: 1 EUR = 200,482 PTE (paridad fija) y BCE al 31/07/2000: 1,0819 EUR por USD -> 216,9015 PTE por USD (FX_CLOSE PTE@2000-07-31)
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2000. Claude 2026-10-16: el documento es el ejercicio cerrado el 31/07/2000 (L62); la etiqueta sale del cierre
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = lump_football_operations. Claude 2026-10-16: el documento no desglosa Prestações de Serviços (3.117.769 contos) y no trae cuadro de gestión; en Sporting 2001-2007 el cuadro de gestión muestra que taquilla, abonos, TV, cuotas y patrocinios están dentro de Prestações: va como fútbol profesional sin desglosar
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = broadcasting. Claude 2026-10-16: el documento no desglosa Prestações de Serviços (3.117.769 contos) y no trae cuadro de gestión; en Sporting 2001-2007 el cuadro de gestión muestra que taquilla, abonos, TV, cuotas y patrocinios están dentro de Prestações: posiblemente incluido
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = matchday_competition. Claude 2026-10-16: el documento no desglosa Prestações de Serviços (3.117.769 contos) y no trae cuadro de gestión; en Sporting 2001-2007 el cuadro de gestión muestra que taquilla, abonos, TV, cuotas y patrocinios están dentro de Prestações: posiblemente incluido
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cierre = 2000-07-31. Claude 2026-10-16: el documento es el ejercicio del 1/8/1999 al 31/7/2000 (Demonstração dos Resultados em 31 de Julho de 2000); el nombre del archivo ('1999') es el año de inicio
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Cash Flow: (RLE) + (Amortizações + Provisões)" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: documento siguiente): "Dívidas a Instituições de Crédito" pág. 1 — DEUDA VACIADA 2026-10-17: toma una sola fila del par (mediano/largo + corto plazo del POC), o una escala mil veces chica, o un crédito ("Clientes c/Corrente") (to-do 260 f)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 f): deuda bancaria del balance POC, mediano/largo + corto plazo de 'Dívidas a Instituições de Crédito': 900 000 (L27) + 2 305 706 (L31), miles de escudos
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2000–01 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-27.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
José Alfredo Parreira Holtreman Roquette (1996-04-10 a 2000-07-31): Presidente del club (Conselho Directivo) del 10/4/1996 al 31/7/2000 (pt.wikipedia, lista de presidentes). Cubre los cierres 31/7/2000 y anteriores. Los .md de 1999 y 2000 no nombran al presidente del consejo de la SAD (sin coincidencias en relatorio-contas-2000.md); la SAD es controlada por el club.
António Augusto Serra Campos Dias da Cunha (2000-08-01 a 2005-10-18): Presidente del club del 1/8/2000 al 18/10/2005 (pt.wikipedia). Corrobora: relatorio-contas-2003-04.md:419 y relatorio-contas-2004-05.md:312 lo listan como Presidente del Conselho de Administração de la SAD; relatorio-contas-2005-06.md:328 registra su renuncia el 19/10/2005. Ojo: en relatorio-contas-2001.md:367 la SAD la presidía Miguel Ribeiro Telles (vicepresidente del club) y en relatorio-contas-2002-03.md:331-335 renunció el 31/7/2003 y quedó Bettencourt; se carga el presidente del club (dueño de la SAD), criterio del país.
Filipe Pinto Basto Soares Franco (2005-10-19 a 2009-06-05): Presidente del club desde el 19/10/2005 hasta su renuncia el 5/6/2009 (pt.wikipedia; relatorio-contas-2005-06.md:168, relatorio-contas-2008-09.md:336).
José Eduardo Fragoso Tavares de Bettencourt (2009-06-06 a 2011-03-25): Presidente del club del 6/6/2009 al 25/3/2011 (pt.wikipedia). relatorio-contas-2008-09.md:338 y relatorio-contas-2009-10.md:314: cooptado presidente de la SAD el 1/7/2009. relatorio-contas-2010-11.md:309: renunció el 15/1/2011 con efecto el 28/2/2011 (la SAD quedó sin él antes que el club); el cierre 30/6/2010 es de su gestión.
Luís Filipe Fernandes David Godinho Lopes (2011-03-27 a 2013-03-26): Presidente del club del 27/3/2011 al 26/3/2013 (pt.wikipedia). relatorio-contas-2010-11.md:311: designado presidente de la SAD el 28/3/2011; relatorio-contas-2011-12.md:630 firma. relatorio-contas-2012-13.md:217: renunció el 22/2/2013 (la SAD pasó a Bruno de Carvalho el 28/3/2013, ver siguiente); el cierre 30/6/2012 es suyo.
Bruno Miguel de Azevedo Gaspar de Carvalho (2013-03-27 a 2018-06-22): Presidente del club del 27/3/2013 al 22/6/2018 (pt.wikipedia). Corrobora: relatorio-contas-2012-13.md:221 (cooptado el 28/3/2013), relatorio-contas-2013-14.md:214 y 2014-15.md:259 (reelecto presidente de la SAD el 1/10/2014). La Wikipedia da el fin al 22/6; relatorio-contas-2017-18.md:291 dice que la asamblea lo destituyó el 23/6/2018. Los cierres 2013 a 2017 son suyos. El cierre 30/6/2018 queda en la comisión de gestión.
Artur Ryder Torres Pereira (2018-06-25 a 2018-09-08): Presidente de la comisión de gestión que condujo el club tras la destitución de la dirección (23/6/2018) hasta la elección del 8/9/2018. pt.wikipedia da inicio el 25/6/2018 en el cuerpo del artículo y 23/6 en el infobox; WikiSporting dice 24/6: las fuentes difieren por 1 o 2 días, sin efecto en el cierre del 30/6/2018. relatorio-contas-2017-18.md:1314 lo llama Presidente da Comissão de Gestão do SCP y administrador de la SAD (cooptado el 27/6/2018, :297); el presidente del consejo de la SAD en ese tramo fue José de Sousa Cintra (vicepresidente de la comisión, :293). El balance 2017/18 se aprobó ya con Varandas. Se carga a Torres Pereira por ser quien conducía el club.
Frederico Nuno Faro Varandas (2018-09-09 a hoy): Presidente del club desde el 9/9/2018 (elegido el 8/9/2018; tomó posse el 9/9: publico.pt 9/9/2018). relatorio-contas-2018-19.md:148: designado presidente de la SAD el 12/9/2018; firma los informes 2019 a 2025 (2019-20.md:890, 2020-21.md:778, 2024-25.md:1522). Sigue abierta.
Duda: Fecha de inicio exacta de la comisión de gestión de Torres Pereira (23, 24 o 25 de junio de 2018): no afecta ningún cierre.
Duda: Desfases de 1 a 2 días entre la Wikipedia y los informes en los cambios de gestión de 2011, 2013 y 2018: ningún cierre cae en esas ventanas.
Duda: En 2001 a 2003 el presidente del consejo de la SAD (Ribeiro Telles, luego Bettencourt) no era el presidente del club (Dias da Cunha): se carga el del club por criterio; Guido puede decidir si prefiere el de la SAD en esos 3 cierres (2001, 2002, 2003).
```

## Fuentes

### sportingcp-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2011-12

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2011-12.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2012-13

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2012-13.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2013-14

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2013-14.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2014-15

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2010-11

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2010-11.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2001

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2001.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2002-03

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2002-03.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2003-04

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2003-04.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2004-05

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2004-05.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2005-06

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2005-06.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2006-07

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2006-07.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-1999

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-1999.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2007-08

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2007-08.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2000

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2000.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2009-10

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2009-10.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sportingcp-pt-relatorio-contas-2008-09

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2008-09.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
