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
    a) GRECIA: cargados Asteras 2019-2025, Levadiakos 2019-2025, OFI 2018-2025, AEK 2016-2023 y 2025, Panserraikos 2023 y 2025 (2024 no
       tiene estado de resultados), Volos 2019-2025. Falta AEK 2024 (lote con la etapa 7 para las filas nuevas de sus notas:
       `Admin/lotes/lote-73.txt`). Lote 71 armado y sin correr (Olympiacos, Athens Kallithea, Aris, Atromitos, Kifisia, Panetolikos, PAOK;
       primero `pipeline.mjs --dir "Clubes/Grecia" --ejecutar`, ~US$ 5,67). Aris: el perímetro lo decide el lote solo (A2 + la regla de la serie: 2019 y 2021 individuales, 2022-2025 consolidados).
       Conocido, sin tocar (histórico): Panathinaikos 2025 tiene "Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου" como competition_bonus;
       en AEK 2023 y 2025 va como other_income.
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



219. REVISAR LOS NIVELES P0/P1/P2/P3 DE `tools/audit.js` (pedido de Guido). Dos preguntas: (a) ¿hay chequeos que faltan en P0/P1, cosas que
    hoy un lote puede cargar mal sin que la auditoría lo frene? (`cargar.mjs` y `cargar-lote.mjs` solo revierten con P0/P1, así que lo que
    vive en P2 nunca frena una carga); (b) ¿está bien el nivel de cada chequeo de hoy? Hoy el P2 mezcla avisos que pueden tapar un dato mal
    cargado (`signo-invertido`, `salto-interanual`, `sin-salarios`, `outlier-liga`) con otros que son estructurales y esperables
    (`gestion-club-inexistente`: gestiones de clubes que todavía no tienen balance, más candidato a P3; `catchall-dominante`). Empezar por
    revisar los casos de los cuatro primeros contra la fuente: si alguno es un error real, ese chequeo pide subir de nivel o un escalón en
    la carga. `node tools/audit.js` da el detalle de cada uno.


226. AJUSTES DE PERÍMETRO QUE NO COINCIDEN CON EL DOCUMENTO (visto al medir el paso A2 de `perimetro-senales.mjs`). Ninguno cambia un
    número publicado; corregirlos con un ajuste `perimetro` del documento (`node tools/ajustes.mjs --agregar "<pdf>" perimetro --valor ...`)
    y, si el año está cargado, la línea "Perímetro" de su `Admin/carga-clubes/<clubId>.md`:
    - Trabzonspor: el ajuste del club dice consolidado (se fijó mirando el documento de 2021), pero 2016 a 2020 son individuales
      ("finansal tablolar", sin "konsolide"). El prospecto de 2025 (`trabzonspor-sportif-izahname-2025`) no es un estado del ejercicio:
      ver si va a `Admin/registros/documentos-descartados.txt`. El club no está cargado.
    - AS Roma 2006 y Bologna 2024 y 2025: documentos individuales ("bilancio d'esercizio", ningún título consolidado) cargados con
      "Perímetro: consolidado", heredado del ajuste del club. Cada documento trae un solo estado, así que los números son los mismos.
    Antes de cerrarlo, correr `node tools/perimetro-senales.mjs --lista <documentos del club> --jev` y comparar con los ajustes: si aparecen
    otros, van acá.

227. AUDITORÍA A POSTERIORI DEL PASO A2 DEL PERÍMETRO (pedido de Guido: por si la idea sale mal). A2 decide el perímetro de documentos en
    idiomas que el paso A no reconoce, con cinco criterios con peso (título 4, texto 4, auditor 1, grupo 1, portada 1; 4 puntos o más =
    consolidado). Se midió en una muestra de 75 documentos; lo que decida en clubes nuevos no lo revisa nadie. Armar el chequeo: un
    subagente toma los documentos que pasaron por A2 (`Generados/_cache/claude-perimetro.jsonl`) y cuyo ajuste firmó `perimetro-senales`,
    los abre y dice si el estado cargado es del grupo o de la sociedad sola, con cita; un error sube el umbral, cambia un peso o agrega un
    criterio, y se mide otra vez con `Admin/mediciones/perimetro-a2-medicion.txt`. Que entre en la skill `auditoria-finance-of-sports` (eje
    `datos`, cada tanto) cuando Guido apruebe el texto; mientras, se corre a mano después de cada país nuevo.

228. DEUDA SIN SU PARTE CORRIENTE CUANDO EL BALANCE LA ESCONDE EN OTRO RENGLÓN (visto en AEK 2021 y 2022, corregido con ajustes `deuda`).
    El balance trae "Μακροπρόθεσμες Δανειακές Υποχρεώσεις" (préstamos a más de un año) y la parte a menos de un año va dentro de
    "Μακροπρόθεσμες Υποχρεώσεις πληρωτέες στην Επόμενη Χρήση", mezclada con lo que se debe a jugadores; la nota de préstamos (6.15 / 6.16)
    sí abre las dos. `caja-deuda.mjs` (la IA) eligió solo la fila de largo plazo y la compuerta lo aceptó, porque esa fila es coherente año
    contra año: 5.029.327 en vez de 6.038.235 (2021) y 1.084.606 en vez de 5.190.328 (2022). Pensar un escalón que lea la nota de préstamos
    cuando el balance no separa la parte corriente (y una compuerta que lo note: el total de la nota contra la fila del balance). Mirar antes
    los otros clubes griegos (Olympiacos, PAOK, Panathinaikos) y `caja-deuda.mjs --medir` para ver cuántos casos hay.
