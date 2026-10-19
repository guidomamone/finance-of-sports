# Super League (Grecia) — ΣΟΥΠΕΡΛΙΓΚ ΕΝΑ ΕΛΛΑΔΑΣ Σ.Π.Ε., ΓΕΜΗ 7012801000 (`gr-superleague`)

**Ángulos**: regulador/país: agotado (ΓΕΜΗ, `publicity.businessportal.gr`) · sitio oficial: `slgr.gr` da 403 al fetch automático, no intentado con navegador ·
barrido: 1 (Sonnet y Claude, sesión Finanzas 4) — 2026-10-19

- Entidad: ΣΟΥΠΕΡΛΙΓΚ ΕΝΑ ΕΛΛΑΔΑΣ ΣΥΝΕΤΑΙΡΙΣΜΟΣ ΠΕΡΙΟΡΙΣΜΕΝΗΣ ΕΥΘΥΝΗΣ (cooperativa de responsabilidad limitada de los clubes de la Super League 1), ΓΕΜΗ 7012801000,
  ΑΦΜ 998826421. El autocompletado del ΓΕΜΗ no la encuentra buscando "SUPER LEAGUE" ni "ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΠΟΔΟΣΦΑΙΡΙΚΗ ΛΙΓΚΑ": aparece con "ΣΟΥΠΕΡ ΛΙΓΚ"
  (`curl https://publicity.businessportal.gr/api/autocomplete/<término>`).
- Canal: la ficha `https://publicity.businessportal.gr/company/7012801000`, acordeón "Οικονομικές καταστάσεις" (hay que abrirlo en el navegador: no hay una API
  de listado accesible por curl). Descarga: `/api/download/financial/<id>?companyId=007012801000`. Ids: 2024-25 `2539504` (las 2539505 y 2539506 son re-subidas
  con prefijo de fecha), 2023-24 `2386837`, 2022-23 `1701442`, 2021-22 `1699593`, 2020-21 `2391838`.
- Cierre 30 de junio. Bajado: estados financieros 2024-25 (48 páginas, escaneo) →
  `Ligas/Grecia/Super League/super-league-grecia-estados-financieros-2024-25.pdf`, con su `.md` (Tesseract ell+eng; págs. 15 y 17 contra la imagen).
- Auditor: PKF ΕΥΡΩΕΛΕΓΚΤΙΚΗ Α.Ε. (Ανδρέας Διαμαντόπουλος, 06-03-2026). **Opinión con reserva**: ejercicios fiscales 2020-2025 sin revisar y sin previsión,
  y una previsión de deterioro de ~2,13 M € no hecha en ejercicios anteriores.
- Falta: la Super League 2 la organiza otra cooperativa (no se buscó); el PDF de 2025 también tiene el acta de la asamblea (id 2539503).
- Último chequeo: 2026-10-19.
