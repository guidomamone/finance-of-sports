# Notas generales de Suiza (Super League)

Decimosexto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17), recorrida en orden
alfabético, inmediatamente después de Rusia. Los 12 clubes de la Super League 2025/26 confirmados por
Wikipedia antes de arrancar: FC Basel, Grasshopper Club Zürich, FC Lausanne-Sport, FC Lugano, FC
Luzern, Servette FC, FC Sion, FC St. Gallen, FC Thun, FC Winterthur, BSC Young Boys, FC Zürich.

## 1. Zefix — dead-end estructural CONFIRMADO para las cuentas anuales (no solo para el disclosure)

A diferencia de la mayoría de los países europeos recorridos hasta ahora, Suiza NO es miembro de la UE
y su Código de Obligaciones (CO/OR) no exige depósito público de cuentas anuales salvo para
sociedades cotizantes o "de interés público" (bancos, aseguradoras). Confirmado con búsqueda
específica: **Zefix** (`zefix.ch`/`zefix.admin.ch`, el índice central de sociedades) expone gratis y
sin login solo identidad básica (razón social, UID/CHE, sede, forma jurídica, capital, firmantes) —
NUNCA balance ni cuenta de resultados, ni para las AG (Aktiengesellschaft/sociedad anónima) que operan
la mayoría de los clubes. Esto es distinto de Austria/Croacia/Italia/Países Bajos (sección
13/17/21/23 del skill), donde el registro mercantil SÍ tiene el documento completo pero cobra por
descargarlo — acá el documento simplemente no se deposita en ningún registro público, pagando o no.

- **La API pública "ZefixPublicREST" existe pero exige credenciales** (usuario+contraseña, se piden
  por email a zefix@bj.admin.ch) — confirmado con un POST de prueba a `firm/search.json` que devuelve
  `401 Unauthorized` con `WWW-Authenticate: Basic realm="ZefixPublicREST"`. No se pidieron
  credenciales (fuera de scope de una sesión de sourcing puntual, y de cualquier forma no cambiaría
  el resultado: la API solo expone lo mismo que la interfaz web, identidad básica, no cuentas
  anuales).
- **Conclusión: Zefix es un dead-end de PAÍS, no de club por club** — no vale la pena consultarlo caso
  por caso más allá de confirmar la forma jurídica exacta (AG vs. Verein) de cada entidad, que sí es
  gratis y útil para documentar.

## 2. La Swiss Football League (SFL) publica un agregado de liga completa — el canal real más parejo

Igual que la DFL alemana (sección 12), la ÖFBL austríaca (sección 13) y el Deloitte Pro League Report
belga (sección 14), la SFL publica un PDF anual con Bilanz + Erfolgsrechnung de TODOS los clubes que
piden licencia UEFA para la temporada siguiente, en una sola tabla ancha (un club por columna) —
`sfl.ch/de/lizenzierung-finanzzahlen`, sin login, URLs de PDF estables en un bucket S3
(`origins-sportlab-payload-s3.origins-digital.com/sfl/images/...`). Se bajaron **5 ejercicios
(2021-2025)**, guardados en `Clubes/Suiza/_SFL-Finanzzahlen/`. Intentar adivinar URLs de años
anteriores (2016-2020) con los mismos patrones de nombre dio 403 en los 20 intentos — no hay wayback
snapshot útil del dominio viejo (`sfl-org.ch`) tampoco (snapshots desde 2023 son la app cliente sin
contenido renderizado). Retomar en el futuro solo si aparece una pista concreta de dónde vivían esos
años.

- **Gotcha clave: el agregado NO cubre automáticamente a los 12 clubes de cada temporada** — solo
  incluye a los clubes que EFECTIVAMENTE piden la licencia UEFA para jugar competencia europea esa
  temporada, no a la liga completa. Confirmado con prensa (Tages-Anzeiger, sesión 2026-09-17): "Liga
  publiziert Finanzzahlen: FCW beantragte Lizenz für europäische Wettbewerbe" — FC Winterthur solo
  aparece en el PDF de 2023 porque ese año pidió la licencia; en 2024 la nota de prensa confirma
  explícitamente que "Winterthur, along with Yverdon, did not submit their financial figures... unlike
  all other Super League teams". Mismo patrón con FC Thun (solo aparece en 2025, su temporada de
  ascenso) y Grasshopper (falta en 2021). Antes de asumir "no juega esa temporada" ante una ausencia en
  el agregado, chequear si el club simplemente no pidió licencia europea ese año.
