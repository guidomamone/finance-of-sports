# Real Club Deportivo Mallorca, S.A.D.

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
