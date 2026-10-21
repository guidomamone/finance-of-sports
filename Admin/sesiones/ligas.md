# Cierre de la rama `ligas` (to-do 295: balances de las entidades que organizan las ligas)

## Qué cambió (para CHANGELOG)

- Carpeta nueva `Ligas/<País>/<Entidad>/` para los balances propios de las entidades organizadoras (fuera de `Clubes/`, que recorren las
  tools del pipeline); notas de sourcing en `Admin/sourcing/Ligas/<entidad>.md`. Decisión de Guido, 2026-10-18.
- `tools/auditoria.mjs` acepta citas de `.md` trackeados en `Ligas/` (solo en `trackedSet`; coordinado con fos-finanzas).
- Premier League: cuentas del grupo 2024-25 (Companies House 02719699) bajadas y transcriptas; auditor Deloitte LLP, sin salvedades.
  Primera línea de `window.LIGA_AUDITORIA` (`gb-premierleague`, 2025).
- DFL: nota de sourcing; el Konzernabschluss 2024-25 está en Unternehmensregister detrás de captcha y login.

## Qué queda (para TODO)

- DFL: el Konzernabschluss 2024-25 pide login en Unternehmensregister (gestión de Guido); probar antes Bundesanzeiger y el sitio de la DFL.
- Seguir con las entidades en el orden del plan: LaLiga, Lega Serie A, J.League, Liga Portugal, AFA, CBF, EFL y el resto.
- AUF (Uruguay): en espera, sin liga uruguaya en `data/leagues.js` (Guido: no resolverlo todavía).

## Qué deja de ser cierto en ESTADO

- "No hay ningún balance de entidad organizadora en el proyecto": ya está el de la Premier League.

## PDF copiados a la carpeta principal (rsync)

- `Ligas/Inglaterra/Premier League/premier-league-group-accounts-2024-25.pdf`

## Después del merge del 2026-10-18

### Qué cambió

- LaLiga: cuentas consolidadas 2024-25 de la LNFP (cartera PDF de laliga.com/transparencia: cuentas firmadas + informe, digitales) en
  `Ligas/España/LaLiga/`, con sus `.md`. Auditor Netadia Europa, S.L.P. (por encargo del CSD), sin salvedades. Líneas de
  `LIGA_AUDITORIA` para `es-laliga` y `es-segunda`, 2025.
- Lega Serie A: nota de sourcing; el bilancio existe y lo audita una società di revisione (estatuto), pero no se publica: candidato a mail.
- Liga Portugal: nota de sourcing; el Relatório e Contas solo se manda a los asociados (estatuto, art. 42.º): candidato a mail.
- AFA: nota de sourcing; el balance al 30-06-2025 con informe del auditor existe (boletín 6772) pero no se publica; IGJ con clave fiscal.
- CBF: nota de sourcing; se conocen los links de los PDF auditados (2013-2025), pero el CDN de la CBF no deja bajarlos desde acá.
- J.League: balance, resultados e informe del auditor 2025 desde el registro japonés de entidades de interés público (koeki-info.go.jp),
  en `Ligas/Japón/J.League/`. Auditor 太陽有限責任監査法人 (Grant Thornton Taiyo), opinión limpia. Línea `jp-j1` 2025.

### Qué queda

- CBF: Guido baja el PDF 2025 desde su navegador (link en `Admin/sourcing/Ligas/cbf.md`); después, transcribirlo y cargar la línea.
- Seguir con EFL y el resto.
- Lega Serie A, Liga Portugal y AFA: decidir si se les escribe (y, para la AFA, si se pide a la IGJ) (Guido).

### PDF copiados a la carpeta principal (rsync)

- `Ligas/España/LaLiga/laliga-cartera-cuentas-consolidadas-2024-25.pdf`, `laliga-cuentas-anuales-consolidadas-2024-25.pdf`,
  `laliga-informe-auditoria-consolidado-2024-25.pdf`
- `Ligas/Japón/J.League/jleague-kashitaishohyo-2025.pdf`, `jleague-sonekikeisansho-2025.pdf`, `jleague-kansahokoku-2025.pdf`

## Después del merge del 2026-10-18 (2)

## Auditora 3: votación de dos criterios de Bath Rugby (to-do 248), 2026-10-20

### Qué cambió (para CHANGELOG)

- Dos reglas votadas en `Admin/CONVENCIONES-DATOS.md` y dos líneas en `Admin/registros/auditoria-proceso.jsonl`: el anticipo de CVC va a `other_income` (3 a 0) y el «Fair value movements» de 2021 va a `other_income` (2 a 1). Registradas en `reglas-categoria`. No se cargó nada.

### Qué queda (para TODO / 248)

- Plan 248, decisión 10: corregir. El documento imprime «CVC income» como fila aparte, no dentro de «Central income»; `central_income` queda solo con PRL y RFU. Decisión 13: `assetSales` queda descartado.
- Datos 4: con la revaluación en `other_income`, los ingresos de 2021 (11,6 + 0,15 + 6,66) no igualan el Turnover impreso; hay que contemplarlo en el chequeo contra Turnover y silenciar ambos porcentajes en `tools/audit-ignore.json`. 2021 no tiene `.md` (falta transcribir 2020-21).
- Las `publicNote` de 2021 a 2023 explican el diferimiento del anticipo y la revaluación no realizada.

### Qué deja de ser cierto en ESTADO

- Nada (Bath aún no está cargado).

- Las dos reglas de Bath quedaron sin `EJEMPLO-CATEGORÍA`: `reglas-categoria.mjs` exige un club que esté en `data/clubs.js` y `bath-gb` todavía no está. Agregarlos (`bath-gb | revenue | CVC income | other_income` y `bath-gb | revenue | Fair value movements | other_income`) cuando se dé de alta el club, y correr `node tools/reglas-categoria.mjs --escribir`. Además la tool falla hoy por una regla ajena (L386, `rosariocentral` no está en `data/clubs.js`), así que `--escribir` no registró nada.

## Auditora 4: las 4 condiciones nuevas del to-do 339 (Pipeline 11), 2026-10-20

### Qué cambió (para CHANGELOG)

- Cuatro veredictos en `Admin/registros/auditoria-proceso.jsonl`, sobre `Admin/mediciones/339-inventario.md` sección 5: las cuatro aprobadas, cada una con un cambio (la 3, con dos). No se codeó nada.

