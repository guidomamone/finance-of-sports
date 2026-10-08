# Notas generales — Italia

## Metodología y hallazgo regulatorio, sesión 2026-09-17 (décimo país nuevo, orden alfabético)

Italia resultó, junto con Alemania (Unternehmensregister + DFL) y Bélgica/Dinamarca (registros
mercantiles-API), uno de los países con MEJOR cobertura de liga completa del proyecto — pero por un
mecanismo distinto a todos los anteriores: acá el motor no es un registro mercantil central ni un
regulador de valores, es el **Manuale delle Licenze UEFA**, que exige a todo club que participa en
competiciones UEFA publicar sus estados financieros combinados en su propio sitio web. Varios PDF de
esta sesión (Atalanta, AS Roma) citan esa obligación explícitamente en su propio texto.

- **Registro Imprese (`registroimprese.it`) — CONFIRMADO PAGO**, como anticipaba el prompt de la
  sesión. Las visure/bilanci de terceros (no el titular de la empresa) se pagan con tarjeta según
  tarifas del decreto del Ministerio de Desarrollo Económico de 2007 — no hay tier gratis para
  consultar el bilancio de otra empresa. `ufficiocamerale.it` es un revendedor privado con el mismo
  problema (pago). No vale la pena para ningún club de esta liga mientras el sitio propio publique
  algo — que, sorprendentemente, resultó ser la mayoría.
- **Report Calcio (FIGC/PwC/AREL, `figc.it/media/.../report-calcio-2025.pdf`) — existe pero NO sirve
  como fuente por club**: es un estudio agregado anual (como el Deloitte Pro League Report de
  Bélgica o el Finanzkennzahlen de la DFL alemana), con cifras consolidadas de todo el sistema
  (Serie A+B+C) y series históricas de pérdidas agregadas — útil como cifra de contexto/control, no
  como balance individual descargable. A diferencia de la DFL alemana o la DNCG francesa, NO trae el
  bilancio de cada club por separado.
- **El mejor lead individual confirmado fue Juventus**, como anticipaba el prompt: cotiza en Borsa
  Italiana desde 2001 y publica una serie ININTERRUMPIDA de 23 ejercicios (2002/03-2024/25) en su
  propia sección de Investor Relations — la serie más profunda de cualquier club de fútbol de todo
  el proyecto. **S.S. Lazio también cotiza** (desde 1998, más antigua que Juventus) pero su sección
  de "Documenti" no es un archivo histórico navegable — solo expone los ~30 documentos más recientes
  de cualquier tipo — así que solo se pudo cargar el ejercicio 2024/25; el histórico bursátil
  1998-2024 de Lazio queda como la pista individual más prometedora sin agotar de todo el país.
- **La obligación de licencia UEFA generalizó el hallazgo mucho más allá de los 2 cotizantes**: 11 de
  los 20 clubes de Serie A 2025/26 publican voluntariamente el fascicolo completo (bilancio
  individual y/o consolidado) en su propio sitio, con series de 1 a 8 ejercicios según cuán prolijo
  sea el club manteniendo su propia página: Juventus (23), Lazio (1, pero con 26 de historia
  bursátil sin explotar), Inter (5), AC Milan (8), AS Roma (8), Napoli (6), Atalanta (8), Fiorentina
  (2), Genoa (4), Parma (6), Bologna (2), Udinese (2), Sassuolo (6), Hellas Verona (1), Como (2),
  Cremonese (2). **4 clubes quedaron en cero** (Torino, Pisa, Lecce, Cagliari) — ninguno por bloqueo
  estructural confirmado, sino por no tener (o no mantener visible) esa sección en su sitio; Cagliari
  es un caso aparte, tiene la sección pero el link a Google Drive está roto.
