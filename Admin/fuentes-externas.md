<!-- md: términos de las fuentes externas (Wikipedia, RSSSF, bancos centrales) | leer: antes de publicar datos de una fuente externa nueva -->
# Fuentes externas: de dónde sale cada dato que no viene de un documento del club, y qué permite

Lo que se publica en el sitio (`terminos.html`, "Licencia y reuso"; `metodologia.html`, "Fuentes externas") sale de acá. La licencia
la decidió Guido: el **Formato simplificado** (trabajo propio: categorías comunes, conversión a dólares, ajuste por inflación) va bajo
CC BY-NC 4.0; el uso comercial (reventa, producto pago, descarga masiva, otra API) necesita licencia comercial, y la API, cuando exista,
es paga para todos. Nada de terceros entra en lo que se cobra. Los documentos de los clubes y sus transcripciones no llevan la licencia
del sitio. El código queda con todos los derechos reservados.

Los términos se leyeron en la página de cada fuente (columna URL). "No encontrado" = no hay página de términos o no se pudo abrir: no se
supone nada. Antes de usar una fuente nueva, sumala acá.

## Dónde se usa cada una

| Dato | Fuente | Dónde vive |
|---|---|---|
| Qué clubes juegan cada liga | Wikipedia (páginas de temporada, API de MediaWiki) | `tools/fetch-club-league-reference.mjs` → `tools/club-league-reference/`, `data/club-leagues/` |
| Estadio, capacidad, sponsor, marca | Wikipedia, revisión fijada (oldid): páginas de temporada y, para sponsor y marca que falten, la tabla de camisetas de la página del club (`--camisetas`) | `tools/estadio-sponsor.mjs` → `data/contexto/`, `data/sponsors.js`; lo manual en `tools/contexto-manual.json` |
| Presidentes (gestiones) | Wikipedia y prensa, con `fuente` por gestión | `tools/gestiones-tanda.mjs` → `data/gestiones/` |
| Tipo de cambio cuando el balance no declara uno (`FX_CLOSE`) | Bancos centrales (tabla de abajo) | `tools/fetch-fx-reference.mjs` → `tools/fx-reference/`, `data/currency-map.js` |
| Deflactores | BEA vía FRED (USD), Eurostat (EUR) | `fetch-fx-reference.mjs --deflactores` → `data/deflactores.js` |
| Colores de cada club | footylogos.com | `tools/fetch-brand-color-reference.mjs` → `tools/brand-color-reference/` |
| Socios de una sociedad brasileña (QSA del CNPJ), cuando el balance no dice quién es el dueño de una intermedia | BrasilAPI (espejo de la base pública de CNPJ de la Receita Federal), con url y fecha en la cita | `Admin/registros/entidades.jsonl` (cita externa) → `data/entidades/` |
| Pases | Ninguna: son datos de relleno ("Jugador A", montos inventados) en Boca, River y Racing | `data/ar/*-data.js`, `pasesData` |

## Términos de cada fuente

