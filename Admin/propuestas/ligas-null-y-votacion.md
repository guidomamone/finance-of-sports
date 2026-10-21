# Ligas en null y ligas que no coinciden (para el ok de Guido)

Guido: «al skill de auditoría, el que corro cada tanto, sumarle revisar los ejercicios con ligas null; a los 3 null sobre la misma liga, abrirla» y «crear un sistema de votos para auditoría para tema de ligas que no coinciden, como RAAL».

## Texto exacto: skill `auditoria-finance-of-sports`, sección nueva antes de «Cómo mantener este skill»

## 9. Ligas: años sin liga y ligas que no coinciden

**Años sin liga.** En cada auditoría de rutina se listan los club-años con liga `null` en `data/club-leagues/`. Si 3 o más son de la misma liga (la que dicen las fuentes, aunque el sitio no la tenga), esa liga se abre: Pipeline la agrega a `data/leagues.js` con su nivel y su lista de equipos de la temporada en `tools/club-league-reference/`, y una sesión de datos asigna esos años. Con menos de 3, quedan en `null` y se anotan con la liga que dicen las fuentes.

**Ligas que no coinciden.** Si la liga cargada de un año no coincide con una fuente (la lista de equipos de esa temporada, la página de la temporada, la caché de Wikipedia), no la decide quien la vio: se juntan las fuentes, cada una con su cita, y votan tres votantes con `votacion-de-criterios`. Gana la liga que la mayoría ve respaldada por la fuente más directa (la lista oficial de la temporada antes que una página general). El cambio se aplica con el trailer `Corrige:` y el veredicto va a `Admin/registros/auditoria-proceso.jsonl`. Una fuente que nombra al club con otro nombre puede ser otro club de la misma ciudad. Caso: RAAL La Louvière 2021, que la caché daba en la tercera categoría por «La Louvière Centre», un club distinto; la carga en la cuarta estaba bien.

## Cómo mantener este skill

(Ancla: la sección 9 va justo antes. Aprobado por Guido el 2026-10-21: «1. ok».)
