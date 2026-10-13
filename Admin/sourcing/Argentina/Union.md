# Unión (Santa Fe)

**Ángulos**: sitio oficial: agotado para Ejercicio N°120 (media library completa revisada, no
existe todavía) · Wayback CDX: no aplica esta ronda · búsqueda web: no intentado esta ronda ·
regulador/país: no aplica — 2026-09-26

- Memoria + Balance + Informe de Comisión Revisora de Cuentas, Ejercicio N°114 (2019-20) —
  clubaunion.com.ar/wp-content/uploads/2020/07/ (Memoria-Club-Atletico-Union-Ejercicio-114.pdf +
  Comision-Revisora-de-Cuentas-Ejercicio-No-114-.pdf). La Memoria y el informe de Comisión Revisora se
  descargaron bien; el PDF del Balance en sí (Balance-114.pdf) NO se pudo descargar completo — tanto
  el dominio oficial (caído al momento de la investigación) como el snapshot de Wayback Machine
  cortan la descarga en exactamente 1.048.576 bytes (1 MB), archivo corrupto descartado. Reintentar
  más adelante, directo del dominio oficial cuando vuelva a estar online.
- Memoria y Balance completo, Ejercicio N°116 — .../uploads/2024/04/EJERCICIO-N°-116.pdf (52 págs).
- Memoria y Balance completo, Ejercicio N°117 — .../uploads/2024/04/EJERCICIO-No-117.pdf (63 págs).
- Estados Contables, Ejercicio N°118 (2023-24) — .../uploads/2025/05/E.E.C.C-2023-2024_compressed-1.pdf (53 págs).
- Acta de Asamblea, Ejercicio N°118 (11/4/2024) — .../uploads/2025/05/Acta-asamblea-11-04-24_compressed.pdf (26 págs).
- Memoria y Balance, Ejercicio N°119 (el más reciente) — .../uploads/2025/12/memoria-y-balance-119-final_compressed-1.pdf (54 págs).
  Todos descargados en `Clubes/Argentina/Union/`. NOTA DE FUENTE: el sitio oficial
  (clubaunion.com.ar) estaba con el hosting suspendido al momento de la investigación — estos 7 PDFs
  se bajaron de la copia archivada por Wayback Machine de esas MISMAS URLs del dominio oficial (no es
  un mirror de tercero), mismo criterio que ya se usó para el balance de River vía turiver.com. Volver
  a intentar clubaunion.com.ar directo cuando el sitio esté online de nuevo.
- **4 ejercicios YA CARGADOS en el sitio: 2022, 2023, 2024, 2025** (Versión 95: solo 2025; Versión
  99: se agregaron 2022/2023/2024 vía OCR). 11vo club del motor genérico. Ejercicio N°119 (2024-25,
  DÉFICIT FINAL real $(4.022.045.732) ARS): el Anexo IV (Gastos) no separaba limpiamente sus
  columnas de departamento en el OCR — se cargó con desglose confiable solo donde se pudo verificar
  por checksum (Sueldos de fútbol, Amortizaciones), el resto a nivel de categoría agregada.
  Ejercicios N°116 (2021-22, SUPERÁVIT $190.408.914) y N°117 (2022-23, SUPERÁVIT $893.901.287): estos
  2 SÍ tienen el Anexo IV con columnas por departamento razonablemente separables — se cargaron con
  detalle completo por rubro, verificado que cada uno suma exacto contra el Total de Gastos
  Ordinarios. Ejercicio N°118 (2023-24, SUPERÁVIT $1.166.322.977): este archivo específico NO
  incluye el Anexo IV de detalle — se cargó a nivel de las 6 categorías agregadas del Estado de
  Recursos y Gastos. NINGUNO de los 3 archivos 116/117/118 incluye una página de Estado de Situación
  Patrimonial en el escaneo disponible — grossDebt/cash quedaron sin cargar para esos 3 años (sí
  están para 2025). Ver `data/union-data.js`. La Memoria 114 y el Informe de Comisión Revisora 114
  son narrativos, sin cifras (el balance 114 en sí nunca se consiguió, ver nota arriba).
- Pendiente: Ejercicio N°115 (2020-21, pandemia, no parece haberse publicado), ejercicios anteriores
  al 114, el Balance-114 en sí (ver nota arriba), confirmar si existe ya un Ejercicio N°120, y
  conseguir una copia con Estado de Situación Patrimonial de los Ejercicios 116/117/118 para poder
  cargar grossDebt/cash de esos años.
- Último chequeo: 2026-09-12.
- Contacto: no se pudo revisar /contacto/ (sitio caído); reintentar en clubaunion.com.ar/contacto/ o
  vía Oficina de Socios (L-V 9-16h).
