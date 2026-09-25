# Vasco da Gama (Vasco da Gama SAF)

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
