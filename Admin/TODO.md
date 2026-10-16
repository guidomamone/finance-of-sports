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

ORDEN (pedido de Guido, 2026-10-15), en este orden y sin saltear:
1. Mejoras de script: 237 (primero aa, ab y e, que frenan años de Portugal: 165 b0; la q ya está) y los cambios sin commitear de 165 b2
   (`lote.mjs`, `fetch-club-league-reference.mjs`), medidos antes de commitear.
2. 238 (llevar a 0 los estados intermedios), que incluye lo transcripto por subagentes (165 b1: Estonia, Bélgica, Suiza, Beşiktaş,
   Países Bajos y Colombia; falta limpiar lo que lista el (5), validarlos con pipeline.mjs --lista y cargarlos).
3. Mejoras de proyecto: Guido tiene ideas, todavía sin contar; preguntarle cuando se llegue acá.
Después: el resto de las altas de países nuevos (165 c) y las gestiones (195); al final el ahorro de API (232, 233, 230) y lo que
espera una decisión de Guido (130, 183, 51). El panel Plan lleva además una lista "Otros to-dos abiertos" (número: descripción breve)
con los que no están en los pasos de arriba.

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-10). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/registros/altas-revision.jsonl: nombre, color, perímetro, cierres y ligas).
    HECHO: Brasil completo (lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs, 16 clubes). Etapa 2 (transcribir) de los 14 países
    del (c) hecha: lote 66 (468 documentos). Nombres legales de las altas: 24 contestados con cita (ajustes `name`). Gestiones de los clubes
    nuevos de Grecia, Rep. Checa, Portugal, Noruega, Países Bajos y Turquía cargadas (to-do 195).
    FALTA, en este orden:
    a) GRECIA: HECHA (lotes 66-75, cerrada el 2026-10-14). En el sitio: Olympiacos y AEK 2016-2025, PAOK 2017 y 2019-2025, Atromitos 2016 y
       2019-2025, Panetolikos 2017-2018 y 2020-2025, Aris 2019 y 2021-2025, Kifisia 2023-2025, Asteras, Levadiakos y Volos 2019-2025, OFI
       2018-2025, Panserraikos 2023 y 2025, AEL y Panathinaikos. Sin documento: Athens Kallithea (el PDF era del municipio), PAOK 2018,
       Atromitos 2017-2018, Panetolikos 2019, Aris 2020 (fichas de `Admin/sourcing/Grecia/`). Kifisia 2022 es parcial. Caja y deuda: 50 de 86
       datos de los clubes del lote 71 al cerrar Grecia; después, con las columnas por perímetro y Jev en caja-deuda.mjs, se sumaron
       Olympiacos (caja 2016-2025), AEK 2025 (caja), PAOK 2021 y Panetolikos 2022 (deuda). Conocido, sin tocar (histórico): Panathinaikos 2025 tiene
       "Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου" como competition_bonus; en AEK 2023 y 2025 va como other_income.
    b0) PORTUGAL, CARGADO SALVO LO QUE ESPERA SCRIPTS (al 2026-10-16). Qué hay en el sitio: Admin/ESTADO-clubes.md (lotes 76 y 79-83;
       los 32 clubes con documento tienen al menos un año). Falta solo lo que espera una mejora de script:
       - Benfica 2014-15 (237 q, en HALLAZGOS).
       - Sporting 2001 (relatorio-contas-2000.pdf, miles de escudos): ajustes anio, cierre, moneda y fx puestos y la verificación cierra con
         la paridad PTE (lote 88).
       - Gil Vicente: 2024 se cargó (o se carga) con el consolidado de la Associação (único documento del año) y el resto con la SDUQ.
       Reglas que salieron de Portugal (en CONVENCIONES-DATOS o en las respuestas de la cola): qué entidad se carga cuando el fútbol está
       en una SAD; "Outros" toma la categoría del bloque; cuadros de inventario y de bruto a neto afuera; palcos y cativos a stadium_other;
       ejercicio de 11 meses por cambio de cierre se carga.
    b1) ESTONIA Y BÉLGICA POR SUBAGENTES (decisión de Guido, 2026-10-15: usar el límite semanal de la suscripción en vez de API para
       transcribir países 100% digitales). Estonia: los 66 .md hechos (commit "Estonia: 66 transcripciones"). Falta: (1) correr
       `pipeline.mjs --lista` sobre los PDFs de Estonia (solo hace la validación gratis, ya tienen .md) y después el lote; (2) Bélgica: los
       61 .md hechos y commiteados; falta lo mismo que Estonia (`pipeline.mjs --lista` y el lote). (3) Suiza: 36 .md hechos y
       commiteados (St. Gallen 2018-19 a 2024-25, FC St. Gallen AG y Event AG 2024-25, FC Aarau 2025, FC Thun 2021 y 2025, Luzern
       2017-18 a 2019-20 y 2021-22 a 2024-25, Grasshopper 2022-23); Basel también hecho (16 del FC Basel 2006-2021 con Verein y AG; Tourismus 2023 y
       Theater 2022-23 descartados); falta Young Boys y la validación con el pipeline. Basel: se carga la AG (el fútbol), no el Verein. Luzern 2022-23 y FC Thun 2021 traen los estados como imagen: los validará la segunda voz. Grasshopper 2022-23 es un anuario
       sin estados financieros (proponer a descartados). (4) Turquía, Beşiktaş: 14 .md hechos (2006-2008, 2010-2013, 2018, 2019, 2021-2024);
       2012, 2013 y 2024 son solo el informe de gestión, sin estados financieros. Faltan 2014-2017 y 2020, y los demás clubes turcos. El comparador da "no" en las páginas imagen del informe del
       comisario (no tienen texto): se toman como buenas si sus totales coinciden con el balance. Para notar al cargar Bélgica:
       Patro Eisden 2024 sin "correction" trae al final el informe del revisor de otra entidad (Patro Eisden Jeugd VZW); el informe del
       comisario de Lierse SK 2023 habla de la vzw Lierse Kempenzonen (confirmar la entidad de cada carpeta); Patro Eisden 2017 y 2020
       traen el pasivo del año anterior descuadrado en el propio PDF. Cómo: un subagente Sonnet por documento, en tandas de ~8, con las reglas de
       `Admin/transcripcion-subagentes/reglas.md` (formato, columnas, cifras partidas, páginas imagen) y los dos chequeos
       (`check-transcripcion-fidelidad.js` y `Admin/transcripcion-subagentes/comparar-numeros.mjs`); ~110.000 tokens por documento de ~20 págs.
       Para notar al verificar Estonia: Laagri 2023 es un primer ejercicio de menos de un año (constituido el 09.01.2023); Flora 2025 pág. 29
       y Nõmme Kalju 2024 traen descuadres del propio PDF en el patrimonio; varios informes traen consolidado y la MTÜ sola.
       (5) Países Bajos y Colombia (sesión de transcripción del 2026-10-16): 167 .md hechos y commiteados (Países Bajos 159, Colombia 8),
       todos con los dos chequeos en verde (las páginas imagen, leídas del render). El detalle por documento, en
       Admin/transcripcion-subagentes/avance-2026-10-16.md. Falta: `pipeline.mjs --lista` sobre esos PDFs (el registro todavía los
       cuenta "sin .md"; sin un lote corriendo) y después el lote. Antes del lote:
       - No son el club de fútbol (proponer a descartados): NEC 2022-23 y 2023-24 (Stichting N.E.C. Maatschappelijk; los demás años de NEC
         son N.E.C. Holding B.V.), RKC Waalwijk `Jaarrekening_def` (Stichting Samen RKC 2018-19), VVV `jaarrekening_vvv_foundation_2023-2024`,
         Titanes de Barranquilla (baloncesto) y Toros de Córdoba (béisbol).
       - Duplicados y versiones: NEC Nijmegen `wf-2024-2025` es idéntico a NEC 2024-25 (dos carpetas para el mismo club; unificar);
         Cambuur `_x96442` y FC Emmen 2017-18 y 2018-19 sin `-DEF` son idénticos a otros (a descartados, sin .md); FC Twente 2021-22 tiene
         dos versiones con cifras distintas (se transcribió la `wf-src`: decidir cuál es la definitiva); Feyenoord 2023-24 y 2024-25 ya tenían
         otro .md; Ajax y AZ tienen jaarverslag y `wf-` (depósito en la KvK) del mismo año (elegir uno por ejercicio).
       - Arreglos chicos en los .md: Ajax 2024-25 pág. 44 (sacar las descripciones "Grafiek: ..." agregadas), portadas en imagen de Sparta
         2024-25 y 2020-21, ADO Den Haag 2023-24 págs. 5 y 8 sin contenido.
       - Revisar contra el PDF las filas que el subagente reubicó y las páginas leídas del render (lista en el archivo de avance).
       Quedan 468 PDFs digitales sin transcribir en los países de este to-do: Colombia 203 (59 son certificaciones y dictámenes), Rep. Checa
       116, Dinamarca 84, Turquía 27, Noruega 18, Croacia 12, Ucrania 6, Suiza 1 y Países Bajos 1 (Ajax 2013-14). La lista de escaneos para
       Mistral, en el archivo de avance.
    b2) CAMBIO DE SCRIPT SIN COMMITEAR (2026-10-15): `tools/fetch-club-league-reference.mjs` (escalón "tabla limpia" + `--comparar`, ok de Guido: la medición sobre toda la caché con
       `node Admin/transcripcion-subagentes/medir-ligas.mjs "$PWD" <salida.txt>` tiene que dar que SOLO cambia Portugal 2025; una versión más laxa rompía Colombia 2017-2020, y la siguiente cambiaba 4 temporadas por variantes de nombre (Chequia 2013, Serie A 2013, Portugal 2.ª 2012 y 2014); la de hoy agrega "menos nombres que la elegida" y NO está medida todavía. Si
       la medición no se pudo terminar, rehacerla antes de commitear; si da otra cosa, revertir con `git checkout` y anotarlo).
    b) SIGUIENTE. Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
       Altas de Noruega contestadas (2026-10-15) salvo dos, en Admin/registros/cola-borradores/altas-noruega.jsonl: Vålerenga (¿matriz,
       Elite FLI o AS: cuál tiene salarios e ingresos del fútbol?) y Viking (el subagente propone Viking Fotball AS, ~266 M NOK contra
       ~18 M del club, en lugar del ajuste `name` Viking Fotballklubb).
    Mejoras de script vistas en Grecia: to-do 232.

