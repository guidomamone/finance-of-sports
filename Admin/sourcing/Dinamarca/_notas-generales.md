# Notas generales — Dinamarca

Séptimo país nuevo de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético
(sesión 2026-09-17), inmediatamente después de Croacia. La Superliga danesa 2025/26 tiene 12 clubes
(confirmado vía Wikipedia antes de arrancar): AGF (Aarhus), Brøndby IF, FC København, FC
Midtjylland, FC Fredericia, FC Nordsjælland, OB (Odense Boldklub), Randers FC, Silkeborg IF,
SønderjyskE, Vejle Boldklub, Viborg FF. **Los 12 quedaron cubiertos, con series muy largas en
prácticamente todos** — junto con Bélgica, el mejor resultado de todo el proyecto en profundidad
histórica (307 documentos reales bajados en una sola sesión, entre 4 y 31 ejercicios por club).

## 1. El sistema de Erhvervsstyrelsen — mejor incluso que Bélgica: API oficial, gratis, y sin el
## bloqueo Cloudflare de la interfaz web

Dinamarca confirma la pista del pedido: el **CVR** (Det Centrale Virksomhedsregister), operado por
la Erhvervsstyrelsen (Danish Business Authority), obliga a TODA sociedad (A/S, ApS, P/S) a depositar
su årsrapport (balance + resultado + anexo + dictamen de auditor) y la publica gratis. La interfaz
web pensada para humanos (`datacvr.virk.dk`) está detrás de **Cloudflare** y devuelve solo el
challenge "Just a moment..." a un `curl` directo (mismo bloqueo que otros dominios oficiales en
Brasil/Bélgica, sección 3/14 del skill) — **pero el dominio raíz `virk.dk` SÍ carga sin bloqueo**, y
lo más importante: existe una **API pública de Elasticsearch, sin login ni API key, documentada por
la propia Erhvervsstyrelsen**, que resultó ser el mejor canal de todo el proyecto hasta ahora:

- **Buscar publicaciones de una entidad**:
  `http://distribution.virk.dk/offentliggoerelser/_search?q=cvrNummer:<CVR>&size=100&sort=regnskab.regnskabsperiode.slutDato:asc`
  — devuelve JSON con un `hit` por cada depósito (año/período, fecha de aprobación, y la lista de
  `dokumenter` con su `dokumentUrl`/`dokumentMimeType`).
- **Bajar el documento**: la propia `dokumentUrl` (dominio `regnskaber.virk.dk`) sirve el archivo
  directo — `curl --compressed` (o `requests` de Python, que decodifica gzip solo) alcanza, sin
  ningún token ni Referer especial (a diferencia del SIIS colombiano o el `auth`/`send` de la CMF
  chilena).
- Sin necesidad de `computer`/browser real en ningún punto del flujo — 100% scripteable, igual que
  la Centrale des bilans belga (sección 14 del skill), y más simple todavía porque no hace falta
  buscar el número de empresa vía un portal aparte: **`cvrapi.dk`** (`http://cvrapi.dk/api?search=
  <nombre>&country=dk`), un wrapper gratuito de datos CVR, devuelve el CVR (campo `vat`), la razón
  social exacta, dirección y forma societaria de un solo pedido — aunque tiene un **rate limit
  estricto por IP** (bloquea con `QUOTA_EXCEEDED` después de ~5-6 pedidos seguidos, se recupera en
  minutos) — para nombres ambiguos conviene alternar con WebSearch (`"<club>" A/S CVR nummer`, que
  casi siempre encuentra el número vía proff.dk/estatistik.dk/ownr.dk sin gastar cuota).

