# Sesión SOURCING 1 (prueba to-do 315 y 316)

## 2026-10-20: Noruega, lista del portal contra lo cargado

- **Portal:** Regnskapsregisteret de Noruega (brreg), 6 clubes ya cargados (Molde, Fredrikstad, Aalesund, Sarpsborg 08, Vålerenga, Viking).
- **Crawl4AI no se instaló** (pide Chromium; Guido eligió no instalar). Se midió el comando simple contra el Browser pane:
  `tools/listar-brreg.mjs` (HEAD por orgnr y año; no baja nada).
- **Resultado:** 63 ejercicios en el portal que no están cargados. Tabla en `Admin/mediciones/crawl4ai-noruega-lista.md`.
- **Medición:** el script es ~0 tokens y 225 s (brreg tarda ~2 s por pedido, en serie); el Browser pane serían ~20 a 30 mil tokens
  (estimado; medido en 1 de 6 entidades). Para Noruega el script reemplaza al navegador. Crawl4AI no aporta: brreg se responde con HTTP plano.
- **Descargas:** 1 documento de prueba (Viking AS 2024, mismo tamaño que el ya guardado), en el scratchpad. Nada en `Clubes/`.
- **Visto de pasada, fuera de alcance:** los PDFs de las 6 entidades ya estaban bajados en `Clubes/Noruega/`; el hueco es de carga,
  no de sourcing. `ESTADO-clubes.md` no dice qué entidad está cargada en los clubes con más de una.
- **Boceto 316:** `Admin/mediciones/boceto-vigilar-portal-316.md` (media página, sin programar).
- **¿Seguir?** Para portales con URL predecible (Noruega, Bélgica): sí, con script simple, sin Crawl4AI. Crawl4AI queda para cuando
  aparezca un portal que necesite navegador y no tenga API ni URL directa. Para el 315/316 en el TODO (lo escribe la principal): el 315
  queda resuelto con este resultado; el 316 depende de decidir si hace falta vigilar antes de ponerse al día cargando.

## 2026-10-20: to-do 260, Japón 2025 (caja y deuda por club)

- **Resultado: callejón sin salida para caja y deuda; sí hay un balance resumido por club.** Probados Kashima, Urawa, Gamba y FC Tokyo.
- **Webs de los clubes:** no publican balance ni 決算公告. Urawa tiene una página de "経営情報" (`urawa-reds.co.jp/club/managdata.html`) con
  solo total de activos, pasivos y patrimonio (2026 = año corto de 5 meses). Kashima y FC Tokyo no tienen página de finanzas. Gamba:
  la búsqueda no encontró nada en su web.
- **EDINET:** ningún club cotiza (los clubes son sociedades privadas; la matriz sí, pero consolidada). No sirve.
- **官報 (決算公告):** los clubes publican ahí, pero el dato público por club que se vio (catr.jp, gurafu.net, terceros) trae solo ventas,
  resultado, resultados acumulados y total de activos. Sin caja ni deuda, y sin link al aviso original.
- **Lo único que existe por club para 2025:** `https://aboutj.jleague.jp/corporate/assets/pdf/club_info/j_kessan-2025.pdf` (「2025年度
  クラブ決算一覧」, 3 páginas, 200 OK, 859 KB; actualizado 2026-07-24). Trae por club, en millones de JPY, el balance resumido:
  流動資産, 固定資産等, 流動負債, 固定負債, capital, 資本剰余金, 利益剰余金 y patrimonio, para J1, J2 y J3. **No tiene 現金預金 ni
  借入金**: la caja y la deuda como las usa el sitio no salen de ahí. Nota: Kawasaki F. figura con dos columnas (año 2026-01 y
  2026-03, este último de 2 meses); Okayama, 5 meses. No se transcribió ni se cargó.
- **Descarga:** 1 documento (j_kessan-2025.pdf) en el scratchpad, no en `Clubes/`. En el repo ya están los de 2022 y 2023 (en
  `Clubes/Japón/Urawa Reds/`).
- **Para Guido (cierre del 260 en Japón):** caja y deuda 2025 de los 10 clubes quedan sin dato. Lo que se podría sacar, si se decide, es
  el pasivo corriente y no corriente de j_kessan-2025 (no es deuda financiera). Eso es una decisión de criterio, no la tomé.