237. MEJORAS DE SCRIPT VISTAS EN EL LOTE 76 (Portugal, 2026-10-15; cada letra es un escalón a diseñar con el ok de Guido).
    ESTADO DEL 237 (2026-10-16). Hechas y medidas (un commit por letra, ver CHANGELOG 707 y 708): ad, n, f, d, t, e, ab, a+ac, v, r, paridad PTE, aa, q (POC y q1/q2), k, w, am, l (vecino sin
    descartados), ah, af+s, ai+ak, z, g y la letra nueva an (verificar no reescribe el .rubros.json igual, glosar no vuelve a pagar). Pasaron a
    Admin/HALLAZGOS-pipeline.md: o, b, c, h, i, j, l (primera parte), m, p, u, x, ae, aj y Benfica 2014-15. Guido dejó al para después.
    Cómo medir cada letra: verificar -> node tools/medir-verificar.mjs --lista Admin/lotes/prueba-completa.txt --salida <x> --pasadas 2
    (antes con --script <copia de la versión vieja dentro de tools/>) y --comparar; cargar -> node tools/medir-cargar.mjs --salida <x>
    (paralelo, ~1,5 min) y --comparar, después git checkout -- Admin/registros/categorias-aprendidas.jsonl; auditoría -> node tools/audit.js.
    PENDIENTE: solo al (Guido la dejó para después).
    al) EL ANEXO EN FORMATO UEFA ABRE LAS VENTAS Y NADIE LO USA (Mafra 2023-24, "Contas Anuais ED*-1", .md L1437-1483: bilheteira, patrocínios,
       TV, merchandising, competições y otros = 1.275.143,83, exacto con Vendas e serviços prestados; el lote pedía un reintento pago por TV y
       estadio en 0). Se cargó con ajustes `fila`. Portimonense 2024-25 trae algo parecido en el informe de gestión. Escalón posible: que
       localizar ofrezca ese anexo como desglose de Vendas cuando su suma da el renglón (compuerta: suma exacta).
       Más casos (lote 84): Sporting 2002 a 2007, cuadro de gestión de los proveitos (columna de resultados reales, mismo total que
       el estado): cargado con 45 ajustes `fila` (TV, taquilla, abonos, cuotas, sponsors, royalties, UEFA y un resto).
