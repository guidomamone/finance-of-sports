# Fuentes por club

Este archivo es tuyo, Guido: un lugar para pegar links a documentos, notas de
prensa o páginas oficiales cuando encuentres algo útil para un club, aunque
todavía no tengas tiempo de cargarlo al sitio. No hace falta ningún formato
especial ni saber programar — un link y una línea de contexto alcanza. Cuando
tengas varios, decime "che, revisá fuentes-por-club.md" y yo los proceso: los
leo, saco los números/categorías reales, y los cargo al sitio con la fuente
correctamente citada.

Cómo agregar algo: copiá una línea nueva bajo el club que corresponda, con
este formato:

- [qué es] — [link] — [para qué sirve o qué tiene adentro, si se nota a simple vista]

Ejemplo:

- Presupuesto 2026/27 — (ya subido como PDF) — presupuesto oficial completo, es lo que ya está cargado en Finanzas.

---

## Boca Juniors

- Presupuesto Económico, Financiero y de Inversiones, Ejercicio N° 123 (jul-2026 a jun-2027) — PDF subido directamente, ya cargado en el sitio (Ejercicio 2027). Transcripción completa (37 páginas, palabra por palabra) en Clubes/Argentina/Boca/presupuesto-26-27.md (Versión 30).
- Memoria y Balance auditado, Ejercicio N° 121 (jul-2024 a jun-2025) — https://www.bocajuniors.com.ar/club/presupuesto (linkea a un Drive) — ya cargado en el sitio (Ejercicio 2025), balance real, no presupuesto. Copia local en numeros-de-boca/Clubes/Argentina/Boca/Memoria y Balance 2024-25.pdf.
- Presupuestos y balances oficiales — https://www.bocajuniors.com.ar/club/presupuesto — la página solo linkea el presupuesto vigente y el balance más reciente (los dos ya cargados arriba), no un archivo histórico. Los balances de 2018, 2019, 2021, 2022, 2023 y 2024 siguen pendientes de encontrar y cargar.
- Presupuesto Ejercicio 2025/26 (jul-2025 a jun-2026, el año que falta entre los dos ya cargados) — investigado en la Versión 32, sin PDF oficial encontrado todavía. Nota oficial del club (sin PDF adjunto): https://www.bocajuniors.com.ar/noticias/aprobado ("Más obras y superávit", 5/6/2025). Cobertura de prensa con cifras (no verificada fuente por fuente): fenix951.com.ar, soyboca.com.ar/2025/06/05/presupuesto_aprobado_mas_obras_y_superavit.html, cholilaonline.ar, mundogremial.com, lanumero12.com.ar — coinciden en ingresos ≈$171.000 M ARS, egresos ≈$168.000 M ARS, superávit proyectado ≈USD 2 M. El balance auditado REAL de este ejercicio probablemente no esté disponible hasta la asamblea de aprobación (Boca aprueba el balance del ejercicio anterior en octubre siguiente al cierre — este ejercicio cerró jun-2026). Volver a buscar en oct/nov-2026.

## River Plate

- Memoria (narrativa, SIN estados contables) — https://www.riverplate.com/docs/socios/memoria-YYYY-YYYY.pdf — el dominio oficial de River solo publica el reporte de gestión narrativo (fútbol, infraestructura, marca, redes sociales, etc.), nunca el balance auditado. Se probaron y confirmaron 7 años directos (2018-19 a 2025) en numeros-de-boca/Clubes/Argentina/River/, pero NINGUNO tiene estados contables — ver river-data.js para el detalle de este hallazgo. No cargar más años de esta fuente esperando encontrar el balance ahí, no está.
- Estados Contables (balance auditado real), Ejercicio N° 123 (1°/9/2023 al 31/8/2024) — https://turiver.s3.us-west-000.backblazeb2.com/original/4X/1/7/a/17ac4c09709f687d2249c3e21b8e7c5262b78116.pdf — encontrado en una réplica de la comunidad tuRiver (turiver.com), no en el dominio oficial. Ya cargado en el sitio (Ejercicio 2024), marcado como fuente no-primaria (secondary_mirror) pero con banner explicando que el documento en sí es el balance auditado real, no placeholder ni prensa. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($950,50, Anexo V) — antes se usaba $953,50, investigado externamente.
- Pendiente: encontrar el balance auditado oficial (o una réplica confiable) de los ejercicios que faltan — 2018-19 a 2022-23 y 2024-25. Probar buscando "estados contables river plate [año] site:turiver.com" o en foros de hinchas — el patrón que funcionó una vez (Backblaze/S3 vía turiver.com) puede repetirse para otros años.

## Racing Club

