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
    a) GRECIA: lote 67 corrido (2026-10-13). Cargados: Asteras 2019-2020, Levadiakos 2019-2025, OFI 2018-2025, AEK 2016-2020. Falta:
       Asteras 2021-2025 (9 casos de categoría en la cola), AEK 2021-2025 (to-do 220), Panserraikos 2023 y 2025 (categoría y perfil),
       Volos 2019-2025 (2019-2020 categoría; 2021-2025 la pregunta del alta `reportType` y "Salarios del plantel en 0", que pide
       `--reintentar` con una lista solo de esos años). La cola la contesta un subagente (to-do 220).
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

195. GESTIONES SIN FUENTE (lo que quedó de las tandas 1 y 2, ambas cargadas: solo entran las `confirmada: true`). Otra tanda si Guido
    quiere, con el mismo armado de `Admin/gestiones-por-pais/tanda-2026-10-13/` (`validar.js <N>` dice qué cierre queda sin gestión). Cierres
    sin cubrir: Fortaleza, Novorizontino, Cuiabá (fecha del cambio Alessandro -> Cristiano Dresch), Ituano, Ceará 2024-2025 y Amazonas 2024
    (ninguna confirmada); Goiás 2008-2013, 2017 y 2023-2025; Cruzeiro 2024-2025 (Pedro Lourenço sin fecha de cierre de la compra); Criciúma
    2012-2014 y 2021; CRB 2020; Pari NN 2021-2022; Once Caldas 2024-2025; Mönchengladbach 2023 (Rolf Königs). Las dudas de cada club, en
    "## Gestiones" de su `Admin/carga-clubes/<club>.md`; los casos `firmo` (la gestión cambió entre el cierre y la aprobación del balance),
    ahí mismo, sin cargar.



