<!-- md: lo que las cabeceras de las tools tenían de más (campos, casos, medidas), tal cual, una sección por tool | leer: al tocar una tool cuya cabecera apunta acá -->
# Notas de las tools

Lo que se sacó de la cabecera de una tool para que no se lea en cada sesión que la abre. Lo escribe `node tools/acortar-cabecera.mjs`; el texto es el original, sin cambios.

## ajustes.mjs

```text
EN CADA ESCALERA, EL AJUSTE ES EL ESCALÓN 0: si hay un ajuste para ese documento y ese campo, gana siempre. Queda escrito en el
.verificacion.json ("ajustes") y cargar.mjs lo copia como comentario en la meta del año.

CAMPOS (cada uno existe por un caso real; un campo nuevo se agrega acá y en el script que lo aplica):
  resultado-final   valor: el resultado del ejercicio TAL CUAL está impreso (en la escala del documento). verificar.mjs lo toma como
                    resultado final y DEDUCE el impuesto (resultado antes de impuestos según las filas − final). Casos: Fortaleza CEIF
                    2023 (1.021.768: el impuesto contable no es el "a cargo" de la conciliación) y 2017 (1.347.094: el documento no
                    imprime el impuesto en ningún lado).
                    Con --linea (la del .md donde está impreso), también es la PISTA para localizar: un documento que quedó
                    como fuente y tiene este ajuste repite una vez "las notas hacen de estado" con ese dato (lote.mjs --reintentar).
                    Casos: Fortaleza 2018 ("Resultado Año 2018 (639,077)", L542) y 2019 ("Utilidad Contable (52,122)", L455).
  filas-a-mano sin valor: el .ubicacion.json y el .filas.json de ese documento se armaron o se corrigieron a mano. Escalón 0 de tools/localizar.mjs y de
                    tools/extraer.mjs: con --rehacer (y con lote.mjs --rehacer) NO se vuelven a pedir a la IA ni se pisan; quedan como están. Para rehacerlos de verdad hay
                    que quitar este ajuste a conciencia (se agrega otro con --valor no). Casos: Torino 2020 y 2025, Inter 2017-18, Lazio 2021, Salernitana 2022.
  ixbrl-omitir sin valor, con --motivo: apaga para ese documento el freno o el aviso (consolidado) de cargar.mjs que compara el resultado cargado con el
                    `ProfitLoss` etiquetado en su XHTML (tools/ixbrl-resultado.mjs). Para un hecho que no es el resultado del ejercicio (perímetro distinto, minoritarios).
  covid-omitir      sin valor, con --motivo: el documento cierra dentro de la ventana COVID pero su taquilla o entradas en 0
                    NO son por la pandemia (un club que jugó con público): cargar.mjs vuelve a pedir el reintento como en cualquier otro año.
  no-recargar sin valor: lo publicado de ese año es mejor que lo que da una corrida nueva (más desglose, de notas que el script no abre)
                    y no se reproduce con ajustes razonables. tools/cargar.mjs frena (también con --reemplazar). Casos: Lazio 2012-13, Roma 2021.
  estado valor = los ids de los bloques del estado de resultados de ese documento, separados por coma ("b107,b108,b109"): escalón 0 de tools/localizar.mjs,
                    que lo pone en `estado` del .ubicacion.json aunque la IA elija otros (una corrida con --rehacer no lo deshace). Los ids son los del .md actual: si el .md
                    cambia, se revisan. Caso: AS Roma 2005, la IA tomó b85 (la tabla de la controlada Roma International Football Service, en euros) y el estado del
                    consolidado es b107-b112 (pág. 136-137).
  sin-dudas         sin valor: las dudas de localizar/extraer de ese documento quedan como nota y no van a la cola. Caso: Fortaleza
                    CEIF 2023 ("que nunca más vuelva como problema o duda").
  cero-real valor = una categoría del aviso "categorías en 0" ("Estadio", "Televisión", "Salarios del plantel"...):
                    Guido dice que ese 0 es real; escalón 0 del aviso de cargar.mjs (no frena, no pide reintento). Varias por documento.
                    Caso: Fortaleza CEIF 2021, Estadio en 0 (boletería "-" en 2021, L1141; en 2020 fue 191.189).
  desglose etiqueta = el renglón; valor = la diferencia TAL CUAL impresa entre el renglón y la suma de su detalle (un
                    error del documento); --categoria opcional para la fila de la diferencia. verificar.mjs abre el desglose con una fila
                    más, "Diferencia en el documento", si la diferencia es exactamente esa. Caso: Fortaleza 2022 "Patrocinios (1)", 54.000.
  suma-con sobre el PDF de una entidad: el ejercicio suma el de otra entidad del mismo año (Vålerenga: el AS y el Elite no consolidan). valor = el PDF
                    de la otra entidad; --etiqueta = el renglón de gasto propio del que se resta la transferencia; --etiqueta-otra = el ingreso espejo del otro documento
                    (se saca entero); --evidencia = las dos líneas. cargar.mjs suma los dos documentos sin contar dos veces la transferencia (tools/suma-entidades.mjs).
  anio valor: el año del ejercicio cuando el NOMBRE DEL ARCHIVO lo dice mal: escalón 0 del año en
                    tools/alta-club.mjs (analizar, que también usa cargar.mjs) y en tools/quien.mjs --quien. Caso: Goiás,
                    "demonstracoes-contabeis-2017-2016.pdf" es el ejercicio 2017 (con 2016 de comparativo) y el nombre daba 2016.
  categoria etiqueta = la fila tal cual; valor = una categoría de data/category-map.js. Escalón 0 de la escalera de
                    categorías de cargar.mjs: gana sobre todo, también sobre la COMPUERTA DEL LADO. Si la categoría es del otro lado, la
                    fila se muda de lado sin cambiar su efecto en el resultado (un ingreso de 140 pasa a gasto de +140). Caso: Goiás 2023,
                    "Outras Receitas e Despesas" 140.214.785 (venta del 20% de la Liga Forte União) como exceptional_items.
  incluye valor = una categoría que da 0 porque el documento la junta con otra en una línea; --categoria = donde
                    está; --posible si no está confirmado. cargar.mjs lo escribe en fiscalYearMeta.incluidoEn (el sitio pinta "Incluido en"
                    o "Posiblemente incluido en") y no lo trata como un 0 a revisar. Casos: Bahia, Vitória, América Mineiro (member_dues).
  moneda valor = el código ISO de la moneda LEGADO del país (ITL, DEM, ESP...) en la que está un ejercicio anterior a
                    la entrada del euro: Guido decide que se carga en esa moneda y no convertido. Escalón 0 de la moneda en tools/alta-club.mjs
                    (la pregunta "¿se carga en ITL o se convierte a EUR?" queda respondida) y autoriza el cambio de moneda del club en la
                    compuerta 'moneda' de cargar.mjs. Hace falta además el tipo de cambio de ese cierre en FX_CLOSE (data/currency-map.js).
                    Caso: Lazio 1998-99, 1999-00 y 2000-01 en liras.
  escala valor = unidades | miles | millones: la escala de las cifras de ESE año en el documento, tal cual la imprime.
                    Escalón 0 de la escala del año en tools/caja-deuda.mjs (escalaDe), antes de factorPorIngresos; con --anio si el PDF
                    alimenta dos años. Casos: RB Leipzig 2024 (comparativo "30.06.2024 TEUR"; el 2025 del mismo PDF está en EUR), RB Leipzig
                    2023 y HSV 2024 (transcripciones viejas sin tablas: factorPorIngresos no encuentra escala).
  fx el tipo de cambio de cierre, en moneda por 1 USD: escalón 0 de la escalera del tipo de cambio
                    (tools/alta-club.mjs proponerFx, que también usa cargar.mjs). Casos: AC Milan 2021-22 y 2022-23.
  fila una fila del resultado que la extracción no trajo, o trajo mal: etiqueta, lado (ingreso, gasto,
                    financiero, impuesto), valor TAL CUAL impreso (con su signo: un costo financiero en negativo), línea del .md y,
                    opcional, `reemplaza` = la etiqueta de la fila extraída que sale (TODAS las que se llaman así), o `reemplazaLinea` =
                    la línea del .md de la ÚNICA fila que sale (en el formato italiano "altri" es a la vez ingreso, financiero
                    + y financiero −; Bologna 2020-21, L833, L871 y L875). Varias por documento (la clave incluye la etiqueta).
                    Del lado financiero, `--destino profit_on_player_sales` la manda a financial.profit_on_player_sales en vez de net_interest
                    (Auditora 5): «b) Resultados por enajenaciones y otras» del PGC español (Girona 2021-23: +8,50 / −0,297 / −0,76 M), con
                    `--reemplaza` para sacar la línea de ingreso o gasto que la extracción hizo con ella.
                    Casos: Fortaleza CEIF 2017, nota 23 "Otros gastos" 41.780 perdida en un salto de página, y "Total Otros Ingresos"
                    3.581 que en el PDF rotula los costos financieros (etiquetas cruzadas en el propio documento).

ARCHIVO: Admin/registros/ajustes-manuales.jsonl, una línea por ajuste: { pdf, campo, valor, motivo, evidencia, autor, fecha }. Si hay dos para el
mismo pdf y campo (y etiqueta, en `fila`), gana el último (para cambiar uno se agrega otro; el historial queda).
```

## alta-claude.mjs

```text
QUÉ PREGUNTAS SE MANDAN (tipo -> de qué campos de alta-club.mjs sale):
  perimetro   <- perimetro                     ¿individual o consolidado? (con el criterio del proyecto)
  reportType  <- reportType                    ¿estado contable anual, presupuesto, intermedio, no cargable?
  cierre      <- anio, cierre, fiscalYearStart ¿fecha de cierre del ejercicio que presenta el documento?
  moneda      <- currency, reportingCurrency   ¿en qué moneda están los importes?
  fx          <- fx                            ¿qué tipo de cambio de CIERRE a USD declara el documento?
  sport       <- sport                         ¿de qué deporte es el club?
  name        <- name (cuando quedó `pendiente`, típico en griego/cirílico/coreano)   nombre legal
Y qué NO se manda, a propósito: id / country (Escocia, renombrar un id heredado), liga (no está en
el documento), brandColor. Son decisiones de producto o datos externos, no lectura.
Hay además respuestas que resuelven el HECHO pero no la pregunta, porque la pregunta tiene una parte
de producto: un deporte que no es fútbol (¿entra al sitio?) o una moneda anterior al euro (¿se
convierte?) quedan abiertas aunque Claude conteste bien; se guarda igual lo que dijo, con su cita.

FRAGMENTOS: el `.md` se parte por las marcas de página ("--- pág. N ---", o "## Página N" en las
transcripciones viejas). Si entero pesa <= 45.000 caracteres va entero; si no, van las 3 primeras
páginas (portada, índice, nombre legal) + para cada pregunta las 4 páginas con más palabras clave
de su tema (consolidado/individual, fechas de fin de mes, tipo de cambio, dictamen...), hasta
~45.000 caracteres (~12.000 tokens en alfabeto latino). Cada página va con su marca, así Claude
puede citarla.

MODELO: claude-opus-5-5 (default de la skill claude-api), effort `low` (es lectura, no razonamiento
largo), salida JSON estricta (`output_config.format` json_schema), system prompt cacheado,
`fallbacks: "default"`. HTTP sin SDK, como categorizar-claude.mjs. Costo registrado en
Admin/registros/api/claude-api.jsonl con `tarea: "alta-club"` (sin campo `md`, igual que "categorizar":
inventario-transcripciones.mjs cuenta como "pagado" cualquier línea con `md`).
Números medidos: ver Admin/mediciones/test-altas-claude.md.
```

## alta-club.mjs

