# realbetis — evidencia de carga

Lo que había como comentario en `data/es/realbetis-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/realbetis-data.js — Real Betis Balompié, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años; el club tenía 5
ejercicios reales descargados, con huecos, ver Admin/sourcing/España/Real Betis.md — se eligió el más
reciente y más confirmado). Fuente: "Informe de Auditoría, Memoria y Estado de Información No
Financiera 2024-2025" — ver
Clubes/España/Real Betis/informe-auditoria-memoria-einf-2024-2025.pdf y su transcripción en
informe-auditoria-memoria-einf-2024-2025-cuenta-resultados.md (misma carpeta). Texto nativo, sin OCR.

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
Tipo de cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 =
1/1,172, EUR por 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver
comentario de cabecera de data/es/realmadrid-data.js para el detalle completo.

Categorización de Ingresos (cifra de negocios, 5 líneas — Betis SÍ separa competiciones
nacionales de europeas, más desglose que la mayoría de los clubes cargados esta sesión):
- "Ingresos por competiciones nacionales" + "Ingresos por competiciones europeas" -> competition_bonus.
- "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos de comercialización y publicidad" -> sponsorship_commercial.
- "Trabajos realizados por la empresa para su activo" + "Otros ingresos de explotación" ->
  other_income.
- "Otros resultados" (36,897850 M, Nota 15.8: "principalmente traspasos de derechos federativos de
  jugadores de Cantera" + regularizaciones) -> other_income, NO profitOnPlayerSales. Se probó
  primero moverlo a profitOnPlayerSales (ya que el propio texto de la nota dice que son sobre todo
  ventas de jugadores de cantera) pero el cuadre de RESULTADO DE EXPLOTACIÓN solo cierra exacto
  tratándolo como revenueLine — el documento lo separa deliberadamente de "Deterioro y resultado
  por enajenaciones del inmovilizado" (que SÍ es 100% venta de jugadores y SÍ va a
  profitOnPlayerSales), así que se respetó esa distinción del propio documento en vez de forzar
  una reclasificación "más pura" que rompía el cuadre.

Categorización de Gastos:
- "Sueldos y salarios de plantilla deportiva" + "Cargas sociales" -> wages_squad.
- "Otros sueldos, salarios y asimilados" -> admin_general_expense (el documento separa plantel de
  resto del personal).
- "Consumo de material deportivo" + "Gastos cesión de jugadores" + "Pérdidas/deterioro provisiones
  comerciales" -> other_expenses.
- "Otros consumos y gastos externos" + "Servicios exteriores" + "Tributos" + "Otros gastos de
  gestión corriente" -> admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Amortización del inmovilizado" (27,257054 M): SEPARADA usando la Nota 4/5 (movimiento de
  "Inmovilizado intangible deportivo"): la dotación del ejercicio para "Derechos federativos de
  jugadores" es 23,343953 M -> player_amortisation. El resto (3,913101 M, propiedad
  industrial+aplicaciones informáticas+material) -> depreciation.

"Deterioro y resultado por enajenaciones del inmovilizado" (10,101484 M, ganancia neta de venta de
jugadores del primer equipo, Nota 5) -> fiscalYearMeta.profitOnPlayerSales (no revenueLine, ver
club-data-mapping SKILL.md sección 2).

VERIFICACIÓN (ver .md para el detalle, incluye un error real encontrado y corregido en esta misma
sesión: la primera pasada de categorización olvidó incluir "Otros sueldos, salarios y asimilados"
en la suma de gastos, lo que hacía que el cuadre fallara por EUR 12,54 M hasta que se detectó):
Revenue 195,219820 M - Expenses cash 163,044266 M - Non-cash 27,257054 M = Operating profit
4,918500 M; + profitOnPlayerSales 10,101484 M = 15,019984 M ≈ RESULTADO DE EXPLOTACIÓN impreso
(15.019.983) EXACTO; + netInterest -9,442450 M = 5,577534 M = RESULTADO ANTES DE IMPUESTOS impreso
EXACTO; + tax -1,008801 M = 4,568733 M ≈ RESULTADO DEL EJERCICIO impreso (4.568.734) EXACTO.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas con entidades de crédito, largo (120,369065 M) + corto plazo (8,737337 M).
cash = Efectivo y otros activos líquidos equivalentes (Nota 10).
```

## Gestiones

_antes de Ángel Haro García (data/gestiones/es.js):_

```text
Haro: nombrado por el consejo en febrero de 2016 (nota del 4/2/2016), tras la dimisión de Ollero.
```

## Fuentes

### realbetis-informe-auditoria-2024-25

_note (data/):_

```text
PDF oficial, texto nativo (sin OCR). Transcripción completa de la cuenta de resultados en Clubes/España/Real Betis/informe-auditoria-memoria-einf-2024-2025-cuenta-resultados.md.
```

## Otros

### realbetisPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.realbetis

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
