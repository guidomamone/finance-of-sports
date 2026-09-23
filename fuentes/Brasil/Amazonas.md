# Amazonas (Amazonas Futebol Clube, Manaus-AM — associação civil, NO es SAF)

- **Hallazgo parcial: 2 PDFs con 3 ejercicios (2022, 2023, 2024), pero NO son estados contables
  auditados** — son balanços patrimoniales resumidos, firmados por el presidente del club y por una
  contadora (CRC-AM 013501/O-0), sin relatório de auditor independente, sin notas explicativas y sin
  fluxo de caixa. CNPJ verificado dentro de los PDFs: **34.639.980/0001-99**, R. dos Jasmins 461,
  Aleixo, Manaus.
- **El dominio oficial del club está CAÍDO (no es un bloqueo, es DNS inexistente).**
  `amazonasfc.com.br` no resuelve desde este entorno ni contra `8.8.8.8` — `dig +short` devuelve
  vacío, `curl` da "Could not resolve host". No hay registro A, no es Cloudflare ni un 403.
  `amazonasfc.com` (sin `.br`) sí resuelve pero es un **dominio parkeado**: devuelve 114 bytes con
  `window.location.href="/lander"`. Buscar un dominio nuevo del club no dio nada.
- **La vuelta que funcionó: Wayback Machine.** La página de transparencia quedó archivada
  (`web.archive.org/web/2026/https://amazonasfc.com.br/site/pagina/transparencia/`, snapshot
  22/04/2026) y linkeaba exactamente 2 documentos, los dos recuperables con
  `web.archive.org/web/2025id_/<url original>`:
  - `balanco-patrimonial-2024.pdf` (3 pp) — "BALANÇO EM 31/12/2024", activo/pasivo + índices
    económico-financieros, firmado digitalmente el 04/08/2025 por el Diretor Presidente y la
    contadora.
  - `balancos-2022-2023.pdf` (6 pp) — balanços patrimoniais al 31/12/2022 y al 31/12/2023.
- **Qué NO hay**: ejercicio 2025, ningún relatório de auditoria, ninguna DRE completa con apertura
  de receitas/despesas. Con lo que hay se puede armar el balance (activo/pasivo/patrimônio líquido)
  pero **no un estado de resultados**, así que antes de onboardearlo hay que releer
  `club-data-mapping` y decidir si un club con solo balanço entra en el esquema del sitio.
- **Tercer ángulo probado y descartado: la Federação Amazonense de Futebol (FAF)** —
  `fafamazonas.com.br/site/pagina/transparencia/` existe y publica bastante (balanços 2020-2025,
  DRE, fluxo de caixa, notas explicativas, parecer do conselho fiscal), pero **todo es de la propia
  FAF, no de sus clubes filiados**. A diferencia de la FGF-GO (Goiás) y la FMF-MT (Mato Grosso), la
  FAF **no tiene una sección "Balanço dos Clubes"** — se recorrió el menú completo de la home
  (Campeonatos / Ligas / A Federação / Arbitragem / Estádios / TJD / Súmulas / Multimídia /
  Transparência / Agenda / Credenciamento / Financeiro) y no hay nada equivalente. Ojo: el club y la
  federación usan **el mismo CMS** (rutas `/site/pagina/<slug>/` y
  `/site/arquivos/download/arqeditor/<archivo>.pdf`), lo que hace fácil confundirse de entidad al
  buscar — verificar siempre el CNPJ adentro del PDF.
- Contexto de prensa: Rádio Rio Mar y la Casa Civil del Amazonas documentan que el club (fundado en
  2019) recibió más de R$ 7 millones de dinero público en menos de 5 años, dentro de los R$ 18
  millones que el Gobierno del Amazonas puso en el fútbol profesional — relevante como control y
  como posible línea de "subvenciones" al mapear.
- Pendiente: ejercicio 2025; un documento auditado de cualquier año; confirmar si el club levantó un
  sitio nuevo en otro dominio (reintentar la búsqueda en unos meses). Si aparece, chequear también
  si se convirtió en SAF.
- Contacto: amazonasfc.com.br/site/pagina/transparencia/ (dominio SIN DNS al 2026-09-22, usar
  web.archive.org/web/2026/<esa url>); fafamazonas.com.br/site/pagina/transparencia/ (solo la
  federación, no los clubes).
- Último chequeo: 2026-09-22.
