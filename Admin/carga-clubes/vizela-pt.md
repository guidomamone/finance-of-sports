# vizela-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/vizela-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Vizela: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.pdf. brandColor #00A3E0
(procedencia en Admin/sourcing/Portugal/Vizela.md; tools/cargar-lote.mjs).
```

```text
data/pt/vizela-pt-data.js — Futebol Clube de Vizela - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "vizela-pt" — slug de "Vizela" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube de Vizela - Futebol, SAD" — respuesta de Guido en la cola (3bf97d4)
  displayName        ok        "Vizela" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (87 de 89 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 145 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (87 de 89 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "vizela-pt-relatorio-e-contas-2024-25-fcv" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"vizela-pt-relatorio-e-contas-2024-25-fcv"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 19, Jev 1 |
| 2 | Receitas de bilheteira | pág. 19, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 19, Jev 1 |
| 4 | Receitas de televisão | pág. 19, Jev 1 |
| 5 | Merchandising | pág. 19, Jev 1 |
| 6 | Competições da UEFA e nacionais | pág. 19, Jev 1 |
| 7 | Cedência de jogadores | pág. 19, Jev 1 |
| 8 | Outros | pág. 19, precedente |
| 9 | Município de Vizela | pág. 30, Claude 0.8 |
| 10 | I.E.F.P | pág. 30, Claude 0.85 |
| 11 | Outras entidades (UEFA/FPF) | pág. 30, precedente |
| 12 | Outros rendimentos suplementares | pág. 36, Jev 1 |
| 13 | Subsídio deslocação | pág. 36, Jev 1 |
| 14 | Distribuição de lucros Placard eapostas on-line | pág. 36, Claude 0.85 |
| 15 | Outros | pág. 36, precedente |
| 16 | Gastos/rendimentos com transações de passes de atletas | pág. 19, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 19, Jev 0.97 |
| 2 | Subcontratos | pág. 35, Jev 0.98 |
| 3 | Serviços especializados | pág. 35, Jev 0.98 |
| 4 | Materiais | pág. 35, Claude 0.8 |
| 5 | Energia e fluidos | pág. 35, Jev 1 |
| 6 | Deslocações, estadas e transportes | pág. 35, Jev 1 |
| 7 | Serviços diversos | pág. 35, Jev 0.96 |
| 8 | Remunerações órgãos sociais | pág. 36, Jev 1 |
| 9 | Remunerações pessoal | pág. 36, precedente |
| 10 | Indemnizações | pág. 36, precedente |
| 11 | Encargos sobre remunerações | pág. 36, Jev 0.97 |
| 12 | Seguros | pág. 36, precedente |
| 13 | Outros gastos com pessoal | pág. 36, precedente |
| 14 | Imparidade de dívidas a receber (perdas/reversões) | pág. 19, Jev 0.99 |
| 15 | Provisões (aumentos / reduções) | pág. 19, Jev 0.98 |
| 16 | Impostos | pág. 37, Jev 0.92 |
| 17 | Multas e outras penalidades | pág. 37, Jev 0.99 |
| 18 | Outros | pág. 37, Jev 0.99 |
| 19 | Gastos/reversões de depreciação e de amortização(excluindo passes de jogadores) | pág. 19, Claude 0.85 |
| 20 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 19, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela".
```

## Fuentes

### vizela-pt-relatorio-e-contas-2024-25-fcv

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