- Cobertura real por club en los 5 años bajados (2021/2022/2023/2024/2025): Basel, Young Boys,
  St.Gallen, Luzern, Sion, Zürich, Lugano y Servette aparecen los 5 años. Lausanne-Sport falta en 2022.
  Grasshopper falta en 2021. Winterthur solo aparece en 2023. Thun solo aparece en 2025 (temporada de
  ascenso).

## 3. El sitio propio del club es, lejos, el mejor canal — y varios comparten la MISMA plataforma

Mandato de licencia de la SFL/UEFA aparte, varios clubes suizos publican voluntariamente un
Geschäftsbericht/Jahresbericht completo (Bilanz + Erfolgsrechnung + informe de auditoría) en su propio
sitio, con series mucho más largas que el agregado de liga:

- **FC Basel**: 18 documentos, **2005-2021** (`fcb.ch/pages/geschaftsberichte`), el AG y el Verein
  reportados por separado desde 2021. Dead-end confirmado para 2022 en adelante: el club dejó de subir
  el PDF completo y desde entonces solo hace una "Medienorientierung Finanzen" (rueda de prensa/GV
  verbal, sin PDF descargable) — cubierto para esos años solo por el agregado SFL.
- **FC St.Gallen**: 7 ejercicios, **2018/19-2024/25** (`fcsg.ch/pages/geschaeftsbericht`), incluye
  Revisionsbericht separado de la AG y de la "Event AG" (subsidiaria del estadio/eventos) para el
  último ejercicio.
- **FC Thun**: **13 ejercicios, 2011/12-2024** (`fcthun.ch/de/club/medien-akkreditierungen/
  geschaeftsberichte`) — la serie más profunda encontrada en el país, con un solo hueco (2017).
- **FC Luzern**: 7 ejercicios, **2017/18-2024/25**, pero el sitio se migró a una SPA nueva reciente
  (WordPress viejo con URLs `/publication/<slug>/` → ahora todas devuelven 404/redirect a `/news/`).
  Hubo que reconstruir cada URL de PDF desde snapshots de Wayback Machine de las páginas viejas
  (`wp-content/uploads/<año>/<mes>/...`) — el path viejo de WordPress SIGUE funcionando en el dominio
  vivo salvo que la SPA nueva devuelve su `index.html` (200 pero contenido HTML, no el PDF) para
  cualquier ruta no reconocida por el router del lado cliente, lo cual **hace inútil un chequeo de
  status code 200 con `curl` para confirmar que el PDF sigue ahí** — hay que revisar el `Content-Type`
  o el contenido real, no solo el código HTTP. La descarga real vino de Wayback. Uno de los 7 archivos
  (2022/23) llegó truncado en el primer snapshot probado (mismo gotcha de Wayback ya documentado en
  Italia, sección 21: "content truncated by length") — la CDX API mostró 4 snapshots de la misma URL
  con tamaños muy distintos (1 MB, 21 MB, 22 MB, 3 MB); el de 21 MB fue el completo (31 páginas,
  `pdfinfo` sin errores).
- **BSC Young Boys**: 6 ejercicios (2018, 2020, 2021, 2022, 2023, 2024 — falta 2019), publicados como
  posts de noticia individuales en `bscyb.ch/news?nid=<id>` con el PDF embebido vía un link "(PDF)" o
  "hier" a `/cgi-bin/dynamisch/<nombre variable>.pdf` (el nombre del archivo no sigue un patrón fijo:
  `YB_Geschäftsjahr_2018.pdf`, `Geschaeftsjahr_2020.pdf`, `Geschäftsjahr_2021(1).pdf`,
  `GeschaeftsjahrYB_2022.pdf`, `Geschäftsjahr_2023.pdf`, `Geschaeftsjahr_YB_2024.pdf` — hay que leerlo
  del HTML de cada post, no adivinarlo). 2018 y 2022 son escaneos sin capa de texto (necesitan el flujo
  de OCR del proyecto); el resto tiene texto nativo.