**Formato de archivo según antigüedad**: `image/tiff` (escaneos, sin capa de texto) para ejercicios
hasta ~2011-2013 según el club; `application/pdf` con capa de texto real (más `application/xml`,
el XBRL) desde ese punto hasta 2020-2022; y desde ahí en adelante, `application/xhtml+xml` (el
informe ESEF/iXBRL completo, HTML con las etiquetas XBRL inline) como formato principal — el
regulador dejó de generar un PDF de verdad para el iXBRL y en su lugar produce **un PDF de 1 sola
página que es solo una carátula genérica** ("PDF generado por erhvervsstyrelsen.dk", sin contenido
real) en paralelo al XHTML — confirmado con Brøndby 2024/25 (el PDF pesaba 1.441 bytes). **Gotcha
para cualquier descarga futura**: si el `dokumentType` incluye tanto `pdf` como `xhtml`/`zip` para un
mismo ejercicio y el PDF pesa menos de ~10 KB, es la carátula vacía — usar el `.xhtml` (que sí tiene
el contenido completo, típicamente 0,4-50 MB) en su lugar. El único caso real de esta sesión (de 307
documentos) fue Brøndby 2024/25, ya corregido.

## 2. Ejercicio fiscal: varía por club, y varios cambiaron de fecha de cierre a mitad de serie

Como en Reino Unido (sección 9 del skill), varios clubes tienen períodos de TRANSICIÓN más largos o
más cortos que 12 meses cuando cambiaron su fecha de cierre de ejercicio — nombrados con sufijo
`-transicion` y ambos años en el nombre de archivo:

- **Brøndby**: calendario (ene-dic) 1995-2022, después un período de TRANSICIÓN de 18 meses
  (01/01/2023 a 30/06/2024, `aarsrapport-2023-2024-06-30-transicion.xhtml`), y desde ahí julio-junio.
- **PARKEN Sport & Entertainment A/S** (holding de FC København, ver sección 3): julio-junio hasta
  2006, transición de 18 meses (01/07/2006 a 31/12/2007,
  `aarsrapport-2006-2007-12-31-PSE-consolidado-transicion.tif`), calendario desde 2007.
- **SønderjyskE**: julio-junio hasta 2021/22, transición de 15 meses (01/07/2022 a 30/09/2023,
  `aarsrapport-2022-2023-09-30-transicion.xhtml`), después octubre-septiembre.
- **FC Midtjylland**: julio-junio hasta 2022/23, un ejercicio de 13 meses (01/07/2023 a 31/07/2024,
  sin sufijo especial por ser una desviación menor — un mes), después agosto-julio.

**Antes de cargar cualquiera de estos ejercicios de transición al sitio**, releer la nota de
"Precisión antes que velocidad" del `CLAUDE.md`: no son 12 meses y comparar contra un ejercicio
normal de 12 meses sin ajustar distorsionaría cualquier serie temporal.

## 3. FC København: el mismo problema de perímetro que México/Ollamani y EEUU/SEC, con un giro nuevo

**F.C. København no tiene una sola entidad limpia** — mismo patrón de "perímetro mezclado" que
Ollamani/Club América (sección 7 del skill) y MSG Sports/Atlanta Braves Holdings (sección 10), pero
acá con una complicación adicional: la entidad CAMBIÓ a mitad de la serie.

- **PARKEN Sport & Entertainment A/S** (CVR 15 10 77 07, cotiza en Nasdaq Copenhagen) es la holding
  histórica: 30 ejercicios (1995/96-2025) bajados a
  `Clubes/Dinamarca/FC København/aarsrapport-<fecha>-PSE-consolidado.<ext>`. Es un **consolidado**
  que mezcla el fútbol masculino con el estadio Parken, retail/eventos (PARKEN Services A/S,
  PARKEN Ejendomme A/S) y — desde 2024 — el fútbol femenino (F.C. København Kvindefodbold A/S,
  CVR 44 66 69 36, NO bajado en esta sesión, queda como pendiente si se quiere ese perímetro
  específico). El propio informe de 2025 lo confirma texto: "F.C. København P/S' finansielle
  forhold er omfattet af koncernens aftale med hovedbankforbindelsen [...] PARKEN Sport &
  Entertainment A/S."
