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

ORDEN (pedido de Guido, 2026-10-17: seguir este orden). Es la copia durable del panel Plan: al arrancar una sesión, ponerlo en el
panel tal cual (modo plan → ExitPlanMode → show_pane "plan"; editar el archivo del plan no refresca el panel).

Se trabaja de arriba hacia abajo, en el orden numerado (Guido, 2026-10-20): A, B, C y D; E queda para después. Dentro de cada bloque,
el número de la izquierda es el orden de trabajo.

**A. En marcha**
1. 359 (Onboarding 8): líneas del auditor, Chapecoense y Goiás, Emmen, urls danesas
2. 358 (Onboarding 8): segunda fuente de las 17 ligas
2b. Pantallas 7: el 404 de `data/club-leagues.js` y, con tu ok, la guía de UX
3. 355: Lierse son dos clubes (BCE distintos, Auditora 5); falta que cada ficha diga de quién es sucesora y los 3 alias de liga (Onboarding 8)
4. 347 (Auditora 5): corridas de P2 y P3 (ya: `linea-duplicada`, `catchall-dominante`, `sin-salarios`, `signo-invertido`, `outlier-liga`, `gestion-club-inexistente`, `ejercicio-sin-rastro`, `salto-interanual`, `escala-implausible`)
5. 352 (Auditora 5, con lo que cargue Onboarding 8): decidir si el chequeo del iXBRL pasa de aviso a frenar
6. 351 (Onboarding 8, después del 345): sueldos de 12 clubes británicos y de Instituto 2025, hoy adentro de una sola línea
7. 350 (Auditora 5, al final de A): la tabla de cuántas veces queda en 0 cada fila del Formato simplificado; recién con eso Guido decide subsidios y donaciones y el proceso de revisión
8. 257 (Orden 1): los cuatro cabos sueltos (perfil-en-cola, Tolima, HALLAZGOS 314 y 298, el párrafo de Chrome headless)
9. 356 (Onboarding 8 carga 67 británicos en iXBRL, tope US$3; Sourcing 4 baja el resto y los links daneses; Pipeline 13 arregla Plymouth y el freno de no pisar PDFs)

**D. Orden de la casa**
10. 338: correr todas las auditorías del proyecto (al final de A)
11. 258: índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

**E. Después de A a D (Guido, 2026-10-20)**
12. 337: las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)
13. 313: contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)
14. 335: mails a clubes
15. 249: API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)
16. 357: mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

357. MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
   dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
   muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
   fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
   JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).
358. SEGUNDA FUENTE DE LAS LIGAS (regla «la liga de un año necesita dos fuentes», CONVENCIONES-DATOS). `tools/segunda-fuente-liga.mjs` lee
   RSSSF y guarda la fuente en la caché de `tools/club-league-reference/`; `liga-una-fuente` (P3) marca hoy 17 ligas. Terminado cuando:
   las 17 ligas de `node tools/audit.js` con `liga-una-fuente` tienen su segunda fuente o una línea en HALLAZGOS que diga por qué no hay
   (RSSSF sin esa temporada), y `liga-fuentes-no-coinciden` está en 0 o cada caso votado (skill de auditoría, sección 9). Orden: las de más
   clubes primero (pt-primeiraliga 8, gr-superleague 7, be-challengerproleague 6). Un pedido por liga. Lo hace Onboarding.

249. API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
   api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
   SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
   (`Admin/fuentes-externas.md`, "Consecuencias").
257. LO QUE QUEDÓ SIN DUEÑO DEL RELEVAMIENTO DE SKILLS (une el 330). Aplicado: las cinco skills nuevas, las partes 1, 3 y 7 de
   `Admin/propuestas/257-skills.md`, la memoria vaciada y el candado de skills del hook. Falta: (a) que `perfil-en-cola` de `cargar.mjs`
   nunca frene (Pipeline); (b) la duda de Deportes Tolima, `dudas-por-club.md:201`, que frena su carga; (c) las líneas de
   `Admin/HALLAZGOS-pipeline.md` de los descartes 314 (Stirling) y 298 x2; (d) el párrafo «Cómo verlo como archivo» (Chrome headless) de
   `Admin/PANTALLA.md` podría ir a `producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md`, con texto para el ok de Guido.