### Qué queda (para TODO / 339, lo hace Pipeline 11 después del 248)

- Filtro de ejemplos: contra la unión ingreso+gasto del deporte, no por lado (si no, el fútbol deja de ser idéntico por 13 líneas cruzadas). Aceptación: backtest de Jev y prompt de Claude de fútbol byte por byte iguales.
- `CATEGORÍA (prompt, deporte)`: el validador exige deporte válido e ids de la frase presentes en la taxonomía de la regla; la regla del CVC nombra `central_income` y hay que reescribirla o marcarla rugby.
- Tabla de ceros: una sola para `CATS_CERO` (5 entradas), el chequeo de L798 (3) y `LADO_CERO` de verificar; clave explícita por deporte activo (rugby `{}`) con chequeo en `audit.js`; las preguntas de perfil (socios, otros deportes) se saltean sin tabla.
- Deporte sin declarar: leer ficha, luego la liga de `data/leagues.js`, luego menciones; preguntar solo si nada responde, y sumar `sport` a los campos que cortan el alta. Medido: 31 de 400 carpetas (700 de 3.673 documentos) no mencionan el fútbol; sin la liga como fuente, esas altas legítimas se frenarían.

### Qué deja de ser cierto en ESTADO

- Nada.

### Texto propuesto para la skill `auditoria-finance-of-sports` (esperando el ok de Guido; no se editó la skill)

Hoy la skill no dice cómo se aprueba o rechaza una condición nueva en las tools del pipeline. Sección nueva, «Condiciones nuevas en las tools»:

> **Cuándo.** Una condición nueva es todo lo que agrega un frenazo, un aviso, un filtro o una pregunta a una tool del pipeline (`cargar.mjs`, `alta-club.mjs`, Jev, `categorizar-claude.mjs`, `verificar.mjs`…), o cambia lo que una tool asume. La Auditora la aprueba o la rechaza antes de que se codee; el veredicto va a `Admin/registros/auditoria-proceso.jsonl`.
>
> **Las cinco preguntas, en orden:**
> 1. ¿Qué problema real la motiva? Un caso con nombre (club, año, documento). Sin caso, se rechaza.
> 2. ¿Puede frenar o descartar una carga buena? Se mide contra los datos y lotes de hoy, con el comando que lo da, y se escribe el número.
> 3. ¿Puede dejar pasar una carga mala? Qué otro chequeo (tie-out, `auditAll()`, la cola) la atrapa si esta condición falla o no existe.
> 4. ¿Qué cambia para lo ya cargado? Debe ser nada: se exige una comparación antes y después (prompt, backtest, `generar-data --check`, `audit.js`) y se dice cuál.
> 5. ¿Se puede apagar o corregir sin tocar datos? Si una sesión se queda trabada, la condición tiene que poder saltearse con un ajuste o una respuesta en la cola.
>
> **Qué se mide.** El número de casos que cambian de resultado (años, clubes, documentos), no una opinión. Si no se puede medir hoy, se dice qué falta y la condición va como aviso, no como frenazo.
>
> **Aprobada**: las preguntas 2 y 3 no muestran daño y la 4 da cero cambios. **Aprobada con un cambio**: sirve, pero tiene un borde medido (se escribe el cambio exacto y su criterio de aceptación). **Rechazada**: cuando (a) frena casos buenos medidos y no hay forma de distinguirlos de los malos, (b) no tiene un caso real, (c) cambia lo ya cargado sin que Guido lo haya decidido, (d) duplica un chequeo que ya existe, o (e) resuelve con una regla de datos lo que es un criterio: eso va a `votacion-de-criterios` y no se aprueba acá.
>
> **Una condición que relaja** (como una tabla vacía) se evalúa igual, con la pregunta 3 como la importante.

### Las 4 condiciones del 339 con ese criterio (resumen; el detalle está en los veredictos)

| Condición | 1 caso real | 2 frena lo bueno | 3 deja pasar lo malo | 4 cambia lo cargado | 5 se puede saltear | Resultado |
|---|---|---|---|---|---|---|
| Filtro de ejemplos | Bath: Jev vería ejemplos que no puede elegir | No: solo recorta ejemplos (0 de 36.045 líneas fuera de la lista de fútbol) | No: sin ejemplos Jev usa el criterio | Solo si se filtra por lado (13 líneas); por unión, nada | No hace falta: no frena | Aprobada con un cambio |
| `CATEGORÍA (prompt, deporte)` | La regla del CVC ya nombra un id de rugby | No | Un deporte mal escrito pasaría callado: el validador lo corta | El prompt de fútbol cambia como mucho en una línea | Sí: sin deporte vale para todos | Aprobada con un cambio |
| Ceros por deporte | Bath no tiene medición de ceros | No (relaja) | Un 0 malo en rugby: lo atrapan los tie-outs y la revisión de 5 documentos | Nada si las 5 entradas de fútbol se copian | Sí: `cero-real` | Aprobada con dos cambios |
| Deporte sin declarar | El default `futbol` de `alta-club.mjs` | Sí si «sin mención» cuenta como sin declarar: 31 de 400 carpetas | Sin la condición, un club de otro deporte entra como fútbol | Nada: los 319 declaran | Sí: respuesta en la cola | Aprobada con un cambio |

## Auditora 4: veredicto de los 6 commits del 339 mergeados a main, 2026-10-20

### Qué cambió (para CHANGELOG)

- Seis líneas en `Admin/registros/auditoria-proceso.jsonl`: `121399a592`, `78200045c5`, `fb65c62b59`, `0b82bf3e64`, `5c5e959e72` y `98272cbcf8`, todos APROBADOS. Ninguno se revierte.

### Qué queda (para TODO / 339)

- `deporteODefecto()` devuelve `futbol` para un club que no está en `data/clubs.js` (Jev, `categorizar-claude`, `cola.mjs`): es el «asumir fútbol» que se quería sacar. No deja pasar datos malos (`cargar.mjs` rechaza por la taxonomía del club), pero conviene que devuelva null y pida el deporte. Para Pipeline 11, no bloquea.
- 5 altas de fútbol (All Boys, Toros de Córdoba, Athens Kallithea, RKC Waalwijk, Baník Ostrava) van a pedir el deporte en la cola. La respuesta es `futbol`; la principal las contesta sin ir a Guido.
- El prompt de fútbol cambió en dos frases (reglas de la tienda y del CVC): una invalidación del caché, sin cambio de sentido.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: 334 y 339 (a), (b), (c), 2026-10-20

