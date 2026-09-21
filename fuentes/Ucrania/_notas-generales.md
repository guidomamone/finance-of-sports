# Ucrania — notas generales

## Contexto de la sesión

Decimoctavo país nuevo de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético
(sesión 2026-09-18), el ÚLTIMO de esa lista. A diferencia de la mayoría de los países anteriores,
acá NO hubo que pelear con un registro mercantil bloqueado por pago/captcha ni resolver un gotcha de
portal complicado — el hallazgo central fue casi puramente estructural: **una ley general de
contabilidad, no una obligación específica del fútbol**, que obliga a la gran mayoría de los clubes
a publicar sus estados contables auditados en su propio sitio web. El resultado es uno de los
mejores del proyecto: **12 de los 16 clubes de la Прем'єр-ліга України 2025/26 con al menos un
ejercicio real descargado**, varios con series largas (PoliССя: 9 ejercicios 2016-2024; Karpaty
Lviv: 5 ejercicios 2021-2025; Veres: 5 ejercicios + reportes intermedios 2020-2025).

## El hallazgo real: art. 14 de la Ley "Про бухгалтерський облік та фінансову звітність в Україні"

La Ley de Contabilidad y Estados Financieros de Ucrania (996-XIV), art. 14, obliga a TODA empresa
"grande" o "mediana" (por criterios de ingresos/activos/empleados, sin importar forma jurídica —
ТОВ, ПрАТ, ПАТ, comunal) a publicar su estado financiero anual COMPLETO junto con el dictamen de
auditor en **su propio sitio web**, antes del 30 de abril (entidades de interés público/PAT) o el 1
de junio (grandes/medianas no públicas) del año siguiente. No es una obligación deportiva ni de
licencia de liga — es una obligación de derecho societario general, así que se aplica a cualquier
club ucraniano que facture lo suficiente para calificar como "mediana" o "grande" empresa, sea cual
sea su forma jurídica. Esto explica por qué encontramos el mismo patrón (`fckarpaty.org.ua/about/
finansova-zvitnist/`, `fcepicentr.com.ua/finansova-zvitnist-za-…`, `fckudrivka.com/finansova-
zvitnist/`, etc.) en clubes con formas jurídicas MUY distintas (ТОВ, ПАТ, incluso una organización
pública sin fines de lucro y una empresa comunal municipal).

**Patrón de búsqueda que funcionó para (casi) cualquier club nuevo**: googlear
`"[nombre del club]" фінансова звітність` o revisar directo el sitio oficial buscando "Фінансова
звітність"/"Документи" en el menú "Клуб" — casi siempre está ahí, con el balance, el estado de
resultados, el flujo de fondos y el dictamen de auditor como PDFs separados (a veces un combinado).
Algunos clubes (Poltava) lo publican como IMÁGENES página por página (JPG) en vez de PDF — mismo
criterio que un escaneo, tratarlo igual.

## Los otros 2 canales investigados, y por qué NO fueron el hallazgo principal

- **Єдиний державний реєстр (usr.minjust.gov.ua)**: confirmado que es SOLO un registro de
  identidad societaria (razón social, EDRPOU, forma jurídica, directores, dirección) — NO sirve
  estados financieros. Hay una consulta gratis (`freesearch`) y una paga (extractos formales), pero
  ninguna de las dos categorías da acceso a balances. Útil únicamente para CONFIRMAR el EDRPOU y la
  forma jurídica exacta de un club antes de buscar en otro lado — lo mismo que ya hacían
  `opendatabot.ua`/`youcontrol.com.ua`/`clarity-project.info` (agregadores privados gratuitos del
  mismo registro, más cómodos de navegar que el sitio oficial).
