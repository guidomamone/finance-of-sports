# boyacachico-co — evidencia de carga

Lo que había como comentario en `data/co/boyacachico-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/boyacachico-co-data.js — Deportivo Boyacá Chicó Futbol Club S.A.
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
en `data/co/oncecaldas-data.js` (son la misma distribución de la liga, no
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

_de data/clubs.js:_

```text
Boyacá Chicó ("Los Ajedrezados"): camiseta a cuadros (patrón ajedrezado) azul marino y blanco
según Wikipedia (infobox pattern_la1/pattern_b1) -- bicolor en partes iguales, mismo caso que
Almagro (tricolor): sin un color que predomine con claridad, brandColor:null a propósito en
vez de forzar uno de los dos (footylogos da #001356 azul marino como #1, pero es el orden del
escudo, no confirma que domine sobre el blanco en la camiseta a cuadros).
```

_de data/club-leagues/co.js:_

```text
Verificado el 2026-09-28 contra el roster ya cacheado de "2024 Liga DIMAYOR" (bajado durante
el onboarding de Once Caldas, mismo día) -- Boyacá Chicó apareció ahí mismo, sin fetch nuevo.
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

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Obligaciones financieras corrientes 666.527.066,00 (Préstamos Bancarios - Dimayor) + no corrientes 0,00. Nota 8: préstamo bancario Dimayor; no corriente 0.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Efectivo y equivalentes al efectivo 441.174.314,33 (también Disponible a dic 31 2024 en flujo de efectivo). Primera columna = 2024 (resultado del ejercicio 708M); cifras en pesos completos; coincide con el flujo de efectivo.
```

## Gestiones

_antes de Eduardo Pimentel (data/gestiones/co.js):_

```text
Dueño: Eduardo Pimentel, persona con nombre (dueño y gestor del proyecto desde la fundación del club en 2002, Wikipedia; Publimetro 2024 lo llama "dueño del Boyacá Chicó"). Su hijo Nicolás Pimentel es el presidente/gerente que firma (Publimetro, 10/2024): sin fecha de inicio, queda fuera por el criterio del dueño.
```

## Fuentes

### boyacachico-co-estados-financieros-2024

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co). PAT confirmado doble: Nota 15 (Patrimonio, "Resultado del Ejercicio") y Nota 21 (Utilidad antes de impuestos menos provisión de renta), coinciden a 1 centavo. La línea "Menos: Devoluciones" (21% del ingreso bruto) no se pudo atribuir a un rubro específico -- ver Admin/dudas-por-club.md. Transcripción completa en Clubes/Colombia/Boyaca Chico/estados-financieros-2024.md.
```

2026-10-15 (to-do 232 ab): 2024 (deuda y caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.
