# finance-of-sports — instrucciones permanentes

Este es un proyecto SEPARADO del sitio profesional de Guido (`Guidomamone-pm`, repo `guidomamone-website`): no mezclar contenido,
código ni decisiones de deploy. Son dos repos hermanos dentro de `Claude/Projects/`; si hay dudas al arrancar, chequeá `pwd` y el
remote antes de editar o commitear. Repo: `guidomamone/finance-of-sports`; dominio: `financeofsports.com`.

**YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY lo interno: la carpeta `Admin/` entera, `CLAUDE.md`, las 1144 notas de `fuentes/**/*.md`, `auditorias/` y `Prototyping/`. O sea: todo se trackea —el respaldo en GitHub está completo— y lo interno no se publica. Las 169 páginas `fuentes/<clubId>.html` SÍ se publican, son parte del sitio. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba.

**DÓNDE PONER UN DOCUMENTO NUEVO.** Si es interno (cualquier cosa escrita para Guido o para una sesión futura: estado, reglas, notas,
planes) va adentro de `Admin/`. Si lo dejás suelto en la raíz, se publica: `node tools/audit.js` lo caza (`doc-interno-no-excluido`).
La extensión no dice nada sobre si un documento es interno. `CLAUDE.md` es la única excepción que se queda en la raíz.

**Lo que está cerrado no se borra ni se apila: se archiva** en `Admin/Archive/` (ver su `README.md`). Antes, sacale lo que todavía
sirve y llevalo a donde se lee: una regla a `Admin/CONVENCIONES.md` (proceso), `Admin/CONVENCIONES-DATOS.md` (datos) o
`Admin/PANTALLA.md` (pantalla y código), o a la skill que corresponda; un pendiente a `Admin/TODO.md`.

## Al empezar

- Leé `Admin/ESTADO.md` (qué hay armado hoy), vos solo, sin que Guido lo pida. `Admin/TODO.md` NO se lee al arrancar: se abre cuando
  la tarea es elegir qué sigue, cuando Guido lo pide, o para agregar o borrar un punto. Qué hay cargado de cada club:
  `Admin/ESTADO-clubes.md` (generado).
- **Usá la skill que corresponde a la tarea; es obligatorio.** Sin ella, una sesión contradice un criterio ya decidido sin saber que
  existía (pasó de verdad). Empezá por `start-session-finance-of-sports-project`, salvo que la tarea sea onboardear clubes o tocar
  las tools del pipeline: ahí `club-or-year-onboarding`, que trae su propio arranque. Las demás: `club-sourcing` (buscar documentos),
  `club-data-mapping` (categorizar o cargar a mano, fuera del pipeline), `club-outreach` (mails a clubes),
  `auditoria-finance-of-sports` y `escala-finance-of-sports`.
- Mirá si hay algo nuevo en `fuentes/README.md`: Guido deja ahí links a documentos antes de que se carguen. Si algo de ahí no figura
  como cargado en `Admin/ESTADO-clubes.md`, es trabajo pendiente.
- Una pregunta genuina sobre un documento, que no se puede responder con la fuente ni con los criterios de las skills, va a
  `Admin/dudas-por-club.md` (la lista que Guido usa para escribirles a los clubes). No se asume un criterio.

## Antes de terminar la sesión

Con cualquier cambio real (datos, features, estructura, copy), sin que Guido lo pida:

- **`Admin/ESTADO.md`** al día. Es un snapshot, no un log: lo que dejó de ser cierto se reemplaza o se borra.
  `Admin/ESTADO-clubes.md` no se escribe a mano: `node tools/generate-club-index.js`.
- **`Admin/TODO.md`**: se BORRA lo resuelto (no se marca "RESUELTO"). Un punto nuevo toma el número siguiente al más alto.
- **`Admin/CHANGELOG.md`**: siempre una entrada, corta (qué cambió). `Admin/finance-of-sports-project.md` solo si amerita el porqué.
- La lista de pendientes vive solo en `Admin/TODO.md`. El detalle del cierre: skill de arranque, sección 5.

## Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo

- Ningún PDF se usa sin transcribirlo antes a un `.md` completo y fiel. En el onboarding es la etapa 2 del pipeline
  (`tools/pipeline.mjs --sin-jev`, ver la skill `club-or-year-onboarding`).
- El PDF y su `.md` van juntos en `Clubes/<País>/<Club>/` (país y club capitalizados); nunca una carpeta por club o país en la raíz.
- Los PDFs no se trackean (`.gitignore`); las transcripciones sí. Un documento que no es del dominio del club (una réplica de
  hinchas, por ejemplo) se guarda pero no se trackea.
- El detalle (estructura de carpetas, motores de transcripción y cuándo usar cada uno, Tesseract, chequeo de fidelidad, trampas de
  PDF): `Admin/PIPELINE.md`, sección "Documentos fuente".

## Precisión antes que velocidad

Este sitio es para uso público de hinchas y periodistas reales. Antes de dar por buena una carga de datos financieros, verificá que
los rubros suman el total oficial o de prensa conocido (`verifyTieOuts()` en `index.html`, `auditAll()` con `?audit=1`).

## Gotchas de tooling

Viven donde se usan:

- **Si el navegador de preview muestra algo viejo** (`data/*.js`, `js/*.js` o el propio `index.html`): no es un bug hasta probar lo
  contrario. Lo único que funciona es cambiar la URL: subí `ASSET_V` (la constante y cada `?v=`) y navegá con `?cb=<algo nuevo>`.
  El detalle, y las otras trampas del navegador (un `alert()` abierto congela todo; el screenshot sale en blanco con la página
  scrolleada): `Admin/PANTALLA.md`, "Trampas del navegador de preview".
- Trampas de PDF y de grep (`grep -oP` cerca de acentos, `pdfinfo` con bytes NUL, `pdftotext` que devuelve mojibake):
  `Admin/PIPELINE.md`, "Documentos fuente".
- Varios agentes en paralelo comparten el Browser pane: skill `club-sourcing`, "Gotcha de tooling".
