# Sesión Datos 3 (rama proyecto)

## 246 — ids estables (hecho, un commit)

**Qué cambió (para CHANGELOG):** los 41 ids de club sin país pasan a `<slug>-<iso2>` (boca → boca-ar, realmadrid → realmadrid-es…). 123 archivos movidos
(`data/<iso>/<id>-data.js`, `fuentes/<id>.html`, `Admin/carga-clubes/<id>.md`), sourceIds con el prefijo nuevo, claves en `data/` y registros que una tool lee por club,
`audit-ignore.json`. `data/club-aliases.js` (CLUB_ALIASES + `resolverClubId`/`resolverClubIds`), cargado en `index.html` después de `clubs.js`; el sitio lo aplica a
`?club=`, a Comparar (`a`/`b`), a `fos_club` en `localStorage` y a las búsquedas guardadas de Mi cuenta. 82 redirects 301 de `fuentes/` en `netlify.toml`
(entre marcas `# ids-alias`). `tools/data-clubes.js`: `normalizarId()` (y `rutaData` lo usa). `audit.js`: `clubid-sin-pais` pasa a P1, sin lista de heredados; nuevo `alias-roto` (P1).
Se subió ASSET_V a 1515. Diseño: `Admin/mediciones/246-ids.md`; ensayo: `246-ensayo.txt`. Herramienta: `tools/renombrar-ids.mjs` (`--verificar` sigue sirviendo; archivar en `tools/archivo/` cuando se cierre el 245).
**Verificado:** `audit.js` 0 P0 / 0 P1; `auditAll()` 319 clubes, 3703 checks OK, 0 no cierran; `?club=boca` abre y la URL se reescribe a `boca-ar`; `fos_club=river` → `river-ar`; Comparar con `c.racing:2024`; club nuevo `elche-es`.
**Sin tocar a propósito:** CHANGELOG, Archive, sesiones, logs de gasto (`registros/api/`), `Clubes/`, y las menciones en prosa de notas de sourcing.

**Qué deja de ser cierto en ESTADO:** la línea "Los clubes nuevos nacen con el país en el clubId" ahora vale para todos (ya no hay heredados); `Admin/ESTADO-clubes.md` ya se regeneró.
**Corrección dentro del 246:** el renombre había dejado `gestionesByClub.<id>` y `memberCountByClub.<id>` con el id viejo en 40 data files (los datos de gestión y socios quedaban sin leer, sin que `auditAll()` lo notara); arreglado en un commit aparte y la regla `propiedad-registro` está en `tools/renombrar-ids.mjs`.
**TODO:** borrar el 246. El 245 sigue (fase 2). Mixpanel/KV cortan la serie por club en el deploy (decidido por Guido).
**Primer push:** mirar que las 301 de `/fuentes/boca.html` → `/fuentes/boca-ar.html` respondan en producción.

**Skills (cambios propuestos, NO aplicados):**
- `escala-finance-of-sports/SKILL.md` ~172-177 (bloque "`clubId` sin país"): reemplazar por «ids: todos `<slug>-<iso2>`; los viejos viven en `data/club-aliases.js`; `audit.js` vigila formato y mapa (P1)».
- `club-data-mapping/referencia/formato-simplificado.md:61`: `data/ar/boca-data.js` → `data/ar/boca-ar-data.js`.

## 245 fase 2 — el JSON es la fuente (hecho)

**Qué cambió (para CHANGELOG):** `data/<país>/<id>.json` (319) es la fuente de los datos de cada club y se publica como dato abierto (D1); `data/<país>/<id>-data.js` se GENERA de ahí
(`tools/generar-data.mjs`, con una cabecera fija «GENERADO…») y el sitio lo carga igual (D2). Nombres de campo en inglés también en los bloques de texto libre (`results`, `titles`,
`extras.budget_*`; textos en español; diccionario `CLAVES_LIBRES` en `tools/json-datos.mjs`). Boca quedó con la estructura de los demás: sus fuentes, gestiones y socios ya no
están en `data/clubs.js` sino en su data file (JSON: `sources[]`, `management[]`, `members`). Nuevas: `tools/club-json.mjs` (`modificarClub`, `crearClub`) y `tools/generar-data.mjs`
(`--check`, `--identidad`). `cargar.mjs`, `caja-deuda.mjs` (caja, deuda y `--personal`), `dentro-de-otro.mjs` y `alta-club.mjs` leen y escriben el JSON (validan contra
`data/schema/club-v1.json` antes de escribir) y regeneran el JS. `audit.js`: `json-js-desfasado` y `json-no-valida` pasan a P1 (generadores de `checkGenerados`); `json-aviso` sigue P2.
`exportar-json.mjs` quedó como la migración de una sola vez. Docs: CONVENCIONES-DATOS, ARQUITECTURA, PIPELINE, PANTALLA, `mediciones/245-esquema.md` y CLAUDE.md (un párrafo).
**Verificado:** ida y vuelta 319 de 319 idénticos; el JS generado es idéntico, como objetos, al de antes (319 de 319 contra HEAD); `audit.js` 0 P0 / 0 P1; `auditAll()` 319 clubes,
3703 checks, 0 que no cierran; `cargar.mjs --reemplazar --escribir` sobre FCI Levadia 2019 y `dentro-de-otro.mjs --todos --escribir` reproducen lo publicado (única diferencia: un `incluidoEn: {}`
vacío de Krasnodar desaparece, como hacía la tool antes).
**Qué deja de ser cierto en ESTADO:** «los data files son lo que se edita» (ahora el JSON); la sección «Dónde vive cada cosa» (`data/`: JSON fuente + `-data.js` generado); «Boca» con
fuentes en clubs.js; la línea de la fase 1 del 245 en el TODO. **TODO:** borrar el 245 al mergear (la fase 2 está hecha); seguir con las skills (propuesta en la carpeta de notas).
**Pendiente / ojo:** el ASSET_V subió a 1520 (el 246 y el 245); mirar tras el primer push las 301 de `/fuentes/<id>.html`. `tools/renombrar-ids.mjs` y `exportar-json.mjs` se pueden archivar en
`tools/archivo/` (no lo hice: `renombrar-ids.mjs --verificar` todavía sirve). Los comentarios de otras tools que dicen «escribe el data file» (lectura con `vm`) siguen ciertos porque leen el JS generado.

## Al mergear con main (conflictos anticipados con `git merge-tree`, main 14 commits adelante)

Conflictos reales: `data/ar/godoycruz-ar-data.js` y `data/ar/gimnasiaesgrima-ar-data.js` (Onboarding 6 los tocó en main, y acá el `-data.js` es generado). Resolución: quedarse con la versión de
main de esos dos `-data.js`, pasar su cambio al JSON con `node tools/exportar-json.mjs --club godoycruz-ar --fecha <hoy>` (y lo mismo con `gimnasiaesgrima-ar`; esa tool lee el JS y escribe
`data/ar/<id>.json`) y regenerar con `node tools/generar-data.mjs`. El resto del conflicto es generado (`index.html` ASSET_V, `fuentes.html`, `fuentes/*.html`): `tools/worktree.mjs mergear`
lo resuelve y regenera (hay que regenerar también `data/rankings/ar-primera.js`, que cambió en los dos lados). Después `node tools/audit.js`, `node tools/generar-data.mjs --check` y
`node tools/renombrar-ids.mjs --verificar` (que no vuelva a aparecer un id viejo en lo que trajo main).
