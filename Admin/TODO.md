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
1. 359 (Onboarding): Emmen (pregunta al club) y las urls danesas que quedan, si se quieren
2. 358 (Onboarding): correr la segunda fuente en las 10 ligas que quedan (el script ya está arreglado)
3. 355: Lierse son dos clubes (BCE distintos, Auditora 5); falta que cada ficha diga de quién es sucesora y los 3 alias de liga (Onboarding)
4. 347 (Auditora): corridas de P2 y P3 (hechas nueve códigos); faltan los fixes aprobados, que codea Pipeline
5. 352 (Auditora): el iXBRL ya frena en el individual; falta medir el consolidado
6. 351 (Onboarding, después del 345): sueldos de 22 clubes británicos y de Instituto 2025, hoy adentro de una sola línea
7. 350 (Auditora, al final de A): la tabla de cuántas veces queda en 0 cada fila del Formato simplificado; recién con eso Guido decide subsidios y donaciones y el proceso de revisión
8. 257 (Orden 1): los dos cabos sueltos que quedan (perfil-en-cola, Tolima)
9. 356 (Onboarding carga los británicos en iXBRL; Pipeline arregla el conversor XHTML y los defectos de script)
10. 362 (Pipeline, con la Auditora): el freno de documentos de grupo
11. 363 (Pipeline): lo aprobado de Pipeline 15 que no se aplicó, y dos preguntas para Guido

**D. Orden de la casa**
12. 338: correr todas las auditorías del proyecto (al final de A)
13. 258: índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)
14. 364 (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

**E. Después de A a D (Guido, 2026-10-20)**
15. 337: las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)
16. 313: contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)
17. 335: mails a clubes
18. 249: API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)
19. 357: mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

357. MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
   dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
   muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
   fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
   JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).
358. SEGUNDA FUENTE DE LAS LIGAS (regla «la liga de un año necesita dos fuentes», CONVENCIONES-DATOS). `tools/segunda-fuente-liga.mjs` lee
   RSSSF y guarda la fuente en la caché de `tools/club-league-reference/`; `liga-una-fuente` (P3) marca hoy 10 ligas (bajó de 17: hay 26
   liga-temporadas con segunda fuente y `liga-fuentes-no-coinciden` da 0). El script ya está arreglado (la sección por su nombre, UTF-16,
   filas con un espacio): 19 de las 21 liga-temporadas frenadas pasan. Terminado cuando: las 10 ligas de `node tools/audit.js` con
   `liga-una-fuente` tienen su segunda fuente o una línea en HALLAZGOS que diga por qué no hay, y `liga-fuentes-no-coinciden` sigue en 0 o
   cada caso votado (skill de auditoría, sección 9). Falta correr `segunda-fuente-liga.mjs` con las URLs ya cacheadas en
   `Generados/fuentes-liga/` (be-challengerproleague 2018-24, pt-ligaportugal2 2022-25, gr-superleague 2021, gr-superleague2 2018,
   gb-championship 2022, nl-eerstedivisie 2025, ru-premierliga 2022-23, ch-superleague 2011-12, ar-primera 2025). pt-liga3 2023 y
   gr-superleague2 2025 (dos grupos: la primera tabla trae la mitad) frenan bien: HALLAZGOS o que Pipeline lea los grupos. Lo hace Onboarding.

249. API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
   api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
   SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
   (`Admin/fuentes-externas.md`, "Consecuencias").
257. LO QUE QUEDÓ SIN DUEÑO DEL RELEVAMIENTO DE SKILLS (une el 330). Aplicado: las cinco skills nuevas, las partes 1, 3 y 7 de
   `Admin/propuestas/257-skills.md`, la memoria vaciada y el candado de skills del hook. Falta: (a) que `perfil-en-cola` de `cargar.mjs`
   nunca frene (Pipeline); (b) la duda de Deportes Tolima, `dudas-por-club.md:201`, que frena su carga. Los descartes 314 y 298 en
   `Admin/HALLAZGOS-pipeline.md` y el párrafo de Chrome headless ya se hicieron (Versión 931).
