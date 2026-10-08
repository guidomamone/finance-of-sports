# Italia — Serie C y Serie D (sourcing 2026-10-07)

**Ángulos**: sitio oficial: chequeo de menú + mapa Firecrawl en 49 clubes de C (y 9 de D con señal) · Wayback CDX: PDF del dominio de cada uno filtrados por nombre financiero · SEC/EDGAR para dueños cotizantes · canal sistémico: Manuale Licenze Nazionali 2026/27, Commissione indipendente (`vigilanzasport.it`), Report Calcio, Registro Imprese · barrido: 1 (Sonnet) — 2026-10-07

## Veredicto

**Serie C y Serie D: no publican. Cero PDF financieros propios de 49 clubes de C revisados y de 9 de D.** Confirma la hipótesis de `_notas-generales.md` (Serie B): lo que empuja a publicar es la licencia UEFA (sólo Serie A y los que alguna vez clasificaron), no la categoría. Los únicos hallazgos reales de todo el barrido son por una vía lateral: **dueños que cotizan en la SEC** (Juve Stabia vía Brera Holdings; leads en Savoia vía RoyaLand y Brera FC).

## Canales sistémicos (vale para toda la categoría)

- **Manuale Licenze Nazionali 2026/27 (FIGC)**: `https://files.figc.it/version/c:YzI3YjIzNzMtNzBhYS00:YzFmZGYzZDQtYzE1ZC00/Manuale%20Licenze%20Nazionali_%202026-2027.pdf` (27 págs, leído). Exige licencia nacional a las sociedades de A, B y C, con depósito de documentación económico-financiera ante la Commissione indipendente (plazo 15 de mayo 2026), pero **no impone ninguna publicación de bilanci**: no aparece ninguna obligación de publicar en el texto. El mecanismo que sí obliga a publicar es el UEFA Club Licensing (competiciones UEFA), que no alcanza a B, C ni D. No hay "licencia nacional publicada" como fuente.
- **Commissione indipendente / ex Covisoc (`https://www.vigilanzasport.it/`)**: publica su propio rendiconto, la Relazione annuale 2026 (`/media/uhibx2zc/relazione-annuale-2026.pdf`), pareri y delibere, y noticias de sanciones por club. **No publica bilanci por club.** Sirve como contexto (penalizaciones, p. ej. Juve Stabia) y para cifras agregadas. `legapro.it/tag/covisoc` sin bilanci.
- **Report Calcio (FIGC/PwC/AREL)**: agregado del sistema, sin detalle por club (ya anotado).
- **Registro Imprese / Camere di Commercio**: bilanci de terceros de pago (visura/bilancio por documento). No hay acceso gratuito al PDF. Los agregadores gratuitos (`reportaziende.it`, `companyreports.it`, `fatturatoitalia.it`, `atoka.io`) muestran sólo cifras sueltas del XBRL (resultado, un "fatturato" parcial) sin documento, y a veces mal (el fatturato de Virtus Entella que muestran es un rubro y no los ricavi totales): útiles como control de orden de magnitud, no como fuente.
- **Obligación de forma jurídica**: en C la gran mayoría son S.r.l. o S.p.A. (se depositan en el Registro Imprese, no se publican); en D son S.S.D. a r.l. o asociaciones. Para las S.S.D. y asociaciones que reciben ayudas públicas de 10.000 EUR o más existe sólo la obligación de la ley 124/2017 (art. 1, c. 125-129) de dar a conocer los **contribuyentes públicos** recibidos, en el sitio o en la nota integrativa: no es un bilancio. No se verificó el efecto del D.Lgs. 36/2021 sobre la publicidad de bilanci de S.S.D.; queda como hipótesis.
- **Wayback**: la CDX de dominio devuelve cuerpo vacío con HTTP 200 cuando se lanzan consultas en paralelo (throttling silencioso): salió "0 PDF" falso en dos tercios de los clubes hasta repetir en serie con 8-10 s de pausa. No cerrar un club como "0 archivados" sin repetir.

## Serie B 2026/27: lo que faltaba

