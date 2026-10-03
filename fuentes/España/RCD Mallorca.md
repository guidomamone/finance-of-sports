# Real Club Deportivo Mallorca, S.A.D.

**Ángulos**: sitio oficial: agotado (CMS LaLiga statics-maker, 34 PDFs) · Wayback CDX: parcial — el barrido del dominio viejo rcdmallorca.es dio 0 resultados el 2026-10-03 PERO archive.org estaba "Temporarily Offline", no es evidencia · búsqueda web: no intentado · regulador/país: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Hit bueno (2026-09-16).** 1 ejercicio real descargado a `Clubes/España/RCD Mallorca/`, encontrado
  navegando `rcdmallorca.es/en/ley-de-transparencia` con el browser (la página SÍ carga con contenido
  en el HTML, no es de las bloqueadas):
  - `cuentas-anuales-informe-gestion-2024-2025.pdf` (75 págs.) — link etiquetado explícitamente
    "I- Cuentas anuales e informe de gestión de la temporada 2024-25" en la propia página. Host
    `statics-maker.llt-services.com/mll/...` (mismo CMS compartido que Girona/Getafe/Elche/etc., ver
    `_notas-generales.md`).
  - **Ojo, probable escaneo**: `pdftotext`/`pdffonts` solo devuelven fragmentos sueltos tipo "DM"/"RC"
    (aparenta ser texto de marca de agua o cabecera vectorial superpuesta a páginas que son imagen) —
    a confirmar con OCR antes de mapear, no asumir que el documento tiene capa de texto completa.
- La propia página menciona que el depósito en el Registro Mercantil de las cuentas 2021/22 fue el
  26/01/2023 — sugiere que el club sí deposita regularmente, solo que el resto de ejercicios (2021-22,
  2022-23, 2023-24) no tienen link directo visible en la página actual, solo el más reciente
  (2024-25) y documentos de presupuesto/punto de equilibrio/ingresos-gastos relevantes de 2021-22 y
  2022-23 sueltos (no son las cuentas anuales completas, son anexos parciales del INFUT).
- Pendiente: ejercicios 2019-20 a 2023-24 (buscar si hay URLs análogas de años anteriores en el mismo
  host `statics-maker.llt-services.com/mll/documents/<año>/...`, no explorado sistemáticamente esta
  sesión).
- Contacto: `rcdmallorca.es/en/ley-de-transparencia`.
- Último chequeo: 2026-09-16.

## Cargado a Finanzas (2026-09-25)

- Ejercicio 2024/25 cargado en `data/rcdmallorca-es-data.js` (`clubId: 'rcdmallorca-es'`), a partir
  de la transcripción confirmada como escaneo con OCR (ver arriba): el PDF SÍ resultó tener el
  contenido completo, transcripto en `Clubes/España/RCD Mallorca/
  cuentas-anuales-informe-gestion-2024-2025.md`. La Cuenta de Pérdidas y Ganancias venía con las
  etiquetas de fila separadas de sus números por el OCR — reconciliado exacto contra la Nota 31.1
  "Cifra de negocios por categoría de actividades" y el resto de subtotales impresos (ver
  comentario de cabecera del archivo de datos para el detalle completo).
- Color de marca: `#E20613` (rojo) — Wikipedia en español confirma rojo como color predominante de
  la camiseta (negro es secundario, en pantalón/medias desde 1933), hex verificado en
  teamcolorcodes.com/rcd-mallorca-colors/ (PANTONE 2035 C), verificado 2026-09-25.
- Pendiente sigue igual: ejercicios 2019-20 a 2023-24.

## Sourcing España/Francia (2026-10-03)

Del CMS (`statics-maker.llt-services.com/mll/documents/`) se bajaron los informes de auditoría (José Fco. Balle Cerdá) + cuentas de **2021-22** (63 págs., 2023/04/21), **2022-23** (70 págs., 2024/04/29) y **2023-24** (70 págs., 2025/04/08); el 2024-25 (75 págs., 2026/04/10) ya estaba. → **4 ejercicios**. Falta uno: 2020-21 o anterior. Pista: el dominio viejo `rcdmallorca.es` tuvo `informe_auditoria_cuentas_anuales_13-14.pdf` y `/rcdmallorca/wp-content/uploads/2015/07/informe-auditoria-cuentas-anuales-13-14.pdf` (ejercicio 2013-14, listado por Wayback) — reintentar el barrido cuando archive.org vuelva.

PDFs guardados en `Clubes/España/RCD Mallorca/` (no se transcribieron ni se cargaron al sitio). Último chequeo: 2026-10-03.
