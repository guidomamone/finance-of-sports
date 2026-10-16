# gilvicente-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/gilvicente-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Gil Vicente: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.pdf. brandColor #ED3124
(procedencia en Admin/sourcing/Portugal/Gil Vicente.md; tools/cargar-lote.mjs).
```

```text
data/pt/gilvicente-pt-data.js — Gil Vicente (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "gilvicente-pt" — slug de "Gil Vicente" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Gil Vicente" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Gil Vicente" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (211 de 211 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 73 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (211 de 211 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-15): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "gilvicente-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"gilvicente-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Gil Vicente/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda Merchandising | pág. 55, Claude 0.85 |
| 2 | Venda e Cedência de Atletas | pág. 55, Jev 1 |
| 3 | Publicidade | pág. 55, Jev 1 |
| 4 | Direitos Televisivos | pág. 55, Jev 1 |
| 5 | Receitas de Jogos - Bilhetes | pág. 55, Jev 1 |
| 6 | Receitas de Jogos - Lugares Cativos | pág. 55, precedente |
| 7 | Participação nas Competições | pág. 55, Jev 1 |
| 8 | Outras Prestações de Serviços | pág. 55, Jev 1 |
| 9 | FEDERAÇÃO PORTUGUESA DE FUTEBOL | pág. 55, precedente |
| 10 | INSTITUTO EMPREGO FORMAÇÃO PROFISSIONAL | pág. 55, Claude 0.85 |
| 11 | LIGA PORTUGUESA DE FUTEBOL PROFISSIONAL | pág. 55, precedente |
| 12 | Outros rendimentos suplementares | pág. 57, Jev 1 |
| 13 | Outros não especificados | pág. 57, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 29, Jev 0.98 |
| 2 | Comissões | pág. 56, precedente |
| 3 | Honorários | pág. 56, Jev 1 |
| 4 | Conservação e Reparações | pág. 56, Jev 0.97 |
| 5 | Publicidade e Propaganda | pág. 56, Jev 1 |
| 6 | Trabalhos especializados | pág. 56, Jev 0.99 |
| 7 | Serviços bancários | pág. 56, Jev 0.97 |
| 8 | Deslocações | pág. 56, Jev 1 |
| 9 | Inscrições de Atletas | pág. 56, Jev 0.96 |
| 10 | Despesas Médicas | pág. 56, precedente |
| 11 | Organização de Jogos | pág. 56, Jev 1 |
| 12 | Material de Ginásio e Treino | pág. 56, precedente |
| 13 | Produtos Energéticos | pág. 56, precedente |
| 14 | Equipamentos Desportivos | pág. 56, precedente |
| 15 | Direitos de Formação | pág. 56, Jev 0.97 |
| 16 | Empréstimos de Atletas | pág. 56, precedente |
| 17 | Despesas Diversas | pág. 56, Jev 1 |
| 18 | Serviços Scouting | pág. 56, precedente |
| 19 | SEGUROS | pág. 56, Claude 0.85 |
| 20 | Rendas e Alugueres | pág. 56, precedente |
| 21 | CONTENCIOSO E NOTARIADO | pág. 56, Jev 1 |
| 22 | Outros Serviços | pág. 56, Jev 1 |
| 23 | Comunicação | pág. 56, Jev 1 |
| 24 | LIMPEZA, HIGIENE E CONFORTO | pág. 56, Jev 1 |
| 25 | COMBUSTÍVEIS | pág. 56, Jev 0.98 |
| 26 | ELETRICIDADE | pág. 56, Jev 1 |
| 27 | ÁGUA | pág. 56, Jev 1 |
| 28 | GÁS | pág. 56, Jev 0.97 |
| 29 | Outros Serviços | pág. 56, Jev 1 |
| 30 | MATERIAL ESCRITÓRIO | pág. 56, Jev 1 |
| 31 | FERR. e UTENS. DESGASTE RÁPIDO | pág. 56, Jev 1 |
| 32 | Bilhetes | pág. 56, precedente |
| 33 | ARTIGOS PARA OFERTA | pág. 56, Jev 0.98 |
| 34 | Remunerações do Pessoal | pág. 57, Claude 0.85 |
| 35 | Encargos sobre remunerações | pág. 57, Jev 0.93 |
| 36 | Seguros acidentes no trabalho e doença | pág. 57, Jev 0.93 |
| 37 | Outros gastos com o pessoal | pág. 57, precedente |
| 38 | Imparidade de dívidas a receber (perdas/reversões) | pág. 29, Jev 0.99 |
| 39 | Direitos económicos desportivos | pág. 58, precedente |
| 40 | Mecanismo de solidariedade | pág. 58, Jev 0.97 |
| 41 | Quotizações | pág. 58, precedente |
| 42 | Multas e penalidades | pág. 58, Jev 0.96 |
| 43 | Outras diversos | pág. 58, Jev 1 |
| 44 | Gastos/reversões de depreciação e de amortização | pág. 29, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente".
```

## Fuentes

### gilvicente-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
