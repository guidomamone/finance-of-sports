# Notas generales — Turquía (Süper Lig)

**Decimoséptimo país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-18 y su
continuación, misma fecha — la primera se cortó por rate-limit, la segunda por el Browser pane
caído toda la sesión; esta tercera sesión, también 2026-09-18, empezó confirmando que el Browser
pane ya respondía y pudo completar casi todo lo que había quedado pendiente).**

## Los 18 clubes de la Süper Lig 2025/26 (confirmado por búsqueda al arrancar la sesión)

La TFF redujo la liga a 18 equipos a partir de esta temporada (antes eran más). Lista: Alanyaspor,
Antalyaspor, İstanbul Başakşehir, Beşiktaş, Eyüpspor, Fatih Karagümrük, Fenerbahçe, Galatasaray,
Gaziantep FK, Gençlerbirliği, Göztepe, Kasımpaşa, Kayserispor, Kocaelispor, Konyaspor, Çaykur
Rizespor, Samsunspor, Trabzonspor.

**Nota**: Gençlerbirliği y Samsunspor ya tienen archivo propio (`fuentes/Turquía/Gençlerbirliği.md`,
`fuentes/Turquía/Samsunspor.md`, creados sesión 2026-09-18) pero con solo un chequeo superficial —
ningún sitio oficial de ninguno de los dos tiene una sección de tipo "Mali Tablolar" visible en el
menú principal, pero no se agotaron los ángulos (rutas directas, Wayback, prensa). Quedan como
pendiente de profundizar, no como dead-end confirmado.

## El patrón que domina el país: dos niveles de transparencia muy distintos

1. **Los 4 grandes (Galatasaray, Fenerbahçe, Beşiktaş, Trabzonspor)** son un caso INUSUAL en el
   fútbol mundial: el club-asociación (dernek) en sí es dueño mayoritario de una sociedad anónima
   que cotiza DIRECTAMENTE en Borsa İstanbul, sin holding intermedia — así que estos 4 están sujetos
   al disclosure obligatorio de **KAP** (Kamuyu Aydınlatma Platformu, `kap.org.tr`), el equivalente
   turco a EDGAR/HKEXnews. Series largas (Galatasaray: 2013-2025 completo; Fenerbahçe: 2013-2024;
   Beşiktaş: 2006-2024 con 2 huecos), auditadas, en PDF con capa de texto.
2. **Los 14 restantes** son clubes-asociación (dernek) comunes, sin obligación de disclosure de
   mercado de capitales. Su única obligación de transparencia viene de la **licencia de club de la
   TFF/UEFA** (mismo patrón que Croacia/HNS, Italia, Países Bajos/KNVB F.04 — ver skill de
   sourcing), que en la práctica se traduce en que MUCHOS (no todos) publican una página "Mali
   Tablolar" en su propio sitio con el bilanço/gelir tablosu/nakit akım tablosu exigidos por la TFF
   y, si compiten en Europa, también por UEFA. Confirmado con contenido real para Alanyaspor,
   Gaziantep FK, Kasımpaşa, Fatih Karagümrük, İstanbul Başakşehir, Kocaelispor. Confirmado que la
   página EXISTE pero no se pudo extraer (JS/WAF) para Antalyaspor y Konyaspor. Sin encontrar nada
   para Göztepe, Kayserispor, Çaykur Rizespor, Eyüpspor (no necesariamente dead-ends estructurales,
   ver cada archivo de club).

**La TFF en sí (`tff.org/default.aspx?pageId=461`) NO es un canal útil**: esa página son los
estados financieros de la FEDERACIÓN misma, no un índice de sus clubes afiliados.

## KAP: cómo funciona, y por qué esta sesión no pudo navegarlo a fondo

- URL de resumen por empresa: `kap.org.tr/tr/sirket-finansal-bilgileri/<id>-<slug>` (fácil de
  encontrar por búsqueda, y SSR — fetchable con WebFetch/`curl` sin problema, muestra 2-4 años de
  resumen).
