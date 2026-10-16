# avs-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/avs-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
AVS: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/AVS/relatorio-contas-2023-24.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Portugal/AVS.md; tools/cargar-lote.mjs).
```

```text
data/pt/avs-pt-data.js — AVS (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/AVS/relatorio-contas-2023-24.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "avs-pt" — slug de "AVS" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "AVS" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "AVS" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (68 de 70 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 78 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (68 de 70 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "avs-pt-relatorio-contas-2023-24" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "AVS"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"avs-pt-relatorio-contas-2023-24"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/AVS/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/AVS/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 16, Jev 1 |
| 2 | Receitas de bilheteira | pág. 16, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 16, Jev 1 |
| 4 | Receitas de televisão | pág. 16, Jev 1 |
| 5 | Merchandising | pág. 16, Jev 1 |
| 6 | Competições da UEFA e nacionais | pág. 16, Jev 1 |
| 7 | Subsídios e donativos de Associações/Federações/Liga | pág. 16, Jev 0.98 |
| 8 | Subsídios do Estado e outros entes públicos | pág. 16, Jev 1 |
| 9 | Donativos de partes não relacionadas | pág. 16, Jev 1 |
| 10 | Contribuições/Donativos de partes relacionadas | pág. 16, Jev 0.95 |
| 11 | Rendimentos de operações extra-futebol não relacionadas com clube (l) | pág. 16, Jev 0.9 |
| 12 | Outros ganhos extraordinários | pág. 16, Jev 1 |
| 13 | Outros rendimentos operacionais | pág. 16, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo mercadorias vendidas e matérias consumidas | pág. 16, Jev 0.91 |
| 2 | Remunerações do pessoal | pág. 29, Claude 0.85 |
| 3 | Encargos sobre Remunerações | pág. 29, Jev 0.93 |
| 4 | Indemnizações | pág. 29, precedente |
| 5 | Seguro Ac. Trab. e Doenças Profi. | pág. 29, Claude 0.8 |
| 6 | Gastos com ação social | pág. 29, precedente |
| 7 | Outros gastos com Pessoal | pág. 29, precedente |
| 8 | Depreciações de ativos tangíveis | pág. 16, Jev 1 |
| 9 | Amortizações de ativos intangíveis exc. atletas | pág. 16, Jev 1 |
| 10 | Perdas por imparidade exc. atletas | pág. 16, Jev 1 |
| 11 | Reversões de Provisões/Imparidades exc. Atletas | pág. 16, precedente |
| 12 | Gastos em dia de jogo | pág. 16, Jev 1 |
| 13 | Gastos com logística e segurança | pág. 16, Jev 0.96 |
| 14 | Gastos de patrocínios, publicidade e corporate | pág. 16, Jev 0.99 |
| 15 | Gastos de actividades relacionadas com "comercial" | pág. 16, precedente |
| 16 | Gastos com conservação e reparação | pág. 16, Jev 0.99 |
| 17 | Gastos com agentes e intermediários | pág. 16, precedente |
| 18 | Gastos de operações extra-futebol não relacionadas com o clube (m) | pág. 16, Claude 0.8 |
| 19 | Impostos | pág. 29, Jev 0.97 |
| 20 | Outros | pág. 29, Jev 0.99 |
| 21 | Honorários | pág. 16, Jev 1 |
| 22 | Outros gastos operacionais | pág. 16, Jev 0.99 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): resultado-final = -3.041.302,19. Claude 2026-10-16 (lote 82): pérdida; el resultado que tomó la carga (+3.041.302) sale de la tabla de L613 con el signo al final ('3 041 302,19 € -'), que se perdió. El estado (L513 '- 3 041 302,19 €') y el resumen (L229 '(3.041.302,19)') dicen negativo; ingresos y gastos cierran con lo impreso
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "AVS".
```

## Fuentes

### avs-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/AVS/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