- Archivo oficial completo de informes y balances — https://www.racingclub.com.ar/informes/ — a diferencia de Boca y River, Racing tiene un archivo público con presupuestos y balances desde 2009 hasta el presupuesto 2026-27. **ACTUALIZADO 2026-09: los 14 Balances (2009 a 2021, más 2024 y 2025) y los 7 Presupuestos con archivo real (2013-14, 2015-16, 2017-18, 2018-19, 2019-20, 2025-26, 2026-27) que lista esta página están TODOS transcriptos y cargados en el sitio** — ya no queda ningún balance/presupuesto de Racing pendiente de onboarding. La pestaña "Presupuestos" del sitio oficial también muestra un link a "Presupuesto 2016-17", pero el archivo en sí devuelve 404 tanto en racingclub.com.ar como en www.racingclub.com.ar (verificado dos veces, la más reciente el 2026-09-11): es un link roto/fantasma del propio sitio, no un documento real (esto ya estaba anotado en el comentario de `racing-balance-2017` en `data/clubs.js`: "no existe presupuesto2016-17.pdf"). También se descargaron (2026-09-11) 5 "Informe de gestión" narrativos que faltaban en la carpeta local — 2010, 2011, 2016, 2017 y el nuevo primer semestre de 2026 — quedan en `Clubes/Argentina/Racing/` sin onboardear al sitio porque son reportes de gestión narrativos (sin estados contables), no balance/presupuesto.
- Balance auditado real, Ejercicio N°122 (1°/7/2023 al 30/6/2024, última temporada de Blanco) — ya cargado en el sitio (Ejercicio 2024). Reemplaza el placeholder anterior. Resultado real: déficit de $(6.127.619.872) ARS. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($909, Anexo VI) — antes se usaba $912, investigado externamente.
- Balance auditado real, Ejercicio N°123 (1°/7/2024 al 30/6/2025, primer ejercicio completo de Milito) — ya cargado en el sitio (Ejercicio 2025), nuevo, no existía antes en el sitio. Déficit real de $(178.451.821) ARS. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($1.196, Anexo VI) — antes se usaba $1.203, investigado externamente.
- Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2025-2026 — ya cargado en el sitio (Ejercicio 2026), reemplaza al hilo de X de abajo. Documento oficial, mucho más detallado que la cobertura de prensa.
- Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2026-2027 — ya cargado en el sitio (Ejercicio 2027, Versión 32). PDF oficial (8 páginas, texto nativo), mismo formato que el de 2025-26. Transcripción completa en Clubes/Argentina/Racing/presupuesto2026-27.md.
- Balance auditado real, Ejercicio N°118 (1°/9/2019 al 31/8/2020, gestión Blanco) — ya cargado en el sitio (Ejercicio 2020, Versión 58). Déficit real de $(277.059.572) ARS. Cargado en ARS nativo con el tipo de cambio que declara el propio balance ($73,98, Anexo V). Transcripción completa en Clubes/Argentina/Racing/racing-balance-2019-20.md. Es el último ejercicio con cierre a agosto: la Asamblea del 18/12/2019 aprobó pasar el cierre a 30 de junio desde el ejercicio siguiente.
- Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2019-2020 — MISMO ejercicio que el balance de arriba, ya cargado en el sitio como overlay ("columna Presupuesto" de Estado de resultados, Versión 58, ver `.claude/skills/club-or-year-onboarding/SKILL.md` sección 11). Escaneo puro (8 páginas), transcripto con el Read tool sobre imágenes, corrigiendo primero una inclinación diagonal real del escaneo (~0,78°). fx propio del presupuesto: $70 (premisa macro declarada), distinto al del balance. Transcripción completa en Clubes/Argentina/Racing/racing-presupuesto-2019-20.md, incluye una nota de criterio real sobre la fila "Cobranzas por participación" (el documento imprime un acumulado que incluye 2 líneas más, confirmado con Guido).
- Presupuesto Financiero de Recursos y Gastos, Ejercicio 2018-2019 (1°/9/2018 al 31/8/2019) — ya cargado en el sitio (Ejercicio 2019, PRESUPUESTO-ONLY, sin balance real todavía). Escaneo puro (9 páginas, sin inclinación), transcripto con el Read tool sobre imágenes — las 2 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotó la imagen para leerlas (ver nota de proceso en `.claude/skills/club-data-mapping/SKILL.md` sección 9). fx propio del presupuesto: $40 (premisa macro declarada). Transcripción completa en Clubes/Argentina/Racing/racing-presupuesto-2018-19.md.
- Pendiente: nada del archivo público de Racing (ver nota actualizada arriba) — el único hueco real es el balance/presupuesto de los ejercicios 2022 y 2023, que Racing directamente nunca publicó en su archivo oficial (salta de balance2021.pdf a balance2024.pdf, y de presupuesto2019-20.pdf a presupuesto2025-26.pdf) — no es algo que quedó sin descargar, es un vacío real de la fuente.
- ~~Hilo de X con el resumen del presupuesto 2025/26~~ — https://x.com/Sacostaracing/status/1944855768127431049 — ya no se usa (reemplazado por el documento oficial de arriba), queda como referencia histórica en sources{} de data/clubs.js.

## Otros clubes de Primera División (investigación Versión 2026-09, pendientes de onboarding)

