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
