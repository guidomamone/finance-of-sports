# Georgia — reportal.ge: el buscador es público, los documentos piden cuenta

- reportal.ge (SARAS), registro de informes anuales. Se consulta sin cuenta con POST JSON desde el
  mismo origen: `/en/Reports/Search {"q":"<texto en georgiano>"}` → `ID`/`Name`;
  `GET /en/Reports/OrgReports?q=<ID>` → años con informe depositado;
  `POST /en/Reports/OrgReportsByYear?q=<ID>&year=<año>` → el auditor es público, los documentos
  piden login (gestión de Guido, cuenta gratis).
- Los clubes son შპს; buscar en georgiano (`დინამო`, `საფეხბურთო კლუბი`).
- Dinamo Tbilisi publica el paquete de licencia en `fcdinamo.ge/m/u/ck/files/` (ya sin enlaces):
  se recupera por el CDX.
- `napr.gov.ge` (Registro Nacional): extractos pagos, sin balances.
- OCR `kat` + `eng`; las cifras salen ruidosas.
