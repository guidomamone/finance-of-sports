# Triage de las dudas de carga de `Admin/dudas-por-club.md` (auditora, 2026-10-20)

Pasada con 6 subagentes de lectura (sin grep ni Bash: por eso muchas líneas llevan "?"), por bloques de líneas del archivo; después la auditora verificó contra reglas lo que pudo. Solo dudas de carga; sourcing y gestiones excluidos. Clasificación: (a) con precedente, (b) criterio nuevo → votación, (c) necesita al club, (z) ya resuelta.

## Resumen verificado por la auditora
**Reclasificadas de (b) a (a)** (ya hay regla):
- Randers y Vejle, Arsenal ("Share of joint venture operating loss") y Köln (deterioro de participaciones): resultado de participadas → `netInterest` (club-data-mapping/referencia/casos-por-pais-y-formato.md L101-104).
- Cruzeiro 2022 y Botafogo 2024 (reexpresión): cada año con su propio documento; el comparativo reexpresado no reemplaza lo cargado (CONVENCIONES-DATOS, regla del comparativo reexpresado).
- Bayern (Einzelabschluss vs Konzern): regla de perímetro por ejercicio (CONVENCIONES-DATOS, "qué perímetro se carga…", puntos 1-3).
- Leeds (cambio de dueño a mitad de año): el ejercicio es de quien estaba en el cargo al CIERRE (Admin/ARQUITECTURA.md, "Gestiones": `firmo` para las excepciones).
- Wolves (ejercicio de 13 meses): regla de transición de más de 12 meses (CONVENCIONES-DATOS, votación 2026-10-20).
- Slaven Belupo ("Komercijalni prihodi od članstva"), St. Gallen ("Gönnern und Mitgliedern") y Juventude 2021 (sócio-torcedor): línea que junta conceptos → entera en la categoría principal + `incluidoEn` (CONVENCIONES-DATOS L295-309).
- Juventude lotería esportiva: queda en `other_income`, sin voto (se vota solo si aparece en más clubes).

**(b) que sí van a votación, agrupadas** (una votación por grupo):
1. `grossDebt`: ¿el pasivo de leasing IFRS 16 y la deuda con partes relacionadas o accionistas sin etiqueta de préstamo cuentan? (AGF, Silkeborg, SønderjyskE, Botafogo-SP, Fulham préstamo del dueño). La referencia formato-simplificado.md L79-85 dice "la línea más angosta de deuda financiera real" pero no cubre esto.
2. Venta de derechos comerciales o de TV a un fondo, o cesión de un % (Ceará, Coritiba, Cruzeiro).
3. Sociedad que mezcla fútbol con otros negocios y trae segmento IFRS 8 (OB; FC København antes de 2023).
4. Negative goodwill / reversión de diferencia de primera consolidación (Leeds, Augsburg).
5. Intangibles belgas = derechos de jugadores (Mechelen y Dender hoy cargados distinto).
6. Cesión (préstamo) de jugadores como ingreso: Getafe `player_sales`, Mallorca `other_income`; derecho de tanteo de Godoy Cruz; "Trayectoria deportiva" de Pereira.
7. Costos de transacción de jugadores (Eintracht Frankfurt; Palmeiras, Corinthians y Atlético Mineiro de precedente).
8. Ganancias y pérdidas no operativas puntuales: Everton (deconsolidación intragrupo en `assetSales`), Gimnasia LP (revaluación no-cash de jugadores), Palmeiras (litigio puntual), América de Cali (posible doble conteo).
9. Deuda legado de la associação transferida a la SAF (Botafogo, Nota 19).
10. Entidad o serie: Panserraikos (serie tras liquidación), FC Groningen vs Groningen Beheer, clubes Stichting (Heracles, Volendam).
11. Hoffenheim: `officialPAT` con partner silencioso.

**A Guido directo (taxonomía o alcance, no se vota)**: Rosario Central y Talleres "tienda" (crear `merchandise_sales` y `cost_of_goods_sold`: categoría nueva), gastos bancarios de Rosario Central, y los casos no fútbol (escuderías de F1, MSG, Atlanta Braves).

**(c) necesitan al club** (todas inmateriales y ya cargadas en forma conservadora): Tolima, Once Caldas, Mirassol (patrimonio), Unión (Anexo IV), Independiente (Otras Competiciones), Argentinos 2019, dos de Japón, Millonarios, Pereira "Regalías", Colo-Colo, UC (TV y Nota 20), Feyenoord, Getafe ("Ingresos LNFP"), Banfield, América Mineiro, Unión Magdalena, Atlético Mineiro, Fortaleza ("Luvas"), Ferro, Corinthians y Vitória (desgloses opcionales), Lillestrøm, Volendam, Akhmat Grozny, Kocaelispor.

**Lo que NO se pudo verificar sin grep** (queda "(a?)" en los bloques de abajo): la existencia del ajuste o de la carga en `ajustes-manuales.jsonl`, `Admin/carga-clubes/` y `data/`. Antes de aplicar una (a?), Onboarding mira ahí.

