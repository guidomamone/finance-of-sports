# Cierre de la rama `pipeline` (Pipeline 8: to-do 333, lo no bloqueante de la revisión del 245 y el 246)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- `tools/generar-data.mjs --check`: además de recorrer los JSON, da error por un `data/<iso>/*-data.js` sin su JSON y por un id de `data/clubs.js` sin `<id>.json` (audit.js lo recoge como P1 `json-js-desfasado`).
- `tools/worktree.mjs mergear`: un `data/<iso>/*-data.js` en conflicto ya no es "conflicto real": gana el JSON mergeado y después del merge corre `generar-data.mjs` (y lo agrega al commit). Un conflicto en el JSON sigue frenando.
- `tools/renombrar-ids.mjs --verificar`: ignora la línea de ejemplo de `CLAUDE.md` con `boca`; da 0 problemas.
- Racing: título de la fuente `racing-ar-placeholder` reescrito en el JSON (el -data.js se regeneró).
- `js/cuenta.js`: `stateKey` normaliza el id de club con `window.CLUB_ALIASES` (club, pares de Comparar, clubes de ligaSim); las claves de ids ya nuevos no cambian. ASSET_V 1521 -> 1522 (por eso se regeneran fuentes/*.html y sitemap).

## Medición (gratis)

- `generar-data --check`: 319 clubes, 0 desfases; `renombrar-ids --verificar`: 0 problemas; `audit.js`: P0 0 · P1 0.
- Ningún año cargado cambia: el único diff de datos es el título de la fuente de Racing.
- Probado: `stateKey` con `boca` y `boca-ar` da la misma clave (finanzas, Comparar). No probado en vivo: el merge de worktree con un conflicto real en un -data.js.

## Qué queda (para TODO)

- Las filas ya guardadas en `saved_searches` con el id viejo conservan su `state_hash` viejo; reabrir y guardar una da una fila nueva (arreglarlo del todo pide una migración SQL en Supabase).
- Borrar el 333 de TODO.

## 334 (Pipeline 9)

- `tools/suma-entidades.mjs`: `combinar()` pone «AS · » / «Elite · » en cada etiqueta (renglones y financiero; el impuesto no, como está publicado). El nombre corto sale de los nombres de los dos PDFs del ajuste (`nombresCortos()`).
- Medido: `cargar.mjs --reemplazar --escribir` sobre Vålerenga AS 2022 y 2023 deja `data/no/valerenga-no.json` byte a byte igual. Ålesund no tiene ningún `suma-con` cargado (no cambia nada); si se carga, sus nombres saldrían «Aalesund Fotball AS» y «Fotballklubb FLI» (sin tramos en común).
- Deja de ser cierto: el TODO 334 (borrarlo).

## 270 (Pipeline 9)

- `tools/estimar.mjs`: `PAISES_SIN_ESTIMAR` (hoy `ee`) es el único lugar donde se declara un país sin estimados; el bucle de estimaciones lo saltea (club nuevo y año que falta). Sus años reales siguen entrando al ajuste del resto: ningún otro estimado cambia.
- Regenerado: desaparecen `data/estimados/ee-esiliiga.js` y `ee-meistriliiga.js`; las otras 49 ligas quedan idénticas. ASSET_V 1526 -> 1527.
- Deja de ser cierto: Estonia ya salió del punto (3) del TODO 270 (Países Bajos sigue sin decidir). Para volver a prenderla: sacar `ee` de la lista y `node tools/estimar.mjs --escribir`.

## 241, la parte de Pipeline (Pipeline 9)

- `tools/generate-club-pages.js` (nuevo): `club/<id>.html` (319), `liga/<id>.html` (52), `og/club|liga/<id>.png` (1200×630, ~30 KB cada una, 14 MB en total, tope 300 KB) y `sitemap.xml` (ahora solo lo escribe este; `generate-fuentes-page.js` lo soltó). Plantilla: `index.html`. Los números salen del motor del sitio. Ruta para la app: `window.FOS_RUTA`; el bloque de texto sin JS es `#pagina-estatica` y se oculta con la clase `js` de `<html>` (la pone el propio `<head>`; Pantallas 6 no tiene que tocarlo).
- Entra en `GENERADORES` (`generadores.mjs`, después de rankings) y en `audit.js` como `club-pages-desfasado` (P1; también chequea topes de 60 y 155, canonical, og:image y el peso de las imágenes). `cargar.mjs` y `alta-club.mjs` suman `club/`, `liga/` y `og/` al snapshot (para revertir); `rutas.mjs` (`TOCA_UNA_CARGA.SITIO`), `bfo-rusia.mjs` y `worktree.mjs` también.
- `netlify.toml`: rewrites 200 `/club/:id` y `/liga/:id`, cabecera de caché para `/og/*` y 301 `/club/<viejo>` → `/club/<nuevo>` (en el bloque `ids-alias`; `renombrar-ids.mjs` los escribe igual).
- Dependencia nueva: `@resvg/resvg-js` en `tools/package.json` (no en la raíz: Netlify corre `npm install` si hay `package.json` en la raíz). **La principal tiene que correr `cd tools && npm install` una vez**; un worktree lo enlaza solo de la principal. Fuente Inter (OFL) en `tools/fonts/`.
- Se hizo primero la muestra del 10% (`--muestra`: 32 clubes y 15 ligas), se miró a ojo, y después todo.
- Medido: `audit.js` P0 0 · P1 0; `generar-data --check` verde; `generate-club-pages.js --check` verde. No probado: el rewrite de Netlify (el servidor local no lo tiene: se abre `/club/<id>.html`, y carga bien con `<base href="/">`), ni el depurador de Facebook ni los resultados enriquecidos de Google (piden la URL pública, paso 4 del plan).
- Cambió de lo que dice el plan: la descripción y la tabla hablan de ingresos y resultado neto (no de gastos: `expenses` del motor es solo el gasto operativo y no cierra con el resultado). El título de liga dice «N clubes» (no sugiere la liga entera). Peso: cada ASSET_V que sube reescribe las 371 páginas (~22 MB), como ya pasa con fuentes/.
- Texto propuesto para la skill de arranque (sección 5, necesita el ok de Guido): sumar `generate-club-pages` a la lista de generadores de `cargar`/`alta-club`/`lote --cargar` y decir que subir ASSET_V obliga a regenerar `club/` y `liga/` (hoy ya lo hace `publicarCambios`).
- Pantallas 6 (paso 2): `js/principal.js` lee `FOS_RUTA` y escribe `/club/<id>`; ver `Admin/mediciones/241-plan.md`. Después de que entre, el TODO 241 pide el paso 4 (depurador de Facebook, resultados enriquecidos) con la URL pública.

## 327 (Pipeline 10): chequeos que dejó el 255

Tabla de los 12 con lo medido: `pipeline-327-paso1.md` en la carpeta de notas compartidas. Ya existían C-7 (`push-con-ok`) y C-8 (`skills-con-ok`, es un hook).

Hecho (audit.js, un commit por chequeo; funciones nuevas junto a `checkRutasMuertas`, llamadas en `main()` justo después de `checkRutasMuertas()`):
- C-10: `ruta-muerta` mira todos los `.md` de `.claude/skills/` (`mdsDeSkills()`), no solo cada `SKILL.md`. Hallazgos nuevos: 0.
- C-9: P3 `historia-en-doc-de-criterio`: «Versión N», fechas AAAA-MM-DD y «to-do N» en skills, `CLAUDE.md` y PIPELINE/CONVENCIONES*/PANTALLA. Hoy 3 hallazgos (191 Versión, 99 fechas, 177 to-do). Sin contadores fijos (no medidos).
- C-11: P3 `parrafo-repetido` entre `CLAUDE.md`, skills y `Admin/*.md` de primer nivel (≥200 caracteres, 80% de ventanas de 6 palabras). Hoy: 1 par (ARQUITECTURA ~ PANTALLA, los colores de marca). Cuesta ~0,6 s.
- C-12: P2 `raya-larga-visible` en `data/lang`, `js/`, html de la raíz, `club/` y `liga/`; permite «—» entre comillas, en `>—<` y como leyenda `— =`. No mira `data/<país>/*.js` (rawLabel literal de los documentos). Daba 13 líneas; arregladas (terminos, privacidad, metodologia, `js/liga.js`, `js/cuenta.js`, `data/lang/en.js`). ASSET_V 1534 -> 1535, fuentes, `club/` y `liga/` regeneradas.

Al mergear: si Pantallas 7 también subió ASSET_V, queda un conflicto trivial en `index.html` y en las páginas generadas: tomar el mayor +1 y correr `generate-fuentes-page.js` y `generate-club-pages.js`.

(Los hooks C-1 a C-6 quedaron hechos: ver abajo.)

Deja de ser cierto: nada en ESTADO. Cambia el conteo de P3 de `audit.js` (+4).

### 327: hooks (ok de Guido: «327 do it»)

En `tools/hooks/pre-tool.mjs`, un commit por freno (C-3 y C-4 juntos: comparten `estaEnWorktree()`), cada uno probado con un caso que frena y otro que pasa:
- C-1 `comandos-simples` (deny): `/tmp` suelto, `cd … &&`/`;`, `$(…)`, `${…}`, `$VAR` fuera de comillas simples. Pasan el scratchpad (`/private/tmp/claude-501/`), el mensaje de `git commit -m "…"` y el heredoc `$(cat <<'EOF' … EOF)`.
- C-2 `subagente-con-regla` (deny): `Agent`/`Task` cuyo prompt no diga «Bash» y «sin variables»; el mensaje trae la frase para pegar.
- C-3 `plan-en-worktree` (deny): solo `EnterPlanMode` en un worktree; el Exit pasa.
- C-4 `merge-en-worktree` (deny): `git merge`/`pull` en un worktree; pasan `merge-tree`, `merge-base` y `--abort`.
- C-5 `no-importar-tools` (deny): import()/require() de `tools/` en `node`, salvo `data-clubes.js` y `rutas.mjs`.
- C-6: `rsync -a` sin `--no-links` (deny); `mv` sobre `Clubes/` entra en `pdfs-con-ok` (ask, como `rm`, no deny: mover PDFs es parte del onboarding).
- `.claude/settings.json`: el matcher suma `Agent|Task|EnterPlanMode`.

Medido, reproduciendo el hook sobre una muestra de 1.477 de los 32.489 comandos Bash y 358 de los 1.432 Agent de las sesiones del proyecto (histórico, incluye sesiones anteriores a las reglas): Bash frenados ~37% (`$`/`${` 253, `cd &&` 223, `/tmp` 20, merge/pull 21 si fuera worktree, import de tools 12, rsync 2); Agent frenados 357 de 358 (casi ningún prompt viejo traía la frase). No se silenció ninguno. Revisadas a ojo 13 denegaciones de `$`/`cd`: todas legítimas.

Deja de ser cierto: nada en ESTADO. Borrar el 327 de TODO. `Admin/PIPELINE.md` no describe el hook (su cabecera sí): sin cambios.

## Pruebas 1 (bloque C: 317, 318, 319)

- 317: medido en `Admin/mediciones/317-supabase.md`. Conclusión: no sirve para decidir cuándo `data/*.js` deja de alcanzar; no migrar. Supabase real no se probó (falta el token de la cuenta para crear un proyecto); se midió en Postgres 17 local. SQL encuentra dos chequeos que `audit.js` no tiene (años faltantes, atraso del último ejercicio): condición nueva, pendiente de la Auditora 4. `audit.js` tarda ~15 s, no <1 s como dice la skill de arranque.
- 318: cerrado como «no probado» (`Admin/mediciones/318-open-notebook.md`; se reabre si Guido instala Docker). Open Notebook (`lfnovo/open-notebook`, MIT, dueño usuario `lfnovo`, repo de 2024-10) se instala con Docker, que esta máquina no tiene, y pide además un modelo de embeddings (Anthropic no los da).
- 319: `ayghri/i-have-adhd` es de la cuenta personal `ayghri` (tipo User, no es fork, MIT, creado 2026-05-13, 58 mil estrellas, último push 2026-10-19). Es una skill (`skills/i-have-adhd/SKILL.md`, `disable-model-invocation: true`, se invoca con `/i-have-adhd` y queda activa hasta «stop adhd mode»): pone la próxima acción primero, pasos numerados, un solo paso siguiente, sin tangentes, estimaciones en minutos, listas de hasta 5. Trae además un hook `SessionStart` que solo inyecta las reglas si existe el archivo `~/.claude/.i-have-adhd-always`; sin ese archivo no hace nada. No se instaló. Las copias con el mismo nombre no se enumeraron: al instalar, usar exactamente `ayghri/i-have-adhd`.
- `tools/audit.js`: chequeo nuevo P3 `ejercicio-sin-rastro` (aprobado por la Auditora 4; el de «atraso del último ejercicio» lo rechazó y su parte útil entró acá). Un hallazgo por club con los años entre su primer ejercicio y el más reciente cargado de su país que ni están cargados ni figuran en `data/faltantes/` con ningún estado. Al nacer: 51 clubes (84 club-años: 24 de hueco, 60 de cola), igual que lo medido por la Auditora. 17 de los 51 llevaban 2027 en la cola, porque el máximo del país incluía un presupuesto 2027 de un solo club; la Auditora 4 aprobó calcular ese máximo sin los ejercicios `official_budget` (6 en el sitio) y quedó: 38 clubes, 24 de hueco y 43 de cola. Los 43 de cola se miran uno por uno y los de clubes sin documento publicado se silencian por club en `tools/audit-ignore.json`, con motivo. Se silencia por club en `tools/audit-ignore.json`, con motivo, después de mirarlo. `audit.js` sigue en 0 P0 y los 2 P1 que ya daba este worktree (`faltantes-desfasado`, `estimados-desfasado`: falta un PDF de Brasil enlazado). `audit.js` tarda ~15 s (lo confirmó la Auditora); la frase «menos de un segundo» de la skill de arranque queda para que Guido la cambie.
- `ejercicio-sin-rastro`, segunda condición (aprobada por la Auditora 4): no reporta un año cuyo cierre es de hace menos de 9 meses (`RECIENTE_MESES`, copia de la constante de `tools/faltantes-liga.mjs`: el .mjs corre su main al importarlo, por eso no se importa; si cambia allá, cambiar acá). La salida depende de la fecha de hoy. Pasa de 38 clubes y 67 club-años a 31 y 54, y con los 8 silenciados de abajo quedan 23 clubes y 41 club-años.

### Revisión de la cola del chequeo (hecha el 2026-10-21; no se cargó nada)

Silenciados en `tools/audit-ignore.json`, cada uno con su motivo y la nota de sourcing: AC Milan 2014, Almagro 2024, Chievo Verona 2022-25 (club desaparecido), Ferro Carril Oeste 2024 (solo memoria narrativa), Lazio 2002, Los Andes 2022-24, Osasuna 2023 (solo memoria no financiera) y Sampdoria 2022. Silenciar es por club: si más adelante alguno publica otro año, el chequeo no lo avisa.

**Documento en mano, sin cargar (es onboarding, no sourcing; el hallazgo se va solo al cargarlo).** Rutas bajo `Clubes/<País>/<Club>/`:
- Brasil/Chapecoense: `demonstracoes-financeiras-2019.pdf`.
- Países Bajos/FC Emmen: `F.04-FCE-Jaarverslag-2019-2020-incl.-Jaarcijfers-DEF.pdf` (2020) y `F.04-FCE-Jaarverslag-2020-2021-…pdf` (2021).
- Dinamarca/FC Fredericia: `aarsrapport-<2021 a 2024>-12-31.pdf` y `aarsrapport-2025-12-31.xhtml`.
- Dinamarca/FC København `aarsrapport-2025-12-31.xhtml` (y el consolidado PSE), Nordsjælland `aarsrapport-2025-12-31.xhtml`, Vejle `aarsrapport-2025-12-31.xhtml` y Brøndby `aarsrapport-2021-12-31.xhtml`: los 2025 y el 2021 son XHTML (ESEF), no PDF.
- Dinamarca/SønderjyskE: `aarsrapport-2022-2023-09-30-transicion.xhtml` (2023) y `aarsrapport-2024-09-30.xhtml` (2024).
- Noruega/Fredrikstad: `aarsregnskap-fotballinvest-as-<2019 a 2023>.pdf`.
- Noruega/Sarpsborg 08: `aarsregnskap-fotball-invest-as-<2009, 2010, 2011>.pdf`.
- Noruega/Vålerenga: `aarsregnskap-valerenga-fotball-as-2024.pdf` (más `-elite-2024`, `-parent-fli-2024` y `wf-2023-2024-8866f96d.pdf`).
- Italia/Genoa: `Genoa-bilancio-30.06.2024-individual.pdf` (período de transición).
- España/Girona FC: `cuentas-anuales-2020-2021.pdf`, `2021-2022` y `2022-2023`.
- Bélgica/Lierse Kempenzonen: `jaarrekening-2022-06-30-individual.pdf`; Bélgica/RAAL La Louvière: `jaarrekening-2020-06-30-individual.pdf`.
- Argentina/Ferro Carril Oeste 2026 (ya reciente, no sale en el chequeo): `memoria-y-balance-ejercicio-122-2025-26.pdf`.

**Para sourcing (no hay documento en mano, pero hay una vía concreta).**
- Brasil/Ferroviária 2011 y Novorizontino 2011-12: el repositorio de la federación paulista tiene el año 2011 de otros clubes (confirmado con Ituano); el 2012 de Novorizontino está en el índice como 3 JPG, no PDF. Notas: `Admin/sourcing/Brasil/Ferroviaria.md` L40, `Novorizontino.md` L37.
- Brasil/Goiás 2019: el hueco 2018-2020 «sigue listado» en la página de transparencia del club (`Admin/sourcing/Brasil/Goias.md` L37): reintentar el enlace.
- Alemania/Mönchengladbach 2025 y VfB Stuttgart 2025: los ejercicios existen (presentados en la asamblea de 2026); buscar el Jahresabschluss/Konzernabschluss en el Unternehmensregister (notas con el chequeo del 2026-10-18).
- Italia/Monza 2025: el bilancio al 31/12/2025 «no está publicado todavía» (revisar, ya pasaron 10 meses).
- Bélgica/Lierse Kempenzonen 2023-25: la Centrale des bilans (BNB) tiene API pública; el último chequeo (2026-10-08) solo llegó hasta 2022. Reconsultar.
- Suiza/Basel 2022: la nota dice «no hay PDF para 2022 en adelante», pero en la carpeta hay `geschaeftsbericht_2022-23.pdf`; la fuente alternativa es SFL Finanzzahlen. Revisar la nota y el rótulo del año.
- Italia/Fiorentina 2020: ya está `Fiorentina-bilancio-2020-21-issuu.pdf`; falta confirmar si el 2020 es ese mismo ejercicio con otro rótulo o un 2019/20 aparte.

- 320, 321 y 322 (pedido de Guido, 2026-10-21; una medición por herramienta en `Admin/mediciones/`, sin instalar ni conectar nada, sin gasto de API):
  - 320 Browser Use: cerrado sin probar (`320-browser-use.md`). Ningún portal de las notas de sourcing encaja: los de secuencia fija tienen captcha (Hungría, Eslovenia, Francia, Perú), bloqueo geográfico (Polonia) o ya se recorren con `curl` (Colombia, Chequia, Bélgica...). Se reabre si aparece uno sin captcha y no scripteable.
  - 321 Higgsfield MCP: no conectar (`321-higgsfield-mcp.md`). Pide suscripción paga (Starter 15 US$ por mes), todo gasta créditos y no hay tope nativo. Los precios salen del blog del sitio (la página de precios no se pudo leer): Guido los confirma en vivo. Una tarjeta de un dato sale mejor de los propios datos.
  - 322 Zapier MCP y OmniRoute: no instalar (`322-zapier-omniroute.md`). Zapier gasta 2 tareas por llamada (gratis: 100 tareas por mes) y el 335 no lo necesita. OmniRoute concentra claves y prompts, trae interceptación de tráfico y empuja a modelos que el proyecto no usa; el ahorro ya lo dan la API de lotes y Opus a Sonnet. Faltan los links de OpenSEO, Book to Skill y Open Generative AI: pedírselos a Guido.
  - Para la principal: las tres líneas del 320, 321 y 322 del TODO pasan a «medido, no se hace» (o se borran), con el motivo de arriba.
  - 349 (OpenSEO, Book to Skill, Open Generative AI; `Admin/mediciones/349-herramientas.md`): ninguna se instala. OpenSEO (organización, MIT) pide DataForSEO con recarga mínima de 50 US$ y Docker o Cloudflare con R2; solo valdría para una consulta puntual del 241. Book to Skill (cuenta personal, MIT) destila libros en skills: no sirve para balances, que piden transcripción fiel. Open Generative AI (cuenta personal, MIT) es una interfaz de MuAPI, API de pago a la que se mandan los prompts; mismo motivo que el 321. Los tres links de Guido ya están cubiertos: la parte «sin ubicar» del 322 queda resuelta.

## Pipeline 13: `linea-duplicada` (aprobado por la Auditora 4, `auditoria-proceso.jsonl`)

- `tools/audit.js` (`checkLineas`): `linea-duplicada` queda solo con el MISMO monto (P1, probable copia pegada); se sacó la rama P3 «con montos distintos», un falso positivo (el mismo rótulo en dos notas o tramos).
- Medido con `audit.js --json` antes y después: `linea-duplicada` 927 (todos P3) → 0; el resto de `findings` y `silenciados` idéntico.
- Pendiente de esperar: el consolidado PSE de FC København 2025 (lector danés ya hecho por Pipeline 12), cuando la principal avise el merge de onboarding.
- `tools/worktree.mjs preparar`: antes de enlazar, saca de `Clubes/` del worktree los enlaces simbólicos rotos (destino inexistente); un archivo real o un enlace sano no se toca. Probado con un enlace roto, un archivo real y un enlace sano: solo el roto se fue (el resumen de `preparar` lo cuenta). Sin condición nueva.
- `tools/audit.js` (`checkCategorizacion`): `catchall-dominante` pasa de P2 a P3 y no cuenta cuando en la fila del catch-all caen una o dos líneas (decisión de la Auditora 4, 2ª corrida de P2 y P3). Medido con `--json`: P2 256 → 0; P3 131 (con las silenciadas, que solo cambian de severidad o salen). El resto de `findings` y `silenciados` idéntico, salvo `medicion-sin-destino` (6 → 7 archivos), que se movió porque otra sesión sumó un archivo en `Admin/mediciones/` durante la medición.
- `tools/audit.js` (`checkLineas`): `signo-invertido` (a) suma «Encargos sobre receitas», «Ertragsminderung» y «Dedu(ç)» a `DEDUCCION_FISCAL_INGRESO_RE`; (b) no marca un gasto positivo de más del 2 % cuyo rótulo dice que es neto (`GASTO_NETO_RE`: reversões, reduções, reprises, terugnemingen, perdas/). Aprobado por la Auditora 4 (4ª corrida). Medido con `--json`: `signo-invertido` 30 → 17; el resto idéntico salvo el contador `dedu-fiscal-conocida` (46 → 66 líneas), que sube porque ahora recibe las del punto (a).
- `tools/audit.js` (comparación entre pares de la misma liga): `outlier-liga` no se marca si el club tiene otro ejercicio a 2 años o menos, dentro de la banda y a menos de 20 veces (el criterio de `escala-implausible`); sin ese vecino pasa de P2 a P3. Aprobado por la Auditora 5. Medido con `--json`: `findings` P2 21 → 0 y P3 6 (más 3 → 1 silenciados, ahora P3); el resto idéntico.

### Pipeline 13: consolidado PSE de København 2025 y Hvidovre 2025 (lector danés, 345)

- **Hvidovre 2025**: hoy `tools/xhtml-aarsrapport.mjs` lo convierte sin tocar nada (563 líneas, 245/245 ubicadas, 98 hechos iXBRL, todos ocultos). Escrito `Clubes/Dinamarca/Hvidovre IF/aarsrapport-2025-12-31.md` (+ PDF de ancla, no se trackea). Cierra contra su estado de resultados: bruttofortjeneste 25.627.162 − personal 20.467.970 = 5.159.192; − amortizaciones 258.954 − otros 2.299.866 = 2.600.372; + 20.869 − 704.430 = 1.916.811 = «Årets resultat». Onboarding lo carga.
- **Consolidado PSE de København 2025 (y 2021-24, mismo diseño): NO se resuelve sin bajar el piso del 98 %.** Medido (`pdftotext` sobre el PDF de ancla de Chrome; el XHTML es una salida de ParsePort con cada línea de texto en un `div`/`span` puesto por coordenadas):
  - hoy 12 % ubicadas (810/7.043 líneas con firma). Con `pdftotext -raw` (orden del flujo de contenido, no el supuesto orden de lectura) y el alineador codicioso: 70,8 %.
  - con una alineación óptima monótona (programación dinámica: la asignación no decreciente de páginas que ubica más líneas, en vez de «la primera entre la actual y las 3 siguientes», que se desfasa para siempre tras unas pocas coincidencias falsas) más `-raw`: 95,5 %; uniendo `default`+`-raw`+`-layout`: 96,0 %.
  - el techo es ≈ 97 %: 217 líneas (3,1 %) no tienen su texto en el PDF de Chrome (pestañas rotadas como «KON NOTE 21», celdas de la tabla ESRS como «Offentligt», recuadros de portada cortados). Ningún alineador las ubica sin inventar una página, y la compuerta (b) existe para no inventarlas.
  - las notas de los estados (lo que importa para cargar) tienen 304 de 318 líneas con cifras ubicadas (96 %) una vez que cada `span` con `position:absolute` cuenta como una línea (hoy se pegan en una sola, «t.kr. 2025 2024Årets skat…»). Solo este XHTML usa esos spans: los demás de `Clubes/Dinamarca/` no cambian.
  - Lo que haría falta es una **decisión de la Auditora 5** (condición nueva, no la codeé): (1) el alineador óptimo + `-raw` como escalón cuando el codicioso no llega al 98 % (los documentos que hoy pasan quedan idénticos), (2) cada `span` absoluto como línea, (3) el piso del 98 % medido sobre las líneas que traen cifras en vez de sobre todas las líneas con firma (acá 96 %, que sigue sin llegar), o cargar el consolidado desde el PDF oficial si existiera. Mientras tanto, København 2025 se carga desde su `aarsrapport-2025-12-31.xhtml` individual (ya convertido).

### Pipeline 13: 345 (Auditora 5) y `gestion-club-inexistente`

- `tools/xhtml-aarsrapport.mjs`: (1) cada `span` con `position:absolute` cuenta como una línea (el consolidado PSE de København las pegaba en una); (2) escalón 2 de la compuerta (b): si el alineador codicioso no llega al 98 %, la misma firma y el mismo piso con la mejor asignación monótona de páginas (programación dinámica) sobre `pdftotext -raw`. Medido sobre los 42 XHTML de `Clubes/Dinamarca` (sin el PSE): 34 salen igual (mismo `.md` o misma negativa); 8 que antes frenaban en (b) ahora pasan (AaB 2025-12-31, Aarhus Fremad 2025, Esbjerg 2025, Helsingør 2025, OB 2022-2025). El PSE 2025 sigue sin pasar: 95,83 %; sus 32 líneas con cifras sin ubicar no están cubiertas por (a) (solo 403 hechos, todos en los estados principales); espera el veredicto de la Auditora 5 (el piso no se baja).
- `tools/ixbrl-resultado.mjs` (nuevo) + aviso en `cargar.mjs` (paso 6c) + ajuste `ixbrl-omitir` (`tools/ajustes.mjs`): compara el resultado cargado con el `ProfitLoss` del XHTML hermano del `.md` del mismo cierre (contexto por fechas y sin dimensiones, nombre local, escala, signo, formato, tolerancia de medio `decimals`); los ingresos solo si lo cargado es menor que `Revenue`. Aviso y fila de cola `ixbrl-resultado`; no frena (a frenazo, decide la Auditora con 10 años medidos). Leído sobre los XHTML de SønderjyskE 2024 (−4,754113), Viborg 2025 (−9,700612) y Silkeborg 2025 (25,799): igual que su registro. No corrido de punta a punta con `cargar.mjs` (el registro de transcripciones de este worktree no tiene esos PDFs): lo mide Onboarding 8 al cargar.
- Falta de la condición de la fuente (352): `fuente-xhtml-sin-url` en `audit.js` y la frase «Informe oficial en formato XHTML (iXBRL)» en `fuentes/`; pregunté a la Auditora 5 cómo marcar la fuente (el JSON no dice que el año salió de un XHTML).
- `tools/audit.js` (`checkGestiones`): `gestion-club-inexistente` una línea P3 por país; `gestion-id-sospechoso` (P1) si un id sin balance comparte país, los cinco primeros caracteres del slug **y** está a 2 letras de distancia de un club cargado (la regla sola, sin la distancia, da un P1 falso: `deportestolima-co` contra `deportivopereira-co`, y un P1 frena los commits). Medido: 26 → 5, 0 P1, el resto de `--json` idéntico.
- Fuente de un año que salió de un XHTML (345, Auditora 5): `cargar.mjs` escribe `public_note` «Informe oficial en formato XHTML (iXBRL)» en la fuente nueva cuando el encabezado del `.md` lo dice (sin url por construcción; `fuentes/` la muestra en Notas); `audit.js` (`checkFuentesPublicas`) suma `fuente-xhtml-sin-url`: P3 si la fuente sale de un `.md` de XHTML y no tiene url, P1 si la url termina en `.pdf` o empieza con `Clubes/`. Medido: 1 P3 (SønderjyskE 2024), 0 P1, el resto de `--json` idéntico. La Auditora esperaba 3: Viborg 2025 y Silkeborg 2025 se cargaron de sus PDF (`2025-rsrapport-Viborg-F-F--Prof--Fodbold-AS.pdf`, `Annual-Report-2025-Silkeborg-IF-A_S-FACT.pdf`), no del XHTML, así que su fuente es legítima y no entran.
- 354 (Orden 1): (a) `cargar.mjs`: `perfil-en-cola` ya no frena nunca; el caso va igual a la cola (`motivo: perfil`) y el 0 queda con el aviso «perfil-en-cola (no frena)»; solo revisada la sintaxis, no corrida con un club real. (b) `worktree.mjs mergear` avisa (no frena) si algún punto de «Qué queda» de las notas de sesión que la rama tocó no termina con `→ TODO n`, `→ regla`, `→ HALLAZGOS` o `→ descartado`; probado el lector de puntos con una nota de ejemplo (1 de 5 sin flecha). Ojo: las notas viejas de `Admin/sesiones/` no tienen flecha, así que el aviso va a salir en ellas la primera vez.

### Pipeline 13: tercera tanda de la Auditora 5 (faltantes, temporada, Burnley, iXBRL)

- `faltantes-liga.mjs`: los archivos generados guardan `// calculado: AAAA-MM-DD` y `--check` recalcula con ESA fecha (el calendario solo ya no los deja viejos). Salidas de `--check`: 0 al día; 1 cambiaron las entradas (o no tienen fecha) → P1; 2 las entradas no cambiaron pero se calcularon hace más de 30 días → P3; 3 el worktree no tiene los enlaces a PDF de la principal (los «en-mano» dependen de ellos) → P3 «corré `worktree.mjs preparar .`». `audit.js` (`checkGenerados`) traduce 2 y 3 a P3. Medido: worktree preparado y al día → 0; calculado hace 40 días (reloj atrasado) → 2; worktree de mentira (un `git worktree` en el scratchpad, sin enlaces) → 3 y, después de `preparar`, 0; una entrada que cambia de verdad (un alias quitado) → 1. Worktree de mentira borrado. No se tocó `Clubes/` real.
- `tools/temporada.js` (nuevo, sin `main`): una sola `temporada()` que usan `faltantes-liga.mjs` y `audit.js`. `ejercicio-sin-rastro` busca en `data/faltantes/` con la clave del `fiscal_year` y con la de la temporada: 30 → 21; FCK, Nordsjælland y Vejle dejan de salir por 2025; SønderjyskE sigue (le falta además 2023 y su FY2025 de verdad); Fredericia (2021-24) queda para datos (`club-leagues`).
- Burnley: era el único club con la clave corrida (los alias que faltan bajan de 5 a 3, solo quedan los de Lierse); `data/club-leagues/gb.js` pasó 2022 a Premier y 2023 a Championship (FY julio 2022 = temporada 2021-22). Lierse (dos ids) lo pasó la Auditora a la principal.
- `ixbrl-resultado.mjs`: regla del perímetro (consolidado → `ProfitLoss` con el único eje `GroupCompanyDataDimension=Consolidated`; individual → sin ejes; solo matriz o perímetro desconocido → no compara y lo dice) y se extiende a años cargados de PDF con un XHTML de la carpeta del club del mismo emisor (el `xbrli:identifier` está en el `.md`) y mismo cierre. Medido: Forest −78,921, Bath −2,778065 y Burnley −28,530 (consolidado) coinciden; SønderjyskE 2024, Viborg 2025 y Silkeborg 2025 iguales. Los ingresos se leen de `Revenue`, `TurnoverRevenue` o `Turnover` si hay hecho.
- Lo regenerado que viaja en el commit (`data/faltantes`, `data/estimados`, rankings, `ASSET_V`) lo resuelve `mergear` con main. Los P2 nuevos de `audit.js` (comentario-interno-publicado, sin-salarios, ruta-muerta, correcciones.html) vienen de lo mergeado de main, no de estos cambios.
- Limpieza (pedida por la principal): la fecha de cálculo de `data/faltantes/` pasó de un comentario a un dato (`window.LEAGUE_GAPS_CALCULADO = 'AAAA-MM-DD';`); `--check` la lee de ahí. Sacadas las referencias «to-do 246» de `index.html`, `js/cuenta.js` y `data/club-aliases.js` (solo comentarios; `comparar-sin-comentarios.js` confirma que el código no cambió). `comentario-interno-publicado` 66 → 0. `ruta-muerta` 4 → 0: una era un comentario de `audit.js` (reescrito) y tres van a `tools/audit-ignore.json` con motivo (`Admin/difusion/calendario.md` en la skill de difusión, que no existe: corregirla es editar una skill, con el ok de Guido; `club-v3.json` como ejemplo en la skill de contrato; `resultado-N.json` como marcador en `dudas-por-club.md`).

### Pipeline 13: 353/356, `xhtml-aarsrapport.mjs`

- Defecto de Plymouth 2022-23 (`Cannot read properties of null (reading 'push')`): el informe tiene una tabla DENTRO de otra (todo el informe en una celda); el `</table>` de la de adentro dejaba `tabla` en null y el `</tr>` de la de afuera tiraba la excepción. Arreglo: `xhtmlALineas` lee como siempre y, SOLO si tira una excepción, lee de nuevo tratando las tablas de maquetación (las que tienen otra adentro) como texto y sacando las de adentro como tablas. Medido sobre los 116 XHTML de `Clubes/` (68 británicos, los daneses y Escocia): 115 salen byte a byte igual; Plymouth pasa de error a 913 líneas, 693/693 ubicadas, 352 hechos, (a) sin faltantes. Dato para decidir: aplicar ese tratamiento a todos cambiaría 16 informes (hoy pierden 4 líneas de portada por la misma tabla anidada: Ross County 3, AFC Wimbledon 2, Burton 3, Cambridge 2, Carlisle 1, Exeter 2, Shrewsbury 2, FC Helsingør 2025); no se hizo porque se pidió no cambiar los otros.
- La condición «no pisar un .pdf/.md que la tool no generó» está consultada a la Auditora 5 y NO está codeada todavía.
- Candado (Auditora 5, aprobado): `xhtml-aarsrapport.mjs` nunca escribe, ni con `--rehacer`, un `.md` o un `.pdf` que no generó (el `.md` es suyo si su encabezado nombra la tool; el `.pdf`, solo si el `.md` hermano lo es). Probado en el scratchpad con un `.xhtml` copiado: `.pdf` de mentira del mismo nombre → sale con 1 y el PDF queda intacto, con y sin `--rehacer`; `.md` ajeno → igual; sin nada → escribe como antes; con `.md` propio, `--rehacer` rehace y sin `--rehacer` no toca. El parser no cambió (115 de 116 idénticos). Falta, como paso aparte (lo decide la principal): recuperar las 4 líneas de portada de 16 informes.

### Pipeline 13: portadas de los 16 informes con tabla anidada (pedido de la principal, Auditora 5 de acuerdo)

- `xhtml-aarsrapport.mjs`: con una tabla dentro de otra, las tablas de maquetación se leen como texto desde el principio (antes solo si la lectura fallaba, como Plymouth). Medido sobre los 116 XHTML de `Clubes/`: 100 salen byte a byte igual; los 16 con tabla anidada solo ganan líneas (ninguna se pierde ni cambia): 15 suman 4 líneas de portada («Registered number: …», nombre, título, fecha) o 1 (Cambridge United, «Company registration number»); en los 16 la compuerta (a) sigue en 0 faltantes y la (b) en el mismo porcentaje (99,6 a 100 %). Excepción a la aceptación «solo al principio»: FC Helsingør 2025 suma 8 líneas que NO están todas al principio (los encabezados «Noter» / «Notes» antes de la nota 1, entre otras); ninguna línea vieja se quita. Ningún año cargado cambia (los .md ya convertidos se regeneran solo con `--rehacer`).

### Pipeline 13: freno de IA sobre documentos deterministas (356, Auditora 5)

- `lote.mjs`: si algún documento de la lista tiene un `.md` de motor `xhtml-ixbrl (determinista)`, el ensayo lo dice por documento («¿va por etiquetas? NO, sin escalón») y al final el costo estimado en juego; `--ejecutar` sale con error y no escribe nada salvo con `--pagar-ia-xhtml "<motivo>"` (queda en `Admin/registros/pagar-ia-xhtml.jsonl`, con el motivo y los documentos, y un cierre con lo gastado). `--sin-api` no entra. Un lote sin esos documentos: ensayo idéntico línea por línea a antes (probado con `prueba-rapida.txt`).
- `audit.js`: P1 `pago-ia-sobre-determinista` si un log de API (`claude-api`, `gemini`, `mistral`) registra desde 2026-10-22 una llamada paga con `pdf` de un documento de motor `xhtml-ixbrl` sin la bandera registrada antes. Probado en un worktree de mentira (sin tocar `Clubes/` real): llamada sin bandera → P1; con la bandera antes → nada; con la bandera después → P1.
- No probado: `--ejecutar` CON la bandera de punta a punta (pagaría IA; el worktree de mentira no tiene claves) ni el costo estimado sobre el lote 133 real (su lista está en el worktree de Onboarding). El freno completo («no paga IA hasta que corra el escalón de etiquetas») espera el escalón, que espera el veredicto de la Auditora.
- `Admin/PIPELINE.md` (sección Dinamarca/XHTML) al día con todo lo de esta rama sobre la tool de XHTML.

### Pipeline 13: URGENTE, `cargar.mjs` revertía toda escritura («e is not defined»)

- Causa: la nota pública de la fuente XHTML (mía, 51bd8c7895) usaba `e.md` dentro de `escribir(P)`, donde `e` no existe (es de `proponer`); el ensayo no ejecuta `escribir`, así que pasaba. Arreglo: usa `P.md` (con try/catch: sin `.md` o ilegible, no hay nota). Reproducido y corregido en un worktree de mentira: con el `cargar.mjs` de HEAD, «REVERTIDO: e is not defined»; con el corregido, escribe y la fuente nueva trae `public_note` «Informe oficial en formato XHTML (iXBRL)».
- `tools/prueba-escribir.mjs` (nuevo): la prueba de regresión que pidió la principal; escribe de verdad en un worktree descartable (SønderjyskE 2024 sin cargar en la copia) y falla si se revierte. Pasa.
- Trampa que apareció: un worktree en `/var/folders/…` (tmpdir sin `realpath`) hace que `import.meta.url === file://argv[1]` de las tools no se cumpla y salgan en silencio con 0.

### Pipeline 13: gzip en memoria (Auditora 5)

- `xhtml-aarsrapport.mjs` e `ixbrl-resultado.mjs` detectan un `.xhtml` comprimido por los bytes `1f 8b` y lo descomprimen EN MEMORIA (`leerXhtmlTexto`); Chrome imprime una copia descomprimida en la carpeta temporal. El original no se toca (Brøndby 2025 sigue pesando 412.218 bytes). Brøndby 2025 ahora convierte en ensayo (1.512 líneas, 172 hechos, 1.320/1.334 ubicadas) y su `ProfitLoss` sin ejes es ambiguo (−130,578 / −104,164 M): `ixbrl-resultado` no decide y lo dice. Para los demás, `readFileSync(…, 'utf8')` y `Buffer.toString('utf8')` dan el mismo texto, así que no cambia nada.
- Medición de las ~407 cifras sin etiqueta ni suma (pedida por Guido): 399 sin etiqueta en el XHTML, 0 que nuestro ligado no encuentre, 10 que no son cifras del estado. El ligado no es el problema.

### Pipeline 13: escalón 0 de extraer (356, aprobado como diseño por la Auditora 5)

- `tools/extraer-etiquetas.mjs` (nuevo): ensayo y backtest, SIN enganchar a `localizar.mjs`/`extraer.mjs`. Toma los hechos iXBRL del periodo (sin ejes si individual; eje de grupo si consolidado), solo conceptos del estado de resultados (`NO_RESULTADO` saca flujo de caja, balance y patrimonio: un importe igual por casualidad no es la misma cifra), y liga por etiqueta una cifra solo si UN concepto tiene ese importe (condición (b): dos conceptos con el mismo importe → residuo de IA). `ladoDelConcepto()` dice ingreso/gasto/null por el nombre del concepto. `node tools/extraer-etiquetas.mjs --backtest` = condición (a): sobre los 6 años cargados con XHTML (SønderjyskE 2024, Viborg 2025, Silkeborg 2025, Forest, Burnley y Bath 2025): 67 líneas cargadas, 16 ligadas por etiqueta, 51 residuo de IA, **0 diferencias de lado o signo**. Las 51 son desgloses de notas que no están etiquetados; el escalón solo cubre el estado.
- `ixbrl-resultado.mjs` ahora exporta `hechos`, `sinEjes`, `grupo` (el lector de hechos) y `leerXhtmlTexto` (gzip en memoria).

### Qué queda (para quien siga esta rama sin mi contexto)

- «Solo el 133 se frena» (aceptación del freno): lo confirma la Auditora 5 corriendo el ensayo del 133 cuando esta rama y la lista estén en su worktree; no lo pude probar yo → TODO nuevo (Auditora).
- Brøndby 2025: `ProfitLoss` ambiguo (−130,578 y −104,164 M sin ejes): `ixbrl-resultado` no decide y lo dice; si se carga, falta saber cuál es el del perímetro cargado (mirar los contextos y las entidades del `ix:header`) → TODO nuevo.
- Sin hacer: `--ejecutar` CON `--pagar-ia-xhtml` de punta a punta (pagaría IA) → descartado hasta que un lote real lo necesite.

## Pipeline 14

### 1. Ensayo de `lote.mjs`: «se frenaría (determinista)» por documento

- `tools/lote.mjs`: cada línea de costo del ensayo (localizar + extraer, notas como estado, texto propio, solo extraer) suma «· se frenaría (determinista)» si el documento es de motor `xhtml-ixbrl` (con `--pagar-ia-xhtml`: «· determinista: va por IA (--pagar-ia-xhtml)»). El total final sigue igual y, si la lista tiene deterministas, agrega «Separado: corre ~US$ … (N no deterministas) · se frena ~US$ … (M deterministas)» y avisa que `--ejecutar` frena el lote ENTERO hasta sacarlos de la lista o pasar la bandera. Defecto que arregla de paso: el resumen «costo en juego» de los deterministas estaba DESPUÉS del `process.exit` del ensayo y nunca salía.
- Probado en un worktree de mentira de la rama `onboarding` (41ee2da9de, en el scratchpad, sin tocar `Clubes/` real): lote 133 → mismo total que `lote-133-ensayo2.log` (US$ 17,83; 16,48 localizar y extraer), 45 líneas marcadas y «corre US$ 0,00 · se frena US$ 17,83 (68 deterministas, 45 con costo)»; lista mixta (Hibernian 2022-23 + Amazonas 2022-23 y otros) → corre 0,16 · se frena 0,40; con `--pagar-ia-xhtml` el texto cambia y el ensayo no escribe el registro de la bandera; `--ejecutar` sin bandera sigue frenando sin escribir nada; `prueba-rapida.txt` idéntica línea por línea. `Admin/PIPELINE.md` al día.
- Trampa: `estado.mjs` en un worktree de mentira rehace el registro de transcripciones y saca los documentos cuyo PDF no está (los PDF de ancla de los XHTML viven solo en `fos-onboarding`): después de correrlo hay que restaurar `Admin/registros/transcripciones-estado.jsonl`.

### 2. `archivo-no-es-lo-que-dice` en `audit.js` (`a8eb1d70d1`, aprobado por la Auditora 5 con un cambio)

- El cambio: un `.xhtml` en gzip no es hallazgo (las tools lo leen en memoria); sí gzip o Zip en `.pdf`/`.xml`, Zip en `.xhtml` y un `.pdf` HTML con o sin BOM. Probado con archivos falsos en el worktree de mentira (salen esos cuatro; el `.xhtml` gzip sin copia, no). Hoy da 0: los dos `.pdf` HTML de abajo ya los arreglaron. Párrafo «Un documento que una tool no lee» en `Admin/PIPELINE.md` («Documentos fuente»).

- `checkArchivoNoEsLoQueDice()`: lee 64 bytes de cada `.pdf`, `.xhtml` y `.xml` de `Clubes/` (sigue los enlaces); P2 si es gzip (1f 8b), Zip (PK\3\4) o un `.pdf` que empieza con `<!doctype html`/`<html`; exceptuado si al lado está `<base>-descomprimido.<ext>`. Medido sobre 12.498 archivos: `audit.js` 18,3 s → 18,6 s (ruido), el resto de `--json` idéntico, Brøndby 2025 exceptuado. Da 2, no 0: `Clubes/Colombia/Union Magdalena/dictamen-revisor-fiscal-2021.pdf` (una página HTML) y `Clubes/Rumania/CFR Cluj/cpp-consolidat-2024.pdf` (una página del Wayback Machine), los dos sin `.md`. Mandado a la Auditora 5 (sección 7); la sesión figuraba «failed» al mandarlo → esperar su veredicto o reenviarlo.

### 3. Ventana COVID en `cargar.mjs` (puntos 1 y 3 de `Admin/propuestas/transicion-y-covid.md`; el 2, la publicNote, descartado por Guido)

- La exención de «Estadio en 0» pasó de `year === '2021'` a: cualquier fila de ceros cuyas categorías incluyan `matchday_competition` o `season_tickets` (en fútbol, «Estadio»), si el cierre del ejercicio está entre 2020-03-31 y 2021-12-31; sin cierre conocido, el año 2021 como antes. Ajuste nuevo `covid-omitir` (en `CAMPOS` de `ajustes.mjs`) la apaga por documento.
- Probado con el ensayo de `cargar.mjs --desde-verificacion --reemplazar` en el worktree de mentira: AEK 2021 y Asteras 2021 siguen exentos (cambia solo el texto del aviso); AEK 2019, 2020 y 2022 y Asteras 2020, idénticos; AEK 2021 con `covid-omitir` vuelve a frenar con el reintento de «Estadio». No ejercitado con datos reales: un ejercicio de cierre 2020 con taquilla en 0 (no hay uno a mano en esa muestra). `Admin/PIPELINE.md` al día. La REGLA de `Admin/CONVENCIONES-DATOS.md` (texto de la propuesta, sin la frase de la nota) la escribe la principal.

### 4. Tramo corto de transición sin hueco (C, puntos 4 y 5 de `transicion-y-covid.md`)

- Esquema (`9414056101`): `period_months` opcional en el año (`tools/json-datos.mjs` ida y vuelta + validación: entero de 1 a 36 y distinto de 12; `tools/generar-schema-json.mjs` → `data/schema/club-v2.json`). Aditivo, sin subir `schema_version` (skill contrato-de-datos). En el data file es `fiscalYearMeta[y].periodMonths`.
- Exclusiones (`9f531da131`): `generate-rankings.js` cuenta un año con `periodMonths` < 12 en `sinDato` (no entra con barra; `estimar.mjs` toma la mediana de la liga de los rankings, así que tampoco entra, y no le estima nada porque el año está cargado); `js/finanzas-calc.js` (`yearMetaFor` devuelve `periodMonths`, `esTramoCorto()` nueva) y `js/finanzas-multi.js` (sin Δ de flujos si el primero o el último elegido es un tramo corto; la deuda neta, que es saldo, sí); `audit.js` lo saca de `outlier-liga` y `salto-interanual`. `ASSET_V` 1653 (`publicar.mjs`). Hoy ningún año tiene el campo: rankings idénticos. No verificado en el navegador: no hay un año con el campo para verlo.
- `cargar.mjs` (`baf8514f4f`): la transición que ya existía (anterior + meses = este cierre; siguiente a +12) suma la (c), ningún anual con cierre estrictamente entre el anterior y el siguiente (otro documento del mismo cierre no cuenta). Si pasa y es de menos de 12 meses: `periodMonths` y la publicNote de la REGLA. Si no pasa: frena `periodo` y escribe sola la línea en `Admin/registros/documentos-parciales.txt` con «falta: …», también en el ensayo (cargar-lote ensaya primero), sin caso en la cola. Probado en el worktree de mentira: los años cortos cargados (OH Leuven 2019, Benfica 2007-08, Kifisia 2022, Volos 2019) y Leipzig 2018 dan el ensayo idéntico; OH Leuven 2019 con `--reemplazar --escribir` queda con `period_months: 6`, fuera del ranking de su liga, auditoría sin P0/P1.
- **Lo que esto NO resuelve todavía:** `periodo.mjs` lee el rango solo en los títulos, y Fiorentina 2020, Genoa 2024 y Atalanta 2022 salen «anual, 12 meses, confianza media» sin evidencia (la frase está en el cuerpo: Fiorentina `.md` L324 «soli 6 mesi … (1 gennaio 2020 - 30 giugno 2020)»; Genoa L978 «periodo 01/01/2024 - 30/06/2024» y L1169 «durata semestrale»). Así no entran a la escalera del tramo corto. Por eso Atalanta 2022 se cargó como año normal.

### 5. Coincidencia NO EXACTA: `lookup-club-league.js` (`91ff3c4faa`) y `alta-club.mjs` (`f99e4e12d0`), aprobados por la Auditora 5

- `alta-club.mjs` (`proponerLiga`): la coincidencia parcial única sigue valiendo (no cambia ningún resultado) pero su fuente empieza con «NO EXACTA, confirmar en la página del club». Medido con el rastro de `Admin/carga-clubes/*.md`: 70 asignaciones salieron por ahí, 7 por alias del club, 63 ni exactas ni alias, casi todas el mismo club (Roma = AS Roma). Candidatas a error de liga, pasadas a la Auditora: Dynamo Makhachkala 2021 y Lierse Kempenzonen 2018 (ya corregidas en los datos) y Alianza FC 2023 = «Alianza Petrolera» en `co-primeraA` (abierta).

- Cada coincidencia dice si es exacta (nombre normalizado igual, o alias del país en `alias.json`; con `--club <id>`, solo los de ese club); si hay alguna no exacta, «AVISO … NO EXACTA … confirmalo en la página del club». En `--json`, `exacta` y `alias`. «La Louvière» be 2021: «La Louvière Centre» NO EXACTA con aviso; «La Louvière» alias de raallalouviere-be. Parche en la carpeta de notas compartidas (`p14-lookup-no-exacta.patch`, y `p14-archivo-no-es-lo-que-dice.patch` el del punto 2).

### 6. Medición del escalón 0 (`b58dc04425`)

- `Admin/mediciones/escalon0-estado-vs-notas.md`: el estado de resultados es el 25 % del costo de localizar y extraer (69 informes británicos y escoceses ya extraídos, costo real del registro de la API). Por la regla de la Auditora (menos del 40 %), el escalón 0 no se codea.

### 7. `periodo.mjs`, escalón 3c (`f08ef2920e`, Auditora 5, sección 8, con tres condiciones)

- El tramo corto se lee de las columnas de los estados: el cierre al lado del cierre anterior (un solo salto de 1 a 11 meses, 2 votos o más, ningún par a 12). Sobre los 3.763 `.md`: cambian 4, Atalanta 2022, Fiorentina 2020, Genoa 2024 y Slavia Praha 2002 (este, un «Výroční zpráva» de 6 meses, sin cargar), todos a semestral de 6 meses. Condición (a): los primeros ejercicios (Kifisia 2022, Volos 2019, RWDM 2019, Anderlecht 2011, RAAL 2018) salen igual; (c) el diff sigue siendo esos 4; (b) es de datos.

### 8. Girona: ajuste `fila --lado financiero --destino profit_on_player_sales` (`2975e2b8d6`, Auditora 5)

- `ajustes.mjs` acepta `--destino`, `verificar.mjs` lo lleva en la fila financiera y `cargar.mjs` la suma al resultado y la escribe en `profitOnPlayerSales` (antes fijo en 0). Girona 2021-23 recargado en un worktree de mentira (con los tres ajustes: `.md` L703, L579, L770): +8,50 / −0,297 / −0,76 M, sin líneas de enajenaciones, resultado = impreso, P0/P1 0; ningún otro club cambia (sí el ranking de es-segunda y los estimados). La recarga real es de Onboarding.

### 9. XHTML del 345

- (a) Hvidovre 2025: hoy pasa las dos compuertas (563 líneas, 98 hechos, todos ocultos); el «93 hechos» del TODO es de antes del arreglo de Pipeline 13.
- (c) Brøndby 2025 (`c31fa56e34`, HALLAZGOS): no es perímetro (una entidad); el estado de cambios en el patrimonio tiene los períodos cruzados en el XHTML. El resultado 2024/25 es −130,578 M DKK; `ixbrl-resultado` no decide, correcto.
- (b) PSE de FCK: 2021, 2022 y 2024 pasan. 2023 fallaba (a) por el EPS «34,20» con la etiqueta en «34,2»: escalón 2 de la compuerta (a) (ceros decimales de más, con el separador del `format`), escrito y SIN commitear, en la Auditora (sección 8). Medido sobre los 249 `.xhtml`: cambia solo FCK PSE 2023 (pasa); 248 idénticos. 2025 sigue en (b) 96 % (piso de 98 %, veredicto pendiente desde Pipeline 13).
- Visto al medir, otro defecto: 9 XHTML daneses dan (b) «0 % ubicadas» (Horsens 2025, Hobro 2025 y 2026, Lyngby 2026, Næstved 2025, Randers 2025, Skive 2025, Viborg 2025): el PDF que imprime Chrome sale sin fuentes ni texto (Næstved: 18 págs, `pdffonts` vacío). Igual antes y después del cambio; no lo perseguí.

### 10. Chipre (`933748ad75`, `bded2d912c`)

- `tools/club-league-reference/cy.json`: Second Division 2023-24 (16 equipos, de la tabla de posiciones: la de estadios no trae a Enosis Neon Paralimni) y First Division 2024-25 (14). Catálogo: `cy-firstdivision` («First Division de Chipre», tier 1) y `cy-seconddivision` («Second Division de Chipre», tier 2), escritas con `catalogo-liga.mjs` sobre las líneas APROBADO de la Auditora (L161-162). RSSSF (`rsssf.org/tablesc/cyp2024.html`, L669-699) confirma a Omonia 29M 4.º en la fase regular y 2.º y ascendido en la ronda final.
- El alias «Omonia 29M» lo saqué (`7a3e3aa363`, regla nueva: una referencia a un club va en el commit del alta o después): lo pone Onboarding con el alta, junto con el de RSSSF («ALS Omonia 29th May») para que la segunda fuente lo reconozca.
- `alias.json`: «Alianza Petrolera» = `alianzafc-co` (`947874ec33`; mismo NIT, la Auditora lo cerró).
- El escalón 2 de la compuerta (a) de XHTML, aprobado: `366a8dd130`.

### 11. La liga de un año necesita dos fuentes (`7c7a655405`; Auditora 5, sección 7, con dos cambios)

- `tools/segunda-fuente-liga.mjs` (nuevo): la tabla de posiciones de RSSSF a `fuentes` de la liga-temporada; sin IA, nunca toca `data/club-leagues/`, User-Agent propio, un segundo entre pedidos, lo bajado en `Generados/fuentes-liga/` (ignorado), un 403/429 se descarta (worldfootball.net da 403); no escribe si no encuentra la tabla o da menos equipos que Wikipedia. `fetch-club-league-reference.mjs` conserva `fuentes`; `lookup-club-league.js` dice cuántas. Hechas: cy-seconddivision 2024 (16) e it-seriea 2022 (20).
- `audit.js` (`7795f1744b`): `liga-una-fuente` P3 por liga y `liga-fuentes-no-coinciden` P2 por club-año, con el alcance de la Auditora (asignaciones nuevas desde 2026-10-22 y las no exactas vigentes): 17 líneas P3 (61 club-años), 0 P2. La Auditora lo aceptó así (sin restringir a 2 club-años: un club-año suelto es justo el caso de riesgo).
- Punto 9, `referencia-a-club-inexistente` (P1, `03c247da8e`, Auditora 5 con un cambio: un id viejo que resuelve `data/club-aliases.js` no cuenta). Hoy 0; en un worktree de mentira, un id falso en `alias.json` y otro en `data/club-leagues/ar.js` dan 2 P1; `boca` (→ boca-ar), 0.

### 12. Pedidos de Onboarding 8: Genoa 2024 y la nota del tramo corto al recargar

- Genoa 2024: el «provento da consolidato fiscale» 280.131 (L419) iba como costo del impuesto; con el impuesto mal, el escalón «17) resta» (que ya resuelve el financiero, −4.788.914, L399) no entraba porque exige que cierre el resultado. Un escalón «signo del impuesto por las sumas» (`00d729644d`) lo resolvía cambiando solo Genoa 2024 de 974 documentos, pero un patrón de un solo club es un parche (sección 8): revertido (`1e5f028b6d`) y anotado en HALLAZGOS (`3e89afb825`) para el tercer documento. Se resuelve con el ajuste que ya dejó Onboarding: con el código de HEAD y SOLO el ajuste del impuesto (−280.131, `--reemplaza-linea 419`), la verificación da ok (impuesto 2.253.415, financiero −4.788.914, resultado −38.831.182). Los otros 4 ajustes de prueba de Genoa 2024 (las filas financieras de L394, L398 y L399) hay que anularlos (`ajustes.mjs --anular`): con ellos el financiero sale mal.
- `cargar.mjs` (`16b8388901`): con `--reemplazar` y la fuente ya existente, la nota de transición o de primer ejercicio se agrega al final de la nota pública si no está. Atalanta 2022 en un worktree de mentira: sin la nota, la recarga la pone igual a la que puso Onboarding; una segunda recarga no la repite.

