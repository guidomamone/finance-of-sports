# omonia29maiou-cy — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/omonia29maiou-cy-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Omonia 29 Maiou: alta por tools/alta-club.mjs (2026-10-21) desde Clubes/Chipre/Omonia 29 Maiou/wf-src-A.L.S._OMONOIA_29_-Annual_Financial_Statements_2024.pdf. brandColor #117143
(procedencia en Admin/sourcing/Chipre/Omonia 29 Maiou.md; tools/cargar-lote.mjs).
```

```text
data/cy/omonia29maiou-cy-data.js — Omonia 29 Maiou (CY).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-21), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Chipre/Omonia 29 Maiou/wf-src-A.L.S._OMONOIA_29_-Annual_Financial_Statements_2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "omonia29maiou-cy" — slug de "Omonia 29 Maiou" + '-cy' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Omonia 29 Maiou" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Omonia 29 Maiou" — nombre de la carpeta del club en Clubes/
  country            ok        "CY" — carpeta de país "Chipre" (tabla de referencia ISO, tools/paises-referencia.json)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Chipre
  fiscalYearStart    ok        "06-01" — cierre del ejercicio: contenido del .md (3 de 3 fechas de fin de mes caen en el mes 5)
  sport              ok        "futbol" — la liga cy-seconddivision del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-05-31" — año del ejercicio + mes de cierre (contenido del .md (3 de 3 fechas de fin de mes caen en el mes 5))
  reportType         ok        "official_balance_sheet" — escalón 2: la verificación del documento cerró con el resultado impreso (cierra (como impresos))
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Chipre (tabla de referencia ISO, tools/paises-referencia.json)
  fxRef              ok        "EUR@2024-05-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.921489. --escribir agrega 'EUR@2024-05-31' a FX_CLOSE
  sourceId           ok        "omonia29maiou-cy-wf-src-a-l-s-omonoia-29-annual-financial-statements-2024" — clubId + nombre del archivo en slug
  liga               ok        "cy-seconddivision" — roster cacheado de "2023–24 Cypriot Second Division" (tools/club-league-reference/cy.json), coincidencia exacta "Omonia 29M"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-05-31","sourceId":"omonia29maiou-cy-wf-src-a-l-s-omonoia-29-annual-financial-statements-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Chipre/Omonia 29 Maiou/wf-src-A.L.S._OMONOIA_29_-Annual_Financial_Statements_2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chipre/Omonia 29 Maiou/wf-src-A.L.S._OMONOIA_29_-Annual_Financial_Statements_2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Συνδρομές μελών | pág. 1, Jev 1 |
| 2 | Εισιτήρια διαρκείας | pág. 1, Jev 1 |
| 3 | Έσοδα αγώνων | pág. 1, Claude 0.8 |
| 4 | Χορηγίες και εισφορές | pág. 1, Jev 0.98 |
| 5 | Έσοδα μπουτίκ | pág. 1, Jev 1 |
| 6 | Έσοδα από εκδηλώσεις | pág. 1, Jev 0.91 |
| 7 | Μέλη Premium | pág. 1, Jev 0.97 |
| 8 | Έσοδα από τμήμα έρευνας | pág. 1, precedente |
| 9 | Έσοδα μεταγραφών | pág. 1, Jev 0.99 |
| 10 | Λαχνοί | pág. 1, Jev 1 |
| 11 | Kids Club | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ενοίκια και ζημιές γηπέδων | pág. 1, precedente |
| 2 | Στολές παικτών | pág. 1, precedente |
| 3 | Αποθέματα στο τέλος | pág. 1, Jev 1 |
| 4 | Διάφορα έξοδα | pág. 1, Jev 0.99 |
| 5 | Έξοδα ποδοσφαιρικού τμήματος | pág. 1, precedente |
| 6 | Έξοδα ιατρών, φυσιοθεραπευτών | pág. 1, precedente |
| 7 | Έξοδα αγώνων | pág. 1, Jev 1 |
| 8 | Νερά | pág. 1, Jev 1 |
| 9 | Δικαιώματα τραπεζών | pág. 1, Jev 1 |
| 10 | Αποθέματα στην αρχή | pág. 1, Jev 1 |
| 11 | Κοινωνικές ασφαλίσεις | pág. 1, Jev 0.96 |
| 12 | Μισθοί | pág. 1, Jev 0.99 |
| 13 | Αποζημείωσεις | pág. 1, precedente |
| 14 | Διοικητικά έξοδα | pág. 1, Jev 1 |
| 15 | Γραφική ύλη και εκτυπωτικά | pág. 1, Jev 1 |
| 16 | Προετοιμασία ποδοσφαιριστών | pág. 1, precedente |
| 17 | Αθλητικό υλικό για προπόνηση | pág. 1, Jev 0.92 |
| 18 | Πρόστιμα | pág. 1, Jev 0.96 |
| 19 | Μεταφορικά ομάδας και διαμονή στην Πάφο | pág. 1, Jev 1 |
| 20 | Έξοδα δεξίωσης ποδοσφαιριστών | pág. 1, Jev 0.98 |
| 21 | Έξοδα οχημάτων | pág. 1, Jev 0.98 |
| 22 | Πακέτα μελών | pág. 1, Jev 0.93 |
| 23 | Έξοδα οικήματος | pág. 1, Jev 1 |
| 24 | Έξοδα προπονητικού κέντρου | pág. 1, precedente |
| 25 | Εγγραφή παικτών | pág. 1, precedente |
| 26 | Αποσβέσεις | pág. 1, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): cero-real = Televisión. El estado de resultados de Omonia 29is Maiou (2023-24, club de la 2ª división chipriota) no trae ningún ingreso de televisión: sus ingresos son cuotas de socios, abonos, partidos, patrocinios, boutique, eventos, premium, departamento de investigación, sorteos y Kids Club
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-21): cy-seconddivision, verificado contra roster cacheado de "2023–24 Cypriot Second Division" (tools/club-league-reference/cy.json), coincidencia exacta "Omonia 29M".
```

## Fuentes

### omonia29maiou-cy-wf-src-a-l-s-omonoia-29-annual-financial-statements-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Chipre/Omonia 29 Maiou/wf-src-A.L.S._OMONOIA_29_-Annual_Financial_Statements_2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
