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

