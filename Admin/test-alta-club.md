# Test de `tools/alta-club.mjs` (2026-09-30)

Qué se probó: si el alta de un club nuevo y los datos de contexto de un ejercicio (id, nombre,
país, moneda, cierre del ejercicio, deporte, color, liga, tipo de cambio, tipo de documento,
perímetro) pueden salir por script, sin tokens de sesión, y cuánto queda como pregunta de criterio.
El script, sus reglas y de dónde sale cada campo están en la cabecera de `tools/alta-club.mjs`.

Estados de cada campo:

- **`ok`**: sale de una fuente mecánica.
- **`pregunta`**: hace falta criterio. Bloquea `--escribir`.
- **`pendiente`**: falta un dato, no un criterio. Se escribe el valor honesto de "nadie lo miró
  todavía": `brandColor` ausente, fila de liga en `null`, `fxRef` sin cotización cacheada. El audit
  lo sigue contando y no bloquea.

## 1. Resultado sobre toda la población (un `.md` por carpeta de club sin nada `cargado`)

Salieron del registro `Admin/transcripciones-estado.jsonl` las carpetas de club sin ningún
documento `cargado` que tienen al menos un `.md`: 164 carpetas. De cada una se tomó el `.md` más
reciente, con preferencia por los `listo`. Corrida completa: 16 s, 0 llamadas a API.

| | carpetas |
|---|---|
| Carpetas de agregado (empiezan con `_`), rechazadas | 6 |
| **Clubes que YA EXISTEN en el sitio** (ver 1.1) | 17 |
| Clubes nuevos analizados | 141 |
| … de esos, sin ninguna `pregunta` (el alta se podría escribir hoy) | **55 (39%)** |

**Campos `ok` por club nuevo** (16 campos: 8 del club y 8 del ejercicio): mínimo 50%, mediana 75% y
máximo 88%. En total, 1.698 `ok`, 425 `pendiente` y 136 `pregunta`: **75% ok**.

| Campo | ok | pregunta | pendiente | Comentario |
|---|---|---|---|---|
| id | 140 | 1 | 0 | La única pregunta es Celtic (no hay país Escocia). |
| name (legal) | 66 | 0 | 75 | Se busca el nombre del club junto a una forma societaria. Falla en griego, cirílico y coreano, y en `.md` sin encabezados: queda el nombre de la carpeta. |
| displayName | 141 | 0 | 0 | |
| country | 140 | 1 | 0 | Escocia. |
| reportingCurrency | 141 | 0 | 0 | |
| fiscalYearStart | 128 | 13 | 0 | Las preguntas son documentos que no son balances (informes de gestión, pagos a agentes, "movimientos bancarios"), `.md` con OCR roto y países sin clubes cargados de los que tomar el patrón. |
| sport | 127 | 14 | 0 | Detecta los 14 equipos que no son de fútbol que hay en `Clubes/` (5 de F1, 4 de cricket, 4 de rugby y los Green Bay Packers), sin falsos positivos. |
| brandColor | 0 | 0 | 141 | Por diseño: el script nunca lo elige (ver cabecera). |
| anio | 137 | 4 | 0 | Aalesund, Viking, Sigma Olomouc y Estrela: el nombre del archivo y las fechas del documento no coinciden. Son casos reales a revisar. |
| cierre | 128 | 13 | 0 | Los mismos casos que fiscalYearStart. |
| reportType | 120 | 21 | 0 | Actas, memorias, dictámenes, informes de auditor sin los estados, 6 intermedios y 1 PDF de "pagos a agentes". |
| perimetro | 82 | 59 | 0 | **La pregunta más frecuente.** Ver 2. |
| currency | 141 | 0 | 0 | En esta muestra no hubo ningún ejercicio anterior al euro (la regla existe y está probada en el código). |
| fx | 58 | 7 | 79 | 52 con `fxRef` ya en `FX_CLOSE`, 2 de la serie local (se agregarían a `FX_CLOSE`), 1 declarado por el documento, 3 en USD. `pendiente` = moneda o fecha sin cotización cacheada. |
| sourceId | 141 | 0 | 0 | |
| liga | 8 | 3 | 130 | Solo hay rosters cacheados de br, co, gr y no, y para pocas temporadas. Es la caché, no el método: en cuanto se baje una liga-temporada, pasa a `ok`. |

Países nuevos para el sitio en la muestra: AT, CN, KR, EC, US, FR, IT, NO, PT, CZ, RU, CH, TR y UA.
Monedas nuevas: CNY, KRW, NOK, CZK, RUB, CHF, TRY y UAH. El script las agrega solo, desde sus tablas.

### 1.1 Hallazgo: 17 de las "carpetas sin cargar" son clubes que ya están en el sitio