359. CIERRE DE LOS AÑOS DEL 345 (sale del 345, cerrado: Onboarding 8, US$13,9). Terminado cuando: (a) las líneas del auditor de Omonia
   2024, Fiorentina 2020, Atalanta 2022, Genoa 2024 y Girona 2021-23 están cargadas (`node tools/auditoria.mjs --pendientes` da 0 de esos);
   (b) Chapecoense 2019 (salvedades sin leer) y Goiás 2018 (informe fechado «24 de abril de 2018») tienen sus líneas revisadas; (c) Emmen
   2020-21 tiene transcripto su informe del auditor; (d) los 20 años daneses cargados del XHTML llevan la url del depósito (`fuente.mjs --url`,
   las urls están en `Admin/sesiones/datos.md` de Sourcing 4, archivo por archivo). Lo hace Onboarding.
347. P2 Y P3 SIN PROCESO (Guido, 2026-10-21: «armemos algo para los P2 y P3»). Hoy hay ~370 P2 y ~1.000 P3 que nadie revisa (los más:
   `linea-duplicada` 927, `catchall-dominante` 256, `sin-salarios` 48). Propuesta en `Admin/propuestas/p2-p3-y-roles.md`: cada auditoría baja
   un código (muestra de cinco, decisión por el código entero, registro antes y después). Ya está en la skill de auditoría (ok de Guido);
   falta la primera corrida.
258. ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
   clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
   3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
   crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.
298. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por

313. CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
    Ideas a diseñar cuando se retome, una por vez y con el ok de Guido:
    (a) la skill de contenido y difusión (ya es el 257): un año cargado → hilo o post con el dato verificado y el link a la fuente;
    (b) un script que proponga "dato del día" desde lo cargado (el ranking de una liga, el club que más cambió de deuda o de ingresos, un
        club que nunca figuró) y solo con años que pasaron `verifyTieOuts()`, para que cada post salga con cifra chequeada;
    (c) tarjetas de imagen con el mismo estilo del sitio (tamaños de X e Instagram; con Design antes) y, si ayuda, un video corto
        con Higgsfield (321);
    (d) un calendario: qué liga o club se publica cada semana, para no repetir;
    (e) enlaces a `/club/<id>` con tarjeta al compartir (241) y medir qué publicaciones traen visitas. Depende de 241 y 246.
    (f) material de difusión (era el 259): un deck para periodistas y sponsors, o un informe por liga («las finanzas de LaLiga 2025 en
        10 slides»), con el tipo Slides; sin código. Nada de esto sale antes del 337.
352. EL CHEQUEO DEL iXBRL PASA A FRENAR (Guido, 2026-10-21). Hechos: la fuente de un año en XHTML (`fuente-xhtml-sin-url`, nota pública) y
   `tools/ixbrl-resultado.mjs`, que avisa si el resultado cargado no coincide con el etiquetado. Decidido (Auditora 5, en
   `Admin/registros/auditoria-proceso.jsonl`): pasa a freno solo para el perímetro individual; el consolidado sigue como aviso. Falta: que
   Pipeline lo codee con las condiciones del veredicto.
360. LO QUE EL SITIO NO CUMPLE DE LA GUÍA DE UX (Pantallas 7, al escribir `referencia/ux.md`). Terminado cuando: (a) al cambiar de vista el foco
   va al título de la vista nueva y nunca queda en `body`, y el selector de club devuelve el foco al cerrarse; (b) a 375 px, ningún elemento
   tocable de la página de una liga mide menos de 44 × 44 px (`.lg-club` mide 17 px de alto y «← Todas las ligas» 36 px), con el barrido de la
   guía sobre las demás vistas; (c) los países abiertos de la lista de Ligas siguen abiertos al volver con atrás. Lo hace Pantallas.
356. CARGAR LOS BRITÁNICOS EN iXBRL (Guido, 2026-10-21: «carguemos iXBRL»). Sourcing busca en Companies House los clubes que no tenemos y
   presentan en iXBRL (Plymouth, Bolton, Lincoln, Oxford, Peterborough, Hibernian y el resto de League One, League Two y Escocia) y baja los
   últimos 5 años; Onboarding los carga con `tools/xhtml-aarsrapport.mjs` (sin transcribir). Presupuesto: Guido dijo que sí (2026-10-21);
   tope de US$3 para la categorización, con ensayo gratis antes. Relevado (`Admin/sesiones/datos.md`): 54 de 68 sociedades tienen iXBRL en
   los últimos 5 años (22 en los 5). Se bajan las cuentas completas de los últimos 3 cierres (69 archivos, 45,5 MB, dentro del tope de 50 MB);
   el resto (cuentas pequeñas y años anteriores, hasta 84 MB) también se baja: Guido subió el tope (2026-10-21). Bajados los 198. Medido: el
   escalón de etiquetas ahorraría solo el 25 % (no se codea); `lote.mjs` frena la IA sobre estos documentos salvo `--pagar-ia-xhtml`. Para
   cargar hace falta el presupuesto de Guido: el lote 133 (68 documentos) da ~US$17,8. También esperan acá los XHTML daneses que faltan
   (SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025 con −130,578 M, el PSE de København 2021-25) y los 9 daneses 2025-26 cuyo PDF de Chrome
   sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg; nota de Pipeline 14).