```text
----------------------------------------------------------------------------
QUÉ HACE
----------------------------------------------------------------------------
Dado un documento de `Clubes/<País>/<Club>/` (el PDF o su `.md`, da igual: se
lee siempre el `.md`, que es la transcripción) y opcionalmente el año:

  1. Resuelve si el club YA EXISTE en el sitio con la regla ÚNICA del proyecto,
     `clubDeCarpeta()` de tools/carpetas-clubes.mjs (la misma que usan onboard.mjs,
     inventario-transcripciones.mjs, pipeline.mjs y audit.js): (a) algún
     `data/<país>/<id>-data.js` o su evidencia (`Admin/carga-clubes/<id>.md`) cita la carpeta `Clubes/<País>/<Club>/` -> ese club; (b) si
     no, el nombre de la carpeta es IGUAL al de un club del mismo país; (c) si no,
     club nuevo. Antes este script tenía su propia regla (citas +
     `onboard.mjs --quien` + desempate por país) y onboard.mjs otra: se reemplazó
     para que no haya dos respuestas posibles para la misma carpeta. (Contexto: el
     registro de transcripciones daba ~205 carpetas "sin cargar" y 17 eran clubes que
     SÍ están en el sitio — Racing, Almagro, Gent, Botafogo... — porque el nombre de
     la carpeta matcheaba a 0 o 2+ clubes.)

  2. Si es nuevo, arma la entrada de `data/clubs.js` con TODOS los campos que
     usan las entradas existentes: id, name, displayName, country,
     reportingCurrency, fiscalYearStart, sport, brandColor.

  3. Para el ejercicio del documento: año y fecha de cierre, liga de esa
     temporada, moneda del ejercicio, tipo de cambio de cierre, tipo de
     documento (reportType), sourceId, y el PERÍMETRO (qué entidad es "el
     club": individual o consolidado, asociación o sociedad).

  4. Escribe su resultado en el REGISTRO DE ALTAS `Admin/registros/altas-club.jsonl` (una línea
     por carpeta, con huella de las entradas: ver tools/altas-registro.mjs). Siempre,
     en cualquier modo salvo --backtest-claude: no depende de que quien lo corre se
     acuerde de anotarlo (pedido de Guido: "las IA se olvidan").

  5. Con `--claude`, manda las preguntas que se responden LEYENDO el documento a Claude
     por API (tools/alta-claude.mjs: una llamada por club, cita textual verificada por
     el script). Lo que Claude sostiene con cita se aplica y puede destrabar el alta.

  6. Con `--escribir`, y SOLO si no quedó ninguna `pregunta`, aplica el alta
     (ver "QUÉ ESCRIBE" abajo), corre los generadores y `node tools/audit.js`,
     y si la auditoría da algún P0/P1 REVIERTE todo lo que escribió.

----------------------------------------------------------------------------
LOS TRES ESTADOS DE CADA CAMPO
----------------------------------------------------------------------------
  ok         el valor sale de una fuente mecánica (el propio documento, una
             tabla del proyecto, una caché ya bajada) sin criterio de por medio.
  pregunta   hace falta CRITERIO de verdad: no se inventa. El texto de la
             pregunta va en el JSON, listo para mandarlo a Claude por API o
             copiarlo a `Admin/dudas-por-club.md`. BLOQUEA `--escribir`.
  pendiente  falta un DATO, no un criterio, y la ausencia es honesta y está a
             la vista: se escribe el valor que el proyecto usa para "todavía
             nadie lo miró" (brandColor AUSENTE, fila de liga en `null`, fx sin
             cotización cacheada) y `node tools/audit.js` lo sigue contando. NO
             bloquea `--escribir`. Existe como tercer estado porque tratar estos
             casos como `pregunta` frenaría el alta de casi todos los clubes por
             cosas que ninguna persona tiene que decidir, solo que alguien corra
             un script de caché (fetch-fx-reference, fetch-club-league-reference,
             fetch-brand-color-reference) — y tratarlos como `ok` sería mentir.

----------------------------------------------------------------------------
DE DÓNDE SALE CADA CAMPO (y qué decide solo y qué NO)
----------------------------------------------------------------------------
id               slug del nombre de la carpeta + '-' + ISO2 del país (convención
                 de `Admin/CONVENCIONES.md`: 'agf-dk',
                 'racingsantander-es'). `pregunta` si choca con un id existente.
displayName      el nombre de la carpeta (que ya es el nombre corto legible que
                 eligió el sourcing), sin lo que vaya entre paréntesis.
name             el nombre LEGAL: se busca en el `.md` una línea con el nombre del
                 club + una forma societaria (A/S, N.V., S.p.A., GmbH, plc, S.A.,
                 SAF, a.s., d.d., A.Ş., P.A.E., FLI...). `ok` si aparece al menos
                 2 veces; si no, `pendiente` con el displayName como valor (no es
                 falso, solo menos completo).
country          tabla PAISES de abajo (nombre de la carpeta del país -> ISO2).
                 `pregunta` para Escocia (el sitio no tiene país propio para
                 Escocia: GB es "Inglaterra" en `data/leagues.js`).
reportingCurrency tabla PAISES. Además mira el documento: si el ejercicio es
                 anterior al euro (o a la redenominación de la lira turca, o a la
                 entrada de Croacia al euro en 2023) y el documento habla en la
                 moneda vieja, `pregunta`; si otra moneda domina claramente el
                 texto, `pregunta`.
fiscalYearStart  del CONTENIDO del `.md`: se cuentan todas las fechas de fin de
                 mes que aparecen (en 15 idiomas, numéricas, ISO y CJK) y el mes
                 de cierre es el más frecuente; el ejercicio arranca el día 1 del
                 mes siguiente. Si el nombre del archivo trae una fecha ISO
se usa como confirmación. Si el documento
                 no alcanza, se mira el resto de los `.md` de la carpeta del club;
                 si tampoco, el patrón del país (lo que usan los clubes del mismo
                 país ya cargados, solo si son unánimes). Si nada de eso alcanza,
                 `pregunta`. Si los documentos del club muestran un CAMBIO de
                 cierre (Genoa: 31/12 hasta 2023, 30/6 desde 2024) se usa el del
                 documento más reciente (criterio de Racing, que cambió del 31/8 al
                 30/6) y se avisa.
sport            'futbol', salvo que el `.md` hable tanto o más de rugby / cricket /
                 Fórmula 1 / NFL que de fútbol, que es `pregunta` ("Football Club" y
                 "National Football League" no cuentan como fútbol: los clubes de
                 rugby ingleses se llaman "... Football Club") (en `Clubes/`
                 hay equipos de F1, rugby y cricket ingleses y los Green Bay
                 Packers: el catálogo de `data/leagues.js` los tiene inactivos).
brandColor       NUNCA lo decide este script. `tools/brand-color-reference/`
                 (caché de footylogos) da candidatos, pero la regla de
                 `club-or-year-onboarding/club-nuevo.md` es identidad primero (¿de qué
                 color es la camiseta?) y hex después, y un color equivocado se
                 lee peor que ninguno. Queda `pendiente`: el campo se escribe
                 AUSENTE (= "nadie lo chequeó", P3 `club-sin-color-ni-null`), no
                 `null` (= "se miró y no lleva color", que sería mentir).

Del ejercicio:
anio / cierre    año de CIERRE (convención del sitio) sacado del nombre del
                 archivo con la misma función que `onboard.mjs --quien`, y
                 confirmado contra las fechas de cierre del contenido. Si no
                 coinciden, `pregunta`.
liga             `data/club-leagues/<iso2>.js` si el club ya tiene fila; si no,
                 la caché de rosters de `tools/club-league-reference/<iso2>.json`
                 (la misma que lee `tools/lookup-club-league.mjs`). Coincidencia
                 EXACTA del nombre normalizado, única, y con la liga en el
                 catálogo -> `ok`. Coincidencia parcial ("OFI Crete" / "OFI") o liga
                 fuera del catálogo -> `pendiente` con la duda en `nota` (hasta el
                 era `pregunta`: con la caché de rosters creciendo, más
                 datos daban MENOS clubes listos, 21 carpetas frenadas solo por esto,
                 y la fila en `null` es la verdad mientras nadie lo confirme). Sin caché
                 para esa liga-temporada -> `pendiente` y la fila se escribe en `null`
                 (= "nadie lo verificó", P3).
currency         la del país, o la que el documento muestra (ver arriba).
fx               REGLA #0 de `club-data-mapping/referencia/fx.md`: el tipo de cambio que declara
                 el propio documento gana siempre. Se buscan en el `.md` líneas
                 con una palabra de tipo de cambio (tipo de cambio, taxa de
                 câmbio, PTAX, exchange rate, Wechselkurs, tečaj, kurz, курс,
                 ισοτιμία, 환율, 汇率...) y una mención al dólar, y se extraen los
                 números que caen en el rango plausible de la moneda (y, si hay
                 serie local, a menos de 20% de la cotización de mercado de ese
                 día). Un solo valor -> `ok` con `fxSource:'document_close'`. Varios,
                 o una moneda casi a la par del dólar (EUR/GBP/CHF, donde no se
                 puede saber solo por el número si está invertido) -> `pregunta`
                 con los candidatos y la línea de cada uno. Si el documento
                 menciona tipo de cambio y dólar con números pero ninguno es una
                 cotización plausible (un cuadro de sensibilidad, de exposición),
                 `pendiente` ("confirmar en el documento antes de cargar") y se
                 propone igual la de mercado. Además de la ventana de ±1 línea, cuenta
                 como contexto un encabezado de anexo de moneda extranjera en las 40
                 líneas previas (el TC va en una columna "TC", lejos de la palabra).
                 Si el documento no
                 declara nada: `FX_CLOSE` de `data/currency-map.js` si ya tiene
                 esa fecha (`fxRef`), si no la serie local de
                 `tools/fx-reference/` (la de `tools/lookup-fx-close.js`: ARS, BRL,
                 COP, NOK, CZK, CHF, TRY, RUB, UAH, KRW, CLP, EUR, DKK, GBP, SEK, PLN, HRK, JPY,
                 CNY, MXN, PEN), si no `pendiente` ("correr fetch-fx-reference.mjs").
reportType       'official_balance_sheet' si el documento nombra un estado contable
                 Y trae filas con números (10+ filas de tabla o líneas con 2+ montos:
                 un dictamen de auditor nombra los estados sin traerlos); `pregunta`
                 si parece un presupuesto (el fx pasa a ser una premisa,
                 `document_assumption`), un estado INTERMEDIO (por el nombre o por el
                 texto: "seis meses", "1º semestre", "interim"...), un acta, una
                 memoria sin balance, etc. Un intermedio tampoco cuenta para decidir
                 el cierre del ejercicio del club (Palestino 2018: semestral al 30/6
                 de un club que cierra el 31/12).
sourceId         `<id>-<nombre del archivo en slug>`, mecánico.
perimetro        `pregunta` cuando el documento trae estados CONSOLIDADOS (con o
                 sin los individuales al lado), o cuando la carpeta del club tiene
                 documentos del mismo año de dos entidades distintas (Molde:
                 "Molde Fotballklubb FLI" y "Molde Fotball AS"; Genoa: individual y
                 consolidato). El criterio que el proyecto usó hasta ahora
                 (preferir la entidad individual, Boca/Racing/Panathinaikos) va
                 como SUGERENCIA en el texto de la pregunta, no como decisión: qué
                 entidad es "el club" es exactamente el tipo de cosa que no se
                 inventa.

----------------------------------------------------------------------------
QUÉ ESCRIBE `--escribir` (y qué NO)
----------------------------------------------------------------------------
Sale del commit que agregó Panathinaikos (839fea7) y del skill de onboarding §3:
  - `data/clubs.js`: la línea del club en `clubs{}` (única cosa centralizada).
  - `data/<país>/<id>-data.js`: el ESQUELETO, sin comentarios (data/ se publica), con
    todas las estructuras vacías (sin ejercicios: los rubros los carga `tools/cargar.mjs`).
    La cabecera y el `fiscalYearMeta` propuesto van a la evidencia del club
    (`Admin/carga-clubes/<id>.md`), no registrados: un ejercicio con meta y sin rubros se
    vería en el sitio como un año en cero, y "sin dato no es cero".
  - `data/club-leagues/<iso2>.js`: la fila (club, año) -> liga (o `null`). Si el
    país no tenía archivo, lo crea con la cabecera estándar.
  - PAÍS NUEVO: su entrada en `COUNTRIES` (`data/leagues.js`) y su nombre en
    `data/lang/en.js` (tabla PAISES de abajo; la bandera sale del ISO2).
  - MONEDA NUEVA: su entrada en `CURRENCY_META` y en `FX_PLAUSIBLE_RANGE`
    (`data/currency-map.js`), con la escala y el rango de la tabla MONEDAS.
  - FX de mercado nuevo (solo si salió de la serie local): su entrada en
    `FX_CLOSE`, que es donde vive un dato de mercado (nunca en el archivo del club).
  - `index.html`: sube ASSET_V (la constante Y cada `?v=` literal, CLAUDE.md "Gotchas
    de tooling"), salvo que ya esté subido respecto del último commit. Sin esto
    `audit.js` da P1 `asset-v-sin-subir` apenas cambia algo de `data/` (lo encontró la
    primera prueba de `--escribir`, que se revirtió sola por eso). Subirlo regenera las
    ~165 páginas `fuentes/<clubId>.html`, que leen la constante: es esperado.
  - Corre los generadores de `tools/generadores.mjs` (los mismos que cargar.mjs, con
    faltantes-liga y estimar), y después
    `node tools/audit.js --quiet`. Si sale con P0/P1 (el aviso dice cuál), RESTAURA cada archivo que
    cambió y borra cada archivo que creó (snapshot previo de `data/`, las páginas
    de fuentes, el sitemap y los dos documentos generados de `Admin/`).
NO escribe: `sources{}` del club (un documento en `fuentes.html` sin ningún dato
cargado sería una fuente de nada), ningún ejercicio, ninguna liga nueva en el
catálogo (`LEAGUES` es decisión de Guido, ver `'liga-no-catalogada'` en la
cabecera de `data/club-leagues.js`), `brandColor`, ni nada fuera de esa lista.
No commitea. OJO: un club dado de alta sin ejercicios aparece en `data/club-
index.js` con 0 ejercicios; el alta y la carga del primer ejercicio van juntas
en el mismo commit, nunca el alta sola a producción.

(sigue el USO)
       llama a las tools de verdad, que anotan cada hueco para que Guido lo vea)

  REGISTRO (Admin/registros/altas-club.jsonl) — gratis salvo --claude:
  node tools/alta-club.mjs --todos
       todas las carpetas de Clubes/ que carpetas-clubes.mjs da como `nuevo` (sin
       las de agregado "_*"); elige el documento base de cada una (estado contable
       anual por el nombre > transcripción listo > ejercicio más reciente; si el
       elegido no sirve de base —no es un balance anual, no se le saca el año— prueba
       hasta 4 candidatos) y recalcula SOLO las carpetas cuya huella cambió.
       ~5 s para 212 carpetas. --forzar recalcula todo; --solo <texto> filtra.
       Las carpetas cuyo club YA está en el sitio pasan a `existe` (antes su línea vieja quedaba congelada).
  node tools/alta-club.mjs --todos --claude [--tope-usd 1]
       además manda a Claude las preguntas de documento todavía sin preguntar
       (primero las carpetas que Claude puede dejar listas). Reusa respuestas ya
       pagadas si el .md y las preguntas no cambiaron (--forzar-claude las rehace).
  node tools/alta-club.mjs --resumen      conteo por estado + los listo-para-alta
  node tools/alta-club.mjs --dudas        candidatas a Admin/dudas-por-club.md (NO escribe ahí)
  node tools/alta-club.mjs --backtest-claude [--limit 5] [--saltear N]
       las mismas preguntas a clubes YA cargados, contra lo cargado (Admin/mediciones/backtests/altas-claude/)
  node tools/alta-club.mjs --informe-backtest   recalcula el acierto del backtest, gratis

Sin --claude / --backtest-claude: 0 llamadas a APIs ni a internet, todo sale de
archivos locales. Con --claude: ~US$ 0,05-0,09 por club (medido, Admin/mediciones/test-altas-claude.md).
```