Almagro, Argentinos Juniors, Estudiantes LP, Gimnasia y Esgrima LP, Independiente, Newell's, Racing,
Unión, Amazonas, Botafogo-SP, Botafogo, Gent, Union Saint-Gilloise, Universidad de Chile (Azul
Azul), Independiente Santa Fe, Unión Magdalena y Varaždin.

El script los reconoce porque algún `data/<id>-data.js` cita la carpeta `Clubes/<País>/<Club>/`.
`onboard.mjs --quien` no los reconoce, porque el nombre de la carpeta matchea a 0 o a 2+ clubes
(Racing = Racing Club + Genk). O sea que la cifra de "~205 clubes nuevos" está inflada: las
carpetas con `.md` que son clubes nuevos de verdad son 141, y de esas 14 no son de fútbol. Sus PDFs
figuran como no cargados en el registro por el mismo motivo. Esto afecta a
`tools/inventario-transcripciones.mjs`, que usa `onboard.mjs`, y queda anotado como pendiente
abajo.

## 2. Las preguntas frecuentes, y si son genuinas

1. **Perímetro (59).** Hay tres casos:
   - **Solo el grupo consolidado (14).** OB, Trabzonspor, Beşiktaş, Fenerbahçe, Evergrande,
     Olympique Lyonnais, Go Ahead Eagles Holding. Son genuinas: el documento es el del grupo.
   - **Dos entidades en la carpeta para el mismo año (6).** Molde FK FLI / Molde Fotball AS, Aalesund,
     Fredrikstad, Genoa individual/consolidato, Hellas Verona, LDU Quito "club civil". Son
     genuinas: es exactamente el "qué entidad es el club".
   - **El documento menciona el consolidado y el individual (39).** Acá hay casos genuinos
     (konsern/morselskap noruegos, Celtic plc, AS Roma, AC Milan, TV Azteca/Atlas) y casos
     probablemente ruidosos: los estados griegos, donde "η Εταιρεία" (la Compañía) aparece siempre y
     "ενοποιημένες" se nombra como referencia (PAOK 8 contra 53), y un par con 3-7 menciones
     (Goiás, Newell's, Red Bull Racing). El umbral está puesto para preguntar de más a propósito: un
     perímetro mal elegido es un número publicado mal y no se ve en ningún tie-out.

   El texto de cada pregunta ya trae la sugerencia del criterio vigente (entidad individual, como
   Boca, Racing y Panathinaikos) para que la responda Claude por API o Guido.
2. **Tipo de documento (21).** Todas genuinas en lo que se revisó: dictámenes sin estados (Veres),
   intermedios (Palestino 2018, Estrela da Amadora "1º Semestre", Jeju, Hradec Králové), informes de
   gestión, memorias, actas y "pagos a agentes". En la práctica, la respuesta suele ser "usar otro
   documento de la misma carpeta", no una decisión.
3. **Deporte (14).** Genuinas: ¿los equipos de F1, rugby y cricket, y la NFL, entran al sitio?
4. **Cierre / fiscalYearStart (13+13).** Salen de documentos que no son balances, de OCR roto o de
   países nuevos sin patrón. Casi siempre se resuelven solas si se elige otro documento del club.
5. **Tipo de cambio (7).** Cuando el documento declara varios valores, pasa esto: Newell's 41,50
   comprador contra 43,50 vendedor, Racing 2012 con tres tasas, Krasnodar con la de cierre y la
   comparativa en la misma línea, Palestino, TV Azteca con la serie histórica. Y cuando la moneda
   está casi a la par del dólar (AC Milan: "Dollaro USA 1,0866" es USD por EUR, al revés del sitio),
   el número solo no dice el sentido. Las dos son genuinas: es la regla #0, "gana el de CIERRE".
6. **Liga (3).** Coincidencias parciales de nombre ("OFI Crete" contra "OFI", "Volos NFC" contra
   "Volos"). Son fáciles, pero el script no confirma homónimos por su cuenta. Y Molde 2019 en
   `no-eliteserien`, una liga que no está en el catálogo, que es decisión de Guido.

## 3. Muestra revisada a mano (35 documentos de 25 países)

| Carpeta (ejercicio) | clubId propuesto | ok | preguntas | pendientes |
|---|---|---|---|---|
| Brasil/Criciuma (2020) | `criciuma-br` | 81% (13/16) | — | name, brandColor, liga |
| Brasil/Paysandu (2024) | `paysandu-br` | 88% (14/16) | — | name, brandColor |
| Colombia/Aguilas Doradas (2023) | `aguilasdoradas-co` | 88% (14/16) | — | name, brandColor |
| Chile/Palestino (2018) | `palestino-cl` | 69% (11/16) | reportType (intermedio), fx | name, brandColor, liga |
| Grecia/OFI Crete (2025) | `oficrete-gr` | 81% (13/16) | liga | name, brandColor |
| Italia/Genoa (2025) | `genoa-it` | 81% (13/16) | perimetro | brandColor, liga |
| Portugal/Alverca (2024) | `alverca-pt` | 88% (14/16) | — | brandColor, liga |
| Bélgica/OH Leuven (2024) | `ohleuven-be` | 81% (13/16) | — | name, brandColor, liga |
| Países Bajos/Go Ahead Eagles (2023) | `goaheadeagles-nl` | 81% (13/16) | perimetro | brandColor, liga |
| Noruega/Molde (2024) | `molde-no` | 75% (12/16) | perimetro | brandColor, fx, liga |
| Noruega/Brann (2024) | `brann-no` | 75% (12/16) | perimetro | brandColor, fx, liga |
| República Checa/Slavia Praha (2019) | `slaviapraha-cz` | 81% (13/16) | — | brandColor, fx, liga |
| Suiza/Basel (2011) | `basel-ch` | 81% (13/16) | — | brandColor, fx, liga |
| Austria/Rapid Wien (2024) | `rapidwien-at` | 81% (13/16) | — | name, brandColor, liga |
| Turquía/Trabzonspor (2021) | `trabzonspor-tr` | 71% (12/17) | perimetro | brandColor, fx (x2), liga |
| Rusia/Rostov (2023) | `rostov-ru` | 75% (12/16) | — | name, brandColor, fx, liga |
| Ucrania/Veres (2024) | `veres-ua` | 69% (11/16) | reportType (dictamen sin estados) | name, brandColor, fx, liga |
| Corea del Sur/FC Seoul (2024) | `fcseoul-kr` | 75% (12/16) | — | name, brandColor, fx, liga |
| China/Guangzhou Evergrande (2017) | `guangzhouevergrande-cn` | 75% (12/16) | perimetro | name, brandColor, liga |
| Escocia/Celtic (2025) | `celtic-xx` | 69% (11/16) | id, country, perimetro | brandColor, liga |
| Inglaterra/Bath Rugby (2024) | `bathrugby-gb` | 81% (13/16) | sport | brandColor, liga |
| Colombia/Deportes Tolima (2025) | `deportestolima-co` | 88% (14/16) | — | brandColor, liga |
| Portugal/Moreirense (2025) | `moreirense-pt` | 88% (14/16) | — | brandColor, liga |
| Grecia/AEL Larissa (2022) | `aellarissa-gr` | 81% (13/16) | — | name, brandColor, liga |
| Turquía/Beşiktaş (2009) | `besiktas-tr` | 75% (12/16) | perimetro, fx | brandColor, liga |
| Bélgica/RAAL La Louvière (2024) | `raallalouviere-be` | 81% (13/16) | — | name, brandColor, liga |
| Croacia/Vukovar 1991 (2025) | `vukovar1991-hr` | 88% (14/16) | — | brandColor, liga |
| Dinamarca/OB (2021) | `ob-dk` | 69% (11/16) | perimetro | name, brandColor, fx, liga |
| Ecuador/LDU Quito (2022) | `lduquito-ec` | 69% (11/16) | reportType, perimetro | name, brandColor, liga |
| México/Atlas (2019) | `atlas-mx` | 69% (11/16) | perimetro (TV Azteca), fx | name, brandColor, liga |
| Estados Unidos/Green Bay Packers (2022) | `greenbaypackers-us` | 63% (10/16) | fiscalYearStart, cierre, sport | name, brandColor, liga |
| Argentina/Racing (2012) | ya existe: `racing` | 88% (7/8) | fx (3 tasas) | — |
| Argentina/Newells Old Boys (2019) | ya existe: `newells-ar` | 75% (6/8) | perimetro, fx | — |
| Bélgica/Gent (2005) | ya existe: `gent-be` | 75% (6/8) | — | fx, liga |
| Alemania/_DFL-Finanzkennzahlen | — | rechazada (agregado) | | |

Valores verificados contra el documento o contra lo ya cargado:

- **Cierres.** Racing 2012 = 31/10/2012, el ejercicio N° 110 de Racing. Trabzonspor = 31/5. OH
  Leuven y Genoa, con el cambio de cierre detectado y avisado. Evergrande, calendario: su semestral
  2020 ya no se toma como "cambio de cierre".
- **Tipos de cambio.** Gimnasia 2025 = 1.215, igual al `document_close` que ya está cargado.
  Evergrande 2017 = 6,5342, que es la paridad oficial del 31/12/2017. Newell's: 41,50 / 43,50 /
  42,50, las tres del Anexo I.
- **Ligas.** Paysandu 2024 = `br-serieB` y Águilas Doradas 2023 = `co-primeraA`, las dos correctas.
- **Nombres legales.** "SK Slavia Praha - fotbal a.s.", "FC Basel 1893 AG", "Molde Fotball AS" y
  "Trabzonspor Sportif Yatırım ve Futbol İşletmeciliği Ticaret A.Ş.".

Bugs que encontró esta prueba y ya están corregidos en el script:

- NFD rompía el coreano (no se leía ninguna fecha).
- "AEL Larissa" contiene "aris" como texto, así que se proponía como Aris.
- Rugby "Football Club" contaba como fútbol.
- El "28.07" de una fecha se leía como tipo de cambio.
- Un semestral contaba como cambio de cierre.
- La primera versión no detectaba la columna "TC" de los anexos de moneda extranjera.
- Menciones narrativas del tipo de cambio, sin cifra, frenaban el alta.

## 4. `--escribir` en una copia (git worktree del commit b508316 en el scratchpad, ya borrado)

1. **Primera corrida (Slavia Praha): se REVIRTIÓ SOLA.** `audit.js` dio P1 `asset-v-sin-subir`, porque
   `data/` cambia y hay que subir `ASSET_V`. Quedaron restaurados 6 archivos y borrados 2, con
   `git status` limpio después. Ahí se sumó la suba de `ASSET_V` al script: la constante y cada
   `?v=`, solo si todavía no está subido respecto de HEAD.
2. **Corrida final (Slavia Praha, país y moneda nuevos): OK, `P0 0 · P1 0`.** Escribió:
   - `data/clubs.js`
   - el esqueleto `data/<id>-data.js` del club `slaviapraha-cz`
   - el archivo de ligas de CZ (`data/club-leagues/<iso2>.js`, nuevo, fila en `null`)
   - `data/leagues.js` (COUNTRIES CZ 🇨🇿)
   - `data/lang/en.js` (`country.CZ`)
   - `data/currency-map.js` (CURRENCY_META y FX_PLAUSIBLE_RANGE de CZK)
   - `index.html` (ASSET_V 292 → 293)

   Además corrió los 4 generadores, y sus 4 `--check` dan 0. Al volver a correr `--propuesta` sobre
   el mismo documento, el club ya aparece como "YA EXISTE (slaviapraha-cz)".
3. **Paysandu (país existente, liga del caché).** Agregó `'paysandu-br': { 2024: 'br-serieB' }` a
   `br.js` y no volvió a subir ASSET_V. Auditoría con `P0 0 · P1 0`.
4. **OFI Crete (con una pregunta).** Se negó a escribir y no tocó nada.

Qué toca un alta, sacado del commit de Panathinaikos (839fea7), del skill de onboarding §3 y de lo
que pidió el audit:

- `clubs.js`
- `data/<id>-data.js`
- `club-leagues/<iso2>.js`
- `leagues.js` y `lang/en.js`, si el país es nuevo
- `currency-map.js`, si la moneda o la cotización es nueva
- `index.html` (ASSET_V)
- los generadores: `club-index.js`, `fuentes.html` + `fuentes/*.html` + `sitemap.xml`, `rankings`, y
  los dos documentos de `Admin/`

`index.html` no necesita nada más: `loadClubData()` arma la ruta sola.

## 5. Límites conocidos y pendientes (no se tocó `Admin/TODO.md`)

- **Un club dado de alta sin ejercicios aparece en el selector como "Sin datos cargados".** Aparece
  en `club-index.js` con `q: 'empty'`. Por eso el alta tiene que ir en el mismo commit que la carga
  de su primer ejercicio. El `fiscalYearMeta` propuesto queda en un comentario del esqueleto, no
  registrado.
- **`onboard.mjs --quien` y el registro de transcripciones** no reconocen 17 clubes que ya están
  cargados (1.1). Convendría que usaran la misma señal "qué `data/*.js` cita esta carpeta".
- **Perímetro en griego**: probablemente sobre-pregunta (2, punto 1).
- **Nombre legal**: falla en alfabetos no latinos (queda `pendiente`, no bloquea).
- **Tipo de cambio.** Solo hay series locales para ARS, BRL y COP. Para NOK, CZK, CHF, TRY, RUB,
  UAH, KRW y EUR/GBP de fechas que no están en `FX_CLOSE` queda `pendiente`: hace falta que Guido
  corra `tools/fetch-fx-reference.mjs` para esas monedas. Con TRY, RUB y UAH el rango plausible es
  amplio a propósito, y sin serie de mercado se puede colar un número del texto que cae en el rango
  (Beşiktaş 2009). Por eso varios valores o cualquier duda siempre terminan en `pregunta`, nunca en
  `ok`.
- **Liga**: casi todo queda `pendiente` hasta que se cacheen rosters
  (`resolve-wikipedia-season-page.mjs` + `fetch-club-league-reference.mjs`).
- **El script no crea ligas en el catálogo** ni decide `'liga-no-catalogada'`.
