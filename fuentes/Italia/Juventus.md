# Juventus

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Juventus Football Club S.p.A., con sede en Torino (Via Druento 175), única
  entidad de las 20 de Serie A que **cotiza en bolsa** (Euronext Milan / Borsa Italiana, ticker
  `JUVE`) desde diciembre de 2001 — el mismo patrón "holding cotizante" ya visto en el proyecto
  (Manchester United plc en Reino Unido, Eagle Football Group en Francia, Ollamani en México), pero
  acá es la SOCIEDAD DEL CLUB la que cotiza directo, no un holding externo.
- **Canal**: sección Investor Relations propia (`juventus.com/en/club/investor-relations/statements/reports`),
  gratis, sin login, sin captcha — mejor lead individual de todo el barrido de Italia, como anticipaba
  el prompt de la sesión.

## Qué se bajó (sesión 2026-09-17)

**23 ejercicios, serie COMPLETA e ININTERRUMPIDA 2002/03-2024/25** (el "Annual Financial Report"/
"Reports and Financial Statements" de cada ejercicio, sin contar los informes semestrales/trimestrales
que el mismo selector también expone), en `Clubes/Italia/Juventus/`:

`Juventus-annual-financial-report-<ejercicio>.pdf` para cada temporada desde 2002-03 hasta 2024-25.
Es, hasta ahora, la serie histórica más profunda de CUALQUIER club de fútbol de todo el proyecto (más
larga que RB Leipzig en Alemania o Club Brugge en Bélgica) — comparable solo a las series de cricket
del Reino Unido.

- **Cómo se navegó**: la página tiene un `<select>` (combobox) con una opción por temporada, de
  2002/03 a 2026/27 — hay que setear su `value` (`season-YYYY-YY`) y esperar ~1 segundo a que la app
  React re-renderice antes de leer los `<a href>` con `.pdf`; leer inmediatamente después de fijar el
  valor devuelve todavía los links de la temporada anterior (stale render).
- Un solo archivo (2019-20) devolvió 404 en la primera pasada porque el selector mostró la URL con el
  segmento `/private/` en vez de `/upload/` — Cloudinary sirve el mismo PDF en ambos paths para
  algunos ejercicios, probar el otro segmento antes de descartar el link.

## Verificación hecha en esta sesión

Los 23 PDF confirmados como `PDF document` real con `pdfinfo`/`file`, entre 2,0 MB (2007/08) y 19,6 MB
(2016/17 y 2024/25). Ningún archivo truncado.

## Dudas / pendientes

Ninguna sobre el canal en sí. Falta, si se retoma, extraer los informes de auditoría por separado
(`Report on the audit of the (consolidated) financial statements`, disponibles del mismo selector
para varios ejercicios recientes) — no se bajaron en esta sesión porque el objetivo era el fascicolo
de bilancio en sí, no la documentación de auditoría suelta.

- Último chequeo: 2026-09-17.

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2012 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.pdf` (sourceId `juventus-it-annual-financial-report-2011-12`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2013 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2012-13.pdf` (sourceId `juventus-it-annual-financial-report-2012-13`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2014 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2013-14.pdf` (sourceId `juventus-it-annual-financial-report-2013-14`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2015 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2014-15.pdf` (sourceId `juventus-it-annual-financial-report-2014-15`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2025 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2024-25.pdf` (sourceId `juventus-it-annual-financial-report-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2016 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2015-16.pdf` (sourceId `juventus-it-annual-financial-report-2015-16`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2017 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2016-17.pdf` (sourceId `juventus-it-annual-financial-report-2016-17`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2018 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2017-18.pdf` (sourceId `juventus-it-annual-financial-report-2017-18`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2020 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2019-20.pdf` (sourceId `juventus-it-annual-financial-report-2019-20`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2021 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2020-21.pdf` (sourceId `juventus-it-annual-financial-report-2020-21`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2007 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2006-07.pdf` (sourceId `juventus-it-annual-financial-report-2006-07`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2009 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2008-09.pdf` (sourceId `juventus-it-annual-financial-report-2008-09`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2010 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2009-10.pdf` (sourceId `juventus-it-annual-financial-report-2009-10`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2019 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2018-19.pdf` (sourceId `juventus-it-annual-financial-report-2018-19`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2003 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2002-03.pdf` (sourceId `juventus-it-annual-financial-report-2002-03`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2004 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2003-04.pdf` (sourceId `juventus-it-annual-financial-report-2003-04`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2005 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2004-05.pdf` (sourceId `juventus-it-annual-financial-report-2004-05`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-03): ejercicio 2006 desde `Clubes/Italia/Juventus/Juventus-annual-financial-report-2005-06.pdf` (sourceId `juventus-it-annual-financial-report-2005-06`).
