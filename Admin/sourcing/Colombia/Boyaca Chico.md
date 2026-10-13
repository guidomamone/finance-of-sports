# Boyacá Chicó (Deportivo Boyacá Chicó Fútbol Club S.A.)

- **Club nuevo de la sesión 2026-09-22, el más flaco de los 7 nuevos en lo que se alcanzó a bajar.**
  Vía SIIS (Supersociedades), NIT **830100504**, punto de entrada "Pymes-Individuales", sociedad
  constituida el 26/03/2002, domicilio Bogotá D.C. (aunque el club juega en Tunja), estado
  "INSPECCION". Es la sociedad más antigua de los 7 clubes nuevos.
- **8 ejercicios con PDF bajados a `Clubes/Colombia/Boyaca Chico/`** (2016, 2019, 2020, y ahora
  2021-2025 completos, sesión 2026-09-28, to-do 50): las "NOTAS EF" (el documento completo,
  llamado "ESTADOS FINANCIEROS"/"INFORME FINANCIERO" según el año), "CERTIFICACION EF" y
  "DICTAMEN DEL REVISOR FISCAL" de cada uno, vía la API de SIIS documentada en
  `_notas-generales.md` (radicados 2022-01-190631 a 2026-01-163084, 1 proceso a la vez). Los 5
  PDFs nuevos (2021-2025) tienen capa de texto real, verificado con `pdftotext` — sin necesidad de
  OCR. Pendiente el paso de transcripción completa a `.md` (pipeline Mistral, `CLAUDE.md` "Cada PDF
  nuevo").
- **Huecos reales verificados**: 2017 y 2018 tienen corte en SIIS pero el endpoint de documentos
  devuelve lista vacía — la sociedad no depositó el paquete esos años.
- **Nota de nombre societario**: el PDF de 2025 dice "DEPORTIVO BOYACÁS CHICÓ FUTBOL CLUB S.A.S" (y
  el NIT impreso, "803.100.504", tiene los primeros 2 dígitos invertidos respecto al NIT real
  830100504 que usa SIIS) — parece un error de tipeo del propio documento, no una sociedad
  distinta: mismo radicado, misma cadena SIIS. Verificar si el club cambió de S.A. a S.A.S. en
  algún momento entre 2020 y 2025 antes de cargar los datos.
- **Ojo con el CIIU al buscarlo**: está clasificado como **R9319 "Otras actividades deportivas"**, no
  como R9312 — junto con La Equidad (R9319) y Llaneros (R9311) es uno de los casos que obligan a
  mirar los tres CIIU deportivos.
- Cifras del ejercicio 2025 según la vista de SIIS (miles de COP): activos 8.546.150, ingresos
  8.636.945, ganancia 381.764 — ROE 5,62%, ROA 4,47%. Es el club de menor facturación de los 7
  nuevos.
- **Sin abrir todavía**: sourcing puro, no se verificó el contenido de ningún PDF.
- Contacto: siis.ia.supersociedades.gov.co (NIT 830100504); boyacachicofc.com.co.
- Último chequeo: 2026-09-22.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: regulador/país (SIIS): agotado — se bajaron todos los ejercicios con documentos (API; ver `_notas-generales.md`) · barrido: 2 (Sonnet) — 2026-10-08

Estados financieros en disco ahora: 8 ejercicios (2016, 2019-2025), cada uno con certificación y dictamen del revisor fiscal cuando SIIS los tiene. Los años que faltan son registros de SIIS sin documentos depositados.
