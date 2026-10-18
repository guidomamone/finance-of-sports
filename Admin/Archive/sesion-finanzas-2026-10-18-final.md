> ARCHIVADO (Versión 724, 2026-10-18): cierre de la sesión finanzas (worktree fos-finanzas), pasado a TODO, CHANGELOG, ESTADO y CONVENCIONES-DATOS. La sesión cerró.

# Sesión `finanzas` (worktree fos-finanzas): cierre para la principal

## Qué cambió (para CHANGELOG)

- To-do 280 a, el dato de la estructura de cada club: registro `Admin/registros/entidades.jsonl` (entidades, relaciones y cargas, cada
  línea con una cita del `.md` o, si el balance no lo dice, una cita externa con url y fecha) y `tools/entidades.mjs`, que verifica las
  citas, que cada carga sea del documento de ese club y año (`quien.mjs`), los ids y los ciclos de control, y genera `data/entidades/<país>.js`
  y `data/entidades/_grupos.js`. `audit.js` lo corre como generador (`entidades-desfasado`, P1). Primeros casos: Chelsea 2025 (cadena hasta
  Blues Investment Holdings Parent, L.P.; grupo BlueCo con Strasbourg y Chelsea Women) e Inter 2025 (Oaktree, Grand Tower; M-I Stadio al 50 %
  fuera del consolidado).
- To-do 280 b: Finanzas tiene la tarjeta "De quién son estos números" (`js/finanzas-estructura.js`, `#finEstructura`, link "Estructura"
  en el índice de la página, entre "En otra liga" y "Fuentes"). Muestra, del ejercicio elegido más nuevo con estructura cargada: la
  entidad y su perímetro, la cadena de dueños hasta el último, las controladas dentro de los números, las relacionadas y los clubes del
  mismo grupo fuera, y la nota para periodistas; "El dueño, ejercicio por ejercicio" cuando hay estructura de más de un año. Sin datos
  del club, la tarjeta y el link se esconden. Mockup aprobado: artboards "Finanzas · estructura del club" de "Pantallas FoS".
  `index.html` carga eager `data/entidades/_grupos.js` (`GRUPOS_INDICE`, `ENTIDADES_PAISES`); `js/principal.js` suma una línea en
  `refreshFinanzas()` (no toca el bloque de la URL).
- To-do 280 c: página del grupo multiclub (`js/grupo.js`, sección `#grupo`, `window.GRUPO_VIEW = { show, abrir, current, refresh }`).
  Arriba, el grupo, su país y su dueño último, con su link al balance; tabla de clubes controlados (link a los del sitio, "sin balance"
  los demás, liga del sitio o país, desde qué ejercicio, ingresos del último año, de dónde sale); participaciones de 50 % o menos
  aparte; gráfico de barras apiladas por año (M USD, formato simplificado), cuántos clubes con balance de cuántos por año, y el aviso de
  que no es un consolidado. Los ingresos los copia `tools/entidades.mjs` de `data/rankings/` a `_grupos-detalle.js` (se baja al abrir un
  grupo), sin recalcular. Se llega desde la tarjeta Estructura (nombre del grupo, en la frase y en su caja). ASSET_V 1257.

- To-do 281, el dato: línea `ingresos` en `Admin/registros/entidades.jsonl` (los renglones de ingresos citados de una entidad que no se
  carga ese año; la suma da el total) con su chequeo en `tools/entidades.mjs`, que los publica en `data/entidades/<país>.js`. Piloto
  Portugal: Vitória 2021/22 (la asociación tiene 65,8 % de la SAD; ingresos 4,57 M €), Tondela (año calendario 2021, 0,37 M €) y Braga
  (36,98 % en 2020/21 y 36,99 % en 2022/23; ingresos 2020/21, que el sitio no muestra porque la SAD 2020/21 no está cargada). Rio Ave
  2014-15 queda afuera: ese año de la SDUQ no está cargado.

## Decisiones de Guido (2026-10-18), para CONVENCIONES-DATOS

- Ingresos de una entidad que no se carga (to-do 281): todos los renglones de ingresos de su estado de resultados, sin la ganancia por su
  parte de la sociedad que se carga (en Portugal, "Ganhos imputados de subsidiárias"), que se contaría dos veces. Con la misma moneda y
  el mismo cierre que el club, se muestra qué % son de los ingresos del club.

