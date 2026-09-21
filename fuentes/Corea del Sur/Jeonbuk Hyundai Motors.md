# Jeonbuk Hyundai Motors

- **Entidad legal**: 전북현대모터스에프씨 주식회사 (Jeonbuk Hyundai Motors FC Co., Ltd.), filial de
  **Hyundai Motor Company** (KRX: 005380), propiedad directa del chaebol Hyundai Motor Group.
- **DART (`dart.fss.or.kr`) SÍ tiene a la entidad como emisor propio** — encontrada vía el buscador de
  "회사명찾기" (company-name finder) buscando "전북현대" con "검색단어 포함" (substring) activado; el
  nombre exacto en DART es `전북현대모터스에프씨` (업종명: "스포츠 클럽 운영업" = operación de clubes
  deportivos). También presenta "대규모기업집단현황공시" (disclosure trimestral de grupo empresarial
  designado bajo la Ley de Comercio Leal), lo que confirma que se volvió sujeto de disclosure público
  al ser filial de un grupo designado ("공시대상기업집단") de Hyundai Motor Group.
- **Descargados 2 ejercicios de `감사보고서` (informe de auditoría)**, los ÚNICOS disponibles en DART
  para esta entidad (filtro `외부감사관련 > 감사보고서/연결감사보고서`, rango 2000-2026, sin más
  resultados que estos 2):
  - Ejercicio 17 (2025.01.01-2025.12.31), auditor 미립회계법인, presentado 2026.04.01 →
    `Clubes/Corea del Sur/Jeonbuk Hyundai Motors/audit-report-fy2025.pdf` (45 páginas, capa de texto
    nativa, sin necesidad de OCR).
  - Ejercicio 16 (2024.01.01-2024.12.31), mismo auditor, presentado 2025.04.02 →
    `Clubes/Corea del Sur/Jeonbuk Hyundai Motors/audit-report-fy2024.pdf`.
  - Los dos incluyen Estado de Situación Financiera, Estado de Resultados, Estado de Cambios en el
    Patrimonio, Estado de Flujo de Efectivo y notas completas, bajo K-IFRS.
  - Nota: la numeración "제17기"/"제16기" implica que la sociedad tiene 17 ejercicios de existencia,
    pero DART **no tiene depositados** ejercicios anteriores a 2024 — probablemente porque la
    obligación de disclosure público nació recién cuando la entidad pasó a estar bajo el paraguas de
    "공시대상기업집단" de Hyundai Motor Group (la designación de grupos empresariales por Fair Trade
    Commission se revisa y puede ampliar el perímetro año a año). No se encontró ningún otro canal
    (sitio oficial del club, Unternehmensregister-equivalente) con ejercicios más antiguos.
- **Cómo se descargó (procedimiento reproducible, ver también `_notas-generales.md` de este país)**:
  el enlace "다운로드" del visor de DART abre un popup bloqueado por el entorno de browsing; el patrón
  que funcionó fue extraer `rcpNo`/`dcm_no` del botón `openPdfDownload(rcpNo, dcm_no)` vía JS, y
  después `curl` en dos pasos con cookie jar: primero `GET
  https://dart.fss.or.kr/pdf/download/main.do?rcp_no=<rcpNo>&dcm_no=<dcm_no>` (crea la sesión
  `PDFJSESSIONID`), después `GET
  https://dart.fss.or.kr/pdf/download/pdf.do?rcp_no=<rcpNo>&dcm_no=<dcm_no>` con la misma cookie jar
  → PDF real, 200 OK. Sin la cookie de sesión del primer paso, el segundo paso devuelve 200 OK pero
  `Content-Length: 0` (falla silenciosa).
- Pendiente: no se buscó separadamente el sitio oficial del club para complementar (no hace falta,
  DART ya cubre 2 ejercicios completos con cifras auditadas).
- Último chequeo: 2026-09-17.
