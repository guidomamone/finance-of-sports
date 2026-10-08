# Cruzeiro (Cruzeiro Esporte Clube SAF)

**Ángulos**: sitio oficial: HIT (bucket S3, 2022-2025) · federación/regulador: FMF no publica · Wayback CDX: HIT (2018, 2019 de la asociación en cms.cruzeiro.com.br) · búsqueda web: no necesaria · barrido: 1 (Sonnet) — 2026-10-03

- **Ahora completo 2022-2025.** Esta sesión se agregaron `informativo-financeiro-2022.pdf` y
  `informativo-financeiro-2023.pdf` a `Clubes/Brasil/Cruzeiro/`, encontrados en el mismo bucket S3
  del club adivinando el patrón de nombre de archivo (`[3.1.1] Informativo Financeiro 2022.pdf`,
  `[3.1.2] ... 2023.pdf`, siguiendo la numeración de los ya conocidos `[3.1.3] 2024` / `[3.1.4] 2025`)
  — el listado del bucket sigue bloqueado (`AccessDenied`) pero las URLs individuales sí responden.
  El PDF de 2022 está encriptado (permite imprimir/copiar, no editar) y el de 2023 no.
- Pendiente: nada evidente — 2022, 2023, 2024, 2025 los cuatro descargados y verificados (contienen
  balanço patrimonial, DRE y notas explicativas reales).
- Contacto: cruzeiro-website-project-documents.s3.us-east-1.amazonaws.com/Documentos+obrigatórios+SITE/FINANCEIRO/
  (mismo bucket, patrón de nombre `[3.1.N] Informativo Financeiro <año>.pdf`).
- Último chequeo: 2026-09-12.
- Color de marca: `#2F529E` — tabla por liga de footylogos (Brasileirão A), 1er color, exacto,
  verificado 2026-09-21.

## Barrido 2026-10-03 (grupo C Brasil): de 4 a 6 ejercicios en disco (2018, 2019, 2022-2025)

- Del Wayback CDX de `cruzeiro.com.br` (ejercicios previos a la SAF, **Cruzeiro Esporte Clube asociación**): `demonstracoes-financeiras-2019.pdf` (46 pp, "31 de dezembro de 2019 e 2018", `cms.cruzeiro.com.br/ckfinder/userfiles/files/cruzeiro_df2019_auditor.pdf`), `demonstracoes-financeiras-2018.pdf` (40 pp, escaneo; carátula verificada "Cruzeiro Esporte Clube — 31 de dezembro de 2018 e de 2017", `.../Balanco_2018.pdf`), `demonstracoes-financeiras-2017-2018.pdf` (3 pp, publicación en diario oficial del 26/04/2019, solo balanços).
- Los hosts live `cms.cruzeiro.com.br`/`cruzeiro.com.br/ckfinder/...` ya no sirven (dan error/HTML); solo Wayback. Capturas sin truncar.
- Hueco 2020-2021 (asociación, año de la transición a SAF): no aparece en el CDX. También hay `2007-2009` balanços patrimoniais (no bajados) y `DF2023_CECSAF_Final.pdf` (versión alternativa de 2023).
- Cuidado: los S3 `[3.1.N] Informativo Financeiro <año>.pdf` con N distinto de 1-4 dan 403 (inexistentes).

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas ninguna; `wf-src-*`: 1 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
