# Cierre del worktree pantallas (rama `pantallas`)

Lo completa la sesión del worktree mientras trabaja; la principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- To-do 293: en el estado frío de Ligas cada liga muestra solo su nombre (`botonLiga()` en `js/liga.js`), sin "N clubes · año", que se
  leía como que la liga tenía un solo ejercicio. Botón de 44 px de alto (`.lg-liga` en `css/styles.css`). Mockup aprobado: tableros
  "Ligas · solo el nombre" de "Pantallas FoS". ASSET_V 1254.
- Estimado de club nuevo PRENDIDO (decisión de Guido, 2026-10-18: en Ligas todo club sin balance figura como estimado, aunque tenga 50%
  de error). `tools/estimar.mjs`: todo club de la lista de la liga sin balance ese año (que nunca cargamos, o cargado pero a más de 2 años
  de un real) lleva `caso: "nuevo"`, la regresión sin historia (mediana de la liga-año, división, posición en la tabla); error y rango
  del 80% de una validación por club en 10 grupos (50%, x0,34 a x3,00, igual que `--medir`). Un club que no está en el sitio va por
  nombre (`n`, sin `id`) y su ejercicio es la temporada. `tools/faltantes-liga.mjs` guarda la posición de todos los clubes de la tabla
  (`#<nombre>` si no está en el sitio). De 439 a 4750 club-años estimados en 34 ligas. `--check` sigue en 0,5 s.
- To-do 275: los estimados van en la tabla de ingresos de Ligas, en su puesto por plata, con "(estimado)*", barra rayada y "≈"; el
  rango y el error en el título del monto. Pie de nota dentro del card. El total es "Total de la liga (N con balance + E estimados*)"
  cuando más de la mitad de la liga de ese año tiene balance real; si no, el total de los cargados como antes. La composición ("De dónde
  sale la plata") y el simulador siguen solo con lo real. Mockup: "Ligas · estimados en la tabla" de "Pantallas FoS". ASSET_V 1258.
- To-do 274: card "La liga en total, por categoría" arriba de la tabla de Ligas (`consolidado()` en `js/liga.js`): la suma por categoría de
  los clubes con balance del ejercicio, en dólares, "Suma de los N de M clubes con balance", con una barra apilada y la lista con monto y %.
  Cuando el total de la tabla suma estimados, una franja rayada "Estimados, sin categoría*" hace que los dos totales coincidan; si no,
  solo lo real. Nota de los clubes sin desglosar. Colores: los de "De dónde sale la plata" (`paletaMix()`). Mockup: "Ligas · consolidado
  de la liga" de "Pantallas FoS". ASSET_V 1260.
- To-do 272: borrado el cartel de primera visita "Elegí tu club acá" (colgaba del botón del club, que ya no está en el header): HTML en
  `index.html`, `hideCoach` / `maybeCoach` y `LS_COACH` en `js/selector.js`, `.coach` en `css/styles.css` y `selector.coach` en
  `data/lang/en.js`. La puerta del visitante nuevo es el buscador de Inicio. ASSET_V 1261.

## Qué queda (para TODO)

- Borrar el 293, el 275, el 274 y el 272.
- La parte de "faltantes" del 275 (la lista de quiénes faltan y por qué) se descartó en el diseño: Guido quiere que todo club sin balance
  figure como estimado, sin motivos. `data/faltantes/` sigue alimentando a `estimar.mjs`.
- 270, club nuevo: quedó prendido con 50% de error; volver a medir (`node tools/estimar.mjs --medir`) cuando haya más clubes cargados.

## Qué deja de ser cierto en ESTADO

- "Estimaciones publicadas aparte de lo real ... club que nunca cargamos, apagado (to-do 270). Todavía no se muestran en el sitio (to-do
  275)": ya no. Se muestran en Ligas, dentro de la tabla, con "(estimado)*"; el club nuevo está prendido (regresión, 50% de error).

## Acordado con fos-finanzas (grupo multiclub, to-do 280 c)