### Qué queda (Pipeline 14)

- Sumar RSSSF liga por liga con `segunda-fuente-liga.mjs`, empezando por pt-primeiraliga (8), gr-superleague (7) y be-challengerproleague (6): cada una baja su P3 (lo pide la principal a una sesión de datos) → TODO nuevo (datos).
- Datos (Onboarding): Atalanta 2022 con `--reemplazar` (period_months 6, nota) sin cambiar otro año; cargar Fiorentina 2020 y Genoa 2024 (sacarlos antes de `documentos-parciales.txt`); OH Leuven 2019 y Benfica 2007-08 con `period_months`; Girona 2021-23 con los tres ajustes `fila --destino profit_on_player_sales`; el alta de Omonia 29 Maiou (ligas ya en el catálogo; los alias «Omonia 29M» y «ALS Omonia 29th May» van con el alta) → TODO nuevo (datos).
- Los 9 XHTML daneses con PDF de Chrome sin texto («0 % ubicadas») → TODO nuevo.
- La marca visual «COVID» (Pantallas, con mockup) y las REGLAS de COVID y de tramo corto en `Admin/CONVENCIONES-DATOS.md` (principal) → regla.

## Pipeline 15

### 1. `worktree.mjs mergear` trata como generados a sponsors, entidades y correcciones (`f5a624f39c`, `3c4ab6dd8c`)