- **SMIDA / НКЦПФР (smida.gov.ua)**: el regulador de mercado de valores SÍ es un canal real, pero
  solo aplica a sociedades anónimas que emitieron acciones registradas (ПАТ, y en teoría ПрАТ) — la
  ENORME mayoría de los clubes de la UPL son ТОВ (sociedad de responsabilidad limitada), que
  estructuralmente NUNCA van a aparecer en SMIDA (no es un problema de búsqueda, es que ТОВ no emite
  acciones). De los 16 clubes, solo 2 tienen forma societaria de acciones: **Veres** (ПАТ, confirmado
  con un paquete completo de estados financieros IFRS reales para FY2020 en SMIDA — ver
  `Veres.md`) y **Shakhtar** (ПрАТ, pero con SOLO actas de asamblea y "información irregular" en
  SMIDA, CERO estados financieros — ver `Shakhtar.md`). Vale la pena chequear SMIDA (`smida.gov.ua/
  db/feed`, buscar por EDRPOU con el campo "Код за ЄДРПОУ юридичної особи") para cualquier club
  ucraniano nuevo que resulte ser ПАТ/ПрАТ, pero no es el canal principal del país.
  - **Gotcha de tooling de SMIDA**: el buscador de `/db/feed` (el sistema vigente desde ~2013) exige
    un token CSRF de la página cargada — un `curl` directo con parámetros de query no filtra nada
    (devuelve el feed completo sin filtrar, silenciosamente, sin error). Hay que cargar la página
    con el Browser pane, tipear el EDRPOU en el campo, y clickear "Пошук" con click real. El archivo
    viejo (`/db/emitent/reports`, sistema pre-2013) SÍ filtra bien por URL con solo el EDRPOU como
    parámetro, pero solo tiene datos hasta ~2013 — no sirve para clubes actuales.
  - **Dentro de una ficha anual de SMIDA** (`/db/feed/<id>` → "Річна звітність емітента. Склад
    інформації"), el balance/estado de resultados/flujo de fondos/patrimonio completo está en la
    sección "Річна фінансова звітність підприємства" (`/db/feed/showform/fin_general/<id>`) — texto
    HTML completo, no PDF, pero perfectamente citable y guardable como `.html`. El dictamen de
    auditor está en una sección separada, "Відомості про аудиторський звіт..."
    (`/db/feed/showform/auditinfo/<id>`).

## Formas jurídicas encontradas (de los 16 clubes 2025/26)

La mayoría es **ТОВ** (Товариство з обмеженою відповідальністю, sociedad de responsabilidad
limitada): Динамо Київ, Зоря, Олександрія, Кривбас, Металіст 1925 (ahora rebrandeado "ФК Харків"),
Рух Львів, Кудрівка, Колос Ковалівка, ЛНЗ, Полтава (СК Полтава). Dos excepciones societarias:
**Верес** es ПАТ (Публічне акціонерне товариство, sociedad anónima pública — cotiza, ver arriba) y
**Шахтар** es ПрАТ (Приватне акціонерне товариство, sociedad anónima privada). Dos casos atípicos
más: **Епіцентр** es una **ГО** (Громадська організація, organización pública sin fines de lucro,
EDRPOU 43731024) y **Полісся** es una **КП** (Комунальне підприємство, empresa municipal — depende
del ayuntamiento de Zhytomyr). Ninguna de estas 4 formas jurídicas distintas impidió que el club
publicara sus estados financieros — la obligación del art. 14 aplica igual a todas por tamaño de
empresa, no por forma societaria.

## Dead-ends confirmados (3 clubes, sin lead nuevo)

**Динамо Київ, Зоря (Луганськ) y Кривбас (Кривий Ріг)** no tienen ninguna sección de "Фінансова
звітність"/transparencia en su sitio oficial — confirmado revisando el menú completo (no solo la
portada) vía JS (`document.querySelectorAll('a')` filtrado por palabras clave). Kryvbas sí tiene una
página "Публічні документи" (`fckryvbas.com/publichni-dokumenti`), pero solo contiene contratos de
servicios de la academia infantil, nada financiero. Como son ТОВ, tampoco tienen canal SMIDA. Sin un
ángulo nuevo que probar — el dead-end es de "no publicaron", no de "portal bloqueado", así que no
hay gotcha de acceso que resolver, solo esperar a que el club decida publicar (o preguntarles
directo, ver `dudas-por-club.md`).

## Bloqueo de TOOLING, no de disclosure: Oleksandriya

`fco.com.ua` (Олександрія) devuelve **403 Forbidden (nginx)** para CUALQUIER acceso automatizado —
confirmado con `curl` (con y sin User-Agent de navegador), `WebFetch`, y el Browser pane real (que
también recibió el 403, o sea que no es un bloqueo anti-bot que un navegador real esquive, parece un
bloqueo de rango de IP/geográfico a nivel de servidor). El propio índice de Google SÍ tiene indexado
`fco.com.ua/wp-content/themes/fco/files/fin_zvit-2020.pdf` ("Футбольний клуб «Олександрія»
Фінансова звітність за..."), confirmando que el club publica igual que el resto del país — el
documento existe, simplemente no se pudo bajar desde este entorno. Vale la pena reintentar desde una
sesión futura (puede ser un bloqueo transitorio o específico de la IP de este entorno), o pedirle el
PDF a Guido si tiene acceso de otra red.

## Cómo mantener esta nota

Si en el futuro se abre alguno de los 3 dead-ends (Динамо/Зоря/Кривбас publican por primera vez) o
se resuelve el bloqueo de Oleksandriya, actualizar esa sección en vez de dejarla como blocked. Si se
agrega un club nuevo (ascenso a la UPL), el patrón a seguir es: 1) confirmar forma jurídica y EDRPOU
en `opendatabot.ua`/`youcontrol.com.ua`, 2) revisar el sitio oficial por "Фінансова звітність"/
"Документи" en el menú, 3) solo si es ПАТ/ПрАТ, chequear también SMIDA.

- Último chequeo: 2026-09-18.
