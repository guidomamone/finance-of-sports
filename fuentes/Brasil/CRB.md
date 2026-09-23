# CRB (Clube de Regatas Brasil, Maceió-AL — asociación civil, CNPJ 12.159.281/0001-09; NO es SAF)

- Club nuevo esta sesión, y **el mejor hallazgo del lote: 7 ejercicios (2019 a 2025) en una sola fuente**.
  No hizo falta la federación estadual ni ningún mirror.
- El portal es `crboficial.com.br/transparencia`, pero los documentos NO viven ahí: cada tarjeta linkea a
  `docs.crboficial.com.br/?dl=<hash32>`, un **Veno File Manager** (subdominio aparte). Ese `?dl=` devuelve
  **HTML, no el PDF** (Content-Type `text/html`, sin `Content-Disposition`), y todos los anchors de la página
  de transparencia dicen literalmente "Consultar PDF" — o sea que ni el `href` ni el texto del link dicen qué
  documento es. El flujo que funcionó, 100% `curl`, sin browser:
  1. `curl` a `/transparencia` → sacar los 21 hashes `?dl=<hash>`.
  2. `curl` a cada `?dl=<hash>` → la página del file manager trae el **nombre real del archivo** (en un
     `<span class="... overflowed">`) y el link de descarga verdadero,
     `download/0/sh/<hash-de-carpeta>/share/<hash-del-archivo>`.
  3. `curl` a ese link → el PDF. El `<hash-de-carpeta>` es distinto por archivo (y se repite entre archivos
     de la misma carpeta), así que no se puede adivinar: hay que resolver los dos pasos.
- **10 PDFs descargados en `Clubes/Brasil/CRB/`**:
  - `balanco-patrimonial-2020.pdf`, `-2021.pdf`, `-2022.pdf`, `-2023.pdf`, `-2024.pdf` — 1 página cada uno,
    apaisada, **escaneada sin capa de texto** (`pdftotext` devuelve vacío). NO son infografías de prensa: son
    el balanço patrimonial + la DRE completos, a dos años comparativos, firmados por presidente y contador
    (verificado renderizando con `pdftoppm`). El de 2020 trae también 2019, así que la serie arranca en 2019.
  - `balanco-patrimonial-2025-corrigido.pdf` — 2 páginas, CON texto, salida directa del sistema contable
    (plan de cuentas hasta el nivel de cada cuenta bancaria); es la versión "corrigida" que el club subió
    aparte.
  - `demonstracoes-contabeis-2024.pdf` (12 pág.) y `demonstracoes-contabeis-2025.pdf` (12 pág.) — el paquete
    completo con relatório dos auditores independentes, balanços, DRE, DMPL, DFC y notas explicativas. Con
    texto real. (En el portal se llaman `Relatorio_dos_Auditores_Independentes_-_2024...pdf` y
    `balanco_patrimonial2025.pdf`; el nombre del archivo NO describe el contenido, se renombraron acá.)
  - `relatorio-auditoria-2022.pdf` (30 pág.) y `relatorio-auditoria-2023.pdf` (31 pág.) — mismo paquete para
    esos años, pero **escaneados** (8 MB cada uno, "Microsoft: Print To PDF", sin capa de texto).
  - Confirmado en el cuerpo de los documentos: "CLUBE DE REGATAS BRASIL — CNPJ 12.159.281/0001-09 — Rua
    Silvério Jorge, 268, Jaraguá, Maceió/AL". Sin riesgo de homónimo.
- Prensa (Tribuna Hoje, Gazetaweb) confirma para 2025: receita bruta R$47,4 M, despesas R$48,7 M, déficit de
  R$1,3 M — cotejable contra el PDF al momento de cargar los datos.
- El portal tiene además `PLAN_EST2025.pdf` (plan estratégico) e `INVESTIMENTOS_2021.pdf`, que no son
  estados contables y no se bajaron.
- Pendiente: ejercicios anteriores a 2019.
- Contacto: crboficial.com.br/transparencia → docs.crboficial.com.br (Veno File Manager, sin login).
- Último chequeo: 2026-09-22.
