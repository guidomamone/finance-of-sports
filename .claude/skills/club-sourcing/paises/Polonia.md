# Polonia — sitio del club por la licencia PZPN; el registro RDF está bloqueado por IP

- Los clubes de Ekstraklasa y 1ª liga son S.A. y publican sus `sprawozdania finansowe` en una sección
  permanente (`/sprawozdania`, `/akcjonariusze`, `/wymogi-licencyjne`, "dokumenty licencyjne"), por
  el criterio F.01 de la licencia PZPN. Los ascendidos publican solo desde el ascenso.
- Si el club cotiza en NewConnect (GKS Katowice), el canal son los comunicados EBI/ESPI
  (`/komunikaty-ebi`, con PDF adjuntos).
- El repositorio RDF (`rdf-przegladarka.ms.gov.pl`) da "Access Denied" a una IP de EE.UU. (Imperva):
  gestión de Guido. `api-krs.ms.gov.pl/api/krs/OdpisAktualny/<KRS>?rejestr=P&format=json` responde,
  pero solo con razón social y KRS. Los espejos (`rejestr.io`, `imsig.pl`) son solo leads.
- Algunos clubes pisan el mismo archivo cada año (Cracovia, Zagłębie): el ejercicio viejo sale de
  Wayback con la captura de la fecha correcta.
- Ejercicio julio-junio o calendario según el club, con transiciones de 18 meses (Raków, Widzew,
  Wisła Kraków).
- Sitios que dan 403 a curl con UA corto: con UA de Chrome + `Referer` bajan. En los SPA (Legia,
  Jagiellonia), los links se sacan con `javascript_tool`.
- Otros deportes (vóley, básquet, speedway): no publican en el sitio; solo el RDF.
