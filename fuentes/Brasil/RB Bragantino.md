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
- **CARGADO (sesión 2026-09-24): 2 ejercicios al sitio, `data/rbbragantino-br-data.js`, clubId
  `rbbragantino-br`** — 2019 (balanco-2019.pdf, gotcha de tooling: PDF vectorial sin capa de texto,
  Balanço patrimonial reconstruido cruzando subtotales, ver comentario de cabecera del archivo de
  datos) y 2024 (balanco-2024-auditado-fev2025.pdf, BDO, texto nativo limpio pero transcripción sin
  Notas explicativas). Los 2 años CIERRAN EXACTO (revenue+expenses+netInterest+tax = PAT impreso,
  dígito por dígito) contra la DRE de cada documento. `Receita Líquida` cargada como
  `lump_football_operations` (la fuente no desglosa ingresos en ningún nivel disponible). FX: 2024
  usa `BRL@2024-12-31` (6,1923, ya en FX_CLOSE); 2019 usa `BRL@2019-12-31` (4,0307, PTAX venda de
  cierre BCB, investigado vía API Olinda esta sesión — TODAVÍA PENDIENTE de agregar a
  `data/currency-map.js` FX_CLOSE).
- **Color de marca: `null`** (investigado 2026-09-24). Colores de origen (1928): preto e branco. Tras
  el rebrand Red Bull (2019/2020), el kit HOME actual (infobox pt.wikipedia, plantilla Info/Clube de
  futebol: `corpo1=FFFFFF`, `calções1=FF0000`, `meias1=FFFFFF`) es camiseta BLANCA con acento rojo
  solo en el short — mismo caso "camiseta blanca con acento fuerte" que River/Vélez/Sevilla/Real
  Madrid/Valencia/Once Caldas (`club-or-year-onboarding` sección 3): blanco domina la prenda
  principal, no se fuerza un hex.
- **Duda genuina para `Admin/dudas-por-club.md`**: "Custo do departamento de futebol" (la línea de
  gasto más grande, 66-73% del total según el año) probablemente mezcla sueldos del plantel con
  amortización de derechos federativos de atletas (la Demonstração dos fluxos de caixa 2024 muestra
  "Depreciação e amortização" 110,770 M BRL como ajuste no-caja y "Aquisição de direitos federativos
  de atletas" -114,046 M BRL como capex, señal de que el club capitaliza y amortiza pases) — sin las
  Notas explicativas (no transcriptas, ver arriba) no se pudo separar, se cargó todo a `wages_squad`.
  Si en el futuro se consigue/transcribe el PDF completo con Notas, revisar este split.
- Último chequeo: 2026-09-24.