359. CIERRE DE LOS AÑOS DEL 345 (sale del 345, cerrado: Onboarding 8, US$13,9). Hechos (Onboarding 9): las líneas del auditor de Omonia
   2024, Fiorentina 2020, Atalanta 2022, Genoa 2024 y Girona 2021-23; Chapecoense 2019 y Goiás 2018 revisados (el «24 de abril de 2018» era
   una errata); la url del depósito en las fuentes danesas del XHTML. Terminado cuando: (c) Emmen 2019-20 y 2020-21: el PDF F.04 no trae
   el informe del auditor y la jaarrekening completa solo está en la KvK (de pago; Guido decidió no comprarla), así que se le pide al club
   (pregunta en `Admin/dudas-por-club.md`, «FC Emmen»); mientras no conteste, las líneas `falta_transcripcion` quedan; y (d) las 15 fuentes
   danesas que no son XHTML del depósito y siguen sin url (AGF 2020-21, Brøndby 2020, København 2024, Fredericia 2019 y 2020, Midtjylland 2019
   y 2020, Nordsjælland 2024, Randers 2022-23, Silkeborg 2024 y 2025, SønderjyskE 2022, Vejle 2024, Viborg 2024 y 2025) llevan su url
   (`fuente.mjs --url`, mismo método por CVR) o se decide que no hace falta. Lo hace Sourcing.
347. P2 Y P3 SIN PROCESO (Guido, 2026-10-21: «armemos algo para los P2 y P3»). Propuesta en `Admin/propuestas/p2-p3-y-roles.md`: cada auditoría
   baja un código (muestra de cinco, decisión por el código entero, registro antes y después). Ya está en la skill de auditoría. Hechas doce
   corridas (`linea-duplicada`, `catchall-dominante`, `sin-salarios`, `signo-invertido` x2, `outlier-liga`, `gestion-club-inexistente`,
   `ejercicio-sin-rastro`, `salto-interanual`, `escala-implausible`, `registro-sin-lector`); hoy `node tools/audit.js` da P2 86 y P3 192.
   Falta: (a) que Pipeline codee los fixes aprobados por la Auditora (`outlier-liga`: año vecino y P3; `escala-implausible`: sacar la rama
   P3; `signo-invertido`: no emitir si el ejercicio cierra contra el total oficial; `salto-interanual`: consecutivos y `cambio-de-formato`;
   `gestion-club-inexistente`: una línea P3 por país), midiendo el antes y después de cada línea de `Admin/registros/auditoria-proceso.jsonl`;
   (b) la próxima corrida, de un código libre (no `registro-sin-lector` en las tres siguientes; quedan `historia-en-doc-de-criterio` 3 y
   `ruta-muerta` 2, de Orden). Los que esperan a otro: `catchall-dominante` (350), `sin-salarios` y `liga-una-fuente` (Onboarding).
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
   `Admin/registros/auditoria-proceso.jsonl`): pasa a freno solo para el perímetro individual (codeado: `cargar.mjs`, freno `ixbrl-resultado`);
   el consolidado sigue como aviso. Terminado cuando: se midieron dos años consolidados de clubes distintos, uno con minoritarios, y la
   Auditora decide si el consolidado también frena o se queda en aviso.
