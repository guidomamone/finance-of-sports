# Esquema JSON de los datos de un club (to-do 245)

Estado: VIGENTE. El JSON `data/<país>/<id>.json` es la fuente de cada club y `<id>-data.js` se genera de ahí (`tools/generar-data.mjs`). El JSON Schema formal
está en `data/schema/club-v2.json` (`club-v1.json` queda publicado y congelado). Lo de abajo describe el esquema; las secciones de "fase 1" y "fase 2" del final son
historia de cómo se llegó. La capa genérica de categorías (`category` + `subcategory`, esquema 2.0) está diseñada en `Admin/mediciones/248-plan.md`.

## Qué hay hoy (medido)

Cada archivo de club define siempre las mismas piezas: `revenueLinesByYear`, `expenseLinesByYear`, `fiscalYearMeta`, `presupuestoOverlayByYear`,
`pasesData`, `resultadosData`, `titulosData`, más `Object.assign(sources, {...})` (las fuentes), a veces `gestionesByClub.<id>` (40 clubes) y
`memberCountByClub.<id>` (32). Cinco clubes traen además `presupuestoSupuestos/Financiero/InversionesByYear`; uno, `finanzasYears` y `finanzasGestiones`.
Una línea tiene `rawLabel`, `normalizedCategory` (26 categorías), `amountNative`, `disclosureLevel` (en 170 líneas falta) y, en 493, `items` (pares [rótulo, importe]).
`fiscalYearMeta[año]` tiene 11 campos que siempre están (`currency`, `sourceId`, `reportType`, `netInterest`, `tax`, `officialTotalRevenue/Expenses`...)
y otros opcionales (`fxRef` 1.107 de 1.197, `extraRows` 852, `sinDesglose` 312, `incluidoEn` 167, `fx`+`fxSource` 90-107, `staffCost` 9).
La unidad es implícita (millones de la moneda del club, `amountNative`); la moneda está en cada año y en `data/clubs.js`; el cierre del ejercicio lo da `tools/cierre-ejercicio.js` (`cierreDelClub`: registro del club, ajuste o inicio del año fiscal).

## Qué se decide (producto, 4 puntos)

1. **Un archivo por club** (`<id>.json`, 313 archivos), no por país. Diffs chicos, igual que hoy.
2. **Los importes se quedan en millones de la moneda del club**, con la unidad escrita: `"unit": {"scale": 1000000, "label": "millions of currency"}`. No se pasa a unidades
   enteras: cambiaría los números (redondeos de 6 decimales) y la ida y vuelta dejaría de dar idéntico.
3. **Nombres en inglés y snake_case** (`label`, `category`, `amount`, `fiscal_year`...), pensados para una API; un diccionario fijo los traduce de ida y de vuelta a los de hoy.
   Alternativa: dejar los nombres actuales (camelCase y mezcla español/inglés como `sinDesglose.renglon`). Recomiendo traducir una vez, ahora que nadie los consume afuera.
4. **"Fecha de corte" son dos cosas, las dos explícitas**: `period_end` por ejercicio (el cierre, de `cierreDelClub`) y `exported_at` del archivo (cuándo se generó).

## Esquema (schema_version "2.0")

```
archivo
  schema_version      "2.0"
  exported_at         "2026-10-20"
  unit                { scale: 1000000, label: "millions of currency" }   // vale para todos los importes del archivo
  club                { id, name, display_name, country, reporting_currency, fiscal_year_start, sport, predecessor_id?, taxonomy }   // sport en inglés ("football"); taxonomy = versión del mapa ("football-1"); predecessor_id (opcional): el club del que este es sucesor, otra entidad legal con el mismo nombre o estadio (Lierse SK, NV, sucesor de Lierse Kempenzonen, vzw)
  sources[]           { id, title, type, reliability, url }
  management[]        { id, name, first_year, last_year }               // gestionesByClub
  members             número o null                                      // memberCountByClub
  years[]             (uno por ejercicio, ordenados)
    fiscal_year       2024
    period_end        "2024-12-31"  (de cierreDelClub)
    currency          "BRL"
    fx                { ref, rate, source }      // ref = "BRL@2024-12-31"; cada sub-clave solo si el ejercicio la tiene (clave ausente ≠ null)
    source_id         id de sources[]
    report_type       "official_balance_sheet" | ...
    management_id     id de management[] o null
    revenue[]         { label, category, subcategory, amount, disclosure, items?: [[label, amount]] }   // category: genérica, derivada (data/schema/taxonomy-<versión>.json); subcategory: la del deporte
    expenses[]        igual (amount negativo, como hoy)
    financial         { net_interest, tax, profit_on_player_sales, asset_sales, gross_debt, cash, staff_cost? }   // null donde hoy es null
    official_totals   { revenue, expenses, net_result }                  // officialTotalRevenue / Expenses / PAT
    adjustments       { extra_rows?[], no_breakdown?[], included_in? }   // extraRows, sinDesglose, incluidoEn tal cual
  budget_overlay      presupuesto*ByYear (cuando existe), mismo esquema por año
  squad_transfers, results, titles   // pasesData, resultadosData, titulosData; las claves de los bloques libres van en inglés (tabla de abajo), los textos quedan en español
  extras              { budget_assumptions, budget_financial, budget_investments, finance_years, finance_managements }   // lo editorial de pocos clubes (Boca, River, Racing)
```

Regla de la ida y vuelta: ningún campo se inventa ni se redondea; lo que hoy es `null`, `undefined` o falta se distingue (`null` explícito o clave ausente) para que
el JS regenerado dé los mismos objetos.

