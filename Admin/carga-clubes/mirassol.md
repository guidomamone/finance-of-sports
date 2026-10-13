# mirassol — evidencia de carga

Lo que había como comentario en `data/br/mirassol-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/mirassol-data.js — Mirassol Futebol Clube (Mirassol, SP, Brasil).
NO es SAF (sigue como associação/clube tradicional). Ejercicio social = ANO
CALENDÁRIO (1/1/2024 a 31/12/2024), ver `fiscalYearStart:'01-01'` en
data/clubs.js, igual que el resto de los clubes brasileños del sitio.
1 ejercicio cargado: 2024.

FUENTE: `Clubes/Brasil/Mirassol/relatorio-auditoria-contabil-2024.pdf` (6
páginas, texto nativo, vía pdftotext -layout), transcripción completa en
`relatorio-auditoria-contabil-2024.md` en la misma carpeta. CNPJ
51.352.862/0001-14, auditado por ANALYST GESTAO EMPRESARIAL LTDA, firmado
digitalmente el 21/5/2025.

OJO — ESTE ES EL CLUB CON MENOS DESGLOSE DEL SITIO JUNTO CON LOS DE JAPÓN, Y
LA RAZÓN ES LA FUENTE, NO LA CARGA. El PDF no son las demonstrações contábeis
(no trae DRE ni balanço patrimonial como tablas): es el INFORME NARRATIVO del
auditor SOBRE esas demonstrações, que cita unas pocas cifras sueltas en prosa.
No hay un solo rubro de ingreso ni de gasto desglosado en ningún lado del
documento. Por eso:
  - el ingreso entero va en UNA línea `lump_football_operations` (es
    exactamente el caso que la categoría existe para cubrir: el club de verdad
    no separa nada, no es un encabezado de grupo con líneas debajo — ver
    club-data-mapping SKILL.md sección 1, REGLA de la Versión 38);
  - el gasto va en 2 líneas, las únicas 2 que el documento distingue: "Custos"
    y "Despesas operacionais".

EL MONTO DE "CUSTOS" NO ESTÁ IMPRESO, PERO NO ES UNA ESTIMACIÓN. El documento
imprime receita, despesas operacionais y superávit, y por separado imprime el
porcentaje de custos sobre la receita con 14 decimales. Despejando:
    custos = 59.339.448,33 - 19.090.092,99 - 4.143.614,12 = 36.105.741,22
    36.105.741,22 / 59.339.448,33 = 60,84610193746304 %
    el documento imprime  60,84610193746302 %   -> coincide a 14 decimales
O sea, el valor despejado queda confirmado por una vía independiente del
propio documento, no es un residuo a ciegas (a diferencia del `tax` de Once
Caldas, que sí es un residuo documentado, ver data/co/oncecaldas-data.js). El
mismo chequeo con despesas/receita da 32,17099842896366 %, exacto al impreso.

ESCALA: el documento está en reales enteros con centavos (R$ 59.339.448,33).
Acá se guardan en MILLONES de BRL nativos, mismo criterio que el resto del
sitio: cada valor se dividió por 1.000.000.

grossDebt/cash QUEDAN SIN CARGAR (0/0, no inventados — mismo criterio que
Unión y Club América). El documento dice que el passivo NÃO circulante es
R$ 0,00, pero del passivo CIRCULANTE solo publica la variación contra 2023
(+R$ 815.546,38), nunca su total, así que la deuda bruta no es determinable.
Cargar grossDebt:0 con el circulante desconocido afirmaría "este club no tiene
deuda", que es justamente lo que el documento NO dice.

DUDA ABIERTA, anotada en `Admin/dudas-por-club.md`: el Patrimônio Líquido del
documento no cierra consigo mismo (saldo inicial 27.272.986,96 + superávit
4.143.614,12 = 31.416.601,08, pero imprime saldo final 30.267.600,99, una
diferencia de 1.149.000,09 sin explicar). Por eso NO se cargó ningún dato
patrimonial. Las 3 cifras del resultado del ejercicio, que son las que sí se
cargaron, cierran exacto entre sí.

FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 — misma cotización oficial
del Banco Central do Brasil que ya usan Grêmio y Botafogo para ESE MISMO
cierre (no es reusar el fx declarado por otro club, que estaría prohibido: es
la misma referencia externa para la misma fecha, y el documento de Mirassol no
declara ningún tipo de cambio propio).

Gestión: el informe del auditor no nombra al presidente del club (está
dirigido a "IImos. Srs. Administradores", sin firma dirigencial). No se
confirmó ninguna gestión, se cargó una entrada genérica, mismo criterio que
Once Caldas/Envigado (ver club-data-mapping SKILL.md sección 7).
============================================================================
```

_de data/club-leagues/br.js:_

```text
ascendió a la Série A para 2025
```

## 2024

### Meta

```text
Sin cargar a propósito, ver comentario de cabecera: el documento no publica
el total del passivo circulante, solo su variación.
El informe no separa resultado financeiro: la única cascada que publica es
receita - custos - despesas = superávit, sin línea financiera intermedia.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Edson Antonio Ermenegildo (1995-01-01 a hoy): Wikipedia pt: club 'presidido desde 1995 por Edson Ermenegildo' (solo año; se usa 1995-01-01). Es también el prefecto de Mirassol (reelecto octubre 2024, A Gazeta). Firma el balance 2024 como PRESIDENTE (Clubes/Brasil/Mirassol/balancopatrimonial-modelo4-anual-01-12-2024assinado.md, firma digital 28-04-2025), lo que confirma que presidía en el cierre.
Duda: El año 1995 es de Wikipedia; otras notas de prensa dicen '30 años al mando' (coherente). Falta el día/mes de asunción.
```

## Fuentes

### mirassol-relatorio-auditoria-2024

_note (data/):_

```text
PDF oficial (6 páginas, texto nativo), auditoría de ANALYST GESTAO EMPRESARIAL LTDA firmada el 21/5/2025. OJO: no son las demonstrações contábeis en sí, es el informe narrativo del auditor sobre ellas, y cita las cifras en prosa sin desglosar ningún rubro — por eso el club aparece con una sola línea de ingresos y dos de gastos. El monto de "Custos" no está impreso: se despeja de las otras 3 cifras y queda confirmado a 14 decimales por el porcentaje sobre la receita que el propio documento publica. grossDebt/cash sin cargar (el documento nunca publica el total del passivo circulante). El Patrimônio Líquido del documento no cierra consigo mismo, ver Admin/dudas-por-club.md. Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Mirassol/relatorio-auditoria-contabil-2024.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.mirassol

```text
El informe del auditor no nombra al presidente, no se confirmó ninguna gestión.
```

### memberCountByClub.mirassol

```text
no se encontró una cifra confiable en esta sesión
```
