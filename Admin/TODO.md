# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.**
No la dupliques en `Admin/CHANGELOG.md` ni en `Admin/finance-of-sports-project.md`, que son historia,
ni en el comentario de ningún archivo de código.

## Cómo leer esta lista

- **Los números son IDENTIFICADORES, no prioridad.** Se conservan de la lista vieja (la
  que vivía en el comentario de `index.html`) porque los puntos se citan entre ellos:
  "ver to-do 20(h)" tiene que seguir apuntando a lo mismo. Por eso hay
  huecos: son los puntos que se resolvieron o se descartaron. Un punto nuevo toma el
  número siguiente al más alto, nunca uno libre.
- **La prioridad es el ORDEN en que están escritos**, de arriba hacia abajo.
- **Un punto resuelto se BORRA de acá.** Su historia ya queda en `Admin/CHANGELOG.md` y, si
  ameritaba el porqué, en `Admin/finance-of-sports-project.md`. Antes se dejaban marcados como
  "RESUELTO" y la lista terminó con la mitad de los puntos siendo cosas ya hechas.
- **Los pendientes de sourcing de un país no van acá**: viven en `Admin/sourcing/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

---

## Qué hay que hacer

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `Admin/sourcing/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

51. PROCESO DE EMAIL A CLUBES — EN CONSTRUCCIÓN, ETAPA 1. El envío queda afuera de cualquier sesión
    de chat: Resend + subdominio propio + una cola de archivos que Guido revisa, con el envío
    disparado por Guido desde su propia terminal. Proceso completo en
    `.claude/skills/club-outreach/SKILL.md`. Sin regla de disparo automática todavía: Guido decide
    cuándo escribir.

    **Infraestructura, estado real:** (a) ✅ cuenta en Resend creada 2026-09-24 (conectada con
    GitHub, sigue en free por ahora); (b) ✅ subdominio `outreach.financeofsports.com` verificado
    2026-09-24 (DNS en Netlify DNS — DKIM, SPF vía 2 CNAME, DMARC `p=none` en `_dmarc.outreach`, no
    en la raíz); (c) `Receiving` activado (MX agregado, propagación confirmada por `dig` desde 3
    resolvers distintos) — el dashboard de Resend tardó en reflejarlo como verificado pero la
    infraestructura ya estaba bien; (d) ✅ API key generada y en `Admin/api-keys/outreach.env`
    (gitignoreado), `from` = `info@outreach.financeofsports.com`.

    **✅ PIPELINE PROBADO DE PUNTA A PUNTA, 2026-09-25**: mail de prueba escrito directo en
    `Admin/outreach/aprobados/`, Guido corrió `tools/outreach-send.js` desde su terminal, llegó a su
    Gmail, y el archivo se archivó solo en `Admin/outreach/enviados/`. La Etapa 1 está lista para
    usarse con clubes de verdad — ver `club-outreach/SKILL.md` sección 1 para el flujo completo
    (candidatos → redactar en `cola/` → Guido aprueba moviendo a `aprobados/` → Guido corre el
    script).

    **Check-in programado para 2026-10-24** (30 días desde que arrancó la Etapa 1): evaluar si
    conviene prender la Etapa 2 (regla de disparo automática — 3 preguntas acumuladas O 90 días — y
    cadencia de follow-up/cooldown, documentadas pero no activas todavía en el skill). Ver
    `Admin/outreach/checkin-2026-10-24.md` para qué mirar exactamente. Hay una tarea programada
    (`club-outreach-checkin`) que va a preguntarlo esa fecha, más el archivo como respaldo.

    **El criterio de CUÁNDO un club amerita un mail sigue siendo el mismo, sin cambios** (to-do 52,
    `club-sourcing/SKILL.md` sección 0.3): documento CONFIRMADO que existe pero no descargable
    (prensa con cifras, video en vez de PDF, compartir revocado — ver Independiente/Banfield/Atlanta)
    sí amerita mail; un dead-end sin ninguna señal de que el documento exista, o un bloqueo
    regulatorio estructural, no. Ese criterio y este proceso son cosas separadas a propósito.

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-10). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/registros/altas-revision.jsonl: nombre, color, perímetro, cierres y ligas).
    HECHO: Brasil completo (lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs, 16 clubes). Etapa 2 (transcribir) de los 14 países
    del (c) hecha: lote 66 (468 documentos). Nombres legales de las altas: 24 contestados con cita (ajustes `name`). Gestiones de los clubes
    nuevos de Grecia, Rep. Checa, Portugal, Noruega, Países Bajos y Turquía cargadas (to-do 195).
    FALTA, en este orden:
    a) GRECIA (lote 67, 42 documentos con estado de resultados; los otros 87 de las carpetas son balances, notas, informes del directorio y
       del auditor, y actas: no entran). Cola contestada (81 respuestas), intereses de Volos 2021-2025 con signo (ajustes `fila`), 41
       verificaciones OK. Falta la etapa 7 (categorizar, ~US$ 1) y la carga, que corre Guido:
       `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-67.txt --ejecutar --cargar` (alta de AEK, Asteras, Levadiakos, OFI y
       Panserraikos con sus años; Volos ya tiene la verificación lista). Después: leer el resultado, la cola nueva y lo que quede.
       AEK 2025 (AEK_NOTES_IFRS_2025-06-30_a): la etapa 4 dejó 3 números sin confirmar contra el PDF. Panserraikos 2024 no pasó por verificar.
    b) Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
    d) Rusia: las tablas de otros ingresos y gastos que no suman el código del formulario (Krasnodar, Krylia 2021-2025, Rostov 2025, Rubin
       2022-2025: la nota en bruto, el formulario en neto). Sin daño hoy: esos años quedan con el renglón entero.
    Mejoras de script vistas en Grecia: to-dos 210-215.

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

