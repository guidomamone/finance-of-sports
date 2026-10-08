# Vasco da Gama (Vasco da Gama SAF)

**Ángulos**: sitio oficial: BLOQUEADO (media.vasco.com.br: Cloudflare, también desafío interactivo en el Browser pane) · federación/regulador: no aplica · Wayback CDX: HIT (PDFs oficiales mirroreados) · búsqueda web: HIT (crvascodagama.com, netvasco) · barrido: 1 (Sonnet) — 2026-10-03

- **Recuperado esta sesión, con un enfoque distinto al intento anterior.** El dominio oficial
  media.vasco.com.br sigue bloqueado por un challenge de Cloudflare (confirmado de nuevo: 403 con
  `cf-mitigated: challenge` incluso variando el User-Agent), y archive.org/Wayback Machine estuvo
  "Temporarily Offline" / devolviendo 429 durante toda esta sesión así que no sirvió como alternativa.
  Lo que sí funcionó: buscar el mismo PDF **mirrorado en otros dominios** que lo re-publicaron:
  - `demonstracoes-contabeis-2023.pdf` — bajado de www.netvasco.com.br (portal de noticias del club),
    que hostea una copia del PDF oficial "VASCO DA GAMA SAF – DEMONSTRAÇÕES CONTÁBEIS 2023" (82
    páginas) en su propio dominio (`/news/noticias16/arquivos/...`), sin el bloqueo Cloudflare del
    dominio oficial.
  - `dre-balanco-patrimonial-2024.pdf` — bajado de crvascodagama.com (sitio del CRVG, el club
    social/associação, no bloqueado), mirror del "Vasco da Gama SAF DRE e Balanço Patrimonial 2024"
    (no auditado al momento de la publicación, carta abierta del presidente + DRE/balanço).
  - `demonstracoes-financeiras-associacao-crvg-2022.pdf` — bonus, mismo dominio crvascodagama.com:
    balance 2022 de la **associação CRVG** (Club de Regatas Vasco da Gama), entidad distinta de la SAF.
- Pendiente: 2022 de la SAF específicamente (`Vasco-da-Gama-SAF-Demonstracoes-Contabeis-2022.pdf` —
  URL exacta confirmada de nuevo esta sesión, pero sin mirror alternativo encontrado; solo existe en
  el dominio oficial bloqueado). También valdría revisar si ya existe un ejercicio 2025.
- Contacto: netvasco.com.br y vasconoticias.com.br (mirrors de artículos que sí cargan los PDFs de la
  SAF sin el bloqueo Cloudflare); crvascodagama.com (documentos de la associação CRVG); vasco.com.br/transparencia
  y media.vasco.com.br (oficiales, bloqueados por Cloudflare en todos los intentos hasta ahora).
- Último chequeo: 2026-09-12.
- **ONBOARDING (2026-09-24): 1 ejercicio cargado a `data/vascodagama-br-data.js`, NO 2 — hallazgo
  sobre `dre-balanco-patrimonial-2024.pdf`.** Se cargó 2023 (auditado, Grant Thornton, sin
  salvedades). El plan asumía que `dre-balanco-patrimonial-2024.md` eran las demonstrações
  contábeis 2024 de la SAF (no auditadas). Leído completo, el documento entero (Carta do
  Presidente + Carta Administrativa + Balanço Patrimonial + DRE + Mutação do PN + Fluxo de Caixa +
  Comentários Gerais) es en realidad de la **associação CRVG** ("Club de Regatas Vasco da Gama"),
  no de la SAF — la SAF solo aparece ahí como parte relacionada (el CRVG tiene 30% de
  participación en el Vasco SAF, contabilizada por equivalencia patrimonial). No hay Balanço/DRE
  propio de la SAF en ningún punto del archivo. Cargarlo como si fuera la SAF habría sido el mismo
  error que la consigna pedía evitar para `demonstracoes-financeiras-associacao-crvg-2022.md`, solo
  que con el archivo equivocado. **Pendiente real**: reconseguir el PDF "Vasco da Gama SAF DRE e
  Balanço Patrimonial 2024" standalone (no está en crvascodagama.com pese a cómo lo describía esta
  misma nota) o esperar el balance auditado 2025 de la SAF, todavía no localizado para este club.