### Qué cambió (para CHANGELOG)

- Cuatro líneas más en `Admin/registros/auditoria-proceso.jsonl`: `dd0d4a1d6b` (334, prefijo de entidad en `suma-entidades.mjs`), `05ebe22888` (339 a) y `54e18dc4b6` (339 b), APROBADOS; la condición del 339 (c), coma comida por el OCR, APROBADA CON UN CAMBIO.

### Qué queda (para TODO / 339)

- (c): el commit que la codee tiene que dejar resueltos los 4 hallazgos (Bath 2023-24 L162 y 2024-25 L207, Everton 2023-24 L341 y 2024-25 L157): corregir el `.md` o silenciar con motivo en `tools/audit-ignore.json`. Everton no tiene datos publicados afectados (la cifra dañada es la del año anterior; los años cargados salen del estado de resultados y coinciden con la cifra buena). En Everton 2023-24 hay otra fila dañada que la regla no atrapa («Sponsorship… 24.3 216 2?»).
- 334: cuando se cargue Ålesund con `suma-con`, los prefijos saldrían «Aalesund Fotball AS» y «Fotballklubb FLI»; mirarlos entonces.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: frenado de Bath en `verificar.mjs`, 2026-10-20

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: el cambio de `verificar.mjs` (el ajuste manual `desglose` se prueba antes de `cerrarNota()`), APROBADO; Pipeline 11 puede commitearlo en `onboarding`.

### Qué queda

- Nada nuevo.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: `e500bdab8c`, `c514bddfff` y `deporteODefecto()` desde el registro de altas, 2026-10-20

### Qué cambió (para CHANGELOG)

- Tres líneas más en `Admin/registros/auditoria-proceso.jsonl`: `e500bdab8c` y `c514bddfff` APROBADOS; la propuesta de que `deporteODefecto()` lea el deporte de `altas-club.jsonl` (y devuelva null si no hay fuente), APROBADA CON DOS CAMBIOS.

### Qué queda (para TODO / 339)

- `deporteODefecto()`: orden ficha, registro de altas (solo con `sport` no nulo y su fuente), null. Medir antes de dar por buena la condición cuántos documentos de las listas de prueba tienen un club sin ficha y sin línea de registro; si el lote corre Jev antes del alta, que el lote corra `alta-club` sobre sus carpetas antes de la etapa 5.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: tres alineaciones al deporte (Jev --desde-sesion, caja-deuda --partir, audit.js), 2026-10-20

### Qué cambió (para CHANGELOG)

- Tres líneas más en `Admin/registros/auditoria-proceso.jsonl`: los tres cambios de Pipeline 11 en el working tree de `onboarding` (freno 4 de Jev, `caja-deuda --personal --partir`, `sin-salarios` y `sueldos-escondidos` de `audit.js`), APROBADOS.

### Qué queda

- `audit.js` trata un club sin `sport` como fútbol: sumar un hallazgo `club-sin-deporte` junto con el null de `deporteODefecto()`.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: `ced0a94508`, el deporte sin default fútbol, 2026-10-20

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: `ced0a94508` (`resolverDeporte`, `sport` en `altas-club.jsonl`, `club-sin-deporte` P1), APROBADO CON UN CAMBIO.

### Qué queda (para TODO / 339)

- `lote.mjs` corre `alta-club` solo fuera del modo `--sin-api`; hay que sacarlo del `if (!SIN_API)` (Pipeline 11).
- Después del merge: `node tools/alta-club.mjs --todos` (gratis, ~20 s) en la principal, para que el registro de altas trackeado tenga `sport`.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: freno 5 de Bath, `alta-club` club-leagues y `worktree.mjs`, 2026-10-20

### Qué cambió (para CHANGELOG)

- Tres líneas más en `Admin/registros/auditoria-proceso.jsonl`: `checkCategorias` de `audit.js` por deporte y el año en la línea existente de `club-leagues` (`alta-club.mjs`), APROBADOS; `worktree.mjs` (enlace a `tools/node_modules`), APROBADO CON UN CAMBIO.

### Qué queda

- `.gitignore`: cambiar `tools/node_modules/` por `tools/node_modules` (sin barra final), en el mismo commit que el enlace de `worktree.mjs`. Con la barra git no ignora un enlace simbólico y un `git add -A` lo agregaría.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: `32dafd0a90` y `audit.js` sin ids de fútbol fijos, 2026-10-20

### Qué cambió (para CHANGELOG)

- Dos líneas más en `Admin/registros/auditoria-proceso.jsonl`: `32dafd0a90` (`lote.mjs` corre `alta-club` antes del filtro de `--sin-api`) APROBADO; el barrido de `audit.js` y `pruebaDeDeporte()` (P1 `deporte-muestra`), APROBADO CON UN CAMBIO.

### Qué queda (para TODO / 339)

- `pruebaDeDeporte()` tiene que envolver cada chequeo en try/catch (limpieza en finally) y reportar una excepción como P1 `deporte-muestra`: si no, un deporte nuevo puede tirar abajo todo `audit.js` y ocultar el informe de los datos reales.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: `7e1971717e` y `af445e43f2`, cierre de la revisión del 339, 2026-10-20

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: `7e1971717e` (`audit.js` con try/catch por chequeo) y `af445e43f2` (`PIPELINE.md`), APROBADOS. Todo el 339 de la rama `onboarding` queda aprobado para el merge.

### Qué queda

- Después del merge: `node tools/alta-club.mjs --todos` (gratis, ~20 s) en la principal, para que el registro de altas tenga `sport`.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: frenado #10 de Bath (validar en `--sin-api` y encadenar `verificar`), 2026-10-20

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: `lote.mjs --sin-api` corre `validar()` si es gratis o frena con el costo, y `validar-bloques.mjs --ejecutar` encadena `verificar --rubros` e inventario; APROBADO.

### Qué queda

- Nada nuevo.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: frenado #15 de Bath (`alta-club.mjs --deshacer`), 2026-10-20

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: `alta-club.mjs --deshacer <clubId>`, APROBADO CON UN CAMBIO.

### Qué queda