- **Juve Stabia**: HALLAZGO. Estados IFRS auditados 30/06/2024 y 2023 y semestral 31/12/2024, presentados en la SEC por Brera Holdings PLC (6-K 2025-10-27). 2 PDF en `Clubes/Italia/Juve Stabia/`. Ver `fuentes/Italia/Juve Stabia.md`.
- **Virtus Entella**: dead-end (sitio tras Cloudflare, sin sección financiera). Ver su archivo.
- **Ascendidos de C a B para 2026/27 (Arezzo, Ascoli, Benevento, Vicenza)**: sin documentos; Benevento y Vicenza (con análisis de un estudio contable, lead secundario) son candidatos a mail. Descendidos de A (Verona, Pisa, Cremonese) ya cubiertos en sus archivos. Descendidos de B a C (Spezia, Pescara, Reggiana, Bari) ya barridos el 2026-10-03.

## Serie C 2026/27 (60 clubes; ver los archivos `fuentes/Italia/<Club>.md`)

Revisados 49 clubes de los 3 gironi (A: 19, B: 16, C: 14); faltan los filiales, Calabria/Sicilia, Salernitana y los que ya tenían archivo. Resultados con valor:

- **Sin señal, chequeo rápido y corte**: Albinoleffe, Alcione Milano, Arzignano Valchiampo, Desenzano, Dolomiti Bellunesi, Folgore Caratese, Giana Erminio, Lecco, Lumezzane, Ospitaletto Franciacorta, Pergolettese, Renate, Treviso, Forlì, Guidonia Montecelio, Ostiamare, Pianese, Pineto, Sambenedettese, Vado, Vis Pesaro, Altamura, Audace Cerignola, Barletta, Casarano, Casertana, Cavese, Giugliano, Monopoli, Picerno, Potenza, Scafatese y Sorrento.
- **Con alguna señal, probados a fondo y negativos**: Perugia (ex A, comunicado de 2025-10-30 sobre el bilancio 2024/25 con patrimonio neto, sin PDF), Livorno (ex A), Carpi (ex A), Cittadella (ex B), Novara (ex A), Pro Vercelli, Foggia, Trento (S.p.A.), Grosseto (Lamioni Holding), Campobasso (propiedad estadounidense privada), Ravenna, Latina, Torres, Gubbio (bilancio sociale 2013-14 en Wayback, narrativo), Union Brescia.
- **Con señal de cotizante, a revisar más adelante**: **Savoia** (90% de RoyaLand Co Ltd., emisor de la SEC; sus estados auditados llegarían con el 20-F del ejercicio 2026).
- **Cubiertos por la matriz o por otro agente**: Salernitana (otro agente), Catania, Cosenza y Crotone (Calabria/Sicilia: agente aparte), Juventus Next Gen, Inter U23 y Atalanta U23 (equipos filiales dentro de la entidad de Juventus, Inter y Atalanta: no tienen bilancio propio; Milan Futuro está en el consolidado del Milan, ver AC-Milan-bilanci-relazioni-2023-24.md).
- No se barrió en detalle: multi-club (Red Bull / City Football Group) en C: no hay clubes de esos grupos en C (Palermo, del CFG, juega en B y es de Sicilia).

## Serie D 2026/27 (162 clubes, 9 gironi)

Sólo con señal concreta. Revisados: Brera FC (dueño Brera Holdings, SEC), Triestina (LBK / House of Doge, SEC pero no consolida), Alessandria (aviso de bilancio 2023 sin PDF), Piacenza, Pro Patria, Varese, Ancona, Ternana (fallida), Rimini (en liquidación). Nada descargable. Chievo Verona (original, desaparecido) lo cubre otro agente. Las S.S.D. a r.l. de D no publican y su única obligación visible es la de la ley 124/2017. Candidato débil a mail: Alessandria.

## Candidatos a mail

Benevento, Vicenza, Perugia, Ascoli, Arezzo (todos ascendidos o con comunicados de transparencia); Alessandria (D). El resto de C y D, no: el costo no se justifica.

## Para volver más adelante

- Savoia y Brera FC/Brera Holdings: revisar el 20-F de RoyaLand (ejercicio al 30/06/2026) y el 20-F de Brera del ejercicio 2026, que pueden traer estados por club. `https://data.sec.gov/submissions/CIK0001924064.json` y `.../CIK0001939965.json`.
- UYBA Volley S.s.d.a.r.l. (51% de Brera Holdings) para la tanda de vóley: Brera lo consolida.