- URL de listado de bildirim (disclosures) por empresa:
  `kap.org.tr/tr/bildirim-sorgu-sonuc?member=<hash>&disclosureClass=FR` — **el filtro de fecha por
  defecto es SOLO el último año** (hoy - 365 días), y NO se pudo ampliar por URL (los parámetros
  `fromDate`/`toDate`/`baslangicTarihi`/`bitisTarihi` probados fueron ignorados o dieron error).
  Hay que ampliarlo a mano en la UI (¡Bildirim Sorguları → Detaylı Sorgulama), lo que requiere JS.
- Cada fila de resultado es un botón con `onClick` de React, NO un `<a href>` — así que ni `curl`
  ni WebFetch (que convierte HTML a markdown, preservaría un `href` si existiera) pueden extraer el
  link de descarga de una fila individual. El link de descarga real, cuando SÍ se tiene el ID
  numérico del bildirim (`kap.org.tr/tr/Bildirim/<id>`, indexado a veces por Google), tiene la forma
  `kap.org.tr/tr/api/file/download/<hash-largo>` y ESE sí es fetchable directo.
- **Conclusión práctica**: KAP es plenamente utilizable, pero solo con un browser real con JS
  (confirmado que así se armó la serie de los 3 primeros grandes en el intento anterior a esta
  sesión). Sin browser, el único atajo es buscar bildirim IDs específicos ya indexados por Google —
  funciona para casos sueltos, no para reconstruir una serie completa.

## El browser tool estuvo CAÍDO toda la sesión anterior — en ESTA sesión (2026-09-18, continuación)
## volvió a funcionar normalmente

La sesión anterior documentó timeouts de 300s en todo intento de `preview_start`/`navigate`/
`computer`. Esta sesión arrancó confirmando el estado con un `preview_start` simple a
`kap.org.tr` — respondió al primer intento, sin timeout, y se mantuvo estable durante las 2+ horas
de trabajo que siguieron (decenas de navegaciones dentro de KAP, Antalyaspor, Wayback Machine,
Bing). **Conclusión: fue un problema transitorio de esa sesión puntual, no algo estructural del
entorno** — no hace falta ningún workaround especial, solo confirmar el estado al arrancar (como
ya recomendaba la nota anterior).

Con el browser disponible, esta sesión pudo:
- Completar los huecos de Beşiktaş (2014/15, 2018/19) y de Fenerbahçe (2024/25) en KAP.
- **Reconstruir la serie COMPLETA de Trabzonspor en KAP: 2015/16-2024/25, 10 ejercicios sin ningún
  hueco** — el club pasó de ser el de peor cobertura de los 4 grandes a tener serie completa.
- Confirmar que Antalyaspor es un **dead-end genuino** (no un problema de JS/renderizado como se
  sospechaba — ver `fuentes/Turquía/Antalyaspor.md`).
- Resolver la duda de `dudas-por-club.md` sobre el año de IPO de Trabzonspor (2005, confirmado
  leyendo el propio İzahname ya descargado).
- Un primer chequeo superficial (no exhaustivo) de Gençlerbirliği y Samsunspor, sin hallazgos.

