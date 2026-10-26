# Club nuevo: lo que el pipeline no hace

Pasos a mano cuando el club es NUEVO en el sitio (un ejercicio nuevo de un club ya cargado no los necesita): color de marca, chequeo
contra el escudo y liga de cada temporada. `alta-club.mjs` deja `brandColor` sin poner (lista candidatos de footylogos si la liga del club
está cacheada) y la liga en `null` cuando no la sabe.

---

## Color de marca

**`brandColor` se resuelve ACÁ, en el onboarding del club nuevo, no después, y lo elige la sesión: se lo cuenta a Guido, sin pedirle
confirmación ni QA.** Un ejercicio nuevo de un club ya cargado NO necesita este paso: `clubs{}` solo se toca cuando el club es nuevo.
Dos capas, EN ESTE ORDEN (invertirlo es la trampa del primer bullet de abajo):
1. **Identidad primero: ¿de qué color es el club?** Infobox de Wikipedia en el idioma del
   país, preguntando por los colores ACTUALES *y* si hubo cambios históricos, en el mismo
   prompt (a `pt.wikipedia`, "¿cuáles son los colores del Mirassol?" contesta azul y blanco,
   que fue verdad entre 1964 y 1981); o el color que declare oficialmente la liga cuando
   existe (la `クラブカラー` de la J.League resolvió los 10 japoneses con un fetch cada uno y
   cero ambigüedad).
2. **Recién después el hex**, y se acepta SOLO si cae en la familia que fijó la capa 1. **Antes
   de pedirle la tabla a footylogos, probá `node tools/lookup-brand-color.js "<club>"`**: busca
   LOCAL contra ligas que ya se cachearon (`tools/lookup-brand-color.js --list-ligas` dice
   cuáles), 0 fetches. Si el club no aparece, lo anota en `tools/brand-color-reference/misses.jsonl`;
   si la liga no está cacheada, cachearla es un fetch de una página pública, sin API key:
   `node tools/fetch-brand-color-reference.mjs <slug-liga-footylogos> <nombre-local>` (el uso está
   en la cabecera del script). Después volvé a correr el lookup. Un club de rugby (footylogos es solo
   de fútbol): `node tools/fos.mjs color-rugby "<club>"` trae los candidatos de teamcolorcodes; se corre
   a mano (`alta-club.mjs` no lo llama) y no decide el color: valen las mismas trampas. Si la liga no está en footylogos
   (no tiene J.League), los dos intentos baratos que fallan rápido: un `curl` al sitio oficial
   buscando `theme-color` (pocos aciertos: el resto son apps JS que devuelven un shell vacío, sitios
   caídos o un WAF) y el wikitext de la plantilla de camiseta (`?action=raw` + `body1`, exacto
   cuando está lleno, casi siempre vacío). Si no, agregadores: logotyp.us y teamcolorcodes sirven
   por club. No gastes fetches en encycolorpedia ni brandfetch (403 los dos) ni en whatthelogo
   (devuelve tonos lavados: `#F27CB1` para el rosa de Cerezo). Los slugs de logotyp.us y
   teamcolorcodes son inestables (`f-marinos` anda, `yokohama-f-marinos` 404): si el slug 404ea,
   leé el hex del snippet de búsqueda en vez de seguir adivinando.

Cuatro trampas, que son de donde sale ese orden:
- **El `theme-color`/CSS del sitio oficial sirve para PRECISAR un color que ya sabés cuál es,
  nunca para descubrirlo.** El CSS del Real Madrid declara `--rm-color-primary-default:
  #3E31FA`, un violeta de su design system; el del Sevilla es Bootstrap puro (`--bs-primary:
  #0d6efd`); el de Unión es el rojo default de WordPress; el de Boca son grises de Webflow. Si
  el hex del sitio no cae en la familia de la capa 1, se descarta el hex, no la fuente.
- **Nunca tomes el primer color de la paleta de un agregador**: están ordenadas por el ESCUDO,
  y el color del club es el de la CAMISETA. logotyp.us lista a Kashima con el negro primero y
  el rojo tercero, y a Nagoya igual: de ahí salen unos Antlers negros.
- **Bicolor en partes iguales** (San Lorenzo, Rosario Central, Gamba Osaka, FC Tokyo):
  desempatá en este orden: (a) el club o la liga declara una lista ORDENADA y gana el
  primero (el caso japonés, muy limpio); (b) Wikipedia dice explícitamente cuál predomina
  ("con predominancia del primero", Argentinos); (c) el `theme-color` propio (San Lorenzo,
  `#00325A`); (d) si el otro color es blanco, gana el que no es blanco (Estudiantes,
  Instituto, Unión). Si no aplica ninguno de los cuatro, gana el primero por orden
  alfabético de su nombre en inglés (azul y amarillo: "blue" antes que "yellow", gana el azul).
- **Camiseta blanca con un acento fuerte: no se resuelve buscando más, es decisión de
  producto.** Pasa seguido (River, Vélez, Sevilla, Real Madrid, Valencia, Once Caldas). La
  decide la sesión (`brandColor: null` si la identidad es el blanco) y se la cuenta a Guido.