- URL `?tab=grupo&grupo=<grupoId>`: finanzas pone la sección `data-section="grupo"` (botón de #mainNav con `hidden`) y
  `window.GRUPO_VIEW = { show(id), current() }` en `js/grupo.js`; pantallas suma 'grupo' a `URL_CLAVES`, `estadoActual()` y `aplicarURL()`
  (`js/principal.js`), después de mergear lo de finanzas.
- Buscador: `window.GRUPOS_INDICE = [{id, nombre, alias, clubIds}]` en `data/entidades/_grupos.js` (eager); pantallas suma el resultado
  "Grupo" en `js/selector.js`, que llama a `GRUPO_VIEW.show(id)`.
- Aviso de finanzas (rama finanzas, commit b334aef): `data/entidades/_grupos.js` ya lo carga eager `index.html`, en el bloque de finanzas
  (después de `js/finanzas-multi.js`): no sumar otro script. Trae `window.GRUPOS_INDICE = [{ id, nombre, alias, clubIds, clubes:[{clubId|null,
  nombre, control, desde, hasta}] }]` y `window.ENTIDADES_PAISES`. Finanzas también tocó una línea de `js/principal.js`, en
  `refreshFinanzas()` (`FIN_ESTRUCTURA.render`), fuera del bloque de la URL.
- La página del grupo está lista en la rama finanzas (commit 376b6b3): `section#grupo`, botón `#mainNav button[data-section="grupo"]` con
  `hidden` (el CSS lo saca del menú) y `window.GRUPO_VIEW = { show(id) -> Promise, abrir(id), current() -> {grupo}, refresh() }`. Lo que
  falta de pantallas, después de mergear finanzas: (1) 'grupo' en `URL_CLAVES` / `estadoActual()` / `aplicarURL()`; (2) 'grupo' en
  `TABS_SIN_CLUB` de `js/principal.js` (si no, abrir un grupo sin club elegido rebota a Inicio); (3) el resultado "Grupo" del buscador
  con `GRUPOS_INDICE`, que llama a `GRUPO_VIEW.abrir(id)`. Al cambiar el idioma, `GRUPO_VIEW.refresh()` redibuja.

## Después del merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- Grupo multiclub enganchado (contrato con finanzas): `?tab=grupo&grupo=<id>` en la URL (`URL_CLAVES`, `estadoActual()` y
  `aplicarURL()` de `js/principal.js`; un grupo que no está en `GRUPOS_INDICE` se ignora), 'grupo' en `TABS_SIN_CLUB` (sin club ya no
  rebota a Inicio) y el resultado "Grupos multiclub" del buscador (`renderBusqueda()` en `js/selector.js`, por nombre o alias; no aparece
  en Comparar), que cierra el panel y llama a `GRUPO_VIEW.abrir(id)`. Probado: el link abre BlueCo sin club, el buscador lo encuentra
  con "blue", y "atrás" vuelve. ASSET_V 1263.

### Qué queda (para TODO)

