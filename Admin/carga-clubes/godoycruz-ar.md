# godoycruz-ar — evidencia de carga

Lo que había como comentario en `data/ar/godoycruz-ar-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/godoycruz-ar-data.js — Club Deportivo Godoy Cruz Antonio Tomba (Mendoza,
Asociación Civil). Club nuevo, primer ejercicio cargado: 2019/2020 (Ejercicio
N° 72, 1°/7/2019 al 30/6/2020), balance real (Estados Contables auditados).

FUENTE: Clubes/Argentina/Godoy Cruz/estados-contables-ejercicio-2019-20.md
(transcripción OCR Tesseract -l spa --psm 6, páginas 3-4 rotadas 90° antes de
OCRear, página 2 con --psm 4). "Estado de Recursos y Gastos" en pág. 5-6.

CORRECCIÓN DE OCR (esta sesión): "INGRESO POR PARTIDO AMISTOSO" transcribía
13.229.545,00; re-renderizada la pág. 5 a 300dpi y leída a ojo, el valor real
es 18.229.545,00 (dígito "1" leído como "3" por el OCR). Confirmado porque la
diferencia (exactamente $5.000.000) cerraba el desajuste contra TOTAL INGRESOS
impreso. El .md fuente ya se corrigió con el valor verificado.

FILA "TRANSPORTE" (pág. 5-6 del Estado de Recursos y Gastos) NO ES UNA LÍNEA
DE GASTO REAL: es un subtotal/corte de página mal etiquetado por el OCR (o por
el layout original del documento). Su valor (271.720.429,49) reconcilia EXACTO
con la suma de las 13 líneas de gasto que la preceden (GASTOS MANTENIMIENTO
INST. DEPORTIVAS ... DESCUENTOS EN RECIBOS SOCIALES) — confirmado con cálculo
exacto. Se excluyó de expenseLines (sumarla habría duplicado esas 13 líneas).
Ver club-data-mapping/referencia/leer-pdf.md ("la fila acumulada").

RESULTADOS FINANCIEROS: el documento NO separa "Recursos"/"Gastos" financieros
en una nota aparte (a diferencia de Vélez/Estudiantes LP) — los presenta como
líneas ORDINARIAS más, dentro del mismo Estado de Recursos y Gastos:
"INGRESO POR INTERESES PLAZO FIJO", "INGRESOS FINANCIEROS" (ingreso) e
"EGRESOS FINANCIEROS" (gasto). Las 3 se sacaron de revenueLines/expenseLines y
se sumaron netas a fiscalYearMeta[2020].netInterest (club-data-mapping SKILL.md
sección 2 — nunca como línea, sea cual sea la presentación del documento
fuente). "INGRESOS FINANCIEROS" es un agregado grande (296,95 M en 2020 vs.
131,50 M en 2019) consistente con incluir RECPAM (el documento está en moneda
homogénea RT6, Nota 1 — mismo criterio que netInterest de Vélez "incluye
RECPAM").
netInterest 2020 = 1.385.610,45 (intereses p/fijo) + 296.951.174,48 (ing.
financieros) - 341.420.775,07 (eg. financieros) = -43.083.990,14.

VERIFICACIÓN (revenueLines + expenseLines + netInterest = SUPERÁVIT DEL
EJERCICIO impreso, $157.349.541,83): revenueLines suma exacto 614.668.613,84
(= TOTAL INGRESOS 913.005.398,77 menos los 2 renglones financieros de arriba);
expenseLines suma exacto 414.235.081,87 (= TOTAL GASTOS ORDINARIOS
755.655.856,94 menos EGRESOS FINANCIEROS, menos la fila TRANSPORTE excluida
por ser subtotal). 614.668.613,84 - 414.235.081,87 - 43.083.990,14 =
157.349.541,83 ✓ EXACTO.

CATEGORIZACIÓN — supuestos genuinamente ambiguos, anotados para
Admin/dudas-por-club.md (no se resolvieron en esta sesión, ver reporte):
 - "Ingresos Varios AFA" -> other_income (no queda claro si es TV, premios, u
   otro concepto; ya existe "Ingreso por D° de TV y Transmisión" separado).
 - "Ingreso Fútbol Amateur" / "Gastos Generales Administración Fútbol
   Amateur" -> youth_football / youth_other_sports_expense (asumido como
   categorías inferiores/no profesionales, no confirmado que sea la escuela
   juvenil propiamente dicha).
 - "Ingreso por Rescisión de Contrato" e "Ingreso por Derechos de Tanteo" ->
   player_sales (asumidos como ingresos ligados a jugadores/pases; "derecho de
   tanteo" es una figura específica del fútbol argentino sin equivalente claro
   en otros clubes ya cargados).
 - "Ingreso por Alquiler Instalaciones Deportivas" -> other_income (criterio
   conservador de stadium_other, sección 1: no dice "estadio" explícitamente).
 - "Cargas Sociales" (línea de Gastos standalone, sin desglose por sector) ->
   wages_squad (asumido como cargas del plantel profesional, no confirmado).
 - "Departamento Médico" -> wages_squad (costo no salarial del plantel
   profesional, mismo criterio "CASO CONSULTADO" de club-data-mapping/referencia/formato-simplificado.md, "CASO CONSULTADO" y del precedente de Gimnasia y Esgrima LP, que agrupa médico dentro de
   Fútbol Profesional -> wages_squad).
 - "Ingreso Acuerdo Deuda Clubes" -> other_income (acuerdo de deuda entre
   clubes, naturaleza puntual no confirmada).

TIPO DE CAMBIO: no se encontró Anexo de moneda extranjera con TC de cierre
propio. fxSource:'market_approx' — dólar oficial minorista/mayorista de
referencia para el cierre 30/6/2020 no verificado con una fuente puntual del
día exacto en esta sesión (fuera de alcance); se usó $70,46 (BNA vendedor,
cotización de referencia pública para esa fecha). Documentado como
aproximación, no como cifra exacta confirmada — revisar si aparece una fuente
mejor.

grossDebt/cash: del Estado de Situación Patrimonial (pág. 3). grossDebt =
Total Pasivo (79.331.256,82 corriente + 1.205.874,85 no corriente =
80.537.131,67; el documento no separa "Deudas" de otras categorías de pasivo,
es la única línea). cash = Caja y Bancos (161.039.723,56).

GESTIÓN: "Mansur, José Eduardo — Presidente" firma el balance (pág. 3-6),
fuente primaria directa (la propia firma del documento). Sin más info sobre
el rango de su gestión en esta sesión, se cargó solo para este ejercicio.
============================================================================
```

