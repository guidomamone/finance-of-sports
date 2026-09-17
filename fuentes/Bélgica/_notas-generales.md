# Notas generales — Bélgica

Primer barrido de Bélgica (sesión 2026-09-17), tercer país nuevo de la lista de "30 mejores ligas
del mundo" recorrida en orden alfabético, inmediatamente después de Austria. La Pro League belga
2025/26 tiene 16 clubes (confirmado vía Wikipedia antes de arrancar): Anderlecht, Antwerp, Cercle
Brugge, Club Brugge, Charleroi, Dender EH, Genk, Gent, RAAL La Louvière, Mechelen, Oud-Heverlee
Leuven (OH Leuven), Sint-Truidense VV, Standard Liège, Royale Union Saint-Gilloise, Westerlo, Zulte
Waregem. **Los 16 quedaron cubiertos, con series largas en la mayoría** — el mejor resultado de todo
el proyecto hasta ahora en términos de profundidad histórica (310 PDFs reales bajados en una sola
sesión).

## 1. La Centrale des bilans / Centrale voor de balansen (BNB) — el mejor canal del proyecto

`consult.cbso.nbb.be` es el registro central de cuentas anuales del Banque Nationale de Belgique /
Nationale Bank van België: toda sociedad belga (NV/SA, BV/SRL, vereniging/ASBL que supere ciertos
umbrales) está obligada a depositar sus cuentas anuales, y la BNB las publica **enteras, gratis, sin
login** — igual que Companies House (Reino Unido) o el Unternehmensregister (Alemania), pero con una
ventaja que ninguno de los dos tiene: **es una API JSON pública y scripteable con `curl`, sin
necesidad de clicks reales ni sesión de navegador**, y sirve el PDF para CUALQUIER tipo de depósito
original (PDF, XBRL, ZIP, DISK, incluso algunos MICROFILM) — el propio servidor genera el PDF al
vuelo si hace falta.

**Los 2 endpoints, sin necesidad de browser tool para nada más que confirmar el número de empresa**:

1. Listar depósitos de una entidad (JSON):
   `https://consult.cbso.nbb.be/api/rs-consult/published-deposits?page=0&size=100&enterpriseNumber=<BCE>&sort=periodEndDate,desc&sort=depositDate,desc`
   — devuelve `totalElements`, y por cada depósito: `id` (UUID), `periodEndDate`, `modelName`,
   `type` (`Initial`/`Correction`), `enterpriseName`.
2. Bajar el PDF de un depósito:
   `https://consult.cbso.nbb.be/api/external/broker/public/deposits/pdf/<id>`
   — devuelve el PDF directo, sin autenticación, con `curl -H "User-Agent: Mozilla/5.0"` alcanza.

**Buscar el número de empresa (BCE/ondernemingsnummer)**: la propia interfaz de Consult tiene
búsqueda "By a word in the name", pero para nombres comunes ("Anderlecht") devuelve decenas de
asociaciones de copropietarios y resultados irrelevantes (limitado a 100 resultados). Más eficiente:
buscar el BCE por web search (ej. `"<Club>" NV numéro entreprise BCE jaarrekening`) o usar
**KBO Public Search** (`kbopub.economie.fgov.be`, gratis, sin login, el registro mercantil general
belga) y confirmar en la propia Centrale des bilans.

## 2. Gotcha central: identificar la entidad CORRECTA entre varios candidatos con nombre similar

**El hallazgo más importante y más caro en tiempo de esta sesión.** Casi todos los clubes tienen 2-3
entidades registradas bajo nombres parecidos (una ASBL/VZW histórica, una NV/SA/BV operativa, a
veces una subsidiaria de eventos/horeca/cantera) — y el nombre "obvio" NO siempre es la entidad
correcta:

- **Club Brugge** (BE 0460.444.251) estuvo registrado como **"DE KLOKKE"** hasta el ejercicio 2011
  (mismo número de empresa, renombrado a "Club Brugge" recién en 2012) — quien busque solo por
  nombre en vez de por número de empresa puede no encontrar los años 1999-2011 de la serie.
- **Zulte Waregem**: la entidad real con el turnover de primera división se llama **"GRENSVERLEGGEND
  NV"** (BE 0833.092.517) — ni "Zulte", ni "Waregem", ni "Essevee" aparecen en el nombre legal. La
  entidad que SÍ se llama "Sportvereniging Zulte Waregem" (VZW) tiene un turnover de apenas ~EUR
  440K, un orden de magnitud menor — claramente no es la operación futbolística.
- **Oud-Heverlee Leuven**: al revés que los dos casos anteriores — la entidad con nombre COMPLETO y
  esperable ("Oud-Heverlee Leuven" NV y también la VZW homónima) tienen el campo Omzet en blanco
  (esquema abreviado, empresa chica), mientras que la entidad con nombre corto y menos obvio, **"OH
  LEUVEN" BV** (BE 0668.426.703), es la que tiene el turnover real de Pro League (~EUR 34,5M).
- **Genk**: la entidad correcta, "K. RACING CLUB GENK 322", es una vereniging/ASBL con turnover real
  (~EUR 33,5M) — hay que distinguirla de "KRC Genk Horeca & Events NV", la subsidiaria de bares del
  estadio.
