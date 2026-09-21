# Kashima Antlers (鹿島アントラーズ)

- **Hit vía documento consolidado de la liga (2026-09-13).** Kashima (abreviado "鹿島" en las tablas)
  aparece con ingreso por categoría (スポンサー収入/sponsors, 入場料収入/taquilla, 物販収入/
  merchandising, Ｊリーグ配分金, 移籍補償金等収入, アカデミー関連収入, その他収入) en la tabla de
  clubes de J1 de cada edición anual de "クラブ経営情報開示資料" de la J.League — confirmado presente
  en las ediciones 2012, 2015, 2018, 2020, 2023 y 2025 (grep de texto extraído). Cada PDF trae el
  ejercicio del año del documento MÁS los 2 ejercicios anteriores, así que hay overlap entre años
  consecutivos.
  Ejemplo (edición 2025, en millones de JPY, tal cual figura impreso): 鹿島 売上高 (ingreso total)
  2023: 6.462M, 2024: 7.200M, 2025: 8.173M (+973 vs. año anterior).
  Los 14 PDFs de la liga (2012-2025, cubren TODOS los clubes J1/J2/J3, no solo Kashima) están en
  `Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf` — ver
  `fuentes/Japón/_notas-generales.md` para la metodología completa, la URL exacta, y los gotchas
  (costos solo a nivel de división, no por club; ancho de caracteres inconsistente entre años;
  publicación escalonada).
- Pendiente: transcribir a Markdown y extraer la serie completa de Kashima de los 14 PDFs (esta
  sesión fue solo sourcing, no mapeo de datos). No se buscó un balance/EEFF individual de la
  sociedad operadora de Kashima (Kashima Antlers Football Club Co., Ltd., mayoritariamente de
  Mercari desde 2019) — el documento de la liga ya cubre el desglose de ingreso pedido, no se
  priorizó buscar otra fuente en esta sesión.
- Contacto: `aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<año>.pdf` (ver notas
  generales del país para el patrón completo).
- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-13), Ejercicio 2025**: ver `data/kashimaantlers-data.js`. Solo Sponsor
  (¥3.324M)/Gate (¥1.458M)/Total (¥8.173M) son reales por club — el resto de categorías y TODOS los
  costos solo se publican a nivel de división, no por club (CORRECCIÓN a lo que decía el bullet de
  arriba, ver `_notas-generales.md`). `expenseLinesByYear` vacío a propósito, `officialTotalExpenses`/
  `officialPAT` en `null`.
