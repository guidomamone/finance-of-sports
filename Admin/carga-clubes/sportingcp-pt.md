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

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
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

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2018–19 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
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

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2010–11 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Sporting CP".
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
