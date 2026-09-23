# Cuiabá (Cuiabá Esporte Clube – Sociedade Anônima de Futebol, Cuiabá-MT — SAF)

- **4 ejercicios auditados descargados (2022, 2023, 2024, 2025)**, todos del repositorio de la
  **Federação Mato-Grossense de Futebol** (`fmfmt.com.br`), sección "Institucional → Balanço dos
  Clubes". CNPJ verificado dentro de los PDFs: **04.847.144/0001-39**, "CUIABA ESPORTE CLUBE –
  SOCIEDADE ANONIMA DE FUTEBOL", Cuiabá – Mato Grosso.
- **El sitio propio del club no sirvió**: `cuiabaesporteclube.com.br` responde 200 pero es una SPA
  que devuelve HTML sin un solo `<a href>` (todo el contenido lo monta JavaScript), así que no hay
  nada que grepear con `curl`. `cuiabaec.com.br` ni siquiera conecta. No hizo falta el Browser pane
  porque la federación ya tenía la serie completa.
- **URL del repositorio, con el gotcha que costó encontrarlo**: la página es
  `fmfmt.com.br/pt/conteudo/?q=14&sc=11`. **El prefijo `/pt/` es obligatorio**: los `href` del menú
  de la home son relativos (`../conteudo/?q=14&sc=11`) y armar la URL absoluta sin el `/pt/`
  (`fmfmt.com.br/conteudo/?q=14&sc=11`, o con `/index.php`, o con `/site/`) devuelve **404**. Misma
  arquitectura (mismo proveedor de CMS) que `fgf.esp.br` — ver `fuentes/Brasil/_notas-generales.md`.
- **5 PDFs descargados en `Clubes/Brasil/Cuiaba/`**, cada uno verificado abriendo la primera página:
  - `balanco-financeiro-2022.pdf` (24 pp) — balanço patrimonial al 31/12/2022 + relatório do
    auditor independente (**Mazars**). **Es un escaneo con OCR de mala calidad**: `pdftotext`
    devuelve `TUIÂ§A ÊSPORTE CLUBE`, `BALANCO PATRIII|iOHIAL`. Antes de cargar datos de este
    ejercicio hay que re-OCRearlo con el flujo del proyecto (`pdftoppm -png -r 300` +
    `tesseract -l por`, ojo: **portugués, no `spa`**).
  - `demonstracoes-financeiras-2023-auditadas.pdf` (23 pp) — el paquete auditado completo de 2023,
    membrete de **Mazars Auditores Independentes** (Joinville-SC).
  - `balanco-patrimonial-2023.pdf` (2 pp) — el balanço resumido del mismo ejercicio 2023. La
    federación publicó los dos archivos por separado bajo la misma etiqueta "Exercício 2023"; se
    guardaron ambos, no son duplicados.
  - `balanco-financeiro-2024.pdf` (24 pp) — balanço patrimonial al 31/12/2024 (con 31/12/2023 de
    comparativo), notas explicativas y relatório do auditor independente (**BDO**). Capa de texto
    limpia, sin necesidad de OCR.
  - `balanco-financeiro-2025.pdf` (37 pp) — "Relatório do auditor independente / Demonstrações
    contábeis em 31 de dezembro de 2025", BDO (código `5607/26`). El más completo de la serie.
- Contexto: el Cuiabá fue la **2ª SAF brasileña en entrar al mercado de capitales** vía
  "debêntures-fut" (emisión de ~R$ 20 millones, cobertura de ESPN Brasil). Prensa reporta receita
  récord de R$ 157,9 millones en el último balance publicado — cifra de control a verificar contra
  el PDF al cargar. **No cotiza en CVM** (la emisión de debêntures no lo convierte en companhia
  aberta), así que el canal sigue siendo la federación / el club, no `rad.cvm.gov.br`.
- Pendiente: ejercicios anteriores a 2022 (el repositorio de la FMF-MT no los tiene); revisar la SPA
  del sitio oficial con Browser pane por si hay una sección "Transparência"/"SAF" propia con serie
  más profunda.
- Contacto: fmfmt.com.br/pt/conteudo/?q=14&sc=11 ("Balanço dos Clubes"; PDFs en
  fmfmt.com.br/assets/uploads/<id>.pdf); cuiabaesporteclube.com.br (SPA, sin links en el HTML).
- Último chequeo: 2026-09-22.
