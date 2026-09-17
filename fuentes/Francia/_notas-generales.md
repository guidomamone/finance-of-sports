# Notas generales — Francia

Octavo país nuevo de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético (sesión
2026-09-17), inmediatamente después de Dinamarca. La Ligue 1 2025/26 tiene 18 clubes (confirmado vía
Wikipedia antes de arrancar): Angers SCO, AJ Auxerre, Stade Brestois 29, Le Havre AC, RC Lens, LOSC
Lille, FC Lorient, Olympique Lyonnais, Olympique de Marseille, FC Metz, AS Monaco, FC Nantes, OGC
Nice, Paris FC, Paris Saint-Germain, Stade Rennais FC, RC Strasbourg Alsace, Toulouse FC (Lorient,
Paris FC y Metz subieron de Ligue 2; Montpellier, Saint-Étienne y Reims bajaron).

**Resultado de esta sesión: los 18 quedaron cubiertos**, pero con un patrón de canal muy distinto al
resto de Europa continental — acá NO hubo un registro mercantil tipo Bélgica/Dinamarca gratis y sin
login. En cambio, el hallazgo real fue un **agregado de liga con bilanes individuales por club**
(sección 1) más un **caso individual excepcional** (Olympique Lyonnais/Eagle Football Group, cotiza en
bolsa, sección 3).

## 0. Pista descartada primero: `data.inpi.fr` (el registro mercantil francés) bloqueado por
## captcha + cuenta obligatoria, NO por pago

La pista con la que arrancó la sesión (INPI como equivalente francés de la Centrale des bilans belga o
el CVR danés) resultó ser un dead-end de tipo "acceso bloqueado", distinto de Marruecos/Austria (pago)
pero igual de estructural para un agente:

- **La ficha de identidad de cada sociedad SÍ es 100% pública y gratis, sin login**: navegando a
  `data.inpi.fr/entreprises/<SIREN>` se ve razón social completa, forma jurídica, capital social,
  fecha de cierre de ejercicio, dirigentes y hasta el nombre del comisario de cuentas (auditor) — muy
  útil para confirmar la entidad exacta antes de buscar el bilan en cualquier otro canal.