214. EL PRIMER AÑO DE UN CLUB SIN GUIDO (decisión de Guido, 2026-10-13: no lo revisa ni puede revisarlo; el plan no cuenta con él). Hechos los
    escalones 1 y 2 de `verificar.mjs` (lo impreso confirma lo cargado a 0,01%: 29 de los 77 aceptados se cierran solos).
    Lo que falta, de a un escalón, cada uno medido con el script de simulación (los 115 casos "primer-anio" históricos de
    `Admin/registros/cola-revision.jsonl` contra los números de cada `.verificacion.json`: `suma`/`impreso` de los totales, `dif` del resultado)
    y con `verificar.mjs --lista` sobre lo ya cargado (tiene que dar idéntico; restaurar después la cola y `Generados/`, porque re-verificar
    años cargados levanta casos "anio-anterior" que no son trabajo real):
      - Escalón 3: solo imprime el resultado (42 de los 77: Grecia, DRE de Brasil). Con el resultado exacto, lo único que se escapa son
        errores que se compensan (la misma cifra de más en los dos lados) o el documento equivocado (Roma 2011 separato). Pregunta puntual a
        la IA (Claude por API, en el pipeline) con las filas del estado y su cita: "¿falta, sobra o se repite alguna fila del estado?"; si
        dice que no y el resultado es exacto, sin caso. Medir: 0 alarmas sobre los 42 aceptados, y que detecte errores fabricados (una fila
        repetida en los dos lados) en una copia del scratchpad.
      - Lo que quede en la cola: lo contesta un subagente Sonnet de la sesión con cita del documento (como ya se hizo "Claude, Guido
        delega"), nunca Guido. Si el subagente no puede confirmar, el año no se carga y va a `Admin/dudas-por-club.md`.

218. SACAR LAS ETAPAS VIEJAS DE `tools/onboard.mjs` Y ARCHIVAR `tools/prepare-onboarding.mjs` (limpieza de código). Hechos (a) y (b):
    `tieScore()` borrado; el camino de `cargar.mjs` sin `--desde-verificacion` sacado y `proponer-carga.mjs` archivado (sus `loadSite()` y
    `parseNumber()` están en `tools/datos-sitio.mjs`). Falta: (c) separar las dos funciones vivas de `onboard.mjs`, `--quien` (qué club y
    año es un PDF; lo llaman `cargar.mjs` y `chequeos-gratis.mjs`) y `--all --dry-run` (qué está cargado; lo llama
    `inventario-transcripciones.mjs`), en `onboard.mjs` o en una tool chica nueva, y borrar las etapas viejas (`--transcribe-only`,
    `--check-only`, la etapa `onboard`), que ya no usa nadie; (d) archivar `prepare-onboarding.mjs` en `tools/archivo/` (hoy solo lo
    llaman esas etapas viejas). Medir antes y después: `node tools/estado.mjs --actualizar` y `diff` de
    `Admin/registros/transcripciones-estado.jsonl`; ensayos de `cargar-lote.mjs` y de `lote.mjs --lista Admin/lotes/prueba-completa.txt`.
    `suggest-category-precedent.mjs`, `sum-check.mjs`, `extract-table-rows.mjs` y `compare-transcripts.mjs` NO se archivan: las usan la skill
    `club-data-mapping` e `inventario-transcripciones.mjs`.

219. REVISAR LOS NIVELES P0/P1/P2/P3 DE `tools/audit.js` (pedido de Guido). Dos preguntas: (a) ¿hay chequeos que faltan en P0/P1, cosas que
    hoy un lote puede cargar mal sin que la auditoría lo frene? (`cargar.mjs` y `cargar-lote.mjs` solo revierten con P0/P1, así que lo que
    vive en P2 nunca frena una carga); (b) ¿está bien el nivel de cada chequeo de hoy? Hoy el P2 mezcla avisos que pueden tapar un dato mal
    cargado (`signo-invertido`, `salto-interanual`, `sin-salarios`, `outlier-liga`) con otros que son estructurales y esperables
    (`gestion-club-inexistente`: gestiones de clubes que todavía no tienen balance, más candidato a P3; `catchall-dominante`). Empezar por
    revisar los casos de los cuatro primeros contra la fuente: si alguno es un error real, ese chequeo pide subir de nivel o un escalón en
    la carga. `node tools/audit.js` da el detalle de cada uno.

220. LA COLA SIN GUIDO (decisión de Guido, 2026-10-13: no la revisa ni puede revisarla). Probado con AEK Athens: un subagente Sonnet contestó
    las 19 etiquetas de categoría (80 casos de 6 años; leyó la skill `club-data-mapping`, los precedentes griegos y cada nota del .md) y
    Claude aplicó las 18 firmes con `cola.mjs --responder` firmadas "Claude 2026-10-13 (subagente Sonnet...)"; los 22 de perfil (socios,
    otros deportes) los contestó Claude con cita (PAE de solo fútbol, L574). Entraron AEK 2016-2020. Falta:
      - Escribir el proceso en la skill `club-or-year-onboarding` (sección 3a paso 7 y "Cola humana" de la sección 4 dicen "para Guido"):
        mostrarle a Guido el texto antes (regla de skills). Qué contesta el subagente, con qué cita, qué hace con "no sé"
        (`Admin/dudas-por-club.md`), y que Claude revisa contra el documento las correcciones grandes antes de aplicarlas.
      - Contestar así el resto de la cola (`node tools/cola.mjs`: unos 210 casos), de a un club por subagente.
      - AEK 2022-2025: la fila del estado "Αμοιβές ποδοσφαιρικού και λοιπές δαπάνες" mezcla la nómina (Μισθοδοσία) y la amortización de
        contratos de jugadores (Αποσβέσεις συμβολαίων ποδοσφαιριστών, 53-60%, nota 6.19; la política contable lo dice en
        AEK_Notes_2018-06-30.md L843). Como `wages_squad` inflaría los salarios: cargar las dos filas de la nota en vez de la del estado,
        como en 2016-2021 (ajuste manual `desglose` o un escalón de extraer.mjs que abra esa fila en su nota). 5 casos en la cola.
      - AEK 2021: "Estadio en 0" pide `--reintentar` (lista solo con AEK_Notes_IFRS_2021-06-30.pdf). Caja y deuda de AEK:
        `node tools/caja-deuda.mjs --club aekathens-gr --ejecutar --escribir` (~US$ 0,15).
      - Dudas opcionales del subagente para el club (no frenan): qué activos cubre "Μισθώματα" (¿el estadio?) y qué explica el salto de
        "Αμοιβές τρίτων" de 1,8 M (2018) a 6,8 M (2019).

223. COLUMNA DE NOTAS EN CAJA-DEUDA COMO ESCALERA, NO COMO REGLAS (pedido de Guido, 2026-10-13: "estás haciendo reglas que deberían ser
    escalones"). Hoy (`c08cc9f`, to-do 221) `filasDelMd` saca la celda de una columna de notas de varios niveles ("6.8") si la columna es la
    primera numérica, sin comas, con punto y en orden creciente: condiciones apiladas para evitar falsos positivos. Funciona (medido: 921
    filas pierden solo la nota, `--medir` idéntico; AEK 2017 caja 1.785.822,70) pero no reconoce AEK 2019 (repite "6.9" e imprime "6.13"
    antes que "6.12", con encabezado "σημ.") y para arreglarlo se seguían agregando condiciones (encabezado O orden, "-" no cuenta, ningún
    nivel en 0 porque Envigado 2016 tiene la columna "DICIEMBRE 2015" toda en "0.00"): descartado sin commitear. Diseño a proponer: DOS
    LECTURAS de cada fila (A: como antes; B: sin la celda que cae en una columna con forma de nota) y que decida la compuerta del dato (año
    anterior / documento siguiente / plausibilidad), la misma para las dos. Problema a resolver primero: en AEK 2016 la compuerta aceptó la
    lectura A ("6.8") porque el documento siguiente tiene la misma columna; mirar 2-3 casos y ver qué compuerta, igual para todos, rechaza A
    (por ejemplo, que la columna "año anterior" de la fila coincida con lo leído en el documento anterior). Medir con `filasDelMd` sobre
    todos los .md antes y después (script del scratchpad: cifras de cada fila) y `caja-deuda.mjs --medir`. Después correr AEK
    (`--ejecutar --escribir`; la IA ya está en caché).

224. LAS CORRIDAS SE ESTÁN VOLVIENDO LENTAS (pedido de Guido, 2026-10-13). MEDIDO: no hace falta una base de datos; el tiempo está en tres
    puntos. HECHO (2): `cola.mjs` y `ajustes.mjs` leen su registro una vez por proceso (verificar --lista 237 documentos 36 s -> 3 s;
    propuesta de carga de 129 documentos 206 s -> 94 s; idéntico). FALTA, de a uno, cada uno chico y commiteado antes del siguiente:
      (1) `caja-deuda.mjs`, `filasDelMd`: la expresión de los renglones de texto ("Caja   1.234 5.678", `const mm = t.match(...)`) tiene
          cuantificadores que se pisan (el espacio está en la clase y en el `\s+` de la repetición) y prueba millones de cortes por línea:
          140 de los 146 s de `caja-deuda --medir`. Saltear las líneas que no terminan en cifra/punto/coma/paréntesis da idéntico (1.155.123
          líneas, 0 distintas) pero solo ahorra 23%: hay que reescribir la expresión sin ambigüedad. Medir con una MUESTRA de .md (no los 2.800:
          tarda 5 minutos) y después confirmar con `--medir`.
      (3) `vocabulario.mjs`, `compilar()`: compilar las ~1.600 alternativas cuesta ~200 ms por proceso (cargar-lote lanza uno por documento).
          Agrupar bajo un solo límite de palabra los términos CONSECUTIVOS con los mismos límites (mismo orden, misma prioridad) baja la
          importación de 277 a 133 ms; falta probar equivalencia (cada expresión exportada, vieja contra nueva, sobre una muestra de etiquetas
          y líneas) y ojo con términos objeto `{re}` con un `|` suelto adentro.