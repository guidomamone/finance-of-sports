# Alianza Lima (Club Alianza Lima)

- **CARGADO al sitio: los 6 ejercicios (2019-2024), `data/alianzalima-pe-data.js`.** Tie-out exacto
  contra el propio Estado de resultados integrales de cada EEFF (Ingresos, Gastos y Resultado
  operativo/neto, los 6 años) — verificado con un script Node aparte además de a mano, y en el
  navegador (Formato del club y Formato simplificado, moneda nativa y USD).
  - 2019, 2020 y 2021 tienen categorización FINA (cada sub-ítem de las Notas "Otros ingresos
    deportivos"/"Gastos deportivos"/"Gastos administrativos" promovido a su propia
    `normalizedCategory`: cuotas de socios, taquilla, TV, transferencias, academias, etc.).
  - 2022, 2023 y 2024: la transcripción disponible (`estado-financiero-<año>.md`) SOLO cubre los 4
    estados principales, no llegó a las Notas de desglose — así que "Otros ingresos"/"Costos
    deportivos" quedan como una sola línea sin categorizar (`lump_football_operations`/
    `lump_football_operations_expense`, mismo criterio que usa River para su "Fútbol Profesional").
    **PENDIENTE para una sesión futura**: re-OCRear las páginas de Notas de esos 3 PDF (deberían
    tener Notas equivalentes a las 14-16 de 2019-2021) para completar la categorización fina.
  - `fx`: 2019-2021 usan el tipo de cambio que el propio EEFF declara (Nota "Riesgo de tipo de
    cambio", promedio SBS compra/venta); 2022-2024 no tienen esa Nota transcripta, usan cotizaciones
    de mercado nuevas en `FX_CLOSE` (`data/currency-map.js`: `PEN@2022-12-31` interbancario BCRP del
    30/12, `PEN@2023-12-31` y `PEN@2024-12-31` tipo de cambio contable SBS).
  - `grossDebt` 2023: el EEFF 2023 no separa "Deuda concursal" en su propio Estado de situación
    financiera (aparece mezclada en "Otras cuentas por pagar") — se usó el valor que sí declara la
    comparativa "2023" del EEFF 2024, más desglosada.
  - Color de marca: `#192745` (azul oscuro/navy) — Wikipedia (infobox: "Azul oscuro, blanco y rojo",
    el oscuro nombrado primero) + logotyp.us ("navy and white") + hex tomado de los archivos de logo
    en Wikimedia Commons. Verificado 2026-09-25.
  - Duda abierta sobre la Nota "Gastos deportivos: Servicios" (categorizada como
    `match_organisation_expense` a falta de más desglose) en `Admin/dudas-por-club.md`.
- **Hit fuerte, ahora con 6 ejercicios consecutivos (2019-2024).** A los 2 ya encontrados
  (`estado-financiero-2019.pdf`, `estado-financiero-2022.pdf`) se sumaron en esta sesión
  `estado-financiero-2020.pdf`, `estado-financiero-2021.pdf`, `estado-financiero-2023.pdf` y
  `estado-financiero-2024.pdf`, todos en `Clubes/Perú/Alianza Lima/` — mismo tipo de documento
  ("Estados Financieros"/"Estado de Situación Financiera" auditado bajo NIA), bajados de la misma
  carpeta de transparencia (clubalianzalima.com.pe/static/media/uploads/transparencia/), pero OJO:
  el patrón de nombre de archivo NO es uniforme entre años — hubo que probar varias variantes por
  fuerza bruta (`estado_financiero_2023.pdf`, `estados_financieros_2024.pdf`,
  `club_alianza_lima_-_eeff_2020.pdf`, `club_alianza_lima_-_eeff_2021.pdf`, todos con guion bajo,
  no guion medio, y con/sin plural) hasta encontrar la URL real de cada año — no hay un índice de
  carpeta navegable, se resolvió por búsqueda web de fragmentos de URL + prueba directa con curl.
- Pendiente: 2025 (ejercicio recién cerrando, probable que aún no esté publicado). Si se retoma,
  probar variantes similares de nombre de archivo para ese año en la misma carpeta.
- Contacto: clubalianzalima.com.pe (sección Transparencia).
- Último chequeo: 2026-09-12.