- **Gotcha transversal, encontrado en Inter, Napoli y Udinese**: varios clubes migraron de CDN/dominio
  con el tiempo (`static.inter.it`, `cdn.sscnapoli.iquii.info`, `cdn-assets.sscnapoli.it`,
  subcarpetas viejas de `udinese.it/club/compliance/`) y **dejaron sus propios links viejos rotos**
  sin actualizar — un patrón mucho más común en Italia que en cualquier país anterior del proyecto.
  Wayback Machine rescató los de Inter y Napoli sin problema; los de Udinese (2022/23 y 2023/24)
  solo tienen una captura disponible y viene TRUNCADA a 5 MB (ver `fuentes/Italia/Udinese.md` para el
  detalle del header `warning: wayback content truncated by "length"` — un gotcha de tooling nuevo
  para el proyecto, no visto en sesiones anteriores).
- **Transiciones de ejercicio fiscal, mismo patrón que UK/Dinamarca**: Genoa (dic→jun, 2023→2024) y
  Parma (jun→dic, alrededor de 2018) cambiaron la fecha de cierre de su ejercicio en algún momento de
  su historia reciente — chequear la duración real de cada ejercicio de transición antes de cargar.
- **Sassuolo y Torino cierran a fin de año calendario (31 de diciembre)**, no a 30 de junio como la
  mayoría — no es un error, es la convención de esos dos clubes en particular.

## Serie B (2026-10-03): casi ninguno publica

Se barrieron 18 clubes de Serie B 2025/26 (sitio oficial, Wayback CDX de dominio, Firecrawl map y búsqueda web). **Solo Monza (3 ejercicios) y Sampdoria (3) publican bilanci en su web**; los otros 16 (Palermo, Venezia, Empoli, Spezia, Bari, Frosinone, Catanzaro, Padova, Modena, Reggiana, Südtirol, Cesena, Mantova, Pescara, Carrarese, Avellino) no tienen ningún documento financiero público: lo que existe son cifras en prensa y blogs (Luca Marotta, forums de hinchas: leads secundarios, no fuentes) y agregadores de registro. Hipótesis (no verificada contra el Manuale): la obligación de publicar de la licencia UEFA alcanza a los clubes que compiten en UEFA (Serie A), y los de B y C solo depositan en el Registro Imprese, que es de pago. **No conviene repetir este barrido en Serie C** salvo clubes con señal concreta (club cotizante, gran dueño que publica); el costo por club es alto y el rendimiento esperado, casi cero.

## Barrido del 2026-10-07: más años, más clubes, Serie B-D, rugby, tenis (6 agentes)

Resultado: ~124 PDFs nuevos en `Clubes/Italia/` (sin transcribir ni cargar). Detalle por club en `fuentes/Italia/<Club>.md`; resúmenes en `_rugby.md`, `_tenis.md`, `_calabria-sicilia.md` y `_serie-c-d.md`.