- **Color de marca: `#000000` (negro)** — Vasco da Gama es negro y blanco EN PARTES IGUALES
  (camisa "meia preta e branca" con la cruz de Malta), sin declaración de predominancia por parte
  del club/liga. Regla de desempate de `club-or-year-onboarding/SKILL.md` sección 3 (bicolor en
  partes iguales, "si el otro color es blanco, gana el que no es blanco"): gana el negro. Hex
  confirmado con 2 fuentes independientes (teamcolorcodes.com, football-logos.cc), ambas listan
  `#000000` para el club. Verificado 2026-09-24.

## Barrido 2026-10-03 (grupo C Brasil): de 1 SAF + 2 asociación a 2 SAF + 9 asociación

**Atención a las dos entidades**: la SAF (Vasco da Gama SAF, CNPJ 47.589.413/0001-17) y la associação CRVG (Club de Regatas Vasco da Gama, dueña del 30% de la SAF) son sujetos distintos; el nombre de archivo lo dice.

- **SAF**: `demonstracoes-contabeis-saf-2022.pdf` (61 pp; Wayback id_ de `media.vasco.com.br/static/2023/04/Vasco-da-Gama-SAF-Demonstracoes-Contabeis-2022.pdf`, el ejercicio de constitución que la nota anterior daba por sin mirror) + el `demonstracoes-contabeis-2023.pdf` ya existente. **SAF 2024: NO conseguido**: la versión no auditada existe en `media.vasco.com.br/static/2025/04/Vasco-da-Gama-SAF-DRE-e-Balanco-Patrimonial-2024.pdf` (403 Cloudflare, sin copia en Wayback ni en netvasco; el artículo de netvasco solo trae un aviso de 4 pp, guardado como `aviso-divulgacao-saf-2024-nao-auditado.pdf`) y la versión completa con parecer iba a salir a fin de junio de 2025 (no ubicada). SAF 2025: no ubicado.
- **Asociación CRVG** (sitio `crvascodagama.com/transparencia-informacoes-financeiras/`, sin bloqueo, y Wayback de `vasco.com.br`/`static.vasco.com.br`/`media.vasco.com.br`): `demonstracoes-financeiras-associacao-crvg-2020.pdf` (69 pp), `-2021.pdf` (75 pp), `-2022.pdf` (ya estaba), `-2023.pdf` (61 pp, `.../2025/05/Demonstracoes-Financeiras-2023-2-Final.pdf`), `-2024.pdf` (4 pp: solo el aviso; el balance 2024 de verdad es el `dre-balanco-patrimonial-2024.pdf` ya existente, md5 idéntico a `Balanco-Patrimonial-2024.pdf`), `balanco-patrimonial-associacao-crvg-2025.pdf` (62 pp, `.../2026/04/Balanco-Patrimonial-2025.pdf`), y de la serie vieja `balanco-associacao-crvg-2018.pdf` (62 pp), `-2012.pdf` (17 pp), `-2013.pdf` (13 pp).
- **Gotcha de Wayback**: las capturas de archivos de más de 1 MiB vienen cortadas exactamente en 1.048.576 bytes y `pdfinfo` no las lee; así quedaron fuera `balanco_2014`, `_2015`, `_2016`, `_2017` (y 2019, no ubicado) de la serie vieja de la asociación (`media.vasco.com.br/media/2020/10/balanco_<año>.pdf`; el host live da Cloudflare, `vasco.com.br/wp-content/...` da 404). Se borraron los truncados.
- También hay en Wayback: balancetes trimestrales 2019-2021 de la asociación, `balanco_2009/2010/2011` en `www.vasco.com.br/site/public/upload/...` (no bajados).
- Probado sin éxito: Browser pane en `media.vasco.com.br` ("Just a moment..." interactivo; no se insistió).

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas ninguna; `wf-src-*`: 1 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
