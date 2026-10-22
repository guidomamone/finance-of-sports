# 0.4 y 0.5 Informes de la liga y sponsor de camiseta

*Se abre al abrir una liga nueva (0.4) o al buscar el sponsor de camiseta de un ejercicio (0.5). El núcleo y la tabla de qué abrir están en `SKILL.md`.*

#### 0.4 Informes agregados de la liga (al abrir una liga nueva)

Cuando se abre una liga (hay ranking en `data/rankings/`), buscar los informes públicos que resumen las finanzas de sus clubes y sumarlos a `data/informes.js`. Es una lista de lectura: ningún número de ahí entra en un ranking.

1. **Dónde mirar, en este orden:** la liga o la federación (informe económico anual; en Alemania la DFL, en España LaLiga, en Noruega Norsk Toppfotball con Deloitte); el regulador o el registro (Supersociedades en Colombia); la propia UEFA (el ECFIL ya está para toda liga de Europa: no se repite); una consultora (Deloitte, EY, KPMG Football Benchmark). Búsqueda: `<liga o país> informe económico financiero clubes <año>`, y el sitio de la liga y de la federación.
2. **Se abre el PDF o la página** y se confirma que es público y baja sin registro. Un informe de pago, con registro o que solo existe en prensa no se suma. Un informe que no se pudo abrir no entra, aunque la prensa lo cite.
3. **Una cifra de contexto, leída del documento** (no de la prensa), con su año y su fuente; si el informe es un borrador, `borrador: true`.
4. **Alta en `data/informes.js`** con el formato de las entradas existentes (`ambito`, `ligas`, `cubre`, `frase`, `cifra`, `url`, `urlTipo`; textos `{es, en}`). Sin opinión propia. Cada edición nueva reemplaza a la anterior.
5. **El PDF y su texto** van a `Admin/sourcing/<País>/`, sin trackear (`.gitignore`). Si hace falta leer un PDF largo, `pdftotext -layout` primero; Mistral solo si es un escaneo.
6. **Si no hay informe:** una línea en `Admin/sourcing/<País>/_notas-generales.md` con qué se buscó y por qué no sirvió (REGLA 2 de `Admin/sourcing/README.md`). No se inventa un informe para llenar la liga.
7. Subir `ASSET_V` y correr `generate-fuentes-page.js` y `generate-club-pages.js`.

#### 0.5 Buscar el sponsor de camiseta de un ejercicio (y dejar la evidencia)

El sponsor de camiseta (el del frente) de un ejercicio sale primero de Wikipedia (`tools/estadio-sponsor.mjs`: la tabla de camisetas de la temporada y de la página del club). Si ahí no está, la búsqueda sigue acá. Wikipedia no cuenta como búsqueda: ya la leyó la tool.

**Las clases de fuente, en este orden (de la más barata y segura a la más cara):**
1. `informe-anual`: los documentos del club que ya están en `Clubes/` (el `.md` del balance o de la memoria): `grep -i -n "patroc\|sponsor\|sponsoring\|спонсор"`. Gratis. Un informe que dice «patrocinador principal» vale, con página y línea.
2. `club-oficial`: la web del club (noticias del lanzamiento de la camiseta de esa temporada, página de patrocinadores). Para años viejos, la versión archivada (Wayback) de esa página con fecha del ejercicio: es la clase `archivo-web`.
3. `prensa`: la presentación de la camiseta de la temporada, o la noticia del acuerdo de patrocinio, en un medio con fecha.
4. `base-camisetas`: una base de camisetas por temporada (Football Kit Archive, Historical Football Kits, o la equivalente del deporte). Si la base devuelve 403 o no abre, se anota `inaccesible`.
5. `patrocinador`: el comunicado de la propia empresa.

**Qué cuenta como haber buscado.** Al menos tres intentos, de tres clases distintas, ninguna `wikipedia`, y entre ellos `informe-anual`, `club-oficial` o `archivo-web` (la versión archivada del sitio del club es la misma fuente). A lo sumo uno de los tres puede ser `inaccesible`. Cada intento dice DÓNDE (la URL, o la consulta exacta que se hizo) y QUÉ salió (`sin-dato`, `inaccesible` o `encontrado` con la cita).

**Si algún intento da el sponsor:** el sponsor va a `tools/contexto-manual.json` con `fuente` (la URL o el documento con página y línea) y no hace falta más registro. Verificá que sea del FRENTE y de ESA temporada: un sponsor de manga, de espalda o de otra temporada no es el dato.

**Si ninguno lo da:** el registro de intentos va en `sin-fuente.sponsor` (formato abajo) y el año se carga con el sponsor en `null`. Quien busca es un subagente Sonnet con Exa (0.1b); el registro lo escribe quien lo corrió, con su nombre y la fecha.

**Un sponsor por club, no por año, cuando el acuerdo es plurianual:** una sola búsqueda puede cubrir varios ejercicios si la fuente dice el período; el registro se copia a cada año con la misma evidencia.

**El registro** va en `tools/contexto-manual.json`, en `sin-fuente.sponsor` del club y el año:

```json
"bathrugby-gb": {
  "2022": {
    "estadio": "The Recreation Ground",
    "fuente": "https://...",
    "sin-fuente": {
      "sponsor": {
        "buscado": "2026-10-21",
        "por": "Claude (subagente Sonnet)",
        "intentos": [
          { "clase": "informe-anual", "donde": "Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2021-22.md, grep patroc|sponsor", "resultado": "sin-dato" },
          { "clase": "club-oficial", "donde": "https://www.bathrugby.com/news/ (lanzamiento de la camiseta 2021-22)", "resultado": "sin-dato" },
          { "clase": "base-camisetas", "donde": "https://www.footballkitarchive.com/ (403)", "resultado": "inaccesible" },
          { "clase": "prensa", "donde": "búsqueda «Bath Rugby 2021-22 shirt sponsor»: 8 resultados, ninguno nombra el sponsor del frente", "resultado": "sin-dato" }
        ]
      }
    }
  }
}
```

`buscado` (fecha) y `por` (quién lo corrió) son obligatorios. Cada intento lleva `clase` (`informe-anual`, `club-oficial`, `archivo-web`, `prensa`, `base-camisetas`, `patrocinador`; `wikipedia` se acepta pero no cuenta), `donde` (no vacío) y `resultado` (`sin-dato` o `inaccesible`; si algo lo encontró, no se escribe `sin-fuente`: se escribe el sponsor). La compuerta de `estadio-sponsor.mjs` y `node tools/audit.js` (P1 `sponsor-sin-busqueda`) comprueban la forma; un texto suelto en `sin-fuente.sponsor` no vale. Los años de `tools/sponsor-legacy.json` conservan su texto de antes; esa lista no crece.