## audit.js

```text
Esta auditoría es el complemento: busca lo que un total correcto no delata, y
lo que solo se ve mirando los 41 clubes JUNTOS (este club factura 300 veces lo
que sus pares de la misma liga; estos 5 no tienen ningún check encima).

LA REGLA HEREDADA DE `auditAll()`, QUE ACÁ SE RESPETA: cualquier verificación
numérica pasa por `computeYearGeneric()`, el motor real. NUNCA se reimplementa
la cascada del resultado (se probó una vez, y una fórmula simplificada tiró 12
falsos positivos por no contemplar nonCash/profitOnPlayerSales/assetSales/tax).
Por eso este script CARGA `js/finanzas-calc.js` en un contexto de `vm` y llama
a las funciones de verdad, en vez de rehacer las cuentas por afuera.

QUÉ NO HACE, A PROPÓSITO:
  - No dice si un número está bien contra el PDF. Eso solo lo puede hacer quien
    tiene el documento delante, al onboardear (ver el skill
    `Admin/PANTALLA.md`, ex §8). Esto audita CONSISTENCIA, no fuente.
  - No toca nada. Solo lee y reporta.
  - No reemplaza a `auditAll()` en el navegador: los chequeos de consola,
    listeners y Chart.js solo se ven con el sitio corriendo.

(sigue el USO)
de MIRAR la fuente, nunca para bajar el número de hallazgos. Silenciar algo sin
verificarlo es exactamente el atajo que este proyecto no se puede permitir.

SEVERIDADES:
  P0  un número publicado está mal, o puede estarlo. Se arregla antes que nada.
  P1  algo roto o ausente que el visitante ve (dato en cero, conversión que falla).
  P2  riesgo: no está mal hoy, pero se va a romper o no escala.
  P3  limpieza / informativo.
```

## auditoria.mjs

```text
  {"clubId":"chelsea-gb","anio":2025,"auditor":{"nombre":"Deloitte","tipo":"firma"},"dictamen":"sin_salvedades","continuidad":false,
   "citas":{"auditor":{"md":"Clubes/…/x.md","linea":120,"texto":"Deloitte LLP"},"dictamen":{"md":…,"linea":…,"texto":"In our opinion…"}}}

  auditor.tipo: firma | persona | organismo. Una persona va con su nombre como lo imprime el documento (decisión de Guido).
  dictamen: sin_salvedades | con_salvedades | adverso | abstencion | sin_informe (el documento no trae informe del auditor: sin auditor
  ni cita de dictamen). Vocabulario provisorio: se ajusta con los casos.
  falta_transcripcion: el documento muestra que el informe existe (el índice lo lista, los estados remiten a él, el fisco nombra al
  auditor) pero el .md no lo trae; no se publica (no es "sin informe") y cuenta como pendiente hasta transcribirlo. Lleva nota.
  auditor.nombre puede ser null cuando el informe no imprime quién firma; la nota lo dice.
  continuidad: true si el informe marca una incertidumbre material sobre la continuidad (empresa en funcionamiento, going concern),
  con su cita en citas.continuidad; es aparte del dictamen. Otros párrafos de énfasis no se registran.
  CRITERIO: (1) un énfasis que habla de continuidad, patrimonio negativo o apoyo del accionista sin decir que haya
  una incertidumbre material es continuidad false, con nota "ÉNFASIS CONTINUIDAD:"; (2) alcanza con que lo diga el título del párrafo;
  (3) si el título de la base dice "con salvedades" y el párrafo de opinión es limpio, manda el párrafo de opinión; (4) opinión limpia
  sobre una parte del balance y abstención sobre el resto es abstencion.
  La entidad que organiza una liga (AFA, LFP) va con "ligaId" (de data/leagues.js) en vez de "clubId" y con "entidad":{"nombre","legal"?};
  sus citas no pasan por quien.mjs (no es un club del sitio). Sale en data/auditoria/_ligas.js (window.LIGA_AUDITORIA[ligaId][anio]);
  una liga con `falta_transcripcion` no sale (queda pendiente en `--pendientes`, como un club).
  alcance (opcional, con nota; sin el campo es una auditoría plena de las cuentas del club). Decisión de Guido:
    revision_limitada         revisión limitada (ISRE 2410 y similares): "no encontramos nada", no es una auditoría (Como 2025).
    procedimientos_acordados  procedimientos acordados: la firma comprobó cifras puntuales; ni auditoría ni revisión (Osijek 2025).
    proposito_especial        auditoría de estados preparados para la licencia de la federación, no de las cuentas legales (Kifisia).
    grupo                     auditoría de las cuentas del grupo dueño del club, no del club solo (Club América 2025, Ollamani).
    federacion                (solo en una línea de liga) el balance es el de la federación entera, no el de la liga: la sociedad que organiza la
                              liga no publica el suyo (KNVB para la Eredivisie y la Eerste Divisie, decisión de Guido).
  Un "relatório de revisão especial" que audita con seguridad razonable y da opinión es una auditoría plena (Criciúma 2015-2019).
  nota (opcional): una aclaración interna para la próxima sesión; no se publica.

CHEQUEOS (código 1 si alguno falla): JSON y códigos válidos; el club y el año tienen un balance cargado; cada cita está en su línea
del .md (±3, espacios normalizados) y el .md es de ese club y ese año (tools/quien.mjs); sin repetidos. AVISO (no frena): cuántos
balances cargados no tienen línea todavía.
```

## caja-deuda.mjs

```text
LA ESCALERA (rehecha a pedido de Guido: "SIEMPRE ESCALERA, sin reglas una encima de otra"). Cada dato por separado.

  ESCALA   UNA por documento, para todos los escalones: la del estado de resultados de ESE documento, la que hace coincidir sus cifras con
           los rubros ya cargados en el sitio (factorPorIngresos). Ningún escalón trae su propia escala.
  ESCALÓN 0  precedente del club: qué filas del balance de otro año del club (con la escala de ESE documento) suman lo cargado; se
             PROPONEN las filas con las mismas familias de etiqueta en este documento.
  ESCALÓN 1  vocabulario (vocabulario.mjs CAJA / DEUDA_FINANCIERA): se PROPONEN las filas del balance con esos nombres (una sola por
             familia). "Ninguna fila" es una propuesta para la deuda (= 0, decisión de Guido) si el balance está completo (tiene su total del
             pasivo) y el club usa filas de deuda financiera en otros años.
  ESCALÓN 1b Jev (fijo en --club, en --medir con --jev): una llamada barata por documento; la caja como opción cerrada entre las
             filas del balance y la deuda como sí/no por fila. Solo propone filas; decide la misma compuerta. Respuestas en
             Generados/_cache/jev-caja-deuda.jsonl.
  ESCALÓN 2  IA (Claude, ~US$ 0,03 por documento, una llamada para caja y deuda, solo si 0 y 1 no pasaron): PROPONE números de línea del
             balance. Nada más (ni importes, ni escala, ni "no hay").
  COMPUERTA  la MISMA para los tres: valor = suma de las cifras de las filas propuestas x la escala; y un año vecino tiene que decir lo mismo:
             el AÑO ANTERIOR CARGADO (las mismas filas, en su columna del año anterior, dan lo cargado) o el DOCUMENTO SIGUIENTE (las mismas
             familias, en su columna del año anterior, dan este valor). Pasa si al menos uno coincide y ninguno contradice. Si no pasa, el
             siguiente escalón. Si ninguno pasa: null. Nunca frena. El DOCUMENTO ANTERIOR (la columna del año anterior de estas
             filas contra el año en ese documento) también confirma, pero solo a favor: un documento puede reexpresar el año anterior. Y
             dos números por debajo del piso de la tolerancia (1.500 unidades) coinciden solo si son el mismo número.
  DOS LECTURAS: cada propuesta se evalúa con las filas como se leen siempre y, si alguna fila (de este documento o de los
             vecinos) tiene una celda en una columna con forma de nota ("6.8", "6.13"), también sin esa celda. Decide la misma compuerta:
             pasa una sola lectura → esa; las dos con valores distintos → no decide. Caso: AEK 2019, "| Ταμειακά διαθέσιμα | 6.8 |
             7.935.425 | 1.650.370 |" se leía 6,8; sin la celda, 7.935.425, que confirma el documento 2020.
  LEER UNA FILA: el importe en valor absoluto (hay balances que imprimen el pasivo entre paréntesis: Tottenham 2023-24).
Respuesta de la IA guardada en Generados/<doc>.caja-deuda-ia.json.
Solo se leen las páginas del BALANCE: las que tienen el título (TITULO_BALANCE) o un total del activo / del pasivo, sin el título del flujo
de efectivo. La columna es la PRIMERA cifra de la fila que no sea una referencia a nota (un entero de 1-2 dígitos al principio), salvo
que la tabla tenga una columna de notas antes de esa cifra: entonces la cifra es un importe.

(sigue el USO)

--club (decisión de Guido: "dos scripts"; caja y deuda NO van en el lote, se completan con el club ya en el sitio):
recorre los años cargados del club, de más viejo a más nuevo, y lee caja y deuda SOLO donde el sitio tiene null (nunca pisa un valor cargado
a mano). Corrido después de cargar, el año anterior ya está en el sitio y sirve de compuerta. Un valor que se completa en esta
misma corrida NO cuenta como cargado para el año siguiente. Sin --ejecutar, el escalón 2 es ensayo (costo estimado). --escribir: lo escribe en
data/<país>/<club>-data.js (el valor, sin comentario: data/ se publica) y en Admin/carga-clubes/<club>.md una nota de dónde salió cada dato, en la
meta del año; sube ASSET_V, corre los generadores y audit.js; si da P0/P1, revierte los dos.

--medir: para cada año ya cargado con grossDebt/cash y con transcripción (la fuente nombra el .md), lee el balance como si fuera un año nuevo
y lo compara con lo cargado a mano. El precedente sale SOLO de los OTROS años del club (nunca del mismo: si no, se aprendería la respuesta).
Misma escalera y misma compuerta que --club. No escribe nada.
```

