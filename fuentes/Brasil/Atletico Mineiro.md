# Atlético Mineiro (Clube Atlético Mineiro SAF, Belo Horizonte-MG — "Galo")

**Ángulos**: sitio oficial: HIT (atletico.com.br/wp-content/uploads, descarga directa; las páginas del portal dan 403 a curl) · federación/regulador: no necesario · Wayback CDX: HIT (lista completa de DEMONSTRACAOFINANCEIRA_<año>) · búsqueda web: confirmó Relatório Integrado 2025 · barrido: 1 (Sonnet) — 2026-10-03

- **Hit confirmado, SAF desde fines de 2023.** El Atlético Mineiro SAF publica "Demonstrações
  contábeis individuais e consolidadas" auditadas en su Portal da Transparência SAF
  (`atletico.com.br/institucional/portal-da-transparencia/portal-da-transparencia-saf/`, con los
  PDFs reales alojados en `atletico.com.br/informacoes-relatorios/`). 3 ejercicios descargados en
  `Clubes/Brasil/Atletico Mineiro/`:
  - `demonstracoes-financeiras-saf-2023.pdf` — "ATLÉTICO MINEIRO S.A.F. — Relatório do auditor
    independente — Demonstrações contábeis individuais e consolidadas — Em 31 de dezembro de
    2023", 66 páginas, confirmado con capa de texto real. Cubre el ejercicio de transición (10
    meses de associação + 2 meses de SAF, según prensa).
  - `demonstracoes-financeiras-saf-2024.pdf` — mismo formato, ejercicio 2024 (nombre de archivo
    original decía "Relatório de Opinião e Gestão", con las demonstrações contábeis incluidas).
  - `relatorio-integrado-saf-2025.pdf` — "Relatório Integrado 2025", formato más amplio
    (financiero + sustentabilidad + gobernanza) que incluye las demonstrações financeiras 2025;
    no separado en un PDF solo-financiero como los años anteriores.
- **Dato relevante para otros clubes brasileños**: el Galo SAF fue el primer club brasileño en
  adoptar IFRS integralmente, y la propia página de transparencia menciona una sección
  "Publicações CVM" — sugiere que podría estar registrado de alguna forma restringida ante la CVM
  (posiblemente por una emisión de debêntures vía Instrução 476, oferta restringida sin
  necesidad de registro pleno como companhia aberta). No se confirmó el detalle exacto esta
  sesión — la búsqueda específica en fuentes de CVM/Migalhas no devolvió el dato. Si una sesión
  futura confirma esto, podría abrir una vía CVM adicional para el Galo (ver también sección 10
  del skill `club-sourcing` sobre el mismo patrón en EE.UU./México).
- Existe también "Instituto Galo" (entidad social separada, no la SAF) con sus propias
  demonstrações financeiras en `institutogalo.com.br` — no cargado esta sesión, sería un
  complemento igual que la associação de Botafogo, no reemplaza a la SAF.
- Contacto: atletico.com.br/informacoes-relatorios/ (PDFs reales); atletico.com.br/institucional/
  portal-da-transparencia/portal-da-transparencia-saf/ (portal).
- **CARGADO (2026-09-24)**: los 3 ejercicios (2023, 2024, 2025) en `data/atleticomineiro-br-data.js`
  (`clubId: 'atleticomineiro-br'`), columna Controladora (la SAF standalone, mismo criterio que
  Botafogo). Ver el comentario de cabecera de ese archivo para la categorización completa, la
  aclaración de que 2023 cubre solo 14/set-31/dic/2023 (no un año completo), y el cambio de
  presidencia confirmado entre 2024 (Bruno Muzzi) y 2025 (Pedro Daniel).
- **Duda de CVM resuelta** (ver el comentario de cabecera de `data/atleticomineiro-br-data.js`): la
  relación con la CVM es por el AVM FII (fundo de investimento imobiliário dueño de la Arena MRV,
  una CONTROLADA, no la SAF) y por una emisión real de debêntures de la propia SAF (60.000
  debêntures de R$1.000 nominal, emitidas 25/09/2024, quirografárias, 3,50% a.a., vencimiento
  25/09/2027) — probablemente bajo oferta restrita (Instrução CVM 476), no confirmado el número
  exacto de instrução en el documento.
- **Color de marca: #000000 (negro)** — Wikipedia en portugués confirma "preto e branco" como
  colores tradicionales ("Alvinegro mineiro"), uniforme titular predominantemente negro; con el otro
  color siendo blanco, gana el que no es blanco (criterio de desempate de
  `club-or-year-onboarding` sección 3). Cruzado con teamcolorcodes.com (#000000). Verificado
  2026-09-24.
- Último chequeo: 2026-09-24.

## Barrido 2026-10-03 (grupo C Brasil): de 3 a 9 ejercicios en disco (2017-2022 asociación + 2023-2025 SAF)

El Wayback CDX de `atletico.com.br` reveló los PDFs de la asociación (**Clube Atlético Mineiro**, anterior a la SAF); todos bajan con `curl` directo desde `atletico.com.br/wp-content/uploads/...` (los listados HTML del portal dan 403 a curl, los archivos no). En `Clubes/Brasil/Atletico Mineiro/`:
- `demonstracoes-financeiras-cam-2022.pdf` (67 pp, `.../2023/04/Relatorio-do-auditor-com-as-DFS-CAM-2022.pdf`), `-2021.pdf` (70 pp), `-2020.pdf` (44 pp), `-2019.pdf` (34 pp), `-2018.pdf` (23 pp, "31 de dezembro de 2018 e 2017"), `-2017.pdf` (24 pp, escaneo; carátula verificada: "Clube Atlético Mineiro, Demonstrações Contábeis em 31 de Dezembro de 2017").
- **Ojo**: son de la asociación CAM, sujeto distinto de la SAF (2023-2025, ya existentes). El 2023 SAF cubre solo desde la constitución; el ejercicio 2023 de la asociación no se ubicó (la asociación sigue como accionista).
- Existen más, no bajados: `DEMONSTRACAOFINANCEIRA_2011/2012/2013/2014/2015/2016` (en `atletico.com.br/wp-content/uploads/2022/05/` y `transparencia.atletico.com.br/documents/demonstracoes/`), `Balanço-CAM-2014`, relatórios de gestão 2018-2020.
