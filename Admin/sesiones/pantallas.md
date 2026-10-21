# Rama `pantallas`

## Pantallas 6, segunda tanda: to-do 332 (2026-10-20)

### Qué cambió (para CHANGELOG)

- 332: bloque «Informes de esta liga» en la pestaña Ligas (`informes()` en `js/liga.js`, estilos `.lg-inf*` en `css/styles.css`, claves `liga.inf.*` en
  `data/lang/en.js`). Una tarjeta por informe: ámbito, título, editor y año, qué cubre, una frase, una cifra con su fuente (con la marca «borrador» si lo es)
  y el link al original. Los informes de Europa van arriba (se muestran en toda liga de un país de región Europa) y después los de la liga. Salen de
  `data/informes.js` (`window.INFORMES`, un renglón por informe y edición, textos con `{es, en}`): UEFA ECFIL 2025 (link a su página oficial, que da 200; el PDF
  directo no se halló), Deloitte ARFF 2026 (PDF oficial, 200) e IFR State of the Game 2026 (PDF, 206; borrador). Deloitte e IFR figuran en Premier, Championship,
  League One y League Two. Verificado en el preview a escritorio y 375 px, sin desborde. ASSET_V 1532, `fuentes` regenerado.
### Qué queda (para TODO)

- El bloque solo sale si la liga tiene ranking cargado (una liga sin datos, como Scottish Premiership, no muestra informes ni los de Europa).
- Sumar los informes de otros países cuando Sourcing los verifique (DFL, LaLiga, EY Brasil, Football Benchmark): una entrada en `data/informes.js`.
- Una vista aparte «Informes» con todos (la sección 4 del informe la menciona) no se hizo.
- `tools/audit.js` no mira `data/informes.js` (que cada `ligas` exista en `LEAGUES`, que cada `url` conteste); lo pide Pipeline si se quiere.

### Qué deja de ser cierto en ESTADO

- «Inicio, Ligas y navegación»: la liga elegida suma el bloque «Informes de esta liga» (desde `data/informes.js`).

## Pantallas 6 (2026-10-20)

### Qué cambió (para CHANGELOG)

- 241 paso 2: `js/principal.js` lee y escribe la ruta. Finanzas con club es `/club/<id>`, Ligas con liga es `/liga/<id>` (la query sin `tab`, `club` ni
  `liga`; `anios`, `anio`, `moneda` y el resto igual que antes); las demás pestañas vuelven a `/`. Lee `window.FOS_RUTA` (solo la primera vez) o el pathname
  (`.html` opcional); un id viejo pasa por `data/club-aliases.js`. Cambiar de club o de liga suma una entrada al historial ("atrás" vuelve al anterior).
  `?tab=finanzas&club=…` sigue andando y se reescribe a la ruta. Sin http (file://) las rutas no se tocan. Al arrancar esconde `#pagina-estatica` (el texto
  sin JS de la página generada) si existe. Verificado en el preview con páginas temporales, a escritorio y 375 px: abrir, cambiar club y liga, atrás y
  adelante, id viejo, Inicio. El esconder `#pagina-estatica` no se probó en el navegador. ASSET_V 1530, `fuentes` regenerado.

### Qué queda (para TODO)

- Pipeline: la página generada necesita `<base href="/">` y `window.FOS_RUTA` antes de los scripts, y el texto sin JS dentro de `id="pagina-estatica"`.
- Netlify: el rewrite `/club/:id` → `/club/:id.html` es obligatorio; sin él, un refresh en `/club/boca-ar` da 404.

### Qué deja de ser cierto en ESTADO

- «El estado va en la URL» (Inicio, Ligas y navegación): club y liga viajan en la ruta (`/club/<id>`, `/liga/<id>`) y el resto en la query.

## Pantallas 4 (2026-10-20)

### Qué cambió (para CHANGELOG)

- Vålerenga 2022 y 2023 (suma del AS y el Elite): cada renglón de gastos, ingresos y financieros lleva el prefijo «AS · » o «Elite · » en su etiqueta, en
  `data/no/valerenga-no.json` (regenerado el `-data.js`). Los números no cambian. Ya no se pegan en una sola fila las dos «Lønninger» en la tabla de varios
  años. Verificado en el preview a escritorio y a 375 px (sin desborde de la página). ASSET_V 1522, `fuentes` regenerado.