- Un merge chocó en `data/sponsors.js` (de `generate-sponsors.js`) y abortó como «conflicto real». `mergear` ahora resuelve con main y regenera también `data/sponsors.js`, `data/sponsors-indice.js`, `data/entidades/` y `data/correcciones/` (los escriben enteros generadores de `tools/generadores.mjs`, que ya corría `publicarCambios`), y los suma al commit del merge. `Admin/COMO-CORRE-EL-PROYECTO.html` queda afuera a propósito: es un doc a mano con un bloque de cifras, y quedarse con main perdería lo de la rama.
- Probado en un repo de mentira del scratchpad (generador simulado, conflicto en `sponsors.js` y en `entidades/` a la vez, con la entrada mergeada limpio): antes abortaba («conflicto real: data/sponsors.js»), ahora commitea el merge con lo regenerado a partir de la entrada mergeada y el árbol queda limpio.

### 2. «Qué queda» de Pipeline 14

- Ningún punto tiene flecha a Pipeline (dos van a datos, los 9 XHTML daneses a TODO, donde esperan dentro del 356 el presupuesto de Guido, y uno a regla): no hubo nada para hacer.

### 3. 352: `ixbrl-resultado` frena para el perímetro individual (`69e82bea06`, veredicto de la Auditora 5)

