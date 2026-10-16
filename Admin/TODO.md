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
       - Felgueiras 2021-22: frena por "ingresos implausibles" (0,15 M USD; club chico real, mismo caso que Alverca: to-do 237 e).
       - Sporting 1999-2010 y Benfica 2005-06, 2006-07 y 2014-15 (237 q, subtotales), Sporting 2008, 2018
         y 2021 (237 aa, redondeos), Benfica 2007-08 (237 ab, 11 meses). Lista: Admin/lotes/lote-80.txt.
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
    b2) CAMBIOS DE SCRIPT SIN COMMITEAR (2026-10-15): `tools/lote.mjs` (título "RESULTADO ETAPA 7" y tabla final "ETAPA · #", pedido de
       Guido, solo salida: falta probarlo con un ensayo sobre Admin/Archive/lotes/lote-76.txt y commitear) y
       `tools/fetch-club-league-reference.mjs` (escalón "tabla limpia" + `--comparar`, ok de Guido: la medición sobre toda la caché con
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
    a) `periodo.mjs` tomó la FECHA DE FIRMA como cierre: Alverca 2022-23 quedó con cierre 2023-09-29 ("Alverca, 29 de Setembro de 2023",
       relatorio-contas-2022-23.md L75 y L108) cuando el documento dice "Período findo em 30 de Junho de 2023" (L87) y las columnas
       "30/06/2023 | 30/06/2022" (L93). Se resolvió con un ajuste `cierre`. Escalón posible: una fecha precedida por un nombre de lugar
       ("<Ciudad>, <día> de <mes> de <año>") es la firma, no el cierre; y el "período findo em" o la fecha de las columnas del estado manda.
    b) Un renglón del estado que JUNTA amortización de pases y depreciación ("Gastos/reversões de depreciação e amortização", notas 4 y 5)
       va entero a una sola categoría. Moreirense 2022: pases 1.031.142,16 (L720) + depreciación 89.555,61 (L691) = 1.120.697,77 (L498);
       2025: 612.126 (L944) + 291.735 (L895) = 903.861 (L530). Se cargó entero como player_amortisation (la parte mayor, como PAOK).
       Escalón posible: si las notas que el renglón cita dan cada parte y suman exacto el renglón, abrirlo en dos filas con su categoría.
    c) El perfil (socios, otros deportes) es por club, pero un mismo club publica como entidades distintas: Rio Ave 2014-15 es el club
       asociación (cuotas 217.671,75 y futsal), 2015-16 a 2022-23 la SDUQ y 2023-24 en adelante la SAD. Se contestó "no" (SDUQ/SAD); no
       cambia nada hoy porque 2014-15 trae las cifras. Pensar si el perfil va por entidad o por ejercicio.
    d) `cargar-lote.mjs`: cuando un año de un club nuevo no se escribe y el alta se revierte, quedan los archivos NUEVOS del alta sin
       borrar (Alverca: data/pt/alverca-pt-data.js y data/club-leagues/pt.js, sin trackear). El alta siguiente de la misma corrida (Rio Ave
       2018, que estaba listo) frena por "cambios sin commitear en el sitio" y también se revierte. Se borraron a mano y Rio Ave 2018 entró.
       El revertir tiene que borrar lo que el alta creó, no solo restaurar lo que existía.
    e) La banda de `audit.js` (ingresos entre 0,2 y 2.000 M USD, P0 `escala-implausible`) frena a un club real de tercera división:
       Alverca 2022, 152.299,54 € (≈ US$ 0,16 M), verificado y silenciado en audit-ignore.json. Escalón posible: que la banda tenga en
       cuenta la liga del año (data/club-leagues) o que, con el resultado impreso cerrando, baje a aviso.
    f) Una respuesta de la cola con una categoría del OTRO lado cambia el signo de la fila en vez de mudarla sin cambiar su efecto (como hace
       el ajuste `categoria`): Nacional 2024, "Correções relativas a períodos anteriores" (ingreso 229.792, L793) contestada
       exceptional_items quedó como gasto −0,229792 y el resultado no cerraba por 0,459584 (el doble). Se arregló con un ajuste `categoria`.
       Más casos (lote 82): Nacional 2025, la misma fila (113.202); Académica 2023, "Ganhos em perdão de dívida" (2.710.737, condonación).
    g) El aviso "Estadio en 0" pide que las TRES categorías del estadio (matchday_competition, stadium_other, season_tickets) tengan
       ajuste `incluye`; con la de entradas alcanza para decir que el estadio está dentro de otra línea. Moreirense 2022 y 2025 llevan los
       tres ajustes.
    h) Formato portugués (SNC): la venta de jugadores viene en "Outros rendimentos" como "Rendimentos em investimentos não financeiros", con
       una nota al pie que lo dice ("Inclui ... alienação de direitos desportivos de jogadores"). La categorización la puso en other_income
       con confianza alta y no fue a la cola: Moreirense 2022 (4,10 M) y 2025 (8,00 M) se publicaron mal y se corrigieron con ajustes
       `categoria`. Además, el ajuste compara la etiqueta con el asterisco de la nota ("...financeiros*") aunque la carga lo muestra sin él.
       Escalón posible: leer la nota al pie de la fila (como "la nota de la fila" de caja-deuda) antes de categorizar.
       Mismo problema con un "Outros" cuyo detalle está en el texto bajo la tabla (Mafra 2023-24 y Marítimo 2024-25, lote 81): casos y
       medición en n).
    i) En la lectura 5 de `verificar.mjs`, un ajuste `fila` con `reemplaza` no alcanza una fila que entra DESPUÉS, al abrir un renglón con
       su nota ("nota exacta en la lectura 5"); y los ajustes `fila` sin `reemplaza` no entran. Vitória 2022 SAD: las cinco sub-rubricas de
       "Prestação de serviços" (nota 16, L1905-1909) no llegaban a la carga (TV 6,92 M en 0) y, con `reemplaza "Prestação de serviços"`, la
       fila madre no salía (ingresos 34,02 contra 23,49). Se resolvió reemplazando el renglón del ESTADO ("Vendas e serviços prestados", L590)
       por sus seis partes. Escalón posible: aplicar `reemplaza` también a las filas que abre la nota, y avisar cuando un ajuste no entra.
    j) Un ajuste `fila` que corrige el OCR de un renglón del estado (Alverca 2024, "Outros rendimentos" 522.591,60 -> 622.591,65) deja de
       abrirse con su nota: la venta de jugadores (581.500, nota 17.2.3) quedaba en other_income dentro del renglón. Se resolvió con una
       fila por línea de la nota. Escalón posible: que el renglón corregido por ajuste siga pasando por la apertura con su nota.
    k) Cuando el .md pierde TODOS los signos de una tabla escaneada (Rio Ave 2024, pág. 14), los intereses obtenidos se suman como costo
       (financiero 0,317495 en vez del neto −0,085703) y las reversiones de imparidad sin "-" quedan como gasto. Se resolvió con ajustes
       `fila` mirando la imagen. Escalón posible: que la lectura con signos pruebe el financiero por etiqueta ("obtidos"/"suportados").
    l) `cargar.mjs` toma el valor ABSOLUTO de un ajuste `fila` de gasto con valor negativo (una reversión), aunque `verificar.mjs` cierra con
       el signo: Rio Ave 2024, reversiones de imparidad −4,89 y −2.500,00 como gasto; verificar cerraba y la carga quedaba 5.011 € arriba en
       gastos (tie-out). Se pasaron al lado del ingreso con valor positivo (mismo efecto). Escalón posible: que cargar respete el signo del
       ajuste como lo hace la lectura "signo del documento" (to-do 200). Además, el chequeo del año vecino compara con documentos que están en
       documentos-descartados.txt (Vitória 2021 contra el 2021-22 de la asociación; Rio Ave 2016 contra el 2014-15): tendría que saltearlos.

    m) LA COLA SE LLENA DE PREGUNTAS REPETIDAS (lote 77: 617 casos de Portugal en 145 documentos; pedido de Guido: "son muuuchas
       preguntas en cola"). Medido: de 298 preguntas de categoría, solo 156 son de club + etiqueta distinta (casi la mitad repite la
       misma etiqueta del mismo club en otro año: "Bilheteira e Bilhetes de Época" de Sporting sale en 7 años con la misma propuesta).
       Escalón posible: preguntar UNA vez por club + etiqueta + categoría propuesta y aplicar la respuesta a todos los años del lote
       (hoy el precedente del club recién existe cuando el primer año se carga, y en un club nuevo ninguno está cargado). Compuerta: la
       misma, pero el precedente vale desde la respuesta y no desde la carga. A medir con la cola actual de Portugal.
    n) "Outros" Y ETIQUETAS GENÉRICAS CON CONFIANZA 0 (23 preguntas en Portugal). Si la fila genérica cae dentro de un bloque con nombre
       (p. ej. "Outros" bajo "Rendimentos suplementares"), el bloque decide la categoría; hoy sale 0 y va a la cola. A diseñar con 2-3
       casos reales. Medido el 2026-10-15 en toda la cola (preguntas de categoría con etiqueta genérica Outros/Otros/Others/Altri...):
       Portugal 96 de 588 (16%), Italia 20 de 491, Brasil 11 de 575, Colombia 6 de 205, Grecia 0. No es el idioma: el formato SNC trae una
       tabla por nota y casi todas cierran con "Outros". Aparte, y sin arreglo por etiqueta: el "Outros" cuyo detalle está en el TEXTO bajo
       la tabla (Mafra 2023-24: 2.300.000 de venta de jugadores dentro de "Outros" 2.304.155,62; Marítimo 2024-25: Taças, solidaridad FIFA y
       lugares anuais dentro de "Outros" 176.636), resueltos con ajustes `fila`; va con h) (leer la nota de la fila).
    o) VERIFICAR (186 casos en Portugal): 64 dudas de extraer, 39 dudas de tema (escala, cuadro), 32 que no cierran, 24 de localizar,
       14 de año vecino, 10 de primer año. Mirar antes de diseñar si las dudas de escala ("¿en euros y no en miles?") y las filas
       informativas debajo del total se repiten por club y se pueden contestar una vez por club, como en m).
    p) LA ETAPA 8 PREGUNTA EL PERÍMETRO AUNQUE HAYA AJUSTE MANUAL DEL CLUB (lote 78: Benfica 2019 y Boavista 2024 llegaron a la cola con
       "¿se carga CONSOLIDADO?" teniendo el ajuste `perimetro` del club, y en Boavista la propuesta era la contraria al ajuste). El ajuste
       es el escalón 0: si existe, la pregunta no debería abrirse.
    q) SUBTOTALES CONTADOS COMO FILAS: lo del POC (totales (A)-(G) que acumulan y juros en positivo en las dos columnas) está resuelto con
       el escalón "acumulados" de verificar.mjs (Benfica 2005-06 y 2006-07, Sporting 1999, 2001 y 2002-03 a 2006-07 cierran el resultado
       exacto). Quedan, cada uno con su propio defecto, por diagnosticar: Sporting 2000 (las líneas suman 18.526 y el total impreso dice
       6.653: otra estructura o escala), Sporting 2008-09 y 2009-10 (IFRS: el resultado no cierra; el total impreso excluye la
       amortización de pases), Benfica 2014-15 (un total sin rótulo, L2624, y 48 líneas de notas fuera de él). Los 9 que cierran todavía
       tienen dudas de localizar y extraer en la cola (cuadros del informe de gestión) y Sporting 1999 y 2001 el año vecino contra 2000:
       las respuestas del subagente están sin aplicar en Admin/registros/cola-borradores/sporting-1999-2010.jsonl.
    r) EL COPY DE LA TERMINAL QUEDÓ VIEJO (pedido de Guido, 2026-10-15). "(DE VERDAD)", "ENSAYO", los "OJO:" y la mayoría de los mensajes
       de pipeline.mjs y lote.mjs no terminan de explicar qué está pasando ni qué tiene que hacer Guido. Repasar la salida de las dos
       tools con un lote real y proponerle el texto nuevo (solo salida, no lógica) antes de tocarlo.
    s) --reintentar VUELVE A LOCALIZAR Y ABRE PREGUNTAS NUEVAS (lote 79, 2026-10-15: con la cola ya contestada, Porto, Santa Clara y
       Benfica 2018-19 se volvieron a localizar y extraer, se pagó de nuevo (US$ 1,46) y salieron 5 dudas nuevas de localizar y extraer;
       Sporting 2024-25 frena solo por "faltan-datos" en el registro de altas: correr `node tools/alta-club.mjs --todos`). Un reintento
       por "cola contestada" debería volver a verificar sin pagar localizar/extraer.
    t) EL ALTA FRENA POR "faltan-datos" AUNQUE YA ESTÉ LISTA (lote 79, dos veces: Sporting en la primera corrida; Porto, Braga y Benfica
       en la tercera). Correr `node tools/alta-club.mjs --todos` a mano las dejó "listas para alta" sin cambiar nada más. Escalón posible:
       que `cargar-lote.mjs` recalcule el registro de altas de los clubes de su lista antes de decidir, en vez de leer el estado viejo.
    u) UN INFORME PARTIDO EN VARIOS PDF PIERDE LAS NOTAS (Boavista 2023-24: RCSAD-23-24_1-3/2-3/3-3). El lote lee solo la parte 1 (el
       estado) y "Vendas e serviços prestados" 4.424.268,14 iba a la cola como fútbol sin desglosar, cuando la nota 22 de la parte 2
       (RCSAD-23-24_2-3.md L1146-1149) lo abre en entradas, TV y publicidad. Se resolvió con tres ajustes `fila`. Escalón posible: que
       localizar busque las notas en las otras partes del mismo ejercicio (mismo prefijo de archivo) cuando la parte del estado no las trae.
    v) EL CUADRO DE INVENTARIOS ABRE DUDAS EN CADA CLUB (lote 79: Porto b102, Santa Clara b20, Braga b38). "Apuramento do custo das
       mercadorias vendidas" (inicial + compras − final = CMV) no es un desglose aditivo; sumar sus filas descuadra (Santa Clara 633.981
       contra 378.448) y cada club genera 2 preguntas con la misma respuesta: queda afuera y se carga el renglón del estado. Escalón
       posible: reconocer el cuadro (filas "inicial/final" + "compras" cuyo cálculo da el renglón) y no ofrecerlo como desglose.
    w) UNA FILA DE UNA NOTA DE INGRESOS QUEDA COMO GASTO (Santa Clara 2024-25: "Juros e Outros Rendimentos Similares" 33.375,18 está en la
       nota 10.2 "Outros Rendimentos", L1041, pero se extrajo como gasto −33.375; el resultado no cerraba por el doble, 66.756). Se resolvió
       con un ajuste `fila` en ingresos. Escalón posible: que el lado de cada fila de una nota salga del renglón del estado que la nota
       abre, no de la palabra "juros".
       Más casos (lote 82): Marítimo 2023 "Juros" 598.818 y 2024 "Juros" 9.060 (nota Outros rendimentos); Paços de Ferreira 2022
       "Diferenças de câmbio favoráveis" 28.199 (además la categorización la sacó con no_es_rubro). Todos con ajuste `fila` en ingresos.
       Además se repitió en Santa Clara 2023-24 ("Juros e Outros Rendimentos Similares" 360.009 como gasto; ajuste `fila`).
       Y en el lote 81: Marítimo 2024-25 ("Juros" 112.880 de Outros rendimentos) y Nacional 2024-25 ("Correções relativas a períodos
       anteriores" 113.202, nota 15.2): las dos como gasto, resueltas con ajuste `fila`. Ya son 5 casos: vale la pena el escalón de w).
    x) EN UN ESCANEO, LA ARITMÉTICA DEL ESTADO ENCUENTRA LOS DÍGITOS MAL LEÍDOS (Santa Clara 2024-25: 26 números sin confirmar; armando
       las dos columnas del estado de arriba hacia abajo y de abajo hacia arriba desde el resultado impreso aparecieron 12 cifras mal
       leídas, p. ej. imparidad 236.595,04 → 236.995,04, que arrastraba los subtotales; se corrigió el .md y se confirmaron 29 números con
       ajustes). Escalón posible: antes de mandar números sin confirmar a la cola, probar qué cambio de UN dígito en una fila hace cerrar
       todos los subtotales y el resultado (compuerta: cierre al céntimo), y proponerlo con la imagen recortada.
    z) UN NÚMERO CONFIRMADO CON AJUSTE VUELVE A LA COLA (Santa Clara 2024-25, L1542 "40 646": tenía el ajuste `confirmado` y la corrida
       siguiente abrió el caso "numero-no-confirmado" 306c291 igual). Mirar si el ajuste se pierde cuando el .md cambia de versión.
    ab) EL EJERCICIO DE 11 MESES POR CAMBIO DE CIERRE SE CARGA (decisión de Guido, 2026-10-15; regla en CONVENCIONES-DATOS). cargar.mjs frena
       Benfica 2007-08 (1/8/2007-30/6/2008, "período de 11 meses", relatorio-contas-2007-08.md L236) con "período otro de 11 meses", y ningún
       ajuste lo destraba. Escalón posible: un ajuste `periodo` (valor: "cambio-de-cierre") que deje pasar ese documento con publicNote, o la
       señal del propio documento (inicio = día siguiente al cierre del ejercicio anterior y fin = nuevo cierre). Casos: Benfica 2007-08,
       Sporting 2003-04.
    ac) `periodo.mjs` TOMA EL FIN DE MANDATO DE LOS ÓRGANOS SOCIALES COMO CIERRE (lote 80: Benfica 2013-14 quedó con cierre 2017-06-30 y
       2012-13 con 2019-06-30, por la tabla de mandatos "30/06/2016", relatorio-contas-2013-14-pos-AG.md L1417-1421). Con el cierre mal,
       localizar no eligió estado ("no contiene el ejercicio pedido"), verificar comparó años equivocados y abrió 8 casos de año vecino falsos.
       Se resolvió con ajustes `cierre` y `estado`. Mismo patrón que a) (fecha de firma): una fecha dentro de una tabla de mandatos o de
       órganos sociales no es el cierre; manda "A 30 DE JUNHO DE 2014" del índice y el encabezado del estado.
    ad) CERRAR UNA ETIQUETA EN TODOS LOS AÑOS PUEDE ACEPTAR LA PROPUESTA EQUIVOCADA (lote 80: "Gestão operacional do estádio" de Benfica
       tenía propuesta match_organisation_expense en 2021-2024 y admin_general_expense en 2025; `cola.mjs --responder 36c73ff aceptar` cerró
       los otros 4 años, incluido 2025 con SU propuesta). Se corrigió respondiendo 2025 después. Escalón posible: que el cierre en cadena
       copie la CATEGORÍA de la respuesta, no la decisión "aceptar", o que no cierre los años cuya propuesta es otra.
    ae) NOTAS COMO IMAGEN SIN TRANSCRIBIR (Porto 2020-21: las notas 27 Rédito, 31 Outros gastos y 32 Depreciação quedaron como el nombre de
       la imagen, img-48/img-52, sin la tabla). El año se cargó con los renglones del estado (cierra), pero sin el detalle de esas notas.
       Escalón posible: que la validación de la etapa 2 marque un .md con referencias a imágenes de tablas y transcriba esas páginas.
    af) EL LOTE NO VUELVE A VERIFICAR CUANDO LLEGA UNA RESPUESTA (lote 80: Sporting 2007-08 y Benfica 2019-20 tenían sus 4 casos contestados,
       pero `lote.mjs` solo verifica los documentos recién extraídos y siguió frenando "4 casos pendientes" con la verificación vieja). Se
       destrabó con `node tools/verificar.mjs "<pdf>" --rubros` a mano (gratis). Escalón posible: que la etapa 6 del lote también tome los
       documentos cuya verificación es anterior a la última respuesta de la cola para ese PDF (ver s).
       OJO (2026-10-15, intento revertido): verificar.mjs escribe siempre, así que en esa corrida el documento NO llegó a la etapa 6 (salió
       del bucle de las etapas 3-5 por otro camino que no se pudo ver: la salida estaba truncada). Sumarlo a la etapa 6 "si hay respuesta
       posterior" es un parche con riesgo: re-verificaría con filas viejas un documento que esa corrida decidió dejar afuera (sin estado,
       falta fijar el cierre). Primero encontrar la causa: la próxima vez, el RESUMEN DEL LOTE dice el estado de ese PDF.
       CONTEXTO PARA BUSCAR LA CAUSA (pedido de Guido, 2026-10-15):
       - Hechos: lote 80, cuarta corrida (2026-10-16 ~01:20 UTC, con --ejecutar --cargar). Sporting 2007-08 y Benfica 2019-20 tenían sus 4 casos
         contestados a las 00:21-00:22 UTC; sus .verificacion.json quedaron con generado 2026-10-15T23:54 (no se reescribieron) y la etapa 8
         frenó "[filas] 4 casos pendientes". verificar.mjs escribe el .verificacion.json SIEMPRE (L1518) y verificarLista no tiene caché:
         esos dos PDF no llegaron a la etapa 6, o sea que en el bucle de las etapas 3-5 de lote.mjs NO quedaron en estado 'extraído'.
       - En los ENSAYOS de esa misma lista los dos imprimían "estado bN · digital · N filas" (llegaban a 'extraído'): la diferencia está en
         algo que solo corre con --ejecutar.
       - Caminos del bucle que hacen continue antes de 'extraído' y corren distinto con --ejecutar (empezar por acá): el escalón 1a de la
         etapa 2 si el registro dice e.estado 'sin-verificar' o 'revisar' (resolver-inventario.mjs --ejecutar cambia el registro y el
         documento puede seguir por otra rama); el rearmado con el texto propio (paginasARearmar y rearmar: con --ejecutar y sin
         --reintentar hace continue); "falta fijar el cierre o el perímetro" (aFijar); validar o extraer con error.
       - Cómo reproducirlo sin gastar mucho: una lista con solo ese PDF, contestar un caso suyo y correr el lote con --ejecutar (sin --cargar);
         mirar su línea en "=== RESUMEN DEL LOTE ===" (dice el estado final) y si aparece en "=== Etapa 6 ===". Comparar el campo estado de
         ese PDF en transcripciones-estado.jsonl antes y después.
       - Una vez encontrada la rama: que deje el documento en 'extraído' si sus derivados están al día, o que la etapa 6 lo tome con una
         compuerta que excluya lo que la corrida decidió dejar afuera (sin estado, falta fijar). Medir con prueba-completa.
    ai) RELOCALIZAR NO REHACE LA EXTRACCIÓN (lote 81: Nacional 2021-22 con ajuste `cierre 2022-06-30`; se borró su .ubicacion.json, el lote
       volvió a localizar y eligió bien la columna "30-jun-22", pero reusó el .filas.json del 15/10 19:55, extraído con la columna 2021: la
       verificación quedó con el año 2021 e ingresos 8,74 M en vez de 3,31 M). Se destrabó sacando también el .filas.json. Escalón posible:
       que extraer.mjs dé por vieja la extracción si el .ubicacion.json es posterior (o si cambió la columna del ejercicio). Riesgo si no:
       cargar un año con la columna comparativa de otro documento.
    aj) EL ID DEL CLUB EN LA REVISIÓN DEL ALTA NO COINCIDE CON EL QUE ARMA alta-club.mjs (lote 81: la revisión tenía pacos-pt y udleiria-pt;
       alta-club.mjs arma pacosdeferreira-pt y uniaodeleiria-pt desde la carpeta, y cargar-lote.mjs busca el color por clubId: los dos
       habrían frenado "sin color elegido"). Se resolvió agregando la revisión con el id de la carpeta. Escalón posible: que la revisión se
       cruce por carpeta (campo `carpeta`, que ya tiene) además de por clubId, o que alta-club.mjs avise cuando la revisión usa otro id.
    ak) CORREGIR EL .md NO REHACE LA VALIDACIÓN EN EL LOTE (lote 81: se corrigieron cifras en AVS 2023-24 L534 y Casa Pia 2024-25 L1125; la
       segunda corrida no rehízo la etapa 4 y cargar.mjs frenó "la etapa 4 es de una versión anterior del .md: correr el lote", que es lo que
       se acababa de hacer). Causa probable: el lote decide rehacer por `cache-al-dia.mjs` (huella o cada fila en su línea: una cifra
       cambiada deja las líneas iguales -> "al día"), y cargar.mjs mira la fecha del .validacion.json contra la del .md. Dos compuertas
       distintas para lo mismo. Se destrabó sacando los .validacion.json. Escalón posible: una sola compuerta (la del lote, que use también
       el mdSha1 que ya guarda el .validacion.json).
    al) EL ANEXO EN FORMATO UEFA ABRE LAS VENTAS Y NADIE LO USA (Mafra 2023-24, "Contas Anuais ED*-1", .md L1437-1483: bilheteira, patrocínios,
       TV, merchandising, competições y otros = 1.275.143,83, exacto con Vendas e serviços prestados; el lote pedía un reintento pago por TV y
       estadio en 0). Se cargó con ajustes `fila`. Portimonense 2024-25 trae algo parecido en el informe de gestión. Escalón posible: que
       localizar ofrezca ese anexo como desglose de Vendas cuando su suma da el renglón (compuerta: suma exacta).
       Más casos (lote 84): Sporting 2002 a 2007, cuadro de gestión de los proveitos (columna de resultados reales, mismo total que
       el estado): cargado con 45 ajustes `fila` (TV, taquilla, abonos, cuotas, sponsors, royalties, UEFA y un resto).
    am) EL RESULTADO IMPRESO SE TOMA SIN SIGNO (lote 82: AVS 2023-24 lo lee de L613 "3 041 302,19 € -", con el menos al final; Portimonense
       2022-23 de L1101, que no trae signo; los dos son pérdidas y el estado (L513 y L1036) lo dice). verificar.mjs dio OK y la propuesta de
       carga frenó por tie-out-resultado. Se resolvió con ajustes `resultado-final`. Escalón posible: con varios candidatos al resultado
       que coinciden en valor absoluto, tomar el signo del que lo imprime explícito (el estado). Ojo de proceso: la re-verificación a mano
       (`verificar.mjs --rubros`) no anticipa estos frenos ni los de f y w; antes de pasar el comando del lote conviene el ensayo de
       `cargar.mjs --desde-verificacion` de cada documento.
    ah) `medir-cargar.mjs` NO SE PUEDE ACOTAR (2026-10-15, medición de la 237 y: ~6 min por corrida, dos corridas, sobre los ~570 documentos con
       categorías de todos los países, cuando el cambio solo actúa en Clubes/Portugal/). Escalón posible: `--lista <archivo>` y `--dir <carpeta>`
       para medir solo lo que el cambio puede tocar; la corrida completa queda para los cambios que afectan a todos (escalera de categorías).
       CAUSA DE LA LENTITUD (mirado): lanza `node tools/cargar.mjs <pdf>` como proceso nuevo por cada documento y en serie (execFileSync,
       L49); cada uno arranca Node y relee el sitio entero y los registros grandes (cola, ajustes, inventario): ~0,6 s × 570. Escalones, de
       menos a más riesgo: (1) en paralelo, un pool de ~8 procesos (la Mac tiene 10 núcleos) con una copia de la cola por proceso, sin tocar
       la lógica: ~6 min -> ~1 min; (2) un solo proceso que llame a `proponer()` (ya exportada) con el sitio y los registros leídos una vez,
       cuidando sus efectos al costado (agregarCaso, categorias-aprendidas): compuerta, que --comparar dé idéntico contra la versión de
       procesos. Una base de datos no lo resuelve (el costo es arrancar y releer, no consultar) y suma infraestructura a un sitio estático.
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
