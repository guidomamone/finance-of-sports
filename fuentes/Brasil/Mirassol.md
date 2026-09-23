# Mirassol (Mirassol Futebol Clube — no es SAF)

- Club nuevo esta sesión. **No es SAF** todavía (CNPJ de "Mirassol Futebol Clube" común), pero como
  todo club que compite en el Campeonato Paulista está obligado a presentar auditoría contable a la
  Federação Paulista de Futebol. 1 PDF descargado a
  `Clubes/Brasil/Mirassol/relatorio-auditoria-contabil-2024.pdf` — "Relatório de Auditoria Contábil,
  Exercício 2024", firmado por la auditora local Analyst Gestão Empresarial Ltda (no es una big-4, ojo
  al ponderar la solidez de la auditoría), bajado del repositorio institucional de la federación.
- **RESUELTO el 2026-09-22 — la sospecha de que "el mismo repositorio de la federación
  probablemente los tiene" era correcta, y eran muchos más de los esperados.** La Federação Paulista
  expone un índice JSON de todos sus clubes filiados año por año (ver `fuentes/Brasil/
  _notas-generales.md`, sección "La Federação Paulista tiene un índice JSON de TODOS sus clubes,
  2010-2025"). Mirassol figura en **12 ejercicios: 2012-2018 y 2021-2025**; 34 PDFs bajados a
  `Clubes/Brasil/Mirassol/`.
  - **Huecos reales del repositorio, no de la búsqueda**: no hay 2019 ni 2020 (el índice no los
    lista para este club), ni nada anterior a 2012. Queda como ángulo pendiente buscar esos dos
    ejercicios por otro canal (sitio propio del club, prensa local).
  - **El grado de detalle varía muchísimo por año, y eso importa para el onboarding.** 2012 viene
    partido en **11 anexos separados** (con nombres codificados `3293A.pdf` … `3293L.pdf`, donde
    `3293` es el id del club en el padrón de la FPF) — presumiblemente balanço, DRE, DMPL, DFC y
    notas por separado, pero **no se abrió ninguno, esta sesión es sourcing puro**. 2013-2018 son 1
    anexo por año. 2021-2023 son 2 por año (laudo de auditoría + demonstrações contábeis). 2024 son
    3 (balanço patrimonial + DRE + laudo). 2025 son **8** (laudo, BP, DFC, DMPL, DRA, DRE, notas
    explicativas y relatório da administração, cada uno en su archivo).
  - Los archivos de 2012-2016, que en origen tienen nombre codificado, se guardaron como
    `<año>-anexo-<letra>.pdf`; el resto conserva un slug del nombre original con el año adentro.
  - **Antes de cargar cualquier ejercicio anterior a 2021 hay que abrir los anexos y ver qué es
    cada uno** — el nombre de archivo no lo dice.
- Contacto: futebolpaulista.com.br/Repositorio/Institucional/<año>/ — ver nota general al final de
  esta sección sobre este repositorio, que aloja auditorías de muchos clubes paulistas a la vez.
- Último chequeo: 2026-09-22.
- Color de marca: `#EEED05` — tabla por liga de footylogos (Brasileirão A, "Mirassol FC"), 1er
  color, exacto, verificado 2026-09-21. Es el amarillo ACTUAL: el azul y blanco que contesta
  pt.wikipedia fue verdad entre 1964 y 1981.