## cargar.mjs

```text
----------------------------------------------------------------------------
QUÉ HACE, EN ORDEN (cada paso puede FRENAR; la propuesta junta TODOS los motivos, no solo el primero, para que una sesión vea de una vez
qué falta)
----------------------------------------------------------------------------
 1. REGISTRO (Admin/registros/transcripciones-estado.jsonl, lo arma tools/inventario-transcripciones.mjs):
      - el PDF tiene que estar `listo-para-jev` (transcripto, validado y con su lista de rubros) y NO `cargado`;
      - `periodo.tipo` tiene que ser 'anual' y `periodo.nombreNoCoincide` falso (tools/periodo.mjs): un trimestral o un documento cuyo
        nombre dice otro cierre que el contenido no se carga como ejercicio (se junta con los otros períodos, `periodo.mjs --grupos`);
      - el `.categorias.json` tiene que estar AL DÍA con su lista de rubros y su `.jev.json` (tools/huellas.mjs): si la lista cambió
        después de categorizar, las categorías son de otra lista.
 2. CLUB Y AÑO: el club sale de tools/carpetas-clubes.mjs (la única regla del proyecto) y tiene que existir; el año, del mismo análisis
    que usa el alta (`analizar()` de tools/alta-club.mjs: nombre del archivo confirmado por las fechas de cierre del contenido) y de
    `quien.mjs --quien` (el que usa el registro): si no coinciden, frena. Si el club ya tiene ese año en su fiscalYearMeta, frena.
 3. FILAS Y MONTOS: las de la verificación (Generados/.../<doc>.verificacion.json, etapa 6), con el signo y el lado que decidió
    verificar.mjs. Había además una selección por palabras (proponer-carga.mjs, archivada).
    Todo en MILLONES de moneda nativa (convención del sitio, club-data-mapping/referencia/fx.md).
 4. CATEGORÍA DE CADA FILA: la del `.categorias.json` del pipeline (escalón 0 precedente del club, 1 Jev >= 0,90, 2 Claude >= 0,80). Si
    la fila no está en esa lista (antes la etapa 3 del pipeline y la selección de filas de acá NO elegían las mismas filas:
    Admin/mediciones/test-cargar.md 4.1; desde la 321 la etapa 3 prepara exactamente esta selección, así que esto pasa solo con listas viejas),
    se prueba el precedente del mismo club, exacto o por familia de etiquetas (precedenteFamilia(), gratis). Lo que queda sin categoría o con confianza baja
    NO se carga; si eso es más del --max-sin-categoria (default 5%) del dinero de su lado, frena.
      - `no_es_rubro` no se carga como línea. Los resultados financieros (intereses, diferencias de cambio, participaciones) y el impuesto
        a las ganancias NUNCA son una línea (club-data-mapping §2): van a `netInterest` / `tax` del fiscalYearMeta.
      - Una categoría de un lado en una fila que la estructura del documento pone del otro lado se marca `ladoContradictorio` (aviso).
 5. SIGNOS: el sitio guarda ingresos en positivo y gastos en NEGATIVO (computeYearGeneric() suma todo). Si el documento imprime los
    gastos en positivo (la mayoría de sus filas de gasto sin signo), se invierten; si ya los imprime negativos, quedan como están (así
    una reversión impresa en positivo dentro de los gastos queda positiva).
 6. TOTALES Y TIE-OUT (club-data-mapping §6, "precisión antes que velocidad"): se buscan en el documento (tablas preparadas de
    proponer-carga, año del ejercicio) un total impreso igual a la suma de las líneas de ingresos, otro igual a la de gastos (sin
    `exceptional_items`: es lo que compara audit.js, |expenses + nonCash|) y el resultado del ejercicio igual a ingresos + gastos +
    netInterest + tax. Un total que solo cierra por redondeo no frena: se agrega la línea "Diferencia de redondeo"
    por la diferencia (other_income / other_expenses, ver L852) y el aviso lo dice. Sin total de ingresos que cierre, frena. Gastos o resultado impresos que no
    cierran, frena; que no se encuentran, quedan en null con aviso (el sitio acepta un club-año con solo el total de ingresos, decisión
    de Guido).
 7. TIPO DE CAMBIO, LIGA, REPORTTYPE, SOURCEID: los mismos campos que calcula el alta (`analizar()` de tools/alta-club.mjs): fx declarado
    por el documento (regla #0) -> `fx` + `fxSource:'document_close'`; si no, `fxRef` a FX_CLOSE (y si la cotización sale de la serie
    local de tools/fx-reference/, --escribir la agrega a FX_CLOSE); sin cotización, frena. La liga del año con la regla "categoría al
    cierre" de proponerLiga(); sin dato, la fila se escribe en `null` (= nadie lo verificó, P3). Una `pregunta` del alta sobre el año, el
    cierre, la moneda, el tipo de documento o el fx FRENA. El perímetro (individual/consolidado) se HEREDA de los años ya cargados del
    club cuando el documento es del mismo tipo (ver perimetroHeredado()); si no se puede, frena.
 8. fiscalYearMeta: currency, fx/fxSource o fxRef, sourceId, reportType, gestionId null (club-data-mapping §7: no se inventa una
    gestión), profitOnPlayerSales 0 y assetSales 0 (van como líneas si el documento las trae en el estado), netInterest y tax (de las
    filas del paso 4), grossDebt y cash en null (los completa después `caja-deuda.mjs --club`: "sin dato no es cero"), y los tres official*.
 9. `sources`: la entrada nueva, SIN `note` ni publicNote (la nota interna, con la ruta del .md que cita carpetas-clubes.mjs, va a
    "## Fuentes" de Admin/carga-clubes/<club>.md; audit.js checkFuentesPublicas: las salvedades públicas las deriva sourceCaveats() de los campos). Y una línea en
    Admin/sourcing/<País>/<Club>.md si ese archivo existe.

--escribir (solo si no quedó NINGÚN motivo para frenar, y si el ejercicio tiene estadio y sponsor: compuertaContexto()): escribe el año en el JSON del club (data/<país>/<club>.json: ingresos, gastos, meta y la fuente) y regenera su data/<país>/<club>-data.js,
la fila de liga en data/club-leagues/<iso2>.js, la cotización de mercado nueva en FX_CLOSE si hace falta, la línea de fuentes/, sube
ASSET_V (la constante Y cada `?v=` literal de index.html, salvo que ya esté subido respecto de HEAD), corre los 4 generadores y
`node tools/audit.js --quiet`. Si la auditoría da algún P0/P1, o cualquier paso falla, RESTAURA cada archivo tocado y borra lo creado
(mismo mecanismo que alta-club.mjs). Este script solo NO commitea (el commit por año lo hace tools/cargar-lote.mjs). No toca `.claude/skills/`, `Admin/TODO.md` ni `CHANGELOG.md`.

----------------------------------------------------------------------------
MEDIDO (informe completo en Admin/mediciones/test-cargar.md)
----------------------------------------------------------------------------
Backtest de 18 ejercicios ya cargados (8 países, año borrado en un worktree y reconstruido con las etapas 3-5 reales): 1 carga (Alianza
Lima 2023, idéntico a producción, audit.js 0 P0/P1 al escribir) y 17 frenan, TODOS con algo mal en la propuesta o un dato faltante: el
tie-out no dejó pasar ningún número falso. Lo que más frena viene de etapas anteriores: la lista de rubros de la etapa 3 no es la misma
selección que usa la carga, la escala se elige por tabla, entran tablas de balance / bienes de uso / presupuesto, y la categorización
deja < 0,80 filas grandes y genéricas. Con --umbral-claude 0.7, PSV 2019-20 (año nuevo) carga y cierra exacto contra su resultado.

(sigue el USO)
       BACKTEST: compara cada propuesta contra el MISMO ejercicio cargado en otro checkout (producción). Se corre en un worktree donde se
       BORRÓ ese año del data file (si no, frena por "ya cargado") y se rehicieron las etapas 3-5 del pipeline sobre esos documentos.
       Mide totales (ingresos / gastos / resultado), % del dinero en la categoría correcta, fx y liga. Ver Admin/mediciones/test-cargar.md.
  Extras: --max-sin-categoria 0.05, --umbral-claude 0.8, --json (con --lista: JSON en vez de una línea)
```

## categorizar-claude.mjs

```text
---------------------------------------------------------------------------------------------------------
LA CATEGORIZACIÓN EN ESCALONES (de más barato a más caro)

  (0) Precedente del mismo club: el mismo texto (normalizado) ya está cargado en otro año del mismo club,
      del mismo lado (ingreso/gasto), siempre con la misma categoría -> se copia. Gratis, sin API.
      Es el "tier 0" (tools/suggest-category-precedent.mjs hace lo mismo como consulta a mano).
  (1) Jev (tools/jev-categorizar.mjs) con confianza >= 0,90 -> se acepta. Backtest sobre 3.975 rubros ya
      cargados (Admin/mediciones/test-jev-resultados_lado_ej_otrosclubes.md): 94,4% de acierto en esa banda, que cubre
      ~69% de los rubros. Jev cuesta casi nada, pero ve un rubro por vez y sin las convenciones del club.
  (2) El resto -> Claude (este archivo). Una llamada por documento, con:
        - la lista de categorías de data/category-map.js con su lado y su descripción completa (el comentario
          de cada categoría en ese archivo es el criterio curado; se lee de ahí, no se reescribe acá);
        - un resumen de los criterios del skill club-data-mapping que más errores evitan (sección CRITERIOS);
        - las líneas YA CARGADAS de ese club en otros años (rawLabel -> normalizedCategory): son las
          convenciones curadas del club, que es justo donde Jev más falla (Argentina 74%, Brasil 80%);
        - las filas del mismo documento en orden (vecinas y encabezado de sección), con la categoría ya
          resuelta por los escalones 0-1 cuando la hay, para que Claude vea la estructura del estado;
        - para cada rubro pendiente, 6 ejemplos parecidos de OTROS clubes (misma búsqueda por palabras que Jev).
      Salida en JSON estricto (structured outputs): categoría + confianza + motivo corto, por rubro.
  (3) Lo que Claude tampoco deja con confianza alta -> se frena y va a la cola humana (cola.mjs; la escribe
      cargar.mjs). No se inventa.

---------------------------------------------------------------------------------------------------------
NÚMEROS MEDIDOS (backtest, detalle en Admin/mediciones/test-categorizar-claude.md)
  Sobre los 1.217 rubros que Jev deja < 0,90 (de 3.975; 224 club-años), Opus 5.5, esfuerzo low, con contexto del club:
    - acierto 76,6% (Jev en esos mismos rubros: 57,1%). Por confianza de Claude: >= 0,90 -> 98,5% (132 rubros);
      0,80-0,90 -> 94,3% (296); 0,60-0,80 -> 75,2% (488); < 0,60 -> 51,8% (301). La confianza SÍ separa.
    - sistema combinado (precedente aparte): Jev >= 0,90 + Claude >= 0,80 -> 80,2% de los rubros automáticos con 94,5%
      de acierto (Jev solo: 69,4% con 94,4%); queda 19,8% para revisar. Todo automático sin umbral: 88,9%.
    - las líneas ya cargadas del club valen ~8 puntos: en la misma muestra de 259 rubros, 81,1% con ellas vs 72,6% sin;
      y con ellas hay 93 rubros >= 0,80 (94,6%) contra 59 (89,8%).
    - Sonnet 5.5 en esos 259: 74,9% (vs 81,1% de Opus), 44% más barato; su confianza está peor calibrada.
  Costo (Opus 5.5): US$ 0,0036 por rubro, mediana US$ 0,015 por club-año (p90 0,039, máx. 0,108); sin thinking a esfuerzo low.
  OJO: la regla de "gastos accesorios de transferencias -> other_expenses" de CRITERIOS se agregó DESPUÉS del backtest
  (el error más frecuente fue other_expenses -> player_amortisation, 23 casos, con producción dividida 40/31): no está medida.

---------------------------------------------------------------------------------------------------------
MODOS

  --backtest   ¿Cuánto acierta Claude en lo que Jev deja < 0,90? Toma las filas de un backtest de Jev
               (por defecto Admin/mediciones/backtests/jev/backtest_lado_ej_otrosclubes.jsonl: una línea por rubro único de un club
               ya cargado, con `truth` = la categoría de producción y `confidence` = la de Jev), se queda con
               las < 0,90, les asigna el club-año donde aparecen (el ejercicio más reciente del club que tiene
               ese texto) y manda una llamada por club-año.
               SIN FUGA DE LA RESPUESTA: del contexto del club se sacan TODAS las líneas de ese mismo club-año
               y cualquier línea de otro año con el mismo texto que un rubro pendiente (eso lo habría resuelto
               el escalón 0, así que el caso que llega a Claude es justamente el que NO tiene precedente
               exacto). Las filas del documento se muestran sin su categoría real; las que Jev resolvió con
               >= 0,90 van con la categoría DE JEV (no la real), igual que pasaría en producción.
               Reanudable: los club-años ya respondidos en el .jsonl de salida no se vuelven a pagar.
  --informe    Solo lee el/los .jsonl del backtest y muestra las tablas (sin API).
  --listos     Producción: para cada `<md>.jev.json` que dejó jev-categorizar.mjs --listos, aplica el escalón 0,
               acepta Jev >= 0,90 y manda el resto a Claude. Deja `<md>.categorias.json` al lado.

(sigue el USO)

COSTO: cada llamada queda en Admin/registros/api/claude-api.jsonl (mismo archivo que las tools de transcripción,
lo suma tools/gasto.mjs) con `tarea: "categorizar"`, sin campo `md` a propósito: inventario-transcripciones.mjs
usa `md` de ese log para saber qué motor hizo cada transcripción, y esto no es una transcripción.

RAW HTTP, sin SDK: mismo criterio que claude-api-transcribe.mjs (el proyecto no tiene package.json a propósito).
Necesita Admin/api-keys/claude-api.env con ANTHROPIC_API_KEY=... (gitignoreado).
```