195. GESTIONES DE LOS CLUBES YA CARGADOS QUE NO LAS TIENEN (pedido de Guido, 2026-10-09). Medido ese día (clubes con gestión / clubes en el sitio): Países Bajos 0/4,
    Japón 0/10, Grecia 0/2, México 0/1, Perú 0/1, Croacia 1/8, Bélgica 2/14, España 1/19, Dinamarca 2/11, Chile 1/3, Colombia 4/12, Alemania 5/11, Brasil 16/34,
    Inglaterra 16/19 (unos 75 clubes). Un Sonnet por país, con fuente por cada fecha, mismo formato y regla de siempre (`Admin/ARQUITECTURA.md`,
    "Gestiones"; lo hecho con Juventus, to-do 194). Sin comentarios en `data/gestiones/`: el porqué de cada fecha va a "## Gestiones" del
    `Admin/carga-clubes/<club>.md` (con `agregarSeccion()` de `tools/evidencia-club.mjs`), y el criterio del país a `Admin/gestiones-por-pais/<país>.md`.



207. ESCALA: REMEDIR "OTROS NEGOCIOS DEL CLUB" (revisión de la skill `escala-finance-of-sports`, sección I). La señal para evaluar un eje
    separado de otros negocios del club era "~300 clubes cargados" y la proporción (~10 %) se midió con 161 clubes; hoy hay más (ver
    `Admin/ESTADO-clubes.md`). Remedir la proporción en la próxima corrida del eje `escala` y, si cambió, actualizar ese punto de la skill
    (umbral y criterio).

210. EL ENSAYO DE `cargar-lote.mjs` PROMETE AÑOS DE CLUBES NUEVOS QUE DESPUÉS NO ENTRAN (mejora de script). Con un club que no existe,
    `cargar.mjs --desde-verificacion` frena en "el club no existe" y no mira los demás frenos (casos de la verificación pendientes, categorías
    en la cola); el ensayo los cuenta como "se escribirían". Caso: lote 67 (Grecia), el ensayo dijo 21 años y `--escribir` no escribió ninguno
    (alta hecha y revertida 5 veces). Escalón posible: en el ensayo, para un club nuevo, evaluar el resto de los frenos como si el club existiera.

211. DUDAS CONTRADICTORIAS SOBRE EL MISMO CUADRO (mejora de script, cola). localizar y extraer preguntan por separado sobre el mismo cuadro y con
    propuestas opuestas: AEK 2016-2025, "¿se carga 'Παροχές στο προσωπικό' como desglose?" (sí) y "¿se deja afuera?" (sí). Además verificar ya
    deja afuera solo una nota que no suma ningún renglón: esas dudas no cambian la carga. Evaluar: (a) juntar las dudas por cuadro (bloque y
    líneas) en un solo caso; (b) cerrar como "no afecta la carga" la duda sobre un cuadro que verificar no usó porque no suma. Medir cuántos
    casos de la cola de Grecia (37 de 82 eran de este tipo) desaparecen.

212. INTERESES IMPRESOS SIN SIGNO Y TOLERANCIA QUE LOS TAPA (mejora de script, datos). Volos 2021-2025 imprime interés cobrado y pagado sin
    signo; la carga sumaba los dos como costo (2024: financiero −11.072 € en vez de −862 €). Solo 2024 no cerraba: en 2021 y 2025 la diferencia
    (2 × el cobrado) entraba en la tolerancia y la verificación decía "cierra". Hoy se corrigió con ajustes `fila`. Evaluar un escalón: el signo
    de cada fila del financiero por su etiqueta (πιστωτικοί/χρεωστικοί, receitas/despesas financeiras, financial income/expense), con
    compuerta de resultado EXACTO, cuando la lectura cierra solo dentro de la tolerancia.