- `chequearIxbrl` recibe el perímetro y devuelve `frena` solo si el hecho es único («ok»), la diferencia pasa la tolerancia y lo cargado es individual; `cargar.mjs` lo convierte en el freno `ixbrl-resultado` (con el `.md` y el ajuste `ixbrl-omitir` en el mensaje). En el consolidado sigue el aviso con su caso en la cola. Ambiguo, solo-matriz, sin-hecho, formato y perímetro desconocido nunca frenan. En `lote.mjs` sale como «8 cargar: ixbrl-resultado». `Admin/PIPELINE.md` y la cabecera de `ajustes.mjs` al día.
- Probado en un worktree de mentira (detached, preparado, ya borrado), con el ensayo de `cargar.mjs --desde-verificacion --reemplazar` y el resultado tal cual, con el signo cambiado y ×1000 (un factor solo en la copia de `cargar.mjs` de ese worktree): Fredericia 2021-25, Nordsjælland 2025, Vejle 2025 y Viborg 2025 pasan tal cual y frenan alterados con el mensaje del caso. Brøndby 2021 (sin hecho) y Midtjylland 2020 (sin XHTML del mismo cierre) no comparan. FCK 2025 y SønderjyskE 2024 salen consolidados en este ensayo, con un hecho que es solo de la matriz: avisan y no frenan (la Auditora los midió como individuales, llamando a la función directamente). Forest, Bath y Burnley 2025 no tienen `.verificacion.json` (carga con tokens): con las dos funciones que llama `cargar`, Forest y Bath pasan y frenan alterados, y Burnley (consolidado) solo avisa. Ningún año cargado frena tal cual.