- El total de un grupo multiclub suma solo los clubes que el grupo controla (más del 50 %); las participaciones menores se listan aparte.
- La pertenencia de un club a un grupo puede citarse con una fuente externa (url y fecha) cuando el balance no lo dice.
- Un dueño persona (Marinakis, Friedkin) cuenta como grupo, igual que una empresa, con el nombre que imprimen los documentos.

## Qué queda (para TODO)

- 280: el registro tiene 2 clubes (ya es el to-do 294 en main, commit 275d3ec7a). Faltan los otros ejercicios de Chelsea e Inter (Suning antes de 2024), Portugal (los avisos de
  `node tools/entidades.mjs`), los casos de `cola-borradores/altas-2026-10-17.md` cuando esos clubes estén publicados, y los grupos con dos o
  más clubes cargados (City Football Group, Marinakis, Friedkin, 777 Partners, Eagle Football).
- CONTRATO CON fos-pantallas (acordado 2026-10-18; lo engancha pantallas después de mergear esta rama):
  - URL `?tab=grupo&grupo=<grupoId>` (p. ej. `blueco`). El lector de URL ("EL ESTADO EN LA URL" de `js/principal.js`: `URL_CLAVES`,
    `estadoActual()`, `aplicarURL()`) lo toca solo pantallas (to-do 271): finanzas no lo edita.
  - HECHO por finanzas: la sección `#grupo` y su botón en `#mainNav` (`hidden`, y el CSS lo saca del menú aunque `applyClubMode()` le
    saque el `hidden`), y `js/grupo.js` con `window.GRUPO_VIEW = { show(grupoId) -> Promise, current() -> { grupo } }`.
  - FALTA de pantallas: `grupo` en `URL_CLAVES`/`estadoActual()`/`aplicarURL()` (hoy la URL queda `?tab=grupo` sin el id) y `grupo` en
    `TABS_SIN_CLUB` de `js/principal.js` (sin eso, abrir un grupo sin club elegido, desde el buscador, rebota a Inicio).
  - Buscador: `data/entidades/_grupos.js` es `window.GRUPOS_INDICE = [{ id, nombre, alias, clubIds }]`, chico y eager (ya lo genera
    `tools/entidades.mjs`; el detalle va aparte en `_grupos-detalle.js`). Pantallas suma el resultado "Grupo" en `js/selector.js`, que llama a
    `GRUPO_VIEW.show(id)`.
- 281: los ~17 documentos de entidades de clubes portugueses publicados sin transcribir (Porto 3, Braga 2022-23, Marítimo 5,
  Belenenses, Chaves, Vizela 2, Académica, União de Leiria), por subagentes, y después su línea de ingresos. La pantalla del 281, con
  mockup (artboard "Vitória y Tondela (to-do 281)").
- 282, 242 sin empezar.
- Visto de paso (para el 294): Qatar Sports Investments (dueño del PSG) tiene 29,60 % de la Braga SAD (Relato_rio-Contas-2022-23-SAD.md
  L1613): participación menor de un grupo multiclub.

## Para PANTALLA (excepción aprobada por Guido, 2026-10-18)

- Excepción a "la fuente NUNCA va adentro de un card": la tarjeta Estructura (y la página del grupo) lleva, en cada entidad, un link
  "ver en el balance" (o "ver en <dominio>" para una cita externa) a la transcripción, sin la palabra "Fuente:". La cita por entidad es
  el dato que pide el periodista.

## Qué deja de ser cierto en ESTADO

- "Finanzas multi-año": suma la tarjeta Estructura (de quién son los números, dueños y grupo), desde `data/entidades/`.

## Después del merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 281, la pantalla: la tarjeta Estructura muestra, en la entidad que no se carga, sus ingresos del mismo ejercicio ("Ingresos
  2021/22: 4,57 M EUR · equivale al 19,6 % de los ingresos de <la SAD>", con "ver los ingresos en el balance"). El % sale solo con la
  misma moneda y el mismo cierre (contra `officialTotalRevenue` del club); con otro cierre dice "Ingresos del ejercicio cerrado el
  31/12/2021" y que no se compara. También: los accionistas con participación menor de la entidad cargada (la asociación de Braga, 36,99 %)
  aparecen en "Relacionadas, fuera de estos números"; con un solo dueño la caja dice "Dueño"; sin dueños registrados el título es "La
  entidad de estos números". Mockup aprobado: artboard "Vitória y Tondela (to-do 281)" de "Pantallas FoS". ASSET_V 1260 en la rama
  (el merge lo resuelve con main).

### Qué queda (para TODO)

