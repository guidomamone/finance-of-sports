# boyacachico-co — evidencia de carga

Lo que había como comentario en `data/boyacachico-co-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/boyacachico-co-data.js — Deportivo Boyacá Chicó Futbol Club S.A.
(Tunja, Colombia). Club nuevo, agregado el 2026-09-28 (ronda de 5
onboardings de prueba de los tools del to-do 98/95, 3/5). Ejercicio 2024 =
REAL, único ejercicio cargado a propósito.

FUENTE: `Clubes/Colombia/Boyaca Chico/estados-financieros-2024.pdf`,
transcripción completa en `estados-financieros-2024.md`, misma carpeta.
Bajado vía SIIS (siis.ia.supersociedades.gov.co), mismo canal que Once
Caldas/Envigado. Cifras YA en pesos completos (no en miles como Once
Caldas -- este documento no trae la aclaración "expresado en miles" y sus
magnitudes (miles de millones de COP) solo tienen sentido como pesos
completos, confirmado cruzando contra el patrimonio total: $6.414 millones
de patrimonio para un club de Primera A es plausible en pesos completos,
sería absurdamente chico en miles). Acá se guardan divididas por 1.000.000,
en MILLONES de pesos colombianos (COP), mismo criterio de unidad que el
resto del sitio.

REVENUE = Nota 16 "Ingresos Operacionales" (total impreso $8.127,567123 M,
reconciliado EXACTO con `tools/sum-check.mjs`) + la porción no-financiera
de Nota 19 "Otros Ingresos No Operacionales" ($137,020364 M = total
impreso $143,886002 M menos "Intereses Bancarios" $6,865639 M, que va a
`netInterest`). Los 5 rubros de auxilio DIMAYOR (Hotelero/Transporte/
Arbitraje/Logística/Mejoramientos) y "Fondo de Equipos" se categorizaron
como `broadcasting`, mismo criterio que la sub-descomposición de "DIMAYOR"
en `data/oncecaldas-data.js` (son la misma distribución de la liga, no
ingreso propio del club). "Ingresos Abonados con Boyacá" -> `season_tickets`
(abonos, mismo concepto que Once Caldas). "Menos: Devoluciones"
(-$1.726,052997 M, 21% del ingreso bruto) NO se pudo atribuir con
confianza a un rubro específico -- el documento no aclara de qué
devolución se trata, se cargó como línea propia en `other_income`
(negativa) y quedó la pregunta en `Admin/dudas-por-club.md`.

EXPENSES = Nota 17 "Costos de Ventas y Prestación de Servicios" (íntegro
nómina del plantel masculino este año, $4.303,480269 M -> `wages_squad`) +
Nota 18 "Gastos de Administración" ($2.603,474912 M, con Amortizaciones y
Depreciación separadas en sus propias líneas, mismo criterio que Once
Caldas) + la porción no-financiera/no-tributaria de Nota 20 "Otros Egresos
No Operacionales" ($11,266696 M, "Gastos diversos" -> `other_expenses`).

`tax` = $381,268512 M, la "Provisión Impuesto sobre la Renta" -- CONFIRMADA
DOBLE: aparece igual en Nota 20 ("Impuesto de Renta") y en Nota 21
("PROVISIÓN IMPUESTO SOBRE LA RENTA DEL AÑO GRAVABLE 2024"), y la propia
Nota 21 confirma el PAT por una vía DISTINTA del Estado de Patrimonio:
"UTILIDAD ANTES DE IMPUESTOS" ($1.089,338605 M) menos esa provisión da
$708,070093 M, coincide (a 1 centavo, redondeo del propio documento) con
"Resultado del Ejercicio" de la Nota 15 (Patrimonio). Doble confirmación,
no residuo.

FX: el documento NO declara su propio tipo de cambio de cierre -- TRM
oficial al 31/12/2024 vía `tools/lookup-fx-close.js` (mismo valor,
$4.409,15, que Once Caldas 2024 declaró como propio -- buena señal
cruzada de que la TRM oficial de esa fecha es correcta).
============================================================================
```

## 2024

### Ingresos

_antes de la fila 15 (`Menos: Devoluciones (sin atribuir)`):_

```text
No se pudo atribuir a un rubro específico -- ver comentario de cabecera y
Admin/dudas-por-club.md.
```

### Meta

```text
Intereses Bancarios (Nota 19, $6,865639 M) - Financieros+Comisiones+Intereses (Nota 20,
$263,892643 M).
```

_al lado del campo `grossDebt`:_

```text
no verificado esta sesión, mismo alcance que los demás onboardings de esta ronda
```