355. LIERSE CON DOS IDS (Auditora 5, 2026-10-21). `liersekempenzonen-be` (2018-21) y `liersesk-be` (2022-25), mismas ligas: parece el mismo
   club con otro nombre. Unirlos cambia un id público (contrato de datos): lo decide Guido. Antes, confirmar con los documentos que no sea el
   Lierse SK que quebró en 2018.
351. SUELDOS ADENTRO DE UNA SOLA LÍNEA (Auditora 4, 3ª corrida de P2 y P3, 2026-10-21). 12 británicos (Aston Villa, Brentford, Brighton,
   Celtic, Fulham, Leeds, Liverpool, Newcastle, Nottingham Forest, Sunderland, West Ham, Wolves; 47 club-años con el estado por función) e
   Instituto 2025 (anexo de remuneraciones cargado entero en gastos generales). Cómo: `Admin/sesiones/ligas.md`, tercera corrida. Corrige datos
   publicados: trailer `Corrige:`.
350. CATEGORÍA PARA SUBSIDIOS Y DONACIONES (Auditora 4, 2ª corrida de P2 y P3, 2026-10-21; Guido: «dejalo como to do»). Buena parte de los
   ~130 `catchall-dominante` son subsidios, donaciones y aportes (Subsídios, Επιχορηγήσεις, Целевые взносы; ligas bajas de Grecia, Rusia y
   Portugal) que la taxonomía no tiene dónde poner. Es una votación de criterio (`votacion-de-criterios`); por la regla vigente no recategoriza
   lo ya cargado.
   Además (Guido, 2026-10-21): revisar si la categoría de educación tiene sentido (se abrió por Vélez y parece aplicar a pocos clubes
   argentinos), y antes de votar, un relevamiento exhaustivo de qué categorías y subcategorías de la taxonomía están en vano hoy: cuántos
   clubes y años usan cada una, con qué monto, y cuáles casi nadie usa.
   Y (Guido, 2026-10-21): una skill o un proceso para revisar categorías, «así no es un gut feeling»: cuándo se revisa la taxonomía, con
   qué medición (uso por categoría, monto, deportes y países), qué umbral abre o cierra una categoría y cómo se vota. Texto de skill para el
   ok de Guido.
   Hecho (Auditora 5): medición, votación 3 a 0 por `grants_donations` y texto del proceso en `Admin/propuestas/350-revision-categorias.md`.
   Guido (2026-10-21): todavía no se crea la categoría. Antes, al terminar el resto del bloque A, una tabla con cada fila del Formato
   simplificado y en cuántos club-años de cuántos queda en 0 (por deporte y por país). Ninguna fila se oculta en cero: el formato es
   siempre igual (la propuesta de `hideIfZero` para la fila nueva y para Educación queda descartada).
335. MAILS A CLUBES (une el 51, el 282 y el 326, Guido 2026-10-20). Todo lo que implique escribirle a un club vive acá. Nadie manda ni redacta
   un mail sin que Guido lo pida en sus palabras.
   (a) Proceso: Etapa 1 lista y probada de punta a punta (Resend, `outreach.financeofsports.com`, cola en `Admin/outreach/`, envío desde
   la terminal de Guido con `tools/outreach-send.js`); el flujo, en la skill `club-outreach`. Etapa 2 (disparo automático: 3 preguntas
   acumuladas o 90 días; follow-up y cooldown) documentada, no prendida. Cuándo amerita un mail: `club-sourcing`, sección 0.3.
   (b) Check-in a los 30 días, el 2026-10-24: `Admin/outreach/checkin-2026-10-24.md` (hay una tarea programada que lo pregunta).
   (c) Informes del auditor que faltan: 56 que no están en ningún PDF nuestro (`node tools/auditoria.mjs --pendientes`, "FALTA EN EL
   PDF"), casi todos sin canal público; entre ellos Go Ahead Eagles 2025. Roma 2022 queda así por decisión de Guido (no hay informe del
   consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025 cambian de informe (los dos están bajados).
   (d) Las preguntas a cada club: `Admin/dudas-por-club.md`.
337. ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
   Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
   (clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
   se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
   Medido (Onboarding 7, 2026-10-20; detalle en `Admin/sesiones/onboarding.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
   Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
   con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
   faltan (Pipeline).
338. CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
   (`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
   `generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
