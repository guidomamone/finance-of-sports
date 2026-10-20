# rapidwien-at — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/rapidwien-at-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Rapid Wien: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.pdf. brandColor #009150
(procedencia en Admin/sourcing/Austria/Rapid Wien.md; tools/cargar-lote.mjs).
```

```text
data/at/rapidwien-at-data.js — SK Rapid GmbH (Austria).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "rapidwien-at" — slug de "Rapid Wien" + '-at' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "SK Rapid GmbH" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social de la sociedad que oper
  displayName        ok        "Rapid Wien" — nombre de la carpeta del club en Clubes/
  country            ok        "AT" — carpeta de país "Austria" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Austria
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-
  sport              ok        "futbol" — el .md nombra el fútbol 11 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): e
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consol
  currency           ok        "EUR" — moneda de curso legal de Austria (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "rapidwien-at-geschaeftsbericht-2023-24" — clubId + nombre del archivo en slug
  liga               ok        "at-bundesliga" — roster cacheado de "2023–24 Austrian Football Bundesliga" (tools/club-league-reference/at.json), coincidencia única por palabras "SK Rapid" = "Rapid W

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"rapidwien-at-geschaeftsbericht-2023-24"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsatzerlöse | pág. 26, Jev 0.99 |
| 2 | Erträge aus dem Abgang von Anlagevermögen | pág. 26, Jev 0.99 |
| 3 | Erträge aus der Auflösung von Rückstellungen | pág. 26, Jev 1 |
| 4 | Übrige | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwendungen Spielbetrieb, Transfers etc. | pág. 26, precedente |
| 2 | Aufwendungen für bezogene Leistungen | pág. 26, precedente |
| 3 | Löhne & Gehälter | pág. 26, precedente |
| 4 | Soziale Aufwendungen | pág. 26, precedente |
| 5 | Abschreibungen | pág. 26, precedente |
| 6 | Steuern, soweit sie nicht unter Steuern vom Einkommen fallen | pág. 26, Jev 1 |
| 7 | Übrige | pág. 26, Jev 0.99 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2023-24; el registro no trae cierre
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-20): at-bundesliga, verificado contra roster cacheado de "2023–24 Austrian Football Bundesliga" (tools/club-league-reference/at.json), coincidencia única por palabras "SK Rapid" = "Rapid Wien".
```

## Fuentes

### rapidwien-at-geschaeftsbericht-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