**Gotcha de UI nuevo de KAP, específico del formulario "Detailed Search"**: los desplegables
(Companies, Date Interval, calendarios de Start/End Date) son visualmente muy inconsistentes con
clicks automatizados — el mismo click en las mismas coordenadas a veces abre el desplegable/
calendario esperado y a veces lo cierra todo (incluido el acordeón padre "Company and Date
Criterias"), sin patrón 100% predecible. Lo que SÍ funcionó de forma confiable: (1) para
seleccionar una empresa, usar `find` + click por `ref` en el texto del nombre completo de la
empresa en vez de intentar clickear el checkbox por coordenada; (2) para navegar el calendario,
click en el ícono de calendario (no en el texto de la fecha) para abrirlo, click en el header
"<Mes> <Año>" para pasar a la grilla de años, click en el año, click en el mes, click en el día —
cada paso con un `wait` de ~0.5-1s antes de la screenshot de verificación (sin el wait, la UI
muestra un estado a medio renderizar que lleva a clickear en el lugar equivocado); (3) el rango de
fechas tiene un límite duro de 1 año exacto — hay que hacer una búsqueda por año calendario para
cubrir series largas, no se puede pedir todo de una.

**Gotcha nuevo de KAP: formato de disclosure "Financial Report" cambió con el tiempo.** Para
ejercicios de ~2015-2016 (los más viejos revisados esta sesión), un solo período de Financial
Report aparece como 5 bildirim separados (Statement of Financial Position, Profit or Loss, Cash
Flow, Statement of Changes in Equity, Notes) — pero los 5 apuntan al MISMO archivo PDF (confirmado
comparando SHA-256, idéntico en los 5). Para ejercicios más recientes (2017 en adelante en los
casos vistos) es un solo bildirim con el juego completo. No hace falta bajar los 5 cuando aparece
el formato viejo, con uno alcanza.

## Otros dos canales propios encontrados, con URLs legibles por año (buen patrón a imitar)

- `galatasaray.blob.core.windows.net/files/...` — Azure Blob Storage propio de Galatasaray, con
  rutas por año/período. No explorado a fondo (la serie de KAP ya estaba completa) pero confirmado
  que tiene años que KAP también tiene, útil como backup/verificación cruzada.
- `cdn.alanyaspor.org.tr/upload/financialStatements/<año>-mali-tablolar<slug><hash>.pdf` — de los
  pocos clubes chicos con URLs estables y sin WAF, aunque con un hash corto al final de cada
  nombre que sí hay que confirmar por año (no es 100% adivinable).

En cambio `cdn.trabzonspor.org.tr/trabzonspor_<hash-hex-32>.pdf` es un hash totalmente opaco, sin
ningún componente legible — solo sirve para rescatar documentos ya indexados por buscadores, no
para explorar sistemáticamente.

## El gotcha de PDFs "corruptos" servidos como "Java serialization data": CAUSA RAÍZ encontrada y
## resuelta esta sesión (2026-09-18, continuación)

La sesión anterior había detectado el síntoma (PDFs de KAP que `file` reporta como "Java
serialization data, version 5") sin encontrar la causa. **Causa raíz confirmada esta sesión: NO es
un error/anti-bot — es el formato real en el que el endpoint
`kap.org.tr/en/api/file/download/<hash>` sirve el archivo cuando se lo pide con `curl` directo
(sin las cookies/headers de sesión de un browser real).** El servidor envuelve el PDF real dentro
de una serialización Java de un `byte[]` (header fijo `AC ED 00 05 75 72 00 02 5B 42 ...`, luego un
int de 4 bytes con el largo, y recién ahí el contenido real) — un `curl` normal descarga ese
wrapper completo sin poder interpretarlo, un browser real con las cookies correctas en cambio
recibe el PDF crudo con `Content-Type: application/pdf`.

**Solución que funcionó en TODAS las descargas de esta sesión** (Fenerbahçe 2024/25, Beşiktaş
2014/15 y 2018/19, los 10 ejercicios de Trabzonspor): en vez de `curl`, usar `fetch()` dentro del
Browser pane (misma sesión/cookies), convertir la respuesta a base64 en JS, y del lado de Bash
buscar el offset del magic byte `%PDF` (`25 50 44 46`) en los bytes decodificados y recortar desde
ahí hasta el final del buffer — el resto es el PDF completo y válido (confirmado con `pdfinfo` en
las 13 descargas de esta sesión, sin un solo caso corrupto). Cuando el PDF final supera ~500 KB en
base64, el resultado del `javascript_tool` se trunca automáticamente en varios chunks guardados en
un mismo archivo JSON de `tool-results/` — hay que concatenar el campo `text` de TODOS los
elementos del array antes de decodificar, no solo el primero (afecta a archivos base64 de más de
~1.5M caracteres aprox.).

## Cómo mantener esta nota

Actualizar si aparece un canal nuevo que sirva para más de un club (ej. si la TFF resulta tener
algún índice agregado que hoy no se encontró). Última sesión: 2026-09-18 (segunda continuación,
browser pane ya funcionando).