### 4. Registro de rarezas del documento (`36e23234e4`, `4c49fa5771`; Auditora 5, sección 7, con dos cambios)

- `tools/rarezas.mjs` agrega, lista y chequea `Admin/registros/rarezas.jsonl` ({md, linea, texto, tipo, veredicto, cita, autor, fecha}). Una rareza cubre un hallazgo solo si es del mismo `.md`, a ±3 líneas, con su texto todavía ahí, y si lo que cita el hallazgo es lo registrado: una cifra tiene que estar entera, así que otra cifra de la misma tabla se marca (cambio 1). La cita tiene que nombrar `L<n>` o `pág. <n>` (cambio 2). La leen `audit.js` (`coma-comida` no marca la cifra registrada; `rareza-sin-su-texto` P3 cuando una re-transcripción la mueve), `auditoria.mjs --extractos` (bloque al final del extracto) y `cola.mjs` (al lado del caso). `verificar.mjs`, sin tocar: una errata de cifra no dice qué valor se carga.
- Migradas 6, con las notas originales en su lugar: Goiás 2018 L97, Ponte Preta 2023 L551, Santos 2024 L420, Sporting 2007-08 L1636, Beşiktaş 2018 L2587 y Bologna 2021-22 L2858. Medido: hoy no deja de marcar ningún hallazgo automático (`audit.js` 272 antes y después; `auditoria.mjs --check` 0; la cola, 1 caso ya contestado). Lo que evita es la relectura de sesiones y subagentes.
- Probado en el scratchpad (24 de 24, con la aceptación de la Auditora: la cifra registrada no se marca, otra de la misma tabla sí, «32» no es «322», y una cita sin L ni pág. se rechaza). `--extractos`, en un worktree de mentira ya borrado.

