# Udinese (Udinese Calcio)

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Udinese Calcio S.p.A., propiedad de la familia Pozzo. No cotiza.
- **Canal**: `udinese.it/club/compliance` (sección de ética/compliance, no de "bilancio" en sí — los
  PDF de balance viven ahí mezclados con el código ético).

## Qué se bajó (sesión 2026-09-17)

**2 ejercicios**, en `Clubes/Italia/Udinese/`: `Udinese-bilancio-2021-22.pdf` y
`Udinese-bilancio-2024-25.pdf`.

- **2 ejercicios más (2022/23 y 2023/24) existen pero NO se pudieron recuperar íntegros esta
  sesión**: las URLs originales (`udinese.it/club/compliance/codice-etico-societa/bilancio-...pdf`)
  ya no resuelven en el sitio (el club reorganizó las subcarpetas de `compliance`), y los únicos
  snapshots de Wayback Machine disponibles para esas dos URLs **están truncados a exactamente 5 MB**
  (`content-length: 5242880` con header `warning: 299 wayback content truncated by "length"`, y
  `x-archive-orig-x-crawler-content-length` mostrando el tamaño real de ~20 MB y ~10,7 MB) — son
  capturas que vinieron de Common Crawl (`x-archive-src: CC-MAIN-...`), que trunca recursos grandes a
  un tope fijo. El archivo resultante no tiene `%%EOF` y `pdfinfo` no puede leerlo — se descartó en
  vez de guardar un PDF corrupto. **Gotcha nuevo para el skill de sourcing**: un 200 de Wayback con
  `warning: wayback content truncated by "length"` en el header es tan inútil como un 404, hay que
  chequear ese header (o simplemente correr `pdfinfo`) antes de dar por bueno un rescate de Wayback.

## Verificación hecha en esta sesión

2 PDF confirmados `PDF document` real (19,2 MB y 9,6 MB). Los 2 archivos truncados de Wayback se
descartaron explícitamente (no quedaron guardados).

## Dudas / pendientes

Si se quiere completar 2022/23 y 2023/24, el camino que falta probar es buscar la URL actual en
`udinese.it/club/compliance` (el club puede haber renombrado la subcarpeta en vez de borrar los
documentos) o pagar el Registro Imprese para esos dos ejercicios puntuales.

- Último chequeo: 2026-09-17.