## check-transcripcion-fidelidad.js

```text
QUÉ CHEQUEA, por cada .md bajo Clubes/ que tenga al menos una marca de página:
  1. Cobertura de marcas de página contra la cantidad real de páginas del PDF
     hermano (mismo nombre base), vía `pdfinfo`: páginas faltantes, marcas
     duplicadas, marcas "colapsadas" (`--- pág. 15-17 ---`, un rango en vez de
     una marca por página). SOLO para archivos cuyas marcas usan el formato
     simple/estándar (`--- pág. N ---` o `--- pág. N-M ---`) — un archivo con
     marcas anotadas a mano (`--- pág. 12: Anexo III — Detalle de gastos ---`,
     `--- pág. N de N ---`, "pág. impresa") se marca como formato no estándar y
     NO se le exige cobertura estricta, para no reventar de falsos positivos
     sobre convenciones ad-hoc ya usadas en el proyecto.
  2. Placeholders de contenido: una línea ENTERA entre corchetes, con
     vocabulario en inglés de tabla/sección/resumen, en un documento que por lo
     demás está en español/portugués/otro idioma. El inglés mismo es la señal:
     nadie transcribe un balance colombiano describiéndolo en inglés, así que
     una línea así es casi seguro un resumen del modelo, no contenido real. Se
     excluyen a propósito los placeholders CORTOS ya usados como convención
     legítima en el proyecto (`[LOGO]`, `[Firma]`, `[encabezado]`, notas de
     procedencia tipo `[OCR, Tesseract ...]`, `[TRANSCRIPCION VERIFICADA...]`).
  3. Páginas con muy poco texto comparadas con la mediana del propio documento
     (señal DÉBIL, para revisión humana — una carátula o una página en blanco
     real también da esto, no es un error por sí solo).

QUÉ NO HACE, A PROPÓSITO (mismo espíritu que tools/audit.js): no dice si un
NÚMERO está bien contra el PDF — esto es fidelidad de la TRANSCRIPCIÓN (¿está
todo el texto?), no verificación de datos (eso es club-data-mapping, al
onboardear). No reemplaza la verificación humana obligatoria de un documento
marcado como escaneado (club-data-mapping/referencia/leer-pdf.md, "Documento transcripto con Mistral OCR").

LIMITACIÓN REAL DEL CHEQUEO DE COBERTURA (encontrada verificando este mismo
script contra Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2017.md).
El chequeo asume que la marca "--- pág. N ---" es la página FÍSICA
N del PDF (posición N en el archivo), pero no siempre es así — ese archivo
puntual arrancó su numeración de marcas más adelante que la página física 1
(offset constante de +4, probablemente por páginas de portada/legales al
principio que no recibieron marca propia), así que un hueco DENTRO de la
numeración de marcas (ej. de la 13 a la 18) puede no corresponder a ningún
contenido real faltante — puede ser simplemente que las marcas más chicas
numeran páginas físicas más grandes de lo que su propio número sugiere. Por
eso `paginas-faltantes` es P2 (revisar), no P1 (confiar y bloquear): es
evidencia de que algo no cuadra, no un veredicto de que falta contenido.
```

## chequeos-gratis.mjs

```text
LA CASCADA (por página; cada chequeo "respalda" celdas/cifras, y la página se valida si no queda ninguna sin respaldo)
  1. texto-pdf   : la cifra está en el texto que el PDF trae adentro (pdftotext -layout, página por página). Se cuenta como
                   MULTICONJUNTO: si el .md tiene tres veces "8821" y el PDF una sola, dos quedan sin respaldo (caso real de los
                   formularios belgas, donde los códigos de rubro 8821/8321 aparecen en la misma página y un 3 leído como 8
                   se "respaldaba" con el otro código). Solo aplica a PDFs con capa de texto real (mismos umbrales que
                   tools/verify-numbers.mjs: >= 30 cifras y >= 150 caracteres por página en el documento, y que el texto no
                   sea mojibake — cobertura >= 25%).
  2. sumas       : dentro de cada tabla Markdown, columna por columna, una celda que es la suma EXACTA (con tolerancia de
                   redondeo de la unidad impresa, ver `tolSuma`) de >= `minSumandos` celdas contiguas de arriba (o de abajo,
                   si `sumasHaciaAbajo`) respalda a esa celda y a todos sus sumandos. Una lectura mal hecha de un dígito en un
                   sumando rompe la suma, así que ese sumando queda sin respaldo. Es la misma idea que filasSuma() de
                   tools/filas-rubro.mjs, pero con tolerancia de redondeo en vez del 0,05% de allá (con 0,05%, en 1.000.000 se
                   toleran 500 unidades: un 3 leído como 8 en las centenas pasaba como "cierra").
  3. produccion  : si el club-año N-1 está cargado en el sitio (data/<país>/<club>-data.js, cargado con vm como hace
                   tools/proponer-carga.mjs), una celda que coincide EXACTO (a la precisión impresa, probando escala en
                   unidades / miles / millones) con un amountNative o un total oficial de N-1 queda respaldada: es la columna
                   comparativa del año anterior.
  4. balance     : en todo el documento, si un "Total activo" es igual a un "Total pasivo + patrimonio" (etiquetas en ~12
                   idiomas), esas celdas quedan respaldadas en sus páginas.

NÚMEROS MEDIDOS (node tools/chequeos-gratis.mjs --prueba; curva completa y cada caso en Admin/mediciones/test-chequeos-gratis.md)
  Base: los 104 documentos que el resolver ya resolvió (3.134 páginas, $38,98 registrados). Entrada = lo que el resolver tenía en
  la mano (previo-mistral 67, previo-legado 21, mistral-redo 15, previo-gemini 1); verdad = el .md corregido de hoy. 178 páginas
  con un error real de lectura (163 en páginas con números según tools/paginas-con-numeros.mjs; las otras 15 son identificadores
  en prosa: INN/cuentas bancarias rusas, números de organización noruegos, sellos manuscritos).
  Con los umbrales por defecto (G2 en la curva):
    - validada-gratis 750 (23,9%), prosa 1.102 (35,2%), dudosa 1.282 (40,9%).
    - recall en páginas con números 163/163 (100%); total 163/178 (los 15 escapes son todos `prosa`, ninguno `validada-gratis`).
    - ahorro aproximado por proporción de páginas: $19,14 de $38,98 (49%); de las 603 páginas que el resolver pagó, 177 no se
      habrían mandado.
    - de las 1.282 dudosas, 1.136 son de documentos SIN capa de texto (escaneos): ahí la aritmética rescata muy poco (~25 páginas) y
      el ahorro sale casi todo de no mandar la prosa. En los documentos con texto quedan 146 dudosas de 1.171 páginas.
  La propuesta literal ("una tabla que cierra con >= 3 sumandos valida la página") deja pasar 37 páginas con errores reales como
  buenas (recall 77%): por eso la validación es CELDA POR CELDA, no por tabla.
  El chequeo 3 (producción N-1) no se pudo medir: ninguno de los 104 documentos tiene su año anterior cargado en el sitio (son
  ejercicios históricos de clubes cuyo sitio arranca años después). Queda implementado, apagable con usarProduccion:false.
```

## compare-transcripts.mjs

```text
LO QUE CUENTA COMO DISCREPANCIA (exit code 1): un rawLabel que aparece UNA
SOLA VEZ en cada transcripción (sin ambigüedad de cuál-con-cuál) con
valores numéricos distintos. Un rawLabel que aparece en una transcripción
y no en la otra, o que se repite dentro de la MISMA transcripción (ej.
"Total", que aparece en decenas de Notas), queda listado como informativo
pero NO bloquea -- exigir estructura idéntica entre 2 motores de OCR
distintos daría falsos positivos en casi cualquier documento real, y el
caso que de verdad importa (un rubro real, mismo texto, número distinto)
es justo el que SÍ se puede comparar sin ambigüedad.

(sigue el USO)
del contenido real. Cuando Claude corrige la celda que estaba mal (contra
el PDF, nunca a ciegas) en el .md CANÓNICO, deja al principio del archivo
una línea "DISCREPANCIA MISTRAL/GEMINI RESUELTA (ver tools/compare-
transcripts.mjs), <fecha>, <qué cambió y por qué>" -- onboard.mjs (etapas viejas)
busca ese texto y, si está, lo dice al confirmar el match. Es una
convención para que cualquiera que lea el .md sepa que ese match no es
casualidad de que las 2 IAs acertaron solas, no un mecanismo que bloquee
nada si falta.
```

## entidades.mjs

```text
  {"tipo":"carga-club","clubId":"lommelsk-be","entidad":"lommel-sk","perimetro":"individual","desde":2019,"hasta":2025,"cita":{…}}
lo mismo para un RANGO de ejercicios con UNA sola cita: cada ejercicio cargado en el sitio dentro de [desde, hasta]
      (hasta null = abierto) que no tenga su propia línea `carga` toma esta entidad y este perímetro. Para un club que no cambia de entidad
      (un club con dueño y balance individual): una línea al dar el alta en lugar de una por año, que además no se puede agregar antes de
      cargar el año. La cita es de un documento del club dentro del rango; una `carga` explícita del mismo año gana. Dos rangos del mismo
      club que se pisan son un error.
  {"tipo":"ingresos","entidad":"vitoria-sport-clube","anio":2022,"cierre":"2022-06-30","moneda":"EUR","total":4566468.26,
   "filas":[{"md":"Clubes/…/x.md","linea":1348,"texto":"Vendas e serviços prestados | 13;22 | 3 820 068,63 €","valor":3820068.63},…]}
      los ingresos de una entidad que NO se carga ese año, en la unidad del documento: los renglones de ingresos de su
      estado de resultados (o su total impreso, un solo renglón), sin la ganancia por su parte de la sociedad que se carga (en Portugal,
      "Ganhos imputados de subsidiárias"), que es resultado de esa sociedad y se contaría dos veces. `cierre` es su fecha de cierre, que
      puede no ser la del club (una asociación con año calendario). `unidad` (1000 si el documento está en miles; sin ella, 1).
  Cita de un documento: {"md":"Clubes/…/x.md","linea":3043,"texto":"The immediate parent company is Blueco 22 Midco Limited"}
  Cita externa (lo que el balance no dice, p. ej. los otros clubes del dueño): {"url":"https://…","fecha":"","texto":"…"}
  `que` ({es,en}) en una entidad: a qué se dedica, según el documento citado.
  `nota` ({es,en}) solo donde las frases fijas de la pantalla no alcanzan (p. ej. dos entidades sumadas).

CHEQUEOS (sale con código 1 si alguno falla):
  - cada cita de documento: el texto está en esa línea del .md (±3 líneas, espacios normalizados) y el .md está trackeado en Clubes/;
  - cada cita externa: url https, fecha AAAA-MM-DD y texto;
  - (los ingresos del total de cada grupo salen de data/rankings/: si cambian, --check avisa que esto quedó viejo)
  - cada carga: el club y el año están cargados en el sitio y el documento citado es de ese club y ese año (tools/quien.mjs);
  - cada línea de ingresos: cada renglón está en su línea del .md y su texto trae el valor; la suma de los renglones da el total;
    la entidad no es la que se carga ese año;
  - ids únicos, relaciones y cargas que apuntan a entidades que existen, códigos de forma/rel/perímetro conocidos, sin ciclos de control.
AVISOS (no frenan): clubes del sitio con una línea "otra entidad" en documentos-descartados.txt y sin ninguna entidad en el registro.

QUÉ GENERA: `data/entidades/<país>.js` (window.CLUB_ENTIDADES[clubId] = { cargas, entidades, relaciones }, solo lo que toca a ese club:
la cadena hacia arriba de cada entidad cargada, sus controladas y las vinculadas), `data/entidades/_grupos.js` (window.GRUPOS_INDICE =
[{ id, nombre, alias, clubIds, clubes }], chico y eager: lo leen el buscador de js/selector.js y la tarjeta Estructura de Finanzas, con
window.ENTIDADES_PAISES, los países que tienen archivo) y `data/entidades/_grupos-detalle.js` (window.GRUPOS[id] =
{ nombre, alias, clubes:[{ clubId|null, nombre, control, pct, desde, hasta }] }). Las citas de documento se publican como
{ md, linea } (la transcripción se publica); las externas, como { url }.
```