- 281: transcribir por subagentes los ~17 documentos de entidades de clubes portugueses publicados (Porto 3, Braga 2022-23, Marítimo 5,
  Belenenses, Chaves, Vizela 2, Académica, União de Leiria) y cargar su línea de ingresos (va con el 294, que da de alta las entidades).
- 282 y 242 sin empezar.

### Qué deja de ser cierto en ESTADO

- La tarjeta Estructura de Finanzas suma los ingresos de las otras entidades del club (to-do 281), donde el registro los tiene.

### 282, el dato (piloto)

- Qué cambió: registro `Admin/registros/auditoria.jsonl` (una línea por club y año con balance: auditor y su tipo, dictamen con
  vocabulario provisorio, continuidad aparte, citas del .md) y `tools/auditoria.mjs`, que arma los extractos para el subagente
  (`--extractos`, en `Generados/auditoria/`), lista los pendientes (`--pendientes`), verifica las citas (que el texto esté en su línea y
  que el .md sea de ese club y año) y genera `data/auditoria/<país>.js` y `_paises.js`; `audit.js` lo corre como generador
  (`auditoria-desfasado`, P1). Piloto de 19 balances de 16 países por subagentes Sonnet (criterio común); 2 con salvedades (Académica
  2022, Dinamo Zagreb 2024), 2 con incertidumbre sobre la continuidad (Académica 2022, Vitória 2022), 2 sin informe (Akhmat 2022:
  el formulario del fisco dice "Обязательный аудит: нет"; Amazonas 2024: solo el balance).
- Decisiones de Guido (2026-10-18): el vocabulario del dictamen es provisorio y se ajusta con los casos; un auditor persona va con su
  nombre como lo imprime el documento; la pantalla de Finanzas y de Ligas la hace pantallas, y el pipeline no da de alta un club sin
  esta línea (pedidos a fos-pantallas y fos-pipeline con el contrato).
- Qué queda: los 905 balances restantes por subagentes (tandas por país); Católica 2010: el índice del .md lista el informe de los
  auditores pero la transcripción no lo trae (salta de la pág. 2 a la 3), hay que retranscribir esa parte antes de su línea.
- La entidad que organiza una liga (AFA, LFP; Guido lo aclaró vía pantallas): `tools/auditoria.mjs` acepta líneas con `ligaId` y
  `entidad`, y genera `data/auditoria/_ligas.js` (`window.LIGA_AUDITORIA`, contrato acordado con pantallas). Hoy vacío: no hay en el
  proyecto ningún balance propio de una entidad organizadora (las carpetas `Clubes/*/_…` son informes agregados de liga). Para TODO:
  sourcing de esos balances (AFA, LFP, Premier League, Lega Serie A…), con su informe del auditor.

## Después del segundo merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 282, el registro lleno: `Admin/registros/auditoria.jsonl` cubre 902 de los 925 balances (81 tandas de subagentes Sonnet por país,
  con un criterio común y un verificador de citas). Resultado: 509 sin salvedades, 144 con salvedades, 7 abstenciones, 139 sin informe en
  el documento, 116 con incertidumbre material sobre la continuidad; 42 auditores son personas. `data/auditoria/` regenerado.
- `tools/auditoria.mjs`: código interno `falta_transcripcion` (el documento muestra que el informe existe, pero el .md no lo trae: 103
  casos), que no se publica y cuenta como pendiente; `auditor.nombre` puede ser null si el informe no imprime quién firma (Gimnasia
  2023-2025), con nota.

- 282, informes que faltaban: 30 transcriptos por subagentes solo en sus páginas (archivos nuevos `<pdf>.informe-auditor.md` al lado del
  PDF, o el `.md` del PDF que es solo el informe: Rusia, Salernitana, Lazio 2025-26, Católica 2010), con su línea; los .md validados no se
  tocaron. De los 73 que siguen como `falta_transcripcion`, 72 son "FALTA EN EL PDF": el informe existe pero no está en ningún PDF que
  tenemos (Lazio 2014-2024, Napoli 2018-2025, Torino 2018-2025, Hellas Verona 2020-2025, Cremonese, Roma 2013 y 2022-2025, Juventus 2022 y
  2024, Bologna 2025, Hamburgo 2024-2025, Marítimo, Nacional, Académico de Viseu, Alverca, Casa Pia, Chaves, Rio Ave 2016-17, Vizela 2022,
  Mafra, Felgueiras 2024, San Lorenzo 2012, OFI 2018, Fortaleza CEIF 2025, …); 1 es de transcripción (Spartak 2022: la del subagente se
  descartó por no ser fiel).