- 241 (link dedicado por club y liga): solo plan y mockup, sin código. Plan técnico en `Admin/mediciones/241-plan.md`; mockup en
  `Prototyping/Links/mockup-241.html` y artifact https://claude.ai/artifact/KEHmydzDpqzhmQNLy3Pg9d.

### Qué queda (para TODO)

- Vålerenga: el prefijo está en el JSON, no en `tools/suma-entidades.mjs`: si `cargar.mjs` vuelve a escribir 2022 o 2023, lo pisa. Pipeline 8 tiene que
  prefijar en `combinar()` (`origen` ya dice «otra entidad»; hace falta la etiqueta). Alcanza con anteponer «AS · » a las filas del documento propio y
  «Elite · » a las de la otra entidad. Ålesund usa el mismo ajuste y no se tocó.
- 241: esperar el ok de Guido a la estructura (`/club/<id>`, `/liga/<id>`). Si da el ok: Pipeline escribe `generate-club-pages.js`, los redirects y la imagen OG;
  Pantallas, el estado de la ruta en `js/principal.js` (pasos en el plan).

### Qué deja de ser cierto en ESTADO

- Nada todavía: el 241 no está implementado.

## Pantallas 3 (2026-10-19)

### Qué cambió (para CHANGELOG)

- 284: Fredrikstad 2012 con estadio, capacidad (13.300), sponsor (Stabburet, principal de FFK desde marzo de 2010 durante siete temporadas, hasta
  diciembre de 2016) y marca (Adidas, desde febrero de 2012) en `tools/contexto-manual.json`, con fuentes. La compuerta de estadio y sponsor lo acepta
  (`--club fredrikstad-no --anio 2012 --liga no-eliteserien --cierre 12-31`). Sarpsborg 08 no se tocó.
- 195: Fortaleza 2025 con el CEO Pedro Martins (decisión de Guido) en `data/gestiones/br.js`, desde 2025-12-28 (el club lo confirmó ese día) y `firmo: [2025]`
  porque una nota habla del 2026-01-03 como inicio formal; Barreira y Cals dejan de cargarse. Nota en `Admin/carga-clubes/fortaleza-br.md`. ASSET_V 1398.
- 273: la skill `club-or-year-onboarding` (sección 6) nombra la compuerta de estadio y sponsor, con el texto aprobado por Guido. Para `PIPELINE.md`
  no hubo cambio: lo vigente ya figura ahí. Falta (de 273): completar a mano los ejercicios sin estadio o sponsor y que `generate-sponsors.js` sume
  `contexto-manual.json`: siguen en el TODO.
- 309: `generate-rankings.js` usa `wiki.n` como `leagueSize` cuando no hay tamaño verificado (decisión de Guido, listas raras incluidas). 289 liga-años
  con "N de los M" (eran 4). Visto en el preview (Primera Nacional 2023: "2 of the 34 clubs of the season", "Missing 32 of the 34"). ASSET_V 1399.
- `node tools/gestiones-tanda.mjs --armar`: 0 casos de gestión pendientes en la cola, no se armó tanda.

### Qué queda (para TODO)

- 284: correr el lote 95 para cargar el FLI de Fredrikstad 2012 (comando abajo; la 2013-2018 ya están). Después borrar 284 de Fredrikstad del TODO.
- 195: borrar el punto de Fortaleza. Falta del club la fecha exacta de asunción de Martins (ya en la nota del club).
- 282: Hamburgo 2024 espera el PDF del Bestätigungsvermerk del ejercicio 2023/24 (captcha de Guido); después se transcribe y se carga la línea de
  `Admin/registros/auditoria.jsonl`. La (f) es de Pipeline 4.
- 309: borrar el punto. Si una lista cuenta mal (Chile 2021, Perú, Colombia B, Grecia 2), el tamaño sale mal: corregir en `LEAGUE_SIZE_BY_YEAR`, que manda.

### Qué deja de ser cierto en ESTADO

- Si ESTADO dice que el tamaño de la liga "no está verificado" en la mayoría de las liga-temporadas, ya no: sale de la lista de Wikipedia cuando no hay verificado.
- `ESTADO-clubes.md` se regenera solo cuando se cargue Fredrikstad 2012.

### Después del merge (2026-10-19)

