# Dinamarca — mismo patrón que Bélgica, y una idea reutilizable

La API pública de la Erhvervsstyrelsen (el registro mercantil estatal danés) es tan buena como la
Centrale des bilans belga (`paises/Belgica.md`), y por el mismo motivo: es una API, no una interfaz web para
humanos. Último chequeo: 2026-09-17.

- **`distribution.virk.dk/offentliggoerelser` es un Elasticsearch público, gratis, sin login y sin
  bloqueo de Cloudflare** — se busca por `cvrNummer` y cada resultado trae la URL directa del
  documento en `regnskaber.virk.dk`, descargable con `curl --compressed` sin token especial.
  `cvrapi.dk` (gratis, con rate-limit) sirve para resolver el CVR a partir del nombre del club.
  **La interfaz web para humanos (`datacvr.virk.dk`) SÍ está bloqueada por Cloudflare** — la
  lección repetida (ya vista en Bélgica, `paises/Belgica.md`): cuando un registro tiene una interfaz web
  bloqueada, buscar si expone una API/endpoint de datos por debajo antes de darlo por perdido.
- **Resultado: los 12 clubes de la Superliga 2025/26 cubiertos con series de 17 a 30 ejercicios
  cada uno** (307 documentos reales) — la profundidad histórica más pareja de cualquier país del
  proyecto (todos los clubes tienen series largas, no solo 1-2 destacados como pasó en otros
  países).
- **Gotchas menores**: algunos ejercicios recientes traen un PDF que es solo una carátula de 1
  página — usar el `.xhtml` que acompaña al mismo depósito en esos casos. Varias sociedades
  cambiaron de razón social sin cambiar de CVR (ej. AGF, ex-"Aarhus Elite A/S") — buscar siempre
  por CVR, no por nombre histórico. 4 clubes tuvieron transiciones de ejercicio fiscal (marcadas
  `-transicion` en el nombre de archivo, mismo criterio que Wolves/Forest en Inglaterra, sección
  9). FC København y OB tienen perímetro mezclado con otras actividades del grupo controlante
  (eventos, hoteles) — confirmar si el informe desglosa el segmento fútbol antes de cargar (dudas
  abiertas en `Admin/dudas-por-club.md`).