---
## Bloque 1 (líneas de dudas-por-club.md)
Bloque líneas 31-455. Nota: no tuve Grep/Bash, así que NO verifiqué ajustes-manuales.jsonl ni data/*; solo leí CONVENCIONES-DATOS.md completo. Lo que depende de data/ o ajustes va como (a?) o (z) por texto de la propia sección. Excluidas por sourcing/gestiones: Vélez (Berlanga), Argentinos (Malaspina 2015), FK Austria Wien, Mirassol (dónde publican demonstrações).

Boca Juniors | Sin deuda en Presupuesto 2027 | (z) | La sección misma lo contesta: un Presupuesto no trae Situación Patrimonial; deuda/caja en "sin dato" (CONVENCIONES-DATOS "SIN DATO NO ES CERO", l.68).
Racing Club | Deuda 32M a 0 en 2025/26 | (z) | Mismo motivo que Boca: es Presupuesto; null/0 exacto = "sin dato" (CONVENCIONES-DATOS l.72).
Vélez | "Uso del estadio" a other_income / ¿incluye entradas? | (z) | Ya pasó a stadium_other (Versión 189) y cae en la fila "Estadio" de Formato simplificado; criterio conservador en SKILL.md sec.1 y CONVENCIONES-DATOS l.184. El número visible no cambia.
Rosario Central 2022/23 (+Estudiantes 2022, San Lorenzo 2013) | Dos cotizaciones USD el mismo cierre (255 vs 268) | (a) | Regla: vale el fx de caja y bancos, document_close (CONVENCIONES-DATOS l.454, votación Beşiktaş 2006). Es la que ya se usó (255 = lado Activo/cash).
Estudiantes LP | Gestión 2024 dividida (Gorostegui/Verón) | (a) | Regla: se atribuye la gestión a cargo al CIERRE (CONVENCIONES-DATOS l.182-183 y l.121-128, liga también del cierre). Ya cargado 'veron'; no hay nada que preguntar.
Estudiantes LP | to-do 43 derechos de formación sin línea propia | (z) | La sección misma concluye que no hay línea equivalente (la de youth_football es ingreso de escuela infantil); no se recategoriza. Se cierra el to-do por no aplicar.
Argentinos Juniors | Ejercicio 2019 sin balance auditado, cifras de la presentación (¿nominales?) | (c) | Solo se resuelve con el balance auditado 2018/19 del club (sourcing); no inferible de la fuente actual.
Argentinos Juniors | "balance-2018-2019.pdf" es la Memoria sin cifras | (z) | Informativo, ya contestado por la sección; no cambia datos.
San Lorenzo | Gestión 2023/24 dividida mitad y mitad (Tinelli/Moretti) | (a) | Misma regla: el que está a cargo al cierre, moretti (CONVENCIONES-DATOS l.182-183; ver Estudiantes). Sin voto: el caso parejo no cambia la regla.
San Lorenzo | Presupuesto 2023-24 de caja Ordinario/Extraordinario | (z) | Regla: se carga SOLO la parte Ordinaria (CONVENCIONES-DATOS l.179-181 y referencia/casos-por-pais-y-formato.md). La pregunta "por qué presupuestan así" es curiosidad, no afecta carga.
San Lorenzo | FX 2011 aproximado externo (4,11) | (z) | Regla de procedencia: cotización pública va por fxRef/FX_CLOSE con fxSource declarado (CONVENCIONES-DATOS l.163-178; referencia/fx.md). Solo falta verificar que esté como fxRef (a?).
Unión (Santa Fe) | Anexo IV Ejercicio 119: columnas de departamento ilegibles por OCR | (c) | Necesita copia mejor del PDF (sourcing); cargado agregado con checksum. No hay criterio que lo resuelva.
Unión (Santa Fe) | Anexo V (moneda extranjera) ilegible, se usó BNA vendedor | (z) | Regla: si el documento no declara fx se usa cotización pública por fxRef (CONVENCIONES-DATOS l.170-171). Ya hecho.
Unión (Santa Fe) | Ejercicios 116/117/118 sin Estado de Situación Patrimonial, deuda/caja sin cargar | (c) | Necesita documento completo (clubaunion.com.ar o el club); hasta entonces "sin dato" (l.68). Más de sourcing que de carga.
Unión (Santa Fe) | to-do 43 derechos de formación | (z) | La sección misma: Unión ya tiene "Otros recursos por derechos sobre jugadores" en player_sales; no se mueve "Ingresos Fútbol Amateur". Cerrar to-do para Unión.
Independiente 122 | Ejercicio 121 no cargado a propósito | (z) | Decisión de Guido ya tomada; se carga cuando aparezca el PDF propio (to-do 59). Nada que votar.
Independiente 122 | ¿Qué agrupa "Otras Competiciones" del Anexo D? | (c) | Ni la fuente ni las reglas lo dicen (torneo doméstico vs. amistosos). Cargado a matchday_competition por default; solo el club/auditor lo aclara.
Independiente 122 | Estadio / Parque Santo Domingo sin línea de ingreso este año | (a?) | Si se confirma que está dentro de "Publicidad y concesiones", aplica la regla de línea que junta dos conceptos: incluidoEn con posible:true (CONVENCIONES-DATOS l.302-312). Falta mirar Admin/carga-clubes/independiente-ar.md y el jsonl.
Rosario Central 2024-25 | Tienda: "Ingresos por ventas tiendas" / "Costo de mercadería vendida" a other_income/other_expenses | (b) | Pregunta: ¿se crean merchandise_sales y cost_of_goods_sold (Rosario, Talleres) o sigue en catch-all? Es categoría nueva (cuidado con memoria "no reabrir criterios de categoría": acá es categoría nueva, no recategorizar existentes).
Rosario Central 2024-25 | "Ingresos/Gastos fútbol profesional" residuales | (a?) | Bolsón sin desglosar: lump_football_operations / _expense (CONVENCIONES-DATOS l.109-120). Verificar que así esté cargado en data/ar/rosariocentral-ar-data.js.
Rosario Central 2024-25 | "Gastos bancarios y financieros" a admin_general_expense | (b) | Pregunta: ¿comisiones/gastos bancarios van a admin_general_expense o a netInterest/financiero? No hay regla (la de Beşiktaş l.449-452 es para partidas del propio bloque operativo del balance).
Rosario Central 2024-25 | "Servicios de terceros" ambiguo a other_expenses | (a?) | Catch-all conservador cuando el rubro no es separable (criterio de SKILL.md sec.1 y l.191-193). Verificar texto del anexo; sin más info queda en other_expenses.
Racing Club | Ingreso extraordinario etiquetado exceptional_items (2009/10/12/14) | (z) | Decisión de Guido 2026-09-20: se queda así; no recategorizar sin preguntar (CONVENCIONES-DATOS l.95-105).
Club América (Ollamani) | Dos fx 31/12/2025 en el mismo reporte (18,0012 MD&A vs 17,9528 Nota) | (a?) | Se usó la Nota auditada (17,9528), por analogía con la regla del fx de caja/documento formal (l.454). Es un caso nuevo de "dos valores, mismo día"; si Guido quiere regla escrita pasa a (b). No hace falta el club.
Club América (Ollamani) | ¿Cargar Ejercicio 2024 de 11 meses? | (a) | Regla: primer ejercicio de sociedad nueva (spin-off ene-2024) se carga como el año con publicNote (CONVENCIONES-DATOS l.262-267; y ejercicio de 11 meses l.281-286).
Deportes Tolima | Resultado neto 2025 con 3 cifras irreconciliables | (c) | Necesita el Estado de Resultado Integral primario (SIIS u otro radicado). No cargado; no hay regla que lo infiera.
Once Caldas 2025 | PAT confirmado pero pretax por notas no cierra (~3.599 M) | (c) | Cargado con tax como residuo del PAT confirmado. Solo se aclara con el Estado de Resultado primario; sin precedente escrito del método residuo (si Guido lo quiere regla, (b)).
Once Caldas 2024 | Nota 25 no reconcilia; impuesto 0 vs 1.761.301; PAT de una sola fuente | (c) | Mismo caso; requiere el estado primario o el club/SIIS. Ya cargado con residuo.
Boyacá Chicó 2024 | "Menos: Devoluciones" -1.726 M sin atribución | (a) | Regla: deducción de ingreso que el documento no abre va ENTERA a other_income en negativo (CONVENCIONES-DATOS l.293-300). Es lo que ya se hizo; no se pregunta al club.
Mirassol 2024 | Patrimonio líquido no cierra (diferencia 1.149.000,09) | (c) | Tie-out que falla sin explicación en la fuente; no se cargó patrimonio. Solo el club/auditor.
Mirassol 2024 | Errores de redacción del informe | (z) | Informativo, ya anotado; no afecta cifras cargadas.
No fútbol | País de una escudería F1 (registro vs licencia) | (b) | Pregunta: ¿país = registro societario (donde se depositan cuentas) o licencia de competencia?
No fútbol | Documento con dos clubes de dos deportes (MSG: Knicks + Rangers) | (b) | Pregunta: ¿bundle aclarado, entidad única "MSG Sports", o no se carga? (Precedente parcial: Ollamani/Club América l.373-389 grupos multiclub, no cubre dos deportes.)
No fútbol | Atlanta Braves: ¿consolidado o solo segmento béisbol? | (b) | Pregunta: ¿se carga consolidado (con The Battery) o solo el segmento? Precedente cercano: perímetro (CONVENCIONES-DATOS l.331-345) y México/Ollamani, pero no cubre segmentos.
No fútbol | ¿Una escudería de F1 es un "club" del esquema? | (b) | Pregunta: ¿entra en club-temporada-liga o necesita tratamiento propio?
Japón (J.League) | Desglose por club de ingresos/gastos: ¿existe y no se publica? | (c) | Ya se buscó en 3 fuentes; solo la liga puede decirlo. Mientras tanto "sin desglosar por la fuente" (l.106-120) y gastos "sin dato" (l.68-82). Más de sourcing que de carga.
Japón (10 clubes) | ¿Publica cada club su 決算公告 completo? | (c) | Solo se resuelve preguntando/buscando por club; sourcing.
Japón (Gamba) | Estimación 物販 de 7,6億 de note.com | (z) | Regla de la propia sección: no cargar sin fuente identificada; vale el no-cargar.
CA Osasuna | Período jul-jun vs calendario desde 2025 | (z) | Los dos ejercicios cargados confirmados por carátula; si aparece uno de transición, aplican las reglas de períodos (CONVENCIONES-DATOS l.251-286; cargar.mjs reconoce por cadena de cierres). No hace falta preguntar.
Borussia Mönchengladbach | ¿La GmbH es la operadora de fútbol? | (z) | Resuelta con el Lagebericht 2024 (sección misma). Entidad: regla l.351-364.
OH Leuven | Otras 2 entidades "Oud-Heverlee Leuven" (NV, VZW) | (a?) | Regla de entidades: se carga la que tiene el fútbol (BV con turnover), las otras van al registro de entidades (CONVENCIONES-DATOS l.351-364 y l.373-389, Admin/registros/entidades.jsonl). Falta abrir esos 2 PDFs, nada para preguntar.

(a): 5 firmes, más 5 (a?) = 10
(b): 6
(c): 10
(z): 15

## Bloque 2 (líneas de dudas-por-club.md)
Guangzhou Evergrande | cargar un club extinto/que ya no juega en la CSL | (a) | Sí se carga: criterio de Guido "clubes desaparecidos sí valen" (memoria clubes-desaparecidos-si-valen: sourcear clubes extintos o refundados si sus balances siguen publicados). No es pregunta de criterio abierta.
Parma | duración del ejercicio de transición jun→dic 2018 (12 vs 18 meses) | (a) | Se lee de las fechas del propio documento, no se pregunta. Si cubre >12 meses con comparativo contiguo: se carga como el año con publicNote (CONVENCIONES-DATOS.md l.274-279, votación 2026-10-20: Westerlo 2015, Wolves 2025). Si es un tramo corto que deja afuera temporada: parcial (l.251-260, documentos-parciales.txt).
Genoa | duración del ejercicio de transición dic→jun 30.06.2024 (6 vs 12 meses) | (a) | Igual: se cuenta con las fechas del documento. 6 meses = parcial y se busca el tramo faltante (CONVENCIONES-DATOS.md l.251-260); 12 meses = ejercicio normal; 11 meses con temporada entera se carga (l.281-286, Benfica 2007-08).
AEK Athens | cuál de 2 versiones del ejercicio 2021/22 usar (Notes_IFRS_2022 vs FS_orthi_epanalipsi_2022) | (a) | Dos documentos distintos del mismo club y ejercicio: entra el que trae el estado de resultados completo; si los dos, el más completo con notas; el otro a documentos-descartados.txt (CONVENCIONES-DATOS.md l.366-371). Falta solo abrir ambos y comparar (a? si la "epanalipsi" es una re-emisión que corrige cifras: confirmar con tie-out cuál cierra).
AEK Athens | 2 archivos sin fecha de ejercicio confirmada (AEK_oikonomika_stoixeia / _katastaseis) | (a) | No es pregunta al club: abrirlos y leer el ejercicio de la portada; es lectura de documento, no criterio. Si repiten un ejercicio ya cargado aplica la regla de dos documentos (l.366-371).
Vålerenga | cuál de las 3 entidades (Elite FLI, AS comercial, FLI paraguas) es "el club" | (a) | Regla "qué entidad se carga cuando el fútbol está en una sociedad aparte" (CONVENCIONES-DATOS.md l.351-364): se mira cada ejercicio y se carga la que tiene el fútbol profesional; las otras como entidades del club con sus ingresos (entidades.jsonl, l.373-389). Se resuelve leyendo los estados de resultados; no hace falta preguntar al club.
Inter | cargar el perímetro "Inter Media and Communication S.p.A." (unidad de negocio) | (a) | No se carga como el club: no es la entidad con el fútbol. Va como otra entidad del club en Admin/registros/entidades.jsonl, mostrando sus ingresos aparte (CONVENCIONES-DATOS.md l.373-389) y, si es una controlada, entra por el perímetro consolidado (l.331-345). (a? verificar en entidades.jsonl si ya figura).
Olympique Lyonnais | perímetro: DEU de Eagle Football Group (multiclub) vs SASP individual | (a) | Regla de perímetro (CONVENCIONES-DATOS.md l.331-345, ej. Parma/Fiorentina) + grupo multiclub (l.373-383): el club es la SASP Olympique Lyonnais; Eagle es el grupo y no se carga como el club. Si el DEU no desglosa el segmento, se usa el bilan de la SASP (o el agregado DNCG como referencia). (a? falta mirar si el DEU trae segmento Lyon y si hay bilan SASP disponible).
OB (Odense) | Odense Sport & Event A/S mezcla fútbol con ferias/hoteles/eventos: ¿sirve su informe tal cual? | (b) | Criterio nuevo: ¿se carga una sociedad cuyo informe mezcla fútbol con otros negocios si trae segmento IFRS 8 que aísle el fútbol (y qué si no lo trae)? Solo roza la excepción 3 de l.362-364 (no distorsionar el poderío del club). Va a votación junto con FC København.
FC København | pre-2023 el fútbol estaba dentro del consolidado de PARKEN Sport & Entertainment A/S | (b) | Misma pregunta de votación que OB: ¿se carga un consolidado de grupo que mezcla fútbol con estadio/eventos/inmobiliario como serie del club, usando segmento si existe? Si se decide que no, F.C. København P/S queda con 3 ejercicios (2023 en adelante).
Panserraikos | si se completa la serie antes de 2020: ¿balances de la ΠΑΕ liquidada cuentan como el mismo club? | (b) | Criterio nuevo: en una refundación tras liquidación, ¿los balances de la entidad liquidada se cargan en el mismo clubId o se corta la serie en 2020? Hay precedente de clubes refundados (memoria clubes-desaparecidos-si-valen) pero no una regla escrita de continuidad de serie. A votación (no urgente, hoy solo hay serie desde 2020).

Excluidas por ser de sourcing/gestiones (no se clasifican): Cercle Brugge (razón social previa), Henan (EEFF de Jianye), Daejeon Hana (corte del 사업보고서), Ulsan HD (sin informe en DART), Pohang Steelers (entidad propia), Lokomotiva (Scribd), AS Monaco (SIREN), Grecia huecos (Aris, Atromitos, Panetolikos, PAOK), Panserraikos (parte de hueco, ver arriba solo perímetro), Bologna (gap de publicación), Cagliari (link 404), Bodø/Glimt (falta 2018-2022), KFUM (nada desde 2019).

Conteo (a): 8
Conteo (b): 3
Conteo (c): 0
Conteo (z): 0

## Bloque 3 (líneas de dudas-por-club.md)
NOTA: Grep y Bash no estaban disponibles en esta sesion, asi que no pude buscar precedentes en CONVENCIONES-DATOS.md, skills, carga-clubes ni ajustes-manuales.jsonl. Todo lo no-z queda con "?" donde falta verificar. Casi todo el bloque 610-752 es sourcing (excluido).

Lillestrom | memoria propia hasta 2023 vs registro sin depositos desde 2011 (entidad legal) | (c) | Es de sourcing en su origen, pero si se carga algo hay que saber si cambio la entidad legal; no se infiere de la fuente. Hoy no bloquea nada. (Borde con sourcing.)
FC Groningen | "FC Groningen" vs "FC Groningen Beheer" (2017/18): holding vs operativa, perimetros distintos | (b?) | Criterio de perimetro: si hay dos jaarverslagen, cual cargar o si se consolida. Falta mirar: Admin/CONVENCIONES-DATOS.md (reglas de perimetro/consolidado), Admin/carga-clubes/groningen.md y data/ de Paises Bajos para ver si ya se resolvio. Si el jaarverslag de la holding es consolidado, probable (a) con la regla de consolidado.
FC Volendam | Stichting Oók FC Volendam (2013-2019) vs Stichting R.K.F.C. Volendam (2019/20+): fundacion de apoyo o el club | (c) | Es una pregunta de identidad de entidad que no se resuelve con reglas; se puede intentar inferir leyendo el jaarverslag (objeto social, si consolida la BV del club) y solo si no alcanza va al club. Antes de mandar, leer un documento 2013-2019.
Paises Bajos (Heracles/Volendam) | Stichting en vez de BV/NV: aplica el criterio de mapeo? | (b?) | Pregunta de criterio nueva: "una fundacion sin fines de lucro que opera el club se mapea con el mismo esquema (ingresos/gastos, resultado = excedente) que una SAD?". Falta mirar club-data-mapping/SKILL.md y referencia/casos-por-pais-y-formato.md (seccion Paises Bajos); si ya hay caso de Stichting, pasa a (a).
Tondela | solo 2020/21 publicado | EXCLUIDA | sourcing/gestion, no carga.
Arouca | pedir que resuban Relatorio e Contas | EXCLUIDA | sourcing.
Slovan Liberec | 17 anos sin deposito, sospecha de filtro | EXCLUIDA | sourcing.
Slovacko | serie discontinua | EXCLUIDA | sourcing.
Dukla Praha | faltan 2024-25 | EXCLUIDA | sourcing.
Rep. Checa | depositos duplicados (Slavia 1998/2002/2022, Bohemians 2012, Mlada Boleslav 2011-12) | (a?) | Abrir los pares y comparar totales; si son identicos se carga uno, si es correccion se carga el ultimo. Falta mirar CONVENCIONES-DATOS.md por regla de "documento corregido/reexpresado" (probable precedente). Tema de sourcing con borde de carga.
Akhmat Grozny | nunca deposito dictamen de auditor | (c) | Pregunta al club (o dato de registro); no afecta la carga de notas 2025 salvo para marcar el balance como sin auditar. Borde con sourcing.
Spartak Moscow | 2025-poyasneniya.pdf 1 pag / 7 KB | (z?) | Se resuelve abriendo el PDF/su .md (tarea tecnica, no pregunta): falta mirar Clubes/Rusia/Spartak.../2025-poyasneniya.md. Si es caratula, vuelve a sourcing.
Rubin Kazan | 2021 y 2022 sin documento | EXCLUIDA | sourcing.
Young Boys | falta ejercicio 2019 | EXCLUIDA | sourcing.
Thun | hueco 2017, posible cambio de ejercicio fiscal | (a?) | Si se confirma cambio de temporada a ano calendario, aplica la regla de periodo/ejercicio quebrado o corto de CONVENCIONES-DATOS.md (verificar el nombre exacto de la regla). Se confirma leyendo el balance 2018 (fecha de cierre del comparativo). Si no se puede, (c).
Zurich | Geschaeftsbericht 2011 en Yumpu con descarga deshabilitada | EXCLUIDA | sourcing (decision de Guido).
Kocaelispor | entidad Kocaelispor Kulubu Dernegi (2019) es la misma que ascendio a Super Lig 2025/26 | (c) | Identidad legal/refundacion: no se infiere de las reglas; se puede intentar con registros publicos turcos (MKK/TFF) antes de preguntar al club. Debe resolverse antes de cargar o comparar series.
Trabzonspor | salida a bolsa 2005 | (z) | Ya marcada RESUELTO en la propia seccion (lineas 719-723, Izahname 2025; serie 2015/16-2024/25 completa).
Polissya | dos EDRPOU candidatos: 40372249 vs 44547377 | (a?) | Se resuelve leyendo la cabecera de los PDF descargados (el balance trae el EDRPOU y el nombre de la entidad); no hace falta club. Falta mirar los .md de Clubes/Ucrania/Polissya/. Precedente de este tipo: Obolon (linea 732, se verifico por el formulario del balance).
Obolon | documento es de la TOV del club o de la cervecera PrAT | (z) | Marcada RESUELTA 2026-10-03 (lineas 732-736): es la TOV FK Obolon. Pendiente menor: confirmar el EDRPOU exacto al cargar (se ve en el formulario).
Kolos Kovalivka | solo informe de procedimientos acordados, no el paquete completo | EXCLUIDA | sourcing (si publica o no).
Dynamo Kyiv / Zorya / Kryvbas | sin seccion de transparencia | EXCLUIDA | sourcing/outreach.

Totales: (a) 0 firmes + 3 con "?" (Rep. Checa duplicados, Polissya EDRPOU, Thun)
(b) 0 firmes + 2 con "?" (Groningen perimetro Beheer, Stichting criterio de mapeo)
(c) 4 (Lillestrom, Volendam entidad, Akhmat Grozny, Kocaelispor) ; (z) 2 firmes (Trabzonspor, Obolon) + 1 con "?" (Spartak 7 KB). Excluidas por sourcing: 11.

## Bloque 4 (líneas de dudas-por-club.md)
BLOQUE líneas 753-1222 de Admin/dudas-por-club.md. Verificación limitada a CONVENCIONES-DATOS.md y club-data-mapping/SKILL.md (con solo Read/Write no pude abrir ajustes-manuales.jsonl, carga-clubes/ ni data/); donde el estado de la carga queda sin mirar va (a?) o (z?).
EXCLUIDAS (sourcing/gestión): Independiente Medellín (entidad que presenta EEFF), nombre ilegible del Rep. Legal de Santa Fe, gestión Gimnasia 2022-23 / Newell's / Banfield (socios, YouTube 105°), gestión América Mineiro, cambio de presidencia Atlético Mineiro, gestión Athletico/Vitória, Vasco (re-sourcear 2024), RB Bragantino (docs en Wayback), Fluminense (versión corregida en portal), CVM/debêntures Atlético Mineiro (dato de instrumento, no de carga).

Águilas Doradas | perímetro: ¿Talento Dorado mezcla futsal? | (a?) | Mismo criterio de perímetro que Ollamani/MSG: mirar la nota de contexto operacional al cargar; si futsal es inmaterial se carga y se documenta en Admin/carga-clubes/<club>.md; si no abre, va entero (CONVENCIONES-DATOS "qué entidad se carga"). Mirar si ya está cargado.
Argentinos Jrs | "Diversos (alquileres, concesiones)" genérico | (a) | SKILL.md sec.1 tabla (stadium_other): rótulo genérico NO entra, queda other_income conservador. Ya aplicado; la pregunta al club es opcional, no frena.
Unión Santa Fe | "Recursos por alquiler de instalaciones" | (a) | Igual: SKILL.md sec.1, genérico -> other_income.
Racing | "Ingresos Alquiler" | (a) | Igual (other_income conservador).
Rosario Central | "Alquileres" y "Concesiones" | (a) | Igual; "Concesiones" sin estadio nombrado queda en other_income (SKILL.md sec.1).
Envigado | "Arrendamientos" | (a) | Igual.
Botafogo | "Locações" | (a) | Igual.
América de Cali | "Derechos deportivos" vs "Amortizaciones" ¿doble conteo? | (b) | Pregunta de votación: ¿dos líneas separadas de costos deportivos con nombres que pueden ser el mismo hecho se cargan ambas, o hay criterio para detectar doble conteo? (hoy ambas a player_amortisation; tie-out cierra, así que no hay doble conteo numérico probado).
América de Cali | "Gasto de ventas" residuo $346 M sin desglosar | (a) | Residuo sin abrir va al catch-all (other_expenses), tie-out cierra; nada que decidir.
Deportivo Cali | `tax` por residuo (pretax - PAT SIIS) | (a?) | No hay duda de criterio: el desglose impreso no existe; mirar si hay regla de tax por residuo en casos-por-pais-y-formato.md; si no, anotar en carga-clubes/depcali-co.md.
Independiente Santa Fe | Nota 21 suma $2.294.550.661 más que el total impreso | (a) | Error de la fuente: se cargó el total impreso con línea de ajuste explícita, como Chapecoense/Vitória (fuente inconsistente: officialPAT del valor que concilia). Precedente de fuente que no cuadra: SKILL.md sec.6 punto 4 y ejemplos Chapecoense (más abajo). Cerrada.
Getafe | "Ingresos LNFP" ¿qué es? | (c) | Cargada other_income por descarte; solo la LNFP/el club dice qué concepto es. No frena.
Girona | "Ingresos accesorios y otros de gestión corriente" 22-43% sin desglose | (a) | Línea sin desglose en el documento -> other_income (SKILL.md sec.1 "todo lo demás específico del club"); lump_football_operations solo si el documento tampoco desglosa el resto (regla "Antes de usar lump"). Pregunta al club opcional.
1. FC Köln | deterioro de Finanzanlagen (TEUR 3.000) en netInterest | (a?) | Se cargó por posición HGB §275 Abs.2 (Finanzergebnis); criterio de SKILL.md sec.2 (resultado financiero va a netInterest). Verificar casos Alemania en casos-por-pais-y-formato.md; si no hay, es (b) "¿deterioro de participaciones dentro del bloque financiero HGB va a netInterest?".
FC Augsburg | "Auflösung Unterschiedsbetrag..." (consolidación) sin campo propio | (b) | Pregunta: ¿ítem no operativo de consolidación (reversión de pasivo de primera consolidación) va a other_income, a netInterest o a un campo/meta nuevo? Hoy other_income.
Eintracht Frankfurt | "Frauen und Jugendfußball" combinada 7,6 M | (a) | Regla "línea que junta dos conceptos": entera a una categoría + incluidoEn (CONVENCIONES-DATOS). Hoy other_income; posible mejora: other_sports o youth_football con incluidoEn {womens_football/youth_football: ...}. Aplicar la regla, no necesita votación.
Eintracht Frankfurt | "Transfer" (comisiones+fees, compra y venta) ¿categoría player_transaction_costs? | (b) | Pregunta: ¿costos de transacción de jugadores van a other_expenses (hoy) o a categoría propia? Precedente cercano: Palmeiras/Corinthians/Atlético Mineiro cargan comisiones de pase a other_expenses (ver más abajo) -> inclinación a mantener other_expenses, pero crear categoría es decisión nueva.
VfB Stuttgart | "Handel und Sonstiges" mezcla merch con venta neta de jugadores | (a) | Línea que junta dos conceptos sin desglose: entera a lump_football_operations y "Venta de Jugadores" queda "dentro de otro rubro" (incluidoEn / dentro-de-otro.mjs; CONVENCIONES-DATOS). Pedirle el desglose al club es opcional (c) pero no frena.
Arsenal | "Share of joint venture operating loss" sin campo | (b) | Pregunta: ¿resultado por método de participación va a una revenueLine other_income negativa (hoy), a netInterest o a un meta field nuevo? Mismo caso que Augsburg (ítem no operativo). Proponer votarlos juntos.
Arsenal | staff costs sin desglose todo a wages_squad | (a) | Fuente no desglosa: se carga entero a wages_squad y el sitio ya trata la masa salarial no desglosada como "sin dato" (CONVENCIONES-DATOS "sin dato no es cero"). Sin acción.
Everton | "Profit on disposal of investments" £49,2M (deconsolidación intragrupo) en assetSales | (b) | Pregunta: ¿ganancia por reestructuración corporativa intragrupo va a assetSales, other_income/exceptional_items o se excluye? Hoy assetSales. Candidato a votación.
Man City | employee costs sin desglose, todo a wages_squad | (a) | Igual que Arsenal.
Man City | celda ambigua profit/loss on disposal PP&E 2023-24 reconstruida por cruce | (a) | Tie-out cierra, cruce contra 2024-25 es el método estándar (SKILL.md sec.6 punto 2). Si se quiere, releer PDF: no es duda de criterio.
Man City | netInterest del P&L primario vs Notas 9/10 | (a) | Criterio sec.2: netInterest neto del estado de resultados que concilia con el resultado final. Sin acción.
Man City | grossDebt:0 real (term loan fuera del perímetro) | (a) | Perímetro: se carga la sociedad que el sitio publica (CONVENCIONES-DATOS "dos sociedades del mismo club"); 0 real documentado en carga-clubes. Sin acción.
Tottenham | "Commercial" mezcla sponsorship/merch/estadio no futbolístico | (a) | Regla "línea que junta dos conceptos" + stadium_other solo si el rótulo nombra el estadio (SKILL.md sec.1): queda sponsorship_commercial/other. Cerrada.
Tottenham | "Amortisation, impairments and other net football trading" (Nota 4 no reconcilia, dif. 2.526) | (a) | Una línea de D&A junta se parte solo si las notas la abren y cierran (regla votada 3-0, CONVENCIONES-DATOS); si no cierran, entera a player_amortisation con incluidoEn. Es lo que se hizo.
Tottenham | gestionId levy vs Joe Lewis/ENIC | (a) | Regla de gestión: la persona a cargo al cierre que una fuente confirme; si no, null y no frena (CONVENCIONES-DATOS "gestión sin fuente pública queda en null"). Es de gestión; ya queda resuelta por esa regla.
Newell's 2018-19 | "Complejo Ricardone" ($2,65M youth_other_sports_expense) | (a) | Rótulo sin actividad clara: mantener la categoría o pasar a other_expenses por criterio conservador (SKILL.md sec.1); inmaterial. Sin votación.
Newell's 2018-19 | "Concesiones" $1,59M y "Derechos de fútbol" $2,62M a other_income | (a) | Genéricos -> other_income (SKILL.md sec.1, stadium_other conservador). Cerrada.
Banfield 2019-20 | "Entradas Grales., Plateas, Palcos y Abonos" mezcla entrada y abono | (a) | Línea que junta dos conceptos: entera a matchday_competition + incluidoEn {season_tickets:'matchday_competition'} (CONVENCIONES-DATOS; "Estadio" es una sola fila en Simplificado).
Banfield 2019-20 | "Formación de Jugadores" y "Fútbol Amateur - Derechos" a player_sales | (c) | Duda real de qué son (¿solidaridad FIFA / derechos de formación?). Si son derechos de formación/solidaridad, player_sales es correcto; solo el club confirma. No frena.
Gimnasia LP 2023-25 | "Incremento Valor Jugadores FP" ($2.900 M / $2.051 M) | (b) | Pregunta: ¿una revaluación no-cash de valor de jugadores formados va a other_income (hoy), exceptional_items o se excluye de ingresos? Magnitud grande; sin precedente en las reglas. Votar y luego pedir confirmación al club (c).
América Mineiro | "Outras receitas operacionais" (~30-53% revenue) | (c) | Posible player_sales vinculado a LFU; el documento no abre. Cargada other_income conservador; confirmar con el club. No frena.
América Mineiro | "Receitas de transmissão e de imagem e desempenho" | (a) | Línea que junta dos conceptos: entera a broadcasting + incluidoEn {competition_bonus:'broadcasting'}, posible (CONVENCIONES-DATOS). Proporción solo la sabe el club (c) pero la carga queda cerrada.
América Mineiro | "Receitas com atividades sociais" ¿cuota de socios? | (a) | Caso citado textual en la regla: `{ member_dues: { en:'other_income', posible:true } }` (CONVENCIONES-DATOS). Cerrada.
América Mineiro | D&A 2024/2025 no se separa (Nota 21 no cierra con flujo de caja) | (a) | D&A junta sin apertura que cierre: entera a depreciation (hoy) o player_amortisation con incluidoEn, según regla votada 3-0; es un pendiente técnico, no del club. Decidir cuál si no se hizo: (a?) revisar si se aplicó incluidoEn.
América Mineiro | Resultado operacional 2025 pág.10 -58.842.916 no concilia | (z) | La propia sección dice que no se cargó ninguna línea de esa cifra y se usó -53.842.916 (concilia por dos caminos). Es un typo de imprenta documentado; sin acción.
Unión Magdalena 2018 | "Amortización de Ingreso Dimayor" ($239,5 M) | (c) | Concepto no explicado en el documento; cargada a broadcasting junto a Participación Dimayor. Solo Dimayor/el club lo confirman. No frena.
Atlético Mineiro | "Outras receitas atividades esportivas" (Timemania) salto 7x 2024-2025 | (c) | No se infiere del documento (¿incluye cesión de derechos de la Nota 26a?). Cargada entera other_income, consistente con Corinthians (Timemania/Loterias dentro de other_income). Confirmar con el club.
Atlético Mineiro | "Custo com atletas negociados" a other_expenses | (a) | Precedente: Corinthians "Custo com vendas e aquisição de atletas" y "Despesa na cessão de atletas" también a other_expenses (comisiones/costo de transacción), y Eintracht "Transfer". Mismo criterio. Detalle exacto solo del club (opcional).
Athletico Paranaense | "Custo das Operações de Eventos" y "Custo de Transmissão" a admin_general_expense | (a) | Sin categoría específica: catch-all de gastos (SKILL.md sec.1 "todo lo demás específico del club"); según tabla corresponde other_expenses; revisar si admin_general_expense es consistente con otros clubes (a?). Qué componen: (c) opcional.
Vitória | "Premiações e outras" (premios copa + socio-hincha) | (a) | Línea que junta dos conceptos: entera a competition_bonus + incluidoEn {member_dues:'competition_bonus'}. El ejemplo textual de Vitória está en CONVENCIONES-DATOS ("regla de línea que junta dos conceptos"). Cerrada.
Vitória | Nota 29 vs DRE impresa (diferencia 10,208 M) | (a) | Fuente inconsistente: se carga lo que concilia con el resultado auditado (SKILL.md sec.6 punto 2 y precedente Chapecoense/Santa Fe). Cerrada; pregunta al auditor opcional.
Vitória | 42 mil sócios umbral 2024, no conteo al cierre | (a) | memberCount solo con cifra puntual al cierre; queda null (SKILL.md/ESTADO). Cerrada.
RB Bragantino | "Custo do departamento de futebol" mezcla sueldos y amortización, sin notas | (a) | Línea que junta dos conceptos sin notas que la abran: entera a una categoría con incluidoEn (regla D&A junta, CONVENCIONES-DATOS). Pedir versión con notas (c) es opcional.
RB Bragantino 2019 | Passivo reconstruido por orden de impresión (PDF vectorial) | (a) | Método de lectura de PDF difícil (referencia/leer-pdf.md); riesgo acotado a grossDebt/cash. Sin acción; reverificar si aparece mejor copia.
Corinthians 2024 | "Premiações, Fiel Torcedor, Loterias e Outras" sin desglose | (a) | Línea que junta conceptos: entera a other_income (hecho), con incluidoEn si corresponde; el 2025 abre los 4 conceptos, así que el desglose 2024 es (c) opcional.
Corinthians | "Custo com vendas e aquisição de atletas" / "Despesa na cessão de atletas" a other_expenses | (a) | Mismo precedente que Atlético Mineiro.
Palmeiras 2024 | "Acordos e despesas legais e judiciais" R$73,9 mil en admin_general_expense | (b) | Pregunta: ¿un litigio grande y puntual dentro de un rubro administrativo va a exceptional_items? Corinthians/Botafogo/Atlético Mineiro ya lo hacen; criterio de recurrencia no escrito.
Palmeiras | grossDebt chico frente a "Antecipação de contratos" (factoring) | (a) | Regla de factoring (CONVENCIONES-DATOS): entra en grossDebt solo si el documento la llama deuda financiera / con recurso; el propio balance la categoriza aparte, así que no entra. Documentado en carga-clubes.
São Paulo | "Direitos de transmissão de TV/Premiações" combinada | (a) | Línea que junta dos conceptos: entera a broadcasting + incluidoEn {competition_bonus:'broadcasting'}. Desglose real: (c) opcional.
Santos | Deuda financiera mezcla préstamos con factoring de la Fed. Paulista | (a) | Regla de factoring: se lee la nota; si el documento la llama deuda financiera/con recurso entra en grossDebt (CONVENCIONES-DATOS). Línea más angosta disponible, documentado.
Santos | Caja extremadamente baja (R$170 mil) | (z) | La propia sección lo confirma con el Relatório da Administração (crisis de liquidez); no es duda de carga.
Santos | "Receitas com manutenção e frequência" como member_dues | (a) | Ligada al programa Sócio Rei (Nota 7.1): member_dues por inferencia documentada; si se quiere certeza, incluidoEn posible:true. Cerrada.
Internacional | "Realização da cessão por direito de exploração" ingreso other_income | (a) | Genérico y específico del club -> other_income (SKILL.md sec.1). Por qué es ingreso: contable, no cambia la categoría. Cerrada.
Internacional | "Estacionamento" a other_income | (a) | SKILL.md sec.1: estacionamiento explícitamente en la fila "todo lo demás"; stadium_other solo si el rótulo nombra el estadio. Cerrada.
Internacional | Notas 22 y 23 2025 no suman (R$20 mil y R$1 mil) | (a) | Ruido de redondeo/error de la fuente; mismo tratamiento que el ruido documentado en los 20 clubes (tie-out cierra con redondeo). Sin acción.
Fluminense 2025 | Opinión con salvedad BDO (R$110,4 M) | (z?) | Es dato de dictamen (registro de auditoría, CONVENCIONES-DATOS "el dictamen del auditor"), no de carga; la pregunta de versión corregida es sourcing. Solo verificar que la línea esté en auditoria-proceso/registro.
Fortaleza | "Luvas" R$1,133 M | (c) | Sin categoría clara; podría ser bono de fichaje. Cargada other_income conservador; solo el club confirma. Inmaterial.
Fortaleza | "Multas rescisórias de atletas" simétrica ingreso/gasto | (a) | Cargada other_income/other_expenses; consistente con tratar penalidades contractuales como catch-all. Cerrada.
Bahia | "Sócios e bilheteria" nunca se separan | (a) | Caso citado textual en la regla incluidoEn: `{ member_dues:'matchday_competition' }` (CONVENCIONES-DATOS). Cerrada.
Bahia 2024 | Amortización de pases 2024 sin desglose; proxy "Custos com negociação" | (a) | Cruce con la reexpresión del año siguiente (2025 Nota 2.20): documentado como inferencia. Precedente SKILL.md sec.6 punto 5 (cuidado: usar columna del año; acá se usó comparativo de forma consciente, documentarlo). Cerrada.
Chapecoense 2021 | 3 lecturas del resultado (-59,564 / -59,184 / -59,872) | (a) | Fuente inconsistente: officialPAT = el valor que concilia con lo cargado (SKILL.md sec.6 puntos 1-2); evidencia en carga-clubes/chapecoense-br.md. El mail al club es opcional (c).
Chapecoense | Empréstimos circulante 10,837 (imagen) vs 8,310 Nota 18 | (a) | Se usó la Nota 18 (texto nativo con desglose). Cerrada.
Vasco da Gama 2023 | PECLD con OCR degradado, +0,020 M vs -3,229 | (a) | Reconstruido por reconciliación (SKILL.md sec.6 punto 2 y referencia/leer-pdf.md, fila acumulada). Inmaterial; releer PDF opcional.
Ferro Carril Oeste | "Recupero Decreto 1212/03" ($82,6 M y $184,0 M) | (c) | Mecanismo no explicado en ningún balance; cargado other_income conservador. Consultar club/AFA; googlearlo primero (el decreto 1212/03 es público). No frena.
RCD Mallorca | "Cesiones" 233.000€ en other_income vs player_sales (Getafe sí) | (b) | Pregunta: ¿ingresos por cesión (préstamo) de jugadores van a player_sales en todos los clubes españoles INFUT, aplicado retroactivamente? Hay precedente a medias (Getafe sí, Mallorca no): hay que unificar.
Real Oviedo | "Deterioro y resultado por enajenaciones" a profitOnPlayerSales sin la palabra "jugadores" | (a?) | Mismo slot P&L INFUT que Mallorca/Rayo (que dicen jugadores): criterio de posición en el esquema, igual que Köln/HGB. Confirmar con la Nota de Inmovilizado (leer .md) antes de dar por cerrada: si no la hay, es (b).
Rayo Vallecano | Salvedad de auditoría (derecho de uso del estadio) | (z) | Es un dato de dictamen (registro de auditoría); la propia sección dice que no afecta ingresos/gastos/PAT. El sitio no carga el activo no corriente en detalle.
Rayo Vallecano | netInterest por residuo (-43.409,90€) | (a) | Método estándar de ancla por partida doble (SKILL.md sec.6 punto 2 + referencia/leer-pdf.md); releer pág.10 del PDF es verificación, no criterio.

TOTALES
(a) = 47 (incluye 8 con "?")
(b) = 8
(c) = 9
(z) = 4 (más 1 (z?))

## Bloque 5 (líneas de dudas-por-club.md)
Millonarios | Nota 23 costo deportivo+tienda/academias todo a wages_squad | (c) | Desglose no sale del documento; solo el club lo tiene. No bloquea.
Deportivo Pereira | "Ingreso por actualización derecho DIMAYOR" a other_income | (a?) | Ya cargado en other_income para cerrar contra resultado impreso; solo quedaría revisar si se repite en otro club colombiano (mirar CONVENCIONES-DATOS.md por partidas no operativas / revalorizaciones; falta verificar).
Deportivo Pereira | "Trayectoria deportiva" wages_squad vs player_amortisation | (b) | Pregunta: un bono de fichaje/trayectoria pagado a jugadores/técnicos sin contrato de pase, ¿es sueldo (wages_squad) o amortización de pases?
Deportivo Pereira | "Regalías" ingreso categorizada por descarte | (c) | No se infiere de la fuente; confirmar con el club de qué es (hoy sponsorship_commercial).
Deportivo Pereira | Gotcha PDF Supersociedades con tablas como imagen | (z) | Es una nota de tooling, ya resuelta (re-render a 300dpi); candidata a leer-pdf.md si no está. No es duda de carga.
Ponte Preta | 2024 línea Depreciação/Contingência/Pept/CNRD reconstruida (-22.168.194) | (a?) | Precedente: reconstrucción por reconciliación + evidencia cruzada (pasivo nuevo Pept/CNRD R$20,9M) ya documentada en Admin/carga-clubes/pontepreta-br.md; queda re-leer el PDF a mayor resolución (leer-pdf.md). Verificar si ya hay ajuste en ajustes-manuales.jsonl.
Colo-Colo | Balance 2024 rechazado en junta: ¿restatement o solo salvedad? | (c) | No sale de la fuente; es verificación contra prensa/CMF (abril-mayo 2025), no criterio. Caso borde de sourcing.
Universidad Católica | "Ingresos por Derechos de TV" vs "Ingresos por A.N.F.P." (2 líneas TV) | (c) | Ambas ya en broadcasting; solo el club/CMF puede aclarar qué es la segunda línea. No cambia la categoría.
Universidad Católica | "Gastos de Operación" Nota 20 sin desglose en other_expenses | (a?) | Precedente: rubro sin desglose va a other_expenses / lump (CONVENCIONES-DATOS.md, falta citar línea); pedir desglose al club es opcional.
Universidad Católica | 2025: Nota 20 trae la tabla equivocada, costo de ventas "No declarado" | (c) | Ya decidido por Guido (cargar sin desglose y pedir Nota 20 correcta al club); falta solo la respuesta del club. Candidata a (z) si ya está cargado así en data/cl/.
Alianza Lima | "Gastos deportivos: Servicios" como match_organisation_expense | (a?) | Nota no la abre; criterio de rubro ambiguo ya cargado. Mirar club-data-mapping/referencia/casos-por-pais-y-formato.md (Perú) y data/pe/alianzalima-pe-data.js; si no hay regla, (c) para el auditor.
Alianza Lima | Notas 2022-2024 sin transcribir (otros ingresos/costos en lump) | (z) | No es duda al club; es tarea de transcripción pendiente (Admin/TODO.md). Excluible.
Wolverhampton | Ejercicio 2025 de 13 meses: ¿nota visible en el sitio? | (a?) | Precedente a buscar: períodos raros/transición en CONVENCIONES-DATOS.md (ejercicios no de 12 meses, campo meta de período); si no hay regla de mostrarlo en pantalla, (b): ¿se marca en el sitio un ejercicio de duración distinta de 12 meses?
Aston Villa | Cuentas individuales sin intangibles, 93% opex en lump_football_operations_expense | (z) | La propia sección lo cierra: estructura societaria real, nada que preguntar. Solo nota de lectura.
Brentford | 2023-24 total de intereses (6,020) no reconcilia; se usó 5,020 | (a) | Precedente: valor que cierra contra total impreso por error de imprenta/OCR (mismo patrón en Fulham Gate Receipts y Ponte Preta); regla de reconciliar contra el resultado en CONVENCIONES-DATOS.md / leer-pdf.md. Solo falta releer el PDF original.
Newcastle | "Profit on disposal" £128,975m sujeto a revisión de la Premier League | (z) | Es un aviso de que el número puede cambiar en el balance 2025-26; ya cargado tal cual el documento. Nada que resolver ahora.
Fulham | Gate Receipts 2025 valor forzado por el total (15,010) | (a) | Mismo precedente: error OCR 1<->4 ya visto en 2023-24 de Fulham; valor forzado por reconciliación. Releer pág. 24 del PDF.
Fulham | grossDebt: préstamo del dueño sin interés repayable on demand (£44,398m 2024) | (a?) | Aplicar la regla de grossDebt en club-data-mapping/referencia/formato-simplificado.md ("grossDebt"); si la regla no cubre préstamo intra-grupo sin interés, (b): ¿un préstamo del dueño sin interés cuenta como grossDebt?
Fulham | "Compensation" a other_income (colaboración con otros clubes + lucro cesante) | (a?) | other_income como catch-all de ingreso sin categoría clara; opcional confirmar si ligado a Riverside Stand. Verificar regla en CONVENCIONES-DATOS.md.
Leeds | Amortización no-jugador neta crédito por negative goodwill, absorbida en other_expenses | (b) | Pregunta: ¿una reversión de negative goodwill que deja un crédito neto en un rubro de gasto se absorbe en other_expenses (neto) o se muestra como ingreso/línea aparte?
Leeds | FY2024 cambio de dueño a mitad de año, un solo gestionId (49ers) | (b) | Pregunta: cuando el dueño cambia a mitad de ejercicio, ¿el ejercicio va a la gestión vigente al cierre o se parte? (verificar antes si hay regla de gestión por cierre de ejercicio en CONVENCIONES-DATOS.md; si existe, es (a)).
Chelsea | Cost of sales £428,673m entero a wages_squad | (a?) | Precedente: costo de ventas sin desglose; ver reglas de lump/"No declarado" (Universidad Católica 2025 se cargó "No declarado"). Verificar si aplica lump_football_operations_expense en vez de wages_squad; si hay dos criterios, (b).
Chelsea | Gap £1,646m entre P&L (-224,344) y notas (225,990) amortización/deterioro | (a) | Precedente: se usa el número del P&L porque cierra el resultado (regla de reconciliar contra resultado impreso, CLAUDE.md "Precisión antes que velocidad"). El origen de la diferencia no sale del documento.
Chelsea | grossDebt:0 excluyendo transfer fee payables £396,135m | (a) | Resuelto por regla: referencia/formato-simplificado.md, "grossDebt" (criterio estricto, payables por pases no son deuda). Es una variante de criterio alternativo; no reabrir sin votación.
Brighton | Restatement 2024 por impuesto diferido: ¿cifra original (56.065) o restated (73.369)? | (a) | Precedente citado en la propia duda: "cada ejercicio usa su propio documento primario" (reexpresiones Argentina); buscar la regla escrita en CONVENCIONES-DATOS.md/fx.md. Si no está escrita para correcciones de error contable, (b): ¿restatement por corrección de error contable usa la cifra original o la restated?
Feyenoord | "Partnerships, business seats, units en boarding" 45,238M€ entera a sponsorship_commercial | (c) | El documento no la abre; solo el club puede decir la proporción business seats (season_tickets) vs publicidad. Ya cargada por el rótulo principal.
AZ | "Verhuur spelers en detachering personeel" a other_income | (z) | La propia sección la cierra (monto chico, mixta, no amerita mail).
Países Bajos | Cuotas sociales/Educación/Otras secciones en $0 para los 4 clubes | (z) | La propia sección lo confirma: sociedades N.V./B.V. sin negocio no-futbolístico; no es hueco de categorización.
Hoffenheim | officialPAT: línea 16 (Konzernverlust) vs línea 14 (antes de asignación al partner silencioso) | (b) | Pregunta: cuando el resultado consolidado se asigna a un partner silencioso por cláusula contractual de absorción de pérdidas, ¿officialPAT es el resultado antes o después de esa asignación? (precedentes divergentes: Stuttgart NCI real vs Augsburg/Frankfurt antes de NCI).
Hamburger SV | GuV garbled; tax es PLUG, grossDebt/cash no cargados | (a?) | Precedente: reconstrucción por Lagebericht + plug contra Jahresüberschuss impreso (patrón Ponte Preta/Brentford); queda releer PDF pp. 4-6 (leer-pdf.md). Verificar si carga-clubes/hamburgersv-de.md ya dejó grossDebt/cash como pendiente en TODO.
Mönchengladbach | Sonstige betriebliche Erträge + Finanzergebnis combinados a other_income, netInterest:0 | (a?) | Plug por diferencia contra "11. Ergebnis nach Steuern", simplificación documentada; precedente de plug en Hamburger SV/Bayern. Si se quiere regla explícita de combinados irresolubles, (b); falta releer la página de la GuV.
Bayern | netInterest/tax reconstruidos como residuales (comunicado oficial condensado) | (a) | Precedente: Hamburger SV (tax plug) y regla de reconciliar contra EBT/Jahresüberschuss; cierra con redondeo <=0,1 M€. Solo se mejora con un Jahresabschluss completo (no hay).
Bayern | Einzelabschluss (908,1) vs Konzern (951,5) | (b) | Pregunta: para clubes alemanes con Einzelabschluss y Konzern distintos, ¿se carga el que tiene desglose por rubro (Einzel) o el consolidado? (verificar antes si CONVENCIONES-DATOS.md fija el perímetro por defecto; si sí, (a)).
Bayern | verifyTieOuts NO CIERRA 0,1 M€ en 3 checks | (z) | La propia sección lo explica: redondeo a 1 decimal de la fuente; documentado en carga-clubes/bayernmunich-de.md. Verificar que la tolerancia/ajuste de tie-out esté en el código.
Excluidas por sourcing/gestiones: LDU Quito (2 dudas), Club Deportivo Cuenca (2 dudas), Newcastle % PIF/Reuben, Crystal Palace firstYear gestión, Alianza Lima transcripción pendiente (listada como z).
Total (a): 6 (Brentford, Fulham GateReceipts, Chelsea gap, Chelsea grossDebt, Brighton, Bayern netInterest) | (a?): 10
(b): 6 (Pereira Trayectoria, Leeds negative goodwill, Leeds gestión, Hoffenheim, Bayern perímetro, y condicionales Wolves/Fulham grossDebt/Brighton)
(c): 5 (Millonarios, Pereira Regalías, Colo-Colo, UC TV, Feyenoord) + UC 2025 Nota 20 | (z): 7 (Pereira gotcha, Alianza transcripción, Aston Villa, Newcastle, AZ, Países Bajos $0, Bayern tie-outs)

## Bloque 6 (líneas de dudas-por-club.md)
Bloque L1558-2004. Excluidas: sourcing (Instituto, River período, Europa del Este, Almagro-mail), gestiones (Juve Stabia, tanda gestiones L1944-1987 y OFI), mails/archivos extra (Los Andes y Botafogo-SP años sin cargar, Bayern pedido de documento).
Nota: sin Grep/Bash no pude abrir ajustes-manuales.jsonl ni data/; los (z?) y (a?) dicen qué falta mirar.

Croacia (HNS) | Članarine dentro de Prihodi od ulaznica -> member_dues | (a) | Línea de socios dentro de entradas: CONVENCIONES-DATOS "una línea que junta dos conceptos" (L302-317): si el rótulo es solo socios, member_dues literal; si junta, entera a la principal + incluidoEn.
Bélgica (Anderlecht/Genk/Gent) | Andere bedrijfsopbrengsten mezcla plusvalía y retención | (a) | Línea que junta dos conceptos, entera a la principal + incluidoEn (CONVENCIONES-DATOS L302-317); Omzet sin desglose va a lump_football_operations (L109-119).
Dinamarca FC København | TV- og præmie-indtægter -> broadcasting | (a) | Mismo precedente de línea mixta: entera a la categoría principal + incluidoEn (CONVENCIONES-DATOS L302).
Dinamarca København/Brøndby | alquiler inmuebles -> other_income | (z) | Criterio conservador de stadium_other ya en club-data-mapping SKILL.md sección 1 (CONVENCIONES-DATOS L191-193); la propia duda dice que solo cambia con evidencia.
Brøndby 2020 | Entré-, TV- og præmieindtægter -> broadcasting | (a) | Línea mixta entera a una categoría + incluidoEn; la propia duda lo marca decisión puntual.
Osijek | Troškovi za nenogometne djelatnosti -> admin_general_expense | (a?) | Catch-all por descarte (SKILL.md club-data-mapping sec. 1); falta mirar si la regla de "otros deportes/no fútbol" manda a other_sports_expense.
Slaven Belupo | Prihodi od ulaznica entradas+abonos juntos | (a) | Línea mixta: entera a matchday_competition + incluidoEn season_tickets (CONVENCIONES-DATOS L302).
Slaven Belupo | Komercijalni prihodi od članstva -> member_dues | (b) | Criterio nuevo: ¿"ingreso comercial de membresía" es cuota social o comercial? Votar rótulo ambiguo.
AGF | Entré- og tv-indtægter -> broadcasting | (a) | Línea mixta entera + incluidoEn (CONVENCIONES-DATOS L302).
AGF | grossDebt solo leasing IFRS16 | (b) | Criterio nuevo: ¿el pasivo de leasing IFRS16 es grossDebt cuando no hay préstamos? Revisar fx/otras reglas de deuda (no hay regla en CONVENCIONES-DATOS; solo factoring L416 y convertibles L401).
Silkeborg | grossDebt 0, Payables to shareholders | (b) | Criterio nuevo: ¿deuda con accionistas sin etiqueta de préstamo es grossDebt? Misma familia que Botafogo-SP y SønderjyskE.
Viborg | Vareforbrug mezcla mercadería y cesiones de jugadores | (a) | Línea mixta: entera a una categoría + incluidoEn (CONVENCIONES-DATOS L302).
Viborg | Andre driftsomkostninger | (z?) | Sin monto propio separable; queda en other_expenses. Falta mirar carga-clubes/viborg-dk.md.
Viborg | Nettoomsætning sin desglose -> lump_football_operations | (z) | Regla "bolsón sin desglosar" CONVENCIONES-DATOS L109-119; no hay nada que preguntar.
Charleroi | Autres produits d'exploitation 17% sin desglose | (c) | Solo el club puede abrirla; mientras tanto other_income.
Charleroi | gestión 2024/25 sin presidente | (z) | Regla CONVENCIONES-DATOS L433-438: sin fuente pública queda null; no frena.
Mechelen | Andere bedrijfsopbrengsten residuo -> player_sales | (a) | Mismo patrón belga (primer ítem de Bélgica); línea mixta entera a la principal.
Mechelen | intangible Concessies = derechos de jugadores | (b) | Criterio nuevo: ¿interpretación estándar VOL-kap alcanza para player_amortisation? Falta precedente belga; revisar Dender (mismo caso, la deja en depreciation).
Antwerp | Andere bedrijfsopbrengsten 46M ¿plusvalía? | (c) | Solo el club puede abrirla; Omzet sin desglose: lump_football_operations (L109-119).
Ceará | Venda de direitos de participação -> other_income | (b) | Criterio nuevo: venta de derechos de TV a fondo (one-off): ¿other_income, broadcasting o exceptional_items?
Ceará | Receitas com Eventos -> other_income | (z) | Criterio conservador stadium_other (SKILL.md sec. 1; CONVENCIONES-DATOS L191-193).
Ceará | Sócio Torcedor/Tributos/Outros agregado 2024 | (c) | Si no se ve en la fuente, el club o un PDF mejor; si hay otro motor de lectura (leer-pdf.md) re-extraer la Nota 24 antes de preguntar.
Sport Recife | Nota 21 sub-ítems -46.696 vs DRE -35.739 | (z) | Se cargó el valor del DRE que cierra contra el déficit auditado (tie-out, CLAUDE.md "Precisión"); la diferencia queda registrada.
Sport Recife | footnote (i) sin texto | (c) | Solo el club/auditor.
Godoy Cruz | Ingresos Varios AFA -> other_income | (a) | Rótulo ambiguo: other_income conservador (SKILL.md sec. 1).
Godoy Cruz | Fútbol Amateur -> youth_football | (a?) | Falta mirar SKILL.md sobre "amateur"/inferiores; probable (a).
Godoy Cruz | Rescisión / Derechos de Tanteo -> player_sales | (b) | Criterio nuevo: derecho de tanteo sin precedente.
Godoy Cruz | Cargas Sociales standalone -> wages_squad | (a) | Racing: costos no salariales bundle-ados con salarios (formato-simplificado.md, "CASO CONSULTADO").
Los Andes | "futbol" y "Ingresos Afa" cargados a matchday/broadcasting | (a) | Mismo precedente argentino que Godoy Cruz/Almagro: AFA derechos de TV -> broadcasting; "Ingresos Afa" sin más detalle quizá other_income (falta mirar casos-por-pais-y-formato.md, Argentina).
Coritiba | Otros ingresos 68% por cesión 20% derechos Liga Forte União | (b) | Criterio nuevo: ¿categoría o línea para venta de derechos comerciales (Ceará, Coritiba, Cruzeiro)? Conviene votar junto con Ceará.
Chapecoense 2017 | Serviços Terceiros -> admin_general_expense | (a) | Default conservador, sin nota; SKILL.md sec. 1.
Chapecoense 2017 | Premiação do Ano -> other_expenses | (a) | Idem, concepto no aclarado.
Bayern 2020/21 y 2022/23 | D&A combinado con resultado financiero | (a?) | Falta mirar si aplica REGLA D&A junta (CONVENCIONES-DATOS L425): si no se abre por notas, entera a player_amortisation con incluidoEn.
RB Leipzig 2022/23 | Sonstigem catch-all probablemente con transferencias | (a) | Catch-all a other_income; línea mixta entera + incluidoEn (L302).
Amazonas | Receita/Custo de atividades esportivas sin notas | (z) | Regla bolsón lump_football_operations (CONVENCIONES-DATOS L109-119); el pedido de documento con notas es sourcing.
Juventude | Receitas Patrimoniais -> other_income | (a) | Conservador stadium_other (SKILL.md sec. 1).
Juventude | Remuneração ... e amortização en una línea | (a) | REGLA D&A junta / línea mixta (CONVENCIONES-DATOS L302 y L425): si las notas no abren, entera a wages_squad + incluidoEn.
Juventude | Receita Loteria Esportiva -> other_income | (b) | Criterio nuevo: ¿categoría propia si aparece en más clubes? Hoy other_income; votar solo si hay más casos.
Botafogo-SP | grossDebt: Partes Relacionadas vs leasing | (b) | Criterio nuevo: préstamos de partes relacionadas sin interés explícito y leasing IFRS16 como grossDebt (mismo grupo AGF/Silkeborg/SønderjyskE).
Cruzeiro | migrar 2022 a la versión Reapresentado | (b) | Criterio nuevo: ¿se carga el original o el reexpresado? CONVENCIONES-DATOS L326: "un comparativo reexpresado no es la transcripción del año"; vale el del propio documento. Mismo caso que Botafogo 2024 -> decidir una regla.
Botafogo (RJ) | 2024 reexpresado en el balance 2025 | (b) | Misma pregunta que Cruzeiro (reexpresión): votar una vez. Precedente tentativo: cada año con su propio documento (CONVENCIONES-DATOS L326).
Standard Liège | Autres produits d'exploitation 52% sin explicar | (c) | Solo el club; mientras tanto other_income.
Union Saint-Gilloise | Subsides d'exploitation 10M | (c) | Solo el club (¿a qué corresponde?); other_income. Re-verificar OCR de Nota 6.10 contra el PDF es tarea de lectura (leer-pdf.md).
Westerlo | split de Andere bedrijfskosten y residuo 3.058 | (a) | Residuo de redondeo cae en other_expenses; split inferido por OCR (leer-pdf.md).
Zulte Waregem | residuo Andere bedrijfsopbrengsten 7,5% | (c) | Sin desglose; other_income.
Zulte Waregem | ¿venta de laatste commerciële ruimte? other_income | (z) | Ya resuelto: other_income conservador, no exceptional_items (según el CHANGELOG que la propia duda cita).
Sint-Truiden | Andere bedrijfsopbrengsten 44% -> other_income | (c) | Plausible player_sales sin confirmación: solo el club confirma (a diferencia de Anderlecht/Genk/Gent, que traen narrativa del Jaarverslag).
Sint-Truiden | Niet-recurrente bedrijfskosten sin explicar | (c) | Solo el club; mientras tanto exceptional_items o other_expenses (falta mirar la carga).
Cercle Brugge | Andere bedrijfsopbrengsten 56% sin desglose | (c) | Igual que STVV. Condonación condicional de Monaco y hechos posteriores: no se cargan (fuera de balance).
Dender EH | Overige bedrijfsopbrengsten residual implícito | (a) | Valor despejado, se carga residual a other_income; fórmula Brutomarge.
Dender EH | intangibles ¿derechos de jugadores? -> depreciation | (b) | Misma pregunta que Mechelen: ¿se asume player_amortisation sin confirmación textual?
Dender EH | nota de continuidad NV Dender Foot | (c) | Es contexto de perímetro futuro; la entidad la define REGLA entidades (CONVENCIONES-DATOS L351-364, registro entidades.jsonl).
FC Fredericia | sin duda crítica | (z) | No hay duda; no requiere acción.
FC Nordsjælland | discrepancia 1,49M DKK en D&A | (c) | Solo el club/auditor; se carga el estado de resultados.
FC Nordsjælland | desglose de Nettoomsætning | (z) | Exención §32 sin desglose: lump_football_operations (CONVENCIONES-DATOS L109-119).
Randers FC y Vejle | resultado de participaciones sumado a netInterest | (b) | Criterio nuevo: ¿el resultado de subsidiarias va a netInterest, a other_income o necesita campo meta?
SønderjyskE | formato agregado §32 / cargar 2013-2021 | (z) | Mismo caso que FC Nordsjælland: lump_football_operations. Cargar otro ejercicio es decisión de alcance, no de criterio.
SønderjyskE | grossDebt excluye deuda con vinculadas y Anden gæld | (b) | Mismo grupo de grossDebt (AGF/Silkeborg/Botafogo-SP): ¿deuda con partes relacionadas cuenta?
SønderjyskE | nota de clase contable §32 vs Superliga | (z) | La propia duda ya la aceptó (régimen vigente a la firma); la liga es la del cierre (CONVENCIONES-DATOS L121-128).
Istra 1961 | Ostali neposlovni prihodi en assetSales | (a) | Se cargó en assetSales solo para cerrar; si no se explica, other_income (SKILL.md sec. 1).
Istra 1961 | Isticanje pitanja (litigios) sin cuantificar | (c) | Solo el club/auditor; no mueve la carga.
Istra 1961 | grossDebt/cash en 0 por no OCR | (z?) | Es trabajo de lectura (leer-pdf.md, Tesseract), no criterio. Falta mirar si ya se cargó; si no, "sin dato" (CONVENCIONES-DATOS L68-75).
Gorica | 10.000 EUR sin atribuir por gaps de OCR | (z?) | Lectura (leer-pdf.md); no criterio.
Gorica | grossDebt piso, gap 610.000 EUR | (z?) | Re-verificar contra el PDF renderizado (leer-pdf.md); sin dato mientras no cierre.
Botafogo (RJ) | Nota 19 parcelamentos legado associação -> other_expenses | (b) | Criterio nuevo: deuda legado de la associação transferida a la SAF (otros SAF brasileños).
Botafogo (RJ) | gestión SAF | (z) | Regla gestión null (CONVENCIONES-DATOS L433-438).
Salernitana | copia legible del conto economico 2022 | (z) | Ya resuelta: CONVENCIONES-DATOS L326-328 (Salernitana 2022, comparativo reexpresado); queda el pedido de copia, que es sourcing.
Volos NFC | personal 2019-20: 206.287 vs 481.982 | (z) | Se cargó el valor de su propio documento (481.982,86) y no se tocó; CONVENCIONES-DATOS L326 (cada año con su documento).
PAOK | "Αμοιβές τρίτων" 42 M -> wages_squad | (c) | Decisión de Guido 2026-10-14 ya tomada (wages_squad); la confirmación solo la da el club.
Rio Ave 2016-17 | reparto de ingresos estado vs nota 22 | (z) | Ya resuelta: se cargó el reparto del estado, como la serie 2017-18 (precedente: el estado de resultados manda sobre la nota; CONVENCIONES-DATOS L326).
Sarpsborg 08 | Salgskostnader 65,8 M NOK -> other_expenses | (c) | Solo el club (¿costo de venta de jugadores o de mercadería?).
FC St. Gallen | Diverse Erträge inkl. SFL 9.512 -> other_income | (c) | Solo el club (reparto TV/premios); other_income conservador (línea mixta, L302).
FC St. Gallen | Erträge von Gönnern und Mitgliedern -> member_dues | (b) | Criterio nuevo: línea que mezcla cuotas y donaciones: ¿member_dues entera + incluidoEn, o other_income?
Paide Linnameeskond | Stipendiumid/Toetused -> wages_squad | (a) | Precedente: pagos a deportistas de Nõmme Kalju y Flora (2026-10-18).
FCI Levadia | Liikmemaks -> admin_general_expense | (a) | Cuota que el club paga: gasto administrativo; precedente en la propia duda (2026-10-18).
Colo-Colo (Blanco y Negro) | Nota 21: 10.955.346 vs 10.838.114 | (z) | Se carga el valor del estado (tie-out contra el estado de resultados, CLAUDE.md "Precisión"); falta del club solo para curiosidad.
Juventude 2021 | dónde están las mensalidades del sócio-torcedor | (b) | Criterio nuevo: ¿se asume una línea ("Outras Receitas") para el sócio-torcedor sin desglose? Hoy en other_income/incluidoEn posible (CONVENCIONES-DATOS L310).
Ponte Preta 2025 | ¿Social / Outras = mensalidades? | (a) | Línea "Social" -> member_dues con incluidoEn posible; precedente: América Mineiro "atividades sociais" (CONVENCIONES-DATOS L309-311).
SK Rapid Wien 2016/17 | Geschäftsergebnis+Transfer ≠ Jahresergebnis, diferencia 62.001 e impuestos diferidos +4,7 M | (a?) | Falta ver el .md (L1535-1546): si el resultado impreso está y las líneas no cierran, se carga el valor impreso (CLAUDE.md "Precisión", L326); si hay que reconstruir el signo de "Steuern aus Erträgen", ajuste manual `fila`. Revisar antes de preguntar al club.

Total (a): 17
Total (b): 17
Total (c): 16
Total (z): 20 (más 8 con "?" contados aparte: a? = 5, z? = 4)