Barrido hecho sobre los 27 clubes de Primera División 2026 que todavía no tienen nada cargado en el
sitio (los otros 3 son Boca/River/Racing, arriba). Roster de 30 confirmado en Wikipedia (Gimnasia y
Esgrima de Mendoza y Estudiantes de Río Cuarto ascendieron para 2026, reemplazando a Godoy Cruz y San
Martín de San Juan que descendieron a fin de 2025). Para cada club se buscó SOLO en el dominio
oficial (o un link que el dominio oficial comparta directo, ej. Google Drive embebido en una noticia)
— nada de prensa, foros ni PDFs de terceros como fuente, mismo criterio que ya usa este archivo para
Boca/River/Racing. Los PDFs encontrados están descargados en
`Clubes/Argentina/<Club>/` (todavía SIN transcribir a `.md` ni cargados al sitio — eso es el próximo
paso si Guido decide avanzar con alguno). Todo lo marcado "Pendiente" es lo que falta pedirle al club
directamente; el contacto de cada uno está pensado para eso.

### Aldosivi

- Sin PDFs oficiales encontrados. Sitio oficial: aldosivi.com (secciones "El Club"/"Socios", sin
  Transparencia/Memoria/Balance ni portal público). El estatuto exige tratar Memoria y Balance en
  asamblea (confirmado por noticias propias del club), pero no se publica el PDF en la web pública.
- Pendiente: todos los ejercicios.
- Contacto: formulario en aldosivi.com ("El Club" > "Contacto"), o Secretaría de Socios —
  socios@aldosivi.com, tel. (0223) 484-0157 / 484-4230 / 484-3645, WhatsApp 223 3 00-5724, Av. de los
  Trabajadores 1800, Mar del Plata.

### Argentinos Juniors

- Archivo oficial de descargas — https://argentinosjuniors.com.ar/el-club/descargas/ (sección
  "Club > Descargas > Balances"). Descargados 9 PDFs reales a `Clubes/Argentina/Argentinos Juniors/`:
  balances completos con estados contables + informe de auditoría + informe del Órgano de
  Fiscalización de los ejercicios cerrados 30/6/2016, 2017, 2018 y 2019 (`balance-2015-2016.pdf` a
  `balance-2018-2019.pdf`), una memoria narrativa separada del mismo último ejercicio
  (`memoria-2018-2019.pdf`), dos tablas comparativas de patrimonio del Órgano de Fiscalización
  (`resumen-organo-fiscalizacion-2018.pdf`, ejercicios 2014-2018; `resumen-organo-fiscalizacion-2022.pdf`,
  ejercicios 2019-2023), una presentación de asamblea con comparativo patrimonial 2015-2019
  (`presentacion-asamblea-2018-2019.pdf`) y un dictamen legal institucional
  (`dictamen-presidencia-comision-fiscalizadora.pdf`).
- Pendiente: balance completo (no solo el resumen comparativo) de los ejercicios 2019-20 en adelante
  — no están en la página de Descargas. El botón "Memoria 2017-2018" de esa misma página está mal
  linkeado (apunta al resumen 2022 en vez de a la memoria real), así que esa memoria puntual sigue
  sin conseguirse pese a que el balance completo de ese ejercicio sí se bajó.
- Contacto: sección "Institucional" del sitio (anuncia cada aprobación de memoria y balance, buena
  fuente para monitorear ejercicios nuevos) — para pedido directo, DM a @AAAJoficial o sección Socios.

### Atlético Tucumán

- Sin PDFs oficiales encontrados. Sitio oficial: clubatleticotucuman.com.ar (OJO: no es
  atleticotucuman.com.ar, que es un sitio de noticias de terceros). Tiene "Institucional" y "Socios"
  pero sin Transparencia ni PDFs. Una nota propia del sitio menciona que un periodista "accedió a los
  estados contables de los últimos 10 años" sin decir dónde ni linkearlos.
- Pendiente: todos los ejercicios.
- Contacto: Oficina de socios, tel. 54-381-2344739; guardia 24 hs 381-580-9769; Estadio José Fierro,
  25 de Mayo 1351, San Miguel de Tucumán. Portal de socios: clubatleticotucuman.miclub.info (no
  explorado, puede tener más detrás de login).

### Banfield

- Sin PDFs oficiales encontrados. Sitio oficial: clubabanfield.org. Publica informes institucionales
  en HTML (no PDF) dentro de noticias — ej. "Estado de situación 2024" menciona una deuda heredada de
  ~USD 13,5M al 5/10/2024 — y hay coberturas de asambleas con balance aprobado, pero sin PDF adjunto
  ni archivo descargable en ningún lado del sitio.
- Pendiente: todos los ejercicios en formato PDF oficial.
- Contacto: Secretaría/Sede Social — socios@clubabanfield.com.ar, WhatsApp +54 11 5643-7777.

### Barracas Central

- Sin PDFs oficiales encontrados, y es dudoso que existan publicados: el sitio oficial
  (barracascentral.com) no tiene ninguna sección de socios/transparencia/comisión directiva ni
  memoria/balance — solo Home/El club/Partidos/Media/Galería/Eventos/Prensa. Club chico y de ascenso
  reciente, estructura institucional menos desarrollada que el resto del lote.
- Pendiente: todos los ejercicios (si es que se publican en algún canal).
- Contacto: info@barracascentral.com, Prensa prensa@barracascentral.com, tel. 4301-5855, Luna 1211,
  CABA.

