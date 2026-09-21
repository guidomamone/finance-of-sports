# Jeju SK

- **Entidad legal**: 제주에스케이에프씨 주식회사 (Jeju SK FC Co., Ltd.). Filial del grupo **SK**
  (SK Group/SK Energy). El club se llamó "Jeju United FC" (제주유나이티드에프씨) hasta el rebrand a
  "Jeju SK" en la temporada 2025 — confirmado que es la MISMA entidad legal en DART: el informe de
  auditoría de 2016 dice en portada "제주유나이티드에프씨 주식회사" y el de 2025 dice
  "제주에스케이에프씨 주식회사" (mismo número de ejercicio consecutivo, sin discontinuidad).
- **10 ejercicios consecutivos de `감사보고서`, sin ningún hueco (2016-2025)** — junto con FC Seoul,
  el mejor hallazgo del país:
  - Todos descargados a `Clubes/Corea del Sur/Jeju SK/audit-report-fy<año>.pdf`:
    - FY2025: auditor 신한회계법인, presentado 2026.03.30.
    - FY2024: auditor 신한회계법인, presentado 2025.03.28.
    - FY2023: auditor 신한회계법인, presentado 2024.03.29.
    - FY2022: auditor 신한회계법인, presentado 2023.03.28.
    - FY2021: auditor 신한회계법인, presentado 2022.03.28.
    - FY2020: auditor 신한회계법인, presentado 2021.03.30.
    - FY2019: auditor 다산회계법인, presentado 2020.04.01.
    - FY2018: auditor 다산회계법인, presentado 2019.04.03.
    - FY2017: auditor 다산회계법인, presentado 2018.04.04.
    - FY2016: auditor 신한회계법인, presentado 2017.04.06.
  - Todos con capa de texto nativa (verificado en el más viejo y el más nuevo), formato K-IFRS
    estándar completo (situación financiera, resultados, cambios en patrimonio, flujo de efectivo,
    notas, detalle del proceso de auditoría).
- **Cómo se encontró**: el nombre público "Jeju United"/"Jeju SK" no dio resultados directos en el
  buscador de DART; hubo que probar "제주유나이티드에프씨" (nombre completo con sufijo "에프씨") que sí
  matcheó — la búsqueda parcial "제주유나이티드" sola no encontró nada, y "제주" solo tampoco (a
  diferencia de "포항" que sí lista decenas de entidades no relacionadas). Filtro
  `외부감사관련 > 감사보고서/연결감사보고서`, rango 10 años.
- **Cómo se descargaron los 10 PDFs**: mismo procedimiento en dos pasos con `curl` + cookie jar
  (`pdf/download/main.do` primero para crear sesión, después `pdf/download/pdf.do`) documentado en
  `Jeonbuk Hyundai Motors.md` y en `_notas-generales.md` de este país.
- Pendiente: no se buscó el histórico previo a 2016 (no hay más antiguo en DART, coincide con el
  límite que también se ve en FC Seoul — puede ser un límite estructural de cuándo DART empezó a
  exigir/aceptar depósito electrónico de 감사보고서 de sociedades no cotizantes, no una limitación de
  esta sesión).
- Último chequeo: 2026-09-17.
