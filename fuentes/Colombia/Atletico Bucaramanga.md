# Atlético Bucaramanga (Club Atlético Bucaramanga S.A.)

- **Club nuevo de la sesión 2026-09-22.** El NIT **890203822** que la sesión 2026-09-13 había dejado
  anotado como "candidato, sin confirmar en SIIS" **queda CONFIRMADO**: es el correcto, la sociedad
  está en SIIS con los 10 cortes anuales 2016-2025, punto de entrada "Pymes-Individuales",
  constituida el 22/12/2011 en Bucaramanga (Santander). Ojo con el estado: es el único de los 7
  clubes nuevos que figura en **"VIGILANCIA"** y no en "INSPECCION" (grado de supervisión más alto
  de Supersociedades).
- **9 ejercicios con PDF real bajados a `Clubes/Colombia/Atletico Bucaramanga/`** (2016-2020 y
  2022-2025): las "NOTAS EF" (el documento completo) y la "CERTIFICACION EF" de los 9, más el "DICTAMEN DEL
  REVISOR FISCAL" de 2020 y 2022-2025. Que falte el dictamen en los años viejos es el
  patrón normal de SIIS, no un problema de descarga.
- **2021 CONFIRMADO como hueco real, no throttling (corregido 2026-09-28, to-do 50).** El corte
  2021-12-31 SÍ existe en el índice de SIIS (radicado 2022-01-574517, activos/ingresos calculados
  visibles en la ficha), pero tanto el endpoint `documentos-adicionales` (404 "Estamos actualizando
  SIIS", reproducible de forma consistente, no transitorio) como la Vista 360 en el browser real
  ("No contamos con datos para visualizar") confirman que la sociedad **no depositó el paquete de
  documentos adicionales ese año** — mismo patrón que los huecos ya documentados de Boyacá Chicó
  (2017-2018). No es un problema de tooling ni de concurrencia: es un hueco real de la fuente.
- Cifras del ejercicio 2025 según la vista de SIIS (miles de COP): activos 13.148.019, ingresos
  44.739.800, ganancia 1.939.023 — ROE 50,04%, ROA 14,75%. Es, por ingresos, el más grande de los 7
  clubes nuevos de esta sesión.
- **Sin abrir todavía**: sourcing puro, no se verificó el contenido de ningún PDF ni si alguno es
  escaneo sin capa de texto.
- Contacto: siis.ia.supersociedades.gov.co (NIT 890203822); atleticobucaramanga.com.
- Último chequeo: 2026-09-22.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: regulador/país (SIIS): agotado — se bajaron todos los ejercicios con documentos (API; ver `_notas-generales.md`) · barrido: 2 (Sonnet) — 2026-10-08

Estados financieros en disco ahora: 9 ejercicios (2016-2020, 2022-2025), cada uno con certificación y dictamen del revisor fiscal cuando SIIS los tiene. Los años que faltan son registros de SIIS sin documentos depositados.