213. DUDAS DE ESCALA QUE OTRO DOCUMENTO DEL MISMO AÑO RESPONDE (optimización, cola). OFI 2018-2024 y Volos 2020-2025 preguntaban "¿los importes
    están en euros?" y el informe del directorio del mismo año imprime el mismo Κύκλος εργασιών con "€". Evaluar un escalón: si un documento
    hermano de la carpeta (mismo cierre) imprime el mismo número con símbolo o leyenda de moneda/escala, la duda se cierra sola con esa cita.

214. PRIMER AÑO QUE CIERRA EXACTO (optimización, cola). El caso "primer-anio" pide revisar ingresos, gastos y resultado de todo club nuevo; en
    Grecia los 7 coincidían exacto con lo impreso. Evaluar: si los tres cierran exacto contra totales impresos (no solo el resultado) y el alta
    no tiene preguntas, el caso no se levanta (o se baja a una nota). Decisión de Guido: hoy el primer año lo revisa él a propósito.

215. PRECEDENTE DE CATEGORÍA DE UN SOLO CLUB DEL PAÍS (optimización, cola). El escalón B de categorías pide 2 clubes del país con la misma
    respuesta; en Grecia solo estaba AEL Larissa, así que Asteras, Levadiakos y OFI volvieron a preguntar "Κόστος πωλήσεων", "Έξοδα διάθεσης",
    "Αμοιβές και έξοδα προσωπικού" (21 casos). Evaluar un escalón con 1 club y mismo contexto exacto (misma nota/renglón título), que proponga
    con cita del precedente y que la compuerta de lado y de sumas decida; medir aciertos contra las respuestas de hoy.

216. PRIMER ALTA DE CLUB CON LA EVIDENCIA FUERA DE `data/` (probar en vivo). Ningún lote dio todavía de alta un club nuevo Y cargó su primer
    año con los scripts que escriben la evidencia en `Admin/carga-clubes/<clubId>.md` en vez de comentarios en `data/`. La primera vez, mirar:
    el `.md` nuevo del club, que `data/<club>-data.js` salga sin comentarios (`node tools/audit.js` lo avisa como `comentario-en-data-club`)
    y el commit de cada año. Si algo sale mal, el lugar es `tools/evidencia-club.mjs` y `Admin/PIPELINE.md`, "Dónde queda la evidencia" (etapa 8).

217. ORGANIZAR LAS CARPETAS DEL PROYECTO (pedido de Guido). Método: un paso por vez, con ejemplo real; cada paso con `git mv`, buscar la
    ruta vieja de las dos formas (`Admin/x` y `'Admin', 'x'`) hasta dar 0 fuera de la historia, y además las armadas con una
    variable (`grep -rnE "'Admin',\s*[a-zA-Z_\[\$]|\`Admin/\$\{" tools`: así se escapaba `resolver-inventario.mjs`, `LOGDIR[engine]`), `node --check` de cada tool tocada y
    `diff` antes/después de `audit.js`, `estado.mjs` y `lote.mjs --lista Admin/lotes/prueba-rapida.txt` (ensayo gratis). Un commit por paso.
    Los registros que solo se agregan (`cola-revision.jsonl`, `cargar-ultimo.jsonl`) citan rutas viejas como texto: no se reescriben,
    pero hay que confirmar que ningún script las abre. HECHO: raíz (e2.json, Business Books), lotes (`Admin/lotes/`, los cerrados en Archive), claves (`Admin/api-keys/`,
    `schema.sql` a `tools/supabase/`) logs de gasto de API (`Admin/registros/api/`),
    mediciones (`Admin/mediciones/`) registros del pipeline (`Admin/registros/`; la evidencia de `Admin/carga-clubes/` cita la ruta nueva) y
    los scripts de sourcing de Europa del Este (`tools/sourcing-europa-este/`). `Admin/` quedó en los documentos y 9 carpetas.
    Las notas de sourcing (`<País>/<Club>.md`, `_indice/`, `README.md`) en `Admin/sourcing/`; `fuentes/` quedó solo con las páginas públicas.
    `cargar-lote.mjs` y `bfo-rusia.mjs` exigen, commitean y revierten `Admin/sourcing` junto con `fuentes`.
    FALTA, en este orden (decidido con Guido):
      g) `data/<país>/<clubId>-data.js`: el loader de `index.html` (~línea 730) arma la ruta con `clubs[clubId].country`; las ~32 tools,
         con una función compartida. Red: `?audit=1` carga los 214 clubes y cuenta "clubes que no cargaron".
      h) `js/`: sacar los ~78 KB de JS inline de `index.html` a archivos de `js/`, y `js/styles.css` a `css/`. Verificar en la vista
         previa y con `?audit=1`.
      i) `tools/` en carpetas por etapa (sourcing, transcripción, onboarding, generadores, auditoría, común): 99 archivos, 128 imports
         entre ellos, ~248 menciones en docs y skills. Con su propio plan y ejemplo; decidir con Guido antes de empezar.