238. LLEVAR A 0 LOS ESTADOS INTERMEDIOS DEL INVENTARIO (pedido de Guido, 2026-10-15). El objetivo no es borrar documentos de la lista
   sino que todo lo que está frenado a mitad de camino y se puede cargar termine cargado en el sitio. Estados intermedios: `listo`
   (transcripto y validado, falta el lote), `pendiente-segunda-voz`, `revisar`, `listo-para-jev`, `sin-rubros`, `sin-tablas` y
   `sin-verificar`. `duplicado` y `no-es-pdf` no son intermedios (se revisan solo para confirmar que están bien marcados). Cuántos hay
   en cada uno: el resumen final de `node tools/pipeline.mjs` o `node tools/estado.mjs` (gratis); el 2026-10-15 eran 565 listo, 399
   pendiente-segunda-voz, 355 revisar, 259 listo-para-jev, 220 sin-rubros, 38 sin-tablas y 1 sin-verificar, sobre 11.029 a trabajar.
   Cómo: por país y por estado, el escalón que corresponde de la etapa 2 (`pipeline.mjs --lista`) y después lotes; lo que no se puede
   cargar (sin estado de resultados, parcial) va a `documentos-descartados.txt` o `documentos-parciales.txt` con su ok, para que deje de
   contar como frenado.

232. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO GRECIA (pedido de Guido, 2026-10-14: anotar lo que se aprende en el onboarding griego). Cada
    letra es un escalón a diseñar con su ok (skill club-or-year-onboarding, sección 3.b), uno por vez.
    e) `perimetro-a2` le pasa a la IA hasta ~42.000 tokens de entrada para contestar ~130 (Olympiacos 2018: US$ 0,17 por llamada); en
       Grecia fue el 20% del gasto de API. Mirar qué texto le hace falta de verdad (to-do 230 lo deja como tercer cambio).
       PROBADO Y DESCARTADO (2026-10-14): recortar los textos debajo de los títulos sin tabla pierde 7 decisiones y mete 2 errores
       (Admin/HALLAZGOS-pipeline.md). Lo que queda por probar: que Jev haga una primera pasada barata (to-do 233) o achicar solo la parte
       de las notas que viene DESPUÉS del estado de resultados.

195. GESTIONES SIN FUENTE (solo entran las `confirmada: true`). Una tanda nueva se arma sola desde los casos de la cola con
    `node tools/gestiones-tanda.mjs --armar --escribir` (la última, tanda-2026-10-14-2, cargó 12). Siguen sin cubrir:
    - con caso en la cola y la pregunta en `Admin/dudas-por-club.md` ("Gestiones sin fecha confirmada"): CRB 2020, Cuiabá 2022-2025, Vila
      Nova 2014, Ferroviária 2010-2013 y 2023 (además, criterio de SAF: presidente del consejo o director-presidente), Goiás 2010-2013 y
      2017, OFI 2018 (administración judicial: sin gestión, decisión de Guido);
    - de las tandas 1 y 2, sin caso abierto en la cola (no los toma --armar): Fortaleza, Novorizontino, Ituano, Ceará 2024-2025, Amazonas
      2024, Cruzeiro 2024-2025 (Pedro Lourenço sin fecha de cierre de la compra), Pari NN 2021-2022, Once Caldas 2024-2025,
      Mönchengladbach 2023 (Rolf Königs). Para investigarlos con la herramienta hay que armarles un lote (--club no los encuentra sin caso).
    Las dudas de cada club, en "## Gestiones" de su `Admin/carga-clubes/<club>.md`; los casos `firmo` (la gestión cambió entre el cierre y
    la aprobación del balance), ahí mismo, sin cargar.