### 5. Barrido de lecturas recortadas que deciden (regla de PIPELINE.md «Una tool que decide no lee solo una parte del documento»)

- Medido gratis sobre los 3.763 `.md` y con los ensayos de `caja-deuda.mjs --medir`. Sin pérdida: la marca de `xhtml-aarsrapport.mjs` en 400 caracteres (6 sitios; 76 de 76 adentro), la de escaneo de Mistral en 1500 (778 de 778), `pdftotext -l 2` de `mistral-ocr-transcribe.mjs` (solo marca) y `TOPE_PAGINA` de `alta-claude.mjs` (ya avisa). `cargar.mjs:215` corta la cabecera del club a 6000 caracteres (105 de 321 la pasan), pero ese valor (`cabecera` de `perimetroHeredado`) no lo lee nadie.
- Ahora avisan, sin cambiar lo que se pide ni ninguna decisión: `caja-deuda.mjs` (`71bb67cb19`; 162 documentos cortan en las 120 filas a Jev, 0 en los 60.000 caracteres a la IA y en las 150 filas de personal), `perimetro-senales.mjs` (`edaeb90506`; 110 cortan en los 6000 caracteres a Jev, texto idéntico en los 3.763) y `alta-club.mjs` `nombreLegal` (`3f5e21eb2e`; 356 pasan las 4000 líneas).
- El detalle, con casos: `p15-recortes.md` en la carpeta de notas compartidas de la principal.

