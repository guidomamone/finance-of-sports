# argentinosjuniors — evidencia de carga

Lo que había como comentario en `data/ar/argentinosjuniors-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/argentinosjuniors-data.js — Asociación Atlética Argentinos Juniors: 8vo club del motor
genérico. 5 ejercicios cargados (2015 a 2019, 30/6 de cada año).

BUG REAL ENCONTRADO Y CORREGIDO (sesión de onboarding posterior a la Versión 95): los 4
ejercicios 2015-2018 estaban cargados desde "presentacion-asamblea-2018-2019.pdf" (comparativo
de 5 años a la vez), pero ese documento dice EXPLÍCITAMENTE en su encabezado "(cifras en pesos
AJUSTADAS POR INFLACIÓN)" — son pesos RESTATED a poder adquisitivo de una fecha posterior (no
nominales), mientras que TODO el resto del sitio (todos los demás clubes/ejercicios) usa pesos
NOMINALES tal cual los reporta el balance auditado de cada año. Esto se descubrió al OCRear
balance-2017-2018.pdf (el balance auditado REAL de ese ejercicio) para agregar detalle: su
Estado de Recursos y Gastos imprime TOTAL DE RECURSOS $610.699.504 para 2018, muy distinto de
los $951.176.055 que decía la presentación restated. La nota 1.2 del balance 2018 confirma que
NO se aplicó ajuste por inflación al ejercicio 2017/2018 (solo ajustes históricos de 1995 y
2002-2003) — o sea, el balance real es nominal, la presentación de asamblea NO lo es.

FIX: se reemplazaron los 4 ejercicios (2015-2018) con datos extraídos de los 3 balances
auditados reales vía OCR (Tesseract, 300dpi): `balance-2015-2016.pdf` (Ejercicio N°112, da 2016
con detalle completo de Anexo IV/V + 2015 como comparativo), `balance-2016-2017.pdf` (Ejercicio
N°113, da 2017 con detalle completo + 2016 comparativo) y `balance-2017-2018.pdf` (Ejercicio
N°114, da 2018 con detalle completo + 2017 comparativo). Los 3 documentos se solapan en sus
columnas comparativas, lo que permitió cruzar y confirmar cifras entre archivos distintos (ej.
el TOTAL DEL PASIVO de 2017 sale idéntico calculado desde el balance de 2017 y desde el
comparativo del balance de 2018). Regla aplicada: para cada año, se usó SIEMPRE el balance donde
ese año es el "actual" (Anexo V da desglose completo por departamento), no la columna
comparativa de un balance posterior (que a veces reclasifica algún rubro sin cambiar el total,
ver nota de "Información comparativa" de cada balance) — el balance de 2015/2016 no existe en
nuestro archivo descargado, así que 2015 SÍ se cargó desde la columna comparativa del balance
2015-2016 (único disponible), con el mismo criterio de "agregación honesta" que ya usa San
Lorenzo 2014: revenue con detalle completo por rubro (Anexo IV siempre da ambos años en
detalle), gastos SOLO al nivel de las 4 categorías agregadas (Anexo V solo desglosa por
departamento el año "actual" de cada balance, 2015 nunca lo es en ninguno de los 3 archivos que
tenemos).

2019 NO se tocó — sigue viniendo de la presentación de asamblea. Como esa presentación se
preparó DESPUÉS del cierre del Ejercicio 2018/2019 (el más reciente de los 5), su columna 2019
coincide (o casi) con pesos nominales de esa fecha — el ajuste por inflación restated hacia
atrás afecta a los años VIEJOS (2015-2018), no al año base de la restatement. No hay un balance
auditado real de 2018/2019 descargado para confirmarlo con certeza (el archivo
"balance-2018-2019.pdf" es en realidad la Memoria narrativa, sin cifras) — documentado como
incertidumbre en Admin/dudas-por-club.md, no se inventó nada nuevo para 2019.

Categorización (misma lógica en los 3 años con detalle completo, 2016/2017/2018): Anexo IV
(Recursos) da 4 subtablas (Fútbol profesional, Actividades deportivas y culturales, Socios,
Diversos) con rubros por NATURALEZA — se categorizó cada rubro según su naturaleza real
(Derechos de televisación->broadcasting, Esponsorización->sponsorship_commercial, Venta neta de
jugadores/Valorización del plantel profesional/Derechos de formación->player_sales, etc.).
"Actividades deportivas y culturales" agrupa ~15 disciplinas individuales (Básquet, Boxeo,
Natación, etc.) que TODAS mapean a la misma categoría (other_sports) — se cargó como una sola
línea agregada por año en vez de 15 líneas idénticamente categorizadas, no pierde información
relevante para el sitio. Anexo V (Gastos) es una tabla cruzada rubro x departamento (Fútbol
profesional/Actividades deportivas y culturales/Administración/Estadio y predios) — la mayoría
de los rubros están concentrados en UN solo departamento (se cargan como 1 línea con la
categoría de esa naturaleza); "Sueldos y cargas sociales" y "Viajes" SÍ se reparten entre varios
departamentos en los 3 años, así que se cargaron como líneas separadas por departamento (Fútbol
->wages_squad, Actividades->youth_other_sports_expense, Administración->admin_general_expense,
Estadio->match_organisation_expense), mismo mecanismo de columna-por-sector que Vélez/
Instituto/Rosario Central/Estudiantes LP/San Lorenzo.

Verificado línea por línea contra los totales impresos de cada Anexo antes de cargar (ver
fiscalYearMeta de cada año). ÚNICA excepción, documentada, no inventada: el Anexo IV de 2016
(`balance-2015-2016.pdf`, hoja 1/2) tiene un error aritmético propio del documento — sus 10
líneas de "Fútbol profesional" suman $77.570.507 (verificado 2 veces, incluida una relectura
visual de la imagen renderizada de la página para descartar error de OCR), pero el propio
documento imprime "Total 77.550.507" para esa subtabla (y el Estado de Recursos y Gastos
principal repite ese mismo 77.550.507) — una diferencia de $20.000 (0,03%) que no se pudo
atribuir a una línea específica mal impresa. Se usó la suma verificada de las líneas reales
como `officialTotalRevenue` (no el total impreso), documentado acá para que quede claro que no
es un error de esta transcripción.

grossDebt = Pasivo corriente + no corriente, EXCLUYENDO Previsiones cuando el balance de ESE
año las desglosa por separado (2017 y 2018 sí lo hacen; 2016 y 2015, en sus propias
presentaciones, no separan Previsiones de "Otras deudas" así que se usó el Total del Pasivo tal
cual el documento lo imprime, sin restar nada que la fuente no desglosa — mismo criterio de "no
inventar" que el resto del sitio). cash = Caja y bancos.

FX: la fuente no declara tipo de cambio propio en ningún año (ninguno de los 3 balances reales
tiene Anexo de moneda extranjera para pesos/dólares, solo notas puntuales de partidas en U$S/EUR
sueltas) — se usa el dólar vendedor BNA de cierre de cada 30/6 (datos.gob.ar/series).
DESDE EL 2026-09-20 (to-do 21(b)) esos 5 números NO se escriben acá: son cotizaciones de MERCADO,
o sea un dato del mercado y no de este club, así que viven en `FX_CLOSE` (data/currency-map.js) y
cada ejercicio las referencia con `fxRef:'ARS@<año>-06-30'`. Es la regla de la Versión 125: lo que
declara un documento va literal en el archivo del club; lo que es cotización pública se dice una
vez en la tabla. Mientras las usaba un solo club no duplicaban nada, pero era el estado del que
nace la duplicación — el cierre del real al 31/12/2024 había llegado a estar copiado en 5
archivos antes de que existiera la tabla.

Gestión: Cristian Malaspina, presidente desde 2015 (confirmado por búsqueda), reelecto en
diciembre de 2019 y de nuevo en 2023. DUDA ABIERTA (ver Admin/dudas-por-club.md): no se confirmó el
mes exacto de su primera asunción en 2015 — si fue después del cierre del Ejercicio 2015
(30/6/2015), ese año en particular podría no caer bajo su gestión. Se mantiene gestionId:null
para 2015 y gestionId:'malaspina' para 2016-2019, mismo criterio que antes del fix.
============================================================================
```