233. JEV EN OTRAS ETAPAS DEL PIPELINE (pedido de Guido, 2026-10-14). Jev (typesafe.ai, `tools/jev-categorizar.mjs`) cuesta ~US$ 42 por MIL
    MILLONES de tokens de entrada y hoy solo categoriza (etapa 7). Ver, etapa por etapa, si puede hacer lo que hoy hace Claude Opus o un
    escalón de reglas por idioma, como escalón barato antes de la IA cara (nunca reemplazando una compuerta): caja y deuda (232 t),
    `perimetro-a2` (le pasa hasta ~42.000 tokens a Opus para una respuesta corta, 20% del gasto de API en Grecia), localizar (elegir los
    bloques del estado y las notas del índice de bloques), el período y el cierre (232 i), el nombre legal del alta (232 o), las preguntas
    de perfil (socios / otros deportes, 232 c) y una primera mirada a los casos de la cola. Cada una se mide como Jev en la etapa 7
    (`--backtest`): contra lo ya decidido, contando los errores con confianza ALTA, antes de entrar como escalón.
    Cómo se usa Jev hoy: `tools/jev-categorizar.mjs` (la clave y el cliente están ahí; resultados de backtests en
    `Admin/mediciones/backtests/jev/` y `Admin/mediciones/test-jev-resultados.md`). Jev devuelve una categoría y probabilidades por
    categoría: sirve para elegir entre opciones cerradas (qué fila es caja, si es grupo o sociedad, si hay socios). Empezar por la etapa
    con respuesta cerrada y verdad conocida: caja y deuda (los años ya cargados de `caja-deuda.mjs --medir`) o el perímetro (los ajustes
    `perimetro` ya decididos y auditados, ver `--auditar-a2`).
    HECHO: caja y deuda (escalón 1b de caja-deuda.mjs, 2026-10-14). Lo que enseñó la medición: Jev elige bien la fila, pero destapó dos
    agujeros de la compuerta que también afectaban a los otros escalones (la trampa del cero y las cifras con forma imposible del OCR), y
    errores del sitio (Colo-Colo 0/0, PAOK 2021, Panetolikos 2022: 232 ab). También hecho: el dato "personal" (staffCost, caja-deuda.mjs --personal). Siguen: perimetro-a2,
    localizar, período y cierre, nombre legal, perfil y la primera mirada a la cola.

230. AHORRAR EN LAS ETAPAS 3 A 5 (pedido de Guido, 2026-10-14: el lote 71 de Grecia estima ~US$ 17 para localizar y extraer 45 documentos).
    Mirar dónde se va la plata (`node tools/gasto.mjs` y `Admin/registros/api/claude-api.jsonl` por tarea y por documento: localizar,
    extraer, validar-bloques) y qué se puede bajar sin perder exactitud: documentos que no son estados (informes del auditor, memorias) que
    igual pasan por localizar; páginas de más en lo que recibe extraer; un modelo más barato o menos esfuerzo para lo que hoy hace Opus;
    caché entre años del mismo club. Medir antes y después con `Admin/lotes/prueba-completa.txt` (lo cargado idéntico) y el costo por
    documento.
    HECHO el 2026-10-14: el desglose del gasto (Grecia, lotes 71 y 74: extraer 47%, perimetro-a2 20%, localizar 22%) y la "salida corta" de
    extraer, medida y DESCARTADA (Admin/HALLAZGOS-pipeline.md: −17% de costo pero 17 de 34 documentos cargaban distinto). Lo que queda:
    perimetro-a2 (232 e) y Jev (233). CÓMO MEDIR un cambio de extraer: rehacerlo cuesta ~US$ 6 por corrida sobre `prueba-mediana.txt`
    (34 documentos) y la IA no responde igual dos veces (6 de 34 documentos y el 3,5% de las etiquetas cambian con el MISMO código), así
    que hay que correr también el "antes" y comparar contra ese piso. El comparador usado (propuesta de `cargar.mjs --lista <x> --salida
    <x.jsonl>`, línea por línea: etiqueta, categoría, importe y totales) vivía en el scratch de la sesión: subirlo a `tools/` como
    `comparar-cargas.mjs` si se vuelve a medir. Restaurar después `Generados/` de los clubes de prueba y la cola con `git checkout`.

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    Inglaterra suma cricket: Warwickshire CCC (The Warwickshire County Cricket Club Limited, consolida Birmingham Phoenix y Edgbaston
    Experience) tiene un caso de alta en la cola (670a1fe) sin contestar hasta que se decida esto.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `Admin/sourcing/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

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