- `--deshacer` solo restaura `index.html` a HEAD si su diff trae únicamente el `ASSET_V` (la constante y los `?v=`); si trae otra cosa, va a «revisar a mano». Hoy lo restauraría entero y borraría ediciones a mano sin commit.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: frenados #7 y #13 de Bath (`--pagina` de Mistral y `publicar.mjs`), 2026-10-20

### Qué cambió (para CHANGELOG)

- Dos líneas más en `Admin/registros/auditoria-proceso.jsonl`: `mistral-ocr-transcribe.mjs --pagina` y `tools/publicar.mjs`, APROBADOS.

### Qué queda

- Nada nuevo.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: frenados #17 y #16 de Bath (`caja-deuda.mjs`), 2026-10-20

### Qué cambió (para CHANGELOG)

- Dos líneas más en `Admin/registros/auditoria-proceso.jsonl`: `escalaDe()` con el escalón 1b (la escala del estado contradice la escala 1 inferida) y `--personal` con el total sin rótulo y la escala por `escalaDe`, APROBADOS.

### Qué queda

- Nada nuevo.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: frenados #8, #9a y #12 de Bath, 2026-10-20

### Qué cambió (para CHANGELOG)

- Tres líneas más en `Admin/registros/auditoria-proceso.jsonl`: `armar-a-mano.mjs` con etiqueta sintética para un subtotal o total sin rótulo, `ajustes.mjs --etiqueta-diferencia` y `tools/fuente.mjs`, APROBADOS. El #9b (proponer la fila de redondeo) queda sin hacer a propósito: es un criterio de datos.

### Qué queda

- Nada nuevo.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: to-do 341 (estadio-sponsor de rugby y prompts con el deporte), 2026-10-20

### Qué cambió (para CHANGELOG)

- Dos líneas más en `Admin/registros/auditoria-proceso.jsonl`: `estadio-sponsor.mjs` con la ficha de rugby, APROBADO (y recomendación de NO sumar `gb-premiershiprugby` a `SOLO_ESTADIO`); los prompts de lectura con el deporte del club, APROBADO CON UN CAMBIO.

### Qué queda (para TODO / 341)

- `lote.mjs`: el tramo que corre `alta-club` para llenar el registro de altas tiene que ir antes de `localizar` (hoy está después de `extraer`); si no, un club nuevo de fútbol lee con «clubes de deporte».

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: `index-file-roto` en `audit.js`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: P1 `index-file-roto` (un `<base>` o un `src`/`href` propio que empieza con «/» en un `.html` suelto de la raíz), APROBADO, el mismo P1 para todos los `.html` de la raíz.

### Qué queda

- Menor: el número de línea del aviso se corre cuando hay comentarios HTML de varias líneas arriba; reemplazarlos por espacios que conserven los saltos de línea.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: to-do 343, búsqueda del sponsor con evidencia (propuesta), 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: la condición del 343 (la compuerta de `estadio-sponsor.mjs` pide un registro de búsqueda para un sponsor sin fuente), APROBADA CON TRES CAMBIOS. Sin codear.

### Qué queda (para TODO / 343)

- Antes de codear: (a) los 26 años con `sin-fuente.sponsor` de hoy (8 clubes, 16 % de los años de `contexto-manual.json`) se congelan en una lista y solo esos pueden ser `legacy:true`; (b) `archivo-web` cuenta como `club-oficial`; (c) medir con `estadio-sponsor.mjs --ensayo --detalle` que ningún año ya cargado queda frenado.
- Para Guido, con el texto de la skill: la sección `club-sourcing` 0.5 (en `Admin/propuestas/343-busqueda-sponsor.md`) y un control en el eje `datos` de `auditoria-finance-of-sports`: por país auditado, re-ejecutar una muestra de los registros de búsqueda nuevos y reportar si el sponsor aparecía.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: chequeos propuestos del 330 y del 257 (Orden 1), 2026-10-21

### Qué cambió (para CHANGELOG)

- Trece líneas más en `Admin/registros/auditoria-proceso.jsonl`, una por chequeo de `Admin/propuestas/330-donde-se-pierde.md` y `257-skills.md` (partes 4 y 5). APROBADOS: `duda-resuelta-en-dudas`, `registro-sin-lector`, `doc-de-criterio-con-historia`, `gasto.mjs` con el 15 % de A2, `archivar-con-ok`, `modelo-opus-con-ok`. APROBADOS CON UN CAMBIO: `memoria-no-es-regla` (ask, no deny), `medicion-sin-destino` (cuenta lo que una tool nombra), `worktree-sin-permission-mode` (ask), `comandos-simples` ampliado (solo ask). APROBADO CON TRES CAMBIOS: el candado `skills-con-ok`. RECHAZADOS: `mergear` que frena sin flecha (queda como aviso) y `adelantar` (la tool no tiene ese paso). Sin codear.

### Qué queda (para TODO / 330 y 257)

- `skills-con-ok`: coincidencia contigua, git exento de la regla de Bash y una medición con los últimos cambios a `.claude/skills` antes de instalarlo.
- `medicion-sin-destino`: hoy 35 de 51 archivos de `Admin/mediciones/` sin citar; el commit que lo agregue tiene que resolverlos o dejarlos listados.
- `worktree.mjs mergear`: primero el texto de `worktree.md` con el ok de Guido, después un aviso (no freno) por los puntos de «Qué queda» sin flecha.
- `adelantar`: Pipeline dice qué paso hace hoy el avance de la rama y se vuelve a proponer sobre ese archivo.
- Los matchers de `.claude/settings.json` (`archivar-con-ok`, `modelo-opus-con-ok`, `worktree-sin-permission-mode`, `comandos-simples`) los agrega la principal; la sesión que los codee no edita ese archivo por su cuenta.
- Orden 1 retiró el punto `adelantar` (no hay tool: el avance de la rama lo corre la principal a mano; la verificación queda como texto en la skill principal, que necesita el ok de Guido).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: `catalogo-liga.mjs` (to-do 341) y `5bec638265`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Dos líneas más en `Admin/registros/auditoria-proceso.jsonl`: `tools/catalogo-liga.mjs` con `validarReglasPrompt` (propone la entrada de `LEAGUES` y activa un deporte con aprobaciones), APROBADO CON DOS CAMBIOS; `5bec638265` (`checkComaComida` con `throwIfNoEntry:false`), APROBADO.

