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
