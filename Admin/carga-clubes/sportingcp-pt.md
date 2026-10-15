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

## Fuentes

### sportingcp-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
