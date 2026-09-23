# Atlético San Luis (Club Atlético de Madrid Potosí, S.A.P.I. de C.V.)

- **HIT PARCIAL (sesión 2026-09-22), y el ángulo más reutilizable del barrido de México.** Atlético
  San Luis es filial de un club europeo que SÍ publica sus cuentas: **Club Atlético de Madrid, S.A.D.**
  posee (vía `Atlético de Madrid International Holding, S.L.`) el **88,14%** del club mexicano, y la
  nota de "Inversión en empresas del grupo y asociadas" de las **Cuentas Anuales** del Atleti —
  públicas, gratis, ya descargadas en este repo — trae, ejercicio por ejercicio, capital, reservas,
  resultado del ejercicio y resultado de explotación de la sociedad mexicana, **en euros**.
- **No hace falta descargar nada nuevo**: los PDFs ya están en
  la carpeta `Clubes/España/Atlético de Madrid/`, un PDF por ejercicio con su transcripción `.md`
  al lado (12 ejercicios, 2013-14 a 2024-25 — ver `fuentes/España/Atlético de Madrid.md`). La razón
  social mexicana aparece a partir del ejercicio **2018-19** (cuando el Atleti tomó la franquicia) y
  en todos los siguientes.
- **Ejemplo de lo que hay, ejercicio 2024-25 (cierre 30/06/2025, en euros)**: Capital 64.066.879,38;
  Reservas y otras partidas del PN (55.572.686,58); Resultado a 30/06/2025 72.684,27; Resultado de
  explotación 400.062,95. En el ejercicio 2023-24 la misma tabla aparece dos veces (participación
  88,14% del año y 88,99% del comparativo), más filas del club en los cuadros de saldos y
  transacciones con empresas del grupo (ej. 1.725.000,00 en el cuadro de operaciones).
- **Evolución de la participación, útil para no confundir perímetros** (viene narrada en la memoria):
  constituida como "Club Atlético de Madrid Potosí, S.A. de C.V." con domicilio en Ciudad de México y
  capital social inicial de 10.000 pesos; 70% del Atleti tras vender un 39% en 2016/17; ampliaciones
  de capital de 525 y 530 millones de pesos que llevaron la participación a 82,36% (30/06/2021),
  88,45% (30/06/2022), 88,99% (30/06/2023) y 88,14% (30/06/2025). En 2022-23 la sociedad formalizó con
  el Gobierno de San Luis Potosí la transmisión de un terreno a su favor.
- **OJO para una futura sesión de mapeo**: esto NO es un balance ni un estado de resultados del club
  — son 4 cifras por ejercicio (capital, reservas/PN, resultado, resultado de explotación), en euros y
  con cierre a 30 de junio (no el año calendario que usa la contabilidad mexicana ni el que exige el
  Reglamento de Control Económico de la LIGA MX). Convertir y encajar esto en el esquema del sitio
  requiere una decisión explícita: releer `club-data-mapping` sección 5 antes de tocar nada.
- **Qué se probó y falló**:
  1. `atleticodesanluis.mx` (HTTP 200) — sin sección de transparencia, estados financieros, informe
     anual ni inversionistas (barrido de la home por esas palabras: cero hits).
  2. **Cuentas anuales CONSOLIDADAS del Atlético de Madrid** (que traerían el balance y la PyG
     completos de la filial mexicana, no solo 4 cifras): la memoria individual confirma que existen y
     se formulan desde el ejercicio 2020/21, pero **no están publicadas**. Revisadas a mano las dos
     páginas oficiales que las alojarían, `atleticodemadrid.com/atm/informacion-economica-financiera`
     (solo `pdf/cuentas_anuales_2025.pdf`, las individuales) y `atleticodemadrid.com/atm/ley-de-transparencia`
     (solo `files/cuentas_anuales_2023.pdf` y los estatutos). Probadas además 18 variantes de URL
     directa (`cuentas_anuales_consolidadas_<año>.pdf`, `cuentas_anuales_consol_<año>.pdf`,
     `ccaa_consolidadas_<año>.pdf` sobre `/pdf/` y `/files/`, años 2023-2025): **todas 404**.
  3. SEC EDGAR full-text: sin filings de ninguna entidad relacionada. BMV: la sociedad no es emisora
     (verificado contra el listado completo de emisoras de capitales, ver `_notas-generales.md`).
- **Ángulo pendiente**: las consolidadas del Atleti se depositan en el **Registro Mercantil de Madrid**,
  que es de pago para terceros (mismo tipo de barrera que el Firmenbuch austríaco o el Registro delle
  Imprese italiano). Si Guido quisiera el balance completo de la filial mexicana, ese es el camino, y
  costaría unos pocos euros. Segundo ángulo: **Apollo Sports Capital** pasó a ser accionista
  mayoritario del Atlético de Madrid en 2025 — si la nueva estructura emite deuda cotizada, aparecería
  un folleto con estados consolidados.
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Eso es lo que hace que un club sin controlante
  cotizante quede sin nada: el documento existe y está auditado, pero el regulador deportivo lo exige
  y lo blinda.
- Último chequeo: 2026-09-22.