### Qué queda (para TODO / 341)

- `catalogo-liga.mjs`: (1) `--aprobado` y `--aprobado-deporte` con una referencia verificable a una línea de `auditoria-proceso.jsonl`, no texto libre; (2) `--escribir` exige `--full` y `--name` dados por quien aprueba (el título de Wikipedia es en inglés y el catálogo usa nombres locales o en español: `full` coincide en 18 de 63).
- Recomendado, no condición: pasar a nota las preguntas informativas («el infobox no dice un país reconocible») y agregar `--tier` y `--pais` explícitos; hoy 24 de 63 ligas llevan una pregunta que no se puede contestar sin editar `data/leagues.js` a mano.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: diseño del 237 al (anexo que abre las ventas), 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl`: el paso determinista de `extraer.mjs` con la compuerta de cuatro partes (Mafra 2023-24, AS Roma 2009), APROBADO CON DOS CAMBIOS. Sin codear.

### Qué queda (para TODO / 237)

- Antes de codear: (1) control de falsos positivos (la misma compuerta contra los renglones de otro documento o con el estado barajado; tiene que dar 0 de N); (2) el paso se salta si el ejercicio ya está cargado en el sitio y, si se salta, imprime qué habría reemplazado; probar Mafra 2023-24 y AS Roma 2009 con y sin ese año cargado.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: chequeos de huecos y atraso (Pruebas 1) y tiempo de `audit.js`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Tres líneas más en `Admin/registros/auditoria-proceso.jsonl`: el hueco de años, APROBADO CON CAMBIOS como un solo chequeo P3 `ejercicio-sin-rastro`; el atraso del último ejercicio, RECHAZADO como chequeo separado (duplica `data/faltantes/` y `ESTADO-clubes.md`, su parte útil va en el primero); y una nota informativa sobre el tiempo de `audit.js`.

### Qué queda (para TODO / Pruebas 1)

- `ejercicio-sin-rastro` (P3): por club, los años entre su primer ejercicio y el más reciente de su país que no están cargados ni figuran en `data/faltantes/` con ningún estado, un hallazgo por club; al nacer, 84 club-años en 51 clubes (24 de hueco y 60 de cola). Se silencia por club en `tools/audit-ignore.json` con motivo, después de mirarlo.
- Texto para Guido (skill de arranque, línea 86): «Corre en menos de un segundo» está desactualizado; propuesta: «Corre en unos 15 segundos con 320 clubes (crece con la cantidad de clubes) y sale con código 1 si hay P0 o P1.» Si el tiempo se acerca a ~50 s con ~1.000 clubes, va al eje `escala`.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: más veredictos del 21 de octubre (resumen), 2026-10-21

### Qué cambió (para CHANGELOG)

- Líneas nuevas en `Admin/registros/auditoria-proceso.jsonl`, en orden: código del 343 (compuerta del sponsor), APROBADO; máximo sin presupuestos y corte de 9 meses en `ejercicio-sin-rastro`, APROBADOS; código del 237 al y su mínimo de dos renglones, APROBADOS; arreglo del hook de skills, APROBADO; tres hooks de ask a deny: `comando-que-edita` APROBADO CON UN CAMBIO, `worktree-sin-permission-mode` APROBADO, `memoria-no-es-regla` RECHAZADO (queda ask); diseño del 345 (`tools/xhtml-aarsrapport.mjs`, informes daneses XHTML), APROBADO CON TRES CAMBIOS. Sin codear lo del 345.

### Qué queda (para TODO / 345)

- Antes de codear: (1) los 8 documentos pedidos pasan la compuerta de hechos iXBRL con 0 faltantes (hay 2 en København y 11 en Nordsjælland 2025) o cada faltante queda explicado; (2) menos de 98 % de líneas ubicadas en una página = la tool no escribe, no escribe un `.md` con una sola marca; (3) motor registrado como «xhtml-ixbrl (determinista)» en `transcripciones-estado.jsonl` y en la primera línea del `.md`, con la frase de que el PDF es una impresión de Chrome del XHTML oficial. Seguimiento posible: los hechos iXBRL como total oficial independiente.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: primera corrida de «un código por corrida»: `linea-duplicada`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: linea-duplicada`, antes 927 y después 0: decidido arreglar el chequeo. Los 927 son P3 «con montos distintos» y es el mismo rótulo repetido en las notas de un mismo documento (sin ningún caso de «mismo monto», que es la copia pegada que el chequeo quería atrapar). Medido en los 320 JSON: 685 grupos de rótulo repetido, 651 con una sola subcategoría y 34 con dos (el costo de personal repartido por función), 0 con el mismo monto y 0 con desglose.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (`checkLineas`, cerca de la línea 397): sacar la rama P3 «con montos distintos» y dejar la P1 de «mismo monto». Mide: `node tools/audit.js` antes P3 `linea-duplicada` 927 y después 0, con el resto de la salida idéntica. Es aflojar un P3, no frena nada ni toca datos.
- Próxima corrida del proceso de P2 y P3: `catchall-dominante` (P2, 256 hallazgos).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: segunda corrida de «un código por corrida»: `catchall-dominante`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: catchall-dominante`, antes 256 (P2) y después 125 (P3): el chequeo describe cuánto detalla el documento y qué cubre la taxonomía, no un defecto; se reclasifica de P2 a P3 y no cuenta un catch-all de una o dos líneas impresas. De 256 hallazgos, 131 (51 %) son una o dos líneas (un gasto que el documento da en un solo renglón, como «Annen driftskostnad» de Aalesund y Viking) y 125 son tres o más (en su mayoría subsidios, aportes y donaciones que la taxonomía no tiene dónde poner).

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (`checkCategorizacion`, cerca de la línea 1470): P2 a P3 con el comentario de por qué, y no contar el catch-all cuando son una o dos las líneas que caen en su fila de `bucketize`. Mide: `catchall-dominante` antes P2 256, después P2 0 y P3 cerca de 125, con el resto de la salida idéntico.
- Para Guido, como pregunta de criterio y no como condición: la taxonomía no tiene una categoría para subvenciones y donaciones (ligas bajas de Grecia, Rusia y Portugal). Si se quiere abrir, es una votación (`votacion-de-criterios`) y, por la regla vigente, no recategoriza lo cargado.
- Próxima corrida: `sin-salarios` (P2, 48).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: tercera corrida de «un código por corrida»: `sin-salarios`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: sin-salarios`, antes 48: real y lo arregla un script; el chequeo no se toca. Los 48 son 12 clubes británicos (47 hallazgos: Aston Villa, Brentford, Brighton, Celtic, Fulham, Leeds, Liverpool, Newcastle, Nottingham Forest, Sunderland, West Ham, Wolves), con el estado de resultados por función y los sueldos dentro de una sola línea («Administrative expenses», «Operating expenses…», «Operating costs»), y Instituto 2025 (1), cuyo anexo de «Remuneraciones y cargas» se cargó entero como `admin_general_expense` en lugar de por columnas como 2024.

