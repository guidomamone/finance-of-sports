# Avaí (Avaí Futebol Clube, Florianópolis-SC — associação civil EN RECUPERAÇÃO JUDICIAL, NO es SAF)

- **5 ejercicios consecutivos descargados (2021 a 2025)** del propio sitio del club, que tiene la
  sección de transparencia más prolija encontrada en este barrido: `avai.com.br/clube/
  transparencia/`, HTML plano, links directos a `avai.com.br/wp-content/uploads/...`, `curl` con
  User-Agent de navegador alcanza, sin Cloudflare. CNPJ 77.910.230/0001-12.
- **Además de los anuales, la página publica demonstrações TRIMESTRALES** (1T/2T/3T/4T) desde 2022
  hasta 2026, más el parecer del Conselho Fiscal de cada ejercicio y un "Relatório de Gestão"
  narrativo. No se bajaron los trimestrales (el proyecto trabaja con ejercicios anuales), pero están
  ahí si alguna vez hacen falta.
- **7 PDFs descargados en `Clubes/Brasil/Avai/`**, cada uno verificado por el texto de su primera
  página:
  - `demonstracoes-contabeis-2021.pdf` (27 pp) — "Exercício findo em 31 de dezembro de 2021",
    paquete completo. Y `relatorio-auditores-2021.pdf` (4 pp) — el dictamen suelto, que la página
    publica aparte. **Ojo: es una ABSTENÇÃO DE OPINIÃO** ("Fomos contratados para examinar..."), no
    una opinión limpia — hay que decidir explícitamente si un ejercicio con abstención se carga.
  - `demonstracoes-contabeis-2022.pdf` (53 pp) — "Demonstrações Financeiras 2022 e parecer do
    conselho", incluye el Relatório de Gestão completo (O CLUBE / SEDE / HISTÓRIA / RESUMO
    FINANCEIRO / RECEITAS...). **Sin capa de texto útil**: `pdftotext` devuelve 3.884 caracteres en
    53 páginas, y casi todos son el sello `DocuSign Envelope ID: DA89D957-...` repetido. Hay que
    OCRearlo (`pdftoppm -png -r 300` + `tesseract -l por`) antes de extraer números.
  - `demonstracoes-contabeis-2023.pdf` (32 pp) — "Relatório das Demonstrações Financeiras em 31 de
    dezembro de 2023 e 2022". Capa de texto real.
  - `demonstracoes-contabeis-2024.pdf` (52 pp) — **"AVAÍ FUTEBOL CLUBE EM RECUPERAÇÃO JUDICIAL"**,
    ejercicio 2024 y 2023. Y `relatorio-auditores-2024.pdf` (4 pp), el dictamen suelto de **BDO**
    (oficina de Florianópolis).
  - `demonstracoes-contabeis-2025.pdf` (48 pp) — "Relatório das Demonstrações Contábeis Anuais,
    exercícios findos em 31 de dezembro de 2025 e 2024", con **opinião com ressalva** del auditor y
    menciones a la conversión a **SAF** (Sociedade Anônima do Futebol) — o sea que a partir de 2026
    el perímetro puede cambiar; verificar antes de cargar ejercicios futuros.
- **Dato de contexto que NO hay que perder al mapear: el club está en recuperação judicial** desde
  2023 (proceso n° 5031675-75.2023.8.24.0023, Florianópolis). Eso explica los "Relatórios Mensais de
  Atividades" del administrador judicial que aparecen en búsqueda (`licksassociados.com.br`,
  `ajud-mm.s3.amazonaws.com`) — son documentos del proceso, no estados contables, y no se
  descargaron. También explica la abstención/ressalva de los auditores y cambia cómo hay que leer el
  pasivo (deuda concursal vs. corriente).
- **URL vieja que ya no sirve**: `avai.com.br/novo/patrimonio/balanco-patrimonial/` (la que aparece
  todavía en resultados de búsqueda) devuelve **404**; la sección viva es `avai.com.br/clube/
  transparencia/`. Ejemplo más del patrón ya conocido en Brasil: el dead-end suele ser una URL que
  se movió, no una falta de publicación.
- Pendiente: ejercicios anteriores a 2021 (la página de transparencia arranca ahí); demonstrações
  trimestrales si se quiere detalle intra-anual; OCR del PDF de 2022.
- Contacto: avai.com.br/clube/transparencia/ (PDFs en avai.com.br/wp-content/uploads/<año>/<mes>/).
- Último chequeo: 2026-09-22.