### 6. `emisorDe` lee el archivo entero si hace falta (`27f4857971`, Auditora 5)

- Primero los 600 KB y, si ahí no está el `identifier`, el archivo entero. Antes, 17 de 249 XHTML quedaban sin emisor (AGF 2022-25, AaB 2025, Brøndby 2025, el PSE de FCK, Silkeborg 2025 en el byte 2,69 MB); ahora 0, y los 249 tardan 342 ms (el más lento, 48 ms). Aceptación: Silkeborg 2025 encuentra su XHTML, compara y pasa (25,799); ningún otro año cargado cambia.

### 7. `segunda-fuente-liga.mjs`: la sección por su nombre, UTF-16 y filas con un espacio (`f1f696f9ba`, Auditora 6 con un cambio)

- Los tres defectos de frenados-por-script (Onboarding 9, 358). La sección de la división sale del enlace del índice con el texto exacto, o de la única línea suelta con el título entero (sin otra palabra ni número después: el cambio de la Auditora); si no la identifica, frena. Lee UTF-16 con BOM, y la caché guarda los bytes como llegaron. Acepta filas con un espacio si traen PJ G E P y goles, y la posición «-.» de un retirado. Medido sobre 38 páginas en caché (copiadas de `fos-onboarding`): las 26 fuentes ya escritas, iguales; 19 de los 21 frenados pasan; pt-liga3 2023 y gr-superleague2 2025 (dos grupos: la primera tabla trae la mitad) frenan bien.

