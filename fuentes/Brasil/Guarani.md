# Guarani (Guarani Futebol Clube — EM RECUPERAÇÃO JUDICIAL, entidad de derecho privado, no es SAF)

**Ángulos**: sitio oficial: /governanca/ ya revisado antes, sin posts 2020-2023 · federación/regulador: FPF índice JSON 2010-2025 (2016 ausente = no presentó) · Wayback CDX: no hizo falta · búsqueda web: no hizo falta · barrido: 9 ejercicios en disco (2017-2025) (Sonnet) — 2026-10-03

- Guarani está en recuperación judicial (CNPJ MF 46.072.179/0001-93, sede en Campinas-SP) y publica
  sus propias Demonstrações Financeiras en una sección de gobernanza de su sitio oficial:
  `guaranifc.com.br/governanca/demonstracoes-financeiras-<año>/` (la ruta
  `guaranifc.com.br/transparencia/` que aparece indexada en buscadores da 404 — la sección vigente
  es `/governanca/`).
- **2 ejercicios descargados a `Clubes/Brasil/Guarani/`:**
  - `demonstracoes-financeiras-2023-2024.pdf` — exercício 2024 e 2023, vía repositorio de la
    Federação Paulista (`Institucional/2024/Guarani.pdf`). Formato "publicación legal" (recorte de
    página de diario, gazetasp.com.br), pero con capa de texto real. Confirmado explícito "GUARANI
    FUTEBOL CLUBE - EM RECUPERAÇÃO JUDICIAL" en la cabecera.
  - `demonstracoes-financeiras-2024-2025.pdf` — exercício 2025 e 2024, vía sitio oficial
    (`guaranifc.com.br/wp-content/uploads/2026/04/1-RELATORIO-DE-AUDITORIA-COM-AS-DEMONSTRACOES-FINANCEIRAS-GUARANI-2025.pdf`).
    Confirmado en las notas explicativas: "As demonstrações financeiras do Guarani Futebol Clube
    referente ao exercício findo em 31 de dezembro de 2025".
  - `parecer-conselho-fiscal-2025.pdf` — documento complementario (no es el balance en sí, es el
    dictamen del Conselho Fiscal sobre las DFs 2025), bajado de la misma página oficial por si sirve
    de respaldo/cruce en el onboarding.
- **La página `/governanca/demonstracoes-financeiras-2025/` lista 7 documentos** (1. Relatório de
  auditoria con las DFs: descargado; 2. Relatório executivo; 3. Parecer do Conselho Fiscal:
  descargado; 4. Comunicado de atraso; 5. Relatório sobre la recuperação judicial; 6. Anexo del
  mismo; 7. Balancete anual) — solo se bajaron los dos más relevantes para datos financieros, el
  resto queda como pendiente si hiciera falta más detalle narrativo de la recuperación judicial.
- **Intento fallido**: `futebolpaulista.com.br/Repositorio/Institucional/2020/2316-21 Relatório de
  Auditoria - Guarani 2020 ARAGAKI (2).pdf` devolvió un PDF de solo 49 KB, cifrado (`/Encrypt` con
  AESV2) y sin texto extraíble — probablemente un placeholder de error o un documento protegido que
  la federación no sirve completo por este canal. No se insistió más, pero es un lead a retomar
  (ej. probar con un visor real en vez de `curl` directo, por si el cifrado bloquea solo la
  extracción automatizada y no la visualización).
- **La sección `/governanca/` del sitio propio NO tiene posts equivalentes para 2020-2023** (se
  revisó el listado completo de la sección; solo aparecen "Balanço financeiro 2019" —post de 2020,
  sin PDF adjunto encontrado— y "Demonstrações Financeiras – 2025"). Los años intermedios (2020,
  2021, 2022) quedan sin fuente oficial propia confirmada; probar de nuevo el repositorio de la
  federación año por año para esos huecos en una sesión futura.
- Contacto: `guaranifc.com.br/governanca/`; `futebolpaulista.com.br/Repositorio/Institucional/<año>/`.
- Último chequeo: 2026-09-16.
- **Cargado en el sitio (2026-09-25):** 2 ejercicios, `data/guarani-br-data.js` (`clubId`:
  `guarani-br`). 2024 desde `demonstracoes-financeiras-2023-2024.pdf` (Déficit R$412 mil), 2025
  desde `demonstracoes-financeiras-2024-2025.pdf` (Superávit R$8.077 mil). Ver el comentario de
  cabecera del archivo de datos para el detalle completo de categorización, tie-out y grossDebt.
- **Color de marca: `#006C51` (verde) — Team Color Codes (fuente secundaria, confirmando el
  criterio de identidad de Wikipedia en portugués: "cores branca... e verde", camisa verde desde
  1916), verificado 2026-09-25.**

## Barrido 2026-10-03 (objetivo ≥5 ejercicios: CUMPLIDO, 2 → 9)

Fuente: índice JSON FPF (Guarani aparece 2010, 2012-2015, 2017-2025; **2016 ausente en el índice = el club no presentó ese año**).
Verificado por texto/OCR de carátula: "GUARANI FUTEBOL CLUBE" en todos.
- `demonstracoes-financeiras-2020.pdf` — ej. 2020, `Institucional/2020/2316-21 Relatório de Auditoria - Guarani 2020 ARAGAKI (2).pdf`. **Corrige la nota vieja**: hoy baja completo (1,0 MB, 11 pp., cifrado AES con copy:no pero se abre y tiene texto de auditor; el "49 KB" anterior fue un intento fallido). Para transcribir, el cifrado puede estorbar a pdftotext; OCR sirve.
- `demonstracoes-financeiras-2021.pdf` — ej. 2021, `Relatório de Auditoria - Guarani 2021.pdf` (22 pp., con texto).
- `demonstracoes-financeiras-2022.pdf` — ej. 2022, `Balanço Guarani 2022.pdf` (25 pp., con texto, comparativo 2021).
- `demonstracoes-financeiras-2022-2023.pdf` — ej. 2023 (con comparativo 2022), `DEMONSTRAÇÕES 2023 GUARANI ASSINADAS.PDF` (11 pp.). **Gotcha**: con la extensión en mayúscula `.PDF` Cloudflare devuelve el challenge "Just a moment..." (HTTP 200 HTML); cambiando a `.pdf` minúscula baja bien.
- `balancete-2017.pdf`, `balancete-2018.pdf`, `balanco-publicacao-2019.pdf` — ej. 2017, 2018, 2019: escaneos de baja calidad (2 / 5 / 1 págs.; son balancetes/balance de contabilidad, no DFs auditadas completas con notas — la de 2019 es un recorte de publicación). Cuentan como ejercicio en disco, pero sin notas ni auditor; verificar a mano antes de cargar.
Serie en disco: 2017, 2018, 2019, 2020, 2021, 2022, 2023 (2022 y 2023 en archivo propio), 2024, 2025. Sin probar: 2010-2015 (en el índice, jpg/pdf).