## estimar.mjs

```text
VALIDACIÓN CRUZADA:
  por año  saca UN club-año (simula un año que falta de un club que tenemos)
  por club saca el club ENTERO (simula un club que nunca cargamos)
Contra las bases: la mediana de la liga-año (M sola), el año real más cercano del propio club y el club interpolado (I solo).
Métricas: error mediano en % (|estimado/real - 1|), cuántos caen a ±25%, y cuántos reales caen dentro del rango del 80% (cuantiles
10-90 de los residuos del ajuste de entrenamiento).

MEDIDO (891 club-años, 827 con posición):
  falta un año   modelo 22% (20% entre dos reales, 26% antes o después) = interpolar a mano 22%: la regresión NO agrega nada.
  club nuevo     modelo 50% (sin posición 61%) contra 56% de la mediana de la liga: gana gracias a la posición, pero el error es grande.
```

## fetch-fx-reference.mjs

```text
MONEDAS SOPORTADAS HOY (agregar otra es sumarle una entrada a CURRENCIES con
su propia fuente, no hay una API única que sirva para todos los países; el
detalle de qué tasa exacta es cada una está en el comentario de su entrada):
  - ARS: API pública del BCRA (Comunicación A 3500 / "dólar mayorista").
  - BRL: API pública del BCB, PTAX de cierre (venda).
  - COP: API pública de datos.gov.co (dataset de la TRM, Banco de la
    República / Superintendencia Financiera).
  - NOK: Norges Bank, tipo medio (API SDMX pública).
  - CZK: Česká národní banka, fixing diario (year.txt).
  - CHF: Reserva Federal H.10 vía FRED (el SNB no publica serie
    diaria descargable).
  - TRY: TCMB, döviz alış, un XML por día (EVDS pide key).
  - RUB: Banco de Rusia, tipo oficial (XML_dynamic).
  - UAH: Banco Nacional de Ucrania, tipo oficial.
  - KRW: Reserva Federal H.10 vía FRED (ECOS del Banco de Corea
    pide key).
  - CLP: dólar observado (Banco Central de Chile) tal como lo publica
    el SII, el fisco chileno; la API del BCCh y la de la CMF piden
    usuario/key.
  - EUR: Banco Central Europeo, tipo de referencia diario EUR/USD
    (publicado USD por EUR, se invierte a EUR por USD).
  - DKK: Danmarks Nationalbank, tipo oficial diario (Statbank DNVALD,
    DKK por 100 USD, se divide por 100).
  - GBP: Bank of England, IADB serie XUDLUSS (publicado USD por GBP,
    se invierte a GBP por USD).
  - SEK: Sveriges Riksbank, tipo medio (API SWEA).
  - PLN: Narodowy Bank Polski, tabla A, tipo medio.
  - HRK: Hrvatska narodna banka, tipo medio (la kuna termina en
    2022: desde 2023 Croacia reporta en EUR).
  - JPY, CNY, MXN: Reserva Federal H.10 vía FRED, como CHF y KRW.
  - PEN: Banco de Pagos Internacionales (BIS), que la recibe del BCRP.
    El BCRP, la SBS y la SUNAT bloquean la descarga automática.
Todas son endpoints públicos sin API key, pensados para descarga. Ninguna es
una tasa cruzada vía EUR: todas cotizan directo contra el USD (EUR y GBP se
publican como USD por unidad y acá se invierten; es una inversión exacta, no
una cruz).
ARS/BRL/COP verificadas dígito por dígito contra los valores YA
cargados a mano en FX_CLOSE (data/currency-map.js) para Almagro (ARS),
y para BRL/COP contra las entradas ya existentes de otros clubes — coincide
exacto en todos los casos probados. Las 7 siguientes no tenían todavía
ningún club cargado ni entrada en FX_CLOSE contra qué comparar: se
verificaron contra el tipo que declaran las transcripciones de Clubes/ (RUB:
Krasnodar 2020 y 2021, exacto; TRY: Fenerbahçe 10/8/2020) y contra una
segunda fuente independiente día por día (BCE cruzado, SNB fin de mes, ČNB) —
ver el comentario de cada entrada para las diferencias esperables.

ARQUITECTURA: esta serie completa NUNCA va a
`data/currency-map.js` — ese archivo es eager, se baja en cada pageview del
sitio, y `FX_CLOSE` tiene que seguir siendo la lista CURADA y chica de
cotizaciones que algún club realmente usa. La serie completa vive acá, en
`tools/fx-reference/`, fuera de lo que el sitio sirve — es insumo de
onboarding, no dato de producción. Un archivo de este directorio nunca se
referencia desde `data/` ni desde ningún `<script src>` del sitio.

(sigue el USO)
solo pide los días que faltan (ver fetchTRY). CHF y KRW (FRED/H.10) llegan
con ~1 semana de atraso: la Fed publica la H.10 los lunes.
```

## generate-club-index.js

```text
CÓMO LO RESUELVE: la sección deja de ser prosa paralela y pasa a ser una VISTA
de los datos. Todo lo que imprime sale de `data/clubs.js` y de los
`fiscalYearMeta` de cada club — o sea, de los mismos campos que el sitio usa
para renderizar. No puede desincronizarse, porque no hay nada que sincronizar.

QUÉ NO HACE, A PROPÓSITO: no intenta resumir el "por qué" de cada club (qué
supuesto se tomó, qué salvedad tiene una cifra, qué quedó sin cargar). Eso NO
es derivable de los datos y vive en la evidencia de carga de cada club,
`Admin/carga-clubes/<clubId>.md`. El índice contesta "qué hay"; la evidencia
contesta "por qué".

(sigue el USO)
El archivo publicado lleva UNA línea de comentario.
```

## generate-fuentes-index.js

```text
CÓMO LO RESUELVE: el índice deja de ser prosa paralela y pasa a ser una VISTA
de los archivos de país. No puede desincronizarse porque no hay nada que
sincronizar.

LO QUE NO ES MECÁNICO, Y POR QUÉ ESTE SCRIPT ABORTA EN VEZ DE ADIVINAR:
"cuántos clubes con documento encontrado" no sale de ningún campo
estructurado. El estado de cada club es PROSA LIBRE que escribe el agente de
sourcing ("sin PDFs, pendiente todo", "8 ejercicios reales (2018-2025), sin
cargar aún", "2 memorias descargadas, sin datos financieros cargables"). No
existe un booleano en ningún lado.

La clasificación original se hizo con las dos listas de
regex de abajo, y quedó verificada así: de 530 clubes, 518 matchearon señales
de un solo lado, 0 no matchearon ninguna, y 12 matchearon señales de los dos
lados — esos 12 se resolvieron A MANO leyendo el estado completo, y están
abajo en OVERRIDES con su motivo.

Lo importante del diseño: cuando una línea matchea señales de los dos lados,
o de ninguno, y no tiene override, el script ABORTA (o, con `--check`, la
marca para revisión). NO adivina. Un heurístico silencioso clasifica mal sin
que nadie se entere — ej.: "dead-end propio, solo agregado SFL (5 años)"
matchea un "N años" que PARECE señal de documento y no lo es. Que aborte es
el mecanismo que hace confiable al script, no un detalle: el costo de una
línea que hay que resolver a mano cada tanto es mucho menor que el de un
número publicado que nadie sabe que está mal.
```

## generate-rankings.js

```text
    jp-j1 2025      10 clubes    41 KB crudo     18 KB gzip
    es-laliga 2025   9 clubes    83 KB crudo     29 KB gzip
    ar-primera 2024  8 clubes   496 KB crudo    101 KB gzip

Los argentinos pesan porque Racing trae 16 ejercicios y Vélez otros tantos:
un ranking usa UNO y se bajaría todos. Y el costo se paga de nuevo en cada
liga que el visitante mire.

PERO EL ARGUMENTO DECISIVO NO ES LA VISTA DE LIGA, ES INICIO: la
vista de liga está detrás de un click, o sea que el visitante la pidió; el
ranking de Inicio lo paga TODO visitante, incluido el que rebota. Hoy el
sitio no carga ni un solo `data/<país>/<club>-data.js` de forma eager, y eso es un
logro explícito de la arquitectura (ver Admin/ESTADO.md). Un ranking en vivo en
Inicio lo rompe.

POR QUÉ UN ARCHIVO POR LIGA y no uno solo: mismo patrón y mismo motivo que
`data/club-leagues/<iso2>.js`. La vista de la pestaña Ligas
baja EXACTAMENTE la liga que se está mirando, y el día que haya 200 ligas no
hay que re-particionar nada. Hoy los 8 archivos juntos son ~3 KB gzip.

LO QUE ESTE ARCHIVO ES, Y LO QUE NO ES. Es una VISTA de los datos, como
`data/club-index.js`: todo lo que imprime sale de `computeYearGeneric()` y
`simplifiedReportForClub()`, el MOTOR REAL. No reimplementa ni una cuenta.
Pero a diferencia de `club-index.js`, que copia metadatos, este copia
NÚMEROS — o sea que es una segunda verdad sobre plata, que es lo más
peligroso que este proyecto puede tener suelto. El seguro es `--check`
corriendo dentro de `node tools/audit.js` como P1: si alguien carga un
balance y no regenera esto, la auditoría falla ANTES del push.

POR QUÉ SE PUEDE PRECALCULAR SIN MENTIR: el ranking fuerza USD y Formato
simplificado y lo dice en pantalla, igual que hace Comparar desde la Versión
148. O sea que no depende del toggle de moneda ni del de formato, que son las
dos cosas que podrían cambiar debajo de un número congelado.

EL ORDEN GUARDADO ES DESCENDENTE (el 1 del ranking primero), que es el orden
de la TABLA. El gráfico de barras lo dibuja al revés, ascendente, que es un
pedido explícito de Guido — pero eso es decisión de la vista, no del dato.

(sigue el USO)
(CC BY-SA 4.0). Sin lista bajada, no va. El archivo publicado lleva UNA línea de comentario.
```

## indice-bloques.mjs

```text
CÓMO PUEDE FALLAR (y dónde se ataja):
  - Mistral partió una tabla en dos por un membrete o una imagen en el medio: quedan dos bloques; el segundo se marca `continuaDe` si no
    repite el encabezado. Si lo repite, son dos bloques y la IA de localizar ve que tienen el mismo encabezado.
  - Dos tablas distintas pegadas sin línea en el medio: quedan como una. La IA lo ve en `primeras` / `ultimas` y puede pedir ver el bloque
    entero; la etapa 6 (verificar) lo frena si mezcla cosas (no cierra).
  - Un estado transcripto como texto con los importes en otra línea que la etiqueta: no forma bloque (cada línea tiene que tener su importe).
    Lo detecta localizar ("no encuentro el estado") -> cola humana con la página para mirar.
  - Cifras sin separador (menos de 1.000, o años): se cuentan como cifras si tienen 4+ dígitos; un "25" suelto no. Pero una línea que
    termina en 2+ números chicos ("Receitas financeiras 23 77 742") sí es fila.
  - Un hueco de más de 3 líneas, o con una línea de texto que trae cifras, corta el bloque: el resto queda como otro bloque (marcado
    `continuaDe` si está a 3 líneas o menos) o, si tiene menos de 3 filas, en ninguno. La etapa 6 lo frena (no cierra con el resultado).
```