### 8. `lote.mjs`: aviso de alta con más de un ejercicio (`b8592e1586`, Auditora 6)

- En el ensayo, un club que no está en el sitio con más de un documento en la lista. Solo avisa. Lote 133: 22 de 28 altas; lote 134 y las listas de prueba: 0.

### Qué queda (Pipeline 15)

Guido cerró lo abierto: lo que sigue no se empezó o quedó como parche, sin commitear, en la carpeta de notas compartidas de la principal.

- Barrido de recortes, veredictos de la Auditora 6 (285d4b5f6c en ligas): (2) los encabezados de balance de la página entera, APROBADO, volver a aplicar el cambio revertido (`--medir` dio idéntico en 779 años); (3) `nombreLegal` y (4) señales de intermedio, APROBADOS como ventana de portada: un comentario en el código con la medición (63 de 356 y 394 falsos intermedios) y la frase en la regla de PIPELINE.md «salvo una ventana de portada declarada en el código, con la medición de leer entero»; (1) Jev con todas las filas, APROBADO CON UN CAMBIO: antes de commitear, volver a pedirle a Jev los 162 documentos en ensayo y entregar los años cuya caja o deuda cambia, cada uno como corrección con cita y trailer `Corrige:` → TODO 363.
- `cabecera` de `perimetroHeredado` (`cargar.mjs:215-220`) se calcula y no la lee nadie: se saca como limpieza, sin veredicto (Auditora 6) → TODO 363.
- `falta_documento` en `auditoria.mjs`: parche `p15-falta-documento.patch`. Aprobado por la Auditora 6 (ba77d32aec) con dos cambios: las marcas «--- pág. N ---» de 1 a N sin saltos (no solo la última), y las 13 sin `.md` propio también como `falta_documento`, con la cita en el `.md` de la fuente del año. Migrar las 58 con un subagente Sonnet, el lote entero pasando `--check` antes del commit. Medido con el parche: de 58, 45 con el `.md` completo y 0 con páginas sin transcribir → TODO 363.
- Hecho después del cierre: el escalón 0 de `periodo.mjs` (el período etiquetado del iXBRL) entró, porque la Auditora 6 confirmó la condición (5 de 5 daneses cargados iguales; Hvidovre no está cargado). Destraba los 16 británicos del lote 133. El registro de períodos (`transcripciones-estado.jsonl`) se pone al día en la próxima corrida de `estado.mjs` → descartado.
- `xhtml-aarsrapport.mjs`: reconstruir las filas por posición cuando el XHTML está maquetado con div o span (12 británicos: Hibernian, Bolton, Bristol Rovers, Cambridge, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford, Tranmere), y que `lote.mjs` frene en el ensayo un `-ixbrl.md` sin tablas. Sección 8, medir antes y después sobre los 249 XHTML. No empezado → TODO 356.
- El freno de documentos de grupo (regla votada 3 a 0 en CONVENCIONES-DATOS, bf2cfc3d76): en `perimetro-senales.mjs` o `cargar.mjs`, con dos señales del documento (segmentos donde el deporte queda debajo del 90 %; venta o compra de la sociedad del club en el ejercicio). Esperado: frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo; a la Auditora 6 por la sección 7. No empezado → TODO 362.
- Que la skill `auditoria-finance-of-sports` (eje datos) y la de la cola digan «antes de reportar algo raro de un documento, `node tools/rarezas.mjs --md <ruta>`»: es donde se repite la relectura. Texto para la principal (la Auditora se lo pasa) → TODO 363.
