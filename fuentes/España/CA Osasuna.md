# Club Atlético Osasuna

**Ángulos**: sitio oficial: parcial — 2022-23 solo como memoria no financiera · Wayback CDX: agotado (osasuna.es/public/Attachment 136 PDFs) · búsqueda web: no intentado · regulador/país: no aplica (club de socios, sección Transparencia) · barrido: 2 (Sonnet) — 2026-10-03

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
- **Duda PARCIALMENTE resuelta (sesión 2026-09-22)**: se confirmó leyendo el texto interno de
  `auditoria2022.pdf` y `auditoria2024.pdf` (ambos SÍ tienen capa de texto real, a diferencia de lo que
  decía esta nota — "escaneado sin capa de texto" era la premisa vencida) que los DOS cubren ejercicio
  jul-jun: "del 1 de julio de 2021 al 30 de junio de 2022" y "del 1 de julio de 2023 al 30 de junio de
  2024" respectivamente, literal en la carátula. Lo que SIGUE sin confirmar es si el club cambió a año
  calendario DESPUÉS de 2024 (el artículo `osasuna.es/en/noticia151` sobre el cierre a 31/12/2025 puede
  ser real para un ejercicio de TRANSICIÓN posterior a los 2 cargados acá, no una contradicción) — no
  bloquea la carga de 2022/2024, pero si se carga un ejercicio 2025+ de Osasuna en el futuro, confirmar
  el período exacto antes de asumir jul-jun.
- Pendiente: la sección "MEMORIAS ANUALES" del sitio (títulos vistos en el `get_page_text` pero sin
  link de descarga confirmado en esta sesión — puede necesitar expandir un acordeón con clicks reales
  en vez de `find`) y la sección "C) TRANSPARENCIA ECONÓMICO-FINANCIERA" (no explorada a fondo, puede
  tener más PDFs bajo links genéricos "Descargar" no identificados por texto en esta sesión).
- Contacto: `osasuna.es/en/transparency`.
- **CARGADO al sitio (sesión 2026-09-22, Ejercicios 2021/2022 y 2023/2024)**: ver
  `data/osasuna-es-data.js`. El ejercicio 2021/2022 tuvo varias cifras de la Nota 16.1 con coma en vez
  de punto de miles por un error de OCR/extracción (ej. "541,994" en vez de "541.994") — corregidas
  verificando que la fila cerrara exacta contra el total impreso de esa nota. El ejercicio 2023/2024
  desglosa ingresos/gastos con sub-letras directo en la Cuenta de Pérdidas y Ganancias, mucho más fino
  que 2021/2022. Los 2 años llevan `es-laliga` (Primera División sin descenso). Verificado con `node`:
  cierra exacto (2023/24) y con ruido de redondeo de 1-2 EUR sobre decenas de millones (2021/22).
  Color de marca: `#D91A21` (rojo, "Los Rojillos") — teamcolorcodes.com, verificado 2026-09-22.
- Último chequeo: 2026-09-22.

## Sourcing España/Francia (2026-10-03)

Del CDN `osasuna.es/public/Attachment/` se bajaron: `cuentas2022.pdf` (= **Informe económico 2021-22**, 31 págs.), `cuentas2024.pdf` (**Informe económico 2023-24 + presupuesto 24-25**, 26 págs.), `auditoria-2024-2025.pdf` (informe de auditoría al 30-6-25, 101 págs.), `informe-economico-2024-2025-presupuesto-2025-26.pdf` (30 págs.) y las memorias oficiales `memoria2022.pdf` (2021-22), `memoria2023.pdf` (resultó ser el informe NO financiero 2022-23) y `memoria2024.pdf`. Ejercicios con material financiero: 2021-22, 2023-24, 2024-25 (+ 2022-23 solo no financiero) → **3 financieros, 4 con la memoria**. Falta el informe económico/auditoría de 2022-23.

PDFs guardados en `Clubes/España/CA Osasuna/` (no se transcribieron ni se cargaron al sitio). Último chequeo: 2026-10-03.
