# Flamengo (Clube de Regatas do Flamengo, Rio de Janeiro)

**Ángulos**: sitio oficial: HIT (portal /clube/transparencia, pestaña FINANÇAS, 8 ejercicios) · federación/regulador: no necesario · Wayback CDX: no necesario · búsqueda web: no necesaria · barrido: 1 (Sonnet) — 2026-10-03

- **Hit real, pero incompleto todavía.** Flamengo NO se convirtió a SAF — sigue siendo una
  associação (Clube de Regatas do Flamengo) que, por estatuto, publica "Relatório Anual com as
  Demonstrações Financeiras" auditadas todos los años. 2 ejercicios descargados en
  `Clubes/Brasil/Flamengo/`: `relatorio-anual-demonstracoes-financeiras-2024.pdf` y
  `-2025.pdf`, ambos bajados de `images.flamengo.com.br` (bucket de assets del propio sitio
  oficial). Cada PDF incluye Relatório de Gestão + Demonstrações Financeiras + parecer del
  auditor independiente + parecer del Conselho Fiscal — paquete completo, confirmado por texto
  ("FLAMENGO — RELATÓRIO DE GESTÃO — DEMONSTRAÇÕES FINANCEIRAS COM PARECER DO AUDITOR
  INDEPENDENTE — PARECER DO CONSELHO FISCAL").
- **Pendiente, no descartado — 2022 y 2023 existen pero no se pudo bajar el PDF esta sesión.**
  Prensa propia confirma que Flamengo publicó "Relatório Anual com as Demonstrações Financeiras"
  también en 2022 y 2023 (notas oficiales en `flamengo.com.br/noticias/institucional/
  flamengo-publica-relatorio-anual-com-as-demonstracoes-financeiras-2022` y `-2023`), pero esas
  páginas de noticia son una SPA renderizada por JS: ni `curl` ni el WebFetch (que reportó "Not
  found") pudieron extraer el link real del PDF del cuerpo de la noticia — a diferencia de 2024 y
  2025, que sí se consiguieron porque WebFetch los procesó con su propio navegador headless en
  esos casos puntuales (puede ser simple flakiness del renderizado JS, no algo estructural). Vale
  la pena reintentar con un browser interactivo (`navigate`/`get_page_text`) en vez de WebFetch
  para sacar el link exacto de esas dos notas.
- **La sección `/transparencia/demonstracoes-financeiras` del sitio no sirve para navegar
  directo**: es también una SPA — tanto `curl` como WebFetch devuelven la página vacía sin los
  links reales (WebFetch: "no actual links... only the heading Flamengo"). El patrón que sí
  funcionó fue buscar la nota de prensa puntual de cada año ("Flamengo publica Relatório Anual...
  Demonstrações Financeiras <año>") y extraer el link de descarga del cuerpo de esa nota.
- Ojo, NO usar `fla-bucket-s3-us.s3.amazonaws.com/.../1638198417079.pdf` que aparece en algunas
  búsquedas — es una "Demonstrações Financeiras NÃO Auditadas" (no auditada, dice el propio
  nombre del documento), no sirve como fuente para el sitio.
- Contacto: flamengo.com.br/clube/transparencia (portal, requiere JS); notas de prensa
  individuales por año para sacar el link real del PDF.
- **Cargado (2026-09-24): 2024 y 2025, los 2 ejercicios ya descargados arriba.** clubId
  `flamengo-br`. Ver `data/flamengo-br-data.js` para el detalle completo de categorización/
  verificación. 2022 y 2023 siguen pendientes (el link del PDF no se pudo extraer de la nota de
  prensa en esta sesión tampoco, mismo problema de SPA).
- Color de marca: `#FF0000` — infobox de kit de en.wikipedia.org/wiki/CR_Flamengo (parámetro
  `body1`, plantilla de camiseta titular vigente), consistente con pt.wikipedia.org ("vermelho e
  preto" como colores tradicionales, sin predominancia declarada, pero "Rubro-Negro" — rojo primero
  en el propio apodo del club — y el body/torso del kit es rojo puro con mangas negras), verificado
  2026-09-24.
- Último chequeo: 2026-09-24.

## Barrido 2026-10-03 (grupo C Brasil): de 2 a 8 ejercicios en disco (2018-2025)

- **Cómo se destrabó lo que la nota anterior daba por SPA imposible**: el portal nuevo `flamengo.com.br/clube/transparencia` (las URLs `/transparencia/demonstracoes-financeiras` y las notas de prensa de 2022/2023 dan "Página no encontrada" hoy) tiene una pestaña **FINANÇAS** con 8 páginas de paginación y todos los PDFs como `<a href>` a `storage.googleapis.com/crf-strapi-media-prd/Demonstracao_Financeira_<año>_<hash>/...pdf` (Strapi). Se llega con el Browser pane (clic en el botón FINANÇAS, luego clic en cada número de página y juntar los `href` por JS) y los PDFs bajan con `curl` normal.
- Bajados a `Clubes/Brasil/Flamengo/` (nombre `demonstracoes-financeiras-<año>.pdf`, md5 distintos, verificados con `pdftotext` de las primeras páginas): **2023** (82 pp, 33 MB), **2022** (84 pp), **2021** (86 pp), **2020** (67 pp, "31 de dezembro de 2020"), **2019** (76 pp, primer año con auditor independiente según el propio texto), **2018** (41 pp). Se suman a los 2024 y 2025 ya cargados.
- Existen además en el mismo portal (NO bajados): `Demonstracao_Financeira_2016` y `_2017`, `Financial_Statements_2021` (versión en inglés de 2021) y los relatórios trimestrais 2016-2026 (`Relatorio_de_Transparencia_...Trimestre`). Con 2016-2017 la serie llega a 10 ejercicios.
- Pendiente real de datos: ninguno para llegar a 5; el trabajo que queda es onboarding (2018-2023 sin cargar en el sitio).
