# Guarani (Guarani Futebol Clube — EM RECUPERAÇÃO JUDICIAL, entidad de derecho privado, no es SAF)

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