| Fuente | Licencia / términos | ¿Reuso con cita? | ¿Uso comercial? | Cita pedida | URL |
|---|---|---|---|---|---|
| Wikipedia (EN y ES) | CC BY-SA 4.0 (+ GFDL) | Sí | Sí (ES lo dice explícito) | Link al artículo, indicar cambios, aviso de licencia | es.wikipedia.org/wiki/Wikipedia:Derechos_de_autor |
| FRED, serie A191RD3A086NBEA | "Public Domain: Citation Requested" | Sí | La serie, sí; los términos generales de FRED piden permiso escrito para uso comercial | "U.S. Bureau of Economic Analysis, … [A191RD3A086NBEA], retrieved from FRED" | fred.stlouisfed.org/series/A191RD3A086NBEA |
| FRED (en general) | Términos legales de FRED | Las series con cita sí | Requiere permiso escrito; **prohíbe scraping y guardar copias** | "Source: X via FRED" | fred.stlouisfed.org/legal/ |
| BEA | Pautas de cita (organismo de EE.UU.) | Sí ("citations are appreciated") | No lo restringe | U.S. Bureau of Economic Analysis, tabla, URL, fecha | bea.gov/help/guidelines-for-citing-bea |
| Eurostat | Reuso libre con cita | Sí | Sí, salvo excepciones | "Source: Eurostat (DOI), fecha" | ec.europa.eu/eurostat/help/copyright-notice |
| BCE | Política de reuso de estadísticas del SEBC | Sí, sin modificar | Sí | "Source: ECB statistics" | ecb.europa.eu (usage policy) |
| BCRA | Aviso legal | Sí, con fines informativos, educativos o académicos | **No sin autorización previa** | "BCRA" | bcra.gob.ar/aviso-legal/ |
| BCB (PTAX) | ODbL | Sí | Sí | No especificada | dadosabertos.bcb.gov.br |
| Bank of England | OGL, pero **excluye tipos de cambio** (licencia de terceros) | Pide contactar | No (para esas series) | — | bankofengland.co.uk/legal |
| BIS | Terms of permitted use | Sí | Sí, sin cargo extra al usuario | BIS como fuente | data.bis.org/help/legal |
| TRM (datos.gov.co) | CC BY-SA 4.0 | Sí | Sí | "Superintendencia Financiera de Colombia" | datos.gov.co (dataset mcec-87by) |
| SII Chile | Términos del sitio | Sí | **No: uso personal; para uso público o comercial pide autorización escrita** | Mencionar la fuente | sii.cl/sobre_el_sii/terminos_sitio_web.html |
| BrasilAPI (CNPJ) | Código MIT; "Termos de Uso" en elaboración (beta): pide no consultar en forma automatizada ni masiva | No especificado | No especificado | No especificada | github.com/BrasilAPI/BrasilAPI (README, "Termos de Uso") |
| Banco de Rusia | "About the site" | Sí, con link | **Contradictorio** (un párrafo lo prohíbe) | Hipervínculo | cbr.ru/eng/about/ |
| CNB (Chequia) | Disclaimer | Sí, sin modificar | No lo prohíbe | CNB como fuente | cnb.cz (disclaimer-copyright) |
| HNB (Croacia) | Terms of use | Sí, sin alterar | No lo menciona | HNB como fuente | hnb.hr/en/terms-of-use |
| NBP (Polonia) | No encontrado ("All rights reserved") | — | — | — | api.nbp.pl/en.html |
| Norges Bank | Disclaimer | Sí | No lo menciona | Norges Bank | norges-bank.no/en/disclaimer/ |
| Riksbank | FAQ de la API | Sí | Sí | "Source: Sveriges Riksbank" (no si se procesó) | riksbank.se (FAQ API) |
| Statistics Denmark | CC BY 4.0 | Sí | Sí | "Own calculations based on data from Statistics Denmark" | dst.dk (kildeangivelse) |
| NBU (Ucrania) | Terms of use (no se pudo abrir) | Sí, con referencia | No determinado | Referencia | bank.gov.ua/en/useterms |
| TCMB / EVDS | Términos de EVDS + del sitio | Sí | EVDS sí sin cargo extra; el sitio pide permiso escrito | Citar la fuente | evds3.tcmb.gov.tr |
| footylogos.com | "Logo usage & rights" | Pide crédito | Remite a los titulares de las marcas | "FootyLogos.com" + link | footylogos.com/logo-usage-right |

## Consecuencias

- Mientras el sitio sea gratis, las restricciones comerciales (BCRA, SII, Banco de Rusia, Bank of England) no pesan: las cotizaciones se
  usan para convertir, no se venden.
- Para la API paga (to-do 249): un ejercicio convertido con una cotización de BCRA, SII, Banco de Rusia o Bank of England (`audit.js --fx`
  dice de dónde sale cada una) se sirve en la moneda del club, o se pide permiso antes.
- FRED prohíbe bajar con scripts y guardar copias: el deflactor de EE.UU. conviene bajarlo directo de la BEA (dominio público).
- Share-alike: lo de Wikipedia y la TRM de datos.gov.co va con CC BY-SA 4.0 y no se cobra. Wikipedia aclara que eso cubre la expresión,
  no los hechos.
