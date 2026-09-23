# Liverpool

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: The Liverpool Football Club and Athletic Grounds Limited — Companies House n° **00035668**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas **consolidadas** (`Annual report and consolidated financial statements`), ejercicio cerrado
el 31 de mayo.

- `Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2024-25.pdf` — 38 páginas, cerrado 31/5/2025.
- `Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2023-24.pdf` — cerrado 31/5/2024.

## Serie disponible sin bajar

**16 ejercicios**, de 31/7/2010 a 31/5/2025. Ojo: el cierre más viejo es en JULIO, así que en algún
punto de esa serie hubo un cambio de fecha de cierre y va a haber un ejercicio irregular — el mismo
caso que Racing 2020/21 (10 meses), ver `club-or-year-onboarding/SKILL.md`.

## Verificación hecha en esta sesión

OCR de la página 2 del PDF 2024/25: `The Liverpool Football Club and Athletic Grounds Limited /
Annual report and consolidated financial statements / 31 May 2025`.

- Último chequeo: 2026-09-13.

## CARGADO al sitio (2026-09-22)

Los 2 ejercicios (2023/24 y 2024/25) se cargaron en `data/liverpool-gb-data.js` (`clubId`
`liverpool-gb`), leyendo completas las transcripciones `liverpool-group-accounts-2023-24.md` y
`liverpool-group-accounts-2024-25.md` de esta misma carpeta. Cuentas consolidadas, cierre 31 de
mayo confirmado en la carátula y en el Group Strategic Report de cada documento (no en la
serie vieja de cierre en julio).

- **FX**: GBP es moneda nueva, todavía sin entrada en `data/currency-map.js` (fuera de alcance de
  esta sesión, no se tocó ese archivo). Ninguno de los 2 documentos declara un tipo de cambio
  propio (no hay nota de moneda extranjera con TC, porque GBP es la propia moneda de reporte del
  club). Se usó `fxRef:'GBP@2024-05-31'` y `fxRef:'GBP@2025-05-31'`, sin `fx` literal ni
  `fxSource`, a la espera de que se agregue GBP a `FX_CLOSE`.
- **Tie-out 2023/24**: Ingresos $635,781 M GBP = `officialTotalRevenue` exacto. Gastos
  `Math.abs(expenses+nonCash)` = $683,439 M GBP = `officialTotalExpenses` exacto (Cost of sales +
  Administrative expenses, el total impreso antes de profit on disposal de pases/intereses/
  impuestos). Resultado neto = -$43,478 M GBP = `officialPAT` exacto ("Loss for the financial
  year" impresa). Sin residuo.
- **Tie-out 2024/25**: Ingresos $768,882 M GBP exacto. Gastos $745,121 M GBP exacto. Resultado neto
  = +$8,273 M GBP exacto ("Profit for the financial year" impresa). Sin residuo.
- **Duda genuina sin resolver, anotada acá porque `Admin/dudas-por-club.md` quedó fuera de
  alcance de esta tarea**: la Nota "Staff numbers and costs" de los 2 documentos da un solo total
  de sueldos+cargas sociales+pensión para TODO el personal del grupo (jugadores, cuerpo técnico,
  administración/comercial y mantenimiento de cancha juntos, sin desglose por área), a diferencia
  de Vélez (que sí tiene esa matriz). Se cargó el total completo como `wages_squad`, siguiendo la
  convención estándar de la prensa de finanzas del fútbol inglés (el "wage bill"/"wages to
  turnover" de un club de Premier League se cita siempre como costo de personal TOTAL, no aislado
  a jugadores) — pero es una decisión, no un hecho confirmado con Guido. Si en el futuro aparece
  una fuente que separe esta cifra por área, revisar.
- **Color de marca**: `#C8102E` — Pantone PMS 186 C, el rojo oficial de Liverpool FC, verificado
  contra teamcolorcodes.com (ficha dedicada del club, cita Pantone/RGB/CMYK) y corroborado por
  consenso de múltiples agregadores (brandpalettes.com, apparelnbags.com, teamcolorsguide.com), el
  2026-09-22. NO se agregó a `data/clubs.js` (fuera de alcance de esta tarea) — queda pendiente de
  que una sesión que sí toque ese archivo lo sume a la entrada de `liverpool-gb`.
  Descartado: `#E51C25` (footylogos.com, un solo color de logo, minoritario frente al consenso) y
  `#8F1E32` (color del kit de la temporada actual en el wikitext de Wikipedia — es el tono de la
  camiseta de este año, no el color de identidad histórico del club).
