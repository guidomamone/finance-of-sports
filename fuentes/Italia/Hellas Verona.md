# Hellas Verona (Hellas Verona FC)

**Ángulos**: sitio oficial: agotado para lo que Wayback conserva · Wayback CDX: agotado (2 CDN: `media.hellas-production.aks.mwd.cloud` y `hellas.hqcdn.it`) · búsqueda web: no intentada · regulador/país: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Hellas Verona Football Club S.p.A., propiedad de Maurizio Setti. No cotiza.
- **Canal**: `hellasverona.it/en/club/relazione-e-bilanci` — la página oficial en sí es un
  **gotcha confirmado**: el botón "CLICK HERE" de esa sección apunta a la versión en italiano de la
  MISMA URL (`hellasverona.it/club/relazione-e-bilanci`, sin `/en/`), que devuelve exactamente la
  misma página en bucle — no hay forma de navegar a un listado real desde la UI del sitio. Los PDF
  reales viven en un CDN aparte (`hellas.hqcdn.it`) y solo se encontraron por búsqueda directa.

## Qué se bajó (sesión 2026-09-17)

**1 ejercicio (2 archivos: individual + consolidado)**, en `Clubes/Italia/Hellas Verona/`:
`Hellas-Verona-bilancio-individuale-2023.pdf` y `Hellas-Verona-bilancio-consolidato-2023.pdf`
(ejercicio cerrado 30 de junio de 2023).

- **2024 y 2025 confirmados por prensa pero sin PDF localizado**: calcioefinanza.it y
  tuttohellasverona.it detallan cifras completas de ambos ejercicios (utilidad de 3,9M en 2024,
  pérdida de 4,7M en 2025), pero no se encontró el PDF en `hellas.hqcdn.it` ni probando variantes
  obvias del nombre de archivo (`hvfc-bilancio-2024.pdf`, `bilancio-consolidato-2024.pdf`, etc. — 8
  variantes probadas, todas 404).

## Verificación hecha en esta sesión

2 PDF confirmados `PDF document` real, 531 KB y 476 KB.

## Dudas / pendientes

Retomar 2024 y 2025 con una búsqueda de la URL exacta (`site:hellas.hqcdn.it`) en una sesión futura,
o directamente reportarle al club que el link de "Relazione e bilanci" de su propio sitio en inglés
está roto (bucle a sí mismo) — candidato de `dudas-por-club.md`.

- Último chequeo: 2026-09-17.

## Sesión de sourcing Italia (2026-10-03): +4 ejercicios (2020, 2021, 2022, 2025), total 5 años

El sitio nuevo solo expone el último ejercicio, pero Wayback conservó los dos CDN anteriores. Se
listó el prefijo de ambos (`media?f=2021/03/`, `2022/03/`, `2023/04/`, `2026/03/`) y se bajaron,
con carátula confirmada (Hellas Verona Football Club S.p.A.): bilancio individual al 30/06/2020,
30/06/2021, 30/06/2022 y **30/06/2025** (este último en `hellas.hqcdn.it/media?f=2026/03/`, con
sobre Docusign) + la "Situazione consolidata al 30 giugno 2021" (FIGC/Co.Vi.So.C., art. 85 NOIF, NO
es un consolidado auditado completo). En `Clubes/Italia/Hellas Verona/`.

- Ya estaba 2023 (individual + consolidado); con esto la serie es 2020, 2021, 2022, 2023, 2025. **Falta
  2024** (prensa lo confirma).
- El consolidado al 30/06/2020 vino TRUNCADO a 1 MiB en la captura grande; la otra captura
  (`bt-hellas-verona-consolidato-30-06-2020_compressed.pdf`) es un escaneo de 3 páginas. No se guardó.
- Hay más piezas en el mismo CDN (relazione sulla gestione, relazione di revisione, collegio sindacale,
  verbale) por año; no se bajaron porque no son el bilancio.

- **Color de marca**: `#002F6C` (azul) — gialloblù con azul predominante (it.wikipedia, Hellas_Verona_Football_Club); desempate por el theme-color de hellasverona.it. Elegido por Claude (Guido delega el color, 2026-10-06), verificado 2026-10-06.

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2020 desde `Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.pdf` (sourceId `hellasverona-it-bilancio-individuale-2020`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2023 desde `Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.pdf` (sourceId `hellasverona-it-bilancio-individuale-2023`).
