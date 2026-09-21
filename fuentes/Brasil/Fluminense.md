# Fluminense (Fluminense Football Club, Rio de Janeiro)

- **El mejor hallazgo de esta sesión de Brasil — serie completa 2010-2025, 16 ejercicios
  consecutivos.** Fluminense (todavía associação, no SAF — un artículo de prensa 2026 lo describe
  como "el camino hacia la SAF" en potencial, no concretado) mantiene un Portal da Transparência
  propio (`transparenciafluminense.com.br/public/`) con una sección "Demonstrações Financeiras a
  partir de 2010" que linkea un PDF por año, sin login. Los 16 PDFs (2010 a 2025) están en
  `Clubes/Brasil/Fluminense/demonstracoes-financeiras-<año>.pdf`.
- **Contenido confirmado por texto**: el de 2010 dice "FLUMINENSE FOOTBALL CLUB — CNPJ
  33.647.553/0001-90 — RELATÓRIO DA DIRETORIA... Demonstrações Financeiras do exercício encerrado
  em 31 de dezembro de 2010 e 2009", con balanço patrimonial, DRE y fluxo de caixa completos (2
  ejercicios comparativos cada PDF). El de 2024 confirma lo mismo formato ("Fluminense Football
  Club — Balanço patrimonial — Exercícios findos em 31 de dezembro de 2024 e 2023"), 54 páginas.
  Sin necesidad de OCR — todos tienen capa de texto real (`pdftotext` extrae limpio).
- **Cómo se armó la lista de URLs**: la página raíz del portal no lista los PDFs directo — hay que
  entrar a la sub-página `/public/lista/70/financas/demonstracoes-financeiras-a-partir-de-2010`,
  que sí devuelve un link `/public/download/<hash>` por año.
- Prensa (otempo.com.br, junio 2026) menciona que Fluminense tuvo que "regularizar" su balance de
  2025 después de una advertencia de la Anresf (el nuevo ente de fair play financiero) — no está
  claro si el PDF descargado esta sesión (`demonstracoes-financeiras-2025.pdf`) ya es la versión
  regularizada o la original observada; revisar el contenido antes de cargar al sitio.
- Auditor mencionado en prensa: BDO (2024) y Mazars (mencionado en otro artículo) — confirmar cuál
  firmó cada ejercicio al leer los PDFs.
- Contacto: transparenciafluminense.com.br/public/.
- Último chequeo: 2026-09-16.