- Lote 95 corrido por Guido: Fredrikstad 2012 (FLI) cargado, commit 84c92fd14d; cierra contra lo impreso y contra la columna del año anterior de 2013.
- Fotballinvest AS 2008-2011 (el aviso del lote 95, el de 2010) NO se carga: el club es el FLI; nota en `Admin/carga-clubes/fredrikstad-no.md`. Del TODO 284:
  Fredrikstad 2008-2011 queda sin cargar por esa razón; Sarpsborg 08 y Pardubice siguen como estaban.
- 282, Hamburgo 2024: el PDF público de hsv.de (`hsv_jahresabschluss_und_lagebericht_2023_24.pdf`, 36 págs.) es el mismo que ya tenemos y no trae el
  Bestätigungsvermerk; solo está en el Unternehmensregister o el Bundesanzeiger, detrás de captcha. No se resuelve el captcha con ninguna herramienta:
  sigue pendiente (o candidato a mail al club, que Guido no quiere por ahora).
- 282: por decisión de Guido (2026-10-19) Hamburgo 2024 se publicó "sin informe de auditoría" (`sin_informe`, línea 310 de `auditoria.jsonl`), con nota; si aparece el Bestätigungsvermerk 2023/24, pasa a sin_salvedades. ASSET_V 1401.

## Pantallas 3, segunda tanda (2026-10-19)

### Qué cambió (para CHANGELOG)

- 252: `tools/ejercicios-nuevos.mjs` reconoce como "ya bajado" un PDF con una fecha `AAAA-MM-DD` del año esperado en el nombre (`cierre-2025-12-31`):
  River (cierre de agosto a diciembre) pasa de "a mano" a "ya en su carpeta". Probado con `--club river`.
- 252: lote 103 (`Admin/lotes/lote-103.txt`, 23 PDFs: el ejercicio siguiente de 21 clubes con el PDF ya en su carpeta; sin Bélgica, Noruega, Suiza, Países Bajos
  ni Reino Unido). Cierres fijados con `ajustes.mjs`: FC Fredericia 2020 (2020-12-31) y Hajduk Split 2025 (2025-12-31). Costo: unos US$ 5,37 de transcripción
  (15 sin `.md`, 2 sin tablas) más ~US$ 2,47 de lote; Colo-Colo y Universidad de Chile 2025 (más de 100 págs.) quedan fuera sin `--max-paginas 0`. Lo corrió Guido.
- 273: sin cambio de código. `generate-sponsors.js` ya suma lo de `contexto-manual.json` por `data/contexto/<iso>.js` (43 de 45 sponsors manuales ya están;
  los otros 2, Lierse 2020 y OH Leuven 2022, son años belgas no cargados). `--check` da "al día".

### Qué queda (para TODO)

- 252: River `estados-contables-cierre-2025-12-31.pdf` (sin `.md`) no está en el lote 103; falta para otro lote. Vasco da Gama 2024 quedó afuera: hay Associação y SAF y no sé cuál es el club.
  14 clubes (AGF, Brøndby, Chaves, Estrela da Amadora, København, Mirassol, Nordsjælland, Osasuna, Randers, SønderjyskE, Torreense, União de Leiria, Vejle,
  Villarreal) salen "ya en su carpeta" pero mi filtro por nombre no encontró el PDF del ejercicio siguiente: mirar si el script los marca de más.
- 273: borrar el resto del punto (el generador ya suma el contexto manual); los años viejos sin sponsor quedan en null por decisión de Guido.

### Qué deja de ser cierto en ESTADO

- Nada.

### Lote 103, después de la transcripción (2026-10-19)

- Transcripción y validación hechas (US$ 4,40). 0 años cargados todavía: 23 documentos frenados por la cola y por tres cierres.
- Cierres fijados: Viborg 2025 (2025-06-30), Silkeborg 2025 (2025-12-31), Dinamo Zagreb consolidado 2025 (2025-12-31).
- 23 casos de cola contestados por subagentes Sonnet (5 grupos por país) y revisados contra el .md los de Amazonas y Colo-Colo.
- Amazonas 2025 (`demonstracoes-contabeis-2025-faf-1.pdf`) es el balance de la Federação Amazonense de Futebol, no del club: respondido `descartar`; falta que Guido
  confirme si va a `Admin/registros/documentos-descartados.txt`, y buscar el balance 2025 de Amazonas FC.
- Dinamo Zagreb 2025: hay dos documentos del mismo año (consolidado e individual); el sitio tiene el 2024 desde el consolidado, así que el consolidado es el que entra.
  Rijeka: el 2024 cargado es combinado (HNK Rijeka + Stadion Kantrida) y el documento 2025 es individual: serie con perímetros mezclados (existe `financijsko-izvjesce-2024.md`, individual).
  Colo-Colo 2025: la nota 21 suma 117.232 más que el estado; causa sin explicar (candidata a `Admin/dudas-por-club.md`).
