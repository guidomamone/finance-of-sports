# Club Atlético Osasuna

- **Forma jurídica distinta a la mayoría de esta lista**: Osasuna NO es S.A.D., es un club tradicional
  de socios (inscrito en el Registro de Asociaciones Deportivas del Instituto Navarro de Deporte y
  Juventud del Gobierno de Navarra, nº 492) — mismo patrón que Athletic Club y Real Sociedad. A
  diferencia de Real Sociedad, Osasuna SÍ publica documentación económica pública en una sección
  propia de "Transparencia" (`osasuna.es/en/transparency`, con las 5 secciones típicas del INFUT:
  A-E, más una sección extra "OTRA INFORMACIÓN DE INTERÉS" con enlaces directos a PDF).
- **Hit bueno (2026-09-16).** 3 PDFs reales descargados a `Clubes/España/CA Osasuna/` desde
  `osasuna.es/public/Attachment/...` (host propio, sin bloqueo, `curl` directo funciona):
  - `auditoria2024.pdf` (71 págs., **escaneado sin capa de texto** — confirmado con `pdffonts`, cero
    fuentes embebidas). Bajo la etiqueta de página "Informe de Auditoría a 30 de junio de 2024" en la
    sección de auditorías del sitio — sería el ejercicio 2023-24, pero **sin confirmar por texto
    interno** porque el PDF no tiene capa extraíble; a re-chequear con OCR antes de citarlo con
    precisión en una sesión de mapeo.
  - `auditoria2022.pdf` (52 págs.) — **atención, el nombre del archivo puede ser engañoso**: el inicio
    del documento (numerado internamente desde la página 149) dice "MEMORIA OFICIAL 2021-2022", que
    parece ser un anuario institucional (historia, dimensión deportiva/social/económica), no
    necesariamente el informe de auditoría + cuentas anuales en sí — a verificar completo antes de
    usarlo, puede ser solo un fragmento de un documento más grande.
  - `auditoria_intermedios2022.pdf` (45 págs., también escaneado sin capa de texto) — la página lo
    etiqueta como "Informe de Auditoría a 31 de diciembre de 2022", lo que sugiere que Osasuna hizo (o
    está haciendo) una transición de ejercicio económico de julio-junio a año calendario, con este
    informe cubriendo el período intermedio de transición (jul-dic 2022) — sin confirmar, ver duda
    abajo.
- **Duda genuina, candidata a `dudas-por-club.md`**: la página de transparencia lista informes de
  auditoría "a 30 de junio de 2022/2023/2024" (fiscal year jul-jun, como las S.A.D.) PERO un artículo
  de prensa de la propia web del club (`osasuna.es/en/noticia151`) dice "Osasuna cierra sus cuentas a
  31 de diciembre de 2025" (año calendario). No se pudo determinar con confianza en esta sesión si el
  club cambió su ejercicio económico de jul-jun a ene-dic en algún punto entre 2022 y 2025, y si es
  así, qué período exacto cubre cada PDF de esta lista (¿se salteó un semestre, se solapan, o el
  "intermedios2022" es justamente el stub de transición?). Antes de mapear cualquier ejercicio de
  Osasuna, confirmar esto — posiblemente valga la pena escribirle directo al club.
- Pendiente: la sección "MEMORIAS ANUALES" del sitio (títulos vistos en el `get_page_text` pero sin
  link de descarga confirmado en esta sesión — puede necesitar expandir un acordeón con clicks reales
  en vez de `find`) y la sección "C) TRANSPARENCIA ECONÓMICO-FINANCIERA" (no explorada a fondo, puede
  tener más PDFs bajo links genéricos "Descargar" no identificados por texto en esta sesión).
- Contacto: `osasuna.es/en/transparency`.
- Último chequeo: 2026-09-16.