- **Westerlo**: la BV "KVC WESTERLO" (turnover real) vs. la VZW homónima "VC Westerlo" (turnover en
  blanco, probablemente cantera).

**Regla práctica que costó descubrir**: antes de dar por buena una entidad candidata, bajar su
depósito MÁS RECIENTE y comprobar el campo "Omzet"/"Chiffre d'affaires" (código `70` en el
Resultatenrekening) — si es una cifra de millones de euros consistente con un club de primera
división, es la correcta; si está en blanco o es de un orden de magnitud muy menor, es otra entidad
(cantera, asociación madre, subsidiaria patrimonial).

## 3. Esquema abreviado ("Verkort schema"/"Modèle abrégé"): el Omzet puede venir en blanco

Las sociedades belgas por debajo de ciertos umbrales de tamaño (facturación, balance, empleados)
pueden depositar el **esquema abreviado** en vez del completo. En el esquema abreviado, la sección
`RESULTATENREKENING` (cuenta de resultados) **no desglosa el Omzet** (cifra de negocios, código
`70`) — solo publica el agregado "Brutomarge"/margen bruto. Esto afecta a los años más antiguos de
casi todos los clubes (típicamente hasta 2013-2018, según el club) y a los clubes más chicos incluso
en años recientes (ej. RAAL La Louvière 2025). **Si se llega a cargar alguno de estos ejercicios al
sitio, no va a haber desglose de ingresos posible desde este documento** — haría falta otra fuente
(prensa de la época) para completar el dato, o cargar solo el resultado neto/patrimonio.

No es un patrón universal: Dender EH, pese a estar en esquema abreviado ("Verkort model
vereniging"), SÍ publica su Omzet completo — el umbral de exención parece depender de varios
criterios a la vez (tamaño de balance, empleados), no solo del tipo de esquema.

## 4. Límite de cobertura: PDF solo desde 1999 (o excepcionalmente 1998), aunque el metadato sea más viejo

Confirmado en 5 clubes distintos (Club Brugge, Standard Liège, Union Saint-Gilloise, Westerlo): los
depósitos ANTERIORES a 1999 aparecen listados en la API (con toda su metadata: fecha, modelo, tipo)
pero devuelven **404** al pedir el PDF. El caso más extremo es **Union Saint-Gilloise**, cuyo
listado incluye depósitos desde 1978 — pero ninguno anterior a 1999 es descargable. Westerlo es la
única excepción parcial: su ejercicio 1998 SÍ se pudo bajar (el único PDF pre-1999 de todo el
barrido). Conclusión: **1999 es el límite práctico de cobertura gratuita de la Centrale des bilans**,
consistente con lo que dice la propia web oficial de la BNB ("cuentas depositadas desde 1999").

## 5. Rate limiting (429): transitorio, se resuelve con un reintento

Pedir muchos PDFs seguidos (varios por segundo) genera ocasionalmente `HTTP 429 Too Many Requests`
en vez del PDF (con un cuerpo de error de 1.484 bytes, fácil de detectar por tamaño). No es un
bloqueo permanente: esperar unos segundos y reintentar la misma URL funciona siempre. Se agregó un
`time.sleep(1.5)` entre descargas al script usado en esta sesión para reducirlo, y aun así aparecen
algunos — conviene programar cualquier descarga masiva futura con reintento automático.

## 6. Sin agregado de liga entera tipo DFL/ÖFBL — pero sí un agregado de Deloitte, discontinuado

A diferencia de Alemania (DFL Finanzkennzahlen) y Austria (ÖFBL Finanzkennzahlen), **la propia Pro
League NO publica un PDF descargable con el balance+resultados de los 16 clubes juntos** — su
comunicado anual "Comptes annuels de la Pro League" (ej. el de comptes 2025, revisando los datos de
la Commission des licences / Licentiecommissie) es solo un artículo de prensa en `proleague.be`, sin
ningún link a un documento descargable.

Sí existe un agregado de otro tipo: **Deloitte Belgium publicó anualmente, en coedición con la Pro
League, un "Pro League Report"** — un estudio de impacto socioeconómico (no un balance contable club
por club, sino cifras agregadas de ingresos/costos/transferencias/impacto económico de toda la
liga). Se encontraron y bajaron **5 ediciones (2019 a 2023, cubriendo las temporadas ~2017/18 a
2021/22)** a `Clubes/Bélgica/_Deloitte-ProLeague-Report/` desde
`deloitte.com/be/en/Industries/tmt/research/deloitte-pro-league.html`. La serie parece
**discontinuada después de la edición 2023** — no se encontró ninguna edición más reciente (2024 o
2025) en el sitio de Deloitte ni mencionada en prensa. Vale la pena revisar de nuevo en una sesión
futura por si retomaron la publicación.

## Cómo mantener esta nota

Actualizar si se destraba la serie de Deloitte (nueva edición 2024/2025 en adelante), si se
confirma la naturaleza de las entidades "sobrantes" en Oud-Heverlee Leuven o Cercle Brugge (ver
dudas en sus archivos individuales), o si se encuentra un canal de agregado propio de la Pro League
con datos club por club (a diferencia del Deloitte, que es solo agregado de liga).
