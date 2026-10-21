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
