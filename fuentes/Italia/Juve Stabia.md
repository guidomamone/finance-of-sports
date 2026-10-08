# Juve Stabia

**Ángulos**: sitio oficial: agotado (`ssjuvestabia.it`, mapa Firecrawl de 5.000 URLs sin sección financiera; `juvestabia.it` no responde) · Wayback CDX: agotado (1 PDF en todo el dominio, el Codice Etico) · regulador/país: SEC/EDGAR — HALLAZGO (el dueño, Brera Holdings PLC, cotiza en Nasdaq y presentó los estados auditados del club) · búsqueda web: confirmó el canal · barrido: 1 (Sonnet) — 2026-10-07

- **Deporte**: Fútbol
- **Liga / competencia**: Serie B (Italia, 2ª división), Campania
- **Entidad legal**: Società Sportiva Juve Stabia S.r.l. (el 20-F de Brera la lista como "SS Juve Stabia SpA"); P.IVA 04246411211. Dueña: Brera Holdings PLC (Irlanda, Nasdaq; 100% desde dic 2025 según calcioweb.eu, antes tenía 34,62% y Langella el resto).
- **Estado**: 2 PDF descargados (impresos desde el HTML del exhibit de la SEC), sin cargar

## Sourcing Italia (2026-10-07), serie B

Canal inesperado: **el club no publica nada, pero su dueño es un emisor extranjero de la SEC** y tuvo que presentar los estados del club por la adquisición significativa (Reg. S-X). Form 6-K de Brera Holdings PLC, 2025-10-27, accesión 0001213900-25-102293 (`https://www.sec.gov/Archives/edgar/data/1939965/000121390025102293/`):

- **Exhibit 99.2** `ea025948901ex99-2_brera.htm`: estados auditados de SS Juve Stabia S.r.l. al **30/06/2024 y 30/06/2023** (más apertura al 01/07/2022). Auditor Ria Grant Thornton S.p.A. IFRS (primera adopción; no es el bilancio civilístico OIC del Registro Imprese), auditoría bajo US GAAS. Ingresos 3.910.360 / 2.780.959 EUR; resultado −1.986.746 / −1.396.040 EUR. → `Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.pdf` (61 págs, capa de texto).
- **Exhibit 99.3** `ea025948901ex99-3_brera.htm`: sin auditar, semestre al **31/12/2024** vs 2023. → `Clubes/Italia/Juve Stabia/Juve Stabia-semestral-2024-12-31-SEC-6K.pdf` (50 págs).
- Los PDF NO son el original de la SEC (son HTML): se imprimieron con Chrome headless desde el HTML bajado de EDGAR. Carátula validada: entidad y ejercicios correctos.

Ejercicio 2024/25 (cierre 30/06/2025): no hay estado propio. El **20-F de Brera Holdings** del ejercicio 2025 (presentado 2026-05-15, accesión 0001213900-26-057974, enmienda 2026-06-22) consolida a Juve Stabia; sirve de control, no es el balance del club. `https://data.sec.gov/submissions/CIK0001939965.json` lista todos los filings (Brera cambió de nombre a Solmate Infrastructure en oct 2026 y es un tesoro de Solana: puede que deje de informar sobre el club).

Contexto: Comisión independiente (`vigilanzasport.it`) le aplicó puntos de penalización en 2026 y contestó "truffa aggravata" a Domus S.r.l., la dueña anterior; amministrazione giudiziaria desde oct 2025 (ilfattoquotidiano.it, 2025-10-21). Cuidado al leer cifras de prensa: pueden mezclar a Domus con el club.

- Último chequeo: 2026-10-07.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2024 desde `Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.pdf` (sourceId `juvestabia-it-bilancio-2024-ifrs-sec-6k`).