## inventario-transcripciones.mjs

```text
ESTADOS de validación:
  cargado                 el ejercicio ya está en el sitio (verificado a mano en su momento). No se toca.
  listo                   validado: listo para las tools de onboarding.
  revisar                 la validación encontró algo (cifra mal leída, transcripción incompleta,
                          dos versiones que no coinciden): hay que resolverlo antes de onboardear.
  pendiente-segunda-voz   es un escaneo (no hay texto en el PDF contra qué comparar): necesita una
                          segunda transcripción independiente (Gemini o Claude por API).
  sin-md                  el PDF todavía no tiene ninguna transcripción (tools/pipeline.mjs la hace).
  reintentar              la última corrida de tools/resolver-inventario.mjs no pudo terminar por un
                          problema de crédito / límite / red (NO por el documento): se retoma sola.
  sin-verificar           todavía no se corrió ninguna validación.

MÉTODOS de validación (campo "method" de cada verificación):
  numeros-vs-texto-pdf    tools/verify-numbers.mjs: los números del .md contra el texto interno del PDF.
  comparacion:<voz>       tools/compare-transcripts.mjs contra otra transcripción independiente.

(sigue el USO)
aunque la corrida fuera de 62 PDFs (lote 56, Brasil). Con --solo <lista|carpeta> se recalculan SOLO esos PDFs (también la pregunta
a quien.mjs, acotada a sus carpetas) y las demás líneas del registro se copian tal cual de la versión anterior; los duplicados se
siguen buscando contra el registro entero (la huella de cada PDF ya está guardada). La escalera: escalón 0 = --solo (lo usan
pipeline.mjs --lista/--dir y lote.mjs con su lista); escalón 1 = el recálculo completo (estado.mjs --actualizar, o sin alcance).
Compuerta medida: las líneas de los PDFs del alcance salen idénticas a las del recálculo completo, y las demás, idénticas a las
anteriores. Un PDF borrado del disco fuera del alcance sigue en el registro hasta el próximo recálculo completo.
```

## nbb.mjs

```text
QUÉ ES CADA CÓDIGO (hojas que se cargan; los totales solo son compuerta):
  ingreso   70, 71, 72, 73 (vzw), 74, 76A (y el 76 "uitzonderlijke opbrengsten" del esquema anterior a 2016)
  gasto     60 (o 600/8 + 609 si el 60 no está), 61, 60/61 (abreviado), 62, 630, 631/4, 635/8 (635/9 en vzw), 640/8, 649 (resta), 66A
            (y el 66 "uitzonderlijke kosten" del esquema anterior)
  financiero +75 (o 750, 751, 752/9) +76B, −65 (o 650, 651, 652/9) −66B
  impuesto  −670/3, +77, +780, −680 (o −67/77 si no está el detalle)
  Signo: el impreso. Un renglón "(+)/(-)" negativo resta en su lado (reversiones: 631/4, 635/8, 609; un 71 negativo).
ESQUEMA ABREVIADO (VKT, micro): la Brutomarge 9900 = 70 + 71 + 72 + 73 + 74 + 76A − 60/61.
  a) con Omzet (70, 73 o 70/74) o 60/61 impresos: se abre en esos renglones + el residuo implícito ("Overige bedrijfsopbrengsten (implícito
     en la Brutomarge)", como el ajuste de Lokeren-Temse 2025 y Dender EH) + el 60/61 como gasto, SOLO si el residuo no es negativo;
  b) si no (o el residuo es negativo: el desglose no cierra con la Brutomarge impresa, Patro Eisden 2020 -correction, decisión de Guido):
     la Brutomarge sin abrir; positiva, ingreso; negativa, GASTO por su valor absoluto. El "waarvan" 76A
     no se suma aparte (está adentro).
FORMATO DEL .md: tabla con una celda de código (cualquier columna) o texto suelto "70/76A 11.399.352 7.628.061" (OH Leuven 2019 y 2021).
En texto, una línea con UN solo importe no dice de qué año es ("67/77 610"): se prueban las dos columnas y gana la ÚNICA asignación con
la que la columna del año cierra (compuerta de arriba).
```

## paginas-con-numeros.mjs

```text
Regla elegida (sobre el .md):   (>= 8 cifras y cifras/palabras >= 0,05)   o   (tabla markdown de >= 5 filas y >= 5 cifras)
  - "cifra" = número de >= 3 dígitos con valor >= 100 ("1.234", "(12 345)", "2024", "123456"): mismo regex que la medición previa.
  - "palabras" NO cuenta los separadores de tabla ("|", "---", ":--"): con ellos una tabla con muchas columnas vacías parecía prosa.
  - la segunda mitad (tabla con cifras) rescata las tablas cortas de 2 columnas que la densidad sola perdía.
    Selecciona 45,7% de las páginas | cubre 96,5% de las páginas útiles y 98,7% de los importes (A) | 98,0% de las páginas con rubros
    y 98,7% de los rubros (B).
  + vecinas "suaves" (DEFAULT): se agrega la página anterior y la siguiente de cada seleccionada SI tienen >= 3 cifras (una tabla que
    sigue en la página de al lado, el título del estado arriba y las cifras abajo).
    Selecciona 58,3% | 99,0% de las páginas útiles y 99,7% de los importes (A) | 98,9% de las páginas con rubros y 99,0% de los rubros (B).
    Por motor del .md (con vecinas): legado 58,5% -> 99,0% / 99,7% (A); mistral 55,8% -> 100% / 99,5% (A, 14 docs), 99,2% pág. B (205 docs).

Lo que se probó y NO se eligió:
  - Palabras clave de estado de resultados (STATEMENT_RE de tools/pipeline.mjs, en la página + >= 3 cifras): +12 puntos de páginas
    seleccionadas para ganar ~1 punto de cobertura. No paga.
  - Umbrales más duros (densidad 0,08 o 0,10): bajan a 36-38% de páginas pero pierden 7-14 puntos de páginas útiles.
  - pdftotext -layout página por página (ANTES de tener el .md): en los PDFs con capa de texto sana selecciona lo mismo (45%) con
    menos cobertura (92,4% de las útiles vs 97,2% con el .md, mismos documentos), y el 23% de los PDFs medidos (233 de 1.005) no
    tiene capa de texto usable (escaneo o mojibake, incluidos dígitos: Ferro 2024-25 sale como "!""#$%"). Además hay PDFs "mixtos"
    que pasan el chequeo por documento pero traen justo el estado financiero como imagen (Flamengo 2024, Sevilla 2024-25, Alianza
    Lima). Como el .md de Mistral se hace SIEMPRE y antes de la segunda voz, no hay razón para decidir con pdftotext. Queda solo
    como plan B cuando se llama sin .md (ver abajo).

Qué se pierde (los ~1% de importes): casi todo es prosa con cifras sueltas — el Lagebericht alemán ("die Umsatzerlöse stiegen auf
TEUR 123.456"), notas de políticas contables inglesas, el informe del auditor que cita el resultado. Esas cifras casi siempre están
también en el estado financiero, que sí se selecciona.

----------------------------------------------------------------------------------------------------------------------------------
CÓMO SE USA
----------------------------------------------------------------------------------------------------------------------------------
  import { paginasConNumeros } from './paginas-con-numeros.mjs';
  const { paginas, metodo, detalle } = paginasConNumeros({ mdText });            // lo normal: el .md de Mistral ya está hecho
  const r = paginasConNumeros({ pdfPath: 'Clubes/X/Y/balance.pdf' });             // plan B, sin .md: pdftotext
  const r = paginasConNumeros({ mdText, vecinas: false });                        // sin vecinas (45,7% de las páginas en vez de 58,3%)

  paginas  -> números de página (1-based, los de "--- pág. N ---" del .md = página física del PDF), ordenados.
  metodo   -> 'md' | 'pdftotext' | 'sin-capa-de-texto' (con pdfPath y un PDF escaneado/mojibake: paginas = TODAS, no se puede filtrar
              gratis; lo correcto ahí es transcribir con Mistral primero y volver a llamar con mdText).
  detalle  -> { total, seleccionadas, porRegla: {densidad, tabla, vecina}, porPagina: [{n, cifras, palabras, filasTabla, motivo}] }

  CLI:  node tools/paginas-con-numeros.mjs <archivo.md | archivo.pdf> [--sin-vecinas] [--json]
        Con un .pdf usa el .md hermano si existe (mismo nombre base); si no, pdftotext.
```

## perimetro-senales.mjs

```text
DÓNDE SE USA: lote.mjs y antes-de-localizar.mjs llaman a fijarPerimetroDeClubes() (abajo)
antes de la compuerta del perímetro. Medido contra Admin/mediciones/perimetro-verdad.tsv: 77 bien, 0 mal, 23 sin decidir. Cualquier cambio acá
se mide otra vez con esa verdad (--verdad ... --jev) y tiene que seguir en 0 mal.

LA ESCALERA (solo propone; lo que no se decide va a la cola humana):

 PASO A (gratis)  ¿Qué estados trae el documento COMO TABLA? Cada fila de tabla con el total de ingresos ("Totale valore della
                  produzione", "Totale ricavi", "Total revenue"...) se etiqueta con el título más cercano hacia arriba que nombra un
                  perímetro (CONSOLIDADO: "bilancio consolidato", "conto economico gruppo X"...; INDIVIDUAL: "bilancio d'esercizio",
                  "separato", "individual"...). Títulos sin perímetro ("Fatti di rilievo...") se saltean.
                    solo tablas consolidadas, y ningún título individual de estado en el documento → consolidado
                    solo tablas individuales (o sin etiqueta), y ningún título consolidado de estado     → individual
                    sin tablas de total de ingresos                                                       → PASO A2
                    tablas de los dos                                                                     → PASO B
                    (un título del otro perímetro sin su tabla —por ejemplo la tabla no se reconoció— → cola, no decide)
 PASO A2 (Claude) El paso A reconoce italiano e inglés. Sin ninguna tabla reconocida (Aris, en griego), Claude ubica el estado de
                  resultados y vota cinco criterios con peso (título 4, texto del estado 4, auditor 1, grupo 1, portada 1), cada sí con su
                  línea: 4 o más → consolidado · 0 a 2 → individual · 3 → cola; con columnas o estados de los dos perímetros → cola. Pago: solo con --jev / al ejecutar.
 PASO A3 (Claude) A2 vio los dos estados sin totales para votar: ¿alguna controlada hace el negocio del fútbol del club?
                  Con la línea que la nombra; solo "consolidado" decide (cuenta como el voto del documento). Ver pasoA3().
 PASO B (voto)    Tres criterios, uno por voto:
                    C1 (gratis) los ingresos consolidados superan a los individuales en 5% o más, en el año o en el anterior
                       (las controladas tienen negocio propio: Roma, Lazio). Escala: miles vs unidades se normaliza.
                    C2 (gratis) el individual crece 15 puntos o más distinto que el consolidado (fusión de controladas: Milan 2023-24)
                    C3 (Jev)    ¿alguna controlada consolidada hace negocio del fútbol del club (sponsors, medios, merchandising,
                                marketing, entradas, estadio)? Se le pasa el texto del área de consolidación / controladas.
                  2 o 3 votos → consolidado · 0 → individual · 1 → cola.

(sigue el USO)
  node tools/perimetro-senales.mjs --lista <txt> --exportar-a3 <carpeta>             # los pedidos de A3, para un subagente
  node tools/perimetro-senales.mjs --evaluar-a3 <carpeta>                             # la compuerta de A3 sobre <n>.json contra el perímetro fijado
Jev: Admin/api-keys/jev.env con JEV_API_KEY=...; respuestas guardadas en Generados/_cache/jev-perimetro.jsonl (no se paga dos veces).
```

## pipeline.mjs

