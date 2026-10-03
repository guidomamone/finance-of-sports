# Vitória (Esporte Clube Vitória, Salvador-BA)

**Ángulos**: sitio oficial: HIT (ecvitoria.com.br, 2025; carpeta vieja /public/assets/pdf/Documentos_Vitoria/ ya muerta en vivo) · federación/regulador: no consultada · Wayback CDX: HIT · búsqueda web: sin hallazgos nuevos · barrido: 1 (Sonnet) — 2026-10-03

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

## Cargado (sesión 2026-09-24)

- **1 ejercicio cargado en `data/vitoria-br-data.js`** (`clubId: 'vitoria-br'`): 2025 (Déficit
  -R$25,418 M). Columna Individual/Controladora (no Consolidado). El club reporta patrimonio neto
  NEGATIVO ("Passivo a descoberto") de -R$300,309 M al cierre — ver comentario de cabecera del
  archivo de datos. Se encontró y documentó una inconsistencia real entre la Nota 29 y la propia DRE
  del balance auditado (ver `Admin/dudas-por-club.md`, sección de este club, y el comentario de
  cabecera de `data/vitoria-br-data.js`).
- **Color de marca: #FF1100 — footylogos.com/color-codes/vitoria ("Bright Red"), confirmado contra
  pt.wikipedia.org (infobox: "o vermelho foi substituído... consolidándose o rubro-negro como padrão
  cromático oficial") y logos.fandom.com (escudo: mitad superior roja, mitad inferior negra, con
  monograma "ECV" blanco), verificado 2026-09-24.** El club es bicolor rojo-negro ("rubro-negro" / Leão
  da Barra), NO tricolor como se asumía al iniciar la tarea — Wikipedia en portugués no menciona un
  tercer color de identidad (el blanco del escudo es solo el borde/monograma, no un color de camiseta
  propio). Se desempató a favor del rojo por el mismo criterio que Athletico Paranaense: "rubro" es el
  primer componente del apodo "Rubro-Negro", y el escudo tiene el rojo en la mitad SUPERIOR (más
  prominente visualmente).

## Barrido 2026-10-03 (grupo C Brasil): de 1 a 5 ejercicios en disco (2016, 2018, 2019, 2024, 2025)

- La nota anterior decía que 2024 y anteriores estaban "Nenhum documento encontrado"; en realidad el sitio viejo (`ecvitoria.com.br/public/assets/pdf/Documentos_Vitoria/DEMONSTRAÇÃO FINANCEIRA/`) los tenía y el Wayback CDX los conserva (capturas de 2026-03-05, antes de la migración). Los links live dan 404; bajados vía `web.archive.org/web/<ts>id_/`:
  - `demonstracoes-financeiras-2024.pdf` (49 pp, 1,01 MB: justo bajo el límite de truncado; "Em 31 de dezembro de 2024"), `demonstracoes-financeiras-2019.pdf` (49 pp, "31 de dezembro de 2019 e de 2018"; era el archivo `Relatório dos auditores independentes sobre as demonstrações financeiras.pdf`), `demonstracoes-financeiras-2018.pdf` (49 pp, "2018 e de 2017"), `demonstracoes-financeiras-2016.pdf` (22 pp, "31 de dezembro de 2016 e 2015", con carta de remisión).
  - `parcial-dre-ebitda-jan-nov-2021.pdf` (1 pp): DRE/EBITDA enero-noviembre 2021, NO es un ejercicio completo (era `DEMONSTRAÇÕES FINANCEIRAS 2021.pdf`).
- **Huecos: 2017 (cubierto como comparativo en el de 2018), 2020, 2021, 2022, 2023.** Del sitio solo hay balancetes mensuales (2019, 2021-2024), balanços/DRE mensuales de 2022 y un "Escopo Auditoria Externa 2023". No se ubicó la demonstração anual de 2020-2023.
