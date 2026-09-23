# Vila Nova (Vila Nova Futebol Clube, Goiânia-GO — associação civil, NO es SAF)

- **4 ejercicios auditados consecutivos descargados (2022, 2023, 2024, 2025)**, todos del
  repositorio de la **Federação Goiana de Futebol** (`fgf.esp.br`), no del sitio propio del club.
  CNPJ verificado dentro de los PDFs: **01.669.316/0001-33**, sede Rua 256 n° 354, Setor Leste
  Universitário, Goiânia.
- **El sitio propio del club NO sirve como fuente desde este entorno**: `vilanovafc.com.br/
  transparencia` (y la raíz, y la variante sin `www`) devuelven **HTTP 403 con el interstitial
  "Just a moment..." de Cloudflare** a `curl`, incluso mandando User-Agent de navegador +
  `Accept`/`Accept-Language`/`Sec-Fetch-Mode`/`Upgrade-Insecure-Requests`. WebFetch también da 403.
  No hizo falta pelearse con el bloqueo porque el repositorio de la federación ya tenía todo — si en
  el futuro se quiere una serie más larga que 2022-2025, ahí sí habría que ir con el Browser pane y
  `fetch()+Blob` (el patrón ya documentado para Sport Recife).
- **4 PDFs descargados en `Clubes/Brasil/Vila Nova/`**, cada uno verificado por el texto de sus
  primeras páginas (club + ejercicio):
  - `demonstrativo-financeiro-2022.pdf` (25 pp) — "Demonstrações contábeis em 31 de dezembro de
    2022 e 2021": balanço patrimonial, DRE + resultado abrangente, mutações do patrimônio líquido,
    fluxo de caixa (método indireto), notas explicativas y relatório dos auditores independentes.
  - `demonstrativo-financeiro-2023.pdf` (28 pp) — mismo paquete, ejercicio 2023 y 2022.
  - `demonstrativo-financeiro-2024.pdf` (51 pp) — el más completo: arranca con el ofício de la
    presidencia del club a la FGF (30/04/2025) pidiendo la publicación, y sigue con el "Relatório
    Anual e Demonstrações Financeiras 2024". Firmado digitalmente (ICP-Brasil, MP 2.200-2/2001).
  - `demonstrativo-financeiro-2025.pdf` (60 pp) — "Relatório Anual da Administração e Demonstrações
    Financeiras 2025", con comparativos de 2024 y 2023.
- Prensa (Diário de Goiás, Mais Goiás) reporta para 2025 crecimiento de receita con **déficit de
  R$ 2,8 millones** — cifra de control contra qué verificar al cargar.
- Pendiente: ejercicios anteriores a 2022 (el repositorio de la FGF-GO arranca en 2021 y para Vila
  Nova el primer archivo es el de 2022); revisar el portal propio con Browser pane por si tiene
  serie más profunda o documentos que la federación no publica.
- Contacto: fgf.esp.br/pt/conteudo/?q=11&sc=11 (Institucional → Publicações, con paginación
  `&p=2..7`; PDFs en fgf.esp.br/assets/uploads/<id>.pdf); vilanovafc.com.br/transparencia (403
  Cloudflare vía curl).
- Último chequeo: 2026-09-22.