_de data/club-leagues/ar.js:_

```text
Godoy Cruz (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar): Ejercicio N°72
(1/7/2019-30/6/2020), Wikipedia confirma temporada 2019-20 completa en Primera División.
```

## 2020

### Meta

_al lado del campo `currency`:_

```text
ya existía en FX_CLOSE (data/currency-map.js), mismo valor 70.46
```

_al lado del campo `netInterest`:_

```text
Interés plazo fijo + Ingresos financieros - Egresos financieros (incl. RECPAM, moneda homogénea RT6)
```

## Gestiones

_antes de Alejandro Chapini (data/gestiones/ar.js):_

```text
Chapini: elegido por asamblea el 12/12/2021 (Wikipedia fecha el traspaso el 18/12/2021).
```

## Fuentes

### godoycruz-ar-estados-contables-2019-20

_note (data/):_

```text
Estados Contables auditados (legalizados por el CPCE Mendoza el 14/10/2020). Transcripción completa (OCR) en Clubes/Argentina/Godoy Cruz/estados-contables-ejercicio-2019-20.md. La fila "Transporte" del Estado de Recursos y Gastos es un subtotal de página mal etiquetado, no una línea de gasto real — ver comentario de cabecera de godoycruz-ar-data.js. Tipo de cambio aproximado (no declarado por el documento).
```