- El agente de Croacia usó Bash (solo para listar y buscar) aunque se le dijo que no.
- Botafogo-SP: nada de lo respondido sale de `demonstracoes-contabeis-2022-2023.pdf` (es de Botafogo S.A.).

### Lote 103, segunda corrida (2026-10-19)

- 0 años cargados otra vez. La corrida categorizó solo 2 documentos de Basel (de Pipeline 5, US$ 0,056) y ninguno del lote 103: el registro todavía los tenía sin "listo-para-jev". Basel no se tocó (no se escribió nada). El ensayo ahora cotiza ~US$ 0,66 de categorización para los 22.
- Unión Magdalena 2025: `[periodo]` frena con razón. El estado trae 2025 primero y el pipeline extrajo la segunda columna (2024) del documento 2025 (`.rubros.json` year 2024; la nota 24 toma 1.564.483, la columna 2024). Defecto de script, al TODO sin diseñar. Mi respuesta "aceptar" del caso 864aa95 estaba mal y la corregí con `corregir --valor no`. No cargar este año hasta resolverlo.

### Cierre del día (2026-10-19): lote 103 completo, Patro Eisden, Unión Magdalena

#### Qué cambió (para CHANGELOG)

- Lote 103: Juventude 2021 y Ponte Preta 2025 cargados (perfil contestado con búsqueda web: la regla de Guido es que ninguna carga se frena por socios u otros deportes; memoria `no-frenar-carga-por-socios`). Los 3 casos de Ponte Preta (b28 es continuación de 'Demais Gastos'; sin fila de mensalidades) se contestaron.
- Patro Eisden 2022 cargado (caso 7c6165f: esquema abreviado belga, como los otros años).
- Unión Magdalena 2025 rehecho con el cierre 2025-12-31 (lote 105, `Admin/lotes/lote-105.txt`, arreglo 298 m2 de `periodo.mjs`): ahora extrae la columna 2025. Respondidos sus 7 casos (socios no, otros deportes no, 5 categorías), falta una pasada para que se escriba.
- Dinamo Zagreb 2025: las ventas de activos de la cola quedan como `exceptional_items` (revertí mi `no_es_rubro`, que rompía el tie-out).

#### Qué queda (para TODO)

- Unión Magdalena 2025: una pasada barata (`caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-105.txt --ejecutar --cargar`); su gestión (caso cac54f1, firma Alberto Mario Garzón Wilches, Presidente, L1572 del .md) necesita una URL de fuente para `data/gestiones/co.js` y no frena.
- Lierse SK 2019: cambio de `cargar.mjs` (sacar `per.meses !== 12` de la compuerta de primer ejercicio): 298 w2, de Pipeline 5.
- Boyacá Chicó 2025 (298 p2) y Silkeborg/Viborg (q2): de Pipeline 5. Juventude y Ponte Preta: las preguntas al club siguen en `Admin/dudas-por-club.md`.
- Mejora de script (al TODO): que el gate `perfil-en-cola` de `cargar.mjs` nunca frene una carga.
- Gestión de Dinamo Zagreb 2025 (Zajec hasta el 16-09-2025, Boban desde esa fecha): falta URL de fuente.

#### Por dónde seguir

1. **238 por Latinoamérica**: 161 documentos transcriptos y validados sin localizar (ARG 24, BRA 41, LAT 96), unos US$ 50 de localizar y extraer. Un lote de 5 a 8 clubes por vez, la cola contestada por subagentes (sin Bash), número de lote a pedir a la principal. `node tools/estado.mjs` da el conteo actual; no armé el lote.
2. **165 c** (altas de los países que faltan): después del 238, un país por vez con el pipeline (skill `club-or-year-onboarding`).
3. Escala total de `estado.mjs` al 2026-10-19: 8.074 PDFs solo PDF (~US$ 1.591, Reino Unido 3.450, Estonia 1.313, Noruega 714), 1.099 transcriptos y validados sin localizar (~US$ 328) y 622 con cifras distintas o escaneos sin validar (~US$ 78). Bélgica, Noruega, Suiza, Países Bajos y Reino Unido son de otras sesiones.

#### Qué deja de ser cierto en ESTADO