- Color de marca: `#ED1C24` — tabla por liga de footylogos (Liga Profesional Argentina, "Union
  Argentina"), 1er color, exacto, verificado 2026-09-21. NO sale del sitio oficial, que declara el
  rojo default de WordPress.

## Chequeo 2026-09-26 (2) — barrido de Wayback CDX de dominio completo, pese a estar "ya cargado": 5 documentos nuevos

Pedido de Guido: repetir sobre los clubes "ya bien cubiertos" la misma técnica que destrabó 4
documentos nuevos de Boca (Wayback CDX sobre el DOMINIO COMPLETO, no solo la URL puntual que se
venía mirando) — la lección es que "ya está muy sourceado" no es motivo para saltear esta familia.

- **Balance-114.pdf RECUPERADO COMPLETO** (19 págs, `Clubes/Argentina/Union/balance-114-real.pdf`) —
  el intento anterior (arriba, "NO se pudo descargar completo... 1.048.576 bytes, archivo corrupto
  descartado") esta vez sí funcionó al pedir el snapshot `20220423112920` en modo `id_`: bajó
  13.456.091 bytes, `%%EOF` presente, `pdfinfo` sin errores. Es el Balance real del Ejercicio N°114
  (2019-20), separado de la Memoria narrativa ya conocida — mismo patrón "balance en archivo aparte
  de la memoria" que se repite en varios clubes de este proyecto. Pendiente de OCR (es escaneado, sin
  capa de texto) antes de poder cargarlo.
- **EECC 2018 nuevo** (17 págs, `eecc-2018.pdf`) — Estados Contables del ejercicio 2018, con capa de
  texto, encontrado en `wp-content/uploads/2019/08/EECC_30533731917_2018.pdf`.
- **3 presupuestos 2022 nuevos**, con desglose mensual completo (ene-dic): `presupuesto-economico-2022.pdf`,
  `presupuesto-financiero-2022.pdf`, `presupuesto-inversiones-2022.pdf` — de
  `wp-content/uploads/2022/01/`.
- **Intentado y DESCARTADO (roto, no recuperable con las herramientas de esta sesión)**: la misma
  carpeta `wp-content/uploads/2019/08/` tiene EECC de 2010 a 2017 más 2021, y un Presupuesto
  2019-2020 — los 10 archivos, en TODOS los timestamps disponibles en Wayback (solo hay uno por URL,
  no hay otro para reintentar), se cortan en exactamente 1.048.576 bytes y no abren (`pdfinfo`:
  "Invalid XRef entry", "Couldn't read xref table"). A diferencia del caso de Almagro (donde SÍ había
  un segundo timestamp sano), acá no hay ningún otro snapshot de estas URLs puntuales — el corte
  parece ser un límite duro de esa captura específica, no algo resoluble reintentando. Quedan
  pendientes, sin descartar que algún día Wayback sirva un snapshot distinto.
- Todo esto sigue esperando decisión de Guido sobre OCR (Tesseract+Sonnet vs. Gemini) antes de
  cargarse al sitio — no se OCReó nada en esta sesión.

## Chequeo 2026-09-26 — sitio oficial de vuelta online, sin Ejercicio N°120 todavía

Sesión de sourcing puro (5 clubes del interior). Tarea liviana: chequear si ya existe un Ejercicio
2025-26 (N°120) publicado, más allá del N°119 (2024-25) ya cargado.

- **`clubaunion.com.ar` está online de nuevo** (HTTP 200 directo, ya no hace falta pasar por
  Wayback como cuando se cargó el N°119 con el hosting caído).
  `wp-json/wp/v2/media?search=120`/`ejercicio 120`/`asamblea`/`balance 2026`: sin ningún PDF de un
  ejercicio nuevo. Filtrando la media library completa por fecha (`after=2025-12-01`, que es
  cuando se subió el N°119) tampoco aparece nada posterior — los últimos 4 PDFs subidos siguen
  siendo del N°119 (memoria-y-balance-119, EECC-119, y 2 variantes más, todos 23/12/2025).
- **Conclusión: no existe Ejercicio N°120 todavía** (esperable: el N°119 cerró 30/6/2025 y se
  publicó en diciembre 2025, un ejercicio jul-jun más tardaría en aprobarse/publicarse recién hacia
  fin de 2026). Nada nuevo para cargar. Sigue pendiente lo ya anotado (N°115, ejercicios
  pre-114, Balance-114 en sí, Estado de Situación Patrimonial de 116/117/118).
- Último chequeo: 2026-09-26.