356. CARGAR LOS BRITÁNICOS EN iXBRL (Guido, 2026-10-21: «carguemos iXBRL»). Sourcing buscó en Companies House los clubes que no tenemos y
   presentan en iXBRL y bajó los 198 `.xhtml` (84 MB, los 68 con PDF oficial al lado renombrados a `-ixbrl`); Onboarding los carga con
   `tools/xhtml-aarsrapport.mjs` (sin transcribir). Presupuesto: US$ 35 (Guido), con ensayo gratis antes; gastados ~US$ 1,9. Medido: el
   escalón de etiquetas ahorraría solo el 25 % (no se codea; EN PAUSA con la condición de la Auditora: si el estado de resultados es menos
   del 40 % del gasto, no se codea; backtest 22 de 67, 33 %); `lote.mjs` frena la IA sobre estos documentos salvo `--pagar-ia-xhtml`. Hechos
   (Onboarding 9, lotes 140 y 141): 10 altas, AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham,
   Lincoln City y Shrewsbury Town 2025 y Wigan Athletic 2024. Fleetwood/Jaymel 2022-25 descartado. Terminado cuando: cada club británico con
   iXBRL que presenta y el sitio no tiene está cargado o descartado con motivo. Falta:
   - Pipeline, el conversor: `xhtml-aarsrapport.mjs` rearma las filas por posición cuando el XHTML está maquetado con div o span (12 clubes
     cuyo `-ixbrl.md` no tiene tablas: Hibernian, Bolton, Bristol Rovers, Cambridge 2024-25, Crewe, Northampton, Oxford, Peterborough,
     Plymouth, Rotherham, Salford y Tranmere; Blackpool y Reading igual; 17 años esperan), y `lote.mjs` frena en el ensayo un `-ixbrl.md`
     sin tablas. Sección 8 de la skill de auditoría: medir antes y después sobre los 249 XHTML.
   - Pipeline, defectos de script (`Admin/registros/frenados-por-script.jsonl`): Morecambe (el importe «(n )» con espacio se lee en
     unidades); Ross County 2025 (el aviso «registro no se actualizó, correr el lote» no cambia al correrlo); `perimetro-senales.mjs` votó
     «individual» en group accounts con s408 (Salford, Falkirk, Exeter; corregidos a mano).
   - Falkirk 2025: listo salvo la liga. Scottish Championship no existe en `data/leagues.js`: crearla (`club-sourcing` 0.4) y cargar con su
     publicNote y el EJEMPLO-CATEGORÍA de la regla del goodwill negativo (`reglas-categoria.mjs --escribir`; CONVENCIONES-DATOS).
   - Los otros años pagables (~US$ 8): Ross County 2022-24, Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 (su alta
     puede entrar por 2023-24), Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24 y Wigan
     2022-23: lote siguiente, con las respuestas de este como precedente.
   - De las 10 altas: las líneas del auditor (`node tools/auditoria.mjs --pendientes`), los escudos sin mirar (`escudoOk` null) y las
     gestiones (presidentes, en la cola; no frenan).
   - Criterio a escribir en CONVENCIONES-DATOS: la cuota que cobra el Trust dueño (Wimbledon, Exeter) no cuenta como cuota de socios (se
     contestó «no»).
   - La nota de sourcing de Fleetwood dice «Ejercicios útiles: Jaymel 2015/16-2023/24», y es falso (fútbol 42 % en 2021-22); lo único útil
     es Fleetwood Wanderers 2020-21.
   - Daneses que esperan: los XHTML de SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025 (−130,578 M) y el PSE de København 2021-25, y los 9
     de 2025-26 cuyo PDF de Chrome sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg; nota de Pipeline 14).
355. LIERSE CON DOS IDS (Auditora 5, 2026-10-21). `liersekempenzonen-be` (2018-21) y `liersesk-be` (2022-25), mismas ligas: parece el mismo
   club con otro nombre. Unirlos cambia un id público (contrato de datos): lo decide Guido. Antes, confirmar con los documentos que no sea el
   Lierse SK que quebró en 2018.
