# América de Cali (América de Cali S.A., en reorganización)

- **Hit fuerte, club nuevo.** 3 PDFs descargados a `Clubes/Colombia/America de Cali/`:
  `estados-financieros-2025.pdf` (40 páginas, paquete completo 2025/2024),
  `dictamen-revisor-fiscal-2025.pdf`, `certificacion-ef-2025.pdf` — vía SIIS, NIT 890305773. Cifras
  (vista SIIS): Activos $63.113.635 M, Pasivos $61.732.845 M, Patrimonio $1.380.790 M, Ingreso
  $96.390.192 M, pérdida -$11.898.475 M. Dato de color: el club está formalmente "en
  reorganización" (Ley 1116) ante la Superintendencia de Sociedades desde 2014-2015 (proceso
  aprobado, con conversión de deuda en acciones) — por eso hay además un expediente legal extenso
  en supersociedades.gov.co/documents/58444/159253/ con resoluciones del caso (no son estados
  financieros, son actos administrativos del proceso concursal — no confundir).
- Pendiente: años anteriores a 2024 (no explorados vía SIIS todavía — solo se abrió el ejercicio
  más reciente).
- Contacto: siis.ia.supersociedades.gov.co (NIT 890305773).
- **CARGADO al sitio (sesión 2026-09-22, Ejercicio 2025 únicamente)**: ver
  `data/americadecali-co-data.js`. El PDF es texto nativo, pero las tablas de Notas 19-25 se
  renderizan superpuestas/duplicadas en el documento (no un escaneo, un artefacto de layout) — se
  reconstruyó cada nota sumando sus líneas y verificando contra el subtotal impreso en el Estado de
  Resultados antes de cargar. fx usado: TRM oficial al 31/12/2025 ($3.757,08 COP/USD) — el documento
  no declara su propio tipo de cambio. Tie-out: Revenue y Expenses+nonCash cierran exactos (diff
  <$1 mil, redondeo del propio documento). Dudas anotadas para Admin/dudas-por-club.md: (1) si la
  línea "Derechos deportivos" (Costos deportivos, $19.144 M) y "Amortizaciones" ($16.615 M) son
  ambas costo de transferencias/pases o si una es otra cosa — se cargaron las dos como
  `player_amortisation`; (2) la Nota 22 "Gasto de ventas" ($1.593 M) tiene un residuo de $346 M sin
  desglosar línea por línea por el mismo solapamiento de la transcripción.
- Último chequeo: 2026-09-22.
- Color de marca: `#B00000` — rojo escarlata, "El color que identifica al club desde sus inicios es
  el rojo escarlata" (es.wikipedia.org/wiki/América_de_Cali) + tabla por liga de footylogos
  (Categoría Primera A), verificado 2026-09-22.