### Qué queda (para TODO)

- 282: sourcing de los 72 informes del auditor que no están en nuestros PDF (`node tools/auditoria.mjs --pendientes`, nota "FALTA EN EL
  PDF"); transcribir Spartak 2022 palabra por palabra.
- 281: Chaves 2022-23 trae en Relatorio_Atividades-e-Contas-2022_2023.pdf (págs. 36-39) el informe del auditor de la asociación (RCVM,
  incertidumbre material): sirve para la entidad asociación.
- (viejo, ya resuelto en parte) 282: transcribir los informes que faltan (103 club-años, `node tools/auditoria.mjs --pendientes`: Lazio 2014-2026, Napoli 2018-2025,
  Torino 2018-2025, Hellas Verona, Cremonese, Roma 2013 y 2022-2025, Juventus 2022 y 2024, Racing 2009-2011, 2014 y 2020, Marítimo,
  Académico de Viseu, Rusia (Spartak, Zenit, Lokomotiv, Dynamo Moscú y otros, con el PDF del informe sin transcribir), entre otros) y
  escribir su línea; los 23 balances sin .md.
- (Resuelto en la sesión) Criterio de Guido para el dictamen, aplicado al registro y escrito en el encabezado de tools/auditoria.mjs:
  énfasis de continuidad sin "incertidumbre material" = false (17 corregidos); alcanza el título del párrafo; manda el párrafo de opinión
  sobre el título de la base (5 corregidos: San Lorenzo 2015-16, Remo 2019 y 2025, Aris 2019); abstención parcial = abstencion (San
  Lorenzo 2013). Para CONVENCIONES-DATOS.
- 282: nombres de firma tomados de OCR ruidoso, a verificar contra el PDF (Union SG 2025, Getafe 2024-2025, Elche 2025, Goiás 2008,
  Godoy Cruz 2020); revisores que firman sin ser auditoría plena (Criciúma 2015-2019 "revisión especial", Osijek 2025, Como 2025 revisión
  limitada, Kifisia 2022-2024 estados para licenciamiento, Club América 2025 ficha BMV de Ollamani).

### 294 (en curso al cerrar)

- `tools/entidades.mjs --con <borrador>`: verifica el registro más un borrador sin escribir (para subagentes).
- Diez subagentes llenan el registro de entidades (Inter 2018-2024 con Suning; City Football Group; Marinakis: Forest, Olympiacos, Rio
  Ave; Friedkin: Roma, Everton; 777 y Eagle; Portugal en tres tandas; Benfica; Sporting). Sus borradores quedan en el scratchpad de la
  sesión y se sumaron al registro.
- 294: juntado. El registro tiene 44 clubes con estructura (todos los portugueses con su SAD/SDUQ y el % del club asociación año por año,
  Inter, Chelsea, Man City, Girona, Forest, Olympiacos, Roma, Everton, Genoa, Standard, Vasco, Botafogo, Crystal Palace) y 9 grupos
  multiclub (BlueCo, City Football Group, Marinakis, Friedkin, 777 Partners, Eagle Football, Suning, QSI, Black Knight), 219 entidades y
  326 relaciones, todas con cita verificada. Correcciones al juntar: sin país las entidades cuyo país el documento no dice (la tool ahora
  lo acepta); Rio Ave: el 20 % del club asociación, que ningún documento imprime, pasó a relacionada sin %; Bournemouth con su clubId.
  ASSET_V 1261.
- Para TODO (294): cargas que no entraron porque tools/quien.mjs no saca el año del nombre del PDF (Boavista 2024 `RCSAD-23-24_1-3`,
  Marítimo 2024 `…30jun24`, Portimonense 2022-2025 `Relatorio-Contas-21-22_assinado` y hermanos): falta un ajuste `anio` en
  ajustes-manuales; dudas de los subagentes: Man City (cómo se conecta Manchester City Limited con CFG; Newton Investment como "ultimate
  parent"), Bahía y Yokohama (clubes del sitio que el grupo CFG no lista), la relación Dan Friedkin → The Friedkin Group, la frase del PSG
  en QSI (verificar contra Wikipedia), los clubes externos de 777 sin fecha de salida.
- Para una sesión futura: Spartak 2022 (transcribir el informe palabra por palabra), los 72 informes de auditoría a conseguir, y los casos
  de altas-2026-10-17 en el registro de entidades cuando esos clubes estén publicados.
