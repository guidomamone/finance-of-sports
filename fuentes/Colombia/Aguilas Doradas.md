# Águilas Doradas (Rionegro) — deposita como TALENTO DORADO S.A.

- **Club nuevo de la sesión 2026-09-22, y el hallazgo metodológicamente más interesante de Colombia:
  el club NO aparece en SIIS con su nombre deportivo.** Buscar `"AGUILAS DORADAS"` o
  `"RIONEGRO AGUILAS"` como frase exacta sobre `nombreEmpresa` devuelve **0 hits**. La sociedad que
  deposita los estados financieros es **TALENTO DORADO S.A.**, NIT **900456885**, Rionegro
  (Antioquia), constituida el 10/08/2011, estado "INSPECCION" — la dueña del club.
  - **Cómo se encontró, para no repetir el camino largo**: no con búsquedas de nombre ni googleando
    el NIT, sino con la agregación por CIIU deportivo que ahora permite la API de SIIS (ver
    `_notas-generales.md`): listar todas las razones sociales con CIIU R9312 y filtrar por
    departamento. "TALENTO DORADO S.A." en Rionegro-Antioquia salta a la vista. Es el mismo gotcha
    de "razón social ≠ nombre de fantasía" ya documentado para Alemania (RasenBallsport Leipzig) y
    Corea del Sur (GS Sports por FC Seoul).
  - Confirmado después por directorios empresariales: Talento Dorado S.A. es dueña de Águilas
    Doradas S.A. (fútbol) **y también del equipo de futsal Águilas Doradas** — ver la duda de
    perímetro anotada en `Admin/dudas-por-club.md`.
- **Serie COMPLETA, 10 ejercicios con PDF bajados a `Clubes/Colombia/Aguilas Doradas/`**
  (2016-2025): las "NOTAS EF" (el documento completo) de los 10 años, la "CERTIFICACION EF" de casi
  todos y el "DICTAMEN DEL REVISOR FISCAL" de los años recientes. Que falten dictámenes en los años
  viejos es el patrón normal de SIIS, no un problema de descarga.
- Cifras del ejercicio 2025 según la vista de SIIS (miles de COP): activos 25.807.502, ingresos
  21.137.372, ganancia 335.661 — ROE 1,58%, ROA 1,30%.
- **Sin abrir todavía**: sourcing puro. Además de chequear si son escaneos, acá hay que verificar
  explícitamente el perímetro (fútbol solo vs. fútbol + futsal) antes de cargar cualquier cifra.
- Contacto: siis.ia.supersociedades.gov.co (NIT 900456885); aguilasdoradas.com.co.
- Último chequeo: 2026-09-22.
