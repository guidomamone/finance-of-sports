# FC Seoul

- **Entidad legal**: 주식회사 지에스스포츠 (GS Sports Co., Ltd.), filial 100% de **GS Sports** /
  **GS Group** (el holding cotiza en KRX como GS Holdings, 078930). El club NO aparece en DART bajo
  ningún nombre que contenga "서울" ni "에프씨서울" — hay que buscar por la razón social legal
  ("지에스스포츠"), no por el nombre público del club, mismo patrón que Alemania (sección 12 del
  skill) y Bélgica (sección 14).
- **El mejor hallazgo de todo el barrido de Corea del Sur — serie ININTERRUMPIDA de 10 ejercicios**:
  DART tiene `감사보고서` (informe de auditoría) para los ejercicios 13 a 22 (2016-2025), sin ningún
  hueco, comparable a Club Brugge (Bélgica) o RB Leipzig (Alemania) en profundidad relativa (aunque
  ahí llegan a 30+ años, acá 2016 parece ser el primer ejercicio con disclosure — no se encontró
  ningún ejercicio anterior en DART).
  - Todos descargados a `Clubes/Corea del Sur/FC Seoul/audit-report-fy<año>.pdf` (2016 a 2025):
    - FY2025 (제22기): auditor 삼일회계법인, presentado 2026.03.30, 57 páginas.
    - FY2024 (제21기): auditor 안진회계법인, presentado 2025.03.31.
    - FY2023 (제20기): auditor 안진회계법인, presentado 2024.03.29.
    - FY2022 (제19기): auditor 안진회계법인, presentado 2023.03.30.
    - FY2021 (제18기): auditor 삼정회계법인, presentado 2022.03.30.
    - FY2020 (제17기): auditor 삼정회계법인, presentado 2021.03.31.
    - FY2019 (제16기): auditor 삼정회계법인, presentado 2020.03.31.
    - FY2018 (제15기): auditor 삼일회계법인, presentado 2019.04.08.
    - FY2017 (제14기): auditor 삼일회계법인, presentado 2018.04.09.
    - FY2016 (제13기): auditor 삼일회계법인, presentado 2017.03.31, 42 páginas.
  - Todos con capa de texto nativa (verificado con `pdftotext -layout` en el más viejo y el más
    nuevo), formato K-IFRS estándar: Estado de Situación Financiera, Estado de Resultados, Estado de
    Cambios en el Patrimonio, Estado de Flujo de Efectivo, notas completas y sección de
    "외부감사 실시내용" (detalle del proceso de auditoría).
- **Cómo se encontró**: buscador "회사명찾기" de DART, substring "지에스스포츠" (nombre real de la
  sociedad, no "에프씨서울" ni "서울"), confirmado por 업종명 "스포츠 클럽 운영업". Filtro
  `외부감사관련 > 감사보고서/연결감사보고서`, rango 10 años (`setDate(7)` vía la función JS del sitio,
  ver `_notas-generales.md`).
- **Cómo se descargaron los 10 PDFs**: mismo procedimiento en dos pasos con `curl` + cookie jar que
  Jeonbuk Hyundai Motors (ver ese archivo o `_notas-generales.md` de este país) — se automatizó en un
  loop bash con los 10 pares `rcpNo`/`dcm_no` obtenidos vía `fetch()` a cada `dsaf001/main.do?rcpNo=`
  para extraer el `dcm_no` del botón `openPdfDownload()`.
- Pendiente: no se buscó el histórico previo a 2016 (no hay más antiguo en DART); no se revisó el
  sitio oficial del club por una posible serie más profunda tipo "Transparencia" (no hace falta con
  10 años ya cubiertos).
- Último chequeo: 2026-09-17.
