# J.League — 公益社団法人日本プロサッカーリーグ (`jp-j1`)

**Ángulos**: sitio oficial: agotado (aboutj.jleague.jp solo publica notas de prensa del cierre, sin estados ni informe) · regulador/país:
agotado (koeki-info.go.jp: balance, resultados e informe del auditor) · barrido: 1 (Opus, sesión) — 2026-10-18

- Canal: el portal del gobierno para entidades de interés público, **koeki-info.go.jp** (sirve para cualquier 公益法人 japonés, que es
  también la forma jurídica de la JFA y de otras federaciones). Sin login ni captcha:
  1. `https://www.koeki-info.go.jp/pictis-info/csa0001!show` → nombre → 一覧表示 → 詳細 → código de entidad (J.League: **A010752**).
  2. Pestaña 事業報告等の閲覧 (`vca0001!show`): "公益法人の公表情報" (lo presentado desde el 1-4-2025; antes, "公開情報"), 追加 → código
     → elegir 110 貸借対照表, 120 損益計算書, 135 監査報告（及び会計監査報告）, fechas de presentación en era Reiwa (令和7 = 2025) → 請求資料を閲覧.
  3. Los links bajan por POST a `/pictis-info/vcb0001!download` con el token del formulario, `sourceMapDownload` y `seqNumber` (atributos
     `data-*` del link). Con `fetch()` + Blob + `<a download>` desde la consola; el navegador deja pasar **una descarga por vez**.
- Ejercicio 2025 (enero-diciembre), presentado el 2026-03-30 → `Ligas/Japón/J.League/` (balance 10 págs. y resultados 9 págs.
  digitales; informe de 4 págs. escaneado: informe de los 監事 y del auditor). Auditor: 太陽有限責任監査法人 (Grant Thornton Taiyo),
  opinión limpia (適正に表示); el ejercicio 2024 lo auditó otra firma (前任監査人), también con opinión limpia.
- Desde 2026 el cierre pasa al 30 de junio (semestre de transición enero-junio de 2026, nota de prensa `kessan/kessan-2026.pdf`).