## 2019

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2015, 2016, 2017, 2018): Comercial / Sponsors, Estadio, Televisión, Venta de Jugadores, Compra de jugadores, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
NO tocado en el fix — sigue viniendo de presentacion-asamblea-2018-2019.pdf (ver comentario
de cabecera: al ser el año más reciente de esa presentación, su columna probablemente ya es
~nominal, pero no hay balance auditado real de este ejercicio descargado para confirmarlo).
```

## 2018

### Meta

```text
Balance 2017-2018 (Ejercicio N°114), año "actual" de ese archivo — detalle completo de
Anexo IV/V. SUPERÁVIT real: $318.336.988 ARS (antes decía, con las cifras restated,
$495.815.894 — completamente distinto, esto es lo que disparó el hallazgo del bug).
```

## 2017

### Meta

```text
Balance 2016-2017 (Ejercicio N°113), año "actual" de ese archivo — detalle completo de
Anexo IV/V, cruzado contra la columna comparativa del balance 2017-2018 (coincide exacto en
Total del Pasivo y en los totales de Recursos/Gastos). SUPERÁVIT real: $30.812.797 ARS.
```

## 2016

### Meta

```text
Balance 2015-2016 (Ejercicio N°112), año "actual" de ese archivo — detalle completo de
Anexo IV/V. OJO: el Anexo IV de este balance tiene un error aritmético propio (ver
comentario de cabecera) — sus 10 líneas de Fútbol profesional suman $77.570.507, pero el
documento imprime "Total 77.550.507" (usado también en el Estado de Recursos y Gastos
principal). officialTotalRevenue de acá usa la SUMA VERIFICADA de las líneas reales
($105.043.957 = 77.570.507+10.757.903+10.397.525+6.318.022), $20.000 (0,02%) por encima del
total impreso por el propio documento ($105.023.957) — diferencia inmaterial, documentada,
no inventada.
```

## 2015

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2017, 2018): Compra de jugadores, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
Único disponible para 2015: columna comparativa del balance 2015-2016 (no hay balance
2014-2015 en nuestro archivo) — revenue con detalle completo (Anexo IV siempre da ambos
años), gastos solo a nivel de las 4 categorías agregadas (Anexo V no desglosa el año
comparativo). SUPERÁVIT/DÉFICIT real: DÉFICIT $67.509.882 ARS (antes decía, con las cifras
restated, $228.557.786 — completamente distinto).
```