- To-do 273 (aviso de fos-datos, 2026-10-18): el estadio y el sponsor de cada club y ejercicio tienen que verse en Finanzas (Guido: "tiene
  que estar en finanzas"; link de salto, bloque o fila de la ficha, a decidir con él). Datos por club y temporada: estadio, capacidad,
  sponsor de camiseta (frente) y marca técnica, con el link a la versión exacta de la página de Wikipedia de la temporada; sin monto. Los
  junta fos-datos y todavía no existen: no armar la pantalla hasta que fos-datos avise el formato y el archivo.
- To-do 282 (pedido de Guido vía fos-finanzas, 2026-10-18): quién auditó cada balance y qué dice el informe, en Finanzas "y en liga si la
  liga fue la auditada" (preguntarle a Guido qué quiere decir). Dato de finanzas, en piloto con 20 balances, sin commit: `data/auditoria/
  _paises.js` (`window.AUDITORIA_PAISES`) y `data/auditoria/<país>.js` (`window.CLUB_AUDITORIA[clubId][anio] = { auditor: { nombre, tipo:
  'firma'|'persona'|'organismo', legal? } | null, dictamen: 'sin_salvedades'|'con_salvedades'|'adverso'|'abstencion'|'sin_informe',
  continuidad: bool, fuente: { md, linea } | null }`). Link "ver en el balance" a `fuente.md`, como en Estructura. Vocabulario
  provisorio. Mockup antes de codear; esperar el hash de finanzas.
  Aclaración de Guido: "liga" es el balance propio de la entidad que organiza la liga (AFA, LFP) y quién lo auditó, no marcar los
  clubes. El sitio no tiene esas entidades; se le propuso a finanzas `window.LIGA_AUDITORIA[leagueId][anio] = { entidad, auditor,
  dictamen, continuidad, fuente }`.
  El dato de clubes está en la rama finanzas (commit 6e88784), llega a main con el próximo merge de finanzas: 19 balances. Para probar:
  arsenal-gb 2024 (Deloitte, sin salvedades), dinamozagreb-hr 2024 (con salvedades), vitoriaguimaraes-pt 2022 (BDO, continuidad true),
  almagro-ar 2018 (auditor persona), akhmatgrozny-ru 2022 (sin_informe). Un club-año que no está en CLUB_AUDITORIA es "no sabemos", no
  "sin informe".

### Qué cambió, 271 (para CHANGELOG)

- To-do 271: un link copiado abre lo mismo que se estaba viendo. Se suman a la URL, solo cuando no son los de siempre: `moneda` (la del
  club, si no es USD), `real=1` (ajustado por inflación, en Finanzas y en Comparar) y `formato=club` (Finanzas); y los dos lados de
  Comparar, `a` y `b` (`ladoAURL()` / `ladoDeURL()` en `js/principal.js`): `c.boca:2024,river` (clubes; sin año = el más reciente),
  `l.es-laliga.2025` (liga), bloques separados por `~`, `.s` / `.p` solo si el agregado no es el de siempre. Un club, liga o moneda
  que el sitio no tiene se ignora. Sin la clave, el valor de siempre ("atrás" desde un link en pesos vuelve a USD). `js/selector.js`
  expone `lados()`, `real()`, `setLados()` y avisa cada cambio por `onCambio` (`CLUB_SELECTOR.init`). Mi Cuenta sigue guardando su
  propio formato. Probado: Boca en ARS y formato del club, `real=1`, Boca vs River 2024 con inflación, LaLiga vs dos clubes, ida y
  vuelta, y links con datos inexistentes. ASSET_V 1264.
- Borrar el 271.

### Qué deja de ser cierto en ESTADO

- "El estado va en la URL (…); la moneda, la inflación, el formato y Comparar todavía no (to-do 271)": ya van (`moneda`, `real`,
  `formato`, `a`, `b`), y el grupo multiclub (`?tab=grupo&grupo=…`).

## Después del segundo merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 282, Finanzas: tarjeta "Quién auditó estos números" (`js/auditoria.js`, `#finAuditoria`, link "Auditoría" en el índice de la
  página). Una fila por ejercicio elegido, del más nuevo al más viejo: el auditor (nombre corto; debajo el legal y si es firma, contador
  o organismo), el dictamen como etiqueta de color con una frase simple, "Duda sobre la continuidad" aparte, y "ver en el balance" a la
  transcripción. Un ejercicio sin dato dice "Todavía no lo revisamos" (no es "sin informe"). Sin ningún dato del club, la tarjeta y su
  link se esconden. `data/auditoria/_paises.js` se carga eager; el país, al elegir un club. Mockup aprobado: "Finanzas · quién auditó
  estos números" de "Pantallas FoS". Probado con Vitória (BDO, continuidad), Almagro (persona), Dinamo Zagreb (con salvedades), Akhmat
  (sin informe) y River (sin dato: escondida). ASSET_V 1267.

### Qué queda (para TODO)

- 282, Ligas: `data/auditoria/_ligas.js` (`window.LIGA_AUDITORIA[ligaId][anio] = { entidad:{nombre, legal?}, auditor, dictamen,
  continuidad, fuente }`, rama finanzas, commit 5c212ed) está vacío: no hay balance de ninguna entidad organizadora. Ligas no muestra
  nada hasta que haya uno (conseguirlos lo propone finanzas como sourcing).

