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
**TODO:** borrar el 246. El 245 sigue (fase 2). Mixpanel/KV cortan la serie por club en el deploy (decidido por Guido).
**Primer push:** mirar que las 301 de `/fuentes/boca.html` → `/fuentes/boca-ar.html` respondan en producción.

**Skills (cambios propuestos, NO aplicados):**
- `escala-finance-of-sports/SKILL.md` ~172-177 (bloque "`clubId` sin país"): reemplazar por «ids: todos `<slug>-<iso2>`; los viejos viven en `data/club-aliases.js`; `audit.js` vigila formato y mapa (P1)».
- `club-data-mapping/referencia/formato-simplificado.md:61`: `data/ar/boca-data.js` → `data/ar/boca-ar-data.js`.
