# Atlas (Club de Fútbol Rojinegros, S.A. de C.V.)

- **HIT PARCIAL (sesión 2026-09-22).** Atlas no publica nada por su cuenta, pero fue **subsidiaria
  consolidada al 100% de TV Azteca, S.A.B. de C.V. (BMV, clave `AZTECA`) entre 2014 y julio de 2019**,
  y la desinversión a Grupo Orlegi obligó a TV Azteca a reportarlo como **operación discontinua bajo
  IFRS 5** — que es exactamente el caso en el que la norma exige desglosar el componente. O sea: hay
  cifras auditadas, oficiales y públicas de Atlas, dentro de los estados financieros consolidados de
  su ex-dueño cotizante. Mismo principio que Ollamani/Club América, pero por la puerta de atrás (la
  VENTA del club, no su tenencia).
- **Descargado y guardado** en `Clubes/México/Atlas/tv-azteca-informe-anual-2019.pdf`
  (Reporte Anual CNBV de TV Azteca, ejercicio 2019, ~2,9 MB, CON capa de texto, sin OCR necesario).
  Bajado de `irtvazteca.com/documents/es/Downloads/TV-Azteca-Informe-Anual-2019.pdf`.
- **Qué trae exactamente** (Nota 5, "Operaciones discontinuas por disposición de activos y pérdida de
  control", cifras en miles de pesos mexicanos):
  - Estado de resultado integral condensado de Club Rojinegros: **2018 (año completo)** ventas netas
    $854,059; costos y gastos de operación $(921,800); otros ingresos (gastos) neto $(869); ingresos
    (gastos) financieros neto $(17,751); pérdida de operaciones discontinuas $(86,361).
    **2019 (parcial, hasta la pérdida de control en julio)** ventas netas $195,990; costos y gastos
    $(576,495); otros ingresos neto $218,546; financieros neto $2,178; impuestos $(219,000); pérdida
    $(378,781).
  - Activos y pasivos dispuestos a la fecha de la operación: activos circulantes $226,068; **marca y
    franquicia $268,700**; equipo de operación y otros neto $21,288; **derechos de registro de
    jugadores $193,598**; total de activos dispuestos $709,654; pasivos dispuestos $878,535; efecto de
    la disposición $(168,881).
  - Como parte de la operación, TV Azteca se quedó con el **33% de Orlegi Sports & Entertainment,
    S.A.P.I. de C.V.** (la tenedora de Club Rojinegros), valuada por método de participación.
- **OJO para una futura sesión de mapeo**: es un P&L condensado de 5 renglones, NO un estado de
  resultados por rubro ni un balance completo — no alcanza para llenar
  `<club>RevenueLinesByYear`/`ExpenseLinesByYear` con el detalle que usan los clubes cargados. Sirve
  como cifra de control (ingresos totales 2018) y para `grossDebt`/activos a la fecha de venta. El
  ejercicio 2019 son ~7 meses, no un año: mismo criterio que los ejercicios de transición marcados en
  Dinamarca/Inglaterra.
- **Qué se probó y falló**:
  1. `atlasfc.com.mx` (HTTP 200) — cero secciones de transparencia / estados financieros / informe
     anual. Barrido de la home por las palabras "transparencia", "estados financieros", "informe
     anual", "inversionistas", "memoria anual": ningún hit.
  2. Grupo Orlegi (dueño desde julio 2019, también dueño de Santos Laguna y del Real Sporting de
     Gijón): sociedad privada mexicana, no cotiza en BMV (verificado contra el listado completo de
     emisoras de capitales de la BMV al 22/09/2026 — ver `_notas-generales.md`) ni tiene filings en
     SEC EDGAR (búsqueda full-text de "Orlegi": sin resultados de la empresa).
  3. Reportes anuales de TV Azteca 2017 y 2018: Atlas aparece SOLO como línea en la tabla de
     subsidiarias consolidadas y como valor de "marca y franquicia" en el anexo de intangibles — sin
     desglose de ingresos ni resultado, porque mientras fue subsidiaria vivía dentro del segmento
     "Operación doméstica" (TV Azteca nunca tuvo un segmento "Fútbol" al estilo Ollamani, ver
     `Mazatlán FC.md`). El desglose existe únicamente por la nota de operación discontinua de 2019.
- **Ángulo pendiente**: TV Azteca **dejó de presentar información periódica a la BMV después del
  4T-2022** (ver `_notas-generales.md`), así que no hay reportes posteriores donde buscar. Para los
  ejercicios 2020 en adelante (ya bajo Orlegi) no hay ningún canal público identificado — el único
  documento que existe es el que Atlas entrega confidencialmente a la Dirección General de Control
  Económico de la LIGA MX. Si Orlegi algún día vende o capitaliza el club con un socio cotizante, la
  misma nota de IFRS 5 volvería a abrir la ventana.
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Eso es lo que hace que un club sin controlante
  cotizante quede sin nada: el documento existe y está auditado, pero el regulador deportivo lo exige
  y lo blinda.
- Último chequeo: 2026-09-22.
