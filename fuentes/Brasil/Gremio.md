# Grêmio (Grêmio Foot-Ball Porto Alegrense — no es SAF)

**Ángulos**: sitio oficial: HIT (gremio.net/documentos/<archivo>.pdf baja con curl aunque la página /documentos/ da 403) · federación/regulador: no aplica · Wayback CDX: HIT (lista de todos los archivos de /documentos/) · búsqueda web: HIT parcial (descubrió nombres de 2022 y 2019) · barrido: 1 (Sonnet) — 2026-10-03

- Club nuevo esta sesión, agregado a pedido explícito de la consigna ("puede no ser SAF pero
  revisar"). **No es SAF**, es associação tradicional, pero publica demonstrações contábeis auditadas
  por Baker Tilly Brasil. 1 PDF comparativo descargado a
  `Clubes/Brasil/Gremio/demonstracoes-contabeis-2023-2024.pdf` — "Demonstrações contábeis dos
  exercícios findos em 31 de dezembro de 2024 e de 2023", bajado directo de gremio.net/documentos/.
- Pendiente: años anteriores a 2023 — no buscado en profundidad esta sesión.
- Contacto: gremio.net/documentos/ (patrón de archivo `DF_Gremio_FBPA_<año>_Publicacao.pdf`).
- Último chequeo: 2026-09-12.
- Color de marca: `#0D80BF` — tabla por liga de footylogos (Brasileirão A), 1er color, exacto,
  verificado 2026-09-21.

## Barrido 2026-10-03 (sourcing Brasil grupo B) — de 1 (comparativo 2023-24) a 8 ejercicios en disco

- `gremio.net/documentos/` y `gremio.net/governanca/documentos` dan **403 (también en el Browser pane)**, pero los PDF individuales bajan con curl 200. El nombre de archivo no es
  predecible (`DF_Gremio_FBPA_2024_Publicacao.pdf` solo vale para 2024; 2023 y 2025 dan 404). Lo que lo resolvió: **Wayback CDX `gremio.net/documentos/*`**
  (lista todo el directorio) y bajar el nombre exacto del sitio vivo; para `GFBPA_-_DFs_20201.pdf` (ya 404 en vivo) se usó la captura `20210319105747id_`.
- Bajados a `Clubes/Brasil/Gremio/`: `demonstracoes-financeiras-2022.pdf` (30 pp, "2022 e 2021", `GFBPA_-_Demonstracoes_Financeiras_2022.pdf`),
  `-2021.pdf` (34 pp, `129_dc_2021_f2_assinado.pdf`, 31/12/2021), `-2020.pdf` (46 pp completos con relatório da administração y auditor, Wayback de `GFBPA_-_DFs_20201.pdf`),
  `-2019.pdf` (32 pp, `GFBPA-DF2019.pdf`, 31/12/2019), `-2018-publicacao-resumida.pdf` (3 pp, balanços 2018 y 2017, `DF-Gremio-FBPA-2019-espelhado_v5.pdf`),
  `-2017-publicacao-resumida.pdf` (2 pp, 2017 y 2016, `DF-Gremio-FBPA-2018.pdf`). Las "publicação resumida" son las de Diário Oficial: balanço + DRE + notas breves.
- Más para atrás en el mismo directorio, no bajado: `DF-2016-Gremio-Publicacao1.pdf` (2016/2015), `Demo-contabil-2009..2014-GFPA.pdf`, balancetes trimestrales 2015-2022, orçamentos.
- **Falta**: ejercicio 2025 standalone (prensa: auditoría Baker Tilly, dívida R$935 mi, marzo 2026) — el PDF no aparece indexado; ángulo pendiente: leerlo desde una sesión con navegador real que pase el 403 de `/documentos/` o desde `conselho.gremio.net`. 2023 existe dentro del comparativo ya en disco.
- Ejercicios en disco ahora: 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2024-2025; `wf-src-*`: 0 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
