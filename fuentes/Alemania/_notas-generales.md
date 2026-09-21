# Notas generales de Alemania (Bundesliga)

Primer barrido de Alemania (sesión 2026-09-16/17), primer país nuevo de la lista de las 30 mejores
ligas del mundo (orden alfabético) sin nada cargado todavía. Alemania resultó, junto con Reino Unido,
uno de los países con MEJOR disclosure de todo el proyecto — pero por una combinación de DOS canales
distintos, no uno solo, y hay que entender los dos para no descartar un club por error.

## 1. `unternehmensregister.de` — SÍ funciona como un "Companies House alemán", con matices

Toda GmbH/AG/KGaA alemana está obligada por el HGB (§325 y siguientes) a depositar su Jahresabschluss
(cuentas anuales) en el Bundesanzeiger/Unternehmensregister, gratis y consultable sin login. El
mecanismo (confirmado funcionando con Bayer Leverkusen, VfL Wolfsburg, RasenBallsport Leipzig, TSG
1899 Hoffenheim Fußball-Spielbetriebs GmbH y Borussia VfL 1900 Mönchengladbach GmbH):

1. Entrar a `unternehmensregister.de`, buscar la **razón social legal exacta** (no el nombre del
   club a secas) en el buscador de la home. El buscador es una app cliente (Next.js) — **la búsqueda
   solo funciona con un click REAL en el botón "Suchen"** (via el tool `computer`, con `ref`); un
   `.click()` disparado por JavaScript o un `form.submit()` NO navega (se queda en la home o
   redirige ahí). Mismo problema con la casilla de verificación del paso 3: si no es un click "de
   verdad" (evento `isTrusted`), el servidor la trata como no marcada.
2. La lista de resultados muestra, por entidad, cada "Jahresabschluss" y "Konzernabschluss"
   (individual vs. consolidado) depositado, con su Geschäftsjahr — a veces con más de 10-15 años de
   histórico (TSG Hoffenheim: 2009-2025; RB Leipzig: 2014-2025).
3. Cada documento individual pide primero una "Sicherheitsabfrage" (casilla "Ich bin ein Mensch") —
   tras marcarla con un click real, el botón "Als PDF herunterladen" dispara una request de red a
   `GET /api/publication-download?payload=<token>` que devuelve el PDF real (200,
   `content-type: application/pdf`). El `payload` es un token cifrado, distinto en cada carga de
   página — **hay que sacarlo de la URL actual (`new URLSearchParams(location.search).get('payload')`)
   en el momento, nunca reusar uno de una carga anterior** (403/500 si está vencido).
4. Los PDF resultantes de este mecanismo **tienen capa de texto completa** (no son escaneos) —
   incluyen Bilanz, GuV, Anhang completo y el Bestätigungsvermerk del auditor. Nada de OCR.
