# Yokohama F. Marinos (横浜Fマリノス)

- **Hit vía documento consolidado de la liga (2026-09-13).** Aparece en la tabla de clubes de J1
  bajo la abreviatura "横浜FM" (medio ancho) en algunos años y "横浜ＦＭ" (ancho completo) en otros —
  ver gotcha de ancho de caracteres en `fuentes/Japón/_notas-generales.md`. Confirmado presente en
  2012, 2015, 2018 y 2023-2025 (el grep con un solo ancho de caracteres dio 0 matches en 2020 pese a
  que el club sí jugó esa temporada — confirmar el ancho correcto para ese año específico antes de
  concluir ausencia).
  Serie de ejemplo (edición 2025, millones de JPY): 横浜FM 売上高 2023: 6.509, 2024: 7.333, 2025:
  7.751 (+418).
  Los 14 PDFs de la liga (2012-2025) están en
  `Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf` — ver
  `fuentes/Japón/_notas-generales.md` para la metodología completa y los gotchas.
- Pendiente: transcribir a Markdown y extraer la serie completa de los 14 PDFs; re-confirmar el
  ejercicio 2020 con el ancho de caracteres correcto (probablemente "横浜ＦＭ" en ese año, no
  verificado línea por línea todavía). No se buscó balance individual de la sociedad operadora
  (横浜マリノス株式会社, de Nissan/City Football Group) — el documento de la liga ya cubre lo pedido.
- Contacto: `aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<año>.pdf`.
- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-13), Ejercicio 2025**: ver `data/yokohamafmarinos-data.js`. Solo
  Sponsor (¥2.871M)/Gate (¥1.530M)/Total (¥7.751M) son reales por club — el resto de categorías y
  TODOS los costos solo se publican a nivel de división, no por club (ver corrección en
  `_notas-generales.md`). `expenseLinesByYear` vacío a propósito, `officialTotalExpenses`/
  `officialPAT` en `null`.
