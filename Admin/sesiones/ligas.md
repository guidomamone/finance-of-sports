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