## Dos ejemplos reales (recortados)

**Mirassol 2024** (formato agregado, un solo ejercicio, sin `fx` ni `items`):

```json
{
  "schema_version": "2.0", "exported_at": "2026-10-20",
  "unit": {"scale": 1000000, "label": "millions of currency"},
  "club": {"id": "mirassol", "name": "Mirassol Futebol Clube", "display_name": "Mirassol", "country": "BR", "reporting_currency": "BRL", "fiscal_year_start": "01-01", "sport": "football", "taxonomy": "football-1"},
  "sources": [{"id": "mirassol-relatorio-auditoria-2024", "title": "Relatório de Auditoria Contábil, Exercício 2024", "type": "official_balance_sheet", "reliability": "primary", "url": "https://mirassolfc.com.br/"}],
  "management": [{"id": "sinconfirmar", "name": "Gestión actual", "first_year": 2024, "last_year": 2024}],
  "members": null,
  "years": [{
    "fiscal_year": 2024, "period_end": "2024-12-31", "currency": "BRL",
    "fx": {"ref": "BRL@2024-12-31"},
    "source_id": "mirassol-relatorio-auditoria-2024", "report_type": "official_balance_sheet", "management_id": "sinconfirmar",
    "revenue": [{"label": "Receita do exercício (bruta, operacional — sem desagregação na fonte)", "category": "undisclosed", "subcategory": "lump_football_operations", "amount": 59.339448, "disclosure": "aggregated"}],
    "expenses": [
      {"label": "Custos", "category": "undisclosed", "subcategory": "lump_football_operations_expense", "amount": -36.105741, "disclosure": "aggregated"},
      {"label": "Despesas operacionais", "category": "admin_general", "subcategory": "admin_general_expense", "amount": -19.090093, "disclosure": "aggregated"}],
    "financial": {"net_interest": 0, "tax": 0, "profit_on_player_sales": 0, "asset_sales": 0, "gross_debt": 0, "cash": 11.583747},
    "official_totals": {"revenue": 59.339448, "expenses": 55.195834, "net_result": 4.143614}
  }]
}
```

**AGF (Dinamarca) 2021** (formato detallado, con `items` dentro de una línea y deuda y caja):

```json
{
  "club": {"id": "agf-dk", "country": "DK", "reporting_currency": "DKK"},
  "years": [{
    "fiscal_year": 2021, "currency": "DKK", "fx": {"ref": "DKK@2021-06-30"},
    "source_id": "agf-aarsrapport-2020-21", "report_type": "official_balance_sheet", "management_id": null,
    "revenue": [
      {"label": "Entré- og tv-indtægter (entradas y TV combinadas, la fuente no las separa)", "category": "media_rights", "subcategory": "broadcasting", "amount": 34.673, "disclosure": "detailed"},
      {"label": "Udlejningsvirksomhed + Restaurations- og cateringvirksomhed + Arrangementer/billetsalg (Ceres Park & Arena, segmento Faciliteter)", "category": "venue", "subcategory": "stadium_other", "amount": 19.154, "disclosure": "detailed",
       "items": [["Udlejningsvirksomhed", 7.148], ["Restaurations- og cateringvirksomhed", 8.385], ["Arrangementer, billetsalg", 3.621]]}
    ],
    "financial": {"net_interest": 4.865, "tax": 0.5, "profit_on_player_sales": 0, "asset_sales": -0.292, "gross_debt": 4.627, "cash": 29.347},
    "official_totals": {"revenue": 188.321, "expenses": 168.076, "net_result": 25.318}
  }]
}
```

## Fase 1 (lo que sigue si Guido aprueba los 4 puntos) y fase 2

Fase 1, sin tocar `data/` ni `js/`: (b) `tools/exportar-json.mjs` (solo lectura: lee los `data/*-data.js` y escribe a `Generados/datos-json/`, que no se publica);
(c) `tools/validar-esquema-json.mjs`; (d) la prueba de ida y vuelta: se regenera el JS desde el JSON y se compara, objeto por objeto, contra el JS actual en los 313
clubes, y se anota cuántos dan distinto y por qué. Fase 2 (no se hace ahora): que el JSON sea la fuente y el JS se genere desde ahí.


## Claves de los bloques de texto libre (fase 2)

`results` (por gestión), `titles`, `squad_transfers` y `extras` traducen sus claves al inglés con un solo diccionario (`CLAVES_LIBRES` de `tools/json-datos.mjs`, de
ida y de vuelta); los valores, textos incluidos, quedan como están. `titulosLocales` → `local_titles`, `titulosInternacionales` → `international_titles`,
`mejorResultadoLibertadores` → `best_libertadores_result`, `anio` → `year`, `competencia` → `competition`, `resultado` → `result`, `gestion` → `management`,
`docLabel` → `doc_label`, `isResult` → `is_result`, `formato` → `format`. Las claves de datos (el apellido de cada gestión en `results`) no se tocan. El data file
generado vuelve a los nombres de siempre, que son los que lee el motor del sitio.

## Fase 2 (hecha)

El JSON es la fuente (D1: `data/<país>/<id>.json`, publicado como dato abierto) y el sitio sigue cargando el `-data.js` generado (D2). Las tools de carga escriben el
JSON con `tools/club-json.mjs`. Boca quedó con la estructura de los demás: sus fuentes, gestiones y socios viven en su data file, no en `data/clubs.js`. La identidad del
club (`club.*`) es una copia de `data/clubs.js`, que sigue siendo la fuente de verdad porque hace falta antes de elegir un club (`generar-data.mjs --identidad` la refresca).
