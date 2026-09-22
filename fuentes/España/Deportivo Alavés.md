# Deportivo Alavés, S.A.D.

- **Hit fuerte, sorpresa de la sesión (2026-09-13).** 9 ejercicios anuales consecutivos, del 2016-17
  al 2024-25, descargados a `Clubes/España/Deportivo Alavés/`: `cuentas-anuales-2016-2017.pdf` a
  `cuentas-anuales-2024-2025.pdf` (todos "Informe de Auditoría y Cuentas Anuales" completos). Sin
  ningún año faltante en el rango — para un club que no estaba entre los "grandes" esperados de
  mejor disclosure, terminó siendo de los mejores de la sesión (comparable a Colo-Colo en
  profundidad).
- **Cómo se encontró**: la página `deportivoalaves.com/es/club/transparencia` no devuelve nada útil
  ni con `curl` ni con WebFetch (JS-driven, sin contenido en el HTML crudo) — el hallazgo real vino
  de una búsqueda que encontró de casualidad un PDF de estatutos sociales alojado en
  **`cms.bkndagroup.com`** (un backend/CMS separado del dominio principal del club, aparentemente el
  proveedor de la sección de transparencia). Una vez identificado ese host, un segundo `curl` sobre
  la MISMA página de transparencia del club (`deportivoalaves.com/es/club/transparencia`) —
  reintentada con user-agent de navegador — sí devolvió el HTML completo con TODOS los links
  embebidos como texto markdown (`[Cuentas Anuales Auditadas Deportivo Alavés 2016-17](https://cms.
  bkndagroup.com/uploads/...)`), incluyendo no solo cuentas anuales sino presupuestos, informes de
  deuda neta, retribuciones, memorias de gestión, etc. de cada temporada desde 2016-17. El primer
  intento probablemente falló por caché o por un `curl` sin el user-agent de navegador — vale la
  pena reintentar la página del club directo (no solo buscar por nombre de archivo) en clubes
  similares antes de darlos por bloqueados.
- El host `cms.bkndagroup.com` no tiene bloqueo ni de bot-detection ni de hotlinking — descarga
  directa sin problema con `curl` simple.
- Pendiente: nada del rango 2016-2025, la serie está completa. Años anteriores a 2016-17 no se
  buscaron (el club juega en La Liga de forma intermitente desde 1930, pero como S.A.D. moderna
  probablemente no tenga cuentas auditadas de antes de mediados de los 2010s — no confirmado).
- Contacto: `deportivoalaves.com/es/club/transparencia` (la página real trae TODO el archivo
  histórico en el HTML crudo si se pide con user-agent de navegador) — los PDFs viven en
  `cms.bkndagroup.com/uploads/`.
- Último chequeo: 2026-09-13.
- Color de marca: `#0232A0` — tabla por liga de footylogos (LaLiga), 1er color, exacto, verificado
  2026-09-21.
