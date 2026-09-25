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

## Carga a data/fluminense-br-data.js (2026-09-24)

- **2 ejercicios cargados: 2024 y 2025** (fiscalYearStart '01-01', año calendario, mismo criterio que
  Botafogo/Flamengo/Grêmio). Ver el comentario de cabecera de `data/fluminense-br-data.js` para el
  detalle completo de categorización/verificación.
- **Auditor CONFIRMADO leyendo los propios PDF: BDO RCS Auditores Independentes SS Ltda. firmó AMBOS
  ejercicios** (2024 y 2025) — no Mazars. La mención de prensa a Mazars corresponde, según el propio
  informe 2024 ("Outros assuntos"), al auditor (sin nombrar en el documento) del ejercicio 2023
  comparativo, no a 2024/2025.
- **Opinión 2024: SEM ressalva** (limpia), con 2 párrafos de énfasis (continuidade operacional,
  adesão PROFUT) que el propio informe aclara que no modifican la opinión.
- **Opinión 2025: COM RESSALVA**, 3 asuntos — falta de circularização bancaria, provisão para
  contingências insuficiente (~R$34.176 mil según los propios asesores jurídicos del club), y la
  Administração optando por NO reconocer el efecto contable de la recompra parcial (10%) de derechos
  vendidos a la Liga Futebol Forte União, lo que según BDO subvalúa resultado y patrimônio líquido en
  R$110.427 mil. **Esta ressalva del punto 3 es la hipótesis más fuerte encontrada para la
  "regularización" que menciona la prensa (otempo.com.br, junio 2026)**, pero no está confirmado: el
  documento (firmado 30/4/2026) no menciona a la Anresf. Duda genuina abierta: ¿existe una versión
  posterior, ya regularizada, del balance 2025, publicada en transparenciafluminense.com.br después de
  este informe?
- **Color de marca: `#870A28` (grená), NO `null`.** El Estatuto del club (Art. 144) declara una lista
  ORDENADA de colores oficiales: "encarnado (grená), branco e verde" — el grená gana por ser el primero
  de esa lista (criterio de desempate de `club-or-year-onboarding` sección 3, capa 1, tiebreak a).
  Hex de teamcolorcodes.com/Fluminense (#870A28), verificado 2026-09-24.
- **Gestión: Mário Bittencourt cubre AMBOS ejercicios** (2024 y 2025), pese a que la carta del
  documento 2025 está firmada por su sucesor Mattheus Montenegro — Montenegro solo asumió el
  19/12/2025 (últimos 12 días del ejercicio calendario 2025), confirmado por prensa (lance.com.br,
  maisgoias.com.br). Ver comentario de cabecera del archivo de datos para el detalle.
- **Hallazgo de transcripción**: la tabla "Receita bruta com Futebol" de
  `Clubes/Brasil/Fluminense/demonstracoes-financeiras-2024.md` (Nota 4(a)) tiene las filas "Timemania"
  y "Receitas Extraordinárias" con las columnas 2024/2023 INVERTIDAS respecto del PDF real
  (re-verificado con `pdftotext -layout` directo) — el `.md` no se corrigió en esta sesión (fuera de
  alcance), pero cualquier sesión futura que use ese `.md` para otra cosa debería saber que esa fila
  puntual está desalineada.
