# Urawa Red Diamonds (浦和レッズ)

- **Hit vía documento consolidado de la liga (2026-09-13).** Urawa (abreviado "浦和") aparece con
  ingreso por categoría en la tabla de clubes de J1 de cada edición del "クラブ経営情報開示資料"
  — confirmado presente en las ediciones 2012, 2015, 2018, 2020, 2023 y 2025. Es históricamente el
  club con más ingreso de la liga en varios ejercicios: el propio PDF de 2018 menciona que Urawa
  tuvo el récord histórico de la liga en 2017 (79,7 億円/¥7.970M) antes de que Vissel Kobe lo
  superara en 2018; en la edición 2025, Urawa es el club de mayor ingreso (113 億円/¥11.310M en el
  ejercicio 2025), el primero en superar los ¥10.000M junto con Kawasaki Frontale.
  Serie de ejemplo (edición 2025, millones de JPY): 浦和 売上高 2023: 10.384, 2024: 10.211, 2025:
  11.310 (+1.099).
  Los 14 PDFs de la liga (2012-2025) están en
  `Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf` — ver
  `fuentes/Japón/_notas-generales.md` para la metodología completa y los gotchas (costos solo a
  nivel de división, no por club; ancho de caracteres inconsistente entre años).
- Pendiente: transcribir a Markdown y extraer la serie completa de Urawa de los 14 PDFs. No se buscó
  un balance individual de la sociedad operadora (浦和レッドダイヤモンズ株式会社, ligada
  históricamente a Mitsubishi Motors) — el documento de la liga ya cubre lo pedido.
- Contacto: `aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<año>.pdf`.
- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-13), Ejercicio 2025**: ver `data/urawareddiamonds-data.js`
  (clubId `urawareddiamonds`). Solo Sponsor (¥4.195M)/Gate (¥2.214M)/Total (¥11.310M) son reales por
  club — el resto de categorías y TODOS los costos solo se publican a nivel de división, no por club
  (ver corrección en `_notas-generales.md`). `expenseLinesByYear` vacío a propósito,
  `officialTotalExpenses`/`officialPAT` en `null`.
