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
1. 345 (Onboarding 8): la cola del lote 130, Girona 2021-23, RAAL, SønderjyskE 2023, los daneses, Hvidovre, København individual, Goiás 2018-20, Novorizontino 2012 y Fiorentina 2020; la liga de Burnley, Girona y Fredericia (hasta US$12 en total)
2. 353 (Pipeline 13): el aviso del resultado en cuentas de grupo británicas y que `faltantes` no frene por la fecha ni por PDFs sin enlazar (esperan a la Auditora); ¿cargar los británicos chicos en iXBRL? (decisión tuya)
3. 355: Lierse son dos clubes (BCE distintos, Auditora 5); falta que cada ficha diga de quién es sucesora y los 3 alias de liga (Onboarding 8)
3b. 350: propuesta de proceso para revisar categorías en `Admin/propuestas/350-revision-categorias.md` (falta mostrarte el texto)
4. 347 (Auditora 5): corridas de P2 y P3 (ya: `linea-duplicada`, `catchall-dominante`, `sin-salarios`, `signo-invertido`, `outlier-liga`, `gestion-club-inexistente`, `ejercicio-sin-rastro`, `salto-interanual`, `escala-implausible`)
5. 352 (Auditora 5, con lo que cargue Onboarding 8): decidir si el chequeo del iXBRL pasa de aviso a frenar
6. 351 (Onboarding 8, después del 345): sueldos de 12 clubes británicos y de Instituto 2025, hoy adentro de una sola línea
7. 350 (Auditora 5, después de las corridas): relevar qué categorías están en vano (educación incluida), votar una para subsidios y donaciones, y un proceso para revisar categorías
8. 257 (Orden 1): la parte 7, qué pasa de CONVENCIONES a skills (falta mostrarte el texto)
9. 356 (Sourcing 4, después Onboarding): clubes británicos chicos y medianos que presentan en iXBRL, cargados sin transcribir

**D. Orden de la casa**
9. 338: correr todas las auditorías del proyecto (al final de A)
10. 258: índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

**E. Después de A a D (Guido, 2026-10-20)**
11. 337: las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)
12. 313: contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)
13. 335: mails a clubes
14. 249: API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

249. API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
   api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
   SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
   (`Admin/fuentes-externas.md`, "Consecuencias").
257. SKILLS QUE FALTAN Y DÓNDE SE PIERDE LO QUE SE DECIDE (une el 330; pedido de Guido 2026-10-16 y 2026-10-20). Propuestas de Orden 1, sin
   aplicar: `Admin/propuestas/257-skills.md` (destino de cada memoria, texto de cinco skills nuevas, cambios a las existentes, candado de
   skills) y `Admin/propuestas/330-donde-se-pierde.md` (seis tipos de pérdida con archivo y línea). Aplicadas con el ok de Guido las cinco skills nuevas
   (deploy, producto y pantalla, contenido, contrato de datos, principal). Falta: los cambios a skills existentes (parte 3) con su ok;
   llevar cada memoria a su lugar (parte 1); qué de CONVENCIONES pasa a skill (parte 7); la Auditora, para los chequeos; y lo que encontró sin dueño (que `perfil-en-cola` de `cargar.mjs` nunca frene; la duda de Deportes
   Tolima, `dudas-por-club.md:201`, que frena su carga; HALLAZGOS de los descartes 314 y 298). Lo pedido originalmente: Producto/pantalla (mockup, ok, implementación, chequeo en celular; hoy mezclado en PANTALLA.md); contenido y
   difusión (un año cargado → hilo o post con el dato verificado y el link a la fuente); contrato de datos/API (esquema público y qué lo
   rompe); deploy/release (qué chequear antes de pushear y cómo verificar producción).
   Además (Guido, 2026-10-20): lo que hoy se maneja con la memoria de la sesión principal (`~/.claude/projects/…/memory/`) pasa a una
   skill, a una convención o a un chequeo; la memoria no es el lugar de una regla de trabajo. Repasar cada memoria y decidir a dónde va.
   Y algo que cuide que un cambio de skill no se aplique sin que Guido haya visto el texto exacto (pasó tres veces el 2026-10-20: el texto
   quedaba detrás del cuadro de pregunta). Por ejemplo, que el hook de skills exija el texto propuesto en un archivo de `Admin/` ya commiteado.
345. DOCUMENTOS EN MANO SIN CARGAR (Pruebas 1, 2026-10-21, revisando `ejercicio-sin-rastro`). Lista con rutas en `Admin/sesiones/pipeline.md`,
   «Revisión de la cola del chequeo»: Chapecoense 2019, FC Emmen 2020-21, FC Fredericia 2021-25, los 2025 daneses en XHTML (ESEF), SønderjyskE
   2023-24, Fredrikstad 2019-23, Sarpsborg 08 2009-11, Vålerenga 2024, Genoa 2024, Girona 2021-23, Lierse Kempenzonen 2022, RAAL 2020, Omonia 29is
   Maiou 2024. Es un lote de onboarding: necesita presupuesto de Guido. El XHTML danés no lo lee el pipeline hoy.
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
   `tools/ixbrl-resultado.mjs`, que avisa si el resultado cargado no coincide con el etiquetado. Falta: con 10 años de varios clubes daneses
   cargados por Onboarding 8 sin falsos avisos, la Auditora decide si pasa de aviso a frenar.
356. CARGAR LOS BRITÁNICOS EN iXBRL (Guido, 2026-10-21: «carguemos iXBRL»). Sourcing busca en Companies House los clubes que no tenemos y
   presentan en iXBRL (Plymouth, Bolton, Lincoln, Oxford, Peterborough, Hibernian y el resto de League One, League Two y Escocia) y baja los
   últimos 5 años; Onboarding los carga con `tools/xhtml-aarsrapport.mjs` (sin transcribir). Presupuesto: Guido dijo que sí (2026-10-21);
   tope de US$3 para la categorización, con ensayo gratis antes. Relevado (`Admin/sesiones/datos.md`): 54 de 68 sociedades tienen iXBRL en
   los últimos 5 años (22 en los 5). Se bajan las cuentas completas de los últimos 3 cierres (69 archivos, 45,5 MB, dentro del tope de 50 MB);
   el resto (cuentas pequeñas y años anteriores, hasta 84 MB) espera el ok de Guido.
353. LOS BRITÁNICOS EN iXBRL (Guido, 2026-10-21). Medido (`Admin/mediciones/companies-house-ixbrl.md`): los grandes presentan PDF; 9 de 36
   clubes probados vienen en iXBRL (Nottingham Forest, Burnley y Bath Rugby, cargados; Plymouth, Bolton, Lincoln, Oxford, Peterborough e
   Hibernian, no). Probado con Forest, Burnley y Bath: `xhtml-aarsrapport.mjs` ya lee el iXBRL británico sin cambios y el `.md` cierra contra
   los totales. Queda: el aviso del resultado da falso en cuentas de grupo (el consolidado viene con un eje; condición con la Auditora), y
   cargar con este camino los clubes chicos y medianos británicos que están en iXBRL (decisión de alcance: Guido).
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
