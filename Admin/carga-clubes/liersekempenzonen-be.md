# liersekempenzonen-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/liersekempenzonen-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Lierse Kempenzonen: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2018-06-30-individual.pdf. brandColor #FFD500
(procedencia en Admin/sourcing/Bélgica/Lierse Kempenzonen.md; tools/cargar-lote.mjs).
```

```text
data/be/liersekempenzonen-be-data.js — Lierse Kempenzonen VZW (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2018-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "liersekempenzonen-be" — slug de "Lierse Kempenzonen" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Lierse Kempenzonen VZW" — respuesta de Guido en la cola (9ebfdcb)
  displayName        ok        "Lierse Kempenzonen" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2018-06-30) y contenido del .md (6 de 7 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2018 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2018-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2018-06-30) y contenido del .md (6 de 7 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2018-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2018-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2018-06-30 = 0.85778 (Tipo de referencia del Banco Central Europeo, última rueda hábil a
  sourceId           ok        "liersekempenzonen-be-jaarrekening-2018-06-30-individual" — clubId + nombre del archivo en slug
  liga               ok        "be-challengerproleague" — roster cacheado de "2017–18 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia única por palabras "Lierse" = "Lierse Kempen

FISCAL YEAR META PROPUESTO para 2018 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2018: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2018-06-30","sourceId":"liersekempenzonen-be-jaarrekening-2018-06-30-individual"}
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2018-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse Kempenzonen/jaarrekening-2018-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 6, Jev 0.99 |
| 2 | Uitzonderlijke opbrengsten | pág. 6, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 10, Jev 0.99 |
| 2 | Werkgeversbijdragen voor sociale verzekeringen | pág. 10, Jev 1 |
| 3 | Andere personeelskosten | pág. 10, Claude 0.8 |
| 4 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 6, Jev 0.92 |
| 5 | Andere bedrijfskosten | pág. 6, Jev 0.91 |
| 6 | Uitzonderlijke kosten | pág. 6, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-20): be-challengerproleague, verificado contra roster cacheado de "2017–18 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia única por palabras "Lierse" = "Lierse Kempenzonen".
```

## Fuentes

### liersekempenzonen-be-jaarrekening-2018-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2018-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
