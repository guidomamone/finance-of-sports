# ANFP — Asociación Nacional de Fútbol Profesional (Chile) (`cl-primera`)

**Ángulos**: sitio oficial: agotado (`anfp.cl` publica los estados financieros anuales y las memorias) · regulador/país: no hizo falta · barrido: 1 (Sonnet y Claude,
sesión Finanzas 4) — 2026-10-19

- Entidad: Asociación Nacional de Fútbol Profesional (ANFP), corporación de derecho privado (Decreto 1034 de 1987), RUT 70.081.200-6 (Nota 1 de sus estados). Organiza la
  Primera División y la Primera B; no hay una sociedad operadora aparte. En `data/leagues.js` solo está `cl-primera`.
- Canal: `https://www.anfp.cl/gestion-financiera/` (estados financieros de 2016 a 2025, sin 2018) y `https://www.anfp.cl/gestion-institucional/` (memorias 2018-2025); gratis,
  sin login. Los enlaces son del tipo `?jet_download=<hash>`: bajan con `curl -L` y un User-Agent de navegador. También publica los de la Federación de Fútbol de
  Chile (FFCh, 2019-2024), que es otra entidad.
- Cierre 31 de diciembre. Bajado: estados financieros 2025 (58 páginas, digital, NIIF, en miles de pesos) → `Ligas/Chile/ANFP/anfp-estados-financieros-2025.pdf`, con su `.md`
  (pdftotext). Cubren toda la ANFP; el desglose por campeonato está en sus notas 19 y 20.
- Auditor: KAM Auditores Consultores Ltda. (Freddy Lizana S.), Santiago, 26-03-2026 (notas 18, 25, 26, 27 y 31 actualizadas el 20-05-2026), opinión sin modificaciones; el
  énfasis es la actualización de esas notas. El 2024 lo auditó otra firma (8-05-2025).
- Último chequeo: 2026-10-19.