351. SUELDOS ADENTRO DE UNA SOLA LÍNEA (Auditora 4, 3ª corrida de P2 y P3, 2026-10-21). 12 británicos (Aston Villa, Brentford, Brighton,
   Celtic, Fulham, Leeds, Liverpool, Newcastle, Nottingham Forest, Sunderland, West Ham, Wolves; 47 club-años con el estado por función),
   los 10 británicos nuevos del 356 (sus sueldos entraron con `incluye wages_squad --posible` en `other_expenses`; se parten con
   `caja-deuda --personal`) e Instituto 2025 (anexo de remuneraciones cargado entero en gastos generales). Cómo:
   `Admin/Archive/sesion-ligas-2026-10-21.md`, tercera corrida. Corrige datos publicados: trailer `Corrige:`.
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
362. FRENO DE DOCUMENTOS DE GRUPO (sale del 356, Fleetwood/Jaymel; regla votada 3 a 0 en CONVENCIONES-DATOS, «Un consolidado de grupo con
   negocios ajenos al club», umbral del 10 % sobre lo impreso). Terminado cuando: `perimetro-senales.mjs` o `cargar.mjs` frenan un documento de
   grupo si el turnover por clase de negocio deja el deporte del club por debajo del 90 %, o si el ejercicio trae la venta o compra de la
   sociedad del club; medido, frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo. Antes de codear, pasa por la sección 7 de la
   skill de auditoría (la Auditora). Lo hace Pipeline.
363. LO APROBADO DE PIPELINE 15 QUE NO SE APLICÓ, Y DOS PREGUNTAS A GUIDO (Auditora 5 y 6, `Admin/registros/auditoria-proceso.jsonl`; el detalle
   en `Admin/Archive/sesion-pipeline-2026-10-21.md`, «Pipeline 15»). Terminado cuando: (a) barrido de lecturas recortadas: `jevDe` de
   `caja-deuda.mjs` con todas las filas (aprobado con un cambio: antes de commitear, volver a pedirle a Jev los 162 documentos que cortan en 120
   filas, y los años cuya caja o deuda cambia van como corrección con cita y trailer `Corrige:`, o se revierte); los encabezados de balance de
   la página entera (`--medir` dio idéntico en 779 años); y `nombreLegal` de `alta-club.mjs` y las señales de intermedio de
   `perimetro-senales.mjs` como ventana de portada declarada en el código, con la medición (63 de 356 y 394 falsos intermedios) y la frase en la
   regla de PIPELINE.md «salvo una ventana de portada declarada en el código, con la medición de leer entero»; (b) `falta_documento` en
   `auditoria.mjs` (parche `p15-falta-documento.patch` en la carpeta de notas compartidas de la principal; aprobado con dos cambios: las
   marcas «--- pág. N ---» de 1 a N sin saltos, y las 13 sin `.md` propio citan el `.md` fuente del año), con la migración de las 58 por un
   subagente Sonnet y el lote entero pasando `--check` antes del commit (medido: 45 con el `.md` completo, 0 con páginas sin transcribir); (c)
   se saca `cabecera` de `perimetroHeredado` (`cargar.mjs:215-220`), que se calcula y no la lee nadie; (d) la skill `auditoria-finance-of-sports`
   (eje datos) y la de la cola dicen «antes de reportar algo raro de un documento, `node tools/rarezas.mjs --md <ruta>`» (texto para el ok de
   Guido); (e) Guido contesta si el tramo corto sin hueco va como C o B (el código ya entró: parece contestado, confirmar) y si la nota de
   COVID se agrega a los 190 club-años ya cargados dentro de la ventana. Lo hace Pipeline (a, b, c) y la principal (d).
364. EL REGISTRO DE CORRECCIONES, CURADO (Pantallas 7, sale del 247). `correcciones.html` y el bloque de Finanzas muestran hoy 236 eventos en 56
   clubes, y todos dicen «Motivo no registrado». Terminado cuando: (a) los eventos de más impacto (valor, retiros, recargas) tienen su motivo en
   español en `Admin/registros/correcciones.jsonl` (`{"commit","club","anio","motivo_es","motivo_en","fuente"}`; con subagentes que lean el
   cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`; el motivo es público: se escribe para un hincha o un periodista); (b) decidido si
   el motivo se traduce al inglés al curar (sin `motivo_en` la página en inglés muestra el español); (c) `tools/exportar-paquete.mjs` suma el
   registro al Data Package (pasa por la skill `contrato-de-datos`); (d) revisado que los tipos «total» y «otro» de los eventos no tengan ruido
   de renombres. Lo hace Pantallas.
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
   Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
   Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
   con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
   faltan (Pipeline).
338. CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
   (`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
   `generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
