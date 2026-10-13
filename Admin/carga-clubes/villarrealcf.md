# villarrealcf — evidencia de carga

Lo que había como comentario en `data/es/villarrealcf-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/villarrealcf-data.js — Villarreal C.F., S.A.D., Ejercicio 2023/2024 (1/7/2023 a 30/6/2024).

Único ejercicio disponible en el archivo descargado (1 solo PDF, ver Admin/sourcing/España/Villarreal
CF.md — la búsqueda de esta sesión solo confirmó este año, el 2021-22 quedó pendiente por caída
temporal de Wayback Machine). Fuente: "Estados Financieros correspondientes al ejercicio anual
terminado el 30 de junio de 2024", conseguido vía Wayback Machine (villarrealcf.es bloquea la
descarga directa del PDF con 403) — ver
Clubes/España/Villarreal CF/cuentas-anuales-2023-2024.pdf y su transcripción en
cuentas-anuales-2023-2024-cuenta-resultados.md (misma carpeta).

GOTCHA DE EXTRACCIÓN: PDF escaneado sin capa de texto — leído renderizando páginas a imagen
(pdftoppm -r 150, re-verificado a -r 300 para confirmar signos negativos, ver .md: una primera
lectura a menor resolución leyó mal el signo de "A.1) OPERACIONES CONTINUADAS", corregido antes de
cargar).

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
Tipo de cambio EUR/USD 1,071 al 30/6/2024 (cotización de cierre BCE de esa fecha — DISTINTA de la
del resto de los clubes de esta sesión, que cerraron el 30/6/2025). `fx` en fiscalYearMeta va
INVERTIDO (0,9337 = 1/1,071, EUR por 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del
sitio) — ver comentario de cabecera de data/es/realmadrid-data.js para el detalle completo.

DOS APROXIMACIONES ESPECÍFICAS DE ESTE CLUB (el documento tiene MENOS desglose que el resto de los
clubes españoles cargados esta sesión):
- La "Importe neto de la cifra de negocios" (119,721562 M) NO se desglosa por concepto (solo
  "Ventas" vs. "Prestaciones de servicios", sin separar socios/retransmisión/comercial/competición)
  -> se cargó como UNA sola línea `lump_football_operations` (bolsón sin desglosar, ver
  club-data-mapping SKILL.md sección 1), no se fuerza una categoría más específica que el
  documento no sostiene.
- "Amortización del inmovilizado" (-27,897705 M) tampoco se separa entre jugadores y resto -> se
  cargó ENTERA como `player_amortisation` (no `depreciation`, a diferencia de Athletic Club): juicio
  específico de este club, ya que Villarreal es conocido por una actividad de compra/venta de
  pases mucho más intensa que Athletic (que tiene una razón estructural real, cantera, para casi
  no amortizar pases). Es una aproximación de bucket único, documentada, no una separación real.
- "Gastos de personal" tampoco separa plantel deportivo de no deportivo (a diferencia de Atlético/
  Athletic/Valencia/Sevilla) -> TODO a wages_squad.

VERIFICACIÓN (ver .md para el detalle completo, incluye el ajuste de "Otros gastos de gestión
corriente" como residuo contra el subtotal impreso por un dígito potencialmente mal leído en el
escaneo): Revenue 128,285896 M - Expenses cash 141,885991 M - Non-cash 27,897705 M = Operating
profit -41,497800 M; + profitOnPlayerSales 26,425834 M = -15,071966 M ≈ A.1) RESULTADO
OPERACIONES CONTINUADAS impreso (-15.071.965,48) EXACTO; + netInterest -0,945099 M = -16,017065 M
≈ A.3) RESULTADO ANTES DE IMPUESTO impreso (-16.017.064,65) EXACTO; + tax +1,895827 M =
-14,121238 M ≈ A.4/A.5) RESULTADO DEL EJERCICIO impreso (-14.121.237,28) EXACTO. Villarreal cerró
el ejercicio 2023/24 con pérdida neta real de EUR 14,12 M.
============================================================================
```

_de data/club-leagues/es.js:_

```text
temporada 2023/24
```

## 2024

### Meta

```text
grossDebt = "Deudas a corto plazo" TOTAL del balance (116,355224 M) — no se pudo confirmar con
certeza el subtotal solo-bancario en la calidad de escaneo disponible, probablemente
sobreestima la deuda puramente financiera. cash = Efectivo y otros activos líquidos
equivalentes (Tesorería).
```

## Fuentes

### villarrealcf-estados-financieros-2023-24

_note (data/):_

```text
PDF oficial (auditado por Betea España Auditores, S.L.P.), escaneo sin capa de texto (leído renderizando a imagen, re-verificado a 300 DPI para confirmar signos negativos). Conseguido vía Wayback Machine porque el dominio del club bloquea la descarga directa del PDF (403). Único ejercicio disponible del club en esta sesión. Transcripción completa de la cuenta de resultados en Clubes/España/Villarreal CF/cuentas-anuales-2023-2024-cuenta-resultados.md.
```

## Otros

### villarrealcfPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.villarrealcf

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
