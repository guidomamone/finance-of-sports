# Corinthians (Sport Club Corinthians Paulista — sociedade civil sem fins econômicos, no es SAF)

- **Segundo mejor hallazgo de la sesión 2026-09-16**: Corinthians publica en su propio sitio una
  página de transparencia con serie anual completa 2019-2025, más balancetes mensuales. Página
  oficial: `corinthians.com.br/clube/transparencia/demonstracoes-financeiras-e-balancetes-patrimoniais`.
  No es SAF — sigue siendo sociedade civil (hay pedido de RCE, Regime Centralizado de Execuções,
  para organizar deudas civiles, según nota de continuidad operacional del propio documento 2024).
  **Ojo con las URLs de este sitio**: los PDFs se sirven desde `static.corinthians.com.br/content/...`
  con un query string `?rand=...` que cambia; no asumir que la URL es estable entre sesiones, hay
  que volver a visitar la página de transparencia y extraer los links vigentes.
- **8 ejercicios descargados a `Clubes/Brasil/Corinthians/`, casi todos vía la fuente oficial
  (corinthians.com.br), serie 2016-2025 con un solo salto (2017-2018):**
  - `balanco-2016-2017.pdf` — exercício 2017 e 2016 (único documento de esta sesión que NO vino del
    sitio propio: `futebolpaulista.com.br/Repositorio/Institucional/2017/SCCP 2017 -
    Corinthians-10-04-2018.pdf`, no se encontró mirror en corinthians.com.br para este año).
  - `demonstracoes-financeiras-2018-2019.pdf` — exercício 2019 (con referencias a 2018), vía sitio
    propio.
  - `demonstracoes-financeiras-2019-2020.pdf` — exercício 2020 e 2019, vía sitio propio.
  - `demonstracoes-financeiras-2020-2021.pdf` — exercício 2021 e 2020, vía sitio propio (mismo
    archivo, confirmado por tamaño idéntico, que el mirror de la federación en
    `Institucional/2021/450-2022-7 - Sport Club Corinthians Paulista (relatorio dos auditores -
    31-12-21).pdf`).
  - `demonstracoes-financeiras-2021-2022.pdf` — exercício 2022 e 2021, vía sitio propio. Formato
    "publicación legal" (layout tipo página de diario, con la nota de Arena Corinthians y Estádio),
    igual al de años posteriores.
  - `demonstracoes-financeiras-2022-2023.pdf` — exercício 2023 e 2022, vía sitio propio (mismo
    archivo que el mirror de la federación en `Institucional/2023/1099-2024-7 Sport Club
    Corinthians Paulista 31.12.23 (PDF ass).pdf` — confirmado por diff casi idéntico del texto).
  - `demonstracoes-financeiras-2023-2024.pdf` — exercício 2024 e 2023, vía sitio propio. Formato
    "publicación legal" (layout de diario O Estado de S. Paulo, con OCR ruidoso en la portada por
    ser scan de recorte de diario, pero el cuerpo del documento tiene capa de texto real).
  - `demonstracoes-financeiras-2024-2025.pdf` — exercício 2025 e 2024, vía sitio propio (el más
    reciente, "O CAMPEÃO DOS CAMPEÕES 2025" en la portada; incluye cuadro de evolución patrimonial
    con saldos 2023-2025). También espejado en la federación como
    `Institucional/2025/Demonstrações Financeiras - Sport Club Corinthians Paulista - Federação
    Paulista.pdf` (no descargado por duplicado, ya se tiene la versión oficial).
- **Nota de continuidad operacional (relevante para `dudas-por-club.md`/interpretación futura)**:
  el documento de 2024 menciona explícitamente que el Clube "está adotando medidas estratégicas para
  assegurar sua continuidade" y un "pedido de RCE (Regime centralizado de execuções) para organizar
  suas dívidas cíveis" — señal de estrés financiero real, no solo retórica de auditor.
- Pendiente: 2018 standalone (solo se tiene como comparativo dentro del documento de 2019).
- Contacto: `corinthians.com.br/clube/transparencia/demonstracoes-financeiras-e-balancetes-patrimoniais`;
  `futebolpaulista.com.br/Repositorio/Institucional/<año>/` (mirror de la federación, usado solo
  para 2017).
- **Cargado al sitio (sesión 2026-09-24)**: 2 ejercicios, `clubId` `corinthians-br`, en
  `data/corinthians-br-data.js` — 2024 (de `demonstracoes-financeiras-2023-2024.pdf`, déficit real de
  R$181.766 mil, DRE auditada segmentada en Futebol/Clube social) y 2025 (de
  `demonstracoes-financeiras-2024-2025.pdf`, prejuízo real de R$143.441 mil, DRE ya consolidada en un
  solo cuerpo — ver comentario de cabecera del archivo de datos para el detalle completo de
  categorización, tipo de cambio y verificación de tie-out). Gestión: Augusto Melo (2024, hasta su
  afastamento) / Osmar Stábile (2025, interino desde 28/05, efectivado 25/08).
- **Color de marca**: `#000000` (negro) — Corinthians es "Alvinegro" (negro y blanco, confirmado por
  el propio apodo en pt.wikipedia.org), mismo criterio ya usado para Botafogo/Atlético Mineiro/
  Operário Ferroviário (otros clubes negro-y-blanco ya cargados en el sitio), verificado 2026-09-24.
- Último chequeo: 2026-09-24.
