> **ARCHIVADO el 2026-10-04.** Lista de puntos que Guido sacó del TODO el 2026-09-14, con el motivo de cada uno.

Sacados el 2026-09-14 por decisión de Guido, para que quede el registro de que no se
perdieron sino que se descartaron:

- **Buscar y cargar ejercicios que faltan de un club** (Racing/River, y Boca): no es una tarea de
  lista, es trabajo normal de onboarding.
- **Mercado de Pases**: fuera de alcance por ahora.
- **Los 6 puntos de sourcing y onboarding por país** (eran 12 a 18: los PDFs argentinos ya
  descargados sin cargar, Ecuador, la pista de OMPIC en Marruecos, el ejercicio 2024 de Club
  América, los 5 brasileños con PDF listo, los años extra de España, y el barrido colombiano).
  Mismo criterio que el primer punto: buscar y cargar documentos es el trabajo del proyecto, no
  una lista de pendientes. **No se perdió nada**: qué hay descargado y qué falta de cada club vive
  en `fuentes/<País>/<Club>.md` y en el índice de su país `fuentes/_indice/<País>.md`, que es donde se mira antes
  de empezar; las preguntas abiertas que dejaron (el tipo de cambio doble de Ollamani, el PAT de
  Once Caldas, las 3 cifras de Deportes Tolima, el presupuesto por año calendario de Instituto)
  están en `Admin/dudas-por-club.md` y en el archivo de fuentes de cada club.
- **El dominio y el repo** (era 7). Ya está hecho: el repo de GitHub se llama
  `guidomamone/finance-of-sports` (el nombre viejo redirige) y los push siguen llegando, así que
  Netlify quedó bien linkeado. Lo único de ese punto que había que no perder — que la línea
  `finance-of-sports/` del `.gitignore` del sitio profesional es lo que mantiene separados los dos
  repos — se movió a `CLAUDE.md`, que se lee en cada sesión, que es donde sirve.
- **Los 3 cards de presupuesto en un tab propio** (era 10): era un "evaluar si vale la pena", y la
  respuesta es que no.
- **Adelgazar el payload eager de `data/`** (era 22(d)). Decisión de Guido del 2026-09-20, sobre
  mediciones: sacar `reportingCurrency`/`fiscalYearStart` de `clubs.js` ahorra **3,0 KB comprimidos
  a 1000 clubes**, y acortar los `reportType` de `club-index.js` ahorra **60 bytes**, contra un
  refactor que toca el selector para todos los visitantes. No rinde. Las mediciones completas y qué
  haría falta para reabrirlo están en las notas del punto 3 de `Admin/Archive/PLAN-REMEDIACION-ESCALA.md`. La
  mitad que SÍ rendía de ese punto (`club-leagues.js`) se hizo en la Versión 164.
- **El corte free/paid y el paywall** (eran 5 y 6). Decisión de Guido del 2026-09-14: **por ahora
  el sitio va todo gratis**. No hay corte que definir ni cuentas/suscripciones que construir, así
  que no son pendientes. El día que se revise, la arquitectura ya charlada está en
  `Admin/finance-of-sports-project.md` (sitio estático + capa mínima de backend: Supabase para auth y estado
  de suscripción, Netlify Functions para el webhook de pagos; no migrar a Next.js).