## Después del tercer merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 242, para periodistas. (1) Tarjeta "Citar y descargar" en Finanzas, antes de Fuentes y con su link en el índice de la página
  (`js/citar.js`, `#finCitar`; nombre elegido por Guido, como "Download" / "Cite" de Our World in Data o el Banco Mundial): la cita
  sugerida de lo que se ve (club, documento y cierre, unidad, tipo de cambio, inflación, formato y el link con las claves de la URL),
  "Copiar la cita", "Copiar el link" y "Descargar CSV". El CSV trae una fila por rubro y ejercicio (ingresos, gastos, otros resultados,
  total de ingresos, resultado neto y deuda), en la unidad que se ve, con la moneda original, el tipo de cambio y su origen, si está
  ajustado, el documento y su link; sin dato va vacío, nunca 0. Los números salen del motor (`computeYearGeneric()`,
  `nativeReportFor()`, `nativeDisplayVal()`, `filaDeuda()`). (2) Página pública `metodologia.html` (estilo de `terminos.html`, solo en
  castellano): fuentes, formato, dólares, inflación, deuda, estimados, auditoría y cómo citar; link en el footer de index.html y en
  `sitemap.xml` (`tools/generate-fuentes-page.js`); silenciada en `tools/audit-ignore.json` como página para el visitante. Mockup
  aprobado: "Finanzas · citar y descargar" y "Metodología, página pública" de "Pantallas FoS". Probado: Boca 2024/25 en USD y 2021/22
  a 2024/25 en ARS (cita, CSV con 57 filas, nombre del archivo). ASSET_V 1269.

### Qué queda (para TODO)

- Borrar el 242.
- 273 (aviso de fos-datos): el dato está en la rama datos-sourcing (943e423cdb), sin mergear. `data/contexto/<iso>.js`, uno por país
  (18 hoy; index.html no los carga): `window.CLUB_CONTEXT[clubId][año] = { estadio, capacidad, sponsor, marca, temporada, fuente,
  fuenteManual? }`; un campo que no se sabe no aparece; `fuente` es el permalink a la revisión de Wikipedia; sponsor puede traer varios
  separados por coma o barra. Cobertura de 932 ejercicios: estadio 79 %, sponsor 85 %, marca 87 %. Pedidos de Guido: (1) verlo en
  Finanzas (link de salto o bloque, a decidir con él); (2) una página por sponsor con su histórico y los equipos que sponsorea hoy, que
  espera un índice de sponsors con nombres unificados que va a generar fos-datos (no armarla sobre data/contexto/).

## Después del cuarto merge del 2026-10-18

### Qué queda (para TODO)

- 273: mockup "Finanzas · estadio y camiseta" en "Pantallas FoS" (tarjeta con una columna por ejercicio: estadio, capacidad, sponsor de
  camiseta y marca técnica, y el link a la temporada de Wikipedia). El código espera `data/contexto/` en main (merge de datos-sourcing
  y fast-forward). Rareza del dato para fos-datos: el mismo estadio sale como "Alberto J. Armando" y "La Bombonera" según la temporada.
  Detalle del dato (datos-sourcing 28dc4265a5): un ejercicio con campos cargados a mano trae `fuenteManual` (url) y `manual` (la
  lista de campos, por ejemplo ["estadio","capacidad"]); `fuente` sigue siendo la revisión de Wikipedia para los demás. Sin página de
  Wikipedia, solo hay `fuente` y es la manual. La fuente de un campo que está en `manual` es `fuenteManual`.
- 296, página por sponsor y por marca técnica (aviso de fos-datos, rama datos-sourcing f45caf8dba, sin mergear): `data/sponsors.js`
  (generado por `tools/generate-sponsors.js`, ~650 KB: cargarlo solo en esa página; fos-datos lo parte por letra o liga si hace falta).
  `window.SPONSORS = { actuales: { ligaId: año }, fuentes: { "ligaId|año": url }, lista: { id: { n, roles: ["c"|"m"], e: [[ligaId,
  año, equipo, clubId|null, rol]] } } }`. "Hoy" = entradas con año === actuales[ligaId]; histórico = todas, de la más nueva a la más
  vieja. Entran todos los equipos de la liga; los que el sitio no tiene, en gris y sin link. Año = temporada (2027 = 2026-27).
  Mockup: "Página de sponsor · Betano" de "Pantallas FoS". Los tres errores del dato que vio pantallas (markup pegado al nombre, el
  estadio de Boca con dos nombres, Sparta con dos nombres) los arregló fos-datos (datos-sourcing 9720f5e64c); un cambio de nombre real
  del estadio queda como histórico.
