# Mazatlán FC (Equipo de Futbol Mazatlán F.C., S.A. de C.V.)

- Sin PDF con cifras del club, pero **la estructura societaria quedó confirmada con documento oficial**
  y hay un ángulo que estuvo a punto de funcionar.
- **El club fue subsidiaria consolidada al 100% de TV Azteca, S.A.B. de C.V. (BMV, clave `AZTECA`)**.
  Su Reporte Anual CNBV 2022 lo lista por razón social exacta en la tabla de subsidiarias:
  *"Equipo de Futbol Mazatlán F.C., S.A de C.V. (antes Atlético Morelia, S.A de C.V.) — México —
  Actividades deportivas — 100 / 100"*. Fuente:
  `irtvazteca.com/documents/es/Downloads/TV-Azteca-Informe-Anual-2022-Esp.pdf` (con capa de texto).
- **Por qué no alcanza**: TV Azteca **nunca reportó un segmento "Fútbol"** al estilo Ollamani. Sus
  segmentos operativos bajo IFRS 8 son "Operación doméstica", "Guatemala y Honduras", "Exportaciones"
  y "Golf" — el club vive adentro de "Operación doméstica", sin una sola cifra propia. Verificado
  leyendo la Nota 29 ("Información por segmentos") de los estados financieros consolidados 2022 y 2021
  completos: ninguna columna de fútbol.
- **El ángulo que se cayó, y vale documentarlo porque era el bueno**: Ricardo Salinas Pliego **vendió
  Mazatlán FC al Atlante en diciembre de 2025 por USD 65 millones** (aprobado por la FMF el
  08/12/2025; la plaza de Primera División pasó al Atlante al término del Clausura 2026). Una venta así
  obliga bajo IFRS 5 a reportar el club como operación discontinua CON desglose — que es exactamente
  el mecanismo por el que sí tenemos cifras reales de Atlas (ver `Atlas.md`). **Pero TV Azteca dejó de
  presentar información periódica a la BMV después del 4T-2022**: verificado en
  `bmv.com.mx/es/emisoras/informacionfinanciera/AZTECA-5730-CGEN_CAPIT`, donde el último estado
  financiero básico es "Información Del Trimestre 4 Del Año 2022" (subido el 26/04/2023) y el último
  reporte anual es el XBRL de 2022 (28/04/2023). El sitio de relación con inversionistas
  (`irtvazteca.com/es/informes-anuales`) tampoco tiene nada posterior a 2022, y las 6 variantes de URL
  probadas para 2023/2024/2025 devuelven todas **HTTP 302** (redirect, no archivo). Así que el reporte
  que habría traído la nota de la venta no existe.
- **Qué más se probó y falló**:
  1. `mazatlanfc.com.mx` → **HTTP 404**, el dominio ya no sirve el sitio del club.
  2. **SEC EDGAR full-text**: sin filings.
- **Ángulo pendiente**: si TV Azteca regulariza sus presentaciones ante la CNBV/BMV, el reporte del
  ejercicio 2025 traería la nota de operación discontinua con el P&L condensado del club y sus activos
  netos dispuestos, igual que el de Atlas en 2019. Es el único camino identificado. Ojo también con el
  **Atlante**, que hereda la franquicia desde el Apertura 2026: club nuevo a trackear cuando toque.
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Es decir: el documento existe y está auditado, pero
  el regulador deportivo lo exige y lo blinda.
- Último chequeo: 2026-09-22.
