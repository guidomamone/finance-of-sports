# Vissel Kobe (ヴィッセル神戸)

- **Hit vía documento consolidado de la liga (2026-09-13).** Aparece en la tabla de clubes de J1
  bajo la abreviatura "神戸" — confirmado presente en 2012, 2015, 2018, 2020, 2023 y 2025. El propio
  PDF de 2018 destaca que Vissel Kobe estableció el récord histórico de ingreso de toda la J.League
  ese ejercicio (96,6 億円/¥9.666M, superando el récord anterior de Urawa de ¥7.970M en 2017),
  impulsado por el fichaje de Andrés Iniesta y el sponsor Rakuten (accionista mayoritario del club).
  Serie de ejemplo (edición 2018, millones de JPY): 神戸 売上高 2016: 3.865, 2017: 5.237, 2018: 9.666
  (+4.429, el salto más grande de toda la tabla ese año).
  Los 14 PDFs de la liga (2012-2025) están en
  `Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf` — ver
  `fuentes/Japón/_notas-generales.md` para la metodología completa y los gotchas.
- Pendiente: transcribir a Markdown y extraer la serie completa de los 14 PDFs. No se buscó balance
  individual de Rakuten Group como accionista mayoritario (sería una fuente indirecta/consolidada,
  no específica del club) — el documento de la liga ya cubre lo pedido de forma directa.
- Contacto: `aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<año>.pdf`.
- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-13), Ejercicio 2025**: ver `data/visselkobe-data.js`. Solo Sponsor
  (¥3.025M)/Gate (¥1.441M)/Total (¥8.711M) son reales por club — el resto de categorías y TODOS los
  costos solo se publican a nivel de división, no por club (ver corrección en
  `_notas-generales.md`). `expenseLinesByYear` vacío a propósito, `officialTotalExpenses`/
  `officialPAT` en `null`.