### Belgrano (Córdoba)

- Memoria Anual 2019 (ejercicio calendario 2019) — https://www.belgranosocios.com/upload/11294686561451.pdf
  — narrativa (socios, filiales, deportivo, infraestructura) + sección "Económicos" con cifras
  resumidas (superávit, patrimonio neto, índice de liquidez), SIN estados contables línea por línea.
  Descargado en `Clubes/Argentina/Belgrano/memoria-anual-2019.pdf`.
- Memoria Anual 2020 — https://www.belgranosocios.com/upload/14733772026375.pdf — mismo formato.
  Descargado en `Clubes/Argentina/Belgrano/memoria-anual-2020.pdf`.
- Pendiente: 2021 a 2025 (todos existen y se aprueban en asamblea cada año — la de 2025 fue aprobada
  29/4/2026, superávit $1.222M según prensa del propio club) pero están detrás de login de socio en
  socios.belgrano.com.ar, sección "Transparencia" — no hay copia pública indexada de esos años a
  diferencia de 2019/2020, que quedaron sueltos en /upload/ de una época anterior a que el club
  migrara todo detrás de login.
- Contacto: Departamento de Socios On-Line, o directo por el panel socios.belgrano.com.ar (si Guido
  consigue acceso de socio, ahí están los años que faltan); contacto general vía belgrano.com.ar.

### Central Córdoba (Santiago del Estero)

- Sin PDFs oficiales encontrados. Sitio oficial: cacentralcordoba.com (OJO: centralcordoba.com.ar es
  un club DISTINTO, Central Córdoba de Rosario). El sitio no tiene sección de
  institucional/transparencia/balance — solo Historia/Comisión/Fútbol/Socios/Acreditaciones. Prensa
  (no oficial) confirma que la asamblea de mayo 2022 aprobó los balances 2019/20 y 2020/21, sin PDF.
- Pendiente: todos los ejercicios — probablemente solo se distribuye en papel en la asamblea.
- Contacto: info@cacentralcordoba.com (footer del sitio), depto. de socios +54 9 3855 79-2105.

### Defensa y Justicia

- Sin PDFs de balance encontrados. Sitio oficial: defensayjusticia.org.ar. Publica notas narrativas
  con la cifra de superávit de cada ejercicio (Ejercicio N°90, cierre 30/6/2024, superávit $3.456M;
  Ejercicio N°91, cierre 30/6/2025, superávit $6.218M) pero SIN el estado contable adjunto. Tiene un
  portal "Sede Virtual" con login de socio que podría tener el documento real, no explorable sin
  credenciales.
- Pendiente: el balance auditado real (PDF) de cualquier ejercicio.
- Contacto: sección Socios (defensayjusticia.org.ar/socios/) o Prensa del sitio oficial; no se
  encontró mail institucional directo publicado.

### Deportivo Riestra

- Sin sitio web oficial funcional encontrado: clubdeportivoriestra.com es un dominio parkeado sin
  contenido, deportivoriestra.com da 403 Forbidden, y clubdeportivoriestra.wordpress.com parece no
  oficial (sin declararse como sitio oficial del club). Solo tiene presencia institucional en redes.
- Pendiente: todo — no hay memoria y balance publicada en ningún dominio oficial porque no se
  encontró un dominio oficial funcional.
- Contacto: prensa@deportivoriestra.com, o Instagram @deportivoriestra.oficial / X @prensariestra.

### Estudiantes de La Plata

- Memoria y Estados Contables, Ejercicio N°117 (2021-22) — estudiantesdelaplata.com/wp-content/uploads/2022/10/Memoria-y-Balance-Ejercicio-117-WEB.pdf.
- Memoria y Estados Contables, Ejercicio N°118 (2022-23) — .../uploads/2023/10/Club-Estudiantes-de-La-Plata-Memoria-y-Balance-2022-2023.pdf.
- Memoria y Estados Contables, Ejercicio N°119 (2023-24, incluye presupuesto 2024-25) — .../uploads/2024/10/Memoria-y-Balance-N°-119-2023-24.pdf.pdf.
- Memoria y Estados Contables, Ejercicio N°120 (2024-25) — .../uploads/2025/10/Memoria-y-Balance-Ejercicio-N-120_.pdf (86 MB, muchas fotos).
- Un ejercicio más viejo (probablemente N°115, 2016-17, a confirmar el número exacto) — .../uploads/2018/10/01_MEMORIA-Y-BALANCE.pdf.
  Los 5 son PDFs oficiales reales, descargados en `Clubes/Argentina/Estudiantes LP/` (nombrados
  memoria-y-balance-2017-2018 a 2024-2025).
- Pendiente: ejercicios anteriores al más viejo bajado (el club tiene más de un siglo, probable
  archivo histórico no indexado por buscadores) y confirmar el número de ejercicio exacto de ese PDF
  más antiguo.
- Contacto: no se encontró mail institucional directo; secciones Socios/Contacto del sitio oficial.

### Estudiantes de Río Cuarto