- Nada nuevo más allá de lo cargado (`node tools/generate-club-index.js` regenera `ESTADO-clubes.md`).

## Onboarding 5 (2026-10-20): Suiza, Bélgica, Beşiktaş y Turquía, Colombia

Presupuesto US$ 10; gastado ~US$ 8,5 (Beşiktaş ~5,5, Colombia ~1,2, Westerlo y reintentos ~0,8, resto centavos). Lotes 109 (Suiza), 110 y 110b (Bélgica, Westerlo), 113 y 113b (Beşiktaş), 114, 114b y 114c (Colombia).

### Qué cambió (para CHANGELOG)

- Cargados: Luzern 2023; St. Gallen 2021 y 2024; Lierse SK 2019; Patro Eisden 2014; Lokeren-Temse 2021-2022; Westerlo 2015 (18 meses, modelo abreviado); Llaneros 2025 (alta, perímetro individual, color null).
- Alta de Turquía con Beşiktaş (`tr-superlig` en `data/leagues.js`, listas de la Süper Lig 2006-2022 en la caché) y 13 años: 2009-2011, 2014-2023 (2023 el alta). Quedan afuera 2006-2008 (fx), 2012, 2013 y 2024 (descartados, solo informe de gestión).
- Gestiones: Matthias Hüppi para St. Gallen en `data/gestiones/ch.js` (desde 2018-01-01: nau.ch dice fines de 2017, SRF 2018). 34 casos de gestión de cola contestados (Brasil, OFI, Luzern, Patro) con la regla del 2026-10-20: `descartar`, queda null.
- Respuestas de cola de Beşiktaş por tres subagentes Sonnet (sin Bash), revisadas por mí. Ajustes: amortización junta de 2023 partida por la nota 12 (`fila` + `categoria`), perímetro individual de Llaneros.

### Qué queda (para TODO)

- **Frenados por script** (`Admin/registros/frenados-por-script.jsonl`): (1) compensación intragrupo de St. Gallen ("Entschädigung" de/a Event AG) no se elimina en 2018-19 ni 2019-20: 2019 y 2022 ya cargados la traen sumada en ingresos y gastos (6,405 y 9,8; 2019 = 34,815 contra 28,41); St. Gallen 2020 frena con razón (caso 3531cbd) hasta que se arregle y se reemplacen 2019 y 2022. (2) Beşiktaş 2006, 2007 y 2008: el documento declara varios tipos de cambio a USD y la tool no elige.
- **Patro Eisden 2013 y 2015**: sin sponsor con fuente (2015 es Second Division); 2013 con liga null. Pregunta de criterio a la principal.
- **Beşiktaş 2018**: la extracción no trae el desglose de la nota 18; se cargó el total del costo de ventas (620,3 M) como `lump_football_operations_expense` (corrijo mi `no_es_rubro`). Defecto de extracción, sin daño en los totales.
- **Colombia**: Deportes Tolima 2023 (el `.md` no trae el estado de resultados: empieza en las notas, pág. 20; igual los 2024-2025 de Tolima, La Equidad, Alianza, Bucaramanga y Águilas Doradas: sin estado de resultados) y Alianza FC 2023 (alta sin hacer: color, liga y su cola de 6 casos; reintento por Salarios, Televisión y Estadio en 0). Águilas Doradas 2025: 13 páginas en imagen, `--reintentar`. Once Caldas y Envigado ya estaban.
- Gestiones sin fuente que quedaron en null: CRB 2020, Cuiabá 2022-2025, Ferroviária 2010-2013 y 2023, Goiás 2011-2013 y 2017, OFI 2018, Luzern, Patro 2013-2016 y 2021. Búsqueda general y wiki-extracto sin fuente con fecha.
- Criterios a mirar (mías, sin precedente): "Futbolcu Satış Zararı" en el costo de ventas (2009-2011) como `player_amortisation`; intereses por pagos diferidos de Beşiktaş ("Tecil faiz", "Reeskont") como `other_expenses` (la sociedad los pone en operativos); Llaneros con sponsor "Maxi Cola" (la página lista tres); 2008 de Beşiktaş trae ingresos financieros (31,85 M) dentro de ingresos operativos en el documento 2008 (el 2009 los separa): mirar cómo quedó 2009-2011 y qué hacer con 2008 cuando se destrabe el fx.
- Sin línea del auditor: los años cargados hoy (`node tools/auditoria.mjs --pendientes`).

