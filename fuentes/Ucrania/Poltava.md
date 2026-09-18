# Poltava (SK Poltava)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: Спортивний клуб "Полтава" (SK Poltava), forma societaria ТОВ,
  EDRPOU 35206591. Ojo: existe también un club histórico "ФК Полтава" (EDRPOU distinto,
  35206591 según opendatabot — verificar si son la misma entidad renombrada o dos clubes
  distintos, no se confirmó del todo en esta sesión).
- **Canal**: sitio oficial del club, `scpoltava.com/dokumenty/` — página React con los documentos
  publicados como **IMÁGENES página por página (JPG)**, NO como PDF descargable directo (gotcha de
  tooling: `curl`/`WebFetch` sobre la página no revela los links, hay que usar el Browser pane con
  `javascript_tool` para extraer las URLs `wp-content/uploads/.../*_page-000N.jpg` del DOM
  renderizado — mismo patrón que un escaneo sin capa de texto, aunque acá es la elección de
  publicación del club, no un PDF viejo escaneado).

## Qué se bajó (sesión 2026-09-18)

**2 ejercicios (2024 parcial, 2025 completo), como páginas JPG individuales — no combinadas en PDF
todavía (eso es tarea de una sesión de mapeo/transcripción, no de sourcing).**
`Clubes/Ucrania/Poltava/`:

- FY2024 (7 imágenes): `poltava-resultados-2024-p1/2/3.jpg` (estado de resultados, 3 páginas),
  `poltava-auditor-info-adicional-2024-p1/2/3.jpg` (informe del auditor sobre información
  adicional, 3 páginas), `poltava-pagos-agentes-2024.jpg` (carta sobre pagos a agentes). **No se
  encontró un balance/estado de situación patrimonial separado para 2024** en la página — puede
  estar en el bloque de 2026/04 sin etiqueta clara que se dejó sin bajar (ver duda abajo).
- FY2025 (13 imágenes): `poltava-balance-2025-p1/2.jpg` (balance, 2 páginas),
  `poltava-resultados-2025-p1/2.jpg` (estado de resultados, 2 páginas),
  `poltava-flujo-caja-2025.jpg` (flujo de fondos, 1 página), `poltava-pagos-agentes-2025.jpg`,
  `poltava-auditor-2025-p1` a `p7.jpg` (dictamen de auditor, 7 páginas).

20 imágenes JPG en total.

## Verificación hecha en esta sesión

Todas las 20 descargas dieron HTTP 200 (no se verificó contenido imagen por imagen con `file`, pero
los tamaños fueron razonables y consistentes con capturas de página completa).

## Dudas / pendientes

- **Bloque de imágenes subidas en `2026/04`** (`zvit_pro_fin_rezultaty_1/2/3-scaled.jpg`,
  `img5/11/12/22/32/42/52/60-scaled.jpg`) — 8 imágenes con nombres genéricos que NO se bajaron en
  esta sesión por falta de tiempo para desambiguar su contenido exacto (podrían ser
  "Додаткова інформація до річної фінансової звітності" o el balance de 2024 que falta, según el
  texto de la página). Revisar en una sesión futura antes de asumir que el paquete de 2024 está
  incompleto.
- Confirmar si "СК Полтава" (EDRPOU 35206591, el que juega en la UPL) y "ФК Полтава" (histórico)
  son la misma entidad o dos clubes de la misma ciudad — no crítico para cargar los datos ya
  bajados (que son claramente del SK Polтава actual), pero vale la pena una nota en
  `club-data-mapping` si se retoma.

- Último chequeo: 2026-09-18.
