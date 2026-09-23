# La Equidad (Club Deportivo La Equidad Seguros S.A.)

- **Club nuevo de la sesión 2026-09-22, y el mejor hallazgo de los 7 clubes nuevos colombianos: 9
  ejercicios con PDF real (2016, 2017, 2019-2025).** Vía SIIS (Supersociedades), NIT **800108152**,
  punto de entrada "Pymes-Individuales", sociedad constituida el 23/12/2012 en Bogotá D.C., estado
  "INSPECCION". Se bajó el paquete estándar de SIIS por ejercicio — "NOTAS EF" (que a pesar del
  nombre es el documento completo: situación financiera + resultado integral + cambios en patrimonio
  + flujo de efectivo + notas), "DICTAMEN DEL REVISOR FISCAL" y "CERTIFICACION EF" — a
  `Clubes/Colombia/La Equidad/`, con el año en el nombre de cada archivo.
- **Hueco real, no de búsqueda: 2018.** SIIS tiene el corte 2018-12-31 para este NIT pero sin ningún
  documento asociado (el endpoint de documentos devuelve la lista vacía, no un error). Los
  ejercicios 2016 y 2017 traen solo 2 de los 3 documentos (sin dictamen del revisor fiscal), que es
  el patrón normal de los años viejos de SIIS. De 2019 en adelante están los 3 completos.
- **Ojo con el CIIU al buscarlo**: la sociedad está clasificada como **R9319 "Otras actividades
  deportivas"**, no como R9312 "Actividades de clubes deportivos" — si una sesión futura busca
  clubes colombianos agregando solo por R9312, este club no aparece. Ver la nota de metodología en
  `fuentes/Colombia/_notas-generales.md`.
- Cifras del ejercicio 2025 según la vista de SIIS (miles de COP): activos 26.219.336, ingresos
  20.612.236, **pérdida de 1.585.975** — ROE -10,01%, ROA -6,05%. Es de los pocos clubes colombianos
  del barrido con resultado negativo.
- **Sin abrir todavía**: esta sesión es sourcing puro, no se verificó el contenido de ningún PDF ni
  si alguno es escaneo sin capa de texto. Chequear con `pdftotext`/`pdffonts` antes de transcribir.
- Contacto: siis.ia.supersociedades.gov.co (NIT 800108152); clubdeportivolaequidadseguros.com.
- Último chequeo: 2026-09-22.
