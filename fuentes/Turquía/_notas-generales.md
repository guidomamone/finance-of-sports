# Notas generales — Turquía (Süper Lig)

**Decimoséptimo país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-18,
continuación de un intento anterior cortado por rate-limit de sesión).**

## Los 18 clubes de la Süper Lig 2025/26 (confirmado por búsqueda al arrancar la sesión)

La TFF redujo la liga a 18 equipos a partir de esta temporada (antes eran más). Lista: Alanyaspor,
Antalyaspor, İstanbul Başakşehir, Beşiktaş, Eyüpspor, Fatih Karagümrük, Fenerbahçe, Galatasaray,
Gaziantep FK, Gençlerbirliği, Göztepe, Kasımpaşa, Kayserispor, Kocaelispor, Konyaspor, Çaykur
Rizespor, Samsunspor, Trabzonspor.

**Nota**: Gençlerbirliği y Samsunspor quedaron SIN archivo propio ni intento documentado en esta
sesión — se agotó el tiempo antes de llegar a ellos. Son los dos pendientes de arrancar de cero en
la próxima sesión de Turquía (ver también `TODO.md`, no editado por esta sesión — avisar a Guido en
el reporte).

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

## El browser tool estuvo CAÍDO toda esta sesión

Todo intento de `preview_start`/`navigate`/`computer` dio timeout de 300s ("the browser extension,
CDP, Apple Events may be stuck or unresponsive"), incluso después de cerrar pestañas, esperar, y
reintentar varias veces a lo largo de la sesión. No parece ser un problema de KAP en particular
(pasó igual al intentar abrir cualquier URL). Esto bloqueó:

- Completar los huecos de Beşiktaş (2015, 2019) y de Fenerbahçe (2025) en KAP.
- Reconstruir la serie de Trabzonspor en KAP (el club con peor cobertura de los 4 grandes).
- Extraer las URLs reales de Antalyaspor y Konyaspor (links renderizados por JS).
- Pasar el WAF/Cloudflare de `bjk.com.tr` y `fenerbahce.org` (ambos dieron HTTP 403 también a
  `curl`/WebFetch con distintos User-Agents).

**Recomendación para la próxima sesión de Turquía**: arrancar confirmando que el browser tool
responde ANTES de asumir que hace falta re-explorar todo desde cero — la mayoría de los pendientes
de esta sesión son "vuelve a andar con browser", no "no existe la fuente".

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

## Un gotcha nuevo de esta sesión: PDFs "corruptos" servidos como "Java serialization data"

Dos descargas separadas en esta sesión (Fenerbahçe 31-05-2025 heredado del intento anterior, y un
faaliyet raporu de Trabzonspor bajado en esta misma sesión) resultaron, al chequear con `file`, ser
"Java serialization data, version 5" en vez de PDF — mismo patrón las dos veces. Sospecha: alguna
respuesta de error/anti-bot de estos sitios (o de KAP) devuelve ese formato en vez de un HTML de
error normal, y quien las descargó (¿un proxy?, ¿el propio servidor bajo carga?) las guardó sin
chequear el content-type. **Moraleja para cualquier descarga en serie de este país**: correr `file`
sobre cada PDF bajado antes de darlo por bueno, no asumir que un HTTP 200 con tamaño razonable
significa que el contenido es el esperado.

## Cómo mantener esta nota

Actualizar si aparece un canal nuevo que sirva para más de un club (ej. si la TFF resulta tener
algún índice agregado que hoy no se encontró), o si se confirma/descarta la sospecha del gotcha de
"Java serialization data". Última sesión: 2026-09-18.
