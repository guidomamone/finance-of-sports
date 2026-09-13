# Nagoya Grampus (名古屋グランパス)

- **Hit vía documento consolidado de la liga (2026-09-13).** Aparece en la tabla de clubes de J1
  bajo la abreviatura "名古屋" — confirmado presente en 2012, 2015, 2018, 2020, 2023 y 2025 (con la
  salvedad de que el club jugó en J2 durante 2017, así que en esa edición específica habría que
  buscarlo en la tabla de J2, no de J1 — no verificado en esta sesión, queda para el mapeo de datos).
  Serie de ejemplo (edición 2025, millones de JPY): 名古屋 売上高 2023: 6.303, 2024: 6.874, 2025:
  6.463 (▲411, uno de los pocos clubes objetivo con caída interanual ese ejercicio).
  Los 14 PDFs de la liga (2012-2025) están en
  `Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf` — ver
  `fuentes/Japón/_notas-generales.md` para la metodología completa y los gotchas (costos solo a
  nivel de división, no por club).
- Pendiente: transcribir a Markdown y extraer la serie completa de los 14 PDFs; confirmar en qué
  tabla (J1 o J2) buscar el ejercicio 2017 dado el descenso de ese año. No se buscó balance
  individual de la sociedad operadora (名古屋グランパスエイト株式会社, ligada a Toyota) — el
  documento de la liga ya cubre lo pedido.
- Contacto: `aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<año>.pdf`.
- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-13), Ejercicio 2025**: ver `data/nagoyagrampus-data.js`. Solo Sponsor
  (¥2.988M)/Gate (¥1.360M)/Total (¥6.463M) son reales por club — el resto de categorías y TODOS los
  costos solo se publican a nivel de división, no por club (ver corrección en
  `_notas-generales.md`). `expenseLinesByYear` vacío a propósito, `officialTotalExpenses`/
  `officialPAT` en `null`.
