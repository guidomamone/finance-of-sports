# RB Bragantino (Red Bull Bragantino Futebol Ltda., Bragança Paulista-SP)

- **Caso atípico: NO es SAF ni associação — es una Ltda ("Sociedade Empresária Limitada"), CNPJ
  51.315.976/0001-94** (constituida antes de la Lei 14.193/2021, así que nunca tuvo que convertirse
  a SAF). Publica igual demonstrações financeiras auditadas por BDO en una carpeta propia del
  sitio (`redbullbragantino.com.br/balanco/`), en cumplimiento de la obligación de "sociedade de
  grande porte" (Lei 11.638/2007) — no por ser sociedad anónima ni por mandato de la Lei do SAF.
  **Ojo con el homónimo**: existe también "Bragantino Clube do Pará", un club totalmente distinto
  del norte de Brasil — el PDF descargado confirma explícitamente "Federação Paulista de Futebol"
  en las notas, así que es el Bragantino correcto (São Paulo).
- **2 ejercicios descargados en `Clubes/Brasil/RB Bragantino/`, ambos vía Wayback Machine porque
  el sitio en vivo ya no sirve esos PDFs** (ver gotcha de tooling abajo):
  - `balanco-2019.pdf` — "RED BULL BRAGANTINO — Balanço patrimonial — Em 31 de dezembro de 2019 e
    2018" (el nombre de archivo original en el sitio era `2019.pdf`, pero el contenido es del
    ejercicio 2019 con comparativo 2018). Confirma el club vía la línea "Federação Paulista de
    Futebol" entre las obligaciones. **Gotcha de tooling**: el PDF es "Microsoft: Print To PDF"
    sin fuentes embebidas y sin imágenes (`pdftotext`/`pdffonts`/`pdfimages` devuelven vacío) —
    es texto vectorial (curvas), no texto real ni escaneo de imagen. Para leerlo en el futuro va a
    hacer falta `pdftoppm` + inspección visual o Tesseract sobre el render, igual que un escaneo,
    aunque técnicamente no lo sea.
  - `balanco-2024-auditado-fev2025.pdf` — "RED BULL BRAGANTINO FUTEBOL LTDA. — Balanços
    patrimoniais — Em 31 de dezembro de 2024 e 2023", con capa de texto real (`pdftotext` extrae
    limpio), auditado por BDO RCS Auditores Independentes SS, firmado 11/02/2025.
- **Gotcha de tooling importante — el sitio oficial migró a una SPA que ya no sirve los PDFs
  viejos en vivo**: `redbullbragantino.com.br` (y `.com`) ahora corren en el framework global de
  Red Bull ("consumer-app" con client-side routing) — CUALQUIER ruta, incluida una `.pdf` real que
  Google todavía indexa, devuelve el shell HTML de la SPA (200 OK, `content-type: text/html`) en
  vez del archivo. Los PDFs viejos indexados por Google (`/balanco/2019.pdf`,
  `/balanco/red_bull_bragantino_bdo_rcs_auditores_independentes_ss_sao_paulo_23_de_janeiro_de_2023.pdf`,
  `/balanco/DF_RB_Futebol_-_quadros_.pdf`, `/balanco/Red_Bull_Bragantino_(BDO...11_de_Fevereiro_de_2025).pdf`)
  solo se pudieron recuperar vía la Wayback Machine (CDX API para confirmar el snapshot, después
  `web.archive.org/web/<timestamp>if_/<url>` para bajar el PDF real sin el chrome de Wayback).
  **La CDX API de archive.org devolvió "Internet Archive: Temporarily Offline" de forma
  intermitente y aparentemente por URL específica** (mismo dominio, mismo momento: dos URLs
  fallaron repetidas veces mientras otras dos funcionaron a la primera) — no quedó claro si era
  rate-limiting real (un intento posterior sí devolvió 429 Too Many Requests, confirmando que hay
  throttling) o un problema puntual de esas 2 URLs. Pendiente para una sesión futura con más
  tiempo: reintentar la CDX API, espaciando los requests, para
  `red_bull_bragantino_bdo_rcs_auditores_independentes_ss_sao_paulo_23_de_janeiro_de_2023.pdf`
  (ejercicio 2022, con comparativo 2021 según el título indexado por Google) y
  `DF_RB_Futebol_-_quadros_.pdf` (año sin identificar) — ambos con snapshot probable en Wayback a
  juzgar por el mismo patrón que los otros dos.
- **Nota de contexto de prensa (no confirmada con el propio PDF)**: varios artículos de 2026
  (Portal Tela, Ricardo Antunes, ge.globo) describen que Red Bull Bragantino publicó durante años
  un "balanço simplificado" de 5 páginas SIN parecer de auditoría ni notas explicativas completas,
  y que recién en 2026 (para el ejercicio 2025, todavía no encontrado en PDF esta sesión) alineó
  la divulgación con el estándar completo. El PDF de 2024 bajado esta sesión, sin embargo, ya tiene
  8-9 páginas incluyendo notas explicativas — revisar si el "balanço completo" de 2026 (ejercicio
  2025) es un salto de calidad adicional o si la prensa se refería a años anteriores a 2019.
- Contacto: redbullbragantino.com.br/balanco/<archivo> (ya no sirve en vivo, usar Wayback);
  web.archive.org/web/2*/https://www.redbullbragantino.com.br/balanco/*.
- Último chequeo: 2026-09-16.
