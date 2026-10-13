# Notas generales — Malta

**País nuevo del sourcing del 2026-10-08.** Sin archivo de país en `club-sourcing`: esto es lo que se aprendió.

## Canal: Malta FA (CMS) y sitio del club

- La Malta FA publica los **estados financieros de cada club de la Premier League** (requisito del licenciamiento de clubes) en `cms.mfa.com.mt/media/<id>/<nombre>.pdf`. Nombres: `<club>-financial-report-2022.pdf` / `-2023.pdf` (ojo: Hibernians es `hibs-` en 2023), `<club>-fc-financial-statement-2024.pdf` (`hamrun-s-fc`, `sliema-w-fc`) y, en 2025, `<abrev>_fs.pdf` (`bkr`, `flo`, `gzr`, `hmr`, `mxk`, `vlt`). El id solo no sirve: hace falta el nombre exacto, así que se descubrieron probando (`HEAD` con User-Agent de navegador) rangos de ids contiguos.
- Todos son **escaneos sin texto**: OCR para transcribir. Balance anual a 31 de diciembre, en EUR.
- Cobertura: 2022 solo Balzan, Birkirkara, Gzira, Hibernians y Mosta; 2023 nueve clubes; 2024 seis (faltan Balzan, Gzira, Valletta); 2025 seis (Birkirkara, Floriana, Gzira, Hamrun, Marsaxlokk, Valletta). No aparecen Floriana/Hamrun/Marsaxlokk/Sliema/Valletta de 2022 ni nada de 2021 o antes (probadas variantes de nombre en los ids 12928-12950).
- Valletta publica además en su sitio (`vallettafc.mt/financial-statements/`, certificado inválido: `curl -k`), 2021 y 2025.
- La propia Malta FA publica su balance y memoria (`annual-report-20xx.pdf`, «extract of financial statements»): es una asociación, no un club; no se bajó.
- Pendiente: clubes de la Challenge League y de otras divisiones (Tarxien, Naxxar, Pembroke, Lija, Senglea, Żebbuġ, Santa Lucia, Gudja, Għaxaq) y Gozo; buscar con Exa «<club> financial statements».
