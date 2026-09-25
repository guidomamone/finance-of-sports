# Flamengo (Clube de Regatas do Flamengo, Rio de Janeiro)

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
