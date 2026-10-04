# Rumanía — notas generales (sourcing de la Superliga, sesión 2026-10-03)

## Canal que funcionó: el sitio del club, obligado por el licenciamiento de la FRF

El reglamento nacional de licenciamiento de la FRF obliga a cada club a publicar en su web, en formato
estandarizado de la FRF: (a) balance ("Bilanț"), (b) cuenta de resultados ("Contul de profit și pierderi"),
con comparativo del año anterior (cada archivo trae 2 ejercicios), (c) presupuesto de ingresos y gastos
del Centrul de Copii și Juniori (CCJ, art. 19bis/19ter), (d) declaración de intermediarios (art. 67.01/45bis).
Cada primavera (marzo-abril) el club sube la tanda nueva y la anterior suele quedar o desaparecer (por eso
Wayback fue clave para los años viejos). Documentos de 1-3 págs. en LEI (RON), sin notas ni informe del
auditor en la mayoría (excepciones con notas: Sepsi OSK, Petrolul 2026, Oțelul 2021). La FRF dice que los
estados son "auditados" para la evaluación, pero la versión publicada no trae el informe: no asumir.

Los clubes son una mezcla: S.A. (FCSB, CFR Cluj, U Craiova, Rapid, Dinamo 1948) y asociaciones sin fines
de lucro / "consolidado" con la S.A. (Sepsi, Botoșani, Hermannstadt, Oțelul, Csíkszereda, U Cluj). Hay que
leer la carátula: las asociaciones y las S.A. consolidadas se presentan distinto.

## Registro estatal (Ministerul Finanțelor): NO sirve como fuente de PDFs

- `mfinante.gov.ro` ("Informații pentru contribuabili" / situații financiare, por CUI): servicio público y
  gratis, sin cuenta; por fuentes de terceros (contera.ro) muestra los INDICADORES principales del año
  (cifra de afaceri, resultado, empleados, activos, patrimonio), un año por vez; descarga de documento
  completo "a veces" y sin confirmar. Desde este entorno `mfinante.gov.ro/infocodfiscal.html` da 404 y
  `/apps/infocodfiscal.html` da ECONNRESET: no se pudo verificar si hay captcha. Los datos abiertos de
  `data.gov.ro` (dataset de situaciones financieras anuales por empresa) son indicadores en CSV, no PDF.
- Para este proyecto NO aporta el desglose de ingresos por rubro (entradas, patrocinio, TV, UEFA, traspasos),
  que es lo que el sitio muestra; lo da el formato de licenciamiento del club. Útil solo como control cruzado
  de totales (cifra de afaceri) por CUI. Gestión de Guido solo si hace falta ese control.
- Agregadores (`listafirme.ro`, `risco.ro`, `termene.ro`, `targetare.ro`, `confidas.ro`): solo leads, no se
  guardan.
- ASF/BVB (bolsa de Bucarest): ningún club de la Superliga cotiza hoy (FCSB y CFR no aparecen en BVB;
  las búsquedas solo devolvieron emisores no deportivos). Dead-end.

## Homonimias a vigilar

- U Craiova 1948 CS S.A. (`ucv1948.ro`, Liga 1) vs FCU Craiova 1948 (`fcuniversitatea.ro`, otro club, excluido).
- Dinamo 1948 S.A. (`dinamo1948.ro`) vs CS Dinamo București (`csdinamo.eu`, polideportivo del Ministerio del Interior).
- Rapid 1923 S.A. (`fcrapid.ro`) vs CS Rapid (`csrapid.ro`). FCSB S.A. vs CSA Steaua.

## Gotchas técnicos

- Wayback trunca capturas a 1.048.576 bytes (caso en Oțelul 2021, Hermannstadt 2018-19, FCSB P&L 2022-23 primera captura): listar capturas con length y elegir otra.
- Wayback por HTTP puerto 80 dejó de conectar en esta sesión: usar `https://web.archive.org/...`.
- `dinamo1948.ro/old/wp-content/...` ya devuelve HTML (200) en vez de PDF: ir directo a Wayback id_.
- `fcfarul.ro` está secuestrado por un sitio de casino; `fcbotosani.ro` da 523 (el dominio real es `fcbt.ro`); `cfrcluj.ro` está estacionado (el real es `cfr1907.ro`).
- U Cluj publicó 2020-2022 como imágenes PNG (no PDF) en el sitio viejo; no archivadas.
- Archivo "Bilant" suele ser balance + P&L + declaración juntos; ver la carátula antes de asumir.

## Clubes sin resolver
Farul, UTA Arad, Argeș, Unirea Slobozia: dominio oficial vigente no hallado/accesible por curl. Siguiente paso:
abrir con el Browser pane. Ver cada archivo de club.
