# Ferroviária (Associação Ferroviária de Esportes / Ferroviária S.A.F., Araraquara-SP)

- Club nuevo esta sesión (Série B 2025). **Ojo con el perímetro societario, es el punto más
  delicado de este club**: la associação (AFE, fundada 1950) y la sociedad **Ferroviária Futebol
  S.A.** conviven. La sociedad NO nació con la Lei do SAF: los balances de la Federação Paulista de
  2016 ya dicen "FERROVIÁRIA FUTEBOL S/A" (confirmado por OCR de la página 1 de
  `balanco-2016.pdf`). La transformación formal en SAF se aprobó en la AGE del 21/06/2022, y a
  partir de ahí el nombre en los documentos es **Ferroviária S.A.F.** (CNPJ 06.020.811/0001-30).
  El PDF de 2021 todavía dice "Ferroviária Futebol S.A.". Antes de cargar datos, decidir
  explícitamente qué entidad se publica y chequear si los ejercicios viejos (2010-2018, publicados
  por la federación) son de la S.A. o de la associação — varios son escaneos sin capa de texto y
  no se pudo verificar en esta sesión sin OCR completo.
- **24 PDFs descargados a `Clubes/Brasil/Ferroviaria/`, de DOS fuentes oficiales complementarias:**
  - **Sitio propio, `ferroviariasaf.com/documentacao/`** (sección "Documentos" del menú "CLUBE",
    WordPress con links planos, baja con `curl` sin bloqueo):
    `demonstracoes-financeiras-2025.pdf` y `-2024.pdf` (29 págs. cada uno, "Ferroviária S.A.F. —
    Demonstrações financeiras em 31 de dezembro de 20XX e relatório dos auditores independentes",
    firmados por ZapSign), `demonstracoes-financeiras-2021.pdf` (31 págs., "Ferroviária Futebol
    S.A."), y los anexos sueltos de 2022 y 2023 (`balanco-2022.pdf`, `dre-2022.pdf`,
    `dlpa-2022.pdf`, `balancete-2022.pdf`, `relatorio-dos-auditores-2022.pdf`, `balanco-2023.pdf`,
    `dre-2023.pdf`). Los de 2022/2023 son salidas del sistema contable ("Empresa: FERROVIARIA
    S.A.F. — C.N.P.J.: 06.020.811/0001-30 — CONSOLIDADO — Balanço encerrado em 31/12/20XX"), no
    el paquete auditado completo.
  - **Repositorio de la Federação Paulista**: `demonstracoes-financeiras-2023-fpf.pdf` (31 págs.,
    Docusign, ESTE SÍ es el paquete auditado completo de 2023 — mucho mejor que los dos anexos
    sueltos del sitio del club), más la serie vieja `balanco-2010`, `balanco-2012`,
    `balanco-2013-a/-b`, `balanco-2014-a/-b`, `balanco-2015-a/-b`, `balanco-2016`, `balanco-2017` +
    `dre-2017`, `balanco-2018` + `dre-2018`.
  - **Los nombres de archivo del repositorio de la FPF no se adivinaron**: salieron del handler
    JSON `https://www.futebolpaulista.com.br/Handlers/Institucional/ListaFinanca.ashx?periodoSelecionado=<año>`
    (ver `Novorizontino.md` y `_notas-generales.md` para el procedimiento completo — hay que
    llamarlo con `fetch()` desde el Browser pane, `curl` da 403).
- **Qué NO funcionó, para no repetirlo**: `ferroviaria.com.br` y `ferroviariasa.com.br` no
  resuelven (conexión fallida, HTTP 000) — el dominio vivo es `ferroviariasaf.com`. Una `WebSearch`
  con `site:futebolpaulista.com.br "Ferroviária" auditoria` no devolvió ningún PDF del club
  (el índice de la FPF es el que resuelve esto, no el buscador). El link del sitio propio a
  `Demonstrações-Financeiras-...-exercício-de-2020-Ferroviária-S.A..pdf` (subido en 2021/10) está
  roto: devuelve 404 aunque el `<a href>` siga en la página, tanto con la URL cruda como
  percent-encodeada — el ejercicio 2020 queda pendiente.
- Pendiente: ejercicio 2020 (link muerto en el sitio del club, ver arriba); ejercicios 2011 y 2019
  (el repositorio de la FPF tiene esos años para otros clubes — 2011 confirmado con Ituano — pero
  no hay ninguna presentación bajo el `idClube` 4564 de Ferroviária en ninguno de los dos, así que
  es el club el que no presentó, no un hueco del repositorio); confirmar por OCR si los balances
  2010-2018 del repositorio de la FPF son de la S.A. o de la associação; conseguir el paquete
  auditado completo de 2022 (hoy solo están los anexos sueltos + el relatório de auditores).
- Contacto: https://ferroviariasaf.com/documentacao/;
  https://www.futebolpaulista.com.br/A-Federacao/Financas.aspx;
  https://futebolpaulista.com.br/Repositorio/Institucional/<año>/<archivo>.pdf;
  ouvidoria@ferroviariasaf.com.
- Último chequeo: 2026-09-22.