```text
  ¿DE QUÉ CLUB ES?  tools/carpetas-clubes.mjs (vía inventario-transcripciones.mjs): con eso el registro sabe qué ejercicio ya está cargado.
  TRANSCRIBIR       Sin .md -> Mistral OCR transcribe el documento ENTERO (queda como documentación, decisión de Guido). Un .md viejo SIN
                    TABLAS se rehace con Mistral una sola vez (`sin-tablas`, control "sin tablas" más abajo). PDFs dañados o con imágenes
                    gigantes: tools/reparar-pdf.mjs.
  VALIDAR           (tools/resolver-inventario.mjs) SOLO páginas con números que los chequeos gratis no respaldan:
                      a. tools/paginas-con-numeros.mjs descarta la prosa (58% de páginas elegidas, 99,7% de los importes cubiertos);
                      b. tools/chequeos-gratis.mjs valida gratis cada página con el texto del PDF, las sumas de sus tablas, la columna
                         del año anterior ya cargada y el balance (163/163 errores reales siguen yendo a pagar; ~49% de ahorro);
                      c. lo que queda `dudosa`: PDF con texto -> Claude solo esas páginas; escaneo -> Gemini (página por página si
                         rechaza por RECITATION) y Claude como desempate, en lotes de hasta 8 páginas; voto entre voces, cuarta voz,
                         aritmética, y "reserva" como último recurso.
                    Fallos por crédito/límite: espera y reintenta el mismo motor; tras 3 seguidos corta la corrida (`reintentar`).
  MARCAR            registro Admin/registros/transcripciones-estado.jsonl (se regenera solo); historial en Admin/registros/transcripciones-verificaciones.jsonl.
(Antes hacía además la preparación para Jev y la categorización con Jev y Claude: ver "PROCESO VIEJO, RETIRADO".)

COSTO medido (piloto C, 10 PDFs): ~US$ 0,20 por documento; PDF con texto US$ 0,08-0,18 (casi todo Mistral); escaneo US$ 0,13-0,21;
un escaneo malo (Real Madrid 2005) ~US$ 1. `node tools/gasto.mjs --lista <lista>` da el costo real de una corrida.

NO toca los ejercicios que ya están cargados en el sitio. Se puede cortar con Control+C (en Mac, la tecla control, no command) y volver
a correr: sigue donde quedó. Cerrar la pestaña de la terminal NO corta los procesos.
Toma una MUESTRA repartida por tamaño (--limit) y deja para el final los documentos de más de 100 páginas (--max-paginas).
```

## resolver-inventario.mjs

```text
FLUJO POR DOCUMENTO
  PDF con texto:  páginas con dudas (gratis) -> Claude solo esas -> se reemplazan -> revalida
                  con tools/verify-numbers.mjs -> listo / revisar.
  Escaneo:        Gemini solo en las páginas con números que los chequeos gratis dejan dudosas (por tramos), como
                  segunda voz
                    - Gemini rechaza por RECITATION -> Gemini página por página (una página sola suele pasar el
                      filtro) y Claude solo en las que rechace; si nadie más valida una página, gana Claude y la
                      página queda anotada como "reserva" (al onboardear, cerrarla con el chequeo de sumas).
                    - Gemini responde -> páginas donde canónica y Gemini difieren -> Claude solo esas.
  .md sin marcas de página (no se puede trabajar por página): se re-hace entero con Mistral.

FALLOS POR CRÉDITO / LÍMITE (pedido de Guido: las APIs tienen recarga automática, pero un PDF o dos
se rechazaron mientras entraba el pago): se distinguen de un rechazo PERMANENTE.
  - crédito / cuota / límite de velocidad / servidor caído / timeout  -> se ESPERA y se reintenta el
    MISMO motor (con espera creciente, para darle tiempo a la recarga). Nunca se pasa al motor
    siguiente por esto: un motor sin crédito no es un motor que rechaza el documento.
  - Si tras esperar sigue fallando, el documento queda en estado "reintentar" y la corrida SE DETIENE
    si pasa 3 veces seguidas (para no marcar cientos de documentos por un problema de cuenta).
    La próxima corrida los retoma solos.
  - RECITATION (Gemini) es permanente para ese documento y sí pasa a Claude.

COSTO: nada corre sin --ejecutar. Sin él, es un ensayo (--dry-run implícito) que no llama a ninguna
API y estima el costo. Cada corrida real anota en Admin/registros/transcripciones-verificaciones.jsonl qué se
hizo, qué páginas reemplazó cada motor y cuánto costó.
```

## suggest-category-precedent.mjs

```text
INGRESO Y GASTO SE BUSCAN POR SEPARADO, NUNCA MEZCLADOS (bug real
encontrado probando esta tool): Boca tiene "Futbol Femenino"
como INGRESO (-> womens_football, 2027) y "Fútbol femenino" como GASTO
(-> youth_other_sports_expense, 2022/2023/2025) — mismo texto, dos rubros
distintos según el lado del balance. La primera versión los mezclaba en un
solo mapa y los marcaba como "conflicto" (categoría inconsistente), que era
un falso positivo: no es el MISMO rubro repetido con criterio distinto, son
dos rubros distintos que comparten nombre. Por default busca en los dos
lados y devuelve un resultado por cada uno (`--side revenue`/`--side
expense` para acotar a uno solo).

Reusa el mismo patrón de carga que tools/generate-club-index.js (vm, no
require: estos archivos están escritos para el navegador).
```

## vocabulario.mjs

```text
CÓMO SE COMPARA UN TEXTO (UNA sola normalización para todo el proyecto: `normalizar()`, más abajo). Antes de comparar, TODO texto (la
sección de una tabla, sus columnas, la etiqueta de una fila, una línea de título) pasa por `normalizar()`, y LOS TÉRMINOS DE ESTE ARCHIVO
TAMBIÉN (al compilar las regex). Por eso los términos se escriben como se escriben en el idioma, con sus acentos ("výkaz zisku a ztráty",
"Erträge", "Hasılat", "звіт про фінансові результати"): los dos lados quedan iguales. `normalizar()`:
  1. minúsculas (con la regla de la sigma final griega: ς -> σ, para que "αποτελεσματος" y "αποτελεσματοσ" sean lo mismo);
  2. descompone por COMPATIBILIDAD (NFKD) y saca los signos diacríticos combinantes: á->a, ü->u, č->c, ř->r, ё->е, й->и, ї->і, ş->s,
     ğ->g, İ->i; NFKD además deshace las ligaduras de los PDF ("Deﬁcit" -> "deficit", Estudiantes LP 2022-23), los caracteres de ancho
     completo del japonés ("Ｊ１" -> "j1"), "º" -> "o" y los superíndices;
     también la vocalización del árabe y el hebreo (harakat, niqqud) y el tatweel árabe;
  3. letras que NO se descomponen y que hay que llevar a mano: ß->ss, æ->ae, œ->oe, ø->o, ð->d, đ->d, ł->l, ı->i (turco), ħ->h, þ->th;
     y las alef árabes con hamza/madda a alef simple (أ إ آ -> ا);
  4. recompone (NFC): las sílabas de Hangul (coreano) y los kana con dakuten (japonés) vuelven a ser un solo carácter;
  5. espacios (incluido el no separable) colapsados en uno, sin espacios al principio ni al final.
  OJO: la ä alemana/sueca queda 'a' (NO 'ae'): "Erträge" -> "ertrage", "omsättning" -> "omsattning". Si un documento escribe "Ertraege"
  (sin diéresis, como en un teclado sin ä), es OTRA forma y necesita su propia entrada (por eso hay pares 'ertrag'/'ertraeg').

CÓMO SE ESCRIBE UN TÉRMINO (notación propia, compilada a regex por `fuente()`):
  'palabra'          palabra o frase ENTERA: no puede tener letras ni dígitos pegados ni antes ni después ("kar" no encuentra "karakter").
  'raiz*'            raíz: nada pegado ANTES, cualquier terminación DESPUÉS ("ingreso*" = ingreso, ingresos; "výnos*" = výnosy, výnosů).
                     Es la forma normal para idiomas con flexión (checo, polaco, ruso, ucraniano, croata, turco, finés, griego...).
  '*infijo*'         en cualquier lugar, también DENTRO de otra palabra: para idiomas que pegan palabras (alemán "Personalaufwand",
                     noruego "Billettinntekter", neerlandés "Sponsoropbrengsten", danés "Sponsorindtægter", húngaro "árbevétel", finés
                     "Pääsylipputuotot"). Solo con raíces largas o muy específicas: una raíz de 3-4 letras como infijo encuentra basura.
  ' ' (espacio)      cualquier separador entre palabras (espacio, guion, barra, apóstrofo, coma...): "chiffre d affaires" encuentra
                     "chiffre d'affaires"; "kar zarar" encuentra "Kâr/Zarar".
  '-' (guion)        separador OPCIONAL: "sub-total" encuentra "subtotal", "sub total", "sub-total"; "gewinn- und verlust*" encuentra
                     "Gewinn- und Verlustrechnung" y "Gewinn und Verlust".
  '*' en el medio    cualquier cantidad de letras: "vykaz zisk* a ztrat*" = "výkaz zisku a ztráty" y "výkaz zisků a ztrát".
  { re: '...' }      regex cruda (ya escrita en texto normalizado, con la bandera `u`), solo cuando la notación no alcanza: la
                     exclusión de "Vertrag" en 'ertrag', o "concepto (del )?ingreso".
  Chino, japonés, coreano, árabe y hebreo NO usan límites de palabra aunque el término no lleve '*': el chino y el japonés no tienen
  espacios, el coreano pega partículas, y el árabe y el hebreo pegan prefijos al sustantivo (ال "el", و "y", ב "en", ה "el"). Se buscan
  en cualquier lugar.

CÓMO AGREGAR UN IDIOMA (o una palabra que faltó en un piloto):
  1. Buscá el concepto en VOCABULARIO (abajo) y agregá la clave del idioma (código ISO de 2 letras; 'hr' cubre croata/bosnio/serbio en
     alfabeto latino y 'sr' el serbio en cirílico) con sus términos. Escribilos tal como aparecen en el documento, con acentos.
  2. Preferí la palabra o frase entera, o una raíz con '*' al final. Usá '*infijo*' solo para idiomas que componen palabras y con raíces
     de 5+ letras. Probá una raíz corta contra palabras comunes del mismo idioma antes de agregarla (ya pasó: 'resultado' en prosa hacía
     que cualquier nota contara como estado de resultados; 'zisk' dentro de otras palabras).
  3. `node tools/vocabulario.mjs "texto de prueba"` dice qué conceptos encuentra en ese texto; `node tools/vocabulario.mjs --cobertura`
     imprime la matriz concepto x idioma (qué idioma falta en qué concepto).
  4. Medí antes y después sobre el inventario (así se hizo, informe en Admin/mediciones/test-vocabulario.md): un término nuevo en
     RELEVANTE o en INGRESOS/GASTOS puede volver "relevantes" tablas de notas y de balance y multiplicar los rubros (una regla probada en la
     una versión anterior llevó Real Madrid de 32 a 253 rubros: eso es un error, no una mejora).

QUIÉN LO USA: extract-table-rows.mjs (relevancia de una tabla y de sus filas), filas-rubro.mjs (lado, resultados, subtotales,
columna de notas), proponer-carga.mjs y cargar.mjs (título de estado, totales, resultado, financiero, impuestos), caja-deuda.mjs
(caja, deuda, títulos de balance), chequeos-gratis.mjs (TOTAL_ACTIVO / TOTAL_PASIVO); solo normalizar() / familia:
categorizar-claude, cola, memoria-categorias, padres-filas y respuestas-cache.
============================================================================

---------------------------------------------------------------- normalización (la ÚNICA del pipeline)
```

## periodo.mjs

```text
CÓMO DECIDE (en este orden; solo mira las 6 primeras páginas y las líneas cortas, donde están los títulos, para no confundirse con la
prosa de las notas, que habla de "trimestres" o "seis meses" por cualquier motivo):
  0. Si el .md salió de un informe XHTML (iXBRL) y se pasa el XHTML ({ xhtml }, xhtmlHermano()): el período ETIQUETADO (periodoIxbrl), antes del texto.
  1. "N meses" explícito cerca de una palabra de cierre/período ("three months ended", "seis meses terminados", "üç aylık", "за 9 месяцев",
     "sechs Monate", "9M", "H1", "1T", "Q3"), en ~15 idiomas. Número en cifras o en palabras.
  2. Rango de fechas explícito ("del 1 de enero al 30 de junio de 2019", "01.01.2019 - 30.09.2019", "1 July 2018 to 31 December 2018"):
     los meses salen de la diferencia.
  2b. Rango que no empieza el día 1, único en los títulos y de menos de 12 meses: primer ejercicio corto ("09/08/2021 – 30/06/2022").
  3. Palabra de período intermedio SIN meses ("interim", "ara dönem", "Zwischenbericht", "delårsrapport", "полугодие", "中期"): 'intermedio'.
  4. Nada de lo anterior: 'anual' (lo normal en este proyecto), con el cierre = la fecha de fin de mes más citada en los títulos.
  Fecha de cierre, escalera: escalón 0 la más citada en los títulos; escalón 1 los encabezados de columna de las tablas
  (ejercicio | mismo día un año antes); compuerta: nunca más de 2 años después de hoy.
```