- **La sección "Documents associés" de esa misma ficha SÍ lista cuántos "Comptes annuels" tiene
  depositados cada sociedad** (confirmado: OGC Nice tiene 28 comptes annuels depositados) — pero para
  desplegar la lista y descargar cualquiera hay que resolver un **captcha (FriendlyCaptcha, "Je ne
  suis pas un robot")**, y aunque se resuelva, el documento en sí requiere haber creado una cuenta
  (nombre/apellido/email) — confirmado también por búsqueda externa ("el usuario debe crear una
  cuenta" para acceder a comptes annuels/actes/statuts). **Ninguna de las dos cosas (resolver un
  captcha, crear una cuenta) es algo que este agente pueda hacer** — son acciones explícitamente
  prohibidas para la sesión, no un límite de tooling. Si Guido quiere completar esta vía, tiene que
  hacerlo él mismo: crear la cuenta gratis en data.inpi.fr y bajar los PDF a mano.
- **La propia API pública de INPI (`Acceso API - Entreprises`, SFTP)** tiene el mismo problema: exige
  "conectarse a tu cuenta" antes de generar credenciales — no hay clave anónima como en Bélgica/
  Dinamarca.
- **El buscador React de `data.inpi.fr` (`/search?q=...`) devolvió 0 resultados para nombres de club
  reales** (ej. "PARIS SAINT GERMAIN") en esta sesión — no se investigó a fondo si es un bug del sitio
  o un bloqueo anti-bot parcial (algunos JS del buscador devolvían 403 de Cloudflare mientras otros
  assets cargaban bien); navegar DIRECTO a `/entreprises/<SIREN>` conociendo el SIREN de antemano sí
  funciona siempre, así que no hizo falta insistir con el buscador.

## 1. El hallazgo real: los informes de la DNCG, con bilan + cuenta de resultados de CADA club
## profesional (Ligue 1 Y Ligue 2), gratis y sin login, 20+ años de historia

La Direction Nationale du Contrôle de Gestion (DNCG, el órgano de control económico de la LFP/FFF)
publica anualmente dos documentos por temporada, y **el portal `sta.lfp.fr/reports-dncg` los aloja
todos gratis, sin login, con URLs `.pdf` directas descargables por `curl` sin ningún bloqueo**:

- **"Rapport financier du football professionnel français"**: el informe agregado con comentario,
  cifras macro de toda la Ligue 1 + Ligue 2 y metodología — equivalente al DFL Finanzkennzahlen
  alemán/ÖFBL austríaco.
- **"Comptes individuels des clubs"**: el documento con MÁS VALOR para este proyecto — trae, club por
  club, el **bilan (activo/pasivo) y la cuenta de resultados con 2 años de comparación** de CADA
  sociedad de Ligue 1 y Ligue 2 de esa temporada, incluyendo el detalle del perímetro societario
  declarado (ej. "SASP OGC NICE + SARL PROMOFOOT + ASSOCIATION", "SASP + OM ASSOCIATION + OM
  DÉVELOPPEMENT + OM MÉDIAS" para Marsella). Confirmado con grep en el PDF 2022/23: **los 18 clubes de
  Ligue 1 2025/26 aparecen todos** en ese único documento (incluido Paris FC, que jugaba en Ligue 2 esa
  temporada — el documento cubre las dos divisiones).

**Se bajaron 21 temporadas** (`Clubes/Francia/_DNCG-Agregado-Liga/`, un solo PDF por temporada cubre
TODOS los clubes, no hay carpeta por club): `dncg-comptes-individuales-<temporada>.pdf` para 2002/03 a
2022/23 (sin hueco, salvo 2015/16 que no tuvo comptes individuels ese año — solo el rapport) más
2024/25; y `dncg-rapport-financiero-<temporada>.pdf` para las mismas 21 temporadas más 2015/16. Las
temporadas 2000/01 y 2001/02 tienen solo un PDF de "estadísticas" (participación/licencias), sin bilanes
reales — no se bajaron, no es información financiera.

- **Pendiente, no resuelto esta sesión: temporada 2023/24.** `sta.lfp.fr/reports-dncg` todavía no la
  tiene indexada (se confirmó navegando la página entera: salta de 2022/23 a nada más reciente), y no
  se encontró la URL exacta del PDF en ningún mirror de prensa pese a varios intentos de búsqueda
  (sí se encontró y confirmó 2024/25, ver abajo). Retomar en una sesión futura — buscar de nuevo si
  `sta.lfp.fr/reports-dncg` ya la indexó, o pedirle el "dossier de presse DNCG 2023-2024" a un
  periodista especializado (patrickbayeux.com, lepetitlillois.com cubrieron esa temporada con cifras
  pero sin linkear el PDF fuente).
- **La temporada 2024/25 SÍ se consiguió, pero en un mirror de prensa, no en el dominio oficial**:
  `sta.lfp.fr/reports-dncg` tampoco la tiene todavía. Se bajó de
  `patrickbayeux.com/wp-content/uploads/2026/04/2604-Dds-lfp-sncg-COMPTES_INDIVIDUELS_CLUBS_2024_2025.pdf`
  (y el rapport financiero del mismo prefijo `2604-Dds-lfp-DNCG_SITUATION_FOOTBALL_PROFESSIONEL_2024_2025.pdf`)
  — Patrick Bayeux es un consultor/periodista de finanzas deportivas que recibe el "dossier de presse"
  (`Dds`) de la LFP y lo publica en su sitio; el contenido coincide en formato/estilo con los años
  confirmados en el dominio oficial, así que se trata como `reliability: secondary_press_mirror` del
  documento oficial, no como una fuente alternativa — pero documentado como tal, siguiendo la regla 0
  del skill de sourcing (fuente oficial primero, prensa como último recurso documentado).
- **Gotcha de descarga**: el dominio `media.fff.fr` (donde también circula un PDF con el mismo nombre
  de archivo pero que resultó ser el anexo de ESTATUTOS de la DNCG, no el informe financiero — ver más
  abajo) está detrás de un desafío JS anti-bot que bloquea `curl` con 403 aunque el navegador real lo
  sirva bien; la vuelta que funcionó (mismo patrón que Brasil/Cloudflare, sección 3 del skill) fue
  navegar al dominio raíz con el Browser pane y usar `fetch()` + conversión a base64 desde la consola
  de la página (mismo origen, sin problema de CORS) para extraer el PDF.
- **Cuidado con un nombre de archivo engañoso**: `media.fff.fr/uploads/documents/dncg-saison-2024-2025.pdf`
  NO es el informe financiero pese al nombre — es el anexo de ESTATUTOS de la DNCG a la convención
  FFF/LFP (composición de comisiones, reglamento interno). El informe financiero real está en
  `sta.lfp.fr`/`patrickbayeux.com` con el nombre "COMPTES_INDIVIDUELS_CLUBS"/"SITUATION_FOOTBALL...".
  Verificar siempre el contenido de la primera página antes de asumir por el nombre.

## 2. AS Monaco: la única sociedad de la Ligue 1 que NO es de derecho francés

El propio informe DNCG 2022/23 describe a AS Monaco como **"SA à loi monégasque + Association"** — a
diferencia de los otros 17 clubes (todos SA/SAS/SASP de derecho francés), el club está constituido
bajo derecho del Principado de Mónaco, no de Francia. Pese a esto, SÍ hay una sociedad con SIREN
francés registrada («AS MONACO FOOTBALL CLUB SA», SIREN 515109692) — no se confirmó en esta sesión si
es una filial operativa francesa, la entidad que reporta a la DNCG, o una sociedad distinta de la
entidad monegasca real. Duda anotada en `dudas-por-club.md`. Esto también significa que, si en el
futuro se investiga el Registre du Commerce et de l'Industrie de Mónaco (no INPI/RNE francés) como
canal para AS Monaco específicamente, podría haber un documento societario monegasco adicional que
esta sesión no buscó.

## 3. Olympique Lyonnais / Eagle Football Group: el único club de Ligue 1 con casa matriz que cotiza
## en bolsa — mismo patrón que Manchester United (Inglaterra) y Club América/Ollamani (México)

**El mejor hallazgo individual de esta sesión.** La sociedad operativa del club es "Olympique Lyonnais"
(SASP, SIREN 385071881), pero su casa matriz — hoy **Eagle Football Group SA** (hasta ~2024 "OL
Groupe SA", renombrada tras la consolidación de propiedad bajo John Textor) — **cotiza en Euronext
Paris** y por lo tanto está obligada por la AMF a publicar un "Document d'Enregistrement Universel"
(DEU, el equivalente francés al 20-F/10-K, IFRS consolidado completo con notas) todos los años, gratis
y sin login, alojado en `finance.ol.fr` (redirige a `finance.eaglefootballgroup.com`) y distribuido vía
`actusnews.com` (el difusor de información regulada que usa la sociedad).

- **9 ejercicios bajados** a `Clubes/Francia/Olympique Lyonnais/` (`OL-Groupe-DEU-<temporada>.pdf`):
  2007/08, 2017/18 (versión inglesa, no se encontró la francesa), 2018/19, 2020/21, 2021/22, 2022/23,
  2023/24 (+ un amendement/corrección del mismo ejercicio), 2024/25.
- **Huecos sin resolver esta sesión**: 2008/09 a 2016/17 (9 ejercicios) y 2019/20 — la sociedad cotiza
  desde su IPO de febrero de 2007, así que en teoría existe un DEU/"document de référence" para cada
  uno de esos años también, pero no se encontró la URL exacta en `actusnews.com` pese a varios
  intentos de búsqueda (el archivo histórico de `investisseur.olympiquelyonnais.com`, que podría haber
  tenido el listado completo, ya no resuelve). Pista para retomar: buscar en `actusnews.com/en/documents`
  o `actusnews.com/en/press-releases` filtrando por la sociedad, o pedir el histórico completo al AMF
  directamente (BASE DOC).
- **Ojo con el perímetro**: como en México/Ollamani (fútbol + estadio) y MSG Sports (dos clubes), el
  DEU de Eagle Football Group consolida el fútbol de Lyon con OTROS clubes que John Textor fue
  comprando (Crystal Palace hasta su venta en 2025, Botafogo de Brasil, RWD Molenbeek de Bélgica) —
  desglosar el segmento "Olympique Lyonnais" puro del consolidado del grupo es trabajo de mapeo, no de
  sourcing; anotado para la sesión de carga de datos.

## 4. Los otros 16 clubes: SIREN confirmado vía la API pública `recherche-entreprises.api.gouv.fr`,
## cobertura real solo a través del agregado DNCG (sección 1)

Para los 16 clubes restantes no se encontró ningún canal de disclosure individual propio (ni cotizan,
ni publican voluntariamente un "rapport financier" en su sitio oficial — no se revisó exhaustivamente
el sitio de cada uno, pero es la norma en Ligue 1: la enorme mayoría son propiedad de un dueño
privado — fondos, familias, Estados extranjeros — sin obligación ni costumbre de transparencia
voluntaria). Su SIREN exacto (necesario para cuando Guido cree su cuenta en data.inpi.fr, o para
cualquier sesión futura) se confirmó vía **`recherche-entreprises.api.gouv.fr`**, una API pública del
gobierno francés (Etalab/data.gouv.fr), gratis, sin login, sin límite conocido, que devuelve JSON
directo (`?q=<nombre>&activite_principale=93.12Z`) — mejor que pelear con el buscador roto de
data.inpi.fr. Su cobertura financiera real es la del informe DNCG agregado (sección 1): todos
aparecieron en el PDF 2022/23 revisado. Ver cada ficha de club para el SIREN y la forma jurídica
exacta.

**Herramienta relacionada, no usada a fondo por tiempo**: `annuaire-entreprises.data.gouv.fr` (mismo
Etalab) tiene una pestaña "Indicateurs financiers" que muestra cifras clave (facturación, EBE,
resultado neto) por ejercicio de CUALQUIER SIREN, gratis, sin login — confirmado funcionando para PSG
(9 ejercicios individuales 2015/16-2024/25 + 6 consolidados). Es un buen complemento rápido para
verificar un total antes de cargar datos, aunque no reemplaza el bilan completo (esa pestaña de
"Bilans PDF" SÍ está bloqueada, reservada a agentes públicos con ProConnect).

## 5. Formato de los documentos descargados

Todo lo bajado esta sesión es `.pdf` con capa de texto real (no escaneos) — nada de `.tif`/`.xhtml`
como Dinamarca, nada de `.htm`/`.html` como los filings SEC. **No hace falta agregar ninguna extensión
nueva al `.gitignore`** del proyecto; la regla existente para `Clubes/**/*.pdf` alcanza.

## Cómo mantener esta nota

Actualizar si se consigue el PDF de la temporada 2023/24 de la DNCG en el dominio oficial, si se
completa el histórico de Eagle Football Group/OL Groupe (2008/09-2016/17 y 2019/20), si se confirma la
relación entre "AS Monaco Football Club SA" (SIREN francés) y la entidad monegasca real, o si algún
club privado de Ligue 1 empieza a publicar voluntariamente (poco probable, pero revisar si cambia de
dueño a un fondo con obligaciones de reporting, como pasó con RC Strasbourg/BlueCo).