- **F.C. København P/S** (CVR 43 95 21 61) es una entidad NUEVA, constituida recién el 29/03/2023
  — el primer ejercicio es un stub de 9 meses (29/03/2023-31/12/2023). Parece ser el vehículo legal
  que desde 2023 aísla específicamente la operación de fútbol masculino profesional (a diferencia
  de la P/S encontrada en Colombia/Brasil, acá el motivo del P/S — Kommanditselskab/partnership —
  no se confirmó, podría ser fiscal, como en otros clubes daneses que usan P/S para el IVA sobre
  ingresos de patrocinio). Solo 3 ejercicios disponibles (2023 stub, 2024, 2025) —
  `Clubes/Dinamarca/FC København/aarsrapport-<fecha>.<ext>` (sin sufijo).
- **No se confirmó si existía una entidad "solo fútbol" (P/S o A/S) ANTES de 2023** — es posible que
  el fútbol masculino estuviera directamente dentro de PARKEN Sport & Entertainment A/S sin
  desglose propio hasta la reestructuración de 2023. Duda anotada en `dudas-por-club.md`.

## 4. OB (Odense Boldklub): mismo patrón de perímetro mezclado que FC København, sin entidad propia

La entidad con toda la serie (30 ejercicios, 1995/96-2025) es **Odense Sport & Event A/S**
(CVR 71 17 21 12) — el propio informe 2021 lo confirma en texto ("OB kvalificerede sig ikke til
top-6 i Superligaen..."), pero el objeto social de la sociedad es explícitamente ferias/congresos/
hoteles/eventos/**fútbol profesional**, todo junto — mismo patrón que PARKEN Sport & Entertainment
o Ollamani (México). **La entidad "Odense Boldklub" a secas (CVR 62 97 92 16) es una asociación sin
fines de lucro (Forening) sin ningún depósito en el registro** (0 resultados en la API) — confirmado
que NO es un canal alternativo.

## 5. Gotcha de identidad: 3 clubes cambiaron de razón social sin cambiar de CVR

Mismo patrón que Club Brugge/"De Klokke" en Bélgica (sección 14 del skill) — la entidad es
continua, solo cambió de nombre en algún punto de la serie:

- **AGF**: CVR 83 83 99 10 figuraba como **"Aarhus Elite A/S"** en los ejercicios hasta 2018/19 al
  menos, renombrada a "AGF A/S" para 2019/20. Serie de todos modos continua y correcta.
- **Odense Sport & Event A/S** (ver sección 4): la búsqueda web mostró varios nombres candidatos
  históricos para el mismo negocio ("Odense Boldklub A/S", "Odense Boldklubs Professionelle
  Fodboldafdeling A/S", "Odense Fodbold Club A/S") — no se confirmó si alguno de esos es un nombre
  histórico de este MISMO CVR o una entidad distinta ya disuelta; los PDF legibles (2014 en
  adelante) ya dicen "Odense Sport & Event A/S" de forma consistente.
- **PARKEN Sport & Entertainment A/S**: sin cambio de nombre confirmado en toda la serie (1995-2025).

## 6. Sin agregado de liga entera tipo DFL/ÖFBL — no se encontró, no se buscó a fondo

A diferencia de Alemania y Austria, no se investigó en esta sesión si la Divisionsforeningen Danmark
(la organización de clubes profesionales daneses, gestiona Superliga+1. Division) publica algún
informe agregado tipo Deloitte Pro League Report (Bélgica) o Finanzkennzahlen (Alemania/Austria) —
con las 12 entidades individuales cubiertas con series tan largas, no hizo falta. Queda como pista
sin explorar si se retoma Dinamarca.

## Cómo mantener esta nota

Actualizar si se confirma la entidad "solo fútbol" pre-2023 de FC København (sección 3), si se
decide bajar F.C. København Kvindefodbold A/S como perímetro alternativo, o si aparece un agregado
de liga entera de la Divisionsforeningen (sección 6).