- **Más años de Serie A**: AS Roma 2005-2017 (Wayback del sitio viejo + subpáginas vivas), AC Milan grupo dic 2008-2013, Lazio 1998/99-2000/01 y 2003/04-2004/05 (Wayback + Borsa Italiana) más 2025/26 (publicado el 2026-10-06), Parma 10 archivos 2016-2025, Inter 2017/18-2018/19 y 2020/21 (en inglés), Napoli 2018-2019, Sassuolo 2018-2019, Bologna 2023/24-2024/25 (individuales; ya no es consolidado), Hellas Verona 2024, Sampdoria 2020. Sin novedad en Atalanta, Torino, Genoa, Como, Cremonese y Monza (la CDX de dominio completo confirma que no hay nada anterior). Pendientes: Sampdoria 2022-2025 (el club dejó de publicarlos), Udinese 2022/23-2023/24 (solo truncados en Wayback), Cagliari, Fiorentina 2018 y 2022/23, Milan dic 2014-2016, Lazio 2001/02, 2002/03 y 2005/06 final. Revisar Inter, Milan, Juventus y Roma a partir de noviembre (cierres de junio 2026 aprobados, fascículo sin publicar).
- **Clubes extintos valen** (decisión de Guido): Chievo Verona 2014-2016 rescatado de Wayback; Salernitana 2022-2023 (página oficial borrada, PDF vivos en el CDN `salernitana.b-cdn.net`); Catania viejo 2010/11 (extracto del Registro Imprese que subió CataniaToday, `secondary_press`).
- **Dueño cotizante en la SEC**: Juve Stabia, vía su dueño Brera Holdings PLC (6-K del 2025-10-27, IFRS de primera adopción, no el bilancio OIC). Leads a futuro: Savoia (90% de RoyaLand, emisor de la SEC) y Brera FC (consolidado en el informe anual de Brera).
- **Serie B-D**: Serie B completa (Juve Stabia hallazgo; Virtus Entella y los ascendidos Arezzo, Ascoli, Benevento y Vicenza, no publican); 49 clubes de C y 9 de D con señal, cero PDFs financieros propios. Calabria y Sicilia: Catanzaro, Palermo, Crotone, Cosenza, Reggina, Trapani, Messina, Siracusa y Vibonese, dead-end reconfirmado con Firecrawl map, CDX y Exa. Canales sistémicos: el Manuale Licenze Nazionali 2026/27 exige licencia pero no impone publicar; la Commissione indipendente publica sanciones y su propio rendiconto, no balances por club; el Registro Imprese es de pago. **Gotcha de Wayback**: la CDX de dominio devuelve cuerpo vacío con HTTP 200 si se lanzan consultas en paralelo (falso "0 PDF"); repetir en serie con 8-10 s de pausa.
- **Rugby**: lo decide la forma jurídica. Los clubes (S.r.l., S.S.D., ASD) solo depositan en el Registro Imprese; publica la FIR, que controla Zebre Parma al 100%. Bajados: FIR consuntivi 2020-2024 y Zebre bilanci 30/06/2021-2024 (KPMG, escaneados). Benetton Rugby y 13 clubes del Top10 y de abajo, dead-end.
- **Federaciones**: la FIR y la FITP entran al sitio (decisión de Guido). FITP: consuntivi 2012-2018 y 2020-2024 desde `fitp.it/Federazione/Bilanci/Bilanci` (la lista se arma con JS, hay que apretar "Carica altri"); falta 2019 y el 2025 saldría hacia enero de 2027. Entes vinculados con PDFs: FITP Business & Media, Sportcast, Mario Belardinelli, y Sport e Salute (S.p.A. del Estado, dueña del Foro Italico, 2010-11 y 2013-2025): si entran al sitio es decisión de Guido. Los circoli de tenis ASD no publican (Canottieri Aniene tiene un bilancio sociale 2013).
- **Gotchas**: el CDN propio del club puede seguir sirviendo PDFs con la página oficial borrada; los adjuntos del Drupal viejo de un club desaparecido quedan en Wayback; en Sport e Salute las URLs cortas de 2018-2020 devuelven HTML con 200 (usar el nombre largo).
- **Mails posibles (no enviados)**: ver `paises/Italia.md`, sección "Mails posibles".

## Cómo mantener esta nota

Actualizar si algún club en cero (Torino/Pisa/Lecce/Cagliari) destraba su situación, si se completa el
histórico bursátil de Lazio, o si aparece un nuevo gotcha de CDN roto en otro club italiano no
cubierto todavía por esta sesión.

## Pendientes (venían del TODO)

- (ex to-do 128, actualizado 2026-10-07) Sourcing Italia. Fútbol: lo que sigue abierto está en la sección del barrido del 2026-10-07 (Sampdoria 2022-2025, Udinese, Cagliari, Fiorentina, Milan dic 2014-2016, Lazio 2001-2003 y 2005/06, y los cierres de junio 2026 de Inter, Milan, Juventus y Roma). Serie C y D: no barrer más sin señal concreta. Pendiente de 2ª tanda: vóley (SuperLega, A1 femenina; UYBA Volley es 51% de Brera Holdings, que reporta a la SEC) y básquet (LBA), sin empezar; pregunta útil: qué obligación de publicar tiene cada forma jurídica.