### Qué deja de ser cierto en ESTADO

- Turquía existe en el sitio (Beşiktaş, 13 años); Colombia suma Llaneros; St. Gallen tiene 2019, 2021-2025 menos 2020; Bélgica suma Westerlo 2015.

### Onboarding 5, segunda tanda (2026-10-20)

- St. Gallen 2019 y 2022 recargados con `--reemplazar` (sin la compensación intragrupo, 298 ai) y St. Gallen 2020 cargado (sponsor St.Galler Kantonalbank con fuente, L27 del informe). Patro Eisden 2013 y 2015 cargados con sponsor `sin-fuente` (2013 con liga null, 2015 con el caso anio-anterior aceptado: cambio de modelo abreviado a completo).
- Gasto total de la sesión ~US$ 9. Sin hacer por presupuesto: Lierse Kempenzonen 2018-2021 (alta nueva, 7 casos en cola), La Louvière 2018-2024, Alianza y Tolima de Colombia.
- Lotes 115 y 115b (St. Gallen), 116 y 116b (Patro, Lierse Kempenzonen).

### Onboarding 5, tercera tanda (2026-10-20, lotes 117-119)

- Beşiktaş 2006, 2007, 2008 y 2018 cargados (fx 2006 por ajuste; ingresos financieros 2008 a netInterest; 2018 con ajuste `desglose` -98157). Beşiktaş queda con 2006-2011 y 2014-2023.
- Lierse Kempenzonen vzw (alta, BCE 0412.539.416, club actual de Lier, stamnummer 3970) 2018-2021: ajustes `fila` de impuestos en 2019 y 2020 y de Brutomarge en 2019 (el `.md` los omite); liga 2018 null (sin fuente que la ubique); colores amarillo y negro, brandColor #FFD500 estimado.
- Alianza FC S.A. 2023 (alta; la sociedad se llamaba Alianza Petrolera FC hasta 2023): nota 14 abierta por ajustes `fila` y `categoria` (las devoluciones en ventas, 513 M, quedan como gasto; ingresos brutos de devoluciones); nómina deportiva a `wages_squad`; sponsor `sin-fuente`; brandColor null.
- API gastada: ~US$ 0,04 (rubros sin caché de Claude). No se hizo: La Louvière 2018-2024 (necesita localizar/extraer pagos) y Tolima, La Equidad, Bucaramanga y Águilas Doradas (idem); pregunta a la principal sobre los ~US$ 0,74 de La Louvière.

- La Louvière (lote 118b, API ~US$ 0,65 autorizada por Guido): cargados 2018, 2019, 2021-2024 (modelo abreviado, Brutomarge a `lump_football_operations`). 2020 sin estado en la transcripción (2 páginas en imagen: `--reintentar`). Ligas: 2021-2022 `be-div2amateur`, 2023-2024 `be-div1amateur`, 2018-2019 null (la caché mezcla RAAL con La Louvière Centre). Estadio Stade du Tivoli.
- Colombia (Tolima, La Equidad, Bucaramanga, Águilas Doradas): todos necesitan localizar/extraer pagos; no se hizo nada con US$ 0. Los `estados-financieros-2025` de Tolima, La Equidad y Bucaramanga no traen estado de resultados (candidatos a `documentos-descartados.txt` con ok).

- Colombia con tokens de sesión (Guido): localizar y extraer de los 38 `estados-financieros-*` de Tolima, La Equidad, Bucaramanga y Águilas Doradas hechos por 4 subagentes Sonnet (sin API) y ensamblados con un script del scratchpad (`.ubicacion.json` y `.filas.json` con sus huellas). Solo Atlético Bucaramanga 2019 y 2020 traen estado de resultados: cargados (alta, color #F3E638, sponsor `sin-fuente`). Los otros 34 (todo Tolima y La Equidad, Bucaramanga 2016-2018 y 2022-2025, Águilas 2016 y 2018-2024) van a `documentos-descartados.txt`: la transcripción trae solo las notas. Águilas Doradas 2017 (5 páginas del dictamen) y 2025 (13 páginas en imagen) siguen sin transcribir bien: no se descartaron, necesitan Mistral.
- Para el TODO: el fenómeno se repite en Colombia (Tolima, La Equidad, Bucaramanga, Águilas Doradas): la transcripción pierde las páginas de los estados primarios (balance y resultados) y deja solo las notas; si se quisiera cargar esos años, hay que retranscribir los PDF.