### Qué queda (para TODO / onboarding o datos)

- Británicos: `node tools/caja-deuda.mjs --personal --club <id> --ejecutar` (Jev, centavos por club; el ensayo de Aston Villa dice ~US$ 0,001) y después `--partir` y cargar con `--reemplazar` donde la compuerta del documento siguiente lo confirme; los años que la compuerta deje sin dato quedan como están. Mide: `sin-salarios` 48 antes contra lo que quede, con `audit.js` sin P0 ni P1 nuevos. Lo corre una sesión de onboarding o de datos, no la auditoría: cambia «Salarios y primas» publicados de 47 club-años.
- Instituto 2025: abrir «Remuneraciones y cargas» por columnas como 2024 (tarea de carga).
- Próxima corrida: `signo-invertido` (P2, 30).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 4: cuarta corrida de «un código por corrida»: `signo-invertido`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: signo-invertido`, antes 30 y después 17: arreglar el chequeo con un vocabulario de líneas netas por construcción. Seis casos mirados contra el `.md` (Moreirense 2023, RB Bragantino 2025, St. Gallen 2020, Sarpsborg 2015, Académica 2023, Basel 2017): en todos el signo es el del documento o el de la convención (la skill de mapeo manda las condonaciones a `exceptional_items` también como ingreso); ninguno es un signo dado vuelta.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (`checkLineas`, cerca de la línea 377): (a) sumar «Encargos sobre receitas», «Ertragsminderung» y «Deduç» a `DEDUCCION_FISCAL_INGRESO_RE`; (b) no marcar una línea de gasto positiva cuyo rótulo dice ser neta («reversões», «reduções», «reprises», «terugnemingen», «perdas/»). Quedan fuera a propósito «Korrektur» y «Allocatie amortisatie» (no se miraron en el documento). Mide: `signo-invertido` antes 30 y después 17, con el resto de la salida idéntico.
- Los 14 hallazgos que quedan sin mirar (Basel 2009 y 2019, Benfica ×2, Besiktas, Celtic, Groningen, Go Ahead Eagles, Nacional 2024, Nõmme Kalju, Paide, más los de «Korrektur» y «Allocatie» de Basel 2016, FC Utrecht y NEC) se miran en la próxima corrida de este código; los que resulten reales y aceptados se silencian con su motivo, después de mirar el documento.
- Próxima corrida: `outlier-liga` (P2, 21). Además queda la tarea 350 (taxonomía: categorías en vano, educación, votar una de subsidios), que la principal avisa cuando toque.

### Qué deja de ser cierto en ESTADO

- Nada.

## Traspaso a Auditora 5 (`local_eb37a9db-f23a-44b2-934d-91a98b93d4e8`), 2026-10-21

### Qué quedó abierto (veredictos y sesiones que esperan)

- **`signo-invertido` (cuarta corrida):** decidido arreglar el chequeo (30 a 17), se lo pasó la principal a Pipeline 13. Cuando llegue el cambio, confirmar que `signo-invertido` pase de 30 a 17 con el resto de la salida idéntico. Los 14 hallazgos que quedan sin mirar (Basel 2009 y 2019, Benfica ×2, Besiktas, Celtic, Groningen, Go Ahead Eagles, Nacional 2024, Nõmme Kalju, Paide, y los de «Korrektur» y «Allocatie amortisatie» de Basel 2016, FC Utrecht y NEC) se miran contra el documento en la próxima corrida de ese código; los reales y aceptados se silencian con motivo, nunca sin mirar.
- **`sin-salarios`:** la carga la hace Onboarding 8 después de su lote (12 clubes británicos con `caja-deuda --personal`, y Instituto 2025 por columnas). Al terminar medir `sin-salarios` 48 contra lo que quede, con `audit.js` sin P0 ni P1 nuevos.
- **`catchall-dominante` y `linea-duplicada`:** ya están en main. La auditoría quedó en P2 115 y P3 206 después del cambio de `catchall-dominante`.
- **Tarea 350 de la principal:** relevamiento exhaustivo de las categorías de la taxonomía que están en vano, revisar si educación tiene sentido y votar una categoría para subsidios (`votacion-de-criterios`; la causa viene de `catchall-dominante`: subsidios, aportes y donaciones sin categoría en ligas bajas de Grecia, Rusia y Portugal). Se hace después de las corridas, cuando la principal avise; por la regla vigente no recategoriza lo cargado.
- **Del 237 al (Pipeline 12):** si en una corrida real aparece una aplicación sospechosa de `cuadroSobrante`, Pipeline 12 avisa a la Auditora.
- **Del 345 (Pipeline 12, informes daneses XHTML):** diseño aprobado con tres cambios; si vuelve con el código, confirmar los tres (0 faltantes en los 8 documentos pedidos, no escribir con menos de 98 % de líneas ubicadas, motor registrado como «xhtml-ixbrl»).
- **De Pruebas 1, `ejercicio-sin-rastro`:** aprobados el máximo sin presupuestos y el corte de 9 meses; si se codeó, verificar que la salida coincida (31 clubes y 54 club-años al 21 de octubre) y que la constante de 9 meses sea una sola.
- **De Orden 1:** hooks `comando-que-edita` y `worktree-sin-permission-mode` pasaron a deny (aprobados, con el cambio de salida para scripts del scratchpad); `memoria-no-es-regla` se quedó en ask (rechazado el deny). Se mira `.hooks-disparos.jsonl` de la principal en una semana: si aparece un uso legítimo sin salida, vuelve a ask.
- **Textos de skill que esperan el ok de Guido** (no se editan sin que él los vea): la frase de «menos de un segundo» de `audit.js` en la skill de arranque (línea 86; propuesta: «unos 15 segundos con 320 clubes»), el control de muestra por país del sponsor en el eje `datos` de la auditoría, y la verificación del avance de la rama en la skill principal.
- **Pendientes de Pipeline 12 sin respuesta mía hoy:** ninguno.

### Próximo código de P2 y P3

- **`outlier-liga`** (P2, 21 hallazgos). Después, por tamaño: `gestion-club-inexistente` (P3, 26), `ejercicio-sin-rastro` (P3, ~23 antes del corte de 9 meses), `escala-implausible` (P3, 5), `salto-interanual` (P2, 5). Re-medir con `node tools/audit.js --json` antes de elegir: los números cambian con cada merge. Códigos ya tratados en `Admin/registros/auditoria-proceso.jsonl` (campo `codigo_tratado`): `linea-duplicada`, `catchall-dominante`, `sin-salarios`, `signo-invertido`.

### Qué me conviene que sepa

- Los veredictos de hoy están todos en `Admin/registros/auditoria-proceso.jsonl`, uno por línea, con el motivo; Pipeline 11, 12 y 13, Orden 1 y Pruebas 1 trabajan con ese archivo como fuente.
- La skill ya tiene el criterio de condiciones nuevas (sección 7); si falta algo, escribir el texto propuesto en esta nota y llevárselo a la principal, sin editar la skill.
- Un script nuevo para el hook del repo bloquea `$(...)`, `${...}`, `$VAR` y heredocs que mencionen palabras de merge: escribir los scripts con la herramienta Write en el scratchpad y correrlos con `node <ruta>`.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: quinta corrida de «un código por corrida»: `outlier-liga`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: outlier-liga`, antes 21 (P2) y después 6 (P3): el chequeo compara la mediana del país, que mezcla primera con tercera división, y no detecta escalas. Nueve casos mirados contra los JSON (Benfica, Flamengo, Brugge, Gent, Almagro, Felgueiras, Novorizontino, Académica, Alverca): la suma de ingresos es igual al total oficial y el monto es el de la división; ninguno es un error de escala. De los 21, 15 tienen un año vecino del mismo club dentro de 20 veces.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (cerca de la línea 487, el bloque «Comparación entre pares de la misma liga»): no marcar si el club tiene otro ejercicio a dos años o menos dentro de 20 veces (el mismo criterio de `escala-implausible`) y pasar el aviso de P2 a P3 con el comentario de por qué. Mide: `outlier-liga` antes P2 21, después P2 0 y P3 6 (anderlecht, antwerp, clubbrugge, genk, gent 2025 y novorizontino 2010, todos reales), con el resto de la salida idéntico. No toca datos.
- Mejora opcional: comparar con la mediana de la liga y no del país.
- Próxima corrida: los 14 de `signo-invertido` sin mirar, y después `gestion-club-inexistente` (P3, 26).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: sexta corrida: los 14 de `signo-invertido` sin mirar, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: signo-invertido`, antes 17 y después 0: los 14 restantes, mirados contra su `.md`, son netos reales del documento (aportes de la Holding de Basel, costos de transacciones de atletas que Benfica imprime restando, pérdidas entre paréntesis de Besiktas, vouchers de Celtic, reasignaciones de amortización de Utrecht y NEC, negativos impresos en Groningen, Go Ahead, Nõmme Kalju y Paide, y el ingreso de Nacional cargado como excepcional). Con los 6 de Auditora 4 son 20 de 20 sin un error. Nada se silenció.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (`checkLineas`, cerca de la línea 377): no emitir `signo-invertido` si el ejercicio tiene `officialTotals` del lado y la suma de las líneas con su signo cierra con él (un signo dado vuelta rompería ese tie-out); sin total oficial, P3 y no P2. Mide: `signo-invertido` antes P2 17, después 0, con el resto de la salida idéntico. No toca datos.
- Próxima corrida: `gestion-club-inexistente` (P3, 26).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: informes daneses en XHTML (to-do 345): la fuente y el chequeo iXBRL, 2026-10-21

### Qué cambió (para CHANGELOG)

- Dos veredictos en `Admin/registros/auditoria-proceso.jsonl`, sin codear. (1) **Fuente:** aprobado un chequeo `fuente-xhtml-sin-url` en `audit.js` (P3, y P1 si la url termina en `.pdf` o empieza con `Clubes/`). Hoy ninguna de las 16 fuentes danesas tiene url y ninguna página de `fuentes/` ni JSON apunta a nuestro PDF de ancla, así que no se publica la impresión como si fuera el original; lo que falta es poner la url del depósito oficial (Virk o el club) en los años que vinieron de XHTML. Mide: 3 P3 (SønderjyskE 2024, Silkeborg 2025, Viborg 2025). (2) **Chequeo iXBRL:** aprobado como aviso, a frenazo con 10 años medidos. Compara el `ProfitLoss` del ejercicio con `official_totals.net_result`: 3 de 3 iguales. Los ingresos no se comparan por igualdad (`Revenue` es la cifra de negocios; lo cargado suma otros ingresos).

### Qué queda (para TODO / una sesión Pipeline 13 y Onboarding 8)

- Pipeline 13: codear las dos condiciones con el texto exacto del registro. La del resultado: contexto por fechas y sin dimensiones (no «el primero»), nombre local sin prefijo, escala, signo y formato, tolerancia de medio `decimals`, solo contra el XHTML del mismo cierre (el «PSE-consolidado» de FC København es otro perímetro), ingresos solo si lo cargado es menor que `Revenue`. La de la fuente: `fuente.mjs --url` ya existe; falta el chequeo y que `fuentes/` diga «Informe oficial en formato XHTML (iXBRL)» cuando no hay url.
- Onboarding 8: al cargar los daneses con XHTML, poner la url del depósito en cada fuente y reportar a Pipeline 13 cuántos años dan el aviso del resultado; con 10 años de varios clubes (ÅRL e IFRS, con consolidados y minoritarios que hoy no se midieron) en cero falsos frenos, vuelve a la Auditora para pasar a frenazo.
- Cobertura medida en los 47 XHTML de `Clubes/Dinamarca`: `ProfitLoss` en 46, `Revenue` en 22, `GrossProfitLoss` en 25; Brøndby 2025 no trae ningún hecho.
- Próxima corrida: `gestion-club-inexistente` (P3, 26).

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: séptima corrida, `gestion-club-inexistente`, y la consulta de Pipeline 13 sobre el PSE, 2026-10-21

### Qué cambió (para CHANGELOG)

- Dos líneas más en `Admin/registros/auditoria-proceso.jsonl`. (1) `codigo_tratado: gestion-club-inexistente`, antes 26 y después 5: real y aceptado. Son clubes de Colombia (3), República Checa (5), Dinamarca (1), Noruega (10) y Turquía (7) con las gestiones cargadas antes que el balance; ninguno es un id mal escrito (344 clubes cargados mirados). (2) Consulta de Pipeline 13 sobre el consolidado PSE de FC København 2025 en `xhtml-aarsrapport.mjs`: aprobados el alineador óptimo como escalón y el span absoluto como línea (0 cambios en los otros 46 XHTML); el piso del 98 % no se baja, se aplica a las líneas con cifras no cubiertas por la compuerta (a), y las sin ubicar llevan «pág. ?». Falta que Pipeline 13 mida que las 14 líneas sin ubicar estén cubiertas.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (`checkGestiones`, línea 1583): una línea P3 por país («N clubes con gestión y sin balance: …») y un P1 `gestion-id-sospechoso` si un id sin balance comparte país y los primeros cinco caracteres del slug con un club cargado. Mide: `gestion-club-inexistente` antes 26 y después 5, 0 P1, con el resto de la salida idéntico. No toca datos ni silencia nada.
- Pipeline 13 trae el número de las 14 líneas antes de codear el piso del PSE.
- Próxima corrida: por tamaño, `ejercicio-sin-rastro` (P3, ~23; esperar su cambio), `escala-implausible` (P3, 5), `salto-interanual` (P2, 5); re-medir con `node tools/audit.js --json` antes de elegir.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: octava corrida, `ejercicio-sin-rastro`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: ejercicio-sin-rastro`, antes 23: el chequeo está bien, lo que falla es la lista `data/faltantes/` que lo alimenta. Causas: alias que faltan (RAAL La Louvière, Lierse Kempenzonen, Sarpsborg 08, Burnley y otros hasta 10, que `faltantes-liga.mjs --print` ya lista), ligas-año sin tabla de referencia (Girona, Fredericia), `br-serieA.js` y `br-serieB.js` viejos, y una clave de año de la lista que parece corrida para los daneses con el XHTML de 2025 sin cargar (sin resolver). No se silencia nada.