- **Grasshopper Club Zürich**: dead-end de disclosure financiero propio — el club SÍ publica un
  "GC-Jahrbuch" anual en `gcz.ch`, pero es un anuario narrativo/fotográfico multideporte (el club es
  polideportivo, no solo fútbol) sin Bilanz ni Erfolgsrechnung — confirmado leyendo el PDF 2020/21
  completo. Cubierto solo por el agregado SFL.
- **FC Zürich**: dead-end de disclosure financiero propio en el sitio actual (la página
  `fcz.ch/pages/governance` habla de "solidez financiera" sin cifras ni PDF). Hallazgo curioso sin
  seguimiento: existe un Geschäftsbericht 2011 completo (AG + Verein) subido por la cuenta oficial
  `fcz.ch` a Yumpu, pero la descarga está deshabilitada ("Dieses ePaper steht aktuell nicht mehr zum
  Download zur Verfügung") y no se encontraron más años de la misma cuenta con este contenido. La
  entidad legal operadora es "Betriebsgesellschaft FCZ AG" (CHE-100.413.101) — el club (asociación) es
  un Verein aparte. Cubierto solo por el agregado SFL.
- **FC Sion**: dead-end total de disclosure propio — el sitio (`fc-sion.ch`) no tiene ninguna sección
  de transparencia financiera, solo el organigrama del staff. Entidad legal: "Olympique des Alpes SA"
  (propiedad de Christian Constantin). Cubierto solo por el agregado SFL.
- **Servette FC**: dead-end total — `servettefc.ch` no tiene página de documentos oficiales (404 en el
  intento directo). Entidad legal: "Servette Football Club 1890 SA". Cubierto solo por el agregado
  SFL. Nota aparte: existe una auditoría de la Cour des comptes de Genève sobre el uso de subvenciones
  públicas a la formación de jóvenes del club — es un documento de un ente de control externo, no
  cuentas del club, no se persiguió más.
- **FC Lausanne-Sport**: dead-end total, y con el motivo más explícito encontrado en el país: la
  convocatoria a la Asamblea General publicada en `lausanne-sport.ch` dice textualmente que las
  cuentas anuales, el informe de auditoría y el acta de la AG "están disponibles a pedido" en el
  domicilio social de LS-Vaud foot SA (antes Ineos Football SA) — es el mínimo legal suizo de poner
  los documentos a disposición de accionistas, no una publicación pública real. Cubierto por el
  agregado SFL salvo 2022.
- **FC Lugano**: dead-end de disclosure propio — el sitio (`fclugano.com`) tiene un organigrama y notas
  de prensa puntuales sobre el balance a mitad de temporada, pero no un Bilancio/Rapporto annuale
  descargable. Entidad legal: F.C. Lugano SA. Cubierto por el agregado SFL.
- **FC Winterthur**: dead-end de disclosure propio, y el más limitado de los 12 incluso en el agregado
  SFL (un solo año, 2023 — ver punto 2). Entidad legal: FC Winterthur AG (CHE-114.077.713), el club
  Verein es una entidad separada.

## 4. Plataforma común "aico.swiss" — reutilizable en sesiones futuras

Los sitios de FC Basel y FC St.Gallen (y probablemente otros clubes suizos, no confirmado) corren
sobre la misma plataforma de agencia web ("aico.swiss"), que aloja los PDF en
`storage.aico.swiss/<ID_cliente>/files/<nombre>.pdf` — el listado completo de años en la página
"Geschäftsberichte" se arma con JavaScript (una lista de `<a href=".pdf">` que no aparece con un
`curl` plano, hace falta renderizar la página con el Browser pane y extraer los `href` con
`document.querySelectorAll('a[href*=".pdf"]')`). Si aparece un club suizo nuevo con esta misma
plantilla de sitio, este selector JS es el atajo directo a la lista completa de años sin tener que
navegar página por página.

## Cómo mantener este skill

Actualizar esta nota si: (a) se consigue el resto de los años de FC Zürich/Sion/Servette/Lausanne-Sport
por un canal no probado acá (ninguno de los 4 tiene disclosure propio conocido hoy); (b) aparecen años
2016-2020 del agregado SFL por un link no adivinado en esta sesión; (c) se resuelve el hueco de FC Thun
2017 o de BSC Young Boys 2019.
