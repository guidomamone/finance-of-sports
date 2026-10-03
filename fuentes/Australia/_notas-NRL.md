# Australia (NRL) — notas generales

Barrido 1 (Sonnet) — 2026-10-03, clubes de la NRL (16 + Warriors en `fuentes/Nueva Zelanda/`).

## NRL / ARLC (contexto)

Australian Rugby League Commission publica el annual report (nrl.com/about-us/annual-reports/). Bajados a `Clubes/Australia/NRL (contexto)/`: 2021, 2022, 2023, 2024, 2025. **No desglosan los grants por club**: solo agregado ("Payments to Clubs" 243,7 M AUD en 2021 contra 239,2 M en 2020; "club grants" por separado de players y states). Los grants por club se infieren de la línea "NRL grant" que aparece en los estados de cada club (p. ej. Penrith PDRLFC 2025: 18,515 M; Cronulla 2024: 19,6 M).

URLs: `https://www.nrl.com/siteassets/about/annual-reports/41417-nrl-2025-annual-report_full_online_5.pdf`, `.../nrl-2024-annual-report.pdf`, `https://www.nrl.com/siteassets/2023/annual-report/nrl-gen23_1003-nrl-annual-report-23-fa_digi-spreads.pdf`, `.../nrl-gen22_7113-annual-report-2022_lr.pdf`, `.../2021-nrl-annual-report.pdf`. Más años (2014-2020) en la misma página.

## Método que funcionó (y se puede reusar para otros clubes de rugby league / AFL de Australia)

- **footyindustry.com/docs/ (SportsIndustryAU) es un espejo de annual reports de clubes australianos y de entes**: lista de clubes NRL en `https://footyindustry.com/index.php/documents/nrl-and-club-documents/` (incompleta). El CDX de Wayback del dominio completo `footyindustry.com` listó 764 PDFs, pero **no estaban todos**: Cronulla 2022 y 2023 respondían 200 en vivo y no figuraban en el CDX. Conviene probar directamente variantes del nombre (`<Club> <año> Annual Report.pdf`, carpeta `docs/` y `2025%20docs/`). Para clubes de socios/ASIC (Melbourne Storm, Canberra) las copias son escaneos del formulario ASIC.
- Un annual report del "club" NRL suele ser del **licensed club (leagues club) o del grupo**; la entidad NRL puede ser una controlada (Cronulla, Cowboys, Wests Tigers), una entidad hermana que publica por separado (Penrith: PRLC vs PDRLFC; Parramatta: PLC vs PNRL; Roosters), o una Pty/Ltd privada que no publica (Manly MWSE Ltd, Titans, Dolphins, Dragons Pty, Warriors).
- CDX de Wayback: para dominios grandes usar filtro server-side (`filter=original:(?i).*(financ|annual|report|account|statement).*` con `curl -G --data-urlencode`) y pasar la salida sin pipes complejos; las consultas sin límite devolvieron vacío/504 en varios intentos.
- Los `siteassets/crrl/...annual-report` de raiders.com.au son de la Canberra Region Rugby League (juveniles), no del club.
- Ejercicios: clubes de Sydney/Melbourne/Townsville cierran al 31-oct; Broncos al 31-dic. Penrith/Parramatta/Cronulla/Roosters/Bulldogs/Cowboys publican informes largos con estados auditados completos (Cowboys: "concise financial report").
