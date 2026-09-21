# Vitória (Esporte Clube Vitória, Salvador-BA)

- **Dead-end viejo destrabado — la URL cambió, no era un bloqueo estructural.** La nota anterior
  (`_notas-generales.md`) decía que `ecvitoria.com.br/relatorios-de-transparencia/` daba 404. Esa
  ruta ya no existe, pero el portal se movió a `ecvitoria.com.br/transparencia/
  demonstracao-financeira/` — sección nueva, con documentos reales.
- **1 ejercicio descargado en `Clubes/Brasil/Vitoria/demonstracoes-financeiras-2025.pdf`**:
  "Esporte Clube Vitória — Demonstrações financeiras individuais e consolidadas acompanhadas do
  Relatório do Auditor Independente — Em 31 de dezembro de 2025", publicado 09/07/2026. Paquete
  auditado completo (índice con relatório del auditor, balanços, DRE, DRA, mutações do patrimônio,
  fluxo de caixa y notas explicativas para 2025 y 2024 comparativo).
- **2024 y años anteriores: "Nenhum documento encontrado" en la sección del sitio** — confirmado
  navegando la página real (no solo un intento de URL), así que el dead-end de años viejos SIGUE
  vigente, pero ahora está confirmado con evidencia de que la sección existe y está vacía para esos
  años, no que la sección no exista.
- **Gotcha de tooling importante**: la página usa Elementor con links reales (`<a href>` a PDFs en
  `wp-content/uploads/`), pero clickear el botón de descarga en el browser automatizado disparó una
  redirección a un sitio de terceros completamente ajeno (`rcdespanyol.com`, el club de fútbol
  español) — mismo patrón de "pop-up/redirect inyectado" que ya se documentó para el portal SIIS de
  Colombia en este mismo skill. La vuelta que funcionó: extraer los links reales del DOM con
  `document.querySelectorAll('a')` vía JS en vez de clickear, y bajarlos después con `curl` directo
  (esta vez sin necesitar Cloudflare bypass, `curl` normal alcanzó).
- El club también publica balancetes sintéticos trimestrales de 2025 y 2026 en la misma sección —
  no descargados esta sesión (son estados resumidos, no la demonstração completa auditada), quedan
  como referencia rápida si hiciera falta un dato intra-anual.
- Contacto: ecvitoria.com.br/transparencia/demonstracao-financeira/.
- Último chequeo: 2026-09-16.