_al lado del campo `reportType`:_

```text
ver duda abierta en Admin/dudas-por-club.md
```

## Gestiones

_antes de Luis Segura (data/gestiones/ar.js):_

```text
Segura: la fuente da solo el año (elegido en las elecciones de 2001, presidente desde 2002); dia 01 por convencion.
```

_antes de Cristian Malaspina (data/gestiones/ar.js):_

```text
Malaspina: ganó el 19/12/2015 y asumió a las 72 horas.
```

## Fuentes

### argentinosjuniors-presentacion-asamblea-2015-2019

_note (data/):_

```text
PDF oficial de 2 páginas (texto nativo) preparado para la asamblea del club, con las cifras COMPARATIVAS de los 5 ejercicios a la vez, EN PESOS AJUSTADOS POR INFLACIÓN (dice explícito "cifras en pesos ajustadas por inflación" en el propio título de cada cuadro) — NO son pesos nominales, a diferencia de todo el resto del sitio. Usado SOLO para el Ejercicio 2019 (el más reciente de la presentación, su columna es ~nominal ya que la restatement se hace hacia atrás desde el año más nuevo) — los ejercicios 2015 a 2018 se reemplazaron con datos reales de los balances auditados de cada año (ver las 3 fuentes de abajo y el comentario de cabecera de data/ar/argentinosjuniors-data.js para el detalle completo del bug encontrado y corregido). El archivo "balance-2018-2019.pdf" del mismo club, a pesar del nombre, resultó ser la Memoria narrativa (sin una sola cifra contable), y no hay balance auditado real de 2018/2019 descargado — SUPERÁVIT 2019 $119.274.273 ARS sigue sin confirmar contra un documento primario propio.
```

Transcripción de este documento: `Clubes/Argentina/Argentinos Juniors/presentacion-asamblea-2018-2019.md`.

### argentinosjuniors-balance-2015-2016

_note (data/):_

```text
PDF oficial (39 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract). Da el Ejercicio 2016 con detalle completo de Anexo IV (Recursos por rubro)/Anexo V (Gastos por rubro x departamento) y el Ejercicio 2015 como comparativo (revenue con detalle completo, gastos solo a nivel de 4 categorías agregadas — Anexo V no desglosa el año comparativo). DÉFICIT real 2016: $(24.707.096) ARS. DÉFICIT real 2015: $(67.509.882) ARS. El Anexo IV de este balance tiene un error aritmético propio de $20.000 (0,02%) entre la suma de sus líneas de "Fútbol profesional" y su propio total impreso — verificado visualmente contra la imagen de la página, no es un error de transcripción (ver comentario de cabecera de data/ar/argentinosjuniors-data.js). Convertido a USD con $15,2 (2016)/$9,085 (2015), dólar vendedor BNA de cierre investigado externamente (la fuente no declara tipo de cambio propio).
```

### argentinosjuniors-balance-2016-2017

_note (data/):_

```text
PDF oficial (45 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract). Da el Ejercicio 2017 con detalle completo de Anexo IV/V. SUPERÁVIT real: $30.812.797 ARS. Cruzado contra la columna comparativa del balance 2017-2018 (mismo Total del Pasivo, $252.159.592, y mismos totales de Recursos/Gastos en ambos documentos). Convertido a USD con $16,8, dólar vendedor BNA de cierre investigado externamente.
```

### argentinosjuniors-balance-2017-2018

_note (data/):_

```text
PDF oficial (31 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract). Da el Ejercicio 2018 con detalle completo de Anexo IV/V. SUPERÁVIT real: $318.336.988 ARS — este documento fue el que disparó el hallazgo del bug de pesos restated (su Total de Recursos real, $610.699.504, es muy distinto de los $951.176.055 que decía la presentación de asamblea para el mismo ejercicio). Convertido a USD con $28,85, dólar vendedor BNA de cierre investigado externamente.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.argentinosjuniors

```text
Confirmado por búsqueda (Versión 95): Cristian Malaspina presidente desde 2015, reelecto en
dic-2019 y de nuevo en 2023. Mes exacto de asunción en 2015 sin confirmar (ver duda abierta en
Admin/dudas-por-club.md) — por eso el Ejercicio 2015 (30/6/2015) quedó sin gestión asignada
(gestionId:null en data/ar/argentinosjuniors-data.js), y esta entrada arranca en 2016.
```

### memberCountByClub.argentinosjuniors

```text
AFA, 2026 (cobertura de prensa)
```

2026-10-15 (to-do 232 ab): 2019 (caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.
