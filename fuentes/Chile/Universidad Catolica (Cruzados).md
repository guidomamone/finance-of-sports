# Universidad Católica (Cruzados S.A.D.P.)

- **Hit fuerte, ampliado a la serie completa (2026-09-12).** 17 ejercicios anuales reales (2009 a
  2025, sin ningún año faltante) + 1 memoria narrativa descargados a
  `Clubes/Chile/Universidad Catolica (Cruzados)/`: `estados-financieros-2009.pdf` a
  `estados-financieros-2025.pdf` (todos "Estados Financieros Consolidados" al 31/12, con informe de
  auditor, estado de situación financiera, resultados, cambios en patrimonio y flujo de efectivo) y
  `memoria-anual-2023.pdf` (memoria narrativa, sin estados contables propios, complementaria al EEFF
  2023). Fuente distinta a la CMF esta vez: cruzados.cl/inversionistas/ directamente. Al entrar a la
  pestaña "Estados Financieros" del sitio (clic real sobre el ícono, con las cookies aceptadas)
  aparece un listado paginado (4 páginas) con un PDF por trimestre desde 2009 hasta hoy, cada uno con
  URL estática predecible bajo `cruzados.cl/wp-content/uploads/...` — no hace falta repetir el
  mecanismo `auth`/`send` de la CMF para este club, el propio sitio del club aloja copias directas de
  sus envíos. El ejercicio 2009 es un escaneo sin capa de texto (pdftotext no extrae nada) — va a
  necesitar OCR en el onboarding (ver criterio de Tesseract en `club-data-mapping/SKILL.md` sección
  15); el resto (2010-2025) tiene texto nativo.
- Pendiente: nada del rango 2009-2025, la serie está completa. Solo falta el cierre anual 2026 (aún
  no ocurre — recién hay Estados Financieros a marzo 2026 disponibles) y memorias narrativas de años
  sueltos (no prioritario, no traen estados contables propios).
- Contacto: cruzados.cl/inversionistas/ (sección IR propia — para reproducir el listado completo hay
  que hacer clic en el ícono "Estados Financieros" del menú de pestañas, no alcanza con navegar
  directo a la URL con hash `#estados-financieros`; también lista Memorias 2009-2025 e Informes de
  Gestión 2011-2025); ficha CMF
  cmfchile.cl/institucional/mercados/entidad.php?mercado=V&rut=76072469&tipoentidad=RVEMI.
- Último chequeo: 2026-09-12.
- **CARGADO al sitio (2026-09-25).** Ejercicios 2024, 2023 y 2022 onboardeados en
  `data/catolica-cl-data.js` (clubId `catolica-cl`, con sufijo de país porque hay una Universidad
  Católica de Ecuador sourceándose en paralelo). Los 3 ejercicios cierran exacto contra sus propios
  documentos (revenue/expenses/PAT, ver comentario de cabecera del archivo de datos). `sourceId` por
  año: `catolica-cl-estados-financieros-2024`, `catolica-cl-estados-financieros-2023`,
  `catolica-cl-estados-financieros-2022`. Tipo de cambio: dólar observado SII de cierre (`fx`
  literal, `fxSource:'market_approx'`, el documento no declara uno propio). Quedan sin cargar:
  2009-2021 y 2025 (fuera de alcance de esta sesión), y `memoria-anual-2023.pdf` (sin estados
  contables propios). Dos preguntas abiertas quedaron en `Admin/dudas-por-club.md` (sección
  Universidad Católica): el origen de "Ingresos por Derechos de TV" separado de "Ingresos por
  A.N.F.P.", y qué compone "Gastos de Operación" (Nota 20), que no tiene desglose disponible en el
  documento.