### Qué queda (para TODO / una sesión Pipeline)

- Pipeline: (a) los 10 alias en `tools/club-league-reference/alias.json`; (b) revisar la clave de año de `faltantes-liga.mjs` contra `fiscal_year` en `dk-superliga` 2025; (c) una entrada por liga-año donde `club-leagues` pone a un club cargado aunque la tabla no esté bajada; (d) `node tools/faltantes-liga.mjs`. Mide: `ejercicio-sin-rastro` antes 23 y después; `faltantes-liga.mjs --check` en 0. Basel 2022 queda sin explicar. Lo que sobre es cola de Sourcing en `Admin/sourcing/pendientes.md`.
- Próxima corrida: `escala-implausible` (P3, 5) o `salto-interanual` (P2, 5); re-medir antes de elegir.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: novena corrida, `salto-interanual`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: salto-interanual`, antes 5 (P2): Alverca 2023 (venta de jugadores) y Harju JK Laagri 2025 (subvención) son reales y quedan silenciados en `tools/audit-ignore.json` con el motivo, mirados contra el `.md`. Lommel y RAAL La Louvière saltan porque el año chico es el formato abreviado belga con «Brutomarge» / «Marge brute» como único ingreso; Westerlo salta entre 2015 y 2025.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (bloque de `salto-interanual`, cerca de la línea 514): comparar solo años a dos o menos de distancia, y si un lado es un año con un único ingreso «Brutomarge» / «Marge brute» / «Bruttomarge» / «Gross margin», emitir P3 `cambio-de-formato` en vez de P2. Mide: `salto-interanual` antes 5 (3 con los dos silencios hechos) y después 0 en P2.
- Para Guido, criterio y no condición: 31 club-años belgas (Lommel, RAAL La Louvière, Lierse, Patro Eisden, RWDM, Loke­ren-Temse, Westerlo y otros) muestran como ingresos un margen bruto sin aviso. Qué se le dice al visitante es de datos o de pantalla; no se recategoriza lo cargado.
- Próxima corrida: `escala-implausible` (P3, 5) y los demás por tamaño; re-medir.

### Qué deja de ser cierto en ESTADO

- Nada.

## Auditora 5: décima corrida, `escala-implausible`, 2026-10-21

### Qué cambió (para CHANGELOG)

- Una línea más en `Admin/registros/auditoria-proceso.jsonl` con `codigo_tratado: escala-implausible`, antes 5 (P3): son clubes chicos de tercera (Alverca 2022, Felgueiras 2022, Harju JK Laagri 2023 y 2024, Novorizontino 2015) que cierran con el total oficial. El P3 solo sale cuando el año vecino ya descartó el error de escala, así que no pide nada: se saca esa rama. El tie-out no atrapa una escala mal leída (§0 de la skill); la atrapa el año vecino, y sin vecino queda el P0.
- Otra línea: aprobada la distancia de edición ≤2 de Pipeline 13 en `gestion-id-sospechoso`.
- Cierre de la consulta del PSE y aceptación del lector XHTML: ya en el registro y mergeados.

### Qué queda (para TODO / una sesión Pipeline)

- `tools/audit.js` (`checkEscala`, cerca de la línea 484): sacar la rama P3 y conservar la P0. Mide: `escala-implausible` antes P3 5, después 0, P0 sin cambio, resto idéntico.
- Con esto los P2 y P3 que quedan con más de 5 hallazgos son `catchall-dominante` (131, espera el 350), `sin-salarios` (48, espera a Onboarding 8) y `ejercicio-sin-rastro` (23, espera a Pipeline 13). Re-medir antes de la próxima corrida; los códigos chicos (`ruta-muerta`, `registro-sin-lector`, `comentario-interno-publicado`, 3 a 5 cada uno) son de Orden.
- Siguiente: el 350.

### Qué deja de ser cierto en ESTADO

- Nada.
