# Investigar gestiones (quién condujo cada club) — instrucciones para el agente

Tanda de Grecia (lote 71 de onboarding: Aris, Atromitos, Kifisia, Panetolikos, PAOK). Mismo armado que
`Admin/gestiones-por-pais/tanda-2026-10-13/`; el validador y el cargador son los de esa carpeta.

Proyecto: /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports (sitio público de finanzas de clubes de fútbol; lo leen
hinchas y periodistas: la precisión importa más que la velocidad).

## Qué hacer
Tu lote es UN club (archivo `lote-N.json` en esta carpeta: clubId, nombre, `carpeta` con sus documentos y `cierres` = las fechas de
cierre de los ejercicios que se van a cargar). Encontrá QUIÉN CONDUCÍA EL CLUB en cada una de esas fechas de cierre, con fecha de
asunción y de salida, y una fuente por gestión.

## Criterio de Grecia (ya decidido; no lo cambies)
Leé primero `Admin/gestiones-por-pais/gr.md` y `data/gestiones/gr.js` (los otros clubes griegos ya cargados son el ejemplo).
- Todas son PAE (sociedades anónimas). Se carga al DUEÑO solo si es una persona con nombre que conduce el club (como Melissanidis en AEK,
  Alafouzos en Panathinaikos, Bousis en OFI). Si no hay un dueño persona que conduzca (dueños repartidos, una empresa, una asociación
  amateur o un municipio), se carga al PRESIDENTE DEL DIRECTORIO (Πρόεδρος του Δ.Σ.) que firma el balance.
- `cargo`: 'Presidente' en los dos casos.
- Los presidentes formales que firman mientras el dueño persona sigue conduciendo NO se cargan (ver Panathinaikos en gr.md): mencionalos
  en `notas` del dueño.

## Reglas
- `desde`: fecha en que ASUMIÓ (no la de la elección o el anuncio), AAAA-MM-DD. `hasta`: fecha en que dejó el cargo, o null si sigue
  hoy (octubre 2026).
- Si la fuente da solo año o año y mes, usá día 01 (y mes 01 si solo hay año) Y decilo en la nota de esa gestión.
- `fuente`: UNA URL de donde salen las fechas (preferí: sitio oficial del club o de la Super League, Wikipedia en griego o inglés, prensa
  seria griega). `confirmada: true` SOLO si la fuente realmente dice esas fechas (o, con día 01 avisado, ese año/mes); si no la
  confirmaste, `confirmada: false` y explicá por qué.
- Los documentos del club (`.md` de la `carpeta` de tu lote: transcripciones de los balances) dicen quién firma cada balance y, a veces,
  la composición del directorio y cambios de accionistas. Usalos para CORROBORAR quién estaba en cada cierre y para detectar cambios;
  citá el archivo y la línea en la nota. La `fuente` igual tiene que ser una URL web con las fechas.
- `corto`: lo que va en un botón: el apellido como lo escribe la prensa en inglés/latín (ej. 'Savvidis', no 'Σαββίδης').
  `nombre`: nombre completo transliterado.
- Cubrí TODAS las fechas de `cierres`. Exactamente una gestión confirmada tiene que cubrir cada cierre (desde <= cierre < hasta).
- Si la gestión cambió entre el cierre y la aprobación/firma del balance, avisalo en `notas` (el proyecto usa un campo `firmo`; no lo
  inventes, solo avisá con el año y quién firmó).
- Nada de inventar: si no encontrás algo, dejalo en `dudas`. Una gestión dudosa no se publica.

## Herramientas
Usá WebSearch y WebFetch. NO uses el navegador integrado (Browser pane / mcp__Claude_Browser__*): lo comparten otros agentes.
NO edites ningún archivo del repo salvo tu `resultado-N.json`.

## Entrega
Escribí UN archivo JSON en esta misma carpeta: `resultado-N.json` (N = tu número de lote), con esta forma:
{
  "criterioPais": { "GR": "una o dos frases: qué figura se cargó en este club y por qué" },
  "clubes": {
    "<clubId>": {
      "gestiones": [ { "nombre": "...", "corto": "...", "cargo": "Presidente", "desde": "AAAA-MM-DD", "hasta": "AAAA-MM-DD" | null,
                       "fuente": "https://...", "confirmada": true } ],
      "notas": { "<nombre de la gestión>": "por qué esa persona, esa fecha y esa fuente; convención de día 01; qué dice el balance (archivo:línea)" },
      "cubre": { "<fecha de cierre>": "<nombre de quien estaba>" },
      "dudas": [ "..." ]
    }
  }
}
Validá con `cd Admin/gestiones-por-pais/tanda-2026-10-14 && node ../tanda-2026-10-13/validar.js N` (tiene que dar 0 problemas, o los que
queden explicados en `dudas`). Después contestá con un resumen corto: qué cierres quedaron cubiertos y cuáles no, y por qué.
