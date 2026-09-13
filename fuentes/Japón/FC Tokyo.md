# FC Tokyo (FC東京)

- **Hit vía documento consolidado de la liga (2026-09-13).** Aparece en la tabla de clubes de J1
  bajo la abreviatura "FC東京" (medio ancho) o "ＦＣ東京" (ancho completo) según el año — ver gotcha
  de ancho de caracteres en `fuentes/Japón/_notas-generales.md`, que en este club es el más notorio:
  un grep con "FC東京" (medio ancho) dio 0 matches en las ediciones 2015/2018/2020 porque esos años
  usan "ＦＣ東京" (ancho completo); con el ancho correcto el club SÍ aparece en todas las ediciones
  chequeadas (2012, 2015, 2018, 2020, 2023, 2025).
  Serie de ejemplo (edición 2025, millones de JPY): FC東京 売上高 2023: 5.929, 2024: 6.989, 2025:
  7.210 (+221).
  Los 14 PDFs de la liga (2012-2025) están en
  `Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf` — ver
  `fuentes/Japón/_notas-generales.md` para la metodología completa y los gotchas.
- Pendiente: transcribir a Markdown y extraer la serie completa de los 14 PDFs, usando el ancho de
  caracteres correcto por año (confirmar caso por caso, no asumir uno solo). No se buscó balance
  individual de la sociedad operadora (株式会社東京フットボールクラブ, ligada a Tokyo Gas) — el
  documento de la liga ya cubre lo pedido.
- Contacto: `aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<año>.pdf`.
- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-13), Ejercicio 2025**: ver `data/fctokyo-data.js`. Solo Sponsor
  (¥3.223M)/Gate (¥1.439M)/Total (¥7.210M) son reales por club — el resto de categorías y TODOS los
  costos solo se publican a nivel de división, no por club (ver corrección en
  `_notas-generales.md`). `expenseLinesByYear` vacío a propósito, `officialTotalExpenses`/
  `officialPAT` en `null`.
