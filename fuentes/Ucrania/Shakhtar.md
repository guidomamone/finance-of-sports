# Shakhtar (Donetsk)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: ПРИВАТНЕ АКЦІОНЕРНЕ ТОВАРИСТВО "ФУТБОЛЬНИЙ КЛУБ "ШАХТАР" (ДОНЕЦЬК)"
  (sociedad anónima PRIVADA), EDRPOU 00169816, capital estatutario 2.700.000.000 UAH (uno de los
  más grandes del país, consistente con ser el club más rico de Ucrania).
- **SMIDA confirmado como DEAD-END para estados financieros, no por falta de búsqueda**: al ser
  ПрАТ (sociedad anónima privada, con acciones registradas pero no necesariamente ofrecidas al
  público), Shakhtar SÍ tiene ficha en `smida.gov.ua/db/feed` (EDRPOU 00169816) — pero sus 9
  depósitos ahí (2019-2024) son TODOS "Повідомлення про проведення загальних зборів" (avisos de
  asamblea) u "Особлива та інша нерегулярна інформація" (información irregular/societaria) — CERO
  depósitos de "Річна інформація емітентів цінних паперів" (la categoría que sí tiene contenido
  financiero completo, como se vio con Veres). Confirmado filtrando por EDRPOU con el Browser pane
  (el filtro por URL sin token CSRF no funciona en SMIDA, ver `_notas-generales.md`).
- **Canal alternativo, NO verificado a fondo — reporte PR, no necesariamente estados auditados
  completos**: el propio club publica un "Річний звіт" (informe anual) todos los años desde
  2006/07 en `shakhtar.com/uk-ua/club/annual-report/`, descrito por el club mismo como una memoria
  que cubre "eventos de la temporada, resultados deportivos, transferencias y FINANZAS,
  infraestructura, comunicaciones, responsabilidad social corporativa" — es decir, es un reporte
  narrativo/institucional con una sección de finanzas, NO necesariamente el paquete de balance +
  estado de resultados + dictamen de auditor en el formato regulatorio que sí se encontró en el
  resto del país. Prensa especializada (Sport Business Media, Champion.com.ua) SÍ cita cifras
  puntuales de este informe (ej. "dohid clubu 2.823 mil millones UAH temporada 2023/24"), lo que
  confirma que el informe tiene contenido financiero real, pero no se pudo verificar el desglose
  exacto (¿balance completo o solo KPIs?) porque la página de descarga es una SPA de React sin
  links de PDF visibles en el HTML estático (ni `curl` ni `WebFetch` los revelaron) — hubiera hecho
  falta el Browser pane con extracción JS del DOM, que no se llegó a hacer por tiempo.

## Qué se bajó (sesión 2026-09-18)

**Nada todavía** — este club quedó como lead sin cerrar, no como dead-end confirmado. El "Річний
звіт" tiene series desde 2006/07 hasta 2024/25 (10+ años) listadas en la página, así que si el
contenido resulta ser un balance real, sería la serie más profunda del país — vale la pena
priorizarlo en la próxima sesión.

## Dudas / pendientes

- **Próximo paso concreto para retomar**: abrir `shakhtar.com/uk-ua/club/annual-report/` con el
  Browser pane, extraer los `href` reales de cada año con
  `Array.from(document.querySelectorAll('a')).filter(a=>a.href.includes('.pdf'))` (mismo método que
  funcionó para Kolos/Rukh en esta sesión), bajar 1-2 años de muestra, y ABRIR el PDF para
  confirmar si trae balance/estado de resultados completo o solo cifras sueltas en formato
  narrativo — eso determina si Shakhtar entra al esquema del sitio como un balance real o queda
  como fuente secundaria de prensa/KPI.

- Último chequeo: 2026-09-18.
