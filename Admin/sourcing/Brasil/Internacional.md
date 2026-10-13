# Internacional (Sport Club Internacional, Porto Alegre-RS)

- **Segundo mejor hallazgo de la sesión — serie completa 2007-2025, 19 ejercicios consecutivos.**
  Internacional (associação, no SAF) publica "Balanços e Pareceres de Auditores Independentes" en
  su Portal da Transparência (`internacional.com.br/transparencia/informativos-financeiros/
  balancos-pareceres-auditores-independentes`), con URLs estáticas predecibles
  (`static.internacional.com.br/cms/assets/ra_<año>_<hash>.pdf`) para cada año desde 2007. Los 19
  PDFs están en `Clubes/Brasil/Internacional/relatorio-anual-<año>.pdf` (2007 a 2025).
- **Contenido confirmado por texto**: el de 2025 dice "SPORT CLUB INTERNACIONAL — Relatório do
  auditor independente — Demonstrações contábeis — Em 31 de dezembro de 2025", con índice
  completo (Relatório da Administração, parecer del auditor, balanços patrimoniais, DRE,
  resultado abrangente, mutações do patrimônio líquido, fluxos de caixa, notas explicativas) —
  paquete auditado completo, no un resumen. Todos con capa de texto real, sin necesitar OCR.
- Es la serie histórica más larga de todo el barrido de Brasil hasta ahora (empata en profundidad
  con las mejores series de otros países del proyecto, ej. Chile).
- Sin gotchas de navegación: los links son estáticos y no requieren clicks reales para
  materializarse (a diferencia de la CMF chilena o el SIIS colombiano).
- Contacto: internacional.com.br/transparencia/informativos-financeiros/
  balancos-pareceres-auditores-independentes.
- Último chequeo: 2026-09-16.

## Cargado (2026-09-24)

- 2 ejercicios onboardeados: 2024 y 2025 (`data/internacional-br-data.js`, clubId `internacional-br`).
  Fuente: "Relatório do auditor independente — Demonstrações contábeis" de cada año (texto nativo,
  transcripción completa en `Clubes/Brasil/Internacional/relatorio-anual-{2024,2025}.md`).
- Color de marca: `#E5050F` (rojo) — Wikipédia en portugués confirma vermelho e branco
  ("colorados") con el rojo predominante desde la inversión de colores de la década de 1950; el hex
  sale de teamcolorcodes.com ("S.C. Internacional Color Codes"), cae en la familia identificada por
  Wikipédia. No se pudo confirmar un `theme-color` del sitio oficial (SPA sin contenido legible por
  curl sin JS).
- Gestión: Alessandro Pires Barcellos, reelecto 9/12/2023 para el trienio 2024-2025-2026, presidió
  ambos ejercicios completos. Confirmado por prensa (ESPN Brasil, CNN Brasil, Rádio Itatiaia).
- Dudas genuinas sin resolver (para `Admin/dudas-por-club.md`, a cargo del agente que orquestó esta
  sesión, no de este archivo):
  1. 'Realização da cessão por direito de exploração' (19,539 M BRL en 2024, 19,518 M en 2025,
     cargada como `other_income`): el Balanço explica que es la amortización de un pasivo por un
     contrato de 2012 (construcción/operación del Complexo Beira-Rio con la SPE Holding Beira Rio
     S.A.), pero no queda claro por qué esa amortización genera un INGRESO en la DRE en vez de
     reducir un activo. Vale la pena preguntarle al club la naturaleza contable exacta de esa línea.
  2. 'Estacionamento' (Nota "Receita líquida das atividades", cargada como `other_income` por
     criterio conservador — no nombra el estadio explícitamente): es probable que sea estacionamiento
     del Beira-Rio en día de partido, lo que la haría `stadium_other`, pero el rótulo no lo confirma.
  3. La Nota "Receita líquida das atividades" del PDF 2025 no cierra perfecto: sus 4 líneas de
     "Deduções" suman R$73.112 mil pero el documento imprime R$73.132 mil de total (diferencia de
     R$20 mil) — no se pudo determinar cuál de las 4 líneas individuales tiene el redondeo/typo. Lo
     mismo pasa en la Nota "Custos operacionais das atividades" del mismo PDF, con una diferencia de
     R$1 mil. Documentado en el comentario de cabecera de `data/internacional-br-data.js`.
