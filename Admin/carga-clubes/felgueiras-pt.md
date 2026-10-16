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

### Liga

```text
alta-club.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2023–24 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Felgueiras".
```

## Fuentes

### felgueiras-pt-demonstracoes-financeiras-individuais-epoca-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