- Sin PDFs oficiales encontrados, sin sección institucional de transparencia/balances. Sitio oficial:
  aaestudiantesriocuarto.com (nuevo, recién ascendido, sin memoria y balance publicada). OJO: el
  dominio aaestudiantes.com.ar (sin "riocuarto") NO es del club — es un dominio vencido reutilizado
  por un sitio de casino online, descartado por completo.
- Pendiente: todo — club recién ascendido con presencia institucional online todavía muy limitada.
- Contacto: sin email visible en el sitio. Instagram @estudiantesrio4 / X @EstudiantesRio4, o
  domicilio social Av. España 251, Río Cuarto, Córdoba. Portal de socios (login):
  aaestudiantes.accessfan.ar.

### Gimnasia y Esgrima (La Plata)

- Memoria, Ejercicio N°131 (2017-18) — gimnasia.org.ar/wp-content/uploads/2018/10/Memoria2017-2018.pdf (135 págs).
- Memoria, Ejercicio N°134 (2020-21) — .../uploads/2021/10/Club-de-Gimnasia-y-Esgrima-La-Plata-Memoria-del-Ejercicio-134.pdf (124 págs).
- 137° Memoria y Balance General, Ejercicio 2023-24 — .../uploads/2024/10/ALTA_myb_2023_2024-1.pdf.
- 138° Memoria y Balance General, Ejercicio 2024-25 — .../uploads/2025/10/Memoria-Ejercicio-2024-2025.pdf.
  Los 4 son PDFs oficiales reales, descargados en `Clubes/Argentina/Gimnasia y Esgrima LP/`.
- Pendiente: ejercicios 132/133 (2018-19/2019-20) y 135/136 (2021-22/2022-23) — confirmado que
  existen (mencionados en notas de asamblea) pero no indexados en wp-content/uploads público; podrían
  estar solo en el portal de autogestión de socios (autogestion.gimnasia.org.ar, login).
- Contacto: no se encontró mail institucional directo; sección Socios de gimnasia.org.ar o el portal
  autogestion.gimnasia.org.ar.

### Gimnasia y Esgrima (Mendoza)

- Sin PDFs oficiales encontrados. Sitio oficial: gimnasiayesgrimamza.com.ar (OJO: distinto de
  gimnasia.org.ar, que es el de La Plata). Sitio chico, sin sección institucional con documentos. Una
  nota menciona que se leerá/aprobará el balance al 31/10/2022 en asamblea, sin PDF adjunto.
- Pendiente: todos los ejercicios.
- Contacto: sin email institucional encontrado. WhatsApp +54 9 261 509-1624, o redes: Instagram
  @gimnasiamzaoficial, X @GimnasiaMendoza, Facebook GimnasiaMendozaOK.

### Huracán

- Sin PDFs oficiales encontrados. Sitio oficial: cahuracan.com (y subdominio admin.cahuracan.com).
  Solo publica comunicados narrativos de asamblea sin adjuntos — confirma que se aprobó Memoria y
  Balance 2022/23 y el presupuesto anual, pero sin link a documento.
- Pendiente: todos los ejercicios.
- Contacto: socios@cahuracan.com (Departamento de Socios), WhatsApp +54 9 11 5060-1908.

### Independiente

- Memoria y Balance, Ejercicio N°120 (2023-24) — noticia oficial con Drive embebido en
  clubaindependiente.com.ar/institucion/noticias/1730835660_memoria-y-balance-2023-24 — 51 páginas,
  estados contables completos. Descargado en
  `Clubes/Argentina/Independiente/memoria-y-balance-2023-2024.pdf`.
- Pendiente: Ejercicio N°121 (2024-25), aprobado en asamblea el 26/11/2025 según prensa — no se
  encontró una noticia oficial con el documento adjunto para este ejercicio todavía. También faltan
  los ejercicios anteriores a 2023-24.
- Contacto: asambleas@clubaindependiente.com.ar (acreditación para asambleas),
  socios@clubaindependiente.com.ar.

### Independiente Rivadavia (Mendoza)

- Sin PDFs oficiales encontrados. Sitio oficial: independienterivadavia.com.ar (hecho en Framer,
  casi puramente promocional/deportivo, sin sección institucional ni menciones a asamblea/balance).
- Pendiente: todos los ejercicios.
- Contacto: formulario en independienterivadavia.com.ar/contacto (sin email público), tel. 0261
  429-4794, Av. Boulogne Sur Mer 688, Mendoza.

### Instituto (Córdoba)

- Memoria Anual, Ejercicio N°70 (2023-24) — Drive linkeado desde noticia oficial
  institutoacc.com.ar/index.php/fue-aprobada-la-asamblea-general-ordinaria-y-extraordinaria-superavit-historico/ (6 págs).
- Balance General / Estados Contables, mismo Ejercicio N°70 — misma noticia, otro Drive (17 págs,
  estados contables completos).
- Presupuesto Económico de Recursos y Gastos, Ejercicio 2025 — misma noticia, otro Drive (3 págs).
- Premisas del Presupuesto 2025 — misma noticia, otro Drive (4 págs).
  Los 4 son PDFs oficiales reales, descargados en `Clubes/Argentina/Instituto/`.
