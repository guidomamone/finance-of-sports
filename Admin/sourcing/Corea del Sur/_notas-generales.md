# Notas generales — Corea del Sur

## Barrido 2026-09-17: quinto país nuevo de la lista de "30 mejores ligas del mundo" (orden
## alfabético, después de Alemania/Austria/Bélgica/China). DART resultó un canal real tipo
## EDGAR/SEC — el primer hallazgo grande desde Bélgica, con DOS series de 10 ejercicios completas.

**Los 12 clubes de la K League 1 2025** (confirmado vía Wikipedia antes de arrancar): Daegu FC,
Daejeon Hana Citizen, FC Anyang, Gangwon FC, Gimcheon Sangmu, Gwangju FC, Jeju SK (ex Jeju United),
Jeonbuk Hyundai Motors, Pohang Steelers, FC Seoul, Suwon FC, Ulsan HD. (Suwon Samsung Bluewings, que
Guido mencionó como candidato chaebol, fue descendida a K League 2 y por lo tanto NO forma parte de
este barrido — ver nota al final de este archivo.)

## 0. El ángulo que funcionó: DART (`dart.fss.or.kr`), pero buscando la RAZÓN SOCIAL LEGAL de la
## entidad operadora, nunca el nombre público del club

Mismo patrón que Alemania (Unternehmensregister, sección 12 del skill) y Bélgica (Centrale des
bilans, sección 14): toda sociedad coreana (주식회사) sujeta a auditoría externa obligatoria bajo la
Ley de Auditoría Externa de Sociedades (주식회사 등의 외부감사에 관한 법률 — aplica cuando se cruzan 2
de 4 umbrales: activos ≥ 12.000M KRW, pasivo ≥ 7.000M KRW, ingresos ≥ 10.000M KRW, ≥ 100 empleados)
debe depositar su `감사보고서` (informe de auditoría) en DART, sea o no cotizante. Varias filiales de
chaebols que operan clubes de fútbol SÍ cruzan ese umbral y depositan — pero SOLO bajo su razón social
legal, nunca bajo el nombre público del club:

| Club (nombre público) | Razón social en DART | Grupo controlante |
|---|---|---|
| Jeonbuk Hyundai Motors | 전북현대모터스에프씨 주식회사 | Hyundai Motor Company |
| FC Seoul | 주식회사 지에스스포츠 (GS Sports) | GS Group |
| Jeju SK (ex Jeju United) | 제주에스케이에프씨 주식회사 (ex 제주유나이티드에프씨) | SK Group |
| Ulsan HD | 에이치디현대스포츠 주식회사 (HD Hyundai Sports) | HD Hyundai |
| Daejeon Hana Citizen | 대전시티즌 주식회사 (nombre legal sin "하나") | histórico: accionistas locales; hoy: Hana Financial Group |

**Cómo se busca en DART**: el buscador principal (`회사명` en la home) exige coincidencia EXACTA y no
sirve para explorar — hay que abrir el modal "회사명찾기" (`찾기` al lado del campo 회사명), activar
"검색단어 포함" (substring) y "과거이력 포함" (incluye nombres históricos), y ahí sí buscar por
fragmentos. Confirmado con el listado completo: buscar solo "포항" da 75 resultados (ninguno el club),
"울산" da 0 (ni el club ni nada), "제주유나이티드" solo (sin "에프씨") da 0 pero
"제주유나이티드에프씨" completo SÍ matchea — la búsqueda de DART es sensible a tener el sufijo
"에프씨"/"FC" correcto, no basta con el nombre corto.

- **Gotcha de UI real (costó tiempo, no es un bug del portal)**: el modal de búsqueda de compañías
  tiene una condición de carrera notable — si se escribe el texto y se hace click en 검색
  inmediatamente, a veces ejecuta la búsqueda ANTERIOR (texto viejo) en vez de la nueva. La vuelta que
  funcionó de forma confiable: escribir el texto, esperar ~1 segundo (`wait`), RECIÉN ENTONCES
  clickear 검색. Sin esa espera, hubo casos de falsos negativos ("일치하는 회사명이 없습니다" cuando en
  realidad sí había resultados, confirmado reintentando con el wait).
- **`외부감사관련 > 감사보고서/연결감사보고서`** es el filtro de tipo de documento que aísla los
  informes de auditoría del resto de disclosures (기업집단현황공시, transacciones con partes
  relacionadas, etc.) — más rápido manipularlo vía JS (`document.getElementById('publicTypeDetail_F001').checked = true; search(1,'btn');`)
  que clickear los checkboxes a mano, que abren un submenú flotante fácil de perder de vista.
- **Rango de fechas**: el selector rápido "10년" (`setDate(7)` en JS) alcanza para ver la serie
  completa en los 4 clubes con hallazgos — ninguno tiene disclosure más antiguo que 2016.

## 1. Cómo descargar el PDF real (2 pasos con `curl` + cookie jar — el popup nativo está bloqueado)

El botón "다운로드" del visor de DART (`dsaf001/main.do?rcpNo=<rcpNo>`) abre un popup
(`openPdfDownload(rcpNo, dcm_no)`) que el entorno de browsing bloquea. Procedimiento reproducible:

1. Sacar `rcpNo` (de la URL del filing en la lista de resultados) y `dcm_no` (con un `fetch()` a
   `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=<rcpNo>` buscando el patrón
   `openPdfDownload('<rcpNo>','<dcm_no>')` en el HTML devuelto).
2. `curl` en dos pasos, con la MISMA cookie jar para ambos (el primer paso crea una sesión
   `PDFJSESSIONID` que el segundo necesita — sin ella, el segundo paso devuelve `200 OK` pero
   `Content-Length: 0`, una falla silenciosa fácil de confundir con "no hay PDF"):
   ```
   curl -sL -c cookies.txt -b cookies.txt -A "<UA navegador>" \
     -e "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=<rcpNo>" \
     -o /dev/null \
     "https://dart.fss.or.kr/pdf/download/main.do?rcp_no=<rcpNo>&dcm_no=<dcm_no>"

   curl -sL -c cookies.txt -b cookies.txt -A "<UA navegador>" \
     -e "https://dart.fss.or.kr/pdf/download/main.do?rcp_no=<rcpNo>&dcm_no=<dcm_no>" \
     -o "audit-report.pdf" \
     "https://dart.fss.or.kr/pdf/download/pdf.do?rcp_no=<rcpNo>&dcm_no=<dcm_no>"
   ```
3. Los PDF resultantes tienen **capa de texto nativa** (verificado con `pdftotext -layout` en 4
   clubes, ~10 documentos distintos) — CERO necesidad de OCR, a diferencia de Companies House (Reino
   Unido, escaneos) o los PDFs de balances argentinos. El más rápido de procesar de todo el proyecto
   junto con el canal SEC/EDGAR de EE.UU. (sección 10 del skill).

## 2. Resultado por club — 4 de 12 con datos reales, 2 semi-dead-end documentados a fondo, 6
## dead-end estructural (citizen clubs + Gimcheon Sangmu)

- **Con datos reales descargados** (ver cada ficha individual para el detalle completo):
  - **FC Seoul** (지에스스포츠/GS Sports): 10 ejercicios consecutivos, FY2016-2025, sin huecos.
  - **Jeju SK** (제주에스케이에프씨, ex 제주유나이티드에프씨): 10 ejercicios consecutivos,
    FY2016-2025, sin huecos.
  - **Jeonbuk Hyundai Motors** (전북현대모터스에프씨): solo 2 ejercicios, FY2024-2025 — la obligación
    de disclosure público parece haber empezado recién con esos años (no se encontró nada anterior).
  - **Daejeon Hana Citizen** (대전시티즌, legal): 4 ejercicios, FY2016-2019 — un `사업보고서` completo
    (no solo `감사보고서`) por haber sido originalmente un club financiado por oferta pública a pequeña
    escala; la serie se corta justo cuando Hana Financial Group reestructuró el club en 2020.
- **Semi-dead-end, documentado a fondo, candidato a reach-out** (ver ficha individual):
  - **Ulsan HD** (에이치디현대스포츠): la entidad SÍ existe en DART y presenta disclosure de grupo
    designado, pero CERO `감사보고서`/`사업보고서` en 10 años — no se pudo determinar por qué, a
    diferencia de las otras filiales de chaebol que sí depositan.
  - **Pohang Steelers**: ni siquiera aparece la entidad en el registro de DART bajo ningún nombre
    probado, y POSCO Holdings no la desglosa como filial consolidada en su propio `사업보고서`.
- **Dead-end estructural (forma jurídica sin obligación de disclosure mercantil)**: Daegu FC, Gwangju
  FC, FC Anyang, Gangwon FC, Suwon FC (todos "시민구단"/"도민구단", clubes ciudadanos/provinciales sin
  forma de sociedad anónima con accionista chaebol) y Gimcheon Sangmu (사단법인 creado por la ciudad
  de Gimcheon, el ejército solo aporta jugadores — NO es una entidad militar en términos societarios).
  Ver la ficha individual de cada uno.

## 3. Suwon Samsung Bluewings — fuera del scope de este barrido (no está en K League 1 2025), pero
## dato de contexto útil para una sesión futura

Guido mencionó este club como candidato chaebol en el encargo original, pero al confirmar la
composición de la K League 1 2025 (Wikipedia) resultó que Suwon Samsung Bluewings NO forma parte de
la primera división actual — fue descendido a K League 2. Dato de contexto para si se retoma K League
2 más adelante: el club dejó de ser filial directa de **Samsung Electronics** el 1 de abril de 2014,
pasando a **Cheil Worldwide** (제일기획, otra filial del mismo Samsung Group, que SÍ cotiza en KRX)
como matriz operadora — Samsung Electronics pasó de dueño a solo patrocinador. Si se retoma la K
League 2 en el futuro, vale la pena buscar en DART la razón social real de la entidad operadora del
club bajo Cheil Worldwide (no se investigó el nombre legal exacto esta sesión, por estar fuera del
scope de la K League 1).

## Cómo mantener este archivo

Actualizar la tabla de la sección 0 si aparece un club nuevo con hallazgo real, o si alguno de los
2 semi-dead-end (Ulsan HD, Pohang Steelers) se destraba. La sección 3 (Suwon Samsung) es una nota de
contexto para K League 2, no para K League 1 — no hace falta tocarla salvo que se retome esa liga.
