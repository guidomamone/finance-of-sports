# Getafe Club de Fútbol, S.A.D.

- **Hit bueno (2026-09-16).** 2 ejercicios descargados a `Clubes/España/Getafe CF/`, encontrados
  navegando `getafecf.com/ley-de-transparencia-sad` con el browser — la página carga con contenido
  real, sección "5. Cuentas anuales e informe de auditoría" con una lista larga de links "Ver Pdf" sin
  etiqueta de temporada visible en el texto del link (solo se pudo inferir la temporada por la fecha
  de subida en la URL, no por contenido — ambos PDF son escaneos sin capa de texto, `pdffonts` no
  encontró ninguna fuente embebida):
  - `cuentas-anuales-informe-auditoria-2024-2025.pdf` (57 págs.) — de la URL con fecha de subida
    2025/11/07 (consistente con depósito de cuentas de un ejercicio cerrado en junio de 2025, unos
    meses después).
  - `cuentas-anuales-informe-auditoria-2023-2024.pdf` (56 págs.) — de la URL con fecha de subida
    2024/11/21.
  - **Ojo**: el propio texto de la página (párrafo de la sección 5) dice textualmente "las últimas
    cuentas anuales depositadas en el Registro Mercantil son las de la temporada 2022/23" — un texto
    desactualizado, porque la lista de links de la misma página SÍ tiene entradas posteriores
    (2023/24, 2024/25 por fecha). No confiar en ese texto para saber cuál es "la más reciente", confiar
    en la fecha de subida real de cada link.
  - Se descartó `https://statics-maker.llt-services.com/get/documents/2026/04/06/...pdf` (el link más
    reciente de la lista): resultó ser un documento de una sola página sobre comisiones a
    agentes/intermediarios (art. 77 bis Reglamento Licencia UEFA), no cuentas anuales.
- Pendiente: ejercicios anteriores a 2023-24.
- Contacto: `getafecf.com/ley-de-transparencia-sad`.
- **CARGADO al sitio (2026-09-22, clubId `getafe-es`).** Los 2 ejercicios confirmaron por contenido
  interno ser 2023/2024 (cierre 30/6/2024) y 2024/2025 (cierre 30/6/2025), sin ambigüedad — la duda
  de "confirmar por OCR el ejercicio exacto" quedó resuelta al transcribir. Los dos PDF vinieron con
  la tabla de la cuenta de pérdidas y ganancias con etiquetas y números en bloques separados (gotcha
  de extracción del escaneo, no del contenido); se reordenó verificando cada subtotal impreso, y los
  2 ejercicios reconciliaron EXACTOS en todos los niveles (Revenue, Expenses, profitOnPlayerSales,
  netInterest, tax, PAT) contra el Estado de Cambios en el Patrimonio Neto. FX: `EUR@2024-06-30` y
  `EUR@2025-06-30` (cierre BCE, ya en `data/currency-map.js`, el documento no declara TC propio).
  Color de marca: `#005999` — Wikipedia en español (azul, "los Azulones") + teamcolorcodes.com,
  verificado 2026-09-22.
- Último chequeo: 2026-09-22.
