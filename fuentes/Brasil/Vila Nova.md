# Vila Nova (Vila Nova Futebol Clube, Goiânia-GO — associação civil, NO es SAF)

**Ángulos**: sitio oficial: BLOQUEADO (Cloudflare interactivo, curl y Browser pane) pero la noticia 238 (Wayback) linkea el PDF 2021 en Google Drive, descargable · federación/regulador: FGF-GO HIT (2022-2025; paginación p=1..7 revisada, no hay nada anterior) · Wayback CDX: HIT (Joomla viejo 2014-2019 + noticias 2022) · búsqueda web: HIT (halló la noticia 2021) · barrido: 3 (Sonnet) — 2026-10-03

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

## Barrido 2026-10-03 (grupo C Brasil): de 4 a 4 completos + 2015-2017 en piezas sueltas (más 2021 como comparativo del PDF 2022)

- El sitio viejo (`vilanovafc.com.br/transparencia/download/<id>_<hash>`, Joomla) está en Wayback (capturas 2015-2019). Los títulos NO están en el texto del link, sino en la fila anterior de la página de listado (`?start=6/12/18/24`). Bajados a `Clubes/Brasil/Vila Nova/`: `balanco-patrimonial-2015.pdf` + `parecer-auditoria-2015.pdf`, `balanco-patrimonial-2016.pdf` + `parecer-auditoria-2016.pdf`, `balanco-patrimonial-2017.pdf` + `parecer-auditoria-2017.pdf` (1 pp cada uno; el balanço dice "comparativo ao exercício findo", verificado por texto), `notas-explicativas-2014.pdf` (2 pp).
- No hay DRE separada visible en esas piezas; el 2022 de FGF trae 2021 como comparativo. Son piezas sueltas, no paquetes auditados completos.
- Probado sin éxito: `vilanovafc.com.br/transparencia` en el Browser pane ("Just a moment..." interactivo, no se insistió). El repositorio FGF-GO sigue arrancando en 2022 para este club.

## Barrido 3 (2026-10-03, Sonnet): de 4 a 5 ejercicios completos (2021-2025)

- **Nuevo en disco: `demonstrativo-financeiro-2021.pdf`** (27 pp, 18 MB, capa de texto) — "Demonstrações contábeis em 31 de dezembro de 2021 e 2020": relatório dos auditores, balanço, DRE y resultado abrangente, DMPL, DFC, notas. Entidad verificada por el texto ("Vila Nova F.C."). md5 distinto del 2022.
  - Cómo: la búsqueda web dio la noticia `vilanovafc.com.br/noticias/238-demonstracoes-contabeis-vila-nova-2021`; el HTML archivado en Wayback (`web.archive.org/web/2023/<url>`, captura 2022-05-02) linkea `drive.google.com/file/d/12bR4iDn5vD3UlIovTxkkTvyzLiOQigM3`, que baja con `drive.google.com/uc?export=download&id=<id>` sin login. Patrón reusable: el sitio nuevo (2021-2022) publicaba cada documento como noticia con link a Drive.
- Probado sin éxito: FGF-GO `q=11&sc=11&p=1..7` (solo VNFC 2022-2025); listados Joomla `?start=12/18/24` (solo balanços 2014-2017, ya en disco; los ids 54/55 son comunicados, 59/60 son parecer y balanço 2016 duplicados, 26/31 son notas 2014); el listado 2019 solo trae "Movimentação Financeira" mensual de 2019, no balanço 2018/2019. **Faltan 2018-2020** (no hay noticia equivalente a la 238 para esos años; el PDF 2021 trae 2020 como comparativo).