- Pendiente: Ejercicio 2024/25 (cerrado 30/6/2025, aprobado en asamblea 24/8/2025 junto con la nueva
  Comisión Directiva 2025-2029) — no se encontró post con documento adjunto para este ejercicio.
  También faltan ejercicios anteriores a 2023-24.
- Contacto: WhatsApp 3512 209813 (L-V 9-21hs), sede Jujuy 2702, Alta Córdoba.

### Lanús

- Sin PDFs oficiales encontrados. Sitio oficial: clublanus.com. Una noticia propia ("Se celebró la
  111ª Asamblea Anual Ordinaria...", 30/11/2025) confirma aprobación por unanimidad de Memoria,
  Inventario, Balance General y Cuadro de Recursos y Gastos del ejercicio cerrado 31/8/2025 (superávit
  $5.531.559.857), pero es puramente narrativa, sin PDF ni link a Drive/Dropbox adjunto.
- Pendiente: todos los ejercicios.
- Contacto: contacto@clublanus.com, tel. +54 11 4357 9200.

### Newell's Old Boys

- Sin PDFs oficiales encontrados. Sitio oficial: newellsoldboys.com.ar. Tiene un "Portal de Socios"
  (socios.newellsoldboys.com.ar) gateado con login (403 sin credenciales) que podría tener el
  documento real. Prensa confirma asambleas con memoria y balance aprobados (2023-24 en oct-2024;
  2024-25 reformulado en mayo-2026), pero ninguna nota linkea el PDF.
- Pendiente: todos los ejercicios — reintentar cerca de una próxima asamblea (suelen publicar el PDF
  unos días antes vía redes/portal de socios).
- Contacto: contacto@newellsoldboys.com.ar / +54 341 425-4422 (sede, Parque Independencia s/n,
  Rosario). Sección Prensa: newellsoldboys.com.ar/prensa/.

### Platense

- Sin PDFs oficiales encontrados. Sitio oficial: cap.org.ar. Solo publica el Estatuto y el Reglamento
  de Comicios como PDFs públicos. Notas propias del club confirman superávit de ~$1.001M ARS en el
  balance del Ejercicio N°119 (jul-2023 a jun-2024), aprobado 30/10/2024, pero sin el PDF del balance
  en sí (el Estatuto exige que esté disponible para consulta de socios, probablemente solo en sede).
- Pendiente: todos los ejercicios — convocatoria a Asamblea 2025 (Ejercicio N°120) ya anunciada para
  oct-2025, reintentar ahí.
- Contacto: Oficina de Socios, (54-11) 4791-4748 / WhatsApp +54 9 11 3691-7156, Juan Zufriategui 2021,
  Vicente López — cap.org.ar/oficina-de-socios/.

### Rosario Central

- Memoria, Ejercicio 2022-23 — rosariocentral.com/wp-content/uploads/2023/10/Memeria-ClubAtleticoRosarioCentral.pdf
  (36 págs, reporte narrativo de gestión).
- Estados Contables + informe del auditor, mismo Ejercicio 2022-23 —
  .../uploads/2023/10/EECC-Club-Atletico-Rosario-Central-e-Informe-del-auditor-30.06.2023-Firma-FT-1-1-1.pdf
  (balance auditado real, con firma). Ambos descargados en `Clubes/Argentina/Rosario Central/`.
- Pendiente: ejercicios 2023-24 y 2024-25 (ambos aprobados en asamblea, el patrón de URL de 2023 no se
  repite para años posteriores, todas las variantes probadas dan 404) y todo lo anterior a 2022-23. El
  club tiene una "Sede Virtual" (rosariocentral.miclub.info) que probablemente tenga la versión más
  nueva, posiblemente con login de socio.
- Contacto: sección Socios (rosariocentral.com/socios/) o Prensa (rosariocentral.com/prensa/);
  WhatsApp institucional +54 9 341 202-1889.

### San Lorenzo de Almagro

- Archivo oficial de balances — sanlorenzo.com.ar/club/balances (página índice dedicada). Descargados
  9 PDFs reales a `Clubes/Argentina/San Lorenzo/`: memorias y balance completos de los ejercicios
  2011-12 a 2016-17 (6 archivos), Informe de Gestión narrativo 2012-2019, y Presupuesto + Pautas de
  Presupuesto del ejercicio 2023-24.
- Pendiente: balances de los ejercicios 2017-18 a 2024-25 — no están en /club/balances ni responden al
  patrón de URL usado para los años ya bajados (dan 301 hacia una ruta que devuelve 404). Prensa propia
  del club confirma que el balance 2022-23 fue aprobado en asamblea el 15/12/2023, pero el PDF no está
  público ahí. Vale revisar si existe un programa "CASLA Transparente" de datos abiertos mencionado por
  el BID, con otra ubicación no encontrada en esta sesión.
- Contacto: la página sanlorenzo.com.ar/club/balances ya es el canal de publicación oficial; para pedir
  años faltantes, Prensa/Socios del sitio oficial.

### Sarmiento (Junín)

- Sin PDFs oficiales encontrados. Sitio oficial: clubatleticosarmiento.com — chico, sin sección
  Institucional/Transparencia/Memoria/Balance ni en menú ni en footer, solo un PDF público (nómina de
  Comisión Directiva 2021-23).
- Pendiente: todos los ejercicios — probablemente solo se publica en papel para la asamblea.
- Contacto: Secretaría 2364-319596 / 4437263, sarmientoprensa@mail.com, Av. Arias y Necochea, Junín
  (BA), L-V 8-13h y 15-19h.

### Talleres (Córdoba)

- Asamblea Social 2024 (Memoria + Balance Económico + Reporte de Sustentabilidad, ejercicio 2024) —
  clubtalleres.com.ar/wp-content/uploads/2025/03/Asamblea-Social-2024.pdf — descargado en
  `Clubes/Argentina/Talleres/asamblea-social-2024.pdf`.
- Pendiente: 2022 y 2023 — el sitio los menciona en notas de prensa institucionales pero no linkea el
  PDF, y no hay sección de archivo histórico.
- Contacto: consultasasamblea@clubtalleres.com.ar (mail específico para consultas de la rendición de
  cuentas).

### Tigre

- Sin PDFs oficiales encontrados. Sitio oficial: catigre.com.ar. Las convocatorias a Asamblea General
  Ordinaria (2022 a 2025, todas revisadas) mencionan textualmente la consideración de "Memoria y
  Balance General e Informe de Comisión Fiscalizadora", pero ninguna adjunta el PDF. "Socios" solo
  lleva a un Portal de Socios con login — es posible que el documento se distribuya solo ahí.
- Pendiente: todos los ejercicios.
- Contacto: info@catigre.com.ar, tel. (54-11) 4744-3949 / 4549-0555, Guido Spano 1053, Victoria, San
  Fernando.

### Unión (Santa Fe)

- Memoria + Balance + Informe de Comisión Revisora de Cuentas, Ejercicio N°114 (2019-20) —
  clubaunion.com.ar/wp-content/uploads/2020/07/ (Memoria-Club-Atletico-Union-Ejercicio-114.pdf +
  Comision-Revisora-de-Cuentas-Ejercicio-No-114-.pdf). La Memoria y el informe de Comisión Revisora se
  descargaron bien; el PDF del Balance en sí (Balance-114.pdf) NO se pudo descargar completo — tanto
  el dominio oficial (caído al momento de la investigación) como el snapshot de Wayback Machine
  cortan la descarga en exactamente 1.048.576 bytes (1 MB), archivo corrupto descartado. Reintentar
  más adelante, directo del dominio oficial cuando vuelva a estar online.
- Memoria y Balance completo, Ejercicio N°116 — .../uploads/2024/04/EJERCICIO-N°-116.pdf (52 págs).
- Memoria y Balance completo, Ejercicio N°117 — .../uploads/2024/04/EJERCICIO-No-117.pdf (63 págs).
- Estados Contables, Ejercicio N°118 (2023-24) — .../uploads/2025/05/E.E.C.C-2023-2024_compressed-1.pdf (53 págs).
- Acta de Asamblea, Ejercicio N°118 (11/4/2024) — .../uploads/2025/05/Acta-asamblea-11-04-24_compressed.pdf (26 págs).
- Memoria y Balance, Ejercicio N°119 (el más reciente) — .../uploads/2025/12/memoria-y-balance-119-final_compressed-1.pdf (54 págs).
  Todos descargados en `Clubes/Argentina/Union/`. NOTA DE FUENTE: el sitio oficial
  (clubaunion.com.ar) estaba con el hosting suspendido al momento de la investigación — estos 7 PDFs
  se bajaron de la copia archivada por Wayback Machine de esas MISMAS URLs del dominio oficial (no es
  un mirror de tercero), mismo criterio que ya se usó para el balance de River vía turiver.com. Volver
  a intentar clubaunion.com.ar directo cuando el sitio esté online de nuevo.
- Pendiente: Ejercicio N°115 (2020-21, pandemia, no parece haberse publicado), ejercicios anteriores al
  114, el Balance-114 en sí (ver nota arriba), y confirmar si existe ya un Ejercicio N°120.
- Contacto: no se pudo revisar /contacto/ (sitio caído); reintentar en clubaunion.com.ar/contacto/ o
  vía Oficina de Socios (L-V 9-16h).

### Vélez Sarsfield

- Archivo oficial completo "Memorias y Estados Contables" —
  velez.com.ar/elclubesdelossocios/memorias-estados-contables (página institucional dedicada, la
  fuente más completa de todo este barrido). Descargados 21 PDFs reales a
  `Clubes/Argentina/Velez Sarsfield/`: Balance General de casi todos los ejercicios 2015 a 2025, y
  Memoria + Balance General combinados (narrativa + estados contables) de casi todos los mismos años,
  alojados nativamente en velez.com.ar/pdf/.
- **TODOS los ejercicios con archivo oficial disponible YA CARGADOS en el sitio** (Versiones
  82-93): N°115 (2024/2025), N°114 (2023/2024), N°113 (2022/2023, OCR), N°112 (2021/2022), N°111
  (2020/2021), N°110 (2019/2020), N°109 (2018/2019), N°108 (2017/2018), N°107 (2016/2017, OCR),
  N°106 (2015/2016, OCR) y N°105 (2014/2015, OCR) — **rango completo y sin ningún hueco, 11
  ejercicios consecutivos**. Cuarto club del sitio, primero agregado al motor genérico desde que
  existía (obligó a sumar una 3ra rama a varios ternarios de `js/finanzas-calc.js`/
  `js/finanzas-render.js` que estaban hardcodeados a river/racing, ver detalle en VERSIÓN 82 del
  historial de `index.html`). Transcripciones completas en
  `Clubes/Argentina/Velez Sarsfield/balance-general-{2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015}.md`.
  Convertidos con el tipo de cambio que cada balance declara en su propio Anexo VI: $1.196 (2025),
  $909 (2024), $256,30 (2023), $125,03 (2022), $95,52 (2021), $70,26 (2020), $42,263 (2019), $28,75
  (2018), $16,53 (2017), $14,94 (2016), $8,988 (2015). Resultados reales: SUPERÁVIT 2025
  $36.833.752 / DÉFICIT 2024 $(1.113.139.098) / SUPERÁVIT 2023 $522.234.138 / SUPERÁVIT 2022
  $1.216.670.585 / DÉFICIT 2021 $(753.625.872) / DÉFICIT 2020 $(145.019.616) / SUPERÁVIT 2019
  $370.018.627 / SUPERÁVIT 2018 $342.815.648 / DÉFICIT 2017 $(73.534.953) / SUPERÁVIT 2016
  $66.227.589 / DÉFICIT 2015 $(36.195.305) (todo en ARS). Ver `data/velez-data.js` para el detalle
  completo de categorización (incluye una separación por sector del Anexo III para que "Salarios y
  primas" sea solo plantel profesional, no todo el personal del club — mismo criterio en los 11
  ejercicios). Gestiones: Raúl H. Gámez (2014-2017, ejercicios 2015-2017), Sergio Rapisarda
  (2017-2023, ejercicios 2018-2023) y Fabián Berlanga (2023-actual, ejercicios 2024-2025) —
  entradas `gamez`/`rapisarda`/`berlanga` en `gestionesByClub.velez`. Los ejercicios 2020 y 2021
  incluyen un ingreso extraordinario COVID ("Subsidio A.T.P.", programa estatal), categorizado como
  other_income.
  **Los ejercicios 2023/2017/2016/2015 (N°113/107/106/105) se cargaron vía OCR** (Tesseract,
  instalado con Homebrew en esta sesión: `brew install tesseract tesseract-lang`) porque esos 4 PDF
  son escaneos sin capa de texto — mucho más barato en tokens que renderizar cada página como
  imagen con el Read tool. Números verificados fila por fila contra los totales impresos de cada
  Anexo antes de cargarlos, no solo con el OCR crudo (2016 cerró exacto, 2015/2017 con un ruido
  irrelevante de $40-50 mil sobre totales de cientos de millones). Ver comentario de cabecera de
  `data/velez-data.js` para el detalle completo del flujo (útil si en el futuro aparece un
  ejercicio anterior a 2015 en el archivo del club, o si hay que reprocesar alguno).
  **Bug real encontrado y corregido**: al cargar 2015, `verifyTieOuts()` marcó una diferencia real
  (no de OCR) en el check de "Expenses" — la fórmula del check (`Math.abs(a) + Math.abs(b)` en vez
  de `Math.abs(a+b)`) daba mal cuando el crédito de "reclasificación" de un ejercicio supera a su
  amortización real (nunca había pasado antes en ningún club/ejercicio). Corregido en TODOS los
  checks de `verifyTieOuts()`, no solo los de Vélez.
- Pendiente: Mercado de Pases/Resultados Deportivos/Títulos (esta sesión se enfocó solo en
  Finanzas, quedaron vacíos a propósito en `data/velez-data.js`, no con placeholder inventado).
  Confirmar si hay un ejercicio 2026 más reciente (se publica recién tras el cierre del próximo
  ejercicio) o alguno anterior a 2015 en el archivo del club. Algún año puntual puede faltar en una
  de las dos series (Balance General vs. Memoria+Balance) — revisar la carpeta local antes de dar
  por completo un ejercicio específico.
- Ver también `dudas-por-club.md` (1 pregunta abierta sobre este club: si "Uso del estadio" incluye
  algo de recaudación propia de entradas).
- Contacto: no se relevó sección de contacto específica; formulario general de velez.com.ar o
  WhatsApp institucional +54 9 11 2266-1000.

---

### Nota técnica para cuando yo (Claude) proceso esto

Cada fuente que cargo al sitio queda registrada en `data/clubs.js` con estos
datos: de qué club es, qué tipo de documento es (presupuesto oficial, balance
oficial, cobertura de prensa, o placeholder), y qué tan confiable es. Esto es
lo que le permite al sitio mostrar avisos tipo "dato real" vs. "dato de
prensa, no oficial" vs. "placeholder, no es real todavía" en cada sección,
en vez de que quede solo en un comentario que nadie lee.