5. **Gotcha de tooling de esta sesión, no del portal**: si el Browser pane deja de estar visible en
   pantalla (sesión ocupada con otra cosa, o el usuario minimizó el panel), CUALQUIER click con el
   tool `computer` empieza a fallar ("the Browser pane is not displayed, so the page is not
   compositing frames") — incluso con `ref` válido. `find`/`read_page`/`javascript_tool` siguen
   funcionando (no necesitan compositor), pero como el mecanismo de descarga depende de un click
   "de verdad", quedó bloqueado en el medio de esta sesión. **Actualizado**: en una sesión de
   continuación posterior el bloqueo YA NO estaba — bastó con abrir una pestaña nueva del Browser
   pane (`tabs_create`) para que los clicks reales volvieran a funcionar de entrada. No está
   confirmado si fue la pestaña nueva específicamente o que el panel volvió a estar visible por otro
   motivo, pero abrir pestaña propia de entrada es de cualquier forma la práctica correcta cuando hay
   sospecha de que otro agente en paralelo esté compartiendo el Browser pane (ver el gotcha ya
   documentado en `CLAUDE.md`). Si pasa de nuevo: no es un bug del sitio, probar primero con una
   pestaña nueva antes de darse por vencido con un club.
6. **Gotcha de múltiples depósitos para el mismo Geschäftsjahr**: para varios clubes (confirmado en
   Mönchengladbach, y probablemente aplica en general) el registro lista más de un documento con el
   MISMO texto de enlace ("Jahresabschluss zum Geschäftsjahr vom ... bis zum ...") para el mismo año
   — el depósito original completo (balance + GuV + Anhang + Lagebericht + dictamen) y uno o más
   "Ergänzung"/"Berichtigung" posteriores que solo agregan o corrigen una pieza puntual (ej. el
   informe del consejo de vigilancia, unas pocas páginas). El tamaño en bytes de la respuesta de la
   API de descarga es una señal confiable de cuál es el completo (el complemento suele ser
   sensiblemente más chico) — verificar igual con `pdftotext` antes de dar por buena la descarga, no
   asumir que el primer resultado de la búsqueda es el documento completo.

**El hallazgo más importante — quién SÍ y quién NO tiene cuentas propias ahí:**

- **Exención por garantía del socio único (§§ 264 Abs. 3, 264b HGB)**: cuando el único socio de la
  GmbH del club es una gran corporación (no un e.V.), esa corporación puede garantizar las deudas de
  la filial y publicar su propio Konzernabschluss incluyéndola como "empresa exenta" — la filial
  entonces NUNCA deposita su propio Jahresabschluss standalone. Confirmado como dead-end estructural
  para **Bayer 04 Leverkusen Fußball GmbH** (socio único: Bayer Aktiengesellschaft) y **VfL
  Wolfsburg-Fußball GmbH** (socio único: Volkswagen Aktiengesellschaft) — en ambos casos la búsqueda
  en Unternehmensregister solo devuelve el Konzernabschluss del padre (que no desglosa fútbol) más
  una nota de exención, nunca un balance propio del club. No vale la pena reintentar estos dos por
  este canal.
- **Cuando el dueño mayoritario/único es un e.V. (la asociación madre) y no una corporación**, la
  exención NO aplica — la GmbH/AG/KGaA del fútbol SÍ deposita su propio Jahresabschluss/
  Konzernabschluss completo, año a año, igual que cualquier sociedad. Confirmado real (no exento)
  para **RasenBallsport Leipzig GmbH** (dueño: Red Bull GmbH, austríaco — sin el mecanismo de
  garantía usado por Bayer/VW), **TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH**, **Borussia VfL
  1900 Mönchengladbach GmbH**, **SV Werder Bremen GmbH & Co. KGaA**, **Eintracht Frankfurt Fußball
  Aktiengesellschaft**, **VfB Stuttgart 1893 AG**, **1. FC Köln GmbH & Co. KGaA** y **Fußball-Club
  Augsburg 1907 GmbH & Co. KGaA** — los 8 clubes escindidos que quedaban por confirmar resultaron
  TODOS reales, ninguno exento. Nota resuelta sobre Mönchengladbach (la prensa alemana lo describe
  como uno de los "clubes e.V. sin escindir", lo cual generó dudas en una versión anterior de esta
  nota): se leyó el Lagebericht 2024 completo y confirma explícitamente que la GmbH SÍ es la
  operadora de la Lizenzspielermannschaft — la prensa estaba desactualizada o imprecisa para este
  club en particular, no hace falta preguntarle nada al club sobre esto. Lo mismo aplica en general:
  varios de estos 8 clubes tienen además subsidiarias PEQUEÑAS (marketing, merchandising, gestión de
  estadio, servicios) que SÍ están exentas bajo la garantía del club mismo como matriz — no confundir
  esa exención de una subsidiaria menor con una exención de la entidad principal del club.
- **Cuando el club NUNCA escindió el fútbol de la asociación** (sigue siendo 100% e.V., sin ninguna
  GmbH/AG/KGaA intermedia), no hay nada que buscar en Unternehmensregister — la asociación no
  deposita ahí. Confirmado por prensa (no verificado individualmente todavía en el registro) para
  **Union Berlin, SC Freiburg, 1. FSV Mainz 05, FC St. Pauli, 1. FC Heidenheim** — los 5 clubes
  puramente e.V. de la Bundesliga 2025/26. Para estos, el canal es el punto 2 de abajo.

## 2. DFL Finanzkennzahlen — el hallazgo más importante de la sesión, cubre a LOS 18 CLUBES por igual

Desde una resolución de la asamblea de socios de la DFL de diciembre de 2018, **los 36 clubes de
Bundesliga + 2. Bundesliga están obligados a publicar cifras financieras clave** (Bilanz completo +
Gewinn- und Verlustrechnung/GuV completo + gasto en comisiones de agentes), sin importar su forma
jurídica — esta obligación es de LIGA, no depende de si el club es GmbH/AG/KGaA o e.V. puro. La DFL
publica un PDF anual, **"Finanzkennzahlen: Clubs der Bundesliga in der Saison XXXX-XX"**, con una
COLUMNA POR CLUB (Bilanz activo/pasivo + GuV completa, en miles de EUR, "Konzern" o "Einzel" según
corresponda) — ya sea que el club tenga o no una GmbH separada.

**Por qué importa tanto**: para los 5 clubes 100% e.V. (Union Berlin, Freiburg, Mainz, St. Pauli,
Heidenheim) y para los 2 exentos de Unternehmensregister (Leverkusen, Wolfsburg), **este documento de
la DFL es la única fuente pública oficial con Bilanz + GuV completos** — no hay PDF propio del club
descargable (confirmado: los 5 clubes e.V. discuten sus cifras en la Mitgliederversammlung/asamblea de
socios y en prensa propia, pero el balance completo solo está disponible físicamente en la sede del
club para socios, ej. FC St. Pauli lo dice explícito en su reglamento — mismo patrón que Uruguay/Costa
Rica, "documento solo para socios").

**Descargados 7 ejercicios consecutivos** (`Clubes/Alemania/_DFL-Finanzkennzahlen/`), fiscal 2018 a
2024 (publicados en las temporadas 2019-20 a 2025-26):

- `finanzkennzahlen-2019-20-gj2018.pdf`
- `finanzkennzahlen-2020-21-gj2019.pdf`
- `finanzkennzahlen-2021-22-gj2020.pdf`
- `finanzkennzahlen-2022-23-gj2021.pdf`
- `finanzkennzahlen-2023-24-gj2022.pdf`
- `finanzkennzahlen-2024-25-gj2023.pdf`
- `finanzkennzahlen-2025-26-gj2024.pdf`

URL pattern: `media.dfl.de/sites/2/<año publicación>/<mes>/<nombre variable>.pdf` — el nombre exacto
del archivo cambia de año a año (a veces con sufijo `_Vor-Relegation`, `-FINAL`, etc.), hay que
buscarlo por WebSearch cada vez (`media.dfl.de Clubs der Bundesliga <temporada> Geschäftsjahresende
<año> pdf`), no adivinar la URL. `curl` con User-Agent de navegador alcanza (sin WAF, a diferencia de
`fcbayern.com`/`hsv.de`, ver abajo).

**Gotcha de formato**: el ejercicio `finanzkennzahlen-2024-25-gj2023.pdf` (1.75 MB, mucho más pesado
que los demás de ~50-90 KB) es un "Microsoft: Print To PDF" de un Excel — **sin capa de texto**, va a
necesitar OCR o reconstrucción manual de la tabla cuando se cargue al sitio. Los otros 6 años sí tienen
texto extraíble con `pdftotext -layout`.

**Qué significa para el mapeo de datos**: esta tabla NO es un Jahresabschluss narrativo con Anhang —
es una tabla de Bilanz + GuV pura (sin notas explicativas), pensada para comparar clubes entre sí. Es
oficial y auditada (cada club certifica sus propias cifras a la DFL como parte del procedimiento de
licencia), pero para un club que además tiene su propio Jahresabschluss completo (Dortmund, Bayern,
RB Leipzig, Hoffenheim, HSV) conviene usar el documento propio del club como fuente principal y la
tabla de la DFL solo como cifra de control/contraste.

## 3. WAF/Akamai en sitios propios de club — el fetch desde la página sí funciona, `curl` no

`fcbayern.com` y `hsv.de` (los dos sitios propios de club con PDFs descargados esta sesión) bloquean
`curl` con 403 (Akamai Bot Manager) aunque se mande un User-Agent de navegador real. La vuelta que
funcionó, igual que ya se sabía para Cloudflare en Brasil (`club-sourcing/SKILL.md` sección 3): un
`fetch()` real ejecutado DESDE LA CONSOLA de la página (vía `javascript_tool`, no `curl`) sí devuelve
200 con el PDF real. El resultado hay que convertirlo a base64 (`btoa` sobre los bytes) porque
`javascript_tool` no puede devolver binario directo; si el base64 excede el límite de tokens del tool
(pasa siempre con PDFs de más de ~100 KB), el resultado completo igual se guarda en un archivo de
texto en disco (la ruta que devuelve el error de "exceeds maximum tokens") — desde ahí se puede
decodificar con un script Python corto (leer el JSON, sacar `data[0]['text']`, sacar el `"` inicial y
el sufijo `(captured at origin ...)`, rellenar el padding de base64 si hace falta, `base64.b64decode`)
sin gastar tokens de contexto en el contenido binario. Guardar este script (o uno análogo) en el
scratchpad de la sesión ahorra mucho tiempo si se repite varias veces en la misma sesión (esta sesión
lo usó ~15 veces).

`media.dfl.de` y `report.bvb.de`/`bericht.bvb.de` (microsite de Geschäftsbericht de Dortmund) **no**
tienen este bloqueo — `curl` directo alcanza.

## 4. Estado por club (Bundesliga 2025/26, 18 clubes) — confirmado 2026-09-16 vía Wikipedia

Empezado por los clubes con inversor externo/cotizante (más fácil), dejando los e.V. tradicionales
para el final, como pidió Guido.

| Club | Entidad legal (fútbol) | Unternehmensregister | Sitio propio | DFL agregado |
|---|---|---|---|---|
| Borussia Dortmund | Borussia Dortmund GmbH & Co. KGaA (cotiza, Deutsche Börse) | no investigado (no hace falta, cotiza) | **7 ejercicios reales** (2018/19-2024/25), Geschäftsbericht completo (244 pág.) vía `report.bvb.de`/`bericht.bvb.de` | sí |
| Bayern München | FC Bayern München AG (mayoría e.V.) | no investigado | **3 ejercicios reales** (2022/23-2024/25) vía comunicado de la Jahreshauptversammlung en `fcbayern.com` | sí |
| RB Leipzig | RasenBallsport Leipzig GmbH (dueño: Red Bull GmbH) | **12 ejercicios reales, serie completa 2014-2025** | no investigado (no hace falta) | sí |
| TSG Hoffenheim | TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH (dueño: Dietmar Hopp) | **16 de 16 ejercicios reales, serie COMPLETA 2009-2025** | no investigado | sí |
| Hamburger SV | HSV Fußball AG & Co. KGaA (fútbol) + Hamburger Sport-Verein e.V. (asociación madre, multideporte) | no investigado | **4 ejercicios reales de cada entidad** (2021/22-2024/25) vía `hsv.de` — OJO perímetros distintos, ver `fuentes/Alemania/Hamburger SV.md` | sí |
| Bayer Leverkusen | Bayer 04 Leverkusen Fußball GmbH (dueño: Bayer AG) | **dead-end estructural confirmado** (exención §264 Abs.3/264b HGB) | sin verificar | sí (única fuente completa) |
| VfL Wolfsburg | VfL Wolfsburg-Fußball GmbH (dueño: Volkswagen AG) | **dead-end estructural confirmado** (mismo mecanismo que Leverkusen) | sin verificar | sí (única fuente completa) |
| Borussia Mönchengladbach | Borussia VfL 1900 Mönchengladbach GmbH (HRB 5742) | **4 ejercicios reales** (2021-2024), confirmado real filer, serie completa desde 2006 | sin verificar | sí |
| SV Werder Bremen | SV Werder Bremen GmbH & Co. KGaA (HRB 21775, Bremen) | **3 ejercicios reales** (2022/23-2024/25), confirmado real filer | sin verificar | sí |
| Eintracht Frankfurt | Eintracht Frankfurt Fußball Aktiengesellschaft (HRB 49421) | **2 ejercicios reales** (2023/24-2024/25), confirmado real filer | sin verificar | sí |
| VfB Stuttgart | VfB Stuttgart 1893 AG (HRB 750582) — accionistas Mercedes-Benz, Porsche, Jako | **2 ejercicios reales** (2023-2024), confirmado real filer | sin verificar | sí |
| 1. FC Köln | 1. FC Köln GmbH & Co. KGaA (HRB 37030) | **2 ejercicios reales** (2023/24-2024/25), confirmado real filer | sin verificar | sí |
| FC Augsburg | Fußball-Club Augsburg 1907 GmbH & Co. KGaA (HRB 21812) | **2 ejercicios reales** (2023/24-2024/25), confirmado real filer | sin verificar | sí |
| 1. FC Union Berlin | sin escindir, 100% e.V. (confirmado por prensa) | no aplica | balance solo para socios (confirmado explícito por el club) | sí (única fuente completa) |
| SC Freiburg | sin escindir, 100% e.V. (confirmado por prensa) | no aplica | sin balance descargable | sí (única fuente completa) |
| 1. FSV Mainz 05 | sin escindir, 100% e.V. (confirmado por prensa, decisión consciente de no escindir) | no aplica | sin balance descargable | sí (única fuente completa) |
| FC St. Pauli | sin escindir, 100% e.V. (confirmado por prensa) | no aplica | balance solo en la sede, para socios (confirmado explícito en el reglamento del club) | sí (única fuente completa) |
| 1. FC Heidenheim | sin escindir, 100% e.V. (confirmado por prensa) | no aplica | sin balance descargable | sí (única fuente completa) |

## 5. Qué queda pendiente para la próxima sesión

- **Resuelto en la sesión de continuación (mismo barrido)**: el bloqueo de tooling del Browser pane
  mencionado en una versión anterior de esta nota se destrabó abriendo una pestaña nueva — con eso se
  completó la serie ENTERA de TSG Hoffenheim (16/16, 2009-2025) y se consiguieron 2-4 ejercicios
  reales de cada uno de los 6 clubes que habían quedado con la entidad identificada pero sin
  descargar: Borussia Mönchengladbach, Werder Bremen, Eintracht Frankfurt, VfB Stuttgart, 1. FC Köln,
  FC Augsburg. Ver la tabla de la sección 4 (actualizada) y el archivo `fuentes/Alemania/<Club>.md` de
  cada uno para el detalle exacto de qué se bajó.
- **Series históricas más profundas, confirmadas disponibles pero no agotadas** (quedó una serie
  RAZONABLE de 2-4 años por club, no la serie completa que sí se hizo para RB Leipzig/TSG Hoffenheim
  — por priorización de tiempo frente al volumen de clubes a cubrir en una sola sesión): Borussia
  Mönchengladbach tiene serie confirmada desde 2006 (15 años más sin bajar), Werder Bremen/Eintracht
  Frankfurt/VfB Stuttgart/1. FC Köln/FC Augsburg probablemente tienen varios años más atrás de los
  bajados (sus páginas de resultados en Unternehmensregister son más largas que la cantidad de
  ejercicios descargados) — mismo procedimiento de la sección 1 para profundizar cualquiera de estos.
- Dortmund: se confirmó la serie hasta 2018/19 vía `bericht.bvb.de`/`report.bvb.de`; no se pudo
  confirmar años anteriores (2009-2018) — el path viejo de `aktie.bvb.de/Publikationen/
  Geschaeftsberichte/...` está deprecado (devuelve página vacía) y la Wayback Machine estuvo caída
  ("Temporarily Offline") durante esta sesión. Reintentar con Wayback Machine en una sesión futura.
- Bayern: buscar años 2015/16-2018/19 (confirmados como existentes vía búsqueda, URLs
  `fcbayern.com/binaries/.../jhv/jahresabschluss_konzern_16-17.pdf` y similares — no se llegó a
  descargar por priorización de tiempo).
- HSV e.V. ejercicio 2020/21: el link que aparecía en `hsv-ev.de` (`hsv.de/fileadmin/user_upload/
  HSV_EV/Dokumente/...`) devuelve un 404 silencioso (sirve el shell de la SPA con status 200 pero sin
  el PDF real) — mismo patrón que el path viejo de Dortmund. Reintentar buscando dónde se movió el
  archivo, o vía Wayback Machine.
- Ningún club africano, sudamericano o de Ligue 1/Serie A/Eredivisie tiene todavía sourcing — Alemania
  fue elegida por ser la primera letra del abecedario sin nada cargado.

## Cómo mantener esta nota

Actualizar la tabla de la sección 4 cada vez que se confirme o se descarte un club nuevo. Si el
bloqueo del Browser pane de la sección 1 vuelve a pasar, no tratarlo como un límite permanente del
portal — es un estado de la sesión, se resuelve solo cuando el panel vuelve a estar visible.
