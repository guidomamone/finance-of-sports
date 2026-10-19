# EFL — The Football League Limited (`gb-championship`, `gb-leagueone`, `gb-leaguetwo`)

**Ángulos**: regulador/país: agotado (Companies House 00080612, cuentas anuales desde 2007) · sitio oficial: no intentado (no hizo falta) ·
barrido: 1 (Sonnet, sesión Finanzas 4) — 2026-10-19

- Canal: Companies House, `node tools/companies-house-fetch.mjs 00080612 --list` (método en la skill `club-sourcing`, `paises/Reino-Unido.md`).
  La búsqueda por nombre no la encuentra ("The Football League Limited" no figura en los primeros resultados): el número sale de agregadores
  (Menna, Kompany). No confundir con The Football League (Community) Limited (06469948), otra sociedad en la misma dirección.
- Cierre 31 de julio. Presenta `Group of companies' accounts` (grupo consolidado) desde 2007.
- Bajado: ejercicio 2024-25 (cierre 31-07-2025, 64 páginas, escaneo) → `Ligas/Inglaterra/EFL/efl-group-accounts-2024-25.pdf`, con su `.md`
  (Tesseract eng, 200 dpi, psm 6; páginas 18 y 22, el informe del auditor, revisadas contra la imagen).
- Auditor: Grant Thornton UK LLP (Paul Bamber, 4-12-2025), opinión sin salvedades; sin incertidumbre material sobre la continuidad.
- La EFL organiza Championship, League One y League Two: la misma línea de auditoría va en los tres `ligaId`.
- Disponibles para más años: `--years <Y1,Y2> --root Ligas/Inglaterra --club "EFL" --slug efl`.
- Último chequeo: 2026-10-19.