**Si el color que lo identifica es el blanco: `brandColor: null`, que es un RESULTADO CERRADO,
no un pendiente. Un bicolor nunca queda en `null`:** se resuelve con los desempates de arriba,
hasta el orden alfabético en inglés. `pintarCrest()` (`js/selector.js`) trata el `null` igual
que el campo ausente (`if(!c)` → resetea y cae al azul del sitio), así que en pantalla no
cambia nada: el `null` existe para distinguir un club QUE SE MIRÓ Y NO LLEVA COLOR de uno que
nadie chequeó todavía, que es lo único que evita tener que rebarrer todos los clubes para
averiguar cuál es cuál. Ninguna sesión futura "completa" un `null` a ojo: un color
equivocado se lee peor que ninguno (`Admin/PANTALLA.md`). Y en el otro sentido: **un
`brandColor` no se oscurece ni se retoca para que pase el contraste del círculo**: para eso
están `textoSobre()` (cambia el TEXTO, no el color del club) y el aro interno de los colores
claros; si aun así no se lleva, va a `null`. Un club sin `brandColor` y sin `null` lo marca
`node tools/audit.js` (`club-sin-color-ni-null`, P3).

**La procedencia del color se anota en `Admin/sourcing/<País>/<Club>.md`, NO en `data/clubs.js`**:
ese archivo es eager y se baja en CADA pageview, y `fuentes/` no se publica. Con una línea
alcanza: `Color de marca: #XXXXXX — <fuente>, verificado AAAA-MM-DD`.

**Cuánto presupuestar**: un club fácil son segundos; uno dudoso, 2 a 5 fetches y varios
minutos. Presupuestá el caso dudoso, no el fácil. Si el club entra junto con otros de su misma
liga, arrancá por la tabla de esa liga: salen 10 por el precio de 1. En cualquier caso es barato
al lado de transcribir el PDF, que es el resto del onboarding.

## Chequeo contra el escudo

**Y si el club es NUEVO (no un ejercicio nuevo de uno ya cargado): chequeá el `brandColor` elegido
contra el escudo real, antes de cerrar la sesión.** El proceso de "Color de marca" resuelve el
hex por TEXTO (infobox de Wikipedia, `theme-color`, agregadores como footylogos/teamcolorcodes)
sin mirar nunca el escudo en sí, y esa falta de verificación visual deja pasar errores que solo se
ven a ojo: `godoycruz-ar` con `#0000FF` azul saturado en vez del celeste real del escudo, o
`fortaleza-br` con `#FF0000` rojo puro para un club tricolor que debía ir a `null` como sus pares
`saopaulo-br`/`bahia-br`. Antes de cerrar el onboarding: abrí el escudo real (Wikimedia Commons,
sitio oficial) en el Browser pane y confirmá a ojo que el HUE del `brandColor` elegido cae en la
misma familia. No hace falta que el hex sea idéntico al del escudo (la fuente de identidad sigue
siendo la CAMISETA, no el escudo), pero un hue claramente distinto (azul violáceo vs. celeste,
rojo puro vs. un club multicolor) es la señal de que el paso de texto se equivocó, y hay que
revisar de nuevo con el proceso de "Color de marca", sin consultarle a Guido. **Este chequeo se
hace UNA VEZ, al cargar el club; no es parte de ninguna auditoría periódica** (el eje `datos` de
`auditoria-finance-of-sports/SKILL.md` no pide `brandColor`), porque a diferencia de
categorización/catch-all (que sí se benefician de mirar muchos clubes juntos) es una comparación
1 a 1 que no gana nada de esperar a acumular un lote.

## Liga de cada temporada

**Y acordate de la fila de `data/club-leagues/<iso2>.js`**: sin ella el club no integra ninguna
liga, así que no aparece en ningún ranking aunque el generador haya corrido. La auditoría también
la cuenta (`liga-sin-verificar`, P3). Sigue siendo a mano y verificado, pero antes de salir a buscar
en qué liga jugó un club-año, probar la caché de lo ya buscado (no reemplaza la verificación):

1. `node tools/lookup-club-league.js "<club>" --pais <iso2>`: si esa liga-temporada ya está
   cacheada, ahí está la respuesta.
2. Si no, `node tools/resolve-wikipedia-season-page.mjs "<liga>" <año>` encuentra el título EXACTO
   de la página de esa temporada en Wikipedia (la convención de título varía por liga, sin fórmula
   fija). No elegir el resultado #1 a ciegas: un nombre ambiguo trae también otros torneos.
3. `node tools/fetch-club-league-reference.mjs "<título>" <leagueId> <año> --pais <iso2>` baja el
   roster completo de esa temporada (wikitext crudo, no HTML renderizado ni un resumen de modelo) y
   lo cachea en `tools/club-league-reference/<iso2>.json`.
4. Confirmar el club puntual contra ese roster y recién ahí escribir la fila en
   `data/club-leagues/<iso2>.js`, con su nota de verificación de siempre.
