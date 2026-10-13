# Noruega — notas generales de sourcing

Undécimo país nuevo de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético
(sesión 2026-09-17), después de Alemania, Austria, Bélgica, China, Corea del Sur, Croacia,
Dinamarca, Francia, Grecia e Italia. Confirmados los 16 clubes de la Eliteserien 2026 vía Wikipedia:
Aalesund, Bodø/Glimt, Brann, Fredrikstad, HamKam, KFUM (Oslo), Kristiansund, Lillestrøm, Molde,
Rosenborg, Sandefjord, Sarpsborg 08, Start, Tromsø, Viking y Vålerenga.

## El canal: Regnskapsregisteret (Brønnøysundregistrene) — el mejor resultado del proyecto, mejor
## incluso que Bélgica/Dinamarca/Grecia

Noruega confirma la hipótesis del pedido de tarea (perfil nórdico de transparencia, comparable a
Dinamarca): el registro central noruego es gratis, sin login, sin captcha, sin pago, **descargable
directo por `curl`, y con series de HASTA 18 EJERCICIOS SEGUIDOS (2008-2025) para la mayoría de los
clubes** — la profundidad más pareja de cualquier país del proyecto hasta ahora.

- **El mecanismo (descubierto esta sesión)**: cada entidad noruega "regnskapspliktig" (obligada a
  llevar contabilidad — CUALQUIER forma jurídica, no solo AS: ver más abajo) deposita su
  "årsregnskap" (balance + cuenta de resultados + memoria del directorio + informe de auditor,
  todo en un solo PDF) en el Regnskapsregisteret. Una vez que se tiene el **organisasjonsnummer**
  (9 dígitos) de la entidad, el documento de un ejercicio puntual se descarga directo, sin sesión,
  con:

  ```
  https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/<organisasjonsnummer>/<año>
  ```

  Un año sin depósito devuelve HTTP 404 con cuerpo vacío (instantáneo); un año con depósito
  devuelve HTTP 200 con el PDF completo (`content-disposition: attachment`) — tarda unos 5-8
  segundos por archivo porque son escaneos de varios MB, no por limitación del servidor. Rate
  limit real pero generoso y de recuperación rápida (`x-rate-limit-remaining` empieza en ~29-30 y
  se regenera en pocos segundos) — no hizo falta backoff especial, alcanzó con un `sleep 0.45-0.5`
  entre pedidos para no gastarlo de golpe.
  - **Cómo se descubrió la URL exacta**: no está documentada como tal en ningún lado público — se
    encontró interceptando la llamada `fetch()` real que dispara el botón "Innsendt årsregnskap"
    de la interfaz humana (`virksomhet.brreg.no/nb/oppslag/enheter/<orgnr>`, la sección acordeón
    "Årsregnskap") con un parche de `window.fetch` inyectado por `javascript_tool`. La interfaz
    humana en sí solo lista por defecto los últimos ejercicios y hay que hacer click en "Vis alle"
    para ver la serie completa — pero incluso los años que la UI NO lista (los más viejos) SÍ
    responden si se pide la URL de "kopi" directo, así que conviene simplemente barrer un rango de
    años por `curl` en vez de confiar en lo que muestra el acordeón.
  - **La API "abierta" de cifras clave (`data.brreg.no/regnskapsregisteret/regnskap/<orgnr>`, sin
    año en la URL) es DISTINTA y mucho más limitada**: solo devuelve las cifras clave (balance +
    resultado, sin memoria ni dictamen) del ÚLTIMO ejercicio depositado, en JSON — la documentación
    oficial de Brønnøysundregistrene lo aclara ("open part = solo el último ejercicio, el histórico
    de 3 años + consolidado es de acceso restringido a organismos públicos"). Es útil como atajo
    rápido para comparar ingresos entre entidades candidatas del mismo club (ver más abajo), pero
    **el PDF completo con el histórico de hasta 18 años SÍ es público sin restricción** vía el
    endpoint de "kopi" de arriba — el límite de 3 años de la API JSON NO aplica a la descarga de
    documentos, algo que no queda claro leyendo solo la documentación de la API.
- **Buscar la razón social/organisasjonsnummer correcto**: `data.brreg.no/enhetsregisteret/api/enheter?navn=<nombre>`
  (JSON, gratis, sin login) — acepta nombre parcial, devuelve organización + forma jurídica +
  `sisteInnsendteAarsregnskap` (el campo de "último ejercicio depositado" es útil como primer
  filtro pero **resultó no siempre confiable** para decidir si vale la pena seguir: en más de un
  caso mostraba `None` para una entidad que en realidad sí tenía documentos vía la URL de "kopi"
  directa, así que ante la duda conviene probar la descarga directa en vez de descartar por este
  campo solo).

## El gotcha central del país: la mayoría de los clubes tienen DOS (a veces tres) entidades, y NO
## siempre es obvio cuál es la principal

A diferencia de Alemania (GmbH separada del e.V. SIEMPRE con un patrón claro) o Bélgica (una sola
sociedad relevante), acá el patrón varía club por club y hubo que resolverlo caso por caso:

- **Mitad de los clubes NO tienen ninguna sociedad separada**: el club-asociación mismo (forma
  jurídica **FLI**, Forening/lag/innretning) es la entidad que deposita las cuentas del fútbol
  profesional directamente. Confirmado para **Bodø/Glimt, Brann, Kristiansund, HamKam
  (Hamarkameratene Fotball Elite — sub-unidad de fútbol de élite del club paraguas
  multideporte), Rosenborg** — sin AS relacionada real (Rosenborg Ballklub Holding AS existe pero
  es un vehículo de inversión, no la operación del fútbol).
- **La otra mitad SÍ tiene una AS dedicada, con un patrón de nombre reconocible
  `<Club> Fotball AS` (o `Fotballinvest`/`Invest`)** — pero cuál de las dos (la FLI o la AS) es la
  que realmente concentra la actividad del fútbol profesional **varía club por club, y solo se
  puede saber comparando el ingreso operativo (`driftsinntekter`) de la API de cifras clave**:
  - **La AS es claramente la principal** (ingreso mucho mayor que la FLI): **Viking** (AS: NOK
    266,5M vs. FLI: NOK 18,2M — la AS recién se fundó en 2016, así que su serie de 9 ejercicios,
    2017-2025, es probablemente TODA su vida útil), **Sandefjord** (AS: NOK 86,5M vs. FLI: NOK
    22,5M, y la FLI dejó de depositar después de 2020), **Ålesund/Aalesund** (AS: NOK 70,4M vs.
    FLI: NOK 34,6M).
  - **La FLI es la principal, la AS es menor/paralela** (ambas depositan igual, sin relación clara
    confirmada): **Molde** (FLI: NOK 129,1M vs. AS: NOK 43,9M), **Fredrikstad** (la AS
    "Fotballinvest" tiene la serie completa y sigue depositando; la FLI paró en 2018 — acá SÍ
    parece que la AS reemplazó a la FLI con el tiempo), **Sarpsborg 08** (la AS "Fotball Invest" es
    la MENOR de las dos, NOK 17,3M, la FLI parece llevar el peso real).
  - **Tromsø** es un caso aparte: se encontró **TIL FOTBALL AS** (org.nr. 994784943, nombre
    histórico "TIL Holding AS" 2009-2020) con serie de 17 ejercicios (2009-2025) — la búsqueda
    salió de una coincidencia casual en otro query, no de buscar "Tromsø" directo (el nombre usa
    la sigla "TIL", no "Tromsø"). **Lección para la próxima sesión de onboarding de datos**: buscar
    SIEMPRE variantes con la sigla/abreviatura común del club además del nombre completo (mismo
    tipo de gotcha que "razón social vs. nombre de fantasía" visto en Alemania/Corea/Grecia, pero
    acá es una sigla informal, no una razón social formal).
  - **Vålerenga** es el caso más complejo: TRES entidades activas con ingresos comparables
    (Vålerenga Fotball Elite FLI: NOK 171,4M: es "el club deportivo" según fuentes de prensa;
    Vålerenga Fotball AS: NOK 99,8M, tiene el derecho de explotar la actividad comercial y cubre
    déficits; Vålerenga Fotball FLI —el paraguas más amplio—: NOK 79M). Se bajaron las tres series
    completas — la decisión de cuál cargar (o si hay que sumarlas) queda pendiente, ver
    `dudas-por-club.md`.
  - **Una AS descubierta puede resultar irrelevante igual**: `Sarpsborg Fotballklubb Eiendom AS`
    (ingreso NOK 710.000, claramente una inmobiliaria de estadio) e `IK Start Samfunn AS` (ingreso
    NOK 289.000, la rama de responsabilidad social del club) tienen los dos organisasjonsnummer
    empezando igual que el club pero NO son la operación de fútbol — se descartaron como
    candidatas principales tras comparar ingresos, mismo criterio que "Glimt AS" (retail sin
    relación real con Bodø/Glimt, ingreso NOK 308.000).
- **Método recomendado para la próxima sesión de un club nuevo de cualquier país nórdico/similar**:
  1. Buscar el nombre del club (y su sigla común) en `enhetsregisteret/api/enheter`, filtrando por
     `organisasjonsform=AS` Y sin filtro (para ver también la FLI).
  2. Para cada candidata con `sisteInnsendteAarsregnskap` reciente, comparar `driftsinntekter` vía
     `regnskapsregisteret/regnskap/<orgnr>` (la API de cifras clave, rápida, sin descargar PDFs).
  3. La de mayor ingreso (y/o la única con depósitos recientes) es la candidata principal — pero
     bajar TODAS las que tengan disclosure real, no descartar antes de comparar.

## Formato de los documentos — 100% escaneos, igual que Companies House (Reino Unido)

Todos los PDF bajados esta sesión son **escaneos sin capa de texto** (`pdffonts` no lista ninguna
fuente embebida, tamaño de página 1728×2312pt típico de un escaneo a 300dpi tamaño A4) — igual que
Companies House UK (sección 9 del skill). Van a necesitar el flujo de OCR (`pdftoppm` + `tesseract
-l nor` — Noruego usa el paquete de idioma `nor` de Tesseract, no probado todavía en este proyecto)
antes de poder extraer cifras, en una sesión de onboarding futura.

## Gotcha de `.gitignore` — NINGUNO nuevo necesario

Todos los documentos de Noruega son `.pdf` — el patrón `Clubes/**/*.pdf` que ya existe en
`.gitignore` los cubre sin cambios. A diferencia de Dinamarca (`.tif`/`.xhtml`) o los filings SEC en
HTML, Brønnøysundregistrene sirve un único formato (PDF) para todo el histórico, incluso los
ejercicios más viejos (2008) — no hizo falta ningún ajuste al `.gitignore`.

## Pendiente / ideas para retomar

1. **KFUM Oslo y Lillestrøm quedaron con disclosure muy pobre o inexistente reciente** — ver sus
   fichas individuales para el detalle y las preguntas candidatas a `dudas-por-club.md`.
2. **Confirmar el perímetro correcto de Vålerenga** (¿Elite FLI, AS, o las dos sumadas?) antes de
   cargar cualquier dato al sitio.
3. **Bodø/Glimt tiene un hueco real de 5 ejercicios (2018-2022)** sin explicación encontrada, justo
   en su período de mayor éxito deportivo — vale la pena preguntarle al club.
4. Ningún club de esta lista quedó en CERO absoluto — a diferencia de África/CONCACAF, los 16
   clubes de Eliteserien tienen al menos algún documento real.

- Último chequeo: 2026-09-17.
