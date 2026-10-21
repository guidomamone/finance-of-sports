# 241 — Link dedicado por club y por liga (nivel 2): plan técnico

Mockup (para el ok de Guido): artifact https://claude.ai/artifact/KEHmydzDpqzhmQNLy3Pg9d (copia en `Prototyping/Links/mockup-241.html`).
Estado: solo plan y mockup, nada codeado. Lo que toca `tools/` lo escribe Pipeline.

## El problema

`index.html` no tiene ninguna etiqueta Open Graph y su `<title>` es el genérico; el club y la liga se eligen con JS (`?tab=finanzas&club=…`).
WhatsApp, Telegram y Google leen el HTML sin ejecutar JS: todo link muestra la misma tarjeta y Google no distingue un club de la portada.

## Qué se genera

Un generador nuevo, `tools/generate-club-pages.js`, con el mismo patrón que `generate-fuentes-page.js` (`--check` incluido):

- `club/<clubId>.html`, una por club con al menos un ejercicio real (hoy 319).
- `liga/<ligaId>.html`, una por liga de `data/leagues.js` con ranking (hoy 53 archivos en `data/rankings/`).
- `og/club/<clubId>.png` y `og/liga/<ligaId>.png`: la imagen de la tarjeta.
- `sitemap.xml`: pasa a escribirlo el generador nuevo (hoy lo escribe `generate-fuentes-page.js`; dos escritores se pisan, hay que dejar uno). Suma `/club/…` y `/liga/…`.

Cada página sale de `index.html` como plantilla (así `ASSET_V` y los `<script>` quedan al día solos, como en `fuentes/`) con tres cambios:

1. `<head>`: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:title`, `og:description`, `og:image` (absoluta, https, con `?v=<hash>` para saltar el caché de WhatsApp), `og:url`, `og:type=website`, `og:locale=es_AR`, `twitter:card=summary_large_image`, y `<base href="/">` para que `css/` y `js/` carguen desde `/club/…`. JSON-LD: `SportsTeam` (club) / `SportsOrganization` (liga) con nombre, país y liga.
2. Un `<script>` previo con la ruta: `window.FOS_RUTA = {tab:'finanzas', club:'boca-ar'}` o `{tab:'liga', liga:'ar-primera'}`.
3. Dentro de `<body>`, un bloque de texto visible sin JS (`<noscript>` no: Google lo pondera menos): `<h1>` con el club, una tabla de ingresos, gastos y resultado por ejercicio en USD, y el link a `fuentes/<id>.html`. Es lo que indexa Google y se reemplaza cuando la app arranca.

### Textos

- Título (≤ 60): `<Club> · Ingresos <ejercicio>: US$ <n> M` + ` | El deporte en Números` en la pestaña. El ejercicio y el número son los del último balance (si el club solo tiene presupuesto: `Presupuesto <año>`). Liga: `<Liga> <año>: US$ <n> M de ingresos`.
- Descripción (≤ 155): ingresos, gastos y resultado del último balance; la de la liga dice cuántos clubes de cuántos están cargados (regla de Ligas: nunca habla de la liga entera) y el primero.
- Todo sale de `data/<país>/<club>.json` y de `data/rankings/<liga>.js`, convertido a USD con el mismo tipo de cambio de cierre que muestra el sitio. Un club sin dato convertible usa la moneda del documento.
- Idioma: castellano. Una versión en inglés queda para después (`?lang=en` no cambia el HTML estático).

### Imagen OG

1200 × 630, menos de 300 KB (límite de WhatsApp). Fondo azul del sitio, nombre del club, el ingreso grande en dorado y barras de los últimos balances (el presupuesto punteado), como en el mockup.

- Cómo: SVG armado por el generador y convertido a PNG con `@resvg/resvg-js` (JS puro, sin API ni servicio, US$ 0). Es una dependencia de desarrollo; si Guido prefiere no sumar ninguna, la alternativa es `sips`/`qlmanage` de macOS, más fea y solo en su máquina.
- Se commitea (`og/`), como `fuentes/`: Netlify no corre Node en el build, solo borra lo interno. ~372 PNG de ~30 KB: ~11 MB. Se regenera solo el que cambió (hash del texto y las barras en un comentario del SVG o en `og/_hashes.json`).
- La tipografía del PNG es la de sistema del renderizador: hay que embeber una fuente en el SVG (una Inter o similar con licencia libre) para que salga igual en cualquier máquina.

## La app: leer y escribir la ruta

`js/principal.js` (bloque «EL ESTADO EN LA URL», `estadoActual()` / `escribirURL()` / `aplicarURL()`) hoy lee solo la query y escribe `location.pathname + '?…'`.

- Leer: si `window.FOS_RUTA` existe, es el estado inicial; la query (`anios`, `moneda`, `anio`, `real`, `formato`) lo completa como hoy.
- Escribir: en Finanzas con club elegido, `history.replaceState` a `/club/<id>` + query sin `tab` ni `club`; en Ligas con liga, `/liga/<id>`; el resto de las pestañas vuelve a `/` con la query de hoy. Así lo que el visitante copia de la barra ya es el link con tarjeta.
- `?tab=finanzas&club=…` sigue funcionando sin cambios (links ya compartidos, el buscador, Mi Cuenta).
- `js/principal.js` es archivo de pantalla: lo hace Pantallas; el generador y los redirects, Pipeline.

## Netlify (`netlify.toml`)

- `/club/:id` y `/liga/:id` sin `.html`: una regla `status = 200` (rewrite) `/club/:id` → `/club/:id.html`, `force = false`, o activar Pretty URLs; la regla explícita es más segura porque no depende de un ajuste del panel.
- Ids viejos: `tools/renombrar-ids.mjs` ya escribe 301 de `/fuentes/<viejo>` a `/fuentes/<nuevo>.html` dentro del bloque `ids-alias`; suma los mismos dos pares para `/club/<viejo>` → `/club/<nuevo>`. Sirven también de red para quien tipee a mano.
- `club/`, `liga/` y `og/` se publican (el `rm` del `command` no los nombra); no hace falta tocar el comando de build.
- Cabeceras: `Cache-Control: public, max-age=3600` para `/og/*` (el `?v=` cambia cuando la imagen cambia).

## Cómo entra en el pipeline de publicar

- `cargar.mjs --escribir`, `alta-club.mjs` y `lote.mjs --cargar` corren los generadores en una lista fija (`generate-club-index`, `generate-fuentes-page`, `generate-rankings`, `generate-como-corre-stats`): se suma `generate-club-pages.js` después de `generate-rankings` (necesita los rankings para las ligas).
- `tools/audit.js`, `checkGenerados()`: `generate-club-pages.js --check` como P1, igual que los otros. Chequeos nuevos: toda página tiene canonical, `og:image` existente y de ≤ 300 KB, título ≤ 60 y descripción ≤ 155 caracteres, y el sitemap lista cada una.
- Subir `ASSET_V` obliga a regenerar estas páginas (hoy ya pasa con `fuentes/`): sumar al texto de la skill de arranque, sección 5.
- Cada carga de un ejercicio nuevo cambia el título, la descripción y la imagen de ese club; WhatsApp mantiene la vista previa vieja de un link ya compartido hasta que vence su caché. No hay forma de forzarlo desde el servidor.

## Orden de trabajo (si Guido da el ok)

1. Pipeline: `generate-club-pages.js` (HTML sin imagen), sitemap, `--check` y `audit.js`; redirects en `renombrar-ids.mjs`. Con el 10 % de los clubes primero.
2. Pantallas: `js/principal.js` lee y escribe la ruta; verificación en el preview con `/club/boca-ar` (el servidor local de `launch.json` no tiene el rewrite: probar con el `.html` explícito, o con `netlify dev`).
3. Pipeline: imágenes OG (`resvg`) y el `og:image` en las páginas.
4. Verificar con el depurador de Facebook (sirve para WhatsApp) y la herramienta de resultados enriquecidos de Google una vez publicado: las dos piden la URL pública, no se pueden probar en local.

## Decisiones que necesita de Guido

1. Estructura (`/club/<id>` y `/liga/<id>`, páginas ya armadas): recomendada. Alternativa más liviana: una función de borde de Netlify que inyecte el `<head>` al vuelo, sin 372 archivos, pero con un runtime que mantener fuera del repo.
2. Dependencia `@resvg/resvg-js` para las imágenes (US$ 0).
3. Una sola versión en castellano por ahora.
