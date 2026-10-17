# felgueiras-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/felgueiras-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Felgueiras: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.pdf. brandColor #0000FF
(procedencia en Admin/sourcing/Portugal/Felgueiras.md; tools/cargar-lote.mjs).
```

```text
data/pt/felgueiras-pt-data.js — Futebol Clube de Felgueiras - Futebol SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "felgueiras-pt" — slug de "Felgueiras" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube de Felgueiras - Futebol SAD" — respuesta de Guido en la cola (5b71c76)
  displayName        ok        "Felgueiras" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: los demás .md del club (2 de 2 documentos cierran en el mes 6); este documento no alcanza solo
  sport              ok        "futbol" — el .md nombra el fútbol 94 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (los demás .md del club (2 de 2 documentos cierran en el mes 6); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.pdf"), y no hay un consolidado del
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "felgueiras-pt-demonstracoes-financeiras-individuais-epoca-2023-2024" — clubId + nombre del archivo en slug
  liga               ok        "pt-liga3" — roster cacheado de "2023–24 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Felgueiras"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"felgueiras-pt-demonstracoes-financeiras-individuais-epoca-2023-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 6, Jev 0.98 |
| 2 | Subsídios à exploração | pág. 6, Jev 0.99 |
| 3 | Outros rendimentos | pág. 6, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e serviços externos | pág. 6, Jev 0.99 |
| 2 | Remunerações do pessoal | pág. 24, Claude 0.85 |
| 3 | Encargos sobre remunerações | pág. 24, Jev 0.95 |
| 4 | Seguros | pág. 24, precedente |
| 5 | Outros gastos com pessoal | pág. 24, precedente |
| 6 | Outros gastos | pág. 6, Jev 1 |
| 7 | Gastos/reversões de depreciação e de amortização | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 2 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" no corriente; corriente "-"
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2023–24 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Felgueiras".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Felgueiras/Fecho-contas-2022-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Felgueiras/Fecho-contas-2022-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 19, Jev 0.98 |
| 2 | Subsídios à exploração | pág. 19, Jev 0.99 |
| 3 | Outros rendimentos | pág. 19, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 36, Jev 0.98 |
| 2 | Publicidade e propaganda | pág. 36, Jev 1 |
| 3 | Vigilância e segurança | pág. 36, Jev 0.96 |
| 4 | Honorários | pág. 36, Jev 1 |
| 5 | Outros | pág. 36, precedente |
| 6 | Ferramentas e utensílios de desgaste rápido | pág. 36, Jev 1 |
| 7 | Material de escritório | pág. 36, Jev 1 |
| 8 | Eletricidade | pág. 36, Jev 1 |
| 9 | Água | pág. 36, Jev 1 |
| 10 | Outros | pág. 36, precedente |
| 11 | Deslocações e estadas | pág. 36, Jev 1 |
| 12 | Transportes de mercadorias | pág. 36, precedente |
| 13 | Serviços diversos | pág. 36, Jev 0.93 |
| 14 | Gastos com o pessoal | pág. 19, Jev 0.95 |
| 15 | Outros gastos | pág. 19, Jev 1 |
| 16 | Gastos/reversões de depreciação e de amortização | pág. 19, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2023-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 0.9203. Claude 2026-10-16 (lote 82): las cotizaciones EUR/USD de L325 son de un párrafo sobre 2015 copiado en el informe, no del cierre. Cierre 30/06/2023: 1 EUR = 1,0866 USD (BCE), EUR por 1 USD = 0,9203, igual que Benfica 2022-23 y AC Milan 2022-23
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 18
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" no corriente; corriente vacío
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2022–23 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia única por palabras "Felgueiras 1932" = "Felgueiras".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 6, precedente |
| 2 | Subsídios à exploração | pág. 6, precedente |
| 3 | Outros rendimentos | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 18, Jev 0.99 |
| 2 | Publicidade e propaganda | pág. 18, Jev 1 |
| 3 | Vigilância e segurança | pág. 18, Jev 0.97 |
| 4 | Honorários | pág. 18, Jev 1 |
| 5 | Ferramentas e utensílios de desgaste rápido | pág. 18, Jev 1 |
| 6 | Material de escritório | pág. 18, Jev 1 |
| 7 | Eletricidade | pág. 18, Jev 1 |
| 8 | Outros | pág. 18, precedente |
| 9 | Deslocações e estadas | pág. 18, Jev 1 |
| 10 | Transportes de mercadorias | pág. 18, Jev 0.98 |
| 11 | Rendas e alugueres | pág. 18, precedente |
| 12 | Comunicação | pág. 18, Jev 1 |
| 13 | Contencioso e notariado | pág. 18, Jev 1 |
| 14 | Despesas de representação | pág. 18, Jev 1 |
| 15 | Limpeza, higiene e conforto | pág. 18, Jev 1 |
| 16 | Outros serviços | pág. 18, Jev 1 |
| 17 | Remunerações | pág. 16, Jev 1 |
| 18 | Outros gastos | pág. 16, precedente |
| 19 | Outros gastos | pág. 6, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2022-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 7
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" corriente (no hay no corriente); el documento 2022-23 lo reexpresa en 1 054 016,25
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2021–22 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Felgueiras".
```

## Fuentes

### felgueiras-pt-demonstracoes-financeiras-individuais-epoca-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### felgueiras-pt-fecho-contas-2022-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Felgueiras/Fecho-contas-2022-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### felgueiras-pt-fecho-de-contas-sad-2021-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
